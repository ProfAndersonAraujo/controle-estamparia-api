
import { Router } from "express";
import { VendaController } from "../controllers/VendaController.js";

const vendaRoutes = Router();
const controller = new VendaController();

vendaRoutes.post("/", (req, res) =>
    controller.cadastrar(req, res)
);

vendaRoutes.get("/", (req, res) =>
    controller.listar(req, res)
);

vendaRoutes.get("/:id", (req, res) =>
    controller.buscarPorId(req, res)
);

export { vendaRoutes };