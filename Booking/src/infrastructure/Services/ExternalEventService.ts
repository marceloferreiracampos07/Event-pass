import { IEventService } from "../../Domain/services/IEventService";

export class ExternalEventService implements IEventService {
    async verificarDisponibilidade(eventId: number, quantidade: number, setor: string): Promise<boolean> {
        return true;
    }
}
