export interface CreateBookingInput {
    eventId: number;
    userId: number;
    quantidadeIngressos: number;
    tipoIngresso: string;
    setor: string;
}