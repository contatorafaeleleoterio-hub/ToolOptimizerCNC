# COLAR — R7 · O piso de espessura de cavaco (lacuna `L4`)

**Cole tudo que está entre as linhas `═══`.** É autossuficiente.
**Salve o retorno como:** `RESPOSTA_R7.md`, na pasta `pesquisa/`.
**Conversa nova, sozinha.** Uma pergunta central, decomposta em quatro — é para ir fundo, não para cobrir área.

**O que destrava:** `MVP` §9.2 gatilho 1 (o alerta mais importante do produto), `MVP` §7.6 (o exemplo canônico) e, por tabela, os números das cinco folhas do protótipo do painel. Ver `HANDOFF.md` §36.3 e `MVP` §13.1 `L4`.

---

═══════════════════════════════════════════════════════════════════

# UMA PERGUNTA SÓ: A PARTIR DE QUE ESPESSURA DE CAVACO A ARESTA PARA DE CORTAR E COMEÇA A ESFREGAR?

Estou construindo uma **calculadora de parâmetros de corte para fresamento CNC** — a ferramenta que diz ao operador de oficina qual rotação e qual avanço programar. Escopo: **fresa inteiriça de metal duro** (topo reto, toroidal, esférica), em aço carbono, inox, alumínio e aço para molde.

O produto inteiro está fechado, **menos um número**, e é o número que dispara o alerta mais importante da tela. Preciso que você o resolva ou prove que ele não existe publicado.

## O fenômeno, que já está confirmado e não precisa reconferir

Quando a espessura de cavaco que a aresta arranca fica **muito pequena em relação ao raio de arredondamento da própria aresta** (`rβ`, *edge radius* / *cutting edge rounding*), o gume deixa de cortar: ele **amassa e esfrega** o material em vez de removê-lo (*ploughing* / *rubbing*). O resultado é calor, desgaste por atrito e a ferramenta morrendo sem ter removido material.

Isso é consenso e está fora de discussão. **Não gaste tempo provando que o fenômeno existe.** O que eu preciso é do **número**.

## O que não fecha

A regra que eu tenho hoje é:

```
alerta quando   hex < 0,3 × rβ
```

Ela depende de **dois** valores, e os dois estão em disputa nas minhas apurações anteriores:

| Grandeza | Uma rodada disse | O registro anterior dizia | Diferença |
|---|---|---|---|
| **Raio de aresta `rβ`** de fresa inteiriça de metal duro, de catálogo | **4 a 20 µm** | **25 a 127 µm** | ~6× |
| **Razão de espessura mínima** `h_min / rβ` | **20 a 40%** | **5 a 20%** | — |

O **produto** dos dois é o piso. Com uma combinação ele fica em **0,8–8 µm**; com a outra, em **1,25–25 µm**. E o valor que o meu documento vem carregando na tela — **30 µm (0,030 mm)** — **não sai de nenhuma das duas combinações**: ele exigiria `rβ = 100 µm`, que não aparece em fonte nenhuma que eu tenha.

**Consequência prática, e é por isso que isso trava tudo:** com `rβ` de 10 µm o piso cai para 3 µm. Um passe absolutamente normal de alta eficiência (fresa Ø10, `ae/D` de 5%, `fz` 0,060 mm) produz `hex` = 26 µm — **quase 9× acima do piso**. Ou seja: **se a rodada baixa estiver certa, a minha regra quase nunca dispara**, e o alerta principal do produto é decorativo.

## As quatro perguntas

### Q1 — O raio de aresta `rβ` real de fresa inteiriça de metal duro de catálogo

Qual é a faixa, em micrômetros, do raio de arredondamento de aresta de **fresa de topo inteiriça de metal duro revestida**, do tipo vendido em catálogo para uso geral (não micro-fresa, não ferramenta de acabamento de precisão especial)?

Preciso de faixa **com fonte**, e a fonte precisa dizer **em que condição** ela vale: diâmetro, se é ferramenta de desbaste ou acabamento, se o valor é antes ou depois do revestimento (o revestimento **engrossa** a aresta, e isso muda o número).

**Onde procurar, em ordem:** catálogo ou guia técnico de fabricante de fresa inteiriça (Sandvik Coromant, Seco, Kennametal, Walter, Guhring, OSG, Mitsubishi, Iscar) · artigo revisado por pares que **meça** raio de aresta em fresa comercial (procurar por *"cutting edge radius"*, *"edge rounding"*, *"edge preparation"* + *"solid carbide end mill"*) · tese ou dissertação com metrologia de aresta.

**Atenção a uma armadilha que já me custou uma rodada:** boa parte da literatura de raio de aresta é sobre **micro-usinagem** (fresas abaixo de Ø1 mm) ou sobre **pastilha de torneamento**. Nenhum dos dois serve. Se o valor que você achar for de um desses contextos, **diga isso explicitamente** em vez de reportá-lo como se fosse de fresa inteiriça convencional.

### Q2 — A razão de espessura mínima de cavaco

Qual é a razão `h_min / rβ` — a espessura mínima de cavaco, expressa como fração do raio de aresta — abaixo da qual o corte vira esfregamento?

Mesma exigência: faixa com fonte, e a **condição** em que ela vale (material da peça, se é medida ou simulada, se é por elementos finitos ou por experimento).

**Suspeito que a razão dependa do material da peça** — material dúctil e material frágil não deveriam se comportar igual. Se depender, quero a razão **por grupo de material** (aço carbono, inox austenítico, alumínio, aço endurecido), não um número único.

### Q3 — Existe o piso publicado direto, em milímetros?

Antes de eu multiplicar dois números incertos: **algum fabricante publica direto um piso de espessura de cavaco em mm**, sem passar por `rβ`? Do tipo *"não trabalhe com `hex` abaixo de X mm"*, ou uma tabela de `fz` mínimo por diâmetro justificada por esse motivo?

Se existir, ele vale mais que o produto de duas estimativas, e eu troco a regra.

E, junto: **a regra é comparada contra a espessura máxima (`hex`) ou contra a média (`hm`)?** As duas diferem por um fator próximo de 2 em penetração radial baixa, então essa escolha sozinha move o gatilho em 100%. Quero a resposta com a fonte que a sustenta, não por dedução.

### Q4 — A regra dispara alguma vez, na prática?

Esta é a pergunta de sanidade, e ela vale tanto quanto as outras três.

Com os valores que você encontrar, **calcule o piso** e compare com condições reais de fresamento publicadas — casos resolvidos de catálogo, com `D`, `Z`, `fz`, `ae` e `ap` dados. **Em quantos deles o `hex` fica abaixo do piso?**

Se a resposta for "em nenhum", eu preciso saber disso, porque significa que o alerta que eu construí não protege ninguém e o produto precisa de outro gatilho. Se a resposta for "nos casos de `ae/D` abaixo de X%", isso é exatamente o que eu preciso para escrever a regra.

**Não suavize esse retorno.** Uma resposta que diz "a regra não dispara na prática" me serve mais do que uma que confirma o que eu já escrevi.

## Regras do retorno — leia antes de começar

1. **Todo número vem com fonte citável e localizável.** Fabricante + nome do documento + número de catálogo/ano + página, ou DOI/autor/ano. "Segundo a literatura" não é fonte.
2. **Todo número vem com a condição em que ele vale.** Um valor de catálogo sem condição de validade é boato.
3. **Rotule cada achado:** `CONSENSO` (2+ fontes independentes concordam) · `REFERÊNCIA ÚNICA` (uma fonte só, e diga qual e por que só uma) · `SEM CONSENSO` (fontes discordam — traga as duas e diga em quanto discordam) · `NÃO ENCONTRADO` (procurou e não achou — diga **onde** procurou).
4. **`NÃO ENCONTRADO` é resposta válida e é bem-vinda.** O que não é aceitável é preencher com um valor plausível sem fonte. Prefiro uma lacuna declarada a um número inventado — o produto inteiro é construído sobre essa regra.
5. **Não arredonde nem "harmonize" faixas divergentes.** Se duas fontes dão 4–20 e 25–127, reporte as duas e diga o que explica a diferença (contexto? geometria? década? método de medição?). A explicação da divergência vale mais que a média dela.
6. **PDF servido por CDN é fonte primária**, desde que o documento seja identificável como publicação daquele fabricante (capa, título, número de catálogo, ano). O que não vale é cópia hospedada por terceiro sem identificação — site de distribuidor, agregador de PDFs, fórum.
7. **Diga onde procurou e não achou.** Isso vale para a próxima rodada tanto quanto o que você achou.

## Formato do retorno

Uma seção por pergunta (Q1 a Q4), e ao fim:

- **Tabela de fontes** — documento, localizador, o que cada uma sustenta.
- **O piso resultante**, com a conta explícita e a faixa de incerteza.
- **Recomendação de regra**, se você tiver base para uma; e, se não tiver, o que exatamente falta.
- **O que ficou sem resposta**, nomeado.

═══════════════════════════════════════════════════════════════════
