# Contexto — Próxima Sessão

**Última atualização:** 11/04/2026 — ITEM-12 implementado (`46a6f22`)
**Implementados:** ~~1.1~~ ~~1.2~~ ~~2.1~~ ~~3.1~~ ~~3.2~~ ~~4.1~~ ~~10~~ ~~11~~ ~~12~~ → **ITEM-5.2 é o próximo (último)**
**Próxima sessão:** Implementar ITEM-5.2 — Simulação Estilo Cassino → `ITEM-9-SIMULACAO-ESTILO-CASSINO.md`

---

## ⚠️ IMPLEMENTAÇÕES VALIDADAS E ATUALIZADAS

As decisões abaixo são as **únicas válidas para implementação**. Substituem qualquer versão anterior no `PLANO-COMPLETO.md`.

---

## Tabela Geral — Status Final

| # | Atualização | Status | Plano Base | Plano Enriquecido | Peso | Documento |
|---|-------------|--------|------------|-------------------|------|-----------|
| 1 | 1.1 — Layout Base Visor (Grid) | ✅ APROVADO | ✅ | ✅ | 16 pts | `SPEC-VISOR-RESULTS-PANEL-v1.md` |
| 2 | 1.2 — Botão Editar Ferramenta + Modal | ✅ APROVADO | ✅ | ✅ | 10 pts | `ITEM-2-BOTAO-EDITAR-FERRAMENTA.md` |
| 3 | 1.3 — BigNumber Sliders RPM/Avanço | ❌ REPROVADO | — | — | — | `ITEM-3-BIGNUMBER-SLIDERS.md` |
| 4 | 1.4 — Safety Badges + Favoritar | ❌ REPROVADO | — | — | — | `ITEM-4-REPROVADOS-1.4-1.5-1.6.md` |
| 5 | 1.5 — 3 Gauges (Feed/MRR/Tool) | ❌ REPROVADO | — | — | — | `ITEM-4-REPROVADOS-1.4-1.5-1.6.md` |
| 6 | 1.6 — Warnings Section | ❌ REPROVADO | — | — | — | `ITEM-4-REPROVADOS-1.4-1.5-1.6.md` |
| 7 | 2.1 — Fator de Correção Slider | ✅ APROVADO | ✅ | ✅ | 8 pts | `ITEM-5-FATOR-CORRECAO-SLIDER.md` |
| 8 | 2.2 — Botão "Salvar Como Padrão" | ❌ REPROVADO | — | — | — | — |
| 9 | 3.1 — SGB Acima do Slider | ✅ APROVADO | ✅ | ✅ | 4 pts | `ITEM-6-SGB-ACIMA-SLIDER.md` |
| 10 | 3.2 — Botão Explicação (Popover) | ✅ APROVADO | ✅ | ✅ | 8 pts | `ITEM-7-BOTAO-EXPLICACAO-POPOVER.md` |
| 11 | 4.1 — Visor Mobile (réplica desktop) | ✅ APROVADO | ✅ | ✅ | 10 pts | `ITEM-8-VISOR-MOBILE-REPLICA.md` |
| 12 | 5.1 — Explicações Educacionais | ❌ REPROVADO | — | — | — | — |
| 13 | 5.2 — Simulação Estilo Cassino | ✅ APROVADO | ✅ | ✅ | 24 pts | `ITEM-9-SIMULACAO-ESTILO-CASSINO.md` |
| 14 | 10 — Sistema de Favoritos (store + botão + edição) | ✅ APROVADO | ✅ | ✅ | 14 pts | `ITEM-10-FAVORITOS-STORE.md` |
| 15 | 11 — Zona Verde Dinâmica no SGB | ✅ CONCLUÍDO (`b369fec`) | ✅ | ✅ | 10 pts | `ITEM-11-ZONA-VERDE-DINAMICA-SGB.md` |
| 16 | 12 — Página de Favoritos | ✅ CONCLUÍDO (`46a6f22`) | ✅ | ✅ | 15 pts | `ITEM-12-PAGINA-FAVORITOS.md` |

> **Total aprovado:** 10 itens = **119 pontos** (~10-12 sessões estimadas)

---

## Itens Aprovados — Para Implementar

### ✅ Grupo A: Visor Desktop
- **1.1** — Layout grid estruturado (`results-panel.tsx`) → `SPEC-VISOR-RESULTS-PANEL-v1.md`
- **1.2** — Botão Editar Ferramenta + `ToolEditModal.tsx` → `ITEM-2-BOTAO-EDITAR-FERRAMENTA.md`

### ✅ Grupo B: Configurações + Ajuste Fino
- **2.1** — Fator de Correção como `BidirectionalSlider`, display percentual → `ITEM-5-FATOR-CORRECAO-SLIDER.md`
- **3.1** — SGB acima do slider (desktop 50 segs / mobile 30 segs) → `ITEM-6-SGB-ACIMA-SLIDER.md`
- **3.2** — Botão `ℹ️ O QUE É [PARAM]?` com popover + `ParamExplanation.tsx` → `ITEM-7-BOTAO-EXPLICACAO-POPOVER.md`

### ✅ Grupo C: Mobile
- **4.1** — Replicar estrutura do visor desktop no mobile → `ITEM-8-VISOR-MOBILE-REPLICA.md`

### ✅ Grupo D: Experiência de Simulação
- **5.2** — Simulação Estilo Cassino (4 fases: Mesa Vazia → Ignição → Cálculo → Jackpot) → `ITEM-9-SIMULACAO-ESTILO-CASSINO.md`
  - ⚠️ Implementar por **último** — depende do visor desktop (1.1) e mobile (4.1) finalizados

### ✅ Grupo E: Sistema de Favoritos
- **10** — `useFavoritesStore` + botão Favoritar + edição inline → `ITEM-10-FAVORITOS-STORE.md`
- **11** — Zona Verde Dinâmica no SGB (`idealRange` prop) → `ITEM-11-ZONA-VERDE-DINAMICA-SGB.md`
  - Depende de: ITEM-10
- **12** — Página de Favoritos (`/favoritos`) → `ITEM-12-PAGINA-FAVORITOS.md`
  - Depende de: ITEM-10

---

---

## Ordem de Implementação (10 itens — sequência recomendada)

| Ordem | Item | Grupo | Depende de |
|-------|------|-------|------------|
| 1 | 1.1 — Layout Base Visor (Grid) | A | — |
| 2 | 1.2 — Botão Editar Ferramenta + Modal | A | — |
| 3 | 2.1 — Fator de Correção Slider | B | — |
| 4 | 3.1 — SGB Acima do Slider | B | — |
| 5 | 3.2 — Botão Explicação (Popover) | B | Após #4 (evitar conflito posição) |
| 6 | 4.1 — Visor Mobile (réplica desktop) | C | #1, #2 |
| 7 | 10 — Sistema de Favoritos (store) | E | — |
| 8 | 11 — Zona Verde Dinâmica SGB | E | #7 |
| 9 | 12 — Página de Favoritos | E | #7 |
| 10 | 5.2 — Simulação Estilo Cassino | D | #1, #6 (último) |

> **Regra:** Itens 3, 4, 5 e 7 são independentes — podem ser paralelizados se houver múltiplos assistentes.
> **Regra:** Item 10 (cassino) é SEMPRE o último — depende de toda a estrutura visual estar estável.

---

## Itens Reprovados — NÃO Implementar

- 1.3 — BigNumber Sliders
- 1.4 — Reposicionar Safety Badges
- 1.5 — 3 Gauges no visor
- 1.6 — Warnings Section
- 2.2 — Botão Salvar Como Padrão
- 5.1 — Explicações Educacionais

---

## Estrutura de Documentos

```
├── SPEC-VISOR-RESULTS-PANEL-v1.md ......... Item #1 (1.1) ✅ APROVADO
├── ITEM-2-BOTAO-EDITAR-FERRAMENTA.md ....... Item #2 (1.2) ✅ APROVADO
├── ITEM-3-BIGNUMBER-SLIDERS.md ............. Item #3 (1.3) ❌ REPROVADO
├── ITEM-4-REPROVADOS-1.4-1.5-1.6.md ....... Items #4,5,6 ❌ REPROVADOS
├── ITEM-5-FATOR-CORRECAO-SLIDER.md ......... Item #7 (2.1) ✅ APROVADO
├── ITEM-6-SGB-ACIMA-SLIDER.md .............. Item #9 (3.1) ✅ APROVADO  ← NOVO
├── ITEM-7-BOTAO-EXPLICACAO-POPOVER.md ...... Item #10 (3.2) ✅ APROVADO ← NOVO
├── ITEM-8-VISOR-MOBILE-REPLICA.md .......... Item #11 (4.1) ✅ APROVADO ← NOVO
├── ITEM-9-SIMULACAO-ESTILO-CASSINO.md ...... Item #13 (5.2) ✅ APROVADO
├── ITEM-10-FAVORITOS-STORE.md .............. Item #14 (10) ⬜ Pendente ← NOVO
├── ITEM-11-ZONA-VERDE-DINAMICA-SGB.md ...... Item #15 (11) ⬜ Pendente ← NOVO
├── ITEM-12-PAGINA-FAVORITOS.md ............. Item #16 (12) ⬜ Pendente ← NOVO
└── CONTEXTO-PROXIMA-SESSAO.md .............. Este arquivo
```

---

## Detalhes Adicionados nos Planos Enriquecidos (30/03/2026)

Cada documento aprovado recebeu 3 novas seções:

### 1. Mapeamento Técnico do Codebase
- Tabela: componente → arquivo → linhas → props/interface
- Snippets do código atual nos pontos de modificação
- Interfaces TypeScript copiadas do codebase (ResultadoUsinagem, Ferramenta, SavedTool, etc.)
- Estado atual do store/actions relevantes

### 2. Plano de Implementação Detalhado
- Linhas exatas afetadas por arquivo
- Sequência com snippets de código (antes → depois)
- **Edge Cases e Riscos** — tabela com riscos identificados + mitigações
- Testes como tabela (nome do teste → descrição)

### 3. Estimativa + Verificação
- Peso por ação (1-6 pontos, escala Session Planner)
- Total de pontos e sessões estimadas
- Checklist: `npm run typecheck` + `npm run test -- --run` + `npm run build`

### Descobertas Técnicas Relevantes
- **Router:** `react-router-dom` com `BrowserRouter` em `main.tsx` — rotas: `/`, `/mobile`, `/history`, `/settings`, `/admin/*`
- **SidebarFooter:** Já tem link "Favoritos" → `/history?filter=favoritos` — migrar para `/favoritos`
- **Favoritos parcial:** `history-store.ts` tem `toggleFavorite(id)` + `isFavorited` — sistema novo é separado
- **BidirectionalSlider:** Range -150% a +150% relativo — NÃO adequado para safety factor (valor absoluto 0.50-1.00)
- **SGB ordem atual:** Slider ANTES do SGB — ITEM-6 inverte para SGB acima
- **Fine-tune drawer:** Textos educacionais em `SLIDER_VISUAL` array — reutilizar no popover (ITEM-7)

---

## INSTRUÇÕES PARA O PRÓXIMO ASSISTENTE

### Contexto
Os 10 documentos de implementação foram **enriquecidos** com mapeamento técnico do codebase (componentes reais, linhas exatas, interfaces TS, store actions, snippets). No entanto, os documentos ainda são **planos de nível intermediário** — precisam de refinamento final antes da implementação.

### O que fazer (por ordem de prioridade)

#### 1. Completar e Refinar Cada Documento
Para cada um dos 10 docs aprovados, verificar e completar:

- **Snippets "antes → depois"**: Os docs têm o código ATUAL mas faltam os snippets do código PROPOSTO. Adicionar trechos concretos de como o JSX/TS ficará APÓS a implementação (não apenas "mover de A para B", mas o código real).
- **Nomes exatos de testes**: Os docs têm tabelas de testes descritivos. Converter para nomes reais de `describe/it` blocos que serão criados (ex: `describe('SegmentedGradientBar')` → `it('renders green zone when idealRange provided')`).
- **Imports necessários**: Listar imports exatos que cada arquivo modificado precisará adicionar.
- **Verificar linhas**: As linhas referenciadas foram capturadas em 30/03/2026. Se houve commits depois, as linhas podem ter mudado. Fazer `grep` rápido para confirmar.

#### 2. Resolver Decisões em Aberto
Estes pontos ficaram marcados como "decidir durante implementação":

| Doc | Decisão pendente |
|-----|-----------------|
| ITEM-2 | Dropdown `<select>` vs lista visual de cards para ferramentas salvas |
| ITEM-5 | Confirmar StyledSlider (opção A) como abordagem final para Fator de Correção |
| ITEM-7 | Popover mostra só `desc` (curto) OU inclui `aumentar/diminuir/equilibrio` (completo)? |
| ITEM-7 | Drawer educacional coexiste com popover OU é substituído? |
| ITEM-10 | Modal de edição de favorito: reutilizar padrão ToolEditModal ou criar novo? |
| ITEM-12 | Confirmar lazy loading com `Suspense` para FavoritesPage |

#### 3. Validar Estimativas
As estimativas de complexidade (119 pts total) foram feitas sem implementar. O próximo assistente deve:
- Validar se os pesos fazem sentido após ler o código real
- Ajustar se necessário
- Propor divisão em sessões concretas (quais itens por sessão)

#### 4. NÃO Começar Implementação
Estes documentos são **planos** — o próximo assistente deve **refinar** os planos, não implementar código. A implementação começa apenas quando Rafael autorizar.

### Ordem de Leitura Recomendada
1. Este arquivo (CONTEXTO-PROXIMA-SESSAO.md) — visão geral
2. SPEC-VISOR-RESULTS-PANEL-v1.md — o maior e mais complexo
3. ITEM-10-FAVORITOS-STORE.md — base do Grupo E
4. ITEM-9-SIMULACAO-ESTILO-CASSINO.md — o mais complexo (24 pts)
5. Restantes em ordem da tabela
