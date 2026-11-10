
export interface ItemVenda {
    produtoId: number;
    nomeProduto: string;
    quantidade: number;
    precoUnitarioCentavos: number;
}

export class Venda {
    private constructor(
        public readonly id: number,
        public readonly itens: ItemVenda[],
        public readonly subtotalCentavos: number,
        public readonly descontoCentavos: number,
        public readonly totalCentavos: number,
        public readonly data: Date
    ) {}

    static criar(
        itens: ItemVenda[],
        descontoCentavos: number = 0
    ): Venda {

        if (itens.length === 0) {
            throw new Error("A venda precisa ter pelo menos um item");
        }

        for (const item of itens) {
            if (
                !Number.isInteger(item.quantidade) ||
                item.quantidade <= 0
            ) {
                throw new Error("Quantidade inválida");
            }

            if (
                !Number.isInteger(item.precoUnitarioCentavos) ||
                item.precoUnitarioCentavos <= 0
            ) {
                throw new Error("Preço do produto inválido");
            }
        }

        const subtotal = itens.reduce(
            (total, item) =>
                total + item.quantidade * item.precoUnitarioCentavos,
            0
        );

        if (
            !Number.isInteger(descontoCentavos) ||
            descontoCentavos < 0 ||
            descontoCentavos > subtotal
        ) {
            throw new Error("Desconto inválido");
        }

        return new Venda(
            0,
            [...itens],
            subtotal,
            descontoCentavos,
            subtotal - descontoCentavos,
            new Date()
        );
    }

    static reconstituir(
    id: number,
    itens: ItemVenda[],
    subtotalCentavos: number,
    descontoCentavos: number,
    totalCentavos: number,
    data: Date
): Venda {
    return new Venda(
        id,
        itens,
        subtotalCentavos,
        descontoCentavos,
        totalCentavos,
        data
    );
}
}