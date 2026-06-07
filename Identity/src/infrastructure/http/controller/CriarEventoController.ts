import { Request, Response } from "express";
import { CriarEventoUseCase } from "../../../Usecase/evento/CriarEventoUseCase";
import { CriarEventoSchema } from "../schemas/CriarEvento.schema";

export class CriarEventoController {
    constructor(private readonly criarEventoUseCase: CriarEventoUseCase) {}

    async lidar(requisicao: Request, resposta: Response): Promise<void> {
        const dadosValidados = CriarEventoSchema.parse(requisicao.body);
        const resultado = await this.criarEventoUseCase.executar(dadosValidados);

        resposta.status(201).json(resultado);
    }
}
