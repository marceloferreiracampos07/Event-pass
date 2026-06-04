import { describe, it, expect } from "vitest";
import { Evento } from "../../../Domain/entities/Evento";

describe("Entidade Evento", () =>{
    it("deve criar uma instacia de Evento com sucesso ")
    const Datafutura = new Date()
    Datafutura.setDate(Datafutura.getDate() + 5);

    const evento = new Evento(
            "123-uuid",
            "Show do Alok",
            Datafutura,
            100,
            100
        );
    expect(evento.id).toBe("123-uuid");
    expect(evento.nome).toBe("Show do Alok");
    expect(evento.estoqueDisponivel).toBe(100);

    it("deve disparar um erro se tentar criar evento com estoque negativo", () => {
        const dataFutura = new Date();
        dataFutura.setDate(dataFutura.getDate() + 5);

        expect(() => {
            new Evento(
                "123-uuid",
                "Show Inválido",
                dataFutura,
                -10, 
                -10
            );
        }).toThrow("O estoque total do evento não pode ser negativo");
    });

})