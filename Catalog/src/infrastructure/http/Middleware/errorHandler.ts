import { Request, Response, NextFunction } from "express";
import { logger } from "../../utils/logger";

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  logger.error("Erro interno:", error);
  
  return response.status(500).json({
    error: error.message || "Erro interno no servidor",
    codigo: "ERRO_INTERNO_SERVIDOR",
  });
}
