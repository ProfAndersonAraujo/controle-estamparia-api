# Controle de Estamparia API

API REST para gerenciamento de produtos, estoque e vendas de uma empresa de estamparia e personalizados.

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento, arquitetura organizada, princípios SOLID, padrões de projeto, testes automatizados, integração contínua e observabilidade.

## Objetivos do projeto

* Cadastrar e consultar produtos.
* Controlar entradas e saídas de estoque.
* Registrar vendas de produtos.
* Calcular automaticamente descontos comerciais.
* Consultar vendas realizadas.
* Monitorar requisições e desempenho da API.

## Tecnologias utilizadas

| Tecnologia     | Finalidade                   |
| -------------- | ---------------------------- |
| Node.js        | Ambiente de execução         |
| TypeScript     | Linguagem de programação     |
| Express        | Construção da API REST       |
| PostgreSQL     | Banco de dados relacional    |
| Prisma ORM     | Mapeamento e acesso ao banco |
| Docker         | Gerenciamento de ambientes   |
| Vitest         | Testes automatizados         |
| Supertest      | Testes de integração HTTP    |
| ESLint         | Análise estática do código   |
| GitHub Actions | Integração contínua          |
| Pino           | Logs estruturados            |
| prom-client    | Exposição de métricas        |
| k6             | Testes de desempenho         |

## Arquitetura do projeto

O projeto utiliza uma organização em camadas, separando as regras de negócio, os casos de uso, a infraestrutura e a apresentação.

```text
src/
├── domain/
│   ├── entities/
│   └── interfaces/
├── application/
│   └── use-cases/
├── infrastructure/
│   ├── database/
│   └── repositories/
├── presentation/
│   ├── controllers/
│   └── routes/
├── config/
├── app.ts
└── server.ts

tests/
├── unit/
└── integration/

docs/
├── adr/
└── SLO.md

load-tests/
```

### Princípios e padrões adotados

* **SOLID:** separação de responsabilidades, abstração por interfaces e inversão de dependências.
* **Strategy:** utilizado para encapsular as estratégias de cálculo de descontos.
* **Repository:** utilizado para abstrair o acesso aos dados e separar a persistência das regras de negócio.

## Requisitos para execução

* Node.js 22 ou superior.
* npm.
* Docker e Docker Compose.
* PostgreSQL (disponibilizado pelo Docker Compose).

## Configuração do ambiente

Clone o repositório:

```bash
git clone https://github.com/ProfAndersonAraujo/controle-estamparia-api.git
```

Entre na pasta:

```bash
cd controle-estamparia-api
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

No PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure a conexão com o banco de dados no `.env`:

```env
PORT=3000
NODE_ENV=deve
```
