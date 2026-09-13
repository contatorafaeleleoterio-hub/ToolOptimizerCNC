# E0 — Princípio da Calculadora Agnóstica

**O que é este documento:** a decisão de arquitetura de produto que governa o que o sistema entrega por padrão, do que ele se recusa a depender, e em que ordem a complexidade aparece. Ele antecede os demais documentos de escopo: onde outro documento conflitar com o que está aqui, **este vence**.

**Origem:** decisão do dono do produto, 20/08/2026. **Reescrito em 26/08/2026** para separar dois eixos que a versão anterior chamava pelo mesmo nome, e para fechar os conflitos e perguntas que ela deixou em aberto.

---

## 1. A decisão

**O sistema é, antes de tudo, uma calculadora. Por padrão ela não tem limitações e entrega o resultado, seja ele qual for.**

A calculadora nasce **agnóstica**: sem vínculo com limite de máquina, sem vínculo com ferramental específico, sem qualquer limitador que seja variável de ambiente. O resultado do cálculo é entregue sempre.

**A razão:** limite de máquina, torque disponível, avanço máximo e rotação máxima são propriedades **do ambiente e do ferramental de quem usa** — não são propriedades do cálculo. Amarrar o cálculo a eles por padrão obriga todo usuário a declarar um ambiente antes de obter um número, e transforma uma calculadora em um configurador.

---

## 2. Dois eixos, não duas camadas

> **Correção de 26/08/2026.** A versão anterior falava em "camada 1" e "camada 2". O nome era ambíguo: chegou a designar três coisas diferentes em três documentos. **"Camada 2" sai do vocabulário do projeto.** Onde ele aparecer em documento antigo, resolva pela tabela abaixo.

O sistema tem **dois eixos independentes**. Eles não competem e não se ordenam entre si — uma posição em um não determina a posição no outro.

| Eixo | Pergunta que ele responde | Posições |
|---|---|---|
| **Eixo de dependência** | *De que o resultado depende?* | **Núcleo agnóstico** → **Ambiente declarado** |
| **Eixo de profundidade** | *Quantas variáveis o operador declara?* | **Entrada mínima** → **Entrada completa** |

**Por que são independentes:** é perfeitamente coerente declarar poucas variáveis e nenhum ambiente (o uso corrente na máquina), declarar todas as variáveis e nenhum ambiente (verificar um parâmetro novo sem estar amarrado a uma máquina), ou declarar todas as variáveis e o ambiente (planejar para uma máquina específica). Tratar isso como uma escada única força combinações que não existem no uso real.

### 2.1 Tradução do vocabulário antigo

| Termo antigo | O que ele queria dizer | Termo novo |
|---|---|---|
| "camada 1" | a calculadora que abre pronta, sem configuração | **Núcleo agnóstico** |
| "camada 2", em `E0` e no MVP | limites de máquina, torque, avanço e rotação máximos | **Ambiente declarado** |
| "camada 2", no JTBD | modo rápido × modo detalhado | **Eixo de profundidade** |
| "modo rápido" | *ambíguo — ver a nota abaixo* | **Entrada mínima** |

> ⚠️ **"Modo rápido" também está sobrecarregado.** Existe um modo rápido especificado (`E5` §7) com quatro entradas, e um modo rápido descrito na entrevista de campo com cinco entradas — e só duas coincidem. **Este documento define o eixo; ele não define quais campos ficam na entrada mínima.** Esse é o corte do primeiro produto, e pertence ao documento de MVP.

---

## 3. O eixo de dependência

### 3.1 Núcleo agnóstico — o que sempre existe

A calculadora que abre pronta para usar, com **o menor atrito possível** de opções, e que não depende de nada que o operador precise declarar sobre a máquina dele.

| Atributo | O que significa na prática |
|---|---|
| **Eficiente** | o caminho da entrada ao resultado é o mais curto possível |
| **Rápida** | o resultado aparece sem espera perceptível |
| **Precisa** | o número entregue é o número correto para o que foi informado |
| **Dinâmica** | responde à mudança de entrada sem exigir reinício |
| **Fácil de usar** | não exige treinamento nem leitura prévia |
| **Auto-intuitiva** | o próximo passo é evidente sem que ninguém explique |
| **Explicativa** | mostra o que cada parâmetro faz e o efeito de mexer nele |
| **Educativa** | quem usa aprende o domínio ao usar, sem ter vindo estudar |
| **Enxuta** | nada na tela que não sirva ao resultado |
| **Confiável** | o operador pode agir sobre o número sem conferir por fora |
| **Didática nos indicativos** | o que a cor, o ícone ou o aviso significam é claro sem legenda |
| **Situa o valor** | quando algo está fora do bom, diz **onde o valor está** — a grandeza, a referência e de quanto a distância —, não só que está errado. Não instrui o que fazer (bloco de decisão, 27/08/2026) — isso é o indicador; a direção sob pedido vive no painel *"o que mexer"* (E4 §6) |
| **Clara** | uma leitura basta |

### 3.2 Ambiente declarado — o que o operador liga quando quiser

Tudo o que depende da realidade de chão de fábrica de cada usuário vive aqui, **separado e explícito**, e é o operador quem ativa.

| Item | Por que depende do ambiente |
|---|---|
| **Limites de máquina** — rotação máxima (n), torque (Mc), avanço máximo (vf), potência | São propriedades do equipamento de quem usa, não do cálculo |
| **Rendimento do acionamento (η)** | Sem ele não existe potência no motor, só potência de corte (Pc) na aresta |
| **Demais limitadores de ferramental e fixação** | Mesma razão: pertencem ao contexto do usuário |

### 3.3 Limite geométrico é do núcleo, não do ambiente — e nenhum limite bloqueia

> **Correção de 27/08/2026.** A versão anterior fazia o limite geométrico **bloquear**. Não bloqueia mais: **nada neste sistema recusa entregar um resultado.** A natureza do limite continua governando **o que a mensagem diz e quão grave é o nível** — nunca se o número aparece.

**Um limite é do núcleo quando é verdadeiro para qualquer máquina e qualquer oficina.** Um limite é do ambiente quando muda conforme quem usa.

| Natureza | Exemplo | Onde vive | Comportamento |
|---|---|---|---|
| **Geométrico** | a penetração de trabalho (ae) excede o diâmetro; a profundidade de corte (ap) excede o comprimento de aresta (Lc) que existe | **Núcleo** | **Entrega e avisa no nível mais grave**, dizendo que o resultado descreve algo que a montagem não realiza — e de quanto o pedido estourou |
| **De processo** | a espessura de cavaco (hex) caiu abaixo do piso; o balanço (L) é longo para o diâmetro | **Núcleo** | **Entrega e avisa**, descrevendo a condição e situando o valor |
| **De ambiente** | a rotação (n) exigida excede a rotação máxima da máquina | **Ambiente declarado** | Só existe se o operador declarou. **Entrega e avisa** |

**A razão de nenhum deles bloquear:** isto é uma calculadora, e a função de uma calculadora é entregar o resultado — por mais absurdo que ele seja. Diante do impossível, sumir com o número esconde justamente a informação útil: **o tamanho do erro**. O sistema entrega, nomeia a condição e situa o valor — o operador decide o que fazer (bloco de decisão, 27/08/2026).

### 3.4 Como os dois convivem

| # | Regra | Por quê |
|---|---|---|
| 1 | **O ambiente declarado nunca bloqueia o núcleo.** Ativá-lo acrescenta informação ao resultado; não impede que o resultado exista | Um limite de máquina é um fato sobre a máquina, não uma proibição sobre a física |
| 2 | **A ativação é explícita e reversível.** O operador liga, e pode desligar | Configuração que não se desfaz é armadilha |
| 3 | **O padrão é o núcleo.** Quem abre e não mexe em nada obtém um resultado completo e utilizável | É o que separa calculadora de configurador |
| 4 | **O ambiente é opcional em profundidade.** Declarar uma parte não obriga a preencher o resto | Ninguém tem a ficha técnica inteira da máquina à mão |
| 5 | **Ambiente declarado avisa; nunca ajusta em silêncio** | Ver §5, Q2 |

---

## 4. O eixo de profundidade

**A mesma calculadora, com mais ou menos variáveis declaradas.** Não é uma versão reduzida do produto — é o mesmo motor recebendo menos entradas e assumindo o resto por premissa **escrita na tela**.

| | **Entrada mínima** | **Entrada completa** |
|---|---|---|
| **Quando** | Na máquina, antes do start — o uso corrente | Testando, verificando, ou programando com antecedência |
| **Quantas variáveis** | as que o operador tem olhando a própria máquina | todas |
| **O que o sistema faz com o resto** | assume, e **declara a premissa na tela** | não assume nada |

### 4.1 As três regras do eixo

| # | Regra | Por quê |
|---|---|---|
| 1 | **Toda premissa assumida na entrada mínima aparece escrita na tela**, junto do resultado | Premissa invisível é premissa que o operador vai descobrir na peça |
| 2 | **Nada é assumido quando errar por fator dois é possível.** Se a variável multiplica o resultado, ela é campo — nunca premissa | Um número errado por fator dois **parece plausível**: está na ordem de grandeza certa, e nada na tela indicaria o erro |
| 3 | **A transição não perde dado.** O que foi informado na entrada mínima continua preenchido na completa | É uma porta de entrada, não um beco |

### 4.2 O que este documento **não** decide

Quais campos ficam na entrada mínima, e se o primeiro produto entrega os dois modos ou só um. **Isso é o corte do MVP**, e há evidência de campo em conflito com a especificação atual. Decisão pendente.

---

## 5. Perguntas da versão anterior — fechadas

| # | Pergunta | Resposta | Onde fica |
|---|---|---|---|
| **Q1** | Limite estritamente geométrico fica no núcleo ou vai para o ambiente? | **Núcleo.** Um limite geométrico não depende de quem usa nem do que ele tem. **Ele não bloqueia** — ver a correção de 27/08 na §3.3 | §3.3 |
| **Q2** | Com o ambiente ativo e o resultado ultrapassando um limite declarado: avisa e entrega, ou avisa e ajusta? | **Avisa e entrega.** O sistema recomenda, o operador decide — e a §1 diz que o resultado é entregue sempre. O alerta descreve a condição e situa o valor; não instrui. Ajustar em silêncio esconderia do operador que a máquina dele é o fator limitante, que é justamente a informação útil | §3.3 · §3.4 |
| **Q3** | A configuração de ambiente persiste entre usos, ou volta ao padrão agnóstico a cada abertura? | **Persiste, e o fato de estar ativa é visível sem abrir nada.** Quem declarou a máquina uma vez trabalha nela todo dia; redeclarar a cada abertura é o atrito que este documento existe para eliminar. O que não pode acontecer é o operador ver um resultado limitado sem saber que está limitado | §3.4 |
| **Q4** | Sem tipo de operação declarado, sobre qual premissa o cálculo básico opera? | **Sobre nenhuma premissa de operação.** Os valores de partida vêm da faixa do material e do padrão da geometria da ferramenta, sem multiplicador de desbaste ou acabamento. Os multiplicadores por tipo de operação foram procurados em catálogo e não foram encontrados como regra de fabricante | documento de motor de cálculo |

---

## 6. Conflitos da versão anterior — fechados

| # | Conflito registrado | Resolução |
|---|---|---|
| **C1** | Registro de comportamento em que o controle **para no limite** do perfil de máquina | **Sai.** Limite de ambiente avisa e entrega (Q2). Nenhum controle é travado por propriedade da máquina |
| **C2** | Registro de perfil de máquina **conferido na abertura**, em bloco que começa aberto | **Sai.** O caminho padrão é o núcleo agnóstico; nada é declarado antes do primeiro resultado |
| **C3** | Camada de indicador classificada como **limite físico que bloqueia**, sem separar geometria de ambiente | **Resolvido pela §3.3.** Três naturezas, e **nenhuma bloqueia**: as três entregam o resultado e mudam apenas o texto do aviso e a gravidade do nível. A de ambiente só existe se declarada |

---

## 7. Conflito aberto — o corte do primeiro produto

Este documento fecha o **vocabulário** e o **eixo de dependência**. Não fecha o corte.

| # | Questão aberta | Por que não se resolve aqui |
|---|---|---|
| **A1** | O primeiro produto entrega a entrada mínima, a completa, ou as duas | É decisão de corte de MVP, e a evidência de campo diverge da especificação escrita |
| **A2** | Quais campos ficam na entrada mínima | Idem. Há duas listas em circulação, com apenas dois campos em comum |
| **A3** | O resultado inclui **previsão de comportamento** (vibração, aquecimento, consumo, vida) | Depende de constantes que a pesquisa não conseguiu obter. É lacuna de dado, não de escopo |
| **A4** | O balanço (L) **move** os parâmetros recomendados, ou só produz a relação balanço/diâmetro (L/D) e o alerta | É decisão de motor de cálculo, e há evidência de campo de que a prática move |
| **A5** | A penetração de trabalho (ae) é assumida na entrada mínima, ou pertence à completa | Se assumida, a §4.1 regra 2 exige provar que não erra por fator dois |
| **A6** | O responsável pelo ferramental é usuário do produto | Nenhum documento de escopo o descreve hoje |

**Estas seis são pendências declaradas, não silêncio.** Enquanto estiverem abertas, nenhum documento de escopo deve fixar comportamento que dependa delas.

---

## 8. Consequências para o protótipo

Implicações diretas desta decisão sobre o desenho da interface:

1. **A tela de abertura mostra a calculadora, não uma configuração.** Nada precisa ser declarado antes do primeiro resultado.
2. **Nenhum campo de ambiente no caminho padrão.** Ele existe, mas atrás de uma ativação explícita.
3. **Nenhum seletor de tipo de operação no caminho padrão.**
4. **O resultado sempre aparece — sem exceção.** Não existe estado em que o sistema se recusa a calcular, nem controle que trave num limite. Também não existe gesto de "liberar limite", nem marca de forçado: nada estava preso (§3.3).
5. **O acesso ao ambiente declarado é visível, mas não intrusivo.** Quem precisa encontra; quem não precisa não tropeça.
6. **Quando o ambiente está ativo, isso é visível sem abrir nada** (Q3).
7. **Os indicativos do núcleo são didáticos por si**, sem depender de configuração prévia.
8. **A ordem de construção segue o eixo de dependência:** o núcleo agnóstico precisa estar completo e bom antes de o ambiente declarado receber esforço.
