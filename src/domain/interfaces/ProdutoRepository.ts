
import type { Produto } from "../entities/Produto.js";

export interface ProdutoRepository {
    salvar(produto: Produto): Promise<Produto>;

    buscarPorId(id: number): Promise<Produto | null>;

    listar(): Promise<Produto[]>;
}