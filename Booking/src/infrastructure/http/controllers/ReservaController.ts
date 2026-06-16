import { Request, Response, NextFunction } from "express"
import { CriarReservaUseCase } from "../../../application/useCases/criar-reserva/CriarReservaUseCase"
import { ConfirmarReservaUseCase } from "../../../application/useCases/confirmar-reserva/ConfirmarReservaUseCase"
import { RejeitarReservaUseCase } from "../../../application/useCases/rejeitar-reserva/RejeitarReservaUseCase"
import { BookingValidationError } from "../../../Domain/errors/DomainError"
import { CriarReservaInput } from "../../../application/useCases/Dto/CriarReservaInput"

export class ReservaController {
    constructor(
        private readonly criarReserva: CriarReservaUseCase,
        private readonly confirmarReserva: ConfirmarReservaUseCase,
        private readonly rejeitarReserva: RejeitarReservaUseCase
    ) {}

    async Criar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const usuario = (req as any).user;

            const { eventoId, quantidadeIngressos, tipoIngresso, setor } = req.body;

            const entrada: CriarReservaInput = {
                eventoId: Number(eventoId),
                usuarioId: Number(usuario.id),
                quantidadeIngressos: Number(quantidadeIngressos),
                tipoIngresso,
                setor
            };

            const saida = await this.criarReserva.executar(entrada);
            res.status(201).json(saida);

        } catch (erro: any) {
            next(erro);
        }
    }

    async Confirmar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const reserva = (req as any).booking;
            if (!reserva || reserva.status !== "PENDING") {
                throw new BookingValidationError("Esta reserva não está mais pendente ou não foi encontrada");
            }

            const saida = await this.confirmarReserva.executar({ id: Number(reserva.id) });
            res.status(200).json(saida);

        } catch (erro: any) {
            next(erro);
        }
    }

    async Rejeitar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const reserva = (req as any).booking;
            if (!reserva || reserva.status !== "PENDING") {
                throw new BookingValidationError("Esta reserva não está mais pendente ou não foi encontrada");
            }

            const saida = await this.rejeitarReserva.executar({ id: Number(reserva.id) });
            res.status(200).json(saida);

        } catch (erro: any) {
            next(erro);
        }
    }
}
