import { describe, it, expect } from 'vitest';
import { app } from '@/app';

describe('App Initialization', () => {
    it('deve exportar uma instÃ¢ncia vÃ¡lida do Express', () => {
        expect(app).toBeDefined();
        expect(typeof app).toBe('function');
    });

    it('deve ter as rotas de reserva configuradas', () => {
        // Verifica se o router de reservas foi montado na aplicaÃ§Ã£o
        const rotas = app._router.stack;
        const rotaReservas = rotas.find((r: any) => r.regexp.toString().includes('bookings'));
        expect(rotaReservas).toBeDefined();
    });
});

