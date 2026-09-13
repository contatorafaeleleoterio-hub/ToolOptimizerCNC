# Prompt de retomada — aplicar as diretrizes do painel na sandbox Gauntlet v2

> Este arquivo existe para ser **colado inteiro** no início da próxima sessão. Ele é autocontido:
> traz missão, decisões, arquivos, regras de blindagem e critério de pronto.
> Item 19 do backlog. Bloqueia o E2 do item 17.

---

## Missão

Aplicar as 5 decisões do documento `docs/specs/SPEC_PAINEL_CALCULADORA_PARAMETROS.md` no **contrato,
nos cenários, nos dados e nos scripts** da sandbox `gauntlet-calculadora-cnc-v2/`, deixando o E2
(ciclo 1 do loop Construtor/Juiz) pronto para começar com o contrato correto.

**Você atua como Orquestrador, não como Construtor.** É exatamente por isso que esta sessão existe:
contrato, testes, critérios e a região `DADOS` do mockup são congelados por SHA-256 e o Construtor
não pode tocá-los sem derrubar a validação de integridade.

---

## Contexto mínimo

- **Projeto:** ToolOptimizer CNC — calculadora de parâmetros de corte CNC. Branch `main`.
- **A calculadora atual em produção (`src/`) vai ser desativada** e substituída pela multi-ferramenta
  que está sendo desenhada na sandbox. Paridade de recurso importa.
- **Loop Gauntlet v2:** protocolo Construtor/Juiz-cego com blindagem anti-trapaça. E1 (setup,
  contratos, suíte, goldens) está feita. E2 era "pronto para começar" até 15/08/2026, quando as
  decisões abaixo mudaram o contrato.
- **Estado da suíte medido em 14/08/2026:** 44 cenários — 29 verdes (23 regressão + 3 invariantes +
  1 motor + R11 + R14) e 15 alvos vermelhos. `check-tokens.mjs` acusa 34 hex irregulares (a paleta
  FlowNC que o refactor substitui). Isso é o estado esperado de "instrumentação pronta, refatoração
  não executada".
- A suíte inteira leva ~5 minutos.

## Leitura obrigatória, nesta ordem

1. `docs/specs/SPEC_PAINEL_CALCULADORA_PARAMETROS.md` — **a fonte desta sessão**. Decisões nas
   §3.2, §4, §6.3, §6.6, §10.3 e o resumo de impacto na §13.
2. `docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md` — mecânica do loop, blindagem (§11), fronteiras (§17).
3. `gauntlet-calculadora-cnc-v2/research/BUILD_CONTRACT_REFACTOR.md` — o contrato a reescrever.
4. `gauntlet-calculadora-cnc-v2/tests/TESTID_CONTRACT.md` — contrato de seletores.
5. `docs/design/DS_TEMA_CLARO.md` — fonte única de cor.
6. `gauntlet-calculadora-cnc-v2/criteria/JUDGE_CRITERIA_REFACTOR.md` — matriz de 95, 14 gates, pisos.

Não leia `src/**` para copiar código — só como referência de comportamento já validado.

---

## As 5 decisões do Mestre (15/08/2026) — não reabrir

### 1. Recálculo híbrido
Formulário até o **primeiro** clique em Calcular; **painel vivo depois dele** — qualquer mudança de
parâmetro ou edição de resultado recalcula na hora, sem clique extra. O botão Calcular nunca some nem
desabilita: grava histórico e serve de reancoragem.
**Consequência:** o cenário `R03` ("mexer no controle não recalcula: resultado fica velho até clicar
em Calcular") **contradiz a decisão e precisa ser reescrito**. O estado `stale` continua existindo,
mas só na janela entre a mudança e o resultado novo.

### 2. Slider de agressividade
Um controle único 0–100% (**conservador ↔ produtivo**) move Vc/fz/ae/ap juntos, entre o piso
conservador e o teto de recomendação de cada um, respeitando `slider-bounds.ts`. Nasce no valor
recomendado. Os **3 gauges continuam read-only** — arrastar gauge de Saúde/MRR é problema inverso sem
solução única (4 parâmetros → 1 nota) e faria o sistema escolher a estratégia de usinagem no lugar do
operador. Mexer no slider marca os 4 parâmetros como manuais; mexer num controle individual depois
deixa o slider em estado "misto". O slider abre procedência e não contorna bloqueio nem limite físico.

### 3. Cor
| Papel | Token | Onde | Contraste medido |
|---|---|---|---|
| Marca | `#E85D04` | logo, cabeçalho, preenchimento do botão Calcular | — |
| Texto sobre a marca | `#0F1419` | letra do botão Calcular | 5,29:1 sobre o laranja |
| **Seleção / foco** | **`#3730A3`** (índigo) | rádio/segmentado escolhido, borda de campo ativo, anel de foco | 9,03:1 |
| Atenção (estado) | `#7A4F00` | inalterado | 6,48:1 |
| Informação (estado) | `#005E77` | inalterado | 6,65:1 |

Laranja **nunca** marca estado. `#E85D04` com texto branco dá 3,50:1 e reprova — a letra do botão
Calcular é escura.

### 4. Material da ferramenta sai da tela
O campo `Material da Ferramenta` **é removido**. O substrato passa a fazer parte do nome da
ferramenta no seletor de tipo, com uma entrada por variação real de mercado (catálogo completo na
§4.2 da SPEC). Junto: o rótulo **"Família de Operação" passa a ser "Tipo de Usinagem"**, mantendo o
`data-testid="select-familia"` (trocar o seletor quebraria os 23 cenários sem ganho).
`broca_hss` e `broca_md` deixam de ser tipos separados — viram variações de "Broca Helicoidal", com
os ângulos de ponta seguindo o substrato (118°/135° em HSS/HSS-Co, 140° em metal duro).

### 5. Revestimento
Geometria **inteiriça** lista MD revestido **e** MD separadamente (o operador sabe qual tem na mão e
a diferença vale 25% de Vc: fator `1,00` → `1,25`). Geometria **pastilhada** lista uma entrada só,
revestida — é o padrão de fábrica.

---

## Trabalho, em ordem de dependência

### A. Design System e script de cor
1. `docs/design/DS_TEMA_CLARO.md` §3.3 e §3.5: incluir marca `#E85D04`, texto sobre marca `#0F1419` e
   seleção/foco `#3730A3`; atualizar a checklist final e a tabela de contraste com os três números
   medidos acima.
2. `gauntlet-calculadora-cnc-v2/scripts/check-tokens.mjs`: adicionar `#E85D04` e `#3730A3` em
   `PERMITIDOS` e ajustar o `rgba()` do halo de foco em `ALLOW_RGBA` para acompanhar o índigo.
   O script é o executor da categoria 7 e do gate 9 — se ele não aceitar as cores novas, todo ciclo
   reprova por omissão.

### B. Dados do mockup (região `DADOS` — congelada)
3. `mockup/index.html`: reescrever `TOOLS`, `FAMILIAS` e o mapeamento de fator de substrato conforme
   o catálogo da SPEC §4.2. Fundir `broca_hss`/`broca_md`. Ajustar `anguloOptions` por substrato.
4. Remover do HTML e do JS o campo `select-material-ferramenta` e tudo que o lê.
5. Trocar o rótulo visível `Família de Operação` → `Tipo de Usinagem` (testid mantido).

> Estas edições **só podem ser feitas nesta sessão, por você**, nunca pelo Construtor. Depois delas os
> goldens **precisam** ser recapturados.

### C. Contrato do Construtor
6. `research/BUILD_CONTRACT_REFACTOR.md`: absorver as 5 decisões. Seções afetadas: §2 (ordem do
   formulário e rótulo), §3 (escolha segmentada — o material da ferramenta some da lista de 1 clique),
   §5 (ajuste fino + slider de agressividade novo), §5.2 (comportamento de recálculo — inverter),
   §6 (ajuda inline, várias abertas), §7 (gauges seguem read-only, com procedência), §1 (cores).
7. `tests/TESTID_CONTRACT.md`: retirar `select-material-ferramenta`, registrar os testids novos
   (slider de agressividade, campos editáveis de RPM/Avanço, gavetas de bloco).

### D. Cenários
8. Todos os cenários que chamam `escolher('select-material-ferramenta', …)` passam a escolher a
   **ferramenta equivalente** no seletor de tipo. São os 23 de regressão mais o `R13`.
9. `R03` — reescrever para o modelo híbrido: antes do 1º Calcular não recalcula; depois dele
   recalcula sozinho.
10. `R06` — reescrever: ajuda é gaveta inline, **várias podem ficar abertas ao mesmo tempo**; cai a
    regra "uma por vez" e o "fecha ao clicar fora"; permanecem `Esc` e fechar pelo próprio gatilho.
11. `R13` — remover o material da ferramenta da lista de escolhas de 1 clique.
12. `R11` — revalidar o teto de 6 campos por tipo (o campo removido abre folga).
13. **Cenários novos:** slider de agressividade (existe, nasce no recomendado, move os 4, não fura
    limite) · edição reversa de RPM e Avanço (inverte corretamente e trava no limite de máquina) ·
    Modo Rápido com `Z` como campo (hoje é fixo em 4 e erra o avanço por fator 2) · ferramenta com
    substrato no rótulo aparecendo no resumo do resultado.
14. `tests/combinacoes.mjs` — refletir as escolhas novas (é compartilhado entre captura e verificação).
15. `scripts/check-suites.mjs` — atualizar a contagem exata por grupo, senão a trava de "cenário
    desligado" acusa divergência.

### E. Goldens e integridade — por último
16. `node scripts/capture-goldens.mjs` e **conferir campo a campo** o que mudou. Combinação
    equivalente (mesma geometria e mesmo substrato) **deve dar o mesmo número**; qualquer número
    diferente é defeito de migração até prova em contrário, e a prova vai escrita no registro.
17. `node scripts/freeze.mjs` — só depois de tudo acima estar conferido.

---

## Regras que não podem ser quebradas

- **Fronteira:** só `gauntlet-calculadora-cnc-v2/`, `docs/plans/`, `docs/design/`, `docs/specs/` e
  `docs/ROADMAP_SESSAO_ATUAL.md`. **Proibido:** `src/**`, `package.json` raiz, `node_modules/`,
  `vite.config.ts`, `vitest.config.ts`, `wrangler.jsonc`, `.gitignore` raiz,
  `gauntlet-calculadora-cnc/` (rodada 1) e qualquer deploy.
- **No Invention:** nenhum número entra sem fonte. O catálogo da SPEC §4.2 tem pendência declarada de
  referência por variação — onde a fonte não existir, registre a lacuna em vez de arbitrar.
- **Nada de "corrigir de carona":** achado fora de escopo vai para o registro, não para o diff.
- **Ao fim de cada etapa (A, B, C, D, E): reportar e esperar "pode seguir".**

## Critério de pronto

1. `npx playwright test` na sandbox — os quatro grupos verdes, contagem exata conferida.
2. `node scripts/check-tokens.mjs` — sai 0 com as cores novas aceitas.
3. `.\scripts\validate-cycle-refactor.ps1 -CycleNumber 1` — exit 0 (libera o Juiz) ou exit 2 (alvo do
   refactor pendente, que é o esperado antes do ciclo rodar).
4. `node scripts/freeze.mjs` responde "Integridade OK".
5. `git status` — só a sandbox e os docs declarados.
6. `docs/ROADMAP_SESSAO_ATUAL.md` e `docs/plans/BACKLOG_IMPLEMENTACAO.md`: item 19 concluído e item 17
   desbloqueado para o E2.

**Ao terminar: parar e esperar aprovação explícita do Mestre.** Contrato reescrito não autoriza rodar
o ciclo.
