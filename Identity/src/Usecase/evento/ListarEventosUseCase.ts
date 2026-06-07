import { IEventoRepository } from "../../Domain/repositories/IEventoRepository";

export class ListarEventosUseCase {
    constructor(private eventoRepository: IEventoRepository) {}

    async executar() {
        return await this.eventoRepository.listarTodos();
    }
}
