# Validação — R6-V (verificação dos bloqueios da R6)

**Veredito:** `REPROVADO`
**Retornos auditados:** `RESPOSTA_R6V.md` + `RESPOSTA_R6V_B.md` (par cego, G8 aplicado)
**Enunciado de referência:** `_para_colar/COLAR_R6V.md`, bloco entre as linhas `═══`
**Data:** 25/08/2026

> **Reprovado por interrupção, não por má qualidade.** Os dois retornos foram cortados no meio da apuração. O que existe é bom — em Q1, excelente. O que falta é a maior parte da rodada.
>
> **Consequência operacional (regra de cadência do `HANDOFF.md`, correção de 18/08):** a rodada re-roda **uma vez**, com o briefing reduzido aos itens que ficaram em aberto. Q1 **não** re-roda: está fechada e vira canônico.

---

## Resumo

Os dois retornos entregam **1 das 4 questões**. A Q1 (módulo de elasticidade) foi fechada com qualidade acima do padrão do projeto: tabela por grau com %Co, granulometria, método de medição declarado e norma nomeada, vinda de três fontes de fato independentes — e ela **resolve sozinha os dois bloqueios da R6 e a divergência D-1**, que era o motivo de existir desta rodada.

Q2 (`Fr/Fc`), Q3 (`n` de Taylor) e Q4 (`De/D` e viga escalonada) **não têm resposta no território de fonte primária** — o retorno B parou antes de chegar nelas. O território de código levantou material forte sobre as três, mas por definição não fecha nenhuma: código é nível 5, e o valor citado por código só vira fonte quando o outro território abre a referência declarada.

Nenhum dos dois retornos entregou o formato exigido — nem os vereditos por questão, nem a **Tabela final 1** (as cinco constantes), nem a **Tabela final 2** (o que continua sem base). O arquivo A ainda está marcado `_status: em apuração_` e faz uma remissão a uma seção que não chegou a existir.

---

## Achados por portão

| Portão | Selo | Achado | O que fazer |
|---|---|---|---|
| **G1 Cobertura** | **`BLOQUEIA`** | Q2, Q3 e Q4 sem resposta no território primário. Q1(e) — `E` do aço rápido por grau (M2/M35/M42) — não entregue por nenhum dos dois. Q2(c) exigia **escolher** pico ou média e justificar: ninguém escolheu. Q4(d) exigia o **erro percentual** de viga simples × escalonada e proibia recusa: não entregue. Formato de entrega (vereditos por questão + 2 tabelas de fechamento) ausente nos dois. | Re-rodar Q2, Q3, Q4 e Q1(e) no território primário. Q1(a–d) está fechada. |
| **G2 Fonte** | `OK` em Q1 · **`BLOQUEIA`** no resto | Em Q1, todo número tem localizador de página/tabela/equação — CERATIZIT p-line p.22, Kennametal p.9, NPL eq.44 p.68. É o padrão mais alto que este projeto já recebeu. Fora de Q1, **nenhum número tem fonte de nível 1–4**: `Kr = 0,40` (sem fonte), `n = 0,25` (sem fonte, e em repositório com marca de geração por LLM), `De/D = 0,8` (fonte declarada por código — Kops e Vo — **nunca aberta**). | Nenhum valor de Q2/Q3/Q4 pode entrar em canônico como está. |
| **G3 Confiança** | `RESSALVA` | B rotula corretamente e o `CONSENSO` de Q1 **se sustenta**: NPL/Doi (metrologia + artigo), CERATIZIT (fabricante europeu de substrato) e Kennametal (fabricante norte-americano) são três linhagens distintas, com o mesmo método declarado e ≤3,2 % de dispersão na faixa de fresa. Cuidado registrado: **NPL e Doi contam como uma fonte só** (a eq. 44 do NPL é o ajuste de Doi) — a contagem de 3 continua válida porque CERATIZIT e Kennametal são independentes das duas. A não usa os rótulos, mas classifica em prosa e **se recusa explicitamente a chamar de `CONSENSO`** o 600 GPa do código. Honesto. | Manter `CONSENSO` em Q1. Nada mais é rotulável. |
| **G4 Default** | `RESSALVA` | Nenhum sinal de preenchimento por default em B: os valores são irregulares e específicos por grau (646, 596, 547, 624, 570, 512…) — assinatura de dado medido, não de célula preenchida. **A assinatura aparece do outro lado**, e A a denuncia: `600 GPa` + `14 500 kg/m³` repetidos em repositórios distintos com o mesmo comentário, todos com marca de assistência por LLM. Ressalva única em B: o valor único recomendado, **580 GPa**, é escolha de engenharia dentro de 570–585, não um número publicado. | O `580` entra no canônico como **decisão com data (§3)**, não como constante de fonte (§2) — mesma regra que a `VALIDACAO_R6.md` aplicou ao `500`. |
| **G5 Sensibilidade** | `OK` em Q1 · `BLOQUEIA` no resto | B quantifica: dispersão de 543–646 GPa → **±8 % em `δ`** na faixa de fresa (6–12,5 % Co), **±12 %** em toda a linha (4,2–15 % Co). Ambos abaixo da margem do modelo, e a conclusão "`E` pode ser fixado, sem campo na tela" está aritmeticamente correta — **`δ ∝ 1/E`, conferido**. Fora de Q1, nada quantificado: A prometeu o erro de viga simples × escalonada e não o entregou. | `E` fixado. Q2/Q3/Q4 sem base para classificar. |
| **G6 Divergência** | `RESSALVA` (quatro achados, um deles resolve D-1) | Ver a seção própria abaixo. | Ver abaixo. |
| **G7 Lacunas** | `RESSALVA` | B declara bem, inclusive achados **negativos** de alto valor (CERATIZIT *rods* 2017 não publica `E`; Ultra-Met e Hyperion não publicam; Kennametal deixa `E` **em branco** justamente nos graus submícron; ISO 3312 e o artigo de Doi atrás de paywall, não obtidos). A declara as suas (código não tem grau/%Co; Taylor ausente do ramo). Mas **a Tabela final 2 não existe** em nenhum dos dois. | Reconstituir a tabela de lacunas ao escrever o canônico. |
| **G8 Cross-check A×B** | `RESSALVA` | Territórios **não se sobrepõem** — o teste do enunciado passa: nenhuma página é citada pelos dois. Mas o cruzamento só existe em Q1; em Q2/Q3/Q4 há um lado só. Ver a tabela de confronto abaixo. | — |

---

## Confronto A × B

**A** = território CÓDIGO ABERTO E PRÁTICA · **B** = território FONTE PRIMÁRIA DE ENGENHARIA
*(a identificação não veio do `MAPA_R6V.md`, que não foi aberto — cada retorno declara o próprio território no título; ver "Falha de processo" ao fim)*

| Grandeza | Retorno A (código) | Retorno B (primária) | Fonte de A | Fonte de B | Situação | Selo |
|---|---|---|---|---|---|---|
| `E` metal duro, valor recomendado | **600 GPa** (dominante em código); 517 GPa na implementação-raiz | **580 GPa** (~10 % Co, submícron) | **nenhuma** em 5 de 8 repositórios; `material-properties.org` no único que cita | CERATIZIT p.22 + Kennametal p.9 + NPL eq.44 | **Convergem na ordem de grandeza; só B tem procedência.** A prática caiu perto do valor certo por caminho sem origem. | `RESSALVA` |
| `E` metal duro, faixa | 517–650 GPa | 543–646 GPa (4,2–15 % Co) · **624 GPa a 6 % Co** | sem fonte | tabela por grau, método declarado | Faixas quase coincidem. A de B é **explicada** por %Co; a de A é dispersão sem causa. | `RESSALVA` |
| `E` por grau / %Co / grão | **não existe** — "carbide" é um material só em código aberto | 12 graus com %Co, classe de grão, ν e método | — | CERATIZIT p-line p.22–23 | **Só B achou.** Não é confirmação cruzada — é resposta de um território só, com fonte de nível 4. | `RESSALVA` |
| Método de medição (`EIT` × macroscópico) | **não declarado** em nenhum repositório | **ressonância, ISO 3312 / EN 23312** — declarado pelas três fontes | — | CERATIZIT p.122 · NPL §5.1 p.67 · Kennametal p.8 | Só B. Fecha a dúvida genuína levantada na `VALIDACAO_R6.md`. | `OK` |
| Efeito da granulometria em `E` | não modelado | **praticamente nulo** — dois pares de mesmo %Co e grãos diferentes: 624×624 (0,0 %) e 547×549 (0,4 %) | — | CERATIZIT p.22 · NPL §1.1 p.4 · Doi (0,6–5 µm) | Só B, mas com evidência interna de par controlado. Forte. | `OK` |
| `E` aço rápido | 186 GPa (raiz) · 200 GPa (BTL) · 200–220 (web) | **não entregue** | nenhuma / web genérica | — | **Nenhum dos dois fecha.** Q1(e) não respondida. | `BLOQUEIA` |
| `Fr/Fc` — valor | `Kr = 0,40` (default) · `0,07` · **1,00** · função 0,19–0,87 | **não entregue** | nenhuma; a função é "designed by Bryan Turner", autoral | — | Um lado só, e sem fonte nesse lado. | `BLOQUEIA` |
| `Fr/Fc` — origem da faixa "0,3–0,5" | **derivada, não citada**: com `Krc/Ktc` ajustados sobre ensaio, a razão vai de **0,50 (h=0,05 mm)** a **0,26 (h→∞)** — é efeito da força de aresta, não constante de material | não entregue | `leekunhwee/ForceCalculation` (ajuste sobre dados próprios) | — | **Achado real e verificável por aritmética**, mas de território de nível 5. Responde Q2(d) qualitativamente: a faixa não tem origem publicada. | `RESSALVA` |
| `Fr/Fc` — pico ou média | não escolhido (registra que na prática `Kr` é constante por fatia e o pico emerge da integração) | não entregue | — | — | **Q2(c) exigia escolha justificada. Não houve.** | `BLOQUEIA` |
| `De/D` | **0,80 × D** (2 repos, mesma linhagem) · **1,00** · **≈0,86** derivado de exemplo publicado | **não entregue** | Kops e Vo, **declarado por código e não aberto** | — | A referência que sustentaria o 0,8 continua **fechada**. Era exatamente o trabalho de B. | `BLOQUEIA` |
| `De/D` por nº de canais | **nenhum código ramifica** por 2/3/4/5/6 canais — o mesmo 0,8 vale para todos | não entregue | — | — | Achado por ausência, útil: a prática ignora a contagem de canais. | `RESSALVA` |
| Viga simples × escalonada | implementação-raiz usa **escalonada de 3 trechos** e **ignora o termo de rotação** (subestima `δ`), admitido em comentário no próprio código | não entregue | `beta.html:774-788` | — | **O erro percentual, exigido pelo enunciado, não foi calculado por ninguém.** | `BLOQUEIA` |
| `n` de Taylor | **ausente do ramo**: nenhuma calculadora consolidada implementa Taylor; os únicos `n = 0,125 / 0,25` achados estão em repositórios de 2026, 0–5 estrelas, com marca de LLM | não entregue | nenhuma | — | **Achado negativo de alto valor** — e A tem a disciplina de **não contar** esses repos como confirmação. Mas `n` continua sem fonte. | `BLOQUEIA` |
| `T_ref` (vida-alvo dos `Vc` de catálogo) | não achado | não entregue | — | — | Lacuna nos dois lados. | `BLOQUEIA` |

**Nota de método aplicada:** nenhuma média foi feita entre A e B. Onde A e B se aproximam (`E`), o motivo é declarado — B tem procedência e A não, logo **B vence com motivo, não por interpolação**.

---

## Itens que BLOQUEIAM

1. **`Fr/Fc` sem nenhum valor de fonte primária.** O território B nunca chegou à Q2. Sem `Fr`, a cadeia de deflexão não produz µm auditável — é a trava que a própria ficha da R6-V classifica como "a função inteira".
2. **Q2(c) — pico ou média — não escolhida.** O enunciado proíbe devolver as duas opções. Nenhum dos dois escolheu.
3. **`n` de Taylor sem fonte.** Seis classes de ferramenta continuam vazias. Os únicos valores em circulação (`0,125` / `0,25`) reproduzem exatamente os valores presumidos internamente pelo Fenix, **em repositórios com marca de geração por LLM** — risco de circularidade explicitamente registrado por A, e corretamente recusado como confirmação.
4. **`T_ref` não apurado.** Sem ele, a forma absoluta da equação de vida não roda, e a norma de referência (ISO 3685) não foi confirmada.
5. **`De/D` — Kops e Vo nunca aberta.** O `0,8 × D` que dois repositórios usam declara essa origem; abrir a referência era a tarefa do território primário e não foi feita. O `De/D` continua sem fonte de nível 1–3, e **D-2 permanece aberta**.
6. **Erro percentual de viga simples × escalonada não calculado.** O enunciado proibia recusa e pedia a fórmula ou a família de curvas. Não veio de nenhum lado.
7. **`E` do aço rápido por grau (M2/M35/M42) não entregue.** Q1(e). Fora do caminho crítico do MVP (furação ainda não está no escopo), mas é subitem não respondido.
8. **Formato de entrega não cumprido nos dois retornos.** Sem vereditos por questão em A, sem Tabela final 1 e sem Tabela final 2 em nenhum dos dois. `RESPOSTA_R6V.md` continua marcado `_status: em apuração_` e remete a uma "seção de erro na Questão 4" que não existe no arquivo.

---

## O que este retorno RESOLVE — e que não pode ser perdido na re-rodada

**Q1 está fechada. Os dois bloqueios da `VALIDACAO_R6.md` caem, e D-1 se resolve.**

| Item da `VALIDACAO_R6.md` | Novo estado | Motivo |
|---|---|---|
| **BLOQUEIA #1** — `E = 500 GPa` sem fonte | **RESOLVIDO** | O `500` era média de uma faixa. Agora existe tabela por grau, com %Co, granulometria, ν e método declarado. O `500` não entra em lugar nenhum. |
| **BLOQUEIA #2** — divergência R3 × R6 impede o canônico | **RESOLVIDO** | A dispersão de 30,9 % em `δ` vinha da união 466–610. A faixa medida por ressonância na granulometria de fresa é **543–646 GPa** para 4,2–15 % Co, e **560–624** na janela real de fresa (6–12 % Co) → **±8 % em `δ`**, dentro da margem do modelo. `E` **pode** ser fixado. |
| **D-1** — 580 (R3) × 466–516,5 (R6) | **RESOLVIDO, com R3 confirmada** | Ver abaixo. |
| **Lacuna 8 da R3** — "falta medição de `E` em 6 % Co e grão fino" | **RESOLVIDA** | CERATIZIT CTS12D (6 % Co, submícron 0,5–0,8 µm) e CTF12E (6 % Co, fino 0,8–1,3 µm): **624 GPa** ambos. |
| **Dúvida genuína da `VALIDACAO_R6.md`** — a faixa é `EIT` ou flexão? | **RESOLVIDA** | Todos os valores agora usados são **módulo dinâmico macroscópico por ressonância, ISO 3312 / EN 23312** — o módulo correto para viga engastada. `EIT` é explicitamente descartado, com o motivo (indentar grão de WC dá ~650–700; indentar o ligante dá ~200–250). |
| **D-2** — haste × `0,8 × D` | **CONTINUA ABERTA** | Nada de fonte primária. |
| **Lacuna 6** (`Fr/Fc`) e **lacuna 9** (`n` de Taylor) | **CONTINUAM ABERTAS** | Nenhuma resposta de território primário. |

**Confirmação cega da R3 — o achado mais forte da rodada.** O enunciado da R6-V omitiu de propósito o valor da R3. O território primário, sem saber dele, chegou a **`E = 580 GPa` como valor único recomendado** — o mesmo número de `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.2, por caminho totalmente diferente (tabela de grau de fabricante de haste + correlação de instituto de metrologia, contra modelo de fração volumétrica + Okamoto). **É o que o par cego existe para produzir.** O rótulo `REFERÊNCIA ÚNICA` da R3 pode subir para `CONSENSO`.

---

## Divergências com material já registrado

**V-1 — A faixa da R3 é estreita demais no lado de pouco cobalto.** *(nova, menor)*
`CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.2 registra "**580 GPa**, faixa útil **550–610**, para 6–11 % de cobalto", e declara os 610 como *extrapolação não publicada*.
A tabela CERATIZIT publica **624 GPa a 6 % Co** (CTS12D e CTF12E) e **646 GPa a 4,2 % Co** (CTU08L).
Ou seja: o teto de 610 não era extrapolação **para cima** — era **baixo demais**, e agora há valor publicado acima dele. Efeito em `δ`: 624 contra 610 = **2,3 %**, irrelevante para o resultado, mas a faixa escrita no canônico precisa ser corrigida para **≈560–624 GPa na janela de 6–12 % Co**. Não é erro de método da R3; é ganho de resolução.

**V-2 — O `466,0–516,5 GPa` da R6 (Ratov) fica fora da faixa medida por ressonância.** *(resolve-se por motivo declarado, não por média)*
Toda a faixa de Ratov está **abaixo** dos 543 GPa que é o piso da linha de ferramenta rotativa da CERATIZIT (e abaixo dos 549 da Kennametal a 11,5 % Co). As três fontes de B declaram o método (ressonância); Ratov **não declara** se o valor é `EIT` ou flexão — a própria `VALIDACAO_R6.md` já havia levantado essa dúvida. Com valores de grau, método e norma de um lado, e uma citação de contexto sem método declarado do outro, **a fonte com método vence, e o motivo é o método** — não a média, não o prestígio.

**V-3 — O `600 GPa` do território de código não tem origem, e agora dá para provar.** *(achado, não divergência a resolver)*
A implementação-raiz do ramo (`brturn/feeds-and-speeds`, 29 estrelas) usa **517 GPa sem fonte**; o addon do FreeCAD que herdou dela (`better-tool-library`, 43 estrelas) **trocou** para 600 GPa citando uma página web genérica — a troca está registrada no commit `88d593f`, com o diff mostrando os valores antigos convertidos de psi. **As duas maiores implementações do ramo são uma linhagem só, e o número mudou 16 % por troca de referência, não por medição.**
Contra os 580 GPa medidos: usar 600 erra `δ` em **−3,3 %**; usar 517 erra em **+12,2 %**. Nenhum dos dois estoura a margem do modelo — a prática não é perigosa aqui, é só **sem origem**. É exatamente o caso que a ficha da R6-V antecipou: *"a prática convergiu num valor sem origem"*.

**V-4 — `CANONICO_LIMITES_E_ALERTAS.md` §1.4 continua dizendo "diâmetro da haste".** *(D-2, inalterada)*
Nenhuma evidência nova de território primário. O código usa `0,8 × D` (duas implementações da mesma linhagem, citando Kops e Vo sem que ninguém tenha aberto), `1,00 × D` (uma) e `≈0,86` (um exemplo publicado sem contagem de canais). **Não decido**, e não há base para decidir ainda.

---

## O que entra no canônico como lacuna declarada

Se a re-rodada de Q2/Q3/Q4 também voltar vazia, estes itens vão para a **§4 do `CANONICO_DEFLEXAO_E_VIDA.md`** como lacuna assumida — e a função correspondente **não é entregue com número inventado**:

1. **`Fr/Fc` sem fonte primária.** O que se sabe, e é registrável: a razão **não é constante** — depende da espessura de cavaco por efeito da força de aresta, indo de ~0,50 em `h = 0,05 mm` a ~0,26 em cavaco grosso, com coeficientes ajustados sobre ensaio real. A faixa folclórica "0,3–0,5" é o **rastro** desse efeito na faixa de avanço de oficina, não uma constante de material. *O que fecharia:* coeficientes mecanísticos `Ktc/Krc/Kte/Kre` publicados por material em handbook ou artigo com DOI.
2. **`n` de Taylor por classe de ferramenta e por material da peça.** *O que fecharia:* Machinery's Handbook ou ASM Vol. 16 abertos na tabela, ou ISO 3685.
3. **`T_ref` dos `Vc` de catálogo.** *O que fecharia:* nota de rodapé de catálogo de fabricante declarando a vida-alvo, ou ISO 3685.
4. **`De/D` — a referência Kops e Vo.** *O que fecharia:* abrir o artigo e ler o domínio de validade (nº de canais, profundidade de canal).
5. **Erro de viga simples × escalonada.** *O que fecharia:* é **derivável** — não precisa de fonte nova, precisa de alguém fazer a conta com a equação da viga escalonada.
6. **`E` do aço rápido por grau (M2/M35/M42).** Fora do caminho crítico enquanto furação não entrar no escopo.
7. **`EIT` por grau comercial de haste.** Declarada por B e **irrelevante para o modelo de viga** — fica registrada só para não ser reaberta.
8. **Texto integral da ISO 3312 e do artigo de Doi (1970).** Ambos pagos, não obtidos. **Nenhum valor numérico depende deles** — a norma foi identificada pela página pública e o método está reproduzido no guia do NPL (eq. 43). Lacuna corretamente declarada.

---

## Falha de processo — registrar para não repetir

**O anonimato do juiz não funcionou nesta rodada, e a culpa não é de quem julgou.** O `MAPA_R6V.md` não foi aberto — mas **os dois retornos declaram o próprio território na primeira linha do arquivo** (`RESPOSTA_R6V — território: CÓDIGO ABERTO E PRÁTICA` / `RESPOSTA_R6V_B — Território: FONTE PRIMÁRIA DE ENGENHARIA`). O sorteio protege o mapa e não protege o cabeçalho.

Neste caso o dano é pequeno — os territórios são distinguíveis pelo conteúdo de qualquer jeito (um cita `beta.html:308`, o outro cita CERATIZIT p.22), e o desempate aqui se deu por **método declarado**, que é critério de evidência e não de prestígio. Mas a trava, como está escrita, não entrega o que promete.

**Correção sugerida para as próximas rodadas em par cego:** o pesquisador grava o retorno **sem nomear o território** — cabeçalho neutro (`RESPOSTA_R{n}` / `RESPOSTA_R{n}_B`), sem a linha de território. A associação vive só no `_procedencia/MAPA_R{n}.md`.

---

## Instrução para a re-rodada

**Não re-rodar Q1.** Está fechada, com `CONSENSO` e método declarado. Re-rodá-la só produz ruído e arrisca o achado.

**Re-rodar, no território de FONTE PRIMÁRIA DE ENGENHARIA:**

| Item | O que exigir |
|---|---|
| **Q2** `Fr/Fc` | Coeficientes mecanísticos publicados (`Ktc`, `Krc`, `Kte`, `Kre`) por material, com localizador. **Escolher pico ou média, com justificativa** — devolver as duas opções não é resposta. |
| **Q3** `n` de Taylor + `T_ref` | Tabela por classe de ferramenta e matriz ferramenta × material, com localizador. `T_ref` convencional e a norma que o define. |
| **Q4** `De/D` | **Abrir Kops e Vo** — é o item mais barato e mais valioso da re-rodada: dois repositórios já apontam para ele, ninguém leu. Domínio de validade por nº de canais e por profundidade de canal. |
| **Q4(d)** viga escalonada | O **erro percentual** contra viga simples. É derivação, não busca — recusa não é aceitável. |
| **Q1(e)** `E` do aço rápido | M2, M35, M42, com grau identificado. Prioridade baixa. |

**O que levar do território de código para dentro do briefing** (sem revelar valor, para não ancorar): a referência **Kops e Vo, "Determination of the Equivalent Diameter of an End Mill Based on its Compliance"**, e **Stephenson e Agapiou, *Metal Cutting Theory and Practice*, p. 362** — as duas são declaradas por código e nenhuma foi aberta. É trabalho de fonte primária, e o alvo já está localizado.

**O que não reabrir:** tudo que a ficha `R6V_VERIFICACAO_DOS_BLOQUEIOS.md` já lista, **mais a Q1 inteira**.
