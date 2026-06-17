import axios from 'axios';
import { logger } from '../utils/logger';

export class BookingClient {
    private readonly bookingServiceUrl: string;

    constructor() {
        // Assume Booking service URL is configurable via env
        this.bookingServiceUrl = process.env.BOOKING_SERVICE_URL || 'http://localhost:3000';
    }

    async getConfirmedCount(eventId: number): Promise<number> {
        try {
            const response = await axios.get(`${this.bookingServiceUrl}/api/v1/bookings/count-confirmed/${eventId}`);
            return response.data.count;
        } catch (error) {
            logger.error(`Error fetching confirmed bookings for event ${eventId}:`, error);
            // Default to 0 or handle as needed for business continuity
            return 0;
        }
    }
}
