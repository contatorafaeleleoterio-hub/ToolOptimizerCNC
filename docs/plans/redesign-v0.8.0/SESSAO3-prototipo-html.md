# Sessão 3 de 4 — Protótipo Visual HTML
## Redesign Visual v0.10.0

**Foco:** Criar `docs/design/DASHBOARD_V2_PROPOSAL.html` demonstrando todas as mudanças aprovadas
**Estimativa:** ~3 pontos | ~30K tokens
**Pré-requisitos:** Plano aprovado ✅ (26/03/2026)
**Regra:** READ-ONLY em `src/` — nenhum arquivo de código alterado

---

## Contexto para Início de Sessão

```
/compact Sessão 3: Criar protótipo HTML visual DASHBOARD_V2_PROPOSAL.html
Contexto: plano aprovado em docs/plans/redesign-v0.8.0/abundant-riding-blanket.md
Violações mapeadas em: docs/plans/redesign-v0.8.0/SESSAO1-VIOLATION-CATALOG.md
Correções propostas em: docs/plans/redesign-v0.8.0/VISUAL-AUDIT-REPORT.md
Design system: .interface-design/system.md
Entregável: docs/design/DASHBOARD_V2_PROPOSAL.html (HTML autossuficiente)
Zero arquivos src/ alterados.
```

---

## Ações

- [ ] **Ação 1** (peso 3) — Criar `docs/design/DASHBOARD_V2_PROPOSAL.html`

---

## Estrutura do HTML (9 seções)

```
Seção 1  → Header + badge versão
Seção 2  → Tokens Reference (paleta visual)
Seção 3  → Correções Side-by-Side (Mudança A)
           3A: Slider Thumb ANTES (rgba) vs DEPOIS (frozen map)
           3B: ProgressCard ANTES (blur inner) vs DEPOIS (sem blur)
           3C: Spacing ANTES vs DEPOIS (h-1.5 → h-1, gap-1.5 → gap-2)
Seção 4  → Fusão Mobile (Mudança B)
           4A: ANTES — seções separadas (NumInput em cima, sliders embaixo)
           4B: DEPOIS — seção única colapsável input+slider+±
Seção 5  → ParameterHealthBar (Mudança C)
           5A: ANTES — barra contínua abaixo do slider
           5B: DEPOIS — equalizer acima do slider
Seção 6  → Siglas com Legenda (Mudança D)
           6A: ANTES — "Vc", "fz", "ae", "ap" sem explicação
           6B: DEPOIS — "Vc · Velocidade de Corte", etc.
Seção 7  → Botão Info (Mudança E)
           7A: ANTES — expand_more sutil no label
           7B: DEPOIS — botão ℹ explícito + drawer com conteúdo real
Seção 8  → Dashboard Mobile Mockup Completo (375px)
           Todas as mudanças juntas em layout real
Seção 9  → Nota de aprovação
```

---

## Tech Stack do HTML

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
<!-- Tailwind CDN Play -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: { extend: {
      colors: {
        primary: '#00D9FF',
        secondary: '#39FF14',
        'background-dark': '#0F1419',
        'surface-dark': 'rgba(22,27,34,0.85)',
        'accent-purple': '#A855F7',
        'accent-orange': '#F97316',
        'seg-verde': '#2ecc71',
        'seg-amarelo': '#f39c12',
        'seg-vermelho': '#e74c3c',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    }}
  }
</script>
```

---

## Detalhes de Design por Seção

### Seção 3C — Spacing ANTES vs DEPOIS
Mostrar visualmente as diferenças de pixel:
- `mx-[18px]` → `mx-4` (18px → 16px)
- `h-1.5` → `h-1` (6px → 4px) — track do slider
- `gap-1.5` → `gap-2` (6px → 8px)

### Seção 5 — ParameterHealthBar Equalizer
8 barras verticais com altura crescente:
```
░ ▁ ▂ ▃ ▄ ▅ ▆ ███
```
- Cada barra = div com largura fixa (ex: 6px), gap entre elas (2px)
- Altura varia de 4px (barra 1) a 20px (barra 8) — progressão linear
- Barras ativas = cor da zona; inativas = rgba(255,255,255,0.1)
- Zona verde: barras 1-4 ativas | Amarelo: 5-6 | Vermelho: 7-8
- Demo interativa com range input para mostrar transição

### Seção 6 — Legenda de Siglas
Layout proposto:
```tsx
<span class="font-mono font-bold text-primary text-sm">Vc</span>
<span class="text-xs text-gray-500 ml-1">· Velocidade de Corte</span>
```

### Seção 7 — Botão ℹ
```tsx
<button class="w-6 h-6 rounded-full border border-primary/30 flex items-center
               justify-center hover:border-primary hover:shadow-neon-cyan transition-all">
  <span class="material-symbols-outlined text-primary text-sm">info</span>
</button>
```
Drawer com conteúdo real do `SLIDER_VISUAL` (colar textos no HTML):
```
desc: "Velocidade tangencial na aresta da ferramenta durante o corte."
aumentar: "Usinagem mais rápida, mas desgaste prematuro e mais calor gerado."
diminuir: "Ferramenta mais protegida, porém pode manchar o acabamento superficial."
equilibrio: "Ajuste junto com fz — material mais duro exige Vc menor."
```

### Seção 8 — Mobile Mockup Completo
Container de 375px de largura centralizado:
- Fundo `#0F1419` com bordas de device mockup
- Accordion "Parâmetros de Corte" expandido mostrando Vc com:
  - Equalizer acima
  - Linha: [ℹ] Vc · Vel. de Corte [input] m/min
  - Linha: [−] ══════●════ [+]
- Outros 3 parâmetros colapsados

---

## Verificação

- [ ] `docs/design/DASHBOARD_V2_PROPOSAL.html` criado
- [ ] Abre no browser sem erros de console
- [ ] Tokens corretos (primary = `#00D9FF`, bg = `#0F1419`)
- [ ] Seções ANTES/DEPOIS claramente identificadas (borda vermelha/verde)
- [ ] Equalizer com demo interativa (range input) funcionando
- [ ] Botão ℹ abre/fecha drawer com JS
- [ ] Mobile mockup renderiza em 375px
- [ ] `git diff src/` = vazio (zero arquivos src/ alterados)

---

## Após Aprovação do Protótipo

Rafael aprova o HTML → iniciar Sessão 4.

**Comando de início da Sessão 4:**
```
/compact Sessão 4: Implementar slider-tokens.ts + refatorar bidirectional-slider + styled-slider.
Contexto: protótipo aprovado em docs/design/DASHBOARD_V2_PROPOSAL.html
Relatório de auditoria: docs/plans/redesign-v0.8.0/VISUAL-AUDIT-REPORT.md
Plano de sessão: docs/plans/redesign-v0.8.0/SESSAO4-tokens-sliders-desktop.md
```
