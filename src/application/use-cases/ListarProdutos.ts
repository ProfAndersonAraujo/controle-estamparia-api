
import type { ProdutoRepository } from "../../domain/interfaces/ProdutoRepository.js";
import type { Produto } from "../../domain/entities/Produto.js";

export class ListarProdutos {

    constructor(
        private readonly produtoRepository: ProdutoRepository
    ) {}

    async executar(): Promise<Produto[]> {
        return this.produtoRepository.listar();
    }
}