import express from 'express';
import { PrismaClient } from './generated/prisma';
import { PrismaReservaRepository } from './infrastructure/Database/PrismaReservaRepository';
import { RedisBroadcastService } from './infrastructure/Broadcast/PrismaBookingService';
import { ExternalEventService } from './infrastructure/Services/ExternalEventService';
import { CriarReservaUseCase } from './application/useCases/create-booking/CriarReservaUseCase';
import { ConfirmarReservaUseCase } from './application/useCases/confirmar-booking/ConfirmarReservaUseCase';
import { RejeitarReservaUseCase } from './application/useCases/rejeitar-booking/RejeitarReservaUseCase';
import { ReservaController } from './infrastructure/http/controllers/ReservaController';
import { criarRotasReserva } from './infrastructure/http/routes/ReservaRoutes';
import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: path.resolve(__dirname, '../.env.test') });
} else {
    dotenv.config();
}

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
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

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT;
    if (!PORT) {
        throw new Error("PORT não configurada no ambiente");
    }
    app.listen(PORT, () => {
        console.log(`Serviço de Reservas rodando na porta ${PORT}`);
    });
}

export { app };
