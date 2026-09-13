# Validação — R6 Rigidez, Deflexão e Vida da Ferramenta

**Veredito:** APROVADO COM RESSALVAS
**Retorno auditado:** `RESPOSTA_R6.md` (481 linhas, 16 blocos, 23 referências)
**Data:** 23/08/2026
**Portões aplicados:** G1 a G7. **G8 não se aplica** — R6 rodou com um pesquisador só, por decisão registrada no `HANDOFF.md` §10. Não existe `RESPOSTA_R6_B.md`; a ausência não é falha.

**Limitação de método declarada — leia antes de usar este veredito.** Por instrução desta rodada de auditoria, **nenhuma fonte foi aberta e nenhuma busca foi feita**. O G2 aqui julga *elegibilidade declarada, rastreabilidade interna e coerência aritmética* — não confere o conteúdo da fonte. Isso é mais fraco que o G2 da `VALIDACAO_R5.md`, onde as fontes de peso foram abertas uma a uma. Onde este documento diz "não conferível", significa exatamente isso: não foi verificado, não que esteja errado.

**Referências ao dossiê auditado:** `..\_referencia\DOSSIE_CALCULADORA_PARAMETROS_AUDITADO.md` **não existe mais nesta pasta**. Toda referência de seção do enunciado (§8.1.4, §8.1.6, §8.1.7, §5.16.1) fica registrada como **não conferível**. Nada foi suposto sobre o que o dossiê dizia.

---

## ⚠ No topo: a divergência do módulo de elasticidade — R3 × R6

O `HANDOFF.md` §10 item 3 mandou confrontar isto antes de tudo. Confrontado. **A divergência é real, e é menor e mais específica do que o registro atual sugere.**

### Os dois valores lado a lado

| | **R3** — `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.2 | **R6** — `RESPOSTA_R6.md` Bloco 1 e Tabela A |
|---|---|---|
| **Valor** | **580 GPa**, faixa útil **550–610** | **500 GPa** como *default derivado*; faixas **466,0–516,5** (comercial) e **523–577** (ensaio) |
| **Qualificação** | metal duro de fresa, grão fino, 6–11% de cobalto | WC-Co genérico; **sem** matriz por teor de Co ou granulometria |
| **Confiança declarada** | `REFERÊNCIA ÚNICA` (rebaixado pela auditoria da R3; o retorno propunha `CONSENSO`) | `SEM CONSENSO` para universal; `REFERÊNCIA ÚNICA` para cada faixa |
| **Fonte 1** | modelo de fração volumétrica — **não é medição de 580** | Ratov et al., *J. Composites Science* 2026 — faixa **466,0–516,5** citada como contexto |
| **Fonte 2** | medição de **577** em tamanho de grão **fora** da janela de fresa | Okamoto et al., *Materials Characterization* 2005 — **577** (grão 3–20 µm) e **523** (grão 30 µm) |
| **Fonte 3** | compilação de proveniência primária desconhecida | Kanno et al. — usado só para a tendência por fração de fases, sem tabela |
| **Ponta superior** | **610 GPa é extrapolação não publicada**, declarada como tal pelo próprio pesquisador | — |

### Três fatos que mudam a leitura da divergência

**1. Onde as duas rodadas citam a mesma fonte, elas praticamente coincidem.** A R3 registra "outra mede **577** mas em tamanho de grão fora da janela". A R6 cita Okamoto com **577 GPa**. Contra os 580 da R3, isso é **0,5% de diferença**. O valor de Okamoto é a fonte comum às duas rodadas — e nele não há divergência nenhuma. A divergência de ~16% vem inteira do outro lado: a faixa **466,0–516,5 GPa** de Ratov, que a R3 não tinha.

**2. Nenhuma das duas rodadas apresentou medição em grão fino.** Os dois pontos que a R6 reporta de Okamoto são de grão **3–20 µm** e **30 µm**. A auditoria da R3 já havia classificado essa mesma medição como "fora da janela que se aplica a fresa". As demais pernas da R3 são um modelo e uma compilação; a perna nova da R6 é uma citação de contexto dentro de um artigo sobre outro material. **Somando as duas rodadas, o projeto continua sem uma medição de `E` em metal duro de granulometria de fresa.** Esse é o achado, não o número.

**3. A dispersão combinada estoura a margem do modelo.** `δ ∝ 1/E`, então a razão de deflexões é a razão inversa dos módulos:

| Comparação | Conta | Efeito em `δ` |
|---|---|---|
| Dispersão interna da R3 (550 → 610) | 610/550 | **10,9%** — dentro da margem |
| Dispersão interna da faixa comercial da R6 (466 → 516,5) | 516,5/466 | **10,8%** — dentro da margem |
| Calcular com 500 quando o real for 580 | 580/500 | `δ` **16,0% maior** — erra para o lado conservador |
| Calcular com 580 quando o real for 500 | 500/580 | `δ` **13,8% menor** — erra para o lado que **subestima a flexão** |
| **União das duas rodadas (466 → 610)** | 610/466 | **30,9% — acima da margem declarada de ±15–25%** |

**Consequência direta:** a R6 conclui, olhando só a própria faixa, que o `E` "fica dentro da margem e pode ser fixado". Essa conclusão **não sobrevive** quando a faixa da R3 entra na conta. Enquanto a divergência estiver aberta, `E` **não** pode ser fixado como constante única — e os dois erros não são simétricos em risco: o valor mais alto subestima a deflexão, que é o lado que quebra ferramenta.

**Não escolho o vencedor.** Quem escrever `CANONICO_DEFLEXAO_E_VIDA.md` decide, com estes três fatos na mão. Registro só o que a evidência sustenta: as duas rodadas concordam na fonte que compartilham, divergem numa fonte que só uma tem, e nenhuma das duas mediu grão de fresa.

**Nota sobre o registro existente:** `mvp/MVP_CALCULADORA_PARAMETROS.md` §12 já registra a divergência como "580 GPa contra 466–516". Está incompleto — omite o trecho **523–577** da R6, que é justamente o que quase coincide com a R3. Corrigir ao reconciliar.

**Dúvida genuína, não acusação:** ao descrever a fonte [1], o retorno menciona uma redução de "`EIT`" com adição de zircônia. `EIT` é módulo por indentação instrumentada. O retorno **não declara** se a faixa 466,0–516,5 GPa é `EIT` ou módulo de flexão macroscópico. Se for `EIT`, a comparabilidade com o `E` que entra na viga engastada precisa ser verificada antes de a faixa entrar no canônico. Não foi possível conferir — a fonte não foi aberta.

---

## Resumo

O retorno responde **29 de 29 subitens**, com aritmética correta em **todas** as sensibilidades conferidas, e entrega as três tabelas de fechamento, a cadeia de cálculo e 11 lacunas nomeadas com o que falta para fechar cada uma. É um retorno disciplinado: recusa-se a preencher célula vazia, declara quando um valor é derivado e não publicado, e separa dedução matemática de resultado experimental.

O que **não** entrega: as constantes. Das quatro travas da Questão 1, uma fecha (`De/D = 0,8`, domínio limitado); a Questão 2 devolve `NÃO ENCONTRADO` para todas as seis classes de ferramenta; a Questão 3 devolve `NÃO ENCONTRADO` para todos os fatores de refrigeração. Isso é lacuna declarada, não falha de método — mas significa que **a função de deflexão e a de vida continuam travadas**.

O que impede o canônico: o `E`. Um número-base sem fonte (`500 GPa`) e a divergência de 30,9% contra a R3. Nada mais no retorno bloqueia.

---

## Achados por portão

| Portão | Selo | Achado | O que fazer |
|---|---|---|---|
| **G1 Cobertura** | `OK` | **29/29 subitens respondidos** (Q1a 3 pedidos · Q1b 5 · Q1c 4 · Q1d 5 · Q1e 1 · Q2 6 · Q3 5). Nada pulado, nada desviado. Onde o enunciado pedia **recomendação com critério** (1b4, 1c3, 1d5, 2e, 2f, 3b), veio escolha, não menu — inclusive o texto de tela pronto em 2f. Onde pedia **confirmar ordem de grandeza** (1b5, 2c), veio a conta e o resultado. Formato cumprido: Veredito + Confiança em 16/16 blocos, Tabelas A, B e C presentes, cadeia de cálculo entregue. | Três ressalvas pontuais abaixo. Nenhuma anula um subitem. |
| **G2 Fonte** | `RESSALVA` + **1 `BLOQUEIA`** | **Um único número em todo o retorno entra sem fonte: `E = 500 GPa`** — e o próprio retorno declara que ele não é grau publicado. Todos os demais têm procedência declarada: `466,0–516,5` [1], `523/577` [3], `0,8` [4] com DOI, `0,33` [10], `15/>20 µm` [15], `70/80/150 bar` [11], `40/110 bar` [12]. As deduções geométricas (`12,96%`, `7,716`, `+72,8%`) são declaradas como dedução, não como ensaio — tratamento correto. **Três furos de rastreabilidade e elegibilidade** abaixo. | Ver "Itens que BLOQUEIAM". Corrigir a marcação de referência do Bloco 3 antes de citar qualquer coisa dele. |
| **G3 Confiança** | `RESSALVA` | **Nenhuma inflação em constante.** Nenhum `CONSENSO` é aplicado a um número — o critério de REPROVADO por `CONSENSO` falso **não é acionado**. Rótulo por linha na Tabela A, não por tabela (obrigação 2 do `LEIA-ME.md`). **Mas o vocabulário foi esticado:** `CONSENSO qualitativo` (Blocos 3, 7, 10), `CONSENSO matemático` (Blocos 8, 11) e `CONSENSO conceitual` (Bloco 15) usam um rótulo de dado para proposições e identidades algébricas. Uma conta não tem consenso de fontes. | Não transportar os rótulos qualificados para o canônico. Onde a afirmação é matemática, ela se sustenta pela conta, sem rótulo. |
| **G4 Default** | `RESSALVA` | **O comportamento geral é o oposto do defeito que este portão caça** — o retorno deixa a maioria das células vazias em vez de preenchê-las. Duas assinaturas mesmo assim: (1) **`500` exato** — o número redondo é literalmente o exemplo do portão, e é base de fórmula; salva-se de ser invenção por estar declarado como derivado; (2) **`207 GPa` idêntico para M2 e M42**, dois graus distintos, mesma fonte — o retorno não declara se a fonte mede por grau ou repete o valor de família. `0,8` é redondo mas é resultado publicado de estudo, com domínio declarado — não é sinal de default. | (1) vira o BLOQUEIA #1. (2) já está na Tabela C como lacuna; manter lá, não promover a constante. |
| **G5 Sensibilidade** | `OK` | **R6 não exige a classificação `MODELAR`/`DEFAULT`/`IGNORAR`** — a regra 5 do enunciado pede o número e a frase "pode ser fixada se ficar abaixo de ±15–25%". Cumprido em **8 de 9** constantes, e **toda conta que refiz bateu**: `E` −6,8%/+3,3%/+4,6%/+15,4% ✓ · `De=D` subestima 59,0% e `0,8D` é +144,1% ✓ · haste Ø10→Ø6 = 12,96% de rigidez, `δ` ×7,716 ✓ · `L` +20% → +72,8% ✓ · Taylor `n` 0,125/0,25/0,33/0,4/0,5/0,6 → 23,26/48,23/57,55/63,39/69,44/73,80% ✓ · razão entre as duas vidas 2,07 ✓ · HSS 207/500 → 58,6% ✓. O retorno diz explicitamente onde a dispersão cabe na margem (`E`) e onde estoura (`De/D`, `n`). Só a viga escalonada fica sem número — declarado, com o motivo (faltam os comprimentos dos trechos). | Nada. É o portão mais bem cumprido da rodada. **Mas ver a incoerência de `E` no BLOQUEIA #2** — a conclusão "pode ser fixada" foi tirada olhando só a faixa da própria rodada. |
| **G6 Divergência** | **`BLOQUEIA`** | **Quatro divergências com material já registrado, uma delas trava a escrita do canônico** (o `E`, no topo deste documento). Duas divergências de convenção contra `CANONICO_LIMITES_E_ALERTAS.md` §1.4, e **uma pergunta que a R6 declarou `NÃO ENCONTRADO` e que a R5 já tinha respondido com `CONSENSO`**. Registro também uma convergência que vale guardar. | Ver "Divergências com material já registrado". A primeira vai ao Mestre antes do canônico. |
| **G7 Lacunas** | `OK` | **11 lacunas numeradas + Tabela C com 13 linhas**, cada uma com o que faltou **e** a fonte que teria o dado: ficha técnica do grau, texto integral da norma paga, dinamômetro, FRF, DOE por diâmetro/material/pressão. Inclui as desconfortáveis — o `E` por grau, o próprio `n` de Taylor que a rodada existia para fechar, o `Tref`. Nenhuma lacuna foi silenciada com número: cruzei a Tabela C contra as Tabelas A e B e **não há item declarado como lacuna que reapareça preenchido**. | Nada. Este portão passa limpo. As 11 lacunas vão inteiras para a §4 do canônico. |
| **G8 Cross-check A×B** | `NÃO SE APLICA` | Pesquisador único, por decisão registrada no `HANDOFF.md` §10. Sem `RESPOSTA_R6_B.md`. | Nada. Ver a nota de compensação abaixo. |

### Nota de compensação pela ausência do par cego

O protocolo (`00_INDICE_E_PROTOCOLO.md`) prevê: *"Se a validação apontar número sem fonte, dispara-se um segundo território apenas para os itens bloqueados."* **Há exatamente um item nessa condição: o `E` do metal duro.** E ele já tem duas apurações independentes — R3 e R6 — que divergem. Um terceiro território só se justifica se for capaz de trazer o que falta às duas: **medição de `E` em metal duro de grão fino, com teor de Co identificado**. Repetir busca aberta produziria uma terceira leitura das mesmas três fontes.

### As três ressalvas de cobertura (G1)

1. **1b4 — o erro da viga simples contra a escalonada não foi quantificado.** O enunciado pedia decisão explícita: *"Se o erro ficar dentro de ±15–25%, a simplificação se justifica e a resposta é 'viga simples' — diga isso explicitamente."* O retorno **escolhe** (viga escalonada é o modelo correto; simples só como aproximação sinalizada) mas sem o número, alegando que faltam os comprimentos de cada trecho. A alegação é válida — sem `L_haste` e `L_corte` não há valor único. **Mas há uma assimetria de método:** o retorno deduziu sozinho `(10/6)⁴ = 7,716` e `1,2³ = 1,728` a partir da própria fórmula, e se recusou a fazer a mesma classe de dedução aqui. A família de curvas era derivável.
2. **1d1 — as pistas do próprio enunciado não foram confrontadas.** O enunciado entregou achados preliminares concretos (CNCCookbook 0,001″ para fresa de ½″ *citando recomendação de fabricante*; matrizaria 0,05–0,10 mm; molde abaixo de 0,04; precisão 0,005–0,013; degradação acima de 0,02 mm). O retorno responde `NÃO ENCONTRADO` para limite de fabricante **sem mencionar nenhuma delas** — nem para confirmar, nem para derrubar. A pista do CNCCookbook era o fio direto para a pergunta 1d1.
3. **1e — a cadeia tem `Vc`, `fz`, `D`, `Z`, `L` e `E`, mas `ae` e `ap` não aparecem em nenhuma linha.** Eles ficam dentro dos passos 3 e 4 ("determinar o arco de engajamento", "obter `Ft` por coeficientes de força"), que são placeholders, não fórmulas. Isso é **legítimo por desenho** — o enunciado declara que R6 consome de R2 a força do Kienzle — e o retorno cumpre a alternativa prevista ("declarar qual trava permanece aberta e o que ela impede"). Registro para que quem escrever o canônico saiba que a cadeia só fecha depois do `CANONICO_MOTOR_DE_CALCULO.md`.

### Os três furos de fonte (G2)

1. **Marcação de referência trocada no Bloco 3 — e é o bloco da trava `Fr/Fc`.** O corpo atribui a **Dépincé e Hascoët** as marcas `[5] [6]`, e a seção "Fontes" repete: *"As fontes principais são Dépincé e Hascoët [5]"*. Na lista de referências, **[5] é Kivanc e Budak**; Dépincé e Hascoët é **[16]**. A mesma marca `[5]` aponta para Kivanc e Budak nos Blocos 2 e 4 e na Tabela A. O Bloco 4 repete o defeito ao marcar `[5] [16]` numa frase sobre a revisão da ASME, que é `[17]`. **Não vira BLOQUEIA porque nenhum número se apoia nessas citações** — a conclusão do Bloco 3 é `NÃO ENCONTRADO`. Se houvesse número, seria.
2. **A referência [14] não é conferível como citada.** Ela declara *"Hudson Tool Steel — M42 Super High Speed Steel"* mas o endereço aponta para **`/technical-data/steelM4`** — M4 e M42 são graus diferentes. Como as fontes não foram abertas, não sei qual dos dois está certo; sei que o rótulo e o localizador não fecham. É a fonte de **ambos** os valores de HSS.
3. **Elegibilidade de [14].** Hudson Tool Steel é distribuidor de aço-ferramenta — não é catálogo de fabricante de ferramenta de corte, handbook, norma nem artigo revisado. O retorno **declara isso por conta própria** ("nível 4", "fora do nível 1–3", "não deve ser generalizada") e coloca o item na Tabela C. Tratamento correto; a ressalva fica para que o canônico não promova `207 GPa` a constante.

### Ressalva de forma (menor, sem efeito técnico)

O enunciado, via protocolo, pedia **nível de fonte declarado (1 norma · 2 handbook · 3 artigo revisado · 4 catálogo) em cada achado**. O retorno declara nível em **2 de 23 referências** — apenas as duas linhas de HSS, ambas "nível 4". As 21 restantes ficam sem classificação, embora a maioria seja identificável pelo próprio texto (ISO, artigo com DOI, página de fabricante). Isso confirma a ressalva já antecipada no `HANDOFF.md` §10.

No mesmo registro: o Bloco 1 (módulo de elasticidade) contém uma citação em bloco de **Kops e Vo sobre diâmetro equivalente**, que é assunto do Bloco 2. Montagem descuidada, sem consequência técnica.

---

## Confronto A × B

**Não se aplica.** R6 rodou com pesquisador único. Sem `RESPOSTA_R6_B.md`, não há tabela de confronto. A ausência é decisão registrada, não falha da rodada.

---

## Itens que BLOQUEIAM

**Dois — e os dois são o mesmo símbolo, `E`.**

### BLOQUEIA #1 — `E = 500 GPa` entra na Tabela A como valor recomendado, sem fonte

**Onde aparece:** Resumo executivo · Bloco 1 (Veredito, Valor ou regra, Sensibilidade) · **Tabela A, primeira linha** · seção "Implementação recomendada".

**Por quê:** é número-base — entra direto no denominador de `δ = FL³/3EI` — e não tem fonte. O próprio retorno escreve: *"Esse valor **não é apresentado como um grau específico por uma fonte**; ele é uma escolha derivada do intervalo comercial aberto de 466,0–516,5 GPa."* Arredondar o meio de uma faixa não produz procedência. É exatamente a assinatura que o G4 nomeia — o número redondo em grandeza medida.

**O que salva a rodada de ser reprovada por isto:** o número vem **etiquetado**. O retorno o chama de *default derivado*, manda a interface rotulá-lo assim, proíbe apresentá-lo como "módulo do metal duro" sem qualificação, e coloca a lacuna correspondente na Tabela C. É a mesma distinção que a `VALIDACAO_R5.md` aplicou ao aceitar `rβ = 10 µm` declarado como estimativa e ao bloquear dois números que entraram *sem declaração*. Número declarado não é número disfarçado.

**O que fazer:** o `500` **não entra na §2 do canônico**. Entram as faixas, que têm fonte. O ponto único, se o Mestre quiser um, é decisão de produto com data — §3 do canônico, não §2.

### BLOQUEIA #2 — a divergência R3 × R6 impede escrever `CANONICO_DEFLEXAO_E_VIDA.md`

**Onde aparece:** `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.2 (580, faixa 550–610) contra `RESPOSTA_R6.md` Bloco 1 (466–516,5 e 523–577, default 500).

**Por quê:** a união das duas faixas produz **30,9% de dispersão em `δ`**, acima da margem declarada de ±15–25%. Enquanto isso estiver aberto, não existe valor de `E` que possa ser escrito como constante de canônico. E a conclusão de sensibilidade da própria R6 — *"o default derivado fica dentro da margem de erro declarada"* — **é incoerente com o quadro completo**: ela foi tirada olhando só a faixa da própria rodada, sem o 580 da R3, que o enunciado omitiu de propósito.

**O que fazer:** decisão do Mestre, com os três fatos do topo deste documento na mão. Não decido, e não faço média — média entre 500 e 580 produziria um terceiro número sem fonte nenhuma, que é o defeito que este projeto existe para eliminar. As saídas possíveis são: adotar a faixa larga e declará-la, adotar um dos dois com motivo escrito, ou manter como lacuna e exibir `δ` como faixa.

---

## Divergências com material já registrado

### D-1 — Módulo de elasticidade · **grave** · ver o topo deste documento

`CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.2: **580 GPa**, faixa 550–610, `REFERÊNCIA ÚNICA`.
`RESPOSTA_R6.md` Bloco 1: **466,0–516,5** (Ratov) e **523–577** (Okamoto), default derivado **500**.
Fonte comum às duas rodadas: **Okamoto/577 × 580 da R3 = 0,5% de diferença.** A divergência de ~16% vem inteira da faixa de Ratov, que só a R6 tem. Nenhuma das duas rodadas apresentou medição em grão fino.

### D-2 — Qual seção resiste à flexão · **precisa de decisão antes do canônico**

`CANONICO_LIMITES_E_ALERTAS.md` §1.4 lista como entrada da deflexão o **"diâmetro da haste"**.
`RESPOSTA_R6.md` Bloco 2 e Tabela A recomendam **`De = 0,8 × D`** — diâmetro efetivo da **parte cortante canalizada**, de Kops e Vo, domínio de 2 e 4 canais.

São seções diferentes da mesma ferramenta. Efeito quantificado pelo próprio retorno: usar o diâmetro cheio onde vale `0,8D` **subestima a deflexão em 59,0%**. Numa fresa de haste cilíndrica reta os dois diâmetros coincidem numericamente, e a divergência é só de convenção; numa fresa de haste rebaixada ou de pescoço, são valores distintos e a escolha muda o resultado.

### D-3 — A força radial: entrada disponível × trava aberta

`CANONICO_LIMITES_E_ALERTAS.md` §1.4 lista como entrada **"força radial (já calculada)"**, tratando-a como grandeza disponível.
`RESPOSTA_R6.md` Bloco 3 e Tabela A: **`Fr/Fc` é `NÃO ENCONTRADO`** — não há razão publicada que converta a força tangencial do Kienzle em radial, e o retorno recusa explicitamente a simplificação `0,3–0,5` que o enunciado ofereceu.

O canônico de limites assume pronto o que a R6 declara travado. A regra de deflexão contra tolerância, como está escrita hoje, **não é executável**.

### D-4 — A R6 declarou `NÃO ENCONTRADO` o que a R5 já tinha respondido com `CONSENSO`

**Questão 3a** da R6 pergunta quanto a refrigeração interna estende a profundidade de furo sem pica-pau. Resposta da R6: *"não foi encontrado fator publicado que permita substituir `L/D > 3`"* — `NÃO ENCONTRADO`.

`CANONICO_LIMITES_E_ALERTAS.md` §1.4 já registra, de R5: broca **sem** canal interno acima de **3 × D** → pica-pau; broca **com** canal interno → **não avisar até 30 × D**. O `MVP_CALCULADORA_PARAMETROS.md` marca esse par como **`CONSENSO` — três fabricantes independentes**.

A R6 não podia enxergar isso — rodadas são isoladas por desenho. **É exatamente para isto que o G6 existe.** A Questão 3a não é lacuna do projeto: ela está fechada, com confiança melhor do que a R6 alcançaria. O que a R6 acrescenta é a distinção `coolant_path` × `pressure_bar` × `flow_lpm` (Bloco 15), que o registro atual não tem.

### Convergência que vale guardar

**A política de limite de deflexão bate exatamente com o que já está escrito.** `CANONICO_LIMITES_E_ALERTAS.md` §1.4 trata deflexão como **ALERTA contra a tolerância informada**, virando limite físico só quando a tolerância é violada em mais de 2×. A R6, sem conhecer esse texto, chega à mesma política pela evidência: não fixar `0,05 mm`, comparar `δ/tol` quando houver tolerância, e **exibir `δ` sem julgamento** quando não houver. Duas rodadas independentes na mesma conclusão de produto. O `δ ≤ 0,05 mm` sem fonte cai por consenso interno.

### Observações contra o `HANDOFF.md` §9 e o MVP — nenhuma é contradição

- **D1 ("fresa de aço rápido é obsoleta").** O retorno traz `E` de HSS e HSS-Co, mas o enunciado pediu isso explicitamente *"para quando a furação entrar no escopo"* — que é onde D1 diz que o HSS sobrevive. **Sem conflito.**
- **D2 ("substrato de metal duro é commodity").** O achado quantitativo **sustenta D2**: dentro da faixa da própria R6, a dispersão de `E` produz −6,8% a +15,4% em `δ`, dentro da margem do modelo. Já a recomendação de produto do retorno ("solicitar o grau real sempre que disponível", ficha técnica por grau na Tabela C) **puxa na direção oposta**. Vale notar que a conclusão de "pode fixar" não sobrevive quando a faixa da R3 entra — ver BLOQUEIA #2.
- **Premissa embutida no enunciado, já superada.** O enunciado da R6 afirma: *"O bloqueio por `L/D` continuaria existindo como rede de segurança independente."* O MVP §0.3 (divergência 3) e `CANONICO_LIMITES_E_ALERTAS.md` §3 já decidiram o contrário — **balanço avisa, não bloqueia**, porque os limiares proibiam produto de catálogo. O retorno não depende dessa premissa; registro só para que ela não seja transportada para o canônico junto com o resto.

---

## O que entra no canônico como lacuna declarada

As **11 lacunas** do retorno passam íntegras para a §4 de `CANONICO_DEFLEXAO_E_VIDA.md`. Consolidadas, com o que fecha cada uma:

| # | Lacuna | O que seria preciso |
|---|---|---|
| 1 | `E` do metal duro por teor de Co e granulometria — **e a divergência R3 × R6** | medição em grão fino com composição declarada; ficha técnica do grau ou texto integral dos artigos |
| 2 | `E` da linha HSS/HSS-Co além de M2 e M42 | handbook ou norma; a fonte atual é distribuidor de matéria-prima, nível 4, com localizador que não fecha |
| 3 | `De/D` para 3, 5, 6+ canais e por família de geometria | ensaio de compliance ou modelo estrutural com a seção real |
| 4 | Efeito da profundidade do canal — não há `De(z)` | geometria CAD ou seção transversal medida |
| 5 | Erro da viga simples contra a escalonada | comprimentos de cada trecho, `I(z)`, validação por FE ou ensaio |
| 6 | **`Fr/Fc` — a trava que impede a função inteira** | coeficientes de força por par ferramenta–material, dinamômetro ou calibração |
| 7 | Limite de deflexão aceitável — não existe absoluto publicado | tolerância da peça; o limite é relativo por natureza, e essa conclusão é firme |
| 8 | Relação entre deflexão estática e início de chatter | FRF, rigidez e amortecimento da montagem, modelo regenerativo |
| 9 | **Matriz de `n` de Taylor por ferramenta × peça** — as seis classes voltaram vazias | curvas de vida com grau, revestimento, peça, geometria e critério de desgaste |
| 10 | `Tref` — 15 ou 30 min não confirmados como convenção | texto integral da ISO 3685 / ISO 8688 (norma paga) ou declaração por linha de catálogo |
| 11 | Fatores de refrigeração: profundidade sem peck, ganho de `Vc`/`fz`, matriz por tipo de fluido | catálogo específico ou DOE por diâmetro, material, pressão e vazão — **exceto o limiar de 30×D, que R5 já fechou** (ver D-4) |

**Três lacunas adicionais que este veredito acrescenta**, e que o retorno não podia ver:

12. **Se a faixa 466,0–516,5 GPa é `EIT` (indentação) ou módulo de flexão** — o retorno não declara, e a comparabilidade com o `E` da viga engastada depende disso.
13. **A convenção de seção resistente** — diâmetro da haste ou `De = 0,8 × D` da parte cortante (D-2). É decisão, não pesquisa.
14. **Referências ao dossiê auditado (§8.1.4, §8.1.6, §8.1.7, §5.16.1) são não conferíveis** — o arquivo não existe mais em `_referencia/`. Nada foi suposto sobre o conteúdo delas.

---

## Por que APROVADO COM RESSALVAS e não REPROVADO

O critério de REPROVADO do manual é *"questão central sem resposta, número-base sem fonte, ou `CONSENSO` falso em constante que vira fórmula"*. Registro a tensão em vez de escondê-la, porque o `500 GPa` toca o segundo item:

- **`CONSENSO` falso:** não ocorre. Nenhum rótulo de consenso foi aplicado a número nenhum.
- **Questão central sem resposta:** não ocorre. 29 de 29 subitens respondidos. As Questões 2 e 3 voltam com `NÃO ENCONTRADO` **fundamentado e nomeado** — que é resultado válido pela regra 6 do próprio enunciado e pelo G7. Reprovar um retorno por não achar o que não está na fonte aberta seria fabricar defeito.
- **Número-base sem fonte:** ocorre uma vez, no `500 GPa`. **Mas vem declarado**, com instrução explícita de não usá-lo como grau publicado e com a lacuna correspondente registrada. É a mesma distinção que a `VALIDACAO_R5.md` já aplicou. E ele **não precisa entrar no canônico**: as faixas que o originaram têm fonte, e o ponto único é decisão de produto.

Barrar um item e liberar o resto é o que `APROVADO COM RESSALVAS` significa. O canônico de deflexão fica bloqueado — mas por **D-1**, que é uma divergência entre duas rodadas, não por defeito deste retorno.

---

## O que este veredito libera e o que não libera

**Libera para o canônico, com fonte:**
- `De/D = 0,8` — Kops e Vo, CIRP Annals 1990, com DOI — **domínio declarado: 2 e 4 canais**, nunca extrapolado
- A política de limite de deflexão relativo à tolerância, com exibição sem julgamento quando não houver tolerância — **e ela converge com o que já está escrito**
- A confirmação de que haste rebaixada Ø10→Ø6 deixa **12,96%** da rigidez (`δ` ×7,716) — dedução geométrica, declarada como tal
- As contas de Taylor: **48,2%** e **23,3%** de vida para +20% de `Vc` com `n` = 0,25 e 0,125 — matemática correta, **expoentes não confirmados**
- A separação `coolant_path` / `pressure_bar` / `flow_lpm` / `coolant_medium` / `tool_compatibility` — e a decisão de **não alterar `Vc`, `fz`, `ap` nem `ae`** ao marcar refrigeração interna
- Alta pressão como categoria distinta: **70/80 bar** usual, até **150 bar** — Sandvik Coromant

**Não libera:**
- `E` como constante única — BLOQUEIA #1 e #2
- Qualquer `n` de Taylor como valor de tabela — as seis classes voltaram `NÃO ENCONTRADO`; `0,25` e `0,125` permanecem sem fonte e **não devem ser silenciosamente mantidos**
- `Fr/Fc` como número — sem ele a função de deflexão **não produz µm auditável**
- `207 GPa` como constante de HSS — fica na lacuna 2
- Qualquer multiplicador de parâmetro por refrigeração interna

**Recomendação de sequência:** decidir D-1 e D-2 com o Mestre → escrever `CANONICO_MOTOR_DE_CALCULO.md` (de onde sai `Ft`) → só então `CANONICO_DEFLEXAO_E_VIDA.md`. Escrever o canônico de deflexão antes de R2 fechar produziria um documento cuja fórmula central não roda.

---

**Um retorno bom existe, e este é um.** A rodada não entregou as constantes que o projeto queria — mas entregou a informação de que elas não estão publicadas no território aberto, com o nome de quem as teria. Num projeto cuja regra é *No Invention*, esse é o segundo melhor resultado possível, e é claramente melhor que o primeiro obtido por invenção.
