import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { DomainError } from "../../../Domain/errors/DomainError";
import { logger } from "../../utils/logger";

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      status: "error",
      errorCode: "VALIDATION_ERROR",
      message: "Validation failed",
      errors: error.issues,
    });
  }

  if (error instanceof DomainError) {
    return response.status(error.statusCode).json({
      status: "error",
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  logger.error(error); // Log internal errors

  return response.status(500).json({
    status: "error",
    errorCode: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
}
