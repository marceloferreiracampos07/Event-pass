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
  <img src="https://img.shields.io/github/issues/marceloferreiracampos07/Event-pass?style=flat-square" />
  <img src="https://img.shields.io/badge/Coverage-100%25-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Architecture-Clean_Arch-blue?style=flat-square" />
</p>

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Testing & Quality](#-testing--quality)
- [Microservices Overview](#-microservices-overview)

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

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Languages** | TypeScript, Node.js |
| **Database** | MySQL (Relational), Redis (Cache/Messaging) |
| **ORM** | Prisma |
| **Security** | Argon2, Helmet, Express-Rate-Limit |
| **Testing** | Vitest, Supertest, V8 Coverage |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

---

## 🚦 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (Optional, for local dev)

### Quick Start
\\\ash
# 1. Clone the repo
git clone https://github.com/marceloferreiracampos07/Event-pass.git

# 2. Start the entire ecosystem
docker-compose up --build
\\\

---

## 🧪 Testing & Quality

Quality is a non-negotiable pillar of this project.

- **Unit Testing:** Validating business rules in isolation.
- **Integration Testing:** Ensuring database and HTTP layers work together.
- **Coverage:** We aim for 100% in critical services.

\\\ash
# Run tests with detailed coverage report
cd Identity
npm run test:coverage
\\\

---

## 📂 Microservices Overview

- **Identity Service:** Auth, Users, Roles. (Status: 🟢 Production Ready)
- **Catalog Service:** Events, Categories, Search. (Status: 🟡 In Progress)
- **Booking Service:** Orders, Payments, Inventory. (Status: 🔴 Planned)
- **Notification Service:** Email worker. (Status: 🔴 Planned)

---
<p align="center">
  Made with ❤️ for the Developer Community.
</p>
