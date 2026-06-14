# Booking Service (Motor de Reservas)

Serviço de orquestração de reservas para o projeto Event Pass.

## Tecnologias
- Node.js com TypeScript
- Express
- Prisma ORM (MySQL)
- Redis (Pub/Sub)
- Zod (Validação)
- Vitest & Supertest (Testes)

## Configuração
1. Copie o arquivo `.env.example` para `.env`:
   `cp .env.example .env`
2. Configure as variáveis de ambiente necessárias (DATABASE_URL, REDIS_URL, JWT_SECRET).

## Comandos
- Instalar dependências: `npm install`
- Rodar em desenvolvimento: `npm run dev`
- Rodar testes unitários: `npm run test:unit`
- Rodar testes de integração: `npm run test:integration`
- Gerar coverage: `npm run test:coverage`
