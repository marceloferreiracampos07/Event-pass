import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { validate } from '@/infrastructure/http/Middleware/ValidationMiddleware';
import { z } from 'zod';

describe('ValidationMiddleware', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        mockReq = { body: {}, query: {}, params: {} };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        next = vi.fn();
    });

    it('deve chamar o next se a validaÃ§ão passar', () => {
        const schema = z.object({ body: z.object({ name: z.string() }) });
        mockReq.body = { name: 'test' };
        validate(schema)(mockReq as Request, mockRes as Response, next);
        expect(next).toHaveBeenCalled();
    });

    it('deve retornar 400 se a validaÃ§ão falhar', () => {
        const schema = z.object({ body: z.object({ name: z.string() }) });
        mockReq.body = { name: 123 };
        validate(schema)(mockReq as Request, mockRes as Response, next);
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });
});

