
import { describe, it, expect } from "vitest";

import { DescontoPromocional } from "../../src/application/use-cases/estrategias/DescontoPromocional.js";
import { SemDesconto } from "../../src/application/use-cases/estrategias/SemDesconto.js";

describe("Estratégias de desconto", () => {

    const promocional = new DescontoPromocional();
    const semDesconto = new SemDesconto();

    it("não deve aplicar desconto abaixo de R$ 200", () => {
        expect(promocional.calcular(15000)).toBe(0);
    });

    it("deve aplicar 5% para compras acima de R$ 200", () => {
        expect(promocional.calcular(25000)).toBe(1250);
    });

    it("deve aplicar 10% para compras acima de R$ 500", () => {
        expect(promocional.calcular(60000)).toBe(6000);
    });

    it("não deve aplicar desconto na estratégia sem desconto", () => {
        expect(semDesconto.calcular()).toBe(0);
    });
});