# Timeline & Pendências — ToolOptimizer CNC

> **Criado:** 15/03/2026
> **Objetivo:** Mapeamento completo de execuções, planos e pendências do projeto.
> **Uso:** Referência para refinamento e planejamento de próximas sessões.

---

## TIMELINE CRONOLÓGICA

### FEV/2026 — Fundação e Auditoria

| Data | Item | Tipo | Plano | Status |
|------|------|------|-------|--------|
| ~25/02 | **Auditoria completa** (15 issues, score 87/100) | Auditoria | `PLANO_AUDITORIA.md` | ✅ |
| ~25/02 | Fases 1-5: forçaCorte, design system, visual, typography, colors | Refactor | (parte da auditoria) | ✅ |

### FEV-MAR/2026 — Stories Core

| Data | Item | Tipo | Versão | Status |
|------|------|------|--------|--------|
| ~fev | **Story-001**: Limpeza + ADRs | Infra | — | ✅ |
| ~fev | **Story-002**: Deploy Cloudflare | Deploy | — | ✅ |
| ~fev | **Story-003**: CI/CD GitHub Actions | CI/CD | — | ✅ |
| ~fev | **Story-004**: SEO | SEO | — | ✅ |
| ~fev | **Story-005**: ParameterHealthBar | Feature | v0.3.0 | ✅ |
| ~fev | **Story-006**: HistoryPage + Analytics | Feature | v0.4.0 | ✅ |
| ~fev | **Story-007**: Slider Bounds Dinâmicos | Feature | v0.4.1 | ✅ |

### MAR/2026 — Unificação, Fixes e Polish

| Data | Item | Tipo | Versão | Status |
|------|------|------|--------|--------|
| ~mar | Unificação Indicadores (fz/ae/ap → padrão Vc) | Feature | v0.4.2 | ✅ |
| ~mar | Fix double-translation slider thumb Tailwind v4 | Bug Fix | v0.4.3 | ✅ |
| ~mar | 3 Gauges (Feed Headroom, MRR, Tool Health) + Logo | Feature | v0.5.0 | ✅ |
| 11/03 | Phase 13: BugReportButton — modal mailto + tracking | Feature | v0.5.0 | ✅ |
| 13/03 | Fix BugReportModal: card opaco + maxLength + ordem | Bug Fix | v0.5.1 | ✅ |
| 13/03 | Fix TouchSlider Mobile: thumb hit zone 60×60px | Bug Fix | v0.5.2 | ✅ |
| 13/03 | Favicon + Ícones: web PWA + Electron .exe | Polish | v0.5.2 | ✅ |
| 13/03 | Dívida técnica v0.5.1-v0.5.2 | Tech Debt | v0.5.2 | ✅ |
| 13/03 | Phase 14: Simplificação Settings Máquina | Refactor | v0.5.2 | ✅ |

### 14-15/MAR/2026 — Reestruturação Documental (v0.6.0)

| Data | Item | Tipo | Status |
|------|------|------|--------|
| 14/03 | Phase 1: Archive dead weight (29 arquivos) | Docs | ✅ (`2651a89`) |
| 14/03 | Phase 2: Eliminate duplicates (~15 arquivos) | Docs | ✅ (`d2faf15`) |
| 14/03 | Phase 3: Trim PROXIMA_SESSAO + clean workflows | Docs | ✅ (`9770648`) |
| 15/03 | Phase 4: Update references + bump v0.6.0 | Docs | ✅ (`f058230`) |

---

## PENDÊNCIAS — Aguardando Execução

### P1: Bug BugReportModal — Posicionamento

- **Tipo:** Bug Fix | **Prioridade:** ALTA
- **Problema:** Modal abre com card cortado/posicionado errado — conteúdo principal não visível, apenas checkbox inferior aparece
- **Fix anterior (v0.5.1):** Resolveu transparência do card — este é um bug DIFERENTE
- **Arquivo:** `src/components/bug-report-button.tsx`
- **Extra:** `APP_VERSION` hardcoded como `'0.5.1'` (linha 7) — atualizar para versão atual
- **Status:** ⬜ Sem plano — criar plano de fix na próxima sessão

### P2: Logo — Atualizar Cores e Adicionar "CNC"

- **Tipo:** Polish/Branding | **Prioridade:** MÉDIA
- **Problema:** Logo atual não está com as cores corretas do design system e falta a identificação "CNC" na imagem
- **O que fazer:** Atualizar logo com cores corretas (tokens do projeto) e adicionar letras "CNC"
- **Status:** ⬜ Sem plano — criar plano na próxima sessão

### P3: Segurança Cibernética (v0.5.5)

- **Tipo:** Security | **Prioridade:** ALTA
- **Plano:** `docs/plans/PLAN_Seguranca_Cibernetica.md`

| Fase | Ação | Responsável | Status |
|------|------|-------------|--------|
| 1 | Repo privado + remover GitHub Pages | Rafael (manual) | ⬜ |
| 2 | CSP header em `public/_headers` | Claude | ⬜ |
| 3 | npm audit no CI + Dependabot | Claude | ⬜ |
| 4 | Validação ranges em importSettings/importHistory | Claude | ⬜ |
| 5 | Remover script Plausible inativo | Claude | ⬜ |
| 6 | Bot Fight Mode + Rate Limiting | Rafael (manual) | ⬜ |
| 7 | Branch protection + Dependabot alerts | Rafael (manual) | ⬜ |

### P4: timeline.html desatualizado

- **Tipo:** Docs | **Prioridade:** MÉDIA
- **Arquivos:** `docs/timeline.html`, `public/timeline.html`
- **Status:** ⬜ Verificar e atualizar para refletir v0.6.0

### P5: Teste fz step mobile

- **Tipo:** Test | **Prioridade:** BAIXA
- **Arquivo:** `mobile-fine-tune-section.test.tsx`
- **Status:** ⬜ 1 teste pendente

### P6: Story-008

- **Tipo:** Feature | **Prioridade:** —
- **Status:** ⬜ A definir com Rafael

### P7: Landing Page

- **Tipo:** Marketing | **Prioridade:** BAIXA
- **Status:** ⬜ Cloudflare Pages — setup manual pendente

### P8: Login Google (Firebase)

- **Tipo:** Feature | **Prioridade:** BAIXA
- **Planos antigos:** `docs/_archive/superseded/PLANO_LOGIN_GOOGLE.md` (obsoleto)
- **Status:** ⬜ Não iniciada

---

## LOCALIZAÇÃO DOS PLANOS

| Pasta | Conteúdo | Qtd |
|-------|----------|-----|
| `docs/plans/` | Planos ativos e backlog | 3 arquivos |
| `docs/_archive/plans-completed/` | Planos concluídos | 7 arquivos |
| `docs/_archive/phases/` | Fases da reestruturação v0.6.0 | 5 arquivos |
| `docs/_archive/superseded/` | Docs obsoletos/substituídos | 14 arquivos |
| `docs/_archive/stories-completed/` | Stories concluídas | ~7 arquivos |
| `docs/_archive/sessions/` | Logs de sessões antigas | ~18 arquivos |

---

## RESUMO

```
CONCLUÍDO: 29+ itens (Stories 1-7, Auditoria, Gauges, Fixes, Reestruturação)
PENDENTE:  8 itens priorizados abaixo

  P1  🔴  Bug BugReportModal posicionamento
  P2  🟡  Logo — cores corretas + letras "CNC"
  P3  🟡  Segurança Cibernética v0.5.5
  P4  🟡  timeline.html desatualizado
  P5  ⚪  APP_VERSION hardcoded
  P6  ⚪  fz step mobile test
  P7  ⚪  Story-008 (a definir)
  P8  ⚪  Landing Page / Login Google
```

---

*Documento criado em 15/03/2026 — para refinamento na próxima sessão.*
