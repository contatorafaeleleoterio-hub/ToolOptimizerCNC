# Canônico — Motor de Cálculo

> **Nomenclatura (27/08/2026).** Nos textos de produto o nome da indústria vem primeiro e o símbolo entre parênteses — `vc` = "velocidade de corte (vc)", `fz` = "avanço por dente (fz)", `ap` = "profundidade de corte (ap)", `ae` = "penetração de trabalho (ae)", `kc` = "força específica de corte (kc)", `mc` = "expoente de Kienzle (mc)", `hm/hex` = "espessura de cavaco média/máxima". Ver `Docs_inicial/referencia/GLOSSARIO_DE_TERMOS.md`. Este canônico é fonte técnica: fórmulas e tabelas mantêm o símbolo.

**Status:** fonte única de verdade sobre afinamento de cavaco, força específica de corte (Kienzle), potência e torque, para **fresamento com fresa inteiriça de metal duro**. Furação, roscamento e mandrilamento têm cadeia própria em `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md`.
**Precedência:** este documento vence, no sistema anterior: (a) o `kc` tratado como constante (`= kc1.1`, sem o expoente de Kienzle); (b) a fórmula de afinamento de cavaco em uso, `1/√(ae/D)`, aplicada como se corrigisse a espessura **máxima** quando na verdade aproxima a espessura **média**; (c) os três pares `(kc1.1, mc)` atribuídos a Diniz/Marcondes/Coppini para os aços 1020, 1045 e inox 304; (d) o par `1200 / 0,75` (ou `750 / 0,23`) do alumínio 6061-T6; (e) o fator de desgaste `1,1–1,3` usado no teto de aproveitamento de potência. Nas famílias **furar, roscar e mandrilar**, prevalece `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md`.
**Origem:** rodada de pesquisa R2 (par cego, retornos de 20/08/2026) + rodada de verificação R2-V + auditoria R2-V2, que obteve a fonte primária Sandvik e fechou o bloqueio B1 em 20/08/2026.
**Regra:** No Invention — nenhum número entra sem fonte citada.

---

## 1. Regras e fórmulas

### 1.1 Afinamento de cavaco — a espessura que entra em Kienzle é a média (`hm`), não a máxima (`hex`)

Duas grandezas de espessura de cavaco existem em fresamento e não são intercambiáveis:

```
hex = fz · sin(φmax) = fz · √[1 − (1 − 2·ae/D)²]        espessura MÁXIMA (no ponto de saída do dente)
hm  = fz · sinκ · (2·ae/D) / arccos(1 − 2·ae/D)          espessura MÉDIA (integral sobre o arco engajado)
                                                          [arccos em radianos; κ = ângulo de posição]
```

> A forma de `hex` escrita no `CANONICO_LIMITES_E_ALERTAS.md` §1.1 e no `MVP` §6.7 (`fz · 2 · √(ae/D − (ae/D)²)`) é **algebricamente idêntica** a esta: `1 − (1 − 2·ae/D)² = 4·(ae/D − (ae/D)²)`, e `√(4x) = 2√x`.

Fator de afinamento de cavaco (CTF, *chip thinning factor*) — a correção **exata** para converter `fz` programado em `hex` alvo:

```
CTF_hex = fz_programado / hex_alvo = 1 / √[1 − (1 − 2·ae/D)²]      válido para 0 < ae/D ≤ 0,50
CTF_hex = 1,0                                                       para ae/D > 0,50 (exato, não convenção)
```

**Prova por integração numérica:** usar `hm` como espessura de entrada em Kienzle erra 2–4% contra a força real; usar `hex` erra **+45% a +82%**. Os dois territórios da rodada confirmaram isso por caminhos que não se tocam — um por integral fechada, o outro por três fabricantes que publicam `kc = kc1.1 · hm^(−mc)` (Sandvik, ISCAR e Jongen — a legenda da Jongen declara textualmente: *"kc1.1 is valid for ap = 1 mm and hm = 1 mm"*).

**O que este documento substitui:** a fórmula em uso no projeto (`1/√(ae/D)`) é uma **aproximação de `hm`**, válida só para `ae/D ≤ 0,10` (publicada pela Sandvik: `hm ≈ fz·√(ae/Dc)`), mas estava sendo aplicada como se fosse a correção exata para `hex`. Em `ae/D = 0,20`, a aproximação dá **2,236** contra o valor exato **1,250** — o sistema programa **+79% de avanço a mais** que o correto, sempre para o lado que quebra ferramenta. Os dois territórios chegaram a 79% (78,9%) de forma independente.

**Confiança:** CONSENSO — dois territórios, caminhos independentes (derivação geométrica × publicação de fabricante).

### 1.2 Diâmetro efetivo (`De`) em fresa esférica — duas correções cumulativas, não alternativas

```
De = √[D3² − (D3 − 2·ap)²]  ≡  2·√[ap·(D3 − ap)]                Sandvik D 24 · Mitsubishi
n  = vc × 1000 / (π × De)                                        Mitsubishi (fórmula + exemplo resolvido) ·
                                                                   Sandvik (Dcap) · Kennametal
fz = D3 × hex / De                        (fresa centrada)        Sandvik D 24, verbatim
fz = D3 × hex / √[De² − (De − 2·ae)²]     (fresamento lateral)    Sandvik D 24, verbatim
vf = fz × n × z
```

**As duas correções operam sobre grandezas diferentes e não se sobrepõem:** a de rotação garante que a velocidade de corte real, na calota que efetivamente corta, seja a desejada; a de avanço converte a espessura de cavaco alvo em avanço a programar. Uma bloqueou a validação por duas rodadas até a fonte primária (Sandvik *Metalcutting Technical Guide*, seção D, página D 24) ser lida diretamente — um retorno anterior havia transcrito a fórmula com o numerador trocado (`De` em vez de `D3`) e atribuído a família errada de ferramenta, concluindo por engano que as correções eram alternativas.

**Trava obrigatória:** a entrada tem que declarar o que é. **Se a entrada é `hex`** (espessura de cavaco alvo), aplicar `fz = D3·hex/De`. **Se a entrada é um `fz` de catálogo** (o fabricante já publica o avanço a programar), não aplicar nada — a segunda correção já está embutida na recomendação. Confundir os dois programa avanço mais de **2× acima** do correto numa esférica Ø10 com `ap` = 0,5 mm. Exemplo resolvido reproduzido a partir de dado publicado da Mitsubishi (fresa SRFT20, `D` = 20 mm, `ap` = 1 mm): rotação pelo `De` acerta 5.477 rpm contra 5.500 publicados (0,4%); pelo `D` nominal, o erro seria de 2,3×.

**Confiança:** rotação por `De` — três fabricantes independentes (Sandvik, Mitsubishi, Kennametal), com exemplo numérico reproduzido. Conversão `hex → fz` — `REFERÊNCIA ÚNICA` (Sandvik), fórmula publicada e conferida dígito a dígito contra a fonte.

**Lacunas:** eixo inclinado (fresamento 5 eixos) tem fórmula própria publicada pela Mitsubishi (`θ = arccos[(D1−2ap)/D1] + 90 − α`), não verificada nesta rodada. **Fresa toroidal continua em aberto** — não é equivalente a "cutter de inserto redondo" (essa família usa o círculo inscrito da pastilha, grandeza que não existe em fresa inteiriça toroidal); não extrapolar.

### 1.3 Correção por ângulo de saída (`γ`) — faixa declarada, dentro da margem do modelo

```
kc_corrigido = kc × [1 − 0,01 · (γ − γ0)]     a 1%/grau de diferença face à referência γ0 = +6°   Sandvik D 25 · ISCAR eq. 7
kc_corrigido = kc × [1 − 0,015 · (γ − γ0)]    a 1,5%/grau, alternativa                             Jongen p. XII-30 · 2 fontes acadêmicas
```

> **Correção de 27/08/2026 (auditoria, achado A4).** A correção é sobre a **diferença** entre o ângulo real `γ` e a referência `γ0 = +6°`, não sobre `γ` absoluto. Em `γ` = γ0 o fator é **1,00** — sem correção. A forma anterior (`1 − 0,01·γ`) cortava 6% do `kc` de todo material mesmo quando a ferramenta tinha o ângulo de referência.

**Sem consenso real:** dois fabricantes publicam 1%/grau; um terceiro fabricante e duas fontes acadêmicas publicam 1,5%/grau — dispersão de 50% no fator. **Não bloqueia o canônico:** numa fresa inteiriça com `γ` entre 6° e 15°, a diferença entre as duas taxas vale 4,5% no `kc`, dentro da margem de ±15–25% do modelo. A referência de catálogo pressupõe `γ0 = +6°` (nota da Jongen).

**Confiança:** `SEM CONSENSO`, faixa declarada em vez de valor único.

### 1.4 Cadeia de cálculo — fresa reta/topo, corte periférico

> **Linha de fronteira (R8, emenda A1):** Esta cadeia aplica-se estritamente ao **fresamento**. Furação, roscamento e mandrilamento têm cadeia própria definida em `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` (sem alterar nenhuma fórmula de fresamento).

```
Entradas: vc, fz_programado, ae, ap, D, Z, kc1.1, mc, η.

1.  n  = vc × 1000 / (π × D)                                              [rpm]
2.  ε  = ae/D;  φmax = arccos(1 − 2ε)                                      [rad — válido 0 < ε ≤ 1; rasgo cheio ε→1, φmax→π; não travar em π/2]
3.  hm = fz_programado · sinκ · (2ε) / φmax                                [mm — espessura média exata; sinκ = 1 em fresa reta]
4.  kc = kc1.1 · hm^(−mc)                                                  [N/mm² — Kienzle]
5.  vf = fz_programado · Z · n                                             [mm/min]
6.  Q  = ap × ae × vf / 1000                                              [cm³/min]
7.  Pc = (Q × kc) / 60000                                                 [kW — potência na aresta]
8.  Pm = Pc / η                                                           [kW — potência no motor]
9.  Mc = (Pc × 9549) / n                                                  [Nm — torque, usa Pc, não Pm]
```

**Correção por ângulo de saída (§1.3) — passo opcional, fora da cadeia acima.** Só se aplica quando o ângulo de saída real da ferramenta é conhecido e difere da referência de catálogo `γ0 = +6°`: `kc ← kc · [1 − 0,01·(γ − γ0)]`. **Não é aplicada no MVP** (§1.3 e MVP §6.7 — entra como nota na procedência, não no número).

> **Correção de 27/08/2026 (auditoria, achados A1/A4/A15/A21).** O passo 2 **não trava `φmax` em π/2**: essa trava vale para o fator de afinamento (`CTF`, §1.1), não para `hm`, que integra sobre o arco realmente engajado e chega a π no rasgo cheio — com a trava, `hm` saía maior que `fz` acima de `ae/D` = 0,785 (impossível) e `Pc` −11% a −13% em rasgo cheio. O passo 4 **não carrega mais o termo `(1 − 0,01·γ0)`**: ele aplicava a constante de referência a todo material, cortando 6% do `kc` sempre — a correção de `γ` é sobre a diferença `(γ − γ0)` e é opcional (ver acima e §1.3). O passo 5 (`vf = fz·Z·n`) foi **explicitado** — era consumido no passo 6 sem ser produzido. O antigo passo `f_hex` **saiu da cadeia**: é o `CTF` da §1.1, calculado para exibição, **não** aplicado sobre `fz` (o `fz_programado` já é o avanço de catálogo — ver trava da §1.2 e MVP §6.5).

**Torque usa `Pc`, não `Pm`.** Os dois territórios convergem nisso: usar `Pm` (potência de motor) em vez de `Pc` (potência na aresta) infla o torque calculado por `1/η`. Nomenclatura confirmada em fonte de fabricante (Kennametal).

**Sensibilidade quantificada:** erro de 20% em `kc1.1` produz 20% de erro na potência (relação linear 1:1) — acertar `kc1.1` importa cerca de duas vezes mais que acertar `mc`, mas um `mc` errado sozinho já estoura a margem do modelo (Δ`mc` de 0,05 ⟹ ~12% em `kc`).

**Confiança:** `CONSENSO` nos passos 1, 2, 3 (`hm`) e 6 (`Q`) (derivação geométrica, confirmada por fabricante); passo 4, forma do `kc`, `CONSENSO`; passo 5 (`vf`), cinemática direta; passo 9 (torque por `Pc`), `CONSENSO`.

### 1.5 Piso de espessura de cavaco modelável

O modelo de Kienzle não é adequado a `h < 0,1 mm` nem a razão `b/h < 4` — os desvios contra a força medida crescem, e é por isso que a literatura precisou de um segundo valor de referência (`k1,0.1`, definido em `h = 0,1 mm`) em vez do `kc1.1` de catálogo (definido em `h = 1 mm`). Abaixo de `h = 0,1 mm`, a margem declarada de ±15–25% do modelo **não é sustentável**: o par `(kc1.1, mc)` não é transferível entre faixas de `h`, e `mc` efetivo cresce quando `h` cai.

**Qualificação por família (R8, emenda A2, M5):**
- Em **fresamento**, o enunciado vale como está: piso de travamento em `h = 0,02 mm` e limite de validade do modelo em `h = 0,1 mm`.
- Em **furação**, o regime `h < 0,1 mm` é o **regime normal**, e não a exceção (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.2). O limiar equivalente é `fn ≈ 0,21 a 0,23 mm/rot` e **não depende do diâmetro**.

**Piso de travamento (fresamento):** `h = 0,02 mm`. É **decisão de engenharia declarada**, não achado de fonte — os dois territórios chegam ao mesmo número por caminhos diferentes (um por limite acadêmico de validade do modelo, o outro por onde os catálogos param de plotar: Sumitomo desenha a partir de `f` = 0,04, Sandvik tabula a partir de `fz` = 0,1) e dizem isso com todas as letras.

**Confiança:** `CONSENSO conceitual` (limite do modelo) + `DECISÃO DE ENGENHARIA` (o número exato do piso).

### 1.6 Trava de não-contagem-dupla — auto-teste obrigatório

Duas invariantes que a implementação precisa carregar como teste automatizado, não só como fórmula:

1. `hm ≤ h_alvo`, sempre.
2. Quando a compensação de afinamento não estiver limitada por capacidade da máquina, `hm` recalculado a partir do `fz` compensado volta a `h_alvo`, dentro do erro da aproximação.

### 1.7 Rótulo de potência — `Pc` (aresta) e `Pm` (motor) são grandezas diferentes, ambas corretas

`Pc` (potência de corte na aresta, sem perdas) e `Pm` (potência consumida no motor, `Pc/η`) não são a mesma coisa rotulada diferente — são a mesma cadeia, e a cadeia do Fenix está numericamente certa nas duas pontas: `Pm` do Fenix ≡ *"net power"* (Sandvik) ≡ *"actual cutting power"* (Mitsubishi) ≡ *"power consumption"* (Sumitomo); `Pc` do Fenix ≡ *"P"* (Iscar). Confirmado em quatro fabricantes, com fórmula extraída de cada guia. **O que resta é decisão de nomenclatura na interface** (qual das duas o operador vê primeiro, e com que rótulo) — não de fórmula. Isso não contradiz a auditoria anterior: rótulo ambíguo *vira* erro de fator `1/η` quando a interface mistura as duas.

---

## 2. Constantes e tabelas

### 2.1 Força específica de corte (`kc1.1`, `mc`) por material

Fonte primária de toda a tabela: **Walter AG, *Technical Compendium — General*, 2025 EN, tabela "Cutting forces of Walter machining groups", páginas F 9 (força) e F 32 (conversão de dureza)**, salvo onde outra fonte é nomeada na linha. `mc` publicado por **classe** (não por liga individual) — o próprio fabricante declara o critério de atribuição; repetição de valor redondo aqui **não** é sinal de preenchimento por default.

| Material | `kc1.1` (N/mm²) | `mc` | Fonte | Confiança |
|---|---|---|---|---|
| Aço 1020 (120–160 HB) | 1500 | 0,21 | Walter F 9 #1 (grupo P1/P6), via `Rm` 400–545 (F 32) | `REFERÊNCIA ÚNICA` — encaixe imperfeito: a linha exige C > 0,25% e o 1020 tem ~0,20% |
| Aço 1045 (170–220 HB) | 1500 | 0,21 | Walter F 9 #1, via `Rm` 575–740 | `CONSENSO` — corroborado por medição acadêmica independente (Horváth & Lukács 2017: `kc` = 2513 N/mm² em `h` = 0,1 mm — 3,3% de diferença) |
| Aço 8620, núcleo (180–220 HB) | 1570 (faixa 1500–1800) | 0,24 (faixa 0,21–0,26) | Jongen *Tooling Guide*, p. XII-30, linha 1.6523/8620 — atribuída à liga pelo nome; desempata entre Walter (1500/0,21, encaixe por `Rm`) e Vargas et al. 2019 (1800/0,26, proxy 16MnCr5 medido) | `REFERÊNCIA ÚNICA` — mas a única atribuída ao 8620 nominalmente |
| Aço 8620, cementado (58–62 HRC) | **4300** | 0,25 | Walter F 9 #29, grupo H3 — linha definida pela própria faixa HRC | `REFERÊNCIA ÚNICA` — ver Lacuna 4.9, maior risco numérico da tabela |
| Inox 304 (140–180 HB) | 1800 | 0,21 | Walter F 9 #7, grupo M1 "stainless, austenitic steels" | `CONSENSO` — corroborado por medição acadêmica (proxy 1.4541: `kc` = 2928 N/mm² em `h` = 0,1 mm — 0,3% de diferença, a convergência mais limpa da rodada) |
| Alumínio 6061-T6 | 600 | 0,25 | Walter F 9 #15, grupo N2 "wrought aluminium alloy, hardened" — encaixe direto por classe e tratamento, não proxy | `REFERÊNCIA ÚNICA` |
| P20 / 1.2311 (280–320 HB) | 2000 | 0,25 | Walter F 9 #3, via `Rm` 930–1095 | `REFERÊNCIA ÚNICA` |
| 2711 (300–340 HB) | 2000–2500 (faixa) | 0,25 | Walter F 9 #3/#5, via `Rm` 1010–1160 — a faixa atravessa duas linhas da tabela | `REFERÊNCIA ÚNICA, faixa` — ver Lacuna 4.5 |
| H13 tratado / 1.2344 (45–52 HRC) | 3000 | 0,25 | Walter F 9 #27, grupo H1 — equivalência `1.2344 = X40CrMoV5-1 = BH13 = SKD61` confirmada pela tabela de comparação do próprio fabricante | `REFERÊNCIA ÚNICA` |
| H13 recozido | 2000 | 0,25 | Walter F 9 #3, grupo P11 (mesma equivalência de material) | `REFERÊNCIA ÚNICA` |
| Ferro fundido cinzento GG25 / EN-GJL-250 | 800 | 0,28 | Walter F 9 #10, via `Rm` ≈ 250 | `REFERÊNCIA ÚNICA` |
| Ferro fundido nodular GGG50 / EN-GJS-500-7 | 950 **ou** 800 | 0,28 | Walter F 9 #11 por `Rm` ≈ 500 (950) **vs.** grupo K7 da tabela de comparação do mesmo fabricante (800) — 16% de diferença | `SEM CONSENSO` — interno à própria fonte, ver Lacuna 4.6 |
| Ti-6Al-4V | 1500 | 0,25 | Walter F 9 #23 (grupo S7/S8) | `REFERÊNCIA ÚNICA` — ressalva: um estudo acadêmico (EBM) mede `kc` ≈ 1775 N/mm² num ponto (~20% abaixo da forjada), mas não reporta o par `(kc1.1, mc)`, só ordem de grandeza |

**Removidos do projeto — decisão do Mestre em 20/08/2026 (ver seção 3):** os pares `1800/0,17` (1020), `2165/0,155` (1045) e `2150/0,185` (304), atribuídos a Diniz/Marcondes/Coppini, *Tecnologia da Usinagem dos Materiais*. O par `1200/0,75` (ou `750/0,23`) do alumínio 6061-T6 também sai — `mc = 0,75` é dimensionalmente absurdo (nenhum material usinável chega perto disso; o teto publicado por Walter em 33 linhas é 0,30) e fecha como erro de transcrição de `1 − mc`: `1 − 0,75 = 0,25`, exatamente o valor publicado.

### 2.2 Rendimento (`η`)

| Valor | Uso | Fonte | Confiança |
|---|---|---|---|
| 0,80 | valor publicado em exemplo resolvido | Mitsubishi, Keyence (2 fabricantes, ponto único cada) | `REFERÊNCIA MÚLTIPLA` |
| 0,85 | valor em uso no projeto | não publicado em nenhuma fonte consultada | `DECISÃO DE ENGENHARIA` — defensável como parâmetro editável, não como achado de pesquisa |

---

## 3. O que foi decidido pelo Mestre

**D7 — 20/08/2026: trocar os três pares atribuídos a Diniz/Marcondes/Coppini pelos valores de catálogo verificados.** O livro não tem edição digital acessível — não é falha de busca, é o resultado. Os valores que entram (tabela 2.1) têm corroboração acadêmica independente no ponto de trabalho (1045: 3,3% de diferença contra medição; 304: 0,3%), contra os pares antigos, que ficavam 23–27% acima. **Critério aplicado:** o valor que entra não é o mais autoritário citado, é o **corroborado por território independente**.

**Efeito isolado da troca de constantes** (redução na potência calculada, `kc` ainda tratado como constante):

| Material | `h` = 0,05 mm | `h` = 0,1 mm | `h` = 0,2 mm |
|---|---|---|---|
| 1020 | −6,0% | −8,6% | −11,3% |
| 1045 | −18,3% | −21,4% | −24,3% |
| 304 | −9,8% | −11,3% | −12,8% |

**Efeito combinado** (troca de constante **e** introdução do expoente de Kienzle, `kc = kc1.1·hm^(−mc)`, no 1045 em `h` = 0,1 mm): o salto de potência ao sair do `kc` constante cai de **+43%** (com o par antigo) para **+12,4%** (com o par novo) — dentro da margem declarada do modelo. As duas correções — constante nova e expoente de Kienzle — precisam entrar juntas; separadas, o operador vê um salto que a evidência não sustenta.

---

## 4. Lacunas declaradas

1. **`kc1.1` e `mc` por liga individual não existem em literatura acadêmica revisada por pares.** Existem por classe ISO + faixa de `Rm`, publicados em catálogo (Walter, Jongen). É propriedade do domínio, não falha desta pesquisa.
2. **O par `(kc1.1, mc)` não é transferível entre faixas de `h`.** Todo par tabelado é ajustado na faixa de desbaste e extrapolado para acabamento — ver 1.5. *(Lacuna irmã em furação — R8, emenda A3, D6, L-C:* não existe par medido em **furação** para os materiais do produto, e o par de torneamento subestima o torque de furação em 27%, pois essa parcela do torque não provém de corte de aresta principal — ver `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §2.4 e §4.2 L-C*).*
3. **Fresa toroidal e fresa esférica com `κ` variável não têm forma fechada de `hm`** publicada em nenhum dos territórios consultados.
4. **Fresa esférica em eixo inclinado (5 eixos):** fórmula existe (Mitsubishi), não foi verificada nesta rodada. Reabre se o produto cobrir 5 eixos.
5. **Equivalência normativa entre "2711" e a designação comercial "VP Atlas" não confirmada** em fonte normativa. Indexar pela tabela de `Rm`/dureza (como a Walter faz) evita depender dessa equivalência.
6. **GGG50: 800 ou 950 N/mm².** A própria fonte (Walter) dá dois caminhos que não concordam entre si — 16% de diferença, `SEM CONSENSO` interno à fonte.
7. **`kc1.1`/`mc` de P20, H13, GG25, GGG50, Ti-6Al-4V e 8620 cementado vêm de uma única fonte cada** (Walter ou Jongen), nunca confirmados por segunda fonte independente.
8. **Fator de desgaste de ferramenta (`Cw`) sobre o `kc`/potência efetivos:** nenhum fabricante consultado publica o valor — a calculadora interativa da Kennametal expõe o parâmetro, mas o acesso ao número está bloqueado (CAPTCHA). O fator `1,1–1,3` que sustentava o teto de aproveitamento de potência de 0,77 no `CANONICO_LIMITES_E_ALERTAS.md` não tem fonte verificável e precisa ser corrigido ali.
9. **O 8620 cementado é o maior risco numérico desta tabela.** O valor em uso no sistema anterior (2800) fica 35% abaixo do publicado (4300); somado ao efeito de tratar `kc` como constante, a potência calculada para esse material pode sair **~2× abaixo do real**. Prioridade de correção acima das demais linhas.

---

## 5. Consequências

- **`kc` deixa de ser constante** (`= kc1.1`) e passa a `kc = kc1.1 · hm^(−mc)`. Potência, torque e força sobem em toda a faixa `h < 1 mm` — ou seja, sempre, em fresamento com fresa inteiriça.
- **A espessura que alimenta Kienzle é `hm` (média), nunca `hex` (máxima) nem o `fz` puro.** Onde o sistema hoje aplica compensação de afinamento pensando em `hex`, ou usa `fz` direto sem distinguir a entrada, o erro de força/potência varia de +45% a +82%.
- **A fórmula de afinamento em uso (`1/√(ae/D)`) sai** — ela aproxima `hm`, não `hex`, e vinha sendo usada para o propósito errado, entregando ~79% de avanço a mais que o exato em `ae/D = 0,20`.
- **Fresa esférica exige duas correções cumulativas** (rotação por `De`; avanço por `De` só quando a entrada é `hex` alvo, nunca quando já é `fz` de catálogo). Aplicar a segunda correção sobre um `fz` já compensado dobra o erro.
- **O `⧗ AGUARDA R2` do `CANONICO_LIMITES_E_ALERTAS.md` §1.1 fecha.** A fórmula `hex = fz × 2 × √(ae/D − (ae/D)²)` já em uso naquele documento é exatamente o inverso do CTF exato desta seção 1.1 — confirmado pelos dois territórios da rodada.
- **O teto de aproveitamento de potência de 0,77 do `CANONICO_LIMITES_E_ALERTAS.md` §2.2 perde a fonte** (Lacuna 4.8) e precisa ser corrigido ali ou redeclarado como decisão de engenharia.
- **O rótulo de potência na interface** (`Pc` na aresta vs. `Pm` no motor) tem resposta técnica de fórmula; falta só decisão de nomenclatura — repassar a `E3`/`E4` quando escritos.
- **O torque deve ser calculado a partir de `Pc`, nunca de `Pm`** — usar `Pm` infla o torque calculado por `1/η`.
