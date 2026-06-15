import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { RedisBroadcastService } from '@/infrastructure/Broadcast/PrismaBookingService';
import { createClient } from 'redis';

describe('RedisBroadcastService Integração', () => {
    let service: RedisBroadcastService;
    let subscriber: ReturnType<typeof createClient>;
    const canal = 'teste-canal';

    beforeAll(async () => {
        service = new RedisBroadcastService();
        
        // Cliente para escutar a mensagem
        subscriber = createClient({
            url: process.env.REDIS_URL
        });
        await subscriber.connect();
    });

    afterAll(async () => {
        await subscriber.disconnect();
    });

    it('deve publicar uma mensagem no Redis com sucesso', async () => {
        const mensagemEnviada = JSON.stringify({ teste: 'ok' });
        
        // Promessa que resolve quando a mensagem for recebida
        const recebido = new Promise((resolve) => {
            subscriber.subscribe(canal, (mensagem) => {
                resolve(mensagem);
            });
        });

        await service.publish(canal, mensagemEnviada);
        
        const resultado = await recebido;
        expect(resultado).toBe(mensagemEnviada);
    });
});
