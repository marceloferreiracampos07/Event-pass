import { Request, Response } from 'express';
import { CriarEventoUseCase } from '../../../Usecases/criar/CriarEventoUseCase';
import { PrismaEventoRepository } from '../../../infrastructure/Database/PrismaEventoRepository';

export class CriarEventoController {
    constructor(private readonly useCase: CriarEventoUseCase) {}

    async handle(req: Request, res: Response) {
        const { nome, data, estoqueTotal } = req.body;

        try {
            const resultado = await this.useCase.execute({ nome, data, estoqueTotal });
            return res.status(201).json(resultado);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
