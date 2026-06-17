import { Request, Response, NextFunction } from "express";
import { IReservaRepository } from "../../../Domain/repositories/IReservaRepository";

export class CountConfirmedController {
    constructor(private readonly repositorio: IReservaRepository) {}

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { eventId } = req.params;
            const count = await this.repositorio.countConfirmedByEventId(Number(eventId));
            res.status(200).json({ count });
        } catch (erro: any) {
            next(erro);
        }
    }
}
