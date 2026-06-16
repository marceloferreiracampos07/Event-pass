import { describe, it, expect, beforeAll, vi } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import jwt from 'jsonwebtoken';
import { configuracao } from '@/infrastructure/config/configuracao';

// Mock do Prisma Client
vi.mock('@/generated/prisma/index', () => {
    return {
        PrismaClient: class {
            booking = {
                create: vi.fn().mockResolvedValue({
                    id: 1,
                    eventId: 100,
                    userId: 1,
                    status: 'PENDING',
                    createdAt: new Date(),
                    quantidadeIngressos: 2,
                    tipoIngresso: 'Regular',
                    setor: 'Geral'
                }),
                deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
                findUnique: vi.fn().mockResolvedValue(null),
                findMany: vi.fn().mockResolvedValue([])
            };
            $connect = vi.fn().mockResolvedValue(undefined);
            $disconnect = vi.fn().mockResolvedValue(undefined);
        }
    };
});

// Mock dos Serviços Externos
vi.mock('@/infrastructure/Broadcast/PrismaBookingService', () => ({
    RedisBroadcastService: class {
        publish = vi.fn().mockResolvedValue(undefined);
    }
}));

vi.mock('@/infrastructure/Services/ExternalEventService', () => ({
    ExternalEventService: class {
        verificarDisponibilidade = vi.fn().mockResolvedValue(true);
    }
}));

describe('Integração API de Reserva', () => {
  let token: string;
  const segredo = configuracao.jwtSegredo || 'test-secret';

  beforeAll(async () => {
    token = jwt.sign({ id: 1, role: 'CUSTOMER' }, segredo);
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
        console.error('DEBUG - Criar Path - Body:', JSON.stringify(resposta.body));
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
