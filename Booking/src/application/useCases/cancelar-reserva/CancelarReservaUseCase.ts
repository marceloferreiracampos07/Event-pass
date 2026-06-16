import { IReservaRepository } from "../../../Domain/repositories/IReservaRepository";
import { CancelarBookinginput } from "../Dto/CancelarBookingInput";
import { CancelarBookingOutput } from "../Dto/CancelarBookingOutput";
import { IEventBroadcaster } from "../../../Domain/Broadcast/IEventBroadcaster";
import { BookingChannels } from "../../../Domain/Broadcast/BookingChannels";

export class CancelarReservaUseCase {
    constructor(
        private repositorioReserva: IReservaRepository,
        private transmissorEvento: IEventBroadcaster
    ) {}

    async executar(entrada: CancelarBookinginput): Promise<CancelarBookingOutput> {
        const reserva = await this.repositorioReserva.buscarPorId(entrada.bookingId);

        if (!reserva) {
            throw new Error(`Reserva com ID ${entrada.bookingId} não encontrada.`);
        }

        reserva.cancelar();

        await this.repositorioReserva.atualizarStatus(entrada.bookingId, reserva.status);

        await this.transmissorEvento.publish(BookingChannels.BOOKINGS, JSON.stringify({
            tipo: "ReservationProcessed",
            dados: {
                reservaId: reserva.id,
                usuarioId: reserva.usuarioId,
                status: reserva.status
            }
        }));

        return {
            id: entrada.bookingId,
            status: reserva.status,
            message: "Reserva cancelada com sucesso."
        };
    }
}

