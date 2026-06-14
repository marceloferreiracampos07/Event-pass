import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod Validation Error:", error.errors);
            return res.status(400).json({
                error: "Erro de validação",
                details: error.errors.map(err => ({
                    field: err.path.join("."),
                    message: err.message
                }))
            });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
