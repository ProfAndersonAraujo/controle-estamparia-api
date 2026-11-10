
import { describe, it, expect, vi } from "vitest";

import { RegistrarVenda } from "../../src/application/use-cases/RegistrarVenda.js";
import { Produto } from "../../src/domain/entities/Produto.js";
import { DescontoPromocional } from "../../src/application/use-cases/estrategias/DescontoPromocional.js";

describe("Caso de uso RegistrarVenda", () => {

    it("deve registrar uma venda e calcular o desconto", async () => {

        const produto = Produto.criar(
            "Caneca",
            "Caneca personalizada",
            2990,
            50
        );

        const produtoRepository = {
            buscarPorId: vi.fn().mockResolvedValue(produto)
        };

        const vendaRepository = {
            salvarComBaixaEstoque: vi.fn().mockImplementation(
                async (venda) => venda
            )
        };

        const casoDeUso = new RegistrarVenda(
            produtoRepository as any,
            vendaRepository as any,
            new DescontoPromocional()
        );

        const resultado = await casoDeUso.executar({
            itens: [
                {
                    produtoId: 1,
                    quantidade: 7
                }
            ]
        });

        expect(resultado.subtotalCentavos).toBe(20930);
        expect(resultado.descontoCentavos).toBe(1047);
        expect(resultado.totalCentavos).toBe(19883);

        expect(vendaRepository.salvarComBaixaEstoque)
            .toHaveBeenCalledTimes(1);
    });

    it("não deve registrar venda com estoque insuficiente", async () => {

        const produto = Produto.criar(
            "Caneca",
            "Caneca personalizada",
            2990,
            5
        );

        const produtoRepository = {
            buscarPorId: vi.fn().mockResolvedValue(produto)
        };

        const vendaRepository = {
            salvarComBaixaEstoque: vi.fn()
        };

        const casoDeUso = new RegistrarVenda(
            produtoRepository as any,
            vendaRepository as any,
            new DescontoPromocional()
        );

        await expect(
            casoDeUso.executar({
                itens: [
                    {
                        produtoId: 1,
                        quantidade: 10
                    }
                ]
            })
        ).rejects.toThrow("Estoque insuficiente");

        expect(vendaRepository.salvarComBaixaEstoque)
            .not.toHaveBeenCalled();
    });

    it("não deve aceitar venda sem produtos", async () => {

        const produtoRepository = {
            buscarPorId: vi.fn()
        };

        const vendaRepository = {
            salvarComBaixaEstoque: vi.fn()
        };

        const casoDeUso = new RegistrarVenda(
            produtoRepository as any,
            vendaRepository as any,
            new DescontoPromocional()
        );

        await expect(
            casoDeUso.executar({ itens: [] })
        ).rejects.toThrow("A venda precisa ter produtos");
    });

});