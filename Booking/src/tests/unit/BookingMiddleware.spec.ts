import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';

// Define the mock outside to be accessible
const mockFindUnique = vi.fn();

describe('BookingMiddleware', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let next: NextFunction;
    let loadBookingMiddleware: any;

    beforeEach(async () => {
        vi.resetModules(); // Clear the module cache
        
        // Mock the PrismaClient
        vi.doMock('@/generated/prisma/index', () => {
            return {
                PrismaClient: class {
                    booking = {
                        findUnique: mockFindUnique
                    };
                }
            };
        });

        // Dynamic import after mock is registered
        const middleware = await import('@/infrastructure/http/Middleware/BookingMiddleware');
        loadBookingMiddleware = middleware.loadBookingMiddleware;
        
        mockReq = { params: {} };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        next = vi.fn();
        vi.clearAllMocks();
    });

    it('deve retornar 400 se o id não for fornecido ou inválido', async () => {
        await loadBookingMiddleware(mockReq as Request, mockRes as Response, next);
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('deve retornar 404 se a reserva não for encontrada', async () => {
        mockReq.params = { id: '1' };
        mockFindUnique.mockResolvedValue(null);
        await loadBookingMiddleware(mockReq as Request, mockRes as Response, next);
        expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it('deve definir req.booking e chamar next se encontrada', async () => {
        mockReq.params = { id: '1' };
        const booking = { id: 1, status: 'PENDING' };
        mockFindUnique.mockResolvedValue(booking);
        await loadBookingMiddleware(mockReq as Request, mockRes as Response, next);
        expect(next).toHaveBeenCalled();
        expect((mockReq as any).booking).toEqual(booking);
    });
});
