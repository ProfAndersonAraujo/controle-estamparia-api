
import { describe, it, expect } from "vitest";

import { Venda } from "../../src/domain/entities/Venda.js";

describe("Entidade Venda", () => {

    it("deve calcular corretamente o subtotal", () => {

        const venda = Venda.criar([
            {
                produtoId: 1,
                nomeProduto: "Caneca",
                quantidade: 2,
                precoUnitarioCentavos: 2990
            }
        ]);

        expect(venda.subtotalCentavos).toBe(5980);
        expect(venda.totalCentavos).toBe(5980);
    });

    it("deve calcular o total com desconto", () => {

        const venda = Venda.criar(
            [
                {
                    produtoId: 1,
                    nomeProduto: "Caneca",
                    quantidade: 2,
                    precoUnitarioCentavos: 2990
                }
            ],
            500
        );

        expect(venda.subtotalCentavos).toBe(5980);
        expect(venda.descontoCentavos).toBe(500);
        expect(venda.totalCentavos).toBe(5480);
    });

    it("não deve permitir venda sem itens", () => {

        expect(() => {
            Venda.criar([]);
        }).toThrow("A venda precisa ter pelo menos um item");
    });

    it("não deve permitir quantidade inválida", () => {

        expect(() => {
            Venda.criar([
                {
                    produtoId: 1,
                    nomeProduto: "Caneca",
                    quantidade: 0,
                    precoUnitarioCentavos: 2990
                }
            ]);
        }).toThrow("Quantidade inválida");
    });

    it("não deve permitir desconto maior que o subtotal", () => {

        expect(() => {
            Venda.criar(
                [
                    {
                        produtoId: 1,
                        nomeProduto: "Caneca",
                        quantidade: 1,
                        precoUnitarioCentavos: 2990
                    }
                ],
                5000
            );
        }).toThrow("Desconto inválido");
    });

    it("não deve aceitar preço unitário inválido", () => {
    expect(() => {
        Venda.criar([
            {
                produtoId: 1,
                nomeProduto: "Caneca",
                quantidade: 1,
                precoUnitarioCentavos: 0
            }
        ]);
    }).toThrow("Preço do produto inválido");
});

it("deve reconstruir uma venda existente", () => {
    const venda = Venda.reconstituir(
        10,
        [],
        10000,
        500,
        9500,
        new Date()
    );

    expect(venda.id).toBe(10);
    expect(venda.totalCentavos).toBe(9500);
    });

});