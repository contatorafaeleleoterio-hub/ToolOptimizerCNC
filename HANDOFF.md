# Handoff — ToolOptimizer CNC — 12/08/2026
Status: Plano 17 (Gauntlet — Mockup Experimental da Calculadora) aprovado. Fundação iniciada, 2 de 8 arquivos escritos.

Feito nesta sessão:
- Discovery completo da calculadora: motor (`src/engine/`), store, UI, dados e validações mapeados
- Dois achados de auditoria confirmados em disco: (1) `Ferramenta.tipo` é union de 3 strings e **não entra em nenhum cálculo**; (2) `mc` existe em `Material` mas **nunca é usado** — `kc` é tratado como constante em vez de `kc1.1·hm^(−mc)`. É erro de cálculo real em produção
- Escopo travado pelo Rafael: só fresadora/centro de usinagem (**nada de torneamento**). Eixo novo de primeira classe: **material da ferramenta** (HSS 0,29 · HSS-Co 0,37 · metal duro 1,00 · MD c/ pastilha 1,25)
- Plano escrito em `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC.md`; backlog (item 16) e roadmap (item 17) sincronizados
- Pasta `gauntlet-calculadora-cnc/` criada; `research/DISCOVERY.md` e `research/CALCULATOR_SCOPE.md` escritos (5 famílias, 9 tipos de ferramenta, cada cálculo com entradas/saída/unidade/prioridade)
- `monetizaCNC/ativos/tooloptimizer/01-escopo-calculadora.md` atualizado para **v2** (outro repo, **não commitado lá**): torneamento movido para fora de escopo com o achado de pesquisa preservado, Mandrilamento como família nova, U-drill, macho formador, alargador, cabeçote com κ promovido a prioridade 1, tabela de fatores de Vc e modo de cálculo rápido

Onde parou: fundação do Gauntlet pela metade. O mockup **não existe**, Playwright **não foi instalado**, o loop **não começou**.

Próximo passo: escrever `criteria/JUDGE_CRITERIA.md` (e congelar), `tests/TEST_SCENARIOS.md` (T01-T13), `state/GAUNTLET_STATE.md`, `state/SCORE_HISTORY.md`, `README.md`, `.gitignore`. Depois Playwright isolado, Builder, spec, loop.

Blockers: nenhum.

Arquivos tocados: `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC.md`, `docs/plans/BACKLOG_IMPLEMENTACAO.md`, `docs/ROADMAP_SESSAO_ATUAL.md`, `gauntlet-calculadora-cnc/research/*`, `HANDOFF.md`

Pendência fora deste repo: `monetizaCNC` está com o v2 no working tree, sem commit. Decidir se commita lá.

Retomar com: "continuar"
