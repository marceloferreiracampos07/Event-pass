import { Request, Response, NextFunction } from "express";

export const checkBookingOwnership = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const booking = (req as any).booking;

    if (!user || !booking) {
        return res.status(500).json({ error: "Erro interno de autenticação ou carregamento de reserva" });
    }

    if (user.id !== booking.userId) {
        return res.status(403).json({ error: "Acesso negado. Voce nao é o dono desta reserva." });
    }

    next();
};
