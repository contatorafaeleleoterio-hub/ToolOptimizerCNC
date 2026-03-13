# PLANO REVISADO: Unificar Indicadores de Ajuste Fino (4 Unidirecionais)

## Contexto

O usuário pediu para replicar a lógica unidirecional do indicador Vc para os outros 3 parâmetros (fz, ae, ap). Apenas Vc foi refatorizado (commit `9119fd4`). Os 3 restantes continuam com `ActiveBar` (bidirecional, centro→lados), que não reflete a realidade de parâmetros que vão de zero para cima.

**Objetivo:** Converter fz, ae, ap para o mesmo padrão unidirecional do Vc — barra cresce da esquerda para direita, verde no range ideal, vermelho fora, tick mark no valor recomendado.

---

## Erros Críticos no Plano Original (corrigidos aqui)

### ERRO 1: Criar `parameterRanges` estáticos no Store
**O plano original propõe** adicionar `parameterRanges: { fz: {min, rec, max}, ae: ..., ap: ... }` ao Zustand store com valores fixos.

**PROBLEMA:** O codebase JÁ TEM `calcularSliderBounds()` em `src/engine/slider-bounds.ts` que computa `ParamBounds` (min, max, step, recomendado) **dinamicamente** por material/operação/ferramenta. Adicionar ranges estáticos no store cria duplicação e conflito com o sistema dinâmico existente.

**CORREÇÃO:** Usar `calcularSliderBounds()` diretamente dentro de `ParameterHealthBar`. Zero mudanças no store.

### ERRO 2: Criar Settings UI para ranges
**O plano original propõe** um card "Ranges Ideais" em Settings com inputs manuais para min/rec/max de cada parâmetro.

**PROBLEMA:** Os bounds já são dinâmicos via `calcularSliderBounds()` — mudam automaticamente quando o operador troca material, operação ou ferramenta. Um card Settings com valores fixos confundiria o operador e conflitaria com os bounds dinâmicos.

**CORREÇÃO:** Não adicionar nenhum UI em Settings. O sistema de bounds dinâmicos já resolve isso. A Settings já tem L/D thresholds e ap multipliers que influenciam os bounds.

### ERRO 3: Remover InactiveBar
**O plano diz** "Remover InactiveBar" mas logo abaixo usa `InactiveBar` para fz antes da simulação.

**CORREÇÃO:** Manter `InactiveBar` — fz precisa de `resultado.fzEfetivo` que só existe após simulação.

### ERRO 4: Contagem de testes errada
**O plano diz** "556+" testes. O projeto tem **503** testes (34 arquivos).

### ERRO 5: Zone logic do fz usa constante FZ_K hardcoded
**O plano original** usa `fzEfetivo / fzRecomendado` com ranges estáticos. Mas `calcularSliderBounds()` já fornece `fzBounds.recomendado` dinâmico baseado no material/ferramenta.

**CORREÇÃO:** Usar `bounds.fz.recomendado` como referência para o ratio, exatamente como Vc usa `vcRecomendado`.

---

## Plano de Implementação Corrigido (3 Fases)

### FASE 1: Refatorar `parameter-health-bar.tsx`

**Arquivo:** `src/components/parameter-health-bar.tsx` (~380 linhas)

#### 1A. Criar funções compute unidirecionais (substituem as bidirecionais)

Substituir `computeFzPosition` (linhas 58-73), `computeAePosition` (linhas 79-93), `computeApPosition` (linhas 100-130) por versões unidirecionais que seguem o padrão de `computeVcByValue`:

```typescript
// PADRÃO a seguir (já existe, NÃO modificar):
// computeVcByValue(vc, vcRecomendado, vcMax) → { position: [0,1], zone, label }
//   position = vc / vcMax (clamped 0-1)
//   ratio = vc / vcRecomendado → determina zone

// NOVO: computeFzByValue (substitui computeFzPosition)
export function computeFzByValue(
  fzEfetivo: number, fzRecomendado: number, fzMax: number, ctf: number
): FzByValueResult {
  const position = fzMax > 0 ? Math.min(1, Math.max(0, fzEfetivo / fzMax)) : 0;
  const ratio = fzRecomendado > 0 ? fzEfetivo / fzRecomendado : 0;

  // Mesmas zonas do Vc, com labels específicos de fz
  let zone: ZoneId, label: string;
  if (ratio < 0.50)      { zone = 'vermelho'; label = 'Atrito'; }
  else if (ratio < 0.75) { zone = 'amarelo';  label = 'Leve'; }
  else if (ratio <= 1.20) { zone = 'verde';   label = 'Ideal'; }
  else if (ratio <= 1.50) { zone = 'amarelo';  label = 'Agressivo'; }
  else                    { zone = 'vermelho'; label = 'Vibração'; }

  const ctfBadge = ctf > 1.0 ? `CTF ×${ctf.toFixed(2)}` : null;
  return { position, zone, label, ctfBadge };
}

// NOVO: computeAeByValue (substitui computeAePosition)
export function computeAeByValue(
  ae: number, aeRecomendado: number, aeMax: number, diametro: number
): AeByValueResult {
  const position = aeMax > 0 ? Math.min(1, Math.max(0, ae / aeMax)) : 0;
  const ratio = aeRecomendado > 0 ? ae / aeRecomendado : 0;
  const aeDRatio = diametro > 0 ? ae / diametro : 0;

  let zone: ZoneId, label: string;
  if (ratio < 0.50)      { zone = 'amarelo';  label = 'CTF Alto'; }
  else if (ratio <= 1.20) { zone = 'verde';   label = 'Ideal'; }
  else if (ratio <= 1.50) { zone = 'amarelo';  label = 'Pesado'; }
  else                    { zone = 'vermelho'; label = 'Excessivo'; }

  const display = `${(aeDRatio * 100).toFixed(0)}% D`;
  return { position, zone, label, display };
}

// NOVO: computeApByValue (substitui computeApPosition)
export function computeApByValue(
  ap: number, apRecomendado: number, apMax: number,
  diametro: number, balanco: number
): ApByValueResult {
  const ldRatio = diametro > 0 ? balanco / diametro : 0;
  const position = apMax > 0 ? Math.min(1, Math.max(0, ap / apMax)) : 0;
  const ratio = apRecomendado > 0 ? ap / apRecomendado : 0;

  let zone: ZoneId, label: string;
  if (ldRatio > 6)        { zone = 'vermelho'; label = 'BLOQUEADO'; }
  else if (ratio < 0.50)  { zone = 'amarelo';  label = 'Leve'; }
  else if (ratio <= 1.20) { zone = 'verde';    label = 'Padrão'; }
  else if (ratio <= 1.50) { zone = 'amarelo';  label = 'Agressivo'; }
  else                    { zone = 'vermelho'; label = 'Deflexão'; }

  // L/D color class (existing logic)
  let ldColorClass: string;
  if (ldRatio <= 3) ldColorClass = 'text-seg-verde';
  else if (ldRatio < 4) ldColorClass = 'text-seg-amarelo';
  else ldColorClass = 'text-seg-vermelho';

  const ldDisplay = `L/D: ${ldRatio.toFixed(1)}`;
  return { position, zone, label, ldDisplay, ldColorClass };
}
```

**Return type interfaces** (adicionar junto com `VcByValueResult` existente):

```typescript
interface FzByValueResult {
  position: number;  // [0, 1]
  zone: ZoneId;
  label: string;
  ctfBadge: string | null;
}

interface AeByValueResult {
  position: number;
  zone: ZoneId;
  label: string;
  display: string;  // "50% D"
}

interface ApByValueResult {
  position: number;
  zone: ZoneId;
  label: string;
  ldDisplay: string;
  ldColorClass: string;
}
```

#### 1B. Criar componentes `FzHealthBar`, `AeHealthBar`, `ApHealthBar`

Cada um segue o **mesmo template visual** de `VcHealthBar` (linhas 143-193):

```tsx
// Template unificado (aplicar a cada parâmetro):
function XxxHealthBar({ ...props }) {
  const result = computeXxxByValue(...);
  const rgb = ZONE_RGB[result.zone];
  const fillPct = result.position * 100;
  const recPct = max > 0 ? (recomendado / max) * 100 : 50;

  return (
    <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden"
         data-testid={`health-xxx-fill`}>
      {/* Fill from left */}
      <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
           style={{ width: `${fillPct}%`, backgroundColor: `rgb(${rgb})` }} />
      {/* Recommended tick mark */}
      <div className="absolute top-0 h-full w-0.5 -translate-x-1/2"
           style={{ left: `${recPct}%`, backgroundColor: `rgba(${rgb}, 0.5)` }} />
    </div>
  );
}
```

**Diferenças específicas por parâmetro:**
- `FzHealthBar`: Mostrar `ctfBadge` quando ativo (text badge pequeno)
- `AeHealthBar`: Mostrar `display` (ex: "50% D") como readout
- `ApHealthBar`: Mostrar `ldDisplay` + `ldColorClass` como readout

#### 1C. Atualizar `ParameterHealthBar` (componente principal exportado)

**Adicionar** chamada a `calcularSliderBounds()` dentro do componente:

```typescript
export function ParameterHealthBar({ paramKey }: { paramKey: 'vc' | 'fz' | 'ae' | 'ap' }) {
  const parametros = useMachiningStore((s) => s.parametros);
  const resultado = useMachiningStore((s) => s.resultado);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const materialId = useMachiningStore((s) => s.materialId);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);

  const material = MATERIAIS.find((m) => m.id === materialId) ?? null;
  // NOVO: chamar calcularSliderBounds para obter bounds dinâmicos
  const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao);

  if (paramKey === 'vc') {
    // MANTER como está — usar bounds.vc
    return <VcHealthBar vc={parametros.vc} vcRecomendado={bounds.vc.recomendado} vcMax={bounds.vc.max} />;
  }

  if (paramKey === 'fz') {
    if (!resultado) return <InactiveBar />; // fz precisa de simulação
    return <FzHealthBar
      fzEfetivo={resultado.fzEfetivo}
      fzRecomendado={bounds.fz.recomendado}
      fzMax={bounds.fz.max}
      ctf={resultado.seguranca.ctf}
    />;
  }

  if (paramKey === 'ae') {
    return <AeHealthBar
      ae={parametros.ae}
      aeRecomendado={bounds.ae.recomendado}
      aeMax={bounds.ae.max}
      diametro={ferramenta.diametro}
    />;
  }

  // ap
  return <ApHealthBar
    ap={parametros.ap}
    apRecomendado={bounds.ap.recomendado}
    apMax={bounds.ap.max}
    diametro={ferramenta.diametro}
    balanco={ferramenta.balanco}
  />;
}
```

**Imports a adicionar:**
```typescript
import { calcularSliderBounds } from '@/engine/slider-bounds';
import { MATERIAIS } from '@/data/materials';
```

#### 1D. Remover código obsoleto

- **Remover:** `computeFzPosition`, `computeAePosition`, `computeApPosition` (funções bidirecionais)
- **Remover:** `ActiveBar` component (bidirecional, centro→lados)
- **Remover:** `FZ_K` constante (0.017 — não mais necessária, bounds dinâmicos substituem)
- **Manter:** `InactiveBar` (fz precisa antes de simular)
- **Manter:** `VcHealthBar` + `computeVcByValue` (intocados)
- **Manter:** `ZONE_RGB` lookup

---

### FASE 2: Atualizar testes

**Arquivo:** `tests/components/parameter-health-bar.test.tsx` (374 linhas, 58 testes)

#### 2A. Substituir testes das funções compute

Remover testes de `computeFzPosition`, `computeAePosition`, `computeApPosition` (bidirecionais).
Criar novos testes para `computeFzByValue`, `computeAeByValue`, `computeApByValue` (unidirecionais).

**Padrão de teste (seguir o existente de `computeVcByValue`):**

```typescript
describe('computeFzByValue', () => {
  it('returns position 0 when fzEfetivo is 0', () => {
    const r = computeFzByValue(0, 0.1, 0.2, 1.0);
    expect(r.position).toBe(0);
  });
  it('returns verde when ratio is in 0.75–1.20', () => {
    const r = computeFzByValue(0.10, 0.10, 0.20, 1.0);
    expect(r.zone).toBe('verde');
    expect(r.label).toBe('Ideal');
  });
  it('returns vermelho (Atrito) when ratio < 0.50', () => {
    const r = computeFzByValue(0.03, 0.10, 0.20, 1.0);
    expect(r.zone).toBe('vermelho');
  });
  it('returns vermelho (Vibração) when ratio > 1.50', () => {
    const r = computeFzByValue(0.18, 0.10, 0.20, 1.0);
    expect(r.zone).toBe('vermelho');
  });
  it('returns ctfBadge when ctf > 1.0', () => {
    const r = computeFzByValue(0.10, 0.10, 0.20, 1.25);
    expect(r.ctfBadge).toBe('CTF ×1.25');
  });
  it('returns null ctfBadge when ctf <= 1.0', () => {
    const r = computeFzByValue(0.10, 0.10, 0.20, 1.0);
    expect(r.ctfBadge).toBeNull();
  });
  it('clamps position to max 1.0', () => {
    const r = computeFzByValue(0.30, 0.10, 0.20, 1.0);
    expect(r.position).toBe(1);
  });
  it('handles fzMax=0 safely', () => {
    const r = computeFzByValue(0.10, 0.10, 0, 1.0);
    expect(r.position).toBe(0);
  });
});

describe('computeAeByValue', () => {
  it('returns verde in ideal range', () => { ... });
  it('returns amarelo (CTF Alto) when ratio < 0.50', () => { ... });
  it('returns amarelo (Pesado) when ratio 1.20–1.50', () => { ... });
  it('returns vermelho (Excessivo) when ratio > 1.50', () => { ... });
  it('displays ae/D percentage correctly', () => { ... });
  it('handles aeMax=0 safely', () => { ... });
});

describe('computeApByValue', () => {
  it('returns verde in ideal range', () => { ... });
  it('returns vermelho BLOQUEADO when L/D > 6', () => { ... });
  it('returns amarelo (Leve) when ratio < 0.50', () => { ... });
  it('returns L/D display with 1 decimal', () => { ... });
  it('returns correct ldColorClass for L/D ≤ 3', () => { ... });
  it('returns correct ldColorClass for L/D 3–4', () => { ... });
  it('returns correct ldColorClass for L/D > 4', () => { ... });
  it('handles diametro=0 safely', () => { ... });
});
```

#### 2B. Atualizar testes de componente render

Os testes de render do `ParameterHealthBar` (linhas ~300-374) precisam refletir:
- ae e ap agora renderizam health bar unidirecional (não InactiveBar) mesmo sem resultado
- fz continua com InactiveBar quando resultado=null
- Verificar `data-testid` dos novos componentes
- Verificar que tick mark de recomendado aparece

**Nota:** NÃO precisamos de novos testes no store (`machining-store.test.ts`) nem no settings (`settings-page.test.tsx`) — nenhuma mudança nesses arquivos.

---

### FASE 3: Integração e validação

#### Quality Gates (obrigatórios antes de commit):

```bash
# 1. Type check
npx tsc --noEmit

# 2. Testes do componente modificado
npx vitest run tests/components/parameter-health-bar.test.tsx

# 3. Todos os testes (devem manter 503+)
npx vitest run

# 4. Build produção
npx vite build
```

#### Verificação visual:

```bash
npm run dev
# Abrir → Ajuste Fino
# Verificar: 4 indicadores unidirecionais (esquerda→direita)
# Verificar: Verde no range ideal de cada parâmetro
# Verificar: Tick mark de "recomendado" visível
# Verificar: fz mostra "Simular para ativar" antes da simulação
# Verificar: fz mostra barra + CTF badge após simulação
# Verificar: ap mostra L/D display com cor correta
# Mudar material → bounds mudam → indicadores se ajustam
```

#### Commit:

```
feat: unify fz/ae/ap indicators to unidirectional pattern matching Vc
```

---

## Arquivos a Modificar

| Arquivo | Mudança |
|---------|---------|
| `src/components/parameter-health-bar.tsx` | Substituir compute funcs + ActiveBar por versões unidirecionais |
| `tests/components/parameter-health-bar.test.tsx` | Substituir testes bidirecionais por unidirecionais |

**Arquivos NÃO modificados (diferente do plano original):**
- ~~`src/store/machining-store.ts`~~ — Sem mudanças (usa `calcularSliderBounds` existente)
- ~~`src/pages/settings-page.tsx`~~ — Sem mudanças (sem card de ranges)
- ~~`tests/store/machining-store.test.ts`~~ — Sem mudanças
- ~~`tests/pages/settings-page.test.tsx`~~ — Sem mudanças

## Código Existente a Reutilizar

| O quê | Onde | Como |
|-------|------|------|
| `calcularSliderBounds()` | `src/engine/slider-bounds.ts:25-45` | Chamar dentro de ParameterHealthBar para obter ParamBounds dinâmicos |
| `ZONE_RGB` | `parameter-health-bar.tsx:135-139` | Lookup RGB por zona (já existe) |
| `VcHealthBar` template | `parameter-health-bar.tsx:143-193` | Copiar layout HTML/CSS para os 3 novos health bars |
| `computeVcByValue` | `parameter-health-bar.tsx:38-51` | Referência de padrão (posição [0,1], ratio→zona) |
| `InactiveBar` | `parameter-health-bar.tsx:266-289` | Manter para fz antes de simulação |
| `MATERIAIS` | `src/data/materials.ts` | Import para lookup de material por ID |
| `ParamBounds` type | `src/types/index.ts` | Tipo retornado por calcularSliderBounds |

## Resultado Esperado

```
ANTES (ERRADO):                          DEPOIS (CERTO):
Vc: [████ ideal ████████ ▒] ✅            Vc: [████ ideal ████████ ▒] ✅ (inalterado)
fz: [← CENTER →] ❌                      fz: [████ ideal ████████ ▒] ✅ (unidirecional)
ae: [← CENTER →] ❌                      ae: [████ ideal ████████ ▒] ✅ (unidirecional)
ap: [← CENTER →] ❌                      ap: [████ ideal ████████ ▒] ✅ (unidirecional + L/D)
```

## Notas Críticas

1. **NUNCA interpolar zone em classes Tailwind** — usar `ZONE_RGB` lookup estático com `style={{ backgroundColor }}`
2. **Vc é imutável** — não mexer em `VcHealthBar` nem `computeVcByValue`
3. **fz é o único que precisa de InactiveBar** — ae e ap são sempre computáveis (usam apenas parametros + ferramenta)
4. **Bounds são dinâmicos** — mudam quando material/operação/ferramenta muda. Não hardcodar valores.
5. **L/D > 6 bloqueia ap** — manter lógica de bloqueio (zone='vermelho', label='BLOQUEADO')
6. **CTF badge apenas para fz** — quando `ctf > 1.0`
7. **Escopo mínimo** — apenas 2 arquivos modificados (componente + testes), zero mudanças em store/settings
