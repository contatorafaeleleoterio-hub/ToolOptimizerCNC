# PLAN v0.9-02 — Arestas (Z) → 4 Botões

> **Status:** ⬜ Aguardando detalhamento
> **Complexidade:** Baixa
> **Versão alvo:** v0.9.1

---

## Objetivo

Substituir o dropdown de Arestas (Z) por 4 botões selecionáveis (`2 | 3 | 4 | 6`), usando o mesmo padrão visual dos botões de Tipo de Ferramenta e Tipo de Usinagem já existentes no ConfigPanel.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/config-panel.tsx` | Substituir `DropdownRow` de Arestas por grid de 4 botões |

---

## Estratégia Técnica

1. **Remover o `DropdownRow`** de Arestas (Z) no ConfigPanel
2. **Adicionar grid `grid-cols-4`** com botões `[2, 3, 4, 6]`
3. **Estilo:** Copiar padrão dos botões de TipoUsinagem (linhas 159-168 do config-panel):
   - Ativo: `bg-primary text-black font-bold` + neon shadow
   - Inativo: `bg-black/30 border border-white/10`
4. **Default:** botão `4` selecionado (valor atual do store)
5. **Um botão sempre selecionado** — sem estado "nenhum"
6. **Ação:** `setFerramenta({ ...ferramenta, numeroArestas: valor })`

---

## Dependências

- **Nenhuma** — completamente independente

---

## Riscos / Cuidados

- Mudança mínima e isolada — risco baixo
- Garantir que testes existentes do dropdown de arestas sejam atualizados para botões
- Manter label "Arestas (Z)" acima do grupo de botões para contexto
