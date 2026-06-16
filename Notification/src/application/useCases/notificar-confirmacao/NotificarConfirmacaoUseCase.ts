import { PayloadEventoReserva } from "../Dto/PayloadEventoReserva";

export class NotificarConfirmacaoUseCase {
    async executar(evento: PayloadEventoReserva): Promise<void> {
        console.log(`Enviando e-mail para o usuário ${evento.dados.usuarioId}: Seu ingresso para o evento foi confirmado!`);
    }
}
