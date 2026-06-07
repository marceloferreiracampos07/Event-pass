import { Evento } from "../../Domain/entities/Evento";
import { IEventoRepository } from "../../Domain/repositories/IEventoRepository";

export class InMemoryEventoRepository implements IEventoRepository {
    private eventos: Evento[] = [];

    async salvar(evento: Evento): Promise<void> {
        this.eventos.push(evento);
    }

    async buscarPorNome(nome: string): Promise<Evento | null> {
        return this.eventos.find(e => e.nome === nome) || null;
    }

    async listarTodos(): Promise<Evento[]> {
        return this.eventos;
    }
}
