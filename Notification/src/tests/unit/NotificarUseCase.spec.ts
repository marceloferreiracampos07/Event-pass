import { describe, it, expect, vi } from 'vitest';
import { NotificarConfirmacaoUseCase } from '../../application/useCases/notificar-confirmacao/NotificarConfirmacaoUseCase';
import { NotificarRejeicaoUseCase } from '../../application/useCases/notificar-rejeicao/NotificarRejeicaoUseCase';
import { NotificarCancelamentoUseCase } from '../../application/useCases/notificar-cancelamento/NotificarCancelamentoUseCase';
import { PayloadEventoReserva } from '../../application/useCases/Dto/PayloadEventoReserva';

describe('Casos de Uso de Notificação', () => {
    const eventoMock: PayloadEventoReserva = {
        tipo: 'ReservationProcessed',
        dados: {
            reservaId: 1,
            usuarioId: 123,
            status: 'CONFIRMED'
        }
    };

    it('deve logar mensagem de confirmação corretamente', async () => {
        const spy = vi.spyOn(console, 'log');
        const useCase = new NotificarConfirmacaoUseCase();
        
        await useCase.executar(eventoMock);
        
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('usuário 123'));
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('confirmado'));
        spy.mockRestore();
    });

    it('deve logar mensagem de rejeição corretamente', async () => {
        const spy = vi.spyOn(console, 'log');
        const useCase = new NotificarRejeicaoUseCase();
        
        await useCase.executar(eventoMock);
        
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('usuário 123'));
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('esgotaram'));
        spy.mockRestore();
    });

    it('deve logar mensagem de cancelamento corretamente', async () => {
        const spy = vi.spyOn(console, 'log');
        const useCase = new NotificarCancelamentoUseCase();
        
        await useCase.executar(eventoMock);
        
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('usuário 123'));
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('cancelada'));
        spy.mockRestore();
    });
});
