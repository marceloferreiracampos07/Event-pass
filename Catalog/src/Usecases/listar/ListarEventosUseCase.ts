import { IrepositorioEvento } from "../../Domain/repositories/IRepositorioEvento";
import { ListarEventosOutputDto } from "../dto/ListarEventosOutput.dto";

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
}
