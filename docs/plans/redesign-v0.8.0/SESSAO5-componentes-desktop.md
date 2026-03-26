# Sessão 5 de 4 — Componentes Desktop
## Redesign Visual v0.10.0 — Mudança A (conclusão) + D + E (desktop)

**Foco:** Concluir tokens no desktop + legenda de siglas + botão ℹ no desktop
**Estimativa:** ~20 pontos | ~80K tokens
**Pré-requisitos:** Sessão 4 concluída (`slider-tokens.ts` criado, sliders refatorados)

---

## Contexto para Início de Sessão

```
/compact Sessão 5: shared-result-parts + fine-tune + config + results desktop.
Contexto: slider-tokens.ts existe (src/components/slider-tokens.ts).
Sliders já refatorados (sem rgb prop, sem rgba inline).
Relatório: docs/plans/redesign-v0.8.0/VISUAL-AUDIT-REPORT.md (seções 3-6).
Mudanças desta sessão: tokens desktop + legenda siglas (D) + botão ℹ (E) desktop.
```

---

## Ações

- [ ] **Ação 1** (peso 1) — Ler `src/components/shared-result-parts.tsx`
- [ ] **Ação 2** (peso 1) — Ler `src/components/fine-tune-panel.tsx`
- [ ] **Ação 3** (peso 3) — Refatorar `shared-result-parts.tsx` — tokens + blur + interface simplificada
- [ ] **Ação 4** (peso 3) — Refatorar `fine-tune-panel.tsx` — tokens + spacing + legenda siglas (D) + botão ℹ (E)
- [ ] **Ação 5** (peso 2) — Editar `config-panel.tsx` — spacing fixes
- [ ] **Ação 6** (peso 2) — Editar `results-panel.tsx` — spacing fixes
- [ ] **Ação 7** (peso 3) — `npm run test`
- [ ] **Ação 8** (peso 3) — `npm run build`
- [ ] **Ação 9** (peso 2) — Commit parcial: `feat: tokens desktop + siglas + botão info`

**Total:** 20 pontos ✅

---

## Detalhe das Mudanças

### `shared-result-parts.tsx`

**BigNumber:**
| Linha | Violação | Correção |
|-------|---------|---------|
| 56 | `from-${color}/5` dynamic | `style={{ background: \`linear-gradient(to bottom right, ${COLOR_HEX[color]}0D, transparent)\` }}` |
| 58, 60 | `text-${color}` | `COLOR_TEXT[color]` |
| 61 | `drop-shadow(0 0 8px ${glow})` | `GLOW_FILTER[color]` |
| 85 | `h-1.5` | `h-1` |
| 86 | `bg-${color}` | `COLOR_BG[color]` |
| 87 | `boxShadow: 0 0 15px ${barGlow}` | `BAR_SHADOW[color]` |

**Interface simplificada:** remover props `glow` e `barGlow` de `BigNumberProps` — usar apenas `color`.
> Verificar onde BigNumber é instanciado (`results-panel.tsx`) e remover as props obsoletas.

**ProgressCard:**
| Linha | Violação | Correção |
|-------|---------|---------|
| 100 | `backdrop-blur-xl` em inner card | Remover blur |
| 105 | `h-1.5` | `h-1` |
| 106 | `boxShadow: 0 0 10px ${barShadow}` | Aceitar `barShadow` como string literal estática (vindo de results-panel) |
| 108 | `${barColor}/50` dynamic | `${barColor} opacity-50` |

**WarningsSection:**
| Linha | Violação | Correção |
|-------|---------|---------|
| 135 | `mt-0.5` | `mt-1` |

---

### `fine-tune-panel.tsx` — Tokens + Mudanças D + E

**Tokens e spacing:**
| Linha | Violação | Correção |
|-------|---------|---------|
| 96 | `gap-1.5` (button label) | `gap-2` |
| 100 | `text-${color}` | `COLOR_TEXT[color]` |
| 116 | `text-${color}` | `COLOR_TEXT[color]` |
| 117 | `rgba(${rgb},0.4)` | `GLOW_FILTER[color]` |
| 123 | `gap-1.5` | `gap-2` |
| 147 | `space-y-1.5` | `space-y-2` |
| 156 | `pt-1.5` | `pt-2` |
| 164 | `bg-${color}/30` | `${COLOR_BG[color]} opacity-30` |

**Mudança D — Legenda de siglas (desktop):**
Na linha do label de cada parâmetro (L100-101), adicionar o nome completo:
```tsx
// SLIDER_VISUAL já tem `fullLabel` — usá-lo como legenda
<span className={`text-base font-bold font-mono ${COLOR_TEXT[color]}`}>{label}</span>
<span className="text-xs text-gray-500 font-sans ml-1">· {FULL_NAMES[key]}</span>
```
```ts
const FULL_NAMES = { vc: 'Velocidade de Corte', fz: 'Avanço por Dente', ae: 'Engajamento Radial', ap: 'Profundidade Axial' }
```

**Mudança E — Botão ℹ (desktop):**
Substituir o toggle atual (label clicável com expand_more sutil) por botão dedicado:
```tsx
// ANTES: label com expand_more na linha L93-108
// DEPOIS: botão ℹ explícito ao início da linha
<button
  onClick={() => toggleDrawer(key)}
  className="w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center
             hover:border-primary hover:shadow-[0_0_6px_rgba(0,217,255,0.4)] transition-all shrink-0"
  aria-label={`Informações sobre ${label}`}
>
  <span className="material-symbols-outlined text-primary" style={{ fontSize: '12px' }}>info</span>
</button>
```

---

### `config-panel.tsx` — Spacing

| Linha | Violação | Correção |
|-------|---------|---------|
| 66 | `w-[100px]` | `w-24` |
| 171 | `pr-10` | `pr-8` |
| 292 | `w-10` (edges) | Aceitar — impacto visual mínimo |
| 355 | `w-10` (safety display) | `w-8` |

---

### `results-panel.tsx` — Spacing

| Linha | Violação | Correção |
|-------|---------|---------|
| 84 | `py-1.5` (star btn) | `py-2` |

> Nota: remover props `glow` e `barGlow` das chamadas de `BigNumber` (agora usam apenas `color`).

---

## Verificação

- [ ] `shared-result-parts.tsx`: zero `rgba(`, zero `bg-${`, zero `from-${`, zero `backdrop-blur` em ProgressCard
- [ ] `fine-tune-panel.tsx`: zero `rgba(`, zero `text-${`, spacing 4px grid
- [ ] Legenda de siglas visível em cada parâmetro (Vc · Velocidade de Corte, etc.)
- [ ] Botão ℹ visível e funcional (abre/fecha drawer)
- [ ] `npm run test`: todos os testes passam
- [ ] `npm run build`: sem erros de tipo
- [ ] Commit realizado

---

## Comando de Início da Sessão 6

```
/compact Sessão 6: mobile changes — parameter-health-bar redesign equalizer + fusão mobile-config + mobile-fine-tune.
Contexto: desktop refatorado (sessões 4+5). Bump final para v0.10.0.
Plano: docs/plans/redesign-v0.8.0/SESSAO6-mobile-healthbar.md
```
