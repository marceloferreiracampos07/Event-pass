import { describe, it, expect } from "vitest";
import { Evento } from "../../../Domain/entities/Evento"; // Ajuste o caminho se necessário

describe("Evento (Entidade de Domínio)", () => {
    const DATA_VALIDA = new Date();
    DATA_VALIDA.setDate(DATA_VALIDA.getDate() + 1);

    it("deve criar uma instância de evento válida com sucesso", () => {
        // Act
        const evento = new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 100);

        // Assert
        expect(evento.id).toBe("id-1");
        expect(evento.nome).toBe("Show de Rock");
        expect(evento.estoqueTotal).toBe(100);
        expect(evento.estoqueDisponivel).toBe(100);
    });

    describe("Validações do Construtor", () => {
        it("deve lançar erro se o nome for vazio ou menor que 3 caracteres", () => {
            expect(() => new Evento("id-1", "", DATA_VALIDA, 100, 100))
                .toThrow("O nome do evento deve ter pelo menos 3 caracteres");

            expect(() => new Evento("id-1", "Ab", DATA_VALIDA, 100, 100))
                .toThrow("O nome do evento deve ter pelo menos 3 caracteres");
        });

        it("deve lançar erro se o estoque total for negativo", () => {
            expect(() => new Evento("id-1", "Show de Rock", DATA_VALIDA, -5, 100))
                .toThrow("O estoque total do evento não pode ser negativo");
        });

        it("deve lançar erro se o estoque disponível for negativo", () => {
            expect(() => new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, -1))
                .toThrow("O estoque disponível do evento não pode ser negativo");
        });

        it("deve lançar erro se o estoque disponível for maior que o estoque total", () => {
            expect(() => new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 150))
                .toThrow("O estoque disponível não pode ser maior que o estoque total");
        });
    });

    describe("Método: baixarEstoque", () => {
        it("deve reduzir o estoque disponível com sucesso quando a quantidade for válida", () => {
            // Arrange
            const evento = new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 100);

            // Act
            evento.baixarEstoque(10);

            // Assert
            expect(evento.estoqueDisponivel).toBe(90);
        });

        it("deve lançar erro se a quantidade de baixa for menor ou igual a zero", () => {
            // Arrange
            const evento = new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 100);

            // Act & Assert
            expect(() => evento.baixarEstoque(0))
                .toThrow("A quantidade a ser baixada deve ser maior que zero");

            expect(() => evento.baixarEstoque(-5))
                .toThrow("A quantidade a ser baixada deve ser maior que zero");
        });

        it("deve lançar erro se a quantidade solicitada for maior que o estoque disponível", () => {
            // Arrange
            const evento = new Evento("id-1", "Show de Rock", DATA_VALIDA, 100, 10);

            // Act & Assert
            expect(() => evento.baixarEstoque(11))
                .toThrow("Ingressos esgotados para este evento");
        });
    });
});