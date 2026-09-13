# Validação — R3 Ferramentas, Substratos e Revestimentos

**Veredito:** APROVADO COM RESSALVAS
**Retornos auditados:** `RESPOSTA_R3.md` (A) + `RESPOSTA_R3_B.md` (B) — rodada em par cego, territórios de fonte não sobrepostos
**Data:** 18/08/2026
**BLOQUEIA:** 5 (todos localizados em linha específica; nenhum derruba a resposta central da rodada)

---

## Nota de método — o que eu verifiquei e o que eu não verifiquei

**Auditei em par cego.** Não abri `pesquisa/_procedencia/`. Não sei qual retorno veio de qual território sorteado, e não tentei inferir para desempatar. Cada linha foi julgada pelo que está escrito nela e pela fonte citada nela.

**O que eu conferi:** rastreabilidade da citação — se o número tem origem nomeada e localizável (DOI, URL, norma, catálogo com página), se o rótulo de confiança bate com a quantidade de fontes de fato independentes, se a aritmética declarada fecha, e se a classificação MODELAR/DEFAULT/IGNORAR é coerente com a magnitude apresentada.

**O que eu NÃO conferi:** não abri as fontes externas para checar o conteúdo. Não li o PDF da ISO 513, não abri o relatório do NPL, não abri o catálogo da ISCAR nem a página da Harvey Tool. Portanto **não afirmo que os números estão certos na origem** — afirmo que estão, ou não estão, rastreáveis até uma origem que outra pessoa consegue abrir.

Onde escrevo `BLOQUEIA` por fonte, o defeito é **ausência de localizador**, não prova de que o dado seja falso.

---

## Topo do veredito — as decisões do Mestre (G6)

Três decisões registradas no `HANDOFF.md` §9 foram tocadas pelos retornos. Duas sobrevivem, uma cai.

### D1 — "Fresa de aço rápido é obsoleta" → **CONTRADITA pelos dois**

| | A | B |
|---|---|---|
| Veredito | Não é obsoleta — é nicho | Refutada como obsoleta, confirmada como nicho |
| Base | Livro-texto (EPUSP PMR-2202) + tese USP: HSS é ferramenta de forma complexa (broca, macho, alargador), fresa não aparece na lista | Catálogo vivo de dois fabricantes independentes: Dormer Pramet mantém famílias HSS-E (PM) para canal, desbaste/HFC e semiacabamento; OSG mantém HSS-Co 4 e 6 cortes com dados de corte publicados |

**Convergem, de universos de fonte que não se tocam.** É o tipo de achado mais robusto que esta rodada consegue produzir, e ele contradiz D1.

**B acrescenta uma correção que A não alcança:** o que sobreviveu em fresa **não é HSS comum — é HSS-E / HSS-Co / HSS-PM**. B não encontrou linha de fresa de topo em HSS sem cobalto em nenhum catálogo consultado. Isso significa que o sistema hoje oferece **duas** entradas de aço rápido, e a primeira ("Aço rápido (HSS)", fator 0,29) representa uma fresa que B procurou e não achou à venda.

**Divergência menor sobre o nicho, e ela importa:** A afirma que o nicho é "máquina sem rotação suficiente" — mas A declara explicitamente que isso é **dedução própria** da física do fator de Vc, não fonte. B foi procurar e registra: *"Não encontrei em catálogo a justificativa 'máquina sem rotação suficiente'"*; o nicho que o fabricante declara é outro — **material mole (alumínio, plástico) e série limitada onde a vida importa menos** (Kennametal). O canônico deve usar o nicho declarado por fabricante e marcar o de A como hipótese não confirmada.

### D2 — "Substrato é commodity, revestimento é a variável" → **decisão sobrevive, redação não**

Os dois confirmam a **consequência** (substrato de fresa de uso geral = `IGNORAR`, vira constante do sistema). Nenhum dos dois confirma a **afirmação factual**.

- **A diz com todas as letras que a premissa, como formulada, é parcialmente falsa:** Shah & Ghosh (2025) mediram substratos de fresas comerciais diferentes e acharam grão e teor de Co diferentes, com efeito mensurável no desgaste de flanco. A frase *"receita estabelecida, com pouquíssima variação de fornecedor para fornecedor"* não é o que a evidência mostra. A troca o argumento: o que salva a decisão não é a uniformidade do substrato, é que **a diferença não é declarável nem consultável pelo operador** (a própria ISO 513 declara na Introdução ser impossível padronizar os materiais de corte por suas características) e **não entra nas grandezas que a calculadora calcula** (o efeito documentado é sobre vida/desgaste; a calculadora entrega RPM, avanço, potência e deflexão).
- **B não conseguiu medir a premissa, e declara isso como o achado:** nenhum fabricante publica teor de cobalto, tamanho de grão e dureza das suas fresas de uso geral. B registra a ressalva de método sem ser perguntado: *"a premissa não foi confirmada por medição — foi confirmada por ausência de dado publicado e pela estrutura das tabelas de catálogo"*, e declara a condição de falseamento: se o outro território trouxer dispersão de substrato acima de 25%, a conclusão cai.

**Verificação pedida: a decisão sobrevive aos dois argumentos, mas eles não têm o mesmo peso.**

O argumento de **A sustenta melhor**, e por dois motivos. Primeiro, é positivo em vez de negativo: uma norma internacional afirmando que a padronização é impossível é evidência de que o vocabulário não existe; a ausência de um dado num catálogo é compatível tanto com "não varia" quanto com "varia e o fabricante não conta". Segundo, A quantifica a consequência na única grandeza calculada que o substrato toca (deflexão, ±6%), enquanto B só consegue limites indiretos.

O argumento de **B sustenta melhor a implementação de D6**, o que é coisa diferente: B mostra que o catálogo do fabricante **já é organizado exatamente como D6 propõe** — uma entrada por variação real de mercado (linha HSS-E, linha de metal duro, linha micro, grau para endurecido), e em nenhum momento o fabricante pede que o usuário declare a composição do substrato.

**Recomendação para o canônico:** manter a decisão, trocar a justificativa. Escrever "substrato é commodity" como fato é criar dívida — cai na primeira contestação de quem leu Shah & Ghosh. A formulação que resiste é: *o substrato varia, a variação age sobre vida e não sobre o que a calculadora entrega, e não existe vocabulário pelo qual o operador pudesse informá-la.*

### D6 — "Substrato embutido no nome da ferramenta" → **CONFIRMADA pelos dois**

A: nenhuma variação de substrato passa no teste "o operador consegue ler na embalagem". Só revestimento e letra ISO 513 passam, e a letra ISO só existe em pastilha, não em fresa inteiriça.
B: teor de cobalto e tamanho de grão não são especificação publicada, logo não podem ser campo; e as combinações impossíveis desaparecem sozinhas — fresa de topo de HSS puro, fresa de uso geral acima de 48 HRC e fresa revestida para alumínio forjado simplesmente não têm entrada no catálogo do fabricante.

Convergência de territórios distintos. D6 se sustenta tecnicamente.

**Os dois, independentemente, devolveram a mesma lista de três correções que D6 não cobre** — e a coincidência é quase item a item:

| | A | B |
|---|---|---|
| 1 | Fator do HSS está errado: 0,29 → 0,22 | Colapsar HSS e HSS-Co numa entrada só, fator 0,25, eliminar o 0,37 |
| 2 | Fator de revestimento não pode ser universal: restringir por material | Trocar "+25% se revestida" por restrição de revestimento por material |
| 3 | O 1,25 está fazendo dois trabalhos (revestimento e pastilha-sobre-inteiriça); precisa ser desambiguado | Eliminar o 1,25 de "pastilha revestida": mistura formato de ferramenta com estado de revestimento |

Dois pesquisadores sem contato, em territórios que não se tocam, chegaram às mesmas três correções. Isso é o resultado mais forte da rodada.

---

## Resumo

Os dois retornos respondem as três questões, preenchem as Tabelas A, B e C, e classificam os sete fatores em MODELAR/DEFAULT/IGNORAR. A rodada **entrega sua resposta central**: a premissa de produto sobrevive, o substrato de fresa de uso geral vira constante, o revestimento é a variável e a forma correta no modelo é restringir opções por material — recomendação (ii), escolhida pelos dois independentemente, e granularidade (ii) no fechamento, também pelos dois.

O que ela **não entrega** é a tabela de composição de substrato de quatro fabricantes pedida na Questão 2a. Nenhum dos dois preencheu, e os dois declararam `LACUNA`. Como os territórios não se sobrepõem, a dupla falha é ela própria um achado: o dado não existe em forma publicada nem em norma/literatura nem em catálogo.

O que **impede o canônico** são cinco linhas específicas: dois números sem fonte em A (o ganho de vida "2× a 10×" e o par "150 vs 107 m/min"), o rótulo `CONSENSO` inflado sobre o `E` = 580 GPa, os números da CERATIZIT em B sem localizador, e uma divergência de conclusão sobre o status do fator 1,25. Nenhuma delas derruba a resposta central; todas são corrigíveis por rebaixamento de rótulo e supressão de linha, sem nova pesquisa.

---

## Achados por portão

| Portão | Selo | Achado | O que fazer |
|---|---|---|---|
| **G1 Cobertura** | `OK` | Os dois cobrem Q1 (a–e), Q2 (a–f), Q3 e as três tabelas. Q2 pedia tentar derrubar a premissa com evidência: A apresenta dado medido (NPL, Shah & Ghosh) e reporta honestamente que a redação da premissa é parcialmente falsa; B apresenta limites indiretos e declara sem ser perguntado que confirmou por ausência, não por medição. Nenhum concordou sem apresentar base. Recomendação com critério entregue em Q1e, Q2d-3 e Q3 pelos dois. | Nada. A única questão não fechada (composição de 4 fabricantes, Q2a) está declarada como lacuna pelos dois — vai para §4 do canônico. |
| **G2 Fonte** | `BLOQUEIA` (3 itens) | A maioria dos números é rastreável: DOIs (Doi 1970, Okamoto 2005, Liang 2018, Baowan 2016, Dewes & Aspinwall 1997, IJAMT 2017), URLs de norma e de relatório do NPL, URLs de catálogo por página em B. **Três grupos não são:** o ganho de vida "2× a 10×" (A, linha 673) e o par "150 vs 107 m/min" (A, linha 678) aparecem sem citação nenhuma; os números da CERATIZIT (B, linhas 220/224/251) não têm URL em lugar nenhum do retorno, a CERATIZIT não consta da lista de território de B nem da lista de fontes, e B ainda registra que o documento técnico da CERATIZIT não abriu. | Suprimir os três do canônico. Ver "Itens que BLOQUEIAM". |
| **G3 Confiança** | `BLOQUEIA` (1 item) | Rótulos presentes e, no geral, bem aplicados — inclusive com autocrítica (A rebaixa a própria matriz de Q1 para `SEM CONSENSO`; B usa `REFERÊNCIA ÚNICA tendendo a CONSENSO` em vez de inflar). **Uma exceção:** o `CONSENSO` sobre `E` = 580 GPa conta três fontes que não são três medições independentes do grau de fresa — Doi 1970 é um modelo de fração volumétrica (não mede 580), Okamoto 2005 mede 577 mas em grão de 3–20 µm (fora da janela de fresa que o próprio A define como 0,4–1 µm), e Abrão 1995 é tabela de compilação de proveniência primária desconhecida, chegando por dissertação. Vilhena 2022 cita Okamoto — A corretamente não a conta. | Rebaixar para `REFERÊNCIA ÚNICA`. O valor sobrevive; o rótulo não. Ver G8 e a seção do `E`. |
| **G4 Default** | `RESSALVA` | Não achei a assinatura clássica (valor redondo repetido em várias linhas). Os dados medidos têm dispersão irregular e crível: 1574/1518/1314/1157/930 HV30; raios 0,41/0,90/1,2/1,5 µm; grão 0,424 µm; 8,4% Co. **Um padrão diferente, porém, merece registro:** A monta a tabela de conversão de ganho de vida escolhendo o valor 2,44× justamente porque ele produz exatamente o 1,25 do sistema, e conclui que "1,25 é defensável e conservador". Isso não é preenchimento por default — é justificação a posteriori de um número que a rodada existia para testar. | Não escrever "1,25 confirmado" no canônico. A defesa depende de um input sem fonte (o 2–10×) e B mostra que o denominador não existe em aço. |
| **G5 Sensibilidade** | `RESSALVA` | Quantificação presente e coerente onde há base: microfresa +266% no `fz` mínimo (MODELAR, muito acima da margem), deflexão ±6% (IGNORAR, abaixo da margem), revestimento +39% num material medido (MODELAR), substrato +14% a −16,5% em dureza (IGNORAR). **Quatro classificações saem sem o número que as sustenta:** substrato para aço endurecido em A ("não quantificado"), classe de pastilha nos dois (`LACUNA`), preparação de gume, e ângulo de hélice. Nos quatro casos a classificação é estrutural ("resolve no catálogo") ou por ausência declarada, não uma alegação de magnitude — B chega a escrever `IGNORAR` **por ausência de base, não por efeito medido pequeno**, o que é a forma honesta. | Aceitar as quatro como classificação de roteamento, não de sensibilidade, e dizer isso no canônico. Uma ressalva real: preparação de gume tem efeito grande onde se aplica (A traz IJAMT 2017: forças crescem com o raio, 5–120 µm estudados) — `IGNORAR` só vale para fresa convencional, e em microfresa o caso já é coberto pela trava de `fz` mínimo. |
| **G6 Divergência** | `RESSALVA` (achado, não defeito) | Quatro números registrados no dossiê são contestados, três deles pelos dois retornos. Ver seção própria. D1 contraditada, D2 reenquadrada, D6 confirmada. | Levar a seção "Divergências" inteira para quem escrever o canônico. Nada a corrigir nos retornos. |
| **G7 Lacunas** | `OK` | Acima da barra nos dois. A entrega Tabela C com 13 linhas mais 18 lacunas numeradas em três categorias, separando "só existe fora do meu território" de "número que eu produzi por derivação e precisa de confirmação" de "esperava achar e não achei" — inclusive listando as próprias extrapolações. B entrega Tabela C com 11 linhas mais 13 lacunas, com a frase "nenhuma célula foi preenchida por conhecimento próprio", e marca `N/V` (não verificado) separado de `NÃO ENCONTRADO`, sem deduzir célula nenhuma. | Nada. |
| **G8 Cross-check A×B** | `BLOQUEIA` (1 item) | 24 linhas confrontadas. Nenhuma divergência numérica acima da margem. Uma divergência **de conclusão**: o status do fator 1,25 de revestimento (A: "defensável e conservador"; B: "não sustenta como universal, e o denominador é fictício"). Doze linhas convergem com fontes de universos distintos — o achado mais forte que esta rodada podia produzir. | Ver tabela de confronto e "Itens que BLOQUEIAM". |

---

## Confronto A × B

Rodada em par cego com **territórios de fonte que não se sobrepõem**. Isso muda a leitura de duas situações, e a mudança está aplicada em toda a tabela:

- **"Convergem, fontes diferentes"** vale mais aqui que numa duplicata comum. As fontes vêm de universos que não se tocam — um lado só podia usar norma, handbook e artigo revisado por pares; o outro só podia usar catálogo, datasheet e guia de fabricante. Quando os dois chegam ao mesmo lugar por caminhos que não se cruzam, a chance de erro correlacionado cai muito. Marcado como `OK — convergência entre territórios`, e é o achado mais robusto que esta pesquisa consegue produzir.
- **"Só um dos dois achou"** é **esperado e não é falha**. Cada território tem dado que o outro não alcança por regra, e o pesquisador foi instruído a declarar `LACUNA` nesses casos. Classificado como `REFERÊNCIA ÚNICA`, sem penalizar o retorno.

**Nenhuma média foi feita.** Onde há divergência, ou uma fonte vence com motivo declarado, ou vira faixa, ou vira lacuna.

| # | Grandeza | Retorno A | Retorno B | Fonte de A | Fonte de B | Situação |
|---|---|---|---|---|---|---|
| 1 | **Fator `Vc` HSS / metal duro** | 0,196–0,234; recomenda **0,22** | **0,25** | Constantes de Taylor (n, C) de Groover, via notas ME478/MSU — torneamento, f 0,25 mm/volta | Kennametal, guia técnico de alargamento: HSS a cerca de um quarto da velocidade do metal duro | **Divergem dentro da margem** (13,6%) → `RESSALVA`. Faixa 0,22–0,25. Os dois matam o 0,29 |
| 2 | **Fator `Vc` HSS-Co (0,37)** | `NÃO ENCONTRADO` — a tabela de Taylor não separa graus de aço rápido | `NÃO ENCONTRADO` — nenhum catálogo publica a razão HSS × HSS-Co isolada | — | — | **Convergem em lacuna, territórios distintos** → o 0,37 é **órfão**. `BLOQUEIA` para manter o número |
| 3 | **Existe fresa de HSS puro (sem Co)?** | Não avaliado — coluna HSS-Co é `LACUNA` na Tabela A | **Não encontrada em catálogo**; só HSS-E / HSS-Co / HSS-PM | — | Dormer Pramet, OSG | **Só um achou** → `REFERÊNCIA ÚNICA` |
| 4 | **Fresa de HSS é obsoleta? (D1)** | Não — é nicho | Não — é nicho, e é HSS-Co | EPUSP PMR-2202; tese USP | Dormer Pramet, OSG (linhas vivas) | `OK — convergência entre territórios`. **Contradiz D1** |
| 5 | **Qual é o nicho da fresa HSS** | Máquina sem rotação suficiente | Material mole e série limitada; "máquina sem rotação" **procurada e não achada** | Dedução própria, declarada como tal | Kennametal | **Divergem na razão** → `RESSALVA`. B é a posição com fonte; A é dedução declarada |
| 6 | **`E` do metal duro de fresa** | **580 GPa**, erro de deflexão ±6% | `LACUNA` — recusa converter | Doi 1970 (DOI), Okamoto 2005 (DOI), Abrão 1995 via dissertação UFMG | — | **Só um achou** → `REFERÊNCIA ÚNICA`. `BLOQUEIA` no rótulo `CONSENSO` de A |
| 7 | **Dispersão de substrato (Co / grão / dureza)** | Janela de fresa 8,4–9% Co e 0,42–0,5 µm; dureza varia −16,5% entre 6% e 11% Co, −13,4% entre grão ultrafine e fine | Não publicado; limites indiretos **+14%** em HV30 e 10–12% de Co | NPL DEPC(MN)011 (2004), 6 laboratórios, incerteza declarada 0,5–0,9%; Liang 2018; Shah & Ghosh 2025 | CERATIZIT, ISCAR — **sem localizador para a CERATIZIT** | **Convergem na ordem de grandeza** (−16,5% × +14%) e na conclusão → `OK` na conclusão; `BLOQUEIA` na fonte de B |
| 8 | **Composição de substrato de 4 fabricantes (o pedido literal da Q2a)** | `LACUNA` — não existe em norma nem handbook; a ISO 513 declara a padronização impossível | `LACUNA` — não é especificação publicada; só 2 graus no mercado publicam o teor de Co | — | — | **Convergem em lacuna, territórios distintos** → o dado **não existe publicado**. Achado, não omissão |
| 9 | **Fator de revestimento 1,25** | "**Defensável e conservador**"; faixa 1,19–1,78 | "**Não sustenta como universal**"; 1,39 num único material; denominador fictício | Ganho de vida 2–10× **SEM FONTE** + conversão de Taylor | ISCAR IC08 × IC08 Coated (par publicado); Sandvik (80–90% das pastilhas são revestidas) | **DIVERGEM NA CONCLUSÃO** → `BLOQUEIA`. **B se sustenta**; a defesa de A depende de input sem fonte |
| 10 | **Sinal do revestimento em alumínio** | **NEGATIVO** — sem revestimento teve força de corte e rugosidade menores que TiAlN, a `Vc`, `f` e `ap` constantes | Fabricante **não oferece** versão revestida para alumínio forjado e cobre; AlTiN marcado como não recomendado para alumínio | Bayraktar 2018, IOP Conf. Ser. 295, 012013 (open access) | ISCAR (traço na coluna revestida); Harvey Tool | `OK — convergência entre territórios`. **Achado mais robusto da rodada** |
| 11 | **Forma correta no modelo (Q2d-3)** | **(ii)** restringir revestimentos por material | **(ii)** restringir revestimentos por material | Regra 5 do enunciado + matriz com mais `LACUNA` que célula | Catálogo publica o que é oferecido, não multiplicador | `OK — convergência entre territórios`. É o produto da rodada |
| 12 | **TiAlN 1,40 · AlCrN 1,30 · TiN 1,10 · DLC 1,50 · PCD 2,00** | `NÃO ENCONTRADO` — 5 de 5 | `NÃO ENCONTRADO` — 5 de 5; fabricante publica dureza, temperatura e atrito, nunca multiplicador de `Vc` | — | — | **Convergem, territórios distintos** → `OK`. Os cinco números caem |
| 13 | **PCD / DLC sobre ferroso** | **PROIBIDO** — afinidade química com o ferro, reversão a grafite ≈750 °C | **CONTRAINDICADO** — Harvey marca não recomendado para ferroso; DLC com teto de ~400 °C; Sandvik: PCD só não-ferroso | Tese USP / Dewes & Aspinwall | Harvey Tool, Sandvik Coromant | `OK — convergência entre territórios`. Vira **bloqueio duro**, não ausência silenciosa |
| 14 | **Fator 1,25 de "pastilha revestida"** | `NÃO ENCONTRADO`; e denuncia que o 1,25 faz **dois trabalhos** ao mesmo tempo | `LACUNA`; e denuncia que mistura **formato de ferramenta** com **estado de revestimento** | — | Sandvik (80–90% revestidas); ISCAR (a inteiriça de catálogo também é revestida) | **Convergem no diagnóstico, territórios distintos** → `OK`. O fator cai |
| 15 | **Classe de pastilha: média × classe adequada (D3)** | Classe adequada; média é **erro conceitual**, não aproximação | Classe adequada; **é o formato do próprio catálogo** — toda tabela é indexada por (grau, grupo de material) | ISO 513 (classificação por aplicação) | ISCAR, Guhring, OSG | `OK — convergência entre territórios`. Confirma a reformulação de D3 |
| 16 | **Substrato de fresa, uso geral** | `IGNORAR` | `IGNORAR` | Deflexão ±6%; nenhuma função publicada ligando substrato a `Vc`/`fz` | Nenhum multiplicador por substrato em catálogo; `Vc` indexado por material | `OK — convergência entre territórios` |
| 17 | **Exceção: aço endurecido** | Confirmada; grão <1 µm + revestido; **resolve no catálogo** | Confirmada; a linha de uso geral **para em 48 HRC** (traço no catálogo); grau dedicado ultra-fine 12% Co cobre até 62 HRC | Dewes & Aspinwall 1997 | ISCAR (catálogo e grade chart) | `OK — convergência entre territórios`. B entrega a prova comercial que A não alcança |
| 18 | **Exceção: microfresa** | Confirmada; a variável que decide **não é o substrato, é o raio de aresta**: revestir multiplica o raio 2,2×–3,7×, e o `fz` mínimo sobe **+266%** | Confirmada; o fabricante **troca o substrato** ao descer de diâmetro; raio de aresta e `h_min` são `LACUNA` | Liang 2018 (DOI 10.3390/mi9110568) + razão `h_min`/raio (Kim/Bono & Ni, Vogler, revisão 2021) | CERATIZIT (sem localizador); YG-1 (sem localizador) | **Complementares.** O número só existe em A → `REFERÊNCIA ÚNICA`. B confirma o fato comercial |
| 19 | **Exceção: alumínio** | Confirmada, e é **de revestimento, não de substrato** | Confirmada; o que muda é revestimento (ou ausência) e geometria, não substrato | Bayraktar 2018 | ISCAR, Guhring, Harvey Tool | `OK — convergência entre territórios` |
| 20 | **Nomenclatura: o que o operador lê na embalagem** | Só passam a letra/cor ISO 513 (em pastilha) e a sigla do revestimento. Co, grão e HV **não passam** | Só passam a sigla do revestimento e a classe ISO 513 do grau. Co, grão e HV **não passam** | ISO 513:2012, Tabela 5 | Harvey (códigos C1/C3/C6…), ISCAR grade chart, Guhring | `OK — convergência entre territórios`. Sustenta D6 |
| 21 | **Granularidade recomendada (Q3)** | **(ii)** metal duro com e sem revestimento, lista restrita por material | **(ii)** idem, com a condição de só oferecer revestido onde o catálogo oferece | — | — | `OK — convergência entre territórios` |
| 22 | **Preparação de gume** | `IGNORAR` em fresa convencional — mas o efeito **existe e é grande** onde se aplica (raio 5–120 µm; forças crescem com o raio) | `IGNORAR` **por ausência de base**, não por efeito medido pequeno — nada publicado em catálogo | IJAMT 2017, DOI 10.1007/s00170-017-1292-z | — | **Mesma classificação, bases opostas** → `RESSALVA`. A honestidade de B é exemplar; o dado de A é que sustenta |
| 23 | **Ângulo de hélice (30/45/60°)** | `IGNORAR` no motor — efeito >2× em vida, mas **acoplado ao revestimento**, não separável | `IGNORAR` — fabricante trata hélice (35°/37°) como recurso **antivibração**, sem multiplicador | Baowan 2016 (DOI 10.1007/s00170-016-9601-5) | ISCAR | `OK — convergência entre territórios` |
| 24 | **Broca e macho: aço rápido ainda é padrão?** | Sim nos dois; divisão por diâmetro e corte × conformação são `LACUNA` | Sim nos dois; HSS-E/PM é o padrão em macho, metal duro é linha secundária; conformação predominantemente HSS/HSS-E | EPUSP; COBEF 2015; CONEM 2010 | Guhring, OSG, Dormer, Walter, YG-1 | `OK — convergência entre territórios`. Confirma a metade de D1 que sobrevive |

**Contagem:** 12 linhas convergem entre territórios (`OK`) · 3 são `REFERÊNCIA ÚNICA` por alcance de território (esperado, não é falha) · 4 são `RESSALVA` · 1 `BLOQUEIA` por divergência de conclusão · **nenhuma divergência numérica acima da margem**.

---

## Os quatro pontos que o pedido mandou confrontar

### 1. O fator de velocidade do HSS — a compatibilidade é **parcialmente aparente**

Os dois caminhos chegam a valores próximos (0,22 × 0,25 = 13,6% de diferença, dentro da margem do modelo), mas **medem coisas diferentes, e nenhuma delas é fresamento**:

| | A | B |
|---|---|---|
| Operação da fonte | **Torneamento** (constantes de Groover, f 0,25 mm/volta, p 2,5 mm) | **Alargamento** (guia de alargamento da Kennametal) |
| Critério | Vida igualada, via `v·Tⁿ = C` — critério de fim de vida implícito do ensaio | Nenhum critério declarado — é regra de bolso publicada |
| Natureza | Cálculo derivado, aritmética exposta para conferência | Afirmação direta do fabricante |

**O que isso significa na prática:** a convergência é forte na **direção** (os dois dizem que 0,29 é alto demais) e razoável na **ordem de grandeza** (algo em torno de um quarto). Mas ela não é a confirmação cruzada que parece à primeira vista, porque nenhum dos dois números é uma razão medida em fresamento com critério de vida casado.

**Sinal de alerta adicional que reforça a cautela:** o terceiro ponto de dado de B — o cruzamento OSG (fresa HSS-Co, 24–46 m/min) × ISCAR (fresa de metal duro revestido, 200 m/min) — dá **0,12 a 0,23**, ou seja, **abaixo** de ambos. B declara honestamente que esse cruzamento mistura geometria, refrigeração e critério de vida de fabricantes diferentes, mas é o único par dos três que é de **fresa**. Se ele estiver mais perto da verdade, a razão real em fresamento é menor que 0,22.

**Recomendação para o canônico:** registrar **faixa 0,22–0,25** com a ressalva de operação, nunca um valor único "corrigido", e nunca a média. E registrar que o único par medido em fresa aponta mais baixo — é lacuna aberta, não número fechado.

**Sobre o 0,37 do HSS-Co:** os dois territórios procuraram e nenhum achou. A tabela de Taylor não separa graus de aço rápido; nenhum catálogo publica a razão HSS × HSS-Co isolada na mesma ferramenta e material. **O 0,37 é órfão** — não tem fonte em nenhum dos dois universos. Some-se a isso o achado de B de que fresa de HSS puro sem cobalto não foi encontrada à venda, e a conclusão é que as duas entradas de aço rápido do sistema estão erradas de duas formas ao mesmo tempo: uma representa uma ferramenta que não existe, e a outra carrega um número sem origem.

### 2. O efeito do revestimento — **sim, convergem na conclusão de produto**

A pergunta era: restringir por material em vez de recalibrar o número?

**Os dois respondem que sim, independentemente, e recomendam a mesma opção (ii).** E as evidências são complementares em vez de redundantes, o que é a melhor forma possível de convergência entre territórios:

- **A responde "o efeito é real e inverte de sinal"** — medição publicada em liga Al-35Zn: a fresa sem revestimento teve força de corte e rugosidade **menores** que a mesma fresa com TiAlN, a `Vc`, `f` e `ap` constantes, e a revestida favoreceu aresta postiça.
- **B responde "a combinação nem existe para comprar"** — o fabricante não oferece versão revestida para alumínio forjado, ligas de cobre e cobre eletrolítico (traço na coluna do catálogo), e marca AlTiN e AlTiN Nano como não recomendados para alumínio.

Juntas, as duas fecham as duas perguntas que importam: *o efeito é real?* (A: sim, e é negativo) e *o operador consegue sequer estar nessa situação?* (B: não pela via do catálogo, mas sim se ele tiver a ferramenta errada na gaveta).

**Critério que os dois usam é o mesmo, formulado quase igual:** A diz que com fator único o sistema comete "erro de sinal, não de magnitude"; B diz que "erro de sinal é pior que erro de magnitude". Nenhum dos dois viu o texto do outro.

**Portanto: restringir por material, não recalibrar o número.** Confirmado por convergência entre territórios, e este é o achado que mais mexe no produto. O par diamante/PCD × ferroso deve ser **bloqueio duro** — os dois insistem que ali não é "inadequado", é quimicamente inviável.

### 3. O módulo de elasticidade `E` — o status de confiança que a R6 herda

**A R6 deve herdar `E` = 580 GPa como `REFERÊNCIA ÚNICA`, não como `CONSENSO`.** Com todas as letras, e por três razões acumuladas:

1. **Não houve confirmação cruzada.** B declarou `LACUNA` e se recusou explicitamente a converter dureza e densidade em GPa sem fonte do seu território. Pela regra do G8, "só um dos dois achou" nunca vira `CONSENSO`. O número vem de um território só.
2. **O `CONSENSO` interno de A também não se sustenta.** A conta três fontes independentes, mas elas não são três medições do grau de fresa: **Doi 1970** é um modelo de fração volumétrica das fases (mede WC ≈703–707 GPa e Co ≈207 GPa, não 580); **Okamoto 2005** é medição direta (≈577 GPa) porém em grão de 3–20 µm, fora da janela de 0,4–1 µm que o próprio A define como a da fresa; **Abrão 1995** é tabela de compilação com proveniência primária desconhecida, alcançada por uma dissertação. Vilhena 2022 cita Okamoto e A corretamente não a conta como quarta.
3. **O erro de ±6% tem a ponta superior não publicada.** O limite de 610 GPa para metal duro de 6% Co é **extrapolação do próprio pesquisador** a partir da regra de Doi — A declara isso três vezes (no bloco, na Tabela C e nas Lacunas, categoria 2). Logo o ±6% é ±5,5% para baixo (medido) e −4,9% para cima (extrapolado).

**O que continua válido e é bastante:** o valor 580 GPa **tem base real** — duas fontes primárias revisadas por pares apontam para a faixa 550–580 na fração de cobalto que a fresa usa, e o argumento de que **tamanho de grão não afeta `E`** (depende só da fração volumétrica das fases) é sólido e sustenta tratar `E` como constante. B, sem dar número, oferece apoio direcional independente: os graus usados em ferramenta inteiriça se concentram numa faixa estreita de dureza (1400–1600 HV30) e densidade (14,5), o que é compatível com faixa estreita de `E`. Apoio, não confirmação.

**Redação sugerida para a R6:** `E` = 580 GPa, `REFERÊNCIA ÚNICA`, faixa plausível 550–610 GPa, erro de deflexão da ordem de **±6% com a ponta superior não verificada**. A trava de `E` pode cair como variável de entrada, mas o canônico deve registrar que a queda se apoia em um território de fonte só. Fechar isso pede uma medição publicada de `E` em WC-6Co de grão fino — está na Tabela C de A.

### 4. A premissa "substrato é commodity" — sobrevive aos dois, mas um sustenta melhor

Coberto no topo deste veredito (D2). Em uma linha: **o argumento de A (a ISO 513 declara a padronização impossível + a variação medida age sobre vida, não sobre o que a calculadora entrega) sustenta melhor a decisão**, porque é evidência positiva e quantifica a consequência; **o argumento de B (composição não é especificação publicada) sustenta melhor a implementação de D6**, porque mostra que o catálogo já é organizado por variação de mercado. B declara sozinho a fraqueza do próprio argumento: confirmação por ausência de dado, não por medição.

---

## Itens que BLOQUEIAM

Cinco. Todos são linha específica; nenhum derruba a resposta central da rodada. Nenhum exige nova rodada de pesquisa — quatro se resolvem suprimindo ou rebaixando, um exige escolher a posição que se sustenta.

| # | Item | Onde aparece | Por quê | O que fazer |
|---|---|---|---|---|
| 1 | **Ganho de vida de revestimento "2× a 10×"** | A, bloco 2d-1; repetido em 2d-5 e na Tabela B | **Sem fonte nenhuma.** A frase é "a literatura de revestimento reporta ganhos de vida tipicamente de 2× a 10×", sem citação. É o **input único** da faixa 1,19–1,78 e do "+19% a +78%" que A põe na linha **Revestimento** da Tabela B — a variável principal declarada da rodada. A declara nas Lacunas que a **conversão** (ganho^0,25) é derivação própria, mas não declara que o **intervalo de entrada** é sem origem | **Não levar "+19% a +78%" para o canônico.** A sensibilidade defensável do revestimento é o **+39%** de B, medido num material, marcado `REFERÊNCIA ÚNICA` |
| 2 | **Par "150 m/min revestido TiAlN × 107 m/min sem revestimento" → 1,40** | A, bloco 2d-1 | **Sem citação** — "um experimento citado na literatura de vida de ferramenta". O próprio A relativiza depois (um experimento, em torneamento, não base de fator), mas o número entra no texto como ponto de sustentação da faixa. Coincide exatamente com o TiAlN 1,40 da lista alternativa que a rodada foi encarregada de derrubar — coincidência que merece desconfiança, não uso | Suprimir. Não citar como ponto empírico independente |
| 3 | **Rótulo `CONSENSO` sobre `E` = 580 GPa** | A, bloco 7 e Q2c | `CONSENSO` exige três fontes de fato independentes. São um modelo (Doi), uma medição fora da janela de grão da fresa (Okamoto) e uma compilação de proveniência desconhecida (Abrão). Somado a isso, B declarou `LACUNA` — não houve confirmação cruzada. **Constante que vira fórmula na R6** (δ ∝ 1/E) | **Rebaixar para `REFERÊNCIA ÚNICA`.** O valor 580 GPa sobrevive; o rótulo não. Registrar a ponta de 610 GPa como extrapolação não publicada |
| 4 | **Números da CERATIZIT: 1400 e 1600 HV30, grão 0,5–0,8 µm, ligante ~10%** | B, tabela de 2a; base do "+14%" na Tabela B; e a linha **Substrato de microfresa** | **Sem localizador.** Não há URL em nenhum ponto do retorno; a CERATIZIT não consta nem da lista de território declarada por B nem da lista de fontes da matriz; e B registra em 2c e nas Lacunas que o documento técnico da CERATIZIT **não abriu**. São os números que sustentam a única dispersão de substrato quantificada de B. **Ressalva de escopo adicional:** o WTX-Micro é **microbroca**, e B o usa como evidência sobre **microfresa**, sem sinalizar a troca de tipo de ferramenta | Pedir o localizador ou suprimir. **A conclusão `IGNORAR` não depende disso** — sobrevive pela medição do NPL em A, que é independente e tem incerteza declarada |
| 5 | **Divergência de conclusão sobre o status do fator 1,25 de revestimento** | A 2d-1 ("defensável e conservador") × B d1 ("não sustenta como universal") | A conclusão é o produto da rodada, e aqui ela diverge. **Qual se sustenta: B.** A defesa de A é circular — escolhe o ganho de vida (2,44×) que produz exatamente o 1,25 do sistema, a partir de um intervalo de entrada sem fonte (item 1). B traz um par de catálogo publicado (180 → 250 m/min = 1,39) e um achado estrutural que A não tem: em aço, "metal duro sem revestimento" praticamente não é opção de catálogo, então **o denominador do 1,25 é fictício** | **Não escrever "1,25 confirmado".** Escrever: não existe fator universal de revestimento defensável; 1,39 é ponto único medido em um material; o denominador não existe em ferroso. Os dois concordam na **forma** do modelo (restringir por material) — essa parte não está em disputa |

**Ressalvas de fonte que NÃO chegam a BLOQUEIA**, registradas para quem escrever o canônico:

- **A — constantes de Taylor via notas de aula (ME478/MSU) reproduzindo a tabela de Groover.** A fonte primária está nomeada e é livro-texto padrão; a citação é a uma reprodução secundária. Aceitável, mas o canônico deve citar Groover, não o slide. **Ressalva maior que a da fonte:** são constantes de **torneamento** aplicadas a um fator de **fresamento**; A informa o parâmetro do ensaio mas não sinaliza a transferência de operação.
- **A — Dewes & Aspinwall 1997 alcançado por citação em tese USP**, não no original. A é transparente. Verificável em princípio.
- **A — Shah & Ghosh 2025 acessado só em nível de resumo** (texto integral em paywall). A declara e por isso não quantifica a dispersão. Os valores 0,424 µm e 8,4% Co vêm do resumo/indexação, não de leitura do artigo.
- **A — ganho de vida de diamante CVD "3–5× típico, picos de 10–20×"** aparece numa célula da matriz 2d-2 sem artigo fixado. A **declara** na Tabela C e nas Lacunas. Não subir para o canônico.
- **B — Mitsubishi TF15 (HRA 91,5, TRS 2,5 GPa, densidade 14,5) e YG-1 Miniature End Mills (`Vc` 655 SFM, `fz` 0,0001–0,0006 pol)** aparecem sem URL, embora com fabricante e linha nomeados. Recuperável, mas hoje não conferível.
- **B — matriz de revestimento × material mistura dois tipos de célula:** contraindicação **explícita** do fabricante (AlTiN em alumínio, diamante em ferroso — sourced) e "não indicado" **inferido** da ausência na lista de recomendados (TiN em alumínio). B não distingue. Só as explícitas devem virar bloqueio duro no produto.
- **B — a regra 0,25 da Kennametal vem de um guia de alargamento**, não de fresamento, e não declara critério de vida. É guia técnico do próprio fabricante, o que é fonte legítima do território, mas é regra de bolso, não tabela.

---

## Divergências com material já registrado

Cruzamento com `_referencia/DOSSIE_CALCULADORA_PARAMETROS_AUDITADO.md` e com o `HANDOFF.md` §9. **Nenhuma escolha de vencedor foi feita aqui** — quem escreve o canônico decide, com o achado na mão.

| Item registrado | Valor no dossiê | Retorno A | Retorno B | Situação |
|---|---|---|---|---|
| **§1.1.6 — fator HSS** | **0,29** | 0,22 (Taylor/Groover, torneamento) | 0,25 (Kennametal, alargamento) | **Os dois contestam.** Faixa 0,22–0,25; o único par medido em fresa aponta ainda mais baixo (0,12–0,23). Manter 0,29 faz a ferramenta de HSS rodar ~16% a ~32% acima |
| **§1.1.6 — fator HSS-Co** | **0,37** | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` | **Órfão nos dois territórios.** B acrescenta que fresa de HSS puro não foi achada à venda — a entrada, não só o número, é suspeita |
| **§1.1.6 — metal duro** | **1,00** (referência) | Correto como referência | Não contestado | `OK` — único dos quatro que sobrevive intacto |
| **§1.1.6 — pastilha** | **1,25** | `NÃO ENCONTRADO`; o 1,25 faz dois trabalhos ao mesmo tempo | `LACUNA`; mistura formato de ferramenta com estado de revestimento | **Os dois contestam a formulação, não só o número.** O fator não tem base nem significado bem definido |
| **§8.2.8 — revestimento vale 25% de `Vc`, só na fresa inteiriça** | **+25% universal** | Ganho seletivo; **negativo** em alumínio com TiAlN | Ganho seletivo; versão revestida **não é oferecida** em alumínio forjado e cobre | **Os dois derrubam a universalidade.** Correção convergente: restringir por material, não recalibrar |
| **§8.3.3 — TiAlN 1,40 · AlCrN 1,30 · TiN 1,10 · DLC 1,50 · PCD 2,00** | candidatos não decididos | `NÃO ENCONTRADO` nos cinco | `NÃO ENCONTRADO` nos cinco | **Convergência entre territórios: os cinco números não têm origem.** Recomendação: descartar a lista inteira, não decidir sobre ela |
| **§8.1.6 / PLAN_MOTOR — `E` do metal duro** | "500–650 GPa; variação entre graus grande demais para um número redondo" | **580 GPa**, faixa de fresa 550–610, erro ±6% | `LACUNA` | **A resolve um item aberto do dossiê**, mas como `REFERÊNCIA ÚNICA`. A objeção registrada ("variação grande demais") é respondida por A: a faixa ampla só se abre porque inclui graus de 20–25% Co, que fresa não usa |
| **§1.1.7 / §8.2.7 — campo "material da ferramenta" removido (D6)** | decidido 15/08 | Confirma; nenhuma variação de substrato passa no teste da embalagem | Confirma; o catálogo do fabricante já é organizado assim | **Convergência entre territórios.** D6 se sustenta |
| **HANDOFF §9 D1 — fresa de HSS é obsoleta** | premissa do Mestre | Não é obsoleta, é nicho | Refutada como obsoleta; e o que sobreviveu é HSS-Co, não HSS | **CONTRADITA pelos dois.** Vai ao Mestre |
| **HANDOFF §9 D2 — substrato é commodity** | premissa do Mestre | Decisão sobrevive; **a redação é parcialmente falsa** (substratos comerciais medidos diferem) | Decisão sobrevive; confirmada por **ausência de dado**, não por medição | **Reenquadrada pelos dois.** Trocar a justificativa, manter a decisão |
| **HANDOFF §9 D3 — pastilha, fator médio resolve** | reformulado no prompt | Média é erro conceitual; classe adequada é o correto | Classe adequada é o formato do próprio catálogo | **A reformulação do prompt está confirmada** pelos dois |

---

## O que entra no canônico como lacuna declarada (§4)

Consolidado dos dois retornos. Itens marcados **[convergente]** foram declarados como lacuna pelos **dois** territórios — nesses, a ausência é achado, não falha de busca: o dado não existe em forma publicada acessível.

1. **[convergente] Composição de substrato de fresa de uso geral (teor de Co, tamanho de grão, dureza) por fabricante.** Era o pedido literal da Q2a. Nem norma/handbook nem catálogo publicam. A ISO 513 declara na Introdução que padronizar os materiais de corte por suas características é impossível; o catálogo só publica classe qualitativa de grão. **Fechar exigiria ensaio próprio** — nenhuma fonte documental resolve.
2. **[convergente] Fator de `Vc` do HSS-Co (M35/M42) sobre HSS comum (M2).** O 0,37 do sistema fica sem origem nos dois territórios.
3. **Razão HSS × metal duro medida em fresamento**, com critério de vida casado. Os dois números disponíveis (0,22 e 0,25) vêm de torneamento e de alargamento.
4. **[convergente] Fator por par revestimento × material.** A matriz tem mais lacuna que célula nos dois retornos; o catálogo publica dureza, temperatura e atrito, nunca multiplicador de `Vc`.
5. **[convergente] Dispersão de `Vc` entre classes ISO 513 para o mesmo material**, e o fator resultante da formulação "classe adequada ao material selecionado".
6. **[convergente] Razão de `Vc` entre fresa inteiriça de metal duro e ferramenta com pastilha revestida.** Além de faltar o número, os dois apontam que a formulação do fator está errada na origem.
7. **[convergente] Efeito do revestimento sobre a vida a `Vc` constante.** Catálogo publica só `Vc`; o lado acadêmico não fixou artigo com o par de números.
8. **`E` do metal duro de fresa: 580 GPa é `REFERÊNCIA ÚNICA`, de um território só.** A ponta superior (610 GPa para 6% Co) é extrapolação não publicada. Fechar pede medição de `E` em WC-6Co de grão fino.
9. **[convergente] Divisão prática HSS × metal duro em broca**, por faixa de diâmetro e por material usinado. Catálogos listam as duas linhas sem publicar a fronteira.
10. **[convergente] Substrato padrão de macho e a diferença corte × conformação** em números de `Vc` ou vida.
11. **`Vc` e `fz` para fresa de aço endurecido por faixa de HRC**, e o delta atribuível **só ao substrato** (mesma ferramenta, mesmo material, trocando o grau).
12. **Raio de aresta obtenível e espessura mínima de cavaco em microfresa** medidos em ferramenta comercial — o número existe em um território só (Liang 2018) e não foi confirmado pelo outro.
13. **Efeito quantificado de preparação de gume e de ângulo de hélice** sobre `Vc` ou `fz`. Os dois classificam `IGNORAR`, um por acoplamento não separável, outro por ausência de base.
14. **Sigla de revestimento impressa na embalagem como garantia.** Prática confirmada por catálogo, mas nenhuma norma de marcação foi localizada obrigando-a — e é sobre essa sigla que a recomendação (ii) apoia o campo do operador.
15. **Células não verificadas da Tabela A:** fresa de rosca, fresa toroidal e esférica em detalhe, coluna HSS-Co em várias linhas, PCD em broca helicoidal, barra de mandrilar em HSS. Nenhum dos dois deduziu célula; ficam explicitamente não verificadas.

---

## Fecho

Os dois retornos são bons, e de tipos diferentes de bom. **A** tem a evidência medida, a aritmética exposta para conferência e a disciplina rara de listar as próprias derivações como lacunas — e comete o erro oposto ao esperado: em vez de esconder, quantifica demais, chegando a construir uma faixa sobre um input que não tem origem. **B** tem a prova comercial que decide desenho de produto (o que o fabricante oferece, o que ele recusa, onde a coluna vira traço) e a honestidade de declarar que confirmou a premissa central por ausência de dado, não por medição — declaração que ninguém pediu e que muda como o canônico deve ser escrito.

O par cego cumpriu o que prometia. **Doze linhas convergiram entre universos de fonte que não se tocam**, incluindo as três correções de produto que os dois devolveram de forma quase idêntica sem contato entre si. Nenhuma divergência numérica passou da margem. A única divergência de conclusão está isolada, nomeada, e tem vencedor declarado com motivo.

O canônico pode ser escrito. Precisa suprimir cinco linhas, rebaixar um rótulo, e carregar faixa onde os retornos carregaram ponto.
