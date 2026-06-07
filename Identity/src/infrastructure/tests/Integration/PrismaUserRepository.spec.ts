import { describe, it, expect, beforeEach, vi } from "vitest";
import { PrismaUserRepository } from "../../database/PrismaUserRepository";
import { Usuario, PapelUsuario } from "../../../Domain/entities/Usuario";
import { prisma } from "../../database/prisma";

describe("PrismaUserRepository", () => {
    let sut: PrismaUserRepository;

    beforeEach(async () => {
        sut = new PrismaUserRepository();
        await prisma.user.deleteMany();
    });

    it("deve salvar e buscar um usuário por e-mail", async () => {
        const usuario = new Usuario("user-1", "Teste", "teste@email.com", "CUSTOMER", new Date());
        await sut.salvar(usuario, "hash123");

        const encontrado = await sut.buscarPorEmail("teste@email.com");
        expect(encontrado).not.toBeNull();
        expect(encontrado?.id).toBe("user-1");
        expect(encontrado?.senha).toBe("hash123");
    });

    it("deve buscar um usuário por ID", async () => {
        const usuario = new Usuario("user-2", "Teste ID", "id@email.com", "CUSTOMER", new Date());
        await sut.salvar(usuario, "hash123");

        const encontrado = await sut.buscarPorId("user-2");
        expect(encontrado).not.toBeNull();
        expect(encontrado?.id).toBe("user-2");
    });

    it("deve retornar null se o usuário não for encontrado por ID", async () => {
        const encontrado = await sut.buscarPorId("non-existent");
        expect(encontrado).toBeNull();
    });

    it("deve retornar null se o usuário não for encontrado por e-mail", async () => {
        const encontrado = await sut.buscarPorEmail("non-existent@email.com");
        expect(encontrado).toBeNull();
    });

    describe("Tratamento de Erros", () => {
        it("deve lançar erro quando falhar ao buscar por e-mail", async () => {
            vi.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error("Erro de conexão"));
            await expect(sut.buscarPorEmail("any@email.com")).rejects.toThrow("Falha ao buscar usuário por e-mail: Erro de conexão");
        });

        it("deve lançar erro quando falhar ao salvar", async () => {
            vi.spyOn(prisma.user, 'create').mockRejectedValueOnce(new Error("Erro ao criar"));
            const usuario = new Usuario("user-3", "Erro", "erro@email.com", "CUSTOMER", new Date());
            await expect(sut.salvar(usuario, "hash")).rejects.toThrow("Falha ao salvar usuário: Erro ao criar");
        });

        it("deve lançar erro quando falhar ao buscar por ID", async () => {
            vi.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error("Erro de ID"));
            await expect(sut.buscarPorId("any-id")).rejects.toThrow("Falha ao buscar usuário por ID: Erro de ID");
        });

        it("deve tratar erros que não são instâncias de Error", async () => {
            vi.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce("Erro Genérico");
            await expect(sut.buscarPorEmail("any@email.com")).rejects.toThrow("Falha ao buscar usuário por e-mail: Erro Genérico");
        });
    });
});
