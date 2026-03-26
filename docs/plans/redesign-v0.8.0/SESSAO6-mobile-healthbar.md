# Sessão 6 de 4 — Mobile + HealthBar Redesign → v0.10.0
## Redesign Visual v0.10.0 — Mudanças B + C + D + E (mobile)

**Foco:** Redesign ParameterHealthBar (equalizer) + Fusão de seções mobile + bump v0.10.0
**Estimativa:** ~22 pontos | ~85K tokens
**Pré-requisitos:** Sessões 4 e 5 concluídas (desktop refatorado)

---

## Contexto para Início de Sessão

```
/compact Sessão 6: mobile — HealthBar redesign equalizer + fusão mobile sections + v0.10.0.
Contexto: desktop completo (sessões 4+5).
Mudanças: B (fusão mobile) + C (equalizer acima) + D (siglas mobile) + E (botão ℹ mobile).
Arquivos-chave:
  src/components/parameter-health-bar.tsx
  src/components/mobile/mobile-fine-tune-section.tsx
  src/components/mobile/mobile-config-section.tsx
  src/pages/mobile-page.tsx
Plano: docs/plans/redesign-v0.8.0/SESSAO6-mobile-healthbar.md
```

---

## Ações

- [ ] **Ação 1** (peso 1) — Ler `src/components/parameter-health-bar.tsx`
- [ ] **Ação 2** (peso 1) — Ler `src/components/mobile/mobile-fine-tune-section.tsx`
- [ ] **Ação 3** (peso 1) — Ler `src/components/mobile/mobile-config-section.tsx`
- [ ] **Ação 4** (peso 3) — Redesign `parameter-health-bar.tsx` → equalizer barras crescentes
- [ ] **Ação 5** (peso 3) — Refatorar `mobile-config-section.tsx` → absorver parâmetros fundidos
- [ ] **Ação 6** (peso 3) — Refatorar `mobile-fine-tune-section.tsx` → fusão + HealthBar acima + botão ℹ
- [ ] **Ação 7** (peso 2) — Editar `src/pages/mobile-page.tsx` → remover `MobileFineTuneSection` separada
- [ ] **Ação 8** (peso 3) — `npm run test`
- [ ] **Ação 9** (peso 3) — `npm run build`
- [ ] **Ação 10** (peso 2) — Bump versão `0.9.4` → `0.10.0` em `package.json`
- [ ] **Ação 11** (peso 2) — Commit final + tag: `feat: redesign visual v0.10.0`

**Total:** 24 pontos ✅ (limite máximo)

---

## Detalhe das Mudanças

### Mudança C — `parameter-health-bar.tsx`: Redesign Equalizer

**Conceito:** substituir barra contínua por 8 barras verticais crescentes.

```
Barra 1 (mais baixa, 4px) ← posição mínima
Barra 2 (6px)
Barra 3 (8px)
...
Barra 8 (mais alta, 20px) ← posição máxima
```

**Algoritmo:**
- `position` [0,1] → `barsActive = Math.round(position * 8)` — quantas barras iluminar
- Barras ativas = cor da zona atual
- Barras inativas = `rgba(255,255,255,0.08)`
- Cor da zona: verde `#2ecc71` | amarelo `#f39c12` | vermelho `#e74c3c`

**Implementação:**
```tsx
const BARS = [4, 6, 8, 10, 12, 14, 17, 20] // alturas em px
const barsActive = Math.round(position * 8)
const zoneColor = zone === 'verde' ? '#2ecc71' : zone === 'amarelo' ? '#f39c12' : '#e74c3c'

return (
  <div className="flex items-end gap-[2px] h-5">
    {BARS.map((h, i) => (
      <div
        key={i}
        style={{
          width: '6px',
          height: `${h}px`,
          borderRadius: '2px',
          backgroundColor: i < barsActive ? zoneColor : 'rgba(255,255,255,0.08)',
          transition: 'background-color 0.2s ease',
        }}
      />
    ))}
    {/* Label direita: readout (L/D, ae/D ratio, CTF badge) */}
  </div>
)
```

**Posição:** mover para ACIMA do slider em todos os componentes que usam `ParameterHealthBar`:
- `fine-tune-panel.tsx` (desktop) — já ajustado na Sessão 5
- `mobile-fine-tune-section.tsx` (mobile) — ajustar nesta sessão

> **Nota:** `fz` ainda mostra `InactiveBar` antes da simulação — manter essa lógica, apenas substituir a barra contínua pelo equalizer inativo (todas as barras em `rgba(255,255,255,0.08)`).

---

### Mudança B — Fusão Mobile de Seções

**Estrutura ANTES (`mobile-page.tsx`):**
```tsx
<MobileConfigSection />     // material / tool / parâmetros NumInput / safety
<MobileResultsSection />    // resultados
<MobileFineTuneSection />   // sliders Vc/fz/ae/ap (seção separada)
```

**Estrutura DEPOIS:**
```tsx
<MobileConfigSection />     // material / tool / parâmetros FUNDIDOS / safety
<MobileResultsSection />    // resultados (sem alteração)
// MobileFineTuneSection REMOVIDA
```

#### `mobile-config-section.tsx` — Accordion "Parâmetros de Corte" novo layout

O accordion "Parâmetros de Corte" atual tem só `NumInput` por parâmetro.
Substituir por layout fundido:

```tsx
{/* Para cada parâmetro: equalizer + header + slider + input */}
<div className="flex flex-col gap-3">
  {SLIDER_VISUAL.map(({ key, label, fullLabel, unit, color, rgb, desc, ... }) => (
    <div key={key} className="flex flex-col gap-2">
      {/* Equalizer ACIMA */}
      <ParameterHealthBar paramKey={key} />

      {/* Linha 1: botão ℹ + sigla + legenda + input + unidade */}
      <div className="flex items-center gap-2">
        <InfoButton onClick={() => toggleInfo(key)} />
        <span className="font-mono font-bold text-sm" style={{color: COLOR_HEX[color]}}>{label}</span>
        <span className="text-xs text-gray-500">· {FULL_NAMES[key]}</span>
        <div className="flex-1" />
        <input type="number" ... className="w-20 ... [appearance:textfield]" />
        <span className="text-xs text-gray-500">{unit}</span>
      </div>

      {/* Linha 2: − + TouchSlider + + */}
      <div className="flex items-center gap-2">
        <button className={BTN_CLS}>−</button>
        <div className="flex-1"><TouchSlider ... /></div>
        <button className={BTN_CLS}>+</button>
      </div>

      {/* Drawer info (se aberto) */}
      {openInfo === key && <InfoDrawer content={SLIDER_VISUAL_MAP[key]} />}
    </div>
  ))}
</div>
```

**Dados reutilizados:**
- `SLIDER_VISUAL` de `mobile-fine-tune-section.tsx` L42-67 → mover para arquivo compartilhado ou reimportar
- `TouchSlider` de `mobile-fine-tune-section.tsx` → importar em `mobile-config-section.tsx`
- `ParameterHealthBar` → já importável

#### `mobile-fine-tune-section.tsx` — O que fazer
Após mover os sliders para `mobile-config-section.tsx`, este arquivo pode ser:
- **Opção A:** Deletado completamente (conteúdo 100% migrado)
- **Opção B:** Mantido vazio/stub por compatibilidade (mais seguro)
→ **Usar Opção A** (mais limpo, remover import em `mobile-page.tsx`)

#### `mobile-page.tsx` — Remover referência
```tsx
// REMOVER:
import { MobileFineTuneSection } from '@/components/mobile/mobile-fine-tune-section';
// REMOVER da JSX:
<MobileFineTuneSection />
```

---

### Mudanças D + E no Mobile

**Mudança D (siglas):** aplicada no layout fundido (item acima)

**Mudança E (botão ℹ):** aplicada no layout fundido (item acima)

**Componente `InfoDrawer` (inline ou extraído):**
```tsx
function InfoDrawer({ content }: { content: typeof SLIDER_VISUAL[0] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3 animate-[fadeInUp_0.5s_ease-out]">
      <p className="text-xs text-gray-400 leading-relaxed mb-2">{content.desc}</p>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-xs font-bold text-secondary w-14 shrink-0">▲ MAIS</span>
          <span className="text-xs text-gray-400 leading-relaxed">{content.aumentar}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xs font-bold text-seg-vermelho w-14 shrink-0">▼ MENOS</span>
          <span className="text-xs text-gray-400 leading-relaxed">{content.diminuir}</span>
        </div>
        <div className="flex items-start gap-2 pt-2 border-t border-white/5">
          <span className="material-symbols-outlined text-yellow-500 text-sm shrink-0">balance</span>
          <span className="text-xs text-gray-500 italic leading-relaxed">{content.equilibrio}</span>
        </div>
      </div>
    </div>
  )
}
```

---

## Verificação

- [ ] `parameter-health-bar.tsx`: barras verticais crescentes substituindo barra contínua
- [ ] HealthBar posicionado ACIMA do slider (mobile + desktop)
- [ ] Seção "Parâmetros de Corte" no mobile tem: equalizer + input + slider + ±
- [ ] Botão ℹ visível e funcional em todos os 4 parâmetros (mobile)
- [ ] Siglas com legenda ("Vc · Velocidade de Corte", etc.)
- [ ] `MobileFineTuneSection` removida de `mobile-page.tsx`
- [ ] `npm run test`: todos os testes passam
- [ ] `npm run build`: bundle limpo
- [ ] `package.json` version = `"0.10.0"`
- [ ] Commit: `feat: redesign visual v0.10.0 — mobile fusion + equalizer + info button`
- [ ] Push: `git push origin main`

---

## Relatório Final da Sessão

```
Sessão 6 de 6 concluída → v0.10.0 RELEASED
Entregáveis:
  ✅ slider-tokens.ts (sessão 4)
  ✅ Desktop: bidirectional-slider, styled-slider, shared-result-parts,
              fine-tune-panel, config-panel, results-panel (sessões 4+5)
  ✅ parameter-health-bar: equalizer redesign
  ✅ Mobile: seções fundidas (parâmetros + ajuste fino)
  ✅ Botão ℹ + legenda siglas (mobile + desktop)
  ✅ v0.10.0 no ar
```
