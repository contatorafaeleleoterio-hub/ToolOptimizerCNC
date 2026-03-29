# Sessão 7 — Pós-S6 Fixes: SGB Position + Safety Factor % + Mobile Visor + History Card

## Context

S6 (v0.10.0) está commitada. Após revisão, o usuário identificou 4 problemas não cobertos pelo plano S6:

1. **SGB abaixo do slider** (errado — deve ficar ACIMA para não ser tapado pelo dedo)
2. **Fator de Segurança** — slider nativo + valor decimal (0.80) em vez de TouchSlider + %
3. **Visor mobile (results)** — layout confuso; deve ter RPM/Avanço com destaque maior, no padrão de cards com label+valor (igual ao histórico)
4. **History card** — RPM e Avanço estão pequenos/sem destaque; replicar o novo padrão do visor

---

## Gap Report: S6 Plano vs. Implementado

| Item | Plano S6 | Implementado | Status |
|------|----------|--------------|--------|
| SGB 30 seg. em mobile-fine-tune | ✅ coberto | ✅ feito | ⚠️ posição errada (abaixo) |
| HalfMoonGauge size="sm" | ✅ coberto | ✅ feito | ✅ correto |
| Contraste tokens | ✅ coberto | ✅ feito | ✅ correto |
| version 0.10.0 | ✅ coberto | ✅ feito | ✅ correto |
| Safety factor TouchSlider | ❌ não coberto | ❌ não feito | 🔴 pendente |
| Safety factor % display | ❌ não coberto | ❌ não feito | 🔴 pendente |
| Visor mobile organizado | ❌ não coberto | ❌ não feito | 🔴 pendente |
| History card destaque RPM/Avanço | ❌ não coberto | ❌ não feito | 🔴 pendente |

---

## Fix 1 — SGB acima do slider (mobile + desktop)

**Arquivos:** `src/components/mobile/mobile-fine-tune-section.tsx` + `src/components/fine-tune-panel.tsx`

### Mobile (`mobile-fine-tune-section.tsx`) — linha 308-325

**Problema atual:**
```tsx
<div className="flex items-center gap-2">  // +/slider/- row
  ...
</div>
{/* Parameter health bar — always visible below slider */}
<SegmentedGradientBar paramKey={key} segments={30} />  // ABAIXO ❌
```

**Fix:** Mover para entre header row e +/slider/- row:
```tsx
{/* header row (label + value) */}
<div className="flex justify-between items-center"> ... </div>

{/* SGB — ABOVE slider, finger doesn't cover it */}
<SegmentedGradientBar paramKey={key} segments={30} active={hasSimulated} />

{/* +/slider/- row */}
<div className="flex items-center gap-2"> ... </div>
```

### Desktop (`fine-tune-panel.tsx`) — linha 121-129

**Problema atual:**
```tsx
<StyledSlider ... />
{/* Parameter health bar — always visible below slider */}
<SegmentedGradientBar paramKey={key} />  // ABAIXO ❌
```

**Fix:** Mover para entre header row e StyledSlider:
```tsx
{/* header row (label + value) */}
<div className="flex justify-between items-end"> ... </div>

{/* SGB — ABOVE slider */}
<SegmentedGradientBar paramKey={key} active={hasSimulated} />

<StyledSlider ... />
```

Desktop também precisa de:
- `const resultado = useMachiningStore((s) => s.resultado);`
- `const hasSimulated = resultado !== null;`
- `className={`... ${!hasSimulated ? 'opacity-50' : 'opacity-100'}`}` no container externo

---

## Fix 2 + 3 — Safety Factor: TouchSlider + display %

**Arquivo:** `src/components/mobile/mobile-config-section.tsx`

### A) Slider: nativo → TouchSlider

**Problema:** `<input type="range" ...>` em linha 277 — nativo, sem design system.

**Fix:** Criar `SafetySlider` inline em mobile-config-section (mesmo padrão de TouchSlider mas simplificado — sem ticks elaborados, pois são só 11 passos de 0.5→1.0 step 0.05):

```tsx
// Inline component — same TouchSlider pattern, safety factor range
function SafetySlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  // min=0.5, max=1.0, step=0.05 — same TouchSlider touch logic
  // color: 'seg-verde', rgb: '46,204,113'
  // label: "Fator de Segurança slider"
}
```

### B) Value display: decimal → %

- `safetyFactor.toFixed(2)` → `${Math.round(safetyFactor * 100)}%`
- Helper text: `0.70 = conservador · 0.85 = agressivo` → `70% = conservador · 85% = agressivo`
- Summary string (linha 137): `SF ${safetyFactor.toFixed(2)}` → `SF ${Math.round(safetyFactor * 100)}%`

---

## Fix 4 — Mobile Results Visor (novo layout)

**Arquivo:** `src/components/mobile/mobile-results-section.tsx`

### Objetivo
Layout inspirado no history card: labels pequenos (uppercase, gray-500) acima de valores grandes (font-mono, neon). RPM e Avanço com destaque maior.

### Nova estrutura (dentro de `{storeResultado && ...}`)

```
1. SafetyBadge + Favorite          (existente — mantém)
2. [NOVO] Primary Hero card        RPM + Avanço — GRANDES, neon, 2 colunas
3. [NOVO] Parameter echo card      Vc | fz | ap | ae — 4 colunas, labeled
4. [NOVO] Calculated card          Potência | MRR | Torque | Vc Real — 4 colunas
5. BigNumber RPM (BidirectionalSlider)   (existente — mantém)
6. BigNumber Avanço (BidirectionalSlider) (existente — mantém)
7. 3 HalfMoonGauges               (existente — mantém)
8. WarningsSection                 (existente — mantém)
9. FormulaCards                   (existente — mantém)
```

### Card de destaque (item 2 — Hero)

```tsx
<div className="bg-[rgba(30,38,50,0.95)] border border-white/12 rounded-2xl p-4">
  <div className="grid grid-cols-2 gap-4">
    {/* RPM — large cyan */}
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Rotação</span>
      <span className="text-3xl font-mono font-bold text-primary" style={{ textShadow: '0 0 12px rgba(0,217,255,0.5)' }}>{fmt(rpm)}</span>
      <span className="text-[10px] text-gray-500 font-mono">RPM</span>
    </div>
    {/* Avanço — large green */}
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Avanço</span>
      <span className="text-3xl font-mono font-bold text-secondary" style={{ textShadow: '0 0 12px rgba(57,255,20,0.5)' }}>{fmt(avanco)}</span>
      <span className="text-[10px] text-gray-500 font-mono">mm/min</span>
    </div>
  </div>
</div>
```

### Card parâmetros configurados (item 3)

```tsx
<div className="bg-[rgba(30,38,50,0.95)] border border-white/12 rounded-2xl p-4">
  <div className="grid grid-cols-4 gap-2">
    <InfoCell label="VELOC. CORTE" value={parametros.vc.toFixed(0)} unit="m/min" color="text-primary" />
    <InfoCell label="AVANÇO/DENTE" value={parametros.fz.toFixed(3)} unit="mm" color="text-secondary" />
    <InfoCell label="ENG. RADIAL" value={parametros.ae.toFixed(1)} unit="mm" color="text-accent-purple" />
    <InfoCell label="PROF. AXIAL" value={parametros.ap.toFixed(1)} unit="mm" color="text-accent-orange" />
  </div>
</div>
```

### Card calculados (item 4)

```tsx
<div className="bg-[rgba(30,38,50,0.95)] border border-white/12 rounded-2xl p-4">
  <div className="grid grid-cols-4 gap-2">
    <InfoCell label="POTÊNCIA" value={potenciaMotor.toFixed(2)} unit="kW" color="text-accent-orange" />
    <InfoCell label="MRR" value={mrr.toFixed(1)} unit="cm³/min" color="text-secondary" />
    <InfoCell label="TORQUE" value={resultado.torque.toFixed(2)} unit="Nm" color="text-accent-purple" />
    <InfoCell label="Vc REAL" value={vcReal.toFixed(0)} unit="m/min" color="text-primary" />
  </div>
</div>
```

### InfoCell helper (inline no arquivo)

```tsx
function InfoCell({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
  return (
    <div className="flex flex-col gap-0.5 text-center">
      <span className="text-[8px] font-semibold text-gray-500 uppercase tracking-wide leading-tight">{label}</span>
      <span className={`text-base font-mono font-bold ${color}`}>{value}</span>
      <span className="text-[8px] text-gray-600 font-mono">{unit}</span>
    </div>
  );
}
```

### Remove: MetricCell 2×2 grid (linhas 129-136)
O `MetricCell` 2×2 existente (RPM, Avanço, Potência, Vc Real) é SUBSTITUÍDO pelas 3 novas cards (Hero + parâmetros + calculados). Os BigNumber abaixo ficam para os sliders de ajuste.

---

## Fix 5 — History Card: RPM/Avanço com mais destaque

**Arquivo:** `src/pages/history-page.tsx`

### Problema atual (linhas 331-344)
```tsx
<div className="hidden sm:flex items-center gap-6 text-right">
  <div>
    <span className="text-[10px] text-gray-500 block">RPM</span>
    <span className="text-sm font-mono text-primary font-bold">{fmt(resultado.rpm)}</span>
  </div>
  ...
</div>
```
- `hidden sm:flex` → só visível em telas > sm, e pequeno (`text-sm`)

### Fix

```tsx
{/* Key results — always visible, more prominent */}
<div className="flex items-center gap-4 text-right shrink-0">
  <div>
    <span className="text-[9px] text-gray-500 block uppercase tracking-wide">RPM</span>
    <span className="text-base font-mono text-primary font-bold leading-tight"
      style={{ textShadow: '0 0 8px rgba(0,217,255,0.4)' }}>
      {fmt(resultado.rpm)}
    </span>
  </div>
  <div>
    <span className="text-[9px] text-gray-500 block uppercase tracking-wide">Avanço</span>
    <span className="text-base font-mono text-secondary font-bold leading-tight"
      style={{ textShadow: '0 0 8px rgba(57,255,20,0.4)' }}>
      {fmt(resultado.avanco)}
    </span>
  </div>
  <div className="hidden sm:block">
    <span className="text-[9px] text-gray-500 block uppercase tracking-wide">Potência</span>
    <span className="text-base font-mono text-accent-orange font-bold leading-tight">
      {resultado.potenciaMotor.toFixed(2)}
    </span>
  </div>
</div>
```

Também adicionar **4-column labeled grid** para o summary header (só quando `!isExpanded`) para replicar o visor mobile:

```tsx
{/* Parameter echo — collapsed summary */}
{!isExpanded && (
  <div className="hidden md:grid grid-cols-4 gap-3 text-center px-2 shrink-0">
    <InfoCell label="Vc" value={parametros.vc.toFixed(0)} unit="m/min" color="text-primary" />
    <InfoCell label="fz" value={parametros.fz.toFixed(3)} unit="mm" color="text-secondary" />
    <InfoCell label="ap" value={parametros.ap.toFixed(1)} unit="mm" color="text-accent-orange" />
    <InfoCell label="ae" value={parametros.ae.toFixed(1)} unit="mm" color="text-accent-purple" />
  </div>
)}
```

Note: `InfoCell` can be defined at the top of history-page.tsx (same pattern as mobile).

---

## Fix 6 — Simulação Estilo Slot Machine (Gamification)

**Arquivos:** `src/hooks/use-simulation-animation.ts` + `src/pages/mobile-page.tsx` + `src/components/config-panel.tsx` + `src/index.css`

### Objetivo
O botão Simular hoje mostra um spinner por 450ms — muito rápido, sem clareza. Novo padrão:
- **Barra de progresso neon** preenchendo o botão de 0→100%
- **Contador `CALCULANDO 73%`** em fonte mono durante a simulação
- **Ícone de caça-níquel** (`casino` icon do Material Symbols) girando
- **Flash jackpot** ao revelar resultados — borda do hero card pisca cyan/green
- Duração aumenta 450ms → **1500ms** (visível, impactante)

### A) `use-simulation-animation.ts` — adicionar `calcProgress` + `isRevealing`

```ts
const [calcProgress, setCalcProgress] = useState(0);
const [isRevealing, setIsRevealing] = useState(false);

const runSimulation = async (originalSimular: () => void) => {
  setIsCalculating(true);
  setGaugeAnimating(true);
  setCalcProgress(0);

  const DURATION = 1500;
  const startTime = Date.now();
  const tick = setInterval(() => {
    const pct = Math.min(98, Math.round(((Date.now() - startTime) / DURATION) * 100));
    setCalcProgress(pct);
  }, 16); // 60fps

  await new Promise((resolve) => setTimeout(resolve, DURATION));
  clearInterval(tick);
  originalSimular();

  setCalcProgress(100);
  setIsCalculating(false);
  setIsRevealing(true);
  setTimeout(() => { setCalcProgress(0); setIsRevealing(false); }, 800);
  setTimeout(() => setGaugeAnimating(false), 1350);
};

return { isCalculating, calcProgress, isRevealing, triggerPulse, gaugeAnimating, safetyLevel, runSimulation };
```

### B) Button (mobile-page.tsx + config-panel.tsx) — fill bar

Substituir o botão `Simular` em ambos os arquivos:

```tsx
<button
  onClick={() => runSimulation(simular)}
  disabled={isCalculating}
  className="flex-1 min-h-[48px] rounded-xl relative overflow-hidden font-bold tracking-wide text-sm uppercase text-white active:scale-[0.97] transition-transform disabled:cursor-not-allowed"
  style={{ background: isCalculating ? 'rgba(10,20,30,0.95)' : undefined }}
>
  {!isCalculating && (
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl shadow-neon-cyan" />
  )}
  {isCalculating && (
    <div
      className="absolute inset-y-0 left-0 rounded-xl"
      style={{
        width: `${calcProgress}%`,
        background: 'linear-gradient(to right, #00D9FF, #39FF14)',
        boxShadow: '0 0 20px rgba(0,217,255,0.7)',
        transition: calcProgress === 100 ? 'width 0.1s ease' : 'width 0.05s linear',
      }}
    />
  )}
  <div className="relative z-10 flex items-center justify-center gap-2 py-3 px-4">
    {isCalculating ? (
      <>
        <span className="material-symbols-outlined text-lg animate-[spinner_0.4s_linear_infinite]">casino</span>
        <span className="font-mono">CALCULANDO {calcProgress}%</span>
      </>
    ) : (
      <>
        <span className="material-symbols-outlined text-lg">play_arrow</span>
        Simular
      </>
    )}
  </div>
</button>
```

### C) CSS (`src/index.css`) — jackpot flash keyframe

```css
@keyframes jackpotFlash {
  0%   { box-shadow: 0 0 0px transparent; }
  20%  { box-shadow: 0 0 40px rgba(0,217,255,0.9), 0 0 80px rgba(57,255,20,0.5); }
  50%  { box-shadow: 0 0 25px rgba(57,255,20,0.8), 0 0 50px rgba(0,217,255,0.4); }
  80%  { box-shadow: 0 0 15px rgba(0,217,255,0.5); }
  100% { box-shadow: 0 0 0px transparent; }
}
```

### D) Hero card (mobile-results-section.tsx) — jackpot reveal

No hero card (RPM + Avanço), aplicar a animação quando `isRevealing`:

```tsx
const { isRevealing } = useSimulationAnimation();
// ...
<div className={`bg-[rgba(30,38,50,0.95)] border border-white/12 rounded-2xl p-4 ${isRevealing ? 'animate-[jackpotFlash_0.8s_ease-out]' : ''}`}>
  {/* RPM + Avanço hero */}
</div>
```

---

## Fix 7 — "Dark Room": Painel Zerado → Tudo Acende na Simulação

### Conceito
Antes da simulação: painel apagado, sem cores, sem valores. Quando o usuário simula: **todas as luzes acendem**. Como um painel de controle industrial ligando — ou uma máquina de caça-níquel acordando.

### Estado ANTES da simulação (`resultado === null`)
| Elemento | Comportamento |
|----------|---------------|
| SegmentedGradientBar (SGB) | InactiveSeg: todos os segmentos cinza + "Simular para ativar" |
| ToolSummaryViewer | Oculto (sem material, sem ferramenta) |
| Fine-tune sliders | `opacity-50` + ponteiro normal (ainda usáveis) |
| Hero card (RPM/Avanço) | Não renderizado (já é assim) |
| Empty state placeholder | Mantém mensagem "Configure e clique Simular" |

### Estado DEPOIS da simulação (`resultado !== null`)
| Elemento | Comportamento |
|----------|---------------|
| SGB | Ativo com gradiente de cor (vermelhos/laranja/verde) |
| ToolSummaryViewer | Aparece com `animate-[fadeInUp_0.3s]` |
| Fine-tune sliders | Opacidade 100%, cores neon completas |
| Hero card | Aparece com `animate-[jackpotFlash_0.8s]` |

### A) `segmented-gradient-bar.tsx` — prop `active`

**Fix:** Adicionar prop `active?: boolean` (default: `true`) à interface:
```tsx
export interface SegmentedGradientBarProps {
  paramKey: 'vc' | 'fz' | 'ae' | 'ap';
  segments?: number;
  active?: boolean;  // NEW — quando false, forçar InactiveSeg
}
```

No `export function SegmentedGradientBar({ paramKey, segments = DEFAULT_SEGMENTS, active = true })`:
```tsx
// At the top of the function body, before any param-specific logic:
if (!active) return <InactiveSeg paramKey={paramKey} segments={segments} />;
```

### B) `mobile-fine-tune-section.tsx` + `fine-tune-panel.tsx` — ler resultado + passar `active`

```tsx
// Add to store subscriptions:
const resultado = useMachiningStore((s) => s.resultado);
const hasSimulated = resultado !== null;

// On the section container div — dim when not simulated:
<section className={`flex flex-col gap-4 px-4 transition-opacity duration-500 ${!hasSimulated ? 'opacity-50' : 'opacity-100'}`}>

// On each SGB:
<SegmentedGradientBar paramKey={key} segments={30} active={hasSimulated} />
```

### C) `mobile-results-section.tsx` — mover ToolSummaryViewer

**Fix:** Mover para dentro do bloco de resultado, com fade-in:
```tsx
{storeResultado && (() => {
  return (
    <div className="...animate-[fadeInUp_0.35s_ease-out]">
      <ToolSummaryViewer />  {/* ← moved here */}
      {/* ... hero card, grids, etc */}
    </div>
  );
})()}
```

Resultado: antes da simulação, apenas o empty state aparece (sem material, sem ferramenta).

---

## Arquivos Críticos

| Arquivo | Fix(es) |
|---------|---------|
| `src/components/mobile/mobile-fine-tune-section.tsx` | Fix 1 (SGB acima mobile) + Fix 7B (dim + active prop) |
| `src/components/fine-tune-panel.tsx` | Fix 1 (SGB acima desktop) + Fix 7B (dim + active prop) |
| `src/components/mobile/mobile-config-section.tsx` | Fix 2+3 (SafetySlider + %) |
| `src/components/mobile/mobile-results-section.tsx` | Fix 4 (visor layout) + Fix 6D (jackpot) + Fix 7C (ToolSummaryViewer) |
| `src/pages/history-page.tsx` | Fix 5 (RPM/Avanço destaque + grid) |
| `src/hooks/use-simulation-animation.ts` | Fix 6A (calcProgress + isRevealing + 1500ms) |
| `src/pages/mobile-page.tsx` | Fix 6B (fill bar button) |
| `src/components/config-panel.tsx` | Fix 6B (fill bar button desktop) |
| `src/index.css` | Fix 6C (jackpotFlash keyframe) |
| `src/components/segmented-gradient-bar.tsx` | Fix 7A (prop `active`) |

---

## Ordem de Execução

1. **Fix 7A** — segmented-gradient-bar: prop `active` (base para Fix 1 e 7B)
2. **Fix 1** — mobile-fine-tune-section + fine-tune-panel: SGB acima do slider
3. **Fix 7B** — mobile-fine-tune-section + fine-tune-panel: `active={!!resultado}` + dim opacity
4. **Fix 2+3** — mobile-config-section: SafetySlider + %
5. **Fix 4** — mobile-results-section: InfoCell + Hero card + param/calc grids
6. **Fix 7C** — mobile-results-section: ToolSummaryViewer só quando resultado
7. **Fix 5** — history-page: InfoCell + RPM/Avanço `text-base` + grid param echo
8. **Fix 6A** — use-simulation-animation: calcProgress + isRevealing + 1500ms
9. **Fix 6B** — mobile-page + config-panel: fill bar button
10. **Fix 6C** — index.css: jackpotFlash keyframe
11. **Fix 6D** — mobile-results-section: jackpot flash no hero card
12. `npm run test` → todos passando
13. `npm run build` → zero erros
14. Commit: `feat(mobile): slot machine simulate + dark room state + visor mirror layout`

---

## Verificação

- [ ] SGB aparece ACIMA do slider (não abaixo) em mobile + desktop
- [ ] Antes de simular: SGB mostra cinza + "Simular para ativar" em todos os parâmetros
- [ ] Antes de simular: fine-tune section em `opacity-50`
- [ ] Antes de simular: ToolSummaryViewer não aparece (sem material, sem ferramenta)
- [ ] Fator segurança: TouchSlider + mostra `80%`
- [ ] Summary accordion: `SF 80%`
- [ ] Botão Simular: barra neon cyan→green preenche 0→100% em 1.5s
- [ ] Botão mostra `CALCULANDO 73%` com ícone casino girando
- [ ] Após simulação: todas as "luzes acendem" — SGB ativa, opacity-100, ToolSummaryViewer aparece
- [ ] Hero card pisca com jackpotFlash (cyan/green glow)
- [ ] Visor: RPM e Avanço em `text-3xl` neon
- [ ] Visor: grid 4-col parâmetros + grid 4-col calculados
- [ ] History: RPM/Avanço `text-base` com glow sempre visíveis
- [ ] History: grid paramétrico visível em md+
- [ ] Desktop: botão Simular também tem fill bar (config-panel.tsx)
- [ ] `npm run test` → todos os testes passam
- [ ] `npm run build` → zero erros
