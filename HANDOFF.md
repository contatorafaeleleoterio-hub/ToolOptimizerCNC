# Handoff — ToolOptimizerCNC — 2026-08-16
Status: item 19 (diretrizes do painel) — **etapas A, B, C e D fechadas; falta só a E.** Sessão de Orquestrador, zero `src/**`.

Feito nesta sessão (**etapa D — cenários**):
- `tests/combinacoes.mjs` — eixo `ferramenta` fora dos `CONTEXTS` e o passo do material da ferramenta fora de `aplicarCombinacao`. É o que destravou a suíte, vermelha de propósito desde a B.
- **13 cenários de regressão reapontados** para a ferramenta equivalente (`fresa_topo` + MD → `fresa_topo_md`). `MD` era o default do seletor removido, então onde a geometria existe em MD o número é idêntico. Em `fresa_alto_avanco`, `cabecote_faceador`, `u_drill`, `fresa_rosca` e `mandril` só existe MD revestido: o número sobe pelo fator 1,25 — **conferir na E**.
- `R03` reescrito para o **híbrido** (painel vazio + `stale` antes do 1º Calcular; vivo depois, sem clique; botão nunca desabilita). `R06` reescrito para **gaveta inline** (várias abertas, clicar fora não fecha, gatilho fecha só a sua, `Esc` na que tem foco). `R13` com 3 controles e `broca_helicoidal_hss` (é a entrada que mantém 118°/135°; em MD há um ângulo só e vira texto fixo).
- `R11` revalidado contra as 33 entradas: **o máximo real é 6** (fresa toroidal, nenhum campo dispensável). A folga do campo removido era no bloco categórico; o teto conta o geométrico e segue 6.
- **4 cenários novos:** `R18` slider de agressividade · `R19` edição reversa RPM/Avanço com trava no limite · `R20` Modo Rápido com `Z` · `R21` substrato no resumo (exigiu o testid novo `resumo-ferramenta`, declarado no `TESTID_CONTRACT.md`).
- Contagens fechadas em `check-suites.mjs` (21 alvos), `freeze.mjs`, `invariantes.spec.ts` (33), `goldens.spec.ts` (99), `BUILD_CONTRACT_REFACTOR.md` (48 cenários), `JUDGE_CRITERIA_REFACTOR.md` (categoria 1, gates 2 e 11, §9) e `PLAN_GAUNTLET_V2_REFACTOR.md` nos 8 pontos normativos. Os números históricos do ensaio ficaram intactos.
- Decidido junto e declarado: categoria 2 do Juiz dizia "Modo rápido em 3 campos" e contradizia a SPEC §9.3 que o `R20` mede — virou 4 campos com `Z`.

Placar medido ao fim da D: **regressão 23/23 · invariantes 3/3 · goldens vermelho (esperado) · alvos 2/21** (R11 e R14, os mesmos do ensaio).

Onde parou: fim da etapa D, **aguardando "pode seguir" para a E**. Nada da E foi executado.

Próximo passo: **etapa E** — (1) confirmar os 99 goldens, (2) `node scripts/capture-goldens.mjs` e conferir campo a campo, (3) `node scripts/freeze.mjs --write`, (4) validar, (5) fechar item 19 no roadmap e no backlog. Prompt pronto em `docs/plans/PROMPT_SESSAO_GOLDENS_ETAPA_E.md`.

Blockers: nenhum. `goldens.spec.ts` fica vermelho **até a recaptura** — o JSON ainda tem os 54 registros com ids antigos. `state/FREEZE.json` está desatualizado de propósito: só é regravado no fim da E.

Decisão pendente do Mestre: os `CONTEXTS` ficam com 3 contextos de material+operação e a cobertura de substrato vem das 33 entradas → **99 goldens**. Repetir o substrato nos contextos daria 396 combinações sem cobrir nada novo.

Fora de escopo, registrado e não tocado: `research/BUILD_CONTRACT.md` ainda cita `broca_hss`/`broca_md` (registro histórico do loop de construção); `#00D9FF` segue em `PERMITIDOS` do `check-tokens.mjs`; **a reorganização de `docs/plans/` em `02_planos_executados/` e `03_planos_arquivados/` segue sem commit — os 3 protótipos `.html` foram apagados e não estão nos diretórios novos**, então commitar isso agora gravaria a perda sem decisão do Mestre.

Arquivos tocados: `gauntlet-calculadora-cnc-v2/{tests/combinacoes.mjs, tests/gauntlet.spec.ts, tests/refactor.spec.ts, tests/invariantes.spec.ts, tests/goldens.spec.ts, tests/TESTID_CONTRACT.md, scripts/check-suites.mjs, scripts/freeze.mjs, research/BUILD_CONTRACT_REFACTOR.md, criteria/JUDGE_CRITERIA_REFACTOR.md}`, `docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md`, `LESSONS.md`.

Retomar com: "continuar"
