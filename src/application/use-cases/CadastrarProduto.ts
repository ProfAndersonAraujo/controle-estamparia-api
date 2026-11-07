
import { Produto } from "../../domain/entities/Produto.js";
import type { ProdutoRepository } from "../../domain/interfaces/ProdutoRepository.js";

interface CadastrarProdutoDTO {
    nome: string;
    descricao: string;
    precoCentavos: number;
    quantidadeEstoque: number;
}

export class CadastrarProduto {

    constructor(
        private readonly produtoRepository: ProdutoRepository
    ) {}

    async executar(dados: CadastrarProdutoDTO): Promise<Produto> {

        const produto = Produto.criar(
            dados.nome,
            dados.descricao,
            dados.precoCentavos,
            dados.quantidadeEstoque
        );

        return await this.produtoRepository.salvar(produto);
    }
}