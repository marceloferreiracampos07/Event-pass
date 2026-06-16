import { AssinanteRedis } from './infrastructure/Queue/AssinanteRedis';
import { DespachanteEventos } from './infrastructure/Queue/DespachanteEventos';
import { NotificarConfirmacaoUseCase } from './application/useCases/notificar-confirmacao/NotificarConfirmacaoUseCase';
import { NotificarRejeicaoUseCase } from './application/useCases/notificar-rejeicao/NotificarRejeicaoUseCase';
import { NotificarCancelamentoUseCase } from './application/useCases/notificar-cancelamento/NotificarCancelamentoUseCase';
import { validarConfiguracao } from './infrastructure/config/config-redis';

async function bootstrap() {
    try {
        validarConfiguracao();

        const useCaseConfirmacao = new NotificarConfirmacaoUseCase();
        const useCaseRejeicao = new NotificarRejeicaoUseCase();
        const useCaseCancelamento = new NotificarCancelamentoUseCase();

        const despachante = new DespachanteEventos(
            useCaseConfirmacao,
            useCaseRejeicao,
            useCaseCancelamento
        );

import { logger } from './infrastructure/utils/logger';
...
        const assinante = new AssinanteRedis(despachante);
        await assinante.iniciar();

        logger.info("Serviço de Notificação iniciado com sucesso.");
    } catch (erro) {
        logger.error("Falha ao iniciar o serviço:", erro);
        process.exit(1);
    }
}

bootstrap();
