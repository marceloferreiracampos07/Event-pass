import { Evento } from "../../Domain/entities/Evento";
import { IrepositorioEvento } from "../../Domain/repositories/IRepositorioEvento";
import crypto from "crypto";
import { CriarEventoInputDto } from "../dto/CriarEventoInput.dto";
import { CriarEventoOutputDto } from "../dto/CriarEventoOutput.dto";

export class CriarEventoUseCase {
    constructor(
        private repositorioevento: IrepositorioEvento
    ) {}
    async execute(entrada: CriarEventoInputDto): Promise<CriarEventoOutputDto> {
        const dataDoEvento = new Date(entrada.data);
        const agora = new Date();


        if (dataDoEvento.getTime() < agora.getTime()) {
            throw new Error("Data invalida");
        }

        const novoEvento = new Evento(
            crypto.randomUUID(),
            entrada.nome,
            dataDoEvento,
            entrada.estoqueTotal,
            entrada.estoqueTotal
        );
        await this.repositorioevento.salvar(novoEvento);
        return {
            id: novoEvento.id,
            nome: novoEvento.nome,
            data: novoEvento.data,
            estoqueTotal: novoEvento.estoqueTotal,
            estoqueDisponivel: novoEvento.estoqueDisponivel
        };
    }
}
