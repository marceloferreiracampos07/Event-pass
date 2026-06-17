import { IReservaRepository } from "../../../Domain/repositories/IReservaRepository";
import { IEventBroadcaster } from "../../../Domain/Broadcast/IEventBroadcaster";
import { BookingChannels } from "../../../Domain/Broadcast/BookingChannels";
import { ConfirmarBookingInput } from "../Dto/ConfirmarBookingInput";
import { ConfirmarBookingOutput } from "../Dto/ConfirmarBookingOutput";

export class ConfirmarReservaUseCase {
    constructor(
        private repositorioReserva: IReservaRepository,
        private transmissorEvento: IEventBroadcaster
    ) {}

    async executar(entrada: ConfirmarBookingInput): Promise<ConfirmarBookingOutput> {
        const reserva = await this.repositorioReserva.buscarPorId(entrada.id);
        
        if (!reserva) {
            throw new Error(`Não foi possível encontrar reserva com ID ${entrada.id}`);
        }
        
        reserva.confirmar();

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
            message: "Reserva confirmada com sucesso!"
        };
    }
}
