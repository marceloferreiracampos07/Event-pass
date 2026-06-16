import { describe, it, expect, vi } from 'vitest';
import { AssinanteRedis } from '../../infrastructure/Queue/AssinanteRedis';
import { DespachanteEventos } from '../../infrastructure/Queue/DespachanteEventos';

// Mock do ioredis
vi.mock('ioredis', () => {
    return {
        Redis: vi.fn().mockImplementation(() => ({
            subscribe: vi.fn().mockResolvedValue(undefined),
            on: vi.fn()
        }))
    };
});

describe('AssinanteRedis', () => {
    it('deve iniciar a assinatura no canal correto', async () => {
        const mockDespachante = { despachar: vi.fn() } as any;
        const assinante = new AssinanteRedis(mockDespachante);
        
        const spy = vi.spyOn(console, 'log');
        await assinante.iniciar();
        
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('Assinado no canal'));
    });
});
