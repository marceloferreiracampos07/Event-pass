import { NotificarConfirmacaoUseCase } from "../../application/useCases/notificar-confirmacao/NotificarConfirmacaoUseCase";
import { NotificarRejeicaoUseCase } from "../../application/useCases/notificar-rejeicao/NotificarRejeicaoUseCase";
import { NotificarCancelamentoUseCase } from "../../application/useCases/notificar-cancelamento/NotificarCancelamentoUseCase";
import { PayloadEventoReserva } from "../../application/useCases/Dto/PayloadEventoReserva";
import { logger } from "../utils/logger";

export class DespachanteEventos {
    constructor(
        private notificarConfirmacao: NotificarConfirmacaoUseCase,
        private notificarRejeicao: NotificarRejeicaoUseCase,
        private notificarCancelamento: NotificarCancelamentoUseCase
    ) {}

    async despachar(mensagem: string): Promise<void> {
        try {
            const evento: PayloadEventoReserva = JSON.parse(mensagem);
            const status = evento.dados.status;

            const mapeamentoCasosDeUso: Record<string, { executar: (ev: PayloadEventoReserva) => Promise<void> }> = {
            'CONFIRMED': this.notificarConfirmacao,
            'REJECTED': this.notificarRejeicao,
            'CANCELED': this.notificarCancelamento,
            };
            
            const casoDeUso = mapeamentoCasosDeUso[status];

            if (casoDeUso) {
                await casoDeUso.executar(evento);
            } else {
                throw new Error(`Status não mapeado recebido: ${status}`);
            }

        } catch (erro) {
            logger.error("Erro ao processar mensagem do Redis:", erro);
        }
    }
}
