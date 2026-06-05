import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";
import { RegisterController } from "../../http/controller/RegisterController";
import { RegisterUseCase } from "../../../Usecase/register/RegisterUsecase";
import { Request, Response } from "express";
import { ZodError } from "zod";

describe("RegisterController", () => {
    let registerUseCaseMock: Mocked<RegisterUseCase>;
    let sut: RegisterController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    const dadosCorretosRequest = {
        name: "Francisco",
        email: "francisco@teste.com",
        password: "senhaForte123!",
        role: "CUSTOMER"
    };

    beforeEach(() => {
        registerUseCaseMock = {
            executar: vi.fn(),
        } as unknown as Mocked<RegisterUseCase>;

        sut = new RegisterController(registerUseCaseMock);

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
    });

    it("deve retornar 201 e os dados do usuário cadastrado quando a requisição for válida", async () => {
        req = { body: dadosCorretosRequest };
        const outputMock = { id: "id-123", name: "Francisco", email: "francisco@teste.com" };
        registerUseCaseMock.executar.mockResolvedValue(outputMock);

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(outputMock);
    });

    it("deve retornar 400 quando os dados enviados violarem o Zod Schema (Linhas 17-18)", async () => {

        req = {
            body: {}
        };

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ errors: expect.any(Array) })
        );
    });

    it("deve retornar 409 quando o e-mail já estiver cadastrado no sistema", async () => {
        req = { body: dadosCorretosRequest };
        registerUseCaseMock.executar.mockRejectedValue(
            new Error("Já existe um usuário com esse e-mail no sistema")
        );

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ message: "Já existe um usuário com esse e-mail no sistema" });
    });

    it("deve retornar 500 se o erro capturado não for uma instância de Error (Linhas 28-30)", async () => {
        req = { body: dadosCorretosRequest };
        registerUseCaseMock.executar.mockRejectedValue("Erro string bruto");

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Ocorreu um erro interno no servidor" });
    });

    it("deve expor os detalhes do erro no ambiente de development (Linhas 28-30)", async () => {
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "development";

        req = { body: dadosCorretosRequest };
        registerUseCaseMock.executar.mockRejectedValue(new Error("Falha de infra"));

        await sut.lidar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Ocorreu um erro interno no servidor",
            error: "Falha de infra"
        });

        process.env.NODE_ENV = originalEnv;
    });
});