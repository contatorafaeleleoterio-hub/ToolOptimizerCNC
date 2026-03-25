# PLAN v0.9-07 — Slider Fator de Segurança no Dashboard

> **Status:** 📋 Pronto para implementar
> **Complexidade:** Baixa
> **Versão alvo:** v0.9.2

---

## Objetivo

Trazer o slider de Fator de Segurança (atualmente só em Settings e mobile) para a coluna esquerda do dashboard desktop. O operador ajusta o fator sem sair da tela principal.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/config-panel.tsx` | Nova seção colapsável "Segurança" com slider SF |
| `tests/components/config-panel.test.tsx` | Testes do slider SF no dashboard |

---

## Detalhamento Técnico

### 1. config-panel.tsx — Nova seção "Segurança"

#### 1a. Imports adicionais (linha 1-9):

```diff
 import { useState } from 'react';
 import { useMachiningStore } from '@/store';
 import { MATERIAIS, FERRAMENTAS_PADRAO, DIAMETROS_COMPLETOS, RAIOS_PONTA, ARESTAS_OPTIONS, ALTURAS_FIXACAO } from '@/data';
 import { TipoUsinagem } from '@/types';
 import { FieldGroup } from './ui-helpers';
 import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
 import { usePlausible } from '@/hooks/use-plausible';
 import { CollapsibleSection } from './collapsible-section';
 import { FineTunePanel } from './fine-tune-panel';
+import { StyledSlider, BTN_CLS } from './styled-slider';
```

#### 1b. Extrair safetyFactor e setSafetyFactor do store (dentro do componente, linha 56-62):

```diff
 export function ConfigPanel() {
   const {
     materialId, ferramenta, tipoOperacao, parametros,
     setMaterial, setFerramenta, setTipoOperacao,
     simular, reset,
     savedTools, loadSavedTool, addSavedTool,
+    safetyFactor, setSafetyFactor,
   } = useMachiningStore();
```

#### 1c. Summary para a seção (após linha 92, junto aos outros summaries):

```typescript
const summarySF = `SF ${safetyFactor.toFixed(2)}`;
```

#### 1d. Nova seção colapsável (após `</CollapsibleSection>` de "Ajuste Fino", linha 278, antes do `</div>` de fechamento):

```tsx
{/* Seção 4: Fator de Segurança */}
<CollapsibleSection
  title="Segurança"
  summary={summarySF}
  defaultOpen={false}
>
  <div className="space-y-2 pt-1">
    <div className="flex items-center gap-2">
      <button
        className={BTN_CLS}
        onClick={() => setSafetyFactor(Math.max(0.5, +(safetyFactor - 0.05).toFixed(2)))}
        aria-label="Diminuir fator de segurança"
      >−</button>
      <div className="flex-1">
        <StyledSlider
          value={safetyFactor}
          min={0.5}
          max={1.0}
          step={0.05}
          color="primary"
          rgb="0,217,255"
          label="Fator de Segurança"
          onChange={(v) => setSafetyFactor(+(v.toFixed(2)))}
        />
      </div>
      <button
        className={BTN_CLS}
        onClick={() => setSafetyFactor(Math.min(1.0, +(safetyFactor + 0.05).toFixed(2)))}
        aria-label="Aumentar fator de segurança"
      >+</button>
      <span className="text-lg font-mono font-bold text-primary w-14 text-right">
        {safetyFactor.toFixed(2)}
      </span>
    </div>
    <div className="flex justify-between text-2xs text-gray-500 px-1">
      <span>← Conservador</span>
      <span>Agressivo →</span>
    </div>
    <p className="text-2xs text-gray-500">
      Aplicado a Potência e Torque. Valores mais baixos = mais conservador.
    </p>
  </div>
</CollapsibleSection>
```

**Nota:** A seção usa `defaultOpen={false}` — o slider SF é secundário, não deve competir com os campos principais. O summary mostra `SF 0.80` para referência rápida mesmo colapsado.

### 2. Verificar CollapsibleSection suporta `defaultOpen`

O componente `CollapsibleSection` precisa aceitar prop `defaultOpen`. Verificar se já existe:

- Se **sim** → nenhuma alteração.
- Se **não** → adicionar `defaultOpen?: boolean` prop com default `true` (mantém behavior atual).

### 3. Sincronização com Settings

**Nenhuma alteração necessária.** O valor `safetyFactor` vem do mesmo store (`useMachiningStore`). Alterar no dashboard reflete instantaneamente no Settings e vice-versa. Estado único.

### 4. Comportamento ao alterar

Conforme `setSafetyFactor` (machining-store.ts:206-209):
```typescript
setSafetyFactor: (f) => {
  set({ safetyFactor: f, resultado: null });
  // Don't auto-calculate on safety factor change - user must click Simular
},
```

- Alterar o slider **zera o resultado** (`resultado: null`)
- O painel de resultados mostra estado "zerado" (reset warning amarelo)
- Usuário **deve clicar "Simular"** para recalcular — fluxo mantido

---

## Testes

### Novos testes: `tests/components/config-panel.test.tsx`

```
- 'renders safety factor slider with current value'
- 'clicking + button increments safetyFactor by 0.05'
- 'clicking − button decrements safetyFactor by 0.05'
- '+ button does not exceed 1.00'
- '− button does not go below 0.50'
- 'summary shows current SF value when collapsed'
- 'changing SF clears resultado (user must click Simular)'
```

---

## Dependências

- **Nenhuma** — completamente independente
- Usa `setSafetyFactor()` que já existe no store
- Usa `StyledSlider` + `BTN_CLS` que já existem em `styled-slider.tsx`

---

## Riscos / Cuidados

- **Não duplicar estado:** É o mesmo `safetyFactor` do store — alterar aqui reflete no Settings
- **`resultado` é zerado:** Ao mover o slider, resultado vira `null`. O results-panel mostra warning amarelo. Comportamento desejado (regra #7 do CLAUDE.md).
- **defaultOpen:** A seção deve iniciar **colapsada** para não poluir o dashboard. O summary `SF 0.80` dá contexto suficiente.
- **Acessibilidade:** Botões `±` têm `aria-label`. O `StyledSlider` já tem label interno.
- **Duplicação visual:** O código é quase idêntico ao `SegurancaSection` da settings-page (linhas 126-157). Avaliar futura extração em componente compartilhado — mas para o MVP, duplicação aceitável (2 locais).

---

## Critérios de Conclusão

- [ ] Seção "Segurança" visível no ConfigPanel (coluna esquerda do dashboard)
- [ ] Slider funcional: 0.50 ↔ 1.00, step 0.05
- [ ] Botões `−` / `+` funcionais com clamp nos limites
- [ ] Valor atual exibido em `font-mono` (ex: `0.80`)
- [ ] Summary mostra `SF 0.80` quando seção colapsada
- [ ] Labels "← Conservador" / "Agressivo →"
- [ ] Alterar slider zera resultado (warning amarelo no results-panel)
- [ ] Valor sincronizado com Settings (estado único)
- [ ] Seção inicia colapsada (`defaultOpen={false}`)
- [ ] Testes passando
- [ ] Build sem erros TypeScript
