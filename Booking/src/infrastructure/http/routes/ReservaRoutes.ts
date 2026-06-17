import { Router } from "express";
import { CriarReservaController } from "../controllers/CriarReservaController";
import { ConfirmarReservaController } from "../controllers/ConfirmarReservaController";
import { RejeitarReservaController } from "../controllers/RejeitarReservaController";
import { authMiddleware } from "../Middleware/AuthMiddleware";
import { loadBookingMiddleware } from "../Middleware/BookingMiddleware";
import { checkBookingOwnership } from "../Middleware/checkBookingOwnership";
import { validate } from "../Middleware/ValidationMiddleware";
import { CriarReservaSchema } from "../schemas/ReservaSchemas";

export function criarRotasReserva(
    criarController: CriarReservaController,
    confirmarController: ConfirmarReservaController,
    rejeitarController: RejeitarReservaController
): Router {
    const router = Router();

    router.post("/", authMiddleware, validate(CriarReservaSchema), (req, res, next) => criarController.handle(req, res, next));
    
    router.post("/:id/confirm", authMiddleware, loadBookingMiddleware, checkBookingOwnership, (req, res, next) => confirmarController.handle(req, res, next));
    router.post("/:id/reject", authMiddleware, loadBookingMiddleware, checkBookingOwnership, (req, res, next) => rejeitarController.handle(req, res, next));

    return router;
}
