# Fase 8B — Tornar Input Padrao (Pin Defaults per-Input)

> **Redesign Dashboard Principal v0.8.0+**
> **Status:** ⬜ Pendente
> **Versao alvo:** v0.8.3
> **Dependencia:** Fase 8A concluida (ou independente — sem conflito de arquivos exceto types)
> **Complexidade:** ALTA (~120 linhas, 11 testes)

---

## Objetivo

Adicionar botao 📌 ao lado de CADA input/seletor do dashboard. O operador clica para salvar o valor atual daquele input como padrao. Ao abrir o app, todos os inputs carregam com os valores padrao salvos pelo usuario.

**REGRA CRITICA:** Isto e sobre INPUTS (material, operacao, ferramenta, parametros). NAO e sobre resultados de simulacao. Completamente independente de "favoritar" (Fase 8A).

---

## Arquivos a Modificar

| Arquivo | Acao | Tipo |
|---------|------|------|
| `src/types/index.ts` | Adicionar interface `UserDefaults` | Modificar |
| `src/store/machining-store.ts` | State `userDefaults`, 3 actions, partialize, persist v2→v3, onRehydrateStorage | Modificar |
| `src/components/pin-default-button.tsx` | Novo componente compartilhado | **Criar** |
| `src/components/config-panel.tsx` | PinDefaultButton ao lado de 7 inputs | Modificar |
| `src/components/fine-tune-panel.tsx` | PinDefaultButton ao lado de 4 sliders | Modificar |
| `tests/store/machining-store.test.ts` | +6 testes | Modificar |
| `tests/components/config-panel.test.tsx` | +3 testes | Modificar |
| `tests/components/fine-tune-panel.test.tsx` | +2 testes | Modificar |

---

## 1. Tipo — `src/types/index.ts`

```typescript
/**
 * User-defined default values for inputs.
 * Each field is optional — undefined means use system default (INITIAL_STATE).
 * Saved per-input via pin button. Loaded on app startup via onRehydrateStorage.
 */
export interface UserDefaults {
  materialId?: number;
  tipoOperacao?: TipoUsinagem;
  ferramentaTipo?: Ferramenta['tipo'];
  diametro?: number;
  raioQuina?: number;
  numeroArestas?: number;
  balanco?: number;
  vc?: number;
  fz?: number;
  ae?: number;
  ap?: number;
}
```

---

## 2. Store — `src/store/machining-store.ts`

### 2a. State + Actions

```typescript
// Adicionar ao MachiningState:
userDefaults: UserDefaults;

// Adicionar ao MachiningActions:
setUserDefault: <K extends keyof UserDefaults>(key: K, value: UserDefaults[K]) => void;
clearUserDefault: (key: keyof UserDefaults) => void;
clearAllUserDefaults: () => void;
```

### 2b. INITIAL_STATE

```typescript
// Adicionar ao INITIAL_STATE:
userDefaults: {},
```

### 2c. Implementacao das actions

```typescript
setUserDefault: (key, value) => {
  set((state) => ({
    userDefaults: { ...state.userDefaults, [key]: value },
  }));
},

clearUserDefault: (key) => {
  set((state) => {
    const updated = { ...state.userDefaults };
    delete updated[key];
    return { userDefaults: updated };
  });
},

clearAllUserDefaults: () => {
  set({ userDefaults: {} });
},
```

### 2d. Partialize — adicionar `userDefaults`

```typescript
partialize: (state) => ({
  limitesMaquina: state.limitesMaquina,
  safetyFactor: state.safetyFactor,
  preferences: state.preferences,
  safetyRules: state.safetyRules,
  customMaterials: state.customMaterials,
  customToolConfig: state.customToolConfig,
  toolCorrectionFactors: state.toolCorrectionFactors,
  objetivoUsinagem: state.objetivoUsinagem,
  savedTools: state.savedTools,
  validatedSimulations: state.validatedSimulations,
  userDefaults: state.userDefaults,  // NEW
}),
```

### 2e. Persist migration v2 → v3

```typescript
version: 3,  // WAS: 2
migrate: (persisted: unknown, version: number) => {
  const state = persisted as Record<string, unknown>;
  if (version < 2) {
    // v1 → v2 migration (existing)
    state.objetivoUsinagem = 'balanceado';
    state.savedTools = [];
    state.validatedSimulations = [];
  }
  if (version < 3) {
    // v2 → v3 migration (NEW)
    state.userDefaults = {};
  }
  return state;
},
```

### 2f. onRehydrateStorage — aplicar defaults ao iniciar

```typescript
onRehydrateStorage: () => (state) => {
  if (!state?.userDefaults) return;
  const d = state.userDefaults;

  // Apply user defaults over INITIAL_STATE values
  if (d.materialId !== undefined) state.materialId = d.materialId;
  if (d.tipoOperacao !== undefined) state.tipoOperacao = d.tipoOperacao;
  if (d.ferramentaTipo !== undefined) state.ferramenta = { ...state.ferramenta, tipo: d.ferramentaTipo };
  if (d.diametro !== undefined) state.ferramenta = { ...state.ferramenta, diametro: d.diametro };
  if (d.raioQuina !== undefined) state.ferramenta = { ...state.ferramenta, raioQuina: d.raioQuina };
  if (d.numeroArestas !== undefined) state.ferramenta = { ...state.ferramenta, numeroArestas: d.numeroArestas };
  if (d.balanco !== undefined) state.ferramenta = { ...state.ferramenta, balanco: d.balanco };
  if (d.vc !== undefined) state.parametros = { ...state.parametros, vc: d.vc };
  if (d.fz !== undefined) state.parametros = { ...state.parametros, fz: d.fz };
  if (d.ae !== undefined) state.parametros = { ...state.parametros, ae: d.ae };
  if (d.ap !== undefined) state.parametros = { ...state.parametros, ap: d.ap };
},
```

**Nota:** `onRehydrateStorage` executa APOS o localStorage ser carregado. Os campos `materialId`, `ferramenta`, `tipoOperacao`, `parametros` NAO sao persistidos normalmente (partialize nao os inclui). Entao o `onRehydrateStorage` aplica userDefaults SOBRE os valores de INITIAL_STATE que ja foram setados.

---

## 3. Componente — `src/components/pin-default-button.tsx` (NOVO)

```tsx
/**
 * PinDefaultButton — small icon button to pin/unpin a value as user default.
 * Placed next to each input in ConfigPanel and FineTunePanel.
 */

import { useMachiningStore } from '@/store';
import type { UserDefaults } from '@/types';

interface PinDefaultButtonProps {
  paramKey: keyof UserDefaults;
  currentValue: UserDefaults[keyof UserDefaults];
}

export function PinDefaultButton({ paramKey, currentValue }: PinDefaultButtonProps) {
  const userDefaults = useMachiningStore((s) => s.userDefaults);
  const setUserDefault = useMachiningStore((s) => s.setUserDefault);
  const clearUserDefault = useMachiningStore((s) => s.clearUserDefault);

  const savedValue = userDefaults[paramKey];
  const isPinned = savedValue !== undefined && savedValue === currentValue;

  const handleClick = () => {
    if (isPinned) {
      clearUserDefault(paramKey);
    } else {
      setUserDefault(paramKey, currentValue);
    }
  };

  return (
    <button
      aria-label={isPinned ? `Remover padrao de ${paramKey}` : `Tornar ${paramKey} padrao`}
      onClick={handleClick}
      className="p-0.5 rounded hover:bg-white/10 transition-colors"
      title={isPinned ? 'Padrao salvo — clique para remover' : 'Tornar este valor o padrao'}
    >
      <span
        className="material-symbols-outlined text-sm"
        style={{ color: isPinned ? '#00D9FF' : 'rgba(255,255,255,0.25)' }}
      >
        push_pin
      </span>
    </button>
  );
}
```

**Notas:**
- `#00D9FF` = primary cyan do design system
- `style={{}}` — cor via inline (regra do projeto: nunca classe Tailwind dinamica)
- `text-sm` (14px) — discreto, nao compete com o input

---

## 4. UI — `src/components/config-panel.tsx`

### 4a. Import

```typescript
import { PinDefaultButton } from './pin-default-button';
```

### 4b. Pins nos inputs

Ao lado de cada dropdown/seletor, adicionar `PinDefaultButton`:

```tsx
{/* Material dropdown */}
<div className="flex items-center gap-1">
  <select ...>{/* existing */}</select>
  <PinDefaultButton paramKey="materialId" currentValue={materialId} />
</div>

{/* Tipo Operacao buttons */}
<div className="flex items-center gap-1">
  <div className="flex gap-1">{/* existing buttons */}</div>
  <PinDefaultButton paramKey="tipoOperacao" currentValue={tipoOperacao} />
</div>

{/* Ferramenta: tipo */}
<PinDefaultButton paramKey="ferramentaTipo" currentValue={ferramenta.tipo} />

{/* Ferramenta: diametro */}
<PinDefaultButton paramKey="diametro" currentValue={ferramenta.diametro} />

{/* Ferramenta: raioQuina (se toroidal) */}
{ferramenta.tipo === 'toroidal' && (
  <PinDefaultButton paramKey="raioQuina" currentValue={ferramenta.raioQuina} />
)}

{/* Ferramenta: arestas */}
<PinDefaultButton paramKey="numeroArestas" currentValue={ferramenta.numeroArestas} />

{/* Ferramenta: balanco */}
<PinDefaultButton paramKey="balanco" currentValue={ferramenta.balanco} />
```

---

## 5. UI — `src/components/fine-tune-panel.tsx`

### 5a. Import

```typescript
import { PinDefaultButton } from './pin-default-button';
```

### 5b. Pins nos sliders

Ao lado do nome de cada parametro:

```tsx
{/* Vc slider */}
<div className="flex items-center gap-1">
  <span className="...">Vc</span>
  <PinDefaultButton paramKey="vc" currentValue={parametros.vc} />
</div>

{/* fz slider */}
<PinDefaultButton paramKey="fz" currentValue={parametros.fz} />

{/* ae slider */}
<PinDefaultButton paramKey="ae" currentValue={parametros.ae} />

{/* ap slider */}
<PinDefaultButton paramKey="ap" currentValue={parametros.ap} />
```

---

## 6. Testes

### 6a. `tests/store/machining-store.test.ts` (+6)

```typescript
// ─── Fase 8B: User Defaults ──────────────────────────────────────

it('setUserDefault saves value for a key', () => {
  const store = useMachiningStore.getState();
  store.setUserDefault('materialId', 5);
  expect(useMachiningStore.getState().userDefaults.materialId).toBe(5);
});

it('clearUserDefault removes a single key', () => {
  const store = useMachiningStore.getState();
  store.setUserDefault('materialId', 5);
  store.setUserDefault('vc', 200);
  store.clearUserDefault('materialId');
  const defaults = useMachiningStore.getState().userDefaults;
  expect(defaults.materialId).toBeUndefined();
  expect(defaults.vc).toBe(200);
});

it('clearAllUserDefaults resets to empty object', () => {
  const store = useMachiningStore.getState();
  store.setUserDefault('materialId', 5);
  store.setUserDefault('vc', 200);
  store.clearAllUserDefaults();
  expect(useMachiningStore.getState().userDefaults).toEqual({});
});

it('userDefaults is persisted in localStorage', () => {
  // Verify partialize includes userDefaults
  const store = useMachiningStore.getState();
  store.setUserDefault('diametro', 12);
  // Check localStorage contains the value
  const stored = JSON.parse(localStorage.getItem('tooloptimizer-cnc-settings') || '{}');
  expect(stored.state?.userDefaults?.diametro).toBe(12);
});

it('persist migration v2→v3 adds empty userDefaults', () => {
  // Simulate v2 data without userDefaults
  const v2Data = { objetivoUsinagem: 'balanceado', savedTools: [] };
  const migrated = migrate(v2Data, 2);
  expect(migrated.userDefaults).toEqual({});
});

it('onRehydrateStorage applies userDefaults to initial state', () => {
  // This test verifies the rehydration callback
  // Setup: manually set userDefaults in localStorage
  // Then: create store and check materialId matches
  const store = useMachiningStore.getState();
  store.setUserDefault('materialId', 3);
  // After rehydration, materialId should be 3
  // (exact test implementation depends on how to trigger rehydration in tests)
});
```

### 6b. `tests/components/config-panel.test.tsx` (+3)

```typescript
// ─── Fase 8B: Pin Default Buttons ──────────────────────────────────

it('renders pin button next to Material dropdown', () => {
  renderPanel();
  expect(screen.getByLabelText(/padrao.*materialId/i)).toBeInTheDocument();
});

it('clicking pin button sets user default', () => {
  renderPanel();
  const pin = screen.getByLabelText(/Tornar materialId padrao/i);
  fireEvent.click(pin);
  expect(useMachiningStore.getState().userDefaults.materialId).toBeDefined();
});

it('pinned button shows cyan color', () => {
  // Set default first
  useMachiningStore.getState().setUserDefault('materialId', useMachiningStore.getState().materialId);
  renderPanel();
  const pin = screen.getByLabelText(/Remover padrao.*materialId/i);
  expect(pin.querySelector('span')?.style.color).toBe('rgb(0, 217, 255)');
});
```

### 6c. `tests/components/fine-tune-panel.test.tsx` (+2)

```typescript
// ─── Fase 8B: Pin Default on Sliders ──────────────────────────────────

it('renders pin buttons for Vc, fz, ae, ap', () => {
  renderPanel();
  expect(screen.getByLabelText(/padrao.*vc/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/padrao.*fz/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/padrao.*ae/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/padrao.*ap/i)).toBeInTheDocument();
});

it('clicking Vc pin saves current Vc as default', () => {
  renderPanel();
  fireEvent.click(screen.getByLabelText(/Tornar vc padrao/i));
  expect(useMachiningStore.getState().userDefaults.vc).toBeDefined();
});
```

---

## 7. Impacto nos Testes

| Acao | Qtd |
|------|-----|
| Testes existentes alterados | 0 |
| Novos | +11 |

---

## 8. Criterio de Conclusao

- [ ] `UserDefaults` interface criada em types
- [ ] `userDefaults` state no store com 3 actions
- [ ] `userDefaults` incluido no `partialize`
- [ ] Persist migration v2→v3 funciona
- [ ] `onRehydrateStorage` aplica defaults aos inputs
- [ ] `PinDefaultButton` componente criado e reutilizavel
- [ ] Pin buttons ao lado dos 7 inputs no ConfigPanel
- [ ] Pin buttons ao lado dos 4 sliders no FineTunePanel
- [ ] Visual: cinza quando nao pinado, cyan quando pinado
- [ ] 11 testes novos passando
- [ ] `npx tsc --noEmit` — zero erros
- [ ] `npx vitest run` — todos passando
- [ ] Commit: `feat: tornar input padrao — pin defaults per-input v0.8.3`

---

## Navegacao

← [Fase 8A: Favoritar Simulacao](./FASE-8A-favoritar-simulacao.md)
