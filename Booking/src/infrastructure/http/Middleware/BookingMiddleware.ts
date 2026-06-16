import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../../../generated/prisma"; const prisma = new PrismaClient();

export const loadBookingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID da reserva invÃ¡lido" });
    }

    try {
        const booking = await prisma.booking.findUnique({
            where: { id: Number(id) }
        });

        if (!booking) {
            return res.status(404).json({ error: "Reserva não encontrada" });
        }

        (req as any).booking = booking;
        next();
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar reserva" });
    }
};


