import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../http/server';
import { prisma } from '../../database/prisma';

describe("Auth Integration Tests", () => {
    beforeAll(() => {
        if (process.env.NODE_ENV !== 'test') {
            throw new Error("Os testes de integração devem ser executados com NODE_ENV=test");
        }
    });

    const testUser = {
        name: "Test User",
        email: `test-${Date.now()}@example.com`,
        password: "Password123!",
        role: "CUSTOMER"
    };
    afterAll(async () => {
        await prisma.user.deleteMany({
            where: {
                email: testUser.email
            }
        });
        await prisma.$disconnect();
    });

    it("POST /api/v1/auth/register - deve registrar um novo usuário", async () => {
        const response = await request(app)
            .post("/api/v1/auth/register")
            .send(testUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.email).toBe(testUser.email);
    });

    it("POST /api/v1/auth/register - deve falhar ao registrar e-mail duplicado", async () => {
        const response = await request(app)
            .post("/api/v1/auth/register")
            .send(testUser);

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Já existe um usuário com esse e-mail no sistema");
    });

    it("POST /api/v1/auth/login - deve realizar login com sucesso", async () => {
        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.email).toBe(testUser.email);
    });

    it("POST /api/v1/auth/login - deve falhar com senha incorreta", async () => {
        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: testUser.email,
                password: "WrongPassword!"
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("E-mail ou senha incorretos");
    });

    it("POST /api/v1/auth/login - deve falhar ao tentar logar com conta inexistente", async () => {
        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "inexistente@exemplo.com",
                password: "QualquerSenha123!"
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("E-mail ou senha incorretos");
    });
});
