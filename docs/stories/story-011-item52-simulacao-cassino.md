---
id: story-011
title: "ITEM-5.2: Simulação Estilo Cassino — Animação Cinematográfica em 4 Fases"
status: Done
created: 2026-04-17
author: "@sm (River)"
epic: "Grupo A — Dashboard Principal"
complexity: 24 pts (~3 sessões)
priority: HIGH
depends_on:
  - story-010 (ITEM-10: visor desktop results-panel + visor mobile refatorados ✅ já concluídos)
blocks: []
spec_ref: docs/plans/ATUALIZACAO_DASH_APROVADO/ITEM-9-SIMULACAO-ESTILO-CASSINO.md
---

# Story-011 — Simulação Estilo Cassino

## User Story

**Como** operador CNC,
**quero** que a experiência de cálculo seja cinematográfica e responsiva,
**para** ter confiança visual de que o sistema está processando e revelar os resultados com impacto que reforce a percepção de precisão e poder.

---

## Contexto Técnico

### Situação Atual

O hook `useSimulationAnimation` tem apenas 3 estados (`isCalculating`, `triggerPulse`, `gaugeAnimating`) e implementa uma animação simples de 450ms antes do cálculo real. Não há feedback progressivo, progress bar, contadores animados, nem reveal de resultados.

### Mudança Proposta

Substituir a animação simples por uma **sequência cinematográfica em 4 fases** (2650ms total) — inspirada em cassino — sem alterar a lógica de cálculo (`originalSimular()`). Apenas encapsulação e feedback visual progressivo.

### Stack Relevante
- **React 18 + TypeScript 5.7** (strict, zero `any`)
- **CSS keyframes** para animações declarativas
- **requestAnimationFrame** para contadores e gauges (precision timing)
- **Zustand** — store não alterada; hook encapsula `calcular()`
- **Vitest + Testing Library** para testes

---

## Timeline da Animação

```
t=0ms     → setIsCalculating(true), setCalcProgress(0), setGaugeAnimating(true)
t=80ms    → setGaugeTarget(1) — gauges iniciam animação rAF
t=80ms    → setInterval sobe calcProgress 0→98% até t=1500ms
t=1500ms  → ⚡ CRÍTICO: originalSimular() chamado aqui (cálculo CNC real)
t=1750ms  → setIsRevealing(true) — jackpotFlash nos cards
t=2300ms  → sliders reabilitados; setIsRevealing(false)
t=2650ms  → setGaugeAnimating(false), idle restaurado
```

---

## Acceptance Criteria

| # | Critério | Testável? |
|---|----------|-----------|
| AC-1 | 4 fases sequenciais com timing: idle → igniting (0ms) → calculating (80ms) → revealing (1750ms) → idle (2650ms) | ✅ |
| AC-2 | `originalSimular()` chamado exatamente 1x em t=1500ms; lógica de cálculo não alterada | ✅ |
| AC-3 | `calcProgress` sobe monotonicamente 0→100 durante Fase 3 | ✅ |
| AC-4 | Botão Simular exibe progress bar interna + ícone `casino` + texto `CALCULANDO {pct}%` durante cálculo | ✅ |
| AC-5 | Botão Simular em `mobile-page.tsx` tem comportamento idêntico ao desktop | ✅ |
| AC-6 | `HalfMoonGauge` anima de 0→valor via rAF com easing `easeOutBack` quando `animateOnMount=true` | ✅ |
| AC-7 | `BigNumber` e `ProgressCard` exibem contadores animados 0→valorFinal via rAF | ✅ |
| AC-8 | Result cards recebem `jackpotFlash` em cascata (50ms/card) em t=1750ms | ✅ |
| AC-9 | `SafetyBadge` aparece com glow em t=+600ms após `isRevealing` | ✅ |
| AC-10 | Sliders com `pointer-events: none` + `opacity: 0.5` durante Fases 2-3; restaurados em t=2300ms | ✅ |
| AC-11 | Cleanup ao desmontar: `cancelAnimationFrame` + `clearInterval` sem memory leak | ✅ |
| AC-12 | Resultado final idêntico ao calculado sem animação cassino | ✅ |
| AC-13 | Guard contra double-click: segundo clique bloqueado se `isCalculating === true` | ✅ |
| AC-14 | Após reset / nova configuração: todos os estados voltam ao idle | ✅ |

---

## Scope

### IN (o que será implementado)
- `src/hooks/use-simulation-animation.ts` — reescrita completa com 6 estados + timeline
- `src/components/config-panel.tsx` — botão Simular com progress bar + ícone casino
- `src/pages/mobile-page.tsx` — botão Simular mobile idêntico
- `src/components/half-moon-gauge.tsx` — prop `animateOnMount` + rAF easeOutBack
- `src/components/shared-result-parts.tsx` — contadores animados BigNumber/ProgressCard + SafetyBadge reveal
- `src/index.css` — 5 novos keyframes: `btnIdleGlow`, `jackpotFlash`, `ambientPulse`, `sliderShake`, `spinIcon`
- 12 testes unitários em `tests/use-simulation-animation.test.ts` (hook) e `tests/config-panel.test.tsx` (botão)

### OUT (fora do escopo)
- Alteração de qualquer lógica de cálculo (`calcular()`, `originalSimular()`, engine)
- Canvas WebGL ou Three.js para partículas (usar CSS-only `::before`/`::after`)
- Histórico de rodadas anteriores (referenciado na spec mas descartado — pode ser ITEM futuro)
- Alteração de `src/store/` — nenhuma mudança em stores Zustand
- Novos arquivos — apenas modificações em arquivos existentes

---

## Arquivos a Modificar

| Arquivo | Ação | Complexidade |
|---------|------|-------------|
| `src/hooks/use-simulation-animation.ts` | Reescrita completa — 6 estados + timeline 0→2650ms | 5 pts |
| `src/components/config-panel.tsx` | Progress bar + ícone casino + texto dinâmico no botão | 3 pts |
| `src/pages/mobile-page.tsx` | Botão Simular mobile idêntico ao desktop | 2 pts |
| `src/components/half-moon-gauge.tsx` | Prop `animateOnMount?: boolean` + rAF + easeOutBack | 4 pts |
| `src/components/shared-result-parts.tsx` | Contadores BigNumber/ProgressCard + SafetyBadge glow | 5 pts |
| `src/index.css` | 5 novos keyframes CSS | 2 pts |
| Testes | 12 casos em 2 arquivos de teste | 3 pts |
| **Total** | | **24 pts** |

---

## Novos Estados no Hook

```typescript
// Antes (3 estados):
isCalculating, triggerPulse, gaugeAnimating

// Depois (6 estados):
isCalculating   — botão bloqueado, animação ativa
calcProgress    — 0→100 (progress bar % no botão)
isRevealing     — true entre t=1750ms e t=2300ms
gaugeTarget     — 0 (idle) | 1 (animating)
gaugeAnimating  — controla rAF nos gauges
triggerPulse    — mantido (SafetyBadge pulse)

// Retorno:
{ isCalculating, calcProgress, isRevealing, gaugeTarget, triggerPulse, gaugeAnimating, safetyLevel, runSimulation }
```

---

## Divisão em Sub-sessões

| Sessão | Escopo | Pontos | Commit |
|--------|--------|--------|--------|
| **2A** | 5 keyframes CSS + hook reescrito + botão desktop | ~8 pts | `feat(ui): cassino simulation phase A — hook timeline + CSS keyframes + desktop button` |
| **2B** | Botão mobile + `HalfMoonGauge` rAF + contadores BigNumber/ProgressCard | ~8 pts | `feat(ui): cassino simulation phase B — mobile button + gauge rAF + animated counters` |
| **2C** | jackpotFlash cascata + SafetyBadge reveal + sliders + 12 testes + release | ~8 pts | `feat(ui): cassino simulation phase C — jackpot reveal + full test suite` |

---

## Risks

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| rAF leak ao desmontar durante animação | Média | `cancelAnimationFrame` no return do `useEffect` |
| setInterval acumula em double-click | Baixa | Guard `if (isCalculating) return` + `clearInterval` antes de iniciar |
| Ícone `casino` (Material Symbols) indisponível | Baixa | Verificar CDN em `index.html` antes de iniciar; fallback para `settings` |
| `pointer-events: none` conflita com touch mobile | Baixa | Aplicar apenas Fases 2-3, restaurar em t=2300ms |
| easeOutBack fórmula incorreta causa gauge overshooting excessivo | Baixa | Usar fórmula validada: `(t) => { const s = t - 1; return 1 + s*s*(2.70158*s+1.70158) }` |

---

## Definition of Done

- [ ] 4 fases com timing correto (±50ms tolerância)
- [ ] `originalSimular()` intocada — chamada 1x em t=1500ms
- [ ] `npx vitest run tests/` — 1050+ testes passando (1038 existentes + 12 novos)
- [ ] `npx tsc --noEmit` — zero erros TypeScript
- [ ] `npx vite build` — bundle < 120KB gzip
- [ ] Funciona identicamente desktop e mobile
- [ ] Sem memory leaks (rAF + interval limpos)
- [ ] Versão bump → v0.11.0

---

## Testes Esperados

```typescript
// tests/use-simulation-animation.test.ts
describe('useSimulationAnimation', () => {
  it('starts in idle state (isCalculating false, calcProgress 0)')
  it('sets isCalculating true immediately on runSimulation')
  it('calcProgress increments from 0 to 100')
  it('calls originalSimular exactly once at ~1500ms')
  it('sets isRevealing true after simular completes')
  it('returns to idle state after full sequence')
  it('cancels interval on unmount (no memory leak)')
  it('guards against double-click (isCalculating blocks second call)')
})

// tests/config-panel.test.tsx
describe('ConfigPanel — botão Simular cassino', () => {
  it('shows progress bar when isCalculating')
  it('shows CALCULANDO {pct}% text during calculation')
  it('restores SIMULAR text after sequence completes')
  it('sliders have pointer-events-none during calculation')
})
```

---

## File List

> Preenchido pelo @dev durante implementação

- [x] `src/hooks/use-simulation-animation.ts` — modificado (Sessão 2A)
- [x] `src/components/config-panel.tsx` — modificado (Sessão 2A + 2C — isRevealing + FineTunePanel disable)
- [x] `src/pages/mobile-page.tsx` — modificado (Sessão 2B — tab slide-in transition)
- [x] `src/components/half-moon-gauge.tsx` — modificado (Sessão 2B — animateOnMount + rAF easeOutBack)
- [x] `src/components/shared-result-parts.tsx` — modificado (Sessão 2B — BigNumber/ProgressCard animated counters)
- [x] `src/components/results-panel.tsx` — modificado (Sessão 2C — jackpotFlash cascata Zonas 1/4/7)
- [x] `src/components/mobile/mobile-results-section.tsx` — modificado (Sessão 2C — jackpotFlash BigNumbers mobile)
- [x] `src/data/architecture-graph.ts` — modificado (Sessão 2C — versão 0.11.0)
- [x] `src/index.css` — modificado (Sessão 2A)
- [x] `tests/hooks/use-simulation-animation.test.ts` — modificado (Sessão 2C — 6 novos testes, total 8)
- [x] `tests/components/config-panel.test.tsx` — modificado (Sessão 2C — 4 testes cassino)

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-04-17 | @sm (River) | Story criada a partir da spec `ITEM-9-SIMULACAO-ESTILO-CASSINO.md` |
| 2026-04-17 | Rafael | Aprovação do caminho SDC (opção A) — story encaminhada para @po |
| 2026-04-17 | @po (Pax) | Validação 10/10 — GO ✅ — Status atualizado: Draft → Ready |
| 2026-04-17 | @dev (Dex) | Sessão 2A concluída — commit `4de2578` — hook 6 estados + 5 keyframes + botão desktop |
| 2026-04-17 | @dev (Dex) | Sessão 2B concluída — HalfMoonGauge animateOnMount+rAF, BigNumber/ProgressCard counters, tabSlideIn |
| 2026-04-17 | @dev (Dex) | Sessão 2C concluída — jackpotFlash cascata (Zonas 1/4/7 desktop + mobile), FineTunePanel disable, 12 testes, release v0.11.0 |
