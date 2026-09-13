# Revisão de conformidade do gabarito do protótipo — F1

**Data:** 30/08/2026 · **Fase:** F1 do protocolo de convergência · **Alvo:**
[`Docs_inicial/construcao/prototipo/GABARITO_PROTOTIPO.md`](../construcao/prototipo/GABARITO_PROTOTIPO.md)
v1.1 · **Método:** skill `reconciliacao-documentacao` (confronto com evidência `arquivo:linha` dos dois
lados) · **Executor:** sessão par, sob orquestração de `fenix-ba`.

**Esta fase só diagnostica.** Nenhum documento foi alterado. `git status` mostra um único arquivo
novo (este relatório).

## Escopo lido

| Documento | O que foi conferido |
|---|---|
| `construcao/prototipo/GABARITO_PROTOTIPO.md` | inteiro (220 linhas) |
| `construcao/BRIEF_DESIGN_INTERFACE.md` | §6, §8 (R1–R15), §9 (T1–T12), §10 (C1–C12), §11, §12, apêndice |
| `construcao/DESIGN_SYSTEM_FENIX.md` | inteiro (424 linhas) + histórico git (`fbe5ab6`, `2572db3`) |
| `mvp/MVP_CALCULADORA_PARAMETROS.md` | §0.2, §7.6, §7.6.1, §7.7, §7.8, §11.1 |
| `HANDOFF.md` | §34–§47 |
| `referencia/LESSONS.md` | L17, L21, L23, L29, L30 (L45 não existe — ver #12) |
| `relatorios/CRITICA_PROTOTIPO_PAINEL_2026-08-28.md` | estrutura, blocos A e B, A13, A14 |
| `ToolOptimizerCNC/docs/_canonicos/DESIGN-SYSTEM.html` | grep de raio, grade, tokens (consulta apenas — nada escrito lá) |

**Fora do escopo:** os `.dc.html` do protótipo (não é a fase deles); tensões T1–T12 e critérios
C1–C12 como julgamento (camada 2).

---

## Contagem de achados

| Severidade | Nº |
|---|---|
| **Crítico** | 1 |
| **Importante** | 5 |
| **Menor** | 8 |
| **Total** | 14 |

Os três mais graves, em uma frase:

1. **#1 (crítico)** — a §2.8 diz que o Fenix "adota" a escala de raio `4·8·12·16·full` do
   ToolOptimizer, mas o design system continua com `2·4·8·full` (`--r-chip: 2px`); um auditor de F2
   que aplique a §2.8 ao pé da letra reprova protótipo conforme.
2. **#2 (importante)** — a §2.4 fixa "as 16 caixas do §9" do design system como régua, e o §9 hoje
   tem 21 caixas (o commit `2572db3` acrescentou 5).
3. **#3 (importante)** — a §2.7 apresenta D3 ("'o que vai acontecer' e 'o que mexer' não colapsam")
   como decisão que "não se reabre em F2", e a §2.8/D9 revoga essa parte de D3 sem que a linha de D3
   sinalize; um auditor lendo a §2.7 na ordem aplica a regra já revogada.

---

## Pergunta 1 — Travessia mecânica

**Caminhos citados pelo gabarito — todos existem:**

| Citado em | Caminho | Estado |
|---|---|---|
| §0, §2.x | `BRIEF_DESIGN_INTERFACE.md` | ✅ existe |
| §1, §2.x | `DESIGN_SYSTEM_FENIX.md` | ✅ existe |
| §1, §2.6 | `MVP_CALCULADORA_PARAMETROS.md` | ✅ existe |
| §1 | `HANDOFF` §35.3, §44.1, §45; §34–§45 | ✅ seções 34–47 existem |
| §1, §3 | `CRITICA_PROTOTIPO_PAINEL_2026-08-28.md` | ✅ existe |
| §1 | `ANALISE_CRITICAS_MESTRE_PAINEL_2026-08-28.md` | ✅ existe (`relatorios/`) |
| §1, §2.6 | `*.dc.html` (Celular, Estados, Main, Procedencia, Tablet, Vazio) | ✅ 6 folhas |
| §2.8 (l.133) | `ToolOptimizerCNC/docs/_canonicos/DESIGN-SYSTEM.html` (360K) | ✅ 359,9K |

**Seções (§) citadas — todas resolvem:**

- brief: §6 (Volumetria e formato), §8 (Regras invioláveis), §9 (Tensões), §10 (Critérios de
  sucesso), §11 (Vocabulário obrigatório), §12 (Anti-requisitos) — **conforme**.
- design system: §1, §2.4, §2.8, §3, §4.4, §4.6, §7, §9 — **conforme** (todas existem; §4.6 foi
  criada no commit `2572db3`, ver Pergunta 3).
- HANDOFF: §35.3 tem D1–D5 (l.1697–1701); §44.1 "As 3 bifurcações" (l.2373); §45.1 "Decisão do
  Mestre" (l.2442) — **conforme**.
- MVP: §0.2 (l.29), §7.6 (l.1105), §7.7 (l.1257), §11.1 (l.1535) — **conforme**, e cada um sustenta
  a afirmação que o gabarito lhe atribui (ver Pergunta 2).

**Identificadores citados:**

- **R1–R15** — brief §8, l.586–602 — **conforme**.
- **T1–T12** — brief §9, l.611–624 — **conforme**.
- **C1–C12** — brief §10, l.632–645 — **conforme**.
- **D1–D5** — gabarito §2.7 / HANDOFF §35.3 — **conforme**.
- **D6–D9** — gabarito §2.8 / HANDOFF §46.6 — **conforme** (existem; a descida tem ressalvas — Pergunta 3).
- **Q1–Q5** — gabarito §4, l.191–206 — **conforme**.
- **A13, A14** — `CRITICA` §A, l.319 e l.344 — **conforme** ("meia cópia do `:root`" = A13; "o
  exemplo não sobrevive ao recálculo" = A14).
- **L17, L21** — `LESSONS` l.280 e l.391 — **existem**. Uso impreciso — ver #13.
- **L45** (gabarito §2.6, l.114) — **ver #12**: `LESSONS` vai de L1 a L30; não há L45. Aqui `L45`
  designa "balanço (L) = 45 mm", não uma lição.

---

## Pergunta 2 — Fidelidade (a fonte X manda mesmo Y?)

**Blocos conformes:**

- **§1 (precedência)** — cada linha da tabela reflete o papel real da fonte; `CRITICA` e `ANALISE`
  existem e são tratadas como "achado, não régra" — **conforme**.
- **§2.1 (R1–R15)** — a coluna "como se verifica" traduz cada regra do brief §8 sem distorcer o
  sentido — **conforme** (ressalva de procedência menor: os limiares numéricos de R9 "≥44px" e R12
  "≥4,5:1 / ≥3:1" vêm do design system §2.9/§6, não do brief §8; a atribuição "brief §8" no
  cabeçalho da §2.1 é imprecisa mas não muda o resultado da verificação).
- **§2.2 (vocabulário)** — famílias, níveis e marcas batem palavra por palavra com brief §11
  (l.678–682); a proibição de "Sem fonte publicada" na tela está corretamente atribuída a `MVP` §0.2
  (l.43: "Este rótulo é do documento, não da tela") — **conforme**.
- **§2.5 (volumetria)** — as 5 regras batem com brief §6 l.497–504 e o "12 a 15 números" com brief
  §6 l.493 — **conforme**.
- **§2.6 (números da tela)** — "o exemplo é o do balanço, L45, L/D 4,5, gatilho 1a como segunda
  condição" bate com `MVP` §7.6 (l.1123–1124) e §7.6.1 (l.1196, l.1233, l.1237) e com a decisão do
  Mestre em `HANDOFF` §39.3 (l.2070) — **conforme** (ressalva de notação — #12).
- **§2.7 (D1–D5 + §45)** — as seis linhas batem com `HANDOFF` §35.3 (l.1697–1701) e §45.1–45.2
  (l.2448–2470) — **conforme**.

**Achados:**

### #1 · CRÍTICO · a escala de raio "adotada" na §2.8 não existe no design system

- **Gabarito** `GABARITO_PROTOTIPO.md:140` — sob **"O que se adota de lá"**:
  `| Raio | `4 · 8 · 12 · 16 · full` — 5 degraus |`
- **Fonte (dona do token, §1 precedência nº 5)** `DESIGN_SYSTEM_FENIX.md:159` —
  "Raio: `2` chip · `4` campo · `8` cartão · `999` pill"; e `DESIGN_SYSTEM_FENIX.md:207` —
  `--r-chip: 2px; --r-field: 4px; --r-card: 8px; --r-pill: 999px;`
- **Contradição interna adicional** `GABARITO_PROTOTIPO.md:98` — a §2.4 manda que "o `:root` de
  **toda** folha copia o bloco pronto **completo**" do design system §3 — que inclui `--r-chip: 2px`.
  A §2.8 (raio começa em 4, sem 2px) e a §2.4 (copiar o §3, que tem 2px) se contradizem.
- **Verificação:** `git show fbe5ab6:…/DESIGN_SYSTEM_FENIX.md` e a versão atual — o commit `2572db3`
  (descida de D7–D9) **não tocou** em raio. O `ToolOptimizerCNC/…/DESIGN-SYSTEM.html` de fato mostra
  boxes de raio em `4·8·12·16·9999px` (grep `radius-card__box`), então a §2.8 descreve a escala **de
  lá** com precisão — mas ela nunca entrou no Fenix.
- **Consequência:** a §2.8 está na **camada 1** ("F2 audita esta camada inteira", l.53). Um auditor
  de F2 vai conferir os raios dos `.dc.html` contra `4·8·12·16·full` e reprovar o chip a `2px` — que
  o design system e o item 11 do plano da §35.4 dizem estar **certo**. É exatamente o "achado falso"
  que a §46.8/§47 queriam evitar, na direção oposta: agora é o gabarito que está fora de sincronia
  com o design system.
- **Correção proposta:** na linha da §2.8, trocar a coluna Valor para
  `2 · 4 · 8 · full — o que o design system §2.9/§3 já fixou; os 12/16 do ToolOptimizer não foram
  adotados`, espelhando o tratamento que a mesma tabela dá à escala de espaço (l.139, "mais o 48, que
  o Fenix já tinha"). Alternativa: se o Mestre quiser mesmo 12/16, isso é decisão nova, tem de
  **descer para o design system §2.9/§3** antes de F2, como D7–D9 desceram.

### #2 · IMPORTANTE · "as 16 caixas do §9" — o §9 tem 21

- **Gabarito** `GABARITO_PROTOTIPO.md:98` — "As **16 caixas** do §9 valem inteiras e sem exceção."
- **Fonte** `DESIGN_SYSTEM_FENIX.md:403–423` — o checklist §9 tem **21** caixas `- [ ]`
  (contagem por `grep -c`).
- **Verificação:** `git show fbe5ab6:…` — na criação do gabarito o §9 tinha **16** caixas; o commit
  `2572db3` acrescentou **5** (`git diff fbe5ab6 2572db3`, hunk do §9: milhar/ponto · cartão da §4.6 ·
  `−`/`+` só nos altos · revelação recolhida · gatilho mostra rótulo). O gabarito foi editado nesse
  mesmo commit (§47.4) para a escala de espaço, mas a §2.4 não foi atualizada.
- **Contradição interna:** a §2.8 (l.158) diz "6 caixas novas no checklist §9" — logo o próprio
  gabarito sabe que o §9 cresceu, e a §2.4 continua dizendo 16.
- **Consequência:** um auditor que trate "16" como contagem canônica pode dar por encerrado o
  checklist sem as 5 caixas que carregam justamente D7/D8/D9 — as verificações mecânicas que F2 mais
  precisa.
- **Correção proposta:** trocar "As 16 caixas" por "As caixas do §9 (21 na revisão de 30/08)" ou
  remover o número e escrever "todas as caixas do checklist §9, na íntegra".

### #6 · IMPORTANTE · a lista de anti-requisitos da §2.3 omite três itens do brief §12

- **Gabarito** `GABARITO_PROTOTIPO.md:86–94` — a §2.3 declara-se "brief §12 + design system §7" e diz
  "a presença é **falha crítica automática**". A lista enumera ~21 itens.
- **Fonte** `BRIEF_DESIGN_INTERFACE.md:711` — "Aviso quando a penetração de trabalho é baixa" ·
  `:712` — "Uma faixa universal de velocidade de corte" · `:713` — "Uma referência fixa de
  produtividade". Nenhum dos três aparece na §2.3.
- **Consequência:** um auditor de F2 usando a §2.3 como checklist de anti-requisitos não verifica
  "aviso de `ae` baixa" (nada mais no gabarito o cobre) nem os dois medidores de escala universal
  (parcialmente cobertos por R14, l.72, mas não nomeados).
- **Correção proposta:** acrescentar à lista da §2.3: "· aviso de penetração de trabalho (ae) baixa ·
  faixa universal de velocidade de corte · referência fixa de produtividade" com a fonte
  `brief §12`.

### #8 · MENOR · D6 chama 20px de "texto"; o design system §2.8 chama de "mono"

- **Gabarito** `GABARITO_PROTOTIPO.md:163` (D6) — "Escala tipográfica: `11 · 13 · 16 · 20` px **de
  texto** + `32` px mono para o número principal."
- **Fonte** `DESIGN_SYSTEM_FENIX.md:133` — tabela da §2.8: `| destaque secundário | 20px | 700 |
  mono |`. O papel de 20px é **mono**, não "texto".
- **Observação:** a raiz da ambiguidade está **dentro do design system** — a prosa da §2.8 (l.126)
  diz "quatro tamanhos de texto + um numérico", mas a tabela lista 3 papéis `sans` + 2 `mono`. D6
  ecoa a prosa; a tabela discorda de ambos. É drift de documentação (candidato a nota da
  Pergunta 4 do próprio design system), **não** violação do protótipo.
- **Correção proposta:** alinhar D6 e a tabela do design system §2.8 — decidir se o "destaque
  secundário" de 20px é `sans` (e então D6 está certo, corrige-se a tabela) ou `mono` (e então D6
  deve dizer "`11 · 13 · 16` px de texto + `20` e `32` px mono").

### #9 · MENOR · a §4.6 do design system não carrega a etiqueta "(D7)"

- **Gabarito** `GABARITO_PROTOTIPO.md:156` — "D7 na §4.6 (nova)".
- **Fonte** `DESIGN_SYSTEM_FENIX.md:304` — "### 4.6 Cartão de resultado" — a seção existe e o
  conteúdo bate com D7, mas não tem o marcador `(D7)` inline, ao contrário da §2.8 ("(D8)", l.143) e
  da §4.4 r6 ("(D9)", l.275).
- **Consequência:** rastreabilidade — quem procurar "(D7)" no design system não acha.
- **Correção proposta:** acrescentar "(D7)" ao título ou à primeira frase da §4.6, como nas outras
  duas.

### #10 · MENOR · D7 diz "oito cartões baixos"; as fontes dizem "7 a 8"

- **Gabarito** `GABARITO_PROTOTIPO.md:164` (D7) — "**oito** cartões baixos, sem incremento, para as
  saídas de verificação".
- **Fonte** `DESIGN_SYSTEM_FENIX.md:314` — "| Quantos na tela | 2 | **7 a 8** |"; e
  `BRIEF_DESIGN_INTERFACE.md:312` — "**Entre 7 e 8** destas aparecem simultaneamente".
- **Consequência:** "oito" fixa um ponto onde as fontes dão faixa; conferível por contagem, pode
  virar achado.
- **Correção proposta:** trocar "oito cartões baixos" por "sete a oito cartões baixos".

### #13 · MENOR · citação de lição imprecisa em §2.6

- **Gabarito** `GABARITO_PROTOTIPO.md:111` — "Se o documento não tem o número, muda-se o exemplo —
  não se inventa o número (`LESSONS` `L21`, `L17`)."
- **Fonte** `LESSONS.md:445` — **L23** ("Número errado no exemplo canônico não é erro de aritmética:
  é o estado da tela que deixa de existir") é a lição exatamente sobre "ajusta-se uma entrada —
  nunca um resultado", que é o que a §2.6 afirma. L21 (varredura mecânica) e L17 (recálculo pega
  defeito na fórmula) são pertinentes mas não são a lição principal aqui.
- **Correção proposta:** citar `L23` junto de `L17` na l.111; L21 pode ficar como referência da
  contagem "números com procedência ÷ números exibidos".

### #14 · MENOR · "cor por parâmetro" atribuída ao brief §12

- **Gabarito** `GABARITO_PROTOTIPO.md:153` — "`drop-shadow` na cor do parâmetro · `jackpotFlash` ·
  cor por parâmetro | Aposentados pelo Fenix (**§1 do design system, brief §12**) ..."
- **Fonte** `BRIEF_DESIGN_INTERFACE.md:695–714` — o brief §12 **não** tem linha de "matiz/cor por
  parâmetro". Essa proibição mora em `DESIGN_SYSTEM_FENIX.md:376` (§7, "Matiz de identidade por
  parâmetro | §1") e §8 (l.393, "Roxo de `ae` e laranja de `ap`").
- **Correção proposta:** trocar "brief §12" por "design system §7 e §8" nessa linha.

---

## Pergunta 3 — Descida de D6–D9 para o design system

Confronto uma a uma com o commit `2572db3` (`git diff fbe5ab6 2572db3 -- …/DESIGN_SYSTEM_FENIX.md`) e
o arquivo atual.

| Alvo declarado (gabarito §2.8, l.156–159) | Onde deveria estar | Estado |
|---|---|---|
| **D8** na §2.8 | `DESIGN_SYSTEM_FENIX.md:143–154` — tabela "Formato numérico **(D8)**" | ✅ **conforme** — ponto p/ milhar (`4.456 rpm`), vírgula p/ decimal (`0,018 mm`), separador nunca espaço. Bate palavra por palavra com D8 (l.165). |
| **D9** na §4.4 r6 | `DESIGN_SYSTEM_FENIX.md:275` — "| 6 | **Nasce recolhido, e continua recolhido depois do cálculo** (D9) |" + razão (l.277–280) + exceção do alerta por R7 (l.282–284) | ✅ **conforme** — bate com D9 (l.166), inclusive "só o alerta fica aberto". |
| **D7** na §4.6 (nova) | `DESIGN_SYSTEM_FENIX.md:304–329` — "### 4.6 Cartão de resultado" | ⚠️ conteúdo **conforme** (duas alturas, `−`/`+` de 44px só nos altos, razão = brief §7.3), mas **sem a etiqueta "(D7)"** — ver #9. |
| tokens `--h-target` / `--h-cta` na §3 | `DESIGN_SYSTEM_FENIX.md:210–211` — `--h-target: 44px; --h-cta: 56px;` | ✅ **conforme**. |
| **6 caixas novas** no checklist §9 | `DESIGN_SYSTEM_FENIX.md:415–419` | ⚠️ foram **5**, não 6 — ver #7. |
| **D6 já estava lá** desde o começo, na §2.8 | `git show fbe5ab6:…/DESIGN_SYSTEM_FENIX.md` §2.8 | ✅ **verdadeiro** — a tabela `11·13·16·20 / 32 mono` e o teto ISA-101 existem desde `fbe5ab6`. (Ressalva de rótulo "texto/mono" — #8.) |

### #7 · MENOR · "6 caixas novas" — o commit acrescentou 5

- **Gabarito** `GABARITO_PROTOTIPO.md:158` — "e **6 caixas novas** no checklist §9".
- **Fonte** `git diff fbe5ab6 2572db3 -- …/DESIGN_SYSTEM_FENIX.md` — o hunk do §9 tem exatamente 5
  linhas `+- [ ]`: milhar/ponto (`:415`), cartão da §4.6 (`:416`), `−`/`+` só nos altos (`:417`),
  revelação recolhida (`:418`), gatilho mostra rótulo (`:419`). 16 + 5 = 21, que é a contagem atual.
- **Origem do erro:** `HANDOFF.md:2610` (§47.1) também diz "6 caixas novas" — o gabarito herdou.
- **Contradição de redação na mesma seção:** l.156 "**Todas** desceram para o `DESIGN_SYSTEM`" e
  l.159 "**D6 já estava lá**" — D6 não desceu, era pré-existente; `HANDOFF` §47.2 redige isso melhor
  ("D6 já estava lá").
- **Correção proposta:** "5 caixas novas"; e trocar "Todas desceram … D6 já estava lá" por "D7, D8 e
  D9 desceram … D6 já estava na §2.8 desde o começo".

---

## Pergunta 4 — Contradição interna e precedência

### #3 · IMPORTANTE · D3 apresentada como vigente numa seção "que não se reabre em F2", já revogada em parte por D9

- **Gabarito** `GABARITO_PROTOTIPO.md:123` — §2.7, D3: "'o que vai acontecer' e 'o que mexer'
  **não colapsam** — comprimem por estado". Cabeçalho da §2.7 (l.117): "Decisões já tomadas pelo
  Mestre (**não se reabrem em F2**)".
- **Gabarito (o outro lado)** `GABARITO_PROTOTIPO.md:166` — §2.8, D9: "**Revoga a parte de D3** que
  dizia que 'o que vai acontecer' e 'o que mexer' não colapsam".
- **Estado:** a revogação **está declarada** — mas só na linha de D9, na §2.8. A linha de D3, na
  §2.7, não tem nenhuma marca de "ver D9" nem foi editada.
- **Consequência:** um auditor de F2 que leia a §2.7 na ordem (e ela se anuncia como imutável) vai
  exigir que os dois blocos de prosa **não** colapsem, e reprovar o protótipo se eles colapsarem —
  quando D9 manda o contrário. É o padrão "camada 2 vestida de camada 1 / régua que se contradiz"
  que `LESSONS` L29 (l.665) diz que o gabarito existe para eliminar.
- **Correção proposta:** editar a linha de D3 na §2.7 para "~~'o que vai acontecer' e 'o que mexer'
  não colapsam~~ — **ver D9 (§2.8): revogado; toda prosa nasce recolhida**", mantendo o texto
  riscado para rastreio (como o plano da §35.4 faz).

### #4 · IMPORTANTE · D4 apresentada como vigente, mas suspensa por Q2 sem sinalização na linha de D4

- **Gabarito** `GABARITO_PROTOTIPO.md:124` — §2.7, D4: "Feedback dos parâmetros = **trilha de
  posição relativa** (faixa recomendada + tick de partida + indicador), nunca escala absoluta".
  Mesma seção "não se reabre em F2".
- **Gabarito (o outro lado)** `GABARITO_PROTOTIPO.md:203` — §4, Q2: "A **faixa recomendada** da
  trilha (D4) sai de onde? **ADIADA** … fica aberta … **Até lá a trilha não se desenha**."
- **Terceiro lado (o protótipo já a desenhou)** `HANDOFF.md:2385` (§44.2, item 15) — "Trilha por
  controle (`vc`/`fz`/`ae`) — **faixa recomendada** + tick de partida + thumb 44px".
- **Consequência:** a §2.7 diz que a trilha com faixa recomendada é lei; a §4 diz que ela não pode
  ser desenhada até Q2 fechar (porque a faixa não tem fonte — `LESSONS` L21); e o protótipo atual
  tem a trilha desenhada. Um auditor de F2 não sabe se deve reprovar o protótipo por **ter** a
  trilha (Q2) ou por **como** a trilha está (D4). A linha de D4 não aponta para Q2.
- **Correção proposta:** acrescentar à linha de D4 na §2.7: "— **a faixa recomendada depende de Q2
  (§4); enquanto Q2 estiver aberta, a trilha não se desenha e F2 não a audita**".

### #5 · IMPORTANTE · a §2.8 põe regra de layout na camada 1, sem dono na precedência §1

- **Gabarito** `GABARITO_PROTOTIPO.md:142` — §2.8, "O que se adota de lá": "Grade desktop | 12
  colunas, configuração 3, resultado 9 — **2 seções, não 3**"; e `:144` — "Zona 5 | Grade de 4
  colunas para os parâmetros". Isso está dentro da §2, "**Camada 1 — lei mecânica (verificável por
  comando, sem julgamento)**" (l.51), "**F2 audita esta camada inteira**" (l.53).
- **Fonte 1 (design system, dono de "primitivo" na precedência)** `DESIGN_SYSTEM_FENIX.md:13–14` —
  "**não define layout, não define hierarquia de tela, não define onde cada informação mora**". Um
  grep confirma: zero ocorrência de "12 colunas", "grade de 4", "Zona 4/5", "breakpoint" no design
  system.
- **Fonte 2 (brief)** `BRIEF_DESIGN_INTERFACE.md:723` — "Toda decisão de layout … arranjo de áreas,
  zonas de resultado, ordem de leitura … foi descartada" do brief de propósito.
- **Fonte 3 (a própria tabela de precedência)** `GABARITO_PROTOTIPO.md:36–44` — nenhuma das linhas 1
  a 7 é dona de "layout" ou "grade". A única autoridade citada para o grid é o
  `ToolOptimizerCNC/…/DESIGN-SYSTEM.html`, que **não está na tabela de precedência** e que a
  `CLAUDE.md` marca "consulta apenas".
- **Consequência:** é a mistura de natureza que `LESSONS` L29 (l.665) e L30 (l.694) descrevem — a
  camada mecânica recebendo regra sem fonte ranqueada. F2 audita "esta camada inteira" e vai medir o
  protótipo contra um grid de 12 colunas 3/9 que nenhum documento-régua sustenta.
- **Correção proposta:** ou (a) mover "Grade desktop" e "Zona 5" para uma seção nova de camada 2
  (julgamento do Mestre em F3), ou (b) baixá-las para o design system como decisão de layout
  explícita antes de F2 — e nesse caso acrescentar uma linha à precedência §1 dizendo quem é dono de
  layout. A "Forma da Zona 4" já desceu parcialmente (design system §4.6 / D7); as outras duas não.

### #11 · MENOR · "O bloco B da crítica é inteiro camada 2"

- **Gabarito** `GABARITO_PROTOTIPO.md:181` — "O bloco B da crítica de 28/08 é inteiro camada 2."
- **Fonte** `CRITICA_PROTOTIPO_PAINEL_2026-08-28.md:443` — B3 é "T9 (+ **R13**)"; R13 é regra
  inviolável (camada 1). E `HANDOFF.md` §35.1 (l.1654) enquadra a ausência de tablet e a inversão de
  ordem no celular como "**violação direta do `MVP` §2.3**" — mecânico, não julgamento.
- **Consequência:** "inteiro camada 2" pode fazer F3 descartar o núcleo mecânico de B3. (Atenuante:
  os dois sub-itens mecânicos de B3 — tablet ausente, ordem do celular — já foram corrigidos nas
  §44/§45, então o risco prático hoje é baixo.)
- **Correção proposta:** "O bloco B da crítica é camada 2, **com uma exceção: a parte de B3 que
  invoca R13 e o `MVP` §2.3 é camada 1** (e já foi tratada nas §44–§45)".

### #12 · MENOR · `L45` — notação ambígua

- **Gabarito** `GABARITO_PROTOTIPO.md:114` — "O exemplo encenado é o do balanço (`L45`, `L/D` 4,5,
  gatilho 1a como segunda condição)".
- **Fonte** `LESSONS.md` — as lições vão de L1 a L30 (`grep '^## L'`); não há L45. Três linhas acima
  (l.111) o gabarito cita `L21` e `L17` na mesma notação de crase, o que induz a ler `L45` como
  lição.
- **O que `L45` quer dizer:** balanço (L) = 45 mm — consistente com `MVP` §7.6.1 (l.1196: "`L` 45").
- **Correção proposta:** escrever "balanço 45 mm" ou "`L` 45 mm" em vez de "`L45`".

### Precedência §1 — verificação do resto

- D1–D9 rastreiam a decisão do Mestre (nº 1); R/T/C ao brief (nº 4); tokens ao design system (nº 5).
  **Conforme**, salvo os dois pontos onde a §2.8 usa o ToolOptimizer DS como autoridade sem ele
  estar na tabela: raio (#1) e grade/Zona 5 (#5).
- A ordem "decisão do Mestre revoga as de baixo" é respeitada por D9 (revoga D3) e pela §2.8 (Mestre
  mantém os neutros do Fenix contra a paleta do ToolOptimizer, l.150). **Conforme.**

---

## Como reproduzir

Cada achado abre com `arquivo:linha` dos dois lados. Para os que dependem de git:

```bash
git show fbe5ab6:Docs_inicial/construcao/DESIGN_SYSTEM_FENIX.md | sed -n '/## 9\. Checklist/,/^---/p' | grep -c '^- \[ \]'   # 16
sed -n '/## 9\. Checklist/,/^---/p' Docs_inicial/construcao/DESIGN_SYSTEM_FENIX.md | grep -c '^- \[ \]'                      # 21
git diff fbe5ab6 2572db3 -- Docs_inicial/construcao/DESIGN_SYSTEM_FENIX.md                                                   # 5 linhas +- [ ] no §9
grep -nE '12 colunas|Zona 4|Zona 5|breakpoint|grade de 4' Docs_inicial/construcao/DESIGN_SYSTEM_FENIX.md                     # nada
grep -n '^## L[0-9]' Docs_inicial/referencia/LESSONS.md | tail -1                                                            # L30
```

## Veredito

O gabarito é **estruturalmente sólido** — precedência explícita, camada 1 separada da camada 2,
ambiguidades como pergunta ao Mestre. Os 14 achados são quase todos **drift de propagação**: o
trabalho de D6–D9 e da revisão contra o ToolOptimizer (§46–§47) não foi totalmente refletido de
volta na §2.4, na §2.7 e no design system §2.9. Nenhum achado é fabricado; nenhum é tensão de design
(T1–T12) ou critério (C1–C12) vestido de violação.

**Antes de F2, fechar no mínimo:** #1 (raio — produz achado falso), #3 e #4 (D3/D9 e D4/Q2 — o
auditor recebe instruções opostas), #5 (layout na camada 1 — L29). #2 e #6 são rápidos. Os menores
podem entrar num único passe de edição.
