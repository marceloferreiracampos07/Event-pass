import { describe, it, expect } from 'vitest';
import { Notificacao } from '../../Domain/entities/Notificacao';

describe('Entidade Notificacao', () => {
    it('deve criar uma instância de notificação com as propriedades corretas', () => {
        const props = {
            usuarioId: 1,
            mensagem: 'Teste',
            tipo: 'CONFIRMACAO' as const
        };
        const notificacao = new Notificacao(props);

        expect(notificacao.usuarioId).toBe(1);
        expect(notificacao.mensagem).toBe('Teste');
        expect(notificacao.tipo).toBe('CONFIRMACAO');
        expect(notificacao.criadoEm).toBeInstanceOf(Date);
    });

    it('deve usar a data de criação fornecida', () => {
        const data = new Date('2026-01-01');
        const notificacao = new Notificacao({
            usuarioId: 1,
            mensagem: 'Teste',
            tipo: 'CONFIRMACAO',
            criadoEm: data
        });

        expect(notificacao.criadoEm).toBe(data);
    });
});
