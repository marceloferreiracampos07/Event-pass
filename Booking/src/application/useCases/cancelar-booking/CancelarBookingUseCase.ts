import { IBookingRepository } from "../../../Domain/repositories/IBookingRepository";
import { CancelarBookinginput } from "../Dto/CancelarBookingInput";
import { CancelarBookingOutput } from "../Dto/CancelarBookingOutput";
import { IEventBroadcaster } from "../../../Domain/Broadcast/IEventBroadcaster";

export class CancelarBookingUseCase {
    constructor(
        private repositoriobooking: IBookingRepository,
        private eventBroadcaster: IEventBroadcaster
    ) {}

    async execute(input: CancelarBookinginput): Promise<CancelarBookingOutput> {
        const booking = await this.repositoriobooking.findById(input.bookingId);
        
        if (!booking) {
            throw new Error("nao foi encontrado reserva ");
        }
        
        booking.cancelar();
        
        await this.repositoriobooking.updateStatus(input.bookingId, booking.status);
        
        await this.eventBroadcaster.publish("booking.cancelled", JSON.stringify({
            bookingId: input.bookingId,
            motivocancela: input.motivo
        }));

        return {
            id: input.bookingId,
            status: "CANCELLED",
            message: "sua reserva foi cancelada com sucesso "
        };
    }
}