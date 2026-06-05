import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { eventRoutes } from './http/routes/event.routes';

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use('/api/v1/events', eventRoutes);

app.get('/', (req, res) => {
    res.send("ok");
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(\Catalog Service running on port \\);
    });
}

export { app };
