# RESPOSTA R3-B — Ferramentas, Substratos e Revestimentos

**Território de fonte deste pesquisador:** catálogo técnico, datasheet, folheto de produto, manual de aplicação e tabela de recomendação de corte **publicados pelo próprio fabricante de ferramenta de corte** (Sandvik Coromant, Kennametal, Iscar, Seco, Walter, Mitsubishi, OSG, Guhring, Harvey Tool, Helical, Dormer Pramet, Emuge-Franken, Kyocera, Sumitomo, Tungaloy, YG-1).

**Fora do território (vira LACUNA declarada, nunca número preenchido):** norma ISO/DIN/ANSI/ABNT como fonte do dado, handbook de engenharia, artigo academico, livro-texto, blog, forum, distribuidor, e-commerce, calculadora de terceiro.

**Status:** concluido — Questoes 1, 2 e 3 respondidas, com secao final de lacunas declaradas.

---

## BLOCO DE APURAÇÃO 1 — Revestimentos: tabela de fabricante (alimenta Q2d)

**Fonte primária:** Harvey Tool (Harvey Performance Company), página técnica *"Tool Coatings"* — harveytool.com/resources/tool-coatings (consultada 18/08/2026).
URL: https://www.harveytool.com/resources/tool-coatings

Tabela reproduzida do fabricante (dureza em HV 0,05; temperatura máxima de trabalho em °F; µ = coeficiente de atrito):

| Revestimento (código Harvey) | Dureza HV0,05 | T máx (°F / °C aprox.) | µ | Materiais RECOMENDADOS pelo fabricante | Materiais que o fabricante marca como NÃO recomendados |
|---|---|---|---|---|---|
| TiN (C1) | 2.447 | 1.000 °F / ~540 °C | 0,40 | ferrosos de uso geral | — |
| Ti Nano (C10) | 4.487 | 2.192 °F / ~1.200 °C | 0,35 | Inconel, superligas, aços endurecidos, inox, titânio | — |
| AlTiN (C3) | 3.589 | 1.400 °F / ~760 °C | 0,70 | aço liga, inox, aço ferramenta, titânio, Inconel, níquel | **alumínio e ligas de alumínio** |
| AlTiN Nano (C6) | 4.181 | 2.100 °F / ~1.150 °C | 0,40 | aço endurecido, inox endurecido, ligas de níquel, aço ferramenta, titânio, Inconel | **alumínio e ligas de alumínio** |
| Ti Hard Nano (C12) | 3.477 | 2.012 °F / ~1.100 °C | 0,35 | aço endurecido, inox, titânio, ferro fundido | — |
| ZrN (C7) | 2.243 | 1.100 °F / ~590 °C | 0,40 | não-ferrosos abrasivos (latão, bronze, cobre, alumínio abrasivo) | — |
| TiB2 (C8) | 2.804 | 900 °F / ~480 °C | 0,35 | ligas de alumínio, ligas de magnésio | alumínio/magnésio das variedades abrasivas |
| Diamante amorfo / DLC (C4) | 7.954–8.973 | 750 °F / ~400 °C | 0,10 | plásticos abrasivos, grafite, fibra de carbono, compósitos, alumínio, cobre, latão, bronze | **aplicações ferrosas** (limiar de temperatura baixo) |
| Diamante CVD 4 µm | 8.973–9.993 | 1.100 °F / ~590 °C | 0,05–0,30 | grafite, compósitos, metal duro verde, cerâmica verde | **aplicações ferrosas** |
| Diamante CVD 9 µm | 8.973–9.993 | 1.100 °F / ~590 °C | 0,05–0,30 | idem, camada ~5× mais espessa que o diamante amorfo | **aplicações ferrosas** |
| PCD (diamante policristalino) | 8.973–9.993 | 1.100 °F / ~590 °C | 0,05–0,20 | plásticos abrasivos, grafite, fibra de carbono, compósitos, alumínio, cobre, latão, bronze | **aplicações ferrosas** |

**Leitura direta do dado (não é inferência minha, está escrito na página do fabricante):**
- AlTiN e AlTiN Nano — os dois revestimentos "de aço" — são explicitamente **contraindicados em alumínio** pelo próprio fabricante.
- Diamante (DLC, CVD, PCD) é explicitamente **contraindicado em ferrosos**.
- Portanto **revestimento não é ganho universal**: o mesmo revestimento que sobe a performance em aço é desaconselhado em alumínio, e vice-versa. Isso ataca frontalmente a forma "fator único de +25% para revestido".
- **O que esta página NÃO traz:** nenhum número de ganho percentual de velocidade ou de avanço por revestimento. O fabricante publica dureza, temperatura e atrito — não publica multiplicador de `Vc`. Registrar como limitação desta fonte.

**Confiança deste bloco:** `REFERÊNCIA ÚNICA` para os valores numéricos de dureza/temperatura (uma tabela, um fabricante). A afirmação qualitativa "AlTiN não serve para alumínio / diamante não serve para ferroso" será cruzada com outros fabricantes abaixo antes de subir para CONSENSO.

---

## BLOCO DE APURAÇÃO 2 — Dados de corte de catálogo, fresa inteiriça de metal duro (alimenta Q1d, Q2d, Q2e)

**Fonte:** ISCAR, catálogo *"Milling With ISCAR — Solid Carbide Endmills"* (publicação eletrônica, iscar.com).
URL: https://www.iscar.com/Catalogs/Publication/english_1/Flash_Solid_catalog/Flash_Solid_catalog.pdf
Grau usado nas tabelas P/M/K/S/H: **IC900** — descrito pelo próprio catálogo como *"a tough submicron PVD AlTiN coated grade"* (substrato submicron, revestimento AlTiN por PVD).
Grau usado na tabela N (não-ferrosos): **IC08** (sem revestimento) e **IC08 Coated**.

Colunas do catálogo: **General Machining** (ae 40% até rasgo cheio, ap 1×D) · **Trochoidal/dyn.** (ae 10–20%, ap = comprimento de corte) · **Roughing** (ae 20–35%, ap 2×D). Uso a coluna *General Machining* como referência.

| ISO | Material (grupo do catálogo) | Vc geral (m/min) | Vc trocoidal | Vc desbaste |
|---|---|---|---|---|
| P | Não ligado, gr. 1–4 | **200** | 360 | 260 |
| P | Não ligado, gr. 5 | 180 | 325 | 235 |
| P | Baixa liga, gr. 6–7 | 140 | 260 | 190 |
| P | Baixa liga, gr. 8–9 | 130 | 235 | 170 |
| P | Alta liga / aço ferramenta, gr. 10 | 110 | 200 | 150 |
| P | Alta liga / aço ferramenta, gr. 11 | 100 | 180 | 130 |
| P | Ferrítico–martensítico, gr. 12 | 110 | 200 | 145 |
| P | gr. 13 | 70 | 125 | 105 |
| K | Ferro fundido cinzento, gr. 15–16 | 250 | 450 | 325 |
| K | Ferro nodular, gr. 17–18 | 200 | 360 | 260 |
| M | Inox austenítico, gr. 14.1 | 80 | 150 | 110 |
| M | PH, gr. 14.2 | 70 | 120 | 90 |
| M | Duplex, gr. 14.3 | 60 | 100 | 65 |
| M | Aço fundido resistente ao calor Ni>20%, gr. 14.4 | 75 | 130 | 90 |
| S | Ligas de Ni, gr. 33–35 | 27 | 49 | 35 |
| S | Ti e ligas de Ti, gr. 36–37 | 45 | 81 | 59 |
| H | 44–48 HRC, gr. 38–41 | 80 | 144 | 104 |
| H | até 57 HRC | **não oferecido (–)** | – | – |
| H | até 62 HRC | **não oferecido (–)** | – | – |

### O dado mais importante desta tabela: N (não-ferrosos), sem revestimento × com revestimento

| Material | IC08 **sem revestimento** — Vc geral | IC08 **revestido** — Vc geral | Razão revestido/sem |
|---|---|---|---|
| Liga de alumínio forjada (gr. 21–22) | **400** | **não oferecido (–)** | — |
| Alumínio fundido Si>10% (gr. 23–25) | 180 | 250 | **1,39** |
| Ligas de cobre (gr. 26–27) | 300 | **não oferecido (–)** | — |
| Cobre eletrolítico E-Cu (gr. 28) | 150 | **não oferecido (–)** | — |
| Não-ferrosos (gr. 29–30) | – | – | — |

**Consequências diretas para o produto:**
1. Em **alumínio forjado** (o caso mais comum de oficina) e em **cobre/latão**, o fabricante **nem oferece versão revestida** — a linha da tabela é traço. Aplicar "+25% porque é revestida" nesse material é aplicar um fator a uma ferramenta que não existe no catálogo.
2. Em **alumínio fundido de alto silício** (abrasivo), o revestido ganha **+39%**, não +25%.
3. A fresa inteiriça de uso geral do catálogo **para em 48 HRC**. Acima disso o próprio fabricante marca traço — ou seja, aço endurecido exige outra ferramenta, não outro parâmetro (evidência a favor de resolver a exceção no catálogo, e não no motor de cálculo).
4. A dispersão de `Vc` **por material de peça** dentro do MESMO grau (IC900) vai de **27 m/min (liga de Ni) a 250 m/min (ferro fundido cinzento) — fator 9,3×**. Guardar este número: ele é a régua contra a qual toda variação de substrato/revestimento tem de ser comparada.

**Confiança:** `REFERÊNCIA ÚNICA` (um fabricante, um catálogo) para os valores absolutos; a razão revestido/sem-revestimento em alumínio abrasivo (1,39) precisa de confirmação em outro fabricante antes de virar CONSENSO.

**Grau ISCAR com composição publicada** (mesma fonte, *ISCAR Grade Chart*, https://www.iscar.com/ecat/iscar_grade_chart.pdf):
- **IC903** — *"Ultra-fine grain carbide with 12% cobalt, TiAlN PVD coated"*, classes ISO H01–H10 / P05–P15 / M10–M20 / S10–S20, até 62 HRC.
- **IC900** — *"tough submicron substrate, PVD TiAlN"*, classes ISO P15–P40 / M20–M30 / K05–K25 / S15–S25 / H10–H25.
- Observação de nomenclatura: o fabricante publica **classe ISO 513 por grau** (P15–P40 etc.) — dado que aparece na embalagem/no catálogo e que o operador consegue ler. Já **teor de cobalto e tamanho de grão só aparecem em texto descritivo, e apenas em alguns graus**.

---

# QUESTÃO 1 — Matriz de combinações reais: o que existe em catálogo

**Veredito:** Em **fresamento**, metal duro inteiriço é o padrão de mercado e o aço rápido sobreviveu apenas na forma **HSS-E / HSS-Co / HSS-PM** — não encontrei linha de fresa de aço rápido *simples, sem cobalto*, em catálogo de nenhum fabricante que consultei. Em **furação e roscamento**, o aço rápido ao cobalto continua padrão de mercado, dividindo espaço com o metal duro.
**Confiança:** `CONSENSO` para a existência/inexistência das linhas (verificado em Dormer Pramet, OSG, Guhring, ISCAR, Kennametal, Walter). `SEM CONSENSO` para as razões numéricas de velocidade (item d).

## Tabela A — Matriz tipo de ferramenta × substrato

Legenda: **PADRÃO** = padrão de mercado · **NICHO** = existe em catálogo, linha secundária · **NÃO ENCONTRADO** = não achei em catálogo · **N/V** = não verificado no meu território nesta rodada (entra nas lacunas).

| Tipo de ferramenta | HSS (sem Co) | HSS-Co / HSS-E / HSS-PM | Metal duro inteiriço | Pastilha intercambiável | Cerâmica / CBN / PCD |
|---|---|---|---|---|---|
| **Fresa de topo reto** | NÃO ENCONTRADO | **NICHO** — Dormer Pramet mantém a família "HSS-E (PM) endmills" (canal, desbaste/HFC, semiacabamento); OSG mantém "Standard 4Fl e 6Fl HSS-Co" com dados de corte publicados | **PADRÃO** — ISCAR, Kennametal, Guhring, Dormer Pramet | **PADRÃO em diâmetro grande** (fresa de topo/faceamento com pastilha); N/V no detalhe | **NICHO** — cerâmica para superligas (Emuge), CBN para endurecido (Sumitomo SUMIBORON), PCD para não-ferroso (Harvey Tool) |
| **Fresa toroidal (raio de canto)** | NÃO ENCONTRADO | N/V | **PADRÃO** — catálogo ISCAR de fresa inteiriça traz a coluna RE (raio de canto) | N/V | N/V |
| **Fresa esférica (ball nose)** | NÃO ENCONTRADO | N/V | **PADRÃO** — Guhring (catálogo de fresamento), OSG (Carbide Taper Ball End Mills) | N/V | **NICHO** — ball nose de CBN para aço endurecido (Sumitomo SUMIBORON) |
| **Broca helicoidal** | **PADRÃO** — linhas HSS de catálogo geral (Guhring, OSG, Dormer); N/V no detalhe de item | **PADRÃO** — Guhring, OSG, Dormer | **PADRÃO** — Guhring "Carbide Drills", RT 100 / FT 200 U com nano-FIREX, 5xD a 12xD | não se aplica (vira U-drill) | **NICHO** — ponta de PCD para compósito; N/V |
| **Broca insertada / U-drill** | NÃO EXISTE | NÃO EXISTE | corpo de aço + **cabeça intercambiável de metal duro** — **PADRÃO** (ISCAR SUMOCHAM até 12xD) | **PADRÃO** — Sandvik Coromant "Indexable insert drills", Kennametal "Indexable Drilling", Seco Perfomax | N/V |
| **Macho de máquina** | **NICHO** (macho HSS simples de baixo custo); N/V | **PADRÃO** — Walter "HSS-E (-PM) machine taps"; Guhring série 4393 HSS-E com TiN | **NICHO** — Walter publica chave de designação conjunta "HSS-E (-PM) **and Solid carbide taps**", confirmando linha de macho de metal duro | NÃO EXISTE (macho de máquina padrão) | NÃO ENCONTRADO |
| **Fresa de rosca** | NÃO ENCONTRADO | N/V | **PADRÃO** — tratada dentro do compêndio de roscamento da Walter | **NICHO / PADRÃO em diâmetro grande**; N/V | NÃO ENCONTRADO |
| **Alargador** | N/V | **PADRÃO** — Guhring "Reamers, 1,90 a 76,00 mm" | **PADRÃO** — Kennametal KenReam (KRS102 a KRS105) e RMS | **NICHO** — ISCAR Index H-Ream (pastilha única com pastilhas-guia), Seco Bifix (lâmina intercambiável) | NÃO ENCONTRADO |
| **Barra de mandrilar** | N/V | N/V | **NICHO, vira padrão em balanço longo** — haste de metal duro para reduzir deflexão (Kennametal, "Boring Bar Basics") | **PADRÃO** — sistemas de mandrilamento com pastilha (Kennametal, Sandvik) | NÃO ENCONTRADO |

**Fontes da matriz** (páginas específicas, consultadas 18/08/2026):
- Dormer Pramet — família *HSS-E (PM) endmills*: https://www.dormerpramet.com/c/7687 · *Carbide endmills*: https://www.dormerpramet.com/uk-ie/en/c/7691 · itens vivos: https://www.dormerpramet.com/Solid-milling/Roughing---HFC/Endmill-roughing-HSS-E--PM-/C492/C49220-0/p/5984953 e https://www.dormerpramet.com/Solid-milling/Slotting/HSS-E--PM--endmills/2-flute/C167/C1676-0/p/5984425
- OSG — *Tech Pg. Standard 4Fl e 6FL HSS-Co*: https://osgtool.com/content/literature/8002024CA/Tech%20Pg.%20Standard%204Fl%20&%206FL%20HSS-Co.pdf
- OSG do Brasil — *Carbide Taper Ball End Mills*: https://osg.com.br/pdf/fresas/Carbide-Taper-Ball-End-Mills.pdf · *Fresas AE-VM*: https://osg.com.br/docs/catalogos/folheto_fresas_AE-VM/web/resources/_pdfs_/Fresas_AE-VM__.pdf · *Condições de corte*: https://osg.com.br/pdf/informacoes-tecnicas/01_CondicaoDeCorte.pdf
- ISCAR — *Milling With ISCAR / Solid Carbide Endmills*: https://www.iscar.com/Catalogs/Publication/english_1/Flash_Solid_catalog/Flash_Solid_catalog.pdf · *Solid carbide endmills*: https://www.iscar.com/en-hq/products/milling/solid-carbide-endmills · *SUMOCHAM 12xD*: https://www.iscar.com/newarticles.aspx/lang/en/newarticleid/2884 · *Index H-Ream*: https://www.iscar.com/en-hq/products/hole-making/reaming/index-h-ream · *CBN, PCD e cerâmica*: https://www.iscar.com/Catalogs/Publication/english_1/CBN_PCD_CERAMIC_catalog_71/flipview_CBN_PCD_CERAMIC/index.html · *Grade chart*: https://www.iscar.com/ecat/iscar_grade_chart.pdf
- Guhring — *Carbide Drills*: https://guhring.com/BrowseProducts/Products/Carbide-Drills · *Reamers*: https://guhring.com/BrowseProducts/Products/Reamers · *macho HSS-E série 4393*: https://guhring.com/ProductsServices/SeriesDetails?Series=4393 · *catálogo de fresamento*: https://guhring.com/media/catalogs/oeifttli335.pdf
- Kennametal — *Indexable Drilling Systems*: https://www.kennametal.com/us/en/products/metalworking-tools/holemaking/indexable-drilling.html · *Solid Carbide Reaming (KenReam)*: https://www.kennametal.com/us/en/products/metalworking-tools/holemaking/precision-hole-finishing/reaming/solid-reaming.html · *Reaming Tool Basics* (guia técnico do fabricante): https://www.kennametal.com/us/en/resources/blog/metal-cutting/reaming-tool-basics.html · *Boring Bar Basics*: https://www.kennametal.com/nl/en/resources/blog/metal-cutting/the-basics-of-boring.html · *High-Performance Solid Carbide End Mills*: https://www.kennametal.com/us/en/products/metalworking-tools/milling/solid-end-milling/high-performance-solid-carbide-end-mills.html
- Sandvik Coromant — *Indexable insert drills*: https://www.sandvik.coromant.com/en-us/tools/drilling-tools/indexable-drills · *Cutting tool materials*: https://www.sandvik.coromant.com/en-us/knowledge/materials/cutting-tool-materials
- Seco Tools — *Indexable insert drills*: https://www.secotools.com/article/indexable_insert_drills?language=en · *Reaming (Bifix)*: https://www.secotools.com/article/m_7140 · *Advanced cutting materials CBN PCD cerâmica*: https://www.secotools.com/article/m_6972
- Walter — *HSS-E (-PM) machine taps*: https://shop.walter-tools.com/en/walter-hss-e-pm-machine-taps-prototype-tools-standard · *chave de designação HSS-E (-PM) e machos de metal duro*: https://cdn.walter-tools.com/files/sitecollectiondocuments/technicalinformation/en-gb/threading-hss-e-pm-solid-carbide-taps-designation-key-en-gb.pdf
- Sumitomo Electric Hardmetal — *Endmills*, inclui SUMIBORON CBN: https://www.sumitool.com/en/products/cutting-tools/endmills/ · *CBN/PCD*: https://www.sumitool.com/en/products/cutting-tools/cbn-pcd/
- Emuge — *fresa de cerâmica para superligas*: https://blog.emuge.com/hrsuperalloys
- Harvey Tool — *Tool Coatings* (PCD e diamante para não-ferroso): https://www.harveytool.com/resources/tool-coatings

---

## 1a) Fresa de aço rápido é obsoleta?

**Veredito:** **Refutado como "obsoleta", confirmado como nicho — e o rótulo do sistema está errado.** O que sobreviveu em catálogo não é HSS simples: é **HSS-E / HSS-Co / HSS-PM**. Não encontrei linha de fresa de topo em **HSS comum sem cobalto** em nenhum catálogo consultado.
**Confiança:** `CONSENSO` — dois fabricantes independentes mantêm a linha viva (Dormer Pramet e OSG).

**Onde a linha vive, segundo o próprio catálogo:**
- Dormer Pramet mantém famílias inteiras HSS-E (PM) para **canal, desbaste/HFC e semiacabamento** — não é item de fim de linha, é família com vários diâmetros e vários números de cortes.
- OSG mantém HSS-Co de 4 e 6 cortes com tabela de dados de corte publicada.
- O nicho declarado por fabricante: Kennametal, no guia de alargamento, escreve que **HSS serve para materiais mais moles como alumínio e plástico e para séries limitadas onde a vida da ferramenta importa menos**.
- **Não encontrei em catálogo** a justificativa "máquina sem rotação suficiente". Isso é `LACUNA` — fabricante nenhum publica essa recomendação nas páginas que abri.

**Consequência de produto:** a combinação existe, mas ela é **HSS-Co**. Oferecer "HSS" e "HSS-Co" como duas entradas separadas representa, na primeira, uma fresa que não achei à venda.

---

## 1b) Broca: aço rápido continua padrão de mercado?

**Veredito:** **Sim, continua padrão**, coexistindo com metal duro no mesmo catálogo — não substituído.
**Confiança:** `CONSENSO` (Guhring, OSG e Dormer mantêm, em paralelo, linhas completas de broca HSS/HSS-Co e de broca de metal duro).

**Divisão prática por diâmetro e por material usinado:** `LACUNA parcial`. Os catálogos **listam as duas linhas mas não publicam uma regra do tipo "abaixo de X mm use metal duro"**. O que o catálogo deixa ver, sem inventar número:
- Metal duro domina onde há **furo profundo com refrigeração interna e alta produtividade** — Guhring RT 100 / FT 200 U em 5xD, 8xD e 12xD com nano-FIREX.
- Aço rápido domina onde há **reafiação**: o texto técnico da OSG do Brasil dimensiona o comprimento de canal somando explicitamente um "comprimento para reafiação", conceito que só existe em broca reafiável.
- Em diâmetros grandes o formato dominante deixa de ser broca inteiriça e passa a ser **broca com pastilha ou com cabeça intercambiável** (Sandvik indexable drills, ISCAR SUMOCHAM, Seco Perfomax) — **a faixa exata de diâmetro não está publicada** nas páginas que consultei.

---

## 1c) Macho de máquina: qual o substrato padrão hoje?

**Veredito:** **HSS-E / HSS-PM é o padrão de mercado; metal duro é linha secundária.** A divisão corte × conformação **muda a resposta**: o macho de conformação aparece em catálogo predominantemente em HSS e HSS-E.
**Confiança:** `REFERÊNCIA ÚNICA tendendo a CONSENSO` — Walter, Guhring e YG-1 apontam na mesma direção, mas só a Walter publica a chave de designação que trata as duas famílias juntas.

- Walter comercializa **"HSS-E (-PM) machine taps"** como linha padrão e publica uma **chave de designação única para "HSS-E (-PM) and Solid carbide taps"**: o metal duro existe no mesmo sistema de codificação, como variante.
- Guhring: machos de catálogo em **HSS-E** revestido (série 4393, HSS-E com TiN, para aços ligados e inox).
- YG-1 publica família de **macho de conformação em HSS e HSS-E** (https://www.yg1.kr/spn/products/threading.asp).
- **Números comparativos de Vc ou de vida entre macho HSS-E e macho de metal duro: `LACUNA`** — não publicados nas páginas que abri.

---

## 1d) Os fatores de Vc do sistema (HSS 0,29 · HSS-Co 0,37 · MD 1,00) têm base em catálogo?

**Veredito:** **Base parcial para o HSS e nenhuma base para o HSS-Co.** A única razão publicada por fabricante que encontrei é **HSS igual a cerca de 1/4 da velocidade do metal duro (fator 0,25)**. O cruzamento de tabelas de dois fabricantes dá **0,12 a 0,23** para HSS-Co contra metal duro revestido.
**Confiança:** `SEM CONSENSO` — as duas evidências não fecham entre si, e **nenhum fabricante publica a trinca HSS / HSS-Co / metal duro lado a lado**.

| Evidência | Valor | Fonte |
|---|---|---|
| Regra publicada por fabricante | "HSS runs at speeds roughly **one-fourth** that of carbide" → **fator 0,25** | Kennametal, *Machining Guide: Reaming Tool Basics and Tips* — https://www.kennametal.com/us/en/resources/blog/metal-cutting/reaming-tool-basics.html |
| Fresa de topo **HSS-Co**, aço doce (menos de 145 HB) | **80 a 150 SFM = 24 a 46 m/min** | OSG, *Tech Pg. Standard 4Fl e 6FL HSS-Co* — https://osgtool.com/content/literature/8002024CA/Tech%20Pg.%20Standard%204Fl%20&%206FL%20HSS-Co.pdf |
| Fresa de topo **HSS-Co**, aço de média resistência e ferro fundido (menos de 20 HRC) | **80 a 110 SFM = 24 a 34 m/min** | idem |
| Fresa de topo **metal duro revestido AlTiN**, aço não ligado | **200 m/min** (usinagem geral) | ISCAR, catálogo de fresa inteiriça — https://www.iscar.com/Catalogs/Publication/english_1/Flash_Solid_catalog/Flash_Solid_catalog.pdf |
| **Razão resultante HSS-Co / metal duro** | **0,12 a 0,23** | cruzamento OSG x ISCAR (fabricantes diferentes — ver ressalva) |

**Ressalva honesta:** cruzar OSG com ISCAR mistura geometria, refrigeração e critério de vida diferentes; o número robusto é o **0,25 declarado pela Kennametal**. O que dá para afirmar:
- **HSS igual a 0,25 é defensável.** O 0,29 do sistema fica a +16% disso — dentro da margem de erro declarada do próprio modelo (±15–25%), portanto **tolerável**.
- **HSS-Co igual a 0,37 não tem respaldo em catálogo.** Nenhuma fonte do meu território mostra o cobalto comprando +28% de velocidade sobre o HSS. Se a razão real for a mesma 0,25, usar 0,37 manda o operador rodar **cerca de 48% acima** do que o catálogo sustenta — isso é erro de segurança, não de precisão.
- `LACUNA`: a razão HSS × HSS-Co isolada — mesmo fabricante, mesma ferramenta, mudando só o substrato — **não é publicada** por nenhum catálogo que abri.

---

## 1e) Decisão de produto: não oferecer a combinação obsoleta, ou oferecer com aviso?

**Recomendação: oferecer — com o fator certo e o rótulo corrigido —, colapsando HSS e HSS-Co numa entrada só.**

Critério, em três linhas:
1. A combinação **não é obsoleta**: HSS-Co em fresa está em catálogo vivo de dois fabricantes independentes. Esconder produziria recusa de atendimento a um usuário real.
2. O que está errado é **o nome e o número**, não a existência. "Aço rápido (HSS)" em fresa é a entrada que não achei em catálogo; "HSS-Co" é a que existe. Uma entrada única **"aço rápido (HSS/HSS-Co)" com fator 0,25** elimina a opção falsa e corrige o fator no mesmo movimento.
3. O operador de oficina pequena **vai usar a fresa da gaveta de qualquer jeito**. Entre calcular com 0,25 e não calcular, calcular é melhor — desde que a tela diga que o valor é conservador.

---

# QUESTÃO 2 — A premissa: substrato é commodity, revestimento é a variável

## 2a) A premissa se sustenta para fresa inteiriça de uso geral?

**Veredito:** **Não consegui derrubar a premissa — mas também não consegui medi-la, e o motivo é o achado.** Nenhum fabricante do meu território publica teor de cobalto, tamanho de grão e dureza do substrato das suas fresas de topo de uso geral. Se o substrato fosse a variável competitiva, ele seria especificação publicada, como é o revestimento. **A ausência do dado no catálogo é evidência a favor da premissa, não uma falha de busca.**
**Confiança:** `NÃO ENCONTRADO` para a dispersão numérica (Co, grão, HV de fresa de uso geral em quatro fabricantes) · `CONSENSO` para o fato de que o mercado descreve substrato por **classe qualitativa de grão**, não por composição.

**O que cada fabricante de fato publica sobre o substrato:**

| Fabricante | O que está publicado | Teor de Co | Tamanho de grão | Dureza |
|---|---|---|---|---|
| ISCAR | descrição textual por grau: IC900 "a tough submicron substrate"; IC903 "ultra-fine grain carbide with 12% cobalt" | só o IC903 (**12%**) | classe qualitativa (submicron / ultra-fine) | não publicada |
| Sandvik Coromant | "cemented carbides consist of more than 80% of hard phase WC", ligante rico em Co; grão descrito como "medium to coarse" e "fine or submicron" | não | qualitativo | não |
| Sumitomo Electric | famílias por classe de grão: **AF1** (super ultra fine), **A1** (ultra fine), **H1** (fine), **EH10** (geral) | não | classe | não |
| Mitsubishi Materials | grau micro-grão **TF15**: HRA **91,5**; TRS **2,5 GPa**; densidade **14,5**; ISO **K20** | não | "micro-grain" | HRA 91,5 |
| CERATIZIT | **CTS30D** submicron, o maior teor de Co da linha de corte, **1400 HV30**; **WTX–Micro** (microbroca): grão **0,5–0,8 µm**, ligante **~10%**, **1600 HV30** | ~10% (linha micro) | 0,5–0,8 µm | 1400–1600 HV30 |
| Guhring | publica uma tabela "Carbide Grades", mas **só como PDF de imagem** — baixei o arquivo e ele não contém texto extraível | ilegível | ilegível | ilegível |

**Dispersão que dá para limitar com dado publicado:**
- Dureza: **1400 → 1600 HV30 = +14%** (CERATIZIT, entre um grau de corte submicron e a linha micro).
- Cobalto: **10% a 12%** entre os dois únicos graus que publicam o número (CERATIZIT micro e ISCAR IC903) = **2 pontos percentuais**.

**Sensibilidade quantificada — e a régua de comparação:**
- Teor de Co e grão governam **resistência ao desgaste e tenacidade**, não as equações da calculadora. Nenhum catálogo publica um multiplicador de `Vc` ou `fz` por substrato.
- Dentro de um mesmo fabricante, **o substrato já é constante**: o mesmo grau IC900 atende P, M, K, S e H, e o catálogo publica uma tabela de `Vc` por **material de peça**, não por substrato.
- A régua: no mesmo grau IC900, `Vc` varia de **27 m/min (liga de Ni) a 250 m/min (FoFo cinzento) — fator 9,3×**. Qualquer variação de substrato que não apareça em tabela de catálogo é, por construção, menor que isso.

**Classificação:** **IGNORAR** — o substrato de fresa de uso geral vira **constante do sistema**. Ressalva declarada: a conclusão se apoia na **ausência de dado publicado** e na estrutura das tabelas de catálogo, não num delta de `Vc` medido. Ver lacunas.

---

## 2b) Onde a premissa quebra — as três exceções

### b1) Fresa para aço endurecido (acima de 50 HRC) — **EXCEÇÃO CONFIRMADA**
**Confiança:** `REFERÊNCIA ÚNICA` (ISCAR, mas com dois pontos independentes dentro do mesmo catálogo).

- A linha de fresa inteiriça de uso geral da ISCAR **para em 48 HRC**: as linhas "até 57 HRC" e "até 62 HRC" da tabela de `Vc` vêm com **traço**, ou seja, o fabricante não oferece.
- O grau que cobre até 62 HRC é outro: **IC903 — "ultra-fine grain carbide with 12% cobalt"**, classes ISO **H01–H10 / P05–P15**. Confirma-se: substrato diferente (grão mais fino, mais cobalto), classe ISO diferente.
- Quanto muda: `Vc` cai de **200 m/min** (aço não ligado, grupo P) para **80 m/min** (H, 44–48 HRC) = **−60%**. Esse −60% é efeito do **material da peça**, não do substrato isolado.
- **`LACUNA`:** o delta de `Vc`/`fz` atribuível **só ao substrato** (mesma ferramenta, mesmo material, trocando o grau) não é publicado por nenhum catálogo que abri.

**Resposta que decide o produto:** **vem embutida na escolha da ferramenta.** Quem vai usinar 55 HRC não consegue comprar a fresa de uso geral para isso — o catálogo não vende. Resolve-se **no catálogo**, não no motor de cálculo, e não exige campo na tela.

### b2) Microfresa (abaixo de 1 mm) — **EXCEÇÃO CONFIRMADA**
**Confiança:** `REFERÊNCIA ÚNICA` (CERATIZIT para o substrato; YG-1 para os parâmetros).

- CERATIZIT declara, para a linha micro (**WTX–Micro**), substrato **ultrafino de 0,5–0,8 µm**, ligante **~10%**, **1600 HV30** — o fabricante **troca o substrato explicitamente ao descer de diâmetro**. Isso responde "exige grão submicron/ultrafine?": sim, o fabricante trata como requisito da linha.
- YG-1, *Miniature End Mills — Recommended Cutting Conditions*: diâmetros de **0,5 mm a 3,0 mm**, `Vc` publicado **constante em 655 SFM (≈ 200 m/min)** ao longo de toda a faixa, e **fz de 0,0001" a 0,0006" — isto é, 2,5 µm a 15 µm por dente**.
- **`LACUNA`:** raio de aresta obtenível e espessura mínima de cavaco **não são publicados** por nenhum catálogo que abri. O elo "grão fino → gume mais afiado → h_min menor" é afirmado qualitativamente pelos fabricantes, **sem número**. Quem teria o dado: literatura de usinagem de precisão e artigo revisado por pares — **fora do meu território**.

**Resposta que decide o produto:** **vem embutida na escolha da ferramenta** (a linha micro é outro item de catálogo, com outro substrato e outra tabela). Resolve-se **no catálogo**. O que **não** se resolve no catálogo é o `fz` na casa de micrometros — isso é limite do motor de cálculo, não do substrato.

### b3) Fresa para alumínio — **EXCEÇÃO CONFIRMADA, e é a mais forte das três**
**Confiança:** `CONSENSO` (ISCAR, Guhring e Harvey Tool, independentes, dizem a mesma coisa).

- **ISCAR:** para **alumínio forjado** (grupos 21–22, `Vc` 400 m/min) e para **ligas de cobre** (26–27, 300 m/min) e **cobre eletrolítico** (28, 150 m/min), a coluna "IC08 Coated" é **traço — não existe versão revestida no catálogo**. Só o **alumínio fundido com Si > 10%** (abrasivo) tem versão revestida.
- **Guhring** (catálogo de fresamento): grupo N, **alumínio com menos de 7% Si a 1970 SFM (≈ 600 m/min)** e **até 17% Si a 850 SFM (≈ 259 m/min)**; a mesma seção lista **"Polycrystalline diamond"** e **"Finest grain solid carbide (carbide-UF)"** como opções de linha.
- **Harvey Tool:** AlTiN e AlTiN Nano marcados **"Not recommended: aluminum and aluminum alloys"**; para alumínio o fabricante indica **TiB2, ZrN ou diamante**.

**Resposta que decide o produto:** o que muda em alumínio **não é o substrato — é o revestimento (ou a ausência dele) e a geometria**. E isso **não se resolve só no catálogo**: se o sistema aplicar um bônus de "+25% por ser revestida" quando o usuário escolher alumínio, ele estará premiando uma ferramenta que o fabricante **nem vende** para aquele material. Precisa de tratamento no motor (ver 2d3).

---

## 2c) Módulo de elasticidade do metal duro de fresa

**Veredito:** `LACUNA` — **não entrego número.**
**Confiança:** `NÃO ENCONTRADO` no meu território.

Nenhum fabricante de ferramenta de corte, nas páginas e catálogos que abri, publica o módulo de elasticidade numérico do seu metal duro:
- Sandvik Coromant, página *Cutting tool materials*: descreve composição e classes, **sem nenhum valor de E**.
- Guhring, *Carbide Grades*: a tabela existe, mas o PDF é **imagem** — baixei e não há texto.
- CERATIZIT: o documento de propriedades do metal duro **não abriu** (download bloqueado/erro).
- Mitsubishi Materials: publica **HRA, TRS e densidade** por grau — **não publica E**.
- ISCAR: publica classe ISO, revestimento e descrição de substrato — **não publica E**.

**Quem teria o dado, e por que está fora do meu escopo:** datasheet de grau de produtor de metal duro (Hyperion, e o catálogo técnico da CERATIZIT que não abriu), **handbook de engenharia** e **norma de ensaio** — os dois últimos explicitamente fora do meu território de fonte nesta rodada.

**O que consigo afirmar sem sair do território:** a **consequência estrutural** da premissa é válida — se o substrato de fresa é padronizado, o `E` da deflexão é constante, não variável, e uma das travas do cálculo cai. Além disso, os graus efetivamente usados em ferramenta inteiriça se concentram numa faixa estreita de dureza (**1400–1600 HV30**) e densidade (**14,5**), o que é compatível com uma faixa estreita de `E`. **Converter isso em GPa exige fonte fora do meu território — e eu não vou converter.**

---

## 2d) Revestimento — a variável principal, quantificada

### d1) A razão de `Vc` entre metal duro sem e com revestimento sustenta 1,25?
**Veredito:** **Não sustenta como fator universal.** O único par sem/com revestimento publicado que encontrei dá **1,39**, e existe **em um único material**.
**Confiança:** `REFERÊNCIA ÚNICA`.

| Material (catálogo ISCAR, grupo) | IC08 **sem** revestimento | IC08 **com** revestimento | Razão |
|---|---|---|---|
| Alumínio forjado (21–22) | 400 m/min | **não oferecido** | — |
| Alumínio fundido Si>10% (23–25) | 180 m/min | 250 m/min | **1,39** |
| Ligas de cobre (26–27) | 300 m/min | **não oferecido** | — |
| Cobre eletrolítico (28) | 150 m/min | **não oferecido** | — |

Nos grupos P, M, K, S e H o catálogo **só publica o grau revestido** (IC900) — não há coluna "sem revestimento" para comparar. Ou seja: **em ferroso, "revestido" não é uma variante, é o caso base.** Sandvik Coromant confirma no plano do mercado: **80–90% de todas as pastilhas são de metal duro revestido**, e as não revestidas são "uma proporção muito pequena", usadas em HRSA, titânio e endurecido **a baixa velocidade**.

**Consequência:** o fator 1,25 aplicado sobre um "metal duro sem revestimento" descreve uma ferramenta que, em aço, praticamente não está no catálogo. O ganho existe, mas o **denominador é fictício**.

### d2) O ganho é seletivo por material da peça?
**Veredito:** **CONFIRMADO. Revestimento não é ganho universal — em parte dos materiais ele é contraindicação explícita do fabricante.**
**Confiança:** `CONSENSO` (Harvey Tool, ISCAR e Sandvik Coromant, independentes).

**Matriz revestimento × material da peça** — o que o catálogo autoriza dizer. Onde o fabricante não publica multiplicador, a célula é `LACUNA` e não fator inventado.

| Revestimento | Aço (P) | Inox (M) | FoFo (K) | Alumínio forjado (N) | Al fundido Si>10% (N) | Cobre/latão (N) | Superliga/Ti (S) | Endurecido (H) |
|---|---|---|---|---|---|---|---|---|
| **TiN** | recomendado (uso geral ferroso) — fator `LACUNA` | `LACUNA` | `LACUNA` | não indicado | não indicado | não indicado | `LACUNA` | `LACUNA` |
| **AlTiN / TiAlN** | **recomendado** — é o revestimento das tabelas de aço (IC900 AlTiN) | recomendado | recomendado | **CONTRAINDICADO pelo fabricante** | **CONTRAINDICADO** | não indicado | recomendado | recomendado |
| **AlTiN Nano / Ti Nano** | recomendado | recomendado | — | **CONTRAINDICADO** | **CONTRAINDICADO** | — | recomendado | **recomendado (a indicação principal)** |
| **ZrN** | não indicado | não indicado | não indicado | recomendado (não-ferroso abrasivo) | recomendado | **recomendado** | não indicado | não indicado |
| **TiB2** | não indicado | não indicado | não indicado | **recomendado (a indicação principal)** | não ideal (variedades abrasivas) | não indicado | não indicado | não indicado |
| **DLC / diamante amorfo** | **CONTRAINDICADO (ferroso)** | **CONTRAINDICADO** | **CONTRAINDICADO** | recomendado | recomendado | recomendado | não indicado | **CONTRAINDICADO** |
| **Diamante CVD / PCD** | **CONTRAINDICADO (ferroso)** | **CONTRAINDICADO** | **CONTRAINDICADO** | recomendado | recomendado | recomendado | não indicado | **CONTRAINDICADO** |
| **Sem revestimento** | pouco usado (Sandvik: proporção muito pequena) | usado a baixa velocidade | — | **é o padrão do catálogo** (ISCAR 400 m/min) | 180 m/min | **é o padrão** (300 m/min) | usado a baixa velocidade | — |

Fontes da matriz: Harvey Tool, *Tool Coatings* (recomendado / não recomendado por revestimento) — https://www.harveytool.com/resources/tool-coatings · ISCAR, catálogo de fresa inteiriça (o que é oferecido e a que `Vc`) — https://www.iscar.com/Catalogs/Publication/english_1/Flash_Solid_catalog/Flash_Solid_catalog.pdf · Sandvik Coromant, *Cutting tool materials* (PCD limitado a não-ferrosos; 80–90% das pastilhas revestidas) — https://www.sandvik.coromant.com/en-us/knowledge/materials/cutting-tool-materials

### d3) Qual a forma correta no modelo?
**Recomendo (ii) — restringir quais revestimentos aparecem por material selecionado.**

Critério, em uma linha: **erro de sinal é pior que erro de magnitude.** Aplicar +25% de AlTiN em alumínio não erra o tamanho do número — erra a direção, e o fabricante escreveu "não recomendado" com todas as letras.
- **(i) fator por par revestimento × material** exigiria preencher ~56 células; o catálogo publica multiplicador em **zero** delas. Seria inventar 56 números.
- **(iii) fator único com premissa declarada na tela** mantém viva a combinação "fresa de alumínio revestida com AlTiN", que **não existe no catálogo** do fabricante. Viola a regra 5 do enunciado.
- **(ii)** usa exatamente o que o catálogo publica — quais revestimentos são oferecidos e recomendados para cada material — e não exige nenhum número novo. O ganho numérico continua embutido na tabela de `Vc` daquele par ferramenta × material, que é como o fabricante publica.

### d4) Os multiplicadores TiAlN 1,40 · AlCrN 1,30 · TiN 1,10 · DLC 1,50 · PCD 2,00 têm fonte?
**Veredito:** `NÃO ENCONTRADO`. **Nenhum desses cinco números aparece em qualquer catálogo, folheto, datasheet ou guia técnico de fabricante que abri.** Fabricante publica dureza do revestimento, temperatura máxima de trabalho e coeficiente de atrito — **não publica multiplicador de `Vc` por revestimento**.

**E a suspeita sobre PCD e DLC está CONFIRMADA, com fonte:**
- Harvey Tool marca **"Not recommended: ferrous applications"** para diamante amorfo (DLC), diamante CVD e PCD, com temperatura máxima de trabalho do DLC em apenas **750 °F (~400 °C)**.
- Sandvik Coromant: PCD é **limitado a materiais não-ferrosos** por instabilidade química com o ferro.
- Portanto **usar PCD 2,00 ou DLC 1,50 como fator geral sobre qualquer material seria erro grave** — dobrar a velocidade em aço com base num revestimento que o fabricante proíbe em ferroso. Confirmado.

### d5) O revestimento muda só a velocidade?
**Veredito:** **No catálogo, muda só a velocidade.**
**Confiança:** `REFERÊNCIA ÚNICA` (ISCAR).

No catálogo de fresa inteiriça da ISCAR, o par IC08 / IC08 Coated tem **duas colunas de `Vc`** (sem e com revestimento) mas **uma única tabela de `fz`** — o avanço por dente publicado é o mesmo para a versão revestida e a não revestida, em todos os diâmetros de 6 a 20 mm.
- **Vida da ferramenta a velocidade constante:** `LACUNA` — nenhum catálogo que abri publica curva ou razão de vida por revestimento. Quem teria: ensaio de vida sob ISO 3685 e artigo revisado por pares, **fora do meu território**.

---

## 2e) Pastilha intercambiável

### e1) A dispersão de `Vc` entre classes de pastilha para o MESMO material é grande?
**Veredito:** `LACUNA` quanto ao número — mas a estrutura do catálogo indica que, **fixado o material, a classe adequada é praticamente uma só**.
**Confiança:** `NÃO ENCONTRADO` para a dispersão numérica.

Não obtive, dentro de um mesmo fabricante, uma tabela de `Vc` por classe ISO para o mesmo material. O que o catálogo publica e que sustenta a leitura qualitativa: as faixas ISO por grau **quase não se sobrepõem**.
- ISCAR **IC900**: P15–P40 · M20–M30 · K05–K25 · S15–S25 · H10–H25.
- ISCAR **IC903**: H01–H10 · P05–P15 · M10–M20 · S10–S20.
Fixado "inox austenítico", o catálogo empurra para M; fixado "endurecido 60 HRC", empurra para H01–H10. A escolha não é livre.

### e2) A formulação "assumir a classe adequada ao material selecionado" é mais defensável que "fator médio"?
**Veredito:** **Sim, e não é opinião: é o formato do próprio catálogo.**
**Confiança:** `CONSENSO` estrutural (ISCAR, Guhring, OSG — todas as tabelas de dados de corte que abri são indexadas assim).

Toda tabela de dados de corte que consultei é indexada pelo **par (grau, grupo de material)**. Nenhuma publica média entre graus. Uma média entre a classe adequada e as inadequadas **não corresponde a nenhuma linha de nenhum catálogo** — produziria um número que nenhum fabricante recomenda para nenhuma situação.
- **Fator resultante:** `LACUNA` — para fechar o número seria preciso a tabela de `Vc` por classe do mesmo fabricante para o mesmo material, que não obtive.

### e3) A razão de `Vc` entre fresa inteiriça de metal duro e ferramenta com pastilha revestida sustenta 1,25?
**Veredito:** `LACUNA` para o número — **mas a formulação do fator já está errada na origem.**
**Confiança:** `NÃO ENCONTRADO` para a razão.

Não obtive as duas `Vc` (inteiriça e pastilha) do mesmo fabricante para o mesmo material. O que consigo afirmar com fonte: **"pastilha revestida" não é uma categoria superior a "metal duro inteiriço"** — são coisas de eixos diferentes. Segundo a Sandvik Coromant, **80–90% de todas as pastilhas são revestidas**; e a fresa inteiriça de catálogo da ISCAR também é revestida (IC900, AlTiN). Colocar as duas numa mesma escala multiplicativa, com a pastilha 25% acima, mistura **formato de ferramenta** com **estado de revestimento**. O fator 1,25 não tem base e nem sequer tem significado bem definido.

---

## 2f) Nomenclatura — o operador consegue preencher o campo olhando a ferramenta?

**Veredito:** **Revestimento e classe ISO 513: sim. Substrato por composição: não — e por isso não pode virar campo.**
**Confiança:** `CONSENSO`.

| Candidato a campo | Está publicado de forma padronizada? | Serve como campo? |
|---|---|---|
| **Sigla do revestimento** (AlTiN, TiAlN, TiN, ZrN, TiB2, DLC/PCD, FIREX / nano-FIREX) | **Sim** — aparece no nome da série e na embalagem; Harvey publica até o código (C1, C3, C6, C7, C8) | **SIM** |
| **Classe ISO 513 do grau** (P15–P40, K05–K25, H01–H10) | **Sim** — publicada por grau no grade chart; Guhring usa a legenda P/M/K/N/S/H nas páginas de produto | **SIM** (para pastilha) |
| **Teor de cobalto** | **Não** — só apareceu em dois graus, em texto corrido (ISCAR IC903 12%; CERATIZIT linha micro ~10%) | **NÃO** |
| **Tamanho de grão** | **Não** como número — só como classe qualitativa (submicron, ultra-fine, fine). Número só na linha micro da CERATIZIT (0,5–0,8 µm) | **NÃO** |
| **Dureza HV do substrato** | **Quase nunca** — CERATIZIT publica HV30 de alguns graus; Mitsubishi publica HRA; a maioria não publica nada | **NÃO** |

**Conclusão do teste:** um campo "teor de cobalto" ou "tamanho de grão" seria um campo que o operador **não consegue preencher com certeza olhando a embalagem** — pior que não ter o campo. Um campo de **revestimento**, ao contrário, passa no teste: a sigla está impressa.

---

# QUESTÃO 3 — Veredito de modelagem

## Tabela B — Veredito de modelagem

| Fator | Dispersão real encontrada (no meu território) | Efeito no resultado | MODELAR / DEFAULT / IGNORAR | Se MODELAR: como o operador informa |
|---|---|---|---|---|
| **Substrato de fresa (uso geral)** | Composição **não publicada** por nenhum fabricante. Limites indiretos: HV30 1400→1600 (**+14%**), Co 10–12% (**2 p.p.**) | **Nenhum efeito publicado sobre `Vc` ou `fz`.** Nenhum catálogo traz multiplicador por substrato | **IGNORAR** — vira constante do sistema. A variação é menor que a margem de ±15–25% e, sobretudo, não é mensurável em catálogo | — |
| **Substrato de fresa (aço endurecido)** | Linha de uso geral **para em 48 HRC** (traço no catálogo); grau dedicado ultra-fine 12% Co cobre até 62 HRC | `Vc` cai de 200 para 80 m/min (**−60%**) do aço não ligado para 44–48 HRC — efeito do material, com a ferramenta trocando junto | **MODELAR — no catálogo, não em campo** | Não informa. Escolhe a ferramenta "fresa para aço endurecido", que já carrega o substrato e a tabela |
| **Substrato de microfresa** | CERATIZIT declara grão **0,5–0,8 µm**, ligante **~10%**, **1600 HV30** para a linha micro. YG-1 publica `Vc` 200 m/min constante e **fz de 2,5 a 15 µm** de Ø0,5 a Ø3 mm | O substrato muda por exigência da linha; o que muda de fato o cálculo é o `fz` na casa dos micrometros | **MODELAR — no catálogo** (linha micro é outro item). O `fz` micrométrico é problema do motor, não do substrato | Não informa substrato. Informa o diâmetro; o catálogo entrega a linha micro |
| **Revestimento** | Único par publicado sem/com: **1,39** (Al fundido Si>10%). Em alumínio forjado e cobre o revestido **não é oferecido**. AlTiN **contraindicado** em alumínio; diamante/PCD **contraindicado** em ferroso | Da ordem de **+39% onde se aplica**, e **inversão de sinal** onde é contraindicado. É o maior efeito controlável desta rodada | **MODELAR — como par revestimento × material, por restrição de opções** | Sigla impressa na embalagem (AlTiN, TiB2, ZrN, TiN, diamante) — e o sistema só mostra as siglas que o material selecionado admite |
| **Classe de pastilha** | Faixas ISO por grau publicadas e com pouca sobreposição (IC900 P15–P40; IC903 H01–H10/P05–P15). Dispersão de `Vc` entre classes para o mesmo material: `LACUNA` | Fixado o material, a classe adequada é praticamente única — o resto do catálogo é irrelevante para aquela situação | **DEFAULT** — assumir a **classe adequada ao material selecionado** (nunca média entre classes) | Se virar campo: classe ISO 513 impressa na caixa (P25, K20...). Recomendo não pedir |
| **Preparação de gume** | **Nada publicado** em catálogo (nem raio de gume, nem chanfro T, nem efeito) | Não quantificável no meu território | **IGNORAR — por ausência de base**, não por efeito medido pequeno | — |
| **Ângulo de hélice (30/45/60°)** | ISCAR publica **passo variável e hélices de 35° e 37°** com a justificativa explícita "para mitigar vibração e melhorar desempenho". **Nenhum fabricante publica multiplicador de `Vc` ou `fz` por ângulo de hélice** | Tratado pelo fabricante como recurso **antivibração/geometria**, não como variável de velocidade | **IGNORAR** no motor de cálculo (entra na identidade da ferramenta, se entrar) | — |

---

## Quantos níveis de granularidade de material de ferramenta a calculadora deve ter?

**Recomendo (ii) — metal duro com e sem revestimento como entradas separadas — com uma condição que vem da Questão 2d: a opção revestida só aparece nos materiais em que o catálogo a oferece.**

Critério, em três linhas:
1. **(ii) é o único nível que o catálogo de fato distingue e o operador de fato enxerga.** É exatamente o desdobramento que a ISCAR faz na tabela de não-ferrosos (IC08 × IC08 Coated), e a sigla do revestimento está impressa na embalagem — passa no teste da Questão 2f.
2. **(i) apaga a única variação com efeito comprovado** (+39% num material, contraindicação total em outros) e mantém viva a fresa revestida para alumínio forjado, que o fabricante não vende.
3. **(iii) por classe ISO 513** é correto para pastilha e inútil para fresa inteiriça: o operador de oficina raramente tem a classe do grau de uma fresa. **(iv) grau por fabricante** é falsa precisão pura — exigiria manter IC900, IC903, CTS30D, TF15, AF1... e o catálogo não publica o que diferencia um do outro em termos de `Vc` para o mesmo material.

**A decisão de produto de 15/08/2026 — embutir o substrato na identidade da ferramenta do catálogo — se sustenta tecnicamente.** Três evidências do meu território:
- O **próprio catálogo do fabricante é organizado assim**: uma entrada por variação real de mercado (linha HSS-E, linha de metal duro, linha micro, grau para endurecido), e em nenhum momento ele pede que o usuário declare a composição do substrato.
- **Teor de cobalto e tamanho de grão não são especificação publicada** — logo não podem ser campo, sob pena de produzir número errado com aparência de precisão.
- As combinações impossíveis **desaparecem sozinhas**: fresa de topo de HSS puro, fresa de uso geral acima de 48 HRC e fresa revestida para alumínio forjado simplesmente não têm entrada no catálogo do fabricante.

**Três correções que a decisão exige para não nascer errada:**
1. **Colapsar HSS e HSS-Co numa entrada só**, com fator **0,25** (Kennametal), e **eliminar o 0,37** — que não tem base em catálogo e manda rodar ~48% acima.
2. **Eliminar o fator 1,25 de "pastilha revestida"**: ele mistura formato de ferramenta com estado de revestimento, e o denominador ("metal duro sem revestimento") quase não existe em aço.
3. **Trocar o "+25% se revestida" por restrição de revestimento por material**, porque em alumínio forjado e cobre o catálogo **não oferece** versão revestida, e em alumínio o AlTiN é contraindicado pelo fabricante.

## Ordem de grandeza — a premissa está quantitativamente confirmada?

**Sim, pelo que o meu território mostra — com uma ressalva de método.**

| Fonte de variação | Tamanho no catálogo |
|---|---|
| **Material da peça**, mesmo grau de fresa (IC900) | `Vc` de **27 a 250 m/min = 9,3×** |
| **Estratégia** (geral × trocoidal), mesmo grau e material | **1,8×** (200 → 360 m/min em aço não ligado) |
| **Revestimento**, onde há par publicado | **1,39×** |
| **Substrato entre fabricantes** (fresa de uso geral) | **não mensurável — não publicado**; limites indiretos de dureza dão **1,14×** |

Erro de parâmetro domina erro de substrato por **quase uma ordem de grandeza**. O sistema deve investir precisão em `Vc` por material e por estratégia, não em catálogo de substrato.

**Ressalva de método, dita com todas as letras:** a premissa **não foi confirmada por medição** — foi confirmada por **ausência de dado publicado** e pela estrutura das tabelas de catálogo. Nenhum fabricante do meu território publica um delta de `Vc` atribuível só ao substrato, nem para confirmar nem para refutar. Se o outro território (norma, handbook, artigo) trouxer uma dispersão de substrato acima de 25%, esta conclusão cai.

---

## Tabela C — O que continua sem base

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| Módulo de elasticidade `E` do metal duro de fresa | Nenhum fabricante de ferramenta publica `E` numérico nas páginas/catálogos que abri | Datasheet de grau de produtor de metal duro (CERATIZIT técnico, Hyperion) ou handbook/norma de ensaio — **fora do meu território** |
| Dispersão de Co, grão e HV entre 4 fabricantes de fresa de uso geral | Composição não é especificação publicada; só 2 graus publicam Co (12% e ~10%) | Datasheet de substrato por grau, ou ensaio próprio. Guhring publica a tabela **só como imagem** |
| Razão de `Vc` HSS × HSS-Co isolada | Nenhum catálogo publica os dois substratos na mesma ferramenta e material | Tabela de um único fabricante com as duas linhas e o mesmo material |
| Divisão broca HSS × metal duro por faixa de diâmetro | Catálogos listam as duas linhas sem publicar regra de corte por diâmetro | Guia de seleção do fabricante com faixa declarada |
| Vc comparativo macho HSS-E × macho de metal duro | Não publicado nas páginas abertas | Compêndio técnico de roscamento com tabela por substrato |
| Multiplicadores TiAlN 1,40 · AlCrN 1,30 · TiN 1,10 · DLC 1,50 · PCD 2,00 | **Nenhum aparece em catálogo de fabricante** | Nenhuma fonte do meu território sustenta esses números — tratar como sem origem até prova em contrário |
| Efeito do revestimento sobre a **vida** a `Vc` constante | Catálogo publica só `Vc`; `fz` é o mesmo com e sem revestimento | Ensaio de vida (ISO 3685) ou artigo revisado por pares — **fora do meu território** |
| Dispersão de `Vc` entre classes ISO 513 para o mesmo material | Não obtive tabela por classe do mesmo fabricante para o mesmo material | Catálogo de pastilhas com `Vc` por grau e por grupo de material |
| Razão `Vc` fresa inteiriça × ferramenta com pastilha | Não obtive as duas do mesmo fabricante para o mesmo material | Catálogo de fresamento com pastilha + catálogo de inteiriça do mesmo fabricante |
| Raio de aresta obtenível e espessura mínima de cavaco em microfresa | Nenhum catálogo publica raio de gume | Literatura de usinagem de precisão / artigo revisado por pares — **fora do meu território** |
| Efeito quantificado de preparação de gume e de ângulo de hélice | Fabricante trata hélice como recurso antivibração, sem multiplicador | Estudo comparativo do fabricante ou artigo — não achei no território |

---

# Lacunas declaradas

Tudo abaixo ficou **sem base no meu território** (catálogo de fabricante). Nenhuma célula foi preenchida por conhecimento próprio.

1. **`E` (módulo de elasticidade) do metal duro de fresa — nenhum valor entregue.** Fonte que teria: datasheet de grau de produtor de metal duro, handbook de engenharia, norma de ensaio. Fora do escopo: handbook e norma são território proibido nesta rodada; o datasheet técnico da CERATIZIT não abriu (erro de download) e o da Guhring é PDF de imagem sem texto.
2. **Dispersão numérica de teor de cobalto, tamanho de grão e dureza entre fresas de topo de uso geral de 4 fabricantes.** Não é dado publicado. Só dois graus no mercado inteiro publicam Co (ISCAR IC903 12%, CERATIZIT linha micro ~10%).
3. **Razão de `Vc` entre HSS e HSS-Co isolada.** Nenhum catálogo publica os dois na mesma ferramenta/material. O 0,37 do sistema fica **sem fonte**.
4. **Faixa de diâmetro que separa broca HSS de broca de metal duro**, e de broca inteiriça para broca com pastilha. Catálogos listam as linhas, não publicam a fronteira.
5. **Vc e vida comparativos entre macho HSS-E e macho de metal duro**, e entre macho de corte e de conformação.
6. **Multiplicadores de revestimento (TiAlN 1,40 · AlCrN 1,30 · TiN 1,10 · DLC 1,50 · PCD 2,00).** `NÃO ENCONTRADO` em catálogo — fabricante publica dureza, temperatura e atrito, nunca multiplicador de `Vc`.
7. **Efeito do revestimento sobre a vida da ferramenta a velocidade constante.** Fonte que teria: ensaio sob ISO 3685 / artigo revisado por pares — norma e artigo estão fora do meu território.
8. **Dispersão de `Vc` entre classes ISO 513 de pastilha para o mesmo material**, e o fator resultante da formulação "classe adequada ao material".
9. **Razão de `Vc` entre fresa inteiriça de metal duro e ferramenta com pastilha revestida** para o mesmo material — o 1,25 do sistema fica **sem fonte e sem significado bem definido**.
10. **Raio de aresta obtenível e espessura mínima de cavaco em microfresa.** Fonte que teria: literatura de usinagem de precisão e artigo revisado por pares — fora do território.
11. **Efeito quantificado de preparação de gume e de ângulo de hélice (30/45/60°) sobre `Vc`, `fz` ou vida.** Nenhum fabricante publica multiplicador; a ISCAR só justifica hélice de 35°/37° como antivibração.
12. **Células marcadas N/V na Tabela A:** fresa toroidal e esférica em HSS-Co; fresa toroidal/esférica com pastilha; PCD em broca helicoidal; alargador em HSS puro; barra de mandrilar em HSS e HSS-Co; fresa de rosca em HSS-Co e com pastilha; item específico de broca HSS. Não foram verificadas em catálogo nesta rodada — **não marquei nenhuma delas por dedução**.
13. **Justificativa "fresa de HSS para máquina sem rotação suficiente"** — não encontrada em nenhum catálogo. O nicho que o fabricante declara é outro: material mole e série limitada (Kennametal).

---

**Fim do retorno R3-B.** Território: catálogo, datasheet, folheto e guia técnico de fabricante de ferramenta de corte. Fabricantes efetivamente consultados: ISCAR, Sandvik Coromant, Kennametal, Harvey Tool, Guhring, OSG (EUA e Brasil), Dormer Pramet, Walter, Sumitomo Electric Hardmetal, Mitsubishi Materials, CERATIZIT, YG-1, Seco Tools, Emuge, Helical Solutions.
