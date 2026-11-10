
import { describe, it, expect } from "vitest";

import { Produto } from "../../src/domain/entities/Produto.js";

describe("Entidade Produto", () => {

    it("deve criar um produto corretamente", () => {

        const produto = Produto.criar(
            "Caneca personalizada",
            "Caneca de porcelana",
            2990,
            50
        );

        expect(produto.nome).toBe("Caneca personalizada");
        expect(produto.precoCentavos).toBe(2990);
        expect(produto.estoque).toBe(50);
        expect(produto.status).toBe(true);
    });

    it("não deve criar produto sem nome", () => {

        expect(() => {
            Produto.criar("", "Descrição", 2990, 10);
        }).toThrow("Nome obrigatório");
    });

    it("não deve aceitar preço negativo", () => {

        expect(() => {
            Produto.criar("Caneca", "Descrição", -100, 10);
        }).toThrow("Preço inválido");
    });

    it("deve adicionar estoque", () => {

        const produto = Produto.criar(
            "Caneca",
            "Descrição",
            2990,
            10
        );

        produto.adicionarEstoque(5);

        expect(produto.estoque).toBe(15);
    });

    it("deve retirar estoque", () => {

        const produto = Produto.criar(
            "Caneca",
            "Descrição",
            2990,
            10
        );

        produto.retirarEstoque(3);

        expect(produto.estoque).toBe(7);
    });

    it("não deve permitir estoque insuficiente", () => {

        const produto = Produto.criar(
            "Caneca",
            "Descrição",
            2990,
            10
        );

        expect(() => {
            produto.retirarEstoque(15);
        }).toThrow("Estoque insuficiente");

        expect(produto.estoque).toBe(10);
    });

    it("não deve aceitar quantidade inválida", () => {

        const produto = Produto.criar(
            "Caneca",
            "Descrição",
            2990,
            10
        );

        expect(() => {
            produto.adicionarEstoque(0);
        }).toThrow("Quantidade inválida");
    });

    it("deve desativar um produto", () => {

        const produto = Produto.criar(
            "Caneca",
            "Descrição",
            2990,
            10
        );

        produto.desativar();

        expect(produto.status).toBe(false);
    });

    it("deve reconstruir um produto existente", () => {
    const produto = Produto.reconstituir(
        10,
        "Camiseta",
        "Camiseta personalizada",
        6490,
        20,
        true
    );

    expect(produto.id).toBe(10);
    expect(produto.estoque).toBe(20);
    });

    it("não deve aceitar estoque inicial negativo", () => {
        expect(() => {
        Produto.criar("Caneca", "Descrição", 2990, -1);
        }).toThrow("Estoque inválido");
    });

});