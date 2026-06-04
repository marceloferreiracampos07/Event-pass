import { Evento } from "../entities/Evento";

export interface IrepositorioEvento {
    salvar(evento: Evento): Promise<void>;
    listarTodos(): Promise<Evento[]>;
    buscarPorId(id: string): Promise<Evento | null>;
}