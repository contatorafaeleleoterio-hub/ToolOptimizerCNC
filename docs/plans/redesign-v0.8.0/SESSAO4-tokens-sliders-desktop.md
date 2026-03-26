# Sessão 4 de 4 — Tokens + Sliders Desktop
## Redesign Visual v0.10.0 — Mudança A (parcial)

**Foco:** Criar `slider-tokens.ts` e refatorar os 2 componentes de slider
**Estimativa:** ~17 pontos | ~70K tokens
**Pré-requisitos:** Sessão 3 concluída + protótipo HTML aprovado por Rafael

---

## Contexto para Início de Sessão

```
/compact Sessão 4: slider-tokens.ts + bidirectional-slider + styled-slider.
Mudança A: eliminar 26+ rgba inline e 12+ dynamic Tailwind classes.
Estratégia: criar mapas estáticos congelados em slider-tokens.ts.
Relatório: docs/plans/redesign-v0.8.0/VISUAL-AUDIT-REPORT.md (seções 1 e 2).
Protótipo aprovado: docs/design/DASHBOARD_V2_PROPOSAL.html
```

---

## Ações

- [ ] **Ação 1** (peso 1) — Ler `src/components/bidirectional-slider.tsx` (contexto atual)
- [ ] **Ação 2** (peso 1) — Ler `src/components/styled-slider.tsx` (contexto atual)
- [ ] **Ação 3** (peso 3) — Criar `src/components/slider-tokens.ts` com 8 mapas estáticos
- [ ] **Ação 4** (peso 3) — Refatorar `bidirectional-slider.tsx` — remover prop `rgb`, usar mapas
- [ ] **Ação 5** (peso 3) — Refatorar `styled-slider.tsx` — idem
- [ ] **Ação 6** (peso 3) — `npm run test` — verificar zero regressões
- [ ] **Ação 7** (peso 3) — `npm run build` — verificar bundle limpo
- [ ] **Ação 8** (peso 2) — Commit parcial: `feat: slider-tokens.ts + refactor sliders desktop`

**Total:** 19 pontos ✅

---

## Detalhe das Mudanças

### Arquivo novo: `src/components/slider-tokens.ts`

```ts
// Mapas estáticos — substitui todas as props `rgb` e dynamic className
// Referência: docs/plans/redesign-v0.8.0/VISUAL-AUDIT-REPORT.md

export const COLOR_TEXT: Record<string, string>
export const COLOR_BORDER: Record<string, string>
export const COLOR_BG: Record<string, string>
export const TRACK_STYLE: Record<string, { background: string; boxShadow: string }>
export const THUMB_GLOW: Record<string, { pressed: string; rest: string }>
export const DOT_GLOW: Record<string, string>
export const GLOW_FILTER: Record<string, string>
export const BAR_SHADOW: Record<string, string>
export const COLOR_HEX: Record<string, string>
```

Os valores exatos estão em `VISUAL-AUDIT-REPORT.md` seção "Proposta de Arquitetura".

### `bidirectional-slider.tsx` — linhas críticas

| Linha | Violação | Correção |
|-------|---------|---------|
| 108 | `text-${color}` | `COLOR_TEXT[color]` |
| 116 | `text-${color}` | `COLOR_TEXT[color]` |
| 117 | `rgba(${rgb},0.4)` | `GLOW_FILTER[color]` |
| 131 | `mx-[18px]` | `mx-4` |
| 142, 147 | `h-1.5` | `h-1` |
| 151-152 | rgba track | `TRACK_STYLE[color]` |
| 188 | `border-${color}` | `COLOR_BORDER[color]` |
| 190-193 | rgba thumb glow | `THUMB_GLOW[color].pressed/rest` |
| 199-202 | rgba inner dot | `TRACK_STYLE[color].background` + `DOT_GLOW[color]` |

**Remover prop:** `rgb: string` da interface `BidirectionalSliderProps`

### `styled-slider.tsx` — mesmas correções + linhas

| Linha | Violação | Correção |
|-------|---------|---------|
| 49 | `mx-[18px]` | `mx-4` |
| 63 | `h-1.5` | `h-1` |
| 68 | `h-2.5` | `h-2` |
| 73 | `rgba(${rgb},0.4)` | `TRACK_STYLE[color].background` + `opacity: 0.4` |
| 84-85 | rgba track | `TRACK_STYLE[color]` spread |
| 96 | `border-${color}` | `COLOR_BORDER[color]` |
| 99-100 | rgba thumb glow | `THUMB_GLOW[color]` |
| 109-110 | rgba inner dot | `TRACK_STYLE[color].background` + `DOT_GLOW[color]` |

**Remover prop:** `rgb: string` da interface `StyledSliderProps`

---

## ⚠️ Atenção — Prop `rgb` Removida

Após refatorar os sliders, verificar todos os lugares que passam `rgb` para eles:
- `fine-tune-panel.tsx` — passa `rgb` para `StyledSlider`
- `results-panel.tsx` → `shared-result-parts.tsx` — passa `rgb` para `BidirectionalSlider`

**Ação:** remover as passagens de `rgb` nesses arquivos (os mapas agora são internos).

---

## Verificação

- [ ] `slider-tokens.ts` exporta 9 mapas
- [ ] `bidirectional-slider.tsx`: zero `rgba(`, zero `text-${`, zero `border-${`
- [ ] `styled-slider.tsx`: zero `rgba(`, zero `border-${`
- [ ] Props `rgb` removidas das interfaces
- [ ] `npm run test`: todos os testes passam (ou apenas pre-existing failures)
- [ ] `npm run build`: bundle limpo, sem warnings de tipo
- [ ] Commit realizado

---

## Comando de Início da Sessão 5

```
/compact Sessão 5: refatorar shared-result-parts + fine-tune-panel + config + results.
Contexto: slider-tokens.ts criado, sliders refatorados (commit na sessão 4).
Relatório: docs/plans/redesign-v0.8.0/VISUAL-AUDIT-REPORT.md (seções 3-6).
Plano: docs/plans/redesign-v0.8.0/SESSAO5-componentes-desktop.md
```
