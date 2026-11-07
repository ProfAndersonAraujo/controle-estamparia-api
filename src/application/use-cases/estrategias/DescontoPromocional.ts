
import type { EstrategiaDesconto } from "../../../domain/interfaces/EstrategiaDesconto.ts";

export class DescontoPromocional implements EstrategiaDesconto {

    calcular(subtotalCentavos: number): number {

        if (subtotalCentavos >= 50000) {
            return Math.round(subtotalCentavos * 0.10);
        }

        if (subtotalCentavos >= 20000) {
            return Math.round(subtotalCentavos * 0.05);
        }

        return 0;
    }
}