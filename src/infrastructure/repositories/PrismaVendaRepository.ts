
import type { VendaRepository } from "../../domain/interfaces/VendaRepository.js";
import { Venda } from "../../domain/entities/Venda.js";
import { prisma } from "../database/prisma.js";

export class PrismaVendaRepository implements VendaRepository {

    async salvarComBaixaEstoque(venda: Venda): Promise<Venda> {

        return prisma.$transaction(async (transaction) => {

            // 1. Baixar o estoque de cada produto
            for (const item of venda.itens) {

                const resultado = await transaction.produto.updateMany({
                    where: {
                        id: item.produtoId,
                        ativo: true,
                        quantidadeEstoque: {
                            gte: item.quantidade
                        }
                    },
                    data: {
                        quantidadeEstoque: {
                            decrement: item.quantidade
                        }
                    }
                });

                if (resultado.count !== 1) {
                    throw new Error(
                        `Produto ${item.nomeProduto} inexistente, inativo ou sem estoque suficiente`
                    );
                }
            }

            // 2. Registrar a venda e seus itens
            const registro = await transaction.venda.create({
                data: {
                    subtotalCentavos: venda.subtotalCentavos,
                    descontoCentavos: venda.descontoCentavos,
                    totalCentavos: venda.totalCentavos,

                    itens: {
                        create: venda.itens.map(item => ({
                            produtoId: item.produtoId,
                            quantidade: item.quantidade,
                            precoUnitarioCentavos: item.precoUnitarioCentavos
                        }))
                    }
                },
                include: {
                    itens: true
                }
            });

            // 3. Reconstruir a entidade
            return Venda.reconstituir(
                registro.id,
                registro.itens.map(item => ({
                    produtoId: item.produtoId,
                    nomeProduto: "",
                    quantidade: item.quantidade,
                    precoUnitarioCentavos: item.precoUnitarioCentavos
                })),
                registro.subtotalCentavos,
                registro.descontoCentavos,
                registro.totalCentavos,
                registro.data
            );
        });
    }

    async buscarPorId(id: number): Promise<Venda | null> {

        const registro = await prisma.venda.findUnique({
            where: { id },
            include: { itens: { include: { produto: true } } }
        });

        if (!registro) {
            return null;
        }

        return Venda.reconstituir(
            registro.id,
            registro.itens.map(item => ({
                produtoId: item.produtoId,
                nomeProduto: item.produto.nome,
                quantidade: item.quantidade,
                precoUnitarioCentavos: item.precoUnitarioCentavos
            })),
            registro.subtotalCentavos,
            registro.descontoCentavos,
            registro.totalCentavos,
            registro.data
        );
    }

    async listar(): Promise<Venda[]> {

        const registros = await prisma.venda.findMany({
            include: { itens: { include: { produto: true } } },
            orderBy: { data: "desc" }
        });

        return registros.map(registro =>
            Venda.reconstituir(
                registro.id,
                registro.itens.map(item => ({
                    produtoId: item.produtoId,
                    nomeProduto: item.produto.nome,
                    quantidade: item.quantidade,
                    precoUnitarioCentavos: item.precoUnitarioCentavos
                })),
                registro.subtotalCentavos,
                registro.descontoCentavos,
                registro.totalCentavos,
                registro.data
            )
        );
    }
}