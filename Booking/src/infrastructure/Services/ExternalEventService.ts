import { IEventService } from "../../Domain/services/IEventService";

export class ExternalEventService implements IEventService {
    private mockDisponibilidade: boolean = true;

    // Método para simular a resposta em testes
    setMockDisponibilidade(disponivel: boolean): void {
        this.mockDisponibilidade = disponivel;
    }

    async verificarDisponibilidade(eventId: number, quantidade: number, setor: string): Promise<boolean> {
        return this.mockDisponibilidade;
    }
}
