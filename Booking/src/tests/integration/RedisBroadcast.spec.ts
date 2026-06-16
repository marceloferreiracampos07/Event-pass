import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RedisBroadcastService } from '@/infrastructure/Broadcast/PrismaBookingService';
import { createClient } from 'redis';

vi.mock('redis', () => ({
    createClient: vi.fn().mockReturnValue({
        on: vi.fn(),
        connect: vi.fn().mockResolvedValue(undefined),
        publish: vi.fn().mockResolvedValue(1),
        subscribe: vi.fn().mockImplementation((canal, callback) => {
            // Simula o recebimento imediato da mensagem para o teste
            // Em um cenário real, isso viria de outro processo
        }),
        disconnect: vi.fn().mockResolvedValue(undefined),
        isOpen: false
    })
}));

describe('RedisBroadcastService IntegraÃ§ão', () => {
    let service: RedisBroadcastService;
    let mockClient: any;
    const canal = 'teste-canal';

    beforeEach(() => {
        service = new RedisBroadcastService();
        mockClient = (service as any).client;
    });

    it('deve publicar uma mensagem no Redis com sucesso', async () => {
        const mensagemEnviada = JSON.stringify({ teste: 'ok' });
        
        mockClient.isOpen = false;
        await service.publish(canal, mensagemEnviada);

        expect(mockClient.publish).toHaveBeenCalledWith(canal, mensagemEnviada);
    });
});

