# 🎟️ Desafio Técnico: Plataforma EventPass

**Objetivo:** Construir o back-end de uma plataforma simplificada de venda de ingressos para eventos, aplicando conceitos de Clean Architecture, Domain-Driven Design (DDD), microsserviços e Event-Driven Architecture (EDA). A orquestração da infraestrutura e dos serviços deverá ser feita inteiramente via containers.

## 1. Escopo e Arquitetura

O sistema deve permitir que organizadores criem eventos e que clientes comprem ingressos. Para evitar concorrência e acoplamento direto, a comunicação entre o ato da reserva e a notificação do cliente deve ser assíncrona, utilizando mensageria.

Todos os serviços, banco de dados e o broker de mensageria devem rodar em um ambiente conteinerizado, simulando uma infraestrutura real de microsserviços.

**Stack Tecnológica Obrigatória:**
* Node.js com TypeScript
* **Infraestrutura:** Docker e Docker Compose
* **Autenticação:** better-auth
* **Banco de Dados & ORM:** Livre escolha (Prisma, TypeORM, Drizzle, etc.)
* **Mensageria:** Redis Pub/Sub
* **Testes:** Jest ou Vitest (Unitários e de Integração)

**Princípios Arquiteturais Obrigatórios:**
* Clean Architecture (separação clara entre Domínio, Casos de Uso e Infraestrutura).
* Domain-Driven Design (Entidades de domínio ricas e agnósticas de banco de dados).
* Versionamento de API (ex: /api/v1/...).

## 2. Microsserviços e Funcionalidades

O ecossistema será composto por quatro serviços independentes. Cada serviço deve ter seu próprio contexto, dependências e seu próprio Dockerfile. Eles não devem compartilhar código diretamente; qualquer comunicação deve ser feita via rede (HTTP para APIs, Redis Pub/Sub para eventos assíncronos).

### Identity Service (Autenticação e Usuários)
* **Responsabilidade:** Gerenciar o cadastro e a autenticação, integrando o better-auth para controle de sessão.
* **Regras de Negócio:** Suportar duas roles: ADMIN (pode criar eventos) e CUSTOMER (pode comprar ingressos).
* **Endpoints (API v1):**
  * POST `/api/v1/auth/register`: Cria um novo usuário.
  * POST `/api/v1/auth/login`: Autentica o usuário e retorna o token/cookie.

### Catalog Service (Gestão de Eventos)
* **Responsabilidade:** CRUD de eventos e controle do estoque total de ingressos.
* **Regras de Negócio:** Um evento não pode ser criado com data no passado. Apenas usuários ADMIN podem criar eventos.
* **Endpoints (API v1):**
  * POST `/api/v1/events`: Cria um evento (Requer autenticação de Admin).
  * GET `/api/v1/events`: Lista todos os eventos disponíveis (Público).
  * GET `/api/v1/events/:id`: Detalha um evento específico.

### Booking Service (Motor de Reservas)
* **Responsabilidade:** Receber a intenção de compra do usuário e orquestrar a reserva.
* **Regras de Negócio:** O serviço deve verificar se há ingressos disponíveis no evento. Se houver, cria a reserva no banco com status PENDING e publica uma mensagem no Redis.
* **Endpoints (API v1):**
  * POST `/api/v1/bookings`: Recebe o ID do evento e cria a intenção de reserva (Requer autenticação de Customer).
* **Eventos Publicados:**
  * Canal `bookings`: Mensagem `ReservationProcessed` (contendo o ID da reserva, ID do usuário e status final CONFIRMED ou REJECTED).

### Notification Service (Worker Assíncrono)
* **Responsabilidade:** Escutar os eventos do motor de reservas e simular o envio de comunicação ao cliente.
* **Regras de Negócio:** Este serviço não possui rotas HTTP. Ele deve apenas assinar o canal `bookings` no Redis.
* **Ação Esperada:**
  * Ao receber um evento CONFIRMED: Logar no console "Enviando e-mail para o usuário X: Seu ingresso para o evento Y foi confirmado!".
  * Ao receber um evento REJECTED: Logar no console "Enviando e-mail para o usuário X: Infelizmente os ingressos esgotaram.".

## 3. Critérios de Aceite e Entregáveis (Output Esperado)

O projeto será avaliado tanto pela qualidade do código quanto pela facilidade de execução do ambiente. Os seguintes itens devem ser entregues:

**Estrutura e Execução via Docker (Critério Crítico):**
* Cada um dos quatro serviços deve possuir seu próprio Dockerfile.
* O projeto deve conter um arquivo `docker-compose.yml` central. A execução do comando `docker-compose up` deve ser capaz de subir **toda** a infraestrutura necessária (Banco de Dados, Redis e os 4 serviços Node.js) conectada corretamente em uma rede virtual do Docker.

**Código Fonte e Arquitetura:**
* Serviços isolados em suas próprias pastas ou repositórios, aplicando Clean Architecture (Entities, Use Cases, Repositories, Controllers).
* Entidades de Domínio devem ser puramente TypeScript, sem acoplamento ou anotações do ORM escolhido.

**Testes Automatizados:**
* **Testes Unitários:** Focados nas regras de negócio e Casos de Uso (ex: testar se a reserva falha quando não há ingressos), fazendo mock do banco e do Redis.
* **Testes de Integração:** Testar rotas importantes levantando a aplicação e verificando os outputs.

**Documentação:**
* Arquivo README.md detalhando a arquitetura escolhida, decisões técnicas e as instruções claras de como rodar as migrações do banco e levantar o ambiente via Docker Compose.
* Uma collection exportada (Postman, Insomnia ou arquivo .http) contendo todas as chamadas HTTP configuradas para facilitar a validação das APIs.
