# Fase 8A — Favoritar Simulacao no Historico

> **Redesign Dashboard Principal v0.8.0+**
> **Status:** ⬜ Pendente
> **Versao alvo:** v0.8.2
> **Dependencia:** Fase 7 concluida (ou independente — sem conflito de arquivos)
> **Complexidade:** MEDIA (~50 linhas, 8 testes)

---

## Objetivo

Adicionar botao ⭐ em cada entry do historico para marcar RESULTADOS favoritos. Filtro para ver apenas favoritos. Permite ao operador identificar rapidamente os melhores parametros ja testados.

**IMPORTANTE:** Favoritar e sobre RESULTADOS de simulacao (no historico). NAO confundir com "Tornar Input Padrao" (Fase 8B) que e sobre INPUTS.

---

## Arquivos a Modificar

| Arquivo | Acao | Tipo |
|---------|------|------|
| `src/types/index.ts` | Adicionar `isFavorited: boolean` ao `HistoricoCalculo` | Modificar |
| `src/store/history-store.ts` | Nova action `toggleFavorite(id)`, filtro `onlyFavorites`, persist v1→v2 migration | Modificar |
| `src/pages/history-page.tsx` | Botao ⭐ em cada card, toggle "Apenas Favoritos" nos filtros | Modificar |
| `tests/store/history-store.test.ts` | +5 testes | Modificar |
| `tests/pages/history-page.test.tsx` | +3 testes | Modificar |

---

## 1. Tipo — `src/types/index.ts`

Adicionar campo ao `HistoricoCalculo` (L218-229):

```typescript
export interface HistoricoCalculo {
  id: string;
  timestamp: number;
  materialNome: string;
  materialId: number;
  ferramenta: Ferramenta;
  tipoOperacao: TipoUsinagem;
  parametros: ParametrosUsinagem;
  resultado: ResultadoUsinagem;
  feedback: FeedbackOperador;
  notas: string;
  isFavorited: boolean;  // NEW — star in history
}
```

---

## 2. Store — `src/store/history-store.ts`

### 2a. Filtros — adicionar `onlyFavorites`

```typescript
interface HistoryFilters {
  materialNome: string;
  tipoOperacao: TipoUsinagem | 'todos';
  feedback: FeedbackOperador | 'todos';
  onlyFavorites: boolean;  // NEW
}

const DEFAULT_FILTERS: HistoryFilters = {
  materialNome: '',
  tipoOperacao: 'todos',
  feedback: 'todos',
  onlyFavorites: false,  // NEW
};
```

### 2b. Actions — adicionar `toggleFavorite`

```typescript
interface HistoryActions {
  // ... existentes ...
  toggleFavorite: (id: string) => void;  // NEW
}
```

### 2c. Implementacao

```typescript
addEntry: (entry) => {
  const newEntry: HistoricoCalculo = {
    ...entry,
    id: generateId(),
    timestamp: Date.now(),
    feedback: null,
    notas: '',
    isFavorited: false,  // NEW — default not favorited
  };
  // ... resto igual
},

toggleFavorite: (id) => {
  set((state) => ({
    entries: state.entries.map((e) =>
      e.id === id ? { ...e, isFavorited: !e.isFavorited } : e
    ),
  }));
},
```

### 2d. Filtro `getFilteredEntries` — adicionar check

```typescript
getFilteredEntries: () => {
  const { entries, filters } = get();
  return entries.filter((e) => {
    if (filters.onlyFavorites && !e.isFavorited) return false;  // NEW
    if (filters.materialNome && !e.materialNome.toLowerCase().includes(filters.materialNome.toLowerCase())) {
      return false;
    }
    // ... resto igual
  });
},
```

### 2e. Persist migration v1 → v2

```typescript
{
  name: 'tooloptimizer-cnc-history',
  version: 2,  // WAS: 1
  migrate: (persisted: unknown, version: number) => {
    const state = persisted as HistoryState;
    if (version < 2) {
      // Add isFavorited to existing entries
      state.entries = state.entries.map((e) => ({
        ...e,
        isFavorited: (e as HistoricoCalculo).isFavorited ?? false,
      }));
      // Add onlyFavorites to filters
      state.filters = { ...state.filters, onlyFavorites: false };
    }
    return state;
  },
},
```

---

## 3. UI — `src/pages/history-page.tsx`

### 3a. Adicionar ao destructuring do store

```typescript
const toggleFavorite = useHistoryStore((s) => s.toggleFavorite);
```

### 3b. Botao ⭐ em cada card

Dentro de cada entry card, ANTES do botao expand/chevron:

```tsx
<button
  aria-label={entry.isFavorited ? 'Remover favorito' : 'Adicionar favorito'}
  onClick={(e) => { e.stopPropagation(); toggleFavorite(entry.id); }}
  className="p-1 hover:bg-white/10 rounded transition-colors"
  title={entry.isFavorited ? 'Remover favorito' : 'Favoritar esta simulacao'}
>
  <span
    className="material-symbols-outlined text-lg"
    style={{ color: entry.isFavorited ? '#f39c12' : 'rgba(255,255,255,0.3)' }}
  >
    {entry.isFavorited ? 'star' : 'star_outline'}
  </span>
</button>
```

**Notas:**
- `stopPropagation` — click na estrela NAO expande o card
- `style={{}}` — cor via inline (NAO classe Tailwind dinamica, regra do projeto)
- `#f39c12` = amarelo do design system (seg-amarelo)

### 3c. Filtro "Apenas Favoritos"

Na secao de filtros, adicionar toggle:

```tsx
<button
  onClick={() => setFilters({ onlyFavorites: !filters.onlyFavorites })}
  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
    filters.onlyFavorites
      ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
      : 'border-white/10 text-white/50 bg-white/5 hover:bg-white/10'
  }`}
>
  ⭐ Apenas Favoritos
</button>
```

### 3d. Counter de favoritos no header

```tsx
const favoriteCount = entries.filter((e) => e.isFavorited).length;

// No header, ao lado do total de entries:
{favoriteCount > 0 && (
  <span className="text-xs text-yellow-400/70 ml-2">
    ({favoriteCount} favorito{favoriteCount !== 1 ? 's' : ''})
  </span>
)}
```

---

## 4. Testes

### 4a. `tests/store/history-store.test.ts` (+5)

```typescript
// ─── Fase 8A: Favoritar Simulacao ──────────────────────────────────────

it('new entries have isFavorited = false by default', () => {
  store.addEntry(mockEntry);
  expect(store.entries[0].isFavorited).toBe(false);
});

it('toggleFavorite flips isFavorited to true', () => {
  store.addEntry(mockEntry);
  const id = store.entries[0].id;
  store.toggleFavorite(id);
  expect(store.entries[0].isFavorited).toBe(true);
});

it('toggleFavorite flips back to false on second call', () => {
  store.addEntry(mockEntry);
  const id = store.entries[0].id;
  store.toggleFavorite(id);
  store.toggleFavorite(id);
  expect(store.entries[0].isFavorited).toBe(false);
});

it('onlyFavorites filter shows only favorited entries', () => {
  store.addEntry(mockEntry);
  store.addEntry({ ...mockEntry, materialNome: 'Outro' });
  store.toggleFavorite(store.entries[0].id);
  store.setFilters({ onlyFavorites: true });
  const filtered = store.getFilteredEntries();
  expect(filtered).toHaveLength(1);
  expect(filtered[0].isFavorited).toBe(true);
});

it('persist migration v1→v2 adds isFavorited to existing entries', () => {
  // Simular dados v1 sem isFavorited
  const v1Data = { entries: [{ id: '1', timestamp: 1, isFavorited: undefined }], filters: {} };
  const migrated = migrate(v1Data, 1);
  expect(migrated.entries[0].isFavorited).toBe(false);
});
```

### 4b. `tests/pages/history-page.test.tsx` (+3)

```typescript
// ─── Fase 8A: Favoritar UI ──────────────────────────────────────

it('renders star button for each history entry', () => {
  // Setup: add entry to history store
  renderPage();
  expect(screen.getByLabelText('Adicionar favorito')).toBeInTheDocument();
});

it('clicking star toggles isFavorited', () => {
  renderPage();
  fireEvent.click(screen.getByLabelText('Adicionar favorito'));
  expect(useHistoryStore.getState().entries[0].isFavorited).toBe(true);
  expect(screen.getByLabelText('Remover favorito')).toBeInTheDocument();
});

it('Apenas Favoritos filter shows only starred entries', () => {
  // Setup: 2 entries, 1 favorited
  renderPage();
  fireEvent.click(screen.getByText(/Apenas Favoritos/));
  // Should show only 1 entry
});
```

---

## 5. Impacto nos Testes

| Acao | Qtd |
|------|-----|
| Testes existentes alterados | 0 (campo novo com default false — testes existentes nao quebram) |
| Novos | +8 |

**Nota:** Testes que criam `HistoricoCalculo` manualmente precisarao incluir `isFavorited: false` no mock se TypeScript strict reclamar.

---

## 6. Criterio de Conclusao

- [ ] `isFavorited: boolean` adicionado ao tipo `HistoricoCalculo`
- [ ] `addEntry()` seta `isFavorited: false` por default
- [ ] `toggleFavorite(id)` alterna o campo
- [ ] `getFilteredEntries()` respeita filtro `onlyFavorites`
- [ ] Persist migration v1→v2 adiciona `isFavorited: false` a entries existentes
- [ ] Botao ⭐ em cada card do historico com `stopPropagation`
- [ ] Toggle "Apenas Favoritos" nos filtros
- [ ] Counter de favoritos no header
- [ ] 8 testes novos passando
- [ ] `npx tsc --noEmit` — zero erros
- [ ] `npx vitest run` — todos passando
- [ ] Commit: `feat: favoritar simulacao no historico v0.8.2`

---

## Navegacao

← [Fase 7: Objetivo de Usinagem](./FASE-7-v2-objetivo-usinagem.md)
→ [Fase 8B: Tornar Input Padrao](./FASE-8B-tornar-input-padrao.md)
