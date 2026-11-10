
import type { Request, Response } from "express";

import { RegistrarVenda } from "../../application/use-cases/RegistrarVenda.js";
import { DescontoPromocional } from "../../application/use-cases/estrategias/DescontoPromocional.js";

import { PrismaProdutoRepository } from "../../infrastructure/repositories/PrismaProdutoRepository.js";
import { PrismaVendaRepository } from "../../infrastructure/repositories/PrismaVendaRepository.js";

const produtoRepository = new PrismaProdutoRepository();
const vendaRepository = new PrismaVendaRepository();

const registrarVenda = new RegistrarVenda(
    produtoRepository,
    vendaRepository,
    new DescontoPromocional()
);

export class VendaController {

    async cadastrar(req: Request, res: Response) {
        try {
            const venda = await registrarVenda.executar(req.body);

            return res.status(201).json(venda);

        } catch (erro) {
            const mensagem = erro instanceof Error
                ? erro.message
                : "Erro interno";

            const status = mensagem.includes("inexistente")
                ? 404
                : 400;

            return res.status(status).json({
                erro: mensagem
            });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const vendas = await vendaRepository.listar();

            return res.status(200).json(vendas);

        } catch {
            return res.status(500).json({
                erro: "Erro ao consultar vendas"
            });
        }
    }

    async buscarPorId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    erro: "Identificador inválido"
                });
            }

            const venda = await vendaRepository.buscarPorId(id);

            if (!venda) {
                return res.status(404).json({
                    erro: "Venda não encontrada"
                });
            }

            return res.status(200).json(venda);

        } catch {
            return res.status(500).json({
                erro: "Erro ao consultar venda"
            });
        }
    }
}