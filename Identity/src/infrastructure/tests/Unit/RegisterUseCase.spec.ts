import { RegisterUseCase } from "../../../Usecase/register/RegisterUsecase";
import { IRepositorioUsuario } from "../../../Domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../../Domain/service/IPasswordHasher";
import { Usuario } from "../../../Domain/entities/User";
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe("RegisterUseCase", () => {
    let repositorioUsuarioMock: any;
    let hasherSenhaMock: any;
    let sut: RegisterUseCase;

    beforeEach(() => {
        repositorioUsuarioMock = {
            buscarPorEmail: vi.fn(),
            salvar: vi.fn(),
            buscarPorId: vi.fn(),
        };

        hasherSenhaMock = {
            hash: vi.fn(),
            compare: vi.fn(),
        };

        sut = new RegisterUseCase(repositorioUsuarioMock, hasherSenhaMock);
    });

    const dadosEntrada = {
        name: "Francisco Teste",
        email: "francisco@teste.com",
        password: "senhaForte123!",
        role: "CUSTOMER",
    };

    it("deve registrar um usuário com sucesso quando os dados forem válidos", async () => {
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(null);
        hasherSenhaMock.hash.mockResolvedValue("senha_criptografada_123");

        const resultado = await sut.executar(dadosEntrada as any);

        expect(resultado).toHaveProperty("id");
        expect(resultado.name).toBe(dadosEntrada.name);
        expect(resultado.email).toBe(dadosEntrada.email);

        expect(repositorioUsuarioMock.buscarPorEmail).toHaveBeenCalledWith(dadosEntrada.email);
        expect(hasherSenhaMock.hash).toHaveBeenCalledWith(dadosEntrada.password);
        expect(repositorioUsuarioMock.salvar).toHaveBeenCalled();
    });

    it("deve lançar um erro se o e-mail já estiver cadastrado no sistema", async () => {
        const usuarioExistente = new Usuario(
            "id-existente",
            dadosEntrada.name,
            dadosEntrada.email,
            dadosEntrada.role as any,
            new Date()
        );
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(usuarioExistente);

        await expect(sut.executar(dadosEntrada as any)).rejects.toThrow(
            "Já existe um usuário com esse e-mail no sistema"
        );

        expect(hasherSenhaMock.hash).not.toHaveBeenCalled();
        expect(repositorioUsuarioMock.salvar).not.toHaveBeenCalled();
    });
});