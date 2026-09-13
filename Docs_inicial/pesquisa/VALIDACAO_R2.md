# Validação — R2 Motor de cálculo: cavaco, força e potência

**Veredito:** APROVADO COM RESSALVAS
**Retornos auditados:** `RESPOSTA_R2.md` (62,5 KB) + `RESPOSTA_R2_B.md` (55,5 KB) — par cego, G8 aplicado
**Data:** 20/08/2026

## Resumo

O núcleo da rodada — **a cadeia de cálculo** — está resolvido, e resolvido do jeito mais forte que esta pesquisa consegue produzir: os dois territórios chegaram à **mesma fórmula por caminhos que não se tocam**. Um derivou a geometria da integral; o outro leu a tabela publicada de dois fabricantes. Batem dígito a dígito. Isso vale para a fórmula de afinamento, para o limiar de 50%, para o `hm` em Kienzle, para o piso de `h` e para a rejeição do `mc = 0,75`.

O que **não** está resolvido é a **Questão 3**: a tabela de constantes por material. Um território declarou que ela não existe na literatura revisada por pares (12 lacunas); o outro entregou a tabela inteira a partir de **uma única publicação** (Walter). Tabela completa com fonte única não vira `CONSENSO` — e três linhas divergem acima da margem do modelo.

**Impede o canônico:** 4 itens, todos pontuais e nomeados abaixo. A cadeia de cálculo pode ser escrita agora; a tabela de materiais precisa das 4 decisões antes.

## Achados por portão

| Portão | Selo | Achado | O que fazer |
|---|---|---|---|
| G1 Cobertura | `OK` | 3 questões, 18 subitens. As lacunas de A (1a, parte de 2a) são **por desenho do par cego** — território de fabricante proibido — e são exatamente o que B cobre. Nenhum subitem ficou sem resposta no conjunto. Nenhum desvio: onde A rejeita a premissa da pergunta (1c), rejeita **com o dado**, não por conveniência | nada |
| G2 Fonte | `RESSALVA` | A: fontes com DOI, todas conferíveis; tabelas próprias declaradas como cálculo reproduzível. B: URL primária em todas as fontes, mas **a tabela Walter F 9 (33 linhas) foi extraída localmente com `pdfplumber`** e ninguém mais a conferiu. B declara que `pdftotext -layout` embaralha as colunas dessa página — ou seja, o próprio retorno avisa que ali se fabrica erro de transcrição | **conferir 3 linhas da tabela Walter na fonte** antes de virar canônico: alumínio N2, aço #1 e aços endurecidos H1/H3 (são as três que mudam número no produto) |
| G3 Confiança | `RESSALVA` | B tem disciplina exemplar: chama a tabela inteira de `REFERÊNCIA ÚNICA` e recusa elevar sem 2º fabricante. A infla o rótulo em um ponto: usa `CONSENSO` para **derivação matemática** (Q1, Q2a) — mas derivação fechada não tem "3 fontes independentes", tem prova. Os dois criam rótulos fora da lista (`LACUNA`, `REFERÊNCIA ÚNICA elevada`), ambos **declarados no topo do retorno** | no canônico, usar rótulo próprio para o que é prova geométrica: `DERIVADO — verificável por reconstrução`. Não é fonte nem consenso |
| G4 Default | `OK` | A assinatura de preenchimento foi caçada nos dois lados e **explicada, não silenciada**. B achou o motivo: Walter usa 5 valores de `mc` em 33 linhas porque atribui **por família ISO, não por liga**. A confirmou pelo outro lado: em 9 determinações acadêmicas independentes, **nenhuma** deu exatamente 0,20 ou 0,25 — os valores medidos são 0,155 · 0,17 · 0,185 · 0,25 · 0,259 · 0,26 · 0,39 · 0,408 · 0,4572 | ver D5, abaixo — **exceção confirmada, com condição** |
| G5 Sensibilidade | `OK` | Ambos quantificam tudo em %. A entrega ordem de prioridade por impacto (`Deff` → `hm` vs `hex` → Kienzle → forma exata de `hm`). B quantifica a sensibilidade a `mc` (Δ0,05 = +12% em `kc`) e a `kc1.1` (linear 1:1) | usar a ordem de prioridade de A como ordem de implementação |
| G6 Divergência | `BLOQUEIA` | Três choques com material já registrado — ver seção própria. O mais grave: o par `2165 / 0,155` do 1045, declarado "validado", **não se sustenta no ponto de trabalho** contra duas fontes independentes | ver D1–D3 |
| G7 Lacunas | `OK` | A declara 18 lacunas; B declara 7. Os dois declaram, sem ser perguntados, **o que não conseguiram confirmar**: A diz que não verificou os 3 pares "validados" do sistema; B diz que não confirmou nem refutou Diniz/Marcondes/Coppini. Nenhum preencheu célula por analogia | nada — é o comportamento pedido |
| G8 Cross-check A×B | `RESSALVA` | 27 grandezas confrontadas: **17 convergem com fontes independentes** (o achado mais forte possível nesta pesquisa), 2 divergem acima da margem, 1 diverge na conclusão, o resto tem um lado só | tabela completa abaixo |

---

## Confronto A × B

**A** = território de literatura acadêmica, normas e handbooks. **B** = território de catálogo e guia técnico de fabricante.
Os dois receberam o mesmo enunciado, sem contato entre si.

| # | Grandeza | Retorno A | Retorno B | Fonte de A | Fonte de B | Situação | Selo |
|---|---|---|---|---|---|---|---|
| 1 | Qual grandeza o CTF exato preserva | `hex` (espessura máxima) | `hex` | derivação de `h(φ) = fz·sinφ` | Sandvik (tabela de fator) + Iscar (forma trigonométrica) | Convergem, fontes diferentes | `OK` |
| 2 | CTF em `ae/D` = 0,20 | **1,25** (o enunciado dizia 1,41 — errado) | **1,25** (Sandvik publica 1,25) | cálculo | tabela publicada | Convergem, fontes diferentes | `OK` |
| 3 | Erro da fórmula em uso no projeto | **+79%** de avanço | **+78,9%** | razão 2,236/1,250 | mesma razão, contra a tabela Sandvik | Convergem | `OK` |
| 4 | Razão `hex/hm` | → 2 (π/2 em `ae/D` = 0,5) | ≈ 2 | assintótica, derivada | Iscar publica "hm ≈ hmax/2" | Convergem, fontes diferentes | `OK` |
| 5 | A `√(ae/D)` é aproximação do quê | de `hm`, não de `hex` | de `hm` — Sandvik publica `hm ≈ fz·√(ae/Dc)` para `ae/Dc ≤ 0,1` | derivação | fonte primária | **Convergem, e resolvem a disputa registrada** | `OK` |
| 6 | Gatilho `ae < 50% D` | correto e exato | correto — Sandvik tabela "50–100% → 1,0" | geometria | catálogo | Convergem | `OK` |
| 7 | Onde avisar o operador | `ae/D` < 0,25 (+15,5%) | `ae/D` < 0,25 (Sandvik 1,155; Iscar "~16%") | cálculo | catálogo | Convergem | `OK` |
| 8 | Fator do ângulo de posição | `1/sin κ` | `1/sin κ` — a tabela KAPR de Sandvik confere ponto a ponto | derivação | catálogo | Convergem, fontes diferentes | `OK` |
| 9 | Diâmetro efetivo em esférica | `De = 2√[ap(D−ap)]` | idêntica (Sandvik D 24) | geometria | catálogo | Convergem na fórmula | `OK` |
| 10 | **Onde o `De` entra na cadeia** | **na rotação**: `n = Vc·1000/(π·De)` | **no avanço**: `n` usa `D` nominal e `fz` recebe o fator `D/De` | derivação física | Sandvik `fz = D3·hex/De` | **Divergem na conclusão** | `BLOQUEIA` |
| 11 | Qual `h` entra em Kienzle | `hm` — prova por integração: `hm` erra 2–4%, `hex` erra +45% a +82% | `hm` — Sandvik e Iscar publicam `kc = kc1·hm^(−mc)`; ninguém publica com `hex` | integral numérica | 2 fabricantes | **Convergem por caminhos independentes** | `OK` |
| 12 | Forma exata de `hm` periférica | `fz·sinκ·(2ae/D)/arccos(1−2ae/D)` | idêntica, ancorada no limite publicado por Sandvik | derivação | derivação + verificação de limite | Convergem | `OK` |
| 13 | Contagem dupla CTF × `hm` | não existe se `hm` sair do `fz` já corrigido | idem, com a mesma prova em uma linha | álgebra | álgebra | Convergem | `OK` |
| 14 | Erro de usar `kc` constante | potência **−30%** em `h` = 0,1 (`kc` +43%) | **+30% a +59%** na faixa de acabamento | cálculo | cálculo com 2 conjuntos de constantes | Convergem em direção e ordem de grandeza | `OK` |
| 15 | `mc = 0,75` do alumínio | **rejeitado** — absurdo dimensional; hipótese: é `1−mc` transcrito | **rejeitado** — Walter publica 0,25 para as 5 linhas de alumínio; o máximo da tabela inteira é 0,30 | 9 medições acadêmicas | catálogo | **Convergem, e a hipótese fecha: `1 − 0,75 = 0,25`** | `OK` |
| 16 | `kc1.1` do alumínio 6061-T6 | proxy AlSi12 **fundido** → 358 / 0,259 | Walter N2 "wrought, hardened" → **600 / 0,25** | medição (Horváth & Lukács 2017) | catálogo, encaixe direto por classe + tratamento | Divergem, **mas com escopos declarados diferentes** (liga fundida × trabalhada) | `RESSALVA` |
| 17 | Piso de `h` | limite do modelo em **0,1 mm** (Horváth 2015 + Biró 2015); travar em 0,02 | piso editorial: Sumitomo plota de `f` = 0,04; Sandvik tabula de `fz` = 0,1; travar em **0,02** | 2 fontes acadêmicas | 2 fabricantes | **Convergem no número por caminhos diferentes** — e os dois declaram que 0,02 é decisão de engenharia, não achado | `OK` |
| 18 | `mc` cresce quando `h` cai | sim — curva multi-seccionada; o par não é transferível de faixa | sim — o gráfico da Sumitomo implica `mc` efetivo ~0,60 na faixa baixa | Biró et al. 2015 | catálogo | Convergem | `OK` |
| 19 | Correção de ângulo de saída `γ` | 1%/grau **ou** 1,5%/grau — `SEM CONSENSO` acadêmico | `1 − 0,01·γ` — Sandvik (tabela D 25) e Iscar (eq. 7) publicam **idêntico** | 2 linhas acadêmicas | 2 fabricantes | ~~Convergem em 1%/grau~~ → **REABERTO pela R2-V**: um terceiro fabricante publica **1,5%/grau**. Ver A1 na atualização | `RESSALVA` |
| 20 | Desgaste e velocidade de corte como fator | não implementar (não quantificável a priori / < 5%) | não implementar (Kennametal expõe `Cw` mas **não publica o valor**) | literatura | catálogo | Convergem | `OK` |
| 21 | Rótulo de potência | não tratado | **3 de 4 fabricantes** põem `η` no denominador, com três nomes diferentes; a cadeia do Fenix está numericamente certa | — | 4 fabricantes, fórmula extraída do PDF | Só um dos dois achou | `RESSALVA` |
| 22 | Torque `Mc` | usa `Pc` (aresta) | usa `Pc`, **não** `Pm` — usar `Pm` infla o torque em 1/η | derivação | Kennametal (nomenclatura) | Convergem | `OK` |
| 23 | `kc(h = 0,1)` do **aço 1045** | **2513 N/mm²** medido em C45 | **2433 N/mm²** (Walter 1500 / 0,21) | medição, torneamento fino | catálogo | **Convergem em 3,3% — e ficam 23–27% ABAIXO do par do sistema** (3094) | `BLOQUEIA` (contra o registrado) |
| 24 | `kc(h = 0,1)` do **inox 304** | **2928 N/mm²** (proxy 1.4541, medido) | **2919 N/mm²** (Walter 1800 / 0,21) | medição | catálogo | **Convergem em 0,3%** — a convergência mais limpa da rodada. O par do sistema (3292) fica +13%, dentro da margem | `OK` |
| 25 | `kc1.1` do **8620 núcleo** | 1800 / 0,26 (proxy 16MnCr5 não temperado) | 1500 / 0,21 (Walter, encaixe por `Rm`) | Vargas et al. 2019 | catálogo | **Divergem acima da margem: 35% em `kc(0,1)`** — e nenhuma das duas é medição do 8620 | `BLOQUEIA` |
| 26 | Toda a tabela de constantes por material | **12 lacunas** — a literatura revisada por pares não publica tabela por liga | tabela completa, **fonte única** (Walter) | — | 1 publicação | **Só um dos dois achou** → `REFERÊNCIA ÚNICA`, nunca `CONSENSO` | `RESSALVA` |
| 27 | Como a tabela deve ser indexada | por liga **e tratamento**; não interpolar por dureza | por **classe ISO + `Rm`** — é assim que o fabricante publica | Tönshoff & Denkena: `kc` não é propriedade do material | Walter F 9 + F 32 | **Convergem no conceito** (o nome da liga não é a variável), divergem no substituto | `RESSALVA` |

**Nota de independência, declarada pelo próprio retorno A:** os únicos números de catálogo dentro de A (20MnCrS5 `2140/0,25`, S235JRG2 `1780/0,17`) vêm de um artigo que credita `mac.walter-tools.com`. **Não contam como confirmação independente de B** — é a mesma origem vista de dois ângulos. A avisou disso sem ser perguntado; a advertência foi respeitada nesta tabela.

---

## Itens que BLOQUEIAM

**B1 — Onde o diâmetro efetivo entra na cadeia.** A põe `De` na rotação (`n = Vc·1000/(π·De)`); B mantém `n` pelo `D` nominal e corrige o avanço por `D/De`. As duas correções podem ser complementares ou **a mesma correção contada duas vezes**. Numa esférica Ø10 com `ap` = 0,5 mm, o fator `D/De` sozinho vale **2,29×** — errar aqui erra o avanço por mais de 2×. Não resolver por média: abrir a página D 23–D 24 do guia Sandvik e ver se a rotação publicada usa `Dc` ou `De`.

**B2 — O par `2165 / 0,155` do aço 1045.** Está registrado como "validado contra Diniz/Marcondes/Coppini". Em `h` = 0,1 mm ele dá **3094 N/mm²**; uma medição acadêmica em C45 dá **2513** e o catálogo Walter dá **2433** — dois territórios independentes convergindo em 3,3% entre si e **23–27% abaixo** do par do sistema. O par não está errado por si: foi ajustado em outra faixa de `h` e está sendo extrapolado justamente para a faixa onde a fresa inteiriça trabalha. A mesma dúvida vale para o 1020. **O inox 304 passa** (+13%, dentro da margem).

**B3 — `kc1.1` do 8620 núcleo.** A dá 1800 / 0,26 (proxy de 16MnCr5 não temperado, medido); B dá 1500 / 0,21 (encaixe por `Rm` na tabela Walter). Diferença de **35% em `kc(0,1)`**, acima da margem do modelo. **Nenhuma das duas é medição do 8620** — a honestidade manda declarar a faixa `1500–1800` com a dispersão escrita, não escolher um ponto.

**B4 — A Questão 3 inteira depende de uma publicação.** As 12 linhas de B saem do mesmo compêndio Walter, e a extração da tabela não foi conferida por ninguém. O canônico **não pode** marcar nenhuma dessas linhas como `CONSENSO`. Antes de escrever: conferir 3 linhas na fonte (ver G2) e marcar a tabela inteira como `REFERÊNCIA ÚNICA — fabricante único`.

---

## Divergências com material já registrado

**D1 — Os três pares "validados" (1020, 1045, 304).** Nenhum dos dois retornos confirmou os valores exatos. A tentou e declarou que não conseguiu; B declarou que o território dele não alcança livro-texto. O que existe é o confronto dos itens 23 e 24 acima. *Não é erro provado — é validação não reproduzida.* Registrar assim no canônico.

**D2 — Fator de desgaste 1,1–1,3 no `CANONICO_LIMITES_E_ALERTAS.md` §2.2.** O canônico atribui essa faixa a "fabricante, calculador público de força, torque e potência", com `REFERÊNCIA ÚNICA`. B foi à mesma fonte (Kennametal) e concluiu: **o parâmetro `Cw` aparece na calculadora, mas o valor não é publicado**. Reconferir a origem daquela faixa antes que ela continue sustentando o teto de aproveitamento de 0,77.

**D3 — O `⧗ AGUARDA R2` do `CANONICO_LIMITES_E_ALERTAS.md` §1.1 pode ser fechado.** O canônico já usa `hex = fz × 2 × √(ae/D − (ae/D)²)`, que é **exatamente** o inverso do CTF exato (`1/CTF = 2√[r(1−r)]`). Os dois territórios confirmam essa forma, e B a reproduz dígito a dígito contra a tabela publicada de Sandvik. **A segunda fórmula em circulação está eliminada** — não é alternativa, é a conversão para espessura **média** usada como se fosse para máxima. O piso de espessura da §1.1 fica calibrado pela fórmula certa.

**D4 — A decisão pendente do rótulo de potência (§1.5 do canônico de limites) tem resposta técnica.** A cadeia do Fenix (`Pc = Q·kc/60000`, depois `Pm = Pc/η`) está **numericamente certa** e é a mais defensável: o `Pm` do Fenix é idêntico ao "net power" de Sandvik, ao "actual cutting power" de Mitsubishi e ao "power consumption" de Sumitomo; o `Pc` do Fenix é o `P` de Iscar. O que resta é **decisão de nomenclatura na interface**, não de fórmula. Isso não contradiz a auditoria da R5 — a R5 disse que rótulo ambíguo *vira* erro de fator `1/η`, e é exatamente o que B mediu nos quatro fabricantes.

**D5 — Exceção ao critério "valor redondo repetido é preenchimento por default" — CONFIRMADA, com condição.** A pergunta ficou pendente no `HANDOFF.md` e agora tem resposta dos dois lados. A exceção vale **quando a repetição é rastreável à publicação da fonte e a fonte declara o critério de atribuição** (Walter: `mc` por família ISO — 0,21 para aços moles e inox, 0,25 para aços tratados / N / S / H, 0,28 para ferros fundidos). **Não vale** para tabela do próprio projeto sem fonte: os cinco `mc = 0,20` do Fenix continuam sem base — e o valor que o fabricante publica para essa família é **0,25**, não 0,20.

---

## O que entra no canônico como lacuna declarada

1. **`kc1.1` e `mc` por liga não existem em literatura revisada por pares.** Existem por classe + `Rm`, em catálogo. Quem escrever o canônico registra isso como propriedade do domínio, não como falha da pesquisa.
2. **O par `(kc1.1, mc)` não é transferível entre faixas de `h`.** Dois pares medidos para aço de baixo carbono concordam em 6% onde foram ajustados e divergem **105%** em `h` = 0,02 mm. Um artigo mediu MAPE de 35–60% ao prever força com constantes de catálogo.
3. **A margem declarada de ±15–25% não é sustentável abaixo de `h` = 0,1 mm.** Os dois retornos chegam a isso por caminhos diferentes. O canônico precisa dizer o que o produto faz nessa faixa: declarar banda maior, ou marcar o resultado como extrapolado.
4. **O piso `h` = 0,02 mm é decisão de engenharia declarada**, não achado de fonte. Os dois retornos dizem isso com todas as letras.
5. **Equivalência normativa de "2711" e "VP Atlas": não confirmada.** A não achou W-Nr. 1.2711 em fonte normativa; B não achou na tabela de comparação do fabricante. Contorno de B: indexando por `Rm`, a equivalência deixa de ser necessária — passa a ser preciso a dureza.
6. **`GGG50`: 800 ou 950 N/mm².** A própria fonte dá dois caminhos (grupo K7 → 800; `Rm` → 950), 16% de diferença. `SEM CONSENSO` interno à fonte.
7. **`hm` para fresa toroidal e esférica com `κ` variável: sem forma fechada.** Lacuna nos dois territórios.
8. **8620 cementado (58–62 HRC):** o sistema usa 2800; a única fonte publicada diz **4300** (+54%). Uma fonte só, mas a linha do catálogo é definida pela faixa HRC exata do material. Somado ao `kc` constante, a potência desse material pode estar saindo ~2× abaixo do real.
9. **Duas travas que precisam virar teste automatizado** (achado de A, e o canônico deve carregá-las): `hm ≤ h_alvo` sempre; e, quando a compensação não for limitada pela máquina, `hm` volta a `h_alvo` dentro do erro da aproximação — é o auto-teste da não-contagem-dupla.

---

# Atualização — rodada de verificação R2-V (20/08/2026)

**Retorno auditado:** `RESPOSTA_R2V.md` — pesquisador único, conferência em fonte primária. G8 não se aplica.
**Disciplina do retorno:** `OK`. Declarou `NÃO VERIFICADO` em 3 dos 5 itens em vez de preencher, recusou cópia re-hospedada mesmo quando ela continha a resposta, e distinguiu "não encontrei" de "não existe". É o comportamento pedido.

## Situação dos bloqueios

| Bloqueio | Situação agora | O que mudou |
|---|---|---|
| **B1** — onde entra o diâmetro efetivo | ~~ABERTO~~ → **RESOLVIDO em 20/08** pela rodada R2-V2 | São **cumulativas**, sobre grandezas diferentes: `De` na rotação, `D3/De` na conversão de `hex` em `fz`. Fonte primária lida diretamente (Sandvik D 24) + exemplo resolvido da Mitsubishi reproduzido em 0,4%. Ver `VALIDACAO_R2V2.md` |
| **B2** — os pares do 1020, 1045 e 304 | **ABERTO, e agora com causa conhecida** | O livro não tem edição digital acessível. Isto não é falha da busca: é o resultado. Ver A3 |
| **B3** — `kc1.1` do 8620 | **RESOLVIDO** | Um terceiro valor apareceu, e ele desempata. Ver A4 |
| **B4** — extração da tabela Walter | **RESOLVIDO** | As 4 linhas conferem na fonte, dígito a dígito. Ver A5 |
| **D2** — fator de desgaste 1,1–1,3 | **CONFIRMADO como sem fonte, e pior que o suposto** | Ver A6 |

## A1 — Achado não solicitado: um terceiro fabricante publica `kc1.1` e `mc` por material

Procurando o 8620, o pesquisador encontrou o que a pergunta V2c pedia e não achou onde mandei procurar:

> **Jongen Werkzeugtechnik — *Tooling Guide, Technical information – solid carbide tools*, p. XII-30.**
> Linha publicada: `1.6523 · 21NiCrMo2 · 805M20 · 362 · 20NCD2 · 20NiCrMo2 · 8620 · 1570 · 0,24`

**É o segundo fabricante com tabela `kc1.1`/`mc` por material** — e, ao contrário da Walter, indexa **por liga**, não por classe de `Rm`. Isso tira a Questão 3 da condição de fonte única. O pesquisador não percebeu que o achado respondia V2c; entregou-o só dentro do V4.

**A legenda dessa página vale mais que a linha**, e traz duas coisas:

> "kc 1.1 is valid for ap = 1 mm and **hm = 1 mm**, with mc it is converted to the current values."

**Terceira confirmação, independente, de que o `kc1.1` de catálogo é definido sobre a espessura MÉDIA.** Isso fecha a contradição interna da Sandvik registrada no item 11 do confronto (a legenda dizia `hex`, a fórmula usava `hm`): a fórmula estava certa, a legenda era descuido. O veredito da Questão 2 sobe de `REFERÊNCIA ÚNICA elevada` para **três fabricantes concordando**.

> "The values for kc 1.1 are valid for 6° positive rake angle. Per degree of another rake angle kc1.1 is corrected to **1,5 %**."

**Isto reabre o item 19 do confronto A×B, e a reabertura é contra o que eu tinha concluído.** Eu havia registrado convergência em 1%/grau (Sandvik + Iscar), com a taxa de 1,5% "isolada" na literatura. Com a Jongen, o placar vira **2 fabricantes em 1%/grau × 1 fabricante + 2 linhas acadêmicas em 1,5%/grau**. Não é mais convergência: é `SEM CONSENSO` real, com dispersão de 50% no fator.

Consequência prática, para não inflar o problema: numa fresa inteiriça com `γ` entre 6° e 15°, a diferença entre as duas taxas vale **4,5% no `kc`** — dentro da margem de ±15–25% do modelo. **Não bloqueia o canônico.** Entra como faixa declarada, e a nota da Jongen dá o ponto de ancoragem que faltava: os valores de catálogo pressupõem `γ` = +6°.

## A2 — B1 continua aberto, e o obstáculo é de acesso, não de existência

A fórmula existe e foi vista: `De = √[D3² − (D3 − 2 × ap)²]` e `fz = D3 × hex / De`, no guia da Sandvik, página D 24 — **exatamente a leitura B** do enunciado. Mas o único acesso foi por domínio de CDN, e a regra de fonte que eu mesmo escrevi rejeitou. A página oficial responde com bloqueio de firewall.

A evidência da Mitsubishi ("Cutting Speed Formula for Ball Nose", com `DC` = *Cutting Edge Diameter*) mostra que a fórmula de velocidade para fresa esférica usa um diâmetro **de aresta**, não o nominal — o que puxa para a leitura A. **As duas leituras seguem vivas, sem exemplo resolvido que decida.**

**Minha regra foi rígida demais aqui, e o custo apareceu.** O PDF em CDN é o canal de distribuição do próprio catálogo da Sandvik, com o conteúdo idêntico ao impresso; tratá-lo como "PDF re-hospedado por terceiro" descartou a resposta que estava na mão. Na próxima rodada, a regra precisa distinguir **CDN do fabricante** (aceitável, com o domínio registrado) de **cópia hospedada por terceiro** (inaceitável).

**Como fechar B1:** obter a página D 23–D 24 do *Metalcutting Technical Guide* em PDF do domínio da Sandvik ou em exemplar impresso, e ler a fórmula de `n` para fresa esférica ao lado da de `fz`. É uma página só.

## A3 — B2: o livro não é verificável online, e isso é a resposta

*Tecnologia da Usinagem dos Materiais* (Diniz, Marcondes & Coppini) não tem edição digital acessível; o registro localizado foi só o bibliográfico. O pesquisador recusou substituí-lo por dissertação, catálogo ou página que atribui os números ao livro — corretamente.

**Consequência, e é uma decisão do Mestre, não da pesquisa:** os três pares `1800/0,17`, `2165/0,155` e `2150/0,185` **não podem ser confirmados por pesquisa online**. Restam três saídas: (a) consultar o exemplar físico; (b) trocar os três pares pelos valores de catálogo, que estão verificados; (c) manter os pares atuais com o rótulo honesto — `atribuído a Diniz et al., não verificado na fonte`. Ver a pergunta no fim deste bloco.

## A4 — B3 resolvido: o 8620 tem um terceiro valor, e ele desempata

| Origem | `kc1.1` | `mc` | Natureza |
|---|---|---|---|
| Walter, encaixe por `Rm` | 1500 | 0,21 | valor de **classe** |
| Vargas et al. (proxy 16MnCr5 medido) | 1800 | 0,26 | **outra liga**, medida |
| **Jongen, linha 1.6523 / 8620** | **1570** | **0,24** | **a liga, nominalmente** |

O valor da Jongen **cai entre os dois** e é o único atribuído ao 8620 pelo nome. Em `h` = 0,1 mm: Walter 2433 · Jongen 2711 · proxy 3275 N/mm². A dispersão de 35% que bloqueava vira **faixa de 1500–1800 com centro publicado em 1570**.

**Recomendação para o canônico:** adotar `1570 / 0,24` (Jongen, `REFERÊNCIA ÚNICA`, condição de validade declarada: `γ` = +6°, `hm` = 1 mm), registrando os outros dois como limites da faixa. **B3 deixa de bloquear.**

Ressalva honesta do próprio retorno: a linha da Jongen está numa **tabela de comparação de materiais** e **não declara o estado metalúrgico** (normalizado, beneficiado). Para o núcleo do 8620 isso é aceitável; para a camada cementada, não — a camada continua com fonte única (Walter, 4300 / 0,25).

## A5 — B4 resolvido: a extração estava limpa

As quatro linhas conferem na fonte, dígito a dígito: N2 `600/0,25` · P1,P6 `1500/0,21` · H1 `3000/0,25` · H3 `4300/0,25`. A tabela de conversão de dureza existe em F 32, com a ressalva publicada de que as conversões são aproximadas.

Única correção: a descrição publicada da linha P1/P6 é *"Non-alloyed and low-alloy steels, low and medium tensile strength"* — o `Rm` 350–750 é coluna, não descrição. Corrigir a citação no canônico; o número não muda.

**A extração por `pdfplumber` da apuração anterior está validada.** Isso vale além destas quatro linhas: aumenta a confiança nas outras 29 sem, no entanto, verificá-las uma a uma.

## A6 — D2: o teto de potência de 0,77 perdeu o chão

Dois números que o `CANONICO_LIMITES_E_ALERTAS.md` §2.2 registra como vindos de "fabricante, calculador público" **não foram encontrados publicados**:

- **fator de desgaste 1,1–1,3:** a calculadora da Kennametal expõe o parâmetro `Cw`, mas o acesso interativo está atrás de CAPTCHA e nenhuma documentação pública traz o valor. `NÃO PUBLICADO` — a suspeita da validação estava certa.
- **faixa de rendimento 0,6–0,9:** também não confirmada. O que existe publicado é o valor pontual **η = 0,8**, em exemplos resolvidos de Mitsubishi e Keyence.

**Consequência:** o teto de aproveitamento de potência de **0,77**, que aquele canônico deriva do fator 1,1–1,3, está apoiado num número sem fonte verificável. Ele precisa sair, ou ser redeclarado como decisão de engenharia — não como achado. **Isto é uma correção a um canônico já escrito, e vale mais que qualquer linha nova.**

O que sobrevive com fonte: `η = 0,8` como valor publicado em exemplo resolvido de dois fabricantes. O `η = 0,85` do produto continua defensável como escolha editável, mas **não como valor publicado**.

## O que ainda impede `CANONICO_MOTOR_DE_CALCULO.md`

**Só B1.** Uma página de catálogo — a fórmula de rotação para fresa esférica. Todo o resto do canônico pode ser escrito: a cadeia para fresa de topo reto está fechada desde a R2, a tabela de materiais agora tem duas fontes de fabricante, e as lacunas restantes são declaráveis.

## A7 — DECIDIDO pelo Mestre em 20/08/2026: trocar os três pares pelos valores de catálogo

Os pares atribuídos a Diniz/Marcondes/Coppini **saem**. Entram os valores de catálogo verificados em fonte primária nesta rodada.

| Material | Sai (atribuído a Diniz, não verificado) | Entra (Walter F 9, conferido em 20/08) | Linha | Encaixe |
|---|---|---|---|---|
| Aço 1020 (120–160 HB) | `1800 / 0,17` | **`1500 / 0,21`** | #1, grupos P1/P6 | por `Rm` (400–545), **com ressalva**: a descrição publicada diz *"C > 0,25%"* e o 1020 tem ~0,20% C |
| Aço 1045 (170–220 HB) | `2165 / 0,155` | **`1500 / 0,21`** | #1, grupos P1/P6 | limpo — `Rm` 575–740 dentro de 350–750, e 0,45% C abaixo do corte de 0,55% da linha seguinte |
| Inox 304 (140–180 HB) | `2150 / 0,185` | **`1800 / 0,21`** | #7, grupo M1 *"Stainless, austenitic steels"* | por classe |

**Por que esta é a troca defensável, e não apenas a mais cômoda:** os valores que entram têm **corroboração acadêmica independente no ponto de trabalho**. No confronto A×B, em `h` = 0,1 mm:

| Material | Valor de catálogo que entra | Medição acadêmica independente | Diferença |
|---|---|---|---|
| 1045 / C45 | 2433 N/mm² | **2513** N/mm² (Horváth & Lukács 2017) | **3,3%** |
| 304 / 1.4541 | 2919 N/mm² | **2928** N/mm² (mesma fonte) | **0,3%** |

Duas fontes de territórios que não se tocam, concordando dentro de 3% — contra os pares que saem, que ficavam 23–27% acima. É o critério do projeto funcionando: o valor que entra não é o mais autoritário, é o **corroborado**.

**O que muda no número que o operador vê.** Efeito da troca de constantes, isolado:

| Material | `h` = 0,05 mm | `h` = 0,1 mm | `h` = 0,2 mm |
|---|---|---|---|
| 1020 | −6,0% | −8,6% | −11,3% |
| 1045 | −18,3% | −21,4% | −24,3% |
| 304 | −9,8% | −11,3% | −12,8% |

**Consequência que importa para o produto:** a troca **atenua o salto** que a implementação do Kienzle traria. Com o par antigo, sair de `kc` constante para Kienzle elevava a potência calculada do 1045 em **+43%** em `h` = 0,1 mm; com o par novo, o aumento é de **+12,4%** — dentro da margem declarada do modelo. As duas correções entram juntas ou o operador vê um salto que a evidência não sustenta.

**Ressalva a carregar para o canônico:** o 1020 é o único encaixe imperfeito — a linha da Walter é definida para `C > 0,25%`. Marcar a linha do 1020 como `REFERÊNCIA ÚNICA — encaixe por Rm, composição na fronteira da faixa`, não como encaixe direto.

**Refinamento pendente, de custo baixo:** a Jongen indexa a tabela **por liga** (não por classe de `Rm`), e é fonte primária já verificada. Se as linhas de 1.0503 (C45), 1.0402 (C22) e 1.4301 (304) forem obtidas naquela mesma página XII-30, elas substituem o encaixe por classe por um valor atribuído à liga — melhor em qualidade, sem mudar a decisão. Tentativa de acesso automático em 20/08 retornou HTTP 403; exige download manual do PDF.
