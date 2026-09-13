# R8 — Furação, roscamento e mandrilamento

**Fecha as questões abertas:** Q5 (`fn` de partida) · Q6 (espessura de cavaco em furação) · Q8
(velocidade de corte no macho) · Q9 (taxa de remoção em mandrilamento).
**Origem:** `construcao/QUESTOES_ABERTAS_CONSTRUCAO.md`, commits `d8beded` e `341cae2`.
**Vale rodar em par cego** — três das quatro questões são dado numérico de catálogo.
**Salve o retorno como:** o caminho que o seu briefing indicar.

---

═══════════════════════════════════════════════════════════════════

# MISSÃO

Você vai fechar quatro lacunas numéricas de uma calculadora de parâmetros de corte CNC. As quatro
foram descobertas ao desenhar as telas de **furação, roscamento e mandrilamento**: a documentação do
produto cobre fresamento com solidez e, fora dele, a cadeia de cálculo não fecha — falta o avanço de
partida, falta a fórmula de espessura de cavaco, falta a regra de velocidade para macho, falta a
fórmula de remoção do mandrilamento.

## Contexto do produto

- **Usuário:** operador e programador de CNC em oficina brasileira de usinagem e ferramentaria.
- **O que a calculadora faz:** recebe material, ferramenta e montagem, e devolve **dois números de
  comando** — rotação e avanço da mesa — mais um conjunto de saídas de verificação.
- **Postura:** o sistema entrega um **ponto de partida**, nunca uma prescrição. Margem de erro
  declarada do modelo: ±15–25%.
- **Famílias em jogo nesta rodada:** furar (broca helicoidal, broca de insertos/U-drill, broca de
  centro, escareador, alargador) · roscar (macho de corte, macho de conformação, fresa de rosca) ·
  mandrilar (barra e cabeçote).
- **Substratos:** metal duro (MD) e aço rápido ao cobalto (HSS-Co).
- **Material dominante do exemplo:** aço 1045, classe ISO P, 170–220 HB. Interessa também aço
  ferramenta temperado, inox austenítico, alumínio e ferro fundido.

## O QUE "RESPONDIDO" SIGNIFICA AQUI — leia antes de começar

**Valor típico com a faixa em volta é resposta aceita, e é o formato preferido.** O produto deixa o
usuário editar cada um desses números na área de Configurações, para ajustar à ferramenta e à máquina
da oficina dele. Não estamos atrás do número verdadeiro universal, que não existe: estamos atrás de
**um ponto de partida defensável, com fonte, e a faixa de dispersão que as fontes mostram.**

Isso não afrouxa a regra de fonte. Continua valendo: número sem fonte citável não entra. O que muda é
que **faixa não é fracasso** — é o resultado esperado, desde que declarada como faixa e não disfarçada
de precisão.

## REGRAS DE RESPOSTA — obrigatórias

1. **Não invente número.** Sem consenso, entregue a **faixa** e a dispersão entre fontes.
2. **Cada número precisa de fonte citável**, dentro do território que o seu briefing definiu.
3. **Etiquete a confiança de cada linha:** `CONSENSO` · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` ·
   `NÃO ENCONTRADO`. Confiança por linha, nunca por tabela.
4. **Declare as condições junto com o número.** Um avanço sem diâmetro, material, substrato e
   refrigeração declarados não é dado, é boato.
5. **Prefira a regra à tabela.** Se o avanço de partida da broca é uma fração declarada do diâmetro,
   entregue a fração e a fonte, não vinte linhas de tabela.
6. **Diga quando um valor for perigoso**, com a consequência quantificada.
7. **Priorize a prática de oficina brasileira** onde houver divergência regional, mas registre a
   divergência em vez de apagá-la.

---

# QUESTÃO 1 — Avanço por rotação (`fn`) de partida na furação

A documentação do produto classifica o `fn` como decisão de projeto, mas **não traz o número**, e se
contradiz sobre a natureza dele: uma seção o descreve como valor tabelado por tipo de broca, outra o
descreve como derivado por fórmula. Nenhuma das duas está escrita.

**Responda:**

- **1.1** O `fn` de partida da **broca helicoidal** é regra sobre o diâmetro (do tipo `fn = k × D`) ou
  tabela por faixa de diâmetro? Se for regra, qual é o `k` e para que condição vale. Entregue para MD
  e para HSS-Co, nos materiais listados no contexto.
- **1.2** Os mesmos valores para **broca de insertos (U-drill)**, **broca de centro/spot**,
  **escareador** e **alargador**. Onde a família não tiver dado publicado, declare lacuna.
- **1.3** Como o `fn` de partida deve variar com a **relação profundidade/diâmetro** do furo. Existe
  fator de redução publicado para furo profundo? A partir de que relação?
- **1.4** Qual é a **faixa de segurança** em torno do `fn` de partida — quanto o operador pode se
  afastar antes de risco real, e qual o modo de falha em cada extremo (lascamento na aresta em avanço
  alto; encruamento e atrito em avanço baixo).

# QUESTÃO 2 — Espessura de cavaco em furação, a que entra no modelo de força

O motor de cálculo do produto usa Kienzle, e a espessura de cavaco é a entrada que define a força
específica. A fórmula implementada é a de **fresamento** — espessura média integrada sobre o arco
engajado, com `sinκ` e a razão penetração/diâmetro. **Furação não tem penetração de trabalho radial**,
então essa fórmula não se aplica, e sem espessura não há força, potência nem torque.

**Responda:**

- **2.1** Qual é a espessura de cavaco **não deformada** na furação com broca helicoidal, em função do
  avanço por rotação, do número de arestas e do **ângulo de ponta**. Entregue a fórmula, não só o
  conceito, e diga qual símbolo cada fonte usa.
- **2.2** O **ângulo de ponta** entra nessa fórmula como ângulo de posição (`κ`)? Se sim, é o ângulo
  de ponta inteiro ou a metade dele? Esta é a questão central da rodada: o produto tem o campo do
  ângulo de ponta na tela e hoje ele não alimenta nada.
- **2.3** Essa espessura é a que deve entrar no **Kienzle** para furação, ou a literatura usa outra
  entrada? Se houver mais de uma prática, entregue as duas com a divergência declarada.
- **2.4** O limite inferior de validade do Kienzle em fresamento é `h < 0,1 mm`, abaixo do qual o par
  de constantes deixa de valer. **Esse mesmo limite vale para furação?** Se valer, com avanço de
  partida típico e broca comum, a espessura calculada cai abaixo dele? Quantifique.
- **2.5** Como se calcula **torque e potência** em furação, se a resposta de 2.3 for que o Kienzle não
  se aplica. Entregue a fórmula alternativa com fonte.

# QUESTÃO 3 — Velocidade de corte no roscamento com macho

Aqui há um defeito conhecido e é o motivo desta rodada existir. A regra do produto manda multiplicar a
velocidade de corte do material por um fator do substrato da ferramenta. Aplicada ao macho, ela
entrega **140 m/min num macho M8 em aço 1045 — cerca de 5.570 rpm.** O produto não tem hoje nenhum
alerta que barre esse número, porque o alerta existente mede o afastamento do operador em relação ao
valor de partida, e aqui o valor **é** o de partida.

**Responda:**

- **3.1** Qual é a velocidade de corte praticada em **roscamento com macho de corte**, por material e
  por substrato (HSS-Co e MD), em m/min. Faixa com fonte.
- **3.2** A mesma coisa para **macho de conformação** (roscamento por deformação), que tem cinemática
  diferente. E em que materiais ele é contraindicado.
- **3.3** A velocidade de roscamento se **deriva** da velocidade de fresamento do mesmo material por
  algum fator publicado, ou é tabela própria e independente? Esta é a pergunta que decide o desenho do
  produto: existe fator por família, ou a família tem tabela própria?
- **3.4** Que **limite de rotação** o roscamento impõe por razões que não são de corte — sincronismo do
  eixo-árvore, inversão de rotação na saída, comprimento roscado. Se houver teto prático de rotação
  publicado, entregue.
- **3.5** O avanço no roscamento é **travado no passo da rosca** (`vf = P × n`), sem grau de liberdade.
  Confirme ou corrija, e diga se existe correção usada na prática (alívio de passo, compensação de
  macho flutuante) que quebre essa igualdade.

# QUESTÃO 4 — Taxa de remoção de material em mandrilamento

A documentação traz a fórmula de taxa de remoção para fresamento e para furação, e **não traz para
mandrilamento**. Sem ela a tela do mandrilamento perde uma das saídas de verificação.

**Responda:**

- **4.1** A fórmula de taxa de remoção em mandrilamento, em cm³/min, a partir do diâmetro inicial, do
  diâmetro final, do avanço por rotação e da rotação. Com fonte.
- **4.2** Se a literatura tratar o mandrilamento como caso particular de torneamento interno, diga
  isso explicitamente e entregue a fórmula do torneamento com a adaptação.
- **4.3** A profundidade de corte no mandrilamento é metade da diferença entre os dois diâmetros.
  Confirme ou corrija, e diga se há convenção divergente.

---

# FORMATO DO RETORNO

Uma seção por questão, na ordem. Dentro de cada uma, uma subseção por item. Tabela onde houver mais de
três números; prosa curta onde for regra ou fórmula.

Feche com duas listas:

- **LACUNAS** — o que o seu território não tem, com a fonte que teria o dado nomeada.
- **O QUE ME SURPREENDEU** — qualquer número que contrarie o que o enunciado afirma como verdade, ou
  que você esperaria diferente. É onde costuma estar o defeito que ninguém procurava.
