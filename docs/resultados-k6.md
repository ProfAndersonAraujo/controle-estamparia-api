# Resultados do Teste de Desempenho — k6

## 1. Identificação

* **Projeto:** Controle de Estamparia API
* **Ferramenta:** Grafana k6
* **Data da execução:** 13/11/2026
* **Ambiente:** API local executada no Windows, acessada pelo container Docker do k6.
* **Endpoint testado:** GET /health

## 2. Configuração do teste

* Usuários virtuais: 1
* Duração: 15 segundos
* Intervalo entre iterações: 1 segundo
* Total de requisições: 15
* Total de verificações: 30

## 3. Resultados obtidos

| Indicador          |    Resultado |
| ------------------ | -----------: |
| Tempo médio        |      2,50 ms |
| Tempo mínimo       |      1,51 ms |
| Tempo máximo       |      9,06 ms |
| Mediana            |      1,92 ms |
| Percentil 90 (p90) |      3,09 ms |
| Percentil 95 (p95) |      5,21 ms |
| Taxa de falhas     |        0,00% |
| Checks aprovados   | 100% (30/30) |

## 4. Verificação dos critérios

| Critério       |              Meta | Resultado | Situação |
| -------------- | ----------------: | --------: | -------- |
| Latência p95   | Inferior a 300 ms |   5,21 ms | Aprovado |
| Taxa de falhas |     Inferior a 1% |     0,00% | Aprovado |
| Status HTTP    |               200 |       200 | Aprovado |

## 5. Conclusão

O teste de fumaça foi executado com sucesso.

O endpoint `/health` respondeu corretamente durante os 15 segundos de execução, com 100% dos checks aprovados e nenhuma requisição com falha.

A latência p95 registrada foi de 5,21 ms, ficando abaixo da meta de 300 ms estabelecida no documento SLO.

Os resultados demonstram que a API atende aos critérios definidos para este teste básico de desempenho.

## 6. Limitações

O teste foi realizado com apenas um usuário virtual, durante 15 segundos, utilizando exclusivamente o endpoint `/health`.

Portanto, os resultados não representam um teste de estresse nem permitem afirmar a capacidade máxima de usuários simultâneos ou o desempenho das operações de cadastro, estoque e vendas.

Testes adicionais com maior concorrência e endpoints de negócio poderão ser realizados em etapas futuras.
