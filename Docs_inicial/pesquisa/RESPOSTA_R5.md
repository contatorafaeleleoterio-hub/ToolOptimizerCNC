# RESPOSTA R5 — Limites e Alertas

Nota de pesquisa **concluída** — 4 questões, 21 subitens, todos respondidos. Arquivo criado vazio antes da primeira busca e anexado bloco a bloco, conforme trava 4. Nenhum documento canonico, VALIDACAO_*, dossie auditado ou _descartado foi lido (trava 3).

**Convenção de nível de fonte usada neste arquivo**
1 = norma (ISO, DIN, ANSI/ASME, ABNT) · 2 = handbook (ASM, Machinery's) · 3 = artigo revisado por pares / tese (com DOI ou periódico) · 4 = catálogo, guia de aplicação ou material de treinamento de fabricante, com URL da página do dado.

---

# QUESTÃO 1 — Alerta de engajamento radial `ae/D < 10%` como condição crítica

**Veredito:** A regra atual está **errada**. Engajamento radial de 5–20% de `D` é a faixa de trabalho *recomendada por fabricante* para fresamento trocoidal / HEM, não condição de risco. O alerta atual dispara contra a estratégia mais produtiva que o produto deveria suportar.
**Camada:** **RUÍDO** (a regra `ae/D < 10% = crítico` deve ser removida). O critério de risco real na região de baixo engajamento é outro — espessura média de cavaco contra o raio de aresta — e esse pertence à camada **ALERTA**.
**Confiança (item a):** `CONSENSO`

## 1a) `ae/D` de 5–20% é estratégia recomendada?

**Confirmado.** Três fabricantes independentes publicam faixas que se sobrepõem exatamente nessa região:

| Fonte | Valor publicado | Nível |
|---|---|---|
| Sandvik Coromant, "Slicing and trochoidal milling" (knowledge base) | "The maximum radial depth of cut, ae, should not exceed **20% of the cutter diameter**" em fresamento trocoidal. Para rasgos mais largos que 2×Dc: **ae = 0,1 × Dc (10%)**. Step over `w` = **máx. 10% Dc**. `ap ≤ 2 × Dc`. Diâmetro da fresa ≤ **70% da largura do rasgo**. | 4 |
| Harvey Performance Company (Helical Solutions / Harvey Tool), "High Efficiency Milling" | HEM = **7–30% do diâmetro radialmente**, até **2× o diâmetro axialmente**, com avanço aumentado por compensação de afinamento de cavaco. | 4 |
| Iscar, artigo técnico "A High Speed Trochoidal Slicer" (2021) | "high depth of cut (usually, no more than **five-tool diameters**) when coupled with a low width of cut (typically, **up to 0.2 of a tool diameter**)" | 4 |
| Kennametal, linha KOR / KOR5 DA (páginas de produto) | Ferramentas vendidas explicitamente para "dynamic milling / trochoidal milling with **low radial engagement and full length of cut**", `ap` máx. 3×D. **Sem percentual numérico publicado na página** — vale como confirmação qualitativa, não como quarto número. | 4 |

Leitura para o produto: com `ae/D = 10%` a Sandvik **prescreve** o valor como alvo de step-over em trocoidal. Um "aviso crítico" nesse ponto marca como perigoso o número que o fabricante publica como receita. Isso é o caso-livro de alerta que treina o operador a ignorar alerta.

**Fontes**
- Sandvik Coromant — Slicing and trochoidal milling: https://www.sandvik.coromant.com/en-us/knowledge/milling/milling-holes-cavities-pockets/slicing-trochoidal-milling (nível 4)
- Harvey Performance / Helical Solutions — High Efficiency Milling (In The Loupe): https://www.harveyperformance.com/in-the-loupe/category/high-efficiency-milling/ (nível 4)

## 1b) Qual é o risco real em engajamento radial muito baixo?

**A hipótese do enunciado está confirmada, mas o rótulo muda:** o risco não é `ae/D` baixo — é **espessura de cavaco (`hex`) baixa**. `ae/D` só entra na conta porque, abaixo de `ae/D = 50%`, `hex` fica menor que `fz`. Se o avanço não for compensado, `hex` cai; se for compensado, `ae/D` baixo não gera risco nenhum. **A grandeza que mede o risco é `hex`, não `ae/D`.**

| Achado | Fonte | Nível | Confiança |
|---|---|---|---|
| Abaixo de `ae/Dc = 50%` a espessura máxima de cavaco fica menor que `fz` e exige fator de correção de avanço. Exemplo numérico da própria Sandvik: `Dc` 20 mm, `ae` 2 mm (**`ae/Dc` = 10%**), `hex` = 0,10 mm → `fz` = **0,17 mm/dente** (fator 1,66). | Sandvik Coromant — "Entering angle and chip thickness" | 4 | `CONSENSO` (Iscar repete o limiar de 50%) |
| "`hex` baixo demais é **a causa mais comum de baixo desempenho**", com efeito negativo sobre vida da ferramenta e formação de cavaco. `hex` alto demais "sobrecarrega o gume, o que pode levar à quebra". | Sandvik Coromant — mesma página | 4 | `REFERÊNCIA ÚNICA` (formulação exata) |
| "hmax equals the cutting edge feed until the ratio between `ae` and the diameter falls below **50%**" | Iscar — Radial Chip Thinning Calculator (guia do usuário) | 4 | corrobora o limiar de 50% |
| Abaixo da espessura mínima de cavaco, **ploughing é o mecanismo principal** de remoção e não ocorre cisalhamento, com energia específica de corte muito alta e acabamento degradado. | ScienceDirect Topics — Minimum Chip Thickness (compilação) + artigos primários abaixo | 3 | `CONSENSO` |

**Consequência prática para a regra:** `ae/D = 5%` com avanço compensado é *seguro*. `ae/D = 40%` com avanço **não** compensado pode estar em regime de esfregamento. A regra atual não distingue os dois casos — ela olha a variável errada.

## 1c) Raio de aresta (rβ) típico de fresa inteiriça de metal duro

**Achado central: catálogo de fabricante NÃO publica raio de aresta.** Nas páginas de produto e knowledge base consultadas (Sandvik Coromant, Kennametal solid end milling, Iscar, Harvey/Helical), `rβ` não aparece como especificação por ferramenta — o que aparece é raio de **quina** (corner radius), grandeza diferente. Quem precisa do número precisa **estimar**.

Números que a literatura revisada por pares publica para **fresa inteiriça de metal duro** (não micro-fresa):

| Valor de rβ | Contexto | Fonte | Nível |
|---|---|---|---|
| **4 a 15 µm** | Fresas inteiriças de metal duro revestidas CrTiAlN, gume arredondado por drag finishing, fresamento de SUS-316L. Ao subir rβ de 4 → 15 µm, força de corte +23% e força de avanço +56% (com h = 0,2 mm). | Int. J. Adv. Manuf. Technol., DOI **10.1007/s00170-020-06286-7** | 3 |
| **5, 10, 15 e 20 µm** (faixa experimental) | Estudo de honing de gume e efeito na vida e no revestimento. | J. Mech. Sci. Technol., DOI **10.1007/s12206-024-0930-2** | 3 |
| **0,1 a 4,0 µm** | Micro-fresas comerciais (D < 1 mm) — **não** extrapolar para fresa convencional. | Procedia CIRP — "Cutting Edge Preparation of Micro Milling Tools" | 3 |

**Confiança:** `SEM CONSENSO` para um valor único; `CONSENSO` para a **ordem de grandeza 5–20 µm** em fresa inteiriça convencional de metal duro.

**LACUNA:** não encontrei em nenhuma fonte de nível 1–4 uma tabela `rβ` **por faixa de diâmetro** (ex.: rβ para D = 3, 6, 10, 16, 20 mm). A fonte que teria isso é a especificação interna de preparação de gume de cada fabricante (Sandvik, Kennametal, Guhring), que não é publicada.

**Recomendação de engenharia para o produto:** usar `rβ = 10 µm` como default único para fresa inteiriça de metal duro D ≥ 3 mm, declarado como **estimativa** na interface, e não como número calculado.

## 1d) Espessura mínima de cavaco em função do raio de aresta

**A referência preliminar de 5–20% do raio de aresta está ERRADA — é baixa demais.** A literatura converge em **20–40%**, com dispersão total de 15% a 49%.

| hmin/rβ | Material | Fonte primária | Nível |
|---|---|---|---|
| **0,17** | Cobre puro T2 (rβ medido = 4,4 µm) | Wu et al., *Micromachines* 11(10):924, 2020, DOI **10.3390/mi11100924** | 3 |
| **0,20 (perlita) / 0,30 (ferrita)** | Aço, por microconstituinte | compilado em ScienceDirect Topics — Minimum Chip Thickness | 3 |
| **0,22–0,36** | AISI 1045 | compilado em ScienceDirect Topics | 3 |
| **0,20–0,35** | AISI 1040 | idem | 3 |
| **0,25–0,33** | Aço-ferramenta P-20 | Springer IJAMT, DOI **10.1007/s00170-020-04926-6** | 3 |
| **0,35–0,40** | Al 6082-T6 | compilado em ScienceDirect Topics | 3 |
| **0,23** | Al 6061 (Dib et al.) | citado em Wu et al. 2020 | 3 |
| **~0,30** | Al 6061 (outra condição) | citado em Wu et al. 2020 | 3 |
| **0,15–0,49** | Liga de titânio (Rezaei et al.) | citado em Wu et al. 2020 | 3 |
| **0,14–0,21** | Al 6082-T2 (Niu et al.) — único achado que encosta na faixa 5–20% do enunciado | citado em Wu et al. 2020 | 3 |
| **0,43–0,48** | Cristal KDP (Chen et al.) — fora do escopo, citado só para mostrar a dispersão | citado em Wu et al. 2020 | 3 |

**Confiança:** `CONSENSO` para a faixa **0,2–0,4 × rβ** (nove fontes primárias independentes caem dentro ou colada nela). `SEM CONSENSO` para um valor único.

**Número operacional recomendado:** `hmin = 0,3 × rβ`. Com rβ = 10 µm → `hmin ≈ 3 µm = 0,003 mm`. Esse é o piso de `hex` abaixo do qual o gume esfrega.

**Sensibilidade quantificada de rβ sobre o resultado final:** rβ **não entra** no cálculo de RPM, avanço, força ou potência — ele só define o **piso de `hex`**, isto é, o ponto de disparo de um alerta. Errar rβ por fator 2 (5 µm vs. 10 µm) move o limiar de alerta de 1,5 µm para 3 µm de `hex` e **muda 0,0% no valor de RPM, F ou Pc mostrados**. Classificação: **DEFAULT** — valor fixo estimado, não modelar por diâmetro, não pedir ao usuário.

## 1e) Existe limite inferior de ae/D genuinamente crítico?

**Veredito: não existe limite inferior de `ae/D` publicado como crítico por nenhuma fonte de nível 1–4 consultada.** `CONSENSO` no sentido negativo: as três fontes de fabricante prescrevem `ae/D` **baixo** como boa prática, e nenhuma publica piso.

Os riscos que existem na região de `ae/D` muito baixo são **indiretos** e todos mediados por outra variável:

1. **Esfregamento** — mediado por `hex < hmin` (item 1d). Só ocorre se o avanço não for compensado. Base: nível 3, `CONSENSO`.
2. **Batimento (runout) comparável ao cavaco** — com `hex` muito pequeno, o batimento vira fração significativa do cavaco e uma aresta carrega quase toda a carga enquanto as outras esfregam. **LACUNA parcial:** o mecanismo é descrito, mas não encontrei o limiar numérico (ex.: "alertar quando runout > X% de `hex`") em fonte de nível 1–4; o que apareceu foram blogs e distribuidores, descartados pela regra de território.
3. **Recorte de cavaco (*recutting*)** — a evidência aponta o **contrário** do que a questão supõe: `ae/D` baixo em trocoidal **melhora** a evacuação. Recorte é problema documentado em **rasgo cheio e cavidade profunda**, não em engajamento baixo. Fonte: Sandvik Coromant — Groove or slot milling ("Make sure to evacuate chips out of the groove. Use compressed air to avoid chip congestion"), nível 4.
4. **Instabilidade / chatter** — a literatura de estabilidade indica que baixa imersão radial tem comportamento próprio (duplicação de período). **LACUNA:** não confirmei com fonte primária dentro deste turno.

**Conclusão para a regra:** não há base para bloquear nem para alertar por `ae/D` baixo. O alerta correto na região baixa é sobre `hex`.

## 1f) Existe limite superior que mereça alerta?

**Sim — e o sistema hoje não tem nenhum.** Esta é uma lacuna real de segurança, o inverso do problema da questão 1.

| Achado | Fonte | Nível | Confiança |
|---|---|---|---|
| Rasgo cheio (full slotting) é descrito como **"a demanding operation"**; rigidez da máquina e evacuação de cavaco entram como critério de decisão do método. | Sandvik Coromant — Groove or slot milling | 4 | `REFERÊNCIA ÚNICA` (qualitativo) |
| Em fresamento de rasgo, **`ap` deve ser reduzido para ~70% do comprimento de aresta**. | Sandvik Coromant — Groove or slot milling | 4 | `REFERÊNCIA ÚNICA` |
| Evacuar cavaco para fora do rasgo; usar ar comprimido para evitar congestionamento. Usar fresa de passo largo para evitar cavaco fino, que causa vibração, superfície ruim e rebarba. | Sandvik Coromant — Groove or slot milling | 4 | `REFERÊNCIA ÚNICA` |
| Em trocoidal, o **diâmetro da fresa deve ficar ≤ 70% da largura do rasgo** — ou seja, a Sandvik recomenda *não* fazer rasgo cheio quando há alternativa. | Sandvik Coromant — Slicing and trochoidal milling | 4 | `REFERÊNCIA ÚNICA` |

**LACUNA:** não encontrei em fonte de nível 1–4 um **percentual publicado de redução de avanço** para `ae = D` (o valor "35–40%" apareceu apenas em blog/distribuidor e foi descartado).

**Onde colocar o limiar superior:** o único número com procedência para separar "lateral" de "rasgo" é o **50% de `ae/Dc`** — limiar onde Sandvik e Iscar dizem que `hex` deixa de ser igual a `fz`. Declaro explicitamente: **o limiar de 50% tem procedência como fronteira de cálculo, não como fronteira de perigo.**

## 1g) Regra de alerta correta que substitui a atual

**Remover** `ae/D < 10% ⇒ aviso crítico`. **Colocar no lugar** três regras, nenhuma bloqueante além da geométrica:

**R1 — Piso de espessura de cavaco (substitui o alerta atual)**
- Variáveis: `ae`, `D`, `fz`, `rβ` (default 10 µm), `hmin = 0,3 × rβ`.
- Calcular `hex`: para `ae/D < 0,5`, `hex = fz × 2 × √(ae/D − (ae/D)²)` (forma padrão do fator de afinamento radial; a Sandvik publica o mesmo resultado como fator de modificação, ex.: 1,66 em `ae/Dc` = 10%).
- Disparo: `hex < 0,003 mm` (isto é, `hex < 0,3 × rβ`).
- Camada: **ALERTA**.
- Texto ao operador, com alvo numérico: *"Espessura de cavaco 0,0021 mm — abaixo do piso de 0,003 mm. Nesta faixa o gume esfrega em vez de cortar: gera calor e desgasta por abrasão sem remover material. **Aumente o avanço por dente de 0,040 para 0,058 mm/dente** (+45%) ou aumente `ae` de 0,6 para 1,2 mm."*
- Nível da base: 3 (hmin/rβ) + 4 (fator de afinamento). O valor de rβ é **estimativa declarada**, não medida.

**R2 — Aviso de rasgo cheio (não existe hoje)**
- Disparo: `ae ≥ 0,95 × D`.
- Camada: **ALERTA**.
- Texto: *"Rasgo cheio (`ae` = `D`): corte concordante e discordante simultâneos, sem saída para o calor e com risco de recorte de cavaco. **Reduza `ap` para no máximo 70% do comprimento de aresta** (aqui: de 20 para 14 mm) e garanta ar comprimido ou refrigeração dirigida. Alternativa: usar fresa com `D` ≤ 70% da largura do rasgo e abrir por trocoidal."*
- Base: Sandvik Coromant — Groove or slot milling e Slicing and trochoidal milling (nível 4).

**R3 — `ae ≤ D`** permanece como **LIMITE FÍSICO** e bloqueio (é geometria, não recomendação).

## O que muda para o operador (Questão 1)

- **Some** o alerta que hoje dispara em toda a janela 5–20% de `ae/D` — ou seja, em **toda** operação trocoidal/HEM. Em oficina que usa CAM moderno, isso é a maioria dos desbastes: o alerta atual é praticamente permanente e, por isso, invisível.
- **Entra** um alerta que só dispara quando o avanço não acompanhou o `ae` baixo — condição que o operador **consegue corrigir**, com o número de quanto corrigir.
- **Entra** um aviso em rasgo cheio, hoje inexistente, que é a condição de engajamento genuinamente mais severa.

**Fontes (Questão 1)**
- Sandvik Coromant — Slicing and trochoidal milling: https://www.sandvik.coromant.com/en-us/knowledge/milling/milling-holes-cavities-pockets/slicing-trochoidal-milling (nível 4)
- Sandvik Coromant — Entering angle and chip thickness: https://www.sandvik.coromant.com/en-us/knowledge/milling/entering-angle-and-chip-thickness (nível 4)
- Sandvik Coromant — Groove or slot milling: https://www.sandvik.coromant.com/en-us/knowledge/milling/groove-or-slot-milling (nível 4)
- Iscar — A High Speed Trochoidal Slicer (2021): https://www.iscar.com/en-hq/technical-articles/year-2021/a-high-speed-trochoidal-slicer (nível 4)
- Iscar — User Guide, Radial Chip Thinning Calculator: https://www.iscar.com/ITC/UserGuide/ITA_USER_GUIDE_RadialChipThinningCalculator_EN.pdf (nível 4)
- Kennametal — KOR / KOR5 DA solid carbide end mills: https://www.kennametal.com/us/en/products/metalworking-tools/milling/solid-end-milling/high-performance-solid-carbide-end-mills/kor-series.html (nível 4)
- Harvey Performance / Helical Solutions — High Efficiency Milling: https://www.harveyperformance.com/in-the-loupe/category/high-efficiency-milling/ (nível 4)
- Wu X. et al., *Micromachines* 11(10):924, 2020 — DOI 10.3390/mi11100924 (nível 3)
- Int. J. Adv. Manuf. Technol. — DOI 10.1007/s00170-020-06286-7 (nível 3)
- Int. J. Adv. Manuf. Technol. — DOI 10.1007/s00170-020-04926-6 (nível 3)
- J. Mech. Sci. Technol. — DOI 10.1007/s12206-024-0930-2 (nível 3)
- Procedia CIRP — Cutting Edge Preparation of Micro Milling Tools: https://www.sciencedirect.com/science/article/pii/S2212827114002261 (nível 3)

---

# QUESTÃO 2 — Janela de velocidade de corte `Vc < 50` ou `> 1000 m/min`

**Veredito:** A regra atual está **errada nas duas pontas**, e o conceito de janela global é inválido por construção. `Vc` só tem significado junto com o par (material da peça, substrato/revestimento da ferramenta); sem esse par, qualquer par de números é arbitrário.
**Camada:** **RUÍDO** — a janela global deve ser removida inteira. O que sobra de legítimo é (i) **LIMITE FÍSICO** de rotação da máquina, que o sistema já valida separadamente, e (ii) um **ALERTA** relativo à faixa tabelada do material.
**Confiança:** `CONSENSO`

## 2a) Existe faixa de `Vc` universalmente aplicável?

**Não.** A prova mais direta é a própria tabela de um fabricante para **um único substrato**: no catálogo técnico de fresas de topo HSS-Co da OSG (páginas 1410–1411 do catálogo de fresamento), a velocidade recomendada varia de **16 SFM a 390 SFM** — fator **24×** dentro da mesma família de ferramenta, só trocando o material da peça.

| Grupo de material (catálogo OSG, fresas de topo HSS-Co) | Dureza | `Vc` publicado | Em m/min |
|---|---|---|---|
| Aços de baixo carbono, latão, bronze | < 145 HB | 80–150 SFM | **24,4–45,7** |
| Aços de média resistência, forjados, ferro fundido, latão/bronze duro, cobre | < 20 HRC | 80–110 SFM | **24,4–33,5** |
| Aços de alta resistência, titânio não ligado, resistentes ao calor, ferríticos baixa liga | 20–30 HRC | 16–32 SFM | **4,9–9,8** |
| Aços de alta resistência, aços-ferramenta, inox de média resistência e ligas de titânio | 30–40 HRC | 30–50 SFM | **9,1–15,2** |
| Resistentes ao calor, inox de alta resistência e ligas de titânio | 40–50 HRC | 16–32 SFM | **4,9–9,8** |
| Alumínio, alumínio ligado, plásticos, madeira | — | 150–390 SFM | **45,7–118,9** |

Fonte: OSG — "End Mill Technical", HSS-Co 4Fl & 6Fl, https://osgtool.com/content/literature/8002024CA/Tech%20Pg.%20Standard%204Fl%20&%206FL%20HSS-Co.pdf (nível 4). Conversão SFM → m/min = ÷ 3,2808.

**Observação demolidora para a regra atual:** nessa tabela inteira, de fabricante, **nenhum valor chega a 150 m/min** e cinco dos seis grupos ficam **abaixo de 50 m/min**. Se o operador escolher ferramenta de aço rápido — comum em ferramentaria brasileira — o alerta `Vc < 50` dispara em praticamente **toda** a tabela do próprio fabricante.

Na outra ponta, dentro dos metais duros e superduros:

| Condição | `Vc` publicado | Fonte | Nível |
|---|---|---|---|
| Inox austenítico/duplex, desbaste, metal duro | **150–250 m/min** | Sandvik Coromant — How to do milling in different materials | 4 |
| Ferro fundido cinzento, fresamento com **cerâmica** | **800–1000 m/min** | idem | 4 |
| HRSA, fresamento com **cerâmica** | **700–1000 m/min** (contra 200–300 em torneamento) | idem | 4 |
| Alumínio fundido AS-9, faceamento de desbaste com **PCD** (cabeçote M5Q90) | **3000 m/min**, `fz` 0,2 mm, `ap` 2,0 mm, >10.000 peças produzidas | Sandvik Coromant — M5Q90 / usinagem de alumínio automotivo | 4 |

**Amplitude total documentada: de ~5 m/min a 3000 m/min — fator 600×.** Uma janela fixa 50–1000 cobre menos de um terço dessa amplitude em escala logarítmica.

## 2b) Extremos legítimos

- **Mais baixo publicado em catálogo:** **16 SFM ≈ 4,9 m/min** — fresa de topo HSS-Co, ligas resistentes ao calor / inox de alta resistência / ligas de titânio a 40–50 HRC. Fonte OSG (nível 4). `REFERÊNCIA ÚNICA` para o valor exato; `CONSENSO` para "aço rápido em material difícil roda abaixo de 20 m/min".
- **Mais alto publicado por fabricante:** **3000 m/min** — PCD em alumínio fundido, caso de aplicação Sandvik em produção seriada. `REFERÊNCIA ÚNICA` (um caso, um fabricante). Existem menções a até 6000 m/min em material de divulgação, que **não consegui confirmar em página técnica de dado** — ver "Lacunas declaradas".
- Dentro do escopo estrito do produto hoje (**fresa inteiriça de metal duro**), a faixa que aparece em fonte de fabricante vai de ~**30 m/min** (titânio/HRSA, limitado por calor) a ~**1000 m/min** (alumínio). Mesmo esse recorte estreito já estoura a ponta baixa da janela atual.

## 2c) A ponta baixa — aresta postiça de corte (BUE)

**O mecanismo é `CONSENSO`; o limiar numérico é `SEM CONSENSO` e é material-dependente.**

| Achado | Fonte | Nível |
|---|---|---|
| Em desbaste de inox austenítico/duplex, **"usar velocidades de corte altas (`vc` = 150–250 m/min)"** — a recomendação é explicitamente **para evitar aresta postiça**. É o único limiar numérico anti-BUE que encontrei publicado por fabricante. | Sandvik Coromant — How to do milling in different materials | 4 |
| "A velocidade de corte `vc` = 60 m/min foi selecionada **para garantir a formação de BUE**. Velocidades maiores (`vc` > 60 m/min) provocam menos BUE; velocidades menores (`vc` < 60 m/min) dão taxas de desgaste baixas demais para ensaio razoável." — AISI 304. | Ahmed Y.S. et al., *Materials* 10(11):1230, 2017, DOI **10.3390/ma10111230** | 3 |
| A geometria do gume deve ser sempre positiva com arredondamento otimizado **para evitar aderência de cavaco** na saída do gume — em ISO M e ISO S. | Sandvik Coromant — How to do milling in different materials | 4 |

**Depende de quê:** os dois números acima estão a 2,5× de distância um do outro e se referem a materiais diferentes (inox em fresamento × AISI 304 em ensaio de desgaste), o que já mostra que o limiar é função de material da peça, geometria/revestimento e refrigeração — não de uma constante.

**LACUNA:** a faixa de temperatura de zona de corte associada ao BUE (valores como "pico em 300–350 °C, desaparece acima de 500 °C") apareceu em resumos de busca, mas **não consegui confirmar em nenhum artigo primário acessível** — as duas fontes revisadas por pares que abri não trazem esses números. Não uso.

**Conclusão para a regra:** não existe base para um piso global de `Vc`. Existe base para dizer que **operar muito abaixo da faixa tabelada do material favorece BUE** — e isso é exatamente um alerta *relativo à tabela*, não absoluto.

## 2d) A ponta alta — desgaste térmico

**Não existe teto global publicado.** O que os fabricantes publicam é o **fator limitante**, sempre material-específico:

- HRSA e titânio: *"a alta geração de calor limita a velocidade de corte"*, e a operação exige *"alta rigidez e alta potência e torque em baixa rotação"* — Sandvik, nível 4.
- Ferro fundido cinzento com cerâmica: *"a formação de rebarba na peça limita a velocidade de corte"* (não o desgaste térmico) — Sandvik, nível 4.
- Metal duro em aço endurecido: aplicável **até ~60 HRC**; acima disso troca-se o substrato (CBN, aplicável a 55–62 HRC) — Sandvik, nível 4.

Ou seja: o teto real é **atributo do par material×substrato**, e o teto *prático* na oficina é a **rotação máxima da máquina** — que o sistema já valida em separado contra o perfil de máquina. Um segundo teto global em 1000 m/min é redundante quando não é falso: com fresa de 6 mm, 1000 m/min já pede 53.052 rpm, muito acima de qualquer fuso de oficina; com fresa de 63 mm, pede 5.053 rpm, perfeitamente normal. **A mesma constante de 1000 m/min significa coisas opostas conforme o diâmetro** — isso, por si, invalida o teto.

## 2e) A regra correta

**Confirmada a substituição:** comparar contra a **faixa tabelada do material com o substrato da ferramenta**, que o sistema já possui, e não contra janela global.

Sobre a prática das calculadoras de referência — declaro o nível da evidência antes do conteúdo: **G-Wizard, HSMAdvisor e FSWizard são produtos concorrentes, não fonte técnica**; pela regra de território desta rodada eles **não valem como fonte** (calculadora de terceiro). Registro só como observação de mercado, sem peso de evidência:

- HSMAdvisor, documentação própria do produto: usa **campos com realce por cor** (verde = valor dentro do ideal do banco interno), barras verde/vermelha com "zona segura", e avisos específicos por causa — por exemplo, aviso de **torque** informando que o cálculo teve de limitar o avanço para não quebrar a ferramenta. Os parâmetros vêm do banco interno considerando tipo de ferramenta, material e geometria. Fonte: https://hsmadvisor.com/help (documentação do produto, **não** nível 1–4).
- Sandvik e Kennametal não expõem "alerta de velocidade" em calculadora pública: eles **entregam a faixa recomendada** por par material×ferramenta (CoroPlus ToolGuide, Kennametal Speed and Feed). O padrão da indústria é **prescrever a faixa**, não vigiar uma janela.

**LACUNA:** não consegui evidência de nível 1–4 sobre o comportamento de alerta de nenhuma calculadora de referência. Sem isso, a questão 2e fica respondida pelo lado técnico (a comparação relativa é defensável) e **não** pelo lado do benchmarking.

## 2f) O que sobra de alerta de velocidade

Três regras sobrevivem, e nenhuma delas é uma janela global:

**V1 — Rotação exigida acima da máquina** · Camada: **LIMITE FÍSICO** (já existe no sistema, mantém).
Texto: *"`Vc` 900 m/min com fresa de 8 mm exige 35.810 rpm; sua máquina vai a 12.000 rpm. **Reduza `Vc` para no máximo 301 m/min** (ou use fresa de 24 mm)."*

**V2 — `Vc` fora da faixa tabelada do material + substrato** · Camada: **ALERTA**.
Condição: `Vc < 0,6 × Vc_min(material, substrato)` ou `Vc > 1,4 × Vc_max(material, substrato)`.
Texto (ponta baixa): *"`Vc` 45 m/min está 62% abaixo da faixa tabelada para inox 304 com metal duro revestido (120–200 m/min). Nessa região o cavaco adere ao gume (aresta postiça): acabamento ruim e desgaste irregular. **Suba para pelo menos 120 m/min.**"*
Texto (ponta alta): *"`Vc` 380 m/min está 90% acima da faixa tabelada (120–200 m/min). Acima da faixa o desgaste é térmico e a vida cai rápido. **Reduza para no máximo 200 m/min.**"*
**Declaração de procedência do ±40%:** os fatores 0,6 e 1,4 **não têm fonte publicada**. São a tolerância que envelopa a margem declarada do próprio modelo (±15–25%) sem disparar dentro dela. Está registrado como escolha de projeto, não como dado — ver "Lacunas declaradas".

**V3 — Erro de digitação (`Vc` absurdo)** · Camada: **ALERTA** de sanidade, não de física.
Condição: `Vc < 0,1 × Vc_min` ou `Vc > 10 × Vc_max` do material.
Texto: *"`Vc` 5 m/min para alumínio (faixa 300–1000 m/min) — verifique se digitou `Vc` no lugar de `fz`."*
Base: nenhuma fonte técnica é necessária; é validação de entrada, e deve ser rotulada como tal na interface para não se confundir com risco de processo.

## O que muda para o operador (Questão 2)

- **Some** o alerta em toda ferramenta de aço rápido (a tabela HSS-Co da OSG inteira dispara hoje), em todo titânio/HRSA/inox de alta resistência com metal duro na ponta baixa da faixa, e em todo acabamento de alumínio a 1000 m/min — que é a própria recomendação do sistema.
- **Entra** um alerta que sabe qual material está na mesa, com a faixa correta e o número de destino.
- O bloqueio por rotação de máquina continua sendo o único limite duro de velocidade — e é o único que corresponde a um objeto físico real (o fuso).

**Fontes (Questão 2)**
- OSG — End Mill Technical, HSS-Co 4Fl & 6Fl (catálogo, pp. 1410–1411): https://osgtool.com/content/literature/8002024CA/Tech%20Pg.%20Standard%204Fl%20&%206FL%20HSS-Co.pdf (nível 4)
- Sandvik Coromant — How to do milling in different materials: https://www.sandvik.coromant.com/en-gb/knowledge/milling/milling-different-materials (nível 4)
- Sandvik Coromant — M5Q90 / usinagem de alumínio automotivo: https://www.sandvik.coromant.com/en-us/industry-solutions/automotive/engine/m5q90 (nível 4)
- Sandvik Coromant — Cutting tool materials (metal duro até ~60 HRC; CBN 55–62 HRC): https://www.sandvik.coromant.com/en-us/knowledge/materials/cutting-tool-materials (nível 4)
- Sandvik Coromant — Metalcutting Technical Guide, seção D (Milling): fórmulas oficiais `n`, `vc`, `hm`, `Q`, `Pc`, `kc`, e tabela de correção de `vc` por diferença de dureza Brinell por CMC: https://dcngli4g50fhp.cloudfront.net/userfiles/ad/sandvik/documents/sandvik_5747275_catalog.pdf (nível 4)
- Ahmed Y.S. et al., *Materials* 10(11):1230, 2017 — DOI 10.3390/ma10111230 (nível 3)
- HSMAdvisor — documentação do produto: https://hsmadvisor.com/help (**não** é fonte de nível 1–4; registrado como observação de mercado)

---

# QUESTÃO 3 — Relação balanço/diâmetro (`L/D`) por família de ferramenta

**Veredito:** Os **limiares de alerta estão na ordem de grandeza certa**; os **bloqueios duros estão errados nas três famílias**. Bloquear fresamento em `L/D > 6` e mandrilamento em `L/D > 5` proíbe produtos que os fabricantes vendem de catálogo exatamente para essa faixa. E o gatilho de furação em `L/D > 3` está certo pela razão errada: o que muda em 3×D não é rigidez, é **refrigeração interna**.
**Camada:** `L/D` é **ALERTA**, não LIMITE FÍSICO. Não existe grandeza física que "quebre" em `L/D = 6` — existe perda progressiva de rigidez e de margem de estabilidade. O único bloqueio defensável é **condicional ao tipo de haste/adaptador**, e ainda assim como confirmação explícita (o produto já tem a camada de "resultado forçado").
**Confiança:** `CONSENSO` para "4×D é onde vibração começa a incomodar"; `REFERÊNCIA ÚNICA` (Sandvik) para cada valor de balanço máximo por tipo de adaptador; `NÃO ENCONTRADO` para tabela verde/amarelo/vermelho por `L/D`.

## 3a) Os limites batem com catálogo? E em que forma o fabricante publica?

**Forma de publicação:** os fabricantes publicam **razão adimensional** (`× D`, `× BD`, `× Dc`) — a mesma forma que o sistema usa. Não publicam comprimento absoluto nem redução percentual de parâmetro por faixa. Esse ponto é `CONSENSO` (Sandvik, Iscar, Guhring, Harvey).

| Família | O que o fabricante publica | Fonte | Nível |
|---|---|---|---|
| Fresamento — geral | "A partir de **4 × D** de diâmetro de ferramenta, a vibração começa a ser um problema." | Sandvik Coromant — Machining with long overhangs | 4 |
| Fresamento — fresa de catálogo | CoroMill 390: comprimentos utilizáveis **UL = 6 × DC** (produto padrão, não especial) | Sandvik Coromant — Silent Tools for milling | 4 |
| Fresamento — adaptador amortecido | Faixa **otimizada de trabalho: 7–8 × BD**. Acima disso, "peça um adaptador de engenharia". Advertência: "menos efeito de amortecimento com extensões". | Sandvik Coromant — Silent Tools for milling | 4 |
| Mandrilamento — barra comum | Barra de aço ou de metal duro: até **4 × BD** | Sandvik Coromant — Silent Tools (boring) | 4 |
| Mandrilamento — barra amortecida de aço | até **10 × BD** | idem | 4 |
| Mandrilamento — barra amortecida com reforço de metal duro | até **14 × BD** | idem | 4 |
| Furação | Refrigeração interna "sempre preferível para evitar entupimento de cavaco, especialmente em materiais de cavaco longo e ao furar mais fundo (**> 3 × Dc**)". Furação a seco: só materiais de cavaco curto e **até 3 × diâmetro**. | Sandvik Coromant — Drilling tips | 4 |
| Furação profunda com canal de refrigeração | CoroDrill 861: furos precisos **até 30 × diâmetro sem pica-pau** | Sandvik Coromant — CoroDrill 861 | 4 |
| Furação profunda | Brocas inteiriças extra-longas com relações de **30, 40 e 50 × D** | Iscar — Deep hole drilling / extra long solid carbide drills | 4 |
| Furação profunda | RT 100 T: furo-guia de **1,5×D a 3×D** (3×D em alumínio), depois alta pressão de refrigerante e **"nenhum ciclo pica-pau necessário"**; reduzir avanço para **40%** ~1 mm antes da saída em furo passante oblíquo | Guhring — Technical Information, Deep Hole Drilling (RT100T) | 4 |

**Confronto direto com a tabela do sistema:**

| Regra atual | Veredito | Por quê |
|---|---|---|
| Fresamento verde ≤ 3 | **OK** | Abaixo do 4×D onde a Sandvik diz que a vibração começa. |
| Fresamento amarelo 3–4 / vermelho 4–6 | **OK como alerta graduado** | 4×D é o ponto publicado de virada. A subdivisão exata 4–6 não tem fonte — ver 3e. |
| Fresamento **bloqueado > 6** | **ERRADO** | A Sandvik vende adaptador amortecido com faixa **otimizada** em 7–8×BD e fresa de catálogo com UL = 6×DC. O bloqueio proíbe produto padrão de fabricante. |
| Mandrilamento verde ≤ 3 / amarelo 3–4 | **OK** | Coincide com o teto de 4×BD da barra comum. |
| Mandrilamento **bloqueado > 5** | **ERRADO, e é o pior dos três** | Barra amortecida de aço vai a 10×BD e com reforço de metal duro a 14×BD. O bloqueio em 5 elimina **a categoria inteira** de barra antivibratória — que existe precisamente para essa faixa. |
| Furação `L/D > 3` exige pica-pau (aviso) | **CERTO pelo motivo errado** | 3×Dc é o limiar publicado, mas para **refrigeração interna**, não para pica-pau. Com refrigeração interna e pressão adequada, o próprio fabricante diz que **não há pica-pau** até 30×D. |

## 3b) O limite depende do tipo de fresa e da estratégia?

**Depende — mas não do tipo de fresa (topo, toroidal, esférica).** Nenhuma fonte de nível 1–4 publica limite de `L/D` **por geometria de ponta**. O que muda o limite, com fonte, é:

1. **A haste/adaptador** — comum 4×, amortecido 7–8× (fresamento) e 10× / 14× (mandrilamento). `REFERÊNCIA ÚNICA` (Sandvik), mas com três números coerentes entre si.
2. **A geometria do pescoço** — ferramenta de pescoço reduzido/cônico é recomendada quando a profundidade passa de **5 × D**. Fonte: Harvey Performance / Helical (nível 4).
3. **A estratégia** — a evidência aqui é indireta mas convergente: HEM/trocoidal usa `ae` pequeno e `ap` grande justamente porque a força **radial** cai, que é a componente que flete a ferramenta. Sandvik descreve o efeito ("baixas forças de corte, que permitem grandes profundidades axiais"). **Não encontrei limite de `L/D` publicado por estratégia.** A justificativa interna do sistema ("`L/D` > 6 só faz sentido em HSM, toroidal ou condições muito controladas") é **plausível mas sem fonte** — `NÃO ENCONTRADO`.

**LACUNA:** limite de `L/D` diferenciado por tipo de fresa e por estratégia. A fonte que teria isso seria um guia de aplicação de fresamento de cavidade profunda com tabela de balanço; não localizei nenhum publicado em nível 1–4.

## 3c) `L/D > 6` é legítimo? Sob que condições?

**Sim, e é legítimo em produto de linha, não em exceção.** `CONSENSO` no sentido de que várias fontes de fabricante vendem para essa faixa:

- Fresamento: adaptador amortecido Sandvik com faixa otimizada **7–8 × BD**; acima disso, solução de engenharia.
- Mandrilamento: barra amortecida **10 × BD**; barra amortecida com reforço de metal duro **14 × BD**.
- Furação: **30 × D** sem pica-pau (Sandvik CoroDrill 861), e brocas de **30/40/50 × D** (Iscar).
- Haste maciça de metal duro: o metal duro tem módulo de elasticidade cerca de **3× o do aço** (~600 GPa contra ~210 GPa). Como a deflexão é inversamente proporcional a `E`, trocar haste de aço por metal duro maciço reduz a deflexão a aproximadamente **1/3** — e permite, para a mesma deflexão, um balanço cerca de **1,44× maior** (∛3). **Declaração de procedência:** o valor de `E` do metal duro apareceu em material de terceiro que não qualifica como fonte; a conta é identidade de mecânica de vigas. Registro isso como **LACUNA de fonte para `E`**, não como dado apurado.

**Um bloqueio duro em `L/D` = 6 impediria trabalho válido — sim, e trabalho vendido de catálogo.** A correção defensável:
- Manter `L/D` > 6 como **alerta forte com confirmação explícita** (a camada de "resultado forçado" que o produto já tem), nunca como bloqueio silencioso.
- Tornar o limiar **função do tipo de haste/adaptador** declarado: haste comum → alerta forte em 4, confirmação em 6; haste/adaptador amortecido → alerta forte em 8; barra amortecida com reforço de metal duro (mandrilamento) → alerta forte em 14.

## 3d) Deflexão em µm contra tolerância substitui o `L/D`?

**Resposta curta: não substitui — mede outra coisa. Os dois devem coexistir, e a razão é quantificável.**

**Por que `L/D` sozinho não determina deflexão.** Pela viga engastada (Euler-Bernoulli, identidade de mecânica, **não** dado de usinagem):

`δ = F·L³ / (3·E·I)` , com `I = π·D⁴/64` , logo `δ = (64·F)/(3·π·E) × (L/D)³ × (1/D)`

O termo `(L/D)³` explica por que `L/D` "quase" funciona. Mas sobra um `1/D`: **para o mesmo `L/D` e a mesma força, uma fresa de 3 mm flete 6,7× mais que uma de 20 mm.** Um limite único de `L/D` trata as duas como iguais — e elas não são. Esse é o erro estrutural de usar `L/D` como medida de erro dimensional.

**Por que a deflexão sozinha também não basta.** A frequência natural da ferramenta em balanço escala como `f_n ∝ D/L² = 1/(D·(L/D)²)` — ou seja, `L/D` entra ao **quadrado** na estabilidade dinâmica e ao **cubo** na deflexão estática. São dois expoentes diferentes: nenhuma das duas grandezas é função da outra. A afirmação da Sandvik "a partir de 4×D a vibração começa a ser um problema" é uma afirmação sobre **vibração**, não sobre deflexão — e não seria capturada por um limite de micrômetros de deflexão.

**Sensibilidade quantificada de `L/D` sobre o resultado final:** `L/D` **não altera** RPM, avanço, `Q` nem `Pc` calculados — ele só governa deflexão e estabilidade. Sobre a **deflexão**, o efeito é cúbico: `L/D` de 3 → 4 multiplica a deflexão por **2,37× (+137%)**; 3 → 5 por **4,63× (+363%)**; 3 → 6 por **8,0× (+700%)**. Classificação: **MODELAR** — é o único fator desta rodada que precisa entrar no cálculo, porque a saída (µm contra tolerância) é o número acionável.

**Recomendação:** manter os dois, com papéis separados e explicados assim ao operador:
- **Deflexão (µm)** → responde *"a peça vai sair fora de medida?"*. Comparar contra a tolerância informada.
- **`L/D`** → responde *"vai vibrar?"*. Comparar contra o limiar do tipo de haste.
Isso é tecnicamente defensável e resolve o problema de o `L/D` sozinho punir ferramenta grande e absolver ferramenta pequena.

## 3e) A regra de redução de parâmetro por faixa de `L/D` (20% / 40%) tem base?

**`NÃO ENCONTRADO`.** Nenhuma fonte de nível 1–4 publica redução percentual de `ae`/`ap` por faixa de `L/D`. O que a Sandvik publica é qualitativo: *"a vibração é frequentemente o parâmetro limitante para obter alta produção na máquina, por exemplo, baixando velocidade, avanço e profundidade de corte"* — sem número.

**O que dá para colocar no lugar, com procedência declarada.** Se o objetivo for **manter a deflexão constante** ao alongar o balanço, a redução necessária sai da própria fórmula da viga (`F ∝ 1/L³` a `D` e `δ` constantes), tomando `L/D` = 3 como referência:

| `L/D` | Fator de força admissível vs. `L/D`=3 | Redução necessária em `ae × ap` |
|---|---|---|
| 3 | 1,000 | — (referência) |
| 4 | 0,422 | **−58%** |
| 5 | 0,216 | **−78%** |
| 6 | 0,125 | **−88%** |

**Declaração obrigatória:** esta tabela é **derivada**, não apurada — é a consequência aritmética da relação `δ ∝ F·L³`, não uma recomendação publicada por fabricante. Serve para mostrar que a regra interna (**−20%** em 3–4 e **−40%** em 4–5) é **muito mais permissiva** do que manter a deflexão constante exigiria: em `L/D` = 4 ela corta 20% onde a física pediria 58%. Se a intenção da regra era proteger a peça, ela protege pouco. Se a intenção era só sinalizar, o percentual está fingindo uma precisão que não tem.

**Recomendação:** não publicar percentuais fixos por faixa. Publicar o **alvo em deflexão** (item 3d) e deixar o sistema calcular quanto reduzir para atingir o alvo — que é a única forma de dar "quanto reduzir" sem inventar número.

## 3f) Furação: `L/D > 3` exige pica-pau? Muda com refrigeração interna? Quanto?

**O limiar de 3 se confirma, mas para a variável errada, e a mudança com refrigeração interna é de fator 10.**

| Condição | Profundidade suportada | Fonte | Nível |
|---|---|---|---|
| Furação **a seco**, material de cavaco curto | até **3 × D** | Sandvik — Drilling tips | 4 |
| **Sem** refrigeração interna, acima de 3 × Dc | risco de entupimento de cavaco; refrigeração interna passa a ser "sempre preferível" | Sandvik — Drilling tips | 4 |
| **Com** refrigeração interna, broca de furo profundo dedicada | **até 30 × D sem pica-pau** | Sandvik — CoroDrill 861 | 4 |
| **Com** refrigeração interna a alta pressão, após furo-guia de 1,5–3 × D | **"nenhum ciclo pica-pau necessário"** | Guhring — RT 100 T, Technical Information Deep Hole Drilling | 4 |
| Brocas inteiriças extra-longas | **30, 40 e 50 × D** disponíveis | Iscar | 4 |

**Quanto muda:** de **3 × D** (sem canal de refrigeração) para **30 × D** (com canal e pressão adequada) — **fator 10**. `CONSENSO` (três fabricantes independentes).

**Consequência para a regra:** o aviso de pica-pau não pode depender só de `L/D`. Precisa de uma segunda variável — **a broca tem canal de refrigeração interno?** — que hoje o sistema não tem. Sem ela, o aviso dispara em 100% dos furos profundos, inclusive naqueles em que o fabricante diz explicitamente para **não** picar (picar com broca de furo profundo em furo-guia é, aliás, contraproducente: perde-se a pressão de refrigerante e o guiamento).

**LACUNA:** não encontrei em nível 1–4 uma tabela de **pressão mínima de refrigerante por diâmetro** para dispensar o pica-pau em broca comum de canal interno (o gráfico da Guhring cobre a linha RT 100 T / EB 100 / EB 80, não broca convencional). Ver "Lacunas declaradas".

## Regra correta recomendada (Questão 3)

**L1 — Deflexão contra tolerância** · Camada: **ALERTA** (ou LIMITE FÍSICO se o usuário informar tolerância e ela for violada em mais de 2×).
Variáveis: `Fr` (força radial, já calculada), `L` (balanço), `D` (diâmetro da haste), `E` (aço 210 GPa / metal duro ~600 GPa — **`E` sem fonte de nível 1–4, ver lacunas**), tolerância da peça.
Texto: *"Deflexão estimada 48 µm contra tolerância de 20 µm. **Reduza `ae` de 4,0 para 1,7 mm** (−58%) ou encurte o balanço de 60 para 44 mm."*

**L2 — `L/D` contra o limiar do tipo de haste** · Camada: **ALERTA**, com confirmação explícita acima do limiar duro.
| Tipo de haste/adaptador | Alerta | Confirmação explícita | Fonte do número |
|---|---|---|---|
| Fresa/haste comum | `L/D` > 4 | `L/D` > 6 | Sandvik: vibração a partir de 4×D; CoroMill 390 UL = 6×DC |
| Adaptador amortecido (fresamento) | `L/D` > 8 | `L/D` > 10 | Sandvik: faixa otimizada 7–8×BD, engenharia acima |
| Barra de mandrilar comum | `L/D` > 4 | `L/D` > 5 | Sandvik: barra de aço/metal duro até 4×BD |
| Barra amortecida de aço | `L/D` > 10 | `L/D` > 12 | Sandvik: até 10×BD |
| Barra amortecida com reforço de metal duro | `L/D` > 14 | `L/D` > 16 | Sandvik: até 14×BD |
Texto: *"Balanço 7,2 × D com haste comum. A partir de 4 × D a vibração começa a limitar. **Reduza o balanço para 4 × D (de 43 para 24 mm)** ou troque para adaptador amortecido, que trabalha bem até 8 × D."*

**L3 — Furação: pica-pau condicionado à refrigeração** · Camada: **ALERTA**.
- Broca **sem** canal interno e `L/D` > 3 → *"Sem refrigeração interna, acima de 3 × D o cavaco entope. **Use ciclo pica-pau com passo de 1 × D (aqui: 8 mm)** ou troque para broca com canal de refrigeração."*
- Broca **com** canal interno → **não** avisar até 30 × D; acima disso, *"Acima de 30 × D é furação profunda dedicada: exige furo-guia de 1,5–3 × D e pressão de refrigerante do catálogo da broca."*

## O que muda para o operador (Questão 3)

- **Some** o bloqueio que impede orçar e simular trabalho com barra antivibratória (mandrilamento 5–14 × D) e com adaptador amortecido (fresamento 6–10 × D) — hoje o sistema recusa a categoria inteira.
- **Some** o aviso de pica-pau em toda broca com canal de refrigeração acima de 3 × D — que é a maioria das brocas de metal duro modernas.
- **Entra** um número em micrômetros contra a tolerância, que responde à pergunta que o operador realmente tem, e um alvo de redução calculado em vez de percentual fixo.
- O `L/D` deixa de ser um veredito e vira o que ele é: um indicador de risco de vibração, com limiar que depende do que está segurando a ferramenta.

**Fontes (Questão 3)**
- Sandvik Coromant — Machining with long overhangs, Considerations: https://www.sandvik.coromant.com/en-us/knowledge/machine-tooling-solutions/tooling-considerations/long-overhangs (nível 4)
- Sandvik Coromant — Silent Tools for milling: https://www.sandvik.coromant.com/en-us/tools/tooling-systems/turning-centres-and-lathes/what-is-silent-tools/silent-tools-milling (nível 4)
- Sandvik Coromant — Silent Tools for boring / tool holding: https://www.sandvik.coromant.com/en-us/tools/tooling-systems/turning-centres-and-lathes/what-is-silent-tools/silent-tools-boring (nível 4)
- Sandvik Coromant — Drilling tips: https://www.sandvik.coromant.com/en-us/knowledge/drilling/drilling-tips (nível 4)
- Sandvik Coromant — CoroDrill 861: https://www.sandvik.coromant.com/en-gb/tools/drilling-tools/solid-carbide-drills/corodrill-861 (nível 4)
- Iscar — Achieving the Hole Solution with Deep Hole Drilling (2025) e brocas extra-longas 30/40/50 × D: https://www.iscar.com/en-hq/technical-articles/year-2025/achieving-the-hole-solution-with-deep-hole-drilling (nível 4)
- Guhring — Technical Information, Deep Hole Drilling (RT 100 T): https://guhring.com/media/documents/tech/RT100T_DrillingProcedure.pdf (nível 4)
- Harvey Performance / Helical — Tool Deflection & Its Remedies; Deep Cavity Milling (pescoço reduzido acima de 5 × D): https://www.harveyperformance.com/in-the-loupe/tool-deflection-remedies/ e https://www.harveyperformance.com/in-the-loupe/common-challenges-deep-cavity-milling/ (nível 4)

---

# QUESTÃO 4 — Referências de produtividade (taxa de remoção)

**Veredito:** As três referências (50 / 20 / 5 cm³/min) **não existem em nenhuma fonte verificável** e não podem existir: taxa de remoção não é atributo da operação, é consequência do par material × potência disponível. Comparar contra número fixo é comparar peras com maçãs — e a diferença é de **fator 38×** entre duas operações de desbaste igualmente legítimas.
**Camada:** **RUÍDO**. Não é alerta nem limite: é um indicador informativo cujo denominador está errado. Deve ser substituído, não ajustado.
**Confiança:** `NÃO ENCONTRADO` para as referências publicadas · `CONSENSO` para a fórmula que deve substituí-las.

## 4a) Existe referência publicada de taxa de remoção típica por operação?

**`NÃO ENCONTRADO`.** Busquei em Sandvik Coromant, Kennametal, Iscar, Seco, Walter, Mitsubishi, OSG, Guhring e Harvey/Helical. Nenhum publica "MRR típico de desbaste / semi-acabamento / acabamento". O que os fabricantes publicam é **a fórmula e exemplos resolvidos** — e os exemplos não convergem para valor nenhum, porque não deveriam.

| O que existe publicado | Valor | Fonte | Nível |
|---|---|---|---|
| Fórmula de fresamento: `Q = ap × ae × vf` (mm³/min ou cm³/min) | — | Iscar — Machining Calculations (2025) | 4 |
| Mesma fórmula, com `Q` em cm³ e divisor 1000: `Q = ap × ae × vf / 1000` | — | Sandvik Coromant — Metalcutting Technical Guide, seção D (Milling) | 4 |
| **Exemplo resolvido** de faceamento com fresa de encaixe HELIDO: `ap` 5 mm, `ae` 180 mm, `vf` 459 mm/min → **Q = 413,1 cm³/min** | 413,1 | Iscar — Machining Calculations (2025) | 4 |
| Advertência explícita: MRR "não pode ser considerado isolado de outros parâmetros do processo" — especificamente vida da ferramenta e consumo de potência | — | Iscar — Machining Calculations (2025) | 4 |

**De que depende `Q`, com procedência:**
- **Potência disponível e rendimento** — `Pc = (ap × ae × vf × kc)/(60 × 10⁶ × η)`. Sandvik e Mitsubishi publicam a **mesma** fórmula, com η explícito. Nível 4, `CONSENSO`.
- **Material, via `kc`** — Mitsubishi usa `kc` = 1800 MPa para aço-ferramenta a 0,2 mm/dente no exemplo resolvido (nível 4). Ordens de grandeza compiladas na literatura: aço 2500–3000 MPa, ferro fundido ~1500 MPa, alumínio ~800 MPa (ScienceDirect Topics — Specific Cutting Energy, compilação de artigos, nível 3). Só isso já significa que, na **mesma máquina**, o `Q` alcançável em alumínio é **2,25× a 3,75×** o de aço.
- **Estratégia e engajamento** — `ap` e `ae` entram como produto direto.
- **Diâmetro/ferramenta** — entra por `vf` e pelo `ae` viável.

## 4b) Um número absoluto sem contexto faz sentido como referência?

**Não, e dá para medir o quanto não faz.** Duas operações que qualquer operador chamaria de "desbaste":

| Operação de desbaste | `Q` calculado | Nota contra a referência de 50 cm³/min |
|---|---|---|
| Faceamento com fresa de encaixe, `ap` 5 / `ae` 180 / `vf` 459 (exemplo publicado pela Iscar) | **413,1 cm³/min** | **826%** |
| Trocoidal com fresa inteiriça de 6 mm, `ap` 12 / `ae` 0,6 / `vf` 1500 | **10,8 cm³/min** | **22%** |

**Fator 38× entre as duas.** O mesmo rótulo "desbaste" cobre duas ordens de grandeza, e o indicador entrega "826%" para uma e "22%" para a outra sem que nenhuma das duas esteja errada. Um medidor que dá nota 8 para o trabalho normal de uma fresa grande e nota 0,2 para o trabalho normal de uma fresa pequena não mede produtividade — mede diâmetro de ferramenta.

**Sensibilidade quantificada da referência fixa:**
- Sobre o **resultado calculado** (RPM, avanço, `Pc`, `Q`): **0,0%** — a referência não entra em nenhuma conta, só na cor do indicador.
- Sobre o **indicador mostrado ao operador**: até **3.725%** de variação (fator 38×) entre duas operações legítimas da mesma categoria.
- Classificação: **IGNORAR** — a referência fixa deve ser removida do produto, não recalibrada. Não existe valor único que a conserte.

## 4c) A alternativa: comparar contra a potência disponível

**Confirmada, e a fórmula do enunciado está correta.** Derivação a partir das duas fórmulas oficiais de fabricante (Sandvik e Mitsubishi publicam ambas, idênticas):

```
Pc = (ap × ae × vf × kc) / (60 × 10⁶ × η)     [kW]      (Sandvik, Mitsubishi — nível 4)
Q  = (ap × ae × vf) / 1000                    [cm³/min] (Sandvik, Iscar — nível 4)

logo  ap × ae × vf = 1000 × Q
      Pc = 1000 × Q × kc / (60 × 10⁶ × η) = Q × kc / (60000 × η)

⇒  Q_max = (Pm × η × 60000) / kc              [cm³/min]
```

**A fórmula do enunciado se confirma exatamente**, com `Pm` em kW, `kc` em N/mm² (MPa) e `Q_max` em cm³/min. `CONSENSO` (dois fabricantes independentes publicam as duas fórmulas de origem).

Exemplo com o perfil de máquina padrão do produto (15 kW, η 0,85) usinando aço-ferramenta com o `kc` = 1800 MPa do exemplo Mitsubishi:
`Q_max = 15 × 0,85 × 60000 / 1800 = **425 cm³/min**`

Isto é: a **mesma máquina** que suporta 425 cm³/min em aço-ferramenta é hoje avaliada contra uma referência fixa de 50. E em alumínio (`kc` ~800) a mesma máquina chega a **956 cm³/min**.

**Um alerta de procedência que o produto precisa resolver antes de usar a fórmula.** As três fontes divergem no rótulo da potência:
- Sandvik rotula `Pc` como **"Net power (kW)"** mas põe η **no denominador** — o que matematicamente entrega potência **no motor**, não líquida.
- Mitsubishi chama a mesma expressão de "potência de corte real", com "coeficiente de máquina 80%".
- Kennametal é o único que separa explicitamente **`Ps` (na ferramenta)** de **`Pm` (no motor)**, e lista `E` = eficiência de máquina **0,6–0,9 conforme o tipo de acionamento**.

Para o produto: comparar sempre contra a **potência nominal do fuso** usando a versão com η no denominador (a que resulta em `Q_max` acima), e rotular na interface qual das duas está sendo mostrada. Rótulo ambíguo aqui vira erro de fator 1/η — **até 67% de diferença** entre os extremos 0,6 e 0,9.

**Sensibilidade quantificada dos dois parâmetros novos:**
- **`kc`** — entra linearmente e invertido em `Q_max`. Errar `kc` em 20% erra `Q_max` em **20%**. Classificação: **MODELAR** (já é dado que o sistema tem por material; vem de R1/R2, não desta rodada).
- **`η`** — usar 0,85 em vez de 0,80 muda `Q_max` em **+6,25%**; a faixa completa publicada pela Kennametal (0,6–0,9) abre **50%**. Dentro da margem declarada do modelo (±15–25%) para a escolha entre 0,80 e 0,85. Classificação: **DEFAULT** — fixar 0,85 (o valor que o perfil de máquina do produto já usa), com opção de edição no perfil de máquina, e **não** perguntar ao operador.

## 4d) Qual aproveitamento de potência é considerado bom?

**`NÃO ENCONTRADO` em fonte de nível 1–4.** O alvo "70–85% da potência nominal em desbaste" aparece em revista técnica, blog de fornecedor de software e fórum — todos descartados pela regra de território desta rodada. Não uso.

O que **existe** com procedência e permite construir um teto defensável:

| Achado | Valor | Fonte | Nível |
|---|---|---|---|
| Fator de desgaste de ferramenta `Cw` aplicado ao cálculo de potência | **1,1–1,3** conforme profundidade e avanço | Kennametal — End Milling Force, Torque and Power Calculator | 4 |
| Eficiência de máquina `E` | **0,6–0,9** conforme tipo de acionamento | Kennametal — mesmo calculador | 4 |
| Coeficiente de máquina no exemplo resolvido | **80%** | Mitsubishi — Formulae for Cutting Power | 4 |
| Fator de usinabilidade `Cm` | **1,0–2,3** conforme material | Kennametal — mesmo calculador | 4 |
| Ressalva do próprio fabricante | "Estes cálculos são baseados em valores teóricos e destinam-se apenas a planejamento." | Kennametal — mesmo calculador | 4 |

**Teto derivado (declarado como derivação, não como dado):** se a ferramenta gasta consome até **1,3×** a potência da ferramenta nova (fator `Cw` da Kennametal), planejar acima de **1/1,3 = 77%** da potência nominal significa que o programa **estoura o fuso antes do fim da vida da ferramenta**. Isso dá um teto de planejamento de ~**77%**, que por coincidência cai dentro da faixa citada informalmente pela imprensa técnica — mas **a coincidência não é fonte**, e registro os 77% como consequência aritmética do `Cw`, não como recomendação publicada.

**Recomendação:** mostrar o aproveitamento como número cru (`Pc / Pm`), marcar a faixa acima de 77% como "sem folga para desgaste da ferramenta" com essa justificativa escrita, e **não** pintar nenhuma faixa de verde como "bom" — porque não há fonte para isso.

## 4e) Existe indicador de produtividade melhor?

Três candidatos, avaliados:

**1. Taxa de remoção específica (`Q/Pc`, cm³/min por kW) — SIM, e é melhor do que parece.**
Da derivação em 4c: `Q/Pc = 60000 × η / kc`. Como `kc = kc1 × hm^(−mc)` (fórmula publicada por Sandvik, nível 4), segue que **`Q/Pc ∝ hm^(mc)`**: quanto mais grosso o cavaco, mais centímetros cúbicos por kW. Triplicar `hm` multiplica o indicador por `3^mc` — com `mc` = 0,25 isso é **+32%** de material por kW **sem tocar na potência**.
Isso torna o indicador acionável e — o detalhe que importa — **ele aponta exatamente para a mesma correção que o alerta de espessura mínima de cavaco da Questão 1**. Os dois passam a contar a mesma história ao operador em vez de duas.
*Procedência:* a relação é derivada de fórmulas de nível 4. Os valores de `kc1` e `mc` por material **não foram apurados nesta rodada** (pertencem a R1/R2); o `mc` = 0,25 acima é ilustrativo do cálculo, não um dado desta apuração.

**2. Tempo de corte por peça — SIM, e é o único com fórmula oficial publicada.**
`Tc = lm / vf` [min], onde `lm` é o comprimento usinado. Publicada na folha de fórmulas oficial da Sandvik (nível 4). É a grandeza que a oficina realmente compra. Vale como indicador; não vale como alerta, porque não tem limiar.

**3. Custo por volume removido — `NÃO ENCONTRADO`.** Não localizei fonte de nível 1–4 com metodologia ou valores de referência. Exigiria custo de ferramenta, custo-hora de máquina e vida da ferramenta — nenhum deles é dado técnico publicável, e todos os três são específicos da oficina. Não recomendo colocar no produto sem que o usuário informe os três.

## Regra correta recomendada (Questão 4)

**P1 — Aproveitamento de potência (substitui as três referências fixas)** · Camada: **informativo**, escala para **ALERTA** só no teto.
Variáveis: `Pc` calculado, `Pm` do perfil de máquina, `η`, `kc` do material.
Mostrar: `Q` atual em cm³/min · `Q_max = Pm × η × 60000 / kc` · aproveitamento `Pc/Pm` em %.
Texto com alvo numérico: *"Você está usando 22% da potência (3,3 de 15 kW). Neste material a máquina permite até **425 cm³/min**; você está em 94. **Suba `ap` de 12 para 20 mm** → 157 cm³/min (37% da potência)."*

**P2 — Teto de planejamento** · Camada: **ALERTA**.
Disparo: `Pc/Pm > 0,77`.
Texto: *"87% da potência nominal com ferramenta nova. Uma ferramenta no fim da vida consome até 30% mais e vai travar o fuso. **Reduza `ae` de 4,0 para 3,3 mm** para ficar em 72%."*
Procedência: derivado do fator `Cw` = 1,1–1,3 da Kennametal (nível 4). **Declarar na interface que é margem de desgaste, não limite de catálogo.**

**P3 — Potência acima da máquina** · Camada: **LIMITE FÍSICO** (já existe no sistema, mantém).

## O que muda para o operador (Questão 4)

- **Some** um medidor que dava 826% para um faceamento normal e 22% para um trocoidal normal — ou seja, que estava errado nos dois casos e não era acionável em nenhum.
- **Entra** um número que responde à pergunta real da oficina: *"dá para apertar mais nesta máquina?"* — com o teto calculado para o material que está na mesa e o parâmetro exato a mexer.
- O indicador de cm³/kW passa a empurrar na mesma direção do alerta de espessura de cavaco da Questão 1: engrossar o cavaco melhora os dois ao mesmo tempo.

**Fontes (Questão 4)**
- Iscar — Machining Calculations (artigo técnico, 2025): https://www.iscar.com/en-hq/technical-articles/year-2025/machining-calculations (nível 4)
- Sandvik Coromant — Metalcutting Technical Guide, seção D (Milling), fórmulas `Q`, `Pc`, `kc`, `hm`, `Tc`: https://dcngli4g50fhp.cloudfront.net/userfiles/ad/sandvik/documents/sandvik_5747275_catalog.pdf (nível 4)
- Mitsubishi Materials — Formulae for Cutting Power (milling), com exemplo resolvido `kc` = 1800 MPa e coeficiente de máquina 80%: https://www.mitsubishicarbide.net/contents/mhg/enuk/html/product/technical_information/information/formula4.html (nível 4)
- Kennametal — End Milling Force, Torque and Power Calculator (`Cm` 1,0–2,3 · `Cw` 1,1–1,3 · `E` 0,6–0,9 · saídas `Ps` e `Pm` separadas): https://www.kennametal.com/us/en/resources/engineering-calculators/end-milling/force-torque-and-power.html (nível 4)
- ScienceDirect Topics — Specific Cutting Energy (compilação de artigos revisados; ordens de grandeza de `kc` por material): https://www.sciencedirect.com/topics/engineering/specific-cutting-energy (nível 3)

---

# TABELA A — Regras de alerta recomendadas

| # | Regra | Condição de disparo | Camada | Mensagem com alvo numérico | Fonte (nível) |
|---|---|---|---|---|---|
| R1 | Piso de espessura de cavaco | `hex < 0,3 × rβ` (com `rβ` default 10 µm → `hex` < 0,003 mm) | ALERTA | "Espessura de cavaco 0,0021 mm, abaixo do piso de 0,003 mm — o gume esfrega em vez de cortar. **Suba `fz` de 0,040 para 0,058 mm/dente** (+45%) ou `ae` de 0,6 para 1,2 mm." | Sandvik *Entering angle and chip thickness* (4) + Iscar RCTF (4) + `hmin/rβ` 0,2–0,4 (3) |
| R2 | Rasgo cheio | `ae ≥ 0,95 × D` | ALERTA | "Rasgo cheio: concordante e discordante ao mesmo tempo, sem saída para o calor, risco de recorte de cavaco. **Reduza `ap` para 70% do comprimento de aresta** (de 20 para 14 mm) e garanta ar comprimido." | Sandvik *Groove or slot milling* (4) |
| R3 | Geometria radial | `ae > D` | **LIMITE FÍSICO** | "`ae` não pode passar do diâmetro da fresa." | geometria |
| V1 | Rotação acima da máquina | `n_exigido > n_max` do perfil | **LIMITE FÍSICO** | "`Vc` 900 m/min com fresa de 8 mm exige 35.810 rpm; a máquina vai a 12.000. **Reduza `Vc` para no máximo 301 m/min** ou use fresa de 24 mm." | perfil de máquina |
| V2 | `Vc` fora da faixa do material × substrato | `Vc < 0,6 × Vc_min` ou `Vc > 1,4 × Vc_max` da tabela | ALERTA | "`Vc` 45 m/min está 62% abaixo da faixa do inox 304 com metal duro (120–200). Nessa região o cavaco adere ao gume. **Suba para pelo menos 120 m/min.**" | OSG catálogo HSS-Co (4) · Sandvik *milling different materials* (4) · BUE em 60 m/min, DOI 10.3390/ma10111230 (3). **Fatores 0,6/1,4 sem fonte — escolha de projeto** |
| V3 | Sanidade de entrada | `Vc < 0,1 × Vc_min` ou `> 10 × Vc_max` | ALERTA de entrada | "`Vc` 5 m/min para alumínio (faixa 300–1000) — confira se digitou `Vc` no lugar de `fz`." | validação, sem fonte técnica |
| L1 | Deflexão contra tolerância | `δ > tolerância` | ALERTA (LIMITE FÍSICO se `δ > 2 ×` tolerância) | "Deflexão estimada 48 µm contra tolerância de 20 µm. **Reduza `ae` de 4,0 para 1,7 mm** (−58%) ou encurte o balanço de 60 para 44 mm." | Euler-Bernoulli (identidade) + `Fr` do modelo. **`E` do metal duro sem fonte de nível 1–4** |
| L2 | `L/D` contra o limiar da haste | comum > 4 · amortecido > 8 · barra comum > 4 · barra amortecida > 10 · barra amortecida c/ reforço > 14 | ALERTA (confirmação explícita 2 pontos acima) | "Balanço 7,2 × D com haste comum. A partir de 4 × D a vibração começa a limitar. **Reduza para 4 × D (de 43 para 24 mm)** ou troque para adaptador amortecido, que trabalha bem até 8 × D." | Sandvik *Long overhangs* e *Silent Tools* milling/boring (4) |
| L3 | Furação: pica-pau condicionado à refrigeração | broca **sem** canal interno e `L/D > 3` | ALERTA | "Sem refrigeração interna, acima de 3 × D o cavaco entope. **Use pica-pau com passo de 1 × D (8 mm)** ou troque para broca com canal de refrigeração." | Sandvik *Drilling tips* (4) · Guhring RT100T (4) · Iscar (4) |
| L4 | Furação profunda dedicada | broca **com** canal interno e `L/D > 30` | ALERTA | "Acima de 30 × D é furação profunda dedicada: exige furo-guia de 1,5–3 × D e a pressão de refrigerante do catálogo da broca." | Sandvik CoroDrill 861 (4) · Guhring RT100T (4) |
| P1 | Aproveitamento de potência (substitui as referências fixas de MRR) | sempre visível | informativo | "22% da potência (3,3 de 15 kW). Neste material a máquina permite até **425 cm³/min**; você está em 94. **Suba `ap` de 12 para 20 mm** → 157 cm³/min." | Sandvik + Mitsubishi, fórmulas `Q` e `Pc` (4) |
| P2 | Teto de planejamento por desgaste | `Pc/Pm > 0,77` | ALERTA | "87% da potência com ferramenta nova; no fim da vida ela consome até 30% mais e trava o fuso. **Reduza `ae` de 4,0 para 3,3 mm** para ficar em 72%." | derivado do `Cw` 1,1–1,3 da Kennametal (4) |
| P3 | Potência acima da máquina | `Pc > Pm` | **LIMITE FÍSICO** | "Potência exigida 18,2 kW contra 15 kW disponíveis. **Reduza `ap` de 12 para 9,5 mm.**" | perfil de máquina |

**Regras removidas:** `ae/D < 10%` (RUÍDO, Questão 1) · janela global `Vc` 50–1000 m/min (RUÍDO, Questão 2) · bloqueio duro `L/D > 6` em fresamento e `> 5` em mandrilamento (vira confirmação explícita condicionada ao tipo de haste, Questão 3) · referências fixas de MRR 50/20/5 cm³/min (RUÍDO, Questão 4).

---

# TABELA B — O que continua sem base

| # | Item | O que faltou | O que seria preciso para fechar |
|---|---|---|---|
| B1 | Raio de aresta `rβ` por faixa de diâmetro | Nenhum catálogo publica `rβ` por ferramenta; só achei faixas experimentais (4–15 µm, 5–20 µm) em artigo revisado | Especificação interna de preparação de gume de Sandvik/Kennametal/Guhring, ou medição própria em microscópio de 5–6 fresas de diâmetros diferentes |
| B2 | Limiar de batimento (runout) contra `hex` | Mecanismo bem descrito, mas o número ("alertar quando runout > X% de `hex`") só aparece em blog e distribuidor | Artigo revisado sobre carga por aresta com runout em baixa imersão radial, ou guia de aplicação de fabricante sobre montagem |
| B3 | Estabilidade (chatter) em baixa imersão radial | Não confirmei com fonte primária dentro do prazo | Artigo de lóbulos de estabilidade com duplicação de período em baixa imersão (literatura de Altintas / Insperger) |
| B4 | Redução percentual de avanço em rasgo cheio (`ae = D`) | O valor "35–40%" só apareceu em blog/distribuidor | Guia de aplicação de fresamento de rasgo de fabricante, com tabela de correção |
| B5 | Temperatura da zona de corte associada ao BUE | Os valores "pico 300–350 °C, some acima de 500 °C" apareceram só em resumo de busca; os dois artigos que abri não os trazem | Artigo revisado com termografia in situ da formação de BUE, por família de material |
| B6 | Limiar numérico de `Vc` anti-BUE, generalizável | Dois números sourced (Sandvik 150–250 m/min em inox; 60 m/min em AISI 304) que não convergem — são materiais e processos diferentes | Tabela de `Vc` mínima anti-BUE por família de material, em handbook (ASM Vol. 16) ou guia de fabricante |
| B7 | Fatores 0,6 / 1,4 da regra V2 | Escolha de projeto para envelopar a margem ±15–25% do modelo; nenhuma fonte publica tolerância de alerta sobre faixa tabelada | Não fechável por pesquisa — é decisão de produto. Deve ficar declarada como tal na documentação |
| B8 | Comportamento de alerta das calculadoras de referência (G-Wizard, HSMAdvisor, FSWizard) | São produtos concorrentes, não fonte técnica; a documentação do HSMAdvisor descreve realce por cor e aviso de torque, mas isso é observação de mercado | Não fechável dentro da regra de território desta rodada. Se o produto quiser benchmarking, é tarefa separada e explicitamente rotulada como tal |
| B9 | Limite de `L/D` por tipo de fresa (topo, toroidal, esférica) e por estratégia | Nenhuma fonte publica limite por geometria de ponta; a justificativa interna ("`L/D` > 6 só em HSM/toroidal") não tem respaldo | Guia de aplicação de fresamento de cavidade profunda com tabela de balanço por tipo de fresa |
| B10 | Módulo de elasticidade `E` do metal duro | O valor ~600 GPa apareceu só em fonte que não qualifica | Norma ou ficha técnica de fabricante de metal duro (ISO 513 classifica, mas não publica `E`); ASM Handbook Vol. 2 ou datasheet de substrato |
| B11 | Redução percentual de parâmetro por faixa de `L/D` (a regra interna de −20% / −40%) | Nenhuma fonte publica nesse formato; a tabela que entreguei (−58% / −78% / −88%) é **derivada** de `δ ∝ F·L³`, não apurada | Não fechável — a alternativa correta é calcular a redução para atingir um alvo de deflexão, não tabelar percentual |
| B12 | Pressão mínima de refrigerante para dispensar pica-pau em broca comum de canal interno | O gráfico da Guhring cobre as linhas RT 100 T / EB 100 / EB 80, não broca convencional | Catálogo de broca de metal duro com canal interno que publique pressão × diâmetro para furação sem pica-pau |
| B13 | Aproveitamento de potência de fuso considerado bom em produção | "70–85%" só em revista técnica, blog de fornecedor e fórum | Norma de aceitação de máquina-ferramenta, ou guia de fabricante de máquina com recomendação de carga contínua de fuso |
| B14 | Custo por volume removido | Nenhuma metodologia ou valor de referência em nível 1–4 | Machinery's Handbook (seção de economia de usinagem) ou norma de custeio; e, mesmo assim, os três insumos são específicos da oficina |
| B15 | `kc1` e `mc` por material | Fora do escopo desta rodada (pertencem a R1/R2); usei `kc` = 1800 MPa do exemplo Mitsubishi e ordens de grandeza compiladas | R1/R2 |

---

# Lacunas declaradas

Quinze lacunas, distribuídas assim pelas quatro questões:

**Questão 1 (engajamento radial)** — B1 (raio de aresta por diâmetro), B2 (limiar de runout), B3 (estabilidade em baixa imersão), B4 (redução de avanço em rasgo cheio).
A Questão 1 fica **respondida** mesmo assim: o veredito (a regra atual é ruído) e a regra substituta (piso de `hex`) têm base de nível 3 e 4. As lacunas afetam o **refinamento** do limiar, não a decisão de trocar a regra.

**Questão 2 (janela de `Vc`)** — B5 (temperatura de BUE), B6 (limiar `Vc` anti-BUE generalizável), B7 (fatores 0,6/1,4), B8 (benchmarking das calculadoras).
A Questão 2 fica **respondida**: a demolição da janela global tem prova documental direta (a tabela HSS-Co da OSG, inteira abaixo de 150 m/min, com cinco de seis grupos abaixo de 50). A lacuna é sobre **quão apertada** deve ser a nova tolerância relativa — não sobre se a janela global cai.

**Questão 3 (`L/D`)** — B9 (limite por tipo de fresa e estratégia), B10 (`E` do metal duro), B11 (redução por faixa de `L/D`), B12 (pressão de refrigerante).
A Questão 3 fica **respondida** nos bloqueios: os números de balanço máximo por tipo de haste (4 / 7–8 / 10 / 14 × D) são todos de fabricante. A lacuna maior é B10, porque `E` entra direto no cálculo de deflexão que a Questão 3d recomenda adotar — **sem `E` com fonte, o número em micrômetros não pode ser publicado como calculado**, só como estimativa declarada.

**Questão 4 (produtividade)** — B13 (aproveitamento típico de potência), B14 (custo por volume), B15 (`kc1`/`mc`).
A Questão 4 fica **respondida**: a fórmula substituta `Q_max = Pm × η × 60000 / kc` é derivação direta de duas fórmulas publicadas por dois fabricantes independentes. A lacuna B13 impede pintar uma faixa de "bom" no indicador — e por isso a recomendação é **não pintar**, mostrar o número cru e justificar o teto de 77% pelo fator de desgaste, que tem fonte.

**Três lacunas não são fecháveis por pesquisa e devem ser registradas como decisão de produto, não como dívida técnica:** B7 (tolerância de alerta), B8 (benchmarking de concorrente) e B11 (formato da regra de redução por `L/D`).

**Nenhum número deste documento foi preenchido por conhecimento próprio.** Onde não havia fonte, há LACUNA.
