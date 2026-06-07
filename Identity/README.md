# 🔐 Identity Service - EventPass

O **Identity Service** é o núcleo de autenticação e gestão de usuários do ecossistema **EventPass**. Construído seguindo rigorosamente os princípios de **Clean Architecture** e **DDD (Domain-Driven Design)**, este serviço garante segurança, escalabilidade e manutenibilidade.

---

## 🚀 Funcionalidades Principais

- **Registro de Usuários:** Cadastro robusto com validação via Zod e persistência segura.
- **Autenticação Segura:** Login com verificação de credenciais e integração com sessões.
- **Gestão de Roles:** Sistema de permissões diferenciado entre `ADMIN` e `CUSTOMER`.
- **Segurança Avançada:**
  - Hashing de senhas com **Argon2**.
  - Proteção HTTP com **Helmet**.
  - **Rate Limiting** para prevenção de ataques.
- **Tratamento de Erros Centralizado:** Handler de exceções global para Express 5, garantindo respostas padronizadas e controllers limpos (sem try/catch).

---

## 🏗️ Arquitetura (Clean Architecture)

O serviço é dividido em camadas independentes para garantir que a lógica de negócio seja protegida de mudanças externas:

1.  **Domain:** Entidades (`User`, `Evento`) e interfaces de contrato (`IRepository`).
2.  **Usecase:** Implementa os fluxos da aplicação (`LoginUsecase`, `RegisterUsecase`, `CriarEventoUseCase`).
3.  **Infrastructure:** Detalhes de implementação técnica:
    *   `database`: Implementação Prisma e Repositórios.
    *   `http`: Servidor Express 5, Controllers limpos, Rotas e Middlewares (incluindo `errorHandler`).

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js + TypeScript
- **Web Framework:** Express 5 (Async nativo)
- **ORM:** Prisma
- **Database:** MySQL
- **Validação:** Zod
- **Testes:** Vitest & Supertest (com Docker isolado)

---

## 🧪 Testes e Qualidade de Código

### Ambiente de Testes Docker
Utilizamos containers Docker isolados para testes de integração, garantindo que o banco de dados de desenvolvimento não seja alterado.
- Configure o `.env.test` com as credenciais do container.
- Utilize o comando `npm run test:integration` para rodar os testes em ambiente isolado.

### Comandos de Teste

| Comando | Descrição |
| :--- | :--- |
| `npm run test` | Executa todos os testes unitários. |
| `npm run test:integration` | Executa testes de integração com Docker isolado. |

---

## ⚙️ Configuração e Execução

### Pré-requisitos
- Node.js v20+
- Docker (para testes de integração)

### Instalação
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure seu arquivo `.env` (Use o `.env.test` como base).
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
