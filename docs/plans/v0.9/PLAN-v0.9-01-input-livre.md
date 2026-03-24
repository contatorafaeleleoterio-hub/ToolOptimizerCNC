# PLAN v0.9-01 — Input Livre (Diâmetro, Raio, Altura)

> **Status:** ⬜ Aguardando detalhamento
> **Complexidade:** Média
> **Versão alvo:** v0.9.1

---

## Objetivo

Substituir os dropdowns de Diâmetro, Raio da Ponta e Altura de Fixação por campos de digitação livre. O operador digita qualquer valor positivo (ex: 10.5 mm) em vez de escolher de uma lista pré-definida.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/config-panel.tsx` | Substituir 3 `DropdownRow` por inputs numéricos livres |
| `src/store/machining-store.ts` | `setFerramenta()` aceitar valores livres; validar ranges mínimos |
| `src/types/index.ts` | Sem mudança estrutural — `Ferramenta.diametro` já é `number` |

---

## Estratégia Técnica

1. **Remover `DropdownRow`** para D, R, H — manter para Arestas (item separado #2)
2. **Criar componente `NumericInput`** (ou reutilizar `NumInput` de settings-page) com:
   - Placeholder vazio ao abrir app
   - Validação: valor > 0, aceitar decimais
   - Debounce no onChange (300ms) para evitar recálculo por keystroke
3. **Botão Simular desabilitado** se Diâmetro ou Altura estiverem vazios/zero
4. **Carregar ferramenta salva** preenche os campos; Reset volta a vazio
5. **Store:** `ferramenta.diametro`, `ferramenta.balanco`, `ferramenta.raioQuina` já são `number` — apenas garantir que `null`/`undefined` não quebre `calcular()`

---

## Dependências

- **Nenhuma** — pode ser implementado independentemente
- **Item #9** (Config) remove as listas de "Diâmetros Padrão" e "Raios de Ponta" que alimentavam esses dropdowns — coordenar

---

## Riscos / Cuidados

- Validação de input: não permitir valores negativos, zero no diâmetro, ou strings não-numéricas
- Testes existentes que selecionam dropdown por valor vão quebrar — reescrever para inputs
- `calcular()` depende de `ferramenta.diametro > 0` — adicionar guard clause
- UX: considerar mostrar unidade "mm" inline no campo
