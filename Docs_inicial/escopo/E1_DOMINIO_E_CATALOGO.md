# E1 — Domínio e Catálogo

**O que este documento define:** o que o sistema conhece — quais famílias de usinagem cobre, quais ferramentas oferece, em que substratos, e quais materiais de peça traz. Define também como essas listas se restringem entre si.

**O que não define:** os campos de entrada, suas faixas e o passo de cada um (**E2**); as fórmulas e constantes que consomem esses dados (`canonicos/`); o que o operador acrescenta ou edita por conta própria (**E6**).

**Sobre os exemplos:** os blocos monoespaçados ilustram **conteúdo e hierarquia da informação**. Não são desenho de tela.

---

## 1. A regra que governa esta seção

> **O catálogo tem uma entrada por variação real de mercado — e nenhuma por combinação teórica.**

Ferramenta é escolhida, não montada. Quando o sistema oferece o formato num campo e o material da ferramenta em outro, ele permite ao operador montar uma combinação que ninguém vende, e depois precisa de uma validação para recusá-la. **A prevenção de erro vem da estrutura da lista, não de uma checagem posterior.**

O corolário vale para toda esta seção: **item de catálogo que não muda nenhum número entregue não é item de catálogo.** Uma opção a mais numa lista custa uma decisão a mais do operador; se essa decisão não altera o resultado, ela treina quem usa a escolher sem olhar — que é exatamente o hábito a evitar nos campos onde a escolha *importa*.

---

## 2. As quatro famílias de usinagem

O sistema cobre quatro famílias. A família não é rótulo de organização: **ela decide quais grandezas existem** para aquela ferramenta.

| Família | O que o sistema calcula ali | Como o avanço é declarado |
|---|---|---|
| **Fresar** | rotação (n), velocidade de avanço da mesa (vf), espessura de cavaco (hex), potência de corte (Pc), torque (Mc), taxa de remoção de material (MRR), relação balanço/diâmetro (L/D) | **por dente** — avanço por dente (fz), depende do número de arestas (Z) |
| **Furar** | rotação, velocidade de avanço da mesa, potência de corte, torque, relação balanço/diâmetro | **por rotação** — avanço por rotação (fn); o número de arestas não entra |
| **Roscar** | rotação; o avanço depende da ferramenta — **macho**: amarrado ao passo da rosca (P); **fresa de rosca**: por dente | **macho:** pelo passo, não é escolha livre. **Fresa de rosca:** por dente (fz), com o número de arestas (Z) entrando — ela corta o filete com ferramenta rotativa de vários dentes, não com um macho sincronizado |
| **Mandrilar** | rotação, velocidade de avanço da mesa, profundidade de corte (ap) derivada da diferença de diâmetros | **por rotação** |

**Por que a distinção é estrutural, e não cosmética:** a velocidade de avanço da mesa em fresamento é diretamente proporcional ao número de arestas, e em furação não depende dele. Pedir o número de arestas numa broca seria campo sem efeito sobre número nenhum — o que a §1 proíbe. Amarrar avanço e passo vale para o **macho**: nele o avanço **é** o passo, e um valor diferente disso arruína o filete. A **fresa de rosca** é a exceção da família — corta o filete por interpolação helicoidal com ferramenta de vários dentes, e por isso avança **por dente** como uma fresa (Z entra no cálculo); o passo define só quanto ela sobe por volta.

---

## 3. As ferramentas

### 3.1 O substrato faz parte do nome, não de um campo separado

O mesmo formato de corte existe no mercado em mais de um material de ferramenta, e o material muda o resultado. A lista traz, por isso, **uma entrada por variação que existe à venda**, com o substrato escrito no nome — *"Fresa de Topo Reto — inteiriça, metal duro"*.

**Não existe campo "material da ferramenta"**, por três razões que precisam estar todas presentes:

| # | Razão | Consequência |
|---|---|---|
| 1 | A variação de substrato entre fabricantes **existe**, mas age sobre **vida e desgaste** — não sobre rotação (n), avanço, potência de corte (Pc) ou deflexão | Onde ela toca uma grandeza calculada, o efeito é pequeno demais para mudar o resultado |
| 2 | **Não existe vocabulário pelo qual o operador pudesse informá-la.** A classificação internacional de material de corte é feita **por aplicação**, não por composição — teor de cobalto, tamanho de grão e dureza não são especificação publicada na embalagem | Um campo que ninguém consegue preencher com verdade é um campo que será preenchido com chute |
| 3 | Cruzar formato e substrato em dois campos permite montar o que não existe | Com o substrato dentro do nome, *"cabeçote faceador em aço rápido"* simplesmente não é uma opção |

> **A justificativa importa tanto quanto a decisão.** Dizer que "o substrato é praticamente igual entre fornecedores" seria mais simples e está errado: existe medição publicada mostrando grão e cobalto diferentes entre fresas comerciais, com efeito no desgaste. A regra que sobrevive é a de cima — a variação existe, e ela não chega nas grandezas que esta calculadora entrega.

### 3.2 O que decide quais variações existem é a construção

| Construção | Substratos que existem no mercado | Consequência na lista |
|---|---|---|
| **Inteiriça (sólida)** | metal duro · aço rápido ao cobalto | duas entradas por geometria |
| **Pastilhada / indexável** | metal duro, padrão de fábrica | uma entrada só — **aço rápido não existe** como inserto indexável |

**"Metal duro" já significa a ferramenta revestida adequada ao material** — a inteiriça de catálogo sai revestida, e não há campo nem fator de revestimento (§5).

### 3.3 As geometrias

Dezessete geometrias nas quatro famílias. Símbolos: diâmetro da ferramenta (`D`) · número de arestas (`Z`) · balanço (`L`) · raio de ponta (`r` / `rε`) · ângulo de posição (`κ`) · passo da rosca (`P`) · avanço por rotação (`fn`). Substrato: **MD** metal duro · **HSS-Co** aço rápido ao cobalto.

| # | Geometria | Família | Construção | Substratos | `Z` padrão | Campos próprios | Partida — profundidade de corte (`ap`) · penetração de trabalho (`ae`) · balanço (`L`) |
|---|---|---|---|---|---|---|---|
| 1 | Fresa de Topo Reto | Fresar | inteiriça | MD · HSS-Co | 4 | — | 3 · 5 · 30 |
| 2 | Fresa Toroidal (raio de canto) | Fresar | inteiriça | MD | 4 | **raio de canto `r`** | 1 · 3 · 30 |
| 3 | Fresa Esférica | Fresar | inteiriça | MD · HSS-Co | 2 | — *(o raio é `D/2`, derivado)* | 2 · 3 · 25 |
| 4 | Fresa de Chanfrar | Fresar | inteiriça | MD · HSS-Co | 4 | **diâmetro menor `Dmin`** — o cálculo usa o diâmetro médio | 1 · 1,0 · 30 |
| 5 | Fresa de Alto Avanço | Fresar | pastilhada | MD | 3 | **ângulo de posição `κ`** (padrão 15°) | 1 · 8 · 30 |
| 6 | Cabeçote Faceador | Fresar | pastilhada | MD | 5 | **ângulo de posição `κ`** (padrão 45°) | 1 · 0,7×D · 40 |
| 7 | Fresa de Topo com Pastilhas | Fresar | pastilhada | MD | 2 | — *(arestas = insertos efetivos)* | 3 · 5 · 30 |
| 8 | Fresa de Disco / Serra | Fresar | pastilhada (MD) · inteiriça (HSS-Co) | MD · HSS-Co | 8 | rótulos trocados: `ap` é a **largura da fresa `b`**, `ae` é a **penetração de trabalho radial** | 5 · 3 · — |
| 9 | Broca Helicoidal | Furar | inteiriça | MD · HSS-Co | — | **ângulo de ponta** — 140° em metal duro, 118°/135° em aço rápido | — · — · 50 |
| 10 | Broca de Insertos | Furar | pastilhada | MD | — | **avanço por rotação `fn`** editável | — · — · 50 |
| 11 | Broca de Centro | Furar | inteiriça | MD · HSS-Co | — | **ângulo de ponta** (90° / 120°) | — |
| 12 | Escareador / Rebaixador | Furar | inteiriça | MD · HSS-Co | — | o diâmetro informado é o **maior** | — |
| 13 | Alargador | Furar | inteiriça | MD · HSS-Co | — | — | — · — · 40 |
| 14 | Macho de Corte | Roscar | inteiriça | HSS-Co · MD | — | **designação da rosca** · **passo `P`** · comprimento de rosca · furo já executado | — |
| 15 | Macho de Conformação | Roscar | inteiriça | HSS-Co · MD | — | idem, e **alerta em nível crítico** em material que não conforma | — |
| 16 | Fresa de Rosca | Roscar | inteiriça | MD | 3 | **designação** · **passo `P`** · diâmetro da fresa | — |
| 17 | Barra / Cabeçote de Mandrilar | Mandrilar | pastilhada | MD | 1 | **diâmetro inicial e final** · **raio de ponta `rε`** · **`fn`** | `ap` derivado |

**Comuns a todas:** diâmetro da ferramenta (D) e balanço (L). **Número de arestas (Z)** só onde o avanço é por dente — fresamento e fresa de rosca.

**O `Z` padrão é sugestão preenchida, nunca premissa escondida:** o campo fica visível e editável. Assumir quatro arestas numa ferramenta de duas entrega o dobro da velocidade de avanço correta, e o número resultante **parece plausível** — está na ordem de grandeza certa, e nada na tela indicaria o erro.

**Rosca fora da tabela de designações — o operador informa passo e diâmetro à mão** (Q21, 27/08/2026). Nas geometrias de roscar, o cálculo consome o **passo da rosca (P)** — que é o avanço por volta — e o **diâmetro (D)**; a designação (`M10×1,5`) é só um atalho que preenche esses dois campos a partir de uma tabela editável. Designação que a tabela não cobre não deixa a família indisponível: o operador digita passo e diâmetro, e o cálculo sai inteiro. É o mesmo padrão que calculadoras de roscar do mercado usam — banco de designações editável, com entrada manual sempre disponível.

**Os valores de partida são ponto de partida, não recomendação fechada.** Eles existem para que a tela nunca abra vazia; continuam editáveis, e o resultado registra quando um deles foi usado sem o operador tocar (**E3** §2.3).

### 3.4 Os campos que ficam deliberadamente de fora

Seis campos aparecem em ferramenta real e **não entram em conta nenhuma**. Pedir dado que não muda número treina o operador a preencher por preencher.

| Campo | Onde apareceria | Por que não entra |
|---|---|---|
| Refrigeração interna | broca de metal duro | Mudaria o limiar de furação intermitente e o avanço, mas nem o limiar novo nem o fator têm fonte |
| Sobremetal | alargador | Influenciaria avanço e acabamento; a regra não existe em fonte |
| Arestas | escareador, alargador | Furação trabalha por rotação, não por dente |
| Profundidade da feição | broca de centro, escareador | Não entra em nenhuma grandeza exibida |
| Ângulo de chanfro | fresa de chanfrar | O que a geometria consome é o diâmetro médio, não o ângulo |
| Ângulo de ponta | escareador | O ângulo só vira comprimento de ponta na broca helicoidal e na broca de centro |

**Eles voltam quando o cálculo souber usá-los** — não antes. Um campo desativado na tela é pior que um campo ausente: ocupa atenção para dizer que não serve.

### 3.5 Ordem e rótulo

| # | Regra | Por quê |
|---|---|---|
| 1 | A lista é agrupada **por geometria**; o substrato aparece dentro do grupo | O operador procura o formato antes de pensar no material da ferramenta |
| 2 | Dentro da geometria, a ordem vai **do mais usado ao menos** — metal duro, aço rápido ao cobalto. O primeiro é o padrão | O caminho curto é o caminho comum |
| 3 | O substrato aparece no rótulo **mesmo quando a geometria tem variação única** | O número foi calculado com aquele fator; o rótulo diz com qual ferramenta o resultado vale |
| 4 | A ferramenta ativa aparece **por extenso** junto do resultado | Ver **E3** §2.3 |

### 3.6 Exemplo de conteúdo — a lista como o operador lê

```
Fresar
    Fresa de Topo Reto — inteiriça, metal duro
    Fresa de Topo Reto — inteiriça, aço rápido ao cobalto
    Fresa Toroidal — inteiriça, metal duro
    Cabeçote Faceador — pastilhada, metal duro
    ...

Furar
    Broca Helicoidal — inteiriça, metal duro
    ...
```

### 3.7 Casos de borda — ferramentas

| Situação | Comportamento | Por quê |
|---|---|---|
| O material escolhido torna uma entrada inválida | A entrada **não é listada**; se era a ativa, o sistema move para a primeira válida e **avisa qual** | Troca silenciosa de ferramenta muda o resultado sem o operador saber |
| Geometria com uma só opção de ângulo | Vira **valor fixo exibido e travado**, com a razão ao lado — não um seletor de uma opção | Controle com uma opção só é ruído |
| Escolher ferramenta | **Nunca** recebe marca de manual | Escolher ferramenta é configuração, não desvio de uma recomendação |
| Ferramenta escolhida antes do material | O material continua sendo o primeiro filtro; se a escolha se tornar inválida, vale a regra da primeira linha | A dependência entre as listas tem uma direção só (§8) |

---

## 4. Os substratos

### 4.1 Os dois que o sistema conhece

**Metal duro · aço rápido ao cobalto.** Não há outros, e cada um só aparece nas geometrias em que existe à venda (§3.2). "Metal duro" cobre a ferramenta revestida adequada ao material — não existe distinção de revestimento no catálogo nem no cálculo (§5).

### 4.2 Aço rápido é nicho, não obsolescência

Fresa de aço rápido continua sendo fabricada e vendida, com dados de corte publicados. **Mas o que sobreviveu no mercado é o aço rápido ao cobalto ou sinterizado:** fresa de topo em aço rápido *sem* cobalto foi procurada em catálogo e não foi encontrada à venda. Por isso existe **uma entrada de aço rápido por geometria**, e ela é a ao cobalto.

O nicho declarado pelos fabricantes é **material mole e série limitada**, onde a vida da ferramenta importa menos. Em broca e macho, o aço rápido **continua padrão de mercado**.

### 4.3 O substrato pesa na velocidade, e só nela

O substrato entra no cálculo como **fator sobre o valor de partida da velocidade de corte (vc) do material** — não altera geometria, avanço por dente (fz) nem a cadeia de forças.

| Substrato | Fator | Qualidade do dado |
|---|---|---|
| Metal duro | **1,00** — referência | firme |
| Aço rápido ao cobalto | **faixa**, não ponto | ⚠ cada extremo vem de uma fonte só, e nenhuma medida em fresamento |

**O revestimento não entra nessa conta.** A ferramenta de metal duro de catálogo já sai revestida, e nenhum fator publicado separa a revestida da não revestida (procurado, cinco de cinco vazios). O valor de partida da velocidade de corte (vc) do material já pressupõe a ferramenta revestida adequada. Ver §5. Os valores numéricos e sua procedência estão no canônico de ferramentas e substratos.

**Sobre a faixa do aço rápido:** ela é faixa por honestidade, não por imprecisão de redação. Os dois extremos vêm de fontes que mediram outras operações, e o único par medido em fresa aponta **abaixo** dessa faixa. Fixar um ponto único aqui faria a ferramenta rodar acima do que a evidência sustenta.

### 4.4 As situações em que o material da ferramenta volta a importar

A §3.1 vale para ferramenta de uso geral. Há situações em que o material da ferramenta volta a mudar o resultado — e **em nenhuma delas a solução é criar o campo de substrato**:

| Situação | O que muda | Onde se resolve |
|---|---|---|
| **Aço endurecido** | Acima de ~48 HRC a oficina troca por grau dedicado de grão ultrafino, que corta mais devagar — e não existe fator de velocidade com fonte para esse grau | **Não ganha entrada de ferramenta** (Q19, 27/08/2026). O aço endurecido é um material como outro qualquer: entra no catálogo de materiais com a própria dureza e as próprias constantes (§6), e o cálculo usa o que está registrado. Sem trava por HRC, sem marca de "fora da linha" — o sistema não decide o que é ou não é. O que a tabela não cobre, o operador adiciona (§6.5) |
| **Diâmetro muito pequeno** | O que decide não é o substrato, é o **raio de aresta (rβ)**: a espessura mínima de cavaco (hmin) sobe muito acima da margem do modelo | ~~Como alerta de espessura mínima de cavaco (**E4**), não como campo~~ **Alerta revogado — 30/08 e 08/09/2026** (`E4` gatilhos 1 e 11a). Continua não sendo campo; e não vira alerta |
| **Alumínio** | O que muda é **a geometria** — mais do que o substrato | Na escolha da ferramenta e nas constantes do material (§6) |

---

## 5. Revestimento — fora do produto

**Não existe campo de revestimento, não existe lista de revestimento, não existe fator de revestimento no cálculo** (Q18, 27/08/2026). A ferramenta é nomeada pelo tipo e pelo substrato (§3.1) — nada além disso.

A razão é a regra da §1 levada ao limite: **fator que não move o resultado além da margem do modelo não entra.** Multiplicador de velocidade por tipo de revestimento foi procurado em dois territórios de fonte independentes e veio **vazio, cinco de cinco** — fabricante publica dureza, temperatura de trabalho e coeficiente de atrito, nunca multiplicador de velocidade. A ferramenta inteiriça de catálogo já sai revestida, e nenhum fator publicado separa a revestida da não revestida. O valor de partida da velocidade de corte (vc) (§6) já pressupõe a ferramenta revestida adequada ao material.

**A contraindicação diamante/PCD sobre material ferroso não vira bloqueio na tela:** ferramenta de diamante não é catalogada para material ferroso, então a combinação não chega a existir na lista. Se o operador cadastrar uma por conta própria (§3.7, **E6** §4), o sistema calcula — ele recomenda, o operador decide.

O registro de que o multiplicador de revestimento foi pesquisado e não existe fica em **E7** §3, como rastro — para não ser reaberto como se nunca tivesse sido checado.

---

## 6. Os materiais da peça

### 6.1 O que uma linha de material contém

| Item | Para que serve |
|---|---|
| **Nome e designação** | como o operador reconhece a liga |
| **Grupo de usinabilidade** | organiza a lista e é a chave pela qual as fontes publicam dados |
| **Dureza de referência** | distingue a mesma liga em estados diferentes — tratada e não tratada são **duas linhas**, não uma |
| **Força específica de corte (kc) e expoente de Kienzle (mc)** | entram na cadeia de forças, potência de corte (Pc) e torque (Mc) |
| **Valor de partida da velocidade de corte (vc)** | o ponto de onde o cálculo parte, antes de qualquer ajuste |
| **Qualidade do dado de cada campo** | ver §6.3 |

### 6.2 Os grupos

Seis grupos de usinabilidade — aços, inoxidáveis, ferros fundidos, não-ferrosos, superligas e materiais endurecidos. **O grupo não é decoração de lista:** é a granularidade em que as fontes de dados de corte publicam, e por isso é a chave que liga cada valor de partida à condição em que ele foi publicado.

As ligas que o sistema traz de fábrica, com o grupo e a dureza que as identificam. Os valores que cada uma carrega — constantes de força e faixa de velocidade — e a procedência de cada um estão em `canonicos/`.

| Liga | Grupo | Dureza de referência |
|---|---|---|
| Aço 1020 | P | 120–160 HB |
| Aço 1045 | P | 170–220 HB |
| Aço 8620, núcleo | P | 200 HB |
| Aço P20 | P | 280–320 HB |
| Aço 2711 | P | 320 HB |
| Inox 304 | M | 140–180 HB |
| Ferro fundido cinzento GG25 | K | 200 HB |
| Ferro fundido nodular GGG50 | K | 220 HB |
| Alumínio 6061-T6 | N | 95 HB |
| Titânio Ti-6Al-4V | S | 340 HB |
| Aço 8620, cementado | H | 58–62 HRC |
| Aço H13, tratado | H | 50 HRC |

**A mesma liga aparece duas vezes quando o tratamento a muda de grupo** — o 8620 no núcleo e cementado são materiais diferentes para efeito de corte, e uma linha só entregaria um número errado com aparência de certo (§6.5).

### 6.3 A qualidade do dado é parte do catálogo

Nem toda linha tem a mesma base. Algumas vêm de catálogo verificado, com corroboração independente; outras estão registradas por prática e **sem fonte publicada que as sustente**. Isso não é motivo para escondê-las — é motivo para **declará-las**.

| # | Regra | Por quê |
|---|---|---|
| 1 | — | Regra removida em 31/08/2026. Número preservado; a lista não é renumerada |
| 2 | Os dados do material usados no cálculo ficam **visíveis junto do resultado**, sem precisar procurar | Um resultado calculado sobre um dado frágil, sem que o operador saiba, não é o resultado dele |
| 3 | Os dados do material são **editáveis pelo operador** | Quem tem a carta do fabricante na mão vale mais que o valor de partida do sistema. O que ele digitar passa a valer na oficina dele (**E6** §5) |
| 4 | — | Regra removida em 31/08/2026. Número preservado; a lista não é renumerada |
| 5 | Valor de partida não vira selo de alarme na tela | A distinção fina entre graus de confiança serve a quem constrói e a quem fecha a lacuna; ao operador serve ver o número e poder trocá-lo |
| 6 | **Entra toda liga cujos campos que o cálculo consome estejam preenchidos, com a origem declarada e editável** (Q20, 27/08/2026) | O que separa não é a qualidade do dado — é a origem estar declarada. Omitir a linha empurra o operador a escolher "uma parecida" sem saber que está fazendo isso; o erro fica invisível. Um número frágil visível vale mais que um número frágil escondido |

### 6.4 Exemplo de conteúdo — os dados do material à vista

```
Material    Aço 1045 · grupo P · 170–220 HB

    Velocidade de corte (vc)            140 m/min      [editar]

    Força específica de corte (kc · mc)  1500 N/mm²  ·  0,21  [editar]
```

### 6.5 Casos de borda — materiais

| Situação | Comportamento | Por quê |
|---|---|---|
| A mesma liga em dois estados de tratamento | **Duas linhas separadas**, cada uma com sua dureza e suas constantes | A dureza muda a força específica em várias vezes; tratar como uma linha só entrega um número errado com aparência de certo |
| Operador edita a faixa de velocidade de um material | Passa a valer, e o resultado registra que o valor foi editado | Ver **E6** §5 e **E5** §8 |
| Material que o sistema não conhece | O operador **adiciona** o seu, com as variáveis que o cálculo consome (**E6** §5) | Catálogo fechado é catálogo que expulsa o usuário para a planilha |
| Operador quer mudar ou tirar um material de fábrica | Pode **editar e remover** qualquer material, inclusive os de fábrica; restaurar padrões traz os de fábrica de volta (**E6** §5) | O catálogo entregue é ponto de partida, não uma lista fechada. O sistema não decide o que o operador pode ter |
| Um dado do material não tem fonte publicada | Entra assim mesmo, **com a origem declarada e editável** | Omitir a linha empurraria o operador a escolher uma liga parecida sem saber que está fazendo isso |

---

## 7. As operações

### 7.1 A família é a operação; desbaste e acabamento não são seletor

As quatro famílias da §2 são o que o sistema precisa saber para escolher a cadeia de cálculo. **Tipo de operação — desbaste, semi-acabamento, acabamento — não é um seletor no caminho padrão.**

**A razão:** os multiplicadores de profundidade de corte (ap) e penetração de trabalho (ae) por tipo de operação foram procurados como regra de fabricante e não foram encontrados nessa forma. O que existe são pares publicados para condições específicas, cada um dentro de uma estratégia declarada. Transformá-los num seletor de três posições daria ao operador a impressão de uma regra geral que não existe.

**O que fica no lugar:** os parâmetros de corte são editáveis, e é neles que a agressividade se regula — com o efeito de cada mudança visível no mesmo instante. Quem quer desbastar aumenta a profundidade de corte e a penetração de trabalho e vê a potência subir; quem quer acabar faz o contrário. A regulagem existe; o rótulo é que não.

### 7.2 Não existe seletor de estratégia de acabamento

Em acabamento de parede com fresa reta, a profundidade de corte (ap) recomendada difere em **uma a duas ordens de grandeza** entre a estratégia convencional e a estratégia de alta velocidade por contorno. Não é dispersão de fonte: são dois modos de trabalho diferentes, cada um com evidência própria.

**A decisão (Q17, 27/08/2026): não existe seletor de estratégia.** A função do sistema é calcular e mostrar o resultado, seja qual for a estratégia — quem decide usar o parâmetro, ajustá-lo ou apenas analisar é o operador, não a calculadora. O sistema recomenda uma profundidade de corte (ap) de partida (valor da geometria, §3.3), calcula o que o operador ajustar, e o resultado sempre sai. A ajuda do campo diz apenas **de onde vem o valor de partida** (procedência), sem afirmar nada sobre estratégia — o sistema não faz essa afirmação, então não precisa de um seletor para sustentá-la.

### 7.3 Casos de borda — operações

| Situação | Comportamento | Por quê |
|---|---|---|
| Nenhum tipo de operação foi declarado | O cálculo parte da faixa do material e dos valores de partida da geometria, **sem multiplicador de operação** | Não existe premissa de operação escondida dentro do resultado |
| Ferramenta que serviria a mais de uma família | A família é propriedade da entrada de catálogo, não escolha à parte | Ver §1 — a estrutura previne a combinação impossível |

---

## 8. Como as listas se restringem

A dependência entre as listas é **fixa e tem uma direção só**:

```
Material da peça
    |
    +-- restringe quais ferramentas são oferecidas
             |
             +-- define quais campos existem daqui para baixo
                      |
                      +-- define quais controles de corte fazem sentido
```

| # | Regra | Por quê |
|---|---|---|
| 1 | **O material é o primeiro filtro.** Nada acima dele depende de outra coisa | É o que decide a lista de ferramentas e o valor de partida da velocidade de corte (vc) |
| 2 | A ferramenta define **quais campos existem**, não quais ficam desabilitados | Campo que não se aplica **não existe** — ver §3.4 |
| 3 | Toda troca que invalida uma escolha anterior **avisa** | Ver §3.7 |
| 4 | Nenhuma dessas restrições depende de o operador ter declarado seu ambiente | São propriedades do que existe à venda, não do que ele tem na oficina |

---

## Dependências deste documento

**Valores numéricos.** A estrutura descrita aqui está completa; os números que ela consome vivem em `canonicos/` e cada um carrega sua própria procedência. Quatro conjuntos entram com fragilidade declarada, e quem for construir precisa saber disso:

| Conjunto | Situação |
|---|---|
| **Fator de velocidade de corte (vc) do aço rápido ao cobalto** | Faixa, não ponto. Nenhum dos extremos foi medido em fresamento |
| **Valor de partida da velocidade de corte (vc) por liga** | O que existe publicado é ponto por **grupo** de material, não por liga. Daí a §6.3 exigir o valor visível, editável e com o ponto de referência ao lado |
| **Força específica de corte (kc) de parte das ligas** | Registrada por prática, sem fonte publicada. Entra declarada, nunca silenciosa |
| **Tabela de designações de rosca** | Registrada e consistente com a prática, sem confirmação normativa |

**Perguntas fechadas (bloco de decisão, 27/08/2026):**

| # | Pergunta | Decisão | Onde |
|---|---|---|---|
| Q17 | Escolha de estratégia de acabamento? | Não existe seletor. O sistema recomenda a profundidade de corte (ap) de partida, calcula o que o operador ajustar e mostra sempre | §7.2 |
| Q18 | Revestimento — campo, filtro ou embutido? | Fora do produto — sem campo, sem filtro, sem fator no cálculo. Ferramenta nomeada só pelo tipo e substrato | §5 |
| Q19 | Aço endurecido acima de 48 HRC ganha entrada de ferramenta? | Não. Entra como material, com a própria dureza e constantes; o sistema não julga por HRC | §4.4 |
| Q20 | Critério para uma liga entrar no catálogo? | Toda liga com os campos que o cálculo consome preenchidos, origem declarada e editável | §6.3 |
| Q21 | Rosca fora da tabela de designações? | Operador informa passo e diâmetro à mão; a designação é atalho de preenchimento sobre banco editável | §3.3 |

**Referências cruzadas:**

| Assunto | Documento |
|---|---|
| Campos de entrada, faixas aceitas e passo de cada um | **E2** |
| O que o sistema entrega e as regras de exibição | **E3** |
| Alertas, níveis e limiares que dependem da ferramenta e do material | **E4** |
| Ordem do painel, momento do cálculo e edição dos resultados | **E5** |
| Materiais próprios, biblioteca de ferramentas e o que o operador guarda | **E6** |
| O que ficou de fora do domínio, com motivo | **E7** |
| Fórmulas, constantes e a procedência de cada valor | `canonicos/` |
