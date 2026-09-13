# COLAR — R2-V2 · Onde entra o diâmetro efetivo em fresa esférica

**Cole tudo que está entre as linhas `═══`.** É autossuficiente.
**Salve o retorno como:** `RESPOSTA_R2V2.md`, na pasta `pesquisa/`.
**Conversa nova, sozinha.** Pergunta única — é para ir fundo, não para cobrir área.

---

═══════════════════════════════════════════════════════════════════

# UMA PERGUNTA SÓ, E ELA PRECISA DE UM EXEMPLO RESOLVIDO

Estou construindo uma **calculadora de parâmetros de corte para fresamento CNC** — a ferramenta que diz ao operador de oficina qual rotação e qual avanço programar. Escopo: **fresa inteiriça de metal duro**, em aço, inox, alumínio e aço para molde.

Tudo na calculadora já está fechado, **menos um ponto**, e ele está travando o trabalho há duas rodadas de pesquisa. Preciso que você o resolva.

## Contexto físico — o que já está confirmado e não precisa reconferir

Uma **fresa esférica** (*ball nose*, ponta em meia-esfera) de diâmetro `D`, cortando com profundidade axial `ap` menor que o raio, **não corta com o diâmetro cheio**: só uma calota da esfera encosta na peça. O diâmetro que efetivamente corta é

```
De = 2 × √[ap × (D − ap)]        equivalente a   De = √[D² − (D − 2·ap)²]
```

Isso está confirmado por três apurações independentes. **Não gaste tempo reconferindo essa fórmula.**

Ordem de grandeza: fresa Ø10 mm com `ap` = 0,5 mm ⟹ `De` = 4,36 mm. O diâmetro que corta é **menos da metade** do nominal.

## O ponto que não fecha

O `De` tem que entrar no cálculo. **Não sei onde**, e as duas possibilidades levam a máquinas rodando de formas diferentes:

| Leitura | O que faz | Efeito |
|---|---|---|
| **A — corrige a rotação** | `n = (Vc × 1000) / (π × De)` | a rotação **sobe**, para que a velocidade de corte real na calota seja a desejada. No exemplo acima, `n` sobe 2,29× |
| **B — corrige o avanço** | `n` continua com o `D` nominal, e o avanço vira `fz = D × hex / De` | a rotação **não muda**; o avanço por dente sobe 2,29× |

**As duas não podem ser aplicadas juntas por engano.** Se forem, o avanço da mesa sai **5,2× acima** do certo (2,29 × 2,29), numa operação de acabamento, com ferramenta fina. A ferramenta quebra.

E também não posso simplesmente escolher uma: se elas forem **complementares** — cada uma corrigindo um efeito diferente, uma a velocidade e outra a espessura de cavaco — então aplicar só uma deixa metade do erro de pé.

**O que eu preciso saber é exatamente isto: são cumulativas ou alternativas?**

## Por que a rodada anterior falhou (leia, evita repetir)

Um pesquisador já tentou. Ele **localizou** a fórmula `fz = D3 × hex / De` no guia técnico da Sandvik Coromant (*Metalcutting Technical Guide*, seção D "Milling", página impressa D 24) — mas:

- a **página oficial** da Sandvik respondeu com bloqueio de firewall: *"The requested URL was rejected. Your request was blocked by our Web Application Firewall"*;
- o **PDF do guia** só foi acessível por um endereço de CDN, e a regra de fonte que eu tinha escrito o rejeitou como "cópia de terceiro";
- **nenhum exemplo numérico resolvido** de fresa esférica foi encontrado — e sem ele, as duas leituras continuam empatadas.

**Corrigindo a minha regra, porque ela foi rígida demais e me custou a resposta:** PDF servido por CDN **é** fonte primária, desde que o documento seja identificável como publicação daquele fabricante (capa, título, número de catálogo, ano). O que não vale é cópia hospedada por terceiro sem identificação — site de distribuidor, agregador de PDFs, fórum. Se você encontrar o catálogo em CDN, **use**, e registre o endereço junto com a identificação do documento.

---

# REGRAS DE RESPOSTA

1. **Citação verbatim com localização.** Toda fórmula precisa vir copiada da fonte, entre aspas, com a legenda dos símbolos, mais página/seção e endereço. Fórmula reescrita por você, com sua própria notação, não conta.
2. **`NÃO ENCONTRADO` é resposta válida.** Não reconstrua de memória, não infira do que "normalmente se faz", não deduza a resposta de princípios físicos e apresente como se fosse publicação. Se ninguém publica, eu preciso saber **que ninguém publica** — isso muda a decisão do produto.
3. **Distinga o que a fonte diz do que você conclui.** Se precisar raciocinar para amarrar duas informações, marque o raciocínio como seu, em parágrafo separado, e diga em que evidência ele se apoia.
4. **Fonte elegível:** publicação do próprio fabricante de ferramenta (catálogo, compêndio técnico, guia de aplicação, página de conhecimento, calculadora com fórmula exposta), inclusive servida por CDN quando identificável · artigo em periódico revisado por pares · norma. **Não elegível:** distribuidor, revendedor, marketplace, blog, fórum, agregador de tabelas, vídeo, resposta de IA.
5. **Registre a condição geométrica declarada.** A fórmula do `De` muda se a ferramenta estiver **inclinada** em relação à superfície (fresamento em 5 eixos). Diga sempre se a fonte trata do caso de **eixo perpendicular à superfície** ou de ferramenta inclinada — misturar os dois casos produz erro grande.

---

# O QUE PRECISO, EM ORDEM DE IMPORTÂNCIA

## 1. Um exemplo numérico resolvido — é isto que decide

Procure, em publicação de fabricante, um **caso resolvido de fresa esférica** que traga os números: `D`, `ap`, `Vc` (ou `vc`), `hex` ou `fz`, e os **resultados** de `n` (rpm) e de `fz`/`vf`.

Encontrado o exemplo: **refaça a conta passo a passo** e diga qual das duas leituras — A, B, ou as duas — ela reproduz.

Um único exemplo resolvido, bem transcrito, vale mais que dez páginas de fórmulas soltas. **A Mitsubishi Materials é a pista mais promissora**: ela publica uma página chamada *"Cutting Speed Formula for Ball Nose"* com os parâmetros `ap`, `DC`, `n` e `vc`, e costuma trazer exemplo numérico logo abaixo da fórmula. Comece por ela.

## 2. A fórmula de rotação, em pelo menos dois fabricantes

Na fórmula de **velocidade de corte / rotação publicada para fresa esférica**, o diâmetro que entra é o **nominal** ou o **efetivo**?

Copie verbatim, com a legenda dos símbolos. Onde procurar:

| Fabricante | Onde |
|---|---|
| **Mitsubishi Materials** | páginas de fórmulas técnicas (`mmc-carbide.com` e `mitsubishicarbide.net`) — publicam fórmula de ball nose com exemplo |
| **Sandvik Coromant** | *Metalcutting Technical Guide*, seção D, páginas D 23–D 24. O site oficial bloqueia por firewall — tente o PDF do catálogo em CDN, as versões regionais do site (`/pt-br`, `/de-de`, `/en-gb`), ou o catálogo de ferramentas rotativas |
| **Kennametal** | *Machining Formulas* e páginas de calculadora de fresamento |
| **Seco Tools** | guia técnico de fresamento e material de treinamento publicado pela empresa |
| **ISCAR** | guias de aplicação de fresamento e artigos técnicos do próprio site |
| **Walter** | *Technical Compendium*, seções de fresamento |
| **Harvey Tool · Helical Solutions · Fraisa · Emuge · OSG · Gühring · Dormer Pramet · Jongen** | fabricantes de fresa inteiriça — vários publicam guia técnico com "ball nose effective diameter" e explicam o porquê |

O último grupo é o mais promissor depois da Mitsubishi: são fabricantes de **fresa inteiriça** — exatamente a ferramenta do meu escopo —, enquanto os grandes catálogos costumam focar em fresa de insertos.

## 3. A fórmula de avanço

Na fórmula de **avanço por dente** para fresa esférica, aparece o fator `D/De` (ou `fz = D3 × hex / De`)? Copie verbatim com a legenda.

## 4. A amarração — a pergunta central, de novo

**Num mesmo documento**, as duas correções aparecem juntas?

- Se um fabricante corrige a **rotação** por `De`, ele **também** corrige o avanço por `D/De`? Ou aí o avanço fica sem correção?
- Se corrige só o avanço, o que ele diz sobre a rotação — explicitamente que usa o `D` nominal, ou simplesmente não comenta?
- Algum fabricante **adverte** contra aplicar as duas? Alguma nota do tipo "não corrija a rotação se já corrigiu o avanço"?

Se as fontes divergirem entre si, **reporte a divergência** com os dois lados citados. Divergência entre fabricantes é resultado útil; escolher um lado por conta própria, não.

## 5. Duas perguntas menores, se sobrar fôlego

**a)** O mesmo tratamento vale para **fresa toroidal** (ponta reta com raio de canto `rε`, trabalhando com `ap < rε`)? Copie a fórmula publicada, se houver.

**b)** Existe uma terceira correção que depende do mesmo `De`: em fresamento com engajamento radial parcial, a espessura do cavaco é corrigida pela razão `ae/D`. Nessa razão, o diâmetro que entra é o **nominal** ou o **efetivo**? Se algum fabricante disser explicitamente, copie.

---

# FORMATO DA ENTREGA

```
## BLOCO 1 — Exemplo resolvido
**Situação:** ENCONTRADO | NÃO ENCONTRADO
[se encontrado: transcrição verbatim do exemplo, a conta refeita passo a passo,
 e qual leitura ele reproduz]

## BLOCO 2 — Fórmula de rotação
[por fabricante: citação verbatim + legenda + página/URL + qual diâmetro entra]

## BLOCO 3 — Fórmula de avanço
[idem]

## BLOCO 4 — Cumulativas ou alternativas
**Veredito:** CUMULATIVAS | ALTERNATIVAS | AS FONTES DIVERGEM | NÃO DETERMINÁVEL
**Em que evidência isso se apoia:** [citação, não raciocínio]
[se houver raciocínio seu amarrando as pontas, aqui, marcado como seu]

## BLOCO 5 — Toroidal e razão ae/D
[o que encontrou, ou NÃO ENCONTRADO]

## BLOCO 6 — O que não consegui verificar, e por quê
[fonte que teria o dado + obstáculo concreto: firewall, paywall, PDF de imagem,
 página fora do ar, busca sem resultado]
```

Grave cada bloco assim que fechá-lo, antes de começar o próximo.

**Se a resposta for "ninguém publica um exemplo resolvido de fresa esférica", diga isso com todas as letras.** É um resultado, e eu sei o que fazer com ele. O que eu não posso receber é uma resposta construída por dedução e apresentada como se fosse publicação — ela entraria no produto e ficaria lá por anos.

═══════════════════════════════════════════════════════════════════
