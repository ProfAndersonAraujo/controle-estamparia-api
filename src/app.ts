
import express from "express";

const app = express();

// Permite receber JSON nas requisições
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API Controle de Estamparia",
        versao: "1.0.0",
        status: "online"
    });
});

// Verificação de saúde da aplicação
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

export { app }; 