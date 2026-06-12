export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export class Booking {
  constructor(
    public eventId: number, 
    public userId: number,  
    public status: BookingStatus = 'PENDING',
    public readonly id?: number,
    public readonly createdAt: Date = new Date()
  ) {
    this.validar();
  }

  private validar(): void {
    
    if (!this.eventId || this.eventId <= 0 || isNaN(this.eventId)) {
      throw new Error("O ID do evento é obrigatório e deve ser um número válido superior a zero");
    }

    if (!this.userId || this.userId <= 0 || isNaN(this.userId)) {
      throw new Error("O ID do usuário é obrigatório e deve ser um número válido superior a zero");
    }
    
    if (!this.id && this.status !== 'PENDING') {
      throw new Error("Uma nova reserva deve ser criada obrigatoriamente com o status PENDING");
    }

    const limiteFuturo = new Date(Date.now() + 5 * 60 * 1000);
    if (this.createdAt > limiteFuturo) {
      throw new Error("A data de criação da reserva não pode estar no futuro");
    }
  }

  public confirmar(): void {
    if (this.status !== 'PENDING') {
      throw new Error(`Não é possível confirmar uma reserva que está com o status ${this.status}`);
    }
    this.status = 'CONFIRMED';
  }

  public cancelar(): void {
    if (this.status === 'CANCELLED') {
      throw new Error("Esta reserva já foi cancelada");
    }
    this.status = 'CANCELLED';
  }
}