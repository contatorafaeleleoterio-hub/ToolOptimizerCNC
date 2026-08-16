# Handoff — ToolOptimizerCNC — 2026-08-16
Status: item 19 **concluído (A–E)**. E2 do item 17 desbloqueado, **não iniciado**. Sessão de Orquestrador, zero `src/**`.

Feito nesta sessão (**etapa E — goldens e integridade**):
- **Decisão do Mestre que redefiniu a etapa:** o mockup é o **documento canônico da tela**; o motor de cálculo definitivo vem depois (item 18). O valor mostrado hoje é provisório, então os goldens **deixaram de comparar dígito** — `mascararNumeros` troca cada número por `#` em `combinacoes.mjs`, e captura e verificação usam a mesma função (`lerSaidasEstruturais`).
- **O que os 99 goldens travam agora:** a saída existir, com rótulo, unidade, traço de "não se aplica", texto de alerta e formato de cada linha de fórmula, nas 33 entradas × 3 contextos. **A zona de entrada ficou de fora de propósito:** o contrato §10 manda tirar 6 campos e §3 converter seletor de opção única em texto fixo — travar campo visível reprovaria o Construtor por cumprir o que foi pedido.
- **Conferência da migração do catálogo (etapa B):** 26 pares equivalentes entre os 54 goldens velhos e os 99 novos, **0 divergência estrutural** e **23 idênticos dígito a dígito**. Os 3 restantes são a broca helicoidal e diferem só no `Lp`: `broca_hss` (118°) e `broca_md` (140°) viraram uma geometria com o ângulo seguindo o substrato (SPEC §4.2) — cada um tem par idêntico na outra combinação. **Nenhum número mudou na migração.**
- **O fator 1,25 previsto na etapa D não aparece em golden nenhum:** as 5 entradas só-MD_revestido só têm par no contexto que já era MD revestido.
- Documentos normativos alinhados: `BUILD_CONTRACT_REFACTOR.md` (cabeçalho, §4, §5.0, §10, §11, §12), `JUDGE_CRITERIA_REFACTOR.md` (categoria 1 e gate 11 — **12 pontos mantidos**, medindo integridade + cobertura da zona de resultado), `PLAN_GAUNTLET_V2_REFACTOR.md` (§blindagem e método de prova), `freeze.mjs`, `check-suites.mjs`.
- `FREEZE.json` regravado (21 arquivos + região `DADOS`); `node scripts/freeze.mjs` responde **Integridade OK**.

Placar medido: **regressão 23/23 · invariantes 3/3 · golden 1/1 · alvos 2/21** (R11 e R14). Relatório regravado às 03:15 — a suíte foi rodada com `PLAYWRIGHT_JSON_OUTPUT_NAME=reports/test-results.json`, senão o RTK anula o reporter e o `check-suites.mjs` confere arquivo velho.

Onde parou: fim da etapa E, **aguardando "pode seguir"**. O ciclo 1 do E2 não foi rodado.

Próximo passo: **E2 — ciclo 1 do loop Construtor/Juiz** (`docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md`).

Blockers: nenhum. **Atenção ao critério de pronto do prompt da E:** ele previa `validate-cycle-refactor.ps1` em exit 0 ou 2, mas o script trata paleta reprovada como falha dura — com os 33 hex da FlowNC ainda no mockup (que são o alvo do refactor) o exit é **1**, com "Paleta reprovada" como única falha. As outras 5 etapas passam: integridade OK, suíte 48, contagem exata, fronteira limpa. Zerar a paleta é trabalho do Construtor no ciclo 1.

Fora de escopo, registrado e não tocado: `research/BUILD_CONTRACT.md` ainda cita `broca_hss`/`broca_md` (registro histórico do loop de construção); `#00D9FF` segue em `PERMITIDOS` do `check-tokens.mjs`; **a reorganização de `docs/plans/` em `02_planos_executados/` e `03_planos_arquivados/` segue sem commit — os 3 protótipos `.html` foram apagados e não estão nos diretórios novos**, então commitar isso gravaria a perda sem decisão do Mestre. Novo: rodar o validador gravou `state/snapshots/index-refactor-ciclo-1.html` (baseline do mockup antes do refactor) — o ciclo 1 vai sobrescrever.

Arquivos tocados: `gauntlet-calculadora-cnc-v2/{tests/combinacoes.mjs, tests/goldens.spec.ts, tests/GOLDEN_VALUES.json, scripts/capture-goldens.mjs, scripts/check-suites.mjs, scripts/freeze.mjs, criteria/JUDGE_CRITERIA_REFACTOR.md, research/BUILD_CONTRACT_REFACTOR.md, state/FREEZE.json}`, `docs/plans/{PLAN_GAUNTLET_V2_REFACTOR.md, BACKLOG_IMPLEMENTACAO.md}`, `docs/ROADMAP_SESSAO_ATUAL.md`.

Retomar com: "continuar"
