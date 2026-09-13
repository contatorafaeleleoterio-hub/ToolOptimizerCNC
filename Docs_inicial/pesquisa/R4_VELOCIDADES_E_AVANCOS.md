# R4 — Velocidades e Avanços

**Vira o canônico:** `CANONICO_VELOCIDADES_E_AVANCOS.md`
**Responde:** tabelas de `Vc` e `fz` por material e diâmetro · janela de tolerância em torno do valor recomendado
**Dependências:** o fator de revestimento vem de **R3**. Pode rodar antes, mas o resultado se refina depois.
**Vale rodar em dois agentes** — é a rodada com mais dado numérico de catálogo.
**Salve o retorno como:** `RESPOSTA_R4.md`

---

═══════════════════════════════════════════════════════════════════

# MISSÃO

Você vai validar as **tabelas de velocidade de corte e avanço por dente** de uma calculadora de parâmetros para fresamento CNC, e determinar quanto o operador pode se afastar do valor recomendado antes de entrar em risco. As tabelas abaixo estão em uso; parte delas tem procedência declarada, parte não.

## Contexto do produto

- **Usuário:** operador e programador de CNC em oficina brasileira de usinagem e ferramentaria.
- **Escopo:** fresamento com **fresa inteiriça de metal duro revestido**, topo reto, toroidal e esférica.
- **Aplicação dominante:** moldes e matrizes.
- **Postura:** o sistema recomenda um ponto de partida e permite ajuste. Todo número é auditável.
- **Margem de erro declarada do modelo:** ±15–25%.

## REGRAS DE RESPOSTA — obrigatórias

1. **Não invente número.** Sem consenso, entregue a **faixa** e a dispersão entre fontes.
2. **Cada número precisa de fonte citável** — catálogo de fabricante (Sandvik Coromant, Kennametal, Iscar, Seco, Walter, Mitsubishi, OSG, Guhring), handbook (Machinery's Handbook, ASM Handbook Vol. 16, Diniz/Marcondes/Coppini) ou norma.
3. **Etiquete a confiança de cada linha de tabela:** `CONSENSO` · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` · `NÃO ENCONTRADO`. Confiança por linha, não por tabela.
4. **Declare as condições junto com o número.** Um `Vc` sem substrato, revestimento e refrigeração declarados não é um dado — é um boato. Toda faixa que você entregar precisa dizer para que condição vale.
5. **Diga quando o valor implementado estiver errado**, com a consequência quantificada.
6. **Prefira a regra à tabela** onde houver regra. Se o `fz` de acabamento é uma fração declarada do de desbaste, entregue a fração e a fonte em vez de duplicar a tabela.
7. **Priorize a prática de oficina brasileira de moldes** onde houver divergência regional, mas registre a divergência.

---

# QUESTÃO 1 — Velocidade de corte por material

O sistema usa estas faixas de `Vc` (m/min) para fresa de metal duro. Os três primeiros são declarados de confiabilidade alta, com fonte; os demais são estimativa.

| Material | ISO | Dureza | Desbaste | Semi | Acabamento | Status |
|---|---|---|---|---|---|---|
| Aço 1020 | P | 120–160 HB | 185–250 | 220–280 | 250–350 | validado |
| Aço 1045 | P | 170–220 HB | **150–200** | 180–240 | 200–280 | validado |
| Inox 304 | M | 140–180 HB | 60–90 | 80–120 | 100–150 | validado |
| Alumínio 6061-T6 | N | ~95 HB | 400–600 | 500–800 | 600–1000 | estimado |
| P20 | P | 280–320 HB | 100–120 | 120–180 | 150–200 | estimado |
| 2711 | P | 300–340 HB | 85–105 | 100–150 | 125–170 | estimado |
| 8620 núcleo | P | 180–220 HB | 120–180 | 150–220 | 180–250 | estimado |
| 8620 cementado | H | 58–62 HRC | 60–90 | 80–120 | 100–150 | estimado |
| H13 | H | 45–52 HRC | 80–125 | 100–150 | 125–170 | estimado |

**Responda:**

**a) Divergência interna a resolver.** Para o aço 1045 em desbaste, três valores coexistem no projeto: **150–200 m/min** (a tabela acima e o documento de velocidades, classificado como confiabilidade alta), **140 m/min** pontual (contrato de uma versão mais nova, fora da faixa) e **80–120 m/min** (um caso de teste antigo cuja fonte não existe mais). Qual é a faixa correta para fresamento de aço 1045 com fresa inteiriça de metal duro revestido? Cite catálogo.

**b) Um padrão suspeito na tabela.** A `Vc` **cresce** do desbaste para o acabamento em todos os nove materiais. Isso é a convenção correta? Confirme o princípio e explique-o: o acabamento tira menos material por passada, então admite velocidade maior sem sobrecarregar a aresta — ou a razão é outra? Existe material ou situação em que a relação se inverte?

**c) Validação dos seis estimados.** Entregue as faixas publicadas para P20, 2711 (com a equivalência DIN/AISI, já que é designação brasileira), 8620 em núcleo e cementado, e H13 tratado. Onde não houver dado direto, indique o material equivalente usável como *proxy* e o erro esperado.

**d) As condições que faltam.** Cada faixa acima está declarada sem dizer para que condição vale. Para cada material, diga como a faixa muda com:
- **revestimento** (sem revestimento × TiAlN/AlTiN × AlCrN)
- **refrigeração** (a seco × ar comprimido × emulsão × alta pressão × MQL)
- **estratégia** (fresamento convencional × alta velocidade × alta eficiência)

Se a variação por condição for maior que a largura da própria faixa, diga — significa que a tabela como está entrega menos informação do que aparenta.

**e) Dureza como eixo.** Faixas de dureza de 40 HB de largura são tratadas como um ponto único. Existe regra publicada de correção de `Vc` por dureza dentro da mesma liga? Para aços de molde tratados, a dureza em HRC é o eixo mais usado que a liga — confirme e entregue a tabela por faixa de HRC se ela existir.

**f) Expansão.** Entregue faixas de `Vc` para ferro fundido cinzento GG25, ferro fundido nodular GGG50 e Ti-6Al-4V — os grupos ISO K e S que o sistema não cobre.

---

# QUESTÃO 2 — Avanço por dente (`fz`) por diâmetro

O sistema usa tabelas de `fz` por diâmetro, com interpolação linear entre pontos. Esta é a de aços 28–34 HRC em desbaste, que serve de base para as demais:

| Ø (mm) | 0,2 | 0,5 | 0,75 | 0,8 | 1 | 1,5 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 14 | 16 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `Vc` | 120 | 140 | 150 | 150 | 160 | 170 | 180 | 190 | 200 | 210 | 210 | 200 | 190 | 180 | 170 |
| `fz` | 0,003 | 0,006 | 0,008 | 0,010 | 0,012 | 0,020 | 0,030 | 0,050 | 0,070 | 0,100 | 0,120 | 0,140 | 0,160 | 0,180 | 0,200 |

As outras tabelas derivam desta por regra:
- **Aços 38–43 HRC:** tabela própria; acabamento = `Vc × 0,85` e `fz × 0,75` do desbaste
- **Aços baixo carbono (1020, 1045):** `Vc × 1,30` e `fz × 1,10` sobre a de 28–34 HRC
- **Aços 28–34 HRC, acabamento:** `Vc × 1,10` e `fz × 0,60` do desbaste
- **Alumínio:** tabela própria, `Vc` de 300 a 1000 conforme o diâmetro
- **Semi-acabamento:** ponto médio entre desbaste e acabamento

**Responda:**

**a)** Os valores de `fz` por diâmetro batem com catálogo? Entregue a faixa publicada de `fz` para fresa inteiriça de metal duro em aço, por diâmetro, e compare.

**b) O formato da regra.** `fz` proporcional ao diâmetro é a forma correta, ou os fabricantes publicam `fz` por **faixa de diâmetro** com degraus? Existe relação publicada `fz = f(D)` — linear, potência, ou tabela discreta?

**c) O pico da curva de `Vc`.** Note que a `Vc` na tabela **sobe** até Ø6–8 e depois **cai** até Ø16. Esse formato tem base física — dissipação de calor, rigidez da ferramenta, limite de rotação — ou é artefato da tabela? Fabricantes publicam `Vc` variando com o diâmetro, ou `Vc` constante por material com o diâmetro afetando só a rotação?

**d) As regras derivadas.** As frações usadas (`fz` de acabamento = 60% do desbaste; `Vc` de acabamento = +10%; grupo endurecido = 85% e 75%) têm base em catálogo, ou são convenção interna? Entregue as frações publicadas.

**e) O piso de `fz`.** O sistema usa `0,002 mm/dente` como piso absoluto, citando microfresas de Ø0,2 mm. Esse piso tem base? Ele deve ser absoluto ou proporcional ao raio de aresta da ferramenta (ver Questão 3)?

**f) Número de arestas.** O `fz` publicado depende de `Z`? Uma fresa de 2 cortes e uma de 4 no mesmo diâmetro e material usam o mesmo `fz`, ou há correção? O sistema hoje trata `fz` como independente de `Z`.

---

# QUESTÃO 3 — Janela de tolerância: quanto se pode desviar do recomendado

O sistema classifica cada parâmetro (`Vc`, `fz`, `ae`, `ap`) em cinco zonas de cor pela razão contra o valor recomendado, **com os mesmos quatro limiares para os quatro parâmetros**:

| Razão valor / recomendado | Zona | Rótulo em `Vc` | Rótulo em `fz` |
|---|---|---|---|
| < 0,50 | vermelho | Baixo | Atrito |
| 0,50 – 0,75 | amarelo | Sub-ótimo | Leve |
| 0,75 – 1,20 | **verde** | Recomendado | Ideal |
| 1,20 – 1,50 | amarelo | Alerta | Agressivo |
| > 1,50 | vermelho | Desgaste | Vibração |

Esses quatro números **não têm fonte em documento nenhum do sistema**. E aplicá-los igualmente aos quatro parâmetros pressupõe que todos toleram o mesmo desvio, o que é improvável.

**Responda:**

**a)** Existe base técnica para uma janela de tolerância em torno do parâmetro recomendado? Fabricantes publicam **faixa (mín–máx)** além do valor nominal, ou só o nominal?

**b)** A janela é **igual** para `Vc`, `fz`, `ae` e `ap`, ou cada um tem tolerância própria? Qual é o mais sensível a desvio, e por quê? Ordene os quatro do mais ao menos sensível.

**c) Piso de `fz` — a fronteira física.** Qual é o `fz` mínimo abaixo do qual o gume **esfrega em vez de cortar** (*rubbing / ploughing*)? A hipótese a verificar: o critério real não é uma fração do `fz` recomendado, e sim a **espessura de cavaco contra o raio de aresta** da ferramenta.
1. Qual o raio de aresta típico de fresa inteiriça de metal duro, por faixa de diâmetro? Está em catálogo ou precisa ser estimado?
2. Qual a espessura mínima de cavaco em função do raio de aresta? A referência preliminar é "5–20% do raio de aresta" — confirme com fonte.
3. Traduza isso para a linguagem do sistema: dado um `fz` recomendado, a que fração dele está a fronteira de esfregamento?

**d) Teto de `fz` — a outra fronteira.** Acima de que ponto há risco de lascamento do gume ou sobrecarga? Existe valor publicado, ou o limite é a potência da máquina?

**e) `Vc` acima do recomendado.** Subir 20% tem qual efeito quantificado sobre a vida da ferramenta? Se a equação de Taylor for a resposta, entregue o cálculo — e note que o expoente `n` é objeto de outra rodada desta pesquisa.

**f)** Se não houver base para janela simétrica: qual estrutura de zonas você recomendaria, apoiada em quê? Note que a assimetria provável é que **cortar menos que o recomendado** é conservador para `ae` e `ap` (menos carga), mas **perigoso** para `fz` (esfregamento) e para `Vc` (aresta postiça).

---

# FORMATO DA ENTREGA

Para cada questão:

```
## [número] [título]

**Veredito:** [uma frase]
**Confiança:** CONSENSO | REFERÊNCIA ÚNICA | SEM CONSENSO | NÃO ENCONTRADO

**O que as fontes dizem**
[tabela com valores, condição de validade e procedência]

**Regra ou tabela recomendada**
[com a condição declarada: substrato, revestimento, refrigeração]

**Se o valor atual do sistema estiver errado**
[o que muda, com número]

**Fontes**
[link, fabricante, ano]
```

Ao final, três entregas de fechamento:

**Tabela A — Velocidades recomendadas**, por material × operação, com condição declarada e confiança **por linha**.

**Tabela B — Avanços recomendados**, por diâmetro, com a regra de derivação por operação.

**Tabela C — O que continua sem base**

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|

Lacuna declarada é resultado útil. Número inventado é passivo.

═══════════════════════════════════════════════════════════════════

---

## Rastreabilidade

| Questão | Origem no dossiê auditado |
|---|---|
| 1 | Ponto de atenção **A4** — §10.15 e §1.2 |
| 2 | §2.1.10 e §1.3.2 — motor de recomendação |
| 3 | §5.16.2 e §5.10 — limiares de zona sem fonte |

## O que este retorno alimenta

- `CANONICO_VELOCIDADES_E_AVANCOS.md` — todas as três questões
- Alimenta **R1**: se a espessura mínima de cavaco for o critério real, ela limita o `ap` de acabamento por baixo
- Consome de **R3**: o fator de revestimento entra nas faixas de `Vc`
