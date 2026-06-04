import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function RequerAdmin(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido ou formato inválido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não está configurado');
        }
        
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role === 'ADMIN') {
            next();
        } else {
            res.status(403).json({ error: 'Acesso negado: Requer privilégios de Admin' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}
