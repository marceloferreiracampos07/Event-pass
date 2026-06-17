import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../../../generated/prisma"; const prisma = new PrismaClient();

export const loadBookingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = (req as any).user;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID da reserva inválido" });
    }

    try {
        const booking = await prisma.booking.findUnique({
            where: { id: Number(id) },
            select: { id: true, userId: true, status: true }
        });

        if (!booking) {
            return res.status(404).json({ error: "Reserva não encontrada" });
        }

        if (user && booking.userId !== user.id) {
            return res.status(403).json({ error: "Acesso negado. Você não é o dono desta reserva." });
        }

        (req as any).booking = booking;
        next();
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar reserva" });
    }
};
