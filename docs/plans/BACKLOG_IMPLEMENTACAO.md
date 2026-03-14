# Backlog de Implementação — ToolOptimizer CNC

> **Última atualização:** 14/03/2026
> **Versão atual:** v0.5.2
> **Total de planos pendentes:** 1

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

**Regras aplicadas:**
- Bugs antes de features
- Menor escopo antes de maior escopo
- Segurança após estabilidade funcional
- Fases manuais (Rafael) e automáticas (Claude) claramente separadas
