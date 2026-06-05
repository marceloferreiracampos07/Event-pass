import { describe, it, expect, vi } from "vitest";
import { Argon2PasswordHasher } from "../../security/Argon2PasswordHasher";
import argon2 from "argon2";

vi.mock("argon2");

describe("Argon2PasswordHasher", () => {
    const sut = new Argon2PasswordHasher();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("hash", () => {
        it("deve chamar o argon2.hash com a senha correta", async () => {
            const password = "any_password";
            vi.mocked(argon2.hash).mockResolvedValue("hashed_password");

            const result = await sut.hash(password);

            expect(argon2.hash).toHaveBeenCalledWith(password);
            expect(result).toBe("hashed_password");
        });
    });

    describe("compare", () => {
        it("deve retornar true quando argon2.verify retorna true", async () => {
            const password = "any_password";
            const hash = "$argon2id$v=19$m=65536,t=3,p=4$any_hash";
            vi.mocked(argon2.verify).mockResolvedValue(true);

            const result = await sut.compare(password, hash);

            expect(argon2.verify).toHaveBeenCalledWith(hash, password);
            expect(result).toBe(true);
        });

        it("deve retornar false quando o hash é inválido", async () => {
            const password = "any_password";
            const invalidHash = "invalid_hash";

            const result = await sut.compare(password, invalidHash);

            expect(result).toBe(false);
            expect(argon2.verify).not.toHaveBeenCalled();
        });

        it("deve retornar false quando o hash é vazio", async () => {
            const result = await sut.compare("any_password", "");
            expect(result).toBe(false);
        });

        it("deve retornar false quando argon2.verify falha", async () => {
            vi.mocked(argon2.verify).mockRejectedValue(new Error("Argon2 error"));
            const result = await sut.compare("any_password", "$argon2id$any");
            expect(result).toBe(false);
        });
    });
});
