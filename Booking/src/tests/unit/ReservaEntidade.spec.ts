import { describe, it, expect } from 'vitest';
import { Reserva } from '../../Domain/entities/Reserva';

describe('Entidade Reserva', () => {
  it('deve criar uma reserva válida', () => {
    const reserva = new Reserva(1, 1, 2, 'VIP', 'Setor A');
    expect(reserva.status).toBe('PENDING');
    expect(reserva.eventoId).toBe(1);
  });

  it('deve lançar erro para eventoId inválido', () => {
    expect(() => new Reserva(0, 1, 2, 'VIP', 'Setor A')).toThrow('O ID do evento é obrigatório');
  });

  it('deve lançar erro para quantidade inválida', () => {
    expect(() => new Reserva(1, 1, 0, 'VIP', 'Setor A')).toThrow('A quantidade de ingressos deve ser maior que zero');
  });

  it('deve confirmar uma reserva pendente', () => {
    const reserva = new Reserva(1, 1, 2, 'VIP', 'Setor A');
    reserva.confirmar();
    expect(reserva.status).toBe('CONFIRMED');
  });
});

