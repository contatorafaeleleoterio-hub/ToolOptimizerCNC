# Design System — Fenix · tema claro

**O que é:** a base visual do Fenix. Superfícies, tinta, cor de estado, tipografia, espaço e os
primitivos de interação.

> **Reconciliado em 08/09/2026 contra `Docs_inicial/construcao/prototipo/css/prototipo.css`.**
> Esta página **descreve** os tokens que existem no protótipo; ela não os arbitra. A precedência
> mudou em 08/09/2026, quando o Mestre declarou o `index.html` do protótipo a fonte da verdade do
> painel: **divergiu, o protótipo vence e esta página é que está errada.** Antes desta data as duas
> paletas nunca foram a mesma — só `--brand-fill` coincidia —, e o documento afirmava contrastes que
> ninguém media havia semanas. O registro do que mudou está na §10.
>
> **Contraste não se afirma aqui, se mede lá:** `testes/test_contraste.js`, no protótipo, lê os
> tokens do CSS e afere cada par contra a pior superfície em que ele aparece. A tabela da §6 é a
> saída daquele script, não uma promessa deste documento.

**De onde vem:** herdado do `ToolOptimizerCNC` (`docs/design/DS_TEMA_CLARO.md`), que já custou uma
auditoria de contraste e uma rampa de estado unificada. **Vieram os fundamentos; não veio nada do
painel dele.** O que foi cortado, e por quê, está na §8.

**Tema:** claro, e só. O tema escuro está fora de escopo. Se um dia entrar, a regra da §1 vale igual
e os `-ink` são recalculados — nunca derivados por inversão automática.

**O que este documento não faz:** não define layout, não define hierarquia de tela, não define onde
cada informação mora. Isso é o desenho do painel, e ele será feito do zero contra o
[brief de design](BRIEF_DESIGN_INTERFACE.md).

> **Onde isso mora, desde 08/09/2026:** a estrutura, o catálogo de componentes e o comportamento do
> painel estão especificados em [`design-system/`](design-system/00_LEIA-ME.md), medidos contra o
> protótipo. Aquele conjunto é a camada de estrutura e comportamento; **este documento continua sendo
> a camada de aparência, e vence nela.**

---

## 1. A regra que amarra tudo

> **Marca fica na moldura. Área de trabalho é cinza. Cor é estado.**

- **Marca** (`--brand-fill`, azul-petróleo) vive na identidade, na aba ativa e na seleção. Nada mais.
- **Ação** (`--action-fill`, laranja) vive **só no botão que dispara o cálculo**. Um botão por tela.
- **Seleção e foco** (`--select-ink`) vivem no controle escolhido e no anel de foco. Nada mais.
- **Entrada e resultado** vivem em escala de cinza.
- **A única cor na área de trabalho é a do estado**, e ela significa uma coisa só: condição do processo.
- **Identidade de parâmetro não usa matiz.** `vc`, `fz`, `ae`, `ap` se distinguem por rótulo, posição
  e ordem — nunca por cor própria. A cor que aparecer perto de um deles é o **estado** dele.

Isso vem de norma de painel industrial (ISA-101): cor é reservada para anomalia. Onde fidelidade de
marca e legibilidade brigarem, **legibilidade ganha**.

**Por que marca e ação se separaram (08/09/2026).** Até esta data eram o mesmo token laranja, e a
regra dizia *"marca é uma cor só"*. Com a marca virando azul-petróleo, o laranja perdeu a função de
identidade e ficou com a de **chamar o toque** — papel diferente, token próprio. O espírito da regra
não mudou: continua sendo **uma** cor de identidade e **uma** de ação, nenhuma delas invadindo a área
de trabalho.

**Ressalva resolvida por regra (08/09/2026):** o laranja da ação e o âmbar do estado ATENÇÃO são vizinhos de
matiz (`#A96208` contra `#C4720A`). A colisão potencial foi fechada por regra estrita de desenho: **nenhum botão preenchido de ação dentro da área de resultado** (checklist §9). A ação mora exclusivamente na coluna de configuração/entrada e o estado mora no painel de resultados, impedindo qualquer ambiguidade visual.

---

## 2. Tokens

### 2.1 Superfícies

| Token | Valor | Uso |
|---|---|---|
| `--bg-page` | `#F7F5F1` | fundo da página — creme quente |
| `--surface-card` | `#FFFFFF` | cartão, painel, área de resultado |
| `--surface-card-subtle` | `#EFEFF0` | superfície rebaixada dentro do cartão |
| `--surface-input` | `#FFFFFF` | campo de entrada, área editável |
| `--surface-input-muted` | `#EFEFF0` | campo em leitura, valor derivado |
| `--border-subtle` | `#CDCFD1` | separador, borda decorativa |
| `--border-control` | `#85868A` | borda de controle interativo — **3,16:1** na pior superfície |
| `--shadow-card` | `0 1px 3px rgba(15,23,42,.06), 0 4px 16px -2px rgba(15,23,42,.05)` | elevação |

Ordem de claridade: cartão (branco) → página (creme) → superfície rebaixada. **O campo editável é
branco e o campo em leitura afunda** — é a inversão que produz "aqui eu digito, ali eu só leio".

### 2.2 Texto — três níveis, e só três

| Token | Valor | Pior superfície | Uso |
|---|---|---|---|
| `--tx-1` | `#22252A` | 13,38:1 | número, título, valor |
| `--tx-2` | `#2E3238` | 11,21:1 | corpo, rótulo, texto corrido |
| `--tx-3` | `#696C71` | 4,59:1 | unidade, legenda, **texto de espera do campo** |

**"Pior superfície" é o número que vale:** cada tinta é medida contra a mais escura das três
superfícies em que ela pode cair, nunca só contra o branco. Medir contra o branco é o erro que faz
uma tabela passar no papel e reprovar na tela.

**Não existe um quarto nível para o texto de espera.** Existiu — `--tx-muted` —, e a régua o empurrou
para o mesmo tom de `--tx-3`: abaixo de 4,59:1 não há cinza que passe. Dois tokens com o mesmo valor
prometem uma distinção que a tela não entrega, e um dia alguém edita um e esquece o outro. **A
distinção entre texto de espera e valor digitado é o peso — 400 contra 700 —, nunca a cor.** É a
mesma doutrina do §2.4: cor nunca é o único portador.

### 2.3 Marca, ação e seleção

| Token | Valor | Regra |
|---|---|---|
| `--brand-fill` | `#0F3D5C` | **só como preenchimento** — identidade, aba ativa, faixa do cabeçalho. Nunca como texto, ícone ou borda fina |
| `--brand-hover` / `--brand-active` | `#0C3049` / `#092437` | escurecimento da própria marca |
| `--action-fill` | `#A96208` | **só o botão que dispara o cálculo.** Um por tela |
| `--action-hover` / `--action-active` | `#8F5307` / `#754406` | escurecimento da própria ação |
| `--tx-on-brand` | `#FFFFFF` | tinta sobre marca (**11,40:1**) e sobre ação (**4,73:1**) |
| `--select-ink` | `#0F3D5C` | seleção e foco: opção escolhida, borda de campo ativo, anel de foco — **9,92:1** |
| `--brand-accent` | `#E4BF90` | ícone da aba ativa e selo `S`/`F`, **só sobre o preenchimento da marca** — 6,60:1 ali |
| `--accent-blue` | `#506E82` | texto de botão de apoio e borda do cartão em edição manual — 4,66:1 na pior superfície |

**`--brand-accent` chamava-se `--accent-cyan` e não é ciano:** `#E4BF90` é dourado, matiz 34° — a
mesma família do laranja da ação. O nome descrevia uma cor que o token nunca teve. Ele não colide com
nada porque **só existe sobre o azul-petróleo da marca**, e é isso que o nome agora diz.

**`--accent-blue` era `#57778C` e reprovava:** 4,36:1 sobre a página, 4,13:1 sobre a superfície
rebaixada. Passou despercebido porque parecia decorativo — mas ele é **texto** em três botões de
apoio. Escurecido até 4,66:1 na pior superfície.

**A tinta sobre preenchimento é branca, e isso foi verificado nos cinco tons** (marca, marca em
hover, ação, ação em hover, ação pressionada) — o menor deles é 4,73:1. **Isto inverte a regra
anterior**, que mandava tinta escura porque o laranja de então dava 3,50:1 com branco. O azul-petróleo
não tem esse problema, e o laranja da ação foi escurecido até deixar de ter (§10).

**Seleção compartilha a matiz da marca, de propósito.** A matiz da marca não aparece em nenhuma das
quatro cores de estado, então "selecionado" nunca é lido como "condição do processo" — que é a razão
de existir da regra, e ela sobrevive à troca de matiz.

### 2.4 Estado — uma rampa, e só ela

A rampa tem **três** níveis, e eles são exatamente os três níveis de diagnóstico do produto:

| Nível | `-ink` | Pior superfície | `-bg` | `-bd` | `-accent` | Matiz |
|---|---|---|---|---|---|---|
| **NORMAL** | `#104237` | 9,84:1 | `#ECF3F1` | `#C6DAD6` | `#1B6E5C` | 167° |
| **ATENÇÃO** | `#754406` | 7,07:1 | `#FAF3EB` | `#F0DBC1` | `#C4720A` | 34° |
| **CRÍTICO** | `#6E2A11` | 9,13:1 | `#F9F0EC` | `#EDD0C6` | `#B8461D` | 16° |

O `-accent` é a faixa ou marcador do nível; é elemento gráfico e responde ao mínimo de **3:1**, não ao
de texto. Os três passam, o mais apertado sendo atenção com 3,17:1.

**Informação neutra não é diagnóstico, e por isso não tem cor própria.** Os tokens `--st-info-*`
continuam existindo — chip, etiqueta, marca de valor de fábrica —, mas **apontam para os neutros**:

```css
--st-info-ink: var(--tx-1);  --st-info-bg: var(--surface-card-subtle);
--st-info-bd: var(--border-subtle);  --st-info-accent: var(--tx-3);
```

**Por que isso mudou (08/09/2026).** O `--st-info-accent` era `#0F3D5C` — **hex idêntico ao
`--brand-fill`**. As duas coisas aparecem como barra lateral de 4px: a do cabeçalho Z1 significa
"identidade do sistema", a do cartão de nota significa "informação". Mesma barra, mesma cor, sentidos
diferentes. Neutralizar a informação resolve os dois lados de uma vez: a marca volta a ser a única
coisa naquela cor, e a área de trabalho volta a ter cor **só** onde há condição de processo (§1).

A separação entre a barra de informação e a de marca não é de luminosidade, é de **croma**: 7% de
saturação contra 84%. Cinza ao lado de azul-petróleo se distingue à primeira vista, mesmo em 4px.

**Não existe segunda rampa.** Nem para gráfico, nem para barra, nem para badge, nem para mensagem.

**Cor nunca é o único portador.** Todo nível carrega também rótulo textual e posição fixa.

### 2.6 Desatualizado

Enquanto os números esperam recálculo, eles caem de `--tx-1` para `--tx-3` **e** a região recebe um
marcador textual explícito.

**O alerta e o nível de diagnóstico nunca recebem esse tratamento.** Esmaecer alarme ativo é o oposto
do que um painel industrial deve fazer.

Não use `opacity` para isso: opacidade derruba o contraste abaixo do mínimo, e o número continua na
tela para ser lido.

### 2.7 Foco, hover, pressionado

| Token | Valor |
|---|---|
| anel de foco | `outline: 2px solid var(--select-ink); outline-offset: 2px` + `box-shadow: 0 0 0 3px rgba(15,61,92,.35)` |
| `--surface-hover-field` | `#EFEFF0` |
| `--surface-hover-card` | `#EBEFF1` |
| `--surface-pressed` | `#CDCFD1` |

O anel tem duas camadas de propósito: o traço garante os 3:1 com folga (9,92:1) e o halo amplia a
área percebida sem que a legibilidade dependa dele. **O halo acompanha a matiz do traço** — em 08/09
ele ainda era o índigo da paleta anterior enquanto o traço já era petróleo, e a incoerência foi
corrigida no CSS.

**Não existe token de desabilitado** — ver §7.

### 2.8 Tipografia

Cinco papéis. Teto de quatro tamanhos de texto (ISA-101) + um numérico.

| Papel | Tamanho | Peso | Família |
|---|---|---|---|
| rótulo, unidade, legenda | 11px | 600 | sans |
| corpo, campo, botão, texto corrido | 13px | 400/600 | sans |
| título de bloco | 16px | 600 | sans |
| destaque secundário | 20px | 700 | mono |
| **número principal** | 32px | 700 | mono |

**Pilha local, zero rede.** Nada de `<link>` para fonte remota: numa oficina sem internet a tela
abriria com fonte errada e o layout saltaria. As máquinas Windows de chão de fábrica já têm Segoe UI
e Consolas.

**Todo número em mono com `font-variant-numeric: tabular-nums`** — dígito que não dança quando o
valor muda, num painel que se atualiza ao vivo.

**Formato numérico** (D8):

| # | Regra | Exemplo |
|---|---|---|
| 1 | Milhar separado por **ponto** | `4.456 rpm` |
| 2 | Decimal separado por **vírgula** | `0,060 mm` |
| 3 | O separador é **caractere de pontuação**, nunca espaço | `4.456`, jamais `4 456` |
| 4 | Casas decimais são propriedade da grandeza, fixas, e não ajustáveis pelo operador | rotação sem casa; espessura de cavaco com três |
| 5 | Unidade sempre junto do número, nunca só num rótulo distante | — |

A regra 3 existe porque o defeito real foi esse: espaço no lugar do ponto abre um vão no meio do
número e ele passa a ser lido como dois.

### 2.9 Espaço, raio, movimento

- Espaçamento: `4 · 8 · 12 · 16 · 24 · 32 · 48`
- Raio: `4` chip · `6` campo · `10` cartão · `999` pill
- Transição: `140ms` estado de controle · `200ms` painel
- **Alvo de toque: 44px mínimo (`--h-target`). Ação principal: 52px (`--h-cta`)** — tela tocada em
  pé, na máquina, muitas vezes com toque impreciso (dedo, teclado ou ponteiro)
- `prefers-reduced-motion: reduce` desliga tudo, e a informação passa a ser transmitida só por
  estado e rótulo

---

## 3. Bloco pronto

> **Transcrição fiel de `Docs_inicial/construcao/prototipo/css/prototipo.css`.** Este bloco existe
> duas vezes de propósito — aqui, para quem constrói uma tela nova sem abrir o protótipo; lá, para o
> navegador. **A duplicação é vigiada por máquina:** `testes/test_contraste.js` compara os dois e
> falha se divergirem. Foi a versão anterior deste bloco, copiada à mão e nunca conferida, que passou
> semanas descrevendo uma paleta que o produto não usava.

```css
:root {
  /* superfícies — níveis refinados com elevação sutil */
  --bg-page:             #F7F5F1;
  --surface-card:        #FFFFFF;
  --surface-card-subtle: #EFEFF0;
  --surface-input:       #FFFFFF;
  --surface-input-muted: #EFEFF0;
  --border-subtle:       #CDCFD1;
  --border-control:      #85868A;
  --border-control-focus:#0F3D5C;
  --shadow-sm:           0 1px 2px rgba(15, 23, 42, 0.05);
  --shadow-card:         0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 16px -2px rgba(15, 23, 42, 0.05);

  /* texto — três níveis com alto contraste */
  --tx-1: #22252A;
  --tx-2: #2E3238;
  --tx-3: #696C71;

  /* marca e seleção */
  --brand-fill:    #0F3D5C;
  --brand-hover:   #0C3049;
  --brand-active:  #092437;
  --action-fill:   #A96208;
  --action-hover:  #8F5307;
  --action-active: #754406;
  --tx-on-brand:   #FFFFFF;
  --nav-active-bg: #0F3D5C;
  --nav-active-tx: #FFFFFF;
  --brand-accent:  #E4BF90;
  --accent-blue:   #506E82;
  --select-ink:    #0F3D5C;

  /* estado — rampa única */
  --st-normal-ink: #104237;  --st-normal-bg: #ECF3F1;  --st-normal-bd: #C6DAD6;  --st-normal-accent: #1B6E5C;
  --st-warn-ink:   #754406;  --st-warn-bg:   #FAF3EB;  --st-warn-bd:   #F0DBC1;  --st-warn-accent:   #C4720A;
  --st-crit-ink:   #6E2A11;  --st-crit-bg:   #F9F0EC;  --st-crit-bd:   #EDD0C6;  --st-crit-accent:   #B8461D;
  /* Informacao neutra nao e diagnostico (§2.4) — nao tem matiz propria, aponta para os neutros.
     Antes o accent era #0F3D5C, hex identico ao --brand-fill: duas barras iguais, sentidos diferentes. */
  --st-info-ink: var(--tx-1);  --st-info-bg: var(--surface-card-subtle);  --st-info-bd: var(--border-subtle);  --st-info-accent: var(--tx-3);

  /* interação */
  --surface-hover-field: #EFEFF0;
  --surface-hover-card:  #EBEFF1;
  --surface-pressed:     #CDCFD1;

  /* tipografia local — zero rede */
  --font-sans: Inter, "Segoe UI Variable", "Segoe UI", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "Cascadia Mono", Consolas, ui-monospace, monospace;

  /* espaço, raio, tempo */
  --sp-1: 4px;  --sp-2: 8px;  --sp-3: 12px; --sp-4: 16px;
  --sp-5: 24px; --sp-6: 32px; --sp-7: 48px;
  --r-chip: 4px; --r-field: 6px; --r-card: 10px; --r-pill: 999px;
  --t-control: 140ms; --t-panel: 200ms;

  /* alvos de toque */
  --h-target: 44px; --h-cta: 52px;
}

:focus-visible {
  outline: 2px solid var(--select-ink);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(15, 61, 92, .35);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 4. Primitivos

Só os que o produto precisa. **Nenhum deles determina onde a informação mora na tela.**

### 4.1 Campo numérico

`--surface-input` sobre `--surface-card`, borda `--border-control`, valor em mono `--tx-1`, unidade
em `--tx-3` **dentro do campo**, rótulo acima em 11px/600. Altura mínima 44px. O texto de espera usa
`--tx-3` em peso 400, contra o peso 700 do valor digitado — a distinção é o peso, não a cor (§2.2).

Erro troca borda e texto de apoio para a cor crítica **e escreve a correção** — nunca só pinta de
vermelho.

### 4.2 Escolha segmentada

Para **até 5 opções**. Dropdown custa duas ações; botão custa uma. Acima de 5, ou com rótulo longo,
usa-se lista.

Rádio nativo + rótulo estilizado — sem JavaScript de alternância, o que preserva teclado e leitor de
tela de graça.

| Estado | Fundo | Borda | Texto |
|---|---|---|---|
| inativo | `--surface-card` | `--border-control` | `--tx-2` |
| hover | `rgba(15,61,92,.06)` | `--select-ink` | `--tx-1` |
| **ativo** | `--select-ink` | `--select-ink` | `#FFFFFF` — 9,92:1 |

Máximo 4 por linha, altura mínima 44px, 13px/600.

### 4.3 Ação principal

`--action-fill` com `--tx-on-brand` (branco, 4,73:1) por cima. Altura 52px (`--h-cta`). É o único
botão preenchido de ação na tela. `--surface-pressed` não se aplica aqui: hover e pressionado usam
`--action-hover` e `--action-active`, que são escurecimento da própria ação.

**Não confundir com a marca.** `--brand-fill` preenche identidade e aba ativa; quem preenche o botão
de calcular é `--action-fill` (§1, §2.3).

### 4.4 Revelação — ajuda

O conteúdo sob demanda do produto é a **explicação de quatro partes** de cada parâmetro. Ela usa a
mecânica de revelação descrita abaixo.

Padrão: **Disclosure do WAI-ARIA APG**, não `role="tooltip"` — tooltip é para rótulo, não para
explicação.

| # | Regra |
|---|---|
| 1 | Gatilho de 24px com área de toque de 44px, ao lado do rótulo |
| 2 | `aria-expanded` no gatilho, `aria-controls` apontando para o painel |
| 3 | **Abre por clique ou teclado. Nunca só por passar o cursor** |
| 4 | Fecha pelo próprio gatilho e por `Esc` |
| 5 | O conteúdo é alcançável por teclado e por leitor de tela |
| 6 | **Nasce recolhido, e continua recolhido depois do cálculo** (D9) |

**Regra 6, com a razão** — vale para toda explicação, ajuda, nota e bloco de prosa:
o painel é uma calculadora, e o que ele entrega é número. Texto aberto por padrão empurra o número
para baixo da dobra e o operador passa a rolar a tela para ler o que já sabe. Calcular **não** abre
nada: o cálculo produz números, não leitura.

**A exceção é única: a linha de alerta.** Ela nasce aberta, permanece aberta e não tem gesto de
recolher — **R7**, alerta ativo nunca é esmaecido, silenciado ou adiado. É o único texto que o
operador não pediu para ver e mesmo assim precisa ver.

O gatilho de um bloco recolhido **mostra o que há dentro** — o rótulo, e o valor quando houver
("Velocidade de corte · 180 m/min"). Seta sozinha obriga a abrir para descobrir se vale abrir.

**Duas coisas ficam em aberto de propósito** e pertencem ao desenho do painel, não a este documento:
se o conteúdo flutua ou empurra, e se mais de um pode ficar aberto ao mesmo tempo. O produto exige
que a explicação seja legível **enquanto o controle correspondente é manipulado**, e que o operador
possa comparar dois parâmetros lendo os dois — resolva isso no painel.

### 4.5 Texto corrido

O produto tem dois blocos de **prosa** — a previsão de comportamento e a direção de ajuste. Isso é
incomum num painel industrial e precisa de regra própria:

- `--tx-2`, 13px, altura de linha 1,5
- **Medida máxima de 70 caracteres por linha.** Acima disso o olho perde a linha de retorno
- O número que sustenta a frase fica **dentro dela**, em mono — não extraído para uma coluna
- Sem marcador de lista decorativo: cada direção é um parágrafo com um objetivo por título

### 4.6 Cartão de resultado (D7)

Todo número de resultado mora num cartão próprio — nunca solto no meio da prosa. **Duas alturas, e a
altura é que diz se o número é editável.**

| | **Alto** | **Baixo** |
|---|---|---|
| Para | Rotação e velocidade de avanço da mesa | As 7 a 8 saídas de verificação |
| Número | 32px mono peso 700 | 20px mono peso 700 |
| Incremento `−` / `+` | **Sim**, 44px cada | **Não** |
| Quantos na tela | 2 | 7 a 8 |

**Por que só os dois de cima têm incremento:** a calculadora é bidirecional apenas neles — o
operador edita rotação ou avanço e o sistema recalcula tudo para trás (brief §7.3). As saídas de
verificação são derivadas; pôr `±` nelas prometeria uma edição que não existe.

Isso também é o que separa as duas funções da tela sem rebaixar nenhuma: **dois números são
transcritos à mão para a máquina, os outros dez a treze existem para conferir.** A distinção é de
**forma** — altura e presença de incremento — não só de tamanho de fonte.

Estrutura, de cima para baixo: rótulo por extenso com o símbolo entre parênteses (11px) · número
(mono, `tabular-nums`) com a unidade ao lado em `--tx-3`. Superfície `--surface-card`, borda
`--border-subtle`, raio `--r-card`.

**Nada de `drop-shadow` colorido, brilho, animação de chegada ou matiz por parâmetro.** Ênfase é
tamanho, peso e posição (§1). A única cor que pode tocar o cartão é a do **estado**.

---

## 5. Marca — provisória

A identidade definitiva do Fenix ainda não existe. Até lá:

- **Assinatura textual `FENIX`**, sans, 16px, peso 700, espaçamento entre letras `.08em`, em
  `--tx-on-brand` sobre uma placa de `--brand-fill` com raio `--r-field`.
- A placa é o **único** lugar do sistema onde o azul-petróleo aparece fora da aba ativa e da seleção.
- **Nunca** `FENIX` em azul-petróleo sobre fundo claro: a matiz de marca é preenchimento, não tinta.

**O laranja do ToolOptimizer saiu da identidade em 08/09/2026.** Ele havia sido herdado por
continuidade de produto e era declarado provisório desde o começo; a paleta nova o realocou para a
**ação** e deu ao Fenix uma matiz própria. A previsão de que "trocar o laranja depois custa um token"
se confirmou — custou exatamente isso, mais três tokens novos para a ação.

---

## 6. Contrastes verificados

Régua: **WCAG 2.1 AA** — 4,5:1 texto normal, 3:1 componente, borda funcional e elemento gráfico
portador de informação.

> **Esta tabela é saída de máquina, não afirmação de documento.** Ela é a leitura de
> `Docs_inicial/construcao/prototipo/testes/test_contraste.js`, que lê os tokens do CSS e mede cada
> par contra a **pior** superfície em que ele aparece. Mudou um token? Rode o script — se ele
> reprovar, o token está errado, não a régua.
>
> ```bash
> node Docs_inicial/construcao/prototipo/testes/test_contraste.js
> ```

| Par | Razão | Mínimo | |
|---|---|---|---|
| `--tx-1` na pior superfície | 13,38:1 | 4,5 | ✅ |
| `--tx-2` na pior superfície | 11,21:1 | 4,5 | ✅ |
| `--tx-3` na pior superfície | 4,59:1 | 4,5 | ✅ |
| `--accent-blue` na pior superfície | 4,66:1 | 4,5 | ✅ |
| `--border-control` na pior superfície | 3,16:1 | 3 | ✅ |
| `--select-ink` na pior superfície | 9,92:1 | 3 | ✅ |
| ink de NORMAL · ATENÇÃO · CRÍTICO · informação | 9,84 · 7,07 · 9,13 · 13,38:1 | 4,5 | ✅ |
| accent de NORMAL · ATENÇÃO · CRÍTICO · informação | 5,33 · 3,17 · 4,65 · 4,59:1 | 3 | ✅ |
| `--brand-accent` sobre `--brand-fill` | 6,60:1 | 3 | ✅ |
| `--tx-on-brand` sobre `--brand-fill` | 11,40:1 | 4,5 | ✅ |
| `--tx-on-brand` sobre `--action-fill` | 4,73:1 | 4,5 | ✅ |
| `--tx-on-brand` sobre `--action-hover` · `--action-active` | 6,16 · 8,12:1 | 4,5 | ✅ |
| `--nav-active-tx` sobre `--nav-active-bg` | 11,40:1 | 4,5 | ✅ |

**Os dois pares mais apertados são `--tx-3` (4,59:1) e o accent de ATENÇÃO (3,17:1).** Escurecer
qualquer um dos dois é seguro; clareá-los reprova. Quem for mexer neles rode o script antes de
declarar pronto.

**O script cobre alias.** Um token pode apontar para outro (`--st-info-bg: var(--surface-card-subtle)`)
e a auditoria resolve a indireção antes de medir — o que vale é o hex final, não o nome no meio do
caminho. Token citado na auditoria que suma do CSS vira falha com o nome dele, não exceção.

---

## 7. O que não existe

| Não existe | Por quê |
|---|---|
| **Glass** — superfície translúcida com desfoque | Sobre fundo chapado não produz efeito e só reduz contraste. Elevação é borda + sombra |
| **Glow neon** | Vira borrão cinza no claro. Ênfase é peso, tamanho e posição |
| **Gradiente desfocado de fundo** | Decoração pura, proibida por ISA-101 |
| **Ícone por fonte externa** | Todo ícone é SVG inline. Zero rede |
| **Webfont remota, CDN, qualquer requisição em tempo de uso** | A oficina pode não ter conexão, e o produto abre idêntico offline |
| **Segunda rampa de estado** | §2.4 |
| **Matiz de identidade por parâmetro** | §1 |
| **Estado desabilitado** | Nada trava neste produto, e campo que não se aplica **não existe** em vez de aparecer apagado. Se você precisou de um controle desabilitado, provavelmente violou uma das duas regras |
| **Scrim / sobreposição modal** | Não há fluxo modal no produto |
| **Medidor de ponteiro, arco, barra proporcional, índice de 0 a 100** | Sugerem precisão que o modelo não tem, e o produto não tem limite declarado contra o qual desenhar uma escala |

---

## 8. O que ficou no ToolOptimizer, e por quê

Registrado para que ninguém vá buscar de novo.

| Não veio | Motivo |
|---|---|
| **`DASHBOARD.md`, os mockups HTML, `UI_DESIGN_SPEC_FINAL.md`** | São o painel do ToolOptimizer. O painel do Fenix é refeito do zero contra o brief, com workflow diferente |
| **Componente de gauge de meia-lua** (41 barras, arco de 180°, ponteiro) | É componente de painel, e medidor com escala é anti-requisito declarado do Fenix |
| **Barra de estado por parâmetro** (segmentos, opacidade por posição) | Componente de painel. Se o desenho novo precisar de algo assim, ele inventa contra o brief — não herda |
| **Tema escuro, glassmorphism, neon `#00D9FF` / `#39FF14`** | Fenix é tema claro. Os dois neons dão 1,5:1 e 1,2:1 sobre fundo claro |
| **Roxo de `ae` e laranja de `ap`** | Identidade de parâmetro por matiz — §1 aposenta |
| **Regra "um conteúdo revelado por vez", painel flutuante de 280px** | Colide com a exigência do Fenix de comparar dois parâmetros lendo os dois. Ficou a mecânica ARIA; a forma é decisão do painel novo |
| **Rampas aposentadas** | Dívida do produto antigo. Aqui elas nunca existiram |

---

## 9. Checklist de conformidade

Para qualquer tela nova:

- [ ] Nenhuma cor fora dos tokens da §3 — hex cru no CSS é dívida, não estilo
- [ ] `--brand-fill` só em identidade e aba ativa; `--action-fill` só no botão de calcular — nenhum dos dois marcando estado
- [ ] Texto sobre preenchimento sempre `--tx-on-brand`
- [ ] Seleção e foco em `--select-ink`
- [ ] Uma única rampa de estado na tela inteira, e ela tem **três** níveis — informação neutra é cinza
- [ ] **Nenhum botão preenchido de ação dentro da área de resultado** — é a regra que mantém o laranja da ação longe do âmbar de ATENÇÃO (§1)
- [ ] `--brand-accent` só sobre o preenchimento da marca — em superfície clara ele reprova
- [ ] Área de entrada e de resultado em escala de cinza; cor só onde há condição de processo
- [ ] Alerta e nível de diagnóstico **nunca** esmaecidos
- [ ] Todo estado tem rótulo e posição além da cor
- [ ] Todo texto ≥ 4,5:1; toda borda funcional ≥ 3:1 — **aferido por `testes/test_contraste.js`, não por inspeção**
- [ ] No máximo 4 tamanhos de texto + 1 numérico
- [ ] Todo número em mono com `tabular-nums`
- [ ] Milhar com ponto, decimal com vírgula — **nenhum separador é espaço**
- [ ] Todo número de resultado dentro de um cartão da §4.6, na altura certa
- [ ] `−` / `+` só nos dois cartões altos — nenhuma saída de verificação tem incremento
- [ ] Toda revelação nasce recolhida e segue recolhida depois do cálculo; só o alerta abre
- [ ] Gatilho de bloco recolhido mostra rótulo e valor, nunca só a seta
- [ ] Foco visível em 100% dos elementos alcançáveis por teclado
- [ ] Alvo de toque ≥ 44px; ação principal 52px
- [ ] Zero requisição de rede
- [ ] Nenhum elemento puramente decorativo

---

## 10. Registro da reconciliação de 08/09/2026

**O que aconteceu:** o Mestre mandou adotar a paleta nova, desenhada numa cópia do protótipo. A cópia
foi conferida (só cor mudava), aplicada no protótipo vivo e arquivada. Ao medir a paleta nova contra a
régua desta página, **três tokens reprovavam WCAG AA** e foram corrigidos com o menor escurecimento
que resolve, preservando a matiz escolhida.

### O que mudou de valor

| Token | Antes desta página | Paleta nova, como veio | Corrigido para | Por quê |
|---|---|---|---|---|
| `--bg-page` | `#F3F4F6` | `#F7F5F1` | — | creme quente no lugar do cinza-azulado |
| `--tx-1` · `--tx-2` | `#111827` · `#374151` | `#22252A` · `#2E3238` | — | passam com folga |
| `--tx-3` | `#475569` | `#75787E` | **`#696C71`** | vinha 4,07:1 na página — **reprovava** |
| `--tx-muted` | não existia | `#A6A8AC` | `#696B6D`, e **aposentado** na segunda passagem | vinha 2,38:1 — **reprovava**; corrigido, convergiu com `--tx-3` e foi removido |
| `--border-control` | `#7A8494` | `#A6A8AC` | **`#85868A`** | vinha 2,38:1 contra o mínimo de 3 — **reprovava** |
| `--brand-fill` | `#E85D04` laranja | `#0F3D5C` petróleo | — | a marca trocou de matiz |
| `--action-fill` | não existia | `#C4720A` | **`#A96208`** | branco por cima dava 3,65:1 — **reprovava** |
| `--action-hover` | não existia | `#9C5B08` | **`#8F5307`** | acompanha o `fill` para o hover continuar perceptível |
| `--tx-on-brand` | `#0F1419` escuro | `#FFFFFF` | — | com petróleo o branco dá 11,40:1; a regra antiga existia por causa do laranja |
| `--select-ink` | `#3730A3` índigo | `#0F3D5C` | — | passou a compartilhar a matiz da marca |
| rampa de estado | verde/amarelo/vermelho/azul saturados | rampa dessaturada | — | os quatro `-ink` passam com folga |
| raio · transição · `--h-cta` | `2·4·8` · `120/180ms` · `56px` | `4·6·10` · `140/200ms` · `52px` | — | o documento estava desatualizado; os valores do protótipo passam a valer |

### Correções que não eram de cor de token

| Onde | O que era | O que é |
|---|---|---|
| `:focus-visible` | halo `rgba(55,48,163,.35)` — índigo da paleta anterior, com o traço já em petróleo | halo `rgba(15,61,92,.35)`, na matiz do traço |
| `.hbtn:hover` | `#E2E8F0` cru, sobra da paleta slate | `var(--surface-hover-field)` |
| `.demo-toolbar` e irmãos | dez hex slate crus, sem explicação | mantidos, com comentário dizendo que são o **chrome do protótipo**, não o produto |
| `§2.8`, exemplo de decimal | `0,018 mm` | `0,060 mm` — o `0,018` foi copiado daqui para o `spec.md` como se fosse resultado de cálculo, e custou uma correção |

### Segunda passagem, mesmo dia: as três anotações viraram decisão

O primeiro fechamento deixou três itens "anotados, não mexidos". Anotação em design system é dívida
com juros — ela descreve um defeito e não o corrige, e quem lê depois não sabe se aquilo foi decidido
ou esquecido. Os três foram resolvidos, e a investigação encontrou mais dois.

| # | Item | Decisão | Por quê |
|---|---|---|---|
| 1 | `--tx-muted` idêntico na prática a `--tx-3` | **Aposentado.** Os dois usos passam a `--tx-3` | Dois tokens com o mesmo valor prometem distinção que a tela não entrega. A régua não deixa espaço para um quarto nível de cinza; o portador da distinção passa a ser o **peso** (400 × 700), que o CSS já aplicava |
| 2 | `--action-fill` e `--st-warn-accent` na mesma matiz (34°) | **Cor mantida, colisão fechada por regra.** Entrou no checklist §9: *nenhum botão preenchido de ação dentro da área de resultado* | Repintar a ação jogaria fora uma escolha de desenho que funciona, e mexer na rampa de diagnóstico para resolver uma ambiguidade que não se materializa é risco maior que o ganho. O que faltava não era outra cor: era a regra que impede os dois de se encontrarem |
| 3 | `--accent-cyan` "só funciona sobre a marca" | **Renomeado para `--brand-accent`** | O nome mentia duas vezes: `#E4BF90` é dourado (matiz 34°), não ciano; e o "só sobre a marca" era acaso, não contrato. O nome novo *é* o contrato, e a auditoria agora afere o par sobre `--brand-fill` (6,60:1) |
| 4 | **achado** — `--st-info-accent` era `#0F3D5C`, hex idêntico a `--brand-fill` | **Rampa de informação neutralizada** (§2.4) | Duas barras laterais de 4px, mesma cor, sentidos diferentes: "identidade do sistema" e "informação". Informação neutra não é diagnóstico, então não carrega matiz de estado — vira cinza e a marca volta a ser única na cor dela |
| 5 | **achado** — `--accent-blue` `#57778C` reprovava | **Escurecido para `#506E82`** (4,66:1 na pior superfície) | Parecia decorativo e passou batido nas duas auditorias anteriores. É **texto** em três botões de apoio: dava 4,36:1 sobre a página e 4,13:1 sobre a superfície rebaixada |

**A auditoria foi ampliada para não repetir o descuido:** `--accent-blue` e `--brand-accent` entraram
na lista aferida, e o script passou a resolver alias `var()`, que é como a rampa de informação agora
se escreve. Token citado na auditoria que suma do CSS falha com o nome dele.

**Nada ficou anotado.** Os itens 2 e 3 têm cor mantida por decisão registrada, não por omissão; os
demais mudaram de valor.
