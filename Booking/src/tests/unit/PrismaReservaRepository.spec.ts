import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaReservaRepository } from '@/infrastructure/Database/PrismaReservaRepository';
import { PrismaClient } from '@/generated/prisma';
import { Reserva } from '@/Domain/entities/Reserva';

describe('PrismaReservaRepository', () => {
    let mockPrisma: any;
    let repository: PrismaReservaRepository;

    beforeEach(() => {
        mockPrisma = {
            booking: {
                create: vi.fn(),
                findUnique: vi.fn(),
                update: vi.fn(),
                findMany: vi.fn(),
            }
        };
        repository = new PrismaReservaRepository(mockPrisma as unknown as PrismaClient);
    });

    it('deve buscar por ID e retornar Reserva', async () => {
        const bookingDb = {
            id: 1,
            eventId: 1,
            userId: 1,
            quantidadeIngressos: 1,
            tipoIngresso: 'VIP',
            setor: 'A',
            status: 'PENDING',
            createdAt: new Date(),
        };
        mockPrisma.booking.findUnique.mockResolvedValue(bookingDb);

        const reserva = await repository.buscarPorId(1);

        expect(reserva).toBeInstanceOf(Reserva);
        expect(reserva?.id).toBe(1);
    });

    it('deve retornar null se buscar por ID inexistente', async () => {
        mockPrisma.booking.findUnique.mockResolvedValue(null);

        const reserva = await repository.buscarPorId(99);

        expect(reserva).toBeNull();
    });

    it('deve atualizar status', async () => {
        await repository.atualizarStatus(1, 'CONFIRMED');
        expect(mockPrisma.booking.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { status: 'CONFIRMED' }
        });
    });

    it('deve buscar por usuario ID', async () => {
        const bookingsDb = [{
            id: 1,
            eventId: 1,
            userId: 1,
            quantidadeIngressos: 1,
            tipoIngresso: 'VIP',
            setor: 'A',
            status: 'PENDING',
            createdAt: new Date(),
        }];
        mockPrisma.booking.findMany.mockResolvedValue(bookingsDb);

        const reservas = await repository.buscarPorUsuarioId(1);

        expect(reservas).toHaveLength(1);
        expect(reservas[0]).toBeInstanceOf(Reserva);
    });
});

