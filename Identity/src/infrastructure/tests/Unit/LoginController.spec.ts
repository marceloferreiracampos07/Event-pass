import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";
import { LoginController, InvalidCredentialsError } from "../../http/controller/LoginController";
import { LoginUsecase } from "../../../Usecase/login/LoginUsecase";
import { Request, Response } from "express";

describe("LoginController", () => {

    let loginUseCaseMock: Mocked<LoginUsecase>;
    let sut: LoginController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        loginUseCaseMock = {
            executar: vi.fn(),
        } as unknown as Mocked<LoginUsecase>;

        sut = new LoginController(loginUseCaseMock);

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
    });

    it("deve retornar 200 e os dados do usuário quando a requisição for válida", async () => {

        req = {
            body: { email: "usuario@teste.com", password: "senhaForte123!" }
        };
        const outputMock = { id: "1", name: "User", email: "usuario@teste.com" };
        loginUseCaseMock.executar.mockResolvedValue(outputMock);

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(outputMock);
    });

    it("deve retornar 400 quando os dados enviados violarem o Zod Schema", async () => {

        req = {
            body: { email: "email-invalido", password: "" }
        };

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ errors: expect.any(Array) })
        );
    });

    it("deve retornar 401 quando o UseCase lançar erro de credenciais (mensagem)", async () => {

        req = {
            body: { email: "usuario@teste.com", password: "senhaForte123!" }
        };
        loginUseCaseMock.executar.mockRejectedValue(new Error("E-mail ou senha incorretos"));

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "E-mail ou senha incorretos" });
    });

    it("deve retornar 401 quando o UseCase lançar InvalidCredentialsError", async () => {

        req = {
            body: { email: "usuario@teste.com", password: "senhaForte123!" }
        };
        loginUseCaseMock.executar.mockRejectedValue(new InvalidCredentialsError());

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "E-mail ou senha incorretos" });
    });

    it("deve retornar 500 com detalhes do erro em ambiente de desenvolvimento", async () => {

        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "development";

        req = {
            body: { email: "usuario@teste.com", password: "senhaForte123!" }
        };
        loginUseCaseMock.executar.mockRejectedValue(new Error("Erro de infra"));

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Ocorreu um erro interno no servidor",
            error: "Erro de infra"
        });

        process.env.NODE_ENV = originalEnv;
    });

    it("deve retornar 500 sem detalhes do erro em ambiente de producao", async () => {

        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "production";

        req = {
            body: { email: "usuario@teste.com", password: "senhaForte123!" }
        };
        loginUseCaseMock.executar.mockRejectedValue(new Error("Erro de infra"));

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Ocorreu um erro interno no servidor"
        });

        process.env.NODE_ENV = originalEnv;
    });

    it("deve tratar corretamente quando um erro não é uma instância de Error", async () => {

        req = {
            body: { email: "usuario@teste.com", password: "senhaForte123!" }
        };
        loginUseCaseMock.executar.mockRejectedValue("Erro em string");

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Ocorreu um erro interno no servidor"
        }));
    });
});