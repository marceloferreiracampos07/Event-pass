import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { eventRoutes } from './http/routes/event.routes';
import { logger } from './utils/logger';
import { errorHandler } from './http/Middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

app.use(express.json());

app.use('/api/v1/events', eventRoutes);

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swaggerConfig';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send("ok");
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        logger.info(`Catalog Service running on port ${PORT}`);
    });
}

export { app };
