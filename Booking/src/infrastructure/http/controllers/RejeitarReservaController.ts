import { Request, Response, NextFunction } from "express"
import { RejeitarReservaUseCase } from "../../../application/useCases/rejeitar-reserva/RejeitarReservaUseCase"

export class RejeitarReservaController {
    constructor(private readonly rejeitarReserva: RejeitarReservaUseCase) {}

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const reserva = (req as any).booking;

            const saida = await this.rejeitarReserva.executar({ id: Number(reserva.id) });
            res.status(200).json(saida);
        } catch (erro: any) {
            next(erro);
        }
    }
}
