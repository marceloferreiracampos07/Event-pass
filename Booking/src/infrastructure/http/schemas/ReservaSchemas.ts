import { z } from "zod";

export const CriarReservaSchema = z.object({
    body: z.object({
        eventoId: z.number({
            required_error: "ID do evento Ã© obrigatÃ³rio",
            invalid_type_error: "ID do evento deve ser um nÃºmero"
        }).positive("ID do evento deve ser um nÃºmero positivo"),
        
        quantidadeIngressos: z.number({
            required_error: "Quantidade de ingressos Ã© obrigatÃ³ria",
            invalid_type_error: "Quantidade de ingressos deve ser um nÃºmero"
        }).int("Quantidade deve ser um nÃºmero inteiro")
          .positive("Quantidade deve ser maior que zero"),
        
        tipoIngresso: z.string({
            required_error: "Tipo de ingresso Ã© obrigatÃ³rio"
        }).trim().min(1, "Tipo de ingresso não pode estar vazio"),
        
        setor: z.string({
            required_error: "Setor Ã© obrigatÃ³rio"
        }).trim().min(1, "Setor não pode estar vazio")
    })
});

export type CriarReservaTipo = z.infer<typeof CriarReservaSchema>["body"];

