# 🎟️ EventPass - Sistema de Ingressos

Projeto de back-end para uma plataforma de venda de ingressos baseada em microsserviços.

## 🚀 Stack Tecnológica Obrigatória
* **Runtime:** Node.js com TypeScript
* **Infraestrutura:** Docker e Docker Compose
* **Autenticação:** better-auth
* **Banco de Dados & ORM:** MySQL com Prisma
* **Mensageria:** Redis Pub/Sub
* **Testes:** Vitest (Unitários e de Integração)

## 🏛️ Princípios Arquiteturais Obrigatórios
* **Clean Architecture:** Separação clara entre Domínio, Casos de Uso e Infraestrutura.
* **Domain-Driven Design (DDD):** Entidades de domínio ricas e agnósticas de banco de dados.
* **Versionamento de API:** Padrão `/api/v1/...`.

---

## 🛠️ Tecnologias por Serviço

### Identity Service (Autenticação)
* **Auth:** better-auth
* **Segurança:** Argon2 (Hash de senha)
* **Banco:** MySQL + Prisma

### Catalog, Booking & Notification
* **Banco de Dados:** MySQL / Redis
* **Comunicação:** HTTP (REST) & Redis Pub/Sub

---

## 📂 Organização de Pastas

O projeto segue uma estrutura de microsserviços independente dentro de um monorepo:

```text
projeto-event-pass/
├── Identity/           # Serviço de Autenticação e Usuários
│   ├── prisma/         # Schema e Migrations do Banco
│   └── src/
│       ├── Domain/     # Entidades e Interfaces (Regras de Negócio)
│       ├── Usecase/    # Casos de Uso (Fluxos do sistema)
│       └── infrastructure/ # Implementações (Prisma, Express, Auth)
├── Catalog/            # Serviço de Gestão de Eventos
├── Booking/            # Serviço de Motor de Reservas
├── Notification/       # Serviço de Worker para E-mails
└── docker-compose.yml  # Orquestração de todos os serviços
```

## ⚙️ Como Executar (Em breve)

1. Certifique-se de ter o **Docker** instalado.
2. Clone o repositório.
3. Configure os arquivos `.env` baseados nos `.env.example`.
4. Execute `docker-compose up --build`.

---
*Projeto em desenvolvimento para fins de aprendizado.*
