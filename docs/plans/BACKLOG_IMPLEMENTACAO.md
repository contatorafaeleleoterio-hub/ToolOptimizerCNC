# Backlog de Implementação — ToolOptimizer CNC

> **Última atualização:** 05/08/2026 (sessão de execução — 3/8 sessões do item 15)
> **Versão atual:** v0.11.0 (Story-011 2C concluída, `b2183bd`) — v0.12.0 alvo ao final do item 15
> **Total de planos pendentes:** 2 (Segurança v0.5.5 ⏸️ pausada + Implementação DS + 80/20 + Mobile 🔁 em andamento) — Redesign 80/20 absorvido pelo item 15

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
| 5 | [Segurança Cibernética](#5-segurança-cibernética) | 🔒 Security | v0.5.5 | 6 arquivos + config manual | ⬜ Pendente |
| 6 | [Reestruturação Documental](#6-reestruturação-documental) | 🏗️ Infra | v0.6.0 | ~150 arquivos docs | ✅ Concluído (4 fases) |
| 7 | [Admin Dashboard](#7-admin-dashboard) | ✨ Feature | v0.7.0 | 9 páginas, 3 stores, ~30 arquivos | ✅ Concluído (`ab5eb8f`) |
| 8 | [Redesign Dashboard Principal](#8-redesign-dashboard-principal) | 🎨 Redesign | v0.8.0 | ~10 arquivos + testes, 8 fases | ✅ Concluído (`78d6a0e`) |
| 9 | [Implementações Dashboard v0.9](#9-implementações-dashboard-v09) | 🎨 Feature+Redesign | v0.9.4 | 7 itens — 7/7 concluídos | ✅ Concluído (`9b61427`) |
| 10 | [Redesign Visual Dashboard](#10-redesign-visual-dashboard) | 🎨 Design Audit | v0.10.0 | 6 sessões | ✅ Concluído (`64890cc`) |
| 11 | [Implementações Dashboard v0.10.1](#11-implementações-dashboard-v0101) | 🎨 Feature | v0.10.1 | 10 itens — todos concluídos | ✅ Concluído (10/10) |
| 12 | [Story-011 ITEM-5.2 Cassino](#12-story-011-cassino) | 🎬 Animation | v0.11.0 | 3 sub-sessões | ✅ Concluído (`b2183bd`) |
| 13 | [Redesign Calculadora 80/20](#13-redesign-calculadora-8020) | 🎨 Redesign | MINOR | 5 arquivos + testes, 4 sessões (S0-S3) | 🔁 Absorvido pelo item 15 |
| 14 | [Design System Canônico](#14-design-system-canônico) | 📄 Docs / Design Audit | — | 1 arquivo HTML, 4 sessões, zero `src/` | ✅ Concluído (`d471895`) |
| 15 | [Implementação DS + 80/20 + Mobile + Dívida Visual](#15-implementação-ds--8020--mobile--dívida-visual) | 🎨 Redesign + Refactor | v0.12.0 | ~25 arquivos + 9 testes novos, 8 sessões | 🔁 Em andamento (7/8 sessões — `31395be`) |

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

### 5. Segurança Cibernética

**Arquivo do plano:** `PLAN_Seguranca_Cibernetica.md`
**Prioridade:** ALTA — mas depende de ações manuais (GitHub privado, Cloudflare config)

**Problema:** Auditoria identificou gaps: CSP header faltando, dependências com vulnerabilidades, `importSettings()` sem validação de ranges, repositório público expondo código-fonte, script Plausible inativo carregando CDN desnecessário.

**7 fases de implementação (na ordem):**

| Fase | Ação | Quem | Arquivo |
|------|------|------|---------|
| 1 | Repo privado + remover GitHub Pages | Rafael (manual) | GitHub Settings |
| 2 | CSP header | Claude | `public/_headers` |
| 3 | npm audit no CI + Dependabot | Claude | `ci.yml` + novo `dependabot.yml` |
| 4 | Validação ranges em importSettings/importHistory | Claude | stores |
| 5 | Remover script Plausible inativo | Claude | `index.html` + `use-plausible.ts` |
| 6 | Bot Fight Mode + Rate Limiting | Rafael (manual) | Cloudflare Dashboard |
| 7 | Branch protection + Dependabot alerts | Rafael (manual) | GitHub Settings |

**Testes:** Adicionar testes para importação com valores inválidos

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
    ↓ [segurança]
v0.5.5 — Segurança Cibernética ⬜
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
**Prioridade:** ALTA — próxima atividade principal do dashboard de cálculo (Cloud Code)
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

**Progresso (05/08/2026):**
- ✅ Sessão 1 — dívida bloco 1: limpeza zero-risco (`895ba05`)
- ✅ Sessão 2 — Modal e Acordeão unificados (`abe7588`)
- ✅ Sessão 3 — Desktop S1: Config Panel enxuto (`7845488`)
- ✅ Sessão 4 — Desktop S2: Results Panel 8→4 zonas (`4254bfb`)
- ✅ Sessão 5 — Desktop S3: nav no header + acessibilidade (`8e11250`)
- ✅ Sessão 6 — Mobile: Config 80/20 + alvos de toque (`d327529`, corrigido em `e5975c9` — Parâmetros de Corte restaurado com indicadores+sliders após feedback)
- ✅ Sessão 7 — Mobile: Resultados com indicadores + vazio honesto + torque fora (`31395be`) — resolveu as 8 falhas pré-existentes (bug de `viewMode` duplicando badge de segurança)
- ⬜ Sessão 8 pendente (varredura final de dívida visual + docs + bump v0.12.0)

---

**Regras aplicadas:**
- Bugs antes de features
- Menor escopo antes de maior escopo
- Segurança após estabilidade funcional
- Fases manuais (Rafael) e automáticas (Claude) claramente separadas
