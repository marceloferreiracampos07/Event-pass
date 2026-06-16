<h1 align="center">EventPass - Ticketing Ecosystem</h1>

<p align="center">
  <b>A highly scalable, event-driven ticketing platform built with Microservices, Clean Architecture, and DDD.</b>
</p>

---

## Tabela de Conteúdo
- [Sobre o Projeto](#sobre-o-projeto)
- [Arquitetura](#arquitetura-do-sistema)
- [Execução](#execução-da-aplicação)
- [Testes e Qualidade](#testes-e-qualidade)
- [Resumo dos Serviços](#resumo-dos-serviços)

---

## Sobre o Projeto
EventPass é uma solução para gerenciamento de eventos de alto tráfego. Utiliza arquitetura distribuída e orientada a eventos para garantir consistência e escalabilidade.

---

## Arquitetura do Sistema
O sistema segue os princípios de Clean Architecture e Domain-Driven Design (DDD), garantindo a separação entre regras de negócio e detalhes de infraestrutura.

---

## Execução da Aplicação

Siga os passos abaixo para rodar o ecossistema completo:

1. **Pré-requisitos:**
   - Docker & Docker Compose
   - Node.js 20+

2. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/marceloferreiracampos07/Event-pass.git
   cd Event-pass
   ```

3. **Subir os Serviços:**
   Na raiz do projeto, execute o comando para construir e iniciar todos os microserviços e bancos de dados:
   ```bash
   docker-compose up --build
   ```

---

## Testes e Qualidade

Para executar os testes unitários e de integração com relatório de cobertura, execute os seguintes comandos na raiz do projeto:

- **Serviço de Reservas (Booking):**
  ```bash
  npm run test:coverage --prefix Booking
  ```
- **Serviço de Notificação (Notification):**
  ```bash
  npm run test:coverage --prefix Notification
  ```

---

## Resumo dos Serviços

| Serviço | Status |
| :--- | :--- |
| **Identity** | Produção |
| **Catalog** | Produção |
| **Booking** | Produção |
| **Notification** | Produção |

---
<p align="center">
  Desenvolvido para a Comunidade de Desenvolvedores.
</p>
