# Implementacao por Sessoes — Auditoria ToolOptimizer CNC

> **PARA O PROXIMO ASSISTENTE — LEIA ISTO PRIMEIRO**
>
> Este documento controla o progresso da implementacao da auditoria.
> **1 fase = 1 sessao.** Ao iniciar uma sessao, encontre a proxima fase pendente e execute-a por completo.
> O plano detalhado de cada fase esta em `docs/PLANO_AUDITORIA.md`.
> Ao concluir, marque como concluido aqui e atualize PROXIMA_SESSAO.md + MEMORY.md.

---

## Status Geral

| Sessao | Fase | Status | Commit |
|--------|------|--------|--------|
| S1 | FASE 1 — Correcoes Criticas | ✅ Concluido | `1cc4056` |
| S2 | FASE 2 — Design System | ⬜ Pendente | — |
| S3 | FASE 3 — Consistencia Visual | ⬜ Pendente | — |
| S4 | FASE 4 — Qualidade de Codigo | ⬜ Pendente | — |
| S5 | FASE 5 — Expansao de Testes | ⬜ Pendente | — |

---

## FASE 1 — Correcoes Criticas
**Status:** ✅ Concluido — 27/02/2026 — commit `1cc4056`
**Commit esperado:** `fix: remove forcaCorte, fix landing links, vite base URL, CTF guard`
**Plano detalhado:** `docs/PLANO_AUDITORIA.md` → secao FASE 1

### Tarefas:
- [ ] **1A.** Remover `forcaCorte` de 6 arquivos:
  - [ ] `src/types/index.ts` (linha 90) — remover do type `ResultadoUsinagem`
  - [ ] `src/store/machining-store.ts` (linha 402) — remover do objeto `resultado`
  - [ ] `src/components/results-panel.tsx` (linha 18) — remover do EMPTY_RESULTADO
  - [ ] `tests/store/history-store.test.ts` (linha 25) — remover do mock
  - [ ] `tests/pages/history-page.test.tsx` (linha 15) — remover do mock
  - [ ] `docs/technical/srctypes.md` (linha 90) — remover da documentacao
- [ ] **1B.** Remover links quebrados da landing (`landing/index.html` linhas 634-637)
  - Remover: blog, docs, status (subdomínios inexistentes)
  - Manter: Calculadora, Mestre CNC
- [ ] **1C.** Mudar vite base URL (`vite.config.ts` linha 9)
  - De: `process.env.VITE_BASE_URL || '/ToolOptimizerCNC/'`
  - Para: `process.env.VITE_BASE_URL || '/'`
  - Verificar: `.github/workflows/deploy.yml` — GitHub Pages precisa de VITE_BASE_URL explícito
- [ ] **1D.** Guard CTF (`src/engine/chip-thinning.ts` ~linha 52)
  - Adicionar: `if (sqrtRatio === 0) throw new Error('CTF denominator zero')`

### Quality Gates:
- [ ] `npx vitest run` → todos passando (devem ser ~399 após remover forcaCorte dos mocks)
- [ ] `npx tsc --noEmit` → zero erros
- [ ] `npx vite build` → build limpo

### Ao concluir:
- [ ] `git add` arquivos especificos + `git commit -m "fix: ..."`
- [ ] `git push origin main`
- [ ] Marcar FASE 1 como ✅ neste documento
- [ ] Atualizar `docs/PROXIMA_SESSAO.md` e `memory/MEMORY.md`
- [ ] Notificar usuario: **"FASE 1 concluida. Iniciar nova sessao para FASE 2."**

---

## FASE 2 — Extracao do Design System
**Status:** ⬜ Pendente
**Commit esperado:** `refactor: extract StyledSlider to shared component, create design tokens`
**Plano detalhado:** `docs/PLANO_AUDITORIA.md` → secao FASE 2

### Tarefas:
- [ ] **2A.** Extrair StyledSlider para componente compartilhado
  - [ ] Criar `src/components/styled-slider.tsx` com StyledSlider + BTN_CLS + interface
  - [ ] Modificar `src/components/fine-tune-panel.tsx` — remover local, importar shared
  - [ ] Modificar `src/pages/settings-page.tsx` — remover local, importar shared
  - [ ] Criar `tests/components/styled-slider.test.tsx` (render, aria, keyboard, drag)
- [ ] **2B.** Criar design tokens
  - [ ] Criar `src/components/design-tokens.ts` com CARD_GLASS, CARD_INNER, MODAL_*
- [ ] **2C.** Font sizes customizados
  - [ ] Adicionar `--font-size-2xs: 10px` e `--font-size-fine: 11px` no @theme (`src/index.css`)

### Quality Gates:
- [ ] `npx vitest run` → todos passando
- [ ] `npx tsc --noEmit` → zero erros
- [ ] `npx vite build` → build limpo
- [ ] Visual: sliders funcionam igual antes (fine-tune + settings)

### Ao concluir:
- [ ] Commit + push
- [ ] Marcar FASE 2 como ✅ neste documento
- [ ] Atualizar PROXIMA_SESSAO.md e MEMORY.md
- [ ] Notificar usuario: **"FASE 2 concluida. Iniciar nova sessao para FASE 3."**

---

## FASE 3 — Consistencia Visual do Dashboard
**Status:** ⬜ Pendente
**Commit esperado:** `style: normalize colors, borders, backdrop blur across dashboard`
**Plano detalhado:** `docs/PLANO_AUDITORIA.md` → secao FASE 3

### Tarefas:
- [ ] **3A.** Cores: `ae` → `text-accent-purple` no `tool-summary-viewer.tsx` (linha 42)
- [ ] **3B.** ToolSummaryViewer → glassmorphism padrao (border-white/5 + backdrop-blur)
- [ ] **3C.** Border radius: verificar hierarquia (2xl → xl → lg → full)
- [ ] **3D.** Typography: migrar `text-[10px]` → `text-2xs`, `text-[11px]` → `text-fine`
  - Arquivos: fine-tune-panel, mobile-fine-tune-section, settings-page, config-panel, results-panel, parameter-health-bar
- [ ] **3E.** Documentar cores amarelo/orange no `index.css` (comentarios)

### Quality Gates:
- [ ] Todos os testes passando
- [ ] TypeScript limpo
- [ ] Build limpo
- [ ] Visual: dashboard consistente (cores, bordas, blur)

### Ao concluir:
- [ ] Commit + push
- [ ] Marcar FASE 3 como ✅ neste documento
- [ ] Atualizar PROXIMA_SESSAO.md e MEMORY.md
- [ ] Notificar usuario: **"FASE 3 concluida. Iniciar nova sessao para FASE 4."**

---

## FASE 4 — Qualidade de Codigo
**Status:** ⬜ Pendente
**Commit esperado:** `refactor: L/D boundary comments, L/D-aware recommendations, hardened IDs`
**Plano detalhado:** `docs/PLANO_AUDITORIA.md` → secao FASE 4

### Tarefas:
- [ ] **4A.** Comentarios L/D em `src/engine/validators.ts` (linhas 40-43)
- [ ] **4B.** `getRecommendedParams()` — param `balanco?` + cap ap quando L/D > 6
  - [ ] Modificar `src/engine/recommendations.ts`
  - [ ] Adicionar teste em `tests/engine/recommendations.test.ts`
- [ ] **4C.** `crypto.randomUUID()` em `src/store/history-store.ts` (linha 43)
- [ ] **4D.** `console.warn` DEV em `src/store/machining-store.ts` (linhas 188-189)

### Quality Gates:
- [ ] Todos os testes passando
- [ ] TypeScript limpo
- [ ] Build limpo

### Ao concluir:
- [ ] Commit + push
- [ ] Marcar FASE 4 como ✅ neste documento
- [ ] Atualizar PROXIMA_SESSAO.md e MEMORY.md
- [ ] Notificar usuario: **"FASE 4 concluida. Iniciar nova sessao para FASE 5."**

---

## FASE 5 — Expansao de Testes
**Status:** ⬜ Pendente
**Commit esperado:** `test: mobile components, missing UI tests, L/D integration, coverage config`
**Plano detalhado:** `docs/PLANO_AUDITORIA.md` → secao FASE 5

### Tarefas:
- [ ] **5A.** Testes mobile:
  - [ ] `tests/components/mobile-results-section.test.tsx`
  - [ ] `tests/components/mobile-fine-tune-section.test.tsx`
  - [ ] `tests/components/mobile-config-section.test.tsx`
  - [ ] Testes mobile-sticky em `tests/pages/mobile-page.test.tsx`
- [ ] **5B.** Testes faltantes:
  - [ ] `tests/components/disclaimer.test.tsx`
  - [ ] `tests/components/ui-helpers.test.tsx`
  - [ ] `tests/components/shared-result-parts.test.tsx`
  - [ ] `tests/components/viewport-redirect.test.tsx`
- [ ] **5C.** Integracao L/D > 6 em `tests/store/machining-store.test.ts`
- [ ] **5D.** Coverage config:
  - [ ] `npm install -D @vitest/coverage-v8`
  - [ ] Configurar em `vitest.config.ts`
  - [ ] Adicionar script `test:coverage` no `package.json`
- [ ] **5E.** Fix act() warnings em `tests/components/config-panel.test.tsx`

### Quality Gates:
- [ ] Todos os testes passando (contagem deve aumentar significativamente)
- [ ] TypeScript limpo
- [ ] Build limpo
- [ ] `npm run test:coverage` → gera relatorio

### Ao concluir:
- [ ] Commit + push
- [ ] Marcar FASE 5 como ✅ neste documento
- [ ] Atualizar PROXIMA_SESSAO.md e MEMORY.md
- [ ] **Auditoria completa!** Atualizar score para ~95/100
- [ ] Considerar version bump (0.3.0 → 0.4.0) se significativo

---

## Historico de Execucao

| Data | Sessao | Quem | Resultado |
|------|--------|------|-----------|
| 27/02/2026 | S1 | Claude Sonnet 4.6 | ✅ 401 testes, zero erros TS, build limpo |
| — | S2 | — | — |
| — | S3 | — | — |
| — | S4 | — | — |
| — | S5 | — | — |

---

*Criado em: 25/02/2026 — Resultado da auditoria completa do sistema*
*Referencia: `docs/PLANO_AUDITORIA.md` para detalhes completos de cada fase*
