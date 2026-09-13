# Canônico — Ferramentas, Substratos e Revestimentos

> **Nomenclatura (27/08/2026).** Nos textos de produto o nome da indústria vem primeiro e o símbolo entre parênteses. Ver `Docs_inicial/referencia/GLOSSARIO_DE_TERMOS.md`. Este canônico é fonte técnica: fórmulas e tabelas mantêm o símbolo.

> ⚠ **Decisão de produto de 27/08/2026 (bloco de decisão, Q18).** O **revestimento saiu do produto** — não existe campo de revestimento, lista de revestimento nem fator de revestimento no cálculo. A ferramenta é nomeada só pelo tipo e pelo substrato, e "metal duro" já significa a ferramenta revestida adequada ao material. As seções §1.3, §1.4, §1.5, §5.3 e §5.4 abaixo descrevem a apuração da pesquisa (multiplicador não existe; restrição por material seria a forma correta *se* houvesse feature de revestimento) — ficam como **registro da evidência de que o multiplicador foi checado e não existe**, não como especificação viva. A contraindicação diamante/PCD sobre ferroso não vira bloqueio na tela: essa ferramenta não é catalogada para ferroso. Ver `escopo/E7_ESCOPO_E_FRONTEIRAS.md` §3.

**Status:** fonte única de verdade sobre que ferramentas o sistema representa e que material de ferramenta ele modela. O que a pesquisa apurou sobre revestimento fica como registro (ver nota acima).
**Precedência:** este documento vence qualquer tabela de material de ferramenta ou fator de revestimento registrada antes dele. Onde uma regra anterior conflitar com o que está aqui, vale este documento.
**Origem:** rodada de pesquisa R3, executada em **par cego** — dois pesquisadores independentes, sem contato entre si, restritos a territórios de fonte que não se sobrepõem: um só podia citar norma, handbook e artigo revisado por pares; o outro só podia citar catálogo, datasheet e guia de fabricante. Retornos de 18/08/2026, auditados em par cego em 18/08/2026 — veredito `APROVADO COM RESSALVAS`, 5 itens bloqueados e mantidos fora deste canônico.
**Regra:** No Invention — nenhum número entra sem fonte citada.

---

## O que o par cego produziu

Vinte e quatro grandezas foram confrontadas entre os dois territórios. **Nenhuma divergência numérica passou da margem do modelo.** Doze linhas convergiram entre universos de fonte que não se tocam — o achado mais robusto que esta pesquisa consegue produzir, porque erro correlacionado exigiria que norma e catálogo errassem juntos, do mesmo jeito.

O resultado mais forte da rodada não é um número: os dois pesquisadores, sem contato e em territórios distintos, devolveram **as mesmas três correções de produto**, quase item a item.

| # | A correção que os dois devolveram |
|---|---|
| 1 | O fator de velocidade do aço rápido está errado, e a entrada de aço rápido precisa ser repensada — não só o número |
| 2 | O fator de revestimento **não pode ser universal**: a correção é restringir opções por material, não recalibrar o multiplicador |
| 3 | O fator atribuído a "pastilha revestida" faz **dois trabalhos ao mesmo tempo** — mistura formato de ferramenta com estado de revestimento |

---

## 1. Regras e fórmulas

### 1.1 O substrato não entra no cálculo — e a razão importa

**Regra:** o substrato de fresa de uso geral é **constante do sistema**, não entrada do operador. Classificação: `IGNORAR`.

A justificativa correta **não é** que o substrato seja uniforme entre fabricantes. Ele não é: medição de substratos de fresas comerciais diferentes encontrou tamanho de grão e teor de cobalto diferentes, com efeito mensurável no desgaste de flanco. A formulação que resiste tem três partes, e todas as três precisam estar presentes:

1. **A variação existe**, mas age sobre **vida e desgaste** — não sobre as grandezas que o sistema entrega (rotação, avanço, potência, deflexão).
2. **Não existe vocabulário pelo qual o operador pudesse informá-la.** A norma internacional de classificação de material de corte declara na sua própria introdução que padronizar esses materiais por características é impossível, e por isso classifica **por aplicação**, não por composição.
3. **Onde o substrato toca uma grandeza calculada — a deflexão — o efeito é ±6%**, abaixo da margem declarada do modelo (±15–25%).

> **Nota de redação, deliberada.** A formulação anterior do projeto dizia que o substrato é "commodity, com pouquíssima variação entre fornecedores". Escrever isso como fato cria dívida: cai na primeira contestação de quem abrir a medição publicada. A decisão sobrevive; a justificativa foi trocada.

### 1.2 Aço rápido — a entrada está errada antes do número

**Fresa de aço rápido não é obsoleta: é nicho.** Os dois territórios contradisseram a premissa de obsolescência, e convergiram — um por livro-texto e tese, o outro por catálogo vivo de dois fabricantes independentes que mantêm famílias de fresa em aço rápido com dados de corte publicados.

**Mas o que sobreviveu no mercado não é aço rápido comum — é aço rápido ao cobalto ou sinterizado (HSS-E / HSS-Co / HSS-PM).** Fresa de topo em aço rápido **sem cobalto** foi procurada em catálogo e **não encontrada à venda**.

Consequência direta: das duas entradas de aço rápido que o sistema anterior oferecia, **a primeira representa uma ferramenta que não está à venda**, e a segunda tem fator sem origem — ver §2.1.

**O nicho declarado por fabricante é material mole (alumínio, plástico) e série limitada onde a vida importa menos.** A hipótese de que o nicho seria "máquina sem rotação suficiente" foi levantada por dedução, declarada como dedução pelo próprio pesquisador, procurada em catálogo pelo outro território e **não encontrada**. Não entra como fato.

### 1.3 Revestimento — restringir por material, nunca multiplicar

**Não existe fator universal de revestimento defensável.** A regra anterior — revestimento vale +25% de velocidade, universalmente — cai por três vias independentes:

1. **O ganho é seletivo por material**, não constante.
2. **Em alumínio o efeito inverte de sinal.** Medição publicada com velocidade, avanço e profundidade constantes encontrou ferramenta **sem revestimento** com força de corte e rugosidade **menores** que a revestida com TiAlN. Independentemente, o outro território registrou que fabricante **não oferece** versão revestida para alumínio forjado e cobre, e marca AlTiN como não recomendado para alumínio. Convergência entre territórios.
3. **O denominador do fator é fictício em material ferroso.** Em aço, "metal duro sem revestimento" praticamente não é opção de catálogo — a grande maioria das ferramentas de catálogo já sai revestida. Um multiplicador "se revestida" pressupõe uma alternativa não revestida que o operador não tem como comprar.

**A forma correta no modelo:** restringir a lista de revestimentos oferecidos por material usinado. Foi a recomendação escolhida pelos dois pesquisadores de forma independente, e é o produto desta rodada.

**Bloqueio duro, não ausência silenciosa:** diamante e PCD sobre material ferroso é **proibido**, não apenas desaconselhado — há afinidade química com o ferro e reversão do diamante a grafite em torno de 750 °C. Convergência entre territórios. O sistema deve bloquear a combinação e dizer por quê, em vez de simplesmente não a listar.

> **Distinção que precisa sobreviver à implementação:** contraindicação **explícita** do fabricante (AlTiN em alumínio, diamante em ferroso) vira bloqueio. "Não indicado" **inferido** da ausência numa lista de recomendados não vira bloqueio — vira apenas ausência de oferta.

### 1.4 Formato de ferramenta e estado de revestimento são eixos separados

O fator atribuído a "pastilha revestida" foi diagnosticado pelos dois territórios como **fazendo dois trabalhos ao mesmo tempo**: ele mistura o formato da ferramenta (pastilha intercambiável × inteiriça) com o estado de revestimento. Como a ferramenta inteiriça de catálogo **também** é revestida, o fator não tem significado bem definido.

**Regra:** os dois eixos são independentes e não podem compartilhar um multiplicador.

### 1.5 Classe de pastilha — a adequada ao material, nunca a média

Usar um fator médio entre classes é **erro conceitual, não aproximação**. A norma classifica material de corte por aplicação, e o catálogo inteiro é indexado por par (grau, grupo de material) — a média entre classes corresponde a uma ferramenta que não existe. Convergência entre territórios.

### 1.6 As exceções em que o material de ferramenta volta a importar

| Exceção | O que muda | Onde se resolve |
|---|---|---|
| **Aço endurecido** | A linha de uso geral de catálogo **para em 48 HRC**; acima disso existe grau dedicado, de grão ultrafino, que cobre até 62 HRC | No catálogo de ferramentas, como entrada própria — não como campo de substrato |
| **Microfresa** | A variável que decide **não é o substrato, é o raio de aresta**: revestir multiplica o raio de aresta por 2,2× a 3,7×, e a espessura mínima de cavaco sobe **+120% a +270%** — muito acima da margem do modelo. Fabricante troca o substrato ao descer de diâmetro | Trava de avanço mínimo por dente, não campo de substrato |
| **Alumínio** | O que muda é **revestimento (ou a ausência dele) e geometria**, não substrato | Restrição de revestimento por material (§1.3) |

---

## 2. Constantes e tabelas

Cada linha tem fonte e confiança próprias. Não existe confiança por tabela.

### 2.1 Fator de velocidade por material de ferramenta

| Material de ferramenta | Fator registrado antes | O que a pesquisa encontrou | Confiança |
|---|---|---|---|
| Aço rápido | 0,29 | **0,22–0,25** — faixa, não ponto. Os dois territórios contestam o 0,29, por caminhos independentes | `REFERÊNCIA ÚNICA` em cada ponta |
| Aço rápido ao cobalto | 0,37 | **`NÃO ENCONTRADO` nos dois territórios** — o número é órfão | — |
| Metal duro inteiriço | 1,00 (referência) | **Sobrevive intacto.** Único dos quatro não contestado | `OK` |
| Pastilha revestida | 1,25 | **Não confirmado, e a formulação está errada na origem** — ver §1.4 | — |

**Sobre a faixa 0,22–0,25 — a compatibilidade é parcialmente aparente, e isso precisa ser dito.** Os dois valores diferem em 13,6%, dentro da margem. Mas um vem de constantes de vida de ferramenta medidas em **torneamento**, e o outro de uma regra de bolso publicada em guia de **alargamento**. Nenhum dos dois é fresamento. **O único par medido em fresa aponta mais baixo: 0,12–0,23.** Manter o 0,29 faz a ferramenta rodar entre ~16% e ~32% acima do que a evidência sustenta.

### 2.2 Módulo de elasticidade do metal duro

| Grandeza | Valor | Confiança |
|---|---|---|
| `E` do metal duro de fresa (grão fino, 6–11% de cobalto), **faixa medida** | **560–624 GPa** | `CONSENSO` (3 linhagens independentes, mesmo método declarado) |
| `E`, **valor único** para uso no cálculo | **580 GPa** | decisão de engenharia dentro de 570–585 — **não é número publicado** |

**Rótulo elevado pela R6-V — e por que a elevação é legítima.** A auditoria da R3 rebaixou este item para `REFERÊNCIA ÚNICA` com razão: das três fontes de então, uma era um **modelo** de fração volumétrica (não uma medição de 580), outra media 577 em tamanho de grão **fora** da janela de fresa, a terceira era compilação de proveniência desconhecida, e o outro território declarou `LACUNA`.

A R6-V não reciclou aquelas fontes — trouxe outras três, com **localizador de página e método declarado**: CERATIZIT *p-line* p.22, Kennametal p.9, NPL *Good Practice Guide* No. 20 eq.44 p.68. Todas medem por **ressonância dinâmica macroscópica** (ISO 3312 / EN 23312), com dispersão ≤3,2% na faixa de fresa. `VALIDACAO_R6V.md` G3 confirma a contagem de três linhagens — NPL e Doi contam como **uma só** (a eq. 44 do NPL é o ajuste de Doi), e CERATIZIT e Kennametal são independentes das duas — e conclui: *"Manter `CONSENSO` em Q1."*

**A confirmação foi cega.** O enunciado da R6-V omitiu de propósito o 580 GPa registrado aqui. O território primário chegou ao mesmo número por caminho totalmente diferente (tabela de grau de fabricante + correlação de instituto de metrologia, contra modelo de fração volumétrica + Okamoto). É o que o par cego existe para produzir.

**O `CONSENSO` cobre a faixa e o método, não a tabela grau a grau.** Os valores por grau individual (646 a 4,2% Co, 624 a 6%, 512 a 15%) vêm de **um fabricante só** — `VALIDACAO_R6V.md` os registra como `RESSALVA`: *"Não é confirmação cruzada — é resposta de um território só."* Ver a tabela por grau em `CANONICO_DEFLEXAO_E_VIDA.md` §2.1, onde ela é `REFERÊNCIA ÚNICA`.

**A faixa antiga 550–610 sai.** Os 610 eram extrapolação não publicada, declarada como tal pelo próprio pesquisador; a CERATIZIT publica **624 GPa a 6% Co** (CTS12D e CTF12E), acima daquela ponta. O piso passa a 560 GPa (Kennametal K3833, 11% Co).

Isso resolve uma objeção registrada antes no projeto ("a variação entre graus é grande demais para um número redondo"): a faixa ampla de 500–650 GPa só se abre porque inclui graus de 20–25% de cobalto, que fresa não usa. Dentro da janela de fresa, a faixa fecha.

> ⚠️ **Para a rodada de rigidez e deflexão:** a faixa entra como `CONSENSO`, mas o **580 é escolha de engenharia**, não constante medida, e a deflexão é inversamente proporcional a ele. Fixar 580 erra `δ` entre −6,4% e +7,6% na janela de 6–12,5% Co — dentro da margem ±15–25% do modelo.

### 2.3 O que **não** entrou nesta tabela

Cinco itens foram bloqueados pela auditoria e **não constam deste canônico**:

- **A faixa de ganho de vida por revestimento e o "+19% a +78%" derivado dela.** O intervalo de entrada (2× a 10×) apareceu sem fonte nenhuma, e era o input único de toda a faixa. A sensibilidade defensável do revestimento é o **+39%** medido num único material, marcado `REFERÊNCIA ÚNICA`.
- **Um par de velocidades revestido × não revestido citado sem referência.** Coincidia exatamente com um dos números da lista que esta rodada existia para testar — coincidência que merece desconfiança, não uso.
- **Os cinco multiplicadores por tipo de revestimento** (TiAlN, AlCrN, TiN, DLC, PCD) que estavam em avaliação: **`NÃO ENCONTRADO` nos dois territórios, cinco de cinco**. Fabricante publica dureza, temperatura de trabalho e coeficiente de atrito — nunca multiplicador de velocidade. Recomendação: descartar a lista inteira, em vez de decidir entre eles.
- **Números de dureza e composição de um fabricante citados sem localizador**, e usando dado de microbroca como evidência sobre microfresa. A conclusão que eles sustentavam sobrevive por medição independente com incerteza declarada.
- **A afirmação de que o fator de revestimento de 1,25 estaria "confirmado".** A defesa era circular: escolhia o ganho de vida que produzia exatamente o 1,25 já existente, a partir de um intervalo sem fonte.

---

## 3. O que foi decidido pelo Mestre

**Confirmadas pela pesquisa:**

- **Substrato embutido na identidade da ferramenta no catálogo, sem campo próprio** (decisão de 15/08/2026) — **confirmada pelos dois territórios**. Nenhuma variação de substrato passa no teste "o operador consegue ler na embalagem": teor de cobalto, tamanho de grão e dureza não são especificação publicada. Só a sigla do revestimento e a classe de aplicação passam — e a classe só existe em pastilha, não em fresa inteiriça. Um dos territórios acrescenta a prova comercial: o catálogo do fabricante **já é organizado exatamente assim**, uma entrada por variação real de mercado, e em nenhum momento pede que o usuário declare a composição.
- **Classe adequada ao material, em vez de fator médio entre classes** — confirmada pelos dois. Ver §1.5.

**Reenquadrada:**

- **"Substrato é commodity, revestimento é a variável."** A **decisão sobrevive**; a **redação não**. Ver a nota da §1.1. A consequência prática é idêntica — o substrato vira constante do sistema — mas a justificativa passa a ser a indeclarabilidade, não a uniformidade.

**Contraditada — precisa da sua decisão:**

- **"Fresa de aço rápido é obsoleta; o aço rápido sobrevive em broca e macho, não em fresa."** **Contraditada pelos dois territórios**, de universos de fonte que não se tocam: existe linha viva de fresa em aço rápido em catálogo corrente de dois fabricantes independentes, com dados de corte publicados. A metade da decisão que sobrevive é a outra: em broca e macho o aço rápido **continua padrão**, confirmado pelos dois.

  **A decisão que fica com você tem três saídas, e elas não são equivalentes:**

  1. **Manter aço rápido no produto, corrigido** — uma entrada só (aço rápido ao cobalto), fator na faixa 0,22–0,25, eliminando a entrada de aço rápido comum, que representa ferramenta não encontrada à venda.
  2. **Tirar aço rápido do escopo de fresamento** — coerente com a decisão original, mas o operador de oficina pequena que tem a ferramenta na gaveta fica sem cálculo.
  3. **Manter as duas entradas como estão** — a única que a evidência não sustenta.

  Esta decisão conecta com a pendência aberta no canônico de limites e alertas: se o aço rápido está no escopo, o piso de velocidade precisa acomodá-lo, porque o catálogo corrente de fresas em aço rápido ao cobalto tem cinco de seis grupos abaixo de 50 m/min.

---

## 4. Lacunas declaradas

Itens marcados **[convergente]** foram declarados como lacuna pelos **dois** territórios. Nesses, a ausência é **achado, não falha de busca**: o dado não existe em forma publicada acessível, nem do lado da norma nem do lado do catálogo.

| # | Lacuna | O que fecharia |
|---|---|---|
| 1 | **[convergente]** Composição de substrato de fresa de uso geral por fabricante (cobalto, grão, dureza). Era o pedido literal da rodada | **Ensaio próprio.** Nenhuma fonte documental resolve — a norma declara a padronização impossível e o catálogo só publica classe qualitativa |
| 2 | **[convergente]** Fator de velocidade do aço rápido ao cobalto sobre o aço rápido comum | Ensaio ou publicação de fabricante que separe os dois graus |
| 3 | Razão aço rápido × metal duro **medida em fresamento**, com critério de vida casado | Os dois números disponíveis vêm de torneamento e de alargamento; falta o de fresa |
| 4 | **[convergente]** Fator por par revestimento × material | Nenhum fabricante publica multiplicador de velocidade por revestimento |
| 5 | **[convergente]** Dispersão de velocidade entre classes de aplicação para o mesmo material | — |
| 6 | **[convergente]** Razão de velocidade entre fresa inteiriça e ferramenta com pastilha — e a formulação do fator está errada na origem | Ver §1.4 |
| 7 | **[convergente]** Efeito do revestimento sobre a **vida** a velocidade constante | Catálogo publica só velocidade; o lado acadêmico não fixou artigo com o par de números |
| 8 | Módulo de elasticidade: a **faixa** 560–624 GPa (6–11% Co) é `CONSENSO` — três linhagens independentes, método declarado, confirmada por par cego (§2.2). O que continua `REFERÊNCIA ÚNICA` é o **valor grau a grau** (um fabricante). O **580 GPa** usado no cálculo é decisão de engenharia dentro de 570–585, não número publicado | Segunda fonte independente para os valores por grau |
| 9 | **[convergente]** Divisão prática aço rápido × metal duro em **broca**, por faixa de diâmetro e material usinado | Não fecha, mas **muda de forma (R8, emenda A9, M17):** a divisão que falta não é só de substrato (HSS × MD), mas de **classe dentro do metal duro** (broca de uso geral × alto desempenho, com diferença de 1,3–2,7× no avanço; `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §2.1 e §3.3) |
| 10 | **[convergente]** Substrato padrão de macho, e a diferença entre macho de corte e de conformação em números | **Fecha parcialmente (R8, emenda A8, M7, M8):** resolvida pela §2.2 de `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` (macho de corte 10–18 m/min em 1045; conformação 45,1 m/min; razão 2,5–3×). Continua aberta apenas a parte de macho de metal duro em aço (lacuna L-F) |
| 11 | Velocidade e avanço para fresa de aço endurecido por faixa de dureza, e o delta atribuível **só ao substrato** | Mesma ferramenta, mesmo material, trocando o grau |
| 12 | Raio de aresta obtenível e espessura mínima de cavaco em microfresa, medidos em ferramenta comercial | O número existe em um território só e não foi confirmado pelo outro |
| 13 | Efeito quantificado de preparação de gume e de ângulo de hélice | Os dois classificam `IGNORAR`, um por acoplamento não separável do revestimento, outro por ausência de base |
| 14 | Sigla de revestimento impressa na embalagem **como garantia** | Prática confirmada por catálogo, mas nenhuma norma de marcação obriga — e é sobre essa sigla que a interface se apoia |
| 15 | Células não verificadas da matriz ferramenta × substrato: fresa de rosca, toroidal e esférica em detalhe, aço rápido ao cobalto em várias linhas, PCD em broca helicoidal, barra de mandrilar em aço rápido | Nenhum dos dois deduziu célula. Ficam explicitamente não verificadas |

**Nota de método da auditoria, que vale registrar:** o auditor conferiu **rastreabilidade** das citações — se o número tem origem nomeada e localizável — mas não abriu as fontes externas para checar conteúdo. Onde marcou bloqueio por fonte, o defeito é **ausência de localizador**, não prova de dado falso.

---

## 5. Consequências

1. **Duas das quatro entradas de material de ferramenta saem ou mudam.** A de aço rápido comum representa ferramenta não encontrada à venda; a de pastilha revestida tem fator sem significado bem definido. Só o metal duro inteiriço sobrevive intacto.

2. **O campo de material de ferramenta continua fora da tela** — e agora com justificativa que resiste a contestação. Não é que o substrato não varie: é que a variação não é declarável, e não entra no que o sistema calcula.

3. **O revestimento deixa de ser multiplicador e vira filtro.** A lista de revestimentos oferecidos passa a depender do material usinado. Isso muda o desenho do catálogo, não só uma constante.

4. **Uma combinação passa a ser bloqueada com explicação:** diamante e PCD sobre material ferroso. Bloqueio, não omissão silenciosa — o operador precisa saber por que a opção não está lá.

5. **A rodada de rigidez e deflexão usa a faixa `CONSENSO` de `E`** (560–624 GPa na janela de 6–11% Co, §2.2), com **580 GPa** fixado como decisão de engenharia. A deflexão é inversamente proporcional a `E`; fixar 580 erra `δ` entre −6,4% e +7,6% na janela de uso — dentro da margem ±15–25% do modelo (`CANONICO_DEFLEXAO_E_VIDA.md` §2.1).

6. **A microfresa não se resolve por substrato.** Se o produto for cobrir diâmetros pequenos, o que decide é o raio de aresta e a espessura mínima de cavaco — a mesma trava que o canônico de limites e alertas estabelece.

7. **Cinco multiplicadores por tipo de revestimento que estavam em avaliação não existem em fonte nenhuma.** A recomendação é descartar a lista inteira, e não escolher entre eles.
