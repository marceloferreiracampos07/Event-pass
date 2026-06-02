import { Request, Response } from "express";
import { LoginUsecase } from "../../../Usecase/login/LoginUsecase";
import { LoginUserSchema } from "../schemas/LoginUser.schema";

export class LoginController {
    constructor(private loginUseCase: LoginUsecase) {}

    async lidar(requisicao: Request, resposta: Response): Promise<void> {
        try {
            const dadosValidados = LoginUserSchema.parse(requisicao.body);
            const resultado = await this.loginUseCase.executar(dadosValidados);
            
            resposta.status(200).json(resultado);
        } catch (erro: any) {
            if (erro.name === "ZodError") {
                resposta.status(400).json({ errors: erro.errors });
                return;
            }

            if (erro.message === "E-mail ou senha incorretos") {
                resposta.status(401).json({ message: erro.message });
                return;
            }

            console.error("Erro interno no LoginController:", erro);
            resposta.status(500).json({ 
                message: "Ocorreu um erro interno no servidor",
                error: process.env.NODE_ENV === "development" ? erro.message : undefined
            });
        }
    }
}
