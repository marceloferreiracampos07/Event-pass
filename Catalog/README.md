# Catalog Service

Service responsible for event management and ticket inventory control.

## Features
- Event CRUD (Creation, Listing, Detailing).
- Business rule validation (dates cannot be in the past).
- Inventory control.
- JWT authentication for administrative routes.

## Technologies
- Node.js with TypeScript
- Express
- Prisma ORM
- MySQL
- Vitest (Testing)

## Configuration
1. Copy the `.env.example` file to `.env`.
2. Configure the environment variables (`DATABASE_URL`, `JWT_SECRET`).
3. Start the environment with Docker: `docker-compose up -d`.
4. Synchronize the database: `npx prisma db push`.
5. Run the project: `npm run dev`.
