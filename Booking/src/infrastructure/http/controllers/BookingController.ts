import {Request,Response} from "express"
import { CreateBookingUseCase } from "../../../application/useCases/create-booking/CreateBookingUseCase"
export class BookingController{
    constructor(
        private createbooking:CreateBookingUseCase,
    ){}
    async create(req:Request, res:Response): Promise<Response>{
        try {
            const {eventId} = req.params
        } catch (error) {
            
        }
    }
}