export abstract class DomainError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errorCode: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UsuarioNaoEncontradoError extends DomainError {
  readonly statusCode = 404;
  readonly errorCode = "USER_NOT_FOUND";

  constructor() {
    super("Usuário não encontrado.");
  }
}

export class CredenciaisInvalidasError extends DomainError {
  readonly statusCode = 401;
  readonly errorCode = "INVALID_CREDENTIALS";

  constructor() {
    super("E-mail ou senha incorretos.");
  }
}

export class EmailJaCadastradoError extends DomainError {
  readonly statusCode = 409;
  readonly errorCode = "EMAIL_ALREADY_EXISTS";

  constructor() {
    super("Já existe um usuário com esse e-mail no sistema.");
  }
}

export class EventoComNomeDuplicadoError extends DomainError {
  readonly statusCode = 409;
  readonly errorCode = "EVENT_NAME_ALREADY_EXISTS";

  constructor() {
    super("Já existe um evento com esse nome.");
  }
}

export class DataDoEventoInvalidaError extends DomainError {
  readonly statusCode = 400;
  readonly errorCode = "INVALID_EVENT_DATE";

  constructor() {
    super("A data do evento não pode ser no passado.");
  }
}
