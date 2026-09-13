# RESPOSTA R2 — B (território: fabricante de ferramenta)

Nota de pesquisa incremental. Território de fonte: guias técnicos, catálogos e páginas de
conhecimento de fabricantes de ferramenta de corte. Sem normas, sem handbooks, sem academia,
sem blog/distribuidor.

Status: CONCLUÍDO — 3 questões + 16 subitens respondidos · 7 lacunas declaradas

---

## BLOCO 1 — Q1: afinamento de cavaco (chip thinning)

### 1.a — O que os fabricantes publicam

**ACHADO DECISIVO — Sandvik Coromant publica a tabela numérica, e ela é a fórmula exata.**

Sandvik Coromant, página de conhecimento *"Entering angle and chip thickness in milling"* (Metalcutting Knowledge / Milling).
URL: https://www.sandvik.coromant.com/en-us/knowledge/milling/entering-angle-and-chip-thickness

Sandvik NÃO publica a equação fechada — publica um **fator de modificação** tabelado, com a relação
`fz = fator de modificação × hex` (fz = avanço por dente a programar; hex = espessura máxima de cavaco desejada).

Tabela publicada — fresamento periférico, em função de `ae/DC`:

| ae/DC | Fator Sandvik (publicado) | `1/√[1−(1−2·ae/D)²]` (fórmula exata) | Bate? |
|---|---|---|---|
| 50–100% | 1,0 | 1,000 | sim |
| 25% | 1,16 | 1,1547 | sim (arred.) |
| 20% | 1,25 | 1,2500 | **exato** |
| 15% | 1,4 | 1,4003 | **exato** |
| 10% | 1,66 | 1,6667 | **exato** |
| 5% | 2,3 | 2,2942 | sim (arred.) |

Conclusão numérica: **a tabela de Sandvik é, dígito a dígito, a fórmula exata `CTF = 1/√[1−(1−2·ae/D)²]`.**
Não é aproximação, não é tabela empírica: é a mesma função. Isso é verificação por reconstrução — o fator
foi recalculado ponto a ponto e reproduz a publicação.

A mesma página publica também o fator por **ângulo de posição KAPR** (efeito separado, multiplicativo):

| KAPR | Fator |
|---|---|
| 90° | 1,0 |
| 75° | 1,0 |
| 65° | 1,1 |
| 45° | 1,4 |
| 10° | 5,8 |

(Confere com `1/sin κ`: 1/sin45°=1,414 → 1,4 ✓ ; 1/sin65°=1,103 → 1,1 ✓ ; 1/sin10°=5,759 → 5,8 ✓ ;
1/sin75°=1,035 → arredondado para 1,0.) Ou seja: **o fator de κ é `1/sin κ`**, e o de `ae/D` é o CTF exato.

Exemplo publicado por Sandvik na mesma página: "If maximum hex = 0.1 mm and KAPR = 45°, recommended feed
fz = 1.4 × 0.1 = 0.14 mm/tooth".

**Confiança 1.a (parcial): REFERÊNCIA ÚNICA até aqui** — 1 fabricante confirmado (Sandvik).
Iscar publica um *Radial Chip Thinning Calculator* com guia de usuário próprio
(https://www.iscar.com/ITC/UserGuide/ITA_USER_GUIDE_RadialChipThinningCalculator_EN.pdf) — PDF é imagem,
texto não extraível por fetch; registro a EXISTÊNCIA do calculador Iscar, não a fórmula dele.
Segue apuração para elevar a CONSENSO.

---

## BLOCO 2 — Q3: tabela `kc1.1` e `mc` publicada por WALTER (fonte primária, extraída do PDF)

**Fonte:** Walter AG — *Technical Compendium — General*, edição **2025 (EN)**, seção "F General information",
página **F 9**, tabela **"Cutting forces of Walter machining groups"**.
URL (PDF oficial Walter CDN):
https://cdn2.walter-tools.com/files/a5ea48ae-5fa6-0161-3cb3-0ac22248a0fb/3ee25a79-8681-4b3e-bf39-9e7f3ca0d193/technical-compendium-general-2025-en.pdf

Extração feita localmente com `pdfplumber` alinhando por coordenada Y (o `pdftotext -layout` embaralha
as colunas desta tabela — quem ler por texto corrido tira número trocado de linha; registro isso porque
é fonte provável de erro de transcrição em qualquer outra apuração).

Cabeçalho publicado: `Rm [N/mm²] min | max` · `Spec. cutting force kc1.1 [N/mm²]` · `Increase value mc` · `Walter machining group`

| # | Descrição (verbatim Walter) | Rm min | Rm max | **kc1.1** | **mc** | Grupo |
|---|---|---|---|---|---|---|
| 1 | Non-alloyed and low-alloy steels, C > 0.25%, low and medium tensile strength | 350 | 750 | **1500** | **0,21** | P1, P6 |
| 2 | Non-alloyed and low-alloy steels, C > 0.55%, not heat-treated | 400 | 900 | **1700** | **0,25** | P2,P3,P4,P7,P14 |
| 3 | Low and high-alloy steels, low heat treatment level | 750 | 1100 | **2000** | **0,25** | P5,P8,P11,P12 |
| 4 | Stainless ferritic/martensitic steels, heat-treated | 800 | 1400 | **2200** | **0,25** | P15 |
| 5 | Low and high-alloy steels, medium heat treatment level | 1100 | 1400 | **2500** | **0,25** | P9 |
| 6 | Low and high-alloy steels, high heat treatment level | 1200 | 1600 | **3000** | **0,25** | P10, P13 |
| 7 | Stainless, austenitic steels | 400 | 900 | **1800** | **0,21** | M1 |
| 8 | Stainless, austenitic/ferritic steels + duplex | 600 | 1000 | **2000** | **0,21** | M3 |
| 9 | Stainless, austenitic steels, precipitation hardened (PH) | 700 | 1500 | **2400** | **0,21** | M2 |
| 10 | Grey cast iron + CGI + malleable cast iron with low tensile strength | 200 | 400 | **800** | **0,28** | K1,K3,K7 |
| 11 | Ductile cast iron low tensile + malleable cast iron higher tensile | 400 | 600 | **950** | **0,28** | K2,K5 |
| 12 | Grey cast iron with higher tensile strength | 300 | 400 | **1200** | **0,28** | K4 |
| 13 | Ductile cast iron with high tensile strength + ADI | 600 | 800 | **1400** | **0,28** | K6 |
| 14 | Wrought aluminium alloy, not hardened | – | – | **350** | **0,25** | N1 |
| 15 | Wrought aluminium alloy, hardened | – | – | **600** | **0,25** | N2 |
| 16 | Cast aluminium alloy < 12% Si, not hardened | – | – | **600** | **0,25** | N3 |
| 17 | Cast aluminium alloy < 12% Si hardened; cast Al ≥ 12% Si | – | – | **700** | **0,25** | N4, N5 |
| 18 | Pure copper, copper alloy (brass, bronze) low tensile strength | – | – | **550** | **0,25** | N7,N8,N9 |
| 19 | High tensile copper alloys, bronze high tensile strength | – | – | **1000** | **0,25** | N10 |
| 20 | Heat-resistant alloys, iron-based, annealed | – | – | **2400** | **0,25** | S1 |
| 21 | Heat-resistant alloys, iron-based, hardened | – | – | **2500** | **0,25** | S2 |
| 22 | Pure titanium | – | – | **1300** | **0,25** | S6 |
| 23 | Titanium alloys — alpha, alpha/beta and beta | – | – | **1500** | **0,25** | S7,S8 |
| 24 | Heat-resistant alloys, Ni-Co-based, annealed | – | – | **2800** | **0,25** | S3 |
| 25 | Heat-resistant alloys, Ni-Co-based, hardened | – | – | **2900** | **0,25** | S4 |
| 26 | Heat-resistant alloys, Ni-Co-based, cast | – | – | **3000** | **0,25** | S5 |
| 27 | Hardened steels 46–52 HRC | – | – | **3000** | **0,25** | H1 |
| 28 | Hardened steels 52–58 HRC | – | – | **3700** | **0,25** | H2 |
| 29 | Hardened steels 58–62 HRC | – | – | **4300** | **0,25** | H3 |
| 30 | Hardened cast iron 50–60 HRC | – | – | **3500** | **0,25** | H4 |
| 31 | Thermoplasts / thermosets sem carga abrasiva | – | – | **150** | **0,2** | O1,O2 |
| 32 | Fibre-reinforced plastics | – | – | **300** | **0,3** | O3,O4,O5 |
| 33 | Graphite | – | – | **400** | **0,25** | O6 |

Ressalva publicada por Walter, verbatim, embaixo da tabela:
> "The information consists of standard values and refers to a neutral cutting edge geometry.
> The condition of the material and the cutting edge geometry considerably influences the cutting forces."

### ⚠ Observação obrigatória sobre repetição de valor redondo

**26 das 33 linhas de Walter têm `mc = 0,25` exato.** Isso é exatamente o padrão que o enunciado marca como
"assinatura de preenchimento por default" — e aqui **a repetição vem da fonte, não do pesquisador**.
Walter usa apenas 5 valores distintos de `mc` no compêndio inteiro: 0,20 · 0,21 · 0,25 · 0,28 · 0,30, e
`mc` é atribuído **por família ISO**, não por liga:
- 0,21 → aços de baixa resistência (P1/P6) e todos os inox (M1, M2, M3)
- 0,25 → todo o resto dos aços, todo N, todo S, todo H
- 0,28 → todos os ferros fundidos (K)

**Consequência para o Fenix:** ter `mc` repetido na tabela **não é, por si, prova de invenção**. Um fabricante
de primeira linha publica assim. O que precisa de fonte por linha é o `kc1.1`; o `mc` é legitimamente
grosseiro. Isso muda o veredito sobre os "seis estimados" da Questão 3.b — ver bloco de Q3 mais adiante.

**Confiança do bloco: REFERÊNCIA ÚNICA (Walter).** Tabela inteira vem de uma única publicação de um único
fabricante. Não elevar a CONSENSO sem 2 outros fabricantes com valores compatíveis por linha.

---

## BLOCO 3 — POTÊNCIA: onde cada fabricante põe o `η` e como chama o resultado

**Esta é a divergência mais perigosa da rodada.** Fabricantes usam rótulos parecidos para grandezas
diferentes. Levantamento lado a lado, com a fórmula que cada um **de fato publica**:

| Fabricante | Fórmula publicada (verbatim) | `η` está | Rótulo que o fabricante dá | O resultado é potência… |
|---|---|---|---|---|
| **Mitsubishi Materials** | `Pc = (ap × ae × vf × Kc) ÷ (60 × 10⁶ × η)` | **DENOMINADOR** | "Pc (kW) **Actual Cutting Power**"; `η` = "Machine Coefficient" | **no motor** (apesar do rótulo dizer "cutting") |
| **Mitsubishi** (torneamento, mesma página) | `Pc = (ap × f × vc × Kc) ÷ (60 × 10³ × η)` | **DENOMINADOR** | "Actual Cutting Power" | no motor |
| **Sumitomo Electric Hardmetal** | `Pc = (ae × ap × vf × kc) ÷ (60 × 10⁶ × η)`  e  `Pc = (Q × kc) ÷ (60 × 10³ × η)` | **DENOMINADOR** | "Pc : **Power consumption** (kW)"; `η` = "Machine efficiency (about 0.75)" | **no motor** |
| **ISCAR** | `P = (a × b × kc × vf) ÷ (6 × 10⁷)` [kW] | **AUSENTE** | "Cutting **power consumption**" | **na aresta** |
| **Sandvik Coromant** | equação publicada só como imagem na página (não extraível) | separado | "**Net power, Pc**" e, à parte, "efficiency, **ηmt**" | **na aresta** (`Pc` é *net*; `ηmt` entra depois) |

### Leitura — 3 conclusões que o Fenix precisa gravar

1. **O núcleo numérico é idêntico nos quatro.** `ap·ae·vf·kc / (60×10⁶)` = `Q·kc/60000` com Q em cm³/min.
   Todo mundo concorda na física. A divergência é **só onde o `η` entra e como o número é chamado**.
2. **"Cutting power" NÃO significa a mesma coisa em Mitsubishi e em Iscar.** Mitsubishi chama de
   *Actual Cutting Power* um valor **já dividido por η** (portanto potência consumida da máquina);
   Iscar chama de *cutting power consumption* um valor **sem η** (potência na aresta). Quem copiar
   dois catálogos sem olhar a fórmula erra por 1/η — **+18% com η = 0,85, +33% com η = 0,75**.
3. **A cadeia do Fenix (`Pc = Q·kc/60000` depois `Pm = Pc/η`) está CERTA e é a mais defensável**:
   é a convenção Sandvik/Iscar (Pc = potência na aresta) com o η aplicado num passo separado e visível.
   `Pm = Pc/η` reproduz exatamente a fórmula de Mitsubishi e de Sumitomo. **Não mexer.**

### Armadilha de leitura registrada (Sumitomo)

Sumitomo publica, logo abaixo, `H = Pc / 0,75` com "H : Required horsepower (HP)".
**Esse 0,75 NÃO é rendimento** — é a conversão kW→HP (1 HP ≈ 0,7457 kW). Coincidir com o valor de
`η ≈ 0,75` da linha de cima é armadilha real; quem transcrever rápido aplica rendimento duas vezes.

**Confiança do bloco: CONSENSO sobre o núcleo `Q·kc/60000`** (Mitsubishi + Sumitomo + Iscar + Sandvik,
4 fabricantes independentes). **SEM CONSENSO sobre o rótulo** — os fabricantes divergem de fato.

**Fontes**
- Mitsubishi Materials, *Formulae for Cutting Power* — https://www.mitsubishicarbide.net/contents/mhg/enuk/html/product/technical_information/information/formula4.html
- Sumitomo Electric Hardmetal, *General Catalogue — Technical Guidance N*, pág. N23 "Milling Calculation Formulas" — https://www.sumitool.com/en/downloads/cutting-tools/general-catalog/assets/pdf/n2.pdf
- ISCAR, artigo técnico *Machining Calculations* (2025), eq. (6), (7), (10a) — https://www.iscar.com/en-hq/technical-articles/year-2025/machining-calculations
- Sandvik Coromant, *Milling formulas and definitions* — https://www.sandvik.coromant.com/en-us/knowledge/machining-formulas-definitions/milling-formulas-definitions

---

## BLOCO 3-bis — CORREÇÃO DO BLOCO 3 (fonte primária Sandvik obtida)

No Bloco 3 eu supus, pela página web, que o `Pc` "net power" de Sandvik fosse potência **na aresta**.
**Estava errado.** Consegui a fórmula impressa. Corrijo com a fonte:

**Sandvik Coromant — *Metalcutting Technical Guide*, seção D "Milling", página D 23**
("General milling formulas" e "Terminology and units for milling").
PDF: https://dcngli4g50fhp.cloudfront.net/userfiles/ad/sandvik/documents/sandvik_5747275_catalog.pdf
(extraído local com `pdfplumber`, alinhamento por coordenada — a página é diagramada em colunas
e qualquer leitura por texto corrido embaralha numerador com denominador)

Fórmula publicada, verbatim (reconstruída glifo a glifo da diagramação):

```
Net power           Pc =   ap × ae × vf × kc
(kW)                     ─────────────────────
                            60 × 10⁶ × η
```

Legenda publicada na mesma página:
- `Pc = Cutting power net` [kW]
- `η = Efficiency`
- `kc1 = Specific cutting force (for hex = 1 mm)` [N/mm²]
- `mc = Rise in specific cutting force (kc) as a function of chip thickness`
- `κr = Major cutting edge angle` [degrees]
- `hex = Max chip thickness` · `hm = Average chip thickness`

**O `η` de Sandvik está no DENOMINADOR, dentro do que ele chama de "net power".**
Rodapé de outra página do mesmo guia: *"Calculated with an efficiency ηmt = 0.8"*.

### Tabela de potência CORRIGIDA — 4 fabricantes

| Fabricante | Fórmula publicada | `η` | Rótulo publicado | Grandeza real |
|---|---|---|---|---|
| **Sandvik Coromant** | `Pc = ap·ae·vf·kc / (60×10⁶ × η)` | **denominador** | "**Net power**, Pc / Cutting power net" | potência **exigida da máquina** |
| **Mitsubishi Materials** | `Pc = ap·ae·vf·Kc / (60×10⁶ × η)` | **denominador** | "**Actual Cutting Power**" | potência exigida da máquina |
| **Sumitomo Electric** | `Pc = ae·ap·vf·kc / (60×10⁶ × η)` | **denominador** | "**Power consumption**" | potência exigida da máquina |
| **ISCAR** | `P = a·b·kc·vf / (6×10⁷)` | **ausente** | "cutting power consumption" | potência **na aresta** |

### ⚠ A armadilha, agora com nome

**"Net power" de Sandvik NÃO é potência líquida na aresta — já vem dividida por η.**
O termo "net" em português puxa para "líquido, sem perdas", que é o oposto do que a fórmula faz.
Três fabricantes de peso (Sandvik, Mitsubishi, Sumitomo) publicam a MESMA equação com η no
denominador e dão a ela TRÊS rótulos diferentes; um quarto (Iscar) publica a mesma equação **sem** η
e usa um rótulo parecido com o da Sumitomo.

**Consequência direta para o Fenix:** a cadeia atual faz
`Pc = Q·kc/60000` (sem η) e depois `Pm = Pc/η`. O `Pm` do Fenix é **numericamente idêntico** ao `Pc`
de Sandvik/Mitsubishi/Sumitomo. O `Pc` do Fenix é o `P` de Iscar. **A matemática está certa; o risco é
só de rótulo.** Recomendação: no painel auditável, não escrever "potência de corte" para os dois —
escrever `Pc = potência na aresta (sem rendimento)` e `Pm = potência exigida do motor (Pc/η)`, e
avisar que catálogos chamam **o segundo** de "potência de corte".

**Confiança:** núcleo `ap·ae·vf·kc/(60×10⁶)` = **CONSENSO** (4 fabricantes independentes).
Posição do `η` = **CONSENSO em 3 de 4** (Sandvik, Mitsubishi, Sumitomo no denominador).
Rótulo = **SEM CONSENSO** (4 fabricantes, 4 nomes, 2 grandezas).

---

## QUESTÃO 1 — Afinamento de cavaco: qual das duas fórmulas

**Veredito:** as duas **não são concorrentes** — miram grandezas diferentes. A "exata" mira a espessura **máxima** (`hex`); a de `√(ae/D)` mira a espessura **média** (`hm`). Como `hm ≈ hex/2`, uma dá ~2× a outra. Implementar a **exata**; a outra, como está escrita no projeto, entrega ~2× avanço demais.
**Confiança:** **CONSENSO** — Sandvik (tabela) + Iscar (fórmula trigonométrica) + reconstrução numérica que reproduz as duas.

### 1.a — O que os fabricantes publicam (fonte primária)

**ISCAR — publica a fórmula exata, em forma trigonométrica.**
*Milling Applications and Cutter Basics Guide*, pág. 41
https://www.iscar.sk/Catalogs/Publication/english_1/Milling_Applications_and_Cutter_Basics_Guide/Flipview-Milling_Applications_and_Cutter_Basics_Guide/files/basic-html/page41.html

> `hmax = fz × sin(AE)` · `fz = hmax / sin(AE)` · `AE = arccos((r − ae)/r)`

Com `r = D/2` → `(r−ae)/r = 1 − 2ae/D`, logo `AE = arccos(1 − 2ae/D)` e `sin AE = √[1 − (1 − 2ae/D)²]`.
Invertendo: **`fz = hmax / √[1 − (1 − 2ae/D)²]`** — é literalmente o CTF exato da coluna 1 do enunciado.

Iscar publica na mesma página: *"Assume that the average chip thickness (hm) is half of the maximum chip thickness (hmax)"*, e o exemplo de que o avanço programado fica **~16% acima** de hmax.

**SANDVIK COROMANT — a mesma coisa, em tabela** (detalhado no BLOCO 1): fatores 1,16 / 1,25 / 1,4 / 1,66 / 2,3 para ae/Dc = 25 / 20 / 15 / 10 / 5% reproduzem o CTF exato dígito a dígito. Os "16%" de Iscar a 25% de engajamento e o 1,16 de Sandvik a 25% são **o mesmo número**.

**Nenhuma fonte do meu território publica `fz_ef = fz/√(ae/D)` como fator de afinamento.** O que existe publicado com `√(ae/D)` é outra coisa — ver 1.b.

### 1.b — Derivação: a relação entre as duas

Não é "uma é aproximação da outra". É isto:

**Passo 1 — a exata simplifica.** Com `r = ae/D`:
```
1 − (1 − 2r)² = 1 − 1 + 4r − 4r² = 4r(1 − r)
CTF = 1/√[4r(1−r)] = 1 / (2·√[r(1−r)])
```

**Passo 2 — limite de engajamento pequeno.** Para `r ≪ 1`, `r(1−r) → r`, logo `CTF ≈ 1/(2·√r)`.

**Passo 3 — a fórmula do projeto.** `1/√r` é **exatamente 2× isso**. O fator 2 não é arredondamento: é a razão `hex/hm`.

**Passo 4 — de onde vem o `√(ae/D)`, com fonte.** Sandvik publica (Metalcutting Technical Guide, D 23):
```
Average chip thickness (mm), side and facemilling, when ae/Dc ≤ 0.1:    hm ≈ fz × √(ae/Dc)
```
Ou seja: **`√(ae/D)` converte `fz` em espessura MÉDIA**, não em máxima. Invertido (`fz = hm/√(ae/D)`) ele responde "que avanço programar para que a espessura **média** valha o alvo" — pergunta diferente da que o CTF responde ("...para que a **máxima** valha o alvo").

**Passo 5 — fecha o círculo.** Iscar: `hm ≈ hmax/2`. Mirar hm com um valor de catálogo (que é alvo de hex) dobra o avanço. **A razão 2 entre as duas fórmulas é a razão hex/hm publicada pelo próprio fabricante.** Confirmação numérica em ae/D = 0,05: exata → 2,294 ; `1/√r` → 4,472 ; razão 1,95 ≈ 2. ✔

### 1.c — Tabela comparativa e erro relativo

`CTF_exato = 1/(2√[r(1−r)])` · `Woxén_como_está_no_projeto = 1/√r` · `Limite correto = 1/(2√r)`

| `ae/D` | CTF exato | `1/√r` (projeto) | **Erro do projeto** | `1/(2√r)` | Erro do limite |
|---|---|---|---|---|---|
| 0,50 | 1,0000 | 1,4142 | **+41,4%** | 0,7071 | −29,3% |
| 0,40 | 1,0206 | 1,5811 | **+54,9%** | 0,7906 | −22,5% |
| 0,30 | 1,0911 | 1,8257 | **+67,3%** | 0,9129 | −16,3% |
| 0,25 | 1,1547 | 2,0000 | **+73,2%** | 1,0000 | −13,4% |
| 0,20 | 1,2500 | 2,2361 | **+78,9%** | 1,1180 | −10,6% |
| 0,10 | 1,6667 | 3,1623 | **+89,7%** | 1,5811 | −5,1% |
| 0,05 | 2,2942 | 4,4721 | **+94,9%** | 2,2361 | −2,5% |
| 0,02 | 3,5714 | 7,0711 | **+98,0%** | 3,5355 | −1,0% |

**A partir de que `ae/D` diverge o bastante?** Resposta honesta: **em nenhum ponto ela converge.** O erro é ≥ 41% já em ae/D = 0,50 e só piora. Não é "aproximação com faixa de validade" — é grandeza trocada. Não existe faixa em que `1/√(ae/D)` seja um fator de afinamento aceitável.
(O limite `1/(2√r)` esse sim é aproximação legítima: erro < 5% para ae/D ≤ 0,10. Mas não compensa — a exata é uma raiz quadrada, custo zero.)

### 1.d — O erro vai para o lado perigoso

**PERIGOSO, e é o pior dos dois lados.** `1/√r` **superestima** o avanço a programar. Em ae/D = 0,20 o sistema programa **79% mais avanço** do que a tabela de Sandvik manda.
Consequência física: espessura de cavaco real ~1,8× acima do alvo → força por dente ~1,8× (a força cresce com `h^(1−mc)`, quase linear) → lascamento da aresta, quebra de fresa inteiriça de metal duro e, em fresa longa, deflexão e vibração.

O lado oposto (subestimar o avanço) dá **ferramenta esfregando**: h abaixo da espessura mínima de cavaco, o gume amassa em vez de cortar, gera calor e encrua a superfície — encurta vida, mas **não quebra ferramenta nem sucateia peça de imediato**. Entre errar para cima e para baixo, o erro atual está na direção que quebra.

### 1.e — Formulação mais correta: κ e diâmetro efetivo — SIM, e vale a pena

Sandvik publica as duas correções adicionais, **multiplicativas** com a radial (*Metalcutting Technical Guide*, D 23–D 24, "Formulas for specific milling cutters"):

**Ângulo de posição κr** (aresta reta, fresa centrada): `fz = hex / sin κr`
A tabela da página de conhecimento confere: κ=45° → 1,4 (=1/sin45°=1,414); κ=65° → 1,1 (1,103); κ=10° → 5,8 (5,759).
**→ fator = `1/sin κr`.**

**Diâmetro efetivo — fresa esférica** (`D3` = diâmetro nominal, `De` = diâmetro efetivo em `ap`):
```
De = √[D3² − (D3 − 2·ap)²]        (equivale a  De = 2·√[ap·(D3 − ap)])
fz = D3 × hex / De                 (fresa centrada)
```
**Fresa toroidal / inserto redondo:** `De = Dc + √[iC² − (iC − 2·ap)²]`, com fórmula de `fz` análoga.
*Ressalva de extração:* radicais e expoentes desta página se perderam parcialmente na conversão do PDF. As duas de esférica acima estão legíveis e fecham por álgebra; as de inserto redondo registro com **menor certeza de transcrição**.

**Vale a complexidade?** Sim, e nem perto de marginal:
- κ = 45°: **+41%** no avanço — fora da margem de ±15–25%.
- Esférica D=10 mm com ap = 0,5 mm: `De = 2√(0,5×9,5) = 4,36 mm` → fator `D3/De = 2,29` = **+129%**.
Ignorar isso numa esférica de acabamento erra o avanço por mais de 2×. É uma raiz quadrada a mais no código. **Implementar.**

Atenção: o `ae/D` do CTF radial deve usar o **De**, não o `D` nominal, em esférica e toroidal — senão a correção radial também sai errada.

### 1.f — O limiar de 50% está correto

**Sim, `ae < 50%·D` é o gatilho matematicamente correto e não precisa mudar.** Em `ae/D = 0,5` a fórmula exata dá exatamente **1,000** — a função é contínua e cola em 1,0 na fronteira, sem degrau. Sandvik confirma: faixa "50–100%" com fator 1,0, e a página afirma que abaixo de 50% de imersão radial a espessura máxima é reduzida em relação a fz.

O "25%" que aparece em alguns fabricantes **não é outro limiar** — é onde a correção passa a valer a pena na prática: em ae/D = 0,25 o fator já é 1,155 (**+15,5%**, primeira linha da tabela Sandvik e o "~16%" de Iscar), ou seja, sai da margem de ruído do modelo.

**Recomendação de produto (dois gatilhos, não um):**
- `ae/D < 0,50` → **aplicar** a correção (contínua, sem degrau)
- `ae/D < 0,25` → **avisar**: "avanço corrigido em +X% por afinamento de cavaco"
- `ae/D < 0,02` → **travar ou alerta vermelho**: fator > 3,5×, e o modelo 2D sem raio de gume perde sentido

### Entrega da Questão 1

**Implementar:** `CTF = 1 / √[1 − (1 − 2·ae/De)²]` (= `1/(2·√[r(1−r)])`) para `ae/De < 0,5`; senão `CTF = 1`. Multiplicar por `1/sin κr`. Usar `De` (efetivo) em esférica/toroidal.
**Faixa de validade declarada:** 0,02 ≤ ae/De < 0,50.
**Remover** `fz/√(ae/D)` da documentação: não é fórmula alternativa, é a conversão para espessura **média** usada como se fosse para máxima.

**Fontes desta questão**
- ISCAR, *Milling Applications and Cutter Basics Guide*, p. 41 — URL acima
- Sandvik Coromant, *Entering angle and chip thickness in milling* — https://www.sandvik.coromant.com/en-us/knowledge/milling/entering-angle-and-chip-thickness
- Sandvik Coromant, *Metalcutting Technical Guide*, seção D Milling, p. D 23–D 24 — https://dcngli4g50fhp.cloudfront.net/userfiles/ad/sandvik/documents/sandvik_5747275_catalog.pdf
---

## QUESTÃO 2 — Qual `h` entra na equação de Kienzle

**Veredito:** entra a espessura **MÉDIA (`hm`)**. Os dois fabricantes que publicam a equação explicitamente escrevem `hm`, não `hex`. E não há contagem dupla com o CTF — desde que o CTF gere o `fz` programado e o `hm` seja calculado **a partir desse mesmo `fz`**.
**Confiança:** **REFERÊNCIA ÚNICA elevada** — 2 fabricantes independentes (Sandvik + Iscar) escrevendo `hm`, nenhum divergente. Falta 1 fabricante para virar CONSENSO formal.

### 2.a — `hm` ou `hex`?

| Fabricante | Equação publicada (verbatim) | Usa |
|---|---|---|
| **Sandvik Coromant** | `kc = kc1 × hm^(−mc)` (Metalcutting Technical Guide, D 23, "Specific cutting force N/mm²") | **hm** |
| **Sandvik Coromant** (web) | "kc = kc1 / hm^mc", hm = actual chip thickness (página *Specific cutting force*) | **hm** |
| **ISCAR** | `Kc = Kc1 × hm^(−mc)` — eq. (6) do artigo *Machining Calculations* (2025) | **hm** |
| **Walter** | publica a tabela `kc1.1`/`mc` mas **não** a equação no compêndio *General* | — |
| **Mitsubishi / Sumitomo** | usam `kc` tabelado/graficado em função do avanço `f`, não a forma potência | — |

**Divergência encontrada — e é dentro da própria Sandvik:** a legenda da página D 23 define
`kc1 = Specific cutting force (for **hex** = 1 mm)` enquanto a fórmula, três linhas abaixo, usa `hm`.
É inconsistência de nomenclatura na fonte, não duas escolas. **A fórmula manda; a legenda é descuido.**
Registro porque quem só ler a legenda implementa `hex` e erra por ~2× no `h`
(≈ **−11% em kc** com mc = 0,155; ≈ **−16%** com mc = 0,25).

**Ninguém no meu território publica `kc = kc1.1 × hex^(−mc)`.** → usar `hm`.

### 2.b — Fórmula de `hm`

Sandvik publica **duas**, e elas **não são a mesma curva** (ver a armadilha abaixo):

```
(i)  ae/Dc ≤ 0,1  (side and facemilling):     hm ≈ fz × √(ae/Dc)

(ii) ae/Dc ≥ 0,1:    hm = ( sin κr × 180 × ae × fz ) / ( π × Dc × arcsin(ae/Dc) )
                          [arcsin em GRAUS]
```
Fonte: Sandvik Coromant, *Metalcutting Technical Guide*, D 23.

**⚠ ARMADILHA GRAVE — as duas não colam no ponto de troca.**
Em `ae/Dc = 0,1`, com κr = 90°:
- (i) → `hm = fz·√0,1 = 0,316·fz`
- (ii) → `hm = (180 × 0,1·Dc × fz)/(π × Dc × 5,739°) = 18/18,03 · fz = 0,998·fz`

**Fator 3,16 de degrau no ponto de fronteira.** Quem implementar um `if (ae/Dc <= 0.1)` entre as duas
produz um salto de 3× em `kc` ao mexer 0,001 no `ae`. A explicação: **elas descrevem geometrias
diferentes.** A (ii), com arco de engajamento `2·arcsin(ae/Dc)`, é **fresamento de topo/faceamento
com a fresa CENTRADA sobre uma faixa de largura `ae`** (por isso `hm → fz` quando `ae` é estreito:
no centro, o dente corta com espessura ≈ fz o tempo todo). A (i) é **fresamento periférico**, onde o
dente entra tangencialmente.

**Para o Fenix — fresa inteiriça em fresamento periférico — a forma correta é a periférica.**
Derivo a exata (aritmética minha, não publicação), ancorada em (i) como verificação de limite:
```
φs = arccos(1 − 2·ae/D)                      [ângulo de engajamento, rad]
hm = fz · sin κr · (2·ae/D) / φs
```
Verificações:
- limite `ae/D → 0`: `φs ≈ 2√(ae/D)` ⇒ `hm → fz·√(ae/D)` = **exatamente a (i) de Sandvik** ✔
- `ae/D = 0,5`: `hm = fz/(π/2) = 0,637·fz`; a aproximação (i) daria 0,707·fz (**+11%**)
- `ae/D = 0,1`: exata `0,2/0,6435 = 0,311·fz` vs (i) `0,316·fz` (**+1,7%**)

**Recomendação:** usar a forma exata periférica acima em toda a faixa — sem `if`, sem degrau, erro zero
contra a aproximação publicada de Sandvik no domínio onde ela vale. Guardar a (ii) só se um dia o
produto cobrir faceamento centrado.

### 2.c — Contagem dupla: NÃO existe, se a ordem for esta

O medo é legítimo mas a resposta é não — **desde que o CTF e o `hm` operem em direções opostas sobre
o MESMO `fz`**:

- O **CTF sobe** o avanço: `fz_prog = h_alvo × CTF`. Ele existe para que a espessura **máxima** real bata no alvo.
- O **`hm` desce** de volta: `hm = fz_prog × 2r/φs`. Ele traduz o avanço programado na espessura **média** real.

As duas usam `ae/D`, mas uma multiplica e a outra divide pelo mesmo efeito geométrico. Prova em 1 linha:
`hex = fz_prog × sin φs_max = (h_alvo × CTF) × (1/CTF) = h_alvo` ✔ — o alvo é respeitado, e `hm ≈ hex/2`
sai naturalmente. **Não há inflação.**

**A contagem dupla acontece de outro jeito, e é ESSE o erro a evitar:**
usar `h = fz_prog` (o avanço já corrigido) direto como espessura no Kienzle. Aí o `h` fica ~2–7× acima
do real, `kc` despenca e a potência é **subestimada** — exatamente o defeito que a implementação de
Kienzle deveria corrigir. Regra de ouro: **`fz` nunca é `h`. `h` sempre sai de uma fórmula de `hm`.**

### 2.d — Cadeia correta, passo a passo

```
1.  De   = 2·√(ap·(D − ap))          [só esférica; toroidal usa iC; topo reto: De = D]
2.  n    = Vc × 1000 / (π × D)                                    [D nominal — rotação]
3.  r    = ae / De
4.  CTF  = 1 / √[1 − (1 − 2r)²]   se r < 0,5 ; senão CTF = 1
5.  fz_prog = h_alvo × CTF × (1/sin κr) × (D/De)   [h_alvo = fz de catálogo, lido como hex]
6.  vf   = fz_prog × Z × n
7.  φs   = arccos(1 − 2r)                                          [rad]
8.  hm   = fz_prog × sin κr × 2r / φs
9.  kc   = kc1.1 × hm^(−mc) × (1 − 0,01·γ0)
10. Q    = ap × ae × vf / 1000                                     [cm³/min]
11. Pc   = Q × kc / 60000                    [kW — potência NA ARESTA]
12. Pm   = Pc / η                            [kW — potência EXIGIDA DO MOTOR]
13. Mc   = 9549 × Pc / n                     [Nm — torque na aresta, usa Pc, NÃO Pm]
```
Passo 13, atenção: o torque que a ferramenta sofre vem de `Pc` (aresta). Usar `Pm` ali infla o torque
por 1/η (**+18% com η=0,85**) e faz o sistema barrar operações que a máquina aguenta.

### 2.e — Magnitude do erro atual: a conta está quase certa, a conclusão está certa e é PIOR

`2165 × 0,1^(−0,155)`:  `0,1^(−0,155) = 10^0,155 = 1,4289`  →  **3093,6 N/mm²**
O enunciado diz 3096 — diferença de 2 unidades, arredondamento. **+42,9%**, não 43% exatos. Irrelevante.

**A conclusão está certa: o sistema SUBESTIMA a potência.** E subestima mais do que o enunciado supõe,
porque `h = 0,1` só vale se `h` for `hm`. Se o operador programou para `hex = 0,1`, então `hm ≈ 0,05`:

| `h` usado | `kc` (2165 / 0,155) | vs `kc` constante 2165 |
|---|---|---|
| 0,20 mm | 2 411 | +11,4% |
| 0,10 mm | 3 094 | **+42,9%** |
| 0,05 mm (= hm de hex 0,1) | 3 445 | **+59,1%** |
| 0,02 mm (acabamento) | 4 020 | **+85,7%** |

**Com as constantes de Walter** para a classe que contém o 1045 (kc1.1 = 1500, mc = 0,21):
kc(0,1) = 2 433 · kc(0,05) = 2 814 — ou seja **+12% e +30%** sobre o 2165 constante. O sinal é o mesmo
(subestima), a magnitude depende de qual conjunto de constantes se adota. **Faixa honesta do erro
atual em acabamento: +30% a +59%** — acima da margem declarada de ±15–25% do modelo. **É a maior
fonte de erro isolada de toda a cadeia.**

**Sensibilidade a `mc`** (a pergunta que o enunciado pede quantificada):
`Δmc = 0,05` muda `kc` em **+12,2% em h = 0,1** e **+16,2% em h = 0,05**.
Toda a dispersão de `mc` entre fontes (0,155 → 0,25) vale **+24% em h=0,1** e **+33% em h=0,05**.
Sensibilidade a `kc1.1`: linear, 1:1. Erro de 20% no `kc1.1` = 20% na potência.
**Tradução:** acertar `kc1.1` importa ~2× mais que acertar `mc`, mas `mc` sozinho já estoura a margem.

### 2.f — Piso para `h`: parcialmente NÃO ENCONTRADO no meu território

Nenhum fabricante que consultei publica um valor de corte explícito abaixo do qual a equação para de
valer. O que existe é **onde os dados publicados terminam** — que é o piso de facto:

| Fabricante | Onde a publicação para | Leitura |
|---|---|---|
| Sumitomo | gráfico "Relation Between Feed Rate and Specific Cutting Force" plotado a partir de **f = 0,04 mm/rev** | abaixo disso não há dado publicado |
| Sandvik | tabela "Constant K for use in power requirement calculation" tabulada a partir de **fz = 0,1 mm/dente** | idem |
| Walter | tabela `kc1.1` sem faixa de `h` declarada | sem piso |

O Sumitomo publica em texto o comportamento: *"When feed rate decreases, specific cutting force
increases"* — e o gráfico dele mostra `kc` subindo de ~2 000 para ~8 000 MPa quando `f` cai de 0,4 para
0,04 mm/rev (aço carbono). Confere com Kienzle: `(0,4/0,04)^0,25 = 1,78`… não confere com mc=0,25;
confere com um `mc` efetivo de ~0,60 nessa faixa baixa. **Isto é evidência publicada de que `mc` cresce
quando `h` fica muito pequeno** — o modelo de expoente único subestima `kc` no acabamento fino.

**Recomendação prática (decisão de engenharia, não achado):** travar `h` em **0,02 mm** no cálculo e
exibir aviso de que abaixo disso o modelo extrapola. 0,02 mm é metade do menor ponto publicado
(Sumitomo 0,04 mm/rev) e evita a explosão numérica de `h → 0`.
O critério físico real (raio de gume, espessura mínima de cavaco) → **LACUNA**, ver seção final.

### 2.g — Correções adicionais: uma vale, duas não

| Correção | Publicada por | Fórmula | Magnitude típica | Veredito |
|---|---|---|---|---|
| **Ângulo de saída γ0** | **Sandvik** (tabela D 25: γ=24°→0,76; γ=0°→1,00; γ=−7°→1,07) **+ ISCAR** (eq. 7) | `× (1 − 0,01·γ0)` | fresa inteiriça γ 6–15° → **−6% a −15%** | **IMPLEMENTAR** — 2 fabricantes, fórmula idêntica, custo 1 multiplicação, viés sistemático |
| **Desgaste da ferramenta** | Kennametal expõe um "tool wear factor Cw" na calculadora, **sem publicar o valor** | — | desconhecida | **LACUNA** — não implementar sem número |
| **Velocidade de corte** | Sumitomo publica gráfico "Relation Between Cutting Speed and Cutting Force": força cai até ~160 m/min e achata | sem fórmula | qualitativo | **abaixo do ruído** acima de ~150 m/min; relevante só em Vc baixo |

A tabela de γ0 de Sandvik é, ponto a ponto, `fator = 1 − 0,01·γ0` (γ = 24° → 0,76 ✔; γ = −7° → 1,07 ✔),
e é **exatamente** a eq. (7) de Iscar `Kc = Kc1 × h^(−mc) × (1 − γ/100)`. **CONSENSO em 2 fabricantes.**

### Entrega da Questão 2

`h` = **espessura média `hm`**, calculada a partir do `fz` **já corrigido pelo CTF**, com a forma
periférica exata `hm = fz_prog · sin κr · (2·ae/D)/arccos(1 − 2·ae/D)`. Não há contagem dupla porque
CTF e `hm` são operações inversas sobre a mesma geometria. Cadeia completa no item 2.d.
---

## QUESTÃO 3 — Constantes de Kienzle por material

**Veredito:** no meu território (fabricante de ferramenta) existe **uma** tabela primária completa — a da Walter. Ela **não indexa por liga**: indexa por **classe + resistência à tração `Rm`**. Isso resolve 3.d e 3.e de um jeito que a tabela do Fenix não previa: a variável de entrada certa não é o nome do aço, é o `Rm` (ou a dureza convertida).
**Confiança global da questão:** **REFERÊNCIA ÚNICA** (Walter). Não elevar sem 2 outros fabricantes publicando valores numéricos por material.

### A ponte dureza → Rm (que torna a tabela Walter utilizável)

Walter publica, no mesmo compêndio (pág. **F 32**, "Hardness comparison table — Tensile strength, Brinell, Vickers and Rockwell hardness, extract from DIN 50150"), a conversão HB ↔ HV ↔ HRC ↔ Rm. Extrato dos pontos que interessam:

| HB | 119 | 133 | 138 | 162 | 171 | 190 | 209 | 219 | 276 | 285 | 304 | 333 | 428 | 504 | 523 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Rm (N/mm²)** | 400 | 450 | 465 | 545 | 575 | 640 | 705 | 740 | 930 | 965 | 1030 | 1125 | 1420 | 1740 | 1810 |
| HRC | – | – | – | – | – | – | – | – | 28,5 | 29,8 | 32,2 | 35,5 | 44,5 | 51,1 | 52,3 |

Ressalva publicada por Walter, verbatim: *"Any hardness values converted on the basis of this table will be approximate only."* e *"Values in brackets are theoretically calculated values."*
(Isto é a Walter **reproduzindo** DIN 50150 no material dela — não fui à norma.)

### 3.a — A divergência do alumínio: **nenhuma das duas versões está certa; `mc = 0,75` é erro**

**Valor publicado (Walter, linha N2 — "Wrought aluminium alloy, hardened"):**
> **`kc1.1` = 600 N/mm² · `mc` = 0,25**

O 6061-T6 é liga de alumínio **trabalhada (wrought)** e **endurecida por precipitação (T6)** → cai exatamente em N2. Não é proxy, é a linha do material.

**Veredito sobre as duas versões internas:**

| Versão do projeto | `kc1.1` | `mc` | Contra Walter |
|---|---|---|---|
| código em produção | 750 | 0,23 | kc1.1 **+25%**; `mc` praticamente certo (0,23 vs 0,25) |
| documento técnico / contrato | 1200 | 0,75 | kc1.1 **+100%**; `mc` **3× o máximo que Walter publica para qualquer material** |

**`mc = 0,75` é erro de transcrição, e dá para provar por absurdo.** Faixa de `mc` para alumínio no meu território: **0,25 para as quatro linhas de alumínio da Walter (N1 a N5), sem exceção.** O maior `mc` que Walter publica em toda a tabela de 33 linhas é **0,30** (plástico reforçado com fibra). Não existe `mc` perto de 0,75 em material nenhum.

Consequência física de manter 0,75, em `h = 0,05 mm`:
`kc = 1200 × 0,05^(−0,75) = 1200 × 9,46 = 11 350 N/mm²` — **alumínio exigindo mais força específica que aço temperado a 62 HRC** (Walter: 4 300). Fisicamente impossível.

**Recomendação:** adotar **600 / 0,25** (Walter N2). Se a equipe preferir manter o valor mais conservador do código, 750 é defensável como margem; **1200 e 0,75 devem sair do projeto.**
Nota de contexto: Mitsubishi e Sumitomo publicam "alumínio ≈ 800 MPa" como valor **grosseiro de `kc` em condição de trabalho** — não é `kc1.1`. Confundir os dois é como comparar preço com desconto e preço de tabela. Provável origem do 750/1200.

### 3.b — Os seis "estimados": valores publicados por Rm

Mapeamento por `Rm` na tabela Walter (F 9), com a dureza convertida pela tabela F 32:

| Material do Fenix | Dureza declarada | → Rm (F 32) | Linha Walter (F 9) | **`kc1.1`** | **`mc`** | Qualidade do encaixe |
|---|---|---|---|---|---|---|
| **P20** | 280–320 HB | 930–1095 | #3 "Low/high-alloy steels, low heat treatment level" (Rm 750–1100) | **2000** | **0,25** | **direto** — Rm dentro da faixa |
| **2711** | 300–340 HB | 1010–1160 | **atravessa** #3 (750–1100) e #5 "medium heat treatment" (1100–1400) | **2000–2500** | **0,25** | **faixa, não ponto** |
| **8620 núcleo** | 180–220 HB | 610–740 | #1 "Non-alloyed and low-alloy steels, low/medium tensile" (Rm 350–750) | **1500** | **0,21** | direto por Rm |
| **8620 cementado** | 58–62 HRC | fora da faixa de Rm | #29 "Hardened steels **58–62 HRC**" (grupo H3) | **4300** | **0,25** | **direto — a linha é definida pela própria faixa HRC** |
| **H13 tratado** | 45–52 HRC | 1450–1810 | #27 "Hardened steels **46–52 HRC**" (grupo H1) | **3000** | **0,25** | **direto** |
| **H13 recozido** | — | — | #3 (grupo P11) | 2000 | 0,25 | Walter mapeia 1.2344 para **P11 / H1** |

**Confirmação de nomenclatura vinda do próprio fabricante:** a "Material comparison table" da Walter (mesmo compêndio) lista **`1.2344 — X 40 CrMoV 5 1 — X40CrMoV5-1 — BH13 — SKD 61`** e atribui os grupos **P11 / H1**. Ou seja, **é a Walter que diz que H13 tratado é H1** → `kc1.1 = 3000`, `mc = 0,25`.

**Comparação com a tabela atual do Fenix — os erros:**

| Material | Fenix `kc1.1` | Walter `kc1.1` | Δ | Fenix `mc` | Walter `mc` |
|---|---|---|---|---|---|
| Aço 1020 | 1800 | 1500 | **−17%** | 0,17 | 0,21 |
| Aço 1045 | 2165 | 1500 | **−31%** | 0,155 | 0,21 |
| Inox 304 | 2150 | 1800 | **−16%** | 0,185 | 0,21 |
| Alumínio 6061-T6 | 750 / 1200 | 600 | **−20% / −50%** | 0,23 / 0,75 | 0,25 |
| P20 | 2300 | 2000 | −13% | 0,20 | 0,25 |
| 2711 | 2500 | 2000–2500 | 0 a −20% | 0,20 | 0,25 |
| 8620 núcleo | 2100 | 1500 | **−29%** | 0,20 | 0,21 |
| **8620 cementado** | 2800 | **4300** | **+54%** | 0,20 | 0,25 |
| **H13 45–52 HRC** | 2800 | **3000** | +7% | 0,20 | 0,25 |

**O erro grave da tabela é o 8620 cementado: 2800 contra 4300 publicado — o sistema subestima `kc1.1` em 35%** nesse material, e ainda por cima com `mc` baixo. Somado ao `kc` constante da Questão 2, a potência de um 8620 cementado em acabamento pode sair **~2× abaixo** do real.

**Sobre os cinco `mc = 0,20`:** o enunciado os trata como assinatura de invenção. **Meia razão.** Walter publica `mc` com apenas 5 valores distintos em 33 materiais, atribuídos **por família ISO** (0,21 aços moles + inox; 0,25 aços tratados, N, S, H; 0,28 ferro fundido). Repetição de `mc` **é** o padrão de um fabricante sério. O que está errado no Fenix não é a repetição — é o **valor**: Walter põe 0,25 em todos os cinco casos, não 0,20. Com `Δmc = 0,05`, isso são **+12% em kc** (h=0,1) que o sistema está deixando na mesa, na direção de subestimar.

### 3.c — Expansão: ferro fundido e titânio

| Material pedido | Linha Walter (F 9) | **`kc1.1`** | **`mc`** | Encaixe |
|---|---|---|---|---|
| **GG25** (= EN-GJL-250, Rm ≈ 250) | #10 "Grey cast iron + CGI + malleable, **low tensile strength**" (Rm 200–400) | **800** | **0,28** | direto por Rm |
| **GGG50** (= EN-GJS-500-7, Rm ≈ 500) | #11 "Ductile cast iron with low tensile strength + malleable with higher tensile" (Rm 400–600) | **950** | **0,28** | direto por Rm |
| **Ti-6Al-4V** | #23 "Titanium alloys — alpha, alpha/beta and beta alloys" (grupos S7/S8) | **1500** | **0,25** | direto — a liga é α+β |

Alerta de ambiguidade honesto: as linhas #10 (Rm 200–400) e #12 "Grey cast iron with **higher** tensile strength" (Rm 300–400) **se sobrepõem** na faixa 300–400 com valores diferentes (800 vs 1200, +50%). GG25 a Rm 250 cai só na #10, sem ambiguidade. **GG30/GG35 cairiam nas duas** — nesse caso usar 1200 (conservador).
Walter também confirma na "Material comparison table": `EN-JL1060 / GG-25 / EN-GJL-400` na família **K3**, e `EN-JM 1180 / GGG-50` em **K7** — ambos cobertos pela linha #10 (K1, K3, K7). Isso **muda o GGG-50 para 800/0,28**, não 950. Registro a divergência interna da própria Walter: a leitura por `Rm` manda 950 (#11, grupos K2/K5), a leitura por grupo K7 manda 800 (#10). **Diferença de 16%. SEM CONSENSO interno na fonte** — recomendo 950 por ser o encaixe por Rm, que é o critério que a tabela de `kc` usa.

### 3.d — Dureza como variável: **sim, e é o método publicado**

A tabela de `kc1.1` da Walter **não tem coluna de liga** — tem coluna de `Rm` com faixas (350–750, 750–1100, 1100–1400, 1200–1600…). Ou seja, **o fabricante já trata a resistência mecânica como a variável de entrada**, e trata a liga só como rótulo descritivo.

**Consequência de projeto para o Fenix:** a modelagem "uma liga = um ponto" está invertida. O certo é:
1. entrada = **classe ISO** (P/M/K/N/S/H) + **dureza ou Rm**
2. dureza → Rm pela tabela F 32
3. Rm → linha da tabela F 9 → `kc1.1`, `mc`

Isso resolve de graça o problema das faixas de 40 HB de largura: 1045 a 170 HB e a 220 HB dão Rm 575 e 740 — **ambos dentro da mesma faixa Walter (350–750)**, logo mesmo `kc1.1`. Já P20 a 280 HB (Rm 930) e 2711 a 340 HB (Rm 1160) caem em **linhas diferentes** — e aí a dureza importa mesmo.

**Interpolação contínua entre linhas: NÃO ENCONTRADO.** Walter publica degraus, não uma função `kc1.1(Rm)`. Interpolar linearmente entre faixas é decisão de engenharia do Fenix, não algo que eu possa atribuir a fabricante. Recomendo **não interpolar** — usar o degrau e, na fronteira, o valor maior (conservador para potência).

### 3.e — Nomenclatura brasileira

- **H13** → Walter publica a equivalência: `1.2344 = X 40 CrMoV 5 1 = X40CrMoV5-1 = BH13 = SKD 61` → grupos **P11 / H1**. **Resolvido, com fonte.**
- **8620** → aparece na tabela de comparação da Walter no bloco `20NiCrMo2 / 20NCD2 / SNCM 220` (leitura da extração, coluna AISI truncada). **Encaixe por Rm é o caminho seguro** e não depende dessa linha.
- **2711** → **LACUNA de nomenclatura.** Designação de aciaria brasileira (Villares). Não consta da tabela de comparação de material da Walter, e a equivalência DIN/AISI teria que vir de datasheet de **siderúrgica** (Villares Metals) ou de norma — nenhum dos dois é fabricante de ferramenta, ambos fora do meu território. **Contorno:** como a tabela Walter indexa por `Rm`, o 2711 não precisa da equivalência — precisa da dureza. A 300–340 HB o resultado é 2000–2500 / 0,25 independentemente de qual DIN ele seja.
- **VP Atlas** → **LACUNA**, mesmo motivo. Mesmo contorno.

### Entrega da Questão 3 — tabela com fonte e confiança **por linha**

| Material | `kc1.1` | `mc` | Fonte | Confiança da linha |
|---|---|---|---|---|
| Aço 1020 (120–160 HB) | 1500 | 0,21 | Walter F 9 #1, via Rm 400–545 (F 32) | **REFERÊNCIA ÚNICA** — encaixe por Rm; ressalva: Walter escreve "C > 0,25%" e o 1020 tem ~0,20% C |
| Aço 1045 (170–220 HB) | 1500 | 0,21 | Walter F 9 #1, via Rm 575–740 | **REFERÊNCIA ÚNICA** — encaixe direto (C e Rm dentro da faixa) |
| Inox 304 (140–180 HB) | 1800 | 0,21 | Walter F 9 #7 "Stainless, austenitic steels" (Rm 400–900) | **REFERÊNCIA ÚNICA** — encaixe direto por classe |
| Alumínio 6061-T6 | **600** | **0,25** | Walter F 9 #15 "Wrought aluminium alloy, hardened" (N2) | **REFERÊNCIA ÚNICA** — encaixe direto por classe e tratamento |
| P20 (280–320 HB) | 2000 | 0,25 | Walter F 9 #3, via Rm 930–1095 | **REFERÊNCIA ÚNICA** — direto |
| 2711 (300–340 HB) | 2000–2500 | 0,25 | Walter F 9 #3/#5, via Rm 1010–1160 | **REFERÊNCIA ÚNICA, faixa** — atravessa duas linhas |
| 8620 núcleo (180–220 HB) | 1500 | 0,21 | Walter F 9 #1, via Rm 610–740 | **REFERÊNCIA ÚNICA** — direto |
| 8620 cementado (58–62 HRC) | **4300** | 0,25 | Walter F 9 #29 "Hardened steels 58–62 HRC" (H3) | **REFERÊNCIA ÚNICA** — a linha é definida pela faixa HRC exata |
| H13 (45–52 HRC) | **3000** | 0,25 | Walter F 9 #27 (H1) + tabela de comparação (1.2344 → P11/H1) | **REFERÊNCIA ÚNICA** — mapeamento de material feito pelo próprio fabricante |
| GG25 | 800 | 0,28 | Walter F 9 #10, via Rm ≈ 250 | **REFERÊNCIA ÚNICA** — direto |
| GGG50 | 950 (ou 800) | 0,28 | Walter F 9 #11 por Rm ≈ 500 · **vs** #10 pelo grupo K7 da tabela de comparação | **SEM CONSENSO (interno à fonte)** — 950 vs 800, 16% de diferença |
| Ti-6Al-4V | 1500 | 0,25 | Walter F 9 #23 (S7/S8) | **REFERÊNCIA ÚNICA** — direto |

**Fonte única de todas as linhas:** Walter AG, *Technical Compendium — General*, 2025 EN, págs. F 9 e F 32 —
https://cdn2.walter-tools.com/files/a5ea48ae-5fa6-0161-3cb3-0ac22248a0fb/3ee25a79-8681-4b3e-bf39-9e7f3ca0d193/technical-compendium-general-2025-en.pdf

---

## CADEIA DE CÁLCULO FINAL RECOMENDADA

Cada passo com a fonte que o sustenta.

| # | Fórmula | Fonte |
|---|---|---|
| 1 | `De = 2·√(ap·(D − ap))` (esférica) · `De = D` (topo reto) | Sandvik, Metalcutting Technical Guide D 24 |
| 2 | `n = Vc × 1000 / (π × D)` | Sandvik D 23 · Sumitomo N23 · Mitsubishi |
| 3 | `r = ae / De` | — |
| 4 | `CTF = 1/√[1 − (1 − 2r)²]` se `r < 0,5`, senão `1` | ISCAR *Cutter Basics Guide* p. 41 (forma trigonométrica) · Sandvik (tabela numérica idêntica) |
| 5 | `fz_prog = h_alvo × CTF × (1/sin κr) × (D/De)` | Sandvik D 23–24 (`fz = hex/sin κr`; `fz = D3·hex/De`) |
| 6 | `vf = fz_prog × Z × n` | Sandvik D 23 · Sumitomo N23 |
| 7 | `φs = arccos(1 − 2r)` [rad] | ISCAR p. 41 (`AE = arccos((r−ae)/r)`) |
| 8 | `hm = fz_prog × sin κr × 2r / φs` | derivação; limite confere com Sandvik D 23 (`hm ≈ fz√(ae/Dc)`) |
| 9 | `kc = kc1.1 × hm^(−mc) × (1 − 0,01·γ0)` | Sandvik D 23 (`kc = kc1·hm^-mc`) · ISCAR eq. (6) e (7) · Sandvik D 25 (tabela de γ0) |
| 10 | `Q = ap × ae × vf / 1000` [cm³/min] | Sandvik D 23 · ISCAR eq. (2) · Sumitomo N23 |
| 11 | `Pc = Q × kc / 60000` [kW] — **potência na aresta** | ISCAR eq. (10a) |
| 12 | `Pm = Pc / η` [kW] — **potência exigida do motor** | Sandvik D 23 · Mitsubishi · Sumitomo (os três já entregam este valor sob outro nome) |
| 13 | `Mc = 9549 × Pc / n` [Nm] — torque **na aresta** (usa `Pc`, não `Pm`) | conversão padrão kW↔Nm; Kennametal separa "T torque at the cutter" de "Pm power at the motor" |

**Constantes de máquina:** `η` — Kennametal publica faixa **0,6 a 0,9** conforme o tipo de acionamento; Sumitomo usa **0,75**; Sandvik calcula suas tabelas com **ηmt = 0,8**. O `η = 0,85` do Fenix está dentro da faixa publicada, no terço otimista. **Deixar editável.**

---

## TABELA A — PLACAR

| Item | Valor atual do Fenix | Veredito | Valor recomendado | Confiança |
|---|---|---|---|---|
| Fórmula de afinamento | `fz/√(ae/D)` | **ERRADO — grandeza trocada** (mira `hm`, não `hex`); +79% de avanço em ae/D=0,2 | `CTF = 1/√[1−(1−2ae/De)²]` | CONSENSO |
| Gatilho do afinamento | `ae < 50% D` | **CERTO** | manter; + aviso em `<25%` e trava em `<2%` | CONSENSO |
| Correção por κ | ausente | **FALTA** — até +41% em κ=45° | `× 1/sin κr` | CONSENSO |
| Diâmetro efetivo (esférica) | ausente | **FALTA** — até +129% em ap raso | `De = 2√(ap(D−ap))`, `× D/De` | REFERÊNCIA ÚNICA (Sandvik) |
| `kc` constante = `kc1.1` | sim | **ERRADO** — subestima potência em **+30% a +59%** na faixa de trabalho | `kc = kc1.1 · hm^(−mc)` | REFERÊNCIA ÚNICA elevada (Sandvik + ISCAR) |
| Qual `h` no Kienzle | não definido | **hm**, não `hex`, não `fz` | `hm = fz_prog·sin κr·2r/arccos(1−2r)` | REFERÊNCIA ÚNICA elevada |
| Contagem dupla CTF×hm | risco levantado | **NÃO existe** se `hm` sair do `fz` já corrigido | cadeia do item 2.d | derivação verificável |
| Correção de γ0 | ausente | **FALTA** — −6% a −15% sistemático | `× (1 − 0,01·γ0)` | CONSENSO (Sandvik + ISCAR) |
| `Pc = Q·kc/60000` | sim | **CERTO** (potência na aresta) | manter, renomear no UI | CONSENSO (4 fabricantes) |
| `Pm = Pc/η`, η=0,85 | sim | **CERTO**; η dentro da faixa publicada (0,6–0,9) | manter, tornar editável | CONSENSO |
| `Mc = Pc·9549/n` | sim | **CERTO** — e é `Pc`, não `Pm` | manter | — |
| Al 6061 `kc1.1` | 750 ou 1200 | ambos altos | **600** | REFERÊNCIA ÚNICA |
| Al 6061 `mc` | 0,23 ou 0,75 | **0,75 é erro de transcrição** (3× o máximo publicado para qualquer material) | **0,25** | REFERÊNCIA ÚNICA |
| 8620 cementado `kc1.1` | 2800 | **ERRADO — 35% abaixo** do publicado | **4300** | REFERÊNCIA ÚNICA |
| H13 45–52 HRC `kc1.1` | 2800 | baixo | **3000** | REFERÊNCIA ÚNICA |
| Cinco `mc = 0,20` | estimado | **repetição não é o defeito** — o valor é | **0,25** (Walter usa 0,25 para toda essa família) | REFERÊNCIA ÚNICA |
| Indexação da tabela | por liga | **modelo errado** — Walter indexa por classe + `Rm` | classe ISO + dureza→Rm→linha | REFERÊNCIA ÚNICA |

## TABELA B — O QUE CONTINUA SEM BASE

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| `kc1.1`/`mc` com 2º e 3º fabricante | só a Walter publica tabela numérica completa; Sandvik usa a "Constant K", Mitsubishi/Sumitomo só valores grosseiros de `kc` | catálogo técnico impresso de Seco, Kennametal, Dormer Pramet ou Kyocera com tabela `kc1.1`/`mc` |
| Piso de `h` na equação de Kienzle | nenhum fabricante publica valor de corte | dado de espessura mínima de cavaco / raio de gume — território acadêmico |
| Fator de desgaste `Cw` | Kennametal expõe o parâmetro na calculadora mas não publica o valor | documentação de engenharia da Kennametal |
| Equivalência DIN/AISI de 2711 e VP Atlas | não constam da tabela de comparação da Walter | datasheet de siderúrgica (Villares) — fora do território |
| GGG50: 800 ou 950 | a própria Walter dá dois caminhos (grupo K7 → 800; `Rm` → 950) | segunda fonte de fabricante para desempatar |
| Interpolação contínua `kc1.1(Rm)` | Walter publica degraus, não função | ninguém publica; é decisão de engenharia |

---

## LACUNAS DECLARADAS

1. **`kc1.1` e `mc` de 1045, 304, P20, 2711, 8620 e H13 com valor específico por liga.** No meu território (fabricante de ferramenta) **não existe** tabela por liga — existe por classe + `Rm`. Os valores que entreguei são o encaixe por `Rm` na tabela Walter, e estão rotulados como tal. Os valores "validados contra Diniz/Marcondes/Coppini" que o Fenix usa hoje vêm de **livro-texto acadêmico**, explicitamente fora do meu escopo — **não os confirmei nem os refutei**; só mostrei que a Walter publica números diferentes (até 31% menores para o 1045).

2. **Origem histórica da equação de Kienzle e o valor "canônico" das constantes.** O trabalho de Kienzle & Victor e suas derivações acadêmicas estão fora do meu escopo. Registrei apenas **como os fabricantes apresentam o modelo** (`kc = kc1.1·h^−mc`, com `mc` chamado de "increase value" pela Walter e "rise in specific cutting force" pela Sandvik).

3. **Piso físico de `h`.** O critério real (espessura mínima de cavaco em função do raio de gume `rβ`) é literatura acadêmica. O que consegui foi o **piso editorial** das publicações: Sumitomo plota `kc` a partir de `f = 0,04 mm/rev`; Sandvik tabula potência a partir de `fz = 0,1 mm/dente`. O valor de 0,02 mm que recomendei é **decisão de engenharia declarada**, não dado de fonte.

4. **Equivalência DIN/AISI de 2711 e VP Atlas.** Exigiria datasheet de siderúrgica ou norma — nenhum dos dois é fabricante de ferramenta de corte. Contornado: a tabela Walter indexa por `Rm`, então a equivalência não é necessária para obter `kc1.1`.

5. **Fórmula de potência de Kennametal.** A página publica os **rótulos** (`Ps` power at the cutter, `Pm` power at the motor, `E` machine efficiency factor 0,6–0,9, `Cw` tool wear factor) mas **não as equações** — o cálculo roda no servidor. Registrei a nomenclatura, que é a mais limpa do setor e valida a separação `Pc`/`Pm` do Fenix, mas **não consegui a equação**.

6. **Fórmula de afinamento da Iscar em forma de calculadora.** O *User Guide for Radial Chip Thinning Calculator* da Iscar (`ITA_USER_GUIDE_RadialChipThinningCalculator_EN.pdf`) é PDF de imagem, sem camada de texto — não extraí a fórmula. Registro só a **existência** do calculador. A fórmula da Iscar que uso vem de outra publicação da Iscar (Cutter Basics Guide, p. 41), essa sim legível.

7. **`kc1.1` numérico da Sandvik.** A Sandvik **não publica** `kc1` por material no Metalcutting Technical Guide — publica no lugar uma "Constant K for use in power requirement calculation", tabelada por CMC × `ae/D` × `fz`, que já embute afinamento e Kienzle de uma vez. É um método alternativo válido, mas **não fornece `kc1.1`/`mc` separados**, então não serve como segunda fonte para a tabela do Fenix.

---

**Fim do retorno B.** Território: fabricante de ferramenta de corte. Fabricantes efetivamente citados com fonte primária: **Sandvik Coromant, Walter, ISCAR, Mitsubishi Materials, Sumitomo Electric Hardmetal, Kennametal** (6).
