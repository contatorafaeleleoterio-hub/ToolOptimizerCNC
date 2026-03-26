# Plano de Execução: Redesign Visual do Dashboard ToolOptimizer CNC

> **Data:** 26/03/2026
> **Versão base:** v0.9.4
> **Tipo:** 🎨 Design Audit + Protótipo Visual
> **Sessões:** 3 | **Peso total:** 65 pontos
> **Entregáveis:** Relatório de audit + 1 arquivo HTML protótipo auto-contido
> **Restrição:** ZERO alterações em `src/` — apenas análise e proposta

## Contexto

O dashboard v0.9.4 está **funcional e completo**, mas apresenta **26+ violações** contra o design system (`.interface-design/system.md`). Cores hardcoded inline, spacing fora da grid 4px, profundidade excessiva de glassmorphism e classes Tailwind dinâmicas que não passam no purge. Este plano executa uma análise visual completa + protótipo HTML corrigido, **sem alterar nenhum arquivo em `src/`**.

**Direction:** Boldness & Clarity (system.md)

---

## Sessão 1 de 3 — Análise, Audit e Critique (READ-ONLY)

**Foco:** Ler todos os componentes linha a linha, cruzar com system.md, catalogar violações com `[arquivo:linha] → regra violada`.
**Peso estimado:** ~20 pontos | 12 ações

### Ações

| # | Ação | Peso | Arquivo |
|---|------|------|---------|
| 1 | Ler system.md (tokens, 10 regras) | 1 | `.interface-design/system.md` |
| 2 | Ler spec visual | 1 | `docs/design/UI_DESIGN_SPEC_FINAL.md` |
| 3 | Ler branding | 1 | `docs/design/UI_BRANDING.md` |
| 4 | Ler protótipo HTML existente | 1 | `docs/design/DASHBOARD.md` |
| 5 | Auditar App.tsx (layout grid) | 1 | `src/App.tsx` |
| 6 | Auditar results-panel.tsx (269 linhas) | 1 | `src/components/results-panel.tsx` |
| 7 | Auditar config-panel.tsx (374 linhas) | 1 | `src/components/config-panel.tsx` |
| 8 | Auditar shared-result-parts.tsx (142 linhas) | 1 | `src/components/shared-result-parts.tsx` |
| 9 | Auditar fine-tune-panel.tsx (174 linhas) | 1 | `src/components/fine-tune-panel.tsx` |
| 10 | Auditar bidirectional-slider.tsx (224 linhas) | 1 | `src/components/bidirectional-slider.tsx` |
| 11 | Auditar gauge.tsx (172 linhas) | 1 | `src/components/gauge.tsx` |
| 12 | Auditar index.css (tokens, animações) | 1 | `src/index.css` |

### Critique Estruturado (4 eixos)

Após leitura, classificar achados como `✅ Manter` | `⚠️ Melhorar` | `❌ Corrigir`:

**Eixo 1 — Composição:** Ritmo visual entre painéis, ponto focal, proporções do grid
**Eixo 2 — Craft:** Grid 4px, hierarquia tipográfica, profundidade de superfícies
**Eixo 3 — Coerência:** Consistência padding/margin/blur entre painéis, cores seguindo tokens
**Eixo 4 — Código:** CSS hacks, valores mágicos, classes dinâmicas que não purgam

### Entregável
Nenhum arquivo escrito — apenas análise completa para alimentar Sessão 2.

---

## Sessão 2 de 3 — Relatório + Proposta por Componente

**Foco:** Escrever relatório formal de audit com violações exatas + proposta de melhoria por componente com justificativa em tokens do system.md.
**Peso estimado:** ~22 pontos | 8 ações

### Ações

| # | Ação | Peso | Descrição |
|---|------|------|-----------|
| 1 | Re-ler system.md | 1 | Referência de tokens para justificativas |
| 2 | Re-ler shared-result-parts.tsx | 1 | Padrões de classes dinâmicas |
| 3 | Escrever Seção 1: Composição | 3 | Layout 2-col vs 3-col, hierarquia visual, ritmo entre zonas |
| 4 | Escrever Seção 2: Craft | 3 | Spacing violations, backdrop-blur mix, animation timings |
| 5 | Escrever Seção 3: Coerência | 3 | Classes dinâmicas, rgba hardcoded, padding misto, safety color leakage |
| 6 | Escrever Seção 4: Código | 3 | Magic numbers, inline styles, profundidade excessiva |
| 7 | Escrever Seção 5: Propostas por componente | 3 | Formato: Estado atual → Problemas → Mudanças → Token justificativa → Impacto |
| 8 | Escrever Seção 6: Matriz de prioridade | 3 | Crítico / Importante / Nice-to-have |

### Arquivo de saída
`docs/plans/VISUAL-AUDIT-REPORT.md`

### Violações já identificadas (Quick Reference)

| # | Violação | Arquivos | Severidade |
|---|----------|----------|------------|
| 1 | 26 `rgba(${rgb},...)` hardcoded | bidirectional-slider, styled-slider, fine-tune-panel | ❌ Crítico |
| 2 | 10 classes Tailwind dinâmicas `text-${color}` | shared-result-parts, fine-tune-panel | ❌ Crítico |
| 3 | 18 valores non-4px spacing | 6+ componentes | ⚠️ Alto |
| 4 | backdrop-blur misto (xl vs md) | shared-result-parts (ProgressCard vs BigNumber) | ⚠️ Médio |
| 5 | Padding misto (p-4/p-5/p-6) | shared-result-parts, results-panel | ⚠️ Médio |
| 6 | 5 níveis de nesting (max=2) | results-panel zona 5 (fórmulas) | ⚠️ Médio |
| 7 | Animation timings espalhados (0.9s, 0.45s, 0.25s) | results-panel, fine-tune-panel | Baixo |
| 8 | Layout doc ≠ implementação (3-col vs 2-col) | system.md vs App.tsx | Documentação |

### Pontos fortes a preservar
- ✅ Sistema de tokens em index.css (cores, shadows, fonts)
- ✅ Glassmorphism nos cards externos
- ✅ Gauge SVG 270° (visualmente forte)
- ✅ BidirectionalSlider ring+dot+glow
- ✅ Hierarquia tipográfica Inter + JetBrains Mono
- ✅ Shadow/glow definitions bem documentados

---

## Sessão 3 de 3 — Protótipo HTML Auto-Contido

**Foco:** Criar arquivo HTML estático demonstrando o dashboard com TODAS as correções aplicadas. Tailwind CDN, zero JavaScript, dados CNC realistas.
**Peso estimado:** ~23 pontos | 8 ações

### Ações

| # | Ação | Peso | Descrição |
|---|------|------|-----------|
| 1 | Re-ler DASHBOARD.md (template estrutural) | 1 | Base para estrutura HTML |
| 2 | Re-ler system.md (tokens para Tailwind config) | 1 | Configuração CDN |
| 3 | Criar HTML: `<head>` + tema Tailwind + CSS custom | 6 | CDN, Google Fonts, keyframes, scrollbar, CSS vars |
| 4 | Criar HTML: Header + Layout 2-col + ConfigPanel | 6 | Grid 3+9, dropdowns, radios, botão Simular, fine-tune sliders |
| 5 | Criar HTML: ResultsPanel completo com dados | 6 | 5 zonas: Safety→BigNumbers→Metrics→Gauges→Formulas |
| 6 | Validar contra 10 regras do system.md | 1 | Checklist rule-by-rule |
| 7 | Adicionar comentários `<!-- MELHORIA: -->` | 1 | Categorias: SPACING, TYPOGRAPHY, DEPTH, COLOR, COMPOSITION, CRAFT, CONSISTENCY |
| 8 | Review final do HTML | 1 | Abrir no browser, verificar renderização |

### Arquivo de saída
`docs/design/DASHBOARD_V2_PROPOSAL.html`

### Dados fictícios (valores realistas)

| Campo | Valor | Contexto |
|-------|-------|----------|
| Material | Aço AISI 1045 | Aço carbono comum |
| Operação | Fresamento - Desbaste | Tipo principal |
| Ferramenta | Fresa Topo Ø12mm, 4Z | Parâmetro real |
| RPM | 4.775 | Vc=180 m/min, D=12mm |
| Avanço (F) | 1.910 mm/min | fz=0.10 × 4 × 4775 |
| Potência | 3.2 kW | Kienzle estimado |
| Vc Real | 150 m/min | Calculado |
| Torque | 6.4 Nm | Calculado |
| MRR | 19.1 cm³/min | ae×ap×F |
| Safety | Verde (78%) | Dentro dos limites |
| L/D Ratio | 2.5 (Verde) | ≤3, seguro |

### Restrições absolutas
1. **ZERO alterações em `src/`** — isto é proposta visual
2. **ZERO JavaScript** — HTML + CSS estático apenas
3. **ZERO valores fora do system.md** — tokens exclusivamente
4. **ZERO funcionalidades novas** — redesign visual apenas
5. **ZERO remoção de elementos** — melhorar, não subtrair

---

## Commit (após Sessão 3)

```bash
git add docs/plans/VISUAL-AUDIT-REPORT.md docs/design/DASHBOARD_V2_PROPOSAL.html
git commit -m "docs: visual audit report + HTML prototype for dashboard redesign proposal"
```

---

## Resumo

| Sessão | Foco | Peso | Entregável |
|--------|------|------|------------|
| 1 | Análise + Audit + Critique | 20 pts | Catálogo de violações (mental) |
| 2 | Relatório + Propostas | 22 pts | `docs/plans/VISUAL-AUDIT-REPORT.md` |
| 3 | Protótipo HTML | 23 pts | `docs/design/DASHBOARD_V2_PROPOSAL.html` |
| **Total** | | **65 pts** | **2 arquivos** |

### Arquivos críticos referenciados

| Arquivo | Papel |
|---------|-------|
| `.interface-design/system.md` | Fonte de verdade — tokens e 10 regras |
| `src/components/shared-result-parts.tsx` | Mais violações (classes dinâmicas, blur/padding misto) |
| `src/components/fine-tune-panel.tsx` | Spacing non-4px + classes dinâmicas |
| `src/components/results-panel.tsx` | Layout principal, 5 zonas, profundidade excessiva |
| `src/components/bidirectional-slider.tsx` | 26 rgba hardcoded |
| `src/components/config-panel.tsx` | Magic numbers, inline styles |
| `src/App.tsx` | Grid layout (3+9 atual) |
| `src/index.css` | Tokens CSS, animações, scrollbar |
| `docs/design/DASHBOARD.md` | Template HTML existente |

---

## Prompts de Execução (copiar e colar para iniciar cada sessão)

### Sessão 1

```
# Sessão 1/3 — Redesign Visual Dashboard: Análise + Audit + Critique

## Contexto
Plano aprovado: `docs/plans/PLAN_Redesign_Visual_Dashboard.md`
Design system: `.interface-design/system.md` (Direction: Boldness & Clarity, 10 regras)
Versão atual: v0.9.4 | Layout: 2-col (3+9) | 6 componentes principais

## Violações já mapeadas (exploração prévia)
- 26+ rgba hardcoded inline (bidirectional-slider, styled-slider, fine-tune-panel)
- 10 classes Tailwind dinâmicas `text-${color}` (shared-result-parts, fine-tune-panel)
- 18 valores non-4px spacing (gap-1.5, p-5, mx-[18px], w-[100px])
- backdrop-blur misto (xl vs md entre ProgressCard e BigNumber)
- Padding misto (p-4/p-5/p-6 em cards)
- 5 níveis de nesting em results-panel (max=2 per system.md)
- Animation timings espalhados (0.9s, 0.45s, 0.25s, 0.4s)

## Sua missão nesta sessão
1. Ler `.interface-design/system.md` (tokens + 10 regras)
2. Ler `docs/design/UI_DESIGN_SPEC_FINAL.md` + `docs/design/UI_BRANDING.md`
3. Ler `docs/design/DASHBOARD.md` (protótipo HTML existente)
4. Auditar CADA componente linha a linha contra system.md:
   - `src/App.tsx` (layout grid)
   - `src/components/results-panel.tsx` (269 linhas)
   - `src/components/config-panel.tsx` (374 linhas)
   - `src/components/shared-result-parts.tsx` (142 linhas)
   - `src/components/fine-tune-panel.tsx` (174 linhas)
   - `src/components/bidirectional-slider.tsx` (224 linhas)
   - `src/components/gauge.tsx` (172 linhas)
   - `src/index.css` (tokens, animações)
5. Executar Critique Estruturado nos 4 eixos:
   - Composição: ritmo visual, ponto focal, proporções
   - Craft: grid 4px, tipografia, superfícies
   - Coerência: consistência entre painéis, cores, tokens
   - Código: hacks CSS, valores mágicos, classes dinâmicas
6. Classificar cada achado: ✅ Manter | ⚠️ Melhorar | ❌ Corrigir

## Output esperado
Catálogo completo de violações com [arquivo:linha] → regra system.md violada.
NÃO criar arquivos nesta sessão — apenas análise.

## Regras
- READ-ONLY: não alterar nenhum arquivo em src/
- Usar EXCLUSIVAMENTE tokens do system.md como referência
- Ao final, confirmar que todos os 8 arquivos foram auditados
- Preparar contexto compacto para Sessão 2
```

### Sessão 2

```
# Sessão 2/3 — Redesign Visual Dashboard: Relatório + Propostas

## Contexto
Plano: `docs/plans/PLAN_Redesign_Visual_Dashboard.md`
Sessão 1 completou audit completo dos 8 componentes.

## Sua missão nesta sessão
1. Re-ler `.interface-design/system.md` para referência de tokens
2. Criar `docs/plans/VISUAL-AUDIT-REPORT.md` com 6 seções:
   - Seção 1: Composição (layout, hierarquia, ritmo)
   - Seção 2: Craft (spacing, blur, animation timings)
   - Seção 3: Coerência (classes dinâmicas, rgba, padding, safety colors)
   - Seção 4: Código (magic numbers, inline styles, profundidade)
   - Seção 5: Propostas por componente (formato: Estado → Problemas → Mudanças → Token → Impacto)
   - Seção 6: Matriz de prioridade (Crítico / Importante / Nice-to-have)

## Formato obrigatório por componente
### [NomeDoComponente]
**Estado atual:** [1 linha]
**Problemas:** [lista com arquivo:linha → regra violada]
**Mudanças propostas:**
  1. [mudança] → [token system.md que justifica]
**Impacto visual:** Alto | Médio | Baixo

## Regras
- Toda violação com arquivo:linha exato
- Toda proposta com token do system.md como justificativa
- Ordenar componentes por impacto (painel central primeiro)
- Commit ao final: `docs: visual audit report for dashboard redesign`
```

### Sessão 3

```
# Sessão 3/3 — Redesign Visual Dashboard: Protótipo HTML

## Contexto
Plano: `docs/plans/PLAN_Redesign_Visual_Dashboard.md`
Relatório: `docs/plans/VISUAL-AUDIT-REPORT.md` (criado na Sessão 2)

## Sua missão nesta sessão
1. Re-ler `docs/design/DASHBOARD.md` (template estrutural)
2. Re-ler `.interface-design/system.md` (tokens para config Tailwind)
3. Criar `docs/design/DASHBOARD_V2_PROPOSAL.html` — arquivo auto-contido:
   - Tailwind CSS via CDN com tema customizado (cores, shadows, fonts do system.md)
   - Google Fonts: Inter + JetBrains Mono + Material Symbols
   - CSS custom: scrollbar, keyframes, CSS vars para sliders
   - Layout: grid-cols-12, col-span-3 (config+fine-tune) + col-span-9 (results)
   - Header + ConfigPanel + FineTunePanel + ResultsPanel (5 zonas) + Footer

## Dados CNC realistas (usar exatamente)
| RPM: 4.775 | Feed: 1.910 mm/min | Power: 3.2 kW | Torque: 6.4 Nm |
| MRR: 19.1 cm³/min | Safety: Verde 78% | L/D: 2.5 Verde |
| Material: Aço AISI 1045 | Fresa Topo Ø12mm 4Z | Desbaste |

## Marcação obrigatória
Cada correção com: <!-- MELHORIA: [CATEGORIA] — [descrição] -->
Categorias: SPACING | TYPOGRAPHY | DEPTH | COLOR | COMPOSITION | CRAFT | CONSISTENCY

## Restrições absolutas
- ZERO alterações em src/
- ZERO JavaScript
- ZERO valores fora do system.md
- ZERO funcionalidades novas
- ZERO remoção de elementos existentes

## Verificação final
- [ ] Abre no browser sem servidor
- [ ] 10 regras system.md respeitadas
- [ ] Dados CNC realistas
- [ ] Comentários <!-- MELHORIA --> em cada correção
- Commit: `docs: HTML prototype for dashboard redesign v2 proposal`
```
