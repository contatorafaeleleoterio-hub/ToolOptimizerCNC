# Contrato de Refatoração Visual — Gauntlet v2

> **Documento autoritativo do Construtor.** Congelado em E1, revisado em 14/08/2026 pelo
> Orquestrador para incorporar o que a execução de ensaio mediu, e **revisado em 15/08/2026** para
> absorver as 5 decisões do Mestre (recálculo híbrido · slider de agressividade · laranja é marca e
> índigo é seleção · material da ferramenta sai da tela · regra do revestimento). Congelado de novo
> depois disso.
> **Regra de ouro:** o motor de cálculo, as fórmulas 1–28, as **17 geometrias** e as regras de
> bloqueio **não mudam**. O catálogo passou a ter **33 entradas** (uma por variação de substrato),
> mas nenhuma conta foi tocada: combinação equivalente dá exatamente o mesmo número.
> A região `DADOS` do mockup é conferida byte a byte a cada ciclo e as combinações de entrada/saída
> foram recapturadas pelo Orquestrador — se um número mudar, o ciclo reprova.
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
são conferidos por hash a cada ciclo — alterar qualquer um derruba o ciclo na primeira etapa da
validação, antes de qualquer nota.

**Roda quantas vezes quiser** (ler e executar é permitido, editar não):

```
npx playwright test                 44 cenários
node scripts/check-tokens.mjs       paleta contra o Design System
node scripts/freeze.mjs             confere que você não saiu do lugar certo
```

---

## 1. Design System

Aplique `docs/design/DS_TEMA_CLARO.md` na íntegra. O que mais derruba ciclo, em ordem:

1. **Marca é laranja, seleção é índigo, área de trabalho é cinza, cor é estado.**
   `#E85D04` (marca) só no cabeçalho, na identidade e no preenchimento do botão Calcular.
   `#3730A3` (seleção/foco) só no controle escolhido e no anel de foco. Zona de entrada e zona de
   resultado em escala de cinza. A única cor na área de trabalho é a do semáforo.
2. **Laranja nunca marca estado.** Elemento laranja fora de marca ou ação principal é defeito —
   é o erro que a paleta FlowNC cometia e que este refactor existe para desfazer.
3. **Texto sobre a marca é escuro.** `#0F1419` sobre `#E85D04` dá **5,29:1**; branco sobre o mesmo
   laranja dá **3,50:1** e reprova. A letra do botão Calcular é escura.
4. **`#00D9FF` e `#39FF14` não têm papel no tema claro** — dão 1,5:1 e 1,2:1 sobre fundo claro e a
   marca passou para o laranja. Para marca legível em texto, ícone ou borda use `--ink-primary
   #005E77`.
5. **Uma rampa de estado só:** ok `#116631` · atenção `#7A4F00` · crítico `#A81E16` · info `#005E77`.
   Semáforo, gauges e barras de parâmetro usam essa e nenhuma outra. Índigo **não** entra nela:
   seleção não é condição de processo.
6. **Identidade de parâmetro não usa matiz.** Vc/fz/ae/ap se distinguem por rótulo e posição.
7. **Zero rede.** Remova o `<link>` do Google Fonts; use a pilha local do DS. Ícone é SVG inline.
   Um cenário automatizado intercepta requisições e reprova qualquer uma.
8. Sem glass, sem glow, sem orbs.

Nenhum hex fora do DS. **Confira você mesmo com `node scripts/check-tokens.mjs`** antes de fechar
o ciclo: ele lista cada hex irregular com linha e motivo. Hex fora do sistema reprova na validação
objetiva, sem gastar o Juiz. Hoje o mockup tem 33 irregulares — é a paleta FlowNC que este refactor
existe para substituir. O script já aceita `#E85D04` e `#3730A3`, e o halo de foco em `rgba()`
acompanha o índigo.

### 1.1 Foco visível — use `:focus`, não só `:focus-visible`

O anel de foco do DS §3.5 vale para **todo** elemento alcançável por teclado. Declare-o em
`:focus`. `R15` percorre a tela chamando `el.focus()` por script e mede o estilo computado —
`:focus-visible` depende de heurística do navegador sobre a origem do foco e **não dispara de forma
confiável em foco programático**. Uma folha que só estiliza `:focus-visible` reprova o cenário com
a implementação correta, e o ciclo se perde num falso vermelho.

---

## 2. Ordem do formulário

Regra da SPEC §2/§3.3 — **categórico → geométrico → contínuo → ação** — com o contexto antes de tudo:

| # | Bloco | `data-testid` | Conteúdo |
|---|---|---|---|
| 1 | Contexto | `bloco-contexto` | perfil de máquina + fator de segurança. Recolhível, **começa expandido**, lembra o valor |
| 2 | Categórico | `bloco-categorico` | tipo de usinagem → ferramenta → *(separador)* → material da peça → operação |
| 3 | Geométrico | `bloco-geometrico` | campos dimensionais do tipo selecionado |
| 4 | Ajuste fino | `bloco-ajuste-fino` | os controles de ajuste do tipo (§5.3) |
| 5 | Ação | `btn-calcular` | botão principal, 56px |

**O bloco categórico tem quatro campos, não cinco.** `Material da Ferramenta` **não existe mais** —
o substrato virou parte do nome da ferramenta no seletor de tipo (SPEC §3.2 e §4). O rótulo do
primeiro campo é **"Tipo de Usinagem"**, não "Família de Operação"; o `data-testid` continua
`select-familia`. Os dois sub-grupos (o que corta × o que é cortado) são separados por rótulo ou
régua fina, **nunca** por gaveta aninhada (SPEC §7.2).

**Começa expandido, e isso não é preferência:** `T24` e `R09` fazem `page.fill` em campos que moram
dentro do bloco Contexto, e `fill` falha em elemento oculto. Recolhido por padrão quebra um cenário
de **regressão** — o ciclo reprova na validação objetiva, antes do Juiz. O botão de recolher
funciona normalmente; só o estado inicial é fixo.

**Os cinco blocos são empilhados em coluna única, um abaixo do outro.** `R12` compara o `y` de cada
um e exige crescimento estrito — dois blocos lado a lado dão o mesmo `y` e reprovam. A tela pode
continuar em duas colunas no nível maior (configuração à esquerda, resultado à direita); a
restrição vale para os blocos da configuração entre si.

---

## 3. Escolha segmentada

**Três** controles saem do dropdown — eram quatro; `select-material-ferramenta` deixou de existir
(SPEC §3.2). Pesquisa de usabilidade: dropdown custa duas ações (abrir + escolher), botão custa um
clique; o corte prático fica em 5 a 7 opções.

| Vira botão de 1 clique | Opções | Continua dropdown | Por quê |
|---|---|---|---|
| `select-familia` | 4 | `select-tipo-ferramenta` | 1 a 16 por usinagem, rótulo longo com substrato |
| `select-operacao` | 3 | `select-designacao-rosca` | 8, rótulo técnico longo |
| `input-angulo-broca` | 1–3 | `select-material-peca` | 12, bem acima do corte |

**`select-tipo-ferramenta` agrupado por geometria.** O catálogo tem **33 entradas** (fresar 16 ·
furar 11 · roscar 5 · mandrilar 1), uma por variação de substrato. Use `<optgroup>` com o rótulo da
geometria — cada entrada já traz `grupo` (nome da geometria) e `substrato` no objeto `TOOLS`, então
não há nada a inventar. O operador procura a geometria e só depois olha o substrato. O primeiro item
de cada usinagem é o default, e trocar de usinagem move a ferramenta ativa para ele (SPEC §4.3.3) —
nunca calcula com ferramenta herdada de outra usinagem.

**O substrato aparece sempre no rótulo**, inclusive quando a geometria tem variação única
(*"Cabeçote Faceador — pastilhada MD revestido"*), e **a ferramenta escolhida aparece por extenso no
resumo do resultado** (Zona 3). O número foi calculado com aquele fator de substrato; esconder qual
é remove a procedência do próprio cálculo.

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

## 5. Ajuste fino — o slider de agressividade e os 4 controles

Ficam **dentro do painel de configuração**, como último bloco antes de Calcular. Não é painel
separado depois do resultado.

Cada parâmetro tem: rótulo, valor numérico editável, barra de estado, controle deslizante e botão
de ajuda. Ver `TESTID_CONTRACT.md` para os nomes.

### 5.0 Slider de agressividade — o único controle multiparâmetro do painel

Fica **acima** dos controles individuais, no topo do bloco de ajuste fino. `data-testid`
`slider-agressividade`.

1. Escala **0–100%**, rótulo nas pontas: **conservador** ↔ **produtivo**. O valor recomendado é
   marcado com tick e **é onde o slider nasce** — é isso que preserva os golden values.
2. Move `Vc`, `fz`, `ae` e `ap` **juntos**, cada um entre o piso conservador e o teto de recomendação
   dele, respeitando os limites do §5.1. **Nunca** empurra um parâmetro além do limite próprio para
   satisfazer os outros: quem chega no limite para lá, e os demais continuam.
3. Mexer nele marca os 4 como **manuais** (§6.5 da SPEC). Mexer num controle individual depois
   **não** devolve o slider ao lugar — ele passa a exibir estado **misto**, e mostrar "50%" quando os
   parâmetros não estão mais no vetor seria mentira na tela.
4. **Abre procedência:** a gaveta mostra o que cada parâmetro virou e por quê.
5. **Não contorna bloqueio nem limite físico** (§5.2.2). Com bloqueio ativo ele fica inerte junto com o
   resto da edição.
6. Só aparece onde existem os 4 parâmetros — ou seja, na família **fresar**. Nas demais, o ajuste
   fino tem apenas os controles individuais do §5.3: um slider "de agressividade" que move um
   parâmetro só é um slider de Vc com nome errado.

**Os 3 gauges continuam read-only.** Arrastar o gauge de Saúde ou de MRR foi avaliado e recusado
(SPEC §6.3): saúde é função de 4 parâmetros e MRR de 3, então infinitas combinações dão o mesmo
número e o sistema teria de escolher a estratégia de usinagem no lugar do operador — contra a Regra
Crítica 6. O slider de agressividade é a resposta a esse pedido, e é auditável porque o vetor é
declarado.

**Referência da barra de estado.** `Vc`, `fz` e `fn` têm recomendado real vindo do motor — a barra
mede o desvio contra ele. **`ae` e `ap` não têm**: o motor não devolve recomendação para os dois.
Use o **valor padrão do tipo de ferramenta** (o mesmo que já preenche o campo) como referência.
Não invente uma recomendação que o motor não calcula.

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

### 5.2 Comportamento do recálculo — **híbrido** (invertido em 15/08/2026)

> **Primeiro Calcular é compromisso consciente; depois dele, o painel é vivo.**

Esta seção **mudou de sentido**. A versão anterior mandava não recalcular nunca sem clique; a
decisão do Mestre (SPEC §6.6) adota o modelo que o código real de produção já usa
(`liveCalculationEnabled`).

| Momento | Mudar parâmetro ou editar resultado |
|---|---|
| **Antes** do 1º Calcular | **não recalcula.** O painel de resultado fica no estado vazio; `valor-{p}` e `barra-estado-{p}` atualizam na hora, os resultados não |
| **Depois** do 1º Calcular | **recalcula na hora**, sem clique extra — parâmetro, slider de agressividade e edição reversa de RPM/Avanço, todos |

**O botão Calcular nunca some nem desabilita.** Depois do primeiro clique ele continua na tela com
duas funções: gravar histórico e servir de **reancoragem** — o ponto para onde o operador volta.

**O `stale` continua existindo, com escopo menor.** Ele marca a janela entre a mudança e o resultado
novo, não um estado de espera por clique. Onde entra e onde não entra não mudou:

- vai **no próprio elemento** que carrega o `data-testid` (`resultado-rpm`, `resultado-avanco`, …).
  `R03` testa `toHaveClass(/stale/)` no elemento; classe no container acima não conta;
- **não** vai em `badge-alerta-seguranca` nem no chip de nível. Esmaecer alarme ativo contraria o
  ISA-101: o alerta continua com força total enquanto os números envelhecem.

**Os ouvintes de `input`/`change` no `document.body` que chamam `recalc()` ficam** — a instrução
anterior de removê-los caiu junto com a regra antiga. O que muda é que `recalc()` passa a ser
condicionado ao primeiro Calcular já ter acontecido. Os outros dois efeitos do mesmo ouvinte
(sincronizar o passo da rosca, marcar `fieldUserEdited`) valem sempre, antes e depois.

### 5.2.1 Edição reversa de RPM e Avanço

Os dois números-herói são **editáveis** e a edição inverte a conta, chamando **a mesma cadeia do
motor** (`n → CTF → Vf → MRR → potência → torque → saúde`). Nunca escreva uma segunda implementação
paralela — duplicar o pipeline é risco registrado na SPEC §7.5.

| Editado | Inversão | Cascata |
|---|---|---|
| **RPM (n)** | `Vc = π · D · n / 1000` | Vc vira manual → Vf recalculado com o fz atual → MRR, potência, torque, saúde |
| **Avanço (Vf)**, fresar | `fz_ef = Vf / (Z · n)`, desfazendo o afinamento: `fz = fz_ef · √(ae/D)` quando `ae < D/2` | fz vira manual → MRR, potência, torque, saúde |
| **Avanço**, furar/mandrilar | `fn = Vf / n` | idem, sem `Z` |
| **Avanço**, roscar | **não editável** — `Vf = P × n` é imposto pela rosca | editar RPM move o avanço junto |

Isto é **paridade**, não feature nova: o `BidirectionalSlider` de produção já faz exatamente isso.

### 5.2.2 Limite físico e bloqueio durante a edição

- Ao arrastar ou digitar acima de `maxRPM` ou `maxFeed` do perfil de máquina, o controle **para no
  limite** e diz o motivo. Não passa em silêncio.
- Ultrapassar exige **override explícito**, e o resultado passa a carregar a marca de forçado.
- Com o estado **bloqueado** ativo (hoje `L/D > 6`), os controles de edição ficam **inertes** e a
  mensagem explica que o caminho é trocar a ferramenta ou o balanço — não o número.

### 5.2.3 Marca de manual e caminho de volta

Todo parâmetro que divergir do recomendado exibe badge `manual` e tem **botão de retorno ao
recomendado** ao lado. Há também um **"voltar tudo ao recomendado"** no rodapé do bloco de ajuste
fino. Sem o caminho de volta a edição vira armadilha: o operador perde a referência e só recupera
recarregando a tela.

### 5.3 Mapeamento por família

Nem toda família usa os quatro. Exiba apenas os que o tipo selecionado usa, reaproveitando o
`campos[]` do schema — **não invente parâmetro que o motor não lê**:

| Família | Controles | Ressalva |
|---|---|---|
| Fresar | Vc, fz, ae, ap | — |
| Furar | Vc — **e fn só no U-Drill** (`u_drill_mdrev`) | as demais brocas **não** têm `fnManual` no schema; exibir fn nelas não muda número nenhum e vira campo morto |
| Roscar | Vc | o passo é **leitura travada**: o avanço é `P × n`, derivado |
| Mandrilar | Vc, fn, ap | `ap` é **derivado** de (diâmetro final − inicial) ÷ 2 — mostre como leitura travada, não como deslizante |

**Confira antes de exibir fn:** o critério é o campo `fnManual` existir no schema do tipo. Hoje só
`u_drill_mdrev` (família furar) e `mandril_mdrev` o têm. Exibir um deslizante que não alimenta o motor é
exatamente o defeito que os 6 campos mortos da §10 vieram corrigir.

---

## 6. Ajuda contextual — gaveta inline, não popover flutuante

Mecânica do **Disclosure do WAI-ARIA APG**, conteúdo sob demanda em região viva. **A forma mudou em
15/08/2026** (SPEC §8.1): é uma **gaveta inline que empurra o layout**, dentro do próprio bloco — não
um painel que flutua por cima.

- gatilho `ⓘ` de 24px com área de toque de 44px, ao lado do rótulo — não um botão caixa-alta de
  largura total;
- `aria-expanded` no botão, `aria-controls` apontando para o painel;
- painel com `aria-live="polite"`, **não** `role="tooltip"` (tooltip é para rótulo, não para explicação);
- **abre por clique**, nunca só por hover — hover-only quebra em toque e deixa quem usa teclado de fora;
- **várias podem ficar abertas ao mesmo tempo.** Caem as regras "uma aberta por vez" e "fecha ao
  clicar fora": conteúdo que se fecha ao tocar no slider some justamente no momento em que o
  operador quer ler. Permanecem o `Esc` (com o foco dentro dela) e o fechar pelo próprio gatilho;
- o estado das gavetas de ajuda **não** persiste entre sessões — diferente das gavetas de bloco
  (§7.1 da SPEC). Ajuda é consulta pontual;
- é um `<button>` nativo: `R07` foca por teclado e aciona com `Enter`.

**Alvo de 44px também aqui.** O ciclo de ensaio mediu `.disclosure` e `.prov` com **34px** e o Juiz
deduziu na categoria 5 — os cenários automatizados só medem os controles de escolha, então esta é
uma lacuna que o script não pega e o Juiz pega. O ícone desenhado tem 24px; a **área clicável** tem
44×44px.

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

**fn — Avanço por rotação (mm/rot)** *(escrito neste refactor; não existia em produção)*
- Distância que a ferramenta avança a cada volta completa. Na furação o cavaco se mede por rotação,
  não por dente — é o `fz` da família Furar.
- Aumentar: fura mais rápido e quebra melhor o cavaco, mas eleva a força axial e o torque exigidos.
- Diminuir: menos esforço na ponta e furo mais preciso, porém o cavaco sai fino e tende a embolar.
- Equilíbrio: respeite o mínimo que a própria tela indica — abaixo dele a aresta esfrega em vez de
  cortar, e a calculadora já avisa (é o alerta que o cenário `T17` cobre no U-Drill).

---

## 7. Os 3 gauges

Zona 5. Arco de 180°, **41 barras**, ponteiro com base circular, valor central em mono 32px.
Em SVG/CSS puro — o mockup não usa React.

| Gauge | `data-testid` | Valor | Escala |
|---|---|---|---|
| Eficiência de Avanço | `gauge-eficiencia-avanco` | `Vf efetivo ÷ Vf recomendado × 100` | `centered`, `scaleMax` 150 — 100% no meio; acima é sobrecarga |
| Produtividade MRR | `gauge-mrr` | `Q` já calculado | `ascending`, **0 a 50 cm³/min**, cortes em 40% e 76% (DS §4.3) |
| Saúde da Ferramenta | `gauge-saude` | índice de saúde já calculado | `ascending`, 0 a 100, mesmos cortes |

Cada um traz `{gauge}-valor` com o número central — `R08` exige que ele saia do traço depois do
cálculo.

Cores: **a rampa de estado do DS**, não a paleta do componente de produção. **O ponteiro é
`--tx-1`** — o ponteiro branco da produção some em fundo claro. Barra inativa: `--border-subtle`.

Eficiência de Avanço só faz sentido porque os controles de ajuste existem: é o desvio que o
operador escolheu em relação ao recomendado. Sem desvio, marca 100%.

**Os três são read-only — e isso é decisão, não omissão** (SPEC §6.3). Não os torne arrastáveis:
saúde vem de 4 parâmetros e MRR de 3, então "arraste até 80" não tem solução única e faria o sistema
escolher a estratégia de usinagem no lugar do operador. Quem responde ao pedido de "ajustar pelo
resultado" é o slider de agressividade (§5.0) e a edição reversa de RPM/Avanço (§5.2.1).

**Os três gauges também precisam de procedência** — foi a prioridade 3 do Juiz no ciclo de ensaio:
"são calculados e nunca explicados ao operador". Cada um abre a conta que o gerou, no mesmo padrão
da §9: `Eficiência = Vf efetivo ÷ Vf recomendado`, `MRR = Q`, `Saúde = índice`, com os valores
substituídos. Sem isso, dedução certa na categoria 6.

---

## 8. Contraste entre entrada e resultado

Três níveis de superfície do DS §3.1: página `#F3F4F6` → cartão `#FFFFFF` → campo `#E9EBEF`.
O campo é a única superfície que afunda — é o que comunica "aqui eu digito".

---

## 9. Procedência de todo número

O cartão de fórmula e o badge de fonte já existem. A mudança é de grau: **todo número lido na tela
alcança a conta que o gerou** — fórmula simbólica, valores substituídos, resultado e fonte do dado.

`result.formulas` já vem pronto de cada família de cálculo; falta ligar número a número, via
`procedencia-rpm`, `procedencia-avanco`, `procedencia-potencia` e `procedencia-torque` — **um
elemento de cada, exatamente**: `R17` usa `toHaveCount(1)` e duplicar o testid reprova.

O gatilho de procedência é um controle clicável: **44×44px de área**, foco visível, alcançável por
teclado — as mesmas regras da ajuda contextual.

**Preserve `texto-fonte-vc`**, o badge de fonte do Vc. `R14` mede o contraste dele e `R17` exige
que não fique vazio; a captura dos golden values também o lê. Reorganizar a tela não pode perder
esse nome — vale o mesmo para `badge-material-estimado`, `cartao-formula` e `toggle-modo-rapido`.

É o contraponto direto aos concorrentes de caixa-preta. Número sem procedência é dedução no
critério 6 do Juiz.

---

## 10. Formulário enxuto — os 6 campos que você tem que tirar da tela

Seis campos são preenchidos pelo operador e **não entram em conta nenhuma**. Todos saem:

| Campo | Onde | Por quê |
|---|---|---|
| Refrigeração interna | broca de metal duro | declarado e renderizado, `computeDrilling` nunca lê |
| Sobremetal | alargador | lido e nunca usado no corpo da função |
| Nº de arestas (Z) | escareador, alargador | furação trabalha por rotação, não por dente |
| Profundidade (h) | broca de centro, escareador | não é lido em lugar nenhum |
| Ângulo de chanfro | fresa de chanfrar | `computeMilling` lê `anguloPosicao` (κ), nunca `anguloBroca` |
| Ângulo de ponta | escareador | o ângulo só vira `Lp` na broca helicoidal e na broca de centro |

A prova de que são inertes está nos golden values: com eles fora, todos os resultados continuam
idênticos. Se algum número mudar, o corte estava errado — reverta aquele campo.

**Corte na renderização, não no schema.** A região `DADOS` do mockup foi reescrita pelo Orquestrador
em 15/08/2026 (novo catálogo) e **congelada de novo**, byte a byte: mexer em `GEOMETRIAS`, `TOOLS`,
`FAMILIAS` ou `TOOL_FACTORS` derruba o ciclo na verificação de integridade, antes do Juiz. Se você
acha que um dado está errado, isso vai para o registro do ciclo — não para o diff.

**Não os traga de volta.** Eles voltam quando o motor souber usá-los — está registrado em
`docs/plans/PLAN_MOTOR_CALCULADORA_V2.md`.

Regra que passa a valer: **todo campo visível por padrão precisa mudar um número que o operador lê
na tela.** Teto de 6 campos por tipo no fluxo padrão, verificado automaticamente.

---

## 11. Como saber que terminou

`npx playwright test` — **44 cenários em quatro grupos**:

| Grupo | O que é | Regra |
|---|---|---|
| `gauntlet.spec.ts` | 23 cenários de regressão | **verdes em todo ciclo** — quebrar é reprovar |
| `invariantes.spec.ts` | 3 invariantes (18 tipos sem erro de JS · nada de `NaN`/`undefined`/`Infinity` na tela · console limpo) | **verdes em todo ciclo** — já valem hoje |
| `goldens.spec.ts` | 54 combinações do motor | **verde em todo ciclo** — quebrar significa que o cálculo mudou |
| `refactor.spec.ts` | 17 alvos novos | vermelhos no começo; ficar todos verdes é o alvo do ciclo |

Mais dois verificadores objetivos, que você pode rodar quantas vezes quiser:

```
node scripts/check-tokens.mjs    paleta contra o Design System
node scripts/freeze.mjs          integridade do motor, testes, critérios e scripts
```

**A contagem é exata.** Apagar ou desligar cenário (`test.skip`, `test.only`) derruba o ciclo em
`check-suites.mjs` — "0 falhas" também é o resultado de apagar o teste.

Suíte verde **não é aprovação** — é o mínimo para o Juiz cego ser acionado. O ensaio de 14/08/2026
teve 41/41 verdes e mesmo assim o Juiz reprovou em 86/100: os cenários provam presença e
comportamento, não qualidade. Trate-os como **piso**, não como meta.

---

## 12. Prevenção de erro — a categoria que mais derrubou o ensaio

Categoria 3 vale 12 pontos com piso 10 e tirou **8** no ciclo de ensaio. O motivo foi um só:
**alerta que manda corrigir sem dizer quanto.**

As quatro mensagens de limite de máquina já foram corrigidas pelo Orquestrador e trazem o alvo
numérico (`"... Reduza ap/ae/Vc em pelo menos 52% para caber."`). Você **não** as escreve — elas
estão nos golden values e mudá-las reprova o ciclo. O que cabe a você:

- **não truncar.** Nada de `text-overflow: ellipsis` nem altura fixa no `badge-alerta-seguranca`:
  o número-alvo mora no fim da frase e é justamente o que o Juiz procura;
- **manter o mesmo padrão** em qualquer aviso que você apresente na tela — condição, valor medido,
  limite e **a saída, com número**;
- **entrada vazia, zero, negativa e extrema** continuam tratadas com semáforo e correção escrita,
  como hoje (`T07`, `T08`, `T09`);
- o alerta **nunca** esmaece: ele fica fora do `stale` (§5.2).
