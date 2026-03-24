# PLAN v0.9-09 — Revisão Config: Ferramentas e Fatores

> **Status:** ⬜ Aguardando detalhamento
> **Complexidade:** Média
> **Versão alvo:** v0.9.4

---

## Objetivo

Simplificar a seção Ferramentas do Settings: remover listas de diâmetros/raios (não mais necessárias com inputs livres) e fatores de correção Kc. Substituir por gestão de ferramentas favoritas (salvas). O Fator de Segurança passa a ser o único ajuste de cálculo.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/pages/settings-page.tsx` | Remover seções Diâmetros, Raios, Fatores Kc; adicionar gestão de ferramentas salvas |
| `src/store/machining-store.ts` | Remover `toolCorrectionFactors` e `customToolConfig` do state; remover lógica Kc de `calcular()` |
| `src/types/index.ts` | Remover tipos `ToolCorrectionFactor`, `CustomToolConfig`; simplificar |

---

## Estratégia Técnica

### O que SAI

1. **Diâmetros Padrão** (settings-page linhas 641-673) — lista customizável de diâmetros → sem uso com input livre
2. **Raios de Ponta** (settings-page linhas 676-708) — lista customizável de raios → sem uso com input livre
3. **Fatores de Correção Kc** (settings-page linhas 711-805) — tabela por tipo/diâmetro com CorrectionModal → complexidade removida
4. **Store:** `toolCorrectionFactors[]` e `customToolConfig` do state
5. **Store:** Lógica de aplicação do Kc em `calcular()` (linhas ~366-372)
6. **Types:** `ToolCorrectionFactor`, `CustomToolConfig`, `ToolParamRanges`

### O que ENTRA

1. **Gestão de Ferramentas Salvas** — lista das `savedTools` com:
   - Nome automático: "Topo Ø10 - H25 - A4"
   - Data de criação
   - Ação: excluir
2. **Visual:** Tabela/lista simples estilo cards

### O que PERMANECE

- **Fator de Segurança** como único ajuste global (já tem seção em Segurança)
- **Ranges do Ajuste Fino** (linhas 809-934) — ainda úteis para override de ranges
- Seções: Máquina, Segurança, Materiais, Exibição, Dados — sem mudança

---

## Dependências

- **Item #1** (Input Livre) deve ser implementado antes — sem ele, as listas de diâmetros/raios ainda são necessárias
- Coordenar remoção de `toolCorrectionFactors` com os testes que referenciam Kc

---

## Riscos / Cuidados

- **Breaking change no store:** Remover `toolCorrectionFactors` e `customToolConfig` invalida localStorage de usuários existentes → tratar migração com defaults
- **Testes:** Vários testes podem referenciar `toolCorrectionFactors` → buscar e atualizar
- **Cálculos:** Remover Kc de `calcular()` muda os resultados para quem tinha fatores configurados → decisão aceita (simplificação deliberada)
- **Persistência:** Zustand persist precisa ignorar campos removidos sem crashar (migration)
- Manter `Ranges do Ajuste Fino` — ainda tem valor para operadores avançados
