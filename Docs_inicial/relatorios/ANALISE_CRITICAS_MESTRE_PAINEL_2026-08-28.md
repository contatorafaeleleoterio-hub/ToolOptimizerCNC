# Análise das críticas do Mestre ao protótipo do painel

**Data:** 28/08/2026
**Entrada:** cinco grupos de crítica do Mestre sobre `prototipo/`.
**Companheiro de:** [`CRITICA_PROTOTIPO_PAINEL_2026-08-28.md`](CRITICA_PROTOTIPO_PAINEL_2026-08-28.md)
**Padrão:** brief (R1–R15, T1–T12, §11, §12), DS (§1, §7, §8, §9), MVP (§2–§5, §7), e prática de
HMI industrial (ISA-101 / `REGRAS-PAINEL-INDUSTRIAL`).

**Objetivo declarado pelo Mestre:** "algumas sugestões talvez não sejam a melhor escolha — analise
a crítica, e se a sugestão não bater com as melhores práticas de UI/UX, sugira a melhor opção."

> **Revisão de 29/08/2026.** Os 5 grupos e as 5 decisões foram reabertos contra a fonte. **Os cinco
> vereditos e as cinco decisões se sustentam** — nenhuma decisão ficou abalada. Três correções de
> redação foram aplicadas no lugar (Grupo 2 · `ap`; Grupo 3 · a frase do estado NORMAL; Grupo 5 · a
> barra de estado e a dicotomia escala/posição), cada uma marcada. Onde a `CRITICA` companheira
> errava e este documento acertava — a numeração das regras do §5.2 —, quem foi corrigido foi a
> `CRITICA`.

## Veredito de uma linha por grupo

| Grupo | Veredito |
|---|---|
| 1 · Materiais | **Concordo com o objetivo, refino o mecanismo.** Editar ≠ calcular está certo; "aba/menu separado" adiciona navegação — o certo é revelação/gaveta no lugar. |
| 2 · Ajustes | **O controle que você pediu já está lá** (engajamento radial = penetração de trabalho `ae`). Texto explicativo por controle **já é obrigatório** na spec. |
| 3 · Colapsável | **Config colapsável = concordo forte** (eu apontei a falta). **Prosa colapsada por padrão = discordo com fundamento** — é a razão do produto; a resposta é comprimir por estado. |
| 4 · Ferramentas | **Instinto de arquitetura certo, mas é pós-MVP por decisão registrada** (§12). Guardar a orientação para a biblioteca de ferramentas; não puxar agora. |
| 5 · Indicadores | **Concordo com a necessidade** (eu apontei a falta). **Discordo de "usar o ToolOptimizer como referência"** — os medidores dele foram cortados com razão. Existe a forma certa: posição relativa, não escala absoluta. |

---

## Grupo 1 — Escolha e configuração de materiais

### O que você pediu
Parâmetros embutidos no material · o painel só mostra os que estão em uso · sem campos de edição
durante o cálculo · edição/adição numa sessão/aba/menu separado · sem atrapalhar a navegação.

### Intenção real
Manter a superfície de cálculo calma. Editar dado de material é tarefa de setup ("digita uma vez o
que o fornecedor mandou", §5.2 r1), não de cada cálculo — misturar CRUD de dado de referência com
uma tarefa que se repete dezenas de vezes por dia é anti-padrão conhecido de HMI.

### Veredito por ponto

| # | Ponto | Bate no padrão? | Resposta |
|---|---|---|---|
| 1 | Params embutidos no material | ✅ já é assim | §11.1 traz os 12 materiais pré-configurados; cada linha tem os 5 dados. Nada a mudar. |
| 2 | Painel só **mostra** os params em uso | ✅ e é exigência | §4.7 / §7.5 / T8: os 5 dados ficam visíveis ao lado do material. Você e o brief concordam. |
| 3 | Sem campos de edição durante o cálculo | ⚠️ conflito parcial | §5.2 diz "visíveis **e editáveis**" e chama isso de "um dos pontos mais distintivos". Mas editar é raro e persistente (§5.2 r1-2). **Seu instinto é bom UX** — só não pode **esconder** a edição, só **desativá-la do fluxo padrão**. |
| 4-5 | Edição/adição em sessão/aba/menu separado | ⚠️ super-corrige | Uma aba/menu separado = navegação = fere P1 ("painel persistente, nunca assistente em etapas") e a regra da ISA-101 de que navegação é fricção em tarefa de alta frequência. |

### A melhor opção

**Revelação no lugar (ou gaveta lateral), não rota separada.**

1. Os 5 dados ficam **sempre visíveis** ao lado do material, em modo leitura (não campo de input).
2. Um gatilho "ajustar dados do material" expande os 5 em campos editáveis **ali mesmo** (ou numa
   gaveta que não esconde o painel). Edita, confirma, colapsa de volta para leitura.
3. Preserva os inegociáveis do brief: marca **editado** no resultado (§5.2 r3), recálculo na hora
   (§5.2 r4), retorno ao valor de fábrica `⟲` (§5.2 r2), persistência por material (§5.2 r1).
4. **Adicionar** um material novo (mais pesado que editar 5 campos) justifica uma gaveta dedicada —
   ainda sem trocar de rota. Uma rota/tela própria só se a gestão crescer para CRUD com busca e
   importação, e isso é **decisão de escopo pós-núcleo**, não do MVP.

> É exatamente o seu próprio mecanismo do Grupo 3 (colapsar depois do OK, mostrar só o valor)
> aplicado ao bloco de material. Um mecanismo, não dois.

---

## Grupo 2 — Ajustes de parâmetros

### Ponto 1 — "existem quatro opções, colocaram três, inclua o engajamento radial"

**Correção factual.** Engajamento radial = **penetração de trabalho (`ae`)** = largura radial do
corte / stepover. **É o terceiro controle que já está no protótipo** (`vc` · `fz` · `ae`).

Para uma fresa, são exatamente **3** controles de ajuste (§5.1: "Fresar | Vc · fz · ae"). O quarto
da lista do brief (`fn`, avanço por rotação) só existe em furação/mandrilamento.

**O que realmente saiu do bloco de ajuste:** a **profundidade de corte (`ap`)** — penetração
**axial**. Ela virou **campo de entrada**, não controle (§0.4 #12, §4.8, decisão Q8). A razão está
registrada e vem de campo: na entrevista com o fresador e nos três arquivos reais de produção da
fábrica, `ap` é registrada ao lado de `S` e `F` como parte do parâmetro — "o operador chega com ela
decidida". Continua **totalmente editável**, só não no bloco "ajuste".

**Ação:** nada a incluir — `ae` já está.

**Decidido (29/08/2026 — opção A):** `ap` **fica como campo de entrada** (a evidência de campo é
forte: o operador chega com ela decidida, §4.8). **A decisão está mantida após a revisão.** O que
muda é torná-la **reconhecível como mexível**. Concretamente, `ap` recebe o vocabulário de estado de
um controle, mantendo a posição de campo no fluxo (§2.2 passo 7):

- ~~superfície **afundada** (`--surface-input`, DS §2.1 — o sinal de "aqui eu digito"), como os dois
  números de comando; distinta dos campos de leitura;~~ **— retirado na revisão de 29/08/2026: `ap`
  já está nessa superfície.** `Main:88` põe `ap` num `.fbox`, que é `--surface-input` +
  `--border-control` + 44px — o mesmo do `D`, do `L`, do `r` e dos dois heróis. A prescrição era um
  não-fazer, e o diagnóstico que a acompanhava ("hoje ela parece leitura, igual a `D`, `L`, `r`")
  descrevia mal a causa: no protótipo **o que separa um controle de um campo não é a superfície** —
  é a marca de estado e o ícone de retorno ao lado do rótulo (compare `Main:99-103`, o controle
  `vc`, com `Main:88`, o campo `ap`);
- marca **Partida** ao lado, e **Manual** + `⟲` (retorno ao valor de partida) quando divergir —
  §4.1 e §5.1 já pedem "valor de partida e retorno ao recomendado". **É esta a diferença que
  faltava, e sozinha ela resolve o ponto do Mestre**;
- na procedência, origem = `DECISÃO DE PROJETO`, padrão da geometria (§5.2).

Isso resolve o que sua crítica pegou (o operador não vê que pode mexer) sem reverter a §0.4 #12.

### Pontos 2-3 — "todo controle precisa de texto explicativo, como o vc tem"

**Já é obrigatório na spec.** §5.3: "Cada controle carrega uma explicação de quatro partes,
**obrigatória**. Um parâmetro sem os quatro textos escritos **não entra na tela** — controle sem
explicação é caixa-preta com um botão." §5.5 já traz os quatro textos escritos para `vc`, `fz`,
`ae`, `ap`, `fn` (O que é · Ao aumentar · Ao diminuir · Equilíbrio).

No protótipo, os três controles têm o gatilho de ajuda; só o `fz` foi desenhado **aberto** para
demonstrar. Não há conflito — é exigência que o protótipo sub-representou. ✅ Concordo, e já está no
documento.

---

## Grupo 3 — Textos explicativos e interface colapsável

### Pontos 1-3 — "todos os textos explicativos colapsáveis, recolhidos por padrão"

**Divida em dois tipos de texto — eles têm regras opostas:**

**(a) A ajuda de 4 partes de cada controle → já é isso.** §5.5 r2 "abre por clique"; DS §4.4
"disclosure, abre por clique ou teclado"; §5.5 r6 "o estado não persiste entre sessões" (volta
recolhida). Recolhida por padrão. ✅ O que você pede já é a regra.

**(b) "O que vai acontecer" e "o que mexer" → NÃO colapsar por padrão. Discordo, com fundamento.**

Esses dois blocos são "a razão de o produto existir" (§2.3, §2.4, §7.3, §7.4). §2.4, literal:
"entregar apenas o par rotação/avanço **não vende nada** — é o que ele já tem, de graça, e melhor. O
produto só existe por causa do que vem depois do par." Se colapsam por padrão, a tela padrão vira
*dois números e nada* = a planilha da fábrica. O produto perde a razão de existir.

**Mas sua preocupação é legítima** (T1 densidade; C10: "se um elemento vira ruído após uma semana,
ele estava errado"; operador experiente não quer reler). **A resposta certa é comprimir por estado,
não colapsar por escolha:**

| Bloco | Estado NORMAL (o comum) | Com sinal / alerta ativo |
|---|---|---|
| **O que vai acontecer** | **uma linha:** "Nada fora da faixa entre as condições verificadas" (já é a spec — **brief §5.6**; o `MVP` §7.3 diz o mesmo com outras palavras: "Nada fora da faixa. As condições verificadas estao na §7.2") | prosa completa, só os sinais que dispararam |
| **O que mexer** | pode ficar **recolhido** (é consulta opcional quando nada está errado) | a direção que resolve o alerta **abre sozinha** e vem primeiro (§7.4 r5) |

Assim o operador experiente rodando parâmetro normal já vê ~2 linhas, não dois parágrafos — sem
esconder o valor do produto quando ele importa.

### Pontos 4-6 — "colapsar as configurações depois do OK, mostrar só o valor"

**Concordo forte. É bom UX e já está na spec — e eu apontei que o protótipo não desenhou.**

§2.4 r1-2: "Todo bloco de entrada pode ser recolhido... Cabeçalho recolhido mostra **os valores**,
não a contagem de campos" (`Ø10 · Z4 · L30`). §2.4 r3: o estado persiste entre sessões. Isso é
divulgação progressiva — padrão de manual. A descoberta do FlowNC confirma ("configurações
principais sem abrir o arquivo — lê de bater o olho").

**Dois ajustes na sua proposta:**

1. **"Confirmar com OK" por campo adiciona um passo** a uma tarefa que se repete dezenas de vezes
   (§3.5). O modelo é híbrido (§2.5): depois do 1º cálculo, mudança recalcula ao vivo, sem gesto.
   Melhor gatilho de recolher: o operador sai do bloco / abre o próximo, ou o cabeçalho do bloco.
   Sem botão OK por campo.
2. **Duas travas do §2.4 que a auto-colapso não pode furar:** (r4) bloco com campo obrigatório
   vazio ou inválido **não recolhe** e abre sozinho se o erro surgir; (r6) trocar o tipo de
   ferramenta **abre** o bloco de geometria (campo novo recolhido = campo preenchido sem ninguém
   olhar, R6).

---

## Grupo 4 — Gerenciamento de ferramentas

### O que você pediu
Sessão separada para editar/adicionar/excluir ferramentas · estrutura genérica por família/tipo ·
variáveis (raio, altura) vinculadas à ferramenta e carregadas no cálculo · não explodir cada
variação numa ferramenta nova.

### Veredito

**O instinto de arquitetura está certo. Mas isto é pós-MVP por decisão registrada.**

§12, literal: "Histórico, favoritos, **biblioteca de ferramentas**, conta de usuário | Fora deste
corte. **Vêm depois do núcleo.**" Construir a sessão de gestão agora = expandir o escopo contra uma
decisão que já foi tomada com razão.

**O que já existe no MVP como versão leve disso:** você escolhe 1 das 17 geometrias, dentro de 4
famílias (§3.2), e digita os campos daquela geometria (raio, ângulo…) por cálculo. É o substituto
enxuto da biblioteca.

### Onde sua orientação está certa (guardar para quando a biblioteca for construída)

- ✅ Organizar por **família → tipo → ferramenta específica**, com variáveis vinculadas. Mapeia em
  "família (4) → geometria (17) → campos da geometria".
- ✅ **Não** transformar "balanço 10 mm" e "balanço 30 mm" em ferramentas diferentes. O MVP já
  acerta: balanço (`L`) é campo de entrada, não parte da identidade da ferramenta.
- ✅ Variáveis carregadas no momento do cálculo, "só as pertinentes à ferramenta selecionada" —
  §3.2 já faz: "Campo que não se aplica **não existe**".

### Onde tem um guard-rail que a "estrutura genérica" não pode furar

§3.1 ponto 3 **de propósito** não deixa o operador cruzar dois campos para montar uma ferramenta:
"'cabeçote faceador em aço rápido' **simplesmente não é uma opção** — a prevenção de erro vem da
estrutura, não de uma validação depois". O substrato entra no **nome** da ferramenta porque ele
muda o cálculo. Genérico para variáveis de **instância** (raio, balanço) = ok. Genérico para
identidade que afeta o cálculo (substrato) = quebra a prevenção de erro estrutural.

**Ação:** registrar sua orientação no design da futura biblioteca de ferramentas (ADR quando
chegar a hora). Não puxar para o MVP.

---

## Grupo 5 — Indicadores e feedback visual

### O que você pediu
Indicador/gráfico para avaliar visualmente o parâmetro · "muito alto / muito baixo / próximo do
ideal" ao olhar · sem depender de ler texto · **usar o ToolOptimizer como referência** (tem vários
indicadores).

### A necessidade: concordo, e eu já apontei a falta

Minha crítica B1 e A7: o protótipo **não desenhou** a faixa recomendada nem a barra de desvio dos
controles. O brief **exige** esse feedback visual:
- §5.3 r3: "Existe uma **faixa recomendada**, e o operador pode sair dela."
- §5.4: "A **barra de estado** de cada controle mede o desvio contra a referência."
- Rampa de diagnóstico: cor + rótulo + posição, 3 níveis.
- §9.2: limiares explícitos (`vc < 0,6× partida`, `vc > 1,4× partida`, etc.).

Então na necessidade **estamos de acordo, e o protótipo falha aqui.**

### A referência: discordo de "usar o ToolOptimizer", com fundamento

Os indicadores do ToolOptimizer foram **cortados item por item, com razão registrada** (DS §8, brief
§12) — e a FASE 1 da própria crítica que você encomendou avisou: "ler esses projetos para entender
o usuário, **não para restaurar o painel antigo**".

| Indicador do ToolOptimizer | Por que caiu |
|---|---|
| Gauge de meia-lua (41 barras, arco 180°, ponteiro) | §12: "medidor com escala é anti-requisito" — sugere um teto que não existe |
| Barra de estado por parâmetro (segmentos, opacidade) — **a implementação do ToolOptimizer** | DS §8: componente de painel antigo, "se o desenho precisar de algo assim, **inventa contra o brief — não herda**". *(Corrigido na revisão de 29/08/2026: esta linha estava numa tabela chamada "por que caiu", ao lado do gauge e do índice 0–100 — e isso a lê errado. O gauge é anti-requisito declarado; a **barra de estado não caiu**: o `MVP` §5.4 a **exige** — "a barra de estado de cada controle mede o desvio contra a referência da §5.2". O que caiu foi o componente herdado, não o conceito.)* |
| Índice de saúde 0–100 / semáforo com escala | §12: "não existe fórmula com fonte para consolidar grandezas de naturezas diferentes num número só" |
| Matiz por parâmetro (roxo `ae`, laranja `ap`) | DS §1: ISA-101 — cor é reservada para anomalia |

**A razão de fundo (R14):** "Nenhum elemento visual pode sugerir precisão maior que ±15–25%." Um
ponteiro apontando "73%" mente sobre o que o modelo sabe. E sem perfil de máquina, não existe teto
contra o qual desenhar a escala. **O painel do ToolOptimizer foi descartado exatamente por causa
desses indicadores** — trazê-los de volta desfaz a decisão central do Fenix.

### A distinção que resolve: posição relativa, não escala absoluta

Existem dois tipos de indicador visual. Um é proibido, o outro é obrigatório:

| Tipo | Exemplo | Status |
|---|---|---|
| **Escala contra um limite que não existe** | gauge até um máximo de máquina · "% do limite" · nota 0–100 · vida em minutos | ❌ proibido — o máximo / a fórmula / o limite não existem |
| **Posição dentro da escala do próprio controle** | onde o valor está **dentro da faixa recomendada** · quão longe do valor de partida · qual dos 3 estados de diagnóstico | ✅ permitido e exigido — sem teto implícito, sem falsa precisão |

> *(Corrigido na revisão de 29/08/2026 — a dicotomia estava boa demais para ser verdade.)* A versão
> anterior opunha "**escala absoluta** ❌ proibido" a "posição relativa ✅". Como está escrito, isso
> proíbe algo que o `MVP` manda fazer: o **§5.3 tabula mínimo e máximo de cada controle** (`Vc`: 0 a
> `Vc_partida × 1,3`; `fz`: `fz_partida × 0,4` a `× 2,0`; `ae`: 0,01 mm a `D`) e diz, com todas as
> letras, que "mínimo e máximo são **a escala do controle**, não trava" — e o **§5.2** que "essa
> posição fica marcada **na escala**". A escala do controle é absoluta e existe por decisão
> registrada. O que o brief §12 e o DS §7 proíbem é escala contra um **teto de máquina** (que não
> existe, porque não há perfil de máquina) e índice consolidado sem fórmula. **A decisão D4 não
> muda** — a trilha proposta é exatamente a escala do §5.3 com a faixa recomendada marcada dentro
> dela; muda a razão que a justifica.

### A melhor opção — feedback visual que cumpre o que você quer sem mentir

1. **Trilha por controle** (resolve B1 + A7 + sua necessidade):
   uma barra horizontal com — a **faixa recomendada** como segmento preenchido, a **partida** como
   tick, o **valor atual** como thumb. De relance:
   - thumb à esquerda do segmento → **muito baixo**
   - thumb à direita → **muito alto**
   - thumb dentro → **adequado**
   - distância do thumb ao tick → **quanto você empurrou**

   Isso é "alto / baixo / adequado ao olhar", sem escala falsa, sem ponteiro, sem número de limite.

2. **A rampa de diagnóstico fica** — cor + rótulo (ATENÇÃO/CRÍTICO/NORMAL) + posição fixa, por
   parâmetro em estado. Já está na spec; o protótipo já desenha a banda.

3. **`hex` e `L/D` ganham posição fixa e destacada** (não enterrados no grid de 7 células) — são os
   dois números que sustentam os alertas mais comuns. *(Revisão 29/08/2026: a referência era "minha
   crítica B4", e o B4 trata só do `hex` — "o número de verificação mais importante não tem lugar
   fixo". O `L/D` não é apontado lá; entra aqui como extensão, não como achado da crítica. E a
   medida refeita em B6 reforça os dois: "resultados úteis" começa em ≈817px, abaixo da dobra de um
   viewport de 768px — os dois números que sustentam os alertas mais comuns estão fora do primeiro
   écran.)*

### Um cuidado com "próximo de uma condição ideal" (seu ponto 5)

**Não existe um "ideal" único, e o brief é explícito nisso:**
- T11: dois objetivos opostos (durar × render), sem ponto ótimo entre eles.
- §12: "Uma referência fixa de produtividade — não existe. Duas operações legítimas variam por 38×."
- §9.5: mesma coisa para taxa de remoção.

O indicador pode mostrar **"dentro da faixa recomendada / fora dela"** e **"distância da partida"**.
Não pode mostrar **"você está a 90% do ótimo"** — porque "ótimo" depende de você querer durabilidade
ou velocidade, e isso é o que o bloco **"o que mexer"** responde, com o preço escrito.

---

## Resumo — o que fazer

| Grupo | Ação |
|---|---|
| 1 · Materiais | 5 dados sempre visíveis (leitura); editar via revelação/gaveta no lugar, **não** rota separada; manter marca editado + recálculo + `⟲`. |
| 2 · Ajustes | Nenhuma inclusão — `ae` **é** engajamento radial e já está. `ap` fica campo (decidido, opção A), com **marca Partida/Manual + `⟲`** — a superfície afundada saiu da lista porque `ap` já está nela (`Main:88`). Texto por controle já é exigência. |
| 3 · Colapsável | **Fazer:** auto-colapso dos blocos de config mostrando os valores (sem botão OK por campo; respeitar travas §2.4 r4/r6). **Não fazer:** colapsar "o que vai acontecer/mexer" por padrão — comprimir por estado. |
| 4 · Ferramentas | Registrar a orientação de arquitetura para a biblioteca futura (ADR). **Não construir agora** — §12. |
| 5 · Indicadores | **Fazer:** trilha por controle sobre a escala que o `MVP` §5.3 já define (faixa recomendada + tick de partida + thumb) + rampa de diagnóstico + `hex`/`L/D` com posição fixa. **Não fazer:** gauge, ponteiro, índice 0–100, "% do limite", "% do ideal" — o que não existe é o **teto de máquina** contra o qual desenhar escala (R14, §12), não a escala do controle. |

**Onde concordamos:** materiais editáveis fora do fluxo padrão · texto por controle · config
colapsável · a falta de feedback visual nos controles.

**Onde discordo, com fundamento:** aba/menu separado para material (→ revelação no lugar) ·
prosa colapsada por padrão (→ comprimir por estado) · indicadores no modelo ToolOptimizer
(→ posição dentro da escala do controle, nunca contra um teto de máquina).

---

## Revisão de 29/08/2026 — o que mudou neste documento

| Onde | Veredito | O que foi corrigido |
|---|---|---|
| Grupos 1–5 (os 5 vereditos) | **CONFIRMADOS** | Nada. Toda citação foi reaberta na fonte e confere, incluindo a numeração `§5.2 r1–r4` — que aqui estava certa e na `CRITICA` estava deslocada em um. |
| **D1** · `ap` fica campo | **mantida** | O bullet "superfície afundada" foi riscado: `ap` já está em `--surface-input` (`Main:88`). O que faltava é a marca Partida/Manual + `⟲`. A decisão não depende disso. |
| **D2** · revelação no lugar | **mantida** | Nada. A premissa (P1, `MVP` §2.1) confere literalmente. |
| **D3** · comprimir por estado | **mantida** | A frase do estado NORMAL é do **brief §5.6**, não do `MVP` §7.3 (que a redige diferente). |
| **D4** · trilha de posição relativa | **mantida** | A justificativa "escala absoluta é proibida" foi reescrita: o `MVP` §5.3 define escala absoluta para todo controle. O proibido é escala contra teto de máquina. A forma prescrita não muda. |
| **D5** · gestão de ferramentas fora do MVP | **mantida** | Nada. Brief §12 e `MVP` §12 confirmam. |

**Nenhuma decisão ficou abalada.** As duas correções que tocaram decisões (D1 e D4) atingiram a
*justificativa*, não o *conteúdo* — em ambos os casos a fonte reaberta continua sustentando a
decisão, por um caminho um pouco diferente do que estava escrito.

**Uma pendência entrou pela porta da `CRITICA` e ainda não tem decisão:** o achado **A14** —
o exemplo numérico do `MVP` §7.6 não se reproduz pelas fórmulas do §6.4 e do §6.8. Ele não abala
nenhuma das cinco decisões (todas são de forma, não de número), mas **bloqueia a execução** do
plano de revisão do protótipo: não faz sentido re-semear as folhas com um exemplo que não fecha.
Precisa de issue contra o `MVP` antes da sessão de `/design`.
