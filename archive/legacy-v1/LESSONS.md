# LESSONS — erros a não repetir

> Um erro por bloco: o que aconteceu, o custo, e a regra que evita a repetição.
> Ordenado por gravidade.

---

## 1. Plano aprovado ≠ execução autorizada · 14/08/2026

**O que aconteceu.** O Mestre pediu para *revisar o plano de refatoração e adicionar as correções
ao plano*. O agente escreveu um plano de **execução**, pediu aprovação, recebeu, e tratou os três
"pode seguir" seguintes como liberação para editar código e gastar subagentes. A refatoração do
mockup foi executada sem autorização e teve que ser revertida.

**Custo.** ~456 mil tokens de subagente, um ciclo completo desfeito.

**Por que passou despercebido.** As duas primeiras etapas eram documentação, o que casava com a
leitura do Mestre. A terceira começou a editar código e a quarta gastou agente — a natureza da
etapa mudou e ninguém sinalizou.

**Regra.**
- "Faça um plano" significa **produzir o documento**, não executar o que ele descreve.
- Quando a próxima etapa **muda de natureza** — de documento para código, de local para gasto de
  agente, de reversível para caro — isso vira uma pergunta explícita, não um "pode seguir" genérico:
  *"a próxima etapa edita o mockup e gasta 2 subagentes. Confirma?"*
- Aprovação de plano cobre **o plano**. A primeira ação cara pede confirmação própria.

---

## 2. Entregar no lugar certo · 14/08/2026

**O que aconteceu.** O pedido era adicionar as correções ao `PLAN_GAUNTLET_V2_REFACTOR.md`. O plano
foi escrito em `~/.claude/plans/`, fora do projeto. O documento que o Mestre pediu ficou intocado
até a reversão.

**Regra.** Se o pedido nomeia um arquivo do projeto, a entrega vai **nele**. Documento de trabalho
do agente não substitui o artefato pedido.

---

## 3. Passar em 100% dos testes não é qualidade · 14/08/2026

**O que aconteceu.** O ciclo de ensaio fechou 41/41 cenários verdes — 23 de regressão, 1 de motor,
17 alvos. O Juiz cego reprovou em **86/100**, com três categorias abaixo do piso.

**Por quê.** Cenário automatizado prova **presença e comportamento**: o controle existe, abre por
clique, fecha com Esc. Não prova que a mensagem de erro diz ao operador **o que fazer**, nem que o
indicador explica de onde veio o número.

**Regra.** Alvo automatizado é **piso**, não meta. Num loop com corte em 95, o contrato do Construtor
precisa endereçar explicitamente o que o Juiz avalia além dos cenários — ou o primeiro ciclo queima
sabendo que vai reprovar.

---

## 4. Auditoria de campo morto: ler ≠ usar · 14/08/2026

**O que aconteceu.** A auditoria encontrou 4 campos que não entram em nenhuma conta. O Juiz cego
encontrou mais **2** que ela deixou passar: o ângulo de chanfro da fresa e o ângulo do escareador.

**Por quê.** A auditoria procurou campos **não lidos**. Os dois que escaparam **são lidos** — só que
o valor lido não alcança nenhuma saída, ou alcança só para outros tipos de ferramenta:

```js
var angulo = anguloEl ? parseFloat(anguloEl.value) : 118;   // lido
if (... && (tipoId==='broca_hss'||tipoId==='broca_md'||tipoId==='broca_centro')) { ... }  // usado só para 3 tipos
```

**Regra.** Rastrear **até a saída**, por tipo, não até a leitura. A pergunta certa não é "esse campo
é lido?", é "mudar esse campo muda algum número na tela, para este tipo de ferramenta?".

---

## 5. Golden values que fixam texto travam melhoria de texto · 14/08/2026

**O que aconteceu.** Os 54 golden values fixam também o texto dos alertas. Quando o Juiz pediu alvo
numérico nas mensagens de bloqueio, melhorar a redação passou a "quebrar" a trava do motor — 6
linhas divergentes, nenhum número alterado.

**Regra.** Separar na cabeça duas coisas que o mesmo arquivo fixa:
- **número e fórmula** — trava dura, ninguém mexe;
- **texto de mensagem** — muda quando melhora, com **rebaseline feito pelo orquestrador**, diff
  inspecionado, e a exigência de que **zero campo numérico** tenha mudado.

Nunca deixar o Construtor recapturar goldens.

---

## 6. Verificar o contrato do widget antes de prometer risco baixo · 13/08/2026

**O que aconteceu.** O plano anterior afirmava que trocar `<select>` por escolha segmentada teria
"risco baixo de quebrar os 23 cenários, porque os testids continuam". Falso: `page.selectOption()`
do Playwright **não funciona em `<input type="radio">`**. A troca quebraria quase toda a suíte.

**Regra.** Antes de declarar risco de uma troca de widget, conferir como o **verificador** interage
com ele. A solução — um helper que fala com as duas formas — mantém a rede de segurança de pé
durante a transição, e é barata se pensada antes.

---

## 7. Lacuna de cobertura: o teste mede onde você mandou medir · 14/08/2026

**O que aconteceu.** O cenário de alvo de toque verificava só os controles de escolha segmentada.
Dois componentes ficaram em 34px, abaixo dos 44px do Design System, e passaram batido. Quem achou
foi o Juiz.

**Regra.** Regra de design que vale para a tela inteira precisa de verificação que **varra a tela
inteira**, não uma amostra de seletores. O mesmo vale para contraste: 5 pares medidos não são "a
tela passa em AA".

---

## 8. Armadilhas do ambiente

**PowerShell 5.1 lê `.ps1` como ANSI quando não há BOM.** Um travessão `—` num `Write-Host` vira
erro de sintaxe em cascata. **Regra:** `.ps1` em ASCII puro.

**O JS do mockup roda dentro de uma IIFE.** `page.evaluate(() => TOOLS)` falha — nada é global.
**Regra:** enumerar pelo DOM (as `<option>` do seletor), que é como o usuário faz e não depende da
estrutura interna do script.

**A suíte leva ~5 minutos** — ~9 quando os goldens estão vermelhos e cada linha espera o timeout.
Orçar isso por ciclo antes de prometer prazo.

**O RTK reescreve `npx playwright test` acrescentando `--reporter=json`.** Isso anula os reporters
do `playwright.config.ts` e `reports/test-results.json` **não é regravado** — `check-suites.mjs`
passa a conferir um relatório velho sem avisar, que é exatamente a trava que ele deveria ser.
**Regra:** rodar com `PLAYWRIGHT_JSON_OUTPUT_NAME=reports/test-results.json` e conferir a data do
arquivo antes de acreditar no placar.

---

## 9. O que funcionou e vale repetir

- **Provar o corte por golden values.** Capturar antes, cortar, recapturar, comparar. Deu 54/54
  idênticos — e ficou mais forte que o esperado: com os campos fora do schema, os valores passaram
  a chegar no motor como `NaN` e mesmo assim nenhum resultado mudou.
- **Testar a própria trava.** Alterar `maxRPM` de 12000 para 9999 de propósito e confirmar que a
  conferência de integridade reprova. Trava não testada é decoração.
- **Juiz cego com evidência obrigatória.** O veredito citou linha por linha e encontrou dois
  defeitos reais que a auditoria do orquestrador tinha perdido. Vale o custo.
- **Medir antes de escrever o handoff.** Rodar a suíte depois da reversão para o número do
  documento ser o número real, não o lembrado.

---

## 10. Confirmar para que serve o artefato, não só quantos são · 16/08/2026

A etapa E abriu perguntando ao Mestre **quantos** goldens capturar (99) e detalhando a conta em
vocabulário do projeto — "contextos", "substrato", "eixo". Resposta: *"não entendi nada"*. Reescrito
em linguagem simples, veio a informação que mudava tudo: **o número calculado é provisório, o mockup
é o documento canônico da tela e o motor definitivo entra depois.** A pergunta certa nunca foi
quantos, e sim **o que a trava mede**. Capturar 99 fotos de números teria produzido um teste que
reprovaria de propósito assim que o motor real chegasse.

**Regra:** antes de recapturar, congelar ou fixar qualquer baseline, confirmar **o propósito** do
artefato em uma frase sem jargão. Quantidade é detalhe de execução; propósito é decisão do Mestre.

**Segunda regra, do mesmo episódio:** ao desenhar a trava nova, conferir o que o contrato **manda**
o avaliado mudar. Congelar os campos visíveis da tela pareceu óbvio — e teria reprovado o Construtor
por cumprir o §10, que manda tirar 6 campos. A trava ficou só na zona de resultado.

## 11. Critério de pronto tem que bater com o que o validador faz · 16/08/2026

O prompt da etapa previa `validate-cycle-refactor.ps1` em **exit 0 ou 2**, e o mesmo prompt declarava
que os 33 hex da paleta FlowNC **seguem** até o refactor. As duas coisas não cabem juntas: o script
trata paleta reprovada como falha dura e sai com **exit 1**. Ninguém errou a execução — o critério
foi escrito sem conferir o código do validador.

**Regra:** critério de pronto que cita código de saída de script se escreve **lendo o script**, não
de memória. E, ao encontrar a divergência, registrar — não "ajustar" o validador para o critério
fechar, ainda mais quando ele está congelado por hash.

## 12. "Confirmado" de revisão não substitui a contagem · 13/09/2026

O plano de migração dizia 17 pontos de identidade, e a revisão marcou **Confirmado**. A própria
tabela tinha 18 linhas com "Fenix" — e 19 com o `harness.spec.ts:3` que a mesma revisão achou. Um
número errado passou por dois leitores porque ninguém contou.

**Regra:** número de ocorrências se grava depois de `grep -n` no alvo, nunca copiado de plano ou de
revisão.

## 13. Pasta com DENY de leitura: o agente entrega o comando, o Mestre roda · 13/09/2026

`git ls-files --others` acusou `Permission denied` numa pasta do gauntlet. O `icacls` mostrou
`USUARIO:(DENY)(R)` explícito, com o grupo `CodexSandboxUsers` no ACL. Mexer em permissão de
segurança não é ação do agente, nem com autorização no chat — o Mestre não entendeu por que o "pode"
dele não bastava.

**Regra:** explicar em 1 frase que a trava é do Windows, não do chat, e entregar o comando pronto
(`icacls "<pasta>" /remove:d "<MÁQUINA>\USUARIO"`) para ele rodar. Depois, conferir com `icacls` e com
o git.
