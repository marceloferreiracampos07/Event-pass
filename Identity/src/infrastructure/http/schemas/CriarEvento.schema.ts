import { z } from "zod";

export const CriarEventoSchema = z.object({
    nome: z.string().min(3),
    data: z.string().datetime().transform((val) => new Date(val)),
});
