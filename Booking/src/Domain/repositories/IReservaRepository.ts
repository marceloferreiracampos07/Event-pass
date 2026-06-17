import { Reserva, StatusReserva } from "../entities/Reserva"

export interface IReservaRepository {
    criar(reserva: Reserva): Promise<Reserva>
    buscarPorId(id: number): Promise<Reserva | null>
    atualizarStatus(id: number, status: StatusReserva): Promise<void>
    buscarPorUsuarioId(usuarioId: number): Promise<Reserva[]>
    countConfirmedByEventId(eventId: number): Promise<number>
}

