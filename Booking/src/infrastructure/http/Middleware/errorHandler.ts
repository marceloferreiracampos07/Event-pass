import { Request, Response, NextFunction } from "express";
import { DomainError } from "../../../Domain/errors/DomainError";
import { logger } from "../utils/logger";

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof DomainError) {
    return response.status(error.statusCode).json({
      error: error.message,
      codigo: error.errorCode,
    });
  }

  logger.error("Erro interno:", error);
  
  return response.status(500).json({
    error: error.message || "Erro interno no servidor",
    codigo: "ERRO_INTERNO_SERVIDOR",
  });
}
