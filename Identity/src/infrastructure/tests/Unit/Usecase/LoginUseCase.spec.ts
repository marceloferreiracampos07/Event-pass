import { LoginUsecase } from "../../../../Usecase/login/LoginUsecase";
import { Usuario } from "../../../../Domain/entities/User";
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe("LoginUsecase", () => {
    let repositorioUsuarioMock: any;
    let hasherSenhaMock: any;
    let sut: LoginUsecase;

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

        sut = new LoginUsecase(repositorioUsuarioMock, hasherSenhaMock);
    });

    const dadosEntrada = {
        email: "francisco@teste.com",
        password: "senhaForte123!",
    };

    it("deve realizar login com sucesso quando as credenciais forem válidas", async () => {
        // Arrange
        const usuarioExistente = new Usuario(
            "id-123",
            "Francisco Teste",
            dadosEntrada.email,
            "CUSTOMER" as any,
            new Date(),
            "senha_criptografada_123"
        );
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(usuarioExistente);
        hasherSenhaMock.compare.mockResolvedValue(true);

        // Act
        const resultado = await sut.executar(dadosEntrada);

        // Assert
        expect(resultado).toEqual({
            id: "id-123",
            name: "Francisco Teste",
            email: dadosEntrada.email
        });
        expect(repositorioUsuarioMock.buscarPorEmail).toHaveBeenCalledWith(dadosEntrada.email);
        expect(hasherSenhaMock.compare).toHaveBeenCalledWith(dadosEntrada.password, "senha_criptografada_123");
    });

    it("deve lançar erro se o e-mail não for encontrado", async () => {
        // Arrange
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(null);

        // Act & Assert
        await expect(sut.executar(dadosEntrada)).rejects.toThrow("E-mail ou senha incorretos");
        expect(hasherSenhaMock.compare).not.toHaveBeenCalled();
    });

    it("deve lançar erro se a senha estiver incorreta", async () => {
        // Arrange
        const usuarioExistente = new Usuario(
            "id-123",
            "Francisco Teste",
            dadosEntrada.email,
            "CUSTOMER" as any,
            new Date(),
            "senha_correta"
        );
        repositorioUsuarioMock.buscarPorEmail.mockResolvedValue(usuarioExistente);
        hasherSenhaMock.compare.mockResolvedValue(false);

        // Act & Assert
        await expect(sut.executar(dadosEntrada)).rejects.toThrow("E-mail ou senha incorretos");
    });
});
