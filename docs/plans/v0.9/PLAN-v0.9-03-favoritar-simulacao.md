# PLAN v0.9-03 — Botão Favoritar Simulação

> **Status:** 📋 Pronto para implementar
> **Complexidade:** Média
> **Versão alvo:** v0.9.2

---

## Objetivo

Adicionar botão ⭐ para o operador favoritar simulações que funcionaram na prática. Dois pontos de entrada: (a) no painel de resultados do dashboard após simular, (b) em cada card do histórico. Os favoritos são persistidos e filtráveis.

---

## Decisão Arquitetural: `HistoricoCalculo` (history-store)

O plano original mencionava `validatedSimulations` (machining-store), mas a análise do código revelou que:

- **`simular()` já salva automaticamente** cada simulação no `history-store` via `useHistoryStore.getState().addEntry()` (machining-store.ts:464)
- A **history-page** exibe `HistoricoCalculo` entries do `history-store`
- Usar `validatedSimulations` criaria sistema paralelo desnecessário

**Decisão:** Adicionar `favorited` ao `HistoricoCalculo` no `history-store`. Sistema único, simples, já persistido.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/types/index.ts` | Adicionar `favorited?: boolean` em `HistoricoCalculo` |
| `src/store/history-store.ts` | Adicionar `toggleFavorite(id)` + filtro `favorited` em `HistoryFilters` |
| `src/components/results-panel.tsx` | Botão ⭐ no topo (ao lado do `ToolSummaryViewer`) |
| `src/pages/history-page.tsx` | Botão ⭐ em cada card + filtro "Favoritos" + contador |
| `tests/store/history-store.test.ts` | Testes de toggleFavorite + filtro |
| `tests/components/results-panel.test.tsx` | Testes do botão ⭐ |

---

## Detalhamento Técnico

### 1. Tipo: `src/types/index.ts` (linha 218-229)

```diff
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
+  favorited?: boolean;
 }
```

Campo opcional (`?`) para retrocompatibilidade com dados existentes no localStorage. Entries antigas sem campo = `false`.

### 2. Store: `src/store/history-store.ts`

#### 2a. Filtro favorited (interface `HistoryFilters`, linha 11-15):

```diff
 interface HistoryFilters {
   materialNome: string;
   tipoOperacao: TipoUsinagem | 'todos';
   feedback: FeedbackOperador | 'todos';
+  favorited: boolean | 'todos';
 }
```

#### 2b. Default filter (linha 35-39):

```diff
 const DEFAULT_FILTERS: HistoryFilters = {
   materialNome: '',
   tipoOperacao: 'todos',
   feedback: 'todos',
+  favorited: 'todos',
 };
```

#### 2c. Nova action `toggleFavorite` (interface `HistoryActions`, linha 22-33):

```diff
 interface HistoryActions {
   addEntry: (...) => void;
   removeEntry: (id: string) => void;
   clearHistory: () => void;
   setFeedback: (id: string, feedback: FeedbackOperador) => void;
   setNotas: (id: string, notas: string) => void;
+  toggleFavorite: (id: string) => void;
+  getFavoriteCount: () => number;
   setFilters: (f: Partial<HistoryFilters>) => void;
   resetFilters: () => void;
   getFilteredEntries: () => HistoricoCalculo[];
   exportHistory: () => string;
   importHistory: (json: string) => boolean;
 }
```

#### 2d. Implementação `toggleFavorite` (após `setNotas`, ~linha 92):

```typescript
toggleFavorite: (id) => {
  set((state) => ({
    entries: state.entries.map((e) =>
      e.id === id ? { ...e, favorited: !e.favorited } : e
    ),
  }));
},

getFavoriteCount: () => {
  return get().entries.filter((e) => e.favorited).length;
},
```

#### 2e. Filtro favorited em `getFilteredEntries` (linha 102-116):

Adicionar após o filtro de `feedback` (linha 111-113):

```typescript
if (filters.favorited !== 'todos' && Boolean(e.favorited) !== filters.favorited) {
  return false;
}
```

### 3. Dashboard: `src/components/results-panel.tsx`

#### 3a. Imports adicionais (linha 1-8):

```diff
 import { useMachiningStore } from '@/store';
+import { useHistoryStore } from '@/store/history-store';
```

#### 3b. Acessar history store dentro do componente (após linha 43):

```typescript
const historyEntries = useHistoryStore((s) => s.entries);
const toggleFavorite = useHistoryStore((s) => s.toggleFavorite);

// Most recent entry = the one just created by simular()
const latestEntry = historyEntries[0];
const isFavorited = latestEntry?.favorited ?? false;
```

#### 3c. Botão ⭐ (após `<ToolSummaryViewer />`, linha 64):

```tsx
{/* Favorite button — visible only when resultado exists */}
{storeResultado && latestEntry && (
  <button
    onClick={() => toggleFavorite(latestEntry.id)}
    aria-label={isFavorited ? 'Remover favorito' : 'Favoritar simulação'}
    className={`absolute top-3 right-3 text-xl transition-all hover:scale-110 ${
      isFavorited
        ? 'text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]'
        : 'text-gray-500 hover:text-yellow-400/70'
    }`}
  >
    <span className="material-symbols-outlined text-[22px]">
      {isFavorited ? 'star' : 'star_border'}
    </span>
  </button>
)}
```

**Nota:** O container pai `<div className="flex flex-col gap-3">` (linha 63) precisa de `relative` para posicionar o botão absolute:

```diff
- <div className="flex flex-col gap-3">
+ <div className="flex flex-col gap-3 relative">
```

### 4. Histórico: `src/pages/history-page.tsx`

#### 4a. Botão ⭐ em cada card

No componente `HistoryEntryCard` (linha ~278), adicionar botão ⭐ na summary row, ao lado do timestamp:

```tsx
<button
  onClick={(e) => { e.stopPropagation(); toggleFavorite(entry.id); }}
  aria-label={entry.favorited ? 'Remover favorito' : 'Favoritar'}
  className={`text-lg transition-all hover:scale-110 ${
    entry.favorited
      ? 'text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.4)]'
      : 'text-gray-600 hover:text-yellow-400/60'
  }`}
>
  <span className="material-symbols-outlined text-[18px]">
    {entry.favorited ? 'star' : 'star_border'}
  </span>
</button>
```

**Posição:** Na summary row, entre o timestamp e o material/operação info (linhas 278-286). Usar `e.stopPropagation()` para não expandir o card ao clicar ⭐.

#### 4b. Filtro "Favoritos" no header da página

Junto com os filtros existentes (material, tipo operação, feedback), adicionar toggle:

```tsx
<button
  onClick={() => {
    const current = filters.favorited;
    setFilters({ favorited: current === true ? 'todos' : true });
  }}
  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
    filters.favorited === true
      ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
      : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
  }`}
>
  <span className="material-symbols-outlined text-[16px]">star</span>
  Favoritos ({favoriteCount})
</button>
```

#### 4c. Store access no history-page:

```typescript
const toggleFavorite = useHistoryStore((s) => s.toggleFavorite);
const favoriteCount = useHistoryStore((s) => s.getFavoriteCount());
const filters = useHistoryStore((s) => s.filters);
const setFilters = useHistoryStore((s) => s.setFilters);
```

---

## Testes

### Novos testes: `tests/store/history-store.test.ts`

```
- 'toggleFavorite: sets favorited to true on entry'
- 'toggleFavorite: toggles favorited from true to false'
- 'toggleFavorite: does nothing for non-existent id'
- 'getFavoriteCount: returns 0 when no favorites'
- 'getFavoriteCount: returns correct count'
- 'getFilteredEntries: filters by favorited=true'
- 'getFilteredEntries: favorited="todos" shows all entries'
- 'existing entries without favorited field default to false'
```

### Testes: `tests/components/results-panel.test.tsx`

```
- 'shows star_border icon when resultado exists and not favorited'
- 'shows star icon when resultado is favorited'
- 'clicking star toggles favorite on latest history entry'
- 'star button is hidden when resultado is null'
```

### Testes: `tests/pages/history-page.test.tsx` (se existir)

```
- 'each card shows favorite button'
- 'clicking favorite button toggles star icon'
- 'favoritos filter button shows count'
- 'clicking favoritos filter shows only favorited entries'
```

---

## Dependências

- **Item #8** (Rodapé Coluna Esquerda) usa acesso rápido a favoritos — implementar #3 antes de #8
- **Nenhuma dependência de entrada** — pode começar independente

---

## Riscos / Cuidados

- **Retrocompatibilidade:** `favorited?: boolean` é opcional — entries antigas sem campo = `false`. `Boolean(undefined)` = `false`. OK.
- **Persistência:** `history-store` já usa Zustand persist — favoritos salvos automaticamente. Sem migração necessária (campo opcional).
- **Identity:** Não é necessário detectar "mesma simulação" — cada entry tem ID único, ⭐ opera no ID.
- **Performance:** `getFavoriteCount()` itera entries em cada render. Com max 50 entries (`HISTORICO_MAX_ENTRIES`), é irrelevante.
- **Não confundir** com `savedTools` (ferramentas salvas no machining-store) — favoritar salva preferência sobre simulação do histórico.
- **results-panel:** O `latestEntry = entries[0]` assume que a entry mais recente é a que corresponde ao resultado atual. Isso é correto porque `simular()` chama `addEntry()` sincronamente antes de retornar.

---

## Critérios de Conclusão

- [ ] `favorited?: boolean` adicionado ao tipo `HistoricoCalculo`
- [ ] `toggleFavorite(id)` e `getFavoriteCount()` implementados no history-store
- [ ] Filtro `favorited` integrado em `getFilteredEntries()`
- [ ] Botão ⭐ funcional no results-panel (visível pós-simulação)
- [ ] Botão ⭐ funcional em cada card da history-page
- [ ] Filtro "Favoritos (N)" na history-page
- [ ] Estrela amarela com glow quando favoritada
- [ ] Estrela cinza outline quando não favoritada
- [ ] Persistência: favoritar → fechar app → reabrir → favorito mantido
- [ ] Testes passando (store + componentes)
- [ ] Build sem erros TypeScript
