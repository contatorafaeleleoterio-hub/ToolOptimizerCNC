# Prompt de retomada — etapa E do item 19 (goldens e integridade)

> Cole inteiro no início da próxima sessão. Autocontido. Continuação direta da etapa D.

---

## Missão

Fechar a **etapa E** do item 19: recapturar os golden values da sandbox
`gauntlet-calculadora-cnc-v2/` para o contrato novo, conferir campo a campo, regravar o congelamento
de integridade e marcar o item 19 como concluído — deixando o **E2 (ciclo 1 do loop
Construtor/Juiz)** liberado para começar.

**Você é Orquestrador, não Construtor.** Cenários, dados, critérios e a região `DADOS` do mockup são
congelados por SHA-256 e só esta sessão pode tocá-los. **Não rodar o ciclo. Não tocar em `src/**`.**

---

## Onde parou

Etapas A, B e C no commit `40ff4f6`. **Etapa D fechada nesta sessão anterior:**

- `tests/combinacoes.mjs` sem o eixo `ferramenta`; 13 cenários de regressão reapontados para a
  ferramenta equivalente; `R03` reescrito para o recálculo híbrido; `R06` para gaveta inline com
  várias abertas; `R13` com 3 controles; `R11` revalidado (teto de 6 continua, máximo real é 6 na
  fresa toroidal); **4 alvos novos** — `R18` slider de agressividade, `R19` edição reversa de
  RPM/Avanço, `R20` Modo Rápido com `Z`, `R21` substrato no resumo (testid novo `resumo-ferramenta`).
- Contagens fechadas em `check-suites.mjs`, `freeze.mjs`, `invariantes.spec.ts`, `goldens.spec.ts`,
  `BUILD_CONTRACT_REFACTOR.md`, `JUDGE_CRITERIA_REFACTOR.md` e `PLAN_GAUNTLET_V2_REFACTOR.md`.
  A suíte agora é de **48 cenários**: 23 regressão + 3 invariantes + 1 golden + 21 alvos.

**Placar medido ao fim da D:** regressão **23/23** · invariantes **3/3** · goldens **vermelho** ·
alvos **2/21** (R11 e R14). O vermelho dos goldens é esperado: `tests/GOLDEN_VALUES.json` ainda tem
os 54 registros com os ids antigos. É o primeiro item desta etapa.

## Leitura obrigatória, nesta ordem

1. `HANDOFF.md` — estado, pendências e decisões declaradas.
2. `gauntlet-calculadora-cnc-v2/tests/combinacoes.mjs` — o que a captura aciona e o que ela lê.
3. `gauntlet-calculadora-cnc-v2/scripts/capture-goldens.mjs` e `scripts/freeze.mjs`.
4. `docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md` §11 (blindagem) e §17 (fronteiras).

---

## Trabalho, em ordem de dependência

1. **Confirmar a contagem com o Mestre antes de capturar.** Proposta declarada e não contestada: 3
   contextos de material+operação × 33 entradas do catálogo = **99 goldens**. O eixo `ferramenta`
   morreu com o substrato dentro da ferramenta (SPEC §3.2); repeti-lo daria 396 combinações sem
   cobrir nada novo.
2. `node scripts/capture-goldens.mjs` — grava `tests/GOLDEN_VALUES.json` (~4 min, 99 combinações).
3. **Conferir campo a campo, não por amostragem.** Combinação equivalente (mesma geometria, mesmo
   substrato) **tem que dar o mesmo número** dos 54 goldens antigos. Referência medida na etapa B:
   fresa de topo MD **4456 rpm** → MD-rev **5570** → HSS-Co **1649** → HSS **1292**. Diferença em
   entrada equivalente é defeito de migração até prova em contrário, e a prova vai **escrita** no
   registro.
   **Diferença esperada e legítima, só nestas cinco:** `fresa_alto_avanco`, `cabecote_faceador`,
   `u_drill`, `fresa_rosca` e `mandril` só existem em MD revestido no catálogo novo; antes o default
   do seletor removido era MD (fator 1,00), agora é 1,25. O número sobe exatamente por esse fator —
   confirme a razão, não aceite "mudou e tudo bem".
4. `npx playwright test` — **rode com `PLAYWRIGHT_JSON_OUTPUT_NAME=reports/test-results.json`**. O
   RTK reescreve o comando acrescentando `--reporter=json`, o que anula o reporter do
   `playwright.config.ts` e deixa `reports/test-results.json` sem regravar; `check-suites.mjs`
   passaria a conferir um relatório velho sem avisar. Confira a data do arquivo antes de acreditar
   no placar.
5. `node scripts/check-suites.mjs` — regressão 23/23, invariantes 3/3, motor 1/1, alvos 2/21 com
   contagem exata de 21.
6. `node scripts/freeze.mjs --write` — **só depois de tudo acima conferido.** Depois, `node
   scripts/freeze.mjs` tem que responder "Integridade OK".
7. `.\scripts\validate-cycle-refactor.ps1 -CycleNumber 1` — exit 0 ou exit 2 (alvo pendente, que é o
   esperado antes do ciclo rodar).
8. Fechar o item 19 em `docs/ROADMAP_SESSAO_ATUAL.md` e `docs/plans/BACKLOG_IMPLEMENTACAO.md`, e
   marcar o item 17 desbloqueado para o E2.

---

## Regras que não podem ser quebradas

- **Fronteira:** só `gauntlet-calculadora-cnc-v2/`, `docs/plans/`, `docs/design/`, `docs/specs/` e
  `docs/ROADMAP_SESSAO_ATUAL.md`. **Proibido:** `src/**`, `package.json` raiz, `node_modules/`,
  `vite.config.ts`, `vitest.config.ts`, `wrangler.jsonc`, `.gitignore` raiz,
  `gauntlet-calculadora-cnc/` (rodada 1) e qualquer deploy.
- **No Invention:** nenhum número entra sem fonte. Onde a fonte não existir, registre a lacuna em vez
  de arbitrar.
- **Nada de "corrigir de carona":** achado fora de escopo vai para o registro, não para o diff.
- **Ao fim da etapa: reportar e esperar "pode seguir".**

## Critério de pronto

1. `npx playwright test` — regressão, invariantes e motor verdes; alvos vermelhos como devem estar.
2. `node scripts/check-tokens.mjs` — segue em 33 irregulares (paleta FlowNC, alvo do refactor);
   **não** é para zerar nesta sessão.
3. `.\scripts\validate-cycle-refactor.ps1 -CycleNumber 1` — exit 0 ou exit 2.
4. `node scripts/freeze.mjs` responde "Integridade OK".
5. `git status` — só a sandbox e os docs declarados.
6. Item 19 concluído e item 17 desbloqueado para o E2.

**Ao terminar: parar e esperar aprovação explícita do Mestre.** Contrato, cenários e goldens prontos
não autorizam rodar o ciclo.

## Achados registrados, para não virarem diff

- `research/BUILD_CONTRACT.md` ainda cita `broca_hss`/`broca_md` — é o contrato do loop de
  **construção**, registro histórico que o Construtor do refactor está proibido de ler.
- `#00D9FF` segue em `PERMITIDOS` do `check-tokens.mjs` mesmo sem papel no tema claro. Removê-lo é
  decisão do Mestre, não limpeza de carona.
- A reorganização de `docs/plans/` em `02_planos_executados/` e `03_planos_arquivados/` está sem
  commit, e **os 3 protótipos `.html` foram apagados sem ir para os diretórios novos**. Commitar
  isso gravaria a perda sem decisão do Mestre — pergunte antes.
