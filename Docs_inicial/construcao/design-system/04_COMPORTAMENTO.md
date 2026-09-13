# Comportamento do painel — Fenix

**O que é:** como o painel funciona no tempo. Ciclo de cálculo, modelo vivo, estados, feedback, erro,
vazio, carregamento, conteúdo, formatação, acessibilidade e movimento.

**O que não é:** catálogo de componente (peça `03`) nem esqueleto (peça `02`). E não define cor —
[`../DESIGN_SYSTEM_FENIX.md`](../DESIGN_SYSTEM_FENIX.md).

---

## 1. Ciclo de cálculo

> **O primeiro cálculo é um compromisso consciente. Depois dele, tudo é vivo.**

| Fase | Comportamento |
|---|---|
| **Antes do primeiro cálculo** | Mudar qualquer coisa apenas limpa. **Nenhum número é exibido** — nem zero, nem traço preenchendo o formato |
| **Depois do primeiro cálculo** | Qualquer mudança de entrada, de controle **ou** de resultado recalcula na hora, sem gesto adicional |

**A razão de o estado vazio ser tão duro** (**R4**): zero calculado apresentado como resultado é a
mentira mais fácil de contar e a mais difícil de detectar.

O interruptor é `state.isCalculated` (`app.js:68`). Toda função de reatividade consulta antes de
agir: `recalcularDinamico` só recalcula se já houve cálculo (`app.js:808`) e, se não houve, apenas
revalida o comando (`app.js:844-845`); os passos dos cartões de comando nascem desabilitados até lá
(`app.js:1315`).

### 1.1 Requisitos por família

O comando de cálculo se habilita quando a família tem todos os seus requisitos. As listas são
diferentes, e o `title` do comando **nomeia o que falta** (`app.js:750-758`).

| Família | Requisitos, além de material e ferramenta |
|---|---|
| **Fresar** | Diâmetro (D) · Balanço (L) · Número de dentes (Z) · Profundidade de corte (ap) · Penetração de trabalho (ae) · Velocidade de corte (vc) · Avanço por dente (fz) · **Raio de canto (r), só em toroidal** |
| **Furar** | Diâmetro da broca (D) · Ângulo de ponta · Balanço (L) · Velocidade de corte (vc) · Avanço por rotação (fn) |
| **Roscar** | Designação da rosca · Balanço do macho (L) · Velocidade de corte (vc) |
| **Mandrilar** | Diâmetro inicial (Di) · Diâmetro final (Df), **maior que Di** · Raio de ponta (rε) · Balanço (L) · Velocidade de corte (vc) · Avanço por rotação (fn) |

**O raio de canto é o único campo condicional do produto** (`app.js:277-280`) — aparece só em fresa
toroidal, e some quando a geometria muda. É a única implementação do princípio do brief §5.1: *campo
que não se aplica não existe — nunca aparece desabilitado*.

**No protótipo, as outras 16 geometrias não variam campo nenhum** — era o defeito **C**, e o
protótipo fica assim: é o contrato congelado, e refazer o formulário dele seria reconstruí-lo.
**Na casca do Ciclo 3 o defeito foi corrigido em 09/09/2026:** o campo condicional passou a vir de
`extraFields` da geometria, em `src/core/tools.ts`, e não do nome da ferramenta. Geometria nova
funciona sem tocar no formulário. Ver `00_LEIA-ME.md` §5.1.

### 1.2 O comando desabilitado

Enquanto falta requisito, o comando fica desabilitado com o `title` listando o que falta, e a linha
de feedback nomeia até três itens seguidos de reticências (`app.js:783`).

**É a divergência F.** `E5 §4` e o brief §7.1 dizem que o comando *nunca some e nunca é
desabilitado*. Não foi arbitrado — `00_LEIA-ME.md` §5.2.

---

## 2. Modelo vivo bidirecional

**A calculadora é bidirecional em dois números, e só neles.** O operador edita rotação ou avanço da
mesa, e o sistema recalcula tudo para trás.

| Ele edita | O sistema deduz |
|---|---|
| **Rotação** | A velocidade de corte correspondente — **e reescreve o campo dela**, visível, editável (`app.js:817-820`) |
| **Avanço da mesa** | O avanço por dente (fresamento) ou por rotação (furação e mandrilamento), **também reescrito no campo** (`app.js:826-836`) |

**O caminho inverso também existe:** digitar velocidade de corte, avanço por dente ou avanço por
rotação recalcula rotação e avanço da mesa (`app.js:2223`).

**O roscamento é travado:** o avanço é imposto pelo passo da rosca, o cartão nasce sem incremento
(`app.js:1366`) e o rodapé diz por quê. Não é limitação — é a cinemática da rosca.

### 2.1 Precedência — o que o operador fixou não se move sozinho

`state.manualmenteAjustado` (`app.js:94-99`) guarda, por família e por grandeza, o que o operador
tocou. Toda derivação de valor de partida é guardada por essa marca.

| Situação | Comportamento |
|---|---|
| Troca de ferramenta **dentro da família** | Carrega geometria e substrato; **sobrescreve só o que o operador não tocou** (`app.js:2093-2128`) |
| Troca de material | Deriva só a velocidade de corte, e só se ela não foi tocada (`app.js:2064-2077`) |
| Troca de família | Os valores da família anterior permanecem; **só o ajuste `±` zera** |
| Desselecionar a ferramenta | Limpa a geometria e apaga as grandezas **não tocadas** (`app.js:2130-2140`) |
| Restaurar padrões | Limpa a marca inteira da família e re-deriva tudo (`app.js:990`) |
| Material apagado na biblioteca | **Não some em silêncio** — a coluna de resultado mostra uma banda informativa dizendo o que aconteceu (`app.js:1549-1554`) |

**Por que isso importa mais do que parece:** o brief §3.5 diz que comparar duas ferramentas na mesma
condição é uso corrente, não exceção. Zerar os valores manuais na troca puniria exatamente quem está
comparando.

### 2.2 Uma cascata, e ela é assimétrica

Digitar o **diâmetro** no fresamento recalcula o avanço por dente pela curva por diâmetro e a
penetração de trabalho como fração do diâmetro, escrevendo direto nos dois campos
(`app.js:2200-2219`). Nenhuma outra entrada faz isso.

**É o único ponto do produto em que uma entrada move outra entrada.** O brief §5.3 regra 4 diz que
*nenhum controle empurra outro para satisfazer um alvo* — e esta cascata não empurra para satisfazer
alvo, ela **re-deriva valores de partida** quando a base geométrica muda. A distinção é fina e
precisa estar escrita, porque quem reimplementar sem entendê-la ou apaga a cascata ou a generaliza.

---

## 3. Estados

**Nem todo componente precisa de todos os estados.** Só os semanticamente relevantes.

| Estado | Quais componentes | Como se manifesta |
|---|---|---|
| **Padrão** | Todos | — |
| **Hover** | Todo elemento interativo — 17 regras | Mudança de superfície |
| **Foco** | Todo elemento alcançável por teclado | Anel visível, uma regra global (`css/prototipo.css`) e duas de contêiner de campo |
| **Pressionado** | Ação principal | — |
| **Selecionado** | Seleção nativa | Nativo |
| **Ativo** | Aba de família | Estado visual **e** `aria-selected` |
| **Ajustado manualmente** | Cartão de resultado alto | Tag com o percentual, rodapé com o valor de origem, comando de reverter (`app.js:1303, 1325-1333`) |
| **Fim de curso** | Passo, no piso | `disabled` **e** `aria-disabled`, com `title` explicando |
| **Carregando** | Só a ação principal | 240 ms (`app.js:855-880`) |
| **Erro** | Campo | Borda e mensagem. **Três pontos apenas** (`app.js:1648, 2604, 3135`) |
| **Sucesso** | Ação principal, tira de status, linha de feedback | Três sinais simultâneos |
| **Somente leitura** | Valor não editável | Superfície que não afunda |
| **Confirmando** | Zona destrutiva | Troca no lugar |
| **Vazio** | Painel, lista | §5 |
| **Desatualizado** | Números, e **só eles** — o alerta não acompanha (**R7**) | Alcançável desde 09/09/2026 |
| **Desabilitado** | **Só a ação principal** | Divergência **F** |

### 3.1 O estado que não existe, de propósito

**Não existe estado desabilitado como padrão do sistema.** `DESIGN_SYSTEM_FENIX.md` §7: *"nada trava
neste produto, e campo que não se aplica não existe em vez de aparecer apagado"*.

A regra prática, quando alguém for tentado a desabilitar um controle: ou o controle não deveria estar
na tela naquele momento (então remova), ou ele deveria aceitar o valor e deixar o alerta falar (então
aceite). **A terceira via — desabilitar — significa que uma das duas regras foi violada.**

### 3.2 O estado desatualizado — e o que ele quase não foi

Quando este conjunto mediu o painel, o estado **desatualizado** tinha tudo montado — a classe de
coluna, o ramo da tira de status com a frase pronta — e **faltava a função que o liga**:
`markOutdated()` era chamada em dois pontos e definida em nenhum, o que lançava `ReferenceError` e
quebrava a área Configurações. Era o defeito **A**, o mais grave dos doze. **Corrigido em
09/09/2026** (`00_LEIA-ME.md` §5.1).

**A regra, agora implementada:**

| # | Regra | Onde vive |
|---|---|---|
| 1 | Só existe estado desatualizado **depois do primeiro cálculo** — antes, não há o que desatualizar (**R4**) | `app.js:2572` |
| 2 | Os **números** ficam marcados; **o alerta e o nível de diagnóstico não** (**R7**) | a regra de esmaecimento só alcança `.rbig` e `.u20` |
| 3 | **Nem o valor que carrega alerta esmaece.** A regra tem `!important` e venceria a cor inline do alerta — o que seria esmaecer alarme ativo, exatamente o que a R7 proíbe | `.u20:not(.is-alert)` |
| 4 | **Não se usa opacidade** para isso — opacidade derruba o contraste e o número continua na tela para ser lido | `../DESIGN_SYSTEM_FENIX.md` §2.6 |
| 5 | O estado **sobrevive à volta de Configurações**: só recalcular ou restaurar padrões o desliga | `switchTab` não zera `isOutdated` |

**Dois pedaços quebrados apareceram no caminho, e valem como aviso:** a grade de verificação não tinha
o ancestral que a regra de esmaecimento exige, então as saídas de verificação ficavam em dia enquanto
os resultados de comando esmaeciam; e a regra teria esmaecido o valor em atenção. **CSS pronto não é
CSS que funciona** — só a função que liga o estado prova o caminho inteiro.

---

## 4. Diagnóstico e tokens semânticos

**Quatro níveis, e só eles.** Três são os níveis de diagnóstico do produto; o quarto é informação
neutra que não é diagnóstico.

| Nível | Quando | O que significa para quem opera |
|---|---|---|
| **CRÍTICO** | A montagem não realiza o que foi pedido | O número na tela **não descreve a peça que vai sair**. A mensagem diz de quanto o pedido estourou |
| **ATENÇÃO** | Condição possível e ruim, de forma nomeada | Executável. O operador decide |
| **NORMAL** | Nenhuma condição ativa | Nada fora da faixa **entre as condições verificadas** — o que não é o mesmo que garantia |
| **Informação** | Fato que não é diagnóstico | Ex.: o material selecionado saiu da biblioteca |

**Os gatilhos implementados hoje são quatro, em três famílias:** penetração de trabalho maior que o
diâmetro no fresamento (`CRÍTICO`, `app.js:473-477`) · velocidade de corte acima do teto do macho no
roscamento (`CRÍTICO`, `619-622`) · relação balanço/diâmetro acima de 4,0 no fresamento
(`ATENÇÃO`, `478-483`) **e no mandrilamento** (`ATENÇÃO`, `688-696`). O brief §5.8 declara **17
gatilhos possíveis** — os outros treze ainda não existem no protótipo.

**O mesmo limiar, dois textos.** O gatilho de balanço diz "haste comum" no fresamento e "barra de
mandrilar comum" no mandrilamento, e o segundo acrescenta os limiares da barra amortecida. **É o
comportamento certo:** o limiar numérico é o mesmo, o objeto físico não é, e a mensagem nomeia o
objeto que o operador tem na mão.

**Precedência:** `CRÍTICO > ATENÇÃO > NORMAL`. **Uma condição por vez**, de 17 gatilhos possíveis;
havendo outra ativa, a linha diz que existe sem detalhá-la ali.

**Nenhum nível impede o resultado.** O nível diz o quanto o operador precisa olhar antes de dar o
start — nunca se o número aparece. Ele sempre aparece (**R1**).

### 4.1 As seis regras do diagnóstico

| # | Regra |
|---|---|
| 1 | **O alerta descreve o risco e situa o valor — não instrui.** Sem "reduza", "aumente", "divida em passes" |
| 2 | **Condição sem grandeza e referência a mostrar não vira alerta.** Ou o sistema descreve com número, ou o que ele tem é opinião — e opinião não ocupa esse lugar |
| 3 | O **erro de digitação** é natureza separada: **não move o nível** e é rotulado como validação de entrada, nunca como risco de processo |
| 4 | Quando nada dispara, o lugar do alerta **não fica vazio** — mostra a condição normal |
| 5 | **O nível é somente leitura.** Não se arrasta, não se ajusta, não se silencia |
| 6 | **Cor nunca é o único portador.** Todo nível tem chip textual e posição fixa |

**Onde o produto usa verbo de orientação, e é o único lugar:** o padrão de direção de ajuste
(`03_COMPONENTES.md` §5.5). Ali o operador **pediu** direção; no alerta, o sistema empurra informação
que ele não pediu.

### 4.2 O que a margem de segurança não faz

A margem é **lente de exibição** em `% do calculado`, aplicada por último sobre os números que a tela
mostra. Ela **não escala** o que o operador digitou, **não escala** as grandezas que disparam alerta,
e **o alerta e o nível nunca a acompanham** — eles descrevem o físico real. Um alerta que se movesse
com a lente seria a lente virando limitador de segurança, que é exatamente o que ela não é.

No painel principal ela só aparece **quando difere de `100 %`** (`app.js:1094-1096`).

---

## 5. Vazio

Três vazios diferentes, e confundi-los é erro de produto.

| Vazio | Significado | Como se apresenta |
|---|---|---|
| **Ainda não configurado** | O painel abre zerado, sem material nem ferramenta | Chips dizendo "Nenhum material selecionado" · tira de status "Painel Zerado" · comando desabilitado com o que falta · **nenhum número** |
| **Lista vazia** | A categoria de ferramenta não tem item cadastrado | Frase no lugar da lista, com o que fazer: *"Nenhuma ferramenta cadastrada nesta categoria. Adicione uma acima."* (`app.js:2732`) |
| **Sem resultado por erro** | — | **Não existe.** Nenhuma entrada impede a entrega do resultado (**R1**) |

**A diferença entre "sem dados" e "erro" não precisa ser desenhada no Fenix**, porque o segundo caso
não existe: o produto não busca dado remoto, não falha em carregar e não recusa calcular. É a
consequência de não haver rede em tempo de uso (**R11**, `ADR-0001`).

**Uma inconsistência:** existe um componente de estado vazio em CSS (`css/prototipo.css`) que **nunca é
gerado** — o vazio de lista é texto solto. Defeito **E**.

---

## 6. Carregamento

| Padrão | Existe? |
|---|---|
| Carregamento de página | **Não** — o painel abre pronto |
| Carregamento de componente | **Não** |
| Carregamento de dados | **Não** — não há requisição em tempo de uso |
| **Carregamento de ação** | **Sim** — 240 ms na ação principal, com o texto trocando para "Calculando…" |
| Atualização parcial | **Sim** — pulso na coluna de resultado quando o número novo chega |
| Esqueleto | **Não, e não deve existir** |

**Por que não há esqueleto nem indicador de espera:** o cálculo é aritmética escalar, microssegundos
em qualquer runtime (`ADR-0001`). O padrão certo aqui não é *indicador de espera* — é **confirmação
de execução**, que é o pedido literal do Mestre em 30/08/2026 (`GABARITO` **D10**): *sem confirmação,
o operador aciona duas vezes*.

**Os 240 ms são deliberados, e são o único momento em que o produto fica mais lento de propósito.**
Zero milissegundo seria imperceptível e o operador não saberia que rodou.

---

## 7. Conteúdo, linguagem e formatação

### 7.1 Vocabulário

**Nome por extenso seguido do símbolo entre parênteses.** Os nomes técnicos são longos de propósito e
não podem ser encurtados, substituídos por termo leigo nem reduzidos ao símbolo sozinho. O par educa
o operador ao longo do uso, que é objetivo declarado do produto.

**Duas exceções autorizadas** (Specification Sheet §1.3): o resumo compacto de montagem e o gatilho
de bloco recolhido aceitam a forma de sigla — `Ø10 · Z4 · L45`.

**Exatamente quatro nomes de família:** Fresar · Furar · Roscar · Mandrilar.
**Exatamente três nomes de diagnóstico:** CRÍTICO · ATENÇÃO · NORMAL.

**Termos proibidos na interface**, porque nomeiam conceitos retirados do produto: `estimado` ·
`forçado` · `modo rápido` · `modo detalhado` · `camada 1` · `camada 2` · `extrapolado` ·
`Sem fonte publicada` · `editado` como marca de origem de resultado.

> `manual` **não** está proibido: "valor manual" continua nomeando um controle que divergiu da
> recomendação. É comportamento, não marca de procedência.

### 7.2 Regras de escrita

| # | Regra |
|---|---|
| 1 | **A mesma função tem sempre o mesmo nome.** Dois botões que fazem a mesma coisa com nomes diferentes é defeito |
| 2 | O comando nomeia o ato, nunca "OK" nem "Confirmar" sozinho |
| 3 | A confirmação fala no passado e diz o que foi feito |
| 4 | O alerta descreve; a direção de ajuste instrui. **Nenhum dos dois faz o papel do outro** |
| 5 | A explicação de um parâmetro tem quatro partes obrigatórias, sempre nesta ordem |
| 6 | Frase genérica sobre usinagem não entra em lugar nenhum — ela ensina o operador a ignorar o bloco |
| 7 | **O texto fixo "o sistema recomenda, o operador decide" é permanente na tela.** Não é aviso legal de rodapé: é a declaração do papel do sistema |

### 7.3 Formatação numérica

| # | Regra | Exemplo |
|---|---|---|
| 1 | Milhar separado por **ponto** | `4.456 rpm` |
| 2 | Decimal separado por **vírgula** | `0,018 mm` |
| 3 | O separador é **caractere de pontuação, nunca espaço** | `4.456`, jamais `4 456` |
| 4 | **Casas decimais são propriedade da grandeza**, fixas, e não ajustáveis pelo operador | rotação sem casa; espessura de cavaco com três |
| 5 | **Unidade sempre junto do número**, nunca só num rótulo distante | — |
| 6 | **Dígitos de largura fixa** | o painel se atualiza ao vivo, e dígito que dança dificulta a leitura |
| 7 | O cálculo trabalha em precisão plena; **arredonda só na exibição** | — |
| 8 | O ajuste percentual mostra o sinal explícito, com o menos tipográfico | `ajuste −5 %` |

A regra 3 existe porque o defeito real foi esse: espaço no lugar do ponto abre um vão no meio do
número e ele passa a ser lido como dois.

**As funções que implementam isso** — `formatInt`, `formatDec`, `parseBrNum`, `valStr`
(`app.js:22-62`). A leitura aceita as duas formas (`1.234,56` e `0.060`), a escrita produz só a
brasileira.

### 7.4 Valores ausentes

| Caso | Apresentação |
|---|---|
| Antes do primeiro cálculo | **Nada.** Nem zero, nem traço |
| Grandeza que não se aplica à família | **Some.** Não aparece com valor neutro |
| Fator de afinamento igual a 1,00× | **Some** — mostrar "1,00×" ocupa espaço para dizer que nada aconteceu |
| Constante de material em branco | Aceita. Nenhum valor digitado é recusado, truncado ou ajustado em silêncio |

---

## 8. Erros

Quatro naturezas, e o operador precisa distinguir as três primeiras **imediatamente** (tensão **T7**).

| Natureza | Move o nível? | Como se apresenta | O resultado |
|---|---|---|---|
| **Valor absurdo aceito** | **Sim** — vira CRÍTICO ou ATENÇÃO | Banda de alerta, com a grandeza contra a referência | **Sai normalmente**, e a edição continua viva |
| **Erro de digitação** — valor implausível por uma ordem de grandeza | **Não** | Marca no campo, rotulada como validação de entrada | Sai |
| **Campo inválido ou obrigatório vazio** | **Não** | Marca no campo · comando desabilitado nomeando o que falta | Não há resultado ainda |
| **Falha de operação** — nome de item em branco ao criar | **Não** | Marca no campo · linha de status · **foco devolvido ao campo** (`app.js:3140`) | A operação não acontece |

**Por que a segunda natureza não move o nível:** dizer "risco de processo" quando o operador digitou
um zero a mais ensina que o alerta mente, e o alerta verdadeiro morre junto.

### 8.1 O que cada erro responde

| # | Pergunta | Onde a resposta mora |
|---|---|---|
| 1 | O que aconteceu | Título da mensagem |
| 2 | Qual o impacto | Corpo, com o efeito físico |
| 3 | O que fazer | **No alerta, não se responde** — o alerta descreve. A resposta mora na direção de ajuste, que é outro bloco |
| 4 | Dá para tentar de novo | Sempre. Nada trava, e todo campo continua editável |

### 8.2 O que o protótipo não cobre

A marca de erro de campo existe em **três pontos apenas** — balanço acima de 300 mm no fresamento,
apelido de ferramenta e nome de material. **A segunda natureza da tabela acima praticamente não
está implementada:** o brief a descreve como categoria de primeira classe, e o painel só a exerce
num campo.

Registrado aqui, não como defeito numerado, porque é **cobertura incompleta de um requisito**, não
código quebrado.

---

## 9. Acessibilidade

### 9.1 O que existe

| Requisito | Estado |
|---|---|
| Alvo de interação generoso | **44px em nove componentes**, inclusive nos gatilhos de ajuda (**R9**) |
| Cursor sobre o elemento nunca é o único caminho | **Cumprido** — não há dica flutuante; toda revelação abre por clique ou teclado |
| Foco visível | **Cumprido** — regra global mais duas de contêiner de campo |
| Rótulo associado ao campo | **Cumprido** — 38 pares |
| Teclado numérico em dispositivo móvel | **Cumprido** |
| Estado que não depende só de cor | **Cumprido** — todo nível tem chip textual e posição fixa (**R8**) |
| Movimento reduzido | **Cumprido** — zera todas as animações |
| Revelação anunciada | **Cumprido** — 26 pares de estado e alvo |
| Anúncio de mudança | **Parcial** — duas regiões vivas |
| Foco preservado após re-render | **Parcial** — dois pontos |

### 9.2 O que falta

| Lacuna | Requisito que descumpre |
|---|---|
| **Zero `tabindex`** — nenhuma gestão de ordem de foco | **R10** |
| ~~Sem `role="tabpanel"`, sem `aria-controls`, sem navegação por setas~~ | **R10** — **fechado na casca em 09/09/2026**; no protótipo segue pela metade |
| ~~Sem `<h1>` a `<h6>`~~ | **R10** — **fechado na casca em 09/09/2026**, com um `<h1>` em `.sr-only`; no protótipo segue ausente |
| **Sem `aria-invalid`** — o erro de campo é borda e texto, sem ligação semântica | **R10** |
| **Sem `aria-describedby`** ligando o campo à sua mensagem de erro | **R10** |
| **Sem `aria-required`** — o obrigatório só aparece no `title` do comando | **R10** |
| **Sem atalho de salto** para o conteúdo | — |
| O valor de um cartão de comando **não é anunciado quando muda por digitação em outro campo** — a região viva só é alimentada pelos passos | **R10** |
| A região viva é **destruída e recriada a cada render** (`app.js:1456-1457`), o que pode suprimir o anúncio | **R10** |
| Dois `<select>` sem rótulo visível, só com `aria-label` | — |

**A ordem de foco dentro do cartão de comando é aceitável por acidente:** o `−` vem antes do valor no
documento, então a leitura por teclado é `−`, valor, `+`. O valor não recebe foco.

---

## 10. Movimento

**O movimento comunica mudança de estado. Nunca decora.**

| Gatilho | Elemento | Propósito | Duração relativa |
|---|---|---|---|
| Comando acionado | Ação principal | Confirmar que executou | Curta |
| Resultado novo | Coluna de resultado | Ser perceptível **sem exigir que o operador procure o que mudou** | Curta |
| Abertura de gaveta | Painel da gaveta | Revelar conteúdo | Média |
| Troca de largura simulada | Contêiner | Orientação espacial. **É andaime de protótipo** | Média |
| Mudança de nível de diagnóstico | Banda de alerta | **Movimento proporcional à gravidade** — a transição para condição crítica é mais insistente que para condição segura | Declarado no escopo, **não implementado** |

**Movimento reduzido zera tudo** (`css/prototipo.css`), e a informação passa a ser transmitida só por estado
e rótulo. Isso é possível porque nenhuma informação do produto depende exclusivamente de movimento.

**Nenhuma animação é interrompível**, e nenhuma precisa ser: todas são curtas e nenhuma bloqueia
interação.

---

## 11. Permissões e estados condicionais

**Não existem no produto.** Sem conta, sem login, sem perfil, sem papel, sem nuvem, sem sincronização
entre dispositivos (`ADR-0001`, `E6 §7`).

Nenhum recurso é bloqueado por permissão, nenhuma ação é indisponível por perfil, e não há a figura
de "usuário sem acesso".

**A única condicionalidade do produto é de dado, não de permissão:**

| Condição | Efeito |
|---|---|
| Ferramenta não selecionada | O comando de cálculo permanece desabilitado, nomeando o que falta |
| Geometria não é toroidal | O campo de raio de canto **não existe** |
| Grandeza não se aplica à família | O cartão **não existe** |
| Item é de fábrica | Não tem comando de apagar — tem comando de reverter |
| Modelo tem um substrato só | O campo vira valor não editável |

**A regra que unifica as cinco:** o que não se aplica **deixa de existir**, nunca aparece apagado.

**Seção declarada vazia de propósito.** O pedido manda não presumir regra de negócio que não está no
projeto — e permissão é a regra de negócio mais fácil de inventar sem que ninguém tenha pedido.
