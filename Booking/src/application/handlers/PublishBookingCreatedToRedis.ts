import { IEventBroadcaster } from "../../Domain/Broadcast/IEventBroadcaster";
import { BookingCreatedEvent } from "../../Domain/event/BookingCreatedEvent";

export class PublishBookingCreatedToRedis{
    constructor(
        private eventBroadcaster:IEventBroadcaster
    ){}

    async execute(event:BookingCreatedEvent):Promise<void>{
        const Canal = "channel-Booking"

        const payload = {
            occurredAt: event.occurredAt,
            data: {
                id: event.data.id,
                eventId: event.data.eventId,
                userId: event.data.userId,
                status: event.data.status,
                createdAt: event.data.createdAt
            }
        };

        
        await this.eventBroadcaster.publish(Canal, JSON.stringify(payload));

        console.log(` Evento publicado com sucesso no canal ${Canal}`);
        
    }
} 