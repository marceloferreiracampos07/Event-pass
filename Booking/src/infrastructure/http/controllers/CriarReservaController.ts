import { Request, Response, NextFunction } from "express"
import { CriarReservaUseCase } from "../../../application/useCases/criar-reserva/CriarReservaUseCase"
import { CriarReservaInput } from "../../../application/useCases/Dto/CriarReservaInput"

export class CriarReservaController {
    constructor(private readonly criarReserva: CriarReservaUseCase) {}

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
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
}
