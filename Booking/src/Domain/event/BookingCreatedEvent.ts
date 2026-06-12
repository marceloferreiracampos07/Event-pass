import { Booking } from "../entities/Booking";

export class BookingCreatedEvent {
    public readonly occurredAt: Date;
    public readonly data: {
        id: number;
        eventId: number;
        userId: number;
        status: string;
        createdAt: Date;
    };

    constructor(booking: Booking) {
        this.occurredAt = new Date();
        this.data = {
            id: booking.id!,
            eventId: booking.eventId,
            userId: booking.userId,
            status: booking.status,
            createdAt: booking.createdAt
        };
    }
}