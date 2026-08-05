# ToolOptimizer CNC — Design System

> Last updated: 2026-08-05 — full tokenization pass (see Token Reference).

## Direction: Boldness & Clarity
High contrast neon-on-dark. Every element communicates function.
Cyber-industrial aesthetic with glassmorphic depth.

## Foundation
- **Personality:** Technical precision meets visual drama
- **Mood:** Dark cockpit, neon instruments, industrial control panel
- **Principle:** Density with clarity — every pixel earns its place

---

## Color Tokens

### Primary Palette
| Token | Hex | Usage |
|-------|-----|-------|
| primary | #00D9FF | Cyan neon — RPM, titles, primary actions |
| secondary | #39FF14 | Green neon — Feed Rate, success states |
| bg-dark | #0F1419 | Main background (deep blue-black) |
| surface | rgba(22,27,34,0.7) | Card backgrounds (glassmorphism) |
| card-dark | rgba(30,35,45,0.6) | Inner card backgrounds |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| accent-purple | #A855F7 | Radial engagement (ae) |
| accent-orange | #F97316 | Axial depth (ap), warnings, badges |

### Safety Semaphore (RESERVED — domain-specific)

> **Single palette.** A second, more saturated triple
> (`#00E676`/`#FFA500`/`#FF4D4D`) used to live in the gauges and segmented
> bars. It was retired in favour of the tokens below — `SEMAPHORE_HEX` in
> `design-tokens.ts` is now the only definition in the repo.

| Token | Hex | Condition |
|-------|-----|-----------|
| seg-verde | #2ecc71 | Safe — L/D ≤ 3 |
| seg-amarelo | #f39c12 | Alert — L/D 3-4, vibration warning |
| seg-vermelho | #e74c3c | Critical — L/D 4-6, suggest reduction |
| bloqueado | gray/disabled | Blocked — L/D > 6 |

### Gray Scale (Text)
| Token | Usage |
|-------|-------|
| text-white | Primary content |
| text-gray-300 | Headings |
| text-gray-400 | Labels, secondary text |
| text-gray-500 | Helper text, faint |
| text-gray-600 | Very faint, decorative |

### Opacity Scale
| Token | Usage |
|-------|-------|
| bg-white/5, /10, /20 | Light highlights on dark surfaces |
| bg-black/20, /40, /50 | Dark overlays, nested containers |
| border-white/5, /10, /15, /20 | Border hierarchy (faint → visible) |
| bg-{color}/5, /10 | Color-tinted backgrounds |

---

## Typography

| Element | Font | Size | Weight | Extra |
|---------|------|------|--------|-------|
| UI text | Inter | varies | 400-600 | Sans-serif base |
| Numbers (ALL) | JetBrains Mono | varies | 700 | **OBRIGATORIO** |
| Big Numbers | JetBrains Mono | text-6xl / text-7xl | 700 | drop-shadow neon glow |
| Section headers | Inter | text-xs | 700 | uppercase tracking-widest text-gray-400 |
| Labels | Inter | text-xs | 700 | Color accent of parent |
| Unit labels | Inter | text-xs | 700 | Same color as parent value |
| Helper text | Inter | text-[10px] | 400 | text-gray-500 or text-gray-600 |
| Button text | Inter | text-sm / text-base | 700 | tracking-wide |

### Typography Rules
- ALL numerical values use `font-mono` (JetBrains Mono) — no exceptions
- Section headers: `text-xs font-bold uppercase tracking-widest text-gray-400` + colored accent bar
- Big numbers: `text-6xl font-mono font-bold` with `drop-shadow` glow matching color
- Letter spacing patterns: `tracking-widest` (headers), `tracking-wide` (buttons), `tracking-[0.25em]` (special labels)

---

## Spacing

**Base unit:** 4px
**Scale:** [4, 8, 12, 16, 24, 32, 64]

| Context | Value | Tailwind |
|---------|-------|----------|
| Tight component gaps | 4px | gap-1 |
| Standard component gaps | 8-12px | gap-2 to gap-3 |
| Card padding (outer) | 24px | p-6 |
| Card padding (inner) | 16px | p-4 |
| Section gaps | 16-24px | gap-4 to gap-6 |
| Button padding | 8-12px V, 12-16px H | py-2 px-3 to py-3 px-4 |
| Slider control spacing | 18px horizontal | mx-[18px] |

### Micro-Scale (documented exception)

Control density and hairline rendering need sub-4px precision. These values are
part of the system — they are not drift:

| Value | Tailwind | Allowed for |
|-------|----------|-------------|
| 2px | `h-0.5`, `mt-0.5`, `w-[2px]` | hairlines, center tick marks, tight vertical nudges |
| 6px | `h-1.5`, `py-1.5`, `gap-1.5` | slider track height, dense rows, chip padding |
| 10px | `px-2.5`, `h-2.5` | compact chips and tick marks |
| 18px | `mx-[18px]` | slider track inset, so the thumb never overflows its container |

Anything outside both scales is drift and must snap to the nearest grid value.

### Spacing Rules
- Layout spacing (padding, margin, gap) must be a multiple of 4px
- Sub-4px values are allowed ONLY from the micro-scale above
- If a value is on neither scale (e.g., 17px, 14px), snap to nearest grid value
- Vertical stacking: prefer `space-y-2` to `space-y-4` depending on density
- Cards use consistent `p-4` (inner) or `p-6` (outer) — never mix

---

## Depth Strategy: Glassmorphism + Neon Glow

### Surface Hierarchy (outer → inner)
| Level | Background | Extra |
|-------|-----------|-------|
| 1. Main bg | #0F1419 (solid) | — |
| 2. Surface card | rgba(22,27,34,0.7) | backdrop-blur-xl + border-white/5 |
| 3. Inner card | rgba(30,35,45,0.6) | border-white/5 + shadow-inner-glow |
| 4. Nested/inset | bg-black/40 or bg-black/20 | For inputs, track backgrounds |

### Glow Shadows
| Name | Value | Usage |
|------|-------|-------|
| Neon cyan | 0 0 15px rgba(0,217,255,0.4), 0 0 30px rgba(0,217,255,0.15) | Primary elements (buttons, active states) |
| Neon green | 0 0 15px rgba(57,255,20,0.4), 0 0 30px rgba(57,255,20,0.15) | Secondary elements (feed rate, success) |
| Glass | 0 8px 32px 0 rgba(0,0,0,0.5) | Outer card shadow |
| Inner glow | inset 0 0 20px rgba(255,255,255,0.03) | Inner card subtle depth |
| Big number glow | drop-shadow(0 0 20px rgba(rgb,0.6)) | Value emphasis |

### Depth Rules
- Borders = `border-white/5` to `border-white/20` — NO opaque borders
- Neon glow replaces heavy box-shadow — never use both
- Glassmorphism cards max **2 levels deep** (surface → inner)
- Glow only on primary/secondary accent elements — not on every border

---

## Border Radius

| Element | Radius | Tailwind |
|---------|--------|----------|
| Cards (outer) | 16px | rounded-2xl |
| Cards (inner) | 12px | rounded-xl |
| Inputs/Selects | 8px | rounded-lg |
| Buttons (small) | 4-8px | rounded to rounded-lg |
| Buttons (primary CTA) | 12px | rounded-xl |
| Slider thumbs | 50% | rounded-full |
| Track bars | 9999px | rounded-full |

---

## Component Patterns

### Button — Primary (Simular)
```
py-3 px-4 rounded-xl
bg-gradient-to-r from-cyan-600 to-cyan-500
text-white font-bold tracking-wide
shadow-neon-cyan
hover:shadow-[0_0_25px_rgba(0,217,255,0.5)] hover:brightness-110
active:scale-[0.98]
transition-all
```

### Button — Reset (Small Icon)
```
w-12 rounded-xl
bg-white/5 border border-white/10
text-gray-400
hover:bg-white/10 hover:text-white
transition-all
```

### Button — Increment/Decrement (Micro)
```
w-6 h-6 rounded
bg-black/40 border border-white/10
text-gray-400
hover:text-white hover:bg-white/10
active:scale-90 transition-all
```

### Button — Selection Group (Active/Inactive)
```
Active:   bg-primary text-black font-bold py-2 rounded border border-primary shadow-neon-cyan
Inactive: bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-2 rounded border border-white/10
```

### Card — Surface (Outer)
```
bg-surface-dark backdrop-blur-xl
border border-white/5 rounded-2xl p-6
shadow-glass
```

### Card — Inner
```
bg-card-dark rounded-xl p-4
border border-white/5 shadow-inner-glow
```

### Card — Nested/Inset
```
bg-black/40 rounded-lg p-3
border border-white/5
```

### Select/Dropdown
```
w-full bg-black/40 border border-white/10 rounded-lg
py-3 pl-3 pr-10
text-sm text-gray-200
focus:ring-1 focus:ring-primary focus:border-primary
outline-none appearance-none transition-all
Custom chevron: background-image SVG at right 0.75rem center
```

### Radio Group (Peer-checked)
```
Container: py-2.5 px-1 rounded-lg transition-all cursor-pointer
Unchecked: bg-black/40 border border-white/5 text-gray-400 hover:bg-white/5
Checked:   bg-primary/10 border border-primary text-primary shadow-neon-cyan
```

### Slider — Custom (BidirectionalSlider)
```
Track:       h-1.5 bg-black/40 rounded-full
Filled:      dynamic color + box-shadow: 0 0 8px rgba(rgb,0.6)
Thumb ring:  w-7 h-7 rounded-full border-2 border-{color} bg-transparent
Thumb dot:   8px diameter (normal), 10px (pressed)
Pressed:     scale(1.15) + enhanced glow
Tick marks:  bg-white/20 (major), bg-white/10 (minor), varying heights
```

### Number Input
```
bg-transparent border-none
text-white text-sm font-mono
focus:ring-0 p-1
```

### Big Number Display
```
text-6xl font-mono font-bold text-{color}
drop-shadow(0 0 20px rgba(rgb,0.6))
```

### Metric Cell (4-grid)
```
p-4 flex flex-col gap-1
font-mono for values
text-xs text-gray-400 for labels
```

---

## Animations

| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| spinner | infinite 1s | linear | Loading button icon rotation |
| fadeInUp | 500ms | ease-out | Element entrance (0→1 opacity, 10px↑) |
| subtlePulse | 1500ms | ease-in-out | Post-simulation results pulse |
| gaugeRoll | 1350ms | ease-out | Gauge rotation feedback (0→1440deg) |
| fadeOut | 300ms | ease-in | Panel reset (→0.3 opacity) |
| dashFlow | 800ms | linear | Gauge arc stroke fill |
| shimmer | 1.5s | ease-in-out | Loading placeholder shimmer |
| btnIdleGlow | infinite | ease-in-out | Simulate button breathing glow while idle |
| jackpotFlash | one-shot | ease-out | Result reveal flash (cyan → green → cyan) |
| ambientPulse | infinite | ease-in-out | Ambient opacity pulse on background accents |
| sliderShake | 400ms | ease-out | Slider hit its min/max bound |
| spinIcon | one-shot | ease-in-out | Icon rotate + scale on action confirm |
| miniGaugeFlash | one-shot | ease-out | Mini gauge scale pop on value change |
| tabSlideIn | 200ms | ease-out | Mobile tab content entrance |

### Transition Defaults
- Standard: `transition-all duration-300`
- Slow: `duration-500` to `duration-700`
- Button press: `active:scale-[0.98]`
- Icon button press: `active:scale-90`

---

## Interactive States

| State | Pattern |
|-------|---------|
| Hover | `hover:bg-white/5`, `hover:text-white`, `hover:brightness-110`, `hover:border-white/20` |
| Focus | `focus:ring-1 focus:ring-primary`, `focus:border-primary`, `focus:outline-none` |
| Active | `active:scale-[0.98]` (standard), `active:scale-90` (small icons) |
| Disabled | `disabled:opacity-70`, `disabled:cursor-not-allowed` |
| Group hover | `group-hover:text-primary`, `group-hover:opacity-100` |

---

## Layout

| Property | Value |
|----------|-------|
| Max width | 1500px centered (`max-w-[1500px] mx-auto`) |
| Desktop grid | 2 columns since v0.8.0 (config + results/fine-tune). `docs/design/UI_DESIGN_SPEC_FINAL.md` still describes the old 3-column layout and is superseded by this file. |
| Min desktop width | 1360px |
| Header | `flex items-center justify-between py-4 px-6 rounded-2xl` |
| Section scroll | `overflow-y-auto pr-1` with custom scrollbar |
| Icon system | Material Symbols Outlined (Google Fonts) |
| Icon weights | 100-700, FILL: 0-1 |

### Gradient Patterns
| Usage | Pattern |
|-------|---------|
| Primary CTA only | `bg-gradient-to-r from-cyan-600 to-cyan-500` |
| Card overlay | `bg-gradient-to-br from-{color}/5 to-transparent` |
| Text gradient (rare) | `bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent` |

---

## Scrollbar
```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0F1419; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #555; }
```

---

---

## Token Reference (source of truth)

Colors live in **one** place: the `@theme` block of `src/index.css`. Everything
else references them. Never write a hex or rgba literal in a component.

### `src/index.css` — `@theme`

| Namespace | Tokens |
|-----------|--------|
| Brand | `primary` `secondary` `accent-orange` `accent-purple` `accent-gold` `accent-mint` `accent-pink` |
| Semaphore | `seg-verde` `seg-amarelo` `seg-vermelho` `gauge-empty` |
| Surfaces | `background-dark` `surface-dark` `surface-solid` `card-dark` `lcd-dark` `lcd-panel` `elevated-dark` `overlay-dark` `modal-dark` |
| Text | `text-muted` |
| Shadows | `shadow-neon-cyan` `shadow-neon-green` `shadow-neon-orange` `shadow-neon-purple` `shadow-glass` `shadow-inner-glow` |
| Font size | `text-3xs` (9px) `text-2xs` (10px) `text-fine` (11px) |
| Font family | `font-display` (Inter) `font-mono` (JetBrains Mono) |

> **Tailwind v4 gotcha:** the font-size namespace is `--text-*`, NOT
> `--font-size-*`. Tokens declared under the wrong namespace generate no
> utility at all and fail silently.

### Which module do I reach for?

| Need | Module | Example |
|------|--------|---------|
| A class name that varies by accent color | `src/components/accent-tokens.ts` | `ACCENT_TEXT[color]`, `ACCENT_BORDER[color]` |
| A hex/rgb value for an inline `style={}` | `src/components/accent-tokens.ts` | `ACCENT_HEX.primary`, `ACCENT_RGB.secondary` |
| A slider glow or drop-shadow | `src/components/slider-tokens.ts` | `trackGlow(color)`, `thumbGlow(color, pressed)`, `dropGlow(color, 8, 0.4)` |
| A repeated class combination | `src/components/design-tokens.ts` | `CARD_GLASS`, `MODAL_ROOT`, `INPUT_BASE`, `SECTION_HEADER`, `TOUCH_TARGET` |
| A semaphore or neutral color value | `src/components/design-tokens.ts` | `SEMAPHORE_HEX.verde`, `COLOR_MUTED`, `ACCENT_GOLD` |
| Shared result-panel formatting | `src/utils/result-display.ts` | `getLdColor()`, `getLcdAlertLine()`, `formatToolSpec()` |

`slider-tokens.ts` derives its values from `accent-tokens.ts` — the accent hex
values are defined once.


## Rules (Non-Negotiable)

1. **ALL numbers use JetBrains Mono** — no exceptions, anywhere in the UI
2. **Neon glow only on primary/secondary elements** — not on every border or card
3. **Glassmorphism max 2 levels deep** — surface → inner, never deeper
4. **Spacing follows the 4px grid, with a documented micro-scale** — layout, padding, gaps and margins snap to [4,8,12,16,24,32,64]. The micro-scale [2,6,10,18px] is permitted ONLY for slider tracks, hairlines and control density (see Spacing)
5. **No opaque backgrounds on cards** — always rgba or opacity classes
6. **Safety colors RESERVED for semaphore and validation** — seg-verde/amarelo/vermelho for L/D, safety states and form validation errors. There is exactly ONE red, ONE amber and ONE green in the system — never Tailwind's default red-*/yellow-*/green-* ramps
7. **Gradients only on primary CTA buttons** — no gratuitous gradients elsewhere
8. **Uppercase + tracking-widest ONLY for section headers** — never on body or values
9. **Every interactive element needs hover + focus + active states** — no dead elements
10. **Color with purpose** — unmotivated color is noise; every color must communicate meaning
11. **NEVER interpolate Tailwind classes** — `text-${color}` is invisible to the scanner and gets purged in production. Use a static map from `accent-tokens.ts`, or an inline `style={}` fed by `slider-tokens.ts`
12. **No raw hex or rgba in components** — every color literal lives in the `@theme` block of `src/index.css` and is reached through a utility class or a constant from `design-tokens.ts` / `accent-tokens.ts`

---

## Painel de Resultados CNC (Results Panel) — Padrões Aprovados 05/04/2026

> Protótipo aprovado: `PROTOTIPO_PAINEL_CNC_v2.html`
> Implementação: `src/components/results-panel.tsx`

### Estrutura de 7 Zonas (ordem obrigatória — todas devem caber sem scroll)

```
1. Console Header Bar   (~36px)
2. Digital Display LCD  (~68px)
3. Tool Row             (~36px)
4. RPM + Avanço         (~148px)   ← dois cards lado a lado
5. Input Params         (~48px)    ← grid 4 colunas
6. Calculated Data Row  (~32px)    ← row horizontal compacta
7. HalfMoonGauges       (~170px)   ← 3 gauges lado a lado
─────────────────────────────────
Total: ~538px de ~664px disponíveis (margem de 126px)
─────────────────────────────────
8. FormulaCards         (scrollável — abaixo dos gauges)
```

### Console Header Bar
```
bg-[#0f1419] border border-white/10 rounded-lg
px-3 py-1.5 (4px grid)
Layout: [timestamp · material · operação] ─── [SafetyBadge] [★]
Timestamp: font-mono text-[11px] text-white/40
Material: text-xs font-semibold text-white
Operação: text-[11px] font-semibold text-white/70 bg-white/8 px-2 py-0.5 rounded
```

### Digital Display LCD (DigitalDisplay component)
```
bg-[#05070a] border border-primary/12 rounded-lg
p-[10px] px-3 gap-1 (flex-col)
Texto: font-mono text-[11px] uppercase tracking-[0.03em]

Estados dinâmicos:
  resultado=null → text-white/40  (sem glow)
  verde  → text-seg-verde  + textShadow: '0 0 5px rgba(46,204,113,0.3)'
  amarelo → text-seg-amarelo + textShadow: '0 0 5px rgba(243,156,18,0.3)'
  vermelho/bloqueado → text-seg-vermelho + textShadow: '0 0 5px rgba(231,76,60,0.3)'

Linha 1: ícone Material + mensagem principal (alerta ou status)
Linha 2: ícone + ação sugerida (apenas amarelo/vermelho) [text-primary]
Linha 3: info secundária — L/D · CTF · potência disponível [text-white/30 text-[10px] border-t border-white/5]

Fonte de dados: seguranca.avisos[], seguranca.razaoLD, seguranca.ctf, resultado.powerHeadroom
```

### Tool Row
```
bg-card-dark border border-white/5 rounded-lg
px-3 py-2 flex items-center gap-2
Ícone: precision_manufacturing text-primary text-xl
Label: text-[10px] text-white/40 uppercase tracking-[0.1em]
Valor: font-mono text-base font-bold text-white
Formato: "[Tipo] Ø[D] R[R] H[H] F[Z]" (raio só se toroidal/bull-nose)
```

### CompactBigNumber (RPM e Avanço)
```
bg-surface-dark backdrop-blur-xl border border-white/5 rounded-xl shadow-glass
p-3 flex-col gap-1 (grid 2 colunas, gap-2)

Header: param-label text-[10px] font-bold text-white/50 uppercase tracking-[0.12em]
        ícone text-xl opacity-60 (cor do parâmetro)
Valor:  text-4xl (36px) font-mono font-bold — cor dinâmica via semáforo
        drop-shadow(0 0 12px rgba(rgb,0.5))
Unidade: font-mono text-[11px] text-white/30

BidirectionalSlider compact (prop compact=true):
  Sem linha de "value display" (valor já exibido acima)
  Sem linha "tick labels" (−150% / 0% / +150%) visíveis mas compactas
  mt-1 interno (gap reduzido)

Cores padrão: RPM=primary(cyan) | Avanço=secondary(green)
Cores alerta: amarelo=seg-amarelo | vermelho/bloqueado=seg-vermelho
```

### Input Params Grid (Vc / fz / ap / ae)
```
grid grid-cols-4 gap-2
Cada cell: bg-card-dark border border-white/5 rounded-lg p-2
  Label: text-[10px] text-white/40 uppercase tracking-[0.08em]
  Valor: font-mono text-lg font-bold text-white
  Unidade: text-[10px] text-white/30

Fonte: store.parametros (vc, fz, ap, ae) — valores inseridos pelo operador, NÃO calculados
```

### Calculated Data Row (Potência / Torque / Vc Real / L/D / CTF)
```
flex items-center px-3 py-1.5
bg-black/30 border border-white/5 rounded-lg

Cada item: flex-1 flex justify-between px-2
  Label: text-[9px] text-white/35 uppercase tracking-[0.05em]
  Valor: font-mono text-xs font-bold text-white/85
  Unidade: text-[9px] opacity-40 ml-0.5

Dividers: w-px h-4 bg-white/8

L/D: cor dinâmica de zona
  ≤3 → text-seg-verde
  3-4 → text-seg-amarelo
  4-6 → text-seg-vermelho
  label também muda de cor para reforçar

CTF: text-primary quando > 1.0 (fator ativo)
```

### Gauges (HalfMoonGauge — sem alteração no componente)
```
grid grid-cols-3 gap-2
size="md" (240×120) → se não couber: size="sm" (160×80)
3 gauges: Eficiência de Avanço | Produtividade MRR | Saúde Ferramenta
Mesmos props e paletas atuais
REGRA: SEMPRE visíveis junto com o painel sem scroll necessário
```

---

*Last updated: 2026-04-05*
*Direction: Boldness & Clarity*
*Source: ToolOptimizer CNC existing codebase + docs/design/*
