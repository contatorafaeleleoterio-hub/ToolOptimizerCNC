# Brief de design de interface — Fenix

**Para quem este documento é:** o designer (humano ou agente) responsável por conceber a interface
deste produto do zero.

**O que ele entrega:** o problema, a pessoa, o ambiente, as tarefas, todo o inventário de informação
que a tela precisa carregar, a volumetria de cada item, e as regras que qualquer desenho precisa
respeitar.

**O que ele deliberadamente não entrega:** nenhuma solução de interface. Nem layout, nem hierarquia
visual, nem agrupamento de campos, nem padrão de componente, nem ordem de leitura, nem cor,
tipografia ou espaçamento. **Nada disso está decidido, e nada disso deve ser inferido daqui.**

**Autossuficiência:** este documento não depende de nenhum outro. Tudo que o desenho precisa saber
está aqui.

---

## 0. Como ler este documento

| # | Instrução |
|---|---|
| 1 | **Se você achar que reconheceu um layout descrito aqui, releu errado.** Não há nenhum. Toda frase deste documento é um fato sobre o usuário, sobre o domínio ou sobre a informação — nunca sobre a tela |
| 2 | **Onde este documento diz "o operador precisa X", X é um resultado, não um mecanismo.** "Precisa conferir de relance" não é um pedido de resumo colapsado; é uma restrição de tempo de leitura, que você resolve como quiser |
| 3 | **A seção 9 é o coração do trabalho.** Ela lista as tensões reais e não resolvidas do produto. Elas não têm resposta ainda — resolvê-las é o desenho |
| 4 | **Não invente informação.** O inventário da seção 5 é completo e fechado. Se uma ideia de tela exige um dado que não está lá, o dado não existe: o domínio não o sustenta, e a seção 12 provavelmente explica por quê |
| 5 | **Não invente precisão.** O modelo por trás deste produto é aproximado. Qualquer elemento visual que sugira precisão alta (medidor fino, barra de progresso contínua, nota de 0 a 100) mente sobre o que o sistema sabe |
| 6 | **Os nomes técnicos da seção 11 são obrigatórios e não podem ser encurtados.** Eles são longos de propósito |

---

## 1. O produto em uma frase

Uma calculadora de parâmetros de corte para usinagem CNC, que a partir de cinco a sete informações
que o operador tem olhando a própria máquina entrega **os dois números que ele vai digitar no
comando**, **a previsão do que vai acontecer se ele rodar assim**, e **a direção do ajuste com o preço
escrito**.

**A frase que governa o produto inteiro:** *o sistema recomenda, o operador decide.*

---

## 2. Quem usa

### 2.1 A pessoa

**Operador/fresador de CNC em chão de fábrica.** Não é engenheiro, não é estudante, não veio
aprender. É o responsável técnico pela peça que sai da máquina, e responde por ela.

| Traço | Consequência para o desenho |
|---|---|
| **Já tem um valor na mão.** Ninguém chega ao produto sem parâmetro — a fábrica sempre tem um. O produto é confirmação, afinação e argumento, nunca revelação | O produto não pode se comportar como se estivesse ensinando algo a alguém que não sabe nada |
| **Não vai ler manual, não vai fazer treinamento, não vai assistir tour** | Toda a explicação tem que estar disponível no momento e no lugar da dúvida |
| **Conhece o domínio em termos práticos**, não formais. Sabe o que é avanço e rotação; não necessariamente sabe o que é "espessura de cavaco máxima" pelo nome | O vocabulário técnico entra, e vem acompanhado de explicação — não é substituído por termo leigo |
| **É julgado pelo resultado físico**, não pelo número. Um número correto que produz vibração está errado para ele — e ele tem razão | A tela precisa falar de comportamento, não só de grandeza |
| **Aprende usando.** Ganhar domínio do assunto é subproduto desejado, nunca pré-requisito | A explicação nunca pode bloquear o caminho de quem não quer ler |

**Existe uma segunda pessoa interessada** — o gestor ou responsável pelo ferramental, que paga a
conta quando o parâmetro ruim destrói ferramenta. **Ele não é usuário deste produto.** Não desenhe
para ele.

### 2.2 O ambiente físico

| Fato | Consequência |
|---|---|
| **Chão de fábrica.** Iluminação irregular, reflexo, sujeira, óleo | Contraste alto e legibilidade em condição ruim são requisito, não preferência |
| **A tela é tocada com o dedo, o teclado ou o ponteiro, muitas vezes com toque impreciso** | Toda área de interação precisa de alvo generoso. Precisão de ponteiro fino é impraticável |
| **A máquina pode estar rodando ao lado** — ruído, e atenção dividida | A leitura acontece em intervalos curtos, com interrupção |
| **Pode não haver conexão de rede nenhuma** | Nada na tela pode depender de rede em tempo de uso: nenhuma fonte remota, nenhum ícone remoto, nenhuma consulta. O produto abre idêntico offline |
| **Ele está de pé, muitas vezes** | — |

### 2.3 O dispositivo

Desconhecido e variável: **pode ser um computador de escritório, um tablet apoiado na máquina, ou um
celular no bolso do avental.** As três situações são reais e nenhuma é secundária.

**Regra dura:** em tela pequena o produto tem **a mesma capacidade**, reorganizada. Não existe versão
reduzida, não existe função que só aparece em tela grande, e nenhum limiar de segurança ou cálculo
muda por tamanho de tela.

### 2.4 O que ele usa hoje — o concorrente real

Não é outro aplicativo. São dois recursos, e os dois são analógicos:

**1. Uma planilha ou arquivo de texto mantido pela fábrica.** Este é o benchmark de fato, e vale
estudá-lo, porque é o formato que o operador reconhece na primeira olhada:

```
CAB 25 R1,6  100MM   S1900   F6100   INC 0,50   AV/FACA 0,80
CAB 20 R1,6  100MM   S2200   F5000   INC 0,35   AV/FACA 0,75
CAB 16 R1,6   80MM   S2400   F4000   INC 0,30   AV/FACA 0,83
```

Ela entrega os dois números prontos (`S` rotação e `F` avanço), organizada por família de ferramenta,
variando por diâmetro e por comprimento de montagem, sempre com o incremento de profundidade ao lado.

**Por que ela ganha hoje:** foi validada na prática daquela fábrica.
**Por que ela perde:** cobre só o que está tabelado, e atualizar custa
teste real com ferramenta real — por isso ela congela.

**Consequência direta para o desenho: entregar apenas o par rotação/avanço não vende nada.** É o que
ele já tem, de graça, e melhor. O produto só existe por causa do que vem depois do par.

**2. Alguém experiente no turno.** Melhor recurso disponível e mais frágil: depende de estar
presente, devolve o número e não o método, e em material desconhecido também não sabe.

---

## 3. Por que ele abre o produto

### 3.1 As três janelas de decisão — todas antes de rodar

1. Programando com calma, antes de a peça existir na máquina.
2. Recebendo o programa pronto de outra pessoa — e decidindo se confia.
3. No chão, ajustando antes de dar o start.

**Não existe a cena de "máquina parada e o mundo esperando por um número".** Existe janela de ajuste
antes do start, e o que falta nela é uma forma de **testar alternativas rápido, na hora, sem sair de
perto**.

Com a peça já cortando ele só tem dois controles na mão — os potenciômetros de rotação e avanço da
própria máquina. Tudo o mais está congelado no programa. **O produto não atende esse momento.**

### 3.2 Os disparadores

O que faz uma situação sair do padrão da fábrica e pedir cálculo:

| Disparador | Por que sai do padrão |
|---|---|
| Peça diferente | A geometria muda o engajamento |
| Material com dureza fora do esperado | O que chegou não é o que a nota diz |
| Ferramenta montada muito para fora | Balanço longo derruba a rigidez e muda tudo |
| Ciclo longo sem supervisão | Ver 3.3 |
| Meta de produtividade | Ver 3.3 |

### 3.3 Os dois objetivos, opostos e simultâneos

| Objetivo | A cena | O que ele quer |
|---|---|---|
| **"Vou deixar a máquina sozinha"** | Desbaste de 2 horas, ele quer sair de perto | **Previsibilidade.** Não o número ótimo: o número que garante que ele volta e encontra tudo como deixou |
| **"Quero extrair o máximo"** | Iniciativa dele, ou pressão de produção. Aceita conscientemente gastar mais ferramenta em troca de ciclo mais curto | **Agressividade com teto.** Pode desgastar; não pode quebrar no meio |

Os dois são o mesmo pedido de lados opostos: **saber onde está a borda antes de encostar nela.** Um
quer distância da borda, o outro quer chegar perto sem cair. **Nenhum dos dois quer "o número certo"
no abstrato.**

Os dois objetivos coexistem na mesma sessão de uso e o produto atende os dois ao mesmo tempo — não
existe um seletor de intenção.

### 3.4 O que "deu certo" significa para ele

Perguntado como sabe que acertou, ele **não cita valor nenhum**. Cita comportamento:

- a ferramenta corta o que tinha que cortar
- não quebra
- sem barulho excessivo
- sem vibração excessiva
- sem aquecer de forma anormal
- sem gastar antes do previsto

> **Sucesso, para quem usa, não é um número — é a ausência de evento.**

### 3.5 Frequência de uso

**O ciclo entrada → resultado → ajuste → resultado é repetido muitas vezes em uma sessão**, e a
sessão se repete ao longo do dia. Comparar duas ferramentas, dois diâmetros ou dois avanços para a
mesma peça é uso corrente, não exceção.

**Consequência:** qualquer custo de interação é pago em toda repetição, e a comparação entre duas
condições próximas é uma tarefa de primeira classe.

---

## 4. O contrato — o que ele traz e o que leva

**Traz:** o material da peça, a ferramenta que tem na mão, as dimensões dela, o quanto ela está para
fora do porta-ferramentas, e a profundidade de passe que já decidiu. Nada disso ele precisa procurar
— está olhando para a máquina.

**Leva, em ordem de importância declarada por ele mesmo:**

1. **Os dois números prontos** — no formato que ele digita no comando.
2. **O que vai acontecer** se rodar assim — na linguagem dos sinais de 3.4.
3. **O que mexer** para ir para um dos dois lados de 3.3 — com o que se perde escrito junto.

Os itens 2 e 3 são a razão de o produto existir. O item 1 sozinho é a planilha.

---

## 5. Inventário de informação

Este inventário é **completo e fechado**. Tudo que a interface pode mostrar está aqui.

A coluna **peso de decisão** classifica a função do dado, não sua importância visual:

- `TRANSCRITO` — o operador copia este número à mão para outro aparelho. Erro de leitura vira peça errada.
- `CONFERIDO` — ele olha para validar ou desconfiar. Não transcreve.
- `NARRATIVO` — texto que ele lê para entender, não número que ele usa.
- `DIAGNÓSTICO` — informa que algo está fora do esperado.

### 5.1 Entradas — o que o sistema pergunta

| Campo | Natureza | Obrigatório | Volumetria / faixa | Observação de comportamento |
|---|---|---|---|---|
| **Material da peça** | escolha em lista | sim | **12 opções**, agrupadas por 6 classes | É o primeiro filtro: determina quais ferramentas são oferecidas e o valor de partida da velocidade de corte (vc) |
| **Ferramenta** | escolha em lista | sim | **27 entradas**, agrupadas em **17 geometrias** e **4 famílias de usinagem**. Rótulo típico com 30–50 caracteres | A lista depende do material escolhido. Determina quais campos existem abaixo e quais controles fazem sentido |
| **Campos específicos da geometria** | numérico ou escolha | conforme a geometria | **0 a 3 campos**, variando por geometria | Raio de canto, ângulo de posição, ângulo de ponta, passo de rosca, designação de rosca, diâmetro menor, diâmetro inicial e final. **Campo que não se aplica não existe — nunca aparece desabilitado** |
| **Diâmetro da ferramenta (D)** | numérico | sim | 0,2 a 25 mm típico | Passo de 0,01 abaixo de Ø1; 0,1 acima |
| **Balanço (L)** | numérico | sim | 5 a 300 mm | O quanto a ponta se projeta do porta-ferramentas. É a variável que a fábrica tabelou à mão e que o mercado já reconhece como de primeira linha |
| **Número de arestas (Z)** | numérico inteiro | sim, onde se aplica | 1 a 12 | Chega preenchido com o padrão da geometria, e continua editável e visível. **Nunca assumido em silêncio:** errar aqui multiplica ou divide o avanço por um fator inteiro, e o número errado parece plausível |
| **Profundidade de corte (ap)** | numérico | sim, nas famílias de fresamento | 0,05 mm até um teto que depende do diâmetro | Chega com valor de partida. O operador **chega com ela decidida** — não é refinamento |
| **Comprimento de aresta (Lc)** | numérico | **não — opcional** | 0,5 a 200 mm | Preenchido, refina dois limites e um alerta. Vazio, o sistema usa modelo mais conservador e diz que está fazendo isso |

**Teto declarado: no máximo 6 campos por tipo de ferramenta.** Acima disso deixa de ser calculadora e
vira formulário. Este teto é regra do produto, não sugestão.

### 5.2 Constantes do material — dado do sistema que o operador pode substituir

Cinco valores por material. **Todos visíveis e todos editáveis.** Este é um dos pontos mais
distintivos do produto e o desenho precisa levá-lo a sério.

| Dado | Unidade | Peso |
|---|---|---|
| Classe ISO | letra única (P/M/K/N/S/H) | `CONFERIDO` |
| Dureza | HB ou HRC, faixa ou ponto | `CONFERIDO` |
| Força específica de corte (kc1.1) | N/mm², 3–4 dígitos | `CONFERIDO` |
| Expoente (mc) | adimensional, 2 decimais | `CONFERIDO` |
| Faixa de velocidade de corte | m/min, dois números | `CONFERIDO` |

**A razão de eles estarem na tela:** o que produz o número não é o nome do material — são estes cinco
dados. Quem entende isso deixa de procurar "o material certo na lista" e passa a procurar o dado
certo, que é o que o fornecedor da ferramenta publica e entrega direto a quem compra.

**Regras que o desenho precisa acomodar:**

| # | Regra |
|---|---|
| 1 | O valor editado persiste por material, entre sessões — ele digita uma vez o que o fornecedor mandou, e aquele material passa a valer para a oficina dele |
| 2 | Todo valor editado tem caminho de volta ao valor de fábrica, individual, e existe um comando de reverter tudo |
| 4 | Editar recalcula na hora |
| 5 | **O sistema nunca carimba o próprio dado como "estimado".** O valor está na tela; quem quiser conferir, confere. Um selo genérico de estimativa não diz qual número é frágil nem em quanto, e repetido em cinco linhas ensina o operador a ignorá-lo |

### 5.3 Controles de ajuste — valores contínuos

Quais existem depende da família da ferramenta. **De 1 a 3 controles**, nunca mais.

| Controle | Unidade | Precisão | Existe em |
|---|---|---|---|
| Velocidade de corte (vc) | m/min | inteiro | todas as famílias |
| Avanço por dente (fz) | mm/dente | **3 decimais** | fresamento e fresa de rosca |
| Penetração de trabalho (ae) | mm | 0,01 a 0,5 conforme o diâmetro | fresamento |
| Avanço por rotação (fn) | mm/volta | 3 decimais | apenas em duas geometrias específicas |

**Comportamento:**

| # | Regra |
|---|---|
| 1 | Todo controle nasce num valor de partida. Quem não mexe em nada obtém exatamente a recomendação |
| 2 | ~~Todo controle que divergiu do valor de partida tem caminho de volta individual.~~ — **revogado em 30/08/2026 por decisão do Mestre (D1): a caixa de ajuste é apenas a caixa de digitar, sem botão de desfazer no campo.** Existe também um comando único de voltar tudo |
| 3 | **Nenhum limite trava o controle.** Existe uma faixa recomendada, e o operador pode sair dela — digitando, arrastando ou como for. O valor é aceito e o resultado sai. O que muda é o alerta |
| 4 | Nenhum controle empurra outro para satisfazer um alvo. Nenhum corrige em silêncio a condição impossível que outro criou |
| 5 | Em duas geometrias o avanço é imposto pela geometria da rosca e aparece como **leitura**, não como controle |

**Cada controle carrega uma explicação de quatro partes, obrigatória.** Um parâmetro sem os quatro
textos escritos não entra na tela — controle sem explicação é caixa-preta com um botão:

```
Avanço por dente (fz) — mm/dente

O que é       Espessura do cavaco que cada aresta retira em cada passagem.
Ao aumentar   Maior taxa de remoção, mas risco de vibração e quebra da ferramenta.
Ao diminuir   Acabamento mais fino e menor esforço, porém reduz a produtividade.
Equilíbrio    Abaixo de um ponto a aresta deixa de cortar e passa a esfregar —
              a tela avisa quando a espessura de cavaco cai demais.
```

Requisitos desta explicação: alcançável por toque e por teclado, **nunca só por cursor sobre o
elemento**; **legível enquanto o controle correspondente está sendo manipulado**; possível ter mais de
uma aberta ao mesmo tempo, porque ele compara dois parâmetros lendo os dois.

### 5.4 Saídas de comando

Os dois números que vão para a máquina. **`TRANSCRITO`.**

| Grandeza | Unidade | Formato | Faixa típica |
|---|---|---|---|
| **Rotação (n)** | rpm | inteiro | 3 a 5 dígitos |
| **Velocidade de avanço da mesa (vf)** | mm/min | inteiro | 2 a 5 dígitos |

**Os dois são editáveis, e a edição é reversa** — ver 7.3.

### 5.5 Saídas de verificação

Não vão para a máquina. Dizem se o passe é viável e o que está acontecendo na aresta. **`CONFERIDO`.**

| Grandeza | Unidade | Casas | Aparece |
|---|---|---|---|
| Velocidade de corte real (vc) | m/min | 1 | sempre |
| Espessura de cavaco máxima (hex) | mm | **3** | sempre |
| Fator de afinamento de cavaco (CTF) | × | 2 | **só sob uma condição geométrica** — quando não se aplica, some, porque mostrar "1,00×" ocupa espaço para dizer que nada aconteceu |
| Taxa de remoção de material (MRR) | cm³/min | 1 | sempre |
| Potência de corte na aresta (Pc) | kW | 2 | sempre — **com o rótulo "na aresta" obrigatório**, porque fabricantes usam o mesmo nome para grandezas diferentes e o erro é grande |
| Torque (Mc) | N·m | 1 | sempre |
| Relação balanço/diâmetro (L/D) | — | 1 | sempre |
| Altura de crista | µm | 1 | só em geometrias de ponta curva |
| Tempo de furo | min | 2 | só na família furar |
| Furo prévio | mm | 2 | só na família roscar |

**Entre 7 e 8 destas aparecem simultaneamente**, conforme a família.

**Regra:** nenhum resultado visual sem função. Um número só aparece se alimentar uma validação ou uma
decisão. O corolário incomoda mas é necessário: grandeza calculada e não exibida também não deveria
ser calculada.

### 5.6 Previsão de comportamento — `NARRATIVO`

Traduz o que a cadeia de cálculo sabe para a linguagem dos sinais de 3.4. **É a metade do produto
que a planilha da fábrica não tem.**

| Sinal previsto | Grandeza que o nomeia |
|---|---|
| Vai esfregar em vez de cortar, e a aresta morre por falta de carga | espessura de cavaco |
| Vai vibrar | relação balanço/diâmetro |
| Vai exigir força que a aresta pode não aguentar | espessura de cavaco · penetração de trabalho |
| Vai pedir torque alto em rotação baixa | torque |
| Vai aquecer | velocidade de corte real |
| Vai render pouco para o esforço | taxa de remoção · potência de corte |

**Volumetria:** de 0 a 6 sinais simultâneos; **tipicamente 0 a 2**. Cada sinal é uma frase de 1 a 3
linhas, com a grandeza numérica que o disparou dentro do texto.

**Quando nada dispara, o bloco diz isso** — em uma linha, e sem inventar tranquilidade:
`Nada fora da faixa entre as condições verificadas.`

**Regra dura:** só entra condição que o cálculo sustenta, com a grandeza nomeada. Frase genérica sobre
usinagem não entra — ela ensina o operador a ignorar o bloco, que é o oposto do que ele existe para
fazer.

### 5.7 Direção de ajuste — `NARRATIVO`

> *"Faça isso para obter isso, mas perde aquilo."*

É a metade que falta em todo o mercado, e é o pedido explícito do usuário. **No máximo duas direções
por vez** — uma tela com seis caminhos não orienta, paralisa.

Estrutura de cada direção, nesta ordem de conteúdo:

1. **O objetivo, na linguagem dele** — "para a ferramenta durar mais", "para usinar mais rápido".
2. **O verbo de orientação, a grandeza e o alvo numérico** — "aumente a penetração de trabalho para 2,5 mm (hoje 1,0)".
3. **Por que funciona**, em uma ou duas linhas.
4. **O que se perde**, na mesma unidade de leitura — nunca em outro lugar da tela.

Exemplo de conteúdo real, para calibrar tom e comprimento:

```
Para a ferramenta parar de vibrar   (resolve o alerta acima)
  Reduza a penetracao de trabalho (ae), hoje 2,5 mm — o teto
  recomendado para balanco longo e 25% do diametro (2,5 mm).
  A forca radial cai com a secao de cavaco e a deflexao cai com
  ela, sem mexer no balanco que a peca exige. Nao ha valor
  publicado para quanto reduzir: acompanhe no recalculo.
  Em troca: a taxa de remocao cai e a peca leva mais passadas.

Para usinar mais rápido
  Aumente o avanço por dente (fz) para 0,085 mm (hoje 0,060).
  A peça fica pronta antes — cerca de 40% mais material por minuto.
  Em troca: a máquina puxa mais potência e a ferramenta tende a
  vibrar mais com o balanço atual.
```

**Nota de tom, e é uma distinção fina que o desenho precisa carregar:** este é o único lugar do
produto onde o sistema usa verbo de orientação. Em todo o resto ele descreve e não instrui. A razão é
que aqui o operador **pediu** direção; no alerta, o sistema empurra informação que ele não pediu.

**As duas direções coexistem mesmo sem nada errado** — otimizar não depende de estar apanhando. Quando
há alerta ativo, a direção que o resolve tem precedência de conteúdo sobre a outra.

### 5.8 Diagnóstico — `DIAGNÓSTICO`

**Três níveis, e nenhum deles impede o resultado:** `CRÍTICO` > `ATENÇÃO` > `NORMAL`.

O nível diz o quanto o operador precisa olhar antes de dar o start, **nunca se o número aparece** —
ele sempre aparece.

| Nível | Quando | O que significa para quem opera |
|---|---|---|
| **CRÍTICO** | a montagem não realiza o que foi pedido | O número na tela **não descreve a peça que vai sair**. A mensagem diz de quanto o pedido estourou |
| **ATENÇÃO** | condição possível e ruim, de forma nomeada | Executável. O operador decide |
| **NORMAL** | nenhuma condição ativa | Nada fora da faixa **entre as condições verificadas** — o que não é o mesmo que garantia |

**Existem 17 gatilhos possíveis. Apenas um ocupa a linha de alerta por vez** — o mais grave ativo.
Havendo outro, a linha diz que existe, sem detalhá-lo ali.

**Estrutura da mensagem, invariável:**

```
[condição]  —  [grandeza medida] contra [referência]  ([de quanto a distância])
              [o efeito físico, em 1–2 linhas]
```

Exemplo real:

```
ATENÇÃO — relação balanço/diâmetro (L/D) 4,5, acima do limiar de 4,0
          da haste comum (13% acima)
          A ferramenta flete e tende a vibrar: a deflexão cresce com
          o cubo dessa relação, e a 4,5 ela é 42% maior que no limiar.
```

**Regras do diagnóstico que o desenho precisa respeitar:**

| # | Regra | Razão |
|---|---|---|
| 1 | **O alerta descreve o risco e situa o valor — não instrui.** Sem "reduza", "aumente", "divida em passes" | Quem decide como reagir é o operador. O número factual situa sem mandar |
| 2 | **Condição sem grandeza e referência a mostrar não vira alerta** | Ou o sistema descreve a condição com número, ou o que ele tem é opinião — e opinião não ocupa esse lugar |
| 3 | Existe uma quarta natureza, separada: o **erro de digitação** (valor implausível por uma ordem de grandeza). Ele **não move o nível** e é rotulado como validação de entrada, nunca como risco de processo | Dizer "risco de processo" quando o operador digitou um zero a mais ensina que o alerta mente, e o alerta verdadeiro morre junto |
| 4 | Quando nada dispara, o lugar do alerta **não fica vazio** — mostra a condição normal | Área que some e volta faz a tela saltar |
| 5 | **O nível é somente leitura.** Não se arrasta, não se ajusta, não se silencia | Existem infinitas combinações que produzem o mesmo nível; escolher qual mexer é decisão de engenharia do operador |
| 6 | **Cor nunca é o único portador do nível.** Todo estado tem também rótulo e posição | Ambiente com iluminação irregular, e daltonismo |

**Permanente na tela, em todo o inventário:** o texto fixo **o sistema recomenda, o operador decide** — não é aviso legal de rodapé, é a declaração do papel do sistema.

---

## 6. Volumetria e formato — o que dimensiona o desenho

Números concretos, para que o desenho não seja feito para um caso pequeno e quebre no real.

| Dimensão | Valor |
|---|---|
| Materiais na lista | **12**, em 6 classes |
| Entradas de ferramenta na lista | **27**, em 17 geometrias e 4 famílias |
| Comprimento típico do rótulo de uma ferramenta | **30 a 50 caracteres** — exemplo: *"Barra / Cabeçote de Mandrilar — pastilhada, metal duro"* |
| Campos de entrada simultâneos | **5 a 8** (teto de 6 específicos por tipo + os comuns) |
| Controles contínuos simultâneos | **1 a 3** |
| Dados de material visíveis e editáveis | **5** |
| Números de comando | **2** |
| Saídas de verificação simultâneas | **7 a 8** |
| Sinais de previsão simultâneos | **0 a 6**, tipicamente 0 a 2 |
| Direções de ajuste | **0 a 2**, nunca mais |
| Linha de alerta | **1 por vez**, de 17 gatilhos possíveis |
| **Total de números na tela ao mesmo tempo** | **≈ 12 a 15** |
| Maior número exibido | 5 dígitos (rotação e avanço) |
| Maior precisão exibida | 3 casas decimais (espessura de cavaco, avanço por dente) |

**Formato numérico — regras duras:**

| # | Regra | Razão |
|---|---|---|
| 1 | **Unidade sempre junto do número**, nunca só num rótulo distante | Número sem unidade em chão de fábrica é convite a erro de ordem de grandeza |
| 2 | **Casas decimais são propriedade da grandeza**, fixas, e **não ajustáveis pelo operador** | Rotação com três decimais sugere precisão que o modelo não tem; uma casa a menos na espessura de cavaco esconde a informação que decide o alerta |
| 3 | **Dígitos de largura fixa** | O painel se atualiza ao vivo, e dígito que dança quando o valor muda dificulta a leitura |
| 4 | O cálculo trabalha em precisão plena; **arredonda só na exibição** | — |

---

## 7. Comportamento no tempo

### 7.1 O ciclo de cálculo — modelo híbrido

> **O primeiro cálculo é um compromisso consciente. Depois dele, tudo é vivo.**

| Fase | Comportamento |
|---|---|
| **Antes do primeiro cálculo** | Mudar qualquer coisa apenas limpa. **Nenhum número é exibido** |
| **Depois do primeiro cálculo** | Qualquer mudança de entrada, controle **ou** edição de resultado recalcula imediatamente, sem gesto adicional |

O comando de cálculo **nunca some e nunca é desabilitado**. Depois do primeiro uso ele serve de ponto
de retorno para reancorar.

> **Precisado em 09/09/2026 — divergência F da especificação estrutural do painel.** O protótipo,
> que é o contrato, **desabilita** o comando enquanto falta requisito, com o `title` e a linha de
> feedback nomeando o que falta. Isso não contraria a **R1**: a R1 proíbe **recusar um resultado**,
> e antes do primeiro cálculo não existe resultado a recusar — falta entrada. O comando nunca
> desaparece, nunca fica desabilitado com o conjunto completo na tela, e nunca se recusa a entregar
> um número que poderia existir, por absurdo que seja. Some um campo obrigatório depois do cálculo e
> o painel volta ao estado vazio (§7.4 do brief): de novo, não há o que calcular. **O que a R1
> proíbe é o silêncio; aqui o comando diz exatamente o que falta.**


**A razão do estado vazio ser tão duro:** zero calculado apresentado como resultado é a mentira mais
fácil de contar e a mais difícil de detectar. Antes de calcular, nenhum número — nem zero, nem traço
preenchendo o formato.

### 7.2 Estados

| Estado | Comportamento |
|---|---|
| **Vazio** | Nenhum número, nenhum indicador, nenhum horário. Uma chamada curta orienta a ação |
| **Desatualizado** | Entre a mudança e o resultado novo, **os números** ficam marcados como desatualizados. **O alerta e o nível de segurança não** — esmaecer alarme ativo é o oposto do que um painel industrial deve fazer |
| **Crítico** | Mostra a razão, o valor medido e a referência — **e o resultado continua na tela, com a edição viva** |

**Não existe estado "estimado".** Ver 5.2, regra 5.

**Movimento:** comunica mudança de estado, nunca decora. A transição para condição crítica é mais
insistente que para condição segura; a chegada de resultado novo precisa ser perceptível sem que o
operador procure o que mudou; e a preferência do sistema por movimento reduzido zera todas as
animações, com a informação passando a ser transmitida só por estado e rótulo.

### 7.3 Reversibilidade — a calculadora é bidirecional

**O operador edita os dois números de comando diretamente, e o sistema recalcula tudo para trás.** Não
é um relatório.

| Ele edita | O sistema deduz |
|---|---|
| Rotação | a velocidade de corte correspondente, e recalcula avanço, remoção, potência, torque, índices |
| Avanço da mesa | o avanço por dente correspondente, e recalcula remoção, potência, torque, índices |

**Precedência:** valor que o operador fixou **não se move sozinho**. Se ele fixou a rotação, o avanço é
recalculado a partir dela. Se fixou os dois, os dois permanecem. Se um valor fixado deixar de ser
alcançável porque outro dado mudou, ele **é mantido e sinalizado**, com a informação do que seria
preciso para chegar lá — nunca solto em silêncio.

**O que não é reversível:** nada além destes dois. Arrastar um índice consolidado para um valor
desejado é um problema sem solução única — existem infinitas combinações de parâmetros que produzem o
mesmo índice, e escolher qual mexer é a decisão de engenharia que pertence ao operador.

### 7.4 Reação a mudança de contexto

Situações reais e frequentes, porque comparar duas condições é uso corrente:

| Situação | Comportamento exigido |
|---|---|
| Ele troca o material depois de calcular | Recalcula. A lista de ferramentas é refiltrada; se a ferramenta ativa deixar de ser oferecida, o sistema move para outra e **diz o que mudou** |
| Ele troca a ferramenta | Recalcula. A geometria compatível já digitada é **preservada** e revalidada, com aviso do que precisou mudar. Zerar puniria justamente quem está comparando duas ferramentas |
| Ele tinha valores manuais e troca de ferramenta **dentro da mesma família** | Os valores **permanecem** |
| Ele tinha valores manuais e troca **de família** — fresa para broca, macho, barra | Os valores **voltam à região recomendada da família nova**, e a tela diz que foram reajustados. São grandezas com significado diferente |
| Um campo obrigatório fica vazio depois do primeiro cálculo | O resultado é limpo e volta ao estado vazio, com o campo sinalizado |
| Um campo recebe valor inválido | O resultado **anterior é mantido**, marcado como desatualizado, e o campo é sinalizado. Limpar tudo por erro de digitação faz ele perder o resultado bom que tinha |
| Ele muda algo enquanto o cálculo anterior ainda roda | O cálculo em andamento é descartado. Ele espera ver o efeito do último gesto, não do penúltimo |
| Trocar a ferramenta muda quais campos existem | Os campos novos não podem entrar no cálculo sem ninguém ter olhado para eles |

---

## 8. Regras invioláveis

Qualquer desenho precisa satisfazer todas. Cada uma tem razão registrada.

| # | Regra | Razão |
|---|---|---|
| **R1** | **Nada trava, nada bloqueia, nada é recusado.** Não existe estado em que o sistema se recuse a calcular. Nenhum controle para num limite. Nenhum valor é truncado ou ajustado em silêncio | É uma calculadora, e a função de uma calculadora é entregar o resultado — por mais absurdo que seja. Recusar transfere ao operador a única coisa que ele não pode fazer: descobrir sozinho o tamanho do erro |
| **R2** | **Como não existe trava, também não existe gesto de "liberar" nem marca de "forçado"** | Nada estava preso, logo nada é forçado |
| **R4** | **Antes do primeiro cálculo, nenhum número** — nem zero, nem traço preenchendo o formato | Zero calculado exibido como resultado é indistinguível de um resultado real |
| **R5** | **Todo elemento visível precisa mudar algo que o operador lê.** Campo que não entra em conta, indicador que não alimenta decisão, número exibido por completude — nada disso entra | Ruído treina o operador a ignorar a tela, e aí o sinal verdadeiro morre junto |
| **R6** | **Nenhum valor de partida é assumido em silêncio quando errar por um fator inteiro é possível** | Um número errado por fator dois **parece plausível**: está na ordem de grandeza certa, e nada indicaria o erro |
| **R7** | **Alerta ativo nunca é esmaecido, silenciado ou adiado** — nem durante recálculo | Esmaecer alarme ativo é o oposto do que um painel industrial deve fazer |
| **R8** | **Cor nunca é o único portador de significado.** Todo estado tem também rótulo e posição | Iluminação irregular, daltonismo |
| **R9** | **Alvo de interação generoso em tudo**, inclusive nos gatilhos de ajuda. **Cursor sobre o elemento nunca é o único caminho** para uma informação ou ação | A tela é tocada em pé, na máquina, muitas vezes com toque impreciso — o operador pode estar usando o dedo, o teclado ou o ponteiro |
| **R10** | **Tudo que se faz com o ponteiro se faz pelo teclado**, incluindo abrir ajuda e ajustar valores contínuos. Foco visível em todo elemento alcançável | — |
| **R11** | **Zero dependência de rede em tempo de uso** — nem fonte, nem ícone, nem tabela, nem consulta | A oficina pode não ter conexão. Um produto que muda de aparência conforme a conexão destrói a confiança que levou meses para construir |
| **R12** | **Contraste suficiente para oficina com iluminação irregular** | — |
| **R13** | **Tela pequena tem a mesma capacidade, reorganizada** — nunca uma versão reduzida, nunca cálculo ou limiar simplificado | — |
| **R14** | **Nenhum elemento visual pode sugerir precisão maior que a que o cálculo tem** | Falsa precisão é o defeito que o produto existe para não repetir |
| **R15** | **Nada é ultrapassado em silêncio.** O operador pode ir a qualquer lugar, mas sempre com a condição nomeada | O sistema recomenda, o operador decide — e informa |

---

## 9. Tensões de design — o que você precisa resolver

**Estas são as tensões reais do produto, e nenhuma tem resposta neste documento.** Resolvê-las é o
trabalho. Foram deixadas abertas de propósito.

| # | Tensão |
|---|---|
| **T1** | **Densidade contra velocidade.** São 12 a 15 números, 5 a 8 campos, 1 a 3 controles, dois blocos de texto e uma linha de diagnóstico — para uma pessoa que repete o ciclo dezenas de vezes por dia, com a máquina rodando ao lado, e que precisa ler de relance. Nada disso pode sair (R5 já eliminou o supérfluo) |
| **T2** | **Dois números transcritos entre doze conferidos.** Dois valores serão copiados à mão para outro aparelho e um erro de leitura vira peça errada. Os outros dez a treze existem para desconfiança e validação. Como a tela distingue as duas funções sem transformar o resto em segunda classe — sendo que a espessura de cavaco, que não é transcrita, dispara o alerta mais importante do produto? |
| **T4** | **Texto narrativo convivendo com grade numérica.** A previsão de comportamento e a direção de ajuste são **prosa** — frases de 1 a 4 linhas em linguagem de chão de fábrica. Todo o resto é numérico e tabular. Os dois blocos de prosa são a razão de o produto existir, e ainda assim o par de números é o que ele reconhece na primeira olhada |
| **T5** | **Precisão fina com a mão grossa.** Ele ajusta um valor com três casas decimais, possivelmente em pé, possivelmente num celular. Digitar e arrastar têm ergonomias opostas aqui, e os dois precisam funcionar |
| **T6** | **Explicação lida durante a manipulação.** A ajuda de quatro partes precisa estar visível *enquanto* o controle correspondente está sendo mexido, e mais de uma pode estar aberta ao mesmo tempo porque ele compara dois parâmetros lendo os dois |
| **T7** | **Valor absurdo aceito sem parecer erro.** R1 manda aceitar qualquer valor e entregar o resultado. Mas visualmente, "aceito com alerta crítico" e "campo com erro de digitação" e "campo inválido" são três coisas diferentes que o operador precisa distinguir imediatamente — e a terceira nem move o nível de segurança |
| **T8** | **O que é conferido a cada uso e o que não é.** Parte das entradas muda a cada cálculo (diâmetro, avanço); parte permanece por horas (material, constantes do material). O que não está sendo revisto ainda precisa ser conferível de relance, porque calcular com um material errado que ficou de ontem é o pior resultado possível |
| **T9** | **A mesma capacidade em três tamanhos de tela.** Computador, tablet e celular são todos cenários reais e nenhum é secundário. R13 proíbe cortar função |
| **T10** | **Campos que aparecem e somem.** Trocar a ferramenta muda quais campos existem — não desabilita, faz existir ou deixar de existir. A tela se reconfigura sob a mão do operador, e ele precisa perceber que isso aconteceu sem perder o lugar |
| **T11** | **Dois objetivos opostos, sem seletor.** "Quero previsibilidade" e "quero extrair o máximo" convivem na mesma tela ao mesmo tempo, sem que o operador declare qual dos dois quer |
| **T12** | **A comparação entre duas condições é uso corrente.** Trocar um diâmetro e ver o que muda, comparar duas ferramentas na mesma condição. O produto tem um resultado por vez — e mesmo assim precisa servir a esse uso |

---

## 10. Critérios de sucesso do design

O desenho está certo quando estas afirmações são verdadeiras. Elas são o teste de aceitação.

| # | Critério |
|---|---|
| **C1** | Um operador que nunca viu o produto chega ao primeiro resultado **sem que ninguém explique nada** e sem ler documentação |
| **C2** | Quem não mexe em nada obtém exatamente a recomendação — o primeiro resultado é utilizável sem configuração |
| **C3** | O próximo passo é evidente em cada momento, sem indicação explícita |
| **C4** | Os dois números que vão para a máquina são lidos **sem chance de confusão entre si** e sem erro de ordem de grandeza |
| **C5** | Em uma leitura, ele sabe se pode dar o start — e, se não pode, por quê |
| **C6** | Ele sabe **para onde mexer** e o que perde ao mexer, sem precisar interpretar |
| **C7** | Quem usa **aprende o domínio ao usar**, sem ter vindo estudar |
| **C8** | Ele age sobre o número **sem precisar conferir por fora** |
| **C9** | Mudar uma entrada e ver o efeito é rápido o bastante para que **comparar alternativas seja natural**, não custoso |
| **C10** | Nada na tela é ignorado com o tempo. Se um elemento vira ruído após uma semana de uso, ele estava errado |
| **C11** | O que a cor, o ícone ou o aviso significam é claro **sem legenda** |
| **C12** | O produto abre idêntico offline |

---

## 11. Vocabulário obrigatório

Os nomes técnicos são **longos de propósito** e não podem ser encurtados, substituídos por termo
leigo, nem reduzidos ao símbolo sozinho. A convenção é **nome por extenso seguido do símbolo entre
parênteses**, e o par educa o operador ao longo do uso — que é um objetivo declarado do produto (C7).

| Termo na tela | Símbolo | Unidade |
|---|---|---|
| Rotação | n | rpm |
| Velocidade de avanço da mesa | vf | mm/min |
| Velocidade de corte | vc | m/min |
| Avanço por dente | fz | mm/dente |
| Avanço por rotação | fn | mm/volta |
| Profundidade de corte | ap | mm |
| Penetração de trabalho | ae | mm |
| Diâmetro da ferramenta | D | mm |
| Balanço | L | mm |
| Comprimento de aresta | Lc | mm |
| Número de arestas | Z | — |
| Espessura de cavaco máxima | hex | mm |
| Fator de afinamento de cavaco | CTF | × |
| Taxa de remoção de material | MRR | cm³/min |
| Potência de corte na aresta | Pc | kW |
| Torque | Mc | N·m |
| Relação balanço/diâmetro | L/D | — |
| Força específica de corte | kc1.1 | N/mm² |
| Expoente | mc | — |
| Altura de crista | — | µm |

**Famílias de usinagem, exatamente estes quatro nomes:** Fresar · Furar · Roscar · Mandrilar.

**Níveis de diagnóstico, exatamente estes três nomes:** CRÍTICO · ATENÇÃO · NORMAL.

**Nomes que estão proibidos no produto**, porque nomeiam conceitos que foram retirados:
"estimado" · "forçado" · "modo rápido" · "modo detalhado" · "camada 1" / "camada 2" ·
"desbaste / semi-acabamento / acabamento" como escolha do usuário · **"extrapolado"** e
**"editado"** como marca de origem do resultado (30/08/2026 — a procedência saiu do produto, essas
marcas morreram junto com a tela de procedência).

> **"manual" não entra nesta lista.** "valor manual" / "valores manuais" continua nomeando um
> controle que divergiu da recomendação (§7.4) — é comportamento, não marca de procedência. O que foi
> retirado foi só a marca Partida/Manual do campo profundidade de corte (ap).

---

## 12. Anti-requisitos — o que não existe, e por quê

Não desenhe nada disto. Cada ausência é deliberada e tem razão registrada. **Várias são coisas que
parecem naturais numa calculadora industrial** — por isso a lista existe.

| Não existe | Por quê |
|---|---|
| **Perfil de máquina** — rotação máxima, potência, torque, avanço máximo, rendimento | São propriedades do ambiente de quem usa, não do cálculo. Exigi-los transforma calculadora em configurador. **Consequência direta: nenhum número tem "% do limite", nenhum medidor tem escala com um teto, e não existe leitura de "sobra"** — não há limite declarado contra o qual medir |
| ~~**Fator de segurança**~~ | ~~Só faz sentido comparado a um limite de máquina, que não existe aqui~~ — **revogado em 01/09/2026 por decisão do Mestre: o fator de segurança ENTRA no MVP.** A razão de então não se sustentou: ele não mede contra limite nenhum — é uma **lente de exibição** sobre o resultado do cálculo, e por isso funciona sem perfil de máquina. Ver o quadro abaixo |
| **Seletor de tipo de operação** — desbaste, semi-acabamento, acabamento | Desbaste e acabamento são o que o operador está fazendo, não atributo do cálculo. A agressividade se ajusta nos controles que já estão na tela |
| **Índice de saúde, nota de 0 a 100, semáforo com escala contínua** | Não existe fórmula com fonte para consolidar grandezas de naturezas diferentes num número só. Um índice assim é o tipo de número que o operador aprende a ignorar |
| **Medidores em forma de ponteiro ou barra proporcional** | Não acrescentam informação que o número já não dê, e sugerem uma escala com teto que não existe (ver perfil de máquina) |
| **Previsão de vida da ferramenta em número ou percentual** | O expoente que a governa não foi encontrado em fonte confiável em duas rodadas de pesquisa. Sem ele não existe percentual honesto. **A previsão entra qualitativa** (5.6). Isto foi pedido por um usuário real e mesmo assim não entra |
| **Deflexão em micrômetros** | Depende de constantes que não fecharam. O produto entrega a relação balanço/diâmetro e o alerta, não o número em micrômetros |
| **Campo ou fator de revestimento de ferramenta** | Cinco multiplicadores foram procurados em dois territórios independentes e não existem publicados, cinco de cinco. Fator que não move o resultado além da margem do modelo não entra |
| **Um controle único de "agressividade"** que move vários parâmetros juntos | Fora deste corte. Quando entrar, entra com o vetor de movimento declarado |
| **Histórico, favoritos, biblioteca de ferramentas, conta de usuário** | Fora deste corte. Vêm depois do núcleo |
| **Copiar o resultado** | Exigiria decidir entre dois formatos com usos diferentes, e um resultado copiado sem contexto não é interpretável depois. Entra quando o uso mostrar qual é o real |
| **Exportar, relatar, imprimir, comparar fabricantes** | Não é o job. Ele lê e digita |
| **Onboarding, tour, tutorial, tela de boas-vindas** | Ele não vai ler, e C1 exige que não precise |
| **Qualquer campo que não mude um número na tela** | R5 |
| **Aviso quando a penetração de trabalho é baixa** | Trabalhar com penetração pequena é **estratégia recomendada**, não anomalia. O risco real é outro, e já tem gatilho próprio |
| **Uma faixa universal de velocidade de corte** | Não existe. A amplitude legítima cobre cerca de 600× entre extremos; a comparação é sempre relativa ao par material × ferramenta |
| **Uma referência fixa de produtividade** | Duas operações igualmente legítimas variam por fator 38×. Um medidor assim não mede produtividade: mede diâmetro |

> **Override — decisão escrita do Mestre, 01/09/2026: o fator de segurança sai desta lista.** Este
> brief não é reescrito por causa disso; a linha acima fica riscada e esta nota é o registro, mesmo
> tratamento dado a `histórico` e `favoritos` em 30/08.
>
> ⚠ **Esta nota foi corrigida no mesmo dia.** A primeira redação descrevia uma margem que *inflava a
> previsão de esforço*, com padrão `+0 %` e efeito só sobre potência e torque. **O modelo é outro.**
>
> **O que ele é: uma lente de exibição.** Um ajuste único e persistente, em **`% do valor
> calculado`**, aplicado **por último**, sobre os números de resultado que a tela mostra. O que o
> desenho precisa saber:
>
> - Na tela ele se chama **margem de segurança** e aparece em **`% do calculado`** — `100 %`, `85 %`.
>   Nunca multiplicador (`0,85×`) nem porcentagem com sinal (`−15 %`).
> - **Padrão de fábrica `100 %`:** a tela mostra o resultado exatamente como o cálculo o entrega. A
>   `85 %`, todo número de resultado aparece a 85 % do calculado, sempre, até o operador mudar.
> - **Não é limitador.** Não trava, não bloqueia, não recusa. **Acima de `100 %` é permitido** — a
>   tela mostra mais que o calculado, e a decisão é do operador (R1).
> - O controle é **campo numérico ou passo `±`**, do mesmo tipo dos `±` de rotação e avanço.
>   **Não é cursor deslizante nem barra:** barra proporcional é proibida por **R14** e sugeriria uma
>   escala com teto que não existe — o mesmo motivo pelo qual não há medidor nesta tela.
> - **Mora na área "Configurações"**, não na tela de cálculo: é configuração persistente da oficina,
>   não decisão de cada passe. O painel principal só mostra o valor **quando difere de `100 %`**.
> - **Escala** rotação, avanço da mesa, velocidade de corte real, potência de corte, torque e taxa de
>   remoção. **Não escala** o que o operador digitou, nem as grandezas que disparam alerta —
>   espessura de cavaco, relação balanço/diâmetro, afinamento de cavaco.
> - **O alerta e o nível de segurança nunca acompanham a lente.** Eles descrevem o físico real. Um
>   alerta que se movesse com ela seria a lente virando limitador de segurança, que é o que ela não é.
>
> **Não confundir com o "controle único de agressividade"**, que continua proibido logo acima: aquele
> move os parâmetros de corte uns sobre os outros e muda **o que se executa**; este não toca em
> parâmetro nenhum e tem padrão neutro. O ajuste de cada parâmetro continua individual e no mesmo
> lugar. **Decisão do Mestre, 01/09/2026** — onde o texto tratar a lente como agressividade proibida,
> a decisão revoga.
>
> **O que continua proibido, e não muda:** perfil de máquina, potência de máquina, "% do limite" e
> leitura de "sobra". A lente é uma porcentagem **do próprio cálculo**, não de uma capacidade — não
> existe limite declarado contra o qual medir.

---

## Apêndice — o que foi omitido deste brief, e por quê

Registrado para transparência com quem encomendou o documento.

| O que foi omitido | Por quê |
|---|---|
| **Toda decisão de layout já tomada internamente** — arranjo de áreas, zonas de resultado, ordem de leitura, agrupamento de campos, mecanismo de colapso, posição de comandos, tratamento de destaque | É exatamente o viés que este documento existe para não transmitir. Onde uma dessas decisões tinha uma razão legítima por trás, **a razão foi preservada como requisito e a decisão foi descartada** |
| **O corpus de dados técnicos** — tabelas de constantes por material, faixas de velocidade, curvas de avanço por diâmetro, tabela de roscas | O desenho precisa de volumetria e formato, não do conteúdo. A seção 6 entrega a volumetria |
| **As fórmulas da cadeia de cálculo** | Não afetam a interface. O que afeta é qual grandeza sai, com que unidade e quantas casas — está na seção 5 |
| **A lista nominal dos 12 materiais e das 17 geometrias** | Só a contagem e o comprimento típico do rótulo importam para dimensionar a tela |
| **A tabela completa dos 17 gatilhos de alerta** | O desenho precisa saber que são 17, que só um aparece por vez, e qual a estrutura invariável da mensagem — tudo em 5.8 |
| **Tecnologia, arquitetura e plano de construção** | Não são insumo de desenho |
