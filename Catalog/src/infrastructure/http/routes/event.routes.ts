import { Router } from 'express';
import { CriarEventoController } from '../controllers/CriarEventoController';
import { ListarEventosController } from '../controllers/ListarEventosController';
import { BuscarEventoPorIdController } from '../controllers/BuscarEventoPorIdController';
import { RequerAdmin } from '../Middleware/RequerAdmin';

export const eventRoutes = Router();

const criarEventoController = new CriarEventoController();
const listarEventosController = new ListarEventosController();
const buscarEventoPorIdController = new BuscarEventoPorIdController();

eventRoutes.post('/', RequerAdmin, criarEventoController.handle);
eventRoutes.get('/', listarEventosController.handle);
eventRoutes.get('/:id', buscarEventoPorIdController.handle);
