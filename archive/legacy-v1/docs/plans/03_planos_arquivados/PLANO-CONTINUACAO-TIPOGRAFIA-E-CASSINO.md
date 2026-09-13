# Plano: Continuação Sessão — ITEM-5.2 Cassino

> **Criado em:** 12/04/2026 — por @aiox-master (Orion)
> **Atualizado em:** 17/04/2026 — Sessão GESTOR

---

## Estado Atual (17/04/2026)

| Item | Status |
|------|--------|
| Proposta #1 tipografia | ✅ COMMITADA — `356f461` + `a777810` |
| Proposta B (Grid 4/8) | ❌ DESCARTADA (decisão Rafael 17/04) |
| Proposta C (Zona 6 3×2) | ❌ DESCARTADA |
| Proposta D (Timing -36%) | ❌ DESCARTADA |
| Story-011 | ✅ Ready — validada por @po 10/10 |
| ITEM-5.2 Sessão 2A | ⏳ Próxima |

---

## Regras Anti-Estouro (Aplicar em Toda Sessão)

1. **Ler apenas:** `docs/ROADMAP_SESSAO_ATUAL.md` + spec do item ao iniciar
2. **Máximo 3 arquivos grandes** na mesma sessão
3. **Commit ao final de cada sessão** — nunca acumular entre sessões
4. **Testes:** sempre `npx vitest run tests/` (não `npm test`)
5. **Se atingir ~60% do contexto:** commitar o que está pronto e parar
6. **Após commit:** atualizar ROADMAP_SESSAO_ATUAL.md com status

---

## FASE 2 — ITEM-5.2 Simulação Estilo Cassino

**Story:** `docs/stories/story-011-item52-simulacao-cassino.md` — `Ready`
**Spec completa:** `docs/plans/ATUALIZACAO_DASH_APROVADO/ITEM-9-SIMULACAO-ESTILO-CASSINO.md` (624 linhas)
**Complexidade total:** 24 pontos → 3 sub-sessões de ~8 pts cada (~40 min/sessão)
**NOTA:** Spec v2 (31/03/2026) usa contadores via rAF + easeOutCubic — NÃO slot machine rolling.

### Arquivos a Modificar (nenhum arquivo novo):

| # | Arquivo | Ação | Complexidade |
|---|---------|------|-------------|
| 1 | `src/hooks/use-simulation-animation.ts` | REESCREVER — novos estados + timeline | 5 pts |
| 2 | `src/components/config-panel.tsx` | Progress bar + ícone + texto dinâmico | 3 pts |
| 3 | `src/pages/mobile-page.tsx` | Mesmo botão versão mobile | 2 pts |
| 4 | `src/components/half-moon-gauge.tsx` | Prop `animateOnMount` + rAF + easeOutBack | 4 pts |
| 5 | `src/components/shared-result-parts.tsx` | BigNumber/ProgressCard: contadores 0→valor | 3 pts |
| 6 | `src/components/shared-result-parts.tsx` | SafetyBadge: reveal com delay + glow | 2 pts |
| 7 | `src/index.css` | 5 novos keyframes CSS | 2 pts |

### Timeline da Simulação (spec v2):

```
t=0ms       → setIsCalculating(true), setCalcProgress(0), setGaugeAnimating(true)
t=80ms      → setGaugeTarget(1) → gauges iniciam rAF
t=80-1500ms → setInterval sobe calcProgress 0→98%
t=1500ms    → CRÍTICO: originalSimular() chamada aqui (cálculo real)
t=1750ms    → setIsRevealing(true)
t=2300ms    → setIsRevealing(false)
t=2650ms    → setGaugeAnimating(false), volta ao idle
```

---

### Sessão 2A — CSS + Hook + Botão Desktop
**~40 min | 8 pontos**

1. Ler spec completa (docs/plans/ATUALIZACAO_DASH_APROVADO/ITEM-9-SIMULACAO-ESTILO-CASSINO.md)
2. Adicionar 5 keyframes CSS em `src/index.css`: `btnIdleGlow`, `jackpotFlash`, `ambientPulse`, `sliderShake`, `spinIcon`
3. Reescrever `src/hooks/use-simulation-animation.ts` — 6 estados + timeline completa
4. Guard contra double-click em `runSimulation`
5. `clearProgress` + `useEffect` cleanup (cancelAnimationFrame + clearInterval)
6. Atualizar `src/components/config-panel.tsx`: progress bar + ícone casino + "CALCULANDO {%}"
7. Testes: phase transitions + originalSimular called at t=1500ms
8. Commit: `feat(ui): cassino simulation phase A — hook timeline + CSS keyframes + desktop button`

**Critério de parada:** hook reescrito + botão desktop funcionando + 2 testes passando

---

### Sessão 2B — Mobile + Gauges + Contadores
**~40 min | 8 pontos**

1. Replicar botão Simular com progress bar em `src/pages/mobile-page.tsx`
2. Prop `animateOnMount?: boolean` no `src/components/half-moon-gauge.tsx`
3. rAF loop com easing `easeOutBack` na agulha/arco do gauge
4. Contadores animados 0→valorFinal via rAF em `BigNumber` (shared-result-parts.tsx)
5. Contadores animados 0→valorFinal via rAF em `ProgressCard`
6. Testes: cleanup on unmount + resultado idêntico com/sem animação
7. Commit: `feat(ui): cassino simulation phase B — mobile button + gauge rAF + animated counters`

---

### Sessão 2C — Reveal + SafetyBadge + Suite Completa
**~40 min | 8 pontos**

1. `jackpotFlash` nos result cards em t=1750ms com cascata 50ms/card
2. Cor final do card = nível de segurança (green/amber/red)
3. SafetyBadge: reveal em t=600ms após `isRevealing` com glow
4. Sliders: `pointer-events: none` + `opacity: 0.5` durante Fases 2-3
5. Sliders: restaurar em t=2300ms (Fase 4)
6. 12 testes completos (8 hook + 4 botão)
7. `npx vite build` — confirmar bundle < 120KB gzip
8. Commit: `feat(ui): cassino simulation phase C — jackpot reveal + safety badge + full test suite`
9. Bump versão → v0.11.0 + atualizar ROADMAP_SESSAO_ATUAL.md

---

## Verificação de Cada Sessão

Antes de encerrar toda sessão:
- [ ] `npx vitest run tests/` — 1038+ testes passando
- [ ] `npx tsc --noEmit` — zero erros TypeScript
- [ ] Git status limpo (nada não-commitado)
- [ ] ROADMAP_SESSAO_ATUAL.md atualizado com status

## Checklist Pré-Sessão 2A

- [ ] `src/components/half-moon-gauge.tsx` existe
- [ ] BigNumber, ProgressCard, SafetyBadge estão em `shared-result-parts.tsx`
- [ ] Ícone `casino` (Material Symbols) disponível — verificar CDN em `index.html`
- [ ] Hook atual tem apenas 3 estados (isCalculating, triggerPulse, gaugeAnimating)
- [ ] Spec lida: `docs/plans/ATUALIZACAO_DASH_APROVADO/ITEM-9-SIMULACAO-ESTILO-CASSINO.md`
