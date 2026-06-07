import { Request, Response } from "express";
import { RegisterUseCase } from "../../../Usecase/register/RegisterUsecase";
import { RegisterUserSchema } from "../schemas/RegisterUser.schema";

export class RegisterController {
    constructor(private readonly registerUseCase: RegisterUseCase) {}

    async lidar(requisicao: Request, resposta: Response): Promise<void> {
        const dadosValidados = RegisterUserSchema.parse(requisicao.body);
        const resultado = await this.registerUseCase.executar(dadosValidados);

        resposta.status(201).json(resultado);
    }
}