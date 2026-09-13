# LESSONS — Fenix

Erros a não repetir. Um por bloco: o que aconteceu, por que aconteceu, o que fazer da próxima vez.

---

## L1 — Conferir a aritmética de todo retorno de pesquisa, principalmente a que não depende de fonte

**26/08/2026 — R6-V2, Questão 3.**

O retorno entregou a fórmula da viga escalonada com um termo faltando, e uma tabela de erros em que nenhuma linha intermediária confere. Era **a única questão da rodada que não dependia de fonte externa** — pura derivação matemática — e por isso deveria ter sido a mais segura de todas.

O erro passaria despercebido numa leitura normal: a fórmula tem cara de certa, as três parcelas estão nomeadas, e o texto até avisa que *"o termo de rotação é obrigatório; removê-lo subestima a deflexão"* — logo antes de remover metade dele.

**Por quê:** os portões da skill de validação conferem cobertura, fonte, rótulo, default, sensibilidade, divergência e lacuna. **Nenhum deles confere se a conta está certa.** Retorno de pesquisa é auditado como documento, não como cálculo.

**O que fazer:** em toda derivação matemática entregue por retorno, rodar **um teste de sanidade** antes de aceitar — um caso-limite cuja resposta é conhecida de antemão. Aqui bastou: *se os dois diâmetros forem iguais, a fórmula tem que virar a fórmula da viga simples.* Deu 0,44 em vez de 1,0, e o erro apareceu em dez segundos.

Vale também para conta de sensibilidade, conversão de unidade e tabela derivada de fórmula.

---

## L2 — Diferenciar lacuna de conhecimento de lacuna de acesso

**26/08/2026 — R6-V2, todas as questões.**

O retorno voltou `NÃO ENCONTRADO` em quase tudo, e a leitura imediata seria "o dado não existe, vira lacuna permanente". **Estava errado.** O padrão real era outro: *"artigo identificado, DOI não confirmado"*, *"edição e página não confirmadas"*, *"preview disponível"* — repetido em Kops e Vo, Altintas, Budak e ISO 3685. O pesquisador **achou** todas as referências e **não conseguiu abrir nenhuma**. A ferramenta rodava em conta gratuita.

**Por quê:** `NÃO ENCONTRADO` é um rótulo só, e cobre duas situações que exigem decisões opostas — "ninguém mediu isso" (o produto sai sem a função, e para sempre) e "está atrás de pagamento" (o produto sai sem a função **por enquanto**, e os alvos já estão nomeados).

**O que fazer:** ao ler um retorno com muitos `NÃO ENCONTRADO`, olhar **como** ele não encontrou. Se as referências foram nomeadas mas não abertas, a lacuna é de acesso — e a saída não é re-rodar a mesma busca, é obter os documentos. Duas rodadas seguidas falharam no mesmo ponto antes de isso ser percebido.

---

## L3 — Anonimato em par cego não sobrevive ao cabeçalho do arquivo

**26/08/2026 — R6-V.**

O protocolo manda sortear qual território grava `RESPOSTA_R{n}.md` e qual grava `_B.md`, e guardar o mapa em `_procedencia/`, que o validador não abre — para ele não desempatar por prestígio de fonte em vez de por evidência. O mapa não foi aberto. **Mas os dois retornos declaram o próprio território na primeira linha do arquivo.**

**Por quê:** a trava foi desenhada para proteger o mapa, e ninguém instruiu o pesquisador sobre o que **não** escrever no próprio retorno.

**O que fazer:** no enunciado de rodada em par cego, instruir explicitamente: cabeçalho neutro, sem nomear o território. A associação vive só no `MAPA_R{n}.md`.

*(Dano nesta rodada: pequeno — os territórios são distinguíveis pelo conteúdo de qualquer jeito, e o desempate se deu por método de medição declarado, que é critério de evidência.)*

---

## L4 — Modelo melhor pode dissolver um bloqueio sem pesquisa nenhuma

**26/08/2026 — `De/D` e a viga escalonada.**

O fator `De/D` bloqueava o canônico de deflexão desde a R6: a incerteza de 0,75–0,85 valia 20–29% no resultado e estourava a margem do modelo. Três rodadas tentaram abrir a referência que o sustentava. Nenhuma conseguiu.

O bloqueio caiu **sem nenhuma fonte nova**: trocando a viga simples pela escalonada, a mesma incerteza passa a valer **1% a 14%** enquanto a parte cortante da fresa for até metade do balanço — que é a montagem normal de oficina.

**Por quê:** a sensibilidade de uma constante não é propriedade só dela — é propriedade **dela dentro do modelo**. Perguntar "esse número é confiável o bastante?" sem perguntar "confiável o bastante *para qual modelo*?" leva a caçar precisão que o modelo certo dispensa.

**O que fazer:** antes de declarar que uma constante bloqueia por incerteza, verificar se um modelo mais fiel — e às vezes mais barato de implementar — reduz o peso dela. Aqui o modelo certo custou uma linha de conta a mais e uma entrada que já está gravada na haste de qualquer fresa.

---

## L5 — Nome ambíguo é conflito disfarçado de acordo

**26/08/2026 — reconciliação JTBD × escopo.**

Sete pontos de conflito foram registrados entre o JTBD e a especificação. Conferidos um a um, **dois deles não eram divergência de decisão — eram a mesma palavra nomeando objetos diferentes**:

| Palavra | Quantos objetos | Onde |
|---|---|---|
| "camada 2" | **três** | limites de máquina (`E0`, MVP) · profundidade de entrada (JTBD) · tipo de operação ainda como entrada (`E5` §7.1) |
| "modo rápido" | **dois** | a calculadora reduzida de quatro campos que o MVP §12 excluía · o fluxo normal de cinco campos que o JTBD pedia |

O segundo produziu um erro de leitura que entrou no meu próprio relatório de verificação: "o MVP exclui o modo rápido, o JTBD faz dele o MVP — conflito de corte". Postas as **listas de campo** lado a lado, eram a mesma lista, menos um campo. Não havia conflito de corte nenhum.

**Por quê:** dois documentos que usam o mesmo termo passam por concordantes numa leitura de resumo. O termo é o que os alinha visualmente e o que esconde a divergência. **E o mesmo mecanismo funciona ao contrário:** dois documentos que descrevem a mesma coisa com palavras diferentes passam por conflitantes.

**O que fazer:** antes de reconciliar conteúdo, reconciliar vocabulário. Para cada termo que aparece nos dois lados, **listar os itens concretos que ele cobre em cada um** — campos, valores, comportamentos — e comparar as listas, nunca as frases. Se as listas divergem, o termo está sobrecarregado e sai do projeto; se coincidem, o conflito era aparente.

Custo de não fazer: os quatro documentos de escopo que faltam derivavam de "camada 2" e teriam sido escritos sobre um nome que significava três coisas.

---

## L6 — Documento novo com precedência não resolve conflito: empilha

**26/08/2026 — a escolha da forma da reconciliação.**

O `E0` nasceu em 20/08 exatamente assim: uma decisão posterior que declarava vencer os documentos já escritos e listava, na §6, três conflitos "registrados para reconciliação, não resolvidos aqui". **Seis dias depois os três continuavam abertos**, e o JTBD chegou pedindo uma quarta camada por cima.

O padrão tem apelo real — é barato, preserva o histórico de cada divergência e não obriga a reler o documento grande. O que ele não faz é **fechar** nada: cada camada nova adia o fechamento e aumenta o número de documentos que precisam ser lidos juntos para saber o que vale.

**Por quê:** declarar precedência é mais fácil que reconciliar, e o resultado *parece* resolvido — existe um documento novo, datado, dizendo quem vence. A pendência fica registrada, o que dá a sensação de que foi tratada.

**O que fazer:** quando uma decisão nova contradiz documento escrito, **reescrever o documento contradito**. Se ele for grande, edição cirúrgica com a divergência registrada dentro dele — foi o que o MVP já fazia bem na §0.3, e o que a §0.4 continuou. Documento novo com precedência só se presta a **estrear** um assunto, nunca a corrigir um.

Este é o projeto que existe porque um sistema anterior acumulou documentação contraditória. Empilhar precedência aqui seria reproduzir a doença dentro da cura.

---

## L7 — Conferir o registro contra o texto, nunca contra o resumo do registro

**26/08/2026 — os sete pontos.**

`ATUALIZACAO_NECESSARIA.md` foi escrito com cuidado e por quem tinha a entrevista fresca. Ainda assim, **três dos sete pontos descreviam errado a forma do problema**:

| Registrado | O que o texto dizia |
|---|---|
| "a altura de fixação aparece como campo secundário" | é **obrigatória** (§4.1) e é o passo 5 do fluxo (§2.2). O defeito era o **efeito**: ela não move `Vc`, `fz` nem `ap` |
| "os dois blocos não existem na spec" | o MVP §12 os **exclui com motivo técnico declarado** — e o motivo é a mesma lacuna com que a R6 tinha sido encerrada no mesmo dia |
| "conflito de corte no modo rápido" | dois objetos com o mesmo nome (ver L5) |

Nenhum dos três invalidava o ponto. Todos os três mudavam **o que fazer a respeito** — de "escrever o que falta" para "abrir a lacuna que o bloqueia", que é trabalho diferente.

**Por quê:** um registro de conflito é escrito a partir da memória de leitura dos dois lados, não com os dois textos abertos. A memória guarda a conclusão e perde a forma.

**O que fazer:** todo registro de conflito é **hipótese**, não achado. Antes de agir sobre ele, abrir a seção citada e ler o que está escrito. O custo é de minutos; o custo de não fazer é reescrever a coisa errada.

---

## L8 — Canônico escrito a partir do resumo do validador, não da fonte primária, herda o erro do resumo

**26/08/2026 — auditoria de `CANONICO_VELOCIDADES_E_AVANCOS.md` contra R4.**

Uma auditoria cética contra as três fontes de R4 (`RESPOSTA_R4.md`, `RESPOSTA_R4_B.md`, `VALIDACAO_R4.md`) achou 7 discrepâncias. As mais graves eram sempre do mesmo tipo: um número ou rótulo de confiança que batia certinho com a tabela-resumo de `VALIDACAO_R4.md`, mas não com o retorno cru que essa tabela resumia. A faixa de `α` (0,17–0,49 em vez de 0,14–0,49) veio assim: o validador já tinha escorregado ao transcrever, e o canônico herdou o número errado **porque conferiu contra o resumo, não contra a fonte**. O mesmo padrão apareceu em dois rótulos `CONSENSO` que nenhuma das duas fontes originais atribuía àquele achado específico.

**Por quê:** o resumo do validador existe para ser mais rápido de ler que os dois retornos crus — e é sedutor demais escrever o canônico só a partir dele. Mas o resumo já é uma segunda transcrição; todo erro de transcrição nele vira erro de terceira geração no canônico, sem nenhum sinal de que aconteceu (o número parece ter fonte, porque tem — só que a fonte errou um passo antes).

**O que fazer:** ao escrever ou auditar um canônico, todo número e todo rótulo de confiança precisam ser conferidos contra o retorno cru (`RESPOSTA_R{n}.md`), não contra a tabela-resumo da validação. A tabela-resumo serve para navegar, não para citar.

---

## L9 — Rótulo qualificado na fonte não pode entrar no canônico como rótulo liso

**26/08/2026 — auditoria de `CANONICO_DEFLEXAO_E_VIDA.md` contra R6.**

`RESPOSTA_R6.md` usa rótulos **qualificados** em vários blocos: `CONSENSO` *qualitativo* (Bloco 3), `CONSENSO` *matemático* (Bloco 8), `CONSENSO` *conceitual* (Bloco 15). O canônico transportou dois deles como `CONSENSO` liso — apagando o adjetivo. `VALIDACAO_R6.md` (G3) tinha antecipado exatamente isso e deixado a instrução escrita: *"Não transportar os rótulos qualificados para o canônico. Onde a afirmação é matemática, ela se sustenta pela conta, sem rótulo."* A instrução estava lá e não foi seguida.

**Por quê:** o adjetivo parece decoração, e some sem deixar buraco na frase. Mas ele é o que separa "três fontes independentes mediram e convergiram" de "isto é uma identidade algébrica" — coisas que sustentam decisões muito diferentes. Pior: `CONSENSO` liso é o rótulo mais forte do vocabulário, e o canônico é lido como fonte de verdade, sem o retorno cru ao lado. Apagar o adjetivo **promove** a afirmação.

**O que fazer:** rótulo com adjetivo não se transporta. Se a afirmação é matemática (identidade, rearranjo, definição), ela entra **sem rótulo nenhum**, dizendo que se sustenta pela conta. Se é qualitativa, entra como conclusão em prosa, sem selo. Selo do vocabulário (`CONSENSO` / `REFERÊNCIA ÚNICA` / `SEM CONSENSO` / `NÃO ENCONTRADO`) é para dado medido, e só.

---

## L10 — Nota que manda elevar um rótulo não é evidência de que o rótulo deve subir

**26/08/2026 — issue #2, `E` do metal duro.**

`CANONICO_DEFLEXAO_E_VIDA.md` §5 registrava, em uma linha, que o `E` em `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.2 devia subir de `REFERÊNCIA ÚNICA` para `CONSENSO`. Aplicar essa linha ao pé da letra teria produzido três erros: (a) o **580 GPa não é número publicado** — `VALIDACAO_R6V.md` G4 diz que é *"escolha de engenharia dentro de 570–585"*; (b) o `CONSENSO` vale para a **faixa e o método**, não para a tabela grau a grau, que vem de um fabricante só e a própria validação marca como `RESSALVA`; (c) a tabela por grau em `CANONICO_DEFLEXAO_E_VIDA.md` §2.1 estava com o defeito **inverso** — `CONSENSO` linha a linha onde cabia `REFERÊNCIA ÚNICA`. A ida à fonte também mostrou que a elevação era legítima, mas por um motivo que a nota não dizia: a R6-V não reciclou as três fontes que a auditoria da R3 tinha derrubado, trouxe outras três com método declarado.

**Por quê:** a nota de pendência é escrita por quem estava com o assunto fresco, e por isso soa autossuficiente. Mas ela é um **ponteiro**, não a apuração — comprime em uma linha algo que a fonte diz com ressalvas. Aplicá-la sem reabrir a fonte é o mesmo defeito de `L8`, um nível acima: em vez de herdar o erro do resumo do validador, herda-se o erro do resumo do canônico anterior.

**O que fazer:** ao executar uma pendência registrada em canônico, reabrir a validação que a originou antes de editar — e conferir os dois lados, porque o erro simétrico costuma estar no documento que **levantou** a pendência. Registrar na issue o que a checagem achou além do previsto, para o próximo não repetir a ida.

---

## L11 — "Decisão do Mestre" rotulada na issue pode já estar respondida em documento escrito

**26/08/2026 — issue #1, `L2` da viga escalonada.**

A issue #1 e o `HANDOFF.md` marcavam "de onde vem `L2`" como decisão do Mestre, com duas saídas propostas (usuário mede e informa, ou sistema estima por classe). Abrir `MVP_CALCULADORA_PARAMETROS.md` §4.1 antes de perguntar mostrou que o campo **já existia**: `Lc` — comprimento de aresta —, opcional, cadastrado desde a escrita do MVP para outro uso (teto de `ap`). A pergunta "de onde vem o dado" já tinha resposta: do mesmo lugar de onde vêm os outros campos opcionais do painel.

**Por quê:** quem registrou a pendência (`CANONICO_DEFLEXAO_E_VIDA.md` §1.1) viu a lacuna do lado da fórmula — falta um dado — e não verificou se o dado já tinha entrada do lado do produto. As duas metades do projeto (canônico e MVP) foram escritas em sessões diferentes; a pendência nasceu no ponto de sutura.

**O que fazer:** antes de escalar uma lacuna de fórmula como decisão de produto, grep pelo nome físico da grandeza (aqui, "comprimento" + termos correlatos) nos documentos de escopo e MVP já escritos. Se o campo existe, a resposta é técnica (nomear a correspondência), não de negócio — decide-se e declara-se a suposição, não se pergunta.

---

## L12 — Escrever escopo a partir do MVP arrisca copiar o corte para dentro do domínio

**26–27/08/2026 — escrita de E1 e E2.**

A fonte mais completa de conteúdo para E1 e E2 é `MVP_CALCULADORA_PARAMETROS.md` — é lá que estão as 17 geometrias, os campos, as faixas e os controles. Mas o MVP é um **corte**: metade do texto dele diz *"isto fica para depois"* e *"isto foi descartado"*. Copiar parágrafo de lá para `escopo/` sem filtrar leva junto o recorte temporal — e a `escopo/LEIA-ME.md` proíbe exatamente isso: escopo descreve o que o sistema **faz**, sem status de implementação e sem ordem de construção.

**Por quê:** as duas camadas usam as mesmas frases e as mesmas tabelas. A diferença não está no conteúdo, está no tempo verbal e na presença de "agora não". É invisível enquanto se copia e óbvio quando alguém lê o escopo seis meses depois e não entende por que um documento de domínio fala de fases.

**O que fazer:** ao escrever E4 e E7 a partir do MVP, aplicar três cortes na leitura — (a) tirar todo "fica para depois / fora do MVP", que é `mvp/` e E7; (b) tirar toda citação de seção interna de outro documento e resolver a referência pelo nome da regra; (c) tirar rótulo de confiança de pesquisa (`CONSENSO`, `REFERÊNCIA ÚNICA`), que pertence a `canonicos/` — no escopo entra como "firme" ou "declarado como frágil", com a fragilidade consolidada no fim do documento.

---

## L13 — Documento que consolida regra dispersa é o que revela conflito entre documentos

**27/08/2026 — escrita de E4.**

Escrever E4 obrigou a juntar, num lugar só, regras de alerta que viviam espalhadas em `E0`, `E2`,
`E3`, `E5`, no MVP e em dois canônicos. Duas contradições apareceram sozinhas e nenhuma delas era
visível dentro do próprio documento onde morava: `E5` §5.6 mandava o controle **parar** no limite da
máquina, enquanto `E0` §6 C1 registrava exatamente esse comportamento como **removido**; e
`CANONICO_LIMITES_E_ALERTAS.md` §1.4 fazia a deflexão **virar limite físico** acima de 2× a
tolerância, enquanto `E0` já dizia que dado declarado pelo operador nunca bloqueia.

**Por quê:** cada documento foi escrito numa sessão, contra a fonte daquela sessão. A contradição só
existe no cruzamento, e o cruzamento não tem dono — ninguém lê seis documentos lado a lado até
alguém precisar escrever o sétimo.

**O que fazer, em duas partes:**

1. **Ao escrever documento consolidador, comparar cada regra herdada com o documento que vence** —
   não com a memória da sessão anterior. Aqui, `E0` vence todo o escopo, e os canônicos vencem em
   número e fórmula. Onde o herdado divergir do que vence, é conflito, não detalhe de redação.
2. **Decisão de produto que muda o efeito de um canônico não se corrige reescrevendo o canônico.**
   Entra como **nota de precedência datada no cabeçalho**, dizendo o que continua valendo (limiar,
   fórmula, procedência) e o que saiu (o efeito na tela). Reescrever o corpo apagaria a apuração
   contra fonte para registrar uma escolha que não é de pesquisa.

---

## L14 — Levar 29 perguntas em bloco não é entregar decisão, é transferir o trabalho

**27/08/2026 — escrita de E7 e montagem do bloco de decisão.**

O escopo mandava acumular as perguntas e levá-las ao Mestre **em bloco**, e a razão era boa: decidir
caso de borda isolado gera decisão inconsistente com a vizinha. Mas "em bloco" virou 29 perguntas de
uma vez, de seis documentos, sobre frentes com maturidade completamente diferente — e uma lista
dessas não é decidível: ela é devolvida, ou respondida no cansaço.

**O que a triagem mostrou:** das 29, **só 10 afetavam o que vai ser construído**. Dezesseis
pertenciam a frentes adiadas (ambiente declarado, histórico, favoritos, biblioteca) ou estavam
bloqueadas por dado, e três já tinham decisão no corte do MVP e só precisavam de confirmação.

**Por quê:** a pergunta foi arquivada no documento onde nasceu, e o documento não sabe se o que ele
descreve vai ser construído agora ou daqui a um ano. **A natureza da fronteira do item — adiado,
bloqueado, ativo — é que decide se a pergunta é urgente, e ela vive em E7, não na pergunta.**

**O que fazer:** antes de levar qualquer bloco de decisão, cruzar cada pergunta com a lista de
fronteiras e separar em três — *decidir agora* (toca o que vai ser construído), *confirmar* (já
decidida em outro corte, falta promover) e *pode esperar* (frente adiada ou bloqueada por dado). As
que podem esperar vão junto, com recomendação preliminar de uma linha, para não se perderem — mas
marcadas como não urgentes. Bloco sem triagem é lista; bloco triado é decisão.

**Corolário de contagem:** pergunta prejudicada continua ocupando número e sumindo da conta. Contar
**item vivo**, nunca o maior número emitido — a soma das tabelas dizia 30 e as vivas eram 29.

---

## L15 — Regra confirmada de passagem numa clarificação tem raio de impacto maior que a pergunta que a gerou

**27/08/2026 — aplicação do bloco de decisão.**

A Q29 (rasgo cheio sem o comprimento de aresta) parecia um caso de borda de uma mensagem só. Ao
explicá-la, o Mestre respondeu com um princípio geral — *"o alerta descreve o risco e situa o valor,
não instrui"* — e confirmou como regra. Mas essa regra **não estava entre as 13 perguntas**: ela
reescreveu as 7 mensagens de gatilho do E4, o §9 do E5, o §1 do canônico de limites e o §9 do MVP, e
deixou **dois blocos inteiros** (E4 §6, MVP §7.4 — "o que mexer") num estado ambíguo que precisou de
marcador `EM REVISÃO` e de uma decisão nova do Mestre.

**Por que aconteceu:** a pergunta era estreita, a resposta foi larga, e a largura só ficou visível
depois — ao aplicar. "Confirma a regra?" foi respondido sem que o Mestre visse a lista de documentos
que a regra tocava.

**O que fazer:** quando uma resposta de clarificação vira princípio geral, **antes de aplicar**,
mapear e mostrar o raio de impacto — quais seções, quais features param de fazer sentido — e separar
o que se aplica direto do que precisa de decisão à parte. Uma regra nova nunca é só a frase; é a
frase mais tudo o que ela contradiz.

**Desfecho (28/08):** os dois blocos "o que mexer" foram resolvidos — a 14ª regra é do *alerta*, não
do painel. Ver `L19` para o erro cometido nessa resolução.

---

## L16 — Pedido de ferramenta não é pedido de trabalho

**27/08/2026 — corpus de dados da indústria.**

O Mestre pediu uma **skill** para investigar e compilar a documentação da indústria. Eu pesquisei as
referências, desenhei a skill, e então — quando ele disse "faça um plano" — planejei **o inventário**,
o trabalho que a skill faria, e cheguei a apresentar o plano para aprovação. Ele teve que corrigir:
*"o que pedi foi uma skill, então primeiro você deve criar a skill especialista"*.

**Por que aconteceu:** o trabalho é concreto e a ferramenta é abstrata, então a atenção escorrega
para o trabalho. Pior: o plano do inventário estava **certo** — só respondia à pergunta errada, que é
o jeito mais convincente de errar.

**O que fazer:** quando o pedido nomeia um artefato reutilizável — skill, template, protocolo,
gerador — **o artefato é a entrega, e o caso de uso é só o teste dele**. Antes de planejar, dizer em
uma linha qual é o objeto entregue ao fim. Se essa linha descreve uma execução e não uma ferramenta,
o alvo já escorregou.

---

## L17 — O olho pega contradição entre documentos; só o recálculo pega defeito dentro da fórmula

**27/08/2026 — auditoria dos documentos técnicos.**

O plano da auditoria trazia ~15 candidatos a achado, colhidos lendo os canônicos. Auditados contra
`arquivo:linha`, **4 dos 11 conferidos estavam imprecisos**: uma citação apontava para a seção errada
(`r_e` no MOTOR, que não existe lá), uma afirmava ausência de algo que existia (a nota de equivalência
do `hex`, em `MOTOR:177`), e uma culpava o documento **certo** — o `MVP` §6.7, que omite a correção
`γ` de propósito e declara por quê.

Mais importante que a taxa de erro: **o achado mais grave da auditoria não estava na amostra.** O
travamento de `φmax` em `MOTOR` §1.4, que faz a espessura média sair maior que o avanço por dente, só
apareceu ao **refazer a integral**. Nenhuma leitura o pegaria: as duas linhas estão corretas
isoladamente, e o defeito é o passo 4 consumir um valor que o passo 2 travou para o passo 3.

**Por que aconteceu:** ler compara textos, e comparar textos acha divergência entre cópias — que é
barato e visível. Defeito dentro de uma fórmula única não tem com o que ser comparado; ele só aparece
contra a física. A amostra colhida na leitura, então, é sistematicamente enviesada para o tipo mais
barato de achado — e um plano calibrado por ela subinveste justamente no verificador que paga.

**O que fazer:** amostra de leitura serve para **dimensionar** o trabalho, nunca para prever o
resultado. Antes de aprovar plano de auditoria, conferir a amostra contra `arquivo:linha` — e não
deixar a ausência de um assunto na amostra virar razão para cortá-lo do escopo. Recalcular toda
fórmula que vai virar código, mesmo as que ninguém apontou, principalmente onde um valor calculado
num passo é reaproveitado noutro.

---

## L18 — "seguir" confirma a recomendação apresentada, não autoriza escopo que o pedido da sessão não pediu

**27/08/2026 — abertura da 15ª sessão.**

O pedido foi *"faça uma análise para decidir o que deve ser feito, escolhendo uma habilidade da
skill para executar"*. O `HANDOFF` de fundo dizia *"próximo passo: rodar o modo 1 (inventário)"*, e o
plano `PLANO_DADOS_INDUSTRIA_CNC.md` tinha escopo amplo aprovado. Recomendei o modo 1, o Mestre
disse **"seguir"**, e eu varri 6 projetos (read-only) para montar `INVENTARIO_DADOS_INDUSTRIA.md`.
Ele respondeu: *"eu não pedi para auditar outros projetos, estamos trabalhando no Fênix, não
autorizei"* — e o pedido real era **auditar a prontidão da doc do Fenix para o MVP**.

**Por que aconteceu:** o "seguir" veio logo depois da recomendação, antes de o Mestre ter
processado que ela implicava sair da pasta do Fenix — e a `CLAUDE.md` do projeto tem
*"Fronteira de pastas: todo trabalho do Fenix mora aqui"*. Um plano aprovado semanas antes não
transfere autorização para a sessão de hoje; o pedido de hoje (*"analise e decida"*) pedia análise,
não execução de uma varredura de 6 projetos.

**O que fazer:** quando o plano de fundo e o pedido imediato divergem em **escopo** — e mais ainda
quando o trabalho toca arquivos fora da pasta do projeto — dizer isso em uma linha **antes** de
executar, mesmo com um "seguir" na mesa: *"isso vai ler os repositórios X, Y, Z além do Fenix;
confirma?"*. O "seguir" confirma o **quê**, não o **quanto**.

---

## L19 — A regra de um artefato não se estende a outro por semelhança; e tom técnico não é neutro

**28/08/2026 — o painel "o que mexer".**

A 14ª regra — *"o alerta não instrui"* — deixou o painel *"o que mexer"* marcado `EM REVISÃO`, e minha
primeira proposta foi estender a regra a ele: tirar o verbo de comando, mostrar só *"como cada
grandeza responde"*. O Mestre recusou por dois motivos. **Um:** o painel existe **para** dar direção —
o operador o abre justamente pedindo *"para onde ando"*. A regra que proíbe direção o esvazia. O
alerta e o painel se parecem (os dois falam de parâmetro e consequência), mas têm funções opostas:
um interrompe sem ser chamado, o outro é consultado. **Dois:** *"a espessura média responde na razão
inversa do engajamento"* e *"a MRR sobe de 8,0 para 11,3 cm³/min"* são precisos e inúteis para quem
está na máquina — o tom técnico é uma barreira, não uma posição neutra.

**Por que aconteceu:** apliquei a regra pela forma ("é uma frase no imperativo, a regra proíbe
imperativo") em vez de pela função ("para que serve este bloco, e a regra o mantém ou o quebra?").

**O que fazer:** antes de estender uma regra a um artefato que ela não nomeou, checar contra o
**propósito** do artefato, não contra a semelhança de superfície. E quando o texto vai para o
operador, medir o tom pela pergunta *"um fresador entende isso sem parar para pensar?"* — número com
unidade técnica quase sempre falha.

---

## L20 — Prompt de design: pedir muitas telas de uma vez, e em tom majoritariamente negativo, produz resultado genérico

**28/08/2026 — a primeira tentativa no Claude Design.**

Escrevi um prompt pedindo **três direções conceituais distintas**, cada uma com quatro artboards, mais
quatro estados extras na recomendada — entre 16 e 20 telas numa geração só. Junto, empilhei 15 regras
invioláveis, 18 anti-requisitos e dois padrões visuais proibidos por nome. O retorno foi, nas palavras
do Mestre, "bem estranho".

**Por que aconteceu — três erros independentes, e qualquer um bastaria:**

1. **Escopo grande demais para uma geração.** A qualidade de um layout desaba muito antes da décima
   tela. Pedir variação antes de existir uma base boa multiplica o ruído em vez de dar escolha.
2. **Prompt majoritariamente negativo.** Quando a maior parte do texto diz o que **não** fazer, o
   orçamento de atenção vai para a evitação, e o que sobra para desenhar é o caminho mais óbvio —
   que é exatamente o genérico que as proibições queriam impedir.
3. **Escrevi o prompt antes de o design system existir.** Sem linguagem visual definida, a ferramenta
   inventa uma. Esse foi provavelmente o maior fator isolado, e era o mais fácil de evitar: o DS foi
   escrito **depois**, na mesma sessão.

**O que fazer:**

- **Uma tela por rodada**, começando pelo caso difícil — aquele com o maior número de elementos
  simultâneos e o estado mais carregado. Se a ferramenta acerta esse, o resto é derivação. Variação e
  estados vêm em rodadas seguintes, sobre uma base já aprovada.
- **Design system anexado antes do primeiro pedido de tela.** Ordem é: tokens → uma tela → variações.
- **Poucas regras duras por rodada** (quatro, não trinta e três). As demais entram na revisão, não no
  pedido.
- **Pedir a tese antes do desenho.** Duas ou três linhas dizendo como a ferramenta vai resolver a
  tensão central, com aprovação antes de gerar — matar uma direção ruim ali custa uma frase; matá-la
  depois custa vinte artboards.
- **Conteúdo literal e travado.** Todo número e todo rótulo escritos no prompt, com a instrução
  explícita de não inventar, não traduzir e não abreviar.

---

## L21 — Ter a regra em contexto não é cumpri-la: regra enumerável pede varredura mecânica

**28/08/2026 — protótipo visual do painel (seção 34).**

Desenhei os cinco quadros com o brief e o design system **abertos no contexto**, citando as regras
enquanto escrevia. Mesmo assim entreguei cinco defeitos, e **quatro eram violação direta de regra que
eu tinha na mão**: uma cor fora dos tokens da §3 do DS, dois termos encurtados contra o §11 do brief
("L/D" no lugar de "relação balanço/diâmetro (L/D)"), uma afirmação de contagem sem base — e um
**número inventado** (1740 N/mm²) num exemplo onde bastava usar o 1800 que o `MVP` §11.1 já nomeia.

**Por que aconteceu:** ler a regra e aplicá-la são operações diferentes. Ao escrever 400 linhas de
marcação, a atenção vai para o layout; a conformidade some no ruído. E as quatro regras violadas têm
uma coisa em comum: **são enumeráveis** — uma lista fechada de tokens, uma tabela fechada de termos
obrigatórios, uma tabela fechada de valores publicados.

**O que fazer da próxima vez.** Regra enumerável não se confere lendo, se confere com comando. Antes
de publicar qualquer artefato visual:

- `grep -oE "#[0-9A-Fa-f]{6}" *.html | sort -u` — toda cor tem que estar no bloco CSS do DS §3.
  A varredura achou o `#000000` que três leituras não acharam.
- Conferir cada rótulo contra a tabela de vocabulário do brief §11 — nome por extenso + símbolo,
  **em todos os quadros**, inclusive no celular, onde a falta de espaço convida a abreviar.
- Todo número da tela tem que ser rastreável a uma linha de documento. Se não é, ou vai o número do
  documento, ou o exemplo muda para um caso que o documento cobre. **Não existe número de
  demonstração.**

**A generalização:** isso vale para qualquer entrega contra documento canônico, não só desenho. Onde
a regra é uma lista, a conferência é um comando — não uma releitura.

---

## L22 — Proposta de próximo passo não junta ação segura com ação ampla sob um "pode seguir" só

**29/08/2026 — reconciliação da crítica do protótipo no HANDOFF.**

Fechei a análise das críticas propondo *"reconciliar os dois documentos no `HANDOFF` §34 **e** ajustar
o protótipo"*. O Mestre disse "sim", e em seguida teve que interromper: *"apenas reconciliar não
altera o protótipo ainda"*. O "sim" era para a reconciliação — barata, reversível, esperada —, não
para as 19 mudanças em 5 arquivos `.dc.html`, várias dependentes de decisão de desenho que ainda não
existe.

**Por quê:** a frase conjugava dois verbos com reversibilidade oposta. "Reconciliar" atualiza um doc
de estado — um comando desfaz. "Ajustar o protótipo" reescreve o contrato visual — amplo, metade
ainda em aberto. Oferecidos como par, o "pode seguir" cai sobre o par inteiro, e a parte ampla entra
de carona na aprovação da estreita. É o mecanismo do `L18` (o "seguir" confirma o quê, não o quanto),
mas aqui o defeito é meu, na construção da proposta, não numa autorização herdada.

**O que fazer:** quando a proposta de próximo passo tiver um "e" ligando dois verbos, checar se têm
a mesma reversibilidade. Se não — atualizar doc × reescrever artefato, escrever × publicar, um
arquivo × vários —, são duas propostas em sequência: a segura primeiro, a ampla como decisão à parte
com o custo nomeado. Uma proposta = um nível de risco.

---

## L23 — Número errado no exemplo canônico não é erro de aritmética: é o estado da tela que deixa de existir

**29/08/2026 — recálculo do `MVP` §7.6.**

O `L17` já dizia que só o recálculo pega defeito dentro da fórmula. Esta sessão mostrou a metade que
faltava: **quando o número errado é o que dispara um gatilho, corrigi-lo não corrige um número —
apaga um estado.** Com `hex` refeito de 0,018 para 0,036 mm, o alerta de esfregamento que o protótipo
inteiro encenava simplesmente não dispararia, e o exemplo canônico deixaria de ser o caso difícil que
justifica a hierarquia da tela. A cadeia certa produzia uma tela que não é a tela desenhada.

**E o gatilho que sobrava não servia:** o `1a` (`hm < 0,1 mm`) ficava ativo, mas **nenhum ajuste de
um parâmetro só o resolve** dentro da escala do §5.3. Um exemplo com alerta sem direção alcançável
viola o §7.4 r5 — a direção que resolve vem primeiro — e vira demonstração de impotência.

**O que fazer, e a ordem importa:** ao corrigir número que alimenta gatilho, (1) recalcular a cadeia,
(2) **rodar todos os gatilhos contra os números novos**, (3) só então decidir o que o exemplo passa a
ser. Se o estado que o documento precisa ilustrar sumiu, **ajusta-se uma entrada — nunca um
resultado** — e escolhe-se a entrada que já tem justificativa no próprio documento (`ae/D` de 5% é
faixa recomendada pelo §9.5, não caso forçado).

**Dois subprodutos que só apareceram porque a varredura foi de gatilho, não de número:**
- **A trava é solidária:** `hex/hm → 2` faz o gatilho `1a` disparar sempre que o `1` dispara. Não
  existe, nesta geometria, exemplo com um alerta só — logo o caso canônico é **obrigatoriamente** o
  de duas condições ativas. Isso é regra de produto, e ninguém tinha percebido.
- **O limiar não tinha fonte.** O piso de 0,030 mm que o exemplo declara há sessões não sai de lugar
  nenhum: o gatilho é `0,3 × rβ`, e a `L4` põe o piso entre 1,2 e 38 µm, com o caso trabalhado dela
  mesma em 3 µm. **Recalcular o número expôs que o limiar contra o qual ele é comparado era o
  problema maior.** Declarado como lacuna, não arbitrado.

**A generalização:** exemplo canônico é contrato de estado, não ilustração aritmética. Toda vez que
um número dele muda, a pergunta seguinte não é "os outros números batem?" — é **"que estado esta tela
está agora?"**

---

## L24 — Alerta que só dispara com todos os controles no mínimo da escala não é alerta: é limiar sem fonte

**29/08/2026 — R7, o piso de espessura de cavaco (`VALIDACAO_R7.md`).**

O gatilho 1 do `MVP` §9.2 (`hex < 0,3 × rβ`) foi tratado por três documentos e um protótipo inteiro
como **o alerta mais importante do produto**. Com o `rβ` real apurado, o piso cai para **3,6 µm** e a
regra passa a exigir `fz` **e** `ae` simultaneamente no mínimo absoluto da escala do próprio controle —
`fz` < 15% do piso que o §5.3 oferece. **Ela nunca dispara.** Antes, com o limiar errado de 30 µm, ela
disparava em condição normal de trabalho: **falso positivo.** Quebrada nas duas direções, e em nenhuma
delas o defeito era o cálculo.

**Por que passou tanto tempo:** a `L23` já tinha ensinado a perguntar "que estado esta tela está?"
depois de mudar um número. Faltava a pergunta anterior: **"em que faixa de entrada real este alerta
dispara?"** Ninguém tinha varrido a escala do controle contra o limiar — só conferido a fórmula.

**O que fazer da próxima vez.** Todo gatilho de alerta entra com **duas contas ao lado**, não uma:

- o valor no **exemplo canônico**, e
- o valor nos **dois extremos da escala do controle que o alimenta**.

Se o gatilho não muda de lado em nenhum ponto da escala real, ele **não é regra** — é limiar sem
fonte, e vai para lacuna declarada em vez de para a tela. Regra que nunca dispara e regra que sempre
dispara custam o mesmo: ensinam o operador a ignorar o bloco.

**Duas notas de método que a rodada pagou** (detalhe em `VALIDACAO_R7.md` §8):

- **Pergunta que convida à confirmação recebe confirmação.** A Q4 foi escrita dizendo que *"a regra
  não dispara"* seria resposta mais útil que a confirmação. O território que respeitou isso é o que
  serviu; o que contornou precisou **inventar três artigos**.
- **O terceiro território pagou por si.** Com dois, a divergência sobre "existe piso publicado em
  mm?" ficaria em empate — e empate sobre existência de fonte tende a ser resolvido a favor de quem
  alega, porque alegar é mais específico que não achar. Com três, virou 2 contra 1, e o 1 era o que
  fabricou fonte.
- **Fonte inventada é pior que fonte ausente**, e o `§0.2` não a pega sozinho. Os três artigos
  fabricados tinham autor, periódico, DOI e rótulo `CONSENSO` — atravessariam qualquer leitura de
  plausibilidade. **O que os pegou foi abrir o localizador**, não desconfiar do estilo. Retorno de
  pesquisa com número que vai virar produto tem **pelo menos uma citação conferida na fonte**, e a
  escolhida é a que sustenta o número mais caro.
- **A resposta útil veio de quem disse "não sei".** O retorno aceito é o que mais escreveu
  `NÃO ENCONTRADO`; o rejeitado é o que respondeu tudo.

**E a decisão não foi fechada pelo número — foi fechada pelo mercado.** O que resolveu não foi
apurar o piso, foi descobrir que **nenhum fabricante alerta sobre esfregamento**: todos publicam
avanço recomendado com fator de correção por penetração radial. Eles **previnem**, não avisam. A
ausência de fonte não era lacuna de pesquisa — **era a resposta**. Quando duas rodadas não acham um
número que "deveria existir", a pergunta seguinte não é onde procurar de novo: é **se o produto está
tentando resolver um problema que o mercado já resolve de outro jeito**.

---

**29/08/2026 — três defeitos da skill de reconciliação, achados por rodá-la no próprio projeto.**

Os três só apareceram porque a skill foi usada no Fenix no mesmo dia em que nasceu. Nenhum teria
aparecido em revisão de código.

**1. Varredura incompleta que não se declara é pior que varredura estreita.** O inventário lia só
`.md` e `.mdx`. As cinco folhas `.dc.html` do protótipo e o design system ficaram de fora — e a
saída não dizia isso. O relatório teria fechado com "0 links quebrados em 91 documentos" sem uma
linha admitindo o que não foi olhado. **Toda ferramenta de varredura imprime o que varreu**, e o
relatório repete: o que não está na lista não foi olhado.

**2. Cobrir mais superfície inventa achado falso se o critério não muda junto.** Ao passar a ler
`href`/`src` no HTML, apareceram **13 falsos positivos**: `./support.js` e `./vendor/react.js` (o
host injeta em tempo de execução) e três pedaços de código JS que o regex capturou. A skill manda
link quebrado **direto para o relatório como `BLOQUEIA`, sem revisão** — 13 bloqueios falsos teriam
custado mais que a cegueira original. Critério novo: no HTML só vale link para documento ou imagem;
no Markdown, `](caminho)` é prosa autoral e qualquer caminho vale.

**3. Verificador de fato tem que ser testado nos dois estados — e o teste que importa é o vermelho.**
Dois erros seguidos, na mesma sessão, com a regra já escrita no documento da skill:

- **Nasceu verde.** `grep -q 'balanço/diâmetro' BRIEF.md` passava — o termo aparece 4 vezes no
  documento, nenhuma no trecho errado. Um verificador que sai verde com o drift aberto não prova
  nada; ele só provou que o `grep` acha alguma coisa em algum lugar.
- **Nasceu vermelho para sempre.** `! grep -rq 'piso de 0,030 mm'` nunca ficaria verde: `HANDOFF`,
  `LESSONS`, a crítica do protótipo e o próprio relatório citam o valor antigo **de propósito**.
  Verificador negativo em varredura recursiva colide com o histórico, que é justamente o lugar onde
  o valor velho **deve** continuar escrito.

**A regra que ficou:** afirme o valor certo no documento dono, não a ausência do errado no projeto
inteiro; e rode o verificador antes de gravá-lo, exigindo que ele **falhe** enquanto o achado
correspondente estiver aberto.

**Por quê isto importa além da skill:** os três defeitos têm a mesma forma — uma verificação que
**parece** ter medido alguma coisa. Cegueira silenciosa, falso positivo em massa e verificador
decorativo produzem, todos, um relatório com aparência de rigor. É o mesmo defeito que a `L-16`
carregou por nove dias: um número registrado, com fonte, que ninguém tinha conferido.

---

## L25 — Achado de investigação não sobrevive sozinho até o plano: precisa entrar na lista, não só na memória

**29/08/2026 — reorganização de pastas do `Docs_inicial/`.**

Antes de escrever o plano, gerei um `grep` cruzado de todo arquivo candidato a mover contra o
repositório inteiro. Ele já mostrava os 6 `canonicos/CANONICO_*.md` citando
`Docs_inicial/GLOSSARIO_DE_TERMOS.md` num aviso de nomenclatura fixo no topo — a citação mais repetida
de todo o levantamento. Na hora de escrever o plano, listei como "documentos vivos a editar" só
`CLAUDE.md`, `HANDOFF.md`, `escopo/E3` e `construcao/prototipo/LEIA-ME.md` — os 6 canônicos ficaram de
fora, mesmo tendo aparecido no próprio grep três passos antes. Só apareceu de novo na verificação
final, depois de já ter movido o arquivo.

**Por quê:** o grep de investigação e a lista do plano foram dois momentos separados, e a segunda não
foi conferida contra a primeira linha a linha — fiquei com a impressão geral ("já vi isso") em vez do
dado bruto. Achado visto não é achado registrado; sem uma linha própria na lista, evapora entre
investigar e planejar.

**O que fazer:** quando um grep de levantamento apontar N arquivos com uma menção, o plano tem que
listar os mesmos N — se a lista final tiver menos, é sinal de que algo foi perdido no meio, não de que
o escopo encolheu por critério. Conferir contagem, não impressão.

---

## L26 — A etapa de criação do protótipo é dona de estrutura e token, não de cópia final

**29/08/2026 — Fatia 1 do plano do protótipo.**

O `grep "esfrega"` da verificação da Fatia 1 pegou uma ocorrência que **não** era o exemplo trocado:
o texto de ajuda do `fz` ("Equilíbrio"), copiado literal do `MVP` §5.5. Levei isso ao Mestre como
pergunta A/B — "deixar ou reescrever a linha?" — e gastei metade do reporte nela. Resposta dele:
*"o texto usado não é da conta da etapa de criação do protótipo, todos os textos e alertas serão
revisados e validados em outras sessões"*.

**Por quê:** o comando de verificação do plano (`grep "esfrega" → zero`) tem alvo estreito — as
frases do exemplo antigo — mas casa com qualquer ocorrência da raiz. Quando ele acerta texto canônico
que está fora do recorte da fatia, o reflexo é tratar como pendência da fatia. Não é: reescrever
cópia de educação canônica é decisão de produto, e a Fatia 1 é "zero decisão de produto" por
definição. O protótipo desta fase carrega o texto que o MVP tem; corrigir o texto do MVP é outra
frente, com sua própria validação.

**O que fazer:** quando o verificador de uma fatia mecânica pegar conteúdo canônico fora do escopo
dela, **registrar em uma linha** ("resta 1 hit — `MVP` §5.5 literal, fora do recorte") e seguir.
Vira pergunta só se a leitura errada muda um produto — e "manter a cópia que o canônico tem" nunca
muda. Estrutura, token, número rastreável: da fatia. Redação final de rótulo e alerta: sessão de
texto.

---

## L27 — A identidade de um artifact republicado mora na seção de HANDOFF de quem publicou, não no arquivo

**29/08/2026 — Fatia 2 do protótipo, 3 republicações no mesmo artifact.**

Republiquei o `painel-fenix.html` no mesmo artifact três vezes (uma por rodada) com o favicon `📐`.
Só ao escrever o HANDOFF vi que a §43.4.4 da Fatia 1 registrava, explícito, *"Favicon `⚙️`"*. O
ícone da aba oscilou `⚙️`→`📐` durante a sessão; voltei a `⚙️` na última publicação. O estado final
ficou certo, mas quem estava com a aba aberta viu o ícone trocar duas vezes.

**Por quê:** o favicon não está no HTML publicado — o shell da claude.ai o aplica —, e a ferramenta
de publicação exige um a cada republicação. Procurei no arquivo, não achei, escolhi um, e **não
conferi o registro da sessão anterior**, que é o único lugar onde a escolha da Fatia 1 sobreviveu. O
cabeçalho do HANDOFF manda "leia este arquivo inteiro"; li a §43, mas foquei no plano e passei
batido pela §43.4.

**O que fazer:** antes de republicar um artifact que já existe, a identidade que a ferramenta pede e
o arquivo não carrega — **favicon, título exato, a URL** — se confere na seção de HANDOFF da última
sessão que publicou (`grep -i "favicon\|artifact" HANDOFF.md`), não no arquivo. E toda vez que a
sessão escolher um desses por não ter achado, **registrar na própria seção com o valor** — é o
corolário do `L25`: achado que não entra na lista evapora até a próxima sessão pagar a busca de
novo.

---

## L28 — Mudança de conformidade visual: renderizar primeiro, decidir depois

**29/08/2026 — item 29, a borda do chip de estado.**

O DS não tem exemplo resolvido de "chip". Tinha os tokens da rampa (`-ink`/`-bg`/`-bd`) e a
instrução do Mestre ("texto `-ink` sobre `-bg`"). Gastei quatro ciclos de edição decidindo no
abstrato se a borda era `-bd` (o token de borda, mas somia na faixa), `-ink` (fora do papel do
token, mas nítido) ou sem borda, e se o `padding` compensava o 1px — indo e voltando na classe
`.chip`. Um HTML isolado de 40 linhas com os tokens reais e as estruturas de faixa/chip resolveu em
dois minutos: `-bd` desaparece, `-ink` vira tag limpa. A dúvida era **visual** e eu estava tratando
como textual.

**Por quê:** token nomeado dá a impressão de que a decisão é dedutível da spec. Quando a spec tem
lacuna (sem exemplo do componente), o nome do token não basta — só o pixel decide, e reunião de
tokens na cabeça não renderiza.

**O que fazer:** mudança de conformidade visual sem exemplo na spec — **montar o render de
conferência antes da primeira edição**, não depois. HTML isolado com o bloco `:root` real + a
estrutura mínima em volta do elemento. Decidir olhando. Vale para qualquer ajuste de cor, borda,
espaçamento ou contraste onde a spec não mostra o caso.

---

## L29 — quando a crítica não converge, o defeito é a régua, não o desenho

**Onde apareceu:** 30/08/2026. Duas rodadas de crítica ao protótipo do painel, 44 achados
catalogados e aplicados (§43–§45), e o Mestre continuou dizendo "não está conforme". A conclusão
preguiçosa seria criticar de novo.

**O que estava errado:** não existia documento único dizendo contra o quê o protótipo era medido. A
régua estava em quatro documentos, sem ordem de precedência entre eles, e — o pior — **misturava
duas naturezas**:

- **Regra mecânica** (R1–R15, vocabulário, anti-requisitos, checklist do DS): um agente com `grep`
  decide sozinho se passa ou falha.
- **Tensão de design** (T1–T12) e **critério de sucesso** (C1–C12): o brief declara textualmente que
  *"nenhuma tem resposta neste documento"*. São julgamento humano.

Com as duas misturadas, o crítico apresentava escolha de desenho como violação de regra, e o
executor "corrigia" o que nunca fora infração. O ciclo não fechava porque não podia fechar.

**O que fazer:** antes de auditar qualquer artefato pela segunda vez, **parar de auditar e escrever
a régua**: um documento único, versionado, com (a) ordem de precedência explícita entre as fontes,
(b) a camada mecânica separada da camada de julgamento, e (c) as ambiguidades listadas como pergunta
ao dono, não resolvidas pelo agente. Relatório de crítica **não é régua** — é achado até passar por
um portão humano. O artefato criticado também não: é o objeto medido, nunca a medida.

**Sinal de que você está nisso:** a mesma crítica volta depois de aplicada, ou o dono rejeita um
achado dizendo "mas eu queria assim". O segundo caso é sempre camada 2 vestida de camada 1.

---

## L30 — design system derivado perde o conteúdo e mantém a aparência de completo

**Onde apareceu:** 30/08/2026. O `DESIGN_SYSTEM_FENIX.md` copiou a **estrutura de seções** do
`DS_TEMA_CLARO.md` do ToolOptimizer — mesma numeração, mesmos títulos — mas ficou com uma fração do
conteúdo. Como a estrutura estava completa, ninguém notou: parecia um design system inteiro. O
resultado foi um protótipo sem régua de posicionamento e formato, e o defeito só apareceu quando o
Mestre olhou a tela.

**Efeito colateral do mesmo erro:** o `:root` das folhas copiou só metade do "bloco pronto" (achado
A13) — faltando tokens de interação, espaço, raio e tempo. Meia cópia de token não quebra a página;
ela só produz espaçamento fora de escala, que ninguém vê num diff.

**O que fazer:** ao derivar um design system de outro, **contar antes de copiar** — quantos tokens,
quantos degraus de escala, quantos componentes tem a fonte, e conferir o número no derivado. Índice
igual com corpo menor é o modo mais silencioso de perder spec.

**E ao voltar à fonte para recuperar o que faltou:** não trazer tudo. O documento de origem carrega
**dívida declarada por ele mesmo** — no caso, uma escala tipográfica de 8 degraus que o próprio
documento descreve como valores arbitrários canonizados depois do fato. Ler as seções de dívida
antes de copiar o canon.

---

## L31 — a folha de design aprovada já tinha a resposta; o protótipo interativo é que estava atrás

**Onde apareceu:** 07/09/2026, ao tornar a área Configurações editável. O pedido parecia trabalho de
projeto — decidir o que é configurável, desenhar a edição, inventar o formulário de ferramenta. Não
era: `Configuracoes.dc.html` já desenhava, campo a campo, a edição inline dos materiais, a marca
*diferente de fábrica*, o retorno ao valor de fábrica e o formulário de ferramenta por geometria; e o
`MAPEAMENTO_CAMPOS_FERRAMENTAS.md` já trazia as 17 geometrias com substrato, `Z` padrão, atributos e
faixa de diâmetro. O trabalho real foi **transcrever a spec existente**, não decidir.

**O que enganou:** o `ESTADO.md` dizia "área Configurações completa". Estava certo sobre o **desenho** e
errado sobre o **código** — a área existia em `.dc.html` e listava tudo em leitura no interativo. As
duas coisas têm o mesmo nome e nível de acabamento muito diferente.

**O que fazer:** antes de projetar qualquer tela do protótipo interativo, abrir a folha `.dc.html` de
mesmo nome e o documento de escopo correspondente, e só então decidir o que falta. E ao escrever
estado: dizer **desenhado** ou **implementado** — nunca "completo", que cobre os dois e não distingue
nenhum.

---

## L32 · Direção sobre variável travada pelo trabalho é conselho vazio

**Onde apareceu:** 08/09/2026, no painel *"o que mexer"*, na direção que resolve o alerta de balanço.
O sistema mandava *"reduza o balanço (L) para 40 mm"* — correto na física, inútil na oficina: o
balanço é imposto pela profundidade da peça. Quem pudesse encurtar já teria encurtado.

**Por que aconteceu:** o alerta nasce da relação `L/D`, e a dedução mecânica foi atacar o termo
visível da relação. Ninguém perguntou se aquele termo era ajustável no contexto do trabalho.

**A recaída, no mesmo dia:** a primeira correção trocou `L` por `fz` — e `fz` é a grandeza que a
**outra** direção do mesmo painel manda aumentar. Duas direções em sentidos opostos sobre o mesmo
parâmetro, lado a lado, contra a regra que a `E4` §6.2 já tinha. Trocar o alvo sem reler as outras
direções da tela é como corrigir uma linha sem ler a função.

**O que fazer:** ao desenhar orientação acionável, separar **variável ajustável** de **condição de
contorno**. Condição de contorno gera alerta; a direção que resolve o alerta recai só sobre grandeza
que a cadeia sustenta *e* que o operador ajusta naquele trabalho — e que **nenhuma outra direção da
mesma tela esteja movendo em sentido contrário**. Fechou em `ae`, a penetração de trabalho, que
governa a força radial, com o teto publicado de 25% do diâmetro para balanço longo.
