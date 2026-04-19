# PLAN v0.9-01 — Input Livre (Diâmetro, Raio, Altura)

> **Status:** 📋 Pronto para implementar
> **Complexidade:** Média
> **Versão alvo:** v0.9.1

---

## Objetivo

Substituir os dropdowns de Diâmetro, Raio da Ponta e Altura de Fixação por campos de digitação livre. O operador digita qualquer valor positivo (ex: 10.5 mm) em vez de escolher de uma lista pré-definida.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/ui-helpers.tsx` | **NOVO:** Componente `ToolNumericInput` exportado (junto com NumInput e FieldGroup) |
| `src/components/config-panel.tsx` | Substituir 3 `DropdownRow` por `ToolNumericInput`; desabilitar Simular se D=0 ou H=0 |
| `src/store/machining-store.ts` | Nenhuma mudança necessária (já suporta `number` livre) |
| `src/types/index.ts` | Nenhuma mudança (`Ferramenta.diametro` já é `number`) |
| `src/data/index.ts` | Remover `DIAMETROS_COMPLETOS`, `RAIOS_PONTA`, `ALTURAS_FIXACAO` se não usados em outros arquivos |
| `tests/components/config-panel.test.tsx` | Reescrever testes de dropdown → input; adicionar testes de validação |

---

## Detalhamento Técnico

### 1. Novo componente: `ToolNumericInput` em `src/components/ui-helpers.tsx`

Criar junto com `NumInput` e `FieldGroup` (centraliza primitivas UI):

```tsx
export function ToolNumericInput({ label, value, onChange, min, max, step, placeholder, suffix }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; placeholder?: string; suffix?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md px-3 py-2"
         style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03), transparent)' }}>
      <span className="text-base font-semibold text-white/85 whitespace-nowrap">{label}</span>
      <div className="flex items-center gap-1">
        <input
          type="number"
          value={value || ''}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v) && v >= min && v <= max) onChange(v);
            else if (e.target.value === '') onChange(0);
          }}
          min={min} max={max} step={step}
          placeholder={placeholder}
          aria-label={label}
          className="bg-black/50 border border-white/15 rounded px-2 py-1 min-w-[90px] w-[110px] text-right text-white font-mono text-base focus:ring-1 focus:ring-primary outline-none appearance-none"
        />
        {suffix && <span className="text-sm text-gray-500 ml-1">{suffix}</span>}
      </div>
    </div>
  );
}
```

**Design decisions:**
- Layout inline (label esquerda, input direita) — mesmo padrão visual do DropdownRow que substitui
- Gradient bg copiado do DropdownRow original (linhas 36-37 do config-panel)
- `value || ''` → quando value=0 mostra placeholder vazio
- Sem debounce — onChange direto (store não auto-recalcula)
- Sem botões ▲▼ — desktop, digitação direta suficiente
- `appearance-none` — remove setas nativas do browser

### 2. Mudanças em `src/components/config-panel.tsx`

#### Imports (linha 3):

```diff
- import { MATERIAIS, FERRAMENTAS_PADRAO, DIAMETROS_COMPLETOS, RAIOS_PONTA, ARESTAS_OPTIONS, ALTURAS_FIXACAO } from '@/data';
+ import { MATERIAIS, FERRAMENTAS_PADRAO } from '@/data';
```

```diff
- import { FieldGroup } from './ui-helpers';
+ import { FieldGroup, ToolNumericInput } from './ui-helpers';
```

#### Diâmetro (linhas 232-239) — substituir DropdownRow:

```tsx
{/* 2. Diameter — NumericInput */}
<ToolNumericInput
  label="Diâmetro (mm)"
  value={ferramenta.diametro}
  onChange={(v) => setFerramenta({ diametro: v })}
  min={0.1} max={100} step={0.5}
  placeholder="ex: 10"
  suffix="mm"
/>
```

#### Raio da Ponta (linhas 241-250) — substituir DropdownRow:

```tsx
{/* 3. Corner radius — NumericInput (toroidal only) */}
{ferramenta.tipo === 'toroidal' && (
  <ToolNumericInput
    label="Raio da Ponta"
    value={ferramenta.raioQuina ?? 0}
    onChange={(v) => setFerramenta({ raioQuina: v })}
    min={0.1} max={20} step={0.1}
    placeholder="ex: 1.0"
    suffix="mm"
  />
)}
```

#### Altura Fixação (linhas 261-268) — substituir DropdownRow:

```tsx
{/* 5. Altura de Fixação — NumericInput */}
<ToolNumericInput
  label="Altura Fixação (mm)"
  value={ferramenta.balanco}
  onChange={(v) => setFerramenta({ balanco: v })}
  min={5} max={300} step={1}
  placeholder="ex: 30"
  suffix="mm"
/>
```

#### Simular desabilitado (linha ~94, antes do return):

```tsx
const canSimulate = ferramenta.diametro > 0 && ferramenta.balanco > 0;
```

Botão Simular (linha 107):
```diff
- <button onClick={handleSimulate} disabled={isCalculating}
+ <button onClick={handleSimulate} disabled={isCalculating || !canSimulate}
```

#### Remover DropdownRow

Se nenhum campo ainda usa `DropdownRow` após esta mudança + #02, remover a função inteira (linhas 21-54) e a classe CSS `.select-chevron`.

### 3. Store / Types — sem mudanças

- `setFerramenta()` (machining-store.ts:167-181) já aceita partial `Ferramenta` com `number`
- `calcular()` já faz try/catch em `validateInputs()` que lança erro se `d <= 0` (validators.ts:61)
- Resultado fica `null` se input inválido — comportamento correto

### 4. Constantes `@/data`

Verificar se `DIAMETROS_COMPLETOS`, `RAIOS_PONTA`, `ALTURAS_FIXACAO` são usados em:
- `settings-page.tsx` — se sim, manter
- Outros componentes — se nenhum, remover do export

---

## Testes

### Testes a reescrever (`tests/components/config-panel.test.tsx`)

| Teste atual (linhas) | Ação |
|---|---|
| `renders diameter dropdown with 15 options` (47-53) | Reescrever: `input[type=number]` com aria-label "Diâmetro (mm)" existe |
| `raio da ponta renders as dropdown` (160-164) | Reescrever: `input[type=number]` com aria-label "Raio da Ponta" existe (toroidal) |
| `raio da ponta dropdown has 3 options` (166-170) | **Remover** (não há mais opções) |
| `selecting raio dropdown updates store` (172-177) | Reescrever: `fireEvent.change(input, { target: { value: '0.5' } })` → verificar `raioQuina === 0.5` |
| `altura de fixacao renders as dropdown` (199-202) | Reescrever: `input[type=number]` com aria-label "Altura Fixação (mm)" existe |
| `altura dropdown has 12 options` (204-208) | **Remover** |
| `selecting altura dropdown updates store` (210-215) | Reescrever: digitação no input → verificar `balanco` atualizado |
| `follows correct tool field order` (111-118) | Atualizar seletores (trocar `<select>` por `<input>`) |

### Novos testes

```
- 'Simular button is disabled when diametro is 0'
- 'Simular button is disabled when balanco is 0'
- 'Simular button is enabled when diametro > 0 and balanco > 0'
- 'typing decimal value in diameter input updates store'
- 'empty diameter input shows placeholder'
- 'ToolNumericInput displays suffix "mm"'
```

---

## Dependências

- **Nenhuma** — pode ser implementado independentemente
- **Coordenar com #09** (Config) que remove as listas de "Diâmetros Padrão" e "Raios de Ponta" em settings

---

## Riscos / Cuidados

- Validação: não permitir valores negativos, zero no diâmetro, ou strings não-numéricas
- Testes existentes que selecionam dropdown por valor vão quebrar — reescrever para inputs
- `calcular()` depende de `ferramenta.diametro > 0` — guard já existe via `validateInputs`
- UX: sufixo "mm" inline no campo para contexto
- Carregar ferramenta salva deve preencher os inputs corretamente
- Reset deve limpar campos (volta a default do store)

---

## Critérios de Conclusão

- [ ] 3 dropdowns substituídos por `ToolNumericInput`
- [ ] Componente `ToolNumericInput` exportado de `ui-helpers.tsx`
- [ ] Sufixo "mm" visível ao lado de cada input
- [ ] Simular desabilitado quando D=0 ou H=0
- [ ] Carregar ferramenta salva preenche inputs
- [ ] Reset limpa campos (volta a valor default)
- [ ] Testes atualizados + novos passando
- [ ] Build sem erros TypeScript
- [ ] Visual consistente com dark theme (glassmorphism)
