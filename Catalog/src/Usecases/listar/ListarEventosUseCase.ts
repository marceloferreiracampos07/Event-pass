import { IrepositorioEvento } from "../../Domain/repositories/IRepositorioEvento";
import { ListarEventosOutputDto } from "../dto/ListarEventosOutput.dto";
import { BuscarEventoPorIdInputDto } from "../dto/BuscarEventoPorIdInputDto";
import { BuscarEventoPorIdOutputDto } from "../dto/BuscarEventoPorIdOutputDto";

export class ListarEventosUseCase {
    constructor(
        private repositorioevento: IrepositorioEvento
    ) {}

    async execute(): Promise<ListarEventosOutputDto[]> {
        
        const eventosDoBanco = await this.repositorioevento.listarTodos();

        
        return eventosDoBanco.map(evento => ({
            id: evento.id,
            nome: evento.nome,
            data: evento.data,
            estoqueTotal: evento.estoqueTotal,
            estoqueDisponivel: evento.estoqueDisponivel
        }));
    }

    async buscarPorId(entrada: BuscarEventoPorIdInputDto): Promise<BuscarEventoPorIdOutputDto> {
        
        const evento = await this.repositorioevento.buscarPorId(entrada.id);

        
        if (!evento) {
            throw new Error("Evento nÃ£o encontrado");
        }

        
        return {
            id: evento.id,
            nome: evento.nome,
            data: evento.data,
            estoqueTotal: evento.estoqueTotal,
            estoqueDisponivel: evento.estoqueDisponivel
        };
    }
}
