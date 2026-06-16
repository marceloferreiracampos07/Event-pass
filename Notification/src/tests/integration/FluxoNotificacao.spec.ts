import { describe, it, expect, vi } from 'vitest';
import { DespachanteEventos } from '../../infrastructure/Queue/DespachanteEventos';
import { NotificarConfirmacaoUseCase } from '../../application/useCases/notificar-confirmacao/NotificarConfirmacaoUseCase';
import { NotificarRejeicaoUseCase } from '../../application/useCases/notificar-rejeicao/NotificarRejeicaoUseCase';
import { NotificarCancelamentoUseCase } from '../../application/useCases/notificar-cancelamento/NotificarCancelamentoUseCase';

describe('Integração - Despachante de Eventos', () => {
    it('deve rotear evento CONFIRMED para o use case de confirmação', async () => {
        const useCaseConfirmacao = new NotificarConfirmacaoUseCase();
        const useCaseRejeicao = new NotificarRejeicaoUseCase();
        const useCaseCancelamento = new NotificarCancelamentoUseCase();
        
        const spy = vi.spyOn(useCaseConfirmacao, 'executar');
        const despachante = new DespachanteEventos(useCaseConfirmacao, useCaseRejeicao, useCaseCancelamento);

        const mensagem = JSON.stringify({
            dados: { usuarioId: 1, status: 'CONFIRMED' }
        });

        await despachante.despachar(mensagem);

        expect(spy).toHaveBeenCalled();
    });

    it('deve rotear evento REJECTED para o use case de rejeição', async () => {
        const useCaseConfirmacao = new NotificarConfirmacaoUseCase();
        const useCaseRejeicao = new NotificarRejeicaoUseCase();
        const useCaseCancelamento = new NotificarCancelamentoUseCase();
        
        const spy = vi.spyOn(useCaseRejeicao, 'executar');
        const despachante = new DespachanteEventos(useCaseConfirmacao, useCaseRejeicao, useCaseCancelamento);

        const mensagem = JSON.stringify({
            dados: { usuarioId: 1, status: 'REJECTED' }
        });

        await despachante.despachar(mensagem);

        expect(spy).toHaveBeenCalled();
    });
});
