# PLAN v0.9-03 — Botão Favoritar Simulação

> **Status:** ⬜ Aguardando detalhamento
> **Complexidade:** Média
> **Versão alvo:** v0.9.2

---

## Objetivo

Adicionar botão ⭐ para o operador favoritar simulações que funcionaram na prática. Dois pontos de entrada: (a) no painel de resultados do dashboard após simular, (b) em cada card do histórico. O mecanismo `validatedSimulations` já existe no store.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/results-panel.tsx` | Adicionar botão ⭐ no header dos resultados (pós-simulação) |
| `src/pages/history-page.tsx` | Adicionar botão ⭐ em cada card + filtro "Apenas Favoritos" + contador |
| `src/store/machining-store.ts` | Métodos `toggleFavorite()`, `isFavorited()` sobre `validatedSimulations` |
| `src/types/index.ts` | Adicionar campo `favorited: boolean` em `ValidatedSimulation` |

---

## Estratégia Técnica

1. **Tipo:** Adicionar `favorited?: boolean` ao `ValidatedSimulation` (retrocompatível com dados existentes)
2. **Store:**
   - `addValidatedSimulation()` já existe — reutilizar para salvar snapshot favorito
   - Adicionar `toggleFavorite(id: string)` — alterna `favorited` booleano
   - Adicionar seletor `getFavoritedSimulations()` — filtra `validatedSimulations.filter(v => v.favorited)`
3. **Dashboard (results-panel):**
   - Botão ⭐ visível apenas quando `resultado !== null`
   - Click: salva snapshot como `validatedSimulation` com `favorited: true`
   - Se já favoritada (mesma combinação): ícone amarelo/preenchido; click desfavorita
4. **Histórico (history-page):**
   - Botão ⭐ no summary row de cada card
   - Novo filtro dropdown ou toggle: "Apenas Favoritos"
   - Contador "(N favoritos)" no header da página
5. **Persistência:** `validatedSimulations` já persiste via Zustand persist — favoritos salvos automaticamente

---

## Dependências

- **Item #8** (Rodapé) usa o acesso rápido a favoritos — implementar #3 antes de #8
- **Nenhuma dependência de entrada** — pode começar independente

---

## Riscos / Cuidados

- Definir critério de "mesma simulação" para detectar se já está favoritada (hash de ferramenta + material + params?)
- Migração: `validatedSimulations` existentes sem campo `favorited` devem default para `false`
- Não confundir com `savedTools` (ferramentas salvas) — favoritar salva simulação completa
- Testar persistência: favoritar → fechar app → reabrir → favorito mantido
