import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DespachanteEventos } from './DespachanteEventos';
import { NotificarConfirmacaoUseCase } from '../../application/useCases/notificar-confirmacao/NotificarConfirmacaoUseCase';
import { NotificarRejeicaoUseCase } from '../../application/useCases/notificar-rejeicao/NotificarRejeicaoUseCase';
import { NotificarCancelamentoUseCase } from '../../application/useCases/notificar-cancelamento/NotificarCancelamentoUseCase';

describe('DespachanteEventos', () => {
    let despachante: DespachanteEventos;
    let mockConfirmacao: NotificarConfirmacaoUseCase;
    let mockRejeicao: NotificarRejeicaoUseCase;
    let mockCancelamento: NotificarCancelamentoUseCase;

    beforeEach(() => {
        mockConfirmacao = { executar: vi.fn() } as any;
        mockRejeicao = { executar: vi.fn() } as any;
        mockCancelamento = { executar: vi.fn() } as any;
        despachante = new DespachanteEventos(mockConfirmacao, mockRejeicao, mockCancelamento);
    });

    it('deve logar aviso para status não mapeado', async () => {
        const spy = vi.spyOn(console, 'warn');
        const mensagem = JSON.stringify({ dados: { status: 'UNKNOWN' } });
        
        await despachante.despachar(mensagem);
        
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('Status não mapeado'));
    });

    it('deve logar erro para JSON inválido', async () => {
        const spy = vi.spyOn(console, 'error');
        await despachante.despachar('invalid-json');
        
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toContain('Erro ao processar mensagem');
    });

    it('deve chamar cancelamento para status CANCELED', async () => {
        const msg = JSON.stringify({ dados: { status: 'CANCELED' } });
        
        await despachante.despachar(msg);
        
        expect(mockCancelamento.executar).toHaveBeenCalledTimes(1);
    });

    it('deve chamar confirmacao para status CONFIRMED', async () => {
        const msg = JSON.stringify({ dados: { status: 'CONFIRMED' } });
        
        await despachante.despachar(msg);
        
        expect(mockConfirmacao.executar).toHaveBeenCalledTimes(1);
    });

    it('deve chamar rejeicao para status REJECTED', async () => {
        const msg = JSON.stringify({ dados: { status: 'REJECTED' } });
        
        await despachante.despachar(msg);
        
        expect(mockRejeicao.executar).toHaveBeenCalledTimes(1);
    });
});
