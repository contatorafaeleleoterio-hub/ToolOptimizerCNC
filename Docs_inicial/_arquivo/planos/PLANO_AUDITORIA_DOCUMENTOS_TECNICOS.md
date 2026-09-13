# Plano — auditoria de documentos técnicos do Fenix (skill `dados-industria-cnc`, modo 4)

## Contexto

O Mestre pediu para rodar a skill `dados-industria-cnc` e auditar a documentação do
projeto atrás de inconsistências, melhorias e correções, com relatório de sugestões no fim.

A skill tem quatro modos; este pedido é o **modo 4 — auditar documento/fórmula antes de
virar código**. Não é o modo 1 (inventário dos 6 projetos) que o `HANDOFF.md` §28 lista como
"próxima ação" — aquilo varre acervo disperso; isto confere o material que **já** está pronto
para virar o motor de cálculo do Fenix.

Por que agora: os 6 canônicos + o MVP + o escopo carregam **toda fórmula e toda constante**
que viram código. Um dígito trocado numa série, um símbolo reaproveitado, uma fórmula copiada
com diferença entre dois documentos — cada um vira bug que chega ao operador com aparência de
número correto. A skill existe porque revisão humana não pega esse tipo de defeito.

Já na leitura preliminar apareceram ~15 candidatos a achado, e a revisão do plano (auditoria
independente, 27/08/2026) confirmou 7 deles linha a linha, corrigiu 4 e achou 3 novos — amostra
abaixo. O acervo é cuidadoso, mas não está limpo.

## Escopo (decidido com o Mestre)

**Entra** (~4.650 linhas):

| Documento | Por que |
|---|---|
| `canonicos/CANONICO_GEOMETRIA_DE_CORTE.md` | fórmulas de `De`, `ae` por altura de crista, piso de Ø |
| `canonicos/CANONICO_MOTOR_DE_CALCULO.md` | cadeia de 9 passos, Kienzle, afinamento de cavaco, potência/torque |
| `canonicos/CANONICO_VELOCIDADES_E_AVANCOS.md` | tabelas de `Vc` e `fz`, janela de tolerância |
| `canonicos/CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` | fatores por material de ferramenta, `E` do metal duro |
| `canonicos/CANONICO_LIMITES_E_ALERTAS.md` | limiares de alerta, fórmulas de deflexão e produtividade |
| `canonicos/CANONICO_DEFLEXAO_E_VIDA.md` | viga escalonada, Taylor, `De/D`, tabela de `E` por grau |
| `mvp/MVP_CALCULADORA_PARAMETROS.md` | onde as fórmulas dos canônicos são recompostas em cadeia e exemplos numéricos resolvidos |
| `escopo/E1_DOMINIO_E_CATALOGO.md` | catálogo de ferramentas, substratos, materiais, operações |
| `escopo/E2_ENTRADAS_E_CONFIGURACAO.md` | campos, faixas, envelope, faixa de diâmetro |
| `escopo/E3_RESULTADOS_E_APRESENTACAO.md` | **entrou na revisão do plano** — carrega fórmula (`n`, §4.1) e um exemplo resolvido inteiro (§3.1) com `CTF`, `vf`, `Pc`, `Mc`, `MRR` |
| `escopo/E4_INDICADORES_E_SEGURANCA.md` | semáforo, limiares numéricos, alertas, índices |
| `GLOSSARIO_DE_TERMOS.md` | régua do verificador 4 (jargão) |

**Por que o E3 entrou.** O escopo original o excluía por ser "apresentação". Não é: o exemplo
resolvido da §3.1 já mostra três defeitos na leitura preliminar — o `CTF 1,49×` é `1/√(ae/D)`, a
fórmula que MOTOR §1.1 **elimina** (a exata dá 1,005 em `ae/D` = 0,45); o `vf` exibido (1 528) não
sai de `fz·Z·n` (0,140 × 4 × 6 366 = 3 565); e o `Pc` de 5,8 kW exige `kc` ≈ 6 327 N/mm², que não
sai de nenhuma linha canônica (1045 nesse passe dá ~2,3 kW). Somado a isso, E3 §2.2 e §3 pressupõem
compensação de afinamento **ativa**, que MVP §6.5 e E7 excluem do produto. Números de exemplo são
lidos como especificação por quem implementa.

**Não entra:** E0/E5/E6/E7, `construcao/`, `inicio_fenix/`.

**Consultados pontualmente, nunca re-lidos inteiros:**

- `BLOCO_DE_DECISAO.md` — é o que **arbitra** os achados do tipo "decisão não propagada" (Q26, Q28,
  Q29 e a regra de alerta de 27/08). Sem ele não dá para separar contradição real de texto já
  superado por decisão registrada.
- `pesquisa/` — a skill `validacao-pesquisa-fenix` já auditou os retornos, e refazer isso é outro
  trabalho; aqui só se confere procedência de um valor específico (ver seção de cruzamentos).

**Nada é editado nos documentos-fonte.** A saída é um relatório; o que fazer com cada achado é
decisão do Mestre.

## Método — os cinco verificadores da skill, na ordem obrigatória

Ordem do barato ao caro; cada passo usa o resultado do anterior
(`skills/dados-industria-cnc/references/auditoria.md`).

### 1. Unidades e dimensional
- Toda fórmula fecha dimensionalmente dos dois lados, em toda aparição.
- Toda constante de conversão nua tem comentário dizendo **que conversão é**: `1000`, `60`,
  `9549` (vs `9550` citado à parte em MOTOR §1.3), `60000`, `60 × 10⁶`, o `/4` de `Q` na furação
  (MVP §6.8), `708 / 821 / 412` da fórmula do NPL.
- **Fórmula repetida em dois documentos: comparar caractere a caractere.** Alvos já mapeados:
  `hm` (MOTOR §1.1 = MVP l.787 ✓), `hex` (MOTOR §1.1 escreve `√[1−(1−2·ae/D)²]`; LIMITES §1.1 e
  MVP l.781 escrevem `2·√(ae/D−(ae/D)²)` — algebricamente iguais, formas diferentes; a nota de
  equivalência **existe**, em MOTOR §5 l.177, longe das duas fórmulas),
  `Pc`/`Mc` (MOTOR §1.4 = MVP §6.9), `δ` (LIMITES §1.4 l.95 = DEFLEXÃO §1.1 l.19 ✓), `De`
  (GEOMETRIA §1.1 = MOTOR §1.2), `kc` (MOTOR §1.4 passo 5 × MVP §6.7 — **divergem** no termo `γ`),
  `n` (MOTOR §1.4 passo 1 = MVP §6.3 = E3 §4.1).

### 2. Séries, tabelas e constantes
- **Monotonia e razão entre vizinhos** — só em série **ordenada por chave numérica**: `Vc`×faixa
  HRC (VELOCIDADES §2.1), `fz`×Ø (VELOCIDADES §2.2), `E`×%Co (DEFLEXÃO §2.1), e as tabelas de erro
  de δ (DEFLEXÃO §1.1 e §2.3). **Não** se aplica a `kc1.1`×material: material não é série ordenada,
  e cobrar monotonia ali fabrica achado.
- **Cópia de tabela: conferência linha a linha** (material, ISO, dureza, `kc1.1`, `mc`, confiança)
  entre MOTOR §2.1 e MVP §11.1 — é aqui que mora o risco, não na monotonia. A leitura preliminar já
  achou **5 linhas divergentes**: Ti-6Al-4V (1500/0,25 × 2800/0,22), GG25 (800/0,28 × 1150/0,20),
  GGG50 (950 ou 800 / 0,28 × 1500/0,20), P20 (2000/0,25 × 2300/0,20), 2711 (2000–2500/0,25 ×
  2500/0,20) — e o MVP não tem a linha "H13 recozido" que o MOTOR tem. Candidato a `grave`.
- **Constante órfã** — valor fixo no cálculo sem fonte, sem "é entrada do usuário", sem lacuna
  declarada: `η = 0,85`, `De/D = 0,80`, `hmin/rβ = 0,3`, teto de potência `0,77`, fator `γ` de
  1%/grau, `α` do raio de aresta.
- **Precisão inventada** — faixa publicada que virou ponto: os `kc1.1` de valor único (1500,
  1800, 2000, 3000, 4300) — confirmar contra o que o próprio canônico declara como faixa.

### 3. Estrutura de cálculo
- Montar o grafo insumo → resultado da cadeia de MOTOR §1.4 e da cadeia do MVP (§6, pipeline
  l.725).
- **Entrada fantasma:** `vf` é consumido em MOTOR §1.4 passo 6 (l.75, `Q = ap·ae·vf/1000`) e nunca
  produzido nos 9 passos — a fórmula `vf = fz·n·z` só aparece em §1.2 (l.45, seção da esférica), e o
  `Z` que ela exige não é declarado como entrada da cadeia em lugar nenhum. A cadeia do MVP §6.1
  **não** tem esse buraco: lá o `Vf` é passo próprio (§6.6). Conferir contra E3, que exibe `vf`.
- **Resultado órfão:** `f_hex` é calculado em MOTOR §1.4 passo 3 e nenhum passo seguinte o
  consome.
- **Ciclo declarado:** avanço ↔ espessura de cavaco — a iteração e o critério de parada estão
  escritos? (MOTOR §1.6 dá as invariantes; conferir se fecham.)
- **Faixa de validade:** cada modelo diz onde vale — Kienzle abaixo de `h = 0,1 mm` (MOTOR §1.5),
  CTF para `ae/D ≤ 0,5`, viga escalonada, `De = 2√(D·ap−ap²)` só para `ap ≤ D/2`.

### 4. Jargão — contra o `GLOSSARIO_DE_TERMOS.md`
- **Símbolo usado em fórmula e não definido no glossário:** `Pm`, `Fr`, `Fc`, `D3`, `Cw`,
  `Ktc/Krc/Kte/Kre`, `I1/I2`, `L2`.
- **Símbolo reaproveitado para duas grandezas** (a skill cita "P de passo × P de potência" como
  defeito real):
  - **`De` — o pior dos três, e as duas rodam na mesma cadeia.** É "diâmetro efetivo de corte"
    em MOTOR §1.2 (l.40) e MVP §6.2, e é "diâmetro da parte canalizada da haste" em LIMITES §1.4
    (l.98, `I2 = π·De⁴/64`, com `De = 0,80×D`) e DEFLEXÃO §2.3. Uma entra na rotação, a outra no
    momento de inércia. Some-se a grafia `D_eff` em GEOMETRIA §1.1 para a primeira.
  - `Pc` — "potência na aresta" em MOTOR/MVP e "potência com η embutido" na fórmula de
    LIMITES §1.5 (l.144).
  - `P` — "passo da rosca" no glossário e prefixo da família de potência.
- **Sinônimo solto** — duas grafias para a mesma grandeza: `rβ` (glossário l.44, LIMITES §1.1) ×
  `r_e` (**VELOCIDADES §1.5 e §4** — não existe no MOTOR); agravante: `r_e` é a leitura natural de
  `rε`, que no glossário (l.43) é **raio de ponta**, outra grandeza, usada em MVP §6.11 e E1 §3.3.
  Também: `hmin` (glossário) × `h_min` (canônicos); `κ` × `KAPR` (FERRAMENTAS §1.6); `F` × `Fr`
  dentro de DEFLEXÃO; `Q` × `MRR`.
- Nome por extenso na primeira menção de cada seção (toque leve nos canônicos, regra cheia no
  MVP/escopo).

### 5. Ferramentas e famílias
- Cada família que o E1 cataloga (fresa topo reta, esférica, toroidal, broca, macho, alargador,
  mandril) tem **todos os campos que as fórmulas dela consomem**? Esférica sem `De` a partir de
  `ap`; toroidal declarada em aberto (MOTOR §1.2 e Lacuna 4.3) mas presente no catálogo do E1 —
  conferir coerência.
- Envelope por família (faixa de Ø, nº de arestas, balanço) declarado, ou a marca de que não foi
  levantado — E2. **A skill classifica como `grave` o valor de partida copiado de outra família sem
  dizer de qual linha veio** — vale para os `fz`/`Vc` de partida do MVP §11.2–§11.3.
- Grandeza que muda de sentido entre famílias: `fz` (por dente) × `fn` (por rotação) — MVP §6.8
  usa `fn` na furação; conferir que não se cruzam.
- Ferramenta cujo material não casa com nenhum material de peça do corpus.

## Cruzamentos específicos deste repositório (fora dos 5 verificadores)

1. **Marcador vivo que outro doc declara fechado:** `⧗ AGUARDA R2` em LIMITES §1.1 (e §3.5, L-16)
   — MOTOR §5 diz "o `⧗ AGUARDA R2` do LIMITES §1.1 fecha". Está fechado no texto de LIMITES?
2. **Correção de fonte não propagada:** MOTOR Lacuna 4.8 diz que o fator `1,1–1,3` que sustenta o
   teto `0,77` de LIMITES §2.2 "não tem fonte verificável e precisa ser corrigido ali". LIMITES
   §2.2 ainda apresenta o `0,77` sem registrar isso.
3. **Nota de decisão que contradiz o corpo do doc:** LIMITES §5 item 6 ("Todo alerta carrega alvo
   numérico") vs. o cabeçalho de 27/08 e §1 ("o verbo de comando sai").
4. **Correção `γ` de saída — a contradição é interna ao MOTOR, não entre os três documentos.**
   MOTOR §1.3 (l.59) diz "1%/grau **acima da referência** γ0 = +6°" mas escreve
   `kc × (1 − 0,01·γ)` — usa `γ`, não `(γ − γ0)`; em γ = 6° dá 0,94 em vez de 1,00. E MOTOR §1.4
   passo 5 (l.74) multiplica por `(1 − 0,01·γ0)`, a **referência**, constante — 0,94 fixo, um corte
   de 6% no `kc` de todo material, onde deveria entrar o `γ` real. **O MVP §6.7 está certo:** omite
   o termo e declara por quê (l.856–860 — os pares de catálogo já pressupõem +6°, e a correção
   "não é aplicada no MVP; entra como nota na procedência"). Conferir também se algum documento
   aplica a taxa alternativa de 1,5%/grau.
5. **`Pc` com e sem η — e LIMITES contradiz a si mesmo.** MOTOR §1.4 (l.76, `Pc = Q·kc/60000`, sem
   η) e MVP §6.9 (l.876) concordam; LIMITES §1.5 (l.144, `Pc = ap·ae·vf·kc / (60·10⁶·η)`) põe η no
   denominador do que chama de `Pc`. Pior: três linhas abaixo (l.147) o mesmo documento deriva
   `Q_max = Pm·η·60000/kc`, que só fecha se o lado esquerdo da l.144 for `Pm`. O rótulo da l.144
   está errado pelo próprio documento.
6. **Tabela de `kc1.1` duplicada:** MOTOR §2.1 × MVP §11.1 — ver verificador 2, já com 5 linhas
   divergentes mapeadas. Decidir qual das duas é a fonte, não conciliar as duas.
7. **`E = 580 GPa`:** citado como constante em LIMITES §1.4, DEFLEXÃO §2.1/§3 e FERRAMENTAS §2.2
   — mesma origem, mesmo rótulo ("decisão de engenharia, não número publicado") nos três?
8. Onde um canônico manda "corrigir ali" outro documento — MOTOR §5 tem **8 consequências, das
   quais 2 são diretivas** para o LIMITES (l.177, o `⧗`; l.178, o teto 0,77); DEFLEXÃO §5 tem
   várias com `~~riscado~~ RESOLVIDO`. Cada uma: foi feita ou não?
9. **E3 × MVP × E7 — compensação de afinamento.** E3 §2.2 (l.44) e §3 (l.46, l.90, l.111) exibem
   "avanço por dente efetivo, com afinamento de cavaco" e um indicador de `CTF` ativo; MVP §6.5
   (l.815, "nenhuma correção é aplicada por cima") e E7 põem a compensação automática **fora** do
   produto. Ou E3 descreve outro produto, ou está desatualizado.

## Amostra de achados já detectados (conferida linha a linha)

Não é o relatório. É o que apareceu na leitura preliminar, **já reconferido em auditoria
independente** contra `arquivo:linha` — os quatro que estavam imprecisos foram corrigidos aqui, e a
severidade final ainda pode mudar na execução.

**Confirmados:**

- **[médio]** `f_hex` calculado em `CANONICO_MOTOR_DE_CALCULO.md` §1.4 passo 3 (l.72) e nenhum dos
  passos 4–9 (l.73–78) o consome — resultado órfão.
- **[médio]** `vf` consumido em MOTOR §1.4 passo 6 (l.75) e nunca produzido na cadeia; o `Z` que a
  fórmula de `vf` exige não é declarado como entrada em nenhum dos 9 passos. Só o MOTOR tem o
  buraco — o MVP §6.1/§6.6 calcula `Vf` como passo próprio.
- **[médio]** Correção de ângulo de saída, dentro do MOTOR: §1.3 (l.59) escreve `(1 − 0,01·γ)` mas a
  prosa diz "acima da referência γ0 = +6°"; §1.4 passo 5 (l.74) aplica `(1 − 0,01·γ0)` — **0,94
  fixo**, corte de 6% no `kc` de todo material, e portanto na potência e no torque.
- **[médio]** `Pc` significa duas coisas: `CANONICO_LIMITES_E_ALERTAS.md` §1.5 (l.144) com `1/η`
  contra MOTOR §1.4 (l.76) e MVP §6.9 (l.876) sem. E a l.147 do próprio LIMITES desmente a l.144.
- **[médio]** `⧗ AGUARDA R2` ainda vivo em LIMITES §1.1 (l.56) depois de MOTOR §5 (l.177) declarar
  fechado — e a dependência é repetida em LIMITES §3 item 5 (l.209) e §5 item 7 (l.244).
- **[médio]** LIMITES §5 item 6 (l.243, "todo alerta carrega alvo numérico … avisar sem dizer para
  onde ir transfere o problema") contradiz o cabeçalho de 27/08 (l.8–15) e a §1 (l.44). E sobram
  outros resíduos de verbo de comando: l.78, l.105 ("a redução necessária") e l.133 ("trocar para
  broca com canal").
- **[leve]** `Pm` usado em fórmula (MOTOR l.77–78, LIMITES l.147/150) e **ausente do glossário** —
  a l.46 define só `Pc` e descreve a potência no motor em prosa, sem batizar o símbolo.
- **[leve]** Constante `/4` na fórmula de `Q` da furação (MVP §6.8, l.871) sem comentário de origem.
  Recalculada: `(π·D²/4)·fn·n / 1000` = `D·fn·Vc/4` cm³/min — **o número está certo**, falta dizer
  que conversão é.
- **[pergunta]** GEOMETRIA §1.3: a fórmula (l.47) usa `Vc_min`, o exemplo (l.51) diz "Vc alvo 200".
  A conta fecha (1000×200/(π×12000) = 5,3 mm); só o rótulo é ambíguo. Rótulo trocado ou grandeza
  trocada?

**Corrigidos na revisão do plano** (o defeito existe, o enunciado anterior errava):

- **[leve]** Raio de aresta com dois símbolos: `rβ` (glossário l.44, LIMITES l.58/60) × `r_e` — que
  está em **VELOCIDADES §1.5 e §4** (l.49, 55, 57, 182–184, 201), **não no MOTOR**. Agravante que o
  enunciado anterior não via: `r_e` lê-se como `rε`, que é **raio de ponta**, outra grandeza.
- **[leve]** `hex` escrito em duas formas (MOTOR l.19 × LIMITES l.51 e MVP l.781) — algebricamente
  idênticas (`1−(1−2ε)² = 4(ε−ε²)`). A nota de equivalência **existe** (MOTOR §5, l.177); o achado
  é que ela mora na seção de consequências de outro documento, não ao lado de nenhuma das fórmulas.
- **[não é achado]** MVP §6.7 omitir o termo `γ`: está **correto e declarado** (l.856–860). Sai da
  lista.

**Novos, achados na revisão:**

- **[grave, a confirmar]** MOTOR §2.1 × MVP §11.1 divergem em 5 materiais — Ti-6Al-4V difere 87%
  (1500 × 2800). Ver verificador 2.
- **[médio]** E3 §3.1 (l.79–114): `CTF 1,49×` é `1/√(ae/D)`, a fórmula que MOTOR §1.1 elimina;
  `vf` exibido não sai de `fz·Z·n`; `Pc` de 5,8 kW não sai da tabela canônica.
- **[médio]** `De` reaproveitado para duas grandezas que rodam na mesma cadeia (rotação × momento
  de inércia). Ver verificador 4.

## Entrega

Arquivo único: `Docs_inicial/AUDITORIA_DOCUMENTOS_TECNICOS.md`, no formato da skill
(`references/auditoria.md`, "O relatório"):

1. **Veredito em 3 linhas** — o que foi auditado, nº de achados por severidade, e se o material
   serve para virar código como está.
2. **Achados**, mais grave primeiro. Cada um: `arquivo:linha` · o valor · por que está errado ·
   o que quebra na prática · severidade (`grave` = número errado chega ao operador · `médio` =
   inconsistência que vira bug · `leve` = forma).
3. **Perguntas** — suspeita sem linha vai aqui, nunca na lista de achados.
4. **O que está certo** — as verificações que passaram, nomeadas (ex.: o `hm` deduzido fecha; o
   fator dimensional de `Pc`; a monotonia da tabela de `E`).

No chat, só o veredito + caminho do arquivo (regra de comunicação do Mestre).

Depois da entrega, opcional e sob decisão do Mestre: abrir uma issue no GitHub por achado
`grave`/`médio` (o repo usa GitHub Issues via `gh`).

## Verificação

- Todo `arquivo:linha` do relatório resolve para a linha citada (conferência em lote no fim).
- Todo achado aritmético foi recalculado, não só lido.
- Cada um dos 5 verificadores tem no relatório ou um achado ou a frase explícita de que passou —
  "nenhum achado" é resultado válido e vai dito com todas as letras.
- Nenhum defeito fabricado: em dúvida, vira pergunta na seção 3, não achado.
- `git status` limpo nos documentos-fonte — só o relatório novo aparece.

## Sessões

Estimativa: **3 sessões** por responsabilidade, reportando ao fim de cada uma.

1. Verificadores 1–2 (unidades + séries/constantes) nos 6 canônicos + tabelas do MVP, incluindo a
   conferência linha a linha de `kc1.1`.
2. Verificadores 3–4 (estrutura de cálculo + jargão) + os 9 cruzamentos da seção anterior, com o
   exemplo resolvido do E3 §3.1 recalculado passo a passo.
3. Verificador 5 (ferramentas e famílias) sobre E1/E2/E3/E4 + consolidação do relatório +
   verificação.
