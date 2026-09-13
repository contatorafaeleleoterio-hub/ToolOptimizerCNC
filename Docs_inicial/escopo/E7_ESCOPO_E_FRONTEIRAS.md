# E7 — Escopo e Fronteiras

**O que este documento define:** a fronteira do sistema — o que ficou de fora, sob que natureza, por
qual razão, e o que precisaria acontecer para cada item entrar. Cobre também o que ainda não foi
decidido, com a pergunta formulada e o dono da decisão.

**O que não define:** comportamento. Este documento **não cria regra nova**. Onde ele divergir de
outro documento de escopo, o outro vence — E7 é o registro da fronteira, não fonte de conduta. A
única precedência acima de todos continua sendo o princípio da calculadora agnóstica (**E0**).

**Por que ele é o último:** a fronteira de um sistema só existe depois que o interior existe. Escrever
esta lista antes dos demais documentos produziria exclusão sobre função que ainda ia mudar.

**Sobre as listas:** todo item aqui carrega três coisas — **a natureza da fronteira**, **a razão**, e
**o que o traria para dentro**. Item registrado só como "fora de escopo" volta à mesa em toda revisão,
porque ninguém lembra por que saiu; e um item que saiu por falta de dado é confundido com um que saiu
por decisão, o que faz o projeto refazer a pesquisa que já concluiu.

---

## 1. As quatro naturezas de fronteira

Nem tudo que está fora está fora do mesmo jeito. A natureza diz **o que o item está esperando** — e,
por consequência, quem pode movê-lo.

| Natureza | O que significa | Quem move | O que a mudança exige |
|---|---|---|---|
| **Descartado** | Foi examinado e **não deve existir**. A razão é de mérito | Dono do produto | Evidência nova que **derrube a razão escrita**. Repetição do pedido não conta |
| **Adiado** | Deve existir, mas não agora. A razão é ordem e custo, **não mérito** | Dono do produto | Nada além de chegar a vez. O item entra com o escopo que já está descrito |
| **Bloqueado por dado** | O escopo está decidido e o comportamento definido. **Falta o número** | Ninguém decide — depende de obter a fonte | O documento nomeado, aberto na página. Não é mais busca aberta |
| **Pendente de decisão** | O material não diz, e inventar seria arbitrar em nome de quem usa | **Só o dono do produto** | A decisão, tomada em bloco com as demais |

**A regra que separa as quatro:** onde falta base, o sistema **declara a falta** — não preenche com
valor plausível. Um número inventado é indistinguível de um apurado quando aparece na tela, e o
operador não tem como saber a diferença olhando. É o defeito que este projeto existe para não repetir.

### 1.1 Casos de borda — natureza

| Situação | Comportamento | Por quê |
|---|---|---|
| Um item **adiado** é pedido por usuário real | O pedido é registrado e **conta como prioridade**, não como reabertura | A razão de estar fora é ordem. Demanda real muda ordem |
| Um item **descartado** é pedido por usuário real | O pedido é registrado, e a razão de estar fora é apresentada. Ele só sai da lista se a razão cair | Se pedido repetido reabrisse decisão de mérito, nenhuma decisão sobreviveria à segunda semana |
| Um item **bloqueado por dado** é cobrado | Não vira decisão de produto. O que falta é a fonte, e o que a substitui é a leitura qualitativa já especificada | Decidir por cima de dado ausente é inventar com aparência de escolha |
| Um item aparece em duas listas | Vale a natureza mais restritiva: descartado vence adiado, e adiado vence bloqueado | A mais restritiva é a que impede começar a construir cedo demais |

---

## 2. A fronteira positiva — o que o sistema é

Antes da lista do que ficou fora, o que ficou dentro, em uma frase:

> **Uma calculadora de parâmetros de corte que abre pronta, entrega o resultado sempre, diz o que vai
> acontecer e o que mexer — para o operador que está na máquina.**

| Fronteira | Onde está descrita |
|---|---|
| O resultado é **sempre** entregue. Nada trava, nada bloqueia, nada pede liberação | **E0** §3.3 · §8.4 |
| O usuário é **o operador na máquina**, não quem planeja o ferramental | corte do primeiro produto |
| Quatro famílias de usinagem — fresar, furar, roscar, mandrilar | **E1** §2 |
| **Entrada mínima e entrada completa são o mesmo painel**, não dois produtos | **E0** §4 |
| O ambiente do usuário é opcional, explícito e reversível — e nunca limita o núcleo | **E0** §3.2 · §3.4 |

### 2.1 O teste de pertencimento

Um item pertence ao produto quando passa nos critérios abaixo — regra escrita em outro documento.
Este documento apenas os reúne como critério de fronteira:

| # | Critério | Origem |
|---|---|---|
| 1 | **Muda um número que o operador lê na tela** | **E5** P3 |
| 2 | — | Critério removido em 31/08/2026: a procedência saiu do produto. Número preservado; a lista não é renumerada |
| 3 | **Não exige que o operador declare o ambiente dele para existir** | **E0** §3.1 |

Reprovar em 1 manda para **descartado**. Reprovar em 3 não exclui: manda para o **ambiente
declarado**, que existe e é opcional.

---

## 3. Descartado — não volta sem evidência nova

| Item | Por que saiu | O que o traria de volta |
|---|---|---|
| **Calculadora reduzida** — menos campos, escondendo potência de corte (Pc), torque (Mc), taxa de remoção de material (MRR), relação balanço/diâmetro (L/D) e alertas | Um resultado com menos verificação **não é mais rápido, é menos verificado** — e o operador não tem como saber disso olhando a tela. A entrada mínima já é o painel inteiro | Nada previsto. A razão não depende de dado nem de ordem |
| **Trava, bloqueio e recusa de calcular** | É uma calculadora. Diante do impossível, sumir com o número esconde justamente a informação útil: **o tamanho do erro** | Nada previsto |
| **Gesto de liberar limite, e marca de "forçado"** | Caem por consequência: nada está preso, logo nada é liberado nem forçado | Só se a trava voltasse — e ela não volta |
| **Seletor de tipo de operação** — desbaste, semi-acabamento, acabamento | Desbaste e acabamento são **o que o operador está fazendo**, não atributo do cálculo. A agressividade se regula nos controles de corte, que já estão na tela. Multiplicadores por operação foram procurados em catálogo e não existem como regra de fabricante | Fonte publicada de fabricante com multiplicador por operação |
| **Seletor de estratégia de acabamento** — convencional × alta velocidade por contorno | Q17 (27/08/2026). A função do sistema é calcular e mostrar; quem decide usar, ajustar ou só analisar o parâmetro é o operador. O sistema recomenda o `ap` de partida da geometria e não afirma nada sobre estratégia — então não precisa de um seletor | Nada previsto. A calculadora não faz a afirmação que o seletor sustentaria |
| **Revestimento — campo, lista filtrada ou fator no cálculo** | Q18 (27/08/2026). Multiplicador de velocidade por tipo de revestimento foi procurado em dois territórios independentes e veio **vazio, cinco de cinco** — fabricante publica dureza, temperatura de trabalho e coeficiente de atrito, nunca multiplicador. A ferramenta de catálogo já sai revestida, e nenhum fator publicado separa a revestida da não revestida. Fator que não move o resultado além da margem do modelo não entra. A contraindicação diamante/PCD sobre ferroso não vira bloqueio na tela: a ferramenta não é catalogada para ferroso, então a combinação não chega a existir | Publicação inédita ou ensaio próprio com fator por par revestimento × material. Não é lacuna de busca: é ausência no domínio |
| **Seis campos de ferramenta que não entram em conta nenhuma** — refrigeração interna, sobremetal, arestas em furação, profundidade da feição, ângulo de chanfro, ângulo de ponta | Pedir dado que não muda número treina o operador a preencher por preencher, e desvaloriza os campos que importam | **Voltam quando o cálculo souber usá-los** — não antes. Ver **E1** §3.4 |
| **Campo desativado na tela** | Pior que campo ausente: ocupa atenção para dizer que não serve | Nada previsto |
| **Índice de saúde e indicadores em forma de medidor** | O índice não tem fórmula com fonte; o medidor não acrescenta informação que o número já não dê | Fórmula com procedência para o índice. O medidor é decisão de apresentação, não de escopo |
| **Análise de vibração regenerativa** | Exige dados modais da combinação máquina + fixação + ferramenta, que não existem e não dá para estimar. Seria chute com aparência de ciência | Medição modal do conjunto real — o que está fora do que uma calculadora recebe como entrada |
| **Compensação automática do avanço** | O avanço por dente (fz) informado **é o que vai ser programado**. Compensar por cima de um valor que já é avanço programa até 2,3× a mais. O sistema mostra a espessura de cavaco (hex) resultante e avisa quando ela cai demais | Nada previsto. A razão é aritmética, não preferência |
| **Aço rápido sem cobalto no catálogo de fresas** | Procurado em catálogo corrente e **não encontrado à venda**. A entrada representava ferramenta que não existe | A ferramenta voltar a existir em catálogo corrente |
| **Curva de pico de velocidade de corte (vc) em Ø6–8 mm** | Não recebeu confirmação em fonte. Um valor não atravessa a fronteira por já existir | Fonte primária que a sustente |
| **Montar a ferramenta combinando formato e substrato em campos separados** | Permitiria montar uma combinação que ninguém vende, e obrigaria uma validação depois para recusá-la. **A prevenção de erro vem da estrutura da lista**, não de checagem posterior | Nada previsto |
| **Preferência que altera fórmula** | Fórmula tem fonte; não é gosto do usuário. A configuração muda o que o sistema compara e como apresenta — nunca o que ele calcula | Nada previsto |
| **Identificação pessoal do operador** | Nenhuma função da tela a consome. Dado guardado sem controle correspondente é peso morto que ninguém revisa porque ninguém vê | Uma função que dependa de saber **quem** usou — hoje não existe nenhuma. Ver **Q30** |
| **Dado guardado que nenhuma função da tela controla** | Mesma razão, na forma geral | Nada previsto |

---

## 4. Adiado — fica para depois, com a ordem

**A ordem não é arbitrária:** o núcleo agnóstico precisa estar completo e bom antes de o ambiente
declarado receber esforço (**E0** §8). Um núcleo mediano com ambiente rico é um configurador mediano.

| Item | Por que não agora | O que ele espera |
|---|---|---|
| **Ambiente declarado** — perfil de máquina (rotação, potência, torque e avanço máximos), rendimento do acionamento (η), tolerância da peça | São propriedades do equipamento de quem usa, não do cálculo. Exigi-los transforma calculadora em configurador — e a evidência de campo **reforça**: ninguém pediu | O núcleo concluído. O escopo já está escrito em **E0** §3.2 e **E2** §6 |
| **Histórico, favoritos e biblioteca de ferramentas** | A biblioteca é o atalho de uso diário e vale a pena — mas depois do núcleo. Antes dele, é guardar resultado de uma calculadora que ainda está mudando | O núcleo concluído. Escopo em **E6** |
| **Importar, exportar e restaurar padrões** | Só faz sentido quando existe conjunto de dados do usuário para mover | Entra junto com o item acima. Escopo em **E6** §7 |
| **Copiar o resultado** | Exigiria escolher entre dois formatos com usos diferentes — os dois números de comando, para quem está na máquina, ou o bloco com contexto, para quem monta a folha de processo. Resultado copiado sem contexto não é interpretável depois | O uso mostrar qual dos dois é o real. Ver **Q7** |
| **Controle único de agressividade** — move os quatro parâmetros de corte juntos | Não faz parte da dinâmica pedida. Quando entrar, entra com **vetor de movimento declarado**, nunca como botão que mexe em número sem dizer em quanto | Decisão do dono do produto, e o vetor de movimento declarado |
| **Altura de crista como entrada** — informar a rugosidade (Ra) alvo e receber a penetração de trabalho (ae) | A relação está fechada e é consenso, mas **inverter a direção muda o fluxo**: a entrada passa a ser o objetivo de acabamento, não a condição de corte. Hoje a altura de crista é resultado exibido | Decisão de fluxo, não dado |
| **Fresamento em cinco eixos com ferramenta inclinada** | Há fórmula publicada para o diâmetro efetivo com eixo inclinado, e ela **não foi verificada**. Toda a cadeia atual vale para eixo perpendicular à superfície | Verificação da fórmula em fonte primária |
| **Sincronização entre dispositivos** | Não é função da calculadora, e depende de existir conta — que hoje não existe e traria de volta a identificação pessoal, que está descartada | Ver **Q30** |
| **Custo e tempo por peça** | Depende da vida absoluta da aresta, que está bloqueada por dado (§5) | O expoente de Taylor (n) da vida de ferramenta. É o mesmo bloqueio, visto pelo lado do custo |
| **O responsável pelo ferramental como usuário** | O produto atende o operador na máquina. A ligação entre parâmetro e consumo de ferramental é reconhecida como argumento forte, e **exige dado de vida que não existe** | O mesmo bloqueio de dado, e depois a decisão de atender um segundo usuário |

> **Adiado não é promessa de data.** Nenhum item desta tabela tem prazo; o que ele tem é razão de
> ordem e escopo já escrito, para entrar sem ser reespecificado.

---

## 5. Bloqueado por dado — o escopo está decidido, falta o número

**A distinção que esta seção protege:** nada aqui é decisão pendente. O comportamento já está
definido, o lugar do número já existe na estrutura, e **o produto já entrega alguma coisa no lugar** —
declarada como o que é. Quando o dado chegar, ele entra sem reescrita de escopo.

| Item | O que o produto entrega hoje | O que falta | Onde fecha |
|---|---|---|---|
| **Deflexão da ferramenta em micrômetros** | A relação balanço/diâmetro (L/D), o alerta de rigidez e a direção de ajuste | Três constantes: a razão entre força radial e força tangencial (Fr/Fc), o módulo de elasticidade (E) (diverge 16% entre levantamentos) e a regra do diâmetro resistente da haste canalizada. A deflexão é **inversamente proporcional** ao módulo — um erro ali propaga inteiro | Coeficientes de força em obra de referência de automação de manufatura |
| **Vida da ferramenta em número** | A previsão qualitativa: nomeia a condição e a grandeza que a disparou, sem inventar percentual | O expoente de Taylor (n) por material e a vida de referência (T_ref). Duas rodadas de pesquisa vazias; os valores em circulação aparecem em material com marca de geração automática | Manual de referência de engenharia mecânica ou compêndio de usinagem, aberto na tabela. **Achado barato a confirmar:** a norma de ensaio de vida talvez cubra só ferramenta de ponta única — se cobrir, a vida de referência dos catálogos de fresa **não tem norma que a ancore**, e a lacuna passa de "não achamos" para "não existe onde estar" |
| **Consumo e custo de ferramental** | Nada — é a mesma lacuna, pelo lado do custo | O item acima | Idem |
| **O balanço (L) movendo os parâmetros recomendados** | A relação balanço/diâmetro (L/D), o alerta e a direção de ajuste. **O sistema não inventa multiplicador** | Uma regra com fonte que ligue balanço a parâmetro recomendado. A prática de fábrica move — rotação, avanço e profundidade de corte (ap) caem a cada degrau de comprimento —, mas a evidência publicada não diz de quanto | Fonte que sustente a curva. Enquanto não existir, a lacuna fica declarada |
| **Diâmetro efetivo (De) da fresa toroidal** | O cálculo com a fórmula registrada, marcado como não confirmado | Confirmação em página de fabricante que trate de fresa de topo com raio de canto (rε) para incremento menor que o raio | Fonte primária de fabricante |
| **Faixa de diâmetro das famílias que não são fresamento** | Aceita a entrada; **não aciona o alerta de fora-do-envelope** (não herda o envelope da fresa — Q22), e a ajuda do campo diz que o envelope não foi levantado | Levantamento de catálogo por família | Levantamento, não pesquisa. Ver **Q22** |

> **A causa dos três primeiros é acesso, não ausência.** As referências estão **nomeadas**; duas
> rodadas de pesquisa as identificaram e não conseguiram abri-las. Isso não é lacuna de escopo, e não
> se resolve com mais uma rodada de busca aberta.

### 5.1 Casos de borda — dado bloqueado

| Situação | Comportamento | Por quê |
|---|---|---|
| O dado chega | Entra no lugar já reservado. O escopo **não reabre** | A estrutura foi escrita para receber o número sem reescrita — é o motivo de a lacuna ter sido declarada em vez de contornada |
| O dado chega **divergente** entre duas fontes | Não entra. Vira lacuna declarada, com a divergência escrita | Escolher entre duas fontes sem critério é arbitrar com aparência de apuração |
| O dado não chega nunca | A leitura qualitativa é o produto final daquele item, não um paliativo | Um produto honesto sobre o que não sabe vale mais que um número inventado que ninguém consegue conferir |
| Alguém propõe um valor "provisório" para destravar a construção | Não entra | Valor provisório na tela é indistinguível de valor apurado — é a regra da §1 |

---

## 6. Pendente de decisão

### 6.1 As seis questões de arquitetura de produto

Levantadas em **E0** §7 como pendências declaradas. O corte do primeiro produto fechou as seis —
**cinco em definitivo e uma só para a fatia construída**:

| # | Questão | Estado |
|---|---|---|
| **A1** | O produto entrega a entrada mínima, a completa, ou as duas | ✅ **Fechada.** Não existe um segundo modo a construir: o painel já **é** a entrada mínima, e a completa é o mesmo painel com o ajuste fino aberto |
| **A2** | Quais campos ficam na entrada mínima | ✅ **Fechada.** Os do painel, com a profundidade de corte (ap) promovida de controle a campo |
| **A3** | O resultado inclui previsão de comportamento | ✅ **Fechada.** Entra **qualitativa**: nomeia a condição e a grandeza que a disparou. Não entrega vida em número nem deflexão em micrômetros — os dois viram lacuna declarada, não silêncio |
| **A4** | O balanço (L) **move** os parâmetros recomendados | ⚠️ **Fechada só para a fatia construída** — não move, e a razão é a regra da §1. Para o produto, **continua aberta**, e depende do dado bloqueado em §5 |
| **A5** | A penetração de trabalho (ae) é assumida ou é campo | ✅ **Fechada.** Nem uma nem outra: **controle visível com valor de partida declarado**, marcado como padrão da geometria. Não é assumida em silêncio |
| **A6** | O responsável pelo ferramental é usuário do produto | ✅ **Fechada.** Não. Ver §4 |

### 6.2 As perguntas dos documentos de escopo

**Estado em 27/08/2026: das 29 vivas (Q1 a Q30, com a Q4 prejudicada), 13 fechadas no bloco de decisão e 16 ainda abertas.** As abertas não devem ser respondidas isoladamente — decidir caso de borda sem ver os outros gera decisão inconsistente, e por isso vão ao dono do produto **em bloco**.

**As 13 fechadas em 27/08/2026:**

| # | Decisão | Documento |
|---|---|---|
| **Q1** | Valores manuais permanecem enquanto a família for a mesma; voltam à região recomendada quando a família muda, avisando. **Vale para o produto inteiro** | E5 §4.2 |
| **Q2** | Valor fixado inalcançável: mantém e sinaliza, fora da faixa, com a informação do que falta — fato, não instrução. **Vale para o produto inteiro** | E5 §5.8 |
| **Q3** | Várias ajudas abertas: sem limite, mesmo comportamento em qualquer tela; a área rola | E5 §6.2 |
| **Q5** | Casas decimais fixas por grandeza, pelo significado físico, não ajustáveis. **Vale para o produto inteiro** | E3 §5.1 |
| **Q17** | Não existe seletor de estratégia de acabamento — o sistema recomenda o `ap` de partida, calcula o que o operador ajustar, e mostra sempre | E1 §7.2 |
| **Q18** | Revestimento fora do produto — sem campo, sem filtro, sem fator no cálculo. Ferramenta nomeada pelo tipo e substrato | E1 §5 |
| **Q19** | Aço acima de 48 HRC entra como material (dureza + constantes próprias), não como entrada de ferramenta. Sem trava por HRC, sem marca de "fora da linha" | E1 §4.4 |
| **Q20** | Entra toda liga com os campos que o cálculo consome preenchidos, origem declarada e editável | E1 §6.3 |
| **Q21** | Rosca fora da tabela: operador informa passo e diâmetro à mão; a designação é atalho sobre banco editável | E1 §3.3 |
| **Q22** | Famílias fora do fresamento não herdam o envelope da fresa; sem marca de extrapolação até o envelope delas ser levantado. Regra universal: nunca mostrar valor de partida copiado sem dizer de qual linha veio | E2 §3.1 · §3.3 |
| **Q24** | Só milímetro; o campo aceita vírgula e ponto; exibe em pt-BR | E2 §2.4 · §3.5 |
| **Q28** | Espessura de cavaco (hex): marca de extrapolado estendida até `h = 0,1 mm` (antes começava em 0,02) | E4 §3.1 gatilho 11a |
| **Q29** | Rasgo cheio sem o comprimento de aresta: dissolvida — o alerta descreve o risco, não entrega alvo de ajuste | E4 §3.5 |

> **Nota 31/08/2026.** A procedência saiu do produto (decisão do dono, 30/08/2026). Isso não reabre Q22 nem Q28 — o que elas decidiram continua valendo —, mas troca o veículo: onde elas dizem "marca de extrapolado" / "sem marca de extrapolação", leia "alerta de fora-do-envelope" (E2 §3.3, E4 §3.1 gatilhos 11 e 11a). A frase de Q22 "nunca mostrar valor de partida copiado sem dizer de qual linha veio" era procedência e saiu.

**Regra geral confirmada junto com Q29:** o alerta **descreve o risco e situa o valor** (grandeza contra referência, de quanto a distância) e **não instrui o operador**. Reescreve as mensagens de alerta de E4 e E5 §9, e derruba a regra anterior *"toda mensagem carrega alvo numérico"*. **Resolvido em 28/08:** a regra é do *alerta*. O painel *"o que mexer"* (E4 §6 / MVP §7.4) — que o operador abre para pedir direção — orienta com verbo, em tom educativo e linguagem de chão de fábrica.

**Decisão adjacente confirmada:** o **fator de segurança** é a única configuração que incide sobre o resultado final (fatores de pouca influência não entram), e está **sempre disponível** — não depende do perfil de máquina (E2 §7, E3 §6). Sai da lista de adiados da §4.

**As 16 ainda abertas:**

| Documento | Perguntas | Natureza |
|---|---|---|
| **E2** | Q23, Q25, Q26 | dependem do ambiente declarado — frente adiada |
| **E3** | Q6, Q7 | rotação mínima da máquina (ambiente); copiar o resultado (adiado) |
| **E4** | Q27 | força de pico ou média na deflexão — depende de dado bloqueado (§5) |
| **E6** | Q8 – Q16 | histórico, entrada órfã, favoritos, apelido de ferramenta, material sobreposto, importar, compatibilidade entre versões, limites de quantidade — frentes adiadas |
| **E7** | Q30 | sincronização entre dispositivos — decide-se junto com a identificação pessoal |

### 6.3 Pergunta nova levantada aqui

| # | Pergunta | Onde nasce |
|---|---|---|
| **Q30** | **Sincronização entre dispositivos é adiada ou descartada?** Ela é a única função que exigiria conta, e conta é a única coisa que traria de volta a identificação pessoal do operador, hoje descartada. As duas se decidem juntas, ou nenhuma se decide | §3 · §4 |

### 6.4 Casos de borda — decisão pendente

| Situação | Comportamento | Por quê |
|---|---|---|
| Uma pergunta pendente aparece durante a construção | **Nenhum comportamento que dependa dela é fixado.** A pergunta vai ao bloco | Resposta improvisada na construção vira comportamento sem dono, e ninguém sabe depois que foi improviso |
| Uma pergunta é respondida isoladamente, fora do bloco | A resposta é registrada, e as demais do mesmo documento são revistas contra ela | Perguntas do mesmo documento se tocam; decidir uma pode fechar ou mudar a vizinha |
| Uma pergunta perde o objeto — o que a originava deixou de existir | Fica **prejudicada, riscada e visível**, com a razão | Pergunta apagada volta a ser feita seis meses depois |
| Duas perguntas de documentos diferentes se contradizem | Vale a precedência dos documentos: **E0** vence todos; entre os demais, vence o que trata do assunto | É a mesma regra que resolve conflito de conteúdo |

---

## 7. Como um item muda de lista

| De | Para | O que exige |
|---|---|---|
| Descartado | Dentro | Evidência nova que **derrube a razão escrita** — não o pedido repetido |
| Adiado | Dentro | Chegar a vez. O escopo já está escrito |
| Bloqueado por dado | Dentro | A fonte nomeada, obtida. Nenhuma decisão de produto participa |
| Pendente | Dentro ou fora | A decisão do dono do produto, tomada em bloco |
| Dentro | Fora | Motivo escrito, e a natureza declarada. **Função não sai em silêncio** |

**A razão de exigir motivo escrito nos dois sentidos:** uma fronteira que se move sem registro deixa
de ser fronteira. O custo de escrever uma linha é menor que o de redescobrir, três revisões adiante,
por que algo entrou ou saiu.

---

## Dependências deste documento

**Valores numéricos:** nenhum. Este documento não consome número — ele registra onde os números que
faltam impedem uma função de existir, e cada um deles vive declarado em `canonicos/` ou na lacuna
correspondente.

**Estado das perguntas (27/08/2026):** das 29 vivas, **13 foram fechadas no bloco de decisão** (§6.2) e
**16 seguem abertas** — mais **A4**, que continua aberta para o produto. As abertas dependem de decisão
do dono do produto ou de dado obtido.

**Perguntas em aberto levantadas aqui:**

| # | Pergunta | Onde |
|---|---|---|
| Q30 | Sincronização entre dispositivos é adiada ou descartada — e o mesmo para a identificação pessoal que ela exigiria? | §3 · §4 · §6.3 |

**Referências cruzadas:**

| Assunto | Documento |
|---|---|
| A decisão que governa tudo, os dois eixos e as seis questões A1–A6 | **E0** |
| Famílias, catálogo e os campos que ficaram de fora do domínio | **E1** |
| Campos, faixas, envelope e o ambiente declarado | **E2** |
| O que é entregue e as regras de exibição | **E3** |
| Camadas, níveis, gatilhos e as lacunas de limiar | **E4** |
| Painel, momento do cálculo, edição e estados | **E5** |
| O que o operador guarda, e o que o sistema não guarda | **E6** |
| O corte do primeiro produto, e as lacunas numeradas | `mvp/` |
| Fórmulas, constantes, limiares e a procedência de cada valor | `canonicos/` |
