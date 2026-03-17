# PLAN: Admin Dashboard — Central de Gestao ToolOptimizer CNC

> **Item Backlog:** #7 | **Versao alvo:** v0.7.0 | **8 fases (1 fase = 1 sessao)**
> **Criado:** 17/03/2026

---

## Contexto

Area administrativa completa para gerir o ToolOptimizer CNC: analytics em tempo real, gestao de tarefas/requisicoes, inbox de bugs, error tracking, usage stats, feature flags, changelog, saude do sistema. Todas as paginas se comunicam via stores Zustand compartilhados. Requisicoes criadas no admin gravam automaticamente em `docs/admin-requests.json` via Vite plugin dev-only (Claude le no inicio da sessao, zero fricçao). Analytics via Cloudflare GraphQL API gratis (token no browser).

### Rotas

```
/admin                → Dashboard (visao geral com KPIs)
/admin/tasks          → Gestao de Tarefas/Requisicoes
/admin/inbox          → Inbox de Bug Reports
/admin/errors         → Error Tracking
/admin/usage          → Estatisticas de Uso
/admin/analytics      → Analytics Cloudflare (tempo real)
/admin/flags          → Feature Flags
/admin/changelog      → Historico de Versoes
/admin/health         → Saude do Sistema
```

### Estrutura de Pastas

```
src/admin/
  layout/       admin-layout.tsx, admin-sidebar.tsx, admin-header.tsx
  pages/        9 paginas (uma por rota)
  components/   kpi-card, task-card, bug-report-card, error-entry, mini-chart, status-badge, admin-modal, admin-table
  store/        admin-store.ts, analytics-store.ts, usage-store.ts
  hooks/        use-error-tracker.ts, use-admin-auth.ts, use-feature-flag.ts
  types/        admin-types.ts
  utils/        cf-analytics-client.ts, format-admin.ts
  data/         changelog-data.ts
  vite-plugin-admin-sync.ts
```

---

## Visao Geral das Fases

| Fase | Titulo | Versao | Escopo | Depende de |
|------|--------|--------|--------|------------|
| 1 | Fundacao + Dashboard | v0.7.0-alpha.1 | Layout, store, rotas, KPI cards | — |
| 2 | Tarefas + Auto-Sync | v0.7.0-alpha.2 | CRUD tarefas, Vite plugin, JSON sync | Fase 1 |
| 3 | Inbox de Bugs | v0.7.0-alpha.3 | BugReportButton → admin store, inbox page | Fase 1 |
| 4 | Error Tracking | v0.7.0-alpha.4 | Global handler, Error Boundary, errors page | Fase 1 |
| 5 | Usage Stats | v0.7.0-alpha.5 | Hook calcular(), bar charts SVG, usage page | Fase 1 |
| 6 | Analytics Cloudflare | v0.7.0-alpha.6 | GraphQL API, charts, Web Vitals | Fase 5 (MiniChart) |
| 7 | Flags + Changelog + Health | v0.7.0-alpha.7 | 3 paginas restantes | Fase 1 |
| 8 | Polish + Integracao | v0.7.0 | Dashboard real, feed atividade, testes finais | Todas |

---

## Fase 1: Fundacao + Dashboard

**Objetivo:** Estrutura base que todas as outras fases usam.

**Arquivos a criar:**
- `src/admin/types/admin-types.ts` — Todos os tipos (AdminTask, BugReport, ErrorEntry, FeatureFlag)
- `src/admin/store/admin-store.ts` — Store Zustand + persist (tasks, bugs, errors, flags)
- `src/admin/layout/admin-layout.tsx` — Sidebar + header + `<Outlet />`
- `src/admin/layout/admin-sidebar.tsx` — Nav vertical (9 itens, icones Material Symbols)
- `src/admin/layout/admin-header.tsx` — Topo: logo, versao, "Voltar ao App"
- `src/admin/pages/admin-dashboard-page.tsx` — 4 KPI cards + quick links grid
- `src/admin/components/kpi-card.tsx` — Card reutilizavel (icone, valor, label, cor)
- `src/admin/components/status-badge.tsx` — Badge de status/severidade

**Arquivos a modificar:**
- `src/main.tsx` — rota `/admin/*` lazy-loaded

**Entregaveis:**
- Navegar para `/admin` → dashboard com 4 KPI cards (valores 0)
- Sidebar com 9 links navegaveis (paginas placeholder)
- Store persistindo no localStorage
- Testes: admin-store CRUD, layout render

---

## Fase 2: Tarefas + Auto-Sync

**Objetivo:** Pagina de maior valor — requisicoes automaticas para Claude.

**Arquivos a criar:**
- `src/admin/pages/admin-tasks-page.tsx` — Lista filtavel + botao "Nova Requisicao"
- `src/admin/components/task-card.tsx` — Card de tarefa
- `src/admin/components/admin-modal.tsx` — Modal reutilizavel (createPortal)
- `src/admin/vite-plugin-admin-sync.ts` — Plugin dev-only: POST → grava JSON
- `src/admin/utils/format-admin.ts` — Formatadores
- `docs/admin-requests.json` — Gerado automaticamente

**Arquivos a modificar:**
- `vite.config.ts` — registrar adminSyncPlugin (dev-only)
- `CLAUDE.md` — instrucao para ler `docs/admin-requests.json`

**Entregaveis:**
- CRUD completo de tarefas com filtros
- Ao salvar task → JSON atualizado automaticamente no filesystem
- Claude le o JSON no inicio da sessao

---

## Fase 3: Inbox de Bugs

**Objetivo:** Bug reports salvos localmente + visiveis no admin.

**Arquivos a criar:**
- `src/admin/pages/admin-inbox-page.tsx` — Lista de bug reports
- `src/admin/components/bug-report-card.tsx` — Card com status e app state colapsavel

**Arquivos a modificar:**
- `src/components/bug-report-button.tsx` — adicionar `adminStore.addBugReport()` em handleSend()

**Entregaveis:**
- BugReportButton salva no admin-store ALEM do mailto
- `/admin/inbox` mostra lista com gestao de status
- Dashboard KPI "Bugs novos" mostra dado real

---

## Fase 4: Error Tracking

**Objetivo:** Captura automatica de erros JS.

**Arquivos a criar:**
- `src/admin/pages/admin-errors-page.tsx` — Lista deduplicada
- `src/admin/components/error-entry.tsx` — Stack trace colapsavel
- `src/admin/hooks/use-error-tracker.ts` — installErrorTracker()

**Arquivos a modificar:**
- `src/main.tsx` — chamar `installErrorTracker()` antes do render

**Entregaveis:**
- `window.onerror` + `unhandledrejection` capturados
- Erros deduplicados (count++)
- Dashboard KPI "Erros (24h)" mostra dado real

---

## Fase 5: Usage Stats

**Objetivo:** Materiais/operacoes/ferramentas mais usados.

**Arquivos a criar:**
- `src/admin/store/usage-store.ts` — Zustand + persist
- `src/admin/pages/admin-usage-page.tsx` — Bar charts SVG
- `src/admin/components/mini-chart.tsx` — Grafico SVG reutilizavel

**Arquivos a modificar:**
- `src/store/machining-store.ts` — `usageStore.trackUsage()` no final de `calcular()`

**Entregaveis:**
- Cada simulacao grava evento de uso
- `/admin/usage` mostra top 10
- `MiniChart` reutilizavel (usado na Fase 6)

---

## Fase 6: Analytics Cloudflare

**Objetivo:** Visitors, pageviews, Web Vitals em tempo real (gratis).

**Arquivos a criar:**
- `src/admin/store/analytics-store.ts` — Cache + API token
- `src/admin/pages/admin-analytics-page.tsx` — Graficos + Web Vitals
- `src/admin/utils/cf-analytics-client.ts` — Client GraphQL

**Entregaveis:**
- Input de API token Cloudflare (localStorage)
- Graficos SVG via MiniChart
- 3 Web Vitals cards com semaforo

---

## Fase 7: Flags + Changelog + Health

**Objetivo:** 3 paginas restantes.

**Arquivos a criar:**
- `src/admin/pages/admin-flags-page.tsx` — Toggles
- `src/admin/pages/admin-changelog-page.tsx` — Cards de versao
- `src/admin/pages/admin-health-page.tsx` — Indicadores
- `src/admin/data/changelog-data.ts` — Dados estaticos
- `src/admin/hooks/use-feature-flag.ts` — Hook

**Entregaveis:**
- Feature flags com toggle + hook
- Changelog visual v0.3.0 → v0.7.0
- Health: bundle, testes, localStorage

---

## Fase 8: Polish + Integracao Final

**Objetivo:** Dashboard com dados reais, versao final v0.7.0.

**Entregaveis:**
- Dashboard KPIs com dados reais de todos os stores
- Feed de atividade recente
- Mini grafico visitors (se token CF)
- CSS glassmorphism consistente
- Bump versao para v0.7.0
- Atualizar timeline, PROXIMA_SESSAO, ROADMAP

---

## Decisoes Tecnicas

1. **Sem lib de graficos** — SVG custom (dados pequenos)
2. **Sem backend** — localStorage + Cloudflare API gratis
3. **Lazy loading** — admin nao impacta bundle principal
4. **Stores separados** — `tooloptimizer-admin`, `tooloptimizer-analytics`, `tooloptimizer-usage`
5. **Vite plugin dev-only** — JSON auto-sync para Claude
6. **Auth futuro** — aberto por enquanto

## Arquivos Criticos (existentes a modificar)

| Arquivo | Fase | Mudanca |
|---------|------|---------|
| `src/main.tsx` | 1, 4 | Rotas admin (lazy) + error tracker |
| `src/components/bug-report-button.tsx` | 3 | Salvar bug no admin-store |
| `src/store/machining-store.ts` | 5 | Hook usage tracker no calcular() |
| `vite.config.ts` | 2 | Registrar adminSyncPlugin |
| `CLAUDE.md` | 2 | Instrucao para ler admin-requests.json |
