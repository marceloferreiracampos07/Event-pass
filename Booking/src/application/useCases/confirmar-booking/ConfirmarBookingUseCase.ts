import { IBookingRepository } from "../../../Domain/repositories/IBookingRepository";
import { IEventBroadcaster } from "../../../Domain/Broadcast/IEventBroadcaster";
import { ConfirmarBookingInput } from "../create-booking/Dto/ConfirmarBookingInput";
import { ConfirmarBookingOutput } from "../create-booking/Dto/ConfirmarBookingOutput";

export class ConfirmarBookingUseCase {
    constructor(
        private repositoriobooking: IBookingRepository,
        private eventbroadcast: IEventBroadcaster
    ) {}

    async execute(input: ConfirmarBookingInput): Promise<ConfirmarBookingOutput> {
        const booking = await this.repositoriobooking.findById(input.id);
        
        if (!booking) {
            throw new Error(`Nao foi possivel encontrar reserva com ID ${input.id}`);
        }
        
        booking.confirmar();

        await this.repositoriobooking.updateStatus(input.id, booking.status);

        await this.eventbroadcast.publish("booking.confirmed", JSON.stringify({
            bookingId: input.id, 
            status: booking.status
        }));

        return {
            id: input.id,
            status: booking.status,
            message: "Reserva confirmada com sucesso!"
        };
    }
}