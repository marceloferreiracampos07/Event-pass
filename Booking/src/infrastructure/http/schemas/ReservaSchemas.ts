import { z } from "zod";

export const CriarReservaSchema = z.object({
    body: z.object({
        eventoId: z.number().positive(),
        
        quantidadeIngressos: z.number().int().positive(),
        
        tipoIngresso: z.string().trim().min(1),
        
        setor: z.string().trim().min(1)
    })
});

export type CriarReservaTipo = z.infer<typeof CriarReservaSchema>["body"];

