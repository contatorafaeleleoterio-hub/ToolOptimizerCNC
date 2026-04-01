# ITEM #8 — Atualização 3.1: SGB Acima do Slider

**Status:** ✅ APROVADO (30/03/2026)
**Sessão:** Revisão iterativa 30/03 — segunda parte

---

## Decisão

Reposicionar o `SegmentedGradientBar` para **acima do slider** em desktop e mobile.

## Onde

- Desktop: `src/components/fine-tune-panel.tsx`
- Mobile: `src/components/mobile/mobile-fine-tune-section.tsx`

## Detalhe

**Ordem correta após implementação:**

```
1. Header (label + valor)
2. SegmentedGradientBar   ← ACIMA (desktop: segments=50 / mobile: segments=30)
3. Slider (BidirectionalSlider desktop / TouchSlider mobile)
```

**Motivo:** SGB abaixo do slider é coberto pelo dedo/cursor durante o arrasto.

**Desktop (`fine-tune-panel.tsx`):**
- `SegmentedGradientBar` com `segments={50}` inserido entre o header e o `BidirectionalSlider`

**Mobile (`mobile-fine-tune-section.tsx`):**
- `SegmentedGradientBar` com `segments={30}` inserido entre o header e a row `[−] slider [+]`

---

## Mapeamento Técnico do Codebase

### Componentes Envolvidos

| Componente | Arquivo | Linhas | Relevância |
|------------|---------|--------|------------|
| `FineTunePanel` | `src/components/fine-tune-panel.tsx` | 1-163 | Desktop — 4 sliders com SGB abaixo |
| `SegmentedGradientBar` | `src/components/segmented-gradient-bar.tsx` | 1-245 | Componente SGB (props: `paramKey`, `segments?`) |
| `StyledSlider` | `src/components/styled-slider.tsx` | — | Slider usado no fine-tune desktop |
| Mobile fine-tune | `src/components/mobile/mobile-fine-tune-section.tsx` | 1-358 | Mobile — TouchSlider + SGB(30) abaixo |

### Ordem Atual no Desktop (fine-tune-panel.tsx:88-157)

Dentro do `.map()` de `SLIDER_VISUAL` (L80-158), cada parâmetro renderiza:

```
L89-106:  Header (label clicável + seta ↓ + valor editável)
L121-126: StyledSlider (value, min, max, step, color, recomendado)
L128-129: SegmentedGradientBar (paramKey={key})        ← MOVER PARA CIMA
L131-153: Educational drawer (condicional isOpen)
```

**Mudança:** Mover L128-129 para entre L106 e L121 (após header, antes do slider).

### Ordem Atual no Mobile (mobile-fine-tune-section.tsx)

Cada parâmetro renderiza:
```
Header (label + valor editável)
Row: [−] TouchSlider [+]
SegmentedGradientBar(segments={30})    ← MOVER PARA CIMA
Educational drawer
```

**Mudança:** Mover SGB para entre header e row [-] TouchSlider [+].

### Interface SGB

```ts
// src/components/segmented-gradient-bar.tsx:184-188
interface SegmentedGradientBarProps {
  paramKey: 'vc' | 'fz' | 'ae' | 'ap';
  segments?: number; // Default: 50 (desktop), usar 30 para mobile
}
```

---

## Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/components/fine-tune-panel.tsx` | Reordenar JSX: mover SGB (L128-129) para antes do StyledSlider (L121) | L88-158 (dentro do .map) |
| `src/components/mobile/mobile-fine-tune-section.tsx` | Reordenar JSX: mover SGB para antes da row [−] TouchSlider [+] | Seções de cada parâmetro |

### Sequência de Execução

1. **Desktop (fine-tune-panel.tsx):** Dentro do `.map()` (L80), mover a linha:
   ```tsx
   <SegmentedGradientBar paramKey={key} />
   ```
   De **após** o `<StyledSlider>` (L129) para **antes** dele (entre o header e o slider).

   **Ordem final:**
   ```
   Header (label + valor)
   SegmentedGradientBar(paramKey={key})    ← NOVO LOCAL
   StyledSlider(value, min, max, step...)
   Educational drawer
   ```

2. **Mobile (mobile-fine-tune-section.tsx):** Mesma reordenação — SGB(30) antes da row [-] TouchSlider [+].

3. **Verificar alinhamento visual:** SGB e slider devem ter mesma largura. O slider usa `mx-[18px]` de margin — verificar se SGB precisa do mesmo margin para alinhar.

### Dependências

- **Depende de:** nenhum item
- **Bloqueia:** nenhum item (mas executar antes de ITEM-7 — Popover — para evitar conflito de posição no JSX)

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| SGB e slider com larguras diferentes — desalinhamento visual | Verificar se SGB precisa de `mx-[18px]` matching ou se já ocupa 100% da largura disponível |
| Thumb do slider pode sobrepor o SGB quando estão próximos | Adicionar `gap-1` ou `mb-1` entre SGB e slider se necessário |
| Mudança é pura reordenação de JSX — zero risco lógico | Apenas verificar visual |

### Critérios de Aceitação

- SGB renderiza ACIMA do slider nos 4 parâmetros (Vc, fz, ae, ap)
- Desktop: SGB com 50 segmentos (default)
- Mobile: SGB com 30 segmentos
- Sem sobreposição visual entre SGB e slider
- Funcionalidade inalterada (indicator position, zone colors)

### Testes

| Teste | Descrição |
|-------|-----------|
| `SGB renders before slider in DOM` | Para cada parâmetro, SGB aparece antes do slider no DOM |
| `SGB indicator position unchanged` | Position [0,1] e zone colors idênticos ao antes |
| `desktop uses 50 segments` | Default segments=50 aplicado |
| `mobile uses 30 segments` | `segments={30}` explícito |
| `no visual overlap` | SGB e slider com gap adequado |

---

## Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Reordenar JSX desktop (4 parâmetros, 1 linha move) | 1 |
| Reordenar JSX mobile (4 parâmetros) | 1 |
| Verificar alinhamento visual | 1 |
| Testes (5 casos) | 1 |
| **Total** | **4 pontos (~0.5 sessão)** |

---

## Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando
npm run build       # Build sem erros
```

---

## REFINAMENTO FINAL (31/03/2026)

### Sem Decisões Pendentes
Item é pura reordenação de JSX. Sem novos imports.

### Código Proposto — Desktop `fine-tune-panel.tsx` (Depois, dentro do `.map()`)

```tsx
// ANTES (L88-158 dentro do .map):
//   Header (label + valor)
//   StyledSlider          ← L121-126
//   SegmentedGradientBar  ← L128-129  (abaixo do slider)
//   Educational drawer    ← L131-153

// DEPOIS — mover SegmentedGradientBar para ANTES do StyledSlider:
<div key={key} className="flex flex-col gap-1 group relative">
  {/* Header (label clicável + valor editável) — inalterado */}
  <div className="flex justify-between items-end">
    ...
  </div>

  {/* SGB acima do slider  ← NOVO LOCAL */}
  <SegmentedGradientBar paramKey={key} />

  {/* Slider — agora abaixo do SGB */}
  <StyledSlider
    value={val} min={min} max={max} step={step}
    color={color} label={label}
    recomendado={recomendado}
    onChange={(v) => ajustarParametros({ [key]: v })}
  />

  {/* Educational drawer — inalterado */}
  {isOpen && ( ... )}
</div>
```

### Código Proposto — Mobile `mobile-fine-tune-section.tsx` (Depois)

```tsx
// Mesma reordenação: SGB(30) sobe para antes da row [-] TouchSlider [+]
// ANTES:
//   Header
//   Row: [−] TouchSlider [+]
//   SegmentedGradientBar(segments={30})  ← abaixo

// DEPOIS:
//   Header
//   SegmentedGradientBar(segments={30})  ← acima
//   Row: [−] TouchSlider [+]
```

> **Nota alinhamento:** Após mover o SGB, verificar se precisa de `mb-1` entre SGB e slider para evitar que o thumb sobreponha o último segmento.

### Testes — Nomes Exatos (describe/it)

```ts
describe('FineTunePanel — SGB position', () => {
  it('SGB renders before StyledSlider in DOM for each parameter', ...)
  it('SGB indicator position is unchanged after reorder', ...)
  it('desktop SGB uses 50 segments (default)', ...)
})

describe('MobileFineTuneSection — SGB position', () => {
  it('SGB renders before TouchSlider row in DOM', ...)
  it('mobile SGB uses 30 segments', ...)
})
```
