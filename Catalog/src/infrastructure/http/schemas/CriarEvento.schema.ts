import { z } from 'zod';

export const CriarEventoSchema = z.object({
    nome: z.string().min(3),
    data: z.string().datetime(),
    estoqueTotal: z.number().int().min(0),
});
