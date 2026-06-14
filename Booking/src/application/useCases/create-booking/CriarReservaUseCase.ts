import { Reserva } from "../../../Domain/entities/Reserva"
import { IReservaRepository } from "../../../Domain/repositories/IReservaRepository"
import { IEventService } from "../../../Domain/services/IEventService"
import { IEventBroadcaster } from "../../../Domain/Broadcast/IEventBroadcaster"
import { AvailabilityError } from "../../../Domain/errors/DomainError"
import { CriarReservaInput } from "../Dto/CriarReservaInput"
import { CriarReservaOutput } from "../Dto/CriarReservaOutput"
import { BookingChannels } from "../../../Domain/Broadcast/BookingChannels"

export class CriarReservaUseCase {
    constructor(
        private readonly repositorioReserva: IReservaRepository,
        private readonly servicoEvento: IEventService,
        private readonly transmissorEvento: IEventBroadcaster
    ) {}

    async executar(entrada: CriarReservaInput): Promise<CriarReservaOutput> {
        const disponivel = await this.servicoEvento.verificarDisponibilidade(
            entrada.eventoId,
            entrada.quantidadeIngressos,
            entrada.setor
        );

        if (!disponivel) {
            throw new AvailabilityError();
        }

        const reservaDominio = new Reserva(
            entrada.eventoId,
            entrada.usuarioId,
            entrada.quantidadeIngressos,
            entrada.tipoIngresso,
            entrada.setor
        );

        const reservaSalva = await this.repositorioReserva.criar(reservaDominio);
        
        await this.transmissorEvento.publish(BookingChannels.BOOKINGS_CREATE, JSON.stringify({
            tipo: "BookingCreated",
            dados: {
                reservaId: reservaSalva.id,
                usuarioId: reservaSalva.usuarioId,
                eventoId: reservaSalva.eventoId,
                status: reservaSalva.status
            }
        }));

        return {
            id: reservaSalva.id!,
            eventoId: reservaSalva.eventoId,
            usuarioId: reservaSalva.usuarioId,
            status: reservaSalva.status,
            criadoEm: reservaSalva.criadoEm
        };
    }
}
