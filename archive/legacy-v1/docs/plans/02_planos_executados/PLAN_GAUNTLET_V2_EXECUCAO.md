# Plano de Execução — Gauntlet Loop v2: Calculadora Multi-Ferramenta (HTML)

> **Status:** aguardando "pode seguir" do Mestre. Nenhuma etapa executada.
> **Item do backlog:** 17 (sem entrada nova — já registrado).
> **Mecânica do loop:** `C:\Users\USUARIO\Desktop\central_rafael\protocolos\protocolo-loop-construtor-juiz-cego.md` (referência externa ao repo) — não duplicada aqui.
> **Instância:** `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC_V2.md` (a Fase 0 dele é preenchida por este plano, na etapa E1).

---

## Contexto

O `PLAN_GAUNTLET_CALCULADORA_CNC_V2.md` existe com a **Fase 0 em branco de propósito** — não pode
rodar antes de ser preenchida. Este plano preenche a Fase 0 e define a execução completa.

**O que muda em relação à rodada 1** (score 92/100, preservada intacta em `gauntlet-calculadora-cnc/`):
a rodada 1 cobriu um subconjunto de ferramentas e herdou implicitamente decisões de tela do sistema
atual. Esta rodada tem três insumos novos e uma restrição nova:

| Insumo | Papel |
|---|---|
| `docs/specs/SPEC_CALCULADORA_MULTI_FERRAMENTA.md` | **o quê** — 18 tipos de ferramenta, campos, fórmulas, validações |
| `REGRAS-PAINEL-INDUSTRIAL - completo.md` (referência externa — guia ISA-101) | **como** — posição, tamanho, dinâmica de interação (ISA-101) |
| FlowNC DS (`03-DESIGN-SYSTEM.html`, tema claro) + fallback ToolOptimizer | **com que cor/fonte/espaço** — e nada além disso |
| `protocolo-loop-construtor-juiz-cego.md` (referência externa — Desktop) | a mecânica do loop |

**Restrição central do Mestre:** o mockup nasce **sem viés e sem referência ao sistema atual** —
os tokens de design vêm do FlowNC DS (tema claro), não do ToolOptimizer atual. Layout, hierarquia,
zonas e fluxo são derivados do guia industrial + §12 da SPEC, nunca do que já existe em `src/`.

**Resultado esperado:** um `index.html` autocontido, aprovado por Juiz cego com ≥ 90/100 e 8/8 gates.
Aprovar o loop **não** autoriza produção.

---

## FASE 0 — preenchida (trava aqui, não muda depois)

```
Entregável:
  Um único index.html autocontido (CSS + JS inline, abre em file://) — calculadora de parâmetros
  de corte cobrindo as 4 famílias de operação de fresadora/centro de usinagem.

Por que redesenhar:
  Diferente da rodada 1. Lá o motivo era testar se a arquitetura suportava mais de um tipo de
  ferramenta. Aqui o motivo é outro: validar a tese arquitetural da §10 da SPEC — schema
  declarativo por tipo + uma função pura por família + camada de apresentação genérica —
  contra os 18 tipos reais, e sob as regras de HMI industrial (ISA-101), sem herdar nenhuma
  decisão de tela do produto atual.

Escopo travado (ENTRA):
  · 4 famílias × 18 tipos: Fresar (topo reto, toroidal, esférica, chanfrar, alto avanço,
    cabeçote faceador, topo c/ pastilhas, disco/serra) · Furar (broca HSS, broca MD inteiriça,
    U-drill, broca de centro, escareador/rebaixador, alargador) · Roscar (macho de corte,
    macho de conformação, fresa de rosca) · Mandrilar (barra/cabeçote)
  · 4 eixos ortogonais (§3): material da peça · material da ferramenta · revestimento
    (informativo) · operação — mais perfil de máquina e fator de segurança
  · Modo de cálculo rápido (§5): 3 campos até o primeiro resultado (material da peça, diâmetro nominal e operação)
  · Fórmulas 1–28 da §6 aplicáveis aos tipos acima
  · Semáforo + regras de bloqueio por família (§8) e índice de saúde (§9)
  · Painel de resultado zonas 1–6 (§12) com cartão de fórmula por resultado

Escopo fora:
  · §7 tabelas de consulta como tela (roscas, conversões, tolerâncias, círculo de furos) —
    a tabela de roscas entra só como dado interno do cálculo de furo prévio, sem UI de consulta
  · §13 persistência (receitas, biblioteca, perfis salvos, histórico, favoritos, exportar)
  · Fórmulas 29 e 30 (ISO 286, medição por 3 arames) — pertencem à §7
  · Tema escuro · unidades imperiais (SFM/IPT/IPM) · mobile · qualquer item da §17 ou §18

Sandbox:  gauntlet-calculadora-cnc-v2/          (rodada 1 fica intacta)
Teto de ciclos: 5          Score mínimo: 90/100 + 8/8 gates
Fronteiras proibidas: src/** · package.json raiz · node_modules/ · vite.config.ts ·
  vitest.config.ts · wrangler.jsonc · .gitignore da raiz · gauntlet-calculadora-cnc/ (rodada 1) ·
  qualquer deploy. Nenhuma dependência instalada fora da sandbox.

O que este loop NÃO decide:
  Score ≥ 90 não autoriza implementar em produção — exige aprovação explícita do Rafael.
```

---

## Decisões tomadas e declaradas (não são perguntas)

1. **Um arquivo só.** `mockup/index.html` autocontido. Fontes (IBM Plex Sans + IBM Plex Mono —
   do FlowNC DS) via `<link>` do Google Fonts com stack de fallback — o mockup abre e funciona
   offline, só sem a fonte exata. *(a SPEC §2.5 pede offline; um mockup file:// não justifica
   embutir webfont em base64.)*
2. **Sem agente de Discovery.** A SPEC já **é** o Discovery — tem fontes citadas item a item.
   Eu destilo ela num contrato de construção; abrir um agente pra reler 650 linhas custa caro e
   reabre porta pra invenção.
3. **Dados de material vêm de `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md`**, não da minha
   cabeça. É dado de domínio, não decisão de tela — não conflita com "sem viés do sistema atual".
   Material sem fonte entra com status `estimado` e badge visível. 9 materiais verificados
   (fonte: `DADOS_TECNICOS_KIENZLE_E_VC.md`, cobrindo ISO P/M/N/H) + 3 estimativas ISO K (GG25, GGG50)
   e ISO S (Ti-6Al-4V) com badge `estimado` — totalizando exatamente 12 materiais reais.
   A SPEC pede 30–35, mas inventar linhas de `kc1.1` viola "No Invention".
4. **O contrato de dados vai em tabela markdown, não em JS.** Eu entrego as linhas de material,
   os 18 schemas de tipo e a tabela de roscas como tabelas; o Builder transcreve pra código.
   Mantém o Builder como autor do código e me mantém como autor do domínio.
5. **Critérios:** 9 categorias / 100 pts + **8 gates** (7 da rodada 1 + 1 novo de cobertura
   multi-ferramenta). Congelados antes do ciclo 1.
6. **Agentes:** 1 Builder + 1 Juiz cego por ciclo, sequenciais, teto de até 10 invocações de subagente (protocolo §3).
   **Aprovar este plano autoriza essas chamadas de subagente** — sem elas o protocolo não existe.

---

## Como o "sem viés do sistema atual" é imposto na prática

Não é recomendação — é regra operacional escrita no prompt do Builder e do Juiz.

**O Builder recebe exatamente 5 arquivos e nada mais:**

| Arquivo | Conteúdo |
|---|---|
| `research/BUILD_CONTRACT.md` | eu escrevo — 18 schemas, fórmulas, dados, regras de bloqueio |
| `research/HMI_RULES.md` | eu escrevo — destilado do guia industrial: zonas, tamanhos, alvo ≥40px, ≤4 tamanhos de fonte, cor reservada a anomalia, caminhos de erro |
| `criteria/DESIGN_TOKENS.md` | eu escrevo — **só valores**: cor, família tipográfica, escala de tamanho, espaçamento, raio, sombra, alpha |
| `criteria/JUDGE_CRITERIA.md` | a matriz congelada (para saber contra o que está sendo medido) |
| `tests/TEST_SCENARIOS.md` + contrato de `data-testid` | os cenários e os seletores estáveis |

**Proibido ao Builder ler** (lista no prompt): `src/**` · `gauntlet-calculadora-cnc/**` (rodada 1) ·
`docs/design/**` · `docs/_canonicos/**` · `docs/specs/PRD_*`.

**`DESIGN_TOKENS.md` carrega o que é token e só isso** — origem primária: **FlowNC DS**
(`Sistema_verificador_codigos_cnc/docs/_canonico/03-DESIGN-SYSTEM.html`, tema `[data-theme="claro"]`);
fallback: tokens do ToolOptimizer para elementos sem correspondência no FlowNC.

**Paleta (tema claro):** fundo `#E8ECF4`, superfície `#FFFFFF`/`#EDF1F8`, bordas `#C5CFDD`/`#94A2B8`,
texto `#18212E`/`#4A5A70`/`#536179`, accent `#E85D04` (laranja), sec `#2B3A4A`,
marca `#2E6BE6` (azul) / `#E85D04` (laranja).
**Estados (semáforo):** ok `#1A7A3C` · warn `#97670A` · err `#C0271E` · info `#1D5BD6` — cada um
com variantes `-bg` e `-bd` definidas no DS. **Uma paleta de estado só** — sem duplicação.
**Fontes:** IBM Plex Sans (400/600/700) + IBM Plex Mono (500/600/700) via Google Fonts.
**Espaçamento:** 4/8/12/16/24/32/40/48/64px. **Raio:** 2(xs)/4(sm)/8(md)/14(lg)/999(pill).
**Alturas:** CTA 56px, botão 44px, ghost 34px. **Transições:** fast .12s / normal .18s / slow .3s.
**Sombras:** `0 5px 16px rgba(20,28,38,.13)` / `0 16px 40px rgba(20,28,40,.18)`.
**Ring de foco:** `0 0 0 3px rgba(46,107,230,.45)`.
**Fallback ToolOptimizer:** alpha /5 /10 /20 /30 /50 /70 (não definidos no FlowNC).

**Não carrega** grade 12 colunas 3/9, header, orbs de fundo, nem qualquer componente — o layout
vem do guia industrial + §12 da SPEC.

---

## Etapas

### E1 — Setup e contratos (eu, sem subagente)

1. Preencher a Fase 0 em `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC_V2.md` com o bloco acima.
2. Criar `gauntlet-calculadora-cnc-v2/` com a estrutura do protocolo §9:
   `README.md · research/ · criteria/ · tests/ · mockup/ · state/ · reports/`
3. Infra isolada, dentro da sandbox:
   ```bash
   npm init -y && npm i -D @playwright/test && npx playwright install chromium
   ```
   `playwright.config.ts` espelhando o da rodada 1 (`testDir: ./tests`, `fullyParallel: false`,
   reporter list + json).
4. Escrever `research/BUILD_CONTRACT.md` — o documento mais pesado desta etapa:
   - **18 schemas declarativos**: por tipo, os campos específicos com unidade, faixa válida e
     condição de exibição (§4 da SPEC), o `Z` padrão, e a família de cálculo que usa.
   - **4 funções de família**: assinatura e saídas de Fresar / Furar / Roscar / Mandrilar.
   - **Fórmulas 1–28** com o caso de borda de cada uma (Def só quando `ap < D/2` ou `ap < r`;
     Woxén só quando `ae < D/2`; `Vf = P × n` travado no macho; `ap = (Øf−Øi)/2` no mandrilar).
   - **Regras de bloqueio por família**: L/D fresar ≤3/≤4/≤6/>6 · mandrilar ≤3/≤4/≤5/>5 ·
     furar `L/D > 3` pica-pau e `fn ≥ 0,05√D` no U-drill · roscar torque e furo prévio.
   - **Índice de saúde**: pesos por família, penalidade de dois lados em `Vc`/`fz`/`fn`, severidade
     pelo pior parâmetro, bloqueio zera.
   - **Dados**: 9 materiais verificados + ~3 estimativas ISO K/S (`kc1.1`, `mc`, dureza, faixa de Vc, status) · fatores de material
     de ferramenta (0,29 / 0,37 / 1,00 / 1,25) · roscas M e MF com passo.
5. Escrever `research/HMI_RULES.md`, `criteria/DESIGN_TOKENS.md`, `criteria/JUDGE_CRITERIA.md`
   (congela aqui) e `tests/TEST_SCENARIOS.md` + contrato de `data-testid`.
6. Escrever `tests/gauntlet.spec.ts` — ~24 cenários espelhados 1:1 do markdown.
7. `git status` na raiz: só a sandbox e os dois planos aparecem.

**→ Reporto e espero "pode seguir" antes de gastar o primeiro agente.**

### E2 — Ciclo 1

Builder (1 subagente) constrói → `npx playwright test` → Juiz cego (1 subagente) avalia →
registro em `state/GAUNTLET_STATE.md` e `state/SCORE_HISTORY.md` + snapshot do `index.html`
para permitir rollback ao melhor ciclo (protocolo §7.1).
Reporte compacto: ciclo, score, gates, 3 prioridades.

### E3 — Ciclos 2–5, conforme necessário

Mesmo laço. Paradas, na ordem em que forem batidas:
- score ≥ 90 **e** 8/8 gates → **PASS**, vai pra E4;
- score piorou → não avança cego: registro a causa e considero reverter ao melhor snapshot;
- 2 ciclos com score parado (±1–2 pts) **e** as mesmas 3 prioridades → **estagnação**, paro e
  reporto a causa provável;
- teto de 5 ciclos sem PASS → paro e entrego o **melhor** ciclo, não o último.

### E4 — Relatório e parada

`reports/FINAL_REPORT.md`: score final, série por ciclo, gates, decisões de arquitetura validadas,
limitações e suposições declaradas, e a frase explícita de que PASS no loop **não é aprovação
para produção**. Resumo no chat aponta pro arquivo — não despejo o relatório na conversa.

---

## Matriz de critérios (rascunho — congela em E1)

| # | Categoria | Pts |
|---|---|---|
| 1 | Correção de cálculo e cobertura multi-ferramenta | 20 |
| 2 | Usabilidade operacional (tarefa frequente, modo rápido) | 15 |
| 3 | Prevenção e recuperação de erro (semáforo com correção escrita) | 15 |
| 4 | Fluxo e estabilidade de layout (trocar ferramenta não reconstrói a tela) | 12 |
| 5 | Conformidade HMI industrial — ISA-101 | 12 |
| 6 | Clareza dos parâmetros e procedência do valor | 10 |
| 7 | Arquitetura declarativa percebida / extensibilidade *(sub-item do objetivo)* | 6 |
| 8 | Fidelidade aos tokens do FlowNC DS (tema claro) + fallback ToolOptimizer | 5 |
| 9 | Testes objetivos (Playwright) | 5 |

**8 gates** — um FAIL derruba tudo, mesmo com score ≥ 90:
1. Score ≥ 90
2. **Os 18 tipos selecionáveis, cada um renderizando seus campos específicos** *(novo)*
3. Nenhuma falha funcional crítica — `NaN`/`undefined`/`Infinity` visível, cálculo errado em caso
   conferível, botão sem resposta
4. Console sem exceção não tratada durante os cenários
5. Entradas inválidas e extremas tratadas com correção escrita, sem travar a tela
6. Regras de bloqueio por família implementadas (L/D fresar >6 · mandrilar >5 · furo prévio · torque)
7. Fluxo principal compreensível sem consultar os testes — o Juiz narra a tela
8. Juiz considera adequada para uso diário no chão de fábrica, com justificativa de 1–2 frases

---

## Cenários de verificação (~24, congelam em E1)

**Fluxo e estabilidade:** básico Fresar · troca de família sem reconstruir tela · troca de tipo
preserva campos comuns · zonas fixas nas 4 famílias · determinismo · ordem de Tab · estado vazio
com `—`.

**Entradas:** Ø vazio · Ø negativo · L/D fresar > 6 bloqueado · limites de máquina incl. torque.

**Cálculo por tipo:** fator de material da ferramenta (HSS↔MD ≈ 3,45×) · `Def` esférica · `Def`
toroidal com `ap < r` · alto avanço `fz = hm/sin κ` · cabeçote `hm = fz·sin κ` + alerta
`ae > 0,8D` · U-drill `fn ≥ 0,05√D` · alargador Vc ≈ 1/3 e `fn` 2–3× · macho de corte
M10×1,5 → furo 8,5 · macho de conformação furo maior + bloqueio em material não conformável ·
fresa de rosca `Vf_centro < Vf_periferia` · mandrilar `ap = (Øf−Øi)/2` e L/D > 5 bloqueado.

**Transversais:** modo rápido em 3 campos · fator de segurança altera **só** Pc e Mc · índice de
saúde dominado pelo pior parâmetro e zerado por bloqueio.

---

## Riscos

| Risco | Mitigação |
|---|---|
| Builder estoura orçamento/saída no ciclo 1 (aconteceu na rodada 1 com escopo menor) | `BUILD_CONTRACT.md` entrega dados e schemas prontos — o Builder gasta o orçamento em UI + cálculo, não em derivar domínio. Se cair antes de tocar arquivo, eu aplico direto (protocolo §3) |
| 18 tipos não convergem em 5 ciclos | Critério 1 tem o maior peso e o gate 2 é binário — a correção vai pro que falta, não pro polimento |
| Juiz inflar score por reconhecer estilo próprio | Juiz cego, sem histórico e sem raciocínio do Builder; prompt variado entre ciclos (protocolo §5) |
| Escrever a Fase 0 no plano e a sandbox conta como "fora do sandbox" | São caminhos declarados e esperados; `git status` confere a cada ciclo |

---

## Verificação (final)

1. `cd gauntlet-calculadora-cnc-v2 && npx playwright test` → todos os cenários passam.
2. Abrir `mockup/index.html` no navegador e percorrer à mão: uma ferramenta de cada família,
   modo rápido, um caso de bloqueio.
3. Ler `reports/FINAL_REPORT.md`.
4. `git status` na raiz → só `gauntlet-calculadora-cnc-v2/`,
   `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC_V2.md` e este arquivo modificados. Nada em `src/`,
   nada em `gauntlet-calculadora-cnc/`.

Sem entrada nova no backlog — este é o item 17, já registrado.
Ao fim: **paro e espero aprovação explícita do Mestre.**
