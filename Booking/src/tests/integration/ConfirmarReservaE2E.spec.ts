import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/generated/prisma/index';

const prisma = new PrismaClient();
const segredo = process.env.JWT_SECRET || 'test-secret';

describe('Integração E2E: Confirmar Reserva', () => {
  let token: string;

  beforeAll(async () => {
    token = jwt.sign({ id: 1, role: 'CUSTOMER' }, segredo);
  });

  beforeEach(async () => {
    await prisma.booking.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve confirmar uma reserva PENDING com sucesso (Happy Path)', async () => {
    const booking = await prisma.booking.create({
      data: {
        eventId: 1,
        userId: 1,
        quantidadeIngressos: 1,
        tipoIngresso: 'Regular',
        setor: 'Geral',
        status: 'PENDING'
      }
    });

    const resposta = await request(app)
      .post(`/api/v1/bookings/${booking.id}/confirm`)
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe('CONFIRMED');

    const bookingNoBanco = await prisma.booking.findUnique({ where: { id: booking.id } });
    expect(bookingNoBanco?.status).toBe('CONFIRMED');
  });

  it('deve retornar 404 ao confirmar uma reserva inexistente', async () => {
    const resposta = await request(app)
      .post(`/api/v1/bookings/9999/confirm`)
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(404);
  });

  it('deve retornar 400 ao tentar confirmar uma reserva CANCELLED', async () => {
    const booking = await prisma.booking.create({
      data: {
        eventId: 1,
        userId: 1,
        quantidadeIngressos: 1,
        tipoIngresso: 'Regular',
        setor: 'Geral',
        status: 'CANCELLED'
      }
    });

    const resposta = await request(app)
      .post(`/api/v1/bookings/${booking.id}/confirm`)
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toContain('não está mais pendente');
  });
});
