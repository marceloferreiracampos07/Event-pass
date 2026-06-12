import { IBookingRepository } from "../../../Domain/repositories/IBookingRepository";
import { ListarBookingOutput } from "../Dto/ListarBookingOutput";
import { ListarBookingInput } from "../Dto/ListarBookingInput";

export class ListBookingUseCase{
    constructor(
        private bookingrepository:IBookingRepository
    ){}
    async execute(input:ListarBookingInput): Promise<ListarBookingOutput>{
        const booking = await this.bookingrepository.findByUserId(input.userId)

        const brookinglist = booking.map(book => ({
            id: book.id!,          
            eventId: book.eventId,
            userId: book.userId,
            status: book.status,   
            createdAt: book.createdAt
        }));

        return {
            bookings:brookinglist
        };
    }
}