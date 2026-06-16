import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '@/infrastructure/http/Middleware/AuthMiddleware';
import jwt from 'jsonwebtoken';
import { configuracao } from '@/infrastructure/config/configuracao';

describe('AuthMiddleware', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let next: NextFunction;
    const segredoOriginal = configuracao.jwtSegredo;

    beforeEach(() => {
        mockReq = { headers: {} };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        next = vi.fn();
        configuracao.jwtSegredo = 'secret';
    });

    afterEach(() => {
        configuracao.jwtSegredo = segredoOriginal;
    });

    it('deve retornar 401 se não houver header de autorizaÃ§Ã£o', () => {
        authMiddleware(mockReq as Request, mockRes as Response, next);
        expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('deve retornar 401 se o token estiver mal formatado', () => {
        mockReq.headers = { authorization: 'Basic token' };
        authMiddleware(mockReq as Request, mockRes as Response, next);
        expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('deve retornar 500 se não houver JWT_SECRET', () => {
        configuracao.jwtSegredo = undefined;
        mockReq.headers = { authorization: 'Bearer token' };
        authMiddleware(mockReq as Request, mockRes as Response, next);
        expect(mockRes.status).toHaveBeenCalledWith(500);
    });

    it('deve retornar 403 se a role não for CUSTOMER', () => {
        mockReq.headers = { authorization: 'Bearer token' };
        vi.spyOn(jwt, 'verify').mockReturnValue({ role: 'ADMIN' } as any);
        authMiddleware(mockReq as Request, mockRes as Response, next);
        expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('deve chamar o next se autenticado', () => {
        mockReq.headers = { authorization: 'Bearer token' };
        vi.spyOn(jwt, 'verify').mockReturnValue({ role: 'CUSTOMER' } as any);
        authMiddleware(mockReq as Request, mockRes as Response, next);
        expect(next).toHaveBeenCalled();
        expect((mockReq as any).user).toBeDefined();
    });
});

