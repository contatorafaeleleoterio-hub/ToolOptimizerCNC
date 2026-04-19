# ITEM-10 — Sistema de Favoritos ("Fotografia de Resultado")

**Status:** ⬜ Pendente
**Grupo:** E — Sistema de Favoritos

---

## Conceito

Quando o usuário clica "Favoritar" em um resultado, o sistema deve salvar uma fotografia completa daquele momento: todos os dados que estão sendo exibidos no visor de resultados naquele instante.

---

## Regra de Implementação

- Identificar quais campos o visor de resultados exibe atualmente
- O favorito deve salvar exatamente esses campos — nem mais, nem menos
- Estrutura dinâmica: quando o visor for atualizado no futuro, os novos campos devem ser incluídos automaticamente (não hardcode de campos)

---

## Estrutura do Favorito

Cada favorito deve conter:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Único — timestamp + hash |
| `timestamp` | string | Data/hora do salvamento |
| `materialId` | string | Contexto do material |
| `tipoOperacao` | string | Contexto da operação |
| `ferramentaTipo` | string | Contexto da ferramenta |
| `parametros` | object | Inputs do usuário: Vc, fz, ae, ap |
| `resultado` | object | Snapshot completo do objeto de resultado do store no momento do clique |
| `editedAt` | string \| null | null por padrão, preenchido se usuário editar |
| `userNote` | string | String vazia por padrão, editável |

---

## Armazenamento

- Persistir em localStorage com chave `fenix_favorites_v1`
- Usar Zustand store separado: `useFavoritesStore`
- Limite sugerido: 50 favoritos (remover o mais antigo ao ultrapassar)

---

## Edição de Favorito

- Cada favorito deve ter botão "Editar"
- Ao editar: abrir modal ou inline form com os campos de `parametros` e `userNote`
- Ao salvar edição: atualizar `parametros`, recalcular resultado com base nos novos parâmetros, atualizar `editedAt`
- O campo `resultado` editado deve usar a mesma função de cálculo do motor principal

---

## Checklist Pré-Implementação

```bash
# 1. Mapear stores existentes
ls src/store/

# 2. Verificar se useFavoritesStore já existe
grep -r "favorites" src/ --include="*.ts" --include="*.tsx"

# 3. Localizar botão favoritar existente (se houver)
grep -r "favorit\|Favorit" src/ --include="*.tsx"
```

---

## Regras Gerais

- Criar store separado `useFavoritesStore` (não estender machiningStore — responsabilidades distintas)
- O visor de resultados está em atualização — não hardcodar campos de resultado. Usar spread do objeto resultado do store.
- Estilo visual: seguir dark theme existente do projeto (sem introduzir novos tokens de cor)
- Botão ★ já existe em `results-panel.tsx` e `history-page.tsx` — reutilizar lógica, conectar ao novo store

---

## Mapeamento Técnico do Codebase

### Sistema de Favoritos JÁ EXISTENTE (parcial)

> **IMPORTANTE:** Já existe um sistema de favoritos simples no `history-store.ts`. Este ITEM cria um sistema **separado e mais robusto**.

| Elemento existente | Arquivo | Linhas | O que faz |
|-------------------|---------|--------|-----------|
| `HistoricoCalculo.favorited?: boolean` | `src/types/index.ts` | 205 | Campo opcional na entry de histórico |
| `toggleFavorite(id)` | `src/store/history-store.ts` | 99-102 | Toggle `favorited` na entry |
| `getFavoriteCount()` | `src/store/history-store.ts` | 105 | Conta entries favoritadas |
| Filtro "Apenas Favoritos" | `src/pages/history-page.tsx` | 202-214 | Toggle filter no UI |
| Botão ★ no histórico | `src/pages/history-page.tsx` | 362-375 | Star icon com Material Symbols |
| Botão ★ no visor | `src/components/results-panel.tsx` | 80-98 | Favorita `latestEntry` do histórico |
| Contagem no sidebar | `src/components/sidebar-footer.tsx` | 8-9 | `entries.filter(e => e.favorited).length` |

**Diferença entre sistemas:**
| | history-store (existente) | favorites-store (novo — ITEM-10) |
|---|---|---|
| Dado salvo | `HistoricoCalculo` (com feedback, notas) | `FavoritoCompleto` (snapshot enriquecido) |
| Edição | Só feedback/notas | Parâmetros + recálculo |
| Persistência | `tooloptimizer-cnc-history` (localStorage) | `fenix_favorites_v1` (localStorage) |
| Limite | 50 entries (circular buffer) | 50 favoritos (FIFO) |
| Relação | Entry de histórico com flag boolean | Store independente com snapshot completo |

### Componentes Envolvidos

| Componente | Arquivo | Linhas | Relevância |
|------------|---------|--------|------------|
| `ResultsPanel` | `src/components/results-panel.tsx` | 80-98 | Botão ★ → migrar de `useHistoryStore` para `useFavoritesStore` |
| `SidebarFooter` | `src/components/sidebar-footer.tsx` | 8-9, 16-25 | Contagem favoritos + link para `/history?filter=favoritos` |
| `useHistoryStore` | `src/store/history-store.ts` | 99-105 | `toggleFavorite` + `getFavoriteCount` existentes |
| `useMachiningStore` | `src/store/machining-store.ts` | 50-68 | Fonte dos dados do snapshot: `resultado`, `materialId`, `ferramenta`, etc. |

### Interface Proposta: FavoritoCompleto

```ts
// src/types/index.ts — ADICIONAR após L245 (fim do arquivo)
interface FavoritoCompleto {
  id: string;                      // crypto.randomUUID()
  timestamp: string;               // ISO 8601
  materialId: number;              // store.materialId (para lookup futuro)
  materialNome: string;            // material.nome (snapshot — evita lookup)
  tipoOperacao: TipoUsinagem;      // store.tipoOperacao
  ferramenta: Ferramenta;          // store.ferramenta (snapshot completo)
  parametros: ParametrosUsinagem;  // store.parametros (snapshot)
  resultado: ResultadoUsinagem;    // store.resultado (snapshot completo)
  safetyFactor: number;            // store.safetyFactor
  editedAt: string | null;         // null por padrão, ISO 8601 se editado
  userNote: string;                // '' por padrão, editável
}
```

### Store Actions Propostas

```ts
interface FavoritesActions {
  addFavorite: (fav: Omit<FavoritoCompleto, 'id' | 'timestamp' | 'editedAt' | 'userNote'>) => void;
  removeFavorite: (id: string) => void;
  updateFavorite: (id: string, updates: Partial<Pick<FavoritoCompleto, 'parametros' | 'resultado' | 'userNote'>>) => void;
  getByCombo: (materialId: number, tipoOperacao: TipoUsinagem, ferramentaTipo: Ferramenta['tipo']) => FavoritoCompleto | undefined;
  isFavorited: (materialId: number, tipoOperacao: TipoUsinagem, parametros: ParametrosUsinagem) => boolean;
}
```

---

## Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/types/index.ts` | Adicionar `FavoritoCompleto` interface | Após L245 |
| `src/store/favorites-store.ts` | **Criar** — Zustand store com persist | Novo arquivo |
| `src/store/index.ts` | Adicionar export `useFavoritesStore` | L1-3 (adicionar export) |
| `src/components/results-panel.tsx` | Migrar botão ★ de `useHistoryStore` → `useFavoritesStore` | L45-46 (imports), L80-98 (botão) |
| `src/components/sidebar-footer.tsx` | Migrar contagem de `useHistoryStore` → `useFavoritesStore` | L8-9, L22-24 |

### Sequência de Execução

1. **Definir `FavoritoCompleto`** em `src/types/index.ts` — interface + export
2. **Criar `favorites-store.ts`**:
   - Zustand com `persist` middleware
   - `name: 'fenix_favorites_v1'`, `version: 1`
   - State: `favorites: FavoritoCompleto[]`
   - Actions: `addFavorite`, `removeFavorite`, `updateFavorite`, `getByCombo`
   - `addFavorite`: gera `id` + `timestamp`, default `editedAt: null`, `userNote: ''`
   - Limite FIFO: se `favorites.length >= 50`, remove o mais antigo antes de adicionar
   - `getByCombo`: find mais recente por `(materialId, tipoOperacao, ferramenta.tipo)`
3. **Exportar** `useFavoritesStore` em `src/store/index.ts`
4. **Migrar botão ★ no results-panel.tsx** (L80-98):
   - Antes: `useHistoryStore.toggleFavorite(latestEntry.id)` — toggle flag no histórico
   - Depois: `useFavoritesStore.addFavorite({...snapshot})` — salva snapshot completo
   - Verificação "já favoritado": comparar combo `(materialId, tipoOperacao, parametros)` com `isFavorited()`
5. **Migrar sidebar-footer.tsx** — contagem de favoritos de `useHistoryStore` → `useFavoritesStore`
6. **Implementar edição** — decidir durante implementação: modal ou inline form
   - Modal reutiliza padrão de `ToolEditModal` (ITEM-2)
   - Campos editáveis: `parametros` (Vc, fz, ae, ap) + `userNote`
   - Ao salvar: recalcular `resultado` via `calcular()` do engine

### Dependências

- **Depende de:** nenhum item (é a base do Grupo E)
- **Bloqueia:** ITEM-11 (zona verde SGB — usa `getByCombo`), ITEM-12 (página /favoritos — lista `favorites[]`)

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| Botão ★ no `history-page.tsx` usa `useHistoryStore.toggleFavorite` — NÃO migrar | Manter sistema dual: histórico tem seu toggle, visor usa `useFavoritesStore` |
| `getByCombo` pode retornar `undefined` se não há favorito | Caller deve checar `undefined` antes de usar |
| Zustand getter `getByCombo` retorna novo objeto a cada call → infinite loop | Usar `useMemo` no componente, não chamar dentro do selector |
| Edição de favorito requer recálculo — engine precisa ser callable diretamente | Importar funções de cálculo de `@/engine/index` (já exportadas) |
| `resultado` pode ser `null` quando clica ★ | Guard: só mostrar botão ★ quando `storeResultado !== null` (já é o caso, L80) |

### Critérios de Aceitação

- Salvar favorito captura snapshot completo (resultado + contexto)
- `FavoritoCompleto` inclui: materialNome, ferramenta completa, parametros, resultado, safetyFactor
- Editar favorito recalcula resultado com motor principal
- Limite de 50 favoritos (FIFO — remove mais antigo)
- Persistência em localStorage (`fenix_favorites_v1`) funcional
- Botão ★ no visor reflete estado (favoritado = amarelo/glow, não = cinza)
- `getByCombo` retorna o favorito mais recente para a combinação
- Contagem no SidebarFooter reflete favoritos do novo store

### Testes

| Teste | Descrição |
|-------|-----------|
| `addFavorite saves complete snapshot` | Todos os campos de FavoritoCompleto presentes |
| `removeFavorite removes by id` | `favorites.length` diminui, id não encontrado |
| `updateFavorite updates parametros and resultado` | Campos atualizados, `editedAt` preenchido |
| `getByCombo returns latest for combo` | Com 2 favoritos mesma combo, retorna mais recente |
| `getByCombo returns undefined when no match` | Combo inexistente retorna undefined |
| `FIFO limit at 50` | Adicionar 51º remove o 1º (mais antigo) |
| `persistence in localStorage` | Salvar, reload, verificar dados intactos |
| `isFavorited returns true when match exists` | Comparação por combo funcional |
| `button star reflects state` | Visual muda (cor, glow) quando favoritado |

---

## Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Interface `FavoritoCompleto` | 1 |
| Criar `favorites-store.ts` (5 actions + persist + FIFO) | 4 |
| Migrar botão ★ no results-panel | 2 |
| Migrar sidebar-footer contagem | 1 |
| Implementar edição (modal + recálculo) | 3 |
| Testes (9 casos) | 3 |
| **Total** | **14 pontos (~1.5 sessões)** |

---

## Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando
npm run build       # Build sem erros
# Verificar localStorage: chave fenix_favorites_v1 presente após salvar favorito
```
