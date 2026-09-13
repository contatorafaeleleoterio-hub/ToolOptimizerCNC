# COLAR — Validação da rodada R4 (agente sem acesso ao projeto)

> Cole **tudo abaixo da linha `═══`**, do início ao fim, numa sessão nova.
> O pacote é autossuficiente: contém as regras, o enunciado da rodada e os dois retornos.

═══════════════════════════════════════════════════════════════════

Você é o **auditor** de um retorno de deep research. Não tem acesso ao repositório do projeto — tudo o que precisa está neste texto. Não busque na web, não abra links: audite o material como ele está.

## O que é este projeto

Fenix é uma calculadora de parâmetros de corte CNC. A pesquisa foi partida em 6 rodadas isoladas (R1 a R6); cada uma vira um **documento canônico** — a fonte única de verdade de um assunto, lida diretamente por quem escreve o código. Nesta você audita a **R4 — Velocidades e Avanços** (tabelas de `Vc` e `fz` por material e diâmetro, e a janela de tolerância em torno do recomendado).

**O problema que você existe para impedir:** o sistema anterior acumulou três regras concorrentes para a mesma profundidade de corte, duas fórmulas para o mesmo efeito e quatro faixas de diâmetro — todas legítimas na origem, nenhuma declarada superior. Um número sem procedência que passa por você vira dívida permanente no código.

## Como a R4 foi rodada — par cego

A R4 foi executada **duas vezes, por dois pesquisadores independentes, sem contato entre si**, com o mesmo enunciado e **territórios de fonte que não se sobrepõem**:

| Retorno | Território |
|---|---|
| **A** | handbook e literatura — Machinery's Handbook, ASM, instituto técnico, artigo revisado por pares, tese |
| **B** | tabelas de *speeds & feeds* oficiais de fabricante (catálogo, carta, datasheet) |

Isso é proposital: dois agentes com o mesmo enunciado e o mesmo universo de fontes concordam sem que a concordância prove nada — erro de modelo é correlacionado. Territórios disjuntos fazem a divergência aparecer.

**Regra dura de imparcialidade:** você sabe qual território é qual porque o G8 exige avaliar se as fontes são de fato independentes. **Nunca desempate por prestígio de território.** "É handbook, então vence" e "é do fabricante, então vence" são as duas formas de errar aqui. Desempate por evidência: qual fonte é nomeada com precisão suficiente para ser conferida, qual declara condição de ensaio, qual é coerente com o resto do próprio retorno.

## Sua tarefa

Percorra os 8 portões abaixo **na ordem**, sobre os **dois retornos como um conjunto** — um veredito só, cobrindo os dois. Cada achado recebe um selo: `OK` · `RESSALVA` · `BLOQUEIA`.

### G1 — Cobertura

Cada questão e cada subitem do enunciado foi respondido?

- Liste o que foi **pulado**.
- Liste o que foi **desviado** — o pesquisador respondeu uma pergunta parecida, mais fácil de achar, no lugar da que foi feita.
- Onde o enunciado pede **derrubar uma premissa com evidência**, concordar sem apresentar o dado medido não é resposta: `BLOQUEIA`.
- Onde pede **recomendação com critério** entre opções, listar as opções sem escolher não é resposta.

### G2 — Fonte citável

Todo número tem procedência **verificável**?

- **Vale:** catálogo de fabricante identificado (Sandvik Coromant, Kennametal, Iscar, Seco, Walter, Mitsubishi, OSG, Guhring, Harvey), handbook com edição e página, norma (ISO 513, ISO 3685), artigo revisado por pares com DOI.
- **Não vale:** "conhecimento geral da área", "prática comum", link para a home page de um fabricante sem a página do dado, fórum, blog sem autoria, citação que não dá para conferir.
- Cada número sem fonte é `BLOQUEIA` **individualmente** — cite o valor e onde ele aparece.

### G3 — Rótulo de confiança correto

Os rótulos `CONSENSO` · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` · `NÃO ENCONTRADO` estão presentes **e bem aplicados**?

- `CONSENSO` exige **três fontes de fato independentes**. Três páginas citando a mesma origem — ou três revendedores repetindo o catálogo do mesmo fabricante — é `REFERÊNCIA ÚNICA`.
- Rótulo inflado é pior que rótulo ausente: dá aparência de solidez a um dado que não tem.

### G4 — Sinal de preenchimento por default

Procure a assinatura de quem preencheu tabela para não deixar célula vazia:

- Valor redondo repetido em várias linhas (o caso conhecido no projeto: `mc = 0,20` em cinco materiais diferentes). Dado medido não se repete assim.
- Dispersão suspeita de uniforme entre fabricantes.
- Número redondo demais para grandeza medida (exatamente `0,25`, `1,50`, `500`).
- Faixa idêntica em contextos que deveriam divergir.

Achou o padrão? `RESSALVA` no mínimo; `BLOQUEIA` se aquele número for base de fórmula.

### G5 — Sensibilidade quantificada

O enunciado exige, para cada fator: **quanto muda o resultado final, em porcentagem**, e a classificação `MODELAR` / `DEFAULT` / `IGNORAR`.

- "Influencia" sem número não cumpre a exigência.
- Classificação sem o número que a sustenta é opinião: `BLOQUEIA`.
- Confira coerência: `IGNORAR` exige efeito abaixo da margem do modelo (±15–25%); `MODELAR` exige acima.

### G6 — Divergência com material já registrado *(parcial — material não fornecido)*

O dossiê auditado e os canônicos já escritos **não** estão neste pacote. Não invente o que eles dizem.

Em vez disso, entregue a **lista de valores desta rodada que precisam ser cruzados** com o material registrado — cada um com valor, onde aparece e por que colide (grandeza que outra rodada também define, constante que vira fórmula, faixa que outro documento pode contradizer). O cruzamento é feito depois, com os arquivos em mãos.

### G7 — Lacuna declarada

A tabela "o que continua sem base" existe e é honesta?

Lacuna registrada é resultado útil. Retorno de pesquisa de catálogo que **não declara nenhuma lacuna** é suspeito, não exemplar — verifique se lacunas foram silenciadas com número inventado.

Regra da rodada: número que só existe fora do próprio território deveria virar `LACUNA` declarada, com a fonte que teria o dado nomeada — nunca preenchido por conhecimento do modelo. Aponte onde isso foi violado.

### G8 — Cross-check A × B — **o portão mais importante desta rodada**

A divergência entre os dois retornos é o detector mais barato de número alucinado. Monte a tabela de confronto, **número a número**, para toda constante que vira fórmula ou entrada de catálogo:

| Grandeza | Retorno A | Retorno B | Fonte de A | Fonte de B | Situação | Selo |
|---|---|---|---|---|---|---|

Classifique cada linha:

| Situação | Significado | Selo |
|---|---|---|
| Convergem, fontes diferentes | Achado mais forte possível. Confiança sobe. | `OK` |
| Convergem, mesma fonte | Não é confirmação — leram o mesmo catálogo. Continua `REFERÊNCIA ÚNICA`. | `RESSALVA` |
| Divergem dentro de ±15–25% | Cabe na margem do próprio modelo. Registre a faixa, não escolha um valor. | `RESSALVA` |
| Divergem acima da margem | Pelo menos um está errado. Diga qual se sustenta — ou que nenhuma se sustenta. | `BLOQUEIA` |
| Só um dos dois achou | Não é confirmação. `REFERÊNCIA ÚNICA`, nunca `CONSENSO`. | `RESSALVA` |
| Divergem na conclusão (`MODELAR` × `IGNORAR`, premissa confirmada × derrubada) | A conclusão é o produto da rodada. O achado mais importante do veredito. | `BLOQUEIA` |

**Regra que não pode ser quebrada: não faça média entre os dois retornos.** Média entre um número certo e um alucinado produz um terceiro número que não corresponde a nenhuma fonte — exatamente o defeito que este projeto existe para eliminar. Quando divergem: ou uma fonte vence com motivo declarado, ou vira faixa, ou vira lacuna.

**Convergência não prova correção.** Dois modelos podem errar igual, principalmente em número que circula muito na internet. Convergência só sobe `REFERÊNCIA ÚNICA` para `CONSENSO` se as fontes citadas forem de fato diferentes e independentes.

## Formato da resposta

Responda **apenas** com o documento abaixo, em markdown, pronto para ser salvo como `VALIDACAO_R4.md`. Sem preâmbulo, sem comentário fora dele.

```markdown
# Validação — R4 Velocidades e Avanços

**Veredito:** APROVADO | APROVADO COM RESSALVAS | REPROVADO
**Retornos auditados:** RESPOSTA_R4.md (A) + RESPOSTA_R4_B.md (B)
**Data:**

## Resumo
[3 linhas: o que os retornos entregam, o que não entregam, e o que impede o canônico se algo impedir]

## Achados por portão

| Portão | Selo | Achado | O que fazer |
|---|---|---|---|
| G1 Cobertura | | | |
| G2 Fonte | | | |
| G3 Confiança | | | |
| G4 Default | | | |
| G5 Sensibilidade | | | |
| G6 Divergência (parcial) | | | |
| G7 Lacunas | | | |
| G8 Cross-check A×B | | | |

## Confronto A × B
[a tabela do G8, número a número, com a situação e o selo de cada linha]

## Itens que BLOQUEIAM
[um por linha: o valor, onde aparece, e por quê. Vazio é resultado válido.]

## A cruzar com o material registrado (G6)
[valor · onde aparece · com o que colide. Sem inventar o que o material registrado diz.]

## O que entra no canônico como lacuna declarada
[o que os retornos não fecharam e precisa aparecer na §4 do canônico]
```

**Critério do veredito global:**

| Veredito | Quando |
|---|---|
| `APROVADO` | Nenhum `BLOQUEIA`. Ressalvas menores viram lacuna declarada. |
| `APROVADO COM RESSALVAS` | Nenhum `BLOQUEIA` no núcleo da rodada, mas há furos de fonte ou de sensibilidade em fatores secundários. |
| `REPROVADO` | Questão central sem resposta, número-base sem fonte, ou `CONSENSO` falso em constante que vira fórmula. |

## O que você nunca faz

- **Não escreve o canônico.** Esse trabalho é de quem pediu a validação.
- **Não conserta os retornos.** Não reescreve número, não completa tabela, não busca a fonte que faltou. Você aponta; outro corrige.
- **Não faz média entre A e B.**
- **Não inventa defeito.** Revisar não é fabricar problema. Portão que passa recebe `OK` e segue. Dúvida genuína entra como dúvida — nunca vira acusação para parecer rigoroso. **Um retorno bom existe; se for bom, diga que é bom.**
- **Não afirma o que o material não fornecido diz** (dossiê, canônicos, HANDOFF).

---
---

# MATERIAL 1 de 3 — ENUNCIADO DA RODADA R4

*(é contra este texto que a cobertura do G1 é medida)*

---


# MISSÃO

Você vai validar as **tabelas de velocidade de corte e avanço por dente** de uma calculadora de parâmetros para fresamento CNC, e determinar quanto o operador pode se afastar do valor recomendado antes de entrar em risco. As tabelas abaixo estão em uso; parte delas tem procedência declarada, parte não.

## Contexto do produto

- **Usuário:** operador e programador de CNC em oficina brasileira de usinagem e ferramentaria.
- **Escopo:** fresamento com **fresa inteiriça de metal duro revestido**, topo reto, toroidal e esférica.
- **Aplicação dominante:** moldes e matrizes.
- **Postura:** o sistema recomenda um ponto de partida e permite ajuste. Todo número é auditável.
- **Margem de erro declarada do modelo:** ±15–25%.

## REGRAS DE RESPOSTA — obrigatórias

1. **Não invente número.** Sem consenso, entregue a **faixa** e a dispersão entre fontes.
2. **Cada número precisa de fonte citável** — catálogo de fabricante (Sandvik Coromant, Kennametal, Iscar, Seco, Walter, Mitsubishi, OSG, Guhring), handbook (Machinery's Handbook, ASM Handbook Vol. 16, Diniz/Marcondes/Coppini) ou norma.
3. **Etiquete a confiança de cada linha de tabela:** `CONSENSO` · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` · `NÃO ENCONTRADO`. Confiança por linha, não por tabela.
4. **Declare as condições junto com o número.** Um `Vc` sem substrato, revestimento e refrigeração declarados não é um dado — é um boato. Toda faixa que você entregar precisa dizer para que condição vale.
5. **Diga quando o valor implementado estiver errado**, com a consequência quantificada.
6. **Prefira a regra à tabela** onde houver regra. Se o `fz` de acabamento é uma fração declarada do de desbaste, entregue a fração e a fonte em vez de duplicar a tabela.
7. **Priorize a prática de oficina brasileira de moldes** onde houver divergência regional, mas registre a divergência.

---

# QUESTÃO 1 — Velocidade de corte por material

O sistema usa estas faixas de `Vc` (m/min) para fresa de metal duro. Os três primeiros são declarados de confiabilidade alta, com fonte; os demais são estimativa.

| Material | ISO | Dureza | Desbaste | Semi | Acabamento | Status |
|---|---|---|---|---|---|---|
| Aço 1020 | P | 120–160 HB | 185–250 | 220–280 | 250–350 | validado |
| Aço 1045 | P | 170–220 HB | **150–200** | 180–240 | 200–280 | validado |
| Inox 304 | M | 140–180 HB | 60–90 | 80–120 | 100–150 | validado |
| Alumínio 6061-T6 | N | ~95 HB | 400–600 | 500–800 | 600–1000 | estimado |
| P20 | P | 280–320 HB | 100–120 | 120–180 | 150–200 | estimado |
| 2711 | P | 300–340 HB | 85–105 | 100–150 | 125–170 | estimado |
| 8620 núcleo | P | 180–220 HB | 120–180 | 150–220 | 180–250 | estimado |
| 8620 cementado | H | 58–62 HRC | 60–90 | 80–120 | 100–150 | estimado |
| H13 | H | 45–52 HRC | 80–125 | 100–150 | 125–170 | estimado |

**Responda:**

**a) Divergência interna a resolver.** Para o aço 1045 em desbaste, três valores coexistem no projeto: **150–200 m/min** (a tabela acima e o documento de velocidades, classificado como confiabilidade alta), **140 m/min** pontual (contrato de uma versão mais nova, fora da faixa) e **80–120 m/min** (um caso de teste antigo cuja fonte não existe mais). Qual é a faixa correta para fresamento de aço 1045 com fresa inteiriça de metal duro revestido? Cite catálogo.

**b) Um padrão suspeito na tabela.** A `Vc` **cresce** do desbaste para o acabamento em todos os nove materiais. Isso é a convenção correta? Confirme o princípio e explique-o: o acabamento tira menos material por passada, então admite velocidade maior sem sobrecarregar a aresta — ou a razão é outra? Existe material ou situação em que a relação se inverte?

**c) Validação dos seis estimados.** Entregue as faixas publicadas para P20, 2711 (com a equivalência DIN/AISI, já que é designação brasileira), 8620 em núcleo e cementado, e H13 tratado. Onde não houver dado direto, indique o material equivalente usável como *proxy* e o erro esperado.

**d) As condições que faltam.** Cada faixa acima está declarada sem dizer para que condição vale. Para cada material, diga como a faixa muda com:
- **revestimento** (sem revestimento × TiAlN/AlTiN × AlCrN)
- **refrigeração** (a seco × ar comprimido × emulsão × alta pressão × MQL)
- **estratégia** (fresamento convencional × alta velocidade × alta eficiência)

Se a variação por condição for maior que a largura da própria faixa, diga — significa que a tabela como está entrega menos informação do que aparenta.

**e) Dureza como eixo.** Faixas de dureza de 40 HB de largura são tratadas como um ponto único. Existe regra publicada de correção de `Vc` por dureza dentro da mesma liga? Para aços de molde tratados, a dureza em HRC é o eixo mais usado que a liga — confirme e entregue a tabela por faixa de HRC se ela existir.

**f) Expansão.** Entregue faixas de `Vc` para ferro fundido cinzento GG25, ferro fundido nodular GGG50 e Ti-6Al-4V — os grupos ISO K e S que o sistema não cobre.

---

# QUESTÃO 2 — Avanço por dente (`fz`) por diâmetro

O sistema usa tabelas de `fz` por diâmetro, com interpolação linear entre pontos. Esta é a de aços 28–34 HRC em desbaste, que serve de base para as demais:

| Ø (mm) | 0,2 | 0,5 | 0,75 | 0,8 | 1 | 1,5 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 14 | 16 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `Vc` | 120 | 140 | 150 | 150 | 160 | 170 | 180 | 190 | 200 | 210 | 210 | 200 | 190 | 180 | 170 |
| `fz` | 0,003 | 0,006 | 0,008 | 0,010 | 0,012 | 0,020 | 0,030 | 0,050 | 0,070 | 0,100 | 0,120 | 0,140 | 0,160 | 0,180 | 0,200 |

As outras tabelas derivam desta por regra:
- **Aços 38–43 HRC:** tabela própria; acabamento = `Vc × 0,85` e `fz × 0,75` do desbaste
- **Aços baixo carbono (1020, 1045):** `Vc × 1,30` e `fz × 1,10` sobre a de 28–34 HRC
- **Aços 28–34 HRC, acabamento:** `Vc × 1,10` e `fz × 0,60` do desbaste
- **Alumínio:** tabela própria, `Vc` de 300 a 1000 conforme o diâmetro
- **Semi-acabamento:** ponto médio entre desbaste e acabamento

**Responda:**

**a)** Os valores de `fz` por diâmetro batem com catálogo? Entregue a faixa publicada de `fz` para fresa inteiriça de metal duro em aço, por diâmetro, e compare.

**b) O formato da regra.** `fz` proporcional ao diâmetro é a forma correta, ou os fabricantes publicam `fz` por **faixa de diâmetro** com degraus? Existe relação publicada `fz = f(D)` — linear, potência, ou tabela discreta?

**c) O pico da curva de `Vc`.** Note que a `Vc` na tabela **sobe** até Ø6–8 e depois **cai** até Ø16. Esse formato tem base física — dissipação de calor, rigidez da ferramenta, limite de rotação — ou é artefato da tabela? Fabricantes publicam `Vc` variando com o diâmetro, ou `Vc` constante por material com o diâmetro afetando só a rotação?

**d) As regras derivadas.** As frações usadas (`fz` de acabamento = 60% do desbaste; `Vc` de acabamento = +10%; grupo endurecido = 85% e 75%) têm base em catálogo, ou são convenção interna? Entregue as frações publicadas.

**e) O piso de `fz`.** O sistema usa `0,002 mm/dente` como piso absoluto, citando microfresas de Ø0,2 mm. Esse piso tem base? Ele deve ser absoluto ou proporcional ao raio de aresta da ferramenta (ver Questão 3)?

**f) Número de arestas.** O `fz` publicado depende de `Z`? Uma fresa de 2 cortes e uma de 4 no mesmo diâmetro e material usam o mesmo `fz`, ou há correção? O sistema hoje trata `fz` como independente de `Z`.

---

# QUESTÃO 3 — Janela de tolerância: quanto se pode desviar do recomendado

O sistema classifica cada parâmetro (`Vc`, `fz`, `ae`, `ap`) em cinco zonas de cor pela razão contra o valor recomendado, **com os mesmos quatro limiares para os quatro parâmetros**:

| Razão valor / recomendado | Zona | Rótulo em `Vc` | Rótulo em `fz` |
|---|---|---|---|
| < 0,50 | vermelho | Baixo | Atrito |
| 0,50 – 0,75 | amarelo | Sub-ótimo | Leve |
| 0,75 – 1,20 | **verde** | Recomendado | Ideal |
| 1,20 – 1,50 | amarelo | Alerta | Agressivo |
| > 1,50 | vermelho | Desgaste | Vibração |

Esses quatro números **não têm fonte em documento nenhum do sistema**. E aplicá-los igualmente aos quatro parâmetros pressupõe que todos toleram o mesmo desvio, o que é improvável.

**Responda:**

**a)** Existe base técnica para uma janela de tolerância em torno do parâmetro recomendado? Fabricantes publicam **faixa (mín–máx)** além do valor nominal, ou só o nominal?

**b)** A janela é **igual** para `Vc`, `fz`, `ae` e `ap`, ou cada um tem tolerância própria? Qual é o mais sensível a desvio, e por quê? Ordene os quatro do mais ao menos sensível.

**c) Piso de `fz` — a fronteira física.** Qual é o `fz` mínimo abaixo do qual o gume **esfrega em vez de cortar** (*rubbing / ploughing*)? A hipótese a verificar: o critério real não é uma fração do `fz` recomendado, e sim a **espessura de cavaco contra o raio de aresta** da ferramenta.
1. Qual o raio de aresta típico de fresa inteiriça de metal duro, por faixa de diâmetro? Está em catálogo ou precisa ser estimado?
2. Qual a espessura mínima de cavaco em função do raio de aresta? A referência preliminar é "5–20% do raio de aresta" — confirme com fonte.
3. Traduza isso para a linguagem do sistema: dado um `fz` recomendado, a que fração dele está a fronteira de esfregamento?

**d) Teto de `fz` — a outra fronteira.** Acima de que ponto há risco de lascamento do gume ou sobrecarga? Existe valor publicado, ou o limite é a potência da máquina?

**e) `Vc` acima do recomendado.** Subir 20% tem qual efeito quantificado sobre a vida da ferramenta? Se a equação de Taylor for a resposta, entregue o cálculo — e note que o expoente `n` é objeto de outra rodada desta pesquisa.

**f)** Se não houver base para janela simétrica: qual estrutura de zonas você recomendaria, apoiada em quê? Note que a assimetria provável é que **cortar menos que o recomendado** é conservador para `ae` e `ap` (menos carga), mas **perigoso** para `fz` (esfregamento) e para `Vc` (aresta postiça).

---

# FORMATO DA ENTREGA

Para cada questão:

```
## [número] [título]

**Veredito:** [uma frase]
**Confiança:** CONSENSO | REFERÊNCIA ÚNICA | SEM CONSENSO | NÃO ENCONTRADO

**O que as fontes dizem**
[tabela com valores, condição de validade e procedência]

**Regra ou tabela recomendada**
[com a condição declarada: substrato, revestimento, refrigeração]

**Se o valor atual do sistema estiver errado**
[o que muda, com número]

**Fontes**
[link, fabricante, ano]
```

Ao final, três entregas de fechamento:

**Tabela A — Velocidades recomendadas**, por material × operação, com condição declarada e confiança **por linha**.

**Tabela B — Avanços recomendados**, por diâmetro, com a regra de derivação por operação.

**Tabela C — O que continua sem base**

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|

Lacuna declarada é resultado útil. Número inventado é passivo.



---
---

# MATERIAL 2 de 3 — RETORNO A (território: handbook, norma e literatura)

---

<!-- CABECALHO DE PROCEDENCIA - adicionado ao arquivar. O corpo abaixo esta INTACTO. -->
# RESPOSTA R4 (A) - Velocidades e Avancos - territorio: handbook, norma e literatura

> **Retorno cru.** Nao editado. Vale por ser cru - e registro de procedencia.
> **Rodada:** R4, executada em par cego. Este e o retorno **A**.
> **Territorio:** handbook de engenharia, norma, artigo revisado por pares, tese.
> Catalogo de fabricante estava PROIBIDO neste retorno, por desenho.
> **Ferramenta:** IA externa. **Data da pesquisa declarada:** 20/08/2026. **Arquivado:** 20/08/2026.
> **Titulo original do arquivo entregue:** "Relatorio de validacao - parametros de fresamento CNC".
> O nome e enganoso: **isto nao e uma validacao**, e o retorno de pesquisa. A validacao
> desta rodada sera gravada em `VALIDACAO_R4.md`, por um auditor que nao pesquisou.

---

# Relatório de validação — parâmetros de fresamento CNC

**Idioma:** português do Brasil.  
**Território de fontes desta rodada:** handbooks, literatura técnica, normas e artigos revisados por pares. Catálogos de fabricantes, distribuidores, blogs, calculadoras e documentos que já consolidem a resposta não foram usados como confirmação independente.  
**Data da pesquisa:** 20 de agosto de 2026.

> **Conclusão executiva.** As tabelas atuais não podem ser validadas como dados universais. A literatura confirma as relações físicas — velocidade, avanço, espessura de cavaco, raio de aresta, desgaste, refrigeração e profundidades são variáveis acopladas —, mas não fornece, neste território, uma tabela aberta e independente que feche todas as combinações material × diâmetro × revestimento × estratégia. Portanto, as células numéricas exatas pedidas para catálogos recebem **LACUNA**, e não um número substituto.

## Bloco 1 — Questão 1(a): divergência do aço 1045 em desbaste

**Veredito:** a divergência não pode ser resolvida por consenso no território desta rodada; 150–200 m/min, 140 m/min e 80–120 m/min não são intercambiáveis sem definir ferramenta, geometria, revestimento, largura/profundidade de corte, refrigeração, vida-alvo e condição metalúrgica.

**Confiança:** **NÃO ENCONTRADO** para uma faixa numérica de catálogo dentro do território; **CONSENSO** apenas para a regra de que a velocidade deve ser determinada conjuntamente com material da ferramenta, dureza e vida-alvo.

| Evidência | Condição | Resultado aplicável |
|---|---|---|
| Davis, *Metals Handbook Desk Edition*, 2ª ed., ASM, 1998, pp. 901–904 | Handbook; resumo público, sem tabela integral aberta | A seleção do material da ferramenta define faixas de aplicação em velocidade e avanço, além de tenacidade e resistência ao desgaste [1]. |
| ISO 8688-2:1989 | Ensaio de vida em fresamento | A vida é tratada em função de velocidade, avanço e profundidades axial/radial; não existe limiar universal independente da condição [2]. |
| Oliveira et al., 2015 | Microfresamento de AISI 1045, sem fluido, Vc=60 m/min, ae=D | Demonstra que mesmo em 1045 a resposta depende de escala, fz, ap e raio de aresta; não é uma tabela de Vc para fresamento convencional [3]. |

O valor de **140 m/min** pode ser uma condição pontual válida para uma combinação específica, mas estar fora de 150–200 m/min não prova erro. O valor antigo **80–120 m/min**, cuja fonte desapareceu, deve ser removido como dado auditável: sua procedência não pode ser reconstruída. A pergunta solicita catálogo; esse tipo de fonte está explicitamente fora do território desta rodada. Logo, a resposta operacional correta é: **LACUNA — localizar o catálogo primário da fresa inteiriça revestida, com classe do metal duro, diâmetro, número de cortes, ae/ap, condição de corte e vida-alvo; sem isso, não escolher entre 150–200 e 80–120 m/min**.

**Regra recomendada:** conservar 150–200 m/min apenas como valor histórico não confirmado, rotulado `REFERÊNCIA ÚNICA` se a fonte original puder ser recuperada, e não como `CONSENSO`. Até a recuperação, o sistema deve emitir “faixa sem validação” e exigir confirmação do operador.

**Se o valor atual estiver errado:** a consequência não é quantificável pela literatura encontrada sem o expoente de vida, geometria e carga. Um valor excessivo tende a elevar temperatura e desgaste; um valor baixo pode favorecer aresta postiça e corte ineficiente. Não atribuir porcentagem de vida sem um ensaio Taylor específico.

## Bloco 2 — Questão 1(b): aumento de Vc no acabamento

**Veredito:** a monotonicidade “desbaste < semi < acabamento” não é uma convenção universal. O acabamento pode admitir Vc maior em algumas condições porque reduz carga por dente, ae/ap ou espessura de cavaco, mas a causa não é simplesmente “tirar menos material”.

**Confiança:** **SEM CONSENSO** para a regra monotônica; **CONSENSO** para a dependência de Vc em material, ferramenta, geometria, calor, desgaste e condição de corte.

Em desbaste, a prioridade costuma ser taxa de remoção, e a combinação de ae, ap e fz produz maior carga, temperatura e potência. Em acabamento, pode haver menor engajamento e menor espessura efetiva de cavaco, permitindo elevar Vc para produtividade e acabamento superficial. Entretanto, uma passada de acabamento com ae pequeno e ap grande, uma parede fina, uma cavidade com evacuação ruim ou uma ferramenta esférica em contato desfavorável pode exigir redução, não aumento, de Vc. O mecanismo é a combinação entre espessura de cavaco, calor, rigidez, contato e vida da ferramenta; não uma regra “acabamento sempre mais rápido”. A revisão de ferramentas revestidas documenta mecanismos de abrasão, adesão, aresta postiça, delaminação e trincas térmicas dependentes dos parâmetros e da condição térmica [4].

| Relação atual | Avaliação | Regra segura |
|---|---|---|
| Vc acabamento > Vc desbaste | Não universal | Permitir somente quando ae/ap, fz, geometria e vida-alvo justificarem. |
| Vc constante por material | Incompleta | Usar junto com condição da ferramenta e do corte. |
| Vc menor para material mais duro | Princípio geral, não tabela automática | Separar dureza, microestrutura e tratamento térmico. |

**Situação de inversão:** ferramenta esférica em baixa altura de contato, material endurecido, parede fina, refrigeração deficiente, ferramenta sem revestimento ou acabamento com contato prolongado podem tornar o acabamento mais severo termicamente ou dinamicamente. Não há base para conservar a relação crescente nos nove materiais como regra de software.

## Bloco 3 — Questão 1(c): seis estimados e equivalências

**Veredito:** as faixas numéricas exatas solicitadas não foram encontradas em fonte permitida e aberta; os materiais podem ser classificados por família e dureza, mas isso não autoriza copiar Vc de um “equivalente”.

**Confiança:** **NÃO ENCONTRADO** para as faixas publicadas pedidas; **REFERÊNCIA ÚNICA** para equivalências aproximadas quando baseadas em designação metalúrgica, não em comportamento idêntico de usinagem.

| Material do sistema | Proxy admissível para pesquisa | Limitação do proxy | Situação da faixa Vc |
|---|---|---|---|
| P20, 280–320 HB | Aço ferramenta pré-endurecido da mesma faixa de dureza, tipicamente grupo P | Composição, inclusões, tratamento e estado de fornecimento podem alterar usinabilidade | **LACUNA**; não usar 100–120 como validado. |
| 2711, 300–340 HB | Aço para molde da mesma dureza; equivalência DIN/AISI precisa ser confirmada por norma ou certificado do material | “2711” brasileiro não é, sozinho, especificação química completa; não presumir identidade com P20/H13 | **LACUNA**. |
| 8620 núcleo, 180–220 HB | AISI/SAE 8620 normalizado ou recozido, grupo P | O estado metalúrgico e a fração de ferrita/perlita importam | **LACUNA**. |
| 8620 cementado, 58–62 HRC | Aço cementado endurecido superficialmente; grupo H apenas pela condição de dureza | A camada e o núcleo têm comportamentos diferentes; o corte pode atravessar zonas distintas | **LACUNA**. |
| H13 tratado, 45–52 HRC | H13/DIN 1.2344 na mesma faixa HRC | Revenimento, dureza real e microestrutura alteram desgaste e lascamento | **LACUNA**. |

A ASM informa que a dureza típica de aços-ferramenta deve ser consultada em seção própria de tratamento térmico, mas a página pública não expõe as tabelas de corte necessárias [5]. A classificação ISO H é por comportamento de material endurecido, não uma identidade de liga; portanto, “mesmo HRC” é um proxy incompleto.

**Regra recomendada:** armazenar `material_equivalente`, `dureza_medida`, `estado_termico` e `origem_da_faixa`. Se a origem for apenas “proxy”, a linha deve ser `REFERÊNCIA ÚNICA` ou `SEM CONSENSO`, nunca `CONSENSO`. O erro esperado não pode ser convertido em porcentagem sem estudos pareados; declarar **não quantificado**.

## Bloco 4 — Questão 1(d): revestimento, refrigeração e estratégia

**Veredito:** a variação por condição pode ser maior que a largura de várias faixas atuais; uma faixa de Vc sem essas condições entrega menos informação do que aparenta.

**Confiança:** **CONSENSO** qualitativo; **NÃO ENCONTRADO** para multiplicadores universais.

| Fator | Efeito tecnicamente sustentado | Número universal? |
|---|---|---|
| Sem revestimento → TiAlN/AlTiN/AlCrN | Altera dureza a quente, atrito, adesão, resistência à oxidação e modo de falha; o melhor revestimento depende do substrato e do material usinado [4]. | **Não encontrado.** |
| Seco → ar comprimido | Pode melhorar evacuação e resfriamento limitado; não equivale a emulsão nem a alta pressão. | **Não encontrado.** |
| Emulsão | Pode reduzir temperatura, mas ciclos térmicos/interrupções podem favorecer trincas em certas combinações. | **Não encontrado.** |
| Alta pressão | Aumenta evacuação e acesso do fluido; efeito depende do bico, pressão e cavidade. | **Não encontrado.** |
| MQL | Reduz lubrificação/consumo, mas não deve ser tratado como capacidade térmica de emulsão. | **Não encontrado.** |
| Convencional → HSM | Muda rotação, calor, dinâmica e estabilidade; exige máquina, porta-ferramenta e trajetória adequados. | **Não encontrado.** |
| HEM/HPC | Pequeno ae pode reduzir espessura instantânea, mas ap maior e tempo de contato podem manter alta carga térmica. | **Não encontrado.** |

A revisão de Sousa e Silva mostra que ferramentas revestidas sofrem desgaste abrasivo, adesivo, delaminação e trincas térmicas e que mudar revestimento ou parâmetros altera a vida [4]. Isso impede multiplicar a faixa atual por fatores fixos sem experimentação.

**Regra recomendada:** Vc deve ser função de `(material, dureza, substrato, revestimento, D, Z, ae/D, ap/D, estratégia, fluido, vida-alvo)`. Onde qualquer campo essencial faltar, retornar `CONDIÇÃO INCOMPLETA`, não uma faixa aparentemente precisa.

## Bloco 5 — Questão 1(e): dureza como eixo

**Veredito:** dureza é um eixo importante, sobretudo em aços para moldes tratados, mas não existe, nas fontes acessíveis desta rodada, uma tabela universal de correção de Vc por cada 40 HB ou uma tabela completa HRC para todos os materiais listados.

**Confiança:** **SEM CONSENSO** para multiplicador fixo; **CONSENSO** para incluir dureza e estado térmico como variáveis.

A dureza altera força específica, temperatura, desgaste e risco de lascamento, mas não descreve sozinha tenacidade, carbonetos, inclusões, microestrutura e tratamento. Para aço cementado, HRC superficial não representa necessariamente o núcleo. A ISO 8688-2 estrutura ensaios de vida variando condições de corte, o que é incompatível com uma correção universal somente por dureza [2].

**Regra recomendada:** dividir o modelo por bandas experimentais medidas — por exemplo, condição recozida/pré-endurecida/endurecida — somente quando houver dados pareados. Não preencher uma tabela HRC com extrapolação linear. A tabela H13 45–52 HRC e 8620 cementado 58–62 HRC deve permanecer `SEM CONSENSO` até ensaio ou fonte primária auditável.

## Bloco 6 — Questão 1(f): GG25, GGG50 e Ti-6Al-4V

**Veredito:** a inclusão dos grupos K e S é correta como expansão de escopo, mas as faixas numéricas não foram fechadas no território permitido.

**Confiança:** **NÃO ENCONTRADO** para faixas exatas de fresa inteiriça revestida nas condições pedidas.

| Material | Grupo ISO | Condição que precisa ser declarada | Resultado |
|---|---:|---|---|
| Ferro fundido cinzento GG25 | K | Grafita, dureza, interrupção, ferramenta/revestimento, seco ou fluido | **LACUNA**. |
| Ferro fundido nodular GGG50 | K | Matriz, nodularidade, dureza e tendência a abrasão | **LACUNA**. |
| Ti-6Al-4V | S | Estado metalúrgico, rigidez, refrigeração, ferramenta e evacuação de calor | **LACUNA**. |

Não copiar valores de ferro fundido cinzento para nodular, nem de aço inox para titânio. A publicação aberta sobre microfresamento registra Ti-6Al-4V como material com efeitos relevantes de deflexão, batimento e fz baixo [6], mas não fornece a tabela macro de Vc solicitada.

## Bloco 7 — Questão 2(a): comparação dos valores de fz

**Veredito:** a tabela contém uma progressão suave e valores pequenos coerentes com uma hipótese de microfresamento/acabamento, mas não pode ser declarada compatível com catálogo sem a fonte primária.

**Confiança:** **NÃO ENCONTRADO** para a faixa publicada de catálogo; **SEM CONSENSO** para validar os pontos por diâmetro.

A fonte permitida mais próxima, Oliveira et al., demonstra que fz baixo em AISI 1045 pode entrar no regime de tamanho, com ploughing e aumento acentuado de força específica [3]. Isso não valida automaticamente 0,003 mm/dente para Ø0,2 mm, nem 0,200 mm/dente para Ø16 mm. A pergunta pede catálogo, mas catálogo está fora do território; portanto: **LACUNA — obter tabela primária do fabricante da geometria exata ou ensaio próprio**.

## Bloco 8 — Questão 2(b): forma de fz(D)

**Veredito:** `fz proporcional ao diâmetro` não é lei universal; tabelas discretas por faixas de diâmetro são uma representação plausível de dados de ferramenta, mas a relação depende de rigidez, número de cortes, geometria e operação.

**Confiança:** **CONSENSO** para a fórmula cinemática de avanço; **SEM CONSENSO** para uma forma universal de fz(D).

A cinemática é `Vf = fz × Z × n` e `n = 1000 Vc/(πD)`. Assim, Z não desaparece do avanço de mesa. A literatura de microfresamento mostra ainda que batimento, número de dentes, raio do cortador e direção de fresamento alteram a espessura real de cavaco [6]. Uma lei linear pode ser usada como interpolador interno, mas não deve ser apresentada como relação publicada universal. O modelo deve preferir degraus por faixa de diâmetro quando a fonte original for uma tabela; interpolar só dentro da faixa da fonte.

## Bloco 9 — Questão 2(c): pico de Vc em Ø6–8 mm

**Veredito:** o pico seguido de queda é mais provavelmente artefato de tabela ou mistura de restrições do que uma lei física geral de Vc.

**Confiança:** **CONSENSO** para a interpretação física geral; **NÃO ENCONTRADO** para confirmar a origem desta tabela específica.

Em primeira aproximação, Vc é a velocidade periférica escolhida para material e ferramenta; o diâmetro altera a rotação pela equação `n = 1000 Vc/(πD)`. Uma queda de Vc em diâmetros grandes pode ser imposta por rotação máxima, potência, rigidez, balanço, vibração, porta-ferramenta ou catálogo específico. A literatura de tamanho de escala não sustenta um pico universal em Ø6–8 mm [3] [6]. Portanto, a curva atual deve ser marcada `SEM CONSENSO` até a fonte declarar por que Vc varia com D.

## Bloco 10 — Questão 2(d): regras derivadas

**Veredito:** as frações `fz acabamento = 0,60`, `Vc acabamento = 1,10` e `0,85/0,75` para endurecidos são convenções internas não confirmadas.

**Confiança:** **NÃO ENCONTRADO** para frações publicadas independentes.

A literatura confirma que acabamento e desbaste mudam a carga, a superfície e o regime de corte, mas não estabelece uma fração universal para todas as ferramentas e materiais [4]. Semi-acabamento como ponto médio aritmético também não decorre da física: a vida e a força não variam necessariamente linearmente com os parâmetros. Manter as frações somente como regras internas versionadas, rotuladas `REFERÊNCIA ÚNICA — convenção do sistema`, e não como recomendação universal.

## Bloco 11 — Questão 2(e): piso de fz

**Veredito:** `0,002 mm/dente` não é piso físico absoluto; o limite relevante é a espessura mínima de cavaco comparada ao raio de aresta e à geometria real.

**Confiança:** **CONSENSO** para o mecanismo; **SEM CONSENSO** para um único multiplicador.

Oliveira et al. relatam `h_min` de 22–36% do raio de aresta e concluem que a faixa prática do estudo ficou aproximadamente entre 1/4 e 1/3 do raio [3]. Wu et al. obtiveram `h_min = 0,17 r_n` em seu modelo/experimento e compilaram estudos entre aproximadamente 0,14 e 0,49 do raio, mostrando dispersão [7]. A revisão de Mamedov et al. resume 20–35% conforme a ductilidade [6]. Portanto, a hipótese preliminar de 5–20% não é consenso; 20–35% tem melhor apoio nesta busca, mas não é universal.

A forma correta do software é:

`fz_min_físico ≈ α × r_e`, com `α` calibrado por material, geometria, batimento e método, e não um número absoluto.

Para comparar com o recomendado:

`fração_da_recomendação = (α × r_e) / fz_recomendado`.

Sem medição ou fonte do raio de aresta para cada diâmetro, não é válido converter essa expressão em um número por Ø0,2–16 mm. O sistema deve exibir a fórmula e pedir `r_e`; se ausente, retornar `LACUNA`.

## Bloco 12 — Questão 2(f): número de arestas

**Veredito:** fz é uma grandeza por dente; Z não deve alterar automaticamente fz, mas altera diretamente o avanço de mesa e pode exigir correções por evacuação, rigidez e espessura efetiva.

**Confiança:** **CONSENSO** para a cinemática; **SEM CONSENSO** para uma correção universal por Z.

Para o mesmo Vc, D e fz, dobrar Z dobra `Vf`. Entretanto, batimento pode fazer uma aresta retirar muito mais que outra; em fz baixo, a revisão registra que batimento e imperfeições se tornam mais importantes [6]. Assim, a implementação deve manter fz por dente, mas calcular `Vf` com Z e validar carga, espaço de cavaco e batimento. Não usar a mesma tabela de fz para 2 e 4 cortes sem declarar que isso é uma aproximação interna.

## Bloco 13 — Questão 3(a): existência de janela de tolerância

**Veredito:** não existe base técnica para os limiares universais 0,50/0,75/1,20/1,50 aplicados a todos os parâmetros.

**Confiança:** **CONSENSO** para rejeitar a janela universal; **REFERÊNCIA ÚNICA** para a estrutura experimental de ISO 8688-2.

Fabricantes podem publicar faixas nominais e limites para produtos específicos, mas isso seria fonte de catálogo e não confirmação desta rodada. A ISO 8688-2 trata ensaios de vida como função de múltiplas variáveis, inclusive Vc, avanço, ap e ae [2]. Logo, uma janela deve ser derivada de envelope de processo para uma família específica, com critério de desgaste, potência, vibração, acabamento e vida.

## Bloco 14 — Questão 3(b): sensibilidade relativa de Vc, fz, ae e ap

**Veredito:** a tolerância não é igual. Não há ordem única para todos os modos de falha; para risco de ferramenta, uma ordem inicial conservadora é `fz ≈ Vc > ae/ap`, mas para potência e taxa de remoção ae e ap podem dominar.

**Confiança:** **SEM CONSENSO** para uma ordenação universal; **CONSENSO** para a dependência conjunta.

`MRR` é proporcional a `ap × ae × Vf`, e `Vf` é proporcional a `fz × Z × n`. Portanto, ae/ap menores normalmente reduzem carga e potência, enquanto fz menor pode cruzar `h_min` e causar esfregamento. Vc maior aumenta temperatura e desgaste, mas a magnitude depende do expoente de vida. A norma e os estudos de vida não autorizam um mesmo percentual de tolerância para os quatro parâmetros [2] [3].

## Bloco 15 — Questão 3(c): piso de fz e raio de aresta

**Veredito:** a fronteira é função de `h_min/r_e`, não de uma fração fixa de fz recomendado.

**Confiança:** **CONSENSO** para a formulação; **SEM CONSENSO** para raio típico por diâmetro.

| Pergunta | Resposta auditável |
|---|---|
| Raio de aresta típico por diâmetro | **LACUNA** nesta rodada. A literatura trata `r_e` como variável medida/modelada; não foi encontrada tabela independente aberta que o fixe por Ø0,2–16 mm para a fresa especificada. |
| Espessura mínima | Estudos reportam 0,17 r_n; 0,20–0,35 r_e; 0,22–0,36 r_e; e 0,14–0,49 em diferentes materiais/métodos [3] [6] [7]. |
| Tradução para o sistema | `fz_fronteira/fz_rec = α r_e/fz_rec`; calcular apenas quando r_e estiver medido e a orientação/ae permitirem aproximar fz da espessura máxima de cavaco. |

O valor de `fz` não é sempre igual à espessura instantânea de cavaco: entram imersão radial, ângulo de contato, runout, passo, hélice e direção de fresamento. Portanto, a fórmula acima é uma triagem, não uma garantia.

## Bloco 16 — Questão 3(d): teto de fz

**Veredito:** não há valor universal publicado de fz acima do qual sempre ocorre lascamento; o teto é um envelope de força, potência, rigidez, espessura de cavaco e resistência da aresta.

**Confiança:** **CONSENSO** para rejeitar um teto universal; **NÃO ENCONTRADO** para valor único.

O limite deve ser calculado por ensaio ou modelo identificado para a ferramenta: força máxima admissível, potência e torque da máquina, deflexão, estabilidade, espessura de cavaco, ae/ap, número de dentes, condição da aresta e risco de fratura. A revisão de revestimentos mostra que os modos de falha mudam com a condição e incluem delaminação, adesão e trincas térmicas [4]. O software deve retornar `limite não determinado` quando não possuir esses dados.

## Bloco 17 — Questão 3(e): Vc 20% acima

**Veredito:** pela equação de Taylor, o efeito na vida é potencialmente grande, mas não pode ser quantificado numericamente sem o expoente `n` da combinação ferramenta-material.

**Confiança:** **CONSENSO** para a forma da equação; **NÃO ENCONTRADO** para `n` nesta rodada.

Com `V T^n = C`, mantendo fz, ae, ap, ferramenta, material e critério de fim de vida constantes:

`T_1 = C/V_1^n` e `T_2/T_1 = (V_2/V_1)^(-1/n)`.

Para `V_2 = 1,20 V_1`:

`T_2/T_1 = 1,20^(-1/n)`.

Logo, a redução percentual de vida é `100 × [1 − 1,20^(-1/n)]%`. Não inserir um número até a rodada que determine n para a combinação concreta. A literatura e a norma sustentam a dependência, mas não um n transferível entre revestimentos, materiais e estratégias [1] [2].

## Bloco 18 — Questão 3(f): zonas assimétricas recomendadas

**Veredito:** substituir as quatro janelas simétricas por envelopes separados para Vc, fz, ae e ap, com fronteira física e operacional própria.

**Confiança:** **SEM CONSENSO** para percentuais universais; **CONSENSO** para a assimetria qualitativa.

| Parâmetro | Abaixo do recomendado | Acima do recomendado | Estrutura sugerida |
|---|---|---|---|
| Vc | Pode favorecer aresta postiça, corte ineficiente ou acabamento ruim | Aumenta calor/desgaste conforme Taylor | Limite inferior por estabilidade de corte; superior por temperatura/vida medida. |
| fz | Abaixo de h_min: rubbing/ploughing, força específica e desgaste | Sobrecarga, deflexão e lascamento | Piso por `αr_e` e teto por força/deflexão; não usar zona simétrica. |
| ae | Em geral reduz carga instantânea, mas pode alterar espessura e dinâmica | Aumenta contato e potência | Envelope por potência, vibração e estabilidade. |
| ap | Em geral reduz MRR e carga | Aumenta força, deflexão e potência | Envelope por rigidez, potência e comprimento de aresta. |

As cores deveriam ser calculadas por risco, não por razão única. `ae` e `ap` abaixo do recomendado podem ser conservadores para carga, enquanto fz abaixo pode ser perigoso por esfregamento. A literatura de microfresamento mostra diretamente que fz baixo muda o regime de corte [3] [6] [7].

# Tabela A — Velocidades recomendadas

A tabela abaixo separa o que o sistema atualmente usa do que esta rodada conseguiu validar. As faixas originais são reproduzidas apenas para auditoria do software, não como recomendação nova.

| Material | Operação | Faixa atual (m/min) | Condição necessária | Confiança nesta rodada | Ação |
|---|---|---:|---|---|---|
| Aço 1020 | Desbaste/semi/acabamento | 185–250 / 220–280 / 250–350 | Metal duro revestido, dureza e ae/ap não declarados | NÃO ENCONTRADO | Não validar sem fonte primária. |
| Aço 1045 | Desbaste/semi/acabamento | 150–200 / 180–240 / 200–280 | Idem | NÃO ENCONTRADO | Remover 80–120 sem fonte; não resolver 140 sem catálogo/ensaio. |
| Inox 304 | Desbaste/semi/acabamento | 60–90 / 80–120 / 100–150 | Estado, fluido e revestimento não declarados | NÃO ENCONTRADO | Não validar. |
| Alumínio 6061-T6 | Desbaste/semi/acabamento | 400–600 / 500–800 / 600–1000 | Ferramenta, geometria e evacuação não declaradas | NÃO ENCONTRADO | Estimativa deve permanecer fora da tabela validada. |
| P20, 2711, 8620 núcleo/cementado, H13 | Todas | Faixas atuais do anexo | Dureza e condição térmica declaradas, demais campos ausentes | NÃO ENCONTRADO | Usar proxy apenas como hipótese; não como Vc. |
| GG25, GGG50, Ti-6Al-4V | Todas | Não havia | Requer fonte específica ou ensaio | NÃO ENCONTRADO | Manter lacuna. |

# Tabela B — Avanços recomendados

| Ø (mm) | fz atual (mm/dente) | Regra de derivação atualmente usada | Validação |
|---:|---:|---|---|
| 0,2–1,0 | 0,003–0,012 | Interpolação linear entre pontos | NÃO ENCONTRADO; verificar h_min e r_e. |
| 1,5–4,0 | 0,020–0,070 | Interpolação linear | NÃO ENCONTRADO; não tratar como lei universal. |
| 6–16 | 0,100–0,200 | Interpolação linear | NÃO ENCONTRADO; requer ferramenta/estratégia. |
| Todos | Acabamento = 0,60 do desbaste; endurecido = 0,75 do desbaste | Convenção interna | REFERÊNCIA ÚNICA — sem confirmação independente. |

A única regra cinemática que deve permanecer implementada é `Vf = fz × Z × n`, com `n = 1000Vc/(πD)`. O interpolador linear deve ser etiquetado como decisão interna, não como relação publicada.

# Tabela C — O que continua sem base

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| Faixa correta do 1045 | Catálogo primário solicitado está fora do território; fontes históricas conflitantes | Catálogo aberto da ferramenta exata ou ensaio ISO 8688-2 com vida-alvo. |
| Vc dos seis estimados | Não há tabela independente aberta por liga, dureza e operação | Handbook com página verificável ou estudo pareado. |
| Vc de GG25/GGG50/Ti-6Al-4V | Não encontrado para a ferramenta e condições especificadas | Fonte primária por material e condição ou DOE próprio. |
| Multiplicadores de revestimento/refrigeração/estratégia | Não existe fator universal | Matriz experimental por substrato, coating, fluido, ae/ap e estratégia. |
| Correção por dureza | Não há multiplicador universal validado | Ensaios por liga e bandas de dureza, com mesma ferramenta e critério de vida. |
| fz por diâmetro | Catálogos estão fora do território; a literatura não fecha a tabela do produto | Catálogo primário da geometria exata ou ensaio. |
| Forma universal fz(D) | Não encontrada | Dados suficientes para comparar degraus, linear e potência. |
| Pico de Vc em Ø6–8 | Fonte da curva não identificada | Documento original e justificativa de RPM, potência ou dinâmica. |
| Piso 0,002 mm/dente | Não é piso físico universal | Medir r_e e calibrar h_min por material/geom./batimento. |
| Raio de aresta por diâmetro | Não encontrado em fonte independente aberta | Especificação metrológica do fabricante ou medição óptica. |
| Teto de fz | Não há valor universal | Força, potência, deflexão, estabilidade e resistência da aresta. |
| Janelas 0,50/0,75/1,20/1,50 | Sem documento de origem | DOE e envelope de processo por parâmetro e falha. |
| Expoente Taylor n | Explicitamente reservado para outra rodada | Ensaios de vida para cada combinação relevante. |

# Lacunas declaradas

A principal lacuna é deliberada: o documento simultaneamente restringe esta rodada a handbooks, literatura e normas e pede, em vários subitens, números de catálogo de fabricantes. Como catálogo está fora do território, nenhum número encontrado apenas em catálogo foi usado para preencher célula. Também não foi possível recuperar os textos integrais protegidos por captcha/paywall de algumas páginas de handbook e bases; seus resumos bibliográficos foram usados somente para afirmar o escopo da obra, não para inventar tabelas.

Continuam sem base auditável nesta rodada as faixas exatas de Vc para cada material e operação, as faixas de fz por diâmetro da ferramenta específica, os multiplicadores por revestimento/refrigeração/estratégia, os raios de aresta por diâmetro, um teto universal de fz, uma janela numérica de tolerância e o expoente Taylor. Para fechar esses itens seriam necessários o catálogo primário da ferramenta ou ensaios próprios estruturados pela ISO 8688-2, com material, dureza, substrato, revestimento, geometria, D, Z, ae, ap, fluido, estratégia, rotação, fz, critério de desgaste e vida-alvo registrados.

# Fontes

[1]: https://doi.org/10.31399/asm.hb.mhde2.a0003188 "Joseph R. Davis (ed.), Cutting Tool Materials, Metals Handbook Desk Edition, 2nd ed., ASM International, 1998, pp. 901–904."

[2]: https://www.iso.org/obp/ui/#iso:std:iso:8688:-2:ed-1:v1:en "ISO 8688-2:1989, Tool life testing in milling — Part 2: End milling."

[3]: https://doi.org/10.1016/j.ijmachtools.2014.11.001 "F. B. Oliveira et al., Size effect and minimum chip thickness in micromilling, International Journal of Machine Tools and Manufacture 89 (2015), 39–54."

[4]: https://doi.org/10.3390/coatings10030235 "V. F. C. Sousa; F. J. G. Silva, Recent Advances on Coated Milling Tool Technology—A Comprehensive Review, Coatings 10(3), 235 (2020)."

[5]: https://dl.asminternational.org/handbooks/edited-volume/9/chapter-abstract/109614/Introduction-to-Heat-Treating-of-Tool-Steels "R. A. Mesquita; R. E. Schneider, Introduction to Heat Treating of Tool Steels, ASM Handbook, 2014."

[6]: https://mfr.edp-open.org/articles/mfreview/full_html/2021/01/mfreview200041/T1.html "A. Mamedov et al., Micro milling process modeling: a review, Manufacturing Review (2021)."

[7]: https://doi.org/10.3390/mi11100924 "X. Wu et al., Experimental Study on the Minimum Undeformed Chip Thickness Based on Effective Rake Angle in Micro Milling, Micromachines 11(10), 924 (2020)."


---
---

# MATERIAL 3 de 3 — RETORNO B (território: catálogo de fabricante)

---

<!-- CABECALHO DE PROCEDENCIA - adicionado ao arquivar. O corpo abaixo esta INTACTO. -->
# RESPOSTA R4 (B) - Velocidades e Avancos - territorio: catalogo de fabricante

> **Retorno cru.** Nao editado. Vale por ser cru - e registro de procedencia.
> **Rodada:** R4, executada em par cego. Este e o retorno **B**.
> **Territorio:** catalogo tecnico, carta de velocidade/avanco, datasheet e pagina de
> produto de fabricante. Handbook, norma e artigo academico estavam PROIBIDOS
> neste retorno, por desenho.
> **Ferramenta:** IA externa. **Arquivado:** 20/08/2026.
> **Titulo original do arquivo entregue:** "Validacao de tabelas de velocidade de corte
> e avanco por dente para fresamento CNC". O nome e enganoso: **isto nao e uma
> validacao**, e o retorno de pesquisa. A validacao desta rodada sera gravada em
> `VALIDACAO_R4.md`, por um auditor que nao pesquisou e que nao sabera qual retorno
> veio de qual territorio.

---

# Validação de tabelas de velocidade de corte e avanço por dente para fresamento CNC

**Escopo:** fresa inteiriça de metal duro, topo reto, toroidal e esférica, com aplicação dominante em moldes e matrizes.

**Território de fonte aplicado:** foram usados somente catálogos, cartas de velocidade/avanço, páginas de produto e materiais técnicos dos fabricantes autorizados no enunciado. Handbooks, normas, artigos acadêmicos, distribuidores, blogs de terceiros e calculadoras de terceiros foram excluídos. Quando a página de um fabricante não expôs o número, o resultado foi mantido como **LACUNA**.

**Regra de confiança:** nenhum achado recebeu `CONSENSO`, porque não foram encontradas três fontes realmente independentes publicando o mesmo número para a mesma ferramenta, material, geometria e estratégia. Catálogos diferentes da OSG foram tratados como referências da mesma origem, não como três fontes independentes.

## Bloco 1 — Questão 1: velocidade de corte por material

**Veredito:** a tabela atual não pode usar uma única faixa de `Vc` por material; os dados do fabricante mudam substancialmente com geometria, dureza, revestimento, engajamento, profundidade e estratégia.

**Confiança:** `SEM CONSENSO` para uma faixa universal; `REFERÊNCIA ÚNICA` para cada linha de catálogo citada.

### 1.1 Divergência do aço 1045

A carta OSG para fresa WXL de 4 cortes, em **side milling**, publica `250 SFM = 76,2 m/min` para o grupo `<32 HRC` que inclui ferro fundido, aços carbono, aços-liga, inox e aços para matriz. A carta OSG para fresa esférica WXL de 4 cortes publica `400 SFM = 121,9 m/min` para `Up to 32 HRC`, incluindo aço carbono, e `350 SFM = 106,7 m/min` para o grupo `42–50 HRC` que nomeia P20 e H13.[2] [1]

Uma terceira carta OSG, para fresa WXL de 4 cortes com raio, identifica explicitamente `1045, 1055` no quadro **High Speed Light Milling** e publica `1.560 SFM = 475,5 m/min`. O mesmo catálogo publica `396 SFM = 120,7 m/min` para side milling no grupo `<20 HRC`. Esses dois números não são alternativas intercambiáveis: o primeiro é HSM light milling, com envelope de corte e centro de usinagem próprios; o segundo é side milling convencional da carta.[3]

| Condição publicada pelo fabricante | Vc publicado | Conversão | Confiança | Aplicabilidade ao 1045 |
|---|---:|---:|---|---|
| OSG WXL 4F, side milling, grupo `<32 HRC` | 250 SFM | **76,2 m/min** | `REFERÊNCIA ÚNICA` | Proxy direto de aço carbono; não é 1045 individualizado [2] |
| OSG WXL ball end 4F, roughing/contouring, `Up to 32 HRC` | 400 SFM | **121,9 m/min** | `REFERÊNCIA ÚNICA` | Proxy de aço carbono; geometria esférica [1] |
| OSG WXL radius 4F, side milling, `<20 HRC` | 396 SFM | **120,7 m/min** | `REFERÊNCIA ÚNICA` | Grupo próximo; não é 1045 nominal nessa seção [3] |
| OSG WXL radius 4F, HSM light milling, `1045, 1055` | 1.560 SFM | **475,5 m/min** | `REFERÊNCIA ÚNICA` | Dado direto, porém somente HSM light milling [3] |

A resposta implementável é, portanto, **condicional**. Para uma fresa revestida WXL em side milling/contorno comum, o território pesquisado sustenta aproximadamente **76–122 m/min** como faixa de partida de catálogo, com a condição explícita de ferramenta, dureza de grupo, `ae/ap`, máquina rígida e refrigeração indicadas na carta. Para HSM light milling em ferramenta WXL dedicada, o número publicado para 1045/1055 é **475,5 m/min**, mas não deve ser misturado à faixa convencional.[2] [1] [3]

O valor atual **150–200 m/min** fica **23–64% acima** da faixa de 121,9 m/min e **97–162% acima** da referência de 76,2 m/min. O valor pontual de **140 m/min** fica cerca de **15% acima** de 121,9 m/min. O caso antigo **80–120 m/min** está dentro ou muito próximo da faixa convencional publicada; a fonte ausente impede validar a origem histórica. Assim, o sistema deve retirar o rótulo `validado` de 150–200 m/min para operação genérica, salvo quando a entrada declarar explicitamente HSM e a carta da ferramenta utilizada sustentar a condição. O valor 140 m/min deve ser tratado como `SEM CONSENSO`, não como correção automática.

### 1.2 A velocidade de acabamento deve ser maior que a de desbaste?

**Não como convenção universal.** Na carta OSG de fresa esférica WXL, o mesmo grupo `Up to 32 HRC` aparece com `Vc=121,9 m/min` no desbaste e `Vc≈217,3 m/min` no acabamento; no grupo que nomeia P20/H13, aparece aproximadamente `106,7 m/min` no desbaste e `170,9 m/min` no acabamento.[1] Essa é uma regra publicada para aquela geometria e aquele catálogo, não uma lei que possa ser copiada para todos os materiais.

A razão correta não é simplesmente “retirar menos material”. O acabamento pode admitir maior velocidade quando o menor `ae/ap` reduz carga instantânea, espessura de cavaco e sobrecarga da aresta. A Harvey descreve HEM como baixo engajamento radial e maior profundidade axial, espalhando desgaste e dissipando calor; também explica que o fresamento concordante reduz rubbing e transfere calor para o cavaco.[8] [9] A Sandvik reforça que cavaco excessivamente fino prejudica formação e vida, enquanto cavaco excessivo sobrecarrega a aresta e pode quebrá-la.[14]

A relação pode se inverter em uma comparação de estratégias: um desbaste HSM/HEM pode ter Vc maior que um acabamento convencional. Contudo, **não foi encontrada, no território permitido, uma carta de fabricante que publique uma inversão explícita para o mesmo material e a mesma ferramenta**. Essa combinação fica `NÃO ENCONTRADO`; o sistema não deve inventá-la.

### 1.3 Validação dos seis estimados

| Material do sistema | O que foi localizado em fabricante | Regra recomendada | Confiança |
|---|---|---|---|
| **P20, 280–320 HB** | OSG nomeia P20 somente no grupo `42–50 HRC`, com `46,6 m/min` em side milling e `147,0 m/min` em HSM light milling na carta WXL 4F [2]. | Não aplicar automaticamente ao P20 de 280–320 HB. Manter `LACUNA` para essa condição; registrar separadamente o grupo publicado `42–50 HRC`. | `REFERÊNCIA ÚNICA` para o grupo; `NÃO ENCONTRADO` para P20 na dureza da tabela |
| **2711, 300–340 HB** | Nenhuma carta autorizada localizada nomeia 2711 nem fornece equivalência DIN/AISI utilizável. | `LACUNA`. Não converter para P20, 4140 ou outro proxy sem fonte de fabricante que declare a equivalência. | `NÃO ENCONTRADO` |
| **8620 núcleo, 180–220 HB** | As cartas OSG têm grupos de aço carbono/aço-liga abaixo de 32 HRC, mas não nomeiam 8620 nessa condição. A referência de side milling de 250 SFM é `76,2 m/min`; HSM light milling do grupo geral é `375,2 m/min` [2]. | Usar somente como proxy operacional de grupo, nunca como dado direto de 8620. O “erro” de material não é quantificado pelo fabricante; declarar `não quantificável` em vez de inventar ±%. | `REFERÊNCIA ÚNICA` para proxy; `NÃO ENCONTRADO` para dado direto |
| **8620 cementado, 58–62 HRC** | OSG publica `29,3 m/min` para `55–60 HRC` e `47,5 m/min` para `45–55 HRC` em side milling; não publica faixa completa `60–62 HRC` na mesma carta [3]. | Usar o intervalo de dureza publicado somente até 60 HRC. Para 60–62 HRC, `LACUNA`; não extrapolar. | `REFERÊNCIA ÚNICA` parcial |
| **H13 tratado, 45–52 HRC** | OSG nomeia H13 no grupo `42–50 HRC`, com `46,6 m/min` em side milling e `147,0 m/min` em HSM light milling [2]. Outra carta cita H13 em grupos de dureza distintos, mas não resolve a condição 50–52 HRC [3]. | Aplicar apenas para a parte efetivamente coberta pelo grupo `42–50 HRC`; manter `LACUNA` para H13 acima de 50 HRC. | `REFERÊNCIA ÚNICA` parcial |
| **Alumínio 6061-T6** | A OSG publica grupo “Aluminum/Copper Alloy” em WXL 4F: `296,9 m/min` em side milling e `495,9 m/min` em HSM light milling [2]. Não individualiza 6061-T6. | Proxy de alumínio; não afirmar que é dado específico de 6061-T6. | `REFERÊNCIA ÚNICA` para proxy |

Para a designação **2711**, a equivalência DIN/AISI solicitada não foi encontrada em uma página de fabricante autorizada. Esse é um caso em que uma equivalência conhecida fora do território seria precisamente o tipo de preenchimento proibido pelo enunciado; a célula deve permanecer `LACUNA`.

### 1.4 Condições ausentes: revestimento, refrigeração e estratégia

| Variável | Evidência localizada | O que o sistema deve fazer | Confiança |
|---|---|---|---|
| Sem revestimento × TiAlN/AlTiN/AlCrN | A Helical publica classes próprias, não multiplicadores entre essas quatro condições. A Harvey confirma AlTiN Nano em fresas esféricas para aços endurecidos até 55 Rc; Kennametal confirma classe PVD KC637M para aços acima de 48 HRC, mas não publica Vc na página aberta [11] [10] [5]. | Não inserir multiplicador universal. Exigir ferramenta/revestimento como chave de consulta. `LACUNA` para comparações numéricas específicas entre sem revestimento, TiAlN, AlTiN e AlCrN. | `NÃO ENCONTRADO` para multiplicador |
| Seco | A Helical declara que Aplus foi comprovado em alta velocidade e condições a seco; OSG HSM recomenda ar e adverte sobre fluido inflamável em ferramenta desgastada [11] [3]. | Registrar seco como condição distinta; não atribuir percentual universal de aumento/redução. | `REFERÊNCIA ÚNICA` qualitativa |
| Ar comprimido | OSG recomenda air blow em cartas WXL e na carta HSM; OSG 3430 recomenda air blow ou MQL [1] [2] [3]. | Pode ser opção de partida apenas quando a carta da ferramenta assim indicar. | `REFERÊNCIA ÚNICA` |
| MQL | OSG 3430 recomenda air blow ou MQL; não publica um multiplicador contra emulsão [1]. | Registrar como condição explícita, sem inventar correção numérica. | `REFERÊNCIA ÚNICA` qualitativa |
| Emulsão/refrigerante solúvel | OSG UVX-Ti recomenda refrigerante solúvel em água; OSG WXL pede fluido apropriado e a carta não dá fator numérico [4] [1] [2]. | Para Ti-6Al-4V, declarar refrigerante solúvel como condição da carta. | `REFERÊNCIA ÚNICA` |
| Alta pressão | Nenhum fator específico localizado em carta autorizada aplicável às fresas do escopo. | `LACUNA`. Não usar multiplicador de alta pressão. | `NÃO ENCONTRADO` |
| Convencional/side milling | OSG publica `250 SFM` no List 3604 e `396 SFM` no List 3670 para grupos de aço de menor dureza; as profundidades `ae/ap` são parte da tabela [2] [3]. | Vc só é válido junto com geometria e envelope da carta. | `REFERÊNCIA ÚNICA` |
| HSM light milling | Para `<32 HRC`, OSG List 3604 passa de `250` para `1.231 SFM`, aumento de **392%**; para o grupo P20/H13 `42–50 HRC`, passa de `153` para `482 SFM`, aumento de **215%** [2]. | HSM deve ser uma estratégia separada, não um multiplicador oculto da tabela genérica. | `REFERÊNCIA ÚNICA` |
| HEM/Dynamic milling | Harvey confirma menor `ae/RDOC` e maior `ap/ADOC`, além de chip thinning; não publica multiplicador universal de Vc/fz [8]. | Criar tabela própria por trajetória, ae, ap e ferramenta. | `REFERÊNCIA ÚNICA` qualitativa |

A variação de estratégia publicada pela OSG é muito maior que a largura de várias faixas atuais. Portanto, a tabela sem `ae`, `ap`, estratégia, ferramenta e refrigeração entrega menos informação do que aparenta.

### 1.5 Dureza como eixo

Não foi localizada uma regra de fabricante do tipo “corrija `Vc` em X% por cada 40 HB dentro da mesma liga”. O que foi localizado é uma organização por **faixas de HRC**. OSG List 3670 publica a seguinte tabela para side milling com fresa WXL de 4 cortes:[3]

| Faixa de dureza publicada | Grupo de material | Vc side milling |
|---|---|---:|
| `<20 HRC` | Mild/carbon steels, cast iron | **120,7 m/min** |
| `20–30 HRC` | Alloy steels, tool steels | **89,7 m/min** |
| `30–38 HRC` | Hardened/pre-hardened steels, H13 | **78,6 m/min** |
| `38–45 HRC` | Stainless/pre-hardened steels | **58,5 m/min** |
| `45–55 HRC` | Hardened steels | **47,5 m/min** |
| `55–60 HRC` | Hardened steels | **29,3 m/min** |

A tabela é uma **referência única por faixa**, não uma lei de correção contínua. Para aços de molde tratados, HRC é de fato o eixo operacional publicado nas cartas localizadas; porém, o catálogo OSG não permite concluir que a liga deixou de importar. A ferramenta, a preparação da aresta, o revestimento e a estratégia continuam determinantes.

### 1.6 Expansão para K e S

| Material | Condição de fabricante | Faixa recomendável no território pesquisado | Confiança |
|---|---|---:|---|
| **GG25** | OSG List 3604 nomeia `cast iron` no grupo `<32 HRC`: `250 SFM = 76,2 m/min` em side milling e `1.231 SFM = 375,2 m/min` em HSM light milling [2]. | **76,2 m/min** para side milling da carta; **375,2 m/min** somente para HSM light milling. É proxy de ferro fundido, não confirmação específica de GG25. | `REFERÊNCIA ÚNICA` proxy |
| **GGG50** | Nenhuma carta consultada nomeia ferro fundido nodular/GGG50. | `LACUNA`. Não usar automaticamente a linha “cast iron” como equivalente de nodular. | `NÃO ENCONTRADO` |
| **Ti-6Al-4V** | OSG AERO UVX-Ti, fresa 5F dedicada: side milling `200–265 SFM = 61,0–80,8 m/min`, `aa≤1,8D`, `ar=0,2D`; slotting `100–165 SFM = 30,5–50,3 m/min`, `aa≤1D`. Refrigerante solúvel em água é altamente recomendado [4]. | **61,0–80,8 m/min** em side milling ou **30,5–50,3 m/min** em slotting, somente com a ferramenta e o envelope da carta. | `REFERÊNCIA ÚNICA` direta |

## Bloco 2 — Questão 2: avanço por dente (`fz`) por diâmetro

**Veredito:** os fabricantes consultados publicam `fz` em tabelas discretas por diâmetro, ferramenta, dureza e operação. Não foi encontrada uma regra universal linear `fz=f(D)` nem base para aplicar as frações internas de 60%, 75%, 85% e 110% a todas as ferramentas.

**Confiança:** `REFERÊNCIA ÚNICA` para os pontos de catálogo; `SEM CONSENSO` para as regras universais do sistema.

### 2.1 Comparação da tabela atual com carta de fabricante

A tabela atual é para aço `28–34 HRC`, mas a carta OSG 3430/3530 mais próxima publica o grupo `Up to 32 HRC`, com fresa esférica WXL de 4 cortes, contorno, ar/MQL, overhang máximo 4×D e valores de partida. Portanto a comparação é um **proxy próximo**, não uma validação direta de toda a faixa 28–34 HRC.[1]

| D | fz OSG desbaste, proxy ≤32 HRC | fz atual do sistema | Diferença atual sobre OSG | fz OSG acabamento | Confiança |
|---:|---:|---:|---:|---:|---|
| 1,0 mm | 0,0110 | 0,0120 | +9% | 0,0110 | `REFERÊNCIA ÚNICA` |
| 2,0 mm | 0,0220 | 0,0300 | +36% | 0,0220 | `REFERÊNCIA ÚNICA` |
| 3,0 mm | 0,0366 | 0,0500 | +37% | 0,0376 | `REFERÊNCIA ÚNICA` |
| 4,0 mm | 0,0494 | 0,0700 | +42% | 0,0505 | `REFERÊNCIA ÚNICA` |
| 6,0 mm | 0,0756 | 0,1000 | +32% | 0,0766 | `REFERÊNCIA ÚNICA` |
| 8,0 mm | 0,1028 | 0,1200 | +17% | 0,1031 | `REFERÊNCIA ÚNICA` |
| 10,0 mm | 0,1301 | 0,1400 | +8% | 0,1299 | `REFERÊNCIA ÚNICA` |
| 12,0 mm | 0,1568 | 0,1600 | +2% | 0,1564 | `REFERÊNCIA ÚNICA` |

Para `D=0,2`, `0,5`, `0,75`, `0,8`, `1,5`, `14` e `16 mm`, não foi encontrada, no território consultado, uma carta numérica que publique a mesma combinação de aço, geometria, revestimento e operação. O Kennametal confirma uma fresa esférica revestida de `D=0,5 mm`, `Z=2` e classe PVD KC637M para aços acima de 48 HRC, mas o painel de Feeds & Speeds não expôs uma tabela numérica para o produto; não é permitido preencher essa célula por interpolação de conhecimento próprio.[5]

A tabela atual parece **agressiva sobretudo entre 2 e 6 mm** quando comparada ao proxy OSG de até 32 HRC. Essa comparação não autoriza reduzir automaticamente o sistema, pois as geometrias são diferentes; autoriza, sim, retirar o rótulo `validado` e exigir uma carta de ferramenta específica.

### 2.2 Formato da regra `fz=f(D)`

O formato publicado é de **degraus por faixa ou ponto de diâmetro**, não uma função linear universal. Na OSG 3430/3530, o fz convertido para `Up to 32 HRC` cresce de 0,0110 mm/dente em 1 mm para 0,1568 mm/dente em 12 mm no desbaste; a carta OSG 3604, em outro desenho de fresa, fornece 0,0102 em 1,588 mm, 0,0229 em 3,175 mm, 0,0585 em 6,35 mm e 0,1143 em 12,7 mm.[1] [2]

A Sandvik mostra que `fz` também deve conservar a espessura de cavaco efetiva `h_ex`, e publica fatores de chip thinning de 1,0 em KAPR 90°, 1,4 em KAPR 45° e 5,8 em KAPR 10°.[14] Portanto, mesmo que duas fresas tenham o mesmo diâmetro e material, `fz` pode mudar com ângulo de entrada, raio, `ae/D`, `ap` e estratégia.

**Regra recomendada:** armazenar a tabela discreta do fabricante por ferramenta e interpolar apenas entre pontos da mesma carta, mesma geometria, mesmo revestimento, mesma dureza e mesma estratégia. A interpolação linear hoje usada pelo sistema é uma decisão de implementação; não foi encontrada como regra publicada universal.

### 2.3 Pico de `Vc` até Ø6–8 mm

O pico da tabela do sistema não recebeu confirmação física nas cartas consultadas. OSG publica Vc praticamente constante por grupo de material e estratégia, enquanto o diâmetro altera RPM e avanço. Por exemplo, no OSG 3604, o grupo `<32 HRC` permanece em `250 SFM`; no OSG 3430, o grupo `Up to 32 HRC` permanece em `400 SFM` no desbaste e `713 SFM` no acabamento.[1] [2]

A queda ou o pico na tabela atual é, portanto, mais compatível com **artefato de tabela, limite de RPM ou mistura de cartas** do que com uma lei universal de dissipação de calor. Um limite de RPM pode fazer o menor diâmetro rodar abaixo do Vc nominal; isso não justifica aumentar Vc até um pico e depois reduzi-lo em diâmetros maiores sem declarar o limite da máquina.

**Regra recomendada:** calcular `RPM = 1000·Vc/(π·D)` a partir do Vc da carta e aplicar o limite real de RPM da máquina. Se o limite for atingido, registrar `Vc efetivo` menor; não criar uma curva material-specific de pico sem fonte.

### 2.4 Regras derivadas do sistema

| Regra interna | Evidência do fabricante | Veredito |
|---|---|---|
| Acabamento `Vc × 1,10` | OSG 3430/3530 publica, no proxy P, aproximadamente `217,3/121,9 = 1,78`; no grupo endurecido, `170,9/106,7 = 1,60` [1]. | `NÃO ENCONTRADO` como regra universal; a carta consultada usa aumentos maiores e específicos. |
| Acabamento `fz × 0,60` | OSG mantém fz quase igual entre desbaste e acabamento em sua carta esférica; em 4 mm, 0,0505/0,0494≈1,02 [1]. | `NÃO ENCONTRADO`; tratar como convenção interna não validada. |
| Grupo endurecido `Vc × 0,85` e `fz × 0,75` | OSG publica tabelas próprias por grupo de HRC, sem essa fração fixa [1] [2] [3]. | `NÃO ENCONTRADO` como regra de fabricante. |
| Semi-acabamento como ponto médio | Nenhuma carta localizada declara ponto médio aritmético entre desbaste e acabamento. | `NÃO ENCONTRADO`; só usar se a carta específica trouxer os dois extremos e o software declarar interpolação interna. |

### 2.5 Piso de `fz=0,002 mm/dente`

Não foi encontrada base de fabricante para um piso absoluto de `0,002 mm/dente`. A Harvey explica que, em microfresas, quando a espessura de cavaco fica menor que um valor dependente da ferramenta, o material pode ser espremido sob a aresta; isso aumenta força, atrito, desgaste e rugosidade. O fabricante não fornece um percentual universal nem um valor absoluto de `fz_min`.[7]

A Kennametal confirma uma ferramenta específica de 0,5 mm, mas a página não fornece raio de aresta nem carta numérica de fz para aquele produto.[5] Logo, o piso deve ser substituído por uma fronteira dependente de **raio/preparação de aresta, geometria, runout, material, `ae/ap` e espessura de cavaco efetiva**. O valor `0,002` deve ser rotulado `NÃO ENCONTRADO`, não “validado por microfresa”.

### 2.6 Número de arestas `Z`

O avanço linear total é derivado de `Vf = RPM × fz × Z` quando a carta fornece RPM, avanço e número de cortes. A carta OSG 3604 é de 4 cortes e a AERO UVX-Ti é de 5 cortes; os valores de fz convertidos diferem entre as cartas porque ferramenta, número de cortes, geometria e aplicação também diferem.[2] [4]

Portanto, o sistema pode manter `fz` como grandeza por dente, mas **não pode tratar o avanço linear como independente de Z**. Uma fresa de 2 cortes e uma de 4 cortes não devem receber automaticamente o mesmo `Vf`; o `fz` adequado deve vir da carta da ferramenta, e `Vf` deve ser calculado com o Z real. Não foi encontrada uma correção universal de `fz` somente em função de Z; a dependência deve ser armazenada como dado de ferramenta.

## Bloco 3 — Questão 3: janela de tolerância

**Veredito:** os limiares simétricos `0,50`, `0,75`, `1,20` e `1,50` não têm base nas fontes consultadas e não podem ser aplicados igualmente a `Vc`, `fz`, `ae` e `ap`.

**Confiança:** `NÃO ENCONTRADO` para a janela atual; `REFERÊNCIA ÚNICA` para os mecanismos e faixas publicados.

### 3.1 Fabricantes publicam faixa mínima–máxima ou nominal?

Os fabricantes consultados publicam ambos os formatos, mas não uma “tolerância percentual em torno do recomendado”. A OSG publica faixas explícitas de Vc, por exemplo `200–265 SFM` para side milling e `100–165 SFM` para slotting na ferramenta AERO UVX-Ti; em outras cartas publica um Vc nominal por grupo e tabelas de RPM/avanço por diâmetro.[4] A Kennametal informa que sua calculadora é teórica, voltada a planejamento, e que os resultados reais variam.[6]

A estrutura correta é, portanto, **faixa de aplicação da carta**, não janela simétrica genérica. Cada faixa deve levar consigo ferramenta, substrato, revestimento, dureza, geometria, `ae`, `ap`, refrigeração, overhang e estratégia.

### 3.2 Sensibilidade relativa de `Vc`, `fz`, `ae` e `ap`

Não foi localizada fonte de fabricante que ordene numericamente os quatro parâmetros em uma escala única. Como regra operacional conservadora para risco imediato de formação de cavaco e aresta, a ordem recomendada é:

| Ordem operacional proposta | Parâmetro | Motivo publicado | Confiança |
|---:|---|---|---|
| 1 | `fz` | Cavaco fino demais causa rubbing/poor chip formation; cavaco grosso demais sobrecarrega e pode quebrar a aresta [7] [14]. | `SEM CONSENSO` para ranking universal; mecanismo `REFERÊNCIA ÚNICA` |
| 2 | `ae` | Baixo `ae/D` gera chip thinning e exige correção de fz; aumentar ae altera carga radial e espessura efetiva [14] [8]. | `SEM CONSENSO` |
| 3 | `ap` | Em ferramentas de raio/ball, a profundidade muda o ângulo de entrada e a distribuição de carga ao longo da aresta [14]. | `SEM CONSENSO` |
| 4 | `Vc` | Vc altera carga térmica, desgaste e possibilidade de aresta postiça; não é, por si, um limite simétrico de corte [7] [11]. | `SEM CONSENSO` |

Essa ordem é uma **estrutura de segurança**, não um fato universal. Para objetivo de vida da ferramenta, `Vc` pode tornar-se tão sensível quanto `fz`; por isso o sistema não deve exibir um único ranking fixo sem declarar se está protegendo aresta, potência, acabamento ou vida.

### 3.3 Piso físico de `fz`: raio de aresta e espessura mínima de cavaco

**Raio de aresta por faixa de diâmetro.** Não foi encontrado catálogo autorizado que publique, para a família de fresas inteiriças do escopo, o raio de preparação da aresta por diâmetro. O raio de 0,25 mm que aparece na página Kennametal é raio de ponta esférica de uma fresa de 0,5 mm, não raio de preparação do gume.[5] Usá-lo como `r_e` seria um erro de identificação.

**Espessura mínima como percentual de `r_e`.** A hipótese preliminar de `5–20%` do raio não foi confirmada por fabricante autorizado. A Harvey afirma que o valor crítico depende da ferramenta e que, abaixo dele, há ploughing/rubbing, mas não publica o percentual.[7] O sistema deve registrar `LACUNA`, não transformar 5–20% em regra.

**Tradução para o sistema.** A forma tecnicamente adequada é:

`h_min = função(r_e, preparação da aresta, material, KAPR, ae/D, ap, runout e estratégia)`

`fz_min = fator_de_geometria × h_min`

A Sandvik publica fatores de chip thinning para manter `h_ex`, como 1,0 em KAPR 90°, 1,4 em KAPR 45° e 5,8 em KAPR 10°, mas esses fatores não são um `h_min` para microfresas e não devem ser transplantados diretamente para a fresa inteiriça do sistema.[14] A fração `fz_min/fz_recomendado` permanece **não quantificável** dentro do território pesquisado.

### 3.4 Teto de `fz`

A Sandvik declara que `h_ex` alto demais sobrecarrega a aresta e pode levar à quebra; a Harvey recomenda ajustar a profundidade para evitar relação de espessura de cavaco/raio muito pequena.[14] [7] Nenhuma carta consultada publica um teto universal de `fz` para todas as fresas inteiriças, materiais e máquinas.

O teto deve ser calculado por **carta da ferramenta e envelope da máquina**, considerando número de cortes, potência, torque, rigidez, balanço, `ae`, `ap`, entrada/saída e limite de lascamento. `fz_max` universal é `NÃO ENCONTRADO`. Potência da máquina é um limite possível, mas não substitui o limite de espessura de cavaco e resistência da aresta.

### 3.5 Efeito de `Vc +20%` sobre vida

A relação de Taylor pode ser escrita, sem escolher um expoente não pesquisado, como:

`V₁ · T₁ⁿ = V₂ · T₂ⁿ`

Se `V₂ = 1,20 · V₁`, então:

`T₂/T₁ = (1,20)^(-1/n)`

`redução percentual da vida = [1 − (1,20)^(-1/n)] × 100%`

Essa é a quantificação auditável possível nesta rodada. O expoente `n` não foi encontrado em catálogo de fabricante autorizado para a combinação do sistema e pertence à rodada explicitamente separada no enunciado. Portanto, **não há percentual numérico honesto para a redução de vida** nesta entrega. A afirmação “+20% de Vc reduz a vida em X%” deve ser bloqueada até que `n` e a ferramenta/material sejam fornecidos por fonte elegível.

### 3.6 Estrutura de zonas recomendada

A substituição recomendada é abandonar limiares universais e usar zonas derivadas da carta e da física de cada parâmetro.

| Parâmetro | Zona abaixo do ponto de partida | Zona recomendada | Zona acima do ponto de partida | Assimetria que deve ser implementada |
|---|---|---|---|---|
| `fz` | Pode entrar em rubbing/ploughing se `h_ex` cair abaixo do mínimo da ferramenta; não é automaticamente conservador [7] [14]. | Faixa de fz publicada para ferramenta/material/estratégia. | Pode elevar `h_ex`, força, potência, lascamento e quebra [14]. | Piso físico e teto de carga são distintos; não usar janela simétrica. |
| `ae` | Reduz carga, mas produz chip thinning e pode exigir aumento de fz para manter `h_ex` [14]. | `ae/D` da carta. | Aumenta engajamento radial e carga; risco depende de `ap`, canto, ferramenta e máquina. | Baixo ae não deve ser rotulado vermelho por si só. |
| `ap` | Pode reduzir carga, mas muda KAPR/espessura em ball/toroidal e pode piorar resultado geométrico [14]. | Profundidade da carta. | Aumenta contato, força, deflexão e potência. | Baixo ap é geralmente conservador para carga, mas não é sempre equivalente. |
| `Vc` | Pode reduzir temperatura, mas pode favorecer rubbing/aresta postiça em certas condições; não declarar seguro universal [7] [9]. | Vc da carta. | Aumenta carga térmica e desgaste; efeito de vida depende de `n` e ferramenta. | Limite superior tende a ser mais crítico para vida, mas o inferior também pode ser perigoso. |

**Recomendação de implementação:** cada zona deve ser calculada contra o envelope publicado da ferramenta, e não contra quatro razões fixas. Quando não houver envelope, o sistema deve exibir `NÃO ENCONTRADO` ou `LACUNA`, solicitando ferramenta, revestimento, material, dureza, estratégia, `ae`, `ap`, refrigeração e máquina.

## Bloco 4 — Tabela A: velocidades recomendadas

As linhas abaixo são **pontos de partida de catálogo**, não valores universais. A condição foi mantida junto ao número e a confiança é por linha.

| Material/condição | Desbaste ou side milling | Semi-acabamento | Acabamento/HSM | Condição obrigatória | Confiança |
|---|---:|---:|---:|---|---|
| Aço carbono grupo `<32 HRC`, proxy para 1020/1045 | **76,2–121,9 m/min** [2] [1] | `NÃO ENCONTRADO` | HSM 1045/1055: **475,5 m/min** [3] | WXL 4F; side/contour para a faixa baixa; HSM dedicado para 475,5; overhang e ae/ap da carta | `REFERÊNCIA ÚNICA` proxy |
| 1045 nominal em HSM | `NÃO MISTURAR` com side milling | `NÃO ENCONTRADO` | **475,5 m/min** [3] | WXL 4F, HSM light milling, 1045/1055 explícitos | `REFERÊNCIA ÚNICA` direta |
| Inox grupo da carta | **58,5–76,2 m/min** como grupos OSG de aço/inox [3] [2] | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` específico para 304 | Não equivale automaticamente a AISI 304; declarar grupo de dureza e ferramenta | `REFERÊNCIA ÚNICA` proxy |
| Alumínio/cobre, proxy para 6061-T6 | **296,9 m/min** [2] | `NÃO ENCONTRADO` | HSM **495,9 m/min** [2] | OSG WXL 4F; grupo aluminum/copper; não individualiza 6061-T6 | `REFERÊNCIA ÚNICA` proxy |
| P20 no grupo publicado `42–50 HRC` | **46,6 m/min** [2] | `NÃO ENCONTRADO` | HSM **147,0 m/min** [2] | Só para a condição de grupo da carta; não usar no P20 280–320 HB sem validação | `REFERÊNCIA ÚNICA` parcial |
| 2711 | `LACUNA` | `LACUNA` | `LACUNA` | Falta equivalência DIN/AISI e carta nominal do fabricante | `NÃO ENCONTRADO` |
| 8620 núcleo, proxy `<32 HRC` | **76,2 m/min** [2] | `NÃO ENCONTRADO` | HSM de grupo **375,2 m/min** [2] | Proxy não nomeia 8620; erro de material não quantificado | `REFERÊNCIA ÚNICA` proxy |
| 8620 cementado | **29,3–47,5 m/min** em 45–60 HRC [3] | `NÃO ENCONTRADO` | HSM **94,5 m/min** somente no grupo 45–55 HRC [3] | Não cobre 60–62 HRC; não extrapolar | `REFERÊNCIA ÚNICA` parcial |
| H13 tratado, grupo `42–50 HRC` | **46,6 m/min** [2] | `NÃO ENCONTRADO` | HSM **147,0 m/min** [2] | H13 explícito na linha, mas faixa 50–52 HRC não fechada | `REFERÊNCIA ÚNICA` parcial |
| GG25, proxy cast iron | **76,2 m/min** [2] | `NÃO ENCONTRADO` | HSM **375,2 m/min** [2] | Não individualiza GG25 | `REFERÊNCIA ÚNICA` proxy |
| GGG50 | `LACUNA` | `LACUNA` | `LACUNA` | Falta carta de nodular/GGG50 | `NÃO ENCONTRADO` |
| Ti-6Al-4V, side milling | **61,0–80,8 m/min** [4] | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` | AERO UVX-Ti 5F, `aa≤1,8D`, `ar=0,2D`, refrigerante solúvel recomendado | `REFERÊNCIA ÚNICA` direta |
| Ti-6Al-4V, slotting | **30,5–50,3 m/min** [4] | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` | AERO UVX-Ti 5F, `aa≤1D`, refrigerante solúvel recomendado | `REFERÊNCIA ÚNICA` direta |

## Bloco 5 — Tabela B: avanços recomendados

A tabela a seguir usa pontos realmente convertidos de uma carta de fabricante, não uma interpolação inventada. A base é OSG WXL 4F ball end, grupo `Up to 32 HRC`, proxy para o grupo do sistema `28–34 HRC`. O sistema atual é mostrado apenas para auditoria da divergência.

| D (mm) | fz desbaste OSG | fz atual | fz acabamento OSG | Regra recomendada |
|---:|---:|---:|---:|---|
| 0,2 | `LACUNA` | 0,003 | `LACUNA` | Não usar piso absoluto sem carta da microfresa. |
| 0,5 | `LACUNA` | 0,006 | `LACUNA` | Kennametal confirma ferramenta 0,5 mm, mas não publicou fz na página aberta [5]. |
| 0,75 | `LACUNA` | 0,008 | `LACUNA` | Solicitar carta da ferramenta. |
| 0,8 | `LACUNA` | 0,010 | `LACUNA` | Solicitar carta da ferramenta. |
| 1,0 | 0,0110 | 0,012 | 0,0110 | Ponto OSG; não aplicar a outra geometria sem confirmação [1]. |
| 1,5 | `LACUNA` | 0,020 | `LACUNA` | Não interpolar entre tabelas diferentes. |
| 2,0 | 0,0220 | 0,030 | 0,0220 | O sistema está 36% acima do ponto OSG proxy [1]. |
| 3,0 | 0,0366 | 0,050 | 0,0376 | O sistema está 37% acima do ponto OSG proxy [1]. |
| 4,0 | 0,0494 | 0,070 | 0,0505 | O sistema está 42% acima; não usar acabamento ×0,60 [1]. |
| 6,0 | 0,0756 | 0,100 | 0,0766 | O sistema está 32% acima do ponto OSG proxy [1]. |
| 8,0 | 0,1028 | 0,120 | 0,1031 | O sistema está 17% acima do ponto OSG proxy [1]. |
| 10,0 | 0,1301 | 0,140 | 0,1299 | O sistema está 8% acima do ponto OSG proxy [1]. |
| 12,0 | 0,1568 | 0,160 | 0,1564 | Diferença aproximada de 2%; ainda é proxy de geometria esférica [1]. |
| 14,0 | `LACUNA` | 0,180 | `LACUNA` | Carta específica necessária. |
| 16,0 | `LACUNA` | 0,200 | `LACUNA` | Carta específica necessária. |

A regra recomendada para o software é guardar `fz` como dado da ferramenta, com `Z`, geometria, revestimento, material, dureza, `ae`, `ap`, estratégia e refrigeração como chaves. `Vf` deve ser calculado com o Z efetivo; a interpolação pode ser usada apenas dentro da mesma carta e deve exibir a fonte dos pontos vizinhos.

## Bloco 6 — Tabela C: o que continua sem base

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| Faixa universal de 1045 | Três cartas OSG mostram envelopes diferentes por estratégia; não há consenso independente. | Pelo menos três cartas independentes de fabricantes autorizados para a mesma geometria, revestimento, dureza, ae/ap e estratégia. |
| Equivalência de 2711 | Nenhuma página autorizada localizou equivalência DIN/AISI e dados de corte. | Datasheet ou catálogo do próprio fabricante de ferramenta nomeando 2711 e a equivalência usada. |
| P20 280–320 HB | P20 aparece somente no grupo OSG 42–50 HRC. | Carta que nomeie P20 na condição não endurecida da tabela do sistema. |
| H13 50–52 HRC | A linha OSG nomeia H13 em grupo que termina em 50 HRC. | Carta que cubra H13 tratado acima de 50 HRC com a mesma ferramenta. |
| 8620 núcleo e cementado | Apenas proxies por grupos gerais de dureza; não há erro estatístico de proxy. | Carta nominal 8620, separando núcleo e cementado, com HRC/condição de tratamento. |
| GG25 | Foi localizado apenas o grupo genérico `cast iron`. | Carta que nomeie GG25 ou equivalente declarado pelo fabricante. |
| GGG50 | Nenhum dado de nodular/GGG50. | Carta nominal para nodular/GGG50. |
| Ti-6Al-4V acabamento/semi | OSG UVX-Ti publica side milling e slotting, mas não todas as operações do sistema. | Carta da mesma ferramenta para semi-acabamento e acabamento. |
| Multiplicadores de revestimento | Não há comparação autorizada sem revestimento × TiAlN × AlTiN × AlCrN. | Estudo/carta do fabricante da ferramenta com as quatro condições e mesma geometria/material. |
| Multiplicadores de refrigeração | Há recomendações qualitativas, mas não percentuais para seco, ar, MQL, emulsão e alta pressão. | Tabela do fabricante com ensaio comparável e mesma ferramenta. |
| Raio de aresta por diâmetro | O raio de ponta esférica não é raio de preparação do gume. | Catálogo que publique `r_e`/edge preparation por diâmetro e geometria. |
| `h_min = 5–20% r_e` | Não confirmado por fabricante autorizado. | Fonte de fabricante com percentual e condição de medição. |
| Piso absoluto `fz=0,002` | Harvey explica o mecanismo, mas não dá valor absoluto. | Carta de microfresa que publique fz mínimo e raio/preparação da aresta. |
| Teto universal de fz | Sobrecarga depende de aresta, máquina, potência, ae/ap, material e geometria. | Carta específica com limite superior ou ensaio do fabricante. |
| Vida com `Vc +20%` | O expoente `n` não foi encontrado nesta rodada. | Rodada própria com `n` de fabricante para a ferramenta/material ou ensaio comparável. |
| Janela simétrica 0,50–1,50 | Nenhum fabricante consultado publica esses limiares gerais. | Três fontes independentes que publiquem limites por parâmetro, ou dados de ensaio do próprio sistema. |

## Lacunas declaradas

Permanece sem base, dentro do território de fabricantes autorizado, uma equivalência auditável para 2711; uma faixa direta para P20 na condição 280–320 HB; uma linha direta para 8620 núcleo e cementado; uma linha nominal para GG25 e GGG50; uma carta completa de Ti-6Al-4V para semi-acabamento/acabamento; multiplicadores numéricos para sem revestimento, TiAlN, AlTiN e AlCrN; multiplicadores entre seco, ar, MQL, emulsão e alta pressão; raio de aresta por diâmetro; percentual `h_min/r_e`; piso físico absoluto de `fz`; teto universal de `fz`; expoente de Taylor `n`; e limiares universais para as zonas de cor.

Essas lacunas não são falhas da pesquisa. São resultados válidos da restrição de fonte: preencher qualquer uma delas com um número plausível, handbook, norma, artigo, blog ou calculadora de terceiro contrariaria a regra de auditabilidade do sistema.

## Referências

[1]: https://osgtool.com/content/literature/800438CA/Tech%20pg.%20List%20(s)-%203430_3530.pdf "OSG Tool — List 3430/3530 EXOCARB WXL, 4 Flute Ball End, Speeds & Feeds; ano não indicado na página"

[2]: https://osgtool.com/content/literature/8002024CA/Tech%20pg.%20List%20(s)-%203604.pdf "OSG Tool — List 3604 EXOCARB WXL, Regular Length 4 Flute, Speeds & Feeds; ano não indicado na página"

[3]: https://osgtool.com/content/literature/8002024CA/Tech%20pg.%20List%20(s)-%203670.pdf "OSG Tool — List 3670 EXOCARB WXL, 4 Flute Corner Radius, Speeds & Feeds; ano não indicado na página"

[4]: https://osgtool.com/content/literature/8002024CA/Tech%20pg.%20List%20(s)-%202100_%202102_%202106_%202108.pdf "OSG Tool — AERO UVX-Ti Lists 2100/2102/2106/2108, Technical Speed & Feed Chart; ano não indicado na página"

[5]: https://www.kennametal.com/ar/en/products/p.f2alwm-lang-verlangerter-frontschaft-kugelkopf.2657139.html "Kennametal — KenCut MM F2AL-WM Ball Nose, 2 Flutes, KC637M, product page; ano não indicado na página"

[6]: https://www.kennametal.com/us/en/resources/engineering-calculators/miscellaneous/speed-and-feed.html "Kennametal — Speeds and Feeds Calculator; ano não indicado na página"

[7]: https://www.harveyperformance.com/in-the-loupe/how-to-optimize-results-while-machining-with-miniature-end-mills/ "Harvey Performance/Harvey Tool — Optimized Machining With Miniature End Mills; publicado em 2020 na página"

[8]: https://www.harveyperformance.com/in-the-loupe/intro-high-efficiency-milling/ "Harvey Performance/Harvey Tool — Introduction to High Efficiency Milling; publicado em 2017 na página"

[9]: https://www.harveyperformance.com/in-the-loupe/reduce-heat-generation/ "Harvey Performance/Harvey Tool — Effective Ways to Reduce Heat Generation; publicado em 2018 na página"

[10]: https://www.harveytool.com/products/material-specific-end-mills/hardened-steels/ball "Harvey Tool — Material Specific End Mills for Hardened Steels, Ball, AlTiN Nano; ano não indicado na página"

[11]: https://www.helicaltool.com/resources/tool-coatings "Helical Solutions — Tool Coatings, Aplus/Tplus/Zplus/Nplus/Dplus; ano não indicado na página"

[12]: https://www.helicaltool.com/resources/speeds-feeds "Helical Solutions — Speeds & Feeds resource page; ano não indicado na página"

[13]: https://www.sandvik.coromant.com/en-us/tools/milling-tools/solid-carbide-end-mills/coromill-plura "Sandvik Coromant — CoroMill Plura solid carbide end mills by application and material; ano não indicado na página"

[14]: https://www.sandvik.coromant.com/en-us/knowledge/milling/entering-angle-and-chip-thickness "Sandvik Coromant — Entering angle and chip thickness in milling; ano não indicado na página"

[15]: https://guhring.com/SpeedsAndFeeds/SpeedFeed "Guhring — official Speeds & Feeds portal by tool series; ano não indicado na página"


═══════════════════════════════════════════════════════════════════

> Fim do pacote. Salve o retorno como `VALIDACAO_R4.md`.
