import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../config/auth";
import { eventRoutes } from "./routes/event.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "../utils/logger";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/events", eventRoutes);
app.all("/api/auth/*path", toNodeHandler(auth));

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swaggerConfig';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send("ok");
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
}

export { app };