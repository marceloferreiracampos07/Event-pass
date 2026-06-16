import { PayloadEventoReserva } from "../Dto/PayloadEventoReserva";

export class NotificarRejeicaoUseCase {
    async executar(evento: PayloadEventoReserva): Promise<void> {
        console.log(`Enviando e-mail para o usuário ${evento.dados.usuarioId}: Infelizmente os ingressos esgotaram.`);
    }
}
