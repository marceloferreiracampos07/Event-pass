import { Request, Response } from "express";
import { LoginUsecase } from "../../../Usecase/login/LoginUsecase";
import { LoginUserSchema } from "../schemas/LoginUser.schema";

export class LoginController {
    constructor(private readonly loginUseCase: LoginUsecase) {}

    async lidar(requisicao: Request, resposta: Response): Promise<void> {
        const dadosValidados = LoginUserSchema.parse(requisicao.body);
        const resultado = await this.loginUseCase.executar(dadosValidados);

        resposta.status(200).json(resultado);
    }
}