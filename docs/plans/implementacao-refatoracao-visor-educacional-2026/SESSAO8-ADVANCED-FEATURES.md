# Sessão 8 — Implementações Avançadas: Sincronização de Valores + Ranges Ideais

## Contexto Geral

Após completar os fixes da Sessão 7 (SGB acima, Safety %, visor destacado, slot machine), novas melhorias foram solicitadas para criar uma experiência **mais educacional e inteligente**:

1. **Sincronização de Inputs e Indicadores** — Valores nos inputs devem se mover junto com os indicadores (SGB) conforme o slider é manipulado. Tudo deve ser **entrelaçado pelos cálculos**.

2. **Ranges Ideais Dinâmicos** — Cada parâmetro (Vc, fz, ae, ap) tem uma **área verde** no SGB que representa o range ideal. Quando um resultado é favoritado, essa área verde deve **se reposicionar automaticamente** para usar os valores favoritados como referência.

3. **Configurabilidade de Ranges** — Deve haver uma **seção de Configurações** no aplicativo onde o usuário possa **editar os ranges ideais** para cada parâmetro, por material e tipo de operação.

Este documento descreve a **estrutura, lógica e fluxo** dessas implementações antes de iniciar a codificação.

---

## Problema 1 — Sincronização de Valores (Input + Indicador)

### O que está acontecendo agora?

**Fine-Tune Panel (Desktop + Mobile):**
- User arrasta o slider → `ajustarParametros()` é chamado imediatamente
- O valor no input é atualizado via store
- O SGB (SegmentedGradientBar) recalcula sua posição baseado no valor atual

**O problema:** Não há feedback visual **contínuo** que mostre: "Este valor está entrando em zona vermelha" enquanto você arrasta. A posição verde do SGB e o input parecem desconectados enquanto o slider está sendo arrastado.

### Solução Proposta

1. **O SGB já recebe `paramKey`** — ele lê o valor atual do store via `useMachiningStore((s) => s.resultado)` e `s.parametros`.
2. **O input já é controlado** — ele reflete o valor via `useMachiningStore((s) => s.parametros[key])`.
3. **Sincronização natural:** Se ambos leem o mesmo state, tudo já está sincronizado.

**Investigação necessária:**
- Confirmar que o `TouchSlider` está atualizando o store em **real-time** durante o drag (não apenas ao soltar)
- Confirmar que o SGB está recalculando a posição da zona verde a cada mudança
- Se houver lag ou delay, otimizar com `useCallback` ou `useMemo`

### Estrutura Proposta

**No `TouchSlider`:** Já existe `onChange` que chama `ajustarParametros` imediatamente.

```typescript
const handleTouchMove = useCallback((e: React.TouchEvent) => {
  e.preventDefault();
  const newVal = getValueFromX(e.touches[0].clientX);
  onChange(newVal);  // ← Atualiza store em tempo real
}, [onChange, getValueFromX]);
```

**No SGB:** Já existe lógica que recalcula a posição baseada no valor do store.

```typescript
const resultado = useMachiningStore((s) => s.resultado);
const parametros = useMachiningStore((s) => s.parametros);
// ... calcular pct baseado em parametros[paramKey]
```

**Resultado esperado:** Inputs, sliders e SGB sempre sincronizados porque leem do mesmo state.

---

## Problema 2 — Ranges Ideais Dinâmicos (Zona Verde)

### Como a zona verde funciona AGORA?

**Em `segmented-gradient-bar.tsx`:**

```typescript
// Zona "verde" (ideal) é hardcoded para 40%-60% do total
function SegBar({ paramKey, segments }: { ... }) {
  return (
    <>
      {/* Zona ideal — sempre 40%-60% */}
      <div style={{ left: '40%', width: '20%', background: 'green' }} />
      {/* Cursor que se move conforme o valor */}
      {/* Segmentos coloridos baseado na posição */}
    </>
  );
}
```

**Problema:** A zona verde (40%-60%) é **estática** para todos os materiais e operações. Isso não reflete a realidade:
- Para Aço Carbono em desbaste, a zona verde pode ser 80-150 m/min em Vc
- Para Alumínio em acabamento, a zona verde pode ser 300-500 m/min em Vc
- Esses ranges variam **por material, tipo de operação e ferramenta**

### Solução Proposta

#### Objetivo
Permitir que o usuário **salve simulações como favoritas**, e ao fazê-lo, **a zona verde se reposiciona** para usar os valores favoritados como nova referência.

**Lógica:**
1. Quando usuario clica "Favoritar" em um resultado de simulação:
   - Salvar: `{ materialId, tipoOperacao, parametros: { vc, fz, ae, ap }, timestamp, isFavorite: true }`
   - Além do histórico, **registrar esse combo de material+operação+valores como "range ideal"**
2. Na próxima vez que o usuário escolher **o mesmo material e operação**:
   - Recuperar o valor favoritado como **nova zona verde**
   - Zona verde = `[min_favoritado, max_favoritado]` OU `[favoritado - 10%, favoritado + 10%]` (TBD)
3. O SGB recalcula: posição anterior vs. posição ideal (favoritada)

#### Dados Raiz Necessários

Precisamos determinar **quais dados são a "raiz" para definir um range ideal:**

**Opção A: Material + Tipo de Operação (mais genérico)**
```typescript
interface IdealRange {
  materialId: number;
  tipoOperacao: TipoUsinagem;
  parametros: { vc: number; fz: number; ae: number; ap: number };
  timestamp: number;
}
```
- **Pro:** Simples, fácil de comparar
- **Con:** Ignora tipo de ferramenta — dois materiais+ops com diferentes ferramentas podem ter ranges diferentes

**Opção B: Material + Operação + Tipo de Ferramenta (mais preciso)**
```typescript
interface IdealRange {
  materialId: number;
  tipoOperacao: TipoUsinagem;
  ferramentaTipo: 'topo' | 'toroidal' | 'esferica';
  parametros: { vc: number; fz: number; ae: number; ap: number };
  timestamp: number;
}
```
- **Pro:** Mais preciso — fresas diferentes têm fórmulas diferentes
- **Con:** Mais granular, pode haver muitas combinações

**Recomendação:** Começar com **Opção A** (Material + Operação). Quando o usuário favorita um resultado, salvar a combinação. Depois, ao mudar material/operação, buscar o último resultado favoritado para essa combinação.

#### Estrutura de Dados (Store)

Adicionar ao `machiningStore` (ou criar novo store `idealRangesStore`):

```typescript
interface IdealRange {
  id: string;  // `${materialId}_${tipoOperacao}`
  materialId: number;
  tipoOperacao: TipoUsinagem;
  vC: { ideal: number; min: number; max: number };
  fz: { ideal: number; min: number; max: number };
  ae: { ideal: number; min: number; max: number };
  ap: { ideal: number; min: number; max: number };
  lastUpdated: number;  // timestamp do favorito mais recente
  favoriteCount: number;  // quantas vezes foi favoritado
}

// Store
export const useIdealRangesStore = create<IdealRangesState>((set) => ({
  ranges: [],  // array de IdealRange

  setIdealRange: (materialId, tipoOperacao, parametros) => {
    // Atualizar o range ideal para essa combinação
    // Baseado no último favorito
  },

  getIdealRange: (materialId, tipoOperacao) => {
    // Retornar o range ideal para essa combinação
  },

  clearIdealRange: (materialId, tipoOperacao) => {
    // Limpar (voltar ao padrão hardcoded)
  },
}));
```

#### Integração com o SGB

No `segmented-gradient-bar.tsx`:

```typescript
export function SegmentedGradientBar({
  paramKey,
  segments = 50,
  active = true,
  idealRange,  // NEW: { min: number; max: number }
}) {
  // Se idealRange foi passado, usar como zona verde
  // Senão, usar padrão 40%-60%
  const greenZoneStart = idealRange?.min ?? 40;
  const greenZoneWidth = (idealRange?.max ?? 60) - greenZoneStart;

  return (
    <div style={{ left: `${greenZoneStart}%`, width: `${greenZoneWidth}%`, background: 'green' }} />
    // ...resto
  );
}
```

No `mobile-fine-tune-section.tsx` e `fine-tune-panel.tsx`:

```typescript
const idealRange = useIdealRangesStore((s) =>
  s.getIdealRange(materialId, tipoOperacao)
);

// ...

<SegmentedGradientBar
  paramKey={key}
  segments={30}
  active={hasSimulated}
  idealRange={idealRange?.[key]}  // { min: 40, max: 60 } em %
/>
```

#### Como Atualizar o Range (Ao Favoritar)

No `history-page.tsx`, quando o usuário clica "Favoritar":

```typescript
const handleToggleFavorite = (entryId: string) => {
  const entry = historyEntries.find(e => e.id === entryId);

  toggleFavorite(entryId);

  if (entry && !entry.favorited) {  // Becoming favorite
    // Calcular %% baseado nos bounds do material+operação
    const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao);
    const ranges = {
      vc: { min: ((entry.parametros.vc - bounds.vc.min) / (bounds.vc.max - bounds.vc.min)) * 100, ... },
      fz: { ... },
      ae: { ... },
      ap: { ... },
    };

    useIdealRangesStore.setState((s) => {
      const key = `${entry.materialId}_${entry.tipoOperacao}`;
      return {
        ranges: [
          ...s.ranges.filter(r => r.id !== key),
          { id: key, materialId: entry.materialId, tipoOperacao: entry.tipoOperacao, ranges, lastUpdated: Date.now() }
        ]
      };
    });
  }
};
```

---

## Problema 3 — Configurabilidade de Ranges Ideais

### O que o usuário quer?

Poder **editar e ajustar** os ranges ideais sem precisar favoritar simulações. Uma **seção de Configurações** onde:

1. Selecionar Material + Tipo de Operação
2. Ver os ranges atuais (verde/amarelo/vermelho)
3. **Editar manualmente** o mín e máx para cada parâmetro

### Estrutura Proposta

#### Nova Página: `Settings Page` ou `Configurações`

**URL:** `/configuracoes` (mobile) + `/settings` (desktop)

**Layout:**

```
┌─ Configurações ──────────────────────┐
│                                       │
│ [Material] [Tipo de Operação]  🔄   │
│ Material da Peça                      │
│ └─ [select: Aço Carbono]              │
│                                       │
│ Tipo de Usinagem                      │
│ └─ [radio: Desbaste/Semi/Acabamento]  │
│                                       │
│ ────────────────────────────────────  │
│ RANGES IDEAIS PARA Aço Carbono        │
│            Desbaste                   │
│ ────────────────────────────────────  │
│                                       │
│ [Vc — Velocidade de Corte]            │
│  Mín: [80] Máx: [150] m/min           │
│  SGB preview [█████████ ]             │
│                                       │
│ [fz — Avanço/Dente]                   │
│  Mín: [0.1] Máx: [0.3] mm             │
│  SGB preview [███████    ]            │
│                                       │
│ [ae — Eng. Radial]                    │
│  Mín: [2] Máx: [5] mm                 │
│  SGB preview [...███....]             │
│                                       │
│ [ap — Prof. Axial]                    │
│  Mín: [0.5] Máx: [2.5] mm             │
│  SGB preview [██████    ]             │
│                                       │
│ [Salvar] [Resetar para Padrão]        │
│                                       │
└───────────────────────────────────────┘
```

#### Dados Raiz: `config-ranges-store`

```typescript
interface ConfigRange {
  id: string;  // `${materialId}_${tipoOperacao}`
  materialId: number;
  tipoOperacao: TipoUsinagem;
  ranges: {
    vc: { min: number; max: number };
    fz: { min: number; max: number };
    ae: { min: number; max: number };
    ap: { min: number; max: number };
  };
  source: 'manual' | 'auto-favorite';  // manual = usuário editou; auto-favorite = favorito automático
}

export const useConfigRangesStore = create<ConfigRangesState>((set) => ({
  configs: [],  // persistido em localStorage

  setRangeForMaterialOp: (materialId, tipoOperacao, ranges) => {
    // Salvar range customizado
  },

  getRangeForMaterialOp: (materialId, tipoOperacao) => {
    // Retornar range customizado OU padrão
  },

  resetRangeToDefault: (materialId, tipoOperacao) => {
    // Voltar aos dados de fábrica (Kienzle, Sandvik, etc)
  },

  listAllRanges: () => {
    // Listar todos os ranges customizados
  },
}));
```

#### Página Component: `SettingsPage.tsx`

**Estrutura:**

```typescript
export function SettingsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<TipoUsinagem | null>(null);

  const currentConfig = useConfigRangesStore((s) =>
    selectedMaterial && selectedOperation
      ? s.getRangeForMaterialOp(selectedMaterial, selectedOperation)
      : null
  );

  const [editingRanges, setEditingRanges] = useState(currentConfig?.ranges ?? null);
  const [isDirty, setIsDirty] = useState(false);

  const handleSaveRanges = () => {
    if (selectedMaterial && selectedOperation) {
      useConfigRangesStore.setState((s) => ({
        configs: [...s.configs.filter(c => c.id !== `${selectedMaterial}_${selectedOperation}`), {
          id: `${selectedMaterial}_${selectedOperation}`,
          materialId: selectedMaterial,
          tipoOperacao: selectedOperation,
          ranges: editingRanges,
          source: 'manual',
          lastModified: Date.now(),
        }]
      }));
      setIsDirty(false);
    }
  };

  return (
    <div>
      {/* Material + Operation selectors */}
      {/* Range editors (inputs para min/max de cada param) */}
      {/* SGB preview para cada param */}
      {/* Save button */}
    </div>
  );
}
```

#### Ligação com o Fine-Tune Panel

No `mobile-fine-tune-section.tsx` e `fine-tune-panel.tsx`, ao renderizar o SGB:

```typescript
const configRanges = useConfigRangesStore((s) =>
  s.getRangeForMaterialOp(materialId, tipoOperacao)
);

const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao);

// Converter os ranges em % relativo aos bounds
const idealRange = {
  vc: {
    min: ((configRanges?.ranges.vc.min ?? bounds.vc.min) - bounds.vc.min) / (bounds.vc.max - bounds.vc.min) * 100,
    max: ((configRanges?.ranges.vc.max ?? bounds.vc.max) - bounds.vc.min) / (bounds.vc.max - bounds.vc.min) * 100,
  },
  // ... same for fz, ae, ap
};

<SegmentedGradientBar
  paramKey={key}
  segments={30}
  active={hasSimulated}
  idealRange={idealRange[key]}
/>
```

---

## Dados Raiz: O que são os "valores raiz"?

Para implementar ranges ideais configuráveis, precisamos saber:

1. **De onde vêm os values padrão?**
   - `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md` — tabelas de Vc recomendados por material
   - `docs/technical/PRD_Velocidades_Corte_CNC.md` — ranges de corte
   - Formulas Kienzle e CTF — cálculos baseados em propriedades do material

2. **O que é "idealizado"?**
   - Vc (velocidade corte): `vC_min até vc_max` conforme material e operação (tabelas)
   - fz (avanço/dente): `0.05 até 0.3 mm` conforme ferramenta e material
   - ae (engajamento radial): `0.1D até 0.5D` (onde D = diâmetro)
   - ap (profundidade axial): `0.5D até 3D` conforme tipo de operação

3. **Onde armazenar dados customizados?**
   - **localStorage:** Cada usuário pode ter seus próprios ranges (máquina específica, experiência)
   - **Estrutura:** `tooloptimizer_config_ranges_${v2}` como JSON

#### Estrutura de Migração (Fase 1)

No `useConfigRangesStore`:

```typescript
// Valores hardcoded padrão (fonte Kienzle + tabelas)
const DEFAULT_RANGES: Record<number, Record<TipoUsinagem, ConfigRange>> = {
  1: {  // Aço Carbono
    [TipoUsinagem.DESBASTE]: {
      vc: { min: 80, max: 150 },
      fz: { min: 0.1, max: 0.3 },
      ae: { min: 2, max: 5 },
      ap: { min: 0.5, max: 2.5 },
    },
    [TipoUsinagem.SEMI_ACABAMENTO]: { ... },
    [TipoUsinagem.ACABAMENTO]: { ... },
  },
  2: { /* Alumínio */ },
  // ... etc para cada material
};

// On init:
const loadDefaults = () => {
  const stored = localStorage.getItem('tooloptimizer_config_ranges_v2');
  return stored ? JSON.parse(stored) : DEFAULT_RANGES;
};
```

---

## Fluxo Completo (Resumo Visual)

```
┌─ User abre Fine-Tune ────────────────────┐
│                                           │
│  Material: Aço Carbono                    │
│  Operação: Desbaste                       │
│                                           │
│  [Configurações] → SettingsPage           │
│                   └─ Edita ranges         │
│                   └─ Salva em store       │
│                                           │
│  ┌─ Fine-Tune Slider ────────────────┐   │
│  │                                   │   │
│  │  Vc: [100] m/min                  │   │
│  │  SGB: ────█████████────           │   │
│  │         ↑ zona verde ↑            │   │
│  │      (80-150 m/min)               │   │
│  │                                   │   │
│  │  User arrasta → valor atualiza    │   │
│  │             → SGB se move         │   │
│  │             → tudo sincronizado   │   │
│  │                                   │   │
│  └───────────────────────────────────┘   │
│                                           │
│  [Simular] → 1.5s animation + jackpot   │
│                                           │
│  Resultado: 120 RPM, 0.08 mm/dente ...  │
│  [⭐ Favoritar] → Salva este resultado   │
│               → Atualiza zona verde      │
│                  (nova referência)       │
│                                           │
└───────────────────────────────────────────┘
```

---

## Resumo de Implementação

### Sessão 8a: Sincronização (2-3 horas)
- [ ] Investigar se `TouchSlider` já atualiza em real-time
- [ ] Investigar se SGB recalcula posição dinamicamente
- [ ] Otimizar com `useCallback`/`useMemo` se houver lag
- [ ] Testes de sincronização (arrastar slider → input + SGB mudam juntos)

### Sessão 8b: Ranges Ideais (3-4 horas)
- [ ] Criar `useIdealRangesStore` (Zustand)
- [ ] Adicionar `idealRange` prop ao SGB
- [ ] Integrar com `toggleFavorite` no history
- [ ] Integrar com fine-tune components
- [ ] Testes: favoritar → zona verde se move

### Sessão 8c: Configurações (4-5 horas)
- [ ] Criar `useConfigRangesStore` com defaults Kienzle
- [ ] Criar `SettingsPage.tsx`
- [ ] Inputs de edição para min/max
- [ ] SGB preview em tempo real
- [ ] Salvar/resetar/listar ranges
- [ ] Navegação (menu → settings)
- [ ] Testes: editar ranges → visor atualiza

### Total: ~10 horas

---

## Próximas Decisões

Antes de iniciar a Sessão 8, responda:

1. **Ranges ideais:** Devo usar **Material + Operação** (A) ou **Material + Operação + Ferramenta** (B)?
2. **Zona verde:** Deve ser `[min_favoritado, max_favoritado]` ou `[favoritado ± 10%]`?
3. **Configurações:** Deseja uma seção separada (Settings Page) ou edição inline?
4. **Defaults:** Os valores padrão devem vir de `DADOS_TECNICOS_KIENZLE_E_VC.md`?

Responda e o Plano Completo da Sessão 8 será criado.
