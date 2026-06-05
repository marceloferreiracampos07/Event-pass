# 🎫 EventPass - Sistema de Ingressos em Microsserviços

O **EventPass** é uma plataforma robusta de venda de ingressos baseada em uma arquitetura de microsserviços, projetada para ser escalável, resiliente e fácil de manter. O projeto utiliza princípios avançados de design de software como **Clean Architecture** e **DDD (Domain-Driven Design)**.

---

## 🚀 Stack Tecnológica

- **Runtime:** Node.js (v20+) com TypeScript
- **Framework Web:** Express.js
- **ORM & Banco de Dados:** Prisma com MySQL
- **Autenticação:** Better-Auth (Credentials & Security)
- **Segurança:** Argon2 para hashing de senhas e Helmet para proteção HTTP
- **Mensageria:** Redis (Pub/Sub) para comunicação assíncrona
- **Testes:** Vitest (Unitários, Integração e Coverage)
- **Containerização:** Docker & Docker Compose

---

## 🏗️ Arquitetura e Princípios

O projeto é guiado por padrões que garantem a independência das regras de negócio em relação aos detalhes técnicos:

- **Clean Architecture:** Organizado em camadas (Domain, Usecase, Infrastructure) para garantir que a lógica de negócio não dependa de frameworks ou bancos de dados.
- **DDD (Domain-Driven Design):** Foco no domínio, utilizando Entidades ricas, Repositórios e DTOs para manter a integridade dos dados.
- **EDA (Event-Driven Architecture):** Comunicação entre microsserviços via eventos assíncronos, garantindo baixo acoplamento.
- **Versionamento:** Todas as rotas seguem o padrão \/api/v1/...\.

---

## 📦 Estrutura de Microsserviços

O repositório é um monorepo que orquestra os seguintes serviços:

### 🔐 Identity Service
Responsável pela gestão de usuários, autenticação e autorização.
- **Features:** Registro de usuários, Login (JWT/Session), Hash de senhas.
- **Cobertura de Testes:** 100% de cobertura.

### 🎭 Catalog Service
Gerencia o catálogo de eventos, categorias e disponibilidade de locais.
- **Features:** Criação de eventos, busca por ID, listagem.

### 🎟️ Booking Service
Motor de reservas que processa as compras de ingressos.

### 📧 Notification Service
Worker que processa eventos de mensageria para envio de e-mails e alertas.

---

## 🛠️ Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados.
- Node.js instalado (para desenvolvimento local).

### Passo a Passo
1. **Clonar o repositório:**
   \\\ash
   git clone https://github.com/marceloferreiracampos07/Event-pass.git
   cd Event-pass
   \\\

2. **Subir os Containers:**
   \\\ash
   docker-compose up --build
   \\\

---

## 🧪 Testes e Qualidade

O projeto preza pela alta qualidade de código e confiabilidade.

### Executar Testes (Identity Service como exemplo)
\\\ash
cd Identity
npm install
npm run test:coverage
\\\

---

## 📂 Organização de Pastas (Padrão de Serviço)

\\\	ext
src/
├── Domain/          # Regras de negócio puras (Entidades e Interfaces)
├── Usecase/         # Orquestração de fluxos (Casos de Uso e DTOs)
└── infrastructure/  # Detalhes técnicos (Express, Prisma, Security)
    ├── http/        # Controllers, Routes e Schemas
    ├── database/    # Implementação de Repositórios e Config do Prisma
    └── tests/       # Testes Unitários e de Integração
\\\

---

## 📝 Roadmap / Status
- [x] Estrutura Base e Docker Compose
- [x] Identity Service (Auth & Users) - 100% Coberto
- [x] Catalog Service (Básico)
- [ ] Implementação de Redis Pub/Sub para notificações
- [ ] Booking Service (Fluxo de reserva)
- [ ] Integração de Gatway de Pagamento (Simulado)

---
*Desenvolvido para fins de aprendizado de arquitetura escalável.*
