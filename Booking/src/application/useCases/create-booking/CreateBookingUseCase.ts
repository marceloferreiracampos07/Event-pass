import { Booking } from "../../../Domain/entities/Booking"
import { IBookingRepository } from "../../../Domain/repositories/IBookingRepository"
import { CreateBookingInput } from "./Dto/CreateBookingInput"
import { CreateBookingOutput } from "./Dto/CreateBookingOutput"

export class CreateBookingUseCase {
    constructor(
        private repositorioBooking: IBookingRepository
    ) {}

    async execute(entrada: CreateBookingInput): Promise<CreateBookingOutput> {

        const bookingDomain = new Booking(
            entrada.eventId,
            entrada.userId
        )

         
        const bookingSalvo = await this.repositorioBooking.create(bookingDomain)

        
        return {
            id: bookingSalvo.id!,
            eventId: bookingSalvo.eventId,
            userId: bookingSalvo.userId,
            status: bookingSalvo.status,
            createdAt: bookingSalvo.createdAt
        };
    }
}