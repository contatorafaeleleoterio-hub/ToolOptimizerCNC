# Questões abertas da construção

**O que este documento é:** o registro das decisões que precisam ser tomadas **antes** de a spec do
MVP virar código, com a recomendação de cada uma e a razão dela. Levantado na entrevista de
24/08/2026 (skill `grilling`), rodada 1.

**Estado em 28/08/2026:** Q1 fechada (ADR-0001). **Q2 e Q4 fechadas depois** — os 6 canônicos estão
escritos e auditados (Q2), e o corte da faixa 0,02–0,1 mm virou a decisão Q28 do bloco (Q4). **Só a
Q3 (escopo do 1º lote de tickets) segue aberta.**

**Estado em 03/09/2026:** abertas **Q5, Q6 e Q7** — três lacunas de régua na família **Furar**,
levantadas pelo Dexter ao desenhar o artboard de Broca Helicoidal e registradas aqui sem arbitragem.
Não são defeitos do protótipo: são pontos onde a documentação não fecha a cadeia numérica. Nenhuma
delas é decidível pelo desenhista, e nenhuma foi decidida aqui.

**Ainda em 03/09/2026:** abertas **Q8, Q9 e Q10**, saídas dos artboards de **Roscar** e **Mandrilar**.
A Q8 é de outra natureza que as demais — não é campo faltando, é a cadeia de cálculo entregando um
número que a família não sustenta. As outras duas são as irmãs da Q6 e da Q7 numa segunda família, o
que sugere que o padrão não é da Furar: é de toda família que não seja Fresar.

**Estado após R8 (04/09/2026, emendas B1–B3):**
- **Q6, Q8 e Q9:** ✅ **FECHADAS pela R8** (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md`): Q6 pela §1.1 (fórmula de espessura de cavaco na furação); Q8 pelas §1.8 e §2.2 (tabela própria de velocidade de corte do macho, teto absoluto); Q9 pela §1.12 (fórmula da taxa de remoção do anel de mandrilamento).
- **Q5:** Esclarecido que a suposta contradição entre tabela e derivada é **falsa** — a tabela é a regra de avanço, que é **sublinear no diâmetro**. Segue aberta a lacuna L-A de valor absoluto de partida.
- **Seguem abertas:** Q3, Q5 (lacuna L-A), Q7 e Q10.

**Por que esta pasta existe:** `escopo/` e `canonicos/` proíbem, por regra escrita, mencionar
tecnologia, arquivo, módulo ou ordem de construção. As decisões abaixo são exatamente isso. Elas não
cabem lá e não podem ficar só no HANDOFF, que é registro de estado, não de decisão pendente.

**Precedência:** este documento não vence nada. Ele **pergunta**. Quando uma questão for decidida,
a decisão migra para onde ela pertence — ADR na raiz do repositório, ou o documento de escopo
correspondente — e a linha aqui fica marcada como fechada, com a data e o destino.

---

## O diagnóstico que abriu a entrevista

A spec do MVP (`mvp/MVP_CALCULADORA_PARAMETROS.md`, 1424 linhas) está **completa como produto**:
6 perguntas de comportamento decididas em 21/08/2026, 12 lacunas técnicas declaradas com o que
fecharia cada uma, 10 divergências contra o registro anterior escritas com a razão, e nenhuma
pendência de produto em aberto.

O que falta é precisamente o que o documento declara **não ser**: tecnologia, ordem de construção e
desenho de tela. Nenhuma dessas três tem uma linha escrita em lugar nenhum do repositório. É aí que
a árvore de decisão da construção começa, e é isso que as quatro questões abaixo cobrem.

---

## Q1 — Plataforma e stack

**Estado:** ✅ **FECHADA em 25/08/2026.** Decisão registrada em [`docs/adr/0001-plataforma-e-stack.md`](../../docs/adr/0001-plataforma-e-stack.md).

> **Decidido:** núcleo de cálculo em TypeScript puro e isolado; casca web React + TypeScript entregue
> como PWA instalável e offline-first; empacotamento desktop via Tauri, sobre o mesmo código, se e
> quando o FlowNC exigir.
>
> **O que destravou a questão:** ela não foi respondida do jeito que estava formulada — a formulação
> foi desfeita. "Web ou desktop" pressupunha uma escolha irreversível dependente de estratégia
> comercial. Com o núcleo isolado da casca, a casca vira reversível e barata, e a decisão sobre
> vender junto com o FlowNC pode esperar sem custo de retrabalho.
>
> **O que sustentou:** cinco fatos já escritos no escopo — rede zero em tempo de uso (E5, P10 e
> §10.1), sincronização fora de escopo (E6 §8), persistência local com exportar/importar (E6 §7),
> tela pequena com a mesma capacidade (E5 §11) e painel persistente sem espera perceptível (MVP P1).
> Somados: sem backend, sem hardware, sem processamento pesado. Nativo não compra nada; web entrega
> as duas formas de tela de graça.

**O registro original da questão, preservado:**

Não existe uma linha de código no Fenix, e nenhum documento nomeia tecnologia — proposital, o
LEIA-ME de `escopo/` proíbe. Mas todo ticket, todo teste e toda decisão de persistência penduram
nesta resposta. É a raiz da árvore: nada abaixo dela pode ser decidido antes.

**Recomendação: web app (React + TypeScript), single-page, offline-first e instalável.**

Razão: o princípio P1 (§2.1 do MVP) diz que a calculadora é usada "dezenas de vezes por dia", o que
coloca o uso no chão de fábrica, não na mesa do escritório. Ali o dispositivo à mão é celular ou
tablet, e instalação é atrito. Uma base de código serve os dois contextos.

**A alternativa real é desktop nativo.** Ela ganha se a intenção for vender o Fenix junto com o
FlowNC, como parte da mesma família de produto. O HANDOFF empurra contra isso — "não deve herdar
arquivo, estrutura nem nome do antigo" (§6) — mas essa frase trata de herança de código, não de
estratégia comercial. **Só o Mestre resolve isso**, e a resposta muda tudo o que vem depois.

---

## Q2 — Os três canônicos faltantes bloqueiam a construção?

**Estado:** ✅ **FECHADA — prejudicada.** Os 6 canônicos foram escritos e auditados contra fonte crua
entre 26 e 27/08/2026 (`CANONICO_MOTOR_DE_CALCULO`, `CANONICO_VELOCIDADES_E_AVANCOS` e
`CANONICO_DEFLEXAO_E_VIDA` inclusos). A pergunta não tem mais objeto. **O que dela continua valendo
é a condição:** os números moram num único lugar (`src/data/`, um módulo por canônico, cada registro
com `fonte` e `confianca`) isolado da lógica de cálculo — entra no scaffold (ver `ADR-0001` e a
auditoria de prontidão, plano passo 5).

O registro original, preservado:

Três dos seis canônicos previstos continuam ⬜: `CANONICO_MOTOR_DE_CALCULO` (R2),
`CANONICO_VELOCIDADES_E_AVANCOS` (R4) e `CANONICO_DEFLEXAO_E_VIDA` (R6).

Só que o conteúdo de R2 e R4 **já vive dentro da spec do MVP**, com fonte e rótulo de confiança
linha a linha: §6 é a cadeia de cálculo inteira, §11.2 e §11.3 são as tabelas de partida. E R6 está
fora do escopo do MVP por decisão explícita (§12 — deflexão depende de três constantes que não
fecharam, sendo que o módulo de elasticidade diverge 16% entre duas rodadas).

**Recomendação: não bloqueiam — com uma condição.**

Os números têm que morar num único lugar isolado da lógica de cálculo. Fechar um canônico depois
passa a ser trocar uma tabela de dados, não caçar constante espalhada por dez arquivos. Sem essa
condição a recomendação se inverte.

**O custo da alternativa:** canonizar R2 e R4 antes de codar adianta a construção em zero — o
conteúdo já está escrito e utilizável — e atrasa em 2 a 3 sessões de escrita de documento.

---

## Q3 — Escopo do primeiro lote de tickets

**Estado:** ⬜ aberta.

A spec tem 1424 linhas e 13 seções. Quebrá-la inteira de uma vez gera algo na ordem de 25 issues, e
o Mestre nunca usou a skill `to-tickets` — julgaria o formato num volume grande demais para revisar
com atenção.

**Recomendação: uma fatia vertical primeiro (tracer bullet).**

Um material (aço 1045, a linha com corroboração acadêmica independente em 3,3%), uma geometria
(fresa de topo), atravessando entrada → cadeia de cálculo → resultado na tela, e incluindo as duas
travas do §13.2 como teste automatizado desde o começo:

1. `hm <= h_alvo` sempre — a espessura média nunca sai maior que a alvo.
2. Não-contagem-dupla — sem limitação, `hm` volta ao `h_alvo` dentro do erro da aproximação.

A fatia atravessa todas as camadas, prova a arquitetura escolhida na Q1 e cabe em revisão humana. O
resto entra em rodadas seguintes, com o formato de ticket já validado.

---

## Q4 — Lacuna L6, a faixa órfã de espessura de cavaco

**Estado:** ✅ **FECHADA em 27/08/2026 — decisão Q28 do bloco.** Adotada a recomendação abaixo: a
marca de extrapolado se estende até `hex = 0,1 mm`, com texto distinto do piso ("fora do modelo"
abaixo de 0,02; "margem maior que a declarada" entre 0,02 e 0,1). Migrou para `mvp/` §13.3 (Q28) e
`escopo/E4` §3.1 gatilho 11a. **08/09/2026: o gatilho 11a foi revogado — o alerta de espessura saiu do
produto em todas as famílias. A faixa órfã continua sem alerta, por decisão, não por lacuna.** Registro
original preservado abaixo.

A spec marca o resultado como extrapolado abaixo de `h = 0,02 mm`, e declara (§0.2 e §13, L6) que a
margem de ±15–25% não é sustentável abaixo de `h = 0,1 mm`. A faixa **entre 0,02 e 0,1 mm** o
próprio documento admite que fica "sem tratamento declarado". Qualquer fatia da Q3 passa por ela.

**Recomendação: estender a marcação de extrapolado até 0,1 mm, com texto diferente do piso.**

- Abaixo de 0,02 mm → "fora do modelo".
- Entre 0,02 e 0,1 mm → "margem maior que a declarada".

Razão: é a única saída que não mente sobre a precisão nem recusa o cálculo. Recusar violaria §1.1 —
"não existe estado em que o sistema se recuse a calcular por causa de um limite de ambiente".

**A alternativa** é declarar uma banda numérica maior nessa faixa. Ela é melhor em teoria e
impossível hoje: não há fonte para o número dessa banda, e inventá-lo violaria a regra que organiza
o documento inteiro — nenhum número entra sem fonte citada.

---

## Q5 — O avanço por rotação (`fn`) de partida não existe em documento nenhum

**Estado:** ⬜ aberta. Levantada pelo Dexter em 03/09/2026, ao desenhar o artboard de Furar.

`fn` é entrada obrigatória da cadeia de furação. A documentação especifica tudo o que vem **depois**
dele e nada **sobre ele**:

| Onde | O que diz |
|---|---|
| `mvp/MVP_CALCULADORA_PARAMETROS.md` §5.2, linha 678 | `fn` · Partida = "padrão do tipo" · `DECISÃO DE PROJETO`. **Classifica a confiança e não dá o número** |
| idem §5.1, linha 665 | Furar exibe controle de `fn` **só na broca de insertos**; "nas demais brocas o avanço por rotação é derivado" — **sem dizer derivado de quê** |
| idem §3.2, linhas 326–327 | Das cinco geometrias de Furar, só a #10 (Broca de Insertos) menciona `fn`, e como "editável". A #9 (Broca Helicoidal) não traz campo de avanço nenhum |
| idem §6.6, linha 917 | `Vf = fn × n` — **consome** `fn` |
| idem §6.8, linha 957 | `Q = (D × fn × Vc) / 4` — **consome** `fn` |
| idem §11.3, linha 1634 | é `fz` de **fresamento**, por diâmetro. Não atravessa família — e o próprio §11.3 registra que o formato publicado é carta específica de ferramenta |
| `canonicos/` | nenhum dos seis traz `fn` |

**A contradição tabela × derivada é falsa (R8, emenda B1, D1):** As duas descrições tratam da mesma coisa, porque a tabela **é** a regra. O que o documento estabelece é uma **regra sublinear no diâmetro** (`fn = f(D)`). O que continua faltando não é a forma matemática, mas sim o **valor absoluto** de partida para cada diâmetro/material (lacuna L-A). Sem `fn` não sai `Vf` (§6.6) nem `Q` (§6.8) em furação — a cadeia para no primeiro elo.

**A regra de fonte alcança este número.** `fn` é **entrada do motor de cálculo**, não decisão de
escopo, nome, vocabulário nem limiar de julgamento de produto. Cai dentro do recorte da decisão do
Mestre de 01/09/2026, e por isso **exige fonte citável** — o que hoje significa uma rodada de
pesquisa, não uma escolha de projeto.

**Estado provisório e contexto pós-R8 (R8, emenda B2, M12, L-A):** o artboard de Furar usou **0,20 mm/rot**, marcado na folha como decisão provisória de projeto. Continua sem fonte publicada, mas a R8 forneceu contexto: **0,20 mm/rot fica praticamente em cima do limiar `fn ≈ 0,21 a 0,23 mm/rot`**, ou seja, no único ponto extremo da faixa onde a furação **não** estaria no regime normal `h < 0,1 mm`. É um valor atípico para furação de oficina (alto demais para brocas pequenas). Substituição possível apontada pela R8: `fn ≈ 0,08 · √D`, **derivado** (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §2.1 e §6 B2).

**O que fecharia:** uma rodada de pesquisa que entregue `fn` de partida por diâmetro e substrato para
broca helicoidal, com fonte citável (fechando a lacuna L-A da R8) — ou a decisão do Mestre de que `fn` é campo do operador sem valor de partida, o que muda o desenho da tela e não pede fonte.

**Ver também:** **Q8** — o mesmo defeito um elo antes na cadeia, com `vc` no lugar de `fn`, e a mesma
conclusão sobre a regra de fonte. **Q9** — a taxa de remoção de mandrilar consome `fn`, então esta
lacuna também a bloqueia.

---

## Q6 — Não há fórmula de espessura de cavaco para furação, e a cadeia de força cai junto

**Estado:** ✅ **FECHADA pela R8 (emenda B3)** em `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.1 (`h = (fn / z) · sin κ`, com `κ = σ/2` e `z = 2`). O registro abaixo é preservado como histórico da lacuna levantada pelo Dexter em 03/09/2026.

A espessura média `hm` do §6.4 (linha 867) é construída sobre `ae/D`:

```
hm = fz × sin κ × (2·ae/D) / arccos(1 − 2·ae/D)
```

**Furação não tem `ae`.** No §3.2 as cinco geometrias de Furar trazem `—` na coluna de partida de
`ap` e `ae` (linhas 326–330), e o §5.1 (linha 665) não lista `ae` entre os controles da família. A
fórmula não tem onde ser aplicada.

A dependência é em cadeia, e cada elo está escrito:

1. sem `hm` (§6.4) não há `kc`, porque Kienzle consome a espessura **média** — `kc = kc1.1 × hm^(−mc)`
   (§6.7, linha 924), e o próprio §6.7 registra que usar `hex` no lugar erraria +45% a +82%;
2. sem `kc` não há `Pc` nem `Mc` (§6.9).

**Consequência visível na tela, e é ela que expôs a lacuna.** O resumo de verificação da tela de
Furar perde `hex`, `CTF`, `Pc` e `Mc` do §7.2 (linhas 1061–1065), mais `altura de crista` e
`furo prévio`, que já eram de outras famílias. Sobram **3 cartões** — `vc` real, `L/D` e tempo de
furo — contra as **7 a 8 saídas de verificação** que a decisão **D7** prevê
(`construcao/DESIGN_SYSTEM_FENIX.md` §4.6, linhas 296–306). E o terceiro deles depende da **Q7**.

**O que fecharia:** uma fórmula de espessura de cavaco para furação com fonte citável (é fórmula do
motor — a regra de fonte alcança integralmente), ou a decisão do Mestre de que a família Furar exibe
menos cartões que as demais, com D7 ajustado para admitir a exceção. **As duas saídas mudam
documento canônico ou régua de desenho — nenhuma é do desenhista.**

**Ver também:** **Q9** — a mesma contagem de cartões curta em Mandrilar, por outra fórmula faltando.
Se as duas forem fechadas separadamente, o D7 é ajustado duas vezes; decididas juntas, uma vez.

---

## Q7 — O ângulo de ponta é campo obrigatório e não alimenta nada exibido

**Estado:** ⬜ aberta. Levantada pelo Dexter em 03/09/2026. **Registrada com as duas leituras, sem
escolha** — não é, necessariamente, um defeito.

O `MAPEAMENTO_CAMPOS_FERRAMENTAS.md` manda o campo existir na Broca Helicoidal, e o §3.2 (linha 326)
o especifica: *"ângulo de ponta: 140° nas de metal duro, 118°/135° nas de aço rápido"*.

O que o motor faz com ele, rastreado até o fim:

| Passo | Onde | O que acontece |
|---|---|---|
| 1 | §6.11 item 1, linha 1007 | `Lp = (D/2) × tan(90° − ângulo/2)` — o ângulo vira comprimento da ponta |
| 2 | §6.11 item 2, linha 1008 | `t = (L + Lp) / Vf` — `Lp` só serve ao tempo de furo |
| 3 | §7.2, linha 1068 | **Tempo de furo está na tela**, "só na família furar" |
| 4 | §4.1 e §3.2 | **`L` de profundidade do furo não existe como campo.** Os campos comuns (§4.1, linhas 435–443) trazem `D`, `L` de **balanço**, `Z`, `ap` e `Lc` — nenhum é a profundidade do furo |

O elo que falta é o **passo 4, não o 3** — o tempo de furo *está* previsto no §7.2. E o §3.2 fecha a
porta por escrito: na tabela dos seis campos deliberadamente fora da tela, a linha 355 registra
*"Profundidade `h` · broca de centro, escareador · Não entra em nenhuma grandeza exibida"* —
afirmação que o §7.2 linha 1068 contradiz, porque o tempo de furo é grandeza exibida e consome
exatamente essa profundidade.

**As duas leituras, ambas defensáveis:**

- **(a) É lacuna de régua.** O campo de profundidade do furo deveria existir; sem ele o ângulo de
  ponta é entrada morta, o tempo de furo não pode ser calculado, e o §3.2 linha 355 contradiz o §7.2
  linha 1068. Fecharia acrescentando o campo ao §4.1/§3.2 e ao MAPEAMENTO.
- **(b) É campo de identificação, não de cálculo.** O ângulo de ponta existe para o operador
  **reconhecer a ferramenta** que tem na mão — 118° e 140° são brocas diferentes —, não para entrar
  na conta. Nessa leitura o campo está certo, e o que sai é o tempo de furo do §7.2. Fecharia
  removendo o tempo de furo dos resultados e registrando o ângulo como campo de identidade.

**Quem decide é o Mestre.** A leitura (a) acrescenta campo ao painel e cria trabalho de motor; a (b)
tira um resultado da tela e agrava a contagem de cartões da **Q6** — de 3 para 2. **As duas mexem em
documento que o desenhista não pode tocar**, e por isso nada foi arbitrado aqui.

**Ver também:** **Q10** — a mesma pergunta em Mandrilar, onde a fórmula que consumiria o campo existe
e o que falta é o resultado na tela. As duas juntas dizem se campo sem consumo é defeito ou identidade.

---

## Q8 — A cadeia de velocidade entrega 140 m/min para um macho de corte

**Estado:** ✅ **FECHADA pela R8 (emenda B3)** em `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.8 e §2.2 (macho de corte tem tabela própria de velocidade, 10–18 m/min no aço 1045, com teto absoluto de ~40 m/min para corte e ~60 m/min para conformação). O registro abaixo é preservado como histórico da lacuna levantada pelo Dexter em 03/09/2026.
(Macho de Corte M8). **É a mais séria das três desta rodada** — as outras duas são campo ou fórmula
faltando; esta é a cadeia funcionando exatamente como está escrita e produzindo um número que a
família não sustenta.

**O que aconteceu, e por que o defeito está visível.** O Dexter seguiu o §5.2 (linha 674) ao pé da
letra: o valor de partida da velocidade de corte é *o valor do material (§11.2) × o fator do
substrato (§3.5)*. Para o aço 1045 o §11.2 (linha 1608) dá **140 m/min**; para metal duro o §3.5
(linha 408) dá fator **1,00**. Aplicado a um macho M8 pela rotação do §6.3, isso é
`140 × 1000 ÷ (π × 8)` ≈ **5.570 rpm**. Ele reproduziu na tela porque é o que o documento manda, e
**avisou em vez de maquiar** — se tivesse ajustado o número no desenho, o defeito continuaria na
régua e sairia de novo na próxima folha.

**O elo que não segura.** O §3.5 tem duas linhas e só uma delas produz um número:

| Substrato | Fator | O que isso faz na cadeia |
|---|---|---|
| Metal duro (linha 408) | **1,00**, referência | Deixa o valor do material passar intacto — é como 140 m/min chega ao macho |
| Aço rápido ao cobalto (linha 409) | **0,22–0,25**, "faixa e não ponto" | **Não produz número.** Uma faixa não multiplica |

O Macho de Corte aceita os dois substratos (§3.2, linha 331: `HSS-Co · MD`). Num deles a cadeia
entrega um valor que ninguém defende; no outro ela não entrega valor nenhum. **Não existe, para a
família Roscar, regra fechada que transforme a velocidade do material na velocidade da ferramenta.**

**As duas leituras, sem escolha:**

- **(a) Falta o fator por família e substrato, e a regra do §5.2 não deveria atravessar de fresamento
  para roscamento.** O MVP já recusa esse tipo de travessia em outro ponto — o §11.3 (linha 1638)
  registra que o avanço por dente publicado é "carta específica de ferramenta, **não uma função
  universal**" —, e o §9.3 (linha 1440) escreve a regra de método por extenso: *"Aplicabilidade por
  família — quem for implementar lê isto, não deduz"*, e em seguida declara família por família quem
  tem alerta de balanço e quem não tem, incluindo *"Roscar: sem alerta de balanço — nem ativo, nem
  como lacuna"* (linha 1444). Onde o documento quis que uma regra atravessasse família, ele disse.
  No §5.2 ele não disse.
- **(b) O número é o que é, e o alerta de janela deveria pegá-lo.** Nessa leitura a cadeia está certa
  e o que falta é o aviso. **Registro um fato que essa leitura precisa enfrentar, sem decidi-la:** o
  gatilho 4 do §9.2 (linha 1408) dispara em `vc < 0,6 × vc_partida` ou `vc > 1,4 × vc_partida` — ele
  mede o afastamento do operador **em relação ao próprio valor de partida**. No exato caso desta
  questão, `vc` **é** `vc_partida`, a razão vale 1,00 e o gatilho **não dispara**. Como está escrito
  hoje, o alerta de janela não alcança este número; a leitura (b) exige um alerta diferente do que
  existe, não o que existe.

**A regra de fonte alcança.** O fator por família e substrato é **entrada do motor de cálculo** — não
é escopo, nome, vocabulário nem limiar de julgamento de produto. Cai no recorte da decisão do Mestre
de 01/09/2026 e **exige fonte citável**, exatamente como a **Q5**.

**O que fecharia:** uma rodada de pesquisa que entregue o fator de velocidade por família e
substrato para roscamento — ou a decisão do Mestre de que a família Roscar tem tabela própria de
velocidade de partida, independente do §11.2. Nas duas saídas o número vem de fora; nenhuma é
escolha de desenho.

**Ver também:** **Q5** — a mesma forma de lacuna um elo adiante, com `fn` no lugar de `vc`.

---

## Q9 — Não há fórmula de taxa de remoção para mandrilar

**Estado:** ✅ **FECHADA pela R8 (emenda B3)** em `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.12 (`Q = π · (D_final² − D_inicial²) · fn · n / 4000 [cm³/min]` ou `Q = vc · ap · fn · (1 − ap/Dc)`). O registro abaixo é preservado como histórico da lacuna levantada pelo Dexter em 03/09/2026.
(Barra de Mandrilar).

O §6.8 (linhas 954–957) traz duas linhas e só duas:

| Família | Fórmula |
|---|---|
| Fresar | `Q = (ap × ae × Vf) / 1000` |
| Furar | `Q = (D × fn × Vc) / 4` |

**Mandrilar não está na tabela**, e nenhuma das duas serve: a de fresar consome `ae`, que a família
não tem; a de furar consome o diâmetro do furo cheio, e mandrilar remove um anel entre o diâmetro
inicial e o final — o próprio §6.11 item 7 registra que ali `ap = (Ø_final − Ø_inicial) / 2`.

**Consequência visível.** O resumo de verificação do artboard de Mandrilar fica com **dois cartões**
— velocidade de corte real e `L/D` (o alerta de balanço é ativo em Mandrilar, §9.3 linhas 1433–1435
e 1442). Caem `MRR` por falta desta fórmula, e `hex`, `CTF`, `Pc` e `Mc` pela mesma razão da **Q6**:
sem `ae` não há `hm` (§6.4), e sem `hm` não há `kc` (§6.7). Contra as **7 a 8 saídas de verificação**
que a decisão **D7** prevê (`construcao/DESIGN_SYSTEM_FENIX.md` §4.6, linhas 296–306), é dois.

**O que fecharia:** a fórmula de taxa de remoção para mandrilar com fonte citável — é fórmula do
motor, a regra de fonte alcança integralmente —, ou a decisão do Mestre de que Mandrilar exibe menos
cartões, com D7 ajustado para admitir a exceção.

**Ver também:** **Q6** — a mesma contagem curta em Furar, por outra fórmula faltando; as duas mexem no
mesmo D7. **Q5** — a fórmula de furar consome `fn`, que também não tem valor de partida.

---

## Q10 — O raio de ponta (rε) do mandrilar não alimenta nada exibido

**Estado:** ⬜ aberta. Levantada pelo Dexter em 03/09/2026. **É a Q7 numa segunda família** —
registrada com as duas leituras, sem escolha.

O §3.2 (linha 334) põe **raio de ponta `rε`** entre os campos da Barra / Cabeçote de Mandrilar. O que
o motor faz com ele:

| Passo | Onde | O que acontece |
|---|---|---|
| 1 | §6.11 item 8, linha 1014 | `Ra = f² / (8 × rε) × 1000` [µm] — `NÃO VERIFICADO`. A fórmula **existe** |
| 2 | §7.2, linhas 1058–1069 | **Rugosidade não está na lista de resultados.** Os dez itens são `vc` real, `hex`, `CTF`, `MRR`, `Pc`, `Mc`, `L/D`, altura de crista, tempo de furo e furo prévio |

**A diferença que separa esta questão da Q7.** Na Q7 a cadeia quebra por falta de **entrada** — o
ângulo de ponta chega até `Lp` e para, porque não existe campo de profundidade do furo. Aqui a cadeia
quebra por falta de **saída**: a fórmula que consome `rε` está escrita, roda com os campos que a tela
já tem, e o resultado não tem onde aparecer.

**Por que a rugosidade não foi para a tela, e por que isso é precedente.** O Dexter não a acrescentou
porque **pôr na tela o que a régua de resultados não prevê seria invenção de desenho** — e a régua de
resultados é o §7.2, não o desenhista. Vale registrar como precedente: quando a fórmula existe e o
resultado não está previsto, o caminho é abrir questão, não desenhar o resultado e esperar que a
régua alcance depois.

**As duas leituras, ambas defensáveis:**

- **(a) Falta a rugosidade na lista de resultados.** A fórmula existe e o campo existe; o §7.2 é que
  não a previu. Fecha acrescentando a rugosidade ao §7.2, com a ressalva de que o item 8 do §6.11 é
  `NÃO VERIFICADO` e entraria com esse rótulo.
- **(b) `rε` é campo de identificação da pastilha, e a rugosidade fica mesmo fora do MVP.** O raio de
  ponta identifica qual pastilha está montada, como o ângulo de ponta identifica qual broca — e o
  §12 já mantém coisas fora do MVP por decisão. Fecha registrando `rε` como campo de identidade e a
  rugosidade como fora de escopo.

**Quem decide é o Mestre.** A leitura (a) acrescenta um resultado à tela e ajuda a contagem de
cartões da **Q9**; a (b) mantém a contagem em dois. **As duas mexem no §7.2, que o desenhista não
pode tocar.**

**Ver também:** **Q7** — a mesma pergunta em Furar, com a quebra do lado da entrada em vez da saída.
**Q9** — a contagem de cartões de Mandrilar que a leitura (a) melhoraria.

---

## O que vem depois das primeiras quatro

A entrevista parou na rodada 1. As questões abaixo estão **identificadas mas não formuladas**,
porque dependem das respostas acima. **As três primeiras já têm resposta na ADR-0001 e só precisam
ser escritas onde pertencem:**

| Depende de | Questão que abre |
|---|---|
| Q1 | Onde vivem os dados editados pelo operador (§4.7 do MVP manda material ser editável, e `E6_DADOS_DO_USUARIO` prevê histórico e biblioteca) |
| Q1 | Framework de teste, e como as duas travas do §13.2 viram teste executável |
| Q1 + Q3 | Granularidade dos tickets — um por seção da spec, ou um por fatia de comportamento |
| Q3 | Ordem das fatias seguintes, e qual delas força a decisão de desenho de tela |

A reconciliação do E0 que esta seção listava como pendente **foi feita** (26–28/08): `E5` e
`CANONICO_LIMITES_E_ALERTAS` alinhados ao MVP, e o painel "o que mexer" resolvido (HANDOFF §31).

---

## Fontes deste documento

| O que veio de onde | Documento |
|---|---|
| Diagnóstico da completude da spec, §13.2 e L6 | `mvp/MVP_CALCULADORA_PARAMETROS.md` |
| Estado dos canônicos e a divisão em 6 | `canonicos/LEIA-ME.md` |
| A proibição de mencionar tecnologia no escopo | `escopo/LEIA-ME.md` |
| Fronteira com o sistema anterior | `HANDOFF.md`, §6 |
