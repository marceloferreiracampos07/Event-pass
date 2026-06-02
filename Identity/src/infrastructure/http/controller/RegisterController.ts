import { Request, Response } from "express";
import { RegisterUseCase } from "../../../Usecase/register/RegisterUsecase";
import { RegisterUserSchema } from "../schemas/RegisterUser.schema";

export class RegisterController {
    constructor(private registerUseCase: RegisterUseCase) {}

    async lidar(requisicao: Request, resposta: Response): Promise<void> {
        try {
            const dadosValidados = RegisterUserSchema.parse(requisicao.body);
            const resultado = await this.registerUseCase.executar(dadosValidados);
            
            resposta.status(201).json(resultado);
        } catch (erro: any) {
            if (erro.name === "ZodError") {
                resposta.status(400).json({ errors: erro.errors });
                return;
            }

            if (erro.message === "Já existe um usuário com esse e-mail no sistema") {
                resposta.status(409).json({ message: erro.message });
                return;
            }

            console.error("Erro interno no RegisterController:", erro);
            resposta.status(500).json({ 
                message: "Ocorreu um erro interno no servidor",
                error: process.env.NODE_ENV === "development" ? erro.message : undefined
            });
        }
    }
}
