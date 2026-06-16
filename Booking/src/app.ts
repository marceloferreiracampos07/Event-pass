import express from 'express';
import { PrismaClient } from './generated/prisma';
import { PrismaReservaRepository } from './infrastructure/Database/PrismaReservaRepository';
import { RedisBroadcastService } from './infrastructure/Broadcast/PrismaBookingService';
import { ExternalEventService } from './infrastructure/Services/ExternalEventService';
import { CriarReservaUseCase } from './application/useCases/criar-reserva/CriarReservaUseCase';
import { ConfirmarReservaUseCase } from './application/useCases/confirmar-reserva/ConfirmarReservaUseCase';
import { RejeitarReservaUseCase } from './application/useCases/rejeitar-reserva/RejeitarReservaUseCase';   
import { ReservaController } from './infrastructure/http/controllers/ReservaController';
import { criarRotasReserva } from './infrastructure/http/routes/ReservaRoutes';
import { configuracao, validarConfiguracao } from './infrastructure/config/configuracao';

validarConfiguracao();

const app = express();
app.use(express.json());

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: configuracao.bancoDadosUrl,
        },
    },
});

const repositorioReserva = new PrismaReservaRepository(prisma);
const servicoTransmissao = new RedisBroadcastService();
const servicoEvento = new ExternalEventService();

const criarReservaUseCase = new CriarReservaUseCase(repositorioReserva, servicoEvento, servicoTransmissao);
const confirmarReservaUseCase = new ConfirmarReservaUseCase(repositorioReserva, servicoTransmissao);
const rejeitarReservaUseCase = new RejeitarReservaUseCase(repositorioReserva, servicoTransmissao);

const reservaController = new ReservaController(
    criarReservaUseCase,
    confirmarReservaUseCase,
    rejeitarReservaUseCase
);

app.use('/api/v1/bookings', criarRotasReserva(reservaController));

if (configuracao.ambiente !== 'test') {
    const PORT = configuracao.porta;
    app.listen(PORT, () => {
        console.log(`ServiÃ§o de Reservas rodando na porta ${PORT}`);
    });
}

export { app, prisma };

