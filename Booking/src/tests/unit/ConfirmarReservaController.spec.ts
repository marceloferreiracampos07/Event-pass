import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { ConfirmarReservaController } from '@/infrastructure/http/controllers/ConfirmarReservaController';

describe('ConfirmarReservaController', () => {
    let mockConfirmarReserva: any;
    let controller: ConfirmarReservaController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockConfirmarReserva = { executar: vi.fn() };
        controller = new ConfirmarReservaController(mockConfirmarReserva);
        
        mockReq = { booking: { id: 1 } };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        mockNext = vi.fn();
        vi.clearAllMocks();
    });

    it('deve confirmar uma reserva com sucesso', async () => {
        mockConfirmarReserva.executar.mockResolvedValue({ status: 'CONFIRMED' });

        await controller.handle(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('deve chamar next com erro em caso de falha', async () => {
        const error = new Error('Erro fatal');
        mockConfirmarReserva.executar.mockRejectedValue(error);

        await controller.handle(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).toHaveBeenCalledWith(error);
    });
});
