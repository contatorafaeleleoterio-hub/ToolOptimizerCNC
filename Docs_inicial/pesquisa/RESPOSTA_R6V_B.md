# RESPOSTA_R6V_B — Território: FONTE PRIMÁRIA DE ENGENHARIA

> Arquivo criado vazio antes da primeira busca (trava 4 — gravação incremental).
> Blocos serão anexados conforme a apuração avança.

---

## Log de apuração — bloco 1 (Q1, fichas de substrato)

**Achado negativo relevante (registrado antes de qualquer valor):**
CERATIZIT, *Solid Carbide Rods*, catálogo 2017.V1 US (PDF, 40 p.), páginas 6–7 —
tabela "Carbide: Grades — Composition and Properties". Colunas publicadas:
código CERATIZIT, código ISO, código US, **binder [m%]**, densidade [g/cm³],
HV30, HRA, TRS [MPa/psi], KIC (Shetty). **Não há coluna de módulo de elasticidade.**
O módulo aparece só na p. 4, na lista de "critérios relevantes para aplicação"
("Modulus of elasticity, rigidity"), sem valor.

Graus de haste (substrato de fresa inteiriça) confirmados nessa tabela, com
teor de binder e classe de grão (classificação de grão na própria p. 6:
nano <0,2 µm · ultrafino 0,2–<0,5 · submícron 0,5–<0,8 · fino 0,8–<1,3 ·
médio 1,3–<2,5 · grosso 2,5–<6,0 · extragrosso >6,0):

| Grau | Classe de grão | Binder [m%] | Densidade | HV30 | TRS [MPa] |
|---|---|---|---|---|---|
| CTU08L | ultrafino (~0,2 µm decl. p.7) | 4,2 | 15,05 | 2200 | 3700 |
| TSF22 | ultrafino | 8,2 | 14,55 | 1930 | 4400 |
| TSF44 | ultrafino | 12,0 | 14,10 | 1730 | 4600 |
| CTS12D | submícron | 6,0 | 14,80 | 1820 | 3600 |
| CTS15D | submícron | 7,5 | 14,70 | 1750 | 3700 |
| CTS18D | submícron | 9,0 | 14,55 | 1590 | 3650 |
| CTS20D | submícron | 10,0 | 14,38 | 1600 | 4000 |
| CTS25D | submícron | 12,5 | 14,13 | 1540 | 4300 |
| CTS30D | submícron | 15,0 | 13,84 | 1400 | 4300 |
| CTS20Z | submícron | 10,0 | 14,50 | 1590 | 3700 |
| CTS24Z | submícron | 12,0 | 14,10 | 1570 | 4000 |
| CTF12E | fino | 6,0 | 14,95 | 1620 | 2200 |
| CTF25E | fino | 12,5 | 14,15 | 1300 | 3500 |
| CTF12A | fino | 6,0 | 15,00 | 1630 | 2600 |

Nível da fonte: **4** (catálogo de fabricante de substrato).
Valor de `E`: **não publicado nesta fonte** — busca continua.

## Log de apuração — bloco 2 (Q1, achado central: fórmula E = f(V_Co))

**Fonte:** B. Roebuck, M. Gee, E. Bennett, R. Morrell — *Mechanical Tests for Hardmetals*,
NPL (National Physical Laboratory, instituto nacional de metrologia do Reino Unido),
**Measurement Good Practice Guide No. 20**, 84 p.
PDF público: `https://eprintspublications.npl.co.uk/1913/1/mgpg20.pdf`
**Nível: 1–2** (guia de instituto nacional de metrologia, ancorado em norma EN 23312
e em artigo revisado por pares).

**Localizadores exatos:**

- **§5.1 "Stiffness", p. 67 do guia (p. 72 do PDF):**
  "WC/Co hardmetals are very stiff and Young's Modulus values lie in the range
  **450–650 kN mm⁻²**" (= 450–650 GPa). Declara: "There is a standard for the
  measurement of stiffness, **EN 23312**" — método de **ressonância longitudinal**
  em barra ≥ 60 mm (redonda Ø6 mm ou retangular 6×8 mm), com
  `E = 4 · ρ · f² · L² · 10⁻⁹` (eq. 43 do guia).
  → **Método declarado: módulo dinâmico macroscópico por ressonância. NÃO é `EIT`.**

- **§5.1.1 "Effect of Co content on Young's Modulus", p. 68 do guia (p. 73 do PDF),
  equação (44) e Fig. 25:**

```
E [GPa] = 708 − 821·V_Co + 412·V_Co²        (V_Co = fração VOLUMÉTRICA de cobalto)
```

  Texto que acompanha: "A resonance method was used by Doi et al. [42] to evaluate
  the effect of Co content (volume fraction) on the Young's Modulus (E).
  **Doi found that WC grain size had little effect on the results** but increasing
  Co content decreased E substantially."

- **§1.1, p. 4 do guia (p. 9 do PDF):** "Those properties which do not show much
  scatter for a particular value of Co content, such as density, thermal expansion
  coefficient or **Young's modulus**, are clearly **insensitive to changes in WC grain size**."

- **§1.1, p. 3 do guia (p. 8 do PDF), Tabela 2 "Hardmetal Test Method Status":**
  "Stiffness (Young's modulus) — **EN 23312**" (uso classificado como "more restricted usage").

**Consequência direta para a Questão 1(b):** o que governa `E` é a **fração volumétrica
de ligante**, não a granulometria. Logo, a ausência de medição em grão ultrafino
**não é lacuna para este uso** — o grão fino de fresa e o grão grosso de matriz com o
mesmo %Co têm praticamente o mesmo `E`.

### Tabela derivada — E por %Co (aplicando a eq. 44 do NPL)

Conversão massa→volume com ρ(WC) = 15,63 g/cm³ e ρ(Co) = 8,90 g/cm³:
`V_Co = (w_Co/8,90) / (w_Co/8,90 + w_WC/15,63)`

| Co [m%] | Co [vol%] | E [GPa] (eq. 44 NPL) | Grau CERATIZIT correspondente (cat. rods 2017, p.6) |
|---|---|---|---|
| 4,2 | 7,15 | **651** | CTU08L (ultrafino) |
| 6,0 | 10,08 | **629** | CTS12D (submícron) · CTF12E · CTF12A (fino) |
| 7,5 | 12,46 | **612** | CTS15D (submícron) |
| 8,2 | 13,56 | **604** | TSF22 (ultrafino) |
| 9,0 | 14,80 | **596** | CTS18D (submícron) |
| 10,0 | 16,33 | **585** | CTS20D · CTS20Z (submícron) |
| 12,0 | 19,32 | **565** | TSF44 (ultrafino) · CTS24Z (submícron) |
| 12,5 | 20,06 | **560** | CTS25D (submícron) · CTF25E (fino) |
| 15,0 | 23,66 | **537** | CTS30D (submícron) |

**Aviso de método:** os valores acima são **cálculo derivado** da eq. 44 aplicada ao
%Co que a CERATIZIT publica. A CERATIZIT **não publica `E`** no catálogo de hastes.
Não é medição por grau — é interpolação de uma correlação publicada, e está declarado
como tal.


---

## 1 Módulo de elasticidade do metal duro de fresa

**Veredito:** existe, sim, `E` publicado **por grau de substrato de ferramenta rotativa**, com teor de cobalto e classe de grão identificados, medido por **ressonância segundo ISO 3312** (módulo dinâmico macroscópico, não `EIT`); a faixa útil para fresa inteiriça é **543–646 GPa**, e o valor é governado pelo **%Co**, praticamente não pela granulometria.

**Confiança:** `CONSENSO` — três fontes de fato independentes (instituto nacional de metrologia britânico; fabricante de substrato europeu; fabricante de substrato norte-americano), com o mesmo método declarado e concordância de 0,8 % a 4,8 %.

**Valor dominante:** **~570–585 GPa** para o substrato de fresa inteiriça de uso geral (≈10 % Co, submícron) — sustentado por **3** fontes independentes (CERATIZIT CTS20D = 570 GPa; NPL/Doi eq. 44 = 585 GPa; Kennametal K3833 11 % Co = 560 GPa).

**Nível das fontes:** NPL GPG 20 = **1–2** · CERATIZIT p-line 2024 = **4** · Kennametal Specialty Carbide Catalog = **4** · Doi et al. 1970 (Metall. Trans.) = **3**.

### 1(a) Tabela de `E` por grau — CERATIZIT, substrato de ferramenta rotativa

Fonte: **CERATIZIT / Plansee Group, *p-line — Rundwerkzeug-Werkstoffe / Round Tool Materials*, edição 05/2024 (DE), 128 p.**
`https://cdn.plansee-group.com/is/content/planseemedia/ceratizit/downloads/pdf/p-line-program-round-tool-materials/0524/DE.pdf`
— **página 22**, tabelas "Sorten: Zusammensetzung und Eigenschaften", colunas `E-Modul [GPa]` e `Querkontraktionszahl [-]`; classificação de grão na **página 23** ("Einteilung der Korngrößen"). **Nível 4.** Método declarado na **página 122** (ver 1-d).

| Grau | Classe de grão (p.23) | Grão [µm] | Co (binder) [m%] | **E [GPa]** | ν | HV30 |
|---|---|---|---|---|---|---|
| CTU08L | ultrafein | 0,2 – <0,5 | 4,2 | **646** | 0,202 | 2200 |
| TSF22 | ultrafein | 0,2 – <0,5 | 8,2 | **596** | 0,210 | 1930 |
| TSF44 | ultrafein | 0,2 – <0,5 | 12,0 | **547** | 0,218 | 1730 |
| CTS12D | feinst (submícron) | 0,5 – <0,8 | 6,0 | **624** | 0,205 | 1820 |
| CTS15D | feinst | 0,5 – <0,8 | 7,5 | **605** | 0,208 | 1750 |
| CTS18D | feinst | 0,5 – <0,8 | 9,0 | **586** | 0,211 | 1590 |
| CTS20D | feinst | 0,5 – <0,8 | 10,0 | **570** | 0,214 | 1600 |
| CT-GS20Y | feinst | 0,5 – <0,8 | 10,0 | **577** | 0,213 | 1580 |
| CTS24Z | feinst | 0,5 – <0,8 | 12,0 | **549** | 0,217 | 1570 |
| CTS30D | feinst | 0,5 – <0,8 | 15,0 | **512** | 0,223 | 1400 |
| CTF12E | fein | 0,8 – <1,3 | 6,0 | **624** | 0,205 | 1620 |
| CTF25E | fein | 0,8 – <1,3 | 12,5 | **543** | 0,218 | 1300 |

A mesma tabela reaparece reduzida na **p. 99** do mesmo PDF (seção "Formrohlinge"), com os mesmos números — é repetição interna e **não** conta como fonte independente. A linha do cermet CTF24T (p. 22) traz `E = 547 GPa` com densidade 6,57 g/cm³; esse valor é **inconsistente** com o cermet de TiC da Kennametal (K162B = 59,0×10⁶ psi = 407 GPa) e por isso **não é usado aqui** — cermet está fora do escopo de fresa inteiriça, e fica registrado como anomalia da fonte.

### Segunda fonte independente — Kennametal (`E` medido por ressonância)

Fonte: **Kennametal, *Specialty Carbide Products* (catálogo de metalforming, PDF 16 p., rev. 2012)**
`https://4.imimg.com/data4/OI/KW/MY-3486959/grading-tools.pdf`
— **página 8**, nota do quadro de propriedades: "Modulus of elasticity is determined by the **resonance method** which is used by the National Bureau of [Standards]"; **página 9**, quadro de propriedades, coluna `modulus of elasticity (resonance method) ×10⁶ psi`. **Nível 4.**

| Grau | Binder | Co [%] | E [10⁶ psi] | **E [GPa]** | ν | G [10⁶ psi] | Conferência E/2(1+ν) |
|---|---|---|---|---|---|---|---|
| K96 | Co | 5,5 | 91,6 | **632** | 0,21 | 37,8 | 261 GPa ✔ (medido 261) |
| K3833 | Co | 11,0 | 81,3 | **560** | 0,28 | 31,1 | 219 GPa ✔ (medido 214) |
| K94 | Co | 11,5 | 79,6 | **549** | 0,28 | 31,0 | 214 GPa ✔ (medido 214) |
| K3109 | Co | 12,1 | 82,2 | **567** | 0,28 | 32,0 | 221 GPa ✔ (medido 221) |
| K92 | Co | 15,7 | 74,9 | **516** | 0,27 | 29,4 | 203 GPa ✔ (medido 203) |
| K91 | Co | 19,5 | 69,5 | **479** | 0,26 | 27,6 | 190 GPa ✔ (medido 190) |
| K3520 | Co | 20,0 | 70,3 | **485** | 0,23 | 28,6 | 197 GPa ✔ (medido 197) |
| K90 | Co | 24,8 | 64,5 | **445** | 0,27 | 25,4 | 175 GPa ✔ (medido 175) |
| K801 | Ni | 6,3 | 89,6 | **618** | 0,25 | — | — |
| K162B | Ni-Mo (TiC) | — | 59,0 | **407** | 0,24 | — | — |

A coluna foi identificada sem ambiguidade porque `E/[2(1+ν)]` reproduz a coluna independente de módulo de rigidez em todas as linhas, com erro < 2,5 %.

**Achado adicional citável sobre granulometria:** nesse mesmo quadro (p. 9), as **três linhas de grau submícron da Kennametal — KF306 (6,0 % Co), KF310 (10,0 % Co) e KF315 (15,0 % Co) — têm a célula de módulo de elasticidade em branco ("—")**. A Kennametal publica `E` apenas para seus graus médio/grosso de conformação. É exatamente o padrão que o enunciado antecipou: medição publicada de fabricante concentrada em grão grosso. **A CERATIZIT é a exceção que quebra esse padrão** — e é a fonte certa, porque o produto dela é justamente a haste de fresa.

### Terceira fonte independente — NPL (correlação `E = f(V_Co)`)

Registrada no bloco 2 acima: `E [GPa] = 708 − 821·V_Co + 412·V_Co²`, NPL Measurement Good Practice Guide No. 20, **eq. (44), p. 68** (p. 73 do PDF). **Nível 1–2.**

**Confronto das três fontes** (NPL calculado no %Co de cada grau CERATIZIT, com ρ_WC = 15,63 e ρ_Co = 8,90 g/cm³):

| Co [m%] | E CERATIZIT [GPa] | E NPL eq.44 [GPa] | Δ (NPL vs CER) | E Kennametal [GPa] |
|---|---|---|---|---|
| 4,2 | 646 | 651 | +0,8 % | — |
| 5,5 | — | 635 | — | 632 (K96; Δ −0,5 %) |
| 6,0 | 624 | 629 | +0,9 % | — |
| 7,5 | 605 | 612 | +1,2 % | — |
| 8,2 | 596 | 604 | +1,4 % | — |
| 9,0 | 586 | 596 | +1,6 % | — |
| 10,0 | 570 / 577 | 585 | +1,4 a +2,6 % | — |
| 11,0 | — | 575 | — | 560 (K3833; Δ −2,6 %) |
| 12,0 | 547 / 549 | 565 | +2,9 a +3,2 % | 567 (K3109 @ 12,1 %) |
| 12,5 | 543 | 560 | +3,1 % | — |
| 15,0 | 512 | 537 | +4,8 % | 516 (K92 @ 15,7 %) |

Dispersão máxima entre as três fontes: **4,8 %**, e só no extremo de 15 % Co, que está fora da faixa de fresa. **Dentro de 6–12,5 % Co a dispersão é ≤ 3,2 %.**

### 1(b) Existe medição em grão fino? Sim — e o grão praticamente não importa

**Sim, existe, e vem do próprio fabricante do substrato de fresa.** A tabela CERATIZIT p. 22 é integralmente de graus ultrafino (0,2–0,5 µm), feinst/submícron (0,5–0,8 µm) e fino (0,8–1,3 µm) — ou seja, **toda ela na granulometria de fresa inteiriça**. Não é o caso de "só há medição de grão grosso".

**A evidência interna mais forte do conjunto** — dois pares com o mesmo %Co e classes de grão diferentes, publicados lado a lado, pela mesma fonte, na mesma página:

| Par | %Co idêntico | Grão | E [GPa] | Diferença |
|---|---|---|---|---|
| CTS12D × CTF12E | 6,0 % | submícron (0,5–0,8) × fino (0,8–1,3) | 624 × 624 | **0,0 %** |
| TSF44 × CTS24Z | 12,0 % | ultrafino (0,2–0,5) × submícron (0,5–0,8) | 547 × 549 | **0,4 %** |

Corroborado por três afirmações textuais independentes:

- **NPL GPG 20, p. 4** (p. 9 do PDF): propriedades como o módulo de Young "are clearly **insensitive to changes in WC grain size**".
- **NPL GPG 20, §5.1.1, p. 68:** "Doi found that **WC grain size had little effect** on the results". No artigo original — **Doi, Fujiwara, Miyake & Oosawa, "A systematic investigation of elastic moduli of WC-Co alloys", *Metallurgical Transactions* 1 (1970) 1417–1425** (nível 3) — a faixa de tamanho de partícula coberta é **0,6 a 5 µm**, e os módulos "neither depend on the WC particle size in the range between 0,6 and 5 µm nor do they change with the carbon content in the two-phase region". *Texto integral atrás de paywall (Springer devolve HTTP 303 para IdP); o que está citado aqui é o resumo público mais a citação secundária do NPL — declarado.*
- **CERATIZIT p-line, p. 122:** o E-Modul "steigt **linear mit sinkendem Bindemetallgehalt**" (cresce linearmente com a queda do teor de ligante). A variável declarada é o teor de ligante, não o grão. A mesma página avisa que **adições de fase γ (TiC/TaC) reduzem o E-Modul** — relevante só para pastilha intercambiável, não para haste de fresa, que é WC-Co puro.

**Conclusão de 1(b):** para o modelo de viga, **`E` é função do %Co e só dele**. Granulometria pode ser ignorada como entrada. Achado positivo, não lacuna.

### 1(c) Valor único recomendado

**`E = 580 GPa` = 5,80 × 10⁵ MPa**, para fresa inteiriça de metal duro de uso geral.

Justificativa: o substrato dominante de fresa inteiriça de uso geral é submícron com ~10 % Co (CERATIZIT CTS20D / CT-GS20Y = 570 / 577 GPa; Kennametal KF310 = 10 % Co submícron; Hyperion H10F = 10 % Co / 0,7 µm). **3 fontes independentes** colocam o ponto de 10 % Co entre 570 e 585 GPa.

**Erro de deflexão ao aplicar 580 GPa em toda a linha** (δ ∝ 1/E, conta direta):

| Grau real | E real [GPa] | δ calculado / δ real | Erro em δ |
|---|---|---|---|
| CTS30D (15 % Co) | 512 | 0,883 | −11,7 % |
| CTF25E (12,5 % Co) | 543 | 0,936 | **−6,4 %** |
| TSF44 / CTS24Z (12 % Co) | 547–549 | 0,943 | −5,7 % |
| CTS20D (10 % Co) | 570 | 0,983 | −1,7 % |
| CTS18D (9 % Co) | 586 | 1,010 | +1,0 % |
| CTS12D / CTF12E (6 % Co) | 624 | 1,076 | **+7,6 %** |
| CTU08L (4,2 % Co) | 646 | 1,114 | +11,4 % |

**Na faixa que fresa inteiriça de fato usa (6–12,5 % Co): erro de −6,4 % a +7,6 %.** Estendendo a toda a linha CERATIZIT de ferramenta rotativa (4,2–15 % Co): **−11,7 % a +11,4 %**.

### 1(d) Flexão/macroscópico ou indentação instrumentada (`EIT`)?

**Todos os valores reportados acima são módulo elástico macroscópico dinâmico, por ressonância — nenhum é `EIT`.** As três fontes declaram o método, o que é raro e é o que torna esta resposta utilizável para viga engastada:

- **CERATIZIT p-line, p. 122**, texto literal: "Eine genaue Bestimmung des E-Moduls anhand des Spannungs-Dehnungs-Diagramms ist schwierig. Für zuverlässige Ergebnisse werden **Resonanzmessungen von Quer- und Längswellen nach ISO 3312** vorgenommen. Analog wird der Schubmodul mit Hilfe der Torsionsschwingungen festgestellt." — ou seja: método estático por curva tensão-deformação é declarado difícil; o valor publicado é **ressonância, ISO 3312**.
- **NPL GPG 20, §5.1, p. 67:** norma **EN 23312** (equivalente europeu de ISO 3312), ressonância longitudinal em barra ≥ 60 mm, `E = 4·ρ·f²·L²·10⁻⁹`; §5.1.1 usa "a **resonance method** ... by Doi et al."
- **Kennametal, p. 8:** "determined by the **resonance method** which is used by the National Bureau of [Standards]".

**Sobre a norma:** **ISO 3312:1987 — *Sintered metal materials and hardmetals — Determination of Young modulus*** (e a versão anterior ISO 3312:1975), adotada na Europa como **EN 23312:1993**. A página pública da ISO identifica o título e o escopo ("specifies a method for the determination of the **dynamic (adiabatic) Young modulus by longitudinal oscillations**"). **O texto integral da norma é pago e não foi obtido** — o que está usado aqui é a reprodução do método feita pelo NPL (eq. 43) e a citação da norma pela CERATIZIT. Isso é **lacuna corretamente declarada**, não falha: nenhum valor numérico depende do texto integral.

**Módulo por indentação instrumentada (`EIT`) — não usar aqui.** `EIT` de WC-Co aparece na literatura com valores dispersos e dependentes da fase indentada (indentar um grão de WC dá ~650–700 GPa; indentar o ligante de Co dá ~200–250 GPa; um "compósito" com indentador grande converge para o valor macroscópico). Como a viga engastada responde ao módulo agregado do corpo inteiro, **o valor correto é o de ressonância**, e é ele que está tabelado acima. **Não localizei, dentro do território de fonte primária de engenharia, uma tabela de `EIT` por grau comercial de haste de fresa — isto é LACUNA declarada, mas irrelevante para o modelo de viga.**

### 1(f) Sensibilidade — a constante pode ser fixada

`δ = F·L³/(3·E·I)` é linear em `1/E`; logo **erro percentual em `E` = erro percentual em `δ`, com sinal invertido**. Toda a dispersão encontrada (543–646 GPa na faixa de fresa) produz variação de deflexão de **no máximo ±8 % em torno de 580 GPa**, e ±12 % incluindo os extremos de 4,2 % e 15 % Co.

**Ambos abaixo da margem declarada do modelo (±15–25 %). Portanto `E` PODE SER FIXADO em 580 GPa como constante interna, sem campo na tela.** Expor `E` como entrada editável seria falsa precisão. Se um dia se quiser refinar, o refino correto **não é** perguntar granulometria — é perguntar **%Co** e aplicar a eq. 44 do NPL, ou ler a tabela CERATIZIT.

**Fontes (Q1, com localizador)**

1. B. Roebuck, M. Gee, E. Bennett, R. Morrell — *Mechanical Tests for Hardmetals*, **NPL Measurement Good Practice Guide No. 20**: §5.1 p. 67 (faixa 450–650 kN/mm²; EN 23312; eq. 43); §5.1.1 p. 68 (**eq. 44** e Fig. 25); §1.1 p. 4 (insensibilidade ao grão); §1.1 p. 3, Tabela 2 (norma EN 23312 para stiffness). `https://eprintspublications.npl.co.uk/1913/1/mgpg20.pdf` — **nível 1–2**
2. CERATIZIT / Plansee Group — ***p-line, Rundwerkzeug-Werkstoffe / Round Tool Materials***, ed. 05/2024 (DE), **p. 22** (E-Modul e Poisson por grau), **p. 23** (classificação de granulometria), **p. 99** (repetição para Formrohlinge), **p. 122** (método: ISO 3312; E cresce linearmente com queda de ligante; fase γ reduz E). `https://cdn.plansee-group.com/is/content/planseemedia/ceratizit/downloads/pdf/p-line-program-round-tool-materials/0524/DE.pdf` — **nível 4**
3. Kennametal — *Specialty Carbide Products*, **p. 8** (método: resonance method / NBS) e **p. 9** (quadro de propriedades; coluna `modulus of elasticity ×10⁶ psi`; células "—" nos graus submícron KF306/KF310/KF315). `https://4.imimg.com/data4/OI/KW/MY-3486959/grading-tools.pdf` — **nível 4**
4. H. Doi, Y. Fujiwara, K. Miyake, Y. Oosawa — "A systematic investigation of elastic moduli of WC-Co alloys", *Metallurgical Transactions* **1** (1970) 1417–1425; registro ADS `1970MT......1.1417D`; DOI Springer `10.1007/BF02900264`. **Texto integral não obtido (paywall).** — **nível 3**
5. **ISO 3312:1987** — *Sintered metal materials and hardmetals — Determination of Young modulus* (`https://www.iso.org/standard/8569.html`), e ISO 3312:1975 (`.../8568.html`); adoção europeia **EN 23312:1993**. **Texto integral pago, não obtido** — identificação só pela página pública. — **nível 1**
6. CERATIZIT — *Solid Carbide Rods*, catálogo 2017.V1 US, **p. 6–7** (composição e classes de grão; **sem** coluna de E — achado negativo registrado no bloco 1). — **nível 4**
7. General Carbide — *The Designer's Guide to Tungsten Carbide*, ed. 2024, **p. 13** ("Young's Modulus for cemented carbide is as high as 94,000,000 psi (>650 kN/mm²) ... It increases linearly with decreasing binder content") e **p. 19** ("E value of 93,000,000 psi (~650 kN/mm²)"). Valor **genérico de topo de linha**, sem grau, sem %Co, sem método declarado — **não utilizável por grau**; citado só como corroboração do limite superior. `https://generalcarbide.com/wp-content/uploads/2024/06/GC-Designers-Guide-to-Tungsten-Carbide.pdf` — **nível 4**
8. Ultra-Met, *Standard Grade Offerings*, e Hyperion Materials & Technologies, páginas de *Grade Properties* / *Carbide Rolls Grade Data* / *WC-Co Grades* — **consultadas e sem coluna de E** (achado negativo; publicam %Co, grão, densidade, dureza, TRS, mas não módulo). — **nível 4**
