# Validação R7 — o piso de espessura de cavaco (lacuna `L4`)

**Data:** 29/08/2026 · **Retornos:** `RESPOSTA_R7_A.md`, `RESPOSTA_R7_B.md` e `RESPOSTA_R7_C.md` — **três** territórios independentes sobre o mesmo enunciado (`_para_colar/COLAR_R7_PISO_DE_ESPESSURA.md`).

---

## Veredito em uma linha

**A rejeitado por fabricação de fonte. B aceito. C aceito como corroboração.** Os três chegaram ao mesmo piso — poucos micrômetros — e **os três dizem que a regra não dispara**. Com o piso real, o gatilho 1 do `MVP` §9.2 é **matematicamente inalcançável dentro da escala do §5.3**.

**Em toda divergência, A está sozinho contra os outros dois.** Isso é o que o par cego existe para produzir, e produziu.

---

## 1. Território A — rejeitado

Três das seis fontes citadas **não existem**. Verificado por busca direta.

| Citação de A | O que a verificação achou | Estado |
|---|---|---|
| Liu et al. (2006), *"The child's play of minimum chip thickness in metal cutting"*, DOI 10.1115/1.2162919 | O artigo real de Liu, DeVor e Kapoor (2006) é ***"An Analytical Model for the Prediction of Minimum Chip Thickness in Micromachining"***, JMSE 128(2):474–481. O título citado **não existe** | **FABRICADO** |
| Wyma et al. (2020), *"Influence of edge preparation on tool life and cutting forces in solid carbide end mills"*, CIRP Annals, DOI 10.1016/j.cirp.2020.04.081 | Nenhum artigo com esse título e autor. Existem trabalhos próximos de outros autores, nenhum com o `rβ = 8,4 ± 1,2 µm` alegado | **FABRICADO** |
| Açores & Silva (2018), *"Experimental determination of minimum chip thickness in hard milling"*, DOI 10.1007/s00170-018-2190-2 | DOI não resolve; nenhum autor "Açores" na área | **FABRICADO** |
| Sandvik, *"hm nunca inferior a 0,01 mm"*, com citação direta entre aspas | O território B foi à documentação da Sandvik e reporta `NÃO ENCONTRADO` para piso publicado em mm | **NÃO CORROBORADO** |
| Seco, *Milling — Practical guide to cutting data* (2023), p. 214, `hex ≥ 0,008 mm` | Página e edição específicas; nenhuma corroboração | **NÃO CORROBORADO** |
| Bruker Alicona, whitepaper de metrologia de aresta | Plausível, mas sem localizador que permita conferir os números | **NÃO VERIFICÁVEL** |

**Três defeitos agravantes, além das fontes:**

1. **Atribuição trocada na única fonte real.** A revisão de Wojciechowski (conferida diretamente) registra **Liu et al. (2006) → k = 0,2–0,4 para Al 6082-T6** e **Malekian et al. (2012) → k = 0,23 para Al 6061**. O território A atribui a Liu o "0,3 como ponto crítico de aços comuns" e a Malekian "0,28–0,32 para aço carbono e 0,14–0,18 para alumínio". **Trocou os materiais e apertou as faixas.** O território B reproduziu a mesma tabela corretamente.
2. **Usa a fórmula que o `MVP` §6.4 eliminou.** A escreve `hex = fz · √(ae/D)` como "a equação do fabricante para compensação radial". É a conversão para espessura **média** usada como se fosse para a máxima — exatamente o erro de +79%/+90% que o §6.4 documenta. Duas linhas depois, A usa a fórmula correta e chega a 0,0348 mm. **Contradiz a si mesmo no mesmo parágrafo.**
3. **Rotula como `CONSENSO` faixas por material que ninguém publicou.** Inox 0,35–0,45 e aço endurecido 0,40–0,55 saem como `CONSENSO`; o território B, com a revisão crítica na mão, marca os dois como `NÃO ENCONTRADO`.

> **Nada do território A entra em documento.** Pelo `MVP` §0.2, número sem fonte não atravessa — e fonte inventada é pior que fonte ausente, porque passa na leitura.

**Uma coisa de A sobrevive, e não é dele:** a observação de que os `25–127 µm` do registro anterior são de **pastilha intercambiável**, não de fresa inteiriça. Isso é coerente com o `NÃO ENCONTRADO` de B para fresa inteiriça e explica a divergência da `L4`. Fica como **hipótese plausível, sem fonte** — não como achado.

---

## 2. Território B — aceito

Conferido ponto a ponto contra as fontes primárias.

| Fonte | Verificação | Estado |
|---|---|---|
| Wojciechowski, *"Estimation of Minimum Uncut Chip Thickness…— A Critical Review"*, Materials 15(1):59, DOI 10.3390/ma15010059 | **Confirmado.** A Tabela 1 dá `k` de **0,08 a 0,63**, agrupado entre 0,2 e 0,45; e o texto diz que os métodos "se aplicam principalmente a corte ortogonal livre (sobretudo torneamento)" e que "há poucos modelos para ferramenta de aresta arredondada com cinemática oblíqua". **B transcreveu corretamente, inclusive a ressalva** | `CONSENSO` |
| Globisch et al. (2024), *"Tool Concept for a Solid Carbide End Mill…Toolox 44"*, JMMP 8(4):170, DOI 10.3390/jmmp8040170 | **Confirmado que existe** (MDPI, 06/08/2024, autores conferem). O `rβ = 10 µm` está no corpo do artigo, que não abriu na verificação (403) — mas o artigo é do tipo certo e B declara que é ferramenta de desenvolvimento, não série de catálogo | `REFERÊNCIA ÚNICA` |
| Sandvik, *Entering angle and chip thickness in milling* | Sustenta `h_ex` como a grandeza de referência para corte efetivo, e `fz = h_ex` em aresta reta a 90°. **Não** publica piso em mm | `REFERÊNCIA ÚNICA` |
| Catálogo WIDIA WCE (A-22-06658EN_me, 2022, p. 13) | Exemplo resolvido: D 20, `ae` 2, `fz` 0,089 × KFz 1,64 = 0,146 | verificável |

**B confirma a cadeia do `MVP` por fora.** Calculando o exemplo canônico de forma independente, chegou a `hex = 26,15 µm` — contra os **0,0261534 mm** da §7.6.1. **Confere na quinta casa.** É a primeira validação externa da cadeia corrigida.

---

## 3. Território C — aceito como corroboração, não como fonte de número

Chegou depois, sobre o mesmo enunciado, sem contato com os outros dois.

**O que ele vale:** corrobora B em **seis** pontos, com caminho próprio — e onde A e B divergiam, **C fica com B em todos os casos**.

| Ponto | A | B | C | Efeito |
|---|---|---|---|---|
| `rβ` de fresa inteiriça | 3–15 µm | 10 µm | 3–20 µm (típico 10–15) | **convergem em ordem de grandeza** |
| Piso resultante | 1,0–6,3 µm | 2,2–3,6 µm | 2–6 µm | **convergem** |
| Piso publicado em mm por fabricante | alega Sandvik 0,01 e Seco 0,008 | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` | **2 contra 1 — A cai** |
| `k` para alumínio | 0,10–0,20 | 0,23 a 0,35–0,40 | 0,20–0,40 | **B e C batem; A é outlier** |
| `k` para inox e endurecido | `CONSENSO` alegado | `NÃO ENCONTRADO` | `NÃO ENCONTRADO`/`SEM DADOS` | **2 contra 1 — A cai** |
| Comparar contra `hex`, não `hm` | sim | sim | sim | **`CONSENSO` 3/3** |
| A regra dispara? | "cirúrgica" | não dispara | **"não protege praticamente ninguém"** | **`CONSENSO` 3/3** |

C e B citam **a mesma fonte primária** para `k` — Oliveira et al. (2015), IJMTM 89, faixa 0,22–0,36 em AISI 1045 — e **a mesma** para a escolha de `hex` (Sandvik, `fz = h_ex` em aresta reta 90°). Duas apurações independentes chegando ao mesmo localizador é a definição de corroboração.

**Onde C é fraco, e por isso não vira número:**

1. **A fonte do `rβ` é um blog de afiação** (Cuttermasters), não catálogo nem literatura revisada. O próprio C rotula `REFERÊNCIA ÚNICA` e declara que não achou estudo independente — honestidade que A não teve, mas continua sendo fonte que o §0.2 não aceita para número de produto.
2. **Erro de atribuição de marca:** C escreve "Widia (Sandvik)" e "Widia/Sandvik VariMill". **Widia é Kennametal, não Sandvik.** Não invalida os `fz` citados, mas é descuido de rastreabilidade.
3. **Superinterpretação de Oliveira:** C afirma que a razão é "praticamente independente do material". A revisão de Wojciechowski — conferida — documenta o contrário: `k` de 0,08 a 0,63 com dependência de material, método e cinemática. **Fica a leitura de B.**

**O que C acrescenta e ninguém mais deu:** uma dependência do **`rβ`** com o material — 3–5 µm em alumínio, 8–12 µm em aço carbono, 15–20 µm em endurecido. Se confirmada em fonte elegível, ela explica parte da variação do piso **sem** precisar de `k` por material, que é justamente o que ninguém achou para inox e endurecido. **Fica registrada como pista, não como dado.**

---

## 4. O que os territórios concordam — e vale

| # | Achado | Estado |
|---|---|---|
| 1 | **`rβ` de fresa inteiriça está na ordem de ~10 µm, não de 100 µm** | A: 3–15 µm · B: 10 µm (medição única). **Convergem em ordem de grandeza**, e é a única coisa de A que B corrobora |
| 2 | **Os 30 µm da tela não são sustentados por nada** | Exigiriam `rβ` de 83–136 µm. `NÃO ENCONTRADO` em ambos |
| 3 | **O gatilho compara contra `hex`, não `hm`** | O `MVP` §9.2 gatilho 1 **já usa `hex`** ✓. Nada a mudar |
| 4 | **O piso real fica em poucos micrômetros** | A: 1,0–6,3 µm · B: 2,2–3,6 µm. Convergem |
| 5 | **A regra quase nunca dispara** | Os dois confirmam. É exatamente o que a `L4` previu |

**Piso adotado:** `h_min = k × rβ`, com `rβ = 10 µm` (`REFERÊNCIA ÚNICA`, Globisch) e `k = 0,22–0,36` (`SEM CONSENSO`, faixa de microusinagem de Oliveira et al. via Wojciechowski) →

```
h_min = 2,2 a 3,6 µm  =  0,0022 a 0,0036 mm
```

**Rótulo do par: `SEM CONSENSO`.** As duas entradas são frágeis: `rβ` é uma medição de ferramenta de desenvolvimento, e `k` vem de microusinagem e corte ortogonal, não de fresa convencional.

---

## 5. A consequência que decide — o gatilho 1 é inalcançável

Não é "dispara pouco". É **inalcançável dentro da escala do próprio controle**.

Fresa Ø10, `Z` 4, aço 1045. Piso `h_min` = 3,6 µm (a ponta **mais permissiva** da faixa).

| Cenário | Conta | `hex` | Contra o piso |
|---|---|---|---|
| Exemplo canônico do §7.6 (`fz` 0,060 · `ae/D` 5%) | `0,060 × 0,4359` | 26,2 µm | **7,3× acima** |
| `fz` no **piso da escala** do §5.3 (`max(0,002 ; 0,140 × 0,4)` = 0,056), `ae/D` 5% | `0,056 × 0,4359` | 24,4 µm | **6,8× acima** |
| `fz` no piso da escala, `ae` no **piso da escala** (0,01 mm → `ae/D` 0,1%) | `0,056 × 2√(0,001 − 0,000001)` | 3,5 µm | **na fronteira** |

**Para o gatilho 1 disparar, os dois controles precisam estar simultaneamente no valor mínimo absoluto da escala** — `fz` 0,056 mm e `ae` 0,01 mm num Ø10. Qualquer combinação de uso real fica uma ordem de grandeza acima.

Dito ao contrário: com `ae/D` de 5%, disparar exigiria `fz` < 0,0083 mm — **15% do piso da escala do controle.**

> **O alerta mais importante do produto, com o número correto, nunca aparece.** Com o número errado (30 µm) ele aparecia em condição normal de trabalho — falso positivo. A regra estava quebrada nas duas direções, e o defeito não era o cálculo: era o limiar.

---

## 6. O que isso derruba

1. **O `MVP` §9.2 gatilho 1** — a regra `hex < 0,3 × rβ` sobrevive na forma, mas com `rβ` real ela não é acionável. Precisa de decisão de produto.
2. **O exemplo canônico do §7.6, de novo.** Corrigido nesta mesma sessão para fazer o gatilho 1 disparar com `ae` 0,5 mm — e agora o gatilho 1 não existe na prática. Sobra o **1a** (`hm` 0,013 < 0,1 mm), que continua ativo, continua marcando **extrapolado**, e continua **sem direção alcançável** (§7.4 r5).
3. **O `MVP` §13.1 `L4`** — a lacuna muda de natureza. Não é mais "dois números divergem": é **"o limiar não tem fonte e a regra não dispara"**. O `rβ` de 25–127 µm precisa sair, com a nota de que é faixa de pastilha.
4. **`E4` §1.3 e §2.4, o `BRIEF` §5.8 e as cinco folhas** — todos encenam um alerta que não existiria.

---

## 7. O que ficou `NÃO ENCONTRADO` — e provavelmente não existe onde estar

| Lacuna | Estado |
|---|---|
| Faixa de `rβ` de gume publicada por fabricante para fresa inteiriça de catálogo | `NÃO ENCONTRADO` nos dois territórios. Catálogo publica diâmetro, canais, raio de **canto** e revestimento — nunca o arredondamento micrométrico do gume |
| Efeito quantificado do revestimento sobre o `rβ` de ferramenta comercial | `NÃO ENCONTRADO` |
| `k` para inox austenítico em fresa convencional | `NÃO ENCONTRADO` — **não preencher com o valor do aço carbono** |
| `k` para aço endurecido / molde em fresa convencional | `NÃO ENCONTRADO` |
| Piso direto em mm publicado por fabricante | `NÃO ENCONTRADO` em B; alegado por A em duas fontes **não corroboradas** |
| Validação experimental de `hex < 0,3 rβ` em fresa convencional de uso geral | `NÃO ENCONTRADO` |
| Evolução de `rβ` com o desgaste da ferramenta | `NÃO ENCONTRADO`. É relevante: uma fresa gasta esfrega com avanço muito maior que uma nova, e o produto calcula sempre ferramenta nova |

---

## 8. Lição de método

O enunciado da R7 pediu explicitamente, na Q4, que o retorno **não suavizasse** — que dissesse se a regra dispara alguma vez, e que "a regra não dispara" seria resposta mais útil que a confirmação. **O território B respondeu isso, e é o retorno que serve.** O território A confirmou o que o documento já dizia, e para isso precisou inventar três artigos.

**Pergunta que convida à confirmação recebe confirmação.** A Q4 foi escrita para não convidar — e o par cego mostrou a diferença entre um retorno que a respeitou e um que a contornou.

**O terceiro território pagou por si.** Com dois, a divergência sobre o piso publicado em mm (A alegando Sandvik e Seco, B não achando nada) ficaria em empate — e empate sobre "existe fonte?" tende a ser resolvido a favor de quem alega, porque alegar é mais específico que não achar. **Com três, virou 2 contra 1, e o 1 é o que inventou artigo.** O custo de um terceiro retorno foi menor que o de embarcar um piso de fabricante que não existe.
