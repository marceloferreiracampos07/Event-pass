export interface IEventService {
  verificarDisponibilidade(eventId: number, quantidade: number, setor: string): Promise<boolean>;
}

