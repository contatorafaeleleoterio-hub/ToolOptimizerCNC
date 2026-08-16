# Handoff — ToolOptimizerCNC — 2026-08-16
Status: item 19 (diretrizes do painel) **em execução — etapas A, B e C fechadas; D e E pendentes**. Sessão de Orquestrador, zero `src/**`.

Feito nesta sessão:
- **A — Design System e cor:** `DS_TEMA_CLARO.md` §2/§3.3/§3.5/§4.1/§5/§6 com marca `#E85D04` (letra `#0F1419`, 5,29:1) e seleção/foco índigo `#3730A3` (9,03:1). `check-tokens.mjs` aceita as duas e o halo `rgba()` acompanha o índigo. Irregulares 34 → 33 (paleta FlowNC, alvo do refactor).
- **B — região `DADOS` do mockup (congelada):** catálogo novo com **33 entradas** = 17 geometrias × substratos, expandidas de `GEOMETRIAS` (cada `TOOLS[id]` traz `substrato`, `construcao`, `geometria`, `grupo`). `broca_hss`/`broca_md` fundidos em `broca_helicoidal_*` com ângulo de ponta por substrato. Campo `select-material-ferramenta` removido do HTML e do JS (fator vem de `cfg.substrato`); rótulo "Tipo de Usinagem" com o testid mantido. Comparações do motor por id passaram a usar `geoDe(tipoId)` — nenhuma conta mudou.
- **C — contratos:** `BUILD_CONTRACT_REFACTOR.md` §0/§1/§2/§3/§5.0/§5.2/§5.2.1-3/§6/§7/§10 e `TESTID_CONTRACT.md` absorvem as 5 decisões (recálculo híbrido, slider de agressividade, cor, catálogo, revestimento). Gate 9 do `JUDGE_CRITERIA_REFACTOR.md` corrigido: exigia "recálculo só no clique" e reprovaria a implementação correta.

Verificação: smoke próprio percorreu as 33 entradas — console limpo, zero `NaN`/`undefined`/`Infinity`, RPM escalando exatamente pelo fator de substrato (fresa de topo MD 4456 → MD-rev 5570 → HSS-Co 1649 → HSS 1292).

Onde parou: fim da etapa C, aguardando "pode seguir" para a D.

Próximo passo: **etapa D — cenários.** Reapontar os 23 de regressão + `R13` para a ferramenta equivalente; reescrever `R03` (híbrido) e `R06` (ajuda inline, várias abertas); `R13` sem material da ferramenta; revalidar `R11`; 4 cenários novos (slider de agressividade · edição reversa RPM/Avanço · Modo Rápido com `Z` como campo · substrato no resumo); `combinacoes.mjs`; `check-suites.mjs`. Depois **E**: `capture-goldens.mjs` conferido campo a campo + `freeze.mjs`.

Blockers: a suíte fica **vermelha entre B e D** — `combinacoes.mjs:84` ainda procura `select-material-ferramenta`, que não existe mais. É esperado e só sai na D.

Pendências declaradas (fecham na D/E, não antes): contagens de cenários e de goldens no `BUILD_CONTRACT_REFACTOR.md` §11 e no `JUDGE_CRITERIA_REFACTOR.md` (categoria 1, gates 2 e 11) ainda dizem "18 tipos", "54 goldens", "44 cenários".

Decisão pendente do Mestre (proposta na etapa B, sem objeção até aqui): o eixo `ferramenta` dos `CONTEXTS` de `combinacoes.mjs` morreu com o substrato dentro da ferramenta. Proposta: manter 3 contextos só com material+operação e deixar a cobertura de substrato vir das 33 entradas → 99 goldens.

Fora de escopo, registrado e não tocado: `research/BUILD_CONTRACT.md` ainda cita `broca_hss`/`broca_md` (é o contrato do loop de construção, registro histórico); `#00D9FF` segue em `PERMITIDOS` do `check-tokens.mjs` mesmo sem papel no tema claro.

Arquivos tocados: `docs/design/DS_TEMA_CLARO.md`, `docs/ROADMAP_SESSAO_ATUAL.md`, `gauntlet-calculadora-cnc-v2/{mockup/index.html, scripts/check-tokens.mjs, research/BUILD_CONTRACT_REFACTOR.md, tests/TESTID_CONTRACT.md, criteria/JUDGE_CRITERIA_REFACTOR.md}`.

Retomar com: "continuar"
