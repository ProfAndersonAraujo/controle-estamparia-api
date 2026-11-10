
import type { Request, Response } from "express";
import { MovimentarEstoque } from "../../application/use-cases/MovimentarEstoque.js";

import { CadastrarProduto } from "../../application/use-cases/CadastrarProduto.js";
import { ListarProdutos } from "../../application/use-cases/ListarProdutos.js";
import { BuscarProdutoPorId } from "../../application/use-cases/BuscarProdutoPorId.js";

import { PrismaProdutoRepository } from "../../infrastructure/repositories/PrismaProdutoRepository.js";

const repository = new PrismaProdutoRepository();

const cadastrarProduto = new CadastrarProduto(repository);
const listarProdutos = new ListarProdutos(repository);
const buscarProduto = new BuscarProdutoPorId(repository);

export class ProdutoController {

    async cadastrar(req: Request, res: Response) {
        try {
            const produto = await cadastrarProduto.executar(req.body);

            return res.status(201).json(produto);

        } catch (erro) {
            const mensagem = erro instanceof Error
                ? erro.message
                : "Erro interno";

            return res.status(400).json({
                erro: mensagem
            });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const produtos = await listarProdutos.executar();

            return res.status(200).json(produtos);

        } catch {
            return res.status(500).json({
                erro: "Erro ao consultar produtos"
            });
        }
    }

    async buscarPorId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const produto = await buscarProduto.executar(id);

            if (!produto) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }

            return res.status(200).json(produto);

        } catch (erro) {
            const mensagem = erro instanceof Error
                ? erro.message
                : "Erro interno";

            return res.status(400).json({
                erro: mensagem
            });
        }
    }
    async movimentarEstoque(req: Request, res: Response) {
    try {
        const movimentar = new MovimentarEstoque(repository);

        const resultado = await movimentar.executar({
            produtoId: Number(req.params.id),
            quantidade: req.body.quantidade,
            tipo: req.body.tipo
        });

        return res.status(200).json(resultado);

    } catch (erro) {
        const mensagem = erro instanceof Error
            ? erro.message
            : "Erro interno";

        const status = mensagem === "Produto não encontrado"
            ? 404
            : 400;

        return res.status(status).json({
            erro: mensagem
        });
    }
}
}