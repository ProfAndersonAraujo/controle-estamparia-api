
import express from "express";
import { produtoRoutes } from "./presentation/routes/produtoRoutes.js";
import { vendaRoutes } from "./presentation/routes/vendaRoutes.js";

const app = express();

app.use(express.json());

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

// Rotas de produtos
app.use("/produtos", produtoRoutes);

//Rota de vendas
app.use("/vendas", vendaRoutes);

export { app };