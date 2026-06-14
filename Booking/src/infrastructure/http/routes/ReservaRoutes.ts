import { Router } from "express";
import { ReservaController } from "../controllers/ReservaController";
import { authMiddleware } from "../Middleware/AuthMiddleware";
import { loadBookingMiddleware } from "../Middleware/BookingMiddleware";
import { validate } from "../Middleware/ValidationMiddleware";
import { CriarReservaSchema } from "../schemas/ReservaSchemas";

export function criarRotasReserva(reservaController: ReservaController): Router {
    const router = Router();

    router.post("/", authMiddleware, validate(CriarReservaSchema), (req, res) => reservaController.Criar(req, res));
    
    router.post("/:id/confirm", loadBookingMiddleware, (req, res) => reservaController.Confirmar(req, res));
    router.post("/:id/reject", loadBookingMiddleware, (req, res) => reservaController.Rejeitar(req, res));

    return router;
}
