# Protocolo de Pesquisa — Validação Técnica para a Calculadora de Parâmetros

> **Começando uma sessão?** Leia `../HANDOFF.md` primeiro (na pasta acima, `Docs_inicial/`) — ele traz o contexto, o estado atual e o ciclo operacional. Este arquivo é a referência das rodadas.

**O que é isto:** 6 pesquisas isoladas que, unidas, produzem os **documentos canônicos de cálculo** do sistema novo — a fonte única de verdade por assunto, cada número com fórmula, fonte e nível de confiança.

**Por que separado:** um agente de deep research distribui profundidade entre as questões que recebe. 17 questões numa rodada produzem 17 respostas rasas. 3 a 5 questões por rodada produzem o que serve para virar código.

**Origem:** `../_referencia/DOSSIE_CALCULADORA_PARAMETROS_AUDITADO.md` — perguntas abertas P1 e P2, pontos de atenção A1–A6, §5.16 e as travas do roadmap. Toda referência de seção nos prompts (§10.13, §5.16, etc.) aponta para lá.

**Status do prompt anterior:** `../_referencia/PROMPT_DEEP_RESEARCH_VALIDACAO.md` (monolítico) está **superado** por estes seis. Todo o conteúdo dele foi redistribuído sem perda. Mantido só como registro.

**Onde salvar o que sai daqui:** retornos crus ficam nesta pasta (`RESPOSTA_R{n}.md`); os canônicos vão para `../canonicos/`.

---

## As 6 rodadas

| # | Rodada | Responde | Vira o canônico |
|---|---|---|---|
| **R1** | Geometria de corte | **P1** (ap em acabamento) · **P2** (faixa de diâmetro) · multiplicadores de `ae`/`ap` por operação | `CANONICO_GEOMETRIA_DE_CORTE.md` |
| **R2** | Motor de cálculo | Fórmula de afinamento de cavaco · qual `h` entra no Kienzle · `kc1.1` e `mc` por material | `CANONICO_MOTOR_DE_CALCULO.md` |
| **R3** | Ferramentas e substratos | Matriz tipo × substrato · premissa "substrato é commodity, revestimento é a variável" · granularidade do catálogo | `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` |
| **R4** | Velocidades e avanços | Tabelas de `Vc` e `fz` por material e diâmetro · janela de tolerância em torno do recomendado | `CANONICO_VELOCIDADES_E_AVANCOS.md` |
| **R5** | Limites e alertas | `ae/D` mínimo · janela de `Vc` · `L/D` por família · referências de MRR | `CANONICO_LIMITES_E_ALERTAS.md` |
| **R6** | Rigidez, deflexão e vida | Limite de deflexão · `E`, diâmetro efetivo, `Fr/Fc` · expoente de Taylor · refrigeração interna | `CANONICO_DEFLEXAO_E_VIDA.md` |

---

## Ordem de execução e dependências

```
R1 ──┐
     ├──> destrava a FASE 2 do dossiê (P1 e P2 respondidas)
R1 ──┘

R2 ──> alimenta R6 (a força de corte do Kienzle é a entrada da deflexão)
R3 ──> alimenta R6 (o E do substrato) e R4 (o fator de revestimento sobre Vc)
R4 ──> alimenta R1 (a espessura de cavaco limita o ap de acabamento)
R5 ──> independente
R6 ──> depende de R2 e R3
```

**Ordem recomendada:** R1 → R3 → R2 → R4 → R5 → R6.

**Se quiser o mínimo para destravar o projeto:** só **R1**. Ela responde P1 e P2, que são as duas perguntas que bloqueiam a Fase 2. O resto melhora o código, não destrava a decisão.

**Se quiser rodar em paralelo:** R1, R3 e R5 não dependem de ninguém — podem ir juntas em três janelas.

---

## Quem roda uma rodada — e por que o Mestre saiu do meio

> **Reescrito em 03/09/2026.** A versão anterior mandava o Mestre abrir o arquivo e **colar o prompt à
> mão** numa ferramenta de IA externa. Ela foi escrita em 22/08, no commit inicial — **doze dias antes
> de a equipe existir**. Não havia Ícaro nem Morfeu para receber nada, e colar era a única saída.
> Ninguém reconciliou os dois documentos quando a equipe nasceu, e em 03/09 o Mestre teve de perguntar
> se ia "ter que criar um texto para colar todas as vezes". Não vai.

**A divisão é por quem PODE estar cego**, e não por quem é mais capaz. A trava 3 do par cego proíbe o
pesquisador de ler conclusão pronta — canônico, validação anterior, dossiê. **Ícaro e Morfeu leram os
canônicos inteiros**: eles estão contaminados por construção, e apurar com eles destruiria a
independência que a rodada existe para produzir.

| Etapa | Quem faz | Por quê |
|---|---|---|
| **Escrever o enunciado** e definir os dois territórios | Skinner | Conhece a lacuna e o que já foi decidido |
| **Sortear** território → arquivo, e guardar o mapa | Skinner | O juiz não pode saber; o mapa vai para `_procedencia/` |
| **Apurar** — os dois pesquisadores | **Subagente interno, contexto zero** | É o único que consegue cumprir a trava 3. A equipe não consegue: já leu tudo |
| **Julgar o confronto** | **Morfeu**, cego ao mapa | Verificação independente é o papel dele, e ele não apurou nada |
| **Escrever o canônico** | **Ícaro**, a partir do veredito | Documentação é o papel dele |
| **Commitar** | Skinner | — |

**O Mestre não cola nada.** Ele decide se a rodada acontece e o que ela pergunta; o transporte é do
Skinner, como em qualquer tarefa aprovada (`EQUIPE.md`, "A regra dura").

**Isto é a exceção declarada ao `Skinner/APRENDIZADOS.md` #13**, que manda não abrir subagente interno
sem o Mestre pedir. A exceção vale **só para a etapa de apurar de uma rodada de pesquisa**, e o motivo
é o que está na tabela: a tarefa exige um agente **sem contexto do projeto**, que é exatamente o que a
equipe nomeada não pode ser. Fora dessa etapa, a #13 vale inteira.

**Onde vale o par cego:** rodada com dado numérico de catálogo — foi assim em **R2**, **R3**, **R4** e
**R8**. É onde modelo alucina com mais confiança, e a divergência entre dois territórios aparece na
comparação por um custo baixo. Rodada conceitual ou de fórmula pode ir com um pesquisador só, com
nível de fonte declarado.

**Gravação incremental (lição da R8, 03/09/2026):** *criar o arquivo de saída vazio no começo **não é**
gravação incremental.* Na R8 os dois pesquisadores criaram o arquivo, apuraram, e morreram num limite
de uso com tudo ainda no raciocínio — o disco tinha só o cabeçalho. A instrução que funciona é
**fecha uma questão, grava a questão**, com achado parcial marcado `PARCIAL`.

---

## Par cego — como a duplicação roda (18/08/2026)

Rodar a mesma rodada duas vezes **com o mesmo prompt** não produz independência: dois agentes com o mesmo enunciado e o mesmo universo de fontes chegam ao mesmo catálogo por caminhos diferentes, concordam, e a concordância não prova nada. Erro de modelo é correlacionado.

A duplicação roda em **par cego**: mesmo enunciado bruto, **territórios de fonte que não se sobrepõem**.

| Rodada | Território A | Território B |
|---|---|---|
| **R2** | literatura e norma — Kienzle/Victor, DIN 6584, ASM Handbook, Machinery's Handbook, artigos com DOI, teses | formação técnica de fabricante — guias, tabelas de `kc` e fórmulas de potência publicadas por Sandvik Coromant, Seco, Walter, Mitsubishi, Kennametal |
| **R3** | norma e literatura — ISO 513, ISO 3685, ASM Handbook, Machinery's Handbook, artigos de revestimento PVD/CVD | catálogo de fabricante — Sandvik, Kennametal, Iscar, Seco, Walter, OSG, Guhring, Mitsubishi, Harvey |
| **R4** | handbook e literatura — Machinery's Handbook, ASM, instituto técnico, artigos revisados por pares | tabelas de *speeds & feeds* oficiais de fabricante |

**Teste do território:** se os dois puderem citar a mesma página, a divisão está errada e o confronto não vale.

**Regra de lacuna:** número que só existe fora do próprio território vira `LACUNA` declarada, com a fonte que teria o dado nomeada. Nunca preenchido por conhecimento do modelo.

**Anonimato do juiz:** sorteio decide qual território grava `RESPOSTA_R{n}.md` e qual grava `RESPOSTA_R{n}_B.md`. O mapa fica em `_procedencia/MAPA_R{n}.md`, que o validador não lê — juiz que sabe qual fonte é a mais prestigiada desempata pelo prestígio, não pela evidência. Revelado depois do veredito, entra na seção **Origem** do canônico.

**No confronto (G8):** convergência entre fontes do **mesmo** território não sobe a confiança — é uma fonte só.

R5 e R6 seguem com um pesquisador só, com território amplo e **nível de fonte declarado** (1 norma · 2 handbook · 3 artigo revisado · 4 catálogo). Se a validação apontar número sem fonte, dispara-se um segundo território **apenas para os itens bloqueados**.

O procedimento de disparo está na skill global `par-cego-pesquisa`.

---

## O que é um "documento canônico"

O problema-raiz que esta pesquisa resolve não é falta de informação — é **excesso de fontes divergentes**. O sistema anterior tem três regras de `ap` em acabamento, duas fórmulas de afinamento de cavaco e quatro faixas de diâmetro, todas legítimas na origem, nenhuma declarada superior.

Um documento canônico é a fonte única por assunto: declara precedência, traz fonte em toda constante, prefere a fórmula à constante, e declara o que não sabe.

**O modelo completo e as obrigações estão em `../canonicos/LEIA-ME.md`** — não duplicados aqui, pelo mesmo motivo que esta etapa existe.

Cada canônico cita a rodada que o originou, e cada número cita a fonte externa que o sustenta.

---

## Fechamento

Com os 6 canônicos escritos, o dossiê auditado deixa de ser um levantamento com pendências e passa a ser um conjunto de especificações executáveis. A partir daí a Fase 2 — o documento de escopo agnóstico — tem base para descrever cada função sem herdar nenhuma ambiguidade do sistema atual.
