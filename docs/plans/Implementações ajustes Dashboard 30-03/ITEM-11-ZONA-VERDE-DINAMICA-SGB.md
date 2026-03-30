# ITEM-11 — Zona Verde Dinâmica no SGB (SegmentedGradientBar)

**Status:** ⬜ Pendente
**Grupo:** E — Sistema de Favoritos
**Depende de:** ITEM-10 (useFavoritesStore)

---

## Conceito

A zona verde (range ideal) no SGB deve refletir o último favorito salvo para aquela combinação de Material + Operação + Tipo de Ferramenta.

---

## Comportamento

| Situação | Zona Verde |
|----------|-----------|
| Sem favorito salvo | Usa posição padrão atual (40%–60%) |
| Com favorito salvo | Reposiciona para [valor_favoritado ± 10%] convertido em % relativa aos bounds do slider |
| Múltiplos favoritos para mesma combinação | Usar o mais recente |

A zona verde deve atualizar em tempo real quando um novo favorito é salvo.

---

## Cálculo da Zona Verde

```ts
// Para cada parâmetro (vc, fz, ae, ap):
valorIdeal = favorito.parametros[param]
min_zona = valorIdeal * 0.90
max_zona = valorIdeal * 1.10

// Converter para % relativa aos bounds do slider:
pct_min = (min_zona - bounds[param].min) / (bounds[param].max - bounds[param].min) * 100
pct_max = (max_zona - bounds[param].min) / (bounds[param].max - bounds[param].min) * 100

// Clampar entre 5% e 95% para não sair do SGB
```

---

## Integração no SGB

- Adicionar prop opcional `idealRange?: { min: number; max: number }` ao componente SGB
- Se `idealRange` não fornecido: comportamento atual inalterado
- Se `idealRange` fornecido: zona verde usa os valores calculados acima
- Em `fine-tune-panel.tsx` e `mobile-fine-tune-section.tsx`: buscar favorito do `useFavoritesStore` para a combinação atual e passar como `idealRange`

---

## Checklist Pré-Implementação

```powershell
# 3. Localizar SGB
Get-ChildItem -Path "src" -Recurse -Filter "*gradient*","*sgb*","*segmented*"
```

---

## Regras Gerais

- Nunca criar arquivos novos sem verificar se já existe equivalente no projeto
- Estilo visual: seguir dark theme existente do projeto (sem introduzir novos tokens de cor)
