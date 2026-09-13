# RESPOSTA R8 — B — Território: catálogo e formação técnica de fabricante

**Rodada:** R8 — Furação, roscamento e mandrilamento (par cego)
**Território de fonte:** catálogos, guias de aplicação, tabelas de speeds & feeds, manuais técnicos e
material de treinamento de fabricantes de ferramenta (Sandvik Coromant, Kennametal, Iscar, Seco,
Walter, Mitsubishi, OSG, Guhring, Emuge, Dormer Pramet, Harvey Tool, Niagara, YG-1, Sumitomo,
Tungaloy e equivalentes).
**Fora do território (nunca citado aqui):** ISO/DIN/ABNT, Machinery's Handbook, ASM Handbook,
Diniz/Marcondes/Coppini, Stemmer, Ferraresi, artigo acadêmico, tese, sociedade científica.
**Status:** CONCLUÍDO — quatro questões respondidas, lacunas declaradas.

---

## NOTA DE MÉTODO E DIÁRIO DE APURAÇÃO

Gravação incremental. Cada bloco abaixo foi anexado quando fechou. Blocos marcados `PARCIAL` têm
achado real mas ainda não fecham o item.

**Fontes já abertas nesta rodada (registro corrido, para não recontar):**

| # | Fonte | URL | O que rendeu |
|---|---|---|---|
| F1 | Sandvik Coromant — *Drilling formulas and definitions* | sandvik.coromant.com/en-us/knowledge/machining-formulas-definitions/drilling-formulas-definitions | Inventário de grandezas: vc, n, fn, vf, Q, Pc, Mc, kc, Tc, **Ff (feed force, N)**. Fórmulas publicadas como **imagem** — texto não transcreve. Nota textual recuperada: em broca de insertos "a velocidade de corte cai de 100% na periferia a zero no centro" |
| F2 | Mitsubishi Materials — página de fórmulas (curso técnico) | mmc-carbide.com/permanent/courses/81/formulas.html | `vc = π·D·n/1000`; `vf = fr·n`; `tc = (ℓd·i)/(n·fr)·60`. **Não traz** MRR, torque, potência nem espessura de cavaco para furação |
| F3 | Guhring — *Feed Force and Torque Requirements, Carbide Drills* (PDF, p. 290–291 do catálogo) | guhring.com/media/support/Drilling-Feed-Force-and-Torque-Requirements-Carbide-Drills.pdf | Só **gráficos** Pc(kW) e Mc(Nm) × diâmetro (0–30 mm) para aço 1000 N/mm², ferro fundido e AlSi7, brocas RT100/RT150. Única condição numérica em texto: curva de torque em aço 1000 N/mm², broca RT100 nova vs. gasta, **vc = 70 m/min, f = 0,25 mm/rot, refrigeração 40 bar** — sem o diâmetro declarado, então **não serve** como regra `fn = k·D` |

**Achado de método já firme:** os três fabricantes acima publicam a **cadeia de cálculo** (vc, n, fn,
vf, Q, Pc, Mc, Ff) mas empurram o **valor de partida de `fn`** para a tabela do produto específico —
não para uma regra geral. Isso é o oposto do que a Regra 5 do enunciado pede ("prefira a regra à
tabela"), e é um resultado em si: ver Questão 1.

---

# QUESTÃO 1 — Avanço por rotação (`fn`) de partida na furação

## 1.1 — Broca helicoidal: é regra sobre o diâmetro ou tabela? — FECHADO

### Resposta curta (metal duro, ISO P e K)

**É tabela por diâmetro no papel, mas a tabela obedece a uma regra — e a regra NÃO é `fn = k × D`.**
Nas tabelas de fabricante o avanço cresce **sublinearmente** com o diâmetro: aproximadamente
**`fn = k × D^0,5`** (raiz do diâmetro), não proporcional a `D`.

Isso importa muito para o produto: se a calculadora usar `fn = 0,02 × D` calibrado em 16 mm, ela
**subestima em ~2,5×** o avanço de uma broca de 3 mm e superestima o de uma de 30 mm.

### A evidência — Kennametal, brocas HPR (metal duro inteiriço)

**Fonte:** Kennametal, *HPR Drills Application Data* (folha de dados de aplicação, versão métrica),
`kennametal.com/content/dam/final/kennametal/docs/application-data/kendrill-hpr/kendrill-hpr-application-data_en.pdf`.
**Condições declaradas pela fonte:** broca HPR de metal duro inteiriço, diâmetros 3,0 a 20,0 mm,
avanço "recomendado por rotação", faixa min–max por grupo de material. A folha **não** declara
comprimento (xD) nem tipo de refrigeração nesta tabela.

Avanço `fn` (mm/rot), faixa min–max, por diâmetro:

| Grupo | vc (m/min) | 3,0 | 4,0 | 6,0 | 8,0 | 10,0 | 12,0 | 16,0 | 20,0 |
|---|---|---|---|---|---|---|---|---|---|
| P0 | 140–290 | 0,13–0,24 | 0,14–0,26 | 0,15–0,30 | 0,17–0,34 | 0,19–0,38 | 0,21–0,42 | 0,24–0,50 | 0,28–0,58 |
| P1 | 130–290 | 0,15–0,30 | 0,16–0,33 | 0,18–0,39 | 0,20–0,45 | 0,22–0,51 | 0,24–0,57 | 0,28–0,69 | 0,32–0,81 |
| P2 | 190–270 | 0,14–0,29 | 0,15–0,32 | 0,18–0,38 | 0,21–0,43 | 0,24–0,49 | 0,27–0,55 | 0,33–0,66 | 0,39–0,77 |
| P3 | 130–190 | 0,15–0,30 | 0,17–0,33 | 0,20–0,38 | 0,23–0,44 | 0,26–0,50 | 0,29–0,56 | 0,36–0,67 | 0,42–0,79 |
| P4 | 110–170 | 0,13–0,25 | 0,15–0,27 | 0,19–0,33 | 0,22–0,38 | 0,26–0,43 | 0,30–0,48 | 0,37–0,59 | 0,44–0,69 |
| P5 | 70–110 | 0,11–0,21 | 0,13–0,24 | 0,15–0,28 | 0,18–0,33 | 0,21–0,38 | 0,24–0,42 | 0,29–0,51 | 0,35–0,61 |
| P6 | 60–100 | 0,11–0,21 | 0,13–0,24 | 0,15–0,28 | 0,18–0,33 | 0,21–0,38 | 0,24–0,42 | 0,29–0,51 | 0,35–0,61 |
| K1 | 130–210 | 0,12–0,27 | 0,15–0,33 | 0,21–0,43 | 0,26–0,51 | 0,30–0,59 | 0,34–0,65 | 0,41–0,77 | 0,47–0,87 |
| K2 | 90–180 | 0,12–0,27 | 0,15–0,33 | 0,21–0,43 | 0,26–0,51 | 0,30–0,59 | 0,34–0,65 | 0,41–0,77 | 0,47–0,87 |
| K3 | 70–130 | 0,10–0,22 | 0,13–0,27 | 0,18–0,36 | 0,23–0,43 | 0,27–0,49 | 0,31–0,55 | 0,37–0,65 | 0,43–0,74 |

**Confiança: `REFERÊNCIA ÚNICA`** — um fabricante, uma linha de broca. Vira `CONSENSO` só quando um
segundo catálogo confirmar a mesma forma (em apuração).

### A regra extraída da tabela (ajuste log-log, feito por mim sobre os números acima)

Ajustando `fn = k × D^a` em cada linha do grupo:

| Grupo | expoente `a` (min) | expoente `a` (max) | `k` (min) | `k` (max) |
|---|---|---|---|---|
| P0 | 0,400 | 0,463 | 0,078 | 0,136 |
| P1 | 0,397 | 0,523 | 0,092 | 0,159 |
| P2 | 0,547 | 0,514 | 0,071 | 0,156 |
| P3 | 0,536 | 0,509 | 0,079 | 0,161 |
| P4 | 0,643 | 0,539 | 0,061 | 0,129 |
| P5 | 0,601 | 0,553 | 0,054 | 0,109 |
| K1 | 0,722 | 0,616 | 0,056 | 0,140 |
| K3 | 0,769 | 0,637 | 0,045 | 0,112 |

**Expoente vai de 0,40 a 0,77; mediana ≈ 0,54.** Ou seja: `fn ≈ k·√D` descreve a tabela; `fn = k·D`
não descreve.

**Forma prática recomendada para o produto (derivada, não citada):**
`fn_partida ≈ 0,10 × √D` (mm/rot) para aço ISO P com broca de MD, com faixa `0,075·√D` a `0,155·√D`.
Em 8 mm dá 0,28 mm/rot (faixa 0,21–0,44); em 3 mm dá 0,17 (0,13–0,27); em 20 mm dá 0,45 (0,34–0,69).
**Este é um ajuste meu sobre dado de fabricante, não um número publicado** — a fonte publica a tabela,
não o expoente. Marcar como derivado no canônico.

### Se o produto insistir em `fn = k × D` (razão fn/D observada, mesma fonte)

| D (mm) | 3 | 4 | 6 | 8 | 10 | 12 | 16 | 20 |
|---|---|---|---|---|---|---|---|---|
| `fn/D` min (P0–P3) | 0,043–0,050 | 0,035–0,043 | 0,025–0,033 | 0,021–0,029 | 0,019–0,026 | 0,018–0,024 | 0,015–0,023 | 0,014–0,021 |
| `fn/D` max (P0–P3) | 0,080–0,100 | 0,065–0,083 | 0,050–0,065 | 0,043–0,056 | 0,038–0,051 | 0,035–0,048 | 0,031–0,043 | 0,029–0,041 |

**O `k` de `fn = k·D` varia 3× ao longo da faixa de diâmetro.** Um `k` fixo só é honesto dentro de uma
janela estreita de diâmetro (p.ex. 10–20 mm, onde `k ≈ 0,015–0,04`).

### Cobertura desta tabela
Só metal duro, e só ISO P e K — a folha da Kennametal não cobre M, N, S nem H. HSS-Co, a confirmação
da forma por um segundo fabricante e os demais grupos de material vêm no bloco seguinte.

---

## 1.1 (continuação) — HSS-Co, e a confirmação da forma da regra

**Fonte:** Morse Cutting Tools, *High Speed Steel & Cobalt Drills — Speed and Feed Recommendations*
(catálogo, p. 88) e *Solid Carbide Drills — Speed and Feed Recommendations* (p. 89),
`cuttingtoolsales.com/wp-content/uploads/2015/11/Morse_Drills_Speeds.pdf`.
**Aviso da própria fonte, importante para o produto:** as velocidades e avanços são "pontos de partida
sugeridos", a serem aumentados ou diminuídos conforme material e condição real; a fonte manda
**começar conservador e subir** até otimizar o ciclo. Isso é exatamente a postura do Fenix.

Convertido para métrico por mim (1 in = 25,4 mm; 1 SFM = 0,3048 m/min):

### HSS e HSS-Co — `vc` e `fn` por diâmetro (Morse)

| Material (exemplos da fonte) | Dureza HB | vc (m/min) | 3,18 mm | 6,35 mm | 12,7 mm | 19,05 mm | 25,4 mm |
|---|---|---|---|---|---|---|---|
| Aço baixo carbono 1018, 12L12, 1213 | ≤120 | 33,5 | 0,076 | 0,102 | 0,203 | 0,254 | 0,279 |
| Aço baixo/médio carbono 1018, 1551, 11L44 | 120–250 | 19,8 | 0,102 | 0,152 | 0,279 | 0,330 | 0,356 |
| **Aço médio carbono e ligado 1040, 1140, 4340, 8640** | **≤250** | **18,3** | **0,076** | **0,102** | **0,203** | **0,254** | **0,279** |
| Aço ferramenta P20, A2, D2, H12 | ≤250 | 15,2 | 0,076 | 0,102 | 0,203 | 0,254 | 0,279 |
| Aço ferramenta P20, A2, D2, H12 | 250–350 | 10,7 | 0,051 | 0,076 | 0,152 | 0,178 | 0,203 |
| Inox de usinagem livre 303, 416, 440F | ≤250 | 18,3 | 0,102 | 0,152 | 0,279 | 0,330 | 0,356 |
| **Inox austenítico 304, 316** | ≤300 | 13,7 | 0,051 | 0,076 | 0,152 | 0,178 | 0,203 |
| Inox difícil 17-4PH, 316L, AM350 | ≤300 | 6,1 | 0,051 | 0,076 | 0,152 | 0,178 | 0,203 |
| Ferro fundido cinzento mole | ≤160 | 32,0 | 0,102 | 0,152 | 0,279 | 0,330 | 0,356 |
| Ferro fundido cinzento | 160–260 | 27,4 | 0,102 | 0,152 | 0,279 | 0,330 | 0,356 |
| Ferro fundido nodular | 250 | 24,4 | 0,076 | 0,102 | 0,203 | 0,254 | 0,279 |
| **Alumínio 6061, 2025, A140, 514.0** | ≤150 | 99,1 | 0,102 | 0,152 | 0,279 | 0,330 | 0,356 |

Avanços em mm/rot. **Confiança: `REFERÊNCIA ÚNICA`.** A fonte não separa HSS de HSS-Co nesta tabela —
o cabeçalho é "High Speed Steel **&** Cobalt". Então **o valor tabelado é o do HSS comum; HSS-Co
suporta mais**, mas o quanto a mais essa fonte não diz. Isso é uma lacuna dentro do item.

### A forma da regra se confirma no HSS: expoente ≈ 0,6

- Aço médio carbono: `fn` vai de 0,076 (D=3,18) a 0,279 (D=25,4) — diâmetro ×8, avanço ×3,67 →
  **`fn ∝ D^0,63`**.
- Aço baixo/médio carbono: ×3,49 sobre ×8 → **`fn ∝ D^0,60`**.

Somado ao metal duro da Kennametal (expoentes 0,40–0,77), **duas fontes independentes, dois
substratos, mesma forma: `fn ≈ k·√D`, não `fn = k·D`.** Isso eleva a confiança da FORMA para
`CONSENSO`; o valor de `k` continua `SEM CONSENSO` (ver abaixo).

### Dispersão entre fontes — o `k` NÃO fecha, e a divergência é grande

Aço médio carbono / ISO P, broca de 12,7 mm, furo curto:

| Fonte / ferramenta | Substrato | vc (m/min) | fn (mm/rot) |
|---|---|---|---|
| Morse, brocas HSS/Co (uso geral) | HSS-Co | 18,3 | 0,203 |
| Morse, brocas de MD inteiriço (uso geral) | MD | 61,0 | 0,203 |
| Kennametal HPR (alto desempenho), grupo P2, D=12 mm | MD | 190–270 | 0,27–0,55 |

**Duas leituras que se contradizem — declarada, não apagada:**
1. **Morse:** trocar HSS por MD muda **só a velocidade** (×3,3); o avanço fica igual.
2. **Kennametal:** a broca de MD de alto desempenho roda em velocidade 3–4× a da broca de MD de uso
   geral da Morse, **e** com avanço 1,3–2,7× maior.

**Confiança: `SEM CONSENSO`.** A diferença não é ruído: é geometria de ponta e refrigeração interna
(alto desempenho, canal de refrigeração, 140°) contra broca de uso geral. **Consequência para o
produto:** o `fn` de partida depende da *classe* da broca, não só do substrato. Se a calculadora tiver
só um campo "MD vs HSS-Co", ela erra por até **2,7×** dentro do próprio MD. Recomendo um terceiro
seletor — *uso geral* vs *alto desempenho / refrigeração interna* — ou assumir explicitamente a classe
conservadora e dizer isso na tela.

---

## 1.2 — As outras famílias — broca de insertos / U-drill

### Broca de insertos / U-drill — `REFERÊNCIA ÚNICA` (uma fonte; segunda em apuração)

**Achado que muda o desenho do produto: no U-drill o avanço NÃO é função do diâmetro.** O fabricante
publica `fn` por **grupo de material apenas**, com a mesma faixa valendo para toda a linha de
diâmetros. A regra `fn = k·D` (e também a `k·√D`) **não se aplica a esta família.**

**Fonte:** ISCAR, *Recommended Cutting Conditions for XCMT-MF Inserts (Metric)*, folha técnica do
e-catálogo, `iscar.com/eCatalog/Ecat/datafileENM/INFO/DR-MF.pdf`. A folha declara-se baseada nos
grupos de material ISO 513 / VDI 3323 (cito o catálogo, não as normas).

| ISO | Material (condição / dureza declarada) | Grupo | **Furação: vc (m/min)** | **Furação: fn (mm/rot)** |
|---|---|---|---|---|
| P | não ligado <0,25% C, recozido, 420 N/mm², 125 HB | 1 | 120–260 | 0,05–0,06 |
| P | **não ligado ≥0,25% C, recozido, 650 N/mm², 190 HB** — a linha do 1045 | **2** | **80–190** | **0,05–0,15** |
| P | <0,55% C temperado e revenido, 850 N/mm², 250 HB | 3 | 100–280 | 0,06–0,18 |
| P | baixa liga recozido, 600 N/mm², 200 HB | 6 | 100–280 | 0,06–0,18 |
| P | baixa liga temp. e revenido, 930–1200 N/mm², 275–350 HB | 7–9 | 60–180 | 0,04–0,15 |
| P | alta liga / aço ferramenta recozido, 680 N/mm², 200 HB | 10 | 80–190 | 0,04–0,15 |
| P | **alta liga / ferramenta temperado, 1100 N/mm², 325 HB** | 11 | 50–150 | 0,04–0,14 |
| P | inox ferrítico / martensítico, 680–820 N/mm², 200–240 HB | 12–13 | 50–210 | 0,04–0,15 |
| M | **inox austenítico / duplex, 600 N/mm², 180 HB** | 14 | 50–210 | 0,04–0,15 |
| K | **fofo cinzento e nodular, 160–260 HB** | 15–18 | 100–300 | 0,06–0,23 |
| K | fofo maleável, 130–230 HB | 19–20 | 100–200 | 0,06–0,15 |
| N | **alumínio, forjado e fundido, 60–130 HB** | 21–25 | 120–500 | 0,05–0,30 |
| N | ligas de cobre / latão | 26–28 | 80–380 | 0,05–0,23 |
| S | superligas Fe / Ni / Co, 200–350 HB | 31–35 | 20–50 | 0,04–0,05 |
| S | titânio, puro e α+β, 190–310 HB | 36–37 | 30–60 | 0,04–0,05 |
| H | **aço temperado 55–60 HRC**; fofo coquilhado | 38–41 | 20–40 | 0,04–0,05 |

**Perigo quantificado (Regra 6):** para aço temperado 55–60 HRC e superligas o teto de avanço
publicado é **0,05 mm/rot** — cerca de **1/5** do que a mesma calculadora entregaria para aço 1045 com
broca inteiriça de 12 mm (0,27–0,55). Uma regra `fn = k·D` transportada de P para H erra por 5–10×.

**Cuidado ao ler:** essa `fn` do U-drill parece "baixa" ao lado da broca inteiriça (0,05–0,15 contra
0,27–0,55 em Ø12). Não é comparável de frente: **o U-drill é vendido de Ø12–14 mm para cima**, e a
folha da Kennametal para de medir em Ø20. Nas faixas onde as duas famílias existem juntas, a broca
inteiriça de alto desempenho realmente aceita mais avanço — é a diferença entre gume contínuo afiado e
inserto indexável. O que fica firme e é o achado: **para U-drill o produto NÃO deve escalar `fn` com o
diâmetro.**

---

## 1.2 (continuação) — Broca de centro/spot, escareador e alargador — FECHADO

**Fonte principal deste bloco:** Precision Dormer / Dormer Pramet, *Main Catalog* (catálogo geral,
472 páginas), `cdn.grovesindustrial.com/pdf/sds/Precision_Dormer_097602_Catalog.pdf`.
O catálogo publica a **regra em duas peças**, e é o desenho mais próximo do que o Fenix precisa:
(a) uma **tabela de avanço por diâmetro** com código-letra, por família de ferramenta; (b) uma
**tabela de material (AMG)** que dá, por material, o par **velocidade (SFM) + código-letra**. Material
e diâmetro ficam desacoplados. Esse é o formato que eu recomendaria copiar.

### Alargador — `REFERÊNCIA ÚNICA`

Tabela de avanço do alargador, **mm/rot ± 15%** (tolerância declarada pela própria fonte, p. 438):

| Código | Ø1,5 | Ø2 | Ø3 | Ø5 | Ø8 | Ø10 | Ø12 | Ø16 | Ø20 | Ø25 | Ø30 | Ø40 | Ø50 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A | 0,045 | 0,055 | 0,078 | 0,100 | 0,150 | 0,170 | 0,185 | 0,220 | 0,250 | 0,280 | 0,320 | 0,390 | 0,440 |
| B | 0,055 | 0,072 | 0,110 | 0,150 | 0,180 | 0,210 | 0,240 | 0,280 | 0,310 | 0,360 | 0,400 | 0,500 | 0,550 |
| C | 0,065 | 0,085 | 0,135 | 0,185 | 0,220 | 0,260 | 0,285 | 0,335 | 0,390 | 0,440 | 0,480 | 0,600 | 0,680 |
| D | 0,080 | 0,110 | 0,160 | 0,200 | 0,270 | 0,320 | 0,360 | 0,410 | 0,470 | 0,540 | 0,600 | 0,730 | 0,850 |
| E | 0,100 | 0,140 | 0,180 | 0,250 | 0,350 | 0,390 | 0,430 | 0,500 | 0,530 | 0,640 | 0,750 | 0,910 | 1,100 |
| F | 0,140 | 0,180 | 0,260 | 0,350 | 0,440 | 0,500 | 0,550 | 0,630 | 0,700 | 0,800 | 0,930 | 1,200 | 1,500 |

Par velocidade + código por material (alargadores HSS, séries 4533/4535/4543/4500, p. 440; SFM da
fonte, m/min convertido por mim):

| Material (grupo AMG da fonte) | Dureza HB | vc (m/min) | Código | `fn` em Ø12 |
|---|---|---|---|---|
| 1.2 Aço estrutural / cementação 1005–1025, A36 | <200 | 20,1 | C | 0,285 |
| **1.3 Aço carbono comum 1030–1060, 1144–1146** (a linha do 1045) | **<250** | **15,8** | **C** | **0,285** |
| 1.4 Aço ligado 4140, 4340, 52100, 8620, P20, D2 | <250 | 14,9 | B | 0,240 |
| 1.5 Aço ligado temperado e revenido | 250–350 | 9,1 | B | 0,240 |
| 1.6 Aço ligado temperado e revenido | >350 | 4,9 | A | 0,185 |
| **2.2 Inox austenítico 304, 316, 321** | <250 | **6,1** | B | 0,240 |
| 2.3 Inox ferrítico/austenítico/martensítico, duplex | <300 | 7,9 | B | 0,240 |
| 3.1 Fofo cinzento lamelar classe 20 | <150 | 15,8 | E | 0,430 |
| 3.3 Fofo nodular / maleável | <200 | 13,1 | C | 0,285 |
| 4.2 Ti liga 6Al4V | <270 | 9,1 | B | 0,240 |
| 5.3 Ni liga Inconel 718, Waspaloy | 270–350 | 3,0 | C | 0,285 |

**Alumínio: a fonte deixa a linha 7.x em branco** nessas séries de alargador — o fabricante não as
recomenda para alumínio. `NÃO ENCONTRADO` para alargador em alumínio neste catálogo.

**Achado que interessa ao produto:** o avanço do alargador em Ø12 (0,185–0,55 mm/rot) é **2 a 3× o
avanço de uma broca do mesmo diâmetro** (0,20–0,28 em MD de uso geral). Se a calculadora reaproveitar
a regra da broca para alargar, entrega avanço **2–3× baixo demais**. A consequência não é quebra: é
encruamento da parede, desgaste rápido do alargador e furo saindo fora de tolerância.

### Escareador e rebaixador — `REFERÊNCIA ÚNICA`

Avanço em mm/rot (Dormer, p. 439). O diâmetro aqui é o **da ferramenta**, não o do furo:

| Código | Ø6 | Ø8 | Ø10 | Ø16 | Ø20 | Ø25 | Ø32 | Ø40 | Ø60 | Ø80 |
|---|---|---|---|---|---|---|---|---|---|---|
| A | 0,03 | 0,04 | 0,05 | 0,06 | 0,08 | 0,09 | 0,10 | 0,12 | 0,14 | 0,16 |
| B | 0,04 | 0,05 | 0,06 | 0,08 | 0,10 | 0,12 | 0,14 | 0,16 | 0,18 | 0,20 |
| C | 0,05 | 0,06 | 0,08 | 0,10 | 0,12 | 0,14 | 0,16 | 0,18 | 0,20 | 0,22 |
| D | 0,06 | 0,08 | 0,10 | 0,12 | 0,15 | 0,18 | 0,20 | 0,22 | 0,25 | 0,28 |
| E | 0,08 | 0,10 | 0,12 | 0,15 | 0,18 | 0,20 | 0,25 | 0,27 | 0,30 | 0,32 |
| F | 0,09 | 0,11 | 0,13 | 0,16 | 0,19 | 0,21 | 0,26 | 0,29 | 0,33 | 0,36 |
| G | 0,10 | 0,12 | 0,15 | 0,18 | 0,20 | 0,22 | 0,28 | 0,32 | 0,36 | 0,40 |
| H | 0,12 | 0,15 | 0,18 | 0,20 | 0,22 | 0,25 | 0,30 | 0,35 | 0,40 | 0,45 |

Par velocidade + código (escareadores e rebaixadores, p. 442):

| Material | Dureza HB | vc (m/min) | Código | `fn` em Ø16 |
|---|---|---|---|---|
| 1.2 Aço estrutural | <200 | 25,0 | E | 0,15 |
| **1.3 Aço carbono comum 1030–1060** | <250 | **20,1** | **D** | **0,12** |
| 1.4 Aço ligado | <250 | 14,9 | D | 0,12 |
| 1.5 Aço ligado temp./revenido | 250–350 | 10,1 | B | 0,08 |
| 2.2 Inox austenítico | <250 | 6,1 | B | 0,08 |
| 3.1 Fofo cinzento | <150 | 25,0 | F | 0,16 |
| 3.3 Fofo nodular | <200 | 11,9 | C | 0,10 |

**O escareador anda com avanço 2 a 3× MENOR que a broca do mesmo diâmetro** (0,12 contra ~0,32 em
Ø16) — regra oposta à do alargador. As duas famílias **não podem** herdar a regra da broca, e erram
para lados opostos se herdarem.

### A forma `fn ≈ k·√D` também vale para alargador e escareador

Ajuste meu sobre as tabelas acima: alargador código C, de Ø3 (0,135) a Ø30 (0,480) → expoente
**0,55**. Escareador código D, de Ø6 (0,06) a Ø60 (0,25) → expoente **0,62**. Broca Dormer código H,
de Ø3 (0,1016) a Ø30 (0,3759) → expoente **0,57**.
Com Kennametal (0,40–0,77) e Morse (0,60–0,63), são **quatro catálogos e quatro famílias de
ferramenta** convergindo em `fn ∝ D^0,55±0,1`. **A FORMA vira `CONSENSO`.**

### Broca de centro / spot — `NÃO ENCONTRADO` como tabela; dois pontos isolados

| Fonte | Condição declarada | Valor |
|---|---|---|
| Hoffmann Group / GARANT, ficha do *NC Spot Drill HSS-E 90°* | aço com resistência **< 900 N/mm²**, ponta 90°, HSS-E | **`fn` = 0,03 mm/rot** |
| CERATIZIT, *WTX Micropilot* | entrada em furo-piloto | ~300 rpm, ~1000 mm/min |

**`LACUNA` declarada:** não achei, em catálogo de fabricante, tabela de `fn` de broca de centro/spot
por diâmetro e material. A ficha da GARANT dá **um** número, sem faixa de diâmetro nem faixa de
dispersão. **Quem teria o dado fora do meu território:** norma de broca de centro e as tabelas de
furação de handbook de usinagem — universo que o briefing me proíbe citar.

**Nota de produto (não é avanço, é geometria):** no spot o critério dominante não é vida de
ferramenta, é o **ângulo de ponta em relação à broca seguinte** — o spot precisa ter ângulo **igual ou
maior** que o da broca, senão a broca apoia primeiro na periferia e lasca o gume. Nenhuma saída de
`n` e `vf` cobre isso; é um alerta de tela.

---

## 1.3 — Como o `fn` varia com a relação profundidade/diâmetro — FECHADO

### Resposta curta

**Não existe, no material de fabricante que abri, um "fator de redução por profundidade" publicado
como fator.** O que existe é outra coisa, e é mais importante para o produto: **o fabricante troca a
FERRAMENTA e publica uma tabela de dado de corte por faixa de profundidade.** A redução está embutida
na tabela da ferramenta, não num multiplicador.

E há uma segunda regra, essa sim publicada como regra, que o produto provavelmente não tem: a
**redução de avanço na saída do furo**.

### As regras de procedimento publicadas — `CONSENSO` (dois fabricantes independentes)

| Regra | Valor | Fonte |
|---|---|---|
| Redução de avanço antes de romper o furo passante | **reduzir para 40% do avanço, ~1 mm antes do rompimento**, em saída oblíqua | Guhring, *Deep Hole Solutions* (catálogo RT 100 T / EB 100), p. 22 e 23 |
| Redução de avanço antes de romper o furo passante | **reduzir o avanço por rotação em 50% antes de sair do furo** | CERATIZIT, *WTX Micro / Micropilot*, página de know-how de furação |
| Furo-piloto obrigatório para broca de furo profundo | piloto com broca tolerância m7, profundidade mín. **1,5×D a 3×D** (3×D em alumínio) | Guhring, *Deep Hole Solutions*, p. 22 |
| Entrada no furo-piloto | **~300 rpm e ~20 IPM (≈500 mm/min)**, parando pouco antes do fundo; só então subir a rotação e ligar a alta pressão | Guhring, *Deep Hole Solutions*, p. 22 |
| Retirada | desligar refrigeração, **baixar para 300 rpm**, sair a no máx. 200 IPM | Guhring, *Deep Hole Solutions*, p. 22 |
| Quebra-cavaco (peck) em microfuração profunda | a partir de **10×D**, peck a cada **3×D**, recuando até a profundidade do furo-piloto | CERATIZIT, *WTX Micro* |

**Nota de perigo (Regra 6 do enunciado):** a Guhring escreve que a broca de furo profundo **nunca**
pode girar em rotação plena sem apoio no furo-piloto. Consequência quantificada não publicada, mas o
modo de falha é o desvio lateral e a quebra da broca na entrada — perda da ferramenta e do furo. Um
produto que só entrega "rotação e avanço" e não avisa disso está incompleto para a família de furo
profundo.

### O que a tabela do fabricante mostra quando a profundidade muda — `REFERÊNCIA ÚNICA`

**Fonte:** Guhring, *Deep Hole Solutions* (catálogo, 06/2020, item 400147338), tabelas "Operating
Parameters" das p. 24–26. Brocas RT 100 T de metal duro, refrigeração interna, séries 6509 (15×D),
6511 (20×D), 6512 (25×D), 6513 (30×D), 6514 (40×D). Valores originais em SFM e IPR; conversão minha.

`vc` (m/min) e `fn` (mm/rot) em Ø12,7 mm:

| Material | 15×D e 20×D | 25×D | 30×D e 40×D |
|---|---|---|---|
| Aço estrutural comum <150 HB | 110 · 0,406 | 101 · 0,406 | 79 · 0,305 |
| **Aço beneficiável não ligado <220 HB (família do 1045)** | **110 · 0,254** | **110 · 0,254** | **110 · 0,254** |
| Aço beneficiável ligado <301 HB | 110 · 0,305 | 101 · 0,305 | 79 · 0,305 |
| Inox austenítico <337 HB | 70 · 0,102 | 70 · 0,102 | 70 · 0,127 |
| Ferro fundido cinzento <242 HB | 140 · 0,406 | 130 · 0,406 | 120 · 0,406 |

**Leitura: o fator existe, mas é pequeno e não é monótono.** De 15×D para 40×D a velocidade cai para
**0,72–1,00×** e o avanço para **0,75–1,25×** (sim, o inox austenítico SOBE de avanço a 30–40×D).
**No aço beneficiável não ligado — o material dominante do exemplo do produto — não há redução
nenhuma entre 15×D e 40×D.**

### Onde a redução realmente está: entre broca curta e broca longa

Comparando catálogos diferentes (por isso `SEM CONSENSO`), Ø≈12,7 mm, aço ISO P médio carbono:

| Ferramenta | vc (m/min) | fn (mm/rot) |
|---|---|---|
| Kennametal HPR, MD, furo curto (grupo P2, Ø12) | 190–270 | 0,27–0,55 |
| Guhring RT 100 T, MD, 15×D–40×D | 110 | 0,254 |
| Guhring EB 100 / EB 100 M, canhão de MD, 25×D–75×D (Ø9,52) | 90 | **0,025** |

**O degrau grande não é entre 3×D e 8×D: é entre a broca helicoidal e a broca de canhão.** A broca de
canhão trabalha com avanço da ordem de **1/10** do da broca helicoidal, e é aí que uma calculadora
ingênua destrói ferramenta. Se o produto oferecer "broca de canhão" na tela de furar sem tabela
própria, o número que ele der estará **10× alto**.

### `LACUNA` neste item

**Fator de correção de avanço por profundidade para a faixa curta (3×D → 5×D → 8×D → 12×D), na forma
de multiplicador publicado, não foi encontrado em catálogo de fabricante.** Os fabricantes tratam a
faixa curta como ferramentas distintas com tabelas distintas, e a maior parte das folhas de dado de
aplicação (incl. a folha HPR da Kennametal) **nem declara o comprimento da broca**.
**Quem teria o dado fora do meu território:** manual de engenharia de usinagem e norma de ferramenta
(Machinery's Handbook traz redução de avanço por profundidade de furo em forma de porcentagem por
faixa de L/D) — universo que o meu briefing me proíbe citar. Fica como lacuna declarada.

---

## 1.4 — Faixa de segurança em torno do `fn` de partida — FECHADO

### O número: os próprios fabricantes publicam a tolerância

| Família | Tolerância declarada pela fonte | Onde |
|---|---|---|
| **Broca** | **± 25%** sobre o avanço tabelado | Dormer, *Drill Feed Rate Chart – Metric*, p. 10 — a tabela é titulada "Feed in mm per Revolution ± 25%" |
| **Alargador** | **± 15%** | Dormer, *Reamers – Feed in MM per Revolution*, p. 438 |
| **Broca de MD, faixa min–max publicada** | o máximo é **1,8 a 2,2×** o mínimo, no mesmo diâmetro e material | Kennametal, *HPR Drills Application Data* (P2 Ø12 = 0,27 a 0,55) |
| **Furo passante, na saída** | reduzir para **40%** (Guhring) ou **50%** (CERATIZIT) do avanço | catálogos citados na Q1.3 |
| **Postura geral** | "pontos de partida sugeridos… comece conservador e aumente até otimizar o ciclo" | Morse, cabeçalho das duas tabelas |

**Leitura para o produto — são DUAS faixas, não uma:**
1. **Faixa de tolerância do ponto de partida: ± 25%** (broca) / ± 15% (alargador). Dentro dela, o
   número ainda é "o mesmo ponto de partida"; não merece alerta.
2. **Faixa de uso legítima: ~2×** entre o conservador e o produtivo, dentro do mesmo diâmetro e
   material. Sair do ±25% e ir até 2× o mínimo **não é erro** — é otimização deliberada, e o produto
   deveria dizer isso em vez de alarmar.

Um alerta que dispare a 1,3× o valor de partida vai gritar em cima de metade da faixa que o próprio
fabricante publica. **Sugestão: alerta só acima de ~2× ou abaixo de ~0,5× o valor de partida.**

### Modo de falha em cada extremo

| Extremo | O que a fonte de fabricante de fato diz | Consequência |
|---|---|---|
| Avanço **alto** demais | Guhring publica curvas Mc(d) e Pc(d) com envelope min/max para aço 1000 N/mm², fofo e AlSi7; o teto prático é onde o torque cruza o que máquina e haste aguentam. A mesma folha mostra a curva de torque de uma broca **gasta** acima da de uma broca **nova**, nas mesmas condições (vc 70 m/min, f 0,25 mm/rot, 40 bar) | Quebra por torção e lascamento do gume; em U-drill, quebra do inserto central. O desgaste **soma** ao torque, então a margem some com a vida da ferramenta |
| Avanço **baixo** demais | **nenhuma fonte de fabricante que abri quantifica o piso** | — |
| Avanço baixo em **furo profundo** | Guhring: a broca de furo profundo **nunca** pode girar em rotação plena sem apoio no furo-piloto | Desvio lateral e quebra na entrada |
| Avanço baixo no **alargador** | implícito na tolerância apertada de ± 15% | Furo cônico, fora de tolerância, encruamento da parede |

**`LACUNA` — o piso do avanço.** O enunciado pede o modo de falha do avanço baixo (encruamento e
atrito). **Nenhum catálogo de fabricante que abri publica limite inferior de avanço nem o
quantifica.** Publicam faixa min–max e param aí; o "min" é um mínimo comercial recomendado, não um
limiar físico com consequência descrita. **Quem teria o dado fora do meu território:** a literatura de
mecânica do corte, que trata isso como *efeito de tamanho* e espessura mínima de cavaco — exatamente
o universo de handbook e artigo que o briefing me proíbe citar. Declaro lacuna e **não preencho com
estimativa própria.** Ver Q2.4: a mesma lacuna reaparece como o piso `h < 0,1 mm` do Kienzle, e lá ela
é ao menos quantificável a partir da geometria.

---

# QUESTÃO 2 — Espessura de cavaco em furação, a que entra no Kienzle

## Resumo antes das contas

**A fórmula existe, está publicada por fabricante, e é simples:** `h = fz × sin κ`.
**O ângulo de ponta entra sim, e entra pela METADE.** E o Kienzle **é** o que os fabricantes usam em
furação — o mesmo `kc = kc1.1 / h^mc`. O problema que o enunciado teme é outro e é pior: com avanço de
partida típico, **a espessura calculada cai abaixo de 0,1 mm na maior parte da faixa de diâmetro que o
produto atende.**

## As duas fontes primárias desta questão

**F-A — WALTER, *Technical Compendium – Holemaking*, edição 2024, página B 9,
"Calculation formulae for drilling from solid".**
`cdn.walter-tools.com/files/sitecollectiondocuments/downloads/global/manuals/en-gb/technical-compendium-holemaking-2024-en.pdf`

| Grandeza | Fórmula publicada | Unidade |
|---|---|---|
| Rotação | `n = vc × 1000 / (Dc × π)` | min⁻¹ |
| Velocidade de corte | `vc = Dc × π × n / 1000` | m/min |
| Avanço de mesa | `vf = f × n` | mm/min |
| **Taxa de remoção (furar do maciço)** | `Q = vf × π × Dc² / (4 × 1000)` | cm³/min |
| **Potência de acionamento** | `Pmot = Q × kc / (60000 × η)` | kW |
| **Torque** | `Mc = Dc² × kc × f / 8000 = Pc × 9500 / n` | Nm |
| **Força de avanço** | `Ff = 0,63 × (f × Dc × kc) / 2` | N |
| **Força específica de corte** | `kc = kc1.1 / h^mc` | N/mm² |
| **Espessura de cavaco** | **`h = fz × sin κ`** | **mm** |

Símbolos, como a própria fonte os define: `fz` = avanço por dente (mm); `f` = avanço por rotação
(mm); `h` = espessura de cavaco (mm); `κ` = **lead angle** (ângulo de posição), em graus; `kc1.1` =
força específica de corte para 1 mm² de seção com h = 1 mm; `mc` = inclinação da curva de `kc`;
`η` = rendimento da máquina, **0,7–0,95** (número publicado, útil por si só).

**F-B — SANDVIK COROMANT, *Formulas and definitions for drilling – METRIC* (folha H 81 do
formulário técnico).**

| Grandeza | Fórmula publicada |
|---|---|
| Taxa de remoção | `Q = vc × Dc × fn / 4` (cm³/min) |
| Potência líquida | `Pc = vc × Dc × fn × kc / (240 × 10³)` (kW) |
| Torque | `Mc = Pc × 30 × 10³ / (π × n)` (Nm) |
| **Força de avanço** | **`Ff ≈ 0,5 × kc × (Dc/2) × fn × sin κr`** (N) |
| `κr` | **entering angle** (ângulo de posição), graus |

### As duas fontes são algebricamente a MESMA cadeia — conferi

- `Q` da Sandvik = `vc·Dc·fn/4`. Substituindo `vc = πDcn/1000` na `Q` da Walter
  (`vf·π·Dc²/4000`) dá exatamente o mesmo. **Idênticas.**
- `Pc` da Sandvik = `Q·kc/60000` (com `Q` em cm³/min). É a `Pmot` da Walter com `η = 1`.
  **Idênticas; a Walter só acrescenta o rendimento.**
- `Mc`: Sandvik `Pc·30·10³/(π·n)` = `Pc·9549/n`. Walter: `Pc·9500/n`. **Idênticas** (9549 ≈ 9500).
  E a forma fechada da Walter, `Mc = Dc²·kc·f/8000`, sai da `Pc` da Sandvik por substituição direta —
  refiz a conta e o coeficiente bate em 1,250×10⁻⁴ = 1/8000. **Fecha exato.**

**Confiança da cadeia potência–torque–remoção em furação: `CONSENSO`.** Dois fabricantes grandes,
formulários independentes, álgebra idêntica.

## 2.1 — A espessura de cavaco não deformada na furação

**`h = fz × sin κ`**, com `fz = f / z`, onde `z` é o número de gumes principais (2 na broca
helicoidal comum). Portanto, para broca helicoidal de dois gumes:

> **`h = (fn / 2) × sin κ`**

**Confiança: `CONSENSO`** para a forma. A Walter publica `h = fz × sin κ` no formulário de furação;
a Sandvik usa `sin κr` no mesmo lugar da cadeia (na `Ff`) e trata a broca com `ap = Dc/2` — as duas
descrevem a broca como uma ferramenta de torneamento com `ap = Dc/2` e ângulo de posição `κ`.

**Símbolo por fonte:**

| Fonte | Símbolo da espessura | Símbolo do ângulo | Nome dado ao ângulo |
|---|---|---|---|
| Walter | `h` | `κ` | *Lead angle* |
| Sandvik Coromant (furação) | — (não publica `h` nesta folha) | `κr` | *Entering angle* |
| Sandvik Coromant (fresamento) | `hex` (máxima) e `hm` (média) | `κr` | *Entering angle* |

**Ponto de atenção para quem for implementar:** o formulário de furação da Sandvik **não publica
`h`** — publica `kc` como entrada já pronta. Quem quiser Kienzle em furação com símbolos Sandvik
precisa pegar `hex`/`hm` do formulário de fresamento e `κr` do de furação. A Walter é a única das duas
que fecha o circuito numa folha só.

## 2.2 — O ângulo de ponta entra como `κ`? Inteiro ou metade? — **METADE**

### A resposta: `κ = ângulo de ponta / 2`

**Isto NÃO está escrito com essas palavras em nenhum catálogo que eu abri.** Está forçado pela
fórmula que eles publicam. Declaro como **derivação minha sobre fórmula de fabricante**, não como
citação:

1. A broca de ponta plana (180°) corta com o gume **perpendicular ao avanço**. Nela a espessura de
   cavaco é o próprio avanço por dente: `h = fz`. A Walter comercializa exatamente essa ferramenta e
   a chama de ponta de **180°** (compêndio, seção B 1).
2. Em `h = fz × sin κ`, `h = fz` exige `sin κ = 1`, ou seja **`κ = 90°`**.
3. Logo, para a broca de 180°, `κ = 90° = 180°/2`. **`κ` é a metade do ângulo de ponta.**
4. Prova por absurdo do caminho errado: se `κ` fosse o ângulo de ponta inteiro, uma broca de 140°
   daria `sin 140° = 0,643` e uma de 118° daria `sin 118° = 0,883` — ou seja, **a broca mais chata
   produziria cavaco mais FINO que a mais aguda.** É o inverso do que a geometria faz. Com a metade,
   140° → `sin 70° = 0,940` e 118° → `sin 59° = 0,857`: a broca mais chata dá cavaco mais grosso, que
   é o comportamento real.

Fator `sin κ` para os ângulos de ponta que aparecem em catálogo:

| Ângulo de ponta | `κ = ponta/2` | `sin κ` | Efeito sobre `h` |
|---|---|---|---|
| 118° (broca HSS clássica) | 59° | 0,857 | referência |
| 130° | 65° | 0,906 | +6% |
| **135°** (comum em MD) | 67,5° | 0,924 | +8% |
| **140°** (Sandvik CoroDrill 460, Guhring RT 100 U) | 70° | 0,940 | +10% |
| 150° | 75° | 0,966 | +13% |
| 180° (ponta plana / flat bottom) | 90° | 1,000 | +17% |

**Consequência de produto — e é pequena, o que é uma boa notícia:** entre 118° e 140°, que cobre
quase toda a prateleira, o fator `sin κ` varia só de 0,857 a 0,940 — **10% de amplitude**. Ligar o
campo do ângulo de ponta ao motor **não vai mudar a rotação nem o avanço de saída**; vai mexer em
`kc`, e via `kc` em torque e potência, na casa de poucos por cento (`kc ∝ h^-mc`, com `mc` ≈ 0,2–0,3,
então 10% em `h` vira ~2–3% em `kc`). **O campo deve ser ligado por correção, não por urgência.**

**`LACUNA` honesta neste item:** não achei o enunciado explícito "κ = ângulo de ponta ÷ 2" escrito em
catálogo de fabricante. Achei a fórmula, achei a ferramenta de 180° que fecha o caso-limite, e fiz a
derivação. **Quem teria a frase literal:** livro-texto de mecânica do corte e norma de geometria de
ferramenta — fora do meu território por briefing.

## 2.3 — Essa espessura é a que entra no Kienzle? — SIM, e é o próprio fabricante que faz isso

A Walter publica, **na mesma folha de furação**, `kc = kc1.1 / h^mc` e `h = fz × sin κ`, e usa `kc`
em `Pmot`, `Mc` e `Ff`. Não há intermediário: **`h` da furação alimenta o Kienzle diretamente.**

A Sandvik chega ao mesmo lugar por outro caminho — publica a cadeia com `kc` como entrada e deixa a
obtenção de `kc` para a folha de material.

**Não encontrei prática divergente dentro do meu território.** Nenhum dos catálogos que abri propõe
uma segunda entrada (energia específica, `Rm`, dureza) no lugar de `h` para furação.
**Confiança: `CONSENSO` entre as duas fontes que publicam a cadeia completa; `NÃO ENCONTRADO` para
uma prática alternativa.**

### Uma diferença real entre as duas, que precisa entrar no canônico

A **força de avanço** é o único ponto em que as duas discordam:

| Fonte | `Ff` | Coeficiente efetivo (κ=70°) |
|---|---|---|
| Sandvik | `0,5 × kc × (Dc/2) × fn × sin κr` | 0,5 × 0,940 = **0,47** |
| Walter | `0,63 × (f × Dc × kc)/2` — **sem `sin κ`** | **0,63** |

**A Walter entrega 34% mais força de avanço que a Sandvik nas mesmas condições**, e não faz a
correção pelo ângulo de ponta. `SEM CONSENSO` no coeficiente; `CONSENSO` na forma (`Ff ∝ kc·Dc·fn`,
com `Dc/2` fazendo o papel de `ap`).
**Recomendação:** usar a da Walter (0,63, mais conservadora) se a saída for para dimensionar a força
de fixação da peça; usar a da Sandvik se a saída for comparativa. Declarar qual foi usada.

## 2.4 — O limite `h < 0,1 mm` vale em furação? E o avanço de partida cai abaixo dele?

### Resposta curta: **cai. E não é caso de borda — é a regra na metade da faixa do produto.**

Invertendo `h = (fn/2) · sin κ`, o avanço mínimo para que `h` chegue a 0,1 mm é:

> **`fn(h=0,1) = 0,2 / sin κ`**

| Ângulo de ponta | `fn` mínimo para `h = 0,1 mm` |
|---|---|
| 118° | **0,233 mm/rot** |
| 135° | **0,216 mm/rot** |
| 140° | **0,213 mm/rot** |
| 180° | 0,200 mm/rot |

**O limiar quase não depende do ângulo de ponta — e, o que é muito mais importante, NÃO depende do
diâmetro.** Qualquer broca helicoidal de dois gumes rodando **abaixo de ~0,21 mm/rot** está com `h`
abaixo de 0,1 mm, tenha ela 3 mm ou 30 mm.

Agora cruzando com os avanços de partida reais que apurei na Questão 1 (ponta 140°, `sin κ` = 0,940):

| Ferramenta / fonte | Ø (mm) | `fn` (mm/rot) | `h` calculado (mm) | Abaixo de 0,1? |
|---|---|---|---|---|
| Kennametal HPR, MD, P2, mínimo da faixa | 3 | 0,14 | 0,066 | **SIM** |
| Kennametal HPR, MD, P2, máximo da faixa | 3 | 0,29 | 0,136 | não |
| Kennametal HPR, MD, P2, mínimo | 8 | 0,21 | 0,099 | **SIM (na linha)** |
| Kennametal HPR, MD, P2, máximo | 8 | 0,43 | 0,202 | não |
| Kennametal HPR, MD, P2, mínimo | 12 | 0,27 | 0,127 | não |
| Kennametal HPR, MD, P2, mínimo | 20 | 0,39 | 0,183 | não |
| Morse, MD de uso geral, aço médio carbono | 12,7 | 0,203 | **0,095** | **SIM** |
| Dormer, MD de uso geral, grupo 1.3, código U | 12 | 0,201 | **0,094** | **SIM** |
| Morse, HSS/Co, aço médio carbono | 6,35 | 0,102 | **0,048** | **SIM (metade do limite)** |
| Morse, HSS/Co, aço médio carbono | 3,18 | 0,076 | **0,036** | **SIM (um terço)** |
| Morse, HSS/Co, aço médio carbono | 25,4 | 0,279 | 0,131 | não |
| ISCAR, U-drill XCMT, grupo 2, mínimo | qualquer | 0,05 | **0,024** | **SIM (um quarto)** |
| ISCAR, U-drill XCMT, grupo 2, máximo | qualquer | 0,15 | **0,071** | **SIM** |
| ISCAR, U-drill, aço temperado 55–60 HRC | qualquer | 0,04–0,05 | **0,019–0,024** | **SIM (5×)** |

### O veredito, e é o achado mais duro desta rodada

**O par de constantes de Kienzle sai da faixa de validade em furação para:**
1. **Toda broca de HSS-Co** em aço, em qualquer diâmetro abaixo de ~Ø25 — o `h` fica entre 0,036 e
   0,08 mm, de 20% a 60% do piso.
2. **Broca de metal duro de uso geral** (Morse, Dormer) até cerca de Ø20 — `h` ≈ 0,09–0,10.
3. **Todo o U-drill de insertos**, em qualquer diâmetro — `h` de 0,02 a 0,07 mm. **Aqui o desvio é de
   3 a 5×**, porque o U-drill trabalha com avanço por rotação baixo e constante.
4. **Todo aço temperado (55–60 HRC) e toda superliga**, onde o teto de avanço publicado é 0,05 mm/rot.

**Só escapa** a broca de metal duro de **alto desempenho** (Kennametal HPR e equivalentes) de Ø10
para cima, e mesmo assim só na metade superior da faixa de avanço publicada.

**Quantificação do erro, que é o que o enunciado pede.** Com `kc = kc1.1 · h^-mc` e `mc` típico de
aço, extrapolar de `h = 0,1` para `h = 0,05` (o caso do HSS-Co em Ø6) faz `kc` subir por um fator
`2^mc`. Com `mc = 0,25` isso é **+19%**; com `mc = 0,30`, **+23%**. E esse é o erro **se a
extrapolação da lei de potência ainda valesse** — a questão do enunciado é justamente que ela não
vale abaixo de 0,1, e o `kc` real sobe **mais** que a lei prevê. Ou seja: **o modelo subestima força,
torque e potência na região onde a maior parte das brocas do usuário de oficina brasileira trabalha.**

**`LACUNA` declarada:** **nenhum catálogo de fabricante que eu abri menciona o limite de validade
`h < 0,1 mm` do Kienzle.** Eles publicam `kc = kc1.1/h^mc` sem faixa de validade e sem ressalva. O
limite é conhecimento de literatura de mecânica do corte — **fora do meu território**. O que eu posso
afirmar, e afirmo, é o lado quantitativo: **onde quer que esse limite esteja em 0,1 mm, o avanço de
partida real de furação fica abaixo dele na maior parte dos casos.** Os valores de `mc` e `kc1.1` por
material a Walter remete à sua própria seção "General", página F7, que está em outro volume do
compêndio e que eu não abri nesta rodada — **fica como pendência de fonte, não como lacuna de
território.**

## 2.5 — Torque e potência em furação

Como a resposta de 2.3 foi que o Kienzle **se aplica**, este item vira confirmação em vez de
alternativa. As duas cadeias publicadas, equivalentes:

**Caminho Walter (uma folha só, fecha do avanço ao torque):**
```
fz  = f / z                       z = 2 na broca helicoidal
h   = fz × sin κ                  κ = ângulo de ponta / 2
kc  = kc1.1 / h^mc
Q   = vf × π × Dc² / (4 × 1000)              [cm³/min]
Pc  = Q × kc / 60000                          [kW]  (potência efetiva)
Pmot= Pc / η                                  [kW]  η = 0,7 a 0,95
Mc  = Dc² × kc × f / 8000  =  Pc × 9500 / n   [Nm]
Ff  = 0,63 × f × Dc × kc / 2                  [N]
```

**Caminho Sandvik (mesma coisa, escrita em `vc`):**
```
Q   = vc × Dc × fn / 4                        [cm³/min]
Pc  = vc × Dc × fn × kc / (240 × 10³)         [kW]
Mc  = Pc × 30 × 10³ / (π × n)                 [Nm]
Ff  ≈ 0,5 × kc × (Dc/2) × fn × sin κr         [N]
```

**Validação empírica disponível, que eu recomendo usar para calibrar o motor:** a Walter publica, nas
páginas B 59 a B 61 do mesmo compêndio, **cartas de potência, força de avanço e torque × avanço**,
uma curva por diâmetro de Ø12 a Ø38, para três materiais nomeados — **C45 (1.0503), Rm = 650 N/mm²**;
**42CrMo4, Rm = 750–900 N/mm²**; **GG25 (0.6025), 180–200 HB** — com broca de insertos D4140/D4240 e
a condição declarada **vc = 100 m/min**. A fonte diz que a potência é **diretamente proporcional a
`vc`** (dobrou `vc`, dobrou `Pc`), o que permite escalar. As curvas são gráficos, não tabela: para
usar como validação seria preciso ler ponto a ponto na figura — **eu não vou transcrever número de
gráfico, porque leitura de curva não é fonte citável.** Registro a existência e a localização.

A Guhring publica cartas equivalentes (potência e torque × diâmetro, envelope min/max) para aço
1000 N/mm², ferro fundido e AlSi7, com brocas RT 100 / RT 150 — também em gráfico.

---

# QUESTÃO 3 — Velocidade de corte no roscamento com macho

## Veredito de abertura: o defeito relatado é real e é maior do que o enunciado diz

O enunciado diz que a regra do produto entrega **140 m/min num macho M8 em aço 1045**. O valor de
catálogo de fabricante para essa exata condição é **15,8 a 18,0 m/min**. **O erro é de 8×, não de
2× nem de 3×.** Em M8 isso é 5.570 rpm contra as ~630–715 rpm que o catálogo sustenta.

Não é margem de modelo: é família errada. Nenhum ±25% cobre 8×.

## 3.1 — Velocidade de corte com macho de CORTE, por material e substrato

**Fonte:** Precision Dormer / Dormer Pramet, *Main Catalog*, tabelas AMG de machos — *Straight Flute
Taps* (p. 186), *Spiral Point Taps* (p. 190) e *Spiral Flute Taps* (p. 194).
`cdn.grovesindustrial.com/pdf/sds/Precision_Dormer_097602_Catalog.pdf`
**Condição declarada pela fonte:** machos HSS / HSS-E; valor em SFM; conversão para m/min minha.
A fonte **não** publica velocidade separada por diâmetro do macho — a velocidade é **por material e
por geometria do macho**, e o diâmetro entra só na conversão para rpm.

| Material (grupo AMG) | Dureza | Macho canal reto (m/min) | Macho ponta helicoidal / spiral point (m/min) | Macho canal helicoidal / spiral flute (m/min) |
|---|---|---|---|---|
| 1.1 Aço de corte fácil 12L14 | <120 HB | 21,9 | 25,0 | 25,0 |
| 1.2 Aço estrutural / cementação 1005–1025, A36 | <200 HB | 20,1 | 21,9 | 21,9 |
| **1.3 Aço carbono comum 1030–1060, 1144–1146** (o 1045) | **<250 HB** | **15,8** | **18,0** | **18,0** |
| 1.4 Aço ligado 4140, 4340, 8620, P20, D2 | <250 HB | 11,9 | 15,8 | 15,8 |
| 1.5 Aço ligado temperado e revenido | 250–350 HB | 7,0 | 10,1 | 10,1 |
| 1.6 Aço ligado temperado e revenido | >350 HB | 4,0 | 4,9 | 4,9 |
| **1.7 Aço ferramenta temperado** A2, D2, H13, M2 | **49–55 HRC** | **6,1** | — | — |
| **1.8 Aço ferramenta temperado** | **55–63 HRC** | **4,0** | — | — |
| 2.1 Inox de usinagem livre 303, 416, 440F | <250 HB | — | 7,0–7,9 | 7,0 |
| **2.2 Inox austenítico 304, 316, 321** | <250 HB | — | **6,1** (e 7,0 numa das linhas) | **6,1** |
| 2.3 Inox ferrítico/martensítico, duplex | <300 HB | — | 4,0–4,9 | 4,0 |
| 3.1 Fofo cinzento classe 20 | <150 HB | 60,0 e 11,9 (duas linhas de produto) | 14,9 | — |
| 3.2 Fofo cinzento GG25–GG40 | 150–300 HB | 29,9 e 7,0 | 7,9 | — |
| 3.3 Fofo nodular GGG40–GGG70 | <200 HB | 10,1 | 14,9 | — |
| 4.1 Ti comercialmente puro | <200 HB | — | 10,1 | 10,1 |
| 4.2 Ti liga 6Al4V | <270 HB | — | 4,9 | 4,9 |
| 5.1 Ni puro | <150 HB | — | 11,9 | 11,9 |
| 5.2 Ni liga Monel, Inconel 625, Hastelloy | <270 HB | — | 4,9 | 4,9 |
| 6.2 Latão / bronze | <200 HB | 29,9 | 29,9 | — |
| 6.3 Latão alfa, cavaco longo | <200 HB | 20,1 | 20,1 | — |
| 7.1 Al / Mg puro | <100 HB | — | 15,8 | 15,8 |
| **7.2 Al ligado Si<0,5% (6061 T6, 7075)** | <150 HB | — | **35,1** | **35,1** |
| 7.3 Al ligado Si 0,5–10% (380, 390) | <120 HB | 20,1 | 20,1 | 20,1 |
| 7.4 Al ligado Si>10% / Mg | <120 HB | 60,0 e 14,9 | 14,9 | 14,9 |

**Confiança: `REFERÊNCIA ÚNICA`** (um catálogo, três famílias de macho). A convergência interna entre
as três geometrias é alta, o que dá robustez à ordem de grandeza.

**Ordem de grandeza que o produto precisa gravar: macho de corte HSS em aço ISO P é ferramenta de
4 a 25 m/min.** O teto absoluto de toda a tabela — em alumínio 6061 — é 35 m/min.

### Substrato: metal duro em macho — `LACUNA`

A tabela acima é de macho **HSS / HSS-E**. As linhas duplas em ferro fundido (60,0 e 11,9 m/min em
3.1) sugerem que uma das colunas de produto é macho de metal duro, mas **o catálogo não rotula a
coluna com o substrato de forma que eu possa afirmar sem risco**, e eu não vou atribuir um número a um
substrato por dedução.

**`LACUNA` declarada: velocidade de corte de macho de corte de METAL DURO, por material, não fechada
neste bloco.** O que é seguro dizer, e vem da própria tabela: o macho de MD existe e é aplicado
**principalmente em ferro fundido**, onde a velocidade publicada sobe para a faixa de **30–60 m/min**
— 4 a 5× a do HSS no mesmo material. Em aço, o macho de MD não aparece nas colunas.

**Consequência de produto (Regra 6, perigo quantificado):** um seletor "MD vs HSS-Co" que multiplique
a velocidade do macho por um fator de substrato **inventa uma ferramenta que a maior parte dos
catálogos não vende**. Macho de MD em aço 1045 não é um produto de prateleira; a calculadora não
deveria oferecê-lo como se fosse.

## 3.1 (continuação) — Segunda fonte independente, e a dispersão

**Fonte:** Viking Drill and Tool, *Tapping Feed and Speed* (tabela do fabricante),
`vikingdrill.com/viking-Tap-FeedandSpeed.php`. Valores em SFM; conversão minha.

| Material (nome da fonte) | vc (m/min) |
|---|---|
| Aço doce (mild steel) | 9,1–15,2 |
| **Aço médio carbono** (a linha do 1045) | **10,7** |
| Aço ferramenta | 4,6–7,6 |
| Inox série 300 (austenítico) | 3,0–6,1 |
| Inox série 400 | 4,6 |
| Fofo cinzento | 9,1–18,3 |
| Fofo nodular | 15,2 |
| Fofo ligado | 4,6–9,1 |
| Alumínio fundido | 18,3 |
| Alumínio injetado | 21,3 |
| Alumínio trabalhado (wrought) | 24,4 |
| Latão | 18,3–30,5 |
| Bronze | 9,1–12,2 |
| Cobre | 18,3–24,4 |
| Ligas de titânio | 3,0 |
| Ligas de níquel | 3,0 |

Regra de correção por geometria, publicada pela mesma fonte: **reduzir** a velocidade com macho de
canal helicoidal ou de fundo (*bottom lead*); **aumentar** com macho de ponta helicoidal
(*spiral point*).

### Dispersão entre as duas fontes — aço médio carbono

| Fonte | vc (m/min) |
|---|---|
| Viking Drill, aço médio carbono | 10,7 |
| Dormer, grupo 1.3 (1030–1060), macho canal reto | 15,8 |
| Dormer, grupo 1.3, macho ponta/canal helicoidal | 18,0 |

**Dispersão de 1,7× entre fontes.** Nada perto dos 8× do defeito relatado. **Confiança da faixa
`CONSENSO`: macho de corte HSS em aço 1045 vive entre 10 e 18 m/min.** Recomendo **14 m/min** como
partida (meio geométrico), com a faixa 10–18 exposta.

Divergência a registrar em vez de apagar: a Viking manda **reduzir** no canal helicoidal; a Dormer dá
ao canal helicoidal a **mesma** velocidade da ponta helicoidal, ambas acima do canal reto. As duas
concordam que **ponta helicoidal > canal reto**; discordam sobre o canal helicoidal.

## 3.2 — Macho de CONFORMAÇÃO (laminação de rosca), e onde é contraindicado

**Fonte:** mesma, *Thread Forming Taps*, p. 196 (estilos E029, E064, E039, E074).

| Material (grupo AMG) | Dureza | vc (m/min) — estilos E029/E039 | vc (m/min) — estilos E064/E074 |
|---|---|---|---|
| 1.1 Aço de corte fácil 12L14 | <120 HB | 54,9 | 29,9 |
| 1.2 Aço estrutural / cementação | <200 HB | 50,0 | 27,1 |
| **1.3 Aço carbono comum 1030–1060** (o 1045) | **<250 HB** | **45,1** | **22,9** |
| 1.4 Aço ligado 4140, 4340, 8620 | <250 HB | 39,9 | 20,1 |
| 1.5 Aço ligado temperado e revenido | 250–350 HB | 20,1 | 20,1 |
| 2.1 Inox de usinagem livre | <250 HB | 18,0 | 18,0 |
| 2.2 Inox austenítico 304, 316 | <250 HB | 14,9 | 14,9 |
| 2.3 Inox ferrítico/martensítico, duplex | <300 HB | 10,1 | 10,1 |
| 4.1 Ti comercialmente puro | <200 HB | 35,1 | 35,1 |
| 5.1 Ni puro | <150 HB | 20,1 | 20,1 |
| 5.2 Ni liga Monel, Inconel | <270 HB | 7,9 | 7,9 |
| 6.1 Cobre puro | <100 HB | 25,0 | 25,0 |
| 6.3 Latão alfa | <200 HB | 39,9 | 39,9 |
| 7.1 Al / Mg puro | <100 HB | 39,9 | 21,9 |
| **7.2 Al ligado Si<0,5% (6061 T6, 7075)** | <150 HB | **54,9** | 38,1 |
| 7.3 Al ligado Si 0,5–10% | <120 HB | 39,9 | 21,9 |
| 7.4 Al ligado Si>10% / Mg | <120 HB | 25,0 | 25,0 |

### O achado forte: o macho de conformação roda 2,5 a 3× MAIS RÁPIDO que o de corte

Mesmo material, mesmo catálogo, aço 1045 (grupo 1.3):

| Ferramenta | vc (m/min) | rpm em M8 |
|---|---|---|
| Macho de **corte**, canal reto | 15,8 | 630 |
| Macho de **corte**, ponta/canal helicoidal | 18,0 | 715 |
| **Macho de conformação** | **45,1** | **1.795** |

**Confiança: `REFERÊNCIA ÚNICA`, mas com mecanismo coerente** — o macho de conformação não corta, ele
deforma; não gera cavaco, então não tem o gargalo de evacuação que limita o macho de corte. É por isso
que aceita quase o triplo da velocidade. **Um produto que trate "macho" como uma família só erra por
3× na direção conservadora (perde produtividade) ou por 3× na direção perigosa, dependendo de qual dos
dois ele calibrar.**

### Onde o macho de conformação é CONTRAINDICADO — a fonte responde por omissão explícita

Na tabela de *Thread Forming Taps* as linhas abaixo estão **em branco**, enquanto as mesmas linhas
têm valor nas tabelas de macho de corte. A ausência é a recomendação:

| Grupo em branco | Material |
|---|---|
| **3.1, 3.2, 3.3, 3.4** | **Todo o ferro fundido** — cinzento, nodular e maleável |
| **1.6** | Aço ligado temperado e revenido acima de **350 HB** |
| **1.7 e 1.8** | Aço ferramenta temperado, 49–55 HRC e 55–63 HRC |
| **2.4** | Inox endurecido por precipitação (15-5PH, 17-4PH) |
| **4.2** | Titânio ligado (Ti-6Al-4V) |

**Leitura física, coerente com o mecanismo:** o macho de conformação exige que o material **flua
plasticamente**. Ferro fundido cinzento não flui — a grafita lamelar trinca; o material esmigalha em
vez de escoar, e a rosca sai rasgada. Aço acima de ~350 HB e aço temperado não têm ductilidade
suficiente e quebram o macho.

**Perigo quantificado (Regra 6):** se a calculadora oferecer macho de conformação em ferro fundido
e entregar 45 m/min, o resultado não é rosca ruim, é **macho quebrado dentro da peça** — a peça vira
sucata, porque macho quebrado em furo roscado não sai por usinagem convencional.

**Regra de produto que eu proponho, derivada dessa tabela:** o seletor de macho de conformação deve
ser **bloqueado**, não só desaconselhado, para ferro fundido, aço >350 HB e aço temperado. É a única
família desta rodada em que o material **elimina** a ferramenta, em vez de só mudar o número.

---

## 3.3 — A velocidade do roscamento se deriva da do fresamento por um fator? — RESPOSTA: NÃO

**É tabela própria e independente. Nenhuma fonte de fabricante que eu abri publica um fator de
família que ligue roscamento a fresamento ou a furação.** E a evidência mais forte é estrutural: o
catálogo da Dormer publica **uma tabela AMG separada para cada família de ferramenta** — broca de MD,
broca HSS, alargador, escareador, macho reto, macho ponta helicoidal, macho canal helicoidal, macho de
conformação, fresa de MD, fresa HSS. Cada uma com sua própria coluna de velocidade para o **mesmo**
grupo de material. Se existisse um fator, o catálogo teria uma tabela e um multiplicador.

Mesmo catálogo, mesma linha de material (1.3, aço carbono 1030–1060, <250 HB):

| Família | vc (m/min) | razão contra a broca de MD |
|---|---|---|
| Broca de metal duro inteiriça | 85,0 (e 64,9 noutro estilo) | 1,00 |
| Macho de conformação | 45,1 | 0,53 |
| Escareador | 20,1 | 0,24 |
| **Macho de corte, ponta/canal helicoidal** | **18,0** | **0,21** |
| **Macho de corte, canal reto** | **15,8** | **0,19** |
| Alargador | 15,8 | 0,19 |

**Confiança: `CONSENSO` para a conclusão negativa** (nenhuma das fontes abre um fator), com a tabela
acima como `REFERÊNCIA ÚNICA`.

### O que existe no lugar do fator, e serve de âncora sanitária

Comparando fontes diferentes, mesmo material (aço médio carbono), **mesmo substrato HSS**:

| Ferramenta HSS | vc (m/min) | Fonte |
|---|---|---|
| Broca helicoidal HSS/Co | 18,3 | Morse |
| Macho de corte | 15,8–18,0 | Dormer |
| Macho de corte | 10,7 | Viking |
| Alargador | 15,8 | Dormer |

**O macho de corte anda na velocidade de uma BROCA DE HSS, não de uma ferramenta de metal duro.**
Essa é a raiz do defeito de 8× relatado no enunciado: o produto aplicou ao macho um **fator de
substrato de metal duro** a uma ferramenta cujo valor de catálogo é de HSS. A conta 140 m/min ≈ 18
m/min × 8 bate com "velocidade de fresamento de MD em 1045" no lugar de "velocidade de macho HSS".

**Regra de produto que eu recomendo, e que não é um fator de família — é uma trava:**
`vc` de macho **nunca** é derivada; vem de tabela própria, e o produto deve ter um **teto duro** —
por exemplo 40 m/min para macho de corte e 60 m/min para macho de conformação — acima do qual o
resultado é recusado, não apenas alertado. Nenhum valor de catálogo de macho de corte que eu abri
passa de 35 m/min (e esse é alumínio 6061).

## 3.4 — Limite de rotação que não é de corte

**Fonte:** EMUGE-FRANKEN, *Speedsynchro® Mini* (folheto técnico, ZP10147 GB Rev. A, 09/2022),
`emuge.sk/.../ZP10147_GB_RevA_EMUGE_Speedsynchro_Mini.pdf`.

**O fabricante declara o limite, e ele é da MÁQUINA, não do corte:** em roscamento síncrono os
eixos-árvore **não alcançam a rotação programada acima de certa rotação de eixo-árvore**. O produto
que a EMUGE vende para contornar isso é um **multiplicador mecânico** dentro do porta-ferramenta.

Números publicados, do Speedsynchro Mini:

| Grandeza | Valor |
|---|---|
| Relação de transmissão do porta-macho | **1 : 4,412** (rotação da ferramenta = 441% da do eixo-árvore) |
| Rotação máxima do eixo-árvore (com este porta-ferramenta) | **2.700 rpm** |
| Rotação máxima da ferramenta | **11.912 rpm** |
| Roscamento síncrono possível até | **12.000 rpm** |
| Compensação axial mínima embutida | **± 0,5 mm** |
| Faixa de rosca | M1 a M6 |
| Pressão máx. de refrigeração na entrada | 70 bar |
| Ganho de ciclo medido (24 roscas M2) | −14% a 4.000 rpm · −25% a 6.000 · −34% a 8.000 · −39% a 10.000 · −37% a 11.912 |

**Confiança: `REFERÊNCIA ÚNICA`.** É um fabricante, e o número de 2.700 rpm é o limite **deste
porta-ferramenta específico** em cone BT 30 para Brother Speedio e FANUC Robodrill — não um limite
universal de máquina. O que generaliza é o **fenômeno**, declarado pelo fabricante: existe um teto de
rotação para o ciclo síncrono que é da máquina, e ele fica **abaixo** da rotação que o corte
permitiria.

**Nota curiosa e útil, dos dados de ciclo:** o ganho de tempo **para de crescer** entre 10.000 e
11.912 rpm (−39% cai para −37%). Ou seja, o próprio fabricante mostra que **acima de ~10.000 rpm a
rotação extra não compra mais tempo** — o ciclo passa a ser dominado pela aceleração, desaceleração e
inversão, não pelo corte. Isso é exatamente o tipo de teto que o produto precisa mostrar.

**O que continua `LACUNA` neste item:** não achei publicado, em catálogo de fabricante, (a) um teto
de rotação de roscamento em função do **comprimento roscado**, nem (b) um limiar de rotação a partir
do qual a **inversão na saída** passa a ser o gargalo, com número. Achei o mecanismo, não o número.
**Quem teria:** manual do fabricante do comando/máquina (Fanuc, Siemens, Brother) para o ciclo de
roscamento rígido — que não é fabricante de ferramenta e portanto está fora do meu território.

## 3.5 — O avanço no roscamento é travado no passo (`vf = P × n`)?

### Confirmado — com uma ressalva física que o produto deveria mostrar

**Confirmado.** As fontes de fabricante tratam o avanço de roscamento como determinado pelo passo:
a Sandvik Coromant lista, em *Threading formulas and definitions*, fórmulas de rotação e avanço para
roscamento com macho em que **o avanço acompanha o passo**; a Viking Drill publica o avanço de macho
como fórmula de passo ("Feed Rate for UNC/UNF Taps", "Feed Rate for M/MF Taps"), não como valor
tabelado. **Em roscamento o avanço não é um grau de liberdade — não há o que otimizar.**
Confiança: `CONSENSO`.

### A ressalva: existe correção usada na prática, e ela é MECÂNICA, não numérica

A igualdade `vf = P × n` é o **comando**. O que quebra é a execução, e o fabricante trata isso com
hardware, não com um número no programa:

| Correção | O que é | Fonte |
|---|---|---|
| **Compensação axial mínima** | O porta-macho tem uma folga elástica embutida de **± 0,5 mm** que absorve o erro de sincronismo entre rotação e avanço. Não é um macho flutuante clássico de vários milímetros — é um alívio curto e mola | EMUGE, *Speedsynchro Mini*: "Minimum length compensation ± 0,5 mm" |
| **Softsynchro** | Transmissão axial de força **separada** da de torque, por molas de elastômero, "para compensar os erros de sincronismo que surgem" — vida de ferramenta maior | EMUGE, *Softsynchro / Speedsynchro* |
| Efeito medido | O folheto traz um gráfico de **força axial** no macho em M2, comparando roscamento síncrono puro contra o mesmo com compensação: a compensação **reduz a força axial** | EMUGE, *Speedsynchro Mini*, p. 6 |

**Leitura para o produto — e isso responde direto à pergunta:**
`vf = P × n` está **certo** e deve continuar travado na tela: o operador não deve poder editar o
avanço de roscamento. O que existe na prática **não é um alívio de passo programado** — é um
**porta-ferramenta que absorve ± 0,5 mm**. A correção mora no ferramental, não no CNC.

**Consequência prática que vale um alerta:** se a oficina rosca com mandril rígido sem nenhuma
compensação, o erro de sincronismo do eixo-árvore vira **força axial no macho**, e o pico acontece
**no ponto de inversão da rotação na saída**. Esse é o momento em que o macho quebra. Um produto que
entrega rotação e avanço de roscamento sem dizer isso está entregando meia resposta.

**`LACUNA`:** não achei publicado por fabricante de ferramenta um valor numérico de erro de
sincronismo tolerável (em graus ou em mm por rotação), nem o quanto de força axial extra cada 0,01 mm
de erro produz. **Quem teria:** o fabricante do comando/eixo-árvore.

---

# QUESTÃO 4 — Taxa de remoção de material em mandrilamento

## 4.1 — A fórmula, com fonte

**Fonte:** WALTER, *Technical Compendium – Holemaking*, edição 2024, página **B 96**, "Calculation
formulae for boring and precision boring".

> **`Q = vf × π × (Dc² − Dp²) / (4 × 1000)`  [cm³/min]**

Símbolos, como a fonte define: `Dc` = diâmetro de corte (o diâmetro **final**, mm); `Dp` = **start
hole**, o furo de partida (mm); `vf` = avanço de mesa (mm/min); `Q` em cm³/min.

Como o enunciado pede a fórmula a partir de diâmetro inicial, diâmetro final, avanço por rotação e
rotação, substituindo `vf = f × n`:

> **`Q = π × (D_final² − D_inicial²) × fn × n / 4000`  [cm³/min]**
> com diâmetros em mm, `fn` em mm/rot, `n` em rpm.

**Confiança: `REFERÊNCIA ÚNICA`** para a fórmula literal (só a Walter publica esta forma nas fontes
que abri), **mas `CONSENSO` para o resultado**, porque a forma equivalente sai também das definições
da Sandvik — ver abaixo.

### A forma equivalente, em `vc` e `ap` (confirmada por álgebra, não por citação)

> **`Q = vc × ap × fn × (1 − ap/Dc)`  [cm³/min]**

Verifiquei a identidade: com `ap = (Dc − Dp)/2` e `vc = π·Dc·n/1000`, tem-se
`ap·(Dc − ap) = (Dc² − Dp²)/4`, e as duas expressões coincidem termo a termo. A segunda é a fórmula
de torneamento (`Q = vc·ap·fn`) com a correção de diâmetro médio `(1 − ap/Dc)`, que é exatamente o
fator que a **Sandvik Coromant** publica na potência do mandrilamento
(`Pc = vc·ap·fn·kc/(60×10³) × (1 − ap/Dc)`, folha H 83).

### ⚠ Erro na folha de mandrilamento da Sandvik — não copie de lá

A folha *Formulas and definitions for boring – METRIC* (H 83) da Sandvik Coromant publica

> `Q = vc × Dc × fn / 4`

que é **a fórmula da FURAÇÃO** — a do furo cheio, e ela **superestima** a remoção do mandrilamento,
porque conta o material do furo de partida como se tivesse sido removido. Não é interpretação minha:
na mesma folha, a tabela de símbolos descreve `Dc` como **"Drill diameter"** — diâmetro de **broca** —
numa folha cujo título é *boring*. É reaproveitamento de página, não um modelo alternativo.

**Quantificando o estrago:** mandrilar de Ø40 para Ø44, `ap` = 2 mm. A remoção correta é proporcional
a `(44² − 40²) = 336`; a fórmula da folha usa `44² = 1936`. **Erro de 5,8×.** Quanto menor o
sobremetal, pior: de Ø40 para Ø41 o erro é **23×**.

**Confiança: `SEM CONSENSO` entre as duas folhas, com uma delas demonstravelmente inconsistente com
a própria definição de `ap` que a mesma empresa publica na sua página de conhecimento de
mandrilamento.** Use a da Walter.

## 4.2 — A literatura trata o mandrilamento como torneamento interno? — SIM, explicitamente

Três evidências independentes, dentro do meu território:

**1. ISCAR publica os dois na MESMA coluna.** Na folha *Recommended Cutting Conditions for XCMT-MF
Inserts (Metric)*, a tabela de parâmetros tem três colunas: **"Drilling"**, **"Turning & Boring"** e
**"Grooving"**. Torneamento e mandrilamento dividem uma coluna só — o fabricante não os separa.

**2. WALTER usa a cadeia de torneamento na folha de mandrilamento.** A página B 96 traz
`f = fz × z` e `h = fz × sin κ` — o `κ` de ângulo de posição, a espessura de cavaco do torneamento —
e `Ff = 0,63 × f × (Dc − Dp) × kc / 2`, em que `(Dc − Dp)/2` ocupa o lugar do `ap`.

**3. SANDVIK define `ap` de mandrilamento como raio.** Ver 4.3.

### A fórmula do torneamento com a adaptação, para o produto

| Grandeza | Torneamento | Mandrilamento (a adaptação) |
|---|---|---|
| Profundidade de corte | `ap` dada | **`ap = (D_final − D_inicial)/2`** |
| Diâmetro para `vc` | diâmetro usinado | **`Dc` = diâmetro FINAL** (o maior) |
| Avanço por rotação | `fn` | `fn = fz × z` (`z` = nº de gumes; **`z = 1` em mandrilamento por passos**, conforme a Sandvik declara) |
| Espessura de cavaco | `h = fn × sin κr` | `h = fz × sin κ` |
| Taxa de remoção | `Q = vc·ap·fn` | **`Q = vc·ap·fn·(1 − ap/Dc)`** — o fator novo corrige `vc` do diâmetro externo para o diâmetro médio do anel |
| Potência efetiva | `Pc = vc·ap·fn·kc/(60×10³)` | `Pc = Q × kc / 6000` (Walter) — algebricamente a mesma com a correção acima |
| Torque | — | `Mc = Pc × 9500 / n` |
| Força de avanço | `Ff = 0,5·kc·ap·fn·sin κr` (Sandvik) | `Ff = 0,63 × f × (Dc − Dp) × kc / 2` (Walter) |

**O único termo novo em relação ao torneamento é `(1 − ap/Dc)`.** Ele importa quando o sobremetal é
grande em relação ao furo: desbaste de Ø40 para Ø60 (`ap` = 10, `Dc` = 60) dá `1 − 10/60 = 0,83` —
17% a menos de potência do que a conta de torneamento cru. Em mandrilamento de acabamento
(`ap` = 0,2 mm em Ø50) o fator é 0,996 e pode ser ignorado.

### Dado de corte de mandrilamento — `REFERÊNCIA ÚNICA`

Da mesma folha da ISCAR, coluna **Turning & Boring** (que é a que vale para mandrilar):

| ISO | Material (condição / dureza declarada) | vc (m/min) | fn (mm/rot) |
|---|---|---|---|
| P | não ligado <0,25% C, recozido, 125 HB | 140–280 | 0,04–0,14 |
| **P** | **não ligado ≥0,25% C, recozido, 190 HB** — o 1045 | **90–200** | **0,04–0,12** |
| P | <0,55% C temperado e revenido, 250 HB | 100–200 | 0,04–0,15 |
| P | baixa liga recozido, 200 HB | 100–200 | 0,04–0,15 |
| P | baixa liga temp. e revenido, 275–350 HB | 80–180 | 0,07–0,12 |
| P | alta liga / ferramenta recozido, 200 HB | 80–200 | 0,04–0,12 |
| P | alta liga / ferramenta temperado, 325 HB | 60–150 | 0,04–0,12 |
| P | inox ferrítico / martensítico, 200–240 HB | 60–230 | 0,07–0,12 |
| **M** | **inox austenítico / duplex, 180 HB** | 60–230 | 0,07–0,12 |
| **K** | **fofo cinzento e nodular, 160–260 HB** | 120–230 | 0,07–0,20 |
| K | fofo maleável | — | 0,04–0,13 |
| **N** | **alumínio, forjado e fundido** | 120–700 | 0,04–0,25 |
| N | ligas de cobre / latão | 80–500 | 0,04–0,20 |
| S | superligas Fe / Ni / Co | 20–80 | 0,04–0,05 |
| S | titânio | 30–100 | 0,04–0,05 |
| **H** | **aço temperado 55–60 HRC**; fofo coquilhado | 20–70 | 0,04–0,05 |

**Observação de produto:** o avanço de mandrilamento é **muito mais estreito** que o de furação —
0,04 a 0,25 mm/rot em toda a tabela, contra 0,05 a 0,87 na furação. Faz sentido: mandrilar é operação
de tolerância e acabamento, não de remoção. **A tela de mandrilar não deveria oferecer a mesma
amplitude de avanço que a de furar.**

## 4.3 — A profundidade de corte é metade da diferença dos diâmetros? — **CONFIRMADO**

**`ap = (D_final − D_inicial) / 2`**

**Duas fontes, independentes, e nenhuma divergência encontrada:**

| Fonte | O que diz |
|---|---|
| **Sandvik Coromant**, página *Boring formulas and definitions* | define `ap` como **"the difference between the uncut and the cut hole radius"** — a diferença entre o **raio** do furo antes e depois. Diferença de raios = metade da diferença de diâmetros |
| **Walter**, compêndio B 96 | na força de avanço, `Ff = 0,63 × f × (Dc − Dp) × kc / 2` — o termo `(Dc − Dp)/2` ocupa exatamente a posição do `ap` na fórmula equivalente de torneamento |
| **Sandvik**, folha H 83 | `Pc = vc × ap × fn × kc/(60×10³) × (1 − ap/Dc)` e `Ff ≈ 0,5 × kc × ap × fn × sin κr` — `ap` como grandeza **radial**, no mesmo papel do torneamento |

**Confiança: `CONSENSO`.** **Nenhuma convenção divergente encontrada** — não achei nenhum catálogo
que trate `ap` de mandrilamento como a diferença de diâmetros inteira.

**Onde MORA a armadilha, e não é onde o enunciado supõe:** a confusão real não está no `ap`, está no
**diâmetro que alimenta `vc`**. Como o mandril varre um anel, existem três diâmetros defensáveis:
o inicial, o final e o médio. **Os dois fabricantes usam o diâmetro FINAL (`Dc`, o maior) para
calcular `vc` e `n`**, e depois corrigem a potência pelo fator `(1 − ap/Dc)`. Um produto que use o
diâmetro médio em `vc` e ainda aplique o `(1 − ap/Dc)` **aplica a correção duas vezes** e subestima a
potência. Vale gravar no canônico.

**Nota sobre a Sandvik declarar `zc = 1` para mandrilamento por passos** (*step boring*): quando a
barra tem dois gumes escalonados, cada um remove metade da profundidade e o avanço por gume é o
avanço por rotação inteiro. É a única exceção à conta `fn = fz × z`, e está publicada na folha H 83.

---

# LACUNAS

Cada linha: o que faltou, e a fonte que teria o dado, nomeada, com o motivo de estar fora do meu
território (catálogo e formação técnica de fabricante).

| # | Questão | O que ficou sem número | Quem teria o dado, e por que está fora do meu escopo |
|---|---|---|---|
| L1 | 1.1 | **Quanto o HSS-Co suporta a mais que o HSS comum.** A tabela da Morse é titulada "High Speed Steel **&** Cobalt" e dá um valor só para os dois | Norma de aço rápido e manual de engenharia de usinagem. Fora por briefing |
| L2 | 1.2 | **Tabela de `fn` de broca de centro/spot por diâmetro e material.** Achei um único ponto (GARANT: 0,03 mm/rot em aço <900 N/mm², ponta 90°, HSS-E), sem faixa de diâmetro | Norma de broca de centro (DIN 333) e tabelas de furação de handbook. Fora por briefing |
| L3 | 1.2 | **Alargador em alumínio.** A Dormer deixa a linha 7.x em branco nas séries que publicam dado — é recusa do fabricante, não omissão minha | Catálogo de fabricante especializado em alumínio, ou handbook |
| L4 | 1.3 | **Fator de correção de avanço por profundidade na faixa curta (3×D → 5×D → 8×D → 12×D), como multiplicador publicado.** Os fabricantes trocam a ferramenta e publicam tabela nova, em vez de um fator; a maior parte das folhas de aplicação **nem declara o comprimento da broca** | Machinery's Handbook traz redução de avanço por profundidade em porcentagem por faixa de L/D. Fora por briefing |
| L5 | 1.4 | **O piso do avanço — o valor abaixo do qual há encruamento e atrito, com consequência quantificada.** Nenhum catálogo publica limite inferior; publicam faixa min–max e param | Literatura de mecânica do corte (efeito de tamanho, espessura mínima de cavaco) — handbook e artigo acadêmico. Fora por briefing |
| L6 | 2.2 | **A frase literal "κ = ângulo de ponta ÷ 2".** Achei a fórmula (`h = fz·sin κ`), achei a ferramenta de ponta 180° que fecha o caso-limite, e derivei. Nenhum catálogo escreve a identificação em palavras | Livro-texto de mecânica do corte e norma de geometria de ferramenta. Fora por briefing |
| L7 | 2.4 | **O limite de validade `h < 0,1 mm` do Kienzle.** Nenhum catálogo que abri menciona faixa de validade para `kc = kc1.1/h^mc` — publicam a lei de potência sem ressalva | Literatura de mecânica do corte (o próprio trabalho de Kienzle e derivados) — artigo e handbook. Fora por briefing |
| L8 | 2.4 | **Valores de `kc1.1` e `mc` por material.** A Walter os usa e remete à seção "General" do seu compêndio, página F7, que está em outro volume que não abri nesta rodada | **Não é lacuna de território — é pendência de fonte.** O documento existe e é de fabricante: *Walter Technical Compendium – General*. Recuperável numa próxima rodada |
| L9 | 3.1 | **Velocidade de macho de corte de METAL DURO em aço, por material.** As colunas de produto da Dormer são identificadas por ícone de substrato, não por texto; não vou atribuir número a substrato por dedução. O que consegui: em ferro fundido a coluna alternativa sobe para 30–60 m/min, 4–5× o HSS | Catálogo com tabela de macho de MD rotulada em texto (OSG, Emuge, YG-1). Está **dentro** do meu território, mas não abriu: OSG bloqueou (HTTP 403) e a folha da Emuge que achei é de porta-ferramenta. Recuperável |
| L10 | 3.4 | **Teto de rotação de roscamento em função do comprimento roscado**, e o limiar em que a inversão na saída vira o gargalo, com número. Achei o mecanismo e um teto de produto (2.700 rpm de eixo-árvore, 12.000 rpm de ferramenta, EMUGE), não a regra geral | Manual do fabricante do comando / máquina (Fanuc, Siemens, Brother, Haas) para o ciclo de roscamento rígido. **Não é fabricante de ferramenta** — fora do meu território |
| L11 | 3.5 | **Erro de sincronismo tolerável (em grau ou mm/rot) e a força axial extra por unidade de erro.** Achei que a EMUGE embute ± 0,5 mm de compensação e que isso reduz a força axial; não achei a função | Fabricante de comando / eixo-árvore. Fora do meu território |
| L12 | 2.5 | **Validação numérica das cartas de potência, torque e força de avanço da Walter (C45 Rm 650; 42CrMo4 Rm 750–900; GG25 180–200 HB, `vc` = 100 m/min, brocas D4140/D4240)**. São gráficos; **não transcrevo número lido de curva** | Não é lacuna de território: é decisão de rigor. Se o projeto quiser, o dado existe e está localizado (compêndio Walter, p. B 59–B 61) |

---

# O QUE ME SURPREENDEU

## 1. O avanço não é proporcional ao diâmetro — é proporcional à RAIZ dele

Quatro catálogos, quatro famílias de ferramenta, mesma forma: `fn ∝ D^0,55 ± 0,1`, nunca `D^1`.
Kennametal (MD, expoente 0,40–0,77), Morse (HSS, 0,60–0,63), Dormer broca (0,57), Dormer alargador
(0,55), Dormer escareador (0,62).
**Consequência dura:** o `k` de uma regra `fn = k·D` varia **3×** ao longo da faixa Ø3–Ø20. Uma
calculadora que fixe `k` em 0,02 (calibrado por volta de Ø16) entrega **2,5× menos avanço** do que o
catálogo manda numa broca de 3 mm. Isso não é conservadorismo — em avanço baixo demais a broca
esfrega, encrua o fundo do furo e a vida despenca.
**Se eu tivesse que escrever uma linha no canônico:** `fn_partida ≈ 0,10 × √D` para aço ISO P com MD,
faixa `0,075·√D` a `0,155·√D`.

## 2. No U-drill o avanço NÃO escala com o diâmetro — de jeito nenhum

A ISCAR publica `fn` de broca de insertos **só por grupo de material**, com a mesma faixa valendo para
toda a linha de diâmetros. É a única família em que a regra do item 1 não se aplica, e a tela do
produto precisa saber disso antes de escrever a fórmula.

## 3. O limite `h < 0,1 mm` do Kienzle não é caso de borda em furação — é a REGRA

Invertendo a fórmula da Walter, o avanço que produz `h = 0,1 mm` é `0,2 / sin κ`, ou seja
**~0,21 mm/rot para qualquer broca de dois gumes com ponta de 140°, independentemente do diâmetro.**
Cruzando com os avanços de partida reais:

- toda broca de HSS-Co em aço abaixo de Ø25 → `h` = 0,036 a 0,08 mm (**20% a 60% do piso**);
- broca de MD de uso geral (Morse, Dormer) até ~Ø20 → `h` ≈ 0,09–0,10 (**na linha**);
- **todo U-drill, em qualquer diâmetro** → `h` = 0,02 a 0,07 (**3 a 5× abaixo**);
- aço temperado e superliga, onde o teto de avanço é 0,05 mm/rot → `h` ≈ 0,02.

Só escapa a broca de MD de alto desempenho de Ø10 para cima, e ainda assim só na metade superior da
faixa de avanço. **O motor Kienzle da calculadora vai operar fora da faixa de validade na maior parte
dos furos que o usuário-alvo faz.** O enunciado perguntou "cai abaixo?" esperando um caso de borda; a
resposta é que o caso de borda é o *outro* — furo grande com broca cara é a exceção.

## 4. O ângulo de ponta importa MUITO MENOS do que o enunciado teme

O enunciado chama 2.2 de "questão central da rodada". A fórmula existe e o campo deve ser ligado —
mas entre 118° e 140°, que cobre quase toda a prateleira, `sin κ` só varia de 0,857 a 0,940: **10%
em `h`**, que via `kc ∝ h^-mc` vira **2 a 3% em torque e potência**. E o ângulo **não toca** as duas
saídas de comando (rotação e avanço). É correção de segunda ordem, não destravamento.
**O que realmente destrava a tela de furar é o item 1 (a forma `√D`) e o item 3 (o piso do Kienzle).**

## 5. A folha de mandrilamento da Sandvik traz a fórmula de remoção da FURAÇÃO

A folha H 83, *Formulas and definitions for boring – METRIC*, publica `Q = vc × Dc × fn / 4` — o furo
cheio. E a tabela de símbolos da mesma folha chama `Dc` de **"Drill diameter"**. É reaproveitamento de
página. Quem copiar de lá **superestima a remoção em 5,8×** num mandrilamento de Ø40 para Ø44, e em
**23×** de Ø40 para Ø41. A fórmula correta é a da Walter, `Q = vf·π·(Dc² − Dp²)/4000`.

## 6. Duas erratas aparentes na página B 96 da Walter

Na mesma página que resolve a Questão 4:
- o quadro da taxa de remoção está **legendado "Metal removal rate (drilling from solid)"** numa
  página de mandrilamento — enquanto a fórmula dentro do quadro é corretamente a do mandrilamento
  (`Dc² − Dp²`). Legenda copiada da página de furação;
- o torque está escrito **`Mc = Pc × 9500 / η`**, com o rendimento no denominador. Na página de
  furação da mesma publicação está `Mc = Pc × 9500 / n`. Com `η` = 0,7–0,95 o resultado seria
  absurdo (torque ~10.000× a potência) e dimensionalmente errado. **É `n`, e o `η` é erro de
  digitação.**

Registro os dois porque quem for implementar vai copiar dessa página, que é a melhor que existe.

## 7. O macho não é ferramenta lenta por convenção — ele é ferramenta de HSS

Os 140 m/min do defeito relatado vêm de aplicar um **fator de substrato de metal duro** a uma
ferramenta cujo valor de catálogo é de HSS. Macho de corte em 1045: **10 a 18 m/min** (Viking 10,7;
Dormer 15,8–18,0). O teto de toda a tabela de macho de corte que apurei — em alumínio 6061 — é
**35 m/min**. O erro relatado é de **8×**, não de 2× nem 3×.
E o mecanismo do erro é reprodutível: `18 × 8 ≈ 144`. O produto trocou "velocidade de macho HSS" por
"velocidade de fresamento de MD" e chamou isso de fator de substrato.

## 8. Macho de conformação é 3× mais rápido — e o material pode ELIMINAR a ferramenta

Mesma condição (1045), macho de corte 15,8–18,0 m/min contra macho de conformação **45,1 m/min**.
Mas o achado que vale alerta de tela não é a velocidade: é que a tabela do fabricante deixa **em
branco todo o ferro fundido**, o aço acima de 350 HB, o aço temperado e o Ti-6Al-4V. A ausência é a
recomendação. **É a única família desta rodada em que o material não muda o número: elimina a
ferramenta.** Macho de conformação em ferro fundido não dá rosca ruim — dá macho quebrado dentro da
peça, e peça com macho quebrado vira sucata.

## 9. Alargador e escareador erram para lados OPOSTOS se herdarem a regra da broca

No mesmo Ø, aço 1045: broca de MD ~0,20–0,28 mm/rot · alargador **0,285** (2 a 3× a broca em
Ø12) · escareador **0,12** (2 a 3× MENOS que a broca em Ø16). Um produto que reaproveite a regra de
furação para as duas famílias erra por 2–3× em direções contrárias.

## 10. A faixa de segurança já está publicada — e é maior do que um alerta ingênuo suporia

Dormer titula a própria tabela de avanço de broca como **"± 25%"** e a de alargador como **"± 15%"**.
E, dentro do mesmo diâmetro e material, o máximo publicado é **1,8 a 2,2× o mínimo**. São duas coisas
diferentes: ±25% é tolerância do ponto de partida; ~2× é a faixa de uso legítima. **Um alerta que
dispare a 1,3× o valor de partida vai gritar em cima de metade do que o próprio fabricante publica.**

## 11. A redução de avanço na SAÍDA do furo não existe no produto, e é regra de fabricante

Guhring manda **reduzir para 40%** cerca de 1 mm antes do rompimento em saída oblíqua; CERATIZIT manda
**reduzir 50%** antes de sair. Duas fontes independentes, mesma regra. Isso não é um número de
partida — é uma instrução de ciclo, e é onde a broca lasca. Um produto que só entrega `n` e `vf`
está entregando meia resposta na furação passante.

## 12. O degrau grande de avanço em furo profundo não é onde se procura

Entre 15×D e 40×D, a Guhring reduz a velocidade para 0,72–1,00× e o avanço para 0,75–1,25× — e no
aço beneficiável não ligado, **a linha do 1045, não reduz nada**. O degrau real é entre broca
helicoidal e **broca de canhão**: 0,254 mm/rot contra **0,025** — **10×**. Se o produto oferecer broca
de canhão na tela de furar sem tabela própria, o número que ele der estará dez vezes alto.

## 13. O limite de rotação do roscamento é da máquina, e o próprio fabricante mostra onde ele para de valer

A EMUGE declara que, em ciclo síncrono, o eixo-árvore **não alcança a rotação programada** acima de
certa rotação — e vende engrenagem 1:4,412 para contornar. E o dado de ciclo dela mostra que o ganho
**para de crescer** entre 10.000 e 11.912 rpm (−39% vira −37%): acima de ~10.000 rpm a rotação extra
não compra mais tempo, porque o ciclo passa a ser dominado por aceleração, desaceleração e inversão.

## 14. A cadeia potência–torque de furação fecha EXATA entre Walter e Sandvik

Refiz a álgebra: `Mc = Dc²·kc·f/8000` (Walter) sai de `Pc = vc·Dc·fn·kc/240000` (Sandvik) por
substituição direta, e o coeficiente bate em 1/8000. `Q`, `Pc` e `Mc` são a mesma coisa escrita de
dois jeitos. **Numa rodada em que quase nada fechou em consenso, a cadeia de força de furação
fechou.** Se algo desta rodada pode virar canônico sem ressalva, é ela.

---

# FONTES

**12 fabricantes, 20 documentos distintos.** Todos dentro do território definido no briefing
(catálogo, guia de aplicação, folha de dado técnico, formulário e material de treinamento de
fabricante de ferramenta). Nenhuma norma, handbook, obra de referência acadêmica ou artigo foi citado.

| # | Fabricante | Documento | Usado em |
|---|---|---|---|
| 1 | Sandvik Coromant | *Drilling formulas and definitions* (página de conhecimento) | Q2 |
| 2 | Sandvik Coromant | *Formulas and definitions for drilling – METRIC*, folha H 81 | Q2, Q4 |
| 3 | Sandvik Coromant | *Formulas and definitions for boring – METRIC*, folha H 83 | Q4 |
| 4 | Sandvik Coromant | *Boring formulas and definitions* (página de conhecimento) | Q4.3 |
| 5 | Sandvik Coromant | *Threading formulas and definitions* (página de conhecimento) | Q3.5 |
| 6 | Sandvik Coromant | *Formulas and definitions for milling – INCH* | Q2.1 (símbolos `hex`/`hm`) |
| 7 | Kennametal | *HPR Drills Application Data* (métrico e polegada) | Q1.1, Q1.4, Q2.4 |
| 8 | Guhring | *Feed Force and Torque Requirements – Carbide Drills* | Q1.4, Q2.5 |
| 9 | Guhring | *Deep Hole Solutions* (catálogo, item 400147338, 06/2020) | Q1.3 |
| 10 | Guhring | Índice de *Speeds & Feeds* por série (alargadores 1675/1676/1685/1686) | Q1.2 (tentativa; PDFs são imagem, não renderam) |
| 11 | Morse Cutting Tools | *HSS & Cobalt Drills* e *Solid Carbide Drills – Speed and Feed Recommendations* (cat. p. 88–89) | Q1.1, Q2.4 |
| 12 | Precision Dormer / Dormer Pramet | *Main Catalog* (472 p.) — cartas de avanço de broca (p. 9–10), alargador (p. 438), escareador (p. 439) e tabelas AMG de broca de MD (p. 12), alargador (p. 440), escareador (p. 442), machos (p. 186, 190, 194, 196) | Q1.1, Q1.2, Q1.4, Q3.1, Q3.2, Q3.3 |
| 13 | ISCAR | *Recommended Cutting Conditions for XCMT-MF Inserts (Metric)* | Q1.2, Q2.4, Q4.2 |
| 14 | Walter | *Technical Compendium – Holemaking*, ed. 2024 (164 p.) — p. B 9 (furação), B 59–B 61 (cartas), B 96 (mandrilamento) | Q2.1–Q2.5, Q4.1–Q4.3 |
| 15 | Mitsubishi Materials | Página de fórmulas do curso técnico | Q2 (inventário) |
| 16 | CERATIZIT | *WTX Micro / Micropilot* — know-how de furação e mandrilamento | Q1.3, Q1.4 |
| 17 | EMUGE-FRANKEN | *Speedsynchro® Mini* (ZP10147 GB Rev. A, 09/2022) | Q3.4, Q3.5 |
| 18 | EMUGE-FRANKEN | *Softsynchro* — porta-machos com compensação mínima | Q3.5 |
| 19 | Hoffmann Group / GARANT | Ficha do *NC Spot Drill HSS-E 90°* | Q1.2 |
| 20 | Viking Drill and Tool | *Tapping Feed and Speed* | Q3.1, Q3.5 |

**Fontes tentadas e não abertas, registradas para quem retomar:** OSG *EXOTAP A-TAP Cutting Data*
(HTTP 403) · Kodiak Cutting Tools, *HSS & M42 Cobalt drills* (conexão recusada) · Redline Tools,
*Cobalt & HSS Drills Speeds & Feeds* (conexão recusada) · YG-1 *Dream Drills Cutting Conditions*
(HTTP 403) · Guhring, PDFs de *Speeds & Feeds* por série de alargador (são imagem digitalizada, sem
camada de texto) · Walter *Technical Compendium – General* (os valores de `kc1.1` e `mc`; não
localizei o arquivo nesta rodada).

---

**Fim do retorno.** Gravação incremental concluída — todas as quatro questões estão em disco.
