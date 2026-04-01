# ITEM #9 — Atualização 3.2: Botão de Explicação (Popover)

**Status:** ✅ APROVADO (30/03/2026)
**Sessão:** Revisão iterativa 30/03 — segunda parte

---

## Decisão

Substituir o botão seta (↓) por um botão visível `ℹ️ O QUE É [PARAM]?` com popover ao hover.

## Onde

- `src/components/fine-tune-panel.tsx`
- `src/components/mobile/mobile-fine-tune-section.tsx`
- Novo arquivo: `src/components/ParamExplanation.tsx` (componente reutilizável)

## Detalhe

**Botão:**
- Full-width, cor cyan (`text-cyan-400`, `border-cyan-400/40`, `bg-cyan-500/10`)
- Label: `ℹ️ O QUE É {paramLabel.toUpperCase()}?`
- Hover: `bg-cyan-500/20`, `border-cyan-400/60`

**Popover:**
- Aparece ao hover (`group-hover:block`)
- Posição: `absolute bottom-full mb-2` — acima do botão
- Fundo: `bg-gray-900`, `border border-cyan-400/40`, `rounded-lg`, `backdrop-blur`
- Texto: `text-xs text-gray-300`
- z-index: `z-10`

**Componente `ParamExplanation.tsx`:** encapsula botão + popover, recebe `paramLabel` e `explanationText` como props.

---

## Mapeamento Técnico do Codebase

### Componentes Envolvidos

| Componente | Arquivo | Linhas | Relevância |
|------------|---------|--------|------------|
| `FineTunePanel` | `src/components/fine-tune-panel.tsx` | 1-163 | Desktop — botão seta (↓) que expande drawer educacional |
| Mobile fine-tune | `src/components/mobile/mobile-fine-tune-section.tsx` | 1-358 | Mobile — drawer educacional similar |

### Estado Atual — Botão Seta e Drawer Educacional (fine-tune-panel.tsx)

**Botão seta (L92-106):** É um `<button>` com label clicável que faz `toggleDrawer(key)`:
```tsx
<button onClick={() => toggleDrawer(key)} className="flex items-center gap-1.5 cursor-pointer"
  aria-expanded={isOpen} aria-label={`Informações sobre ${fullLabel}`}>
  <span className={`text-base font-bold font-mono text-${color}`}>{label}</span>
  <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">{fullLabel}</span>
  <span className="material-symbols-outlined text-gray-600 transition-transform duration-300"
    style={{ fontSize: '14px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    expand_more
  </span>
</button>
```

**Drawer educacional (L132-153):** Conteúdo expandido com desc, aumentar, diminuir, equilibrio:
```tsx
{isOpen && (
  <div className="mt-1 rounded-xl border bg-black/30 p-3 animate-[fadeInUp_0.25s_ease-out]"
    style={{ borderColor: `rgba(${rgb},0.18)` }}>
    <p className="text-xs text-gray-400 leading-relaxed mb-2.5">{desc}</p>
    <div className="space-y-1.5">
      <div>▲ MAIS — {aumentar}</div>
      <div>▼ MENOS — {diminuir}</div>
      <div>⚖️ {equilibrio}</div>
    </div>
  </div>
)}
```

### Textos Educacionais Existentes (SLIDER_VISUAL, fine-tune-panel.tsx:11-32)

```ts
const SLIDER_VISUAL = [
  { key: 'vc', label: 'Vc', fullLabel: 'VEL. DE CORTE', unit: 'M/MIN', color: 'primary',
    desc: 'Velocidade tangencial na aresta da ferramenta durante o corte.',
    aumentar: 'Usinagem mais rápida, mas desgaste prematuro e mais calor gerado.',
    diminuir: 'Ferramenta mais protegida, porém pode manchar o acabamento superficial.',
    equilibrio: 'Ajuste junto com fz — material mais duro exige Vc menor.' },
  { key: 'fz', label: 'fz', fullLabel: 'AVANÇO/DENTE', ... },
  { key: 'ae', label: 'ae', fullLabel: 'ENGAJ. RADIAL', ... },
  { key: 'ap', label: 'ap', fullLabel: 'PROF. AXIAL', ... },
];
```

> **Reutilizar:** Os textos `desc` de `SLIDER_VISUAL` são ideais para o popover. Já cobrem os 4 parâmetros.

### Posição no Layout (após ITEM-6 — SGB acima)

Ordem final de cada parâmetro:
```
Header (label + valor editável)
SegmentedGradientBar               ← ITEM-6 (já acima)
StyledSlider
ℹ️ O QUE É [PARAM]? (botão)      ← ESTE ITEM (substitui a seta ↓)
Educational drawer (opcional, ao hover/click)
```

---

## Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/components/param-explanation.tsx` | **Criar** — componente reutilizável (botão + popover) | Novo arquivo |
| `src/components/fine-tune-panel.tsx` | Substituir botão seta (↓) + drawer por `ParamExplanation` | L92-106 (botão), L132-153 (drawer) |
| `src/components/mobile/mobile-fine-tune-section.tsx` | Mesma substituição para mobile | Seções de cada parâmetro |

### Sequência de Execução

1. **Criar `param-explanation.tsx`** (kebab-case conforme convenção do projeto):
   ```tsx
   interface ParamExplanationProps {
     paramLabel: string;       // ex: "Vc", "fz", "ae", "ap"
     fullLabel: string;        // ex: "VEL. DE CORTE"
     explanationText: string;  // desc do SLIDER_VISUAL
     color: string;            // cor do parâmetro (primary, secondary, etc.)
   }
   ```
   - Botão: full-width, `text-cyan-400`, `border-cyan-400/40`, `bg-cyan-500/10`
   - Label: `ℹ️ O QUE É {fullLabel}?`
   - Hover: `bg-cyan-500/20`, `border-cyan-400/60`
   - Popover: `group-hover:block` (desktop) ou toggle onClick (mobile)
   - Popover position: `absolute bottom-full mb-2`, `z-10`
   - Popover style: `bg-gray-900 border border-cyan-400/40 rounded-lg backdrop-blur`

2. **Decidir comportamento mobile:** `hover` não funciona em touch — usar `onClick` toggle no mobile.
   - Solução: usar state `const [showPopover, setShowPopover] = useState(false)` + click toggle
   - Desktop: `onMouseEnter` + `onMouseLeave` (hover)
   - Mobile: `onClick` toggle (detectar via `use-is-mobile.ts` hook existente)

3. **Desktop (fine-tune-panel.tsx):**
   - Remover o `<button>` seta (L92-106) — a ação de expand é substituída pelo popover
   - Remover o drawer educacional (L132-153) — texto migra para o popover
   - Adicionar `<ParamExplanation>` após o `<StyledSlider>` (L126)
   - Passar `desc` do `SLIDER_VISUAL` como `explanationText`

4. **Mobile (mobile-fine-tune-section.tsx):** Mesma substituição — remover drawer, adicionar ParamExplanation

5. **Posicionar popover acima do botão** (`bottom-full mb-2`) — evita sobrepor slider

### Dependências

- **Depende de:** nenhum item (mas executar após ITEM-6 — SGB acima — para posição correta no JSX)
- **Bloqueia:** nenhum item

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| `group-hover` não funciona em touch/mobile | Usar onClick toggle no mobile (detectar via `useIsMobile` hook) |
| Popover cortado pelo container `overflow-hidden` | Usar `z-10` + verificar que `FineTunePanel` não tem `overflow-hidden` no JSX pai |
| Textos atuais (`aumentar`, `diminuir`, `equilibrio`) são mais ricos que só `desc` | Decidir: popover mostra só `desc` (curto) ou inclui aumentar/diminuir (completo)? Recomendação: só `desc` no popover — manter simples |
| Remover drawer educacional remove conteúdo útil (▲ MAIS, ▼ MENOS) | O drawer pode coexistir com o popover — popover para resumo rápido, drawer para detalhes completos. Avaliar com Rafael |

### Critérios de Aceitação

- Botão `ℹ️ O QUE É [PARAM]?` visível em cada parâmetro (full-width, cyan)
- Popover aparece ao hover (desktop) ou click (mobile) com texto educacional
- Popover posicionado acima do botão (não sobrepõe slider)
- Funciona em desktop e mobile
- 4 textos educacionais distintos (Vc, fz, ae, ap)
- Acessibilidade: `aria-label` no botão, `role="tooltip"` no popover

### Testes

| Teste | Descrição |
|-------|-----------|
| `renders button for each parameter` | 4 botões "ℹ️ O QUE É..." renderizados |
| `popover shows on hover (desktop)` | mouseEnter mostra, mouseLeave esconde |
| `popover shows on click (mobile)` | Click toggle |
| `correct text per parameter` | Vc mostra desc de Vc, fz mostra desc de fz, etc. |
| `z-index above other elements` | Popover não fica atrás de slider/SGB |
| `popover positioned above button` | `bottom-full` verificado |

---

## Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Criar `param-explanation.tsx` | 2 |
| Integrar no desktop (substituir seta + drawer) | 2 |
| Integrar no mobile (com toggle onClick) | 2 |
| Testes (6 casos) | 2 |
| **Total** | **8 pontos (~1 sessão)** |

---

## Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando
npm run build       # Build sem erros
```

---

## REFINAMENTO FINAL (31/03/2026)

### Decisões Resolvidas

| Decisão | Resolução |
|---------|-----------|
| Popover mostra só `desc` OU completo (com aumentar/diminuir/equilibrio)? | **Só `desc`** — popover é resumo rápido (1 linha). O drawer completo é removido. |
| Drawer educacional coexiste com popover ou é substituído? | **Substituído** — drawer removido. Conteúdo `aumentar/diminuir/equilibrio` descartado do UI (dados disponíveis no `SLIDER_VISUAL` para futuro). |
| Hover (desktop) vs click (mobile) | **Desktop:** `onMouseEnter`/`onMouseLeave` — **Mobile:** detectar via `useIsMobile` hook, usar click toggle |

### Imports Adicionais

**`src/components/param-explanation.tsx`** (novo):
```ts
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-is-mobile';
```

**`src/components/fine-tune-panel.tsx`**:
```ts
import { ParamExplanation } from './param-explanation';   // NOVO
// REMOVER: nenhum import removido, apenas o JSX do drawer e botão seta
```

### Código Proposto — `param-explanation.tsx` (Novo arquivo)

```tsx
// src/components/param-explanation.tsx
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface ParamExplanationProps {
  fullLabel: string;       // ex: "VEL. DE CORTE"
  explanationText: string; // desc do SLIDER_VISUAL
}

export function ParamExplanation({ fullLabel, explanationText }: ParamExplanationProps) {
  const isMobile = useIsMobile();
  const [showPopover, setShowPopover] = useState(false);

  const handleMouseEnter = () => { if (!isMobile) setShowPopover(true); };
  const handleMouseLeave = () => { if (!isMobile) setShowPopover(false); };
  const handleClick      = () => { if (isMobile)  setShowPopover((v) => !v); };

  return (
    <div className="relative">
      <button
        role="button"
        aria-label={`O que é ${fullLabel}?`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-1.5 px-2 py-1 rounded-md
                   border border-cyan-400/40 bg-cyan-500/10 text-cyan-400 text-xs
                   hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>info</span>
        <span className="font-medium tracking-wide">O QUE É {fullLabel}?</span>
      </button>

      {showPopover && (
        <div
          role="tooltip"
          className="absolute bottom-full mb-2 left-0 right-0 z-10
                     bg-gray-900 border border-cyan-400/40 rounded-lg p-3
                     backdrop-blur-sm shadow-lg"
        >
          <p className="text-xs text-gray-300 leading-relaxed">{explanationText}</p>
          {/* Seta apontando para baixo */}
          <div className="absolute top-full left-1/2 -translate-x-1/2
                          border-4 border-transparent border-t-cyan-400/40" />
        </div>
      )}
    </div>
  );
}
```

### Código Proposto — Integração em `fine-tune-panel.tsx` (Depois)

```tsx
// Dentro do .map() — substituir o bloco do botão seta (L92-106) e drawer (L131-153)

// REMOVER: botão seta com toggleDrawer e toda lógica de isOpen/openKey
// REMOVER: drawer educacional (isOpen && <div>...)
// REMOVER: toggleDrawer function e openKey state

// ADICIONAR: após o StyledSlider (e após o SGB se ITEM-6 já aplicado):
<ParamExplanation
  fullLabel={fullLabel}
  explanationText={desc}
/>

// Header simplificado (sem botão seta):
<div className="flex justify-between items-end">
  <div className="flex items-baseline gap-1.5">
    <span className={`text-base font-bold font-mono text-${color}`}>{label}</span>
    <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">{fullLabel}</span>
    {/* seta expand_more REMOVIDA */}
  </div>
  <div className="text-right">
    <input type="number" ... /> {/* inalterado */}
    <div className="text-xs text-gray-500 font-mono tracking-wider">{unit}</div>
  </div>
</div>
```

### Testes — Nomes Exatos (describe/it)

```ts
describe('ParamExplanation', () => {
  it('renders button with label "O QUE É [FULLLABEL]?"', ...)
  it('shows popover on mouseEnter (desktop)', ...)
  it('hides popover on mouseLeave (desktop)', ...)
  it('shows popover on click (mobile — useIsMobile returns true)', ...)
  it('toggles popover on successive clicks (mobile)', ...)
  it('popover contains the explanationText prop', ...)
  it('popover has role="tooltip"', ...)
  it('button has aria-label with fullLabel', ...)
})

describe('FineTunePanel — after ITEM-7', () => {
  it('renders 4 ParamExplanation buttons (one per parameter)', ...)
  it('does not render educational drawer (expand_more gone)', ...)
})
```
