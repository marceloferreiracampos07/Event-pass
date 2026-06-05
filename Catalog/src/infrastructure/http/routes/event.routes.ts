import { Router } from 'express';
import { CriarEventoController } from '../controllers/CriarEventoController';
import { ListarEventosController } from '../controllers/ListarEventosController';
import { BuscarEventoPorIdController } from '../controllers/BuscarEventoPorIdController';
import { RequerAdmin } from '../Middleware/RequerAdmin';
import { CriarEventoUseCase } from '../../../Usecases/criar/CriarEventoUseCase';
import { ListarEventosUseCase } from '../../../Usecases/listar/ListarEventosUseCase';
import { BuscarEventoPorIdUseCase } from '../../../Usecases/buscar/BuscarEventoPorIdUseCase';
import { PrismaEventoRepository } from '../../Database/PrismaEventoRepository';

export const eventRoutes = Router();

const repo = new PrismaEventoRepository();

const criarEventoUseCase = new CriarEventoUseCase(repo);
const listarEventosUseCase = new ListarEventosUseCase(repo);
const buscarEventoPorIdUseCase = new BuscarEventoPorIdUseCase(repo);

const criarEventoController = new CriarEventoController(criarEventoUseCase);
const listarEventosController = new ListarEventosController(listarEventosUseCase);
const buscarEventoPorIdController = new BuscarEventoPorIdController(buscarEventoPorIdUseCase);

eventRoutes.post('/', RequerAdmin, (req, res) => criarEventoController.handle(req, res));
eventRoutes.get('/', (req, res) => listarEventosController.handle(req, res));
eventRoutes.get('/:id', (req, res) => buscarEventoPorIdController.handle(req, res));
