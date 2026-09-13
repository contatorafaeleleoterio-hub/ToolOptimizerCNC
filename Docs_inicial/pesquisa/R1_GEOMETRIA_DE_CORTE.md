# R1 — Geometria de Corte

**Vira o canônico:** `CANONICO_GEOMETRIA_DE_CORTE.md`
**Responde:** P1 (profundidade de corte em acabamento) e P2 (faixa de diâmetro) — **as duas perguntas que bloqueiam a Fase 2**
**Dependências:** nenhuma. Pode rodar primeiro.
**Salve o retorno como:** `RESPOSTA_R1.md`

---

═══════════════════════════════════════════════════════════════════

# MISSÃO

Você vai validar as **regras geométricas** de uma calculadora de parâmetros de corte para fresamento CNC: quanto a fresa desce (`ap`), quanto ela morde de lado (`ae`), e qual faixa de diâmetro de ferramenta o sistema deve aceitar. As regras abaixo estão implementadas hoje, algumas sem fonte. Sua tarefa é dizer o que a literatura técnica e os catálogos de fabricante sustentam — não o que parece razoável.

## Contexto do produto

- **Usuário:** operador e programador de CNC em oficina brasileira de usinagem e ferramentaria. Não é engenheiro de processos. Precisa do número pronto para digitar na máquina, em segundos.
- **Escopo:** fresamento com **fresa inteiriça de metal duro** — topo reto, toroidal e esférica.
- **Materiais:** aços carbono (1020, 1045), inox 304, alumínio 6061-T6, aços para molde (P20, 2711, 8620, H13).
- **Aplicação dominante:** usinagem de moldes e matrizes — desbaste, semi-acabamento e acabamento de cavidade.
- **Postura:** o sistema **recomenda**, o operador **decide**. Todo número é auditável — o operador abre e vê fórmula, valores substituídos e fonte. Número sem procedência é passivo.
- **Margem de erro declarada do modelo:** ±15–25%. Refinamento abaixo dessa margem é falsa precisão.

## REGRAS DE RESPOSTA — obrigatórias

1. **Não invente número para preencher lacuna.** Sem consenso, entregue a **faixa** e a dispersão entre fontes.
2. **Prefira o critério à constante.** Se o valor depende de outra grandeza, entregue **a regra que o gera** e depois um valor típico. Fórmula com variáveis vale mais que constante redonda.
3. **Cada número precisa de fonte citável** — fabricante (Sandvik Coromant, Kennametal, Iscar, Seco, Walter, Mitsubishi, OSG, Guhring), handbook (Machinery's Handbook, ASM Handbook Vol. 16, Diniz/Marcondes/Coppini — *Tecnologia da Usinagem dos Metais*), norma (ISO, DIN, ABNT) ou artigo revisado por pares. Fórum e blog entram identificados como tal.
4. **Etiquete a confiança de cada resposta:** `CONSENSO` (3+ fontes independentes) · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` (entregue a faixa e a razão da divergência) · `NÃO ENCONTRADO`.
5. **Refine antes de desistir:** busque o conceito subjacente em vez do número isolado, tente o termo em inglês, procure a origem em fabricante específico.
6. **Diga quando o valor implementado estiver errado.** O objetivo é encontrar erro, não confirmar o existente. Explique a consequência física.
7. **Distinga limite físico de recomendação.** Violar limite físico quebra ferramenta ou máquina; violar recomendação só piora o resultado. Essa distinção vira arquitetura no sistema.
8. **Quantifique a sensibilidade.** Não diga que algo "influencia" — diga **quanto**, em porcentagem sobre o resultado final. Classifique cada fator em **MODELAR** (justifica campo na tela) · **DEFAULT** (cabe num valor assumido com premissa declarada) · **IGNORAR** (menor que a margem de ±15–25% do modelo).
9. **Priorize a prática de oficina brasileira de moldes** onde houver divergência regional, mas registre a divergência.

---

# QUESTÃO 1 — Profundidade axial (`ap`) em acabamento: proporcional ao diâmetro ou fixa?

**Esta é a questão mais importante desta rodada.**

Existem três regras concorrentes implementadas ou documentadas no mesmo sistema, para o mesmo cenário:

| Regra | Origem | Em Ø10 dá |
|---|---|---|
| `ap = 0,20 × D` | padronização geométrica interna, em uso no motor de recomendação | 2,0 mm |
| `ap = 0,50 mm fixo`, independente do diâmetro | validação externa contra catálogos, justificada como "prática brasileira de moldes"; hoje é o teto do controle deslizante | 0,5 mm |
| `ap ≤ 0,30 × D` | especificação antiga, hoje sem efeito no cálculo | 3,0 mm (teto) |
| `ap = 0,15 × D` | regra específica para aços endurecidos 38–43 HRC com fresa esférica | 1,5 mm |

Para comparação, no mesmo sistema as regras de desbaste e semi-acabamento **são** proporcionais: desbaste `1,0×D` até Ø6 e `0,8×D` acima; semi-acabamento `0,5×D`.

**Responda:**

**a)** Na usinagem de acabamento com fresa inteiriça de metal duro, o `ap` recomendado **escala com o diâmetro** da ferramenta ou é aproximadamente **constante**? Qual das duas formas os catálogos de fabricante usam ao publicar dados de acabamento?

**b)** Se for constante: qual faixa? A afirmação de que "0,1 a 0,5 mm é o praticado em acabamento de molde" se sustenta em fonte?

**c)** A resposta muda por **tipo de fresa**? Especificamente:
- fresa **esférica** em acabamento 3D de superfície curva
- fresa **toroidal** em acabamento de superfície inclinada
- fresa de **topo reto** em acabamento de parede vertical

**d) A pergunta que decide o desenho do produto:** em acabamento, o `ap` é escolhido pelo **diâmetro da ferramenta** ou por **outro critério**? Os candidatos a critério real são:
- altura de crista (*scallop height*) alvo
- rugosidade `Ra` alvo
- sobremetal deixado pelo semi-acabamento
- rigidez do conjunto ferramenta + fixação
- espessura mínima de cavaco para o gume cortar em vez de esfregar

Se for outro critério, entregue **a fórmula** que liga esse critério ao `ap`, e explique por que a regra proporcional a `D` é insuficiente.

**e)** Existe **teto de segurança** para `ap` em acabamento, separado do valor recomendado? Qual, e com que justificativa física?

**f)** Em fresa esférica e toroidal, o `ap` interage com o **diâmetro efetivo de corte** — em profundidade rasa, apenas uma calota da ferramenta corta, e o diâmetro que define a velocidade real é menor que o nominal. Isso deveria entrar na escolha do `ap`, ou são decisões independentes?

**Entregue ao final:** a regra que você recomenda implementar, escrita como **fórmula com variáveis nomeadas**, o valor típico que ela produz em Ø6, Ø10 e Ø16, e as fontes.

---

# QUESTÃO 2 — Faixa de diâmetro de fresa que a calculadora deve aceitar

O sistema aceita hoje `0,1 mm a 200 mm`. As tabelas internas de velocidade e avanço cobrem só `Ø0,2 a Ø16 mm` — acima de Ø16 o sistema **repete silenciosamente** os parâmetros de Ø16. Documentos antigos falam em `0,5–30 mm` e em `até 32 mm`.

**Dado de campo do dono do produto, a validar:** na prática de oficina dele, o menor diâmetro de fresa efetivamente encontrado e usado é **Ø0,5 mm**. Abaixo disso ele não viu em uso real.

**Responda:**

**a)** Qual é a faixa de diâmetro de **fresa inteiriça de metal duro comercialmente disponível**? Cite o menor e o maior de pelo menos três fabricantes, com a linha de produto.

**b)** O piso prático de **Ø0,5 mm** se confirma para oficina de usinagem e ferramentaria convencional? Abaixo de Ø0,5 mm, que classe de ferramenta e que tipo de máquina/spindle são necessários — isto é, o que caracteriza o salto para **micro-usinagem** como disciplina separada?

**c)** Existe limite **físico ou de processo** que justifique um piso, além da disponibilidade comercial? O caso a testar: uma fresa Ø0,2 mm a `Vc` 200 m/min exigiria mais de **300.000 rpm**. Dado que spindles industriais comuns vão a 12.000–24.000 rpm, qual é o piso realista de diâmetro para uma máquina convencional — e o que acontece com o `Vc` real quando o operador usa uma fresa pequena demais para a rotação disponível?

**d)** No topo da faixa: acima de que diâmetro a fresa inteiriça deixa de existir e a solução passa a ser **cabeçote com pastilha intercambiável**? Isso deve ser um limite da calculadora ou uma mudança de tipo de ferramenta no catálogo?

**e)** As regras de parâmetro (`ap`, `ae`, `fz` proporcionais a `D`) valem em toda a faixa, ou existe intervalo fora do qual elas quebram? Especificamente, **microfresas abaixo de 1 mm** precisam de regra própria? Uma nota interna do sistema afirma: *"microfresas (<1 mm) exigem redução de AP para 0,5 D e AE máximo 30% D"* — isso se sustenta? Considere que microfresa costuma exigir substrato de grão submicron ou ultrafine, o que muda o raio de aresta obtenível e, com ele, o `fz` mínimo antes de esfregar.

**f)** Uma calculadora que **extrapola** tabelas acima do último diâmetro tabelado deve **avisar**, **recusar** ou **seguir em silêncio**? Qual é a prática das calculadoras de referência (G-Wizard, HSMAdvisor, FSWizard, calculadoras de Sandvik e Kennametal)?

**Entregue ao final:** a faixa recomendada com justificativa, e o comportamento recomendado em cada borda.

---

# QUESTÃO 3 — Multiplicadores geométricos por operação

O sistema deriva `ae` e `ap` do diâmetro por multiplicadores fixos:

| Operação | `ae` | `ap` |
|---|---|---|
| Desbaste | 45% D (aços) · 50% D (alumínio) | 1,0×D até Ø6 · 0,8×D acima |
| Semi-acabamento | 30% D | 0,5×D |
| Acabamento | 5% D (aços e inox) · 8% D (alumínio) · 3,5% D (aços endurecidos) | ver Questão 1 |

**Responda:**

**a)** Esses multiplicadores batem com o que os catálogos recomendam? Onde divergem, qual o valor correto e por quê?

**b) A questão de coerência estratégica:** desbaste com `ae = 45% D` combinado com `ap = 0,8×D` é uma estratégia coerente, ou **mistura duas escolas**?
- **Fresamento convencional:** `ae` alto (40–50% D) com `ap` moderado
- **HEM / usinagem de alta eficiência:** `ae` baixo (5–20% D) com `ap` alto (1,5–2× D), aproveitando o comprimento total do gume

As duas são válidas, mas os pares `(ae, ap)` não se misturam. Qual das duas o sistema está descrevendo, e o par atual é consistente com ela?

**c)** Se as duas escolas coexistem no mercado, uma calculadora deve **escolher uma** como padrão ou **oferecer as duas** como estratégias? Se oferecer, o que muda além de `ae` e `ap` — o `fz` e o `Vc` também mudam entre elas?

**d)** O `ae` de acabamento de 3,5% a 8% do diâmetro tem base, ou é derivado da altura de crista alvo? Se for derivado, entregue a fórmula que liga `ae` à altura de crista em fresa esférica e toroidal.

**Entregue ao final:** a tabela de multiplicadores recomendada, com a estratégia declarada e a fonte de cada linha.

---

# FORMATO DA ENTREGA

Para cada questão, entregue nesta estrutura:

```
## [número] [título]

**Veredito:** [uma frase — o que vale]
**Confiança:** CONSENSO | REFERÊNCIA ÚNICA | SEM CONSENSO | NÃO ENCONTRADO

**O que as fontes dizem**
[tabela ou lista com os valores e a procedência de cada um]

**Regra recomendada para implementar**
[fórmula com variáveis nomeadas, ou constante com condição de validade declarada]

**Se o valor atual do sistema estiver errado**
[o que muda no resultado, com número]

**Fontes**
[link, autor/fabricante, ano]
```

Ao final de tudo, duas tabelas de fechamento:

**Tabela A — Placar**

| Item | Valor atual | Veredito | Valor recomendado | Confiança |
|---|---|---|---|---|

**Tabela B — O que continua sem base**

| Item | O que faltou | O que seria preciso para fechar (ensaio, catálogo específico, norma paga) |
|---|---|---|

Lacuna declarada é resultado útil. Número inventado é passivo.

═══════════════════════════════════════════════════════════════════

---

## Rastreabilidade

| Questão | Origem no dossiê auditado |
|---|---|
| 1 | **P1** — §10.13 |
| 2 | **P2** — §10.9 |
| 3 | §1.3.3, §10.13 e §5.10 |

## O que este retorno alimenta

- `CANONICO_GEOMETRIA_DE_CORTE.md` — todas as três questões
- Cruza com **R4** (a espessura de cavaco limita o `ap` de acabamento pelo lado do `fz`)
- Cruza com **R3** (microfresa exige substrato de grão fino)
