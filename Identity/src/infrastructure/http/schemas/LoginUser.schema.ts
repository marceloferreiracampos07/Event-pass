import { z } from "zod";

export const LoginUserSchema = z.object({
    email: z.string({ message: "O e-mail é obrigatório" })
            .email("Insira um e-mail válido"),
            
    password: z.string({ message: "A senha é obrigatória" })
               .min(1, "A senha não pode estar vazia")
});

export type LoginUserSchemaInput = z.infer<typeof LoginUserSchema>;