# Validação — R8 Furação, roscamento e mandrilamento

**Veredito:** APROVADO — a rodada fecha três das quatro questões com confiança alta e cruzamento
entre territórios; a quarta (`fn` de partida na furação) fecha só a **forma** da regra, não o número.
**Retornos julgados:** `RESPOSTA_R8.md` (1.078 linhas) e `RESPOSTA_R8_B.md` (1.331 linhas), par cego.
**Enunciado:** `R8_FURACAO_ROSCAMENTO_MANDRILAMENTO.md`, trecho após a linha `═══`.
**Fecha:** Q5 (`fn` de partida) · Q6 (espessura de cavaco em furação) · Q8 (`vc` no macho) ·
Q9 (taxa de remoção em mandrilamento) — do `construcao/QUESTOES_ABERTAS_CONSTRUCAO.md`.
**Data:** 03/09/2026.

---

## Sobre a cegueira do juiz

`_procedencia/MAPA_R8.md` **não foi aberto.** Não sei qual território foi designado "o primeiro" e
não tratei nenhum dos dois como principal.

O conteúdo denuncia o território de cada retorno, e isso é inevitável: um cita norma e handbook
(Machinery's Handbook, um artigo de congresso sobre Kienzle em furação, um laboratório universitário,
dois congressos brasileiros da ABCM); o outro cita catálogo e formação técnica de fabricante (Walter,
Sandvik, Kennametal, ISCAR, Dormer, Guhring, EMUGE, Morse, Viking). **Neste documento eles são
chamados de `[HANDBOOK]` e `[CATÁLOGO]`** — rótulo de origem, não de hierarquia.

**Não desempatei por prestígio.** Norma não venceu catálogo por ser norma; catálogo não venceu norma
por ser prático. Onde um venceu, venceu por evidência melhor — número com condição declarada, com
procedência rastreável, com fonte independente dentro do próprio território, ou por leitura direta de
tabela contra extrapolação assumida.

---

## As três regras do confronto, e como foram aplicadas

1. **Divergência nunca virou média.** Onde os dois números diferem, ou um venceu com motivo, ou o
   resultado é `FAIXA`, ou é `LACUNA`. Nenhum "terceiro número" foi fabricado. O caso mais tenso — a
   magnitude do defeito da `vc` do macho (Q3.1) — foi resolvido por qualidade de evidência, não por
   média entre 8× e 4×.
2. **Convergência dentro do mesmo território não contou.** A maior parte dos `CONSENSO` de cada
   retorno é intra-território (MH + laboratório universitário de um lado; Walter + Sandvik +
   Kennametal + Dormer do outro). Esses valem como "duas fontes", não como confirmação cruzada. As
   **doze convergências entre territórios** estão listadas na seção final — são elas que sustentam a
   confiança alta.
3. **Lacuna nos dois é resultado válido.** Cinco itens ficaram `LACUNA` depois das duas apurações, e
   estão registrados como lacuna, não como "assumimos que". Três deles são exatamente a fronteira
   entre os dois territórios — o dado que um tem e o outro não existe em nenhum dos dois.

---

# QUESTÃO 1 — Avanço por rotação (`fn`) de partida na furação

## 1.1 — A lei do avanço: regra sobre o diâmetro, ou tabela?

| Item | Veredito | Motivo |
|---|---|---|
| **Forma funcional** | **VENCEU — sublinear, NÃO linear** | Os dois territórios, independentes, mostram `fn` crescendo mais devagar que `D`. `[CATÁLOGO]` ajustou `fn ∝ D^a` em quatro catálogos e quatro famílias de ferramenta e obteve `a = 0,55 ± 0,1`. `[HANDBOOK]` reduziu as tabelas de MH e do laboratório a `k = fn/D` e obteve `k` caindo de 0,020 para 0,011 de Ø3 a Ø25 — que é a mesma coisa, `a ≈ 0,8`, escrita de outro jeito. **A recomendação de `fn = 0,015·D` do `[HANDBOOK]` não sobrevive: contradiz o próprio dado reduzido dele.** |
| **Expoente** | **FAIXA — `a` ∈ [0,5 ; 0,8]** | `[CATÁLOGO]` fez o ajuste log-log explícito (mediana 0,54, `CONSENSO` de forma entre 4 catálogos). `[HANDBOOK]` tem 2 fontes mas **não ajustou** — assumiu linear e tratou a degressão como nota de rodapé. Para o expoente, `[CATÁLOGO]` tem evidência melhor (fez a análise); mas é catálogo-só, e o dado de handbook aponta mais íngreme. Faixa honesta: `fn ≈ k·D^a`, `a` de 0,5 a 0,8. |
| **`k` de partida** | **LACUNA ASSUMIDA no território de norma; `SEM CONSENSO` no de catálogo** | `[HANDBOOK]`: `k ≈ 0,018` (D≤13), mas é HSS twist drill genérico. `[CATÁLOGO]`: `k` varia 3× ao longo da faixa de diâmetro; o valor absoluto é `SEM CONSENSO` mesmo dentro do território (Morse ×1 vs Kennametal HPR ×1,3–2,7). O número de partida para MD inteiriço de aço **não fecha** — ver L-A. |
| **Substrato MD × HSS-Co** | **VENCEU — substrato governa `vc`, não `fn`** | Convergência: `[HANDBOOK]` (MH não separa substrato no avanço; a nota "×2,5 for carbide" é fator de **velocidade**) e `[CATÁLOGO]` (Morse: trocar HSS→MD muda só a velocidade, ×3,3; o avanço fica igual). |
| **Classe da broca** | **`[CATÁLOGO]` — achado real, `REFERÊNCIA ÚNICA`** | Kennametal HPR (alto desempenho, refrigeração interna, ponta 140°) aceita `fn` **1,3 a 2,7× maior** que a broca de MD de uso geral da Morse. Um seletor único "MD vs HSS-Co" erra até 2,7× dentro do próprio MD. `[HANDBOOK]` não enxerga isso — catálogo é o único que separa classe de broca. |

**Recomendação utilizável para o produto:** `fn_partida ≈ 0,08·√D` para aço ISO P com broca de MD,
faixa `0,06·√D` a `0,16·√D` (mm/rot) — **ajuste do `[CATÁLOGO]` sobre dado de fabricante, não número
publicado; marcar como derivado.** O ponto que fecha com confiança alta é negativo: **não use `fn`
proporcional a `D`.**

## 1.2 — U-drill, broca de centro/spot, escareador, alargador

| Item | Veredito | Motivo |
|---|---|---|
| **U-drill — escala com o diâmetro?** | **VENCEU `[CATÁLOGO]` — NÃO escala** | `[CATÁLOGO]` leu a tabela da ISCAR: `fn` publicado **só por grupo de material**, a mesma faixa para toda a linha de diâmetros. `[HANDBOOK]` assumiu `fn ≈ 0,006·D` a partir de **um** ponto de condição-base do MH (Ø25,4 mm) — extrapolação, não leitura. Quem leu a tabela multi-diâmetro vence. |
| **U-drill — valor** | **FAIXA — 0,05 a 0,15 mm/rot (aço)** | Os dois territórios pousam aqui: `[HANDBOOK]` 0,004–0,008·D (em Ø12 → 0,05–0,10); `[CATÁLOGO]` 0,05–0,15 chapado. Faixas sobrepostas. Ambos `REFERÊNCIA ÚNICA` (MH / ISCAR). |
| **Broca de centro / spot** | **LACUNA nos dois** | `[HANDBOOK]`: MH cobre a geometria normalizada, não o `fn`. `[CATÁLOGO]`: um único ponto fraco (GARANT 0,03 mm/rot, aço <900 N/mm², 90°, HSS-E, sem faixa). Nenhum tem tabela. Resultado mais honesto da questão. |
| **Escareador** | **VENCEU `[CATÁLOGO]`** | `[HANDBOOK]` = LACUNA. `[CATÁLOGO]` = tabela completa da Dormer por código × diâmetro × material; aço 1045 (grupo 1.3): `fn ≈ 0,12 mm/rot` em Ø16. Achado: escareador anda com `fn` **2–3× MENOR** que a broca do mesmo diâmetro. `REFERÊNCIA ÚNICA`. |
| **Alargador — razão contra a broca** | **VENCEU — 2 a 3× o `fn` da broca do mesmo diâmetro** | Convergência entre territórios: os dois dizem isso independentemente (MH Tabela 17 / Dormer p. 438). Alimentar a tela do alargador com a regra da broca subestima o avanço por 2–3×. |
| **Alargador — valor absoluto** | **FAIXA** | `[HANDBOOK]` ≈ 0,46–0,91 mm/rot em Ø20 (grupo de aço mais mole, extrapolado para 1045 — `LACUNA parcial` declarada). `[CATÁLOGO]` código C para 1045 ≈ 0,39 mm/rot em Ø20, tolerância `± 15%` declarada pela Dormer. Diâmetros e grupos não batem exatamente; faixa. |
| **Alargador — sobremetal de partida** | **`[HANDBOOK]` — `REFERÊNCIA ÚNICA`** | Só o `[HANDBOOK]` entrega: **0,40 mm no diâmetro (0,20 no raio)**, da nota da Tabela 17 do MH. Número que a tela do alargador precisa e a doc não tem. |

## 1.3 — Variação do `fn` com a relação profundidade/diâmetro

| Item | Veredito | Motivo |
|---|---|---|
| **Limiar de mudança de regime** | **VENCEU `[HANDBOOK]` — 3·D** | Duas fontes independentes no território (MH *Drilling Difficulties* + laboratório universitário). `[CATÁLOGO]` não refuta: o dado dele é sobre faixas mais profundas (15×D a 40×D). O 3·D marca a transição raso→profundo e sobrevive. |
| **Escada graduada por faixa de L/D (3D→5D→8D→12D)** | **LACUNA nos dois** | `[HANDBOOK]`: só tem o limiar binário + teto de redução. `[CATÁLOGO]`: fabricante troca a ferramenta e publica tabela nova, não um multiplicador; a maioria das folhas nem declara o comprimento da broca. Os dois nomeiam o outro território como quem teria o dado. |
| **Redução de avanço na SAÍDA do furo passante** | **VENCEU `[CATÁLOGO]` — achado novo** | Guhring: reduzir para **40%** ~1 mm antes do rompimento; CERATIZIT: reduzir **50%**. Dois fabricantes independentes, mesma regra. É instrução de ciclo, não número de partida, e é onde a broca lasca. O `[HANDBOOK]` não tem. Requisito de produto novo. |
| **Fator de redução no aço 1045, faixa profunda** | **`[CATÁLOGO]` — `REFERÊNCIA ÚNICA`** | Guhring: no aço beneficiável não ligado (família do 1045), **nenhuma redução de `fn` entre 15×D e 40×D**. O degrau grande é broca helicoidal → broca de canhão (`fn` cai ~10×). |

## 1.4 — Faixa de segurança em torno do `fn` de partida

| Item | Veredito | Motivo |
|---|---|---|
| **Largura da banda segura** | **VENCEU — larga, ~±25% a ~2×** | Convergência: `[CATÁLOGO]` (Dormer titula a própria tabela "± 25%"; máx/mín publicado 1,8–2,2× no mesmo diâmetro) e `[HANDBOOK]` (MH Tabela 22: troca avanço↔velocidade a vida constante dá fator ~2). **Um alerta a 1,3× do valor de partida grita em cima de metade da faixa que o fabricante publica.** |
| **Ótimo da troca avanço↔velocidade** | **`[HANDBOOK]` — `REFERÊNCIA ÚNICA`** | MH Tabela 22: abaixar o avanço tem retorno decrescente e depois negativo; o ótimo fica em avanço/ótimo ≈ 0,2. `[CATÁLOGO]` não tem essa curva. |
| **Modo de falha — avanço alto** | **VENCEU (convergente, qualitativo)** | Os dois nomeiam: rachadura de alma, lascamento de aresta, quebra por torção; e o desgaste **soma** ao torque (`[CATÁLOGO]`, Guhring: broca gasta puxa mais torque que broca nova nas mesmas condições). |
| **Modo de falha — avanço baixo (o piso)** | **LACUNA nos dois** | `[CATÁLOGO]`: nenhum catálogo publica limite inferior de avanço; publicam faixa mín–máx e param. `[HANDBOOK]`: quantifica a **consequência** via Kienzle (cortar o avanço pela metade → `+19%` na energia específica de corte) — mas isso é consequência derivada, não um piso publicado com modo de falha. Piso citável = LACUNA. |

---

# QUESTÃO 2 — Espessura de cavaco em furação (a entrada do Kienzle)

## 2.1 — A fórmula da espessura de cavaco não deformada

| Item | Veredito | Motivo |
|---|---|---|
| **A fórmula** | **VENCEU — `h = (fn / z) · sin κ`, `z = 2` na broca helicoidal** | **Convergência entre territórios, com verificação dos dois lados.** `[HANDBOOK]`: Sekulić et al. (TMT 2014), eqs. (2)(3), reproduzida por recomputação linha a linha da Tabela 1 do artigo (`b = 5,833 mm` devolve exatamente σ = 118°), erro de 4,71% contra medição. `[CATÁLOGO]`: Walter (compêndio B 9) e Sandvik publicam `h = fz · sin κ` no formulário de furação. Artigo revisado + dois formulários de fabricante grandes, territórios distintos, mesma fórmula. |
| **Símbolo do avanço** | resolvido | `fz = fn / 2` (dois gumes). Notação varia (`f`, `fn`, `fz`), o conteúdo não. |

## 2.2 — O ângulo de ponta entra como `κ`? Inteiro ou metade? *(a "questão central da rodada")*

| Item | Veredito | Motivo |
|---|---|---|
| **`κ = ângulo de ponta / 2`** | **VENCEU — METADE, confiança alta** | **Convergência: os dois derivam a mesma resposta por caminhos diferentes.** `[HANDBOOK]`: geometria — cada aresta faz `σ/2` com o eixo, e `κ` é o ângulo de **uma** aresta. `[CATÁLOGO]`: caso-limite da broca de ponta plana (180°), onde `h = fz` exige `sin κ = 1 → κ = 90° = 180°/2`, mais prova por absurdo do caminho errado (com `κ` inteiro, a broca mais chata daria cavaco mais fino — o inverso do real). Para 118°: `κ = 59°`, `sin κ = 0,857`. |
| **Tamanho do efeito** | **VENCEU — segunda ordem, os dois concordam** | Entre 118° e 140° (quase toda a prateleira), `sin κ` varia só de 0,857 a 0,940 — **10% em `h`**, que via `kc ∝ h^−mc` vira **~2–3% em `kc`, torque e potência**. **Não toca rotação nem avanço.** `[CATÁLOGO]` é direto: "importa muito menos do que o enunciado teme". `[HANDBOOK]` diz o mesmo com uma tabela (118°→140°: `kc` relativo −2,4%). **Resposta à questão central: `κ = σ/2`, e ligar o campo do ângulo de ponta ao motor muda `kc`/torque/potência em poucos por cento e nada mais.** |
| **A frase literal "κ = ponta ÷ 2"** | LACUNA nos dois | Nenhum dos dois territórios escreve a identificação em palavras — os dois derivam. Está em livro-texto de mecânica do corte, fora dos dois escopos. Não bloqueia: a derivação é sólida dos dois lados. |

## 2.3 — Essa espessura é a que entra no Kienzle?

| Item | Veredito | Motivo |
|---|---|---|
| **`h` da furação alimenta o Kienzle** | **VENCEU — sim, confiança alta** | Convergência: `[HANDBOOK]` (Sekulić aplica `Fv = kv1.1·b·h^(1−mv)`, erro 4,71%) e `[CATÁLOGO]` (Walter publica `kc = kc1.1/h^mc` **e** `h = fz·sin κ` na mesma folha, sem intermediário). |
| **Constante de torneamento vs constante de furação** | **`[HANDBOOK]` — `REFERÊNCIA ÚNICA`, questão aberta** | Só o `[HANDBOOK]` levanta: Sekulić afirma que usar `kc1.1/mc` de **torneamento** na furação é "only partially correct", e mede que **27% do torque de furação não é corte de aresta principal** (19% atrito de guia, 8% extrusão na aresta transversal). Constante de furação medida: `kv1.1 = 1639,05 N/mm²`, `1−mv = 0,75` — **um artigo, um material (aço C15), um diâmetro (10 mm)**. `[CATÁLOGO]` não refuta nem confirma: catálogo não discute a distinção, e a Walter remete os valores de `kc1.1/mc` à própria seção "General" que o pesquisador não abriu. **Não é LACUNA (há fonte), não é VENCEU (fonte única, silêncio do outro não é refutação): registrar como questão aberta para o canônico.** |
| **Força de avanço (thrust / `Ff`)** | **FAIXA / `SEM CONSENSO`** | `[HANDBOOK]`: `LACUNA parcial` — não fechou fórmula citável. `[CATÁLOGO]`: Sandvik `Ff ≈ 0,5·kc·(Dc/2)·fn·sin κr` (coeficiente efetivo ≈ 0,47) vs Walter `Ff = 0,63·(f·Dc·kc)/2`, **sem `sin κ`** — a Walter entrega 34% mais força. Forma `CONSENSO` (`Ff ∝ kc·D·fn`), coeficiente `SEM CONSENSO`: **`Ff ≈ (0,47–0,63)·kc·(D/2)·fn`**. Usar 0,63 (Walter, conservadora) para dimensionar fixação. |

## 2.4 — O limite `h < 0,1 mm` do Kienzle vale para furação? *(o item mais pesado da rodada)*

| Item | Veredito | Motivo |
|---|---|---|
| **`h < 0,1 mm` é a REGRA na furação, não a exceção** | **VENCEU — confiança alta, contraria a premissa do enunciado** | **Convergência forte entre territórios, com o mesmo número.** Os dois invertem a fórmula e chegam ao mesmo limiar: `fn ≈ 0,21–0,23 mm/rot` para `h` chegar a 0,1 mm (`[HANDBOOK]` 0,233 para 118°; `[CATÁLOGO]` 0,233 para 118°, 0,213 para 140°). Abaixo disso, `h < 0,1 mm`. **O enunciado perguntou "cai abaixo?" esperando caso de borda; a resposta é que o caso de borda é o outro — furo grande com broca cara.** |
| **O limiar NÃO depende do diâmetro** | **VENCEU `[CATÁLOGO]` — corrige um erro do `[HANDBOOK]`** | `h = (fn/2)·sin κ` não tem termo em `D`. Uma broca Ø3 e uma Ø30 no mesmo `fn` têm o mesmo `h`. O `[HANDBOOK]` acoplou o limiar ao diâmetro ("corresponde a broca de ~20 mm ou mais") — erro herdado da hipótese linear `fn = k·D` da Questão 1. `[CATÁLOGO]` desacopla corretamente. |
| **Quantas ferramentas do catálogo do produto operam abaixo** | **VENCEU `[CATÁLOGO]` — respondeu concretamente** | Cruzou os avanços de partida reais tabela por tabela: **toda broca de HSS-Co em aço abaixo de Ø25** (`h` = 0,036–0,08 mm, 20–60% do piso) · **broca de MD de uso geral até ~Ø20** (`h` ≈ 0,09–0,10) · **TODO o U-drill de insertos, qualquer diâmetro** (`h` = 0,02–0,07, 3–5× abaixo) · **todo aço temperado 55–60 HRC e toda superliga** (`h` ≈ 0,02). Só escapa a broca de MD de alto desempenho de Ø10 para cima, na metade superior da faixa de avanço. `[HANDBOOK]`: "toda furação de oficina até Ø15 mm" — mesma direção, menos granular. |
| **Erro que o modelo comete abaixo de 0,1 mm** | **VENCEU (convergente, quantificado)** | Extrapolar `kc = kc1.1·h^−mc` de `h = 0,1` para `h = 0,05` faz `kc` subir por `2^mc`: **+19%** (`mc` 0,25) a **+23%** (`mc` 0,30) — e isso **se a lei de potência ainda valesse**; o `kc` real sobe mais. O modelo **subestima** força, torque e potência onde a maioria das brocas de oficina trabalha. |
| **Resolução: mexer na constante ou no alerta?** | **`[HANDBOOK]` — `REFERÊNCIA ÚNICA` na parte experimental; convergência no alerta** | **Alerta:** os dois convergem — o alerta de "`h` abaixo do limite" **NÃO pode disparar em furação** (dispararia em ~100% dos furos, vira ruído). **Constante:** só o `[HANDBOOK]` tem evidência de saída — Sekulić ajustou Kienzle **inteiramente dentro da faixa proibida** (`h` de 0,024 a 0,077 mm) com erro médio 4,71%; logo o `h < 0,1` é limite do **par de constantes**, não do modelo. Mas isso é **C15, D10, um artigo** — e não existe par de constantes de furação para 1045, inox, alumínio, FoFo (L-C). **Direção, não solução.** |

## 2.5 — Torque e potência em furação

| Item | Veredito | Motivo |
|---|---|---|
| **`Mc = kc·fn·D²/8` · `Pc [kW] = kc·fn·D·vc/240000`** | **VENCEU — confiança MAIS ALTA da rodada** | **Três fontes independentes, dois territórios, álgebra verificada pelos dois lados.** `[HANDBOOK]`: derivada das eqs. de Sekulić. `[CATÁLOGO]`: `Mc = Dc²·kc·f/8000` (Walter) sai de `Pc = vc·Dc·fn·kc/240000` (Sandvik) por substituição direta, coeficiente bate em 1/8000 — refeito pelo pesquisador. `Q`, `Pc` e `Mc` são a mesma coisa escrita de dois jeitos. **É o candidato a canônico sem ressalva desta rodada.** |
| **O braço da força / a constante** | **`[HANDBOOK]` — `REFERÊNCIA ÚNICA`, nota para o canônico** | A fórmula usa o braço `D/4` (hipótese "resultante no raio médio"). Sekulić **mediu** o braço real em `xv = 0,443·D` (fator 1,77 contra `0,25·D`). A fórmula é a forma certa; se alimentada por `kc` de aresta principal pura, **subestima** o torque. O `kv1.1 = 1639,05` do artigo é o valor que fecha contra a força medida — **não é intercambiável com `kc1.1` de tabela de torneamento** (mesma questão aberta da 2.3). |
| **Força de avanço** | FAIXA — ver 2.3 | |

---

# QUESTÃO 3 — Velocidade de corte no roscamento com macho

## 3.1 — `vc` do macho de corte, e a magnitude do defeito dos 140 m/min *(ponto de atenção do Skinner)*

| Item | Veredito | Motivo |
|---|---|---|
| **`vc` de macho de corte HSS em aço 1045** | **VENCEU `[CATÁLOGO]` — 10 a 18 m/min (partida ~14)** | `[CATÁLOGO]` tem **leitura direta de tabela para o material** (Dormer, grupo 1.3 = "1030–1060", que inclui o 1045: 15,8 canal reto / 18,0 ponta helicoidal) **mais uma segunda fonte independente** (Viking Drill: 10,7). Duas fontes, dispersão 1,7×. `[HANDBOOK]` entrega **43,8 m/min**, mas é **fonte única (MH)** e **extrapolação de material vizinho** (aço liga 175–225 HB) — a coluna "Threading HSS" do MH **não tem linha para o grupo do 1045**, e o próprio `[HANDBOOK]` chama seu número de "estimativa por vizinhança, não leitura de tabela". Evidência melhor vence. |
| **Magnitude do defeito** | **VENCEU `[CATÁLOGO]` — ~8×, não 3–5×** | Consequência do item acima: 140 m/min contra 15,8–18,0 é **fator ~8**. O mecanismo é reprodutível: `18 × 8 ≈ 144` — o produto trocou "velocidade de macho HSS" por "velocidade de fresamento de MD" e chamou de fator de substrato. O `[HANDBOOK]` calcula 3,2–4,7× porque parte do seu 43,8 inflado. |
| **Divergência a registrar** | — | A coluna "Threading HSS" do Machinery's Handbook roda **~2× acima** das tabelas de fabricante para aço (ex.: aço 1005–1025 → MH 42–56 m/min, Dormer 20–22). Onde os dois territórios têm o mesmo material fora do aço (ferro fundido GG25: `[HANDBOOK]` CONEM 30 + MH ~25; `[CATÁLOGO]` Dormer 29,9) eles **convergem** — é a coluna de rosqueamento do MH que é o ponto fora da curva. |
| **`vc` de macho de METAL DURO em aço** | **LACUNA nos dois** | `[HANDBOOK]`: a coluna de rosqueamento do MH é exclusivamente HSS. `[CATÁLOGO]`: Dormer identifica a coluna por ícone, não por texto; não atribui número a substrato por dedução. Os dois observam: macho de MD é aplicado **principalmente em ferro fundido** (30–60 m/min), e **em aço praticamente não existe como produto de prateleira**. |
| **`vc` de macho de corte por material (tabela geral)** | `[CATÁLOGO]` — `REFERÊNCIA ÚNICA` útil | Dormer entrega a tabela AMG completa (três geometrias de macho × ~24 grupos de material). Ordem de grandeza a gravar: **macho de corte HSS em aço ISO P é ferramenta de 4 a 25 m/min**; teto de toda a tabela (alumínio 6061) é 35 m/min. |

## 3.2 — Macho de conformação

| Item | Veredito | Motivo |
|---|---|---|
| **`vc` por material** | **VENCEU `[CATÁLOGO]` — ~45 m/min em aço 1045** | `[HANDBOOK]` = LACUNA (só achou número de fonte de catálogo e recusou "lavar a procedência"). `[CATÁLOGO]` = Dormer *Thread Forming Taps* p. 196, leitura direta: grupo 1.3 = 45,1 m/min (estilos E029/E039) / 22,9 (E064/E074). `REFERÊNCIA ÚNICA`, mas é tabela de verdade. |
| **Direção: conformação é mais rápida ou mais lenta que corte?** | **VENCEU `[CATÁLOGO]` — 2,5 a 3× MAIS RÁPIDA** | Contradição direta entre os retornos. `[HANDBOOK]` tem razão 0,47 (conformação **mais lenta**) — mas de **rosca externa por laminação com três rolos em torno**, Ti-6Al-4V, e o próprio `[HANDBOOK]` diz "NÃO usar como valor de partida, cinemática parente, não igual". `[CATÁLOGO]` tem 45,1 vs 15,8–18,0 no mesmo catálogo, mesmo material, macho contra macho. O mecanismo confirma o `[CATÁLOGO]`: conformação não gera cavaco, não tem gargalo de evacuação, aceita mais velocidade. |
| **Materiais contraindicados** | **VENCEU `[CATÁLOGO]` na lista; mecanismo convergente** | `[HANDBOOK]` = LACUNA no número (limiar ~8% alongamento / ~30 HRC só em catálogo), mecanismo declarado (precisa escoar plasticamente; frágil trinca). `[CATÁLOGO]` = a tabela da Dormer deixa **em branco** todo o ferro fundido, aço >350 HB, aço temperado 49–63 HRC, inox PH e Ti-6Al-4V — "a ausência é a recomendação". `REFERÊNCIA ÚNICA`, mas concreta, e o mecanismo (precisa de fluxo plástico) é dito pelos dois. |
| **Recomendação de produto** | `[CATÁLOGO]` | **Bloquear** (não só desaconselhar) o macho de conformação para ferro fundido, aço >350 HB e aço temperado. É a única família da rodada em que o material **elimina** a ferramenta — macho quebra dentro da peça, peça vira sucata. |

## 3.3 — A `vc` de roscamento se deriva da de fresamento? *(a pergunta que decide o desenho)*

| Item | Veredito | Motivo |
|---|---|---|
| **Existe fator de família?** | **VENCEU — NÃO, confiança alta** | **Convergência total entre territórios, por caminhos independentes.** `[HANDBOOK]`: MH tem coluna de rosqueamento preenchida independentemente, sem nenhum fator; a razão `vc`-rosca/`vc`-furação no mesmo material vai de **0,64 a 2,13** (fator 3,3), e a `vc` de rosca depende do **passo** (+28% grosso→fino), que não é entrada de nenhuma tabela de fresamento. `[CATÁLOGO]`: a Dormer publica **uma tabela AMG separada para cada família de ferramenta** — se existisse um fator, teria uma tabela e um multiplicador. |
| **O que o produto precisa** | resolvido | **Tabela própria do macho, indexada por material × passo.** Não é preferência de arquitetura — é o que os dados obrigam. |
| **Fresa de rosca** | resolvido (convergente) | Os dois observam: a fresa de rosca **é** fresamento — usa a `vc` de fresamento do material. A família "roscar" do produto tem **duas cinemáticas com origens de dado opostas**: macho puxa de tabela própria, fresa de rosca puxa da tabela de fresamento. |
| **O alerta que falta** | `[CATÁLOGO]` | Não é de afastamento relativo — é **teto absoluto**. `[CATÁLOGO]` propõe recusa (não alerta) acima de ~40 m/min para macho de corte / ~60 para conformação. Nenhum valor de catálogo de macho de corte passa de 35 m/min. |

## 3.4 — Limite de rotação por razões que não são de corte

| Item | Veredito | Motivo |
|---|---|---|
| **Existe teto de hardware abaixo do teto de corte?** | **VENCEU — sim, ~2.500–2.700 rpm** | **Convergência entre territórios, com números quase idênticos.** `[HANDBOOK]`: cabeçote de roscar auto-reversível Tapmatic RDTIC-50, **máx. 2.500 rpm** (até M12) — num ensaio em que o eixo-árvore ia a 7.500 rpm. `[CATÁLOGO]`: EMUGE declara que em ciclo síncrono o eixo-árvore **não alcança a rotação programada** acima de ~2.700 rpm, e vende engrenagem 1:4,412 para contornar. Dois dispositivos de fabricantes distintos, dois territórios, mesmo patamar. |
| **Teto por sincronismo eletrônico do eixo-árvore (rigid tapping)** | **LACUNA nos dois** | Os dois só acharam patente de fabricante de CNC (`[HANDBOOK]`) ou o limite de um porta-ferramenta específico (`[CATÁLOGO]`). O número geral está em manual de comando (Fanuc/Siemens/Brother) — fora dos dois territórios. |
| **Fatores qualitativos que baixam a rotação** | `[HANDBOOK]` — `REFERÊNCIA ÚNICA` | MH p. 1042–1043: % de filete cheio (**quantificado:** torque de 100% é >2× o de 50%), comprimento roscado, capacidade de sincronismo/reversão, passo, tipo de chanfro, perfil de rosca, precisão, fluido ("very great"). |
| **Onde a rotação extra para de comprar tempo** | `[CATÁLOGO]` — `REFERÊNCIA ÚNICA` | EMUGE: o ganho de ciclo **para de crescer** entre 10.000 e 11.912 rpm (−39% vira −37%) — acima de ~10.000 rpm o ciclo passa a ser dominado por aceleração, desaceleração e inversão. |

## 3.5 — `vf = P × n` está travado?

| Item | Veredito | Motivo |
|---|---|---|
| **A igualdade e o campo somente leitura** | **VENCEU — travado, confiança alta** | Convergência: `[HANDBOOK]` (MH: "feed = lead = pitch"; "diferentemente de qualquer outra ferramenta de corte, o avanço do macho não pode ser ajustado de forma independente") e `[CATÁLOGO]` (Sandvik e Viking publicam o avanço do macho como fórmula do passo, não como valor tabelado). **O campo de avanço na tela de roscamento deve ser calculado e somente leitura.** |
| **Correção de prática que "quebra" a igualdade** | **VENCEU — nenhuma; são folga MECÂNICA** | Os dois: macho flutuante, roscamento rígido e alívio de passo **não** alteram `vf`; são folga axial (`± 0,5 mm`, EMUGE) para absorver o erro de quem comanda o avanço. Texto de interface, não dado. |
| **`lead` vs `pitch`** | **`[HANDBOOK]` — `REFERÊNCIA ÚNICA`, correção importante** | Só o `[HANDBOOK]` pega: a igualdade é com o **lead** (passo helicoidal), não com o **pitch**. Em rosca de uma entrada coincidem; em rosca de **múltiplas entradas**, `vf = P × nº de entradas × n`. Se o produto expuser rosca de duas entradas, `vf = P × n` erra por fator igual ao número de entradas. |
| **Modo de falha da execução** | `[CATÁLOGO]` — `REFERÊNCIA ÚNICA` | Mandril rígido sem compensação → erro de sincronismo vira força axial no macho, com pico **no ponto de inversão da rotação na saída** — é onde o macho quebra. Vale um alerta de tela. |

---

# QUESTÃO 4 — Taxa de remoção de material em mandrilamento

## 4.1 — A fórmula

| Item | Veredito | Motivo |
|---|---|---|
| **`Q [cm³/min] = π · (D_final² − D_inicial²) · fn · n / 4000`** | **VENCEU — confiança MAIS ALTA da rodada, junto com a de torque de furação** | **Um território deriva, o outro acha publicada e verifica.** `[HANDBOOK]`: forma do anel exato, construção geométrica sem aproximação. `[CATÁLOGO]`: **Walter, compêndio p. B 96** publica literalmente `Q = vf·π·(Dc² − Dp²)/(4×1000)`, e a forma equivalente `Q = vc·ap·fn·(1 − ap/Dc)` sai das definições da Sandvik. Fórmula literal `REFERÊNCIA ÚNICA` (só a Walter), resultado `CONSENSO`. |
| **A armadilha da fórmula ingênua** | **VENCEU (convergente) — não usar `Q = vc·D·fn/4`** | Os dois pegam, independentemente, que a forma `Q = vc·fn·ap` só fecha com o **diâmetro médio** no `vc`. Usar o diâmetro final superestima: `[HANDBOOK]` quantifica **+2% (acabamento) a +43% (Ø20→Ø50)** — estoura sozinho a margem de ±15–25%. `[CATÁLOGO]` vai além: **a folha H 83 da Sandvik (*boring*) publica `Q = vc·Dc·fn/4` — a fórmula da FURAÇÃO** (furo cheio, ignora o furo de partida); erro de **5,8× (Ø40→Ø44)** a **23× (Ø40→Ø41)**. Reaproveitamento de página (a mesma folha chama `Dc` de "Drill diameter"). **Não copiar da folha de mandrilamento da Sandvik.** |
| **O termo de correção `(1 − ap/Dc)`** | `[CATÁLOGO]` — a mais completa | `[HANDBOOK]` diz "igual a torneamento, sem correção". `[CATÁLOGO]` mostra que há **um** termo novo — `(1 − ap/Dc)` — que a Sandvik publica na potência do mandrilamento. Importa no desbaste (Ø40→Ø60: fator 0,83, 17% a menos de potência), desprezível no acabamento. Não é conflito — o `[CATÁLOGO]` é mais preciso. |

## 4.2 — Mandrilamento = torneamento interno?

| Item | Veredito | Motivo |
|---|---|---|
| **Sim, explicitamente** | **VENCEU — confiança alta** | Convergência: `[HANDBOOK]` (MH Tabela 29 tem três linhas e nenhuma de mandrilamento; cai em "Single-Point Tools — Turning, Planing, Shaping") e `[CATÁLOGO]` (ISCAR publica furação / **"Turning & Boring"** / grooving como colunas — torneamento e mandrilamento **dividem uma coluna só**; Walter usa a cadeia de torneamento na folha de mandrilamento). |
| **A adaptação** | resolvido (`[CATÁLOGO]` mais completo) | `ap = (D_final − D_inicial)/2` · `Dc` = diâmetro **final** para `vc` · `fn = fz·z` (`z = 1` em mandrilamento por passos, Sandvik) · `Q = vc·ap·fn·(1 − ap/Dc)`. O único termo novo em relação ao torneamento é `(1 − ap/Dc)`. |
| **Dado de corte de mandrilamento** | `[CATÁLOGO]` — `REFERÊNCIA ÚNICA` | ISCAR, coluna Turning & Boring, aço 1045: `vc` 90–200 m/min, `fn` 0,04–0,12 mm/rot. **O avanço de mandrilamento é muito mais estreito que o de furação** (0,04–0,25 em toda a tabela, contra 0,05–0,87). A tela de mandrilar não deveria oferecer a mesma amplitude de avanço que a de furar. |

## 4.3 — `ap = (D_final − D_inicial)/2` está correto?

| Item | Veredito | Motivo |
|---|---|---|
| **Confirmado — `ap` no raio, `(D_final − D_inicial)/2`** | **VENCEU — confiança alta, nenhuma convenção divergente na fonte** | Convergência: `[CATÁLOGO]` (Sandvik define `ap` como "diferença entre o raio do furo antes e depois"; Walter usa `(Dc − Dp)/2` na posição do `ap`) e `[HANDBOOK]` (mesma convenção do torneamento). O respaldo do `[CATÁLOGO]` aqui é **mais concreto** — o do `[HANDBOOK]` seria a ABNT NBR 6162, que ele **não conseguiu abrir** e que **consta como cancelada** (ver conserto de documento). |
| **Convenção divergente** | **as duas apurações apontam armadilhas diferentes e compatíveis** | `[HANDBOOK]`: o anel de ajuste do cabeçote de mandrilar é graduado **em diâmetro** — quem digitar o número lido no anel entrega **o dobro** do `ap` (erro de fator 2). `[CATÁLOGO]`: não há convenção divergente no `ap`; a armadilha real é **qual diâmetro alimenta `vc`** (inicial/final/médio), e o risco de **aplicar a correção `(1 − ap/Dc)` duas vezes** se o `vc` já usar diâmetro médio. |
| **Decisão de produto** | **VENCEU (convergente)** | A tela de mandrilar pede **os dois diâmetros**, nunca `ap` digitado. `[HANDBOOK]` diz explícito; `[CATÁLOGO]` chega pelo mesmo lugar (entrada de dois diâmetros da ISCAR). |

---

# FECHAMENTO — as três listas

## Resolvido com confiança alta (convergência entre territórios)

1. **`h = (fn/2)·sin κ`** na furação, `κ` = metade do ângulo de ponta. *(Q2.1, Q2.2)*
2. **O campo do ângulo de ponta alimenta `kc`, torque e potência em ~2–3% e nada mais** — é correção
   de segunda ordem, não destravamento. *(Q2.2 — resposta à "questão central")*
3. **`Mc = kc·fn·D²/8` · `Pc [kW] = kc·fn·D·vc/240000`** — cadeia de torque e potência de furação.
   Três fontes, dois territórios, álgebra verificada dos dois lados. *(Q2.5)*
4. **`Q [cm³/min] = π·(D_final² − D_inicial²)·fn·n/4000`** — taxa de remoção em mandrilamento (forma do
   anel exato); a Walter publica idêntica. *(Q4.1)*
5. **`h < 0,1 mm` é o regime NORMAL da furação de oficina, não a exceção** — limiar `fn ≈ 0,21 mm/rot`,
   **independente do diâmetro**. O alerta de "`h` abaixo do limite" **não pode disparar em furação**.
   *(Q2.4)*
6. **A `vc` do macho é tabela própria, indexada por material × passo — NUNCA derivada de fresamento
   nem por fator de substrato.** Fresa de rosca é exceção: usa a `vc` de fresamento. *(Q3.3 — a
   pergunta que decide o desenho)*
7. **`vc` de macho de corte HSS em aço 1045 = 10 a 18 m/min** (partida ~14). O defeito dos 140 m/min é
   de **~8×**. *(Q3.1)*
8. **`vf = P × n` é travado; o campo de avanço do roscamento é somente leitura.** Para rosca de
   múltiplas entradas: `vf = P × nº de entradas × n` (é o *lead*, não o *pitch*). *(Q3.5)*
9. **`ap` de mandrilamento é derivado, `(D_final − D_inicial)/2`, no raio.** A tela pede os dois
   diâmetros, nunca `ap` digitado. *(Q4.3)*
10. **Mandrilamento é torneamento interno** — sem fórmula própria; o único termo novo é
    `(1 − ap/Dc)` na potência. *(Q4.2)*
11. **Teto de rotação de hardware no roscamento ≈ 2.500–2.700 rpm**, abaixo do que o corte
    permitiria. *(Q3.4)*
12. **`fn` de partida na furação cresce SUBLINEARMENTE com o diâmetro — não linear.** *(Q1.1)*
13. **Alargador: `fn` ≈ 2–3× o da broca do mesmo diâmetro. Escareador: 2–3× menos.** *(Q1.2)*
14. **Faixa de segurança do `fn` é larga (~±25% a ~2×)** — um alerta a 1,3× do valor de partida está
    errado. *(Q1.4)*
15. **Macho de conformação roda ~2,5–3× mais rápido que o de corte** (~45 m/min em 1045), e o
    material pode **eliminar** a ferramenta (ferro fundido, aço >350 HB, aço temperado). *(Q3.2)*

## Ficou como FAIXA (divergência real, sem vencedor)

1. **Expoente da lei do `fn` na furação:** `fn ≈ k·D^a`, `a` ∈ **[0,5 ; 0,8]**. `[CATÁLOGO]` ajustou
   0,55 sobre 4 catálogos; `[HANDBOOK]` tem dado que implica ~0,8 mas não ajustou. Ponto de partida
   utilizável: `fn ≈ 0,08·√D` (MD, aço ISO P), derivado, marcar como tal. *(Q1.1)*
2. **`fn` de partida do U-drill em aço:** **0,05 a 0,15 mm/rot** — e **não escala com o diâmetro**
   (isto o `[CATÁLOGO]` venceu). *(Q1.2)*
3. **`fn` absoluto do alargador para o 1045:** ~0,3 a 0,9 mm/rot em Ø20, conforme a fonte e o grupo
   de material. *(Q1.2)*
4. **Coeficiente da força de avanço (thrust) na furação:** `Ff ≈ (0,47–0,63)·kc·(D/2)·fn`. Forma
   `CONSENSO`, coeficiente `SEM CONSENSO` (Sandvik 0,47 vs Walter 0,63). *(Q2.3, Q2.5)*

## Continua LACUNA depois das duas apurações

- **L-A — `fn` de partida de broca helicoidal inteiriça de MD, valor absoluto por material.**
  `[HANDBOOK]` não separa substrato; `[CATÁLOGO]` tem, mas `SEM CONSENSO` interno (classe da broca
  muda por 2,7×). O `√D` do `[CATÁLOGO]` é a melhor aproximação, derivada.
- **L-B — `fn` de partida de broca de centro / spot drill.** Um ponto isolado no `[CATÁLOGO]`
  (GARANT 0,03 mm/rot), nada no `[HANDBOOK]`. Sem tabela em nenhum dos dois.
- **L-C — par `kc1.1 / mc` específico de FURAÇÃO** para os materiais do produto (1045, inox, alumínio,
  ferro fundido). Só existe um par medido, e para aço C15 (`kv1.1 = 1639,05`; `1−mv = 0,75`). A
  Walter usa `kc1.1/mc` mas remete a valores num volume que o pesquisador não abriu — **pendência de
  fonte recuperável**, não lacuna de território.
- **L-D — escada graduada de redução de `fn` por faixa de L/D** (3D→5D→8D→12D como multiplicador).
  Nenhum dos dois territórios tem; os dois nomeiam o outro. Os dois **têm** o limiar 3·D e a redução
  de 40–50% na saída do furo passante.
- **L-E — teto de rotação de roscamento por sincronismo eletrônico do eixo-árvore** (rigid tapping),
  e o erro de sincronismo tolerável em grau ou mm/rot. Está em manual de comando (Fanuc/Siemens/
  Brother), fora dos dois territórios. Os dois **têm** o teto de hardware (~2.500–2.700 rpm).
- **L-F — `vc` de macho de METAL DURO em aço.** Os dois territórios convergem em que essa ferramenta
  **quase não existe como produto** — o macho de MD é de ferro fundido. Provável decisão de produto:
  não oferecer.

---

# O QUE MUDA NO PRODUTO

## Conserto de MOTOR DE CÁLCULO

| # | Mudança | Base |
|---|---|---|
| M1 | **Espessura de cavaco em furação:** implementar `h = (fn / z)·sin(σ/2)`, `z = 2` na broca helicoidal, `σ` = ângulo de ponta. O campo do ângulo de ponta passa a alimentar `h → kc → Pc, Mc` (efeito de 2ª ordem, ~2–7%). | VENCEU cross-território (Q2.1, Q2.2) |
| M2 | **Torque e potência em furação:** `Mc = kc·fn·D²/8` [N·mm] · `Pc [kW] = kc·fn·D·vc/240000`. Item mais sólido da rodada. | VENCEU, 3 fontes / 2 territórios (Q2.5) |
| M3 | **MRR de mandrilamento:** `Q [cm³/min] = π·(D_final² − D_inicial²)·fn·n/4000` (anel exato). **Não** usar `Q = vc·D·fn/4` (superestima até 23×). | VENCEU cross-território (Q4.1) |
| M4 | **`vc` para vida de ferramenta no mandrilamento:** calcular no diâmetro **final**. Se aplicar `(1 − ap/Dc)` na potência, não usar diâmetro médio no `vc` (correção dupla). | `[CATÁLOGO]` (Q4.3) |
| M5 | **Alerta `h < 0,1 mm`: desligar em furação.** Dispararia em ~100% dos furos de oficina. O limiar é `fn ≈ 0,21 mm/rot`, independente do diâmetro. O que fazer abaixo dele com a força de corte continua em aberto (L-C). | VENCEU cross-território (Q2.4) |
| M6 | **`vc` de macho: nunca derivar de fresamento nem aplicar fator de substrato.** Tabela própria, indexada por **material × passo**. Substituir o alerta de afastamento relativo por **teto absoluto** (recusa acima de ~40 m/min para macho de corte). | VENCEU cross-território (Q3.3) |
| M7 | **`vc` de macho de corte HSS em aço 1045 = 10–18 m/min** (partida ~14). Corrige o defeito de ~8×. | VENCEU `[CATÁLOGO]` (Q3.1) |
| M8 | **`vc` de macho de conformação ≈ 2,5–3× o de corte** (~45 m/min em 1045). | `[CATÁLOGO]` (Q3.2) |
| M9 | **Bloquear** (não só alertar) macho de conformação para ferro fundido, aço >350 HB, aço temperado, inox PH, Ti-6Al-4V. | `[CATÁLOGO]` (Q3.2) |
| M10 | **`vf` de roscamento:** `vf = P × n` travado, campo somente leitura. Rosca de múltiplas entradas: `vf = P × nº de entradas × n`. | VENCEU cross-território (Q3.5) |
| M11 | **`ap` de mandrilamento:** derivado, `(D_final − D_inicial)/2`. A tela pede os **dois diâmetros**, nunca `ap` digitado (erro de fator 2). | VENCEU cross-território (Q4.3) |
| M12 | **`fn` de partida na furação: sublinear, não linear.** `fn ≈ 0,08·√D` (MD, aço ISO P), faixa `0,06·√D` a `0,16·√D`. Marcar como derivado. | FAIXA — sublinearidade é VENCEU (Q1.1) |
| M13 | **U-drill: `fn` não escala com o diâmetro** — valor por grupo de material, 0,05–0,15 mm/rot em aço. | VENCEU `[CATÁLOGO]` (Q1.2) |
| M14 | **Alargador:** `fn` ≈ 2–3× o da broca do mesmo diâmetro; sobremetal de partida ≈ 0,40 mm no diâmetro. **Escareador:** `fn` ≈ 2–3× **menor** que a broca. | ratio VENCEU cross-território; sobremetal `[HANDBOOK]` (Q1.2) |
| M15 | **Redução de avanço na saída de furo passante:** 40–50% ~1 mm antes do rompimento. Instrução de ciclo / alerta novo. | `[CATÁLOGO]`, 2 fabricantes (Q1.3) |
| M16 | **Faixa de segurança do `fn`:** ±25% é tolerância do ponto de partida (não alertar); até ~2× é otimização legítima. Alerta só acima de ~2× ou abaixo de ~0,5×. | VENCEU cross-território (Q1.4) |
| M17 | **Broca de MD: distinguir classe** (uso geral vs alto desempenho / refrigeração interna) — a de alto desempenho aceita 1,3–2,7× mais avanço. Um seletor único "MD vs HSS-Co" erra até 2,7× dentro do MD. | `[CATÁLOGO]`, `REFERÊNCIA ÚNICA` (Q1.1) |
| M18 | **Força de avanço (thrust):** `Ff ≈ (0,47–0,63)·kc·(D/2)·fn`. Declarar o coeficiente usado (0,63 para dimensionar fixação). | FAIXA (Q2.3) |

## Conserto de DOCUMENTO

| # | Mudança | Base |
|---|---|---|
| D1 | A "contradição tabela vs fórmula" do `fn` no documento do produto **é falsa** — as duas descrevem a mesma coisa (a tabela É uma regra). O documento deve dizer: regra **sublinear** em `D`. | os dois retornos convergem no diagnóstico |
| D2 | **Furação não tem penetração de trabalho radial** — a fórmula de `h` de fresamento (`ae/D`, `hm` integrado) não se aplica. Documentar a troca para `h = (fn/2)·sin κ`. | Q2.1 |
| D3 | Registrar que a família **"roscar" tem duas cinemáticas com origens de dado opostas**: macho (tabela própria, material × passo) e fresa de rosca (tabela de fresamento). | Q3.3 |
| D4 | **Não citar a ABNT NBR 6162 como autoridade viva** para `ap` de mandrilamento — ela consta como **cancelada** e o `[HANDBOOK]` não teve acesso ao texto. Usar a definição da Sandvik / Walter (`ap` = diferença de raios). | Q4.3 |
| D5 | **Divergência a registrar no confronto:** a coluna "Threading — HSS" do Machinery's Handbook roda ~2× acima das tabelas de fabricante para aço. Se algum documento futuro citar dado de rosqueamento do MH, saber que é alto vs prática de catálogo. Fora do aço (ferro fundido) os territórios convergem. | Q3.1 |
| D6 | **Questão aberta para o canônico (não resolvida nesta rodada):** o `kc1.1/mc` da furação deve ser o de torneamento (prática majoritária, "parcialmente incorreta" segundo Sekulić) ou um par medido em furação? Sekulić mede que 27% do torque de furação não é corte de aresta principal e que o braço real é `0,443·D`, não `0,25·D` — mas é um artigo, aço C15, Ø10. Registrar; decidir quando houver `kc1.1/mc` de furação para os materiais do produto (L-C). | `[HANDBOOK]`, `REFERÊNCIA ÚNICA` (Q2.3, Q2.5) |
| D7 | **Avisos de implementação, para quem escrever o motor a partir das fontes:** (a) a folha H 83 da Sandvik (*boring*) publica a fórmula de MRR da **furação** — não copiar de lá; (b) a p. B 96 da Walter tem duas erratas (legenda "drilling from solid" numa página de mandrilamento; `Mc = Pc·9500/η` deve ser `/n`). | `[CATÁLOGO]` (Q4.1) |

---

## Nota de método

Os dois retornos foram lidos na íntegra. As fórmulas de fechamento (M1, M2, M3, M4, M10, M11) foram
reconferidas por álgebra durante o julgamento — a cadeia potência/torque de furação e a MRR do anel
fecham exato entre os dois territórios. Os números da Questão 3.1 (43,8 vs 15,8–18,0 m/min) foram
cruzados contra as tabelas de origem de cada retorno: o 43,8 do `[HANDBOOK]` é extrapolação de linha
vizinha do MH (o próprio retorno declara), o 15,8–18,0 do `[CATÁLOGO]` é leitura direta da linha
"1030–1060" da Dormer mais um segundo catálogo (Viking). O `_procedencia/MAPA_R8.md` não foi aberto.

**Este documento é veredito, não canônico.** A escrita do `CANONICO_*` a partir daqui é do Ícaro.
