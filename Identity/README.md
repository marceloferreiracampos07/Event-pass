# 🔐 Identity Service - EventPass

O **Identity Service** é o núcleo de autenticação e gestão de usuários do ecossistema **EventPass**. Construído seguindo rigorosamente os princípios de **Clean Architecture** e **DDD (Domain-Driven Design)**, este serviço garante segurança, escalabilidade e manutenibilidade.

---

## 🚀 Funcionalidades Principais

- **Registro de Usuários:** Cadastro robusto com validação via Zod e persistência segura.
- **Autenticação Segura:** Login com verificação de credenciais e integração com sessões.
- **Gestão de Roles:** Sistema de permissões diferenciado entre `ADMIN` e `CUSTOMER`.
- **Segurança Avançada:**
  - Hashing de senhas com **Argon2** (resistente a ataques de força bruta).
  - Proteção HTTP com **Helmet**.
  - **Rate Limiting** para prevenção de ataques de negação de serviço e brute force.

---

## 🏗️ Arquitetura (Clean Architecture)

O serviço é dividido em camadas independentes para garantir que a lógica de negócio seja protegida de mudanças externas:

1.  **Domain:** Entidades (`User`) e interfaces de contrato (`IUserRepository`). É o coração do sistema, sem dependências externas.
2.  **Usecase:** Implementa os fluxos da aplicação (`LoginUsecase`, `RegisterUsecase`).
3.  **Infrastructure:** Detalhes de implementação técnica:
    *   `database`: Implementação Prisma e Repositórios.
    *   `http`: Servidor Express, Controllers, Routes e Schemas de validação.
    *   `security`: Implementação de Hashing e Segurança.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js + TypeScript
- **Web Framework:** Express 5
- **ORM:** Prisma
- **Database:** MySQL
- **Validação:** Zod
- **Autenticação:** Better-Auth
- **Testes:** Vitest & Supertest

---

## 🧪 Testes e Qualidade de Código

Este serviço orgulha-se de possuir **100% de cobertura de código** em todos os fluxos críticos.

### Comandos de Teste

| Comando | Descrição |
| :--- | :--- |
| `npm run test` | Executa todos os testes unitários e de integração uma vez. |
| `npm run test:prepare` | Prepara o banco de dados de teste (Prisma Push). |
| `npm run test:coverage` | Gera o relatório de cobertura completo (Vitest + V8). |

---

## ⚙️ Configuração e Execução

### Pré-requisitos
- Node.js v20+
- Instância de MySQL (local ou Docker)

### Instalação
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure seu arquivo `.env` (use o `.env.test` como referência para testes).
3. Gere o cliente do Prisma:
   ```bash
   npx prisma generate
   ```

### Execução em Desenvolvimento
```bash
npm run dev
```

---
*Este serviço é parte integrante do projeto EventPass.*
