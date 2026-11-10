
import express from "express";
import { produtoRoutes } from "./presentation/routes/produtoRoutes.js";
import { vendaRoutes } from "./presentation/routes/vendaRoutes.js";
import { pinoHttp } from "pino-http";
import { logger } from "./config/logger.js";
import {
    register,
    requisicoesTotal,
    duracaoRequisicoes
} from "./config/metrics.js";

const app = express();



app.use(express.json());

app.use(pinoHttp({ logger }));

app.use((req, res, next) => {
    const inicio = process.hrtime.bigint();

    res.on("finish", () => {
        if (req.path === "/metrics") return;

        const rota = req.route?.path
            ? `${req.baseUrl}${req.route.path}`
            : "rota_nao_identificada";

        const status = String(res.statusCode);

        const duracao =
            Number(process.hrtime.bigint() - inicio) / 1_000_000_000;

        const labels = {
            metodo: req.method,
            rota,
            status
        };

        requisicoesTotal.inc(labels);
        duracaoRequisicoes.observe(labels, duracao);
    });

    next();
});

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API Controle de Estamparia",
        versao: "1.0.0",
        status: "online"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

//Rotas métricas
app.get("/metrics", async (_req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

// Rotas de produtos
app.use("/produtos", produtoRoutes);

//Rota de vendas
app.use("/vendas", vendaRoutes);



export { app };