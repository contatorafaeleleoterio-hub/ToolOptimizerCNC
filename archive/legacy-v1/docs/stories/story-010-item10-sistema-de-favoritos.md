---
id: story-010
title: "ITEM-10: Sistema de Favoritos — Snapshot Completo de Resultado"
status: Ready for Review
created: 2026-04-11
author: "@sm (River)"
epic: "Grupo E — Sistema de Favoritos"
complexity: 14 pts (~1.5 sessões)
priority: HIGH
depends_on: []
blocks:
  - ITEM-11 (Zona Verde Dinâmica no SGB — usa getByCombo)
  - ITEM-12 (Página /favoritos — lista favorites[])
spec_ref: docs/plans/ATUALIZACAO_DASH_APROVADO/ITEM-10-FAVORITOS-STORE.md
---

# Story-010 — Sistema de Favoritos ("Fotografia de Resultado")

## User Story

**Como** operador CNC,
**quero** salvar favoritos de resultados completos com um clique no botão ★,
**para** manter uma biblioteca de referência de configurações validadas que posso consultar e editar posteriormente.

---

## Contexto Técnico

### Situação Atual
O projeto já tem um sistema de favoritos simples em `history-store.ts` (campo `favorited?: boolean` em `HistoricoCalculo`). O ITEM-10 cria um **sistema separado e mais robusto** que salva snapshots completos com suporte a edição de parâmetros.

### Stack Relevante
- **React 18 + TypeScript 5.7** (strict, zero `any`)
- **Zustand 5.0** com persist middleware
- **localStorage** para persistência
- **Vitest + Testing Library** para testes

---

## Acceptance Criteria

| # | Critério | Testável? |
|---|----------|-----------|
| AC-1 | Clicar ★ no results-panel salva snapshot `FavoritoCompleto` em `useFavoritesStore` (não no history-store) | ✅ |
| AC-2 | Botão ★ fica amarelo (#facc15) + glow quando combo `(materialId, tipoOperacao, ferramenta.tipo)` já está favoritada | ✅ |
| AC-3 | Store persiste em localStorage com chave `fenix_favorites_v1` | ✅ |
| AC-4 | Limite de 50 favoritos com remoção FIFO (remove mais antigo ao atingir 51) | ✅ |
| AC-5 | Modal de edição permite alterar `parametros` (Vc, fz, ae, ap) + `userNote` | ✅ |
| AC-6 | Ao salvar edição: recalcula `resultado` via funções puras do engine (NÃO via `store.calcular()`) e atualiza `editedAt` | ✅ |
| AC-7 | SidebarFooter mostra contagem de `useFavoritesStore` (separada do history-store) | ✅ |
| AC-8 | Sistema dual mantido: botão ★ no history-page.tsx continua usando `useHistoryStore.toggleFavorite` sem alteração | ✅ |

---

## Scope

### IN (o que será implementado)
- Interface `FavoritoCompleto` em `src/types/index.ts`
- `src/store/favorites-store.ts` — Zustand store com persist
- Migração do botão ★ em `results-panel.tsx` de history-store → favorites-store
- Migração da contagem em `sidebar-footer.tsx`
- Modal de edição de favorito (inline ou componente separado)
- 9 testes unitários em `tests/favorites-store.test.ts`

### OUT (fora do escopo)
- Página `/favoritos` → ITEM-12
- Zona verde dinâmica no SGB → ITEM-11
- Botão ★ no history-page.tsx → NÃO modificar
- Export/import de favoritos
- Sync entre dispositivos

---

## Interface Proposta

```typescript
// src/types/index.ts — adicionar após L245
export interface FavoritoCompleto {
  id: string;                      // crypto.randomUUID()
  timestamp: string;               // ISO 8601
  materialId: number;              // para lookup futuro
  materialNome: string;            // snapshot (evita lookup)
  tipoOperacao: TipoUsinagem;
  ferramenta: Ferramenta;          // snapshot completo
  parametros: ParametrosUsinagem;  // snapshot
  resultado: ResultadoUsinagem;    // snapshot completo
  safetyFactor: number;
  editedAt: string | null;         // null padrão, ISO 8601 se editado
  userNote: string;                // '' padrão, editável
}
```

---

## Arquivos a Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/types/index.ts` | Adicionar `FavoritoCompleto` | Após L245 |
| `src/store/favorites-store.ts` | **CRIAR** — Zustand store + persist | Novo arquivo |
| `src/store/index.ts` | Adicionar export `useFavoritesStore` | L1-3 |
| `src/components/results-panel.tsx` | Migrar botão ★ → useFavoritesStore | L45-46, L80-98 |
| `src/components/sidebar-footer.tsx` | Migrar contagem → useFavoritesStore | L8-9, L22-24 |
| `tests/favorites-store.test.ts` | **CRIAR** — 9 casos de teste | Novo arquivo |

### Arquivos a NÃO modificar
- `src/store/history-store.ts` — manter toggleFavorite intacto
- `src/pages/history-page.tsx` — botão ★ do histórico fica no history-store

---

## Tasks / Subtasks

- [x] **Task 1** — Adicionar interface `FavoritoCompleto` em `src/types/index.ts` após L245 (AC-1)
- [x] **Task 2** — Criar `src/store/favorites-store.ts`:
  - [x] 2a. State: `favorites: FavoritoCompleto[]`
  - [x] 2b. `addFavorite` com FIFO (≥50 → remove [0]) + `crypto.randomUUID()` (AC-1, AC-4)
  - [x] 2c. `removeFavorite(id)` (AC-4)
  - [x] 2d. `updateFavorite(id, updates)` com `editedAt` (AC-6)
  - [x] 2e. `isFavorited(materialId, tipoOperacao, ferramentaTipo)` — comparação por combo sem floats (AC-2)
  - [x] 2f. `getByCombo(materialId, tipoOperacao, ferramentaTipo)` → FavoritoCompleto | undefined
  - [x] 2g. Persist middleware com `name: 'fenix_favorites_v1'` (AC-3)
- [x] **Task 3** — Exportar `useFavoritesStore` em `src/store/index.ts` (AC-1)
- [x] **Task 4** — Migrar botão ★ em `src/components/results-panel.tsx`:
  - [x] 4a. Substituir imports de history-store por favorites-store
  - [x] 4b. `addFavorite` captura snapshot completo do machining-store
  - [x] 4c. Visual: amarelo + glow via `isFavorited()` (AC-2)
- [x] **Task 5** — Migrar contagem em `src/components/sidebar-footer.tsx` (AC-7)
- [x] **Task 6** — Implementar modal de edição:
  - [x] 6a. Campos editáveis: Vc, fz, ae, ap + userNote
  - [x] 6b. Recalcular via funções puras do engine (AC-6)
  - [x] 6c. Chamar `updateFavorite` com novos parametros + resultado recalculado
- [x] **Task 7** — Criar `tests/favorites-store.test.ts` com 9 casos:
  - [x] addFavorite salva snapshot completo
  - [x] removeFavorite remove por id
  - [x] updateFavorite atualiza parametros + resultado + editedAt
  - [x] getByCombo retorna mais recente para combo
  - [x] getByCombo retorna undefined quando sem match
  - [x] FIFO: 51º remove o 1º
  - [x] Persistência no localStorage
  - [x] isFavorited retorna true quando combo existe
  - [x] isFavorited retorna false para combos diferentes

---

## Dev Notes

### Padrão do Projeto
- Zustand stores usam `persist` middleware de `zustand/middleware`
- Exemplo existente: `src/store/history-store.ts` (ver como persist é configurado)
- NÃO usar `any` — TypeScript strict

### Armadilha Crítica: Zustand getter com array
> **Regra do projeto:** NUNCA chamar getter que retorna array dentro do selector Zustand  
> `useStore(s => s.getFavorites())` → retorna novo array a cada render → infinite loop  
> **Solução:** selecionar `s.favorites` (dado primitivo), usar `useMemo` para operações derivadas

### Recálculo no updateFavorite
`store.calcular()` usa estado atual do Zustand — não aceita parâmetros externos.  
Usar funções puras do engine:
```typescript
// Verificar nome exato:
// grep -r "^export function\|^export const" src/engine/index.ts
import { calcularResultado } from '@/engine/index';
```

### isFavorited — Sem comparação de floats
```typescript
isFavorited: (materialId, tipoOperacao, ferramentaTipo) =>
  get().favorites.some(
    (f) => f.materialId === materialId &&
           f.tipoOperacao === tipoOperacao &&
           f.ferramenta.tipo === ferramentaTipo
  ),
```

### FIFO guard no addFavorite
```typescript
const trimmed = favorites.length >= 50 ? favorites.slice(1) : favorites;
set({ favorites: [...trimmed, newFav] });
```

---

## CodeRabbit Integration

**Story Type Analysis:**
- Primary Type: Frontend
- Secondary Type: Architecture (novo store)
- Complexity: Medium (5 arquivos + 1 arquivo novo)

**Quality Gate Tasks:**
- [ ] Pre-Commit (@dev): `npm run typecheck && npm run test -- --run`
- [ ] Pre-PR (@devops): `npm run build`

**Focus Areas:**
- Zustand selector patterns (evitar infinite loops com arrays)
- TypeScript strict (zero `any`)
- Dual system mantido (history-store intacto)
- FIFO logic correto

---

## Definição de Pronto (DoD)

```bash
npm run typecheck     # Zero erros TypeScript
npm run test -- --run # ≥ 1008 testes passando (999 + 9 novos)
npm run build         # Bundle OK sem erros
```

Verificar no browser:
- `localStorage.getItem('fenix_favorites_v1')` presente após primeiro favorito
- Botão ★ amarelo + glow após favoritar
- Contagem no sidebar atualiza ao favoritar/desfavoritar
- Modal edita e recalcula sem afetar store principal

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-04-11 | @sm (River) | Story criada em Draft |
| 2026-04-11 | @po (Pax) | Validação 10/10 — GO — status Draft → Ready |
| 2026-04-11 | @dev (Dex) | Implementação completa — 10 testes passando — status → Ready for Review |
