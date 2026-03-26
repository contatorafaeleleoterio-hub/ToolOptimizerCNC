# Visual Audit Report — Redesign Visual v0.10.0
## Sessão 2 — Relatório Formal + Propostas por Componente

**Data:** 26/03/2026 | **Branch:** main | **Versão:** v0.9.4
**Design System:** `.interface-design/system.md` — Direction: Boldness & Clarity
**Regras não-negociáveis:** 10 (ver system.md)

---

## Legenda de Severidade

| Ícone | Significado |
|-------|------------|
| ❌ | Crítico — quebra de regra não-negociável, risco de produção |
| ⚠️ | Alto — inconsistência visual visível, corrigir antes do release |
| 💡 | Baixo — refinamento opcional |

---

## 1. `bidirectional-slider.tsx` — Score: 🔴 CRÍTICO

### Violações

**L108 — Dynamic Tailwind class** ❌
```tsx
// ANTES (L108)
<span className={`text-sm font-bold font-mono text-${color}`}>{label}</span>

// DEPOIS — mapa estático (Regra 10: color with purpose)
const COLOR_TEXT: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  'accent-purple': 'text-accent-purple',
  'accent-orange': 'text-accent-orange',
}
<span className={`text-sm font-bold font-mono ${COLOR_TEXT[color]}`}>{label}</span>
```
> Token system.md: `color.primary = #00D9FF`, `color.secondary = #39FF14`

---

**L116-117 — Dynamic class + RGBA inline** ❌
```tsx
// ANTES (L116-117)
<span className={`font-mono text-xl font-bold text-${color}`}
  style={{ filter: `drop-shadow(0 0 8px rgba(${rgb},0.4))` }}>

// DEPOIS — mapa estático + CSS custom property
const GLOW_FILTER: Record<string, string> = {
  primary: 'drop-shadow(0 0 8px rgba(0,217,255,0.4))',
  secondary: 'drop-shadow(0 0 8px rgba(57,255,20,0.4))',
  'accent-purple': 'drop-shadow(0 0 8px rgba(168,85,247,0.4))',
  'accent-orange': 'drop-shadow(0 0 8px rgba(249,115,22,0.4))',
}
<span className={`font-mono text-xl font-bold ${COLOR_TEXT[color]}`}
  style={{ filter: GLOW_FILTER[color] }}>
```
> Regra #2: Neon glow só em primary/secondary. Regra #10: cor com propósito.

---

**L131 — Spacing non-4px: `mx-[18px]`** ⚠️
```tsx
// ANTES (L131)
className="relative h-10 flex-1 mx-[18px] flex items-center..."

// DEPOIS — snapping ao grid (16px)
className="relative h-10 flex-1 mx-4 flex items-center..."
```
> Regra #4: Spacing grid = [4, 8, 12, 16, 24, 32, 64]px. 18px ∉ grid.

---

**L142 + L147 — Track height `h-1.5` (6px)** ⚠️
```tsx
// ANTES (L142 track bg, L147 filled track)
className="absolute left-0 right-0 h-1.5 bg-black/40 rounded-full"
className="absolute h-1.5 rounded-full pointer-events-none"

// DEPOIS — 4px grid
className="absolute left-0 right-0 h-1 bg-black/40 rounded-full"
className="absolute h-1 rounded-full pointer-events-none"
```
> `h-1` = 4px ✅ | `h-1.5` = 6px ❌

---

**L151-152 — RGBA hardcoded: filled track** ❌
```tsx
// ANTES (L151-152)
style={{
  background: `rgba(${rgb},1)`,
  boxShadow: `0 0 8px rgba(${rgb},0.6)`,
}}

// DEPOIS — mapa estático de valores congelados
const TRACK_STYLE: Record<string, { background: string; boxShadow: string }> = {
  primary:        { background: '#00D9FF', boxShadow: '0 0 8px rgba(0,217,255,0.6)' },
  secondary:      { background: '#39FF14', boxShadow: '0 0 8px rgba(57,255,20,0.6)' },
  'accent-purple':{ background: '#A855F7', boxShadow: '0 0 8px rgba(168,85,247,0.6)' },
  'accent-orange':{ background: '#F97316', boxShadow: '0 0 8px rgba(249,115,22,0.6)' },
}
style={TRACK_STYLE[color]}
```

---

**L188 — Dynamic class: `border-${color}`** ❌
```tsx
// ANTES (L188)
className={`w-7 h-7 rounded-full ... border-2 border-${color} bg-background-dark/90`}

// DEPOIS
const COLOR_BORDER: Record<string, string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  'accent-purple': 'border-accent-purple',
  'accent-orange': 'border-accent-orange',
}
className={`w-7 h-7 rounded-full ... border-2 ${COLOR_BORDER[color]} bg-background-dark/90`}
```

---

**L190-193 — RGBA hardcoded: thumb ring glow** ❌
```tsx
// ANTES (L190-193)
boxShadow: pressed
  ? `0 0 20px rgba(${rgb},0.9), 0 0 8px rgba(${rgb},0.5)`
  : `0 0 10px rgba(${rgb},0.4)`,

// DEPOIS — mapa estático
const THUMB_GLOW: Record<string, { pressed: string; rest: string }> = {
  primary:        { pressed: '0 0 20px rgba(0,217,255,0.9), 0 0 8px rgba(0,217,255,0.5)',   rest: '0 0 10px rgba(0,217,255,0.4)' },
  secondary:      { pressed: '0 0 20px rgba(57,255,20,0.9), 0 0 8px rgba(57,255,20,0.5)',   rest: '0 0 10px rgba(57,255,20,0.4)' },
  'accent-purple':{ pressed: '0 0 20px rgba(168,85,247,0.9), 0 0 8px rgba(168,85,247,0.5)', rest: '0 0 10px rgba(168,85,247,0.4)' },
  'accent-orange':{ pressed: '0 0 20px rgba(249,115,22,0.9), 0 0 8px rgba(249,115,22,0.5)', rest: '0 0 10px rgba(249,115,22,0.4)' },
}
boxShadow: pressed ? THUMB_GLOW[color].pressed : THUMB_GLOW[color].rest,
```

---

**L199-202 — RGBA hardcoded: inner dot** ❌
```tsx
// ANTES (L199-202)
style={{
  width: pressed ? '10px' : '8px',
  height: pressed ? '10px' : '8px',
  background: `rgba(${rgb},1)`,
  boxShadow: `0 0 6px rgba(${rgb},0.8)`,
}}

// DEPOIS — usar TRACK_STYLE + dot glow
const DOT_GLOW: Record<string, string> = {
  primary: '0 0 6px rgba(0,217,255,0.8)',
  secondary: '0 0 6px rgba(57,255,20,0.8)',
  'accent-purple': '0 0 6px rgba(168,85,247,0.8)',
  'accent-orange': '0 0 6px rgba(249,115,22,0.8)',
}
style={{
  width: pressed ? '10px' : '8px',
  height: pressed ? '10px' : '8px',
  background: TRACK_STYLE[color].background,
  boxShadow: DOT_GLOW[color],
}}
```

---

### Resumo bidirectional-slider

| Linha | Tipo | Regra | Ação |
|-------|------|-------|------|
| 108, 116 | Dynamic `text-${color}` | #10 | → `COLOR_TEXT` map |
| 117 | RGBA inline drop-shadow | #2, #10 | → `GLOW_FILTER` map |
| 131 | `mx-[18px]` non-4px | #4 | → `mx-4` |
| 142, 147 | `h-1.5` non-4px | #4 | → `h-1` |
| 151-152 | RGBA track | #2, #10 | → `TRACK_STYLE` map |
| 188 | Dynamic `border-${color}` | #10 | → `COLOR_BORDER` map |
| 190-193 | RGBA thumb glow | #2, #10 | → `THUMB_GLOW` map |
| 199-202 | RGBA inner dot | #2, #10 | → `TRACK_STYLE` + `DOT_GLOW` map |

---

## 2. `styled-slider.tsx` — Score: 🔴 CRÍTICO

Padrão visual idêntico ao `BidirectionalSlider` — mesmas violações, mesmas correções.

### Violações

**L49 — Spacing non-4px: `mx-[18px]`** ⚠️
```tsx
// ANTES (L49)
className="relative h-10 mx-[18px] flex items-center..."
// DEPOIS
className="relative h-10 mx-4 flex items-center..."
```

**L63 — Track bg `h-1.5`** ⚠️
```tsx
// L63 → h-1
```

**L68 — Tick mark `h-2.5` (10px)** ⚠️
```tsx
// ANTES (L68)
className="absolute w-0.5 h-2.5 rounded-full pointer-events-none"
// DEPOIS — grid: 8px
className="absolute w-0.5 h-2 rounded-full pointer-events-none"
```

**L73 — RGBA recommended tick** ❌
```tsx
// ANTES (L73)
backgroundColor: `rgba(${rgb},0.4)`,
// DEPOIS — TRACK_STYLE[color].background + opacity
backgroundColor: TRACK_STYLE[color].background,
opacity: 0.4,
```

**L84-85 — RGBA filled track** ❌
```tsx
// ANTES (L84-85)
background: `rgba(${rgb},1)`,
boxShadow: `0 0 8px rgba(${rgb},0.6)`,
// DEPOIS
...TRACK_STYLE[color],
```

**L96 — Dynamic `border-${color}`** ❌
```tsx
// DEPOIS → COLOR_BORDER[color]
```

**L99-100 — RGBA thumb glow** ❌
```tsx
// DEPOIS → THUMB_GLOW[color].pressed / .rest
```

**L109-110 — RGBA inner dot** ❌
```tsx
// DEPOIS → TRACK_STYLE[color].background + DOT_GLOW[color]
```

> **Nota arquitetural:** Os 4 mapas estáticos (`COLOR_TEXT`, `COLOR_BORDER`, `TRACK_STYLE`, `THUMB_GLOW`, `DOT_GLOW`) devem ser extraídos para um arquivo compartilhado `src/components/slider-tokens.ts` — reutilizados em ambos os sliders.

---

## 3. `shared-result-parts.tsx` — Score: 🔴 CRÍTICO

### BigNumber (L52-94)

**L56 — Dynamic class `from-${color}/5`** ❌
```tsx
// ANTES (L56)
className={`absolute inset-0 bg-gradient-to-br from-${color}/5 to-transparent...`}

// DEPOIS — inline style (gradiente dinâmico via hex)
const COLOR_HEX: Record<string, string> = {
  primary: '#00D9FF',
  secondary: '#39FF14',
  'accent-purple': '#A855F7',
  'accent-orange': '#F97316',
}
style={{ background: `linear-gradient(to bottom right, ${COLOR_HEX[color]}0D, transparent)` }}
// 0D hex = 5% opacity
```

**L58 — Dynamic `text-${color}`** ❌
```tsx
// DEPOIS → COLOR_TEXT[color]
```

**L60 — Dynamic `text-${color}`** ❌
```tsx
// DEPOIS → COLOR_TEXT[color]
```

**L61 — drop-shadow via `glow` prop** ❌
```tsx
// ANTES (L61) — glow = "rgba(0,217,255,0.4)" (string construída em results-panel)
style={{ filter: `drop-shadow(0 0 8px ${glow})` }}

// DEPOIS — receber `color` no lugar de `glow`, usar GLOW_FILTER
style={{ filter: GLOW_FILTER[color] }}
// Simplifica a interface: remover prop `glow`, `barGlow`; usar apenas `color`
```

**L85-87 — `h-1.5` + Dynamic `bg-${color}` + RGBA boxShadow** ❌
```tsx
// ANTES (L85-87)
<div className="mt-4 w-full max-w-sm bg-black/40 h-1.5 rounded-full overflow-hidden relative z-10">
  <div className={`h-full bg-${color} rounded-full relative`}
    style={{ width: `${pct}%`, boxShadow: `0 0 15px ${barGlow}` }}>

// DEPOIS
const BAR_SHADOW: Record<string, string> = {
  primary: '0 0 15px rgba(0,217,255,0.8)',
  secondary: '0 0 15px rgba(57,255,20,0.8)',
  'accent-purple': '0 0 15px rgba(168,85,247,0.8)',
  'accent-orange': '0 0 15px rgba(249,115,22,0.8)',
}
<div className="mt-4 w-full max-w-sm bg-black/40 h-1 rounded-full overflow-hidden relative z-10">
  <div className={`h-full ${COLOR_BG[color]} rounded-full relative`}
    style={{ width: `${pct}%`, boxShadow: BAR_SHADOW[color] }}>
```

### ProgressCard (L96-111)

**L100 — `backdrop-blur-xl` em inner card** ⚠️
```tsx
// ANTES (L100) — ProgressCard é nível 2 (inner), NÃO deve ter backdrop-blur
className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-xl p-4..."

// DEPOIS — remover blur de inner card (Regra #3: max 2 níveis, blur só em surface)
className="bg-surface-dark border border-white/5 rounded-xl p-4..."
```
> Regra #3: `backdrop-blur` exclusivo para surface cards (nível 1)

**L105 — `h-1.5` + `mt-2`** ⚠️
```tsx
// ANTES (L105)
className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2"
// DEPOIS — mt-2 é 8px ✅, h-1 = 4px
className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2"
```

**L106 — RGBA `boxShadow: 0 0 10px ${barShadow}`** ❌
```tsx
// ANTES (L106) — barShadow = "rgba(0,217,255,0.5)" (prop string)
style={{ width: `${pct}%`, boxShadow: `0 0 10px ${barShadow}` }}

// DEPOIS — simplificar: barColor já tem a cor, adicionar shadow via classe utilitária
// ou extrair mapa BAR_SHADOW e passar color ao invés de barShadow
```

**L108 — Dynamic class `${barColor}/50`** ❌
```tsx
// ANTES (L108)
className={`absolute bottom-0 left-0 w-full h-[2px] ${barColor}/50 scale-x-0...`}
// PROBLEMA: ${barColor} = "bg-primary" — modificador /50 sobre classe dinâmica não funciona com purge

// DEPOIS — usar opacity-50 separado
className={`absolute bottom-0 left-0 w-full h-[2px] ${COLOR_BG[color]} opacity-50 scale-x-0...`}
```

### WarningsSection (L125-141)

**L135 — `mt-0.5` (2px non-grid)** ⚠️
```tsx
// ANTES (L135)
<span className="text-seg-amarelo mt-0.5">•</span>
// DEPOIS — 4px mínimo
<span className="text-seg-amarelo mt-1">•</span>
```

### Interface Simplification Proposal

Substituir props `glow`, `barGlow` por `color` em `BigNumber`. Centralizar toda lógica de cor nos mapas estáticos. Reduzir surface de erro da API.

```tsx
// ANTES — BigNumberProps com 3 props de cor
{ color: string; glow: string; barGlow: string }

// DEPOIS — apenas color, mapas internos cuidam do resto
{ color: string }
```

---

## 4. `fine-tune-panel.tsx` — Score: 🔴 CRÍTICO

**L90 — Container: `gap-1` (OK, 4px) mas div pai `flex flex-col gap-1 group`**
> OK — gap-1 = 4px ✅

**L96 — Button label: `gap-1.5` (6px)** ⚠️
```tsx
// ANTES (L96)
className="flex items-center gap-1.5 cursor-pointer"
// DEPOIS
className="flex items-center gap-2 cursor-pointer"
```

**L100 — Dynamic `text-${color}`** ❌
```tsx
// DEPOIS → COLOR_TEXT[color]
```

**L116 — Dynamic `text-${color}` + `w-20` (80px, non-grid)** ❌
```tsx
// ANTES (L116)
className={`w-20 bg-transparent ... text-xl font-bold text-${color} ...`}
// DEPOIS — w-20 = 80px. Grid sugere w-16 (64px) ou w-24 (96px)
// 80px não é múltiplo de 4px standard — usar w-20 só se necessário para legibilidade
// Correção mínima: dynamic class → COLOR_TEXT[color]
className={`w-20 bg-transparent ... text-xl font-bold ${COLOR_TEXT[color]} ...`}
```

**L117 — RGBA inline drop-shadow** ❌
```tsx
// ANTES (L117)
style={{ filter: `drop-shadow(0 0 8px rgba(${rgb},0.4))` }}
// DEPOIS → GLOW_FILTER[color]
style={{ filter: GLOW_FILTER[color] }}
```

**L123 — `gap-1.5` (6px)** ⚠️
```tsx
// ANTES (L123)
<div className="flex items-center gap-1.5">
// DEPOIS
<div className="flex items-center gap-2">
```

**L147 — Drawer: `space-y-1.5` (6px)** ⚠️
```tsx
// ANTES (L147)
<div className="space-y-1.5">
// DEPOIS
<div className="space-y-2">
```

**L149 + L153 — `pt-0.5` implicit (OK), mas** verificar `shrink-0 pt-0.5`
```tsx
// L149: pt-0.5 = 2px ❌
// DEPOIS → pt-1 (4px)
```

**L156 — `pt-1.5` (6px)** ⚠️
```tsx
// ANTES (L156)
<div className="flex items-start gap-2 pt-1.5 mt-1 border-t border-white/5">
// DEPOIS
<div className="flex items-start gap-2 pt-2 mt-1 border-t border-white/5">
```

**L164 — Dynamic `bg-${color}/30`** ❌
```tsx
// ANTES (L164)
className={`absolute bottom-0 left-0 w-full h-[1px] bg-${color}/30 scale-x-0...`}

// DEPOIS — opacity modifier sobre classe dinâmica = purge unsafe
// Usar inline style ou substituir por opacity separada
const DIVIDER_COLOR: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  'accent-purple': 'bg-accent-purple',
  'accent-orange': 'bg-accent-orange',
}
className={`absolute bottom-0 left-0 w-full h-[1px] ${DIVIDER_COLOR[color]} opacity-30 scale-x-0...`}
```

---

## 5. `config-panel.tsx` — Score: 🟡 MÉDIO

**L66 — `w-[100px]` (100px, non-grid)** ⚠️
```tsx
// ANTES (L66)
className={`bg-black/40 border rounded px-2 py-1 text-base text-white font-mono focus:outline-none w-[100px] ...`}
// DEPOIS — w-24 = 96px (mais próximo no grid)
className={`bg-black/40 border rounded px-2 py-1 text-base text-white font-mono focus:outline-none w-24 ...`}
```

**L171 — `pl-3 pr-10` (12px + 40px)** ⚠️
```tsx
// ANTES (L171) — pr-10 = 40px ∉ grid
className="w-full ... py-3 pl-3 pr-10 ..."
// DEPOIS — pr-8 = 32px ✅ (espaço para chevron)
className="w-full ... py-3 pl-3 pr-8 ..."
```

**L292 — `w-10 py-1`** ⚠️
```tsx
// ANTES (L292) — w-10 = 40px ∉ grid, py-1 = 4px ✅
className={`w-10 py-1 rounded border text-sm font-mono ...`}
// DEPOIS — w-8 = 32px ✅ (ou manter w-10 se necessário para legibilidade de "Z")
// Prioridade baixa — impacto visual mínimo
```

**L355 — `w-10` (40px)** ⚠️
```tsx
// ANTES (L355) — safety factor value display
<span className="text-base font-mono text-primary w-10 text-right">
// DEPOIS
<span className="text-base font-mono text-primary w-8 text-right">
```

> **Nota:** `config-panel.tsx` não tem violações críticas (sem rgba inline, sem dynamic classes de cor). Apenas spacing não-grid.

---

## 6. `results-panel.tsx` — Score: 🟡 MÉDIO

**L63-66 — Animation timing** 💡
```tsx
// animate-[subtlePulse_1.5s_ease-in-out] — 1500ms matches system.md ✅
// OK — sem violação
```

**L84 — `py-1.5` (6px) no botão star** ⚠️
```tsx
// ANTES (L84)
className="flex items-center gap-2 px-3 py-1.5 rounded-lg ..."
// DEPOIS
className="flex items-center gap-2 px-3 py-2 rounded-lg ..."
```

**L91-92 — Star button inline filter + color hardcoded** ⚠️
```tsx
// ANTES (L91-92)
style={{
  fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
  color: isFavorited ? '#facc15' : undefined,
  filter: isFavorited ? 'drop-shadow(0 0 6px rgba(250,204,21,0.5))' : undefined,
}}
// Nota: #facc15 = yellow-300 — NÃO é um token do design system
// REGRA #6: Safety colors RESERVED — amarelo (#f39c12) para semáforo, não para UI genérica
// DEPOIS — usar token seg-amarelo ou manter yellow-300 só para favorito (cor diferente de semáforo)
// Aceitar como exceção documentada: favorito usa yellow-300 (distinto do seg-amarelo #f39c12)
// → sem alteração necessária, mas documentar exceção
```

**L119 — `grid grid-cols-4 gap-2`** ⚠️
```tsx
// gap-2 = 8px ✅ — OK
```

**L156 — `p-4` alert card** 💡
```tsx
// p-4 = 16px ✅ — OK
```

**L170 — `p-6` formula card** 💡
```tsx
// p-6 = 24px ✅ — OK
```

**Glassmorphism depth — Zona 2+3** ⚠️
```
ResultsPanel (surface, backdrop-blur-xl)       ← nível 1 ✅
  BigNumber (surface-dark, backdrop-blur-xl)   ← nível 2 ✅
    BidirectionalSlider → track/thumb          ← elementos UI, sem glassmorphism ✅
  ProgressCard (surface-dark, backdrop-blur-xl)← nível 2, MAS tem blur ❌
    bar div                                    ← nível 3 sem glassmorphism ✅
```
> Correção: remover `backdrop-blur-xl` de `ProgressCard` (tratado em shared-result-parts L100)

---

## 7. `gauge.tsx` — Score: 🟢 ACEITÁVEL

**Hex hardcoded nos arrays de paleta** 💡
```tsx
// Todos os hex (#39FF14, #00D9FF, #f39c12, #E74C3C) são tokens do design system
// SVG data-driven não suporta Tailwind — uso de hex é tecnicamente necessário
// Correção opcional: adicionar comentário de referência
const PALETAS = {
  avanco: [
    '#39FF14', // secondary
    '#2ecc71', // seg-verde
    // ...
    '#00D9FF', // primary
    '#f39c12', // seg-amarelo
  ],
}
```
> Baixíssima prioridade. Funcionalmente correto.

---

## 8. `App.tsx` — Score: ✅ LIMPO

Sem violações. Layout correto (2-col 3+9), tokens aplicados corretamente, sem rgba inline, sem dynamic classes.

---

## Proposta de Arquitetura — Tokens Compartilhados

Para eliminar as 26+ instâncias de rgba e 12+ dynamic classes, propor criação de:

### `src/components/slider-tokens.ts` (novo arquivo)
```ts
// Mapas estáticos de cor para slider components
// Substitui todas as props `rgb` e dynamic className

export const COLOR_TEXT: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  'accent-purple': 'text-accent-purple',
  'accent-orange': 'text-accent-orange',
}

export const COLOR_BORDER: Record<string, string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  'accent-purple': 'border-accent-purple',
  'accent-orange': 'border-accent-orange',
}

export const COLOR_BG: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  'accent-purple': 'bg-accent-purple',
  'accent-orange': 'bg-accent-orange',
}

// Frozen rgba values — substitui prop rgb
export const TRACK_STYLE: Record<string, { background: string; boxShadow: string }> = {
  primary:         { background: '#00D9FF', boxShadow: '0 0 8px rgba(0,217,255,0.6)' },
  secondary:       { background: '#39FF14', boxShadow: '0 0 8px rgba(57,255,20,0.6)' },
  'accent-purple': { background: '#A855F7', boxShadow: '0 0 8px rgba(168,85,247,0.6)' },
  'accent-orange': { background: '#F97316', boxShadow: '0 0 8px rgba(249,115,22,0.6)' },
}

export const THUMB_GLOW: Record<string, { pressed: string; rest: string }> = {
  primary:         { pressed: '0 0 20px rgba(0,217,255,0.9), 0 0 8px rgba(0,217,255,0.5)',   rest: '0 0 10px rgba(0,217,255,0.4)' },
  secondary:       { pressed: '0 0 20px rgba(57,255,20,0.9), 0 0 8px rgba(57,255,20,0.5)',   rest: '0 0 10px rgba(57,255,20,0.4)' },
  'accent-purple': { pressed: '0 0 20px rgba(168,85,247,0.9), 0 0 8px rgba(168,85,247,0.5)', rest: '0 0 10px rgba(168,85,247,0.4)' },
  'accent-orange': { pressed: '0 0 20px rgba(249,115,22,0.9), 0 0 8px rgba(249,115,22,0.5)', rest: '0 0 10px rgba(249,115,22,0.4)' },
}

export const DOT_GLOW: Record<string, string> = {
  primary: '0 0 6px rgba(0,217,255,0.8)',
  secondary: '0 0 6px rgba(57,255,20,0.8)',
  'accent-purple': '0 0 6px rgba(168,85,247,0.8)',
  'accent-orange': '0 0 6px rgba(249,115,22,0.8)',
}

export const GLOW_FILTER: Record<string, string> = {
  primary: 'drop-shadow(0 0 8px rgba(0,217,255,0.4))',
  secondary: 'drop-shadow(0 0 8px rgba(57,255,20,0.4))',
  'accent-purple': 'drop-shadow(0 0 8px rgba(168,85,247,0.4))',
  'accent-orange': 'drop-shadow(0 0 8px rgba(249,115,22,0.4))',
}

export const BAR_SHADOW: Record<string, string> = {
  primary: '0 0 15px rgba(0,217,255,0.8)',
  secondary: '0 0 15px rgba(57,255,20,0.8)',
  'accent-purple': '0 0 15px rgba(168,85,247,0.8)',
  'accent-orange': '0 0 15px rgba(249,115,22,0.8)',
}

export const COLOR_HEX: Record<string, string> = {
  primary: '#00D9FF',
  secondary: '#39FF14',
  'accent-purple': '#A855F7',
  'accent-orange': '#F97316',
}
```

---

## Plano de Implementação — Sessão 3

| Prioridade | Ação | Impacto |
|-----------|------|---------|
| 1 | Criar `slider-tokens.ts` com todos os mapas | Elimina 26+ rgba + 12+ dynamic classes |
| 2 | Refatorar `bidirectional-slider.tsx` usando mapas | ❌→✅ |
| 3 | Refatorar `styled-slider.tsx` usando mapas | ❌→✅ |
| 4 | Refatorar `shared-result-parts.tsx` (BigNumber + ProgressCard) | ❌→✅ |
| 5 | Refatorar `fine-tune-panel.tsx` (dynamic classes + spacing) | ❌→✅ |
| 6 | Fix spacing `config-panel.tsx` (w-[100px]→w-24, pr-10→pr-8) | ⚠️→✅ |
| 7 | Fix `results-panel.tsx` (py-1.5→py-2) | ⚠️→✅ |

**Arquivos afetados:** 6 componentes + 1 novo arquivo
**Arquivos NÃO alterados:** `App.tsx`, `gauge.tsx`
**Testes existentes:** nenhum teste visual — apenas smoke tests. Nenhuma regressão esperada em testes unitários.

---

## Contexto Compacto para Sessão 3

```
╔══════════════════════════════════════════════════════════════╗
║          SESSÃO 3 — INPUT CONTEXT (execução)                 ║
╠══════════════════════════════════════════════════════════════╣
║ AÇÃO PRINCIPAL: criar slider-tokens.ts + refatorar 5 comps  ║
║                                                              ║
║ SEQUÊNCIA:                                                   ║
║  1. src/components/slider-tokens.ts — NOVO (8 mapas)         ║
║  2. bidirectional-slider.tsx — remover prop rgb, usar mapas  ║
║  3. styled-slider.tsx — idem                                 ║
║  4. shared-result-parts.tsx — BigNumber/ProgressCard         ║
║  5. fine-tune-panel.tsx — dynamic classes + spacing          ║
║  6. config-panel.tsx — w-[100px]→w-24, pr-10→pr-8           ║
║  7. results-panel.tsx — py-1.5→py-2                          ║
║                                                              ║
║ REGRA: cada comp deve ter 0 rgba inline + 0 dynamic classes  ║
║ TESTE: npm run test após cada componente                      ║
║ BUILD: npm run build ao final                                 ║
╚══════════════════════════════════════════════════════════════╝
```

---

*Gerado em Sessão 2 — READ-ONLY. Nenhum arquivo em `src/` foi alterado.*
*Todos os before/after referenciados em `.interface-design/system.md` (Direction: Boldness & Clarity)*
