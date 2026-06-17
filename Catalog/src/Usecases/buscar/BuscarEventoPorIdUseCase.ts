import { IrepositorioEvento } from "../../Domain/repositories/IRepositorioEvento";
import { BuscarEventoPorIdInputDto } from "../dto/BuscarEventoPorIdInputDto";
import { BuscarEventoPorIdOutputDto } from "../dto/BuscarEventoPorIdOutputDto";
import { BookingClient } from "../../infrastructure/http/Services/BookingClient";

export class BuscarEventoPorIdUseCase {
    constructor(
        private readonly repositorio: IrepositorioEvento,
        private readonly bookingClient: BookingClient
    ) {}

    async execute(input: BuscarEventoPorIdInputDto): Promise<BuscarEventoPorIdOutputDto | null> {
        const evento = await this.repositorio.buscarPorId(input.id);
        if (!evento) {
            return null;
        }

        const reservasConfirmadas = await this.bookingClient.getConfirmedCount(Number(evento.id));
        const estoqueDisponivel = Math.max(0, evento.estoqueTotal - reservasConfirmadas);

        return {
            id: evento.id,
            nome: evento.nome,
            data: evento.data,
            estoqueTotal: evento.estoqueTotal,
            estoqueDisponivel: estoqueDisponivel
        };
    }
}
