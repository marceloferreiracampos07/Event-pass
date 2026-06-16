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
                deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
                create: vi.fn().mockResolvedValue({
                    id: 1,
                    eventId: 1,
                    userId: 1,
                    quantidadeIngressos: 1,
                    tipoIngresso: 'Regular',
                    setor: 'Geral',
                    status: 'PENDING',
                    createdAt: new Date()
                }),
                findUnique: vi.fn().mockImplementation(({ where }) => {
                    if (where.id === 9999) return Promise.resolve(null);
                    return Promise.resolve({
                        id: where.id,
                        eventId: 1,
                        userId: 1,
                        quantidadeIngressos: 1,
                        tipoIngresso: 'Regular',
                        setor: 'Geral',
                        status: where.id === 2 ? 'CANCELLED' : 'PENDING',
                        createdAt: new Date()
                    });
                }),
                update: vi.fn().mockResolvedValue({ status: 'CONFIRMED' })
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

describe('Integração E2E: Confirmar Reserva', () => {
  let token: string;
  const segredo = configuracao.jwtSegredo || 'test-secret';

  beforeAll(async () => {
    token = jwt.sign({ id: 1, role: 'CUSTOMER' }, segredo);
  });

  it('deve confirmar uma reserva PENDING com sucesso (Happy Path)', async () => {
    // Aumentar quantidadeIngressos para passar na validação de Reserva (deve ser > 0)
    const resposta = await request(app)
      .post(`/api/v1/bookings/1/confirm`)
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe('CONFIRMED');
  });

  it('deve retornar 404 ao confirmar uma reserva inexistente', async () => {
    const resposta = await request(app)
      .post(`/api/v1/bookings/9999/confirm`)
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(404);
  });

  it('deve retornar 400 ao tentar confirmar uma reserva CANCELLED', async () => {
    const resposta = await request(app)
      .post(`/api/v1/bookings/2/confirm`)
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBeDefined();
  });
});
