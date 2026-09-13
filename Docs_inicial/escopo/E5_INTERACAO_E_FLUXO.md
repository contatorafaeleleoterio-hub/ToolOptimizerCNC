# E5 — Interação e Fluxo

**O que este documento define:** como o operador conduz o sistema — a ordem em que informa os dados, quando o cálculo acontece, o que pode editar, como pede explicação, e como o sistema se comporta em cada situação, inclusive nas anormais.

**O que não define:** aparência (cor, tipografia, espaçamento, ícone), arquitetura, tecnologia.

**Sobre os exemplos:** os blocos monoespaçados deste documento ilustram **conteúdo e hierarquia da informação** — o que o operador lê e em que ordem. Não são desenho de tela, não definem posição em pixels nem estilo visual.

**Sobre as lacunas:** onde o material de origem não define um comportamento, este documento marca **⚠ NÃO DEFINIDO** e formula a pergunta. Nenhum comportamento foi inventado para preencher vazio.

> **Escopo (27/08/2026).** Descreve o **produto completo**. O **controle único de agressividade** (§5.4) fica **fora do MVP** (`mvp/MVP_CALCULADORA_PARAMETROS.md` §12). E, por decisão de 27/08, **nada trava, nada bloqueia**: onde este texto disser "bloqueio" ou "limite físico que para o controle", leia "condição impossível — o resultado sai e o alerta fica crítico" (`E0` §3.3, `E4` §1).

---

## 1. Princípios de interação

Estas regras não se reabrem sem motivo escrito. Cada uma existe por uma razão registrada.

| # | Princípio | Por quê |
|---|---|---|
| **P1** | **Painel persistente com zonas fixas**, nunca assistente em etapas sequenciais | A calculadora é usada dezenas de vezes por dia. Obrigar navegação em passos custa tempo em toda repetição. |
| **P2** | **Ordem: contexto → categórico → geométrico → contínuo → ação** | Cada camada restringe a seguinte. Inverter faz o operador preencher campo cujo domínio ainda não existe. |
| **P3** | **Todo campo visível precisa mudar um número que o operador lê na tela** | Campo que não entra em conta ensina o operador a preencher por preencher, e desvaloriza os campos que importam. |
| **P4** | **Teto de 6 campos por tipo de ferramenta** no fluxo padrão | Acima disso a tela deixa de ser calculadora e vira formulário. |
| **P5** | **Estado vazio honesto** — sem cálculo, nenhum número é exibido | Zero calculado apresentado como resultado é a mentira mais fácil de contar e a mais difícil de detectar. |
| **P6** | **Nenhum resultado visual sem função** | Indicador que não alimenta validação nem decisão é ruído, e ruído treina o operador a ignorar a tela. |
| **P7** | **Destaque visual reservado a 1 ou 2 números acionáveis** | São os que o operador digita na máquina. Se tudo tem destaque, nada tem. |
| **P8** | — | Princípio removido em 31/08/2026: a procedência saiu do produto. Rótulo preservado para não deslizar P9–P12 nem quebrar referências. |
| **P9** | **Alvo de toque generoso, ação sempre visível** — nunca apenas ao passar o cursor | O ambiente é chão de fábrica, e o operador trabalha de luva. |
| **P10** | **Zero dependência de rede** em tempo de uso | Oficina sem conexão precisa abrir a tela idêntica. |
| **P11** | **Recomendação, limite e impossibilidade são camadas separadas** — e **nenhuma delas trava** | Cada uma muda o texto do aviso e a gravidade do nível, nunca se o resultado aparece. Nada é ultrapassado em silêncio: o alerta descreve a condição e situa o valor. |
| **P12** | **O sistema recomenda, o operador decide** — o resultado é sempre entregue, por mais absurdo que seja, com a condição nomeada | O operador é o responsável técnico. O sistema apoia, não assume a responsabilidade — e não pede permissão para entregar o que já é dele. |

### 1.1 Como os princípios se resolvem quando colidem

| Colisão | Quem ganha | Por quê |
|---|---|---|
| P3 (campo precisa ter efeito) × necessidade de um dado futuro | **P3** | O campo só aparece quando o cálculo o consumir. Coletar dado "para depois" treina o operador a preencher sem consequência. |
| P5 (estado vazio) × pressa do operador | **P5** | Um número plausível e errado custa mais que a espera de um clique. |
| P7 (poucos destaques) × pedido de mais informação na tela | **P7** | Informação adicional entra nas zonas de detalhe, não no destaque. |
| P11 (camadas de limite) × P12 (operador decide) | **Convivem** | O operador ultrapassa qualquer limite sem pedir licença — mas nunca em silêncio: o alerta nomeia a condição e situa o valor. |

---

## 2. Estrutura do painel

Duas áreas lado a lado: **configuração** e **resultado**. Abaixo de uma largura mínima, empilham em coluna única preservando a ordem.

```
┌─ CABEÇALHO ────────────────────────────────────────────────┐
│ identidade · material ativo · operação · ferramenta · nível │
├─ CONFIGURAÇÃO ───────────────┬─ RESULTADO ─────────────────┤
│ 1. Contexto                  │ Z1  Cabeçalho do resultado  │
│ 2. Categórico                │ Z2  Alerta e ação           │
│ 3. Geométrico                │ Z3  Resumo da ferramenta    │
│ 4. Ajuste fino               │ Z4  Rotação e avanço        │
│ ──────────────────────────── │ Z5  Indicadores             │
│ 5. Ação — Calcular (fixo)    │ Z6  Detalhes                │
└──────────────────────────────┴─────────────────────────────┘
```

### 2.1 Área de configuração — ~~cinco~~ **três** blocos, nesta ordem

> **Emendado em 09/09/2026.** Esta tabela pedia cinco blocos e o bloco 1 já não podia existir:
> o **perfil da máquina** é anti-requisito declarado (brief §12 — exigi-lo transforma calculadora
> em configurador) e o **fator de segurança** saiu dele em 01/09/2026 para a área Configurações.
> Sem esses dois, o bloco de contexto ficou sem conteúdo. O protótipo, que é o contrato do painel
> (decisão do Mestre, 08/09/2026), tem **três blocos** — material, ferramenta e ajuste fino — mais
> o rodapé de ação. É essa a estrutura. Divergência **I** da especificação estrutural do painel.

| # | Bloco | Conteúdo |
|---|---|---|
| ~~1~~ | ~~**Contexto**~~ | ~~perfil da máquina e fator de segurança~~ — **bloco retirado em 09/09/2026:** perfil de máquina é anti-requisito (brief §12) e o fator de segurança mora na área "Configurações" desde 01/09/2026 (**E2** §7.1, `mvp/ESCOPO_CONFIGURACOES.md` §10). O bloco ficou vazio |
| 2 | **Categórico** | tipo de usinagem → ferramenta → material da peça → operação |
| 3 | **Geométrico** | campos dimensionais do tipo de ferramenta ativo |
| 4 | **Ajuste fino** | controles contínuos dos parâmetros de corte |
| 5 | **Ação** | comando de cálculo, fixo ao pé da área |

A ordem é obrigatória (P2). Um bloco agrupa campos que respondem à **mesma pergunta do operador**; dentro do bloco, a ordem segue a dependência entre os dados, não a conveniência visual.

### 2.2 Área de resultado — seis zonas, nesta ordem

| Zona | Conteúdo | Regra própria |
|---|---|---|
| **Z1** | material · operação · ferramenta · fator de segurança quando diferente do padrão (`100 %`) · nível de segurança | o indicador de nível **nunca** recebe tratamento de desatualizado — **nem acompanha a lente do fator** (**E3** §6) |
| **Z2** | a condição mais grave ativa, com a grandeza medida contra a referência | a mensagem descreve o risco e situa o valor; não instrui (§9) |
| **Z3** | especificação compacta do que está montado | — |
| **Z4** | rotação e avanço, em destaque, **editáveis** (§5) | os dois únicos números com destaque de herói (P7) |
| **Z5** | leitura consolidada da condição de corte | — |
| **Z6** | parâmetros usados, grandezas secundárias | recolhido por padrão |

### 2.3 Por que a ação fica ao pé

O fluxo é de cima para baixo, e a ação principal encerra o fluxo. Comando no topo obriga o olho a voltar depois de preencher tudo.

### 2.4 Casos de borda — estrutura

| Situação | Comportamento | Por quê |
|---|---|---|
| Largura insuficiente para duas áreas | Empilha em coluna única, **configuração acima do resultado**, preservando a ordem dos blocos | A ordem carrega a dependência de dados; inverter quebraria P2 |
| Área de resultado vazia (antes do primeiro cálculo) | Ocupa o espaço com a orientação de ação, sem colapsar a área | Área que some e volta reposiciona o painel inteiro a cada cálculo |
| Conteúdo de Z6 maior que a altura disponível | Rola dentro da própria zona | Rolar o painel inteiro faria os números de Z4 saírem de vista |

---

## 3. Blocos colapsáveis

O operador mantém aberto apenas o que está usando.

| # | Regra | Por quê |
|---|---|---|
| 1 | **Todo bloco de entrada pode ser recolhido**, por cabeçalho clicável com alvo de toque generoso | — |
| 2 | **Cabeçalho recolhido mostra o resumo do conteúdo**, não apenas o título | Gaveta que esconde valor sem resumo troca poluição visual por cegueira |
| 3 | **O estado de cada bloco persiste entre sessões** | O operador não reconfigura a tela toda vez que abre |
| 4 | **Bloco com campo inválido ou obrigatório vazio não recolhe** — e abre sozinho se o erro surgir enquanto está recolhido | Erro escondido em gaveta é erro que não existe para o operador |
| 5 | **Sem gaveta dentro de gaveta**, no máximo quatro no total | Aninhamento transforma navegação em caça ao tesouro |
| 6 | O bloco de **contexto começa aberto** | É onde o perfil da máquina é conferido, e perfil errado contamina todo alerta de carga |

### 3.1 Exemplo de conteúdo — cabeçalhos recolhidos

```
▸ Contexto      12000 rpm · 15 kW · 80 Nm · 5000 mm/min · segurança 80%
▸ Categórico    Fresar · Fresa toroidal MD · Aço 1045 · Desbaste
▸ Geométrico    Ø10 · Z4 · L30 · r1,0
▾ Ajuste fino   [aberto]
```

O resumo mostra **os valores**, não a contagem de campos preenchidos. "3 campos" não informa nada; "Ø10 · Z4 · L30" permite conferir sem abrir.

### 3.2 Casos de borda — colapso

| Situação | Comportamento | Por quê |
|---|---|---|
| Operador recolhe um bloco e depois um campo dele fica inválido | O bloco **abre sozinho** e sinaliza o campo | Regra 4 |
| Todos os blocos recolhidos ao mesmo tempo | Permitido — a área de configuração vira uma lista de resumos | É a leitura de conferência antes de calcular |
| Bloco recolhido com valor manual dentro | O resumo indica que há valor manual no bloco | Sem isso, o operador perde de vista que fugiu da recomendação |
| Troca de tipo de ferramenta muda os campos do bloco geométrico enquanto ele está recolhido | O bloco **abre**, porque os campos novos ainda não têm valor conferido | Campo novo recolhido é campo preenchido sem ninguém olhar |

---

## 4. Momento do cálculo — modelo híbrido

> **O primeiro cálculo é um compromisso consciente. Depois dele, o painel é vivo.**

| Fase | Comportamento |
|---|---|
| **Antes do primeiro cálculo** | Mudar qualquer campo apenas limpa o resultado. Nenhum número é exibido (P5). |
| **Depois do primeiro cálculo** | Qualquer mudança de parâmetro **ou** edição de resultado recalcula na hora, sem clique adicional. |

O comando de cálculo **permanece na tela** — nunca some, nunca é desabilitado. Depois do primeiro uso ele passa a ter duas funções: registrar a simulação no histórico, e servir de ponto de retorno quando o operador quiser reancorar.

> **Precisado em 09/09/2026 — divergência F da especificação estrutural do painel.** O protótipo,
> que é o contrato, **desabilita** o comando enquanto falta requisito, com o `title` e a linha de
> feedback nomeando o que falta. Isso não contraria a **R1**: a R1 proíbe **recusar um resultado**,
> e antes do primeiro cálculo não existe resultado a recusar — falta entrada. O comando nunca
> desaparece, nunca fica desabilitado com o conjunto completo na tela, e nunca se recusa a entregar
> um número que poderia existir, por absurdo que seja. Some um campo obrigatório depois do cálculo e
> o painel volta ao estado vazio (§7.4 do brief): de novo, não há o que calcular. **O que a R1
> proíbe é o silêncio; aqui o comando diz exatamente o que falta.**


### 4.1 Estado transitório

Entre uma mudança e o resultado novo, os **números** recebem tratamento de desatualizado. O **alerta e o indicador de nível de segurança não recebem** — esmaecer alarme ativo é o oposto do que um painel industrial deve fazer.

### 4.2 Casos de borda — momento do cálculo

| Situação | Comportamento | Por quê |
|---|---|---|
| Operador muda o material depois de já ter calculado | Recalcula na hora, com os parâmetros recomendados do material novo | Modelo vivo. O material define a base de tudo — manter parâmetros do material anterior entregaria número sem sentido |
| Operador muda a ferramenta depois de calcular | Recalcula na hora. Os valores manuais nos parâmetros de corte **permanecem enquanto a família for a mesma**; quando a família muda, voltam à região recomendada e o sistema **avisa** (Q1, 27/08/2026) | O `fz` de uma fresa não tem sentido numa rosca — quando a família muda, o valor perde o contexto; não é o sistema decidindo por ele. Dentro da mesma família, o operador não perde o que ajustou |
| Campo obrigatório fica vazio depois do primeiro cálculo | O resultado é limpo e o painel volta ao estado vazio, com o campo sinalizado | Resultado calculado com dado que já não existe é resultado falso |
| Campo recebe valor inválido (fora de faixa, não numérico) | O resultado **anterior é mantido**, com tratamento de desatualizado, e o campo é sinalizado | Limpar tudo por um erro de digitação faz o operador perder o resultado bom que tinha |
| Operador aciona o comando de cálculo sem ter mudado nada | Recalcula e **registra nova entrada no histórico** | O comando é o gesto de "quero guardar este ponto" |
| Mudança acontece enquanto o resultado anterior ainda está sendo calculado | O cálculo em andamento é descartado e o novo assume | O operador espera ver o efeito do último gesto, não do penúltimo |

---

## 5. Edição dos resultados

O operador edita rotação e avanço diretamente, e o sistema recalcula o resto. É uma calculadora bidirecional, não um relatório.

### 5.1 O que é reversível

| Editado | O sistema deduz | E recalcula |
|---|---|---|
| **Rotação (n)** | a velocidade de corte (vc) correspondente | avanço da mesa (vf), taxa de remoção de material (MRR), potência de corte (Pc), torque (Mc), índices |
| **Avanço da mesa (vf)** | o avanço por dente (fz) correspondente, desfazendo o afinamento de cavaco (CTF) quando ele estiver ativo | taxa de remoção, potência, torque, índices |

Ambas as inversões são unívocas com os demais dados fixos: não há ambiguidade nem aproximação numérica.

**Requisito absoluto:** a inversão recalcula percorrendo **a mesma cadeia de cálculo** do sentido direto. Uma segunda implementação paralela diverge da primeira no dia em que alguém alterar uma sem a outra — e a divergência aparece como dois números diferentes para a mesma condição, em telas diferentes.

### 5.2 Precedência entre edições

O operador pode ter fixado mais de um número. A regra:

| Estado | Comportamento |
|---|---|
| Rotação fixada, avanço livre | O avanço é **recalculado** a partir da rotação fixada |
| Avanço fixado, rotação livre | A rotação segue o cálculo normal; o avanço permanece no valor fixado |
| Ambos fixados | Ambos permanecem. O avanço por dente (fz) resultante é deduzido dos dois |

**Princípio:** valor que o operador fixou não se move sozinho. Se mexer, ele perde a referência do que decidiu.

### 5.3 O que não é reversível

Arrastar um **índice consolidado** para um valor desejado é um problema sem solução única: existem infinitas combinações de parâmetros que produzem o mesmo índice. Sem uma regra, o sistema teria de escolher qual parâmetro mexer — e essa escolha é a decisão de engenharia que pertence ao operador.

Por isso os índices são **somente leitura**.

### 5.4 Ajuste multiparâmetro

Existe um controle único de **agressividade**, de conservador a produtivo, que move os parâmetros de corte em conjunto ao longo de um caminho declarado, entre o piso conservador e o teto recomendado de cada um.

| # | Regra | Por quê |
|---|---|---|
| 1 | Nasce no valor recomendado, com essa posição marcada na escala | Quem não mexe obtém exatamente a recomendação |
| 2 | **Nunca empurra um parâmetro além do limite dele** para satisfazer os outros | O controle é conveniência, não licença para furar limite |
| 3 | Movê-lo marca todos os parâmetros afetados como manuais | O operador precisa saber que saiu da recomendação, mesmo tendo saído com um gesto só |
| 4 | Mexer depois num controle individual **não** o move de volta — ele passa a exibir estado misto | Mostrar uma posição que já não corresponde aos parâmetros seria mentira visual |
| 5 | — | Regra removida em 31/08/2026. Número preservado; a lista não é renumerada |
| 6 | Não empurra parâmetro além do limite dele — mas **nada trava**; ultrapassar acende o alerta (§5.6) | P11 |

É o único controle multiparâmetro do sistema. **Fora do MVP** (`mvp` §12) — entra depois, com o vetor de movimento declarado.

### 5.5 Valor manual e caminho de volta

- Todo parâmetro que divergir do recomendado exibe marca de **manual**.
- Todo controle manual tem **retorno ao valor recomendado** ao lado. Sem isso a edição vira armadilha: o operador perde a referência e não consegue voltar sem recomeçar.
- Existe um comando único de **voltar tudo ao recomendado**.
- O registro de uma simulação guarda o valor manual **e** o recomendado da época, para que o histórico continue interpretável depois.
- **Escolher a ferramenta não recebe marca de manual** — escolher ferramenta é configuração, não desvio da recomendação.

### 5.6 Limite durante a edição — nenhum controle para

- **Nenhum controle trava em limite nenhum**, seja de máquina, de processo ou de geometria. O operador leva o valor para onde quiser, e o resultado sai.
- Ultrapassar um limite **acende o alerta correspondente** (**E4**), com a grandeza medida, o limite e de quanto a distância — nunca uma parede.
- **Não existe ação de liberar limite, nem marca de forçado.** Nada estava preso, logo nada é forçado.
- Com uma **condição impossível** ativa, os controles continuam vivos: a mensagem explica o que a montagem não realiza, e o caminho — mudar a ferramenta, a montagem ou o valor.

### 5.7 Exemplo de conteúdo — edição além do limite

```
Rotação    14 500 rpm   ← acima do limite declarado
           A rotação máxima declarada é 12 000 rpm — o resultado
           abaixo continua valendo para a rotação que você digitou.
           Para caber no teto de 12 000 rpm, a velocidade de corte
           equivalente é 172 m/min.
```

### 5.8 Casos de borda — edição

| Situação | Comportamento | Por quê |
|---|---|---|
| Edição do avanço da mesa com o afinamento de cavaco (CTF) ativo | O sistema desfaz a correção para deduzir o avanço por dente (fz) real, e o exibe | Sem desfazer, o avanço por dente mostrado não seria o que a aresta enxerga |
| Edição leva a rotação a zero ou negativo | Não aceita o valor | Grandeza sem significado físico — não é limite, é ausência de grandeza |
| Edição leva a um avanço por dente abaixo da faixa útil de corte | Aceita, com o indicador do parâmetro sinalizando a condição | O operador decide (P12); o sistema avisa (P11) |
| Condição impossível ativa e operador continua editando | Controles vivos, resultado na tela, alerta ativo | §5.6 |
| Operador passa de um limite e depois volta para dentro dele | O alerta **desaparece** no recálculo, e o nível cai junto | O aviso descreve a condição atual, não o histórico do gesto |
| Operador salva um resultado com alerta ativo e depois recalcula sem ele | O registro **salvo** mantém o alerta que tinha no momento em que foi salvo | O registro é a fotografia daquele momento |
| Valor fixado deixa de ser alcançável porque outro dado mudou | **Mantém e sinaliza** (Q2, 27/08/2026): o parâmetro aparece fora da faixa, marcado, com a informação do que seria preciso para chegar lá — fato, não instrução. Não solta sozinho | Valor que o operador fixou não se move sozinho (§5.2). Soltar em silêncio tiraria dele a decisão que tomou |

---

## 6. Ajuda contextual

A explicação de cada parâmetro é **parte do controle**, não uma página à parte.

| # | Regra | Por quê |
|---|---|---|
| 1 | Aberta por um gatilho ao lado do rótulo do parâmetro | A dúvida nasce onde o controle está |
| 2 | **Abre por clique**, nunca apenas ao passar o cursor | Quem navega por teclado precisa alcançar; quem usa luva também |
| 3 | **Empurra o conteúdo** em vez de flutuar sobre ele | Conteúdo flutuante fecha ao interagir com o controle — exatamente o momento em que o operador quer ler |
| 4 | **Várias podem ficar abertas ao mesmo tempo** | O operador compara dois parâmetros lendo os dois |
| 5 | Fecha pelo próprio gatilho ou por tecla de escape | — |
| 6 | O estado **não** persiste entre sessões | Ajuda é consulta pontual, diferente do colapso dos blocos |

### 6.1 Conteúdo — quatro partes

```
Avanço por dente (fz)

O que é          A espessura da lasca que cada aresta retira
                 a cada volta.

Ao aumentar      Mais material por volta e menos tempo de corte,
                 com mais força sobre cada aresta.

Ao diminuir      Menos carga por aresta — mas, abaixo de um ponto,
                 a aresta deixa de cortar e passa a esfregar,
                 gerando calor sem remover material.

Equilíbrio       O valor recomendado fica na faixa em que a lasca
                 se forma bem e a aresta trabalha sem sobrecarga.
```

A estrutura é a mesma para todos os parâmetros. Um parâmetro sem os quatro textos escritos **não entra na tela** — controle sem explicação é caixa-preta com um botão.

### 6.2 Casos de borda — ajuda

| Situação | Comportamento | Por quê |
|---|---|---|
| Operador ajusta o controle com a ajuda aberta | A ajuda **permanece aberta** | É exatamente o momento em que ele quer ler |
| Operador abre a ajuda de vários parâmetros e a área de configuração fica longa | Permitido — a área rola | Regra 4. O operador fecha quando quiser |
| Ajuda aberta em bloco que o operador recolhe | Recolhe junto, e volta fechada quando o bloco reabrir | Ajuda é consulta pontual (regra 6) |
| Ajuda aberta em tela estreita | **Mesmo comportamento em qualquer tela** — empurra o conteúdo, sem limite de quantas ficam abertas; a área rola (Q3, 27/08/2026) | Comportamento que muda com o tamanho da tela é o que ninguém lembra que existe. Limitar a uma fecharia a ajuda que o operador está lendo para abrir outra — justo quando ele compara dois controles. Rolar é universal, e §11.1 já diz "mesma capacidade em tela pequena, não versão reduzida" |

---

## 7. Profundidade de entrada

> **Esta seção foi reescrita em 26/08/2026.** A versão anterior especificava um **modo rápido** com
> quatro entradas — material, diâmetro, arestas e operação — que entregava rotação e avanço e
> **escondia** potência de corte (Pc), torque (Mc), taxa de remoção de material (MRR), relação
> balanço/diâmetro (L/D) e todo alerta derivado de profundidade de corte (ap) e penetração de
> trabalho (ae). **Essa calculadora reduzida está descartada.**

### 7.1 Por que ela saiu

Três razões independentes, e qualquer uma bastaria:

| # | Razão |
|---|---|
| 1 | **Uma de suas quatro entradas é proibida.** "Operação" — desbaste, semi-acabamento, acabamento — pertence ao ambiente declarado, não ao núcleo. Quem decide o que está fazendo, e com que agressividade, é quem está na máquina |
| 2 | **Esconder verificação não é ser rápido.** Um resultado sem potência, torque e ~~alerta de~~ espessura de cavaco não é o mesmo resultado entregue mais depressa: é um resultado menos verificado, e nada na tela permitiria ao operador saber disso |
| 3 | **O painel completo já é a entrada mínima.** A evidência de campo descreve como uso corrente exatamente os campos do painel padrão — material, tipo de ferramenta, diâmetro com o que o tipo exigir, balanço (L) e profundidade de corte (ap). Não havia um segundo modo a construir |

### 7.2 O que fica no lugar

**Um painel só, e o eixo de profundidade dentro dele.**

| | **Entrada mínima** | **Entrada completa** |
|---|---|---|
| **Quando** | Na máquina, antes do start — o uso corrente | Testando, verificando, ou programando com antecedência |
| **O que é** | o painel, com o bloco de ajuste fino **recolhido** | o mesmo painel, com o bloco **aberto** |
| **O que muda no resultado** | **nada.** Os mesmos números, os mesmos alertas | — |

**A profundidade é de entrada, nunca de saída.** O operador declara mais ou menos variáveis; o
sistema verifica sempre a mesma coisa e mostra sempre a mesma coisa.

### 7.3 As três regras

| # | Regra | Por quê |
|---|---|---|
| 1 | **Todo valor de partida é visível no controle recolhido**, pelo cabeçalho que mostra os valores | Um padrão que o operador não vê é uma premissa escondida — e premissa escondida é a que ele descobre na peça |
| 2 | **Nada é assumido quando errar por fator dois é possível.** Se a variável multiplica o resultado, ela é campo — nunca premissa | Um número errado por fator dois **parece plausível**: está na ordem de grandeza certa, e nada na tela indicaria o erro |
| 3 | **Recolher ou abrir o ajuste fino não altera nenhum número** | Se alterasse, o gesto de organizar a tela viraria um gesto de cálculo |

### 7.4 Casos de borda — profundidade de entrada

| Situação | Comportamento | Por quê |
|---|---|---|
| Operador recolhe o ajuste fino com valores manuais dentro | Os valores **permanecem ativos**, e o cabeçalho recolhido os mostra com a marca de manual | Regra 3. Recolher é organizar a tela, não desfazer trabalho |
| Operador abre o ajuste fino pela primeira vez | Os controles já estão nos valores que produziram o resultado na tela | Não existe estado em que o painel calcula com um valor e exibe outro |
| Trocar o tipo de ferramenta com o ajuste fino recolhido | O bloco **abre sozinho** se algum controle deixar de existir ou mudar de faixa | Controle novo recolhido é controle aplicado sem ninguém olhar |

## 8. Estados do painel

| Estado | Comportamento | Exemplo de conteúdo |
|---|---|---|
| **Vazio** | Nenhum número, nenhum índice, nenhum horário. Uma chamada curta orienta a ação. | `Configure a ferramenta e o material, depois calcule.` |
| **Desatualizado** | Os **números** recebem tratamento de desatualizado. Alerta e nível de segurança **não**. | — |
| **Crítico** | Mostra a razão, o valor medido e o limite — e **o resultado continua na tela**, com a edição viva. | `CRÍTICO — penetração de trabalho (ae) 12 mm em fresa Ø10. A fresa corta no máximo 10 mm: o resultado abaixo descreve uma remoção que não vai acontecer (2 mm sem aresta).` |
| **Fora do envelope** | Diâmetro fora da faixa em que os dados de partida foram levantados: o resultado sai, com o alerta de processo (**E4** gatilho 11). | `ATENÇÃO — diâmetro acima da faixa coberta pela tabela de partida.` |

### 8.1 Combinação de estados

Os estados não são exclusivos. A precedência de exibição do alerta principal é:

```
CRÍTICO  >  ATENÇÃO  >  NORMAL
```

Três níveis, e **nenhum deles impede o resultado** (**E4** §2). O sistema mostra o dado que usa, visível e editável (§4.7 do MVP, **E1** §6.3).

### 8.2 Casos de borda — estados

| Situação | Comportamento | Por quê |
|---|---|---|
| Condição impossível ativa enquanto o operador edita um resultado | Os controles continuam vivos, o resultado sai, o alerta crítico fica ativo | Nada trava — parar a edição sob alerta seria a recusa que a `E0` §3.3 tirou do produto (§5.6) |
| Condição impossível deixa de valer | O painel volta ao estado normal e o movimento sinaliza a mudança | §12 |
| Estado desatualizado persiste porque um campo está inválido | O painel mostra o resultado anterior esmaecido **e** o campo sinalizado | §4.2 |

---

## 9. Comunicação de alerta

O alerta **descreve o risco e diz onde o valor está** — não instrui o operador sobre o que fazer (bloco de decisão, 27/08/2026). O sistema informa; a decisão de como reagir é do operador. As regras detalhadas da mensagem estão em **E4** §1.

### 9.1 Estrutura da mensagem

```
[condição]  —  [grandeza medida] contra [referência]
```

**Exemplo:**

```
CRÍTICO — potência de corte (Pc) exigida 17,2 kW contra 15,0 kW disponíveis (excede em 15%)
```

O número factual — de quanto excede, qual a faixa tabelada, qual o limiar — fica na mensagem, porque situa sem mandar. O que sai é o imperativo ("reduza", "aumente", "divida em passes").

### 9.2 Uma condição por vez

A linha de alerta descreve **uma** condição, a mais grave ativa. Havendo outra, a linha diz que existe, sem detalhá-la ali (§9.2 continua valendo para a leitura de detalhe).

### 9.3 Casos de borda — alerta

| Situação | Comportamento | Por quê |
|---|---|---|
| Duas condições de mesma gravidade ativas | Descreve a de maior consequência prática e indica que há outra | Uma linha com duas condições vira ruído |
| Nenhuma condição ativa | A zona mostra a condição normal, não fica vazia | Zona que some e volta faz o painel saltar |

---

## 10. Acessibilidade e ambiente de fábrica

| Requisito | Definição |
|---|---|
| **Alvo de toque** | Generoso em todo controle, inclusive gatilhos de ajuda — operação com luva |
| **Contraste** | Suficiente para leitura em ambiente de oficina, com iluminação irregular |
| **Foco visível** | Em todo elemento alcançável por teclado |
| **Operação por teclado** | Tudo que se faz com o ponteiro se faz pelo teclado, incluindo abrir ajuda e ajustar controles contínuos |
| **Cursor sobre o elemento** | Nunca é o único caminho para uma informação ou ação |
| **Rede** | Nenhuma requisição em tempo de uso |
| **Movimento** | A preferência do sistema por movimento reduzido é respeitada e zera as animações |
| **Cor** | Nunca é o único portador de significado — todo estado tem também rótulo e posição |

### 10.1 Por que "sem rede" é requisito e não preferência

A oficina pode não ter conexão. Se qualquer parte da tela depender de rede — fonte, ícone, tabela de dados — o sistema abre diferente do que o operador conhece, ou não abre. Um painel que muda de aparência conforme a conexão destrói a confiança que ele levou meses para construir.

---

## 11. Tela pequena

A mesma capacidade, reorganizada — não uma versão reduzida.

| Elemento | Comportamento |
|---|---|
| **Áreas** | Viram seções alternáveis: configurar · resultados · ajustar, com aviso quando há resultado novo em outra seção |
| **Leitura** | Alternância entre modo industrial — números grandes, controles compactos — e modo explicativo, com a gaveta de instrução de cada parâmetro |
| **Indicadores** | Forma compacta, preservando a mesma leitura e os mesmos limiares |
| **Toque** | Alvos ampliados e resposta tátil onde o dispositivo permitir |
| **Conexão** | Aviso claro quando o sistema estiver operando sem conexão |

### 11.1 O que não muda em tela pequena

- Os limiares de segurança e os cálculos são **idênticos**. Nenhuma simplificação de física por tamanho de tela.
- O estado vazio continua honesto (P5).

### 11.2 Casos de borda — tela pequena

| Situação | Comportamento | Por quê |
|---|---|---|
| Resultado novo chega enquanto o operador está na seção de configuração | A seção de resultados sinaliza que há novidade, sem trocar de seção sozinho | Trocar a tela sob o dedo do operador é a forma mais rápida de causar um toque errado |
| Bloqueio surge enquanto o operador está em outra seção | O aviso aparece **na seção atual**, não espera ele navegar | Bloqueio é condição de segurança, e não pode depender de navegação |

---

## 12. Movimento e feedback

O movimento comunica mudança de estado; nunca decora.

| Evento | Sinalização | Por quê |
|---|---|---|
| **Mudança de nível de segurança** | Movimento proporcional à gravidade: a transição para condição crítica é mais insistente que para condição segura | A urgência do movimento carrega informação |
| **Comando de cálculo acionado** | Confirmação curta de que executou | Sem confirmação, o operador aciona duas vezes |
| **Resultado novo** | Perceptível sem exigir que o operador procure o que mudou | Num painel vivo, a mudança pode ser sutil demais para o olho pegar |
| **Movimento reduzido ativo no sistema** | Todas as animações são suprimidas; a informação passa a ser transmitida só por estado e rótulo | A informação nunca depende exclusivamente do movimento |

---

## Dependências deste documento

**Nenhum valor numérico pendente.** Todo o conteúdo é comportamental.

**Perguntas fechadas (bloco de decisão, 27/08/2026):**

| # | Pergunta | Decisão | Onde |
|---|---|---|---|
| Q1 | Valores manuais ao trocar de ferramenta? | Permanecem enquanto a família for a mesma; voltam à região recomendada quando a família muda, avisando | §4.2 |
| Q2 | Valor fixado que fica inalcançável? | Mantém e sinaliza — aparece fora da faixa, marcado, com a informação do que falta para chegar lá. Não solta sozinho | §5.8 |
| Q3 | Várias ajudas abertas em tela pequena? | Sem limite — mesmo comportamento em qualquer tela; a área rola | §6.2 |
| ~~Q4~~ | ~~Resultado do modo rápido pode virar favorito?~~ **Prejudicada em 26/08/2026** — o modo rápido que a originava não existe mais. Todo resultado vem do mesmo painel e do mesmo cálculo | — | §7 |

**Referências cruzadas:**

| Assunto | Documento |
|---|---|
| Limiares que disparam cada estado de segurança | **E4** |
| Campos de cada bloco de entrada e suas faixas | **E2** |
| O que cada zona de resultado exibe e como | **E3** |
| Regras de registro no histórico e nos favoritos | **E6** |
| Tipos de ferramenta e os campos que cada um pede | **E1** |
