import { describe, it, expect } from 'vitest'; // Se usar Jest, pode apagar essa linha
import { Reserva, StatusReserva } from '@/Domain/entities/Reserva';

describe('Reserva Domain Entity', () => {
  const dadosValidos = {
    eventoId: 1,
    usuarioId: 2,
    quantidadeIngressos: 3,
    tipoIngresso: 'Pista',
    setor: 'Bloco A'
  };

  describe('Instanciação e Validações', () => {
    it('deve criar uma instância de Reserva com sucesso usando dados válidos', () => {
      const reserva = new Reserva(
        dadosValidos.eventoId,
        dadosValidos.usuarioId,
        dadosValidos.quantidadeIngressos,
        dadosValidos.tipoIngresso,
        dadosValidos.setor
      );

      expect(reserva).toBeInstanceOf(Reserva);
      expect(reserva.status).toBe('PENDING');
      expect(reserva.criadoEm).toBeInstanceOf(Date);
      expect(reserva.id).toBeUndefined();
    });

    it('deve lançar erro se o eventoId for inválido ou menor/igual a zero', () => {
      expect(() => new Reserva(0, 2, 3, 'Pista', 'Bloco A')).toThrow("O ID do evento é obrigatório e deve ser positivo");
      // @ts-expect-error - Testando caso nulo/indefinido em JS/TS misto
      expect(() => new Reserva(null, 2, 3, 'Pista', 'Bloco A')).toThrow("O ID do evento é obrigatório e deve ser positivo");
    });

    it('deve lançar erro se o usuarioId for inválido ou menor/igual a zero', () => {
      expect(() => new Reserva(1, 0, 3, 'Pista', 'Bloco A')).toThrow("O ID do usuário é obrigatório e deve ser positivo");
      // @ts-expect-error
      expect(() => new Reserva(1, undefined, 3, 'Pista', 'Bloco A')).toThrow("O ID do usuário é obrigatório e deve ser positivo");
    });

    it('deve lançar erro se a quantidadeIngressos for menor ou igual a zero', () => {
      expect(() => new Reserva(1, 2, 0, 'Pista', 'Bloco A')).toThrow("A quantidade de ingressos deve ser maior que zero");
      expect(() => new Reserva(1, 2, -1, 'Pista', 'Bloco A')).toThrow("A quantidade de ingressos deve ser maior que zero");
    });

    it('deve lançar erro se o tipoIngresso for vazio ou apenas espaços', () => {
      expect(() => new Reserva(1, 2, 3, '', 'Bloco A')).toThrow("O tipo de ingresso é obrigatório");
      expect(() => new Reserva(1, 2, 3, '   ', 'Bloco A')).toThrow("O tipo de ingresso é obrigatório");
    });

    it('deve lançar erro se o setor for vazio ou apenas espaços', () => {
      expect(() => new Reserva(1, 2, 3, 'Pista', '')).toThrow("O setor é obrigatório");
      expect(() => new Reserva(1, 2, 3, 'Pista', '   ')).toThrow("O setor é obrigatório");
    });

    it('deve lançar erro se tentar criar uma nova reserva (sem ID) com status diferente de PENDING', () => {
      expect(() => new Reserva(1, 2, 3, 'Pista', 'Bloco A', 'CONFIRMED')).toThrow("Uma nova reserva deve iniciar com status PENDING");
    });

    it('deve permitir criar uma reserva com status diferente de PENDING se ela já possuir um ID (vinda do banco)', () => {
      const reservaDoBanco = new Reserva(1, 2, 3, 'Pista', 'Bloco A', 'CONFIRMED', 99);
      expect(reservaDoBanco.status).toBe('CONFIRMED');
      expect(reservaDoBanco.id).toBe(99);
    });

    it('deve lançar erro se a data de criação fornecida estiver muito no futuro', () => {
      const dataNoFuturo = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos no futuro (limite é 5)
      expect(() => new Reserva(1, 2, 3, 'Pista', 'Bloco A', 'PENDING', undefined, dataNoFuturo))
        .toThrow("A data de criação não pode estar no futuro");
    });
  });

  describe('Transições de Status (Regras de Negócio)', () => {
    it('deve confirmar uma reserva PENDING com sucesso', () => {
      const reserva = new Reserva(1, 2, 3, 'Pista', 'Bloco A');
      reserva.confirmar();
      expect(reserva.status).toBe('CONFIRMED');
    });

    it('deve lançar erro ao tentar confirmar uma reserva que não esteja PENDING', () => {
      const reserva = new Reserva(1, 2, 3, 'Pista', 'Bloco A');
      reserva.confirmar(); // Virou CONFIRMED

      expect(() => reserva.confirmar()).toThrow("Não é possível confirmar uma reserva CONFIRMED");
    });

    it('deve cancelar uma reserva PENDING ou CONFIRMED com sucesso', () => {
      const reserva1 = new Reserva(1, 2, 3, 'Pista', 'Bloco A');
      reserva1.cancelar();
      expect(reserva1.status).toBe('CANCELLED');

      const reserva2 = new Reserva(1, 2, 3, 'Pista', 'Bloco A', 'CONFIRMED', 123);
      reserva2.cancelar();
      expect(reserva2.status).toBe('CANCELLED');
    });

    it('deve lançar erro ao tentar cancelar uma reserva que já está CANCELLED', () => {
      const reserva = new Reserva(1, 2, 3, 'Pista', 'Bloco A');
      reserva.cancelar();

      expect(() => reserva.cancelar()).toThrow("Esta reserva já foi cancelada");
    });

    it('deve rejeitar uma reserva PENDING com sucesso', () => {
      const reserva = new Reserva(1, 2, 3, 'Pista', 'Bloco A');
      reserva.rejeitar();
      expect(reserva.status).toBe('REJECTED');
    });

    it('deve lançar erro ao tentar rejeitar uma reserva que não está PENDING', () => {
      const reserva = new Reserva(1, 2, 3, 'Pista', 'Bloco A');
      reserva.confirmar(); // Virou CONFIRMED

      expect(() => reserva.rejeitar()).toThrow("Apenas reservas pendentes podem ser rejeitadas");
    });
  });
});