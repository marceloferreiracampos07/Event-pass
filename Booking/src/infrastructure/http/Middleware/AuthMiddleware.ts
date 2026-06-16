import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { configuracao } from "../../config/configuracao";

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
            console.error("JWT_SECRET não configurado");
            return res.status(500).json({ error: "Erro interno de configuraÃ§Ã£o" });
        }

        const decoded = jwt.verify(token, secret) as any;

        const role = decoded.role?.toUpperCase();
        if (role !== "CUSTOMER") {
            return res.status(403).json({ error: "Acesso negado. Requer autenticaÃ§Ã£o de Cliente." });
        }

        (req as any).user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token invÃ¡lido" });
    }
};

