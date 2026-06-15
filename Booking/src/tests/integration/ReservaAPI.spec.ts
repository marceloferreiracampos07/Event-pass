import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();
const segredo = process.env.JWT_SECRET || 'test-secret';

describe('Integração API de Reserva', () => {
  let token: string;

  beforeAll(async () => {
    token = jwt.sign({ id: 1, role: 'CUSTOMER' }, segredo);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve criar uma reserva via POST /api/v1/bookings', async () => {
    const resposta = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        eventoId: 100,
        quantidadeIngressos: 2,
        tipoIngresso: 'Regular',
        setor: 'Geral'
      });

    if (resposta.status !== 201) {
        // Log is not needed in clean tests.
    }
    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id');
    expect(resposta.body.status).toBe('PENDING');
  });

  it('deve retornar 401 se nenhum token for fornecido', async () => {
    const resposta = await request(app)
      .post('/api/v1/bookings')
      .send({
        eventoId: 100,
        quantidadeIngressos: 2,
        tipoIngresso: 'Regular',
        setor: 'Geral'
      });

    expect(resposta.status).toBe(401);
  });
});
