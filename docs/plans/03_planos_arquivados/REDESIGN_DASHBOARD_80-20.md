# Redesign Dashboard — Calculadora 80/20 (v3 consolidado — pronto para execução)

> **Versão:** v3 (18/07/2026) — consolida o plano original (12/07) + "Revisão UX — Refinamentos v2" em uma versão única executável.
> Versões anteriores preservadas no git (commit `0fca280`).
> **Status:** executado e absorvido pelo plano `PLAN_IMPLEMENTACAO_DS_80-20_MOBILE.md` (release local v0.12.0 em 07/08/2026).

## Índice de etapas
1. S0 — Preparação — restaurar design system na main + registrar plano no backlog/roadmap — **Modelo pequeno**
2. S1 — Config Panel enxuto — 5 inputs essenciais + toggle "Ajuste avançado" + Simular no rodapé — **Modelo intermediário**
3. S2 — Results Panel 4 zonas — herói de verdade, estado vazio honesto, remover torque, "Detalhes e fórmulas ▾" — **Modelo avançado**
4. S3 — Navegação + polish — nav no header com contadores, acessibilidade, ajuste de testes, bump MINOR — **Modelo intermediário**

## Contexto

Revisão feita contra o código atual (commit `0fca280`). O dashboard principal tem ~45-50 elementos visuais simultâneos. Objetivo: calculadora enxuta 80/20 — fluxo Material → Ferramenta → Simular em < 10s, mantendo os diferenciais para operadores inexperientes.

**Problemas confirmados no código:**
- 4 seções de config (com 4 sliders de Ajuste Fino abertos por default), 8 zonas no results, 5 FormulaCards, lista de ferramentas expandida.
- O "herói" (RPM/Avanço) usa `fontSize: 2rem` (`results-panel.tsx` Zona 4) — não domina a tela; é mais um card entre iguais. Design system exige Big Numbers `text-6xl/7xl font-mono` com glow.
- Estado vazio mente: `EMPTY_RESULTADO` renderiza **0 RPM / 0 mm/min** como se fosse resultado real, e mostra timestamp `Date.now()` sem simulação (`results-panel.tsx:151`).
- **Torque aparece em 2 lugares (Data Row + FormulaCard) mas não é validado em nenhum cálculo** — só escala visual. Ruído puro.
- Vc/fz/ae/ap **já são 100% automáticos** via `recommendations.ts` — o problema é a UI expor tudo de uma vez, não falta de automação.
- Nenhum limite de máquina altera parâmetros de corte (só avisos/escalas); `safetyFactor` é o único input que muda outputs (potência).
- Ações de ferramentas salvas dependem de hover (`config-panel.tsx:162`); botões Z e ± com ~28px (abaixo de 40px para luvas); navegação Favoritos/Histórico escondida no SidebarFooter.
- Benchmark (FSWizard/HSMAdvisor): padrão da indústria é 3 passos — Material → Ferramenta → Resultado — com o resto em "advanced".

**Resultado esperado:** de ~45-50 para ~15-18 elementos visíveis (-65%), mantendo LCD "AÇÃO:", gauges, sliders de override e fórmulas educacionais (colapsadas).

## Etapas

### S0 — Preparação (pré-requisito)
- Copiar `.claude/worktrees/quirky-goldberg/.interface-design/system.md` → `.interface-design/system.md` na raiz (arquivo não existe na main; é a referência de tokens do redesign).
- Registrar o plano em `docs/plans/BACKLOG_IMPLEMENTACAO.md` + tabela PRIORIDADE 1 de `docs/ROADMAP_SESSAO_ATUAL.md` (regra crítica 9).

### S1 — Config Panel enxuto (`src/components/config-panel.tsx`)
Visível (5 inputs): Material (select) · Operação (3 botões) · Tipo de fresa (3 botões) · Diâmetro + Z (linha única) · Balanço. Tudo pré-preenchido com defaults.
- **Toggle "⚙ Ajuste avançado"** (fechado por default, estado persistido em localStorage): 4 sliders do Ajuste Fino (`fine-tune-panel.tsx`), Raio da ponta (só toroidal, default 1.0), slider de Segurança/safetyFactor (default 0.80).
- **Ferramentas salvas** viram dropdown compacto "Usar ferramenta salva ▾" — ações editar/remover **sempre visíveis** (sem hover-only; hover não existe em touch e falha com luvas).
- **Botão Simular sticky no rodapé** do painel (fluxo top-down termina na ação), não mais no topo.
- Alvos ≥ 40px: botões Z, botões ± do safety; ícones de ação ≥ 24px com padding.
- Seções default: Configuração Base e Ferramenta abertas; Ajuste avançado e Segurança fechadas.

### S2 — Results Panel 8→4 zonas (`src/components/results-panel.tsx`)

| Zona | Conteúdo |
|------|----------|
| 1. Herói | RPM + Avanço em **text-6xl mínimo** font-mono com glow (≥40% da altura visível) + semáforo integrado + BidirectionalSliders mantidos com visual mais leve |
| 2. Ação | LCD 1-2 linhas: alerta + "AÇÃO:" (diferencial — fica) |
| 3. Indicadores | 3 HalfMoonGauges (Avanço, MRR, Saúde) + L/D e CTF como chips `text-sm font-mono` + ícone (segurança legível à distância) |
| 4. "Detalhes e fórmulas ▾" | Colapsado por default: Vc/fz/ap/ae, Potência, Vc Real, MRR + 4 FormulaCards (RPM, Avanço, MRR, Potência) |

- **Estado vazio honesto:** sem resultado (ou `resultado=null` após mudança de parâmetro) → herói mostra `—` + CTA "Configure e clique em Simular"; nunca zeros; ocultar timestamp.
- **Remover torque:** FormulaCard Torque, célula Torque da Data Row, e atualizar copy do safety para "Aplicado à Potência estimada" (`config-panel.tsx:494`). `maxTorque` fica no engine como constante.
- Chip discreto "SF 70%" no Console Header quando safetyFactor ≠ 0.80 (visibilidade de estado escondido no avançado).
- Badge âmbar "manual" nos valores de Detalhes quando Vc/fz/ae/ap foram alterados no avançado (prevenção de erro).
- Preservar `data-testid="tool-summary"` e demais testids/labels/aria existentes; listar arquivos de teste afetados antes de editar.

### S3 — Navegação + polish
- Nav no header (`src/App.tsx` + `sidebar-footer.tsx`): **Calcular · Favoritos · Histórico · Config**, migrando os badges de contagem junto (link vazio sem badge parece feature morta).
- Numeração sutil do fluxo no config ("1 Material → 2 Ferramenta → Simular") com ✓ de completude quando o valor difere do default.
- Contraste: texto informativo mínimo `white/60` sobre `#0F1419` (WCAG AA); `white/30` só em decorativo.
- Teclado nos sliders: `BidirectionalSlider`/`StyledSlider` com setas + `aria-valuenow/min/max` + focus ring visível.
- Ajustar testes quebrados, bump MINOR no `package.json`, commit.

## O que NÃO muda (decidido na revisão UX)
- LCD com linha "AÇÃO:" — único elemento que diz *o que fazer*, não só *o que está errado*.
- Semáforo com ícone + texto + cor (redundante à cor, atende daltônicos).
- BidirectionalSlider de override no herói — máquina real difere do cálculo; valioso no chão de fábrica.
- Automação via `recommendations.ts` e `calcularSliderBounds()` — redesign é só de exposição, zero engine novo.
- Regra "store não auto-recalcula" — clicar Simular é o momento de comprometimento consciente do operador.
- Disclaimer "o sistema recomenda, o operador decide" (regra crítica 6).

## Arquivos críticos
- `src/components/config-panel.tsx` (502 linhas) — S1
- `src/components/fine-tune-panel.tsx` — S1 (move para dentro do toggle)
- `src/components/results-panel.tsx` (541 linhas) — S2
- `src/App.tsx` + `src/components/sidebar-footer.tsx` — S3
- Reusar (zero engine novo): `recommendations.ts`, `slider-bounds.ts`, `HalfMoonGauge`, `BidirectionalSlider`, `CollapsibleSection`, `SEG_*` de `shared-result-parts`
- Testes: suite atual 1052 testes / 62 arquivos

## Verificação
- Quality gates por sessão: `npx vitest run tests/` (**não** `npm test` — roda .aiox-core/) + `npx tsc --noEmit` + `npx vite build`
- `npm run dev`: fluxo material→simular < 10s; toggle avançado abre/fecha e persiste; estado vazio mostra `—`; torque ausente; mobile intacto (redesign desktop-only nesta fase)
- Fim de cada sessão: reportar e aguardar "pode seguir" (regra global)
