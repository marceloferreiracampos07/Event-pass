import { Request, Response } from "express";
import { ZodError } from "zod";
import { RegisterUseCase } from "../../../Usecase/register/RegisterUsecase";
import { RegisterUserSchema } from "../schemas/RegisterUser.schema";

export class RegisterController {
    constructor(private readonly registerUseCase: RegisterUseCase) {}

    async lidar(requisicao: Request, resposta: Response): Promise<void> {
        try {
            const dadosValidados = RegisterUserSchema.parse(requisicao.body);
            const resultado = await this.registerUseCase.executar(dadosValidados);

            resposta.status(201).json(resultado);
        } catch (erro) {
            if (erro instanceof ZodError) {
                resposta.status(400).json({ errors: erro.issues });
                return;
            }

            const mensagemErro = erro instanceof Error ? erro.message : "Erro inesperado";

            if (mensagemErro === "Já existe um usuário com esse e-mail no sistema") {
                resposta.status(409).json({ message: mensagemErro });
                return;
            }

            console.error("[RegisterController Internal Error]:", erro);

            resposta.status(500).json({
                message: "Ocorreu um erro interno no servidor",
                ...(process.env.NODE_ENV === "development" && { error: mensagemErro })
            });
        }
    }
}