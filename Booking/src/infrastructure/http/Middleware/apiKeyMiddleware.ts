import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    const expectedKey = process.env.BOOKING_API_KEY;

    if (!expectedKey) {
        logger.error("BOOKING_API_KEY is not defined in environment variables");
        return res.status(500).json({ error: "Internal Server Configuration Error" });
    }

    if (!apiKey || apiKey !== expectedKey) {
        logger.warn("Unauthorized internal service access attempt");
        return res.status(401).json({ error: "Unauthorized: Invalid or missing API Key" });
    }

    next();
};
