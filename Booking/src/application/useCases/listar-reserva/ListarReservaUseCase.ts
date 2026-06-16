import { IReservaRepository } from "../../../Domain/repositories/IReservaRepository";
import { ListarBookingOutput } from "../Dto/ListarBookingOutput";
import { ListarBookingInput } from "../Dto/ListarBookingInput";

export class ListarReservaUseCase {
    constructor(
        private repositorioReserva: IReservaRepository
    ) {}

    async executar(entrada: ListarBookingInput): Promise<ListarBookingOutput> {     
        const reservas = await this.repositorioReserva.buscarPorUsuarioId(entrada.userId);

        const listaReservas = reservas.map(reserva => ({
            id: reserva.id!,
            eventoId: reserva.eventoId,
            userId: reserva.usuarioId,
            status: reserva.status,
            createdAt: reserva.criadoEm
        }));

        return {
            bookings: listaReservas
        };
    }
}

