import { Request, Response } from 'express';
import { ListarEventosUseCase } from '../../../Usecases/listar/ListarEventosUseCase';
import { PrismaEventoRepository } from '../../../infrastructure/Database/PrismaEventoRepository';

export class ListarEventosController {
    async handle(req: Request, res: Response) {
        try {
            const repo = new PrismaEventoRepository();
            const useCase = new ListarEventosUseCase(repo);
            const eventos = await useCase.execute();
            return res.json(eventos);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro interno ao listar eventos" });
        }
    }
}
