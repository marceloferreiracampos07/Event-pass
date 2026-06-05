<p align="center">
  <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/128/000000/external-ticket-entertainment-flatart-icons-flat-flatarticons.png" width="100" alt="EventPass Logo" />
</p>

<h1 align="center">EventPass - Ticketing Ecosystem</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

<p align="center">
  <b>A highly scalable, event-driven ticketing platform built with Microservices, Clean Architecture, and DDD.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/marceloferreiracampos07/Event-pass?style=flat-square" />
  <img src="https://img.shields.io/badge/Coverage-100%25-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Architecture-Clean_Arch-blue?style=flat-square" />
</p>

---

## 📋 Project Summary (Latest Updates)
<details>
<summary>Click to view today's activities report</summary>

### 📊 Relatório de Atividades - EventPass

#### 1. Diagnóstico e Infraestrutura
- **Análise de Cobertura:** Identificação de lacunas em testes unitários.
- **Configuração de Testes:** Padronização do 
pm run test:coverage para medições precisas.
- **Git Hygiene:** Otimização do .gitignore para ignorar artefatos de cobertura.

#### 2. Identity Service (Finalizado)
- **Refatoração:** Clean Code, padronização de tratamento de erros e segurança.
- **Cobertura:** **100% de cobertura** (Statements, Branches, Functions, Lines).
- **Segurança:** Refatoração de Argon2 e LoginController para proteção contra vazamento de dados.

#### 3. Catalog Service (Finalizado)
- **Refatoração:** Injeção de dependência em todos os controllers e padronização do método .execute().
- **Segurança:** Implementação de helmet e ate-limit.
- **Cobertura:** **100% de cobertura** (Unit tests).
- **Correções:** Fix de *encoding* e interpolação de strings em erros.

#### 🚀 Status Final
| Serviço | Cobertura | Status |
| :--- | :--- | :--- |
| **Identity** | 100% | 🟢 Production Ready |
| **Catalog** | 100% | 🟢 Production Ready |
</details>

---

## 🛡️ SOLID Principles Applied

The EventPass ecosystem strictly follows SOLID principles to ensure long-term maintainability:

- **S - Single Responsibility Principle (SRP):** Each class, controller, and use case has one, and only one, reason to change. For example, Controllers only handle HTTP requests, while Use Cases handle business logic.
- **O - Open/Closed Principle (OCP):** The system is open for extension but closed for modification. New repository implementations can be added (e.g., changing from Prisma to another ORM) without modifying the Use Cases.
- **L - Liskov Substitution Principle (LSP):** Subtypes can be substituted for their base types (e.g., any IUserRepository implementation works seamlessly with the LoginUseCase).
- **I - Interface Segregation Principle (ISP):** Small, specific interfaces (e.g., IRepositorioEvento, IPasswordHasher) are preferred over large, monolithic ones.
- **D - Dependency Inversion Principle (DIP):** High-level modules (Use Cases) do not depend on low-level modules (Prisma/Infrastructure). Both depend on abstractions (Interfaces). **Injection of Dependency** is heavily used across all controllers and use cases.

---

## 🏗️ System Architecture
- **Clean Architecture:** Independent layers (Domain, Usecase, Infrastructure).
- **Domain-Driven Design (DDD):** Domain models are the heart of the application.
- **Event-Driven Architecture (EDA):** Asynchronous communication via Redis Pub/Sub.

---

## 🛠️ Tech Stack
| Category | Technology |
| :--- | :--- |
| **Languages** | TypeScript, Node.js |
| **Database** | MySQL, Redis |
| **ORM** | Prisma |
| **Testing** | Vitest, Supertest, V8 Coverage |

---

## 🚦 Getting Started
\\\ash
git clone https://github.com/marceloferreiracampos07/Event-pass.git
cd Event-pass
docker-compose up --build
\\\

---
<p align="center">
  Made with ❤️ for the Developer Community.
</p>
