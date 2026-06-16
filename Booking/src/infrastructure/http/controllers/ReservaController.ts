import { Request, Response } from "express"
import { CriarReservaUseCase } from "../../../application/useCases/criar-reserva/CriarReservaUseCase"
import { ConfirmarReservaUseCase } from "../../../application/useCases/confirmar-reserva/ConfirmarReservaUseCase"
import { RejeitarReservaUseCase } from "../../../application/useCases/rejeitar-reserva/RejeitarReservaUseCase"
import { DomainError, BookingValidationError } from "../../../Domain/errors/DomainError"
import { CriarReservaInput } from "../../../application/useCases/Dto/CriarReservaInput"

export class ReservaController {
    constructor(
        private readonly criarReserva: CriarReservaUseCase,
        private readonly confirmarReserva: ConfirmarReservaUseCase,
        private readonly rejeitarReserva: RejeitarReservaUseCase
    ) {}

    async Criar(req: Request, res: Response): Promise<Response> {
        try {
            const usuario = (req as any).user;
            if (!usuario?.id) {
                return res.status(401).json({ erro: "Usu√°rio n„o autenticado" });
            }

            const { eventoId, quantidadeIngressos, tipoIngresso, setor } = req.body;

            const entrada: CriarReservaInput = {
                eventoId: Number(eventoId),
                usuarioId: Number(usuario.id),
                quantidadeIngressos: Number(quantidadeIngressos),
                tipoIngresso,
                setor
            };

            const saida = await this.criarReserva.executar(entrada);
            return res.status(201).json(saida);

        } catch (erro: any) {
            if (erro instanceof DomainError) {
                return res.status(erro.statusCode).json({ erro: erro.message, codigo: erro.errorCode });
            }
            return res.status(400).json({ erro: erro.message || "Erro na requisi√ß√£o", codigo: "ERRO_VALIDACAO" });
        }
    }

    async Confirmar(req: Request, res: Response): Promise<Response> {
        try {
            const reserva = (req as any).booking;
            if (!reserva || reserva.status !== "PENDING") {
                throw new BookingValidationError("Esta reserva n„o est√° mais pendente ou n„o foi encontrada");
            }

            const saida = await this.confirmarReserva.executar({ id: Number(reserva.id) });
            return res.status(200).json(saida);

        } catch (erro: any) {
            if (erro instanceof DomainError) {
                return res.status(erro.statusCode).json({ erro: erro.message, codigo: erro.errorCode });
            }
            console.error("DEBUG - ReservaController - Erro:", erro); return res.status(500).json({ erro: erro.message || "Erro interno no servidor", codigo: "ERRO_INTERNO_SERVIDOR" });
        }
    }

    async Rejeitar(req: Request, res: Response): Promise<Response> {
        try {
            const reserva = (req as any).booking;
            if (!reserva || reserva.status !== "PENDING") {
                throw new BookingValidationError("Esta reserva n„o est√° mais pendente ou n„o foi encontrada");
            }

            const saida = await this.rejeitarReserva.executar({ id: Number(reserva.id) });
            return res.status(200).json(saida);

        } catch (erro: any) {
            if (erro instanceof DomainError) {
                return res.status(erro.statusCode).json({ erro: erro.message, codigo: erro.errorCode });
            }
            console.error("DEBUG - ReservaController - Erro:", erro); return res.status(500).json({ erro: erro.message || "Erro interno no servidor", codigo: "ERRO_INTERNO_SERVIDOR" });
        }
    }
}

