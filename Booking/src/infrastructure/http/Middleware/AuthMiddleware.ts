import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { configuracao } from "../../config/configuracao";
import { logger } from "../../utils/logger";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    try {
        const secret = configuracao.jwtSegredo;
        
        if (!secret) {
            logger.error("JWT_SECRET não configurado");
            return res.status(500).json({ error: "Erro interno de configuração" });
        }

        const decoded = jwt.verify(token, secret) as any;

        if (!decoded.id) {
            return res.status(401).json({ error: "Token inválido: ID do usuário ausente" });
        }

        const role = decoded.role?.toUpperCase();
        if (role !== "CUSTOMER") {
            return res.status(403).json({ error: "Acesso negado. Requer autenticação de Cliente." });
        }

        (req as any).user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
};
