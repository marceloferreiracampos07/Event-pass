import { Reserva, StatusReserva } from "../../Domain/entities/Reserva";
import { PrismaClient } from "../../generated/prisma"
import { IReservaRepository } from "../../Domain/repositories/IReservaRepository";

export class PrismaReservaRepository implements IReservaRepository {
    constructor(private prisma: PrismaClient) {}

    async criar(reserva: Reserva): Promise<Reserva> {
        const resultado = await this.prisma.booking.create({
            data: {
                eventId: reserva.eventoId,
                userId: reserva.usuarioId,
                quantidadeIngressos: reserva.quantidadeIngressos,
                tipoIngresso: reserva.tipoIngresso,
                setor: reserva.setor,
                status: reserva.status,
                createdAt: reserva.criadoEm
            }
        });    
        return new Reserva(
            resultado.eventId,
            resultado.userId,
            resultado.quantidadeIngressos,
            resultado.tipoIngresso,
            resultado.setor,
            resultado.status as StatusReserva,
            resultado.id,
            resultado.createdAt
        );
    }

    async buscarPorId(id: number): Promise<Reserva | null> {
        const resultado = await this.prisma.booking.findUnique({
            where: { id }
        });

        if (!resultado) return null;

        return new Reserva(
            resultado.eventId,
            resultado.userId,
            resultado.quantidadeIngressos,
            resultado.tipoIngresso,
            resultado.setor,
            resultado.status as StatusReserva,
            resultado.id,
            resultado.createdAt
        );
    }

    async atualizarStatus(id: number, status: StatusReserva): Promise<void> {
        await this.prisma.booking.update({
            where: { id },
            data: { status }
        });
    }

    async buscarPorUsuarioId(usuarioId: number): Promise<Reserva[]> {
        const resultados = await this.prisma.booking.findMany({
            where: { userId: usuarioId }
        });

        return resultados.map(resultado => new Reserva(
            resultado.eventId,
            resultado.userId,
            resultado.quantidadeIngressos,
            resultado.tipoIngresso,
            resultado.setor,
            resultado.status as StatusReserva,
            resultado.id,
            resultado.createdAt
        ));
    }
}

