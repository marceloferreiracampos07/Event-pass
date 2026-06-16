# Booking Service

Booking orchestration service for the Event Pass project.

## Technologies
- Node.js with TypeScript
- Express
- Prisma ORM (MySQL)
- Redis (Pub/Sub)
- Zod (Validation)
- Vitest & Supertest (Testing)

## Configuration
1. Copy the `.env.example` file to `.env`:
   `cp .env.example .env`
2. Configure necessary environment variables (DATABASE_URL, REDIS_URL, JWT_SECRET).

## Status

| Service | Coverage | Status |
| :--- | :--- | :--- |
| **Booking** | 90% | 🟢 Production Ready |

- Run in development: `npm run dev`
- Run unit tests: `npm run test:unit`
- Run integration tests: `npm run test:integration`
- Generate coverage: `npm run test:coverage`
