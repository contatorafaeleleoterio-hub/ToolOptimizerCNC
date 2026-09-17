# Gabarito do protótipo do painel — Fenix

**Versão:** 1.6 · **Criado em:** 30/08/2026 · **Fase do protocolo:** F1 (consolidar fonte de verdade)
**Estado:** vale como régua da **camada 1**. Q2, Q3 e Q4 fechadas pelo Mestre em 30/08 (revisão item a
item) — a seção 4 não tem mais pergunta aberta. F2 roda só na camada 1 por decisão do Mestre (Q5).

> **Para que serve.** Este é o **documento único** contra o qual o protótipo é auditado em F2 e
> aceito em F8. Antes dele a régua estava espalhada por quatro documentos (`BRIEF_DESIGN_INTERFACE`,
> `DESIGN_SYSTEM_FENIX`, `MVP_CALCULADORA_PARAMETROS`, `HANDOFF` §34–§45) e por dois relatórios de
> crítica — e nenhum deles dizia qual vence quando divergem.
>
> **Ele não inventa regra.** Cada linha aponta a fonte. Onde a fonte é silenciosa ou ambígua, a linha
> vai para a seção 4 como pergunta ao Mestre — não como decisão do agente.

---

## 0. G0 — diagnóstico registrado

**Resposta do Mestre em 30/08/2026: C — os dois.**

| Causa | Onde ela está |
|---|---|
| **Spec clara ignorada** | Regras enumeráveis do brief (R1–R15), do vocabulário (§11), dos anti-requisitos (§12) e do checklist do design system (§9). São verificáveis por comando e mesmo assim foram violadas — o bloco A da crítica lista 14 casos. Isto é **camada 1** deste gabarito. |
| **Spec ambígua** | As 11 tensões (T1, T2, T4–T12) foram deixadas abertas **de propósito** pelo brief §9: *"nenhuma tem resposta neste documento"*. Os 12 critérios de sucesso (C1–C12) são afirmações de julgamento, não testes. O protótipo resolveu cada tensão de um jeito, e não havia contra o quê medir se o jeito estava certo. Isto é **camada 2 e a seção 4**. |

**Consequência para o protocolo:** F2 (auditoria fresh-context) só pode medir a camada 1 sozinha.
A camada 2 exige que a seção 4 esteja fechada antes — senão o auditor repete o erro do protótipo e
inventa a régua enquanto mede.

---

## 1. Precedência — quem vence quando dois documentos divergem

Ordem decrescente. O de cima vence sempre.

| # | Fonte | O que ela é dona |
|---|---|---|
| 1 | **Decisão escrita do Mestre** (`HANDOFF` §35.3 + §2.7–§2.8 deste gabarito, D1–D12 — D2 e D5 invertidas pelo Mestre em 30/08; `HANDOFF` §44.1, §45; seção 4 deste gabarito) | Qualquer coisa. É a única fonte que revoga as de baixo |
| 2 | **`canonicos/`** | Número, fórmula, limiar, gatilho de alerta |
| 3 | **`MVP_CALCULADORA_PARAMETROS.md`** | O que existe no primeiro produto: campos, zonas, exemplo numérico, ordem no celular |
| 4 | **`BRIEF_DESIGN_INTERFACE.md`** | Requisito de comportamento, vocabulário, anti-requisito, regra inviolável |
| 5 | **`DESIGN_SYSTEM_FENIX.md`** | Token, contraste, primitivo, o que não existe visualmente |
| 6 | **Relatórios de crítica** (`CRITICA_PROTOTIPO_*`, `ANALISE_CRITICAS_MESTRE_*`) | Nada. São **achado**, não regra. Um achado só vira régua depois de passar por F3 (human gate) |
| 7 | **O protótipo atual** (`*.dc.html`) | Nada. É o objeto medido, nunca a medida |

**Regra dura:** se um `.dc.html` faz algo que nenhuma das fontes 1–5 exige, isso é invenção do
desenho e cai em F2 como finding — mesmo que fique bonito.

---

## 2. Camada 1 — lei mecânica (verificável por comando, sem julgamento)

Um agente com `grep` decide sozinho se passa ou falha. **F2 audita esta camada inteira.**

### 2.1 Regras invioláveis do brief §8

| Regra | Como se verifica no protótipo |
|---|---|
| **R1** nada trava, bloqueia ou é recusado | Nenhum `disabled`, nenhum `readonly`, nenhum clamp de valor |
| **R2** não existe "liberar" nem marca "forçado" | A palavra `forçado` não aparece |
| **R4** antes do primeiro cálculo, nenhum número | `Vazio.dc.html` sem dígito de resultado — nem `0`, nem `—` preenchendo formato |
| **R5** todo elemento visível muda algo que o operador lê | Sem elemento decorativo |
| **R6** nenhum valor de partida é assumido em silêncio quando errar por um fator inteiro é possível | Todo valor pré-preenchido que erraria por fator inteiro — o caso do número de arestas (Z) — chega visível e editável no protótipo; nenhum é só assumido |
| **R7** alerta ativo nunca esmaecido | Nenhuma `opacity` < 1 no bloco de alerta ou de nível, inclusive no estado desatualizado |
| **R8** cor nunca é o único portador | Todo estado tem também rótulo textual e posição |
| **R9** alvo generoso; cursor nunca é o único caminho | Todo gatilho ≥ 44px; nada só em `:hover` |
| **R10** tudo do ponteiro se faz por teclado; foco visível | `:focus-visible` presente e alcançável em 100% |
| **R11** zero rede | Nenhum `http`, `@import`, `<link>` externo, webfont |
| **R12** contraste para oficina | Texto ≥ 4,5:1; borda funcional ≥ 3:1 |
| **R13** tela pequena tem a mesma capacidade, reorganizada | Contagem de capacidades: desktop = tablet = celular |
| **R14** nada sugere precisão maior que a que o cálculo tem | Sem gauge, barra proporcional, ponteiro, índice, "% do limite" |
| **R15** nada é ultrapassado em silêncio | Toda condição excedida é nomeada na tela |

**R6 (30/08/2026).** É regra de **segurança**: nenhum valor de partida que erraria por um fator
inteiro — o caso do número de arestas (Z) — é assumido em silêncio. A redação anterior nesta linha
estava incorreta e foi corrigida acima; R6 continua viva e intocada no brief.

**Folha `Procedencia.dc.html`** — deixa de existir. A remoção acontece na fase de correção do
desenho, não agora.

### 2.2 Vocabulário (brief §11)

- Todo termo técnico aparece **por extenso seguido do símbolo entre parênteses**. Símbolo sozinho é
  falha — inclusive `L/D`, inclusive no celular. **Exceção declarada (decisão do Mestre, 30/08): o
  resumo compacto da ferramenta usa só as siglas, em maiúscula, no formato `10 R1 Z4 L45`.** O
  gabarito é a casa desse formato; a regra "por extenso" continua para todo o resto da tela.
  **Segunda exceção (decisão do Mestre, 01/09): o resumo ou o gatilho de um bloco recolhido pode
  usar o formato sigla — `Ø10 · Z4 · L45` — mesma natureza da exceção do resumo da ferramenta.
  Qualquer texto em tamanho pleno continua por extenso.**
- Famílias, exatamente: **Fresar · Furar · Roscar · Mandrilar**.
- Níveis, exatamente: **CRÍTICO · ATENÇÃO · NORMAL**.
- **Proibidos na tela:** `estimado`, `forçado`, `modo rápido`, `modo detalhado`, `camada 1`,
  `camada 2`, `desbaste/semi-acabamento/acabamento` como escolha do usuário, `Sem fonte publicada`
  (é rótulo de documento — `MVP` §0.2 — não de tela), `extrapolado` e `editado` como marca de origem
  do resultado (30/08/2026 — a procedência saiu do produto, commit `2783a6b`).
- **`manual` fica de fora da lista:** `valor manual` / `valores manuais` nomeia um controle que
  divergiu da recomendação (brief §7.4, `MVP` §2.6) — comportamento, não marca de procedência.
  Proibir a palavra solta derrubaria o resumo "N valores manuais" e a regra de herança ao trocar de
  ferramenta. Só a marca Partida/Manual do campo `ap` morreu (D1).

### 2.3 Anti-requisitos (brief §12 + design system §7)

Não existe, e a presença é falha crítica automática: perfil de máquina · ~~fator de segurança~~ · seletor
de tipo de operação · índice de saúde ou nota 0–100 · medidor de ponteiro, arco ou barra proporcional
· vida da ferramenta em número ou percentual · deflexão em micrômetros · fator de revestimento ·
controle único de agressividade · ~~histórico, favoritos, biblioteca de ferramentas,~~ conta · copiar
resultado · exportar, imprimir, relatar · onboarding ou tour · glass · glow neon · gradiente de fundo
· ícone por fonte externa · segunda rampa de estado · matiz de identidade por parâmetro · estado
desabilitado · scrim modal · aviso de penetração de trabalho (ae) baixa · faixa universal de
velocidade de corte · referência fixa de produtividade.

**Revogação parcial — decisão escrita do Mestre, 30/08/2026.** `histórico` e `favoritos` deixam de
ser proibidos e **entram no MVP**. `biblioteca de ferramentas` também sai da lista — consequência
derivada da inversão de D5 (a biblioteca entra na área "Configurações"), não fala direta do Mestre.
**`conta` / conta de usuário continua proibida.** As três proibições vinham do brief §12; a decisão
escrita do Mestre as revoga e o brief não é editado nesta rodada.

**Segunda revogação parcial — decisão escrita do Mestre, 01/09/2026.** `fator de segurança` deixa de
ser proibido e **entra no MVP**. Na tela ele é a **margem de segurança**; nos documentos, *fator de
segurança* é o nome do conceito.

> ⚠ **A redação original desta revogação, na v1.5, descrevia o modelo errado** — "margem que infla a
> previsão de esforço, padrão `+0 %`, afeta só Pc e Mc". O Mestre corrigiu o modelo no mesmo dia. O
> parágrafo abaixo é o que vale (v1.6); a linha da v1.5 na §5 fica como registro do que foi escrito
> antes.

**O que ele é:** uma **lente de exibição**. Um ajuste único e persistente, em **porcentagem do valor
calculado**, aplicado **por último**, sobre os números de resultado que a tela mostra. Padrão de
fábrica **100 %** — a tela mostra o resultado exatamente como as fórmulas entregam. A 85 %, todo
número de resultado aparece a 85 % do calculado, sempre, até o operador mudar: é o operador que quer
trabalhar vendo número conservador por padrão.

| # | O que vale no protótipo | Verificação |
|---|---|---|
| 1 | **Padrão `100 %`** — a lente neutra. Não existe estado de fábrica que altere número nenhum | O valor de partida na tela é `100 %` |
| 2 | **Não é limitador.** Não trava, não bloqueia, não recusa, não escala com regra própria. **Acima de 100 % é permitido** — mostra mais que o calculado, e é decisão do operador (**R1**) | Nenhum clamp, nenhum teto, nenhum `disabled` |
| 3 | **Escala só o número de resultado exibido.** Não toca no que o operador digitou — profundidade de corte (ap), penetração de trabalho (ae), balanço (L), número de arestas (Z), dado de material | Campo de entrada nunca muda de valor ao mexer na lente |
| 4 | **Alerta e nível de segurança NÃO acompanham a lente.** Eles descrevem o físico real calculado | **R7** (alerta nunca esmaece) e **R15** (nada ultrapassado em silêncio). Uma lente que apagasse alerta seria limitador disfarçado |
| 5 | **O `±` e o ajuste de parâmetro continuam iguais** (`MVP` §8): recalculam a cadeia em precisão plena; a lente só reescala o número final mostrado | Nenhuma mudança no comportamento dos `±` |
| 6 | **O controle é campo numérico ou passo `±`**, igual aos `±` de rotação e avanço. **Não é barra nem cursor deslizante** | Barra proporcional é proibida por **R14** |
| 7 | **Mora na área "Configurações"** — configuração persistente (`E2` §7.1). O painel só a exibe **quando difere de 100 %** (`E3` §6.1) | — |

**Não é o "controle único de agressividade" da lista acima.** Aquele move os parâmetros de corte uns
sobre os outros e muda o que se executa; este não toca em parâmetro nenhum — é lente de leitura, com
padrão neutro, e o ajuste de cada parâmetro continua individual e no mesmo lugar. **Decisão do
Mestre, 01/09/2026:** onde algum documento tratar a lente como agressividade proibida, a decisão
revoga.

**Fonte:** não se aplica. A disciplina No-Invention (§2.6) vale para **fórmula, constante do motor e
limiar derivado de constante física**. Isto é **interação de tela**, e o padrão `100 %` é a identidade
trivial "mostra o que o cálculo deu". A proibição vinha do brief §12; a decisão escrita do Mestre a
revoga, e o brief registra o override na própria linha.

**Potência de máquina — reafirmada como proibida.** O perfil de máquina, o **alerta de produtividade
contra a potência disponível** e o **rótulo de potência na interface** morrem junto e vão para
`FUNCOES_FUTURAS.md`. A **potência de corte na aresta (Pc)** é resultado calculado e **fica** — não é
potência de máquina.

### 2.4 Checklist do design system §9

Todas as caixas do checklist §9 valem inteiras e sem exceção. Acrescenta-se, do §3, que o `:root` de **toda**
folha copia o bloco pronto **completo** — tokens de cor, interação, espaço, raio e tempo, mais
`:focus-visible` e `prefers-reduced-motion`. Meia cópia é falha (achado A13).

### 2.5 Volumetria e formato (brief §6)

Unidade sempre junto do número · casas decimais fixas por grandeza, não ajustáveis · dígitos de
largura fixa (`tabular-nums`) · arredonda só na exibição · 12 a 15 números na tela ao mesmo tempo.

### 2.6 Números da tela

**Nenhum número de demonstração.** Todo valor exibido é rastreável ao `MVP` (§7.6, §7.7, §11.1) ou a
um canônico. Se o documento não tem o número, ajusta-se **uma entrada** do exemplo — nunca um resultado — e **não
se inventa o número** (`LESSONS` `L21`, `L23`).

O exemplo encenado é o do **balanço** (`L` 45 mm, `L/D` 4,5, ~~gatilho 1a como segunda condição~~ —
**sem segunda condição desde 08/09/2026: o gatilho 1a foi revogado, `MVP §9.2`**), fixado em
29/08/2026. Todo valor derivado dele tem de **sobreviver ao recálculo pelas fórmulas do próprio
`MVP`** — foi exatamente o que falhou em A14 (`LESSONS` `L17`).

**Fronteira — a disciplina de procedência é nossa, não do operador.** A regra "nenhuma fórmula,
constante de cálculo ou limiar derivado de constante física entra sem fonte" (`L21`, `L23`) governa
quem **escreve os documentos do projeto**: impede agente e autor de inventar constante de corte. Ela
**não** governa o dado que o operador digita dentro do produto — numa calculadora, o operador é a
fonte do número dele (o catálogo do fornecedor, o ensaio, a experiência), e a calculadora não
interroga a origem do valor. **Nem governa decisão de escopo, nome, vocabulário ou limiar de
julgamento de produto** — esses são escolha do dono do produto e não exigem fonte externa (decisão
do Mestre, 01/09/2026). Ver **D12**.

### 2.7 Decisões do Mestre — não se reabrem por agente

| # | Decisão |
|---|---|
| **D1** | ~~`ap` fica campo de entrada, com superfície afundada + marca Partida/Manual + `⟲`~~ — **substituído em 30/08/2026 por decisão do Mestre: a profundidade de corte (`ap`) é uma caixa de digitar comum, editável o tempo todo, com o rótulo do campo e nada mais. Sai a marca Partida/Manual, sai o `⟲`, sai frase explicativa junto do campo. Palavras dele: "apenas a caixa para digitar".** |
| **D2** | ~~Editar dado de material é revelação/gaveta **no lugar** — nunca aba ou rota separada~~ — **invertido em 30/08/2026 por decisão do Mestre: editar dado de material SAI da tela principal para uma área separada, de propósito mais difícil de alcançar (a área "Configurações", ver D5). Razão dele: dado de material é estático e padronizado, só muda se o fornecedor mandar valor novo; à mão, na tela principal, convida erro do operador.** |
| **D3** | Blocos de **configuração** auto-colapsam mostrando os valores; ~~"o que vai acontecer" e "o que mexer" não colapsam — comprimem por estado~~ — **ver D9 (§2.8): revogado; toda prosa nasce recolhida** |
| **D4** | Feedback dos parâmetros = **trilha de posição relativa** (faixa recomendada + tick de partida + indicador), nunca escala absoluta — ~~suspensa por Q2 (§4), não revogada~~ **fora do MVP (decisão do Mestre, 30/08/2026): a trilha e a faixa recomendada viram função futura — ver `Docs_inicial/construcao/FUNCOES_FUTURAS.md`. Q2 fechada com "remover do MVP".** |
| **D5** | ~~Gestão de ferramentas (adicionar/editar/apagar) fica fora do MVP~~ — **invertido em 30/08/2026 por decisão do Mestre: a gestão de ferramentas ENTRA no MVP, dentro de uma área nova chamada "Configurações", junto com a edição de dado de material que sai da tela principal por D2. O escopo dessa área é tarefa separada — não está definido aqui.** |
| **§45** | Chips de estado usam a tríade da rampa §2.4: fundo `-bg`, texto e borda `-ink` — nunca fundo sólido com texto branco |
| **D10** | **Novo (decisão do Mestre, 30/08/2026):** ao calcular, o painel dá um retorno visual confirmando que o cálculo rodou (um *check*). Urgência dele: antes de continuar |
| **D11** | **Novo (decisão do Mestre, 30/08/2026):** cada parâmetro que o operador mexe (velocidade de corte, engajamento radial, profundidade, avanço) tem uma gaveta recolhida com a instrução do que aquele parâmetro faz, o que acontece se aumentar e o que acontece se diminuir. Nasce fechada, como D9. Palavras dele: "se ele quer fazer uma velocidade mais rápida, ele abre a gaveta e vê as informações para saber o que deve fazer" |
| **D12** | **Novo (decisão do Mestre, 30/08/2026):** o operador **cria material novo** e informa ele mesmo as constantes — classe ISO, dureza, força específica de corte (kc1.1), expoente (mc) e velocidade de corte (vc). A lista de 12 materiais passa a ser **ponto de partida, não limite**. Nenhum valor digitado é recusado, truncado ou ajustado em silêncio (**R1**); se um valor levar a resultado extremo, quem fala é o **alerta**, nunca um bloqueio. É a mesma natureza de calculadora livre de D1 e da §2.6. Onde a criação mora — junto da edição de dado de material, na área "Configurações" (D2, D5) — é escopo da tarefa separada dessa área. Palavras dele: "material pode ser criado, as constantes quem vai inserir é o usuário... já viu uma calculadora impedir de colocar um valor?" |

---

### 2.8 Revisão do design system contra o ToolOptimizer (30/08/2026)

**Origem:** o Mestre apontou que o `DESIGN_SYSTEM_FENIX.md` ficou simples demais e mandou rever
contra `ToolOptimizerCNC/docs/_canonicos/DESIGN-SYSTEM.html` (360K, canônico de lá).

**O que se adota de lá:**

| Item | Valor |
|---|---|
| Escala de espaço | `4 · 8 · 12 · 16 · 24 · 32 · 48` — os 6 degraus do ToolOptimizer **mais o `48`, que o Fenix já tinha**. Retirá-lo mexeria em espaçamento em uso nas 6 folhas sem ganho: é superset, não conflita |
| Raio | `2 · 4 · 8 · full` — o que o design system §2.9/§3 **já fixou** (`--r-chip: 2px`); os degraus `12` e `16` do ToolOptimizer **não foram adotados**. Adotá-los seria decisão nova do Mestre e teria de descer para o design system antes de F2, como D7–D9 desceram |
| Famílias | Inter (texto) · JetBrains Mono (**todo** valor numérico) — já correto no Fenix |
| Grade desktop | 12 colunas, configuração 3, resultado 9 — **2 seções, não 3**. O documento diz que isto substitui a referência anterior de 3 colunas. **Camada 2, não 1: nenhuma fonte da precedência §1 é dona de layout — F2 não audita, veredito do Mestre em F3 (ver §3)** |
| Forma da Zona 4 | Cartão alto próprio para o número, rótulo acima, número mono grande, unidade ao lado |
| Zona 5 | Grade de 4 colunas para os parâmetros. **Camada 2, não 1: nenhuma fonte da precedência §1 é dona de layout — F2 não audita, veredito do Mestre em F3 (ver §3)** |

**O que NÃO se adota, e por quê:**

| Item | Motivo |
|---|---|
| Paleta do tema claro | Lá está marcada *"proposto, não existe no produto"*, com o tom escurecido de texto **em aberto**. Os neutros do Fenix já têm contraste verificado — **decisão do Mestre, 30/08: mantém os do Fenix** |
| Escala de 8 degraus tipográficos | O próprio documento a descreve como valores arbitrários canonizados depois do fato, e registra `text-[13px]` e `text-[18px]` como dívida. Copiar importaria o defeito |
| Ícones Material Symbols via Google Fonts | Viola **R11** — zero rede em tempo de uso |
| `drop-shadow` na cor do parâmetro · `jackpotFlash` · cor por parâmetro | Aposentados pelo Fenix — design system §1, explícito na §4.6 (proíbe `drop-shadow` colorido, animação de chegada e matiz por parâmetro) e reforçado na §7 e §8 para a cor por parâmetro; o `jackpotFlash` decorativo também viola o brief §7.2 ("movimento comunica estado, nunca decora"). Marcados como dívida no próprio ToolOptimizer |
| Gauge de meia-lua, barra proporcional | Anti-requisito do brief §12 e **R14** |

**Decisões novas (D6–D9).** D7, D8 e D9 desceram para o `DESIGN_SYSTEM_FENIX.md` em 30/08 — D8 na §2.8,
D9 na §4.4 r6, D7 na §4.6 (nova), mais os tokens `--h-target` / `--h-cta` na §3 e 5 caixas novas no
checklist §9. **D6 já estava na §2.8 desde o começo**: o defeito não era o design system, era o
protótipo não obedecer.

| # | Decisão | Razão |
|---|---|---|
| **D6** | **Escala tipográfica: `11 · 13 · 16` px de texto + `20` e `32` px mono — o `32` para o número principal, como a tabela do design system §2.8 classifica.** Nada fora | ISA-101 põe o teto em 4 tamanhos de texto — hierarquia demais vira ruído em tela lida de relance. O numerário conta separado. Decidido por boas práticas, delegado pelo Mestre em 30/08 |
| **D7** | **Todo resultado mora em cartão próprio.** Dois cartões **altos** com `−`/`+` de 44px para rotação e avanço; sete a oito cartões **baixos**, sem incremento, para as saídas de verificação. **Acréscimo do Mestre, 30/08:** os botões `−`/`+` andam de ~~10% em 10%~~ **5% em 5%** (**emenda do Mestre, 07/09/2026**), e a cada toque **todos** os resultados recalculam na hora, não só o número tocado | Rotação e avanço são os únicos editáveis (brief §7.3, calculadora bidirecional só neles) — dar `±` ao resto prometeria edição inexistente. E resolve **T2/C4** por forma, não só por tamanho. Delegado pelo Mestre em 30/08 |
| **D8** | **Separador de milhar é ponto: `4.456 rpm`.** Decimal segue vírgula: `0,018 mm` | Padrão brasileiro, e é o que o DS-base já usa (`6.800`, `2.176`). Decisão do Mestre, 30/08. **Corrige o defeito atual**, em que o separador é um espaço comum |
| **D9** | **Prosa e aviso nascem recolhidos, mesmo depois de calcular.** Só o **alerta** fica sempre aberto. Todo o resto de texto tem botão para abrir | Pedido direto do Mestre em 30/08 — o painel perdeu o caráter de calculadora dinâmica por excesso de texto. **Revoga a parte de D3** que dizia que "o que vai acontecer" e "o que mexer" não colapsam |

---

## 3. Camada 2 — lei de julgamento (não auditável por comando)

Estas **não** entram em F2 como falha objetiva. Entram em F3 como veredito do Mestre, olhando a tela.

- **T1, T2, T4–T12** (brief §9) — o brief declara que nenhuma tem resposta nele. O protótipo escolheu uma
  resposta para cada; a pergunta de F3 é se a escolha serve, não se ela viola regra.
- **C1–C12** (brief §10) — critérios de aceitação do desenho. São afirmações sobre um operador real
  ("chega ao primeiro resultado sem que ninguém explique nada"). Nenhum agente verifica isso lendo
  HTML.
- **Grade desktop e grade da Zona 5** (vindas da §2.8) — a grade de 12 colunas 3/9 em 2 seções e a
  grade de 4 colunas dos parâmetros. Nenhuma fonte da precedência §1 é dona de layout: o
  `DESIGN_SYSTEM_FENIX.md` declara que não define layout nem onde cada informação mora, e o brief
  descartou toda decisão de layout de propósito (Apêndice). F2 não mede grid nenhum; a pergunta de
  F3 é se o arranjo serve. Descer um grid para o design system seria decisão nova do Mestre.

**Regra dura:** um achado de camada 2 apresentado como violação de regra é finding inválido e é
rejeitado em F3. O bloco B da crítica de 28/08 é camada 2, **exceto a parte de B3 que invoca R13 e o
`MVP` §2.3 — essa é camada 1 e não se descarta em F3** (já tratada nas §44–§45 do HANDOFF).

---

## 4. Ambiguidades abertas — o que o Mestre precisa fechar antes de F2

Consequência direta de G0 = C. **Enquanto esta seção estiver aberta, o gabarito não é régua completa.**

**Todas fechadas em 30/08/2026.** Q1 e Q5 na v1.1; Q2, Q3 e Q4 na v1.2 (revisão item a item do
Mestre). A seção 4 não bloqueia mais nada — a régua da camada 1 está completa.

| # | Pergunta | Por que o agente não decide |
|---|---|---|
| **Q1** | ~~O que está "não conforme"?~~ **RESPONDIDA em 30/08** — ver quadro abaixo | — |

### Q1 — o que o Mestre apontou em 30/08

Quatro defeitos, nenhum deles catalogado nos 44 achados de 28/08:

| # | Defeito | Vira |
|---|---|---|
| **1** | **Texto demais no painel.** Perdeu o caráter de calculadora dinâmica. Só o **alerta** deve nascer aberto; toda outra prosa e aviso nasce **recolhido, com botão**, mesmo depois de calcular | **D9** |
| **2** | **Separador de milhar quebrado.** `4 456` — espaço comum no lugar do ponto. Causa confirmada: o caractere está no HTML, não é fonte nem CSS | **D8** |
| **3** | **Resultados sem destaque**, perdidos no meio do texto. Devem ficar em cartão alto e evidente, na forma da Zona 4 do ToolOptimizer | **D7** |
| **4** | **O design system do Fenix ficou simples demais.** Muita regra de posicionamento e formato já estava resolvida no design system do ToolOptimizer e não foi trazida | **§2.8** deste gabarito |
| **Q2** | ~~A **faixa recomendada** da trilha (D4) sai de onde?~~ ~~**ADIADA por decisão do Mestre, 30/08**~~ **FECHADA em 30/08/2026 pelo Mestre: "remover do MVP".** A trilha e a faixa recomendada saem para `FUNCOES_FUTURAS.md` (ver D4) | Número sem fonte é proibido (`L21`) |
| **Q3** | ~~**T12 — comparar duas condições.**~~ Explicada em 30/08: hoje o painel mostra um resultado por vez; trocar a ferramenta apaga o anterior, e não dá para ver os dois lado a lado. ~~**Aguarda decisão**~~ **FECHADA em 30/08/2026 pelo Mestre: um resultado por vez; comparação lado a lado fica fora do MVP** | Muda o produto, não o caminho técnico |
| **Q4** | ~~**T1 — densidade.**~~ ~~**Será respondida ao ver o resultado da rodada da Q1** (decisão do Mestre, 30/08)~~ **FECHADA em 30/08/2026 pelo Mestre: a densidade atual funciona** | — |
| **Q5** | ~~Escopo do auditor de F2.~~ **RESPONDIDA, 30/08: só camada 1.** A camada 2 espera F3 | — |

---

## 5. Versionamento

- Versão sobe **só** quando o Mestre fecha uma pergunta da seção 4 ou dá uma decisão nova.
- Agente **não promove versão** e **não edita** as seções 1–3 sem ordem explícita.
- Toda mudança registra data e o que mudou, na tabela abaixo.

| Versão | Data | O que mudou |
|---|---|---|
| 1.0 | 30/08/2026 | Criado em F1. G0 = C registrado. Precedência fixada, camada 1 e 2 separadas, 5 perguntas abertas na seção 4 |
| 1.1 | 30/08/2026 | Q1, Q5 e o separador respondidos; Q2 adiada, Q3 e Q4 seguem abertas. Nova §2.8 — revisão contra o design system do ToolOptimizer, com D6–D9. **A seção 4 deixa de bloquear F2**, que roda só na camada 1 |
| 1.2 | 30/08/2026 | Revisão item a item do Mestre no painel: D1 e D7 alteradas, D2 e D5 invertidas, D10 e D11 criadas, três proibições do brief §12 revogadas (`histórico` e `favoritos` entram no MVP; `conta` continua proibida), Q2/Q3/Q4 fechadas, R6 corrigida, e ajuste de escopo do que o painel exibe. Nova área "Configurações" (escopo em tarefa separada). Novo documento `Docs_inicial/construcao/FUNCOES_FUTURAS.md` |
| 1.3 | 30/08/2026 | **D12** criada (decisão do Mestre): o operador cria material novo e digita as constantes; a lista de 12 é ponto de partida, não limite; nenhum valor é recusado ou ajustado em silêncio (R1). Fronteira de procedência explicitada na §2.6 — a regra "nenhum número sem fonte" governa os autores dos documentos, não o operador dentro do produto |
| 1.3 · sync | 30/08/2026 | Passada de vocabulário (não promove versão): `extrapolado` e `editado` entram nos proibidos da tela §2.2 — consequência de `2783a6b`, a procedência saiu do produto. `manual` fica de fora, com a razão registrada na §2.2 |
| 1.3 · sync | 01/09/2026 | A regra "nenhum número sem fonte" (§2.6) foi estreitada por decisão do Mestre: exige fonte só para fórmula, constante de cálculo e limiar derivado de constante física. Nome, vocabulário, decisão de escopo e limiar de julgamento de produto não exigem fonte externa. Não promove versão |
| 1.4 | 01/09/2026 | Segunda exceção de vocabulário na §2.2 (decisão nova do Mestre): o resumo ou o gatilho de um bloco recolhido pode usar o formato sigla (`Ø10 · Z4 · L45`), mesma natureza da exceção do resumo da ferramenta; texto em tamanho pleno segue por extenso. Promove versão — decisão nova (§5) |
| 1.5 | 01/09/2026 | **Segunda revogação parcial da §2.3** (decisão nova do Mestre): `fator de segurança` sai dos anti-requisitos e **entra no MVP**, como **margem de segurança** em porcentagem com sinal, campo ou passo `±` (nunca barra — R14), na área "Configurações", padrão `+0 %` e faixa recomendada 0–50 %. `perfil de máquina`, `potência de máquina` e os demais anti-requisitos continuam proibidos. Promove versão — decisão nova (§5). ⚠ **O modelo descrito nesta linha estava errado — ver v1.6.** A linha fica como registro do que foi escrito |
| 1.6 | 01/09/2026 | **Modelo do fator de segurança corrigido pelo Mestre**, no mesmo dia. Não é margem que infla a previsão de esforço: é **lente de exibição** — `% do valor calculado`, padrão **`100 %`**, aplicada por último sobre os **números de resultado exibidos**, sem tocar no que o operador digitou. **Não é limitador** (acima de 100 % é permitido, R1), **alerta e nível de segurança não acompanham** (R7, R15), e o `±` de rotação/avanço segue igual (`MVP` §8). Sai o padrão `+0 %`, sai a faixa recomendada 0–50 %, sai a exigência de fonte — é interação de tela, não constante de cálculo. Registrado também que a lente **não** é o "controle único de agressividade" proibido no brief §12. Promove versão — decisão nova (§5) |
