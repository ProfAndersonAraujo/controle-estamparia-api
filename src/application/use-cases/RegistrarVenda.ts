
import { Venda } from "../../domain/entities/Venda.js";
import type { ProdutoRepository } from "../../domain/interfaces/ProdutoRepository.js";
import type { VendaRepository } from "../../domain/interfaces/VendaRepository.js";
import type { EstrategiaDesconto } from "../../domain/interfaces/EstrategiaDesconto.js";

interface ItemVendaDTO {
    produtoId: number;
    quantidade: number;
}

interface RegistrarVendaDTO {
    itens: ItemVendaDTO[];
}

export class RegistrarVenda {

    constructor(
        private readonly produtoRepository: ProdutoRepository,
        private readonly vendaRepository: VendaRepository,
        private readonly estrategiaDesconto: EstrategiaDesconto
    ) {}

    async executar(dados: RegistrarVendaDTO): Promise<Venda> {

        if (!Array.isArray(dados.itens) || dados.itens.length === 0) {
            throw new Error("A venda precisa ter produtos");
        }

        // Consolidar produtos repetidos
        const quantidades = new Map<number, number>();

        for (const item of dados.itens) {
            if (
                !Number.isInteger(item.produtoId) ||
                item.produtoId <= 0 ||
                !Number.isInteger(item.quantidade) ||
                item.quantidade <= 0
            ) {
                throw new Error("Item de venda inválido");
            }

            quantidades.set(
                item.produtoId,
                (quantidades.get(item.produtoId) || 0) + item.quantidade
            );
        }

        const itens = [];

        for (const [produtoId, quantidade] of quantidades) {

            const produto = await this.produtoRepository.buscarPorId(
                produtoId
            );

            if (!produto || !produto.status) {
                throw new Error(`Produto ${produtoId} inexistente ou inativo`);
            }

            if (produto.estoque < quantidade) {
                throw new Error(`Estoque insuficiente: ${produto.nome}`);
            }

            itens.push({
                produtoId: produto.id,
                nomeProduto: produto.nome,
                quantidade,
                precoUnitarioCentavos: produto.precoCentavos
            });
        }

        const subtotal = itens.reduce(
            (total, item) =>
                total + item.quantidade * item.precoUnitarioCentavos,
            0
        );

        const desconto = this.estrategiaDesconto.calcular(subtotal);

        const venda = Venda.criar(itens, desconto);

        return this.vendaRepository.salvarComBaixaEstoque(venda);
    }
}