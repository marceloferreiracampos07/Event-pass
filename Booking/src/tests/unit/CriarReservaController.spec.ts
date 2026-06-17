import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { CriarReservaController } from '@/infrastructure/http/controllers/CriarReservaController';

describe('CriarReservaController', () => {
    let mockCriarReserva: any;
    let controller: CriarReservaController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockCriarReserva = { executar: vi.fn() };
        controller = new CriarReservaController(mockCriarReserva);
        
        mockReq = { body: {}, user: { id: 1 } };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        mockNext = vi.fn();
        vi.clearAllMocks();
    });

    it('deve criar uma reserva com sucesso', async () => {
        mockReq.body = { eventoId: 1, quantidadeIngressos: 1, tipoIngresso: 'VIP', setor: 'A' };
        mockCriarReserva.executar.mockResolvedValue({ id: 1, status: 'PENDING' });

        await controller.handle(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({ id: 1, status: 'PENDING' });
    });

    it('deve chamar next com erro em caso de falha', async () => {
        const error = new Error('Erro inesperado');
        mockCriarReserva.executar.mockRejectedValue(error);

        await controller.handle(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).toHaveBeenCalledWith(error);
    });
});
