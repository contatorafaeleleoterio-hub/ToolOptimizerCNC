# Backlog de Implementação — ToolOptimizer CNC

> **Última atualização:** 17/04/2026
> **Versão atual:** v0.10.1 → v0.11.0 (após Story-011 2C)
> **Total de planos:** 13 · **pendentes:** 2 (Segurança v0.5.5 ⏸️ pausada + Story-011 2C pending)

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
| 12 | [Story-011 ITEM-5.2 Cassino](#12-story-011-cassino) | 🎬 Animation | v0.11.0 | 3 sub-sessões | ⬜ 2A ✅ 2B ✅ 2C pendente |
| 13 | [Padronização Design System](#13-padronização-design-system) | 🎨 Design System | v0.12.0 | ~60 arquivos, 6 fases | ✅ Concluído |

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

### 13. Padronização Design System ✅

**Objetivo:** zerar todas as pendências do design system e deixar uma única
linguagem visual, tokenizada, com o `system.md` reconciliado com o código.

| Fase | Ação | Arquivos |
|------|------|----------|
| 1 | Camada de tokens | `src/index.css` (`@theme`), `design-tokens.ts`, `accent-tokens.ts` (novo), `slider-tokens.ts` |
| 2 | Eliminar classes Tailwind dinâmicas | `shared-result-parts`, `fine-tune-panel`, `styled-slider`, `bidirectional-slider`, `mobile-fine-tune-section` |
| 3 | Literais → tokens | ~60 arquivos em `components/`, `pages/`, `admin/`, `architecture/` |
| 4 | Deduplicar padrões | páginas, modais, `src/utils/result-display.ts` (novo) |
| 5 | Reconciliar system.md | `.interface-design/system.md`, `docs/design/*` |
| 6 | Fechar catálogos de violação | `docs/_archive/`, roadmap, backlog |

**Achados relevantes:**
- Os tokens `--font-size-2xs`/`--font-size-fine` nunca geraram utility: no
  Tailwind v4 o namespace de font-size é `--text-*`. Por isso conviviam com
  ~145 literais `text-[10px]`/`text-[11px]`.
- 14 classes Tailwind construídas em runtime (`text-${color}`) eram purgadas
  em produção — bug latente, não apenas inconsistência de estilo.
- `design-tokens.ts` existia desde a v0.8.0 e não era importado por nenhum
  arquivo (o próprio header dizia "not refactored yet — FASE 3 work").

**Fora do escopo (permanecem abertos):** #5 Segurança v0.5.5, #12 Story-011 2C,
MVP Android v0.12.0, FASE-7/8A/8B.

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
| 2 | Relatório + Propostas | `docs/_archive/plans-completed/redesign-v0.8.0/VISUAL-AUDIT-REPORT.md` |
| 3 | Protótipo HTML | `docs/design/DASHBOARD_V2_PROPOSAL.html` |

**Prompts de execução incluídos no plano** — copiar e colar para iniciar cada sessão.

---

**Regras aplicadas:**
- Bugs antes de features
- Menor escopo antes de maior escopo
- Segurança após estabilidade funcional
- Fases manuais (Rafael) e automáticas (Claude) claramente separadas
