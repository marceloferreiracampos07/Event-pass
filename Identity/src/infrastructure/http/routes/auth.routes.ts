import { Router } from "express";
import { RegisterController } from "../controller/RegisterController";
import { LoginController } from "../controller/LoginController";
import { RegisterUseCase } from "../../../Usecase/register/RegisterUsecase";
import { LoginUsecase } from "../../../Usecase/login/LoginUsecase";
import { PrismaUserRepository } from "../../database/PrismaUserRepository";
import { Argon2PasswordHasher } from "../../security/Argon2PasswordHasher";

const authRoutes = Router();

const userRepository = new PrismaUserRepository();
const passwordHasher = new Argon2PasswordHasher();

const registerUseCase = new RegisterUseCase(userRepository, passwordHasher);
const loginUseCase = new LoginUsecase(userRepository, passwordHasher);

const registerController = new RegisterController(registerUseCase);
const loginController = new LoginController(loginUseCase);

authRoutes.post("/register", (req, res) => registerController.handle(req, res));
authRoutes.post("/login", (req, res) => loginController.handle(req, res));

export { authRoutes };
