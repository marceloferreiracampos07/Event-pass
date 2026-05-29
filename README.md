# 🎟️ EventPass - Sistema de Ingressos

Projeto de back-end para uma plataforma de venda de ingressos baseada em microsserviços.

## 🛠️ Tecnologias Utilizadas

### Geral
* **Linguagem:** Node.js com TypeScript
* **Runtime:** Node.js 20+
* **Containerização:** Docker & Docker Compose
* **Mensageria:** Redis (Pub/Sub)

### Identity Service (Autenticação)
* **Auth:** better-auth
* **Banco de Dados:** MySQL
* **ORM:** Prisma
* **Segurança:** Argon2 (Hash de senha)

### Catalog, Booking & Notification
* **Banco de Dados:** MySQL / Redis
* **Comunicação:** HTTP (REST) & Redis Pub/Sub

---

## 📂 Organização de Pastas

O projeto segue uma estrutura de microsserviços dentro de um único repositório, onde cada serviço é independente:

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

## 🚀 Como Executar (Em breve)

1. Certifique-se de ter o **Docker** instalado.
2. Clone o repositório.
3. Configure os arquivos `.env` baseados nos `.env.example`.
4. Execute `docker-compose up --build`.

---
*Projeto em desenvolvimento para fins de aprendizado.*
