# RESPOSTA R3 — Ferramentas, Substratos e Revestimentos (retorno B)

**Rodada:** R3 — Ferramentas e Substratos
**Executor:** `agente_pesquisa_2` (segundo retorno independente, sem contato com o retorno A)
**Data:** 17/08/2026
**Método:** busca web dirigida (24 consultas) + leitura de 8 páginas/tabelas. Sem acesso a catálogo impresso nem a área logada de fabricante.

> **Aviso de procedência, antes de qualquer número.** A pergunta central desta rodada — dispersão de composição de substrato entre fabricantes — esbarra num fato que precisa ser dito primeiro: **os grandes fabricantes de ferramenta (Sandvik, Kennametal, Iscar, Seco, Walter, Mitsubishi, OSG, Guhring) não publicam teor de cobalto nem tamanho de grão do substrato das suas fresas inteiriças.** Publicam nome comercial de grau, classe ISO e recomendação de aplicação. Quem publica composição é o **fabricante do bastão de metal duro** (produtor de matéria-prima) e o distribuidor de blanks. Toda a Questão 2a desta resposta, portanto, está apoiada em dados de **fornecedores de bastão/blank**, não de fabricantes de ferramenta acabada. Isso está declarado grade a grade e repetido na Tabela C. Não foi possível fechar o teor de cobalto de uma fresa Sandvik, Kennametal ou Guhring específica — e isso, por si só, é um achado relevante para o desenho do produto (§2f).

---

## 1 Matriz de combinações reais: o que existe em catálogo

**Veredito:** A fresa de topo de aço rápido **não é obsoleta** — é residual em CNC e continua padrão em fresadora convencional, manutenção e ferramentaria de baixo volume, inclusive no Brasil. A premissa do dono do produto está **parcialmente refutada**: correta para o cenário CNC de produção, incorreta como afirmação de mercado.
**Confiança:** CONSENSO quanto ao domínio do metal duro em CNC · SEM CONSENSO quanto ao tamanho exato do nicho de HSS.

### Tabela A — Tipo de ferramenta × substrato

Legenda: **PM** padrão de mercado · **N** existe mas é nicho · **X** não existe / obsoleto na prática · **—** não encontrado

| Tipo de ferramenta | HSS | HSS-Co | Metal duro inteiriço | Pastilha intercambiável | Cerâmica / CBN / PCD |
|---|---|---|---|---|---|
| Fresa de topo reto | **N** (convencional, manutenção, ferramentaria) | **N** | **PM** | **N** (fresa de topo insertada, Ø≥16 mm) | **N** (PCD p/ não-ferroso e compósito) |
| Fresa toroidal | **X** | **X** | **PM** | **PM** (Ø maior, alto avanço) | **N** (cerâmica p/ Inconel) |
| Fresa esférica | **N** (raro) | **N** (raro) | **PM** | **PM** (Ø≥16 mm, copiadora) | **N** (CBN p/ aço endurecido; PCD p/ compósito) |
| Broca helicoidal | **PM** (manual, reparo, furo não crítico) | **PM** (inox, aço-liga) | **PM** (CNC, Ø3–20 mm) | **X** | **N** |
| Broca insertada / U-drill | **X** | **X** | **X** (o corpo é aço) | **PM** (Ø12–65 mm) | **X** |
| Macho de máquina | **N** | **PM** (HSS-E/M35 é o padrão) | **N** (ferro fundido, abrasivo, alto volume) | **N** (macho de pastilha, Ø grande) | **X** |
| Fresa de rosca | **X** | **N** | **PM** | **N** | **X** |
| Alargador | **N** | **N** | **PM** (inteiriço ou com pastilha soldada) | **N** | **N** (PCD p/ alumínio) |
| Barra de mandrilar | **X** | **X** | **PM** (haste de metal duro p/ L/D>4) | **PM** (cabeçote com pastilha) | **X** |

**Fontes da matriz:** Cutting Tool Engineering (broca inteiriça 3–20 mm vs. insertada a partir de 12 mm) · Ceratizit / Cutwel / TillTools (faixa de U-drill 12–65 mm) · Jarvis Cutting Tools e fabricantes de macho (HSS-E padrão, carbide em nicho) · Karnasch, Regal, 2L (fresa de rosca: toda a oferta corrente é metal duro inteiriço) · Hannibal Carbide e MSC BetterMRO (alargador) · Kennametal (barra de mandrilar, haste de metal duro e amortecida) · Kennametal KYS40 / OSG / BSQ (fresa cerâmica p/ Inconel) · Harvey Tool e CoreHog (fresa PCD p/ não-ferroso e compósito).

### a) Fresa de aço rápido é obsoleta?

**Não — refutado, com ressalva.** O que a evidência sustenta:

- No mercado global de fresas de topo, **metal duro inteiriço é o maior segmento (32,4% em 2023)**, e HSS permanece como segmento ativo, não descontinuado. *(Verified Market Reports / The Insight Partners — relatório de mercado pago, resumo público. Confiança: REFERÊNCIA ÚNICA, fonte comercial, não técnica.)*
- Fontes brasileiras de distribuição descrevem a fresa HSS como escolha corrente para **fresadora convencional, ferramentaria de manutenção, corte interrompido e perfil complexo em rotação baixa/média** — e localizam a vantagem dela na **tenacidade**, não na velocidade: em máquina sem rigidez ou com folga, o metal duro lasca e o HSS aguenta o tranco. *(Hoko Ferramentas, Ferramentas Gerais, Loja das Fresas. Confiança: CONSENSO entre fontes brasileiras, mas todas comerciais.)*
- MSC/BetterMRO é explícito sobre a fronteira: HSS segue apropriado em **aplicação manual, protótipo, reparo e furo cujo acabamento não é crítico** — e descreve usar HSS em CNC moderno como incompatibilidade de nível de máquina, não como impossibilidade.

**Nicho real, com nome:** máquina sem rotação suficiente (fresadora convencional raramente passa de 2.000–3.000 rpm — um Ø10 de metal duro a 120 m/min pede 3.800 rpm, que a máquina não entrega), manutenção, ferramentaria de baixo volume, corte interrompido em setup pouco rígido, e oficina que já tem a ferramenta.

> **Contradiz a decisão D1 do Mestre** ("fresa de aço rápido é obsoleta; o HSS sobrevive em broca e macho"). A parte de broca e macho está **confirmada**. A parte de fresa está **parcialmente refutada**: obsoleta em CNC de produção, viva em máquina convencional e manutenção — que é exatamente parte do público declarado (oficina brasileira de usinagem e ferramentaria).

### b) Broca — HSS ainda é padrão?

**Sim, coexistência estável, dividida por diâmetro, máquina e criticidade** — não por obsolescência.

| Faixa / condição | Substrato padrão | Fonte |
|---|---|---|
| Furo manual, reparo, furo não crítico | HSS (M2) | MSC BetterMRO |
| Inox, aço-liga, aço tratado, calor alto | HSS-Co (M35 5% Co / M42 8% Co) | guias de grau de broca (Jaco, Coinch, Slugger) |
| CNC rígido, Ø3–20 mm, produção | Metal duro inteiriço | Cutting Tool Engineering |
| Ø ≥ 12 mm, produção, custo por furo | Broca insertada / U-drill (Ø12–65 mm) | Ceratizit, Cutwel, TillTools |

**Ponto de cruzamento citável:** o metal duro inteiriço domina **até ~12–20 mm**; acima de 12 mm a broca insertada passa a ser economicamente preferível; a broca inteiriça de metal duro raramente ultrapassa 20 mm. *(Cutting Tool Engineering; Cutwel. Confiança: CONSENSO.)*

### c) Macho de máquina — qual substrato hoje?

**HSS-E / HSS-Co (M35) é o padrão de mercado.** Metal duro em macho é nicho, e o nicho é bem delimitado: ferro fundido, materiais abrasivos, aço acima de ~35 HRC e alto volume com máquina rígida. Motivo declarado nas fontes: o macho trabalha em furo fechado, com torque de reversão e evacuação ruim — o metal duro é frágil demais para setup instável.

Números encontrados: macho de metal duro roda **2–3× a velocidade** do HSS e dura **3–10×** mais em aço acima de 35 HRC e inox, mas custa **$15–60 vs. $2–15**. *(Jarvis Cutting Tools; comparativos de fabricantes de macho. Confiança: REFERÊNCIA ÚNICA — as cifras de vida vêm de material comercial, não de ensaio publicado.)*

**Corte vs. conformação muda a resposta?** Sim, mas na direção contrária ao que se esperaria: o macho de **conformação** (laminação) é ainda mais dominado por HSS-E, porque trabalha por deformação plástica e exige tenacidade extrema — não há oferta relevante de macho de conformação em metal duro. Confiança: REFERÊNCIA ÚNICA.

### d) Os fatores de Vc do sistema (HSS 0,29 · HSS-Co 0,37 · MD 1,00) têm base?

**Parcialmente. A ordem de grandeza está certa; o número exato não tem fonte única e as fontes divergem por um fator de 2.**

| Fonte | Razão HSS ÷ metal duro | Observação |
|---|---|---|
| Tabela de torneamento derivada de Machinery's Handbook (LittleMachineShop) | **0,15–0,24** (aço carbono comum: 125–215 vs. 800–885 sfm) | torneamento, corte contínuo |
| Etant Donnés (regra de oficina) | **0,50** ("para metal duro, dobre a velocidade") | regra grosseira |
| MSC BetterMRO | **≤0,25** ("HSS é pelo menos 4× mais lento") | furação |
| Regra de fresamento citada em múltiplos guias | **0,20–0,33** ("metal duro roda 3–5× mais rápido") | fresamento |
| AIMS Industrial | **0,10–0,17** em aço (6–10×); 0,20 em alumínio (5×) | valores agressivos, fonte comercial |

**Leitura:** o valor implementado **0,29 cai dentro da faixa de fresamento (0,20–0,33)** e é o mais defensável dos três candidatos. Não é arbitrário nem está errado — mas também **não tem uma fonte única que o produza**. A dispersão real entre fontes (0,10–0,50) é muito maior que a margem do modelo, e a razão é física: em fresamento a vantagem do metal duro é menor que em torneamento porque o corte é interrompido e a fragilidade cobra preço.

**HSS-Co ÷ HSS = 1,28 no sistema.** Encontrado: **+25–30%** de velocidade do M42 sobre o M2 em inox. O implementado (0,37/0,29 = **+28%**) está dentro da faixa medida. *(Guias de grau M2/M35/M42: Jaco Tools, Coinch, Slugger, Zhonghuan. Confiança: CONSENSO entre fontes secundárias; nenhuma primária.)*

**Sensibilidade quantificada:** trocar 0,29 por 0,20 ou por 0,40 muda a Vc recomendada de HSS em **−31% / +38%** — muito acima da margem ±15–25% do modelo. Ou seja: **o fator de HSS é um dos poucos pontos desta rodada onde a escolha do número muda o resultado além da margem.** Merece ser declarado como faixa, não como constante escondida.

### e) Decisão de produto: não oferecer a combinação obsoleta, ou oferecer com aviso?

**Recomendação: oferecer, com fator correto e aviso visível.** Critério, na ordem:

1. O dano de **não calcular** é maior que o dano de calcular com incerteza. O operador que tem a fresa HSS na gaveta vai usá-la de qualquer jeito; sem a ferramenta ele estima de cabeça, e a estimativa de cabeça costuma errar mais que ±30%.
2. A combinação **não é obsoleta** (item *a*) — bloqueá-la seria representar errado o mercado que o produto atende, que inclui fresadora convencional.
3. O que **não** deve ser oferecido é a combinação que não existe em catálogo: fresa toroidal em HSS, broca insertada abaixo de Ø12 mm, fresa de rosca em HSS. Aí sim vale a regra "prefere não representar a representar errado" — e essas células estão marcadas **X** na Tabela A.

**Formulação sugerida do aviso:** não "ferramenta obsoleta", e sim a condição física — *"aço rápido: rotação limitada; confira se a máquina entrega a rotação calculada"* — porque é isso que o operador precisa decidir.

**Classificação:** **MODELAR** — substrato do tipo HSS / HSS-Co / metal duro muda Vc muito além da margem (fator 3–5×), e o operador identifica isso na embalagem sem margem de dúvida.

---

## 2a A premissa se sustenta para fresa inteiriça de uso geral?

**Veredito:** **Sustenta-se.** A janela de substrato usada em fresa inteiriça de uso geral é estreita — 9–12% de cobalto, grão 0,4–0,8 µm — e a dispersão de propriedade mecânica dentro dela fica **abaixo da margem de ±15–25% do modelo** em tudo que entra no cálculo. O substrato de fresa pode virar **constante do sistema**.
**Confiança:** CONSENSO quanto à faixa de composição · **NÃO ENCONTRADO** quanto a um efeito de substrato quantificado em % sobre Vc (nenhum catálogo publica Vc em função de %Co ou de grão).

### O que as fontes dizem

Nenhum dos quatro fabricantes de ferramenta pedidos publica a composição. O que existe é a composição publicada por **fornecedores de bastão de metal duro**, que é o insumo de todos eles:

| Grau | Origem | Co % | Grão (µm) | HV30 | HRA | TRS (MPa) | Aplicação declarada |
|---|---|---|---|---|---|---|---|
| C-2 | Centennial Carbide (blank) | 6,0 | 1,2 | — | 92,1 | 2.240 | uso geral, desgaste |
| Micrograin | Centennial Carbide (blank) | 10,0 | 0,8 | — | 92,0 | 3.100 | padrão de bastão de fresa |
| Ultra-micrograin | Centennial Carbide (blank) | 12,0 | 0,4 | — | 92,5 | 4.480 | difícil de usinar |
| YF06 | ZCC (via Langsun) | 5,6 | 0,5 | 1.850 | 93,5 | 3.800 | corte estável, desgaste abrasivo |
| YL10.2 | ZCC (via Langsun) | 10,0 | 0,8 | 1.600 | 91,5 | 4.000 | bastão de uso geral |
| XF30 | ZCC (via Langsun) | 12,0 | 0,6 | 1.700 | 92,5 | 4.000 | furo profundo, setup instável |
| MT06U | MeetYou Carbide | 6,5 | 0,6 | 1.890 | 93,5 | 3.700 | — |
| **MT09U** | MeetYou Carbide | **9,0** | **0,4** | **1.890** | 93,5 | 3.800 | **fresamento de alta velocidade, acabamento** |
| **MT10S** | MeetYou Carbide | **10,0** | **0,8** | **1.600** | 91,5 | 4.100 | **fresamento e furação, uso geral** |
| MT12S | MeetYou Carbide | 12,0 | 0,6 | 1.580 | 91,2 | 4.200 | — |
| MT25S | MeetYou Carbide | 12,0 | 0,4 | 1.750 | 92,5 | 4.400 | — |
| H10F | Sandvik Coromant | (não publicado) | "submicron / extra-fino" | — | — | — | ferro fundido, não-ferroso, alta velocidade |

**Janela de fresa de uso geral** (linhas marcadas como fresamento, mais o padrão de bastão): **Co 9–12%**, com **10% como o valor mais repetido**; **grão 0,4–0,8 µm**; **HV30 1.580–1.890**.

### Sensibilidade quantificada

| Propriedade | Dispersão na janela 9–12% Co | Entra no cálculo? | Efeito no resultado |
|---|---|---|---|
| Teor de cobalto | 9 → 12% (**±14%** em torno de 10,5) | não diretamente | — |
| Tamanho de grão | 0,4 → 0,8 µm (**fator 2**) | não | afeta desgaste e raio de gume obtenível, não a fórmula |
| Dureza HV30 | 1.580 → 1.890 (**±9%**) | não | proxy de vida, não entra em Vc, fz, potência |
| TRS | 3.800 → 4.400 (**±7%**) | não | proxy de tenacidade |
| **Módulo E** | **557 → 598 GPa (±3,6%)** | **sim — deflexão** | **±3,6% na deflexão calculada** |

**A única propriedade do substrato que entra numa fórmula do sistema é o módulo de elasticidade `E`, e a dispersão dele na janela real de fresa é ±3,6%** — cerca de **1/5 da margem declarada do modelo (±15–25%)**. Vc, fz e potência não recebem o substrato como variável em catálogo nenhum consultado.

**O que a literatura diz sobre o efeito, sem quantificá-lo em Vc:** grão mais fino → maior resistência ao desgaste de flanco; mais cobalto → menor resistência ao desgaste, maior tenacidade. O efeito é sobre **vida da ferramenta e modo de falha**, não sobre a velocidade admissível recomendada. *(Springer, IJAMT — estudo de micro fresas WC-Co; ScienceDirect, "Cemented carbide microstructures: a review".)*

### Classificação

**IGNORAR** (como variável de entrada) / **DEFAULT** (como constante interna) — a dispersão que chega no cálculo é ±3,6%, contra ±15–25% de margem do próprio modelo. Fixar o substrato de fresa como constante é **quantitativamente defensável**, não uma simplificação de conveniência.

> **Ressalva honesta:** "a premissa se sustenta" aqui significa *"a variação de substrato entre fabricantes não muda o resultado além da margem"*. **Não** significa que a composição seja idêntica entre fabricantes — de 6% a 12% de cobalto há diferença metalúrgica real e diferença de vida da ferramenta real. O que se sustenta é a irrelevância **para o cálculo de parâmetro**, que é o escopo deste produto.

---

## 2b Onde a premissa quebra — as três exceções

### 1. Fresa para aço endurecido (acima de 50 HRC)

**Veredito:** Exceção **confirmada** na metalurgia, **irrelevante** para o motor de cálculo.
**Confiança:** REFERÊNCIA ÚNICA (fabricantes especializados; nenhum dos grandes publica).

Substrato encontrado em fresas declaradas para HRC 60–68: **grão ultrafino ~0,4 µm com 9% de cobalto**, contra 0,8 µm / 10% do uso geral. *(Dohre HEX series; ZHY Tool. Ambos fabricantes asiáticos especializados — fonte comercial.)* A dureza sobe de ~1.600 para ~1.890 HV30 (**+18%**).

**Quanto muda Vc e fz admissíveis?** A resposta encontrada é: **quem manda é a dureza da peça, não o substrato da ferramenta.** As velocidades de fresamento de aço endurecido caem por causa do material usinado (50–65 HRC), e o substrato ultrafino + revestimento AlCrN/AlTiN é o que **torna a operação possível**, não o que define o número. Nenhuma fonte entrega "com substrato X a Vc sobe Y%".

**Vem embutido na escolha da ferramenta?** **Sim, inequivocamente.** A ferramenta é vendida e comprada como "fresa para aço endurecido HRC 60/65/68" — o operador que vai usinar temperado já compra a fresa específica. → **Resolve-se no catálogo.** Não exige campo na tela.

**Classificação:** **DEFAULT** — o substrato de endurecido não vira campo; vira entrada de catálogo distinta, e o `E` continua na mesma janela (9% Co → 596 GPa, dentro dos ±3,6%).

### 2. Microfresa (abaixo de 1 mm)

**Veredito:** Exceção **confirmada e consequente** — a única das três que toca o motor de cálculo.
**Confiança:** CONSENSO (literatura revisada por pares, várias fontes independentes).

- Grão submicron/ultrafino é **obrigatório**: o metal duro é um sinterizado de grãos, e o **tamanho do grão limita o raio de gume obtenível** — não se afia um gume mais fino que a granulometria do material. *(SAMHO; ScienceDirect "Cutting Edge Preparation of Micro Milling Tools".)*
- Raio de gume comercial em microfresa de metal duro ultrafino: **"alguns micrômetros"** (ordem de 1–5 µm). Microfresas de PCD de laboratório chegam a **0,2 µm**, o que confirma que o limite é do material, não do processo. *(ScienceDirect, "Sharpening mechanism of extremely sharp edges for diamond micro mills".)*
- **Espessura mínima de cavaco** `h_min`, abaixo da qual o gume esfrega em vez de cortar: **0,17 a 0,33 × raio de gume**, com convergência de três estudos independentes (0,17·rε; faixa h/rε 0,25–0,33; MUCT medido 0,75–1,0 µm). *(IJAMT/Springer; ScienceDirect; MDPI/PMC.)*

**Sensibilidade quantificada — este é o achado numérico mais duro da rodada:**

Com raio de gume de 2–3 µm (microfresa comercial de grão ultrafino), `h_min` = **0,34 a 1,0 µm**. Como em fresamento a espessura de cavaco é menor que `fz` (afinamento por `ae`), o `fz` mínimo utilizável em microfresa fica **acima de ~1 µm/dente** e sobe conforme `ae/D` diminui. Abaixo disso o modelo de corte não vale: a força não cai, o acabamento piora, e a ferramenta quebra por esfregamento, não por corte.

**Vem embutido na escolha da ferramenta?** Sim — não existe microfresa de grão grosso no mercado. Mas a **consequência** (piso de `fz`) **não vem embutida**: ela precisa existir no motor.

**Classificação:** **MODELAR — como função do diâmetro, não como campo de substrato.** O operador não informa grão; o sistema aplica um piso de `fz` quando `D` entra na faixa micro. **Cruza diretamente com R1** (piso de diâmetro Ø0,5 mm do Mestre): abaixo de ~1 mm, o limite inferior de `fz` deixa de ser conforto e vira física.

### 3. Fresa para alumínio

**Veredito:** Exceção **refutada como substrato** — o que muda é **geometria, preparação de gume e revestimento**, não o metal duro.
**Confiança:** CONSENSO.

O que efetivamente distingue uma fresa de alumínio: **2–3 cortes** (evacuação), **hélice alta 45°** (melhor acabamento em alumínio), **canal polido** (impede o cavaco de soldar no gume), e **ausência de revestimento** ou revestimento da família não-ferrosa (ZrN, DLC, TiB₂, diamante). *(Harvey Performance "Attacking Aluminum"; Helical; Kodiak; guias de revestimento.)* Nenhuma fonte atribui a diferença ao substrato.

**Vem embutido na escolha da ferramenta?** Sim — "fresa para alumínio" é uma linha de catálogo própria em todo fabricante consultado.

**Classificação:** **DEFAULT** (resolve-se no catálogo) — **com uma exceção que vai para o revestimento** (§2d.2): a família de revestimento para alumínio é diferente em espécie, não em grau, e isso o motor precisa saber.

---

## 2c Módulo de elasticidade — a consequência mais direta da premissa

**Veredito:** Confirmado. `E` é **constante**, e o valor recomendado é **580 GPa**, com erro máximo de **±3,6%** na deflexão em toda a linha de fresas inteiriças.
**Confiança:** CONSENSO — duas fontes independentes concordam dentro de 1%.

### O que as fontes dizem

**Fonte 1 — lei linear de literatura:** `E = 695 − 11 × %Co` (GPa), com `E = 670 ± 10 GPa` no extremo de baixo cobalto. *(Estudo sobre influência do teor de cobalto nas propriedades do WC-Co sob carga dinâmica; valor WC-10Co = 585 GPa.)*

**Fonte 2 — tabela de grau de bastão comercial (MeetYou Carbide).** A coluna vem rotulada "GPa" mas os valores (86,78 · 85,36 · 80,86 · 91,00) só fecham como **10⁶ psi (Msi)**. Convertidas (×6,895), batem com a Fonte 1 com erro <1,5%:

| Grau | Co % | E na tabela (Msi) | E convertido (GPa) | E previsto por `695 − 11·Co` | Erro |
|---|---|---|---|---|---|
| MT06U | 6,5 | 91,00 | **627** | 623 | +0,6% |
| MT09U | 9,0 | 86,78 | **598** | 596 | +0,3% |
| MT10S | 10,0 | 85,36 | **589** | 585 | +0,7% |
| MT12S | 12,0 | 80,86 | **558** | 563 | −0,9% |
| MT20.8 | 15,0 | 79,09 | **545** | 530 | +2,8% |

A concordância entre uma lei de literatura e uma tabela comercial obtida por caminho independente é o resultado mais sólido desta rodada.

### Estreitamento e valor único

- Faixa ampla conhecida (todos os graus de metal duro, inclusive os que não vão em fresa): **500–650 GPa**.
- **Faixa real de fresa inteiriça (Co 9–12%): 558–598 GPa.**
- Valor único que minimiza o erro máximo: **578 GPa** → arredondar para **580 GPa**.

**Erro máximo de deflexão ao aplicar 580 GPa em toda a linha:** a deflexão é inversamente proporcional a `E`, logo o erro relativo de deflexão é o erro relativo de `E` com sinal trocado:

| Substrato real | E real | Erro ao usar 580 GPa |
|---|---|---|
| 9% Co (acabamento, endurecido, micro) | 598 GPa | deflexão superestimada em **3,1%** (a favor da segurança) |
| 10% Co (uso geral, dominante) | 589 GPa | superestimada em **1,6%** |
| 12% Co (tenaz) | 558 GPa | **subestimada em 3,8%** ← pior caso |

**Erro máximo: 3,8%, sempre.** Contra os **16%** que se cometeria adotando 500 GPa da faixa ampla. Estreitar valeu a pena.

**Sensibilidade quantificada:** ±3,6% de dispersão em `E` → ±3,6% na deflexão. A margem do modelo é ±15–25%. O erro do `E` é **1/5 do ruído do próprio modelo** — invisível.

**Classificação:** **DEFAULT** — `E = 580 GPa` como constante do sistema, declarada. **Isto derruba uma das quatro travas do cálculo de deflexão de R6.**

> ⚠ Ressalva: 580 GPa vale para **fresa inteiriça de metal duro**. Não vale para haste de aço (≈210 GPa) nem para ferramenta com corpo de aço e pastilha — nesses casos o `E` que governa a deflexão é o do **corpo**, não o do gume. Se o catálogo vier a incluir fresa insertada ou barra de mandrilar de aço, `E` deixa de ser constante única e passa a ser propriedade da família de ferramenta. **Isso é lacuna declarada, não resolvida aqui.**

---

## 2d Revestimento — a variável principal, quantificada

**Veredito:** O ganho de revestimento é **real, maior que os 25% implementados, e seletivo por material da peça**. O modelo de fator único está errado — e em alumínio está errado de sinal, não de grau.
**Confiança:** CONSENSO quanto à seletividade · REFERÊNCIA ÚNICA quanto aos fatores numéricos por célula.

### 1. A razão 1,25 se sustenta?

**Não — está subestimada para AlTiN/TiAlN e superestimada para TiN.** Faixa real encontrada:

| Fonte | Revestimento | Fator sobre não revestido |
|---|---|---|
| Tabela de velocidade por material (6G Tools) | AlTiN | **1,33–1,43** (média 1,38) |
| Tabela de velocidade por material (6G Tools) | TiN | **1,20–1,22** |
| Dado citado de tabela Harvey/Helical (aço 1018) | revestido | 735 → 1.050 sfm = **1,43** |
| G-Wizard (default do calculador) | TiAlN | **1,20** — declarado pelo próprio autor como "conservador" |

**O 1,25 implementado é conservador**, não errado: fica entre o default do G-Wizard (1,20) e a média catalogada (1,38). Aplicá-lo custa **9% de velocidade deixada na mesa** em aço — dentro da margem do modelo.

### 2. O ganho é seletivo por material da peça? — **CONFIRMADO**

Esta é a resposta que invalida o fator único. A tabela abaixo é **medida, não inferida**: são valores de velocidade publicados lado a lado para a mesma ferramenta sem revestimento, com AlTiN e com TiN.

**Matriz revestimento × material da peça** *(fonte: 6G Tools, tabela de velocidades para fresa de metal duro; sfm; fator calculado por mim sobre a coluna "sem revestimento")*

| Material da peça | ISO | Sem revest. | AlTiN | fator | TiN | fator |
|---|---|---|---|---|---|---|
| Aço baixo carbono 1018 | P | 350 | 500 | **1,43** | 420 | **1,20** |
| Aço-liga 4140 | P | 250 | 350 | **1,40** | 300 | **1,20** |
| Aço ferramenta A2/D2/H13/P20 | P | 200 | 280 | **1,40** | 240 | **1,20** |
| Ferro fundido macio | K | 450 | 600 | **1,33** | 540 | **1,20** |
| Ferro fundido médio | K | 300 | 400 | **1,33** | 360 | **1,20** |
| Inox 304/316 | M | 180 | 250 | **1,39** | 220 | **1,22** |
| Titânio Ti6Al4V | S | 175 | 240 | **1,37** | 210 | **1,20** |
| Inconel 625/718 | S | 100 | 140 | **1,40** | 120 | **1,20** |
| **Alumínio** | **N** | **500** | **— não oferecido** | **—** | **— não oferecido** | **—** |

**A célula que decide o desenho do produto é a última.** A tabela **não traz valor** de AlTiN nem de TiN para alumínio — não porque o ganho seja pequeno, mas porque a combinação **não é oferecida**. A razão técnica está em várias fontes independentes: o alumínio do revestimento AlTiN/TiAlN tem **afinidade química com o alumínio da peça**, o que provoca adesão e gume postiço; a prática é **gume polido sem revestimento**, ou revestimento da família não-ferrosa (ZrN, DLC, TiB₂, diamante CVD). *(Practical Machinist — relatos convergentes de oficina; guias de revestimento Accu-Cut, OnlineSupply, Creatingway, Supsteed; Machining Doctor.)*

**Sensibilidade quantificada:** aplicar +25% de TiAlN em alumínio não é "ganho menor" — é **defeito de processo**: adesão de material no gume, acabamento arruinado, quebra prematura. O erro do fator único aqui é **qualitativo**, não percentual. É o único ponto desta rodada em que o modelo implementado pode produzir uma recomendação **fisicamente errada**, não apenas imprecisa.

**Dispersão dentro dos ferrosos:** AlTiN varia 1,33–1,43 (**±3,6%** em torno de 1,38) e TiN é praticamente constante em 1,20. Ou seja: **entre materiais ferrosos, o fator único é defensável** (a variação está muito abaixo de ±15%). A quebra é a fronteira ferroso / não-ferroso, não a gradação entre aços.

### 3. Qual a forma correta no modelo?

**Recomendo (i) — fator por par revestimento × material — implementado de modo que os pares inexistentes simplesmente não existam** (o que entrega (ii) de graça).

**Critério:** a evidência mostra dois regimes, não um contínuo. Dentro dos ferrosos a variação do fator é ±3,6% (irrelevante — poderia ser fator único). Na fronteira para o alumínio, a célula **não tem valor nenhum** porque a combinação não é fabricada. Um modelo que precisa representar "célula vazia" não é um modelo de fator médio; é uma matriz esparsa. Uma vez que se aceita a matriz, o fator por par sai sem custo adicional.

**Por que não (iii)** — "manter fator único com a premissa 'revestimento adequado ao material' declarada na tela": porque a premissa seria **falsa na prática mais comum do público-alvo**. O operador de oficina pequena usa a fresa TiAlN que tem na gaveta no alumínio — é justamente isso que as fontes de oficina relatam. Declarar uma premissa que o usuário viola rotineiramente é transferir a responsabilidade sem resolver o problema.

**Forma mínima aceitável, se a matriz completa for cara:** dois regimes — **ferroso: fator por revestimento (AlTiN 1,38 · TiN 1,20 · sem revestimento 1,00)**; **não-ferroso: revestimento ferroso indisponível ou com alerta, referência = sem revestimento**.

### 4. A lista alternativa não adotada tem fonte?

| Multiplicador da lista | Veredito | Evidência |
|---|---|---|
| TiAlN 1,40 | **CONFIRMADO** | bate com o medido (1,33–1,43) |
| AlCrN 1,30 | **PLAUSÍVEL, sem fonte numérica** | AlCrN é padrão acima de 45 HRC e para titânio/superliga; nenhuma fonte encontrada publica o multiplicador |
| TiN 1,10 | **BAIXO** | o medido é 1,20–1,22 |
| DLC 1,50 | **SEM FONTE** | nenhuma fonte quantifica DLC como multiplicador de Vc |
| PCD 2,00 | **SEM FONTE E PROVAVELMENTE BAIXO** | PCD em alumínio alcança **até 900 m/min** (Kennametal) contra 150–300 m/min típicos de metal duro — razão de **3× a 6×**, não 2,0 |

**Confirmo o alerta do prompt, e reforço:** PCD e DLC/diamante são **exclusivos de não-ferrosos**. Diamante reage quimicamente com o ferro em temperatura de corte — usar PCD em aço destrói a ferramenta. Aplicar 1,50 ou 2,00 como fator geral sobre qualquer material **não é imprecisão, é erro de destruição de ferramenta**. Se PCD entrar no catálogo, tem de entrar **restrito a ISO N e compósito**, sem exceção, e não como multiplicador sobre a mesma tabela base.

### 5. O revestimento muda só a velocidade?

**Muda velocidade e vida. Não muda `fz` na prática de catálogo.**

- **`fz`: evidência direta e limpa.** Na tabela do 6G Tools, a coluna de avanço por dente (IPT) é **a mesma** para sem revestimento, AlTiN e TiN dentro de cada material — só a velocidade muda. Ou seja: o catálogo trata `fz` como propriedade da **geometria e do material**, não do revestimento. Confiança: REFERÊNCIA ÚNICA, mas é uma evidência estrutural (a tabela foi construída assim, não é uma opinião).
- **Vida a velocidade constante:** ganho grande, mal quantificado. Faixas encontradas: **3–10×** revestido vs. não revestido (afirmação genérica de fornecedor de revestimento); **TiAlN dura 2–4× mais que TiN em inox**; AlCrN de nova geração **+30 a +40%** sobre a geração anterior (Oerlikon Balzers, teste em cliente). Confiança: SEM CONSENSO no número; CONSENSO na direção.

**Classificação do revestimento:** **MODELAR** — é o único fator desta rodada, além do tipo de substrato (HSS/MD), cujo efeito (**+20% a +43%** em Vc, e mudança qualitativa em alumínio) supera com folga a margem de ±15–25%.

---

## 2e Pastilha intercambiável — onde a premissa é mais frágil

**Veredito:** A formulação "assumir a classe adequada ao material selecionado" é **mais defensável que a média entre classes** — mas o fator **1,25** para ferramenta com pastilha **não encontrou sustentação**; a evidência disponível aponta para **≈1,00**.
**Confiança:** CONSENSO na parte normativa (ISO 513) · **NÃO ENCONTRADO** na dispersão de Vc entre classes · REFERÊNCIA ÚNICA (fraca) na razão inteiriça vs. pastilha.

### 1. A classe já vem casada com o material?

**Sim, por definição da norma.** A ISO 513 **é** um mapa material→classe: P aço, M inox, K ferro fundido, N não-ferroso, S superliga/titânio, H material endurecido. Quem vai fresar inox compra pastilha M. A cor da classe é impressa na embalagem e no catálogo. *(ISO 513; Coban Engineering; Seco; guias de classe de pastilha.)*

O argumento que salva a simplificação está, portanto, **correto na origem**: fixado o material da peça, o resto do catálogo de classes é irrelevante para aquela situação.

**Mas a norma tem uma segunda dimensão que a premissa não cobre:** dentro de cada letra há a graduação numérica (P10 acabamento → P25 uso geral → P40 desbaste; K10/K20/K30; M20/M30/M40), e ela **não é definida pelo material — é definida pela operação**. Isso é bom para o produto: o sistema já conhece o tipo de operação, então a segunda dimensão é derivável do que já está na tela, sem campo novo.

### 2. A formulação correta é "classe adequada", não "média entre classes"?

**Confirmo, e o motivo é aritmético.** A média entre P10, P25 e P40 produz um número que **não corresponde a nenhuma situação real** — nem ao acabamento, nem ao desbaste. Já "assumir a classe adequada ao material selecionado" produz um número que corresponde a **uma** situação real: a que o operador está de fato vivendo, se ele comprou a pastilha certa (o que a estrutura de catálogo do fabricante torna quase automático).

**Fator resultante:** **não foi possível entregá-lo com fonte.** As tabelas de Vc por grau que sustentariam esse número estão nos catálogos de aplicação dos fabricantes, que não foram acessíveis por busca web (a página de grau da Machining Doctor para GC4330, por exemplo, tem a tabela de Vc **vazia**). Registro como lacuna na Tabela C em vez de arbitrar.

### 3. A razão de Vc entre fresa inteiriça e ferramenta com pastilha sustenta 1,25?

**Não encontrei sustentação. O que encontrei aponta para paridade.**

| Ferramenta | Vc em aço | Fonte |
|---|---|---|
| Fresa inteiriça de metal duro | 500–600 sfm em rasgo (**152–183 m/min**); 750–1.000 sfm em HSM (**229–305 m/min**) | compilação de prática, Practical Machinist / Industrial Monitor |
| Fresa de faceamento com pastilha | 750–1.000 sfm (**229–305 m/min**) | idem |
| Faceamento com pastilha em AISI 4140 | 152 m/min (com fluido) · 213 m/min (a seco) · 260 m/min (grau melhorado) | exemplo de produção citado na mesma compilação |
| CoroMill 490 (pastilha), faceamento | 226 m/min | Sandvik Coromant / MSC |

As faixas **se sobrepõem**. A vantagem real da ferramenta com pastilha, segundo as fontes, não é velocidade — é **diâmetro maior, custo por aresta, profundidade de ombro e economia em Ø grande**. Não há evidência de que a mesma peça aceite +25% de velocidade por a ferramenta ser insertada.

**Sensibilidade quantificada:** manter 1,25 sem fonte significa recomendar velocidade **25% acima** do que os dados disponíveis sustentam — o que está **no limite superior da margem do modelo**, e na direção insegura. **Recomendo tratar o fator como 1,00 e declarar a lacuna**, até que se obtenha uma comparação pareada de catálogo (mesmo material, mesma operação, inteiriça vs. insertada).

> **Isto contradiz o valor implementado no sistema atual (1,25).** Digo com todas as letras, conforme pedido: o fator de 1,25 para pastilha revestida **não tem base encontrável**, e a evidência disponível aponta para paridade. É um valor no qual o erro empurra o operador para cima.

**Classificação da classe de pastilha:** **DEFAULT** — assume-se a classe ISO adequada ao material selecionado, declarada na tela; não vira campo.

---

## 2f Nomenclatura — o teste final de qualquer campo

**Veredito:** Só três atributos passam no teste da embalagem. O resto reprova.
**Confiança:** CONSENSO.

| Atributo | O operador lê na embalagem? | Evidência |
|---|---|---|
| Tipo de ferramenta (topo reto, toroidal, esférica, broca, macho…) | ✅ sim | designação comercial |
| Diâmetro, nº de cortes, comprimento útil | ✅ sim | impresso na haste e na caixa |
| **HSS · HSS-Co · metal duro** | ✅ sim | impresso ("HSS", "HSS-E", "Metal Duro", "Solid Carbide") |
| **Sigla do revestimento** (TiAlN, AlTiN, AlCrN, TiN, ZrN, DLC) | ✅ sim | impressa na embalagem; muitas vezes identificável pela cor |
| **Classe ISO 513 da pastilha** (P/M/K/N/S/H + cor) | ✅ sim | normativa, impressa e colorida |
| Teor de cobalto (%) | ❌ **não** | não publicado nem pelos fabricantes de ferramenta |
| Tamanho de grão (µm) | ❌ **não** | idem; no máximo "micrograin"/"submicron" como adjetivo comercial |
| Dureza HV do substrato | ❌ **não** | não publicada em ferramenta acabada |
| Módulo `E` | ❌ **não** | nunca publicado |
| Grau proprietário do fabricante (KC643M, H10F, GC4330…) | ⚠️ **lido, não interpretado** | está na embalagem, mas é intraduzível entre marcas sem tabela de equivalência |

**Conclusão do teste:** qualquer campo que exija %Co, grão ou HV **reprova** — o operador não tem como preenchê-lo com certeza, e um campo desses produziria número errado com aparência de precisão. **Isso confirma tecnicamente a decisão D6 de 15/08** (substrato embutido na identidade da ferramenta do catálogo, sem campo "material da ferramenta" na tela).

**Ressalva sobre o grau proprietário:** ele está na embalagem, mas exigi-lo obrigaria o sistema a manter tabela de equivalência entre marcas — trabalho permanente de catálogo, para um ganho que a §2a já mostrou estar abaixo da margem. Não compensa.

---

## 3 Veredito de modelagem

### Tabela B — Veredito de modelagem

| Fator | Dispersão real encontrada | Efeito no resultado | MODELAR / DEFAULT / IGNORAR | Se MODELAR: como o operador informa |
|---|---|---|---|---|
| **Família de substrato** (HSS · HSS-Co · MD) | fator 3–5× em Vc (0,20–0,33 HSS/MD); HSS-Co +25–30% sobre HSS | **−70% a −80% na Vc** ao trocar MD por HSS | **MODELAR** | está impresso na embalagem ("HSS" / "Metal Duro") — embutido no nome da entrada de catálogo |
| Substrato de fresa de MD (uso geral) | Co 9–12% · grão 0,4–0,8 µm · HV 1.580–1.890 · **E 558–598 GPa** | **±3,6% na deflexão**; nulo em Vc, fz, potência | **IGNORAR** como campo / **DEFAULT** como constante (`E = 580 GPa`) | — |
| Substrato de fresa p/ aço endurecido | grão 0,4 µm / 9% Co vs. 0,8 µm / 10% (HV +18%) | nulo no cálculo; quem manda é a dureza da peça | **DEFAULT** — entrada de catálogo própria | — |
| Substrato de microfresa (<1 mm) | grão ultrafino obrigatório → raio de gume 1–5 µm → **h_min = 0,17–0,33 × rε** | **piso de `fz` da ordem de 1 µm/dente**; abaixo dele o modelo de corte não vale | **MODELAR — como função de `D`**, não como campo | não informa; o sistema aplica o piso pela faixa de diâmetro |
| **Revestimento** | AlTiN **1,33–1,43** · TiN **1,20–1,22** · alumínio: **combinação não oferecida** | **+20% a +43% na Vc** em ferroso; **qualitativo** em alumínio | **MODELAR** | sigla impressa na embalagem (TiAlN/AlTiN/TiN/ZrN/DLC/sem revestimento) |
| Classe de pastilha (ISO 513) | classe determinada pelo material (norma); graduação P10→P40 determinada pela operação | não quantificado — **lacuna** | **DEFAULT** — assumir a classe adequada ao material, declarada na tela | — |
| Preparação de gume | rε 4→15 µm: **Fc +23%, Ff +56%**; rε 8→35 µm: vida maior em ferramenta revestida | relevante em força, **não observável pelo operador** | **IGNORAR** como campo (já embutido na ferramenta) | — |
| Ângulo de hélice (30/45/60°) | 30°: 25% axial / 75% radial · 45°: 50/50 · 60°: radial mínima | **redistribui** força entre axial e radial; nenhuma fonte quantifica efeito em Vc ou `fz` | **IGNORAR** no MVP — **lacuna declarada** | — |

### Pergunta de fechamento: quantos níveis de granularidade?

**Recomendo (ii) — metal duro com e sem revestimento como entradas separadas — com uma correção obrigatória: "revestimento" não é binário, é a sigla, e o fator dele depende do material da peça.**

**Critério, em três passos:**

1. **Elimina (iv) — grau específico por fabricante.** A §2a mostra que a dispersão que chega ao cálculo é ±3,6%, contra ±15–25% de margem do modelo. Modelar por grau é investir precisão num fator invisível, e a §2f mostra que o operador não conseguiria preencher o campo. Reprova nos dois testes.
2. **Elimina (iii) — por classe ISO 513.** Não porque a classe não importe, mas porque ela é **derivável do que o sistema já sabe**: a letra vem do material da peça, a graduação numérica vem do tipo de operação. Um campo para informar algo que o sistema já pode inferir é campo redundante — e redundância em tela de oficina vira erro de preenchimento.
3. **Elimina (i) — metal duro genérico com revestimento embutido.** Este é o único ponto em que discordo da simplificação máxima: o revestimento vale **+20% a +43%** de velocidade, o que está **acima da margem do modelo**, e em alumínio ele muda o resultado qualitativamente. Embutir isso numa constante joga fora o fator mais significativo que a rodada encontrou.

**Sobra (ii)**, na forma: **substrato = constante única** (metal duro, `E = 580 GPa`) · **família de substrato (HSS/HSS-Co/MD) = identidade da ferramenta no catálogo** · **revestimento = atributo explícito, com lista filtrada pelo material da peça e fator por par**.

### A decisão de 15/08 (substrato embutido no nome da ferramenta) se sustenta?

**Sustenta-se — com um ajuste de fronteira.**

**O que se confirma:** não existe campo "material da ferramenta" na tela; uma entrada de catálogo por variação real de mercado; combinação impossível deixa de ser representável (as células **X** da Tabela A). A §2f prova que essa é a única forma que passa no teste da embalagem.

**O ajuste:** a decisão embute **substrato** na identidade da ferramenta, o que está certo. Mas o **revestimento** não pode ficar só na identidade — ele precisa chegar ao **motor de cálculo**, porque o fator dele depende do **material da peça**, que não é propriedade da ferramenta. A fronteira limpa é:

> **O catálogo carrega a identidade** (tipo · substrato · revestimento · geometria). **O motor carrega o par** (revestimento × material da peça).

Sem isso, ou se perde o maior fator da rodada, ou se aplica +25% de TiAlN em alumínio.

### Ordem de grandeza — a premissa está quantitativamente confirmada?

**Sim, no que a rodada conseguiu medir; com uma ressalva sobre o que não conseguiu.**

**Confirmado:** a dispersão de substrato entre fabricantes é de **poucos por cento naquilo que entra no cálculo** (±3,6% em `E`, zero em Vc/fz/potência), enquanto os fatores de **parâmetro** medidos nesta mesma rodada movem o resultado em **20% a 400%** (revestimento +20–43%; família de substrato ×3–5; espessura mínima de cavaco em microfresa: a diferença entre cortar e não cortar). A relação de ordem que o Mestre supôs — **erro de parâmetro domina erro de substrato** — está **confirmada por cerca de uma ordem de grandeza**. O sistema deve investir precisão em parâmetro, não em catálogo de substrato.

**A ressalva, dita com todas as letras:** eu **não** consegui medir o efeito do substrato sobre a **vida da ferramenta** — que é onde a literatura diz que o substrato de fato atua (grão fino → menos desgaste de flanco; mais cobalto → menos resistência ao desgaste). A premissa foi confirmada **para o cálculo de parâmetro**, que é o escopo declarado do produto. Ela **não** foi testada como afirmação metalúrgica geral, e não deve ser citada como tal.

**E duas coisas que a rodada derrubou, contra o esperado:**

1. **Fresa de HSS não é obsoleta** (contradiz D1) — é residual em CNC e corrente em máquina convencional, manutenção e ferramentaria, inclusive no Brasil.
2. **O fator 1,25 de pastilha não tem fonte** e a evidência aponta para paridade de Vc com fresa inteiriça. Esse valor está no sistema empurrando o operador para cima.

---

## Tabela C — O que continua sem base

| # | Item | O que faltou | O que seria preciso para fechar |
|---|---|---|---|
| C1 | Composição de substrato dos fabricantes pedidos (Sandvik, Kennametal, Iscar, Seco, Walter, Mitsubishi, OSG, Guhring) | **Nenhum publica %Co nem grão de fresa inteiriça.** Toda a §2a apoia-se em fornecedores de bastão/blank (Centennial, ZCC via Langsun, MeetYou) e em um fabricante asiático especializado | Ficha técnica de grau (não de produto) obtida via representante, ou catálogo impresso de metal duro do fabricante |
| C2 | Efeito do substrato sobre **Vc** em % | Nenhuma fonte expressa Vc em função de %Co ou de grão. O efeito documentado é sobre **vida/desgaste**, não sobre velocidade recomendada | Ensaio pareado publicado, ou tabela de Vc por grau do mesmo fabricante com composição declarada |
| C3 | Fator inteiriça × pastilha (o **1,25** do sistema) | Faixas de Vc se sobrepõem (152–305 vs. 229–305 m/min); fontes são compilações de prática, não catálogo | Comparação pareada de catálogo: mesmo material, mesma operação, mesma profundidade, fresa inteiriça vs. insertada |
| C4 | Dispersão de Vc **entre classes ISO 513** para o mesmo material | A tabela de Vc por grau da fonte consultada está **vazia**; os dados vivem nos catálogos de aplicação dos fabricantes | Catálogo de aplicação (Sandvik/Kennametal/Seco) com Vc por grau e por material |
| C5 | Fator de **AlCrN, DLC, TiB₂, ZrN e diamante/PCD** | Só AlTiN e TiN têm fator medido. DLC 1,50 e PCD 2,00 da lista alternativa **não têm fonte**; PCD em alumínio sugere 3–6×, não 2,0 | Tabela de velocidade do mesmo fornecedor cobrindo essas famílias, com a coluna "sem revestimento" como referência |
| C6 | Razão **HSS ÷ metal duro** em fresamento | Fontes divergem por fator 2–5 (0,10 a 0,50). O 0,29 implementado é defensável, mas nenhuma fonte o produz sozinha | Tabela de fresamento do Machinery's Handbook (seção "Cutting Speeds and Feeds", milling) com as duas colunas lado a lado |
| C7 | **Ângulo de hélice** — efeito em Vc/`fz` | Só encontrei a divisão de forças (30°: 25/75 axial-radial; 45°: 50/50) e recomendações qualitativas. Nenhum % sobre velocidade ou avanço | Estudo com força e vida medidas variando só a hélice, ou tabela de fabricante com `fz` por hélice |
| C8 | `E` de ferramenta com **corpo de aço** (insertada, barra de mandrilar) | `E = 580 GPa` vale para inteiriça de MD. Se o catálogo incluir corpo de aço, quem governa a deflexão é o corpo (≈210 GPa) | Definir no escopo se ferramenta de corpo de aço entra no MVP; se entrar, `E` vira propriedade da família, não constante |
| C9 | Piso de `fz` em microfresa | Tenho `h_min = 0,17–0,33 × rε` (bem sustentado) mas **não tenho `rε` por diâmetro comercial** — só "alguns micrômetros" | Catálogo de microfresa que publique raio de gume, ou medição. **Cruza com R1** (piso de Ø0,5 mm) |

---

## Fontes

**Composição e propriedade de metal duro**
- Centennial Carbide — tabela de graus de blank (C-2 6% / 1,2 µm; micrograin 10% / 0,8 µm; ultra-micrograin 12% / 0,4 µm) — https://centennialcarbide.com/carbide-grades/
- MeetYou Carbide — tabela de graus de bastão com Co%, grão, HV30, HRA, TRS e módulo (MT06U · MT09U · MT10S · MT12S · MT20.8 · MT25S) — https://www.meetyoucarbide.com/tungsten-carbide-rods/
- Langsun Carbide — comparativo 6% / 10% / 12% Co com dados ZCC (YF06 · YL10.2 · XF30) — https://www.langsuncarbide.com/news/6-vs-10-vs-12-cobalt-in-carbide-rods-what-is-the-impact-on-performance/
- Advanced Tool — substrato de fresa, efeito do cobalto em tenacidade e dureza — https://advancedtool.com/understanding-end-mill-substrates/
- "The Influence of the Cobalt Content on the Strength Properties of Tungsten Carbide Ceramics under Dynamic Loads" — lei `E = 695 − 11·%Co`; WC-10Co = 585 GPa — ResearchGate
- "Cemented carbide microstructures: a review", *International Journal of Refractory Metals and Hard Materials* (ScienceDirect) — dependência de propriedades com grão e cobalto
- Sandvik H10F — descrição de grau extra-fino/submicron para ferramenta rotativa — MatWeb / Sandvik Coromant
- Ceratizit CF-H40S — 12% binder, HV30 1.380, TRS 3.200 MPa (grau de molde, não de fresa; usado só como referência de faixa)

**Fresa para aço endurecido e microfresa**
- Dohre HEX ball nose HRC60–68 — grão ultrafino 0,4 µm, 9% Co — https://www.dohrecnc.com/product/hex-ball-nose-end-mills.html
- ZHY Tool — fresas HRC60–68, 0,4 µm / 9% Co — https://zhytool.com/end-mills-for-hardened-steel/
- "Determination of minimum uncut chip thickness and size effects in micro-milling", *IJAMT* (Springer) — h_min ≈ 0,17·rε
- "Experimental Study on the Minimum Undeformed Chip Thickness Based on Effective Rake Angle in Micro Milling" (PMC/MDPI) — h/rε 0,25–0,33; MUCT 0,75–1,0 µm
- "Cutting Edge Preparation of Micro Milling Tools" (ScienceDirect/Procedia CIRP) — grão limita o raio de gume obtenível
- "Sharpening mechanism of extremely sharp edges for diamond micro mills" (ScienceDirect) — rε 0,2 µm em PCD vs. 1–5 µm em metal duro
- SAMHO — tecnologia de microfresa, grão ultrafino — https://samhotool.com/blog/micro-diameter-end-mills-and-their-technology/

**Velocidade, revestimento e matriz por material**
- 6G Tools — tabela de velocidade por material com colunas sem revestimento / AlTiN / TiN e IPT — https://www.6gtools.com/technical-info/end-mills/feeds-and-speeds-carbide.html
- CNCCookbook — "Solid Carbide End Mill Coatings, Grades, Geometries" — G-Wizard default +20% TiAlN; tabela de temperatura por revestimento; hélice 35°/38°
- Tormach — graus, geometrias e revestimentos de fresa inteiriça
- Harvey Performance / Helical — "Attacking Aluminum: a Machining Guide"; "Speeds and Feeds 101"
- Practical Machinist — aço 1018 sem revestimento 735 sfm vs. revestido 1.050 sfm; relatos de TiAlN em alumínio
- Oerlikon Balzers — BALINIT ALCRONA EVO (+30–40% de vida sobre a geração anterior); BALINIT ALDURA (aço 60 HRC)
- Machining Doctor — alumínio: metal duro sem revestimento é a melhor opção na maioria dos casos; ZrN/DLC/TiB₂ como alternativas
- Accu-Cut, OnlineSupply.ca, Creatingway, Supsteed — seleção de revestimento para alumínio (ZrN, DLC, CrN; contraindicação de TiAlN)
- Market-Prospects; AIMS Industrial — comparativo de revestimentos, ganho de vida 3–10×, TiAlN 2–4× sobre TiN em inox

**HSS × metal duro, e matriz tipo × substrato**
- LittleMachineShop — tabela de velocidade HSS vs. metal duro por material (derivada de Machinery's Handbook) — https://littlemachineshop.com/reference/cuttingspeeds.php
- Etant Donnés — tabela de velocidade com regra "para metal duro, dobre" — https://www.etantdonnes.com/MACHINE/TABLES/cuttingSpeeds.html
- MSC BetterMRO — "Drill, Ream or Bore: High-Speed Steel vs. Carbide Tooling" — HSS ≥4× mais lento; onde HSS ainda cabe
- AIMS Industrial — "Carbide vs HSS End Mill"; guia de velocidades de broca
- Cutting Tool Engineering — "A tale of two cutting tools: solid and indexable-insert drills" — broca inteiriça 3–20 mm
- Cutwel; Ceratizit; TillTools — U-drill / broca insertada Ø12–65 mm; ponto de troca em 12 mm
- Jarvis Cutting Tools; Great Magtech; Jimmy Tool — macho HSS-E vs. metal duro; 2–3× velocidade, 3–10× vida, custo 15–60 vs. 2–15 USD
- Jaco Tools; Coinch Tools; Slugger Tools; Zhonghuan — graus M2 / M35 / M42; M42 +25–30% sobre M2 em inox
- Hannibal Carbide; Kennametal — alargador e barra de mandrilar; metal duro suporta 7–8×D contra 3–4×D do aço
- Kennametal (KYS40 EADE); OSG; BSQ Tech — fresa cerâmica para Inconel, até 5× vida
- Harvey Tool; CoreHog — fresa PCD para não-ferroso e compósito
- Kennametal — PCD em alumínio até 900 m/min
- Karnasch; Regal Cutting Tools; 2L Inc.; MariTool — fresa de rosca: oferta corrente é metal duro inteiriço
- Hoko Ferramentas; Ferramentas Gerais; Loja das Fresas; Politone — prática brasileira: fresa HSS em fresadora convencional, ferramentaria e manutenção; vantagem é tenacidade, não velocidade
- Verified Market Reports / The Insight Partners — metal duro inteiriço 32,4% do mercado de fresas de topo (2023); HSS como segmento ativo

**Norma e classe de pastilha**
- ISO 513 — classificação P/M/K/N/S/H
- Coban Engineering — DIN/ISO 513 e VDI 3323, grupos de material
- Seco Tools — "Cast Iron / ISO K"; Sandvik Coromant — graus de fresamento para aço (GC4330/GC4340), CoroMill 490 a 226 m/min
- Guias de classe de pastilha (cuttinginsert.com; carbide-products) — graduação P10→P40, K10→K30, M20→M40

**Preparação de gume e hélice**
- "Influence of edge hone radius on cutting forces… hard milling of AISI H13" (*IJAMT*, Springer) — rε 4→15 µm: Fc +23%, Ff +56%
- "Influence of cutting-edge radius by an edge-honing process on the cutting tool life and coating" (*JMST*, Springer) — rε 8–35 µm em ferramenta revestida
- Autodesk Fusion blog; CADEM; MoreSuperHard — divisão axial/radial da força por ângulo de hélice (30°: 25/75; 45°: 50/50)

---

**Fim do retorno B.** Divergências entre este retorno e o retorno A devem ser resolvidas por fonte vencedora declarada, por faixa, ou por lacuna — nunca por média (regra do confronto, HANDOFF §5).
