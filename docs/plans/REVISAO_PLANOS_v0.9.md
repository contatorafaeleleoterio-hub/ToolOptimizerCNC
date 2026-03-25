# Revisao de Planos — Implementacoes Dashboard v0.9

> **Data:** 25/03/2026
> **Protocolo:** `docs/ai/protocols/REVIEW_PROTOCOL.md`
> **Fonte:** `docs/plans/IMPLEMENTACOES_DASHBOARD_v0.9.md`
> **Objetivo:** Validar 7 planos antes da implementacao

---

## Resumo Consolidado

| # | Plano | Fase | Status | Risco Principal |
|---|-------|------|--------|-----------------|
| 01 | Input Livre (D, R, H) | A | Aprovado com ressalvas | Falta validacao de ranges (D=0 causa Infinity) |
| 02 | Arestas Z -> 4 Botoes | A | Aprovado | Nenhum |
| 03 | Favoritar Simulacao | B | Aprovado com ressalvas | Semantica confusa (validatedSimulations vs isFavorited) |
| 04 | Slider Safety Factor | B | Aprovado | Menor: duplicacao com slider do settings |
| 05 | Redesign Visor HMI | C | Requer correcoes | BidirectionalSliders omitidos; duplicacao MRR |
| 07 | Rodape Coluna Esquerda | C | Aprovado com ressalvas | Navegacao sem React Router confirmado |
| 09 | Config Remover Kc | D | Aprovado com ressalvas | Breaking change: toolCorrectionFactors no calcular() |

**Itens [INCERTO] total:** 1 (navegacao no Plano #06)
**Itens [NAO VERIFICADO] total:** 0

---

## Top 3 Riscos Entre Todos os Planos

1. **Plano #09**: Remover `toolCorrectionFactors` do `calcular()` (`machining-store.ts:366-372`) muda resultados para quem customizou fatores — breaking change silenciosa
2. **Plano #05**: Redesign complexo sem definir destino dos BidirectionalSliders (feature critica de ajuste RPM/Avanco)
3. **Plano #01**: Input livre sem ranges permite D=0 causando RPM = Infinity

---

## Decisoes Pendentes (Requer Input do Rafael)

| # | Decisao | Opcoes |
|---|---------|--------|
| D1 | Plano #01: Ranges de validacao para inputs livres | Sugestao: D 0.1-200mm, R 0.05-50mm, H 5-300mm |
| D2 | Plano #01: Destino dos arrays `DIAMETROS_COMPLETOS`, `ALTURAS_FIXACAO` | (a) Deletar, (b) Manter como datalist/autocomplete |
| D3 | Plano #03: Semantica de favoritar no dashboard | (a) Usar `addValidatedSimulation()` existente, (b) Criar mecanismo proprio |
| D4 | Plano #05: BidirectionalSliders nos BigNumbers | (a) Manter, (b) Substituir por barras estaticas |
| D5 | Plano #05: Destino do ToolSummaryViewer | (a) Header acima Zona 1, (b) Remover, (c) Integrar na Zona 1 |
| D6 | Plano #06: Mecanismo de navegacao | Verificar como /history e /settings sao acessados atualmente |
| D7 | Plano #06: Favoritos no rodape | (a) Modal overlay, (b) Painel lateral |
| D8 | Plano #09: Remover toolCorrectionFactors | (a) So da UI, (b) UI + calcular(), (c) UI + calcular() com migracao |

---

## Revisoes Detalhadas

### #01 — Input Livre (D, R, H)

**Status:** Aprovado com ressalvas

**Verificacoes feitas:**
- `config-panel.tsx`: Diametro/Raio/Altura usam `DropdownRow` (componente inline) com arrays de `src/data/tools.ts`
- `setFerramenta()` em `machining-store.ts:167-181` aceita qualquer number — compativel
- `autoPopulateParams()` dispara quando diametro muda — funciona com valores livres

**Correcoes necessarias:**
1. Adicionar ranges de validacao: D 0.1-200mm, R 0.05-50mm, H 5-300mm
2. Definir comportamento de `autoPopulateParams` para diametros fora do range pre-definido
3. Manter condicionalidade do Raio da Ponta (so visivel para toroidal)
4. Especificar testes: campo vazio, D=0, D negativo, D=999, load de savedTool preenche campos
5. Decidir destino de `DIAMETROS_COMPLETOS` e `ALTURAS_FIXACAO`

---

### #02 — Arestas Z -> 4 Botoes

**Status:** Aprovado

**Verificacoes feitas:**
- Arestas usa `DropdownRow` em `config-panel.tsx:253-259` com `ARESTAS_OPTIONS = [2, 3, 4, 6]`
- Tipo de Ferramenta ja usa botoes toggle — padrao visual existe
- Store default `numeroArestas: 4` — alinhado

**Sugestao menor:** Extrair toggle button group como componente reutilizavel.

---

### #03 — Favoritar Simulacao

**Status:** Aprovado com ressalvas

**Verificacoes feitas:**
- `validatedSimulations` existe no store com add/remove/load (machining-store.ts:513-542)
- `HistoricoCalculo` NAO tem campo `isFavorited`
- Worktree `amazing-lichterman` tem implementacao parcial com `isFavorited` + `toggleFavorite()`
- `results-panel.tsx` NAO tem botao de favoritar
- `history-page.tsx` tem filters (material, operacao, feedback) mas NAO favoritos

**Correcoes necessarias:**
1. Clarificar semantica: Dashboard = `addValidatedSimulation()` (snapshot). Historico = `toggleFavorite()` (flag na entry)
2. Adicionar migracao Zustand para `isFavorited: false` em entries existentes
3. Especificar testes: toggle, filtro "Apenas Favoritos", persistencia, limite
4. Investigar worktree `amazing-lichterman` para reutilizar codigo

---

### #04 — Slider Safety Factor

**Status:** Aprovado

**Verificacoes feitas:**
- `setSafetyFactor()` existe em `machining-store.ts:206-209` — zera resultado, nao chama calcular()
- Settings ja tem slider (settings-page.tsx:131-157) com range 0.5-1.0
- `CollapsibleSection` existe e funciona

**Sugestao menor:** Clarificar relacao com slider do settings (manter ambos ou unificar apos Plano #09).

---

### #05 — Redesign Visor HMI

**Status:** Requer correcoes

**Verificacoes feitas:**
- Layout atual do results-panel.tsx: ToolSummary -> Gauges -> Reset Warning -> SafetyBadge -> BigNumbers(RPM/Avanco com BidirectionalSliders) -> ProgressBars -> FormulaCards -> Warnings
- Componentes reutilizaveis em shared-result-parts.tsx: SafetyBadge, BigNumber, MetricCell, ProgressCard, WarningsSection
- BidirectionalSliders integrados nos BigNumbers via `manualOverrides`

**Correcoes necessarias:**
1. Definir destino dos BidirectionalSliders na Zona 1 (manter recomendado)
2. Resolver duplicacao MRR (Zona 2 metrica vs Zona 3 gauge)
3. Definir destino do ToolSummaryViewer (header acima Zona 1 recomendado)
4. Definir formato Zona 2: MetricCell existente ou componente compacto novo
5. Incluir posicionamento do botao Favoritar (Plano #03) no novo layout
6. Adicionar testes de render para cada zona

---

### #06 — Rodape Coluna Esquerda

**Status:** Aprovado com ressalvas

**Verificacoes feitas:**
- App.tsx: single-page sem React Router, grid col-span-3 + col-span-9
- config-panel.tsx: sem footer, mas viavel com flex + mt-auto
- `validatedSimulations` e `loadValidatedSimulation()` existem no store

**Correcoes necessarias:**
1. Verificar e documentar mecanismo de navegacao antes de implementar
2. Definir: modal ou painel lateral para lista de Favoritos
3. Remover "Operador (provisorio)" — placeholder sem funcao
4. Especificar layout CSS: flex flex-col h-full + mt-auto
5. Confirmar App.tsx como arquivo afetado (nao "possivelmente")

**[INCERTO]:** Mecanismo de navegacao entre paginas

---

### #07 — Config: Remover Kc + Gestao Ferramentas

**Status:** Aprovado com ressalvas

**Verificacoes feitas:**
- toolCorrectionFactors: tipo em types/index.ts:181-190, store em machining-store.ts:297-315, **aplicado no calcular() em machining-store.ts:366-372** (multiplica Vc e fz)
- Diametros Padrao: settings-page.tsx:641-673 com custom additions
- Raios de Ponta: settings-page.tsx:676-709 com custom additions
- savedTools: existe no store, config-panel tem dropdown + save button
- customToolConfig: existe no store (diametros e raios customizados) — NAO mencionado no plano

**Correcoes necessarias:**
1. Decidir: remover toolCorrectionFactors apenas da UI ou tambem do calcular()
2. Se remover do calcular: migracao que avisa/reseta fatores + atualizar testes
3. Incluir `customToolConfig` na lista de remocao
4. Incluir `types/index.ts` nos arquivos afetados (remover tipo ToolCorrectionFactor)
5. Adicionar testes: calculo sem fatores produz resultados corretos
6. Definir ordem: UI primeiro, calcular depois

---

*Documento gerado pelo Protocolo de Revisao — FENIX AI System | 25/03/2026*
