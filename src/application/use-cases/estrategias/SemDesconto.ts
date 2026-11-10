import type { EstrategiaDesconto } from "../../../domain/interfaces/EstrategiaDesconto.js";

export class SemDesconto implements EstrategiaDesconto {
    calcular(): number {
        return 0;
    }
}