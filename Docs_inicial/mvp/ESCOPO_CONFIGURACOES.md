# Escopo — Área "Configurações"

**O que este documento é:** o escopo funcional da área nova do primeiro produto, criada pela
inversão das decisões D2 e D5 do gabarito do protótipo em 30/08/2026. Descreve, para **materiais**,
para **ferramentas** e para a **margem de segurança**, o que a área faz, o que ela deliberadamente
não faz, como se entra e se sai, que dados o operador vê e edita, o que acontece com um cálculo em
andamento, os estados da área, e o que tem volta.

**O que este documento não é:** não é desenho de tela (não define cor, layout, grade, posição nem
componente), não é arquitetura, não é plano de construção.

**Autossuficiente:** quem ler só este documento sabe o que a área faz, o que não faz, e as decisões
que a fecham — sem abrir o `MVP_CALCULADORA_PARAMETROS.md`.

**Estado:** as sete perguntas de escopo foram respondidas pelo Mestre em 30/08/2026. A seção 9 é o
registro dessas decisões, não uma lista de pendências. **Em 01/09/2026 a área ganhou um terceiro
assunto** — a margem de segurança (§10), registrada na §9.2.

**Data:** 30/08/2026 · **última decisão incorporada:** 01/09/2026.

---

## 0. Precedência

Herda a do `MVP_CALCULADORA_PARAMETROS.md` §0.1 e a do `GABARITO_PROTOTIPO.md` §1. Em resumo, do que
vence para o que cede:

1. Decisão escrita do Mestre.
2. Os canônicos (`Docs_inicial/canonicos/`) — todo número, fórmula e limiar.
3. `MVP_CALCULADORA_PARAMETROS.md` — o que existe no primeiro produto: campos, famílias, dados de
   material, exemplo trabalhado.
4. `BRIEF_DESIGN_INTERFACE.md` — comportamento, vocabulário, regra inviolável, anti-requisito.
5. Este documento — a função, o fluxo e o comportamento da área "Configurações".

Onde este documento precisaria de um número, fórmula ou limiar que os documentos acima não têm, ele
**não arbitra** — número é dos canônicos e do MVP, não deste escopo.

---

## 1. Por que a área existe

Duas decisões do Mestre em 30/08/2026 criaram a área. Ambas invertem decisões anteriores.

**Decisão 1 — inverte D2.** Editar dado de material **sai da tela principal** para uma área
separada, de propósito mais difícil de alcançar. Palavras do Mestre: *"a configuração do material
não é algo feito constantemente, é fixo e imutável; uma vez feito já está estabelecido. A mudança
dos valores é muito pontual, é alterado apenas se o fornecedor passar novos dados. Para evitar
armadilhas ou má conduta do operador, deve-se retirar essa opção de fácil acesso, adicionar em outra
tela, para que dificulte o acesso."*

**Decisão 2 — inverte D5.** A gestão de ferramentas — adicionar, editar, apagar — **entra no primeiro
produto**, e mora nessa mesma área. Palavras do Mestre: *"nessa versão MVP já deve ter a seção
separada para as edições ou adições de ferramentas, mas o agente deve montar um escopo dessa nova
seção 'Configurações' para as ferramentas, assim como a seção de materiais."*

**Decisão 3 — 01/09/2026, acrescenta um terceiro assunto à área.** O **fator de segurança** entra no
MVP e mora aqui, no grupo **Segurança** que **E2** §8 já previa. Ele era anti-requisito do brief §12
e do gabarito §2.3; a decisão escrita do Mestre revoga as duas. O escopo dele está na **§10** — não
na §3 nem na §4, porque numerar entre elas renumeraria seções já referenciadas por outros documentos.

**O que muda no resto do MVP, em consequência:** a revelação/gaveta de edição de dado de material na
tela principal (ex-D2) deixa de existir lá; os cinco dados de material continuam **visíveis** ao lado
do material no cálculo (§4.7 do MVP), mas a **edição** deles passa a acontecer só na área
"Configurações". A "biblioteca de ferramentas", antes anti-requisito, passa a ser esta área.
*Estas mudanças no `MVP_CALCULADORA_PARAMETROS.md` são de outra tarefa — este documento não as
aplica.*

---

## 2. Regras que valem dentro da área

Não são negociáveis. Vêm do brief (R1–R15), do gabarito e dos canônicos.

| # | Regra |
|---|---|
| 1 | **Nada trava, nada é recusado, nenhum valor é ajustado em silêncio** (R1). Valor absurdo é aceito; o que muda é o aviso, nunca se o valor entra |
| 2 | **Não existe marca de "forçado" nem gesto de "liberar"** (R2) |
| 3 | Todo termo técnico aparece **por extenso seguido do símbolo entre parênteses**. Exceção única: o resumo compacto da ferramenta, no formato `10 R1 Z4 L45`, só siglas em maiúscula |
| 4 | **Cor nunca é o único portador de significado** (R8). Alvo de toque generoso (R9). Tudo alcançável por teclado, foco visível (R10) |
| 5 | **Zero rede em tempo de uso** (R11). Nenhuma sincronização em nuvem, nenhum download, nenhuma consulta remota. A área abre idêntica offline |
| 6 | **Não existe conta de usuário.** Histórico e favoritos passaram a ser permitidos no produto, mas nada de funcionalidade nova em cima deles aqui |
| 7 | **Não existe perfil de máquina, potência de máquina nem índice de saúde** (brief §12). ~~Nem fator de segurança~~ — **o fator de segurança saiu desta proibição em 01/09/2026 por decisão do Mestre e passou a morar nesta área** (§10) |
| 8 | **Texto nasce recolhido; só alerta nasce aberto** (D9) |
| 9 | **Tela pequena tem a mesma capacidade, reorganizada** (R13). A área existe igual em computador, tablet e celular |
| 10 | **Nada sugere precisão maior que a que o cálculo tem** (R14). Sem medidor, barra proporcional, índice |
| 11 | O texto fixo **o sistema recomenda, o operador decide** vale aqui como no resto do produto |

### 2.1 Quem é a fonte do número — a distinção que precisa ficar escrita

> **A regra de fonte — fórmula, constante de cálculo e limiar derivado de constante física não
> entram sem fonte citada — é NOSSA, escrevendo os documentos do projeto. Ela NÃO vale para o
> operador dentro do produto, nem para decisão de escopo, nome, vocabulário ou limiar de julgamento
> de produto.**

Quando o Fenix escreve um canônico, um MVP ou este escopo, toda fórmula, constante de cálculo e
limiar derivado de constante física tem de ter procedência — essa é a disciplina do projeto
(MVP §0.2), estreitada pelo Mestre em 01/09/2026. Nome, vocabulário e decisão de escopo são escolha
do dono do produto.

Dentro do produto, **o operador é a fonte do número dele**: é o catálogo do fornecedor dele, a
experiência dele, o ensaio que ele fez. Uma calculadora não interroga a origem do valor que o
usuário digita, não recusa o campo, não trunca nem ajusta em silêncio (R1). Se um valor digitado
levar o cálculo a um resultado extremo, **quem fala é o alerta — nunca um bloqueio**.

Consequência para esta área: o operador **cria material**, **cria ferramenta** (dentro das
geometrias que o sistema conhece) e **edita qualquer constante**, digitando os valores que ele
tiver. A área não pede fonte, não valida contra faixa, não impede. Este documento erra se em
qualquer ponto disser o contrário.

---

### 2.2 O aviso do fornecedor — decisão do Mestre, 03/09/2026

A área mostra, junto das constantes, uma frase permanente. **Na voz do produto:**

> Os valores que vêm com o sistema são um ponto de partida. **Peça os números ao fornecedor da sua
> ferramenta** e ajuste aqui — quem fabricou a ferramenta sabe dela mais do que qualquer tabela geral.

**Isso é postura, não ressalva.** A frase não pede desculpa pelo número nem sugere que o resultado
é frágil: ela diz de onde vem o número melhor e o que fazer com ele. É a mesma posição que a §2.1 já
sustenta — o operador é a fonte do número dele —, agora dita para o operador em vez de só declarada
entre nós.

**Três coisas que ela não é, e é preciso estar escrito porque as três já foram apagadas do produto
por regra:**

- **Não é selo de estimativa.** Não marca campo, não qualifica valor, não aparece por número. É uma
  frase da área, uma só. A regra 6 da §5 continua valendo inteira.
- **Não é procedência.** Não diz de onde o valor veio — diz onde conseguir um melhor. A procedência
  saiu do produto e continua fora.
- **Não é alerta.** Não tem gatilho, não tem camada, não depende de cálculo. Não entra na precedência
  de alertas do MVP §9.6.

**Onde ela aparece:** na área Configurações, junto das constantes editáveis — materiais (§3) e
ferramentas (§4). Não vai para o painel de cálculo.

---

## 3. Materiais — o que a área faz

### 3.1 O que faz

Duas coisas:

1. **Editar os cinco dados de qualquer material** — dos 12 de partida ou dos criados pelo operador —
   e **voltar ao valor de fábrica** os que vieram da lista de partida. É a única porta de edição
   desses dados no produto: na tela principal eles são só leitura.
2. **Criar material novo.** O operador informa o nome e digita as cinco grandezas. O material criado
   passa a valer na lista de escolha do cálculo, ao lado dos 12.

**A lista de 12 materiais (MVP §11.1) é lista de PARTIDA, não limite.** O operador escolhe um dos 12
ou cria o dele. Isso inverte a Q6 do MVP e o "12, fixos" — ver seção 9, Q-G, e a nota de que o MVP
ainda diz "12 materiais" e será ajustado por outra tarefa.

As cinco grandezas são as mesmas para material de partida e material criado — as que o MVP §4.7 e
§5.2 já definem. **Nenhum campo novo, nenhum campo a menos:**

| Dado | Unidade | Onde entra no cálculo |
|---|---|---|
| **Classe ISO** | P · M · K · N · S · H | Agrupa o material; orienta a escolha de ferramenta |
| **Dureza** | HB ou HRC | Contexto da linha; é o que o operador confere contra a folha do material |
| **Força específica de corte (kc1.1)** | N/mm² | Potência de corte (Pc) e torque (Mc) — MVP §6.7 |
| **Expoente (mc)** | — | Idem — governa como a força cresce quando o cavaco afina |
| **Velocidade de corte (vc)** | m/min | Valor de partida da velocidade de corte e gatilho do alerta de velocidade — MVP §9.2 gatilho 4 |

**Regras de edição e criação (herdadas do MVP §4.7 e da seção 2.1):**

- As cinco grandezas são editáveis pelo operador, em qualquer material.
- O valor editado e o material criado **persistem entre sessões**, localmente (sem rede).
- Todo valor editado de um material **de partida** tem **retorno ao valor de fábrica** ao lado, e
  existe um **comando único de voltar tudo** (afeta só os 12 de partida — material criado não tem
  "fábrica" para onde voltar).
- O sistema **não carimba o próprio dado como estimativa** — não existe selo "estimado" (R14 do
  gabarito, MVP §4.7 regra 6). Também não marca material criado como "não confiável": o operador é a
  fonte (seção 2.1).
- **Nenhum valor é recusado, truncado ou ajustado em silêncio** (R1). Valor que leve o cálculo a um
  resultado extremo é assunto do alerta na tela principal (MVP §9), não desta área.

### 3.2 O que deliberadamente NÃO faz

| Não faz | Por quê |
|---|---|
| **Não recusa, trunca nem valida o valor digitado** | R1 e seção 2.1 — o operador é a fonte. Valor implausível, se for erro de digitação óbvio, cai na camada de sanidade do cálculo (MVP §9.4), rotulado como erro de digitação, nunca como risco de processo — e ainda assim o resultado sai |
| **Não cria grandeza nova de material** | As cinco são o inventário fechado do brief §5.2. O operador cria materiais, não campos |
| **Não importa dado de arquivo, planilha ou rede** | R11 — zero rede; e importador é funcionalidade que ninguém pediu |
| **Não pede nem guarda a origem/confiança do dado** | Confiança é rótulo de documento (MVP §0.2), não de tela. O operador digita o valor; de onde ele tirou é problema dele |
| **Não calcula** | A área edita e cria dados; o cálculo é a tela principal |

### 3.3 Como se chega, e como se volta

- Existe **um ponto de entrada para "Configurações"**, nomeado e alcançável por toque e por teclado,
  com alvo generoso.
- O acesso é **dificultado de propósito**: chegar lá é um passo deliberado para fora do fluxo de
  cálculo — não é um campo nem um gatilho na tela principal. **Dificultado não é escondido nem
  travado** (R1): o ponto de entrada é visível e nada impede de usá-lo.
- **A volta ao cálculo está sempre disponível** e não exige confirmação.
- **Grau do atrito (decisão Q-F):** um passo deliberado — ponto de entrada nomeado, fora do fluxo de
  cálculo, **sem senha e sem confirmação**. A **forma** desse ponto de entrada é desenho.

### 3.4 O que acontece com um cálculo em andamento

- Enquanto o operador está na área "Configurações", **o cálculo da tela principal não é descartado**:
  ao voltar, o painel está como foi deixado.
- Se o operador **editou um dado do material que o cálculo em andamento usa** (decisão Q-D), a edição
  afeta **também o cálculo que está na tela** — não só os seguintes. Seguindo o modelo vivo do MVP
  §2.5: ao voltar, os **números** ficam com tratamento de desatualizado até o recálculo; o **alerta e
  o nível de segurança não** esmaecem. Não há dois valores para o mesmo material em telas diferentes.
- Se o operador **esvaziou um dado obrigatório** (kc1.1, mc ou a faixa de velocidade), o cálculo
  volta ao estado vazio com o campo sinalizado (MVP §4.5) — nada é recusado, mas não há o que
  calcular sem a grandeza.
- Se o operador **apaga um material criado que o cálculo em andamento usa**, o cálculo **permanece na
  tela com os valores que tinha** — nada some em silêncio (R1, R15). A tela sinaliza que o material
  saiu da lista; os valores seguem editáveis. Mesmo tratamento de apagar ferramenta em uso (decisão
  Q-B).

### 3.5 Estados

Nenhum deles bloqueia. Todos seguem a R1.

| Estado | O que significa | Comportamento |
|---|---|---|
| **Tudo de partida** | Nenhum material editado, nenhum criado | A área lista os 12 materiais de partida com os valores de fábrica; nenhum comando de reverter fica ativo |
| **Primeiro uso** | O operador nunca abriu a área | Igual ao anterior — os 12 de partida já vêm completos |
| **Material de partida editado** | Uma ou mais das cinco grandezas diferem do valor de fábrica | O que mudou aparece marcado como diferente de fábrica (textual, não só cor), com o retorno ao valor de fábrica ao lado; o comando de voltar tudo fica ativo |
| **Material recém-criado** | O operador acabou de criar um material | Passa a aparecer na lista de escolha do cálculo, ao lado dos 12. Não tem "valor de fábrica" — o retorno individual e o "voltar tudo" não se aplicam a ele |
| **Material com campo em branco** | Criado ou editado deixando uma das cinco grandezas vazia (R1 não recusa) | O material existe e fica na lista. Ao ser escolhido no cálculo, a grandeza vazia vira campo obrigatório vazio: bloco aberto, campo sinalizado, estado vazio até o operador preencher (MVP §4.5). Nada trava |
| **Material com valor que leva a resultado extremo** | Uma constante digitada produz potência, torque ou velocidade fora do usual | O material é aceito e usado. Quem se manifesta é o **alerta** da tela principal (MVP §9) — nível crítico ou atenção conforme o gatilho —, nunca um bloqueio nesta área |

### 3.6 O que é irreversível, e o que tem volta

- **Tem volta:** toda edição de grandeza de um material **de partida** — retorno individual ao valor
  de fábrica + comando de voltar tudo.
- **Não tem "fábrica":** material **criado pelo operador** — ele é a origem; não há valor anterior
  para onde voltar. Editar de novo é o caminho.
- **Irreversível:** apagar um material criado pelo operador (mesmo tratamento de apagar ferramenta,
  §4.7 e decisão Q-B). Os 12 de partida não são apagáveis — só revertíveis.

---

## 4. Ferramentas — o que a área faz

### 4.1 O que faz

Permite ao operador **manter a lista das ferramentas que ele tem** — adicionar, editar e apagar
**instâncias** das famílias e geometrias que o MVP já define. Cada instância é uma ferramenta
concreta da oficina dele: uma geometria escolhida entre as 17, o substrato, e os atributos fixos
dessa ferramenta.

Com a lista montada, no cálculo o operador **escolhe uma ferramenta da lista** em vez de reescolher a
geometria e redigitar os atributos a cada uso. A lista é um **atalho, não um portão**: quem não
cadastrou nada continua escolhendo a geometria direto e digitando, exatamente como no MVP hoje
(R1, C2 do brief).

### 4.2 Dados que o operador vê e edita por ferramenta

Só as famílias e os atributos que o MVP §3.2 já define. **Nada inventado.**

| Dado | Observação |
|---|---|
| **Geometria** | Uma das 17 (MVP §3.2). Define quais atributos abaixo existem |
| **Substrato** | Metal duro (MD) ou aço rápido ao cobalto (HSS-Co), conforme o que a geometria admite (MVP §3.1–§3.2). Faz parte do nome da ferramenta |
| **Diâmetro da ferramenta (D)** | mm |
| **Número de arestas (Z)** | Onde a família usa avanço por dente — fresamento e fresa de rosca (MVP §4.2). Nunca assumido em silêncio (R6) |
| **Atributos específicos da geometria** | Os que o MVP §3.2 lista para aquela geometria: raio de canto (r), ângulo de posição (κ), ângulo de ponta, passo (P), designação da rosca, diâmetro menor (Dmin), diâmetro inicial e final, raio de ponta (rε), avanço por rotação (fn) padrão. **Atributo que a geometria não tem não aparece** — nunca desabilitado |
| **Comprimento de aresta (Lc)** | Opcional (MVP §4.1). Propriedade física da ferramenta — **guardada aqui** (decisão Q-E) |
| **Um nome/apelido da ferramenta** | Para o operador reconhecer a dele na lista — **guardado aqui** (decisão Q-E) |
| **Faixa de diâmetro (mínimo e máximo)** | mm. Nas geometrias de furação vem com valor de partida por geometria (`construcao/MAPEAMENTO_CAMPOS_FERRAMENTAS.md` §2/FURAR) e é **editável** — o operador ajusta à ferramenta que ele tem (decisão do Mestre, 03/09/2026) |

**O balanço (L) não é atributo da ferramenta cadastrada** (decisão Q-E). Ele é o quanto a ponta se
projeta do porta-ferramentas, e muda a cada montagem — continua sendo campo do cálculo (MVP §4.1).

**Sobre a faixa de diâmetro (decisão do Mestre, 03/09/2026).** A R8 voltou sem faixa publicada para
as geometrias de furação nos dois territórios pesquisados, e o Mestre decidiu **não caçar o número**:
entra um valor de partida razoável, editável aqui, com o aviso da §2.2. É `DECISÃO DE PROJETO`, e o
rótulo é **do documento, não da interface** — a área não exibe rótulo de confiança (§5, regra 6). Os
seis pares de valores, com as ressalvas de quem os escolheu, estão no `MAPEAMENTO_CAMPOS_FERRAMENTAS`.
**Roscar e mandrilar continuam sem faixa declarada** — a decisão cobriu furação.

**Os parâmetros de corte (velocidade de corte, avanço por dente, penetração de trabalho, profundidade
de corte) não são cadastrados na ferramenta.** Eles vivem na entrada e no ajuste fino do cálculo
(MVP §4 e §5), com valores de partida derivados do material e da geometria.

### 4.3 O que deliberadamente NÃO faz

| Não faz | Por quê |
|---|---|
| **Não cria família nem geometria nova** (decisão Q-C) | O operador cria quantas ferramentas quiser, mas **dentro das 17 geometrias que o sistema conhece**, preenchendo o que aquela geometria exige. Uma geometria nova não teria fórmula de diâmetro efetivo, valores de partida de ap/ae nem cadeia de cálculo definida — o sistema não saberia calcular sobre ela. Isto não contradiz a seção 2.1: o operador é fonte de **valores**, não de geometrias de corte que o motor não modela |
| **Não guarda parâmetro de corte por ferramenta** | Isso é a "planilha da fábrica" — e o produto existe para entregar mais que o par pronto (brief §2.4). Os parâmetros são do cálculo |
| **Não guarda perfil de máquina, potência, torque ou avanço máximos** | Anti-requisito do brief §12, reafirmado em 30/08 |
| **Não valida nem recusa a ferramenta cadastrada** | R1. Ferramenta com atributo faltando é aceita e marcada como incompleta |
| **Não importa de arquivo nem de rede** | R11 |
| **Não obriga o operador a cadastrar ferramenta para calcular** | R1, C2 — a lista é atalho, não pré-requisito |

### 4.4 Como se chega, e como se volta

Igual a materiais (§3.3): mesma área "Configurações", mesmo ponto de entrada nomeado e alcançável,
mesmo atrito deliberado, mesma volta sempre disponível.

### 4.5 O que acontece com um cálculo em andamento

- Entrar na área **não descarta** o cálculo da tela principal.
- Se o operador **edita uma ferramenta que o cálculo em andamento usa**, ao voltar o painel usa os
  atributos novos: recalcula na hora, com a geometria compatível já digitada preservada e revalidada
  contra os limites novos, e a tela diz o que precisou mudar (MVP §2.6). Números com tratamento de
  desatualizado; alerta e nível de segurança não esmaecem.
- Se o operador **apaga a ferramenta que o cálculo em andamento usa** (decisão Q-B: permitido), o
  cálculo **permanece na tela com os valores que tinha** — nada é apagado em silêncio (R1, R15). A
  tela sinaliza que a ferramenta saiu da lista; os valores seguem editáveis.
- Se o operador **cadastra uma ferramenta incompleta** e a escolhe no cálculo, os atributos faltando
  entram como campo obrigatório vazio: bloco aberto, campo sinalizado, estado vazio até o operador
  preencher (MVP §2.4 regra 4, §4.5). Nada trava.

### 4.6 Estados

| Estado | O que significa | Comportamento |
|---|---|---|
| **Área vazia** | Nenhuma ferramenta cadastrada | A área diz isso em uma linha e orienta a adicionar a primeira. **O cálculo continua funcionando** pela escolha direta de geometria (§4.1) |
| **Primeiro uso** | O operador nunca abriu a área | Igual a "área vazia" |
| **Ferramenta recém-criada** | Acabou de ser cadastrada | Passa a aparecer na lista de escolha do cálculo |
| **Ferramenta incompleta** | Cadastrada sem todos os atributos obrigatórios da geometria | Aparece na lista marcada como incompleta, textual e não só por cor (R8). Continua selecionável; ao ser usada, os atributos faltando viram campo obrigatório vazio no cálculo |

### 4.7 O que é irreversível, e o que tem volta

- **Tem volta:** editar uma ferramenta — basta editar de novo.
- **Irreversível:** **apagar uma ferramenta.** Não há "valor de fábrica" para uma ferramenta que o
  operador criou. Decisão Q-B: apagar é permitido, pede uma confirmação simples (evita perda por
  toque acidental), e não há desfazer. O cálculo em uso permanece na tela (§4.5).

---

## 5. O que vale para as duas seções

> **Nota 01/09/2026:** as seções de conteúdo passaram a ser **três** — materiais (§3), ferramentas
> (§4) e segurança (§10). As seis regras abaixo valem para as três. O título não é renumerado nem
> reescrito por regra do projeto: régua referenciada não muda de número.

| # | Regra |
|---|---|
| 1 | **Offline:** toda a área — ferramentas cadastradas, materiais criados e dados de material editados — vive local, persiste entre sessões, sem rede (R11, MVP §2.4 P10) |
| 2 | **Tela pequena:** a área existe igual em celular, tablet e computador — mesma capacidade, reorganizada (R13) |
| 3 | **Teclado:** adicionar, editar, apagar, reverter e voltar ao cálculo são todos alcançáveis por teclado, com foco visível (R10) |
| 4 | **Vocabulário:** nome técnico por extenso + símbolo entre parênteses. "Configurações" é o nome da área (decisão do Mestre) e não está na lista de proibidos do gabarito §2.2 |
| 5 | **Texto recolhido:** qualquer explicação dentro da área nasce recolhida (D9) |
| 6 | **Sem selo de estimativa** em lugar nenhum da área (R14 do gabarito) |

---

## 6. Como se verifica este documento

Quem ler só este documento sabe: o que a área faz para materiais, para ferramentas e para a margem de
segurança (§10); o que ela não faz; o que acontece com um cálculo em andamento; os estados da área; o
que tem volta e o que não tem; e — na seção 9 — as sete decisões do Mestre que fecham o escopo, mais
as seis de 01/09/2026 na §9.2. Sem abrir o `MVP_CALCULADORA_PARAMETROS.md`.

---

## 7. O que este documento não decide

Escopo de área é decisão de produto, do Mestre. As sete perguntas de escopo foram respondidas por ele
em 30/08/2026 — seção 9. Fica de fora deste documento, por ser de outra natureza:

- **Desenho:** forma do ponto de entrada, layout da área, componentes, ordem de leitura.
- **Constantes de cálculo:** número, fórmula e limiar são dos canônicos.
- **Ajustes no MVP e no gabarito** que estas decisões exigem — ver seção 8.

---

## 8. Fronteira

Este documento **cria** `Docs_inicial/mvp/ESCOPO_CONFIGURACOES.md` e não edita nenhum outro arquivo.

> **Nota 01/09/2026.** Este parágrafo é o registro da rodada de 30/08 e fica como está. A rodada do
> fator de segurança (§9.2, §10) foi diferente: ela **editou** outros arquivos na mesma passada —
> `GABARITO_PROTOTIPO.md` §2.3 e §5 (v1.5), `BRIEF_DESIGN_INTERFACE.md` §12,
> `E2_ENTRADAS_E_CONFIGURACAO.md` §7, `E3_RESULTADOS_E_APRESENTACAO.md` §6,
> `E5_INTERACAO_E_FLUXO.md` §2.1 e `MVP_CALCULADORA_PARAMETROS.md` §1.3, §2.3, §4.9 e §12.

As decisões desta rodada — em especial "material pode ser criado" (Q-G) — deixam o
`MVP_CALCULADORA_PARAMETROS.md` desatualizado onde ele fala em "12 materiais fixos" (§11.1, Q6) e o
`GABARITO_PROTOTIPO.md` onde trata a lista de material como fechada. **Esses ajustes são de outra
tarefa, coordenada pelo orquestrador** — este documento não os aplica.

---

## 9. Decisões registradas

As sete perguntas de escopo foram respondidas pelo Mestre. Q-A, Q-C e Q-G são fala direta dele, em
30/08/2026. Q-B, Q-D, Q-E e Q-F foram adotadas pelo orquestrador (fenix-2a) em 30/08/2026, na
recomendação do agente, e **ratificadas pelo Mestre em 01/09/2026**.

| # | Pergunta | Decisão | Autoria |
|---|---|---|---|
| **Q-A** | Ferramenta é global, por máquina ou por trabalho? | **Global.** Vale para toda a oficina | Mestre |
| **Q-B** | Apagar ferramenta em uso é permitido? O que acontece com o cálculo? | **Permitido.** O cálculo permanece na tela com os valores que tinha; a tela sinaliza que a ferramenta saiu da lista. Confirmação simples ao apagar; sem desfazer | Ratificado pelo Mestre, 01/09/2026 |
| **Q-C** | Família nova de ferramenta, ou só instâncias? | **Só instâncias das 17 geometrias existentes.** O operador cria quantas ferramentas quiser, dentro das geometrias que o sistema conhece, preenchendo o que a geometria exige | Mestre |
| **Q-D** | Editar dado de material afeta a tela atual ou só cálculos futuros? | **Também a tela atual**, com tratamento de desatualizado até o recálculo | Ratificado pelo Mestre, 01/09/2026 |
| **Q-E** | O que a ferramenta guarda? | **Guarda** geometria, substrato, diâmetro (D), número de arestas (Z), atributos da geometria, comprimento de aresta (Lc) e um apelido. **O balanço (L) fica no cálculo**, preenchido a cada montagem | Ratificado pelo Mestre, 01/09/2026 |
| **Q-F** | Grau do acesso "dificultado"? | **Um passo deliberado:** ponto de entrada nomeado, fora do fluxo de cálculo, sem senha e sem confirmação | Ratificado pelo Mestre, 01/09/2026 |
| **Q-G** | A lista de materiais é fixa? | **Não. Material pode ser criado.** Os 12 viram lista de partida; o operador escolhe um deles ou cria o dele e digita as cinco constantes. A calculadora não impede valor nenhum | Mestre |

### 9.1 Q-G, por extenso — porque é a mudança grande, e é onde já se errou

Palavras do Mestre: *"material pode ser criado, as constantes quem vai inserir é o usuário. Não
entendeu ainda que é uma calculadora dinâmica e livre para que o usuário faça o que bem entender?
Já viu uma calculadora impedir de colocar um valor?"*

O que isso fixa:

1. **A lista de 12 materiais (MVP §11.1) é lista de PARTIDA, não limite.** O operador escolhe um dos
   12 ou cria o dele.
2. **O material criado pede as mesmas cinco grandezas que os 12 já têm** — classe ISO, dureza, força
   específica de corte (kc1.1), expoente (mc), velocidade de corte (vc). Nada mais, nada
   menos.
3. **Nenhum campo é recusado, nenhum valor é truncado ou ajustado em silêncio** (R1). Se um valor
   digitado levar o cálculo a um resultado extremo, quem fala é o **alerta** da tela principal
   (MVP §9), não um bloqueio.
4. **A regra de fonte — fórmula, constante de cálculo e limiar derivado de constante física — é do
   projeto, não do produto** (seção 2.1). O operador é a fonte do número dele. A área não pergunta de
   onde ele tirou, não valida contra faixa, não marca o material como "não confiável".

Isto inverte a Q6 do MVP ("ficam os doze, sem selo") no ponto em que ela dizia "os doze" como
conjunto fechado. O restante da Q6 — sem selo de estimativa, dados visíveis e editáveis — continua
valendo e agora vale também para o material criado.

### 9.2 Decisão do Mestre, 01/09/2026 — o fator de segurança entra no MVP e mora aqui

Registro novo; nada acima é reescrito. A tabela da §9 continua com as sete perguntas de 30/08.

| # | Decisão | Autoria |
|---|---|---|
| **Q-H** | **O fator de segurança entra no MVP.** Deixa de ser anti-requisito (brief §12, gabarito §2.3) | Mestre, 01/09/2026 |
| **Q-I** | **É uma lente de exibição:** ajuste único e persistente, em **`% do valor calculado`**, aplicado **por último** sobre os números de resultado exibidos. **Padrão `100 %`** — a tela mostra o cálculo como ele é. A `85 %`, mostra sempre 85 % do calculado, até o operador mudar. Na tela o nome é **margem de segurança** | Mestre, 01/09/2026 |
| **Q-J** | **Controle: campo numérico ou passo `±`**, do mesmo tipo dos `±` de rotação e avanço. **Não é cursor deslizante nem barra** — barra proporcional lê como escala proporcional, proibida por **R14**, e aqui não existe teto contra o qual medir | Mestre, 01/09/2026 |
| **Q-K** | **Mora nesta área**, no grupo **Segurança** de **E2** §8 — é configuração persistente (**E2** §7.1), não campo por cálculo. O painel principal só mostra o valor **quando difere de `100 %`** (**E3** §6.1) | Mestre, 01/09/2026 |
| **Q-L** | **Não é limitador.** Não trava, não bloqueia, não recusa, não escala com regra própria. **Acima de `100 %` é permitido** — a tela mostra mais que o calculado, e a decisão é do operador (R1) | Mestre, 01/09/2026 |
| **Q-M** | **O que escala:** rotação, avanço da mesa, velocidade de corte real, potência de corte (`Pc`), torque (`Mc`), taxa de remoção (`MRR`). **O que não escala:** o que o operador digitou (`ap`, `ae`, `L`, `Z`, dados do material), as grandezas que disparam alerta (`hex`, `hm`, `L/D`, `CTF`), e o alerta e o nível de segurança | Mestre, 01/09/2026 (recorte das grandezas de verificação recomendado pelo agente Ícaro e adotado pelo orquestrador — razão em **E3** §6) |
| **Q-N** | **Nenhuma fonte externa é exigida.** A disciplina No-Invention vale para fórmula, constante do motor e limiar derivado de constante física; isto é interação de tela, e `100 %` é a identidade trivial "mostra o que o cálculo deu" | Mestre, 01/09/2026 |

> ⚠ **Correção de modelo, 01/09/2026, mesmo dia.** A primeira redação desta §9.2 registrava um modelo
> **errado** — margem que inflava a previsão de esforço, padrão `+0 %` com sinal, efeito só sobre
> potência e torque, faixa recomendada 0–50 % com fonte de desgaste de aresta. O Mestre corrigiu: é a
> lente acima. A `Q-M` antiga ("padrão `+0 %` e faixa 0–50 %") **não vale**; nada da faixa nem da
> fonte sobreviveu, porque o padrão `100 %` não precisa de fonte de coisa nenhuma.

---

## 10. Segurança — o que a área faz

Terceiro assunto da área, criado pela decisão do Mestre de 01/09/2026 (§9.2). **Numerada 10 e não 5
de propósito:** §5 a §9 já são referenciadas por outros documentos, e régua referenciada não muda de
número. Mesmo padrão de descrição das §3 e §4.

### 10.1 O que faz

Uma coisa só: **ajustar a margem de segurança** — a lente pela qual o painel exibe os números de
resultado.

> ⚠ **Modelo corrigido pelo Mestre em 01/09/2026, no mesmo dia em que esta seção nasceu.** A primeira
> redação descrevia uma margem que *inflava a previsão de esforço*, com padrão `+0 %` e efeito só
> sobre potência e torque. Não é isso; o que vale é a lente descrita abaixo.

```
o que aparece na tela  =  resultado calculado ao vivo  ×  fator
```

| Item | Valor |
|---|---|
| **O que ela é** | Uma **lente de exibição**: `% do valor calculado`, aplicada **por último** sobre os números de resultado |
| **Padrão de fábrica** | **`100 %`** — a tela mostra o resultado exatamente como as fórmulas o entregam |
| **Exemplo** | A `85 %`, o painel mostra **sempre** os resultados a 85 % do calculado, até o operador mudar. Na fala dele, `85 %` mostrado é `15 %` de margem |
| **Como aparece** | `% do calculado`: `100 %`, `85 %`. Nunca multiplicador (`0,85×`) nem porcentagem com sinal (`−15 %`) |
| **Nome na tela** | **margem de segurança** — nos documentos, *fator de segurança* é o nome do conceito |
| **Controle** | Campo numérico ou passo `±`, do mesmo tipo dos `±` de rotação e avanço |
| **Acima de `100 %`** | **Permitido.** A tela mostra mais que o calculado, e é decisão do operador (R1) |

**O que a lente escala:** rotação, velocidade de avanço da mesa, velocidade de corte real, potência
de corte (`Pc`), torque (`Mc`) e taxa de remoção (`MRR`) — o que o operador **executa** na máquina e
o **esforço** que ele dimensiona.

**O que ela não toca:** o que o operador digitou (`ap`, `ae`, balanço, `Z`, dados do material), as
grandezas de verificação que disparam alerta (espessura de cavaco `hex`/`hm`, relação
balanço/diâmetro `L/D`, afinamento de cavaco `CTF`), e o **alerta e o nível de segurança**. A razão
completa está em **E3** §6; em uma linha: número e alerta sobre a mesma grandeza não podem discordar
na mesma tela.

**Por que não é cursor deslizante nem barra:** barra proporcional é anti-requisito (**R14**, brief
§12, regra 10 da §2 deste documento). Ela lê como escala com um teto, e aqui não existe teto — a
lente é uma porcentagem **do próprio cálculo**. O `±` é o mesmo gesto que o operador já usa nos dois
números de comando.

**De onde vêm os números:** **de lugar nenhum, e não precisam vir.** O padrão `100 %` é a identidade
trivial *"mostra o que o cálculo deu"*. A disciplina de fonte (§2.1) vale para fórmula, constante do
motor de cálculo e limiar derivado de constante física; isto é **interação de tela**. **E2** §7.1 a
§7.3 é o dono do modelo.

### 10.2 O que deliberadamente NÃO faz

| Não faz | Por quê |
|---|---|
| **Não é limitador.** Não trava, não bloqueia, não recusa, não escala com regra própria | R1 e §2.1. Acima de `100 %` entra igual; o sistema recomenda, o operador decide |
| **Não mexe no alerta nem no nível de segurança** | Eles descrevem o físico real calculado. Alerta que se movesse com a lente seria a lente virando limitador de segurança — e o Mestre foi explícito: ela não é |
| **Não escala o que dispara alerta** — espessura de cavaco, `L/D`, `CTF` | Regra acima, do outro lado: se o número escalasse e o alerta não, a tela mostraria uma espessura e alertaria sobre outra (**E3** §6) |
| **Não toca em entrada** | O que o operador digitou é dele. Lente que mexe na entrada reescreve o que ele informou, em vez de filtrar o que ele lê |
| **Não realimenta o cálculo** | A lente é o **último** passo. O cálculo roda sempre em precisão plena sobre valores reais; se a lente realimentasse a cadeia, o desconto se comporia a cada edição |
| **Não é perfil de máquina, e não traz "% do limite" nem leitura de "sobra"** | Perfil de máquina, potência de máquina e índice de saúde continuam proibidos (§2, regra 7). A lente é porcentagem do próprio cálculo, não de uma capacidade declarada |
| **Não vira alerta por si** | Uma lente baixa ou alta não é condição de processo. Quem fala é o alerta da tela principal (MVP §9), sobre a grandeza física |
| **Não é o "controle único de agressividade"** | Aquele move os parâmetros de corte uns sobre os outros e muda **o que se executa**; este não toca em parâmetro nenhum, tem padrão neutro, e o ajuste de cada parâmetro continua individual. Onde algum documento tratar a lente como agressividade proibida, a decisão do Mestre de 01/09/2026 revoga |
| **Não é lente por material, por ferramenta ou por operação** | É política da oficina — uma só, global. Uma por item reintroduziria pela porta dos fundos o seletor de tipo de operação, que continua fora |

### 10.3 Como se chega, e como se volta

Igual a materiais (§3.3) e ferramentas (§4.4): mesma área "Configurações", mesmo ponto de entrada
nomeado e alcançável, mesmo atrito deliberado de um passo, mesma volta sempre disponível.

### 10.4 O que acontece com um cálculo em andamento

- Entrar na área **não descarta** o cálculo da tela principal.
- **Alterar a lente afeta também o cálculo que está na tela**, não só os seguintes — mesmo
  tratamento da edição de dado de material (§3.4, decisão Q-D). Ao voltar, o painel já mostra os
  números pela lente nova.
- **Não é recálculo, é reexibição.** A cadeia não mudou — só a lente sobre ela. Por isso os números
  **não** recebem tratamento de desatualizado ao mudar a lente: não há resultado velho esperando
  cálculo novo. (Contraste com §3.4, onde editar dado de material muda o **cálculo** e o
  desatualizado se aplica.)
- **Alerta e nível de segurança não mudam**, nem esmaecem — não acompanham a lente (§10.1, MVP §2.5).
- **O que muda na tela:** rotação, avanço da mesa, velocidade de corte real, potência, torque e taxa
  de remoção. **O que fica igual:** espessura de cavaco, `L/D`, afinamento de cavaco, e tudo o que o
  operador digitou. Ver dois grupos de número se comportando de forma diferente é o esperado, não
  falha de recálculo.
- **Deixar o campo em branco não é o mesmo que `100 %`:** vazio é ausência de grandeza (MVP §4.5), e
  o campo é sinalizado até ser preenchido; a exibição segue com a última lente válida. `100 %` é um
  valor, e é o padrão.

### 10.5 Estados

Nenhum bloqueia. Todos seguem a R1.

| Estado | O que significa | Comportamento |
|---|---|---|
| **Padrão de fábrica** | Lente em `100 %` — a tela mostra o cálculo como ele é | É o estado inicial e o do primeiro uso. O painel principal **não mostra nada** sobre a lente (**E3** §6.1); o comando de reverter não fica ativo |
| **Primeiro uso** | O operador nunca abriu a área | Igual ao anterior |
| **Lente abaixo de `100 %`** | O caso do operador conservador — `85 %`, por exemplo | Os números que a lente cobre aparecem reduzidos; os de verificação e o alerta, não. O valor aparece no contexto do resultado, textual e não só por cor (R8), com o retorno ao padrão ao lado |
| **Lente acima de `100 %`** | A tela mostra mais que o calculado | **Aceito**, sem trava (R1) — não é limitador. Mesma exibição do estado anterior: o sistema registra a lente aplicada, não impede |
| **Campo em branco** | O operador apagou o valor | O campo é sinalizado; vale a última lente válida até ele preencher. Nada trava (§10.4) |

### 10.6 O que é irreversível, e o que tem volta

- **Tem volta, sempre:** a lente tem **retorno ao padrão de fábrica** (`100 %`) ao lado, e entra
  também no comando único de voltar tudo. É o caso mais simples da área — um número, um padrão
  conhecido.
- **Não existe nada irreversível aqui.** Diferente de apagar material criado (§3.6) ou ferramenta
  (§4.7), não há o que perder: a margem é um valor único, sempre sobrescrevível.
