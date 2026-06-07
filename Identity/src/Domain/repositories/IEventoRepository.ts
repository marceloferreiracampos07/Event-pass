import { Evento } from "../entities/Evento";

export interface IEventoRepository {
    salvar(evento: Evento): Promise<void>;
    buscarPorNome(nome: string): Promise<Evento | null>;
    listarTodos(): Promise<Evento[]>;
}
