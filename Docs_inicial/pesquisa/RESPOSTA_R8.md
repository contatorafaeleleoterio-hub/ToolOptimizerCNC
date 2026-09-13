# RESPOSTA R8 — Furação, roscamento e mandrilamento

**Território de fonte:** norma (ISO/DIN/ABNT), handbook (Machinery's, ASM), literatura acadêmica
brasileira (Diniz/Marcondes/Coppini, Stemmer, Ferraresi), artigos revisados por pares com DOI,
teses e dissertações, publicações de instituto técnico e sociedade científica.

**Território EXCLUÍDO deste retorno:** catálogo de fabricante de ferramenta, guia de aplicação,
tabela comercial de speeds & feeds, material de treinamento de fabricante. Todo número que só
existe nessas fontes está declarado como LACUNA, não preenchido.

**Status:** completo — quatro questões respondidas, 14 lacunas declaradas.

---

# QUESTÃO 1 — Avanço por rotação (`fn`) de partida na furação

## 1.1 — Broca helicoidal: regra sobre o diâmetro, ou tabela?

**As duas — e a contradição da documentação do produto é falsa.** A literatura publica uma
**tabela por faixa de diâmetro**, mas essa tabela **é** uma regra `fn = k · D` disfarçada: quando
se calcula `k = fn/D` faixa a faixa, o `k` é quase constante. A tabela é a forma de apresentação;
a regra é o conteúdo.

**Fonte A — Machinery's Handbook, 27ª ed., p. 1029**, seção *Using the Feed and Speed Tables for
Drilling, Reaming, and Threading*: "For ordinary twist drills, the feed rate used is 0.001 to
0.003 in/rev for drills smaller than 1/8 in..." (faixas completas na tabela abaixo).

**Fonte B — UNIVERSITY OF FLORIDA**, Dept. of Mechanical & Aerospace Engineering, EML2322L —
MAE Design and Manufacturing Laboratory, *Drilling and Milling Speeds and Feeds*, Tabela 2
("Recommended Average Feed Rates for 2 Flute HSS Drills").
URL: https://web.mae.ufl.edu/designlab/lab%20assignments/eml2322l-drilling%20and%20milling%20speeds%20and%20feeds.pdf

**As duas fontes, convertidas para mm e reduzidas a `k = fn/D`:**

| Faixa de Ø | Ø [mm] | `fn` MH 27ª [mm/volta] | `fn` UF [mm/volta] | `k = fn/D` (média geométrica da faixa) |
|---|---|---|---|---|
| < 1/8″ | < 3,18 | 0,025 – 0,076 | até 0,051 | MH 0,020 · UF 0,014 |
| 1/8″–1/4″ | 3,18 – 6,35 | 0,051 – 0,152 | 0,051 – 0,102 | MH 0,020 · UF 0,016 |
| 1/4″–1/2″ | 6,35 – 12,7 | 0,102 – 0,254 | 0,102 – 0,203 | MH 0,018 · UF 0,016 |
| 1/2″–1″ | 12,7 – 25,4 | 0,178 – 0,381 | 0,203 – 0,305 | MH 0,014 · UF 0,014 |
| > 1″ | > 25,4 | 0,254 – 0,635 | 0,305 – 0,508 | MH 0,011 · UF 0,011 |

**REGRA DE PARTIDA (entrega principal desta questão):**

```
fn = k · D        com  k ≈ 0,018   para D até ~13 mm
                        k ≈ 0,013   para D de 13 a 25 mm
                        k ≈ 0,011   para D acima de 25 mm
```

É uma regra **levemente degressiva**, não estritamente linear: `k` cai ~40% do menor ao maior
diâmetro. Uma regra linear única `fn = 0,015·D` erra ≤ 20% em toda a faixa de oficina
(3 a 25 mm) — dentro dos ±15–25% que o produto já declara.

*Confiança: CONSENSO.* Duas fontes independentes dentro do território (um handbook de referência
e um laboratório universitário), convergindo em `k` com dispersão de ~25%.

**Condições em que o número vale:** broca helicoidal de 2 canais, ponta padrão 118°, refrigeração
adequada (inundação), profundidade < 3·D, montagem rígida. Fora disso, ver 1.3 e a nota de
refrigeração abaixo.

**Correção pelo material (as duas fontes concordam na direção e na magnitude):** dentro de cada
faixa de diâmetro, a razão topo/base é de **2,5 a 3,0×**. MH 27ª p.1029: usar os valores baixos
para materiais duros — aços ferramenta, superligas e inoxidáveis que encruam; usar os altos para
materiais moles — alumínio e latão. A UF diz o mesmo com outras palavras.

Traduzindo para os materiais do contexto do produto (posição relativa dentro da faixa, **não**
número novo):

| Material | Posição na faixa | `k` resultante (D ≤ 13 mm) |
|---|---|---|
| Alumínio, latão | topo | ~0,026 |
| Ferro fundido cinzento | acima do meio | ~0,022 |
| **Aço 1045, ISO P, 170–220 HB** | **meio** | **~0,018** |
| Inox austenítico (encrua) | abaixo do meio | ~0,013 |
| Aço ferramenta temperado | base | ~0,009 |

*Confiança da coluna "posição na faixa": CONSENSO (as duas fontes ordenam assim).
Confiança dos `k` interpolados: REFERÊNCIA ÚNICA — são a faixa das fontes, distribuída pela ordem
que elas próprias declaram, não medição independente por material.*

**Refrigeração — fator citável.** UF, mesmo documento: os valores da tabela pressupõem lubrificação
inundada; **aplicando óleo manualmente, reduzir avanço e velocidade a 60%**. É o único fator de
refrigeração numérico que encontrei dentro do território.

### MD × HSS-Co — LACUNA declarada

**Nenhuma das duas fontes distingue o substrato no avanço.** MH 27ª diz literalmente "for ordinary
twist drills", sem separar HSS de metal duro; a tabela da UF é explicitamente "2 Flute HSS Drills".
MH tem coluna própria para broca de insertos (ver 1.2), mas **não tem coluna de broca inteiriça de
metal duro**.

Portanto: **o `fn` de partida específico da broca helicoidal inteiriça de MD é LACUNA no meu
território.** O dado existe em catálogo de fabricante de ferramenta — que está fora do meu escopo
por definição do briefing.

O que o meu território permite afirmar sem inventar: as duas fontes tratam o avanço como função de
**diâmetro e material**, e a velocidade de corte como o parâmetro que muda com o substrato
(MH Tabela 1 nota de rodapé equivalente na UF: "multiply surface speeds in table by 2.5 for carbide
cutting tools" — fator de **velocidade**, não de avanço). Isso é evidência de que o substrato
governa `vc` e não `fn`, mas não é prova de que `fn(MD) = fn(HSS)`.

## 1.2 — U-drill, broca de centro, escareador, alargador

### Broca de insertos (U-drill) — RESPONDIDO

MH 27ª ed., p. 1033 e Tabela 17: os dados combinados de avanço/velocidade para *indexable insert
drilling* são baseados em ferramenta de **2 arestas, raio de ponta do inserto 3/64″, ângulo de
posição 10°, D = 1,00 in (25,4 mm)**, vida esperada ~15 min por aresta, **profundidade máxima ~2·D**.

Para o grupo de aços carbono que **inclui o 1045** (Tabela 17, "Plain carbon steels: 1027 … 1045 …
1541", 125–175 HB e 175–225 HB):

| Ponto | `fn` [in/volta] | `fn` [mm/volta] | `vc` [ft/min] | `vc` [m/min] | `k = fn/D` |
|---|---|---|---|---|---|
| *Optimum* (avanço alto / vc baixa) | 0,008 | **0,203** | 365 | **111** | **0,0080** |
| *Average* (avanço baixo / vc alta) | 0,004 | **0,102** | 735 | **224** | **0,0040** |

**Regra de partida do U-drill: `fn ≈ 0,006 · D`, faixa 0,004–0,008 · D** — ou seja, **cerca de
1/3 do `k` da broca helicoidal**. Coerente com a cinemática: a broca de insertos tem inserto
central e periférico em raios diferentes, e cada um corta a largura toda do seu setor.

*Confiança: REFERÊNCIA ÚNICA (MH 27ª, Tabela 17) — mas é medida direta, com condição declarada.*

**Alerta de produto:** os 224 m/min do ponto *average* são para inserto de metal duro revestido
(grade 10 da Tabela 16 do MH) e **valem só até 2·D de profundidade**. Acima disso o dado sai da
condição declarada.

### Alargador — RESPONDIDO (com ressalva de material)

MH 27ª ed., p. 1032, nota da Tabela 17: os dados combinados de alargamento são baseados em
**alargador de 8 dentes, Ø 25/32″ (19,84 mm), ângulo de posição 30°, e penetração radial de
0,008″ (0,20 mm no raio → 0,40 mm no diâmetro de sobremetal)**.

Para aço carbono baixo (grupo 1006–1025, 100–125 HB) e aços de usinagem fácil (1212), alargador de
metal duro revestido:

| Ponto | `fn` [in/volta] | `fn` [mm/volta] | `fn` por dente [mm] | `vc` [m/min] | `k = fn/D` |
|---|---|---|---|---|---|
| *Optimum* | 0,036 | **0,914** | 0,114 | 43 | 0,046 |
| *Average* | 0,018 | **0,457** | 0,057 | 56 | 0,023 |

**Duas leituras que o produto precisa:**
1. O avanço por volta do alargador é **2 a 3× o da broca do mesmo diâmetro** — o alargador não é
   "furação com avanço fino". Alimentar a tela do alargador com a regra da broca subestima o avanço
   por um fator de 2 a 3.
2. O **sobremetal de partida** é 0,40 mm no diâmetro (0,20 mm no raio) — número que a tela do
   alargador precisa e que a documentação do produto não tem.

*Confiança: REFERÊNCIA ÚNICA.* **LACUNA parcial:** a Tabela 17 do MH **não traz dado combinado de
alargamento para o grupo do 1045** (só velocidade tradicional de HSS). Os números acima são do
grupo de aço carbono mais mole; para 1045 a 170–220 HB são extrapolação, não leitura.

### Broca de centro / spot drill — LACUNA

Não encontrei, dentro do território, avanço de partida publicado para broca de centro nem para
furo de centragem (spot). MH 27ª cobre a **geometria** da broca de centro (norma de dimensões), não
o `fn`. As fontes que publicam esse avanço são catálogo de fabricante e guia de aplicação — fora do
meu escopo. **LACUNA.**

### Escareador (countersink) — LACUNA

Idem. Não encontrei `fn` de partida publicado para escareamento dentro do território. MH 27ª trata
o escareador em geometria e ângulos (60°, 82°, 90°, 100°), não em avanço.
Fonte que teria o dado: catálogo de fabricante de escareador — fora do escopo. **LACUNA.**

## 1.3 — Variação do `fn` com a relação profundidade/diâmetro

**Existe limiar publicado, e ele é 3·D. Não encontrei curva graduada dentro do território.**

| Fonte | Limiar | O que manda fazer |
|---|---|---|
| MH 27ª ed., p. 1034 (*Drilling Difficulties*) | **profundidade > 3·D** | retirar a broca em intervalos (peck) para remover cavaco e deixar o refrigerante chegar à ponta |
| University of Florida, EML2322L, p. 2 | **profundidade > 3·D** | reduzir **avanço e velocidade em até 50%** |
| MH 27ª ed., p. 1033 (dado de broca de insertos) | **profundidade ≈ 2·D** | acima disso o dado tabelado de U-drill deixa de valer |

**Regra de partida utilizável:**
```
L/D ≤ 3      →  fn cheio
L/D > 3      →  reduzir fn e vc em até 50%  (fator 0,5 no limite)
U-drill: o dado de catálogo/handbook vale até L/D ≈ 2
```

*Confiança: CONSENSO no limiar de 3·D (duas fontes independentes).
REFERÊNCIA ÚNICA no fator de 50% (só a UF publica o número).*

**LACUNA declarada:** **não existe, no meu território, fator de redução graduado por faixa de L/D**
(do tipo 3D → 0,9; 5D → 0,8; 8D → 0,6). Essa escada é exatamente o que catálogo de fabricante de
broca publica, e catálogo está fora do meu escopo. O que tenho é um limiar binário mais um teto de
redução.

**Alerta quantificado, com a consequência nomeada pela fonte:** o mecanismo do limite não é força de
corte, é **evacuação de cavaco e chegada de refrigerante**. MH 27ª p.1034: cavaco entupido nos canais
gera calor, impede o fluido de conduzir calor da ponta, e resulta em falha prematura. Brocas
pequenas têm alma proporcionalmente mais grossa e canais menores, portanto **entopem antes** —
o limiar de 3·D é mais severo em diâmetro pequeno.

## 1.4 — Faixa de segurança em torno do `fn` de partida

Três medidas diferentes, das mesmas fontes, e elas dão respostas de tamanho diferente. Entrego as
três, porque cada uma responde a uma pergunta distinta do operador.

**(a) Faixa material-a-material, mesmo diâmetro — 2,5 a 3,0×.**
É a largura da própria faixa de MH/UF (0,004–0,010 in/rev para 1/4″–1/2″, p. ex.). Ou seja: a
diferença entre aço ferramenta e alumínio no mesmo diâmetro é um fator ~3. Se o produto acertar o
material, essa dispersão já está consumida.

**(b) Faixa de troca avanço↔velocidade a vida constante — 2× para cima, com penalidade de `vc`.**
MH 27ª ed., Tabela 17 e Tabela 22, p. 1040. Os dados combinados dão dois pontos com **a mesma vida
de ferramenta (~45 min)**: um *optimum* (avanço alto, `vc` baixa) e um *average* (avanço metade,
`vc` cerca do dobro). Para o grupo do 1045 com broca de insertos: 0,203 mm/volta a 111 m/min **ou**
0,102 mm/volta a 224 m/min — mesma vida.

Da Tabela 22 (coluna `Vavg/Vopt = 2,0`), o fator de velocidade `Ff` em função da razão
avanço/avanço-ótimo:

| avanço / avanço ótimo | `Ff` (multiplicador de `vc` a vida constante) |
|---|---|
| 1,00 | 1,00 |
| 0,80 | 1,31 |
| 0,60 | 1,73 |
| 0,50 | 2,00 |
| 0,30 | 2,57 |
| 0,20 | 2,68 |
| 0,10 | 2,08 |

Leitura de produto: **abaixar o avanço tem retorno decrescente e depois negativo.** De 1,00 para
0,50 o operador ganha o dobro de velocidade; de 0,30 para 0,10 ele **perde** velocidade
(2,57 → 2,08). Existe um ótimo, e ele fica em torno de avanço/ótimo ≈ 0,2. Abaixo disso a
combinação piora nas duas pontas.

*Confiança: REFERÊNCIA ÚNICA (MH 27ª, Tabela 22), mas é tabela publicada, não interpolação minha.*

**(c) Faixa antes de risco real, por modo de falha.** Aqui as fontes dão o mecanismo, não o número.

**Extremo de avanço ALTO — modos de falha nomeados por MH 27ª ed., p. 1034 e p. 1029:**

| Sinal observável | Causa declarada pela fonte |
|---|---|
| Broca **rachada na alma / no núcleo** | avanço excessivo (ou folga de ponta insuficiente por afiação ruim) |
| **Lascamento / quebra nas arestas de corte** | avanço pesado demais (ou folga de ponta excessiva) |
| **Deflexão grande da máquina e quebra da broca** | força de avanço muito alta — MH atribui à aresta transversal longa demais (p. 1029): "a chisel edge that is too long will result in a very significant increase in the thrust force" |
| Desgaste rápido dos **cantos externos** | velocidade alta demais (não avanço) — MH separa os dois sintomas |

**Extremo de avanço BAIXO — quantificado pelo Kienzle, com a fonte da Questão 2:**
A fonte de Q2 (Sekulić et al., TMT 2014) mede `1 − mv = 0,75` para a furação, ou seja `kc ∝ h^(−0,25)`.
Consequência direta, aritmética:

| Redução do avanço | Aumento de `kc` | Aumento da energia específica de corte |
|---|---|---|
| ×0,50 | +19% | +19% |
| ×0,25 | +41% | +41% |
| ×0,10 | +78% | +78% |

Ou seja: cortar o avanço pela metade faz cada mm³ removido custar 19% mais energia — que vira
calor na ponta, no mesmo furo que agora leva o dobro do tempo. É a versão quantificada do
"encruamento e atrito em avanço baixo" do enunciado, e o mecanismo (energia específica subindo
quando `h` cai) está na própria equação de Kienzle, não em opinião.

**LACUNA:** não encontrei, no território, um número publicado do tipo "o operador pode afastar-se
±X% do `fn` de partida antes de risco". A literatura dá faixa (a), troca a vida constante (b) e
modo de falha qualitativo (c) — não dá a banda de segurança percentual. Fonte que publicaria isso:
guia de aplicação de fabricante, fora do escopo.

**Recomendação defensável a partir do que há:** usar a razão *optimum/average* do próprio MH como
banda — **de 0,5× a 1,0× do `fn` de partida é território de vida de ferramenta equivalente**, e
acima de 1,0× o operador entra na região onde MH nomeia rachadura de alma e lascamento de aresta.

---

# QUESTÃO 2 — Espessura de cavaco em furação (a entrada do Kienzle)

> Respondida primeiro por ser a única das quatro com resposta fechada em literatura revisada.

## 2.1 — Espessura de cavaco não deformada na furação com broca helicoidal

**FÓRMULA:**

```
h = (f / 2) · sin(σ / 2)          [espessura de cavaco não deformada, mm]
b = (D / 2) / sin(σ / 2)          [largura de cavaco não deformada, mm]
```

onde:
- `f` = avanço por rotação [mm/volta]
- `σ` (sigma) = **ângulo de ponta inteiro** da broca [graus] — 118° na broca padrão
- `D` = diâmetro da broca [mm]

**Fonte primária:** SEKULIĆ, M.; KOVAČ, P.; GOSTIMIROVIĆ, M.; HADŽISTEVIĆ, M.; JURKOVIĆ, Z.
*Prediction of the main cutting force in drilling by Kienzle equation.* 18th International
Research/Expert Conference "Trends in the Development of Machinery and Associated Technology"
(TMT 2014), Budapest, Hungria, 10–12 set. 2014, p. 5–8. Equações (2) e (3), p. 6.
URL: https://www.tmt.unze.ba/zbornik/TMT2014/TMT2014_003.pdf

**Verificação numérica dentro da própria fonte:** para D = 10 mm ela reporta b = 5,833 mm.
Invertendo: sin(σ/2) = 5 / 5,833 = 0,8572 → σ/2 = 59,0° → **σ = 118°**. A fórmula fecha com a
broca padrão. E a coluna `h` da Tabela 1 do artigo reproduz exatamente `h = (f/2)·sin(59°)` nas
seis linhas (f = 0,056 → h = 0,0240 mm; f = 0,179 → h = 0,0767 mm). Fórmula conferida por
recomputação, não só por leitura.

**Símbolos por fonte:**

| Fonte | Espessura | Largura | Avanço/volta | Ângulo de ponta | Ângulo de posição |
|---|---|---|---|---|---|
| Sekulić et al. (TMT 2014) | `h` | `b` | `f` | `σ` (sigma) | não nomeia — usa `σ/2` direto |
| Notação DIN/ISO clássica (Kienzle) | `h` | `b` | `f` | `σ` | `κ` (kappa) |
| Notação PT-BR (Ferraresi; Diniz-Marcondes-Coppini) | `h` | `b` | `f` | `σ` | `χ` (chi), "ângulo de posição" |

*Confiança: CONSENSO.* A forma `h = fz · sin κ` é a mesma do fresamento e do torneamento; a
particularidade da furação é só que `fz = f/2` (duas arestas) e `κ = σ/2`.

## 2.2 — O ângulo de ponta entra como `κ`? Inteiro ou metade?

**Resposta: METADE. `κ = σ/2`.** O ângulo de posição da aresta principal da broca helicoidal é a
metade do ângulo de ponta, nunca o ângulo de ponta inteiro.

Justificativa geométrica verificável na própria fonte: o ângulo de ponta é medido **entre as duas
arestas**. Cada aresta individual faz `σ/2` com o eixo. Como `κ` é sempre o ângulo de **uma**
aresta em relação à direção de avanço, `κ = σ/2`. Para a broca padrão de 118°: `κ = 59°`,
`sin κ = 0,857`.

**Consequência para o produto — dois efeitos, não um:**
1. `h` cai com `sin(σ/2)` — afinamento de cavaco.
2. `b` cresce com `1/sin(σ/2)` — aresta engajada mais longa.

O produto `b · h = (D/2)·(f/2) = D·f/4` é **independente do ângulo de ponta**. A área de cavaco
não muda com σ; muda a *distribuição* dela — e, via Kienzle (expoente `1-mc` < 1), a força
específica sobe quando h diminui, a área constante.

*Confiança: CONSENSO*

**Sensibilidade quantificada.** 118° (padrão) contra 140° (ponta de broca de MD para aço):

| σ | κ = σ/2 | sin κ | h relativo | kc relativo (1-mc=0,75) | Fc por aresta relativo |
|---|---|---|---|---|---|
| 90° (escareador/spot) | 45° | 0,707 | 0,825 | +5,0% | −13,4% |
| 118° (padrão) | 59° | 0,857 | 1,000 | ref. | ref. |
| 135° | 67,5° | 0,924 | 1,078 | −1,9% | +5,8% |
| 140° | 70° | 0,940 | 1,097 | −2,4% | +7,1% |

Efeito de segunda ordem, dentro dos ±15–25% declarados do modelo — mas é o campo do ângulo de
ponta finalmente alimentando alguma coisa, em vez de ficar morto na tela.

## 2.3 — Essa espessura é a que entra no Kienzle?

**Sim — com uma ressalva que a própria fonte levanta e que muda o desenho do produto.**

A fonte aplica Kienzle na forma canônica `Fv = kv1.1 · b · h^(1 − mv)`, com `b` e `h` das eqs. (2)
e (3). Erro médio de **4,71%** contra medição (6 pontos; aço C15; broca helicoidal padrão
D = 10 mm; vc = 22,3 m/min; máquina Index GU600; dinamômetro Kistler).

**A ressalva — DIVERGÊNCIA DECLARADA, e é o achado mais importante desta questão.**

O artigo afirma textualmente que o modelo Kienzle passou a ser usado em furação **com coeficientes
obtidos em ensaios de torneamento**, e classifica essa prática como "only partially correct
because each machining process has its own characteristics" (p. 5, seção 1). O trabalho existe
justamente para determinar `kv1.1` e `1-mv` a partir de ensaios **de furação**.

Existem portanto **duas práticas**, e elas não dão o mesmo número:

- **Prática A (majoritária, e a que o produto herdaria de graça):** usar o par `kc1.1 / mc`
  tabelado de torneamento também na furação. A fonte diz que isso é parcialmente incorreto.
- **Prática B (a do artigo):** par de constantes específico de furação, medido em furação.
  Para aço C15 + broca helicoidal padrão de MD/HSS: **kv1.1 = 1639,05 N/mm² e 1−mv = 0,75**
  (portanto `mv = 0,25`).

**Por que divergem:** a furação tem três regiões de corte com física diferente. A distribuição do
torque total, medida no artigo por plano experimental de broca escalonada (sub-experimentos
A, B, C, D):

| Região | Símbolo | Parcela do torque total |
|---|---|---|
| Arestas principais — corte real | `MR` | **0,73 M** |
| Guias / quinas — atrito | `MT` | **0,19 M** |
| Aresta transversal (chisel edge) — extrusão | `MJ` | **0,08 M** |

*(Sekulić et al., TMT 2014, seção 3; aço C15, D = 10 mm)*

Ou seja: **27% do torque de furação não é corte de aresta principal** — é atrito de guia e
extrusão no núcleo. Um Kienzle alimentado só por `b·h` da aresta principal, com constante de
torneamento, ignora esses 27%. A constante medida em furação já os absorve.

*Confiança: REFERÊNCIA ÚNICA para os números (0,73 / 0,19 / 0,08 e 1639,05 / 0,75) — um artigo, um
material, um diâmetro. A existência da divergência entre prática A e B é CONSENSO; os valores não.*

## 2.4 — O limite `h < 0,1 mm` do Kienzle vale para furação?

**Achado que contraria a premissa do enunciado.** Com avanço de partida típico e broca comum, a
espessura calculada em furação cai **quase sempre** abaixo de 0,1 mm. Não é caso de borda: é o
caso normal.

Quantificação com `h = (f/2)·sin 59° = 0,4286 · f` (broca 118°):

| `f` [mm/volta] | `h` [mm] | Abaixo de 0,1 mm? |
|---|---|---|
| 0,05 | 0,021 | sim |
| 0,10 | 0,043 | sim |
| 0,15 | 0,064 | sim |
| 0,20 | 0,086 | sim |
| **0,233** | **0,100** | fronteira |
| 0,30 | 0,129 | não |

**Só acima de `f ≈ 0,233 mm/volta` a espessura passa de 0,1 mm.** Pelas regras de partida da
Questão 1, esse avanço corresponde a broca de diâmetro grande — ordem de 20 mm ou mais. Para toda
a faixa de furação de oficina até ~D 15 mm, `h < 0,1 mm`, sempre.

O que a evidência diz sobre o limite: a fonte ajustou Kienzle **inteiramente dentro da região
supostamente proibida** — `h` de 0,0240 a 0,0767 mm — com erro médio 4,71% e máximo 7,35%.
Portanto:

- O limite `h < 0,1 mm` **não é um limite físico do modelo Kienzle**; é o limite de validade do
  **par de constantes** ajustado em outra faixa e em outro processo. O que quebra é extrapolar
  constante de torneamento (ajustada tipicamente em h de 0,1–0,5 mm) para h = 0,03 mm.
- Com constantes ajustadas na própria faixa fina e no próprio processo, Kienzle sustenta
  h = 0,024 mm com erro < 8%.

**Consequência de produto:** o alerta de "h abaixo do limite de validade" não pode disparar em
furação do jeito que dispara em fresamento — dispararia em ~100% das furações de oficina, virando
ruído. O que precisa mudar é a **origem da constante**, não o alerta.

*Confiança: CONSENSO na aritmética; REFERÊNCIA ÚNICA na evidência experimental de que Kienzle
sustenta h = 0,024 mm com constante própria de furação.*

## 2.5 — Torque e potência em furação

Como 2.3 conclui que Kienzle **se aplica**, o torque sai da própria cadeia Kienzle:

```
Fc (por aresta) = kc · b · h = kc · (D/2 / sin κ) · (f/2 · sin κ) = kc · D · f / 4
```

O `sin κ` **cancela** — a força por aresta não depende do ângulo de ponta; só `kc` depende, via h.
Com 2 arestas e braço médio `D/4`:

```
Mc = 2 · (kc · D · f / 4) · (D / 4) = kc · f · D² / 8      [N·mm; kc N/mm²; f e D em mm]

Pc [W]  = Mc · 2πn / 60 / 1000                             [n em rpm]
Pc [kW] = kc · f · D · vc / 240000                         [kc N/mm²; f mm/volta; D mm; vc m/min]
```

As duas formas de `Pc` são algebricamente idênticas (substituindo `n = 1000·vc/(π·D)`); conferi a
equivalência passo a passo.

**Procedência:** a derivação acima é aritmética direta sobre as eqs. (1), (2) e (3) de Sekulić et
al. (TMT 2014). Nenhum número novo é introduzido. Quanto a uma **citação de handbook** para a
forma consagrada `Mc = kc·f·D²/8`, ver LACUNAS.

**Correção obrigatória sobre o braço `D/4`.** A hipótese "resultante no raio médio" (`braço = D/4`)
é uma simplificação. A fonte **mediu** o braço real da força principal e obteve **`xv = 0,443·D`**
para aço C15 — contra `0,25·D` da hipótese simples, fator **1,77**. Mediu também o ângulo
**`φv = 28°`** entre a resultante e a aresta, e os braços parciais por região: `xT = D` (guias),
`xR = 0,57·D` (aresta principal), `xJ = 0,09·D` (aresta transversal), com ângulos
`φT = 9°`, `φR = 16°`, `φJ = 50°–52°`.

Consequência prática: `Mc = kc·f·D²/8` **subestima** o torque real se alimentada por `kc` de
aresta principal pura. O `kv1.1 = 1639,05 N/mm²` do artigo é o valor que faz a conta fechar contra
a força medida — **não é intercambiável com `kc1.1` de tabela de torneamento**.

*Confiança: CONSENSO na álgebra; REFERÊNCIA ÚNICA em `xv = 0,443·D`, `φv = 28°` e nos braços parciais.*

**Força de avanço (thrust) — LACUNA parcial.** A fonte trata a força principal `Fv` e o torque; a
força de avanço `Ff` aparece só como conceito (soma das duas parciais `Fs1`), sem fórmula fechada
nem constante. Não fechei fórmula citável de thrust dentro do território nesta apuração.

---

# QUESTÃO 3 — Velocidade de corte no roscamento com macho

## 3.1 — `vc` praticada no roscamento com macho de corte

### Fonte A — tabela de handbook

MACHINERY'S HANDBOOK, 27ª ed., Tabelas 17 a 21, **coluna "Threading — HSS"**. A coluna dá dois pares
avanço/velocidade por material, sendo o avanço **o próprio passo**: 0,083 in (12 fpp, passo grosso)
e 0,020 in (50 fpp, passo fino). Vida esperada ~45 min. Válida para macho e para cossinete de
pente; **não** vale para rosca com ferramenta de ponta única (MH 27ª, p. 1042).

Convertido para m/min (× 0,3048):

| Material | HB | `vc` @ passo 2,12 mm (grosso) | `vc` @ passo 0,51 mm (fino) |
|---|---|---|---|
| Aço carbono ressulfurado 1212/1213/1215 | 100–200 | **42,7** | **56,4** |
| Aço carbono ressulfurado 1108–1211 | 100–200 | **27,4** | **35,1** |
| Aço carbono 1006–1025 | 100–125 | **42,7** | **56,4** |
| Aço liga (4140, 5140, 8640, 4340 …) | 175–225 | **38,1** | **48,8** |
| Aço ferramenta W1/W2/W5 e H21–H26 | 150–225 | **22,9** | **29,0** |
| Inox austenítico 303 / 304 / 316 / 321 | 135–185 | **10,7** | **13,7** |
| Inox ferrítico 405/409/430/434 | 135–185 | **12,2** | **15,5** |
| Inox endurecível por precipitação (17-4PH etc.) | 150–200 | **10,7** | **13,7** |
| FoFo cinzento ASTM Classe 20–40 | 120–220 | **27,4** | **24,4** |
| FoFo cinzento ASTM Classe 45–60 | 220–320 | **16,8** | **13,7** |
| FoFo nodular ferrítico 60-40-18 / 65-45-12 | 140–190 | **24,4** | **21,3** |
| FoFo maleável ferrítico 32510/35018 | 110–160 | **30,5** | **25,9** |
| Alumínio forjado 6061-T651, séries 5000/6000/7000 | — | **193,5** | **172,2** |
| Alumínio fundido sob pressão 360.0/380.0 | — | **39,6** | **35,1** |
| Alumínio fundido sob pressão 413 | — | **25,9** | **24,4** |

**Interpolação por passo (regra do MH, p. 1042):** passo entre 0,51 e 2,12 mm → interpolar
linearmente. Passo mais grosso que 2,12 mm → usar o valor de passo grosso. Passo mais fino que
0,51 mm → usar o de passo fino. Prosa do MH: "the cutting speed for coarse-pitch taps must be lower
than for fine-pitch taps with the same diameter".

### Fonte B — congresso científico brasileiro, com medição

BEZERRA, A. A.; COELHO, R. T.; SILVA, L. R.; BRAGHINI JÚNIOR, A.; SOTO, M. *Aplicação de MQL no
processo de roscamento com alta velocidade de corte.* Anais do CONEM 2004, ABCM — Associação
Brasileira de Engenharia e Ciências Mecânicas. URL: http://www.abcm.org.br/anais/conem/2004/21016.pdf

Condição: furos passantes **M8×1,25**, 26 mm de comprimento, em **ferro fundido cinzento DIN GG25,
226 HB**, matriz perlítica. Macho de corte **HSS de metalurgia do pó**, DIN 371, 3 canais retos,
ponta helicoidal, entrada tipo B (3,5–5 filetes), revestimento PVD TiAlN ou TiCN (≤5 µm).
Centro de usinagem Romi Discovery 560; dinamômetro Kistler 9272.

Frase decisiva do artigo: **a 30 m/min, "velocidade de corte convencional e no mesmo patamar da
empregada pela indústria"**. 60 m/min é tratado como HST (*High Speed Tapping*).

Resultados medidos:

| `vc` | Torque medido | Furos roscados (limite 408) | Desgaste de flanco |
|---|---|---|---|
| **30 m/min** | **2 a 5 N·m** (sem variação significativa) | 408 em **todos** os ensaios | ~0,6 mm após 408 furos |
| **60 m/min** | picos acima de 5, **chegando a ~10 N·m** | abaixo de 408 | significativamente maior |

ANOVA (α = 0,05): a `vc` foi **o único fator significativo** sobre o número de furos roscados
(P = 0,04) e sobre o desgaste de flanco (P = 0,013). Revestimento não foi significativo
(P = 0,523 e 0,192). A condição de lubri-refrigeração foi o único fator significativo sobre o
**torque** (P = 0,017).

### As duas fontes conferem

MH para FoFo cinzento Classe 20–40 (120–220 HB), interpolado para o passo de M8×1,25
(P = 1,25 mm = 0,0492 in): **≈ 25,8 m/min**. A medição brasileira em GG25 226 HB diz que a prática
é **30 m/min**. Diferença de **16%** entre um handbook norte-americano e um artigo de congresso
brasileiro, em material e passo equivalentes.

*Confiança da faixa de FoFo: CONSENSO (duas fontes independentes, 16% de dispersão).*
*Confiança das demais linhas da tabela do MH: REFERÊNCIA ÚNICA.*

### AÇO 1045 — LACUNA parcial, e é o material do exemplo do produto

**A Tabela 17 do MH não traz dado de rosqueamento para o grupo do 1045** ("Plain carbon steels:
1027 … 1045 … 1541"). Para esse grupo só há velocidade tradicional de furação com HSS. Os dados
mais próximos publicados são:

- **Aço liga a 175–225 HB → 38,1 a 48,8 m/min** (mesma dureza do 1045 do enunciado, ISO P)
- **Aço carbono 1006–1025 a 100–125 HB → 42,7 a 56,4 m/min** (mais mole que o 1045)

Interpolando pelo passo de **M8×1,25** na linha de aço liga: **≈ 43,8 m/min → 1.743 rpm**.

Registro isso como **estimativa por vizinhança**, não como leitura de tabela.

### MD (metal duro) no macho — LACUNA declarada

**A coluna de rosqueamento do MH é exclusivamente HSS.** Não há, em nenhuma das Tabelas 17–23,
coluna de macho de metal duro. O artigo brasileiro também usa HSS-PM. **Não encontrei, em nenhuma
fonte do meu território, `vc` publicada para macho de metal duro.**

Fonte que teria o dado: catálogo de fabricante de macho (OSG, Emuge, Guhring, Dormer) e guia de
aplicação — categoricamente fora do meu escopo.

O que posso afirmar sem inventar: a regra do produto (multiplicar `vc` do material por um fator de
substrato) **não tem lastro na literatura de rosqueamento que eu alcancei**, porque a literatura
não publica a versão MD do número que o fator multiplicaria. Ver 3.3.

## 3.2 — Macho de conformação (roscamento por deformação)

### `vc` por material — LACUNA

**Não encontrei `vc` publicada para macho de conformação interno em nenhuma fonte do meu
território.** A busca em anais da ABCM, teses e periódicos revisados retornou trabalhos sobre o
processo, mas os que trazem números **declaram explicitamente que os níveis experimentais vieram de
catálogo de fabricante** — no caso, "Emuge (2010)". Ou seja: a fonte primária do número é catálogo,
que meu briefing exclui. Preencher aqui seria lavar a procedência.

Fonte que teria o dado: catálogo e guia de aplicação de fabricante de macho de conformação.

### O único ponto de comparação que consegui dentro do território

MACIEL, D. T.; RIBEIRO FILHO, S. L. M.; BRANDÃO, L. C. *Análise dos processos de roscamento por
usinagem e conformação na liga Ti-6Al-4V.* 8º COBEF — Congresso Brasileiro de Engenharia de
Fabricação, Salvador/BA, 18–22 maio 2015, ABCM. Universidade Federal de São João del-Rei.
URL: https://abcm.org.br/anais/cobef/2015/PDFS/COF-2015-0013.PDF

| Processo | Velocidade máxima determinada por ensaio preliminar |
|---|---|
| Roscamento por **usinagem** (Ti-6Al-4V) | **38,83 m/min** |
| Roscamento por **conformação** (Ti-6Al-4V) | **18,3 m/min** |

**Razão conformação/usinagem ≈ 0,47.** Refrigeração: emulsão de óleo solúvel a 8%, vazão 20 l/min.

**Ressalva pesada, e ela invalida o uso direto:** este ensaio é **rosca externa por laminação axial
com três rolos em torno CNC**, não macho de conformação em furo. A cinemática é parente, não igual.
Trato como **indício de ordem de grandeza** — a conformação roda mais devagar que o corte no mesmo
material — e não como número transferível.

*Confiança: REFERÊNCIA ÚNICA, e fora da cinemática pedida. NÃO usar como valor de partida.*

### Materiais contraindicados — LACUNA de fonte, com o mecanismo declarado

**O limiar numérico que a indústria usa — alongamento mínimo em torno de 8% e dureza máxima em
torno de 30 HRC — aparece de forma consistente na busca, mas exclusivamente em guia de aplicação,
material de treinamento e catálogo de fabricante.** Nenhuma fonte do meu território publica esse
limiar. **LACUNA declarada.** Não vou transcrever um número de fonte proibida só para não deixar a
célula vazia.

O que a literatura do meu território sustenta é o **mecanismo**, não o corte: o roscamento por
conformação produz o filete por **deformação plástica**, sem remoção de cavaco (COBEF 2015, seção 1:
"no processo de conformação a peça toma forma através da deformação plástica"). Um processo que
depende de escoamento plástico exige material que escoe. Material frágil — ferro fundido cinzento,
com veios de grafita e alongamento praticamente nulo — **não escoa; trinca**. A conclusão é
consistente com o mecanismo, mas **não achei fonte no território que a afirme por escrito**, então
ela entra como raciocínio declarado, não como dado citável.

**Fonte revisada que atacaria a questão e que eu não consegui abrir:** *Analytical study of maximal
tapping torque during forming screw process* (Journal of Materials Processing Technology, Elsevier,
DOI 10.1016/j.jmatprotec.2010.08.008) e *Precision and surface integrity of threads obtained by form
tapping*. As duas estão atrás de paywall; registro os identificadores para quem tiver acesso.

## 3.3 — A `vc` de roscamento se deriva da `vc` de fresamento por um fator?

**NÃO. É tabela própria e independente. Esta é a resposta que decide o desenho do produto, e ela
é negativa com evidência quantitativa.**

### Evidência 1 — a estrutura da fonte

O MH 27ª não deriva nada: as Tabelas 17–23 têm uma **coluna de rosqueamento preenchida
independentemente**, ao lado das colunas de furação e alargamento, com **valores próprios por
material**. Não há em lugar nenhum do handbook um fator "rosqueamento = k × furação" ou
"= k × fresamento".

### Evidência 2 — a razão não é constante, e varia por um fator de 3,3

Razão entre a `vc` de rosqueamento (coluna Threading HSS) e a `vc` tradicional de furação com HSS,
**na mesma linha, mesmo material, mesma dureza** (dado do MH 27ª, Tabelas 17–21):

| Material | HB | `vc` furação HSS [fpm] | `vc` rosca [fpm] | **Razão rosca/furação** |
|---|---|---|---|---|
| Inox austenítico 304 | 135–185 | 55 | 35 – 45 | **0,64 – 0,82** |
| FoFo cinzento Classe 20 | 120–150 | 100 | 80 – 90 | **0,80 – 0,90** |
| Aço ressulfurado 1108/1120 | 100–150 | 110 | 90 – 115 | **0,82 – 1,05** |
| Aço ferramenta W1/W2/W5 | 150–200 | 85 | 75 – 95 | **0,88 – 1,12** |
| Aço ressulfurado 1212 | 100–150 | 120 | 140 – 185 | **1,17 – 1,54** |
| Aço carbono 1006–1025 | 100–125 | 100 | 140 – 185 | **1,40 – 1,85** |
| Alumínio forjado 6061 | — | 400 | 565 – 635 | **1,41 – 1,59** |
| Aço liga 4140/8640 | 175–225 | 75 | 125 – 160 | **1,67 – 2,13** |

**A razão vai de 0,64 a 2,13 — fator de 3,3 entre os extremos.** Nenhum fator único por família
reproduz isso dentro de qualquer margem que o produto possa declarar. Um fator médio de ~1,2
erraria −47% no inox e +78% no aço liga.

### Evidência 3 — a `vc` de rosca depende do PASSO, e nenhum fator de família captura isso

Dentro de **um mesmo material e diâmetro**, a `vc` tabelada muda até **+28%** entre passo grosso e
passo fino (aço liga: 125 → 160 fpm). Passo não é entrada de nenhuma tabela de fresamento ou
furação. Um "fator de família" é matematicamente incapaz de representar uma dependência que o
parâmetro de origem nem possui.

**Decisão de produto que a evidência sustenta:** **o macho precisa de tabela própria, indexada por
material × passo.** Não é preferência de arquitetura, é o que os dados obrigam.

**Nota sobre a fresa de rosca — e ela vai na direção contrária.** A fresa de rosca **é** fresamento:
ferramenta multicortante rotativa com avanço por dente e interpolação helicoidal. Para ela a `vc` de
fresamento do material **é** a `vc` correta, e o MH nem lhe dedica coluna. Ou seja, a família
"roscar" do produto contém **duas cinemáticas com origens de dado opostas**: macho puxa de tabela
própria, fresa de rosca puxa da tabela de fresamento. Tratar as duas com a mesma regra é errado nos
dois sentidos.

## 3.4 — Limite de rotação por razões que não são de corte

**Existe teto prático publicado, e ele é de hardware — não de velocidade de corte.**

### Teto medido, com fonte

O artigo do CONEM 2004 (ABCM) declara o equipamento: centro de usinagem com eixo-árvore de
**7 a 7.500 rpm**, mas **cabeçote de roscar auto-reversível CST Tapmatic RDTIC-50, com capacidade
até M12 e rotação máxima de 2.500 rpm**.

Isto é: **o gargalo não era o eixo-árvore da máquina, era o dispositivo de roscar** — por um fator
de 3. E o teto do dispositivo (2.500 rpm) é exatamente onde os 60 m/min de HST em M8 caem
(n = 1000 × 60 / (π × 8) = **2.387 rpm**). O ensaio de HST estava rodando **a 95% do limite do
cabeçote**.

*Confiança: REFERÊNCIA ÚNICA — é um modelo específico de cabeçote, não um limite universal. Mas é
um número real, medido, de um artigo revisado.*

### Fatores que obrigam a baixar a rotação — MH 27ª, p. 1042–1043

Todos qualitativos, exceto o primeiro, que vem quantificado:

| Fator | Efeito declarado pela fonte |
|---|---|
| **Percentual de filete cheio** | **quantificado:** o torque para 100% de filete é **mais que o dobro** do de 50%. A velocidade deve cair conforme o percentual sobe |
| **Comprimento roscado** | quanto mais longo o furo, mais baixa a velocidade — mais atrito, mais cavaco acumulado, refrigerante não chega. **Pior ainda com o furo na horizontal** |
| **Capacidade de sincronismo e de reversão da máquina** | máquinas que avançam exatamente o passo e revertem o eixo rapidamente podem rodar rápido; onde o avanço é manual (furadeira de coluna, torre de torno) **a velocidade tem de cair** para o operador manter controle seguro |
| **Passo** | passo grosso obrigatoriamente mais lento que passo fino no mesmo diâmetro |
| **Tipo de chanfro do macho** | chanfro longo (macho de entrada) é mais rápido em furo curto; chanfro curto (plug) é mais rápido em furo fundo; **macho de fundo é o mais lento dos três** |
| **Macho cônico / de tubo (NPT)** | mais lento que macho de rosca paralela do mesmo diâmetro — todos os filetes engajados cortam, não só os do chanfro |
| **Perfil de rosca** | Acme, trapezoidal e quadrada: mais lentas, muito mais metal removido |
| **Precisão exigida** | rosca de precisão mais lenta que rosca de classe comercial |
| **Fluido de corte** | MH classifica o efeito do fluido sobre a `vc` de rosqueamento como "very great" e recomenda tratá-lo como decisão de projeto da operação |

**LACUNA declarada:** **não encontrei, no meu território, um teto de rotação publicado que venha do
sincronismo eletrônico do eixo-árvore** (erro de sincronismo em *rigid tapping*, tempo de inversão,
aceleração do eixo Z). A busca só retornou **patentes de fabricante de comando numérico**, que
descrevem o problema mas não publicam um limite de rpm utilizável. Fonte que teria o dado: manual
de comando (Fanuc, Siemens, Mitsubishi) e literatura de fabricante de máquina — fora do escopo.

**Consequência de produto, com número:** o defeito citado no enunciado — 140 m/min em M8 de aço
1045, **5.570 rpm** — quebra em quatro medidas independentes:

| Referência | Valor | Quanto o número do produto excede |
|---|---|---|
| Maior `vc` de rosqueamento em aço em toda a Tabela 17 do MH (1212, passo fino) | 56,4 m/min | **2,5×** |
| MH, aço liga 175–225 HB, interpolado para passo M8×1,25 | 43,8 m/min → 1.743 rpm | **3,2×** |
| "Velocidade convencional, no patamar da indústria" (CONEM 2004, FoFo GG25) | 30 m/min → 1.194 rpm | **4,7×** |
| Rotação máxima do cabeçote de roscar usado no ensaio (Tapmatic RDTIC-50, até M12) | 2.500 rpm | **2,2×** |

O alerta que falta no produto não é de afastamento relativo: é um **teto absoluto**. Duas travas
defensáveis com o que apurei: `vc` de rosqueamento em aço **acima de ~57 m/min** sai de tudo que o
MH tabela, e rotação **acima de 2.500 rpm** sai da capacidade do único dispositivo de roscar
documentado nas fontes que li.

## 3.5 — `vf = P × n` está travado?

**CONFIRMADO, e a literatura é categórica — mais categórica do que o enunciado.**

MACHINERY'S HANDBOOK, 27ª ed., p. 1033: "The feed used for tapping and threading must be equal to
the lead (feed = lead = pitch) of the thread being cut."

E p. 1042, com a formulação que decide a interface: **diferentemente de qualquer outra ferramenta de
corte, o avanço por rotação do macho não pode ser ajustado de forma independente** — ele é sempre
igual ao passo da rosca.

```
vf [mm/min] = P [mm] × n [rpm]        — igualdade, não recomendação
```

**Cuidado de vocabulário que o produto precisa acertar:** o MH diz **lead** (passo helicoidal), não
**pitch** (distância entre filetes). Em rosca de **uma entrada** os dois coincidem, e é o caso de
99% do que a oficina faz. Em rosca de **múltiplas entradas**, `lead = P × número de entradas`, e é
o **lead** que vale. Se o produto expuser rosca de duas entradas, `vf = P × n` fica errado por um
fator igual ao número de entradas.

*Confiança: CONSENSO.*

### As correções de prática que "quebram" a igualdade — e o que elas realmente são

Nenhuma das três altera a igualdade. Todas são **folga mecânica para absorver o erro de quem
comanda o avanço**, não uma taxa de avanço diferente.

1. **Macho flutuante / cabeçote com compensação axial.** O dispositivo tem curso axial livre
   (tração e compressão). O macho **se posiciona sozinho** pelo passo que ele mesmo já cortou; a
   flutuação absorve a diferença entre o avanço comandado e o passo real. A igualdade continua
   valendo — o que muda é **quem** a impõe: a rosca, não o comando. Uso clássico em máquina sem
   sincronismo eletrônico.

2. **Roscamento rígido (sincronizado).** O comando impõe `vf = lead × n` eletronicamente.
   A igualdade é o próprio algoritmo. O erro residual de sincronismo é o que se compensa com uma
   pinça de flutuação curta (poucos décimos), não com avanço diferente.

3. **Alívio de passo (*pitch relief*) do macho.** É **geometria da ferramenta**, não cinemática: o
   flanco do filete atrás do chanfro é levemente aliviado para reduzir atrito e evitar que o macho
   "se puxe" para dentro do furo. Não muda `vf`.

**Decisão de produto que isso sustenta:** o campo de avanço na tela de roscamento com macho deve ser
**calculado e somente leitura**, alimentado pelo passo. Deixá-lo editável cria um estado inválido
que a física não admite, e o operador não tem como usar essa liberdade para nada.

*Confiança: CONSENSO no travamento (MH, duas passagens). Os itens 1–3 são descrição de dispositivo,
sem número associado — trate como texto de interface, não como dado.*

---

# QUESTÃO 4 — Taxa de remoção de material em mandrilamento

## 4.2 — A literatura trata mandrilamento como torneamento interno? (respondida antes de 4.1, porque 4.1 depende dela)

**Sim, e de forma explícita — não há fórmula própria de mandrilamento na literatura de referência.**

**Fonte:** MACHINERY'S HANDBOOK, 27ª ed., **Tabela 29 — *Formulas for Calculating the Metal Removal
Rate, Q*** (seção *Estimating Speeds and Machining Power*, p. 1050). A tabela tem **três** linhas, e
não há linha de mandrilamento:

| Operação (como a Tabela 29 nomeia) | Q [in³/min] (unidades inglesas) | Q [cm³/s] (SI) |
|---|---|---|
| **Single-Point Tools (Turning, Planing, and Shaping)** | `12 · V · f · d` | `(V/60) · f · d` |
| Milling | `fm · w · d` | `fm · w · d / 60000` |
| Surface Broaching | `12 · V · w · nc · dt` | `(V/60) · u · nc · dt` |

`V` = velocidade de corte (ft/min ou m/min) · `f` = avanço por volta (in ou mm) ·
`d` = profundidade de corte (in ou mm) · `fm` = avanço linear da mesa.

**O mandrilamento cai na primeira linha, "ferramenta de ponta única".** É o mesmo tratamento que o
torneamento recebe — a barra de mandrilar e o cabeçote são ferramentas de ponta única gerando uma
superfície de revolução interna. Nenhuma correção por ser interno aparece na fórmula de remoção.

*Confiança: CONSENSO.* O handbook de referência simplesmente não distingue, e nenhuma fonte do
território propõe fórmula alternativa.

**Consequência de vocabulário para o produto:** a tela de mandrilamento não precisa de uma fórmula
nova de MRR. Precisa de **um mapeamento de entradas** — dois diâmetros em vez de uma penetração.

## 4.1 — A fórmula, em cm³/min, a partir de Di, Df, fn e n

Duas formas. **Elas não dão o mesmo número, e essa é a resposta que o produto precisa.**

### Forma exata (recomendada) — volume do anel removido por volta

Por volta, a ferramenta remove a coroa circular entre o diâmetro inicial e o final, com espessura
axial igual ao avanço:

```
Q [cm³/min] = π · (Df² − Di²) · fn · n / 4000
```

`Df` = diâmetro final (mm) · `Di` = diâmetro inicial do furo (mm) · `fn` = avanço por volta
(mm/volta) · `n` = rotação (rpm). O divisor 4000 = 4 (do π/4 da área) × 1000 (mm³ → cm³).

Exata por construção geométrica, sem aproximação. Vale para desbaste e acabamento, para passe único
e para passe múltiplo (nesse caso, aplicada por passe).

### Forma derivada de `vc · fn · ap` — a da Tabela 29 do MH, e onde ela escorrega

A Tabela 29 dá `Q = vc · fn · ap`. Em unidades métricas de oficina, com `vc` em m/min, `fn` em
mm/volta e `ap` em mm, o resultado sai direto em **cm³/min**:

```
Q [cm³/min] = vc · fn · ap
```
*(verificação de unidades: a Tabela 29 dá cm³/s = (V/60)·f·d; multiplicando por 60 s/min,
cm³/min = V·f·d. Confere.)*

**A armadilha: em que diâmetro se calcula `vc`.** Substituindo `ap = (Df − Di)/2` e
`vc = π · D · n / 1000`, o resultado depende de qual `D` se usa:

| `vc` calculada em | Resultado | Relação com a forma exata |
|---|---|---|
| Diâmetro **final** `Df` | `π · Df · (Df − Di) · fn · n / 2000` | **superestima** por `2·Df / (Df + Di)` |
| Diâmetro **médio** `(Df + Di)/2` | `π · (Df² − Di²) · fn · n / 4000` | **idêntico à forma exata** |
| Diâmetro **inicial** `Di` | `π · Di · (Df − Di) · fn · n / 2000` | subestima por `2·Di / (Df + Di)` |

Só o diâmetro **médio** reproduz a forma exata. E o produto tem um problema real aqui, porque para
**velocidade de corte e vida de ferramenta** o `vc` correto é o do **diâmetro final** — é lá que a
aresta gera a superfície e é lá que a temperatura manda. Ou seja: **o mesmo `vc` não serve para as
duas contas.**

**Erro quantificado se o produto usar `vc` do diâmetro final na conta de MRR:**

| Mandrilamento | `ap` [mm] | Fator de superestimação | Erro |
|---|---|---|---|
| Ø 48 → Ø 50 (acabamento) | 1,0 | 100/98 | **+2%** |
| Ø 40 → Ø 50 | 5,0 | 100/90 | **+11%** |
| Ø 30 → Ø 50 | 10,0 | 100/80 | **+25%** |
| Ø 20 → Ø 50 (desbaste pesado) | 15,0 | 100/70 | **+43%** |

Em acabamento o erro é desprezível; em desbaste de furo pequeno para grande ele **estoura sozinho
a margem de ±15–25% declarada do modelo**, sem nenhuma incerteza de material envolvida. É erro de
fórmula, não de dado.

**Recomendação:** implementar a forma exata do anel. Ela custa a mesma linha de código, não depende
de qual `vc` a tela escolheu mostrar, e elimina uma fonte de erro de até 43%.

*Confiança: CONSENSO na fórmula base (MH 27ª, Tabela 29). A decomposição em Di/Df e os fatores de
erro são álgebra exata sobre essa fórmula — cada passo é reproduzível, nenhum número novo entra.*

## 4.3 — `ap = (Df − Di)/2` está correto?

**Confirmado.** A profundidade de corte no mandrilamento é **metade** da diferença entre os
diâmetros, porque `ap` é medida no **raio**, perpendicular à direção de avanço — a mesma convenção
do torneamento.

```
ap = (Df − Di) / 2        [mandrilamento — furo cresce]
ap = (D0 − Df) / 2        [torneamento externo — peça diminui]
```

Equivalente à forma que aparece na literatura de torneamento: `Df = D0 − 2·ap`.

**Fonte normativa da grandeza:** ABNT NBR 6162 — *Movimentos e relações geométricas na usinagem dos
metais — Terminologia* (origem NB 204), a norma brasileira que fixa os conceitos de movimento,
direção, velocidade e percurso na usinagem, e da qual `ap` (profundidade ou largura de penetração,
medida perpendicularmente ao plano de trabalho) é uma das grandezas definidas.
**Ressalva de procedência:** confirmei o escopo da norma e a existência da grandeza, mas
**não tive acesso ao texto oficial da ABNT** para citar a cláusula exata. Os exemplares que a busca
retorna são cópias em repositório aberto, não a norma comprada. Registro isso em vez de fingir a
citação. Além disso a norma consta como **cancelada**, o que o produto deve saber antes de citá-la
como autoridade viva.

### Convenção divergente — existe, e ela morde

**Sim, há divergência, e ela é de oficina, não de literatura.**

1. **Literatura e norma:** `ap` no raio. `ap = (Df − Di)/2`. Sem divergência entre as fontes do
   território — MH Tabela 29 usa `d` como "depth of cut" de ferramenta de ponta única, que em
   torneamento é sempre radial.

2. **Prática de cabeçote de mandrilar:** o ajuste do cabeçote é frequentemente graduado **em
   diâmetro** (um traço do anel = 0,01 mm **no diâmetro**, não no raio), justamente porque o que o
   operador mede com o súbito é o diâmetro do furo. Quem digitar na calculadora o número que leu no
   anel do cabeçote está entregando **o dobro** do `ap` real.

3. **Barra de mandrilar de desbaste com dois insertos escalonados (step boring):** cada inserto
   pega metade do sobremetal radial. O `ap` por aresta é metade do `ap` da operação, e a MRR total
   continua sendo a do anel inteiro. Se o produto calcular força por aresta, precisa dessa divisão;
   se calcular MRR, não.

*Confiança do item 1: CONSENSO. Itens 2 e 3: descrição de prática, sem fonte numérica no
território — trate como alerta de interface, não como dado.*

**Alerta de produto (é o defeito que a tela de mandrilamento provavelmente vai ter):** o campo deve
pedir **os dois diâmetros**, nunca `ap` digitado. Pedir `ap` importa a ambiguidade raio-versus-
diâmetro para dentro do cálculo, e o erro resultante é de **fator 2** — muito acima de qualquer
margem que o produto declare.

---

# LACUNAS

Cada linha nomeia **o dado que falta**, **a fonte que o teria** e **por que ela está fora do meu
território**. Nenhuma foi preenchida por conhecimento próprio.

| # | Item | Onde | Fonte que teria o dado | Por que ficou fora |
|---|---|---|---|---|
| L1 | `fn` de partida de **broca helicoidal inteiriça de metal duro** | 1.1 | Catálogo de fabricante de broca | Catálogo de fabricante está excluído por briefing. MH 27ª só publica "ordinary twist drills" (HSS) e broca de insertos; não tem coluna de MD inteiriço |
| L2 | `fn` de partida de **broca de centro / spot drill** | 1.2 | Catálogo de fabricante | MH cobre a **geometria** normalizada da broca de centro, não o avanço |
| L3 | `fn` de partida de **escareador (countersink)** | 1.2 | Catálogo de fabricante | Idem — MH trata ângulos (60°/82°/90°/100°), não avanço |
| L4 | Dado de **alargamento para o grupo do aço 1045** (170–220 HB) | 1.2 | Catálogo de fabricante de alargador | A Tabela 17 do MH deixa a célula vazia para esse grupo; usei o grupo de aço carbono mais mole e declarei a extrapolação |
| L5 | **Escada graduada de redução de `fn` por faixa de L/D** (3D→x, 5D→y, 8D→z) | 1.3 | Catálogo de broca para furo profundo e guia de aplicação | Meu território só publica o **limiar** (3·D) e um **teto** de redução (50%), não a curva |
| L6 | **Banda de segurança percentual** em torno do `fn` de partida | 1.4 | Guia de aplicação de fabricante | A literatura entrega faixa por material, troca avanço↔`vc` a vida constante, e modo de falha — não entrega "±X%" |
| L7 | **Fórmula fechada de força de avanço (thrust)** em furação, com constante | 2.5 | ASM Handbook Vol. 16 (*Machining*), seção de furação; MH 27ª p. 1051–1055 (*Estimating Drilling Thrust, Torque, and Power* — fatores `Kd`, `FT`, `FM`, `A`, `B`, `J`, `W`) | **Está dentro do meu território e eu não consegui abrir.** O PDF do capítulo que obtive cobre p. 974–1297 mas as tabelas 31–34 não vieram legíveis. É a lacuna mais recuperável desta lista — quem tiver o MH em papel fecha em 10 minutos |
| L8 | Par `kc1.1 / mc` **específico de furação** para os materiais do produto (1045, inox, alumínio, FoFo) | 2.3 | Ensaio próprio, ou literatura alemã de base (Kienzle 1952 e sucessores em VDI-Z) | Só achei um par medido, e para **aço C15** (kv1.1 = 1639,05 N/mm²; 1−mv = 0,75). Um material, um diâmetro |
| L9 | **`vc` de macho de metal duro**, qualquer material | 3.1 | Catálogo de fabricante de macho | A coluna de rosqueamento do MH é **exclusivamente HSS**. Nenhuma fonte revisada que li publica MD em macho |
| L10 | **`vc` de macho de conformação por material** | 3.2 | Catálogo de fabricante (Emuge, OSG, Guhring) | Os artigos revisados que trazem número **declaram que o número veio do catálogo** — a procedência real é a fonte proibida |
| L11 | **Limiar numérico de conformabilidade** (alongamento mínimo, dureza máxima) para macho de conformação | 3.2 | Guia de aplicação e material de treinamento de fabricante | O par "≈8% de alongamento, ≈30 HRC" aparece de forma consistente na busca, **exclusivamente** em fonte proibida. Não transcrevi |
| L12 | **Teto de rotação por sincronismo eletrônico** em roscamento rígido | 3.4 | Manual de comando numérico (Fanuc/Siemens/Mitsubishi) e literatura de fabricante de máquina | A busca só retornou **patente** de fabricante de CNC, que descreve o problema sem publicar limite utilizável. O único teto real que achei é de **hardware** (cabeçote Tapmatic, 2.500 rpm) |
| L13 | **Texto oficial da ABNT NBR 6162** para citar a cláusula de `ap` | 4.3 | ABNT (norma paga) | Confirmei escopo e existência da grandeza, não o texto. **A norma consta como cancelada** — registrar antes de citá-la como autoridade viva |
| L14 | `fn` por material para **U-drill fora do aço** (inox, alumínio, FoFo) | 1.2 | Catálogo | Peguei o grupo do 1045; as demais linhas da Tabela 17 exigiriam varredura que não caberia com a mesma qualidade |

**Duas fontes revisadas identificadas e não abertas** (paywall Springer/Elsevier) — registro os
identificadores para quem tiver acesso institucional; **não** usei número nenhum delas:
- *Investigation of the influence of coating and the tapered entry in the internal forming tapping process* — Int. J. Adv. Manuf. Technol., DOI 10.1007/s00170-018-3011-9
- *An approach to torque and temperature thread by thread on tapping* — Int. J. Adv. Manuf. Technol., DOI 10.1007/s00170-020-04986-8
- *Study of the internal thread process with cut and form taps…* — DOI 10.1007/s00170-017-0573-x
- *Analytical study of maximal tapping torque during forming screw process* — J. Mater. Process. Technol., DOI 10.1016/j.jmatprotec.2010.08.008

---

# O QUE ME SURPREENDEU

Sete achados. Os quatro primeiros contrariam algo que o enunciado afirma ou pressupõe.

### 1. O limite `h < 0,1 mm` não é um limite do Kienzle — e em furação ele é a regra, não a exceção

O enunciado pergunta "se valer, a espessura cai abaixo dele?". **Cai quase sempre.** Com broca de
118°, `h = 0,4286 · fn`, e só acima de **`fn ≈ 0,233 mm/volta`** a espessura passa de 0,1 mm — o que
exige broca de ~20 mm ou mais. **Toda furação de oficina até Ø15 mm vive abaixo do limite.**

E a fonte que aplicou Kienzle em furação ajustou o modelo **inteiramente dentro da região
proibida** — `h` de 0,024 a 0,077 mm — com erro médio de 4,71%. Ou seja: o limite não é físico do
modelo; é o limite de validade **do par de constantes**, ajustado em outra faixa e em outro
processo. Se o produto tratar isso como alerta, o alerta dispara em ~100% das furações e vira ruído.
**O que precisa mudar é a origem da constante, não o alerta.**

### 2. 27% do torque de furação não é corte de aresta principal

Medido por plano experimental de broca escalonada: guias e quinas respondem por **19%** do torque e
a aresta transversal por **8%**. Só **73%** é corte real. Um Kienzle alimentado por `b·h` de aresta
principal com constante de torneamento ignora mais de um quarto do fenômeno.

Pior: o braço real da resultante foi medido em **`xv = 0,443·D`** — contra o `0,25·D` que a hipótese
simples "resultante no raio médio" assume. **Fator 1,77.** A fórmula `Mc = kc·f·D²/8` é boa álgebra
sobre uma hipótese que a medição desmente.

### 3. A tabela de avanço de furação é uma regra `k·D` disfarçada — e as duas fontes convergem

A documentação do produto "se contradiz" entre tabela e fórmula. **As duas estão certas e são a
mesma coisa.** Reduzindo as tabelas de MH e da University of Florida a `k = fn/D`, o `k` fica
praticamente constante em ~0,018 até Ø13 mm, caindo para ~0,011 acima de Ø25 mm — duas fontes
independentes, dispersão de ~25%. A contradição documental é de vocabulário, não de conteúdo.

### 4. A `vc` de roscamento **não** se deriva da de fresamento — e a razão varia por fator 3,3

Esta era, pelo enunciado, "a pergunta que decide o desenho do produto". A resposta é negativa e
quantificada: dentro do MH, a razão `vc` rosca / `vc` furação **no mesmo material e mesma dureza**
vai de **0,64** (inox austenítico) a **2,13** (aço liga). Um fator médio erraria −47% num extremo e
+78% no outro.

E há um argumento que fecha a porta de vez: **a `vc` de rosca depende do passo** (até +28% entre
passo grosso e fino no mesmo material e diâmetro). Passo não é entrada de nenhuma tabela de
fresamento. **Um fator de família é matematicamente incapaz de representar uma dependência que o
parâmetro de origem não possui.**

Corolário que o produto provavelmente não previu: dentro da própria família "roscar", **fresa de
rosca puxa da tabela de fresamento e macho puxa de tabela própria.** Duas origens de dado opostas
na mesma tela.

### 5. O gargalo de rotação no roscamento é hardware, não sincronismo — e por fator 3

Eu esperava achar limite de sincronismo eletrônico. O que achei documentado num ensaio real foi
outra coisa: máquina com eixo-árvore de **7 a 7.500 rpm** operando com cabeçote de roscar
auto-reversível limitado a **2.500 rpm**. O gargalo era o dispositivo, não a máquina, por um fator
de 3. E o ensaio de "alta velocidade" (60 m/min em M8, 2.387 rpm) estava rodando a **95% do teto do
cabeçote** — a alta velocidade tinha acabado, não a velocidade de corte.

Os **5.570 rpm** que o produto entrega hoje ficam **2,2× acima** desse teto de hardware, além de
**3,2×** acima do valor tabelado do MH para o passo de M8.

### 6. A fórmula de MRR do mandrilamento erra até 43% dependendo de onde se calcula `vc`

Achado que não estava na pergunta. `Q = vc · fn · ap` só é exata se `vc` for calculada no **diâmetro
médio**. Mas o `vc` que o produto precisa mostrar — o que governa vida de ferramenta — é o do
**diâmetro final**. Usar o mesmo `vc` nas duas contas superestima a MRR por `2·Df/(Df+Di)`:
+2% em acabamento, **+43%** ao mandrilar de Ø20 para Ø50. **Estoura sozinho a margem de ±15–25%
declarada, sem nenhuma incerteza de material envolvida.** É erro de fórmula, não de dado.
A forma exata do anel, `Q = π·(Df²−Di²)·fn·n/4000`, custa a mesma linha de código.

### 7. Duas armadilhas de interface que valem mais que qualquer número desta rodada

**(a) Mandrilamento — o anel do cabeçote é graduado em diâmetro, `ap` é no raio.** Quem digitar o
número lido no anel entrega **o dobro** do `ap`. Erro de **fator 2** — muito acima de qualquer
margem declarada. A tela deve pedir **os dois diâmetros**, nunca `ap`.

**(b) Roscamento — `vf` deve ser somente leitura.** O MH é categórico: diferentemente de qualquer
outra ferramenta de corte, o avanço por rotação do macho **não pode ser ajustado de forma
independente**. Um campo editável ali cria um estado que a física não admite. E a igualdade é com o
**lead**, não com o *pitch* — em rosca de duas entradas, `vf = P × n` erra por fator 2.

---

# FONTES USADAS

Cinco fontes forneceram número; uma sexta foi consultada só quanto a escopo.

1. **MACHINERY'S HANDBOOK, 27ª ed.** — capítulo *Speeds and Feeds* / *Estimating Speeds and
   Machining Power*. Trechos usados: p. 1029 (regra de avanço de furação), p. 1030–1041
   (Tabelas 17–23, colunas de furação, alargamento e rosqueamento), p. 1032–1033 (condições-base dos
   dados combinados), p. 1034 (*Drilling Difficulties*; limiar de 3·D), p. 1040 (Tabela 22 — fatores
   de avanço e diâmetro), p. 1042–1043 (rosqueamento: travamento do avanço no passo, interpolação
   por passo, fatores que baixam a rotação), p. 1050 (Tabela 29 — fórmulas de taxa de remoção).

2. **SEKULIĆ, M.; KOVAČ, P.; GOSTIMIROVIĆ, M.; HADŽISTEVIĆ, M.; JURKOVIĆ, Z.** *Prediction of the
   main cutting force in drilling by Kienzle equation.* TMT 2014 — 18th International Research/Expert
   Conference, Budapeste, 10–12 set. 2014, p. 5–8.
   https://www.tmt.unze.ba/zbornik/TMT2014/TMT2014_003.pdf

3. **UNIVERSITY OF FLORIDA**, Dept. of Mechanical & Aerospace Engineering — EML2322L, MAE Design and
   Manufacturing Laboratory, *Drilling and Milling Speeds and Feeds* (Tabela 2 e notas de
   profundidade/refrigeração).
   https://web.mae.ufl.edu/designlab/lab%20assignments/eml2322l-drilling%20and%20milling%20speeds%20and%20feeds.pdf

4. **BEZERRA, A. A.; COELHO, R. T.; SILVA, L. R.; BRAGHINI JÚNIOR, A.; SOTO, M.** *Aplicação de MQL
   no processo de roscamento com alta velocidade de corte.* Anais do CONEM 2004 — ABCM.
   http://www.abcm.org.br/anais/conem/2004/21016.pdf

5. **MACIEL, D. T.; RIBEIRO FILHO, S. L. M.; BRANDÃO, L. C.** *Análise dos processos de roscamento
   por usinagem e conformação na liga Ti-6Al-4V.* 8º COBEF, Salvador/BA, 18–22 maio 2015 — ABCM.
   Universidade Federal de São João del-Rei.
   https://abcm.org.br/anais/cobef/2015/PDFS/COF-2015-0013.PDF

6. **ABNT NBR 6162 (NB 204)** — *Movimentos e relações geométricas na usinagem dos metais —
   Terminologia.* Consultada **apenas quanto a escopo**; sem acesso ao texto oficial.
   Consta como **cancelada**.

**Fora do território, e por isso não citada em nenhum número deste documento:** catálogo, guia de
aplicação, tabela comercial de *speeds & feeds* e material de treinamento de fabricante de
ferramenta. Onde só essas fontes tinham o dado, o resultado está declarado como LACUNA acima.

**Nota de método:** todos os PDFs foram extraídos e lidos integralmente na máquina (PyMuPDF); os
números foram conferidos por recomputação sempre que a própria fonte oferecia como fazê-lo — o caso
mais forte é a Tabela 1 de Sekulić et al., cuja coluna `h` eu reproduzi linha a linha a partir da
eq. (3), e a largura `b = 5,833 mm` que devolve exatamente σ = 118°.

---

**Fim do retorno R8.** Gravação incremental: cabeçalho e Q2 primeiro, depois Q1, Q4, Q3 e este
fechamento — cada bloco anexado ao disco antes do seguinte começar.
