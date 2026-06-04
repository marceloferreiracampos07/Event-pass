# Catalog Service

Serviço responsável pela gestão de eventos e controle de estoque de ingressos.

## Funcionalidades
- CRUD de Eventos (Criação, Listagem, Detalhamento).
- Validação de regras de negócio (data não pode ser no passado).
- Controle de estoque.
- Autenticação via JWT para rotas administrativas.

## Tecnologias
- Node.js com TypeScript
- Express
- Prisma ORM
- MySQL
- Vitest (Testes)

## Configuração
1. Copie o arquivo `.env.example` para `.env`.
2. Configure as variáveis de ambiente (`DATABASE_URL`, `JWT_SECRET`).
3. Suba o ambiente com Docker: `docker-compose up -d`.
4. Sincronize o banco: `npx prisma db push`.
5. Rode o projeto: `npm run dev`.
