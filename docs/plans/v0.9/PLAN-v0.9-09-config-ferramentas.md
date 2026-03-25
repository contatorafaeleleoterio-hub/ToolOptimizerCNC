# PLAN v0.9-09 — Revisão Config: Ferramentas e Fatores

> **Status:** 📋 Pronto para implementar
> **Complexidade:** Média
> **Versão alvo:** v0.9.4

---

## Objetivo

Simplificar a seção Ferramentas do Settings: remover listas de diâmetros/raios (não mais necessárias com inputs livres) e fatores de correção Kc. Substituir por gestão de ferramentas salvas (`savedTools`). O Fator de Segurança passa a ser o único ajuste de cálculo.

---

## O que SAI (remover)

| Item | Arquivo | Linhas | Motivo |
|------|---------|--------|--------|
| Seção "Diâmetros Padrão" | settings-page.tsx | 641-674 | Input livre (#01) torna obsoleto |
| Seção "Raios de Ponta" | settings-page.tsx | 676-709 | Input livre (#01) torna obsoleto |
| Seção "Fatores de Correção Kc" + Modal | settings-page.tsx | 711-807 | Complexidade removida |
| Store access: customToolConfig, toolCorrectionFactors | settings-page.tsx | 612-616 | Removido |
| State: `customToolConfig` | machining-store.ts | L65 | Não mais necessário |
| State: `toolCorrectionFactors` | machining-store.ts | L66 | Não mais necessário |
| Actions: `setCustomToolConfig` | machining-store.ts | L91, 293-295 | Não mais necessário |
| Actions: `setToolCorrectionFactor` | machining-store.ts | L92, 297-307 | Não mais necessário |
| Actions: `removeToolCorrectionFactor` | machining-store.ts | L93, 309-315 | Não mais necessário |
| Initial state: `customToolConfig`, `toolCorrectionFactors` | machining-store.ts | L124-125 | Não mais necessário |
| Kc factor application in `calcular()` | machining-store.ts | 366-372 | Não mais necessário |
| Export/Import: ambos campos | machining-store.ts | 318-349 | Remover dos objetos |
| Persist: `customToolConfig`, `toolCorrectionFactors` | machining-store.ts | 566-567 | Remover do partialize |
| Interface `CustomToolConfig` | types/index.ts | 174-178 | Não mais necessário |
| Interface `ToolCorrectionFactor` | types/index.ts | 180-190 | Não mais necessário |
| Constant `CUSTOM_TOOL_CONFIG_PADRAO` | types/index.ts | 209-212 | Não mais necessário |
| Test suite `customToolConfig` | machining-store.test.ts | 425-440 | Não mais necessário |

## O que ENTRA (novo)

Gestão de ferramentas salvas (`savedTools`) na seção Ferramentas do Settings.

## O que PERMANECE

- **Fator de Segurança** — único ajuste global de cálculo (seção Segurança)
- **Ranges do Ajuste Fino** (RangesAjusteFinoCard, linhas 826-899) — útil para operadores avançados
- **ToolParamRanges** (types/index.ts L56-61) — NÃO remover, usado pelo Ajuste Fino
- Seções: Máquina, Segurança, Materiais, Exibição, Dados

---

## Detalhamento Técnico

### 1. Types: `src/types/index.ts`

#### 1a. REMOVER `CustomToolConfig` (linhas 173-178):

```diff
-/** Custom tool config */
-export interface CustomToolConfig {
-  extraDiameters: number[];
-  extraRadii: number[];
-}
```

#### 1b. REMOVER `ToolCorrectionFactor` (linhas 180-190):

```diff
-/** Tool correction factor: global multiplier applied to Vc and fz for a specific tool (type + diameter) */
-export interface ToolCorrectionFactor {
-  /** Tool type matching Ferramenta.tipo */
-  tipo: 'toroidal' | 'esferica' | 'topo';
-  /** Tool diameter in mm */
-  diametro: number;
-  /** Global multiplier applied to Vc and fz (e.g. 1.2 = +20%, default 1.0) */
-  fator: number;
-  /** Optional label/description (e.g. "TiAlN", "DLC", "não revestida") */
-  descricao?: string;
-}
```

#### 1c. REMOVER `CUSTOM_TOOL_CONFIG_PADRAO` (linhas 209-212):

```diff
-export const CUSTOM_TOOL_CONFIG_PADRAO: CustomToolConfig = {
-  extraDiameters: [],
-  extraRadii: [],
-};
```

#### 1d. MANTER `ToolParamRanges` (L56-61) — usado pelo Ajuste Fino.

### 2. Store: `src/store/machining-store.ts`

#### 2a. REMOVER do state interface (linhas 65-66):

```diff
   safetyRules: SafetyRules;
   customMaterials: CustomMaterial[];
-  customToolConfig: CustomToolConfig;
-  toolCorrectionFactors: ToolCorrectionFactor[];
   objetivoUsinagem: ObjetivoUsinagem;
```

#### 2b. REMOVER das actions interface (linhas 91-93):

```diff
-  setCustomToolConfig: (c: Partial<CustomToolConfig>) => void;
-  setToolCorrectionFactor: (tcf: ToolCorrectionFactor) => void;
-  removeToolCorrectionFactor: (tipo: ToolCorrectionFactor['tipo'], diametro: number) => void;
```

#### 2c. REMOVER do initial state (linhas 124-125):

```diff
-  customToolConfig: CUSTOM_TOOL_CONFIG_PADRAO,
-  toolCorrectionFactors: [],
```

#### 2d. REMOVER implementações das actions (linhas 293-315):

Remover `setCustomToolConfig`, `setToolCorrectionFactor`, `removeToolCorrectionFactor` inteiros.

#### 2e. REMOVER Kc de `calcular()` (linhas 366-372):

```diff
-  // Apply tool correction factor (global multiplier on Vc and fz)
-  const tcf = toolCorrectionFactors.find(
-    (t) => t.tipo === ferramenta.tipo && t.diametro === D
-  );
-  const corrFactor = tcf?.fator ?? 1.0;
-  const vc = parametros.vc * corrFactor;
-  const fz = parametros.fz * corrFactor;
+  const vc = parametros.vc;
+  const fz = parametros.fz;
```

**CUIDADO:** Verificar que `vc` e `fz` eram usados abaixo neste bloco. A substituição deve preservar as mesmas variáveis `const vc` e `const fz` para não quebrar o restante do `calcular()`.

#### 2f. REMOVER de export/import (linhas 318-349):

Na função `exportarConfiguracao()`:
```diff
-  const { ..., customToolConfig, toolCorrectionFactors, ... } = get();
+  const { ..., ... } = get();
```
Remover ambos campos do JSON de exportação e da lógica de importação.

#### 2g. REMOVER do persist partialize (linhas 566-567):

```diff
   partialize: (state) => ({
     limitesMaquina: state.limitesMaquina,
     safetyFactor: state.safetyFactor,
     preferences: state.preferences,
     safetyRules: state.safetyRules,
     customMaterials: state.customMaterials,
-    customToolConfig: state.customToolConfig,
-    toolCorrectionFactors: state.toolCorrectionFactors,
     objetivoUsinagem: state.objetivoUsinagem,
     savedTools: state.savedTools,
     validatedSimulations: state.validatedSimulations,
   }),
```

#### 2h. Migração: Incrementar versão do persist (linhas 546-559):

Precisa de migration para ignorar campos removidos sem crashar:

```typescript
version: 3, // era 2

migrate: (persistedState, fromVersion) => {
  const state = persistedState as Record<string, unknown>;
  if (fromVersion < 2) {
    return {
      ...state,
      objetivoUsinagem: 'balanceado' as ObjetivoUsinagem,
      savedTools: [] as SavedTool[],
      validatedSimulations: [] as ValidatedSimulation[],
    };
  }
  if (fromVersion < 3) {
    // v3: Remove deprecated fields — they are simply ignored by partialize
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customToolConfig, toolCorrectionFactors, ...rest } = state;
    return rest;
  }
  return persistedState;
},
```

#### 2i. REMOVER imports não usados no topo do arquivo:

```diff
-import type { ..., CustomToolConfig, ToolCorrectionFactor, ... } from '@/types/index';
-import { ..., CUSTOM_TOOL_CONFIG_PADRAO, ... } from '@/types/index';
```

### 3. Settings Page: `src/pages/settings-page.tsx`

#### 3a. REMOVER/SUBSTITUIR `FerramentasSection` (linhas 611-807):

Substituir a função inteira por nova versão que mostra gestão de `savedTools`:

```tsx
function FerramentasSection() {
  const savedTools = useMachiningStore((s) => s.savedTools);
  const removeSavedTool = useMachiningStore((s) => s.removeSavedTool);

  return (
    <div className="space-y-4">
      {/* Ferramentas Salvas */}
      <div className="bg-surface-dark rounded-xl p-4 border border-white/5">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">build</span>
          Ferramentas Salvas
          <span className="text-xs font-mono text-gray-500 ml-auto">
            {savedTools.length} salva{savedTools.length !== 1 ? 's' : ''}
          </span>
        </h3>

        {savedTools.length === 0 ? (
          <p className="text-xs text-gray-500 italic">
            Nenhuma ferramenta salva. Salve ferramentas no painel de configuração do dashboard.
          </p>
        ) : (
          <div className="space-y-2">
            {savedTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between px-3 py-2 bg-black/30 rounded-lg border border-white/5"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-white font-mono">{tool.nome}</span>
                  <span className="text-2xs text-gray-500">
                    {new Date(tool.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <button
                  onClick={() => removeSavedTool(tool.id)}
                  aria-label={`Excluir ${tool.nome}`}
                  className="p-1 text-gray-500 hover:text-red-400 transition-colors rounded-md hover:bg-red-400/10"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ranges do Ajuste Fino — manter componente existente */}
      <RangesAjusteFinoCard />
    </div>
  );
}
```

#### 3b. Imports a limpar:

```diff
-import type { ..., ToolParamRanges, ... } from '@/types';
+// ToolParamRanges pode continuar se RangesAjusteFinoCard usa
```

Remover imports de `CustomToolConfig`, `ToolCorrectionFactor` se existirem.

### 4. Verificações adicionais

Buscar referências residuais em todo o projeto:

```bash
grep -rn "customToolConfig\|toolCorrectionFactors\|ToolCorrectionFactor\|CustomToolConfig\|CUSTOM_TOOL_CONFIG_PADRAO\|corrFactor\|tcf\?" src/ tests/
```

Todos os matches encontrados devem ser limpos.

---

## Testes

### REMOVER

```
tests/store/machining-store.test.ts (linhas 425-440):
- describe('customToolConfig') — bloco inteiro
```

### ATUALIZAR

```
tests/store/machining-store.test.ts:
- Qualquer teste que referencia toolCorrectionFactors → remover
- Testes de calcular() que verificam Kc factor → atualizar expectativas (valores mudam sem o multiplicador)
- Testes de exportarConfiguracao/importarConfiguracao → remover referências aos campos
```

### NOVOS TESTES

```
tests/pages/settings-page.test.tsx (se existir):
- 'FerramentasSection shows savedTools list'
- 'FerramentasSection shows empty state when no savedTools'
- 'FerramentasSection shows tool count'
- 'clicking delete removes savedTool'
- 'Diâmetros Padrão section does NOT render'
- 'Raios de Ponta section does NOT render'
- 'Fatores de Correção section does NOT render'

tests/store/machining-store.test.ts:
- 'persist migration v2→v3: removes customToolConfig and toolCorrectionFactors'
- 'calcular() does not apply Kc correction factor'
```

---

## Ordem de Execução Recomendada

1. **Types first** — Remover interfaces e constantes
2. **Store** — Remover state, actions, persist, Kc de calcular(), adicionar migration v3
3. **Settings page** — Substituir FerramentasSection
4. **Testes** — Remover/atualizar/criar
5. **Build + typecheck** — Verificar zero erros
6. **Grep final** — Buscar referências residuais

---

## Dependências

- **Item #1** (Input Livre) — sem ele, diâmetros/raios dropdown ainda são necessários no config-panel
  - **MUST:** #01 implementado antes de #09
- Coordenar remoção de `toolCorrectionFactors` com testes que referenciam Kc

---

## Riscos / Cuidados

- **Breaking change no localStorage:** Remover campos do persist invalida dados existentes → migração v2→v3 trata isso limpando os campos removidos
- **Cálculos mudam:** Operadores que tinham Kc configurado terão resultados diferentes → decisão aceita (simplificação deliberada)
- **RangesAjusteFinoCard** permanece dentro da nova `FerramentasSection` — verificar que não depende de `customToolConfig` ou `toolCorrectionFactors`
- **Export/Import:** JSON exportado sem os campos → import de JSONs antigos (com os campos) deve ignorá-los sem crash (validar)
- **`toolCorrectionFactors` em `calcular()` destructuring:** Verificar que a remoção de `toolCorrectionFactors` do destructuring (no início de calcular) não causa erros (pode estar no `get()` destructure)

---

## Critérios de Conclusão

- [ ] Interfaces `CustomToolConfig` e `ToolCorrectionFactor` removidas dos types
- [ ] Constante `CUSTOM_TOOL_CONFIG_PADRAO` removida
- [ ] State, actions e initial state limpos no machining-store
- [ ] Kc factor removido do `calcular()` — `vc` e `fz` usam diretamente `parametros.vc/fz`
- [ ] Persist migration v2→v3 implementada
- [ ] Export/Import limpos (sem os campos removidos)
- [ ] Settings page: FerramentasSection mostra lista de `savedTools` com delete
- [ ] Settings page: Seções "Diâmetros", "Raios", "Fatores Kc" NÃO renderizam
- [ ] RangesAjusteFinoCard permanece funcional
- [ ] Zero referências residuais a `customToolConfig`, `toolCorrectionFactors`, `ToolCorrectionFactor`, `CustomToolConfig`
- [ ] Testes antigos removidos/atualizados
- [ ] Novos testes passando (migration, savedTools UI, sem Kc)
- [ ] Build sem erros TypeScript
- [ ] `npm run test` passando
