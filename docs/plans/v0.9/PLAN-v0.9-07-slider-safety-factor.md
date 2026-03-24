# PLAN v0.9-07 — Slider Fator de Segurança no Dashboard

> **Status:** ⬜ Aguardando detalhamento
> **Complexidade:** Baixa
> **Versão alvo:** v0.9.2

---

## Objetivo

Trazer o slider de Fator de Segurança (atualmente só em Settings e mobile) para a coluna esquerda do dashboard desktop. O operador ajusta o fator sem sair da tela principal.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/config-panel.tsx` | Nova seção colapsável "Fator de Segurança" com slider |

---

## Estratégia Técnica

1. **Nova seção accordion** no ConfigPanel (após "Ajuste Fino" ou antes)
2. **Reutilizar padrão visual** dos sliders de Ajuste Fino:
   - Slider horizontal com botões `−` / `+`
   - Escala: `0.50` (Conservador) ←→ `1.00` (Agressivo)
   - Step: 0.05
   - Valor atual em `font-mono` destacado
3. **Reutilizar `setSafetyFactor()`** do store — já implementado (linhas 206-209)
4. **Copiar implementação** da seção Segurança do settings-page (linhas 126-157) — já tem StyledSlider + botões ±
5. **Sincronização:** valor é o mesmo do Settings — alterar em um reflete no outro (estado único no store)

---

## Dependências

- **Nenhuma** — completamente independente
- Usa `setSafetyFactor()` que já existe no store

---

## Riscos / Cuidados

- Garantir que alterar o slider zere `resultado` (comportamento atual do `setSafetyFactor`)
- Usuário precisa clicar "Simular" após ajustar — manter esse fluxo
- Label claro: "Conservador ← → Agressivo" para contexto visual
- Não duplicar estado — é o mesmo `safetyFactor` do store usado pelo Settings
