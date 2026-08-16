# Design System ToolOptimizer CNC — Tema Claro (CANÔNICO)

> **Status:** fonte única de verdade visual do tema claro. Criado em 13/08/2026.
> **Precedência:** este documento vence `DASHBOARD.md`, `UI_BRANDING.md` e `UI_DESIGN_SPEC_FINAL.md`
> em qualquer divergência. Os três passam a ser **derivados** (ver §9).
> **Escopo:** tema claro. O tema escuro de produção (`src/index.css`) continua válido e não é
> alterado por este documento — a aplicação em `src/` é etapa separada (E5 do plano de refactor).
> **Verificação:** todos os contrastes abaixo são checados por script na suíte Playwright do loop.
> Número que não bate, quebra o build. Nada aqui é "aproximadamente".

---

## 1. Por que este documento existe

Auditoria de 13/08/2026 encontrou dez problemas. Os quatro que mandam:

| # | Problema | Onde |
|---|---|---|
| P1 | **Quatro fontes de token divergentes, nenhuma canônica** | `src/index.css:3-21` (única que define o semáforo), `DASHBOARD.md:10-17`, `UI_BRANDING.md:7-12`, `UI_DESIGN_SPEC_FINAL.md:7-13` |
| P2 | **Uma cor com três significados ao mesmo tempo** | `#00D9FF` = marca + rotação + botão de ação · `#39FF14` = marca + avanço + "sucesso" · `#F97316` = parâmetro `ap` + aviso |
| P3 | **Cinco rampas de estado concorrentes** | `seg-*` (`#2ecc71/#f39c12/#e74c3c`) · gauge (`#FF4D4D/#FFA500/#00E676`) · barra fine-tune · FlowNC no mockup · `accent-orange` como aviso |
| P5 | **O neon não sobrevive a fundo claro** | `#00D9FF` sobre `#F3F4F6` dá **1,5:1**; `#39FF14` dá **1,2:1**. O mínimo legível é 4,5:1 |

P2 e P3 são o mesmo problema visto de dois ângulos: **identidade e estado dividindo matiz**. Num
tema escuro saturado isso passa. Num painel industrial de fundo claro, onde a norma ISA-101 reserva
cor para anomalia, isso quebra — o operador não sabe se o laranja significa "profundidade axial" ou
"cuidado".

Divergência adicional registrada: `UI_BRANDING.md:23` manda os sliders atualizarem os números em
tempo real, e a Regra Crítica 7 do `CLAUDE.md` do projeto manda o contrário (só recalcula no
clique). **Vale a Regra Crítica 7** — é mais recente e está implementada.

---

## 2. A regra que amarra tudo

> **Neon é marca. Área de trabalho é cinza. Cor é estado.**

- **Marca** (`#E85D04`) vive no cabeçalho, na identidade e no botão principal de ação. Nada mais.
- **Seleção e foco** (`#3730A3`) vivem no controle escolhido e no anel de foco. Nada mais.
- **Área de entrada e área de resultado** vivem em escala de cinza.
- **A única cor que aparece na área de trabalho é a do semáforo**, e ela significa uma coisa só:
  condição do processo.
- **Identidade de parâmetro não usa matiz.** `Vc`, `fz`, `ae` e `ap` se distinguem por rótulo,
  posição e ordem — nunca por cor própria. A cor que aparece na barra de cada um é o **estado**
  daquele parâmetro.

Isso aposenta de uma vez o roxo de `ae` e o laranja de `ap`, que colidia com a cor de aviso.

**Fidelidade à marca é medida por família de matiz, tipografia e forma — nunca por saturação
literal em toda superfície.** Onde fidelidade e legibilidade brigarem, **legibilidade ganha**.

---

## 3. Tokens

### 3.1 Superfícies (três níveis)

| Token | Valor | Uso |
|---|---|---|
| `--bg-page` | `#F3F4F6` | fundo da página |
| `--surface-card` | `#FFFFFF` | cartão, painel, zona de resultado |
| `--surface-input` | `#E9EBEF` | campo de entrada, select, área editável |
| `--border-subtle` | `#D1D5DB` | separador e borda decorativa |
| `--border-control` | `#7A8494` | borda de controle interativo — **3,8:1** sobre branco e **3,4:1** sobre a página |
| `--shadow-card` | `0 1px 2px rgba(16,24,40,.06), 0 4px 12px rgba(16,24,40,.08)` | elevação de cartão |

Três níveis, sempre nessa ordem de claridade: página (mais escura) → cartão (branco) → campo
(cinza claro). O campo é a única superfície que "afunda" — é o que dá a leitura de "aqui eu digito".

### 3.2 Texto (três níveis)

| Token | Valor | Contraste sobre branco | Uso |
|---|---|---|---|
| `--tx-1` | `#111827` | **17,6:1** | número principal, título, valor |
| `--tx-2` | `#374151` | **9,3:1** | corpo, rótulo |
| `--tx-3` | `#475569` | **6,8:1** | unidade, legenda, procedência |

`#6B7280` foi **rejeitado**: 4,45:1 sobre a página, abaixo do mínimo de 4,5:1.

### 3.3 Marca e seleção

Decisão de 15/08/2026 (`SPEC_PAINEL_CALCULADORA_PARAMETROS.md` §10.3): **laranja é marca, índigo é
seleção**. Laranja nunca marca estado; se um elemento laranja aparecer fora de marca ou ação
principal, é defeito.

| Token | Valor | Regra | Contraste |
|---|---|---|---|
| `--brand-fill` | `#E85D04` | **só como preenchimento**: logo, cabeçalho, botão Calcular. Com `--tx-on-brand` por cima. Nunca como texto, ícone, borda fina ou estado | — |
| `--tx-on-brand` | `#0F1419` | letra do botão Calcular e de qualquer superfície de marca | **5,29:1** sobre o laranja |
| `--select-ink` | `#3730A3` | **seleção e foco**: rádio/segmentado escolhido, borda de campo ativo, anel de foco | **9,03:1** sobre a página · **9,9:1** contra branco por cima |
| `--ink-primary` | `#005E77` | marca legível e "informação" da rampa de estado: texto, ícone, borda | **6,65:1** |

Índigo é a família de matiz mais distante das quatro cores de estado (verde, âmbar, vermelho, teal),
então "selecionado" nunca é confundido com "condição do processo". Texto branco sobre `#E85D04` dá
**3,50:1** e reprova — por isso a letra do botão Calcular é escura.

`#00D9FF` deixa de ter papel no tema claro: a marca passou para o laranja e a legibilidade continua
em `--ink-primary`. Ele segue válido no tema escuro (§8).

`#39FF14` **sai do sistema no tema claro.** Ele era simultaneamente marca, avanço e "sucesso" — e
dá 1,2:1 sobre fundo claro, o pior número da paleta inteira. Onde ele significava "bom", agora é o
verde de estado (§3.4). Onde significava "avanço", agora é rótulo.

### 3.4 Estado — uma rampa, e só ela

Mesmas matizes da produção, escurecidas até sobrarem margem sobre fundo claro **e** sobre a própria
tinta de fundo:

| Nível | `-ink` | Sobre página | `-bg` | `-bd` |
|---|---|---|---|---|
| ok | `#116631` | **6,4:1** | `#E8F5EC` | `#A8D5B8` |
| atenção | `#7A4F00` | **6,5:1** | `#FDF3E2` | `#E3C98A` |
| crítico | `#A81E16` | **6,7:1** | `#FCEBEA` | `#EFB3AE` |
| informação | `#005E77` | **6,7:1** | `#E6F1F6` | `#A8CEDD` |

Informação e marca legível são **o mesmo token** (`#005E77`) — dois valores quase idênticos com
nomes diferentes é como a bagunça começou.

Esta rampa é usada por: semáforo, ponteiros e barras dos gauges, barra de estado de cada
parâmetro, badges e mensagens. **Não existe segunda rampa.** As antigas ficam aposentadas:

| Aposentada | Onde estava | Motivo |
|---|---|---|
| `#2ecc71 / #f39c12 / #e74c3c` | `src/index.css:11-13` | 1,9:1 · 2,0:1 · 3,5:1 sobre fundo claro |
| `#00E676 / #FFA500 / #FF4D4D` | `half-moon-gauge.tsx:36-38` | rampa paralela só para o gauge |
| `#A855F7` (roxo `ae`) | `src/index.css:10` | identidade por matiz, sem função no claro |
| `#F97316` (laranja `ap`) | `src/index.css:9` | identidade por matiz colidindo com aviso |

### 3.5 Foco, desabilitado, hover

| Token | Valor |
|---|---|
| `--focus-ring` | `outline: 2px solid #3730A3; outline-offset: 2px` + `box-shadow: 0 0 0 3px rgba(55,48,163,.35)` |
| `--surface-hover` | `#DDE1E7` (campo) · `#F7F8FA` (cartão clicável) |
| `--surface-pressed` | `#CFD4DC` |
| `--tx-disabled` | `#8A93A0` · `--surface-disabled` `#EDEFF2` · cursor `not-allowed` |
| `--scrim` | `rgba(16,24,40,.45)` |

O anel de foco tem **duas camadas de propósito**: o traço `#3730A3` garante os 3:1 exigidos com
folga (9,03:1), e o halo índigo translúcido amplia a área percebida sem depender dele para
legibilidade. Foco e seleção compartilham a mesma matiz de propósito — é o mesmo significado
("este é o elemento em que estou").

### 3.6 Tipografia

Quatro tamanhos de texto (teto do ISA-101) + um numérico:

| Papel | Tamanho | Peso | Família |
|---|---|---|---|
| rótulo, unidade, legenda | 11px | 600 | sans |
| corpo, campo, botão | 13px | 400/600 | sans |
| título de bloco | 16px | 600 | sans |
| destaque secundário | 20px | 700 | mono |
| **número principal** (rotação, avanço) | 32px | 700 | mono |

**Pilha local, zero rede:**

```css
--font-sans: Inter, "Segoe UI Variable", "Segoe UI", system-ui, -apple-system, sans-serif;
--font-mono: "JetBrains Mono", "Cascadia Mono", Consolas, ui-monospace, monospace;
```

Nada de `<link>` para Google Fonts: numa oficina sem internet a tela abriria com fonte errada e
saltaria o layout. As máquinas Windows do chão de fábrica têm Segoe UI e Consolas de fábrica.
Empacotar `woff2` próprio é tarefa do app real, não do mockup.

Números sempre em mono com `font-variant-numeric: tabular-nums` — dígito que não dança quando o
valor muda.

### 3.7 Espaçamento, raio, movimento

- Espaçamento: `4 · 8 · 12 · 16 · 24 · 32 · 48`
- Raio: `2` (chip) · `4` (campo) · `8` (cartão) · `999` (pill)
- Transição: `120ms` (estado de controle) · `180ms` (painel) · `280ms` (ponteiro de gauge)
- Alvo de toque: **44px** mínimo; botão principal **56px** — operação com luva
- `@media (prefers-reduced-motion: reduce)` desliga tudo

### 3.8 O que não existe no tema claro

- **Glass** (`rgba(255,255,255,.85)` + blur). Sobre fundo chapado não produz efeito nenhum e só
  reduz contraste. Elevação é borda + sombra.
- **Glow neon** (`shadow-neon-cyan`). Vira borrão cinza. Ênfase é peso, tamanho e posição.
- **Orbs de gradiente com `blur(150px)`** no fundo. Decoração pura, proibida por ISA-101.
- **Ícone por fonte externa** (Material Symbols). Todo ícone é SVG inline.

---

## 4. Componentes

### 4.1 Escolha segmentada (`.segmented-choice`)

Substitui `<select>` onde há **≤5 opções**. Dropdown custa duas ações (abrir + escolher); botão
custa um clique. Acima de 5 opções, ou com rótulo longo, o `<select>` fica.

Radio nativo + label estilizado — sem JavaScript de alternância, o que preserva teclado e leitores
de tela de graça.

| Estado | Fundo | Borda | Texto |
|---|---|---|---|
| inativo | `#FFFFFF` | `--border-control` | `--tx-2` |
| hover | `rgba(55,48,163,.06)` | `--select-ink` | `--tx-1` |
| **ativo** | `--select-ink` | `--select-ink` | `#FFFFFF` (**9,9:1**) |
| foco | — | `--focus-ring` | — |

Grade de no máximo 4 por linha, altura mínima 44px, 13px peso 600.

### 4.2 Ajuda contextual — toggletip, não tooltip

Padrão consagrado, não caseiro: **Disclosure do WAI-ARIA APG** (W3C) para a mecânica,
**toggletip** (Inclusive Components) para o conteúdo sob demanda, e a forma produtizada do
**definition tooltip do IBM Carbon** / **rich tooltip do Material 3**.

- Gatilho: ícone `ⓘ` de 24px, área de toque 44px, ao lado do rótulo — não um botão caixa-alta de
  largura total.
- `aria-expanded` no botão, `aria-controls` apontando para o painel.
- Painel em região `aria-live="polite"` — **não** `role="tooltip"`, que é para rótulo, não para
  explicação.
- **Abre por clique.** Nunca só por hover.
- Fecha com `Esc` e com clique fora. Um aberto por vez.
- Largura máxima 280px, seta apontando para o gatilho, `--surface-card` com `--border-control`.

O componente atual de produção (`param-explanation.tsx:13-15`) abre por hover no desktop e por
clique só no mobile — resultado: **quem navega por teclado nunca consegue abrir**. Ele também usa
`role="tooltip"` sem `aria-describedby`, não fecha com `Esc` e não fecha ao clicar fora. Copiá-lo
importaria o defeito; por isso o padrão acima. Correção do componente real está registrada para a
etapa E5.

### 4.3 Gauge de arco (meia-lua)

Forma herdada de `half-moon-gauge.tsx` — 41 barras, arco de 180°, ponteiro com base circular,
`scaleMax` 150 em modo `centered` e corte em 40%/76% em modo `ascending`. O que muda é só a cor:

- Barra inativa: `--border-subtle`
- Barra ativa: rampa de estado da §3.4
- **Ponteiro: `--tx-1`** (o ponteiro branco de produção some em fundo claro)
- Valor central: mono 32px `--tx-1`

### 4.4 Barra de estado de parâmetro

Segmentos finos (6px, contêiner 10px), sem brilho por segmento, raio 1px. Segmento ativo em cor de
estado a 100% de opacidade; percorrido a 22%; nunca alcançado a 8%. A diferenciação é por
**opacidade e posição**, nunca por matiz nova.

### 4.5 Campo numérico

`--surface-input` sobre `--surface-card`, borda `--border-control`, texto `--tx-1` em mono, unidade
em `--tx-3` à direita dentro do campo. Rótulo acima em 11px/600. Erro troca a borda e o texto de
apoio para `crítico`, **e escreve a correção** — nunca só pinta de vermelho.

---

## 5. Contrastes verificados

Medidos contra `--bg-page` `#F3F4F6`, salvo indicação. Mínimo WCAG 2.2 AA: **4,5:1** texto normal,
**3:1** componente de interface e borda funcional.

| Par | Razão | Situação |
|---|---|---|
| `--tx-1` sobre `--surface-card` | 17,6:1 | ✅ |
| `--tx-2` sobre página | 9,3:1 | ✅ |
| `--tx-3` sobre página | 6,8:1 | ✅ |
| `--ink-primary` sobre página | 6,7:1 | ✅ |
| `ok / atenção / crítico -ink` sobre página | 6,4 · 6,5 · 6,7:1 | ✅ |
| `--tx-on-brand` `#0F1419` sobre `--brand-fill` `#E85D04` | **5,29:1** | ✅ |
| `--select-ink` `#3730A3` sobre página | **9,03:1** | ✅ |
| `#FFFFFF` sobre `--select-ink` (segmentado ativo) | 9,9:1 | ✅ |
| `#FFFFFF` sobre `--brand-fill` `#E85D04` | **3,50:1** | ❌ proibido — botão Calcular leva letra escura |
| `--border-control` sobre `--surface-card` | 3,8:1 | ✅ (mínimo 3:1) |
| `#00D9FF` **como texto** sobre página | **1,5:1** | ❌ proibido |
| `#39FF14` **como texto** sobre página | **1,2:1** | ❌ proibido |
| `#2ecc71` (verde antigo) sobre página | 1,9:1 | ❌ aposentado |
| `#f39c12` (âmbar antigo) sobre página | 2,0:1 | ❌ aposentado |
| `#e74c3c` (vermelho antigo) sobre página | 3,5:1 | ❌ aposentado para texto |
| `#6B7280` (cinza candidato) sobre página | 4,45:1 | ❌ rejeitado |

---

## 6. Checklist de conformidade

Aplicável a qualquer tela nova no tema claro:

- [ ] Nenhum `#00D9FF` ou `#39FF14` usado como texto, ícone ou borda
- [ ] Nenhuma cor fora dos tokens desta página
- [ ] `#E85D04` só em marca e ação principal — nunca marcando estado, seleção ou foco
- [ ] Seleção e foco em `#3730A3`; texto sobre laranja sempre `#0F1419`, nunca branco
- [ ] Uma única rampa de estado em toda a tela
- [ ] Área de trabalho em escala de cinza; cor só onde há condição de processo
- [ ] Todo texto ≥ 4,5:1 e toda borda funcional ≥ 3:1
- [ ] No máximo 4 tamanhos de texto
- [ ] Foco visível em 100% dos elementos alcançáveis por teclado
- [ ] Alvo de toque ≥ 44px (botão principal 56px)
- [ ] Zero requisição de rede: sem webfont remota, sem ícone por fonte, sem CDN
- [ ] Nenhum elemento puramente decorativo

---

## 7. Aplicação

| Onde | Quando | Estado |
|---|---|---|
| `gauntlet-calculadora-cnc-v2/mockup/index.html` | agora, no loop de refactor | campo de prova destes tokens |
| `src/index.css` e componentes | etapa E5, **depois** do loop aprovar | não iniciado |
| `param-explanation.tsx` (correção de acessibilidade) | etapa E5 | não iniciado |
| `woff2` de Inter e JetBrains Mono empacotados no app | quando a codificação real começar | documentado em `docs/plans/PLAN_MOTOR_CALCULADORA_V2.md` |

O mockup vem primeiro de propósito: ele é barato de refazer e é julgado contra critério explícito.
Token que não sobrevive ao Juiz cego não chega em produção.

---

## 8. Tema escuro

Fora do escopo deste documento. Quando for feito, a regra da §2 vale igual — o que muda é só a
direção da rampa de superfícies e o recálculo dos `-ink` para o fundo escuro (no escuro os neons
originais **passam** com folga, e é por isso que existiam). O erro a não repetir é derivar um tema
do outro por inversão automática.

---

## 9. Documentos derivados

Passam a ser derivados desta página e **não** definem token:

| Documento | Papel a partir de agora |
|---|---|
| `docs/design/DASHBOARD.md` | protótipo HTML de referência de layout do tema escuro |
| `docs/design/UI_BRANDING.md` | intenção de marca; valores de cor superados por esta página |
| `docs/design/UI_DESIGN_SPEC_FINAL.md` | especificação de tela do tema escuro; já estava desatualizada (prescreve 3 colunas, o código entrega 2) |
| `src/index.css` `@theme` | implementação do **tema escuro**; continua válido para o escuro |

Divergiu? Esta página vence.
