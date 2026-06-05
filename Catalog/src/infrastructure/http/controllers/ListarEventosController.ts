import { Request, Response } from 'express';
import { ListarEventosUseCase } from '../../../Usecases/listar/ListarEventosUseCase';

export class ListarEventosController {
    constructor(private readonly useCase: ListarEventosUseCase) {}

    async handle(req: Request, res: Response) {
        try {
            const eventos = await this.useCase.execute();
            return res.json(eventos);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro interno ao listar eventos" });
        }
    }
}
