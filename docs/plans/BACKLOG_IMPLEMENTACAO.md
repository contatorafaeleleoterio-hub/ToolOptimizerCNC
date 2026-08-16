# Backlog de Implementação — ToolOptimizer CNC

> **Última atualização:** 16/08/2026 (item 19 concluído — etapas A–E; E2 do item 17 desbloqueado)
> **Versão atual:** v0.12.1
> **Total de planos pendentes:** 2 — item 17 (experimento isolado, **E2 pronto para começar**, não altera produção) e item 18 (especificação de motor, aplicar quando a codificação real começar)

Esta lista define a ordem de implementação dos planos criados e ainda não executados.
A ordem garante estabilidade progressiva: bugs corrigidos antes de features, features antes de polish.

> **Ponto de entrada da sessão:** `docs/ROADMAP_SESSAO_ATUAL.md` — contém resumo e protocolo de fim de sessão.

---

## Ordem de Implementação

| # | Plano | Tipo | Versão Alvo | Escopo | Status |
|---|-------|------|-------------|--------|--------|
| 1 | Fix BugReportModal | 🐛 Bug Fix | v0.5.1 | 2 arquivos | ✅ Concluído (`53bcb51`) |
| 2 | Fix TouchSlider Mobile | 🐛 Bug Fix | v0.5.2 | 1 arquivo | ✅ Concluído (`9fbb34b`) |
| 3 | Unificar Indicadores Ajuste Fino | ✨ Feature | v0.5.3 | 2 arquivos | ✅ Concluído (`b6b9812`) |
| 4 | Favicon e Ícones | 💄 Polish | v0.5.4 | 4+ arquivos | ✅ Concluído (`51b272a`) |
| 6 | [Reestruturação Documental](#6-reestruturação-documental) | 🏗️ Infra | v0.6.0 | ~150 arquivos docs | ✅ Concluído (4 fases) |
| 7 | [Admin Dashboard](#7-admin-dashboard) | ✨ Feature | v0.7.0 | 9 páginas, 3 stores, ~30 arquivos | ✅ Concluído (`ab5eb8f`) |
| 8 | [Redesign Dashboard Principal](#8-redesign-dashboard-principal) | 🎨 Redesign | v0.8.0 | ~10 arquivos + testes, 8 fases | ✅ Concluído (`78d6a0e`) |
| 9 | [Implementações Dashboard v0.9](#9-implementações-dashboard-v09) | 🎨 Feature+Redesign | v0.9.4 | 7 itens — 7/7 concluídos | ✅ Concluído (`9b61427`) |
| 10 | [Redesign Visual Dashboard](#10-redesign-visual-dashboard) | 🎨 Design Audit | v0.10.0 | 6 sessões | ✅ Concluído (`64890cc`) |
| 11 | [Implementações Dashboard v0.10.1](#11-implementações-dashboard-v0101) | 🎨 Feature | v0.10.1 | 10 itens — todos concluídos | ✅ Concluído (10/10) |
| 12 | [Story-011 ITEM-5.2 Cassino](#12-story-011-cassino) | 🎬 Animation | v0.11.0 | 3 sub-sessões | ✅ Concluído (`b2183bd`) |
| 13 | [Redesign Calculadora 80/20](#13-redesign-calculadora-8020) | 🎨 Redesign | MINOR | 5 arquivos + testes, 4 sessões (S0-S3) | 🔁 Absorvido pelo item 15 |
| 14 | [Design System Canônico](#14-design-system-canônico) | 📄 Docs / Design Audit | — | 1 arquivo HTML, 4 sessões, zero `src/` | ✅ Concluído (`d471895`) |
| 15 | [Implementação DS + 80/20 + Mobile + Dívida Visual](#15-implementação-ds--8020--mobile--dívida-visual) | 🎨 Redesign + Refactor | v0.12.0 | ~25 arquivos + 9 testes novos, 8 sessões | 🔁 Concluído localmente (8/8 sessões) |
| 16 | [Gauntlet — Mockup Experimental da Calculadora](#16-gauntlet--mockup-experimental-da-calculadora) | 🧪 Experimento isolado | — (nenhuma) | Pasta `gauntlet-calculadora-cnc/`, **zero `src/`** | ✅ Concluído (score 92/100, 7/7 gates) |
| 17 | [Gauntlet v2 — Redo com protocolo revisado](#17-gauntlet-v2--redo-com-protocolo-revisado) | 🧪 Experimento isolado | — (nenhuma) | Pasta `gauntlet-calculadora-cnc-v2/`, **zero `src/`** | 🔁 Construção aprovada (91/100, 8/8); refactor visual **desbloqueado em 16/08/2026 — E2 pronto para começar**, não executado |
| 18 | [Motor da Calculadora Multi-Ferramenta](#18-motor-da-calculadora-multi-ferramenta) | 📄 Spec / Engine | a definir | Especificação — aplicar em `src/engine/` quando a codificação real começar | ⬜ Pendente |
| 19 | [Diretrizes do Painel da Calculadora](#19-diretrizes-do-painel-da-calculadora) | 📄 Spec / UX | — | `docs/specs/` + reescrita de contrato, cenários e goldens da sandbox v2 | ✅ Concluído (16/08/2026, etapas A–E) |

---

## Detalhes

### 1. Fix BugReportModal ✅

**Commit:** `53bcb51` | **Versão:** v0.5.1
**Resolvido:** Card opaco, maxLength 500, ordem onClose/mailto.

---

### 2. Fix TouchSlider Mobile ✅

**Commit:** `9fbb34b` | **Versão:** v0.5.2
**Resolvido:** Accidental value changes durante scroll — thumb hit zone invisível + handlers movidos do track.

---

### 3. Unificar Indicadores Ajuste Fino ✅

**Commit:** `b6b9812` | **Versão:** v0.5.3 (via v0.4.2)
**Resolvido:** fz/ae/ap convertidos para padrão unidirecional igual ao Vc. 77 testes.

---

### 4. Favicon e Ícones ✅

**Commit:** `51b272a` | **Versão:** v0.5.2
**Resolvido:** `scripts/generate-icons.mjs` + favicon web PWA + ícone Electron `.exe`.

---

## Rationale da Ordem

```
v0.5.0 (base)
    ↓ [bug crítico em prod]
v0.5.1 — Fix BugReportModal ✅
    ↓ [bug UX mobile]
v0.5.2 — Fix TouchSlider Mobile + Favicon ✅
    ↓ [consistência visual]
v0.5.3/v0.4.2 — Unificar Indicadores ✅
```

### 6. Reestruturação Documental

**Brief original:** `BRIEF_REESTRUTURACAO_DOCUMENTAL.md`
**Diretrizes:** `docs/plans/phases/EXECUTION_DIRECTIVES.md`
**Prioridade:** MÁXIMA — pré-requisito para MVP production-ready

**Execução em 4 fases (UMA fase por sessão):**

| Fase | Brief | Status | Escopo |
|------|-------|--------|--------|
| 1 | `phases/PHASE-1-archive-dead-weight.md` | ✅ Concluído (`2651a89`) | 29 arquivos → archive (~6.600 linhas) |
| 2 | `phases/PHASE-2-eliminate-duplicates.md` | ✅ Concluído (`d2faf15`) | ~15 arquivos duplicatas/superseded (~2.400 linhas) |
| 3 | `phases/PHASE-3-trim-consolidate.md` | ✅ Concluído (`9770648`) | Trim PROXIMA_SESSAO + clean workflows (~1.000 linhas) |
| 4 | `phases/PHASE-4-update-references.md` | ✅ Concluído (15/03) | Update refs + sweep + bump v0.6.0 |

**Resultado esperado:** 91→~35 arquivos ativos (62%), leitura/sessão 1.300→375 linhas (71%)

---

### 7. Admin Dashboard

**Arquivo do plano:** `PLAN_Admin_Dashboard.md`
**Prioridade:** MÉDIA — nova feature de gestão (não bloqueia app principal)

**Problema:** Rafael precisa de uma central administrativa para gerir o ToolOptimizer CNC: analytics, tarefas/requisições, inbox de bugs, error tracking, usage stats, feature flags, changelog e saúde do sistema. Requisições criadas no admin gravam automaticamente em `docs/admin-requests.json` via Vite plugin dev-only.

**8 fases de implementação (1 fase = 1 sessão):**

| Fase | Ação | Versão | Escopo |
|------|------|--------|--------|
| 1 | Fundação + Dashboard | v0.7.0-alpha.1 | Layout, store, rotas, KPI cards | ✅ |
| 2 | Tarefas + Auto-Sync | v0.7.0-alpha.2 | CRUD tarefas, Vite plugin, JSON sync | ✅ |
| 3 | Inbox de Bugs | v0.7.0-alpha.3 | BugReportButton → admin store, inbox page | ✅ (`4f5cf19`) |
| 4 | Error Tracking | v0.7.0-alpha.4 | Global handler, Error Boundary, errors page | ✅ (`0b8a580`) |
| 5 | Usage Stats | v0.7.0-alpha.5 | Hook calcular(), bar charts SVG, usage page | ✅ (`14a8491`) |
| 6 | Analytics Cloudflare | v0.7.0-alpha.6 | GraphQL API, charts, Web Vitals | ✅ (`9afc325`) |
| 7 | Flags + Changelog + Health | v0.7.0-alpha.7 | 3 páginas restantes | ✅ (`5be515a`) |
| 8 | Polish + Integração | v0.7.0 | Dashboard real, feed atividade, testes finais | ✅ (`ab5eb8f`) |

**Testes:** Store CRUD, layout render, integração bug report, error capture, usage tracking

---

### 8. Redesign Dashboard Principal

**Arquivo do plano:** `PLAN_Redesign_Dashboard_v0.8.0.md`
**Prioridade:** ALTA — redesign completo do dashboard principal da calculadora CNC

**Problema:** Layout 3 colunas com redundâncias (Parâmetros de Corte = Ajuste Fino), inputs que não escalam (radio buttons fixos), fontes pequenas para desktop, sem persistência de ferramentas, sem conceito de "objetivo de usinagem".

**8 fases de implementação:**

| Fase | Ação | Escopo |
|------|------|--------|
| 1 | Fundação — Tipos, Store, Dados | Tipos novos, store expandido, arrays dropdowns |
| 2 | Layout 2 Colunas + Accordion | Grid 3→2 colunas, CollapsibleSection, mover Ajuste Fino |
| 3 | Ferramenta → Dropdowns | Raio/Arestas/Altura em dropdowns, visual row+label |
| 4 | Ferramentas Salvas + Auto-Save | Dropdown ferramentas, auto-save ao simular, deduplicação |
| 5 | Objetivo Usinagem | 3 botões (Velocidade/Balanceado/Vida Útil), altera indicadores |
| 6 | Validar Parâmetros + Acesso Rápido | Salvar simulação validada, modal acesso rápido |
| 7 | ResultsPanel Visual + Fix RPM↔Avanço | Layout expandido, fix re-render Zustand |
| 8 | Fontes + Polish + Quality Gates | Font sizes maiores, espaçamentos, bump v0.8.0 |

**Testes:** Store CRUD, accordions, dropdowns, auto-save, objetivo→zones, validar/carregar, re-render

---

### 9. Implementações Dashboard v0.9 ✅

**Commit final:** `9b61427` | **Versão:** v0.9.4
**Resolvido:** 7/7 itens — inputs livres, arestas, favoritar, safety factor slider, redesign HMI, sidebar footer, remover Kc.

---

### 10. Redesign Visual Dashboard

**Arquivo do plano:** `PLAN_Redesign_Visual_Dashboard.md`
**Prioridade:** ALTA — próxima atividade principal
**Tipo:** Design audit + protótipo visual (ZERO alterações em `src/`)

**Problema:** Dashboard v0.9.4 funcional mas com 26+ violações contra `.interface-design/system.md`: cores hardcoded inline, spacing non-4px, classes Tailwind dinâmicas, profundidade excessiva de glassmorphism, padding misto entre cards.

**3 sessões de execução:**

| Sessão | Foco | Entregável |
|--------|------|------------|
| 1 | Análise + Audit + Critique | Catálogo de violações |
| 2 | Relatório + Propostas | `docs/plans/VISUAL-AUDIT-REPORT.md` |
| 3 | Protótipo HTML | `docs/design/DASHBOARD_V2_PROPOSAL.html` |

**Prompts de execução incluídos no plano** — copiar e colar para iniciar cada sessão.

---

### 13. Redesign Calculadora 80/20

**Arquivo do plano:** `REDESIGN_DASHBOARD_80-20.md` (v3 consolidado, 18/07/2026)
**Prioridade:** ALTA — próxima atividade principal do dashboard de cálculo
**Tipo:** Redesign de exposição — zero engine novo

**Problema:** ~45-50 elementos visuais simultâneos; herói RPM/Avanço em 2rem; estado vazio mostra zeros falsos + timestamp falso; torque exibido sem ser validado em nenhum cálculo; navegação escondida no SidebarFooter.

**4 sessões de execução:**

| Sessão | Foco | Entregável |
|--------|------|------------|
| S0 | Preparação | `.interface-design/system.md` restaurado + registro no backlog/roadmap |
| S1 | Config Panel enxuto | 5 inputs essenciais + toggle "Ajuste avançado" + Simular no rodapé |
| S2 | Results Panel 4 zonas | Herói text-6xl + estado vazio honesto + torque removido + Detalhes colapsado |
| S3 | Navegação + polish | Nav no header com contadores + acessibilidade + testes + bump MINOR |

**Meta:** de ~45-50 para ~15-18 elementos visíveis (-65%), fluxo material→simular < 10s.

---

### 14. Design System Canônico

**Arquivo do plano:** `PLAN_DESIGN_SYSTEM_CANONICO.md` (criado 02/08/2026)
**Prioridade:** ALTA — norma visual que passa a reger todo desenvolvimento de UI
**Tipo:** Documentação / Design audit — **ZERO alterações em `src/`**
**Entregável:** `docs/_canonicos/DESIGN-SYSTEM.html` (HTML único, auto-contido, com demos vivos)

**Problema:** não existe fonte única de verdade visual. Tokens só no `@theme` do `index.css`; o resto é convenção implícita em ~90 arquivos `.tsx`. Mapeamento encontrou 3 paletas concorrentes de semáforo, 2 cianos, 5 estilos de modal, 4 sliders, 3 barras de saúde, 14 degraus de alpha sem sistema, e um `src/admin/` com paleta Tailwind totalmente separada dos tokens do app.

**Escopo:** app desktop + mobile + páginas + admin. 20 seções (Marca 00-01, Fundamentos 02-06, Componentes 07-16, Regras 17-19).

**Status: ✅ CONCLUÍDO (02/08/2026)** — replanejado de 6 para 4 sessões durante a execução (executor com contexto de 1M tokens comportou mais por sessão que o estimado inicialmente):

| Sessão | Foco | Seções | Commit |
|--------|------|--------|--------|
| 0 | Registro do plano | — | `394bcd7` |
| 1 | Chrome do doc + Marca + Cores | 00–02 | `5aadb9b` |
| 2 | Fundamentos + Componentes I | 03–09 | `6ca60d5` |
| 3 | Componentes II + III | 10–16 | `476f91f` |
| 4 | Regras + verificação final | 17–19 | `d471895` |

**Resultado:** `docs/_canonicos/DESIGN-SYSTEM.html`, 1575 linhas, 20 seções. 21 itens de dívida visual catalogados (seção 18) com recomendação de resolução em 3 blocos por risco (limpeza de código órfão → snap de escala → refactor de componente), passada ao Rafael ao fim da sessão 4 — implementação em plano futuro à parte.

**Decisões fechadas:** canonizar uma versão + seção de Dívida Visual · dark canônico + tema claro PROPOSTO · admin unificado nos tokens do app (proposto, não implementado).

**Regra inegociável:** zero vestígios do design system de referência usado como molde estrutural — verificado por grep ao fim de cada sessão (1-4), sempre zero ocorrências.

**Pendente (fora do alcance desta sessão):** validação visual em navegador real (fontes, toggle de tema, contraste WCAG ao vivo, scrollspy) — nenhuma ferramenta de browser disponível nas sessões de execução. Verificado por código o que era possível: tags balanceadas, sintaxe do `<script>` (`node -c`), zero regressão em `src/`.

---

### 15. Implementação DS + 80/20 + Mobile + Dívida Visual

**Arquivo do plano:** `PLAN_IMPLEMENTACAO_DS_80-20_MOBILE.md` (criado 05/08/2026, aprovado)
**Prioridade:** ALTA — materializa o Design System no código real
**Tipo:** Redesign + Refactor + limpeza de dívida — **8 sessões**, versão alvo v0.12.0
**Absorve** o item 13 (Redesign Calculadora 80/20): S1-S3 do redesign viram Sessões 3-5 deste plano.

**Escopo:** implementar o mockup aprovado `docs/design/mockup-redesign-80-20.html` (painel simplificado, 3 gauges mantidos), estender o redesign ao mobile (prioridade do Rafael: MiniResultBar na aba Resultados, alvos ≥44px, estado vazio honesto, 6 testes novos de componentes mobile) e quitar os 21 itens de dívida visual do DS (blocos 1+2+3 — inclui Modal e Acordeão unificados com acessibilidade). Admin fora de escopo.

**Sequência:** Bloco 1 (limpeza) → Modal/Acordeão base → desktop S1/S2/S3 → mobile config → mobile results → Bloco 2 (snap de escala) + docs + bump. Detalhes por sessão no arquivo do plano.

**Progresso (07/08/2026):**
- ✅ Sessão 1 — dívida bloco 1: limpeza zero-risco (`895ba05`)
- ✅ Sessão 2 — Modal e Acordeão unificados (`abe7588`)
- ✅ Sessão 3 — Desktop S1: Config Panel enxuto (`7845488`)
- ✅ Sessão 4 — Desktop S2: Results Panel 8→4 zonas (`4254bfb`)
- ✅ Sessão 5 — Desktop S3: nav no header + acessibilidade (`8e11250`)
- ✅ Sessão 6 — Mobile: Config 80/20 + alvos de toque (`d327529`, corrigido em `e5975c9` — Parâmetros de Corte restaurado com indicadores+sliders após feedback)
- ✅ Sessão 7 — Mobile: Resultados com indicadores + vazio honesto + torque fora (`31395be`) — resolveu as 8 falhas pré-existentes (bug de `viewMode` duplicando badge de segurança)
- ✅ Sessão 8 — varredura final de dívida visual + Vitest confiável + architecture graph + docs + bump v0.12.0 (local)

---

### 16. Gauntlet — Mockup Experimental da Calculadora

**Plano:** `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC.md` | **Versão alvo:** nenhuma (não vai para produção)
**Status:** ✅ Concluído (13/08/2026) — score final 92/100, 7/7 gates PASS, 2 ciclos (de 5 máx.)

**Objetivo:** projetar e validar, por mockup HTML isolado, uma arquitetura de calculadora que acomode mais categorias de ferramenta de **fresadora** além da fresa inteiriça de metal duro — cabeçote com pastilhas, brocas (metal duro / HSS / inserto), machos (HSS / metal duro), mandrilar, e um modo de cálculo rápido agnóstico de ferramenta.

**Descoberta que estrutura o plano:** o eixo nunca modelado é o **material da ferramenta** (HSS × metal duro), que muda Vc em 3–5×. Vira multiplicador de primeira classe sobre a faixa do material da peça.

**Método:** Gauntlet Loop — Orchestrator + Builder + Judge cego, testes Playwright isolados, máximo 5 ciclos, aprovação por score ≥ 90 **e** 7 gates.

**Regra absoluta:** zero alteração em `src/`, `package.json`, `node_modules/`, configs ou deploy. Todo o trabalho vive em `gauntlet-calculadora-cnc/`, com Playwright instalado apenas dentro dessa pasta.

**Saída:** mockup navegável (13/13 testes PASS) + `reports/FINAL_REPORT.md`. Score ≥ 90 **não** autoriza implementação — exige aprovação explícita do Rafael. **Técnica generalizada** em `central_rafael/protocolos/protocolo-loop-construtor-juiz-cego.md` (agnóstico de projeto) após a execução.

---

### 17. Gauntlet v2 — Redo com protocolo revisado

**Plano vigente:** `docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md` | **Versão alvo:** nenhuma (não vai para produção)
**Status:** ✅ **E1 fechada — pronto para executar o E2** (14/08/2026). Construção aprovada em
91/100; o refactor visual está instrumentado (44 cenários, todo gate `script` com executor,
contrato do Construtor sem lacuna) e **não executado**.

**Objetivo:** reexecutar o exercício do item 16 usando a versão revisada do Gauntlet Loop
(`protocolo-loop-construtor-juiz-cego.md`), com critério de parada por convergência real
(guarda melhor ciclo, reverte regressão, estagnação = score parado + mesmos problemas) em vez da
contagem fixa de ciclos usada na v1. **O objetivo final do que a calculadora deve cobrir desta
vez está deliberadamente em branco** — só a mecânica do loop e as fronteiras de sandbox são
herdadas da v1; o escopo do produto é declarado do zero na Fase 0, na sessão em que este plano for
retomado.

**Não reaproveita automaticamente:** `research/DISCOVERY.md` e `CALCULATOR_SCOPE.md` da v1 —
servem só de referência de formato/dados já levantados, não de escopo vinculante.

**Reaproveita tal qual:** esqueleto da matriz de 100 pts + 7 gates, receita de setup do Playwright
isolado, contrato de `data-testid` definido antes do Builder trabalhar, regra de fallback do
Orchestrator quando um subagente falha por limite técnico (ocorreu na v1, ciclo 2).

**Resultado (13/08/2026):** loop de construção concluído em 3 ciclos — 79 → 80 → **91/100 com 8/8
gates**. Mockup em `gauntlet-calculadora-cnc-v2/mockup/index.html`, 18 tipos, 4 famílias, 23/23
cenários Playwright. Em seguida entrou o **refactor visual**
(`docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md`): troca da paleta placeholder pelo Design System real,
4 controles de ajuste fino, ajuda contextual, formulário enxuto e blindagem anti-trapaça, com corte
de aprovação em 95/100. Tudo que exigiria mexer no motor foi separado para o **item 18**.

### 18. Motor da Calculadora Multi-Ferramenta

**Plano:** `docs/plans/PLAN_MOTOR_CALCULADORA_V2.md` | **Versão alvo:** a definir
**Status:** ⬜ Pendente (13/08/2026) — especificação escrita, aplicar quando a codificação real começar

**Objetivo:** reunir tudo que a calculadora multi-ferramenta precisa **no motor** e que o loop de
refactor visual congela de propósito. Cada item vem com fórmula, origem do dado e o que ainda falta
para poder ser implementado sem inventar número.

**Conteúdo:** 5 defeitos de motor encontrados na auditoria (campos lidos e nunca usados, tempo de
furo saindo `NaN`) · deflexão real em µm no lugar do L/D como comunicação · vida de ferramenta por
Taylor, na forma relativa que não exige dado novo · custo e tempo por peça · materiais de 12 para
30+ com procedência por linha · refrigeração interna como fator de verdade · camada de limite duro
separando recomendação de limite físico · fontes empacotadas no app.

**Fora, com motivo declarado:** análise de chatter (exige dados modais que não temos), catálogo por
aprendizado de máquina (sem base) e micro-otimização de cálculo (irrelevante nesta escala).

---

### 19. Diretrizes do Painel da Calculadora

**Documento:** `docs/specs/SPEC_PAINEL_CALCULADORA_PARAMETROS.md` | **Versão alvo:** —
**Status:** ✅ Concluído (16/08/2026) — diretrizes aplicadas em DS, catálogo, contrato, cenários e
goldens da sandbox `gauntlet-calculadora-cnc-v2/`. Etapas A–E fechadas; o E2 do item 17 está
desbloqueado.

**Objetivo:** consolidar como o painel da calculadora deve ser estruturado — elementos, posição,
ordem, agrupamento, relação entre componentes e comportamento de interação — servindo de referência
única para o Construtor do loop v2 e para o código real depois.

**5 decisões fechadas pelo Mestre (15/08/2026):**

1. **Recálculo híbrido** — formulário até o 1º Calcular, painel vivo depois (paridade com produção).
2. **Slider de agressividade** (conservador ↔ produtivo) move os 4 parâmetros; os 3 gauges seguem
   read-only — arrastar gauge é problema inverso sem solução única.
3. **Laranja `#E85D04` é marca** (logo, cabeçalho, botão Calcular com letra `#0F1419`, 5,29:1);
   **seleção e foco em índigo `#3730A3`** (9,03:1), não no teal `#005E77` de "informação".
4. **Campo Material da Ferramenta é removido** — substrato embutido no nome da ferramenta, uma
   entrada por variação real de mercado; **"Família de Operação" → "Tipo de Usinagem"**.
5. **Revestimento separado só em ferramenta inteiriça** (vale 25% de Vc e o operador sabe qual tem);
   pastilhada tem entrada única revestida.

**Também consolida:** ordem dos blocos, blocos colapsáveis com resumo no cabeçalho, ajuda contextual
inline (várias abertas ao mesmo tempo), edição reversa de RPM/Avanço com trava de limite físico,
Modo Rápido com os 4 campos que as calculadoras de fabricante pedem (o `Z` fixo em 4 de hoje erra o
avanço por fator 2), estados do painel e requisitos de chão de fábrica.

**Impacto no item 17 — por isso veio antes:** removeu `select-material-ferramenta` (usado pelos 23
cenários de regressão e pelo `R13`), reescreveu `R03` e `R06`, mexeu na região `DADOS` congelada
(`TOOLS`, `FAMILIAS`, `TOOL_FACTORS`) exigindo recaptura completa dos goldens, e alterou
`check-tokens.mjs` e `R14` pelas cores novas. Tudo foi trabalho de Orquestrador — o Construtor não
pode tocar em contrato, testes ou dados sem derrubar a blindagem.

**O que a etapa E entregou (16/08/2026):**

- **99 goldens** (33 entradas do catálogo × 3 contextos) no lugar dos 54 antigos. O eixo `ferramenta`
  morreu junto com o campo material da ferramenta: o substrato virou parte da entrada.
- **Decisão do Mestre — os goldens deixaram de comparar número.** O mockup é o documento canônico da
  **tela**; o motor definitivo entra depois (item 18). Congelar valor provisório só criaria vermelho
  falso quando o motor real chegar. Os goldens passam a travar a zona de resultado: a saída existir,
  com rótulo, unidade, traço de "não se aplica", texto de alerta e formato de fórmula. A zona de
  entrada fica livre de propósito — o contrato §10 manda tirar 6 campos da tela.
- **Conferência da migração do catálogo:** 26 pares equivalentes entre goldens velhos e novos, **23
  idênticos dígito a dígito**. Os 3 restantes são a broca helicoidal, e a única diferença é o `Lp`
  (comprimento da ponta): `broca_hss` (118°) e `broca_md` (140°) viraram uma geometria só, com o
  ângulo seguindo o substrato (SPEC §4.2). Cada um dos 3 tem par idêntico na outra combinação.
- O aumento de 25% previsto na etapa D para as 5 entradas só-MD_revestido **não aparece em golden
  nenhum**: onde elas têm par equivalente, o contexto já era MD revestido.
- Categoria 1 do Juiz continua com 12 pontos, medindo integridade + cobertura da zona de resultado.
- `FREEZE.json` regravado. Placar de partida do E2: **regressão 23/23 · invariantes 3/3 · golden 1/1
  · alvos 2/21** (R11 e R14).

---

**Regras aplicadas:**
- Bugs antes de features
- Menor escopo antes de maior escopo
- Fases manuais (Rafael) e automáticas (Claude) claramente separadas
