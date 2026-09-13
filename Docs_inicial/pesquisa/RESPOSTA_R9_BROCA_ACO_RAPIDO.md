# Resposta R9 — Broca de aço rápido: velocidade, avanço e passo do pica-pau

**Rodada:** R9 · **Data:** 05/09/2026 · **Conduzida por:** Ícaro
**Método:** quatro apurações independentes, uma por alvo, cada uma em subagente de contexto zero;
julgamento e redação do Ícaro.

**Status:** COMPLETA — os quatro alvos fecharam. O arquivo foi gravado **alvo a alvo, na ordem em que
cada um voltou**: 3, 4, 2, 1. As seções aparecem nessa ordem, não na numérica.

---

## Por que esta rodada existe

O Mestre propôs um modo de cálculo de partida para **broca de aço rápido**, a partir da prática dele
de chão de fábrica. A proposta usa `n = 318 × vc / D`, avanço igual a 10% da rotação, e um
"incremento" por diâmetro. Exemplo dele, Ø10 com `vc` 16: `318 × 16 = 5088 / 10` → **S508 · F50 ·
incremento 0,4**.

Três coisas já estavam fechadas antes desta rodada e **não foram reapuradas**:

- **`318` é `1000/π`.** O `CANONICO_MOTOR_DE_CALCULO §1.4` já usa `n = vc × 1000 / (π × D)`. Erro de
  0,1%.
- **O "incremento" é o passo do pica-pau em mm, não o avanço.** O `F50` do exemplo já é o avanço
  (10% de 508 → `fn` = 0,1 mm/rot), logo o `0,4` é grandeza separada. A prática do Mestre é
  `incremento = D / 25`, saturando em 0,8 mm — Ø5 → 0,2 · Ø10 → 0,4 · Ø14 → 0,56 · Ø20 → 0,8.
  Linear, não `√D`.
- **A lei `fn ≈ 0,08·√D` (`CANONICO_FURACAO §2.1`) continua de pé e não é o que o Mestre usa.** Ele
  usa `fn` = 0,1 fixo. As duas convivem no painel — decisão de produto já tomada, não é objeto desta
  apuração.

**O `vc` da prática do Mestre** — 12–16 m/min em material mais duro ou uso geral, 17–20 em mais mole,
16 no dia a dia — entra aqui como **alvo de comparação, nunca como fonte**.

**O buraco que a rodada fecha:** a Tabela A do `CANONICO_VELOCIDADES_E_AVANCOS §2.1` é de **fresa**
(cartas OSG, side milling e HSM) — verificado linha a linha, **não há uma única linha de broca ali**.
Nenhum canônico publica velocidade de corte de broca de aço rápido.

## O que os alvos são

| # | Alvo | Estado |
|---|---|---|
| **1** | `vc` de partida de broca helicoidal **HSS-Co** em aço ISO P (1045), m/min, com a condição publicada junto. **Bloqueante** — sem ele o cálculo não roda | **FECHADO** — `FAIXA` 16–30 m/min. Desbloqueia |
| **2** | `fn` publicado para broca de **aço rápido**, por diâmetro — tabela, não lei | **FECHADO** — a tabela existe, com material nomeado |
| **3** | A regra "avanço = 10% da rotação" tem fonte publicada? | **FECHADO** — `NÃO ENCONTRADO` |
| **4** | Passo do pica-pau (o `Q` do ciclo) para broca HSS em aço: existe recomendação publicada de **quanto**? | **FECHADO** — uma escada publicada, fora do regime do produto |

## Convenção de confiança

A mesma dos canônicos: `CONSENSO` · `REFERÊNCIA MÚLTIPLA` · `REFERÊNCIA ÚNICA` · `FAIXA` ·
`DERIVADO` · `PONTO ISOLADO` · `NÃO ENCONTRADO`.

**Regra que governa este arquivo:** lacuna declarada vale mais que número inventado. Nenhuma linha
numérica entra sem fonte citável — quem abrir a fonte pelo que está escrito aqui tem de chegar no
mesmo número, ou o valor não é entrega, é lacuna.

**Nomenclatura:** a entrada de aço rápido é **HSS-Co (ao cobalto)** — decisão do
`CANONICO_FERRAMENTAS_E_SUBSTRATOS §1.2`, porque aço rápido comum não foi encontrado à venda.

---

## Alvo 3 — A regra "avanço = 10% da rotação" tem fonte publicada?

**Veredito: `NÃO ENCONTRADO`.** E o terreno foi varrido o bastante para que a ausência signifique
alguma coisa.

Nenhum manual de fabricante, livro, apostila, norma ou artigo enuncia o avanço como percentual da
rotação. **Toda fonte publicada localizada expressa o avanço como `fn` em mm/rot (ou in/rev) em
função do diâmetro**, e só depois converte por `vf = fn × n`. A relação "F = 10% de S" nunca aparece
como regra — aparece só como consequência aritmética de `fn` = 0,1 mm/rot, que fonte nenhuma declara
universal.

### O único registro da regra, e ele não é fonte publicada

| Onde | O que diz | Natureza |
|---|---|---|
| Practical Machinist, thread "Drilling With a Small Drill" — `https://www.practicalmachinist.com/forum/threads/drilling-with-a-small-drill.186511/` | "the feed of a drill should be 1/10 of the rpm (general rule of thumb)", com exemplo de Ø20 a ~375 rpm avançando 37,5 | **Circulação informal.** Fórum, sem autor identificado, sem data confirmada. O site devolve HTTP 403 ao apurador: a citação vem do índice de busca, não de leitura direta |

**Em português não há nem circulação informal.** Nenhuma ocorrência de "avanço é 10% da rotação",
"rotação dividido por 10" ou equivalente em blog, fórum, apostila ou vídeo indexado.

### O que as fontes publicadas dizem no lugar — regras de bolso concorrentes

| Regra | Fonte | Condição publicada | Confiança |
|---|---|---|---|
| **`fn` = 0,001" por cada 1/16" de diâmetro, ±0,001"** — equivale a `fn ≈ 0,016 · D` | **Norseman Drill & Tool**, "Feeds & Speeds For Drills", `http://www.norsemandrill.com/feeds-speeds-drill.php` — lido na íntegra | material ferroso; reduzir avanço **e** velocidade em até 45–50% acima de 4 diâmetros de profundidade | `REFERÊNCIA MÚLTIPLA` — a mesma regra é replicada por **Viking Drill and Tool** e **CTD/Toledo Drill**, fabricantes independentes |
| **0,002" de avanço por cada 1/8" de diâmetro** — mesma razão, `0,016 · D` | "Introduction to Machining", cap. 8.9, livro-texto aberto (WA Open ProfTech), `https://openwa.pressbooks.pub/intromachining1/chapter/wa8-9/` | — | `REFERÊNCIA ÚNICA` **não verificada** — página devolve 403; citação via índice de busca |
| **Tabela de `fn` por faixa de diâmetro:** <1/8" → 0,002 · 1/8–1/4" → 0,002–0,004 · 1/4–1/2" → 0,004–0,008 · 1/2–1" → 0,008–0,012 · ≥1" → 0,012–0,020 in/rev | **Univ. of Florida, EML2322L**, "Drilling Speeds and Feeds", handout de laboratório (2018), `https://web.mae.ufl.edu/designlab/lab%20assignments/eml2322l-drilling%20and%20milling%20speeds%20and%20feeds.pdf` — PDF extraído na íntegra | brocas **HSS 2 cortes**; valor menor para material mais duro; pressupõe lubrificação inundada, rigidez e profundidade < 3×D; reduzir avanço e velocidade em até 50% acima de 3×D; com óleo aplicado à mão, escalar para 60% | `REFERÊNCIA ÚNICA` verificada |
| **`fn` FIXO: 0,13 mm/rot (Ø12–18) e 0,10 mm/rot (Ø19–28)** em aço estrutural | **Holemaker Technology**, "HSS Broach Cutters – Data Sheet", `https://cdn.shopify.com/s/files/1/0340/0965/files/P111.pdf` — PDF extraído | **fresa anular / broach cutter, NÃO broca helicoidal**; faixa de diâmetro estreita; o próprio documento diz "guideline parameters only" | `REFERÊNCIA ÚNICA` — e fora da família |
| `fn` 0,08–0,12 mm/rot para fresa anular em furadeira magnética | manual VEVOR (fabricante) | fresa anular, não broca | **não verificada** — só snippet de busca |
| Nenhuma regra de bolso — só a fórmula `IPM = IPR × RPM` | **Guhring**, "Technical 494 – Drilling Formulas", `https://guhring.com/media/support/Common-Formulas-For-Drilling.pdf` — lido | — | evidência de ausência num fabricante grande |

### O achado que pesa

**A única família de fontes publicadas que usa avanço fixo perto de 0,1 mm/rot independente do
diâmetro é de fresa anular — não de broca helicoidal** — e mesmo ali só dentro de uma faixa estreita
(Ø12–28). **Para broca helicoidal, toda fonte publicada usa avanço proporcional ao diâmetro.**

Isso converge com o que o `CANONICO_FURACAO §1.5` já diz por outro caminho (o avanço cresce com o
diâmetro, sublinearmente) e **contradiz a forma** da regra dos 10%, que é avanço constante.

**Aritmética derivada pelo apurador — não é da fonte:** a regra dos 10% equivale a `fn` = 0,1 mm/rot;
a regra publicada dominante (`0,016 · D`) só coincide com ela em **D ≈ 6,3 mm (1/4")**. Em Ø3 a regra
dos 10% pede **~2×** o avanço recomendado; em Ø12 pede **~metade**.
**Confiança:** `DERIVADO` — é cálculo sobre número de fonte, não número publicado.

### Limitações do terreno, declaradas

- `reddit.com` inacessível ao buscador. `practicalmachinist.com`, `model-engineer.co.uk`,
  `openwa.pressbooks.pub` e `cncarena` devolvem 403 ao fetcher — nesses casos a citação é snippet de
  índice, marcada acima como não verificada.
- **Machinery's Handbook e apostilas SENAI não foram consultados em texto integral** (só cópias não
  autorizadas ou paywall). Sobre essas duas obras, o `NÃO ENCONTRADO` **não se pronuncia**.
- Buscas feitas em inglês (~15 formulações, incluindo a frase exata que produziu o único hit),
  português (~8) e alemão (1 passada em literatura de oficina). Documentos abertos e lidos por
  inteiro: EML2322L (UF), Guhring 494, Holemaker P111, aula "Furação" (profmilton.weebly.com) e
  "Processos de Fabricação Cap. 9 – Furação" — os dois últimos sem regra de bolso de avanço.

---

## Alvo 4 — Passo do pica-pau (o `Q` do ciclo): existe recomendação publicada de QUANTO?

**Veredito: `REFERÊNCIA ÚNICA` para uma escada publicada, em regime que não é o do produto —
`NÃO ENCONTRADO` para a combinação exata (HSS-Co · aço 1045 · G83 de retração total).**

Existe **uma** fonte de fabricante que publica valor numérico de `Q` amarrado ao diâmetro e ao
material. Ela não é de fabricante de ferramenta: é de fabricante de **máquina**.

### A escada publicada

| Material | 1ª picada (`I`) | Redução por picada (`J`) | Picada mínima (`K`) | Retração |
|---|---|---|---|---|
| Alumínio e **aço macio** | **2 × D** | **0,3 × D** | **0,13 × D** | 1 mm (Setting 22) |
| Inox série 300 | **1 × D** | **0,3 × D** | **0,13 × D** | 1 mm (Setting 22) |

**Fonte:** Haas Automation, "High-Speed Peck Drilling", Tech Doc `sr 02-0060 a 02-0077` —
`https://www.haascnc.com/content/dam/haascnc/ecommerce-assets/linedrawings/holemaking/modular_drill_heads/Tech_Doc_Drilling_With_High-Speed_Peck_sr_02-0060_to_02-0077.pdf`
**Confiança:** `REFERÊNCIA ÚNICA`.

**Condição publicada — e ela restringe muito:**
- É **`G73`**, retração curta (quebra-cavaco), **não `G83`** de retração total para fora do furo.
- **Refrigeração interna obrigatória** — o documento diz que o ciclo "should only be used when
  drilling with through-tool coolant".
- Aplicação citada para brocas **acima de Ø12 mm** (0,5 pol).
- **Substrato da broca não especificado** — o documento não distingue aço rápido de metal duro.
- "Aço macio", não AISI 1045 nomeadamente (o 1045 é médio carbono).

**A restrição da refrigeração interna importa para o produto:** o `CANONICO_LIMITES_E_ALERTAS §1.4`
condiciona o alerta de furo profundo justamente à presença de canal interno. A escada da Haas vive do
lado que **tem** canal interno; a broca de aço rápido do usuário-alvo normalmente **não tem**.

### Confronto com a prática do Mestre

A prática do Mestre é `Q = D / 25`, ou seja **`0,04 × D`**, saturando em 0,8 mm. Como a escada da
Haas também é linear em `D`, a razão entre as duas **não depende do diâmetro**:

| Referência | `Q` como fração de `D` | Contra a prática do Mestre |
|---|---|---|
| Prática do Mestre | **0,04 × D** | — |
| Haas, **picada mínima** (`K`) — o menor valor que a escada dela chega a usar | **0,13 × D** | **3,3× maior** |
| Haas, primeira picada (`I`), aço macio | **2 × D** | **50× maior** |
| Regra de bolso de blog (não publicada) | 0,25 × D | 6,3× maior |
| Atribuição de fórum a machinista (não verificável) | 0,5 × D após a 1ª picada | 12,5× maior |

**O achado, em uma linha:** toda referência encontrada — publicada ou informal — pica **bem mais
fundo** que a prática do Mestre, e a mais próxima delas ainda é **3,3×** maior que ela. A prática do
Mestre não tem contradição documentada; ela está fora da faixa que qualquer fonte discute.
**Confiança do confronto:** `DERIVADO` — é razão calculada entre número publicado e número da prática,
não valor de fonte.

### Fontes que só dizem QUANDO picar, nunca quanto

Isto é evidência de que o terreno foi varrido e o dado não está lá:

- **Siemens, Sinumerik Programming Manual, Cycles** (`PGZ_0406_en.pdf`, 390 páginas, baixado e
  buscado por `DAM`/`FDEP`/degression). O `CYCLE83` com parâmetro `DAM` **é exatamente o mecanismo de
  escada decrescente** — mas os valores do manual (`FDEP=100`, `DAM=20` ou `DAM=-0,6`) são ilustração
  de sintaxe, sem vínculo a diâmetro de broca ou material.
- **Kennametal, catálogo `KHSS Twist Drills`**, seção "Speeds and Feeds for Deep-Hole Drilling"
  (H618). Define o gatilho `3×D` e publica tabela de redução de velocidade e avanço por profundidade
  (10%/20%/30%/40%), mas sobre o pica-pau diz apenas que ele "will often reduce chip packing" — **sem
  valor de `Q`**. É o achado mais eloquente: um fabricante de broca **de aço rápido** publica a
  tabela de redução e não publica o passo.
- **Haas, página do `G83`** — define os parâmetros `I`/`J`/`K`/`Q` e traz um exemplo de programa
  (`Q0.175"` para broca de 0,3125"); é exemplo de sintaxe, não recomendação.
- **Harvey Performance**, "Choosing the Right Pecking Cycle Approach" — afirma existirem tabelas por
  tipo de broca e material, mas o conteúdo numérico está em imagem não extraível.
- **TriumphTool** (blog de revendedor) — só o gatilho ("além de 5×D").

### Circulação informal — não é fonte

- `makeitfrommetal.com`: `Q = 0,25 × D` para cavaco curto, sem tabela e sem fonte.
- Thread "Rules on peck depth" (cnczone/cncarena, **403 ao acessar**): o índice de busca atribui ao
  suporte técnico da Dormer "2–3×D até 2 pol, depois 1×D". **Não verificável** — o texto original é
  inacessível e não há confirmação de que exista publicação Dormer com esse conteúdo.
- `practicalmachinist.com`, threads sobre profundidade de picada (**403**): recomendação de
  machinista de "metade do diâmetro após a primeira picada de 3×D" para HSS em aço carbono.
- `cnccookbook.com`: exemplo `I=4×D` / `J=2×D`, sem citar fonte.

### Limitações do terreno, declaradas

`practicalmachinist.com`, `cnczone`/`cncarena` e `scribd.com` devolvem 403 — as atribuições acima vêm
de índice de busca, nunca de leitura direta, e por isso nenhuma delas entra como fonte. Foram abertos
e lidos por inteiro: o Tech Doc da Haas, a seção de furação profunda do catálogo Kennametal KHSS e o
manual de ciclos da Siemens.

---

## Alvo 2 — `fn` publicado para broca de aço rápido, por diâmetro

**Veredito: `REFERÊNCIA ÚNICA` forte para a tabela nomeada, com `REFERÊNCIA MÚLTIPLA` de apoio em duas
fontes genéricas.** Existe tabela publicada, por diâmetro, para broca de aço rápido no próprio
material do produto. É o primeiro dado de avanço de furação em HSS que o Fenix tem sem derivar de
catálogo de metal duro.

### A tabela nomeada — Sutton Tools

| Ø (mm) | 3 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 25 |
|---|---|---|---|---|---|---|---|---|---|
| **`fn` (mm/rot)** | 0,070 | 0,110 | 0,125 | 0,16 | 0,19 | 0,23 | 0,29 | 0,34 | 0,41 |

**Fonte:** Sutton Tools, "IPD Catalogue Technical Info" (`499980019_IPDCatalogueTechnicalInfo.pdf`),
seção Speeds & Feeds – HSS Drills, **pág. 202–203** — tabela mestre de avanço por diâmetro, código
"Feed #5". A correspondência de material está na **pág. 198** do próprio catálogo.
**Confiança:** `REFERÊNCIA ÚNICA` — mas é tabela de verdade, com material nomeado, não ponto isolado.

**Condição publicada:**
- Broca **jobber HSS/HSS-Co** (linhas D102 / D103 / D179), geometria de ponta código "R30".
- Material: **"Steel ~0,45%C, condição A (recozido), HB190, 640 N/mm²"** — que é DIN **C45**, ou seja
  **AISI 1045**, pela própria tabela de correspondência do catálogo. É o material do produto, nomeado.
- Profundidade **≤ 5×Ø**.
- `vc` publicado na mesma linha: **16–20 m/min**, conforme o revestimento.
- **É ponto único, não faixa.** A condição mais dura (QT250, HB250) usa o **mesmo código de avanço** —
  só cai a `vc`. Isto confirma, num terceiro caminho independente, o que o `CANONICO_FURACAO §1.5` já
  dizia: **o material governa a velocidade, não o avanço.**
- **Não publicados:** ângulo de ponta em graus (só o código "R30") e refrigeração linha a linha (só
  nota geral recomendando fluido).

### As duas tabelas genéricas de apoio

| Ø (mm) | UFL / MAE Design Lab | Viking Drill and Tool |
|---|---|---|
| até 3,2 | até 0,051 | 0,025–0,076 |
| 3,2–6,4 | 0,051–0,102 | 0,051–0,152 |
| 6,4–12,7 | 0,102–0,203 | 0,102–0,254 |
| 12,7–25,4 | 0,203–0,305 | 0,178–0,381 |
| > 25,4 | 0,305–0,508 | 0,381–0,635 |

**UFL** — Univ. of Florida, EML2322L, Tabela 2 (deriva do Machinery's Handbook), broca HSS 2 cortes,
original em in/rev (0,002–0,020"). Aço **sem dureza especificada**; a nota manda usar o valor menor
para material mais duro. Não é específica do 1045.
**Viking Drill and Tool** — `vikingdrill.com/viking-Drill-FeedandSpeed.php`. É **lei, não tabela**:
"0,001"/rev por 1/16" de diâmetro, ±0,001"" — a mesma regra da Norseman já registrada no alvo 3.

**Convergência nos três diâmetros de referência:** Ø6 → **0,10–0,15** · Ø10 → **0,16–0,25** · Ø20 →
**0,28–0,38** mm/rot. Três fontes caem dentro da faixa em cada ponto.
**Confiança:** `REFERÊNCIA MÚLTIPLA` na faixa; `REFERÊNCIA ÚNICA` no valor pontual por material
nomeado (só a Sutton individualiza o 1045).

### A lei que a tabela da Sutton descreve — ajuste do Ícaro, não da fonte

Ajuste log-log sobre os nove pontos publicados:

```
fn ≈ 0,028 · D^0,83     mm/rot        (broca HSS/HSS-Co, aço 1045, ≤5×Ø)
```

O ajuste reproduz o meio da tabela com erro < 1% (previsto 0,191 em Ø10 contra 0,19 publicado).
**Confiança:** `DERIVADO` — é ajuste sobre dado de fabricante, exatamente a mesma natureza (e a mesma
ressalva) do `0,08·√D` da §2.1 do canônico.

**O que isso decide dentro da faixa F1.** A lacuna F1 do `CANONICO_FURACAO §4.1` deixa o expoente em
`a ∈ [0,5 ; 0,8]`, sem vencedor: o território de catálogo mediu 0,55, o de handbook implicava ~0,8.
**O dado de aço rápido dá `a` = 0,83** — ou seja, cai do lado do `[HANDBOOK]`, ligeiramente acima do
topo da faixa. Não fecha F1 (é uma fonte só, e de outro substrato), mas **é a primeira evidência
direta que aponta para uma das pontas.**

### Resposta à pergunta secundária: o avanço de HSS é menor que o de metal duro?

**Sim, e a diferença encolhe com o diâmetro.** Comparação contra a lei `0,08·√D` da §2.1 do canônico
(que é derivada de catálogos de **metal duro**):

| Ø | HSS publicado (Sutton) | Lei de metal duro do canônico | Razão HSS / metal duro |
|---|---|---|---|
| 3 | 0,070 | 0,139 | **0,50×** |
| 6 | 0,125 | 0,196 | **0,64×** |
| 10 | 0,19 | 0,253 | **0,75×** |
| 20 | 0,34 | 0,358 | **0,95×** |

**Confiança:** `DERIVADO`, e com ressalva forte — **não é comparação lado a lado no mesmo catálogo**.
É tabela publicada de um lado contra lei ajustada do outro. A comparação limpa (mesmo fabricante,
mesmo diâmetro, mesmo material, HSS contra metal duro) **não foi encontrada** — Dormer Pramet, YG-1,
Guhring e Redline devolveram 403 ou timeout, e a Sutton só publica a seção HSS nesse documento.

Ainda assim o sentido é claro e tem mecanismo: em diâmetro pequeno o aço rápido aceita **metade** do
avanço do metal duro; em Ø20 os dois praticamente se encontram. Isso **matiza** — não contradiz — o
"substrato governa velocidade, não avanço" da §1.5: vale bem no diâmetro grande, e mal no pequeno.

### A distância entre a prática do Mestre e o catálogo de HSS

A regra dos 10% equivale a `fn` = 0,1 mm/rot fixo. Contra a tabela publicada de HSS:

| Ø | `fn` publicado | `fn` do Mestre | Mestre / publicado |
|---|---|---|---|
| 3 | 0,070 | 0,1 | **1,43×** (acima do publicado) |
| 5 | 0,110 | 0,1 | 0,91× |
| 6 | 0,125 | 0,1 | 0,80× |
| 10 | 0,19 | 0,1 | 0,53× |
| 12 | 0,23 | 0,1 | 0,43× |
| 20 | 0,34 | 0,1 | 0,29× |
| 25 | 0,41 | 0,1 | 0,24× |

**A hipótese que motivou reformular este alvo se confirma: a distância encolheu.** Pela faixa de
segurança do `CANONICO_FURACAO §1.6`, `0,5×` é a borda inferior do que o fabricante publica. Contra a
lei de metal duro, a regra dos 10% cruzava essa borda já em **Ø6,25**; contra a tabela de aço rápido,
ela só cruza em **~Ø10,7**. **O regime em que a prática do Mestre fica dentro da faixa publicada é
quase o dobro do que se supunha.**

Dois pontos que a tabela mostra e que valem para quem for desenhar a tela:
- **Abaixo de ~Ø4,5 a regra dos 10% pede MAIS avanço que o catálogo** — em Ø3, 1,43×. O lado
  agressivo é o diâmetro pequeno, não o grande.
- **Acima de Ø12 ela fica abaixo de metade do publicado**, e a distância só cresce.

**Confiança de toda esta seção comparativa:** `DERIVADO` — aritmética sobre número publicado.

---

## Alvo 1 — `vc` de partida, broca helicoidal HSS-Co em aço ISO P (1045) — BLOQUEANTE

**Veredito: `FAIXA` — 16 a 30 m/min, com dispersão real de ~1,9× entre fontes e um degrau que esta
rodada não resolve.** O bloqueio sai: o cálculo tem número de partida com fonte. Mas ele entra como
faixa, não como ponto.

### As fontes de broca helicoidal

| `vc` (m/min) | Original | Substrato declarado | Material declarado | Condição publicada | Fonte |
|---|---|---|---|---|---|
| **16 – 20** | — | **HSS / HSS-Co**, broca jobber (D102/D103/D179) | **"Steel ~0,45%C, condição A (recozido), HB190, 640 N/mm²"** = C45 = 1045, nomeado | variação por **revestimento**; profundidade ≤5×Ø; fluido em nota geral | **Sutton Tools**, IPD Catalogue Technical Info, pág. 202–203 (a mesma tabela do alvo 2) |
| **21,3 – 30,5** | 70–100 SFM | **HSS-Co (cobalto explícito)** | família "Medium Carbon Steels **1035, 1045**" | óleo solúvel 1:5–1:10; ângulo de ponta e profundidade **não declarados** | **OSG EX-GOLD**, List 1000 (Stub) / List 1500 (Jobbers), "Drilling Technical" — `https://osgtool.com/content/literature/8002024CA/Tech%20pg.%20List%20(s)-%201000_%201500.pdf` |
| **21,3 – 24,4** | 70–80 SFM | **HSS genérico** — a página descreve brocas M42 ao cobalto à parte, sem tabela de velocidade própria | "Steel .4 carbon to .5 carbon" | dureza não declarada **nesta linha**; há regra geral separada: 80 SFM a 100 HB, **−10 SFM a cada +50 HB**; refrigeração e ângulo não declarados | **Norseman Drill & Tool**, "Feeds & Speeds For Drills" — `http://www.norsemandrill.com/feeds-speeds-drill.php` |
| **15,2** | 50 fpm | HSS genérico | **AISI 1045 temperado e revenido a 275 HB** — mais duro que o pedido | não declarados | **Machinery's Handbook, 27ª ed.**, Tabela 17, p. 1061, valor citado no exemplo resolvido da p. 1081 |

**Confiança:** `FAIXA`. São **três** fontes de broca helicoidal com material da família nomeado, e elas
não convergem em um ponto.

### A dispersão é real e tem forma

**A fonte australiana fica inteira abaixo das duas americanas.** O topo da Sutton (20) é o piso da OSG
(21,3). Não é sobreposição parcial: é um degrau.

Não há como atribuir causa com o que está publicado, e esta apuração não inventa uma. O que se pode
dizer com fonte:

- A **Sutton** declara a condição mais completa das três — material nomeado, dureza (HB190),
  resistência (640 N/mm²) e estado (recozido). É a fonte que mais se aproxima da condição do produto.
- A **OSG** declara refrigeração (óleo solúvel 1:5–1:10) e **cobalto explícito**, e é a única que sobe
  até 30.
- A **Norseman** publica a regra de correção por dureza (−10 SFM a cada +50 HB) — o único mecanismo
  publicado nesta rodada para mover o valor com o material.
- O ponto do **Machinery's Handbook** (15,2 a **275 HB**) **não é comparável direto** — o material é
  mais duro que o pedido. Mas é consistente com a tendência: mais dureza, menos velocidade.

**Como usar:** faixa de 16 a 30 m/min, com o entendimento de que a ponta baixa vem da fonte de
condição mais bem declarada e a ponta alta da fonte com cobalto explícito e refrigeração declarada.
**Nenhuma média** — a regra do projeto para divergência sem vencedor é entrar como faixa e ser exibida
como faixa.

### Confronto com a prática do Mestre

A prática: **12–16 m/min** em material mais duro ou uso geral · **17–20** em mais mole · **16** no dia
a dia.

| Faixa da prática | Contra a fonte |
|---|---|
| Uso geral (12–16) | **abaixo de toda fonte publicada**, exceto o ponto de 275 HB do handbook (15,2) |
| Material mole (17–20) | **coincide com a Sutton (16–20), inteira** |
| Dia a dia (**16**) | **é exatamente o piso da Sutton** |

**A prática do Mestre não está errada: está na borda conservadora do que se publica.** Contra a
Sutton, ela é a própria faixa. Contra OSG e Norseman, roda a **~0,6–0,75×** do recomendado — dentro do
que o `CANONICO_FURACAO §1.6` chama de otimização legítima (até 0,5× para baixo), não de anomalia.

Um detalhe que vale registrar: a prática dele associa **velocidade menor a material mais duro** (12–16)
e maior a material mole (17–20) — a mesma direção da regra publicada da Norseman (−10 SFM a cada
+50 HB). **A forma da regra dele bate com a da fonte; o que difere é o nível.**
**Confiança:** `DERIVADO` — razões calculadas sobre número publicado.

### Fontes localizadas e descartadas, com o motivo

- **Europa Tool Co.**, "Recommended Cutting Conditions-HSS": 1035/1045/1050 a 175–225 HB → **69
  m/min**, grau "HSS M4". **Descartada do consenso** por dois motivos independentes: é catálogo de
  **broca de inserto trocável**, não helicoidal inteiriça; e o valor destoa ~3× das fontes de broca
  helicoidal, assinatura de sistema e geometria diferentes, não de discordância sobre o mesmo objeto.
  Fica registrada para que ninguém a encontre de novo e a trate como divergência.
- **NACHI**, "Brocas HSS", ed. 10/2015, tabela "BROCAS HSS / HSS-E Co8", material 1.0503-C45: **tem
  uma linha rotulada HSS-Co para exatamente este aço**, mas a extração do PDF embaralhou as colunas de
  rotação, avanço e `vc`. **Fonte localizada, dado não verificável no estado atual.**

### Lacunas que este alvo deixa abertas

- **Ângulo de ponta nunca é publicado junto do `vc`** — em nenhuma das quatro fontes. Não há como
  amarrar velocidade a geometria de ponta com o que existe hoje.
- **Furo raso contra furo profundo, com número:** só a OSG toca no assunto, em nota geral, mandando
  reduzir o **avanço** — não a velocidade — acima de 4×Ø.
- Dormer Pramet, Guhring, Sandvik Coromant, Kennametal, Fette, Izar e YG-1 **não produziram tabela
  legível de `vc` de HSS-Co para 1045** — em vários casos por bloqueio de acesso, não por ausência do
  dado.

---

## Síntese da rodada — os quatro vereditos

| # | Alvo | Veredito | Confiança |
|---|---|---|---|
| **1** | `vc` de broca HSS-Co em 1045 | **16–30 m/min**, três fontes de broca helicoidal, com degrau entre a australiana (16–20) e as americanas (21–30). **Desbloqueia o cálculo** | `FAIXA` |
| **2** | `fn` publicado de broca de aço rápido, por diâmetro | **Tabela existe** — Sutton Tools, material nomeado (C45 = 1045): Ø6 → 0,125 · Ø10 → 0,19 · Ø20 → 0,34 mm/rot. Duas fontes genéricas de apoio | `REFERÊNCIA ÚNICA` no valor por material · `REFERÊNCIA MÚLTIPLA` na faixa |
| **3** | Fonte para "avanço = 10% da rotação" | **Não existe.** Um único registro, e é fórum. Toda fonte publicada usa avanço proporcional ao diâmetro | `NÃO ENCONTRADO` |
| **4** | Tamanho do passo do pica-pau (`Q`) | **Uma escada publicada** (Haas, `G73`, refrigeração interna, acima de Ø12): 1ª picada 2×D, redução 0,3×D, mínima 0,13×D. Para HSS em 1045 com `G83`, nada | `REFERÊNCIA ÚNICA` fora do regime · `NÃO ENCONTRADO` no regime exato |

### O que a rodada mudou no entendimento

1. **O aço rápido deixou de ser derivado.** Antes desta rodada, todo dado de avanço de furação do
   Fenix vinha de catálogo de metal duro e chegava ao aço rápido pela regra "substrato não muda
   avanço". Agora existe tabela publicada de HSS, com o material nomeado.

2. **Essa regra precisa de ressalva.** O avanço de HSS é **metade** do de metal duro em Ø3 e **95%**
   dele em Ø20. "Substrato governa velocidade, não avanço" vale bem no diâmetro grande e mal no
   pequeno.

3. **A faixa F1 ganhou uma ponta.** O expoente ajustado sobre a tabela de HSS é **0,83** — do lado do
   `[HANDBOOK]`, acima do topo da faixa `[0,5 ; 0,8]`. Não fecha a lacuna; aponta.

4. **A prática do Mestre sobreviveu ao confronto em dois dos três números.** O `vc` de 16 é o piso
   exato da fonte de melhor condição declarada. A regra dos 10% fica dentro da faixa publicada até
   ~Ø10,7 — quase o dobro do que se supunha quando a comparação era contra metal duro. O passo do
   pica-pau é o único que fica **fora** de qualquer referência: 3,3× menor que a menor picada
   publicada.

### O que esta rodada NÃO fez

Não tocou em canônico. Não escreveu escopo, tela nem recomendação de produto. Não fechou as lacunas
F1, L-A nem L-B do `CANONICO_FURACAO §4` — apenas trouxe evidência que as move.

**Duas pistas baratas para quem retomar:** o PDF do Walter "Technical Compendium – Holemaking 2024"
(7,5 MB, baixado e não processado) e a tabela HSS-Co da NACHI para C45 (localizada, colunas
embaralhadas na extração). Qualquer uma das duas pode resolver o degrau de 1,9× do alvo 1.

---

# Emenda de 05/09/2026 — a fonte que faltava foi lida

Uma das duas pistas baratas deixadas acima **foi resolvida na mesma sessão**: a tabela HSS-Co da NACHI
para `1.0503-C45`, que a apuração do alvo 1 localizou mas não conseguiu extrair (colunas embaralhadas
no PDF), **foi lida diretamente da página em imagem**. Ela é a fonte mais completa da rodada e mexe em
três pontos já escritos acima.

**Fonte:** NACHI, "Brocas HSS", ed. 10/2015, pág. 21 — tabela "BROCAS HSS / HSS-E Co8", referências
520 · 522A · 6522 · 552 · 562 · 534 · 6534 · 6552. Linha de material **"Aceros no aleados de 700 a
1000 N/mm²"**, que enumera `1.0503-C45` e `1.1191-CK45` — o 1045, nomeado.

## A tabela, na linha do material do produto

| Profundidade | Ref. | Substrato | `vc` (m/min) | Refrig. | Ø2 | Ø5 | Ø8 | Ø12 | Ø16 |
|---|---|---|---|---|---|---|---|---|---|
| **máx. 5×D** | 562 / 520 | HSS N | **18 – 22** | emulsão | 3200 / **0,04** | 1300 / **0,08** | 800 / **0,14** | 550 / **0,18** | 400 / **0,20** |
| **5 – 10×D** | 534 | HSS N | **10 – 15** | emulsão | 2200 / 0,03 | 900 / 0,06 | 600 / 0,10 | 400 / 0,12 | 300 / 0,14 |
| **mais de 10×D** | 552 | HSS N | **5 – 10** | emulsão | 1200 / 0,03 | 450 / 0,06 | 300 / 0,10 | 190 / 0,12 | 140 / 0,14 |
| **mais de 10×D** | 6552 | **HSS-Co** Non Step | **18 – 22** | emulsão | 3100 / 0,04 | 1200 / 0,08 | 700 / 0,14 | 520 / 0,18 | 380 / 0,20 |

Cada célula traz **rotação (rpm) / avanço (mm/volta)**.
**Confiança:** `REFERÊNCIA ÚNICA` — mas é a tabela mais bem condicionada da rodada: material nomeado,
substrato nomeado, profundidade estratificada, refrigeração declarada e diâmetro explícito.

**Verificação de consistência interna — feita pelo Ícaro, não pela fonte.** As rotações publicadas
reproduzem `n = vc × 1000 / (π × D)` com `vc` = 20 m/min: Ø5 → 1273 calculado contra 1300 publicado ·
Ø8 → 796 contra 800 · Ø12 → 531 contra 550 · Ø16 → 398 contra 400. A tabela é internamente coerente e
a coluna `vc` explica a coluna de rotação. Isso eleva a confiança na leitura da imagem.

## O que esta fonte muda

### 1. Fecha a lacuna "furo raso contra furo profundo, com número" — declarada em aberto no alvo 1

**A velocidade de corte cai com a profundidade, e a fonte publica a escada inteira:**

| Profundidade | `vc` | Contra o furo raso |
|---|---|---|
| até 5×D | 18–22 | — |
| 5 a 10×D | 10–15 | **~0,6×** |
| acima de 10×D | 5–10 | **~0,35×** |

Isto é dado publicado, não derivação. E **contradiz frontalmente a nota da OSG** registrada no alvo 1,
que mandava reduzir o **avanço** e não a velocidade acima de 4×Ø: a NACHI reduz **os dois** — o avanço
cai de 0,20 para 0,14 em Ø16 (0,70×) na mesma escada.

**Consequência para o `CANONICO_FURACAO §1.7`:** o limiar `3×D` de lá é binário (raso/profundo) e vem
do território de handbook. A NACHI trabalha com **três** faixas e limiares diferentes (5×D e 10×D).
Não é contradição de fato — são grades diferentes sobre o mesmo fenômeno — mas é a primeira fonte da
pesquisa que publica **a escada graduada por faixa de profundidade** que a lacuna **L-D** do §4.2
descreve como inexistente nos dois territórios. **L-D deixa de ser lacuna total.**

### 2. O cobalto recupera a velocidade do furo raso dentro do furo profundo

A linha `6552` (HSS-Co) roda a **18–22 m/min acima de 10×D** — exatamente a velocidade que o HSS comum
só sustenta **abaixo de 5×D**. Mesmo avanço, também (0,20 em Ø16).

**Em uma linha:** trocar HSS por HSS-Co não sobe a velocidade no furo raso — sobe o **teto de
profundidade** em que aquela velocidade continua valendo. Isso é mais específico do que o "fator ~3,3
de velocidade por substrato" registrado no `§2.1` do canônico, que compara aço rápido com metal duro.

### 3. Segunda fonte independente para o alvo 2 — e ela confirma o expoente

`fn` publicado por diâmetro, agora em duas fontes de aço rápido com o material nomeado:

| Ø | NACHI (≤5×D) | Sutton | NACHI / Sutton |
|---|---|---|---|
| 5 | 0,08 | 0,110 | 0,73× |
| 8 | 0,14 | 0,16 | 0,88× |
| 12 | 0,18 | 0,23 | 0,78× |
| 16 | 0,20 | 0,29 | 0,69× |

**A NACHI é sistematicamente mais conservadora** — roda a 0,69–0,88× da Sutton. As duas ficam dentro
da tolerância de ±25% que o `CANONICO_FURACAO §1.6` chama de "não é anomalia" em três dos quatro
diâmetros; em Ø16 a distância chega a 31%.
**Confiança do par:** `REFERÊNCIA MÚLTIPLA` — duas fontes independentes, mesma família de material,
mesmo substrato, dispersão de ~1,3×.

**O expoente, ajustado sobre a NACHI:** `a` = ln(0,20/0,04) / ln(16/2) = **0,77**. A Sutton dava
**0,83**. **Duas fontes independentes de aço rápido, dois ajustes independentes, ambos no topo da
faixa F1 `[0,5 ; 0,8]` ou logo acima dela.**

Isso deixa de ser indício e passa a ser um resultado: **o dado de aço rápido aponta consistentemente
para `a` ≈ 0,8**, o lado do `[HANDBOOK]`. O `a` = 0,55 do `[CATÁLOGO]` foi medido sobre catálogos de
**metal duro** — a divergência de F1 pode não ser desacordo entre territórios, e sim **diferença real
entre substratos**. É hipótese, declarada como tal, e o que a sustenta é a convergência de dois
ajustes independentes contra um.

### 4. O degrau do alvo 1 ganha uma ponte

| Fonte | `vc` (furo raso) |
|---|---|
| Sutton Tools | 16 – 20 |
| **NACHI** | **18 – 22** |
| Norseman | 21,3 – 24,4 |
| OSG EX-GOLD | 21,3 – 30,5 |

**A NACHI sobrepõe as duas margens do degrau.** O que era um salto entre 20 e 21,3 vira uma cadeia
contínua de 16 a 30,5, com a NACHI cobrindo justamente a junta. A faixa do alvo 1 **não muda** — 16 a
30 m/min continua sendo a resposta — mas ela deixa de ser "duas fontes que não se falam" e passa a ser
**quatro fontes numa faixa contínua**, com quatro fontes de broca helicoidal em vez de três.

**Refinamento possível, e ele é útil para a tela:** o agrupamento por profundidade da NACHI sugere que
parte da dispersão entre fontes é **profundidade não declarada**. Sutton declara ≤5×Ø e dá 16–20;
NACHI declara ≤5×D e dá 18–22 — as duas fontes que **declaram a profundidade** ficam juntas, em
16–22. OSG e Norseman, que **não declaram**, é que puxam para 30. Isso é observação sobre as fontes,
`DERIVADO`, não número publicado — mas é a explicação mais econômica do degrau e pode ser testada
quando alguém abrir o Walter.

### 5. A prática do Mestre contra a segunda fonte

`fn` do Mestre = 0,1 fixo, contra a NACHI de furo raso:

| Ø | NACHI | Mestre / NACHI |
|---|---|---|
| 2 | 0,04 | **2,5×** |
| 5 | 0,08 | 1,25× |
| 8 | 0,14 | 0,71× |
| 12 | 0,18 | 0,56× |
| 16 | 0,20 | **0,50×** |

**Contra a fonte mais conservadora das duas, a regra dos 10% tem alcance ainda maior:** ela só toca a
borda de `0,5×` do `§1.6` em **Ø16** — contra Ø10,7 na comparação com a Sutton e Ø6,25 na comparação
antiga com a lei de metal duro. **O regime em que a prática do Mestre fica dentro da faixa publicada
cresceu pela segunda vez.**

E a ponta agressiva do diâmetro pequeno **se agrava**: em Ø2 a regra dos 10% pede **2,5×** o avanço da
NACHI. O `vc` de 16 m/min do dia a dia continua coerente — fica logo abaixo do piso de 18 da NACHI e
dentro da faixa da Sutton.

## O que continua aberto

- **Walter, "Technical Compendium – Holemaking 2024"** — 7,2 MB, em disco, ainda não processado. É a
  pista que resta.
- **Hartner** (fabricante alemão de HSS) tem o grupo `Unlegierte Vergütungsstähle` com `1.0503 C45`
  identificado no catálogo, mas as tabelas de `vc` por código saem **embaralhadas** na extração de
  texto. Mesmo problema que a NACHI teve — e a NACHI foi resolvida lendo a página como **imagem**.
  Mesmo caminho serve aqui, se alguém quiser uma quinta fonte.
- **Ângulo de ponta junto do `vc`:** a NACHI também não publica. Cinco fontes, nenhuma publica. A
  lacuna do alvo 1 se confirma e endurece.
