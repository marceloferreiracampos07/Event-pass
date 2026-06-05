import { describe, it, expect } from "vitest";
import { Evento } from "../../../Domain/entities/Evento"; 

describe("Evento (Entidade de DomÃ­nio)", () => {
    const DATA_VALIDA = new Date();
    DATA_VALIDA.setDate(DATA_VALIDA.getDate() + 1);

    it("deve criar uma instÃ¢ncia de evento vÃ¡lida com sucesso", () => {
        
        const evento = new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 100);

        
        expect(evento.id).toBe("id-1");
        expect(evento.nome).toBe("Show de Rock");
        expect(evento.estoqueTotal).toBe(100);
        expect(evento.estoqueDisponivel).toBe(100);
    });

    describe("ValidaÃ§Ãµes do Construtor", () => {
        it("deve lanÃ§ar erro se o nome for vazio ou menor que 3 caracteres", () => {
            expect(() => new Evento("id-1", "", DATA_VALIDA, 100, 100))
                .toThrow("O nome do evento deve ter pelo menos 3 caracteres");

            expect(() => new Evento("id-1", "Ab", DATA_VALIDA, 100, 100))
                .toThrow("O nome do evento deve ter pelo menos 3 caracteres");
        });

        it("deve lanÃ§ar erro se o estoque total for negativo", () => {
            expect(() => new Evento("id-1", "Show de Rock", DATA_VALIDA, -5, 100))
                .toThrow("O estoque total do evento nÃ£o pode ser negativo");
        });

        it("deve lanÃ§ar erro se o estoque disponÃ­vel for negativo", () => {
            expect(() => new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, -1))
                .toThrow("O estoque disponÃ­vel do evento nÃ£o pode ser negativo");
        });

        it("deve lanÃ§ar erro se o estoque disponÃ­vel for maior que o estoque total", () => {
            expect(() => new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 150))
                .toThrow("O estoque disponÃ­vel nÃ£o pode ser maior que o estoque total");
        });
    });

    describe("MÃ©todo: baixarEstoque", () => {
        it("deve reduzir o estoque disponÃ­vel com sucesso quando a quantidade for vÃ¡lida", () => {
            
            const evento = new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 100);

            
            evento.baixarEstoque(10);

            
            expect(evento.estoqueDisponivel).toBe(90);
        });

        it("deve lanÃ§ar erro se a quantidade de baixa for menor ou igual a zero", () => {
            
            const evento = new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 100);

            
            expect(() => evento.baixarEstoque(0))
                .toThrow("A quantidade a ser baixada deve ser maior que zero");

            expect(() => evento.baixarEstoque(-5))
                .toThrow("A quantidade a ser baixada deve ser maior que zero");
        });

        it("deve lanÃ§ar erro se a quantidade solicitada for maior que o estoque disponÃ­vel", () => {
            
            const evento = new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 10);

            
            expect(() => evento.baixarEstoque(11))
                .toThrow("Ingressos esgotados para este evento");
        });
    });
});
