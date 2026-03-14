# ROADMAP DA SESSÃO ATUAL — ToolOptimizer CNC

> **Ponto de entrada obrigatório de toda sessão.**
> Leia este arquivo do início ao fim antes de qualquer ação.
> Histórico detalhado de sessões: `docs/PROXIMA_SESSAO.md`

---

## 📍 ESTADO DO PROJETO

| Item | Valor |
|------|-------|
| **Branch** | `main` |
| **Versão** | `0.5.2` |
| **Testes** | **637 passando** (40 arquivos) — 0 falhas |
| **TypeScript** | **zero erros** |
| **Build** | **limpo** — JS 96.78KB gzip, CSS 13.66KB |
| **Remote** | `origin/main` sincronizado ✅ |
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

### ⬜ PRÓXIMO: Segurança Cibernética (v0.5.5)

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

> ⚠️ **Lembrar Rafael:** rodar `npx wrangler deploy` para publicar timeline online (requer autenticação interativa).

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

*Última atualização: 14/03/2026 — Sessão 14/03 — Criação do ROADMAP unificado*
