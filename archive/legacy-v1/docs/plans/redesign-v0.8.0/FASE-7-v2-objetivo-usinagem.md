# Fase 7 — Objetivo de Usinagem (v2 — Desbloqueado)

> **Redesign Dashboard Principal v0.8.0+**
> **Status:** ⬜ Pendente
> **Versao alvo:** v0.8.1
> **Dependencia:** Fase 6 concluida
> **Complexidade:** MEDIA (~60 linhas, 7 testes)

---

## Objetivo

Implementar 3 modos de objetivo (Velocidade / Balanceado / Vida da Ferramenta) que deslocam o ponto "recomendado" de Vc e fz nos indicadores. NAO altera o motor de calculo — apenas muda onde o "verde" fica nos health bars.

**Base tecnica:** Ranges Sandvik Coromant — topo do range para velocidade, medio para balanceado, base para vida util. Pesquisa de ferramentas similares (HSMWorks, Fusion 360, Mastercam) confirmou que nenhuma usa "modos pre-definidos" — usam otimizacao dinamica. Nossa abordagem simplifica para 3 presets com multiplicadores conservadores.

---

## Infraestrutura Existente (Fase 1)

- Tipo `ObjetivoUsinagem = 'velocidade' | 'balanceado' | 'vida_util'` em `src/types/index.ts:235`
- State `objetivoUsinagem: 'balanceado'` em `machining-store.ts:126`
- Action `setObjetivoUsinagem()` em `machining-store.ts:501-504` (atualmente NAO recalcula)
- Persistido em localStorage (`partialize` inclui `objetivoUsinagem`)

---

## Multiplicadores

| Objetivo | Vc × | fz × | Efeito |
|----------|-------|-------|--------|
| `velocidade` | 1.15 | 1.10 | Topo do range — ciclo rapido, ferramenta gasta mais rapido |
| `balanceado` | 1.00 | 1.00 | Meio do range — comportamento atual (nenhuma mudanca) |
| `vida_util` | 0.80 | 0.85 | Base do range — ciclo lento, ferramenta dura muito mais |

**Nota:** Multiplicadores sao conservadores e sempre clampados dentro do vcRange do material. Nenhum valor ultrapassa os limites de seguranca absolutos.

---

## Arquivos a Modificar

| Arquivo | Acao | Tipo |
|---------|------|------|
| `src/types/index.ts` | Adicionar constante `OBJETIVO_MULTIPLIERS` | Modificar |
| `src/engine/slider-bounds.ts` | Novo param `objetivoUsinagem` em `calcularSliderBounds()`, aplicar multiplicadores ao `recomendado` de Vc e fz | Modificar |
| `src/store/machining-store.ts` | Passar `objetivoUsinagem` ao `calcularSliderBounds()` em L436. Fazer `setObjetivoUsinagem` chamar `calcular()` se resultado existe | Modificar |
| `src/components/config-panel.tsx` | Substituir placeholder por 3 botoes segmentados | Modificar |
| `src/components/parameter-health-bar.tsx` | L255: passar `objetivoUsinagem` ao `calcularSliderBounds()` | Modificar |
| `src/components/fine-tune-panel.tsx` | L48: passar `objetivoUsinagem` ao `calcularSliderBounds()` | Modificar |
| `tests/engine/slider-bounds.test.ts` | +4 testes de multiplicadores | Modificar |
| `tests/components/config-panel.test.tsx` | +3 testes de UI | Modificar |

---

## 1. Constante — `src/types/index.ts`

Adicionar apos a linha 235 (tipo `ObjetivoUsinagem`):

```typescript
/** Multipliers applied to recommended Vc/fz values per machining objective */
export const OBJETIVO_MULTIPLIERS: Record<ObjetivoUsinagem, { vc: number; fz: number }> = {
  velocidade: { vc: 1.15, fz: 1.10 },
  balanceado: { vc: 1.00, fz: 1.00 },
  vida_util: { vc: 0.80, fz: 0.85 },
};
```

---

## 2. Engine — `src/engine/slider-bounds.ts`

### 2a. Import e assinatura

```typescript
// Adicionar ao import:
import type { ObjetivoUsinagem } from '@/types';
import { OBJETIVO_MULTIPLIERS } from '@/types';

// Nova assinatura (param opcional com default):
export function calcularSliderBounds(
  material: Material | null,
  ferramenta: Ferramenta,
  tipoOp: TipoUsinagem,
  ldCritico?: number,
  objetivoUsinagem: ObjetivoUsinagem = 'balanceado',  // NEW
): SliderBounds {
```

### 2b. Aplicar multiplicadores

Apos calcular os bounds (antes do return, L39-44):

```typescript
  // Apply objective multipliers to recommended values
  const mult = OBJETIVO_MULTIPLIERS[objetivoUsinagem];
  const vcBounds = applyOverride(calcularVcBounds(material, tipoOp, recommended?.vc ?? 150), ferramenta.paramRanges?.vc);
  const fzBounds = applyOverride(calcularFzBounds(recommended?.fz ?? 0.05), ferramenta.paramRanges?.fz);

  // Shift recommended Vc within material range (clamp to bounds)
  vcBounds.recomendado = Math.min(vcBounds.max, Math.max(vcBounds.min, Math.round(vcBounds.recomendado * mult.vc)));
  // Shift recommended fz within bounds
  fzBounds.recomendado = Math.min(fzBounds.max, Math.max(fzBounds.min,
    Math.round(fzBounds.recomendado * mult.fz * 10000) / 10000));

  return {
    vc: vcBounds,
    ae: applyOverride(calcularAeBounds(D, recommended?.ae ?? D * 0.3), ferramenta.paramRanges?.ae),
    ap: applyOverride(calcularApBounds(D, tipoOp, balanco, ldCritico ?? 6, recommended?.ap ?? 1), ferramenta.paramRanges?.ap),
    fz: fzBounds,
  };
```

---

## 3. Store — `src/store/machining-store.ts`

### 3a. Passar objetivo ao calcularSliderBounds (L436)

```typescript
// Antes:
const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao);
// Depois:
const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao, undefined, objetivoUsinagem);
```

### 3b. setObjetivoUsinagem recalcula (L501-504)

```typescript
// Antes:
setObjetivoUsinagem: (objetivo) => {
  set({ objetivoUsinagem: objetivo });
},

// Depois:
setObjetivoUsinagem: (objetivo) => {
  set({ objetivoUsinagem: objetivo });
  // Recalculate health zones with new objective
  if (get().resultado) get().calcular();
},
```

---

## 4. Componentes consumidores

### 4a. `parameter-health-bar.tsx` (L255)

```typescript
// Antes:
const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao);
// Depois:
const objetivoUsinagem = useMachiningStore((s) => s.objetivoUsinagem);
const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao, undefined, objetivoUsinagem);
```

### 4b. `fine-tune-panel.tsx` (L48)

```typescript
// Antes:
const bounds = calcularSliderBounds(material ?? null, ferramenta, tipoOperacao);
// Depois:
const objetivoUsinagem = useMachiningStore((s) => s.objetivoUsinagem);
const bounds = calcularSliderBounds(material ?? null, ferramenta, tipoOperacao, undefined, objetivoUsinagem);
```

---

## 5. UI — `src/components/config-panel.tsx`

### 5a. Adicionar ao destructuring do store

```typescript
const {
  // ... existentes ...
  objetivoUsinagem, setObjetivoUsinagem,
} = useMachiningStore();
```

### 5b. Substituir placeholder por botoes

Dentro do accordion, logo abaixo de Tipo de Usinagem:

```tsx
{/* Objetivo de Usinagem */}
<div className="mb-3">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
    Objetivo
  </label>
  <div className="flex gap-1">
    {(['velocidade', 'balanceado', 'vida_util'] as const).map((obj) => (
      <button
        key={obj}
        onClick={() => setObjetivoUsinagem(obj)}
        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all border ${
          objetivoUsinagem === obj
            ? 'border-primary/50 text-primary bg-primary/10'
            : 'border-white/10 text-white/50 bg-white/5 hover:bg-white/10'
        }`}
      >
        {obj === 'velocidade' ? 'Velocidade' : obj === 'balanceado' ? 'Balanceado' : 'Vida Ferram.'}
      </button>
    ))}
  </div>
  {objetivoUsinagem !== 'balanceado' && (
    <span className="text-[10px] text-white/40 mt-1 block">
      Zonas dos indicadores ajustadas por objetivo
    </span>
  )}
</div>
```

---

## 6. Testes

### 6a. `tests/engine/slider-bounds.test.ts` (+4)

```typescript
// ─── Fase 7: Objetivo de Usinagem ──────────────────────────────────────

it('velocidade increases recommended Vc', () => {
  const balanced = calcularSliderBounds(material, ferramenta, TipoUsinagem.DESBASTE);
  const speed = calcularSliderBounds(material, ferramenta, TipoUsinagem.DESBASTE, undefined, 'velocidade');
  expect(speed.vc.recomendado).toBeGreaterThan(balanced.vc.recomendado);
});

it('vida_util decreases recommended Vc', () => {
  const balanced = calcularSliderBounds(material, ferramenta, TipoUsinagem.DESBASTE);
  const toolLife = calcularSliderBounds(material, ferramenta, TipoUsinagem.DESBASTE, undefined, 'vida_util');
  expect(toolLife.vc.recomendado).toBeLessThan(balanced.vc.recomendado);
});

it('balanceado does not change recommended values', () => {
  const noObj = calcularSliderBounds(material, ferramenta, TipoUsinagem.DESBASTE);
  const balanced = calcularSliderBounds(material, ferramenta, TipoUsinagem.DESBASTE, undefined, 'balanceado');
  expect(balanced.vc.recomendado).toBe(noObj.vc.recomendado);
  expect(balanced.fz.recomendado).toBe(noObj.fz.recomendado);
});

it('recommended Vc is clamped within bounds', () => {
  const speed = calcularSliderBounds(material, ferramenta, TipoUsinagem.DESBASTE, undefined, 'velocidade');
  expect(speed.vc.recomendado).toBeLessThanOrEqual(speed.vc.max);
  expect(speed.vc.recomendado).toBeGreaterThanOrEqual(speed.vc.min);
});
```

### 6b. `tests/components/config-panel.test.tsx` (+3)

```typescript
// ─── Fase 7: Objetivo de Usinagem UI ──────────────────────────────────

it('renders 3 objective buttons with Balanceado selected by default', () => {
  renderPanel();
  expect(screen.getByText('Velocidade')).toBeInTheDocument();
  expect(screen.getByText('Balanceado')).toBeInTheDocument();
  expect(screen.getByText('Vida Ferram.')).toBeInTheDocument();
  // Balanceado should have active styling (primary border)
  const btn = screen.getByText('Balanceado');
  expect(btn.className).toContain('border-primary');
});

it('clicking objective button updates store', () => {
  renderPanel();
  fireEvent.click(screen.getByText('Velocidade'));
  expect(useMachiningStore.getState().objetivoUsinagem).toBe('velocidade');
});

it('shows disclaimer when objective is not balanceado', () => {
  renderPanel();
  fireEvent.click(screen.getByText('Velocidade'));
  expect(screen.getByText(/ajustadas por objetivo/)).toBeInTheDocument();
});
```

---

## 7. Impacto nos Testes

| Acao | Qtd |
|------|-----|
| Testes existentes alterados | 0 (param novo e opcional com default 'balanceado') |
| Novos | +7 |

---

## 8. Criterio de Conclusao

- [ ] `OBJETIVO_MULTIPLIERS` constante criada em types
- [ ] `calcularSliderBounds()` aceita `objetivoUsinagem` e aplica multiplicadores ao `recomendado`
- [ ] `setObjetivoUsinagem()` recalcula quando `resultado !== null`
- [ ] 3 botoes segmentados na UI com Balanceado selecionado por default
- [ ] Disclaimer aparece quando objetivo != balanceado
- [ ] `parameter-health-bar.tsx` e `fine-tune-panel.tsx` passam objetivo ao bounds
- [ ] 7 testes novos passando
- [ ] `npx tsc --noEmit` — zero erros
- [ ] `npx vitest run` — todos passando
- [ ] Commit: `feat: redesign fase 7 — objetivo usinagem v0.8.1`

---

## Navegacao

← [Fase 6: Fontes + Polish + Release](./FASE-6-fontes-polish-release.md)
→ [Fase 8A: Favoritar Simulacao](./FASE-8A-favoritar-simulacao.md)
