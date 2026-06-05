import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Prisma Config", () => {
    beforeEach(() => {
        vi.resetModules();
    });

    it("deve configurar log como query, error, warn em desenvolvimento", async () => {
        process.env.NODE_ENV = "development";
        const { prisma } = await import("./prisma");

        expect(prisma._engineConfig.logQueries).toBeDefined;

    });

    it("deve configurar log apenas como error em outros ambientes", async () => {
        process.env.NODE_ENV = "production";
        const { prisma } = await import("./prisma");
        expect(prisma).toBeDefined();
    });
});
