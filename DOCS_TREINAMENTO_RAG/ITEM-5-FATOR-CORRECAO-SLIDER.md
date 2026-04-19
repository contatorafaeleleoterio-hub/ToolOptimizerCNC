# ITEM #5 — ATUALIZAÇÃO 2.1: Fator de Correção Slider

**Status:** ✅ APROVADO
**Data:** 30/03/2026

---

## O quê / Onde / Impacto

- **O quê:** Substituir slider nativo do Safety Factor por BidirectionalSlider padrão do sistema, exibindo valor em percentual
- **Onde:** `src/components/mobile/mobile-config-section.tsx` (~linha 277) + painel de configurações desktop
- **Impacto visual:** Slider segue exato modelo do RPM/Avanço — [-] [+], tick marks, glow cyan — com valor percentual no canto direito

---

## Decisões

| # | Decisão | Detalhe |
|---|---------|---------|
| 1 | **Estilo** | `BidirectionalSlider` com `[-]` `[+]` e tick marks — igual ao slider de RPM/Avanço |
| 2 | **Valor exibido** | Percentual apenas — `80%` em vez de `0.80` ou `1.00` |
| 3 | **Sem indicador** | Sem `SegmentedGradientBar` — não se aplica ao fator de correção |
| 4 | **Nomenclatura** | `Fator de Correção` — igual em painel de configurações E no results panel |

---

## Notas

- Labels laterais permanecem: `← Conservador` / `Agressivo →`
- Range: 0.5 → 1.0, step 0.05
- Nome `Fator de Correção` substitui `Fator de Segurança` em todos os pontos da UI

---

## Mapeamento Técnico do Codebase

### Componentes Envolvidos

| Componente | Arquivo | Linhas | Estado atual |
|------------|---------|--------|--------------|
| Safety slider desktop | `src/components/config-panel.tsx` | 326-357 | `StyledSlider` com `min=0.50, max=1.00, step=0.05` + label "Fator de Segurança" |
| Safety slider mobile | `src/components/mobile/mobile-config-section.tsx` | 274-283 | `<input type="range">` nativo + label "Fator de Segurança" |
| Safety slider settings | `src/pages/settings-page.tsx` | 112-156 | `StyledSlider` + label "Fator de Segurança" + texto explicativo |
| `StyledSlider` | `src/components/styled-slider.tsx` | — | Slider customizado com glow, tick marks (usado no fine-tune) |
| `BidirectionalSlider` | `src/components/bidirectional-slider.tsx` | 14-22 | Range -150% a +150% relativo a `baseValue` — **NÃO adequado** para valor absoluto |

### Código Atual — Desktop (config-panel.tsx:326-357)

```tsx
<CollapsibleSection title="Segurança" summary={summarySeguranca} defaultOpen={false}>
  <div className="space-y-3 pt-1">
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <StyledSlider
          value={safetyFactor} min={0.50} max={1.00} step={0.05}
          color="primary" label="Fator de Segurança"
          onChange={(v) => setSafetyFactor(v)}
        />
      </div>
      <span className="text-base font-mono text-primary w-10 text-right">
        {safetyFactor.toFixed(2)}
      </span>
    </div>
    <div className="flex justify-between text-xs text-gray-600 px-8">
      <span>← Conservador</span>
      <span>Agressivo →</span>
    </div>
    <p className="text-xs text-gray-500 px-1">
      Aplicado à Potência e Torque. 0.80 recomendado para operação segura.
    </p>
  </div>
</CollapsibleSection>
```

### Código Atual — Mobile (mobile-config-section.tsx:274-283)

```tsx
<AccordionSection color="bg-seg-verde" label="Fator de Segurança" summary={summarySafety}>
  <div className="flex items-center gap-4 mt-1">
    <input type="range" min={0.5} max={1} step={0.05} value={safetyFactor}
      onChange={(e) => setSafetyFactor(Number(e.target.value))}
      className="flex-1 h-2 bg-black/40 rounded-full appearance-none cursor-pointer ..." />
    <span className="text-sm font-mono text-white w-10 text-right">{safetyFactor.toFixed(2)}</span>
  </div>
  <p className="text-[10px] text-gray-500 mt-2">0.70 = conservador · 0.85 = agressivo</p>
</AccordionSection>
```

### Store

```ts
// src/store/machining-store.ts
setSafetyFactor: (f) => { ... }  // L199+ — set({ safetyFactor: f, resultado: null })
// Aplicado em calcular():
//   potenciaCorte *= safetyFactor
//   potenciaMotor *= safetyFactor
//   torque *= safetyFactor
// Default: 0.8 (INITIAL_STATE, L111)
```

### Decisão Técnica: BidirectionalSlider vs StyledSlider

| Opção | Descrição | Prós | Contras |
|-------|-----------|------|---------|
| **(A) StyledSlider estilizado** | Manter `StyledSlider` existente, adicionar botões [-][+] manualmente | Simples, range absoluto funciona direto | Não tem botões [-][+] nativos |
| **(B) BidirectionalSlider** | Usar com `baseValue=0.75`, convertendo range | Visual idêntico ao RPM/Avanço | BidiSlider usa % relativo (-150 a +150), conversão complexa e frágil |
| **(C) StyledSlider + botões wrapper** | Criar wrapper com botões [-][+] ao redor do StyledSlider | Visual similar ao BidiSlider, sem conversão de % | Novo componente wrapper |

**Recomendação: Opção (A)** — `StyledSlider` já tem visual adequado (glow, tick marks). Adicionar botões [-5%][+5%] ao redor e mudar display de `0.80` para `80%`. Evita a complexidade da conversão de % do BidirectionalSlider.

---

## Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/components/config-panel.tsx` | Renomear label + mudar display para % + adicionar botões [-][+] | L326-357 |
| `src/components/mobile/mobile-config-section.tsx` | Substituir `<input type="range">` por `StyledSlider` + botões + display % | L274-283 |
| `src/pages/settings-page.tsx` | Renomear label "Fator de Segurança" → "Fator de Correção" + display % | L112-156 |

### Todas as Ocorrências a Renomear

```
grep -r "Fator de Segurança\|Safety Factor\|Fator de segurança" src/
```
Locais conhecidos:
1. `config-panel.tsx` L341 — `label="Fator de Segurança"`
2. `config-panel.tsx` L329 — `summary={summarySeguranca}` (texto do summary)
3. `mobile-config-section.tsx` L275 — `label="Fator de Segurança"`
4. `settings-page.tsx` L129 — Label "Fator de Segurança"
5. `settings-page.tsx` L156 — Texto explicativo

### Sequência de Execução

1. **Renomear** todas as ocorrências de "Fator de Segurança" → "Fator de Correção" nos 3 arquivos
2. **Desktop (config-panel.tsx):** Mudar display de `{safetyFactor.toFixed(2)}` para `{Math.round(safetyFactor * 100)}%`
3. **Desktop:** Adicionar botões [-] e [+] com step de 0.05 (5%) ao redor do slider:
   ```tsx
   <button onClick={() => setSafetyFactor(Math.max(0.5, safetyFactor - 0.05))}>−</button>
   <StyledSlider ... />
   <button onClick={() => setSafetyFactor(Math.min(1.0, safetyFactor + 0.05))}>+</button>
   ```
4. **Mobile (mobile-config-section.tsx):** Substituir `<input type="range">` nativo por `StyledSlider` importado + mesmos botões + display %
5. **Settings (settings-page.tsx):** Renomear label + mudar display para %
6. **Manter** labels laterais `← Conservador` / `Agressivo →`
7. **Manter** texto explicativo (adaptar: "50% = conservador · 100% = agressivo")

### Dependências

- **Depende de:** nenhum item
- **Bloqueia:** nenhum item

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| Store continua armazenando 0.50-1.00 (decimal) — UI mostra 50%-100% | Conversão apenas na UI: `Math.round(safetyFactor * 100)` para display, store inalterado |
| `StyledSlider` não tem botões [-][+] nativos | Adicionar botões manualmente no wrapper JSX |
| Mobile usa `<input type="range">` com CSS inline complexo | Substituir por `StyledSlider` (já importado no projeto) |
| Texto "0.80 recomendado" vira "80% recomendado" | Atualizar textos explicativos em todos os locais |

### Critérios de Aceitação

- Slider range 50%–100%, step 5%
- Valor exibido como percentual (`80%`)
- Botões [-][+] funcionais (step de 5%)
- Labels laterais presentes (← Conservador / Agressivo →)
- Sem `SegmentedGradientBar` neste slider
- Nomenclatura "Fator de Correção" em TODO o sistema (0 ocorrências de "Fator de Segurança")
- Store continua armazenando decimal (0.50-1.00) — sem breaking change

### Testes

| Teste | Descrição |
|-------|-----------|
| `displays percentage format` | UI mostra "80%" quando store tem 0.80 |
| `slider range 0.50 to 1.00` | Min e max respeitados |
| `step of 5% via buttons` | Clicar [+] de 0.80 → 0.85; clicar [-] de 0.80 → 0.75 |
| `clamps at boundaries` | [+] em 1.00 não ultrapassa; [-] em 0.50 não desce |
| `label renamed everywhere` | 0 ocorrências de "Fator de Segurança" no DOM |
| `works on desktop and mobile` | Mesmo comportamento em ambos |
| `store value unchanged` | Store armazena 0.80, não 80 |

---

## Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Renomear labels (3 arquivos, busca e substitui) | 1 |
| Desktop: adicionar botões + display % | 2 |
| Mobile: substituir input nativo por StyledSlider | 2 |
| Settings: atualizar label e display | 1 |
| Testes (7 casos) | 2 |
| **Total** | **8 pontos (~1 sessão)** |

---

## Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando
npm run build       # Build sem erros
# Verificar manualmente: 0 ocorrências de "Fator de Segurança" no bundle
```

---

## REFINAMENTO FINAL (31/03/2026)

### Decisões Resolvidas

| Decisão | Resolução |
|---------|-----------|
| BidirectionalSlider vs StyledSlider | **Opção A confirmada** — `StyledSlider` existente + botões [-][+] manuais no wrapper JSX |
| Step dos botões | 0.05 (5%) — clamp em `[0.50, 1.00]` |
| Display | `Math.round(safetyFactor * 100) + '%'` — store inalterado (continua decimal) |

### Imports Adicionais

**`src/components/config-panel.tsx`** — nenhum import novo (`StyledSlider` já importado)

**`src/components/mobile/mobile-config-section.tsx`**:
```ts
import { StyledSlider } from '@/components/styled-slider';   // NOVO (substituindo input nativo)
```

### Código Proposto — Desktop `config-panel.tsx` (Depois, L326-357)

```tsx
<CollapsibleSection title="Segurança" summary={`${Math.round(safetyFactor * 100)}%`} defaultOpen={false}>
  <div className="space-y-2 pt-1">
    <div className="flex items-center gap-2">
      <button
        onClick={() => setSafetyFactor(Math.max(0.50, safetyFactor - 0.05))}
        className="w-7 h-7 flex items-center justify-center rounded-md bg-black/30
                   border border-white/10 text-gray-400 hover:text-white hover:bg-white/10
                   transition-all text-base font-bold shrink-0"
        aria-label="Reduzir fator de correção"
      >−</button>
      <div className="flex-1">
        <StyledSlider
          value={safetyFactor} min={0.50} max={1.00} step={0.05}
          color="primary" label="Fator de Correção"
          onChange={(v) => setSafetyFactor(v)}
        />
      </div>
      <button
        onClick={() => setSafetyFactor(Math.min(1.00, safetyFactor + 0.05))}
        className="w-7 h-7 flex items-center justify-center rounded-md bg-black/30
                   border border-white/10 text-gray-400 hover:text-white hover:bg-white/10
                   transition-all text-base font-bold shrink-0"
        aria-label="Aumentar fator de correção"
      >+</button>
      <span className="text-base font-mono text-primary w-12 text-right shrink-0">
        {Math.round(safetyFactor * 100)}%
      </span>
    </div>
    <div className="flex justify-between text-xs text-gray-600 px-8">
      <span>← Conservador</span>
      <span>Agressivo →</span>
    </div>
    <p className="text-xs text-gray-500 px-1">
      Aplicado à Potência e Torque. 80% recomendado para operação segura.
    </p>
  </div>
</CollapsibleSection>
```

### Código Proposto — Mobile `mobile-config-section.tsx` (Depois, L274-283)

```tsx
<AccordionSection color="bg-seg-verde" label="Fator de Correção" summary={`${Math.round(safetyFactor * 100)}%`}>
  <div className="flex items-center gap-2 mt-1">
    <button
      onClick={() => setSafetyFactor(Math.max(0.50, safetyFactor - 0.05))}
      className="w-8 h-8 flex items-center justify-center rounded-md bg-black/40
                 border border-white/10 text-gray-400 text-base font-bold shrink-0"
    >−</button>
    <div className="flex-1">
      <StyledSlider
        value={safetyFactor} min={0.50} max={1.00} step={0.05}
        color="primary" label="Fator de Correção"
        onChange={(v) => setSafetyFactor(v)}
      />
    </div>
    <button
      onClick={() => setSafetyFactor(Math.min(1.00, safetyFactor + 0.05))}
      className="w-8 h-8 flex items-center justify-center rounded-md bg-black/40
                 border border-white/10 text-gray-400 text-base font-bold shrink-0"
    >+</button>
    <span className="text-sm font-mono text-white w-12 text-right shrink-0">
      {Math.round(safetyFactor * 100)}%
    </span>
  </div>
  <p className="text-[10px] text-gray-500 mt-2">50% = conservador · 100% = agressivo</p>
</AccordionSection>
```

### Testes — Nomes Exatos (describe/it)

```ts
describe('SafetyFactor slider — Fator de Correção', () => {
  it('displays value as percentage (0.80 → "80%")', ...)
  it('clamps lower bound: minus button at 0.50 stays at 0.50', ...)
  it('clamps upper bound: plus button at 1.00 stays at 1.00', ...)
  it('plus button increments by 0.05 (0.80 → 0.85)', ...)
  it('minus button decrements by 0.05 (0.80 → 0.75)', ...)
  it('label reads "Fator de Correção" not "Fator de Segurança"', ...)
  it('store value remains decimal (setSafetyFactor called with 0.85 not 85)', ...)
})
```
