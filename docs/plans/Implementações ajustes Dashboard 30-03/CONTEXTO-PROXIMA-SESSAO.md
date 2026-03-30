# Contexto — Próxima Sessão

**Última atualização:** 30/03/2026 — Adicionado item 5.1 (Simulação Estilo Cassino)
**Próxima sessão:** Implementação dos itens aprovados

---

## ⚠️ IMPLEMENTAÇÕES VALIDADAS E ATUALIZADAS

As decisões abaixo são as **únicas válidas para implementação**. Substituem qualquer versão anterior no `PLANO-COMPLETO.md`.

---

## Tabela Geral — Status Final

| # | Atualização | Status | Documento |
|---|-------------|--------|-----------|
| 1 | 1.1 — Layout Base Visor (Grid) | ✅ APROVADO | `SPEC-VISOR-RESULTS-PANEL-v1.md` |
| 2 | 1.2 — Botão Editar Ferramenta + Modal | ✅ APROVADO | `ITEM-2-BOTAO-EDITAR-FERRAMENTA.md` |
| 3 | 1.3 — BigNumber Sliders RPM/Avanço | ❌ REPROVADO | `ITEM-3-BIGNUMBER-SLIDERS.md` |
| 4 | 1.4 — Safety Badges + Favoritar | ❌ REPROVADO | `ITEM-4-REPROVADOS-1.4-1.5-1.6.md` |
| 5 | 1.5 — 3 Gauges (Feed/MRR/Tool) | ❌ REPROVADO | `ITEM-4-REPROVADOS-1.4-1.5-1.6.md` |
| 6 | 1.6 — Warnings Section | ❌ REPROVADO | `ITEM-4-REPROVADOS-1.4-1.5-1.6.md` |
| 7 | 2.1 — Fator de Correção Slider | ✅ APROVADO | `ITEM-5-FATOR-CORRECAO-SLIDER.md` |
| 8 | 2.2 — Botão "Salvar Como Padrão" | ❌ REPROVADO | — |
| 9 | 3.1 — SGB Acima do Slider | ✅ APROVADO | `ITEM-6-SGB-ACIMA-SLIDER.md` |
| 10 | 3.2 — Botão Explicação (Popover) | ✅ APROVADO | `ITEM-7-BOTAO-EXPLICACAO-POPOVER.md` |
| 11 | 4.1 — Visor Mobile (réplica desktop) | ✅ APROVADO | `ITEM-8-VISOR-MOBILE-REPLICA.md` |
| 12 | 5.1 — Explicações Educacionais | ❌ REPROVADO | — |
| 13 | 5.2 — Simulação Estilo Cassino | ✅ APROVADO | `ITEM-9-SIMULACAO-ESTILO-CASSINO.md` |

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
├── ITEM-9-SIMULACAO-ESTILO-CASSINO.md ...... Item #13 (5.2) ✅ APROVADO ← NOVO
└── CONTEXTO-PROXIMA-SESSAO.md .............. Este arquivo
```
