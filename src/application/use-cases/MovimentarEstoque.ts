
import type { ProdutoRepository } from "../../domain/interfaces/ProdutoRepository.js";

interface MovimentarEstoqueDTO {
    produtoId: number;
    quantidade: number;
    tipo: "entrada" | "saida";
}

export class MovimentarEstoque {

    constructor(
        private readonly produtoRepository: ProdutoRepository
    ) {}

    async executar(dados: MovimentarEstoqueDTO) {

        if (
            !Number.isInteger(dados.quantidade) ||
            dados.quantidade <= 0
        ) {
            throw new Error("Quantidade inválida");
        }

        const produto = await this.produtoRepository.buscarPorId(
            dados.produtoId
        );

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        if (!produto.status) {
            throw new Error("Produto inativo");
        }

        if (dados.tipo === "entrada") {
            produto.adicionarEstoque(dados.quantidade);
        } else {
            produto.retirarEstoque(dados.quantidade);
        }

        return this.produtoRepository.salvar(produto);
    }
}