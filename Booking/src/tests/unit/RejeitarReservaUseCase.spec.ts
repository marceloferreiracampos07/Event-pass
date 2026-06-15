import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RejeitarReservaUseCase } from '@/application/useCases/rejeitar-booking/RejeitarReservaUseCase';
import { IReservaRepository } from '@/Domain/repositories/IReservaRepository';
import { IEventBroadcaster } from '@/Domain/Broadcast/IEventBroadcaster';
import { Reserva } from '@/Domain/entities/Reserva';

describe('RejeitarReservaUseCase', () => {
    let mockRepositorio: IReservaRepository;
    let mockTransmissor: IEventBroadcaster;
    let useCase: RejeitarReservaUseCase;

    beforeEach(() => {
        mockRepositorio = {
            buscarPorId: vi.fn(),
            atualizarStatus: vi.fn(),
            criar: vi.fn(),
            buscarPorUsuarioId: vi.fn(),
        } as unknown as IReservaRepository;

        mockTransmissor = {
            publish: vi.fn(),
        } as unknown as IEventBroadcaster;

        useCase = new RejeitarReservaUseCase(mockRepositorio, mockTransmissor);
    });

    it('deve rejeitar uma reserva com sucesso', async () => {
        const reserva = new Reserva(1, 1, 1, 'VIP', 'A', 'PENDING', 10);
        vi.spyOn(mockRepositorio, 'buscarPorId').mockResolvedValue(reserva);

        const resultado = await useCase.executar({ id: 10 });

        expect(resultado.status).toBe('REJECTED');
        expect(mockRepositorio.atualizarStatus).toHaveBeenCalledWith(10, 'REJECTED');
        expect(mockTransmissor.publish).toHaveBeenCalled();
    });

    it('deve lançar erro se a reserva não existir', async () => {
        vi.spyOn(mockRepositorio, 'buscarPorId').mockResolvedValue(null);
        await expect(useCase.executar({ id: 99 })).rejects.toThrow('Reserva com ID 99 não encontrada');
    });
});
