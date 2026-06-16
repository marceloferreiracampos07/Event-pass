import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { ReservaController } from '@/infrastructure/http/controllers/ReservaController';
import { DomainError } from '@/Domain/errors/DomainError';

describe('ReservaController', () => {
    let mockCriarReserva: any;
    let mockConfirmarReserva: any;
    let mockRejeitarReserva: any;
    let controller: ReservaController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        mockCriarReserva = { executar: vi.fn() };
        mockConfirmarReserva = { executar: vi.fn() };
        mockRejeitarReserva = { executar: vi.fn() };
        controller = new ReservaController(mockCriarReserva, mockConfirmarReserva, mockRejeitarReserva);
        
        mockReq = { body: {}, user: { id: 1 } };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        vi.clearAllMocks();
    });

    describe('Criar', () => {
        it('deve criar uma reserva com sucesso', async () => {
            mockReq.body = { eventoId: 1, quantidadeIngressos: 1, tipoIngresso: 'VIP', setor: 'A' };
            mockCriarReserva.executar.mockResolvedValue({ id: 1, status: 'PENDING' });

            await controller.Criar(mockReq as Request, mockRes as Response);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({ id: 1, status: 'PENDING' });
        });

        it('deve retornar 401 se usuÃ¡rio não autenticado', async () => {
            mockReq.user = undefined;
            await controller.Criar(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(401);
        });

        it('deve retornar 400 em caso de erro de domÃ­nio na criaÃ§Ã£o', async () => {
            const domainError = new DomainError('Erro de domÃ­nio');
            (domainError as any).statusCode = 400;
            (domainError as any).errorCode = 'ERR_DOMAIN';
            mockCriarReserva.executar.mockRejectedValue(domainError);

            await controller.Criar(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(400);
        });

        it('deve retornar 400 em caso de erro genÃ©rico na criaÃ§Ã£o', async () => {
            mockCriarReserva.executar.mockRejectedValue(new Error('Erro inesperado'));

            await controller.Criar(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(400);
        });
    });

    describe('Confirmar', () => {
        it('deve confirmar uma reserva com sucesso', async () => {
            (mockReq as any).booking = { id: 1, status: 'PENDING' };
            mockConfirmarReserva.executar.mockResolvedValue({ status: 'CONFIRMED' });

            await controller.Confirmar(mockReq as Request, mockRes as Response);

            expect(mockRes.status).toHaveBeenCalledWith(200);
        });

        it('deve retornar 400 se reserva não estiver pendente', async () => {
            (mockReq as any).booking = { id: 1, status: 'CONFIRMED' };
            await controller.Confirmar(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(400);
        });

        it('deve retornar erro de domÃ­nio na confirmaÃ§Ã£o', async () => {
            (mockReq as any).booking = { id: 1, status: 'PENDING' };
            const domainError = new DomainError('Erro de confirmaÃ§Ã£o');
            (domainError as any).statusCode = 422;
            mockConfirmarReserva.executar.mockRejectedValue(domainError);

            await controller.Confirmar(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(422);
        });

        it('deve retornar 500 em erro genÃ©rico na confirmaÃ§Ã£o', async () => {
            (mockReq as any).booking = { id: 1, status: 'PENDING' };
            mockConfirmarReserva.executar.mockRejectedValue(new Error('Erro fatal'));

            await controller.Confirmar(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        });
    });

    describe('Rejeitar', () => {
        it('deve rejeitar uma reserva com sucesso', async () => {
            (mockReq as any).booking = { id: 1, status: 'PENDING' };
            mockRejeitarReserva.executar.mockResolvedValue({ status: 'REJECTED' });

            await controller.Rejeitar(mockReq as Request, mockRes as Response);

            expect(mockRes.status).toHaveBeenCalledWith(200);
        });

        it('deve retornar 400 se reserva não estiver pendente', async () => {
            (mockReq as any).booking = { id: 1, status: 'REJECTED' };
            await controller.Rejeitar(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(400);
        });

        it('deve retornar erro de domÃ­nio na rejeiÃ§Ã£o', async () => {
            (mockReq as any).booking = { id: 1, status: 'PENDING' };
            const domainError = new DomainError('Erro de rejeiÃ§Ã£o');
            (domainError as any).statusCode = 422;
            mockRejeitarReserva.executar.mockRejectedValue(domainError);

            await controller.Rejeitar(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(422);
        });

        it('deve retornar 500 em erro genÃ©rico na rejeiÃ§Ã£o', async () => {
            (mockReq as any).booking = { id: 1, status: 'PENDING' };
            mockRejeitarReserva.executar.mockRejectedValue(new Error('Erro fatal'));

            await controller.Rejeitar(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        });
    });
});

