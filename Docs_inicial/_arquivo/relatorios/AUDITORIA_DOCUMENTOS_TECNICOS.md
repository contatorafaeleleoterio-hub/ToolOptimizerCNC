# Auditoria — documentos técnicos do Fenix

**Skill:** `dados-industria-cnc`, modo 4 (auditar documento/fórmula antes de virar código).
**Método:** os cinco verificadores de `references/auditoria.md`, na ordem obrigatória — unidades →
séries e constantes → estrutura de cálculo → jargão → ferramentas e famílias — mais os 9 cruzamentos
do plano.
**Acervo auditado — 12 documentos, 4.198 linhas:** os 6 canônicos (1.158) ·
`mvp/MVP_CALCULADORA_PARAMETROS.md` (1.654) · `escopo/E1`, `E2`, `E3`, `E4` (1.324) ·
`GLOSSARIO_DE_TERMOS.md` (62). Consultados para arbitrar, não auditados:
`BLOCO_DE_DECISAO.md`, `escopo/E7`.
**Data:** 27/08/2026. **Nada foi editado nos documentos-fonte.**

---

## Veredito

Doze documentos auditados, com toda tabela numérica do acervo recalculada célula a célula.
**32 achados: 3 graves, 17 médios, 12 leves**, mais 4 perguntas que só o Mestre resolve.

O acervo é sólido onde mais importa: todas as sete tabelas de sensibilidade recalculadas fecham
dígito a dígito, as derivações têm teste de sanidade, e a procedência por valor é levada a sério.

**Não serve para virar código como está.** Três defeitos entregam número errado ao operador — um
travamento de ângulo que torna a espessura média de cavaco maior que o avanço por dente em rasgo
cheio, duas tabelas vivas da mesma constante divergindo até 87%, e uma fórmula de avanço aplicada à
família errada com erro de 10×. Os três são localizados e corrigíveis; nenhum exige nova pesquisa.

---

## 1. Achados

### GRAVE — número errado chega ao operador

---

**A1 · O travamento de `φmax` em π/2 faz `hm` sair maior que `fz` em rasgo cheio**
`canonicos/CANONICO_MOTOR_DE_CALCULO.md:71` e `:73` (§1.4, passos 2 e 4) · **severidade: grave**

```
2.  ε = ae/D;  φmax = arccos(1 − 2ε)   se ε < 0,5,  senão φmax = π/2
4.  hm = fz_programado · sinκ · (2ε) / φmax
```

O travamento `φmax = π/2` está **certo para o passo 3** (o fator de afinamento: acima de `ae/D` = 0,5
o dente atinge a espessura máxima, e `CTF = 1,0` é exato — `§1.1:28` diz isso com todas as letras).
**Está errado para o passo 4**, que consome o mesmo `φmax` no denominador de `hm`. A espessura média
é a integral sobre o **arco realmente engajado**, que continua crescendo acima de `ae/D` = 0,5 e
chega a π no rasgo cheio.

Consequência aritmética: `hm/fz = 2ε/(π/2) = 4ε/π`, que **passa de 1 quando `ae/D` > 0,785**.

| `ae/D` | `hm` correto | `hm` com o travamento | `kc` e `Pc` resultantes |
|---|---|---|---|
| 0,95 (rasgo cheio, §1.2 de LIMITES) | 0,706 · `fz` | **1,210 · `fz`** — impossível | **−10,7%** |
| 1,00 (fresa na largura toda) | 0,637 · `fz` | **1,273 · `fz`** — impossível | **−13,5%** |

**O que quebra:** a potência e o torque saem abaixo do real exatamente na condição mais pesada que o
produto suporta — e o rasgo cheio tem alerta próprio, então é condição prevista, não borda. Pior: o
resultado viola a invariante que o próprio documento manda virar teste automatizado
(`§1.6:99` — *"`hm ≤ h_alvo`, sempre"*), então o auto-teste do projeto reprovaria a fórmula do projeto.

**Confirmação de que o defeito é do `§1.4`, não do modelo:** a mesma fórmula em `§1.1:20` do próprio
MOTOR e em `mvp/MVP_CALCULADORA_PARAMETROS.md:787` escreve o denominador como
`arccos(1 − 2·ae/D)` **sem travamento** — as duas cópias corretas, a do passo 4 não.

---

**A2 · Duas tabelas vivas de `kc1.1`/`mc` divergem em 5 dos 12 materiais, até 87%**
`canonicos/CANONICO_MOTOR_DE_CALCULO.md:114-128` × `mvp/MVP_CALCULADORA_PARAMETROS.md:1403-1416` ·
**severidade: grave**

| Material | MOTOR §2.1 | MVP §11.1 | Diferença em `kc1.1` |
|---|---|---|---|
| Ti-6Al-4V | 1500 / 0,25 — Walter F 9 #23 | **2800 / 0,22** — ⚠ sem fonte | **+87%** |
| GGG50 | 950 **ou** 800 / 0,28 — Walter F 9 #11 | **1500 / 0,20** — ⚠ sem fonte | **+58% a +88%** |
| GG25 | 800 / 0,28 — Walter F 9 #10 | **1150 / 0,20** — ⚠ sem fonte | **+44%** |
| P20 | 2000 / 0,25 — Walter F 9 #3 | **2300 / 0,20** — ⚠ sem fonte | +15% |
| 2711 | 2000–2500 / 0,25 — Walter F 9 #3/#5 | **2500 / 0,20** — ⚠ sem fonte | topo da faixa; `mc` diverge |
| H13 recozido | 2000 / 0,25 — Walter F 9 #3 | **ausente** | linha some |

**O que quebra:** `Pc` é linear em `kc1.1` (`MOTOR:83` quantifica: 20% de erro em `kc1.1` = 20% de
erro na potência). No titânio o operador vê **87% a mais de potência exigida** conforme qual das duas
tabelas o código ler. E a divergência é do pior tipo: o MVP — o documento que vira produto — carrega
os valores **legados sem fonte**, enquanto o canônico carrega os pesquisados. Os cinco `mc = 0,20` do
MVP são reconhecidos pelo próprio documento (`:1440`) como *"assinatura de preenchimento por
default"*, e o valor publicado para essa família é 0,25.

**Não é conciliável linha a linha — é escolher qual tabela é a fonte.** Duas cópias vivas da mesma
constante divergem sempre; estas já divergiram.

---

**A3 · A fresa de rosca recebe a fórmula de avanço do macho — erro de ~10×**
`mvp/MVP_CALCULADORA_PARAMETROS.md:833` (§6.6) × `:332` e `:335` (§3.2) · **severidade: grave**

`§6.6` atribui o avanço por família, e a família **Roscar** inteira recebe:

```
| Roscar | Vf = P × n | travado no passo; não é editável |
```

Mas a geometria 16 dessa família é a **Fresa de Rosca**, com `Z` padrão 3, e a nota da `§3.2:335`
diz o oposto, explicitamente: *"Número de arestas (Z) só onde o avanço é por dente (fresamento **e
fresa de rosca**)"*. `§5.1:592` repete a regra do passo para toda a família Roscar, como leitura
travada.

Numa M10×1,5 com fresa Ø8, `Z` = 3, `fz` = 0,05:

- pela regra da família: `Vf = 1,5 × n`
- por dente, que é o que a própria `§3.2` manda: `Vf = 0,05 × 3 × n = 0,15 × n`

**Fator 10.** E `§6.11:923` traz a compensação de centro da fresa de rosca
(`Vf_centro = Vf_periferia × (D_rosca − D_fresa)/D_rosca`), que pressupõe um `Vf_periferia` calculado
por dente — ou seja, `§6.6` e `§6.11` também se contradizem.

**O que quebra:** avanço 10× acima quebra a fresa de rosca no primeiro furo. E o número "parece
plausível" — está na ordem de grandeza de um avanço de fresamento.

---

### MÉDIO — inconsistência que vira bug

---

**A4 · A correção por ângulo de saída aplica a referência no lugar do ângulo real — `kc` 6% baixo em
todo material**
`canonicos/CANONICO_MOTOR_DE_CALCULO.md:59` (§1.3) e `:74` (§1.4, passo 5) · **severidade: médio**

- `:59` — a prosa diz *"a 1%/grau **acima da referência** γ0 = +6°"*, mas a fórmula escrita é
  `kc × (1 − 0,01 · γ)`, com `γ` absoluto, não `(γ − γ0)`. Em `γ` = 6° isso dá **0,94** onde deveria
  dar 1,00.
- `:74` — o passo 5 aplica `(1 − 0,01·γ0)`, ou seja, a **constante de referência**, não o ângulo real
  da ferramenta: um corte fixo de **6% no `kc` de todo material, sempre**.

**A prova de que a intenção era `(γ − γ0)` está no próprio documento.** `:63` afirma que entre 6° e
15° a diferença entre as taxas de 1% e 1,5%/grau *"vale 4,5% no `kc`"*. Esse 4,5 só sai de
`(1,5% − 1,0%) × (15° − 6°) = 4,5 pontos` — isto é, calculado sobre `(γ − γ0)`. Com `γ` absoluto
daria 7,5 pontos. A sensibilidade publicada usa a fórmula certa; a fórmula publicada, não.

**O que quebra:** potência e torque 6% abaixo do modelo em toda a faixa, sem que nada na tela indique.

**O MVP está correto e não é parte do defeito:** `mvp/...:838` omite o termo, e `:856-860` declara por
quê — *"os valores de catálogo pressupõem ângulo de saída de +6° … não é aplicada no MVP; entra como
nota na procedência"*. É a leitura coerente.

---

**A5 · `Pc` significa duas coisas — e o LIMITES desmente a si mesmo três linhas depois**
`canonicos/CANONICO_LIMITES_E_ALERTAS.md:144` e `:147` · **severidade: médio**

```
144:  Pc     = (ap × ae × vf × kc) / (60 × 10⁶ × η)      [kW]
147:  ⇒ Q_max = (Pm × η × 60000) / kc                     [cm³/min]
```

A `:144` chama de `Pc` uma expressão com `η` **no denominador** — que é `Pm`, potência no motor, pela
definição do próprio acervo (`MOTOR:77`, `MOTOR:104`, `GLOSSARIO:46`). E a `:147` prova isso: `Q_max`
só fecha algebricamente se o lado esquerdo da `:144` for `Pm`. Substituindo `ap·ae·vf = 1000·Q` na
`:144` e isolando: `Q = Pc · 60000 · η / kc` — a `:147` escreveu `Pm` onde a `:144` escreveu `Pc`.

Contra: `MOTOR:76` e `mvp/...:876` — `Pc = Q·kc/60000`, sem `η`, os dois concordando entre si.

**O que quebra:** erro de fator `1/η`. Com `η` = 0,85, 18% na potência exibida. O próprio documento
(`:154-156`) chama isso de *"armadilha de rótulo — regra dura"* e alerta contra exatamente este erro,
na página em que o comete.

---

**A6 · A marca de extrapolado de Kienzle dispara na espessura errada**
`escopo/E4_INDICADORES_E_SEGURANCA.md:163` (gatilho 11a) e `mvp/...:1278` (gatilho 1a) ·
**severidade: médio**

Os dois gatilham em **`hex < 0,1 mm`**. Mas o limite do modelo é sobre a espessura que **entra em
Kienzle**, e essa é a **média**: `MOTOR:89` — *"O modelo de Kienzle não é adequado a `h < 0,1 mm`"* —
e `h` ali é o `hm` de `§1.1`, não `hex`. `mvp/...:850` e a lacuna `L6` do MVP também escrevem `h`.
`E4:148` declara textualmente que nas fórmulas `hex` é a **máxima**.

Como `hex/hm → 2` em penetração baixa (`mvp/...:797`), gatilhar em `hex` faz a marca aparecer só
quando o `hm` real já caiu a ~0,05 mm — **metade do limiar pretendido**.

**O que quebra:** resultados na faixa em que o par `(kc1.1, mc)` não é transferível saem **sem** a
marca de extrapolado. É a decisão Q28 (`BLOCO_DE_DECISAO.md:115`) aplicada na variável errada.
O gatilho 1 (`hex < 0,3 × rβ`) está certo em `hex` — o piso de esfregamento é mesmo sobre a máxima.

---

**A7 · O teto do controle de `Vc` é menor que o limiar do alerta de `Vc` — duas regras nascem mortas**
`mvp/MVP_CALCULADORA_PARAMETROS.md:618` × `:1281` e `:1311` · **severidade: médio**

- `§5.3:618` — controle de `Vc`, máximo = `Vc_max do material × 1,3`.
- `§9.2:1281` — gatilho 4 dispara em `Vc > 1,4 × Vc_max`.
- `§9.4:1311` — sanidade dispara em `Vc > 10 × Vc_max`.

O controle não alcança 1,4×, muito menos 10×. **A metade superior do gatilho 4 e a metade superior da
sanidade nunca disparam.** O lado de baixo funciona (mínimo do controle = 0, limiares 0,6× e 0,1×).

**O que quebra:** duas regras com procedência declarada (`LIMITES:81` e `:86`) viram código morto, e
ninguém descobre — o teste que passaria é o teste que nunca roda. Ou o teto do controle está errado,
ou os dois limiares precisam ser redeclarados.

---

**A8 · O alerta de velocidade compara contra uma faixa que a tabela do MVP não publica**
`mvp/MVP_CALCULADORA_PARAMETROS.md:1455-1468` × `:599` × `:529` e `:550` · **severidade: médio**

O gatilho 4 (`:1281`) precisa de `Vc_min` e `Vc_max` **do material**. A `§11.2` publica, por material,
um **valor único** de partida interna mais um "ponto de catálogo comparável" — nunca uma faixa. Três
partes do documento definem a origem do `Vc` de três formas incompatíveis:

| Onde | O que diz | H13 |
|---|---|---|
| `§11.2:1462` | partida interna, valor único | **60** m/min |
| `§5.2:599` | *"ponto médio da faixa do material (§11.2)"* | faixa não existe |
| `§4.7:550` | exemplo de tela: *"Velocidade 46–147 m/min"* | **46–147** — e é o par side milling / HSM da `VELOCIDADES:121`, duas estratégias diferentes coladas numa faixa |

O ponto médio de 46–147 é 96,5, não 60.

**O que quebra:** entrada fantasma — o alerta consome dois campos que o documento de dados não
define, e o valor de partida tem três origens possíveis com resultados diferentes.

---

**A9 · `⧗ AGUARDA R2` continua vivo no LIMITES depois de o MOTOR declarar fechado**
`canonicos/CANONICO_LIMITES_E_ALERTAS.md:56`, ecoado em `:209` (§3, item 5) e `:244` (§5, item 7) ·
**severidade: médio**

`MOTOR:177` fecha: *"O `⧗ AGUARDA R2` do `CANONICO_LIMITES_E_ALERTAS.md` §1.1 **fecha**"*, e a
`§1.1:27` do MOTOR resolve a escolha entre as duas fórmulas com os dois territórios da rodada. No
LIMITES o marcador segue no texto, e a `:244` ainda declara a dependência como *"a única dependência
dura deste documento"*.

**O que quebra:** quem implementar lendo o LIMITES entende que o piso de espessura não pode ser
implementado, e ele pode.

---

**A10 · A regra de alerta revogada em 27/08 sobrevive em cinco lugares**
`canonicos/CANONICO_LIMITES_E_ALERTAS.md:243` · **severidade: médio**

A decisão Q29 (`BLOCO_DE_DECISAO.md:135`) dissolveu a regra e criou a 14ª regra geral: *"o alerta
descreve o risco e situa o valor, não instrui o operador"*. O cabeçalho (`:8-15`) e a `§1:44` do
próprio LIMITES aplicam isso. Sobrevivem:

| Linha | Texto residual |
|---|---|
| `LIMITES:243` | *"**Todo alerta carrega alvo numérico.** Avisar sem dizer **para onde ir** transfere o problema"* — a regra revogada, afirmada como consequência para quem implementa |
| `LIMITES:105` | *"a **redução necessária** no engajamento radial **ou** no balanço, com os dois números"* |
| `LIMITES:133` | *"ciclo pica-pau com passo de 1 × D, **ou trocar** para broca com canal de refrigeração"* |
| `LIMITES:78` | *"Mensagem com alvo: … **ou o diâmetro que resolveria**"* |
| `mvp/...:1343` | *"a mensagem diz o alvo mesmo assim: **'reduza a profundidade em 60% — ou use ferramenta de maior diâmetro'**"* — verbo de comando literal, 77 linhas depois de `:1266` listar "reduza" entre os verbos que saem |

A cláusula geral da `LIMITES:44` cobre a expressão *"a mensagem, com alvo"*, mas não cobre um item de
consequência que **afirma a regra** nem os verbos de comando explícitos.

**O que quebra:** a decisão de produto mais recente do projeto chega ao implementador contradita
dentro do mesmo arquivo.

---

**A11 · A correção que o MOTOR mandou fazer no LIMITES não foi feita**
`canonicos/CANONICO_LIMITES_E_ALERTAS.md:180` e `:185` · **severidade: médio**

`MOTOR:166` (Lacuna 4.8) determina: *"O fator `1,1–1,3` que sustentava o teto de aproveitamento de
potência de 0,77 no `CANONICO_LIMITES_E_ALERTAS.md` **não tem fonte verificável e precisa ser
corrigido ali**"*. `MOTOR:178` repete como consequência.

No LIMITES, a `§2.2:180` ainda apresenta o fator `1,1–1,3` como `REFERÊNCIA ÚNICA` de fabricante, e a
`:185` ainda deriva dele o teto de 0,77 chamando a convergência com 80% de *"corroboração"*.

**O que quebra:** um teto de potência apoiado num fator que o canônico do motor já declarou sem
fonte. Se o `1,1–1,3` cai, o 0,77 cai junto — e `L-21` (`:225`) continua descrevendo o 0,77 apenas
como "derivado, não publicado", que é uma descrição mais branda que a do MOTOR.

---

**A12 · O rótulo de confiança do módulo de elasticidade foi corrigido em um lugar e não nos outros
dois do mesmo arquivo**
`canonicos/CANONICO_FERRAMENTAS_E_SUBSTRATOS.md:172` e `:195` · **severidade: médio**

`DEFLEXAO:216` registra a correção como ~~riscada~~ **RESOLVIDO (issue #2)**, e a `§2.2:105` do
FERRAMENTAS de fato já traz `560–624 GPa` com `CONSENSO` de três linhagens, com a `:116` declarando
que *"a faixa antiga 550–610 sai"*. Mas no mesmo documento:

- `:172` (Lacuna 8) — *"580 GPa é `REFERÊNCIA ÚNICA`, de um território só; a ponta de **610 GPa** é
  extrapolação não publicada"*. Os 610 já saíram; o rótulo já subiu.
- `:195` (Consequência 5) — *"O módulo de elasticidade é `REFERÊNCIA ÚNICA` de um território só"*,
  contradizendo a `:112` do próprio arquivo, que descreve a confirmação **cega** por território
  independente.

**O que quebra:** três rótulos de confiança diferentes para a mesma constante, no mesmo arquivo.
Quem for fechar lacunas trabalha numa que já fechou.

---

**A13 · A faixa `560–624 GPa` não cobre a própria tabela na janela de cobalto que dois documentos
declaram**
`canonicos/CANONICO_DEFLEXAO_E_VIDA.md:123`, `:125`, `:144` ×
`canonicos/CANONICO_FERRAMENTAS_E_SUBSTRATOS.md:105` · **severidade: médio**

A mesma faixa é atribuída a duas janelas diferentes:

| Documento | Janela declarada | A faixa cobre a tabela? |
|---|---|---|
| `FERRAMENTAS:105` | **6–11% Co** | ✓ sim — 624 (6%) a 560 (11%) |
| `DEFLEXAO:123` + `:125` + `:144` | **6–12,5% Co** | ✗ não — a própria tabela `§2.1` dá 549 e 547 a 12% Co e 543 a 12,5% |

E o mesmo documento usa os dois pisos: a faixa parte de 560, mas a tabela de erro da `:144` usa 543
(12,5% Co) para chegar ao `−6,4%`.

**O que quebra:** a faixa que carrega o rótulo `CONSENSO` — e que é citada de um documento para o
outro — exclui três graus que estão dentro da janela que ela própria declara.

---

**A14 · A fórmula do NPL pede fração **volumétrica** de cobalto; a tabela ao lado é em **massa**, sem
conversão**
`canonicos/CANONICO_DEFLEXAO_E_VIDA.md:129` × `:113-121` · **severidade: médio**

```
E [GPa] = 708 − 821·V_Co + 412·V_Co²        (V_Co = fração volumétrica de cobalto)
```

A tabela logo acima é indexada por `%Co`, que em grau de metal duro é **percentual em massa** (é como
CERATIZIT e Kennametal publicam). Não há linha de conversão entre as duas.

Recalculado, com a densidade de Co 8,9 e de WC 15,6:

| Grau | %Co massa | `V_Co` correto | `E` pela fórmula | Tabela | Se alguém usar a massa direto |
|---|---|---|---|---|---|
| CTS12D | 6,0 | 0,1008 | 629 | 624 ✓ | 660 — **+5,8%** |
| CTS30D | 15,0 | 0,2366 | 537 | 512 ✓ | 594 — **+16,0%** |

Com a conversão, a fórmula reproduz a tabela dentro de 1–5%. Sem ela, o erro chega a 16% e **cresce
com o teor de cobalto**, justamente onde o metal duro é mais mole.

**O que quebra:** `δ ∝ 1/E`. É a definição de constante de conversão nua do verificador 1 — o
documento entrega a fórmula geradora sem dizer em que unidade ela come.

---

**A15 · `vf` é consumido na cadeia do MOTOR e nunca produzido nela**
`canonicos/CANONICO_MOTOR_DE_CALCULO.md:75` · **severidade: médio**

O passo 6 usa `Q = ap × ae × vf / 1000`. Nenhum dos 9 passos calcula `vf`, e o `Z` que a fórmula de
`vf` exige não é declarado como entrada da cadeia. A única aparição de `vf = fz × n × z` é `:45`,
dentro da `§1.2`, que é a seção da **fresa esférica** — e ali com `z` minúsculo, contra o `Z` do
glossário.

**O que quebra:** entrada fantasma. Quem implementar a `§1.4` como cadeia fechada trava no passo 6.

**A cadeia do MVP não tem esse buraco:** `§6.1:725` põe `Vf` como passo próprio, entre `hm/hex` e `Q`,
e `§6.6:829` dá a fórmula por família.

---

**A16 · `De` nomeia duas grandezas diferentes, e as duas rodam na mesma cadeia**
`canonicos/CANONICO_MOTOR_DE_CALCULO.md:40` × `canonicos/CANONICO_LIMITES_E_ALERTAS.md:98` ·
**severidade: médio**

| Sentido | Onde | Fórmula |
|---|---|---|
| **diâmetro efetivo de corte** — a calota que corta em ponta curva | `MOTOR:40`, `mvp/...:738`, `GLOSSARIO:32` | `De = 2√[ap·(D − ap)]`, entra em `n = vc·1000/(π·De)` |
| **diâmetro da parte canalizada da haste** — o núcleo resistente | `LIMITES:98`, `DEFLEXAO:154` | `De = 0,80 × D`, entra em `I2 = π·De⁴/64` |

O glossário só define o primeiro. Numa esférica Ø10 com `ap` 0,5 os dois valem 4,36 mm e 8,0 mm — e
o cálculo consome os dois, um na rotação e o outro na deflexão. É o defeito que a skill nomeia (`P`
de passo × `P` de potência), na sua forma mais cara: **os dois sentidos convivem na mesma cadeia de
cálculo**. Agrava: `GEOMETRIA:26` escreve o primeiro como `D_eff`, uma terceira grafia.

---

**A17 · `L/D` usado para profundidade de furo, onde o glossário e a linha vizinha dizem
balanço/diâmetro**
`mvp/MVP_CALCULADORA_PARAMETROS.md:1283` e `:1284` · **severidade: médio**

```
| 5 | L/D acima do limiar do tipo de haste            ← balanço/diâmetro (correto)
| 6 | Furação sem canal interno, L/D > 3              ← profundidade do furo/diâmetro
| 7 | Furação com canal interno, L/D > 30             ← idem
```

`GLOSSARIO:34` e `:36` definem `L` = **balanço** e `L/D` = **relação balanço/diâmetro**. As mensagens
das linhas 6 e 7 dizem *"a profundidade contra o limiar de 3 × D"* — profundidade, não balanço. Três
linhas, dois sentidos, na mesma tabela.

**O defeito é do MVP, e não vem da fonte:** `LIMITES:133-134` e `E4:158-159` escrevem *"acima de
3 × D"* e *"acima de 30 × D"*, sem usar `L/D`.

**O que quebra:** implementado como está, uma broca de canal interno com 100 mm de balanço e 20 mm de
furo dispara — ou não dispara — pelo critério errado.

---

**A18 · O exemplo resolvido do E3 usa a fórmula de afinamento que o MOTOR eliminou, e três de seus
números não fecham**
`escopo/E3_RESULTADOS_E_APRESENTACAO.md:79-114` · **severidade: médio**

Exemplo: *aço 1045, fresa toroidal Ø10 R1,0 Z4 L30, `vc` 200, `fz` 0,140, `ae` 4,5, `ap` 8,0.*

| Número exibido | Confere? | Recálculo |
|---|---|---|
| `n` 6 366 rpm | ✓ | `200000/(π×10)` = 6 366,2 |
| `Mc` 8,7 N·m | ✓ | `9549 × 5,8/6366` = 8,70 — coerente com o `Pc` exibido |
| `MRR` 55,0 cm³/min | ✓ | `8 × 4,5 × 1528/1000` = 55,0 — coerente com o `vf` exibido |
| 53% de 12 000 · 31% de 5 000 · sobra 61% | ✓ | 53,1% · 30,6% · 61,3% |
| **`CTF` 1,49×** | ✗ | `1/√(ae/D)` = `1/√0,45` = **1,4907** — é a fórmula simplificada que `MOTOR:175` manda sair. A exata dá **1,005** (`ae/D` = 0,45 está quase no ponto em que o CTF é 1) |
| **`vf` 1 528 mm/min** | ✗ | `fz × Z × n` = `0,140 × 4 × 6366` = **3 565**. O 1 528 corresponde a `fz` = 0,060 |
| **`Pc` 5,8 kW** | ✗ | exige `kc` ≈ 6 327 N/mm². Pelo par canônico do 1045 (1500 / 0,21) com `hm` = 0,086: `kc` = 2 513 e `Pc` = **2,3 kW** |

Some-se que `E3:44` e `:111` exibem *"avanço por dente efetivo, com afinamento de cavaco"* e `:46`
um indicador de CTF ativo — compensação automática que `mvp/...:815` (*"nenhuma correção é aplicada
por cima"*) e `E7:93` põem **fora** do produto.

**O que quebra:** exemplo resolvido é lido como especificação por quem implementa a tela, e este
carrega a fórmula descartada mais três números que não se reproduzem.

---

**A19 · O teto de `ap` usa 0,8 × D acima do Ø6 e a justificativa ao lado diz que usa 1,0**
`mvp/MVP_CALCULADORA_PARAMETROS.md:621` × `:623-626` · **severidade: médio**

```
621:  ap máximo = min( teto proporcional ; comprimento de aresta )
      teto proporcional = 1,0 × D para D ≤ 6, senão 0,8 × D
623:  "a faixa publicada para desbaste convencional é ap de 0,5 a 1,0 × D … O teto do
       controle usa a ponta alta dessa faixa."
```

A ponta alta da faixa é 1,0. Acima do Ø6 a regra usa **0,8**, que não está na faixa citada, não tem
fonte declarada e não é justificado em lugar nenhum. `GEOMETRIA:71` confirma a faixa publicada
(0,5–1,0×D, Guhring 3019) e não traz o 0,8.

**O que quebra:** constante órfã dentro de um limite de controle — e o degrau em Ø6 aparece do nada.

---

**A20 · Duas geometrias da família Fresar não têm valor de partida de `ae`, que a fórmula de `Q`
consome**
`escopo/E1_DOMINIO_E_CATALOGO.md:70` e `:72` · `mvp/MVP_CALCULADORA_PARAMETROS.md:320` e `:322` ·
**severidade: médio**

| # | Geometria | Família | Partida `ap · ae · L` |
|---|---|---|---|
| 4 | Fresa de Chanfrar | Fresar | `1 · **—** · 30` |
| 6 | Cabeçote Faceador | Fresar | `1 · **—** · **—**` |

A família Fresar calcula `Q = ap × ae × Vf / 1000` (`mvp/...:870`) e expõe `ae` como controle de
ajuste (`§5.1:590`), cujo valor de partida é *"padrão da geometria (§3.2)"* (`§5.2:601`). Para essas
duas o padrão não existe. E o Faceador ainda fica sem partida de balanço, que é campo obrigatório
(`§4.1:434`) e produz o `L/D`.

**O que quebra:** `MRR`, `Pc` e `Mc` não saem no primeiro cálculo em duas das oito geometrias de
fresamento — contra a garantia de `§1.2` e `§5.2:605` de que *"quem não mexe em nada obtém exatamente
a recomendação"*. É família incompleta no sentido exato do verificador 5.

---

### LEVE — forma

---

**A21 · `f_hex` é calculado e ninguém consome** — `MOTOR:72` (passo 3). Os passos 4 a 9 não o usam; o
passo 4 parte de `fz_programado`. Resultado órfão: ou falta o passo que o aplica, ou ele sai da
cadeia.

**A22 · `Pm` aparece em fórmula e não está no glossário** — `MOTOR:77`, `:78`, `:104`, `LIMITES:147`,
`:150`. `GLOSSARIO:46` define só `Pc` e descreve a potência no motor em prosa, sem batizar o símbolo
que as fórmulas usam.

**A23 · Raio de aresta com dois símbolos, e o segundo colide com outra grandeza** — `rβ`
(`GLOSSARIO:44`, `LIMITES:58`) × `r_e` (`VELOCIDADES:49`, `:55`, `:57`, `:182`, `:201`). Pior que
sinônimo solto: `r_e` é a transliteração natural de `rε`, que `GLOSSARIO:43` define como **raio de
ponta** — outra grandeza, usada em `mvp/...:925` e `E1:63`.

**A24 · `hex` em duas formas, com a nota de equivalência longe das duas** — `MOTOR:19` escreve
`fz·√[1−(1−2·ae/D)²]`; `LIMITES:51` e `mvp/...:781` escrevem `fz·2·√(ae/D−(ae/D)²)`. Recalculado:
`1−(1−2ε)² = 4(ε−ε²)`, e a raiz de um é a raiz do outro — **idênticas**. A equivalência está
declarada, mas em `MOTOR:177`, na seção de consequências de um terceiro documento, e na forma
*"é exatamente o inverso do CTF"*.

**A25 · A constante `/4` da taxa de remoção na furação não diz que conversão é** — `mvp/...:871`,
`Q = (D × fn × Vc)/4`. Recalculada: `(π·D²/4)·fn·(1000·Vc/π·D)/1000 = D·fn·Vc/4` cm³/min. **O número
está certo** — o `/4` absorve a área do furo, o cancelamento de π e a conversão mm³→cm³ de uma vez.
Falta o comentário.

**A26 · A cópia de `hm` no MVP perde a legenda de radianos** — `MOTOR:21` traz
*"[arccos em radianos; κ = ângulo de posição]"*; `mvp/...:787` repete a fórmula sem ela. Implementada
em graus, `hm` erra por fator 57,3.

**A27 · Faixa que virou ponto na microfresa** — `FERRAMENTAS:81`: *"revestir multiplica o raio de
aresta por **2,2× a 3,7×**, e a espessura mínima de cavaco sobe **+266%**"*. Como `h_min ≈ α × r_e`, a
faixa de entrada produz **+120% a +270%**; o +266% é só a ponta alta. Precisão inventada sobre uma
faixa que o próprio período declara.

**A28 · "Quase 5× menor" não sai de nenhuma leitura** — `VELOCIDADES:24`: as razões publicadas são
1,78× e 1,60×, contra 1,10× em uso, *"quase 5× menor que o publicado"*. Por incremento:
78%/10% = 7,8× e 60%/10% = 6,0×. Por razão direta: 1,62× e 1,45×. O 5 não é nenhum dos quatro.

**A29 · A tabela de roscas diverge da própria fórmula em 2 das 8 linhas** — `mvp/...:920`
(`Ø = D − P`, escrito como igualdade) × `§11.4:1515-1524`:

| Rosca | Fórmula | Tabela |
|---|---|---|
| M8 | 8 − 1,25 = **6,75** | **6,80** |
| M12 | 12 − 1,75 = **10,25** | **10,20** |

As outras seis batem, e a tabela é que está certa pela prática (6,8 e 10,2 são as brocas de norma).
A fórmula é a aproximação — mas está escrita com `=`, não com `≈`, ao contrário da fórmula de
conformação (`:921`), cuja coluna fecha dentro do `≈`.

**A30 · "Dobrar `L/D` de 3 para 4"** — `LIMITES:116`, `mvp/...:908`, `E4:185`. Só 3→6 é dobrar. Os
três percentuais (137%, 363%, 700%) estão **corretos**; é a palavra que não descreve a conta.

**A31 · Grau usado numa tabela de erro e ausente da tabela de origem** — `DEFLEXAO:139` usa
CTF25E (12,5% Co, 543 GPa) para ancorar o `−6,4%`, mas a tabela `§2.1:113-121` vai de 12,0% a 15,0%
sem essa linha.

**A32 · Fórmula de família que mora só numa célula de catálogo** — Fresa de Chanfrar: *"o cálculo usa
o diâmetro médio `(Dmin + Dmax)/2`"* (`E1:70`, `mvp/...:320`). Não aparece na tabela de diâmetro
efetivo (`mvp/§6.2:736-740`) nem em `§6.11`, e `Dmin` não está no glossário.

---

## 2. Perguntas

Suspeitas que não viram achado — não porque falte linha, mas porque a resposta é decisão, não
conferência.

**P1 · `Vc_min` ou `Vc` alvo?** `GEOMETRIA:47` escreve `D_min,proc = 1000 · Vc_min / (π · n_max)` e o
exemplo da `:51` diz *"Vc **alvo** 200 m/min"*. `mvp/§4.3:467` e `:470` repetem os dois, iguais. A
conta fecha (`1000×200/(π×12000)` = 5,3 mm ✓), então não é erro de número: ou o rótulo da fórmula
devia ser `Vc_alvo`, ou o exemplo devia dizer "Vc mínima recomendada". São coisas diferentes na hora
de implementar — o piso de diâmetro muda conforme qual das duas alimenta a fórmula.

**P2 · O piso de `fz` = 0,002 saiu ou ficou?** `VELOCIDADES:201` é categórico: *"O piso absoluto
`fz = 0,002 mm/dente` **sai**"*, substituído por `α × r_e`, que não é calculável em número. Mas
`mvp/§5.3:619` mantém `0,002` como mínimo do controle, declarado como `DECISÃO DE PROJETO` em `:628`.
Funcionalmente o piso continua existindo — o operador não desce dele. É a decisão pretendida, ou o
canônico deveria dizer "sai como limite físico, fica como limite de controle"?

**P3 · O `ae/D` da fresa esférica usa `D` ou `De`?** `mvp/§6.2` corrige a rotação pelo diâmetro
efetivo, e a `§6.4:781`/`:787` calcula `hex` e `hm` com `ae/D`. Em corte raso com esférica, o `D` que
enxerga a penetração radial é o efetivo, não o nominal — mas nenhum documento diz qual entra ali.
`MOTOR:161` (Lacuna 4.3) declara que esférica com `κ` variável não tem forma fechada de `hm`, o que
sugere que a pergunta foi vista; não achei onde foi respondida.

**P4 · O E3 descreve o produto inteiro ou o MVP?** `E3:176-187` especifica o fator de segurança em
detalhe, e o exemplo da `:80` aplica *"segurança 80%"* e *"sobra 61% da potência da máquina"* — as
duas coisas que `mvp/§12:1535` põe fora do MVP por dependerem de perfil de máquina. Se o E3 é escopo
do produto completo, está coerente e só o A18 se aplica; se pretende descrever o MVP, o desalinho é
maior que os três números.

---

## 3. O que está certo

Sem esta seção ninguém sabe o que foi coberto. Nomeando o que passou:

**Verificador 1 — unidades e dimensional**

- **`De` fecha em três documentos.** `MOTOR:40` (`√[D3²−(D3−2ap)²] ≡ 2√[ap(D3−ap)]`), `GEOMETRIA:26`
  (`2√(D·ap−ap²)`) e `mvp/:738` (`2√[ap·(D−ap)]`) são a mesma expressão, expandida e conferida.
- **O exemplo da esférica reproduz dado publicado.** `De` = 2√19 = 8,7178; `n` = 150000/(π×8,7178) =
  5 477 contra 5 500 publicados — **0,4%**. E o erro pelo nominal é 10/4,359 = **2,29×**, que é o
  "2,3×" citado em quatro lugares.
- **O `hm` deduzido é a integral certa.** `hm = fz·2ε/φmax` é exatamente `fz·(1−cos φmax)/φmax` com
  `cos φmax = 1−2ε` — e no rasgo cheio, com `φmax` = π, colapsa em `2fz/π`, o valor clássico. (É o
  que torna o A1 um defeito de travamento, não de modelo.)
- **`δ` é caractere a caractere idêntico** entre `LIMITES:95` e `DEFLEXAO:19`, e o teste de sanidade
  fecha: com `I1 = I2` a expressão vira `F·L³/(3EI)`, a viga simples clássica.
- **`hex` nas duas formas é a mesma coisa** — verificado algebricamente (A24).
- **`Q` da furação deriva exatamente** — o `/4` é correto (A25).
- **A constante de torque está certa e é consistente.** `Mc = 9549·Pc/n` em `MOTOR:78` e
  `mvp/:877`; `9549,3 = 1000×60/2π` ✓. **Não existe nenhum `9550` no acervo** — a suspeita do plano
  não se confirma.
- **`Pc = Q·kc/60000` fecha dimensionalmente**: cm³/min × N/mm² = 10³ N·mm/min ÷ 6×10⁴ = kW ✓.

**Verificador 2 — séries, tabelas e constantes**

Sete tabelas recalculadas linha a linha. **Todas fecham:**

| Tabela | Linhas | Resultado |
|---|---|---|
| Erro das simplificações de viga — `DEFLEXAO:36-42` | 5 × 2 | exatas: 1,1 / 8,4 / 23,7 / 42,5 / 59,0% e 141 / 124 / 86 / 40 / 0% |
| Sensibilidade de `De/D` 0,75→0,85 — `DEFLEXAO:160-166` | 5 | exatas: 1,0 / 3,3 / 14,0 / 32,5 / 65,0% |
| Vida remanescente por `n` de Taylor — `DEFLEXAO:89-91` | 6 | exatas: 23,3 / 48,2 / 57,6 / 63,4 / 69,4 / 73,8% |
| Erro em `δ` ao fixar 580 GPa — `DEFLEXAO:136-142` | 5 | exatas: −11,7 / −6,4 / −1,7 / +7,6 / +11,4% |
| Divergência `fz` sistema × catálogo — `VELOCIDADES:136-143` | 8 | exatas: +9 / +36 / +37 / +42 / +32 / +17 / +8 / +2% |
| `Vc` por faixa de HRC — `VELOCIDADES:122` | 6 | monotônica, sem quebra de razão entre vizinhos |
| `fz` de partida por Ø — `mvp/:1490-1503` | 12 | monotônica, razões suaves (2,0 → 1,11), sem degrau anômalo |

- **Os multiplicadores de estratégia se reproduzem da tabela de origem.** `VELOCIDADES:159` afirma
  +392% e +215%; `375,2/76,2` = 4,92 e `147,0/46,6` = 3,15 ✓.
- **As divergências de `Vc` de partida batem** — `mvp/:1457` e `:1459`: 47–137% e 18–54% ✓.
- **A faixa do aço rápido fecha** — `FERRAMENTAS:99`: 13,6% entre 0,22 e 0,25 ✓; e o 0,29 antigo é
  16% a 32% acima ✓.
- **Os passos da tabela de roscas são os passos ISO grossos**, oito de oito, e a coluna de
  conformação é consistente com `≈ D − P/2`.
- **Os efeitos de `L/D` estão certos nos três documentos** — 137%, 363%, 700% e 6,7× (A30 é só a
  palavra).
- **A repetição de valor redondo na tabela do MOTOR não é preenchimento por default** — `MOTOR:112`
  declara o critério do fabricante (`mc` publicado por classe, não por liga) antes de repetir, que é
  exatamente o teste que a skill exige.

**Verificador 3 — estrutura de cálculo**

- **A cadeia do MVP fecha** (`§6.1:725`): `De → n → hm/hex → Vf → Q → kc → Pc → Mc → L/D`, todo
  insumo produzido antes de ser consumido, sem órfão. É a cadeia do MOTOR que tem os dois buracos
  (A15, A21).
- **A faixa de validade está declarada em todos os modelos:** Kienzle abaixo de 0,1 mm
  (`MOTOR:89`), CTF para `ae/D ≤ 0,5` (`:27`), `De` só para `ap ≤ D/2` (`GEOMETRIA:26`), viga
  escalonada dependente de `Lc` (`LIMITES:103`), toroidal marcada `NÃO VERIFICADO` (`mvp/:740`).
- **O ciclo avanço ↔ espessura está tratado como invariante testável**, não como iteração
  escondida — `MOTOR:99-100` e `mvp/§13.2`.
- **Nenhum "não invente" foi violado onde o número falta:** deflexão em micrômetros e previsão de
  vida saem do produto declaradamente, em vez de receberem constante arbitrada (`DEFLEXAO:214`,
  `E4:191`).

**Verificador 4 — jargão**

- O padrão de nomenclatura de 27/08 está aplicado com o toque certo por tipo de documento — prosa
  com nome por extenso, fórmulas em símbolo, e o cabeçalho de nomenclatura presente nos seis
  canônicos.
- `hmin` × `h_min`, `Q` × `MRR` e `κ` × `KAPR` (`VELOCIDADES:50`) aparecem, mas os três estão
  cobertos: o glossário registra `Q` e `MRR` como o mesmo (`:37`), e as outras duas são só grafia.
  Ficam listadas aqui, não como achado.
- Os símbolos que o plano apontava como ausentes do glossário e que **de fato não precisam entrar**:
  `Ktc/Krc/Kte/Kre`, `I1/I2`, `L2`, `Cw`, `D3` — todos aparecem uma única vez, com legenda de
  variáveis ao lado, que é o que a regra de escrita do glossário (`:14`) pede para fórmulas.

**Verificador 5 — ferramentas e famílias**

- **As 17 geometrias são idênticas entre `E1:63-83` e `mvp/:312-333`** — conferidas coluna a coluna,
  incluindo `Z` padrão, substratos e campos próprios. Duas cópias de tabela que **não** divergiram.
- **A distinção `fz` (por dente) × `fn` (por rotação) está correta em toda parte** — `§6.6:829-833`,
  `§5.1:588-593`, e a nota de `§3.2:335` de que arestas só existem onde o avanço é por dente. (O A3
  é a exceção, e é uma linha de tabela, não a regra.)
- **O envelope por família está tratado exatamente como a skill exige** — `E2:107` e Q22: as famílias
  que não são fresamento **não herdam** o envelope da fresa, e a ajuda do campo diz que não foi
  levantado. E `E2:131` grava a regra que a skill classifica como achado grave quando violada:
  *"a calculadora nunca mostra um valor de partida copiado de uma linha de tabela sem dizer de qual
  linha veio"*.
- **A toroidal em aberto está coerente nos três lugares** — presente no catálogo, com a fórmula
  marcada `NÃO VERIFICADO` (`mvp/:740`), a lacuna declarada (`MOTOR:161`, `mvp/L1`) e o resultado
  saindo com marca de extrapolado. Catálogo e lacuna não se contradizem.
- **Nenhuma ferramenta do catálogo tem substrato incompatível com os 12 materiais**, e a regra que
  poderia gerar a combinação impossível (diamante/PCD em ferroso) está resolvida por ausência de
  oferta, com o registro de por quê em `E7`.

**Cruzamentos do plano que passaram**

- **Cruzamento 7 — `E = 580 GPa`:** o valor é o mesmo nos três documentos ✓. O rótulo é que diverge
  (A12), e só em dois pontos do FERRAMENTAS.
- **Cruzamento 8 — as diretivas "corrigir ali":** `MOTOR:177` (o `⧗`) e `MOTOR:178` (o teto 0,77) são
  as duas do MOTOR — nenhuma feita (A9, A11). Do lado do `DEFLEXAO:215-216`, as duas estão
  ~~riscadas~~ como RESOLVIDO, e **as duas foram de fato aplicadas** no destino: `LIMITES:92-103`
  usa a viga escalonada com `Lc` ✓, e `FERRAMENTAS:105` traz a faixa nova com `CONSENSO` ✓. A
  disciplina de fechar o ciclo existe no projeto — o DEFLEXÃO a executou, o MOTOR não.

---

## 4. Verificação desta auditoria

- Todo `arquivo:linha` citado foi aberto e conferido contra a linha citada.
- Todo achado com número foi **recalculado**, não lido: A1 (integral de `hm` em 2 pontos), A2 (6
  razões), A3 (2 avanços), A4 (a identidade de 4,5 pontos), A5 (a álgebra de `Q_max`), A14 (2
  conversões de fração), A18 (7 números do exemplo), A25, A27, A28, A29.
- Os 5 verificadores estão representados: cada um tem achado **ou** a frase explícita do que passou,
  na seção 3.
- Nenhum defeito fabricado. Onde a dúvida era de decisão e não de conferência, virou pergunta na
  seção 2 — quatro casos.
- Quatro suspeitas do plano **não se confirmaram** e estão registradas como tal: o `9550` (não
  existe), `r_e` no MOTOR (não existe), `hex` sem nota de equivalência (a nota existe, em
  `MOTOR:177`), e o MVP §6.7 "omitindo" a correção `γ` (a omissão é correta e declarada).
- Documentos-fonte intocados: só este arquivo é novo.
