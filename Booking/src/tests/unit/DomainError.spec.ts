import { describe, it, expect } from 'vitest';
import { 
    AvailabilityError, 
    UnauthorizedError, 
    BookingValidationError, 
    BookingRejectedError 
} from '@/Domain/errors/DomainError';

describe('Domain Errors', () => {
    it('deve instanciar AvailabilityError corretamente', () => {
        const error = new AvailabilityError();
        expect(error.message).toBe("não há ingressos disponíveis para este setor ou evento.");
        expect(error.statusCode).toBe(409);
        expect(error.errorCode).toBe("BOOKING_NO_TICKETS_AVAILABLE");
    });

    it('deve instanciar UnauthorizedError corretamente', () => {
        const error = new UnauthorizedError();
        expect(error.message).toBe("Unauthorized: Customer authentication required");
        expect(error.statusCode).toBe(401);
        expect(error.errorCode).toBe("CUSTOMER_AUTH_REQUIRED");
    });

    it('deve instanciar BookingValidationError com mensagem padrão', () => {
        const error = new BookingValidationError();
        expect(error.message).toBe("Dados da reserva inválidos ou ausentes.");
        expect(error.statusCode).toBe(400);
        expect(error.errorCode).toBe("INVALID_BOOKING_INPUT");
    });

    it('deve instanciar BookingValidationError com mensagem customizada', () => {
        const error = new BookingValidationError("Erro customizado");
        expect(error.message).toBe("Erro customizado");
    });

    it('deve instanciar BookingRejectedError com mensagem padrão', () => {
        const error = new BookingRejectedError();
        expect(error.message).toBe("A reserva foi rejeitada devido a falhas no processamento.");
        expect(error.statusCode).toBe(422);
        expect(error.errorCode).toBe("BOOKING_REJECTED");
    });
});

