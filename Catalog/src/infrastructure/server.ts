import express from 'express';
import { eventRoutes } from './http/routes/event.routes';

const app = express();
app.use(express.json());

app.use('/api/v1/events', eventRoutes);

app.listen(3000, () => console.log('Servidor Catalog rodando na porta 3000'));
