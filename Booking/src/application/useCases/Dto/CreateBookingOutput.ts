export interface CreateBookingOutput {
  id: number;
  eventId: number;
  userId: number;
  status: string;
  createdAt: Date;
}