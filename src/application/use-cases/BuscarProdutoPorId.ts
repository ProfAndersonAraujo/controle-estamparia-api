
import type { ProdutoRepository } from "../../domain/interfaces/ProdutoRepository.js";
import type { Produto } from "../../domain/entities/Produto.js";

export class BuscarProdutoPorId {

    constructor(
        private readonly produtoRepository: ProdutoRepository
    ) {}

    async executar(id: number): Promise<Produto | null> {

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Identificador inválido");
        }

        return this.produtoRepository.buscarPorId(id);
    }
}