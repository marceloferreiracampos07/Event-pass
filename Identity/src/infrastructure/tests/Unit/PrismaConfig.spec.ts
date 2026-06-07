import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PrismaClient } from "@prisma/client";

vi.mock("@prisma/client", () => {
  return {
    PrismaClient: vi.fn(),
  };
});

describe("Prisma Config", () => {
  beforeEach(() => {
    vi.resetModules();
    // Clear the global instance that prisma.ts might have set
    (globalThis as any).prisma = undefined;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve configurar log como query, error, warn em desenvolvimento", async () => {
    process.env.NODE_ENV = "development";
    await import("../../database/prisma");

    expect(PrismaClient).toHaveBeenCalledWith({
      log: ["query", "error", "warn"],
    });
  });

  it("deve configurar log apenas como error em produção", async () => {
    process.env.NODE_ENV = "production";
    await import("../../database/prisma");

    expect(PrismaClient).toHaveBeenCalledWith({
      log: ["error"],
    });
  });
});
