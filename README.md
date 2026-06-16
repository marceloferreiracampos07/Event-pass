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

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [SOLID Principles](#-solid-principles-applied)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Testing & Quality](#-testing--quality)
- [Microservices Overview](#-microservices-overview)
- [Project Summary](#-project-summary-latest-updates)

---

## 🌟 About the Project
EventPass is a modern solution for high-traffic event management. It tackles complex problems like race conditions in ticket sales, high availability of catalog data, and reliable asynchronous notifications using a distributed system approach.

---

## ✨ Key Features

- 🔐 **Identity Management:** Secure authentication using Argon2 and Better-Auth.
- 🎟️ **Real-time Catalog:** High-performance event listing and categorization.
- 💳 **Resilient Bookings:** Distributed transactions and inventory control.
- 📧 **Event-Driven Notifications:** Asynchronous delivery via Redis Pub/Sub.
- 🐳 **Full Orchestration:** Single-command setup with Docker Compose.

---

## 🏗️ System Architecture

### 💎 Clean Architecture
The codebase is structured to be **framework-independent**. The business logic (Entities & Use Cases) is isolated from external tools like Express or Prisma.

### 🧩 Domain-Driven Design (DDD)
- **Rich Domain Models:** Business rules live inside the entities.
- **Repository Pattern:** Abstracting data access for flexibility.
- **DTOs:** Clear data contracts between layers.

### 📡 Event-Driven Communication
Services communicate asynchronously via **Redis Pub/Sub**, ensuring that a failure in one service (like Notifications) doesn't crash the entire checkout flow.

---

## 🛡️ SOLID Principles Applied

The EventPass ecosystem strictly follows SOLID principles to ensure long-term maintainability:

- **S - Single Responsibility Principle (SRP):** Each class, controller, and use case has one, and only one, reason to change.
- **O - Open/Closed Principle (OCP):** The system is open for extension but closed for modification.
- **L - Liskov Substitution Principle (LSP):** Subtypes can be substituted for their base types seamlessly.
- **I - Interface Segregation Principle (ISP):** Small, specific interfaces are preferred over large, monolithic ones.
- **D - Dependency Inversion Principle (DIP):** High-level modules do not depend on low-level modules. Injection of Dependency is heavily used.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Languages** | TypeScript, Node.js |
| **Database** | MySQL, Redis |
| **ORM** | Prisma |
| **Security** | Argon2, Helmet, Express-Rate-Limit |
| **Testing** | Vitest, Supertest, V8 Coverage |
| **DevOps** | Docker, Docker Compose |

---

## 🚦 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+

### Quick Start
```bash
git clone https://github.com/marceloferreiracampos07/Event-pass.git
cd Event-pass
docker-compose up --build
```

---

## 🧪 Testing & Quality

- **Coverage:** High coverage across all services.
```bash
# Example for Booking service
npm run test:coverage --prefix Booking
```

---

## 📂 Microservices Overview

- **Identity Service:** Auth, Users, Roles. (Status: 🟢 Production Ready)
- **Catalog Service:** Events, Categories, Search. (Status: 🟢 Production Ready)
- **Booking Service:** Orders, Payments, Inventory. (Status: 🟢 Production Ready)
- **Notification Service:** Async event worker. (Status: 🟢 Production Ready)

---

## 📋 Project Summary (Latest Updates)

### 📊 Relatório de Atividades - EventPass

#### 1. Notification Service (Finalizado)
- Implementação de worker assíncrono via Redis.
- Estrutura de Clean Architecture e testes com 100% de cobertura.

#### 2. Booking Service (Auditoria e Refatoração Finalizadas)
- Padronização de pastas e arquivos para o Português.
- Centralização de configurações e correção de bugs de importação e Mocks.
- Suíte de testes validada.

#### 🚀 Status Final
| Serviço | Status |
| :--- | :--- |
| **Identity** | 🟢 Production Ready |
| **Catalog** | 🟢 Production Ready |
| **Booking** | 🟢 Production Ready |
| **Notification** | 🟢 Production Ready |

---
<p align="center">
  Made with ❤️ for the Developer Community.
</p>
