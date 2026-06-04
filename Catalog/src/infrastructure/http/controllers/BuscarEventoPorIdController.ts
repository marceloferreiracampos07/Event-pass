import { Request, Response } from 'express';
import { BuscarEventoPorIdUseCase } from '../../../Usecases/buscar/BuscarEventoPorIdUseCase';
import { PrismaEventoRepository } from '../../../infrastructure/Database/PrismaEventoRepository';

export class BuscarEventoPorIdController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const repo = new PrismaEventoRepository();
        const useCase = new BuscarEventoPorIdUseCase(repo);
        
        try {
            const evento = await useCase.execute({ id });
            if (!evento) {
                return res.status(404).json({ error: 'Evento não encontrado' });
            }
            return res.json(evento);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
