import {
    Counter,
    Histogram,
    Registry,
    collectDefaultMetrics
} from "prom-client";

export const register = new Registry();

collectDefaultMetrics({ register });

export const requisicoesTotal = new Counter({
    name: "http_requisicoes_total",
    help: "Total de requisicoes HTTP",
    labelNames: ["metodo", "rota", "status"],
    registers: [register]
});

export const duracaoRequisicoes = new Histogram({
    name: "http_duracao_requisicoes_segundos",
    help: "Duracao das requisicoes HTTP em segundos",
    labelNames: ["metodo", "rota", "status"],
    buckets: [0.05, 0.1, 0.3, 0.5, 1, 2],
    registers: [register]
});