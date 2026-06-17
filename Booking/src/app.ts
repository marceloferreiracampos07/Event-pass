import express from 'express';
import morgan from 'morgan';
import { PrismaClient } from './generated/prisma';
import { PrismaReservaRepository } from './infrastructure/Database/PrismaReservaRepository';
import { RedisBroadcastService } from './infrastructure/Broadcast/PrismaBookingService';
import { ExternalEventService } from './infrastructure/Services/ExternalEventService';
import { CriarReservaUseCase } from './application/useCases/criar-reserva/CriarReservaUseCase';
import { ConfirmarReservaUseCase } from './application/useCases/confirmar-reserva/ConfirmarReservaUseCase';
import { RejeitarReservaUseCase } from './application/useCases/rejeitar-reserva/RejeitarReservaUseCase';   
import { CriarReservaController } from './infrastructure/http/controllers/CriarReservaController';
import { ConfirmarReservaController } from './infrastructure/http/controllers/ConfirmarReservaController';
import { RejeitarReservaController } from './infrastructure/http/controllers/RejeitarReservaController';
import { CountConfirmedController } from './infrastructure/http/controllers/CountConfirmedController';
import { criarRotasReserva } from './infrastructure/http/routes/ReservaRoutes';
import { configuracao, validarConfiguracao } from './infrastructure/config/configuracao';
import { logger } from './infrastructure/utils/logger';

validarConfiguracao();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

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

const criarController = new CriarReservaController(criarReservaUseCase);
const confirmarController = new ConfirmarReservaController(confirmarReservaUseCase);
const rejeitarController = new RejeitarReservaController(rejeitarReservaUseCase);
const countController = new CountConfirmedController(repositorioReserva);

app.use('/api/v1/bookings', criarRotasReserva(criarController, confirmarController, rejeitarController, countController));

if (configuracao.ambiente !== 'test') {
    const PORT = configuracao.porta;
    app.listen(PORT, () => {
        logger.info(`Serviço de Reservas rodando na porta ${PORT}`);
    });
}

import { errorHandler } from './infrastructure/http/Middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './infrastructure/config/swaggerConfig';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

export { app, prisma };
