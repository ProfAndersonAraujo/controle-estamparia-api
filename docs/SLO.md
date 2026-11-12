
# SLO - Controle de Estamparia API

## 1. Objetivo

Definir os objetivos de nível de serviço (SLO) da API
de controle de estoque e vendas de uma estamparia.

## 2. Disponibilidade

Meta: pelo menos 99% das requisições devem ser
concluídas sem erros HTTP 5xx, considerando uma
janela de 30 dias.

Indicador:
- http_requisicoes_total

## 3. Desempenho

Meta: o percentil 95 (p95) do tempo de resposta
deve ser inferior ou igual a 300 milissegundos,
considerando uma janela de 30 dias.

Indicador:
- http_duracao_requisicoes_segundos

## 4. Monitoramento

As métricas são disponibilizadas pelo endpoint:

GET /metrics

O formato de exposição é compatível com Prometheus.

## 5. Observações

As metas representam objetivos operacionais do sistema.

Para acompanhar o cumprimento ao longo do tempo,
é necessário coletar e armazenar as métricas
periodicamente em uma ferramenta de monitoramento.

Atualmente, a aplicação disponibiliza as métricas,
mas ainda não possui armazenamento histórico
ou sistema de alertas configurado.