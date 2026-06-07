import { Evento } from "../../Domain/entities/Evento";
import { IEventoRepository } from "../../Domain/repositories/IEventoRepository";
import { CriarEventoInputDto, CriarEventoOutputDto } from "../DTO/CriarEvento.dto";
import { EventoComNomeDuplicadoError, DataDoEventoInvalidaError } from "../../Domain/errors/DomainError";
import crypto from "crypto";

export class CriarEventoUseCase {
    constructor(private eventoRepository: IEventoRepository) {}

    async executar(entrada: CriarEventoInputDto): Promise<CriarEventoOutputDto> {
        const eventoExistente = await this.eventoRepository.buscarPorNome(entrada.nome);

        if (eventoExistente) {
            throw new EventoComNomeDuplicadoError();
        }

        if (entrada.data < new Date()) {
            throw new DataDoEventoInvalidaError();
        }

        const evento = new Evento(
            crypto.randomUUID(),
            entrada.nome,
            entrada.data
        );

        await this.eventoRepository.salvar(evento);

        return {
            id: evento.id,
            nome: evento.nome,
            data: evento.data
        };
    }
}
