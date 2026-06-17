import { Request, Response, NextFunction } from "express"
import { ConfirmarReservaUseCase } from "../../../application/useCases/confirmar-reserva/ConfirmarReservaUseCase"

export class ConfirmarReservaController {
    constructor(private readonly confirmarReserva: ConfirmarReservaUseCase) {}

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const reserva = (req as any).booking;

            const saida = await this.confirmarReserva.executar({ id: Number(reserva.id) });
            res.status(200).json(saida);
        } catch (erro: any) {
            next(erro);
        }
    }
}
