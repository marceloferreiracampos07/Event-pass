import { IrepositorioEvento } from "../../Domain/repositories/IRepositorioEvento";
import { BuscarEventoPorIdInputDto } from "../dto/BuscarEventoPorIdInputDto";
import { BuscarEventoPorIdOutputDto } from "../dto/BuscarEventoPorIdOutputDto";
import { Evento } from "../../Domain/entities/Evento";

export class BuscarEventoPorIdUseCase {
    constructor(private readonly repositorio: IrepositorioEvento) {}

    async execute(input: BuscarEventoPorIdInputDto): Promise<BuscarEventoPorIdOutputDto | null> {
        const evento = await this.repositorio.buscarPorId(input.id);
        if (!evento){
            throw new Error("Evento não encontrado");
        };
        return {
            id: evento.id,
            nome: evento.nome,
            data: evento.data,
            estoqueTotal: evento.estoqueTotal,
            estoqueDisponivel: evento.estoqueDisponivel
        };
    }
}
