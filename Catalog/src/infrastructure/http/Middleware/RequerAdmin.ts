import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function RequerAdmin(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token nÃ£o fornecido ou formato invÃ¡lido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET nÃ£o estÃ¡ configurado');
        }
        
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role === 'ADMIN') {
            next();
        } else {
            res.status(403).json({ error: 'Acesso negado: Requer privilÃ©gios de Admin' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Token invÃ¡lido ou expirado' });
    }
}
