import { IReservaRepository } from "../../../Domain/repositories/IReservaRepository";
import { IEventBroadcaster } from "../../../Domain/Broadcast/IEventBroadcaster";
import { BookingChannels } from "../../../Domain/Broadcast/BookingChannels";

export interface RejeitarReservaInput {
    id: number;
}

export interface RejeitarReservaOutput {
    id: number;
    status: string;
    mensagem: string;
}

export class RejeitarReservaUseCase {
    constructor(
        private repositorioReserva: IReservaRepository,
        private transmissorEvento: IEventBroadcaster
    ) {}

    async executar(entrada: RejeitarReservaInput): Promise<RejeitarReservaOutput> {
        const reserva = await this.repositorioReserva.buscarPorId(entrada.id);
        
        if (!reserva) {
            throw new Error(`Reserva com ID ${entrada.id} não encontrada`);
        }
        
        reserva.rejeitar();

        await this.repositorioReserva.atualizarStatus(entrada.id, reserva.status);

        await this.transmissorEvento.publish(BookingChannels.BOOKINGS, JSON.stringify({
            tipo: "ReservationProcessed",
            dados: {
                reservaId: reserva.id,
                usuarioId: reserva.usuarioId,
                status: reserva.status
            }
        }));

        return {
            id: entrada.id,
            status: reserva.status,
            mensagem: "Reserva rejeitada com sucesso"
        };
    }
}

