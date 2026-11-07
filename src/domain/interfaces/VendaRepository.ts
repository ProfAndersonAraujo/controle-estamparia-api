
import type { Venda } from "../entities/Venda.js";

export interface VendaRepository {
    salvar(venda: Venda): Promise<Venda>;

    buscarPorId(id: number): Promise<Venda | null>;

    listar(): Promise<Venda[]>;
}