
import type { EstrategiaDesconto } from "../../../domain/interfaces/EstrategiaDesconto.ts";

export class SemDesconto implements EstrategiaDesconto {

    calcular(subtotalCentavos: number): number {
        return 0;
    }
}