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

```bash
# 1. Localizar SGB
find src/ -name "*gradient*" -o -name "*sgb*" -o -name "*segmented*"

# 2. Verificar props atuais do SGB
grep -A 5 "interface.*Props" src/components/segmented-gradient-bar.tsx
```

---

## Regras Gerais

- Não criar arquivos novos — apenas modificar `segmented-gradient-bar.tsx` e seus consumidores
- Prop `idealRange` é opcional — sem ela, comportamento inalterado (backward-compatible)
- Estilo visual: seguir dark theme existente do projeto (sem introduzir novos tokens de cor)

---

## Mapeamento Técnico do Codebase

### Componentes Envolvidos

| Componente | Arquivo | Linhas | Props/Interface |
|------------|---------|--------|-----------------|
| `SegmentedGradientBar` | `src/components/segmented-gradient-bar.tsx` | 191-244 | `{ paramKey: 'vc'\|'fz'\|'ae'\|'ap', segments?: number }` |
| `SegBar` (sub-componente) | `src/components/segmented-gradient-bar.tsx` | 56-147 | `{ paramKey, position, zone, zoneLabel, leftLabel, rightLabel, badge?, readout?, segments? }` |
| `FineTunePanel` | `src/components/fine-tune-panel.tsx` | 129 | Consumidor desktop — `<SegmentedGradientBar paramKey={key} />` |
| Mobile fine-tune | `src/components/mobile/mobile-fine-tune-section.tsx` | — | Consumidor mobile — `<SegmentedGradientBar paramKey={key} segments={30} />` |
| `calcularSliderBounds` | `src/engine/index.ts` (re-export) | — | `(material, ferramenta, tipoOperacao) => SliderBounds` |
| `useFavoritesStore` | `src/store/favorites-store.ts` | — | **De ITEM-10** — `getByCombo(materialId, tipoOperacao, ferramentaTipo)` |

### Estado Atual do SGB (segmented-gradient-bar.tsx)

**Cor dos segmentos — zonas FIXAS (L17-26):**
```ts
// Proportional color map: 14% RED · 26% ORANGE · 20% GREEN · 26% ORANGE · 14% RED
function segmentColor(idx: number, total: number): string {
  const pct = idx / total;
  if (pct < 0.14) return SEG_RED;    // #FF4D4D
  if (pct < 0.40) return SEG_ORANGE; // #FFA500
  if (pct < 0.60) return SEG_GREEN;  // #00E676
  if (pct < 0.86) return SEG_ORANGE;
  return SEG_RED;
}
```

**Sub-componente SegBar (L56-147):** Renderiza segmentos com:
- Cada segmento: `div` com `width: 1 seg`, `height: proporcional ao active/inactive`
- Cursor (indicator): posição absoluta `left: ${cursorPct}%`
- Cores via `segmentColor(idx, total)` — baseado na posição percentual fixa

**Interface atual (L44-54):**
```ts
interface SegBarProps {
  paramKey: string;
  position: number;     // [0, 1] — cursor position
  zone: string;
  zoneLabel: string;
  leftLabel: string;
  rightLabel: string;
  badge?: string | null;
  readout?: ReactNode;
  segments?: number;     // Default: 50
}
```

### Cálculo da Zona Verde Dinâmica

```ts
// Para cada parâmetro (vc, fz, ae, ap):
const favorito = useFavoritesStore.getByCombo(materialId, tipoOperacao, ferramenta.tipo);

if (favorito) {
  const valorIdeal = favorito.parametros[paramKey]; // ex: favorito.parametros.vc
  const minZona = valorIdeal * 0.90;  // -10%
  const maxZona = valorIdeal * 1.10;  // +10%

  // Converter para % relativa aos bounds do slider:
  const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao);
  const { min, max } = bounds[paramKey];
  const pctMin = Math.max(0.05, (minZona - min) / (max - min));  // clamp 5%
  const pctMax = Math.min(0.95, (maxZona - min) / (max - min));  // clamp 95%

  idealRange = { start: pctMin, end: pctMax };
}
```

---

## Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/components/segmented-gradient-bar.tsx` | Adicionar prop `idealRange?` ao `SegmentedGradientBarProps` e `SegBarProps` + renderizar zona verde | L44-54 (SegBarProps), L56-147 (SegBar render), L184-188 (SegmentedGradientBarProps) |
| `src/components/fine-tune-panel.tsx` | Buscar favorito via `useFavoritesStore.getByCombo` + calcular `idealRange` + passar ao SGB | L129 (onde renderiza SGB) |
| `src/components/mobile/mobile-fine-tune-section.tsx` | Mesma lógica de lookup + cálculo para mobile | Seções de cada parâmetro |

### Sequência de Execução

1. **Adicionar prop `idealRange` às interfaces:**
   ```ts
   // SegBarProps (L44-54) — adicionar:
   idealRange?: { start: number; end: number }; // [0-1] percentual do SGB

   // SegmentedGradientBarProps (L184-188) — adicionar:
   idealRange?: { start: number; end: number };
   ```

2. **Implementar visual da zona verde no SegBar (L56-147):**
   - Para cada segmento (loop existente), verificar se está dentro do `idealRange`
   - Se `idealRange` fornecido e segmento dentro do range:
     - Adicionar borda superior verde (`border-top: 2px solid #00E676`)
     - OU aumentar opacidade/brightness do segmento
     - OU adicionar overlay sutil verde sobre a cor base
   - Se fora do range: renderização normal (inalterada)

3. **Criar helper de cálculo no fine-tune-panel:**
   ```ts
   function computeIdealRange(
     paramKey: 'vc' | 'fz' | 'ae' | 'ap',
     favorito: FavoritoCompleto | undefined,
     bounds: SliderBounds
   ): { start: number; end: number } | undefined {
     if (!favorito) return undefined;
     const val = favorito.parametros[paramKey];
     const { min, max } = bounds[paramKey];
     const range = max - min;
     if (range <= 0) return undefined;
     return {
       start: Math.max(0.05, (val * 0.9 - min) / range),
       end:   Math.min(0.95, (val * 1.1 - min) / range),
     };
   }
   ```

4. **Integrar no fine-tune-panel.tsx (desktop):**
   - Importar `useFavoritesStore` e `FavoritoCompleto`
   - Buscar favorito: `const favorito = useFavoritesStore((s) => s.getByCombo(materialId, tipoOperacao, ferramenta.tipo));`
   - **CUIDADO Zustand selector:** `getByCombo` retorna novo objeto a cada call → usar `useMemo` ou selecionar `favorites` array e computar fora
   - Passar `idealRange={computeIdealRange(key, favorito, bounds)}` ao `<SegmentedGradientBar>`

5. **Integrar no mobile** — mesma lógica

6. **Clampar** zona verde entre 5% e 95% (já feito no helper)

### Dependências

- **Depende de:** ITEM-10 (`useFavoritesStore` com `getByCombo` — fornece os dados do favorito)
- **Bloqueia:** nenhum item

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| Zustand `getByCombo` retorna novo objeto a cada render → re-render infinito | Selecionar `favorites` array + `useMemo` para computar `getByCombo` fora do selector |
| `bounds.max === bounds.min` (range zero) → divisão por zero | Guard: `if (range <= 0) return undefined` |
| Favorito com parâmetros fora dos bounds atuais (mudou material/ferramenta) | Clamping 5%-95% garante que zona verde fica dentro do SGB |
| Visual da zona verde pode conflitar com as cores fixas do gradient | Usar overlay sutil (ex: `border-top` ou `box-shadow inset`) em vez de mudar cor base |
| Sem favorito → prop undefined → comportamento inalterado | Backward-compatible por design |

### Critérios de Aceitação

- SGB sem `idealRange`: comportamento 100% inalterado (regressão zero)
- SGB com `idealRange`: zona verde visível no range calculado (segmentos destacados)
- Zona verde atualiza em tempo real ao salvar novo favorito
- Clamping 5%–95% funcional (nunca sai do SGB)
- Funciona em desktop (50 segmentos) e mobile (30 segmentos)
- Sem re-render loops (Zustand selector estável)

### Testes

| Teste | Descrição |
|-------|-----------|
| `renders normally without idealRange` | Regressão — SGB idêntico ao antes |
| `renders green zone with idealRange` | Segmentos dentro do range têm visual diferenciado |
| `clamps at 5% and 95%` | `idealRange.start` < 0.05 → clamped a 0.05 |
| `reacts to favorite change` | Salvar novo favorito atualiza zona verde |
| `handles undefined favorito` | Sem favorito → sem zona verde (graceful) |
| `correct calculation: value ±10%` | Valor 100, bounds 50-150 → range start=0.4, end=0.6 |
| `works with 50 segments (desktop)` | Destaque correto nos segmentos |
| `works with 30 segments (mobile)` | Destaque correto nos segmentos |

---

## Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Adicionar prop + interface | 1 |
| Implementar visual zona verde no SegBar | 3 |
| Helper `computeIdealRange` | 1 |
| Integrar no fine-tune desktop | 2 |
| Integrar no mobile | 1 |
| Testes (8 casos) | 2 |
| **Total** | **10 pontos (~1 sessão)** |

---

## Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando (incluindo regressão SGB)
npm run build       # Build sem erros
```
