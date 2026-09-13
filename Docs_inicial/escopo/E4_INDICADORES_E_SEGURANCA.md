# E4 — Indicadores e Segurança

**O que este documento define:** como o sistema comunica risco — o que avisa, o que é impossível, o que é erro de digitação, qual o nível de segurança de um resultado, e o que o sistema afirma sobre o que vai acontecer. **No alerta, o sistema informa; não diz ao operador o que fazer** (bloco de decisão, 27/08/2026). A exceção deliberada é o painel *"o que mexer"* (§6), que o operador abre para pedir direção: ali o sistema orienta, com verbo e em tom que ensina (28/08/2026).

**O que não define:** as fórmulas que produzem cada grandeza e a procedência de cada limiar (ver `canonicos/`), a aparência, a arquitetura.

**Sobre os exemplos:** os blocos monoespaçados ilustram **conteúdo e hierarquia da informação**. Não são desenho de tela, não definem cor nem posição.

**Sobre as lacunas:** onde o limiar depende de um dado que ainda não existe, este documento marca **⧗ AGUARDA** e diz o que o número representa. Onde o comportamento exige decisão, marca **⚠ NÃO DEFINIDO** e formula a pergunta. Nenhum limiar foi inventado para preencher vazio.

---

## 1. A regra que governa esta seção

> **Nada trava. O resultado é sempre entregue. O alerta descreve o risco e situa o valor — não instrui.**

**Primeiro, o que o sistema nunca faz:** recusar o cálculo, travar um controle, truncar um número ou ajustar em silêncio. É uma calculadora, e a função de uma calculadora é entregar o resultado — por mais absurdo que ele seja. O que o sistema faz sobre o absurdo é **dizer que é absurdo, e por quê**, com número. Recusar entregar transfere ao operador a única coisa que ele não pode fazer: descobrir sozinho o tamanho do erro.

**Segundo, o alerta informa — não prescreve** (bloco de decisão, 27/08/2026). A mensagem descreve a condição de risco e diz **onde o valor está**: a grandeza medida, a referência (o limiar, a faixa tabelada, o limite declarado) e de quanto a distância. Não diz "reduza", "aumente", "divida em passes" nem "use outra ferramenta" — quem decide como reagir é o operador. O número factual fica, porque situa sem mandar; o imperativo sai.

**Errar a camada** é o outro defeito a evitar: dizer "risco de processo" quando o operador digitou um zero a mais ensina que o alerta mente, e o alerta verdadeiro morre junto.

**O corolário:** condição sem grandeza e referência a mostrar não vira alerta. Ou o sistema sabe descrever a condição com número, ou o que ele tem é opinião — e opinião não ocupa a zona de alerta.

**O alcance desta regra é o alerta** — a informação que o sistema empurra sem o operador pedir. O painel *"o que mexer"* (§6) é de outra natureza: o operador o abre justamente para pedir direção, e ali o sistema orienta — com verbo, em tom que ensina. Negar a orientação nesse painel seria tirar a razão de ele existir (28/08/2026).

### 1.1 As três camadas

A distinção vem de **E0** §3.3 e atravessa todo o produto. **E2** §4 aplica a mesma divisão à entrada; aqui ela se aplica ao resultado.

| Camada | O que é | Efeito | Por quê |
|---|---|---|---|
| **IMPOSSÍVEL** | a montagem não realiza o que foi pedido — penetração de trabalho (ae) maior que o diâmetro, furo que não comporta a rosca | **Entrega e avisa que o número não descreve a peça**, no nível mais grave | O número existe; o que não existe é a condição. Dizer isso é mais útil que sumir com o resultado, porque mostra **de quanto** o pedido estourou |
| **PROCESSO** | condição possível que degrada o resultado | **Entrega e descreve a condição**, com a grandeza e a referência | Pede algo possível e ruim. O sistema entrega e descreve — o operador decide |
| **SANIDADE** | o valor não é parâmetro, é erro de digitação | **Entrega e avisa, rotulado como validação de entrada** | Nunca como risco de processo — ver a razão na §1 |

**As três entregam.** A camada não muda *se* o resultado aparece — muda **o que a mensagem diz** e **quão grave é o nível**.

### 1.2 O ambiente declarado é uma origem, não uma quarta camada

Limite de máquina — rotação (n), avanço (vf), potência de corte (Pc), torque (Mc) — só existe se o operador declarou o ambiente (**E0** §3.2). Quando existe, comporta-se como **alerta**: avisa e entrega.

| # | Regra | Por quê |
|---|---|---|
| 1 | **Nenhum limite de ambiente bloqueia, trava controle ou exige liberação** | Um limite de máquina é um fato sobre a máquina, não uma proibição sobre a física (**E0** §3.4). Não existe gesto de "forçar": nada estava travado |
| 2 | **Nenhum limite de ambiente ajusta o resultado em silêncio** | Ajustar esconderia do operador que a máquina dele é o fator limitante — que é justamente a informação útil |
| 3 | **Sem ambiente declarado esses alertas não existem** — e a ausência deles não é sinal de que o passe cabe | Não há limite contra o que comparar. O sistema não afirma o que não sabe |
| 4 | **A tolerância da peça é dado declarado**, e segue a mesma regra: avisa, nunca bloqueia | Quem informou a tolerância informou um requisito do trabalho dele, não uma impossibilidade física |

### 1.3 A estrutura da mensagem

```
[condição]  —  [grandeza medida] contra [referência]  ([de quanto a distância])
```

```
ATENÇÃO — relação balanço/diâmetro (L/D) 4,5, acima do limiar de
          4,0 da haste comum (13% acima)
          A ferramenta flete e tende a vibrar: a deflexão cresce com
          o cubo dessa relação, e a 4,5 ela é 42% maior que no limiar.
```

A mensagem descreve **a condição e o efeito físico** dela, com os números que situam. Não traz instrução de ajuste. **Uma condição por vez**, a mais grave ativa; havendo outra, a linha **diz que existe**, sem detalhá-la ali (**E5** §9.2).

### 1.4 Casos de borda — camadas

| Situação | Comportamento | Por quê |
|---|---|---|
| Condição de processo em que a distância até a referência é muito grande | A mensagem **diz de quanto é a distância mesmo assim** (*"a profundidade está 2,4× acima do que a potência disponível comporta"*) | O tamanho da distância é informação: quando é grande demais para o parâmetro resolver, isso mesmo é o que o operador precisa ver |
| Duas condições da mesma camada ativas | Descreve a de maior consequência prática e indica que há outra; ambas ficam sinalizadas na leitura de detalhe | Uma linha com duas condições vira ruído |
| Sanidade e alerta de processo ativos ao mesmo tempo | O alerta de processo ocupa a linha; a sanidade fica **no campo** que a originou | São coisas diferentes: uma é sobre o que foi digitado, outra sobre o que vai acontecer na peça |
| Nenhuma condição ativa | A zona mostra a condição normal, **não fica vazia** | Zona que some e volta faz o painel saltar |

---

## 2. O nível de segurança

É a leitura de uma olhada — o que o operador enxerga antes de ler qualquer número.

### 2.1 Os quatro níveis

```
CRÍTICO  >  ATENÇÃO  >  NORMAL
```

**São três, e nenhum deles impede o resultado.** O nível diz o quanto o operador precisa olhar antes de dar o start, não se o número aparece — ele sempre aparece.

| Nível | Quando | O que significa para quem opera |
|---|---|---|
| **CRÍTICO** | a montagem não realiza o que foi pedido, ou o passe excede um limite declarado — da máquina ou da tolerância da peça | O número na tela **não descreve a peça que vai sair**. A mensagem diz de quanto o pedido estourou |
| **ATENÇÃO** | condição de processo ativa | Executável, e ruim de uma forma nomeada. O operador decide |
| **NORMAL** | nenhuma condição ativa | Nada fora da faixa **entre as condições verificadas** — que não é o mesmo que garantia |

**Sem ambiente declarado, o CRÍTICO de limite de máquina não existe** — não porque o passe esteja seguro, mas porque não há limite declarado contra o que compará-lo (§1.2, regra 3). O CRÍTICO de condição impossível continua existindo: ele depende só do que foi informado.

### 2.2 O que o nível **não** é

| Não é | Por quê |
|---|---|
| **Um índice calculado de 0 a 100** | Não existe fórmula com fonte para consolidar grandezas de naturezas diferentes num número só, e um índice consolidado que o operador não consegue conferir é o tipo de número que ele aprende a ignorar |
| **Uma média das condições** | O nível é a **condição mais grave ativa**, não a soma delas. Duas condições de atenção não fazem uma crítica |
| **Uma promessa** | O sistema recomenda — o operador decide (**E3** §5.2). `NORMAL` diz que nada disparou entre o que foi verificado, e a lista do que foi verificado é acessível a partir dele |
| **Portado só pela cor** | Todo nível tem também rótulo e posição fixa. Cor nunca é o único portador de significado (**E5** §10) |

### 2.3 Duas regras de comportamento

| # | Regra | Por quê |
|---|---|---|
| 1 | **O nível nunca recebe tratamento de desatualizado** enquanto os números esperam recálculo | Esmaecer alarme ativo é o oposto do que um painel industrial deve fazer (**E5** §4.1) |
| 2 | **O nível é somente leitura** — não se arrasta, não se ajusta, não se silencia | Existem infinitas combinações de parâmetros que produzem o mesmo nível; escolher qual mexer é a decisão de engenharia que pertence ao operador (**E5** §5.4) |

### 2.4 Exemplo de conteúdo

```
Aço 1045 · Fresa toroidal Ø10 r1,0 Z4 L45 — metal duro
                                                     [ ATENÇÃO ]

ATENÇÃO — relação balanço/diâmetro (L/D) 4,5, acima do limiar de
          4,0 da haste comum (13% acima)
          A ferramenta flete e tende a vibrar: a deflexão cresce com
          o cubo dessa relação, e a 4,5 ela é 42% maior que no limiar.
          Há mais uma condição ativa — ver detalhes.
```

> **Sincronizado com o `MVP` §7.6 / §7.6.1 em 29/08/2026** (issue #3). Duas correções, em sequência.
> O exemplo anterior não se reproduzia pelas fórmulas do `MVP` §6. E o alerta que ele encenava —
> **esfregamento**, gatilho 1 do §9.2 — não dispara: a **R7** (`pesquisa/VALIDACAO_R7.md`, três
> territórios independentes) mediu o piso real em **2,2–3,6 µm**, contra os 30 µm que este exemplo
> carregava, e mostrou que dentro da escala do `MVP` §5.3 o gatilho é **inalcançável**.
>
> **O alerta encenado passou a ser o balanço** (gatilho 5), com o exemplo em `L` 45 mm. Ele tem as
> três coisas que o outro não tinha: limiar publicado (`MVP` §9.3), efeito derivável da cadeia
> (§6.10) e **direção que o resolve** dentro do que o operador controla. **A segunda condição ativa
> é o gatilho 1a** (`hm` 0,019 mm abaixo de 0,1 mm, alerta de processo em nível ATENÇÃO) — ela
> continua sem direção alcançável, e é por isso que nunca ocupa a linha.

> **Nota 31/08/2026.** A marca "extrapolado" na tela saiu com a procedência. O gatilho 1a continua
> valendo como alerta de processo (ATENÇÃO); mudou só o rótulo — ver §3.1 gatilho 11a e o exemplo da §2.4.
>
> **Nota 08/09/2026.** O gatilho 1a/11a foi **revogado** por decisão do Mestre — o alerta de espessura
> sai do produto em todas as famílias (§3.1, gatilhos 1 e 11a). O exemplo encenado da §2.4 passa a ter
> **uma** condição ativa, o balanço; não há segunda condição.
> 
> **Nota 08/09/2026 (Emenda).** A premissa de 29/08/2026 — de que o alerta de balanço possuía uma direção resolutiva dentro do controle do operador (reduzir o próprio balanço) — foi identificada como incorreta. O balanço é condição de contorno imposta pela peça. A direção passou a incidir sobre a penetração de trabalho (ae), que é efetivamente ajustável. **Emenda de 09/09/2026:** a redação de 08/09 apontava `fz`, a mesma grandeza da segunda direção do painel e em sentido oposto — o que viola a §6.2. Corrigida para `ae`, que governa a força radial, a que fleta a ferramenta.

Com nada ativo:

```
                                                        [ NORMAL ]

NORMAL — nada fora da faixa entre as condições verificadas.
▸ O que foi verificado
```

### 2.5 Casos de borda — nível

| Situação | Comportamento | Por quê |
|---|---|---|
| Condição de ambiente ativa e condição de processo ativa | Nível **CRÍTICO**, e a linha descreve a condição de ambiente primeiro | O que não cabe na máquina é a leitura mais grave |
| O operador desliga o ambiente declarado com um resultado em CRÍTICO na tela | O nível recalcula e **cai** para o que as condições de processo sustentam, e a origem da mudança fica visível | O limite deixou de existir porque o operador deixou de declará-lo — e ele precisa ver que foi isso que mudou |
| Sanidade ativa e nenhuma outra condição | O nível permanece **NORMAL**, e o campo carrega o aviso de erro de digitação | Sanidade é validação de entrada. Mover o semáforo por ela é o erro de camada da §1 |
| Condição impossível ativa | Os números de comando **aparecem**, o nível é CRÍTICO, e a mensagem diz que o resultado descreve uma condição que a montagem não realiza — com a grandeza que estourou e de quanto | Sumir com o número esconde o tamanho do erro. É a informação mais útil que a tela tem naquele momento |
| Condição impossível **e** o operador quer ver o número mesmo assim | Já está vendo. Não há gesto de liberação, nem marca de forçado — nada foi travado | O sistema recomenda, o operador decide (**E5** P12). Pedir permissão para entregar o que já é dele é atrito sem função |

---

## 3. O que dispara

### 3.1 A tabela de gatilhos

**A coluna descreve o que a mensagem informa — a condição, o efeito físico e os números que situam. Nenhuma linha traz instrução de ajuste** (bloco de decisão, 27/08/2026).

Nas fórmulas: espessura de cavaco máxima (`hex`) e média (`hm`), raio de aresta (`rβ`), penetração de trabalho (`ae`), diâmetro da ferramenta (`D`), velocidade de corte (`vc`).

| # | Gatilho | Camada | Nível | O que a mensagem traz |
|---|---|---|---|---|
| ~~1~~ | ~~Espessura de cavaco **máxima** (hex) abaixo do piso de esfregamento — `hex < k × rβ`, com `rβ` = 10 µm e `k` = 0,22–0,36 (piso **0,0022–0,0036 mm**)~~ **REVOGADO — 30/08/2026, decisão do Mestre** (`CANONICO_LIMITES_E_ALERTAS.md` §1.1; `MVP §9.2` gatilho 1). Este documento ainda o listava como ativo; a revogação é anotada aqui em 08/09/2026 | — | — | — |
| 2 | Rasgo cheio — `ae ≥ 0,95 × D` | PROCESSO | ATENÇÃO | a penetração de trabalho (ae) contra o diâmetro; é corte concordante e discordante ao mesmo tempo, sem saída para o calor e com risco de recorte de cavaco |
| 3 | Penetração de trabalho (ae) maior que o diâmetro | IMPOSSÍVEL | **CRÍTICO** | a penetração informada, o máximo que o diâmetro entrega, e que o resultado descreve uma remoção que não vai acontecer |
| 4 | Profundidade de corte (ap) maior que o comprimento de aresta (Lc) **informado** | IMPOSSÍVEL | **CRÍTICO** | a profundidade informada contra a aresta que existe, e de quanto o excedente não tem aresta para cortar |
| 5 | Velocidade de corte (vc) longe do valor de partida do material — `vc < 0,6 × vc_partida` ou `vc > 1,4 × vc_partida` (§11.2 do MVP) | PROCESSO | ATENÇÃO | a velocidade de corte atual contra o valor de partida daquele material; abaixo, o cavaco adere ao gume e o acabamento piora; acima, o desgaste é térmico e a vida cai rápido |
| 6 | Balanço (L) acima do limiar do tipo de haste (§3.2) | PROCESSO | ATENÇÃO | a relação balanço/diâmetro (L/D) atual e o limiar do tipo de haste |
| 7 | Furação sem canal interno, acima de **3 × D** | PROCESSO | ATENÇÃO | a profundidade contra o limiar de `3 × D`; acima dele o cavaco entope |
| 8 | Furação com canal interno, acima de **30 × D** | PROCESSO | ATENÇÃO | a profundidade contra `30 × D`; acima disso é furação profunda dedicada, com furo-guia e pressão de refrigerante próprios |
| 9 | Furo prévio menor que o mínimo da rosca | IMPOSSÍVEL | **CRÍTICO** | o furo mínimo, o furo informado, e a diferença entre os dois |
| 10 | Macho de conformação em material que não conforma | IMPOSSÍVEL | **CRÍTICO** | que o material informado não conforma, e a lista dos que não conformam |
| 11 | Resultado fora do envelope onde os dados de partida foram levantados | PROCESSO | ATENÇÃO | que o diâmetro está fora da faixa coberta pela tabela de partida, e que a confiança no resultado cai fora dela (**E2** §3.3) |
| ~~11a~~ | ~~Espessura de cavaco **média** `hm < 0,1 mm`~~ **REVOGADO — 08/09/2026, decisão do Mestre.** O alerta de espessura sai do produto em **todas as famílias** (`CANONICO_LIMITES_E_ALERTAS.md` §5, item 1; `MVP §9.2`). O limite `hm = 0,1 mm` continua sendo propriedade declarada do modelo de força, e `hm`/`hex` continuam calculados e exibidos — o que sai é o aviso na tela | — | — | — |
| 12 | Deflexão acima da tolerância informada | PROCESSO | ATENÇÃO — **CRÍTICO** acima de 2× | ⧗ ver §3.3 |
| 13 | Potência de corte (Pc) exigida acima da declarada | ambiente (§1.2) | **CRÍTICO** | a potência exigida contra a disponível, **com o rótulo de qual das duas está na tela** — na aresta ou no motor —, e de quanto excede |
| 14 | Torque (Mc) exigido acima do declarado | ambiente | **CRÍTICO** | o torque exigido contra o disponível, e de quanto excede |
| 15 | Rotação (n) exigida acima da máxima declarada | ambiente | **CRÍTICO** | a rotação que a velocidade pedida exige, o teto da máquina, e a velocidade de corte equivalente ao teto para o diâmetro em uso |
| 16 | Velocidade de avanço da mesa (vf) acima do máximo declarado | ambiente | **CRÍTICO** | o avanço exigido contra o máximo, e de quanto excede |
| 17 | Valor implausível por uma ordem de grandeza — `vc < 0,1 × vc_min`, `vc > 10 × vc_max`, dimensão absurda | SANIDADE | não move o nível | *"isso parece erro de digitação"*, com o valor plausível ao lado |

**Sobre o rótulo de potência (gatilho 13):** a potência de corte (Pc) na aresta e a potência no motor diferem por um fator igual ao inverso do rendimento do acionamento (η), e a faixa de rendimento em uso abre cerca de 50% entre os extremos. **Qual das duas está na tela é parte da mensagem**, não preciosismo de nota de rodapé.

### 3.2 Limiares de balanço por tipo de haste

| Tipo de haste ou adaptador | Avisa acima de |
|---|---|
| Fresa ou haste comum | **4 × D** |
| Adaptador amortecido, fresamento | **8 × D** |
| Barra de mandrilar comum | **4 × D** |
| Barra amortecida de aço | **10 × D** |
| Barra amortecida com reforço de metal duro | **14 × D** |

**Nenhum deles bloqueia.** Um limiar que bloqueia balanço proíbe produto que existe em catálogo: adaptador amortecido trabalha em 7–8 × D, barra amortecida em 10 × D, barra reforçada em 14 × D, e ferramenta de furação com canal interno vai a 30 × D sem pica-pau. Bloquear ali é o sistema recusando a ferramenta que o operador tem na mão.

**Balanço e deflexão são indicadores separados, e um não substitui o outro.** A deflexão cresce com o cubo da relação balanço/diâmetro (L/D) e ainda por cima com o inverso do diâmetro; a estabilidade cai por outro expoente. Não são função um do outro: passar a relação de 3 para 4 aumenta a deflexão em 137%; de 3 para 6, em 700% — e uma ferramenta de 3 mm flete quase 7× mais que uma de 20 mm no mesmo balanço relativo. Um indicador só não carrega as duas leituras.

### 3.3 Deflexão — a regra existe, o número ainda não

O limite de deflexão é **relativo à tolerância informada**, nunca um valor absoluto em micrômetros: não existe limiar universal de deflexão aceitável, e um número fixo seria arbitrário para toda peça que não fosse aquela.

> ⧗ **AGUARDA — a razão entre força radial e força tangencial.** A fórmula da deflexão está fechada e a geometria da ferramenta em balanço está resolvida, mas a força que entra nela depende de coeficientes por material que duas rodadas de pesquisa não obtiveram. **Enquanto isso o sistema não entrega deflexão em micrômetros** — expõe a relação balanço/diâmetro (L/D), o limiar e a direção de ajuste sobre os parâmetros de corte. Um valor arbitrado aqui seria número inventado com aparência de medida.

Quando o número existir, valem duas regras já determinadas:

| # | Regra | Por quê |
|---|---|---|
| 1 | Com o comprimento de aresta (Lc) informado, o cálculo usa os **dois trechos de rigidez** da ferramenta — a haste lisa e a parte canalizada | Tratar a ferramenta como cilindro de diâmetro único erra sempre: pelo diâmetro da haste, **subestima** a deflexão em até 59% — para o lado que quebra ferramenta |
| 2 | Sem o comprimento de aresta, o cálculo usa o modelo mais conservador, com o convite a preencher o campo | Nenhum comprimento é assumido por classe de ferramenta: não há fonte para esse valor, e o sistema não inventa número para poder exibir um |

### 3.4 As regras que o sistema não tem, e por quê

Cinco regras que parecem naturais **não existem neste produto**, e a ausência de cada uma é deliberada.

| Regra ausente | Por quê |
|---|---|
| **Trava, bloqueio ou recusa de cálculo** — em qualquer camada, por qualquer motivo | §1. O resultado é sempre entregue. Sem trava não existe gesto de liberação, e sem liberação não existe marca de forçado: nada estava preso |
| **Aviso por penetração de trabalho (ae) baixa** (`ae/D` abaixo de uma fração fixa) | Trabalhar em 5–20% de penetração é **estratégia recomendada**, não anomalia. O risco real não é a penetração: é a espessura de cavaco (hex) cair abaixo do raio de aresta (rβ) — que é o gatilho 1 |
| **Janela global de velocidade de corte (vc)** | Não existe faixa universal. A amplitude legítima cobre cerca de 600× entre extremos, e uma janela fixa recorta arbitrariamente o que é correto para o par material × substrato. A comparação é **sempre relativa à faixa daquele par** (gatilho 5) |
| **Referência fixa de taxa de remoção de material (MRR)** | Duas operações igualmente legítimas de desbaste variam por fator 38×. Um medidor que dá nota alta para ferramenta grande e nota baixa para ferramenta pequena não mede produtividade: mede diâmetro (§4) |
| **Bloqueio por balanço** | §3.2 |

### 3.5 Casos de borda — gatilhos

| Situação | Comportamento | Por quê |
|---|---|---|
| Rasgo cheio com o comprimento de aresta (Lc) **não informado** | A pergunta se dissolve (Q29, 27/08/2026): sob a regra da §1, a mensagem **não entrega alvo de ajuste** — descreve a condição de rasgo cheio e o efeito físico. Não havendo "reduza para 70% da aresta" na mensagem, o campo ausente não muda nada nela | O alerta informa o risco; não instrui. O que o operador faz com a informação — pedir o comprimento de aresta, reduzir a penetração de trabalho, dividir passes — é decisão dele |
| Gatilho de processo ativo e o operador leva o parâmetro de volta para dentro da faixa | O alerta some no recálculo, e o nível cai junto | A marca descreve a condição atual, não o histórico do gesto (**E5** §5.8) |
| Ferramenta cujo tipo de haste não está entre os cinco da §3.2 | Usa o limiar da haste comum, e a mensagem **diz qual limiar aplicou** | É o mais conservador da tabela. Aplicar em silêncio um limiar que não é o da ferramenta seria premissa invisível (**E0** §4.1) |
| Sem ambiente declarado, a rotação calculada é altíssima | Nenhum alerta de rotação — não há teto declarado. A velocidade continua sendo comparada à faixa do material (gatilho 5) | O sistema não afirma o que não sabe (§1.2, regra 3) |
| Duas condições de ambiente ativas ao mesmo tempo | A de maior consequência prática ocupa a linha; a outra fica sinalizada no detalhe | §1.4 |

---

## 4. Produtividade — comparação contra a máquina, nunca contra número fixo

A taxa de remoção de material (MRR) só vira julgamento quando existe uma capacidade contra a qual compará-la, e essa capacidade sai da potência disponível e da força específica de corte (kc) do material — não de um número de referência.

| Situação | O que o sistema mostra |
|---|---|
| **Sem ambiente declarado** | a taxa de remoção como número, **sem julgamento** — não há capacidade declarada contra a qual medir |
| **Com ambiente declarado** | a taxa de remoção e **quanto ela representa da capacidade da máquina**, que é a leitura acionável de "posso ir mais fundo?" |

A ordem de grandeza do que isso muda: a mesma máquina de porte médio suporta algumas centenas de cm³/min em aço-ferramenta e mais que o dobro disso em alumínio. Um número fixo julgaria as duas com a mesma régua e erraria nas duas.

---

## 5. A previsão de comportamento

> **Sucesso, para quem opera, não é um número. É a ausência de evento.** A ferramenta corta, não quebra, não faz barulho excessivo, não vibra, não aquece de forma anormal e não gasta antes do previsto.

Este bloco traduz o que a cadeia de cálculo já sabe **para a linguagem dos sinais que o operador usa para julgar**. Um par rotação/avanço sem ele é um palpite com aparência melhor.

**A regra que o governa: só entra condição que a cadeia de cálculo sustenta, com a grandeza que a disparou nomeada.** Frase genérica sobre usinagem não entra — ela ensina o operador a ignorar o bloco, que é o oposto do que ele existe para fazer.

### 5.1 Os sinais

| Sinal previsto | O que o dispara | Grandeza que o nomeia |
|---|---|---|
| **Vai esfregar em vez de cortar, e a aresta morre por falta de carga** | espessura de cavaco (hex) abaixo do piso | espessura de cavaco |
| **Vai vibrar** | relação balanço/diâmetro (L/D) acima do limiar da haste | relação balanço/diâmetro |
| **Vai exigir força que a aresta pode não aguentar** | espessura muito acima da faixa, ou rasgo cheio | espessura de cavaco · penetração de trabalho (ae) |
| **Vai pedir torque (Mc) alto em rotação baixa** | torque acima da faixa usual para o diâmetro | torque |
| **Vai aquecer** | velocidade de corte (vc) acima da janela do par material × substrato | velocidade de corte real |
| **Vai render pouco para o esforço** | taxa de remoção de material (MRR) baixa com potência alta | taxa de remoção · potência de corte (Pc) |

**Cada sinal traz a grandeza que o produziu, nomeada.** Sem isso o bloco seria um oráculo — e oráculo é exatamente o que a tabela congelada da parede já é.

Quando nada dispara, o bloco **diz isso**, em uma linha e sem inventar tranquilidade:

```
Nada fora da faixa entre as condições verificadas.
```

### 5.2 O que a previsão **não** afirma

| Não diz | Por quê |
|---|---|
| **"vai durar X% do previsto"** | ⧗ **AGUARDA — o expoente de vida por par ferramenta × material.** A forma da relação é conhecida e implementável; o expoente não foi encontrado em fonte elegível em duas rodadas. E ele domina o resultado: para o mesmo desvio de 20% na velocidade, a vida remanescente varia de 23% a 74% dependendo só do expoente assumido — dispersão maior que a margem inteira do modelo. **A previsão de vida entra qualitativa: sinal e grandeza, sem percentual** |
| **deflexão em micrômetros** | §3.3 |
| **previsão de vibração regenerativa** | Exige dados modais da combinação máquina + fixação + ferramenta, que não existem e não dá para estimar. Seria chute com aparência de ciência |
| **que o balanço mexe nos parâmetros recomendados** | O balanço produz a relação e o alerta; é condição de contorno. Nenhuma fonte publica a curva que ligaria balanço a parâmetro recomendado, e o sistema não inventa multiplicador. A direção, quando aplicável, incide sobre uma grandeza realmente ajustável — a penetração de trabalho (ae), que governa a força radial; a rotação continua proibida como solução anti-vibração |

> **A regra vale aqui inteira: o bloco entrega o comportamento que a cadeia sustenta e declara o que não sabe.** Um "vai durar 70% do previsto" sem base seria o defeito que este projeto existe para não repetir.

---

## 6. A direção de ajuste — toda direção carrega o preço

> **Resolvido (28/08/2026).** A regra "o sistema informa, não instrui" (§1) é do **alerta** — o que o sistema empurra sem o operador pedir. Este painel é o oposto: o operador o consulta para pedir direção (*"mais vida"* × *"mais produtividade"*). Aqui o verbo de orientação entra — em tom que ensina, não que manda —, o objetivo vem na linguagem de quem está na máquina (não em unidade técnica), e o que se perde continua na mesma linha do ganho.

> *"Faça isso para obter isso, mas perde aquilo."*

O operador não está procurando o parâmetro ótimo — está procurando parar de apanhar e, depois, saber para onde andar. Direção sem preço é conselho, e conselho sem preço é o que produziu a tabela congelada.

| # | Regra | Por quê |
|---|---|---|
| 1 | Cada direção abre pelo **objetivo, na linguagem do operador** ("para a ferramenta durar mais", "para usinar mais rápido"), e só então traz **o verbo de orientação, a grandeza e o alvo numérico** | É o resultado que o operador reconhece; e "aumente o avanço por dente para 0,085 mm" ensina e é acionável. Orientar é a função do painel |
| 2 | O **ganho e o que se perde vêm em linguagem de chão de fábrica**, não em unidade técnica, **na mesma linha** | "a peça fica pronta antes — cerca de 40% mais material por minuto", não "a taxa de remoção sobe de 1,1 para 1,5 cm³/min"; o preço junto do ganho distingue direção de palpite |
| 3 | As direções saem da **mesma cadeia de cálculo** que produziu o resultado | Nenhuma regra nova, nenhuma constante nova |
| 4 | **Duas direções por vez, no máximo** | Uma tela com seis caminhos não orienta; paralisa |
| 5 | Havendo alerta ativo, **a direção que o resolve vem primeiro** | Quem está apanhando quer sair do vermelho antes de otimizar |
| 6 | As duas direções coexistem — **mais vida** e **mais produtividade** | Quem quer deixar a máquina rodando sozinha anda para um lado; quem quer extrair o máximo anda para o outro. Os dois veem o preço antes de andar |
| 7 | **Uma direção só pode incidir sobre uma grandeza que o operador realmente ajusta no contexto declarado** | Entradas de montagem ou geometria impostas pela peça — como balanço, diâmetro e comprimento de aresta — não são alvos de direção; são condições de contorno. Uma direção que o operador não consegue executar é, na prática, apenas um conselho; isso não atende ao propósito do painel |

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


### 6.1 Exemplo de conteúdo

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
    Em troca: a maquina puxa mais potencia e a ferramenta tende a
    vibrar mais com o balanco atual.
```

### 6.2 Casos de borda — direção

| Situação | Comportamento | Por quê |
|---|---|---|
| As duas direções apontariam para o mesmo parâmetro em sentidos opostos | Exibe apenas a que resolve o alerta ativo | Regra 5. Duas direções contrárias na mesma tela paralisam |
| Nenhuma direção melhora nada sem violar um limite | O bloco diz isso, e aponta o caminho estrutural — outra ferramenta, outro balanço, outra montagem | Alvo impossível é informação (§1.4) |
| Nenhum alerta ativo | As duas direções continuam aparecendo | Otimizar não depende de estar apanhando; é o segundo uso do produto |
| O operador segue a direção e uma condição nova dispara | Recalcula e mostra a condição nova, com a direção que a resolve na frente | Modelo vivo (**E5** §4) |

---

## Dependências deste documento

**Valores numéricos.** A estrutura está completa e os limiares existem, mas **cinco entram com fragilidade declarada**, e quem for construir precisa saber disso:

| Conjunto | Situação |
|---|---|
| **Piso de espessura de cavaco (hex)** | Depende de dois números que divergem entre levantamentos — o raio de aresta (rβ) e a razão mínima. O **produto** dos dois move o piso por uma ordem de grandeza. Soma-se que a frequência de disparo **não foi verificada**: a regra pode quase nunca disparar na faixa de uso real. Simular antes de implementar |
| **Limiares de balanço (§3.2)** | Os cinco vêm de **um único fabricante**, e de páginas da própria linha antivibratória — há interesse comercial em publicar balanço alto. Contraste: os limiares de furação têm três fabricantes independentes |
| **Fatores 0,6 e 1,4 da faixa de velocidade de corte (vc)** | Decisão de projeto declarada, sem fonte publicada. É a tolerância que envelopa a incerteza do próprio modelo sem disparar dentro dela |
| **Gatilho de rasgo cheio em 0,95** | Definição operacional de projeto, não dado |
| **Macho de conformação em material que não conforma** | A lista de materiais está registrada, mas **não foi verificada em fonte** |

**Marcadores ⧗ abertos:** a deflexão em micrômetros (§3.3) e a previsão de vida em número (§5.2). Os dois dependem de obter documentos **nomeados** — não de mais busca. Enquanto não chegarem, o produto entrega a leitura qualitativa, declarada como tal.

**Perguntas fechadas (bloco de decisão, 27/08/2026):**

| # | Pergunta | Decisão | Onde |
|---|---|---|---|
| Q28 | Espessura de cavaco entre 0,02 e 0,1 mm — banda de erro maior ou marca de extrapolado? | **Marca de extrapolado, estendida até 0,1 mm.** Nenhum número novo é inventado; alinha com o canônico do motor §1.5. Banda maior exigiria dizer quanto — número que não existe | §3.1 gatilho 11a |
| Q29 | Rasgo cheio sem o comprimento de aresta — qual alvo a mensagem entrega? | **Dissolvida.** O alerta descreve o risco, não entrega alvo de ajuste — o campo ausente não afeta a mensagem | §3.5 |

> **Nota 31/08/2026.** Q28 falava em "marca de extrapolado". A procedência saiu do produto e essa marca de tela também. O que Q28 decidiu e continua valendo: o gatilho 11a passa a disparar em `hm < 0,1 mm` (antes `0,02 mm`), como alerta de processo — ver §3.1 gatilho 11a.

**Pergunta ainda aberta (depende de dado bloqueado):**

| # | Pergunta | Onde |
|---|---|---|
| Q27 | A força que entra na deflexão é o **pico** por ciclo de dente ou a **média**? O pico é a escolha conservadora; decide-se junto com os coeficientes de força, que ainda não foram obtidos | §3.3 |

**Duas perguntas que este documento fechou** — não viraram pendência porque a regra da §1 as responde: nenhum balanço pede confirmação explícita antes de entregar, e a **marca de forçado sai do produto** (nada trava, logo nada é forçado).

**Referências cruzadas:**

| Assunto | Documento |
|---|---|
| Onde o alerta e o nível aparecem na tela, e quando não esmaecem | **E5** §2 · §4 · §9 |
| O que o sistema exibe e o fator de segurança | **E3** |
| Validação na entrada — o que é rejeitado no campo antes de virar resultado | **E2** §4 · §5.3 |
| Ferramentas, substratos e materiais que definem as faixas comparadas | **E1** |
| O que o registro de uma simulação guarda | **E6** |
| O que ficou de fora, com motivo | **E7** |
| Fórmulas, limiares e a procedência de cada valor | `canonicos/` |
