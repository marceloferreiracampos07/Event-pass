import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validarConfiguracao, configRedis } from './config-redis';

describe('Configuração do Redis', () => {
    const envOriginal = process.env;

    beforeEach(() => {
        vi.resetModules();
        process.env = { ...envOriginal };
    });

    afterEach(() => {
        process.env = envOriginal;
    });

    it('deve lançar erro se variáveis obrigatórias estiverem ausentes', () => {
        delete process.env.REDIS_HOST;
        expect(() => validarConfiguracao()).toThrow('ERRO DE CONFIGURAÇÃO CRÍTICO');
    });

    it('deve lançar erro se REDIS_PORT não for um número', () => {
        process.env.REDIS_HOST = 'localhost';
        process.env.REDIS_PORT = 'ABC';
        process.env.REDIS_PASSWORD = '';
        process.env.REDIS_URL = 'redis://localhost:6379';
        process.env.REDIS_CANAL_BOOKINGS = 'bookings';
        
        // Forçamos a atualização do objeto configRedis para o teste
        configRedis.porta = 'ABC' as any;
        
        expect(() => validarConfiguracao()).toThrow('deve ser um número');
    });

    it('deve validar com sucesso se tudo estiver correto', () => {
        process.env.REDIS_HOST = 'localhost';
        process.env.REDIS_PORT = '6379';
        process.env.REDIS_PASSWORD = '';
        process.env.REDIS_URL = 'redis://localhost:6379';
        process.env.REDIS_CANAL_BOOKINGS = 'bookings';
        
        configRedis.porta = '6379'; // Reset para valor válido

        expect(() => validarConfiguracao()).not.toThrow();
    });
});
