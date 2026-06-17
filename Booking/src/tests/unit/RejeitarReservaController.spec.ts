import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { RejeitarReservaController } from '@/infrastructure/http/controllers/RejeitarReservaController';

describe('RejeitarReservaController', () => {
    let mockRejeitarReserva: any;
    let controller: RejeitarReservaController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockRejeitarReserva = { executar: vi.fn() };
        controller = new RejeitarReservaController(mockRejeitarReserva);
        
        mockReq = { booking: { id: 1 } };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        mockNext = vi.fn();
        vi.clearAllMocks();
    });

    it('deve rejeitar uma reserva com sucesso', async () => {
        mockRejeitarReserva.executar.mockResolvedValue({ status: 'REJECTED' });

        await controller.handle(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('deve chamar next com erro em caso de falha', async () => {
        const error = new Error('Erro fatal');
        mockRejeitarReserva.executar.mockRejectedValue(error);

        await controller.handle(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).toHaveBeenCalledWith(error);
    });
});
