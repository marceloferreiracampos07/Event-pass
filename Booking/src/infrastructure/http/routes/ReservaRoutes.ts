import { Router } from "express";
import { CriarReservaController } from "../controllers/CriarReservaController";
import { ConfirmarReservaController } from "../controllers/ConfirmarReservaController";
import { RejeitarReservaController } from "../controllers/RejeitarReservaController";
import { CountConfirmedController } from "../controllers/CountConfirmedController";
import { authMiddleware } from "../Middleware/AuthMiddleware";
import { loadBookingMiddleware } from "../Middleware/BookingMiddleware";
import { validate } from "../Middleware/ValidationMiddleware";
import { CriarReservaSchema } from "../schemas/ReservaSchemas";

export function criarRotasReserva(
    criarController: CriarReservaController,
    confirmarController: ConfirmarReservaController,
    rejeitarController: RejeitarReservaController,
    countController: CountConfirmedController
): Router {
    const router = Router();

    router.post("/", authMiddleware, validate(CriarReservaSchema), (req, res, next) => criarController.handle(req, res, next));
    router.get("/count-confirmed/:eventId", (req, res, next) => countController.handle(req, res, next));
    
    router.post("/:id/confirm", authMiddleware, loadBookingMiddleware, (req, res, next) => confirmarController.handle(req, res, next));
    router.post("/:id/reject", authMiddleware, loadBookingMiddleware, (req, res, next) => rejeitarController.handle(req, res, next));

    return router;
}
