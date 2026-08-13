# Plano de Execução — Gauntlet Loop v2: Refactor Visual (Design System Oficial)

> **Status:** aguardando "pode seguir" do Mestre. Nenhuma etapa executada.
> **Item do backlog:** 17 (continuação — refactor da entrega aprovada em 91/100, ciclo 3).
> **Mecânica do loop:** `C:\Users\USUARIO\Desktop\central_rafael\protocolos\protocolo-loop-construtor-juiz-cego.md`.
> **Não é um novo mockup.** É uma refatoração visual do `gauntlet-calculadora-cnc-v2/mockup/index.html`
> já aprovado (91/100, 8/8 gates) — motor de cálculo, 18 tipos, schemas e regras de bloqueio ficam
> intocados. Só a camada visual (CSS/tokens) e 4 lacunas funcionais pontuais mudam.

---

## Por que este plano existe

O ciclo 3 aprovou o mockup usando os tokens do **FlowNC DS** (§ decisão declarada na Fase 0 do
plano anterior — origem primária definida ali, não um erro). O Mestre agora pede para trocar essa
paleta pela do **ToolOptimizer CNC real**, e reincorporar elementos que existem em produção
(`src/`) mas não entraram no mockup: os 3 gauges, os botões de ajuda contextual, e o feedback de
clique. **Isto NÃO é uma decisão nova de design — é aplicar o que já está aprovado e rodando.**

## Fontes levantadas em produção (`src/`, só leitura, nenhuma linha copiada 1:1 — só os tokens/padrões)

| Elemento pedido pelo Mestre | Onde já existe em produção |
|---|---|
| Design system oficial (cores, fontes, glass) | `src/index.css` — tokens `--primary:#00D9FF`, `--secondary:#39FF14`, `--background-dark:#0F1419`, `bg-surface-dark` (`rgba(22,27,34,.7)` + `backdrop-blur-xl`), `shadow-neon-cyan`/`shadow-neon-green`, fontes Inter (display) + JetBrains Mono (números) |
| Tema claro | **Não implementado em lugar nenhum do código hoje.** Só existe o token `background-light:#F3F4F6` cadastrado (não usado) em `docs/design/DASHBOARD.md`. Decisão do Mestre (confirmada nesta sessão): usar os tokens oficiais (`#00D9FF`/`#39FF14`/Inter/JetBrains Mono/glass) sobre fundo claro `#F3F4F6`, não o dark de produção — é a variante clara dos MESMOS tokens, não uma paleta nova. |
| 3 gauges de velocímetro | `src/components/half-moon-gauge.tsx` — arco de 41 barras, ponteiro animado, 3 instâncias em `results-panel.tsx` Zona 5: **Eficiência de Avanço**, **Produtividade MRR**, **Saúde da Ferramenta** |
| Botão de ajuda contextual | `src/components/param-explanation.tsx` — botão "O QUE É X?" com popover hover/click, ícone `info`, borda cyan |
| 4 parâmetros de ajuste fino | `src/components/fine-tune-panel.tsx` — Vc, fz, ae, ap (os 4 já estabelecidos; ordem/nomes não mudam) |
| Feedback de clique no botão calcular | `src/components/config-panel.tsx` (linhas ~464-481) — ícone `check_circle` + texto "Atualizado" substitui `play_arrow` + "Simular" após o cálculo |
| Recalcular só ao clicar | Regra Crítica 7 do `CLAUDE.md` do projeto: store não auto-recalcula, exige clique explícito — **mesma regra**, o mockup deve seguir o padrão que produção já segue |

---

## FASE 0 — preenchida

```
Entregável:
  O MESMO index.html (`gauntlet-calculadora-cnc-v2/mockup/index.html`), refatorado — não recriado.
  Motor de cálculo, 18 tipos, schemas declarativos, regras de bloqueio e os 24 cenários Playwright
  continuam intactos e verdes. Só mudam: (1) tokens visuais, (2) 3 gauges, (3) botões de ajuda nos
  4 parâmetros, (4) contraste input vs. painel, (5) feedback de check no botão calcular, (6)
  recálculo só ao clicar (não em cada input).

Por que refatorar (não redesenhar):
  O ciclo 3 aprovou a arquitetura e o comportamento funcional (91/100, 8/8 gates) usando uma
  paleta de referência (FlowNC) que era um placeholder deliberado da Fase 0 anterior — nunca foi
  pra ser a paleta final. Agora que a arquitetura está validada, troca-se só a pele pela do produto
  real, e reincorporam-se elementos de produção que ficaram de fora do escopo do primeiro loop
  (gauges, ajuda contextual) por não estarem no `BUILD_CONTRACT.md` original.

Escopo travado (ENTRA):
  · Substituição de 100% dos tokens de cor/fonte/sombra do FlowNC DS pelos tokens reais do
    ToolOptimizer (`src/index.css`), em variante clara (fundo `#F3F4F6`, mesmos `#00D9FF`/`#39FF14`
    neon, Inter + JetBrains Mono, glass adaptado a fundo claro).
  · 3 `HalfMoonGauge` (ou equivalente SVG/CSS autocontido, já que o mockup é HTML puro sem React) na
    Zona 5, mesmos 3 indicadores de produção: Eficiência de Avanço, Produtividade MRR, Saúde da
    Ferramenta — adaptados para funcionar com os 18 tipos (não só fresamento).
  · Botão de ajuda ("O QUE É X?") nos 4 parâmetros de ajuste (Vc, fz/passo-equivalente, ae, ap —
    ou os campos correspondentes por família, ver regra de exibição condicional abaixo) com texto
    curto explicando o impacto de cada um no resultado — mesmo padrão de `param-explanation.tsx`.
  · Exibição condicional dos 4 parâmetros por tipo de ferramenta: só aparece o controle (slider +
    botão de ajuda) que aquele tipo realmente usa, herdando a lista `campos[]` que já existe no
    schema declarativo do mockup — nenhum parâmetro novo é criado.
  · Contraste visual: inputs com superfície própria (`bg-black/40`-equivalente em fundo claro,
    ex. superfície mais escura/neutra que o card ao redor) distinta do fundo do painel — mesmo
    padrão de produção onde select/input tem `bg-black/40` sobre `bg-surface-dark`.
  · Feedback de check no botão "Calcular": ícone `check_circle` substitui o ícone de play por ~1-2s
    (ou até o próximo clique) após o cálculo, mesmo padrão de `config-panel.tsx`.
  · Recalcular só ao clicar em "Calcular" — remover qualquer recálculo automático em `input`/`change`
    que exista hoje no mockup (ciclo 3 tinha recálculo ao digitar; produção não tem).
  · Substituição de `select-familia`, `select-operacao`, `select-material-ferramenta` e
    `input-angulo-broca` por segmented control (componente CSS `.segmented-choice` reutilizável,
    radio nativo + label estilizado via `peer-checked:`), mantendo `select-tipo-ferramenta`,
    `select-designacao-rosca` e `select-material-peca` como `<select>` — regra de corte de
    cardinalidade (≤5→botão, ≥6→dropdown) documentada no `BUILD_CONTRACT_REFACTOR.md` de E1.
  · Barra fine-tune com valores visuais reduzidos (altura, opacidade, saturação, sem glow por
    segmento) — mesma lógica de segmentos ativos/inativos do componente de produção, só o visual
    muda; escopo limitado ao mockup, não altera `src/segmented-gradient-bar.tsx`.

Escopo fora (NÃO entra):
  · Qualquer mudança na lógica de cálculo, fórmulas, regras de bloqueio, schemas dos 18 tipos —
    tudo isso já passou pelo Juiz e está aprovado, é reescrita proibida.
  · Novos parâmetros de ajuste além dos 4 já existentes (Vc + 3).
  · Tema escuro (fica de fora deste refactor — se quiser depois, é outro ciclo).
  · Qualquer arquivo em `src/` — só leitura, para extrair tokens/padrões. Nada é copiado 1:1, é
    reimplementado inline no HTML autocontido do mockup (que não usa React/Tailwind build).
  · Persistência, tabelas de consulta, unidades imperiais — mesmo escopo fora do plano original.

Sandbox: gauntlet-calculadora-cnc-v2/ (mesma pasta, mesmo arquivo — refactor in-place com git-safe
  checkpoint antes de começar: snapshot do estado aprovado já existe em
  `state/snapshots/index-ciclo3-23of23.html`, preservado como ponto de rollback).
Teto de ciclos: 3 (menor que o padrão de 5 — é refactor sobre base aprovada, não construção do zero;
  se não convergir em 3, para e reporta causa, não força).
Score mínimo de aceite: manter ≥ 90/100 e 8/8 gates (não pode regredir o que já foi aprovado) +
  1 gate novo (ver Matriz de Critérios abaixo).
Fronteiras proibidas: as mesmas do plano original — `src/**`, `package.json` raiz, `node_modules/`,
  `vite.config.ts`, `vitest.config.ts`, `wrangler.jsonc`, `.gitignore` raiz,
  `gauntlet-calculadora-cnc/` (rodada 1), qualquer deploy.

O que este loop NÃO decide:
  Score ≥ 90 não autoriza mover este HTML para produção — a arquitetura React real (`src/`) é o
  caminho de implementação, não o mockup. Aprovação de produção é decisão separada do Mestre.
```

---

## Decisões tomadas e declaradas (não são perguntas)

1. **Refactor, não rewrite.** O Builder recebe o `index.html` do ciclo 3 (1209+ linhas, já com todo
   o motor de cálculo) como ponto de partida obrigatório — instrução explícita de "edite este
   arquivo", não "escreva um novo". Isso é o oposto do loop anterior (que proibia ler o ciclo
   anterior); aqui é o inverso: **é proibido não reaproveitar.**
2. **Gauges em CSS/SVG puro, sem React.** O mockup é HTML autocontido; `half-moon-gauge.tsx` é
   React. O Builder recebe a descrição funcional do componente (41 barras em arco, ponteiro,
   3 zonas de cor por `colorMode`) como contrato, não o `.tsx` para copiar — recriação inline em
   JS vanilla + CSS, mesmo resultado visual.
3. **4 parâmetros = Vc, fz, ae, ap, sempre nesse conjunto.** Para tipos onde o nome do campo do
   mockup difere (ex. `fn` em furação, `passoRosca` em roscamento), o Builder mapeia para o
   parâmetro correspondente da família (`BUILD_CONTRACT.md` já define isso por tipo) — não cria um
   5º parâmetro, não duplica.
4. **Textos de ajuda são escritos por mim (Rafael's agent), não inventados pelo Builder.** Vou
   entregar os 4 textos curtos (o que é / o que muda no resultado) no `BUILD_CONTRACT_REFACTOR.md`
   de E1, baseados no domínio já documentado (`DADOS_TECNICOS_KIENZLE_E_VC.md`, `BUILD_CONTRACT.md`
   original) — evita invenção pelo Builder.
5. **Critérios:** matriz original (9 categorias/100pts + 8 gates) + **1 gate novo** — "Gate 9:
   fidelidade aos tokens reais do ToolOptimizer (não FlowNC) confirmada pelo Juiz, incluindo os 3
   gauges presentes e funcionais nos 18 tipos." Congela em E1.
6. **Agentes:** 1 Builder + 1 Juiz cego por ciclo, teto de 3 ciclos (não 5) — refactor sobre base
   aprovada tem risco menor, orçamento menor. **Aprovar este plano autoriza essas chamadas.**

---

## Etapas

### E1 — Setup e contrato de refactor (eu, sem subagente)

1. Escrever `gauntlet-calculadora-cnc-v2/research/BUILD_CONTRACT_REFACTOR.md`:
   - Tokens reais do ToolOptimizer, variante clara (extraídos de `src/index.css` +
     `docs/design/DASHBOARD.md`, valores exatos de cor/fonte/sombra/glass).
   - Especificação funcional dos 3 gauges (não o `.tsx`, a descrição: arco de 180°, N barras,
     zonas de cor, ponteiro, valor central) mapeada aos 3 indicadores do mockup atual (índice de
     saúde já existe como número; MRR já existe; falta um 3º — Eficiência de Avanço, calculável a
     partir de `Vf` real vs. `Vf` recomendado pela fórmula).
   - Especificação do botão de ajuda (estrutura HTML/CSS, popover hover+click) e os 4 textos
     curtos de explicação (Vc, fz, ae, ap — 1 por parâmetro, ~2-3 frases cada, foco em impacto no
     resultado, tom didático pra novato).
   - Regra de exibição condicional dos 4 parâmetros por tipo (reaproveita `campos[]` do schema
     já existente).
   - Regra de contraste (input vs. card vs. fundo — 3 níveis de superfície).
   - Regra do botão Calcular (ícone/estado check) e da remoção do recálculo automático.
   - **Regra de widget de seleção** — pesquisa de UX (NN/g): dropdown custa 2 ações (abrir+escolher),
     segmented control custa 1 clique com efeito imediato, preferível até 5-7 opções. Corte adotado:
     ≤5 opções → segmented control; ≥6 → `<select>` mantido.

     | Campo | Cardinalidade | Widget final |
     |---|---|---|
     | `select-familia` | 4, fixa | Botão (grid-cols-4) |
     | `select-operacao` | 3, fixa | Botão (grid-cols-3) |
     | `select-material-ferramenta` | 4, fixa | Botão (grid-cols-4 ou 2×2) |
     | `input-angulo-broca` | 1-3, dinâmica | Botão (grid-cols-3); só 1 opção → auto-seleciona, mostra como texto fixo, sem seletor |
     | `select-tipo-ferramenta` | 6-8, dinâmica | `<select>` mantido — acima do corte, labels longos, lista muda por família |
     | `select-designacao-rosca` | 8, dinâmica | `<select>` mantido — acima do corte, labels técnicos longos (M6x1.0 etc.) |
     | `select-material-peca` | 12, dinâmica | `<select>` mantido — bem acima do corte |

     Especificação CSS de `.segmented-choice` (radio nativo + label, não JS de toggle manual —
     reduz risco de quebrar os 23 cenários Playwright, testids continuam no `<input type="radio">`):
     - Container: `display:grid`, `gap:6px`, colunas = nº de opções, nunca mais de 4 por linha.
     - Alvo de toque: `min-height:44px` (regra ISA-101 do projeto), `padding:8px 4px`,
       `border-radius:8px`, `font-size:13px` Inter 600.
     - Inativo: `background:#FFFFFF`, `border:1px solid rgba(0,0,0,.12)`, `color:#4B5563`.
     - Hover (inativo): `border-color:#00D9FF`, `background:rgba(0,217,255,.06)`, `color:#111827`.
     - Ativo (`peer-checked`): `background:#00D9FF`, `color:#0F1419`, `border:1px solid #00D9FF`,
       `box-shadow:0 0 0 3px rgba(0,217,255,.18)` (glow suave calibrado pro fundo claro, não o glow
       forte do dark).
     - Foco por teclado: `outline:2px solid #00D9FF`, `outline-offset:2px`.
     - Transição: `all 120ms ease` em background/border/color.
   - **Barra fine-tune sutil** — a versão de produção (`segmented-gradient-bar.tsx`) é a mesma da
     imagem "exagerada" (blocos de 22px, opacidade máxima 1.0, cores vivas, glow por segmento).
     Valores fechados pro mockup (mesma lógica de segmentos ativos/inativos, só o visual muda):

     | Propriedade | Produção | Proposto (mockup) |
     |---|---|---|
     | Altura do segmento | 22px (container 28px) | 6px (container 10px) |
     | Vermelho | `#FF4D4D` | `#E85A5A` (dessaturado) |
     | Laranja | `#FFA500` | `#E8A23D` (dessaturado) |
     | Verde | `#00E676` | `#2EE6A6` (mesmo matiz do `--secondary`, dessaturado) |
     | Opacidade ativo | 1.0 | 0.78 |
     | Opacidade inativo (passado) | 0.3 | 0.22 |
     | Opacidade nunca alcançado | 0.1 | 0.08 |
     | Glow por segmento | `0 0 8px cor44` | removido |
     | Border-radius do segmento | — | 1px (quase reto) |
2. Atualizar `criteria/JUDGE_CRITERIA.md` com o Gate 9 novo (ADITIVO — não removo nem reescrevo os
   8 gates e 9 categorias existentes, só acrescento).
3. Snapshot de segurança: copiar o `index.html` aprovado (ciclo 3) para
   `state/snapshots/index-pre-refactor.html` antes de qualquer edição do Builder.
4. `git status` na raiz: só a sandbox e este plano aparecem.

**→ Reporto e espero "pode seguir" antes de gastar o primeiro agente.**

### E2 — Ciclo 1 (refactor)

Builder (1 subagente) edita o `index.html` existente in-place → `npx playwright test` (as 23
verificações funcionais precisam continuar 100% verdes — se quebrar, é regressão, não é sobre isso
que o Juiz avalia) → Juiz cego (1 subagente) avalia contra a matriz + Gate 9 → registro em
`state/GAUNTLET_STATE_REFACTOR.md`.

### E3 — Ciclos 2–3, conforme necessário

Mesmo laço. Paradas:
- score ≥ 90 **e** 9/9 gates (8 originais + Gate 9) → **PASS**, vai pra E4;
- score piorou vs. ciclo 3 original (91) → não avança cego, considero reverter ao snapshot
  pré-refactor;
- teto de 3 ciclos sem PASS → paro e entrego o melhor ciclo.

### E4 — Relatório e parada

Atualizo `reports/FINAL_REPORT.md` (seção nova, não substituo o histórico) com o resultado do
refactor. Resumo no chat aponta pro arquivo.

---

## Verificação (final)

1. `npx playwright test` — os mesmos 23 cenários funcionais continuam passando (refactor visual não
   pode quebrar cálculo).
2. Abrir `mockup/index.html`: confirmar visualmente fundo claro + neon cyan/green, 3 gauges na
   Zona 5, botões de ajuda nos parâmetros visíveis por tipo, contraste input/card/fundo, botão
   Calcular com feedback de check, valores só mudam ao clicar.
   - Família/Operação/Material da Ferramenta/Ângulo aparecem como botão de 1 clique, não dropdown.
   - Barra fine-tune com blocos finos e cores dessaturadas, sem glow por segmento.
3. Ler `reports/FINAL_REPORT.md` (seção do refactor).
4. `git status` — só a sandbox e os planos deste loop.

Ao fim: **paro e espero aprovação explícita do Mestre.**
