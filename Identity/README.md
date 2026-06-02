# Identity Service - Event Pass

Serviço de gerenciamento de identidades e autenticação para o projeto Event Pass.

## 🚀 Funcionalidades

- **Cadastro de Usuários**: Registro com validação de dados via Zod.
- **Autenticação**: Login com verificação de credenciais.
- **Segurança**: 
  - Hash de senhas com **Argon2**.
  - Proteção de headers com **Helmet**.
  - Limite de requisições (**Rate Limiting**).
- **Roles**: Suporte para papéis `ADMIN` e `CUSTOMER`.
- **Sessões**: Integração com **Better-Auth** para controle de sessão.

## 🛠️ Tecnologias

- **Node.js** com **TypeScript**.
- **Express 5** para a API.
- **Prisma ORM** com banco de dados **MySQL**.
- **Vitest** para testes unitários e de integração.
- **Supertest** para testes de rotas.

## 📁 Estrutura do Projeto

O projeto segue os princípios de **Clean Architecture**:

- `src/Domain`: Entidades e interfaces de repositório (Regras de negócio de alto nível).
- `src/Usecase`: Casos de uso da aplicação (Regras de negócio específicas).
- `src/infrastructure`: Implementações técnicas (Banco de dados, HTTP, Segurança).

## 🧪 Testes

O projeto possui testes unitários e de integração com banco de dados isolado.

### Configurar Banco de Testes
1. Configure o arquivo `.env.test` com sua `DATABASE_URL` de testes.
2. Execute a preparação do banco:
   ```bash
   npm run test:prepare
   ```

### Executar Testes
```bash
npm run test
```

## ⚙️ Instalação e Execução

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env`.
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

---
Desenvolvido como parte do ecossistema Event Pass.
