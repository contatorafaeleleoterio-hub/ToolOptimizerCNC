# Backlog de Implementação — ToolOptimizer CNC

> **Última atualização:** 17/03/2026
> **Versão atual:** v0.6.0
> **Total de planos pendentes:** 2

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
| 7 | [Admin Dashboard](#7-admin-dashboard) | ✨ Feature | v0.7.0 | 9 páginas, 3 stores, ~30 arquivos | 🔄 Em Progresso — Fases 1+2 ✅ (`99c188a`) |

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
| 3 | Inbox de Bugs | v0.7.0-alpha.3 | BugReportButton → admin store, inbox page |
| 4 | Error Tracking | v0.7.0-alpha.4 | Global handler, Error Boundary, errors page |
| 5 | Usage Stats | v0.7.0-alpha.5 | Hook calcular(), bar charts SVG, usage page |
| 6 | Analytics Cloudflare | v0.7.0-alpha.6 | GraphQL API, charts, Web Vitals |
| 7 | Flags + Changelog + Health | v0.7.0-alpha.7 | 3 páginas restantes |
| 8 | Polish + Integração | v0.7.0 | Dashboard real, feed atividade, testes finais |

**Testes:** Store CRUD, layout render, integração bug report, error capture, usage tracking

---

**Regras aplicadas:**
- Bugs antes de features
- Menor escopo antes de maior escopo
- Segurança após estabilidade funcional
- Fases manuais (Rafael) e automáticas (Claude) claramente separadas
