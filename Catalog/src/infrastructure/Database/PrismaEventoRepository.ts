import { IrepositorioEvento } from "../../Domain/repositories/IRepositorioEvento";
import { Evento } from "../../Domain/entities/Evento";
import { prisma } from "./prismaClient";

export class PrismaEventoRepository implements IrepositorioEvento {
    async salvar(evento: Evento): Promise<void> {
        await prisma.evento.upsert({
            where: { id: evento.id },
            update: {
                nome: evento.nome,
                data: evento.data,
                estoqueTotal: evento.estoqueTotal,
                estoqueDisponivel: evento.estoqueDisponivel
            },
            create: {
                id: evento.id,
                nome: evento.nome,
                data: evento.data,
                estoqueTotal: evento.estoqueTotal,
                estoqueDisponivel: evento.estoqueDisponivel
            }
        });
    }

    async listarTodos(): Promise<Evento[]> {
        const eventos = await prisma.evento.findMany();
        return eventos.map(e => new Evento(e.id, e.nome, e.data, e.estoqueTotal, e.estoqueDisponivel));
    }

    async buscarPorId(id: string): Promise<Evento | null> {
        const e = await prisma.evento.findUnique({
            where: { id }
        });
        if (!e) return null;
        return new Evento(e.id, e.nome, e.data, e.estoqueTotal, e.estoqueDisponivel);
    }
}
