import { IBookingRepository } from "../../../Domain/repositories/IBookingRepository";
import { CancelarBookinginput } from "../Dto/CancelarBookingInput";
import { CancelarBookingOutput } from "../Dto/CancelarBookingOutput";
import { IEventBroadcaster } from "../../../Domain/Broadcast/IEventBroadcaster";
import { BookingChannels } from "../../../Domain/Broadcast/BookingChannels";
export class CancelarBookingUseCase {
    constructor(
        private repositoriobooking: IBookingRepository,
        private eventBroadcaster: IEventBroadcaster
    ) {}

    async execute(input: CancelarBookinginput): Promise<CancelarBookingOutput> {
        const booking = await this.repositoriobooking.findById(input.bookingId);
        
        if (!booking) {
            throw new Error(`Reserva com ID ${input.bookingId} não encontrada.`);
        }
        
        booking.cancelar();
        
        await this.repositoriobooking.updateStatus(input.bookingId, booking.status);
        
        await this.eventBroadcaster.publish(BookingChannels.BOOKINGS, JSON.stringify({
            type: "ReservationProcessed",
            data: {
                bookingId: booking.id,
                userId: booking.userId, 
                status: booking.status
            }
        }));

        return {
            id: input.bookingId,
            status: booking.status,
            message: "Reserva cancelada com sucesso."
        };
    }
}