# Prompt de retomada — etapas D e E do item 19 (cenários e goldens)

> Cole inteiro no início da próxima sessão. Autocontido: estado, decisões, trabalho, fronteiras e
> critério de pronto. Continuação direta do commit `40ff4f6`.

---

## Missão

Fechar as **etapas D e E** do item 19: reescrever os cenários da sandbox
`gauntlet-calculadora-cnc-v2/` para o contrato novo e recapturar os golden values, deixando o E2
(ciclo 1 do loop Construtor/Juiz) pronto para começar.

**Você é Orquestrador, não Construtor.** Cenários, dados, critérios e a região `DADOS` do mockup são
congelados por SHA-256 — só esta sessão pode tocá-los. **Não rodar o ciclo. Não tocar em `src/**`.**

---

## Onde parou

Etapas A, B e C fechadas no commit `40ff4f6`:

- **A** — `DS_TEMA_CLARO.md` com marca `#E85D04` (letra `#0F1419`, 5,29:1) e seleção/foco índigo
  `#3730A3` (9,03:1); `check-tokens.mjs` aceita as duas, halo `rgba(55,48,163,…)`.
- **B** — região `DADOS` do mockup reescrita: **33 entradas** (17 geometrias × substratos)
  expandidas de `GEOMETRIAS`; cada `TOOLS[id]` traz `substrato`, `construcao`, `geometria`, `grupo`.
  `broca_hss`/`broca_md` fundidos em `broca_helicoidal_{mdrev,md,hssco,hss}` com ângulo de ponta por
  substrato (140° em MD, 118/135° em HSS/HSS-Co). Campo `select-material-ferramenta` **removido**;
  o fator vem de `cfg.substrato`. Rótulo "Tipo de Usinagem", `data-testid="select-familia"` mantido.
  Comparações do motor usam `geoDe(tipoId)`. **Nenhuma conta mudou.**
- **C** — `BUILD_CONTRACT_REFACTOR.md` e `TESTID_CONTRACT.md` absorvem as 5 decisões; gate 9 do
  `JUDGE_CRITERIA_REFACTOR.md` corrigido (exigia "recálculo só no clique", que reprovaria a
  implementação correta).

**A suíte está vermelha de propósito:** `tests/combinacoes.mjs:84` ainda chama
`escolher('select-material-ferramenta', …)`, que não existe mais. É o primeiro item da etapa D.

Ids novos, para reapontar os cenários: `fresa_topo_{mdrev,md,hssco,hss}` ·
`fresa_toroidal_{mdrev,md}` · `fresa_esferica_{mdrev,md,hssco}` · `fresa_chanfrar_{md,hssco}` ·
`fresa_alto_avanco_mdrev` · `cabecote_faceador_mdrev` · `fresa_pastilhada_mdrev` ·
`fresa_disco_{md,hssco}` · `broca_helicoidal_{mdrev,md,hssco,hss}` · `u_drill_mdrev` ·
`broca_centro_{md,hssco}` · `escareador_{md,hssco}` · `alargador_{md,hssco}` ·
`macho_corte_{hssco,md}` · `macho_conformacao_{hssco,md}` · `fresa_rosca_mdrev` · `mandril_mdrev`.

## Leitura obrigatória, nesta ordem

1. `HANDOFF.md` — estado, pendências e decisões declaradas.
2. `gauntlet-calculadora-cnc-v2/research/BUILD_CONTRACT_REFACTOR.md` — o contrato **já reescrito**;
   é a fonte do que os cenários novos têm de medir (§5.0, §5.2, §5.2.1–3, §6).
3. `gauntlet-calculadora-cnc-v2/tests/TESTID_CONTRACT.md` — testids novos e o removido.
4. `docs/specs/SPEC_PAINEL_CALCULADORA_PARAMETROS.md` §6.3, §6.6, §8.1, §9.3 — as decisões em
   detalhe, com fonte.
5. `docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md` §11 (blindagem) e §17 (fronteiras).

Não leia `src/**` para copiar código — só como referência de comportamento já validado.

---

## Trabalho, em ordem de dependência

### D. Cenários

1. `tests/combinacoes.mjs` — tirar o passo do material da ferramenta (é o que destrava a suíte).
   **Decisão proposta e não contestada:** o eixo `ferramenta` dos `CONTEXTS` morreu com o substrato
   dentro da ferramenta; manter 3 contextos só com material+operação e deixar a cobertura de
   substrato vir das 33 entradas → **99 goldens**. Confirmar com o Mestre antes da captura.
2. Os **23 cenários de regressão** e o `R13`: onde escolhiam `select-material-ferramenta`, passam a
   escolher a **ferramenta equivalente** no seletor de tipo (mesma geometria, mesmo substrato).
3. `R03` — reescrever para o **modelo híbrido**: antes do 1º Calcular não recalcula; depois dele
   recalcula sozinho, sem clique. O `stale` continua existindo, só na janela entre a mudança e o
   resultado novo.
4. `R06` — reescrever: ajuda é **gaveta inline**, **várias abertas ao mesmo tempo**. Caem "uma por
   vez" e "fecha ao clicar fora"; permanecem `Esc` e o fechar pelo próprio gatilho.
5. `R13` — o material da ferramenta sai da lista de escolhas de 1 clique (sobram 3 controles).
6. `R11` — revalidar o teto de 6 campos por tipo; o campo removido abriu folga.
7. **Cenários novos (4):** slider de agressividade (`slider-agressividade` existe, nasce no
   recomendado, move os 4, não fura limite) · edição reversa de RPM e Avanço (`input-resultado-rpm`,
   `input-resultado-avanco`: inverte certo e trava no limite de máquina) · Modo Rápido com `Z` como
   campo (hoje é fixo em 4 e erra o avanço por fator 2) · ferramenta com substrato no rótulo
   aparecendo no resumo do resultado.
8. `scripts/check-suites.mjs` — contagem exata por grupo, senão a trava de "cenário desligado" acusa
   divergência.
9. **Fechar as contagens que ficaram pendentes de propósito:** `BUILD_CONTRACT_REFACTOR.md` §11 e
   `JUDGE_CRITERIA_REFACTOR.md` (categoria 1, gates 2 e 11) ainda dizem "18 tipos", "54 goldens",
   "44 cenários".

### E. Goldens e integridade — por último

10. `node scripts/capture-goldens.mjs` e **conferir campo a campo**. Combinação equivalente (mesma
    geometria, mesmo substrato) **deve dar o mesmo número** — na etapa B isso foi medido e bate:
    fresa de topo MD 4456 rpm → MD-rev 5570 → HSS-Co 1649 → HSS 1292. Qualquer número diferente é
    defeito de migração até prova em contrário, e a prova vai escrita no registro.
11. `node scripts/freeze.mjs` — só depois de tudo acima conferido.

---

## Regras que não podem ser quebradas

- **Fronteira:** só `gauntlet-calculadora-cnc-v2/`, `docs/plans/`, `docs/design/`, `docs/specs/` e
  `docs/ROADMAP_SESSAO_ATUAL.md`. **Proibido:** `src/**`, `package.json` raiz, `node_modules/`,
  `vite.config.ts`, `vitest.config.ts`, `wrangler.jsonc`, `.gitignore` raiz,
  `gauntlet-calculadora-cnc/` (rodada 1) e qualquer deploy.
- **No Invention:** nenhum número entra sem fonte. Onde a fonte não existir, registre a lacuna em vez
  de arbitrar.
- **Nada de "corrigir de carona":** achado fora de escopo vai para o registro, não para o diff.
- **Ao fim de cada etapa (D, E): reportar e esperar "pode seguir".**

## Critério de pronto

1. `npx playwright test` na sandbox — os quatro grupos verdes, contagem exata conferida (~5 min).
2. `node scripts/check-tokens.mjs` — segue em 33 irregulares (paleta FlowNC, alvo do refactor);
   **não** é para zerar nesta sessão.
3. `.\scripts\validate-cycle-refactor.ps1 -CycleNumber 1` — exit 0 ou exit 2 (alvo pendente, que é o
   esperado antes do ciclo rodar).
4. `node scripts/freeze.mjs` responde "Integridade OK".
5. `git status` — só a sandbox e os docs declarados.
6. `docs/ROADMAP_SESSAO_ATUAL.md` e `docs/plans/BACKLOG_IMPLEMENTACAO.md`: item 19 concluído e item
   17 desbloqueado para o E2.

**Ao terminar: parar e esperar aprovação explícita do Mestre.** Contrato e cenários prontos não
autorizam rodar o ciclo.

## Achados registrados, para não virarem diff

- `research/BUILD_CONTRACT.md` ainda cita `broca_hss`/`broca_md` — é o contrato do loop de
  **construção**, registro histórico que o Construtor do refactor está proibido de ler.
- `#00D9FF` segue em `PERMITIDOS` do `check-tokens.mjs` mesmo sem papel no tema claro. Removê-lo é
  decisão do Mestre, não limpeza de carona.
