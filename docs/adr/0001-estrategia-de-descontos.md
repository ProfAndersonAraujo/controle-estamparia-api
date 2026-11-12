
# ADR 0001 - Utilização do padrão Strategy para descontos

- **Status:** Aceito
- **Data:** 12/11/2026

## 1. Contexto

O sistema Controle de Estamparia API possui uma
funcionalidade de registro de vendas que precisa
calcular descontos de acordo com regras comerciais.

Essas regras podem mudar conforme campanhas
promocionais e estratégias de negócio.

Implementar todas as condições diretamente no caso
de uso de registro de vendas aumentaria o acoplamento
e dificultaria futuras alterações.

## 2. Decisão

Foi adotado o padrão de projeto Strategy para
encapsular as diferentes estratégias de cálculo
de descontos.

Foi criada a interface EstrategiaDesconto, que
define o método calcular().

Foram implementadas duas estratégias:

- DescontoPromocional: aplica descontos progressivos
  conforme o valor da venda.
- SemDesconto: retorna zero de desconto.

O caso de uso RegistrarVenda recebe uma estratégia
por injeção de dependência.

## 3. Justificativa

A utilização do padrão Strategy permite:

- Separar as regras de desconto da lógica de vendas.
- Facilitar a criação de novas políticas comerciais.
- Reduzir o acoplamento entre as classes.
- Facilitar os testes unitários.
- Favorecer o princípio Open/Closed do SOLID.

## 4. Consequências

### Positivas

- Novas estratégias podem ser adicionadas sem
  modificar a implementação principal de vendas.
- Cada estratégia pode ser testada isoladamente.
- O cálculo de descontos fica mais organizado.

### Negativas

- A solução adiciona interfaces e classes ao projeto.
- A configuração da estratégia precisa ser realizada
  na composição das dependências da aplicação.

## 5. Alternativas consideradas

Implementar as condições de desconto diretamente
no caso de uso RegistrarVenda.

Essa alternativa foi descartada porque concentraria
regras comerciais e regras de registro de vendas
na mesma classe, aumentando o acoplamento.