import { Request, Response } from "express";
import { ZodError } from "zod";
import { LoginUsecase } from "../../../Usecase/login/LoginUsecase";
import { LoginUserSchema } from "../schemas/LoginUser.schema";

export class InvalidCredentialsError extends Error {
    constructor() {
        super("E-mail ou senha incorretos");
        this.name = "InvalidCredentialsError";
    }
}

export class LoginController {
    constructor(private readonly loginUseCase: LoginUsecase) {}

    async lidar(requisicao: Request, resposta: Response): Promise<void> {
        try {
            const dadosValidados = LoginUserSchema.parse(requisicao.body);
            const resultado = await this.loginUseCase.executar(dadosValidados);

            resposta.status(200).json(resultado);
        } catch (erro) {
            this.tratarErro(resposta, erro);
        }
    }

    private tratarErro(resposta: Response, erro: unknown): void {
        if (erro instanceof ZodError) {
            resposta.status(400).json({ errors: erro.issues });
            return;
        }

        const mensagemErro = erro instanceof Error ? erro.message : String(erro);

        if (erro instanceof InvalidCredentialsError || mensagemErro === "E-mail ou senha incorretos") {
            resposta.status(401).json({ message: "E-mail ou senha incorretos" });
            return;
        }

        console.error("[LoginController Internal Error]:", erro);

        resposta.status(500).json({
            message: "Ocorreu um erro interno no servidor",
            ...(process.env.NODE_ENV === "development" && { error: mensagemErro })
        });
    }
}