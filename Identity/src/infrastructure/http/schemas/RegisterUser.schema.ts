import { z } from "zod";

export const RegisterUserSchema = z.object({
    name: z.string({ message: "O nome é obrigatório" })
           .min(2, "O nome deve ter pelo menos 2 caracteres"),

    email: z.string({ message: "O e-mail é obrigatório" })
            .email("Insira um e-mail válido"),

    password: z.string({ message: "A senha é obrigatória" })
               .min(6, "A senha deve ter pelo menos 6 caracteres"),

   role: z.enum(["ADMIN", "CUSTOMER"], {
    message: "O papel deve ser ADMIN ou CUSTOMER"
})
});

export type RegisterUserSchemaInput = z.infer<typeof RegisterUserSchema>;