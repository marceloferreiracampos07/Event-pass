import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfirmarReservaUseCase } from '@/application/useCases/confirmar-booking/ConfirmarReservaUseCase';
import { IReservaRepository } from '@/Domain/repositories/IReservaRepository';
import { IEventBroadcaster } from '@/Domain/Broadcast/IEventBroadcaster';
import { Reserva } from '@/Domain/entities/Reserva';

describe('ConfirmarReservaUseCase', () => {
    let mockRepositorio: IReservaRepository;
    let mockTransmissor: IEventBroadcaster;
    let useCase: ConfirmarReservaUseCase;

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

        useCase = new ConfirmarReservaUseCase(mockRepositorio, mockTransmissor);
    });

    it('deve confirmar uma reserva com sucesso', async () => {
        const reserva = new Reserva(1, 1, 1, 'VIP', 'A', 'PENDING', 10);
        vi.spyOn(mockRepositorio, 'buscarPorId').mockResolvedValue(reserva);

        const resultado = await useCase.executar({ id: 10 });

        expect(resultado.status).toBe('CONFIRMED');
        expect(mockRepositorio.atualizarStatus).toHaveBeenCalledWith(10, 'CONFIRMED');
        expect(mockTransmissor.publish).toHaveBeenCalled();
    });

    it('deve lançar erro se a reserva não existir', async () => {
        vi.spyOn(mockRepositorio, 'buscarPorId').mockResolvedValue(null);

        await expect(useCase.executar({ id: 99 })).rejects.toThrow('Não foi possível encontrar reserva com ID 99');
    });
});
