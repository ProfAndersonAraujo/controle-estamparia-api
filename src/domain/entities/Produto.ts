
export class Produto {

    private constructor(
        public readonly id: number,
        public readonly nome: string,
        public readonly descricao: string,
        public readonly precoCentavos: number,
        private quantidadeEstoque: number,
        private ativo: boolean
    ) {}

    static criar(
        nome: string,
        descricao: string,
        precoCentavos: number,
        quantidadeEstoque: number
    ): Produto {

        if (!nome.trim()) {
            throw new Error("Nome obrigatório");
        }

        if (
            !Number.isInteger(precoCentavos) ||
            precoCentavos <= 0
        ) {
            throw new Error("Preço inválido");
        }

        if (
            !Number.isInteger(quantidadeEstoque) ||
            quantidadeEstoque < 0
        ) {
            throw new Error("Estoque inválido");
        }

        return new Produto(
            0,
            nome.trim(),
            descricao,
            precoCentavos,
            quantidadeEstoque,
            true
        );
    }

    static reconstituir(
        id: number,
        nome: string,
        descricao: string,
        precoCentavos: number,
        quantidadeEstoque: number,
        ativo: boolean
    ): Produto {
        return new Produto(
            id,
            nome,
            descricao,
            precoCentavos,
            quantidadeEstoque,
            ativo
        );
    }

    get estoque(): number {
        return this.quantidadeEstoque;
    }

    get status(): boolean {
        return this.ativo;
    }

    adicionarEstoque(quantidade: number): void {
        this.validarQuantidade(quantidade);
        this.quantidadeEstoque += quantidade;
    }

    retirarEstoque(quantidade: number): void {
        this.validarQuantidade(quantidade);

        if (quantidade > this.quantidadeEstoque) {
            throw new Error("Estoque insuficiente");
        }

        this.quantidadeEstoque -= quantidade;
    }

    desativar(): void {
        this.ativo = false;
    }

    private validarQuantidade(quantidade: number): void {
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            throw new Error("Quantidade inválida");
        }
    }
}