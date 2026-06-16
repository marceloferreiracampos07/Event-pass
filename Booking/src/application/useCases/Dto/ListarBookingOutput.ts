export interface BookingOutputItem {
    id: number;
    eventId: number;
    userId: number;
    status: string;
    createdAt: Date;
}

export interface ListarBookingOutput {
    bookings: BookingOutputItem[];
}
