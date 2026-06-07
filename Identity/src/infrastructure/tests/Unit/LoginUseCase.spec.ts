import { LoginUsecase } from "../../../Usecase/login/LoginUsecase";
import { Usuario } from "../../../Domain/entities/Usuario";
import { describe, it, expect, vi, beforeEach, MockedObject } from 'vitest';
import { IRepositorioUsuario } from "../../../Domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../../Domain/service/IPasswordHasher";
import { CredenciaisInvalidasError } from "../../../Domain/errors/DomainError";

describe("LoginUsecase", () => {
    let repositorioUsuarioMock: MockedObject<IRepositorioUsuario>;
    let hasherSenhaMock: MockedObject<IPasswordHasher>;
    let sut: LoginUsecase;

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

        sut = new LoginUsecase(repositorioUsuarioMock, hasherSenhaMock);
    });

    const dadosEntrada = {
        email: "francisco@teste.com",
        password: "senhaForte123!",
    };

    it("deve realizar login com sucesso quando as credenciais forem válidas", async () => {
        const usuarioExistente = new Usuario(
            "id-123",
            "Francisco Teste",
            dadosEntrada.email,
            "CUSTOMER",
            new Date(),
            "senha_criptografada_123"
        );
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(usuarioExistente);
        hasherSenhaMock.compare.mockResolvedValue(true);

        const resultado = await sut.executar(dadosEntrada);

        expect(resultado).toEqual({
            id: "id-123",
            name: "Francisco Teste",
            email: dadosEntrada.email
        });
        expect(repositorioUsuarioMock.buscarPorEmail).toHaveBeenCalledWith(dadosEntrada.email);
        expect(hasherSenhaMock.compare).toHaveBeenCalledWith(dadosEntrada.password, "senha_criptografada_123");
    });

    it("deve lançar erro se o e-mail não for encontrado", async () => {
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(null);

        await expect(sut.executar(dadosEntrada)).rejects.toThrow(CredenciaisInvalidasError);
        expect(hasherSenhaMock.compare).not.toHaveBeenCalled();
    });

    it("deve lançar erro se a senha estiver incorreta", async () => {
        const usuarioExistente = new Usuario(
            "id-123",
            "Francisco Teste",
            dadosEntrada.email,
            "CUSTOMER",
            new Date(),
            "senha_correta"
        );
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(usuarioExistente);
        hasherSenhaMock.compare.mockResolvedValue(false);

        await expect(sut.executar(dadosEntrada)).rejects.toThrow(CredenciaisInvalidasError);
    });

    it("deve usar uma string vazia se o usuário não tiver senha no banco", async () => {
        const usuarioSemSenha = new Usuario(
            "id-123",
            "Francisco Teste",
            dadosEntrada.email,
            "CUSTOMER",
            new Date(),
            undefined
        );
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(usuarioSemSenha);
        hasherSenhaMock.compare.mockResolvedValue(false);

        await expect(sut.executar(dadosEntrada)).rejects.toThrow(CredenciaisInvalidasError);

        expect(hasherSenhaMock.compare).toHaveBeenCalledWith(dadosEntrada.password, "");
    });
});