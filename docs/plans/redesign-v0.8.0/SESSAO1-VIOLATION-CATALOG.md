# Violation Catalog — Redesign Visual v0.10.0
## Sessão 1 — Audit READ-ONLY

**Data:** 26/03/2026
**Branch:** main | **Versão:** v0.9.4
**Design System ref:** `.interface-design/system.md` (Direction: Boldness & Clarity, 10 regras)

---

## Arquivos Auditados (8/8 ✅)

| # | Arquivo | Status | Score |
|---|---------|--------|-------|
| 1 | `src/App.tsx` | ✅ Limpo | ✅ |
| 2 | `src/components/bidirectional-slider.tsx` | ❌ Crítico | 🔴 |
| 3 | `src/components/styled-slider.tsx` | ❌ Crítico | 🔴 |
| 4 | `src/components/fine-tune-panel.tsx` | ❌ Crítico | 🔴 |
| 5 | `src/components/config-panel.tsx` | ⚠️ Médio | 🟡 |
| 6 | `src/components/results-panel.tsx` | ⚠️ Médio | 🟡 |
| 7 | `src/components/shared-result-parts.tsx` | ❌ Crítico | 🔴 |
| 8 | `src/components/gauge.tsx` | ⚠️ Baixo | 🟢 |

---

## Violações por Categoria

### 1. ❌ RGBA Hardcoded Inline — Crítico
**Regras violadas:** #2 (Neon glow só em primary/secondary), #10 (Cor com propósito)

Todos os sliders recebem `rgb` como prop string (ex: `"0,217,255"`) e montam rgba inline no JSX. Isso contorna completamente o sistema de tokens.

| Arquivo | Instâncias | Padrão |
|---------|-----------|--------|
| `bidirectional-slider.tsx` | 8× | `rgba(${rgb},1)`, `rgba(${rgb},0.9)`, `rgba(${rgb},0.6)`, `rgba(${rgb},0.5)`, `rgba(${rgb},0.8)` |
| `styled-slider.tsx` | 8× | Idêntico (clone visual) |
| `fine-tune-panel.tsx` | 2× | `drop-shadow(0 0 8px rgba(${rgb},0.4))` no number input |
| `shared-result-parts.tsx` | 6× | `boxShadow: 0 0 15px ${barGlow}`, `drop-shadow(0 0 8px ${glow})`, `drop-shadow(0 0 20px ${glow})` |

**Total:** 26+ instâncias
**Correc̃ão sugerida (Sessão 2):** Substituir por classes utilitárias estáticas (`shadow-neon-cyan`, `shadow-neon-green`) + `style` inline apenas para cores dinâmicas via CSS custom property

---

### 2. ❌ Classes Tailwind Dinâmicas — Crítico
**Regras violadas:** #10 (Color with purpose) + risco de purge em produção

Tailwind JIT purga classes que não aparecem literalmente no código-fonte. Classes montadas via template string não são detectadas → quebra silenciosa em produção.

| Arquivo | Instâncias | Classes dinâmicas |
|---------|-----------|-------------------|
| `shared-result-parts.tsx` | 6× | `text-${color}`, `from-${color}/5`, `bg-${color}`, `border-${color}` (BigNumber, ProgressCard, bar) |
| `fine-tune-panel.tsx` | 3× | `font-bold font-mono text-${color}`, `bg-${color}/30` (divider bottom) |
| `bidirectional-slider.tsx` | 2× | `text-${color}`, `border-${color}` (thumb ring) |
| `styled-slider.tsx` | 1× | `border-${color}` (thumb) |

**Total:** 12+ classes dinâmicas
**Correção sugerida (Sessão 2):**
```tsx
// Antes (dinâmico, unsafe)
className={`text-${color}`}

// Depois (opção A — mapa estático)
const COLOR_CLASS = { primary: 'text-primary', secondary: 'text-secondary' }
className={COLOR_CLASS[color]}

// Depois (opção B — inline style, sem risco de purge)
style={{ color: colorValue }}
```

---

### 3. ⚠️ Spacing Non-4px Grid — Alto
**Regra violada:** #4 (Spacing MUST follow 4px grid)

Sistema de tokens: `[4, 8, 12, 16, 24, 32, 64]px`. Valores como 6px, 18px, 20px, 10px não existem no grid.

| Arquivo | Valor incorreto | Tailwind class | Correção |
|---------|----------------|----------------|----------|
| `bidirectional-slider.tsx` | 18px (track margin) | `mx-[18px]` | → `mx-4` (16px) |
| `bidirectional-slider.tsx` | 6px | `gap-1.5`, `h-1.5` | → `gap-2`, `h-0.5` ou `h-1` |
| `styled-slider.tsx` | 18px (track margin) | `mx-[18px]` | → `mx-4` (16px) |
| `styled-slider.tsx` | 10px (tick height) | `h-2.5` | → `h-2` (8px) |
| `fine-tune-panel.tsx` | 6px | `gap-1.5`, `mt-1` | → `gap-2` |
| `fine-tune-panel.tsx` | 2px | `mt-0.5` (bullet) | → `mt-1` (4px) |
| `config-panel.tsx` | 100px (input) | `w-[100px]` | → `w-24` (96px) |
| `config-panel.tsx` | 20px (padding) | `py-3`, `pl-3` | → `py-2` ou `py-4` |
| `config-panel.tsx` | 40px (button) | `w-10` (edges) | → `w-8` (32px) ou `w-12` (48px) |
| `results-panel.tsx` | 20px | `p-5` (formulas) | → `p-4` ou `p-6` |
| `results-panel.tsx` | 6px | `py-1.5` (star btn) | → `py-2` (8px) |
| `shared-result-parts.tsx` | 6px | `h-1.5` (bar), `gap-1.5` | → `h-1` ou `h-2` |

**Total:** 18+ valores fora do grid

---

### 4. ⚠️ Padding Misto em Cards — Alto
**Regra violada:** #4 (4px grid) + consistência de hierarquia visual

Sistema esperado (a definir em Sessão 2):
- Surface card (nível 1): `p-6` (24px)
- Inner section (nível 2): `p-4` (16px)
- Compact/micro: `p-3` (12px)

| Arquivo | Padding atual | Contexto | Problema |
|---------|--------------|----------|---------|
| `config-panel.tsx` | `p-6` | Main card wrapper | OK — surface |
| `results-panel.tsx` | `p-5` | Formula zone card | ❌ 20px fora do grid |
| `results-panel.tsx` | `p-4` | Alert card | OK — inner |
| `shared-result-parts.tsx` | `p-4` | ProgressCard | Inconsistente com BigNumber |
| `shared-result-parts.tsx` | `px-4 py-2` | SafetyBadge | OK |
| `fine-tune-panel.tsx` | `p-3` | Educational drawer | OK — compact |

**Problema real:** `p-4` e `p-5` e `p-6` aparecem em cards do mesmo nível hierárquico sem critério visual claro.

---

### 5. ⚠️ Glassmorphism > 2 Níveis — Médio
**Regra violada:** #3 (Glassmorphism max 2 levels deep: surface → inner)

Estrutura atual em `results-panel.tsx` zona 2+3:

```
ResultsPanel container (surface — backdrop-blur-xl)     ← nível 1
  └── BigNumber card (rgba(22,27,34,0.7))               ← nível 2
        └── inner bar div (rgba(30,35,45,0.6))          ← nível 3 ❌
  └── ProgressCard (rgba + backdrop-blur-md)            ← nível 2
        └── bar div                                     ← nível 3 ❌
              └── glow overlay                          ← nível 4 ❌
```

**Correção:** Achatar para 2 níveis. Inner elements (bar, glow) não devem ter glassmorphism — usar cor sólida ou opacidade simples.

---

### 6. ⚠️ backdrop-blur Inconsistente — Médio
**Regra violada:** #3 (Surface cards = blur-xl, inner cards = NO blur)

| Arquivo | Elemento | Blur atual | Correto |
|---------|---------|-----------|---------|
| `config-panel.tsx` | Surface card | `backdrop-blur-xl` | ✅ |
| `results-panel.tsx` | Surface card | `backdrop-blur-xl` | ✅ |
| `shared-result-parts.tsx` | ProgressCard (inner) | `backdrop-blur-md` | ❌ → remover blur |
| `shared-result-parts.tsx` | BigNumber (inner) | sem blur | ✅ |

**Nota:** Inner cards não devem ter backdrop-blur. Blur só em surface (nível 1).

---

### 7. ⚠️ Animation Timings Espalhados — Baixo

Sistema define 5 animações com timings fixos em `src/index.css`. Comparando:

| Animação | Sistema (.css) | Uso atual | Status |
|----------|---------------|-----------|--------|
| `spinner` | `1s infinite` | `0.9s` em use-simulation-animation | ⚠️ Diverge |
| `fadeInUp` | `500ms` | `0.5s` em fine-tune + results-panel | ✅ OK |
| `subtlePulse` | `1500ms` | `1.5s` em results-panel | ✅ OK |
| `gaugeRoll` | `1350ms` | Usado via hook | ✅ OK |
| `fadeOut` | `300ms` | Não encontrado inline | ✅ OK |

**Único divergente:** spinner `0.9s` vs definição `1s`. Impacto visual mínimo, mas inconsistente.

---

### 8. ⚠️ Gauge — Hex Colors Hardcoded — Baixo
**Regra violada:** #10 (Color with purpose — sem cor desmotivada)

`gauge.tsx` usa arrays de cores hex diretos para os 40 segmentos SVG:

```ts
// Paleta Avanço/RPM
const palette = ['#39FF14', '#2ecc71', ..., '#00D9FF', ..., '#f39c12']
// Paleta Power
const palette = ['#39FF14', ..., '#f39c12', '#E74C3C']
```

Estes valores são tokens do design system (`#39FF14` = secondary, `#00D9FF` = primary, `#f39c12` = seg-amarelo, `#E74C3C` = seg-vermelho), mas são usados como literais sem referência.

**Justificativa técnica:** SVG data-driven por necessidade. Não é possível usar Tailwind em atributos SVG. Severidade **baixa** — funciona corretamente, apenas sem referência explícita aos tokens.

---

## Resumo Executivo por Componente

| Componente | ❌ Crítico | ⚠️ Alto | ⚠️ Médio | ⚠️ Baixo | Score |
|-----------|-----------|---------|---------|---------|-------|
| `App.tsx` | 0 | 0 | 0 | 0 | ✅ Limpo |
| `gauge.tsx` | 0 | 0 | 0 | hex colors | 🟢 Aceitável |
| `config-panel.tsx` | 0 | py/w non-4px ×6 | — | — | 🟡 Médio |
| `results-panel.tsx` | 0 | p-5/gap ×3 | depth 4-5, p-5 | spinner 0.9s | 🟡 Médio |
| `fine-tune-panel.tsx` | rgba ×2, dynamic ×3 | gap/mt non-4px ×3 | — | — | 🔴 Crítico |
| `bidirectional-slider.tsx` | rgba ×8, dynamic ×2 | mx/gap non-4px ×4 | — | — | 🔴 Crítico |
| `styled-slider.tsx` | rgba ×8, dynamic ×1 | mx/h non-4px ×3 | — | — | 🔴 Crítico |
| `shared-result-parts.tsx` | rgba ×6, dynamic ×6 | gap/p non-4px ×4 | blur-md, depth | — | 🔴 Crítico |

**4 componentes críticos**, **2 médios**, **1 aceitável**, **1 limpo**

---

## Contexto Compacto para Sessão 2

```
╔══════════════════════════════════════════════════════╗
║          SESSÃO 2 — INPUT CONTEXT (compacto)         ║
╠══════════════════════════════════════════════════════╣
║ AUDITADOS: 8/8 ✅                                    ║
║                                                      ║
║ CRÍTICO (corrigir obrigatoriamente):                 ║
║  • 26+ rgba inline → classes utilitárias/CSS var     ║
║  • 12+ dynamic Tailwind classes → mapa estático      ║
║                                                      ║
║ ALTO (corrigir para consistência):                   ║
║  • 18+ spacing non-4px → snapping ao grid            ║
║  • Padding misto p-4/p-5/p-6 → hierarquia clara     ║
║                                                      ║
║ MÉDIO (refinar):                                     ║
║  • Depth glassmorphism >2 níveis (results-panel)     ║
║  • backdrop-blur-md em inner card (shared-result)    ║
║                                                      ║
║ BAIXO (opcional):                                    ║
║  • Spinner timing 0.9s → 1s                          ║
║  • Gauge hex → comentar referência aos tokens        ║
║                                                      ║
║ ARQUIVOS + CRÍTICOS: bidirectional-slider,           ║
║   styled-slider, shared-result-parts, fine-tune      ║
║ ARQUIVOS OK: App.tsx (limpo), gauge (aceitável)      ║
╠══════════════════════════════════════════════════════╣
║ ENTREGÁVEL SESSÃO 2:                                 ║
║  docs/plans/redesign-v0.8.0/VISUAL-AUDIT-REPORT.md  ║
║  → Por componente: violação por linha + correção     ║
║  → Before/after code snippets                        ║
║  → Referência explícita a tokens do system.md        ║
╚══════════════════════════════════════════════════════╝
```

---

*Gerado em Sessão 1 — READ-ONLY. Nenhum arquivo em `src/` foi alterado.*
*Referência: `.interface-design/system.md` (Direction: Boldness & Clarity, 10 regras não-negociáveis)*
