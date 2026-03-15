# PLANO DE IMPLEMENTAÇÃO — Slider Bounds Dinâmicos (Story S7)

**Projeto:** ToolOptimizer CNC (Fênix) v0.4.0 → v0.4.1  
**Data:** 03/03/2026  
**Executor:** Claude Code Desktop  
**Validação técnica:** Auditoria interna + Validação externa (Grok) contra catálogos Sandvik, Kennametal, Mitsubishi, Seco, Walter  

---

## 1. Problema

O bloco "Ajuste Fino" usa `SLIDER_CONFIG` hardcoded com ranges fixos que não refletem a realidade das fábricas brasileiras de moldes. Os ranges estão duplicados identicamente em dois arquivos.

**Evidência auditada e validada externamente:**

| Param | Hardcoded | Range Real na Indústria | Status Validação |
|---|---|---|---|
| Vc | 1–1200 m/min | 60–350 (aços); até 1000 (alumínio) | ✅ Validado (Sandvik, Kennametal) |
| ae | 0.1–50 mm | 0.1 até D (diâmetro) — ae > D é impossível | ✅ Validado (Sandvik, Kennametal) |
| ap | 0.05–6 mm | 0.05 até 0.8×D (desbaste); **acabamento toroidal: 0.1–0.5mm fixo** | ⚠️ Parcialmente válido — ap acabamento NÃO é proporcional a D |
| fz | 0.01–1 mm/dente | 0.002–0.300 | ✅ Validado (Mitsubishi, Kennametal) |

---

## 2. Decisões Técnicas e Racional

### 2.1 Por que ranges dinâmicos?

Ranges fixos tornam o slider inutilizável: quando o range real é 150–280 m/min (P20 desbaste), um slider de 1–1200 faz o range útil ocupar apenas 11% do percurso. O operador não consegue ajustar com precisão.

**Decisão:** Os ranges devem ser calculados a partir do contexto (material + ferramenta + operação) usando dados que já existem no sistema.

### 2.2 Janela ±30% no Vc

Os `vcRanges` do material definem o range "ideal". Mas o operador pode querer explorar valores ligeiramente fora — por exemplo, testar Vc abaixo do mínimo em máquina com pouca rigidez, ou acima do máximo com refrigeração abundante.

**Decisão:** Aplicar janela de ±30% ao redor do vcRange do material. Isso dá espaço sem abrir para valores absurdos.

**Exemplo — P20 Desbaste (vcRange = [150, 200]):**
- min = 150 × 0.7 = **105** m/min
- max = 200 × 1.3 = **260** m/min
- recomendado = valor retornado por `getRecommendedParams()` (interpolado da tabela por diâmetro)

**Exemplo — H13 Acabamento (vcRange = [100, 150]):**
- min = 100 × 0.7 = **70** m/min
- max = 150 × 1.3 = **195** m/min

**Fallback (sem material selecionado):** min=30, max=350. Cobre aços + inox sem incluir alumínio extremo.

### 2.3 ae limitado ao diâmetro (ae ≤ D)

Engajamento radial maior que o diâmetro da fresa é fisicamente impossível — validado por Sandvik e Kennametal. Mesmo em slot (canal), ae = D é o máximo.

**Decisão:** `ae.max = ferramenta.diametro`. Sem exceções.

**Step dinâmico** (para usabilidade):
- ae ≤ 1mm → step 0.01
- ae ≤ 10mm → step 0.1
- ae > 10mm → step 0.5

### 2.4 ap com regra especial para acabamento

A validação externa identificou que **ap acabamento em fresas toroidais NÃO é proporcional ao diâmetro**. Na prática brasileira de moldes, ap acabamento é 0.1–0.5mm fixo, independente de D.

**Decisão (corrigida pela validação):**

| Operação | Cálculo do max | Racional |
|---|---|---|
| Desbaste (D ≤ 6) | 1.0 × D | Fresa pequena aguenta ap = D |
| Desbaste (D > 6) | 0.8 × D | Redução por deflexão em diâmetros maiores |
| Semi-Acabamento | 0.5 × D | Padrão Kennametal/Sandvik |
| **Acabamento** | **0.5mm fixo** | **Validação externa: 0.1–0.5mm na prática. NÃO usar 0.2×D** |

**Cap de segurança L/D:** Se `balanco / diametro > ldCritico` (default 6), limitar ap a 0.1mm (zona bloqueada, já existe no sistema).

**Step:** 0.05mm (mantém o atual).

### 2.5 fz interpolado das tabelas existentes

O sistema já possui tabelas completas de fz por diâmetro e grupo de material (GRUPO1/2/3_DESBASTE, ALUMINIO_DESBASTE). O fz recomendado vem de `getRecommendedParams()`.

**Decisão:** Derivar fz_min e fz_max como percentual do fz recomendado.
- fz_min = fz_recomendado × 0.40 (permite redução significativa para acabamento fino)
- fz_max = fz_recomendado × 2.0 (permite forçar avanço em desbaste agressivo)
- Floor absoluto: 0.002 mm/dente (micro-ferramentas Ø0.2mm usam fz 0.002)

**Step dinâmico:**
- fz ≤ 0.05 → step 0.001
- fz ≤ 0.2 → step 0.005
- fz > 0.2 → step 0.01

### 2.6 Override por ferramenta customizada

Operadores experientes podem ter ferramentas especiais (revestimento DLC, geometria proprietária) que operam fora dos ranges padrão.

**Decisão:** Campo opcional `paramRanges` na interface `Ferramenta`. Quando definido, sobrescreve o bound calculado. Campos não preenchidos usam o automático.

---

## 3. Arquitetura da Solução

### 3.1 Novos tipos (src/types/index.ts)

Adicionar **após** a interface `Ferramenta` existente:

```typescript
/** Limites calculados para um parâmetro do slider */
export interface ParamBounds {
  min: number;
  max: number;
  step: number;
  recomendado: number;
}

/** Limites dos 4 sliders do Ajuste Fino */
export interface SliderBounds {
  vc: ParamBounds;
  fz: ParamBounds;
  ae: ParamBounds;
  ap: ParamBounds;
}

/** Override opcional de range (campos undefined = automático) */
export interface ParamRangeOverride {
  min?: number;
  max?: number;
  desejado?: number;
}

/** Overrides dos 4 parâmetros para uma ferramenta */
export interface ToolParamRanges {
  vc?: ParamRangeOverride;
  fz?: ParamRangeOverride;
  ae?: ParamRangeOverride;
  ap?: ParamRangeOverride;
}
```

Modificar a interface `Ferramenta` existente adicionando campo opcional:

```typescript
export interface Ferramenta {
  tipo: 'toroidal' | 'esferica' | 'topo';
  diametro: number;
  numeroArestas: number;
  balanco: number;
  raioQuina?: number;
  paramRanges?: ToolParamRanges; // ← NOVO: override opcional
}
```

### 3.2 Nova engine (src/engine/slider-bounds.ts)

**Arquivo novo.** Função pura, sem side effects, testável.

```typescript
import type { Material, Ferramenta, SliderBounds, ParamBounds, ParamRangeOverride } from '@/types';
import { TipoUsinagem } from '@/types';
import { getRecommendedParams } from './recommendations';

/**
 * Calcula os limites dinâmicos dos sliders do Ajuste Fino.
 * 
 * Fonte técnica dos ranges:
 * - Vc: material.vcRanges[tipoOp] com janela ±30%
 * - ae: max = diâmetro (limite físico, validado Sandvik/Kennametal)
 * - ap: multiplier por operação, acabamento fixo 0.5mm (validação Grok + catálogos)
 * - fz: ±60% ao redor do fz recomendado por tabelas de grupo
 */
export function calcularSliderBounds(
  material: Material | null,
  ferramenta: Ferramenta,
  tipoOp: TipoUsinagem,
  ldCritico?: number,
): SliderBounds {
  const D = ferramenta.diametro;
  const recommended = material
    ? getRecommendedParams(material, tipoOp, D, ferramenta.balanco)
    : null;

  // ── Vc ──
  const vcBounds = calcularVcBounds(material, tipoOp, recommended?.vc ?? 150);

  // ── ae ──
  const aeBounds = calcularAeBounds(D, recommended?.ae ?? D * 0.3);

  // ── ap ──
  const apBounds = calcularApBounds(D, tipoOp, ferramenta.balanco, ldCritico ?? 6, recommended?.ap ?? 1);

  // ── fz ──
  const fzBounds = calcularFzBounds(recommended?.fz ?? 0.05);

  // Aplicar overrides da ferramenta
  return {
    vc: applyOverride(vcBounds, ferramenta.paramRanges?.vc),
    ae: applyOverride(aeBounds, ferramenta.paramRanges?.ae),
    ap: applyOverride(apBounds, ferramenta.paramRanges?.ap),
    fz: applyOverride(fzBounds, ferramenta.paramRanges?.fz),
  };
}
```

**Funções internas (mesmo arquivo):**

```typescript
function calcularVcBounds(
  material: Material | null,
  tipoOp: TipoUsinagem,
  vcRecomendado: number,
): ParamBounds {
  if (material) {
    const [vcMin, vcMax] = material.vcRanges[tipoOp];
    return {
      min: Math.round(vcMin * 0.7),
      max: Math.round(vcMax * 1.3),
      step: 1,
      recomendado: vcRecomendado,
    };
  }
  // Fallback sem material: cobre aços + inox
  return { min: 30, max: 350, step: 1, recomendado: vcRecomendado };
}

function calcularAeBounds(D: number, aeRecomendado: number): ParamBounds {
  const step = D <= 1 ? 0.01 : D <= 10 ? 0.1 : 0.5;
  return {
    min: 0.01,
    max: D, // ← LIMITE FÍSICO: ae nunca excede diâmetro
    step,
    recomendado: Math.min(aeRecomendado, D),
  };
}

function calcularApBounds(
  D: number,
  tipoOp: TipoUsinagem,
  balanco: number,
  ldCritico: number,
  apRecomendado: number,
): ParamBounds {
  let max: number;

  if (tipoOp === TipoUsinagem.ACABAMENTO) {
    // CORREÇÃO VALIDADA: acabamento = 0.5mm fixo (não proporcional a D)
    // Fonte: Validação Grok contra Kennametal/Sandvik + prática brasileira
    max = 0.5;
  } else if (tipoOp === TipoUsinagem.SEMI_ACABAMENTO) {
    max = D * 0.5;
  } else {
    // Desbaste
    max = D <= 6 ? D * 1.0 : D * 0.8;
  }

  // Cap de segurança L/D
  const ldRatio = balanco / D;
  if (ldRatio > ldCritico) {
    max = 0.1;
  }

  return {
    min: 0.05,
    max: Math.max(0.1, Math.round(max * 100) / 100),
    step: 0.05,
    recomendado: Math.min(apRecomendado, max),
  };
}

function calcularFzBounds(fzRecomendado: number): ParamBounds {
  const fzMin = Math.max(0.002, fzRecomendado * 0.4);
  const fzMax = fzRecomendado * 2.0;
  const step = fzRecomendado <= 0.05 ? 0.001 : fzRecomendado <= 0.2 ? 0.005 : 0.01;

  return {
    min: Math.round(fzMin * 10000) / 10000,
    max: Math.round(fzMax * 10000) / 10000,
    step,
    recomendado: fzRecomendado,
  };
}

function applyOverride(bounds: ParamBounds, override?: ParamRangeOverride): ParamBounds {
  if (!override) return bounds;
  return {
    ...bounds,
    min: override.min ?? bounds.min,
    max: override.max ?? bounds.max,
    recomendado: override.desejado ?? bounds.recomendado,
  };
}
```

### 3.3 Re-export (src/engine/index.ts)

Adicionar linha:

```typescript
export { calcularSliderBounds } from './slider-bounds';
```

### 3.4 Modificar fine-tune-panel.tsx (desktop)

**Substituir** o `SLIDER_CONFIG` hardcoded por bounds dinâmicos.

**Lógica de mudança:**

```typescript
// ANTES (remover):
const SLIDER_CONFIG = [
  { key: 'vc' as const, ..., min: 1, max: 1200, step: 1 },
  { key: 'fz' as const, ..., min: 0.01, max: 1, step: 0.01 },
  { key: 'ae' as const, ..., min: 0.1, max: 50, step: 0.1 },
  { key: 'ap' as const, ..., min: 0.05, max: 6, step: 0.05 },
];

// DEPOIS:
import { calcularSliderBounds } from '@/engine';
import { MATERIAIS } from '@/data';

// Dentro do componente FineTunePanel():
const ferramenta = useMachiningStore((s) => s.ferramenta);
const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);
const bounds = calcularSliderBounds(material ?? null, ferramenta, tipoOperacao);

const SLIDER_CONFIG = [
  { key: 'vc' as const, label: 'Vc', fullLabel: 'VEL. DE CORTE', unit: 'M/MIN',
    color: 'primary', rgb: '0,217,255',
    desc: '...', aumentar: '...', diminuir: '...', equilibrio: '...',
    ...bounds.vc },
  { key: 'fz' as const, label: 'fz', fullLabel: 'AVANÇO/DENTE', unit: 'MM/DENTE',
    color: 'secondary', rgb: '57,255,20',
    desc: '...', aumentar: '...', diminuir: '...', equilibrio: '...',
    ...bounds.fz },
  { key: 'ae' as const, label: 'ae', fullLabel: 'ENGAJ. RADIAL', unit: 'MM',
    color: 'accent-purple', rgb: '168,85,247',
    desc: '...', aumentar: '...', diminuir: '...', equilibrio: '...',
    ...bounds.ae },
  { key: 'ap' as const, label: 'ap', fullLabel: 'PROF. AXIAL', unit: 'MM',
    color: 'accent-orange', rgb: '249,115,22',
    desc: '...', aumentar: '...', diminuir: '...', equilibrio: '...',
    ...bounds.ap },
];
```

**IMPORTANTE — Clamp de valores:** Quando o material ou ferramenta muda, o valor atual pode ficar fora do novo range. Adicionar clamp:

```typescript
// Após calcular bounds, verificar se valores atuais estão dentro:
useEffect(() => {
  const clamped: Partial<ParametrosUsinagem> = {};
  if (parametros.vc > bounds.vc.max) clamped.vc = bounds.vc.max;
  if (parametros.vc < bounds.vc.min) clamped.vc = bounds.vc.min;
  if (parametros.ae > bounds.ae.max) clamped.ae = bounds.ae.max;
  if (parametros.ap > bounds.ap.max) clamped.ap = bounds.ap.max;
  if (parametros.fz > bounds.fz.max) clamped.fz = bounds.fz.max;
  if (parametros.fz < bounds.fz.min) clamped.fz = bounds.fz.min;
  if (Object.keys(clamped).length > 0) ajustarParametros(clamped);
}, [bounds]);
```

### 3.5 Modificar mobile-fine-tune-section.tsx

Mesma lógica do 3.4. O SLIDER_CONFIG é idêntico — aplicar a mesma transformação.

### 3.6 Tick visual do recomendado no StyledSlider

Adicionar prop opcional `recomendado` ao `StyledSlider` (src/components/styled-slider.tsx):

```typescript
export interface StyledSliderProps {
  // ... props existentes ...
  recomendado?: number; // ← NOVO
}
```

Renderizar um marcador visual sutil:

```typescript
{recomendado !== undefined && (
  <div
    className="absolute top-0 w-0.5 h-2 rounded-full opacity-40"
    style={{
      left: `${((recomendado - min) / (max - min)) * 100}%`,
      backgroundColor: `rgb(${rgb})`,
    }}
    title={`Recomendado: ${recomendado}`}
  />
)}
```

### 3.7 Settings — Ranges personalizados por ferramenta

Na `FerramentasSection` de `src/pages/settings-page.tsx`, adicionar accordion colapsável após a seção de "Fatores de Correção".

**UI proposta:**

```
┌─ Ranges do Ajuste Fino (opcional) ──────────────────────────┐
│  Deixe em branco para usar ranges automáticos por material  │
│                                                              │
│  Vc   Min [____] Max [____] Desejado [____] m/min           │
│  fz   Min [____] Max [____] Desejado [____] mm/dente        │
│  ae   Min [____] Max [____] Desejado [____] mm              │
│  ap   Min [____] Max [____] Desejado [____] mm              │
└──────────────────────────────────────────────────────────────┘
```

**Regras de validação:**
- Todos os campos são opcionais (`number | undefined`)
- Se min E max preenchidos: min < max
- Se desejado preenchido: deve estar entre min e max (ou entre os bounds automáticos se min/max não preenchidos)
- Armazenar em `ferramenta.paramRanges` no store (persistido via localStorage)

**Nota:** Esta seção pode ser implementada como fase 2 se necessário. O core (S7A + S7B) funciona sem ela.

---

## 4. Dados de Referência para os Testes

### 4.1 Caso: Aço P20 (id=2) + Ø10 + Desbaste

| Param | Cálculo | Resultado Esperado |
|---|---|---|
| Vc min | 150 × 0.7 | **105** |
| Vc max | 200 × 1.3 | **260** |
| Vc rec | getRecommendedParams(P20, DESBASTE, 10) | **~200** (interpolado tabela G1) |
| ae max | D = 10 | **10** |
| ae rec | 10 × 0.45 (aço desbaste) | **4.5** |
| ap max | 10 × 0.8 (D > 6, desbaste) | **8.0** |
| ap rec | getRecommendedParams() | **~8.0** |
| fz rec | interpolado G1 D=10 | **~0.140** |
| fz min | 0.140 × 0.4 | **0.056** |
| fz max | 0.140 × 2.0 | **0.280** |

### 4.2 Caso: H13 (id=3) + Ø6 + Acabamento

| Param | Cálculo | Resultado Esperado |
|---|---|---|
| Vc min | 100 × 0.7 | **70** |
| Vc max | 150 × 1.3 | **195** |
| ae max | D = 6 | **6** |
| ae rec | 6 × 0.035 (endurecido acabamento) | **0.21** |
| ap max | **0.5** (acabamento fixo — validação Grok) |
| fz rec | G2 acab D=6: 0.080 × 0.75 | **~0.060** |
| fz min | 0.060 × 0.4 | **0.024** |
| fz max | 0.060 × 2.0 | **0.120** |

### 4.3 Caso: Sem material + Ø10 + Desbaste (fallback)

| Param | Resultado Esperado |
|---|---|
| Vc | min=30, max=350 |
| ae | max=10 (= D) |
| ap | max=8 (0.8×D) |
| fz | baseado no fallback do getRecommendedParams |

### 4.4 Caso: ae max = D (variação de diâmetro)

| Diâmetro | ae max esperado |
|---|---|
| Ø0.5 | 0.5 |
| Ø3 | 3 |
| Ø6 | 6 |
| Ø10 | 10 |
| Ø16 | 16 |

### 4.5 Caso: Override de ferramenta

```typescript
ferramenta.paramRanges = {
  vc: { min: 80, max: 180 },
  fz: { desejado: 0.100 },
};
// Resultado: vc.min=80, vc.max=180 (override), fz.recomendado=0.100 (override)
// ae e ap usam bounds automáticos (sem override)
```

### 4.6 Caso: L/D > 6 (zona bloqueada)

```typescript
ferramenta = { diametro: 6, balanco: 42 }; // L/D = 7
// ap.max deve ser 0.1 (cap de segurança)
```

---

## 5. Sequência de Implementação

| Etapa | Arquivo | Ação | Dependência |
|---|---|---|---|
| 1 | `src/types/index.ts` | Adicionar ParamBounds, SliderBounds, ParamRangeOverride, ToolParamRanges. Modificar Ferramenta +paramRanges? | Nenhuma |
| 2 | `tests/engine/slider-bounds.test.ts` | Escrever testes TDD (mínimo 12 casos — usar dados da seção 4) | Etapa 1 |
| 3 | `src/engine/slider-bounds.ts` | Implementar calcularSliderBounds() + funções internas | Etapa 1 |
| 4 | `src/engine/index.ts` | Adicionar re-export | Etapa 3 |
| 5 | `src/components/fine-tune-panel.tsx` | Substituir SLIDER_CONFIG hardcoded por bounds dinâmicos + clamp | Etapa 4 |
| 6 | `src/components/mobile/mobile-fine-tune-section.tsx` | Idem etapa 5 | Etapa 4 |
| 7 | `src/components/styled-slider.tsx` | Adicionar prop recomendado + tick visual | Nenhuma |
| 8 | `src/pages/settings-page.tsx` | Accordion param ranges (pode ser fase 2) | Etapa 1 |
| 9 | Atualizar testes existentes | Remover dependência de ranges hardcoded | Etapa 5-6 |

---

## 6. Verificação Final

```bash
# Testes novos
npx vitest run tests/engine/slider-bounds.test.ts

# Todos os testes (manter 503+ passando)
npx vitest run

# TypeScript sem erros
npx tsc --noEmit

# Teste manual no browser
npm run dev
# Desktop → selecionar Aço P20 + Ø10 + Desbaste:
#   - Vc: min≈105, max≈260 (NÃO 1–1200)
#   - ae: max=10 (NÃO 50)
#   - ap: max≈8 (NÃO 6)
#   - Tick visual do recomendado visível
# Mobile → mesma verificação em /mobile
# Trocar para H13 + Acabamento:
#   - ap max=0.5 (NÃO proporcional a D)
#   - ae max=6 (= D)
```

---

## 7. Arquivos Modificados / Criados

| Arquivo | Ação | Linhas Estimadas |
|---|---|---|
| `src/types/index.ts` | MODIFICAR | +25 linhas (tipos novos + campo em Ferramenta) |
| `src/engine/slider-bounds.ts` | **CRIAR** | ~120 linhas |
| `src/engine/index.ts` | MODIFICAR | +1 linha |
| `src/components/fine-tune-panel.tsx` | MODIFICAR | ~30 linhas alteradas |
| `src/components/mobile/mobile-fine-tune-section.tsx` | MODIFICAR | ~30 linhas alteradas |
| `src/components/styled-slider.tsx` | MODIFICAR | +10 linhas (prop + tick) |
| `src/pages/settings-page.tsx` | MODIFICAR | +80 linhas (accordion, fase 2) |
| `tests/engine/slider-bounds.test.ts` | **CRIAR** | ~150 linhas |

---

## 8. O que NÃO mudar

- **getRecommendedParams()** — funciona corretamente, apenas consumido
- **Tabelas GRUPO1/2/3_DESBASTE** — dados validados, não alterar
- **materials.ts (vcRanges)** — dados validados externamente
- **Store (machining-store.ts)** — não precisa mudar (paramRanges vem da Ferramenta)
- **Design tokens / CSS** — sem alterações visuais além do tick

---

*Fonte técnica: Auditoria interna do código-fonte + validação externa contra catálogos Sandvik Coromant, Kennametal, Mitsubishi, Seco, Walter.*


8 Validação Externa (Grok — Catálogos da Indústria)

Os dados desta auditoria foram submetidos a validação cruzada contra catálogos de fabricantes de ferramentas de corte.

### 8.1 Vc (Velocidade de Corte) — ✅ Validado

Os vcRanges por material e operação estão coerentes com dados da Sandvik Coromant (170–310 m/min para aços baixa liga), Kennametal GOmill GP (200–300 m/min para P20), Mitsubishi (50–150 m/min para H13 endurecido) e Seco/Walter (100–250 m/min para aços moldes tipo 2711).

### 8.2 ae (Engajamento Radial) — ✅ Validado

Os multipliers (0.45×D desbaste aço, 0.30×D semi, 0.05×D acabamento P, 0.035×D acabamento H) alinham-se com Kennametal HARVI I TE (0.3–0.5×D roughing, 0.05–0.1×D finishing) e Sandvik (0.2–0.4×D semi-roughing, <0.1×D finish). Confirmado que ae > D é fisicamente impossível.

### 8.3 ap (Profundidade Axial) — ⚠️ Parcialmente Válido

Desbaste e semi-acabamento validados (Kennametal: 0.5–1×D roughing, Sandvik: até 0.8×D). **Correção identificada:** para fresas toroidais em acabamento de moldes no Brasil, o ap típico é **0.1–0.5mm fixo**, não proporcional a D. O valor de 0.2×D gerava ap=2mm para Ø10, que não é praticado.

### 8.4 fz (Avanço por Dente) — ✅ Validado

Valores das tabelas por diâmetro e grupo confirmados contra Mitsubishi (fz 0.002–0.01 para Ø0.2–1mm endurecidos, 0.1–0.3 para Ø10–16mm) e Kennametal GOmill (0.01–0.2 para pequenos, até 0.3 para maiores em roughing). Mínimo de 0.002 mm/dente para Ø0.2mm confirmado.

### Fontes Consultadas

- Sandvik Coromant — Milling Formulas, Profile Milling Guidelines
- Kennametal — GOmill GP Tables, HARVI I TE Catalog
- Mitsubishi Materials — End Mill Series (H13)
- Seco Tools — Solid Carbide End Mills
- Walter — Fresamento de Aços Moldes

---

*Todas as evidências são baseadas em leitura direta do código-fonte em `C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\src\`*  
*Validação externa realizada via Grok contra catálogos Sandvik, Kennametal, Mitsubishi, Seco e Walter.*




