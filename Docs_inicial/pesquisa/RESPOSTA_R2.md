# RESPOSTA R2 — Motor de Cálculo: cavaco, força e potência

**Território de fonte deste pesquisador:** literatura acadêmica, normas técnicas e handbooks de engenharia.
**Proibido neste retorno:** catálogo, guia técnico ou calculadora de fabricante de ferramenta; distribuidor; blog; fórum; software comercial.
**Consequência:** toda questão que pergunta "o que o fabricante publica" será respondida como LACUNA declarada, com o nome da fonte que teria o dado.

**Rótulos:** `CONSENSO` (3+ fontes de fato independentes) · `REFERÊNCIA ÚNICA` (1 fonte, ou N textos citando a mesma origem) · `SEM CONSENSO` · `NÃO ENCONTRADO` · `LACUNA` (o dado existe, mas fora do meu território).

**Status:** fechado. 3 questões, 18 subitens, 18 lacunas declaradas.

---

## 1 — Fórmula de afinamento de cavaco: qual das duas usar

**Veredito:** As duas fórmulas **não são concorrentes e nenhuma é aproximação da outra** — elas corrigem grandezas diferentes. `CTF = 1/√[1−(1−2ae/D)²]` preserva a espessura **máxima** de cavaco (`hex`); `fz/√(ae/D)` preserva a espessura **média** (`hm`). O fator ~1,8× entre elas não é erro de aproximação: é a razão física `hex ≈ 2·hm` em engajamento radial baixo. Além disso, **o número 1,41 citado no enunciado para `ae/D = 0,20` está errado** — a fórmula exata dá **1,25**.

**Confiança:** `CONSENSO` para a geometria (derivação fechada, verificável, coerente em três fontes acadêmicas independentes) · `LACUNA` para "o que cada fabricante publica".

---

### 1b (respondida antes de 1a porque é a que resolve o resto) — as duas são a mesma coisa? Derivação

**Geometria de partida.** Fresa de raio `R = D/2`, `Z` dentes, avanço por dente `fz`, engajamento radial `ae ≤ R`. Com a aproximação clássica de trajetória circular do dente (Martellotti mostrou que a trajetória real é trocoidal e que, para `fz << R`, o erro da aproximação circular é desprezível), a espessura instantânea de cavaco na posição angular `φ` é:

```
h(φ) = fz · sin(φ) · sin(κ)          (κ = ângulo de posição; κ = 90° em fresa de topo reto)
```

O engajamento vai de `φ = 0` até `φmax`, com:

```
cos(φmax) = (R − ae)/R = 1 − 2·ae/D
```

**Ramo 1 — espessura máxima.** `hex = fz · sin(φmax) = fz · √[1 − (1 − 2ae/D)²]`.
Para manter `hex` igual ao valor nominal recomendado:

```
CTF_hex = fz_programado / hex_alvo = 1 / √[1 − (1 − 2ae/D)²]        ← fórmula 1 do enunciado
```

Isto é **identidade trigonométrica exata**, não aproximação. Não há erro a estimar.

**Ramo 2 — espessura média.** Média de `h(φ)` sobre o arco engajado:

```
hm = (1/φmax) · ∫₀^φmax fz·sin(φ)·sin(κ) dφ = fz · sin(κ) · (1 − cos φmax)/φmax
   = fz · sin(κ) · (2·ae/D) / arccos(1 − 2·ae/D)                     [φmax em radianos]
```

Equivale à forma `hm = (360 · ae · fz · sin κ) / (π · D · φs)` com `φs` em graus — verifiquei algebricamente que uma reduz à outra (`φs_deg = φmax_rad·180/π`).

**Ramo 2, aproximação.** Para `ae/D` pequeno, `cos φmax ≈ 1 − φmax²/2` ⟹ `φmax ≈ 2√(ae/D)`. Substituindo:

```
hm ≈ fz · sin(κ) · (2ae/D)/(2√(ae/D)) = fz · sin(κ) · √(ae/D)
```

Invertendo: `fz = hm_alvo / [√(ae/D) · sin κ]` — **exatamente a "fórmula 2" do enunciado**.

**Conclusão da derivação.** A fórmula 2 é aproximação de **`hm`**, não de `hex`. As duas respondem perguntas diferentes:

| | Grandeza preservada | Uso físico correto |
|---|---|---|
| `1/√[1−(1−2ae/D)²]` | `hex` — pico de carga na aresta | dimensionar carga de cavaco / integridade da aresta |
| `1/√(ae/D)` | `hm` — média energética | alimentar `kc` de Kienzle e potência |

**Relação assintótica.** Para `ae/D → 0`: `hex → 2·fz√(ae/D)` e `hm → fz√(ae/D)`, portanto **`hex/hm → 2`**. Não existe faixa de `ae/D` em que as duas convirjam: em `ae/D = 0,50` a razão já é `π/2 ≈ 1,571` e cresce monotonicamente até 2.

> Base: **Martellotti, M. E., "An Analysis of the Milling Process", Transactions of the ASME, vol. 63, 1941, p. 677–700** (trajetória trocoidal do dente; redução à aproximação circular) — origem acadêmica primária do modelo `h(φ) = fz·sinφ`. A derivação acima é fechada e conferível; não depende de fonte de fabricante.

---

### 1c — Tabela comparativa e erro relativo

Valores calculados por mim (script Python, `math.acos`), não copiados de nenhuma fonte:

| `ae/D` | A) `1/√[1−(1−2ae/D)²]` (preserva `hex`) | B) `1/√(ae/D)` (aprox. de `hm`) | C) `hm` exato: `φmax/(2·ae/D)` | Erro de B contra C (alvo real de B) | Razão B/A |
|---|---|---|---|---|---|
| 0,50 | 1,0000 | 1,4142 | 1,5708 | **−9,97 %** | 1,414 |
| 0,40 | 1,0206 | 1,5811 | 1,7118 | −7,63 % | 1,549 |
| 0,30 | 1,0911 | 1,8257 | 1,9321 | −5,51 % | 1,673 |
| 0,25 | 1,1547 | 2,0000 | 2,0944 | −4,51 % | 1,732 |
| 0,20 | **1,2500** (não 1,41) | 2,2361 | 2,3182 | −3,54 % | 1,789 |
| 0,10 | 1,6667 | 3,1623 | 3,2175 | −1,72 % | 1,897 |
| 0,05 | 2,2942 | 4,4721 | 4,5103 | −0,85 % | 1,949 |
| 0,02 | 3,5714 | 7,0711 | 7,0949 | −0,34 % | 1,980 |

**Três achados:**

1. **O enunciado tem erro numérico.** `1/√[1−(1−2·0,20)²] = 1/√0,64 = 1,25`, não 1,41 (1,41 corresponde a `ae/D = 0,146`). Logo a divergência real entre as duas fórmulas em `ae/D = 0,20` não é 58 % — é **79 %** (2,236/1,250). O erro está **subdimensionado** no diagnóstico atual do projeto.
2. **A fórmula B é aproximação excelente — do alvo dela.** O erro de `1/√(ae/D)` contra o `hm` exato é ≤ 4,5 % abaixo de `ae/D = 0,25` e ≤ 10 % no pior caso (`ae/D = 0,50`). **B não diverge em engajamento baixo — ela melhora.** Quem "diverge" é a comparação B×A, que compara grandezas diferentes.
3. **A divergência cresce ao contrário do que o diagnóstico supõe.** A razão B/A é 1,41 em `ae/D = 0,50` e vai a 1,98 em `ae/D = 0,02`.

**Resposta direta a "a partir de que `ae/D` a aproximação diverge o suficiente":** como formulada, a pergunta não tem resposta — a premissa (uma é aproximação da outra) é falsa. A pergunta que tem resposta: **acima de `ae/D ≈ 0,40` a correção de `hex` é ≤ 2 % e some dentro da margem de ±15–25 %; abaixo de `ae/D ≈ 0,25` ela passa de 15 % e vira decisão de processo.**

---

### 1d — O erro vai para o lado seguro ou perigoso?

**Perigoso — e mais perigoso do que o projeto estima.**

Se a base de `fz` do sistema for carga de cavaco no sentido de **espessura máxima** (sentido em que "avanço por dente recomendado" costuma ser entendido em oficina), aplicar `fz/√(ae/D)` programa avanço **1,41× a 1,98× maior** que o necessário. Em `ae/D = 0,20` isso é **+79 % de `fz`**, propagando para:

- `hex` real 1,79× acima do alvo ⟹ força por dente ∝ 1,79^(1−mc) ≈ **1,65×** (com `mc = 0,155`);
- `Vf`, `Q` e `Pc` 1,79× maiores;
- deflexão radial ∝ força ⟹ ~65 % maior (entra em R6);
- risco dominante: **lascamento de aresta e quebra de fresa inteiriça de diâmetro pequeno**, não desgaste.

O erro oposto (usar A quando o alvo era `hm`) subestimaria o avanço em ~44 % em `ae/D = 0,20` — ferramenta **esfrega** (`h` abaixo da espessura mínima de cavaco, ver 2f): encruamento, calor na aresta, desgaste de flanco acelerado, **sem quebra imediata**. Assimetria: errar para B é catastrófico e rápido; errar para A é caro e lento.

**Consequência operacional:** o gatilho da decisão não é estética de fórmula, é **qual grandeza a base de `fz` do sistema representa**. Sem essa definição fixada, qualquer das duas está tecnicamente indefinida.

---

### 1e — Existe formulação mais correta que ambas?

**Sim, e é obrigatória para topo toroidal e esférico — por outro motivo que não o afinamento radial.**

**(i) Ângulo de posição `κ` — afinamento axial.** Já está na derivação de 1b: `h = fz·sin(φ)·sin(κ)`. Topo reto: `κ = 90°`, `sin κ = 1` (some). Toroidal com `ap < rε` e esférica: `κ` varia ao longo da aresta e o `sin κ` efetivo é o que importa. Mesmo mecanismo do afinamento, só que axial — e **multiplicativo** com o radial: os dois fatores se compõem, não se substituem.

**(ii) Diâmetro efetivo — obrigatório em esférica.** Fresa esférica de raio `R = D/2` com `ap < R`: só a calota corta, e o diâmetro que entra em `n = Vc·1000/(π·D)` **não é `D`**:

```
Deff = 2·√[ap·(D − ap)]        (ap ≤ D/2, eixo perpendicular à superfície)
```

Quantificando: Ø6 mm com `ap = 0,3 mm` ⟹ `Deff = 2√(0,3·5,7) = 2,62 mm`. Usando `D = 6`, a velocidade de corte real é **44 % da programada** (erro de −56 % em `Vc`) — muito fora dos ±15–25 %. **Isto pesa mais que toda a discussão de afinamento de cavaco.** A fórmula sai de geometria elementar (corda do círculo na altura `ap`) e não depende de catálogo.

**(iii) Formulação completa.** O "mais correto que ambas" é não usar fator e integrar:

```
Fc_média = (Z/2π)·∫₀^φmax kc(h(φ))·b(φ)·h(φ) dφ
```

Modelo mecanístico padrão da literatura de fresamento (mesma base dos modelos de estabilidade/chatter). **Não vale a complexidade numa calculadora de oficina:** o ganho contra `kc(hm)·Q` é de poucos por cento, dentro dos ±15–25 %, enquanto o erro de `Deff` acima é de 56 %.

**Veredito 1e:** implementar `Deff` (obrigatório) e `sin κ` (uma multiplicação); **não** implementar integração mecanística.

---

### 1f — O gatilho `ae < 50 % D` está correto?

**Correto e exato — não é convenção.** `cos φmax = 1 − 2ae/D` dá `φmax = 90°` exatamente em `ae = D/2`; acima disso o dente passa pelo ponto de espessura máxima e `hex = fz·sin κ` (o fator satura em 1,0). Abaixo, o fator é matematicamente > 1. Logo `ae < 50 % D` é o limiar **geométrico correto**, sem margem de escolha.

O "25 %" que circula como início prático **não é outro limiar** — é onde a correção fica grande o bastante para mudar o processo (`ae/D = 0,25` ⟹ +15,5 %, na fronteira da margem declarada; `ae/D = 0,40` ⟹ só +2,1 %). Recomendação: **aplicar sempre abaixo de 0,50** (é exato e barato) e **avisar o operador abaixo de 0,25**, porque é onde o avanço programado começa a se afastar visivelmente da tabela que ele conhece.

---

### LACUNA da Questão 1 (item 1a e parte de 1f)

"Qual das duas os fabricantes publicam, com fonte primária de pelo menos dois fabricantes" **não pode ser respondido no meu território**. As fontes que teriam o dado — guias técnicos e calculadoras de Sandvik Coromant, Seco, Walter, Iscar, Kennametal, Mitsubishi, OSG — estão explicitamente fora do meu escopo. Evidência *indireta* que consigo de dentro do território:

- a literatura de otimização de dados de corte registra que a maioria dos sistemas estabelecidos de determinação de dados de corte se apoia na **espessura equivalente de Woxén** — sinal de que a linha `hm`/equivalente domina a prática industrial (Ståhl, Schultheiss & Hägglund, 2012);
- um artigo revisado por pares afirma textualmente que os valores de `kc1.1` e `mc` "podem ser encontrados nos catálogos dos fabricantes de ferramenta de corte e em livros", usando `mac.walter-tools.com` como referência numérica (Stanojković et al., FACTA UNIVERSITATIS Mech. Eng., DOI 10.22190/FUME241129010S) — confirma que a origem primária dos números de rotina é catálogo, não literatura.

---

### Entrega da Questão 1

- **Fórmula a implementar:** as duas, com papéis separados e nomes distintos no código — `f_hex(ae,D) = 1/√[1−(1−2ae/D)²]` para converter carga de cavaco alvo em `fz` programado, e `hm(fz,ae,D,κ) = fz·sinκ·(2ae/D)/arccos(1−2ae/D)` (forma exata) para alimentar Kienzle. **Não usar a aproximação `√(ae/D)`**: a forma exata custa um `arccos` e elimina até 10 % de erro.
- **Faixa de validade declarada:** `0 < ae/D ≤ 0,50`; em `ae/D > 0,50`, `f_hex = 1,0`. Piso inferior definido pela espessura mínima de cavaco (Questão 2f), não pela geometria.
- **Aviso ao operador:** sim, abaixo de `ae/D = 0,25`.
- **Correção urgente fora do escopo literal da pergunta:** `Deff` em fresa esférica/toroidal (1e-ii), impacto de até −56 % em `Vc`.

**Fontes da Questão 1**
- Martellotti, M. E. — *An Analysis of the Milling Process* — Transactions of the ASME, vol. 63, 1941, p. 677–700; Parte II, vol. 67, 1945, p. 233–251. `CONSENSO` (referenciado em revisões de modelagem de fresamento como o modelo de espessura de cavaco mais antigo e mais usado).
- Ståhl, J.-E.; Schultheiss, F.; Hägglund, S. — *Analytical Calculation of the True Equivalent Chip Thickness for Cutting Tools and its Influence on the Calculated Tool Life* — Advanced Materials Research, vol. 576, 2012, p. 80–86, Trans Tech Publications. https://www.scientific.net/AMR.576.80 · registro no repositório da Lund University: https://lup.lub.lu.se/search/publication/dedd8db4-f27d-4cdf-8a9a-684f6490e617 — `REFERÊNCIA ÚNICA` para a afirmação sobre erro de até ~40 % da espessura equivalente no acabamento.
- Woxén, R. — *A Theory and an Equation for the Life of Lathe Tools* — Ingeniörsvetenskapsakademiens Handlingar nr 119, Estocolmo, 1932. **Procedência importante:** o conceito de Woxén é de **torneamento** (retificação do raio de ponta num retângulo equivalente). A fórmula `fz/√(ae/D)` do enunciado **não é de Woxén** — é a aproximação de `hm` em fresamento derivada em 1b. A atribuição no documento do projeto está incorreta.
- Denkena, B. (Prof.) / IFW — *Versuch: Zerspankraftmessung beim Drehen*, Allgemeines Maschinenlabor, Institut für Fertigungstechnik und Werkzeugmaschinen, Leibniz Universität Hannover, SoSe 2022. https://www.ifw.uni-hannover.de/fileadmin/pzh-ifw/Vorlesungen/AML_Zerspankraftmessung_Skript_SoSe_2022.pdf
- Cálculos da tabela 1c: meus, reproduzíveis (`1/sqrt(1-(1-2r)**2)`, `1/sqrt(r)`, `acos(1-2r)/(2r)`).

---

## 2 — Qual espessura `h` entra na equação de Kienzle

**Veredito:** **Espessura média `hm`** — e isto não é convenção, é demonstrável: usar `hm` reproduz a força média exata (integrada ao longo do arco engajado) com erro de **2 % a 4 %**, enquanto usar `hex` **superestima a força e a potência em 45 % a 82 %**. Nenhuma das duas é "a que o fabricante escolheu": é o que a integral obriga.

**Confiança:** `CONSENSO` para "média, não máxima" (a integral é fechada e verificável; a literatura de teoria de corte formula o cálculo de força em fresamento sobre `hm`) · `LACUNA` para "existe divergência entre fabricantes nisso".

---

### 2a — `hm` ou `hex`? Prova quantitativa

A força de corte instantânea por dente, com Kienzle, é `Fc(φ) = kc1.1 · h(φ)^(1−mc) · b`. A média sobre o arco engajado é:

```
Fc_média_exata = kc1.1 · b · fz^(1−mc) · (1/φmax) ∫₀^φmax sin^(1−mc)(φ) dφ
```

A prática de engenharia substitui isso por `Fc = kc1.1 · b · h_eq^(1−mc)` com um `h_eq` único. A pergunta "qual `h`" é, portanto: **qual `h_eq` reproduz a integral?**

Integrei numericamente (Simpson, 20 000 passos) e comparei os dois candidatos:

| `mc` | `ae/D` | `hm/fz` | `hex/fz` | Exato ÷ usando `hm` | Exato ÷ usando `hex` |
|---|---|---|---|---|---|
| 0,155 | 0,50 | 0,6366 | 1,0000 | **0,980** | 0,669 |
| 0,155 | 0,30 | 0,5176 | 0,9165 | **0,977** | 0,603 |
| 0,155 | 0,20 | 0,4314 | 0,8000 | **0,976** | 0,579 |
| 0,155 | 0,10 | 0,3108 | 0,6000 | **0,975** | 0,559 |
| 0,155 | 0,05 | 0,2217 | 0,4359 | **0,974** | 0,550 |
| 0,250 | 0,50 | 0,6366 | 1,0000 | **0,970** | 0,692 |
| 0,250 | 0,20 | 0,4314 | 0,8000 | **0,964** | 0,607 |
| 0,250 | 0,05 | 0,2217 | 0,4359 | **0,962** | 0,579 |

**Leitura:** com `hm`, o modelo erra de −2 % a −4 % (subestima levemente, sempre na mesma direção — dá para corrigir com um fator fixo de 1,03 se alguém quiser). Com `hex`, o modelo erra de **+45 % a +82 %** (0,55 a 0,69 ⟹ 1/0,55 = 1,82). Para uma calculadora com margem declarada de ±15–25 %, **`hex` está fora da margem por si só, em todo o domínio.**

**Portanto:** `hm` para força/potência. `hex` tem outro uso legítimo — é o pico que dimensiona integridade de aresta e é a grandeza correta para a carga de cavaco recomendada (Questão 1) — mas **não entra em Kienzle**.

**LACUNA (2a, parte):** "qual das duas os fabricantes usam ao publicar cálculo de potência de fresamento e se há divergência entre eles" está fora do meu território. As fontes que teriam o dado são os guias técnicos de Sandvik Coromant, Seco, Walter, Kennametal, Iscar e Mitsubishi. Dentro do meu território, a formulação de força em fresamento parte de `hm` — ver König/Klocke abaixo.

---

### 2b — Fórmula de `hm` em fresamento periférico

Forma exata (derivada em 1b, integração de `h(φ) = fz·sinφ·sinκ` sobre o arco):

```
hm = fz · sin(κ) · (2·ae/D) / arccos(1 − 2·ae/D)          [arccos em radianos]
```

Forma equivalente com o ângulo de engajamento em graus (`φs`), que é como a literatura de oficina costuma escrever:

```
hm = (360 · ae · fz · sin κ) / (π · D · φs)          com  φs = arccos(1 − 2ae/D) em graus
```

Aproximação usual, válida para `ae/D` pequeno (erro ≤ 4,5 % abaixo de `ae/D = 0,25`, ≤ 10 % em `ae/D = 0,50` — tabela em 1c):

```
hm ≈ fz · sin(κ) · √(ae/D)
```

**Recomendação:** implementar a forma exata. Um `arccos` não pesa e elimina o erro de 10 %.

**Observação de escopo:** esta é a `hm` de **fresamento periférico com engajamento simétrico ao raio** (fresa de topo, aresta reta, `κ` constante). Para topo esférico e toroidal com `ap` rasa, `κ` varia ao longo da aresta e a expressão acima precisa do `κ` efetivo — e o `D` precisa virar `Deff` (item 1e-ii). Esse caso não tem forma fechada simples; é `LACUNA` parcial no meu território (ver "Lacunas declaradas").

---

### 2c — Contagem dupla: onde cada efeito atua

**Não há contagem dupla se a correção for aplicada uma única vez, no lugar certo — mas o risco é real e assimétrico.**

O ponto que resolve a confusão: `CTF` e `hm` **não são dois efeitos**. São a mesma geometria, usada em dois sentidos opostos:

- `CTF` (Questão 1) é usado **de trás para frente**: dada uma espessura de cavaco alvo, qual `fz` programar.
- `hm` é usado **para frente**: dado o `fz` que efetivamente vai para o CNC, qual espessura o cavaco realmente tem.

Se você programa `fz_prog` para restaurar a espessura alvo e depois calcula `hm(fz_prog)`, os dois se cancelam **e é isso que tem que acontecer**: quando o operador compensa o afinamento, o cavaco **deixa de ser fino**, e portanto `kc` **não sobe**. A compensação e o `kc` alto são mutuamente exclusivos por construção.

Consequência prática que vale escrever no código como comentário: **`kc` só sobe quando a compensação NÃO é aplicada** — porque bateu no limite de `Vf` da máquina, porque o operador travou o avanço, ou porque o sistema decidiu não compensar acima de `ae/D = 0,5`.

**Os dois erros de implementação possíveis, quantificados** (`ae/D = 0,20`, `mc = 0,155`):

| Erro | O que acontece | Efeito na potência calculada |
|---|---|---|
| Aplicar o fator duas vezes (`h = fz_prog / √(ae/D)`) | `h` inflado por `1/(ae/D)` = 5× | `kc` cai por `5^(−0,155)` ⟹ potência **−22 %** |
| Calcular `h` a partir do `fz` nominal, mas `Vf`/`Q` a partir do `fz_prog` | `h` reduzido por `(ae/D)` | `kc` sobe por `0,2^(−0,155)` ⟹ potência **+28 %** |
| Correto (`h = hm(fz_prog)`) | — | referência |

**Regra de implementação em uma linha:** *a geometria de afinamento entra exatamente uma vez, na conversão "espessura alvo → `fz` programado"; daí para frente tudo se calcula do `fz` programado com as fórmulas cruas.*

---

### 2d — Ordem correta da cadeia

```
0.  entrada: Vc, carga de cavaco alvo h_alvo, ae, ap, D, Z, κ  (h_alvo é ESPESSURA, não avanço)
1.  Deff = D                       se topo reto
    Deff = 2·√[ap·(D − ap)]        se esférica com ap < D/2          ← 1e-ii
2.  n  = (Vc · 1000) / (π · Deff)                                     [rpm]
3.  ε  = ae/Deff ;  φmax = arccos(1 − 2ε)  (se ε ≥ 0,5 ⟹ φmax = π/2 e o passo 4 usa f_hex = 1)
4.  f_hex = 1/√[1 − (1 − 2ε)²]                                        ← Questão 1, aplicado UMA vez
5.  fz_prog = h_alvo · f_hex / sin κ                                  [mm/dente]
6.  Vf = fz_prog · Z · n                                              [mm/min]
7.  hm = fz_prog · sin κ · (2ε) / φmax                                ← forma exata, Questão 2b
8.  hm_efetivo = max(hm, h_piso)                                      ← Questão 2f
9.  kc = kc1.1 · hm_efetivo^(−mc)                                     [N/mm²]  ← Questão 3
10. Q  = (ap · ae · Vf)/1000                                          [cm³/min]
11. Pc = (Q · kc)/60000                                               [kW]
12. Pm = Pc / η        (η = 0,85)                                     [kW]
13. Mc = (Pc · 9549)/n                                                [Nm]
```

Respondendo literalmente à pergunta: **o `h` de Kienzle sai do `fz` já corrigido** (passo 7 usa `fz_prog`, não `fz` nominal) — e, como mostrado em 2c, isso faz `hm` voltar a ser `h_alvo` quando a compensação é integral. Se o passo 6 for limitado pelo `Vf` máximo da máquina, o passo 7 **tem que usar o `fz` realmente atingido**, senão a potência sai errada para menos.

---

### 2e — Magnitude do erro atual: a conta do enunciado está certa?

**A conta está certa (com arredondamento) e a conclusão está certa.**

Refiz: `0,1^(−0,155) = 10^0,155 = 1,4289` ⟹ `kc = 2165 × 1,4289 = 3093,6 N/mm²`. O enunciado escreveu 3096 — diferença de 0,08 %, irrelevante. O aumento é **+42,9 %**, e sim: com `kc` fixo em `kc1.1`, **o sistema subestima potência, torque e força em toda a faixa `h < 1 mm`** — ou seja, sempre, em fresamento com fresa inteiriça.

Fator de subestimação em função de `hm` (aço 1045, `mc = 0,155`):

| `hm` (mm) | `kc` real (N/mm²) | Subestimação do sistema hoje |
|---|---|---|
| 0,02 | 3970 | **−45 %** (real é 1,83×) |
| 0,05 | 3444 | −37 % (1,59×) |
| 0,10 | 3094 | −30 % (1,43×) |
| 0,15 | 2905 | −25 % (1,34×) |
| 0,20 | 2778 | −22 % (1,28×) |
| 0,30 | 2609 | −20 % (1,21×) |
| 0,50 | 2411 | −10 % (1,11×) |

(Leitura da última coluna: `kc1.1/kc_real − 1`. Ex.: em `hm = 0,10`, o sistema calcula 70 % da potência real.)

**Correção importante ao enunciado:** o texto diz "43 % acima do valor usado hoje, o que significa que o sistema subestima a potência". Os dois números não são o mesmo: `kc` está **43 % acima**, mas a potência calculada está **30 % abaixo** da real (1/1,429 = 0,70). Ao comunicar risco ao operador, o número que importa é o segundo.

**Sensibilidade cruzada (pedida pela regra 8 do enunciado):**
- trocar `kc` constante por Kienzle: **+20 % a +45 %** na potência, na faixa de trabalho (`hm` de 0,3 a 0,02 mm);
- trocar `hex` por `hm` dentro de Kienzle: **−45 % a −82 %** (2a) — de longe a maior alavanca;
- trocar a fórmula exata de `hm` pela aproximação `√(ae/D)`: **≤ 1,5 %** na potência (o erro de 10 % em `h` vira `10^0,155` ≈ 1,5 % em `kc`, e `Q` não muda);
- errar o `Deff` em fresa esférica: **até −56 % em `Vc`** e portanto no `n` e no `Vf`.

Ordem de prioridade de correção, por impacto: `Deff` → `hm` vs `hex` → Kienzle vs `kc` constante → forma exata de `hm`.

### 2f — Existe piso para `h`? Onde Kienzle deixa de valer

**Existe, e há valor publicado: `h = 0,1 mm`.** Isso é ruim para este projeto, porque **0,1 mm é justamente o meio da faixa de trabalho** de fresa inteiriça — ou seja, boa parte do uso real do sistema está no limite ou fora do domínio declarado do modelo.

**Três limites, de fora para dentro:**

1. **Limite do modelo (o que interessa aqui).** Horváth (2015) afirma que o modelo de Kienzle **não é adequado a processos com `h < 0,1 mm` nem com razão `b/h < 4`**, porque aparecem desvios grandes contra a força medida — e é exatamente por isso que ele propõe um novo valor de referência, `k1,0.1` (definido em `heq = 0,1 mm` e `leff = 1 mm`), em vez de `kc1.1` (definido em `h = 1 mm`). `REFERÊNCIA ÚNICA`.
   **Consequência direta para a Questão 3:** todo par `(kc1.1, mc)` tabelado é um ajuste feito na faixa de desbaste e **extrapolado** para baixo. Quanto menor o `h`, mais a incerteza do par domina o resultado.

2. **Limite físico — espessura mínima de cavaco (`hmin`).** Abaixo dela não se forma cavaco: a aresta arredondada amassa e empurra o material (*ploughing*), a energia específica dispara e o modelo perde sentido físico, não só precisão. O critério publicado é uma fração do **raio de aresta `rβ`**:
   - `hmin` fica sempre entre **1/4 e 1/3 de `rβ`** — de Oliveira, Rodrigues, Coelho & de Souza (2015), medindo em AISI 1045, exatamente um dos materiais desta base. `REFERÊNCIA ÚNICA` (é o valor mais citado, mas os três achados abaixo o corroboram de forma independente).
   - P20 (aço de molde, material desta base): razão crítica `h/rβ` medida em **0,25–0,33**. `REFERÊNCIA ÚNICA`.
   - Ti-6Al-4V: determinação por zona morta de metal, valor específico no artigo. `REFERÊNCIA ÚNICA`.
   - Ordem de grandeza prática: com `rβ` de fresa inteiriça de metal duro na casa de poucos micrometros, `hmin` fica na casa de **1–3 µm** — ou seja, **duas ordens de grandeza abaixo do limite do modelo (0,1 mm)**. O que morde primeiro é o modelo, não a física.

3. **Limite de sanidade numérica.** Com `mc` na faixa normal (0,15–0,26), a "explosão" de `kc` quando `h → 0` é **lenta**: `kc(0,005 mm)/kc1.1 = 0,005^(−0,155) = 2,28`. Não é um problema numérico real. **Mas com `mc = 0,75`** (o valor divergente do alumínio, Questão 3a) **é**: `kc(0,01 mm) = 1200 × 0,01^(−0,75) = 37 950 N/mm²` — mais que o dobro do `kc` de aço temperado. Isso, sozinho, condena o par `1200 / 0,75`.

**Regra recomendada (é decisão de engenharia, não achado de fonte — declarada como tal):**

```
h_piso = 0,02 mm          // abaixo disto o número vira ficção; travar e avisar
if hm < 0.10 mm  →  marcar o resultado como EXTRAPOLADO e alargar a banda declarada
if hm < 0.02 mm  →  usar h_piso e avisar "fora do domínio do modelo"
```

Justificativa do 0,02: é o ponto onde a subestimação atual (Questão 2e) já chega a 45 % e onde a extrapolação de um par ajustado em `h ≈ 0,3–1 mm` acumula duas décadas logarítmicas de distância do ponto de ajuste.

**Sinal independente de que a extrapolação para baixo exagera:** Horváth & Lukács (2017) mediram, para **C45 (= AISI 1045)** em torneamento fino, `kc = 2513 N/mm²` em `heq = 0,1 mm`. A extrapolação de Kienzle com o par do sistema (`2165 / 0,155`) dá **3094 N/mm²** no mesmo ponto — **23 % acima do medido**. Ou seja: a direção da correção da Questão 2e está certa (o `kc` constante subestima), mas **a magnitude de +43 % provavelmente está superestimada**; o valor real em `h = 0,1` deve ficar entre 2500 e 3100 N/mm². Ressalva de comparabilidade: `heq` de torneamento fino inclui o efeito do raio de ponta e a geometria da ferramenta é outra — é indício forte, não medição equivalente.

---

### 2g — Correções adicionais (velocidade, ângulo de saída, desgaste) valem na margem de ±15–25 %?

**Veredito: o ângulo de saída vale (fica na fronteira da margem); desgaste vale mas é imprevisível; velocidade de corte não vale.**

A forma estendida do modelo, como aparece na literatura acadêmica, é:

```
kc = k_γ · k_vc · k_cavaco · k_desgaste · kc1.1 · h^(−mc)
```

| Correção | O que a literatura dá | Efeito na faixa deste projeto | Vale implementar? |
|---|---|---|---|
| **Ângulo de saída `γ`** | duas abordagens publicadas: variação de **1 % por grau** e de **1,5 % por grau** de `γ` | fresa inteiriça de metal duro varia tipicamente ~10° de `γ` entre geometrias ⟹ **10–15 %** | **Sim, se a base de ferramentas tiver `γ`.** É o único que se aproxima de mudar a decisão. `SEM CONSENSO` na taxa (1 % vs 1,5 %) |
| **Desgaste `k_desgaste`** | a força cresce com o desgaste de flanco `VB`; modelos recentes tratam o incremento como polinômio quadrático em `VB` | não quantificável a priori — depende do quanto a ferramenta já rodou | **Não.** Entra como margem, não como fator. O sistema recomenda para ferramenta afiada; avisar isso ao operador |
| **Velocidade `k_vc`** | expoente pequeno; efeito de poucos por cento na faixa de metal duro (`vc` alto) | **< 5 %** ao dobrar `vc` | **Não.** Ruído |
| **Formação de cavaco `k_cavaco`** | reconhecida como fator, não isolada numericamente | — | **Não** |

Evidência de que essa é a prática acadêmica também: Vargas et al. (2019), ao modelar forças em *skiving*, **assumem `k_vc`, `k_cavaco` e `k_desgaste` constantes e os colapsam num único coeficiente de ajuste `Cm`**, mantendo explícita apenas a correção de ângulo de saída. Ou seja, mesmo num trabalho de modelagem numérica, três das quatro correções não são resolvidas individualmente. Numa calculadora de oficina com ±15–25 %, elas são refinamento abaixo do ruído.

**LACUNA (2g):** valores numéricos publicados para `k_desgaste` (em função de `VB`) e para o expoente de `k_vc` **não foram localizados em fonte do meu território** com procedência limpa. Aparecem em tabelas de manual e em páginas técnicas de fabricante — fora do escopo. Ver "Lacunas declaradas".

---

### Entrega da Questão 2 — a cadeia correta

**Qual `h` entra em Kienzle: `hm`, a espessura média, calculada a partir do `fz` efetivamente programado, com a forma exata `hm = fz·sinκ·(2ae/D)/arccos(1−2ae/D)`.**

Por quê, em uma frase: porque a potência é uma média sobre o arco engajado, e `hm` é o único `h` único que reproduz essa média (erro 2–4 %); `hex` é o pico, serve para dimensionar a carga na aresta, e superestimaria a potência em 45–82 %.

A cadeia numerada está no item 2d e é repetida, consolidada, na "Cadeia de cálculo final recomendada" no fim deste documento.

**Fontes da Questão 2**
- Horváth, R. — *A New Model for Fine Turning Forces* — Acta Polytechnica Hungarica, vol. 12, n. 7, 2015, p. 109–128. Limites de validade do modelo de Kienzle (`h > 0,1 mm`, `b/h > 4`) e proposta de `k1,0.1`. `REFERÊNCIA ÚNICA`.
- Horváth, R.; Lukács, J. — *Application of a Force Model Adapted for the Precise Turning of Various Metallic Materials* — Strojniški vestnik / Journal of Mechanical Engineering, vol. 63, n. 9, 2017, p. 489–500. DOI: 10.5545/sv-jme.2017.4430. Valores medidos `kc1,0.1`: **C45 = 2513 N/mm²**, KO36 (1.4541, inox austenítico) = 2928 N/mm², AS12 (alumínio fundido sob pressão) = 650 N/mm², todos em `heq = 0,1 mm`, `leff = 1 mm`.
- de Oliveira, F. B.; Rodrigues, A. R.; Coelho, R. T.; de Souza, A. F. — *Size effect and minimum chip thickness in micromilling* — International Journal of Machine Tools and Manufacture, vol. 89, 2015, p. 39–54. DOI: 10.1016/j.ijmachtools.2014.11.001. Ensaios em AISI 1045; `hmin` entre 1/4 e 1/3 do raio de aresta.
- *Determination of minimum uncut chip thickness and size effects in micro-milling of P-20 die steel using surface quality and process signal parameters* — International Journal of Advanced Manufacturing Technology, 2020. DOI: 10.1007/s00170-020-04926-6. `h/rβ` crítico em 0,25–0,33 para P20.
- *Determination of the Minimum Uncut Chip Thickness of Ti-6Al-4V Titanium Alloy Based on Dead Metal Zone* — Micromachines, vol. 15, n. 12, 2024, art. 1458. https://www.mdpi.com/2072-666X/15/12/1458
- Vargas, B.; Zapf, M.; Klose, J.; Zanger, F.; Schulze, V. — *Numerical Modelling of Cutting Forces in Gear Skiving* — Procedia CIRP, vol. 82, 2019, p. 455–460 (Karlsruher Institut für Technologie). Forma estendida de Kienzle com `k_γ · k_vc · k_cavaco · k_desgaste`; correção de ângulo de saída de **1 %/grau** (Apprich; Dietrich) ou **1,5 %/grau** (Sağlam; Günay); usa `kc1.1 = 1800 N/mm²` e `mc = 0,26` para aço AISI 5115 / 16MnCr5 (1.7131) não temperado, e registra que os valores de referência de aço na literatura ficam **entre 1800 e 2100 N/mm²**. https://publikationen.bibliothek.kit.edu/1000098073/44928186
- Stanojković, J.; Madić, M.; Trifunović, M.; Janković, P.; Petković, D. — *A Novel Approach to Predicting the Cutting Force in Turning Using Dimensional Analysis* — FACTA UNIVERSITATIS Series: Mechanical Engineering. DOI: 10.22190/FUME241129010S. Mede o erro do modelo de Kienzle com constantes de catálogo: **MAPE ≈ 35 % (S235JRG2) e ≈ 60 % (20MnCrS5)**.
- Denkena, B. / IFW Hannover — *Versuch: Zerspankraftmessung beim Drehen*, SoSe 2022. Formulação de Kienzle, referência primária [KIE52] e definição de `kc1.1` como *Hauptwert* para `b = 1 mm`, `h₀ = 1 mm`.
- Kienzle, O. — *Die Bestimmung von Kräften und Leistungen an spanenden Werkzeugen und Werkzeugmaschinen* — VDI-Z, vol. 94, 1952, p. 299–305. Kienzle, O.; Victor, H. — *Spezifische Schnittkräfte bei der Metallbearbeitung* — Werkstattstechnik und Maschinenbau, vol. 47, 1957, p. 224–225. Origem primária do modelo. Não consegui acesso ao texto integral; a formulação é reproduzida pelas fontes acima.

---

### Nota de apuração — dois achados que reforçam a Questão 2f (gravado antes de fechar a Questão 3)

- **Segunda fonte independente para o limite `h = 0,1 mm`:** Biró, I.; Czampa, M.; Szalay, T. — *Experimental Model for the Main Cutting Force in Face Milling of a High Strength Structural Steel* — Periodica Polytechnica Mechanical Engineering, 59(1), 2015, p. 16–22, DOI 10.3311/PPme.7516. Os autores tratam a curva log de `kc` como **multi-seccionada**, com fronteiras em `h > 0,1 mm` (Zona I), `0,01 < h ≤ 0,1 mm` (Zona II), `h ≤ 0,01 mm` (Zona III) e uma quarta zona hipotética em `h < 10 µm` — atribuindo a ideia a Bali (1985) e ligando as fronteiras ao **raio de aresta**. Com isto, o limite de 0,1 mm passa de `REFERÊNCIA ÚNICA` para **duas fontes independentes** (Horváth 2015 e Biró et al. 2015), com a mesma consequência: **um único par `(kc1.1, mc)` não descreve a faixa toda**.
- **Medição acadêmica independente de `kc1.1` e `mc`:** Croitoru, C. — *An Empirical Estimation of Cutting Force for Face Milling Using a Stationary Dynamometer* — Buletinul Institutului Politehnic din Iaşi, vol. 67 (71), n. 4, 2021, DOI 10.2478/bipcm-2021-0023. Aço com **0,219 % C, 190 HB** (faixa do 1020/1023 endurecido), inserto de metal duro, `γ = 10°`, raio de ponta < 0,05 mm: **`kc1.1 = 1202 N/mm²` e `mc = 0,4572`** — determinados em torneamento e aplicados a fresamento frontal pelo próprio autor. Este par é radicalmente diferente do par do sistema para o 1020 (1800 / 0,17) e, ainda assim, **os dois concordam em 5,7 % em `h = 0,2 mm`** (2504 vs 2369 N/mm²), divergindo 29 % em `h = 0,1` e 58 % em `h = 0,05`. Consequência: `(kc1.1, mc)` **não são duas constantes de material independentes** — são dois parâmetros de um ajuste, fortemente correlacionados, e só têm sentido junto com a faixa de `h` em que foram levantados. O mesmo artigo cita Tönshoff & Denkena (2013) para afirmar que `kc` **não pode ser tratado como característica física do material**.

---

## 3 — Constantes de Kienzle por material

**Veredito:** O meu território **não publica tabela de `kc1.1` e `mc` por liga**. Tabela por material é artefato de catálogo de fabricante e de handbook alemão; a literatura revisada por pares mede pares `(kc1.1, mc)` caso a caso, para o material e a ferramenta daquele ensaio, e **diz explicitamente que o valor não é transferível**. Consequência para o projeto: das 9 linhas da tabela atual, consigo sustentar **3 com medição acadêmica direta ou proxy próximo**, e as outras 6 são `LACUNA`. O que consigo fazer com autoridade é **condenar** um par (o `mc = 0,75` do alumínio) e **explicar por que a tabela inteira é menos confiável do que parece**.

**Confiança global:** `SEM CONSENSO` — e a dispersão medida é grande demais para chamar de ruído (ver 3f).

---

### 3a — A divergência do alumínio: `750 / 0,23` ou `1200 / 0,75`?

**`mc = 0,75` está errado. Recomendo rejeitar o par `1200 / 0,75` e manter `750 / 0,23` como valor de trabalho — declarado como não verificado.**

**Três argumentos independentes contra o 0,75:**

1. **Absurdo numérico.** `kc = 1200 × 0,01^(−0,75) = 37 950 N/mm²`. Nenhum metal usinável tem essa força específica; é ~13× o `kc1.1` de aço cementado da própria tabela. Mesmo em `h = 0,1 mm` — faixa de trabalho comum — dá **6748 N/mm²**, ou seja, o sistema calcularia que **alumínio exige mais que o dobro da potência do aço 1045** (3094 N/mm² no mesmo ponto). Isso é falso por larga margem e o operador percebe na primeira simulação.
2. **Fora da distribuição de todos os `mc` que consegui medir em fonte revisada por pares.** Reunindo apenas valores com procedência (ver 3f): 0,155 · 0,17 · 0,185 · 0,25 · 0,259 · 0,26 · 0,390 · 0,408 · 0,4572. O máximo é 0,46; **0,75 fica 64 % acima do maior valor observado**, e todos os valores altos vêm de modelos com termo adicional (raio de ponta / comprimento efetivo de aresta), não de Kienzle puro.
3. **Contradição com a única medição de liga de alumínio que localizei.** Horváth & Lukács (2017) mediram, em AS12 (AlSi12 fundido sob pressão), `kc = 650 N/mm²` em `h_eq = 0,1 mm`, com expoente **0,259** — o que, reescrito na forma de Kienzle, dá **`kc1.1 ≈ 358 N/mm²`, `mc ≈ 0,259`**. O par `1200 / 0,75` erra esse ponto por **10×**; o par `750 / 0,23` erra por 2×.

**Hipótese forte sobre a origem do erro — e ela é verificável.** As tabelas alemãs de força específica publicam, ao lado de `kc1.1`, **não o `mc` e sim o valor `1 − mc`** (isto está escrito, com todas as letras, no material didático do IFW Hannover: *"In Tabellen der spez. Schnittkraft sind entweder die kc-Werte ... oder die kc1.1-Werte und **1-mc** in Abhängigkeit vom Werkstoff aufgeführt"*). Ora: `1 − 0,75 = 0,25`, que cai exatamente no meio da faixa normal de `mc`. **O número 0,75 tem toda a cara de ser um `1 − mc` transcrito como se fosse `mc`.** Isso é hipótese, não achado — mas é testável: se a fonte do `1200 / 0,75` for uma tabela alemã, o par verdadeiro é `1200 / 0,25`, que dá `kc(0,1) = 2134 N/mm²`. Ainda alto para alumínio, mas dentro do plausível.

**Faixa típica de `mc` para ligas de alumínio:** `LACUNA`. A única determinação em liga de alumínio que localizei no meu território é a de AS12 acima (`0,259`), e ela vale para alumínio **fundido eutético**, não para 6061-T6 **trabalhado**. Não interpolo.

**Para 6061-T6 especificamente:** `LACUNA`. Busquei determinação experimental de `kc1.1`/`mc` para 6061-T6 em periódico revisado por pares e não localizei. A fonte que teria o dado é catálogo de fabricante (grupo ISO N) — fora do meu escopo.

---

### 3b — Os seis "estimados"

O enunciado já suspeita da coisa certa: **cinco linhas com `mc = 0,20` exato é preenchimento por default, não dado medido.** Confirmo a suspeita pela distribuição: nas 9 determinações independentes que reuni, **nenhuma** deu exatamente 0,20.

| Material do sistema | Valor no sistema | O que consigo sustentar no meu território | Rótulo |
|---|---|---|---|
| **P20** (1.2311, 280–320 HB) | 2300 / 0,20 | Nada. Localizei estudos de fresamento de P20 (inclusive determinação de espessura mínima de cavaco), mas **nenhum reporta par `(kc1.1, mc)`** | `LACUNA` |
| **2711** (300–340 HB) | 2500 / 0,20 | Nada — e a própria designação é incerta (ver 3e) | `LACUNA` |
| **8620 núcleo** (180–220 HB) | 2100 / 0,20 | **Proxy defensável:** aço de cementação AISI 5115 / 16MnCr5 (1.7131) **não temperado**, com **`kc1.1 = 1800 N/mm²` e `mc = 0,26`** (Vargas et al., KIT, 2019), no contexto de uma família de aços cuja referência de literatura os autores dizem ficar **entre 1800 e 2100 N/mm²**. **Erro esperado do proxy:** em `h = 0,1 mm` o proxy dá 3275 N/mm² e o valor do sistema dá 3328 — **1,6 % de diferença**. Em `h = 0,02 mm`: 4977 vs 4592 (o proxy fica 8,4 % **acima**). Ou seja: o "estimado" do sistema, por acaso, está bom na faixa de trabalho | `REFERÊNCIA ÚNICA` (proxy) |
| **8620 cementado** (58–62 HRC) | 2800 / 0,20 | Nada. Camada cementada de 58–62 HRC é outro regime (usinagem de material duro); extrapolar do núcleo é indefensável | `LACUNA` |
| **H13 tratado** (45–52 HRC) | 2800 / 0,20 | Localizei ensaio de fresamento duro de **AISI H13 a 50 HRC** com CBN (Matras & Zębala, *Materials* 13(5):1109, 2020), mas o modelo de força deles **não é Kienzle** — é pressão na face de saída com coeficientes próprios (`BC₁ = 4030`, expoente de `h` = 0,0058). Não convertível em `(kc1.1, mc)` sem refazer o ajuste | `LACUNA` |
| **Alumínio 6061-T6** | ver 3a | `LACUNA` para 6061-T6; proxy medido só para AlSi12 fundido | `LACUNA` |

**Sobre "qual proxy usar e com que erro" — a regra geral que consigo defender:** proxy por **família + tratamento + dureza**, nunca por nome comercial. Aços de cementação em estado normalizado formam um grupo estreito (1800–2100 N/mm² segundo Vargas et al.); aços-ferramenta beneficiados e camadas cementadas **não** têm grupo publicado no meu território.

---

### 3c — Expansão da base: GG25, GGG50, Ti-6Al-4V

| Material | Resultado |
|---|---|
| **Ferro fundido cinzento GG25 / EN-GJL-250** | `LACUNA`. Localizei estudo de torneamento de EN-GJL-250 com análise de `Kc`, mas sem par `(kc1.1, mc)` publicado. As fontes que teriam o dado são catálogo de fabricante e handbook alemão (König/Klocke, *Fertigungsverfahren*) — o handbook está no meu território mas **não consegui acesso ao texto** (Springer, sem versão aberta) |
| **Ferro fundido nodular GGG50 / EN-GJS-500-7** | `LACUNA`. Mesma situação, sem nem o estudo aproximado |
| **Ti-6Al-4V** | **Parcial.** Um artigo revisado por pares reporta, via modelo Kienzle-Victor em torneamento fino, `kc ≈ 1775 N/mm²` para Ti-6Al-4V ELI produzido por *electron beam melting*, e afirma que esse valor fica **~20 % abaixo** do determinado para a liga forjada (⟹ forjada ≈ 2200 N/mm² no mesmo ponto). Isso dá **ordem de grandeza**, não o par: o `h` de referência do valor não é `1 mm` e o `mc` não é reportado de forma isolada ⟹ **`LACUNA` para o par `(kc1.1, mc)`** |

---

### 3d — Dureza como variável: dá para interpolar?

**Não encontrei lei publicada `kc1.1 = f(HB)` no meu território, e encontrei o oposto: afirmação explícita de que `kc` não é característica física do material.**

- Croitoru (2021) cita Tönshoff & Denkena (*Basics of Cutting and Abrasive Processes*, Springer, 2013) para afirmar que **`kc` não pode ser designado característica física do material**, porque combina fenômenos da face de saída e da face de folga — logo não é transferível entre condições. `REFERÊNCIA ÚNICA`.
- A abordagem que a literatura recente usa quando quer a dependência do material como variável contínua **não é dureza, é resistência à tração `Rm`**: Stanojković et al. incluem `Rm` como parâmetro explícito de material num modelo por análise dimensional, justamente porque o par de Kienzle não cobre variação dentro da liga.
- Kronenberg (1927) já havia formulado `kc = f(A)` em escala log-log (a "reta de Kronenberg"), que é a base de que Kienzle partiu — mas isso descreve a dependência da **seção do cavaco**, não da dureza.

**Recomendação:** tabelar por liga **e tratamento** (que é o que o sistema já faz) e **não interpolar por dureza**. Se a faixa de dureza declarada for larga (40 HB), o honesto é declarar que a incerteza da linha cresce, não gerar um número por interpolação. `LACUNA` para a lei de interpolação.

---

### 3e — Nomenclatura e equivalência

| Nome no sistema | Equivalência | Confiança |
|---|---|---|
| **P20** | AISI P20 ≡ **DIN/W-Nr. 1.2311 (40CrMnMo7)**; variante ao enxofre 1.2312 | `REFERÊNCIA ÚNICA` — a equivalência aparece em tabelas de referência cruzada, cuja origem primária é **fabricante/distribuidor** (fora do meu território). A norma que define a designação é EN ISO 4957 (aços-ferramenta) |
| **8620** | SAE/AISI 8620 ≡ **DIN 1.6523 (21NiCrMo2)** ≡ JIS SNCM220. Aço de cementação; a norma da família é EN 10084 | `REFERÊNCIA ÚNICA`, mesma ressalva de origem |
| **H13** | AISI H13 ≡ **DIN 1.2344 (X40CrMoV5-1)** ≡ JIS SKD61. Norma: EN ISO 4957 / ASTM A681 | `REFERÊNCIA ÚNICA`, mesma ressalva |
| **2711** | **`LACUNA`.** Não confirmei um W-Nr. **1.2711** em fonte normativa. Os vizinhos que existem e batem com a descrição (aço para molde/matriz pré-beneficiado, 300–340 HB) são **1.2713 (55NiCrMoV6)** e **1.2714 (55NiCrMoV7)**, ambos ≡ **AISI L6**. Enquanto a designação não for confirmada, **não há dado a buscar** — buscar constante para um nome ambíguo é como se produz número inventado |
| **VP Atlas** | **`LACUNA`.** Designação comercial de siderúrgica brasileira, sem equivalente normativo internacional localizado. O caminho correto é obter a composição/tratamento e mapear para a família DIN/AISI antes de procurar constante |
| **GG25** | ≡ **EN-GJL-250** (EN 1561) | `REFERÊNCIA ÚNICA` |
| **GGG50** | ≡ **EN-GJS-500-7** (EN 1563) | `REFERÊNCIA ÚNICA` |

---

### 3f — O achado que vale mais que qualquer linha da tabela (não foi perguntado, mas muda a decisão)

**`kc1.1` e `mc` não são duas constantes independentes de material. São dois parâmetros acoplados de um ajuste log-log, e só significam alguma coisa junto com a faixa de `h` do ensaio, a ferramenta e a preparação de aresta.**

Prova numérica com dados medidos, não com opinião — dois pares para aço de baixo carbono, de fontes independentes:

| `h` (mm) | Sistema, 1020 (`1800 / 0,17`) | Croitoru 2021, 0,22 % C 190 HB (`1202 / 0,4572`) | Diferença |
|---|---|---|---|
| 0,30 | 2209 | 2084 | −5,6 % |
| 0,20 | 2366 | 2509 | +6,0 % |
| 0,10 | 2662 | 3444 | +29 % |
| 0,05 | 2995 | 4729 | +58 % |
| 0,02 | 3500 | 7189 | +105 % |

Os dois pares **concordam onde foram ajustados** (`h` de 0,16 a 0,25 mm no ensaio de Croitoru) e **explodem** onde o sistema mais opera (acabamento, `h < 0,1`). Isto é a assinatura de extrapolação de ajuste log-log, e explica por que:

- um artigo revisado por pares mediu **MAPE de 35 % a 60 %** ao prever força com constantes de catálogo (Stanojković et al.);
- a literatura precisou inventar um segundo valor de referência (`k1,0.1`, em `h = 0,1 mm`) em vez de `kc1.1` (em `h = 1 mm`) — Horváth (2015);
- a curva precisa ser tratada como multi-seccionada, com fronteira em `h = 0,1 mm` — Biró et al. (2015).

**Consequência de produto, e é a recomendação mais importante desta questão:** a margem declarada de **±15–25 % não é sustentável abaixo de `h = 0,1 mm`** com constantes tabeladas. Ou o sistema declara banda maior nessa faixa, ou marca o resultado como extrapolado. Um número de potência com 3 dígitos significativos, em acabamento, comunica uma precisão que os dados de entrada não têm.

---

### Entrega da Questão 3 — tabela com fonte e confiança POR LINHA

| Material | `kc1.1` (N/mm²) | `mc` | Fonte | Confiança |
|---|---|---|---|---|
| Aço 1020 | — | — | Nenhuma medição de 1020 localizada. Vizinho medido: 0,22 % C / 190 HB ⟹ **1202 / 0,4572** (Croitoru 2021) — mas o par não é transferível | `LACUNA` para 1020; `REFERÊNCIA ÚNICA` para o vizinho |
| Aço 1045 / C45 | — | — | Medição direta em `h = 0,1 mm`: **`kc = 2513 N/mm²`** (Horváth & Lukács 2017, torneamento fino). Não fornece o par | `REFERÊNCIA ÚNICA` (ponto, não par) |
| Inox 304 | — | — | Proxy mais próximo medido: **KO36 / 1.4541** (austenítico estabilizado ao Ti), `kc = 2928 N/mm²` em `h = 0,1 mm` (Horváth & Lukács 2017) | `REFERÊNCIA ÚNICA` (proxy, ponto) |
| Alumínio 6061-T6 | — | — | `1200 / 0,75` **rejeitado** (3a). Proxy medido: AlSi12 fundido ⟹ **358 / 0,259** | `LACUNA` para 6061-T6 |
| P20 | — | — | — | `LACUNA` |
| 2711 | — | — | designação não confirmada | `LACUNA` |
| 8620 núcleo | 1800 | 0,26 | Proxy AISI 5115 / 16MnCr5 não temperado — Vargas et al., Procedia CIRP 82 (2019) | `REFERÊNCIA ÚNICA` |
| 8620 cementado | — | — | — | `LACUNA` |
| H13 tratado | — | — | ensaio a 50 HRC existe, mas com outro modelo de força | `LACUNA` |
| GG25 / EN-GJL-250 | — | — | — | `LACUNA` |
| GGG50 / EN-GJS-500-7 | — | — | — | `LACUNA` |
| Ti-6Al-4V | — | — | ordem de grandeza: `kc ≈ 1775 N/mm²` (EBM) e ~2200 (forjada), torneamento fino | `LACUNA` para o par |
| *(referência de família)* | 1800–2100 | — | "valores de referência de força específica para aços na literatura variam entre 1800 e 2100 N/mm²" — Vargas et al. (2019) | `REFERÊNCIA ÚNICA` |
| *(origem catálogo, registrada por honestidade)* | 2140 · 1780 · 1700 | 0,25 · 0,17 · 0,25 | 20MnCrS5 e S235JRG2 — reproduzidos por Stanojković et al., mas **com origem primária declarada em catálogo de fabricante** (`mac.walter-tools.com`; os mesmos valores no catálogo Sandvik Coromant) | **Não conta como fonte independente** — é catálogo citado dentro de artigo |

**Fontes da Questão 3** — além das já listadas na Questão 2:
- Croitoru, C. — *An Empirical Estimation of Cutting Force for Face Milling Using a Stationary Dynamometer* — Buletinul Institutului Politehnic din Iaşi, vol. 67 (71), n. 4, 2021, secção Construcţii de Maşini. DOI: 10.2478/bipcm-2021-0023. Medição própria: `kc1.1 = 1202 N/mm²`, `mc = 0,4572` (aço 0,219 % C, 190 HB).
- Matras, A.; Zębala, W. — *Optimization of Cutting Data and Tool Inclination Angles During Hard Milling with CBN Tools, Based on Force Predictions and Surface Roughness Measurements* — Materials, vol. 13, n. 5, 2020, art. 1109. DOI: 10.3390/ma13051109. AISI H13 a 50 HRC; usa **espessura média de cavaco não deformada** no modelo (mais um apoio ao veredito da Questão 2a).
- *Machining of a functional hip prosthesis cone in Ti-6Al-4V ELI titanium alloy produced by electron beam melting* — Journal of the Brazilian Society of Mechanical Sciences and Engineering, 2024. DOI: 10.1007/s40430-024-04754-9. `kc ≈ 1775 N/mm²` via Kienzle-Victor (torneamento fino), ~20 % abaixo da liga forjada.
- Tönshoff, H. K.; Denkena, B. — *Basics of Cutting and Abrasive Processes* — Springer, 2013 (citado por Croitoru 2021 para a afirmação de que `kc` não é característica física do material).
- Kronenberg, M. — trabalho de 1927 sobre `kc = f(A)` em escala log-log ("reta de Kronenberg"), antecessor direto de Kienzle; referenciado como [KRO27] no material do IFW Hannover.

---

## Tabela A — Placar

| Item | Valor atual do sistema | Veredito | Valor recomendado | Confiança |
|---|---|---|---|---|
| Fórmula de afinamento em uso | `fz_ef = fz/√(ae/D)` | **Errado no papel em que é usado** — corrige `hm`, não `hex` | separar os dois papéis (ver cadeia final) | `CONSENSO` (geometria derivada) |
| `CTF` exato em `ae/D = 0,20` | **1,41** | **Errado (aritmética)** | **1,25** | `CONSENSO` |
| Divergência declarada entre as duas fórmulas em `ae/D = 0,20` | 58 % | **Errado (subdimensionado)** | **79 %** | `CONSENSO` |
| Gatilho da correção | `ae < 50 % D` | **Correto e exato** | manter; **avisar** abaixo de `ae/D = 0,25` | `CONSENSO` |
| Diâmetro em fresa esférica/toroidal | `D` nominal | **Errado / ausente** — erro de até **−56 % em `Vc`** | `Deff = 2√[ap(D−ap)]` | `CONSENSO` (geometria) |
| Ângulo de posição `κ` | ausente | Falta | `h = fz·sinφ·sinκ` | `CONSENSO` |
| `h` na equação de Kienzle | não implementado | — | **`hm` exato**, do `fz` programado | `CONSENSO` (integral: `hm` erra 2–4 %, `hex` erra 45–82 %) |
| `kc` no cálculo de potência | `kc = kc1.1` constante | **Errado** | `kc = kc1.1 · hm^(−mc)` | `CONSENSO` |
| Magnitude do erro (1045, `h = 0,1`) | "43 % acima" | **Conta certa, leitura imprecisa** | `kc` **+43 %**; **potência calculada −30 %** | `CONSENSO` (aritmética) |
| Piso de `h` | ausente | **Falta** | `h_piso = 0,02 mm`; marcar extrapolação abaixo de `0,1 mm` | 2 fontes independentes |
| Alumínio `1200 / 0,75` | divergência interna | **Rejeitado** (`kc(0,01) = 37 950 N/mm²`) | provisório `750 / 0,23`, declarado não verificado | `SEM CONSENSO` |
| `mc = 0,20` em 5 linhas | default | **Sem base** — nenhuma das 9 determinações independentes deu 0,20 | ver linha a linha na Questão 3 | `LACUNA` |
| 8620 núcleo `2100 / 0,20` | estimado | **Plausível por acaso** — 1,6 % do proxy em `h = 0,1` | `1800 / 0,26` (proxy 16MnCr5) | `REFERÊNCIA ÚNICA` |
| Correções `k_γ`, `k_vc`, `k_desgaste` | ausentes | **Ficar sem é aceitável** | só `k_γ` se a base tiver `γ` (1–1,5 %/grau) | `SEM CONSENSO` na taxa |
| Margem declarada ±15–25 % | global | **Insustentável abaixo de `h = 0,1 mm`** | banda maior ou marca de extrapolação | 2 fontes + 1 medição de MAPE (35–60 %) |

---

## Tabela B — O que continua sem base

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| Qual fórmula os fabricantes publicam (Q1a) | fonte primária de fabricante — fora do meu território | abrir os guias técnicos de 2 fabricantes (Sandvik Coromant, Seco, Walter, Iscar, Kennametal, Mitsubishi) e registrar a fórmula publicada e **a qual grandeza ela se refere** (`hex` ou `hm`) — é essa definição, não a fórmula, que resolve a Questão 1 |
| Divergência entre fabricantes quanto a `hm`/`hex` na potência (Q2a) | mesma razão | comparar o cálculo de potência publicado por 2 fabricantes e ver qual `h` alimenta o `kc` |
| `kc1.1` e `mc` de P20, 2711, H13, 8620 cementado, GG25, GGG50, Ti-6Al-4V, 6061-T6 | nenhuma determinação em periódico revisado por pares localizada | (a) König/Klocke, *Fertigungsverfahren Bd. 1* — está no meu território mas sem versão aberta; (b) Diniz/Marcondes/Coppini, *Tecnologia da Usinagem dos Materiais* — território válido, exemplar físico; (c) catálogo de fabricante — fora do território, mas é onde os números de fato moram |
| Lei `kc1.1 = f(dureza)` | não existe publicada no meu território; há afirmação de que `kc` não é propriedade do material | ensaio próprio, ou aceitar tabelar por liga + tratamento |
| Equivalência normativa de "2711" e "VP Atlas" | designação não confirmada em fonte normativa | obter composição química e tratamento do fornecedor e mapear pela norma (EN ISO 4957 / EN 10084) |
| Valor numérico de `k_desgaste(VB)` e do expoente de `k_vc` | fora do território / não isolados na literatura | ensaio próprio, ou tabela de handbook alemão |
| `hm` para fresa esférica/toroidal com `κ` variável | não há forma fechada simples publicada que eu tenha localizado | integração numérica ao longo da aresta, ou aceitar `κ` efetivo médio com erro declarado |
| Texto integral de Kienzle (1952) e Kienzle & Victor (1957) | periódicos alemães da década de 1950, sem versão digital aberta | biblioteca universitária / VDI |
| Texto integral de DIN 6580 e DIN 6584 | normas pagas | compra da norma; usadas aqui apenas como referência de terminologia |

---

## Cadeia de cálculo final recomendada

Cada passo com a origem. `[G]` = geometria derivada neste documento (verificável, sem dependência de fonte externa).

```
ENTRADAS: Vc [m/min] · h_alvo [mm] · ae · ap · D · Z · κ · rε · kc1.1 · mc · η

 1.  Deff = D                              se topo reto                          [G]
     Deff = 2·√[ap·(D − ap)]                se esférica e ap < D/2                [G]
     (toroidal com ap < rε: mesma correção sobre o raio de canto)

 2.  n = (Vc · 1000) / (π · Deff)           [rpm]        definição cinemática — DIN 6580

 3.  ε = ae / Deff
     φmax = arccos(1 − 2ε)   se ε < 0,5                                          [G]
     φmax = π/2              se ε ≥ 0,5

 4.  f_hex = 1 / √[1 − (1 − 2ε)²]   se ε < 0,5                                   [G]
     f_hex = 1                       se ε ≥ 0,5
     (fator EXATO de afinamento radial; preserva a espessura máxima)

 5.  fz_prog = h_alvo · f_hex / sin κ       [mm/dente]                            [G]
     ── a geometria de afinamento entra AQUI e em nenhum outro lugar ──

 6.  Vf = fz_prog · Z · n                   [mm/min]
     Vf = min(Vf, Vf_max_máquina)  →  se limitado, recalcular fz_real = Vf/(Z·n)
     e usar fz_real nos passos seguintes

 7.  hm = fz_real · sin κ · (2ε) / φmax     [mm]   espessura média EXATA          [G]
     (aprox. aceitável: hm ≈ fz_real · sin κ · √ε — erro ≤ 4,5 % abaixo de ε=0,25)

 8.  h_calc = max(hm ; 0,02)                                                      [decisão de engenharia]
     se hm < 0,10 → marcar resultado como EXTRAPOLADO      Horváth 2015 · Biró et al. 2015

 9.  kc = kc1.1 · h_calc^(−mc)              [N/mm²]      Kienzle 1952 · Kienzle & Victor 1957

10.  Q = (ap · ae · Vf) / 1000              [cm³/min]

11.  Pc = (Q · kc) / 60000                  [kW]         identidade de unidades; termos conforme DIN 6584

12.  Pm = Pc / η        (η = 0,85)          [kW]

13.  Mc = (Pc · 9549) / n                   [Nm]

14.  Fc = (60000 · Pc) / Vc                 [N]   força de corte média — ENTRADA DO R6 (deflexão)
```

**Duas travas que precisam virar teste automatizado:**
- `hm ≤ h_alvo` sempre (se der maior, o afinamento foi aplicado duas vezes ou com sinal trocado);
- quando a compensação não for limitada pela máquina, `hm` tem que voltar a `h_alvo` dentro do erro da aproximação — é o auto-teste da não-contagem-dupla da Questão 2c.

---

## Lacunas declaradas

Cada item abaixo é um número que **não** entreguei, com a fonte que o teria e por que ela está fora do meu escopo. Nenhuma célula foi preenchida por interpolação, analogia ou conhecimento próprio.

| # | Lacuna | Fonte que teria o dado | Por que está fora |
|---|---|---|---|
| 1 | Qual fórmula de afinamento cada fabricante publica (Q1a) e a qual grandeza ela se refere | guias técnicos e calculadoras de Sandvik Coromant, Seco, Walter, Iscar, Kennametal, Mitsubishi, OSG | catálogo/material de fabricante — proibido no meu território |
| 2 | Se há divergência entre fabricantes sobre `hm` vs `hex` no cálculo de potência (Q2a) | os mesmos guias técnicos | idem |
| 3 | Limiar de 25 % citado "por alguns fabricantes" (Q1f) | idem | idem — respondi pela geometria, que dá o limiar exato de 50 % |
| 4 | `kc1.1` e `mc` de **6061-T6** | catálogo (grupo ISO N); handbook alemão | catálogo proibido; handbook sem acesso aberto |
| 5 | `kc1.1` e `mc` de **P20** | catálogo; König/Klocke; Diniz/Marcondes/Coppini | catálogo proibido; livros sem versão digital acessível |
| 6 | `kc1.1` e `mc` de **2711** | qualquer fonte — mas a designação não está confirmada | designação ambígua: buscar constante para nome não normalizado é como se fabrica número inventado |
| 7 | `kc1.1` e `mc` de **8620 cementado (58–62 HRC)** | catálogo; literatura de usinagem de material duro | não localizado em periódico; regime diferente do núcleo |
| 8 | `kc1.1` e `mc` de **H13 tratado (45–52 HRC)** | catálogo; handbook | o ensaio acadêmico que localizei usa outro modelo de força |
| 9 | `kc1.1` e `mc` de **GG25 / EN-GJL-250** | catálogo; König/Klocke | idem |
| 10 | `kc1.1` e `mc` de **GGG50 / EN-GJS-500-7** | catálogo; König/Klocke | idem |
| 11 | Par `(kc1.1, mc)` de **Ti-6Al-4V** | catálogo; literatura de usinagem de titânio | só localizei valor de `kc` num ponto (≈1775 N/mm², EBM; ~2200 forjada), não o par |
| 12 | Pares `(kc1.1, mc)` de **1020, 1045 e 304** — as três linhas "validadas" | Diniz/Marcondes/Coppini (território válido) e catálogo | **não consegui verificar a validação declarada**: localizei medições próximas (C45: 2513 N/mm² em `h=0,1`; 1.4541: 2928; 0,22 %C: `1202 / 0,4572`) mas nenhuma que confirme os pares exatos do sistema |
| 13 | Lei de interpolação `kc1.1 = f(dureza)` dentro da mesma liga | não localizada; literatura sugere `Rm` como variável, não HB | possivelmente não existe de forma publicada e transferível |
| 14 | Valor numérico de `k_desgaste(VB)` e expoente de `k_vc` | tabelas de handbook alemão e páginas técnicas de fabricante | catálogo proibido; handbook sem acesso |
| 15 | Taxa da correção de ângulo de saída: 1 %/grau ou 1,5 %/grau | as duas estão publicadas em fontes acadêmicas distintas | não é lacuna de fonte, é **`SEM CONSENSO` real** |
| 16 | Forma fechada de `hm` para fresa esférica/toroidal com `κ` variável | literatura de fresamento 5 eixos | não localizada; exige integração numérica |
| 17 | Texto integral de Kienzle (1952) e Kienzle & Victor (1957) | VDI-Z 94 (1952) e Werkstattstechnik u. Maschinenbau 47 (1957) | periódicos alemães dos anos 1950 sem digitalização aberta — a formulação foi confirmada por 5 fontes secundárias acadêmicas independentes |
| 18 | Texto integral de DIN 6580 / DIN 6584 e ISO 3685 | normas pagas | citadas apenas como referência de terminologia; **nenhum número deste documento depende delas** |

**Uma observação final sobre independência, para quem for confrontar este retorno com o outro:** os únicos números aqui que vêm de catálogo são os que estão **explicitamente marcados como tal** (20MnCrS5 `2140 / 0,25` e S235JRG2 `1780 / 0,17` e `1700 / 0,25`, reproduzidos dentro de um artigo revisado por pares que credita `mac.walter-tools.com` e o catálogo Sandvik Coromant). Eles **não devem contar como confirmação independente** se aparecerem também no outro retorno — são a mesma origem vista de dois ângulos. Todo o resto — a geometria da Questão 1, a integral da Questão 2a, os limites de `h` da Questão 2f, e as medições de C45, 1.4541, AS12, 16MnCr5 e do aço 0,22 %C — é independente de catálogo.
