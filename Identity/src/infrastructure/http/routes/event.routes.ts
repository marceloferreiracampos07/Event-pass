import { Router } from "express";
import { CriarEventoController } from "../controller/CriarEventoController";
import { ListarEventosController } from "../controller/ListarEventosController";
import { CriarEventoUseCase } from "../../../Usecase/evento/CriarEventoUseCase";
import { ListarEventosUseCase } from "../../../Usecase/evento/ListarEventosUseCase";
import { InMemoryEventoRepository } from "../../database/InMemoryEventoRepository";

const eventRoutes = Router();

// Infrastructure/Dependency Injection for simplicity for now
const eventoRepository = new InMemoryEventoRepository();
const criarEventoUseCase = new CriarEventoUseCase(eventoRepository);
const listarEventosUseCase = new ListarEventosUseCase(eventoRepository);

const criarEventoController = new CriarEventoController(criarEventoUseCase);
const listarEventosController = new ListarEventosController(listarEventosUseCase);

eventRoutes.post("/", (req, res) => criarEventoController.lidar(req, res));
eventRoutes.get("/", (req, res) => listarEventosController.lidar(req, res));

export { eventRoutes };
