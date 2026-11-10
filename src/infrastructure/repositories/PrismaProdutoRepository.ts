
import type { ProdutoRepository } from "../../domain/interfaces/ProdutoRepository.js";
import { Produto } from "../../domain/entities/Produto.js";
import { prisma } from "../database/prisma.js";

export class PrismaProdutoRepository implements ProdutoRepository {

    async salvar(produto: Produto): Promise<Produto> {

        const dados = {
            nome: produto.nome,
            descricao: produto.descricao,
            precoCentavos: produto.precoCentavos,
            quantidadeEstoque: produto.estoque,
            ativo: produto.status
        };

        const registro = produto.id === 0
            ? await prisma.produto.create({
                data: dados
            })
            : await prisma.produto.update({
                where: { id: produto.id },
                data: dados
            });

        return Produto.reconstituir(
            registro.id,
            registro.nome,
            registro.descricao,
            registro.precoCentavos,
            registro.quantidadeEstoque,
            registro.ativo
        );
    }

    async buscarPorId(id: number): Promise<Produto | null> {

        const registro = await prisma.produto.findUnique({
            where: { id }
        });

        if (!registro) {
            return null;
        }

        return Produto.reconstituir(
            registro.id,
            registro.nome,
            registro.descricao,
            registro.precoCentavos,
            registro.quantidadeEstoque,
            registro.ativo
        );
    }

    async listar(): Promise<Produto[]> {

        const registros = await prisma.produto.findMany({
            orderBy: {
                nome: "asc"
            }
        });

        return registros.map(registro =>
            Produto.reconstituir(
                registro.id,
                registro.nome,
                registro.descricao,
                registro.precoCentavos,
                registro.quantidadeEstoque,
                registro.ativo
            )
        );
    }
}