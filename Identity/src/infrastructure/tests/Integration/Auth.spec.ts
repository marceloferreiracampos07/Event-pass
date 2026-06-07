import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../../http/server";
import { prisma } from "../../database/prisma";
import { execSync } from "child_process";

describe("Auth Integration Tests", () => {
  // Setup: Resetar banco antes de rodar os testes
  beforeAll(async () => {
    // Garante que o schema do banco de testes está atualizado
    // NOTA: Certifique-se de que o container docker esteja rodando na porta 5433
    execSync("npx prisma db push --accept-data-loss");
  }, 30000);

  // Teardown: Limpar dados após os testes
  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  const userData = {
    name: "John Doe",
    email: "john@example.com",
    password: "Password123!",
    role: "CUSTOMER"
  };

  it("1. Deve registrar um usuário com sucesso (201)", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe(userData.email);
  });

  it("2. Deve retornar erro de validação do Zod (400) com e-mail inválido", async () => {
    const invalidUserData = { ...userData, email: "invalid-email" };
    
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUserData);

    expect(response.status).toBe(400);
    expect(response.body.errorCode).toBe("VALIDATION_ERROR");
  });

  it("3. Deve retornar erro de domínio (409) ao tentar registrar e-mail duplicado", async () => {
    // O primeiro já foi criado no teste 1
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(userData);

    expect(response.status).toBe(409);
    expect(response.body.errorCode).toBe("EMAIL_ALREADY_EXISTS");
    expect(response.body.message).toBe("Já existe um usuário com esse e-mail no sistema.");
  });
});
