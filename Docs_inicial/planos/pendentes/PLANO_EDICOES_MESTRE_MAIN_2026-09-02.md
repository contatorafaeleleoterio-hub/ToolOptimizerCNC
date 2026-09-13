# Plano — lote "edições do Mestre no Main"

**Criado:** 02/09/2026. **Estado:** ⏳ aguardando aprovação do Mestre — nenhum passo executado.
**Origem:** o Mestre editou `Main.dc.html` diretamente no editor visual do canvas e salvou. As edições
dele são a nova fonte de verdade — onde uma edição conflita com regra documentada, **a regra muda para
caber na edição**. Textos entre parênteses no HTML dele são instruções, não texto final.
**Planejado por:** Ícaro (contexto limpo, só leitura). **Rodada de perguntas ao Mestre:** 1, já feita
(as 4 decisões D-Q1 a D-Q4 abaixo). Os 6 itens que sobraram foram decididos pelo Skinner (seção
"Decisões do Skinner").

---

## As 4 decisões do Mestre (definitivas)

- **D-Q1 — Nível de segurança:** removido por completo. "nao deve existir, deve ser removido, sem
  questionamentos". Sai o indicador permanente de estado (normal/atenção/crítico). **A faixa de
  alerta Z2 continua** — ela nomeia cada condição excedida.
- **D-Q2 — Hierarquia da ferramenta:** família+material (nível 1) → geometria dentro da família
  (nível 2). Ex.: "Fresa de metal duro" → {topo reto, toroidal, esférica}. Enxuto: "rebaixo",
  "inteiriça" e afins **não** entram como opção.
- **D-Q3 — Dados da ferramenta:** geometria de identidade é fixa, vem do catálogo (o modelo de
  catálogo E1/E2 continua valendo). O operador digita só os **parâmetros variáveis**. A única
  mudança no catálogo é a **organização por famílias**.
- **D-Q4 — Botões ±:** os inputs variáveis ganham ± com incremento apropriado por campo
  (ex.: altura 30 mm → aperta + → 35 mm).

---

## Decisões do Skinner sobre os 6 itens que Ícaro deixou abertos

O Mestre autorizou ("depois você assume todas as decisões"). Cada uma com a suposição declarada.

| # | Item | Decisão | Porquê |
|---|---|---|---|
| 1 | O alerta Z2 mantém rótulo de gravidade (ATENÇÃO/CRÍTICO)? | **Mantém.** Some o indicador permanente e o chip NORMAL; o alerta Z2 conserva ATENÇÃO/CRÍTICO como gravidade da condição, dirigindo a cor da faixa. | Na versão salva o Mestre **deixou o chip ATENÇÃO dentro do Z2 intacto**; só o chip solto do Z1 virou botão. |
| 2 | Z3 repete a identidade da ferramenta (como o Mestre digitou) ou só os parâmetros de corte? | **Só os parâmetros de corte** (`AP · VC · FZ · AE`), decimais normalizados (`FZ 0,060`). | A regra de vocabulário do próprio Mestre: "a nomenclatura completa aparece uma vez". O cabeçalho Z1 já carrega a identidade. Se ele quiser a ferramenta no Z3 também, é 1 linha pra reverter. |
| 3 | Ângulo de ponta da broca: catálogo-fixo ou input variável no painel? | **Catálogo-fixo.** | É propriedade que define a broca, já é campo do formulário "Adicionar ferramenta" em `Configuracoes.dc.html`. Consistente com D-Q3. |
| 4 | As remoções de texto já feitas nesta sessão (rodapé "O sistema recomenda…" nas 5 folhas; legenda "Edite a rotação…" em 3) estão neste lote? | **Sim, no lote — as 4 regras que exigiam esse texto "permanente na tela" caem.** | O Mestre ordenou essas remoções diretamente nesta sessão ("não tem utilidade nenhuma, só enche"). |
| 5 | Renomear o arquivo `E4_INDICADORES_E_SEGURANCA.md`? | **Não renomeia.** Muda só o H1 e o conteúdo. | O caminho é referenciado dentro de `CANONICO_LIMITES_E_ALERTAS.md` (2×) e em LEIA-ME/MVP/HANDOFF. Renomear quebra referência em canônico por zero benefício (regra dura: não quebrar referência que a varredura não alcança). |
| 6 | Botão de Configurações no cabeçalho Z1 × `ESCOPO_CONFIGURACOES §3.3` ("não é gatilho na tela principal") | **§3.3 muda** — botão no Z1 é permitido, visível, fora do fluxo de cálculo, sem senha e sem confirmação. | O Mestre desenhou o botão no Z1. Regra do lote: o modelo dele vence. |

---

## Contexto

Só o `Main.dc.html` mudou. Vazio, Tablet, Celular, Estados e Configurações estão idênticos entre a
versão salva do Mestre e o working tree. **Mas Tablet e Celular espelham o Main — o delta tem que ser
propagado** (seção D). O working tree já tem alterações não commitadas desta sessão (remoções de
texto — item 4 acima). `canvas.json` já ganhou a entrada `Configuracoes`. Existe
`painel-fenix-canvas.html` não rastreado (saída de build). **Nenhum asset de marca existe no
repositório** — o logo real é pendência aberta.

### Diff `Main.dc.html` (repo → Mestre)

| # | Onde | Repo | Mestre | Natureza |
|---|---|---|---|---|
| a | Z1 marca | `FENIX` (placa) | `(Logo Marca)` | logo real, placeholder por ora |
| b | Z1 identidade | string longa por extenso | `Material: … — Ferramenta: Fresa Toroidal D10 · R1,0 · Z4 · L45 — Metal Duro` | forma curta + rótulo |
| c | Z1 chip | `ATENÇÃO` | `(botão de configurações)` | nível de segurança sai; botão entra |
| d | Material bhead | `Material da peça` | `MATERIAL A SER USINADO` | vocabulário por zona |
| e | Material bsum | `Aço 1045 · classe P · 170–220 HB` | `(so mostra resumo quando gaveta fechada)` | bloco vira recolhível |
| f | Material lbl | `Dados que entram na conta` | `DADOS DO MATERIAL` | vocabulário |
| g | Material link | `Editar em Configurações` | `Editar dados de material` | texto seco |
| h | Ferramenta bhead | `Ferramenta` | `CONFIGURAÇÕES DA FERRAMENTA` | vocabulário |
| i | Ferramenta bsum | `Toroidal · Ø10 · Z4 · L45` | `(so mostra resumo quando gaveta fechada)` | bloco vira recolhível |
| j | Ferramenta seletor | 1 fbox | 2 níveis: família+material → geometria; "inteiriça" sai | D-Q2 |
| k | Ferramenta | — | parágrafo em CAIXA ALTA (instrução) | não é texto final |
| l | Ajuste fino link | `Voltar tudo ao valor de partida` | `resetar valores` | texto seco |
| m | Z3 | `Montado / 10 R1 Z4 L45 / metal duro` | identidade + `AP·VC·FZ·AE` | ver decisão 2 → só `AP·VC·FZ·AE` |
| n | Z7 título | `Resultados úteis` | `RESUMO GERAL` | vocabulário |

---

## Plano de execução numerado

Ordem: decisões → reabertura de escopo → docs-régua → Main → espelhos → demais folhas → artefatos →
limpeza → auditoria. **Uma etapa por vez, com verificação entre elas** (`Skinner/PADROES §1`).

### Fase A — Reabertura de escopo (precede o protótipo)

**1. Modelo de seleção de ferramenta = 2 níveis** — família+material (nível 1) → geometria (nível 2);
catálogo reorganizado por famílias — **arquivos:** `E1 §3.5 r1`, `§3.6`, `§3.7`; `MVP §3.1`, `§3.2`;
`ESCOPO_CONFIGURACOES §4.2`, `§4.3`, `§4.6` — **regra que muda:** `E1 §3.5 r1` "agrupada por
geometria" → "agrupada por família + material da ferramenta; geometria é o 2º nível"; atributo de
construção some como texto de tela (D-Q2) — **verificar:** `E1 §3.6` mostra 2 níveis; nenhuma menção a
"rebaixo"/"inteiriça" como opção; `grep -n "por geometria" E1` só em contexto histórico.

**2. Split identidade × variável dos campos + incremento por campo** (saída da seção C) — quais campos
vêm fixos do catálogo (leitura no painel, editados só em Configurações) e quais o operador digita com
± — **arquivos:** `E1 §3.3`, `E2 §1`/`§2`/`§3.4`, `MVP §4.1`/`§5.3`, `ESCOPO_CONFIGURACOES §4.2` —
**regra que muda:** nova classe de campo em `E2 §1` ("campo de catálogo — leitura no painel");
**cuidado com R6** — número de arestas (Z) vem do catálogo **mas continua visível e editável no
painel** (regra inviolável) — **verificar:** tabela por família em `E1 §3.3` marca cada campo como
{catálogo-fixo | variável-±}; Z como exceção R6; tabela de incrementos fechada.

### Fase B — Docs-régua desbloqueadoras

**3. `GABARITO §2.2` — vocabulário "por zona"** — interação = nomenclatura obrigatória, sigla sozinha
proibida; leitura (resumo, chip, cabeçalho de bloco recolhido, estado atual) = sigla obrigatória, por
extenso proibido; zona crítica (botão de ação, alerta) = agnóstica, não se audita por isso —
**arquivos:** `GABARITO §2.2` + tabela de versão §5 (bump v1.7) + `prototipo/LEIA-ME.md` — **regra que
muda:** §2.2 inteira; a exceção v1.4 é **absorvida** — não se apaga o registro, acrescenta-se nota
datada — **verificar:** §2.2 fala em 3 zonas; linha v1.4 na §5 com nota "absorvida em v1.7 (02/09)";
nenhuma renumeração de R1–R15 / D1–D12.

**4. D-Q1 — remover "nível de segurança" como indicador permanente** — varredura da seção B aplicada:
conceito apagado sem rastro (stub numerado onde havia seção), frases combinadas ("alerta e nível…")
reescritas para falar só do alerta — **arquivos:** ver seção B (~20 locais em `E2 E3 E4 E5 E6 BRIEF
DESIGN_SYSTEM MVP GABARITO ESCOPO_CONFIGURACOES` + 4 `.dc.html` + `prototipo/LEIA-ME.md` + `ESTADO.md`)
— **regra que cai:** "nível de segurança / nível de diagnóstico" como indicador de estado parado
(conceito removido — apaga sem rastro); os três nomes `CRÍTICO·ATENÇÃO·NORMAL` → duas gravidades de
alerta `CRÍTICO·ATENÇÃO` (decisão 1) — **verificar:** `grep -rn "nível de segurança\|nível de
diagnóstico\|indicador de nível" Docs_inicial/` → só reescritas/stub; "alerta nunca esmaece (R7)"
sobrevive em todo lugar sem "e o nível".

**5. `E4` — rework de conteúdo (sem renomear — decisão 5)** — H1 `# E4 — Alertas e Indicadores`; §2
vira stub numerado "Seção removida em 02/09 — o nível de segurança saiu do produto (D-Q1). Número
preservado."; `§3.1` mantém os 17 gatilhos e a coluna de gravidade (renomeada "gravidade do alerta")
— **arquivos:** `E4_INDICADORES_E_SEGURANCA.md` — **verificar:** `E4` abre sem a seção do nível;
gatilhos 1–17 intactos; §3.2/§3.3 intactos.

**6. Logo — a assinatura textual `FENIX` deixa de ser "a marca"** — `DESIGN_SYSTEM §5` reescrita:
identidade definitiva vira requisito de asset; até existir, placeholder neutro (placa `--brand-fill`
sem texto) na moldura; §9 checklist ajusta — **arquivos:** `DESIGN_SYSTEM_FENIX.md §5`, `§9`;
`design-system-fenix.html` (regerar); pendência de asset registrada em `HANDOFF`/`ESTADO` —
**verificar:** `DS §5` não afirma mais que o texto `FENIX` é a marca corrente; pendência registrada em
1 lugar rastreável.

**7. `±` padronizado** — estender aos inputs variáveis da ferramenta (D-Q4) e ao ajuste fino (vc, fz,
ae) — **arquivos:** `DESIGN_SYSTEM §4.6` (primitivo ± para campo de entrada variável), `GABARITO §2.7
D1` (nota: D1 tirou o botão de **desfazer**, não o ±) e `§2.8 D7`; `MVP §5.4`, `E2 §5.3`/`§3.4` —
**regra que muda:** nenhuma cai; D1 é esclarecida com nota datada — **verificar:** `DS §4.6` descreve ±
para 2 contextos (cartão de resultado + campo de entrada variável); nota em D1 distingue "botão de
desfazer" (removido) de "±" (novo).

**8. Z3 = só parâmetros de corte** (decisão 2) — `AP · VC · FZ · AE`, sem identidade da ferramenta,
decimais no padrão do domínio — **arquivos:** `MVP §2.3` (linha Z3), `E3 §2.3`, `E5 §2.2`, `HANDOFF
§35.4` item 25 — **regra que muda:** `MVP §2.3` Z3 "`10 R1 Z4 L45` com o substrato ao lado" → "`AP ·
VC · FZ · AE` — o cabeçalho já carrega a identidade" — **verificar:** `MVP §2.3` Z3 sem sigla de
geometria; exemplo `FZ 0,060`.

**9. `ESCOPO_CONFIGURACOES §3.3`** (decisão 6) — ponto de entrada pode ser botão no cabeçalho da tela
principal — **arquivos:** `ESCOPO_CONFIGURACOES.md §3.3`, `§9` (Q-F, nota datada) — **verificar:**
§3.3 permite botão no Z1; §9 Q-F com nota datada.

**10. Vocabulário / textos secos nos docs** — `Resultados úteis` → `RESUMO GERAL`; cabeçalho de
identidade ganha rótulo `Material: … — Ferramenta: …`; `Editar em Configurações` → `Editar dados de
material`; `Voltar tudo ao valor de partida` → `resetar valores` — **arquivos:** `MVP §7.2`, `E3
§2.2`/`§3`, `E5 §2`/`§2.2` — **regra que muda:** nenhuma inviolável (vocabulário = escolha do dono) —
**verificar:** `grep -rn "Resultados úteis" Docs_inicial/` → só histórico.

**10b. Rodapé permanente "O sistema recomenda, o operador decide"** (decisão 4) — as regras que o
exigiam "permanente na tela" caem; a frase continua governando o produto (`BRIEF §1`) — **arquivos:**
`BRIEF §5.8`, `E3 §5.2`, `E5`, `ESCOPO_CONFIGURACOES §2 r11` — **verificar:** nenhum doc afirma mais
que a frase é permanente no inventário de telas; `BRIEF §1` intacto.

### Fase C — Protótipo Main

**11. `Main.dc.html` Z1** — placa de logo → placeholder neutro; identidade curta com rótulo
(separadores `·`); chip `ATENÇÃO` → botão "Configurações" (tratamento **neutro**, não `--st-warn`;
ícone + rótulo; alvo 44px; alcançável por teclado — R9/R10) linkando `Configuracoes.dc.html` —
**consome:** #3, #4, #6, #9 — **verificar:** sem texto `FENIX`; sem chip de nível; botão Configurações
com destino, cor neutra.

**12. `Main.dc.html` bloco Material — recolhível** — fechado mostra `bsum` (`Aço 1045 · classe P ·
170–220 HB`), aberto mostra os campos; labels `MATERIAL A SER USINADO` / `DADOS DO MATERIAL`; link
`Editar dados de material`; estado inicial: aberto antes do 1º cálculo, recolhido depois (GABARITO D9
+ Estados §7) — **verificar:** `dtrigger`/`aria-expanded` no cabeçalho; `bsum` com valores; bloco com
campo obrigatório vazio não recolhe.

**13. `Main.dc.html` bloco Ferramenta — recolhível + 2 níveis + split identidade/variável** — seletor
nível 1 (`TIPO DA FERRAMENTA` — família+material) → nível 2 (geometria); campos de identidade em
leitura, do catálogo (Z **editável** — R6); campos variáveis com ± e incremento próprio; **remover** o
parágrafo em CAIXA ALTA e todos os `(…)`; corrigir `TEIPO`→`TIPO`, `IMPUT`→`INPUT`, `SESSÃO`→`SEÇÃO`
— **consome:** #1, #2, #7 — **verificar:** 2 `fbox` de escolha antes dos campos; nenhum texto entre
parênteses no HTML final; ± só nos campos variáveis; grep dos 3 typos = 0.

**14. `Main.dc.html` Ajuste fino** — ± com incremento em vc/fz/ae; link `resetar valores` —
**consome:** #7 — **verificar:** 3 campos com `step` de 44px; texto `resetar valores`; gaveta D11 de
cada parâmetro intacta e recolhida.

**15. `Main.dc.html` Z3** — só `AP 1,0 · VC 140 · FZ 0,060 · AE 1,0` — **consome:** #8 — **verificar:**
`.z3` sem "Fresa Toroidal"/"D10"; `FZ 0,060`.

**16. `Main.dc.html` Z7 + confirmação do Z2** — título `RESUMO GERAL`; Z2 **intacto** (nasce aberto,
nunca esmaece, mantém chip de gravidade) — **consome:** #4, #10 — **verificar:** `RESUMO GERAL`
presente; Z2 sem alteração de `opacity`; comentário do Z1 atualizado (sem "nível de segurança").

### Fase D — Espelhos

**17. `Tablet.dc.html`** — delta dos passos 11–16 no layout 834px — **verificar:** contagem de
capacidades = Main (R13); mesmos rótulos, ±, Z3.

**18. `Celular.dc.html`** — idem no 390px (empilhado; antes do 1º cálculo a Montagem aberta e no topo
— Estados §7) — **verificar:** capacidade = Main (R13); 2 níveis de seleção sem sigla sozinha em
tamanho pleno.

### Fase E — Demais folhas

**19. `Vazio.dc.html`** — placeholder de logo; vocabulário (`Editar dados de material`); fluxo de
escolha da ferramenta em 2 níveis; **R4 intacto** (nenhum dígito de resultado) — **consome:** #1, #6,
#10 — **verificar:** sem `FENIX`; sem número de resultado; fluxo de 2 níveis.

**20. `Estados.dc.html` — a folha de contrato** — §1 reescrito: "Os três níveis de diagnóstico" →
contrato do **alerta** (Z2 nasce aberto, uma condição por vez, gravidade ATENÇÃO/CRÍTICO, nunca
esmaece); a faixa `NORMAL` deixa de ser chip → vira a linha "nada fora da faixa" do bloco "o que vai
acontecer"; §2 "não move o nível" → "não vira alerta de processo"; §3 "isso é o nível" → "isso é o
alerta"; §4 "o alerta e o nível ficam em tinta cheia" → "o alerta fica em tinta cheia"; §5 "Nenhum
nível impede o resultado" → "Nenhum alerta impede"; §7 `bsum` no formato sigla conforme §2.2;
adicionar estado do botão Configurações — **consome:** #4, #5 — **verificar:** `grep -n "nível"` → só
em contexto de faixa/altura; §1 fala de alerta.

**21. `Configuracoes.dc.html`** — linha ~645 "o alerta nem o nível de segurança" → "o alerta";
catálogo reorganizado por família+material (D-Q2, D-Q3); confirmar que o modelo de campos casa com a
seção C — **consome:** #1, #2, #4 — **verificar:** sem "nível de segurança"; blocos agrupados por
família; footer conforme decisão 4.

### Fase F — Artefatos e limpeza

**22. Regerar artefatos de build + sincronizar `canvas.json`** — `painel-fenix.html` /
`painel-fenix-canvas.html` (re-semear os 6 `.dc.html` + `canvas.json` via `/design`);
`design-system-fenix.html` se `DS §2.4/§5` mudou; `canvas.json` mantém a entrada `Configuracoes` —
**regra:** `prototipo/LEIA-ME.md` diz que `painel-fenix.html` não vai ao repositório — decidir o mesmo
para `painel-fenix-canvas.html` — **verificar:** artefato regenerado bate com os 6 fontes;
`canvas.json` com 6 artboards.

**23. Cross-refs e limpeza** — `prototipo/LEIA-ME.md` ("os três níveis de diagnóstico" na descrição de
Estados); nota no `HANDOFF`/`ESTADO` do lote e da pendência de asset de marca — **verificar:** `grep
-rn "três níveis de diagnóstico" Docs_inicial/` → 0 em texto vivo; nenhum caminho quebrado.

**24. F2 (auditoria camada 1, contexto limpo) → F3 (veredito do Mestre) → F7 (reconferência
independente por outro agente)** — protocolo de convergência; F2 só mede camada 1 (grep-decidível), a
camada 2 (grade, densidade, forma do botão) espera o Mestre / Dexter — **verificar:** F2 com 0
críticos; F3 registrado; F7 por agente que não executou.

---

## A. Regras que caem ou mudam (lista fechada)

Natureza: **[R]** = decisão mudada → risca e data (`Skinner/PADROES §5`); **[X]** = conceito removido
→ apaga sem rastro (stub numerado onde havia seção).

| # | Arquivo · seção | Texto atual (resumido) | Texto novo proposto | Nat. |
|---|---|---|---|---|
| A1 | `GABARITO §2.2` | "Todo termo por extenso + símbolo. Exceção: resumo compacto. 2ª exceção (v1.4): resumo/gatilho de bloco recolhido" | Vocabulário por zona: interação = por extenso obrigatório; leitura = sigla obrigatória; zona crítica = agnóstica. Exceções v1.4/1.6 absorvidas, com nota datada | R |
| A2 | `GABARITO §5` (versão) | v1.6 topo | + linha v1.7 02/09: "vocabulário por zona; exceções de sigla absorvidas; nível de segurança removido (D-Q1); logo real substitui a assinatura textual" | R |
| A3 | `E4` H1 + `§2` inteira | "## 2. O nível de segurança … CRÍTICO > ATENÇÃO > NORMAL … O nível é somente leitura" | H1 `# E4 — Alertas e Indicadores`; `## 2. — Seção removida em 02/09: o nível de segurança saiu do produto (D-Q1). Número preservado` | X |
| A4 | `E4 §3.1` coluna "Nível" | CRÍTICO/ATENÇÃO por gatilho | Coluna "Gravidade do alerta" — dirige a cor do Z2, não um indicador parado | R |
| A5 | `E4 §1` opening | "…qual o nível de segurança de um resultado…" | remove o trecho | X |
| A6 | `BRIEF §5.8` | "Três níveis … O nível é somente leitura … Permanente: `o sistema recomenda…`" | Remove o parágrafo do indicador de nível; mantém estrutura da mensagem de alerta e as duas gravidades; "permanente" cai (decisão 4) | X |
| A7 | `BRIEF §11` | "Níveis de diagnóstico, exatamente estes três nomes: CRÍTICO · ATENÇÃO · NORMAL" | "Gravidade do alerta, exatamente estes nomes: CRÍTICO · ATENÇÃO" | R |
| A8 | `BRIEF §9 T7` | "…e a terceira nem move o nível de segurança" | "…é rotulada como validação de entrada, não como alerta de processo" | R |
| A9 | `BRIEF §7.2` / `§12` | "O alerta e o nível de segurança não [esmaece / acompanham a lente]" | "O alerta não [esmaece / acompanha a lente]" | R |
| A10 | `DESIGN_SYSTEM §2.4` | "os três níveis de diagnóstico do produto: NORMAL · ATENÇÃO · CRÍTICO" | "atenção e crítico são as duas gravidades de alerta; normal e informação cobrem estado neutro" (tokens `--st-*` ficam) | R |
| A11 | `DESIGN_SYSTEM §2.6` + `§9` | "O alerta e o nível de diagnóstico nunca recebem esse tratamento" | "O alerta nunca recebe esse tratamento" | R |
| A12 | `DESIGN_SYSTEM §5` + `§9` | "Assinatura textual `FENIX`, sans, 16px, peso 700 … a placa é o único lugar do laranja" | "Até o asset de marca definitivo existir, placeholder neutro na placa `--brand-fill` (sem texto de produto). O asset é pendência aberta." | R |
| A13 | `MVP §9` título + `§9.6` + `§2.3` Z1 + `§10.1` | "## 9. Alertas e nível de segurança" / "Três níveis" / Z1 "…· nível de segurança" / "Mudança de nível de segurança" | "## 9. Alertas" / "CRÍTICO > ATENÇÃO (gravidade do alerta ativo)" / Z1 sem "nível de segurança" / "Mudança de gravidade do alerta" | R/X |
| A14 | `MVP §2.3` Z3 + `E3 §2.3` + `E5 §2.2` | Z3 "`10 R1 Z4 L45` com o substrato ao lado" | Z3 "`AP · VC · FZ · AE` — a identidade da ferramenta já está no cabeçalho" | R |
| A15 | `MVP §7.2` título + `E3`/`E5` Z7 | "Resultados úteis" | "RESUMO GERAL" (zona de leitura) | R |
| A16 | `E2 §7.2` · `E3 §6`/`§7` · `E5 §2.2`/`§4.1`/`§8`/`§8.1`/`§12` · `E6 §2.1`/`§6` · `GABARITO §2.3` lente r4 · `ESCOPO_CONFIGURACOES §3.4`/`§4.5`/`§10.x`/Q-M | "o alerta e o nível de segurança" (não escala / não esmaece / precedência) | "o alerta" (idem) — cada doc ganha nota datada apontando D-Q1 | R |
| A17 | `E1 §3.5 r1` + `§3.6` | "A lista é agrupada por geometria; o substrato aparece dentro do grupo" | "Agrupada por família + material da ferramenta (nível 1); a geometria é o nível 2. Atributo de construção não é opção de tela" | R |
| A18 | `E2 §1` + `§2` + `§3.4` | "campo / controle / não-entra" | + "campo de catálogo — vem da ferramenta cadastrada, leitura no painel, editado só em Configurações"; Z é exceção R6; tabela de incremento por campo | R |
| A19 | `ESCOPO_CONFIGURACOES §3.3` + `§9` Q-F | "não é um campo nem um gatilho na tela principal" | "pode ser um botão do cabeçalho (Z1), visível, fora do fluxo de cálculo — passo deliberado, sem senha e sem confirmação" | R |
| A20 | `MVP §5.4` / `E2 §5.4` | D1: "sem botão de desfazer no campo" | nota datada: D1 tirou o botão de **desfazer**; inputs variáveis ganham ± com incremento (D-Q4) — coisas diferentes | R |
| A21 | `prototipo/LEIA-ME.md` | "os três níveis de diagnóstico"; "Estes seis são a fonte" | "o contrato do alerta"; conferir se `Configuracoes.dc.html` entra como 7ª fonte | R |
| A22 | `BRIEF §5.8` · `E3 §5.2` · `E5` · `ESCOPO_CONFIGURACOES §2 r11` | "Permanente na tela, em todo o inventário: `o sistema recomenda, o operador decide`" | "deixa de ser permanente na tela; continua sendo a frase que governa o produto (`BRIEF §1`)" | R |

---

## B. Varredura "nível de segurança" vs "alerta" — classificação (não tocar, só classificar)

Método: `Skinner/PADROES §6` — os sentidos da palavra primeiro. **Três sentidos:**
- **(i) Indicador permanente de estado parado** (rollup `NORMAL/ATENÇÃO/CRÍTICO` sempre visível) →
  **SAI** (D-Q1).
- **(ii) Faixa de alerta / condição excedida nomeada** (Z2) → **FICA** (R7).
- **(iii) Gravidade que o alerta carrega** (`ATENÇÃO`/`CRÍTICO` como rótulo da condição) → **FICA como
  gravidade do alerta**, some como indicador parado (decisão 1).
- Nota: `margem de segurança` / `fator de segurança` = conceito diferente (lente de exibição) → **não
  é tocado** por esta varredura.

| Arquivo · local | Trecho | Sentido | Veredito |
|---|---|---|---|
| `E4` título + `§2` (todo) + `§2.1`–`§2.5` | "O nível de segurança", "Os quatro/três níveis", "O nível é somente leitura", exemplos `[ ATENÇÃO ]`/`[ NORMAL ]` | (i) | **SAI** — stub numerado |
| `E4 §1` opening | "qual o nível de segurança de um resultado" | (i) | **SAI** (trecho) |
| `E4 §1.1`, `§1.3`, `§3.1` tabela de gatilhos, `§3.2`, `§5`, `§6` | camadas IMPOSSÍVEL/PROCESSO/SANIDADE, estrutura da mensagem, os 17 gatilhos, limiares, previsão | (ii) | **FICA** |
| `E4 §3.1` coluna "Nível" | CRÍTICO/ATENÇÃO por gatilho | (iii) | **REESCREVE** → "gravidade do alerta" |
| `BRIEF §5.8` | "Três níveis … O nível é somente leitura" | (i) | **SAI** |
| `BRIEF §5.8` (última linha) | "Permanente: `o sistema recomenda…`" | — | decisão 4 → **cai como "permanente"** |
| `BRIEF §7.2`; `§12` nota da lente | "O alerta e o nível de segurança não…" | (i) coladas ao alerta | **REESCREVE** → só o alerta |
| `BRIEF §9 T7` | "a terceira nem move o nível de segurança" | (i) | **REESCREVE** |
| `BRIEF §11` | "Níveis de diagnóstico, exatamente estes três nomes" | (i)+(iii) | **REESCREVE** → `CRÍTICO · ATENÇÃO` |
| `DESIGN_SYSTEM §2.4` | "os três níveis de diagnóstico do produto" | (i) na justificativa da rampa | **REESCREVE** (tokens ficam) |
| `DESIGN_SYSTEM §2.6`; `§9` | "O alerta e o nível de diagnóstico nunca…" | (i) colada | **REESCREVE** → só o alerta |
| `design-system-fenix.html` | "os níveis de diagnóstico do produto" | (i) | **REESCREVE** (regerar) |
| `MVP §9` título; `§9.6`; `§2.3` Z1; `§10`; `§10.1` | "Alertas e nível de segurança", "Três níveis", "nível de segurança" no Z1, "Mudança de nível de segurança" | (i) | **SAI** / **REESCREVE** p/ gravidade |
| `MVP §2.5`; `§7`; `§9.1`; linhas 1316, 1497, 1513 | "O alerta e o nível de segurança não…" | (i) colada | **REESCREVE** → só o alerta |
| `MVP §9.1`–`§9.7` | camadas, 17 gatilhos, limiares, sanidade | (ii) | **FICA** |
| `E2 §7.2` | "O alerta e o nível de segurança" | (i) | **REESCREVE** |
| `E3 §2.2` tabela; `§3`; `§3.1` `[ NORMAL ]` + "NORMAL — nada fora da faixa"; `§6`; `§7`; refs | vários | (i) | **SAI** o chip `[ NORMAL ]`; **REESCREVE** as combinadas; a linha "nada fora da faixa" **FICA** (conteúdo do bloco "o que vai acontecer") |
| `E5 §2` ASCII; `§2.2` Z1 + "o indicador de nível nunca recebe desatualizado"; `§4.1`; `§8`; `§8.1`; `§12` | (i) | **SAI** / **REESCREVE** |
| `E5 §9`–`§9.3` | estrutura da mensagem, uma condição por vez | (ii) | **FICA** |
| `E6 §2.1` (campo de histórico "Nível de segurança da condição"); `§6` ("os limiares de cada nível de risco") | (i) | **SAI** o campo de histórico; **REESCREVE** §6 → "os limiares de cada alerta" |
| `GABARITO §2.3` lente r4 | "Alerta e nível de segurança NÃO acompanham a lente" | (i) colada | **REESCREVE** → "O alerta NÃO acompanha a lente" |
| `GABARITO §2.7`/`§2.8` D-decisões | não citam "nível de segurança" | — | **não tocar** |
| `ESCOPO_CONFIGURACOES §3.4, §4.5, §10.1, §10.2, §10.4, Q-M` | "o alerta e o nível de segurança não [esmaece / muda]" | (i) colada | **REESCREVE** → só o alerta |
| `Main.dc.html` comentário linha 82 | "· nível de segurança (MVP §2.3)" | (i) | **REESCREVE** o comentário |
| `Main.dc.html` Z2 (linhas 240–247) | chip `ATENÇÃO` dentro da faixa de alerta | (ii)/(iii) | **FICA** (o Mestre manteve) |
| `Estados.dc.html §1` título + banda `NORMAL` | "Os três níveis de diagnóstico — sempre no mesmo lugar" | (i) | **SAI** — §1 reescrito como contrato do alerta |
| `Estados.dc.html §1` bandas `ATENÇÃO`/`CRÍTICO` (conteúdo) | texto de condição L/D 4,5 e ae 12>D | (ii) | **FICA** |
| `Estados.dc.html §2`–`§5` | "não move o nível de diagnóstico" / "isso é o nível" / "o alerta e o nível ficam em tinta cheia" / "Nenhum nível impede o resultado" | (i) | **REESCREVE** cada uma para falar do alerta |
| `Configuracoes.dc.html` linha ~645 | "o alerta nem o nível de segurança" | (i) colada | **REESCREVE** → "o alerta" |
| `CANONICO_LIMITES_E_ALERTAS.md` | usa camadas LIMITE/ALERTA/SANIDADE, não "nível de segurança" | (ii) | **não tocar** |
| `ESTADO.md` (raiz) | 1 ocorrência | (i) | Skinner atualiza (arquivo dele) |
| `painel-fenix*.html` | dentro do JSON embutido | — | **regerar** (build), não editar à mão |
| `HANDOFF.md`, `LESSONS.md`, `_arquivo/*`, `relatorios/CRITICA_*` | histórico/relatório | — | **não tocar** (registro datado) |

---

## C. Split "identidade × variável" por família de ferramenta

**Não é rodada de pesquisa.** Pela regra de fonte (`Skinner/PADROES §8`): conjunto de campos,
organização de catálogo e incremento = escolha do dono, sem fonte externa. Os canônicos governam
constantes de força e fatores de substrato — não o modelo de campo/UX. É **decisão de escopo do
Mestre**, com insumo quase todo já escrito.

**Já respondido (só consolidar):**
- Campos por geometria: `E1 §3.3` + `MVP §3.2` (tabela das geometrias — campos próprios, Z padrão,
  partida ap·ae·L).
- Reconfiguração ao trocar de ferramenta: `Estados.dc.html §5` (bandas MUDOU/FIXADO).
- O que a ferramenta cadastrada guarda × o que fica no cálculo: `ESCOPO_CONFIGURACOES §4.2` +
  decisão Q-E (o balanço L fica no cálculo; a ferramenta guarda geometria, substrato, D, Z, atributos
  da geometria, Lc, apelido).
- Passos já especificados: `MVP §5.3` (ae: D≤1→0,01 / D≤10→0,1 / senão 0,5; ap 0,05; vc 1; fz por
  faixa de diâmetro §11.3) e `E2 §3.4`. Margem de segurança: 5 pontos percentuais.

**Split decidido pelo Skinner** (o Mestre confirma ou ajusta na revisão deste plano — não é rodada
isolada):

| Campo | Classe | Incremento ± |
|---|---|---|
| Diâmetro (D), raio de canto (r), ângulo de posição (κ), passo (P), Dmin, rε, designação de rosca, **ângulo de ponta** | catálogo-fixo — leitura no painel, edição só em Configurações | — |
| Número de arestas (Z) | **exceção R6** — default do catálogo, **visível e editável no painel** | +1 inteiro |
| Balanço (L) | variável — sempre digitado a cada montagem (Q-E) | 5 mm (casa com Estados "45 → 40") |
| Profundidade de corte (ap) — fresamento | variável | 0,05 mm (`MVP §5.3`) |
| Comprimento de aresta (Lc) — opcional | variável, sobrescrevível | 1 mm |
| Velocidade de corte (vc), avanço por dente (fz), penetração de trabalho (ae) — ajuste fino | variável | vc 1 · fz por faixa de Ø (`§11.3`) · ae por Ø (`§5.3`) |

Base: `ESCOPO_CONFIGURACOES` Q-E, `MVP §3.2`/`§5.3`, `E1 §3.3`. O resultado desce para `E1 §3.3`, `E2
§2`/`§3.4`, `MVP §3.2`/`§4.1`/`§5.3`, `ESCOPO_CONFIGURACOES §4.2`. Sem `pesquisa/RESPOSTA_R*`.
**Lacuna declarada:** nenhuma que exija fonte física; os campos das geometrias de nicho (Fresa de
Chanfrar, Cabeçote Faceador) já estão marcados "provisórios" no `MVP §3.2` e herdam essa marca.

---

## D. Propagação Tablet / Celular — o delta

| Delta | Tablet (834px) | Celular (390px) |
|---|---|---|
| Z1 logo → placeholder neutro | sim | sim (placa menor, 13px) |
| Z1 chip `ATENÇÃO` → botão Configurações | sim | sim |
| Z1 identidade → forma curta com rótulo | sim | sim (`line-height:1.4`) |
| Material: labels novos, link novo, **bloco recolhível** com `bsum` | sim | sim (`bsum` já mais curto) |
| Ferramenta: 2 níveis, split identidade/variável, ± nos variáveis, recolhível, remover `(…)` e o parágrafo, corrigir typos | sim (revalidar grid) | sim (coluna única; 2 `fbox` empilhados) |
| Ajuste fino: ± em vc/fz/ae, link `resetar valores` | sim | sim (empilhado) |
| Z3: só `AP · VC · FZ · AE`, `FZ 0,060` | sim | sim |
| Z7 título `RESUMO GERAL` | sim | sim |
| Comentário `<!-- … nível de segurança -->` atualizado | sim | sim |
| Rodapé `O sistema recomenda…` / legenda `Edite a rotação…` | removido (decisão 4 — já feito no working tree) | idem |
| Z2 (faixa de alerta) | **intacto** | intacto |
| Antes do 1º cálculo: Montagem aberta e no topo | — | **sim** (Estados §7) |

**Invariante (R13):** contagem de capacidades desktop = tablet = celular após o lote.

---

## E. Ordem de fases — o que exige reabrir E1/E2 antes do protótipo

**Sim — dois passos reabrem escopo antes de tocar o `Main.dc.html`:**
1. **Seleção em 2 níveis (D-Q2)** muda `E1 §3.5 r1` e o exemplo `§3.6`. O seletor do Main (passo 13)
   não pode ser reconstruído antes dessa edição.
2. **Split identidade × variável + organização por famílias (D-Q3)** muda `E1 §3.3`, `E2
   §1`/`§2`/`§3.4`, `MVP §4.1`/`§5.3`, `ESCOPO_CONFIGURACOES §4.2`. Os campos da ferramenta no Main e
   o catálogo em `Configuracoes.dc.html` dependem disso.

**Sequência obrigatória:**

```
Fase 0  split da seção C — decidido pelo Skinner, Mestre       ── revisão deste plano
        confirma na aprovação (não é rodada isolada)
Fase A  E1/E2/MVP/ESCOPO_CONFIGURACOES  (passos 1–2)          ── reabertura de escopo
Fase B  GABARITO §2.2 + varredura D-Q1 + logo + Z3 + ±        ── passos 3–10b (docs-régua)
Fase C  Main.dc.html                                          ── passos 11–16
Fase D  Tablet + Celular                                      ── passos 17–18
Fase E  Vazio + Estados + Configuracoes                       ── passos 19–21
Fase F  artefatos + canvas + cross-refs + F2/F3/F7            ── passos 22–24
```

`MVP` e `GABARITO` são tocados por A e B, então na prática é sequencial: **A → B → C**. O "retroceder"
autorizado pelo Mestre aqui é E1/E2, não pesquisa.

---

## Estimativa

**Sessões: 11 a 15** (provável 13), com o ciclo levantar → aprovar → aplicar → verificar entre etapas.

| Bloco | Sessões |
|---|---|
| Fase A — E1/E2/MVP/ESCOPO_CONFIGURACOES | 2 |
| Fase B — varredura D-Q1 (~20 locais, adjacente a R6/R7) + GABARITO §2.2 + logo + Z3 + ± | 2–3 |
| Fase C — `Main.dc.html` | 1–2 |
| Fase D — Tablet + Celular | 1 |
| Fase E — Vazio + Estados (§1 reescrito) + Configuracoes | 2 |
| Fase F — artefatos + canvas + cross-refs | 1 |
| F2 + F3 + F7 | 2–3 |

**Polos longos:** a varredura D-Q1 (risco de matar regra de alerta por engano — `Skinner/PADROES §6`)
e a reabertura E1/E2. Se o Mestre enxugar (aceitar Z3 literal, adiar ± no ajuste fino), cai para
~10–11.

**Consumo da rodada de planejamento (Ícaro):** ~407 000 tokens, 53 chamadas de ferramenta.
