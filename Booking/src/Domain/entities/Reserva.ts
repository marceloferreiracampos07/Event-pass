export type StatusReserva = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REJECTED';

export class Reserva {
  constructor(
    public eventoId: number, 
    public usuarioId: number,
    public quantidadeIngressos: number,
    public tipoIngresso: string,
    public setor: string,
    public status: StatusReserva = 'PENDING',
    public readonly id?: number,
    public readonly criadoEm: Date = new Date()
  ) {
    this.validar();
  }

  private validar(): void {
    if (!this.eventoId || this.eventoId <= 0) {
      throw new Error("O ID do evento é obrigatório e deve ser positivo");
    }

    if (!this.usuarioId || this.usuarioId <= 0) {
      throw new Error("O ID do usuário é obrigatório e deve ser positivo");
    }

    if (!this.quantidadeIngressos || this.quantidadeIngressos <= 0) {
      throw new Error("A quantidade de ingressos deve ser maior que zero");
    }

    if (!this.tipoIngresso?.trim()) {
      throw new Error("O tipo de ingresso é obrigatório");
    }

    if (!this.setor?.trim()) {
      throw new Error("O setor é obrigatório");
    }
    
    if (!this.id && this.status !== 'PENDING') {
      throw new Error("Uma nova reserva deve iniciar com status PENDING");
    }

    const limiteFuturo = new Date(Date.now() + 5 * 60 * 1000);
    if (this.criadoEm > limiteFuturo) {
      throw new Error("A data de criação não pode estar no futuro");
    }
  }

  public confirmar(): void {
    if (this.status !== 'PENDING') {
      throw new Error(`não é possível confirmar uma reserva ${this.status}`);
    }
    this.status = 'CONFIRMED';
  }

  public cancelar(): void {
    if (this.status === 'CANCELLED') {
      throw new Error("Esta reserva já foi cancelada");
    }
    this.status = 'CANCELLED';
  }

  public rejeitar(): void {
    if (this.status !== 'PENDING') {
      throw new Error("Apenas reservas pendentes podem ser rejeitadas");
    }
    this.status = 'REJECTED';
  }
}

