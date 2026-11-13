# Controle de Estamparia API

API REST para gerenciamento de produtos, estoque e vendas de uma empresa de estamparia e personalizados.

O projeto foi desenvolvido com foco em boas práticas de Engenharia de Software, princípios SOLID, padrões de projeto, testes automatizados, integração contínua e observabilidade.

## Objetivos

* Cadastrar e consultar produtos.
* Controlar entradas e saídas de estoque.
* Registrar vendas.
* Calcular descontos comerciais automaticamente.
* Consultar vendas realizadas.
* Monitorar requisições e desempenho da API.

## Tecnologias utilizadas

| Tecnologia     | Finalidade                |
| -------------- | ------------------------- |
| Node.js        | Ambiente de execução      |
| TypeScript     | Linguagem de programação  |
| Express        | Construção da API REST    |
| PostgreSQL     | Banco de dados            |
| Prisma ORM     | Acesso ao banco de dados  |
| Docker Compose | Orquestração dos serviços |
| Vitest         | Testes automatizados      |
| Supertest      | Testes de integração      |
| ESLint         | Análise estática          |
| GitHub Actions | Integração contínua       |
| Pino           | Logs estruturados         |
| prom-client    | Métricas                  |
| Spectral       | Validação OpenAPI         |
| k6             | Testes de desempenho      |

## Arquitetura

O projeto utiliza uma arquitetura em camadas, separando domínio, aplicação, infraestrutura e apresentação.

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
├── SLO.md
├── openapi.yaml
└── resultados-k6.md

load-tests/
└── smoke.js
```

### Princípios e padrões

* **SOLID:** organização das responsabilidades, interfaces e dependências.
* **Strategy:** encapsulamento das estratégias de cálculo de descontos.
* **Repository:** abstração do acesso e persistência dos dados.

## Requisitos

* Docker Desktop instalado e em execução.
* Git para clonar o repositório.

## Executando com Docker Compose

Clone o repositório:

```bash
git clone https://github.com/ProfAndersonAraujo/controle-estamparia-api.git
```

Entre na pasta:

```bash
cd controle-estamparia-api
```

Configure as variáveis de ambiente conforme o arquivo `.env.example`, quando necessário.

Construa as imagens e inicie a aplicação:

```bash
docker compose up --build -d
```

Esse comando inicia automaticamente:

* PostgreSQL.
* API REST.
* Migrations do Prisma.

A API estará disponível em:

http://localhost:3000

Verifique a disponibilidade:

```text
GET /health
```

Consulte os logs:

```bash
docker compose logs -f api
```

Verifique os containers:

```bash
docker compose ps
```

Para encerrar os serviços:

```bash
docker compose down
```

Para encerrar os serviços e remover também o volume do banco de dados:

```bash
docker compose down -v
```

**Atenção:** o último comando apaga os dados persistidos no volume do PostgreSQL.

## Executando em desenvolvimento local

Para desenvolvimento fora dos containers, instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` conforme o `.env.example`.

Inicie o banco de dados:

```bash
docker compose up -d db
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Execute as migrations:

```bash
npx prisma migrate deploy
```

Inicie a aplicação:

```bash
npm run dev
```

## Endpoints

### Produtos

| Método | Endpoint                | Descrição             |
| ------ | ----------------------- | --------------------- |
| POST   | `/produtos`             | Cadastrar produto     |
| GET    | `/produtos`             | Listar produtos       |
| GET    | `/produtos/:id`         | Buscar produto por ID |
| PATCH  | `/produtos/:id/estoque` | Movimentar estoque    |

### Vendas

| Método | Endpoint      | Descrição              |
| ------ | ------------- | ---------------------- |
| POST   | `/vendas`     | Registrar venda        |
| GET    | `/vendas`     | Listar vendas          |
| GET    | `/vendas/:id` | Consultar venda por ID |

### Exemplo de cadastro de produto

```http
POST /produtos
Content-Type: application/json
```

```json
{
  "nome": "Caneca personalizada",
  "descricao": "Caneca de cerâmica personalizada",
  "precoCentavos": 2990,
  "quantidadeEstoque": 50
}
```

Os valores monetários são armazenados em centavos para evitar problemas de precisão.

## Estratégias de desconto

O sistema utiliza o padrão Strategy para permitir diferentes políticas comerciais.

A estratégia promocional implementada aplica:

* 5% de desconto para vendas a partir de R$ 200,00.
* 10% de desconto para vendas a partir de R$ 500,00.
* Sem desconto para vendas abaixo de R$ 200,00.

Também existe a estratégia `SemDesconto`.

## Testes automatizados

Execute os testes:

```bash
npm test
```

Execute em modo de observação:

```bash
npm run test:watch
```

Gere o relatório de cobertura:

```bash
npm run coverage
```

A cobertura mínima configurada é de 80% para:

* Statements.
* Branches.
* Functions.
* Lines.

**Escopo:** a cobertura mínima está configurada para os arquivos do domínio (`src/domain/**/*.ts`).

## Qualidade do código

```bash
npm run lint
```

```bash
npm run build
```

Validação da documentação OpenAPI:

```bash
npm run lint:openapi
```

## Integração contínua

O GitHub Actions executa automaticamente:

1. Instalação das dependências.
2. Geração do Prisma Client.
3. Preparação do PostgreSQL.
4. Execução do ESLint.
5. Testes automatizados.
6. Verificação da cobertura.
7. Compilação TypeScript.

O workflow é executado em atualizações da branch `main` e em pull requests direcionados a ela.

## Observabilidade

### Logs estruturados

A aplicação utiliza Pino e pino-http para registrar requisições HTTP em formato JSON.

### Métricas

Endpoint:

```text
GET /metrics
```

Principais métricas:

* `http_requisicoes_total`: quantidade de requisições.
* `http_duracao_requisicoes_segundos`: duração das requisições.

### SLO

Metas operacionais:

* Disponibilidade mínima: 99%.
* Latência p95: até 300 ms.

As métricas são disponibilizadas pela aplicação. O armazenamento histórico e os alertas dependem de uma ferramenta de monitoramento adicional.

Consulte `docs/SLO.md`.

## Testes de desempenho

O projeto utiliza Grafana k6 para testes de desempenho.

O smoke test está localizado em:

```text
load-tests/smoke.js
```

Para executar pelo Docker:

```powershell
docker run --rm -v "${PWD}/load-tests:/scripts" -e BASE_URL=http://host.docker.internal:3000 grafana/k6 run /scripts/smoke.js
```

Os resultados da execução estão documentados em `docs/resultados-k6.md`.

## Documentação arquitetural

As decisões arquiteturais estão registradas em `docs/adr/`.

A especificação da API está em `docs/openapi.yaml`.

## Segurança

* Credenciais locais são armazenadas em variáveis de ambiente.
* O arquivo `.env` não deve ser versionado.
* O `.env.example` apresenta as variáveis necessárias sem expor credenciais reais.

## Autor

Projeto desenvolvido para aplicação prática de conceitos de Engenharia de Software, desenvolvimento de APIs REST, arquitetura de software, testes e observabilidade.
