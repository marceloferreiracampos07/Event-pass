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
      throw new Error("O ID do evento Ã© obrigatÃ³rio e deve ser positivo");
    }

    if (!this.usuarioId || this.usuarioId <= 0) {
      throw new Error("O ID do usuÃ¡rio Ã© obrigatÃ³rio e deve ser positivo");
    }

    if (!this.quantidadeIngressos || this.quantidadeIngressos <= 0) {
      throw new Error("A quantidade de ingressos deve ser maior que zero");
    }

    if (!this.tipoIngresso?.trim()) {
      throw new Error("O tipo de ingresso Ã© obrigatÃ³rio");
    }

    if (!this.setor?.trim()) {
      throw new Error("O setor Ã© obrigatÃ³rio");
    }
    
    if (!this.id && this.status !== 'PENDING') {
      throw new Error("Uma nova reserva deve iniciar com status PENDING");
    }

    const limiteFuturo = new Date(Date.now() + 5 * 60 * 1000);
    if (this.criadoEm > limiteFuturo) {
      throw new Error("A data de criaÃ§Ã£o não pode estar no futuro");
    }
  }

  public confirmar(): void {
    if (this.status !== 'PENDING') {
      throw new Error(`não Ã© possÃ­vel confirmar uma reserva ${this.status}`);
    }
    this.status = 'CONFIRMED';
  }

  public cancelar(): void {
    if (this.status === 'CANCELLED') {
      throw new Error("Esta reserva jÃ¡ foi cancelada");
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

