# HANDOFF — Calculadora de Parâmetros (Fenix)

> **Foi o ponto de entrada desta pasta até 30/08/2026.** Quem chega hoje entra pelo `ESTADO.md` — ver a nota abaixo.

> **Congelado em 30/08/2026 — não é mais o estado do projeto.** O que vale hoje é
> [`ESTADO.md`](../ESTADO.md), na raiz do repositório: fase, decisões e próximo passo. Este arquivo
> continua como **log histórico** das sessões até 30/08 — as seções numeradas são registro fechado e
> não se editam. O cabeçalho abaixo descreve 30/08; a "próxima ação" que ele anuncia (correção das
> folhas `.dc.html` e a auditoria F2) **já fechou**, em `fb79117` e `5fe14b9`.

| | |
|---|---|
| **Projeto** | Fenix — sistema novo de cálculo de parâmetros de corte CNC |
| **Pasta de trabalho** | `C:\Users\USUARIO\Desktop\Projetos\Fenix\Docs_inicial` |
| **Última atualização** | 30/08/2026 |
| **Fase atual** | **A régua do produto foi revisada item a item pelo Mestre (seções 48–49): 30 itens aprovados, 1 reprovado, 7 comentários mudaram o conteúdo do que foi aprovado. A procedência saiu inteira do produto — marca de origem no campo, "de onde veio o número", fonte, a palavra `extrapolado`, a tela de procedência e a margem de ±15–25% —, removida de cinco documentos e commitada em `2783a6b`. D2 e D5 invertidas, D1 e D7 alteradas, D10/D11/D12 criadas; nasceu a área "Configurações" (`mvp/ESCOPO_CONFIGURACOES.md`); `histórico` e `favoritos` entram no MVP; a trilha (D4) e o perfil de máquina foram para `construcao/FUNCOES_FUTURAS.md`. Três alertas morreram: piso de esfregamento, produtividade × potência, rotação acima da máquina. O produto é uma calculadora — resultados e a gaveta de instrução por parâmetro, sem procedência.** Antes: **D6–D9 desceram para o `DESIGN_SYSTEM_FENIX.md` (seção 47) — a régua está completa e escrita nos dois lugares certos: o gabarito diz contra o quê medir, o design system diz o que vale. Entraram o formato numérico na §2.8, a regra "nasce recolhido" na §4.4, o cartão de resultado em duas alturas na §4.6 (nova), os tokens de alvo na §3 e 6 caixas no checklist §9. D6 já estava lá — o defeito era o protótipo não obedecer. Nenhum `.dc.html` tocado; o protocolo está pronto para F1.5.** Antes: **A frente de tela reabriu sob um processo novo (seção 46). O protótipo seguia não conforme depois dos 44 achados aplicados, e o Mestre trocou a correção item a item por um `protocolo-convergencia-prototipo.html` de 10 fases (G0 → F8). `G0 = C` (spec ambígua *e* spec clara ignorada). `F1` concluído: nasceu o `construcao/prototipo/GABARITO_PROTOTIPO.md` v1.1, régua única, que fixa a precedência entre documentos e separa camada 1 (mecânica, auditável por comando) de camada 2 (julgamento). A Q1 trouxe 4 defeitos que nenhum dos 44 achados tinha pegado — texto demais, separador de milhar, resultado sem destaque, DS simples demais — e o DS foi revisto contra o canônico do ToolOptimizer, gerando D6–D9. Estamos entre `F1` e `F1.5`.** Antes: **Item 29 resolvido pelo protótipo, não pelo DS (seção 45) — o Mestre escolheu re-renderizar os 13 chips de estado das 6 folhas em vez de documentar o par branco/`-ink` no DS. Os chips passaram de fundo sólido `-ink` + texto branco para a tríade da rampa §2.4: fundo `-bg`, texto e borda `-ink` de 1px (~6,5:1, passa AA). Re-semeado e republicado no mesmo artifact; zero `#FFFFFF` fora dos tokens. A frente de tela fecha — resta a revisão de texto/cópia.** Antes: **Fatia 2 do plano do protótipo aplicada e republicada (seção 44) — os itens 15–28 nas 6 folhas `.dc.html` (`Tablet.dc.html` é nova) + `canvas.json`, em 3 rodadas, no mesmo artifact. Trilha por controle, procedência universal (~50 números auditáveis), desktop fluido + artboard de tablet, `S`/`F` nos heróis, "fixar este resultado", "o que mexer" na vertical, blocos recolhidos, Z3 próprio, retorno dos dados do material, `ap` com marca de estado, `kc1.1`/`mc` no lado do resultado, celular reordenado pelo `MVP` §2.3. As 3 bifurcações decididas pelo Mestre (§44.1). Verificado por `grep`, sem clipping/overflow.** Antes: **Fatia 1 aplicada e republicada (seção 43) — as 5 folhas re-semeadas com o exemplo do balanço (`L45`, `L/D` 4,5, gatilho 1a como 2ª condição) e os 14 ajustes mecânicos.** Antes: **Plano de revisão do protótipo escrito, aprovado e executado — `planos/executados/PLANO_REVISAO_PROTOTIPO_2026-08-29.md` (seções 42–45). 29 itens em 2 fatias.** Antes: **`Docs_inicial/` reorganizada por ciclo de vida (seção 41).** Antes: **Skill `reconciliacao-documentacao` criada e rodada: a R7 chegou ao canônico e ao brief, 3 `BLOQUEIA` → 0 (seção 40).** Antes: **R7 fechou a `L4`, e o alerta canônico passou do esfregamento para o balanço (seções 38 e 39).** Antes: exemplo canônico do §7.6 refeito (seção 36). Antes dele: **protótipo visual criticado (seção 35)** — duas rodadas de crítica (`relatorios/CRITICA_PROTOTIPO_PAINEL_2026-08-28.md` e `ANALISE_CRITICAS_MESTRE_PAINEL_2026-08-28.md`), 5 decisões (§35.3), plano de revisão. Antes disso: protótipo publicado (seção 34), brief + design system (seção 33), reconciliação da auditoria 5/5 (seções 30 e 32), escopo funcional 8/8, 6/6 canônicos, MVP e ADR-0001. |
| **Bloqueio ativo** | **Resolvido em 29/08/2026 (§39).** A R7 derrubou o gatilho 1 do `MVP` §9.2 e re-travou a frente de tela (§38); o Mestre decidiu, e o exemplo canônico passou a encenar o **gatilho 5 (balanço)** — limiar publicado, efeito derivável e direção alcançável. `MVP` e `E4` já corrigidos. **A tela volta a estar desbloqueada, com um contrato novo.** Lacunas de **acesso** seguem: `n` de Taylor, `Fr/Fc` (Altintas), `Deq/D` por nº de canais >4 (Kops e Vo) — sem elas, vida em número e deflexão em µm ficam fora do MVP, por decisão já registrada. |
| **Próxima ação** | **Fase de correção das seis folhas `.dc.html`** (seções 48–49) — planejada por outra sessão em `relatorios/PLANO_CORRECAO_PROTOTIPO.md`; a folha `Procedencia.dc.html` deixa de existir. `F1.5` já fechou: o baseline está travado na tag `baseline-prototipo-f2` (commit `7839cae`). Depois **`F2`**, a auditoria fresh-context contra o `GABARITO_PROTOTIPO.md`, **só na camada 1** (decisão do Mestre, Q5). O escopo da área "Configurações" (materiais + ferramentas) é tarefa separada já pedida pelo Mestre. Seguem abertas a **Q3** (comparar duas condições, T12) e a **Q4** (densidade, T1); a **Q2** (faixa recomendada da trilha) foi adiada para sessão própria do Mestre e **até lá a trilha não se desenha**. Pendência só dele: marcar `G0` e `F1` no painel do protocolo (`localStorage`). Antes: (a) **Tela: fechada** (§45 — item 29 resolvido no protótipo, chips na rampa §2.4). Resta a **revisão de texto/cópia/alertas** das 6 folhas (sessão dedicada — texto não é da etapa de desenho, §43.3); altura de crista **fica fora** (decisão de 29/08, sem valor em documento). (b) **Código:** scaffold (`package.json`, núcleo TS isolado, Vite, Vitest, `src/data/` um módulo por canônico com `fonte`+`confianca`, as 2 invariantes do MVP §13.2 como teste falhando) → `/to-tickets` sobre a fatia vertical da Q3 (aço 1045 + fresa de topo, entrada→cálculo→resultado), **que ainda pede o "pode seguir" do Mestre**. Independente: acesso aos 3 documentos; Parte 3 do bloco (16 perguntas). |

> ⚠️ **Fronteira de pastas.** Todo trabalho do Fenix mora aqui. O repositório `ToolOptimizerCNC` é **fonte de consulta apenas** — nunca escrever nada lá. O sistema novo não deve herdar arquivo, estrutura nem nome do antigo.

---

## 1. Instruções de abertura — o que fazer agora

Quando o Mestre disser "leia os documentos e me oriente" (ou equivalente):

1. **Leia, nesta ordem:** este arquivo → `pesquisa/00_INDICE_E_PROTOCOLO.md` → a seção "Estado das rodadas" abaixo. (`README.md` é para quem chega de fora e quer entender o projeto; se você já leu este handoff, não precisa dele.)
2. **Resuma em no máximo 3 linhas:** onde parou e qual é a próxima rodada.
3. **Entregue o prompt da próxima rodada pendente** — diga o nome do arquivo e instrua a colar o bloco entre as linhas `═══`. Não reescreva o prompt; ele já está pronto e revisado.
4. **Espere a resposta da pesquisa.** Não avance sozinho.

Se o Mestre trouxer o retorno de uma pesquisa, siga o **Ciclo Operacional** (seção 5).

**Não varra o repositório do sistema antigo.** A leitura de código e documentos já foi feita e está consolidada no dossiê auditado. Só consulte o repo para conferir um fato pontual — varrer de novo gasta contexto e arrisca reintroduzir as contradições que a auditoria resolveu.

**Não leia `_arquivo/` de rotina.** É plano/relatório fechado e dado bruto já absorvido — isolado de
propósito pra não competir por atenção com o documento vivo. Só entre lá se estiver procurando
procedência de uma decisão antiga ou o Mestre pedir. **Se um caminho citado num documento antigo
(sessão passada, `LESSONS.md`, relatório) não existir mais**, ele foi movido — confira
`INDICE_DE_ARQUIVOS.md` antes de perguntar ou de recriar o arquivo.

---

## 2. Contexto — de onde isso veio

### O problema

Existe um sistema em produção, **ToolOptimizer CNC** (`C:\Users\USUARIO\Desktop\Projetos\ToolOptimizerCNC`), que calcula parâmetros de corte para fresamento CNC. Ele funciona, mas cresceu com documentação contraditória: três regras diferentes para a mesma profundidade de corte, duas fórmulas para o mesmo efeito de afinamento de cavaco, quatro faixas de diâmetro, vários alertas sem fonte nenhuma.

O Mestre está construindo o **Fenix** e não quer herdar essa ambiguidade. Antes de escrever qualquer código, quer cada número com fonte declarada.

### O caminho até aqui

Foi produzido um levantamento completo do sistema existente — o **dossiê** — que registrou 16 conflitos entre documentos, 4 valores sem fonte nenhuma e 7 defeitos de código, sem resolver nada por conta própria.

Depois veio uma **auditoria** desse dossiê, que releu os documentos de origem completos, procurou decisão de projeto datada para cada conflito, pesquisou literatura externa onde faltava fonte, e conferiu o código linha a linha.

**Resultado da auditoria:** 14 dos 16 conflitos resolvidos por evidência documental. 2 continuam abertos. 7 defeitos de código confirmados. 6 pontos de atenção novos.

### Onde estamos

As 2 perguntas abertas e as lacunas de fonte não se resolvem lendo mais documento interno — precisam de **evidência externa**: catálogo de fabricante, handbook, norma. Daí as 6 rodadas de pesquisa da subpasta `pesquisa/`.

O produto final não é a pesquisa em si: são os **documentos canônicos** — a fonte única por assunto, cada número com fórmula, fonte e nível de confiança, prontos para virar código.

---

## 3. As etapas

| Etapa | O que é | Estado |
|---|---|---|
| **Auditoria** | Resolver o que a evidência permite no levantamento, formalizar como pergunta o que exige decisão do Mestre | ✅ **Concluída** |
| **Pesquisa** | 6 rodadas de deep research para fechar as lacunas que exigem fonte externa | ✅ **Apuração encerrada** — R1–R5 validadas · R6 fechada com lacuna declarada |
| **Canônicos** | O número, com fórmula e fonte, por assunto de cálculo | 🔄 **5 de 6** — geometria, ferramentas, limites, motor de cálculo e velocidades/avanços escritos |
| **Escopo funcional** | A função, o comportamento e a regra — sem nenhum vestígio do sistema anterior | 🔄 **6 de 8** — E0, E1, E2, E3, E5 e E6 escritos |
| **MVP** | O corte do primeiro produto funcional | ✅ **Escrito e reconciliado** — revisão de 26/08 na §0.4 |
| **Reconciliação JTBD × escopo** | Resolver os 7 pontos e fechar o vocabulário | ✅ **Concluída 26/08** — restam 3 lacunas de dado, não de escopo |

### A correção de rota de 17/08

O plano original tratava "escopo agnóstico" como uma fase única, bloqueada por P1 e P2. **Estava errado em dois pontos:**

1. Os canônicos cobrem só o **motor de cálculo**. Entradas, resultados, indicadores, interação, gestão de dados e configuração — a maior parte do produto — não estavam cobertos por documento nenhum.
2. Essa parte **não depende da pesquisa**. P1 e P2 são numéricas; comportamento e fluxo não esperam por elas.

**Consequência:** as duas frentes correm em paralelo. Onde um documento de escopo precisar de um número ainda em validação, ele traz o marcador `⧗ AGUARDA R{n}` e fica completo em estrutura — o valor entra depois sem reescrita.

**Regra que continua valendo:** nenhuma função nova é inventada. O escopo descreve o que o material auditado registra, limpo de tudo que amarra ao sistema anterior.

---

## 4. Mapa de arquivos

A pasta tem **três camadas com pesos diferentes**. Confundi-las é o erro mais caro possível aqui.

| Camada | Onde | Vale como especificação? |
|---|---|---|
| **Função** — o quê e por quê | `escopo/` | ✅ **Sim — é a fonte** |
| **Número** — quanto, com fonte | `canonicos/` | ✅ **Sim — é a fonte** |
| **Primeiro produto** | `mvp/` | ✅ **Sim — é a fonte** |
| **Construção** — tecnologia, ordem, tela | `construcao/` · `../docs/adr/` | ⚠️ Fonte só de construção |
| **Processo** | `pesquisa/` | ⚠️ Insumo, não fonte |
| **Problema** — JTBD, entrevista, arquivos da fábrica | `../inicio_fenix/` | ⚠️ Insumo — **e em conflito aberto com o escopo** |

`escopo/`, `canonicos/` e `mvp/` juntos formam a especificação completa: um descreve a função, o outro fornece o valor que ela usa, o terceiro define o corte do primeiro produto. Nenhum dos três cita implementação nem o sistema anterior.

`pesquisa/` explica *por que* um número é o que é. Consulta, nunca cópia.

> **Correção de 26/08/2026.** Versões anteriores deste mapa citavam uma pasta `_referencia/` como camada de proveniência. **Ela não existe e nunca foi versionada.** O dossiê e sua auditoria não estão no repositório; a proveniência que existe está em `pesquisa/` e em `pesquisa/_procedencia/`. Onde um prompt citar numeração do dossiê (§10.13, §5.16), a referência **não é resolvível dentro deste repositório**.

### Raiz (`Docs_inicial/`)

| Arquivo | O que é |
|---|---|
| `README.md` | O que é o Fenix, estado e como navegar. Entrada para quem chega de fora. |
| **`HANDOFF.md`** | Este arquivo. Estado operacional e protocolo de trabalho. |
| `INDICE_DE_ARQUIVOS.md` | Mapa de redirecionamento — não catálogo. Consulte quando um caminho citado por documento antigo não existir mais. |

### `referencia/`, `decisoes/`, `planos/`, `relatorios/`, `_arquivo/` — reorganizadas em 29/08/2026

Cada pasta tem seu próprio `LEIA-ME.md` com o critério de entrada e saída — não duplicado aqui.
Resumo: `referencia/` = glossário e lições, vivos. `decisoes/` = registro de decisão do Mestre.
`planos/pendentes/` = ação não executada (hoje: a auditoria de prontidão de 28/08 e seu plano de 6
passos). `planos/executados/` = plano fechado, ainda referência recente. `relatorios/` = auditoria e
crítica cujo achado ainda guia trabalho aberto. `_arquivo/` = isolado, não lido de rotina — plano,
relatório e dado bruto já absorvidos em outro documento.

### `escopo/` — a função

| Arquivo | O que é |
|---|---|
| `LEIA-ME.md` | Os documentos previstos, a regra de escrita e o que depende de pesquisa. |
| **`E0_PRINCIPIO_DA_CALCULADORA_AGNOSTICA.md`** | ✅ **escrito** — as duas camadas. **Vence todos os demais documentos do projeto.** Traz três conflitos (C1–C3) e quatro perguntas (Q1–Q4) **ainda abertos** |
| **`E1_DOMINIO_E_CATALOGO.md`** | ✅ **escrito** — famílias de usinagem, catálogo de ferramentas, substratos, revestimento, materiais e operações. Traz Q17–Q21 |
| **`E2_ENTRADAS_E_CONFIGURACAO.md`** | ✅ **escrito** — campos, faixas e envelope, validação em três naturezas, controles de corte, perfil de máquina, fator de segurança e preferências. Traz Q22–Q26 |
| `E3_RESULTADOS_E_APRESENTACAO.md` | o que o sistema entrega e como apresenta |
| `E4_INDICADORES_E_SEGURANCA.md` | semáforo, alertas, bloqueios, índices |
| `E5_INTERACAO_E_FLUXO.md` | ✅ **escrito** — painel, ordem, cálculo, edição, ajuda, modo rápido, estados |
| `E6_DADOS_DO_USUARIO.md` | histórico, favoritos, biblioteca, importar e exportar |
| `E7_ESCOPO_E_FRONTEIRAS.md` | futuro com motivo, descartado com motivo, decisão pendente |

### `canonicos/` — o número

| Arquivo | O que é |
|---|---|
| `LEIA-ME.md` | Os 6 canônicos previstos, o modelo e as obrigações de cada um. |
| `CANONICO_*.md` | Escritos conforme as pesquisas retornam. |

### `mvp/` — o primeiro produto

| Arquivo | O que é |
|---|---|
| `MVP_CALCULADORA_PARAMETROS.md` | A especificação completa do primeiro produto funcional. Declara a própria precedência na §0.1 e registra dez divergências contra o registro anterior na §0.3. |

### `construcao/` — tecnologia, ordem e tela

| Arquivo | O que é |
|---|---|
| `QUESTOES_ABERTAS_CONSTRUCAO.md` | Q1 fechada (ADR-0001). Q2, Q3 e Q4 abertas — **não travam nada**. |
| `../docs/adr/0001-plataforma-e-stack.md` | A stack decidida. |
| `BRIEF_DESIGN_INTERFACE.md` | O brief de design (seção 33). Problema, pessoa, inventário, R1–R15, T1–T12, §11 vocabulário, §12 anti-requisitos. Não decide layout. |
| `DESIGN_SYSTEM_FENIX.md` | O design system, tema claro (seção 33). Tokens, rampa de estado única, §9 checklist, §7 e §8 do que não veio do ToolOptimizer. |
| `prototipo/` | O protótipo visual (seção 34). 5 `.dc.html` + `canvas.json` = a fonte; `painel-fenix.html` = build. Publicado como artifact. |

A crítica do protótipo (seção 35) — independente e do Mestre — mudou para `relatorios/` na
reorganização de 29/08: são relatório, não decisão de construção. Ver `relatorios/` acima.

### `../inicio_fenix/` — o problema

| Arquivo | O que é |
|---|---|
| `JTBD_O_PROBLEMA.md` | O problema antes da solução, reescrito em 26/08 sobre entrevista com fresador CNC de fábrica. |
| `ATUALIZACAO_NECESSARIA.md` | Os **sete pontos** em que o JTBD contradiz o escopo e o MVP. Registrado, não resolvido. |
| `VERIFICACAO_DA_ATUALIZACAO.md` | A conferência desses sete pontos contra o texto real dos documentos, mais três achados que o registro não menciona. |
| `referencia_fabrica/` | Três arquivos reais de parâmetros de produção. É a anatomia do concorrente real. |

> **O dossiê e sua auditoria não estão neste repositório.** A numeração citada nos prompts de pesquisa (§10.13, §5.16, etc.) aponta para um documento que não foi versionado aqui.

### `pesquisa/` — processo

| Arquivo | O que é |
|---|---|
| `00_INDICE_E_PROTOCOLO.md` | As 6 rodadas, dependências, ordem de execução, e o que é um documento canônico. |
| `R1_GEOMETRIA_DE_CORTE.md` | Prompt: `ap` em acabamento, faixa de diâmetro, multiplicadores geométricos. **Responde P1 e P2.** |
| `R2_MOTOR_DE_CALCULO.md` | Prompt: fórmula de afinamento de cavaco, qual espessura entra no Kienzle, constantes por material. |
| `R3_FERRAMENTAS_E_SUBSTRATOS.md` | Prompt: matriz tipo × substrato, premissa "substrato é commodity", granularidade do catálogo. |
| `R4_VELOCIDADES_E_AVANCOS.md` | Prompt: tabelas de `Vc` e `fz`, janela de tolerância em torno do recomendado. |
| `R5_LIMITES_E_ALERTAS.md` | Prompt: `ae/D` mínimo, janela de `Vc`, `L/D` por família, referências de produtividade. |
| `R6_RIGIDEZ_DEFLEXAO_VIDA.md` | Prompt: constantes de deflexão, expoente de Taylor, refrigeração interna. |
| `RESPOSTA_R*.md` | Retornos crus das pesquisas, conforme chegarem. Nunca editados — são o registro de procedência. |
| `PROMPT_R{n}_PARA_COLAR.md` | Só o bloco do prompt, sem cabeçalho — gerado sob demanda para o Mestre colar na ferramenta de pesquisa. Descartável. |
| `_descartado/` | Retornos incompletos ou fora de protocolo, retirados do fluxo. **Não são insumo.** Ficam só como registro. |

---

## 5. Ciclo Operacional

```
1. Agente entrega o prompt da rodada pendente
2. Mestre roda a deep research e traz o retorno
3. Agente confere, escreve o canônico, atualiza este HANDOFF
4. Agente entrega o prompt da próxima rodada
   └── repete até as 6 fecharem
```

> **Mudança de 17/08/2026 — o ciclo passou a rodar em sessões separadas.** O Mestre não roda mais a deep research à mão:
>
> | Sessão | Papel |
> |---|---|
> | orquestradora | dispara a rodada, escreve o canônico, atualiza este arquivo |
> | `agente_pesquisa_1` | executa o prompt da rodada, grava `RESPOSTA_R{n}.md` cru |
> | `agente_pesquisa_2` | **só em R2, R3 e R4** — mesmo enunciado, **território de fonte diferente**, sem contato com o 1º, grava `RESPOSTA_R{n}_B.md` |
> | `agente_validacao_1` | audita o(s) retorno(s) pela skill `validacao-pesquisa-fenix`, grava `VALIDACAO_R{n}.md` |
>
> O passo 3b ("confira antes de aceitar") virou a skill de validação, em sessão separada — quem pesquisou não audita o próprio retorno.
>
> **Duplicação em R2, R3 e R4** (decisão de 17/08): são as três rodadas que dependem de dado numérico de catálogo, onde o modelo alucina com mais confiança. O validador consegue conferir se a fonte existe, mas não se o número é o certo — um valor plausível com citação real passa. Dois retornos independentes pegam isso por divergência (portão G8 da skill). R1 já fechou; R5 e R6 são fórmula e limite, não tabela de catálogo, e seguem com um pesquisador só.
>
> **Regra do confronto:** divergência nunca vira média. Ou uma fonte vence com motivo declarado, ou vira faixa, ou vira lacuna.
>
> **Cadência escolhida:** loop automático — a rodada seguinte dispara sem esperar autorização. O loop para em veredito `REPROVADO`.

> **Correção de 18/08/2026 — par cego, e a R2 volta para o fluxo automático.** Duas mudanças sobre o registro acima:
>
> **1. A R2 não é mais rodada à mão.** A nota anterior dizia que o Mestre a executaria fora do esquema de agentes. Ele não reconheceu essa decisão como sua; a R2 entra no mesmo fluxo das demais. O `PROMPT_R2_PARA_COLAR.md` continua servindo como registro, mas não é mais o caminho de execução.
>
> **2. "Mesmo prompt" nos dois pesquisadores era o ponto fraco do método.** Dois agentes com o mesmo enunciado e o mesmo universo de fontes têm **erro correlacionado**: chegam ao mesmo catálogo por caminhos diferentes, concordam, e a concordância não prova nada. Contexto isolado não corrige isso — modelo igual com pergunta igual erra igual.
>
> A duplicação passa a ser **par cego**: mesmo enunciado bruto, **territórios de fonte que não se sobrepõem**, e um juiz que não sabe qual retorno veio de qual território.
>
> | Rodada | Território A | Território B |
> |---|---|---|
> | **R2** | literatura e norma: Kienzle/Victor, DIN 6584, ASM Handbook, Machinery's Handbook, artigos com DOI | formação técnica de fabricante: guias e tabelas de `kc` publicadas por Sandvik, Seco, Walter, Mitsubishi, Kennametal |
> | **R3** | norma e literatura: ISO 513, ISO 3685, ASM Handbook, Machinery's Handbook, artigos de revestimento | catálogo de fabricante: Sandvik, Kennametal, Iscar, Seco, Walter, OSG, Guhring, Mitsubishi, Harvey |
> | **R4** | handbook e literatura: Machinery's Handbook, ASM, instituto técnico, artigos | tabelas de *speeds & feeds* oficiais de fabricante |
>
> **Anonimato do juiz:** sorteio decide qual território grava `RESPOSTA_R{n}.md` e qual grava `RESPOSTA_R{n}_B.md`. O mapa fica em `pesquisa/_procedencia/MAPA_R{n}.md`, que o validador **não lê** — se ele souber qual fonte é a mais prestigiada, desempata pelo prestígio em vez de pela evidência. O mapa é revelado depois do veredito e entra na seção **Origem** do canônico.
>
> **Regra nova do confronto (soma-se à de cima):** convergência entre fontes do **mesmo** território não sobe a confiança — é uma fonte só.
>
> **Cadência corrigida:** o loop **não para** em `REPROVADO`. Ele re-roda a rodada uma vez, ajustando o briefing só nos itens que bloquearam; se reprovar de novo, o canônico sai com o item na §4 Lacunas declaradas, e o veredito fica registrado. Lacuna declarada é resultado válido; inventar número não é.
>
> O procedimento de disparo está na skill global `par-cego-pesquisa`.

### Passo 3 em detalhe — o que fazer ao receber um retorno

**a) Salve o retorno cru** como `pesquisa/RESPOSTA_R{n}.md`, sem editar. É o registro de procedência.

**b) Confira antes de aceitar.** Não trate o retorno como verdade automática:
- Toda constante tem fonte citável? Fonte que não dá para verificar não é fonte.
- Os números batem com o que o dossiê auditado já registrou? Divergência é achado, não erro a esconder.
- O pesquisador respondeu o que foi perguntado ou desviou para o que era mais fácil de achar?
- Onde ele marcou `CONSENSO`, existem mesmo três fontes independentes, ou três páginas citando a mesma origem?
- **Sinal de alerta:** valor redondo repetido em várias linhas (como `mc = 0,20` em cinco materiais) é assinatura de preenchimento por default, não de dado medido.

**c) Escreva o canônico** conforme o modelo de `canonicos/LEIA-ME.md`, salvando em `canonicos/` com o nome indicado no rodapé do prompt. **O canônico nasce limpo:** não cita arquivo, módulo, tela nem nome interno de projeto nenhum — descreve a regra, não onde ela mora.

**d) Atualize este arquivo:** a tabela de estado da seção 7, e a data no topo.

**e) Reporte ao Mestre em poucas linhas:** o que a pesquisa resolveu, o que ficou sem base, e se algum resultado contradiz decisão anterior. Se contradisser, diga com todas as letras — o Mestre prefere saber.

**f) Entregue o prompt da próxima rodada.**

### Se um retorno for fraco

Acontece. Se vier raso, sem fonte, ou respondendo outra coisa: **diga isso** e ofereça duas saídas — refazer a rodada com o prompt ajustado, ou registrar a lacuna no canônico e seguir. A escolha é do Mestre. Não remende um retorno ruim escrevendo o canônico com o que você acha que seria a resposta.

---

## 6. Como o Fenix se desprende do sistema anterior

O projeto novo não pode nascer amarrado ao antigo. Isso acontece em **duas etapas com momentos diferentes** — antecipar a segunda quebra a primeira.

**Etapa 1 — separação física (feita).** Levantamento e auditoria ficaram **fora deste repositório**, marcados como proveniência. Eles citam arquivo, componente e versão do sistema anterior **de propósito**: é o que torna cada resolução verificável. Apagar essas citações destruiria a rastreabilidade e quebraria os prompts de pesquisa, que apontam para a numeração de lá — **e é por isso que a numeração citada nos prompts (§10.13, §5.16) não resolve para nada aqui dentro.**

**Etapa 2 — nascimento limpo (em andamento).** Os documentos que **valem como especificação** nascem sem nenhum vestígio: os canônicos, agora, e o escopo funcional agnóstico na Fase 2. Neles não entra nome de arquivo, módulo, tela, tecnologia ou versão. Só a regra, a condição de validade e a fonte técnica externa.

**A regra prática:** um número atravessa a fronteira por ter passado pela auditoria ou pela pesquisa — **nunca por já existir**. Se você se pegar escrevendo "o sistema anterior fazia assim, então mantemos", pare: isso é herança por inércia, exatamente o que esta etapa existe para impedir.

**O modelo do canônico e suas obrigações estão em `canonicos/LEIA-ME.md`.**

---

## 7. Estado das rodadas

| Rodada | Assunto | Status | Retorno | Canônico |
|---|---|---|---|---|
| **R1** | Geometria de corte | ✅ Canônico escrito | `RESPOSTA_R1.md` | `CANONICO_GEOMETRIA_DE_CORTE.md` |
| **R2** | Motor de cálculo | ✅ **Validada + verificada** (20/08) — **sem bloqueios** | `RESPOSTA_R2.md` + `_B.md` + `RESPOSTA_R2V.md` + `VALIDACAO_R2.md` + `VALIDACAO_R2V2.md` | ✅ **`CANONICO_MOTOR_DE_CALCULO.md`** — escrito 26/08 |
| **R3** | Ferramentas e substratos | ✅ Canônico escrito | `RESPOSTA_R3.md` + `_B.md` + `VALIDACAO_R3.md` (APROVADO COM RESSALVAS) | `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` |
| **R4** | Velocidades e avanços | ✅ **Validada 23/08** — `APROVADO COM RESSALVAS`, 0 bloqueios | `RESPOSTA_R4.md` + `_B.md` + `VALIDACAO_R4.md` | ✅ **`CANONICO_VELOCIDADES_E_AVANCOS.md`** — escrito 26/08 |
| **R5** | Limites e alertas | ✅ Canônico escrito | `RESPOSTA_R5.md` + `VALIDACAO_R5.md` (APROVADO COM RESSALVAS) | `CANONICO_LIMITES_E_ALERTAS.md` |
| **R6** | Rigidez, deflexão e vida | ⚠️ **Apuração encerrada 26/08 com lacuna declarada.** R6-V `REPROVADO` (retornos interrompidos) → R6-V2 `REPROVADO` (fontes atrás de paywall). Duas reprovações = regra de cadência manda fechar o canônico com o item na §4 | `RESPOSTA_R6.md` + `VALIDACAO_R6.md` + `RESPOSTA_R6V.md` + `_B.md` + `VALIDACAO_R6V.md` + `RESPOSTA_R6V2.md` + `VALIDACAO_R6V2.md` | ✅ **`CANONICO_DEFLEXAO_E_VIDA.md`** — escrito 26/08 |

**Legenda:** ⬜ Pendente · 🔄 Em pesquisa · 📥 Retorno recebido · ✅ Canônico escrito

**Ordem recomendada:** R1 → R3 → R2 → R4 → R5 → R6.
**R1, R3 e R5 não têm dependências** — podem rodar em paralelo.
**Mínimo para fechar os valores numéricos do escopo:** só R1.

### Fechamento da R6 — o que ficou resolvido e o que virou lacuna (26/08/2026)

**Resolvido:**

| Item | Como |
|---|---|
| `E` do metal duro — BLOQUEIA #1, #2 e divergência D-1 | R6-V Q1 entregou tabela por grau, com %Co, granulometria e **método declarado** (ressonância, ISO 3312). Chegou a **580 GPa às cegas** — o mesmo valor da R3, por caminho independente. O rótulo da R3 pode subir de `REFERÊNCIA ÚNICA` para `CONSENSO`. |
| Granulometria afeta `E`? | **Não.** Dois pares de mesmo %Co e grãos diferentes: 624×624 e 547×549. `E` é função do %Co e só dele. |
| Faixa da R3 estreita demais | A 6% Co o valor publicado é **624 GPa**, acima do teto de 610 que a R3 declarava como extrapolação. Corrigir para **≈560–624 GPa** na janela de 6–12% Co. |
| Viga simples × escalonada — BLOQUEIA #6 | **Derivado e conferido nesta casa** (`VALIDACAO_R6V2.md`). O retorno da R6-V2 entregou fórmula errada — faltava um termo; falha o teste de sanidade. A fórmula correta: `δ = (F/3E)·[(L³−L2³)/I1 + L2³/I2]`. Confere com os 59,0% já registrados em D-2. |
| `De/D` — D-2, antes bloqueio | **Rebaixado a ressalva.** No modelo escalonado, a incerteza de `De/D` (0,75–0,85) vale **1% a 14%** enquanto a parte cortante for até metade do balanço — dentro da margem. Só passa a pesar quando a parte cortante domina. `0,80` entra como default declarado. |
| `CANONICO_LIMITES_E_ALERTAS.md` §1.4 | **Errado.** "Diâmetro da haste" **subestima** a deflexão em 1,1% a 59,0%. Trocar pelo modelo escalonado. |

**Lacuna declarada — vai para a §4 do `CANONICO_DEFLEXAO_E_VIDA.md`:**

| Item | Por quê | O que fecharia |
|---|---|---|
| `Fr/Fc` — a força que entorta | Duas rodadas sem um único coeficiente com localizador | Coeficientes `Ktc/Krc/Kte/Kre` em **Altintas, _Manufacturing Automation_** |
| `n` de Taylor e `T_ref` | Duas rodadas vazias; os valores em circulação (0,125 / 0,25) aparecem em material com marca de IA | Machinery's Handbook ou ASM Vol. 16 abertos na tabela |
| `De/D` por nº de canais | **Kops e Vo** apontada por 3 rodadas, nunca aberta | O texto integral do artigo (CIRP Annals) |

> **A causa das duas reprovações é acesso, não ausência.** Em toda a R6-V2 o padrão foi *"artigo identificado, DOI não confirmado"* — o pesquisador achou as referências e não conseguiu abrir nenhuma. Os alvos estão **nomeados**: dois livros e um artigo. Não é mais busca aberta; é obter três documentos.

**Achado a confirmar (barato, e fecha uma pergunta de vez):** a **ISO 3685** talvez cubra só ferramenta de ponta única (torneamento), não fresamento. Se confirmar, o `T_ref` dos catálogos de fresa **não tem norma que o ancore** — e a lacuna passa de "não achamos" para "não existe onde estar", que é resposta definitiva.

**Falha de processo registrada (R6-V):** o par cego não foi cego — os dois retornos declaram o próprio território na primeira linha do arquivo. O sorteio protege o `MAPA_R{n}.md` e não protege o cabeçalho. **Nas próximas rodadas em par cego, gravar o retorno com cabeçalho neutro.**

### Estado dos documentos de escopo

| # | Documento | Status | Aguarda |
|---|---|---|---|
| **E0** | **Princípio da calculadora agnóstica** | ✅ **Reescrito 26/08** | nada. "Camada 2" saiu do vocabulário; C1–C3 e Q1–Q4 **fechados**. Restam A1–A6, que são corte de MVP e lacuna de dado, não ambiguidade |
| **E1** | **Domínio e catálogo** | ✅ **Escrito 26/08** | nada — os valores vieram de R2, R3 e R4, com quatro conjuntos de fragilidade declarada no fim do documento |
| **E2** | **Entradas e configuração** | ✅ **Escrito 26/08** | nada — a faixa de diâmetro veio de R1; o teto do envelope e as faixas das famílias fora do fresamento ficam declarados como fragilidade |
| **E3** | **Resultados e apresentação** | ✅ **Escrito** | nada |
| **E4** | **Indicadores e segurança** | ✅ **Escrito 27/08** | nada — R5 e R6 fecharam. Cinco limiares entram com fragilidade declarada, e dois ⧗ seguem por acesso (deflexão em µm, vida em número) |
| **E5** | **Interação e fluxo** | ✅ **Escrito** | nada |
| **E6** | **Dados do usuário** | ✅ **Escrito** | nada |
| **E7** | **Escopo e fronteiras** | ✅ **Escrito 27/08** | nada — foi o último, como previsto. Consolida descartado · adiado · bloqueado por dado · pendente de decisão, e as 29 perguntas |
| — | **MVP da calculadora** (`mvp/`) | ✅ **Escrito 21/08** | nada — as 6 perguntas foram decididas. Consolida a fatia de MVP de E1, E2 e E4 |

**E5 é a âncora do padrão de escrita** (nível de detalhe C, escolhido em 17/08). Ao escrever os demais, siga a linguagem e a estrutura dele: regra + razão, exemplos de conteúdo em bloco monoespaçado, casos de borda ao fim de cada seção, lacunas marcadas `⚠ NÃO DEFINIDO` com a pergunta formulada e consolidadas ao fim do documento.

### Perguntas acumuladas nos documentos de escopo

**Não devem ser respondidas isoladamente.** Ficam acumulando e vão ao Mestre em bloco, quando os 7 documentos estiverem escritos — decidir caso de borda sem ver os outros gera decisão inconsistente.

| Documento | Perguntas |
|---|---|
| E1 | Q17 – Q21 |
| E2 | Q22 – Q26 |
| E3 | Q5 – Q7 |
| E4 | Q27 – Q29 |
| E5 | Q1 – Q3 (Q4 prejudicada — o modo rápido que a originava não existe mais) |
| E6 | Q8 – Q16 |
| E7 | Q30 |

Total: **29 vivas** — Q1 a Q30, com a Q4 prejudicada. Consolidadas em `escopo/E7_ESCOPO_E_FRONTEIRAS.md` §6.2, e levadas a decisão em `BLOCO_DE_DECISAO.md`. Quatro delas (Q1, Q2, Q5 e
Q7) já têm decisão **no corte do MVP** — a decisão vale para a fatia construída; fora dela a pergunta
continua aberta.

---

## 8. As duas perguntas que bloqueiam a Fase 2

> ✅ **Respondidas por R1 em 17/08/2026 — ver `canonicos/CANONICO_GEOMETRIA_DE_CORTE.md`.** Nenhuma tem resposta em número único; a pesquisa mostrou que a resposta certa depende de condição (tipo de ferramenta, estratégia), não só de `D`. Isso conta como resposta com fonte, não como lacuna — mas abriu uma pergunta nova de produto (ver abaixo).
>
> **Pergunta nova, do Mestre:** a evidência de R1 mostra que `ap` de acabamento recomendado varia 20–40× entre estratégia convencional (parede/perfil, `ap ≈ 0,05×D`) e estratégia HSM/contorno (`ap = 1–2×D`). O sistema precisa de um seletor de estratégia de acabamento antes de recomendar `ap`, ou vocês querem fixar uma estratégia só (convencional) como padrão do produto? **Recomendo fixar convencional como único modo no MVP** — é a prática dominante em moldes com fresa reta/parede, e HSM/contorno exige CAM compatível que foge do escopo atual do Fenix. Essa decisão entra em `E1`/`E2` quando forem escritos.

### P1 — Profundidade axial (`ap`) em acabamento

Três regras concorrentes, todas com origem legítima:

| Regra | Origem | Em Ø10 |
|---|---|---|
| `0,20 × D` | padronização geométrica interna + motor de recomendação | 2,0 mm |
| `0,50 mm fixo` | validação externa contra catálogos + teto do slider + contrato da versão nova | 0,5 mm |
| `0,30 × D` | especificação antiga, hoje sem efeito | 3,0 mm |

Hoje as duas primeiras coexistem no código e o resultado é o **mínimo entre elas** — acima de Ø2,5 mm a regra proporcional nunca é usada. Funciona por acidente de ordem de operações, não por decisão.

O documento mais recente que enxerga o conflito manda **escolher uma fonte de verdade** e não escolhe.

**Responde:** R1, Questão 1.

### P2 — Faixa de diâmetro aceita

O sistema aceita `0,1–200 mm`. As tabelas de parâmetro cobrem só `Ø0,2–16 mm` — acima disso o sistema repete silenciosamente os valores de Ø16. O único plano datado dizia `0,1–100 mm`. Especificações antigas dizem `0,5–30` e `até 32`.

**Dado de campo do Mestre:** o menor diâmetro que ele verificou em uso real é **Ø0,5 mm**.

**Responde:** R1, Questão 2.

---

## 9. Decisões e premissas do Mestre já registradas

Estas moldaram os prompts. **Não são achados de pesquisa — são input dele.** Se um retorno contradisser alguma, avise; não a descarte sozinho.

| # | Decisão / premissa | Onde entra |
|---|---|---|
| D1 | **Fresa de aço rápido é obsoleta** na indústria atual. O HSS sobrevive em broca e macho, não em fresa. Ferramenta de alta tecnologia é metal duro. | R3, Questão 1 |
| D2 | **Substrato de metal duro é commodity** — receita estabelecida, variação mínima entre fornecedores, "como a receita do pão francês". A variável real é o **revestimento**. | R3, Questão 2 |
| D3 | **Para pastilha vale a mesma lógica** — um fator médio resolve. *(Reformulado no prompt como "assumir a classe adequada ao material selecionado", que é mais defensável que média entre classes.)* | R3, Questão 2e |
| D4 | **Critério 80/20:** substrato não determina o resultado. Com o melhor material e parâmetro errado, a ferramenta não dura. A precisão deve ser investida em parâmetro. | R3, fechamento |
| D5 | **Piso prático de diâmetro é Ø0,5 mm** — verificado em campo. | R1, Questão 2b |
| D6 | **Substrato embutido no nome da ferramenta**, não em campo separado — uma entrada de catálogo por variação real de mercado. Decisão de 15/08/2026. | R3, Questão 3 |
| D7 | **Os pares de Kienzle atribuídos a Diniz/Marcondes/Coppini saem** (1020, 1045, 304). Entram os valores de catálogo verificados em fonte primária: `1500/0,21` · `1500/0,21` · `1800/0,21`. Motivo: o livro não é verificável online, e os valores de catálogo têm corroboração acadêmica independente dentro de 3% no ponto de trabalho. Decisão de 20/08/2026. | `VALIDACAO_R2.md` §A7 → `CANONICO_MOTOR_DE_CALCULO.md` |

---

## 10. Regras de trabalho

**Do projeto:**
- **No Invention (fórmula e constante de cálculo).** Nenhuma fórmula, constante do motor de cálculo (Kienzle `kc1.1`/`mc`, Taylor, deflexão, geometria de corte) ou limiar derivado de constante física entra sem fonte citada. Onde falta fonte, declarar o que falta em vez de arbitrar. **Nome, vocabulário, decisão de escopo e limiar de julgamento de produto que não deriva de constante física são escolha do dono do produto e não exigem fonte externa** (decisão do Mestre, 01/09/2026).
- **O sistema recomenda, o operador decide.** Isso é arquitetura, não slogan: recomendação pode ser ignorada, limite físico nunca é ultrapassado em silêncio.
- **Margem de erro do modelo é ±15–25%.** Refinamento abaixo disso é falsa precisão e não justifica campo na tela.
- **Prefira a fórmula à constante.** Regra com variáveis nomeadas sobrevive a mudança de contexto; constante redonda vira dívida.
- **Nada é escrito no repositório `ToolOptimizerCNC`.** Ele é consulta, não destino.

**Da comunicação com o Mestre:**
- Português do Brasil, direto, sem preâmbulo.
- Conclusão primeiro, justificativa depois e só se mudar a decisão.
- Teto de ~15 linhas no chat. Entrega grande vai para arquivo; no chat só o resumo e o caminho.
- Uma pergunta por resposta, sempre com recomendação e critério.
- Número, não adjetivo. "4 rodadas restantes", não "faltam algumas".
- **Revisar não é inventar defeito.** Reportar "ok" quando não há problema; em dúvida, sinalizar, nunca fabricar.

---

## 11. Registro da última sessão — 17/08/2026

**Feito:**
- Auditoria do levantamento concluída — 14 de 16 conflitos resolvidos por evidência datada, 7 defeitos de código confirmados, 6 pontos de atenção novos, 4 valores sem fonte pesquisados em literatura externa.
- Prompt monolítico de pesquisa dividido em 6 rodadas por assunto (R1–R6), cada uma mapeada 1:1 para um canônico.
- Pasta reorganizada em 4 camadas: `escopo/` e `canonicos/` são fonte; `pesquisa/` é processo; `_referencia/` é proveniência.
- Escopo funcional iniciado — E3, E5 e E6 escritos em nível de detalhe C.

**Correções de rota da sessão:**
1. O plano tratava "escopo agnóstico" como fase única bloqueada por P1 e P2. Errado: só os **valores numéricos** dependem da pesquisa. Comportamento, interação e gestão de dados estavam desbloqueados desde o início.
2. Os canônicos cobriam só o motor de cálculo. Entradas, resultados, indicadores, interação e dados — a maior parte do produto — não tinham documento previsto. Daí os 7 documentos de escopo.

**Onde parou:** 3 de 7 documentos de escopo escritos; 0 de 6 rodadas de pesquisa executadas.

**Próximo passo:** escrever E1, E2 e E4 (estrutura completa, com `⧗ AGUARDA R{n}` nos valores em validação), depois E7 por último.

### Reset de 18/08/2026 — retornos parciais retirados do fluxo

O Mestre zerou a lista de retornos, mantendo **apenas R1**, que está completo. Foram movidos para `pesquisa/_descartado/`:

| Arquivo | Por que saiu |
|---|---|
| `RESPOSTA_R3_B.md` | Metade de um par. R3 é rodada duplicada; sem o retorno A não há confronto possível, e um retorno solteiro de rodada duplicada não vira canônico. |
| `NOTA_AUXILIAR_KIENZLE_PRE_R2.md` | Retorno de teste de protocolo, cobertura ~0% da Questão 1 de R2. Não é retorno de rodada. |

**O que continua valendo:** os 6 prompts (R1–R6), o protocolo, `RESPOSTA_R1.md`, o canônico de geometria, os 3 documentos de escopo e o dossiê auditado.

**Mudança de método a partir daqui:** R2 é rodada pelo Mestre à mão, fora do esquema de sessões de agente. A duplicação em R2/R3/R4 continua sendo a recomendação, mas quem decide rodar duas vezes é ele.

**Achado do descarte que não deve se perder:** a nota de Kienzle apontava que `mc = 0,75` para alumínio é erro de transcrição. Isso **não** foi passado para o prompt de R2 de propósito — R2 deve chegar nesse número sozinho. Se o retorno confirmar, é convergência independente; se contradisser, vale reabrir.

---

**Sem commit:** o Fenix ainda não é repositório git. Nada foi escrito no repositório do sistema anterior — ele foi apenas leitura durante toda a sessão.

---

## 12. Definição de pronto

A pesquisa está encerrada quando:

- As 6 rodadas têm retorno salvo e canônico escrito.
- P1 e P2 estão respondidas com fonte, ou o Mestre decidiu explicitamente sem fonte (e isso está registrado como decisão dele, com data).
- Cada canônico declara suas lacunas em vez de escondê-las.

**Aí a Fase 2 destrava:** transformar o dossiê auditado em documento de escopo agnóstico, usando os canônicos como base de todo número, sem herdar nenhuma ambiguidade do sistema atual.

---

## 10-bis. Sessões de 18–20/08/2026 — método (par cego) e como retomar

> Renumerada de "## 10" em 28/08/2026 — colidia com a seção 10 ("Regras de trabalho"). Onde
> `pesquisa/VALIDACAO_R6.md` e a seção 21 citam "`HANDOFF.md` §10" para a regra de cadência ou o
> confronto de bloqueios, é esta seção.

### O que mudou de método

A pesquisa passou a rodar em **par cego**, e o motivo está registrado em `pesquisa/00_INDICE_E_PROTOCOLO.md`. O resumo: dois pesquisadores com o **mesmo prompt** têm erro correlacionado — chegam ao mesmo catálogo por caminhos diferentes, concordam, e a concordância não prova nada. Isolar contexto não corrige isso.

Agora os dois recebem o mesmo enunciado bruto mas ficam presos a **territórios de fonte que não se sobrepõem** (norma/literatura × catálogo de fabricante), e o juiz que confronta os dois **não sabe qual é qual** — o mapa do sorteio fica em `pesquisa/_procedencia/`, que o validador é instruído a não abrir.

**Isso já se provou.** Na R3, o juiz cego decidiu a única divergência de conclusão **contra** o lado da literatura acadêmica, porque a evidência do outro lado era melhor. Se soubesse qual era qual, o desempate por prestígio teria dado o resultado errado.

O procedimento de disparo está na skill global `par-cego-pesquisa`.

### Estado por rodada

| Rodada | Retorno | Validação | Canônico |
|---|---|---|---|
| R1 | ✅ | — | ✅ `CANONICO_GEOMETRIA_DE_CORTE.md` |
| **R2** | ✅ **par completo** (61 KB + 55,5 KB) | ✅ `APROVADO COM RESSALVAS`, 4 bloqueios — `VALIDACAO_R2.md` | ❌ a escrever |
| R3 | ✅ par completo | ✅ `APROVADO COM RESSALVAS`, 5 bloqueios | ✅ `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` |
| **R4** | ✅ **par completo** (31,5 KB + 40,7 KB) — rodado em IA externa | ✅ `APROVADO COM RESSALVAS`, **0 bloqueios** — `VALIDACAO_R4.md` (23/08) | ⬜ a escrever, liberado |
| R5 | ✅ | ✅ `APROVADO COM RESSALVAS`, 2 bloqueios | ✅ `CANONICO_LIMITES_E_ALERTAS.md` |
| **R6** | ✅ **retorno completo** (51,2 KB) + par cego **R6-V** sobre os bloqueios | ✅ `APROVADO COM RESSALVAS`, 2 bloqueios — `VALIDACAO_R6.md` (23/08). **A R6-V ainda não foi validada** | ⬜ travado |

**Por que parou:** o limite mensal de cota da conta foi atingido três vezes. Nenhuma interrupção perdeu trabalho — a trava de gravação incremental (arquivo criado vazio antes da primeira busca, anexado bloco a bloco) preservou tudo o que estava em disco, e os agentes foram retomados a partir do próprio transcrito.

### Como retomar - na ordem

> ⚠️ **Os passos 1, 2 e 3 abaixo já foram executados** (validações de R2, R4 e R6, entre 20 e 23/08).
> O texto fica como registro do que cada validação tinha de responder. **O que sobrou desta lista é o
> passo 4** — escrever os canônicos — mais a validação da rodada **R6-V**, que nasceu dos bloqueios da R6.

**A apuracao acabou.** As 6 rodadas tem retorno cru em disco. O que falta nao precisa
de busca na web: e leitura, conferencia e escrita.

**1. Validar R2** (par cego, aplicar G8). Gargalo de tudo: o canonico de limites tem
um `⧗ AGUARDA R2` no piso de espessura de cavaco. Quatro pontos exigem resposta explicita:
   - Qual espessura entra na equacao de forca especifica. Um retorno prova por
     integracao que e a **media** (erro 2-4%) e que a maxima erraria +45% a +82%.
   - Se as duas formulas de afinamento **sao mesmo concorrentes**: um retorno diz que
     nao sao (uma preserva a maxima, a outra a media - a disputa registrada estaria mal
     formulada); o outro diz que a do projeto mira a grandeza errada e entrega ~2x o
     avanco. Decidir se e a mesma coisa dita de dois jeitos.
   - Se a hipotese do `1-mc` transcrito fecha: `1 - 0,75 = 0,25`, exatamente o valor que
     o territorio de catalogo achou publicado sem conhecer a hipotese.
   - Se o risco no calculo de potencia e de **rotulo** ou de **fator `1/eta`**. A
     auditoria da R5 concluiu a segunda; um retorno da R2 defende a primeira.

**2. Validar R4** (par cego, aplicar G8). Dois pontos:
   - **Contraste de disciplina de rotulo:** um retorno usou `CONSENSO` 28 vezes tendo
     7 fontes; o outro nao usou `CONSENSO` nenhuma vez e declarou por que. O G3 vai ter
     de rebaixar boa parte de um lado.
   - **Concentracao de fonte:** um dos retornos apoia a maior parte dos numeros num
     fabricante so (OSG, 65 mencoes contra 8 do segundo colocado). Declarado pelo
     proprio retorno, mas precisa ser pesado.
   - Esperar **assimetria estrutural**, nao falha: o lado handbook veio quase vazio
     porque tabela de velocidade e avanco vive em catalogo. Ausencia de base academica
     e, ela propria, o achado desse lado.

**3. Validar R6** (pesquisador unico, G8 nao se aplica). Um ponto acima de todos:
   - **Divergencia do modulo de elasticidade contra a R3.** R3: 580 GPa, faixa 550-610.
     R6: 466-516 GPa comercial, 523-577 em ensaio, default proposto 500. **~16% de
     diferenca, e a deflexao e inversamente proporcional.** O valor da R3 foi omitido do
     enunciado da R6 de proposito, para permitir confirmacao independente - e o resultado
     foi divergencia, nao confirmacao. Resolver antes de escrever o canonico.
   - Ressalva menor: o enunciado pedia nivel de fonte (1 a 4) em cada achado; o retorno
     declarou em poucos.

**4. Escrever os 3 canonicos que faltam:** `CANONICO_MOTOR_DE_CALCULO.md`,
`CANONICO_VELOCIDADES_E_AVANCOS.md`, `CANONICO_DEFLEXAO_E_VIDA.md`. Depois voltar ao
canonico de limites e resolver o `⧗ AGUARDA R2`.

**5. Reconciliar os 3 conflitos abertos pelo E0** (ver `escopo/E0_PRINCIPIO_DA_CALCULADORA_AGNOSTICA.md`
secao 6). A decisao de 20/08 - calculadora agnostica por padrao, limites de maquina e
tipo de operacao numa camada 2 opcional - contraria comportamento ja escrito no
documento de interacao e a camada "limite fisico que bloqueia" do canonico de limites.

### As 4 decisões que esperam o Mestre

Nenhuma é de pesquisa. A pesquisa fez o que podia e parou.

| # | Decisão | Onde está detalhada |
|---|---|---|
| 1 | **Aço rápido fica no escopo de fresamento?** A decisão D1 ("fresa de HSS é obsoleta") foi **contraditada pelos dois territórios**, de universos que não se tocam. E o catálogo mostra que fresa de aço rápido **sem cobalto** não está à venda — a primeira das duas entradas do sistema representa ferramenta inexistente, e a segunda tem fator órfão. Três saídas propostas. | `canonicos/CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §3 |
| 2 | **Bloqueio duro por balanço: manter ou virar confirmação explícita?** Há registro de que o bloqueio continua; a evidência mostra que os limiares proíbem produto de catálogo. | `canonicos/CANONICO_LIMITES_E_ALERTAS.md` §3 |
| 3 | **A fórmula de afinamento de cavaco.** Decisão registrada como `[RESOLVIDO]` a favor da simplificada, com justificativa que o próprio registro admite ser circular. Dois fabricantes publicam exemplo resolvido que reproduz a **exata**. Depende do item 1 da retomada. | idem, §3 e §1.1 |
| 4 | **O rótulo de potência mostrado na interface** — na aresta ou no motor. | idem, §1.5 |

**Decisão tomada em 20/08 e já documentada:** a calculadora é **agnóstica por padrão** —
entrega o resultado sempre, sem vínculo com limite de máquina. Limites de máquina
(rotação, torque, avanço, potência) e tipo de operação (desbaste / semi / acabamento)
saem da interação padrão e viram uma **camada 2 opcional e explícita**, que o operador
ativa. Prioridade 1 é o básico que funciona; prioridade 2 é a configurabilidade para a
realidade de cada chão de fábrica. Registrada em
`escopo/E0_PRINCIPIO_DA_CALCULADORA_AGNOSTICA.md`, com 3 conflitos e 4 perguntas em aberto.

### Achados desta sessão que não podem se perder

- **`mc = 0,75` para alumínio é erro de transcrição — confirmado de forma independente**, como estava planejado. O prompt da R2 deliberadamente **não** mencionava a suspeita. O território de catálogo achou 0,25 publicado para todas as ligas de alumínio, com máximo de 0,30 em toda a tabela de 33 linhas; o território de literatura rejeitou o 0,75 por absurdo dimensional e levantou que seria um `1−mc` transcrito. `1 − 0,75 = 0,25`. As duas pontas fecham.
- **A fórmula de afinamento do projeto entrega ~2× o avanço** (+79% em 20% de engajamento) e erra sempre para o lado que quebra ferramenta. Os dois territórios chegaram a **79%** independentemente.
- **Repetição de valor redondo nem sempre é invenção.** Um fabricante publica o mesmo expoente em 26 de 33 linhas porque atribui **por família de material, não por liga**. O critério "valor redondo repetido é sinal de preenchimento por default", que a skill de validação usa em todo o projeto, precisa dessa exceção declarada. **Pendente de confirmação na validação da R2.**
- **Cinco multiplicadores por tipo de revestimento** que estavam em avaliação são `NÃO ENCONTRADO` nos dois territórios, cinco de cinco. Recomendação: descartar a lista inteira em vez de escolher entre eles.

---

## 13. Sessão de 21/08/2026 — escopo do MVP escrito

**Entregue:** `mvp/MVP_CALCULADORA_PARAMETROS.md` — 1434 linhas, 14 seções, pasta nova. É o primeiro
documento que junta as duas metades do projeto: a **estrutura** de tela e catálogo levantada do
sistema anterior, e o **número auditado** dos canônicos e das validações. Cobre 17 geometrias em 4
famílias, campos por tipo, cadeia de cálculo fórmula a fórmula, alertas com alvo numérico, tabelas de
dados e lacunas declaradas.

**Nada foi escrito no repositório antigo.** Ele foi só leitura durante toda a sessão.

**Dez divergências contra o registro anterior**, todas escritas com a razão na §0.3 do documento. As
que mais mudam o produto:

| # | Decisão |
|---|---|
| 1 | Sem seletor de operação e sem perfil de máquina — os dois vão para a camada 2, por E0. A potência sai como **potência na aresta**, rotulada |
| 2 | O sistema **não compensa o avanço** automaticamente: o `fz` digitado é o que se programa, e a espessura de cavaco vira resultado visível com alerta |
| 3 | Balanço longo **avisa, não bloqueia** — o `L/D > 6` proibia ferramenta de catálogo |
| 4 | Aço rápido comum sai do catálogo; fica só o ao cobalto |

**As 6 perguntas abertas foram decididas pelo Mestre nesta sessão** (§13.3 do documento). Cinco eram
de comportamento; a sexta virou mudança de produto:

> **Q6 — sai o selo de "material estimado"; entram os dados do material visíveis e editáveis.**
> Razão dele: mais importante que saber o material é saber **os dados** que entram na conta. O
> operador pode pedir os números ao fornecedor, e o sistema tem de aceitá-los. Virou a §4.7 do
> documento, mudou 6 pontos do texto e **contraria E3**, que mandava marcar dado não verificado com
> badge de estimativa. Está registrada como a 10ª divergência.

**Consequência para a pesquisa:** a edição de dados do material é o caminho mais curto para fechar a
lacuna dos cinco materiais sem par de constantes verificado (P20, 2711, GG25, GGG50, Ti-6Al-4V). O
fornecedor entrega direto a quem compra a ferramenta o que nenhuma rodada de deep research alcançou.

**Reconciliação do E0 pendente:** os 3 conflitos abertos pelo E0 (§6 daquele documento) estão
resolvidos **dentro do escopo de MVP**, mas `E5_INTERACAO_E_FLUXO.md` e
`CANONICO_LIMITES_E_ALERTAS.md` continuam com o texto antigo. Quem for mexer neles precisa alinhar
com o MVP, não o contrário.

**Sem commit:** o Fenix continua não sendo repositório git. *(Superado em 24/08/2026 — ver §14.)*

---

## 14. Sessão de 24/08/2026 — o repositório virou git, e a entrevista de construção começou

**O que mudou de estado:** o Fenix **é** repositório git agora, com remote no GitHub
(`contatorafaeleleoterio-hub/Fenix`). A frase do fim da §13 ficou obsoleta e está marcada como tal.

### 14.1 O repositório foi configurado para as skills de engenharia

Rodada a skill `setup-matt-pocock-skills`. Ela escreve a configuração que as outras skills de
engenharia leem antes de agir:

| Arquivo | O que declara |
|---|---|
| `CLAUDE.md` (raiz) | contexto do projeto, estrutura das pastas, e o bloco `## Agent skills` |
| `docs/agents/issue-tracker.md` | issues vivem no GitHub Issues deste repo, operadas via `gh` CLI |
| `docs/agents/domain.md` | layout single-context — `CONTEXT.md` e `docs/adr/` na raiz, criados sob demanda |

**Decisão do Mestre:** GitHub Issues, não markdown local. Razão: rastrear tarefa fora do chat e de
outro dispositivo.

**Não foi escrito** `docs/agents/triage-labels.md` — a skill `triage` não está instalada, então não
existe quem leia o vocabulário de labels. Se ela for instalada depois, rodar o setup de novo.

**As skills de engenharia disponíveis** são `to-tickets`, `to-spec`, `implement`, `code-review-matt`
e `grill-me`. Todas com `disable-model-invocation: true` — **só o Mestre dispara**, digitando
`/nome-da-skill` no chat. O agente não consegue chamá-las sozinho.

### 14.2 A entrevista sobre a spec do MVP — rodada 1, sem respostas

O Mestre pediu entrevista antes de quebrar a spec em tickets. Rodou a skill `grilling` sobre
`mvp/MVP_CALCULADORA_PARAMETROS.md`.

**O achado que abriu a entrevista:** a spec está **completa como produto** — 6 perguntas decididas,
12 lacunas declaradas com o que fecharia cada uma, nenhuma pendência de produto. O que falta é o que
o próprio documento declara não ser: **tecnologia, ordem de construção e desenho de tela**. Nenhuma
das três tem uma linha escrita em lugar nenhum do repositório.

**Quatro questões foram formuladas com recomendação e razão. Nenhuma foi respondida** — a sessão foi
encerrada antes. Elas estão inteiras, com o raciocínio de cada uma, em
`construcao/QUESTOES_ABERTAS_CONSTRUCAO.md`:

| # | Questão | Recomendação registrada |
|---|---|---|
| **Q1** | Plataforma e stack — **é a raiz, nada abaixo anda sem ela** | web app React + TypeScript, offline-first e instalável. Alternativa real: desktop nativo, se o Fenix for vender junto com o FlowNC |
| **Q2** | Os 3 canônicos ⬜ bloqueiam a construção? | não bloqueiam — R2 e R4 já vivem na spec do MVP com fonte, R6 está fora do escopo. Condição: os números moram num lugar só, isolados da lógica |
| **Q3** | Escopo do primeiro lote de tickets | fatia vertical: aço 1045 + fresa de topo, entrada até resultado, com as 2 travas do §13.2 como teste |
| **Q4** | Lacuna L6, a faixa 0,02–0,1 mm sem tratamento | estender "extrapolado" até 0,1 mm, com texto distinto do piso: "fora do modelo" abaixo de 0,02, "margem maior que a declarada" entre 0,02 e 0,1 |

### 14.3 Como retomar

1. Ler `construcao/QUESTOES_ABERTAS_CONSTRUCAO.md` inteiro — é curto e traz a razão de cada
   recomendação, que é contra o que vale a pena empurrar.
2. **Responder Q1 primeiro.** Ela trava as outras três de fato: granularidade de ticket, framework
   de teste e persistência dos dados editados do material dependem dela.
3. Com Q1 a Q4 respondidas, disparar `/to-tickets` apontando para a fatia decidida na Q3.

**Fica pendente da §13 e não foi tocado nesta sessão:** a reconciliação do E0 —
`E5_INTERACAO_E_FLUXO.md` e `CANONICO_LIMITES_E_ALERTAS.md` continuam com texto anterior ao MVP e
precisam alinhar **com** ele.

---

## 15. Sessão de 25/08/2026 — a stack está decidida, e o estado das rodadas foi corrigido

**Status:** documentação. Zero código. Q1 fechada.

### 15.1 O que foi entregue

**`docs/adr/0001-plataforma-e-stack.md`** — primeira ADR do projeto, fecha a Q1.

> **Decisão:** núcleo de cálculo em TypeScript puro e isolado; casca web React + TypeScript entregue
> como PWA instalável e offline-first; empacotamento desktop via Tauri, sobre o mesmo código, se e
> quando o FlowNC exigir. Persistência em IndexedDB, export/import em JSON versionado desde o
> primeiro dia. Teste com Vitest, contra o núcleo, sem navegador.

**Como a questão destravou — vale mais que a resposta.** A Q1 estava marcada como "só o Mestre
resolve" porque parecia depender de uma decisão comercial (vender junto com o FlowNC ou não).
A formulação "web ou desktop" pressupunha escolha irreversível. **Com o núcleo isolado da casca, a
casca vira reversível e barata** — a decisão comercial pode esperar sem custo de retrabalho.

**O que sustentou a decisão:** cinco fatos já escritos no escopo, nenhum arbitrado — rede zero em
tempo de uso (E5 P10 e §10.1), sincronização fora de escopo (E6 §8), persistência local com
exportar/importar (E6 §7), tela pequena com a mesma capacidade e não uma versão reduzida (E5 §11),
painel persistente sem espera perceptível (MVP P1). Somados: **sem backend, sem hardware, sem
processamento pesado**. Nativo não compra nada; web entrega as duas formas de tela de graça.

A ADR registra também as **três condições que a invalidariam** (PC de oficina travado por TI,
licenciamento amarrado à máquina, leitura de G-code/pós-processador) — nenhuma toca o núcleo.

### 15.2 Correção de estado — o HANDOFF estava desatualizado

As validações de **R4** e **R6** existiam em disco desde 23/08 e este arquivo ainda dizia "não
feita". Corrigido nas duas tabelas (§7 e §10). O que mudou de verdade:

| Rodada | Estado real |
|---|---|
| R4 | ✅ `APROVADO COM RESSALVAS`, **0 bloqueios** — canônico liberado para escrita |
| R6 | ✅ `APROVADO COM RESSALVAS`, **2 bloqueios** → gerou a rodada **R6-V** |
| **R6-V** | Par cego sobre os bloqueios da R6. Retornos A e B **em disco**, **validação não feita** — é a única apuração pendente do projeto |

**Achado da R6-V que não pode se perder:** a divergência do módulo de elasticidade (R3 dizia 580 GPa,
R6 dizia 500) está resolvida a favor de **580 GPa**, e o território de fonte primária mostra que a
dispersão inteira cabe em ±8% na deflexão — abaixo da margem do modelo. **`E` pode ser constante
interna, sem campo na tela.** Falta o juiz confirmar. O território de código aberto trouxe um segundo
achado estrutural: `Fr/Fc` **não é constante** — depende da espessura de cavaco, e varia 0,26 a 0,50
na mesma ferramenta. A faixa folclórica "0,3 a 0,5" é efeito da força de aresta, não do material.

### 15.3 Onde parou e como retomar

Nada está bloqueado. Duas frentes independentes, escolher uma:

**(a) Fechar a pesquisa** — validar a R6-V, depois escrever `CANONICO_MOTOR_DE_CALCULO.md`,
`CANONICO_VELOCIDADES_E_AVANCOS.md` e `CANONICO_DEFLEXAO_E_VIDA.md`, e resolver o `⧗ AGUARDA R2` no
canônico de limites.

**(b) Começar a construção** — responder Q2, Q3 e Q4 (todas com recomendação escrita, nenhuma trava
as outras) e disparar `/to-tickets` sobre a fatia vertical da Q3: aço 1045 + fresa de topo, entrada
até resultado, com as duas travas do §13.2 do MVP como teste automatizado desde o primeiro ticket.

**Continua pendente e não foi tocado:** a reconciliação do E0 — `E5_INTERACAO_E_FLUXO.md` e
`CANONICO_LIMITES_E_ALERTAS.md` ainda têm texto anterior ao MVP e precisam alinhar **com** ele.
E os 4 escopos que faltam: E1, E2, E4 e E7 (este por último).

**Arquivos tocados:** `docs/adr/0001-plataforma-e-stack.md` (novo), `Docs_inicial/HANDOFF.md`,
`Docs_inicial/construcao/QUESTOES_ABERTAS_CONSTRUCAO.md`. Mais os 7 arquivos de pesquisa que estavam
sem commit desde 23/08 (validações de R4 e R6, e a rodada R6-V inteira).

**Retomar com:** "continuar".

---

## 16. Sessão 26/08/2026 — JTBD com entrevista de usuário

**Feito:** `inicio_fenix/JTBD_O_PROBLEMA.md` — as cinco perguntas de Jobs to be Done respondidas e
depois **reescritas** a partir de entrevista com fresador CNC de fábrica, uma pergunta por vez. Três
arquivos reais de parâmetros de produção foram cedidos e analisados; cópia em
`inicio_fenix/referencia_fabrica/`.

**O que a entrevista derrubou:** o usuário não busca o número por não saber — já existe padrão na
fábrica e ninguém calcula. O gatilho dominante é reativo (o problema aparece cortando, e o override
de rotação e avanço são os únicos controles na mão). Ninguém volta para corrigir a origem. Os
paliativos são dois, não sete: planilha da fábrica e alguém experiente. A dor tem duas faces —
cansaço para o operador, gasto de ferramental para o gestor — e nenhum dos dois enxerga a do outro.

**Registrado e não resolvido:** `inicio_fenix/ATUALIZACAO_NECESSARIA.md` — sete pontos em que o JTBD
conflita com `E0`, com o MVP e com `E5`, cada um com a razão. **Nenhum documento existente foi
alterado.** O que fazer com esses pontos fica para decisão futura.

**Lacunas abertas:** frequência dos gatilhos não apurada; largura de corte sem definição de camada.

**Arquivos tocados:** `inicio_fenix/` (pasta nova, 2 documentos + 3 arquivos de referência),
`Docs_inicial/HANDOFF.md`.

**Retomar com:** "continuar".

---

## 17. Sessão 26/08/2026 (2ª) — o conflito JTBD × escopo, conferido

**Feito:** os sete pontos de `../inicio_fenix/ATUALIZACAO_NECESSARIA.md` foram conferidos contra o
texto real dos documentos. Resultado em **`../inicio_fenix/VERIFICACAO_DA_ATUALIZACAO.md`**.

**Os sete se confirmam.** Três mudam de forma quando conferidos:

| # | Correção ao registro |
|---|---|
| 1 | "Camada 2" não tem dois significados. Tem **três** — o `E5` §7.1 ainda usa "Operação" como entrada, o que o `E0` §3 proíbe e o `MVP` §0.3 removeu. E o `E0` §6 já tinha C1–C3 declarados "para reconciliação" desde 20/08, nunca fechados |
| 2 | Os blocos "o que vai acontecer" e "o que mexer" não estão *faltando*: o `MVP` §12 os **exclui com motivo técnico** — falta o `n` de Taylor e as constantes de deflexão. **É a mesma lacuna com que a R6 foi encerrada.** O bloco 3 tem o conteúdo pronto no `MVP` §5.5; falta forma, não dado |
| 3 | A altura de fixação **não** é campo secundário — é obrigatória (`MVP` §4.1) e passo 5 do fluxo (§2.2). O defeito é o **efeito**: `L` só produz `L/D` e alerta, não move `Vc`, `fz` nem `ap` |

**Três achados que o registro não menciona:**

- **N1** — o modo rápido **já está escrito** em `escopo/E5` §7, com quatro entradas, e só **duas** coincidem com as cinco do JTBD.
- **N2** — o `MVP` §12 lista "Modo rápido" **fora do escopo**; o JTBD §5.2 faz dele **o próprio MVP**. Conflito de corte, não de detalhe.
- **N3** — desatualização factual sem relação com o JTBD, **já corrigida nesta sessão**: `README.md` dizia 0 de 6 rodadas, 0 de 6 canônicos e escopo bloqueado; três documentos apontavam a pasta `_referencia/`, que **não existe**; `E0` não aparecia em nenhum índice.

### O que precisa ser decidido, em ordem de dependência

| Ordem | Questão | Natureza |
|---|---|---|
| 1 | **O que é a camada 2** — ambiente, profundidade de entrada, ou dois eixos com nomes distintos | produto |
| 2 | **O MVP é o modo rápido de cinco campos, ou o painel completo do `MVP` §2.2** | produto |
| 3 | **A previsão de comportamento entra sem `n` de Taylor e sem `Fr/Fc`, ou espera os três documentos** | produto |
| 4 | **`L` passa a mover `Vc`/`fz`/`ap`, ou continua só produzindo `L/D` e alerta** | cálculo |
| 5 | **`ae` é assumido, ou pertence ao modo detalhado** | cálculo |
| 6 | **O gestor é usuário do MVP, ou personagem de fase posterior** | escopo |

**A 1 destrava as outras cinco.** Enquanto ela estiver aberta, E1, E2, E4 e E7 não devem ser escritos
— os quatro derivam de "camada 2".

### A reconciliação — forma escolhida e etapa 1 concluída

**Forma escolhida pelo Mestre:** reescrever o `E0` e depois editar o MVP cirurgicamente. **Documento
novo com precedência foi rejeitado** — o `E0` já tentou esse padrão em 20/08 e deixou C1–C3 abertos;
uma terceira camada empilhada repete exatamente a doença que o Fenix existe para curar.

**Etapa 1 — `E0` reescrito (feito).** A questão 1 não era escolher entre as leituras de "camada 2";
era **separá-las**. O que mudou:

| # | Mudança |
|---|---|
| 1 | **"Camada 1" e "camada 2" saem do vocabulário do projeto.** O nome designava três coisas em três documentos |
| 2 | Entram **dois eixos independentes**: o **eixo de dependência** (núcleo agnóstico → ambiente declarado) e o **eixo de profundidade** (entrada mínima → entrada completa). Uma posição em um não determina a posição no outro |
| 3 | `E0` §2.1 traz a **tabela de tradução** do vocabulário antigo, para resolver documento já escrito |
| 4 | **C1, C2 e C3 fechados.** C3 virou a §3.3: limite geométrico **bloqueia**, limite de processo **avisa**, limite de ambiente **avisa e só existe se declarado** |
| 5 | **Q1–Q4 fechados** com a evidência que já estava escrita nos outros documentos |
| 6 | Entram **A1–A6** — as pendências que o `E0` não pode resolver porque são corte de MVP (A1, A2, A6), lacuna de dado (A3) ou motor de cálculo (A4, A5) |

**Etapa 2 — MVP e `E5` §7 editados (feito).**

| Onde | O que mudou |
|---|---|
| `MVP` §0.4 | **Cinco divergências novas (11–15)** contra a versão de 20/08, cada uma com a razão |
| `MVP` §1 | "Camada 1/2" → núcleo agnóstico × ambiente declarado. **Nova §1.4:** o painel da §2.2 **já é** a entrada mínima; não há segundo modo a construir |
| `MVP` §2.2 · §4.1 · §4.8 | **Incremento por passe promovido de controle de ajuste a campo de entrada.** A largura de corte **não** vira campo, e a §4.8 diz por quê: ela não é assumida em silêncio — é mostrada |
| `MVP` §2.3 | Zonas Z5 e Z6 abertas para os dois blocos, **acima** dos resultados úteis |
| `MVP` §7.3 · §7.4 | **Os dois blocos escritos.** "O que vai acontecer" com seis sinais, cada um amarrado à grandeza que o dispara; "o que mexer" com o preço na mesma linha. §7.3.1 declara o que o bloco **não** diz |
| `MVP` §7.6 | Exemplo de conteúdo refeito com os dois blocos |
| `MVP` §12 | "Modo rápido" sai da lista de adiados e entra como **descartado**, com motivo |
| `MVP` §13.1 | **Lacunas novas L13 (`n` de Taylor), L14 (`Fr/Fc`) e L15 (altura de fixação não move os parâmetros)** |
| `MVP` §13.3 · §13.4 | **Q7–Q12 decididas.** §13.4 nova: o que a evidência de campo pediu e o MVP **não** entrega, com a razão nomeada |
| `E5` §7 | Reescrita. A calculadora reduzida de quatro entradas **sai**; entra o eixo de profundidade dentro do mesmo painel. Q4 prejudicada |
| `E3` · `E6` | Marcas de origem "modo rápido" trocadas por premissa assumida / extrapolado / editado |

**As três decisões que mais pesam, e a razão de cada uma:**

1. **Não existe segundo modo.** Postas lado a lado, as cinco entradas da entrevista e os seis passos do `MVP` §2.2 são a **mesma lista, menos um campo** — o incremento. O que o `MVP` §12 excluía era outro objeto: a calculadora reduzida de `E5` §7, que escondia potência, torque e alertas.
2. **A previsão de comportamento entra qualitativa.** Nomeia a condição e a grandeza que a disparou, com o que a cadeia já calcula e tem fonte. **Não entrega número de vida** — sem o `n` de Taylor, seria exatamente o defeito que este projeto existe para não repetir.
3. **A altura de fixação não move os parâmetros no MVP.** A prática da fábrica move; nenhuma fonte sustenta o multiplicador. Virou `L15`, declarada — não inventada.

**Onde parou:** reconciliação concluída. `E0`, `MVP`, `E5`, `E3` e `E6` coerentes entre si e com a
evidência de campo. **Nenhum número novo entrou sem fonte.**

**Próximo passo, dois caminhos independentes:**
- **Escrita:** E1, E2, E4 e E7 estão **desbloqueados** — o vocabulário fechou. E os canônicos de motor de cálculo (R2) e velocidades e avanços (R4) seguem liberados.
- **Acesso:** obter os **três documentos** que fecham L13, L14 e L15 — Altintas (*Manufacturing Automation*), Machinery's Handbook ou ASM Vol. 16 na tabela de Taylor, e Kops e Vo (CIRP Annals). Não é mais busca; é acesso.

**Arquivos tocados:** `../inicio_fenix/VERIFICACAO_DA_ATUALIZACAO.md` (novo), `README.md`,
`HANDOFF.md`, `escopo/LEIA-ME.md`, `canonicos/LEIA-ME.md`,
`escopo/E0_PRINCIPIO_DA_CALCULADORA_AGNOSTICA.md` (reescrito), `mvp/MVP_CALCULADORA_PARAMETROS.md`,
`escopo/E5_INTERACAO_E_FLUXO.md`, `escopo/E3_RESULTADOS_E_APRESENTACAO.md`,
`escopo/E6_DADOS_DO_USUARIO.md`, `../inicio_fenix/ATUALIZACAO_NECESSARIA.md` (marcado resolvido),
`LESSONS.md`.

**Lições registradas:** `L5` — nome ambíguo é conflito disfarçado de acordo · `L6` — documento novo
com precedência não resolve conflito, empilha · `L7` — conferir o registro contra o texto, nunca
contra o resumo do registro.

**Retomar com:** "continuar".

---

## 18. Sessão 26/08/2026 (3ª) — `CANONICO_MOTOR_DE_CALCULO.md` escrito

**Feito:** `canonicos/CANONICO_MOTOR_DE_CALCULO.md`, a partir de `RESPOSTA_R2.md` + `_B.md`,
`VALIDACAO_R2.md` e `VALIDACAO_R2V2.md`. Era o gargalo: outros documentos esperavam por ele.

**Cobre:** afinamento de cavaco (`hm` vs `hex`, a fórmula em uso no projeto sai — dava +79% de avanço),
diâmetro efetivo em fresa esférica (duas correções cumulativas, não alternativas), correção de ângulo
de saída, a cadeia completa de força/potência/torque, piso de espessura (`h` = 0,02 mm), tabela de
`kc1.1`/`mc` por material (Walter + Jongen), e a troca dos três pares Diniz/Marcondes/Coppini por
valores de catálogo (decisão D7 de 20/08, já registrada na seção 9).

**Consequência para outro documento, não tocada nesta sessão:** `CANONICO_LIMITES_E_ALERTAS.md`
precisa de dois ajustes que este canônico revela — o `⧗ AGUARDA R2` da §1.1 fecha (a fórmula já em uso
lá é o inverso exato do CTF), e a §2.2 perde a fonte do fator de desgaste `1,1–1,3` que sustenta o teto
de aproveitamento de 0,77 (não publicado por fabricante nenhum).

**Onde parou:** 4 de 6 canônicos escritos. Faltam `CANONICO_VELOCIDADES_E_AVANCOS.md` (R4, liberado)
e `CANONICO_DEFLEXAO_E_VIDA.md` (R6, liberado com lacunas declaradas).

**Arquivos tocados:** `canonicos/CANONICO_MOTOR_DE_CALCULO.md` (novo), `canonicos/LEIA-ME.md`,
`HANDOFF.md`.

**Retomar com:** "continuar".

---

## 19. Sessão 26/08/2026 (4ª) — `CANONICO_VELOCIDADES_E_AVANCOS.md` escrito

**Feito:** `canonicos/CANONICO_VELOCIDADES_E_AVANCOS.md`, a partir de `RESPOSTA_R4.md` + `_B.md` e
`VALIDACAO_R4.md` (0 bloqueios).

**Cobre:** `Vc` sem faixa universal por material — só ponto de partida condicionado a ferramenta,
dureza/grupo, revestimento, refrigeração e estratégia; a razão acabamento/desbaste real (1,60–1,78×
publicado, contra 1,10× em uso); `fz` como tabela discreta por ferramenta (degraus, não função
contínua de `D`); o pico de `Vc` em Ø6–8 mm do sistema como artefato sem base física; o piso de `fz`
como função do raio de aresta (`fz_min ≈ α × r_e`, sem valor consensado de `α` nem de `r_e` por
diâmetro); e a queda das quatro zonas de cor simétricas (`0,50/0,75/1,20/1,50`), substituídas por
zonas assimétricas por parâmetro.

**Achado que muda o produto:** a tabela de `fz` do sistema está **+32% a +42%** acima do proxy de
catálogo entre Ø2 e Ø6 mm — acima da margem declarada do modelo (±15–25%). Fica registrado como
achado a levar em conta, não como correção automática (§2.2 do canônico).

**Nenhuma decisão do Mestre ficou pendente desta rodada** — as três questões fecharam com evidência
condicionada ou lacuna declarada (§3 do canônico).

**Onde parou:** 5 de 6 canônicos escritos. Falta só `CANONICO_DEFLEXAO_E_VIDA.md` (R6, liberado com
lacunas declaradas — `n` de Taylor, `Fr/Fc`, `De/D` por nº de canais).

**Arquivos tocados:** `canonicos/CANONICO_VELOCIDADES_E_AVANCOS.md` (novo), `canonicos/LEIA-ME.md`,
`HANDOFF.md`.

**Retomar com:** "continuar"

---

## 20. Sessão 26/08/2026 (5ª) — `CANONICO_DEFLEXAO_E_VIDA.md` escrito (6/6) e auditoria da R4

**Feito:** `canonicos/CANONICO_DEFLEXAO_E_VIDA.md` — 6º e último canônico, a partir de `RESPOSTA_R6`/`R6-V`/`R6-V2` e suas validações. Fórmula de viga escalonada derivada e conferida (`δ = (F/3E)·[(L³−L2³)/I1 + L2³/I2]`); `E` do metal duro fixado em **580 GPa** (`CONSENSO`, confirmado por par cego); `De/D=0,80` como default declarado. **Lacuna crítica que fica:** `Fr/Fc` sem coeficientes — a deflexão tem fórmula pronta mas não é calculável em número até Altintas ser aberto.

Em seguida, auditoria cética de `CANONICO_VELOCIDADES_E_AVANCOS.md` contra as três fontes de R4 — achou e corrigiu 7 discrepâncias: dois rótulos de confiança inflados/errados (`CONSENSO`/`NÃO ENCONTRADO` onde a fonte dizia `SEM CONSENSO`), a faixa de `α` errada e um "centro provável" sem fonte nenhuma, o "nove" não sourceável no cabeçalho, coluna de acabamento ausente na Tabela B, um range de erro combinado que induzia a erro em §2.1, e a §4 incompleta contra os 20 itens de `VALIDACAO_R4.md`. Registrado como **`L8`** em `LESSONS.md`: canônico não deve ser conferido contra o resumo do validador, só contra o retorno cru.

**Onde parou:** 6 de 6 canônicos escritos — pesquisa fecha a "definição de pronto" da §12, salvo os 3 documentos de acesso. Pendente, revelado pelo novo canônico e ainda não editado: `CANONICO_LIMITES_E_ALERTAS.md` §1.4 (trocar "diâmetro da haste" pela viga escalonada) e o rótulo de `E` em `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.2 (`REFERÊNCIA ÚNICA` → `CONSENSO`).

**Próximo passo:** aplicar os dois ajustes cruzados acima, ou seguir por E1/E2/E4/E7 (desbloqueados), ou buscar os 3 documentos de acesso (Altintas, Machinery's Handbook/ASM Vol. 16, Kops e Vo).

**Arquivos tocados:** `canonicos/CANONICO_DEFLEXAO_E_VIDA.md` (novo), `canonicos/LEIA-ME.md`,
`canonicos/CANONICO_VELOCIDADES_E_AVANCOS.md` (7 correções), `LESSONS.md` (L8), `HANDOFF.md`.

**Retomar com:** "continuar".

---

## 21. Sessão 26/08/2026 (6ª) — auditoria cega dos dois canônicos novos, e o `E` fechado

**O issue tracker do projeto começou a ser usado nesta sessão.** As pendências cruzadas entre canônicos viviam só como frase no meio de um documento; agora são issues do GitHub (`gh` CLI, repo `contatorafaeleleoterio-hub/Fenix`). Ver `docs/agents/issue-tracker.md`.

**Feito — auditoria cega de `CANONICO_DEFLEXAO_E_VIDA.md` contra os retornos crus de R6/R6-V/R6-V2** (auditor sem contexto do projeto, conferindo contra `RESPOSTA_*`, não contra as validações). Duas discrepâncias, ambas corrigidas (commit `6672e3a`):

1. **Cabeçalho** — a regra de cadência ("duas reprovações mandam declarar a lacuna") era atribuída a `pesquisa/00_INDICE_E_PROTOCOLO.md` §5, que **não contém a regra**. A fonte real é este arquivo, seção 10 ("Cadência corrigida").
2. **§1.2 e §1.3** — `CONSENSO` liso transportado de rótulos **qualificados** da fonte (`CONSENSO` *qualitativo* no Bloco 3, *matemático* no Bloco 8), contra instrução explícita de `VALIDACAO_R6.md` G3. Registrado como **`L9`** em `LESSONS.md`.

A mesma auditoria conferiu, e **não achou defeito**, na fórmula de viga escalonada (sanidade algébrica: com `I1=I2` colapsa para `δ=FL³/3EI`; o caso-limite de 59,0% bate com `VALIDACAO_R6.md` §D-2), na tabela de sensibilidade de `n`, na cobertura da §4 contra tudo que R6-V2 reprovou, e na ausência de referência ao sistema antigo.

**Auditoria paralela de `CANONICO_VELOCIDADES_E_AVANCOS.md`** — as 7 correções da sessão anterior conferidas uma a uma contra `RESPOSTA_R4`/`_B`/`VALIDACAO_R4`, mais verificação por amostragem direta nos trechos. **Nenhuma discrepância.** O documento está fiel às fontes.

**Feito — `E` do metal duro fechado (issue #2, commit `9993753`).** A checagem que a issue mandava fazer rendeu mais que o previsto:
- A elevação **se confirma**: `VALIDACAO_R6V.md` G3 diz literalmente *"Manter `CONSENSO` em Q1"*, e a confirmação foi **cega** (o enunciado da R6-V omitiu de propósito o 580 GPa já registrado). A R6-V **não reciclou** as três fontes que a auditoria da R3 derrubou — trouxe CERATIZIT p.22, Kennametal p.9 e NPL eq.44, todas por ressonância (ISO 3312), dispersão ≤3,2%.
- **Mas o 580 não é número publicado** — é *"escolha de engenharia dentro de 570–585"* (`VALIDACAO_R6V.md` G4). Entrou em linha separada, como decisão.
- A faixa passa de **550–610 para 560–624 GPa** (os 610 eram extrapolação não publicada; a CERATIZIT publica 624 a 6% Co).
- **Defeito inverso achado de quebra:** a tabela por grau em `CANONICO_DEFLEXAO_E_VIDA.md` §2.1 estava com `CONSENSO` linha a linha, mas cada linha vem de um fabricante só. Voltou para `REFERÊNCIA ÚNICA`, com nota de que o consenso cobre faixa e método, nunca o valor de um grau. Registrado como **`L10`**.

**Onde parou:** 6 de 6 canônicos escritos e **auditados contra fonte crua**. Das duas pendências cruzadas que o 6º canônico revelou, **uma fechou** (`E`, issue #2).

**Blocker:** a issue #1 (viga escalonada em `CANONICO_LIMITES_E_ALERTAS.md` §1.4) **trava numa decisão do Mestre**: a fórmula precisa de `L2`, o comprimento da parte canalizada da fresa, e isso não é entrada do modelo hoje. Ou o usuário mede e informa, ou o sistema estima por classe de ferramenta. Não dá para editar aquele §1.4 antes disso.

**Próximo passo:** decidir de onde vem `L2` e fechar a issue #1; ou seguir por E1/E2/E4/E7 (desbloqueados); ou buscar os 3 documentos de acesso (Altintas, Machinery's Handbook/ASM Vol. 16, Kops e Vo).

**Arquivos tocados:** `canonicos/CANONICO_DEFLEXAO_E_VIDA.md`, `canonicos/CANONICO_FERRAMENTAS_E_SUBSTRATOS.md`, `LESSONS.md` (L9, L10), `HANDOFF.md`. Issues #1 (aberta) e #2 (fechada).

**Retomar com:** "continuar".

---

## 22. Sessão 26/08/2026 (7ª) — issue #1 fechada: `L2` é o `Lc` que já existia

**Feito:** a decisão que travava a issue #1 não era de negócio — o dado já tinha campo. `MVP_CALCULADORA_PARAMETROS.md` §4.1 já cadastra `Lc` (comprimento de aresta), entrada opcional só de fresamento, hoje usada como teto de `ap`. É exatamente o `L2` (comprimento da parte canalizada) que a fórmula de viga escalonada pede — nenhum campo novo, o usuário já mede e informa.

`I1` usa o diâmetro `D` já informado; `I2` usa `De = 0,80×D` (default declarado da §2.3). Quando `Lc` não é preenchido, o cálculo cai para viga simples de diâmetro único e o resultado sai marcado como **estimativa conservadora** — sem inventar default de `Lc` por classe de ferramenta, por falta de fonte.

**Editado:** `CANONICO_LIMITES_E_ALERTAS.md` §1.4 (fórmula da viga escalonada entra, com a regra de fallback quando `Lc` está vazio), `CANONICO_DEFLEXAO_E_VIDA.md` §5 e cabeçalho de precedência (marcados `RESOLVIDO`), `MVP_CALCULADORA_PARAMETROS.md` §4.1 (observação do campo `Lc` ganha a segunda função). Issue #1 fechada no GitHub com o resumo da resolução.

**Onde parou:** nenhum bloqueio de decisão aberto no projeto. Só resta lacuna de acesso: `n` de Taylor / `Fr/Fc` (Altintas, Machinery's Handbook/ASM Vol. 16) e `De/D` por nº de canais >4 (Kops e Vo) — três documentos nomeados, não busca.

**Próximo passo:** E1, E2, E4 e E7 (desbloqueados) ou seguir atrás dos 2 documentos de acesso restantes.

**Arquivos tocados:** `canonicos/CANONICO_LIMITES_E_ALERTAS.md`, `canonicos/CANONICO_DEFLEXAO_E_VIDA.md`, `mvp/MVP_CALCULADORA_PARAMETROS.md`, `HANDOFF.md`. Issue #1 (fechada).

**Retomar com:** "continuar".

---

## 23. Sessão 26–27/08/2026 (8ª) — E1 e E2 escritos: o escopo funcional foi de 4/8 a 6/8

**Feito:** os dois documentos de escopo que estavam desbloqueados desde o fechamento do vocabulário.

`escopo/E1_DOMINIO_E_CATALOGO.md` — o que o sistema conhece: 4 famílias de usinagem (e por que a família decide quais grandezas existem), 17 geometrias com campos próprios e substratos, por que o substrato é parte do **nome** e não um campo, os 6 campos que ficam deliberadamente de fora, aço rápido como nicho, revestimento como **filtro por material** com a distinção entre bloqueio duro e ausência de oferta, as 12 ligas com grupo e dureza, e a cadeia material → ferramenta → revestimento → campos.

`escopo/E2_ENTRADAS_E_CONFIGURACAO.md` — o que o operador informa: as duas regras que decidem se algo vira campo, controle ou nada; os 7 campos comuns; por que o incremento por passe é campo e a largura de corte é controle; os dados do material como entrada editável; envelope de diâmetro e extrapolação; **validação em três naturezas** (geométrico rejeita · processo avisa · sanidade avisa como erro de digitação); controles por família com a natureza de cada limite; perfil de máquina; fator de segurança; preferências.

**Duas decisões de escrita, declaradas:**

1. **Valor fica em `canonicos/`, estrutura fica no escopo.** As ligas entram no E1 com nome, grupo e dureza; `kc1.1`, `mc` e `Vc` de partida não foram copiados — duas fontes para o mesmo número é exatamente a dívida que este projeto existe para não herdar.
2. **Escopo é domínio, MVP é corte.** Nenhum dos dois documentos diz "fica para depois" — isso é `mvp/` e E7. Ver `L12`.

**Perguntas acumuladas subiram de 16 para 26** — E1 traz Q17–Q21 (estratégia de acabamento, revestimento como campo ou embutido, grau para aço endurecido >48 HRC, critério de entrada de liga sem fonte, rosca fora da tabela) e E2 traz Q22–Q26 (envelope fora do fresamento, piso de processo com máquina declarada, unidade e separador decimal, um perfil de máquina ou vários, padrão do rendimento). Continuam em bloco, para decidir quando os 8 estiverem escritos.

**Onde parou:** escopo funcional **6 de 8**. Nenhum bloqueio de decisão novo — as 10 perguntas são de decisão em bloco, não travam a escrita dos que faltam.

**Próximo passo:** **E4** (indicadores e segurança) e depois **E7** (fronteiras, por último por depender do que entrou nos demais). Alternativa independente: os documentos de acesso (Altintas, Machinery's Handbook / ASM Vol. 16, Kops e Vo).

**Arquivos tocados:** `escopo/E1_DOMINIO_E_CATALOGO.md` (novo), `escopo/E2_ENTRADAS_E_CONFIGURACAO.md` (novo), `escopo/LEIA-ME.md`, `LESSONS.md` (L12), `HANDOFF.md`.

**Retomar com:** "continuar".


---

## 24. Sessão 27/08/2026 (9ª) — E4 escrito, e a decisão que tirou todo bloqueio do produto

**Escopo funcional 7 de 8.** `escopo/E4_INDICADORES_E_SEGURANCA.md` escrito: as três camadas, os
níveis de segurança, 17 gatilhos com camada/nível/mensagem, limiares de balanço, produtividade
contra a máquina, previsão de comportamento e direção de ajuste com o preço.

### A decisão do Mestre — 27/08/2026

> **Nada trava, nada bloqueia, nada exige liberação. O resultado é sempre entregue, por mais absurdo
> que seja.** É uma calculadora; a função dela é entregar o número, dizendo o que há de errado e de
> quanto. **Limite de máquina não existe por padrão e está fora do MVP** — não vai para o código.

**O que isso derrubou, documento a documento:**

| Documento | O que mudou |
|---|---|
| `escopo/E0` §3.3 · §5 Q1 · §6 C3 · §8.4 | O limite geométrico **deixou de bloquear**. Correção datada de 27/08 dentro da §3.3 |
| `escopo/E4` | Três níveis — `CRÍTICO > ATENÇÃO > NORMAL`. `BLOQUEADO` não existe. Camada `IMPOSSÍVEL` entrega e avisa em crítico |
| `escopo/E2` §4 · §4.1 · §5.3 | Nada é rejeitado no campo, exceto valor ≤ 0 (ausência de grandeza, não limite) |
| `escopo/E5` P11 · P12 · §5.6–§5.8 | Controle não para no limite; **a marca de forçado saiu do produto** — nada estava preso |
| `escopo/E3` §2.3 · exemplo | Marca de forçado → alerta ativo. Nível verde renomeado de `SEGURO` para `NORMAL` |
| `escopo/E1` · `escopo/E6` | Referências a trava e a forçado ajustadas |
| `mvp/` §4.5 · §4.6 · §5.3 · §9.1 · §9.2 · §9.6 · §10 | Mesma regra, e a cadeia de precedência virou `CRÍTICO > ATENÇÃO > NORMAL` |
| `canonicos/CANONICO_LIMITES_E_ALERTAS.md` | Nota de precedência no cabeçalho: **os limiares e as fórmulas continuam valendo; o efeito "bloqueia" saiu**. `ae > D`, rotação acima da máquina e deflexão acima de 2× a tolerância viram alerta crítico |

**Por que a nota no canônico e não uma reescrita:** o canônico é apurado contra fonte. O que a
decisão do Mestre muda é **efeito de produto**, não número — reescrever o corpo apagaria a
procedência sem necessidade.

### Perguntas novas — Q27 a Q29 (as anteriores vão até Q26)

| # | Pergunta |
|---|---|
| Q27 | A força que entra na deflexão é o **pico** por ciclo de dente ou a **média**? |
| Q28 | Abaixo de espessura de cavaco fina a margem do modelo não se sustenta: banda de erro maior declarada, ou marca de extrapolado? |
| Q29 | Rasgo cheio sem o comprimento de aresta informado: qual alvo numérico a mensagem entrega? |

Duas perguntas que o E4 **fechou** sem precisar do Mestre: nenhum balanço pede confirmação
explícita, e a marca de forçado sai do produto — as duas caem por consequência direta da decisão.

**Dois ⧗ continuam abertos no E4**, os mesmos de sempre e por acesso, não por escopo: deflexão em
micrômetros (coeficientes de força) e vida em número (expoente de Taylor).

**Onde parou:** escopo funcional **7 de 8**, com todo o corpo documental já alinhado à decisão de
27/08.

**Próximo passo:** **E7** — o único que falta. Alternativa independente: os documentos de acesso
(Altintas, Machinery's Handbook / ASM Vol. 16, Kops e Vo).

**Arquivos tocados:** `escopo/E4_INDICADORES_E_SEGURANCA.md` (novo), `escopo/E0`, `escopo/E1`,
`escopo/E2`, `escopo/E3`, `escopo/E5`, `escopo/E6`, `escopo/LEIA-ME.md`,
`mvp/MVP_CALCULADORA_PARAMETROS.md`, `canonicos/CANONICO_LIMITES_E_ALERTAS.md`, `HANDOFF.md`.

**Retomar com:** "continuar".

**Commit desta sessão:** `d308753` — E4 + a cascata da decisão de 27/08 em 11 arquivos. Sem push.
**Lição registrada:** `LESSONS.md` L13 — documento consolidador é o que revela conflito entre
documentos, e decisão de produto sobre canônico entra como nota de precedência, não como reescrita.

---

## 25. Sessão 27/08/2026 (10ª) — E7 escrito: o escopo funcional fechou em 8 de 8

**`escopo/E7_ESCOPO_E_FRONTEIRAS.md` escrito.** Era o último por definição — a fronteira de um sistema
só existe depois do interior. Com ele, **a pasta `escopo/` está completa**.

### O que o E7 traz

**Quatro naturezas de fronteira, em vez de uma lista única de "fora de escopo".** É a decisão de
estrutura do documento, e vale registrar a razão: item marcado só como "fora" volta à mesa em toda
revisão, porque ninguém lembra por que saiu — e um item que saiu por falta de dado é confundido com
um que saiu por decisão, o que faz o projeto refazer pesquisa já concluída.

| Natureza | O que espera | Quem move |
|---|---|---|
| **Descartado** (16 itens) | evidência que **derrube a razão escrita** | Mestre |
| **Adiado** (10 itens) | chegar a vez — o escopo já está escrito | Mestre |
| **Bloqueado por dado** (7 itens) | o documento nomeado, aberto na página | ninguém decide |
| **Pendente de decisão** (29 perguntas + A4) | a decisão, em bloco | só o Mestre |

**Todo item carrega três colunas:** natureza, razão e **o que o traria para dentro**. Nenhum item
entrou sem as três.

### O que o documento fechou sem precisar do Mestre

- **As seis questões A1–A6 do `E0` §7 estão fechadas** — cinco em definitivo pelo corte do MVP, e
  **A4** (a altura de fixação mover os parâmetros) fechada **só para a fatia construída**: para o
  produto ela continua aberta e depende do mesmo dado bloqueado (`L15`).
- **O teste de pertencimento** (§2.1) — três critérios que já eram regra em E0 e E5, reunidos como
  critério de fronteira. Reprovar em cada um manda para uma lista diferente. É consolidação, não
  regra nova: o E7 declara explicitamente que **não cria comportamento**.

### Pergunta nova — Q30 (as anteriores vão até Q29)

| # | Pergunta |
|---|---|
| Q30 | **Sincronização entre dispositivos é adiada ou descartada?** É a única função que exigiria conta, e conta é a única coisa que traria de volta a identificação pessoal do operador, hoje descartada. As duas se decidem juntas, ou nenhuma se decide |

Ela nasceu de uma inconsistência real: `E6` §8 marcava os dois itens como "fora de escopo (ver E7)",
sem natureza — e eles têm naturezas diferentes que se amarram uma na outra.

**Onde parou:** **escopo funcional 8 de 8 — completo.** `escopo/`, `canonicos/` e `mvp/` formam a
especificação inteira, e nenhum dos três cita implementação.

**Próximo passo:** duas frentes independentes, e nenhuma é escrita.
1. **Decisão** — levar as **29 perguntas** ao Mestre em bloco (`E7` §6.2). É o que destrava o
   refinamento fino do produto.
2. **Acesso** — obter Altintas, Machinery's Handbook / ASM Vol. 16 e Kops e Vo. É o que destrava
   deflexão em micrômetros e vida de ferramenta em número.

**Arquivos tocados:** `escopo/E7_ESCOPO_E_FRONTEIRAS.md` (novo), `escopo/LEIA-ME.md`, `HANDOFF.md`.

**Retomar com:** "continuar".

---

## 26. Sessão 27/08/2026 (11ª) — o bloco de decisão, triado

**`BLOCO_DE_DECISAO.md` escrito** (raiz de `Docs_inicial/`). É o instrumento que leva as **29
perguntas vivas** ao Mestre — todas com opção A/B/C, a recomendada marcada e **o critério que a
derrubaria**.

**A triagem é o que ele acrescenta.** Levar 29 perguntas de uma vez não é entregar decisão, é
transferir trabalho. Cruzadas com as fronteiras do E7, elas se separam em três:

| Parte | Quantas | O que são |
|---|---|---|
| **Decidir agora** | 10 | Q17–Q22, Q24, Q28, Q29, Q3 — tocam o que vai ser construído |
| **Confirmar** | 3 | Q1, Q2, Q5 — já decididas no corte do MVP; falta promover ao produto |
| **Pode esperar** | 16 | ambiente declarado (Q6, Q23, Q25, Q26), dado bloqueado (Q27), frentes adiadas (Q7, Q8–Q16, Q30). Vão com recomendação preliminar de 1 linha |

**Duas recomendações que mexem no produto:** **Q17** — fixar acabamento convencional como modo único
(o `ap` de partida já é convencional; o que muda é declarar sobre qual estratégia a recomendação
vale). **Q19** — aço acima de 48 HRC **não** ganha entrada de ferramenta: criar uma exigiria fator de
velocidade que ninguém publicou, e o mecanismo certo é o material com linha própria por tratamento.

**Correção de contagem:** são **29 vivas**, não 30 — a Q4 ficou prejudicada e continuava sendo somada.
Ajustado em `E7`, `LEIA-ME`, `HANDOFF` e no bloco.

**Onde parou:** escopo funcional completo (8/8), e o bloco de decisão pronto para resposta.

**Próximo passo:** a resposta do Mestre à **Parte 1** do bloco. Cada decisão substitui o marcador
`⚠ NÃO DEFINIDO` no documento que a levantou, e entra no MVP onde tocar o que vai ser construído.
Frente independente, sem depender da resposta: obter Altintas, Machinery's Handbook / ASM Vol. 16 e
Kops e Vo.

**Arquivos tocados:** `BLOCO_DE_DECISAO.md` (novo), `escopo/E7_ESCOPO_E_FRONTEIRAS.md`,
`escopo/LEIA-ME.md`, `LESSONS.md` (L14), `HANDOFF.md`.

**Retomar com:** "continuar".

---

## 27. Sessão 27/08/2026 (12ª) — as 13 decisões aplicadas, a regra de alerta, e a nomenclatura

**Feito, em três commits (todos com push):**

1. **`dd8ca4f` — as 13 decisões do bloco (Parte 1 + Parte 2).** Q17 sem seletor de estratégia · Q18
   revestimento **fora do produto** (E1 §5 virou stub; `MDr` colapsou em `MD` em E1 e MVP) · Q19/Q20
   material como outro qualquer, com adicionar/editar/remover livre (inclusive de fábrica) · Q21
   rosca por passo+diâmetro · Q22 famílias fora do fresamento não herdam envelope · Q24 só mm,
   vírgula e ponto · Q28 marca de extrapolado até `hex` = 0,1 mm · Q29 dissolvida · Q1/Q2/Q3/Q5
   fechadas, com Q1/Q2/Q5 promovidas ao produto inteiro. Marcadores `⚠ NÃO DEFINIDO` das 13
   substituídos em E1–E5; E7 §6.2 consolidado (13 fechadas / 16 abertas); MVP e canônicos
   propagados.

2. **14ª regra, confirmada pelo Mestre:** *o alerta descreve o risco e situa o valor — não instrui.*
   Reescreveu E4 §1–§3, E5 §9, o canônico de limites e o §9 do MVP. **Fator de segurança** movido de
   adiado → única config sobre o resultado, sempre disponível (E2 §7, E7 §4).

3. **`3b0b1ca` — nomenclatura.** `GLOSSARIO_DE_TERMOS.md` (novo). Nos textos de escopo/mvp o **nome da
   indústria vem primeiro**, símbolo entre parênteses; fórmulas e tabelas densas mantêm o símbolo.
   Renomes: incremento por passe → **profundidade de corte (ap)**; engajamento radial / largura de
   corte → **penetração de trabalho (ae)**; altura de fixação → **balanço (L)**. E0–E7 + MVP
   varridos; os 6 canônicos ganharam nota no cabeçalho.

**Aguarda decisão do Mestre:** os blocos **"o que mexer"** (`E4` §6, `MVP` §7.4) entregam direções no
imperativo e estão **EM REVISÃO** contra a regra 2 — transformar (mostrar só como cada grandeza
responde) ou remover. Nota menor: `E0` §64 ("Direcionadora") foi reescrita para "Situa o valor".
*(Resolvido na seção 31 — 28/08: o painel orienta com verbo, em tom educativo.)*

**Onde parou:** escopo 8/8, MVP e canônicos consistentes com as 13 decisões e com a nomenclatura
nova. `HANDOFF`, `LESSONS` e `escopo/LEIA-ME` ainda não varridos pela nomenclatura (docs de sessão).

**Próximo passo:** decisão sobre E4 §6 / MVP §7.4; obter os três documentos de acesso; Parte 3 do
bloco quando a frente adiada correspondente começar.

**Arquivos tocados:** `escopo/E0`–`E7`, `mvp/MVP_CALCULADORA_PARAMETROS.md`, os 6 `canonicos/`,
`BLOCO_DE_DECISAO.md`, `escopo/LEIA-ME.md`, `GLOSSARIO_DE_TERMOS.md` (novo), `LESSONS.md` (L15),
`HANDOFF.md`.

**Retomar com:** "continuar".

---

## 28. Sessão 27/08/2026 (13ª) — revisão do bloco e a skill do corpus de dados

**Feito:**

1. **Revisão da documentação da sessão anterior.** As 13 decisões, a regra de alerta e a nomenclatura
   conferidas contra `escopo/`, `mvp/`, `canonicos/` e o bloco: contagem 13+16=29 bate, Q18 aplicada
   em cascata sem sobra, fator de segurança fora dos adiados, nenhum imperativo restou nos alertas.
   **Um defeito real corrigido** (`097a389`): no `BLOCO_DE_DECISAO.md` o ✅ continuava sobre a
   recomendação em **Q18 e Q29** — as duas em que o Mestre decidiu diferente. Opção A rebaixada para
   *recomendada, não escolhida*, com bloco de decisão acima do texto antigo. As outras 11 conferidas
   uma a uma: batem.

2. **Skill `dados-industria-cnc`** criada (global, `~/.claude/skills/`): compila, valida e audita
   dado técnico da indústria disperso. Regra-mãe: *valor sem procedência não entra*. Quatro modos
   (inventariar · compilar · auditar dataset · auditar documento) e três referências —
   `calculavel-vs-empirico.md` (gerar tabela por fórmula normativa em vez de copiar, e as 3 faixas de
   licença), `procedencia.md` (12 campos por valor, 5 rótulos de confiança), `auditoria.md` (5
   verificadores, com os defeitos batizados: dígito trocado, constante órfã, precisão inventada).

3. **Plano da etapa 0** em `PLANO_DADOS_INDUSTRIA_CNC.md` (`e9ccba5`): inventário das fontes
   dispersas em 6 projetos. Escopo definido pelo Mestre: **amplo** — corte, custo/produção e código G.

**Achado da varredura preliminar (read-only, nada movido):** `ToolOptimizerCNC/src/data/materials.ts`
(kc1.1, mc, faixas de vc) com fonte em `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md` — que existe
em **duas cópias de tamanhos diferentes** · `monetizaCNC/ativos/docs_usinagem/_entrada/` com ~40
arquivos de chão de fábrica (Roscas.xlsx, tabelas de rosca, parâmetros CAB50, brocas) **sem
procedência** · conflito: `materials.ts` fixa `kc1.1 = 1800` como ponto onde os canônicos têm faixa.

**Onde parou:** skill pronta, plano commitado, inventário **não executado**.

**Próximo passo:** rodar o **modo 1** da skill — o inventário. Segue aberto da sessão anterior: a
decisão sobre `E4` §6 / `MVP` §7.4 e os três documentos de acesso.

**Arquivos tocados:** `BLOCO_DE_DECISAO.md`, `PLANO_DADOS_INDUSTRIA_CNC.md` (novo), `HANDOFF.md`,
`LESSONS.md` (L16), e a skill global `dados-industria-cnc` (fora do repo).

**Retomar com:** "continuar".

---

## 29. Sessão 27/08/2026 (14ª) — auditoria dos documentos técnicos (skill `dados-industria-cnc`, modo 4)

**Feito:**

1. **Auditoria independente do plano** (`PLANO_AUDITORIA_DOCUMENTOS_TECNICOS.md`). Modo 4 confirmado
   como certo, método fiel aos 5 verificadores, formato do relatório fiel à skill. **Dos 11 achados
   da amostra: 7 confirmados, 0 refutados, 4 imprecisos.** Plano corrigido: `escopo/E3` entrou no
   escopo (carrega fórmula e exemplo resolvido), `BLOCO_DE_DECISAO.md` virou consulta, a monotonia de
   `kc1.1`×material saiu (material não é série ordenada), e `De` entrou na lista de símbolos
   reaproveitados.

2. **Auditoria executada** — `AUDITORIA_DOCUMENTOS_TECNICOS.md` (novo, 674 linhas). 12 documentos,
   4.198 linhas, toda tabela numérica recalculada célula a célula. **32 achados: 3 graves, 17 médios,
   12 leves**, mais 4 perguntas. Documentos-fonte intocados.

**Os 3 graves:** (a) `MOTOR:71`+`:73` — o travamento `φmax = π/2` vale para o fator de afinamento e
não para `hm`, que consome o mesmo `φmax`: acima de `ae/D` 0,785 sai `hm > fz` (impossível) e `Pc`
−11% em rasgo cheio, violando a invariante do próprio §1.6. `§1.1` e o MVP não travam. (b) `MOTOR:114`
× `mvp:1403` — as duas tabelas de `kc1.1` divergem em 5 materiais (Ti-6Al-4V **+87%**), e é o MVP que
carrega os valores sem fonte. (c) `mvp:833` — a família Roscar inteira recebe `Vf = P × n`, mas a
Fresa de Rosca avança por dente (`§3.2:335`): **fator 10**.

**Correção de diagnóstico:** o `γ` do `MVP` §6.7 **não** é defeito — está certo e declarado. A
contradição é interna ao MOTOR (`:59` usa `γ` onde a prosa diz `(γ − γ0)`; `:74` aplica a referência
fixa, `kc` 6% baixo em todo material). A prova está no próprio documento: o "4,5%" da `:63` só sai
calculando sobre `(γ − γ0)`.

**Onde parou:** relatório entregue, nenhum documento corrigido — o que fazer com cada achado é
decisão do Mestre.

**Próximo passo:** decidir os 3 graves (o travamento do `φmax`, qual tabela de `kc1.1` é a fonte, e o
avanço da fresa de rosca). Opcional já previsto no plano: abrir issue no GitHub por achado
grave/médio. Segue pendente da 13ª sessão: o **modo 1** (inventário dos 6 projetos).

**Arquivos tocados:** `AUDITORIA_DOCUMENTOS_TECNICOS.md` (novo), `PLANO_AUDITORIA_DOCUMENTOS_TECNICOS.md`,
`HANDOFF.md`, `LESSONS.md` (L17).

**Retomar com:** "continuar".

---

## 30. Sessão 27–28/08/2026 (15ª) — auditoria de prontidão para MVP, e reconciliação da auditoria técnica (passos 1–3 de 5)

**Como a sessão começou e virou:** o Mestre pediu uma nova rodada da skill `dados-industria-cnc`.
Escolhi o **modo 1 (inventário)** e varri 6 projetos read-only → `INVENTARIO_DADOS_INDUSTRIA.md`.
**Ele não autorizou varrer outros projetos** (lição `L18`). O pedido virou: **auditar se a doc do
Fenix basta para construir o MVP**, e depois **reconciliar o que a auditoria de 27/08 achou**.

### 30.1 Auditoria de prontidão — `AUDITORIA_PRONTIDAO_MVP_2026-08-27.md` (novo)

Skill `mvp-audit`, 9 dimensões. Veredito: **🔴 Não pronto — 4 bloqueantes**, todas contradição
entre documentos já escritos, todas localizadas linha a linha. 2 dimensões completas (escopo do MVP,
problema), 7 parciais. O relatório traz a matriz, o plano de ação em 7 passos e as suposições.

### 30.2 Reconciliação — passos 1 a 3 de 5 (feitos nesta sessão)

**Decisões do Mestre nesta sessão:** A2 — sincronizar `MVP` §11.1 ao canônico (titânio `2800/0,22`
→ `1500/0,25`, ~−43% na potência; os 5 materiais sem fonte agora com par Walter, editáveis).
P1–P4 da auditoria: aceitas como propus (Vc alvo; piso de `fz` sai como física / fica como escala;
`ae/D` da esférica no nominal com nota de aproximação; `E3` = produto completo).

| Passo | O que foi feito | Achados |
|---|---|---|
| **1 — 3 graves** | `φmax` destravado no `hm` (`MOTOR` §1.4); `MVP` §11.1 sincronizado ao canônico; família Roscar partida em macho (`Vf=P·n`) × fresa de rosca (`Vf=fz·Z·n`) | A1, A2, A3 (+A15, A21) |
| **2 — 14 médios** | correção de `γ` sobre `(γ−γ0)`; `Pc`/`Pm` separados no LIMITES; extrapolado gatilha em `hm`; escala de controle ≠ trava; `Vc_min/max` → `Vc_partida`; `⧗ AGUARDA R2` fechado; verbos de comando residuais → descrição; fator de desgaste `1,1–1,3` → `SEM FONTE`; `De` (corte) × `Deq` (canalizada) separados; `L/D` de furo → "profundidade > 3×D"; teto de `ap` `0,8×D`→`1,0×D`; janela de Co 6–11%; NPL massa×volume | A4–A20 (menos A18) |
| **3 — E3 + E5** | `E3`: nota de escopo (produto completo, MVP corta perfil de máquina/fator de segurança/operação); **exemplo §3.1 refeito** (A18); "marca de estimativa" removida (→ editado/extrapolado); `CTF` é leitura não compensação. `E5`: nota de escopo + "nada trava"; estado "Estimado" → "Editado"; controle de agressividade marcado fora do MVP | B3, I3, A18 |
| **A20** | 2 geometrias de nicho (chanfrar, faceador) sem partida de `ae` — dei defaults padrão editáveis, marcados provisórios | A20 |

**As 4 bloqueantes da auditoria estão resolvidas.**

### 30.3 O que falta da reconciliação (passos 4–5) — não trava código

> ✅ **Passos 4 e 5 concluídos em 28/08 — ver seção 32.**

- **Passo 4 — 12 leves** (A22–A32, menos A21/A22/A31 já feitos): `/4` da MRR de furação sem
  comentário, nota "[arccos em radianos]" perdida no `MVP`, `rβ`/`r_e`/`rε` grafias, "dobrar 3→4",
  tabela de roscas × fórmula (M8/M12), `Dmin` fora do glossário. ~10 edições de 1 linha.
- **Passo 5** — `QUESTOES_ABERTAS_CONSTRUCAO.md` (diz 3 canônicos faltando — os 6 existem; Q4/L6
  fechadas em 27/08) e `HANDOFF.md` com 2 seções "## 10".

### 30.4 Onde parou

**Escolha do Mestre pendente:** (A) fazer passos 4–5 agora, ou (B) pular pro scaffold + 1ª fatia
vertical (aço 1045 + fresa de topo). Recomendei A. → **Mestre escolheu A; feito na seção 32.**

**Aberto e não tocado:** acesso a Altintas / Machinery's Handbook / Kops e Vo; Parte 3 do bloco
(16 perguntas). *(A decisão sobre `E4` §6 / `MVP` §7.4 foi feita depois — seção 31.)*

**`INVENTARIO_DADOS_INDUSTRIA.md`** ficou no repo, **não commitado** — o Mestre disse "teu pra
apagar". Decidir manter ou apagar.

### 30.5 Arquivos tocados

Reconciliação (12): `canonicos/CANONICO_{MOTOR,LIMITES,DEFLEXAO,FERRAMENTAS,GEOMETRIA}_*.md`,
`GLOSSARIO_DE_TERMOS.md`, `escopo/E{1,2,3,4,5}_*.md`, `mvp/MVP_CALCULADORA_PARAMETROS.md`.
Novos: `AUDITORIA_PRONTIDAO_MVP_2026-08-27.md` (commitado), `INVENTARIO_DADOS_INDUSTRIA.md` (não).
`HANDOFF.md`, `LESSONS.md` (L18).

**Retomar com:** "continuar".

---

## 31. Sessão 28/08/2026 (16ª) — o painel "o que mexer" resolvido

**Decisão do Mestre:** a 14ª regra (*"o alerta não instrui"*) é **do alerta** — a informação que o
sistema empurra sem o operador pedir. O painel *"o que mexer"* (`E4` §6 / `MVP` §7.4), que o operador
**abre para pedir** direção, é a exceção deliberada: **verbo de orientação permitido**, em **tom que
ensina** (não que manda), com o objetivo dito na **linguagem de chão de fábrica** ("para usinar mais
rápido"; "a peça fica pronta antes — ~40% mais material por minuto") e **nunca em unidade técnica**
("a MRR sobe de 8,0 para 11,3 cm³/min"). O que se perde fica na mesma linha do ganho.

Minha primeira proposta — estender a regra do alerta ao painel, tirando o verbo — foi recusada:
esvaziava o bloco (`L19`).

**Editado (7 arquivos, nenhum número tocado):**
- `escopo/E4` — cabeçalho e fim da §1 (a regra é do alerta); §6 sai de `EM REVISÃO`; regras 1–2
  reescritas (objetivo primeiro, na língua do operador); exemplo §6.1 refeito no tom novo
- `mvp/MVP` — §7.4 sai de `EM REVISÃO`; regras e exemplo alinhados ao `E4`; §7.6 — bloco "O QUE
  MEXER" preenchido com direção real + rótulo `RESULTADOS ÚTEIS` na Z7; texto pós-exemplo. **Straggler
  achado e corrigido:** §2.3 Z2 ainda dizia *"seguida do que fazer a respeito"* / *"toda mensagem
  carrega alvo numérico"* — texto pré-14ª-regra, agora alinhado ao `E5` Z2
- `escopo/E7` · `escopo/E0` §3.1 · `BLOCO_DE_DECISAO.md` Q29 — nota de que a 14ª regra é do alerta e
  o painel é a exceção
- `LESSONS.md` — `L19` (regra de um artefato não se estende a outro por semelhança; tom técnico não
  é neutro)

**Não desfez a 14ª regra nos alertas** — `E4` §1–§3, `E5` §9, canônico de limites e `MVP` §9 seguem
como estavam.

**Onde parou:** decisão do `E4` §6 fechada. Segue pendente a escolha **(A)** passos 4–5 da
reconciliação **(B)** scaffold direto — o Mestre ainda não respondeu.

**Retomar com:** "continuar".

---

## 32. Sessão 28/08/2026 (17ª) — passos 4–5 da reconciliação: a doc fechou

**O Mestre escolheu A.** Com isto, os **32 achados** da auditoria técnica de 27/08 estão todos
tratados e a documentação não tem mais pendência interna.

### 32.1 Passo 4 — os 9 achados leves restantes (A23–A30, A32)

| Achado | O que era | Correção |
|---|---|---|
| **A23** | `CANONICO_VELOCIDADES` usava `r_e` para raio de aresta — colide com `rε` (raio de ponta) do glossário | `r_e` → `rβ` em todo o canônico (8 ocorrências) |
| **A24** | `hex` escrito em duas formas (MOTOR × LIMITES/MVP), equivalência declarada longe | nota em `CANONICO_MOTOR` §1.1: as duas formas são algebricamente idênticas (`1−(1−2ε)² = 4(ε−ε²)`) |
| **A25** | `Q = (D·fn·Vc)/4` da furação sem explicar o `/4` | nota no `MVP` §6.8: o `/4` condensa `πD²/4`, o cancelamento do `π` e a conversão mm³→cm³ |
| **A26** | cópia de `hm` no `MVP` §6.7 perdeu `[arccos em radianos; κ = ângulo de posição]` | legenda recolocada |
| **A27** | microfresa: `+266%` de espessura mínima (ponta alta de uma faixa) | → `+120% a +270%` em `CANONICO_FERRAMENTAS` |
| **A28** | `CANONICO_VELOCIDADES` §1.2: "quase 5× menor" não sai de nenhuma conta | trocado por "+10% aplicado contra +60% a +78% publicado" |
| **A29** | `MVP` §6.11: `Ø = D − P` da rosca escrito como igualdade; tabela §11.4 diverge em M8/M12 | `Ø ≈ D − P`; nota de que a tabela (broca de norma) vence onde diverge |
| **A30** | "dobrar `L/D` de 3 para 4" (3→4 não é dobro) em `LIMITES`, `MVP`, `E4` | "dobrar" → "passar" nos três |
| **A32** | Fresa de Chanfrar usa `(Dmin+Dmax)/2` e não aparecia na tabela de `De`; `Dmin` fora do glossário | linha nova na tabela `De` do `MVP` §6.2; `Dmin/Dmax` no glossário |

### 32.2 Passo 5 — os 2 docs de estado

- **`QUESTOES_ABERTAS_CONSTRUCAO.md`** — Q2 marcada `FECHADA — prejudicada` (os 6 canônicos existem;
  o que resta é a condição "números num lugar só", que entra no scaffold); Q4 marcada `FECHADA`
  (decisão Q28 do bloco, 27/08); cabeçalho atualizado — **só a Q3 segue aberta**. A pendência de
  reconciliação do E0 que a última seção listava foi marcada como feita.
- **`HANDOFF.md`** — a segunda "## 10" (Sessões 18–20/08) virou **"## 10-bis"**, com nota de que as
  citações a "`HANDOFF.md` §10" em `VALIDACAO_R6.md` apontam para ela.

### 32.3 Onde parou

**Documentação 100% consistente.** Nenhuma pendência de decisão, nenhum bloqueio.

**Próximo passo:** construção — scaffold (núcleo TS isolado, Vite, Vitest, `src/data/` por canônico,
as 2 invariantes do `MVP` §13.2 como teste falhando) e depois `/to-tickets` sobre a fatia vertical da
**Q3** (aço 1045 + fresa de topo) — **a Q3 ainda pede o "pode seguir" do Mestre sobre o recorte da
fatia**. Desenho de tela em paralelo, não antes.

**Independente, sem depender disso:** acesso a Altintas / Machinery's Handbook / Kops e Vo; Parte 3
do bloco (16 perguntas).

**`INVENTARIO_DADOS_INDUSTRIA.md`** segue no repo, não commitado — decidir manter ou apagar.

### 32.4 Arquivos tocados

`GLOSSARIO_DE_TERMOS.md`, `canonicos/CANONICO_{MOTOR,LIMITES,VELOCIDADES,FERRAMENTAS}_*.md`,
`escopo/E4_INDICADORES_E_SEGURANCA.md`, `mvp/MVP_CALCULADORA_PARAMETROS.md`,
`construcao/QUESTOES_ABERTAS_CONSTRUCAO.md`, `HANDOFF.md`.

**Retomar com:** "continuar".

---

## 33. Sessão 28/08/2026 (12ª) — o desenho de tela destravou: brief e design system

**Pedido:** começou como "procure a skill de mvp" e virou a frente de tela inteira. Fecha o achado
**I1** da auditoria de prontidão (*"nenhum desenho de tela · onde deveria viver: doc novo em
`construcao/`"*), que estava inalterado desde 27/08.

### 33.1 O que ficou pronto

| Arquivo | O que é |
|---|---|
| `construcao/BRIEF_DESIGN_INTERFACE.md` | Brief de design **autossuficiente** (não depende do repo) para entregar a um agente externo de UI/UX. 12 seções: usuário, ambiente, situações de uso, inventário completo de informação com peso de decisão, volumetria, comportamento no tempo, 15 regras invioláveis, **12 tensões deixadas sem resposta de propósito**, 12 critérios de sucesso, vocabulário obrigatório, 18 anti-requisitos |
| `construcao/DESIGN_SYSTEM_FENIX.md` | Design system tema claro, enxuto, herdado de `ToolOptimizerCNC/docs/design/DS_TEMA_CLARO.md`. Tokens, rampa única de estado, tipografia local, 4 primitivos, contrastes verificados, bloco CSS pronto |
| `construcao/design-system-fenix.html` | Folha de verificação visual do DS, construída com os próprios tokens que documenta. Publicada como artifact |

### 33.2 A regra que organizou o brief

**Toda decisão de painel já tomada foi traduzida de volta na razão que a originou, e a decisão foi
descartada.** *"Painel persistente, nunca assistente"* virou *"o ciclo é repetido dezenas de vezes por
dia; todo custo de interação é pago em toda repetição"*. As zonas `Z1–Z8`, o arranjo de duas colunas,
o colapso e o destaque de herói **não entraram** — o painel do Fenix é refeito do zero.

O apêndice do brief lista o que foi omitido e por quê, para conferência.

### 33.3 O que veio do ToolOptimizer, e o que não veio

**Veio:** a regra *"marca é moldura · trabalho é cinza · cor é estado"* (ISA-101), as três superfícies,
os três níveis de tinta, a rampa única de estado com contrastes já medidos, pilha de fonte local sem
rede, 44px/56px de toque, e os primitivos de campo, escolha segmentada, ação e revelação ARIA.

**Não veio:** `DASHBOARD.md`, os mockups HTML, o gauge de meia-lua, a barra de estado por parâmetro,
o tema escuro inteiro com glassmorphism e neon, e o roxo/laranja de identidade de parâmetro. A §8 do
DS registra item por item, para ninguém ir buscar de novo.

**Quatro adaptações, não cópias:**

1. **Marca de origem** (`extrapolado` · `editado` · `manual`) ganhou regra nova: texto neutro,
   **proibido** usar a rampa de estado — senão vira leitura de severidade.
2. **Desatualizado** não usa `opacity` (derruba o contraste abaixo do mínimo): cai de `--tx-1` para
   `--tx-3` mais marcador textual.
3. **Estado desabilitado foi removido do sistema.** Nada trava no Fenix e campo que não se aplica não
   existe — o token não tinha uso legítimo.
4. **Revelação:** ficou a mecânica ARIA, saiu o *"um por vez, painel flutuante de 280px"* — colide com
   a exigência de comparar dois parâmetros lendo os dois. A forma é decisão do painel novo.

### 33.4 A marca, provisória

`--brand-fill #E85D04` **mantido do ToolOptimizer**, declarado provisório no DS §5 — Fenix é a versão
nova do mesmo produto, então a família de matiz continua até a marca própria existir. Assinatura
textual `FENIX` em tinta escura sobre placa laranja, porque a regra proíbe laranja como texto (3,5:1
reprova). **O Mestre foi avisado e não contestou; trocar depois custa um token.**

### 33.5 A tentativa no Claude Design falhou, e o diagnóstico

O primeiro prompt gerou resultado "bem estranho". Três causas, todas do prompt:

1. **Pedia 16 a 20 artboards de uma vez** — 3 direções conceituais × 4 telas, mais 4 extras na
   recomendada. A qualidade desaba muito antes disso.
2. **Era quase todo negativo** — 15 regras mais 18 anti-requisitos mais dois padrões proibidos. O
   modelo gasta o orçamento evitando em vez de desenhar.
3. **Não tinha design system anexado** — o prompt foi escrito antes de o DS existir, então a
   linguagem visual foi inventada na hora.

**Prompt v2 entregue:** uma tela por vez, começando pelo caso difícil (resultado com alerta ativo,
desktop), com os dois documentos anexados, conteúdo literal travado, tese de layout pedida em 3
linhas **antes** de desenhar, e só quatro regras duras.

### 33.6 Onde parou

**Aguardando o Mestre rodar o prompt v2 no Claude Design.** Pergunta em aberto, para afinar o prompt:
o "estranho" foi **(A)** visual genérico · **(B)** número ou rótulo inventado · **(C)** regra ignorada
(gauge, cor fora do token) · **(D)** layout quebrado. Se for **B**, apertar o travamento de conteúdo;
se for **A**, o DS anexado resolve sozinho.

**Pendência menor, oferecida e não feita:** `construcao/QUESTOES_ABERTAS_CONSTRUCAO.md` ficou
desatualizado — o título diz "questões abertas" mas 3 das 4 estão fechadas, e a pendência de desenho
de tela que ele lista foi endereçada hoje.

**Inalterado:** a **Q3** continua pedindo o "pode seguir" sobre o recorte da fatia vertical, e o
scaffold continua sendo o próximo passo de código.

### 33.7 Arquivos tocados

`construcao/BRIEF_DESIGN_INTERFACE.md` (novo), `construcao/DESIGN_SYSTEM_FENIX.md` (novo),
`construcao/design-system-fenix.html` (novo), `HANDOFF.md`, `LESSONS.md`.

**Retomar com:** "continuar".

---

## 34. Sessão 28/08/2026 (18ª) — o protótipo visual: o painel existe

**Pedido:** "segunda fase — crie o protótipo visual; ele será o contrato visual canônico".
Desenhado direto contra `BRIEF_DESIGN_INTERFACE.md` + `DESIGN_SYSTEM_FENIX.md`, sem passar por prompt
externo — o que fecha por outro caminho a pendência que a §33.6 deixou aberta.

**Publicado:** https://claude.ai/code/artifact/2a248b7c-80e8-412f-b1d9-5bd08bedde89

### 34.1 Os cinco quadros

| Quadro | O que fixa |
|---|---|
| `Main` (1440) | Resultado com **ATENÇÃO** ativo — o caso difícil, como a §33.5 mandava |
| `Vazio` (1440) | Antes do primeiro cálculo: **nenhum número**, e os campos da geometria ainda não existem |
| `Celular` (390) | A mesma capacidade reorganizada — nada cortado (R13) |
| `Procedencia` (1000) | Parâmetros usados · verificação · a conta da rotação com fonte |
| `Estados` (1080) | **A parte canônica:** alerta em 3 níveis, erro de digitação, marcas de origem, desatualizado, reconfiguração de campos |

Todo número vem do `MVP` §7.6 / §7.7 / §11.1 (aço 1045 · toroidal Ø10 r1,0 Z4 L30). **Nenhum inventado.**

### 34.2 A tese do painel — as tensões da §9 do brief, resolvidas

| # | Como ficou |
|---|---|
| **T1 · T12** | **Duas colunas persistentes** — montagem à esquerda, leitura à direita — em ordem vertical que **nunca reflui**: alerta → os dois números → o que vai acontecer → o que mexer → resultados úteis → detalhes. O operador aprende posição, não navegação; comparar duas condições não custa ida e volta |
| **T2** | **O que se digita na máquina é o único que se digita na tela.** Os dois números de comando são a única superfície de 32px **e** os únicos campos editáveis do resultado. A espessura de cavaco não é transcrita e mesmo assim é o alerta mais importante — por isso ela sobe pela **linha de alerta, acima do par**, não por tamanho de fonte |
| **T3** | **O número É o gatilho.** Nenhum ícone de procedência por valor: todo número com sublinhado pontilhado abre um **destino único**, já posicionado na linha dele. Um gatilho por número seriam 15 ícones; um destino por tela é um |
| **T4** | Prosa em coluna de ≤ 62 caracteres dentro do mesmo cartão da grade; as duas direções de "o que mexer" lado a lado, cada uma com o preço na mesma unidade de leitura |
| **T6** | A ajuda de quatro partes **empurra a coluna**, embaixo do controle — não flutua, não sobrepõe, e mais de uma fica aberta |
| **T7** | Três tratamentos distintos e visíveis na folha de estados: aceito-com-crítico (banda), erro de digitação (borda crítica no campo + correção escrita, **sem mover o nível**), e campo vazio |
| **T8** | Material + os 5 dados ficam **sempre visíveis** na coluna esquerda; a linha de contexto no topo é a conferência de relance |
| **T9 · T13** | Celular: controles sobem para logo abaixo dos dois números; montagem desce para revelação. Zero função removida |

### 34.3 A revisão achou 5 defeitos meus — todos de regra do próprio brief

`#000000` no hover (cor fora dos tokens) · "L/D" abreviado no celular e "Força específica" em
`Estados` (§11 proíbe encurtar) · **um número inventado** (1740 N/mm² no exemplo de dado editado →
trocado por 1800, topo da faixa que o `MVP` §11.1 nomeia) · "as 27 do catálogo de aço 1045" (os 27
são o catálogo inteiro, não o filtrado). Todos corrigidos e republicados. Ver `L21`.

### 34.4 Onde parou

**Aguardando o Mestre olhar o painel.** Uma pergunta em aberto, deixada de propósito sem invenção:
**altura de crista** não entrou nos resultados úteis. O `MVP` §7.2 diz que ela aparece "só em ponta
curva", e a toroidal r1,0 é ponta curva — mas o exemplo canônico §7.6 não a lista e o valor não
existe em documento. Se ela entra, são 8 resultados úteis em vez de 7.

**Inalterado:** a **Q3** continua pedindo o "pode seguir" sobre o recorte da fatia vertical, e o
scaffold continua sendo o próximo passo de código.

### 34.5 Arquivos tocados

`construcao/prototipo/` (novo): `Main.dc.html`, `Vazio.dc.html`, `Celular.dc.html`,
`Procedencia.dc.html`, `Estados.dc.html`, `canvas.json`, `painel-fenix.html`.
Mais `HANDOFF.md`, `LESSONS.md`.

**Retomar com:** "continuar".

---

## 35. Sessão 29/08/2026 (19ª) — o protótipo criticado: duas rodadas, e o plano de revisão

**Pedido:** rodada 1 — "critique o protótipo contra o padrão" (crítica independente, sem invenção,
ancorada no brief + DS + MVP). Rodada 2 — o Mestre trouxe 5 grupos de crítica próprios; análise de
cada um contra as melhores práticas de UI/UX e contra as decisões já registradas.

**Dois documentos novos em `construcao/`:**

| Arquivo | O que é |
|---|---|
| `CRITICA_PROTOTIPO_PAINEL_2026-08-28.md` | Crítica independente. 4 blocos: **A** violação de regra verificável (11) · **B** tensão mal resolvida (9) · **C** o que contexto/mercado mostram e o desenho não viu (7) · **D** o que está certo (12) |
| `ANALISE_CRITICAS_MESTRE_PAINEL_2026-08-28.md` | Análise dos 5 grupos de crítica do Mestre + a decisão do `ap` |

### 35.1 A crítica independente — o que muda o desenho

> **Revisado em 29/08/2026** (20ª sessão) — os 44 itens reabertos contra a fonte, com varredura por
> comando e recálculo das fórmulas. Resultado: **31 confirmados · 12 imprecisos (corrigidos no
> lugar) · 1 retirado · 4 achados novos**. Nenhuma decisão D1–D5 abalada. Os números abaixo já são
> os corrigidos; o detalhe de cada correção está nos dois documentos.

**Bloco A (regra, verificável):**
- **R3 meio-ligada** — **12 de 45** números exibidos no `Main` têm procedência (a contagem original,
  "~10 de 15+", errava os dois termos: o denominador vinha da tese do `canvas.json`, não da tela).
  Os dois números de comando (no `Main`), o bloco "o que mexer", as 5 constantes do material e a
  geometria **não têm caminho nenhum**. E `kc1.1`/`mc`, que produzem o resultado, não aparecem em
  lugar nenhum do lado do resultado (§7.5).
- **R9 + R10** — o número-gatilho de procedência não é alvo de 44px nem tem caminho de teclado
  demonstrado.
- **`Celular.dc.html` não tem "Calcular"** (§2.5 / §7.1: "nunca some").
- **"Sem fonte publicada" na tela** (`Procedencia:81`) — MVP §0.2 diz que é rótulo do documento,
  não da tela — e ainda colorido com a rampa de estado (DS §2.5).
- **`.rule` a `max-width:78ch`** (`Estados:38`) — o teto do DS §4.5 é 70ch.
- **Os controles não mostram faixa recomendada nem barra de desvio** (§5.3 r3, §5.4).
- **Os 5 dados do material não têm caminho de volta** — sem `⟲` individual, sem "reverter todos",
  sem a marca **editado** (brief §5.2 r1-r3; é "um dos pontos mais distintivos do produto"). *A
  acusação original de "falta de afordância de edição" caiu na revisão: os cinco já estão em
  `--surface-input`, que é o sinal do DS §2.1.*
- **A marca `extrapolado` que o próprio exemplo exige não está na tela** *(achado novo, A12)* —
  o `Procedencia:62` mostra `hm 0,011 mm`, e o `MVP` §9.2 gatilho 1a + §6.7 mandam marcar como
  extrapolado abaixo de `hm = 0,1 mm`. E, com dois gatilhos ativos, falta a linha "mais uma
  condição ativa" que a folha `Estados` desenha.
- **O `:root` das cinco folhas copia só metade do "bloco pronto" do DS §3** *(achado novo, A13)* —
  faltam os tokens de interação, espaço, raio e tempo, o `:focus-visible` e o
  `prefers-reduced-motion`. É a causa do raio de chip inconsistente e de ~28 espaçamentos fora da
  escala do §2.9.
- **"L/D" sozinho** em `Main:201` e `Celular:127` *(achado novo)* — o §11 proíbe reduzir ao símbolo.
  A correção da §34.3 pegou o L/D do bloco de resultados e deixou o de "o que mexer".
- **O exemplo numérico canônico não sobrevive ao recálculo** *(achado novo, A14 — defeito de
  montante, no `MVP` §7.6, não no protótipo)*: `hex` 0,018 contra 0,036 pela fórmula do §6.4 (fator
  2 ausente) · `MRR` 8,0 contra 1,07 pelo §6.8 · `CTF` 0,42 contra 0,60 · `hm` 0,011 contra 0,019.
  **Com `hex = 0,036` o alerta que o `Main` inteiro encena não dispararia.** Ver `L17`.

**Bloco B (tensão — precisa decisão, idealmente observação com operador):**
- **T5** — a superfície de ajuste não existe no contrato (só digitar; sem trilha, sem arrastar).
- **T3** — número-gatilho vs R9/R10; destino único como view separada = troca de contexto + risco
  de gaveta-dentro-de-gaveta (§2.4 r5).
- **T9 · R13** — só 2 de 3 tamanhos. Sem tablet. Desktop fixo em 1440 quebra a 1366 (24+468+24+
  900+24 = 1440 exatos, zero `@media`). O celular não é "a mesma tela reorganizada": a ordem muda e
  a entrada fica invertida — e isso é **violação direta do `MVP` §2.3**, "empilham em coluna única
  preservando a ordem, configuração acima do resultado". *(O item citava "T13"; o brief tem T1–T12.
  A tensão é T9, que invoca R13.)*
- **T2 · C4** — os dois números de comando idênticos lado a lado; a planilha da fábrica resolve
  melhor com `S`/`F`.
- **T12** — um resultado por vez, sem segurar a condição A pra comparar com a B; regride em relação
  à planilha, e "fica barato" ≠ simultaneidade.
- **T1** — densidade adiada; a ordem fixa taxa o caso "só confirmando" (o comum, §2.1).
- **T4** — os dois blocos de prosa parecem cartões-nota; risco de o operador tratar o Fenix como a
  planilha (pega os dois números, ignora a prosa) — e aí o produto "não vende nada" (§2.4).
- **T11** — com alerta ativo, a direção "previsibilidade" some de "o que mexer" — mas por **rótulo**:
  o `MVP` §7.4 chama o mesmo slot de "Para a ferramenta durar mais" e o protótipo renomeou para
  "Para a aresta voltar a cortar". A saída é devolver o título, não abrir um 3º slot — brief §5.7 e
  `MVP` §7.4 r4 travam em **duas direções, no máximo**.
- **T8** — a linha de conferência de relance mostra o **nome** do material; §4.7 diz que o que
  produz o número são os **dados** dele.

**Bloco D (o que sobrevive):** disciplina de cor (os 23 hex das cinco folhas são **todos** token do
DS §3) · alerta em tinta cheia no desatualizado (razão escrita) · marcas de origem neutras fora da
rampa · a ajuda empurra o conteúdo, várias abertas (T6 resolvido) · nenhum número inventado (todos
rastreiam ao `MVP` §7.6) · estado vazio honesto · estrutura invariável do alerta + "(−40%)" ·
rodapé "recomenda/decide" + ±15–25% · `Estados` §6 embute os próprios anti-requisitos · T10
(reconfiguração) bem feito.

*Quatro itens do bloco D saíram imprecisos na revisão, e o núcleo dos quatro se mantém:* **D1** —
o `:root` não é "cópia do DS §3", é metade dele (ver A13); **D5** — rastreável ≠ correto (ver A14);
**D8** — "vocabulário completo a 390px" tem duas exceções na prosa ("L/D" sozinho); **D11** — o
`.fbox` não é exclusivo dos dois heróis, e há legenda em `Main:176`.

### 35.2 As 5 críticas do Mestre — veredito

| Grupo | Veredito |
|---|---|
| **1 · Materiais** | Objetivo certo (editar ≠ calcular), mecanismo refinado: 5 dados sempre visíveis em leitura; editar por **revelação/gaveta no lugar**, não aba/rota separada (fere P1 "painel persistente"). Preserva marca `editado` + recálculo + `⟲`. |
| **2 · Ajustes** | "Engajamento radial" = penetração de trabalho (`ae`) — **já é o 3º controle**. Para fresa são 3 (`vc·fz·ae`). Texto por controle **já é exigência** (§5.3). |
| **3 · Colapsável** | Config colapsável mostrando os valores = **concordo forte** (a crítica independente apontou a falta, §2.4 já pede). Prosa "o que vai acontecer / o que mexer" colapsada por padrão = **discordo com fundamento** — é a razão do produto (§2.4); a resposta é **comprimir por estado**. |
| **4 · Ferramentas** | Instinto de arquitetura certo (família → tipo → ferramenta, variáveis vinculadas), mas é **pós-MVP por decisão registrada** (§12 "biblioteca de ferramentas — depois do núcleo"). Guardar num ADR; não puxar agora. Guard-rail do §3.1: substrato entra no nome porque muda o cálculo — genérico só para variáveis de instância. |
| **5 · Indicadores** | Necessidade certa (a crítica independente apontou a falta, B1/A7). "Usar o ToolOptimizer como referência" = **errado** — os medidores dele (gauge, ponteiro, índice 0–100, matiz por parâmetro) caíram com razão (R14, §12, DS §1/§8). Forma certa: **posição relativa, não escala absoluta**. |

### 35.3 Decisões desta sessão

| # | Decisão | Âncora |
|---|---|---|
| **D1** | `ap` **fica campo de entrada** (não volta ao bloco de ajuste), com tratamento visual de editável: superfície afundada + marca Partida/Manual + `⟲` | §0.4 #12 mantida (evidência de campo) |
| **D2** | Editar dado de material sai do fluxo de cálculo → revelação/gaveta **no lugar**, não aba/rota | §4.7 / §5.2 preservados: visível, editável, marca `editado`, recálculo na hora |
| **D3** | Blocos de **config** auto-colapsam mostrando os valores; "o que vai acontecer / o que mexer" **não** colapsam — comprimem por estado (NORMAL vira ~1 linha; alerta abre a direção que resolve) | §2.4; §7.3 / §7.4 r5 |
| **D4** | Feedback visual dos parâmetros = **trilha de posição relativa** (faixa recomendada + tick de partida + thumb), nunca escala absoluta / gauge / índice / "% do ideal" | R14; §12; §5.3 r3 / §5.4; não existe "ideal" único (T11) |
| **D5** | Gestão de ferramentas (add/edit/delete) continua **fora do MVP** | §12 |

### 35.4 O que o protótipo precisa mudar — plano (NÃO executado; renumerado na revisão de 29/08/2026)

Bloqueador de montante primeiro, depois regra (mecânico), depois tensão (precisa desenho). Aplicar
numa sessão de `/design`, re-semeando os seis arquivos e republicando na mesma URL.

**Bloqueador — antes de re-semear qualquer folha:**
0. ~~**Corrigir o exemplo canônico do `MVP` §7.6** (A14). Ele não se reproduz pelas fórmulas do
   próprio documento: `hex` 0,018 contra 0,036 (§6.4, fator 2 ausente) · `MRR` 8,0 contra 1,07
   (§6.8) · `CTF` 0,42 contra 0,60 · `hm` 0,011 contra 0,019. **Com `hex = 0,036` o alerta que o
   `Main` inteiro encena não dispara** — todo o desenho do quadro principal depende de qual exemplo
   fica de pé. Abrir issue contra o `MVP`; **não é edição de protótipo nem decisão de tela.**~~
   **Feito em 29/08/2026 (21ª sessão) — ver §36.** A cadeia foi refeita, uma entrada mudou
   (`ae` 1,0 → 0,5 mm) e o exemplo voltou a fechar, agora com **dois** gatilhos ativos (1 e 1a).
   Issue [#3](https://github.com/contatorafaeleleoterio-hub/Fenix/issues/3). **Os números de partida
   da re-semeadura são os do `MVP` §7.6 / §7.6.1 corrigido, não os das folhas atuais.**

**Mecânico — aplica direto:**
1. `Estados.dc.html:38` — `.rule` de 78ch → 70ch.
2. `Procedencia.dc.html:81` — tirar "Sem fonte publicada" da tela; origem em tinta neutra (`--tx-3`).
3. `Celular.dc.html` — incluir "Calcular" persistente (ao pé do bloco "Ajuste", não dentro de gaveta).
4. Cabeçalho / Z1 — ecoar `kc1.1 · mc · vc` de partida, com marca `editado` quando algum mudar.
5. `ap` — marca **Partida**/**Manual** + `⟲` ao lado do rótulo (D1). *Corrigido na revisão: `ap` já
   está em superfície afundada (`Main:88`); o que falta é a marca de estado e o retorno.*
6. Dados do material — `⟲` individual + "reverter todos" + marca **editado** (D2, forma
   leitura↔edição por revelação). *Corrigido na revisão: a superfície de edição já está lá.*
7. SVGs — `stroke` por `currentColor`/`var()`, não hex literal.
8. Ponteiro "há outra condição ativa" → aponta pra "Detalhes e fórmulas" (Z8), não "resultados úteis".
9. `.rule`/prosa — checar todas as folhas ≤ 70ch, **incluindo o `Celular`, que hoje não declara
   medida nenhuma**.
10. **Colar o `:root` do DS §3 inteiro nas cinco folhas** (A13) — tokens de interação, espaço, raio
    e tempo, mais `:focus-visible` e `prefers-reduced-motion`; e trocar raio/espaçamento literais
    pelos tokens.
11. **Raio do chip a 2px** em `Main:52` e `Celular:44` (hoje 4px), uniformizando com os outros
    quatro chips — DS §2.9.
12. **"L/D" por extenso** em `Main:201` e `Celular:127` — "relação balanço/diâmetro (L/D)", §11.
13. **Marca `extrapolado`** na linha de contexto do resultado, em `--tx-3` (A12), com a razão na
    procedência; e a linha de **segunda condição ativa** na banda de alerta. *Depende do item 0: se
    o exemplo mudar, o gatilho ativo muda junto.*
14. **Registrar no DS** a linha "branco sobre `-ink` de estado" em §6 (medido: 7,1–7,3:1, passa) e o
    padrão "chip sólido de nível" em §2.4 — ou renderizar os chips como o DS já especifica (A10).
    *É edição do DS, não do protótipo: pede o "pode seguir" do Mestre.*

**Precisa desenho — decisão do Mestre + idealmente observação silenciosa com operador:**
15. **Trilha por controle** (D4) — sobre a escala que o `MVP` §5.3 já define: faixa recomendada
    (segmento) + tick de partida + thumb de 44px + valor tocável que abre entrada numérica. Resolve
    B1/A7 e o Grupo 5 do Mestre.
16. **R3 completo** — todo número alcança o destino, inclusive os dois heróis e os números de "o que
    mexer" (são 33 sem caminho, de 45). O alvo é a **linha/o campo** de 44px, não o glifo (resolve
    A4 sem perder "um destino").
17. **Breakpoint intermediário (~768–1024)** — o quadro do tablet, hoje inexistente.
18. **Celular** — antes do 1º cálculo, "Montagem" aberta e no topo; depois do cálculo, colapsa pra
    linha de relance com o resultado abaixo. **É `MVP` §2.3, regra escrita** ("empilham em coluna
    única preservando a ordem, configuração acima do resultado"), não só tensão.
19. **Os dois números de comando** — empilhar na vertical no desktop também; adornar com a letra de
    comando (`S` / `F`) **ao lado** do símbolo do §11 (`n`, `vf`), nunca no lugar dele.
20. **`hex` com posição fixa própria** (logo abaixo dos heróis, ou 1º dos resultados úteis sempre) —
    não no grid de 7 células iguais. A medida refeita mostra "resultados úteis" começando em ≈817px,
    **abaixo da dobra de 768px**: hoje o número de verificação mais importante não está no 1º écran.
21. **Comparar duas condições (T12)** — "fixar este resultado" (filete compacto com heróis + `hex` +
    `L/D` da condição A), ou número-fantasma do valor anterior em cada célula.
22. **Prosa comprimida por estado** (D3) — mock do estado NORMAL, que hoje não existe.
23. **"O que mexer"** — empilhado vertical; **devolver o título do objetivo** ao slot que resolve o
    alerta ("Para a ferramenta durar mais", como o `MVP` §7.4 escreve), mantendo a marca "Resolve o
    alerta" (T11). *O "3º slot" da versão anterior saiu: brief §5.7 e `MVP` §7.4 r4 travam em duas.*
24. **Blocos de config recolhidos** — mock do cabeçalho recolhido mostrando os valores (§2.4 r2),
    com as travas r4 (não recolhe com erro) e r6 (trocar ferramenta abre geometria).
25. **Zona Z3 ("resumo da ferramenta")** — o `MVP` §2.3 a define como zona própria da coluna de
    resultado; o protótipo a dissolveu no cabeçalho global (C2).

### 35.5 Ainda em aberto (carregado do §34)

- **Altura de crista** nos resultados úteis da ponta curva — o `MVP` §7.2 diz "só em ponta curva" e
  a toroidal r1,0 é ponta curva; o exemplo canônico §7.6 não a lista e não há valor em documento. Se
  entra, são 8 resultados úteis em vez de 7.
- **Q3** — o "pode seguir" sobre o recorte da fatia vertical (aço 1045 + fresa de topo) segue
  pendente. O scaffold continua sendo o próximo passo de código.

### 35.6 Revisão da crítica — 29/08/2026 (20ª sessão)

**Pedido:** revisar a própria crítica — confirmar o que se sustenta, corrigir o que não, acrescentar
o que ela não pegou. Protótipo não tocado; brief, DS e MVP não tocados (são a fonte).

**Método:** varredura por comando das regras enumeráveis antes de classificar (`L21`) — cores,
`.aud`, vocabulário, medida de linha, tamanhos, raios, espaçamentos, larguras — e **recálculo das
fórmulas** (`L17`). Cada um dos 44 itens reaberto contra `arquivo:linha` / §.

| | |
|---|---|
| **Confirmados** | 31 |
| **Imprecisos** (corrigidos no lugar, achado mantido) | 12 — A1, A4, A6, A8, A9, A10, A11, B2b, B3, B5, B6, B8, C1, C2, C6, D1, D5, D8, D11 *(alguns itens com mais de uma correção)* |
| **Retirado** (a fonte diz o contrário) | 1 — a alternativa de "3 direções" do B8 (brief §5.7 e `MVP` §7.4 r4 travam em duas). Mais duas frases retiradas dentro de itens que ficam: o `QSplitter 60/40` do C1 (zero ocorrências nos arquivos citados) e o "achata a precedência do §7.4 r5" do B7 (a coluna esquerda **é** a primeira) |
| **Achados novos** | 4 — **A12** marca `extrapolado` ausente · **A13** `:root` pela metade · **A14** o exemplo numérico não sobrevive ao recálculo · **"L/D" sozinho** em `Main:201` e `Celular:127` |
| **Decisões D1–D5 abaladas** | **nenhuma.** D1 e D4 tiveram a *justificativa* corrigida; o conteúdo das cinco se mantém |

**O achado que muda a ordem do trabalho:** A14. O exemplo canônico do `MVP` §7.6 — que o protótipo
copiou fielmente, e é por isso que D5 continua verdadeiro — não fecha com as fórmulas do §6.4 e do
§6.8. Com a espessura de cavaco correta (0,036 mm, não 0,018) o alerta que o `Main` inteiro encena
**não dispararia**, e o que dispararia é outro gatilho, pedindo outra marca. Virou o item **0** do
plano da §35.4: issue contra o `MVP` antes de qualquer sessão de `/design`.

**Erro simétrico, como `L10` prevê:** onde `CRITICA` e `ANALISE` divergiam na numeração das regras
do §5.2, quem estava certo era a `ANALISE`. A correção foi na `CRITICA`.

**Pendência que sobrou desta sessão, e não foi fechada:** o
`AUDITORIA_PRONTIDAO_MVP_2026-08-28.md` continua com o veredito original — "0 bloqueantes", "a
cadeia de cálculo do núcleo é **internamente consistente**", dimensão 3 elevada a `Completo`. Essa
conclusão foi emitida **sem recalcular o `MVP` §7.6**: a auditoria refez os 8 números do exemplo do
`E3` §3.1 (que fechavam) e tratou o resultado como prova da cadeia inteira. O defeito real apareceu
um dia depois (A14) e foi fechado na §36 — então **a conclusão hoje é verdadeira**, mas a evidência
que a sustentava não bastava. Isso é `L8`/`L10` na forma de auditoria: a próxima reauditoria vai
herdar a premissa se ninguém marcar. **Falta uma nota de rodapé no documento** dizendo isso, e
rebaixar/requalificar a dimensão 3 com a evidência certa. Não decidido: a escolha entre corrigir a
nota à mão ou rodar `/mvp-audit` de novo ficou sem resposta do Mestre.

### 35.7 Arquivos tocados

`construcao/CRITICA_PROTOTIPO_PAINEL_2026-08-28.md` (novo, revisado em 29/08),
`construcao/ANALISE_CRITICAS_MESTRE_PAINEL_2026-08-28.md` (novo, revisado em 29/08), `HANDOFF.md`,
`LESSONS.md` (L22).
**O protótipo não foi tocado em nenhuma das duas sessões.**

**Retomar com:** "continuar".

---

## 36. Sessão 29/08/2026 (21ª) — o exemplo canônico refeito: a cadeia inteira, e o alerta que muda

**Pedido:** recalcular a cadeia do exemplo do `MVP` §7.6, confirmar ou derrubar o recálculo da
crítica, resolver a consequência de estado, corrigir o §7.6, listar a propagação e abrir a issue.
Item **0** da §35.4 — o bloqueador de montante da sessão de `/design`.

**Escopo tocado:** só `mvp/MVP_CALCULADORA_PARAMETROS.md`. Protótipo, brief, design system e os dois
documentos de crítica não foram tocados — correção de tela é outra sessão.

### 36.1 O que o recálculo confirmou, e o que ele derrubou

A crítica estava certa em quatro dos seis pontos, e incompleta em dois:

| Grandeza | Publicado | Crítica | Recálculo desta sessão |
|---|---|---|---|
| `hex` | 0,018 mm | 0,036 | **confirmado** — falta o fator 2 do §6.4 |
| `CTF` | 0,42× | 0,60 | **confirmado** |
| `hm` | 0,011 mm | 0,019 | **confirmado** |
| `MRR` | 8,0 cm³/min | 1,07 | **corrigido: 1,1** — o §7.2 dá 1 casa à `MRR`, e as casas não são ajustáveis (Q5) |
| `vf` | 1 069 mm/min | "confere" | **derrubado: 1 070** — 1 069 só sai arredondando `n` antes da multiplicação, o defeito que o §6.1 nomeia |
| `Pc` · `Mc` | 0,42 kW · 0,9 N·m | coerentes entre si | **confirmado, e agora com o valor certo: 0,03 kW · 0,1 N·m** |
| `n` · `L/D` · `vc` real | — | conferem | **confirmados** |

### 36.2 A decisão que importa — o exemplo muda de entrada, não de resultado

Com `hex` correto em 0,036 mm o **gatilho 1 do §9.2 não dispara**: 0,036 está acima do piso de
0,030 mm. Sobrava só o **1a** (`hm` < 0,1 mm) — que marca **extrapolado** mas **não tem direção
alcançável**: levar `hm` a 0,1 mm com `ae/D` de 10% pediria `fz` = 0,32 mm, acima do topo da escala
do §5.3 (0,280). O §7.4 r5 exige que a direção que resolve o alerta venha primeiro, e não haveria uma.

**Decisão: o §7.6 continua sendo o caso difícil, e uma entrada muda — `ae` de 1,0 para 0,5 mm.**
Nenhum resultado foi inventado. `ae/D` de 5% é estratégia publicada (§9.5 registra 5–20% como faixa
recomendada por dois fabricantes) e 0,5 mm está dentro da escala do §5.3.

**Os números que ficam:** `n` 4 456 rpm · `vf` 1 070 mm/min · `hex` 0,026 mm · `CTF` 0,44× ·
`hm` 0,013 mm · `MRR` 0,5 cm³/min · `Pc` 0,03 kW · `Mc` 0,1 N·m · `L/D` 3,0 · `vc` real 140,0 m/min.

**Dois gatilhos ativos, e isso é estrutural.** O **1** (`hex` 0,026 abaixo do piso 0,030, 13% abaixo)
ocupa a linha por maior consequência prática (§9.7); o **1a** (`hm` 0,013 < 0,1) produz a marca
**extrapolado** e a linha "há mais uma condição ativa". Em penetração baixa `hex/hm → 2` (§6.4), logo
`hm < 0,1` sempre que `hex < 0,193`: **não existe exemplo de esfregamento com um gatilho só.** O
exemplo canônico é obrigatoriamente o caso de duas condições ativas do §7.9 / §9.7 — o que mantém de
pé o item **13** da §35.4, com o texto da segunda condição sendo o gatilho 1a, não o `L/D`.

### 36.3 Quatro lacunas declaradas, não arbitradas (§0.2)

1. **O piso de 0,030 mm não é derivável neste documento.** O gatilho 1 é `hex < 0,3 × rβ`; a `L4` dá
   `rβ` de 4–20 µm (piso 1,2–6 µm) ou 25–127 µm no registro anterior, e o caso trabalhado da própria
   `L4` põe o piso em **3 µm**. 0,030 mm exigiria `rβ = 100 µm`, que não está em tabela nenhuma.
   Fica marcado `LACUNA L4` — **fechada a medição de `rβ`, mudam juntos o gatilho, o exemplo e as
   folhas**, e a `L4` já avisa que "a regra pode quase nunca disparar".
2. **`κ` não é definido para a toroidal** (§6.4 usa `sin κ`; `L10` registra a ausência). O exemplo
   adota `sin κ = 1`, `DECISÃO DE PROJETO` declarada.
3. **As casas do §7.2 achatam este regime:** `Mc` 0,0651 N·m exibe 0,1 N·m, 54% acima. Consequência
   de Q5, não da cadeia.
4. **Altura de crista** segue fora do exemplo — a pergunta da §35.5 continua aberta.

### 36.4 Outro defeito de fórmula, encontrado na mesma varredura — **corrigido pela fonte**

**§6.4, o "+79%".** O texto dizia *"Em `ae/D = 10%` ela dá fator 3,162 contra 1,667 da exata — +79%"*,
mas `3,162 ÷ 1,667 = 1,897` → **+90%**. O +79% é o que sai em `ae/D` de **20%** (`2,236 ÷ 1,25`).

**Não era ambiguidade — era colagem, e os retornos de pesquisa resolvem sem arbitrar.** Os dois
números existem, cada um no seu `ae/D`: `RESPOSTA_R2_B.md` linha 291 traz **+89,7%** em `ae/D` 0,10,
com exatamente os fatores 1,6667 e 3,1623 que o `MVP` cita; e `RESPOSTA_R2.md` linha 538,
`RESPOSTA_R2_B.md` linha 300/670 e `VALIDACAO_R2.md` item 3 trazem os **79%** em `ae/D` **0,20**,
que é onde os dois territórios convergiram (razão 2,236/1,250 = 1,789). O parágrafo juntava os
fatores de 10% com o percentual de 20%. **Corrigido no §6.4, com os dois valores e seus `ae/D`, e
com o localizador de cada um.**

**Método que vale registrar:** não foi rodada nova. Foi `grep` nos retornos que já estavam no repo —
o número tinha fonte desde sempre, o que faltava era o localizador ao lado dele.

**Todo o resto do documento confere.** Varridos e recalculados: §6.2 (exemplo da esférica; o erro de
2,3×), §6.10 (137/363/700%; 6,7×), §6.11 (item 9; as três regras de `ap`; 20–40×), §9.5 (38×; 600×),
§3.5 (13,6%; +16–32%), §11.1 (titânio −43%; GGG50 16%), §11.2, §11.3 (as oito divergências), §11.4,
§13.1 `L4`. Dependem de fonte externa e ficam sem verificação interna: os efeitos da troca de par do
§11.1, e os "2–4% / +45–82%" e "6% / 105%" do §6.7.

### 36.5 Propagação — `E4` feito, o resto listado

O detalhe com `arquivo:linha` está na issue #3. **O `fz` 0,085 e o "+40% mais material por minuto"
sobrevivem em todos os alvos** — `Q ∝ fz`, e 0,085/0,060 dá +41,7%.

| Alvo | Estado |
|---|---|
| `escopo/E4_INDICADORES_E_SEGURANCA.md` | **feito.** §1.3 e §2.4 com `0,026 mm` e a distância que faltava na própria estrutura invariável; §6.1 com `(hoje 0,5)`; chip `[ extrapolado ]` no exemplo; e **o defeito extra corrigido** — "Há também o balanço em `L/D` 3,0" apresentava como segunda condição algo que nunca foi condição ativa (limiar 4, §9.3); a segunda é o gatilho **1a**. Nota de sincronia com o `MVP` §7.6 no lugar |
| `construcao/BRIEF_DESIGN_INTERFACE.md` (352, 360, 406) | **não tocado** — fora da fronteira desta sessão |
| `construcao/DESIGN_SYSTEM_FENIX.md` | nada a fazer — não tem número resolvido |
| `prototipo/` — `Main`, `Celular`, `Estados`, `Procedencia` + o build `painel-fenix.html` | **não tocados** — é o plano §35.4, sessão de `/design`. O build se republica a partir das folhas, nunca se edita |
| `prototipo/Vazio.dc.html`, `canvas.json` | nada a fazer |

**Conflito do §0.1 resolvido no `E4`**: escopo e `MVP` voltaram a dizer o mesmo número. O `BRIEF` e
as folhas seguem mostrando `0,018 mm` — é o que a sessão de `/design` herda.

### 36.6 Arquivos tocados

`mvp/MVP_CALCULADORA_PARAMETROS.md` (§7.6 reescrito, §7.6.1 nova, §7.4 e §6.4 corrigidos),
`escopo/E4_INDICADORES_E_SEGURANCA.md` (§1.3, §2.4, §6.1 — propagação),
`pesquisa/_para_colar/COLAR_R7_PISO_DE_ESPESSURA.md` (novo — a rodada que fecha a `L4`),
`HANDOFF.md`, `LESSONS.md` (L23).
Issue [#3](https://github.com/contatorafaeleleoterio-hub/Fenix/issues/3). **Sem commit, sem push.**

**Próximo passo:** a sessão de `/design` do §35.4 está desbloqueada — os 9 itens mecânicos podem
entrar, com os números do §7.6 corrigido. Os itens que pedem desenho continuam esperando decisão do
Mestre.

**Retomar com:** "continuar".

---

## 37. Sessão 29/08/2026 (11ª) — skill `formulas-usinagem`: o auditor das fórmulas

**Sessão de ferramenta, não de conteúdo. Nenhum documento do projeto foi alterado nesta sessão.**

**A pergunta que abriu:** qual especialista domina as fórmulas do sistema — matemático? físico?
**Resposta:** nenhum dos dois. É **engenheiro mecânico de manufatura, especialidade usinagem** — a
disciplina é *teoria da usinagem* / *metal cutting mechanics*. Os três perfis que importam ao Fenix,
em ordem de gargalo: **application engineer de fabricante** (valida os números — é a frente R7 /
inventário), **pesquisador em metal cutting** (valida as fórmulas), **programador CNC sênior**
(valida se o resultado é usável). Físico só entraria em chatter/lóbulos de estabilidade — fora do MVP.

**O que foi criado:** skill global `formulas-usinagem`, em `C:\Users\USUARIO\.claude\skills\formulas-usinagem\`
(**fora do repo**, como a irmã `dados-industria-cnc`).

| Arquivo | Conteúdo |
|---|---|
| `SKILL.md` | 3 modos — auditar (6 passos, barato→caro) · derivar/validar · diagnosticar resultado suspeito |
| `references/verificacao.md` | os 5 verificadores: dimensional · casos-limite · reprodução de exemplo publicado · sensibilidade · invariantes de auto-teste |
| `references/defeitos.md` | 12 padrões de defeito com magnitude numérica; **9 marcados [Fenix]** — vieram dos canônicos, não são hipóteses |
| `references/genealogia.md` | 7 famílias (Kienzle, engajamento, `De`, Taylor, viga, catálogo, chatter fora de escopo) com pressuposto e faixa de validade |

**Fronteira entre as duas skills:** `dados-industria-cnc` trata **valor** (kc1.1, mc, Vc, E);
`formulas-usinagem` trata **estrutura do cálculo**. Constante errada é lá; constante certa entrando
na fórmula errada é aqui. Não emendar as duas numa rodada.

**A regra que a skill grava:** *fórmula sem faixa de validade declarada não entra* — fora do domínio
ela não dá erro, dá número plausível e errado. E "nenhum achado" é resultado válido: fabricar defeito
manda o Mestre reescrever cadeia que estava certa.

**Sobre o commit desta sessão:** havia trabalho de sessão paralela em escrita ativa
(`RESPOSTA_R7_C.md` e `VALIDACAO_R7.md`, tocados minutos antes do encerramento). Esses dois ficaram
**fora do commit**, de propósito — a rodada R7 é da outra sessão e se commita quando ela fechar.

**Próximo passo:** inalterado (seção 36) — as duas frentes seguem. Adicional disponível: rodar
`formulas-usinagem` no modo auditar contra `CANONICO_MOTOR_DE_CALCULO.md` §1.4 como teste de fogo da
própria skill. **Não foi rodado nesta sessão.**

**Retomar com:** "continuar".

---

## 38. Sessão 29/08/2026 (22ª) — a R7 fechou, e ela derruba o alerta que o painel encena

**Escopo desta sessão:** o prompt de crítica ao protótipo (a lógica de fases, entregue em conversa) e
o encerramento. **A rodada R7 é de sessão paralela** — fechou nesta janela e entra no commit pela
regra que a §37 deixou escrita ("se commita quando ela fechar").

### 38.1 O veredito da R7 — par cego com três territórios

`VALIDACAO_R7.md`: **A rejeitado** (três das seis fontes citadas não existem, verificado por busca
direta) · **B aceito** · **C aceito como corroboração**, não como fonte de número. Os três chegam ao
mesmo piso de espessura de cavaco — poucos micrômetros — e **os três dizem que a regra não dispara**.

**A consequência que decide (§5):** com `rβ` real, o piso fica em **3,6 µm**. Para o **gatilho 1** do
`MVP` §9.2 disparar num Ø10 `Z`4, `fz` **e** `ae` precisam estar **simultaneamente no mínimo absoluto
da escala** do §5.3. Com `ae/D` de 5%, exigiria `fz` < 0,0083 mm — 15% do piso do próprio controle.

> **O alerta mais importante do produto, com o número correto, nunca aparece.** Com o número errado
> (30 µm) ele aparecia em condição normal — falso positivo. O defeito não era o cálculo, era o limiar.

### 38.2 O que isso faz com o protótipo — e é mais grave que a §36

A §36 corrigiu os **números** do exemplo canônico. A R7 derruba a **condição**: as cinco folhas
encenam um alerta que não existiria. Atinge `Main`, `Celular` e `Estados` — a banda `ATENÇÃO` dos três
é o gatilho 1.

**Não é re-semeadura com número novo. O exemplo canônico do painel precisa de outro alerta.** Sobra o
gatilho **1a** (`hm` 0,013 < 0,1 mm), que continua ativo, continua marcando **extrapolado** e continua
**sem direção alcançável** (`MVP` §7.4 r5) — o que muda também o bloco "o que mexer".

**A frente de tela volta a estar bloqueada**, agora por decisão de produto sobre o §9.2, não por
número. Ver `VALIDACAO_R7.md` §6 para os quatro alvos derrubados.

### 38.3 Correção de registro

Na conversa eu disse ter salvo o prompt de crítica em `prototipo/PROMPT_CRITICA.md`. **O arquivo nunca
foi escrito** — só apareceu no chat. Nada no repo o referencia e a crítica rodou assim mesmo (§35), então
não ficou pendência; fica o registro.

### 38.4 Arquivos tocados

`pesquisa/RESPOSTA_R7_C.md` e `pesquisa/VALIDACAO_R7.md` (os dois que a §37 deixou fora de propósito),
`HANDOFF.md`, `LESSONS.md` (`L24`).

**Retomar com:** "continuar".

---

## 39. Sessão 29/08/2026 (22ª, continuação da §38) — a decisão: o alerta canônico passa a ser o balanço

> **Esta seção fecha o bloqueio que a §38 abriu.** A §38 registrou o veredito da R7 e parou na
> pergunta: *"o exemplo canônico precisa de outro alerta — qual?"*. O Mestre decidiu, e esta seção
> é a execução. **Onde as duas divergirem, vale esta.** Em particular, o candidato que a §38 sugeria
> — o gatilho **1a** — **foi descartado**: ele não tem direção alcançável, e o §7.4 r5 exige que a
> direção que resolve o alerta venha primeiro.

**Pedido:** validar três retornos de pesquisa sobre o piso de espessura de cavaco (`L4`) e decidir o
que o exemplo canônico passa a encenar.

### 39.1 Três territórios, um rejeitado por fabricação de fonte

O enunciado colável (`pesquisa/_para_colar/COLAR_R7_PISO_DE_ESPESSURA.md`) foi a três pesquisadores
independentes. Confronto completo em **`pesquisa/VALIDACAO_R7.md`**.

| Território | Veredito |
|---|---|
| **A** | **REJEITADO.** Três das seis fontes **não existem** — verificado por busca direta: Liu 2006 *"The child's play of minimum chip thickness…"* (o artigo real tem outro título), Wyma et al. CIRP 2020, Açores & Silva 2018. Além disso trocou os materiais na única fonte real e usou `hex = fz·√(ae/D)`, a fórmula que o §6.4 eliminou |
| **B** | **ACEITO.** Wojciechowski (Materials 15(1):59) e Globisch et al. (JMMP 8(4):170) conferidos direto na fonte. Chegou a `hex = 26,15 µm` no exemplo canônico por conta própria — **bate com a §7.6.1 na quinta casa**, primeira validação externa da cadeia |
| **C** | **ACEITO como corroboração.** Bate com B em 6 pontos, por caminho próprio e citando os mesmos localizadores. Fraco onde importa menos: fonte de `rβ` é blog de afiação, erra a marca ("Widia/Sandvik" — Widia é Kennametal), superinterpreta Oliveira |

**Em toda divergência, A ficou sozinho contra os outros dois.** O terceiro território pagou por si:
com dois, o impasse "existe piso publicado em mm?" ficaria em empate — e empate tende a favorecer
quem alega, porque alegar é mais específico que não achar.

### 39.2 O que a R7 devolveu — e é pior que a lacuna

`CONSENSO` 3/3: `rβ` de fresa inteiriça é da ordem de **10 µm**, não de 100 µm · **nenhum fabricante
publica piso em milímetros** · a comparação é contra `hex`, não `hm` (o §9.2 já fazia certo) · e
**a regra não dispara**. Piso resultante: **2,2–3,6 µm**.

**O gatilho 1 do §9.2 é inalcançável dentro da escala do §5.3.** Numa Ø10, com `fz` e `ae` nos dois
mínimos da escala (0,056 e 0,01 mm), `hex` chega a 3,5 µm — a fronteira. Uso real fica uma ordem de
grandeza acima. **Com 30 µm ele dava falso positivo em trabalho normal; com o número certo, nunca
aparece.** Estava quebrado nos dois sentidos, e o defeito nunca foi o cálculo — era o limiar.

**O que o mercado faz no lugar, e explica tudo:** Sandvik, WIDIA e Kennametal publicam `fz`
recomendado **com fator de correção por `ae/D`**. Eles **previnem** o esfregamento entregando o
avanço já compensado, em vez de alertar depois. É por isso que o piso não existe publicado.

### 39.3 A decisão do Mestre — o alerta canônico passa a ser o balanço

Escolhida a opção **A** de três: o exemplo do §7.6 continua sendo o caso difícil, e **uma entrada
muda — o balanço, de 30 para 45 mm** (`ae` volta a 1,0, o valor original: a mudança para 0,5 da
sessão anterior existia só para fazer o gatilho 1 disparar, e perdeu a razão).

**Por que o gatilho 5:** tem limiar **publicado** (§9.3), efeito físico **derivável da própria
cadeia** (§6.10, `deflexão ∝ (L/D)³`) e **direção que o resolve** dentro do que o operador controla
— as três coisas que o gatilho 1 não tem. O gatilho **1a** continua ativo e continua sem direção
alcançável; por isso é a *segunda* condição, nunca a que ocupa a linha. **Duas condições ativas se
mantêm**, o que preserva o item 13 da §35.4.

**Os números que ficam:** `n` 4 456 rpm · `vf` 1 070 mm/min · `hex` 0,036 mm · `CTF` 0,60× ·
`hm` 0,019 mm · `MRR` 1,1 cm³/min · `Pc` 0,06 kW · `Mc` 0,1 N·m · **`L/D` 4,5** · `vc` real 140,0.
Alerta: `L/D` 4,5 contra o limiar 4,0, **13% acima**, deflexão **42%** maior que no limiar.
Direção que resolve: `L` 40 mm → deflexão cai **30%**.

### 39.4 O que foi tocado

| Arquivo | O quê |
|---|---|
| `mvp/…PARAMETROS.md` §7.6 · §7.6.1 | exemplo reescrito no balanço; tabela de derivação dos 4 números do alerta e das direções; gatilhos testados um a um; 4 lacunas declaradas |
| `mvp/…PARAMETROS.md` §7.4 | bloco de direções sincronizado (balanço primeiro); `MRR` do exemplo proibido de 0,5→0,8 para 1,1→1,5 |
| `mvp/…PARAMETROS.md` §9.2 | gatilho 1 passa a `hex < k × rβ` com o piso da R7, e ganha nota de "praticamente inativo" com o que o mercado faz no lugar |
| `mvp/…PARAMETROS.md` §13.1 `L4` | reescrita — deixa de ser "dois números divergem" e vira **decisão de produto** |
| `escopo/E4…md` §1.3 · §2.4 · §6.1 · tabela de gatilhos | propagado inteiro |
| `pesquisa/` | `VALIDACAO_R7.md`, `RESPOSTA_R7_A/B/C.md`, `_para_colar/COLAR_R7…md` |

**Não tocados:** `BRIEF_DESIGN_INTERFACE.md`, `DESIGN_SYSTEM_FENIX.md`, as cinco folhas de
`construcao/prototipo/` e o build. **Sem commit, sem push.**

### 39.5 O que a sessão de `/design` herda

O plano da §35.4 continua válido, com **duas mudanças de conteúdo**: o alerta encenado é o balanço
(não o esfregamento), e o exemplo é `L45` / `L/D` 4,5. O item **13** segue de pé — marca
`extrapolado` + linha de segunda condição —, e a segunda condição é o gatilho **1a**.

Pendente fora da tela: o `BRIEF` §5.7/§5.8 ainda mostra o exemplo antigo (proibido de tocar nas duas
últimas sessões); e `k` para inox e aço endurecido segue `NÃO ENCONTRADO` nos três territórios.

**Retomar com:** "continuar".

---

## 40. Sessão 29/08/2026 (23ª) — a skill que varre a documentação, e o primeiro drift que ela pegou

**Pedido:** criar uma skill que varra o projeto e reconcilie a documentação — depois de conferir a
documentação oficial da Anthropic sobre como se escreve uma skill.

### 40.1 A skill

`C:\Users\USUARIO\.claude\skills\reconciliacao-documentacao\` — `SKILL.md` (210 linhas), dois
`references/` (formato do registro de fatos, formato do relatório) e dois scripts Python.

Ela executa a proposta que dormia em `central_rafael/protocolos/proposta-documentacao-viva.md`, com
as quatro decisões pendentes da §9 resolvidas pelas recomendadas: registro central `docs/fatos.yml`,
sem transclusão, sem hook/CI (isso é outra etapa). **A ideia central não é cascata de edição
automática — é máquina primeiro, LLM só onde a máquina não alcança.**

| Fase | O quê | Custo |
|---|---|---|
| 1 | `inventario.py` — inventário, doc **vencido**, link/caminho quebrado | barato, determinístico |
| 2 | `verifica.py` — roda o `verifica` de cada fato do registro | barato, determinístico |
| 3 | escopo: **só** o que as fases 1–2 marcaram | protege o contexto |
| 4 | confronto semântico, com evidência **dos dois lados** | caro |
| 5 | gate binário + relatório único | — |
| 6 | correção — prosa é **proposta**, não aplicada, e só após aprovação | — |

Da pesquisa na Anthropic vieram: frontmatter só com os campos do spec, `description` em 3ª pessoa
com gatilhos, referências a um nível de profundidade, checklist copiável e o ciclo
"roda validador → conserta → repete".

### 40.2 O que a primeira execução achou — 3 `BLOQUEIA`, 1 `AVISA`

Relatório completo: **`RECONCILIACAO_DOCS_2026-08-29.md`**. Causa única: a R7 (§38–39) trocou o
alerta canônico e a propagação parou em `mvp/` e `escopo/E4`.

| # | Onde | O quê |
|---|---|---|
| 1 | `BRIEF` §5.8 | o único exemplo de alerta do brief ainda era o esfregamento com piso `0,030 mm` — 10× o piso real. Agravante: o §0 do brief declara que ele **não depende de nenhum outro documento** |
| 2 | `BRIEF` §5.7 | primeira direção ainda era `ae` 2,5 (esfregamento); o §7.4 do MVP exige a direção que resolve o alerta primeiro |
| 3 | `CANONICO_LIMITES_E_ALERTAS` §1.1, L-16, L-18, item 7 | `grep -rn "R7" canonicos/` dava **zero**. **Inversão de dono:** o `CLAUDE.md` declara `canonicos/` a verdade validada, e ele estava atrás do `mvp/` e do `escopo/` |
| 4 | 5 folhas do protótipo + design system | `AVISA` — 7 ocorrências do alerta antigo. Já registrado no §39.5; pertence à sessão de `/design` |

**Os três `BLOQUEIA` foram corrigidos** (ordem: canônico primeiro, depois o brief), com diff
proposto e aprovado antes de aplicar. Gate: **3 → 0**. `BRIEF:352` ficou de fora por decisão — lá a
direção morta ilustra a *forma* do verbo, não o conteúdo, e continua correta como forma.

### 40.3 Três defeitos da skill, achados por rodá-la no próprio projeto

Estão em `LESSONS.md`. Resumo: a varredura era **silenciosamente** cega a HTML; a correção para HTML
gerou **13 falsos positivos** de link; e dois verificadores de fato propostos estavam errados — um
nasceu verde por acidente, outro era negativo e pegava o histórico. Todos corrigidos na skill.

### 40.4 O que foi tocado

| Arquivo | O quê |
|---|---|
| `canonicos/CANONICO_LIMITES_E_ALERTAS.md` | §1.1 (piso `k × rβ`, 2,2–3,6 µm, bloco `RESOLVIDO — R7`) · L-16 · L-18 · item 7 |
| `construcao/BRIEF_DESIGN_INTERFACE.md` | §5.8 exemplo de alerta · §5.7 primeira direção |
| `RECONCILIACAO_DOCS_2026-08-29.md` | novo — relatório, diffs e gate reavaliado |
| `LESSONS.md` | 3 lições novas |

**Não tocados:** protótipo, design system, `MVP`, `escopo/`. **`BRIEF:352` fica como está, por
decisão do Mestre (29/08):** ali a frase ilustra a *forma* do verbo, não o exemplo canônico, e texto
correto não se mexe.

**O que a próxima sessão herda:** o plano da §39.5 continua igual — a sessão de `/design` re-semeia
as cinco folhas com `L45` / `L/D` 4,5. E, se quiser que o drift pare de depender de alguém lembrar
de varrer, a Fase 6b do relatório já traz os três fatos com verificador, testados e verdes.

**Retomar com:** "continuar".

---

## 41. Sessão 29/08/2026 (24ª) — a pasta reorganizada, e um índice pra quem tropeçar em caminho movido

**Pedido:** `Docs_inicial/` misturava plano pendente, plano executado, relatório fechado e dado bruto
já absorvido, tudo solto na raiz junto com os documentos vivos. Separar por ciclo de vida, isolar o
que está fechado do caminho de leitura de rotina, e criar um índice pra não obrigar a reescrever
menção de caminho espalhada pelo histórico.

### 41.1 A investigação e o plano

Inventário completo da árvore + `grep` cruzado de todo arquivo candidato a mover contra o repositório
inteiro (não só `Docs_inicial/`), pra separar citação viva (precisa correção) de menção em log fechado
(não mexe — doutrina já usada em `pesquisa/RESPOSTA_*.md`, estendida ao corpo histórico do próprio
`HANDOFF` e às entradas fechadas do `LESSONS`). Plano aprovado em modo de planejamento antes de
executar.

### 41.2 Estrutura nova

```
referencia/  → GLOSSARIO_DE_TERMOS.md, LESSONS.md (vivos, citados por todo canônico)
decisoes/    → BLOCO_DE_DECISAO.md (Parte 3 ainda aberta)
planos/      → pendentes/ (AUDITORIA_PRONTIDAO_MVP_2026-08-28.md, o plano de 6 passos vivo)
             → executados/ (vazia — recebe o próximo plano fechado)
relatorios/  → RECONCILIACAO_DOCS_2026-08-29.md, CRITICA_PROTOTIPO_PAINEL_2026-08-28.md,
               ANALISE_CRITICAS_MESTRE_PAINEL_2026-08-28.md (achado ainda guia trabalho aberto)
_arquivo/    → ISOLADO, não lido de rotina — planos/ e relatorios/ fechados, e descarte/
               (INVENTARIO_DADOS_INDUSTRIA.md — Mestre já disse "teu pra apagar" em 28/08 e não
               confirmou; movido, não `git rm` — reversível a custo zero)
```

Cada pasta nova ganhou `LEIA-ME.md` com o critério de entrada/saída (mesmo padrão de
`canonicos/LEIA-ME.md`). 12 arquivos movidos com `git mv` — histórico preservado, `git status`
confirmou `renamed:` em todos.

### 41.3 O índice — o que ele é e o que deliberadamente não é

`INDICE_DE_ARQUIVOS.md` (novo, raiz de `Docs_inicial/`): uma linha por arquivo movido, local antigo →
novo → motivo. **Não é catálogo do projeto** — isso já é papel da tabela "Estrutura" do `CLAUDE.md` e
do §4 abaixo; duplicar criaria uma segunda fonte pra divergir (o problema que a skill
`reconciliacao-documentacao` existe pra pegar). É só redirecionamento: quando um documento histórico
citar um caminho morto, consulta aqui antes de perguntar ou recriar. Regra de manutenção: toda
movimentação futura ganha uma linha; o texto histórico que cita o caminho antigo não se reescreve.

### 41.4 A lacuna achada no meio da execução

O grep de investigação já mostrava os 6 `canonicos/CANONICO_*.md` citando
`Docs_inicial/GLOSSARIO_DE_TERMOS.md` num aviso de nomenclatura — a citação mais repetida do
levantamento. Não entrou na lista de "documentos vivos a editar" do plano; só apareceu de novo na
verificação final, depois do `git mv`. Corrigido nos 6 antes de fechar. Registrado como **`L25`**:
achado de grep não sobrevive sozinho até o plano, precisa virar linha, não impressão.

### 41.5 Arquivos tocados

| Arquivo | O quê |
|---|---|
| `CLAUDE.md` (raiz do repo) | tabela "Estrutura" — 5 pastas novas, ponteiro pro índice, corrigido drift preexistente (E0–E6→E0–E7, R1–R6→R1–R7) |
| `HANDOFF.md` | header (3 menções de caminho) · §1 (regra de `_arquivo/` e do índice) · §4 (raiz, `construcao/`, pastas novas) |
| `canonicos/CANONICO_*.md` (6) | `Docs_inicial/GLOSSARIO_DE_TERMOS.md` → `Docs_inicial/referencia/GLOSSARIO_DE_TERMOS.md` |
| `escopo/E3_RESULTADOS_E_APRESENTACAO.md` | 4 menções de `BLOCO_DE_DECISAO.md` → `decisoes/` |
| `construcao/prototipo/LEIA-ME.md` | `LESSONS.md` → `referencia/LESSONS.md` |
| `INDICE_DE_ARQUIVOS.md`, 6× `LEIA-ME.md` | novos |
| `LESSONS.md` (agora `referencia/LESSONS.md`) | `L25` |
| 12 arquivos movidos | ver §41.2 e o índice |

**Achado à parte, não corrigido (é log, não mexe):** `HANDOFF.md` (corpo histórico, linhas ~1347 e
~1435) diz `INVENTARIO_DADOS_INDUSTRIA.md` "não commitado" — `git ls-files` mostra que estava
commitado. Drift antigo, só registro.

**Fora de escopo, decisão separada:** extrair o log de sessões do `HANDOFF.md` (154K, D1 da auditoria)
— precisa renumerar seção misturada com protocolo vivo, risco maior que mover arquivo inteiro.

**Retomar com:** "continuar".

---

## 42. Sessão 29/08/2026 (25ª) — o plano de revisão do protótipo: 29 itens, 2 fatias

**Pedido:** "me traga o que temos de pendência sobre o protótipo" → em seguida "faça um plano para
aplicar todos" (via `/frontend-design`).

**Entregue:** `planos/pendentes/PLANO_REVISAO_PROTOTIPO_2026-08-29.md` — plano aprovado em modo de
planejamento. Consolida o plano solto da §35.4 com a troca de alerta da R7 (§38–39) e as decisões
de 29/08. **Nenhum arquivo do protótipo foi tocado; brief, DS e MVP não foram tocados.**

### 42.1 O que o plano cobre

| Fatia | Itens | Natureza |
|---|---|---|
| **1** | 14 — re-semear as 4 folhas de conteúdo com o exemplo de **balanço `L45`** + regra mecânica (`:root` do DS §3 inteiro, tokens de raio/espaço, `:focus-visible`, SVG sem hex, `.rule` 70ch, "Calcular" no celular, "Sem fonte publicada" fora da tela, "L/D" por extenso, marca `extrapolado`, ponteiro de 2ª condição) | verificável por `grep`, zero decisão de produto |
| **2** | 15 — trilha por controle, R3 completo (12→45 números com procedência), breakpoint de tablet, ordem do celular (§2.3), os 2 números de comando, `hex` com posição fixa, comparar 2 condições (T12), prosa comprimida por estado, config recolhível, Z3, caminho de volta dos dados do material, `ap` com marca de estado, Z1 com `kc1.1·mc·vc`, registro do "chip sólido" no DS | cada um com recomendação ancorada; 2 bifurcações reais abertas (item 19 `S`/`F`; item 21 filete vs. fantasma) |

### 42.2 As 3 decisões do Mestre nesta sessão

| # | Pergunta | Decisão |
|---|---|---|
| 1 | Lote | **Duas fatias** — Fatia 1 primeiro com "pode seguir" próprio; Fatia 2 aprovação separada (`L22`) |
| 2 | Base dos itens de tese | **Aplicar já com a recomendação documentada** — observação com operador vira validação posterior, não pré-requisito |
| 3 | Altura de crista | **Fica fora** — nenhum documento traz o valor; não se inventa. Segue como pergunta aberta (§35.5) |

### 42.3 Correção de registro no header

O bloco "Próxima ação" ainda dizia "o `BRIEF` §5.7/§5.8 ainda mostra o exemplo antigo" — **texto
vencido**: a §40 já corrigiu os dois. Ajustado. E "plano de revisão de 19 itens" da §35.4 passou a
29 no plano novo (mais granular — a re-semeadura, o `:root`, os tokens e o foco viraram itens
separados; e entraram os itens de dados do material / `ap` / Z1 que a §35.4 tinha embutidos).

### 42.4 Arquivos tocados

`planos/pendentes/PLANO_REVISAO_PROTOTIPO_2026-08-29.md` (novo), `HANDOFF.md` (header + esta seção).
**Sem commit de código. Protótipo intacto.**

**Próximo passo:** o "pode seguir" da **Fatia 1** — roda numa sessão de `/design`, edita as 5 folhas,
regera o build e republica no mesmo artifact.

**Retomar com:** "continuar".

---

## 43. Sessão 29/08/2026 (26ª) — Fatia 1 aplicada: o protótipo re-semeado com o exemplo do balanço

**Pedido:** `/design` — "executar fatia 1 do Plano — aplicar todas as pendências do protótipo do painel".

**Feito:** os 14 itens da Fatia 1 de `planos/pendentes/PLANO_REVISAO_PROTOTIPO_2026-08-29.md`,
aplicados nas 5 folhas `.dc.html` + `canvas.json`, `painel-fenix.html` re-semeado e **republicado no
mesmo artifact** (`https://claude.ai/code/artifact/2a248b7c-80e8-412f-b1d9-5bd08bedde89`).

### 43.1 Antes de tocar: conferência de drift

O artifact foi lido de volta (`--extract`) e comparado byte a byte com as 5 folhas do repositório:
**idênticas** (só `canvas.json` diferia em espaço em branco — o seed reformata). Confirma o que a §42
assumiu: nada foi editado pela interface desde a publicação de 28/08.

### 43.2 O que mudou nas folhas

| Grupo | Mudança |
|---|---|
| Exemplo canônico | Esfregamento → **balanço**. `L` 30→45 no cabeçalho e na geometria; alerta = `L/D` 4,5 vs. limiar 4,0 (`+13%`, deflexão `+42%`); `vf` 1 069→1 070; `hex` 0,036, `CTF` 0,60, `MRR` 1,1, `Pc` 0,06, `Mc` 0,1; `hm` 0,019 **extrapolado** entra em "resultados úteis" (8º número) e na Verificação; banda de 2ª condição ("ver Detalhes e fórmulas") em Main/Celular; "o que mexer" 1ª direção = reduzir `L` para 40 mm. Tudo do `MVP` §7.6 / §7.6.1. |
| `:root` do DS §3 | Bloco pronto **inteiro** nas 5 folhas — tokens de interação, espaço (`--sp-1..7`), raio (`--r-chip/field/card/pill`), tempo, `:focus-visible` e `@media (prefers-reduced-motion)`. |
| Token de raio | Todo `border-radius` literal → `var(--r-*)`. Chip do cabeçalho `Main`/`Celular` 4px→2px (era o raio inconsistente do A11). |
| Espaçamento | ~40 `gap`/`padding` fora da escala → escala `4·8·12·16·24·32·48` (arredondado ao vizinho, empate pra cima). |
| Foco | Anéis de foco desenhados à mão removidos de `Main` (campo `fz`) e `Vazio` (campo ferramenta) — passa a valer o `:focus-visible` do DS. |
| SVG | Todo `stroke="#475569"`/`#3730A3` → `stroke="currentColor"` + `color` no token. Zero hex em SVG. |
| Vocabulário | `.rule` 78ch→70ch (`Estados`); `Celular` ganha `.prose{max-width:70ch}`; "Ajuste"→"Ajuste fino"; "L/D" solto → "relação balanço/diâmetro (L/D)" nas duas ocorrências que faltavam. |
| Celular | Ganhou "Calcular" persistente ao pé do bloco "Ajuste fino" (fora de revelação). |
| Procedência | "Sem fonte publicada" → descrição de origem em tinta neutra; linha `Balanço (L) 45 mm informado` em "Parâmetros usados". |
| Estados | Bandas `ATENÇÃO` do §1 e do §4 → texto de balanço; §4 recuperou a 2ª linha (efeito físico); ponteiro de 2ª condição aponta pra "Detalhes e fórmulas". `CRÍTICO` (ae>D) e `NORMAL` mantidos. |

### 43.3 Verificação

Todos os `grep` da Fatia 1 passam: toda cor rastreia a token do DS §3 (só `#FFFFFF` literal, texto
sobre chip de estado — pré-existente, é o item 29 da Fatia 2); zero raio literal; zero espaçamento
fora da escala; zero `stroke="#"`; zero anel de foco à mão; zero `>Ajuste<`; zero "Sem fonte
publicada"; zero `(L/D` seguido de número; `extrapolado` presente em Main e Celular; HTML balanceado
nas 5; `--check` do seed OK; canvas renderiza sem clipping.

**Uma ocorrência de "esfrega" permanece** — em `Main.dc.html`, no texto de ajuda do `fz` ("Equilíbrio"),
que é **`MVP` §5.5 literal**, não o exemplo trocado. Decisão do Mestre: **texto e alertas não são da
etapa de criação do protótipo — serão revisados e validados em sessões dedicadas.** Fica como está.

### 43.4 Decisões tomadas na execução (declaradas, não perguntadas)

1. **Item 11 aplicado no `Main` também**, não só no `Vazio` — o bloco "Dados que entram na conta" é
   idêntico nas duas folhas; "76–122" no slot de unidade só numa quebraria a consistência do contrato.
2. **`hm` como 8º número** em "resultados úteis" + linha de razão do extrapolado na Procedência — o
   plano pede "8 números" (item 1) e "razão alcançável na procedência" (item 12).
3. **`canvas.json`:** alturas dos frames aumentadas e 2ª fileira empurrada pra baixo (conteúdo cresceu).
   O layout de verdade é refeito na Fatia 2 (item 17 — breakpoint de tablet, `Main` sem `width:1440px`
   fixo). `x`/largura/títulos/notas de tese intactos.
4. **Favicon `⚙️`** — o original não é recuperável do HTML publicado (o shell da claude.ai aplica).

### 43.5 Arquivos tocados

`construcao/prototipo/`: `Main.dc.html`, `Vazio.dc.html`, `Celular.dc.html`, `Procedencia.dc.html`,
`Estados.dc.html`, `canvas.json`. `painel-fenix.html` é `.gitignore` (build). Mais `HANDOFF.md`,
`referencia/LESSONS.md` (`L26`).

**Próximo passo:** Fatia 2 — aprovação separada, com as 2 bifurcações do item 19 e do item 21.

**Retomar com:** "continuar".

---

## 44. Sessão 29/08/2026 (27ª) — Fatia 2 aplicada: as 15 pendências de desenho do protótipo

**Pedido:** `/design continuar PLANO_REVISAO_PROTOTIPO_2026-08-29.md`.

**Feito:** os itens 15–28 da Fatia 2 (o 29 é edição do DS, fora — ver abaixo), em **3 rodadas**, cada
uma re-semeada e **republicada no mesmo artifact**
(`https://claude.ai/code/artifact/2a248b7c-80e8-412f-b1d9-5bd08bedde89`). Entrou uma 6ª folha:
`Tablet.dc.html`.

### 44.1 As 3 bifurcações, decididas pelo Mestre

| Item | Pergunta | Decisão |
|---|---|---|
| **19** | `n`/`vf` empilhados ou lado a lado? `S`/`F`? | **Desktop lado a lado, celular empilhado** (como já estavam), **com** `S`/`F` como endereço de máquina ao lado do nome do §11 |
| **21** | Filete "fixar resultado" vs. número-fantasma por célula? | **Filete "fixar este resultado"** — heróis + `hex` + `L/D` da condição A, por gesto explícito, mecânica do `FIXADO` de `Estados` §5 |
| **29** | Registrar o par de contraste no DS ou renderizar o chip como o DS manda? | **Ainda aberto** — pede "pode seguir" à parte, é edição do `DESIGN_SYSTEM_FENIX.md` §2.4/§6, não do protótipo |

### 44.2 O que mudou, por folha

| Folha | Mudança |
|---|---|
| **`Main`** (Rodada A) | Trilha por controle (`vc`/`fz`/`ae`) — faixa recomendada + tick de partida + thumb 44px + valor tocável (item 15); todo número exibido com sublinhado auditável, ~50 spans, era 12, alvo = linha/campo de 44px (16); desktop **fluido**, empilha abaixo de ~1080px, sem `width:1440px`/`flex:none` (17); `S 4 456` / `F 1 070` ao lado dos heróis, lado a lado (19); `hex` 1º em "resultados úteis" (20); filete "fixar este resultado" (21); "o que mexer" empilhado na vertical (23); exemplo de bloco recolhido + travas r4/r6 (24); Z3 "MONTADO — Fresa Toroidal Ø10 r1,0 Z4 L45" como filete próprio no topo do resultado (25); `⟲` por dado do material + "reverter todos" (26); `ap` com marca "Partida" (27); cabeçalho ecoa `kc1.1 1500 · mc 0,21 · vc 140` (28). |
| **`Celular`** (Rodada B) | Mesmos itens adaptados a 390px; **item 18** — ordem do `MVP` §2.3: configuração ACIMA do resultado (material/ferramenta como linhas de relance recolhidas no topo, ajuste fino aberto, Calcular, depois o resultado; antes o celular invertia). Nota `celular-rolagem` do `canvas.json` reescrita. |
| **`Tablet`** (novo, Rodada C) | Painel a 834px — as duas colunas empilham largas, "resultados úteis" cai de 4 para 2 colunas (17). |
| **`Estados`** (Rodada C) | §6 "prosa comprimida por estado" (**item 22** virou seção, não artboard — ver 44.3); §7 blocos recolhidos com valores no cabeçalho + travas r4/r6 (24); §8 dados do material editáveis com caminho de volta, mecanismo por inteiro (26). §6 antigo ("o que nunca vai ter") → §9. |
| **`Procedência`** (Rodada C) | Card "Dados do material usados na conta" — `kc1.1 1500` · `mc 0,21` · `vc 140`, que não apareciam em lugar nenhum do lado do resultado (**item 16**, achado A2). Nota de que abre no lugar, empurrando a coluna, não é outra tela. |
| **`Vazio`** (Rodada C) | Desktop fluido também (mesmo defeito do 17, fora do verify dele); `⟲` nos 5 dados do material + "reverter todos" (26); nota D6 — os dados do material são entrada declarada, não exceção ao "nenhum número". |
| **`canvas.json`** | Artboard `Tablet` (entre `Vazio` e `Celular`); alturas e 2ª fileira reposicionadas (conteúdo cresceu); 2 notas de tese (`tese`, `duas-funcoes`) atualizadas — descreviam mecanismos que os itens 19/21 mudaram; nota nova `tres-tamanhos`. |

### 44.3 Decisões tomadas na execução (declaradas, não perguntadas)

1. **Item 22 virou seção na folha `Estados`, não um artboard de estado NORMAL.** Um painel NORMAL
   completo precisa de um exemplo numérico canônico sem nenhum gatilho ativo — que **não existe** no
   `MVP` (o §7.6 é o exemplo com alerta). Inventar um violaria "nenhum número de demonstração"
   (`L21`/`L23`). A seção mostra as duas prosas comprimidas com o texto canônico que existe ("Nada
   fora da faixa entre as condições verificadas", brief §5.6).
2. **`Vazio` também ficou fluido.** O verify do item 17 nomeia só o `Main`, mas o defeito (largura
   travada, o antecessor "não renderiza abaixo de 1360px") é o mesmo, e deixar um artboard de desktop
   rígido enquanto o outro é fluido quebra o contrato. `Tablet` já nasceu fluido.
3. **2 notas de tese do `canvas.json` reescritas.** A `tese` dizia que comparar duas condições "não
   custa nenhum clique" — a frase que a crítica B5 derrubou; agora descreve o filete do item 21. A
   `duas-funcoes` ganhou o `S`/`F` do item 19. São consequência dos itens, não redesign.
4. **Filete de "fixar resultado" por extenso.** A 1ª versão mostrava `hex 0,036` / `L/D 4,5` — símbolo
   sozinho, viola §11. Reescrito para "Espessura de cavaco máxima (hex)" / "Relação balanço/diâmetro
   (L/D)" nas 3 folhas.
5. **Favicon `⚙️`** — a §43.4.4 registrou que a Fatia 1 usou `⚙️`; publiquei 3 rodadas com `📐` antes
   de ver isso (`L27`), e republiquei com `⚙️` no fim. O ícone da aba oscilou durante a sessão; o
   estado final está certo.

### 44.4 Verificação

Todos os `grep` enumeráveis passam nas 6 folhas: zero cor fora dos tokens do DS §3 (só `#FFFFFF`
literal do texto sobre chip — item 29); zero `stroke="#"`; zero símbolo reduzido sozinho (`(L/D` +
número, `>hex <span`, etc.); `max-width` ≤ 70ch; zero `width:1440px`/`900px`/`468px` fixo em
`Main`/`Vazio`/`Tablet`. Sem overflow horizontal e sem clipping em nenhum artboard (medido por JS a
1440/834/390). `--check` do seed OK. Números conferidos contra `MVP` §7.6/§7.6.1/§11.1 — nenhum
inventado. A única "esfrega" que resta é o texto de ajuda do `fz` (`MVP` §5.5 literal, `L26`).

### 44.5 Arquivos tocados

`construcao/prototipo/`: `Main.dc.html`, `Vazio.dc.html`, `Celular.dc.html`, `Procedencia.dc.html`,
`Estados.dc.html`, `canvas.json`, **`Tablet.dc.html` (novo)**, `LEIA-ME.md`. `painel-fenix.html` é
`.gitignore` (build). Mais `HANDOFF.md`, `referencia/LESSONS.md` (`L27`).

**Próximo passo:** **Item 29** — registrar o padrão "chip sólido de nível" + a linha de contraste
branco/`-ink` no `DESIGN_SYSTEM_FENIX.md` §2.4/§6 (o par mede 7,1–7,3:1 e passa; é lacuna de
documentação). Pede "pode seguir" à parte. Depois disso, a frente da tela está fechada — falta a
**revisão de texto/cópia/alertas** das 6 folhas (sessão dedicada, §43.3) e a frente de **código**
(scaffold + `/to-tickets` da Q3).

**Retomar com:** "continuar".

---

## 45. Sessão 29/08/2026 (28ª) — item 29: os chips de estado foram para a rampa do DS

**Pedido:** "continuar" → decisão do item 29 via `AskUserQuestion`.

**Decisão do Mestre:** entre (A) registrar o par branco-sobre-`-ink` no `DESIGN_SYSTEM_FENIX.md` e
(B) re-renderizar os chips como o DS já especifica, escolheu **B — mudar o protótipo**. O DS não é
tocado; o protótipo passa a conformar ao contrato que já existe (§2.4).

### 45.1 O que mudou

Os **13 chips de estado** das 6 folhas `.dc.html` deixaram de usar fundo sólido `--st-*-ink` +
`color:#FFFFFF` e passaram à **tríade da rampa §2.4**: fundo `--st-*-bg`, texto `--st-*-ink`, borda
`1px solid` na mesma tinta. `--st-*-ink` sobre `--st-*-bg` mede **~6,4–6,7:1** (as mesmas razões que a
§2.4 publica para "sobre página"; `-bg` é mais claro, então não piora) — passa AA com folga.

| Folha | Chips |
|---|---|
| `Estados` | classe `.chip` (perde `color:#FFFFFF`, ganha `border:1px solid` herdando `currentColor`) + 6 instâncias: NORMAL, ATENÇÃO ×2, CRÍTICO, MUDOU, FIXADO |
| `Main` | cabeçalho ATENÇÃO (sobre cartão) + chip da faixa de alerta |
| `Celular` / `Tablet` | idem — cabeçalho + faixa |
| `Procedência` | chip "Margem" (nível informação) |
| `Vazio` | nenhum (estado sem resultado) |

**Sobre a faixa** (que já tem fundo `-bg`), o chip fica delineado pela borda `-ink` de 1px — nítida
a ~6,5:1 — e pelo rótulo em caixa alta. Sobre cartão branco (cabeçalhos), é uma tag clara com borda
fina. Padrão único nas duas superfícies.

### 45.2 Decisão tomada na execução (declarada, não perguntada)

**Borda em `-ink`, não `-bd`.** O DS designa `-bd` para bordas de superfície de estado, mas `-bd`
sobre `-bg` fica em ~1,5:1 e o chip somia na faixa (fundo igual ao dela). A borda `-ink` mantém o
chip legível como elemento em toda superfície, é a mesma matiz da rampa, e o próprio §4.2 usa a tinta
de seleção como borda além de fundo. Registrado em `LESSONS.md`.

### 45.3 Verificação

- `grep`: zero `#FFFFFF` fora dos 6 blocos `:root`; zero `background:var(--st-*-ink)` (todos viraram
  `-bg`); toda cor rastreia token do DS §3; zero `stroke="#"`.
- Drift: artifact lido de volta (`--extract`) e comparado às 6 folhas do repositório — diferem **só**
  nos 13 chips. Nenhuma edição pela interface desde a §44.
- Render de conferência (HTML isolado com os tokens reais + as estruturas de faixa/chip): os 4 níveis
  legíveis, recorte de tag intencional. `--check` do seed OK.
- Não deu para ver o artifact publicado pelo navegador embutido (sem login claude.ai) — o publish em
  si retornou OK, mesma URL, capacidade `{downloads, self}` preservada.

### 45.4 Arquivos tocados

`construcao/prototipo/`: `Main.dc.html`, `Vazio.dc.html` (intacto — sem chip), `Celular.dc.html`,
`Procedencia.dc.html`, `Estados.dc.html`, `Tablet.dc.html`. `canvas.json` **não** mudou.
`painel-fenix.html` é `.gitignore` (build). Mais `HANDOFF.md`, `referencia/LESSONS.md`.

**Próximo passo:** a frente de tela está **fechada**. Restam: (a) **revisão de texto/cópia/alertas**
das 6 folhas — sessão dedicada, a "esfrega" do `fz` (`MVP` §5.5) e os alertas entram aqui; (b) a
frente de **código** — scaffold + `/to-tickets` da fatia vertical da Q3, que ainda pede o "pode
seguir" do Mestre.

**Retomar com:** "continuar".

---

## 46. Sessão 30/08/2026 (21ª) — protocolo de convergência do protótipo: G0 e F1

**Mudança de método.** O protótipo continuava não conforme depois de duas rodadas de crítica e dos
44 achados aplicados (§43–§45). O Mestre parou de corrigir item a item e abriu um **processo com
fases**, registrado em `construcao/prototipo/protocolo-convergencia-prototipo.html` — um painel
interativo de 10 fases (G0 → F8), até 4 ciclos, com portão de aceite que só libera com 100% dos
findings críticos e importantes fechados. O estado dele mora no `localStorage` do navegador do
Mestre; **nenhum agente marca fase por ele.**

### 46.1 As 10 fases

`G0` diagnóstico rápido · `F1` consolidar fonte de verdade · `F1.5` baseline commit · `F2` auditoria
fresh-context · `F3` human gate · `F4` critérios de aceite · `F5` action plan · `F6` execução +
prova · `F7` verificação independente · `F8` portão de aceite.

### 46.2 G0 — diagnóstico: **C, os dois**

| Causa | Onde |
|---|---|
| **Spec clara ignorada** | R1–R15, vocabulário §11, anti-requisitos §12, checklist §9 do DS — tudo verificável por comando, e violado assim mesmo |
| **Spec ambígua** | T1–T12 foram deixadas **abertas de propósito** pelo brief §9, e C1–C12 são julgamento, não teste. O protótipo escolheu uma resposta para cada tensão e não havia contra o quê medir |

Foi essa mistura que produziu o impasse: crítica de camada 2 apresentada como violação de regra.

### 46.3 F1 — `GABARITO_PROTOTIPO.md`, a régua única

Criado `construcao/prototipo/GABARITO_PROTOTIPO.md` (**v1.1**). O que ele resolve e não existia:

1. **Ordem de precedência** — decisão do Mestre > `canonicos/` > `MVP` > brief > DS > relatório de
   crítica > protótipo. **Relatório de crítica e o próprio protótipo não são régua**: o primeiro é
   achado até passar por F3; o segundo é o objeto medido.
2. **Camada 1 (mecânica) separada da camada 2 (julgamento).** F2 audita só a camada 1. Achado de
   camada 2 vestido de violação de regra é finding inválido e cai em F3.
3. As 5 ambiguidades que só o Mestre fecha.

### 46.4 Q1 — os 4 defeitos que os 44 achados não tinham pegado

| # | Defeito | Virou |
|---|---|---|
| 1 | **Texto demais** — o painel perdeu o caráter de calculadora dinâmica | **D9** |
| 2 | **`4 456`** — separador de milhar é um espaço comum no HTML (não é fonte nem CSS) | **D8** |
| 3 | **Resultados sem destaque**, perdidos no meio da prosa | **D7** |
| 4 | **O DS do Fenix ficou simples demais** — regra de posição e formato já resolvida no DS do ToolOptimizer não foi trazida | **§2.8** do gabarito |

### 46.5 A revisão do design system contra o ToolOptimizer

Fonte apontada pelo Mestre: `ToolOptimizerCNC/docs/_canonicos/DESIGN-SYSTEM.html` (360K, canônico
de lá). *Consulta apenas — nada escrito naquele repositório.*

**Adotado:** espaço `4·8·12·16·24·32` · raio `4·8·12·16·full` · Inter + JetBrains Mono · grade de 12
colunas com configuração 3 / resultado 9 (**2 seções, não 3** — o próprio documento revoga a
referência anterior de 3 colunas) · a forma da **Zona 4** (cartão alto, rótulo acima, número mono
grande) · a **Zona 5** em grade de 4 colunas.

**Recusado, com motivo:** a paleta clara de lá (marcada *"proposto, não existe no produto"*, com o
tom escurecido de texto **em aberto** — o Mestre decidiu manter os neutros do Fenix, que já têm
contraste verificado) · a escala de 8 degraus (o próprio documento a registra como valor arbitrário
canonizado depois do fato, com `text-[13px]` e `text-[18px]` como dívida) · Material Symbols via
Google Fonts (**R11**) · `drop-shadow` por parâmetro, `jackpotFlash`, cor por parâmetro · gauge e
barra proporcional (**R14**, brief §12).

### 46.6 Decisões novas — D6 a D9

| # | Decisão | Origem |
|---|---|---|
| **D6** | Escala tipográfica **`11 · 13 · 16 · 20` px + `32` px mono**, nada fora | Delegada pelo Mestre ("melhores práticas"); ISA-101 põe o teto em 4 tamanhos de texto, numerário à parte |
| **D7** | Todo resultado em cartão próprio: **2 cartões altos com `−`/`+` de 44px** (rotação, avanço) e **8 baixos sem incremento** | Delegada; só esses dois são editáveis (brief §7.3), e a distinção por **forma** resolve **T2/C4** |
| **D8** | Separador de milhar é **ponto** (`4.456 rpm`); decimal segue vírgula (`0,018 mm`) | Mestre |
| **D9** | **Prosa e aviso nascem recolhidos, mesmo depois de calcular** — só o **alerta** fica aberto | Mestre. **Revoga a parte de D3** que dizia que "o que vai acontecer" e "o que mexer" não colapsam |

### 46.7 Estado das 5 perguntas

| # | Estado |
|---|---|
| **Q1** | Respondida — §46.4 |
| **Q2** · faixa recomendada da trilha | **Adiada** — sessão separada do Mestre. Até lá **a trilha não se desenha** |
| **Q3** · comparar duas condições (T12) | **Aberta.** Explicada: hoje é um resultado por vez, trocar a ferramenta apaga o anterior |
| **Q4** · densidade (T1) | **Aberta** — será respondida ao ver o resultado da rodada da Q1 |
| **Q5** · escopo de F2 | Respondida: **só camada 1** |

### 46.8 Arquivos tocados

Criado: `construcao/prototipo/GABARITO_PROTOTIPO.md` (v1.1). Editado: `HANDOFF.md`.
**Nenhum `.dc.html` foi alterado.** O `DESIGN_SYSTEM_FENIX.md` **ainda não** recebeu D6–D9 — elas
vivem só no gabarito.

**Onde parou:** F1 concluído, gabarito valendo como régua da camada 1.

**Próximo passo:** **F1.5 — baseline commit** (travar o estado que será auditado), depois **F2**,
a auditoria fresh-context contra o gabarito. Antes de F2 é preciso decidir se D6–D9 descem para o
`DESIGN_SYSTEM_FENIX.md` — auditar contra um DS que ainda não tem as decisões produziria achado
falso.

**Pendência do Mestre:** marcar G0 e F1 no painel do protocolo (é `localStorage`, só ele alcança).

**Retomar com:** "continuar".

---

## 47. Sessão 30/08/2026 (22ª) — D6–D9 descem para o design system

Continuação direta da §46. O Mestre mandou finalizar D6–D9 no `DESIGN_SYSTEM_FENIX.md` antes de F2 —
auditar contra um design system que ainda não tem as decisões produziria achado falso.

### 47.1 O que mudou no `DESIGN_SYSTEM_FENIX.md`

| Onde | O quê |
|---|---|
| **§2.8** | Tabela de **formato numérico** (D8): milhar com ponto, decimal com vírgula, casas fixas por grandeza, unidade junto do número. A regra 3 nomeia o defeito real — **o separador é pontuação, nunca espaço** |
| **§4.4 r6** | **Revelação nasce recolhida e continua recolhida depois do cálculo** (D9). Calcular produz número, não leitura. **Exceção única: a linha de alerta**, por R7. Mais: o gatilho de bloco recolhido mostra rótulo e valor — seta sozinha obriga a abrir para descobrir se vale abrir |
| **§4.6** *(nova)* | **Cartão de resultado em duas alturas** (D7). **A altura é que diz se o número é editável:** alto (32px mono, `−`/`+` de 44px) para rotação e avanço; baixo (20px mono, sem incremento) para as 7–8 saídas de verificação. Sem `drop-shadow` colorido, brilho, animação de chegada ou matiz por parâmetro |
| **§3** | Tokens `--h-target: 44px` e `--h-cta: 56px` — os números existiam só em prosa, e D7 precisa deles como token |
| **§9** | 6 caixas novas no checklist, para F2 verificar por comando |

### 47.2 D6 já estava lá

A §2.8 trazia `11 · 13 · 16 · 20` + `32` mono **desde o começo**, com o teto ISA-101 declarado.
O design system não era o defeito nesse ponto — **o protótipo é que não obedeceu.** Registrado no
gabarito para o auditor de F2 não caçar fantasma.

### 47.3 A divergência de escala de espaço, resolvida

O Fenix tem 7 degraus (`4·8·12·16·24·32·48`); o ToolOptimizer tem 6, sem o `48`. **Mantido o `48`** e
o gabarito corrigido: é superset, não conflita com nada, e retirá-lo mexeria em espaçamento já em uso
nas 6 folhas sem ganho nenhum.

### 47.4 Arquivos tocados

`construcao/DESIGN_SYSTEM_FENIX.md`, `construcao/prototipo/GABARITO_PROTOTIPO.md`, `HANDOFF.md`.
**Nenhum `.dc.html` foi alterado.** Commits: `12ce132` (G0 + F1) e `2572db3` (D7/D8/D9 no DS).

**Onde parou:** a régua está completa e escrita nos dois lugares certos — o gabarito diz contra o quê
medir, o design system diz o que vale. O protótipo ainda não foi tocado.

**Próximo passo:** **F1.5 — baseline commit.** Os dois commits de hoje já travam a documentação;
falta decidir se o baseline leva uma **tag** no estado atual das 6 folhas antes de F2 mexer nelas.
Depois, **F2** — auditoria fresh-context contra o gabarito, **só camada 1**.

**Pendências do Mestre:** marcar `G0` e `F1` no painel do protocolo (`localStorage`); **Q3**
(comparar duas condições, T12) e **Q4** (densidade, T1) seguem abertas; **Q2** (faixa recomendada da
trilha) adiada para sessão própria — **até lá a trilha não se desenha**.

**Retomar com:** "continuar".

---

## 48. Sessão 30/08/2026 (23ª) — a régua revisada item a item: o veredito do Mestre

O Mestre revisou a régua do produto **item por item**, numa página HTML própria: **30 itens
aprovados, 1 reprovado**, e **sete comentários que mudaram o conteúdo do que foi aprovado**. O
resultado desceu para o `GABARITO_PROTOTIPO.md` (v1.1 → v1.3) e para os cinco documentos que a
procedência tocava (§49).

### 48.1 O veredito sobre as decisões de desenho

| Decisão | O que mudou |
|---|---|
| **D2** — editar dado de material | **Invertida.** Sai da tela principal para uma área separada, de propósito mais difícil de alcançar. Dado de material é estático e padronizado; à mão, na tela principal, convida erro do operador |
| **D5** — gestão de ferramentas | **Invertida.** Entra no MVP, dentro da área nova **"Configurações"**, junto da edição de dado de material |
| **D1** — `ap` | **Alterada.** Vira caixa de digitar comum, editável o tempo todo, sem marca Partida/Manual, sem `⟲`, sem frase junto do campo. Palavras dele: "apenas a caixa para digitar" |
| **D7** — cartão de resultado | **Alterada.** Os botões `−`/`+` andam de 10% em 10%, e cada toque recalcula **todos** os resultados na hora, não só o número tocado |
| **D10** — *novo* | Ao calcular, o painel dá um retorno visual (um *check*) confirmando que a conta rodou |
| **D11** — *novo* | Cada parâmetro que o operador mexe tem uma gaveta recolhida com a instrução do que ele faz, o que acontece se aumentar e o que acontece se diminuir. Nasce fechada |
| **D12** — *novo* | O operador **cria material novo** e informa ele mesmo as constantes (classe ISO, dureza, kc1.1, mc, velocidade de corte (vc)). A lista de 12 materiais vira ponto de partida, não limite. Nenhum valor digitado é recusado ou ajustado em silêncio (R1) |

### 48.2 A área "Configurações" nasceu

Consequência de D2 + D5. Abriga a edição de dado de material (que saiu da tela principal) e a gestão
de ferramentas (adicionar / editar / apagar). Escopo próprio em `mvp/ESCOPO_CONFIGURACOES.md`
(criado nesta rodada). `histórico` e `favoritos` **deixaram de ser proibidos** e entram no MVP;
`biblioteca de ferramentas` sai da lista de proibidos como consequência da inversão de D5.
**`conta` de usuário continua proibida.** Novo documento `construcao/FUNCOES_FUTURAS.md` recebe a
trilha / faixa recomendada (D4, removida do MVP) e o perfil de máquina.

### 48.3 Arquivos tocados

`GABARITO_PROTOTIPO.md` (v1.1 → v1.3). Criados: `mvp/ESCOPO_CONFIGURACOES.md`,
`construcao/FUNCOES_FUTURAS.md`. Ver §49 para a remoção da procedência. Commits: `bba79a6`,
`7839cae`, `2783a6b`.

**Onde parou:** o veredito está escrito no gabarito.

**Próximo passo:** ver §49.

**Retomar com:** "continuar".

---

## 49. Sessão 30/08/2026 (24ª) — a procedência saiu do produto

Decisão do Mestre na mesma revisão da §48: **a procedência sai inteira** do produto — a marca de
origem no campo, "de onde veio o número", a fonte, a palavra `extrapolado`, a tela de procedência e a
margem declarada de ±15–25%. Apagada **sem rastro** ("não deve nem ter no histórico"). O que fica: os
resultados, a gaveta de instrução por parâmetro (D11), os alertas de segurança e as fórmulas — no
código, invisíveis ao operador. **É uma calculadora.**

### 49.1 A remoção, uma etapa por vez — cinco documentos

| # | Documento | Nota |
|---|---|---|
| 1 | `BRIEF_DESIGN_INTERFACE.md` | requisitos de procedência apagados/dissolvidos |
| 2 | `GABARITO_PROTOTIPO.md` | v1.2 / v1.3; a folha `Procedencia.dc.html` marcada para deixar de existir |
| 3 | `MVP_CALCULADORA_PARAMETROS.md` | grande poda, **nenhum número alterado** |
| 4 | `DESIGN_SYSTEM_FENIX.md` | tipografia e rampa de alerta intactas |
| 5 | `CANONICO_LIMITES_E_ALERTAS.md` | revogações datadas — risco + nota datada, é revogação técnica, não procedência |

Commits: `bba79a6` (revisão de conformidade do gabarito, F1), `7839cae` (14 correções, F1),
`2783a6b` (remoção da procedência + veredito, v1.3).

### 49.2 Três alertas morreram

| Alerta | Razão |
|---|---|
| Piso de esfregamento (espessura de cavaco cai demais) | Decisão do Mestre |
| Produtividade contra a potência disponível da máquina | O perfil de máquina foi revogado — sem teto de máquina não há contra o quê medir |
| Rotação acima da máxima da máquina | Dependência: sem o dado de entrada da máquina, é incalculável |

A **potência de corte na aresta (Pc)** fica — é resultado calculado, não potência de máquina.

### 49.3 Dois erros nossos que a rodada descobriu

1. **O gabarito traduzia a regra R6 errado** — dizia que ela exigia marca de origem. R6 é regra de
   **segurança** sobre o número de arestas (Z): nenhum valor de partida que erraria por fator inteiro
   é assumido em silêncio. Corrigido na §2.1 do gabarito; R6 continua viva e intocada no brief.
2. **O MVP mandava editar dado de material na tela principal** — contradizia a inversão de D2.
   Corrigido: a edição vai para a área "Configurações".

### 49.4 A fronteira, escrita em três documentos

`MVP` §552, `mvp/ESCOPO_CONFIGURACOES.md` §84/§362, `GABARITO_PROTOTIPO.md` §2.6:

> A regra **"nenhum número entra sem fonte"** é de quem **escreve os documentos do projeto** — impede
> agente e autor de inventar constante. Ela **não** governa o operador dentro do produto. Numa
> calculadora, o operador é a fonte do número dele (o catálogo do fornecedor, o ensaio, a
> experiência), e a calculadora não interroga a origem do que ele digita.

> **Nota 01/09/2026.** O Mestre estreitou a regra: ela exige fonte só para **fórmula, constante do
> motor de cálculo e limiar derivado de constante física** — não para todo número de todo documento.
> Nome, vocabulário, decisão de fluxo/UX e limiar de julgamento de produto passam a ser escolha do
> dono do produto, sem fonte externa. Ver `README.md` "A regra que organiza tudo aqui".

### 49.5 Passada de vocabulário

Com a marca morta, `extrapolado` e `editado` entraram na lista de nomes proibidos na tela — brief §11
e gabarito §2.2, datados 30/08/2026. **`manual` ficou de fora:** "valor manual" / "valores manuais"
segue nomeando um controle que divergiu da recomendação (brief §7.4, `MVP` §2.6) — é comportamento,
não marca de procedência; proibir a palavra solta derrubaria o resumo "N valores manuais" e a regra
de herança ao trocar de ferramenta. Só a marca Partida/Manual do campo `ap` morreu (D1).

### 49.6 Estado e próximo passo

- A correção das **seis folhas** `.dc.html` do protótipo está sendo planejada por outra sessão
  (`relatorios/PLANO_CORRECAO_PROTOTIPO.md`). A folha `Procedencia.dc.html` deixará de existir.
- O baseline do protótipo continua travado na tag **`baseline-prototipo-f2`** (commit `7839cae`).

**Onde parou:** procedência removida de cinco documentos e commitada (`2783a6b`); veredito do Mestre
aplicado; vocabulário de tela sincronizado.

**Próximo passo:** a fase de correção das seis folhas `.dc.html` (outra sessão), depois **F2** —
auditoria fresh-context contra o gabarito, só camada 1.

**Retomar com:** "continuar".
