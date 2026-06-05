import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../http/server";

describe("Server Root Route", () => {
    it("deve responder 'ok' na rota raiz", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("ok");
    });
});
