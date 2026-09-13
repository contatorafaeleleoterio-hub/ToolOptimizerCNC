# Validação — R5 Limites, Alertas e Bloqueios

**Veredito:** APROVADO COM RESSALVAS
**Retorno auditado:** `RESPOSTA_R5.md` (614 linhas)
**Data:** 18/08/2026
**Portões aplicados:** G1 a G7. **G8 não se aplica** — R5 rodou com um pesquisador só, por decisão registrada no HANDOFF. A ausência de `RESPOSTA_R5_B.md` não é falha.
**Compensação:** G2 auditado com rigor reforçado, conforme instrução da rodada. Fui atrás das fontes uma a uma.

---

## Resumo

O retorno responde os 24 subitens das 4 questões e derruba as quatro regras auditadas com evidência de fabricante, não com argumento. **Conferi as fontes de peso uma a uma e a maioria bate palavra por palavra** — Sandvik, Iscar, OSG, Mitsubishi, Kennametal. O achado mais delicado (a rotulagem de potência da Sandvik) está **correto**, e eu o confirmei extraindo o PDF do guia técnico.

O que não entrega: dois números que viram comportamento do sistema entraram sem fonte e sem declaração de que não têm fonte. E cinco contas de apoio saíram erradas ou incoerentes com as próprias premissas do documento.

O que impede o canônico: nada no núcleo. Mas **três divergências com material já registrado precisam ir para a mesa antes de alguém escrever o canônico** — uma delas derruba, por evidência de dois fabricantes, uma decisão marcada `[RESOLVIDO]` no dossiê auditado.

---

## ⚠ No topo: conflito com decisão do Mestre (HANDOFF §9)

**D1 — "Fresa de aço rápido é obsoleta na indústria atual. O HSS sobrevive em broca e macho, não em fresa."**

A Questão 2a apoia a demolição da ponta baixa da janela de `Vc` principalmente no **catálogo de fresas de topo HSS-Co da OSG**, e escreve: *"Se o operador escolher ferramenta de aço rápido — comum em ferramentaria brasileira, o alerta `Vc < 50` dispara em praticamente toda a tabela do próprio fabricante."*

Isso contradiz D1 de frente, e o próprio prompt de R5 declara o escopo como **fresa inteiriça de metal duro**.

**Não descartei sozinho, como manda o protocolo.** Três fatos para a decisão:

1. **O dado da OSG é real.** Extraí o PDF e conferi os seis grupos: 80–150 · 80–110 · 16–32 · 30–50 · 16–32 · 150–390 SFM. A afirmação "nenhum valor chega a 150 m/min e cinco dos seis grupos ficam abaixo de 50 m/min" está **exata**. O fator 24× (390/16) está exato.
2. **A conclusão sobrevive sem ele.** A janela global cai por três outras vias já verificadas: a própria tabela do sistema recomenda 1000 m/min em acabamento de alumínio (o alerta dispararia contra a recomendação do sistema — o dossiê §5.16.4 registra isso); o caso Sandvik de 3000 m/min em alumínio fundido está confirmado; e a mesma constante de 1000 m/min significa 53.052 rpm com fresa de 6 mm e 5.053 rpm com fresa de 63 mm (conferi as duas contas).
3. **Sobra um buraco.** Retirado o HSS, o único número dentro do escopo que sustenta a ponta baixa é o "~30 m/min (titânio/HRSA)" do item 2b — e esse **não tem fonte citada**. Ver BLOQUEIA #1.

**Observação de contexto:** o dossiê §5.16.4 registra que o sistema atual **modela HSS** (fator de material de ferramenta: HSS 0,29 · HSS-Co 0,37 · MD 1,00 · pastilha 1,25). Há tensão entre D1 e o que o sistema faz hoje. Não é minha decisão — é do Mestre.

---

## Achados por portão

| Portão | Selo | Achado | O que fazer |
|---|---|---|---|
| **G1 Cobertura** | `OK` | 24 de 24 subitens respondidos (Q1 a–g, Q2 a–f, Q3 a–f, Q4 a–e). Formato da entrega cumprido: veredito, camada e confiança por questão, Tabela A e Tabela B. Regra 7 do prompt (alvo numérico em toda mensagem) cumprida em **13 de 13** regras. Onde o prompt pedia derrubar premissa com evidência, veio evidência medida, não concordância. Onde pedia recomendação com critério (1g, 2e, 2f, 3d, 4c, 4e), veio escolha, não menu. | Nada. O cabeçalho diz "21 subitens" onde são 24 — erro de contagem do próprio autor, sem efeito. |
| **G2 Fonte** | `RESSALVA` + 2 `BLOQUEIA` | 15 fontes de peso conferidas por mim, a maioria batendo **palavra por palavra** (lista abaixo). Duas fontes não abriram (Harvey 404, Ahmed 403) e uma foi citada na página errada (Silent Tools boring). **Dois números entraram sem fonte e sem declaração.** | Ver "Itens que BLOQUEIAM". As três fontes não conferidas não são load-bearing — as conclusões que elas apoiam têm outra perna verificada. |
| **G3 Confiança** | `RESSALVA` | Rotulagem honesta na maior parte, com três gestos que merecem registro: a página KOR da Kennametal foi contada como *"confirmação qualitativa, não como quarto número"*; o HSMAdvisor foi declarado explicitamente **fora** dos níveis 1–4; e os fatores 0,6/1,4 foram declarados sem fonte. **Duas inflações:** ver abaixo. | Corrigir o nível de duas fontes e a frase "nove fontes primárias independentes". |
| **G4 Default** | `RESSALVA` | **Nenhuma assinatura clássica de preenchimento.** A tabela de `hmin/rβ` tem dispersão real (0,14 a 0,49) — é o oposto do padrão `mc = 0,20` repetido. Mas o offset **`+2`** dos limiares de confirmação se repete em 4 das 5 linhas da regra L2, em contextos que não têm motivo para convergir (uma fresa inteiriça e uma barra de mandrilar amortecida não compartilham margem). | Ver BLOQUEIA #2. `rβ = 10 µm` e `0,3 × rβ` são redondos, mas **declarados** como estimativa e escolha — tratamento correto. |
| **G5 Sensibilidade** | `RESSALVA` | **R5 não exige** a classificação MODELAR/DEFAULT/IGNORAR — a regra 7 do prompt exige alvo numérico, e isso está 13/13. O retorno ofereceu sensibilidades por conta própria. Auditadas: `0,0%` e `3.725%` **têm derivação verificável** (detalhe abaixo). Mas **cinco contas de apoio saíram erradas ou incoerentes**. | Corrigir as cinco antes de citar qualquer uma delas no canônico. Nenhuma afeta as fórmulas centrais. |
| **G6 Divergência** | `RESSALVA` | **Três divergências com material registrado, uma delas grave** — e uma convergência que vale registrar. O retorno não podia enxergá-las (trava 3 o proibiu de ler o dossiê); é exatamente para isso que este portão existe. | Ver "Divergências". A primeira precisa ir ao Mestre antes do canônico. |
| **G7 Lacunas** | `OK` | 15 lacunas na Tabela B, específicas, cada uma com "o que seria preciso para fechar". Inclui as desconfortáveis: `E` do metal duro, os fatores 0,6/1,4, `rβ` por diâmetro, a regra −20%/−40%. Separa três que são **decisão de produto, não dívida de pesquisa**. Recusa-se a pintar faixa de "bom" no indicador de potência por falta de fonte. Fecha com *"Nenhum número deste documento foi preenchido por conhecimento próprio."* | Nada. É o comportamento que o portão existe para premiar. A única falha é que os dois números do BLOQUEIA **não** estão nesta lista — por isso são bloqueio, e não lacuna. |
| **G8 Cross-check A×B** | `NÃO SE APLICA` | Rodada de pesquisador único por decisão registrada. Sem `RESPOSTA_R5_B.md`. | Nada. |

---

## O que eu conferi na fonte (G2 reforçado)

**Bateu exato — abri e li:**

| Afirmação do retorno | Situação |
|---|---|
| Sandvik *Entering angle and chip thickness*: `Dc` 20 mm, `ae` 2 mm, `ae/Dc` = 10%, `hex` = 0,1 mm, `fz` = **0,17 mm/dente** | ✅ literal |
| Sandvik: abaixo de `ae/Dc` = 50% a espessura máxima cai em relação a `fz` | ✅ literal |
| Sandvik *Slicing and trochoidal*: `ae` ≤ **20% do diâmetro** · step over `w` = máx. **10% Dc** · `ap` ≤ **2 × Dc** · fresa ≤ **70% da largura do rasgo** | ✅ os quatro, literais |
| Sandvik *Long overhangs*: *"from tool diameter 4 x D, vibration will start to become an issue"* | ✅ literal |
| Sandvik *Silent Tools milling*: faixa otimizada **7–8 × BD**, *"ask for an engineered adapter"*, CoroMill 390 **UL = 6 × DC**, *"Less damping effects with extensions!"* | ✅ os quatro, literais |
| Sandvik *Milling different materials*: inox 150–250 m/min **explicitamente para evitar aresta postiça** · FoFo cinzento c/ cerâmica 800–1000 · HRSA c/ cerâmica 700–1000 · calor limita `Vc` em Ti/HRSA · rebarba limita `Vc` em FoFo | ✅ os cinco, literais |
| Sandvik *Drilling tips*: *"Internal coolant is always preferred… especially… when drilling deeper holes (>3 x DC)"* · seco até 3 × diâmetro em cavaco curto | ✅ literal |
| Sandvik CoroDrill 861: *"deep holes to depths of 12–30 x drill diameter, without pecking"* | ✅ literal |
| Sandvik M5Q90 / AS-9: **3000 m/min**, `ap` 2 mm, **mais de 10.000 peças** | ✅ confirmado (o caso registra ainda `ae` 140 mm e MRR 5600 cm³/min) |
| OSG HSS-Co: os seis grupos e o intervalo 16–390 SFM | ✅ extraí o PDF, conferi grupo a grupo e as conversões para m/min |
| Iscar *Trochoidal Slicer*: *"no more than five-tool diameters… up to 0.2 of a tool diameter"* | ✅ literal |
| Iscar *Machining Calculations*: `ap` 5 · `ae` 180 · `vf` 459 → **Q = 413,1 cm³/min** (HELIDO Ø250, 12 dentes) + a ressalva de que MRR não se considera isolado de vida e potência | ✅ literal |
| Mitsubishi: `Pc = (ap × ae × vf × kc)/(60 × 10⁶ × η)`, `kc` 1800 MPa, coeficiente 0,8, rótulo *"Actual Cutting Power"* | ✅ literal |
| Kennametal: `Cw` **1,1–1,3** · `E` **0,6–0,9** · `Cm` **1,0–2,3** · saídas `Ps` (na ferramenta) e `Pm` (no motor) separadas | ✅ os quatro, literais |
| `hmin/rβ` da literatura: AISI 1045 **0,22–0,36** · Al6061 **0,23** e **~0,30** · titânio **0,15–0,49** | ✅ corroborados em busca independente |

### O achado de rotulagem de potência — **CONFIRMADO**

Este era o item de maior risco: se correto, muda o cálculo por fator `1/η`; se incorreto, contamina o canônico.

A página pública da Sandvik renderiza a fórmula como imagem. **Extraí o PDF do Metalcutting Technical Guide, seção D, em ordem bruta de leitura:**

```
Net power (kW)   Pc = a_p × a_e × v_f × k_c
                      ─────────────────────
                        60 × 10⁶ × η
```

E na tabela de símbolos da mesma página: `η = Efficiency`. A fórmula de plunge milling carrega o mesmo `η`, e uma tabela adiante traz a nota de rodapé *"Calculated with an efficiency ηmt = 0.8"*.

**O retorno está certo:** a Sandvik rotula como *"Net power"* uma expressão que, com `η` no denominador, entrega potência **no motor**. A Mitsubishi publica a mesma expressão e a chama de "potência de corte real". A Kennametal é a única que separa `Ps` de `Pm` explicitamente. A ressalva que o retorno levanta — *"rotular na interface qual das duas está sendo mostrada"* — é exatamente a ressalva certa.

Confirmei também, no mesmo PDF, `Q = (ap × ae × vf)/1000`, `kc = kc1 × hm^(−mc)` e `Tc = lm/vf`. **A derivação de `Q_max = (Pm × η × 60000)/kc` está correta** e é consistente: como o `Pc` da Sandvik já é potência de motor, substituir `Pc` por `Pm` fecha dimensionalmente.

**Não conferi (não bloqueiam):**
- Harvey *High Efficiency Milling* 7–30% radial — artigo deu 404. A Questão 1a sobrevive com Sandvik e Iscar conferidos.
- Ahmed et al. *Materials* 2017 (BUE a 60 m/min) — DOI deu 403. O próprio retorno já rotula esse limiar como `SEM CONSENSO` e o registra na lacuna B6.
- Iscar RCTF, a frase exata sobre o limiar de 50% — o limiar já está confirmado direto na Sandvik.

**Citação na página errada (não é número inventado):** os balanços **4 / 10 / 14 × BD** de mandrilamento são creditados à página *Silent Tools for boring*, onde não estão. Confirmei que **são números publicados pela Sandvik**, em páginas vizinhas (*Silent Tools for tool holding*, *Main considerations*, *Product overview*). Editora certa, endereço errado. Corrigir a referência, não o valor.

---

## Itens que BLOQUEIAM

**1. `~30 m/min` — Questão 2b, sem nenhuma fonte citada.**
Onde aparece: *"Dentro do escopo estrito do produto hoje (fresa inteiriça de metal duro), a faixa que aparece em fonte de fabricante vai de ~30 m/min (titânio/HRSA, limitado por calor) a ~1000 m/min (alumínio)."*
Por quê bloqueia: retirado o catálogo HSS-Co (fora do escopo por D1 e pelo próprio prompt), **este é o único número dentro do escopo que sustenta a demolição da ponta baixa**. O "~1000" tem lastro; o "~30" não tem fonte nem página. Abri a página da Sandvik que ele cita para outras coisas (*Milling different materials*) e ela não traz esse valor.
O que fazer: citar a página e o valor, ou remover o número. **A conclusão da Questão 2 não depende dele** — sobrevive pelas outras três vias. O que não pode é o número entrar no canônico como apurado.

**2. Limiares de confirmação explícita `6 / 10 / 12 / 16` — regra L2, Tabela A, sem fonte e sem declaração.**
Onde aparece: a tabela da regra L2 pareia cada limiar de alerta com um limiar de confirmação forçada — comum 4→6 · amortecido 8→10 · barra comum 4→5 · barra amortecida 10→12 · barra c/ reforço 14→16.
Por quê bloqueia: **os limiares de alerta (4, 8, 4, 10, 14) são todos de fabricante e eu os conferi.** Os de confirmação não são — são o de alerta mais 2, em 4 das 5 linhas. O `+2` não tem fonte, não tem derivação e **não está declarado como escolha de projeto**, ao contrário dos fatores 0,6/1,4 da regra V2, que o retorno declarou corretamente. É um número que trava a tela do operador.
O que fazer: ou declarar o `+2` como decisão de produto (como foi feito com 0,6/1,4, e mandar para a lacuna B7), ou derivá-lo. O único limiar de confirmação com procedência é o **6** de fresamento — casa com `UL = 6 × DC` da CoroMill 390, que eu confirmei.

**Nenhum dos dois está no núcleo da rodada.** Os quatro vereditos (Q1 ruído · Q2 ruído · Q3 bloqueios errados · Q4 ruído) se apoiam em fontes que conferi de primeira mão.

---

## Divergências com material já registrado

### D-1 — GRAVE: a fórmula de espessura de cavaco contradiz uma decisão `[RESOLVIDO]` do dossiê

| Lado | Fórmula | Onde está registrado |
|---|---|---|
| **Dossiê §10.1** | Woxén — `fz_efetivo = fz / √(ae/D)` | `[RESOLVIDO] — vale o lado B`, decidido por `BUILD_CONTRACT.md` de 13/08/2026 |
| **RESPOSTA_R5, regra R1** | exata — `hex = fz × 2 × √(ae/D − (ae/D)²)` | Questão 1g |

Em `ae/D = 10%` as duas dão **3,162× contra 1,667×** — o avanço programado sai **90% maior** com a adotada. O dossiê já registra o problema no ponto de atenção **A1**, e já registra que a justificativa para o lado B é circular (*"os cenários foram calculados com a própria fórmula simplificada"*).

**O que eu trouxe de novo:** dois fabricantes publicam exemplo resolvido em `ae/D` = 10%, e **os dois reproduzem a fórmula exata e refutam Woxén**:

| Fonte | Dado publicado | Fator implícito | Woxén daria |
|---|---|---|---|
| Sandvik — *Entering angle and chip thickness* | `Dc` 20, `ae` 2, `hex` 0,10 → **`fz` 0,17** | 0,6 ✅ exata | `fz` 0,316 ❌ |
| Iscar — RCTF, Case Study 1 (EC-H7 20-40C20CF, `ae` = 0,10×D) | `fz` 0,22 → **`hex` 0,13** | 0,6 ✅ exata | `hex` 0,070 ❌ |

Extraí o PDF do Iscar e li o estudo de caso. **Não escolho o vencedor** — mas o registro precisa dizer que a decisão do §10.1 foi tomada sem esses dois exemplos na mesa, e que ambos apontam para o lado que foi descartado.

**Por que isso toca R5 e não só R2:** a regra R1 do retorno dispara em `hex < 0,003 mm`. Se o sistema calcular `hex` por Woxén e o limiar for calibrado pela fórmula exata, o alerta dispara no ponto errado por ~90%.

### D-2 — o raio de aresta `rβ` diverge por fator 2,5 a 12,7×

| Fonte | Valor | Nível da procedência |
|---|---|---|
| **Dossiê §5.16.3** | `0,025–0,127 mm` = **25–127 µm** | Harvey, CNCCookbook, CTE, DAPRA — blog e revista |
| **RESPOSTA_R5, item 1c** | **4–20 µm**, default recomendado **10 µm** | artigos com DOI (nível 3), medição de fresa inteiriça real |

A procedência de R5 é mais forte. Mas a divergência não está declarada em lugar nenhum — o pesquisador foi **proibido** de ler o dossiê, então não podia vê-la.

### D-3 — o piso `hmin/rβ`: 5–20% (registrado) contra 20–40% (R5)

Os dados de R5 se sustentam: conferi por busca independente AISI 1045 **22–36%**, Al6061 **0,23** e **~0,30**, titânio **0,15–0,49**. A faixa 0,2–0,4 é onde está a massa.

**Duas ressalvas ao veredito "a referência de 5–20% está ERRADA":**
1. A literatura publica faixas que **descem até 0,14–0,15**, e há levantamento que declara a faixa crítica como **5–38%** conforme o material. O próprio retorno lista 0,14–0,21 (Niu et al.) e 0,17 (cobre). O que os dados sustentam é *"o centro está em 0,2–0,4"*, não *"5–20% está errado"*.
2. **Assimetria de extrapolação não declarada:** quase toda a literatura de `hmin/rβ` é de **micro**-fresamento. O retorno recusa (corretamente) extrapolar o `rβ` de micro-fresa para fresa convencional — mas **extrapola a razão** vinda dos mesmos estudos. É fisicamente defensável, porque o efeito de escala é governado por `h/rβ`, mas precisa aparecer escrito.

**O que D-2 e D-3 fazem juntos** — é aqui que o canônico se decide:

| Cadeia | `rβ` | `hmin/rβ` | Piso de `hex` resultante |
|---|---|---|---|
| Registrada no dossiê | 25–127 µm | 5–20% | **1,25–25 µm** |
| Proposta por R5 | 4–20 µm | 20–40% | **0,8–8 µm** (default 3 µm) |

O retorno "corrigiu" o percentual e trocou o raio ao mesmo tempo, sem que ninguém comparasse o **produto** dos dois. Quem escrever o canônico precisa reconciliar **os dois fatores**, não só o percentual.

### D-4 — o bloqueio de `L/D` contraria uma decisão de produto registrada

O dossiê §5.2 registra, de `PLAN_MOTOR_CALCULADORA_V2.md` §1: *"a comunicação passa a ser em micrômetros de deflexão, mas **o bloqueio por L/D continua** — deflexão substitui o L/D na comunicação, não na proteção."*

O item **3d** do retorno **concorda** com isso (manter os dois, papéis separados — e a justificativa dele é boa: deflexão vai com `(L/D)³ × 1/D`, estabilidade com `1/(D·(L/D)²)`; expoentes diferentes, nenhuma é função da outra). Conferi as duas relações e ambas estão certas.

O item **3c** contraria: recomenda trocar o bloqueio duro por confirmação explícita. Divergência real com decisão registrada. A evidência que o retorno traz é forte e eu a verifiquei (adaptador amortecido 7–8×BD, CoroMill 390 a 6×DC, barra amortecida a 10 e 14×BD, brocas a 30×D). Mas é decisão de produto, não de pesquisa.

### D-5 — convergência que vale registrar

O dossiê §5.5 registra a regra alvo `P ≤ P_máquina × 0,8` (margem 20%, de `PRD_MVP` §10.2). O retorno chega a **0,77** por caminho independente — derivando do fator de desgaste `Cw` = 1,1–1,3 da Kennametal, que eu confirmei na fonte. **Dois caminhos independentes caindo em 77% e 80% é corroboração**, não conflito. Vale registrar como tal.

### D-6 — sem divergência

As referências de MRR **50 / 20 / 5 cm³/min**: o dossiê §5.9.2 as registra sem fonte, e o retorno as classifica `NÃO ENCONTRADO` após varrer nove fabricantes. **Os dois registros concordam.** O veredito de que não existem se sustenta.

---

## As cinco contas que saíram erradas (G5)

Nenhuma toca as fórmulas centrais. Todas aparecem como apoio retórico e **não podem ser citadas assim no canônico**.

| # | Onde | O que diz | O que dá | Situação |
|---|---|---|---|---|
| 1 | Q2a | *"uma janela fixa 50–1000 cobre **menos de um terço** dessa amplitude em escala logarítmica"* | log(20)/log(612) = 1,301/2,787 = **47%** | Errado. É cerca de metade, não menos de um terço. |
| 2 | Q4c | *"erro de fator 1/η — **até 67%** de diferença entre os extremos 0,6 e 0,9"* | (1/0,6)÷(1/0,9) = **50%** | Errado, e **contradiz o próprio documento** — dois parágrafos antes ele diz que a faixa 0,6–0,9 "abre 50%". O 67% é `1/0,6 − 1`, outra comparação. |
| 3 | Q4a | com `kc` aço 2500–3000 e alumínio 800, *"o `Q` alcançável em alumínio é **2,25× a 3,75×** o de aço"* | 2500/800 a 3000/800 = **3,13× a 3,75×** | Incoerente com as próprias premissas. O 2,25 vem de `kc` = 1800 (Mitsubishi), premissa diferente. |
| 4 | Q1g | mensagem R1: *"`hex` 0,0021 mm… suba `fz` de 0,040 para 0,058… ou `ae` de 0,6 para 1,2 mm"* | `hex` 0,0021 com `fz` 0,040 exige `ae/D` ≈ 0,0007 — numa fresa de 6 mm, `ae` ≈ 0,008 mm, não 0,6 mm | As duas correções fecham entre si (+45% em `fz`; ×√2 ao dobrar `ae`), mas a geometria implícita não existe. Texto ilustrativo escrito como mensagem implementável. |
| 5 | Q4b | `3.725%` | (413,1/10,8) − 1 = **3725%** ✅ | **A conta está certa.** Duas ressalvas: os 413,1 são exemplo publicado da Iscar (conferi), mas os 10,8 vêm de um caso **construído** (`ap` 12 × `ae` 0,6 × `vf` 1500) sem fonte — metade apurada, metade inventada, sem declarar. E a notação com ponto é ambígua em pt-BR. |

**As sensibilidades que a rodada mandou eu apertar — as duas passam:**

- **`0,0%`** para `rβ` sobre RPM, avanço e `Pc`: **derivação verificável e correta.** `rβ` não aparece em nenhum ponto da cadeia de cálculo — só define o limiar de um alerta. O retorno mostra o teste: errar `rβ` por fator 2 (5 vs 10 µm) move o limiar de 1,5 para 3 µm de `hex` e não move nada no resultado. É asserção estrutural checável, não opinião. **OK.**
- **`3.725%`**: derivável dos dois números que o próprio documento fornece. **OK**, com a ressalva 5 acima.

**Contas que conferi e estão certas** (registro para não parecer que só olhei o que quebrou): `(L/D)³` → +137% / +363% / +700%; reduções −58% / −78% / −88%; fresa de 3 mm flete **6,7×** mais que a de 20 (= 20/3); `f_n ∝ D/L²` (viga engastada, correto); metal duro permite balanço **1,44×** maior (= ∛3); `Q_max` **425** e **956** cm³/min; η 0,80→0,85 = **+6,25%**; `Q/Pc ∝ hm^mc` com +32% ao triplicar `hm` (3^0,25); 53.052 e 5.053 rpm; 35.810 rpm e o teto de 301 m/min; fator **10** na furação (3→30×D); fator **24×** na OSG; fator **600×** de amplitude total; e os três exemplos de potência P1, P2 e P3, todos internamente consistentes.

---

## Duas inflações de rótulo (G3)

**1. Nível declarado que não corresponde à fonte.** A convenção da rodada define nível 3 = *"artigo revisado por pares / tese (com DOI ou periódico)"*. Duas fontes rotuladas **nível 3** são páginas **ScienceDirect Topics** — agregadores gerados automaticamente, sem DOI e sem revisão por pares:
- *Minimum Chip Thickness* (Q1d) — carrega 4 das 11 linhas da tabela de `hmin/rβ`
- *Specific Cutting Energy* (Q4a) — carrega as ordens de grandeza de `kc` (aço 2500–3000 · FoFo ~1500 · alumínio ~800)

Os estudos compilados por trás **são** revisados por pares, e conferi os valores por fora. Mas a página em si não é nível 3. Reclassificar para nível 4 ou abaixo. **Atenuante importante:** o `kc` está declarado fora do escopo desta rodada (lacuna B15, pertence a R1/R2), então não entra por aqui.

**2. "Nove fontes primárias independentes".** O `CONSENSO` de `hmin/rβ` 0,2–0,4 é sustentado por uma tabela de 11 linhas — mas 5 chegam via as citações de Wu et al. e 4 via a compilação do ScienceDirect. **Dois agregadores, não nove leituras primárias.** Os estudos por baixo são de fato independentes, e minha busca própria confirmou os valores — então o rótulo `CONSENSO` **se sustenta no mérito**. É a frase que precisa mudar, não o valor.

---

## O que entra no canônico como lacuna declarada (§4)

As 15 da Tabela B do retorno entram como estão — são boas e específicas. **Acrescentar seis:**

| # | Lacuna a acrescentar |
|---|---|
| L-16 | **O piso de `hex` depende de dois números que divergem do registrado.** `rβ` (4–20 µm em R5 × 25–127 µm no dossiê §5.16.3) e `hmin/rβ` (20–40% × 5–20%). O piso resultante muda de 0,8–8 µm para 1,25–25 µm. Reconciliar **os dois**, não só o percentual. |
| L-17 | **A razão `hmin/rβ` vem de micro-fresamento e é aplicada a fresa convencional.** Extrapolação fisicamente defensável (o efeito de escala é governado por `h/rβ`), mas assimétrica com a recusa — correta — de extrapolar o `rβ` de micro-fresa. Declarar. |
| L-18 | **A frequência de disparo da regra R1 não foi verificada.** Com `rβ` = 10 µm o piso fica em 3 µm. Um caso HEM normal (D 6 mm, `ae/D` 5%, `fz` 0,05) dá `hex` ≈ 22 µm — 7× acima do piso. A regra substituta quase nunca dispara com o default recomendado. Pode ser o comportamento desejado, mas a afirmação *"entra um alerta que só dispara quando o avanço não acompanhou o `ae` baixo"* não foi quantificada. |
| L-19 | **Os limiares de `L/D` são todos de um fabricante só** (Sandvik), rotulado corretamente como `REFERÊNCIA ÚNICA`. São páginas de produto da própria linha antivibratória — há interesse comercial em publicar balanço alto. Não invalida, mas o canônico deve dizer de onde vem. Contraste: os limiares de furação (3×D e 30×D) têm **três fabricantes independentes** e são genuinamente `CONSENSO`. |
| L-20 | **`ae ≥ 0,95 × D`** (gatilho de rasgo cheio) não tem fonte nem declaração. Definição operacional de "rasgo cheio" — registrar como decisão de produto. |
| L-21 | **`0,77` é derivado, não publicado.** Sai do `Cw` = 1,1–1,3 da Kennametal (conferido). O retorno já declara isso corretamente. Registrar junto a corroboração de D-5: o dossiê §5.5 chega a 0,80 por caminho independente. |

---

## Recomendação de encaminhamento

**O retorno é bom.** Não é um retorno que concordou com as suspeitas — é um que foi atrás do dado, achou fonte de fabricante para quase tudo, declarou 15 lacunas sem tentar tapá-las, recusou explicitamente uma calculadora concorrente como fonte, recusou pintar uma faixa de "bom" por falta de base, e fechou dizendo que nenhum número veio de conhecimento próprio. Conferi a afirmação de maior risco — a rotulagem de potência da Sandvik — e ela está **certa**, o que era o cenário menos provável e o mais valioso.

Três ações antes de escrever `CANONICO_LIMITES_E_ALERTAS.md`:

1. **Levar D-1 ao Mestre.** Dois fabricantes com exemplo resolvido refutam a fórmula marcada `[RESOLVIDO]` no dossiê §10.1. É território de R2, mas a regra R1 de R5 depende dela. Não escrever o piso de `hex` antes disso.
2. **Resolver os dois BLOQUEIA** — citar ou remover o `~30 m/min`; declarar ou derivar o `+2`.
3. **Corrigir as cinco contas e as duas inflações de rótulo.** Nenhuma muda um veredito, mas todas passariam para o canônico como se fossem apuradas.

Os quatro vereditos centrais — `ae/D < 10%` é ruído · a janela global de `Vc` é ruído · os bloqueios de `L/D` proíbem produto de catálogo · as referências de MRR não existem — **estão sustentados por fonte que eu abri e li.**
