export abstract class DomainError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errorCode: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class AvailabilityError extends DomainError {
  readonly statusCode = 409;
  readonly errorCode = "BOOKING_NO_TICKETS_AVAILABLE";

  constructor() {
    super("não há ingressos disponíveis para este setor ou evento.");
  }
}

export class UnauthorizedError extends DomainError {
  readonly statusCode = 401;
  readonly errorCode = "CUSTOMER_AUTH_REQUIRED";

  constructor() {
    super("Unauthorized: Customer authentication required");
  }
}

export class BookingValidationError extends DomainError {
  readonly statusCode = 400;
  readonly errorCode = "INVALID_BOOKING_INPUT";

  constructor(message: string = "Dados da reserva inválidos ou ausentes.") {
    super(message);
  }
}

export class BookingRejectedError extends DomainError {
  readonly statusCode = 422;
  readonly errorCode = "BOOKING_REJECTED";

  constructor(message: string = "A reserva foi rejeitada devido a falhas no processamento.") {
    super(message);
  }
}
