import { describe, it, expect } from 'vitest';
import { Reserva } from '../../Domain/entities/Reserva';

describe('Entidade Reserva', () => {
  it('deve criar uma reserva vÃ¡lida', () => {
    const reserva = new Reserva(1, 1, 2, 'VIP', 'Setor A');
    expect(reserva.status).toBe('PENDING');
    expect(reserva.eventoId).toBe(1);
  });

  it('deve lanÃ§ar erro para eventoId invÃ¡lido', () => {
    expect(() => new Reserva(0, 1, 2, 'VIP', 'Setor A')).toThrow('O ID do evento Ã© obrigatÃ³rio');
  });

  it('deve lanÃ§ar erro para quantidade invÃ¡lida', () => {
    expect(() => new Reserva(1, 1, 0, 'VIP', 'Setor A')).toThrow('A quantidade de ingressos deve ser maior que zero');
  });

  it('deve confirmar uma reserva pendente', () => {
    const reserva = new Reserva(1, 1, 2, 'VIP', 'Setor A');
    reserva.confirmar();
    expect(reserva.status).toBe('CONFIRMED');
  });
});

