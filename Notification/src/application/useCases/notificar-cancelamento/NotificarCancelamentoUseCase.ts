import { PayloadEventoReserva } from "../Dto/PayloadEventoReserva";

export class NotificarCancelamentoUseCase {
    async executar(evento: PayloadEventoReserva): Promise<void> {
        console.log(`Enviando e-mail para o usuário ${evento.dados.usuarioId}: Sua reserva foi cancelada com sucesso.`);
    }
}
