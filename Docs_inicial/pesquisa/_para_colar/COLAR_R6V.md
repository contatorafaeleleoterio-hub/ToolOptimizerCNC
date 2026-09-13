# R6-V — enunciado colável

**Cole tudo entre as linhas `═══`.** O cabeçalho e o rodapé são metadados, não vão para o pesquisador.

═══════════════════════════════════════════════════════════════════

# MISSÃO

Você vai fechar **cinco constantes** de um modelo de deflexão de ferramenta e de vida de ferramenta, para uma calculadora de parâmetros de corte de fresamento CNC. Uma rodada anterior já procurou essas constantes e voltou sem elas. Você não vai refazer aquela busca — vai atacar os mesmos cinco pontos a partir de um universo de fontes diferente, definido abaixo.

**A regra que governa este projeto chama-se *No Invention*: nenhum número entra sem fonte citada.** O operador de máquina abre a tela e vê a fórmula, os valores substituídos e a fonte de cada um. Um número sem procedência que passe por aqui vira dívida permanente no produto.

## Contexto mínimo

- **Usuário:** operador e programador de CNC em oficina brasileira de usinagem e ferramentaria.
- **Escopo:** fresamento com fresa inteiriça de metal duro — topo reto, toroidal e esférica.
- **Modelo de deflexão adotado:** viga engastada com carga na ponta.

```
δ = (F · L³) / (3 · E · I)          I = π · De⁴ / 64
```

`δ` deflexão na ponta (exibida em µm) · `F` força **radial** de corte (N) · `L` balanço da ferramenta (mm) · `E` módulo de elasticidade (MPa) · `De` diâmetro efetivo resistente (mm).

- **Modelo de vida adotado**, na forma relativa, que não exige saber a vida absoluta:

```
V · Tⁿ = C          →          T / T_ref = (Vc_ref / Vc)^(1/n)
```

- **Margem de erro declarada do modelo: ±15–25%.** Refinamento abaixo disso é falsa precisão e não justifica campo na tela.

---

# REGRAS DE RESPOSTA — obrigatórias

1. **Não invente número.** Sem consenso, entregue a **faixa** e a dispersão entre as fontes.

2. **Cada número precisa de fonte citável, com localizador.** Não basta nomear o autor ou o fabricante: dê a página, a tabela, a seção, o DOI ou o endereço exato onde o número está. "Catálogo da Sandvik" não é fonte; "Sandvik Coromant, página X, tabela Y" é.

3. **Etiquete a confiança de cada achado:** `CONSENSO` · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` · `NÃO ENCONTRADO`.
   **`CONSENSO` exige três fontes de fato independentes.** Três páginas repetindo a mesma origem — ou três revendedores reproduzindo o catálogo do mesmo fabricante — é `REFERÊNCIA ÚNICA`. Antes de escrever `CONSENSO`, confira se as fontes são mesmo independentes uma da outra.

4. **Declare o nível de cada fonte, em toda linha:** `1` norma · `2` handbook · `3` artigo revisado por pares · `4` catálogo/documentação de fabricante · `5` código aberto ou implementação de terceiro. Linha sem nível declarado conta como não entregue.

5. **Identifique a liga, o grau ou a condição junto com o valor.** "Metal duro tem E de 600 GPa" não é resposta utilizável. "WC-Co, 10% Co em massa, grão de 0,8 µm, E = 5xx GPa, fonte X, tabela Y" é.

6. **Quantifique a sensibilidade.** Para cada constante, diga quanto o resultado final muda quando ela varia dentro da faixa que você encontrou. Se a dispersão produzir variação menor que ±15–25%, diga explicitamente que a constante pode ser fixada.

7. **Diga qual é o valor mais usado, e com que evidência.** Além da faixa, aponte o **valor dominante** — o que aparece com mais frequência em fontes independentes — e **conte quantas fontes independentes o sustentam**. Se não houver dominante, diga que não há. Frequência de uso não é prova de correção: declare as duas coisas separadamente, nunca misturadas.

8. **Diga o que não foi possível fechar** e o que seria preciso — ensaio, ficha técnica específica, norma paga. Lacuna declarada é resultado válido e esperado.

---

# QUESTÃO 1 — Módulo de elasticidade do metal duro de fresa

Esta é a constante mais importante da rodada. `δ` é **inversamente proporcional** a `E`: um erro aqui propaga inteiro para o número que o operador lê.

**a)** Qual é o módulo de elasticidade do metal duro (WC-Co) usado em **fresa inteiriça**, por grau, com **teor de cobalto e tamanho de grão identificados**? A faixa ampla de 500–650 GPa que circula cobre todos os graus de metal duro, inclusive os de 20–25% de cobalto, que não são usados em fresa. Fresa inteiriça usa tipicamente 6–12% de cobalto e grão fino a ultrafino.

Entregue uma tabela por grau, com teor de Co, tamanho de grão, valor de `E`, método de medição se declarado, e fonte com localizador.

**b)** Existe **medição de `E` em metal duro de grão fino** (submicron a ~1 µm), que é a granulometria de fresa? Ou as medições publicadas são de grão grosso? Se todas as medições que você achar forem de grão grosso, **diga isso explicitamente** — é um achado, não uma falha.

**c)** Qual é o **valor único** que você recomenda para fresa inteiriça de uso geral, e quantas fontes independentes o sustentam? Diga também qual o erro de deflexão ao usar esse valor único em toda a linha — como `δ` é linear em `1/E`, a conta é direta.

**d)** Os valores publicados são módulo de **flexão/elástico macroscópico** ou módulo por **indentação instrumentada** (`EIT`)? Os dois não são intercambiáveis para uma viga engastada. Declare qual é cada valor que você reportar; se a fonte não declarar, diga que não declara.

**e)** Entregue também o `E` do **aço rápido** e do **aço rápido ao cobalto**, com o grau identificado (M2, M35, M42), para quando a furação entrar no escopo.

---

# QUESTÃO 2 — Razão força radial / força tangencial (`Fr/Fc`)

A deflexão é causada pela componente **radial**, mas o cálculo de potência produz a **tangencial**. Sem a razão entre as duas, a função de deflexão não roda.

**a)** Qual é a razão típica em fresamento? De que ela depende — ângulo de engajamento, ângulo de hélice, geometria de saída, sentido de corte (concordante × discordante)?

**b)** Existe valor publicado por família de ferramenta ou por material, ou é preciso calcular a partir do arco de engajamento? Se existir, entregue a tabela.

**c)** A razão é constante ao longo da volta, ou varia conforme o dente entra e sai? Se varia, o cálculo deve usar o **pico** (que fleti mais) ou a **média**? **Escolha uma e diga por quê** — não devolva as duas opções.

**d)** Existe simplificação aceita e publicada — algo como "`Fr` ≈ 0,3 a 0,5 de `Fc`" — utilizável numa calculadora de oficina? Se existir, com que fonte e para que condição de validade? Se você só encontrar essa faixa repetida sem origem rastreável, **diga isso**: repetição sem origem é achado, não é fonte.

---

# QUESTÃO 3 — Expoente `n` de Taylor

Os valores presumidos internamente são `n = 0,25` para metal duro e `n = 0,125` para aço rápido, **sem fonte**. Uma rodada anterior não os confirmou.

**a)** Quais são os valores de `n` publicados para: aço rápido, aço rápido ao cobalto, metal duro sem revestimento, metal duro revestido, cerâmica e CBN? Entregue com fonte e localizador.

**b)** O `n` depende do **material da peça** além do material da ferramenta? Se sim, entregue a matriz ferramenta × material que você conseguir montar, mesmo incompleta, marcando cada célula com sua fonte. Se a dependência for forte a ponto de a forma relativa perder utilidade sem a matriz, **diga isso**.

**c)** Qual é o valor de `n` **mais usado na prática** para metal duro em fresamento, e quantas fontes independentes o sustentam?

**d)** Para a forma absoluta ("a aresta dura X minutos"), é preciso saber a que vida-alvo os `Vc` de catálogo se referem. Fabricantes publicam esse `T_ref`? Qual é o valor convencional — 15 minutos, 30 minutos? Sob que norma? É o mesmo entre fabricantes, ou cada um usa o seu?

---

# QUESTÃO 4 — Diâmetro efetivo resistente (`De/D`)

A parte cortante da fresa tem canais helicoidais — o diâmetro que resiste à flexão é menor que o nominal.

**a)** Que fração do diâmetro nominal se usa para cálculo de rigidez? Existe valor publicado — algo como `0,8 × D`? Para que número de canais ele vale?

**b)** A fração depende do **número de arestas**? Entregue os valores que achar para 2, 3, 4, 5 e 6+ canais. Se só houver valor para alguns, diga para quais.

**c)** Depende da **profundidade do canal**, que varia entre fresa de desbaste e de acabamento?

**d)** Fresa com haste cilíndrica tem dois trechos de diâmetro diferente — haste lisa e parte cortante canalizada. O modelo correto é **viga escalonada** ou basta viga simples com a seção mais fraca? **Qual o erro percentual de usar viga simples?** Se o erro ficar dentro de ±15–25%, a simplificação se justifica e a resposta é "viga simples" — diga isso explicitamente. Se o erro depender da proporção entre os comprimentos dos dois trechos, **entregue a família de curvas ou a fórmula**, não uma recusa: a relação é derivável da própria equação da viga.

---

# FORMATO DA ENTREGA

Para cada questão:

```
## [número] [título]

**Veredito:** [uma frase]
**Confiança:** CONSENSO | REFERÊNCIA ÚNICA | SEM CONSENSO | NÃO ENCONTRADO
**Valor dominante:** [o mais usado] — sustentado por [N] fontes independentes
**Nível das fontes:** [1 a 5, por fonte]

**Valor ou regra**
[constante com liga/grau/condição identificada, ou fórmula com variáveis nomeadas]

**Sensibilidade**
[quanto o resultado final muda dentro da faixa encontrada — e se isso justifica fixar a constante]

**Fontes**
[localizador exato: página, tabela, seção, DOI ou endereço — nunca só o nome]
```

E, ao final, duas tabelas de fechamento:

**Tabela final 1 — As cinco constantes**

| Constante | Valor recomendado | Valor dominante e nº de fontes | Faixa encontrada | Efeito da dispersão no resultado | Confiança | Nível | Fonte com localizador |
|---|---|---|---|---|---|---|---|

**Tabela final 2 — O que continua sem base**

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|

═══════════════════════════════════════════════════════════════════

---

## Rastreabilidade

| Questão | Origem |
|---|---|
| 1 | `VALIDACAO_R6.md` — BLOQUEIA #1 e #2, divergência D-1 |
| 2 | `VALIDACAO_R6.md` — lacuna 6, a trava que impede a função inteira |
| 3 | `VALIDACAO_R6.md` — lacuna 9, seis classes voltaram vazias |
| 4 | `VALIDACAO_R6.md` — divergência D-2 e lacuna 5 |

## O que este enunciado deliberadamente NÃO diz

Os valores apurados por R3 e R6 para o módulo de elasticidade **foram omitidos de propósito**, pelo mesmo motivo que a R6 original omitiu o valor da R3: revelar um número antes da busca ancora o resultado e destrói a confirmação independente. Se este par convergir num valor por conta própria, isso desempata a divergência aberta. Se revelasse os números, não desempataria nada.
