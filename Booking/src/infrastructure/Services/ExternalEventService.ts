import axios from 'axios';
import { IEventService } from "../../Domain/services/IEventService";
import { logger } from '../utils/logger';

export class ExternalEventService implements IEventService {
    private readonly catalogServiceUrl: string;
    private readonly bookingServiceUrl: string;

    constructor() {
        const catalogUrl = process.env.CATALOG_SERVICE_URL;
        const bookingUrl = process.env.BOOKING_SERVICE_URL;

        if (!catalogUrl || !bookingUrl) {
            throw new Error("Variáveis ​​de ambiente obrigatórias ausentes: CATALOG_SERVICE_URL ou BOOKING_SERVICE_URL");
        }

        this.catalogServiceUrl = catalogUrl;
        this.bookingServiceUrl = bookingUrl;
    }

    async verificarDisponibilidade(eventId: number, quantidade: number, setor: string): Promise<boolean> {
        try {
            const [eventoResponse, bookingResponse] = await Promise.all([
                axios.get(`${this.catalogServiceUrl}/api/v1/events/${eventId}`),
                axios.get(`${this.bookingServiceUrl}/api/v1/bookings/count-confirmed/${eventId}`)
            ]);

            const { estoqueTotal } = eventoResponse.data;
            const { count: reservasConfirmadas } = bookingResponse.data;

            const estoqueDisponivel = estoqueTotal - reservasConfirmadas;

            return estoqueDisponivel >= quantidade;
        } catch (error) {
            logger.error(`Erro ao verificar a disponibilidade do evento ${eventId}:`, error);
            return false;
        }
    }
}
