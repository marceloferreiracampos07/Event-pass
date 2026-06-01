import { Request, Response } from "express";
import { LoginUsecase } from "../../../Usecase/login/LoginUsecase";
import { LoginUserSchema } from "../schemas/LoginUser.schema";

export class LoginController {
    constructor(private loginUseCase: LoginUsecase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = LoginUserSchema.parse(req.body);
            const result = await this.loginUseCase.execute(validatedData);
            
            res.status(200).json(result);
        } catch (error: any) {
            if (error.name === "ZodError") {
                res.status(400).json({ errors: error.errors });
                return;
            }
            res.status(401).json({ message: error.message });
        }
    }
}