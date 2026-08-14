# Contrato de Refatoração Visual — Gauntlet v2

> **Documento autoritativo do Construtor.** Congelado em E1.
> **Regra de ouro:** o motor de cálculo, as fórmulas 1–28, os 18 schemas e as regras de bloqueio
> **não mudam**. A região `DADOS` do mockup é conferida byte a byte a cada ciclo, e 54 combinações
> de entrada/saída foram capturadas antes de qualquer edição — se um número mudar, o ciclo reprova.
> **Ponto de partida obrigatório:** `mockup/index.html` como está. Isto é refatoração, não reescrita.
> É **proibido não reaproveitar**.

---

## 0. O que você recebe e o que não pode ler

**Lê:** este contrato · `research/HMI_RULES.md` · `docs/design/DS_TEMA_CLARO.md` (o Design System
canônico) · `criteria/JUDGE_CRITERIA_REFACTOR.md` · `tests/TESTID_CONTRACT.md` ·
`tests/refactor.spec.ts` (os alvos) · `mockup/index.html` (o arquivo a editar).

**Não lê:** `src/**` · `gauntlet-calculadora-cnc/**` (rodada 1) · `docs/design/DASHBOARD.md`,
`UI_BRANDING.md`, `UI_DESIGN_SPEC_FINAL.md` (documentos derivados, superados) · qualquer `PRD_*` ·
`criteria/DESIGN_TOKENS.md` e `criteria/JUDGE_CRITERIA.md` (são o registro do loop de **construção**,
com a paleta FlowNC que este refactor existe para substituir — ler isso é reintroduzir o erro).

**Não edita:** nada fora de `mockup/index.html`. `tests/`, `criteria/`, `scripts/` e `research/`
são conferidos por hash a cada ciclo.

---

## 1. Design System

Aplique `docs/design/DS_TEMA_CLARO.md` na íntegra. O que mais derruba ciclo, em ordem:

1. **Neon é marca, área de trabalho é cinza, cor é estado.** Ciano `#00D9FF` só no cabeçalho, na
   identidade e no botão principal. Zona de entrada e zona de resultado em escala de cinza. A única
   cor na área de trabalho é a do semáforo.
2. **`#00D9FF` e `#39FF14` nunca como texto, ícone ou borda** — dão 1,5:1 e 1,2:1 sobre fundo claro.
   Como preenchimento com `#0F1419` por cima, dão 11:1 e 13,7:1. Para marca legível use
   `--ink-primary #005E77`.
3. **Uma rampa de estado só:** ok `#116631` · atenção `#7A4F00` · crítico `#A81E16` · info `#005E77`.
   Semáforo, gauges e barras de parâmetro usam essa e nenhuma outra.
4. **Identidade de parâmetro não usa matiz.** Vc/fz/ae/ap se distinguem por rótulo e posição.
5. **Zero rede.** Remova o `<link>` do Google Fonts; use a pilha local do DS. Ícone é SVG inline.
   Um cenário automatizado intercepta requisições e reprova qualquer uma.
6. Sem glass, sem glow, sem orbs.

Nenhum hex fora do DS. O script confere.

---

## 2. Ordem do formulário

Regra da SPEC §2/§3.3 — **categórico → geométrico → contínuo → ação** — com o contexto antes de tudo:

| # | Bloco | `data-testid` | Conteúdo |
|---|---|---|---|
| 1 | Contexto | `bloco-contexto` | perfil de máquina + fator de segurança. Recolhível, começa recolhido, lembra o valor |
| 2 | Categórico | `bloco-categorico` | família → tipo → material da peça → material da ferramenta → operação |
| 3 | Geométrico | `bloco-geometrico` | campos dimensionais do tipo selecionado |
| 4 | Ajuste fino | `bloco-ajuste-fino` | os 4 controles |
| 5 | Ação | `btn-calcular` | botão principal, 56px |

A ordem vertical é verificada por `boundingBox`.

---

## 3. Escolha segmentada

Quatro controles saem do dropdown. Pesquisa de usabilidade: dropdown custa duas ações (abrir +
escolher), botão custa um clique; o corte prático fica em 5 a 7 opções.

| Vira botão | Opções | | Continua dropdown | Por quê |
|---|---|---|---|---|
| `select-familia` | 4 | | `select-tipo-ferramenta` | 6–8, muda por família, rótulo longo |
| `select-operacao` | 3 | | `select-designacao-rosca` | 8, rótulo técnico longo |
| `select-material-ferramenta` | 4 | | `select-material-peca` | 12, bem acima do corte |
| `input-angulo-broca` | 1–3 | | | |

`input-angulo-broca` com **uma única opção** não vira seletor: mostra o valor como texto fixo e
seleciona sozinho — controle com uma opção só é ruído.

**Implementação:** rádio nativo + `<label>` estilizado. Sem JavaScript de alternância — o rádio
nativo já entrega teclado e leitor de tela de graça. O `data-testid` fica no **container**; cada
rádio carrega o `value` (ver `TESTID_CONTRACT.md`).

Estados vêm do DS §4.1. Altura mínima **44px** (ISA-101, operação com luva), grade de no máximo
4 colunas por linha.

---

## 4. Perfil de máquina editável

Quatro campos numéricos no bloco Contexto, escrevendo no objeto `MACHINE` já existente:

| Campo | `data-testid` | Padrão | Unidade |
|---|---|---|---|
| Rotação máxima | `input-maquina-rpm` | 12000 | rpm |
| Potência máxima | `input-maquina-potencia` | 15 | kW |
| Torque máximo | `input-maquina-torque` | 80 | Nm |
| Avanço máximo | `input-maquina-avanco` | 5000 | mm/min |

`checkMachineLimits` já lê esse objeto em tempo de execução — **não altere a função**, só faça os
campos escreverem nos valores. Os padrões acima são os valores atuais, e é por isso que os golden
values continuam batendo.

Por que importa: hoje todo alerta de torque e potência é calculado contra uma máquina fictícia
fixa. Numa oficina com centro de 8000 rpm e 7,5 kW, o aviso sai errado para o lado perigoso.

---

## 5. Ajuste fino — os 4 controles

Ficam **dentro do painel de configuração**, como último bloco antes de Calcular. Não é painel
separado depois do resultado.

Cada parâmetro (`vc`, `fz`, `ae`, `ap`) tem: rótulo, valor numérico editável, barra de estado,
controle deslizante e botão de ajuda. Ver `TESTID_CONTRACT.md` para os nomes.

### 5.1 Limites (portados de `src/engine/slider-bounds.ts`, sem reinventar)

| Parâmetro | Mínimo | Máximo | Passo |
|---|---|---|---|
| **Vc** | 0 | `Vc_max_do_material × 1,3` (sem material: 30–350) | 1 |
| **ae** | 0,01 | **`D`** — limite físico, `ae` nunca excede o diâmetro | `D ≤ 1` → 0,01 · `D ≤ 10` → 0,1 · senão 0,5 |
| **ap** | 0,05 | desbaste: `D ≤ 6` → `1,0·D`, senão `0,8·D` · semi: `0,5·D` · acabamento: **0,5 fixo** · e teto de **0,1** quando `L/D` passa do crítico | 0,05 |
| **fz** | `max(0,002; fz_rec × 0,4)` | `fz_rec × 2,0` | por faixa |

O recomendado de cada um é o valor que o motor já calcula hoje. **Todo controle chega no
recomendado**: quem não mexe em nada obtém exatamente o resultado atual — é isso que mantém os
golden values verdes.

### 5.2 Comportamento — o ponto que mais se erra

Mexer no controle **não recalcula**. Regra Crítica 7 do projeto: o cálculo só acontece no clique.

- ao arrastar: `valor-{p}` e `barra-estado-{p}` atualizam **na hora**;
- os resultados **não** mudam: ganham a classe `stale` e opacidade 0,6;
- o botão volta para "Calcular" com ícone de play;
- ao clicar: recalcula, tira o `stale`, e o botão mostra `check_circle` + "Atualizado" por 1,5s.

**Remova os ouvintes de `input` e `change` no `document.body` que chamam `recalc()`.** Cuidado: o
mesmo ouvinte também sincroniza o passo da rosca e marca `fieldUserEdited` — esses dois efeitos
continuam; só o `recalc()` automático sai.

### 5.3 Mapeamento por família

Nem toda família usa os quatro. Exiba apenas os que o tipo selecionado usa, reaproveitando o
`campos[]` do schema — **não crie um quinto parâmetro**:

| Família | Controles |
|---|---|
| Fresar | Vc, fz, ae, ap |
| Furar | Vc, fn (ocupa o lugar do fz) |
| Roscar | Vc, passo (travado — avanço é `P × n`, não é ajustável) |
| Mandrilar | Vc, fn, ap |

---

## 6. Ajuda contextual — padrão consagrado, não caseiro

Combinação de: **Disclosure do WAI-ARIA APG** (mecânica), **toggletip** (conteúdo sob demanda em
região viva) e a forma produtizada do **definition tooltip do IBM Carbon** / **rich tooltip do
Material 3**.

- gatilho `ⓘ` de 24px com área de toque de 44px, ao lado do rótulo — não um botão caixa-alta de
  largura total;
- `aria-expanded` no botão, `aria-controls` apontando para o painel;
- painel com `aria-live="polite"`, **não** `role="tooltip"` (tooltip é para rótulo, não para explicação);
- **abre por clique**, nunca só por hover — hover-only quebra em toque e deixa quem usa teclado de fora;
- fecha com `Esc` e com clique fora; um aberto por vez; largura máxima 280px, com seta.

### 6.1 Textos — use estes, não invente

Vêm da produção, onde já rodaram. Cada um tem quatro partes: **o que é**, **se aumentar**,
**se diminuir**, **equilíbrio**.

**Vc — Velocidade de corte (m/min)**
- Velocidade tangencial na aresta da ferramenta durante o corte.
- Aumentar: usinagem mais rápida, mas desgaste prematuro e mais calor gerado.
- Diminuir: ferramenta mais protegida, porém pode manchar o acabamento superficial.
- Equilíbrio: ajuste junto com fz — material mais duro exige Vc menor.

**fz — Avanço por dente (mm/dente)**
- Espessura do cavaco por aresta de corte em cada passagem.
- Aumentar: maior taxa de remoção, mas risco de vibração e quebra da ferramenta.
- Diminuir: acabamento mais fino e menor esforço, porém reduz a produtividade.
- Equilíbrio: mantenha fz dentro da recomendação do fabricante da ferramenta.

**ae — Engajamento radial (mm)**
- Largura radial de corte — quantos % do diâmetro da fresa está em contato.
- Aumentar: remove mais material por passada, mas aumenta pressão lateral e deflexão.
- Diminuir: menor força lateral — ideal para paredes finas ou ferramentas longas.
- Equilíbrio: ae abaixo de 50% do diâmetro aciona a compensação de afinamento de cavaco.

**ap — Profundidade axial (mm)**
- Penetração axial da ferramenta — principal fator da taxa de remoção de material.
- Aumentar: MRR sobe proporcionalmente, mas eleva potência e torque exigidos da máquina.
- Diminuir: operação mais leve — essencial quando a potência da máquina é o fator limitante.
- Equilíbrio: combine ap alto com ae baixo para desbaste eficiente.

---

## 7. Os 3 gauges

Zona 5. Arco de 180°, **41 barras**, ponteiro com base circular, valor central em mono 32px.
Em SVG/CSS puro — o mockup não usa React.

| Gauge | `data-testid` | Valor | Escala |
|---|---|---|---|
| Eficiência de Avanço | `gauge-eficiencia-avanco` | `Vf efetivo ÷ Vf recomendado × 100` | `centered` — 100% no meio; acima é sobrecarga |
| Produtividade MRR | `gauge-mrr` | `Q` já calculado | `ascending` |
| Saúde da Ferramenta | `gauge-saude` | índice de saúde já calculado | `ascending` |

Cores: **a rampa de estado do DS**, não a paleta do componente de produção. **O ponteiro é
`--tx-1`** — o ponteiro branco da produção some em fundo claro. Barra inativa: `--border-subtle`.

Eficiência de Avanço só faz sentido porque os controles de ajuste existem: é o desvio que o
operador escolheu em relação ao recomendado. Sem desvio, marca 100%.

---

## 8. Contraste entre entrada e resultado

Três níveis de superfície do DS §3.1: página `#F3F4F6` → cartão `#FFFFFF` → campo `#E9EBEF`.
O campo é a única superfície que afunda — é o que comunica "aqui eu digito".

---

## 9. Procedência de todo número

O cartão de fórmula e o badge de fonte já existem. A mudança é de grau: **todo número lido na tela
alcança a conta que o gerou** — fórmula simbólica, valores substituídos, resultado e fonte do dado.

`result.formulas` já vem pronto de cada família de cálculo; falta ligar número a número, via
`procedencia-rpm`, `procedencia-avanco`, `procedencia-potencia` e `procedencia-torque`.

É o contraponto direto aos concorrentes de caixa-preta. Número sem procedência é dedução no
critério 6 do Juiz.

---

## 10. Formulário enxuto — o que já foi cortado

Quatro campos foram removidos em E1 porque **não entram em conta nenhuma**: refrigeração interna
(broca de metal duro), sobremetal (alargador), número de arestas (escareador e alargador) e
profundidade h (broca de centro e escareador). A prova está nos golden values: com eles fora, os
54 resultados são idênticos.

**Não os traga de volta.** Eles voltam quando o motor souber usá-los — está registrado em
`docs/plans/PLAN_MOTOR_CALCULADORA_V2.md`.

Regra que passa a valer: **todo campo visível por padrão precisa mudar um número que o operador lê
na tela.** Teto de 6 campos por tipo no fluxo padrão, verificado automaticamente.

---

## 11. Como saber que terminou

`npx playwright test` com os três grupos verdes:

| Grupo | O que é | Regra |
|---|---|---|
| `gauntlet.spec.ts` | 23 cenários de regressão | **verdes em todo ciclo** — quebrar é reprovar |
| `goldens.spec.ts` | 54 combinações do motor | **verde em todo ciclo** — quebrar significa que o cálculo mudou |
| `refactor.spec.ts` | 17 alvos novos | vermelhos no começo; ficar todos verdes é o alvo do ciclo |

Suíte verde **não é aprovação** — é o mínimo para o Juiz cego ser acionado.
