export interface PayloadEventoReserva {
    tipo: string;
    dados: {
        reservaId: number;
        usuarioId: number;
        status: string;
        eventoId?: number;
    };
}
