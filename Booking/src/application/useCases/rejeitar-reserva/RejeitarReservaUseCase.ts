import { IReservaRepository } from "../../../Domain/repositories/IReservaRepository";
import { IEventBroadcaster } from "../../../Domain/Broadcast/IEventBroadcaster";
import { BookingChannels } from "../../../Domain/Broadcast/BookingChannels";
import { RejeitarBookingInput } from "../Dto/RejeitarBookingInput";
import { RejeitarBookingOutput } from "../Dto/RejeitarBookingOutput";

export class RejeitarReservaUseCase {
    constructor(
        private repositorioReserva: IReservaRepository,
        private transmissorEvento: IEventBroadcaster
    ) {}

    async executar(entrada: RejeitarBookingInput): Promise<RejeitarBookingOutput> {
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
            message: "Reserva rejeitada com sucesso"
        };
    }
}
