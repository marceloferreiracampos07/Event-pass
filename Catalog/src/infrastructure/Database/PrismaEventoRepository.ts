import { IrepositorioEvento } from "../../Domain/repositories/IRepositorioEvento";
import { Evento } from "../../Domain/entities/Evento";
import { prisma } from "./prismaClient";

export class PrismaEventoRepository implements IrepositorioEvento {
    async salvar(evento: Evento): Promise<void> {
        try {
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
        } catch (error: any) {
            this.tratarErro("salvar evento", error);
        }
    }

    async listarTodos(): Promise<Evento[]> {
        try {
            const eventos = await prisma.evento.findMany();
            return eventos.map(e => this.mapToEntity(e));
        } catch (error: any) {
            this.tratarErro("listar eventos", error);
        }
    }

    async buscarPorId(id: string): Promise<Evento | null> {
        try {
            const e = await prisma.evento.findUnique({
                where: { id }
            });
            return e ? this.mapToEntity(e) : null;
        } catch (error: any) {
            this.tratarErro("buscar evento por ID", error);
        }
    }

    private mapToEntity(data: any): Evento {
        return new Evento(
            data.id,
            data.nome,
            data.data,
            data.estoqueTotal,
            data.estoqueDisponivel
        );
    }

    private tratarErro(contexto: string, erro: any): never {
        const mensagem = erro instanceof Error ? erro.message : String(erro);
        throw new Error(\Falha ao \: \\);
    }
}
