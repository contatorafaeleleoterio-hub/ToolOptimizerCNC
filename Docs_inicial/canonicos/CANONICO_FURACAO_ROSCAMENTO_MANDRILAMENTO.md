# Canônico — Furação, Roscamento e Mandrilamento

> **Nomenclatura (27/08/2026).** Nos textos de produto o nome da indústria vem primeiro e o símbolo entre parênteses — `fn` = "avanço por rotação (fn)", `vc` = "velocidade de corte (vc)", `vf` = "velocidade de avanço (vf)", `h` = "espessura de cavaco (h)", `σ` = "ângulo de ponta (σ)", `κ` = "ângulo de posição (κ)", `P` = "passo da rosca (P)", `Ff` = "força de avanço (Ff)", `Q` = "taxa de remoção de material (MRR)". Ver o glossário de termos do projeto. Este canônico é fonte técnica: fórmulas e tabelas mantêm o símbolo. Os símbolos desta rodada foram integrados ao glossário pela emenda B6 — ver §6 e `Docs_inicial/referencia/GLOSSARIO_DE_TERMOS.md`.

**Status:** fonte única de verdade sobre espessura de cavaco, avanço, velocidade de corte, torque, potência, força de avanço e taxa de remoção nas famílias **furar**, **roscar** e **mandrilar**.

**Relação com os seis canônicos anteriores:** eles são de **fresamento com fresa inteiriça de metal duro** — o canônico do motor de cálculo declara esse escopo no próprio Status. Este documento **não os contradiz**: cobre as três famílias que eles não cobrem. Onde a regra é a mesma, este documento aponta para lá em vez de repetir; onde a cinemática é outra, ele diz qual é e por quê. **Nada aqui altera fresamento.**

**Precedência:** este documento vence, **nas famílias furar, roscar e mandrilar**, qualquer regra anterior do projeto ou do sistema anterior que conflite com ele, e nominalmente:

1. **A velocidade de corte do macho obtida por fator de substrato sobre a velocidade de fresamento** — o valor de ~140 m/min do sistema anterior, que é a velocidade de fresamento de metal duro rotulada como velocidade de macho. Erro de fator ~8 (§1.8, §2.2).
2. **A fórmula de espessura de cavaco de fresamento aplicada à furação** — qualquer forma que dependa da penetração de trabalho (`ae/D`) ou da espessura média integrada (`hm`). Furação não tem penetração de trabalho radial (§1.1).
3. **O alerta de espessura de cavaco abaixo do limite do modelo, quando aplicado à furação** — o regime `h < 0,1 mm` é o normal da furação, não a exceção (§1.2, §6).
4. **A taxa de remoção de mandrilamento calculada pela fórmula da furação** (`Q = vc·D·fn/4`) — superestima até 23× (§1.12).
5. **O avanço por rotação de partida proporcional ao diâmetro** (`fn = k·D`) — a lei é sublinear (§1.5).
6. **O alerta de avanço a 1,3× do valor de partida** — a faixa que o fabricante publica é mais larga que isso (§1.6).
7. **A profundidade de corte de mandrilamento digitada diretamente** — é grandeza derivada dos dois diâmetros; digitada, entra com erro de fator 2 (§1.11).
8. **O alerta de afastamento relativo da velocidade de corte, quando aplicado ao roscamento** — no macho a régua é teto absoluto, não distância percentual até um valor de partida (§1.8, §6).

**Origem:** rodada de pesquisa R8 — furação, roscamento e mandrilamento —, par cego de dois territórios que não se tocam (norma e handbook de um lado, catálogo de fabricante do outro), retornos e julgamento de 03/09/2026. Veredito: **APROVADO**. Os territórios são chamados aqui de `[HANDBOOK]` e `[CATÁLOGO]`, rótulo de origem e não de hierarquia — nenhum venceu o outro por prestígio.

**Regra:** No Invention — nenhuma fórmula, constante de cálculo ou limiar derivado de constante física entra sem fonte citada. Onde os dois territórios divergiram e nenhum tinha evidência melhor, o resultado é **faixa** ou **lacuna**, nunca um terceiro número.

---

## 1. Regras e fórmulas

As três famílias não compartilham cinemática. Furação corta com duas arestas que avançam pelo eixo, sem penetração de trabalho radial; roscamento tem o avanço amarrado ao passo e não é ajustável; mandrilamento é torneamento interno. **A única coisa que as três herdam do fresamento é o modelo de força específica de corte (Kienzle), `kc = kc1.1 · h^(−mc)`** — e mesmo isso com uma ressalva declarada na §4.

### 1.1 Furação — a espessura de cavaco que entra em Kienzle

A espessura de cavaco não deformada (`h`) da broca helicoidal:

```
h = (fn / z) · sin κ          [mm]
κ = σ / 2                     ângulo de posição = METADE do ângulo de ponta
z = 2                         broca helicoidal (duas arestas principais)

fn = avanço por rotação [mm/rot] · σ = ângulo de ponta da broca [graus] · κ em graus
```

**Furação não tem penetração de trabalho radial.** A fórmula de espessura de cavaco do fresamento — a que depende de `ae/D`, seja na forma máxima (`hex`) ou na média integrada sobre o arco (`hm`) — **não se aplica**. Não existe arco engajado a integrar: as duas arestas cortam o tempo inteiro, e a espessura é constante ao longo do gume. O canônico do motor de cálculo continua valendo integralmente para fresamento; aqui a entrada de Kienzle é a fórmula acima.

**`κ` é a metade do ângulo de ponta, não o ângulo inteiro.** Os dois territórios derivam isso por caminhos diferentes: o `[HANDBOOK]` pela geometria (cada aresta faz `σ/2` com o eixo, e `κ` é o ângulo de **uma** aresta); o `[CATÁLOGO]` pelo caso-limite da broca de ponta plana (`σ` = 180°, onde `h = fn/z` exige `sin κ = 1`, logo `κ = 90° = 180°/2`), mais prova por absurdo — com `κ` inteiro, a broca mais chata daria o cavaco mais fino, o inverso do real. Para `σ` = 118°: `κ` = 59°, `sin κ` = 0,857.

**A espessura calculada assim é a que alimenta o modelo de Kienzle** — `kc = kc1.1 · h^(−mc)` — sem intermediário. Ressalva sobre *qual* par `(kc1.1, mc)` usar: §4, lacuna L-C, e §2.4.

**Tamanho do efeito do ângulo de ponta.** Entre 118° e 140°, que cobre quase toda a prateleira, `sin κ` varia de 0,857 a 0,940 — **10% em `h`**, que via `kc ∝ h^(−mc)` vira **2 a 7% em `kc`, torque e potência**, conforme o par de ângulos e o `mc` do material; para o par mais comum (118° → 140°) o efeito tabelado é **−2,4% no `kc`**. **Não toca rotação nem avanço.** Ligar o ângulo de ponta ao motor é correção de segunda ordem, não destravamento.

**Fonte:** `[HANDBOOK]` — Sekulić et al., TMT 2014, equações (2) e (3), reproduzidas por recomputação linha a linha da Tabela 1 do artigo (`b` = 5,833 mm devolve exatamente `σ` = 118°), erro de 4,71% contra medição. `[CATÁLOGO]` — Walter, compêndio técnico B 9, e Sandvik, formulário de furação, os dois publicando `h = fz · sin κ`.
**Confiança:** `CONSENSO` entre territórios — artigo revisado por pares mais dois formulários de fabricante grandes, com verificação dos dois lados.
**Lacuna anexa:** nenhum dos dois territórios escreve em palavras a identificação `κ = σ/2` — os dois a derivam. A frase literal está em livro-texto de mecânica do corte, fora dos dois escopos. Não compromete o resultado: a derivação é sólida dos dois lados.

### 1.2 Furação — `h < 0,1 mm` é o regime NORMAL, não a exceção

Invertendo a fórmula da §1.1, a espessura de cavaco chega a 0,1 mm em:

```
fn ≈ 0,21 a 0,23 mm/rot        (0,233 para σ = 118°; 0,213 para σ = 140°)
```

**Abaixo desse avanço, `h < 0,1 mm`.** E é aí que quase toda a furação de oficina trabalha:

| Ferramenta / condição | `h` de trabalho | Onde fica em relação a 0,1 mm |
|---|---|---|
| Broca de aço rápido ao cobalto em aço, abaixo de Ø25 | 0,036–0,08 mm | 20–60% do piso |
| Broca de metal duro de uso geral, até ~Ø20 | ≈ 0,09–0,10 mm | no piso ou logo abaixo |
| Broca de insertos (U-drill), **qualquer diâmetro** | 0,02–0,07 mm | 3–5× abaixo |
| Aço temperado 55–60 HRC e superligas | ≈ 0,02 mm | 5× abaixo |
| Broca de metal duro de alto desempenho, Ø10+, metade superior da faixa de avanço | ≥ 0,1 mm | **a única que escapa** |

**O limiar NÃO depende do diâmetro.** `h = (fn/z)·sin κ` não tem termo em `D`: uma broca Ø3 e uma Ø30 no mesmo `fn` têm a mesma espessura de cavaco. Qualquer regra que acople esse limiar ao diâmetro está errada — o erro vem de assumir `fn = k·D`, hipótese que a §1.5 derruba.

**O que o modelo erra abaixo de 0,1 mm.** Extrapolar `kc = kc1.1 · h^(−mc)` de `h` = 0,1 para `h` = 0,05 faz o `kc` subir por `2^mc`: **+19%** com `mc` = 0,25, **+23%** com `mc` = 0,30 — e isso **se a lei de potência ainda valesse**; o `kc` real sobe mais. O modelo **subestima** força, torque e potência exatamente onde a maioria das brocas de oficina trabalha.

> **08/09/2026 — o parágrafo abaixo perdeu objeto.** O alerta de espessura foi revogado em **todas as famílias** por decisão do Mestre (`CANONICO_LIMITES_E_ALERTAS.md` §5, item 1); não há mais alerta a impedir em furação. O que a rodada mediu — `h < 0,1 mm` é o regime normal da furação — continua valendo como limite de validade do modelo de força.

**Consequência de produto — o alerta de espessura abaixo do limite do modelo não pode disparar em furação.** Dispararia em praticamente 100% dos furos; um alerta que sempre acende não informa nada e treina o operador a ignorar aviso. Os dois territórios convergem nisso. **O que fazer com a força de corte abaixo do piso continua em aberto** — ver §4, L-C, e a questão aberta da §2.4. A emenda correspondente no canônico de limites e alertas está na §6.

**Fonte:** `[HANDBOOK]` e `[CATÁLOGO]`, os dois invertendo a fórmula e chegando ao mesmo limiar; o cruzamento ferramenta por ferramenta da tabela acima é do `[CATÁLOGO]`, que percorreu os avanços de partida publicados tabela por tabela (o `[HANDBOOK]` chega à mesma direção com menos granularidade: toda furação de oficina até Ø15 mm).
**Confiança:** `CONSENSO` entre territórios, com o mesmo número. **Contraria a premissa do enunciado da rodada**, que perguntou pelo caso de borda esperando exceção — o caso de borda é o outro, furo grande com broca cara.

### 1.3 Furação — torque e potência

```
Mc = kc · fn · D² / 8               [N·mm]
Pc = kc · fn · D · vc / 240000      [kW]

kc = força específica de corte [N/mm²], da §1.1 · fn = avanço por rotação [mm/rot]
D = diâmetro da broca [mm] · vc = velocidade de corte [m/min]
```

As duas são a mesma coisa escrita de dois jeitos: a forma do torque sai da forma da potência por substituição direta, e o coeficiente fecha em 1/8000 na notação do fabricante (`Mc = Dc²·kc·f/8000`).

**Fonte:** `[HANDBOOK]` — derivada das equações de Sekulić. `[CATÁLOGO]` — Walter (torque) e Sandvik (potência), com a substituição refeita pelo pesquisador.
**Confiança:** a mais alta da rodada — **três fontes independentes, dois territórios, álgebra verificada dos dois lados**.

**Ressalva sobre o braço da força.** A fórmula usa o braço `D/4` (hipótese da resultante no raio médio). Sekulić **mediu** o braço real em `0,443·D` — fator 1,77 contra `0,25·D`. A forma da fórmula é a certa; o que ela devolve depende do `kc` que entra. Alimentada por um `kc` de aresta principal pura, **subestima** o torque, porque 27% do torque de furação medido não é corte de aresta principal (19% atrito das guias, 8% extrusão na aresta transversal). Isto é a mesma questão aberta da §2.4 e da lacuna L-C, e é `REFERÊNCIA ÚNICA` — um artigo, aço C15, Ø10.

### 1.4 Furação — força de avanço (thrust)

```
Ff ≈ (0,47 a 0,63) · kc · (D / 2) · fn        [N]
```

**Faixa, não número.** A **forma** é `CONSENSO` (`Ff ∝ kc·D·fn`); o **coeficiente** é `SEM CONSENSO` dentro do próprio território de catálogo: Sandvik publica `Ff ≈ 0,5·kc·(Dc/2)·fn·sin κr`, coeficiente efetivo ≈ 0,47; Walter publica `Ff = 0,63·(f·Dc·kc)/2`, **sem o `sin κ`** — 34% mais força. O `[HANDBOOK]` não fechou fórmula citável.

**Regra de uso:** o coeficiente aplicado tem de ser **declarado junto com o resultado**. Para dimensionar fixação, usar **0,63** — é a leitura conservadora.
**Confiança:** `FAIXA` / `SEM CONSENSO` no coeficiente; `CONSENSO` na forma.

### 1.5 Furação — a lei do avanço por rotação de partida

```
fn ≈ k · D^a          com  a ∈ [0,5 ; 0,8]
```

**O avanço por rotação cresce SUBLINEARMENTE com o diâmetro — não linear.** Este é o ponto que fecha com confiança alta, e ele é negativo: **não usar `fn` proporcional a `D`**. Os dois territórios mostram isso por caminhos independentes — o `[CATÁLOGO]` ajustou `fn ∝ D^a` em quatro catálogos e quatro famílias de ferramenta e obteve `a` = 0,55 ± 0,1 (mediana 0,54); o `[HANDBOOK]` reduziu suas tabelas a `k = fn/D` e viu `k` cair de 0,020 para 0,011 entre Ø3 e Ø25, que é `a` ≈ 0,8 escrito de outro jeito.

**O expoente é faixa, sem vencedor.** O `[CATÁLOGO]` tem a evidência melhor (fez o ajuste log-log explícito), mas é catálogo-só; o `[HANDBOOK]` tem duas fontes mas **não ajustou** — assumiu linear e tratou a degressão como nota de rodapé. Faixa honesta: `a` de 0,5 a 0,8.

**A recomendação de `fn = 0,015·D` do próprio `[HANDBOOK]` não sobrevive** — contradiz o dado reduzido dele mesmo.

Ponto de partida utilizável e valores absolutos: §2.1. **O valor de partida é derivado, não publicado** — está marcado como tal lá.

**Substrato governa a velocidade, não o avanço.** Trocar aço rápido por metal duro na mesma broca muda a velocidade de corte (fator ~3,3 num catálogo; a nota do handbook para metal duro é fator de **velocidade**), e deixa o avanço igual. Convergência entre os dois territórios.

> **Ressalva de domínio — R9, 05/09/2026.** A regra **vale bem no diâmetro grande e mal no pequeno**. Confrontando o avanço publicado de broca de aço rápido em aço 1045 contra a lei `0,08·√D` desta mesma família (que é ajustada sobre catálogos de **metal duro**): Ø3 → **0,50×** · Ø6 → 0,64× · Ø10 → 0,75× · Ø20 → **0,95×**. Em diâmetro pequeno o aço rápido aceita **metade** do avanço do metal duro; em Ø20 os dois praticamente se encontram.
> **A regra não cai — ganha domínio de validade.** Acima de ~Ø15 ela descreve bem o que os catálogos publicam; abaixo de Ø6 ela superestima o avanço de aço rápido em até 2×.
> **Confiança: `DERIVADO`, e a ressalva é explícita** — não é comparação lado a lado no mesmo catálogo (mesmo fabricante, mesmo diâmetro, mesmo material, HSS contra metal duro). Essa comparação limpa **não foi encontrada**: os catálogos que publicam as duas linhas bloquearam o acesso. É tabela publicada de um lado contra lei ajustada do outro.
> **Fonte:** `Docs_inicial/pesquisa/RESPOSTA_R9_BROCA_ACO_RAPIDO.md`, alvo 2.

### 1.6 Furação — a faixa de segurança em torno do avanço de partida

| Distância do valor de partida | Leitura |
|---|---|
| até **±25%** | tolerância do próprio ponto de partida — **não é anomalia, não alertar** |
| até **~2×** para cima, **~0,5×** para baixo | otimização legítima, dentro do que o fabricante publica |
| acima de **~2×** ou abaixo de **~0,5×** | fora da faixa publicada — é aqui que o alerta cabe |

**Um alerta a 1,3× do valor de partida grita em cima de metade da faixa que o fabricante publica** e por isso sai (precedência 6).

**Fonte:** `[CATÁLOGO]` — a Dormer titula a própria tabela de avanços "± 25%", e o par máximo/mínimo publicado para o mesmo diâmetro varia 1,8–2,2×. `[HANDBOOK]` — Machinery's Handbook, Tabela 22: a troca avanço↔velocidade a vida constante dá fator ~2.
**Confiança:** `CONSENSO` entre territórios.

**Nota sobre o lado de baixo — não há piso publicado.** Nenhum catálogo publica limite inferior de avanço; publicam faixa mínimo–máximo e param. O `[HANDBOOK]` quantifica a **consequência** por Kienzle (cortar o avanço pela metade sobe a energia específica de corte em +19%) e registra que o ótimo da troca avanço↔velocidade fica em avanço/ótimo ≈ 0,2, com retorno decrescente e depois negativo abaixo disso — mas isso é consequência derivada, não piso com modo de falha publicado. **Piso citável: lacuna.**

**Modos de falha do lado alto** (convergente, qualitativo, os dois territórios nomeiam): rachadura de alma, lascamento de aresta, quebra por torção. E o desgaste **soma** ao torque — broca gasta puxa mais torque que broca nova nas mesmas condições.

### 1.7 Furação — profundidade do furo e saída de furo passante

**Limiar de mudança de regime: `3 × D`.** Marca a transição de furo raso para furo profundo. Duas fontes independentes dentro do território de handbook; o `[CATÁLOGO]` não refuta — o dado dele é sobre faixas mais profundas (15×D a 40×D). É o mesmo limiar já registrado no canônico de limites e alertas para o alerta de furo profundo condicionado à refrigeração, e **não muda**.

**Redução de avanço na saída do furo passante — requisito novo.** Reduzir o avanço para **40% a 50%** do valor, aproximadamente **1 mm antes do rompimento**. É instrução de ciclo, não número de partida, e é onde a broca lasca.
**Fonte:** `[CATÁLOGO]` — Guhring (40%) e CERATIZIT (50%), dois fabricantes independentes, mesma regra. O `[HANDBOOK]` não tem.
**Confiança:** `REFERÊNCIA MÚLTIPLA` dentro de um território.

**Na faixa profunda, o aço da família do 1045 não pede redução de avanço.** Entre 15×D e 40×D, nenhuma redução de `fn` no aço beneficiável não ligado. O degrau grande não é a profundidade, é a troca de ferramenta: broca helicoidal para broca de canhão derruba o avanço em ~10×.
**Fonte:** `[CATÁLOGO]`, Guhring. **Confiança:** `REFERÊNCIA ÚNICA`.

> **Isto CONVIVE com a escada de avanço da R9 — e as duas juntas dizem mais do que cada uma sozinha.**
> Não é contradição, e a razão é verificável linha a linha.
>
> A escada da NACHI (§2.1) reduz o avanço **uma vez**, na passagem do furo raso para o profundo, e
> **para de reduzir depois**. Em todos os cinco diâmetros publicados, o avanço de `5–10×D` é **idêntico**
> ao de `>10×D`:
>
> | Ø | ≤5×D | 5–10×D | >10×D |
> |---|---|---|---|
> | 2 | 0,04 | 0,03 | **0,03** |
> | 5 | 0,08 | 0,06 | **0,06** |
> | 8 | 0,14 | 0,10 | **0,10** |
> | 12 | 0,18 | 0,12 | **0,12** |
> | 16 | 0,20 | 0,14 | **0,14** |
>
> **A queda de 0,70× acontece antes de 10×D. A partir dali o avanço satura** — e é justamente na faixa
> saturada (15×D a 40×D) que a Guhring afirma não haver redução. **As duas fontes descrevem o mesmo
> comportamento em trechos diferentes da mesma curva.**
>
> **O que continua caindo depois de 10×D é a velocidade, não o avanço:** o `vc` da NACHI vai de 10–15
> para 5–10 exatamente onde o `fn` fica parado. Isso reforça, por um terceiro caminho, o que a §1.5 já
> diz — **substrato e profundidade governam a velocidade; o avanço é mais teimoso.**
>
> **Regra prática que sai daí:** a redução de avanço da furação profunda é **um degrau, não uma
> rampa** — ela acontece na entrada do regime e não se acumula com a profundidade.
> **Confiança:** `CONSENSO` no comportamento (duas fontes independentes, dois trechos complementares
> da mesma curva); os **valores** de cada uma mantêm o rótulo que têm na §2.1 e aqui.
>
> **Condições, para que ninguém leia uma no lugar da outra:** a NACHI é **broca helicoidal de aço
> rápido**, aço 1045, emulsão, grade `≤5×D / 5–10×D / >10×D`. A Guhring é **catálogo de metal duro**,
> aço beneficiável não ligado, faixa `15×D–40×D`, e o degrau de ~10× que ela nomeia é **troca de
> ferramenta** (helicoidal → canhão), não profundidade.

**A escada graduada na grade `3D→5D→8D→12D`, como multiplicador de redução, não existe em nenhum dos dois territórios.** O que **existe** — e entrou pela R9 — é **outra** escada, na grade `≤5×D · 5–10×D · >10×D`, publicada por um fabricante (§2.1). **Não confunda as duas:** a afirmação de que *nenhuma* escada existe caiu; a grade acima continua sem fonte. Ver §4.2, L-D, onde as duas grades estão lado a lado.

### 1.8 Roscamento — a velocidade de corte do macho é tabela própria, nunca derivada

**Não existe fator de família entre roscamento e fresamento.** A velocidade de corte do macho **não se deriva** da velocidade de fresamento do material, nem por fator de substrato, nem por qualquer outro multiplicador. É tabela própria, **indexada por material × passo**.

Isto é convergência total entre os dois territórios, por caminhos independentes:

- `[HANDBOOK]` — a coluna de rosqueamento do handbook é preenchida de forma independente, sem nenhum fator; a razão entre a velocidade de rosca e a de furação no **mesmo material** varia de **0,64 a 2,13** (fator 3,3), e a velocidade de rosca depende do **passo** (+28% do passo grosso para o fino), grandeza que não é entrada de nenhuma tabela de fresamento.
- `[CATÁLOGO]` — o fabricante publica **uma tabela separada por família de ferramenta**. Se existisse um fator, existiria uma tabela e um multiplicador.

**Não é preferência de arquitetura — é o que o dado obriga.**

**A família "roscar" tem duas cinemáticas com origens de dado OPOSTAS:**

| Cinemática | De onde vem a velocidade de corte |
|---|---|
| **Macho** (de corte ou de conformação) | tabela própria do macho, por material × passo — §2.2 |
| **Fresa de rosca** | **é fresamento** — usa a velocidade de corte de fresamento do material |

Convergente nos dois territórios. Quem implementar não deduz uma da outra.

**A régua do macho é teto absoluto, não afastamento relativo.** O alerta de distância percentual até um valor de partida — a régua usada em fresamento — **não serve aqui**: no macho o problema não é estar longe do valor tabelado, é estar num patamar de velocidade que a ferramenta não suporta em nenhum material. **Nenhum valor publicado de macho de corte passa de 35 m/min** em toda a tabela (o teto é alumínio 6061). O limiar fica em **~40 m/min para macho de corte** e **~60 m/min para macho de conformação**.
**Fonte:** `[CATÁLOGO]`. **Confiança:** `REFERÊNCIA ÚNICA` no número do teto; `CONSENSO` entre territórios em que a régua relativa não se aplica.
**Severidade:** acima do teto o sistema **entrega o número e avisa no nível mais grave**, nomeando o teto e a distância até ele. Onde o retorno de pesquisa escreveu "recusa", leia isto — é linguagem de pesquisa, e a regra de produto que a traduz é de 27/08/2026, anterior a esta rodada. Ver §3.4.

### 1.9 Roscamento — a velocidade de avanço é travada pelo passo

```
vf = P · n                              rosca de uma entrada
vf = P · (nº de entradas) · n           rosca de múltiplas entradas

P = passo da rosca [mm] · n = rotação [rpm] · vf [mm/min]
```

**O avanço do macho é grandeza derivada — calculada e não editável.** Diferentemente de qualquer outra ferramenta de corte, ele não pode ser ajustado de forma independente: a rosca é o próprio avanço. Convergência entre territórios — o `[HANDBOOK]` diz isso em texto, e o `[CATÁLOGO]` publica o avanço do macho como fórmula do passo, nunca como valor tabelado.

**A igualdade é com o passo helicoidal (*lead*), não com o passo entre filetes (*pitch*).** Em rosca de uma entrada os dois coincidem; em rosca de múltiplas entradas, `vf = P × nº de entradas × n`. Se o produto oferecer rosca de duas entradas, a forma simples erra por fator igual ao número de entradas.
**Fonte:** `[HANDBOOK]`, `REFERÊNCIA ÚNICA` — só ele pega a distinção. **Confiança:** `REFERÊNCIA ÚNICA`, correção importante.

**Nenhuma prática de execução quebra a igualdade.** Macho flutuante, roscamento rígido e alívio de passo **não** alteram `vf` — são folga axial mecânica (`± 0,5 mm` num dispositivo publicado) para absorver o erro de quem comanda o avanço. Convergente nos dois territórios.

**Modo de falha a comunicar:** mandril rígido sem compensação transforma erro de sincronismo em força axial no macho, com pico **no ponto de inversão da rotação, na saída** — é onde o macho quebra.
**Fonte:** `[CATÁLOGO]`. **Confiança:** `REFERÊNCIA ÚNICA`.

### 1.10 Roscamento — teto de rotação por razão que não é de corte

**Existe um teto de hardware abaixo do teto de corte: ~2.500 a 2.700 rpm.**

**Fonte:** `[HANDBOOK]` — cabeçote de roscar auto-reversível com máximo publicado de **2.500 rpm** (até M12), num ensaio cujo eixo-árvore ia a 7.500 rpm. `[CATÁLOGO]` — fabricante declara que em ciclo síncrono o eixo-árvore **não alcança a rotação programada** acima de ~**2.700 rpm**, e vende engrenagem redutora (1:4,412) para contornar.
**Confiança:** `CONSENSO` entre territórios — dois dispositivos de fabricantes distintos, mesmo patamar.

**Acima de ~10.000 rpm a rotação extra para de comprar tempo.** O ganho de tempo de ciclo deixa de crescer entre 10.000 e 11.912 rpm (−39% vira −37%): daí para cima o ciclo é dominado por aceleração, desaceleração e inversão, não por corte.
**Fonte:** `[CATÁLOGO]`. **Confiança:** `REFERÊNCIA ÚNICA`.

**Fatores qualitativos que baixam a rotação praticável**, com o único quantificado marcado: **percentual de filete cheio** — o torque de um filete 100% é **mais que o dobro** do de 50% —, comprimento roscado, capacidade de sincronismo e reversão da máquina, passo, tipo de chanfro de entrada, perfil de rosca, classe de precisão e fluido de corte.
**Fonte:** `[HANDBOOK]`. **Confiança:** `REFERÊNCIA ÚNICA`.

**O teto por sincronismo eletrônico do eixo-árvore não foi encontrado** em nenhum dos dois territórios — ver §4, L-E.

### 1.11 Mandrilamento — é torneamento interno, com um único termo novo

**Mandrilamento não tem cadeia de cálculo própria.** É torneamento interno, e as duas apurações confirmam isso de forma explícita: o handbook não tem linha de mandrilamento e o remete para ferramenta de ponta única (torneamento, aplainamento, plainamento); o catálogo publica torneamento e mandrilamento **na mesma coluna**.

A adaptação, integral:

```
ap = (D_final − D_inicial) / 2          profundidade de corte, NO RAIO          [mm]
Dc = D_final                            diâmetro que alimenta vc                [mm]
fn = fz · z ,  com z = 1                mandrilamento por passos                [mm/rot]
Q  = vc · ap · fn · (1 − ap/Dc)         taxa de remoção, forma equivalente à §1.12
```

**O único termo que não existe no torneamento é `(1 − ap/Dc)`** — ver §1.13.

**A profundidade de corte é derivada dos dois diâmetros, nunca informada diretamente.** Duas armadilhas independentes, apontadas uma por território e compatíveis entre si:

1. `[HANDBOOK]` — o anel de ajuste do cabeçote de mandrilar é graduado **em diâmetro**. Quem informar o número lido no anel entrega **o dobro** da profundidade de corte: erro de fator 2.
2. `[CATÁLOGO]` — não há convenção divergente na definição; a armadilha real é **qual diâmetro alimenta a velocidade de corte** (inicial, final ou médio), e o risco de aplicar a correção `(1 − ap/Dc)` **duas vezes**.

**Regra:** a entrada de mandrilamento é feita pelos **dois diâmetros**; a profundidade de corte é resultado, não entrada. Convergente nos dois territórios.

**Fonte da convenção:** `[CATÁLOGO]` — um fabricante define a profundidade de corte como a diferença entre o raio do furo antes e depois, outro usa `(Dc − Dp)/2` na mesma posição. `[HANDBOOK]` — mesma convenção do torneamento.
**Confiança:** `CONSENSO` entre territórios, nenhuma convenção divergente encontrada na fonte. Ver a nota de procedência da §2.4 sobre a norma que **não** sustenta esta definição.

### 1.12 Mandrilamento — taxa de remoção de material

```
Q = π · (D_final² − D_inicial²) · fn · n / 4000        [cm³/min]

D_final, D_inicial = diâmetros depois e antes da passada [mm]
fn = avanço por rotação [mm/rot] · n = rotação [rpm]
```

É a forma do **anel exato** — a área removida é a coroa circular entre os dois diâmetros, sem aproximação.

**Fonte:** `[HANDBOOK]` — construção geométrica do anel, derivada. `[CATÁLOGO]` — um fabricante publica literalmente `Q = vf·π·(Dc² − Dp²)/(4×1000)`, e a forma equivalente `Q = vc·ap·fn·(1 − ap/Dc)` sai das definições de outro.
**Confiança:** a mais alta da rodada, junto com o torque de furação — um território deriva, o outro acha publicada e verifica. A fórmula literal é `REFERÊNCIA ÚNICA` (um fabricante); o resultado é `CONSENSO`.

**Duas fórmulas que NÃO servem, e o tamanho de cada erro:**

| Fórmula errada | Por que erra | Tamanho do erro |
|---|---|---|
| `Q = vc · fn · ap` com o **diâmetro final** na velocidade de corte | a forma só fecha com o diâmetro **médio** | **+2%** no acabamento a **+43%** num Ø20→Ø50 — estoura sozinha a margem de ±15–25% do modelo |
| `Q = vc · Dc · fn / 4` | é a fórmula da **furação** — supõe furo cheio e ignora o furo de partida | **5,8×** num Ø40→Ø44; **23×** num Ø40→Ø41 |

A segunda merece atenção porque **está publicada numa folha de mandrilamento de fabricante**, por reaproveitamento de página — a mesma folha ainda chama o diâmetro de "diâmetro da broca". Ver §2.4.

### 1.13 Mandrilamento — velocidade de corte e a correção `(1 − ap/Dc)`

**A velocidade de corte para vida de ferramenta é calculada no diâmetro FINAL.**

**A correção `(1 − ap/Dc)` entra na potência, uma única vez.** Ela é o termo que distingue mandrilamento de torneamento externo. Importa no desbaste — num Ø40→Ø60 o fator é **0,83**, ou seja **17% a menos de potência** — e é desprezível no acabamento.

**Trava de não-contagem-dupla:** se a correção `(1 − ap/Dc)` for aplicada, a velocidade de corte **não** pode usar o diâmetro médio. Ou uma, ou o outro — as duas juntas aplicam a mesma correção duas vezes.

**Fonte:** `[CATÁLOGO]` — o termo é publicado por um fabricante na potência do mandrilamento; o `[HANDBOOK]` diz "igual a torneamento, sem correção", e é a leitura menos precisa. Não é conflito: um dos dois é mais completo.
**Confiança:** `REFERÊNCIA ÚNICA`, sem refutação do outro território.

---

## 2. Constantes e tabelas

Cada linha tem fonte e confiança **próprias**. Não existe confiança por tabela.

### 2.1 Furação — avanço por rotação de partida e razões entre famílias

| Grandeza | Valor | Fonte | Confiança |
|---|---|---|---|
| `fn` de partida, broca helicoidal inteiriça de metal duro, aço ISO P | **`fn ≈ 0,08 · √D`** mm/rot, faixa **`0,06·√D` a `0,16·√D`** | `[CATÁLOGO]` — ajuste log-log sobre avanços publicados de quatro catálogos e quatro famílias de ferramenta | **`DERIVADO`** — não é número publicado, é ajuste do pesquisador sobre dado de fabricante. Ver §4, L-A |
| Expoente da lei do avanço (`fn ≈ k·D^a`) | **`a` ∈ [0,5 ; 0,8]** | `[CATÁLOGO]` `a` = 0,55 ± 0,1 (ajuste explícito) · `[HANDBOOK]` `a` ≈ 0,8 (implícito na queda de `k` = `fn/D` de 0,020 para 0,011 entre Ø3 e Ø25) | **`FAIXA`** — divergência real, sem vencedor: um ajustou e é catálogo-só, o outro tem duas fontes e não ajustou |
| `fn` de partida, broca de insertos (U-drill), aço | **0,05 a 0,15 mm/rot**, **não escala com o diâmetro** | `[CATÁLOGO]` — tabela publicada só por grupo de material, mesma faixa para toda a linha de diâmetros · `[HANDBOOK]` 0,004–0,008·D, que em Ø12 dá 0,05–0,10 | **`FAIXA`** no valor (faixas sobrepostas, `REFERÊNCIA ÚNICA` de cada lado); **`VENCEU [CATÁLOGO]`** no "não escala" — leitura de tabela multi-diâmetro contra extrapolação de um único ponto |
| Razão do avanço do alargador contra a broca do mesmo diâmetro | **2 a 3× MAIOR** | `[HANDBOOK]` (Tabela 17 do Machinery's Handbook) e `[CATÁLOGO]` (catálogo de fabricante, p. 438), independentes | **`CONSENSO` entre territórios** |
| `fn` absoluto do alargador, aço 1045, Ø20 | **~0,3 a 0,9 mm/rot** | `[HANDBOOK]` 0,46–0,91 (grupo de aço mais mole, extrapolado para o 1045 — `LACUNA parcial` declarada pelo próprio retorno) · `[CATÁLOGO]` ≈ 0,39, com tolerância `± 15%` declarada pelo fabricante | **`FAIXA`** — diâmetros e grupos de material não batem exatamente entre as duas fontes |
| Sobremetal de partida do alargador | **0,40 mm no diâmetro** (0,20 mm no raio) | `[HANDBOOK]` — nota da Tabela 17 do Machinery's Handbook | **`REFERÊNCIA ÚNICA`** |
| Razão do avanço do escareador contra a broca do mesmo diâmetro | **2 a 3× MENOR** | `[CATÁLOGO]` — tabela completa por código × diâmetro × material; `[HANDBOOK]` = lacuna | **`REFERÊNCIA ÚNICA`** |
| `fn` do escareador, aço 1045, Ø16 | **≈ 0,12 mm/rot** | `[CATÁLOGO]`, mesma tabela | **`REFERÊNCIA ÚNICA`** |
| Razão entre classes de broca de metal duro — alto desempenho (refrigeração interna, ponta 140°) contra uso geral | a de alto desempenho aceita **1,3 a 2,7× mais avanço** | `[CATÁLOGO]` — dois fabricantes comparados linha a linha; o `[HANDBOOK]` não enxerga a distinção | **`REFERÊNCIA ÚNICA`** — mas é achado real: um seletor único "metal duro × aço rápido" erra até 2,7× **dentro do próprio metal duro** |
| Efeito do substrato sobre a **velocidade**, mesma broca (aço rápido → metal duro) | fator **~3,3** | `[CATÁLOGO]` (um catálogo, troca de linha) · `[HANDBOOK]` (nota de fator de velocidade para metal duro) | **`CONSENSO`** na direção e na natureza (é fator de velocidade, **não** de avanço) |
| `fn` de partida, broca de centro / spot drill | **0,03 mm/rot** em aço abaixo de 900 N/mm², ponta 90°, aço rápido ao cobalto | `[CATÁLOGO]` — um único ponto, sem faixa; `[HANDBOOK]` = lacuna | **`PONTO ISOLADO`** — não é tabela e não deve ser tratado como valor de partida geral. Ver §4, L-B |
| **`vc` de partida, broca helicoidal de AÇO RÁPIDO (HSS / HSS-Co), aço 1045** | **16 a 30 m/min** | **R9** — quatro fontes de broca helicoidal: **Sutton Tools** 16–20 (C45 recozido, HB190, 640 N/mm², ≤5×Ø) · **NACHI** 18–22 (1.0503-C45, ≤5×D, emulsão) · **Norseman** 21,3–24,4 (aço 0,4–0,5%C) · **OSG EX-GOLD** 21,3–30,5 (1035/1045, HSS-Co explícito, óleo solúvel 1:5–1:10) | **`FAIXA`** — e a dispersão é **degrau, não ruído**: as duas fontes de baixo ficam inteiras abaixo das duas de cima. Sem média, sem vencedor. Ver a nota de leitura logo abaixo da tabela |
| **`fn` de partida por diâmetro, broca helicoidal de AÇO RÁPIDO, aço 1045** | **Sutton:** Ø3 0,070 · Ø5 0,110 · Ø6 0,125 · Ø8 0,16 · Ø10 0,19 · Ø12 0,23 · Ø16 0,29 · Ø20 0,34 · Ø25 0,41 mm/rot — **NACHI:** Ø2 0,04 · Ø5 0,08 · Ø8 0,14 · Ø12 0,18 · Ø16 0,20 mm/rot | **R9** — dois fabricantes independentes, material nomeado nos dois. **Sutton:** broca jobber D102/D103/D179, ponta código "R30", C45 recozido HB190 / 640 N/mm², profundidade ≤5×Ø; publica `vc` e `fn` **na mesma linha** — é o único par coerente da rodada. **NACHI:** pág. 21, refs. 520/522A/6522/552/562/534/6534/6552, furo raso ≤5×D, emulsão | **`REFERÊNCIA MÚLTIPLA`** — duas fontes, **dispersão de 1,3×** (a NACHI roda a 0,69–0,88× da Sutton), dentro da tolerância de ±25% da §1.6 em três dos quatro diâmetros comuns. **A NACHI é a fonte mais bem condicionada da rodada** — profundidade estratificada, refrigeração declarada e diâmetro explícito —, e é isso que a torna citável, não o valor em si |
| **Escada de `vc` por faixa de profundidade, broca de aço rápido, aço 1045** | **≤5×D → 18–22** · **5–10×D → 10–15** (~0,6×) · **>10×D → 5–10** (~0,35×) m/min. Com broca **HSS-Co**, acima de 10×D o valor volta a **18–22** | **R9** — NACHI, pág. 21, mesma tabela, colunas de profundidade | **`REFERÊNCIA ÚNICA`** — mas é escada publicada, não derivação. **Contradiz a nota da OSG**, que manda reduzir só o avanço acima de 4×Ø: a NACHI reduz **os dois** (o avanço cai 0,70× em Ø16 na mesma escada). Ver §4.2, L-D |

**Nota de leitura do `vc` de aço rápido — o degrau, e a explicação mais econômica dele.** As duas fontes que **declaram a profundidade** do furo (Sutton ≤5×Ø, NACHI ≤5×D) ficam juntas em **16–22**; as duas que **não declaram** (Norseman, OSG) é que puxam a faixa até 30. Parte da dispersão é, provavelmente, profundidade não declarada — o que a escada da linha seguinte torna plausível, já que ali o `vc` cai a 0,35× entre o furo raso e o profundo.
**Confiança: `DERIVADO`** — é observação sobre as fontes, não número publicado. Não use para estreitar a faixa; use para saber o que perguntar ao próximo catálogo.

**O Machinery's Handbook não entra como quinta fonte.** O valor dele (15,2 m/min) é para **1045 temperado e revenido a 275 HB** — material mais duro que o do produto. Não é comparável direto; é consistente com a tendência (mais dureza, menos velocidade) e nada além disso.

**Ângulo de ponta: nenhuma das quatro fontes publica em graus.** A Sutton dá um código de geometria ("R30"), as demais não dão nada. Não há como amarrar `vc` de aço rápido a ângulo de ponta com o que existe.

### 2.2 Roscamento — velocidade de corte do macho

| Grandeza | Valor | Fonte | Confiança |
|---|---|---|---|
| `vc` de macho **de corte**, aço rápido, aço 1045 | **10 a 18 m/min**, partida **~14** | `[CATÁLOGO]` — leitura direta da linha "1030–1060" de um catálogo (15,8 canal reto / 18,0 ponta helicoidal) **mais** segunda fonte independente do mesmo território (10,7) | **`REFERÊNCIA MÚLTIPLA`** dentro de um território — duas fontes, dispersão 1,7×. Venceu o `[HANDBOOK]` (43,8 m/min) porque este é fonte única **e** extrapolação de material vizinho, declarada pelo próprio retorno como "estimativa por vizinhança, não leitura de tabela" |
| `vc` de macho de corte, aço rápido, aço ISO P (ordem de grandeza da família) | **4 a 25 m/min** | `[CATÁLOGO]` — tabela completa, três geometrias de macho × ~24 grupos de material | **`REFERÊNCIA ÚNICA`** |
| Teto de toda a tabela de macho de corte (qualquer material) | **35 m/min** (alumínio 6061) | `[CATÁLOGO]`, mesma tabela | **`REFERÊNCIA ÚNICA`** |
| Magnitude do defeito do valor de ~140 m/min do sistema anterior | **fator ~8** | consequência aritmética da linha 1 (18 × 8 ≈ 144); o mecanismo é reprodutível — é a velocidade de fresamento de metal duro rotulada como velocidade de macho | **`VENCEU [CATÁLOGO]`** — o `[HANDBOOK]` calcula 3,2–4,7× porque parte do próprio número inflado |
| `vc` de macho **de conformação**, aço 1045 | **45,1 m/min** (dois estilos de macho) · **22,9 m/min** (outros dois estilos) | `[CATÁLOGO]` — leitura direta de tabela de machos de conformação, p. 196 | **`REFERÊNCIA ÚNICA`**, mas é tabela de verdade (não ponto isolado) |
| Razão conformação / corte | **2,5 a 3× MAIS RÁPIDO** | `[CATÁLOGO]` — 45,1 contra 15,8–18,0 no mesmo catálogo, mesmo material, macho contra macho | **`VENCEU [CATÁLOGO]`** — o `[HANDBOOK]` tem razão inversa (0,47), mas de **rosca externa laminada com três rolos em torno**, em Ti-6Al-4V, e o próprio retorno declara "não usar como valor de partida, cinemática parente, não igual". O mecanismo confirma: conformação não gera cavaco, não tem gargalo de evacuação |
| `vc` de macho de **metal duro** | **30 a 60 m/min em ferro fundido** | `[CATÁLOGO]` e `[HANDBOOK]`, convergentes em que essa ferramenta é de ferro fundido | **`CONSENSO`** na aplicação. **Em aço: lacuna** — ver §4, L-F |

**Materiais em que o macho de conformação não se aplica** — a ausência na tabela é a recomendação: **ferro fundido** (toda a família), **aço acima de 350 HB**, **aço temperado 49–63 HRC**, **inox endurecível por precipitação** e **Ti-6Al-4V**.
**Mecanismo (convergente nos dois territórios):** a conformação exige que o material **escoe plasticamente**; material frágil trinca em vez de escoar. O limiar quantificado — ~8% de alongamento, ~30 HRC — existe só em catálogo.
**Fonte:** `[CATÁLOGO]` na lista (células em branco na tabela do fabricante); `[HANDBOOK]` no mecanismo.
**Confiança:** `REFERÊNCIA ÚNICA` na lista, `CONSENSO` no mecanismo.
**É a única família da rodada em que o material descarta a ferramenta** — o macho quebra dentro da peça e a peça vira sucata. **Severidade:** o sistema **entrega o número e avisa no nível mais grave**, nomeando o mecanismo. Onde o retorno de pesquisa escreveu "bloquear", leia isto — ver §3.4.

### 2.3 Mandrilamento — dado de corte

| Grandeza | Valor | Fonte | Confiança |
|---|---|---|---|
| `vc` de mandrilamento, aço 1045 | **90 a 200 m/min** | `[CATÁLOGO]` — coluna "torneamento e mandrilamento" de um catálogo | **`REFERÊNCIA ÚNICA`** |
| `fn` de mandrilamento, aço 1045 | **0,04 a 0,12 mm/rot** | `[CATÁLOGO]`, mesma coluna | **`REFERÊNCIA ÚNICA`** |
| Amplitude do avanço de mandrilamento em toda a tabela, contra a de furação | mandrilamento **0,04–0,25** · furação **0,05–0,87** | `[CATÁLOGO]` | **`REFERÊNCIA ÚNICA`** — o avanço de mandrilamento é **muito mais estreito** que o de furação; a família não deve oferecer a mesma amplitude de avanço que furar |

### 2.4 Notas de procedência que valem para quem for citar fonte depois

**A norma brasileira de movimentos e relações geométricas na usinagem não sustenta a definição de profundidade de corte da §1.11.** Ela **consta como cancelada**, e o retorno que a citaria **não teve acesso ao texto** — confirmou escopo e existência da grandeza, não a cláusula. **Não citá-la como autoridade viva.** A definição que vale vem dos dois catálogos nomeados na §1.11.

**A coluna de rosqueamento em aço rápido do Machinery's Handbook roda ~2× acima das tabelas de fabricante, para aço.** Exemplo: aço 1005–1025 → handbook 42–56 m/min, catálogo 20–22 m/min. **Fora do aço os dois territórios convergem** — em ferro fundido cinzento GG25, handbook ~25 e um congresso 30, contra 29,9 do catálogo. É a coluna de rosqueamento em aço que é o ponto fora da curva. Qualquer documento futuro que cite dado de rosqueamento dessa fonte precisa saber disso.

**Questão aberta — qual par `(kc1.1, mc)` alimenta a furação.** A prática majoritária usa o par de **torneamento**. Um artigo revisado por pares afirma que isso é "apenas parcialmente correto" e mede que **27% do torque de furação não é corte de aresta principal** (19% atrito das guias, 8% extrusão na aresta transversal), com o braço real da força em `0,443·D` contra os `0,25·D` da fórmula. O mesmo artigo publica um par medido **em furação**: `kv1.1` = 1639,05 N/mm², `1 − mv` = 0,75 — mas é **um artigo, um material (aço C15), um diâmetro (Ø10)**. O território de catálogo não refuta nem confirma: catálogo não discute a distinção.
**Estado:** não é lacuna (há fonte) e não é decisão (fonte única, e silêncio do outro território não é refutação). **Fica registrada como questão aberta**, a decidir quando existir par de furação para os materiais do produto — ver §4, L-C.
**Consequência prática enquanto isso:** o par de torneamento continua sendo o que entra, e o resultado que ele produz **subestima** torque e potência de furação por margem não quantificada para os materiais do produto.

---

## 3. O que foi decidido pelo Mestre

**Nenhum valor deste canônico é decisão de produto:** tudo o que está nas §1 e §2 vem de fonte, faixa ou lacuna declarada.

**Uma decisão já valia e responde esta rodada — §3.4.** As outras quatro são perguntas que a pesquisa **não pode** responder, e ficam registradas abertas, cada uma com o que a evidência já entrega. Até 04/09/2026 o Mestre não tomou nenhuma decisão **nova** por causa da R8.

**3.1 — O produto oferece rosca de múltiplas entradas?**
Se sim, a velocidade de avanço do roscamento é `vf = P × nº de entradas × n`, e o número de entradas passa a ser entrada obrigatória. Se não, `vf = P × n` basta. **A evidência não escolhe** — só diz que a forma simples erra por fator igual ao número de entradas se a rosca múltipla existir e não for declarada. Ver §1.9.

**3.2 — O produto oferece macho de metal duro em aço?**
Os dois territórios convergem em que essa ferramenta **quase não existe como produto de prateleira** — o macho de metal duro é de ferro fundido. Não há valor citável para aço (§4, L-F). A saída provável é **não oferecer**; se for oferecida, entra sem número.

**3.3 — A broca é selecionada por classe, ou só por substrato?**
Um seletor único "metal duro × aço rápido" erra até **2,7×** no avanço, **dentro do próprio metal duro** (§2.1). Distinguir uso geral de alto desempenho custa um atributo a mais no catálogo de ferramentas; não distinguir custa o erro acima. **Decisão de produto, evidência já entregue.**

**3.4 — A severidade das duas condições do roscamento: DECIDIDA, e não por esta rodada.**
**Decisão de 27/08/2026, aplicada aqui — não é decisão nova.** A regra já vigente do princípio da calculadora agnóstica é explícita: *nada neste sistema recusa entregar um resultado*; a natureza do limite governa **o que a mensagem diz e quão grave é o nível**, nunca se o número aparece. A razão declarada ali é que, diante do impossível, sumir com o número esconde justamente a informação útil — **o tamanho do erro**.

Logo, as duas condições que a rodada descreveu com verbo de recusa entram como **alerta no nível mais grave, com o número entregue**:

| Condição | O que o sistema faz |
|---|---|
| Velocidade de corte do macho acima de ~40 m/min (corte) ou ~60 m/min (conformação) — §1.8 | **entrega e avisa no nível mais grave**, nomeando o teto e a distância até ele |
| Macho de conformação em ferro fundido, aço acima de 350 HB, aço temperado, inox endurecível por precipitação ou Ti-6Al-4V — §2.2 | **entrega e avisa no nível mais grave**, nomeando o mecanismo: o material não escoa plasticamente, e o modo de falha é o macho quebrar **dentro da peça** |

**"Recusar" e "bloquear" são linguagem de pesquisa, não de produto.** O que a rodada mediu — os patamares, a lista de materiais, o mecanismo — está íntegro nas §1.8 e §2.2 e não muda. O que muda é só o verbo: em vez de recusar, o sistema entrega e situa. Precedente da mesma classe: a faixa de diâmetro por geometria, que também nasceu como bloqueio e virou orientação com alerta (registrada em 04/09/2026).

**3.5 — Existe valor de partida de avanço em furação enquanto a lacuna L-A não fechar?**
O único número disponível é **derivado** — `fn ≈ 0,08·√D`, ajuste de pesquisador sobre dado de fabricante, não valor publicado (§2.1). As opções são oferecê-lo marcado como derivado, ou não oferecer valor de partida de avanço em furação. **O que fecha com confiança alta é negativo** — não usar avanço proporcional ao diâmetro — e isso vale nas duas opções.

---

## 4. Lacunas declaradas

### 4.1 As quatro faixas — divergência real entre territórios, sem vencedor

Nenhuma virou média, e nenhuma virou número único. Entram como faixa e assim devem ser usadas e exibidas.

| # | Grandeza | Faixa | Por que não há vencedor |
|---|---|---|---|
| **F1** | Expoente da lei do avanço na furação, `fn ≈ k·D^a` | **`a` ∈ [0,5 ; 0,8]** | O `[CATÁLOGO]` fez o ajuste log-log explícito (evidência melhor) mas é catálogo-só; o `[HANDBOOK]` tem duas fontes e **não ajustou** — assumiu linear. O dado de handbook aponta mais íngreme (§2.1). **A R9 estreitou sem fechar — ver a nota abaixo** |

> **F1 — o que a R9 acrescentou, e por que ela não fecha a faixa.**
>
> Dois ajustes log-log **independentes**, sobre as duas tabelas de aço rápido da §2.1, dão o expoente
> perto do topo da faixa: **`a` = 0,83** sobre os nove pontos da Sutton (`fn ≈ 0,028·D^0,83`,
> reproduzindo o meio da tabela com erro < 1%) e **`a` = 0,77** sobre a NACHI. Os dois caem do lado do
> `[HANDBOOK]`, contra o `a` = 0,55 do `[CATÁLOGO]`.
>
> **Isto não elege vencedor, e a razão importa.** Os dois ajustes novos são sobre **aço rápido**; o
> `a` = 0,55 foi medido sobre catálogos de **metal duro**. Ninguém mediu os dois substratos no mesmo
> catálogo — então a diferença pode não ser desacordo entre pesquisadores.
>
> **Hipótese, declarada como hipótese:** o expoente da lei do avanço **depende do substrato** — mais
> íngreme em aço rápido, mais raso em metal duro. Se for verdade, F1 nunca teve um lado certo: tinha
> duas populações misturadas.
>
> **O que muda na prática:** a faixa `[0,5 ; 0,8]` **continua valendo e continua sendo faixa**. O que
> mudou foi a pergunta — de "qual dos dois territórios está certo" para "isto é diferença de
> substrato?". **O que fecharia:** um único catálogo que publique avanço por diâmetro para a mesma
> broca nos dois substratos. É a mesma fonte que fecharia a ressalva da §1.5, e ela não foi encontrada.
> **Confiança dos ajustes: `DERIVADO`** — são ajustes sobre dado de fabricante, mesma natureza do
> `0,08·√D`.
| **F2** | `fn` de partida do U-drill em aço | **0,05 a 0,15 mm/rot** | Faixas sobrepostas, `REFERÊNCIA ÚNICA` de cada lado. O que **venceu** dentro deste item é outra coisa: o avanço **não escala com o diâmetro** (§2.1) |
| **F3** | `fn` absoluto do alargador para o aço 1045, Ø20 | **~0,3 a 0,9 mm/rot** | Diâmetros e grupos de material não batem exatamente entre as duas fontes; um dos lados declara extrapolação parcial (§2.1) |
| **F4** | Coeficiente da força de avanço na furação | **`Ff ≈ (0,47–0,63)·kc·(D/2)·fn`** | `SEM CONSENSO` dentro do próprio território de catálogo: dois fabricantes grandes, um com `sin κ` e outro sem, 34% de diferença. A **forma** é `CONSENSO` (§1.4) |

### 4.2 As lacunas — continuam abertas depois das apurações

Seis vieram da R8 (L-A a L-F). **A R9 acrescentou duas, L-G e L-H, ambas do tipo mais forte: o terreno foi varrido e a ausência está caracterizada.** Nenhuma letra foi renumerada.

Três das seis originais são exatamente a fronteira entre os dois territórios: o dado não existe em nenhum dos dois, e cada retorno nomeia o outro como quem o teria.

| # | Lacuna | O que fecharia |
|---|---|---|
| **L-A** | **`fn` de partida de broca helicoidal inteiriça de metal duro — valor absoluto por material.** O `[HANDBOOK]` não separa substrato no avanço; o `[CATÁLOGO]` separa, mas é `SEM CONSENSO` interno (a classe da broca muda o avanço por 2,7×). O `0,08·√D` é a melhor aproximação, e é **derivada** | Tabela de avanço por material **e por classe de broca** de dois fabricantes independentes de broca inteiriça de metal duro, lida diretamente — não ajustada |
| **L-B** | **`fn` de partida de broca de centro / spot drill.** Um ponto isolado no `[CATÁLOGO]` (0,03 mm/rot, sem faixa), nada no `[HANDBOOK]`. Nenhum dos dois tem tabela | Qualquer tabela publicada de avanço de broca de centro por diâmetro × material. É o resultado mais honesto da questão do avanço |
| **L-G** | **A regra de oficina "avanço = 10% da rotação" não tem fonte publicada.** Varredura da R9 em inglês, português e alemão: nenhum manual de fabricante, livro, apostila, norma ou artigo enuncia o avanço como percentual da rotação. O único registro é um thread de fórum, sem autoria e inacessível à leitura direta. **Toda fonte publicada de broca helicoidal expressa o avanço como `fn` em função do diâmetro**; a única família que usa avanço fixo próximo de 0,1 mm/rot é **fresa anular**, que não é broca. A regra equivale a `fn` = 0,1 fixo e cruza a regra publicada dominante (`0,016·D`) em Ø6,3 | Provavelmente nada a pesquisar — a ausência já está caracterizada. **Vira decisão de produto:** a regra é prática declarada do operador, não dado com fonte, e como tal deve ser rotulada onde aparecer. **Ressalva do terreno:** Machinery's Handbook e apostilas SENAI **não** foram lidos em texto integral (paywall); sobre essas duas obras o `NÃO ENCONTRADO` não se pronuncia |
| **L-H** | **O tamanho do passo do pica-pau (o `Q` do ciclo) para broca de aço rápido em aço, com `G83`, não existe publicado.** O que existe é uma escada de **fabricante de máquina** — Haas, e para outro regime: `G73` (retração curta), **refrigeração interna obrigatória**, brocas acima de Ø12, substrato não especificado. Ela publica 1ª picada **2×D**, redução **0,3×D** por picada e mínima **0,13×D**. O canônico de limites e alertas (`§1.4`) diz **quando** picar (3×D sem canal interno, 30×D com) e nunca **quanto** | Tabela de fabricante de **ferramenta** que publique o incremento por diâmetro e material, para retração total. **Evidência de que o dado não existe, e não de busca incompleta:** a Kennametal, no catálogo de brocas **de aço rápido**, publica a tabela de redução de velocidade e avanço em furo profundo (10/20/30/40%) e sobre o pica-pau diz apenas que ele "reduz o empacotamento de cavaco" — **sem valor de `Q`** |
| **L-C** | **Par `(kc1.1, mc)` específico de FURAÇÃO** para os materiais do produto — 1045, inox, alumínio, ferro fundido. Existe **um** par medido, e é para aço C15 (`kv1.1` = 1639,05; `1 − mv` = 0,75). Um fabricante usa `kc1.1/mc` na folha de furação mas remete os valores a um volume que o pesquisador não abriu | **Pendência de fonte recuperável, não lacuna de território**: abrir o volume geral desse fabricante. É a lacuna que destrava a §2.4 e a ressalva de torque da §1.3 |
| **L-D** | ~~**Escada graduada de redução do avanço por faixa de relação profundidade/diâmetro** (3D→5D→8D→12D como multiplicador). Nenhum dos dois territórios tem~~ → **PARCIALMENTE FECHADA pela R9 — ver a nota abaixo.** O que continua sem fonte é a **grade** `3D→5D→8D→12D`; o que deixou de ser verdade é a afirmação de que **nenhuma** escada existe | Uma tabela de fabricante na grade `3D→5D→8D→12D`, ou qualquer fonte que publique o mesmo tipo de broca em vários comprimentos com avanços diferentes. **O que já existe e não é lacuna:** o limiar `3·D` e a redução de 40–50% na saída do furo passante (§1.7); e agora a escada da NACHI, na grade dela |

> **L-D — o que a R9 fechou, e o que ela não fechou. A palavra "parcialmente" carrega peso aqui.**
>
> A NACHI publica uma escada graduada de `vc` **e** de avanço por faixa de profundidade (§2.1). Logo,
> **a afirmação original de L-D — "nenhum dos dois territórios tem" — deixou de ser verdadeira.**
>
> Mas **a grade não é a mesma**, e isso não é detalhe:
>
> | | Grade de L-D | Grade da NACHI |
> |---|---|---|
> | Faixas | `3D` → `5D` → `8D` → `12D` | `≤5×D` · `5–10×D` · `>10×D` |
> | Forma | multiplicador de redução por faixa | tabela própria de `vc` e `fn` por faixa |
> | Grandeza | avanço | **`vc` e avanço, os dois** |
>
> **O que continua sem fonte:** a grade de quatro faixas de L-D, e o multiplicador como forma. Nenhuma
> fonte publica redução do avanço em `8×D` ou `12×D` — a NACHI para em "mais de 10×D" e não subdivide.
>
> **Lacuna que encolhe não é lacuna que morre.** Quem retomar não deve ler esta nota como "L-D está
> resolvida": está resolvida a pergunta "existe escada publicada?" (existe, uma). Continua aberta a
> pergunta "existe a escada na grade que o produto usa?".
| **L-E** | **Teto de rotação de roscamento por sincronismo eletrônico do eixo-árvore** (roscamento rígido), e o erro de sincronismo tolerável em grau ou mm/rot. Está em manual de comando de máquina — fora dos dois territórios | Manual de comando de dois fabricantes de CNC diferentes. **O que já existe e não é lacuna:** o teto de hardware de ~2.500–2.700 rpm (§1.10) |
| **L-F** | **`vc` de macho de METAL DURO em aço.** Não é omissão dos retornos: os dois territórios convergem em que essa ferramenta **quase não existe como produto de prateleira** — o macho de metal duro é de ferro fundido (30–60 m/min) | Provavelmente nada a pesquisar. Vira decisão de produto: não oferecer (§3.2) |

---

## 5. Consequências

**Para o número que o operador vê:**

1. **A velocidade de corte do macho cai de ~140 m/min para 10–18 m/min no aço 1045** — fator **~8**, a maior correção isolada desta rodada. O valor antigo é a velocidade de fresamento de metal duro rotulada como velocidade de macho, e nenhum catálogo de macho de corte publica valor acima de **35 m/min** em material nenhum.
2. **A espessura de cavaco da furação passa a depender do avanço e do ângulo de ponta, não da penetração de trabalho.** O ângulo de ponta deixa de ser entrada morta e passa a alimentar `h → kc → Pc, Mc` — com efeito de **2 a 7%**, não mais que isso.
3. **Some o alerta de espessura abaixo do limite do modelo na furação.** Ele dispararia em praticamente todo furo: o regime `h < 0,1 mm` é o normal, e o limiar equivalente é `fn ≈ 0,21 mm/rot`, **igual para Ø3 e Ø30**. — **08/09/2026:** o alerta sumiu também das outras famílias, por decisão do Mestre (`CANONICO_LIMITES_E_ALERTAS.md` §5, item 1). O achado desta rodada continua correto; ele só deixou de ser um recorte e virou o caso geral.
4. **Some o alerta de avanço a 1,3× do valor de partida.** A régua passa a ser **~2× para cima e ~0,5× para baixo**; entre eles é otimização legítima, e ±25% é a tolerância do próprio ponto de partida.
5. **Entra um alerta que não existia: a saída do furo passante.** Reduzir o avanço para 40–50% cerca de 1 mm antes do rompimento — é onde a broca lasca.
6. **O avanço do roscamento deixa de ser ajustável.** É `vf = P · n`, calculado, não informado.
7. **A profundidade de corte do mandrilamento deixa de ser informada.** Entram os dois diâmetros; ela é resultado. Informada a partir do anel do cabeçote, que é graduado em diâmetro, entra com **fator 2** de erro.

**Para quem for escrever o motor:**

8. **A cadeia de torque e potência da furação não é uma cadeia nova.** `Mc = kc·fn·D²/8` e `Pc = kc·fn·D·vc/240000` são a cadeia geral do projeto (`Pc = Q·kc/60000`, `Mc = 9549·Pc/n`) especializada para furação com `Q = D·fn·vc/4` — a substituição fecha **exata**, sem resíduo, verificada durante a redação deste canônico. O que a rodada acrescenta é a **procedência** (três fontes, dois territórios) e a ressalva do braço da força.
9. **A taxa de remoção do mandrilamento é a coroa entre dois diâmetros, e só ela.** Reaproveitar a fórmula da furação superestima de **5,8× a 23×** em passadas de acabamento — e essa fórmula errada está publicada numa folha de mandrilamento de fabricante.
10. **A correção `(1 − ap/Dc)` entra uma vez só.** Aplicada junto com o diâmetro médio na velocidade de corte, é contagem dupla.
11. **A família "roscar" tem duas origens de dado opostas.** Macho puxa de tabela própria por material × passo; fresa de rosca puxa da tabela de fresamento. Uma não se deriva da outra.
12. **A broca de metal duro precisa de classe, não só de substrato.** Um seletor único erra até **2,7×** no avanço dentro do próprio metal duro.
13. **O par `(kc1.1, mc)` que hoje alimenta a furação é de torneamento, e subestima.** 27% do torque de furação medido não é corte de aresta principal. Enquanto a lacuna L-C não fechar, o resultado da furação sai **para o lado conservador do errado** — número menor que o real.

**Para o alcance deste documento:**

14. **Fresamento não muda.** Nenhuma fórmula, constante ou limiar dos seis canônicos anteriores é alterado por esta rodada. O que muda é que eles deixam de ser lidos como se valessem para as quatro famílias — sempre foram de fresamento, e agora existe onde ler as outras três.

---

## 6. Emendas necessárias em outros documentos

**Esta seção é lista, não ação.** Cada linha traz o documento, o que estava escrito e o que a R8 exigiu.
*(Aplicação concluída em 07/09/2026: emendas A1–A9 aplicadas nos canônicos e B1–B6 fora deles, resolvendo a contradição entre os documentos. Tabela mantida para rastreabilidade histórica).*

### 6.1 Nos canônicos

| # | Documento | O que está escrito hoje | O que a R8 exige | Origem |
|---|---|---|---|---|
| A1 | **Canônico do Motor de Cálculo** — cabeçalho e cadeia de cálculo | O Status já declara o escopo "para fresamento com fresa inteiriça de metal duro", mas a cadeia de cálculo é apresentada sem contraparte para as outras famílias | Uma linha de fronteira: furação, roscamento e mandrilamento têm cadeia própria, e ela é este canônico. **Sem alterar nenhuma fórmula de fresamento** | D2 |
| A2 | **Canônico do Motor de Cálculo** — piso de espessura de cavaco modelável | "O modelo de Kienzle não é adequado a `h < 0,1 mm`… **Piso de travamento:** `h = 0,02 mm`", enunciado sem qualificar a família | Qualificar por família: em **fresamento** o enunciado vale como está; em **furação** o regime `h < 0,1 mm` é o normal, o limiar equivalente é `fn ≈ 0,21 mm/rot` e **não depende do diâmetro** | M5 |
| A3 | **Canônico do Motor de Cálculo** — lacunas declaradas | A lacuna sobre a não-transferibilidade do par `(kc1.1, mc)` entre faixas de `h` está escrita para fresamento | Acrescentar a lacuna irmã: não existe par medido **em furação** para os materiais do produto, e o par de torneamento subestima o torque de furação (27% do torque não é corte de aresta principal) | D6, L-C |
| A4 | **Canônico de Limites, Alertas e Bloqueios** — consequências, item 1 | "…o alerta que resta nessa faixa é o de espessura média abaixo do limite do modelo de cálculo" | Recortar por família: esse alerta é de **fresamento**. Em **furação não dispara** — dispararia em ~100% dos furos | M5 |
| A5 | **Canônico de Limites, Alertas e Bloqueios** — velocidade de corte, alerta de "velocidade fora da faixa de partida" | Dispara em `Vc < 0,6 × Vc_partida` ou `Vc > 1,4 × Vc_partida`, sem recorte por família | No **roscamento com macho** o limiar de alerta é **teto absoluto** (~40 m/min para macho de corte, ~60 para conformação), não afastamento relativo, e o alerta é de **nível máximo com o número entregue**. Para fresa de rosca continua valendo a régua de fresamento | M6 |
| A6 | **Canônico de Limites, Alertas e Bloqueios** — regras de alerta da família Roscar | Não existe regra de alerta por material para o macho de conformação | Alerta novo, **no nível mais grave, com o número entregue**: macho de conformação em ferro fundido, aço acima de 350 HB, aço temperado, inox endurecível por precipitação ou Ti-6Al-4V. A mensagem nomeia o mecanismo (o material não escoa plasticamente) — **nunca recusa o resultado**, pela regra de 27/08/2026 já vigente (§3.4) | M9 |
| A7 | **Canônico de Limites, Alertas e Bloqueios** — regras de alerta da família Furar | Existe o alerta de furo profundo (`3×D` sem canal interno, `30×D` com), e **não existe** alerta de avanço | Dois alertas novos: (a) avanço fora de **~2× / ~0,5×** do valor de partida; (b) redução de avanço na **saída de furo passante**, 40–50% cerca de 1 mm antes do rompimento. O limiar `3×D` **não muda** | M15, M16 |
| A8 | **Canônico de Ferramentas e Substratos** — lacunas | Lacuna registrada: "substrato padrão de macho, e a diferença entre macho de corte e de conformação em números" | **Fecha parcialmente** com a §2.2 deste canônico (macho de corte 10–18 m/min em 1045; conformação 45,1; razão 2,5–3×). Continua aberta só a parte de macho de metal duro em aço (L-F) | M7, M8, L-F |
| A9 | **Canônico de Ferramentas e Substratos** — lacunas | Lacuna registrada: divisão prática aço rápido × metal duro em broca, por faixa de diâmetro e material | Não fecha, mas **muda de forma**: a divisão que falta não é só de substrato, é de **classe dentro do metal duro** (uso geral × alto desempenho, 1,3–2,7× de diferença no avanço) | M17 |

### 6.2 Fora dos canônicos

| # | Documento | O que está escrito hoje | O que a R8 exige | Origem |
|---|---|---|---|---|
| B1 | **Registro de questões abertas de construção** — Q5 (avanço por rotação de partida) | "Duas descrições incompatíveis do mesmo valor": um lugar diz "padrão do tipo" (número tabelado), outro diz "derivado" (fórmula) | **A contradição é falsa** — as duas descrevem a mesma coisa, porque a tabela **é** a regra. O que o documento deve dizer é: **regra sublinear no diâmetro**. O que continua faltando não é a forma, é o valor absoluto (L-A) | D1 |
| B2 | **Registro de questões abertas de construção** — Q5, valor provisório | Um valor provisório de **0,20 mm/rot** foi adotado para não travar o desenho, marcado como placeholder devendo fonte | Continua sem fonte publicada, mas agora tem contexto: fica **praticamente em cima do limiar** `fn ≈ 0,21 mm/rot`, ou seja, no único ponto da faixa onde a furação **não** está no regime `h < 0,1 mm`. É atípico para furação de oficina. Substituição possível: `fn ≈ 0,08·√D`, **derivado** (§2.1) | M12, L-A |
| B3 | **Registro de questões abertas de construção** — Q6, Q8, Q9 | Abertas | **Fechadas por esta rodada**: Q6 (espessura de cavaco em furação) pela §1.1; Q8 (velocidade de corte no macho) pelas §1.8 e §2.2; Q9 (taxa de remoção em mandrilamento) pela §1.12 | fechamento da R8 |
| B4 | **Especificação do MVP** — tabela de taxa de remoção | Duas linhas apenas: Fresar e Furar (`Q = (D × fn × Vc)/4`) | Falta a linha de **Mandrilar**, e a linha de Furar **não pode** ser reaproveitada para ela: erro de **5,8× a 23×**. A fórmula correta está na §1.12 | M3 |
| B5 | **Especificação do MVP** — cadeia de furação | `Vf = fn × n` e `Q = (D × fn × Vc)/4` já estão corretas para furação | Nada a corrigir nessas duas. O que **entra** é a espessura de cavaco de furação (§1.1) como elo entre `fn` e `kc`, que hoje não existe na cadeia | M1, D2 |
| B6 | **Glossário de termos** | Não tem `σ` (ângulo de ponta), `Ff` (força de avanço), `h` (espessura de cavaco não deformada — só `hex`, `hm` e `hmin`, que são de fresamento), nem os diâmetros inicial e final do mandrilamento | Quatro entradas novas. `z` da furação é o mesmo `Z` (número de arestas) já dicionarizado; vale a nota de que em broca helicoidal `z = 2` e em mandrilamento por passos `z = 1` | nomenclatura |

### 6.3 O que ficou de fora deste canônico, e para onde vai

| Item | Por que não entra num canônico | Para onde vai |
|---|---|---|
| **D7 — avisos de implementação sobre erratas das fontes:** (a) a folha de mandrilamento de um fabricante publica a fórmula de taxa de remoção da **furação**, por reaproveitamento de página; (b) a página de mandrilamento de outro tem duas erratas — legenda de furação numa página de mandrilamento, e uma fórmula de torque com o divisor trocado | Canônico é especificação funcional: **o que o sistema calcula e por quê, nunca como**, e não instrui quem implementa sobre como ler fonte | **Registro de decisões de construção** — é lá que mora o que o canônico não pode conter. O **efeito** dessas erratas já está preservado aqui: a fórmula errada e o tamanho do erro estão na §1.12, e a nota sobre a folha reaproveitada, na §2.4 |
| **O verbo de recusa** com que o retorno de pesquisa descreveu o teto do macho e o material que descarta o macho de conformação | É linguagem de pesquisa. A regra de produto que a traduz **já existia** em 27/08/2026 e não é achado desta rodada: nada no sistema recusa entregar resultado — a natureza do limite governa o nível do alerta, nunca se o número aparece | Traduzido na **§3.4** deste canônico, com a data da decisão original, e virado alerta de nível máximo nas emendas **A5** e **A6**. Os patamares, a lista de materiais e o mecanismo — que é o que a pesquisa mediu — continuam íntegros nas §1.8 e §2.2 |

---

## Anexo — mapa de cobertura da R8

Rastreabilidade, não conteúdo: onde cada item do fechamento da rodada foi parar neste documento. Serve para conferir cobertura sem reler as duas peças lado a lado.

**Consertos de motor de cálculo (18):**

| Item | Onde | Item | Onde |
|---|---|---|---|
| **M1** espessura de cavaco em furação | §1.1 | **M10** velocidade de avanço do roscamento travada | §1.9 |
| **M2** torque e potência em furação | §1.3 | **M11** profundidade de corte do mandrilamento | §1.11 |
| **M3** taxa de remoção do mandrilamento | §1.12 | **M12** avanço sublinear na furação | §1.5 · §2.1 · §4.1 F1 |
| **M4** velocidade de corte no diâmetro final | §1.13 | **M13** avanço do U-drill não escala | §2.1 · §4.1 F2 |
| **M5** alerta de espessura desligado em furação | §1.2 · §6 A2, A4 | **M14** alargador e escareador | §2.1 · §4.1 F3 |
| **M6** velocidade do macho é tabela própria | §1.8 · §6 A5 | **M15** redução na saída do furo passante | §1.7 · §6 A7 |
| **M7** velocidade do macho de corte em 1045 | §2.2 | **M16** faixa de segurança do avanço | §1.6 · §6 A7 |
| **M8** velocidade do macho de conformação | §2.2 | **M17** classe da broca de metal duro | §2.1 · §3.3 · §6 A9 |
| **M9** material que descarta o macho de conformação | §2.2 · §3.4 · §6 A6 | **M18** força de avanço | §1.4 · §4.1 F4 |

**Consertos de documento (7):**

| Item | Onde |
|---|---|
| **D1** a contradição tabela × fórmula do avanço é falsa | §6 B1 |
| **D2** furação não tem penetração de trabalho radial | §1.1 · §6 A1 |
| **D3** a família roscar tem duas cinemáticas com origens opostas | §1.8 |
| **D4** não citar como autoridade viva a norma cancelada | §2.4 |
| **D5** a coluna de rosqueamento do handbook roda ~2× acima | §2.4 |
| **D6** questão aberta do par de constantes de furação | §2.4 · §4.2 L-C · §6 A3 |
| **D7** avisos de implementação sobre erratas das fontes | **fora deste canônico, com razão e destino declarados na §6.3** — o efeito das erratas está preservado na §1.12 e na §2.4 |

**Faixas sem vencedor (4):** F1 a F4, §4.1 — e cada uma também no lugar onde é usada (§1.4, §1.5, §2.1).
**Lacunas (6):** L-A a L-F, §4.2.
