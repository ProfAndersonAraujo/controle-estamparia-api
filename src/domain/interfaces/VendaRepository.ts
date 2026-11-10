
import type { Venda } from "../entities/Venda.js";

export interface VendaRepository {

    salvarComBaixaEstoque(venda: Venda): Promise<Venda>;

    buscarPorId(id: number): Promise<Venda | null>;

    listar(): Promise<Venda[]>;
}