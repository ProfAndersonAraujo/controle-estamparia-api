import express, { Request, Response } from "express";
import { produtoRoutes } from "./presentation/routes/produtoRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        mensagem: "API Controle de Estamparia",
        versao: "1.0.0",
        status: "online"
    });
});

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

app.use("/produtos", produtoRoutes);

export { app };