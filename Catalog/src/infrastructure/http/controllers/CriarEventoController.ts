import { Request, Response } from 'express';
import { CriarEventoUseCase } from '../../../Usecases/criar/CriarEventoUseCase';
import { PrismaEventoRepository } from '../../../infrastructure/Database/PrismaEventoRepository';

export class CriarEventoController {
    async handle(req: Request, res: Response) {
        const repo = new PrismaEventoRepository();
        const useCase = new CriarEventoUseCase(repo);
        const { nome, data, estoqueTotal } = req.body;
        
        try {
            await useCase.execute({ nome, data, estoqueTotal });
            return res.status(201).send();
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
