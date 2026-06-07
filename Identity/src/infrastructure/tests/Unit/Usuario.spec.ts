import { describe, it, expect } from "vitest";
import { Usuario } from "../../../Domain/entities/Usuario";

describe("Usuario (Entidade de Domínio)", () => {
    const DATA_MOCK = new Date();

    it("deve criar uma instância de usuário válida com sucesso", () => {

        const usuario = new Usuario(
            "user-id-123",
            "Junior Dev",
            "junior@email.com",
            "CUSTOMER",
            DATA_MOCK,
            "senha123"
        );

        expect(usuario.id).toBe("user-id-123");
        expect(usuario.nome).toBe("Junior Dev");
        expect(usuario.email).toBe("junior@email.com");
        expect(usuario.papel).toBe("CUSTOMER");
        expect(usuario.criadoEm).toBe(DATA_MOCK);
        expect(usuario.senha).toBe("senha123");
    });

    it("deve permitir criar um usuário sem senha (senha opcional)", () => {
        const usuario = new Usuario("id", "Admin", "admin@email.com", "ADMIN", DATA_MOCK);
        expect(usuario.senha).toBeUndefined();
    });

    describe("Validações do Construtor (Alcançando 100% Coverage)", () => {

        it("deve lançar erro se o nome for vazio ou apenas espaços", () => {
            expect(() => new Usuario("id", "", "dev@email.com", "CUSTOMER", DATA_MOCK))
                .toThrow("O nome não pode ser vazio, preencha por gentileza");

            expect(() => new Usuario("id", "   ", "dev@email.com", "CUSTOMER", DATA_MOCK))
                .toThrow("O nome não pode ser vazio, preencha por gentileza");
        });

        it("deve lançar erro se o nome tiver menos de 3 caracteres", () => {
            expect(() => new Usuario("id", "Zé", "ze@email.com", "CUSTOMER", DATA_MOCK))
                .toThrow("O nome não pode ter menos de 3 caracteres");
        });

        it("deve lançar erro se o e-mail não possuir um formato válido", () => {
            const emailsInvalidos = ["emailinvalido", "email@com", "@dominio.com", "email@dominio."];

            emailsInvalidos.forEach((email) => {
                expect(() => new Usuario("id", "Dev Silva", email, "CUSTOMER", DATA_MOCK))
                    .toThrow("O e-mail não possui um formato válido");
            });
        });
    });
});