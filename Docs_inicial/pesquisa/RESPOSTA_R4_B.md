<!-- CABECALHO DE PROCEDENCIA - adicionado ao arquivar. O corpo abaixo esta INTACTO. -->
# RESPOSTA R4 (B) - Velocidades e Avancos - territorio: catalogo de fabricante

> **Retorno cru.** Nao editado. Vale por ser cru - e registro de procedencia.
> **Rodada:** R4, executada em par cego. Este e o retorno **B**.
> **Territorio:** catalogo tecnico, carta de velocidade/avanco, datasheet e pagina de
> produto de fabricante. Handbook, norma e artigo academico estavam PROIBIDOS
> neste retorno, por desenho.
> **Ferramenta:** IA externa. **Arquivado:** 20/08/2026.
> **Titulo original do arquivo entregue:** "Validacao de tabelas de velocidade de corte
> e avanco por dente para fresamento CNC". O nome e enganoso: **isto nao e uma
> validacao**, e o retorno de pesquisa. A validacao desta rodada sera gravada em
> `VALIDACAO_R4.md`, por um auditor que nao pesquisou e que nao sabera qual retorno
> veio de qual territorio.

---

# Validação de tabelas de velocidade de corte e avanço por dente para fresamento CNC

**Escopo:** fresa inteiriça de metal duro, topo reto, toroidal e esférica, com aplicação dominante em moldes e matrizes.

**Território de fonte aplicado:** foram usados somente catálogos, cartas de velocidade/avanço, páginas de produto e materiais técnicos dos fabricantes autorizados no enunciado. Handbooks, normas, artigos acadêmicos, distribuidores, blogs de terceiros e calculadoras de terceiros foram excluídos. Quando a página de um fabricante não expôs o número, o resultado foi mantido como **LACUNA**.

**Regra de confiança:** nenhum achado recebeu `CONSENSO`, porque não foram encontradas três fontes realmente independentes publicando o mesmo número para a mesma ferramenta, material, geometria e estratégia. Catálogos diferentes da OSG foram tratados como referências da mesma origem, não como três fontes independentes.

## Bloco 1 — Questão 1: velocidade de corte por material

**Veredito:** a tabela atual não pode usar uma única faixa de `Vc` por material; os dados do fabricante mudam substancialmente com geometria, dureza, revestimento, engajamento, profundidade e estratégia.

**Confiança:** `SEM CONSENSO` para uma faixa universal; `REFERÊNCIA ÚNICA` para cada linha de catálogo citada.

### 1.1 Divergência do aço 1045

A carta OSG para fresa WXL de 4 cortes, em **side milling**, publica `250 SFM = 76,2 m/min` para o grupo `<32 HRC` que inclui ferro fundido, aços carbono, aços-liga, inox e aços para matriz. A carta OSG para fresa esférica WXL de 4 cortes publica `400 SFM = 121,9 m/min` para `Up to 32 HRC`, incluindo aço carbono, e `350 SFM = 106,7 m/min` para o grupo `42–50 HRC` que nomeia P20 e H13.[2] [1]

Uma terceira carta OSG, para fresa WXL de 4 cortes com raio, identifica explicitamente `1045, 1055` no quadro **High Speed Light Milling** e publica `1.560 SFM = 475,5 m/min`. O mesmo catálogo publica `396 SFM = 120,7 m/min` para side milling no grupo `<20 HRC`. Esses dois números não são alternativas intercambiáveis: o primeiro é HSM light milling, com envelope de corte e centro de usinagem próprios; o segundo é side milling convencional da carta.[3]

| Condição publicada pelo fabricante | Vc publicado | Conversão | Confiança | Aplicabilidade ao 1045 |
|---|---:|---:|---|---|
| OSG WXL 4F, side milling, grupo `<32 HRC` | 250 SFM | **76,2 m/min** | `REFERÊNCIA ÚNICA` | Proxy direto de aço carbono; não é 1045 individualizado [2] |
| OSG WXL ball end 4F, roughing/contouring, `Up to 32 HRC` | 400 SFM | **121,9 m/min** | `REFERÊNCIA ÚNICA` | Proxy de aço carbono; geometria esférica [1] |
| OSG WXL radius 4F, side milling, `<20 HRC` | 396 SFM | **120,7 m/min** | `REFERÊNCIA ÚNICA` | Grupo próximo; não é 1045 nominal nessa seção [3] |
| OSG WXL radius 4F, HSM light milling, `1045, 1055` | 1.560 SFM | **475,5 m/min** | `REFERÊNCIA ÚNICA` | Dado direto, porém somente HSM light milling [3] |

A resposta implementável é, portanto, **condicional**. Para uma fresa revestida WXL em side milling/contorno comum, o território pesquisado sustenta aproximadamente **76–122 m/min** como faixa de partida de catálogo, com a condição explícita de ferramenta, dureza de grupo, `ae/ap`, máquina rígida e refrigeração indicadas na carta. Para HSM light milling em ferramenta WXL dedicada, o número publicado para 1045/1055 é **475,5 m/min**, mas não deve ser misturado à faixa convencional.[2] [1] [3]

O valor atual **150–200 m/min** fica **23–64% acima** da faixa de 121,9 m/min e **97–162% acima** da referência de 76,2 m/min. O valor pontual de **140 m/min** fica cerca de **15% acima** de 121,9 m/min. O caso antigo **80–120 m/min** está dentro ou muito próximo da faixa convencional publicada; a fonte ausente impede validar a origem histórica. Assim, o sistema deve retirar o rótulo `validado` de 150–200 m/min para operação genérica, salvo quando a entrada declarar explicitamente HSM e a carta da ferramenta utilizada sustentar a condição. O valor 140 m/min deve ser tratado como `SEM CONSENSO`, não como correção automática.

### 1.2 A velocidade de acabamento deve ser maior que a de desbaste?

**Não como convenção universal.** Na carta OSG de fresa esférica WXL, o mesmo grupo `Up to 32 HRC` aparece com `Vc=121,9 m/min` no desbaste e `Vc≈217,3 m/min` no acabamento; no grupo que nomeia P20/H13, aparece aproximadamente `106,7 m/min` no desbaste e `170,9 m/min` no acabamento.[1] Essa é uma regra publicada para aquela geometria e aquele catálogo, não uma lei que possa ser copiada para todos os materiais.

A razão correta não é simplesmente “retirar menos material”. O acabamento pode admitir maior velocidade quando o menor `ae/ap` reduz carga instantânea, espessura de cavaco e sobrecarga da aresta. A Harvey descreve HEM como baixo engajamento radial e maior profundidade axial, espalhando desgaste e dissipando calor; também explica que o fresamento concordante reduz rubbing e transfere calor para o cavaco.[8] [9] A Sandvik reforça que cavaco excessivamente fino prejudica formação e vida, enquanto cavaco excessivo sobrecarrega a aresta e pode quebrá-la.[14]

A relação pode se inverter em uma comparação de estratégias: um desbaste HSM/HEM pode ter Vc maior que um acabamento convencional. Contudo, **não foi encontrada, no território permitido, uma carta de fabricante que publique uma inversão explícita para o mesmo material e a mesma ferramenta**. Essa combinação fica `NÃO ENCONTRADO`; o sistema não deve inventá-la.

### 1.3 Validação dos seis estimados

| Material do sistema | O que foi localizado em fabricante | Regra recomendada | Confiança |
|---|---|---|---|
| **P20, 280–320 HB** | OSG nomeia P20 somente no grupo `42–50 HRC`, com `46,6 m/min` em side milling e `147,0 m/min` em HSM light milling na carta WXL 4F [2]. | Não aplicar automaticamente ao P20 de 280–320 HB. Manter `LACUNA` para essa condição; registrar separadamente o grupo publicado `42–50 HRC`. | `REFERÊNCIA ÚNICA` para o grupo; `NÃO ENCONTRADO` para P20 na dureza da tabela |
| **2711, 300–340 HB** | Nenhuma carta autorizada localizada nomeia 2711 nem fornece equivalência DIN/AISI utilizável. | `LACUNA`. Não converter para P20, 4140 ou outro proxy sem fonte de fabricante que declare a equivalência. | `NÃO ENCONTRADO` |
| **8620 núcleo, 180–220 HB** | As cartas OSG têm grupos de aço carbono/aço-liga abaixo de 32 HRC, mas não nomeiam 8620 nessa condição. A referência de side milling de 250 SFM é `76,2 m/min`; HSM light milling do grupo geral é `375,2 m/min` [2]. | Usar somente como proxy operacional de grupo, nunca como dado direto de 8620. O “erro” de material não é quantificado pelo fabricante; declarar `não quantificável` em vez de inventar ±%. | `REFERÊNCIA ÚNICA` para proxy; `NÃO ENCONTRADO` para dado direto |
| **8620 cementado, 58–62 HRC** | OSG publica `29,3 m/min` para `55–60 HRC` e `47,5 m/min` para `45–55 HRC` em side milling; não publica faixa completa `60–62 HRC` na mesma carta [3]. | Usar o intervalo de dureza publicado somente até 60 HRC. Para 60–62 HRC, `LACUNA`; não extrapolar. | `REFERÊNCIA ÚNICA` parcial |
| **H13 tratado, 45–52 HRC** | OSG nomeia H13 no grupo `42–50 HRC`, com `46,6 m/min` em side milling e `147,0 m/min` em HSM light milling [2]. Outra carta cita H13 em grupos de dureza distintos, mas não resolve a condição 50–52 HRC [3]. | Aplicar apenas para a parte efetivamente coberta pelo grupo `42–50 HRC`; manter `LACUNA` para H13 acima de 50 HRC. | `REFERÊNCIA ÚNICA` parcial |
| **Alumínio 6061-T6** | A OSG publica grupo “Aluminum/Copper Alloy” em WXL 4F: `296,9 m/min` em side milling e `495,9 m/min` em HSM light milling [2]. Não individualiza 6061-T6. | Proxy de alumínio; não afirmar que é dado específico de 6061-T6. | `REFERÊNCIA ÚNICA` para proxy |

Para a designação **2711**, a equivalência DIN/AISI solicitada não foi encontrada em uma página de fabricante autorizada. Esse é um caso em que uma equivalência conhecida fora do território seria precisamente o tipo de preenchimento proibido pelo enunciado; a célula deve permanecer `LACUNA`.

### 1.4 Condições ausentes: revestimento, refrigeração e estratégia

| Variável | Evidência localizada | O que o sistema deve fazer | Confiança |
|---|---|---|---|
| Sem revestimento × TiAlN/AlTiN/AlCrN | A Helical publica classes próprias, não multiplicadores entre essas quatro condições. A Harvey confirma AlTiN Nano em fresas esféricas para aços endurecidos até 55 Rc; Kennametal confirma classe PVD KC637M para aços acima de 48 HRC, mas não publica Vc na página aberta [11] [10] [5]. | Não inserir multiplicador universal. Exigir ferramenta/revestimento como chave de consulta. `LACUNA` para comparações numéricas específicas entre sem revestimento, TiAlN, AlTiN e AlCrN. | `NÃO ENCONTRADO` para multiplicador |
| Seco | A Helical declara que Aplus foi comprovado em alta velocidade e condições a seco; OSG HSM recomenda ar e adverte sobre fluido inflamável em ferramenta desgastada [11] [3]. | Registrar seco como condição distinta; não atribuir percentual universal de aumento/redução. | `REFERÊNCIA ÚNICA` qualitativa |
| Ar comprimido | OSG recomenda air blow em cartas WXL e na carta HSM; OSG 3430 recomenda air blow ou MQL [1] [2] [3]. | Pode ser opção de partida apenas quando a carta da ferramenta assim indicar. | `REFERÊNCIA ÚNICA` |
| MQL | OSG 3430 recomenda air blow ou MQL; não publica um multiplicador contra emulsão [1]. | Registrar como condição explícita, sem inventar correção numérica. | `REFERÊNCIA ÚNICA` qualitativa |
| Emulsão/refrigerante solúvel | OSG UVX-Ti recomenda refrigerante solúvel em água; OSG WXL pede fluido apropriado e a carta não dá fator numérico [4] [1] [2]. | Para Ti-6Al-4V, declarar refrigerante solúvel como condição da carta. | `REFERÊNCIA ÚNICA` |
| Alta pressão | Nenhum fator específico localizado em carta autorizada aplicável às fresas do escopo. | `LACUNA`. Não usar multiplicador de alta pressão. | `NÃO ENCONTRADO` |
| Convencional/side milling | OSG publica `250 SFM` no List 3604 e `396 SFM` no List 3670 para grupos de aço de menor dureza; as profundidades `ae/ap` são parte da tabela [2] [3]. | Vc só é válido junto com geometria e envelope da carta. | `REFERÊNCIA ÚNICA` |
| HSM light milling | Para `<32 HRC`, OSG List 3604 passa de `250` para `1.231 SFM`, aumento de **392%**; para o grupo P20/H13 `42–50 HRC`, passa de `153` para `482 SFM`, aumento de **215%** [2]. | HSM deve ser uma estratégia separada, não um multiplicador oculto da tabela genérica. | `REFERÊNCIA ÚNICA` |
| HEM/Dynamic milling | Harvey confirma menor `ae/RDOC` e maior `ap/ADOC`, além de chip thinning; não publica multiplicador universal de Vc/fz [8]. | Criar tabela própria por trajetória, ae, ap e ferramenta. | `REFERÊNCIA ÚNICA` qualitativa |

A variação de estratégia publicada pela OSG é muito maior que a largura de várias faixas atuais. Portanto, a tabela sem `ae`, `ap`, estratégia, ferramenta e refrigeração entrega menos informação do que aparenta.

### 1.5 Dureza como eixo

Não foi localizada uma regra de fabricante do tipo “corrija `Vc` em X% por cada 40 HB dentro da mesma liga”. O que foi localizado é uma organização por **faixas de HRC**. OSG List 3670 publica a seguinte tabela para side milling com fresa WXL de 4 cortes:[3]

| Faixa de dureza publicada | Grupo de material | Vc side milling |
|---|---|---:|
| `<20 HRC` | Mild/carbon steels, cast iron | **120,7 m/min** |
| `20–30 HRC` | Alloy steels, tool steels | **89,7 m/min** |
| `30–38 HRC` | Hardened/pre-hardened steels, H13 | **78,6 m/min** |
| `38–45 HRC` | Stainless/pre-hardened steels | **58,5 m/min** |
| `45–55 HRC` | Hardened steels | **47,5 m/min** |
| `55–60 HRC` | Hardened steels | **29,3 m/min** |

A tabela é uma **referência única por faixa**, não uma lei de correção contínua. Para aços de molde tratados, HRC é de fato o eixo operacional publicado nas cartas localizadas; porém, o catálogo OSG não permite concluir que a liga deixou de importar. A ferramenta, a preparação da aresta, o revestimento e a estratégia continuam determinantes.

### 1.6 Expansão para K e S

| Material | Condição de fabricante | Faixa recomendável no território pesquisado | Confiança |
|---|---|---:|---|
| **GG25** | OSG List 3604 nomeia `cast iron` no grupo `<32 HRC`: `250 SFM = 76,2 m/min` em side milling e `1.231 SFM = 375,2 m/min` em HSM light milling [2]. | **76,2 m/min** para side milling da carta; **375,2 m/min** somente para HSM light milling. É proxy de ferro fundido, não confirmação específica de GG25. | `REFERÊNCIA ÚNICA` proxy |
| **GGG50** | Nenhuma carta consultada nomeia ferro fundido nodular/GGG50. | `LACUNA`. Não usar automaticamente a linha “cast iron” como equivalente de nodular. | `NÃO ENCONTRADO` |
| **Ti-6Al-4V** | OSG AERO UVX-Ti, fresa 5F dedicada: side milling `200–265 SFM = 61,0–80,8 m/min`, `aa≤1,8D`, `ar=0,2D`; slotting `100–165 SFM = 30,5–50,3 m/min`, `aa≤1D`. Refrigerante solúvel em água é altamente recomendado [4]. | **61,0–80,8 m/min** em side milling ou **30,5–50,3 m/min** em slotting, somente com a ferramenta e o envelope da carta. | `REFERÊNCIA ÚNICA` direta |

## Bloco 2 — Questão 2: avanço por dente (`fz`) por diâmetro

**Veredito:** os fabricantes consultados publicam `fz` em tabelas discretas por diâmetro, ferramenta, dureza e operação. Não foi encontrada uma regra universal linear `fz=f(D)` nem base para aplicar as frações internas de 60%, 75%, 85% e 110% a todas as ferramentas.

**Confiança:** `REFERÊNCIA ÚNICA` para os pontos de catálogo; `SEM CONSENSO` para as regras universais do sistema.

### 2.1 Comparação da tabela atual com carta de fabricante

A tabela atual é para aço `28–34 HRC`, mas a carta OSG 3430/3530 mais próxima publica o grupo `Up to 32 HRC`, com fresa esférica WXL de 4 cortes, contorno, ar/MQL, overhang máximo 4×D e valores de partida. Portanto a comparação é um **proxy próximo**, não uma validação direta de toda a faixa 28–34 HRC.[1]

| D | fz OSG desbaste, proxy ≤32 HRC | fz atual do sistema | Diferença atual sobre OSG | fz OSG acabamento | Confiança |
|---:|---:|---:|---:|---:|---|
| 1,0 mm | 0,0110 | 0,0120 | +9% | 0,0110 | `REFERÊNCIA ÚNICA` |
| 2,0 mm | 0,0220 | 0,0300 | +36% | 0,0220 | `REFERÊNCIA ÚNICA` |
| 3,0 mm | 0,0366 | 0,0500 | +37% | 0,0376 | `REFERÊNCIA ÚNICA` |
| 4,0 mm | 0,0494 | 0,0700 | +42% | 0,0505 | `REFERÊNCIA ÚNICA` |
| 6,0 mm | 0,0756 | 0,1000 | +32% | 0,0766 | `REFERÊNCIA ÚNICA` |
| 8,0 mm | 0,1028 | 0,1200 | +17% | 0,1031 | `REFERÊNCIA ÚNICA` |
| 10,0 mm | 0,1301 | 0,1400 | +8% | 0,1299 | `REFERÊNCIA ÚNICA` |
| 12,0 mm | 0,1568 | 0,1600 | +2% | 0,1564 | `REFERÊNCIA ÚNICA` |

Para `D=0,2`, `0,5`, `0,75`, `0,8`, `1,5`, `14` e `16 mm`, não foi encontrada, no território consultado, uma carta numérica que publique a mesma combinação de aço, geometria, revestimento e operação. O Kennametal confirma uma fresa esférica revestida de `D=0,5 mm`, `Z=2` e classe PVD KC637M para aços acima de 48 HRC, mas o painel de Feeds & Speeds não expôs uma tabela numérica para o produto; não é permitido preencher essa célula por interpolação de conhecimento próprio.[5]

A tabela atual parece **agressiva sobretudo entre 2 e 6 mm** quando comparada ao proxy OSG de até 32 HRC. Essa comparação não autoriza reduzir automaticamente o sistema, pois as geometrias são diferentes; autoriza, sim, retirar o rótulo `validado` e exigir uma carta de ferramenta específica.

### 2.2 Formato da regra `fz=f(D)`

O formato publicado é de **degraus por faixa ou ponto de diâmetro**, não uma função linear universal. Na OSG 3430/3530, o fz convertido para `Up to 32 HRC` cresce de 0,0110 mm/dente em 1 mm para 0,1568 mm/dente em 12 mm no desbaste; a carta OSG 3604, em outro desenho de fresa, fornece 0,0102 em 1,588 mm, 0,0229 em 3,175 mm, 0,0585 em 6,35 mm e 0,1143 em 12,7 mm.[1] [2]

A Sandvik mostra que `fz` também deve conservar a espessura de cavaco efetiva `h_ex`, e publica fatores de chip thinning de 1,0 em KAPR 90°, 1,4 em KAPR 45° e 5,8 em KAPR 10°.[14] Portanto, mesmo que duas fresas tenham o mesmo diâmetro e material, `fz` pode mudar com ângulo de entrada, raio, `ae/D`, `ap` e estratégia.

**Regra recomendada:** armazenar a tabela discreta do fabricante por ferramenta e interpolar apenas entre pontos da mesma carta, mesma geometria, mesmo revestimento, mesma dureza e mesma estratégia. A interpolação linear hoje usada pelo sistema é uma decisão de implementação; não foi encontrada como regra publicada universal.

### 2.3 Pico de `Vc` até Ø6–8 mm

O pico da tabela do sistema não recebeu confirmação física nas cartas consultadas. OSG publica Vc praticamente constante por grupo de material e estratégia, enquanto o diâmetro altera RPM e avanço. Por exemplo, no OSG 3604, o grupo `<32 HRC` permanece em `250 SFM`; no OSG 3430, o grupo `Up to 32 HRC` permanece em `400 SFM` no desbaste e `713 SFM` no acabamento.[1] [2]

A queda ou o pico na tabela atual é, portanto, mais compatível com **artefato de tabela, limite de RPM ou mistura de cartas** do que com uma lei universal de dissipação de calor. Um limite de RPM pode fazer o menor diâmetro rodar abaixo do Vc nominal; isso não justifica aumentar Vc até um pico e depois reduzi-lo em diâmetros maiores sem declarar o limite da máquina.

**Regra recomendada:** calcular `RPM = 1000·Vc/(π·D)` a partir do Vc da carta e aplicar o limite real de RPM da máquina. Se o limite for atingido, registrar `Vc efetivo` menor; não criar uma curva material-specific de pico sem fonte.

### 2.4 Regras derivadas do sistema

| Regra interna | Evidência do fabricante | Veredito |
|---|---|---|
| Acabamento `Vc × 1,10` | OSG 3430/3530 publica, no proxy P, aproximadamente `217,3/121,9 = 1,78`; no grupo endurecido, `170,9/106,7 = 1,60` [1]. | `NÃO ENCONTRADO` como regra universal; a carta consultada usa aumentos maiores e específicos. |
| Acabamento `fz × 0,60` | OSG mantém fz quase igual entre desbaste e acabamento em sua carta esférica; em 4 mm, 0,0505/0,0494≈1,02 [1]. | `NÃO ENCONTRADO`; tratar como convenção interna não validada. |
| Grupo endurecido `Vc × 0,85` e `fz × 0,75` | OSG publica tabelas próprias por grupo de HRC, sem essa fração fixa [1] [2] [3]. | `NÃO ENCONTRADO` como regra de fabricante. |
| Semi-acabamento como ponto médio | Nenhuma carta localizada declara ponto médio aritmético entre desbaste e acabamento. | `NÃO ENCONTRADO`; só usar se a carta específica trouxer os dois extremos e o software declarar interpolação interna. |

### 2.5 Piso de `fz=0,002 mm/dente`

Não foi encontrada base de fabricante para um piso absoluto de `0,002 mm/dente`. A Harvey explica que, em microfresas, quando a espessura de cavaco fica menor que um valor dependente da ferramenta, o material pode ser espremido sob a aresta; isso aumenta força, atrito, desgaste e rugosidade. O fabricante não fornece um percentual universal nem um valor absoluto de `fz_min`.[7]

A Kennametal confirma uma ferramenta específica de 0,5 mm, mas a página não fornece raio de aresta nem carta numérica de fz para aquele produto.[5] Logo, o piso deve ser substituído por uma fronteira dependente de **raio/preparação de aresta, geometria, runout, material, `ae/ap` e espessura de cavaco efetiva**. O valor `0,002` deve ser rotulado `NÃO ENCONTRADO`, não “validado por microfresa”.

### 2.6 Número de arestas `Z`

O avanço linear total é derivado de `Vf = RPM × fz × Z` quando a carta fornece RPM, avanço e número de cortes. A carta OSG 3604 é de 4 cortes e a AERO UVX-Ti é de 5 cortes; os valores de fz convertidos diferem entre as cartas porque ferramenta, número de cortes, geometria e aplicação também diferem.[2] [4]

Portanto, o sistema pode manter `fz` como grandeza por dente, mas **não pode tratar o avanço linear como independente de Z**. Uma fresa de 2 cortes e uma de 4 cortes não devem receber automaticamente o mesmo `Vf`; o `fz` adequado deve vir da carta da ferramenta, e `Vf` deve ser calculado com o Z real. Não foi encontrada uma correção universal de `fz` somente em função de Z; a dependência deve ser armazenada como dado de ferramenta.

## Bloco 3 — Questão 3: janela de tolerância

**Veredito:** os limiares simétricos `0,50`, `0,75`, `1,20` e `1,50` não têm base nas fontes consultadas e não podem ser aplicados igualmente a `Vc`, `fz`, `ae` e `ap`.

**Confiança:** `NÃO ENCONTRADO` para a janela atual; `REFERÊNCIA ÚNICA` para os mecanismos e faixas publicados.

### 3.1 Fabricantes publicam faixa mínima–máxima ou nominal?

Os fabricantes consultados publicam ambos os formatos, mas não uma “tolerância percentual em torno do recomendado”. A OSG publica faixas explícitas de Vc, por exemplo `200–265 SFM` para side milling e `100–165 SFM` para slotting na ferramenta AERO UVX-Ti; em outras cartas publica um Vc nominal por grupo e tabelas de RPM/avanço por diâmetro.[4] A Kennametal informa que sua calculadora é teórica, voltada a planejamento, e que os resultados reais variam.[6]

A estrutura correta é, portanto, **faixa de aplicação da carta**, não janela simétrica genérica. Cada faixa deve levar consigo ferramenta, substrato, revestimento, dureza, geometria, `ae`, `ap`, refrigeração, overhang e estratégia.

### 3.2 Sensibilidade relativa de `Vc`, `fz`, `ae` e `ap`

Não foi localizada fonte de fabricante que ordene numericamente os quatro parâmetros em uma escala única. Como regra operacional conservadora para risco imediato de formação de cavaco e aresta, a ordem recomendada é:

| Ordem operacional proposta | Parâmetro | Motivo publicado | Confiança |
|---:|---|---|---|
| 1 | `fz` | Cavaco fino demais causa rubbing/poor chip formation; cavaco grosso demais sobrecarrega e pode quebrar a aresta [7] [14]. | `SEM CONSENSO` para ranking universal; mecanismo `REFERÊNCIA ÚNICA` |
| 2 | `ae` | Baixo `ae/D` gera chip thinning e exige correção de fz; aumentar ae altera carga radial e espessura efetiva [14] [8]. | `SEM CONSENSO` |
| 3 | `ap` | Em ferramentas de raio/ball, a profundidade muda o ângulo de entrada e a distribuição de carga ao longo da aresta [14]. | `SEM CONSENSO` |
| 4 | `Vc` | Vc altera carga térmica, desgaste e possibilidade de aresta postiça; não é, por si, um limite simétrico de corte [7] [11]. | `SEM CONSENSO` |

Essa ordem é uma **estrutura de segurança**, não um fato universal. Para objetivo de vida da ferramenta, `Vc` pode tornar-se tão sensível quanto `fz`; por isso o sistema não deve exibir um único ranking fixo sem declarar se está protegendo aresta, potência, acabamento ou vida.

### 3.3 Piso físico de `fz`: raio de aresta e espessura mínima de cavaco

**Raio de aresta por faixa de diâmetro.** Não foi encontrado catálogo autorizado que publique, para a família de fresas inteiriças do escopo, o raio de preparação da aresta por diâmetro. O raio de 0,25 mm que aparece na página Kennametal é raio de ponta esférica de uma fresa de 0,5 mm, não raio de preparação do gume.[5] Usá-lo como `r_e` seria um erro de identificação.

**Espessura mínima como percentual de `r_e`.** A hipótese preliminar de `5–20%` do raio não foi confirmada por fabricante autorizado. A Harvey afirma que o valor crítico depende da ferramenta e que, abaixo dele, há ploughing/rubbing, mas não publica o percentual.[7] O sistema deve registrar `LACUNA`, não transformar 5–20% em regra.

**Tradução para o sistema.** A forma tecnicamente adequada é:

`h_min = função(r_e, preparação da aresta, material, KAPR, ae/D, ap, runout e estratégia)`

`fz_min = fator_de_geometria × h_min`

A Sandvik publica fatores de chip thinning para manter `h_ex`, como 1,0 em KAPR 90°, 1,4 em KAPR 45° e 5,8 em KAPR 10°, mas esses fatores não são um `h_min` para microfresas e não devem ser transplantados diretamente para a fresa inteiriça do sistema.[14] A fração `fz_min/fz_recomendado` permanece **não quantificável** dentro do território pesquisado.

### 3.4 Teto de `fz`

A Sandvik declara que `h_ex` alto demais sobrecarrega a aresta e pode levar à quebra; a Harvey recomenda ajustar a profundidade para evitar relação de espessura de cavaco/raio muito pequena.[14] [7] Nenhuma carta consultada publica um teto universal de `fz` para todas as fresas inteiriças, materiais e máquinas.

O teto deve ser calculado por **carta da ferramenta e envelope da máquina**, considerando número de cortes, potência, torque, rigidez, balanço, `ae`, `ap`, entrada/saída e limite de lascamento. `fz_max` universal é `NÃO ENCONTRADO`. Potência da máquina é um limite possível, mas não substitui o limite de espessura de cavaco e resistência da aresta.

### 3.5 Efeito de `Vc +20%` sobre vida

A relação de Taylor pode ser escrita, sem escolher um expoente não pesquisado, como:

`V₁ · T₁ⁿ = V₂ · T₂ⁿ`

Se `V₂ = 1,20 · V₁`, então:

`T₂/T₁ = (1,20)^(-1/n)`

`redução percentual da vida = [1 − (1,20)^(-1/n)] × 100%`

Essa é a quantificação auditável possível nesta rodada. O expoente `n` não foi encontrado em catálogo de fabricante autorizado para a combinação do sistema e pertence à rodada explicitamente separada no enunciado. Portanto, **não há percentual numérico honesto para a redução de vida** nesta entrega. A afirmação “+20% de Vc reduz a vida em X%” deve ser bloqueada até que `n` e a ferramenta/material sejam fornecidos por fonte elegível.

### 3.6 Estrutura de zonas recomendada

A substituição recomendada é abandonar limiares universais e usar zonas derivadas da carta e da física de cada parâmetro.

| Parâmetro | Zona abaixo do ponto de partida | Zona recomendada | Zona acima do ponto de partida | Assimetria que deve ser implementada |
|---|---|---|---|---|
| `fz` | Pode entrar em rubbing/ploughing se `h_ex` cair abaixo do mínimo da ferramenta; não é automaticamente conservador [7] [14]. | Faixa de fz publicada para ferramenta/material/estratégia. | Pode elevar `h_ex`, força, potência, lascamento e quebra [14]. | Piso físico e teto de carga são distintos; não usar janela simétrica. |
| `ae` | Reduz carga, mas produz chip thinning e pode exigir aumento de fz para manter `h_ex` [14]. | `ae/D` da carta. | Aumenta engajamento radial e carga; risco depende de `ap`, canto, ferramenta e máquina. | Baixo ae não deve ser rotulado vermelho por si só. |
| `ap` | Pode reduzir carga, mas muda KAPR/espessura em ball/toroidal e pode piorar resultado geométrico [14]. | Profundidade da carta. | Aumenta contato, força, deflexão e potência. | Baixo ap é geralmente conservador para carga, mas não é sempre equivalente. |
| `Vc` | Pode reduzir temperatura, mas pode favorecer rubbing/aresta postiça em certas condições; não declarar seguro universal [7] [9]. | Vc da carta. | Aumenta carga térmica e desgaste; efeito de vida depende de `n` e ferramenta. | Limite superior tende a ser mais crítico para vida, mas o inferior também pode ser perigoso. |

**Recomendação de implementação:** cada zona deve ser calculada contra o envelope publicado da ferramenta, e não contra quatro razões fixas. Quando não houver envelope, o sistema deve exibir `NÃO ENCONTRADO` ou `LACUNA`, solicitando ferramenta, revestimento, material, dureza, estratégia, `ae`, `ap`, refrigeração e máquina.

## Bloco 4 — Tabela A: velocidades recomendadas

As linhas abaixo são **pontos de partida de catálogo**, não valores universais. A condição foi mantida junto ao número e a confiança é por linha.

| Material/condição | Desbaste ou side milling | Semi-acabamento | Acabamento/HSM | Condição obrigatória | Confiança |
|---|---:|---:|---:|---|---|
| Aço carbono grupo `<32 HRC`, proxy para 1020/1045 | **76,2–121,9 m/min** [2] [1] | `NÃO ENCONTRADO` | HSM 1045/1055: **475,5 m/min** [3] | WXL 4F; side/contour para a faixa baixa; HSM dedicado para 475,5; overhang e ae/ap da carta | `REFERÊNCIA ÚNICA` proxy |
| 1045 nominal em HSM | `NÃO MISTURAR` com side milling | `NÃO ENCONTRADO` | **475,5 m/min** [3] | WXL 4F, HSM light milling, 1045/1055 explícitos | `REFERÊNCIA ÚNICA` direta |
| Inox grupo da carta | **58,5–76,2 m/min** como grupos OSG de aço/inox [3] [2] | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` específico para 304 | Não equivale automaticamente a AISI 304; declarar grupo de dureza e ferramenta | `REFERÊNCIA ÚNICA` proxy |
| Alumínio/cobre, proxy para 6061-T6 | **296,9 m/min** [2] | `NÃO ENCONTRADO` | HSM **495,9 m/min** [2] | OSG WXL 4F; grupo aluminum/copper; não individualiza 6061-T6 | `REFERÊNCIA ÚNICA` proxy |
| P20 no grupo publicado `42–50 HRC` | **46,6 m/min** [2] | `NÃO ENCONTRADO` | HSM **147,0 m/min** [2] | Só para a condição de grupo da carta; não usar no P20 280–320 HB sem validação | `REFERÊNCIA ÚNICA` parcial |
| 2711 | `LACUNA` | `LACUNA` | `LACUNA` | Falta equivalência DIN/AISI e carta nominal do fabricante | `NÃO ENCONTRADO` |
| 8620 núcleo, proxy `<32 HRC` | **76,2 m/min** [2] | `NÃO ENCONTRADO` | HSM de grupo **375,2 m/min** [2] | Proxy não nomeia 8620; erro de material não quantificado | `REFERÊNCIA ÚNICA` proxy |
| 8620 cementado | **29,3–47,5 m/min** em 45–60 HRC [3] | `NÃO ENCONTRADO` | HSM **94,5 m/min** somente no grupo 45–55 HRC [3] | Não cobre 60–62 HRC; não extrapolar | `REFERÊNCIA ÚNICA` parcial |
| H13 tratado, grupo `42–50 HRC` | **46,6 m/min** [2] | `NÃO ENCONTRADO` | HSM **147,0 m/min** [2] | H13 explícito na linha, mas faixa 50–52 HRC não fechada | `REFERÊNCIA ÚNICA` parcial |
| GG25, proxy cast iron | **76,2 m/min** [2] | `NÃO ENCONTRADO` | HSM **375,2 m/min** [2] | Não individualiza GG25 | `REFERÊNCIA ÚNICA` proxy |
| GGG50 | `LACUNA` | `LACUNA` | `LACUNA` | Falta carta de nodular/GGG50 | `NÃO ENCONTRADO` |
| Ti-6Al-4V, side milling | **61,0–80,8 m/min** [4] | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` | AERO UVX-Ti 5F, `aa≤1,8D`, `ar=0,2D`, refrigerante solúvel recomendado | `REFERÊNCIA ÚNICA` direta |
| Ti-6Al-4V, slotting | **30,5–50,3 m/min** [4] | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` | AERO UVX-Ti 5F, `aa≤1D`, refrigerante solúvel recomendado | `REFERÊNCIA ÚNICA` direta |

## Bloco 5 — Tabela B: avanços recomendados

A tabela a seguir usa pontos realmente convertidos de uma carta de fabricante, não uma interpolação inventada. A base é OSG WXL 4F ball end, grupo `Up to 32 HRC`, proxy para o grupo do sistema `28–34 HRC`. O sistema atual é mostrado apenas para auditoria da divergência.

| D (mm) | fz desbaste OSG | fz atual | fz acabamento OSG | Regra recomendada |
|---:|---:|---:|---:|---|
| 0,2 | `LACUNA` | 0,003 | `LACUNA` | Não usar piso absoluto sem carta da microfresa. |
| 0,5 | `LACUNA` | 0,006 | `LACUNA` | Kennametal confirma ferramenta 0,5 mm, mas não publicou fz na página aberta [5]. |
| 0,75 | `LACUNA` | 0,008 | `LACUNA` | Solicitar carta da ferramenta. |
| 0,8 | `LACUNA` | 0,010 | `LACUNA` | Solicitar carta da ferramenta. |
| 1,0 | 0,0110 | 0,012 | 0,0110 | Ponto OSG; não aplicar a outra geometria sem confirmação [1]. |
| 1,5 | `LACUNA` | 0,020 | `LACUNA` | Não interpolar entre tabelas diferentes. |
| 2,0 | 0,0220 | 0,030 | 0,0220 | O sistema está 36% acima do ponto OSG proxy [1]. |
| 3,0 | 0,0366 | 0,050 | 0,0376 | O sistema está 37% acima do ponto OSG proxy [1]. |
| 4,0 | 0,0494 | 0,070 | 0,0505 | O sistema está 42% acima; não usar acabamento ×0,60 [1]. |
| 6,0 | 0,0756 | 0,100 | 0,0766 | O sistema está 32% acima do ponto OSG proxy [1]. |
| 8,0 | 0,1028 | 0,120 | 0,1031 | O sistema está 17% acima do ponto OSG proxy [1]. |
| 10,0 | 0,1301 | 0,140 | 0,1299 | O sistema está 8% acima do ponto OSG proxy [1]. |
| 12,0 | 0,1568 | 0,160 | 0,1564 | Diferença aproximada de 2%; ainda é proxy de geometria esférica [1]. |
| 14,0 | `LACUNA` | 0,180 | `LACUNA` | Carta específica necessária. |
| 16,0 | `LACUNA` | 0,200 | `LACUNA` | Carta específica necessária. |

A regra recomendada para o software é guardar `fz` como dado da ferramenta, com `Z`, geometria, revestimento, material, dureza, `ae`, `ap`, estratégia e refrigeração como chaves. `Vf` deve ser calculado com o Z efetivo; a interpolação pode ser usada apenas dentro da mesma carta e deve exibir a fonte dos pontos vizinhos.

## Bloco 6 — Tabela C: o que continua sem base

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| Faixa universal de 1045 | Três cartas OSG mostram envelopes diferentes por estratégia; não há consenso independente. | Pelo menos três cartas independentes de fabricantes autorizados para a mesma geometria, revestimento, dureza, ae/ap e estratégia. |
| Equivalência de 2711 | Nenhuma página autorizada localizou equivalência DIN/AISI e dados de corte. | Datasheet ou catálogo do próprio fabricante de ferramenta nomeando 2711 e a equivalência usada. |
| P20 280–320 HB | P20 aparece somente no grupo OSG 42–50 HRC. | Carta que nomeie P20 na condição não endurecida da tabela do sistema. |
| H13 50–52 HRC | A linha OSG nomeia H13 em grupo que termina em 50 HRC. | Carta que cubra H13 tratado acima de 50 HRC com a mesma ferramenta. |
| 8620 núcleo e cementado | Apenas proxies por grupos gerais de dureza; não há erro estatístico de proxy. | Carta nominal 8620, separando núcleo e cementado, com HRC/condição de tratamento. |
| GG25 | Foi localizado apenas o grupo genérico `cast iron`. | Carta que nomeie GG25 ou equivalente declarado pelo fabricante. |
| GGG50 | Nenhum dado de nodular/GGG50. | Carta nominal para nodular/GGG50. |
| Ti-6Al-4V acabamento/semi | OSG UVX-Ti publica side milling e slotting, mas não todas as operações do sistema. | Carta da mesma ferramenta para semi-acabamento e acabamento. |
| Multiplicadores de revestimento | Não há comparação autorizada sem revestimento × TiAlN × AlTiN × AlCrN. | Estudo/carta do fabricante da ferramenta com as quatro condições e mesma geometria/material. |
| Multiplicadores de refrigeração | Há recomendações qualitativas, mas não percentuais para seco, ar, MQL, emulsão e alta pressão. | Tabela do fabricante com ensaio comparável e mesma ferramenta. |
| Raio de aresta por diâmetro | O raio de ponta esférica não é raio de preparação do gume. | Catálogo que publique `r_e`/edge preparation por diâmetro e geometria. |
| `h_min = 5–20% r_e` | Não confirmado por fabricante autorizado. | Fonte de fabricante com percentual e condição de medição. |
| Piso absoluto `fz=0,002` | Harvey explica o mecanismo, mas não dá valor absoluto. | Carta de microfresa que publique fz mínimo e raio/preparação da aresta. |
| Teto universal de fz | Sobrecarga depende de aresta, máquina, potência, ae/ap, material e geometria. | Carta específica com limite superior ou ensaio do fabricante. |
| Vida com `Vc +20%` | O expoente `n` não foi encontrado nesta rodada. | Rodada própria com `n` de fabricante para a ferramenta/material ou ensaio comparável. |
| Janela simétrica 0,50–1,50 | Nenhum fabricante consultado publica esses limiares gerais. | Três fontes independentes que publiquem limites por parâmetro, ou dados de ensaio do próprio sistema. |

## Lacunas declaradas

Permanece sem base, dentro do território de fabricantes autorizado, uma equivalência auditável para 2711; uma faixa direta para P20 na condição 280–320 HB; uma linha direta para 8620 núcleo e cementado; uma linha nominal para GG25 e GGG50; uma carta completa de Ti-6Al-4V para semi-acabamento/acabamento; multiplicadores numéricos para sem revestimento, TiAlN, AlTiN e AlCrN; multiplicadores entre seco, ar, MQL, emulsão e alta pressão; raio de aresta por diâmetro; percentual `h_min/r_e`; piso físico absoluto de `fz`; teto universal de `fz`; expoente de Taylor `n`; e limiares universais para as zonas de cor.

Essas lacunas não são falhas da pesquisa. São resultados válidos da restrição de fonte: preencher qualquer uma delas com um número plausível, handbook, norma, artigo, blog ou calculadora de terceiro contrariaria a regra de auditabilidade do sistema.

## Referências

[1]: https://osgtool.com/content/literature/800438CA/Tech%20pg.%20List%20(s)-%203430_3530.pdf "OSG Tool — List 3430/3530 EXOCARB WXL, 4 Flute Ball End, Speeds & Feeds; ano não indicado na página"

[2]: https://osgtool.com/content/literature/8002024CA/Tech%20pg.%20List%20(s)-%203604.pdf "OSG Tool — List 3604 EXOCARB WXL, Regular Length 4 Flute, Speeds & Feeds; ano não indicado na página"

[3]: https://osgtool.com/content/literature/8002024CA/Tech%20pg.%20List%20(s)-%203670.pdf "OSG Tool — List 3670 EXOCARB WXL, 4 Flute Corner Radius, Speeds & Feeds; ano não indicado na página"

[4]: https://osgtool.com/content/literature/8002024CA/Tech%20pg.%20List%20(s)-%202100_%202102_%202106_%202108.pdf "OSG Tool — AERO UVX-Ti Lists 2100/2102/2106/2108, Technical Speed & Feed Chart; ano não indicado na página"

[5]: https://www.kennametal.com/ar/en/products/p.f2alwm-lang-verlangerter-frontschaft-kugelkopf.2657139.html "Kennametal — KenCut MM F2AL-WM Ball Nose, 2 Flutes, KC637M, product page; ano não indicado na página"

[6]: https://www.kennametal.com/us/en/resources/engineering-calculators/miscellaneous/speed-and-feed.html "Kennametal — Speeds and Feeds Calculator; ano não indicado na página"

[7]: https://www.harveyperformance.com/in-the-loupe/how-to-optimize-results-while-machining-with-miniature-end-mills/ "Harvey Performance/Harvey Tool — Optimized Machining With Miniature End Mills; publicado em 2020 na página"

[8]: https://www.harveyperformance.com/in-the-loupe/intro-high-efficiency-milling/ "Harvey Performance/Harvey Tool — Introduction to High Efficiency Milling; publicado em 2017 na página"

[9]: https://www.harveyperformance.com/in-the-loupe/reduce-heat-generation/ "Harvey Performance/Harvey Tool — Effective Ways to Reduce Heat Generation; publicado em 2018 na página"

[10]: https://www.harveytool.com/products/material-specific-end-mills/hardened-steels/ball "Harvey Tool — Material Specific End Mills for Hardened Steels, Ball, AlTiN Nano; ano não indicado na página"

[11]: https://www.helicaltool.com/resources/tool-coatings "Helical Solutions — Tool Coatings, Aplus/Tplus/Zplus/Nplus/Dplus; ano não indicado na página"

[12]: https://www.helicaltool.com/resources/speeds-feeds "Helical Solutions — Speeds & Feeds resource page; ano não indicado na página"

[13]: https://www.sandvik.coromant.com/en-us/tools/milling-tools/solid-carbide-end-mills/coromill-plura "Sandvik Coromant — CoroMill Plura solid carbide end mills by application and material; ano não indicado na página"

[14]: https://www.sandvik.coromant.com/en-us/knowledge/milling/entering-angle-and-chip-thickness "Sandvik Coromant — Entering angle and chip thickness in milling; ano não indicado na página"

[15]: https://guhring.com/SpeedsAndFeeds/SpeedFeed "Guhring — official Speeds & Feeds portal by tool series; ano não indicado na página"
