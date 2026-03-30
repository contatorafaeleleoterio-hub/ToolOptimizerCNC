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
| 0 | `setIsCalculating(true)`, `setCalcProgress(0)`, inicia tick 60fps |
| 80 | `setGaugeTarget(1)` — gauges iniciam animação do zero |
| 200 | Contadores dos result cards começam a subir |
| 0–1500 | Tick atualiza `calcProgress` de 0→98 (`Math.min(98, ...)`) |
| 1500 | `clearInterval`, `originalSimular()`, `setCalcProgress(100)` |
| 1750 | `setIsCalculating(false)`, `setIsRevealing(true)` |
| 2300 | `setIsRevealing(false)`, `setCalcProgress(0)` |
| 2650 | `setGaugeAnimating(false)` |

> **Regra crítica:** `originalSimular()` (lógica de cálculo existente) não deve ser alterada — apenas chamada dentro de `runSimulation`.

---

## Fase 1 — Estado Inicial ("Mesa Vazia")

Comportamento antes de qualquer simulação:

- Gauges: `strokeDashoffset = totalArc` (agulha em zero, arco vazio)
- Valores numéricos dos gauges: `—` (sem animação)
- Result cards: `—` com `opacity: 0.3`
- Safety indicator: texto `AGUARDANDO SIMULAÇÃO`, dot cinza sem glow
- Botão Simular: glow idle → `animation: btnIdleGlow 2.5s ease-in-out infinite`
- Sliders e inputs: estado normal, totalmente interativos

**Ao resetar / nova configuração:** todos os estados voltam à Fase 1.

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
- `ambientOverlay`: glow radial no fundo pulsa via `animation: ambientPulse`

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
