# MVP — Calculadora de Parâmetros de Corte

**O que este documento é:** a especificação completa do primeiro produto funcional da calculadora —
o que ele conhece, o que pergunta, o que calcula, o que mostra e o que avisa. Escrito para ser
suficiente: quem for construir não precisa consultar outro documento para saber o que fazer.

**O que este documento não é:** não é arquitetura (não define camada, módulo, banco nem tecnologia),
não é plano de implementação (não tem ordem de construção nem estimativa) e não é design de tela
(não define cor, tipografia, espaçamento nem posição em pixels).

**Data:** 20/08/2026. **Revisado em 26/08/2026** contra entrevista com fresador CNC de fábrica e três arquivos reais de parâmetros de produção — ver §0.4.

---

## 0. Precedência e regra de escrita

### 0.1 Quem vence quem

| Ordem | Documento | O que governa |
|---|---|---|
| 1 | **Princípio da calculadora agnóstica** | a arquitetura de produto: o que aparece por padrão e o que fica atrás de ativação |
| 2 | **Os canônicos** (geometria · ferramentas e substratos · limites e alertas) | todo número, fórmula e limiar |
| 3 | **Este documento** | a função, o campo, o fluxo e o comportamento do MVP |
| 4 | Registros anteriores de painel, catálogo e motor | só onde nada acima os contradiz |

Onde este documento diverge de um registro anterior, a divergência está **escrita, com a razão** —
nunca silenciosa. A §0.3 lista as dez.

### 0.2 A regra que organiza tudo

> **Nenhuma fórmula, constante de cálculo ou limiar derivado de constante física entra sem fonte citada.**

Vale para o motor de cálculo — Kienzle (`kc1.1`, `mc`), Taylor, deflexão, geometria de corte — e para
o ponto em que cada fórmula ou constante deixa de valer. Decisão de escopo, nome, vocabulário e
limiar de julgamento de produto que não deriva de constante física **não** dependem de fonte externa
— são escolha do dono do produto (decisão do Mestre, 01/09/2026).

Onde falta fonte, o documento declara **o que falta** em vez de arbitrar um valor. Cada número de
cálculo tem, na mesma linha ou na tabela que o contém, um rótulo de confiança:

| Rótulo | Significado |
|---|---|
| `CONSENSO` | três ou mais fontes independentes, de origens que não se tocam |
| `REFERÊNCIA MÚLTIPLA` | duas fontes independentes |
| `REFERÊNCIA ÚNICA` | uma fonte, localizável e verificável |
| `DERIVADO` | prova geométrica ou algébrica, verificável por reconstrução — não é fonte nem consenso |
| `DECISÃO DE PROJETO` | escolha declarada, sem fonte publicada. Vale, mas não se disfarça de achado |
| `SEM FONTE PUBLICADA` | valor de partida interno. **Este rótulo é do documento, não da tela** — na tela o valor aparece como número editável |
| `NÃO VERIFICADO` | está no produto, mas ninguém conferiu na fonte |

**Refinamento fino é falsa precisão** e não justifica campo na tela. Abaixo de `hm = 0,1 mm` de
espessura de cavaco média o par `(kc1.1, mc)` não é transferível para essa faixa (§6.7) ~~— o
gatilho 1a do §9.2 avisa~~ — **e o sistema não avisa: o gatilho 1a foi revogado em 08/09/2026 (§9.2).**

### 0.3 As dez divergências contra o registro anterior

| # | O que muda | Por quê |
|---|---|---|
| 1 | Material é escolhido **antes** da ferramenta | O material é o primeiro filtro: define a lista de ferramentas oferecidas e o valor de partida da velocidade de corte (vc). A lista de ferramentas não pode ser montada antes de o material existir (**E1** §8) |
| 2 | **Não existe seletor de tipo de operação** (desbaste / semi / acabamento) | Desbaste e acabamento são o que o operador está fazendo, não atributo do cálculo. A agressividade se ajusta nos quatro controles de corte, que já estão na tela |
| 3 | **Não existe perfil de máquina** no MVP | Rotação máxima, potência, torque e avanço máximo são propriedades do ambiente de quem usa. O cálculo não depende deles, e exigi-los transforma calculadora em configurador |
| 4 | A potência exibida é a **potência de corte (Pc) na aresta**, rotulada como tal | Sem perfil de máquina não há rendimento (η) a declarar. Fabricantes usam o mesmo nome para grandezas diferentes, e o erro é de fator `1/η` — a faixa publicada de rendimento abre 50% entre extremos |
| 5 | A espessura de cavaco (hex) usa a **fórmula exata** | A forma simplificada entrega ~79% a mais de avanço em penetração de trabalho baixa, e erra sempre para o lado que quebra ferramenta. Dois fabricantes publicam exemplo resolvido que reproduz a exata |
| 6 | O sistema **não compensa o avanço automaticamente** | O avanço por dente informado é o que vai ser programado. O sistema mostra a espessura resultante e avisa quando ela cai demais. Compensar por cima de um valor que já é avanço programa até 2,3× a mais |
| 7 | Balanço longo **avisa, não bloqueia** | Os limiares antigos proíbem ferramenta que existe em catálogo: adaptador amortecido trabalha em 7–8×D, barra amortecida em 10×D, broca de canal interno até 30×D |
| 8 | Aço rápido comum **sai**; fica só aço rápido ao cobalto | Fresa de topo em aço rápido sem cobalto foi procurada em catálogo corrente e não foi encontrada à venda. A entrada representava ferramenta inexistente |
| 9 | **Revestimento sai do produto** — sem campo, sem lista, sem fator no cálculo | Multiplicador de velocidade por tipo de revestimento foi procurado em dois territórios e veio vazio, cinco de cinco. A ferramenta de catálogo já sai revestida, e nada publicado separa a revestida da não revestida. Fator que não move o resultado além da margem do modelo não entra. A ferramenta é nomeada só pelo tipo e substrato (Q18, 27/08/2026) |
| 10 | **Sai o selo de "material estimado"**; os dados do material ficam **visíveis na tela** (editáveis na área Configurações, D2) | Um selo genérico não diz qual número é frágil nem em quanto, e repetido em cinco linhas ensina o operador a ignorá-lo. Mostrar a força específica e a velocidade que entraram na conta permite conferir contra a carta que ele tem na mão — e substituí-la pela do fornecedor dele. Ver §4.7 |

### 0.4 A revisão de 26/08 — o que a evidência de campo mudou

A versão de 20/08 foi escrita a partir do domínio técnico e das decisões de escopo. **Em 26/08 o
problema foi levantado com um usuário real** — entrevista com fresador CNC de fábrica, com três
arquivos de parâmetros de produção em mãos. Quatro pontos desta especificação mudaram.

| # | O que muda | Por quê |
|---|---|---|
| 11 | **"Camada 1" e "camada 2" saem do vocabulário.** Entram **núcleo agnóstico × ambiente declarado** (eixo de dependência) e **entrada mínima × entrada completa** (eixo de profundidade) | O nome designava três coisas diferentes em três documentos. Os dois eixos são independentes: declarar poucas variáveis e nenhum ambiente é o uso corrente; declarar todas e nenhum ambiente é verificar um parâmetro novo |
| 12 | **A profundidade de corte (ap) vira campo de entrada**, não controle de ajuste fino | O operador **chega com ela decidida**. Nos arquivos reais da fábrica ela é registrada ao lado da rotação e do avanço, como parte do parâmetro. Ver §4.8 |
| 13 | **Entram dois blocos de resultado: "o que vai acontecer" (§7.3) e "o que mexer" (§7.4)** | Sucesso, para quem usa, **não é um número — é a ausência de evento**. E a metade que falta em todo o mercado é a direção do ajuste com o preço escrito. Um par rotação/avanço isolado é o que a planilha da fábrica já entrega, e melhor: ela foi validada na prática daquela fábrica |
| 14 | **A calculadora reduzida de quatro entradas é descartada, não adiada** | A entrada mínima é o painel da §2.2, que já corresponde ao uso corrente descrito. Uma versão que esconde potência de corte (Pc), torque (Mc) e alertas não é mais rápida — é menos verificada |

**O que a entrevista NÃO mudou:** os canônicos de geometria, ferramentas, substratos, limites e
alertas; a regra "nenhum número entra sem fonte citada"; a decisão de que o sistema recomenda e o
operador decide; e a decisão de manter perfil de máquina fora do MVP — **esta última a entrevista
reforça: ninguém pediu.**

---

## 1. Os dois eixos — o que é o MVP

### 1.1 A decisão que governa

**O sistema é, antes de tudo, uma calculadora. Por padrão ela não tem limitações e entrega o
resultado, seja ele qual for.**

Ela nasce **agnóstica**: sem vínculo com limite de máquina, sem vínculo com ferramental específico,
sem limitador que seja variável de ambiente. Não existe estado em que o sistema se recuse a calcular
por causa de um limite de ambiente.

### 1.2 Núcleo agnóstico — o MVP

A calculadora que abre pronta para usar, com o menor atrito possível de opções. Os atributos abaixo
valem como critério de aceitação do produto:

| Atributo | O que significa na prática |
|---|---|
| Eficiente | o caminho da entrada ao resultado é o mais curto possível |
| Rápida | o resultado aparece sem espera perceptível |
| Precisa | o número entregue é o número correto para o que foi informado |
| Dinâmica | responde à mudança de entrada sem exigir reinício |
| Fácil de usar | não exige treinamento nem leitura prévia |
| Auto-intuitiva | o próximo passo é evidente sem que ninguém explique |
| Explicativa | diz o que vai acontecer e o que mexer, não só entrega o par rotação/avanço |
| Educativa | quem usa aprende o domínio ao usar, sem ter vindo estudar |
| Enxuta | nada na tela que não sirva ao resultado |
| Confiável | o operador pode agir sobre o número sem conferir por fora |
| Didática nos indicativos | o que a cor, o ícone ou o aviso significam é claro sem legenda |
| Direcionadora | quando algo está fora do bom, diz **para onde ir** — não só que está errado |
| Clara | uma leitura basta |

### 1.3 Ambiente declarado — fora do MVP

Tudo o que depende da realidade de chão de fábrica de cada usuário. Existe, mas não neste produto.
Quando entrar, entra como ativação explícita e reversível, e **nunca bloqueia o núcleo**.

| Item | Por que não está no MVP |
|---|---|
| Perfil de máquina — rotação, potência, torque e avanço máximos, rendimento | Variáveis do ambiente de quem usa, não do cálculo |
| ~~Fator de segurança~~ | ~~Só faz sentido comparado a um limite de máquina, que não existe aqui~~ — **revogado em 01/09/2026 por decisão do Mestre: ENTRA no MVP.** A razão de então estava errada: ele não mede contra limite nenhum — é uma **lente de exibição** sobre o resultado do cálculo, com padrão neutro `100 %`. Por isso não depende de perfil de máquina. Ver §4.9 |
| Tipo de operação — desbaste, semi-acabamento, acabamento | É o operador quem regula a agressividade, e os controles de corte já permitem isso |
| Tolerância da peça e deflexão em micrômetros | Depende de constantes que não fecharam — ver §13 |

### 1.4 Profundidade de entrada — o outro eixo

O segundo eixo do produto **não é uma versão reduzida da calculadora**. É a mesma calculadora com
mais ou menos variáveis declaradas.

**Este MVP entrega a entrada mínima, e ela é o painel da §2.2.** A evidência de campo (entrevista com
fresador de fábrica, 26/08) descreve como uso corrente exatamente os campos deste painel — material,
tipo de ferramenta, diâmetro com o que o tipo exigir, balanço (L) e profundidade de corte (ap).

**Não existe um segundo modo a construir.** A entrada completa é este mesmo painel com o bloco de
ajuste fino aberto; não é outra tela, outro fluxo nem outro conjunto de resultados.

> **O que ficou proibido:** uma calculadora reduzida que peça menos campos **escondendo** potência de
> corte (Pc), torque (Mc), taxa de remoção de material (MRR), relação balanço/diâmetro (L/D) e alertas.
> Um resultado com menos verificação não é mais rápido — é menos verificado, e o operador não tem como
> saber disso olhando a tela.

---

## 2. Fluxo do painel

### 2.1 Princípios de interação

| # | Princípio | Por quê |
|---|---|---|
| P1 | **Painel persistente com zonas fixas**, nunca assistente em etapas | A calculadora é usada dezenas de vezes por dia. Navegação em passos custa tempo em toda repetição |
| P2 | **Cada camada restringe a seguinte** | Inverter faz o operador preencher campo cujo domínio ainda não existe |
| P3 | **Todo campo visível muda um número que o operador lê na tela** | Campo que não entra em conta ensina a preencher por preencher, e desvaloriza os campos que importam |
| P4 | **Teto de 6 campos por tipo de ferramenta** | Acima disso a tela deixa de ser calculadora e vira formulário |
| P5 | **Estado vazio honesto** — sem cálculo, nenhum número é exibido | Zero calculado apresentado como resultado é a mentira mais fácil de contar e a mais difícil de detectar |
| P6 | **Nenhum resultado visual sem função** | Indicador que não alimenta validação nem decisão é ruído, e ruído treina o operador a ignorar a tela |
| P7 | **Destaque visual reservado a 2 números** | São os que o operador digita na máquina. Se tudo tem destaque, nada tem |
| P9 | **Alvo de toque generoso, ação sempre visível** | O ambiente é chão de fábrica: a tela é tocada em pé, na máquina, com toque impreciso — dedo, teclado ou ponteiro |
| P10 | **Zero dependência de rede** em tempo de uso | Oficina sem conexão precisa abrir a tela idêntica |
| P11 | **Recomendação, limite e impossibilidade são camadas separadas — e nenhuma trava** | Cada uma muda o texto do aviso e a gravidade do nível, nunca se o resultado aparece. Nada é ultrapassado em silêncio |
| P12 | **O sistema recomenda, o operador decide** | O operador é o responsável técnico. O sistema apoia, não assume a responsabilidade |

**Quando colidem:** P3 vence a coleta de dado "para depois". P5 vence a pressa. P7 vence o pedido de
mais informação em destaque. P11 e P12 convivem — o operador pode ultrapassar, mas nunca em
silêncio.

### 2.2 A ordem, e a razão de cada passo

```
1  Material da peça
2  Tipo de ferramenta
3  Específicos da ferramenta       (quando o tipo pedir: raio, ângulo, passo...)
4  Diâmetro da ferramenta (D)
5  Balanço (L)
6  Número de arestas (Z)
7  Profundidade de corte (ap)
-----------------------------------
8  Ajuste fino:  velocidade de corte (vc) -> avanço por dente (fz) -> penetração de trabalho (ae)
-----------------------------------
9  Calcular
-----------------------------------
10 Resultados
```

| Passo | Por que vem aqui |
|---|---|
| 1 Material | Define a lista de ferramentas oferecidas e o valor de partida da velocidade de corte (vc). Nada acima dele depende de outra coisa |
| 2 Tipo de ferramenta | Define quais campos existem daqui para baixo, e quais controles de corte fazem sentido |
| 3 Específicos | Só aparecem quando o tipo os tem. Campo que não se aplica não fica desabilitado: **não existe** |
| 4 Diâmetro | Entra na rotação (n), no diâmetro efetivo (De) e no limite de penetração de trabalho (ae) |
| 5 Balanço (L) | Produz a relação balanço/diâmetro (L/D) e o alerta de rigidez. Sem consequência na tela, o campo violaria P3 |
| 6 Número de arestas (Z) | A velocidade de avanço da mesa (vf) é **diretamente proporcional** a ele. Assumir quatro quando a ferramenta tem duas entrega o dobro do avanço correto |
| 7 Profundidade de corte (ap) | **O operador chega com ela decidida.** Nos arquivos reais de produção da fábrica ela é registrada ao lado da rotação e do avanço, como parte do parâmetro — não como refinamento. Continua editável e continua trazendo valor de partida; o que muda é que ela é **perguntada**, não escondida num controle de ajuste |
| 8 Ajuste fino | Os contínuos que sobram vêm por último porque suas faixas dependem de tudo acima |
| 9 Calcular | A ação encerra o fluxo. Comando no topo obriga o olho a voltar depois de preencher |

### 2.3 Estrutura do painel

Duas áreas lado a lado. Abaixo de uma largura mínima, empilham em coluna única **preservando a
ordem**, configuração acima do resultado.

```
+- CABECALHO ----------------------------------------------+
| identidade . material . ferramenta . nivel de seguranca  |
+- CONFIGURACAO --------------+- RESULTADO -----------------+
| 1. Material e ferramenta    | Z1  Cabecalho do resultado  |
| 2. Geometria                | Z2  Alerta e acao           |
| 3. Ajuste fino              | Z3  Resumo da ferramenta    |
| --------------------------- | Z4  Rotacao e avanco        |
| 4. Calcular  (fixo ao pe)   | Z5  O que vai acontecer     |
|                             | Z6  O que mexer             |
|                             | Z7  Resultados uteis        |
+-----------------------------+-----------------------------+
```

| Zona | Conteúdo | Regra própria |
|---|---|---|
| **Z1** | material · ferramenta por extenso · **margem de segurança, só quando difere de `100 %`** (§4.9) · nível de segurança | o indicador de nível **nunca** recebe tratamento de desatualizado, e **nunca acompanha a lente do fator** (§4.9 r5) |
| **Z2** | a condição mais grave ativa, com a grandeza medida contra a referência | descreve o risco e situa o valor; não instrui (§9) |
| **Z3** | especificação compacta do que está montado — só siglas, em maiúscula: `10 R1 Z4 L45` — com o substrato ao lado | resumo do que está na mão, para conferir contra a ferramenta |
| **Z4** | rotação e avanço, em destaque, **editáveis** (§8) | os dois únicos números com destaque de herói |
| **Z5** | **a previsão de comportamento** (§7.3) | só condições que a cadeia de cálculo sustenta; nunca frase genérica |
| **Z6** | **a direção de ajuste, com o que se perde** (§7.4) | toda direção carrega o preço na mesma linha |
| **Z7** | os resultados úteis da §7.2 | sem destaque de herói |

**Z5 e Z6 são a razão de o produto existir**, e por isso ficam acima dos resultados úteis. O par
rotação/avanço sozinho é o que a planilha da fábrica já entrega — e melhor, porque foi validada na
prática daquela fábrica. O que ela não entrega é o que vai acontecer e o que mexer.

### 2.4 Blocos colapsáveis

| # | Regra | Por quê |
|---|---|---|
| 1 | Todo bloco de entrada pode ser recolhido, por cabeçalho clicável com alvo de toque generoso | — |
| 2 | Cabeçalho recolhido mostra **os valores**, não a contagem de campos | "3 campos" não informa nada; `Ø10 · Z4 · L30` permite conferir sem abrir |
| 3 | O estado de cada bloco persiste entre sessões | O operador não reconfigura a tela toda vez que abre |
| 4 | Bloco com campo inválido ou obrigatório vazio **não recolhe**, e abre sozinho se o erro surgir | Erro escondido em gaveta é erro que não existe para o operador |
| 5 | Sem gaveta dentro de gaveta | Aninhamento transforma navegação em caça ao tesouro |
| 6 | Trocar o tipo de ferramenta com o bloco de geometria recolhido **abre o bloco** | Campo novo recolhido é campo preenchido sem ninguém olhar |

### 2.5 Momento do cálculo — modelo híbrido

> **O primeiro cálculo é um compromisso consciente. Depois dele, o painel é vivo.**

| Fase | Comportamento |
|---|---|
| **Antes do primeiro cálculo** | Mudar qualquer campo apenas limpa o resultado. Nenhum número é exibido (P5) |
| **Depois do primeiro cálculo** | Qualquer mudança de parâmetro **ou** edição de resultado recalcula na hora, sem clique adicional |

O comando de cálculo **nunca some e nunca é desabilitado**. Depois do primeiro uso ele serve de
ponto de retorno para reancorar.

**Estado transitório:** entre a mudança e o resultado novo, os **números** ficam com tratamento de
desatualizado. O **alerta e o nível de segurança não** — esmaecer alarme ativo é o oposto do que um
painel industrial deve fazer.

### 2.6 Casos de borda — fluxo

| Situação | Comportamento | Por quê |
|---|---|---|
| Operador troca o material depois de calcular | Recalcula na hora. A lista de ferramentas é refiltrada; se a ferramenta ativa deixar de ser oferecida, o sistema move para a primeira da lista nova e **diz o que mudou** | Calcular em silêncio com ferramenta incompatível é o pior resultado possível |
| Operador troca a ferramenta | Recalcula na hora. Geometria compatível já digitada (diâmetro, balanço) é **preservada** e revalidada contra os limites novos, com aviso do que precisou ser ajustado | Zerar o que ele digitou pune quem está comparando duas ferramentas |
| Valor manual em `Vc`/`fz`/`ae`/`ap`, trocando de ferramenta **dentro da mesma família** | **Permanece** até o operador mexer nele de novo | Trocar de fresa de topo para toroidal, ou de Ø10 para Ø6, não muda o que o operador quis dizer com aquele avanço. Zerar puniria justamente quem está comparando duas ferramentas na mesma condição |
| Valor manual que vira condição impossível na ferramenta nova (`ae > D`) | **Permanece como está**, com o alerta crítico ativo e o alvo — nada é cortado em silêncio | Ajustar por herança esconderia do operador que o valor dele não cabe na ferramenta nova |
| Valor manual ao trocar **de família** — fresa para broca, macho, barra | **Todos os quatro voltam à região recomendada da família nova**, e a tela diz que foram reajustados | São grandezas com significado diferente: o avanço por dente de uma fresa não é o avanço por rotação de uma broca. Herdar o número seria carregar um valor que não quer dizer a mesma coisa |
| Campo obrigatório fica vazio depois do primeiro cálculo | O resultado é limpo e o painel volta ao estado vazio, com o campo sinalizado | Resultado calculado com dado que já não existe é resultado falso |
| Campo recebe valor inválido | O resultado **anterior é mantido**, com tratamento de desatualizado, e o campo é sinalizado | Limpar tudo por erro de digitação faz o operador perder o resultado bom que tinha |
| Mudança acontece enquanto o cálculo anterior ainda roda | O cálculo em andamento é descartado e o novo assume | O operador espera ver o efeito do último gesto, não do penúltimo |
| Operador aciona Calcular sem ter mudado nada | Recalcula normalmente | O comando é o gesto de reancorar |

---

## 3. Catálogo de ferramentas

### 3.1 O que o sistema conhece

**17 geometrias em 4 famílias de usinagem.** Como cada geometria existe no mercado em mais de um
substrato, e o substrato muda o resultado, o catálogo tem **uma entrada por variação real de
mercado** — o substrato faz parte do **nome** da ferramenta, não de um campo separado.

**Por que não existe campo "material da ferramenta":**

1. A variação de substrato entre fabricantes **existe**, mas age sobre vida e desgaste — não sobre
   as grandezas que o sistema entrega. Onde ela toca uma grandeza calculada (a deflexão), o efeito é
   ±6% — pequeno demais para justificar um campo.
2. **Não existe vocabulário pelo qual o operador pudesse informá-la.** A norma internacional de
   classificação de material de corte declara na própria introdução que padronizar esses materiais
   por características é impossível, e por isso classifica **por aplicação**. Teor de cobalto,
   tamanho de grão e dureza não são especificação publicada na embalagem.
3. Cruzar dois campos permite montar combinação que não existe. Com o substrato dentro do nome,
   "cabeçote faceador em aço rápido" simplesmente não é uma opção — a prevenção de erro vem da
   estrutura, não de uma validação depois.

**O que decide quais variações existem é a construção da ferramenta**, não o formato do corte:

| Construção | Substratos que existem no mercado | Consequência no catálogo |
|---|---|---|
| **Inteiriça (sólida)** | metal duro · aço rápido ao cobalto | duas entradas por geometria |
| **Pastilhada / indexável** | metal duro (padrão de fábrica) | uma entrada só; aço rápido **não existe** como inserto indexável |

**"Metal duro" já significa a ferramenta revestida adequada ao material** — não há campo nem fator de revestimento (§3.4).

### 3.2 As 17 geometrias, com campos e substratos

`D` diâmetro · `Z` arestas · `L` balanço · `r` raio · `κ` ângulo de posição · `P` passo.
Substrato: **MD** metal duro · **HSS-Co** aço rápido ao cobalto.

| # | Geometria | Família | Construção | Substratos | `Z` padrão | Campos além dos comuns | Partida (`ap` · `ae` · `L`) |
|---|---|---|---|---|---|---|---|
| 1 | Fresa de Topo Reto | Fresar | inteiriça | MD · HSS-Co | 4 | — | 3 · 5 · 30 |
| 2 | Fresa Toroidal (raio de canto) | Fresar | inteiriça | MD | 4 | **raio de canto `r`** | 1 · 3 · 30 |
| 3 | Fresa Esférica (ball nose) | Fresar | inteiriça | MD · HSS-Co | 2 | — *(o raio é `D/2`, derivado)* | 2 · 3 · 25 |
| 4 | Fresa de Chanfrar | Fresar | inteiriça | MD · HSS-Co | 4 | **diâmetro menor `Dmin`** — o cálculo usa o diâmetro médio `(Dmin + Dmax)/2` | 1 · 1,0 · 30 |
| 5 | Fresa de Alto Avanço | Fresar | pastilhada | MD | 3 | **ângulo de posição `κ`** (padrão 15°) | 1 · 8 · 30 |
| 6 | Cabeçote Faceador | Fresar | pastilhada | MD | 5 | **ângulo de posição `κ`** (padrão 45°) | 1 · 0,7×D · 40 |
| 7 | Fresa de Topo com Pastilhas | Fresar | pastilhada | MD | 2 | — *(arestas = insertos efetivos)* | 3 · 5 · 30 |
| 8 | Fresa de Disco / Serra | Fresar | pastilhada (MD) · inteiriça (HSS-Co) | MD · HSS-Co | 8 | rótulos trocados: `ap` é **largura da fresa `b`**, `ae` é **penetração de trabalho radial** | 5 · 3 · — |
| 9 | Broca Helicoidal | Furar | inteiriça | MD · HSS-Co | — | **ângulo de ponta**: 140° nas de metal duro, 118°/135° nas de aço rápido | — · — · 50 |
| 10 | Broca de Insertos (U-Drill) | Furar | pastilhada | MD | — | **avanço por rotação `fn`** editável | — · — · 50 |
| 11 | Broca de Centro / Spot | Furar | inteiriça | MD · HSS-Co | — | **ângulo de ponta** (90° / 120°) | — |
| 12 | Escareador / Rebaixador | Furar | inteiriça | MD · HSS-Co | — | o diâmetro informado é o **maior** | — |
| 13 | Alargador (reamer) | Furar | inteiriça | MD · HSS-Co | — | — | — · — · 40 |
| 14 | Macho de Corte | Roscar | inteiriça | HSS-Co · MD | — | **designação da rosca** · **passo `P`** · comprimento de rosca · furo já executado | — |
| 15 | Macho de Conformação | Roscar | inteiriça | HSS-Co · MD | — | idem, e **alerta em nível crítico** em material que não conforma | — |
| 16 | Fresa de Rosca | Roscar | inteiriça | MD | 3 | **designação** · **passo `P`** · diâmetro da fresa | — |
| 17 | Barra / Cabeçote de Mandrilar | Mandrilar | pastilhada | MD | 1 | **diâmetro inicial e final** · **raio de ponta `rε`** · **`fn`** | `ap` é derivado |

**Comuns a todas:** diâmetro da ferramenta (D) e balanço (L). **Número de arestas (Z)** só onde o avanço é por dente
(fresamento e fresa de rosca) — furação trabalha por rotação, e pedir arestas ali seria campo sem
efeito.

> **Valores de partida da Fresa de Chanfrar e do Cabeçote Faceador** (`ae` = 1,0 mm e 0,7×D; `L` = 30 e 40 mm) entraram em 27/08 — a auditoria (achado A20) achou as duas geometrias sem partida de `ae`, que a fórmula de `Q` consome. São `DECISÃO DE PROJETO`, prática padrão, editáveis. Provisórios para essas duas geometrias de nicho — revisar quando forem construídas (na fatia de chanfro, decidir se `ap` e `ae` são independentes ou acoplados pela geometria de 45°).

**Ordem dentro de cada geometria:** do mais usado para o menos (metal duro → aço rápido ao cobalto).
O primeiro é o padrão. A lista é agrupada por geometria, e o operador procura a geometria antes de
olhar o substrato.

**Seis campos ficaram deliberadamente fora da tela**, e vale registrar quais — foram todos auditados
um a um, e nenhum entra em conta nenhuma. Pedir dado que não muda número treina o operador a
preencher por preencher (P3):

| Campo | Onde aparecia | Por que não entra |
|---|---|---|
| Refrigeração interna | broca de metal duro | Deveria mudar o limiar de pica-pau e o avanço, mas o novo limiar e o fator não têm fonte de catálogo |
| Sobremetal | alargador | Deveria influenciar avanço e acabamento; a regra não existe em fonte |
| Arestas | escareador, alargador | Furação trabalha por rotação, não por dente |
| Profundidade `h` | broca de centro, escareador | Não entra em nenhuma grandeza exibida |
| Ângulo de chanfro | fresa de chanfrar | O que a geometria consome é o diâmetro médio, não o ângulo |
| Ângulo de ponta | escareador | O ângulo só vira comprimento de ponta na broca helicoidal e na broca de centro |

**Eles voltam quando o cálculo souber usá-los** — não antes.

**O substrato aparece sempre no rótulo da ferramenta**, inclusive quando a geometria tem variação
única (*"Cabeçote Faceador — pastilhada, metal duro"*). A ferramenta escolhida aparece por extenso
no cabeçalho; o resumo compacto de Z3 usa **só as siglas, em maiúscula** (`10 R1 Z4 L45`), com o
substrato ao lado. O substrato entra no fator de velocidade (§3.5) e por isso faz parte do nome.

> **Exceção de vocabulário (decisão do Mestre, 30/08/2026):** o resumo compacto da ferramenta (Z3)
> usa só as siglas, em maiúscula, no formato `10 R1 Z4 L45`. Mesma exceção registrada no gabarito do
> protótipo §2.2. A regra "nome por extenso" continua valendo no cabeçalho e no resto da tela.

### 3.3 Aço rápido — o que ficou e o que saiu

**Fresa de aço rápido não é obsoleta: é nicho.** Dois territórios de pesquisa que não se tocam
contradisseram a premissa de obsolescência — um por livro-texto e tese, o outro por catálogo vivo de
dois fabricantes independentes com dados de corte publicados. `CONSENSO`.

**Mas o que sobreviveu no mercado é o aço rápido ao cobalto ou sinterizado.** Fresa de topo em aço
rápido **sem cobalto** foi procurada em catálogo e **não encontrada à venda**. Por isso o MVP tem uma
entrada só de aço rápido por geometria, e ela é a ao cobalto.

O nicho declarado pelos fabricantes é **material mole (alumínio, plástico) e série limitada**, onde a
vida importa menos. Em broca e macho, o aço rápido **continua padrão de mercado** — confirmado pelos
dois territórios.

### 3.4 Revestimento — fora do produto

**Não existe campo de revestimento, não existe lista de revestimento, não existe fator de revestimento
no cálculo** (Q18, 27/08/2026). A ferramenta é nomeada pelo tipo e pelo substrato — nada além disso.

A razão é a regra da margem do modelo levada ao limite: **fator que não move o resultado além da
margem do modelo não entra.** Cinco multiplicadores por tipo de revestimento foram procurados em dois
territórios independentes e resultaram `NÃO ENCONTRADO`, **cinco de cinco** — fabricante publica
dureza, temperatura de trabalho e coeficiente de atrito, nunca multiplicador de velocidade. A
ferramenta inteiriça de catálogo já sai revestida, e nenhum fator publicado separa a revestida da não
revestida. O valor de partida da velocidade de corte (vc) do material (§4) já pressupõe a ferramenta revestida
adequada.

**Diamante e PCD sobre material ferroso não vira bloqueio na tela:** ferramenta de diamante não é
catalogada para material ferroso, então a combinação não chega a existir na lista. Se o operador
cadastrar uma por conta própria (§4.7), o sistema calcula — ele recomenda, o operador decide. O
registro de que o multiplicador de revestimento foi pesquisado e não existe fica em **E7** §3.

### 3.5 Fator de velocidade por substrato

O fator multiplica o valor de partida da velocidade de corte (vc) do material.

| Substrato | Fator | Confiança |
|---|---|---|
| Metal duro (revestido, adequado ao material) | **1,00** (referência) | `OK` — o único dos quatro antigos não contestado |
| Aço rápido ao cobalto | **0,22–0,25**, faixa e não ponto | `REFERÊNCIA ÚNICA` em cada ponta |

**Sobre a faixa do aço rápido:** os dois valores diferem em 13,6% — mas um vem de
constantes de vida medidas em **torneamento** e o outro de regra de bolso publicada em guia de
**alargamento**. Nenhum é fresamento. **O único par medido em fresa aponta mais baixo: 0,12–0,23.**
O fator antigo de `0,29` fazia a ferramenta rodar entre 16% e 32% acima do que a evidência sustenta,
e por isso sai.

**Sobre o revestido:** o fator antigo de `1,25` **sai** — misturava construção com estado de
revestimento e não tem significado bem definido. "Metal duro" no catálogo já significa a ferramenta
revestida adequada ao material; não há um segundo substrato "não revestido" a distinguir. Ver §13, L2.

### 3.6 Casos de borda — catálogo

| Situação | Comportamento | Por quê |
|---|---|---|
| Material selecionado torna uma ferramenta inválida | A entrada **não é listada**; se era a ativa, o sistema move para a primeira válida e avisa | §2.6 |
| Operador cadastra uma ferramenta de diamante e usa em aço | O sistema calcula e mostra o resultado | O sistema recomenda, o operador decide — não há bloqueio na tela (§3.4) |
| Geometria com uma só opção de ângulo | Vira **valor fixo exibido e travado**, com a razão ao lado — não um seletor de uma opção | Controle com uma opção só é ruído |

---

## 4. Entradas

### 4.1 Campos comuns

| Campo | Unidade | Faixa | Passo | Obrigatório | Observação |
|---|---|---|---|---|---|
| **Material da peça** | — | 12 de partida, ou criado pelo operador (§11.1) | — | sim | Primeiro campo. Filtra o catálogo |
| **Ferramenta** | — | catálogo filtrado (§3.2) | — | sim | Substrato no rótulo |
| **Diâmetro da ferramenta `D`** | mm | fresa inteiriça **0,2–25** · furar: por geometria (§4.3) · roscar e mandrilar: ver §4.3 | 0,01 abaixo de Ø1; 0,1 acima | sim | Fora da faixa típica, o resultado sai mesmo assim (§1.1). A faixa de furação é editável em Configurações |
| **Balanço `L`** | mm | 5–300 | 0,5 | sim | O quanto a ponta se projeta da face do porta-ferramenta. Produz `L/D` e o alerta de rigidez |
| **Número de arestas `Z`** | — | 1–12, inteiro | 1 | sim, onde se aplica | **Nunca assumido** — ver §4.2 |
| **Profundidade de corte `ap`** | mm | 0,05 até `min(teto proporcional ; comprimento de aresta)` | 0,05 | sim, nas famílias de fresamento | **Campo, não controle de ajuste.** Nasce no valor de partida da geometria (§3.2) e continua editável. Ver §4.8 |
| **Comprimento de aresta `Lc`** | mm | 0,5–200 | 0,5 | **não** — opcional, só nas famílias de fresamento | Preenchido, vira teto físico do `ap`, dá o alvo numérico do alerta de rasgo cheio, e é o `L2` do cálculo de deflexão (`CANONICO_LIMITES_E_ALERTAS.md` §1.4). Vazio, o teto de `ap` é o proporcional da §5.3 e a deflexão cai para o modelo de diâmetro único, mais conservador |

### 4.2 O número de arestas (Z) é obrigatório, nunca assumido

A velocidade de avanço da mesa (vf) é **diretamente proporcional** ao número de arestas. Assumir quatro quando a
ferramenta tem duas entrega **o dobro** do avanço correto; quando tem seis, entrega dois terços.

Um erro de fator dois aqui é pior que um campo a mais, porque o número resultante **parece
plausível** — está na ordem de grandeza certa, e nada na tela indicaria que está errado.

O tipo de ferramenta traz um valor **padrão** (a coluna `Z` da §3.2), que é sugestão preenchida, não
premissa escondida: o campo fica visível e editável.

### 4.3 Faixa de diâmetro — o que a evidência sustenta

| Extremo | Valor | Fonte | Confiança |
|---|---|---|---|
| Menor comercial (fresa inteiriça) | **Ø0,2 mm** | dois fabricantes independentes | `CONSENSO` |
| Menor comercial, segundo patamar | Ø0,3 mm | um fabricante | `REFERÊNCIA ÚNICA` |
| Maior, famílias de alta performance | **~Ø20–25 mm** | um fabricante (linhas 6–20 mm e 10–25 mm) | `REFERÊNCIA ÚNICA` |
| Maior, catálogo filtrado não verificado por item | até Ø50,8 mm | um fabricante | `SEM CONSENSO` no teto exato |
| Acima da fresa inteiriça | cabeçote com pastilha, até Ø315 mm | um fabricante | mudança de **tipo de ferramenta**, não de calculadora |

**A faixa antiga de `0,1–200 mm` sai.** Ela era universal e sem base: as tabelas de parâmetro cobriam
`Ø0,2–16 mm` e, acima disso, o sistema repetia silenciosamente os valores de Ø16.

**Piso de processo × piso de catálogo — a distinção importa.** O menor diâmetro que uma máquina
consegue cortar sem a velocidade despencar não é uma constante do produto:

```
D_min,processo = 1000 · Vc_min / (π · n_max)
```

Numa máquina de 12.000 rpm com alvo de 200 m/min, esse piso fica em **Ø5,3 mm**; nela, uma fresa de
Ø0,2 mm roda a 7,54 m/min — **3,8%** do alvo. Isso é `DERIVADO` (física de corte direta), e como
depende de `n_max`, **pertence ao ambiente declarado**. No MVP entra apenas como explicação na ajuda contextual
do diâmetro, nunca como limite aplicado.

**Faixas das famílias de furação — decisão do Mestre, 03/09/2026.** A R8 voltou sem faixa publicada
nos dois territórios, e o Mestre decidiu **não caçar o número**: cada geometria de furação entra com
um valor de partida razoável, **editável pelo operador** em Configurações, com o aviso de pedir os
números ao fornecedor da ferramenta (`ESCOPO_CONFIGURACOES` §2.2).

| Geometria | Mínimo | Máximo |
|---|---|---|
| Broca helicoidal, aço rápido ao cobalto | 0,5 mm | 25 mm |
| Broca helicoidal, metal duro | 2,0 mm | 20 mm |
| Broca de insertos (U-drill) | 12 mm | 60 mm |
| Broca de centro / spot, aço rápido ao cobalto | 1,0 mm | 16 mm |
| Broca de centro / spot, metal duro | 2,0 mm | 16 mm |
| Escareador | 4,0 mm | 40 mm |
| Alargador | 2,0 mm | 40 mm |

`DECISÃO DE PROJETO` em todas as pontas, com **uma** exceção: o mínimo do U-drill vem da tabela ISCAR
lida na R8. É o critério do Mestre — *onde houver dado de catálogo, vale o dado; onde não houver,
valem os números dele*. As ressalvas de quem escolheu cada número estão em
`construcao/MAPEAMENTO_CAMPOS_FERRAMENTAS.md` §2/FURAR, que é a fonte única desses valores.

> **A primeira linha desta tabela ganhou comportamento próprio em 05/09/2026.** A broca helicoidal de
> aço rápido ao cobalto passou a ter um **modo de cálculo de partida** — velocidade de corte própria
> (16–22 m/min, contra os 140 de fresa de metal duro), avanço como percentual da rotação, e um
> terceiro número no resultado: o **incremento** do pica-pau. Escopo completo, com o caso verificador
> e as premissas: [`ESCOPO_BROCA_ACO_RAPIDO.md`](ESCOPO_BROCA_ACO_RAPIDO.md). A faixa de diâmetro
> acima **não muda** — continua sendo esta a fonte dela.

**A faixa não é limite.** Ela dá o valor de partida do campo e o ponto de edição; fora dela o sistema
aceita a entrada e entrega o resultado (§1.1). Abaixo do mínimo quem fala é o **gatilho 11 do §9.2** —
alerta, nunca recusa. É o que o `escopo/E0` §3.3 manda, na decisão do Mestre de 27/08/2026: *"nada
neste sistema recusa entregar um resultado"* — diante do absurdo, sumir com o número esconde a
informação útil, que é o tamanho do erro.

**Requisito para a fase de construção:** o motor precisa se proteger de diâmetro zero, negativo e de
divisão por zero **por dentro**, sem recusar a entrada nem esconder o resultado. É guarda interna, não
porta fechada.

**Roscar e mandrilar continuam sem faixa declarada** — a decisão cobriu furação. O sistema aceita a
entrada e entrega o resultado (§1.1). Ver §13, L3.

### 4.5 Validação de entrada

> **Nada trava e nada é recusado — o resultado sempre sai** (`E0` §3.3, correção de 27/08). A camada
> muda o texto do aviso e a gravidade do nível, nunca se o número aparece.

| Regra | Camada | Comportamento |
|---|---|---|
| `ae > D` | **impossível** | Aceita e avisa em nível **crítico**: a fresa corta no máximo a própria largura, e o resultado descreve uma remoção que não vai acontecer |
| Valor ≤ 0 em qualquer grandeza dimensional | — | Não aceito. Não é limite: é **ausência de grandeza**, não há o que calcular |
| Furo prévio de rosca menor que o mínimo calculado | **impossível** | Aceita e avisa em nível **crítico** — o macho não entra, e a mensagem dá a diferença |
| Campo obrigatório vazio | validação | Estado vazio, campo sinalizado, bloco aberto |
| Valor absurdo (ver §9.4) | **sanidade** | Avisa, **rotulado como erro de digitação** — nunca como risco de processo |

### 4.6 Casos de borda — entradas

| Situação | Comportamento | Por quê |
|---|---|---|
| `ae` maior que `D` | Aceito, com alerta crítico de condição impossível | O número mostra de quanto passou; recusar esconderia isso |
| `ap` maior que o comprimento de aresta, **com o campo preenchido** | Aceito, com alerta crítico: a mensagem diz qual parte da profundidade não tem aresta para cortar | Aresta que não existe não corta — e o operador precisa ver o quanto falta |
| `ap` maior que o comprimento de aresta, **com o campo vazio** | Aceito, limitado só pelo teto proporcional | O sistema não inventa um comprimento que não foi informado |
| Diâmetro abaixo de Ø0,2 mm | Aceito; o resultado sai (§1.1) | O piso comercial é Ø0,2, mas o produto não proíbe o que a física permite |
| Balanço (L) menor que o diâmetro | Aceito. `L/D < 1` é a condição mais rígida possível | Nada a avisar |

### 4.7 Os dados do material — visíveis na tela, editados em Configurações

> **O que produz o número não é o nome do material — são os dados dele.** Quem entende isso deixa de
> procurar "o material certo na lista" e passa a procurar **o dado certo**, que é o que o fornecedor
> da ferramenta e a folha do aço realmente publicam.

Por isso o material não aparece só como nome e classe. Ao lado dele ficam ~~**visíveis e
editáveis**~~ **visíveis** as grandezas que entram na conta — o operador precisa saber com que
números o cálculo foi feito:

| Dado | Unidade | Onde entra no cálculo |
|---|---|---|
| **Classe ISO** | P · M · K · N · S · H | Agrupa o material; orienta a escolha de ferramenta |
| **Dureza** | HB ou HRC | Contexto da linha; é o que o operador confere contra a folha do material |
| **Força específica `kc1.1`** | N/mm² | Potência e torque (§6.7) |
| **Expoente `mc`** | — | Idem — governa como a força cresce quando o cavaco afina |
| **Velocidade de corte (vc)** | m/min | Valor de partida do `Vc` e gatilho do alerta de velocidade (§9.2) |

> **Revisão de 30/08/2026 — onde a edição mora (D2 e D5 do gabarito do protótipo).** A versão
> anterior deste bloco punha a **edição** desses valores na tela principal, ao lado do material. O
> Mestre inverteu: **ver** os valores em uso continua na tela principal — é o que deixa o operador
> conferir contra a carta do fornecedor. **Editar** esses valores, e **criar material novo** (D12),
> passa para a área "Configurações", de acesso deliberadamente fora do fluxo de cálculo. Razão dele:
> dado de material é estático e padronizado, só muda quando o fornecedor passa valor novo; deixá-lo à
> mão na tela de cálculo convida erro do operador. A navegação e o desenho dessa área são escopo de
> outra tarefa. As regras abaixo continuam valendo — as que falavam de "editar na tela" passam a
> valer **dentro de Configurações**.

**Regras:**

| # | Regra | Por quê |
|---|---|---|
| 1 | Todos os cinco são **editáveis pelo operador** — na área Configurações (D2) | O fornecedor publica esses números, e o operador pode pedi-los. Um dado melhor do que o nosso deve poder entrar sem esperar versão nova do sistema |
| 2 | O valor editado **persiste por material**, entre sessões | Ele digita uma vez o que o fornecedor mandou, e aquele material passa a valer para a oficina dele |
| 3 | ~~Todo valor editado tem **retorno ao valor de fábrica** ao lado, e existe um comando de voltar tudo~~ **jurisdição da área Configurações (D2):** o retorno ao valor de fábrica e o comando de voltar tudo continuam valendo lá; o "ao lado" era do modelo de edição na tela e vira decisão de desenho dessa área | Sem caminho de volta a edição vira armadilha |
| 5 | ~~Editar um dado **recalcula na hora**, como qualquer outro parâmetro~~ **com a edição em Configurações (D2):** ao voltar à tela de cálculo o resultado já reflete o valor novo, sem novo comando de calcular. Alimenta o **modelo vivo** (§2.5) | Modelo vivo (§2.5) |
| 6 | O sistema **não carimba o próprio dado como estimativa** | O valor está na tela: quem quiser conferir, confere. Um selo genérico de "estimado" não diz qual número é frágil nem em quanto — e, repetido em cinco linhas, ensina o operador a ignorá-lo |

**Criar material novo — a lista de 12 (§11.1) é ponto de partida, não limite** (decisão do Mestre,
30/08/2026; D12 do gabarito do protótipo). Na área Configurações, junto da edição de dado de material
(D2), o operador cria um material do zero informando as mesmas cinco grandezas: classe ISO, dureza,
força específica de corte (`kc1.1`), expoente (`mc`) e velocidade de corte (vc).

| # | Regra | Por quê |
|---|---|---|
| 7 | O material criado **persiste entre sessões**, ao lado dos 12 de partida, e o operador pode removê-lo | É a oficina dele; o que ele cadastrou é dado dele |
| 8 | Nenhum valor digitado é **recusado, truncado ou ajustado em silêncio** (`E0` §3.3, **R1**): um `kc1.1` de 50 ou de 50.000 entra como está | Uma calculadora não interroga a origem do número. O operador é a fonte dele — o catálogo do fornecedor, o ensaio, a experiência |
| 9 | Se um valor levar a resultado extremo, quem se manifesta é o **alerta** (§9), nunca um bloqueio | O resultado sai sempre; o alerta descreve a condição e situa o valor |
| 10 | Enquanto uma das cinco grandezas estiver **em branco** — ou zerada, que para uma constante é o mesmo que ausente (§4.5) — o cálculo que depende dela fica em **estado vazio**, com o campo sinalizado; os cálculos que não dependem dela seguem | Falta de grandeza é entrada incompleta, não risco de processo |

A disciplina de fonte (§0.2) — **fórmula, constante de cálculo e limiar derivado de constante física
não entram sem fonte** — é regra de quem **escreve os documentos do projeto**: impede agente e autor
de inventar constante de corte. Ela **não** governa o dado que o operador digita no produto, nem
decisão de escopo, nome, vocabulário ou limiar de julgamento de produto (decisão do Mestre,
01/09/2026).

**Exemplo de conteúdo — o que a tela de cálculo mostra** (a edição desses valores fica em
Configurações, não aqui — revisão de 30/08/2026, D2):

```
Material    Aço H13 (tratado)          classe H · 50 HRC

            Força específica   3000 N/mm²
            Expoente mc        0,25
            Velocidade         46–147 m/min

            Estes são os números que entram na conta. Para trocar
            pelos do seu fornecedor: área Configurações.
```

**Consequência que vale registrar:** este é o caminho real para fechar as lacunas de dado do produto
(§13, L12). Nenhuma rodada de pesquisa alcança o que o fornecedor entrega direto a quem compra a
ferramenta — e o operador que digita o dado do catálogo dele obtém, na hora, um resultado melhor que
o nosso.

### 4.8 Por que a profundidade de corte (ap) é campo, e a penetração de trabalho (ae) não

As duas grandezas movem o resultado de forma pesada em fresamento, e as duas continuam visíveis e
editáveis na tela. **A diferença é quem chega com o valor decidido.**

| | Profundidade de corte `ap` | Penetração de trabalho `ae` |
|---|---|---|
| O operador chega com ela decidida? | **Sim.** Nos arquivos reais de produção da fábrica ela é registrada ao lado de `S` e `F`, como parte do parâmetro | **Não.** Não foi citada entre as entradas do uso corrente |
| Onde fica | **campo de entrada** (§4.1) | **controle de ajuste fino** (§5), com valor de partida declarado |

**A penetração de trabalho não é assumida em silêncio.** Ela aparece na tela com o valor de partida,
visível e editável, e alimenta o fator de afinamento de cavaco (CTF) e a espessura de cavaco exibida
como resultado ~~e, pela espessura média, o alerta de espessura abaixo do limite do modelo (§9.2,
gatilho 1a)~~ — alerta revogado em 08/09/2026. Um campo a mais na entrada, para
um valor que o operador não tem na cabeça, custa mais do que resolve; um valor escondido custaria
muito mais.

Isso satisfaz a regra do eixo de profundidade: **nada é assumido quando errar por fator dois é
possível.** `ae` não é assumido — é mostrado.

### 4.9 A margem de segurança — lente de exibição, não campo

**Decisão do Mestre, 01/09/2026: o fator de segurança entra no MVP.** Ele estava listado como fora do
escopo em §1.3 e §12, com a razão *"só faz sentido comparado a um limite de máquina"*. A razão estava
errada: ele não mede contra limite nenhum. Por isso funciona sem perfil de máquina, que continua fora
do MVP.

> ⚠ **Modelo corrigido pelo Mestre em 01/09/2026, no mesmo dia.** A primeira redação desta seção
> descrevia uma margem que *inflava a previsão de esforço*, com padrão `+0 %` e efeito só sobre
> potência de corte (`Pc`) e torque (`Mc`). **Não é isso.**

**O que ele é:** uma **lente de exibição**. Um ajuste único e persistente, em **porcentagem do valor
calculado**, aplicado **por último**:

```
o que aparece na tela  =  resultado calculado ao vivo  ×  fator
```

Padrão de fábrica **`100 %`** — a tela mostra o resultado exatamente como as fórmulas o entregam.
Baixado para `85 %`, o painel mostra **sempre** os resultados a 85 % do calculado, até o operador
mudar de novo. É para quem quer trabalhar vendo número conservador por padrão, sem descontar de
cabeça a cada passe.

Não é campo desta seção: é **configuração persistente**, e mora na área "Configurações"
(`ESCOPO_CONFIGURACOES.md` §10). Está aqui porque muda os números que o §7 exibe.

| # | Regra | Por quê |
|---|---|---|
| 1 | **Escala** rotação (`n`), avanço da mesa (`vf`), velocidade de corte real, potência de corte (`Pc`), torque (`Mc`) e taxa de remoção (`MRR`) | São o que o operador executa na máquina e o esforço que ele dimensiona. É neles que "ver conservador" quer dizer alguma coisa |
| 2 | **NÃO escala as grandezas de verificação que disparam alerta** — espessura de cavaco (`hex`, `hm`), relação balanço/diâmetro (`L/D`), afinamento de cavaco (`CTF`) | Número e alerta sobre a **mesma grandeza** não podem discordar na mesma tela: espessura exibida escalada com alerta no valor físico mostraria uma coisa e alertaria sobre outra (§9). E espessura de cavaco reduzida por lente não corresponde a condição de corte nenhuma |
| 3 | **NÃO toca no que o operador digitou** — `ap`, `ae`, `L`, `Z`, dados do material | Entrada é dele. Lente que mexe na entrada está reescrevendo o que ele informou, não filtrando o que ele lê |
| 4 | **Na tela chama-se "margem de segurança" e aparece em `% do calculado`:** `100 %`, `85 %` | Responde direto à pergunta do operador: *"a tela está me mostrando quanto do que o cálculo deu?"*. Na fala dele, `85 %` mostrado é `15 %` de margem. Não é `0,85×` nem `−15 %` |
| 5 | **Alerta e nível de segurança NÃO acompanham a lente** | Eles descrevem o físico real calculado. Alerta que se movesse com a lente seria a lente virando limitador de segurança — e ela não é limitador |
| 6 | **Não é limitador.** Não trava, não bloqueia, não recusa. **Acima de `100 %` é permitido** | §4.5 e **R1**: nada é recusado. O sistema recomenda, o operador decide (P12) |
| 7 | **O controle é campo numérico ou passo `±`** — os mesmos `±` de rotação e avanço (§8). **Não é cursor deslizante nem barra** | Barra proporcional é anti-requisito (**R14**, brief §12): sugere escala com teto, e aqui não há teto |
| 8 | **Só aparece no resultado quando difere de `100 %`** (Z1, §2.3) | Dois resultados lidos com lentes diferentes seriam comparados como iguais. No padrão, o caso comum é a tela não mostrar nada |
| 9 | **Os `±` e o ajuste de parâmetro seguem iguais** (§8): recalculam a cadeia em precisão plena. Editando um resultado com a lente ativa, o sistema **desescala** para o valor real, recalcula, e **reaplica a lente** na exibição | O cálculo **nunca** roda sobre o valor escalado. A lente é o último passo e não realimenta a cadeia — senão o erro se compõe a cada edição |
| 10 | **Alterada, a exibição se ajusta na hora** | Modelo vivo (§2.5). Não é recálculo: a cadeia não mudou, só a lente sobre ela |

**Não é o "controle único de agressividade"** que o §12 e o brief §12 proíbem. Aquele move os
parâmetros de corte uns sobre os outros e muda **o que se executa**; este não toca em parâmetro
nenhum, tem padrão neutro, e o ajuste de cada parâmetro continua individual e no mesmo lugar
(§5). **Decisão do Mestre, 01/09/2026:** onde algum documento tratar a lente como agressividade
proibida, a decisão revoga.

**Procedência:** não se aplica. A disciplina de fonte do §0.2 vale para **fórmula, constante do motor
de cálculo e limiar derivado de constante física**. Isto é **interação de tela**, e o padrão `100 %` é
a identidade trivial *"mostra o que o cálculo deu"*. **E2** §7.1 a §7.3 é o dono do modelo.

**O exemplo trabalhado do §7.6 não muda:** ele roda na lente padrão `100 %`, então todos os números
saem idênticos e a lente não aparece no contexto do resultado.

---

## 5. Ajuste fino

### 5.1 Quais controles aparecem

Nem toda família usa os quatro. **Exibir controle que o cálculo não lê é o defeito que P3 existe para
impedir.**

| Família | Controles | Ressalva |
|---|---|---|
| **Fresar** | `Vc` · `fz` · `ae` | `ap` **saiu daqui** — virou campo de entrada (§4.1, §4.8). Continua editável, com valor de partida e retorno ao recomendado |
| **Furar** | `Vc` — e `fn` **só na broca de insertos** | nas demais brocas o avanço por rotação é derivado; um controle ali não mudaria número nenhum |
| **Roscar — macho** | `Vc` | o avanço é **imposto pela rosca** (`Vf = P × n`) e aparece como leitura travada. Vale para macho de corte e de conformação |
| **Roscar — fresa de rosca** | `Vc` · `fz` | a fresa de rosca corta o filete por interpolação helicoidal com ferramenta de vários dentes: avança **por dente** (`Vf = fz × Z × n`), como fresamento. O passo (`P`) define só o deslocamento axial por volta. Ver §6.6 e a compensação de centro da §6.11 |
| **Mandrilar** | `Vc` · `fn` · `ap` | `ap` é **derivado** de (diâmetro final − inicial) ÷ 2 — leitura travada, não controle |

### 5.2 De onde vem o valor de partida

| Controle | Partida | Confiança da partida |
|---|---|---|
| `Vc` | valor de partida do material (§11.2, `Vc_partida`) × fator do substrato (§3.5) | herda o rótulo da linha do material — em geral `SEM FONTE PUBLICADA` |
| `fz` | curva por diâmetro (§11.3) | `SEM FONTE PUBLICADA` |
| `ae` | padrão da geometria (§3.2) | `DECISÃO DE PROJETO` |
| `ap` | padrão da geometria (§3.2) — **exibido no campo de entrada**, não no ajuste fino | `DECISÃO DE PROJETO` |
| `fn` | padrão do tipo | `DECISÃO DE PROJETO` |

**Todo controle nasce no valor de partida.** Quem não mexe em nada obtém exatamente a recomendação —
é isso que torna o primeiro resultado utilizável sem configuração (§1.2).

**Não existe multiplicador por tipo de operação.** As regras antigas — acabamento = `Vc × 1,10`,
acabamento = `fz × 0,60`, endurecido = `Vc × 0,85` — foram procuradas em catálogo e resultaram
`NÃO ENCONTRADO` como regra de fabricante. A carta consultada usa aumentos maiores e específicos por
grupo, e mantém `fz` quase igual entre desbaste e acabamento (em Ø4 mm, razão 1,02). Elas saem.

### 5.3 Limites de cada controle

| Controle | Mínimo recomendado | Máximo recomendado | Passo |
|---|---|---|---|
| `Vc` | 0 | `Vc_partida do material × 1,3` | 1 m/min |
| `fz` | `max(0,002 ; fz_partida × 0,4)` | `fz_partida × 2,0` | por faixa de diâmetro |
| `ae` | 0,01 mm | **`D`** | `D ≤ 1` → 0,01 · `D ≤ 10` → 0,1 · senão 0,5 |
| `ap` | 0,05 mm | `min( 1,0 × D ; comprimento de aresta )` | 0,05 mm |

> **Mínimo e máximo são a faixa recomendada do controle, não trava** (auditoria, achado A7). O operador arrasta ou digita além da faixa e o valor **é aceito** — nada bloqueia (`E0` §3.3). É isso que torna alcançável o alerta de `Vc > 1,4 × Vc_partida` (§9.2 gatilho 4) e a sanidade em `10 ×` (§9.4): eles ficam acima do topo da faixa de propósito.

**Sobre o teto de `ap`:** a faixa publicada para desbaste convencional é `ap` de 0,5 a **1,0 × `D`**
(Guhring 3019, `CANONICO_GEOMETRIA_DE_CORTE.md` §2.1). A faixa recomendada usa a ponta alta, `1,0 × D`, para
todo diâmetro — o degrau `0,8 × D` acima de Ø6 que a versão anterior trazia **não tinha fonte** e saiu
(auditoria, achado A19). **Não é limite físico** — acima dela o valor é aceito e o resultado sai (§1.1).

**Sobre o piso de `fz` = 0,002 mm:** `DECISÃO DE PROJETO`. Não foi encontrada base de fabricante para
um piso absoluto. É a ponta baixa da faixa recomendada do controle, não uma trava — abaixo dele o
resultado sai (`E0` §3.3).

> **Revisado em 30/08/2026.** A versão anterior dizia que a faixa abaixo do piso físico "é tratada
> como alerta (§9.1)" — esse alerta era o de piso de esfregamento (§9.2 gatilho 1), **revogado por
> decisão do Mestre** (`CANONICO_LIMITES_E_ALERTAS.md` §1.1). ~~O que resta nessa faixa é o gatilho 1a
> (espessura média abaixo do limite do modelo de Kienzle).~~ **08/09/2026: o gatilho 1a também foi
> revogado — nessa faixa não resta alerta nenhum; o resultado sai sem aviso.** Ver §13, L4.

**O que o ajuste fino não faz:** nenhum controle empurra outro para satisfazer um alvo, e nenhum
corrige em silêncio a condição impossível que outro campo criou — ela vira alerta, não ajuste.

### 5.4 Voltar ao recomendado

- ~~Todo controle manual tem **retorno ao valor de partida** ao lado.~~ — **revogado em 30/08/2026 por
  decisão do Mestre (D1): a caixa de ajuste é apenas a caixa de digitar, sem botão de desfazer no campo.**
- Existe um comando único de **voltar tudo ao recomendado** — este fica.
- Para `ae` e `ap` a referência de partida é o padrão da geometria — declarado na ajuda, não uma
  recomendação que o cálculo não produz.

### 5.5 Ajuda contextual

A explicação de cada parâmetro é **parte do controle**, não uma página à parte.

| # | Regra | Por quê |
|---|---|---|
| 1 | **Nasce recolhida**; abre por um gatilho ao lado do rótulo (D9, D11) | A dúvida nasce onde o controle está, e o painel não perde o caráter de calculadora por excesso de texto |
| 2 | **Abre por clique**, nunca só ao passar o cursor | Quem navega por teclado precisa alcançar; o toque impreciso, de dedo, também |
| 3 | **Empurra o conteúdo** em vez de flutuar sobre ele | Conteúdo flutuante fecha ao interagir com o controle — exatamente o momento em que o operador quer ler |
| 4 | **Várias podem ficar abertas ao mesmo tempo** | O operador compara dois parâmetros lendo os dois |
| 5 | Fecha pelo próprio gatilho ou por tecla de escape | — |
| 6 | O estado **não** persiste entre sessões | Ajuda é consulta pontual, diferente do colapso dos blocos |

**Estrutura fixa de quatro partes.** Um parâmetro sem os quatro textos escritos **não entra na tela**
— controle sem explicação é caixa-preta com um botão.

```
Velocidade de corte (vc) — m/min

O que é       Velocidade tangencial na aresta da ferramenta durante o corte.
Ao aumentar   Usinagem mais rápida, mas desgaste prematuro e mais calor gerado.
Ao diminuir   Ferramenta mais protegida, porém pode manchar o acabamento.
Equilíbrio    Ajuste junto com o avanço por dente — material mais duro exige
              velocidade de corte menor.

Avanço por dente (fz) — mm/dente

O que é       Espessura do cavaco que cada aresta retira em cada passagem.
Ao aumentar   Maior taxa de remoção, mas risco de vibração e quebra da ferramenta.
Ao diminuir   Acabamento mais fino e menor esforço, porém reduz a produtividade.
Equilíbrio    Abaixo de um ponto a aresta deixa de cortar e passa a esfregar —
              a tela avisa quando a espessura de cavaco cai demais.

Penetração de trabalho (ae) — mm

O que é       Largura radial do corte — quanto do diâmetro está em contato.
Ao aumentar   Remove mais material por passada, mas aumenta a pressão lateral
              e a deflexão.
Ao diminuir   Menor força lateral — bom para parede fina ou ferramenta longa.
Equilíbrio    Abaixo de 50% do diâmetro a espessura real do cavaco fica menor
              que o avanço por dente, e a tela mostra o quanto.

Profundidade de corte (ap) — mm

O que é       Penetração axial da ferramenta — principal fator da taxa de remoção
              de material.
Ao aumentar   A remoção sobe proporcionalmente, e com ela a potência e o torque.
Ao diminuir   Operação mais leve — essencial quando a potência é o fator limitante.
Equilíbrio    Combine profundidade de corte alta com penetração de trabalho baixa
              para desbaste eficiente.

Avanço por rotação (fn) — mm/rot

O que é       Distância que a ferramenta avança a cada volta completa. Na furação
              o cavaco se mede por rotação, não por dente.
Ao aumentar   Fura mais rápido e quebra melhor o cavaco, mas eleva a força axial.
Ao diminuir   Menos esforço na ponta e furo mais preciso, porém o cavaco sai fino
              e tende a embolar.
Equilíbrio    Respeite o mínimo que a própria tela indica.
```

### 5.6 Casos de borda — ajuste fino

| Situação | Comportamento | Por quê |
|---|---|---|
| Operador ajusta o controle com a ajuda aberta | A ajuda **permanece aberta** | É exatamente o momento em que ele quer ler |
| Ajuda aberta dentro de bloco que o operador recolhe | Recolhe junto, e volta fechada quando o bloco reabrir | Ajuda é consulta pontual |
| `fz` levado abaixo do piso físico | **Aceito e entregue.** O alerta de piso de esfregamento foi revogado em 30/08/2026 e ~~resta o gatilho 1a se `hm` cair abaixo do limite do modelo~~ **o gatilho 1a em 08/09/2026 (§9.2) — nessa faixa não resta alerta** | O operador decide (P12); nessa faixa o sistema não avisa mais |
| `ae` levado ao valor de `D` | Aceito, com o alerta de rasgo cheio ativo (§9.2) | Rasgo cheio é condição legítima, e difícil |

---

## 6. Cadeia de cálculo

### 6.1 Ordem obrigatória

Cada passo depende do anterior. A ordem não é preferência de implementação: mudar a ordem muda o
resultado.

```
De  ->  n  ->  hm / hex  ->  Vf  ->  Q  ->  kc  ->  Pc  ->  Mc  ->  L/D
```

**O cálculo trabalha em precisão plena; o arredondamento acontece só na exibição.** Arredondar no
meio da cadeia propaga erro para todos os passos seguintes.

### 6.2 Diâmetro efetivo

Em corte raso com ferramenta de ponta curva, só uma calota corta — o diâmetro que trabalha é menor
que o nominal, e usar o nominal **superestima a velocidade**.

| Geometria | Fórmula | Validade | Confiança |
|---|---|---|---|
| **Esférica** | `De = 2·√[ap · (D − ap)]` | `0 < ap ≤ D/2` | `CONSENSO` — dois fabricantes publicam a fórmula, um deles com exemplo resolvido |
| **Topo reto / pastilhada com `κ`** | `De = D` quando as arestas são retas e perpendiculares | — | `DERIVADO` |
| **Toroidal (raio de canto)** | `De = D − 2r + 2·√[ap · (2r − ap)]`, para `ap < r` | `ap < r` | ⚠ `NÃO VERIFICADO` — ver abaixo |
| **Chanfradeira / cônica** | `De = (Dmin + Dmax)/2` — diâmetro médio da faixa cônica que corta | — | `NÃO VERIFICADO` — regra de projeto |

> ⚠ **A fresa toroidal está em aberto.** A fórmula acima está registrada no projeto, mas a
> verificação em fonte primária **não** a alcançou: a família de catálogo que parecia equivalente
> usa uma grandeza (o círculo inscrito da pastilha) que **não existe** em fresa inteiriça toroidal.
> **Não extrapolar.** Enquanto a fórmula não fechar, a toroidal em `ap < r` dispara o **gatilho 10
> do §9.2** — a fórmula do diâmetro efetivo não foi confirmada para essa geometria. Ver §13, L1.

**Exemplo que fecha a regra da esférica**, reconstruído de um caso publicado (Ø20, `ap` 1 mm, 2
arestas, 150 m/min):

| Passo | Conta | Resultado | Publicado |
|---|---|---|---|
| `De` | `2·√(1 × 19)` | 8,7178 mm | — |
| `n` pelo **nominal** | `150000/(π×20)` | 2 387 rpm | ✗ |
| `n` pelo **efetivo** | `150000/(π×8,7178)` | **5 477 rpm** | **5 500** ✓ (0,4%) |
| `Vf` | `5500 × 2 × 0,2` | **2 200 mm/min** | **2 200** ✓ |

Errar isso erra a rotação por **2,3×** numa Ø10 com `ap` de 0,5 mm.

### 6.3 Rotação

```
n = Vc × 1000 / (π × De)          [rpm]
```

`CONSENSO` — três fabricantes independentes instruem a usar o diâmetro **efetivo** para a velocidade
real, e o exemplo da §6.2 reproduz um caso publicado em 0,4%.

> **Armadilha registrada:** o bloco de fórmulas gerais de um dos guias traz `n = Vc·1000/(π·Dc)`, com
> o diâmetro **nominal**. É a fórmula genérica, escrita para ferramenta de aresta reta, onde
> `Dc = De`. Quem implementar lendo só aquela página erra a rotação em fresa esférica por 2,3×.

### 6.4 Espessura de cavaco

Quando a penetração de trabalho (ae) é menor que metade do diâmetro, cada aresta entra e sai do material antes
de atingir a espessura máxima teórica. A espessura real fica **menor** que o avanço por dente (fz).

**Espessura máxima**, para `ae/D < 0,5`:

```
hex = fz × 2 × √( ae/D − (ae/D)² )
```

**Espessura média** (é ela que entra na força específica — §6.7):

```
hm = fz × sin κ × (2·ae/D) / arccos(1 − 2·ae/D)
     [arccos em radianos; κ = ângulo de posição]
```

Para `ae/D ≥ 0,5`, o fator é 1,0 e `hex = fz`.

| Grandeza | Confiança |
|---|---|
| Forma de `hex` | `CONSENSO` — dois fabricantes publicam exemplo resolvido que a reproduz; um deles com tabela de fatores conferida ponto a ponto |
| Gatilho em `ae < 50% D` | `CONSENSO` — geometria e tabela publicada concordam |
| Forma exata de `hm` | `DERIVADO`, com o limite ancorado em valor publicado |
| Razão `hex/hm → 2` | `CONSENSO` — derivação assintótica e publicação de fabricante |

**A fórmula simplificada `fz × √(ae/D)` está eliminada.** Ela não é uma alternativa: é a conversão
para espessura **média** sendo usada como se fosse para a máxima. Em `ae/D = 10%` ela dá fator 3,162
contra 1,667 da exata — **+90% no avanço**; em `ae/D = 20%`, **+79%**. Sempre para o lado que
quebra ferramenta. **Os dois territórios chegaram a 79% em `ae/D = 20%` de forma independente**
(`pesquisa/RESPOSTA_R2.md` linha 538 · `RESPOSTA_R2_B.md` linha 300 · `VALIDACAO_R2.md` item 3, que
fecha a razão 2,236/1,250 = 1,789). O **+89,7%** em `ae/D = 10%` está em `RESPOSTA_R2_B.md` linha
291, com os mesmos dois fatores citados acima. *A versão anterior deste parágrafo juntava os fatores
de 10% com o percentual de 20% — corrigido em 29/08/2026, issue #3.*

**Fator de posição**, onde a geometria tem ângulo `κ` (alto avanço, faceador): `hm = fz × sin κ`, e a
conversão inversa `fz = hm / sin κ`. `CONSENSO` — a tabela publicada de fatores confere ponto a
ponto.

### 6.5 A trava de entrada — a regra que evita o erro de 2,3×

> **Se a entrada é uma espessura de cavaco alvo, converta em avanço.
> Se a entrada é um avanço por dente de catálogo, não converta nada.**

No MVP, o campo do ajuste fino é **`fz`, o avanço por dente programado**. Portanto:

1. `Vf` sai direto de `fz × Z × n`. **Nenhuma correção é aplicada por cima.**
2. A espessura `hex` resultante é **calculada e exibida** como resultado útil (§7.2). *(O alerta de
   piso de esfregamento que marcava `hex` muito baixo foi revogado em 30/08/2026 — §9.2.)*

**Por que não compensar automaticamente:** compensar exige saber que o valor informado é espessura, e
não avanço. Aplicar a conversão sobre um avanço de catálogo programa até **2,3×** o valor correto em
fresa Ø10 com `ap` de 0,5 mm. O sistema mostra o efeito e deixa a decisão com quem opera (P12) — que
é a razão de o controle de `fz` estar na tela.

*A compensação automática pode voltar depois, como modo explícito, com o campo declarando se o que
foi digitado é espessura ou avanço. Não neste MVP.*

### 6.6 Avanço da mesa

| Família | Fórmula | Observação |
|---|---|---|
| Fresar | `Vf = fz × Z × n` | `Z` é obrigatório (§4.2) |
| Furar / Mandrilar | `Vf = fn × n` | sem `Z` — a furação mede por rotação |
| Roscar — **macho** (geometrias 14, 15) | `Vf = P × n` | **travado no passo**; não é editável |
| Roscar — **fresa de rosca** (geometria 16) | `Vf = fz × Z × n` | avança **por dente**, `Z` padrão 3 (§3.2). É o `Vf_periferia` que entra na compensação de centro da §6.11 — não confundir com o macho |

### 6.7 Força específica de corte — Kienzle

```
kc = kc1.1 × hm^(−mc)          [N/mm²]
```

**A espessura que entra em fresamento é a média (`hm`), não a máxima.** `CONSENSO` — **três** fabricantes publicam
a definição do `kc1.1` sobre a espessura média, e um deles declara a condição por extenso: *o valor
vale para `ap` = 1 mm e `hm` = 1 mm, e com `mc` é convertido para os valores correntes*. Do lado
acadêmico, prova por integração: usar `hm` erra 2–4%; usar `hex` erraria **+45% a +82%**.

**Na furação (R8, emenda B5, M1, D2):** a espessura de cavaco que alimenta Kienzle é a espessura não deformada `h`, calculada a partir do avanço por rotação (`fn`) e do ângulo de ponta (`σ`), sem depender de penetração radial (`ae/D`):
```
h = (fn / z) · sin κ            [mm]
κ = σ / 2                       [ângulo de posição = metade do ângulo de ponta da broca]
z = 2                           [broca helicoidal de duas arestas principais]
kc = kc1.1 · h^(−mc)            [N/mm² — Kienzle alimentado diretamente por h]
```
Esse é o elo direto entre `fn` e `kc` na cadeia de furação (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.1).

**A espessura que decide os dois limiares abaixo é a média `hm` (em fresamento)** — a que entra em Kienzle —, não a máxima `hex` (auditoria, achado A6). Em penetração baixa `hex/hm → 2`, e gatilhar em `hex` faria o alerta aparecer só quando o `hm` real já caiu à metade do limiar. ~~*(Em furação o regime `h < 0,1 mm` é o normal e o alerta correspondente fica desligado — ver §9.2 gatilho 1a).*~~ **08/09/2026: o alerta de espessura foi revogado em todas as famílias (§9.2); o parágrafo acima descreve o limiar de validade do modelo, que continua valendo no cálculo.**

**Piso de espessura no modelo:** `hm = 0,02 mm`. `DECISÃO DE PROJETO` — os dois territórios afirmam
com todas as letras que é decisão de engenharia, não achado. Abaixo dele o `kc` é congelado no valor
do piso.

**Limite de validade do modelo: `hm = 0,1 mm`** (Q28, 27/08/2026). Abaixo de `0,1 mm` o par
`(kc1.1, mc)` não é transferível para a faixa — o `mc` efetivo cresce quando `hm` cai —, e a força
passa a ser calculada com constante fora do ajuste. O resultado continua saindo (nenhum número novo é
inventado) ~~, e o **gatilho 1a do §9.2** avisa que a espessura média está abaixo do limite do
modelo~~ — **e sai sem aviso: o gatilho 1a foi revogado em 08/09/2026 (§9.2).** O limite de validade
continua descrito aqui como propriedade do modelo; o que saiu foi o alerta na tela.
Declarar uma banda de erro maior exigiria dizer **quanto** maior, e esse número não existe em fonte.

**Condição de validade das constantes:** os valores de catálogo pressupõem ângulo de saída de **+6°**.
A correção por grau de diferença está entre **1%/grau e 1,5%/grau** — `SEM CONSENSO`, dois fabricantes
de um lado, um fabricante e duas linhas acadêmicas do outro. Numa fresa inteiriça com ângulo entre 6°
e 15° a diferença entre as duas taxas vale **4,5%** no `kc`. **Não é aplicada no MVP.**

**O par não é transferível entre faixas de espessura.** Dois pares medidos para o mesmo aço de baixo
carbono concordam em 6% onde foram ajustados e divergem **105%** em `h = 0,02 mm`.

### 6.8 Taxa de remoção

| Família | Fórmula |
|---|---|
| Fresar | `Q = (ap × ae × Vf) / 1000`  [cm³/min] |
| Furar | `Q = (D × fn × Vc) / 4`  [cm³/min] |
| Mandrilar | `Q = π · (D_final² − D_inicial²) · fn · n / 4000`  [cm³/min] |

No furar, o `/4` não é constante empírica: condensa a área do furo (`π·D²/4`), o cancelamento do `π`
contra a fórmula de `Vc` e a conversão mm³→cm³, tudo de uma vez.

**Mandrilamento remove uma coroa circular (R8, emenda B4, M3):** A fórmula calcula o volume do anel exato entre o diâmetro inicial e o final (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.12), com forma equivalente `Q = vc · ap · fn · (1 − ap/Dc)` onde `ap = (D_final − D_inicial)/2` e `Dc = D_final`. A fórmula da furação **não pode ser reaproveitada** para mandrilamento: ela ignora o furo prévio e superestima a remoção de **5,8× a 23×** em passadas reais de acabamento.

### 6.9 Potência e torque

```
Pc = (Q × kc) / 60000          [kW]   -- potência NA ARESTA
Mc = 9549 × Pc / n             [N·m]
```

**O MVP exibe `Pc`, a potência na aresta, e rotula assim.** A potência no motor exige o rendimento da
máquina, que é ambiente declarado (§1.3).

> **Armadilha de rótulo — regra dura.** Os fabricantes usam o mesmo nome para coisas diferentes: três
> de quatro colocam o rendimento no denominador, com três nomes distintos, e só um separa
> explicitamente potência na ferramenta de potência no motor. Rótulo ambíguo aqui vira erro de fator
> `1/η`, e a faixa de rendimento publicada abre **50%** entre os extremos. Por isso o rótulo na tela
> é obrigatório e explícito, não decoração.

**O torque sai de `Pc`, nunca da potência no motor** — usar a segunda infla o torque em `1/η`.
`CONSENSO` entre os dois territórios.

### 6.10 Relação balanço/diâmetro (L/D)

```
L/D = balanço / diâmetro
```

As duas relações que governam o comportamento, ambas conferidas:

```
deflexão      ∝ (L/D)³ × 1/D
estabilidade  ∝ 1 / ( D × (L/D)² )
```

Os expoentes são **diferentes**, e nenhuma é função da outra — por isso deflexão e balanço são
indicadores separados: um não substitui o outro.

Consequências numéricas, que alimentam o texto do alerta: passar `L/D` de 3 para 4 aumenta a deflexão
em **137%**; de 3 para 5, **363%**; de 3 para 6, **700%**. Uma fresa de 3 mm flete **6,7×** mais que
uma de 20 mm no mesmo balanço relativo.

**A deflexão em micrômetros não é exibida no MVP** — ver §12.

### 6.11 Fórmulas específicas por família

| # | Grandeza | Fórmula | Confiança |
|---|---|---|---|
| 1 | Comprimento da ponta da broca | `Lp = (D/2) × tan(90° − ângulo/2)` | `DERIVADO` |
| 2 | Tempo de furo | `t = (L + Lp) / Vf` | `DERIVADO` |
| 3 | Furo prévio, macho de corte | `Ø ≈ D − P` | `NÃO VERIFICADO` — registrado no projeto, não conferido em norma; onde diverge da tabela §11.4, vale a tabela |
| 4 | Furo prévio, macho de conformação | `Ø ≈ D − P/2` | `NÃO VERIFICADO` — idem |
| 5 | Furo por engajamento de crista | `Ø = D − (%/100) × P × 1,0825` | `NÃO VERIFICADO` |
| 6 | Compensação da fresa de rosca | `Vf_centro = Vf_periferia × (D_rosca − D_fresa) / D_rosca` | `DERIVADO` |
| 7 | Profundidade no mandrilamento | `ap = (Ø_final − Ø_inicial) / 2` | `DERIVADO` |
| 8 | Rugosidade teórica | `Ra = f² / (8 × rε) × 1000` [µm] | `NÃO VERIFICADO` |
| 9 | Altura de crista, acabamento 3D | `h ≈ ae² / (8R)`, e `ae ≈ 2√(D·h)` | `CONSENSO` — três fontes acadêmicas independentes com DOI |

**Sobre a altura de crista (item 9):** em acabamento 3D com ferramenta de ponta curva, quem controla
a rugosidade é o **penetração de trabalho**, não a profundidade — e a relação **não é** um percentual
constante de `D`: `ae/D ≈ 2√(h/D)`, cresce com a raiz. A sensibilidade é alta: um erro de 10% em `ae`
produz ~21% de erro na altura resultante. **No MVP a altura de crista é resultado exibido, não
entrada** — um campo de altura alvo pertence a uma etapa posterior (§12).

**As três regras antigas de `ap` em acabamento saem** (`0,20×D`, `0,30×D`, `0,50 mm fixo`). Três
fabricantes independentes concordam que **nenhuma delas está correta**: em Ø10 elas dariam 2,0 / 3,0
/ 0,5 mm, contra ~0,2–0,5 mm da prática de catálogo para acabamento de parede convencional — e
10–20 mm na estratégia de contorno de alta velocidade, uma diferença de **20–40×** entre modos.

**Não existe seletor de estratégia** (Q17, 27/08/2026). A função do sistema é calcular e mostrar o
resultado — quem decide usar, ajustar ou só analisar o parâmetro é o operador. O `ap` é controle do
operador, com partida no valor padrão da geometria; a ajuda do campo diz **de onde vem** esse valor
de partida, sem afirmar nada sobre estratégia.

---

## 7. Resultados

> **Nenhum resultado visual sem função.** Um número só aparece se alimentar uma validação ou uma
> decisão do operador. O corolário incomoda mas é necessário: grandeza que o sistema calcula e não
> exibe também não deveria ser calculada — cálculo silencioso é peso morto que ninguém revisa porque
> ninguém vê.

### 7.1 Os dois números de comando

São os que o operador digita na máquina. Recebem o destaque da tela e são **editáveis** (§8).

| Grandeza | Unidade | Casas | Função |
|---|---|---|---|
| **Rotação `n`** | rpm | inteiro | O que se programa no eixo-árvore |
| **Velocidade de avanço da mesa `vf`** | mm/min | inteiro | O que se programa no deslocamento |

Sem perfil de máquina, eles **não** trazem "% do limite" — não há limite declarado contra o qual
medir (§1.3).

### 7.2 Resultados úteis

Não vão para a máquina; dizem se o passe é viável e o que está acontecendo na aresta.

| Grandeza | Unidade | Casas | Por que está na tela |
|---|---|---|---|
| **Velocidade de corte real `vc`** | m/min | 1 | Depois de arredondar a rotação, a velocidade efetiva difere da pedida — e em ponta curva ela é calculada sobre o diâmetro efetivo (De) |
| **Espessura de cavaco `hex`** | mm | 3 | É o que a aresta enxerga. Em penetração de trabalho (ae) baixa fica bem abaixo do avanço por dente (fz) ~~, e a espessura média que dela decorre alimenta o alerta de espessura abaixo do limite do modelo (§9.2, gatilho 1a)~~ — alerta revogado em 08/09/2026 |
| **Fator de afinamento de cavaco `CTF`** | × | 2 | Quanto a espessura real difere do avanço por dente. **Só aparece quando `ae < D/2`** — mostrar "1,00×" ocupa espaço para dizer que nada aconteceu |
| **Taxa de remoção de material `MRR`** | cm³/min | 1 | Mede a produtividade do passe e é a base direta da potência de corte |
| **Potência de corte na aresta `Pc`** | kW | 2 | Diz o esforço que o passe exige. **Rotulada como "na aresta"** (§6.9) |
| **Torque `Mc`** | N·m | 1 | Em passe de baixa rotação, a máquina pode ter potência e ainda assim parar por falta de torque |
| **Relação balanço/diâmetro `L/D`** | — | 1 | Rigidez do conjunto montado; é o que o campo de balanço (L) produz |
| **Altura de crista** | µm | 1 | Só em ponta curva, onde ela é a medida real do acabamento |
| **Tempo de furo** | min | 2 | Só na família furar |
| **Furo prévio** | mm | 2 | Só na família roscar — é o número que decide se a rosca é possível |

### 7.3 O que vai acontecer — a previsão de comportamento

> **Sucesso, para quem usa, não é um número. É a ausência de evento.** Perguntado como sabe que
> acertou, o operador não cita valor nenhum: cita a ferramenta cortar, não quebrar, não fazer barulho
> excessivo, não vibrar, não aquecer de forma anormal e não gastar antes do previsto.

Um par rotação/avanço sem previsão de comportamento é mais um palpite com aparência melhor. Este
bloco traduz o que a cadeia de cálculo já sabe **para a linguagem dos sinais que o operador usa para
julgar**.

**A regra que o governa: só entra condição que a cadeia de cálculo sustenta, com a grandeza que a
disparou nomeada.** Frase genérica sobre usinagem não entra — ela ensina o operador a ignorar o
bloco, que é o oposto do que ele existe para fazer.

| Sinal previsto | O que o dispara | Grandeza |
|---|---|---|
| ~~**Vai esfregar em vez de cortar, e a aresta morre por falta de carga**~~ | **Revogado 30/08/2026** — o alerta de piso de esfregamento saiu (§9.2 gatilho 1); a faixa de espessura média baixa fica com o gatilho 1a | ~~`hex`~~ |
| **Vai vibrar** | relação balanço/diâmetro (L/D) acima do limiar da família | `L/D` (§7.2) |
| **Vai exigir força que a aresta pode não aguentar** | espessura de cavaco muito acima da faixa, ou rasgo cheio | `hex` · `ae/D` |
| **Vai pedir torque alto em rotação baixa** | torque acima da faixa usual para o diâmetro | `Mc` (§7.2) |
| **Vai aquecer** | velocidade de corte acima da janela do par material × substrato | `Vc` real (§7.2) |
| **Vai render pouco para o esforço** | taxa de remoção baixa para a potência de corte (`Pc`) que o passe exige — `Pc` é a potência **na aresta**, não a da máquina | `Q` e `Pc` (§7.2) |

**Cada sinal traz a grandeza que o produziu.** Sem isso o bloco seria um oráculo, e oráculo é
exatamente o que a planilha da fábrica já é.

**Quando nada dispara, o bloco diz isso** — em uma linha, e sem inventar tranquilidade:

```
Nada fora da faixa. As condições verificadas estao na §7.2.
```

#### 7.3.1 O que este bloco NÃO diz — e por quê

| Não diz | Por quê |
|---|---|
| **"vai durar X% do previsto"** | O expoente `n` de Taylor por material **não foi encontrado** em fonte elegível, em duas rodadas de pesquisa. Sem ele não existe percentual honesto. **Lacuna declarada, não esquecimento** — ver §13, L13 |
| **deflexão em micrômetros** | Depende de constantes que não fecharam, incluindo a razão entre força radial e tangencial. Ver §12 |
| **previsão de vibração regenerativa** | Exige dados modais da combinação máquina + fixação + ferramenta. Seria chute com aparência de ciência |

> **A regra No Invention vale aqui inteira.** O bloco entrega o comportamento que a cadeia sustenta e
> **declara o que não sabe**. Um "vai durar 70% do previsto" sem fonte seria o defeito que este
> projeto existe para não repetir.

### 7.4 O que mexer — a direção, com o preço

> **Resolvido (28/08/2026).** A regra *"o sistema informa, não instrui"* é do **alerta** — o que o sistema empurra sem o operador pedir. Este bloco é o oposto: o operador o consulta para pedir direção. Aqui o verbo de orientação entra, em tom que ensina, com o objetivo na linguagem de quem está na máquina — não em unidade técnica. O que se perde fica na mesma linha do ganho. Ver `E4` §6.

> *"Faça isso para obter isso, mas perde aquilo."*

É a metade que falta em todo o mercado. O operador não está procurando o parâmetro ótimo — está
procurando parar de apanhar, e depois saber para onde andar.

**A regra que o governa: toda direção carrega o que se perde, na mesma linha.** Direção sem preço é
conselho, e conselho sem preço é o que produziu a tabela congelada que ele já tem.

| # | Regra | Por quê |
|---|---|---|
| 1 | Cada direção abre pelo **objetivo, na linguagem do operador** ("para usinar mais rápido"), e só então traz **o verbo de orientação, a grandeza e o alvo numérico** | É o resultado que ele reconhece; e "aumente o avanço por dente para 0,085 mm" ensina e é acionável |
| 2 | **Ganho e custo em linguagem de chão de fábrica**, não em unidade técnica, na mesma linha | "a peça fica pronta antes — ~40% mais material por minuto", não "a MRR sobe de 1,1 para 1,5 cm³/min"; o preço junto do ganho distingue direção de palpite |
| 3 | As direções saem da **mesma cadeia de cálculo** que produziu o resultado | Nenhuma regra nova, nenhuma constante nova |
| 4 | **Duas direções por vez, no máximo** | Uma tela com seis caminhos não orienta; paralisa |
| 5 | Quando há alerta ativo, **a direção que o resolve vem primeiro** | O operador que está apanhando quer sair do vermelho antes de otimizar |
| 6 | **Uma direção só pode incidir sobre uma grandeza que o operador realmente ajusta no contexto declarado** | Entradas de montagem ou geometria impostas pela peça — como balanço, diâmetro e comprimento de aresta — não são alvos de direção; são condições de contorno. Uma direção que o operador não consegue executar é, na prática, apenas um conselho; isso não atende ao propósito do painel |

> **Procedência do teto, e do alvo que não existe (09/09/2026).** O teto de penetração de trabalho
> para balanço longo — `ae ≤ 25% × D`, com profundidade axial alta — é recomendação publicada da
> Sandvik Coromant (*How to reduce vibration in milling*). **Não existe valor publicado para *quanto*
> reduzir abaixo desse teto**, e o sistema não arbitra um. Onde o alvo não tem fonte, a regra 1 se
> cumpre com o verbo, a grandeza e a **referência publicada** — e a ausência do alvo fica declarada,
> com a consequência aparecendo no recálculo. É a mesma disciplina do resto do documento: declarar o
> que não se sabe em vez de inventar número com aparência de medida.
>
> **No mandrilamento** a grandeza é a **profundidade por passe (ap)**, pelo mesmo motivo: menos
> profundidade, menos força radial. Aqui o alvo **tem fonte, e é um piso**: a profundidade de corte
> deve ficar em pelo menos **2/3 do raio de ponta** (Sandvik Coromant, *How to apply boring*),
> abaixo do que a aresta trabalha só no raio e esfrega. Raio de ponta grande e insertos wiper
> também elevam a força radial e são desaconselhados em balanço longo; o ângulo de posição próximo
> de 90° a reduz. A barra amortecida entra acima de `4 × D`, coerente com os limiares da §3.2.


**O conteúdo já existe e está escrito.** A §5.5 traz, por parâmetro, o texto de quatro partes —
*o que é · ao aumentar · ao diminuir · equilíbrio*. É a matéria-prima do trade-off. **O que muda é o
lugar:** ela deixa de viver só dentro da ajuda de cada controle e passa a aparecer como bloco de
resultado, já instanciada nos números daquele cálculo.

```
O QUE MEXER

  Para a ferramenta parar de vibrar
    Reduza a penetracao de trabalho (ae), hoje 2,5 mm — o teto
    recomendado para balanco longo e 25% do diametro (2,5 mm).
    A forca radial cai com a secao de cavaco e a deflexao cai com
    ela, sem mexer no balanco que a peca exige. Nao ha valor
    publicado para quanto reduzir: acompanhe no recalculo.
    Em troca: a taxa de remocao cai e a peca leva mais passadas.

  Para usinar mais rapido
    Aumente o avanco por dente (fz) para 0,085 mm (hoje 0,060).
    A peca fica pronta antes — cerca de 40% mais material por minuto.
    Em troca: a maquina puxa mais potencia e cresce a tendencia a
    vibrar, que ja e o problema no balanco atual (L/D 4,5).
```

#### 7.4.1 Os dois gatilhos, na mesma tela

Quem quer deixar a máquina rodando sozinha anda para um lado; quem quer extrair o máximo anda para o
outro. **Os dois veem o preço antes de andar** — e é por isso que as duas direções coexistem em vez
de o sistema escolher uma.

### 7.6 Exemplo de conteúdo

Ilustra **conteúdo e hierarquia**, não desenho de tela.

> **Cadeia refeita e alerta trocado em 29/08/2026.** Duas correções, em sequência. Primeiro, o
> exemplo anterior não se reproduzia pelas fórmulas deste documento: `hex` vinha sem o fator 2 do
> §6.4, `MRR` não fechava com o §6.8, e `Pc`/`Mc` só existiam sobre aquele `MRR`. Depois, a **R7**
> (`pesquisa/VALIDACAO_R7.md`) mostrou que o alerta que este exemplo encenava — esfregamento,
> gatilho 1 do §9.2 — **não dispara dentro do intervalo de valores do §5.3**: o piso real é de 2,2–3,6 µm, e
> `hex` de uso normal fica uma ordem de grandeza acima.
>
> **Uma entrada mudou: o balanço passou de 30 para 45 mm.** O exemplo continua sendo o caso
> difícil, com duas condições ativas, mas o alerta que ele encena passa a ser o **balanço**
> (gatilho 5) — que tem limiar publicado (§9.3), efeito derivável (§6.10) e **direção alcançável**,
> as três coisas que o gatilho 1 não tem. A cadeia está refeita na ordem do §6.1, em precisão
> plena, com arredondamento só na exibição (§7.8 r1); a substituição de cada passo está na §7.6.1.
>
> **Nota de 30/08/2026:** o gatilho 1 foi depois **revogado** por decisão do Mestre — não só
> demovido. O exemplo já não o testa; a explicação abaixo fica como registro de por que o alerta
> encenado é o balanço.

```
Aço 1045 · Fresa Toroidal Ø10 r1,0 Z4 L45 — metal duro
                                       [ ATENÇÃO ]

10 R1 Z4 L45 · metal duro

ATENÇÃO — relação balanço/diâmetro (L/D) 4,5, acima do limiar de 4,0
          da haste comum (13% acima)
          A ferramenta flete e tende a vibrar: a deflexão cresce com
          o cubo dessa relação, e a 4,5 ela é 42% maior que no limiar.
          Há mais uma condição ativa (ver abaixo).

    ROTAÇÃO                        AVANÇO DA MESA
    4 456 rpm                      1 070 mm/min

O QUE VAI ACONTECER
    A ferramenta vai vibrar.  A relacao balanco/diametro (L/D) esta em
    4,5, acima do limiar de 4,0 da haste comum — a deflexao cresce com
    o cubo dessa relacao, e a 4,5 ela e 42% maior que no limiar.
    A espessura media (hm) esta em 0,019 mm, abaixo do limite do
    modelo (0,1 mm): nessa faixa o par de constantes de forca nao e
    transferivel.
    Nada mais fora da faixa: espessura de cavaco (hex) 0,036 mm,
    torque (Mc) 0,1 N·m, 0,06 kW.

O QUE MEXER

  Para a ferramenta parar de vibrar   (resolve o alerta acima)
    Reduza a penetracao de trabalho (ae), hoje 2,5 mm — o teto
    recomendado para balanco longo e 25% do diametro (2,5 mm).
    A forca radial cai com a secao de cavaco e a deflexao cai com
    ela, sem mexer no balanco que a peca exige. Nao ha valor
    publicado para quanto reduzir: acompanhe no recalculo.
    Em troca: a taxa de remocao cai e a peca leva mais passadas.

  Para usinar mais rapido
    Aumente o avanco por dente (fz) para 0,085 mm (hoje 0,060).
    A peca fica pronta antes — cerca de 40% mais material por minuto.
    Em troca: a maquina puxa mais potencia e cresce a tendencia a
    vibrar, que ja e o problema no balanco atual.

RESULTADOS ÚTEIS
    Espessura de cavaco  0,036 mm      Afinamento de cavaco (CTF) 0,60×
    Taxa de remoção (MRR) 1,1 cm³/min  L/D 4,5
```

**O que o exemplo mostra:** os dois números de comando são o que ele digita; **os dois blocos
seguintes são a razão de o produto existir** — *"o que vai acontecer"* descreve, sem instruir, e
*"o que mexer"* orienta, porque é o que o operador foi ali buscar; os resultados úteis vêm depois,
porque verificam.

#### 7.6.1 A cadeia, passo a passo

Na ordem obrigatória do §6.1. Entradas: `D` 10 · `r` 1,0 · `Z` 4 · `L` 45 · `vc` 140 · `fz` 0,060 ·
`ae` 1,0 · `ap` 1,0 · `kc1.1` 1500 · `mc` 0,21 (§11.1, aço 1045).

| Passo | § | Substituição | Precisão plena | Exibido |
|---|---|---|---|---|
| `De` | 6.2 | toroidal com `ap = r`: a calota inteira engaja e a fórmula devolve o nominal — `10 − 2 + 2·√(1 × 1)` | 10,0 | 10,0 mm |
| `n` | 6.3 | `140 × 1000 ÷ (π × 10)` | 4 456,3384 | **4 456 rpm** |
| `hex` | 6.4 | `0,060 × 2 × √(0,1 − 0,1²)` | 0,0360000 | **0,036 mm** |
| `hm` | 6.4 | `0,060 × sin κ × (2 × 0,1) ÷ arccos(1 − 2 × 0,1)`, com `sin κ = 1` | 0,0186480 | **0,019 mm** |
| `CTF` | 7.2 | `0,036 ÷ 0,060` | 0,600000 | **0,60×** |
| `vf` | 6.6 | `0,060 × 4 × 4 456,3384` | 1 069,5212 | **1 070 mm/min** |
| `Q` | 6.8 | `(1,0 × 1,0 × 1 069,5212) ÷ 1000` | 1,0695212 | **1,1 cm³/min** |
| `kc` | 6.7 | `hm` 0,0186 abaixo do piso de 0,02 → congela no piso: `1500 × 0,02^(−0,21)` | 3 410,947 | não exibido |
| `Pc` | 6.9 | `(1,0695212 × 3 410,947) ÷ 60000` | 0,0608013 | **0,06 kW** |
| `Mc` | 6.9 | `9549 × 0,0608013 ÷ 4 456,3384` | 0,1302845 | **0,1 N·m** |
| `L/D` | 6.10 | `45 ÷ 10` | 4,5 | **4,5** |
| `vc` real | 7.2 | `π × 10 × 4 456 ÷ 1000` — sobre a rotação **já arredondada**, que é o que a máquina executa | 139,9894 | **140,0 m/min** |

> **O `vf` sai da rotação em precisão plena, não da rotação exibida.** `0,060 × 4 × 4 456,3384` =
> 1 069,5212 → **1 070**. Arredondar `n` para 4 456 antes daria 1 069 — é exatamente o que o §6.1 e
> o §7.8 r1 proíbem. A `vc` real é a única exceção, e é declarada: ela existe justamente para dizer
> o que sobra depois do arredondamento (§7.2).

**Os números do alerta e das direções, todos derivados do §6.10** (`deflexão ∝ (L/D)³ × 1/D`):

| Número exibido | Conta | Resultado |
|---|---|---|
| distância até o limiar | `4,5 ÷ 4,0 − 1` | **+13%** |
| deflexão a 4,5 contra o limiar 4,0 | `(4,5 ÷ 4,0)³ − 1` | **+42%** |
| queda da deflexão ao voltar a `L` 40 | `1 − (4,0 ÷ 4,5)³` | **−30%** |
| ganho de material da direção `fz` | `0,085 ÷ 0,060 − 1`, e `Q ∝ fz` | **+42%**, exibido como "cerca de 40%" |

**Os gatilhos, testados um a um (§9.2):**

| # | Teste | Resultado |
|---|---|---|
| ~~1a~~ | ~~`hm` 0,019 abaixo de 0,1~~ | ~~**ativo** — a espessura média está abaixo do limite do modelo (§6.7); é a segunda condição, entra na linha "há mais uma condição ativa"~~ **REVOGADO — 08/09/2026 (§9.2).** Sem ele o cenário passa a ter **uma** condição ativa (o gatilho 5), e a linha "há mais uma condição ativa" não aparece |
| 2 | `ae` 1,0 contra `0,95 × D` = 9,5 | não |
| 3 | `ae` 1,0 contra `D` 10 | não |
| 4 | `vc` 140 contra a janela 84–196 (0,6× a 1,4× da partida) | não |
| 5 | `L/D` 4,5 contra o limiar 4,0 (haste comum, §9.3) | **ativo** — ocupa a linha de alerta (maior consequência prática, §9.7) |
| 10 | toroidal com `ap` 1,0 contra `r` 1,0 | não — `ap = r`, não `ap < r` |

**Por que o alerta é o balanço, e não o esfregamento.** A versão anterior deste exemplo encenava o
gatilho 1. A **R7** (`pesquisa/VALIDACAO_R7.md`, três territórios independentes) mostrou que ele não
dispara dentro do intervalo de valores do §5.3 — e um exemplo canônico construído sobre um alerta inalcançável
ensina uma tela que ninguém verá. O gatilho **5** tem as três coisas que faltavam: limiar publicado
(§9.3), efeito físico derivável da própria cadeia (§6.10) e **direção que o resolve dentro do que o
operador controla** — exigência do §7.4 r5. ~~O gatilho **1a** continua ativo e continua sem direção
alcançável; é por isso que ele é a *segunda* condição, nunca a que ocupa a linha.~~ **08/09/2026: o
gatilho 1a foi revogado (§9.2)** — o gatilho 5 é agora a única condição ativa deste exemplo.

**Lacunas declaradas neste exemplo (§0.2 — o que não tem fonte é dito, não arbitrado):**

| # | O que falta | Consequência |
|---|---|---|
| 1 | **O limiar de `L/D` vem de um fabricante só** — e é o fabricante que vende a linha antivibratória (§9.3, `L5`) | O número entra marcado `REFERÊNCIA ÚNICA`. É frágil, mas é **publicado**, que é mais do que o piso de esfregamento jamais teve |
| 2 | **`κ` não é definido para a toroidal.** O §6.4 usa `sin κ`; nem o §6.2 nem o §3.2 dão `κ` para esta geometria, e a `L10` registra a ausência de forma fechada de `hm` em ponta curva | O exemplo adota `sin κ = 1` — aresta periférica reta, o caso geral de fresamento —, `DECISÃO DE PROJETO` declarada aqui porque move `hm` e, por ele, `kc`, `Pc` e `Mc` |
| 3 | **As casas do §7.2 achatam este regime.** `Mc` 0,1303 N·m exibe **0,1 N·m** e `Pc` 0,0608 kW exibe 0,06 kW | Consequência de **Q5** (casas fixas por grandeza, não ajustáveis), não da cadeia. Registrado para a decisão de exibição; não arbitrado aqui |
| 4 | **A altura de crista não entra.** O §7.2 a lista como resultado de ponta curva, e a toroidal `r` 1,0 é ponta curva | Continua fora do exemplo, como estava. A pergunta — 7 ou 8 resultados úteis — segue aberta e é decisão de escopo, não de cálculo |

### 7.8 Regras de exibição

| # | Regra | Por quê |
|---|---|---|
| 1 | O cálculo trabalha em precisão plena; **arredonda só na exibição** | Arredondar no meio propaga erro |
| 2 | Números em **fonte de largura fixa** | Dígito que dança quando o valor muda dificulta a leitura de um painel vivo |
| 3 | **Antes de calcular, nenhum número** — nem zero, nem traço preenchendo o formato | Zero exibido como resultado é indistinguível de um resultado real |
| 4 | **Unidade sempre junto do número** | Número sem unidade em chão de fábrica é convite a erro de ordem de grandeza |
| 5 | **Casas decimais são propriedade da grandeza**, conforme a §7.2, e **não são ajustáveis pelo operador** | Rotação com três decimais sugere precisão que o modelo não tem; uma casa a menos na espessura de cavaco esconde informação que decide o alerta |

**O disclaimer é texto fixo e permanente: o sistema recomenda, o operador decide.** Não é aviso legal
escondido no rodapé — é a declaração do papel do sistema, e sustenta toda a arquitetura de
recomendação × limite físico.

### 7.9 Casos de borda — resultados

| Situação | Comportamento | Por quê |
|---|---|---|
| Afinamento de cavaco (CTF) inativo (`ae ≥ D/2`) | O indicador de fator **não aparece** | Indicador que mostra "1,00×" ocupa espaço para dizer que nada aconteceu |
| Operador substitui um dado do material pelo do fornecedor (na área Configurações) | Ao voltar à tela de cálculo, o resultado já reflete o valor novo | O número passou a ser o dele — e é assim que uma estimativa vira dado (§4.7) |
| Resultado obtido e em seguida o operador muda um campo | Números com tratamento de desatualizado; alerta e nível de segurança **não** | Alarme ativo não se esmaece |
| Duas condições excedidas ao mesmo tempo | O alerta mostra a mais grave e **indica que há outra**; ambas sinalizadas no detalhe | Uma linha com duas ordens vira ruído |
| Operador quer copiar o resultado | **Não existe função de copiar no MVP** | O operador lê e digita. Copiar exigiria decidir formato — dois números soltos ou bloco com contexto — e um resultado copiado sem contexto não é interpretável depois. Fica para quando o uso mostrar qual dos dois é o real |

---

## 8. Edição dos resultados

O operador edita rotação e avanço direto, e o sistema recalcula o resto. É uma calculadora
bidirecional, não um relatório.

### 8.1 O que é reversível

| Editado | O sistema deduz | E recalcula |
|---|---|---|
| **Rotação `n`** | `Vc = π × De × n / 1000` | avanço, espessura de cavaco, remoção, potência, torque |
| **Avanço `Vf`** (fresar, e fresa de rosca) | `fz = Vf / (Z × n)` | espessura de cavaco, remoção, potência, torque |
| **Avanço `Vf`** (furar / mandrilar) | `fn = Vf / n` | idem, sem `Z` |
| **Avanço** (roscar — macho) | **não editável** — `Vf = P × n` é imposto pela rosca | editar a rotação move o avanço junto |

Ambas as inversões são unívocas com os demais dados fixos: não há ambiguidade nem aproximação
numérica. ~~O parâmetro deduzido passa a exibir marca de **manual**, com caminho de volta.~~ —
**revogado em 30/08/2026 por decisão do Mestre (D1): sem marca e sem botão de desfazer no campo; o
comando único de voltar tudo (§5.4) fica.**

**Requisito absoluto:** a inversão recalcula percorrendo **a mesma cadeia** do sentido direto. Uma
segunda implementação paralela diverge da primeira no dia em que alguém alterar uma sem a outra — e a
divergência aparece como dois números diferentes para a mesma condição, em telas diferentes.

### 8.2 Precedência entre edições

| Estado | Comportamento |
|---|---|
| Rotação fixada, avanço livre | O avanço é **recalculado** a partir da rotação fixada |
| Avanço fixado, rotação livre | A rotação segue o cálculo normal; o avanço permanece no valor fixado |
| Ambos fixados | Ambos permanecem. O avanço por dente resultante é deduzido dos dois |

**Princípio:** valor que o operador fixou não se move sozinho. Se mexer, ele perde a referência do
que decidiu.

### 8.3 O que não é reversível

Puxar um **resultado consolidado** — remoção, potência — para um valor desejado é um problema sem
solução única: existem infinitas combinações de parâmetros que produzem o mesmo número. Sem uma
regra, o sistema teria de escolher qual parâmetro mexer, e essa escolha é a decisão de engenharia que
pertence ao operador.

Por isso, **só rotação e avanço são editáveis**. Todo o resto é leitura.

### 8.4 Casos de borda — edição

| Situação | Comportamento | Por quê |
|---|---|---|
| Edição leva a rotação a zero ou negativo | Rejeitada. O controle não aceita | Grandeza sem significado físico |
| Edição leva o avanço por dente abaixo do piso útil | **Aceita e entregue.** O alerta de piso de esfregamento foi revogado em 30/08/2026 e ~~resta o gatilho 1a se `hm` cair abaixo do limite do modelo~~ **o gatilho 1a em 08/09/2026 (§9.2) — nessa faixa não resta alerta** | O operador decide (P12); nessa faixa o sistema não avisa mais |
| Condição impossível ativa e o operador continua editando | Controles **vivos**, resultado na tela, alerta crítico ativo com o alvo | Travar a edição sob alerta seria a mesma recusa que a `E0` §3.3 tirou do produto |
| Valor fixado passa a exigir um parâmetro fora da faixa válida | O valor fixado **permanece**. O parâmetro derivado é exibido fora da faixa e o alerta diz o que seria preciso para chegar lá — trocar o número de arestas, o diâmetro, ou soltar a fixação | Valor que o operador fixou não se move sozinho (§8.2). Soltar por conta própria apaga uma decisão que ele tomou, e ele pode não notar |

---

## 9. Alertas e nível de segurança

### 9.1 As três camadas

A camada importa tanto quanto o limiar. **Confundir validação de entrada com risco de processo treina
o operador a ignorar aviso.**

| Camada | Significado | Efeito |
|---|---|---|
| **IMPOSSÍVEL** | a montagem não realiza o que foi pedido — não é opinião | **entrega e avisa em nível crítico**, dizendo de quanto o pedido estourou |
| **ALERTA** | condição de processo que degrada o resultado | entrega e avisa, descrevendo a condição e situando o valor |
| **SANIDADE** | provável erro de digitação | entrega e avisa, **rotulado como validação de entrada** |

**Nenhuma das três bloqueia.** O resultado é sempre entregue — é uma calculadora (`E0` §3.3).

**O alerta descreve o risco e situa o valor — não instrui** (Q29 e regra geral, 27/08/2026). A mensagem
traz a grandeza medida, a referência (limiar, faixa, limite) e de quanto a distância, e descreve o
efeito físico da condição. O verbo de comando ("suba", "reduza", "divida em passes") sai; o número
factual fica. Ver `escopo/E4_INDICADORES_E_SEGURANCA.md` §1.

```
[condição]  —  [grandeza medida] contra [referência]  ([de quanto a distância])
```

### 9.2 O que dispara

| # | Gatilho | Camada | Mensagem traz | Confiança do limiar |
|---|---|---|---|---|
| ~~1~~ | ~~`hex < k × rβ` — espessura máxima abaixo do piso de esfregamento~~ **REVOGADO — 30/08/2026** (decisão do Mestre; `CANONICO_LIMITES_E_ALERTAS.md` §1.1). A fórmula de `hex` (§6.4) fica; o alerta e a constante `k` saem. Ver a nota abaixo da tabela | — | — | — |
| ~~1a~~ | ~~`hm < 0,1 mm` — espessura **média** abaixo do limite do modelo de Kienzle — **só fresamento**~~ **REVOGADO — 08/09/2026** (decisão do Mestre). O alerta de espessura sai do produto inteiro; com ele saem o recorte por família da emenda A4 e a nota "não dispara em furação", que perdem objeto. O limite de validade `hm = 0,1 mm` **continua** descrito na §6.7 como propriedade do modelo, e o cálculo de `hm` e `hex` **fica** — o que sai é o aviso na tela | — | — | — |
| 2 | `ae ≥ 0,95 × D` — rasgo cheio | ALERTA | o `ae` contra o `D`; é corte concordante e discordante ao mesmo tempo, sem saída para o calor e com risco de recorte de cavaco | `DECISÃO DE PROJETO` para o gatilho 0,95 |
| 3 | `ae > D` | **IMPOSSÍVEL** | a penetração de trabalho informada, o máximo que o diâmetro entrega, e o aviso de que o resultado descreve uma remoção que não acontece | geometria |
| 4 | `Vc < 0,6 × Vc_partida` ou `Vc > 1,4 × Vc_partida` do material (§11.2) | ALERTA | o `Vc` atual contra o valor de partida daquele material; abaixo, o cavaco adere ao gume e o acabamento piora; acima, o desgaste é térmico e a vida cai rápido | mecanismo `REFERÊNCIA ÚNICA`; os fatores 0,6 e 1,4 são `DECISÃO DE PROJETO` |
| 5 | `L/D` acima do limiar da haste (§9.3) — **só fresar e mandrilar** | ALERTA | a relação balanço/diâmetro (L/D) atual e o limiar da haste | `REFERÊNCIA ÚNICA` — um fabricante só (L5) |
| 6 | Furação sem canal interno, **profundidade do furo > 3 × D** | ALERTA | a profundidade contra o limiar de `3 × D`; acima dele o cavaco entope | `CONSENSO` — três fabricantes independentes |
| 7 | Furação com canal interno, **profundidade do furo > 30 × D** | ALERTA | a profundidade contra `30 × D`; acima disso é furação profunda dedicada, com furo-guia e pressão de refrigerante próprios | `CONSENSO` |
| 8 | Furo prévio de rosca menor que o mínimo | **IMPOSSÍVEL** | o furo mínimo, o furo informado, e a diferença | geometria |
| 9 | Macho de conformação em material frágil | **IMPOSSÍVEL** | que o material informado não conforma, e a lista dos que não conformam | `NÃO VERIFICADO` — registrado no projeto |
| 10 | Fresa toroidal com `ap < r` — profundidade de corte menor que o raio da ponta | ALERTA | a `ap` e o raio `r`; a fórmula do diâmetro efetivo não foi confirmada para esta geometria, e o resultado pode estar errado | lacuna declarada — §13.1 `L1`, não limiar publicado |
| 11 | Diâmetro abaixo do mínimo da geometria (§4.3) — **só nas geometrias de furação**, que são as que têm faixa declarada | ALERTA | o diâmetro informado, o mínimo daquela geometria, e **o que a conta produziu** — é o número absurdo que informa | `DECISÃO DE PROJETO` — a faixa é do Mestre (§4.3), não de catálogo, salvo o mínimo do U-drill |

**Sobre a redação do gatilho 11:** a mensagem diz que **o diâmetro está abaixo da faixa em que aquela
geometria é fabricada** — nunca *"a ferramenta não existe"*. O nível é **ALERTA**, não `IMPOSSÍVEL`:
`IMPOSSÍVEL` é para o que a montagem não realiza (gatilho 3, `ae > D`), e uma broca de Ø0,3 mm é rara,
não impossível — a matemática fecha e o resultado sai. Mesma mecânica do gatilho 3 no que importa:
entrega o número e nomeia a condição.

> 🚫 **Gatilho 1 revogado — decisão do Mestre, 30/08/2026.** O alerta de piso de esfregamento
> (`hex < k × rβ`) saiu do produto, junto com a constante `k` e a razão `hmin/rβ`. Contexto no
> canônico `CANONICO_LIMITES_E_ALERTAS.md` §1.1: com o `rβ` de fresa inteiriça na ordem de **10 µm**
> (R7, 29/08/2026), o piso resultante ficou em **2,2–3,6 µm** — inalcançável dentro do intervalo do
> §5.3, portanto praticamente inativo; a razão veio de micro-fresamento; e nenhum fabricante publica
> piso em milímetros — o mercado previne o esfregamento entregando `fz` já corrigido por `ae/D`, em
> vez de avisar depois.
>
> **Não confundir:** a fórmula de afinamento radial de `hex` (§6.4) **permanece** no cálculo.
> ~~e o gatilho **1a** (espessura média abaixo do limite do modelo de Kienzle) **continua ativo**.~~
> **08/09/2026:** o gatilho 1a também foi revogado — nenhum alerta de espessura resta no produto.

### 9.3 Limiares de balanço por família e tipo de haste

| Família | Tipo de haste ou adaptador | Avisa acima de |
|---|---|---|
| Fresar | Fresa ou haste comum | **4 × D** |
| Fresar | Adaptador amortecido | **8 × D** |
| Mandrilar | Barra de mandrilar comum | **4 × D** |
| Mandrilar | Barra amortecida de aço | **10 × D** |
| Mandrilar | Barra amortecida com reforço de metal duro | **14 × D** |

`REFERÊNCIA ÚNICA` — os cinco vêm de **um fabricante só**, e é o fabricante que vende a linha
antivibratória; há interesse comercial em publicar balanço alto (L5).

**Aplicabilidade por família — quem for implementar lê isto, não deduz:**
- **Fresar:** alerta de balanço **ativo**, limiares da tabela acima.
- **Mandrilar:** alerta de balanço **ativo**, limiares da tabela acima.
- **Furar:** **sem alerta de balanço.** Vale a regra própria de furo profundo (§9.2 gatilhos 6 e 7): broca sem canal interno acima de `3 × D`, broca com canal interno até `30 × D`. Um `L/D` alto de broca **não** dispara alerta de balanço.
- **Roscar:** **sem alerta de balanço** — nem ativo, nem como lacuna. Não há limiar de `L/D` para macho de corte, macho de conformação ou fresa de rosca.

**Nenhum deles bloqueia.** O bloqueio antigo em `L/D > 6` sai: os limiares proíbem produto que existe
em catálogo — adaptador amortecido trabalha em 7–8×D, barra amortecida em 10×D, barra reforçada em
14×D, broca de canal interno até 30×D sem pica-pau. Existe **um** limiar de confirmação explícita com
fonte citável (6×D em fresamento com haste comum, que casa com o balanço máximo publicado de uma fresa
de encaixe), mas ele **não entra no MVP**: E0 §5.4 não admite recusa de cálculo por limite de
ambiente.

### 9.4 Sanidade

Dispara em `Vc < 0,1 × Vc_min` ou `Vc > 10 × Vc_max`, e em valores dimensionais absurdos. É
**validação de entrada** e precisa ser rotulada como tal, para não se confundir com risco de
processo.

### 9.5 O que foi retirado, e por quê

| Regra que saiu | Por quê | Confiança da queda |
|---|---|---|
| `ae/D < 10%` dispara aviso crítico | 5–20% é **estratégia recomendada**, não anomalia. Dois fabricantes prescrevem trabalhar nessa faixa. O risco real não é a penetração de trabalho: é a espessura de cavaco (hex) cair abaixo do raio de aresta (rβ) ~~— que é o alerta 1~~. *(O alerta de piso de esfregamento que ocupava esse lugar foi revogado em 30/08/2026; ver §9.2.)* | `CONSENSO` |
| Janela global de `Vc` (50–1000 m/min) | Não existe faixa universal. A amplitude legítima cobre cerca de **600×** entre extremos; há caso publicado de 3000 m/min em alumínio fundido, com mais de 10.000 peças | `CONSENSO` |
| Bloqueio por `L/D > 6` | §9.3 | `REFERÊNCIA ÚNICA` |
| Referências fixas de taxa de remoção (50 / 20 / 5 cm³/min) | Não existem em fonte nenhuma, após varredura de nove fabricantes. Duas operações igualmente legítimas de desbaste variam por fator **38×** — 413 cm³/min num faceamento publicado contra 10,8 num trocoidal com fresa pequena. Um medidor que dá nota alta para fresa grande e nota baixa para fresa pequena não mede produtividade: mede diâmetro de ferramenta | `NÃO ENCONTRADO` |
| Índice de saúde 0–100 | Não tem fórmula com fonte, e consolida grandezas de naturezas diferentes num número que o operador aprende a ignorar | — |

### 9.6 Precedência e uma orientação por vez

```
CRÍTICO  >  ATENÇÃO  >  NORMAL
```

Três níveis, e **nenhum deles impede o resultado**. `CRÍTICO` é a condição impossível; `ATENÇÃO`, a
de processo; `NORMAL`, nada ativo. Ver `E4` §2.

A linha de ação apresenta **uma** orientação, escolhida pela condição mais grave ativa. Empilhar
recomendações contraditórias — "reduza a profundidade" junto de "aumente o engajamento" — paralisa em
vez de orientar. Havendo outra condição ativa, a linha **indica que existe**, sem detalhá-la ali.

### 9.7 Casos de borda — alerta

| Situação | Comportamento | Por quê |
|---|---|---|
| Duas condições de mesma gravidade | Exibe a de maior consequência prática e indica que há outra | Uma linha com duas ordens é lida como ruído |
| A distância até a referência é grande demais para um ajuste de parâmetro fechar | A mensagem **diz de quanto é a distância mesmo assim** (*"a relação balanço/diâmetro está em 12, o triplo do limiar de 4,0 — nenhum ajuste de corte traz de volta"*), sem instruir — descreve (§9.1) | O tamanho da distância é a informação: quando é grande demais para o ajuste fino resolver, isso mesmo é o que o operador precisa ver — o problema não está no parâmetro |
| Nenhuma condição ativa | A zona mostra a condição normal, **não fica vazia** | Zona que some e volta faz o painel saltar |

---

## 10. Estados do painel

| Estado | Comportamento | Exemplo de conteúdo |
|---|---|---|
| **Vazio** | Nenhum número, nenhum indicador, nenhum horário. Uma chamada curta orienta a ação | `Escolha o material e a ferramenta, depois calcule.` |
| **Desatualizado** | Os **números** recebem tratamento de desatualizado. Alerta e nível de segurança **não** | — |
| **Crítico** | Mostra a razão, o valor medido e o limite — e o resultado continua na tela | `CRÍTICO — penetração de trabalho (ae) 12 mm em fresa Ø10. A fresa corta no máximo 10 mm: o número abaixo descreve uma remoção que não vai acontecer (2 mm sem aresta).` |
| **Material recém-criado** | Entra na lista ao lado dos 12 de partida, selecionável na hora. Sem tratamento visual especial — é um material como qualquer outro (§4.7) | — |
| **Material com grandeza em branco** | O cálculo que depende da grandeza faltante fica em estado vazio; campo sinalizado, bloco aberto (§4.5). Os cálculos que não dependem dela seguem. **Não bloqueia** | `Informe a força específica de corte (kc1.1) para calcular a potência.` |
| **Material criado com valor que leva a resultado extremo** | O resultado sai (R1). O alerta (§9) descreve a condição e situa o valor — nenhum bloqueio, nenhum ajuste em silêncio | — |

**Não existe estado "estimado".** O sistema não carimba o próprio dado como duvidoso: ele **mostra o
número que está usando** (§4.7). Quem vê a força específica e a velocidade na tela consegue conferir
contra a carta que tem na mão — o que um selo de "estimado" nunca permitiu fazer.

### 10.1 Movimento e feedback

O movimento comunica mudança de estado; nunca decora.

| Evento | Sinalização |
|---|---|
| Mudança de nível de segurança | Movimento proporcional à gravidade — a transição para condição crítica é mais insistente que para condição segura |
| Comando de cálculo acionado | Confirmação visual curta de que o cálculo rodou — um *check* (D10). Sem ela, o operador aciona duas vezes |
| Resultado novo | Perceptível sem exigir que o operador procure o que mudou |
| Preferência do sistema por movimento reduzido | Todas as animações suprimidas; a informação passa a ser transmitida só por estado e rótulo |

### 10.2 Acessibilidade e ambiente de fábrica

| Requisito | Definição |
|---|---|
| **Alvo de toque** | Generoso em todo controle, inclusive gatilhos de ajuda — a tela é tocada em pé, na máquina, com toque impreciso (dedo, teclado ou ponteiro) |
| **Contraste** | Suficiente para leitura em oficina, com iluminação irregular |
| **Foco visível** | Em todo elemento alcançável por teclado |
| **Operação por teclado** | Tudo que se faz com o ponteiro se faz pelo teclado, incluindo abrir ajuda e ajustar controles contínuos |
| **Cursor sobre o elemento** | Nunca é o único caminho para uma informação ou ação |
| **Rede** | Nenhuma requisição em tempo de uso — nem fonte, nem ícone, nem tabela |
| **Cor** | Nunca é o único portador de significado: todo estado tem também rótulo e posição |

**Por que "sem rede" é requisito e não preferência:** a oficina pode não ter conexão. Se qualquer
parte da tela depender de rede, o sistema abre diferente do que o operador conhece — ou não abre. Um
painel que muda de aparência conforme a conexão destrói a confiança que levou meses para construir.

---

## 11. Os dados do MVP

Cada linha tem fonte e confiança **próprias**. Não existe confiança por tabela.

### 11.1 Materiais — 12 linhas

`kc1.1` em N/mm². Todos os pares valem para ângulo de saída de +6° e são definidos sobre a espessura
**média** (§6.7).

**Estas 12 são a lista de partida, não um conjunto fechado.** O operador cria material novo e informa
as constantes (§4.7; D12 do gabarito do protótipo, 30/08/2026). As 12 linhas abaixo são o que o
produto traz pronto, com procedência — não o teto do que ele aceita.

| Material | ISO | Dureza | `kc1.1` | `mc` | Origem do par | Confiança |
|---|---|---|---|---|---|---|
| **Aço 1020** | P | 120–160 HB | **1500** | **0,21** | catálogo de fabricante, linha de aços não ligados e de baixa liga, encaixe por resistência (400–545 MPa) | `REFERÊNCIA ÚNICA` — ⚠ encaixe imperfeito: a linha é definida para C > 0,25% e o 1020 tem ~0,20% |
| **Aço 1045** | P | 170–220 HB | **1500** | **0,21** | mesma linha, encaixe limpo (575–740 MPa dentro de 350–750; 0,45% C abaixo do corte de 0,55%) | `REFERÊNCIA ÚNICA`, com **corroboração acadêmica independente em 3,3%** no ponto de trabalho |
| **Inox 304** | M | 140–180 HB | **1800** | **0,21** | catálogo, grupo de inox austenítico | `REFERÊNCIA ÚNICA`, com **corroboração acadêmica em 0,3%** — a convergência mais limpa da pesquisa |
| **Alumínio 6061-T6** | N | 95 HB | **600** | **0,25** | catálogo, linha de não-ferroso trabalhado e endurecido | `REFERÊNCIA ÚNICA` |
| **Aço 8620 (núcleo)** | P | 200 HB | **1570** | **0,24** | segundo fabricante, tabela indexada **por liga** | `REFERÊNCIA ÚNICA`; faixa defensável **1500–1800** |
| **Aço 8620 (cementado)** | H | 58–62 HRC | **4300** | **0,25** | catálogo, linha de aços endurecidos, faixa alta | `REFERÊNCIA ÚNICA` |
| **Aço H13 (tratado)** | H | 50 HRC | **3000** | **0,25** | catálogo, linha de aços endurecidos | `REFERÊNCIA ÚNICA` — encaixe por dureza; a faixa da linha **termina** em 50 HRC |
| **Aço P20** | P | 280–320 HB | **2000** | **0,25** | Walter *Technical Compendium — General* 2025, F 9 #3, via `Rm` 930–1095 | `REFERÊNCIA ÚNICA` — encaixe por `Rm`; o grupo de dureza publicado não cobre P20 a 280–320 HB |
| **Aço 2711** | P | 320 HB | **2000–2500** (faixa) | **0,25** | Walter F 9 #3/#5, via `Rm` 1010–1160 — a faixa atravessa duas linhas | `REFERÊNCIA ÚNICA, faixa` — equivalência normativa da designação não confirmada em nenhum território |
| **Ferro fundido GG25** | K | 200 HB | **800** | **0,28** | Walter F 9 #10, via `Rm` ≈ 250 | `REFERÊNCIA ÚNICA` |
| **Ferro fundido GGG50** | K | 220 HB | **950** | **0,28** | Walter F 9 #11, via `Rm` ≈ 500 | `SEM CONSENSO` interno à fonte — Walter dá 950 (por `Rm`) **ou** 800 (grupo K7), 16% de diferença; entra 950, o mais alto, conservador na potência — editável |
| **Titânio Ti-6Al-4V** | S | 340 HB | **1500** | **0,25** | Walter F 9 #23 (grupo S7/S8) | `REFERÊNCIA ÚNICA` — ressalva: um estudo acadêmico mede `kc` ≈ 1775 N/mm² num ponto (~20% acima), sem reportar o par `(kc1.1, mc)` |

**O que mudou, e o quanto muda no número que o operador vê.** Os três pares antes marcados como
"validados" saíram: eles eram atribuídos a um livro-texto sem edição digital acessível, e nenhum dos
dois territórios de pesquisa conseguiu confirmá-los. Não é erro provado — é **validação não
reproduzida**. Os que entram vieram de catálogo verificado em fonte primária **e** têm corroboração
acadêmica independente no ponto de trabalho:

| Material | Efeito da troca em `h` = 0,05 | em `h` = 0,1 | em `h` = 0,2 |
|---|---|---|---|
| 1020 | −6,0% | −8,6% | −11,3% |
| 1045 | −18,3% | −21,4% | −24,3% |
| 304 | −9,8% | −11,3% | −12,8% |

**Consequência que importa:** a troca **atenua o salto** que a adoção da força específica variável
traria. Com o par antigo, sair de `kc` constante para a curva completa elevava a potência calculada
do 1045 em **+43%**; com o par novo, o aumento é de **+12,4%**. **As duas correções entram juntas**,
ou o operador vê um salto que a evidência não sustenta.

**Sobre o `mc = 0,75` do alumínio:** era **erro de transcrição**, confirmado de forma independente
pelos dois territórios sem que nenhum soubesse da suspeita. Um rejeitou por absurdo dimensional e
levantou que seria um `1 − mc` transcrito; o outro achou **0,25** publicado para todas as ligas de
alumínio, com máximo de 0,30 em toda a tabela de 33 linhas. `1 − 0,75 = 0,25`. As duas pontas fecham.

**Sobre os cinco materiais antes `SEM FONTE PUBLICADA` (P20, 2711, GG25, GGG50, Ti-6Al-4V) —
sincronizados com o canônico em 27/08/2026 (auditoria, achado A2).** A §11.1 e
`CANONICO_MOTOR_DE_CALCULO.md` §2.1 traziam valores diferentes para estes cinco; o par sem fonte do
MVP saiu, entrou o par de catálogo (Walter) do canônico. A precedência do §0.1 exige uma tabela só, e
o canônico é a fonte de número. Efeito no que o operador vê: potência **−43%** no titânio (o mais
divergente — `2800/0,22` → `1500/0,25`), **−16% a −36%** nos dois ferros fundidos, **~−3%** no P20,
**±10%** no 2711. Nenhum valor antigo tinha fonte — a troca é chute por número apurado. Os cinco
continuam **editáveis** (§4.7, na área Configurações): quem tem a carta do fornecedor digita a dele. Os `mc` passam a ser os
publicados por classe (0,25 no grupo P, 0,28 no grupo K), não mais o `0,20` de default.

### 11.2 Valor de partida da velocidade de corte (vc)

> **Esta é a tabela mais frágil do produto, e o documento não esconde isso.** As faixas de partida
> foram levadas às duas pontas da pesquisa — literatura e catálogo — e voltaram `NÃO ENCONTRADO` em
> **todas as linhas**. O que existe são pontos de catálogo para *grupos* de material, não para a liga.

Cada linha entra com **um valor de partida interno**; a tabela abaixo mostra, para quem constrói e
para quem fecha as lacunas, o ponto de catálogo comparável onde ele existe:

| Material | Partida interna (m/min) | Ponto de catálogo comparável | Divergência |
|---|---|---|---|
| Aço 1020 | 180 | grupo aço carbono < 32 HRC: **76–122** | partida **47–137% acima** |
| Aço 1045 | 140 | mesmo grupo: **76–122** · em alta velocidade dedicada: 475 | partida acima do grupo, abaixo do caso de alta velocidade |
| Inox 304 | 90 | grupo aço/inox da carta: **58,5–76,2** | partida ~18–54% acima |
| Alumínio 6061-T6 | 400 | grupo alumínio/cobre: **297** · alta velocidade: 496 | partida entre os dois |
| Aço P20 | 110 | grupo 42–50 HRC: **46,6** | ⚠ o grupo publicado não cobre P20 a 280–320 HB |
| Aço H13 | 60 | grupo 42–50 HRC: **46,6** | a linha nomeia H13, mas a faixa termina em 50 HRC |
| Aço 8620 núcleo | 130 | proxy < 32 HRC: **76,2** | proxy não nomeia o 8620 |
| Aço 8620 cementado | 50 | 45–60 HRC: **29,3–47,5** | não cobre 60–62 HRC |
| GG25 | 120 | proxy ferro fundido: **76,2** | não individualiza GG25 |
| GGG50 | 100 | — | `LACUNA` nos dois territórios |
| Aço 2711 | 100 | — | `LACUNA` — falta a equivalência da designação |
| Ti-6Al-4V | 40 | fresamento lateral **61–81** · abertura de rasgo **30,5–50,3** | partida abaixo do publicado para fresamento lateral |

**Como isso aparece na tela:** a velocidade de corte (vc) do material fica **visível** junto do
material, sem selo de ressalva (§4.7). Editá-la — trocar pelo valor da carta do fornecedor — é na
área Configurações (D2); ali o operador digita o valor dela, e aquele material passa a valer na
oficina dele.

**Os rótulos de confiança desta tabela são do documento, não da interface.** Eles existem para quem
for construir e para quem for fechar as lacunas — dizem exatamente qual número é frágil e em quanto,
que é o que um selo genérico de "estimado" nunca disse.

**O que não entra:** a curva de pico de velocidade em Ø6–8 mm do sistema antigo. Ela não recebeu
confirmação física em nenhuma carta consultada; o comportamento publicado é velocidade **constante
por grupo**, com o diâmetro alterando rotação e avanço. O pico é mais compatível com artefato de
tabela ou mistura de cartas do que com uma lei de dissipação de calor.

### 11.3 Avanço por dente de partida, por diâmetro

Mesma situação: `NÃO ENCONTRADO` nos dois territórios como regra publicada. O formato que os
fabricantes publicam é **degrau por faixa de diâmetro**, dentro de uma carta específica de ferramenta
— não uma função universal.

| `D` (mm) | Partida interna (mm/dente) | Ponto de catálogo comparável | Divergência |
|---|---|---|---|
| 0,2 | 0,003 | — | `LACUNA` |
| 0,5 | 0,006 | — | `LACUNA` |
| 1,0 | 0,012 | 0,0110 | +9% |
| 2,0 | 0,030 | 0,0220 | **+36%** |
| 3,0 | 0,050 | 0,0366 | **+37%** |
| 4,0 | 0,070 | 0,0494 | **+42%** |
| 6,0 | 0,100 | 0,0756 | **+32%** |
| 8,0 | 0,120 | 0,1028 | +17% |
| 10,0 | 0,140 | 0,1301 | +8% |
| 12,0 | 0,160 | 0,1568 | +2% |
| 14,0 | 0,180 | — | `LACUNA` |
| 16,0 | 0,200 | — | `LACUNA` |

**A interpolação entre pontos é decisão de implementação, não relação publicada** — e está registrada
como tal neste documento. Interpolar **só dentro da mesma carta**: pontos de cartas diferentes têm
geometria, revestimento, dureza e estratégia diferentes.

**O avanço por dente é propriedade da ferramenta, não do diâmetro sozinho.** Duas fresas de mesmo
diâmetro podem pedir avanços diferentes conforme ângulo de entrada, raio, penetração de trabalho, profundidade e
estratégia. O valor de partida é ponto de partida; o operador com a carta na mão digita o dela.

### 11.4 Rosca — tabela interna

| Rosca | Passo | Furo p/ corte | Furo p/ conformação |
|---|---|---|---|
| M3 | 0,50 | 2,50 | 2,75 |
| M4 | 0,70 | 3,30 | 3,65 |
| M5 | 0,80 | 4,20 | 4,60 |
| M6 | 1,00 | 5,00 | 5,50 |
| M8 | 1,25 | 6,80 | 7,40 |
| M10 | 1,50 | 8,50 | 9,25 |
| M12 | 1,75 | 10,20 | 11,10 |
| M16 | 2,00 | 14,00 | 15,00 |

A coluna "furo p/ corte" segue `Ø ≈ D − P`. Em **M8** (6,80, não 6,75) e **M12** (10,20, não 10,25) a
tabela traz a broca de norma, que prevalece sobre a fórmula; as outras seis linhas coincidem.

⚠ `NÃO VERIFICADO` — a tabela está registrada no projeto e é consistente com a prática, mas não
passou por rodada de pesquisa com fonte normativa. Ver §13, L7.

---

## 12. Fora do escopo, com motivo

| Item | Por que não entra agora |
|---|---|
| **Perfil de máquina** ~~e fator de segurança~~ | Ambiente declarado (§1.3). Sem ele não há "% do limite", nem potência no motor, nem alerta de rotação máxima. **O fator de segurança saiu desta linha em 01/09/2026** — entrou no MVP por decisão do Mestre, e não depende do perfil de máquina: é lente de exibição sobre o próprio resultado, não medida contra capacidade. Ver §4.9 |
| **Tipo de operação** | Ambiente declarado (§1.3). A agressividade se ajusta nos controles de corte |
| **Deflexão em micrômetros** | Depende de três constantes que ainda não fecharam: o módulo de elasticidade **diverge 16% entre duas rodadas de pesquisa** (580 GPa contra 466–516), a regra do diâmetro resistente da haste canalizada, e a razão entre força radial e tangencial. A deflexão é **inversamente proporcional** ao módulo — um erro ali propaga inteiro |
| **Vida da ferramenta em número** | A forma relativa (`T/T_ref = (Vc_ref/Vc)^(1/n)`) é implementável, mas o expoente `n` por material **não foi encontrado** em catálogo elegível, em duas rodadas de pesquisa. Sem ele, não existe percentual honesto para "subir a velocidade em 20% reduz a vida em X%". **O que entra no lugar:** a previsão qualitativa da §7.3, que nomeia a condição e a grandeza que a disparou, sem inventar percentual |
| **Custo e tempo por peça** | Depende da vida absoluta da aresta, que depende do item acima |
| **Multiplicadores por tipo de revestimento** | Cinco foram procurados; `NÃO ENCONTRADO` nos dois territórios, **cinco de cinco**. Fabricante publica dureza, temperatura de trabalho e coeficiente de atrito — nunca multiplicador de velocidade. A recomendação é descartar a lista inteira, não escolher entre eles |
| **Controle único de agressividade** (move os quatro parâmetros juntos) | Não faz parte da dinâmica pedida para este MVP. Quando entrar, entra com o vetor de movimento declarado |
| **Calculadora reduzida** (menos campos, escondendo potência, torque, remoção, rigidez e alertas) | **Descartada, não adiada.** A entrada mínima é o painel da §2.2 — ver §1.4. Um resultado com menos verificação não é mais rápido, é menos verificado, e o operador não tem como saber disso olhando a tela |
| ~~**Histórico, favoritos e biblioteca de ferramentas**~~ | ~~A biblioteca é o atalho de uso diário, e vale a pena — mas depois do núcleo~~ — **revogado em 30/08/2026:** `histórico` e `favoritos` entram no MVP por decisão escrita do Mestre; `biblioteca de ferramentas` sai desta lista como consequência de D5 e passa a viver na área "Configurações", cujo escopo é tarefa separada |
| **Indicadores em forma de medidor e índice de saúde** | O índice não tem fórmula com fonte; os medidores não acrescentam informação que o número já não dê |
| **Altura de crista como entrada** (rugosidade Ra alvo) | A relação está fechada e é `CONSENSO`, mas inverter para "informe a rugosidade e receba a penetração de trabalho (ae)" muda o fluxo pedido. Fica como resultado exibido |
| **Fresamento em 5 eixos com ferramenta inclinada** | Há fórmula publicada para o diâmetro efetivo com eixo inclinado, mas ela **não foi verificada**. Toda a cadeia do MVP vale para eixo perpendicular à superfície |
| **Copiar o resultado** | Exigiria decidir entre dois formatos com usos diferentes — os dois números de comando, para quem está na máquina, ou o bloco de resultado inteiro, para quem monta a folha de processo. Um resultado copiado solto não é interpretável depois. Entra quando o uso mostrar qual dos dois é o real |
| **Análise de vibração regenerativa** | Exige dados modais da combinação máquina + fixação + ferramenta, que não existem e não dá para estimar. Seria chute com aparência de ciência |

---

## 13. Lacunas declaradas e perguntas abertas

### 13.1 Lacunas — o que continua sem base

| # | Lacuna | O que fecharia |
|---|---|---|
| **L1** | **Diâmetro efetivo da fresa toroidal.** A família de catálogo tratada como equivalente usa uma grandeza que não existe em fresa inteiriça. A fórmula registrada não foi confirmada. **Enquanto não fechar, a toroidal em `ap < r` dispara o gatilho 10 do §9.2** — que nasce desta lacuna, não de um limiar publicado | Ler a página do guia de fabricante que trata de fresa de topo com raio de canto para `ap < r`, em fonte primária |
| **L2** | **Fator por par revestimento × material.** `NÃO ENCONTRADO` nos dois territórios | Nenhum fabricante publica multiplicador de velocidade por revestimento. Fecharia com ensaio próprio ou publicação inédita |
| **L3** | **Faixa de diâmetro das famílias roscar e mandrilar.** ~~Furar~~ **saiu em 03/09/2026** — decisão do Mestre (§4.3): valor de partida editável em vez de pesquisa, com alerta abaixo do mínimo (§9.2 gatilho 11) | Levantamento de catálogo por família |
| **L4** | 🚫 **REVOGADA — 30/08/2026.** O piso de espessura de cavaco (§9.2 gatilho 1) foi revogado por decisão do Mestre; a lacuna perdeu objeto. Os achados da R7 continuam corretos — `rβ` de fresa inteiriça ≈ **10 µm** (`REFERÊNCIA ÚNICA`, Globisch et al. 2024, JMMP 8(4):170); `k` em **0,22–0,36**, conjunto publicado de 0,08 a 0,63 (`SEM CONSENSO`, Wojciechowski, Materials 15(1):59); nenhum fabricante publica piso em mm; os 25–127 µm do registro anterior são faixa de pastilha — mas não sustentam mais nenhum gatilho. Ver `CANONICO_LIMITES_E_ALERTAS.md` §1.1 e `pesquisa/VALIDACAO_R7.md` | — |
| **L5** | **Todos os limiares de balanço vêm de um único fabricante**, e de páginas de produto da própria linha antivibratória | Confirmação em dois outros fabricantes. Contraste: os limiares de furação têm três fabricantes independentes e são genuinamente consenso |
| **L6** | ~~**A faixa entre 0,02 e 0,1 mm de espessura de cavaco continua sem tratamento declarado.**~~ **Fechada (Q28, 27/08/2026):** o limite de validade do modelo foi fixado em `hm = 0,1 mm` (§6.7), e o gatilho 1a do §9.2 avisa quando a espessura média cai abaixo dele. Banda de erro maior exigiria um número que não existe | — |
| **L7** | **A tabela de roscas e as fórmulas de furo prévio não passaram por rodada de pesquisa** | Confronto com norma de roscas métricas |
| **L8** | **`kc1.1` e `mc` por liga não existem em literatura revisada por pares** — existem por classe e resistência, em catálogo. Isso é propriedade do domínio, não falha da pesquisa | Nada a fazer além de indexar como o fabricante indexa |
| **L9** | **O par `(kc1.1, mc)` não é transferível entre faixas de espessura** | Ver §6.7. Um artigo mediu erro de 35–60% ao prever força com constantes de catálogo fora da faixa de ajuste |
| **L10** | **Espessura média para fresa toroidal e esférica com ângulo de posição variável: sem forma fechada** | Lacuna nos dois territórios |
| **L11** | **Correção por ângulo de saída: 1%/grau ou 1,5%/grau** | `SEM CONSENSO` — dois fabricantes de um lado, um fabricante e duas linhas acadêmicas do outro. Vale 4,5% no `kc` na faixa de uso — por isso não bloqueia |
| **L12** | **Cinco materiais com `kc1.1`/`mc` de fonte única, não confirmada por segundo território** (P20, 2711, GG25, GGG50, Ti-6Al-4V) — sincronizados com o canônico em 27/08 (achado A2), todos com par de catálogo Walter; falta a confirmação cruzada. GGG50 ainda com divergência interna de 16% na própria fonte (950 ou 800); Ti com um estudo acadêmico ~20% acima | Segunda fonte independente por material. **A edição de dados do material (§4.7) é o caminho mais curto**: o fornecedor entrega direto a quem compra a ferramenta o que nenhuma rodada de pesquisa alcança |
| **L13** | **O expoente `n` de Taylor e o `T_ref` por material.** Duas rodadas de pesquisa vazias; os valores em circulação (0,125 / 0,25) aparecem em material com marca de IA. **É o que impede a previsão de vida em número** (§7.3.1) | Machinery's Handbook ou ASM Vol. 16 abertos na tabela. **Achado a confirmar, e barato:** a ISO 3685 talvez cubra só ferramenta de ponta única (torneamento), não fresamento — se confirmar, o `T_ref` dos catálogos de fresa **não tem norma que o ancore**, e a lacuna passa de "não achamos" para "não existe onde estar" |
| **L14** | **A razão entre força radial e tangencial (`Fr/Fc`).** Duas rodadas sem um único coeficiente com localizador. É o que impede a deflexão em micrômetros | Coeficientes `Ktc/Krc/Kte/Kre` em Altintas, *Manufacturing Automation* |
| **L15** | **O balanço (L) não move os parâmetros recomendados.** Hoje `L` produz a relação balanço/diâmetro (L/D) e o alerta de rigidez, e só. **Mas os arquivos reais de produção da fábrica mostram rotação, avanço e profundidade de corte (ap) caindo a cada degrau de comprimento** — cinco linhas tabeladas à mão para um único diâmetro de cabeçote. A prática move; a spec não | Uma regra com fonte que ligue balanço a parâmetro recomendado. **Enquanto não existir, o sistema não inventa multiplicador** — declara a relação `L/D`, dispara o alerta, e a §7.4 aponta a direção. Ver §13.4 |

### 13.2 Duas travas que precisam virar teste automatizado

Registradas como achado da pesquisa, e o produto deve carregá-las:

1. **`hm ≤ h_alvo` sempre.** A espessura média nunca pode sair maior que a espessura alvo.
2. **Não-contagem-dupla:** quando a compensação não for limitada por nada, `hm` volta ao `h_alvo`
   dentro do erro da aproximação. É o auto-teste que pega a correção aplicada duas vezes.

### 13.3 Perguntas que ficam para decisão

**Decididas em 21/08/2026:**

| # | Pergunta | Decisão | Onde ficou |
|---|---|---|---|
| **Q1** | Valores manuais ao trocar de ferramenta | **Permanecem enquanto a família for a mesma**, até o operador mexer neles de novo. Só são reajustados à região recomendada quando a **classe** muda — fresa para broca, macho ou barra. Exceção: valor que viola limite físico da ferramenta nova é cortado no limite, com aviso | §2.6 |
| **Q2** | Comprimento de aresta como campo | **Entra como campo opcional** nas famílias de fresamento. Preenchido, vira teto físico do `ap` e dá o alvo numérico do alerta de rasgo cheio; vazio, o teto continua proporcional ao diâmetro | §4.1 · §4.6 · §5.3 |

| **Q3** | Copiar o resultado | **Não existe no MVP.** Entra em §12 (fora do escopo) | §7.9 · §12 |

| **Q4** | Valor fixado que deixa de ser alcançável | **Mantém e sinaliza.** O parâmetro derivado aparece fora da faixa e o alerta diz o que seria preciso para chegar lá | §8.4 |

| **Q5** | Casas decimais | **Fixas por grandeza**, segundo o significado físico. Não são ajustáveis pelo operador | §7.2 · §7.8 |
| **Q6** | Os cinco materiais sem par verificado | **Ficam os doze, sem selo de estimativa.** Em vez do selo, os dados do material — força específica, expoente e faixa de velocidade — ficam **visíveis na tela e editáveis na área Configurações** (D2), para que o operador substitua pelo dado do fornecedor dele. **Ampliado em 30/08/2026 (D12 do gabarito):** além de editáveis, os dados podem ser criados — o operador cria material novo do zero; os doze são ponto de partida, não limite | §4.7 · §10 · §11.1 |

**Decididas em 26/08/2026, contra a evidência de campo:**

| # | Pergunta | Decisão | Onde ficou |
|---|---|---|---|
| **Q7** | O MVP entrega a entrada mínima, a completa, ou as duas | **Não existe um segundo modo a construir.** O painel da §2.2 **já é** a entrada mínima: as cinco entradas descritas na entrevista são os mesmos campos, mais o incremento. A entrada completa é este mesmo painel com o ajuste fino aberto | §1.4 · §2.2 |
| **Q8** | Quais campos ficam na entrada mínima | Os da §2.2, **com a profundidade de corte (ap) promovida de controle a campo** | §2.2 · §4.1 · §4.8 |
| **Q9** | A previsão de comportamento entra sem o `n` de Taylor e sem `Fr/Fc` | **Entra qualitativa.** Nomeia a condição e a grandeza que a disparou, com as grandezas que a cadeia já calcula e que têm fonte. **Não entrega número de vida nem deflexão em micrômetros** — os dois viram lacuna declarada, não silêncio | §7.3 · §7.3.1 · §13.1 L13, L14 |
| **Q10** | A penetração de trabalho (ae) é assumida, ou é campo | **Nem uma nem outra: continua controle visível com valor de partida declarado.** Não é assumida em silêncio — aparece na tela com o valor de partida, visível e editável, e alimenta o afinamento de cavaco (CTF) e a espessura exibida ~~o alerta de espessura abaixo do limite do modelo (§9.2, gatilho 1a)~~ — alerta revogado em 08/09/2026 | §4.8 · §5.2 |
| **Q11** | O balanço (L) passa a mover os parâmetros recomendados | **Não no MVP, e a razão é a regra No Invention.** A prática da fábrica move; nenhuma fonte sustenta um multiplicador. **Vira lacuna declarada `L15`** — o sistema entrega a relação balanço/diâmetro (L/D), o alerta e a direção de ajuste, e não inventa a curva | §13.1 L15 · §13.4 |
| **Q12** | O responsável pelo ferramental é usuário do MVP | **Não.** O MVP atende o operador na máquina. A ligação entre parâmetro e consumo de ferramental é reconhecida como argumento comercial, e **exige dado de vida que não existe** (L13) — depende da mesma lacuna | §13.4 |

**Promovidas ao produto inteiro pelo bloco de decisão (27/08/2026):** as decisões locais de MVP **Q1**
(valores manuais ao trocar de ferramenta), **Q4** (valor fixado inalcançável — escopo Q2) e **Q5**
(casas decimais) valem agora para o produto todo, não só para a fatia construída. As decisões do
bloco em si — Q17 (sem seletor de estratégia), Q18 (revestimento fora), Q19/Q20 (material como
outro qualquer, adição/edição/remoção livre), Q28 (limite de validade do modelo em `hm = 0,1 mm`) —
já estão aplicadas neste documento. Ver `escopo/E7_ESCOPO_E_FRONTEIRAS.md` §6.2.

---

### 13.4 O que a evidência de campo pediu e o MVP não entrega

**Registrado para não virar esquecimento.** Cada item aqui foi pedido por um usuário real e **não
entra**, com a razão nomeada.

| O que foi pedido | Por que não entra | O que fecharia |
|---|---|---|
| **"vai durar quanto perto do previsto"** | Sem o `n` de Taylor não existe percentual honesto. Um número inventado aqui seria exatamente o defeito que este projeto existe para não repetir | `L13` |
| **A rotação e o avanço caindo conforme o balanço**, como na tabela manual da fábrica | Nenhuma fonte sustenta o multiplicador. A prática move; a evidência publicada não diz de quanto | `L15` |
| **A linha que liga o parâmetro ao consumo de ferramental**, para o gestor | É a mesma lacuna de vida de ferramenta, vista pelo lado do custo | `L13` |

> **Os três dependem de obter três documentos nomeados**, não de mais busca: Altintas
> (*Manufacturing Automation*), Machinery's Handbook ou ASM Vol. 16 na tabela de Taylor, e o artigo
> de Kops e Vo. Duas rodadas de pesquisa identificaram as referências e **não conseguiram abri-las**.
> A causa é acesso, não ausência.

---

## Fontes deste documento

| O que veio de onde | Documento |
|---|---|
| Princípio das duas camadas, e o que sai da interação padrão | `escopo/E0_PRINCIPIO_DA_CALCULADORA_AGNOSTICA.md` |
| Princípios de interação, painel, colapso, edição, estados | `escopo/E5_INTERACAO_E_FLUXO.md` |
| Hierarquia do resultado e regras de exibição | `escopo/E3_RESULTADOS_E_APRESENTACAO.md` |
| Diâmetro, `ap`/`ae`, altura de crista | `canonicos/CANONICO_GEOMETRIA_DE_CORTE.md` |
| Substrato, revestimento, aço rápido, fatores de velocidade | `canonicos/CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` |
| Alertas, camadas, limiares de balanço e furação, potência | `canonicos/CANONICO_LIMITES_E_ALERTAS.md` |
| Espessura de cavaco, força específica, constantes por material | `pesquisa/VALIDACAO_R2.md` (achados A1, A4, A5, A7) |
| Diâmetro efetivo em fresa esférica, e a trava de entrada | `pesquisa/VALIDACAO_R2V2.md` |
| Ausência de base para `Vc` e `fz`, e os pontos de catálogo | `pesquisa/RESPOSTA_R4.md` e `RESPOSTA_R4_B.md` |
| Catálogo de geometrias, campos por tipo e valores de partida | levantamento do sistema anterior — **estrutura apenas**, nenhum número atravessou sem passar pela auditoria ou pela pesquisa |

**Nota de método:** onde este documento reaproveita a estrutura do sistema anterior — a lista de
geometrias, os campos de cada tipo, os valores de partida — ele a reaproveita como **estrutura**,
não como verdade. Todo número passou pela auditoria ou pela pesquisa, ou está marcado como não tendo
passado. Um valor não atravessa a fronteira por já existir.
