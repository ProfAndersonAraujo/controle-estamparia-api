
import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController.js";

const produtoRoutes = Router();

const controller = new ProdutoController();

produtoRoutes.post("/", (req, res) =>
    controller.cadastrar(req, res)
);

produtoRoutes.get("/", (req, res) =>
    controller.listar(req, res)
);

produtoRoutes.get("/:id", (req, res) =>
    controller.buscarPorId(req, res)
);

produtoRoutes.patch("/:id/estoque", (req, res) =>
    controller.movimentarEstoque(req, res)
);

export { produtoRoutes };