import { Request, Response } from "express";
import { RegisterUseCase } from "../../../Usecase/register/RegisterUsecase";
import { RegisterUserSchema } from "../schemas/RegisterUser.schema";

export class RegisterController {
    constructor(private registerUseCase: RegisterUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = RegisterUserSchema.parse(req.body);
            const result = await this.registerUseCase.execute(validatedData);
            
            res.status(201).json(result);
        } catch (error: any) {
            if (error.name === "ZodError") {
                res.status(400).json({ errors: error.errors });
                return;
            }
            res.status(400).json({ message: error.message });
        }
    }
}