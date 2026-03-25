# ROADMAP DA SESSÃO ATUAL — ToolOptimizer CNC

> **Ponto de entrada obrigatório de toda sessão.**
> Leia este arquivo do início ao fim antes de qualquer ação.
> Histórico detalhado de sessões: `docs/PROXIMA_SESSAO.md`

---

## 📍 ESTADO DO PROJETO

| Item | Valor |
|------|-------|
| **Branch** | `main` |
| **Versão** | `0.8.0` |
| **Testes** | **849 passando** (15 falhas pré-existentes em admin timeout — não relacionadas) |
| **TypeScript** | **zero erros** |
| **Build** | **limpo** — JS 100.28KB gzip (340KB bundle) |
| **Remote** | `origin/main` sincronizado ✅ — commit `625b4f0` |
| **Worker** | ✅ LIVE — `https://tooloptimizercnc.contatorafaeleleoterio.workers.dev` |
| **Custom Domains** | ✅ `tooloptimizercnc.com.br` + `app.tooloptimizercnc.com.br` |
| **GitHub Actions** | ✅ deploy automático ao push para main |

```bash
# Verificação rápida ao iniciar
git log --oneline -3
npx vitest run 2>&1 | tail -3
npx tsc --noEmit
```

---

## 🚀 PRIORIDADE 1 — Backlog de Implementações

> **Regra:** Se esta seção tiver itens `⬜ Pendente`, executar ANTES de qualquer outra coisa.
> Se todos estiverem `✅ Concluído`, pular para **PRIORIDADE 2**.
> Fonte de verdade completa: `docs/plans/BACKLOG_IMPLEMENTACAO.md`

| # | Item | Tipo | Versão | Status |
|---|------|------|--------|--------|
| 1 | Fix BugReportModal | 🐛 Bug Fix | v0.5.1 | ✅ Concluído |
| 2 | Fix TouchSlider Mobile | 🐛 Bug Fix | v0.5.2 | ✅ Concluído |
| 3 | Unificar Indicadores Ajuste Fino | ✨ Feature | v0.5.3 | ✅ Concluído |
| 4 | Favicon e Ícones | 💄 Polish | v0.5.4 | ✅ Concluído |
| 5 | Segurança Cibernética | 🔒 Security | v0.5.5 | ⬜ Pendente |
| 6 | Reestruturação Documental | 🏗️ Infra | v0.6.0 | ✅ Concluído |
| 7 | Admin Dashboard (8 fases) | ✨ Feature | v0.7.0 | ✅ Concluído (`ab5eb8f`) |
| 8 | Reestruturação Docs Marketing & Monetização (12 docs) | 📄 Docs | — | ✅ Concluído |
| 9 | [Redesign Dashboard Principal (8 fases)](#-redesign-dashboard-principal-v080) | 🎨 Redesign | v0.8.0 | ✅ Concluído (Fases 1-6) |
| 10 | [Implementações Dashboard v0.9 (7 itens)](#-implementações-dashboard-v09) | 🎨 Feature+Redesign | v0.9.x | 📋 Planos detalhados — pronto para implementar |

### ✅ Reestruturação Documental (v0.6.0) — CONCLUÍDA

| Fase | Brief | Status | Objetivo |
|------|-------|--------|----------|
| 1 | `PHASE-1-archive-dead-weight.md` | ✅ Concluído (`2651a89`) | Archive sessions, stories, planos concluidos |
| 2 | `PHASE-2-eliminate-duplicates.md` | ✅ Concluído (`d2faf15`) | Eliminar duplicatas + update refs codigo |
| 3 | `PHASE-3-trim-consolidate.md` | ✅ Concluído (`9770648`) | Trim PROXIMA_SESSAO + clean workflows |
| 4 | `PHASE-4-update-references.md` | ✅ Concluído (sessão 15/03) | Update refs + bump v0.6.0 |

---

### ⬜ Admin Dashboard (v0.7.0)

**Plano completo:** `docs/plans/PLAN_Admin_Dashboard.md`

**8 fases — 1 fase por sessão:**

| Fase | Titulo | Status |
|------|--------|--------|
| 1 | Fundação + Dashboard | ✅ Concluído (`bc4c98b`) |
| 2 | Tarefas + Auto-Sync | ✅ Concluído (`df7cc38` + `99c188a`) |
| 3 | Inbox de Bugs | ✅ Concluído (`4f5cf19`) |
| 4 | Error Tracking | ✅ Concluído (`0b8a580`) |
| 5 | Usage Stats | ✅ Concluído (`14a8491`) |
| 6 | Analytics Cloudflare | ✅ Concluído (`9afc325`) |
| 7 | Flags + Changelog + Health | ✅ Concluído (`5be515a`) |
| 8 | Polish + Integração | ✅ Concluído (`ab5eb8f`) |

**Admin Dashboard v0.7.0 completo.** Próxima: Segurança Cibernética v0.5.5 (fases 2-5) ou Story-008.

---

### ⬜ Segurança Cibernética (v0.5.5)

**Plano completo:** `docs/plans/PLAN_Seguranca_Cibernetica.md`

**7 fases — executar na ordem:**

1. Repo privado + remover GitHub Pages *(manual — Rafael faz)*
2. CSP header em `public/_headers`
3. `npm audit` no CI + Dependabot (`ci.yml` + novo `dependabot.yml`)
4. Validação de ranges em `importSettings()` e `importHistory()`
5. Remover script Plausible inativo (`index.html` + `use-plausible.ts`)
6. Cloudflare: Bot Fight Mode + Rate Limiting *(manual — Rafael faz)*
7. GitHub: Branch protection + Dependabot alerts *(manual — Rafael faz)*

**Testes necessários:** casos de importação com valores inválidos
**Arquivos:** `public/_headers`, `.github/ci.yml`, `dependabot.yml`, stores, `index.html`, `use-plausible.ts`

---

### ✅ Reestruturação Docs Marketing & Monetização (Item #8) — CONCLUÍDA

**Plano completo:** `DOCUMENTACAO_MARKETING_MONETIZACAO/PLANO_REESTRUTURACAO_DOCS.md`

**Contexto:** 8 documentos existentes em `DOCUMENTACAO_MARKETING_MONETIZACAO/` foram analisados e diagnosticados com problemas: redundância massiva, conteúdo genérico, dados desatualizados (referem ao GitHub em vez do estado real v0.7.0), sem funil de aquisição, mercado BR fraco.

**Estratégia:** Criar 12 novos documentos substituindo os 8 atuais. **1 documento por sessão** para máxima qualidade e evitar erros/equívocos (melhor uso da janela de contexto).

**4 fases — 12 sessões — 1 doc por sessão:**

| Sessão | Documento | Fase | Status |
|--------|-----------|------|--------|
| 1 | `01-VISAO-PRODUTO.md` — Visão, proposta de valor, diferenciais v0.7.0 | Fase 1: Fundação | ✅ Concluído (`d7d25ae`) |
| 2 | `02-ANALISE-COMPETITIVA.md` — SWOT, pricing BRL, gaps de mercado | Fase 1: Fundação | ✅ Concluído (`fa29eac`) |
| 3 | `03-PERSONAS-E-JORNADA.md` — 4 personas, jornada de compra, dores | Fase 1: Fundação | ✅ Concluído |
| 4 | `04-ESTRATEGIA-SEO.md` — SEO técnico + on-page + conteúdo (consolida 3 docs) | Fase 2: Aquisição | ✅ Concluído |
| 5 | `05-PLANO-GOOGLE-ADS.md` — Campanha detalhada, orçamento R$, CPC | Fase 2: Aquisição | ✅ Concluído |
| 6 | `06-ESTRATEGIA-CONTEUDO.md` — Calendário editorial, LinkedIn, YouTube | Fase 2: Aquisição | ✅ Concluído |
| 7 | `07-MODELO-MONETIZACAO.md` — Freemium, pricing BR, projeções 3 cenários | Fase 3: Monetização | ✅ Concluído |
| 8 | `08-PLANO-LANCAMENTO.md` — Go-to-market, beta, parcerias SENAI | Fase 3: Monetização | ✅ Concluído |
| 9 | `09-METRICAS-E-KPIs.md` — AARRR, integração CF Analytics | Fase 3: Monetização | ✅ Concluído |
| 10 | `10-LANDING-PAGE-SPEC.md` — Wireframe, copy PT-BR, CTAs | Fase 4: Execução | ✅ Concluído |
| 11 | `11-MATERIAIS-MARKETING.md` — Templates email, LinkedIn, pitch | Fase 4: Execução | ✅ Concluído |
| 12 | `00-INDICE-MASTER.md` — Índice + resumo executivo | Fase 4: Execução | ✅ Concluído |

**Docs de referência (originais):** `DOCUMENTACAO_MARKETING_MONETIZACAO/` (8 arquivos existentes — serão movidos para `_originais/` quando os novos forem criados)

**⚠️ IMPORTANTE:** Sessões de refinamento documental — NÃO executar código. Ler o plano completo e os docs originais de referência no início da sessão.

---

### ⬜ Redesign Dashboard Principal (v0.8.0)

**Plano completo:** `docs/plans/PLAN_Redesign_Dashboard_v0.8.0.md`
**Plano de execução:** `docs/plans/redesign-v0.8.0/PLANO-EXECUCAO-SESSAO.md`

**8 fases — renumeradas após auditoria 23/03/2026:**

| Fase | Titulo | Documento | Status |
|------|--------|-----------|--------|
| 1 | Fundação — Tipos, Store, Dados | `FASE-1-fundacao-tipos-store-dados.md` | ✅ Concluído (`5f98c9d`) |
| 2 | Layout 2 Colunas + Accordion | `FASE-2-layout-2-colunas-accordion.md` | ✅ Concluído (`7afbe82`) |
| 3 | Ferramenta → Dropdowns | `FASE-3-ferramenta-dropdowns.md` | ✅ Concluído (`70cf508`) |
| 4 | Fix Atômico Store | `FASE-4-fix-atomico-store.md` | ✅ Concluído (`274cf28`) |
| 5 | Biblioteca de Ferramentas (Manual) | `FASE-5-biblioteca-ferramentas.md` | ✅ Concluído (`293547a`) |
| 6 | Fontes + Polish + Release v0.8.0 | `FASE-6-fontes-polish-release.md` | ✅ Concluído (`78d6a0e`) |
| 7 | Objetivo Usinagem | `FASE-7-v2-objetivo-usinagem.md` | ⬜ Pendente (desbloqueado) |
| 8A | Favoritar Simulação | `FASE-8A-favoritar-simulacao.md` | ⬜ Pendente (desbloqueado) |
| 8B | Tornar Input Padrão | `FASE-8B-tornar-input-padrao.md` | ⬜ Pendente (desbloqueado) |

**v0.8.0 lançado.** Fases 7, 8A, 8B substituídas pelo plano maior de v0.9 (8 itens) definido em 24/03/2026.

---

### ⬜ Implementações Dashboard v0.9

**Especificação completa:** `docs/plans/IMPLEMENTACOES_DASHBOARD_v0.9.md`

**7 itens — planos detalhados em `docs/plans/v0.9/`:**

| # | Item | Complexidade | Fase | Status |
|---|------|-------------|------|--------|
| 01 | Input livre (Diâmetro, Raio, Altura) | Média | A | ✅ Concluído (`625b4f0`) |
| 02 | Arestas (Z) → 4 botões | Baixa | A | ✅ Concluído (`625b4f0`) |
| 03 | Botão ⭐ favoritar simulação — dashboard + histórico | Média | B | 📋 Pronto |
| 07 | Slider Fator de Segurança no dashboard desktop | Baixa | B | 📋 Pronto |
| 05 | Redesign visor central — hierarquia industrial HMI | Alta | C | 📋 Pronto |
| 08 | Rodapé coluna esquerda — favoritos, histórico, config, versão | Média | C | 📋 Pronto |
| 09 | Config: simplificar ferramentas + remover Kc | Média | D | 📋 Pronto |

**Fase A concluída** (`625b4f0`). **Próxima sessão:** Implementar Fase B (itens #03 + #07) → Fase C → Fase D.

---

## 🟡 PRIORIDADE 2 — Alternativas (BACKLOG vazio ou bloqueado)

> Usar apenas se todos os itens da P1 estiverem concluídos ou se o item pendente exigir ação manual do Rafael.

| # | Item | Descrição |
|---|------|-----------|
| A | Fix teste falhando | `fz step mobile` — 1 teste pendente em `mobile-fine-tune-section.test.tsx` |
| B | Story-008 | Nova feature a definir com Rafael |
| C | Landing Page | Cloudflare Pages — setup manual pendente |
| D | Login Google | Firebase Auth + Firestore — 5 fases (L1-L5) |

---

## 🔧 PROTOCOLO FIM DE SESSÃO

> Rafael fala **"fim de sessão"** → executar este checklist completo.

```bash
# 1. Testes
npx vitest run

# 2. TypeScript
npx tsc --noEmit

# 3. Build
npx vite build

# 4. Commit código
git add <arquivos específicos>
git commit -m "feat/fix/style/docs/refactor: descrição"

# 5. Push
git push origin main
```

Depois do push:

- [ ] Atualizar tabela de estado no topo deste arquivo (versão, testes, build, commits)
- [ ] Atualizar tabela PRIORIDADE 1 — marcar itens concluídos como `✅ Concluído`
- [ ] Atualizar `docs/plans/BACKLOG_IMPLEMENTACAO.md` — mesma sincronização
- [ ] Adicionar entrada no histórico de `docs/PROXIMA_SESSAO.md`
- [ ] Atualizar `docs/timeline.html` + `public/timeline.html` (mover cards, atualizar métricas)
- [ ] Atualizar `memory/MEMORY.md`

```bash
# Commit docs
git add docs/ public/timeline.html
git commit -m "docs: update roadmap + timeline vX.Y.Z"
git push origin main
```

> ✅ **Deploy automático:** o `git push origin main` já publica tudo — o GitHub Actions (`deploy-cloudflare.yml`) executa `npm run build` + `wrangler deploy` com token de API. A `public/timeline.html` é copiada para `dist/` no build e servida automaticamente pelo Worker. **Não é necessária nenhuma ação manual.**

---

## 📋 COMO ADICIONAR NOVOS ITENS AO BACKLOG

Quando uma nova implementação for planejada durante a sessão:

1. Criar arquivo de plano em `docs/plans/PLAN_NomeDaFeature.md`
2. Adicionar linha na tabela **PRIORIDADE 1** deste arquivo
3. Adicionar linha na tabela de `docs/plans/BACKLOG_IMPLEMENTACAO.md`
4. **NÃO** adicionar em `docs/PROXIMA_SESSAO.md` — esse arquivo é só histórico

---

## 🗂️ ARQUIVOS DE REFERÊNCIA RÁPIDA

| Arquivo | Finalidade |
|---------|-----------|
| `docs/ROADMAP_SESSAO_ATUAL.md` | **Este arquivo** — prioridades + protocolo fim de sessão |
| `docs/plans/BACKLOG_IMPLEMENTACAO.md` | Detalhes técnicos de cada item do backlog |
| `docs/PROXIMA_SESSAO.md` | Histórico detalhado de todas as sessões anteriores |
| `docs/plans/PLAN_*.md` | Planos de implementação individuais |
| `CLAUDE.md` | Regras do projeto, stack, convenções |
| `memory/MEMORY.md` | Memória persistente entre sessões |

---

## ⚠️ ARMADILHAS CONHECIDAS

| Problema | Causa | Solução |
|----------|-------|---------|
| `exit code 1` em `vitest run` | Warnings ANSI no stderr | Verificar se aparece `X passed` — se sim, OK |
| `exit code 1` em `vite build` | Warnings do vite | Verificar se aparece `✓ built in` — se sim, OK |
| Slider "não funciona" no teste | `StyledSlider` é div, não `input` | Testar via botões `+`/`−` com `fireEvent.click` |
| Teste do store não recalcula | Store não auto-recalcula | Chamar `getState().calcular()` explicitamente |
| Tailwind classe purgada | Interpolação em runtime | Usar classes completas estáticas OU `style={}` |
| Tailwind v4 translate vs transform | `-translate-x-1/2` ≠ `style={{ transform }}` | Usar apenas uma das duas no mesmo elemento |
| Worktree branch ≠ main | Commits em worktree não aparecem em main | Merge explícito + push após terminar |
| Floating-point boundary | `0.075/0.1 ≠ 0.75` exatamente | Usar valores com margem clara em testes |

---

*Última atualização: 23/03/2026 — Auditoria completa dos planos v0.8.0: fases renumeradas (4=fix store, 5=biblioteca ferramentas, 6=fontes+release), fases 7-8 bloqueadas. Planos legados em `_legado/`. Próxima sessão: implementar Fases 4→5→6 em sequência | ⚠️ `public/_headers` tem CSP não commitado: `connect-src 'self'` bloqueia `api.cloudflare.com` — corrigir na Fase 2 da Segurança*
