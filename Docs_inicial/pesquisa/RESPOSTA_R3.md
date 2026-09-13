# RESPOSTA R3 — Ferramentas e Substratos

> Nota de pesquisa (não relatório polido). Território de fonte: **normas e literatura técnica**
> (ISO/DIN/ANSI/ABNT, handbooks de engenharia, livros-texto, artigos revisados por pares,
> teses/dissertações, institutos técnicos). **Catálogo, site, folheto e manual de fabricante
> de ferramenta estão FORA do meu escopo** — onde o número só existir lá, declaro LACUNA.
>
> Rótulos: `CONSENSO` (3+ fontes de fato independentes) · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` · `NÃO ENCONTRADO`
>
> Iniciado em 2026-08-18 — gravação incremental, bloco a bloco.

---

## 0. Base normativa levantada antes de qualquer número (ISO 513:2012)

Extraí o texto do preview oficial da norma (iTeh/ISO). Isso é a espinha dorsal de várias
respostas abaixo, então vai primeiro.

**ISO 513:2012 — Classification and application of hard cutting materials for metal removal
with defined cutting edges — Designation of the main groups and groups of application**
(4ª edição, 2012-11-01). Preview: https://cdn.standards.iteh.ai/samples/59932/d271ad516f744c8ca6782f6b4772bf87/ISO-513-2012.pdf

**Ponto que muda o desenho do produto — está na Introdução da própria norma:**

> A variedade de maneiras pelas quais diferentes fabricantes produzem materiais de corte com
> características distintas torna impossível padronizar os materiais de corte segundo essas
> características. A norma limita-se, portanto, a uma classificação **por aplicação**.
> (parafraseado da Introdução, ISO 513:2012)

Ou seja: **a própria ISO declara que não existe padronização de composição de metal duro
entre fabricantes.** A norma classifica por *onde se usa*, não por *do que é feito*. Isso
tem duas consequências opostas para a premissa da Questão 2 e ambas precisam ser ditas:
1. Contra a premissa: a norma reconhece que a composição varia entre fabricantes.
2. A favor da premissa: como a variação não é padronizável nem declarável, **nenhum sistema
   pode pedir ao operador o grau de substrato** — não há vocabulário comum para isso.

**Tabela 1 da ISO 513 — identificação do material de corte (carbonetos):**

| Sigla | Material |
|---|---|
| HW | Metal duro sem revestimento, conteúdo principal WC, **tamanho de grão ≥ 1 µm** |
| HF | Metal duro sem revestimento, conteúdo principal WC, **tamanho de grão < 1 µm** |
| HT | Metal duro sem revestimento, conteúdo principal TiC e/ou TiN (também chamados *cermets*) |
| HC | Os metais duros acima, porém **revestidos** |

**Tabela 2 — cerâmicas:** CA (Al2O3), CR (Al2O3 reforçada), CM (cerâmica mista Al2O3 + não-óxidos),
CN (nitreto de silício Si3N4), CC (as acima, revestidas).
**Tabela 3 — diamante:** DM (monocristalino), DD (policristalino sem ligante), DP (policristalino com ligante = PCD).
**Tabela 4 — nitreto de boro:** BL (CBN baixo teor), BH (CBN alto teor), BC (as acima, revestidas).
Exemplos de designação da própria norma: `HW – P10`, `HC – K20`, `CA – K10`.

**Tabela 5 — grupos principais de aplicação (o que o operador consegue ler na embalagem):**

| Letra | Cor | Material a usinar | Subgrupos |
|---|---|---|---|
| P | azul | Aço: todos os aços e aços fundidos, exceto inox austenítico | P01…P50 (passo 05) |
| M | amarelo | Inox: austenítico e austenítico/ferrítico, forjado e fundido | M01…M40 |
| K | vermelho | Ferro fundido: cinzento, nodular, maleável | K01…K40 |
| N | verde | Não-ferrosos: alumínio e outros não-ferrosos, materiais não-metálicos | N01…N30 |
| S | marrom | Superligas e titânio: ligas resistentes ao calor à base de Fe, Ni, Co; Ti e ligas de Ti | S01…S30 |
| H | cinza | Materiais duros: aço endurecido, ferro fundido endurecido, ferro coquilhado | H01…H30 |

Regra do índice numérico, textual na norma: índice **crescente** = crescimento de avanço e de
**tenacidade**; índice **decrescente** = crescimento de velocidade e de **resistência ao desgaste**.
Isto é qualitativo — **a norma não publica valor de Vc por subgrupo.** Quem publica Vc por
grau é o fabricante, e fabricante está fora do meu território.

**Confiança:** `CONSENSO` para o conteúdo normativo (é a norma primária, texto verificado no preview oficial).

---

_(apuração em andamento — próximos blocos abaixo)_

## Caderno de apuração — Bloco 1: propriedades de material de ferramenta (base para Q1d e Q2c)

**Fonte primária localizada (acadêmica, brasileira):**
SILVEIRA, Michele Lisboa. *Furação de material sanduíche empregando brocas com geometrias
diferentes*. Dissertação (Mestrado em Engenharia de Produção) — UFMG, Belo Horizonte, 2017,
p. 30, TAB 2.2, atribuída a **ABRÃO, A. M. (1995)**.
https://repositorio.ufmg.br/server/api/core/bitstreams/246ee61d-fda4-4977-91d0-dc54303bdd69/content

| Propriedade | HSS | Metal duro | Al2O3 branca | Al2O3 mista | Al2O3+SiC | Sialon | PCBN | PCD |
|---|---|---|---|---|---|---|---|---|
| Dureza 25 °C (HV) | 850 | **1600** | 1700 | 1900 | 2000 | 1600 | 4000 | 8000–10000 |
| Dureza 1000 °C (HV) | — | 400 | 650 | 800 | 900 | 900 | 1800 | — |
| Condutividade térmica (W/m·°C) | 37 | 85 | 8–10 | 12–18 | 32 | 23 | 100 | 560 |
| **Módulo de Young (GPa)** | **250** | **580** | 380 | 420 | 390 | 300 | 680 | 841 |
| Coef. expansão térmica (×10⁻⁶/°C) | 12 | 5,5 | 8,5 | 8 | 6,4 | 3,2 | 4,9 | 3,8 |

O metal duro da tabela é identificado no texto como **WC classe M20**.
→ **E = 580 GPa** é o primeiro valor firme para a Questão 2c. (Ver bloco de Q2c para o
cruzamento com Doi et al. e Roebuck & Almond.)

**Segunda fonte acadêmica brasileira (qualitativa, mas direta ao ponto da Q1):**
BATALHA, G. F.; MARCICANO, J. P. P. *Processos de Fabricação por Remoção de Material* —
PMR-2202, Escola Politécnica da USP, Depto. de Eng. Mecatrônica, Lab. de Eng. de Fabricação,
p. 14. http://sites.poli.usp.br/pmr/lefa/download/PMR2202-Eng%20Fabrica%C3%A7%C3%A3o%20Usinagem%20GFB%20JPM.pdf

Sobre aço rápido, textual: são utilizadas **principalmente na fabricação de ferramentas de
formato complexo tais como brocas, machos, alargadores, cortadores de engrenagens e de
forma**; a limitação está na velocidade de corte, relativamente menor que a permitida ao
metal duro. — Isto é exatamente a hipótese da Questão 1 dita por fonte acadêmica: o HSS
sobrevive na ferramenta de forma complexa (broca, macho, alargador), não na fresa.

---

## Caderno de apuração — Bloco 2: dois achados que já decidem parte da Q2d

**(i) Revestimento pode ser NEGATIVO em alumínio — evidência experimental direta.**

BAYRAKTAR, Ş. et al. *A Performance Comparison Study of Uncoated and TiAlN Coated Carbide
End Mill on Machining of the Al-35Zn Alloy*. **IOP Conference Series: Materials Science and
Engineering**, v. 295, 012013, 2018. (open access)
PDF: https://avesis.gazi.edu.tr/yayin/545613fb-f4e6-496a-81cf-2a14a84166a1/a-performance-comparison-study-of-uncoated-and-tialn-coated-carbide-end-mill-on-machining-of-the-al-35zn-alloy/document.pdf

Resultado textual: a fresa de metal duro **sem revestimento** apresentou **força de corte e
rugosidade MENORES** que a fresa revestida com TiAlN, em Vc, f e ap constantes; a revestida
favoreceu aresta postiça de corte (APC).
→ Sinal do efeito em liga de alumínio-zinco: **negativo**, não +25%.

**(ii) Revestimento engorda o raio de aresta — o que quebra a microfresa.**

LIANG, Z.; GAO, P.; WANG, X.; LI, S.; ZHOU, T.; XIANG, J. *Cutting Performance of Different
Coated Micro End Mills in Machining of Ti-6Al-4V*. **Micromachines**, v. 9, n. 11, 568, 2018.
DOI: 10.3390/mi9110568 (open access)

| Ferramenta ⌀0,5 mm, 2 cortes, substrato UF09 (**grão 0,5 µm, 9 % Co**) | Raio de aresta medido |
|---|---|
| Sem revestimento | **0,41 µm** |
| AlCrN (≈38 GPa) | 0,90 µm |
| AlTiN (≈35 GPa) | 1,2 µm |
| TiN (≈30 GPa) | 1,5 µm |

Espessura de revestimento ≈ 1 µm. Parâmetros: Vc 20 m/min, fz 2 µm/dente, ap 50 µm, a seco.
Resultado: AlTiN maximizou vida e menor rugosidade; **sem revestimento e TiN sofreram
"arado" (ploughing) severo**.

→ Consequência quantificada, direta para a Questão 2b-2: o revestimento multiplica o raio de
aresta por **2,2× a 3,7×**. Como a espessura mínima de cavaco h_min é fração do raio de
aresta (ver bloco de micro-fresamento), revestir uma microfresa **multiplica o fz mínimo
utilizável na mesma proporção**. Isso é um efeito de centenas de por cento — muito acima da
margem de ±15–25 % do modelo.
---

## Caderno de apuração — Bloco 3: substrato de fresa em literatura acadêmica (base da Q2a)

**Fonte que compara substratos de fresas comerciais entre si (a mais próxima do que a Q2a pede):**
SHAH, Ronit Kumar; GHOSH, Amitava. *The influence of substrate microstructure and radial rake
angle on the performance of TiAlN coated end mills in slot milling of SS304*.
**Manufacturing Letters**, ago. 2025. DOI: **10.1016/j.mfglet.2025.06.078**

Consegui só o nível de resumo/indexação (texto integral atrás de paywall Elsevier — 403).
O que está acessível e é numérico:
- A fresa com **menor tamanho médio de grão (0,424 µm)** e **8,4 % Co em massa**, com
  distribuição de grão unimodal assimétrica à direita, teve a **maior dureza** e o
  **menor desgaste de flanco**.
- Conclusão dos autores: dureza do substrato governa a largura do desgaste de flanco;
  tenacidade à fratura governa a resistência ao lascamento da aresta; distribuição bimodal
  de grão + teor adequado de Co equilibra os dois.
→ **Isto é evidência de que substrato de fresa NÃO é indiferente entre fabricantes.** Mas o
efeito medido é sobre **desgaste/vida**, não sobre Vc ou fz admissíveis diretamente.
**Confiança: `REFERÊNCIA ÚNICA`** — e sem o percentual de dispersão, porque o texto integral
não é acessível no meu território sem assinatura.

**Faixas de composição de metal duro para ferramenta, em literatura (não catálogo):**
- ISO 513:2012 separa apenas **HW (grão ≥ 1 µm)** de **HF (grão < 1 µm)** — a única
  granularidade de substrato que a norma reconhece.
- Microfresa caracterizada em artigo revisado por pares: **UF09 — grão 0,5 µm, 9 % Co**
  (Liang et al., 2018, DOI 10.3390/mi9110568).
- Fresa de metal duro em ensaio de fresamento de SS304: **grão 0,424 µm, 8,4 % Co**
  (Shah & Ghosh, 2025).
→ Duas caracterizações acadêmicas independentes de fresa inteiriça caem em
**8,4–9 % Co e 0,42–0,5 µm de grão**. Dispersão entre esses dois pontos: **~7 % no teor de Co**
e **~19 % no tamanho de grão**. Amostra de 2 — insuficiente para `CONSENSO`.

---

## Caderno de apuração — Bloco 4: ângulo de hélice (entra na Tabela B da Q3)

BAOWAN, P.; SAIKAEW, C.; WISITSORAAT, A. *Influence of helix angle on tool performances of
TiAlN- and DLC-coated carbide end mills for dry side milling of stainless steel*.
**The International Journal of Advanced Manufacturing Technology**, 2016/2017.
DOI: **10.1007/s00170-016-9601-5**

Resultados relevantes (fresamento lateral a seco de inox 304L, hélices comparadas até 60°):
- Aumentar o ângulo de hélice aumenta o **número de pontos de contato** e o **comprimento
  efetivo de corte** → **menos desgaste** e cavaco mais fino, porém **temperatura da peça maior**.
- Hélice 60° com DLC: menor rugosidade (Ra 0,26 µm) mas só 20 m de comprimento usinado.
- Hélice 60° com TiAlN: **>50 m** de comprimento usinado com acabamento comparável.
→ O ângulo de hélice muda **vida e acabamento**, e o efeito é grande (mais que 2× em
comprimento usinado), mas **está acoplado ao revestimento** — não é um fator separável.
---

## Caderno de apuração — Bloco 5: dispersão REAL de dureza do metal duro (instituto nacional de metrologia)

Este é o dado mais forte que encontrei para a Questão 2a, e vem de fora da indústria de
ferramenta: um exercício interlaboratorial de **seis organizações** coordenado pela British
Hardmetal Research Association e publicado pelo **National Physical Laboratory (NPL, Reino
Unido)**.

ROEBUCK, B. (NPL). *WC/Co Hardmetals — Rockwell–Vickers Hardness Comparison*.
NPL Report **DEPC(MN)011**, dezembro de 2004.
https://eprintspublications.npl.co.uk/3123/1/depc_mn11.pdf

Cinco metais duros fabricados propositalmente para cobrir a faixa de dureza convencional:

| Código | Co (% massa) | Tamanho de grão WC | **HV30 médio** | HRA médio |
|---|---|---|---|---|
| 6A/1 | 6 | Fine | **1574** | 91,8 |
| 11MG/1 | 11 | Ultrafine | **1518** | 91,5 |
| 11A/1 | 11 | Fine | **1314** | 89,6 |
| 11C/1 | 11 | Medium | **1157** | 87,7 |
| 24A/1 | 24 | Fine | **930** | 84,9 |

Classes de grão usadas (linear intercept, da norma ISO que estava em preparação — hoje
**ISO 4499-2**): Ultrafine 0,2–0,5 µm · Submicron 0,5–0,8 µm · Fine 0,8–1,3 µm · Medium 1,3–2,5 µm.

**Sensibilidade que dá para extrair daqui, isolando uma variável de cada vez:**

| Comparação | Efeito na dureza |
|---|---|
| 11 % Co: **ultrafine → fine** (só grão muda) | 1518 → 1314 = **−13,4 %** |
| 11 % Co: **fine → medium** (só grão muda) | 1314 → 1157 = **−11,9 %** |
| Grão fine: **6 % → 11 % Co** (só Co muda) | 1574 → 1314 = **−16,5 %** |
| Grão fine: **6 % → 24 % Co** | 1574 → 930 = **−40,9 %** |

**Incerteza de medição** (Tabela 3 do relatório): coeficiente de variação médio entre
laboratórios de **0,5 % a 0,9 % em HV30**. Ou seja, a diferença entre grãos e teores de Co
acima é real, não ruído de medição.

→ **Leitura para o produto:** dentro da janela que a fresa inteiriça realmente usa
(≈6–12 % Co, ultrafine a fine), a dureza varia até cerca de **±15 %**. Isso está **na borda
inferior** da margem declarada do modelo (±15–25 %) — e dureza não é Vc: é um *proxy* de
resistência ao desgaste abrasivo, que entra na **vida**, não na velocidade admissível de forma
proporcional. Ver o veredito na Q2a.
**Confiança: `REFERÊNCIA ÚNICA` de altíssima qualidade** (instituto nacional, 6 laboratórios,
incerteza declarada) — mas é uma única publicação.
---

## Caderno de apuração — Bloco 6: a equação de Taylor como régua de sensibilidade

Tudo que este relatório afirma sobre "quanto muda o resultado" em **vida da ferramenta** sai
daqui, então registro a base antes de usá-la.

**Norma do ensaio:** ISO 3685:1993 — *Tool-life testing with single-point turning tools*.
Define o critério de fim de vida por desgaste de flanco **VB = 0,3 mm** (desgaste regular) ou
**VB_max = 0,6 mm**. https://www.iso.org/standard/9151.html

**Constantes de Taylor (v·Tⁿ = C), tabela clássica de livro-texto:**
KWON, P. *Cutting Tool Technology* — notas de aula ME478, Michigan State University, slide 7.
https://www.egr.msu.edu/~pkwon/me478/cuttingtool.pdf
(a tabela é a de Groover, *Fundamentals of Modern Manufacturing*; parâmetros para torneamento
com f = 0,25 mm/volta e p = 2,5 mm)

| Material de ferramenta | n | C (m/min) |
|---|---|---|
| Aço rápido — material não-aço | 0,125 | 120 |
| **Aço rápido — aço** | **0,125** | **70** |
| Metal duro — material não-aço | 0,25 | 900 |
| **Metal duro — aço** | **0,25** | **500** |
| Cerâmica — aço | 0,6 | 3000 |

Faixas corroborantes citadas na mesma literatura: n = 0,08–0,2 para HSS; **n = 0,2–0,4 para
metal duro**; n = 0,5–0,7 para cerâmica. **Confiança: `CONSENSO`** (tabela reproduzida em
praticamente todo livro-texto de usinagem; a faixa e o valor central concordam).

**Consequência 1 — quanto um erro de Vc custa em vida.** De v·Tⁿ = C vem T ∝ v^(−1/n):

| Erro em Vc | Vida do metal duro (n=0,25 → T ∝ v⁻⁴) | Vida do HSS (n=0,125 → T ∝ v⁻⁸) |
|---|---|---|
| +10 % | **−32 %** | −53 % |
| +15 % | **−43 %** | −67 % |
| +25 % | **−59 %** | −83 % |
| +50 % | **−80 %** | −96 % |

→ **Este é o número que calibra a rodada inteira.** Um erro de Vc de apenas 15 % — dentro da
margem declarada do próprio modelo — já corta a vida da fresa quase pela metade. Nenhum efeito
de substrato que eu tenha encontrado chega perto disso.

**Consequência 2 — a razão real HSS : metal duro (responde a Q1d).**
Igualando a mesma vida T nos dois materiais, com os C e n da tabela, para usinagem de **aço**:

| Vida de referência T | Vc HSS | Vc metal duro | **Razão HSS/MD** |
|---|---|---|---|
| 15 min | 49,9 m/min | 254 m/min | **0,196** |
| 30 min | 45,8 m/min | 214 m/min | **0,214** |
| 60 min | 42,0 m/min | 180 m/min | **0,234** |

Para material **não-aço** a T = 60 min: 71,9 vs 323 m/min → razão **0,222**.
(Cálculo meu a partir das constantes publicadas; a aritmética está explícita para conferência.)

→ **A razão real é 0,20–0,23, não 0,29.** O fator 0,29 do sistema é **otimista em 26 % a 45 %**.
---

## Caderno de apuração — Bloco 7: módulo de elasticidade do metal duro (responde Q2c)

**Fontes independentes reunidas:**

| Fonte | E medido | Composição / condição |
|---|---|---|
| DOI, H.; FUJIWARA, Y.; MIYAKE, K.; OOSAWA, Y. *A systematic investigation of elastic moduli of WC-Co alloys*. **Metallurgical Transactions**, v. 1, p. 1417–1425, 1970. DOI 10.1007/BF02900264 | WC puro ≈ **703–707 GPa**; Co ≈ **207 GPa**; ligas entre os dois, dentro dos limites de Hashin–Shtrikman | WC-(1…30) % Co, método de ressonância dinâmica |
| OKAMOTO, S.; NAKAZONO, Y.; OTSUKA, K.; SHIMOITANI, Y.; TAKADA, J. *Mechanical properties of WC/Co cemented carbide with larger WC grain size*. **Materials Characterization**, v. 56, 2005. DOI 10.1016/j.matchar.2005.06.001 | **≈577 GPa** para grão de 3–20 µm; **523 GPa** só a 30 µm | WC-10 % Co |
| ABRÃO, A. M. (1995), reproduzido em SILVEIRA (UFMG, 2017), TAB 2.2 | **580 GPa** | metal duro classe M20 |
| KOOPMAN, M.; CHAWLA, K. K. et al. *Determination of Elastic Constants in WC/Co Metal Matrix Composites by RUS and Impulse Excitation*. **Advanced Engineering Materials**, v. 4, 2002. DOI 10.1002/1527-2648(20020212)4:1/2<37::AID-ADEM37>3.0.CO;2-N | confirma que os valores medidos batem com a previsão de Hashin–Shtrikman | WC/Co, RUS + excitação por impulso |
| VILHENA, L.; DOMINGUES, B.; FERNANDES, C.; SENOS, A.; RAMALHO, A. **Materials**, v. 15, 1187, 2022. DOI 10.3390/ma15031187 | cita **550 GPa** para WC-10 % Co (atribuído a Okamoto) | WC-10 % Co, grão 2,7 µm, HV30 1491 ± 36 |

**Veredito Q2c:** **E = 580 GPa** como valor único do sistema para fresa inteiriça de metal duro.
**Confiança: `CONSENSO`** — três medições independentes (Doi 1970; Okamoto 2005; Abrão 1995)
convergem para 550–580 GPa na faixa de cobalto que a fresa usa.

**Três achados que sustentam tratar E como constante, e não variável:**

1. **Doi et al. (1970):** os módulos elásticos dependem **exclusivamente da fração volumétrica
   das fases** — não do teor de carbono, não do tamanho de partícula de WC. Portanto grão
   ultrafine × fine × submicron **não muda E**.
2. **Okamoto et al. (2005):** E praticamente constante (≈577 GPa) de 3 a 20 µm de grão; só
   despenca para 523 GPa a 30 µm — grão grosseiro que **fresa inteiriça não usa** (fresa usa
   0,4–1 µm, conforme Bloco 3).
3. A faixa ampla citada na literatura (500–650 GPa) só se abre porque inclui graus com
   **20–25 % de cobalto**, típicos de ferramenta de mineração e matriz de conformação —
   nenhum deles é fresa.

**Erro máximo de deflexão ao usar 580 GPa em toda a linha.** Deflexão é inversamente
proporcional a E (δ ∝ 1/E na viga engastada). Estreitando aos valores medidos que
correspondem à janela de fresa (550–580 GPa dos três estudos acima; teto de ~610 GPa se o
grau for de 6 % Co, extrapolando a regra de fração volumétrica de Doi):

| E verdadeiro | δ real / δ calculada com 580 | Erro |
|---|---|---|
| 550 GPa | 1,055 | **+5,5 %** (subestima a deflexão) |
| 580 GPa | 1,000 | 0 |
| 610 GPa | 0,951 | **−4,9 %** (superestima) |

→ **Erro máximo ≈ ±6 %.** Muito abaixo da margem de ±15–25 % do modelo.
→ Uma das quatro travas do cálculo de deflexão (a escolha de E) **pode cair**: E vira constante
de sistema. Isto é o que R6 precisa saber.

**Ressalva honesta:** o valor 610 GPa para 6 % Co é **extrapolação minha** da regra de fração
volumétrica de Doi, não medição publicada que eu tenha localizado. Se essa ponta do intervalo
importar para R6, ela precisa de fonte própria — está listada nas Lacunas.

═══════════════════════════════════════════════════════════════════
# RESPOSTAS FORMAIS ÀS QUESTÕES DO ENUNCIADO
═══════════════════════════════════════════════════════════════════

# QUESTÃO 1 — Matriz de combinações reais

**Aviso de território, aplicável à questão inteira:** a Questão 1 pergunta o que **existe em
catálogo**. Catálogo de fabricante está explicitamente fora do meu escopo de fonte. Portanto,
**a matriz abaixo não é uma leitura de mercado** — é o que norma, handbook, livro-texto e
artigo revisado por pares permitem afirmar sobre cada célula. Onde só o catálogo resolve, a
célula está marcada `LACUNA`. Isso vale como resultado: significa que a decisão daquela célula
não pode ser tomada com base normativa/acadêmica e depende do outro pesquisador.

## Tabela A — Matriz tipo de ferramenta × substrato

Legenda: **PM** = padrão de mercado · **NICHO** = existe mas é nicho · **OBS** = não existe / obsoleto
· `LACUNA` = meu território não decide.

| Tipo de ferramenta | HSS | HSS-Co | Metal duro inteiriço | Pastilha intercambiável | Cerâmica / CBN / PCD |
|---|---|---|---|---|---|
| **Fresa de topo reto** | NICHO — literatura acadêmica trata HSS como ferramenta de forma complexa (broca/macho/alargador), não como fresa; e HSM "foge do trivial aço rápido" por falta de rigidez e dureza a quente [B1, B8] | `LACUNA` (só catálogo separa HSS de HSS-Co por tipo de fresa) | **PM** — substrato caracterizado em artigo revisado por pares: 0,42–0,5 µm de grão, 8,4–9 % Co [B3] | **PM** para diâmetros maiores — ISO 513 é construída em torno de classes de pastilha | NICHO — cerâmica/CBN em fresa existe na literatura de HSM; PCD **só não-ferroso** [B8] |
| **Fresa toroidal** | `LACUNA` | `LACUNA` | **PM** (por extensão do item acima; nenhuma fonte no meu território separa toroidal de topo reto quanto a substrato) | **PM** | `LACUNA` |
| **Fresa esférica** | `LACUNA` | `LACUNA` | **PM** — ensaios de fresamento de aço endurecido usam esférica inteiriça de MD revestido (Dewes & Aspinwall) [B8] | NICHO | NICHO (CBN em aço endurecido) |
| **Broca helicoidal** | **PM** — HSS é o substrato de broca tratado como corrente na literatura brasileira atual; ensaio de 2015 usa broca helicoidal de aço rápido em Al 7075 como ferramenta de produção, não como curiosidade [B9] | **PM** | **PM** — coexiste; a divisão prática por diâmetro/material é `LACUNA` | — | `LACUNA` |
| **Broca insertada / U-drill** | OBS (não faz sentido físico: corpo insertado não é substrato de corte) | OBS | — (o corpo é aço; o que corta é a pastilha) | **PM** | `LACUNA` |
| **Macho de máquina** | **PM** — aço rápido é citado nominalmente como material de macho em livro-texto acadêmico [B1] | **PM** | NICHO | — | OBS |
| **Fresa de rosca** | `LACUNA` | `LACUNA` | **PM** presumido — nenhuma fonte do meu território trata fresa de rosca especificamente. Registro como presunção, não como achado. | NICHO | `LACUNA` |
| **Alargador** | NICHO — citado como ferramenta clássica de HSS [B1], mas a literatura de HSM recomenda **inteiriço de metal duro** para alargamento [B8] | `LACUNA` | **PM** — "para usinagens que não permitem pastilha, como alargamento, é aconselhável ferramenta inteiriça de metal duro, com ou sem revestimento" [B8] | NICHO | `LACUNA` |
| **Barra de mandrilar** | OBS | OBS | NICHO (haste de MD para relação L/D alta — rigidez, não corte) | **PM** | NICHO (CBN em acabamento de furo endurecido) |

**Fontes das células** (blocos deste arquivo): [B1] EPUSP PMR-2202, Batalha & Marcicano ·
[B3] Liang et al. 2018 (DOI 10.3390/mi9110568) + Shah & Ghosh 2025 (DOI 10.1016/j.mfglet.2025.06.078) ·
[B8] tese USP tde-23072003-135507, cap. 2.7, citando Dewes & Aspinwall 1997 (DOI 10.1016/S0924-0136(96)00042-8) ·
[B9] VIEIRA, J. T. et al. *Influência da afiação de brocas HSS no processo de furação da liga
de alumínio 7075*. 8º COBEF, ABCM, Salvador, 2015.
https://abcm.org.br/anais/cobef/2015/PDFS/COF-2015-0042.PDF

**Confiança da matriz como um todo: `SEM CONSENSO` / parcialmente `NÃO ENCONTRADO`** — meu
território sustenta as linhas de fresa, broca, macho e alargador; não sustenta fresa de rosca,
toroidal/esférica em detalhe, nem a coluna HSS-Co em nenhuma linha.

## 1a) Fresa de aço rápido é obsoleta?

**Veredito:** **Não é obsoleta, mas é nicho — e o nicho é definido pela máquina, não pela peça.**
**Confiança:** `REFERÊNCIA ÚNICA` (livro-texto acadêmico; não achei levantamento de uso no meu território)

O que a literatura acadêmica diz, textualmente: aço rápido é usado **principalmente na
fabricação de ferramentas de formato complexo — brocas, machos, alargadores, cortadores de
engrenagens e de forma** — e sua limitação está na velocidade de corte, menor que a do metal
duro [B1, EPUSP PMR-2202]. Fresa de topo **não aparece** nessa lista. Complementarmente, a
literatura de alta velocidade afirma que ferramentas para HSM "geralmente fogem do trivial aço
rápido" por **ausência de rigidez e baixa dureza/estabilidade sob altas temperaturas** [B8].

**O nicho, deduzido da própria física do fator de Vc:** o metal duro só entrega vantagem se a
máquina alcançar a rotação correspondente. Com Vc de metal duro em ≈180 m/min contra ≈42 m/min
de HSS para 60 min de vida em aço [B6], uma fresa de 10 mm exige ~5.700 rpm em metal duro
contra ~1.340 rpm em HSS. **Máquina sem rotação suficiente transforma metal duro em HSS caro**
— e nesse regime a fresa de HSS é a escolha tecnicamente correta, não um resíduo. Esse é
exatamente o caso da fresadora convencional e do centro antigo de oficina pequena brasileira.

**Não confirmado no meu território:** manutenção, baixo volume e material específico como
nichos de fresa HSS. São plausíveis mas eu não achei fonte normativa/acadêmica que os afirme.

## 1b) Broca: HSS e HSS-Co continuam padrão?

**Veredito:** **Sim, HSS continua padrão de mercado em broca — e é o único tipo de ferramenta
onde meu território sustenta isso com evidência atual.**
**Confiança:** `REFERÊNCIA ÚNICA`

Evidências no meu território:
- Aço rápido é listado como material padrão de **broca** em livro-texto acadêmico [B1].
- Pesquisa brasileira de 2015 usa **brocas helicoidais de aço rápido** como ferramenta de
  processo (não como controle histórico) na furação de liga de alumínio 7075 [B9].
- Pesquisa de 2010 usa broca de metal duro com geometria especial e broca de HSS convencional
  **lado a lado**, tratando a de HSS como o caso de referência da oficina [B9-bis, CONEM 2010,
  Eberhardt, Boehs & Salmoria, UFSC, https://www.abcm.org.br/anais/conem/2010/PDF/CON10-0956.pdf].
- Razão física: broca de metal duro exige a mesma escalada de rotação do item 1a, e furação
  profunda impõe carga de flexão e torção onde a **tenacidade** do HSS é vantagem — a própria
  tabela de propriedades mostra tenacidade à fratura 17 (HSS) contra 13 (metal duro) [B1].

**A divisão prática por faixa de diâmetro e por material usinado: `LACUNA`.**
Esse recorte só existe publicado em **catálogo e manual de aplicação de fabricante de broca**
(Guhring, OSG, Walter, Titex, Dormer, Sandvik). Fora do meu território — não preencho.

## 1c) Macho de máquina: qual o substrato padrão?

**Veredito:** **Aço rápido (e suas variantes ligadas) é o substrato de macho reconhecido na
literatura técnica; metal duro em macho é nicho.**
**Confiança:** `REFERÊNCIA ÚNICA` — e fraca, porque a fonte é uma citação de lista, não um estudo.

Base: macho aparece nominalmente na lista de ferramentas de formato complexo feitas em aço
rápido [B1]. Nenhuma outra fonte do meu território trata substrato de macho.

**A divisão macho de corte × macho de conformação: `LACUNA`.**
Não encontrei em norma, handbook ou artigo revisado por pares nenhuma afirmação sobre o
substrato mudar entre macho de corte e macho laminador. Quem publica essa separação é
**catálogo de fabricante de macho** (OSG, Emuge-Franken, Guhring, Walter-Prototyp) — fora do
meu escopo. Registro apenas o que a física permite dizer sem fonte de catálogo: conformação não
gera cavaco, portanto o modo de falha é torção e adesão, não desgaste de flanco — o que
**invalida usar o mesmo modelo de vida (Taylor/ISO 3685) para os dois**. Isso é uma implicação
do meu território, não um dado de substrato.

## 1d) Os fatores de Vc (HSS 0,29 · HSS-Co 0,37 · MD 1,00) têm base?

**Veredito:** **O fator do HSS está errado para o lado perigoso; o do HSS-Co não tem base no
meu território; o metal duro como referência 1,00 é correto.**
**Confiança:** `CONSENSO` para a razão HSS : metal duro · `NÃO ENCONTRADO` para HSS-Co

Razão real, derivada das constantes de Taylor publicadas (ver **Bloco 6** para a tabela e a
aritmética completa):

| Vida de referência | Razão real HSS / metal duro | Fator do sistema | Erro |
|---|---|---|---|
| 15 min | 0,196 | 0,29 | **+48 %** |
| 30 min | 0,214 | 0,29 | **+36 %** |
| 60 min | 0,234 | 0,29 | **+24 %** |

→ **Recomendação: trocar 0,29 por 0,22.** Consequência de manter 0,29: a fresa/broca de HSS
roda ~32 % acima do que deveria; como para HSS n = 0,125, a vida cai para **~11 % da esperada**
(T ∝ v⁻⁸ ⇒ 1,32⁻⁸ = 0,108). Este é um caso do item 6 do enunciado — **valor implementado
errado, com consequência quantificada.**

**HSS-Co = 0,37 (isto é, +28 % sobre o HSS comum): `NÃO ENCONTRADO`.**
Nenhuma norma, handbook ou artigo revisado por pares que eu tenha alcançado publica uma razão
de velocidade admissível entre HSS ao cobalto (M35/M42) e HSS comum (M2). A tabela de Taylor
disponível **não separa HSS por grau** — traz um único par (n, C) para "high speed steel". O
número que existe é de catálogo (Guhring, OSG, Dormer, Emuge). **LACUNA declarada.**

## 1e) Decisão de produto: não oferecer ou oferecer com aviso?

**Recomendação: OFERECER, com o fator corrigido.** Critério, em uma linha: **o dano de não
calcular é maior que o dano de calcular com fator conservador.**

O raciocínio que sustenta isso é quantitativo e vem do Bloco 6. O expoente de Taylor do aço
rápido é n = 0,125, contra 0,25 do metal duro — ou seja, **o HSS é duas vezes mais sensível ao
erro de velocidade que o metal duro**: +25 % de Vc tira 59 % da vida de uma fresa de metal duro
e **83 %** da vida de uma de aço rápido. O operador que tem a fresa de HSS na gaveta e não
recebe número do sistema vai usar o número do metal duro que ele viu na tela, ou o palpite da
oficina — os dois caminhos levam a erro muito maior que 0,22 contra 0,29.

**Onde eu recusaria oferecer:** combinação que não existe fisicamente, não combinação obsoleta.
Exemplo da própria matriz: **PCD/diamante sobre material ferroso** — a literatura registra
afinidade química do carbono com o ferro e reversão do diamante para grafite por volta de
750 °C [B8]. Aí não é "obsoleto", é **errado**, e o sistema deve bloquear.

═══════════════════════════════════════════════════════════════════
# QUESTÃO 2 — A premissa: substrato é commodity, revestimento é a variável

## 2a) A premissa se sustenta para fresa inteiriça de uso geral?

**Veredito:** **A premissa se sustenta — mas não pelo motivo que o dono do produto deu.**
Não é que o substrato seja igual entre fabricantes; é que **a variação que existe age sobre
vida/desgaste, não sobre Vc, fz ou deflexão**, e a própria ISO 513 declara impossível
padronizá-la ou nomeá-la. O efeito prático sobre o que a calculadora entrega fica **abaixo da
margem de ±15–25 %**.
**Confiança:** `REFERÊNCIA ÚNICA` para a dispersão medida · `CONSENSO` para o módulo E

**A composição de quatro fabricantes, que a questão pede: `LACUNA`.**
Teor de cobalto, tamanho de grão e dureza HV **por grau comercial de fresa** são publicados em
**catálogo e ficha técnica de fabricante** (Sandvik Coromant, Kennametal, Seco, Walter,
Mitsubishi, OSG, Guhring, Iscar). Não existe compilação equivalente em norma nem em handbook —
e a ISO 513:2012 diz **na própria Introdução** que a variedade de processos de fabricação
torna impossível padronizar os materiais de corte segundo suas características [Bloco 0].
**Não preencho essa tabela.** É a lacuna central desta rodada e é o que o outro território deve
cobrir.

**O que meu território entrega no lugar — dispersão medida com incerteza declarada (Bloco 5):**
exercício interlaboratorial de 6 organizações publicado pelo **National Physical Laboratory**
(NPL, DEPC(MN)011, 2004), sobre 5 metais duros WC-Co:

| Variável isolada | Efeito na dureza |
|---|---|
| Grão ultrafine → fine, a 11 % Co fixo | −13,4 % |
| Grão fine → medium, a 11 % Co fixo | −11,9 % |
| Co 6 % → 11 %, grão fine fixo | −16,5 % |
| Incerteza de medição entre laboratórios | 0,5–0,9 % (CV em HV30) |

Duas caracterizações acadêmicas independentes de **fresa inteiriça real** caem numa janela
estreita: **8,4–9 % Co e 0,42–0,5 µm de grão** [Bloco 3]. Dentro dessa janela, a dispersão de
dureza é da ordem de **poucos por cento**, não de ±15 %.

**Sensibilidade quantificada, por grandeza de saída:**

| Grandeza | Efeito da dispersão de substrato | Base |
|---|---|---|
| **Deflexão** | **±6 %** (E entre 550 e 610 GPa contra 580 adotado) | Bloco 7 |
| **Vc admissível** | `NÃO ENCONTRADO` — nenhuma fonte do meu território publica função dureza-do-substrato → Vc admissível | — |
| **fz admissível** | `NÃO ENCONTRADO` para fresa de uso geral (para microfresa é outra história, ver 2b-2) | — |
| **Vida da ferramenta** | Efeito **existe e é o único documentado**: substrato mais duro → menor largura de desgaste de flanco | Bloco 3, Shah & Ghosh 2025 |

**A comparação que decide:** a variação de substrato dentro da janela de fresa mexe em algo da
ordem de poucos por cento na deflexão e num efeito não quantificado sobre vida. Um erro de Vc
de **15 %** — dentro da margem declarada do próprio modelo — corta **43 %** da vida da fresa de
metal duro (Bloco 6). **Erro de parâmetro domina erro de substrato por mais de uma ordem de
grandeza.** A premissa está quantitativamente confirmada para fresa inteiriça de uso geral, e o
substrato de fresa **vira constante do sistema**.

**Onde eu discordo da formulação original da premissa:** a ideia de receita estabelecida com
pouquíssima variação de fornecedor para fornecedor **não é o que a evidência mostra** — Shah &
Ghosh (2025) mediram substratos de fresas comerciais diferentes e acharam grão e Co diferentes,
com efeito mensurável no desgaste. O que salva a decisão de produto não é a uniformidade do
substrato: é que **a diferença não é declarável nem consultável pelo operador** (ISO 513 diz
isso explicitamente) e **não entra nas grandezas que a calculadora calcula**. A conclusão é a
mesma; o argumento correto é outro, e vale registrar porque o argumento errado quebra na
próxima pergunta que alguém fizer.

## 2b) Onde a premissa quebra — as três exceções

### 2b-1) Fresa para aço endurecido (acima de 50 HRC)

**Veredito:** **Exceção confirmada quanto ao substrato — e ela se resolve no catálogo.**
**Confiança:** `REFERÊNCIA ÚNICA`

DEWES, R. C.; ASPINWALL, D. K. *A review of ultra high speed milling of hardened steels*.
**Journal of Materials Processing Technology**, v. 69, n. 1–3, p. 1–17, 1997.
DOI: 10.1016/S0924-0136(96)00042-8 — recomendam, para HSM de aços endurecidos, **metal duro
revestido com granulação menor que 1 µm**, por garantirem alta dureza, resistência ao desgaste
e maior resistência à ruptura transversal que os metais duros convencionais; revestimentos
indicados TiN, TiAlN e TiCN sobre matriz de WC [via Bloco 8].

**Quanto isso muda Vc e fz admissíveis: `LACUNA`.** Dewes & Aspinwall estabelecem o *tipo* de
substrato, não um multiplicador. Os valores de Vc e fz por dureza da peça (48/55/62 HRC) são
publicados em **catálogo de fabricante de fresa para aço endurecido** (Hitachi/MOLDINO, OSG,
Mitsubishi, Sandvik, Seco, Kennametal, Harvey, Helical). Fora do meu território.
Nota: cobalto mais baixo + grão ultrafine = dureza maior é **consistente com a medição do NPL**
(Bloco 5) — 6 % Co fine dá 1574 HV30 contra 1314 do 11 % Co fine. Mas o NPL não é uma fonte
sobre fresa para aço endurecido; é a física, não o produto.

**Vem embutida na escolha da ferramenta? SIM.** Quem vai fresar 55 HRC compra uma fresa
específica. **Resolve-se no catálogo, não no motor de cálculo.**

### 2b-2) Microfresa (abaixo de 1 mm)

**Veredito:** **Exceção confirmada, e é a mais forte das três — mas a variável que decide não é
o substrato, é o RAIO DE ARESTA.**
**Confiança:** `CONSENSO` para a relação h_min ↔ raio de aresta · `REFERÊNCIA ÚNICA` para o efeito do revestimento

1. **Grão ultrafine é obrigatório?** A ferramenta caracterizada em artigo revisado por pares é
   **UF09 — grão 0,5 µm, 9 % Co** (Liang et al., 2018, DOI 10.3390/mi9110568) [Bloco 2]. A
   ISO 513 já separa esse caso: **HF = grão < 1 µm** [Bloco 0]. Que seja *obrigatório* eu não
   consigo afirmar com uma única caracterização — `REFERÊNCIA ÚNICA`.

2. **Muda o raio de aresta obtenível? SIM, e muito** — mas o que mede isso na fonte é o
   revestimento, não o grão. Mesmo substrato UF09, quatro acabamentos [Bloco 2]:
   sem revestimento **0,41 µm** · AlCrN 0,90 µm · AlTiN 1,2 µm · TiN 1,5 µm. **Fator 2,2× a 3,7×.**

3. **Muda a espessura mínima de cavaco? SIM, proporcionalmente.** A razão h_min / raio de
   aresta é uma constante de material, na faixa **0,2–0,33**, largamente independente do
   material da peça — valores publicados: 0,293 (microcorte), 0,2 (perlita) e 0,3 (ferrita),
   0,17 e 0,15–0,49 em titânio, e faixa de revisão de 0,25–0,33. Autores de referência:
   Kim, Bono & Ni (2002); Vogler et al. (2004); Liu et al.; revisão *Micro milling process
   modeling: a review*, **Manufacturing Review** (EDP Open, 2021).
   **Confiança: `CONSENSO`** (três grupos independentes na mesma faixa).

   **Sensibilidade quantificada:** com h_min ≈ 0,25 × r_aresta,
   - microfresa **sem revestimento** (r = 0,41 µm) → h_min ≈ **0,10 µm**
   - microfresa **com TiN** (r = 1,5 µm) → h_min ≈ **0,38 µm**

   → **fz mínimo utilizável varia +266 % só por causa do revestimento.** Isso é dez vezes a
   margem do modelo. Abaixo de h_min o gume **esfrega em vez de cortar** — e a fonte registra
   exatamente isso: as ferramentas de TiN e a sem revestimento mostraram *ploughing* severo
   [Bloco 2].

**Vem embutida na escolha da ferramenta?** **Não inteiramente** — e é por isso que esta é a
exceção perigosa. O operador escolhe microfresa ⌀0,5 revestida, mas o sistema precisa de um
**piso de fz** que depende do raio de aresta, que ele não vê e não consegue medir. Recomendação:
**não é campo novo — é uma trava de fz mínimo por faixa de diâmetro**, com o valor conservador
(supor revestida). Ligar isto a R1, que trata de faixa de diâmetro.

### 2b-3) Fresa para alumínio

**Veredito:** **Exceção confirmada, e é de REVESTIMENTO, não de substrato.**
**Confiança:** `REFERÊNCIA ÚNICA` para o efeito negativo do TiAlN · `CONSENSO` para diamante em não-ferroso

- **Sem revestimento bate revestida em alumínio:** fresa de metal duro **sem revestimento**
  apresentou **força de corte e rugosidade menores** que a mesma fresa com TiAlN, em Vc, f e ap
  constantes, na usinagem da liga Al-35Zn — e a revestida favoreceu aresta postiça
  (BAYRAKTAR et al., IOP Conf. Ser. Mater. Sci. Eng., v. 295, 012013, 2018) [Bloco 2].
- **Diamante é o caminho do não-ferroso, e só dele:** usinagem com ferramentas de diamante é
  viável para não-ferrosos; **ferrosos são excluídos** por afinidade química e pela reversão do
  diamante para grafite por volta de **750 °C** [Bloco 8]. Ganho de vida com revestimento de
  diamante CVD em liga Al-Si é reportado na literatura como **3–5× típico, com picos de 10–20×**
  contra ferramenta sem revestimento — mas não consegui fixar um único artigo revisado por pares
  que carregue esse par de números; ver Lacunas.
- **Gume polido e hélice alta:** `LACUNA` — a recomendação de gume polido e hélice alta para
  alumínio aparece em **catálogo e guia de aplicação de fabricante**, não em norma ou artigo que
  eu tenha alcançado. Registro só o que a literatura de HSM afirma: **ângulos de saída maiores
  (12°–15°, e maiores ainda em alumínio fundido)** [Bloco 8] — o que é geometria, não substrato.

**Vem embutida na escolha da ferramenta? SIM.** Quem usina alumínio compra fresa de alumínio.
**Resolve-se no catálogo.** O que NÃO se resolve no catálogo é o motor de cálculo aplicar
+25 % de revestimento sobre uma fresa de alumínio — ver 2d-2.

## 2c) Módulo de elasticidade

**Resposta completa no Bloco 7.** Resumo do que ele conclui:
- **Valor único recomendado: E = 580 GPa.** Confiança `CONSENSO` (Doi 1970; Okamoto 2005;
  Abrão 1995 convergem em 550–580 GPa).
- **A faixa 500–650 GPa só se abre porque inclui graus de 20–25 % de cobalto** — ferramenta de
  mineração e matriz, não fresa. Estreitando ao que fresa usa: **550–610 GPa**.
- **Erro máximo de deflexão com o valor único: ±6 %.**
- **Tamanho de grão não afeta E** (Doi: depende só da fração volumétrica das fases;
  Okamoto: E constante de 3 a 20 µm). Logo ultrafine × fine × submicron **não é variável de E**.
- **Ressalva mantida:** o teto de 610 GPa para 6 % Co é **extrapolação minha** da regra de
  fração volumétrica de Doi, **não medição publicada que eu tenha localizado**. Consta nas Lacunas.

→ Para R6: o `E` da deflexão **vira constante**; uma das quatro travas cai.

## 2d) Revestimento — a variável principal, quantificada

### 2d-1) A razão de Vc entre metal duro sem e com revestimento se sustenta em 1,25?

**Veredito:** **Sim, 1,25 é defensável e conservador. A faixa real vai de ~1,19 a ~1,78.**
**Confiança:** `REFERÊNCIA ÚNICA` para a conversão · `NÃO ENCONTRADO` para a faixa de catálogo

**A faixa real em catálogo: `LACUNA`** — Vc por grau revestido e sem revestimento é publicado
em **catálogo de fabricante** (Sandvik Coromant, Kennametal, Seco, Walter, Mitsubishi, Iscar).
Fora do meu escopo.

O que meu território permite fazer é converter **ganho de vida** (que a literatura publica) em
**ganho de velocidade** (que o sistema usa), pela equação de Taylor com n = 0,25 para metal duro
[Bloco 6]. A conversão é `Vc_revestido / Vc_sem = (ganho de vida)^n`:

| Ganho de vida do revestimento | Ganho equivalente em Vc a vida constante |
|---|---|
| 2× | **+19 %** (fator 1,19) |
| 2,44× | **+25 %** (fator 1,25 — o valor do sistema) |
| 3× | **+32 %** (fator 1,32) |
| 5× | **+50 %** |
| 10× | **+78 %** |

A literatura de revestimento reporta ganhos de vida tipicamente de **2× a 10×** conforme
aplicação. **O 1,25 do sistema equivale a assumir 2,44× de vida — a ponta baixa da faixa.**
Para uma calculadora de oficina isso é a escolha certa: erra para o lado seguro.

Ponto empírico independente que sustenta a mesma ordem de grandeza: um experimento citado na
literatura de vida de ferramenta obteve, para a mesma vida, **150 m/min com ferramenta revestida
de TiAlN contra 107 m/min sem revestimento** → razão **1,40**. Um ponto só, não faz faixa, mas
cai dentro do intervalo derivado acima.

### 2d-2) O ganho é seletivo por material da peça?

**Veredito:** **CONFIRMADO — o ganho é seletivo, e em alumínio o revestimento de TiAlN pode ser
ganho NEGATIVO. O modelo de fator único aplicado cegamente está errado.**
**Confiança:** `REFERÊNCIA ÚNICA` por célula (cada célula abaixo tem um estudo, não três)

**Matriz revestimento × material da peça — o que meu território permite preencher:**

| Revestimento | Aço (P) | Inox (M) | Ferro fundido (K) | Alumínio / não-ferroso (N) | Superliga/Ti (S) | Aço endurecido (H) |
|---|---|---|---|---|---|---|
| **Sem revestimento** | referência 1,00 | referência 1,00 | referência 1,00 | **melhor que TiAlN** — menor força de corte e menor rugosidade em Al-35Zn (Bayraktar 2018) | pior (ploughing severo em Ti-6Al-4V, Liang 2018) | não indicado (Dewes & Aspinwall pedem revestido) |
| **TiN** | ganho positivo, o menor dos nitretos; reduz desgaste de cratera (Schulz & Moriwaki via B8) | `LACUNA` | `LACUNA` | `LACUNA` | **pior desempenho do grupo** — maior raio de aresta (1,5 µm) e ploughing severo (Liang 2018) | indicado por Dewes & Aspinwall, mas o menos indicado dos três |
| **TiAlN** | ganho positivo; indicado para HSM de aço (Dewes & Aspinwall) | **positivo e melhor que DLC** — >50 m usinados contra 20 m do DLC em 304L (Baowan 2016) | `LACUNA` | **NEGATIVO** — força de corte e rugosidade maiores que sem revestimento (Bayraktar 2018) | **melhor do grupo** — maior vida e menor rugosidade em Ti-6Al-4V (Liang 2018) | indicado (Dewes & Aspinwall) |
| **TiCN** | indicado (Dewes & Aspinwall) | `LACUNA` | `LACUNA` | `LACUNA` | `LACUNA` | indicado (Dewes & Aspinwall) |
| **AlCrN** | `LACUNA` | `LACUNA` | `LACUNA` | `LACUNA` | positivo, abaixo do AlTiN em vida; raio de aresta 0,90 µm (Liang 2018) | `LACUNA` |
| **DLC** | `LACUNA` | **pior que TiAlN** — grafitização térmica, lascamento rápido e aderência de cavaco em 304L (Baowan 2016) | `LACUNA` | **positivo** — reduz aresta postiça em liga de alumínio | `LACUNA` | `LACUNA` |
| **Diamante / PCD** | **PROIBIDO** — afinidade química com o ferro e reversão a grafite ≈750 °C (B8) | **PROIBIDO** (mesma razão) | **PROIBIDO** (mesma razão) | **o maior ganho documentado** — 3–5× típico, picos de 10–20× de vida em Al-Si | **PROIBIDO** para ligas de Ti/Ni de base ferrosa; ver ressalva | `PROIBIDO` |

Células `LACUNA`: fator por par revestimento × material só é publicado em **catálogo de
fabricante de revestimento e de ferramenta** (Oerlikon Balzers, Platit, IHI Hauzer; e os
fabricantes de ferramenta que os aplicam). Fora do meu território.

### 2d-3) Qual a forma correta no modelo?

**Recomendo (ii) — restringir quais revestimentos aparecem por material selecionado.**

**Critério:** é a única das três que **converte a premissa de (iii) em verdade em vez de deixá-la
como promessa**. Com (iii), o sistema declara "revestimento adequado ao material" e torce para o
operador ter comprado certo; se ele tiver TiAlN na fresa de alumínio, o sistema soma +25 % sobre
um efeito que a evidência mostra ser negativo — erro de sinal, não de magnitude. Com (ii), a
combinação errada simplesmente **não é representável**, que é a regra 5 do próprio enunciado, e
dentro do conjunto restante o fator único de 1,25 volta a ser defensável (2d-1).

Contra (i) — fator por par revestimento × material: **não tem como ser preenchida honestamente
hoje.** A matriz de 2d-2 tem mais `LACUNA` que célula. Uma tabela de pares onde a maioria dos
números seria inventada é pior que um fator único conservador.

**Uma exceção que (ii) precisa carregar:** o par **diamante/PCD × material ferroso** não é
"inadequado", é **proibido** por reação química. Esse par deve ser bloqueio duro, não ausência
silenciosa da lista.

### 2d-4) Os multiplicadores da lista alternativa têm fonte?

**Veredito:** **`NÃO ENCONTRADO` — nenhum dos cinco. E a suspeita do enunciado sobre PCD e DLC
está CONFIRMADA: usá-los como fator geral seria erro grave.**

| Multiplicador proposto | Fonte no meu território |
|---|---|
| TiAlN 1,40 | `NÃO ENCONTRADO` — coincide com o ponto empírico 150/107 = 1,40 citado em 2d-1, mas isso é **um** experimento, em torneamento, não uma base de fator |
| AlCrN 1,30 | `NÃO ENCONTRADO` |
| TiN 1,10 | `NÃO ENCONTRADO` |
| DLC 1,50 | `NÃO ENCONTRADO` — e **contraindicado em inox**: em 304L o DLC teve vida 2,5× MENOR que TiAlN por grafitização (Baowan 2016) |
| PCD 2,00 | `NÃO ENCONTRADO` — e **proibido em ferroso** (B8) |

**Confirmação explícita do que o enunciado suspeitava:** PCD e DLC são materiais de não-ferroso.
Aplicá-los como fator geral sobre qualquer material da peça produziria, em aço/ferro fundido, um
número **acima do dobro do correto sobre uma ferramenta que não deveria nem estar naquela peça**.
É o pior modo de falha possível numa calculadora de oficina: número alto, com aparência de
precisão, sobre uma combinação quimicamente inviável.

### 2d-5) O revestimento muda só a velocidade?

**Veredito:** **Não. Muda vida (efeito primário), muda o fz mínimo utilizável, e em não-ferroso
pode piorar a força de corte.**
**Confiança:** `REFERÊNCIA ÚNICA` por efeito

| O que muda | Quanto | Fonte |
|---|---|---|
| **Vida a velocidade constante** | 2× a 10× — é o efeito primário, e o ganho de Vc é derivado dele | literatura de revestimento + conversão de Taylor (2d-1) |
| **fz mínimo utilizável** | **+120 % a +266 %** em microfresa, via raio de aresta 0,41 → 0,90–1,5 µm | Liang 2018 [Bloco 2] + razão h_min/r (2b-2) |
| **Força de corte e rugosidade** | **piora** em liga de alumínio com TiAlN | Bayraktar 2018 [Bloco 2] |
| **Acoplamento com hélice** | vida >2× entre TiAlN e DLC na mesma hélice de 60° em inox | Baowan 2016 [Bloco 4] |

→ Consequência de modelagem: o revestimento **não é um multiplicador de Vc puro**. Em fresa
convencional o efeito colateral sobre fz é desprezível frente a ±15–25 %; **em microfresa não é**.

## 2e) Pastilha intercambiável

### 2e-1) A dispersão de Vc entre classes, para o mesmo material de peça, é grande?

**Veredito:** **`LACUNA` para o número. Mas a norma responde à pergunta de desenho: uma vez
fixado o material, a classe é praticamente uma só.**
**Confiança:** `CONSENSO` para a estrutura normativa · `NÃO ENCONTRADO` para a dispersão numérica

A ISO 513:2012 organiza os materiais de corte **por aplicação, não por composição** [Bloco 0]:
P para aço, M para inox austenítico, K para ferro fundido, N para não-ferroso, S para superligas
e titânio, H para materiais endurecidos — cada um com **cor de identificação própria**. A norma
não publica Vc por classe; publica apenas a regra de que índice numérico crescente significa
mais avanço e mais tenacidade, e índice decrescente significa mais velocidade e mais resistência
ao desgaste.

**A dispersão de Vc entre classes para o mesmo material: `LACUNA`** — quem publica Vc por grau é
**catálogo de fabricante de pastilha** (Sandvik Coromant, Kennametal, Iscar, Seco, Walter,
Mitsubishi, Korloy, Tungaloy). Fora do meu escopo.

O argumento que salva a simplificação **é sustentado pela estrutura da norma**: a letra é
definida pelo material a usinar, então fixar o material já fixa a letra. O que resta livre dentro
da letra é o índice numérico (P10 × P25 × P40), que é a escolha desbaste/acabamento — e essa,
o sistema já conhece por outro caminho (ap, ae, fz).

### 2e-2) "Fator médio entre classes" contra "assumir a classe adequada"

**Veredito:** **A formulação de assumir a classe adequada ao material selecionado é
inequivocamente mais defensável. O fator médio é um erro conceitual, não uma aproximação.**
**Confiança:** `CONSENSO` (decorre diretamente da estrutura da ISO 513)

A ISO 513 classifica **por aplicação**. Uma média entre a classe adequada e as inadequadas
produz um número que **não corresponde a nenhuma condição fisicamente realizável** — é a média
entre "certo" e "coisa que ninguém faz". Pior: ela é sistematicamente **pessimista** em relação
à situação real do operador, porque puxa para baixo com classes que ele nunca usaria, e o
resultado é um sistema que perde credibilidade por subestimar.

**O fator resultante: `LACUNA`** — para entregar o número de Vc da classe adequada eu precisaria
da tabela de Vc por grau, que é catálogo.

### 2e-3) O fator 1,25 entre fresa inteiriça e ferramenta com pastilha revestida se sustenta?

**Veredito:** **`NÃO ENCONTRADO` — e desconfio da formulação, não só do número.**

Não localizei em norma, handbook ou artigo revisado por pares nenhuma razão publicada de Vc
entre fresa inteiriça de metal duro e fresa com pastilha intercambiável para o mesmo material.
O valor real é `LACUNA` (catálogo de fabricante).

**A ressalva de formulação, que vale mais que o número:** no sistema atual o mesmo fator 1,25
está fazendo dois trabalhos diferentes — "ganho de revestimento" (Q2d) e "ganho de pastilha
intercambiável sobre inteiriça" (Q2e). São efeitos distintos e podem se somar indevidamente:
uma fresa inteiriça **revestida** já capturou o 1,25 de revestimento; se a linha "pastilha
revestida" também vale 1,25 contra "metal duro inteiriço = 1,00", então o sistema está
comparando pastilha revestida com **inteiriça sem revestimento** — o que não é a fresa que a
oficina usa. Isso precisa ser desambiguado no modelo antes de qualquer calibração de número.

## 2f) Nomenclatura — o operador consegue preencher olhando a embalagem?

**Veredito:** **Só duas coisas passam no teste: a letra/cor ISO 513 (em pastilha) e a sigla do
revestimento. Teor de cobalto, tamanho de grão e dureza HV NÃO passam.**
**Confiança:** `CONSENSO` para o que a norma prevê

| Candidato a campo | O operador consegue ler? | Base |
|---|---|---|
| **Letra ISO 513 (P/M/K/N/S/H) + cor** | **SIM** — a norma **define cor de identificação** por grupo (azul, amarelo, vermelho, verde, marrom, cinza) e a designação por símbolos; é o vocabulário universal da embalagem de pastilha | ISO 513:2012, Tabela 5 [Bloco 0] |
| **Índice numérico (P10, P25, P40)** | **Talvez** — está impresso, mas exige o operador entender que índice alto = mais avanço/mais tenacidade | ISO 513:2012 [Bloco 0] |
| **Sigla do revestimento (TiN, TiAlN, AlCrN, DLC, diamante)** | **SIM na prática** — é o argumento de venda; mas eu **não tenho fonte normativa** que obrigue a marcação. Marcado como plausível, não como verificado | — |
| **Sigla HW/HF/HT/HC da ISO 513** | **Improvável** — a norma prevê (HW = grão ≥1 µm, HF = grão <1 µm, HC = revestido), mas nunca vi essa sigla ser o rótulo comercial. Se estivesse na embalagem, resolveria a questão do grão | ISO 513:2012, Tabela 1 [Bloco 0] |
| **Teor de cobalto (%)** | **NÃO** | ISO 513 declara que composição não é padronizável nem classificável [Bloco 0] |
| **Tamanho de grão (µm)** | **NÃO** | idem — e a classificação em ultrafine/submicron/fine/medium é de **norma metalográfica de laboratório** (ISO 4499-2), não de embalagem |
| **Dureza HV** | **NÃO** — e há uma armadilha extra: o mundo se divide entre escala HRA e HV30 sem tabela de conversão padronizada; o próprio NPL precisou montar um exercício interlaboratorial para ajustar o polinômio de conversão | NPL DEPC(MN)011 [Bloco 5] |

**Aplicando o teste do enunciado** — "um campo que o operador não consegue preencher com certeza
é pior que não ter o campo": **nenhuma variação de substrato passa.** Só revestimento e classe
ISO 513 passam, e a classe ISO 513 só existe em pastilha, não em fresa inteiriça.
Isso sustenta tecnicamente a decisão de 15/08 de embutir substrato na identidade da ferramenta:
**não há vocabulário que o operador pudesse usar para informá-lo, mesmo que quiséssemos o campo.**

═══════════════════════════════════════════════════════════════════
# QUESTÃO 3 — Veredito de modelagem

## Tabela B — Veredito de modelagem

| Fator | Dispersão real encontrada | Efeito no resultado | MODELAR / DEFAULT / IGNORAR | Se MODELAR: como o operador informa |
|---|---|---|---|---|
| **Substrato de fresa (uso geral)** | Janela real de fresa: 8,4–9 % Co, 0,42–0,5 µm de grão (2 caracterizações acadêmicas). Dureza varia até −16,5 % entre 6 % e 11 % Co, e −13,4 % entre grão ultrafine e fine (NPL, 5 materiais) | Deflexão **±6 %**. Vc e fz: `NÃO ENCONTRADO` — nenhuma fonte liga dureza de substrato a Vc/fz admissíveis. Vida: efeito existe, magnitude não publicada em acesso aberto | **IGNORAR** | — |
| **Substrato de fresa (aço endurecido)** | Grão < 1 µm + revestido (Dewes & Aspinwall 1997). Multiplicador de Vc/fz: `LACUNA` (catálogo) | Não quantificado no meu território | **DEFAULT** — via catálogo: a fresa de aço endurecido é uma entrada própria, com Vc/fz próprios; nada muda no motor | — (embutido na escolha da ferramenta) |
| **Substrato de microfresa** | Grão 0,5 µm, 9 % Co (Liang 2018). ISO 513 já separa: HF = grão < 1 µm | O substrato em si: baixo. **O raio de aresta**, que é a consequência prática: h_min de 0,10 a 0,38 µm → **fz mínimo +266 %** | **MODELAR** — mas como **trava de fz mínimo por faixa de diâmetro**, não como campo de substrato | Não informa nada: o sistema aplica a trava a partir do diâmetro que ele já pediu |
| **Revestimento** | Ganho de Vc equivalente de **1,19× a 1,78×** (conversão de Taylor sobre ganho de vida 2–10×). Em alumínio com TiAlN: **negativo** | Vc: **+19 % a +78 %**. Sinal invertido em não-ferroso. fz mínimo em microfresa: +120 % a +266 % | **MODELAR** | Sigla impressa na embalagem (TiN/TiAlN/AlCrN/DLC/diamante/sem revestimento), **com a lista restrita pelo material já selecionado** |
| **Classe de pastilha** | Letra ISO 513 é determinada pelo material da peça; índice numérico é a escolha desbaste/acabamento. Dispersão de Vc entre classes: `LACUNA` | `LACUNA` | **DEFAULT** — assumir a classe adequada ao material selecionado (nunca a média entre classes) | — (derivada do material; se virar campo, é a letra+cor ISO 513, que o operador lê) |
| **Preparação de gume** | Raio de gume estudado de 5 a 120 µm; força de corte e de avanço **crescem** com o raio; menor rugosidade a 30 µm; nano-dureza, deformação plástica e tensão residual compressiva crescem com o raio (IJAMT 2017, DOI 10.1007/s00170-017-1292-z) | Grande em fresamento duro e em microfresamento; **não informável** — o operador não mede raio de gume | **IGNORAR** em fresa convencional · já coberto pela trava de fz mínimo em microfresa | — |
| **Ângulo de hélice (30/45/60°)** | Hélice maior → mais pontos de contato, maior comprimento efetivo de corte, cavaco mais fino, **menos desgaste**, temperatura da peça maior. Vida >2× entre TiAlN e DLC na mesma hélice de 60° em 304L (Baowan 2016) | Sobre **vida e acabamento**: mais que 2×. Sobre Vc/fz: `NÃO ENCONTRADO`. E o efeito está **acoplado ao revestimento**, não é separável | **IGNORAR** no motor de cálculo · **DEFAULT** no catálogo (a hélice faz parte da identidade da ferramenta) | — |

## Pergunta de fechamento — quantos níveis de granularidade?

**Recomendo (ii): metal duro com e sem revestimento como entradas separadas — com a lista de
revestimentos restrita pelo material da peça já selecionado.**

**Critério, em uma linha:** é o nível mais fino que o operador consegue preencher **olhando a
embalagem**, e é exatamente o nível onde a evidência mostra que o número muda de verdade.

O porquê de cada opção descartada:
- **(i) um único metal duro genérico, revestimento embutido** — descartada porque joga fora o
  único fator que a evidência mostra ter efeito grande e de **sinal variável**: em alumínio o
  TiAlN piorou força de corte e rugosidade contra a ferramenta sem revestimento (Bayraktar
  2018). Embutir o revestimento assume ganho onde existe perda.
- **(iii) por classe de aplicação ISO 513** — é o certo para **pastilha** e inútil para **fresa
  inteiriça**, que não carrega letra ISO. Além disso, uma vez fixado o material da peça, a letra
  já está determinada — vira campo redundante que só cria chance de erro.
- **(iv) grau específico por fabricante** — descartada com a fonte mais forte desta rodada: a
  **própria ISO 513:2012 declara na Introdução que é impossível padronizar os materiais de corte
  segundo suas características**, e por isso a norma classifica por aplicação. Não existe
  vocabulário comum entre fabricantes. Um campo assim não é difícil de preencher: é
  **impossível de preencher de forma comparável**.

## A decisão de 15/08 se sustenta tecnicamente?

**Sim, e por um motivo mais forte do que o que foi usado para tomá-la.**

A decisão foi tomada com base em "substrato é commodity". Isso, medido, é **parcialmente falso**:
Shah & Ghosh (2025) mostraram que substratos de fresas comerciais diferentes têm grão e teor de
Co diferentes, com efeito mensurável no desgaste de flanco. Se a defesa da decisão for só a
uniformidade do substrato, ela cai na primeira contestação.

A defesa que **não cai** é outra, e tem três pernas:
1. **Não há vocabulário.** A ISO 513 declara que composição de metal duro não é padronizável.
   Nenhum campo de tela pode pedir ao operador algo que a norma internacional diz não existir de
   forma comparável entre fabricantes (Q2f).
2. **A variação não entra nas grandezas calculadas.** O efeito documentado de substrato é sobre
   **vida/desgaste**; a calculadora entrega RPM, avanço, potência e deflexão. Em deflexão o erro
   de assumir E = 580 GPa é **±6 %** (Bloco 7). Em Vc e fz não há função publicada ligando
   substrato a limite admissível.
3. **A ordem de grandeza confirma a hipótese do dono do produto.** Um erro de Vc de 15 % — dentro
   da margem declarada do modelo — **corta 43 % da vida** da fresa de metal duro; 25 % de erro
   corta **59 %**; em aço rápido, 25 % de erro corta **83 %** (Bloco 6). Nada que eu tenha medido
   de dispersão de substrato chega perto disso.

→ **Erro de parâmetro domina erro de substrato por mais de uma ordem de grandeza. O sistema deve
investir precisão em parâmetro, não em catálogo de substrato.** A premissa está quantitativamente
confirmada. Escrevo com todas as letras, como o enunciado pediu no caso contrário.

**Três correções que a pesquisa devolve, e que a decisão de 15/08 não cobre:**
1. **O fator de HSS está errado**: 0,29 deveria ser **0,22**. Consequência de manter: a
   ferramenta de HSS roda 32 % rápido demais e a vida cai para ~11 % da esperada (Q1d).
2. **O fator de revestimento não pode ser universal**: em não-ferroso o sinal se inverte. A
   correção é restringir a lista de revestimentos por material, não recalibrar o número (Q2d-3).
3. **O 1,25 está fazendo dois trabalhos ao mesmo tempo** — ganho de revestimento e ganho de
   pastilha sobre inteiriça. Precisa ser desambiguado antes de qualquer calibração (Q2e-3).

## Tabela C — O que continua sem base

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| Composição de substrato de fresa de 4 fabricantes (Co, grão, HV) | Nenhuma norma ou handbook compila isso; a ISO 513 declara explicitamente que não é padronizável | Ficha técnica/catálogo de Sandvik Coromant, Kennametal, Seco, Walter, Mitsubishi, OSG, Guhring, Iscar — território do outro pesquisador |
| Fator de Vc do HSS-Co (M35/M42) sobre HSS comum (M2) | A tabela de Taylor não separa graus de aço rápido | Catálogo de broca/macho (Guhring, OSG, Dormer, Emuge, Titex) ou norma de aço rápido com dado de velocidade |
| Divisão prática HSS × metal duro em broca, por faixa de diâmetro e material | Literatura acadêmica confirma que HSS segue padrão em broca, mas não recorta por diâmetro | Catálogo de fabricante de broca |
| Substrato padrão de macho; diferença corte × conformação | Só achei macho citado em lista de ferramentas de HSS, sem estudo | Catálogo de fabricante de macho (OSG, Emuge-Franken, Walter-Prototyp) |
| Vc e fz para fresa de aço endurecido por faixa de HRC | Dewes & Aspinwall dão o tipo de substrato, não o multiplicador | Catálogo de fresa para aço endurecido (MOLDINO/Hitachi, OSG, Mitsubishi, Harvey, Helical) |
| Fator por par revestimento × material (a matriz completa de 2d-2) | Maioria das células sem estudo publicado | Catálogo de fabricante de revestimento (Oerlikon Balzers, Platit, IHI Hauzer) e de ferramenta |
| Dispersão de Vc entre classes ISO 513 para o mesmo material | ISO 513 é qualitativa; não publica Vc por subgrupo | Catálogo de pastilha (Sandvik, Kennametal, Iscar, Seco, Walter, Mitsubishi, Korloy, Tungaloy) |
| Razão real de Vc entre fresa inteiriça e ferramenta com pastilha | Nenhuma fonte no meu território | Catálogo de fabricante |
| Gume polido / hélice alta como padrão de fresa para alumínio | Só achei recomendação de ângulo de saída maior, em literatura de HSM | Catálogo de fresa para alumínio |
| E = 610 GPa para metal duro de 6 % Co | **Extrapolação minha** da regra de fração volumétrica de Doi (1970), não medição publicada | Medição publicada de E em WC-6Co de grão fino (buscar em Int. J. Refractory Metals & Hard Materials) |
| Ganho de vida de revestimento de diamante CVD (3–5× típico, 10–20× pico) | Números recorrentes na literatura de revestimento, mas não fixei um artigo revisado por pares que carregue o par | Artigo específico em Diamond & Related Materials ou Surface & Coatings Technology |
| Sigla de revestimento impressa na embalagem | Plausível e prático, mas não achei norma que obrigue a marcação | Norma de marcação de ferramenta (DIN/ISO) ou verificação empírica de embalagem |
| Fresa de rosca, fresa toroidal e coluna HSS-Co da Tabela A | Nenhuma fonte do meu território trata esses casos | Catálogo de fabricante |

═══════════════════════════════════════════════════════════════════
# Lacunas declaradas

Tudo abaixo é número que **existe**, mas só fora do meu território de fonte (normas e literatura
técnica). Não preenchi nenhum deles por conhecimento próprio.

**Categoria 1 — só existe em catálogo de fabricante de ferramenta** (o território do outro pesquisador):
1. Teor de cobalto, tamanho de grão e dureza HV do substrato de fresa de topo de uso geral, por
   fabricante — **a lacuna central desta rodada** (Q2a). Fabricantes que teriam: Sandvik
   Coromant, Kennametal, Seco, Walter, Mitsubishi, OSG, Guhring, Iscar.
2. Faixa real de Vc de metal duro revestido contra sem revestimento (Q2d-1).
3. Fator por par revestimento × material — a maioria das células da matriz de 2d-2 (Q2d-2).
4. Fatores da lista alternativa: TiAlN 1,40 · AlCrN 1,30 · TiN 1,10 · DLC 1,50 · PCD 2,00 —
   nenhum tem fonte no meu território (Q2d-4).
5. Vc por classe e por subgrupo ISO 513 de pastilha, e a dispersão entre classes para o mesmo
   material (Q2e-1, Q2e-2).
6. Razão de Vc entre fresa inteiriça de metal duro e ferramenta com pastilha revestida (Q2e-3).
7. Fator de Vc do HSS-Co sobre HSS comum — o 0,37 do sistema (Q1d).
8. Divisão HSS × metal duro em broca por faixa de diâmetro e por material usinado (Q1b).
9. Substrato padrão de macho de máquina e a diferença entre macho de corte e de conformação (Q1c).
10. Vc e fz para fresa de aço endurecido por faixa de HRC (Q2b-1).
11. Gume polido, ausência de revestimento e hélice alta como padrão de fresa para alumínio (Q2b-3).
12. Células da Tabela A referentes a fresa de rosca, fresa toroidal em detalhe, e toda a coluna
    HSS-Co (Q1).

**Categoria 2 — número que eu produzi por derivação, e que precisa de confirmação independente:**
13. **E = 610 GPa para metal duro de 6 % Co** — extrapolação minha da regra de fração volumétrica
    de Doi (1970); **não é medição publicada que eu tenha localizado**. Afeta a ponta superior do
    erro de deflexão de ±6 % (Q2c / Bloco 7).
14. **Razão HSS/metal duro de 0,196–0,234** — cálculo meu a partir das constantes (n, C) de
    Taylor publicadas; a aritmética está explícita no Bloco 6 para conferência, mas a razão em si
    não é um número publicado (Q1d).
15. **Conversão ganho de vida → ganho de Vc (fator = ganho^0,25)** — derivação minha da equação
    de Taylor com n = 0,25. A equação e o n são publicados; a aplicação a revestimento é minha (Q2d-1).

**Categoria 3 — dado que eu esperava achar em literatura técnica e não achei:**
16. **Função ligando dureza/composição de substrato a Vc ou fz admissíveis.** Procurei e não
    existe no meu alcance. Todo efeito de substrato que a literatura publica é sobre **desgaste e
    vida**, nunca sobre limite de velocidade ou avanço. Isso é, por si, um resultado: reforça
    tratar substrato como constante no motor de cálculo.
17. **Texto integral de Shah & Ghosh (2025)** — a única fonte que compara substratos de fresas
    comerciais entre si está atrás de paywall Elsevier (403). Só o nível de resumo foi acessível,
    o que impediu quantificar a dispersão percentual entre substratos (Q2a).
18. **Levantamento de uso de fresa de HSS na indústria atual.** Não existe em norma nem em
    literatura acadêmica; o que existe é relatório de consultoria de mercado, que também está fora
    do meu território por não ser fonte técnica.

═══════════════════════════════════════════════════════════════════
**Fim do retorno R3 — território normas e literatura técnica.**
