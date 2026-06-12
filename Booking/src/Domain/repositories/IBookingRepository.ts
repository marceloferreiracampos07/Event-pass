import { Booking, BookingStatus } from "../entities/Booking"

export interface  IBookingRepository{
    create(booking:Booking):Promise<Booking>
    findById(id:number):Promise<Booking | null>
    updateStatus(id: number, status: BookingStatus): Promise<void>
    findByUserId(userId: number): Promise<Booking[]>
} 