# Mapeamento campos × ferramentas — Fenix

**Finalidade:** tabela definitiva de campos, controles e valores de partida por geometria.
Fonte única para quem desenha ou constrói o painel.

**Fontes:** MVP §3.2, §4.1, §5.1, §5.3 · E1 §3 · E2 · canônicos Motor de Cálculo e Geometria de Corte.

---

## 1. Campos comuns

| Campo | Unidade | Faixa | Passo | Todas? | Nota |
|---|---|---|---|---|---|
| Material da peça | — | 12 + custom | — | sim | Primeiro campo, filtra catálogo |
| Ferramenta (família+geometria) | — | 2 níveis | — | sim | Nível 1 = família+substrato, nível 2 = geometria |
| Diâmetro (D) | mm | 0,2–25 (fresa inteiriça) · furar: por geometria, ver §2/FURAR | 0,01 < Ø1; 0,1 ≥ Ø1 | sim | Roscar e mandrilar: sem faixa declarada, aceita qualquer |
| Balanço (L) | mm | 5–300 | 0,5 | sim | Produz L/D |

**Condicionais (não universais):**

| Campo | Unidade | Onde aparece | Passo | Nota |
|---|---|---|---|---|
| Nº de arestas (Z) | — | Fresar + Fresa de rosca | 1 (inteiro, 1–12) | Nunca assumido. Padrão vem da geometria |
| Prof. de corte (ap) | mm | Fresar (campo de entrada) | 0,05 | Derivado em mandrilar |
| Comprimento de aresta (Lc) | mm | Fresar (opcional) | 0,5 | Vazio = teto proporcional de ap |

---

## 2. As 17 geometrias — campos específicos

### FRESAR (8 geometrias)

| # | Geometria | Substratos | Z padrão | Campos extras | Partida ap | Partida ae | Partida L |
|---|---|---|---|---|---|---|---|
| 1 | Topo Reto | MD · HSS-Co | 4 | — | 3 | 5 | 30 |
| 2 | Toroidal | MD | 4 | **r** (raio de canto) | 1 | 3 | 30 |
| 3 | Esférica | MD · HSS-Co | 2 | — (r = D/2, derivado) | 2 | 3 | 25 |
| 4 | Chanfrar | MD · HSS-Co | 4 | **Dmin** (diâmetro menor) | 1 | 1 | 30 |
| 5 | Alto Avanço | MD | 3 | **κ** (ângulo posição, padrão 15°) | 1 | 8 | 30 |
| 6 | Cabeçote Faceador | MD | 5 | **κ** (ângulo posição, padrão 45°) | 1 | 0,7×D | 40 |
| 7 | Topo c/ Pastilhas | MD | 2 | — (Z = insertos efetivos) | 3 | 5 | 30 |
| 8 | Disco/Serra | MD · HSS-Co | 8 | rótulos trocados: ap→**largura b**, ae→**penetração radial** | 5 | 3 | — |

**Ajuste fino (todas as fresas):** vc · fz · ae

### FURAR (5 geometrias)

| # | Geometria | Substratos | Campos extras | Partida L |
|---|---|---|---|---|
| 9 | Helicoidal | MD · HSS-Co | **ângulo de ponta** (140° MD, 118°/135° HSS) | 50 |
| 10 | U-Drill | MD | **fn** editável | 50 |
| 11 | Centro/Spot | MD · HSS-Co | **ângulo de ponta** (90°/120°) | — |
| 12 | Escareador | MD · HSS-Co | D = diâmetro maior | — |
| 13 | Alargador | MD · HSS-Co | — | 40 |

**Sem Z, sem ae, sem ap (exceto derivado de profundidade de furo).**
**Ajuste fino:** vc (todas) · fn (só U-Drill)

**Faixa de diâmetro por geometria** — decisão do Mestre, 03/09/2026, fechando a lacuna que a R8 deixou.
**É orientação, não limite:** dá o valor de partida do campo e o ponto de edição, e o sistema aceita
entrada fora dela e entrega o resultado. Abaixo do mínimo, quem fala é o alerta (MVP §9.2, gatilho 11).

| Geometria | Mínimo | Máximo |
|---|---|---|
| 9 · Helicoidal, aço rápido ao cobalto | 0,5 mm | 25 mm |
| 9 · Helicoidal, metal duro | 2,0 mm | 20 mm |
| 10 · U-Drill (broca de insertos) | 12 mm | 60 mm |
| 11 · Centro / Spot, aço rápido ao cobalto | 1,0 mm | 16 mm |
| 11 · Centro / Spot, metal duro | 2,0 mm | 16 mm |
| 12 · Escareador | 4,0 mm | 40 mm |
| 13 · Alargador | 2,0 mm | 40 mm |

**O critério do Mestre, que governa a tabela e sobrevive a ela:** *onde houver dado de catálogo, vale
o dado; onde não houver, valem os números dele.* O U-drill fica em **12 mm** por isso, e não em 2 — o
12 vem da tabela ISCAR lida na R8, e é o único mínimo com dado por trás. Os outros são decisão do
Mestre. Se aparecer catálogo para eles, o catálogo vence.

**Procedência: `DECISÃO DE PROJETO` — não é dado de pesquisa.** A R8 voltou sem faixa publicada para
estas geometrias nos dois territórios, e o Mestre decidiu não caçar o número: entra valor de partida
razoável, **editável pelo operador** em Configurações, com o aviso de conferir a constante com o
fornecedor da ferramenta. Duas ressalvas ficam registradas para poderem ser corrigidas:

- **O mínimo de 12 mm do U-Drill é escolha do orquestrador, revisável.** O Mestre falou em 2 mm; broca
  de insertos não existe em catálogo abaixo disso — a tabela lida na R8 começa bem acima. Se a
  intenção era outra, esta linha muda sozinha.
- **Os máximos não têm fonte.** São prática de oficina, escolhidos pelo orquestrador. Nenhum dos sete
  veio de catálogo ou norma.

**Por que Helicoidal e Centro / Spot aparecem em duas linhas:** o mínimo depende do substrato — o
metal duro não é fabricado tão fino quanto o aço rápido ao cobalto. Os quatro valores são do Mestre.

**Toda a faixa é editável** em Configurações, junto do que já é editável lá (D2): o operador ajusta
mínimo e máximo à ferramenta que ele tem.

### ROSCAR (3 geometrias)

| # | Geometria | Substratos | Campos extras |
|---|---|---|---|
| 14 | Macho de Corte | HSS-Co · MD | **designação da rosca**, **passo P**, comprimento de rosca, furo executado |
| 15 | Macho de Conformação | HSS-Co · MD | idem + alerta crítico em material frágil |
| 16 | Fresa de Rosca | MD | **designação**, **P**, diâmetro da fresa, Z=3 |

**Ajuste fino:** vc (machos) · vc + fz (fresa de rosca)
**Macho:** avanço = P × n, exibido como leitura travada.

### MANDRILAR (1 geometria)

| # | Geometria | Substratos | Campos extras |
|---|---|---|---|
| 17 | Barra/Cabeçote | MD | **D inicial**, **D final**, **raio de ponta rε**, **fn** |

**ap = (D final − D inicial) / 2 — derivado, exibido como leitura.**
**Ajuste fino:** vc · fn · ap (leitura)

---

## 3. Controles de ajuste fino — resumo por família

| Família | vc | fz | ae | fn | ap | Nota |
|---|---|---|---|---|---|---|
| Fresar | ± | ± | ± | — | — | ap é campo de entrada, não ajuste |
| Furar (geral) | ± | — | — | — | — | fn derivado |
| Furar (U-Drill) | ± | — | — | ± | — | fn editável só nesta |
| Roscar (macho) | ± | — | — | — | — | avanço = P×n, travado |
| Roscar (fresa) | ± | ± | — | — | — | funciona como fresamento |
| Mandrilar | ± | — | — | ± | leitura | ap derivado |

### Limites dos controles (MVP §5.3)

| Controle | Mínimo recomendado | Máximo recomendado | Passo |
|---|---|---|---|
| vc | 0 | Vc_partida × 1,3 | 1 m/min |
| fz | max(0,002 ; fz_partida × 0,4) | fz_partida × 2,0 | por faixa de D |
| ae | 0,01 mm | D | D≤1→0,01 · D≤10→0,1 · senão 0,5 |
| ap | 0,05 mm | min(1,0×D ; Lc) | 0,05 mm |
| fn | — | — | decisão de projeto pendente |

**Limites são recomendação, não trava.** Valor além é aceito, resultado sai (E0).

---

## 4. Resultado — o que o painel mostra

### Números comando (hero, editáveis com ±5% — emenda do Mestre, 07/09/2026)
- **n** — rotação (rpm) — prefixo S
- **vf** — avanço da mesa (mm/min) — prefixo F

### Verificação (resumo, leitura)
| Grandeza | Unidade | Nota |
|---|---|---|
| hex | mm | espessura de cavaco máxima |
| CTF | × | fator de afinamento (só quando ae < D/2) |
| MRR (Q) | cm³/min | taxa de remoção |
| vc real | m/min | velocidade real no diâmetro efetivo |
| Pc | kW | potência de corte na aresta |
| Mc | N·m | torque |
| L/D | — | relação balanço/diâmetro |

### Alertas — 10 gatilhos ativos
1a. hm < 0,1 mm · 2. ae ≥ 0,95×D · 3. ae > D · 4. Vc fora 0,6–1,4× partida · 5. L/D acima limiar · 6. furo >3×D sem refrigeração · 7. furo >30×D com · 8. pré-furo de rosca pequeno · 9. conformação em frágil · 10. toroidal ap < r

### Feedback (recolhido)
- **"O que vai acontecer"** — descreve risco, sem instruir
- **"O que mexer"** — max 2 direções, com custo

---

## 5. Dados do material — visíveis na tela

| Dado | Unidade | Editável onde |
|---|---|---|
| Classe ISO | P/M/K/N/S/H | Configurações |
| Dureza | HB ou HRC | Configurações |
| kc1.1 | N/mm² | Configurações |
| mc | — | Configurações |
| Vc partida | m/min | Configurações |

Visíveis no bloco Material do painel. Edição em Configurações (fora do fluxo de cálculo).

---

## 6. Comportamento dinâmico

**Troca de família:** bloco de ajuste fino reconfigura (§3 acima), Z aparece/desaparece, ap vira campo ou derivado.

**Troca de geometria dentro da família:** campos específicos mudam (r, κ, Dmin, ângulo de ponta, etc.), valores de partida recalculam.

**Troca de material:** kc1.1/mc/Vc partida mudam, catálogo refiltrado.

**Valores manuais:** preservados dentro da mesma família. Reajustados à região recomendada ao trocar de família.

**Primeiro cálculo:** botão. Depois: live (qualquer mudança recalcula).

---

## 7. Referências de UI

### ToolOptimizerCNC v1 (nosso)
- Layout 2 colunas (config | resultado)
- Campo condicional: raio de canto só aparece para toroidal
- Auto-populate de valores por material+diâmetro
- Live calculation após primeiro clique
- Hero numbers bidirecionais (RPM, Avanço)
- 3 tipos de fresa apenas (topo, toroidal, esférica)

### Concorrentes e open-source
- **FSWizard** — seletor de tipo (milling/drilling/tapping/turning) → campos por tipo
- **Hoffmann Group** — abas por família (tornear/furar/fresar) com campos específicos
- **FRAISA ToolExpert** — seleção por aplicação, campos dinâmicos
- **HSMAdvisor** — material + tipo + geometria em uma tela, campos adaptáveis
- **CNC-ToolHub** — strategy pattern para micro vs standard tools
- **CncHelper** — web app leve, campos básicos

**Padrão da indústria:** seleção família → tipo → campos dinâmicos. É o que o Fenix faz.
