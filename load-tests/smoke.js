
import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
    vus: 1,
    duration: "15s",

    thresholds: {
        http_req_duration: ["p(95)<300"],
        http_req_failed: ["rate<0.01"]
    }
};

export default function () {
    const resposta = http.get(`${BASE_URL}/health`);

    check(resposta, {
        "status HTTP 200": (r) => r.status === 200,
        "resposta abaixo de 300 ms": (r) => r.timings.duration < 300
    });

    sleep(1);
}