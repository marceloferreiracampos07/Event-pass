import { Request, Response } from 'express';
import { BuscarEventoPorIdUseCase } from '../../../Usecases/buscar/BuscarEventoPorIdUseCase';

export class BuscarEventoPorIdController {
    constructor(private readonly useCase: BuscarEventoPorIdUseCase) {}

    async handle(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const evento = await this.useCase.execute({ id });
            if (!evento) {
                return res.status(404).json({ error: 'Evento não encontrado' });
            }
            return res.json(evento);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
