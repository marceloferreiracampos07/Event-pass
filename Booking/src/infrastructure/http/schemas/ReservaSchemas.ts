import { z } from "zod";

export const CriarReservaSchema = z.object({
    body: z.object({
        eventoId: z.number({
            required_error: "ID do evento é obrigatório",
            invalid_type_error: "ID do evento deve ser um número"
        }).positive("ID do evento deve ser um número positivo"),
        
        quantidadeIngressos: z.number({
            required_error: "Quantidade de ingressos é obrigatória",
            invalid_type_error: "Quantidade de ingressos deve ser um número"
        }).int("Quantidade deve ser um número inteiro")
          .positive("Quantidade deve ser maior que zero"),
        
        tipoIngresso: z.string({
            required_error: "Tipo de ingresso é obrigatório"
        }).trim().min(1, "Tipo de ingresso não pode estar vazio"),
        
        setor: z.string({
            required_error: "Setor é obrigatório"
        }).trim().min(1, "Setor não pode estar vazio")
    })
});

export type CriarReservaTipo = z.infer<typeof CriarReservaSchema>["body"];
