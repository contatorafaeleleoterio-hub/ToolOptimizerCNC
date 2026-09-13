# Escopo — Modo "broca de aço rápido"

**O que este documento é:** o escopo funcional do modo de cálculo de partida para **broca helicoidal
de aço rápido ao cobalto (HSS-Co)** no painel Furar. Descreve os três números que o modo entrega, de
onde cada um vem, a referência de catálogo que aparece ao lado, os padrões editáveis em Configurações,
o que o modo deliberadamente não faz, e a fronteira que ele não cruza.

**O que este documento não é:** não é desenho de tela (não define cor, layout, grade, posição nem
componente), não é arquitetura, não é plano de construção. Não é fonte de número — os números vêm dos
canônicos e da rodada R9.

**Autossuficiente:** quem ler só este documento sabe, para qualquer diâmetro, quais três números o
painel mostra e de onde cada um vem — sem abrir o `MVP_CALCULADORA_PARAMETROS.md`.

**Por que documento próprio, e não uma seção do MVP:** o `MVP_CALCULADORA_PARAMETROS.md` já passa de
135 KB. Frente nova enfiada lá vira documento que ninguém acha. A costura é por referência cruzada,
nos dois sentidos.

**Data:** 05/09/2026 · **origem:** proposta do Mestre a partir da prática dele de chão de fábrica,
apurada na rodada **R9** (`Docs_inicial/pesquisa/RESPOSTA_R9_BROCA_ACO_RAPIDO.md`) e subida ao
`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §2.1 em 05/09/2026.

---

## 0. Precedência

Herda a do `MVP_CALCULADORA_PARAMETROS.md` §0.1 e a do `GABARITO_PROTOTIPO.md` §1. Do que vence para
o que cede:

1. Decisão escrita do Mestre.
2. Os canônicos (`Docs_inicial/canonicos/`) — todo número, fórmula e limiar.
3. `MVP_CALCULADORA_PARAMETROS.md` — o que existe no primeiro produto.
4. `BRIEF_DESIGN_INTERFACE.md` — comportamento, vocabulário, regra inviolável, anti-requisito.
5. Este documento — a função e o comportamento do modo.

Onde este documento precisaria de um número que os documentos acima não têm, ele **não arbitra**.

---

## 1. Por que o modo existe

O painel Furar calcula hoje para broca de metal duro. **A prática de chão de fábrica do Mestre é
outra** — broca de aço rápido, com uma aritmética de oficina que ele usa há anos:

```
n          = 318 × vc / D
vf         = 10% de n
incremento = por diâmetro
```

O modo existe para que **essa prática seja o que o painel entrega**, com a referência de catálogo
visível ao lado — não substituindo, não corrigindo.

**A aritmética dele não é uma fórmula concorrente.** `318` é `1000/π` com erro de 0,1%: é o mesmo
motor do `CANONICO_MOTOR_DE_CALCULO §1.4`, escrito na forma de oficina. Isto foi verificado, não
assumido.

---

## 2. Os três números do modo

```
n          = 318 × vc / D        [rpm]      318 = 1000/π (CANONICO_MOTOR_DE_CALCULO §1.4)
vf         = n × 10%             [mm/min]   percentual editável (§5)
incremento = D / 25, teto 0,8 mm            passo do pica-pau, editável (§5)
```

**Caso verificador — se o modo não reproduz isto, o modo está errado:**

| Entrada | Saída |
|---|---|
| Ø10, `vc` = 16 m/min | **S 508 · F 50 · incremento 0,4** |

Aritmética: `318 × 16 = 5088`, `÷ 10 = 508,8` → **S 508** · `10% de 508 = 50,8` → **F 50** ·
`10 / 25 = 0,4` → **incremento 0,4**.

**Tabela do incremento**, para conferência rápida:

| Ø | 5 | 10 | 14 | 20 | 30 |
|---|---|---|---|---|---|
| **incremento (mm)** | 0,2 | 0,4 | 0,56 | 0,8 | **0,8** (satura) |

### 2.1 O avanço do modo é `fn` = 0,10 mm/rot em qualquer diâmetro — e isso é identidade, não escolha

Se `vf = n × 10%`, então `fn = vf / n = 0,10 mm/rot`, **sempre**, para qualquer diâmetro e qualquer
`vc`. O percentual não é um parâmetro que por acaso dá 0,10: **os dois são a mesma coisa dita de duas
maneiras.**

Isto tem uma consequência que precisa estar escrita, porque é a raiz do comportamento da §4: **a
referência de catálogo cresce com o diâmetro e o avanço do modo não.** Toda a inversão descrita
adiante sai daqui.

> **Pendência encerrada por desaparecimento, não por resposta.** A folha do protótipo carregava, desde
> 03/09/2026, um `fn` provisório de **0,20 mm/rot** devendo fonte. Com o modo, o avanço passa a ser
> consequência do percentual e **aquele número deixou de existir** — não foi respondido, deixou de ser
> perguntado. Qualquer documento que ainda o cite como pendência aberta está desatualizado.

---

## 3. A entrada — o que já existe e o que falta

**Correção de premissa, feita na redação deste documento.** A geometria **não é nova no MVP**: o
`MVP_CALCULADORA_PARAMETROS.md` §4.3 já lista *"Broca helicoidal, aço rápido ao cobalto"* na tabela de
faixas de diâmetro, com **0,5 a 25 mm** (`DECISÃO DE PROJETO`, decisão do Mestre de 03/09/2026). Ela
está na primeira linha da tabela, antes da de metal duro.

Portanto:

| | Estado |
|---|---|
| A geometria no `TIPO DA FERRAMENTA` | **já existe** — `MVP §4.3`, faixa 0,5–25 mm |
| O `vc` de partida próprio dela | **falta** — hoje o bloco `DADOS DO MATERIAL` mostra 140 m/min, que é fresa de metal duro (§3.1) |
| O modo de cálculo dos três números | **falta** — é o objeto deste documento (§2) |
| Os três padrões editáveis | **faltam** — §5 |

**O que este documento acrescenta não é a entrada: é o comportamento por trás dela.** Escolher a
geometria hoje não muda a velocidade de partida nem produz o terceiro número.

**O nome não é escolha deste documento** — é decisão do `CANONICO_FERRAMENTAS_E_SUBSTRATOS §1.2`: aço
rápido comum foi procurado em catálogo e **não encontrado à venda**. "Aço rápido" sem qualificação não
vira entrada, porque nomearia uma ferramenta que o operador não compra. O MVP já usa esse nome.

### 3.1 O `vc` de partida muda com a ferramenta

O bloco `DADOS DO MATERIAL` mostra hoje `vc` de **140 m/min** — que é fresa de metal duro. Com broca
de aço rápido em aço 1045, a partida é **16 a 22 m/min**.

**De onde vem:** `CANONICO_FURACAO §2.1`, linha do `vc` de aço rápido. A faixa completa do canônico é
**16 a 30 m/min**, com quatro fontes; o modo parte de **16–22** porque é a faixa das duas fontes que
**declaram a profundidade do furo** (Sutton ≤5×Ø, NACHI ≤5×D) — as outras duas não declaram, e é essa
a explicação mais econômica do degrau, registrada no canônico como `DERIVADO`.

**O Mestre usa 16.** Continua editável no "Ajuste fino", como qualquer dado de material já é.

**O `vc` não é configuração** — é dado de material, e vive no bloco `DADOS DO MATERIAL`. Ver §5.

---

## 4. A referência de catálogo — ao lado, nunca no lugar

Junto do avanço, o painel mostra **o avanço que os catálogos publicam** para broca de aço rápido
naquele diâmetro, e **o quanto a regra dos 10% fica dele**.

| Ø | Catálogo (`CANONICO_FURACAO §2.1`) | Modo (10%) | Razão |
|---|---|---|---|
| 3 | 0,070 | 0,10 | **1,43×** |
| 5 | 0,110 | 0,10 | 0,91× |
| 10 | 0,19 | 0,10 | **0,53×** |
| 20 | 0,34 | 0,10 | 0,29× |

**Os dois aparecem, o do Mestre em cima.** Decisão de produto já tomada — este documento a registra,
não a revê. A razão é a mesma do `E0 §3.3`: o sistema mostra o número e situa o valor; sumir com a
comparação esconderia a informação útil.

> **Fronteira com o anti-requisito de procedência.** O que aparece na tela é **valor comparável** — o
> número e a razão. **Não aparece** nome de fabricante, link, rótulo de confiança, a palavra
> `extrapolado`, nem "de onde veio o número". A procedência saiu do produto (`BRIEF §12`) e continua
> fora. A fonte vive nos canônicos e nesta documentação, onde ela pertence.

### 4.1 A inversão em broca fina — o comportamento que este documento existe para registrar

A regra dos 10% dá avanço **constante**; o catálogo dá avanço **crescente com o diâmetro**. As duas
curvas se cruzam, e o modo se comporta de forma oposta nos dois lados do cruzamento:

| Faixa | O que acontece | Contra o catálogo |
|---|---|---|
| **abaixo de ~Ø4,5** | o modo pede **mais** avanço que o catálogo | 1,43× em Ø3 |
| **~Ø4,5 a ~Ø10,7** | o modo fica **dentro** da faixa publicada | entre 1,0× e 0,5× |
| **acima de ~Ø10,7** | o modo pede **menos** que metade do publicado | 0,29× em Ø20 |

**A ponta exposta é o diâmetro pequeno, não o grande** — que é o contrário do que a intuição sugere,
e a razão de isto estar escrito.

**Isto NÃO cria alerta novo.** Aplicação da régua que já existe, não decisão nova: o
`CANONICO_FURACAO §1.6` só trata como anomalia o que passa de **~2×** ou fica abaixo de **~0,5×**. Em
Ø3 a razão é 1,43× — **dentro** da faixa que o próprio fabricante publica. A referência lado a lado da
§4 já mostra a distância ao operador; um aviso em cima disso seria ruído sobre dado que já está
visível.

O limiar de 2× só é cruzado abaixo de ~Ø2,5, onde **o alerta que já existe dispara sozinho**. Nada a
acrescentar.

---

## 5. Os padrões editáveis, em Configurações

Mesma mecânica da margem de segurança (`E2 §7`, `ESCOPO_CONFIGURACOES §10`):

| Campo | Padrão | Natureza |
|---|---|---|
| Percentual do avanço | **10%** | a regra do Mestre |
| Divisor do incremento | **25** | a regra do Mestre |
| Teto do incremento | **0,8 mm** | a regra do Mestre |

**Os três são prática declarada do operador, não dado com fonte.** A rodada R9 varreu inglês,
português e alemão e **não encontrou fonte publicada** para a regra dos 10% — está registrado como
lacuna **L-G** no `CANONICO_FURACAO §4.2`. Isso não os desqualifica: eles são escolha de quem opera a
máquina, e a regra de fonte do projeto (decisão do Mestre, 01/09) **não se aplica** a esse tipo de
número. Mas explica por que são **editáveis por padrão** e por que a referência de catálogo aparece ao
lado.

**O `vc` não entra aqui.** É dado de material, editável no "Ajuste fino" do bloco `DADOS DO MATERIAL`.

---

## 6. O que o modo deliberadamente NÃO faz

- **Não escolhe ciclo.** Não decide entre `G73` e `G83`, não escreve bloco de programa, não emite
  código G. Ver §7.
- **Não substitui a referência de catálogo pela regra do Mestre, nem o contrário.** Os dois aparecem.
- **Não bloqueia diâmetro nenhum**, nem na ponta fina nem na grossa. `E0 §3.3`: nada neste sistema
  recusa entregar resultado.
- **Não corrige o avanço automaticamente** quando ele se afasta do catálogo. Mostrar a distância é o
  comportamento; ajustar sozinho seria decidir pelo operador.
- **Não trata furo profundo de forma especial.** O `vc` de partida é de furo raso (≤5×D). A escada de
  profundidade existe no canônico (`§2.1`) e **não entra neste modo** — seria escopo novo.

---

## 7. Fronteira — o produto não emite código G, e continua não emitindo

Teste do `E7 §2.1`, aplicado a este modo:

| O que o modo faz | Do lado de dentro? |
|---|---|
| Mostra o valor que o operador vai digitar no `Q` do ciclo | **Sim** — é da mesma natureza que mostrar `S` e `F`, que o produto já mostra desde sempre |
| Escolhe entre `G73` e `G83` | **Não** — é decisão de processo |
| Escreve o bloco `G83 X.. Y.. Z.. Q.. R.. F..` | **Não** — é emissão de código |
| Decide a partir de que profundidade picar | **Não** — já existe como alerta (`CANONICO_LIMITES_E_ALERTAS §1.4`), e é alerta, não instrução |

**Passa.** O incremento é um número que o operador lê e digita, como os outros dois.

---

## 8. O que este modo assume — premissas declaradas

Escrito aqui porque nenhuma delas é número mudo:

1. **O modo nasce sobre a linha da Sutton Tools** — a única fonte da R9 que publica `vc` **e** `fn` na
   mesma linha, para o mesmo material e a mesma ferramenta. É o único par coerente da rodada.
2. **O `vc` de partida é `FAIXA`, com degrau de 1,9×** entre as fontes (16–20 contra 21,3–30,5). O
   modo parte da metade baixa, e a razão está na §3.1. Não é consenso; é escolha declarada.
3. **A referência de catálogo do avanço é `REFERÊNCIA MÚLTIPLA`** — duas fontes (Sutton e NACHI), com
   dispersão de 1,3× entre elas. O número mostrado ao lado do avanço herda essa dispersão.
4. **O ângulo de ponta continua 140°** (`MVP §3.2`), que é valor de **metal duro**. **Nenhuma das
   fontes da R9 publica ângulo em graus para broca HSS-Co** — a Sutton dá um código de geometria
   ("R30"), as demais não dão nada. **Pendência de pesquisa declarada:** o ângulo não entra em nenhum
   dos três números do modo, e trocá-lo por 118° seria número sem fonte. Fica como está, e fica
   sabido.

---

## 9. Como se verifica este documento

1. Ø10 com `vc` 16 devolve **S 508 · F 50 · incremento 0,4** (§2).
2. A tabela do incremento confere: Ø5 → 0,2 · Ø14 → 0,56 · Ø20 → 0,8 · Ø30 → 0,8 saturado (§2).
3. Todo número desta página existe no `CANONICO_FURACAO §2.1`, no `CANONICO_MOTOR_DE_CALCULO §1.4` ou
   é declarado como prática do Mestre (§5). **Nenhum número nasce aqui.**
4. Quem ler só este documento sabe, para qualquer diâmetro, quais três números o painel mostra e de
   onde cada um vem.

---

## 10. O que este documento não decide

- **Desenho.** Hierarquia dos três números no cartão de resultado, posição da referência de catálogo,
  forma dos campos em Configurações — é do Dexter, nas folhas `Furar.dc.html` e `Configuracoes.dc.html`.
- **Arquitetura e ordem de construção.**
- **Se a faixa de `vc` deve estreitar** quando aparecer fonte melhor. Duas pistas continuam abertas na
  R9 (o Walter Compendium e o Hartner).
- **Se a escada de profundidade vira funcionalidade.** Ela existe no canônico; virar comportamento do
  produto é escopo novo, e é decisão do Mestre.

---

## 11. Documentos que se cruzam com este

| Documento | Relação |
|---|---|
| `Docs_inicial/canonicos/CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §2.1, §1.5, §4.1, §4.2 | **Fonte de todo número** deste escopo |
| `Docs_inicial/canonicos/CANONICO_MOTOR_DE_CALCULO.md` §1.4 | A fórmula da rotação |
| `Docs_inicial/canonicos/CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §1.2 | O nome da entrada nova |
| `Docs_inicial/pesquisa/RESPOSTA_R9_BROCA_ACO_RAPIDO.md` | A apuração que sustenta tudo |
| `Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md` | O produto onde o modo entra |
| `Docs_inicial/mvp/ESCOPO_CONFIGURACOES.md` §10 | A mecânica dos padrões editáveis |
| `Docs_inicial/escopo/E0` §3.3 · `E7` §2.1 | Nada bloqueia · a fronteira do código G |
