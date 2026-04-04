# ITEM #9 — Atualização 5.1: Simulação Estilo Cassino

**Status:** ✅ APROVADO (30/03/2026)
**Sessão:** Revisão iterativa 30/03 — terceira parte
**Prioridade de implementação:** Última (após todos os outros itens aprovados)

---

## O quê / Onde / Impacto

- **O quê:** Transformar a experiência de simulação em sequência cinematográfica gamificada — 4 fases sequenciais (Mesa Vazia → Ignição → Cálculo → Revelação) inspiradas em cassino, sem alterar a lógica de cálculo
- **Onde:** Hook de animação + botão Simular (desktop e mobile) + gauges + result cards + safety indicator
- **Impacto visual:** Toda a interação de simulação ganha feedback visual progressivo com partículas, contadores, glow, bounce nos gauges e jackpot reveal

---

## Arquivos a Modificar

| Arquivo | Tipo de alteração |
|---------|-------------------|
| `src/hooks/use-simulation-animation.ts` | Extensão — novos estados + fluxo `runSimulation` |
| `src/components/config-panel.tsx` | Substituição do botão Simular (desktop) |
| `src/pages/mobile-page.tsx` | Substituição do botão Simular (mobile) |
| Componente gauge (⚠️ mapear nome real) | Animação progressiva via `requestAnimationFrame` |
| Componente result card (⚠️ mapear nome real) | Contador animado + reveal por cor |
| Componente safety indicator (⚠️ mapear nome real) | Reveal atrasado com glow |
| `src/index.css` | Novos keyframes e classes de animação |

> ⚠️ **Antes de implementar:** mapear nomes reais dos componentes de gauge, result card e safety indicator no codebase — os nomes acima são referências funcionais.

---

## Novos Estados no Hook `use-simulation-animation.ts`

```ts
const [calcProgress, setCalcProgress] = useState(0);       // 0–100
const [isRevealing, setIsRevealing] = useState(false);     // fase de jackpot
const [gaugeTarget, setGaugeTarget] = useState<number>(0); // dispara animação dos gauges
```

**Retorno do hook:**
```ts
{ isCalculating, calcProgress, isRevealing, gaugeTarget, triggerPulse, gaugeAnimating, safetyLevel, runSimulation }
```

**Fluxo `runSimulation` (timeline):**

| t (ms) | Ação |
|--------|------|
| 0 | `setIsCalculating(true)`, `setCalcProgress(0)`, `setGaugeAnimating(true)` |
| 80 | `setGaugeTarget(1)` — gauges iniciam animação do zero |
| 80 | `setInterval` inicia — `calcProgress` sobe 0→98 até t=1500ms |
| 1500 | `clearInterval`, `originalSimular()`, `setCalcProgress(100)` |
| 1750 | `setIsCalculating(false)`, `setIsRevealing(true)`, `setTriggerPulse(true)` |
| 2300 | `setIsRevealing(false)`, `setTriggerPulse(false)`, `setCalcProgress(0)` |
| 2650 | `setGaugeAnimating(false)`, `setGaugeTarget(0)` |

> **Regra crítica:** `originalSimular()` (lógica de cálculo existente) não deve ser alterada — apenas chamada dentro de `runSimulation`.

---

## Fase 1 — Estado Inicial ("Mesa Vazia")

> **Nota de auditoria:** "Mesa Vazia" = estado de `storeResultado === null` do ResultsPanel existente. O placeholder já exibe mensagem "Clique em Simular". NÃO é necessário criar estado idle nos cards (`opacity: 0.3`) — os cards simplesmente não existem no DOM quando `resultado === null`.

Comportamento antes de qualquer simulação:

- **ResultsPanel/MobileResultsSection:** exibe placeholder existente (guard `storeResultado === null`)
- Gauges, result cards, safety indicator: **não renderizados** (estão dentro do guard)
- Botão Simular: glow idle → `animation: btnIdleGlow 2.5s ease-in-out infinite`
- Sliders e inputs: estado normal, totalmente interativos

**Ao resetar / nova configuração:** store zera `resultado = null` → placeholder reaparece automaticamente.

---

## Fase 2 — Ignição (0–200ms)

Ao clicar em Simular:

1. Sliders recebem classe `shake` por 200ms (keyframe: `translateX -3px → +3px → 0`) e ficam `pointer-events: none` + `opacity: 0.5` durante toda a simulação
2. Bordas dos gauge cards acendem simultaneamente via classe `active`: `border-color → rgba(0,217,255,0.5)`, `box-shadow: 0 0 20px rgba(0,217,255,0.1)`
3. Botão: `btn-bg` → `opacity: 0`, glow idle some, `btn-progress` aparece com `width: 0%`

---

## Fase 3 — Cálculo (200ms–1500ms)

**Botão:**
- `btn-progress`: `div` absolutamente posicionada (`inset-y: 0, left: 0`), `width` cresce de 0→100% via `calcProgress`
- Gradiente: `linear-gradient(to right, #00D9FF, #39FF14)` com `box-shadow: 0 0 20px rgba(0,217,255,0.7)`
- Conteúdo: ícone `casino` (Material Symbols) com `animation: spinIcon 0.35s linear infinite` + texto `CALCULANDO {calcProgress}%` em `font-family: monospace`

**Gauges — animação progressiva:**
- Animação via `requestAnimationFrame` (não CSS transition)
- Easing: `easeOutBack` — sobe rápido, desacelera nos últimos 20%, ultrapassa ligeiramente e volta (bounce sutil)
- `strokeDashoffset` cai de `totalArc → totalArc * (1 - ratio)`
- Agulha rotaciona de `-90deg → +90deg` mapeando 0→máximo
- Valor numérico dentro do gauge conta sincronizado com o arco via `requestAnimationFrame`
- Se `ratio > 0.8`: stroke do arco e agulha mudam para `var(--amber)`

**Result Cards — contadores:**
- Contagem `0 → valorFinal` via `requestAnimationFrame` com `easeOutCubic`
- Duração: `DURATION * 0.9` (termina ligeiramente antes do reveal)
- Formato numérico mantido durante contagem (ex: `0.0 → 68.9` para MRR)

**Ambiente:**
- Canvas de partículas ativo: 30 partículas neon (cyan e verde), `radius: 0.5–2.5px`, velocidade variada, subindo pelo fundo
- `ambientOverlay`: glow radial no fundo pulsa via `animation: ambientPulse` — **Localização:** `div` absolute dentro do `ConfigPanel`, antes do restante do JSX, com `pointer-events: none` e `z-0`:
  ```tsx
  {isCalculating && (
    <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(0,217,255,0.04) 0%, transparent 70%)',
        animation: 'ambientPulse 1.5s ease-in-out infinite',
      }} />
  )}
  ```

---

## Fase 4 — Revelação / Jackpot (1500ms–2300ms)

Sequência com delays:

| +ms | Ação |
|-----|------|
| +0 | Gauges travam no valor final |
| +0 | Result cards: scale `0.8→1.0` em 200ms |
| +50 | `cardMrr` recebe classe `jackpot` → `jackpotFlash` |
| +300 | `valMrr` muda para `var(--green)` |
| +600 | Safety card recebe classe `safe`: borda verde, dot verde com glow, texto `PARÂMETROS SEGUROS ✓` |
| +800 | Partículas e ambientOverlay retornam ao estado base |
| +1000 | Botão restaurado: `▶ SIMULAR`, progress → 0, idle glow retorna |
| +1000 | Sliders reabilitados |
| +1000 | Botão histórico aparece com rodada anterior |

---

## Lógica de Cor dos Result Cards

Após reveal, cor do valor reflete qualidade:

| Condição | Classe CSS | Cor |
|----------|-----------|-----|
| Resultado dentro do ideal | `good` | `var(--green)` + glow verde |
| Resultado em atenção | `warn` | `var(--amber)` + glow âmbar |
| Resultado no limite | `danger` | `var(--red)` + glow vermelho |
| Estado inicial / calculando | — | `opacity: 0.3`, cor neutra |

> Lógica de classificação usa os thresholds existentes no `safetyLevel` do sistema.

---

## Histórico de Rodadas

- Após cada simulação: salvar `{ rpm, feed, mrr }` em estado local
- Exibir rodada anterior como chip compacto abaixo do safety card
- Formato: `RPM 3183 · FEED 636mm/min · MRR 68.9cm³/min`
- Estilo: `font-family: monospace`, `font-size: 10px`, `opacity: 0.45`, borda sutil cyan
- Máximo de **1 rodada anterior** visível (referência imediata, não histórico completo)

---

## Novos Keyframes CSS (`src/index.css`)

```css
@keyframes btnIdleGlow { /* glow pulsante no botão em espera */ }
@keyframes jackpotFlash {
  0%   { box-shadow: 0 0 0px transparent; }
  20%  { box-shadow: 0 0 40px rgba(0,217,255,0.9), 0 0 80px rgba(57,255,20,0.5); }
  50%  { box-shadow: 0 0 25px rgba(57,255,20,0.8), 0 0 50px rgba(0,217,255,0.4); }
  80%  { box-shadow: 0 0 15px rgba(0,217,255,0.5); }
  100% { box-shadow: 0 0 0px transparent; }
}
@keyframes ambientPulse { /* glow global do fundo durante simulação */ }
@keyframes sliderShake {  /* micro-vibração dos sliders ao iniciar */ }
@keyframes spinIcon {     /* rotação do ícone casino durante cálculo */ }
```

---

## Restrições e Critérios de Aceitação

1. `originalSimular()` não deve ser alterada — apenas encapsulada dentro de `runSimulation`
2. Gauges usam `requestAnimationFrame`; elementos estáticos usam CSS keyframes
3. Cleanup obrigatório: `clearInterval` e `cancelAnimationFrame` ao desmontar componente
4. Funciona identicamente em `mobile-page.tsx` e `config-panel.tsx`
5. Após reset / nova configuração: todos os estados voltam ao estado inicial (Fase 1)

---

## Dependências de Implementação

Este item deve ser implementado **por último** (após todos os outros 6 itens aprovados):

- Depende do visor desktop refatorado (1.1) — estrutura dos result cards
- Depende do visor mobile refatorado (4.1) — estrutura mobile dos cards/gauges
- É o item de maior complexidade — estrutura deve estar estável antes de animar

---

## Mapeamento de Componentes Reais

> Nomes referenciados neste documento → componentes reais no codebase:

| Referência neste doc | Componente real | Arquivo |
|---------------------|----------------|---------|
| gauge | `HalfMoonGauge` | `src/components/half-moon-gauge.tsx` |
| result card (grande) | `BigNumber` | `src/components/shared-result-parts.tsx` |
| result card (pequeno) | `ProgressCard` | `src/components/shared-result-parts.tsx` |
| safety indicator | `SafetyBadge` | `src/components/shared-result-parts.tsx` |
| botão Simular (desktop) | botão em `ConfigPanel` | `src/components/config-panel.tsx` |
| botão Simular (mobile) | botão em `MobilePage` | `src/pages/mobile-page.tsx` |
| hook de animação | `useSimulationAnimation` | `src/hooks/use-simulation-animation.ts` |

---

## Mapeamento Técnico do Codebase

### Componentes Envolvidos

| Componente | Arquivo | Linhas | Props/Interface | Papel na animação |
|------------|---------|--------|-----------------|-------------------|
| `useSimulationAnimation` | `src/hooks/use-simulation-animation.ts` | 1-45 | Hook (sem props) | **EXTENSÃO** — novos estados + timeline |
| `HalfMoonGauge` | `src/components/half-moon-gauge.tsx` | 56-185 | `{ value, maxValue, label?, palette?, badge?, size?, animateOnMount? }` — **Nova prop `animateOnMount?: boolean`:** quando `true`, gauge anima de 0 → `value` via rAF interno; quando `false`/omitido, exibe `value` estático. Palettes: `'avanco' \| 'power' \| 'health' \| 'mrr'` | Animação progressiva do arco + needle |
| `BigNumber` | `src/components/shared-result-parts.tsx` | 51-92 | `BigNumberProps` | Contador animado 0 → valorFinal |
| `ProgressCard` | `src/components/shared-result-parts.tsx` | 94-109 | `{ label, value, unit, pct, barColor, barShadow, compact? }` | Contador animado |
| `SafetyBadge` | `src/components/shared-result-parts.tsx` | 111-121 | `{ nivel, avisosCount }` | Reveal atrasado com glow |
| Botão Simular desktop | `src/components/config-panel.tsx` | ~123-129 | Inline no `handleSimulate` | Progress bar + ícone casino |
| Botão Simular mobile | `src/pages/mobile-page.tsx` | 12-35 | `MobileStickyActions` | Mesmo comportamento |
| CSS keyframes | `src/index.css` | 34-73 | — | Novos keyframes a adicionar |

### Hook Atual (use-simulation-animation.ts — 45 linhas)

```ts
export function useSimulationAnimation() {
  const [isCalculating, setIsCalculating] = useState(false);      // loading state
  const [triggerPulse, setTriggerPulse] = useState(false);        // safety badge pulse
  const [gaugeAnimating, setGaugeAnimating] = useState(false);    // gauge scale animation

  const safetyLevel = useMachiningStore((s) => s.resultado?.seguranca.nivel);

  // runSimulation: loading 450ms → originalSimular() → gauge 1350ms
  const runSimulation = async (originalSimular: () => void) => {
    setIsCalculating(true);
    setGaugeAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    originalSimular();
    setIsCalculating(false);
    setTimeout(() => setGaugeAnimating(false), 1350);
  };

  return { isCalculating, triggerPulse, gaugeAnimating, safetyLevel, runSimulation };
}
```

### HalfMoonGauge — SVG Arc (half-moon-gauge.tsx)

```ts
// 41 bars: 8 RED · 8 ORANGE · 9 GREEN · 8 ORANGE · 8 RED
// Arc: -90° a +90° (180° total)
// Needle: rotates via transform `rotate(${angle}deg)`
// Size presets:
//   md: { width: 240, height: 120, needleH: 90 }
//   sm: { width: 160, height: 80,  needleH: 60 }
// Usa useSimulationAnimation().gaugeAnimating para scale animation (L63)
```

### Keyframes CSS Existentes (src/index.css:34-73)

| Keyframe | Linhas | Descrição |
|----------|--------|-----------|
| `shimmer` | 34-37 | opacity 0.5→1 |
| `spinner` | 40-42 | rotate 360° |
| `fadeInUp` | 44-53 | opacity 0→1, translateY 10→0 |
| `subtlePulse` | 55-58 | scale 1→1.02, opacity 1→0.95 |
| `gaugeRoll` | 60-63 | rotate 0→1440° (4 voltas) |
| `fadeOut` | 65-68 | opacity 1→0.3 |
| `dashFlow` | 70-73 | stroke-dashoffset animation |

### Novos Keyframes Necessários

| Keyframe | Descrição | Timing |
|----------|-----------|--------|
| `btnIdleGlow` | Glow pulsante no botão Simular em espera | 2.5s infinite |
| `jackpotFlash` | Flash de luz nos result cards no reveal | 0.6s once |
| `ambientPulse` | Glow radial no fundo durante simulação | 1.5s infinite |
| `sliderShake` | Micro-vibração dos sliders ao iniciar | 0.2s once |
| `spinIcon` | Rotação do ícone casino durante cálculo | 0.35s linear infinite |

---

## Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/hooks/use-simulation-animation.ts` | **Extensão** — novos estados + timeline `runSimulation` reescrito | L1-45 (reescrita completa) |
| `src/components/config-panel.tsx` | Botão Simular com progress bar + ícone casino | L123-129 (handleSimulate + JSX do botão) |
| `src/pages/mobile-page.tsx` | Botão Simular mobile com progress bar | L12-35 (MobileStickyActions) |
| `src/components/half-moon-gauge.tsx` | Suporte a animação progressiva via rAF | L56-185 |
| `src/components/shared-result-parts.tsx` | Contadores animados em BigNumber e ProgressCard | L51-109 |
| `src/index.css` | Adicionar 5 novos keyframes | Após L73 |

### Sequência de Execução

1. **Adicionar keyframes CSS** (`btnIdleGlow`, `jackpotFlash`, `ambientPulse`, `sliderShake`, `spinIcon`) em `index.css`
2. **Estender hook** `useSimulationAnimation`:
   - Novos estados: `calcProgress` (0-100), `isRevealing` (boolean), `gaugeTarget` (number)
   - Reescrever `runSimulation` com timeline completa (0ms → 2650ms)
   - Manter `originalSimular()` intocada — chamada em t=1500ms
   - Retornar: `{ isCalculating, calcProgress, isRevealing, gaugeTarget, triggerPulse, gaugeAnimating, safetyLevel, runSimulation }`
3. **Fase 1 (Mesa Vazia):** Estado idle dos componentes — gauges zerados, cards `—`, botão com `btnIdleGlow`
4. **Fase 2 (Ignição, 0-200ms):** Sliders `pointer-events: none` + `opacity: 0.5` + `sliderShake`; bordas gauge cards acendem
5. **Fase 3 (Cálculo, 200-1500ms):** Progress bar no botão (`calcProgress` 0→98), contadores subindo via `requestAnimationFrame`, gauges animando
6. **Fase 4 (Revelação, 1500-2300ms):** `jackpotFlash` nos cards, safety badge reveal, partículas fade out
7. **Integrar no botão Simular desktop** (config-panel.tsx):
   - Progress bar interna (`div absolute, width: ${calcProgress}%`)
   - Ícone `casino` (Material Symbols) com `spinIcon` durante cálculo
   - Texto: `CALCULANDO ${calcProgress}%` (font-mono)
8. **Integrar no botão Simular mobile** (mobile-page.tsx): Mesma lógica
9. **Cleanup:** `cancelAnimationFrame` + `clearInterval` no `useEffect` return

### Dependências

- **Depende de:** ITEM-1 (visor desktop), ITEM-8 (visor mobile) — estrutura dos cards/gauges deve estar estável
- **Bloqueia:** nenhum item (é o **último** da sequência)

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| `requestAnimationFrame` leak se componente desmontar durante animação | Cleanup obrigatório: `cancelAnimationFrame(rafId)` no return do useEffect |
| `setInterval` para calcProgress pode acumular se simular múltiplas vezes | `clearInterval` antes de iniciar novo, usar flag `isCalculating` como guard |
| `pointer-events: none` nos sliders durante simulação conflita com touch events mobile | Aplicar apenas durante Fase 2-3 (restaurar em Fase 4) |
| Material Symbols `casino` pode não estar no subset carregado | Verificar se o ícone `casino` está disponível no MaterialSymbols CDN já importado |
| Gauges via `requestAnimationFrame` com easing `easeOutBack` — fórmula precisa estar correta | Usar fórmula: `(t) => { const s = t - 1; return 1 + s * s * (2.70158 * s + 1.70158); }` — sem mutação de parâmetro |
| Complexidade alta — maior chance de bugs | Implementar fase por fase, testar cada uma isoladamente |

### Critérios de Aceitação

- 4 fases sequenciais com timing correto (0ms → 200ms → 1500ms → 2300ms → 2650ms)
- `originalSimular()` não alterada — apenas encapsulada em t=1500ms
- Funciona identicamente em desktop e mobile
- Cleanup ao desmontar (sem memory leaks — rAF + setInterval limpos)
- Após reset / nova configuração: volta ao estado "mesa vazia" (Fase 1)
- Lógica de cálculo produz resultado idêntico ao sem animação

### Testes

| Teste | Descrição |
|-------|-----------|
| `transitions through 4 phases` | Estados mudam: idle → igniting → calculating → revealing → idle |
| `calcProgress increments 0 to 100` | Progresso sobe monotonicamente |
| `originalSimular called at t=1500ms` | Resultado calculado apenas uma vez |
| `result unchanged with animation` | Resultado idêntico ao sem animação cassino |
| `cleanup on unmount` | rAF cancelado, interval limpo, sem warnings |
| `idle state restored after reset` | Gauges zerados, cards `—`, botão com glow |
| `sliders disabled during animation` | `pointer-events: none` durante Fase 2-3 |
| `sliders re-enabled after reveal` | `pointer-events` restaurado em Fase 4 |

---

## Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Keyframes CSS (5 novos) | 2 |
| Reescrever hook (timeline + estados) | 5 |
| Botão Simular desktop (progress bar + ícone) | 3 |
| Botão Simular mobile | 2 |
| Gauges: animação rAF com easing | 4 |
| Contadores animados BigNumber/ProgressCard | 3 |
| Cleanup + edge cases | 2 |
| Testes (8 casos) | 3 |
| **Total** | **24 pontos (~3 sessões)** |

> **Maior item do conjunto.** Dividido em 3 sub-sessões:

### Sub-sessões recomendadas (3 sessões)

| Sessão | Escopo | Pts |
|--------|--------|-----|
| **A** | Keyframes CSS (5) + hook `useSimulationAnimation` reescrito + botão Simular desktop | ~8 |
| **B** | Botão Simular mobile + `HalfMoonGauge` animação rAF (`animateOnMount`) | ~8 |
| **C** | Fase 4 reveal (`jackpotFlash`, contadores BigNumber) + cleanup rAF/interval + testes (8 casos) | ~8 |

---

## Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando
npm run build       # Build sem erros
# Verificar: nenhum rAF/interval leak (React DevTools profiler)
# Verificar: resultado idêntico com e sem animação
```

---

## REFINAMENTO FINAL (31/03/2026)

### Decisões Resolvidas

| Decisão | Resolução |
|---------|-----------|
| Partículas: canvas real ou CSS-only? | **CSS-only** — partículas via `::before`/pseudo-elements com `@keyframes` de translateY e opacity. Evita gestão de canvas + API mais simples de testar. Se efeito parecer fraco, pode ser promovido para canvas em iteração futura. |
| Ícone `casino` Material Symbols | Verificar disponibilidade: `document.querySelector('span.material-symbols-outlined')` no browser. Se não disponível, usar `casino` ou fallback para `settings` (gear). |
| Easing `easeOutBack` | Fórmula inline: `(t: number) => { const s = t - 1; return 1 + s * s * (2.70158 * s + 1.70158); }` |

### Imports Adicionais

**`src/hooks/use-simulation-animation.ts`**:
```ts
import { useState, useRef, useCallback, useEffect } from 'react';
// useMachiningStore já importado
```

**`src/components/config-panel.tsx`** — nenhum import novo (hook já importado)

**`src/index.css`** — 5 novos `@keyframes` adicionados após L73

### Código Proposto — `use-simulation-animation.ts` Reescrito (Depois)

```ts
export function useSimulationAnimation() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcProgress, setCalcProgress]   = useState(0);      // 0–100
  const [isRevealing, setIsRevealing]     = useState(false);
  const [gaugeTarget, setGaugeTarget]     = useState(0);
  const [triggerPulse, setTriggerPulse]   = useState(false);
  const [gaugeAnimating, setGaugeAnimating] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const safetyLevel = useMachiningStore((s) => s.resultado?.seguranca.nivel);

  const clearProgress = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => () => clearProgress(), [clearProgress]);

  const runSimulation = useCallback(async (originalSimular: () => void) => {
    if (isCalculating) return;           // guard contra double-click

    setIsCalculating(true);
    setCalcProgress(0);
    setGaugeAnimating(true);

    // t=80ms — gauges começam animação
    await new Promise((r) => setTimeout(r, 80));
    setGaugeTarget(1);

    // t=200ms–1500ms — progress bar sobe até 98%
    const start = performance.now();
    const DURATION = 1300;
    clearProgress();
    intervalRef.current = setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(98, (elapsed / DURATION) * 98);
      setCalcProgress(Math.round(pct));
      if (elapsed >= DURATION) clearProgress();
    }, 16);

    // t=1500ms — calcular resultado real
    await new Promise((r) => setTimeout(r, 1500));
    clearProgress();
    originalSimular();
    setCalcProgress(100);

    // t=1750ms — entrar em reveal
    await new Promise((r) => setTimeout(r, 250));
    setIsCalculating(false);
    setIsRevealing(true);
    setTriggerPulse(true);

    // t=2300ms — encerrar reveal
    await new Promise((r) => setTimeout(r, 550));
    setIsRevealing(false);
    setTriggerPulse(false);
    setCalcProgress(0);

    // t=2650ms — gauges param animação
    await new Promise((r) => setTimeout(r, 350));
    setGaugeAnimating(false);
    setGaugeTarget(0);
  }, [isCalculating, clearProgress]);

  return {
    isCalculating, calcProgress, isRevealing, gaugeTarget,
    triggerPulse, gaugeAnimating, safetyLevel, runSimulation,
  };
}
```

### Código Proposto — Botão Simular em `config-panel.tsx` (Depois)

```tsx
// O botão Simular usa os valores do hook:
const { isCalculating, calcProgress, runSimulation } = useSimulationAnimation();

<button
  onClick={() => runSimulation(simular)}
  disabled={isCalculating}
  className="relative w-full overflow-hidden rounded-xl py-3 font-bold text-sm
             uppercase tracking-widest transition-all active:scale-[0.98]
             disabled:cursor-not-allowed"
  style={{
    background: isCalculating ? 'transparent' : 'rgba(0,217,255,0.15)',
    border: isCalculating ? '1px solid rgba(0,217,255,0.3)' : '1px solid rgba(0,217,255,0.4)',
    animation: !isCalculating ? 'btnIdleGlow 2.5s ease-in-out infinite' : 'none',
  }}
>
  {/* Progress bar interna */}
  {isCalculating && (
    <div
      className="absolute inset-y-0 left-0 transition-none"
      style={{
        width: `${calcProgress}%`,
        background: 'linear-gradient(to right, #00D9FF, #39FF14)',
        boxShadow: '0 0 20px rgba(0,217,255,0.7)',
      }}
    />
  )}
  {/* Conteúdo do botão */}
  <span className="relative z-10 flex items-center justify-center gap-2">
    {isCalculating ? (
      <>
        <span className="material-symbols-outlined" style={{ animation: 'spinIcon 0.35s linear infinite' }}>
          casino
        </span>
        <span className="font-mono">CALCULANDO {calcProgress}%</span>
      </>
    ) : (
      <>
        <span className="material-symbols-outlined text-base">play_arrow</span>
        SIMULAR
      </>
    )}
  </span>
</button>
```

### Novos Keyframes CSS (`src/index.css` — adicionar após L73)

```css
@keyframes btnIdleGlow {
  0%, 100% { box-shadow: 0 0 8px rgba(0,217,255,0.3); }
  50%       { box-shadow: 0 0 20px rgba(0,217,255,0.6), 0 0 40px rgba(0,217,255,0.2); }
}
@keyframes jackpotFlash {
  0%   { box-shadow: 0 0 0px transparent; }
  20%  { box-shadow: 0 0 40px rgba(0,217,255,0.9), 0 0 80px rgba(57,255,20,0.5); }
  50%  { box-shadow: 0 0 25px rgba(57,255,20,0.8), 0 0 50px rgba(0,217,255,0.4); }
  80%  { box-shadow: 0 0 15px rgba(0,217,255,0.5); }
  100% { box-shadow: 0 0 0px transparent; }
}
@keyframes ambientPulse {
  0%, 100% { opacity: 0; }
  50%       { opacity: 0.06; }
}
@keyframes sliderShake {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-3px); }
  75%       { transform: translateX(3px); }
}
@keyframes spinIcon {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Partículas neon CSS-only — pseudo-elements com translateY */
.particle-field {
  position: relative;
  overflow: hidden;
}
.particle-field::before,
.particle-field::after {
  content: '';
  position: absolute;
  width: 2px; height: 2px;
  border-radius: 50%;
  background: #00D9FF;
  animation: particleRise 2s ease-in infinite;
}
.particle-field::before { left: 20%; animation-delay: 0.3s; background: #39FF14; }
.particle-field::after  { left: 70%; animation-delay: 0.8s; }

@keyframes particleRise {
  0%   { opacity: 0; transform: translateY(0) scale(0.5); }
  20%  { opacity: 0.8; }
  100% { opacity: 0; transform: translateY(-80px) scale(1.5); }
}
/* Nota: efeito sutil — se parecer fraco, pode ser removido sem impacto funcional. */
```

### Testes — Nomes Exatos (describe/it)

```ts
describe('useSimulationAnimation', () => {
  it('starts in idle state (isCalculating false, calcProgress 0)', ...)
  it('sets isCalculating true immediately on runSimulation', ...)
  it('calcProgress increments from 0 to 100', ...)
  it('calls originalSimular exactly once at ~1500ms', ...)
  it('sets isRevealing true after simular completes', ...)
  it('returns to idle state after full sequence', ...)
  it('cancels interval on unmount (no memory leak)', ...)
  it('guards against double-click (isCalculating blocks second call)', ...)
})

describe('ConfigPanel — botão Simular cassino', () => {
  it('shows progress bar when isCalculating', ...)
  it('shows CALCULANDO {pct}% text during calculation', ...)
  it('restores SIMULAR text after sequence completes', ...)
  it('sliders have pointer-events-none during calculation', ...)
})
```
