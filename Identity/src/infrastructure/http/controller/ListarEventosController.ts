import { Request, Response } from "express";
import { ListarEventosUseCase } from "../../../Usecase/evento/ListarEventosUseCase";

export class ListarEventosController {
    constructor(private readonly listarEventosUseCase: ListarEventosUseCase) {}

    async lidar(requisicao: Request, resposta: Response): Promise<void> {
        const resultado = await this.listarEventosUseCase.executar();

        resposta.status(200).json(resultado);
    }
}
