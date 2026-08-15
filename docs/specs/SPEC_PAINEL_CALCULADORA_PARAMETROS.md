# Especificação do Painel da Calculadora de Parâmetros

> **O que é este documento:** a diretriz consolidada de como o painel da calculadora de parâmetros
> deve ser estruturado — elementos, posição, ordem, agrupamento, relação entre componentes e
> comportamento de interação. Serve de referência para qualquer agente que implemente o painel,
> no mockup do loop Gauntlet v2 ou no código real (`src/`).
>
> **O que não é:** plano de execução (não tem cronograma nem divisão em sessões) e não é
> especificação de motor de cálculo — o motor está em `docs/plans/PLAN_MOTOR_CALCULADORA_V2.md`.
>
> **Fontes consolidadas:** intenções do Mestre (revisão de 14/08/2026, 7 pontos),
> `docs/specs/SPEC_CALCULADORA_MULTI_FERRAMENTA.md`, `docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md`,
> `gauntlet-calculadora-cnc-v2/research/BUILD_CONTRACT_REFACTOR.md`, `docs/design/DS_TEMA_CLARO.md`,
> `gauntlet-calculadora-cnc-v2/mockup/index.html` (estado aprovado, ciclo 3), código de produção
> (`src/store/machining-store.ts`, `src/engine/*`, `src/components/fine-tune-panel.tsx`) e pesquisa
> externa de calculadoras de mercado (§9.2).
>
> **Regra herdada que vale aqui:** *No Invention*. Onde falta fonte, o documento diz o que falta em
> vez de arbitrar um número.

---

## Índice

1. [Princípios inegociáveis do painel](#1-princípios-inegociáveis-do-painel)
2. [Layout, zonas e ordem](#2-layout-zonas-e-ordem)
3. [Painel de configuração — blocos, campos e agrupamento](#3-painel-de-configuração--blocos-campos-e-agrupamento)
4. [Compatibilidade material da ferramenta × tipo](#4-compatibilidade-material-da-ferramenta--tipo)
5. [Painel de resultados — zonas e hierarquia](#5-painel-de-resultados--zonas-e-hierarquia)
6. [Calculadora dinâmica — edição reversa de resultados](#6-calculadora-dinâmica--edição-reversa-de-resultados)
7. [Colapso em gaveta — blocos de entrada](#7-colapso-em-gaveta--blocos-de-entrada)
8. [Ajuda contextual em gaveta — ajuste fino](#8-ajuda-contextual-em-gaveta--ajuste-fino)
9. [Modo Rápido](#9-modo-rápido)
10. [Cor, estado e seleção](#10-cor-estado-e-seleção)
11. [Estados do painel](#11-estados-do-painel)
12. [Acessibilidade e uso em chão de fábrica](#12-acessibilidade-e-uso-em-chão-de-fábrica)
13. [Impacto no loop Gauntlet v2 — o que precisa ser reaberto](#13-impacto-no-loop-gauntlet-v2--o-que-precisa-ser-reaberto)
14. [Decisões pendentes do Mestre](#14-decisões-pendentes-do-mestre)
15. [Fora de escopo, com motivo](#15-fora-de-escopo-com-motivo)

---

## 1. Princípios inegociáveis do painel

Regras já validadas em produção ou medidas em ciclo de julgamento. Não reabrir sem motivo escrito.

| # | Princípio | Origem |
|---|---|---|
| P1 | **Painel persistente com zonas fixas**, nunca wizard sequencial. A calculadora é usada dezenas de vezes por dia; obrigar navegação em etapas custa tempo em toda repetição | SPEC §4.1 (FlowNC / ISA-101.01) |
| P2 | **Ordem categórico → geométrico → contínuo → ação.** Cada camada restringe a seguinte; inverter a ordem faz o operador preencher campo cujo domínio ainda não existe | SPEC §2, §3.3 |
| P3 | **Todo campo visível por padrão precisa mudar um número que o operador lê na tela.** Campo que não entra em conta sai da tela | PLAN_GAUNTLET §3 (6 campos mortos com evidência) |
| P4 | **Teto de 6 campos por tipo de ferramenta** no fluxo padrão | PLAN_GAUNTLET §4 · cenário `R11` |
| P5 | **Estado vazio honesto:** nunca renderizar zero calculado como se fosse resultado. Sem simulação, `—` | SPEC §3.1 |
| P6 | **Nenhum output visual sem função.** Card, chip ou gauge que não alimenta validação nem decisão vira ruído (caso Torque) | SPEC §3.2 |
| P7 | **Herói visual reservado a 1–2 números acionáveis** da família ativa (fresamento: RPM + Avanço) | SPEC §3.3 |
| P8 | **Procedência universal:** todo número exibido alcança a fórmula, os valores substituídos e a fonte | PLAN_GAUNTLET §16 (sugestão 6) · cenário `R17` |
| P9 | **Alvo de toque ≥44px, ação sempre visível** (nunca só em hover). Operação com luva | ISA-101 · SPEC §3.3 |
| P10 | **Zero dependência de rede.** Fonte local/empacotada, ícone SVG inline. Oficina sem internet abre a tela idêntica | PLAN_GAUNTLET §10 · cenário `R16` |
| P11 | **Recomendação e limite físico são camadas separadas.** Recomendação se ignora; limite físico nunca é ultrapassado em silêncio | PLAN_MOTOR §6 |
| P12 | **O sistema recomenda, o operador decide** — e o resultado carrega a marca de que foi forçado quando for | CLAUDE.md, Regra Crítica 6 |

---

## 2. Layout, zonas e ordem

### 2.1 Estrutura macro

Duas colunas, coluna única empilhada abaixo de 1360px (cenário `R12` exige blocos empilhados em
coluna única dentro do painel de configuração).

```
┌── CABEÇALHO ────────────────────────────────────────────────────────────┐
│ marca · material ativo · operação ativa · ferramenta ativa · nível      │
├── COLUNA ESQUERDA (configuração, ~400px) ─┬── COLUNA DIREITA (resultado)┤
│ 1. Contexto                               │ Z1 Cabeçalho do console     │
│ 2. Categórico                             │ Z2 Alerta / ação            │
│ 3. Geométrico                             │ Z3 Resumo da ferramenta     │
│ 4. Ajuste fino                            │ Z4 Herói (RPM · Avanço)     │
│ ───────────────────────────────────────── │ Z5 Indicadores (3 gauges)   │
│ 5. Ação — Calcular (sticky, 56px)         │ Z6 Detalhes e fórmulas      │
└───────────────────────────────────────────┴─────────────────────────────┘
```

### 2.2 Ordem dos blocos de entrada — obrigatória

| # | Bloco | `data-testid` | Conteúdo |
|---|---|---|---|
| 1 | Contexto | `bloco-contexto` | perfil de máquina editável (rotação, potência, torque, avanço máximos) + fator de segurança |
| 2 | Categórico | `bloco-categorico` | tipo de usinagem → ferramenta (tipo **e** material num item só) → material da peça → operação |
| 3 | Geométrico | `bloco-geometrico` | campos dimensionais do tipo ativo |
| 4 | Ajuste fino | `bloco-ajuste-fino` | controles contínuos da família (Vc, fz, ae, ap / fn) |
| 5 | Ação | `btn-calcular` | botão Calcular, sticky no rodapé, altura 56px |

**Mudanças em relação ao contrato vigente (decididas em 15/08/2026):** o campo `material da
ferramenta` **deixa de existir** — o material passa a fazer parte da identidade da ferramenta no
seletor de tipo (§3.2 e §4); e o rótulo `Família de Operação` passa a ser **`Tipo de Usinagem`**.

### 2.3 Por que a ação fica no rodapé

O fluxo é de cima para baixo; a ação principal encerra o fluxo. Botão no topo obriga o olho a
voltar. Decisão já testada no redesign 80/20 (SPEC §3.1) — não reabrir.

---

## 3. Painel de configuração — blocos, campos e agrupamento

### 3.1 Regra de agrupamento: campos do mesmo assunto ficam juntos

Um bloco agrupa campos que respondem à **mesma pergunta do operador**. A ordem interna do bloco
segue a dependência de dados, não a conveniência de layout.

O bloco Categórico responde a duas perguntas distintas e deve deixar isso visível:

| Sub-grupo | Campos | Pergunta que responde |
|---|---|---|
| **Ferramenta** | tipo de usinagem · ferramenta (tipo + material num item só) | *"com o que eu vou cortar?"* |
| **Peça e intenção** | material da peça · operação (desbaste/semi/acabamento) | *"o que eu vou cortar, e com que objetivo?"* |

Os dois sub-grupos aparecem no mesmo bloco, separados por rótulo de sub-cabeçalho ou por régua
fina — não por bloco colapsável próprio (ver §7.2, teto de gavetas).

### 3.2 ✅ Material da ferramenta sai da tela (decidido em 15/08/2026)

**Estado atual do mockup** (`mockup/index.html:206-254`):
`família → tipo de ferramenta → material da peça → material da ferramenta → operação`.

Além do vaivém (escolhe a ferramenta, salta para a peça, **volta** para a ferramenta), o campo
`Material da Ferramenta` é **um passo de configuração que não precisa existir**: na prática de
oficina, ferramenta e substrato vêm juntos — ninguém compra "uma fresa de topo" e escolhe o material
depois; compra "uma fresa de topo de metal duro". O próprio mockup já admite isso em dois tipos,
`broca_hss` ("Broca Helicoidal HSS / HSS-Co") e `broca_md` ("Broca Inteiriça Metal Duro"), que
codificam o material no nome — e que hoje podem **contradizer** o campo logo abaixo (tipo "Broca HSS"
com material "Metal Duro" selecionado).

**Decisão:** o campo `Material da Ferramenta` é **removido**. O material passa a ser parte da
identidade da ferramenta no seletor de tipo, com uma entrada por variação real de mercado (§4).

**Ordem final do bloco categórico:**

```
1. Tipo de Usinagem     (fresar · furar · roscar · mandrilar)
2. Ferramenta           (tipo + material no mesmo item; lista muda por tipo de usinagem)
—— separador ——
3. Material da Peça     (badge "estimado" quando aplicável)
4. Operação             (desbaste · semi-acabamento · acabamento)
```

**Ganhos:** um campo a menos por configuração; combinação impossível deixa de ser representável
(prevenção de erro por construção, não por validação); some a contradição tipo × material.

**Custo:** a lista de ferramentas cresce (§4.2) e o substrato deixa de ser trocável sem trocar a
ferramenta — o que é fiel à realidade, já que trocar o substrato é trocar de ferramenta.

### 3.2.1 Renomeação: "Família de Operação" → "Tipo de Usinagem"

O rótulo atual está errado em português de chão de fábrica: "operação" já é o nome do outro campo
(desbaste/semi/acabamento), e ter "família de operação" e "operação" na mesma tela confunde. Fresar,
furar, roscar e mandrilar são **tipos de usinagem**.

| Item | Antes | Depois |
|---|---|---|
| Rótulo na tela | Família de Operação | **Tipo de Usinagem** |
| `data-testid` | `select-familia` | **mantido** — trocar o seletor quebraria os 23 cenários de regressão sem ganho nenhum |
| Chave interna (`FAMILIAS`, `TOOLS[].familia`) | `familia` | mantida nesta etapa; renomear é limpeza opcional para quando o código real for escrito |

### 3.3 Bloco Contexto

| Campo | Tipo | Default | Observação |
|---|---|---|---|
| Rotação máxima | número (rpm) | 12000 | escreve em `MACHINE.maxRPM`; alimenta `checkMachineLimits` |
| Potência máxima | número (kW) | 15 | idem |
| Torque máximo | número (Nm) | 80 | idem |
| Avanço máximo | número (mm/min) | 5000 | idem |
| Fator de segurança | slider 50–100% | conforme mockup | multiplica potência e torque exibidos |

Começa **expandido** (decisão travada — ver §7.3). O perfil de máquina é o único item da lista de
melhorias que era **defeito e não preferência**: sem ele, todo alerta de potência/torque é calculado
contra uma máquina fictícia, errando **para o lado perigoso** numa oficina com centro de 8000 rpm.

Item futuro previsto (não neste escopo): persistência de múltiplos perfis de máquina nomeados
(PLAN_MOTOR §6).

### 3.4 Bloco Geométrico

Campos **dirigidos pelo tipo ativo** (`TOOLS[tipo].campos`), com rótulos que o tipo pode sobrescrever
(`labels`). Regras:

- Máximo 6 campos por tipo (P4), contando os do bloco de ajuste fino que forem específicos do tipo.
- Nenhum dos 6 campos mortos aparece: `refrigInterna`, `sobremetal`, `arestas` em furação,
  `profundidadeH`, ângulo de chanfro em fresa de chanfrar, ângulo de ponta em escareador
  (PLAN_GAUNTLET §3). Eles voltam à tela **quando o motor os consumir** (PLAN_MOTOR §0/§5), nunca antes.
- Campo com **uma única opção válida** não vira seletor: vira valor fixo exibido, travado, com a
  razão ao lado. Mesma regra do ângulo de ponta com opção única.

### 3.5 Bloco Ajuste Fino

Último bloco antes da ação, dentro da configuração (SPEC §5.4, Passo 5).

| Família | Controles |
|---|---|
| Fresar | Vc · fz · ae · ap |
| Furar | Vc · fn — **fn só onde o motor aceita** (U-Drill e mandril) |
| Roscar | Vc — passo travado, o avanço é `P × n` |
| Mandrilar | Vc · fn · ap |

Limites portados de `src/engine/slider-bounds.ts` sem reinventar (tabela no BUILD_CONTRACT §5.1).
Todo controle **nasce no valor recomendado** — quem não mexe obtém exatamente o resultado de antes,
e é isso que sustenta os golden values.

Cada controle tem, na mesma linha: rótulo · valor numérico editável · barra de estado própria ·
botão `ⓘ` de ajuda (§8) · botão de **retorno ao recomendado** quando o valor está manual (§6.5).

---

## 4. Catálogo de ferramentas — material embutido no tipo

> ✅ **Decidido em 15/08/2026:** não existe campo de material da ferramenta. Cada entrada do seletor
> "Ferramenta" já é uma ferramenta real, com substrato declarado no nome. Combinação impossível
> deixa de ser representável — a prevenção de erro vem da estrutura, não de uma validação depois.

### 4.1 O critério de quais variações existem — é a construção

O que determina o substrato disponível **não é o formato do corte** (toroidal, esférica, topo), e sim
a **construção da ferramenta**:

| Construção | Substratos que existem no mercado | Consequência no catálogo |
|---|---|---|
| **Inteiriça (sólida)** | HSS · HSS-Co · metal duro (com ou sem revestimento) | várias entradas por geometria |
| **Pastilhada / indexável** | metal duro revestido (padrão) · cermet · cerâmica · CBN · PCD | uma entrada só; **HSS e HSS-Co não existem** como inserto indexável |

Fresa toroidal, esférica e de topo **existem em HSS e HSS-Co** — são itens de catálogo corrente em
distribuidor industrial, usados quando o carboneto está superespecificado ou o risco de quebra é
alto (peça única, manutenção, máquina pouco rígida). Bloquear HSS em fresa toroidal seria bloquear
uma escolha legítima. Já cabeçote faceador, fresa pastilhada, U-Drill e barra de mandrilar são
porta-ferramentas de inserto — aí o bloqueio é correto e é exatamente o caso que o Mestre descreveu.

### 4.2 Catálogo de entradas do seletor "Ferramenta"

**Regra de granularidade:** existe uma entrada para cada variação que (a) **muda o resultado** —
hoje o fator de Vc por substrato: HSS `0,29` · HSS-Co `0,37` · metal duro `1,00` · metal duro
revestido/pastilha `1,25` (`TOOL_FACTORS`, mockup `:449-454`) — **e** (b) existe como item de
catálogo corrente. Variação que não muda número nem existe no mercado não vira linha.

Ordem dentro de cada geometria: **do mais usado para o menos** (metal duro revestido → metal duro →
HSS-Co → HSS). O primeiro item de cada grupo é o default.

**Regra do revestimento (decidida em 15/08/2026):** geometria **inteiriça** lista MD revestido e MD
separadamente, onde as duas existirem em catálogo — o operador sabe qual tem na mão, e a diferença
vale 25% de Vc. Geometria **pastilhada** lista uma entrada só, revestida, porque é o padrão de
fábrica.

| Tipo de usinagem | Entradas do seletor | Construção |
|---|---|---|
| **Fresar** | Fresa de Topo Reto — MD revestido · MD · HSS-Co · HSS | inteiriça |
| | Fresa Toroidal (raio de canto) — MD revestido · MD | inteiriça |
| | Fresa Esférica (ball nose) — MD revestido · MD · HSS-Co | inteiriça |
| | Fresa de Chanfrar — MD · HSS-Co | inteiriça |
| | Fresa de Alto Avanço — pastilhada MD revestido | pastilhada |
| | Cabeçote Faceador — pastilhas MD revestido | pastilhada |
| | Fresa de Topo com Pastilhas — MD revestido | pastilhada |
| | Fresa de Disco / Serra — pastilhada MD · HSS-Co | ambas |
| **Furar** | Broca Helicoidal — MD revestido · MD · HSS-Co · HSS | inteiriça |
| | Broca de Insertos (U-Drill) — MD revestido | pastilhada |
| | Broca de Centro / Spot — MD · HSS-Co | inteiriça |
| | Escareador / Rebaixador — MD · HSS-Co | inteiriça |
| | Alargador (reamer) — MD · HSS-Co | inteiriça |
| **Roscar** | Macho de Corte — HSS-Co · MD | inteiriça |
| | Macho de Conformação — HSS-Co · MD | inteiriça |
| | Fresa de Rosca (thread mill) — MD revestido | inteiriça |
| **Mandrilar** | Barra / Cabeçote de Mandrilar — pastilhas MD revestido | pastilhada |

**O que sai de graça com essa estrutura:**

- `broca_hss` e `broca_md` deixam de ser tipos separados de forma inconsistente — viram variações da
  mesma geometria "Broca Helicoidal", e os **ângulos de ponta passam a seguir o substrato sem
  ambiguidade** (118°/135° nas variações HSS/HSS-Co, 140° nas de metal duro).
- Nenhuma combinação impossível pode ser montada na tela: "cabeçote faceador em HSS" simplesmente
  não existe como entrada.
- O motor recebe o fator de substrato direto da ferramenta escolhida, sem cruzar dois campos.

**Como a lista não vira um problema de navegação:**

1. O seletor é agrupado por geometria (`<optgroup>` = "Fresa de Topo Reto", "Fresa Toroidal", …), com
   as variações de material dentro do grupo — o operador procura a geometria e só depois olha o
   substrato.
2. A lista é filtrada pelo **tipo de usinagem** escolhido acima: fresar mostra ~13 entradas, furar
   ~10, roscar ~5, mandrilar 1.
3. A **biblioteca de ferramentas salvas** é o atalho real de uso diário: quem salva as cinco fresas
   que usa nunca mais percorre o catálogo.

**Pendência declarada (No Invention):** a lista acima reflete prática de mercado verificada nos
catálogos citados abaixo, mas **cada variação precisa de referência de catálogo nomeada** antes de
entrar no código — tanto para incluir quanto para omitir. Omitir uma variação que existe é o mesmo
erro que bloquear uma escolha legítima, só que mais difícil de perceber. Casos que exigem conferência
específica antes de fechar: fresa toroidal em HSS-Co, macho em metal duro, alargador em cermet,
serra HSS simples.

**Fontes consultadas (14/08/2026), suficientes para a direção, não para bloqueio linha a linha:**
[Kennametal — Indexable Milling](https://www.kennametal.com/us/en/products/metalworking-tools/milling/indexable-milling.html) ·
[Ingersoll — Indexable Face Mills](https://www.ingersoll-imc.com/product/category/indexable-face-mills) ·
[MSC — End Mills Buying Guide (HSS × carbide)](https://www.mscdirect.com/basicsof/end-mills) ·
[YG-1 — HSS ball nose end mills](https://yg1usa.com/feature/item_view.asp?disp=0-31&cat_id=1&sub_id=1&sub_sub_id=5&pre=STANDARD&pre2=&name=HSS) ·
[Toolmex — HSS roughing end mills](https://www.toolmex.com/catsearch/189/hss-roughing-end-mills) ·
[Seco — HSS-Co end mills](https://www.secotools.com/article/m_7462)

**Pendência de fonte (No Invention):** a matriz acima descreve prática de mercado verificada nos
catálogos acima, mas **cada linha marcada `✖` precisa
de uma citação de catálogo nomeada** antes de virar bloqueio duro no código — bloquear uma escolha
legítima é pior que permitir uma incomum. Enquanto a citação não existir para uma linha, ela entra
como `!` (aviso), não como `✖`.

### 4.3 Regras de comportamento do seletor

1. **O substrato aparece sempre no rótulo**, inclusive quando a geometria tem uma variação só
   (*"Cabeçote Faceador — pastilhas MD revestido"*). O operador precisa ver com que material o número
   foi calculado sem abrir nada.
2. **A ferramenta escolhida aparece por extenso no resumo do resultado** (Zona 3) e no snapshot de
   favoritos e histórico — o substrato faz parte da identidade do cálculo.
3. Ao trocar de **tipo de usinagem**, a ferramenta ativa passa para o **primeiro item** da nova lista
   (o mais usado) e a tela mostra o que mudou. Nunca calcula em silêncio com ferramenta herdada de
   outra usinagem.
4. Campos geométricos e ângulos disponíveis derivam da entrada escolhida — inclusive os ângulos de
   ponta por substrato (§4.2).
5. Trocar de ferramenta **não** apaga o que o operador já digitou de geometria compatível (diâmetro,
   balanço): revalida contra os limites da nova ferramenta e avisa o que precisou ser ajustado.
6. Nenhuma escolha do catálogo recebe marca de "manual" (§6.5) — escolher ferramenta é configuração,
   não desvio da recomendação.

### 4.4 Lacuna do modelo de dados, para quando o código real for escrito

Os `TOOL_FACTORS` de hoje misturam **substrato** (HSS, HSS-Co, metal duro) com **construção +
revestimento** ("Metal Duro Pastilha Revestida"). O modelo correto tem substrato e revestimento como
eixos independentes, com a construção herdada da geometria. Com o campo fora da tela, isso deixa de
ser um problema de interface e vira um problema de dados: cada entrada do catálogo aponta para o seu
fator, e a separação em dois eixos entra junto com a expansão de materiais (PLAN_MOTOR §4).

---

## 5. Painel de resultados — zonas e hierarquia

| Zona | Conteúdo | Regra |
|---|---|---|
| Z1 Cabeçalho do console | material · operação · ferramenta · chip de fator de segurança quando ≠ padrão · badge de nível de segurança | o badge de nível **nunca** recebe estado "velho" (§11.2) |
| Z2 Alerta e ação | linha de alerta por prioridade (bloqueado > crítico > atenção > ok) + linha `AÇÃO:` com **alvo numérico** | toda mensagem de limite diz **quanto** reduzir, em %: `"... excede o limite (X). Reduza ap/ae/Vc em pelo menos N% para caber."` |
| Z3 Resumo da ferramenta | spec compacta em uma linha | — |
| Z4 Herói | RPM e Avanço em tipografia dominante, **editáveis** (§6) | os dois únicos números com destaque de herói |
| Z5 Indicadores | 3 gauges + chips L/D e CTF | cada gauge abre procedência (§5.1) |
| Z6 Detalhes e fórmulas | Vc/fz/ap/ae usados com badge `manual` quando divergem do recomendado · potência · Vc real · MRR · cartões de fórmula | colapsado por padrão |

### 5.1 Os 3 gauges

Arco de 180°, 41 barras, ponteiro com base circular, valor central em mono, SVG/CSS puro, ponteiro
em `--tx-1` (ponteiro branco some em fundo claro).

| Gauge | Valor | Escala |
|---|---|---|
| Eficiência de Avanço | `Vf efetivo ÷ Vf recomendado × 100` | `centered`, máx 150 — 100% no meio |
| Produtividade MRR | `Q` calculado | `ascending`, 0–50 cm³/min, cortes em 40% e 76% |
| Saúde da Ferramenta | índice calculado | `ascending`, 0–100, mesmos cortes |

Os três **abrem procedência** (fórmula + valores + fonte). Gauge calculado e nunca explicado foi
reprovação registrada no ensaio de 14/08/2026.

### 5.2 Relação entre painéis

Entrada e resultado têm **tratamento visual distinto** — campo editável tem superfície de entrada,
resultado tem superfície de leitura. A exceção deliberada é o par RPM/Avanço do herói, que é
resultado **e** entrada (§6): ele carrega a afordância de edição sem virar um campo de formulário
comum, e mostra explicitamente quando está em valor manual.

---

## 6. Calculadora dinâmica — edição reversa de resultados

Intenção do Mestre (ponto 3): editar o resultado e ver os demais valores se reajustarem, como uma
calculadora bidirecional.

### 6.1 Precedente em produção — a intenção já é o comportamento validado

O sistema real já faz isso: `BidirectionalSlider` no herói do `results-panel` ajusta RPM e Avanço em
−150%/+150%, e `setManualRPM/setManualFeed` chamam `calcular()` **incondicionalmente**
(`src/store/machining-store.ts`). Portanto a edição reversa **não é feature nova** — é paridade com
o que o operador já tem. A calculadora nova não pode entregar menos.

### 6.2 O que é matematicamente reversível — e é seguro implementar

| Editado | Inversão | Cascata |
|---|---|---|
| **RPM (n)** | `Vc = π · D · n / 1000` | Vc marcado manual → Vf recalculado com o fz atual → MRR, potência, torque, saúde |
| **Avanço (Vf)** | `fz_efetivo = Vf / (Z · n)`; desfaz o afinamento de cavaco: `fz = fz_ef · √(ae/D)` quando `ae < D/2` | fz marcado manual → MRR, potência, torque, saúde |
| **Avanço em furação/mandrilamento** | `fn = Vf / n` | idem, sem Z |
| **Avanço em roscamento** | **não editável** — `Vf = P × n` é imposto pela rosca | editar RPM move o avanço junto |

Ambas as inversões são bijetivas com os demais dados fixos: não há ambiguidade, não há iteração
numérica, não há risco de divergir do motor direto. **Requisito de implementação:** a inversão
recalcula chamando a mesma cadeia do motor (`n → CTF → Vf → MRR → potência → torque → saúde`), nunca
uma segunda implementação paralela — o `FavoriteEditModal` já é um caso de duplicação de pipeline
registrado como risco (SPEC §7.5).

### 6.3 O que **não** é reversível — ✅ **DECIDIDO (14/08/2026): slider de agressividade, opção A**

Arrastar o gauge de **Saúde da Ferramenta** ou de **MRR** para uma faixa desejada é um problema
inverso subdeterminado: a saúde é função de quatro parâmetros (`ap` peso 0,4 · `fz` 0,3 · `ae` 0,2 ·
`vc` 0,1, com a severidade vindo do **pior** parâmetro, não da média) e o MRR é função de três
(`ap · ae · Vf`). Existem infinitas combinações que produzem o mesmo score — sem uma regra, o sistema
teria de escolher por conta própria qual parâmetro mexer, e essa escolha é justamente a decisão de
engenharia que pertence ao operador.

Três políticas possíveis, em ordem de recomendação:

**A. Slider de agressividade (recomendada).** Um único controle 0–100% ("conservador ↔ produtivo")
move Vc/fz/ae/ap juntos ao longo de um vetor declarado, entre o piso conservador e o teto de
recomendação de cada parâmetro. Os gauges respondem em tempo real e continuam **read-only**. É o
padrão que o mercado usa (slider de trade-off segurança↔produtividade, SPEC §4.3) e já está listado
na SPEC §6 como item a adicionar. O vetor é auditável: a gaveta de procedência mostra o que mudou.

**B. Gauge com parâmetro-alvo.** O gauge vira arrastável, mas o operador escolhe antes **qual
parâmetro** deve absorver o ajuste (ex.: "atingir 80 de saúde mexendo em `ap`"). O sistema resolve
por busca no domínio válido daquele parâmetro e, se não houver solução dentro dos limites, diz
explicitamente *"não é possível chegar a 80 só com `ap`; o limite é 62"* em vez de encostar no fim
de curso sem explicar.

**C. Arrasto livre com redistribuição automática.** Rejeitada: o sistema decidiria a estratégia de
usinagem no lugar do operador, contra a Regra Crítica 6, e o resultado seria irreprodutível
(mesmo score, parâmetros diferentes a cada arrasto).

**Decidido: A.** Os 3 gauges permanecem read-only. O slider de agressividade entra no bloco de
ajuste fino, acima dos 4 controles individuais, e é o único controle multiparâmetro do painel.

**Requisitos do slider de agressividade:**

1. Escala 0–100% com rótulo nas pontas (**conservador** ↔ **produtivo**) e o valor recomendado
   marcado com tick — nascer no recomendado é o que preserva os golden values.
2. Move Vc/fz/ae/ap simultaneamente entre o piso conservador e o teto de recomendação de cada um,
   respeitando os limites de `slider-bounds.ts` — **nunca** empurra um parâmetro além do limite dele
   para satisfazer os outros.
3. Mexer nele marca os 4 parâmetros como manuais (§6.5); mexer num controle individual depois
   **não** move o slider de volta — o slider passa a exibir estado "misto".
4. Abre procedência: a gaveta mostra o que cada parâmetro virou e por quê.
5. Não contorna bloqueio nem limite físico (§6.4).

### 6.4 Limite físico durante a edição

A edição manual **não pode furar limite físico em silêncio** (P11):

- ao arrastar/digitar acima de `maxRPM` ou `maxFeed` do perfil de máquina, o controle **para no
  limite** e mostra o motivo;
- ultrapassar exige ação explícita de override, e o resultado passa a carregar a marca de que foi
  forçado (registrada também no histórico e no favorito, se salvo);
- estado **bloqueado** (hoje `L/D > 6`) não é contornável por edição de resultado: com o bloqueio
  ativo, os controles de edição ficam inertes e a mensagem explica que o caminho é mudar a
  ferramenta ou o balanço, não o número.

### 6.5 Marca de valor manual e caminho de volta

- Todo parâmetro que divergir do recomendado exibe badge `manual` (padrão já existente em produção).
- Todo controle manual tem **botão de retorno ao recomendado** ao lado — sem ele a edição vira
  armadilha: o operador perde a referência e não consegue voltar sem recarregar a tela.
- Um botão único **"voltar tudo ao recomendado"** no rodapé do bloco de ajuste fino.
- Favoritos e histórico gravam o valor manual **e** o recomendado da época, para o snapshot ser
  interpretável depois.

### 6.6 Quando o recálculo acontece — ✅ **DECIDIDO (14/08/2026): modelo híbrido**

| Fonte | Regra |
|---|---|
| `CLAUDE.md` Regra Crítica 7 | store não auto-recalcula; usuário clica em Simular |
| Código real de produção | `liveCalculationEnabled` liga **depois do primeiro Calcular**; a partir daí tudo recalcula ao vivo. Sliders de override recalculam **sempre** |
| Contrato do Gauntlet v2 (`R03`) | mexer no ajuste fino **não** recalcula: resultado fica velho (`stale`, opacidade 0,6) até clicar em Calcular |

O modelo do código real é o mais coerente com a intenção do Mestre e é o que este documento adota:

> **Primeiro Calcular é compromisso consciente; depois dele, o painel é vivo.**
> Antes do primeiro cálculo, mudar campo apenas zera o resultado. Depois do primeiro cálculo,
> qualquer mudança de parâmetro **ou** edição de resultado recalcula na hora, sem clique extra.
> O botão Calcular permanece na tela (nunca some, nunca desabilita): ele grava histórico e é o
> ponto de retorno quando o operador quiser reancorar.

Consequência direta: o cenário `R03` do Gauntlet contradiz esta diretriz e precisa ser reescrito
(§13). O estado `stale` continua existindo, mas só para a janela entre uma mudança e o resultado
novo — não como estado de espera por clique.

---

## 7. Colapso em gaveta — blocos de entrada

Intenção do Mestre (ponto 4): blocos colapsáveis para o operador manter aberto só o que interessa.

### 7.1 Regras

1. **Todo bloco de entrada é colapsável** por cabeçalho clicável, com `aria-expanded` no controle e
   alvo de ≥44px.
2. **Cabeçalho recolhido mostra resumo do conteúdo**, não só o título: `Geométrico — Ø10 · Z4 · L30`.
   Gaveta que esconde valor sem resumo troca poluição visual por cegueira; é o erro clássico do
   accordion em HMI.
3. **Estado por bloco persiste** (localStorage), como já é padrão no projeto.
4. **Bloco com campo inválido ou obrigatório vazio não recolhe** e, se estiver recolhido quando o
   erro aparecer, **abre sozinho** — erro escondido em gaveta é erro que não existe para o operador.
5. Recolher um bloco **nunca** altera valor nem cálculo: é só apresentação.
6. O bloco de Ação (Calcular) e o painel de resultados **não** são colapsáveis.

### 7.2 Teto de gavetas

Máximo **4 gavetas** no painel de configuração (Contexto, Categórico, Geométrico, Ajuste fino).
Sub-grupos (como os dois do bloco Categórico, §3.1) são separados por rótulo, não por gaveta
aninhada — gaveta dentro de gaveta multiplica cliques e esconde estado.

### 7.3 Estado inicial

| Bloco | Primeiro acesso | Depois |
|---|---|---|
| Contexto | **expandido** | conforme escolha do operador |
| Categórico | expandido | idem |
| Geométrico | expandido | idem |
| Ajuste fino | expandido | idem |

"Contexto começa expandido" é decisão travada: dois cenários de teste preenchem campos dentro dele e
`page.fill` falha em elemento oculto (PLAN_GAUNTLET §13.5, item 1). Qualquer default recolhido exige
que os cenários abram a gaveta antes de preencher — mudança de suíte, não de tela.

---

## 8. Ajuda contextual em gaveta — ajuste fino

Intenção do Mestre (ponto 5): a explicação de cada parâmetro deve ser **parte do elemento de
configuração**, aberta por botão de ajuda ao lado do controle, e poder **ficar aberta** enquanto o
operador ajusta.

### 8.1 Forma

- Gatilho `ⓘ` de 24px com **área de toque de 44px**, ao lado do rótulo do parâmetro
  (`.disclosure` e `.prov` mediram 34px no ensaio — abaixo do exigido; corrigir).
- Padrão **Disclosure** do WAI-ARIA APG: `aria-expanded` no botão, `aria-controls` apontando para o
  painel, painel com `aria-live="polite"`, **nunca** `role="tooltip"`.
- **Abre por clique**, nunca só por hover — `param-explanation.tsx` em produção abre por hover no
  desktop, e por isso quem navega por teclado nunca consegue abrir. Não copiar esse componente.
- A gaveta **empurra o layout** (inline, dentro do bloco), não flutua sobre ele: conteúdo que
  flutua se fecha ao interagir com o slider, que é exatamente o momento em que o operador quer ler.
- **Várias gavetas de ajuda podem ficar abertas ao mesmo tempo** — é o pedido explícito do Mestre e
  a razão de ser da forma inline. Isso substitui a regra "uma aberta por vez" e o "fecha ao clicar
  fora" do padrão popover (§13).
- Fecha por clique no próprio gatilho e por `Esc` quando o foco está dentro dela.
- Estado das gavetas de ajuda **não** persiste entre sessões (diferente das gavetas de bloco, §7.1):
  ajuda é consulta pontual.

### 8.2 Conteúdo — estrutura de 4 partes, textos já validados

Cada gaveta traz: **o que é** · *aumentar:* · *diminuir:* · *equilíbrio:*. Os textos de Vc, fz, ae e
ap vêm de `src/components/fine-tune-panel.tsx:30-51`, já validados em produção — usar, não reescrever.
O texto de **fn** não existe em produção e precisa ser escrito na mesma estrutura antes de entrar.

### 8.3 Extensão futura (não neste escopo)

Quando a vida de ferramenta relativa entrar (PLAN_MOTOR §2), a gaveta de Vc passa a mostrar o preço
do ajuste em número: *"+20% de Vc ≈ metade da vida da aresta"*. É a ligação mais direta entre ajuste
e consequência que o produto pode ter, e depende só do expoente `n` de Taylor com fonte citada.

---

## 9. Modo Rápido

Intenção do Mestre (ponto 7): o modo rápido deve pedir só o essencial de uma calculadora genérica de
RPM e avanço, refletindo o que calculadoras validadas do mercado pedem.

### 9.1 Defeito do modo rápido atual

Hoje o modo rápido esconde tudo menos material da peça, diâmetro e operação, e assume
`Z = 4`, `ap = 2`, `ae = 2`, `L = 30`, metal duro (mockup `:34-36`, `:1204-1234`).

**`Z` fixo em 4 é um erro de resultado, não de conveniência:** com uma fresa de 2 cortes, o avanço
sai **o dobro** do correto; com uma de 6, sai um terço. O avanço é `fz × Z × n` — `Z` é fator direto.
Um modo rápido que erra o avanço por fator 2 é pior que não ter modo rápido, porque o número parece
plausível.

### 9.2 O que as calculadoras de referência pedem

Consulta a fabricantes e calculadoras de mercado (Sandvik Coromant, Kennametal, FSWizard,
Engineers Edge, Omni) converge num conjunto mínimo idêntico:

| Entrada | Presente em | Papel |
|---|---|---|
| Velocidade de corte `Vc` (ou material que a determina) | todas | define `n` |
| Diâmetro `D` (ferramenta; peça no torneamento) | todas | define `n` |
| Nº de arestas/flautas `Z` | todas as de fresamento | define `Vf` |
| Avanço por dente `fz` (chip load) | todas as de fresamento | define `Vf` |

Saída mínima universal: `n = Vc × 1000 / (π × D)` e `Vf = fz × Z × n`.

**Fontes consultadas (14/08/2026):**
[Sandvik Coromant — Milling formulas and definitions](https://www.sandvik.coromant.com/en-us/knowledge/machining-formulas-definitions/milling-formulas-definitions) ·
[Sandvik Coromant — Machining calculator app](https://www.sandvik.coromant.com/en-us/knowledge/machining-calculators-apps/machining-calculator-app) ·
[Kennametal — Speeds and Feeds Calculator](https://www.kennametal.com/us/en/resources/engineering-calculators/miscellaneous/speed-and-feed.html) ·
[FSWizard — Speed and Feed Calculator](https://app.fswizard.com/speed-and-feed-calculator) ·
[Engineers Edge — Machining Feeds and Speeds](https://www.engineersedge.com/calculators/machining-cutting-speeds-calc.htm) ·
[Omni — Speeds and Feeds Calculator](https://www.omnicalculator.com/physics/speeds-and-feeds)

### 9.3 Especificação do Modo Rápido

**Campos (4):**

| # | Campo | Origem do valor | Editável |
|---|---|---|---|
| 1 | Material da peça | tabela de materiais → `Vc` e `fz` de partida | sim |
| 2 | Diâmetro `D` | operador | sim |
| 3 | Nº de arestas `Z` | operador (default pelo tipo, quando houver tipo escolhido) | sim |
| 4 | Operação (desbaste/semi/acabamento) | seleciona a coluna de `Vc`/`fz` | sim |

`Vc` e `fz` aparecem como **valores derivados visíveis e ajustáveis** (não como campos obrigatórios):
o operador que sabe o Vc do catálogo digita direto; quem não sabe usa o da tabela.

**Saída (2 números + procedência):** RPM e Avanço, com a fórmula e os valores substituídos.

**O que o Modo Rápido não mostra:** potência, torque, MRR, saúde da ferramenta, L/D e qualquer
semáforo derivado de `ap`/`ae`. Sem profundidade e engajamento esses números não existem — exibi-los
seria violar P5 e P6. Em vez disso, a tela diz em uma linha: *"Modo Rápido calcula rotação e avanço.
Para potência, torque e verificação de segurança, use o modo completo."*

**Transparência das premissas:** o que o modo assume (substrato metal duro, tabela de material
usada) aparece escrito na tela, não em comentário de código.

**Transição sem perda:** ao sair do Modo Rápido, material, `D`, `Z` e operação **permanecem
preenchidos** no modo completo. O modo rápido é uma porta de entrada, não um beco.

**Identificação no resultado e no histórico:** entrada calculada em Modo Rápido fica marcada como
tal — comparar depois um número "rápido" com um número completo sem saber a origem gera desconfiança
no produto inteiro.

---

## 10. Cor, estado e seleção

Intenção do Mestre (ponto 6): a cor principal de seleção deve ser o laranja.

### 10.1 Situação

O mockup atual **já usa laranja** como acento (`--accent: #E85D04`), herdado da paleta placeholder do
FlowNC. O refactor visual em curso substitui essa paleta pelos tokens do ToolOptimizer, e nessa
paleta **não existe laranja**: `#F97316` está explicitamente **aposentado** com motivo registrado —
*"identidade por matiz do `ap`, colide com aviso"* (`scripts/check-tokens.mjs`, `DS_TEMA_CLARO.md`
§3.4). Ou seja, o pedido é para **não perder** o laranja que está na tela hoje.

### 10.2 O conflito

O princípio central do Design System é **"neon é marca, área de trabalho é cinza, cor é estado"**. Na
rampa de estado, a família laranja/âmbar é **atenção** (`#7A4F00` sobre `#FDF3E2`). Usar laranja
também como cor de seleção põe o mesmo matiz em dois papéis: o operador deixa de saber, no relance,
se o laranja na tela quer dizer *"este campo está selecionado"* ou *"este parâmetro está em alerta"*.
É exatamente a patologia que o DS foi escrito para eliminar (`DS_TEMA_CLARO.md` §P2).

Há ainda um custo mecânico: `scripts/check-tokens.mjs` é o executor da categoria 7 e do gate 9 do
julgamento. Qualquer hex fora da lista reprova o ciclo automaticamente.

### 10.3 ✅ Decisão (15/08/2026): laranja é marca, índigo é seleção

Laranja entra **como marca**, nunca como estado. Seleção e foco passam a usar **índigo `#3730A3`** —
não o `#005E77`, que fica reservado para "informação" na rampa de estado.

| Papel | Token | Onde aparece | Contraste medido (sobre `#F3F4F6`) |
|---|---|---|---|
| Marca | `#E85D04` | logo, cabeçalho, preenchimento do botão Calcular | — (é preenchimento, não texto) |
| Texto sobre a marca | `#0F1419` | letra do botão Calcular | **5,29:1** sobre o laranja |
| **Seleção / foco** | **`#3730A3`** | rádio e botão segmentado escolhido, borda de campo ativo, anel de foco | **9,03:1** |
| Atenção (estado) | `#7A4F00` | alerta de atenção | 6,48:1 |
| Informação (estado) | `#005E77` | mensagens informativas | 6,65:1 |

**Por que índigo:** é a família de matiz mais distante das quatro cores de estado (verde, âmbar,
vermelho, teal) e faz par frio-quente com o laranja da marca. Nenhum estado do sistema usa violeta,
então "selecionado" não pode ser confundido com nenhuma condição de processo.

**Regra que não muda:** laranja **nunca** marca estado de campo, de parâmetro ou de resultado. Se um
elemento laranja aparecer fora de marca/ação principal, é defeito.

**Achado da medição — corrigir junto:** o laranja `#E85D04` com **texto branco** dá **3,50:1**,
abaixo do mínimo AA. O botão Calcular leva letra escura (`#0F1419`), não branca.

**Alterações necessárias:** `DS_TEMA_CLARO.md` §3.3 e §3.5 (novos tokens de marca e de seleção),
`scripts/check-tokens.mjs` (incluir `#E85D04` e `#3730A3` em `PERMITIDOS`; o halo de foco em
`rgba()` acompanha o índigo), e revalidação dos pares no cenário `R14`.

---

## 11. Estados do painel

### 11.1 Vazio (antes do primeiro cálculo)

Herói mostra `—`, sem timestamp, sem gauges, sem zeros. Uma chamada curta orienta a ação
("Configure e clique em Calcular"). Nenhum número inventado em lugar nenhum.

### 11.2 Velho (`stale`)

Enquanto o resultado novo não chega, os **números** recebem tratamento de desatualizado
(opacidade reduzida). **Alerta e chip de nível não recebem `stale`** — apagar alarme ativo contraria
a ISA-101 (PLAN_GAUNTLET §13.5, item 6).

### 11.3 Bloqueado

Bloqueio duro (hoje `L/D > 6`) mostra a razão, o valor medido, o limite e **o que fazer** — não só
"bloqueado". Edição de resultado fica inerte (§6.4).

### 11.4 Forçado (override de limite físico)

Resultado calculado com limite físico ultrapassado por decisão explícita fica marcado como forçado
no painel, no histórico e no favorito. A marca não some ao recalcular por outro motivo.

### 11.5 Estimado

Material sem dado verificado mantém o badge `estimado` visível enquanto a linha for estimativa
(PLAN_MOTOR §4).

---

## 12. Acessibilidade e uso em chão de fábrica

| Requisito | Valor |
|---|---|
| Alvo de toque mínimo | 44px — inclusive `ⓘ` de ajuda e gatilho de procedência |
| Contraste de texto | AA (4,5:1); anel de foco ≥3:1 |
| Foco visível | em **todo** elemento alcançável por teclado; declarado em `:focus`, não só `:focus-visible` |
| Ação por teclado | tudo que se faz com mouse se faz com teclado, incluindo abrir ajuda e ajustar sliders |
| Hover | nunca é o único caminho para uma informação ou ação |
| Rede | zero requisições; fonte local, ícones SVG inline |
| Movimento | `prefers-reduced-motion` zera as animações |

---

## 13. Impacto no loop Gauntlet v2 — o que precisa ser reaberto

O item 17 do backlog está com **E1 fechada, `FREEZE.json` gravado e E2 pronto para começar**. As
diretrizes deste documento mudam contrato e suíte, e por isso **não podem ser entregues pelo
Construtor dentro de um ciclo** — contrato, testes e dados são congelados por SHA-256; alterá-los
dentro do ciclo derruba a validação de integridade. Tudo abaixo é trabalho de Orquestrador, feito
**antes** do E2, com recaptura de goldens e regravação do freeze.

| Diretriz | Artefato afetado | Natureza da mudança |
|---|---|---|
| §3.2 remoção do campo material da ferramenta | `select-material-ferramenta` **some da tela** — usado pelos 23 cenários de regressão e pelo `R13` | **a maior mudança de suíte deste conjunto**: todo cenário que escolhe material da ferramenta passa a escolher a ferramenta correspondente |
| §3.2.1 rótulo "Tipo de Usinagem" | contrato §2 · rótulos | `data-testid="select-familia"` **é mantido** |
| §4.2 catálogo com material embutido | região `DADOS` do mockup (`TOOLS`, `FAMILIAS`, `TOOL_FACTORS`) · **todos os goldens** | **mexe em dados congelados** — recaptura completa e conferência campo a campo |
| §4.2 fusão `broca_hss`/`broca_md` | idem, mais ângulos de ponta por substrato | absorvida pelo catálogo |
| §6 recálculo ao vivo | **`R03` contradiz** — precisa ser reescrito | mudança de comportamento declarado |
| §6.3 política de gauge | contrato §7 · cenário novo | depende da decisão §14.2 |
| §7 blocos colapsáveis | cenários que preenchem campos (`page.fill` falha em oculto) | abrir gaveta antes de preencher |
| §8 ajuda inline, várias abertas | **`R06` contradiz** ("uma por vez", "fecha fora") | reescrever cenário |
| §9 modo rápido com `Z` | contrato · `T23` · goldens do modo rápido | recaptura |
| §10 laranja | `check-tokens.mjs` (`PERMITIDOS`) · `R14` | só se a decisão for B ou C |

**Sequência segura:** decidir §14 → reescrever contrato e cenários → recapturar os 54 goldens e
conferir campo a campo o que mudou → `node scripts/freeze.mjs` → só então iniciar o E2.

---

## 14. Decisões pendentes do Mestre

Cada item traz a recomendação e o critério. Nenhum é bloqueio para escrever código de tela — todos
são bloqueio para **congelar o contrato do próximo ciclo**.

1. ✅ **Momento do recálculo (§6.6) — DECIDIDO em 14/08/2026: modelo híbrido.** Formulário até o
   primeiro Calcular; painel vivo depois dele. *Critério:* é o comportamento que o operador já tem em
   produção e o único que sustenta o ajuste dinâmico da §6. **Consequência:** `R03` é reescrito antes
   do E2, pelo Orquestrador.
2. ✅ **Ajuste pelo gauge (§6.3) — DECIDIDO em 14/08/2026: opção A, slider de agressividade.**
   Gauges seguem read-only; um controle único "conservador ↔ produtivo" move os 4 parâmetros.
   *Critério:* não faz o sistema escolher a estratégia de usinagem no lugar do operador e é
   reproduzível. **Consequência:** cenário novo no Gauntlet + contrato §7.
3. ✅ **Laranja (§10) — DECIDIDO em 15/08/2026.** Laranja `#E85D04` como marca (logo, cabeçalho,
   botão Calcular com letra `#0F1419`); seleção e foco em **índigo `#3730A3`** (9,03:1), não em
   `#005E77`. *Critério:* mantém a identidade sem pôr o matiz de "atenção" no papel de "selecionado",
   e afasta a seleção do teal de "informação". **Consequência:** DS §3.3/§3.5, `check-tokens.mjs` e
   `R14` mudam antes do E2.
4. ✅ **Material da ferramenta (§3.2, §4) — DECIDIDO em 15/08/2026: o campo deixa de existir.**
   O substrato passa a fazer parte do nome da ferramenta no seletor, uma entrada por variação real de
   mercado. *Critério:* ferramenta e substrato andam juntos na oficina; um campo a menos por
   configuração e combinação impossível deixa de ser representável. Junto: **"Família de Operação"
   passa a se chamar "Tipo de Usinagem"** (§3.2.1). **Consequência:** é a mudança mais cara em suíte
   e goldens — ver §13.
5. ✅ **Granularidade do revestimento (§4.2) — DECIDIDO em 15/08/2026: separar só no inteiriço.**
   Geometria inteiriça lista MD revestido **e** MD (o operador sabe qual tem na mão — vem declarado na
   embalagem); geometria pastilhada lista uma entrada só, revestida, que é o padrão de fábrica.
   *Critério:* o revestimento vale 25% de Vc (`1,00` → `1,25`); esconder essa diferença onde ela é
   conhecível empurraria o erro para o lado que queima a ferramenta.

---

## 15. Fora de escopo, com motivo

| Item | Por que não |
|---|---|
| Análise de chatter / lóbulos de estabilidade | exige dados modais (FRF) da combinação máquina + fixação + ferramenta, que não temos e não dá para estimar |
| Deflexão em µm, vida de ferramenta, custo/peça, materiais 30+ | são **motor**, não painel — `PLAN_MOTOR_CALCULADORA_V2.md`. O painel só precisa reservar o lugar onde esses números vão aparecer |
| Múltiplos perfis de máquina persistidos | previsto no motor (§6 do PLAN_MOTOR); o painel entrega o perfil único editável agora |
| Unidades imperiais (SFM, IPM, polegada) | nenhuma fonte do projeto pede; entra só com decisão de produto explícita |
| Torneamento como família | fora das 4 famílias atuais; o modelo declarativo por família (SPEC §5) já suporta a adição sem reescrever o painel |

---

## 16. Documentos relacionados

| Documento | Papel |
|---|---|
| `docs/specs/SPEC_CALCULADORA_MULTI_FERRAMENTA.md` | arquitetura funcional por família; mapeamento do sistema atual |
| `docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md` | o loop que executa o refactor visual e a blindagem anti-trapaça |
| `gauntlet-calculadora-cnc-v2/research/BUILD_CONTRACT_REFACTOR.md` | contrato do Construtor — precisa absorver este documento antes do E2 |
| `docs/plans/PLAN_MOTOR_CALCULADORA_V2.md` | tudo que exige mexer em cálculo |
| `docs/design/DS_TEMA_CLARO.md` | fonte única de cor, tipografia e forma |
| `gauntlet-calculadora-cnc-v2/tests/TESTID_CONTRACT.md` | contrato de seletores que a suíte lê |
