# Plano de Auditoria Completa — ToolOptimizer CNC

> **Data:** 25/02/2026 | **Score:** 87/100 | **Problemas encontrados:** 15
> **Referência:** Auditoria cobriu UI/design, engine/store, testes/build/infra

---

## Contexto

Auditoria completa do ToolOptimizer CNC revelou **15 problemas** em 3 categorias:
bugs de lógica no engine, inconsistências visuais no dashboard, e gaps de cobertura de testes.
O objetivo é padronizar o design system, corrigir bugs críticos e expandir a qualidade do código.

---

## FASE 1 — Correções Críticas (remoção forcaCorte + SEO + guards)
> Commit: `fix: remove forcaCorte from system, fix landing broken links, vite base URL`

### 1A. Remover `forcaCorte` completamente do sistema
O usuário decidiu que `forcaCorte` não é usado na prática e polui os cálculos.
Remover de todos os arquivos (6 no projeto principal):

| Arquivo | Linha | Ação |
|---------|-------|------|
| `src/types/index.ts` | 90 | Remover `forcaCorte: number` do type `ResultadoUsinagem` |
| `src/store/machining-store.ts` | 402 | Remover `forcaCorte: kc * ae * ap` do objeto `resultado` |
| `src/components/results-panel.tsx` | 18 | Remover `forcaCorte: 0` do EMPTY_RESULTADO |
| `tests/store/history-store.test.ts` | 25 | Remover `forcaCorte: 2000` do mock |
| `tests/pages/history-page.test.tsx` | 15 | Remover `forcaCorte: 2000` do mock |
| `docs/technical/srctypes.md` | 90 | Remover da documentação de tipos |

**Não alterar** `Sistema_Desktop_Pen_driver/` (clone isolado, regra do projeto).

### 1B. Landing page — links quebrados (SEO crítico)
- **Arquivo:** `landing/index.html` linhas 634-637
- **Problema:** Links para `blog.`, `docs.`, `status.tooloptimizercnc.com.br` — subdomínios inexistentes
- **Fix:** Remover os 3 links quebrados, manter apenas `Calculadora` e `Mestre CNC`

### 1C. Vite base URL — fallback confuso
- **Arquivo:** `vite.config.ts` linha 9
- **Problema:** Fallback é `/ToolOptimizerCNC/` (GitHub Pages) mas deploy primário é Cloudflare (`/`)
- **Fix:** Mudar fallback para `/`: `base: process.env.VITE_BASE_URL || '/'`
- **Verificar:** `.github/workflows/deploy.yml` — adicionar `VITE_BASE_URL: /ToolOptimizerCNC/` explícito no job do GitHub Pages

### 1D. Guard defensivo no CTF (chip-thinning)
- **Arquivo:** `src/engine/chip-thinning.ts` ~linha 52
- **Problema:** Se `sqrtRatio === 0`, divisão gera `Infinity` (guards existem no caller, mas não na função)
- **Fix:** Adicionar `if (sqrtRatio === 0) throw new Error('CTF denominator zero')`

---

## FASE 2 — Extração do Design System
> Commit: `refactor: extract StyledSlider to shared component, create design tokens`

### 2A. Extrair StyledSlider para componente compartilhado
- **Duplicação confirmada:** `src/components/fine-tune-panel.tsx` (linhas 40-130) = `src/pages/settings-page.tsx` (linhas 136-212) — código idêntico
- **Criar:** `src/components/styled-slider.tsx`
  - Exportar `StyledSlider` + `BTN_CLS` + `StyledSliderProps` (interface)
- **Modificar:** `fine-tune-panel.tsx` — remover StyledSlider local, importar de `./styled-slider`
- **Modificar:** `settings-page.tsx` — remover StyledSlider local, importar de `@/components/styled-slider`
- **Teste:** Criar `tests/components/styled-slider.test.tsx` (render, aria, keyboard, mouse drag)

### 2B. Criar constantes de design tokens
- **Criar:** `src/components/design-tokens.ts`
- Constantes de classes Tailwind reutilizáveis:
  ```
  CARD_GLASS = 'bg-surface-dark backdrop-blur-xl border border-white/5 rounded-xl shadow-glass'
  CARD_INNER = 'bg-black/30 border border-white/5 rounded-lg'
  MODAL_OVERLAY, MODAL_BACKDROP, MODAL_PANEL
  ```

### 2C. Adicionar custom font sizes no @theme
- **Arquivo:** `src/index.css` bloco `@theme`
- Adicionar: `--font-size-2xs: 10px` e `--font-size-fine: 11px`
- Gera classes `text-2xs` e `text-fine` para substituir `text-[10px]` e `text-[11px]`

---

## FASE 3 — Consistência Visual do Dashboard
> Commit: `style: normalize colors, borders, backdrop blur across dashboard`

### 3A. Cores: ae deve usar purple, não orange
- **Arquivo:** `src/components/tool-summary-viewer.tsx` linha 42
- **Atual:** `ae` e `ap` ambos `text-accent-orange`
- **Fix:** `ae` → `text-accent-purple`, `ap` permanece `text-accent-orange`

### 3B. ToolSummaryViewer — padrão glassmorphism
- **Arquivo:** `src/components/tool-summary-viewer.tsx` linha 32
- **Fix:** Envolver em card glassmorphism padrão + manter accent-left como detalhe interno

### 3C. Border radius — hierarquia padronizada
- **Regra:** containers `rounded-2xl` → cards `rounded-xl` → botões/inputs `rounded-lg` → pills `rounded-full`

### 3D. Typography — migrar arbitrary values
- Substituir `text-[10px]` → `text-2xs` e `text-[11px]` → `text-fine`
- Arquivos: fine-tune-panel, mobile-fine-tune-section, settings-page, config-panel, results-panel, parameter-health-bar

### 3E. Documentar cores amarelo/orange
- `seg-amarelo` (#f39c12) = semáforo de segurança
- `accent-orange` (#F97316) = parâmetro ap (UI accent)
- Documentar no `index.css` com comentários

---

## FASE 4 — Qualidade de Código (guards + legibilidade)
> Commit: `refactor: L/D boundary comments, L/D-aware recommendations, hardened IDs`

### 4A. Clarificar operadores L/D em validators.ts
- Adicionar comentários explicando `[0,3]` verde, `(3,4)` amarelo, `[4,6]` vermelho, `(6,∞)` bloqueado

### 4B. Recommendations: consciência de L/D
- Adicionar param opcional `balanco?: number` em `getRecommendedParams()`
- Quando `balanco/diametro > 6`, limitar `ap` a 0.1

### 4C. History ID — usar crypto.randomUUID()
- Fallback para Date.now()+random (jsdom nos testes)

### 4D. Console.warn para debug de baseRPM=0
- `if (import.meta.env.DEV) console.warn(...)` no guard

---

## FASE 5 — Expansão de Testes
> Commit: `test: mobile components, missing UI tests, L/D integration, coverage config`

### 5A. Testes mobile (novos arquivos)
- mobile-results-section, mobile-fine-tune-section, mobile-config-section

### 5B. Testes faltantes
- disclaimer, ui-helpers, shared-result-parts, viewport-redirect

### 5C. Integração L/D > 6
- Cenário: balanco/D > 6 → nivel === 'bloqueado'

### 5D. Code coverage
- vitest.config.ts + @vitest/coverage-v8

### 5E. Fix act() warnings
- config-panel.test.tsx → act() + waitFor()

---

## Resumo

| Fase | Tipo | Risco | Tempo Est. |
|------|------|-------|------------|
| 1 — Correções Críticas | `fix:` | Baixo | ~45 min |
| 2 — Design System | `refactor:` | Médio | ~1.5h |
| 3 — Consistência Visual | `style:` | Baixo | ~1h |
| 4 — Qualidade de Código | `refactor:` | Baixo | ~45 min |
| 5 — Testes | `test:` | Nenhum | ~2h |

**Total: ~6 horas** (5 sessões independentes)

---

*Criado em: 25/02/2026 — Auditoria completa do sistema*
