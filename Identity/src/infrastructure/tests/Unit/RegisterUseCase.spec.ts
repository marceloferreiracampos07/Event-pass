import { RegisterUseCase } from "../../../Usecase/register/RegisterUsecase";
import { IRepositorioUsuario } from "../../../Domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../../Domain/service/IPasswordHasher";
import { Usuario } from "../../../Domain/entities/Usuario";
import { describe, it, expect, vi, beforeEach, MockedObject } from 'vitest';
import { EmailJaCadastradoError } from "../../../Domain/errors/DomainError";

describe("RegisterUseCase", () => {
    let repositorioUsuarioMock: MockedObject<IRepositorioUsuario>;
    let hasherSenhaMock: MockedObject<IPasswordHasher>;
    let sut: RegisterUseCase;

    beforeEach(() => {
        repositorioUsuarioMock = {
            buscarPorEmail: vi.fn(),
            salvar: vi.fn(),
            buscarPorId: vi.fn(),
        } as MockedObject<IRepositorioUsuario>;

        hasherSenhaMock = {
            hash: vi.fn(),
            compare: vi.fn(),
        } as MockedObject<IPasswordHasher>;

        sut = new RegisterUseCase(repositorioUsuarioMock, hasherSenhaMock);
    });

    const dadosEntrada = {
        name: "Francisco Teste",
        email: "francisco@teste.com",
        password: "senhaForte123!",
        role: "CUSTOMER" as const,
    };

    it("deve registrar um usuário com sucesso quando os dados forem válidos", async () => {
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(null);
        hasherSenhaMock.hash.mockResolvedValue("senha_criptografada_123");

        const resultado = await sut.executar(dadosEntrada);

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
            dadosEntrada.role,
            new Date()
        );
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(usuarioExistente);

        await expect(sut.executar(dadosEntrada)).rejects.toThrow(EmailJaCadastradoError);

        expect(hasherSenhaMock.hash).not.toHaveBeenCalled();
        expect(repositorioUsuarioMock.salvar).not.toHaveBeenCalled();
    });
});