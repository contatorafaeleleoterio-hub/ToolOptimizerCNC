# R2 — Motor de Cálculo: cavaco, força e potência

**Vira o canônico:** `CANONICO_MOTOR_DE_CALCULO.md`
**Responde:** qual fórmula de afinamento de cavaco usar · qual espessura entra na equação de Kienzle · constantes de força específica por material
**Dependências:** nenhuma para rodar. Alimenta R6.
**Vale rodar em dois agentes** — é dado numérico de catálogo, onde modelo alucina com confiança.
**Salve o retorno como:** `RESPOSTA_R2.md`

---

═══════════════════════════════════════════════════════════════════

# MISSÃO

Você vai validar a **cadeia de cálculo** de uma calculadora de parâmetros de corte para fresamento CNC: da correção de espessura de cavaco até a potência exigida da máquina. Há duas fórmulas concorrentes em uso para o mesmo efeito e uma equação implementada pela metade. Sua tarefa é dizer o que a literatura técnica e os catálogos de fabricante sustentam.

## Contexto do produto

- **Usuário:** operador e programador de CNC em oficina brasileira de usinagem e ferramentaria. Não é engenheiro de processos.
- **Escopo:** fresamento com **fresa inteiriça de metal duro** — topo reto, toroidal e esférica.
- **Materiais:** aços carbono (1020, 1045), inox 304, alumínio 6061-T6, aços para molde (P20, 2711, 8620, H13), com expansão prevista para ferro fundido e titânio.
- **Postura:** o sistema **recomenda**, o operador **decide**. Todo número é auditável — o operador abre e vê fórmula, valores substituídos e fonte.
- **Margem de erro declarada do modelo:** ±15–25% (modelo 2D, corte ortogonal, sem temperatura).

**A cadeia implementada hoje**, na ordem:

```
1. n   = (Vc × 1000) / (π × D)                     rotação
2. CTF = correção de afinamento de cavaco          ← QUESTÃO 1
3. Vf  = fz_efetivo × Z × n                        avanço da mesa
4. Q   = (ap × ae × Vf) / 1000                     taxa de remoção, cm³/min
5. Pc  = (Q × kc) / 60000                          potência de corte, kW
6. Pm  = Pc / η          (η = 0,85)                potência do motor
7. Mc  = (Pc × 9549) / n                           torque, Nm
```

O passo 5 usa `kc = kc1.1` **constante** — ou seja, a equação de Kienzle está pela metade (ver Questão 2).

## REGRAS DE RESPOSTA — obrigatórias

1. **Não invente número para preencher lacuna.** Sem consenso, entregue a **faixa** e a dispersão entre fontes.
2. **Prefira o critério à constante.** Onde o valor depende de outra grandeza, entregue **a regra que o gera**.
3. **Cada número precisa de fonte citável** — fabricante (Sandvik Coromant, Kennametal, Iscar, Seco, Walter, Mitsubishi), handbook (Machinery's Handbook, ASM Handbook Vol. 16, Diniz/Marcondes/Coppini — *Tecnologia da Usinagem dos Metais*, König/Klocke — *Fertigungsverfahren*), norma (ISO, DIN 6584, ISO 3685) ou artigo revisado por pares.
4. **Etiquete a confiança:** `CONSENSO` · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` · `NÃO ENCONTRADO`.
5. **Refine antes de desistir:** busque o conceito subjacente, tente o termo em alemão para Kienzle (`spezifische Schnittkraft`, `Hauptwert kc1.1`), procure a origem em fabricante específico.
6. **Diga quando o valor implementado estiver errado**, com a consequência física quantificada.
7. **Mostre a derivação quando houver.** Onde duas fórmulas parecem concorrentes, demonstre se uma é aproximação da outra em vez de apenas afirmar.
8. **Quantifique a sensibilidade.** Diga **quanto** cada escolha muda o resultado final, em porcentagem.

---

# QUESTÃO 1 — Fórmula de afinamento de cavaco (*chip thinning*): qual das duas usar

Duas fórmulas para o mesmo efeito coexistem na documentação do sistema. O código usa a segunda.

| Nome | Fórmula | Em `ae/D = 0,20` |
|---|---|---|
| Fator exato / *radial chip thinning factor* | `CTF = 1 / √[1 − (1 − 2·ae/D)²]` | **1,41×** |
| Aproximação de Woxén | `fz_efetivo = fz / √(ae/D)` | **2,24×** |

A diferença de 58% no avanço programado não é acadêmica: erra para o lado de sobrecarregar a ferramenta.

**Responda:**

**a)** Qual das duas os fabricantes publicam nas suas calculadoras e manuais? Cite fonte primária de pelo menos dois fabricantes.

**b)** As duas são a mesma coisa? Uma é aproximação da outra? **Derive ou explique a relação matemática** entre elas — não apenas afirme.

**c) Faixa de validade.** Entregue uma tabela comparando as duas em `ae/D` = 0,50 · 0,40 · 0,30 · 0,25 · 0,20 · 0,10 · 0,05 · 0,02, com o **erro relativo** em cada ponto. A partir de que `ae/D` a aproximação diverge o suficiente para causar erro de processo?

**d)** O erro da aproximação vai para o lado **seguro ou perigoso**? Isto é: ela superestima ou subestima o avanço que deveria ser programado? Qual a consequência prática de cada caso — ferramenta esfregando ou ferramenta sobrecarregada?

**e)** Existe formulação mais correta que ambas — considerando o **ângulo de posição (`κ`)** da ferramenta, ou o **diâmetro efetivo** em fresa esférica e toroidal (onde a profundidade rasa faz apenas uma calota cortar)? Se existir, vale a complexidade adicional numa calculadora de oficina, ou o ganho fica dentro da margem de ±15–25% do modelo?

**f)** O sistema aplica a correção apenas quando `ae < 50% D`. Esse é o gatilho correto? Alguns fabricantes citam 25% como início prático do efeito. Qual o limiar defensável?

**Entregue ao final:** qual fórmula implementar, a faixa de validade declarada, e se cabe aviso ao operador fora dela.

---

# QUESTÃO 2 — Espessura de cavaco `h` na equação de Kienzle: qual valor entra

O sistema calcula potência com força específica de corte **constante** (`kc = kc1.1`), o que é sabidamente incorreto — a equação de Kienzle diz que `kc` cresce quando o cavaco afina:

```
kc = kc1.1 · h^(−mc)
```

Ao implementar isso, uma decisão é obrigatória e não está documentada em lugar nenhum do projeto: **qual `h` entra na equação**.

**Responda:**

**a)** Em fresamento, a equação de Kienzle deve usar a **espessura média de cavaco (`hm`)** ou a **espessura máxima (`hex`)**? Qual das duas os fabricantes usam ao publicar cálculo de potência de fresamento? Existe divergência entre fabricantes nisso?

**b)** Qual é a fórmula de `hm` em fresamento periférico, em função de `fz`, `ae`, `D` e do ângulo de posição `κ`? Entregue a fórmula completa.

**c) A pergunta que evita erro grave:** a fórmula de `hm` **já embute** o efeito de afinamento de cavaco por engajamento radial. Se o sistema aplica a correção CTF da Questão 1 **e** calcula `kc` com `hm`, ele está contando o mesmo efeito duas vezes? Explique onde cada um atua e como evitar a contagem dupla.

**d)** Qual é a **ordem correta** na cadeia: o `fz` já corrigido pelo CTF alimenta o `h` do Kienzle, ou o `h` sai do `fz` nominal? Escreva a cadeia completa, passo a passo, de `fz` até `Pc`, sem contagem dupla.

**e) Magnitude do erro atual.** Confirme ou corrija esta estimativa: aço 1045 com `kc1.1 = 2165 N/mm²` e `mc = 0,155`, com `h = 0,1 mm`, dá `kc = 2165 × 0,1^(−0,155) ≈ 3096 N/mm²` — **43% acima** do valor usado hoje, o que significa que o sistema **subestima** a potência exigida da máquina na faixa de trabalho mais comum. A conta está certa? A conclusão está certa?

**f)** Existe **piso para `h`** abaixo do qual a equação de Kienzle deixa de valer? O expoente faz `kc` explodir quando `h → 0`, o que é fisicamente implausível. Como os fabricantes e a literatura tratam esse limite? Existe valor de corte publicado?

**g)** O modelo de Kienzle publicado às vezes traz correções adicionais — para desgaste da ferramenta, ângulo de saída, velocidade de corte. Elas são relevantes na margem de ±15–25% deste sistema, ou são refinamento abaixo do ruído?

**Entregue ao final:** a cadeia de cálculo correta, escrita passo a passo, com a definição explícita de qual `h` entra e por quê.

---

# QUESTÃO 3 — Constantes de Kienzle por material

O sistema usa esta tabela. Os 3 primeiros são declarados validados contra Diniz/Marcondes/Coppini; os demais são estimativa.

| Material | ISO | Dureza | `kc1.1` (N/mm²) | `mc` | Status |
|---|---|---|---|---|---|
| Aço 1020 | P | 120–160 HB | 1800 | 0,17 | validado |
| Aço 1045 | P | 170–220 HB | 2165 | 0,155 | validado |
| Inox 304 | M | 140–180 HB | 2150 | 0,185 | validado |
| Alumínio 6061-T6 | N | ~95 HB | **750 ou 1200 — divergência interna** | **0,23 ou 0,75 — divergência interna** | estimado |
| P20 | P | 280–320 HB | 2300 | 0,20 | estimado |
| 2711 | P | 300–340 HB | 2500 | 0,20 | estimado |
| 8620 núcleo | P | 180–220 HB | 2100 | 0,20 | estimado |
| 8620 cementado | H | 58–62 HRC | 2800 | 0,20 | estimado |
| H13 | H | 45–52 HRC | 2800 | 0,20 | estimado |

**Responda:**

**a) A divergência do alumínio.** Duas versões coexistem no mesmo projeto: `kc1.1 = 750` com `mc = 0,23` (código em produção) e `kc1.1 = 1200` com `mc = 0,75` (documento técnico e contrato de domínio). Qual está certo? **O `mc = 0,75` chama atenção** — os outros oito materiais ficam entre 0,155 e 0,23, e `mc` alto significa `kc` crescendo muito rápido com o afinamento do cavaco. Isso é fisicamente plausível para alumínio ou é erro de transcrição? Qual a faixa típica de `mc` para ligas de alumínio?

**b) Os seis "estimados".** Note que cinco deles têm `mc = 0,20` exato — valor redondo repetido, que é assinatura de preenchimento por default, não de dado medido. Entregue os valores publicados para P20, 2711 (ou equivalente DIN/AISI), 8620 em núcleo e cementado, e H13 tratado. Onde não houver dado direto, diga qual material equivalente pode ser usado como *proxy* e qual o erro esperado.

**c) Expansão da base.** Entregue, com fonte, `kc1.1` e `mc` para: ferro fundido cinzento GG25, ferro fundido nodular GGG50 e Ti-6Al-4V. São os três grupos ISO (K e S) que o sistema hoje não cobre.

**d) Dureza como variável.** `kc1.1` varia com a dureza do material dentro da mesma liga. A tabela do sistema trata cada liga como um ponto único, mas declara faixas de dureza de 40 HB de largura. Existe relação publicada entre dureza e `kc1.1` que permita interpolar, ou a prática é tabelar por liga e tratamento?

**e) Nomenclatura.** Materiais brasileiros de ferramentaria (2711, VP Atlas) podem não existir na literatura internacional sob esse nome. Entregue a equivalência DIN/AISI/ISO de cada um e o dado da equivalente.

**Entregue ao final:** a tabela completa de `kc1.1` e `mc`, com fonte e nível de confiança **por linha** — não por tabela.

---

# FORMATO DA ENTREGA

Para cada questão, entregue nesta estrutura:

```
## [número] [título]

**Veredito:** [uma frase]
**Confiança:** CONSENSO | REFERÊNCIA ÚNICA | SEM CONSENSO | NÃO ENCONTRADO

**O que as fontes dizem**
[tabela ou lista com valores e procedência]

**Regra ou valor recomendado**
[fórmula com variáveis nomeadas, ou constante com condição de validade]

**Se o valor atual do sistema estiver errado**
[o que muda no resultado, com número]

**Fontes**
[link, autor/fabricante, ano]
```

Ao final, duas tabelas de fechamento:

**Tabela A — Placar**

| Item | Valor atual | Veredito | Valor recomendado | Confiança |
|---|---|---|---|---|

**Tabela B — O que continua sem base**

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|

E, obrigatoriamente, **a cadeia de cálculo final recomendada**, escrita como sequência numerada de fórmulas — de `Vc`, `fz`, `ae`, `ap`, `D`, `Z` até `Pc`, `Pm` e `Mc` — pronta para virar código, com cada passo citando a fonte.

Lacuna declarada é resultado útil. Número inventado é passivo.

═══════════════════════════════════════════════════════════════════

---

## Rastreabilidade

| Questão | Origem no dossiê auditado |
|---|---|
| 1 | Ponto de atenção **A1** — §10.1 e §10.2 |
| 2 | Defeito §10.17 a + §10.4 + §2.2.1 |
| 3 | Ponto de atenção **A3** — §1.2 e §10.5 |

## O que este retorno alimenta

- `CANONICO_MOTOR_DE_CALCULO.md` — todas as três questões
- Alimenta **R6**: a força de corte derivada do Kienzle é a entrada do cálculo de deflexão
- Cruza com **R1**: se a espessura mínima de cavaco for o critério real de `ap` em acabamento, a Questão 2 daqui fornece a base
