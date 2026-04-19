# Memoria de Engenharia

> Aprendizados tecnicos acumulados ao longo do desenvolvimento do ToolOptimizer CNC.
> Este arquivo e commitado no git — visivel a qualquer assistente, nao apenas ao Claude Code.
>
> **Como atualizar:** Usar comando `registrar aprendizado` ou adicionar durante `fim de sessao`.
> Sempre aguardar aprovacao do usuario antes de editar.

---

## Engine (src/engine/)

### Formulas CNC validadas
- RPM = (Vc x 1000) / (pi x D) — fonte: ISO/Sandvik
- Avanco F = fz x Z x RPM
- Kienzle: Fc = kc1.1 x h^(1-mc) x b — dados em `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md`
- CTF = 1/sqrt(1-(1-2ae/D)^2) quando ae < 50% de D, senao CTF = 1.0
- L/D ratio: <=3 verde, 3-4 amarelo, 4-6 vermelho, >6 BLOQUEADO

### calcularSliderBounds()
- Funcao infraestrutura em `src/engine/slider-bounds.ts`
- Bounds dinamicos por material, operacao e ferramenta
- NUNCA hardcodar ranges — sempre usar esta funcao
- Chamada 4x por render (1 por health bar) — leve o suficiente

---

## Store (src/store/)

### No-auto-recalc (regra critica)
- `setMaterial/setFerramenta/setTipoOperacao/setParametros/setSafetyFactor` → zera resultado, NAO recalcula
- `ajustarParametros()` → calcular() imediato, NAO zera resultado, preserva manualOverrides
- `setLimitesMaquina` → chama calcular() automaticamente (unica excecao)
- Nos testes: SEMPRE chamar `getState().calcular()` explicitamente apos set*

### Persist migration (Zustand)
- version bump: `version: 2` → `version: 3` quando campos sao removidos do state
- Migration pattern para remover campos:
  ```typescript
  if (fromVersion < 3) {
    const { fieldToRemove1, fieldToRemove2, ...rest } = state as Record<string, unknown>;
    return rest;
  }
  ```
- Sem migration → campos removidos persistem no localStorage causando erros de tipo

---

## UI (src/components/)

### Cores dinamicas
- ZONE_RGB = lookup estatico: `{ verde: '46,204,113', amarelo: '243,156,18', vermelho: '231,76,60' }`
- Usar `style={{ backgroundColor: rgba(${rgb}, 0.9) }}` — NUNCA `className={bg-${zone}}`
- Tailwind v4 purga classes interpoladas no build de producao

### Sliders
- RPM/Feed: BidirectionalSlider (-150% a +150%) em results-panel
- Vc/fz/ae/ap desktop: StyledSlider (div customizado, NAO input)
- Vc/fz/ae/ap mobile: TouchSlider (hold-to-activate 800ms)
- Testar StyledSlider via botoes +/- (nao via input events)

### ParameterHealthBar (v0.4.2)
- 4 indicadores unidirecionais — position [0,1], zone por ratio (valor/recomendado)
- UnidirectionalBar = componente compartilhado
- InactiveBar apenas para fz (precisa resultado da simulacao)
- Bounds via calcularSliderBounds() — nunca hardcodar

---

## Testes (tests/)

### Tolerancias padrao
- RPM: ±1 | Feed: ±1 | Power: ±0.01 | Torque: ±0.01
- `toBeCloseTo(x, 0)` = margem ±0.5, NAO ±1
- Para margem ±1: usar `Math.abs(val - expected) <= 1`

### Floating-point
- `0.075 / 0.1 = 0.7499999999999999` (nao 0.75 exatamente)
- Nunca testar exatamente no boundary — usar valores com margem clara
- Division edge: para testar position=0, AMBOS numerador E denominador devem resultar em 0

### Ambiente
- StyledSlider e div, nao input — testar via botoes +/-
- BrowserRouter obrigatorio em testes mobile (MobilePage usa hooks de routing)
- `exclude: ['Sistema_Desktop_Pen_driver/**']` no vitest.config (clone desktop)
- Async: waitFor 2000ms para animacoes em mobile-page e config-panel
- **vitest.config.ts e vite.config.ts sao configs INDEPENDENTES** — define/__APP_VERSION__ precisa estar em ambos
- `getByText('Torque')` falha se texto aparece em 2 lugares (ProgressCard + FormulaCard) — usar `getAllByText`
- `getAllByText('1')` necessario quando favoriteCount e historyCount mostram '1' simultaneamente

---

## Build & Deploy

### Vite build
- JS ~95KB gzip + CSS ~13KB gzip
- Warnings no stderr nao significam erro — verificar se `built in` aparece no output
- `exit code 1` em vitest/vite: verificar output real antes de assumir falha

### Cloudflare
- Worker: `tooloptimizercnc` | Deploy: `wrangler deploy`
- SPA routing: `not_found_handling: single-page-application` em wrangler.jsonc
- Custom domains: `tooloptimizercnc.com.br` + `app.tooloptimizercnc.com.br`

### GitHub Actions
- CI roda: vitest + tsc + vite build + wrangler deploy
- Secrets: `CF_API_TOKEN` + `CF_ACCOUNT_ID`

---

*FENIX AI System | Memoria de Engenharia | Seed: 09/03/2026*
