# Dossiê — Calculadora de Parâmetros

**Levantamento completo do que existe e do que já foi decidido.**

| | |
|---|---|
| **Sistema** | ToolOptimizer CNC |
| **Versão do app** | `0.12.1` |
| **Data do levantamento** | 16/08/2026 |
| **Cópia espelhada em** | `Projetos/Fenix/Docs_inicial/` |

Todos os caminhos citados são relativos à raiz deste repositório.

**Fontes cruzadas:** código em `src/`, as duas sandboxes (`gauntlet-calculadora-cnc/`, `gauntlet-calculadora-cnc-v2/`), 4 protótipos HTML na raiz, PRDs e specs em `docs/specs` e `docs/technical`, design em `docs/design`, planos em `docs/plans`.

**Regra deste documento:** nada foi inventado. Cada item tem arquivo de origem. Onde a documentação se contradiz, o conflito está registrado na §10 em vez de resolvido por conta própria.

---

## 0. Como ler

A Calculadora existe hoje em **duas realidades paralelas** — é a chave para entender todo o resto:

| | **App** (`src/`) | **Sandbox v2** (`gauntlet-calculadora-cnc-v2/`) |
|---|---|---|
| O que é | O que o operador usa hoje | Maquete em HTML puro, aprovada, ainda **não portada** |
| Cobertura | Só **fresa inteiriça** | **18 tipos** de ferramenta em 4 famílias |
| Tema | Escuro (cyan/neon) | Claro industrial (norma ISA-101) |
| Estado | v0.12.1 no ar | Construção aprovada 91/100; refactor visual parado na etapa E2 |

> **Sandbox** = área de teste isolada. Constrói-se ali a tela inteira antes de mexer no app real, para não quebrar o que já funciona.

**Legenda de status:**

| | Significado |
|---|---|
| ✅ | Está no app hoje |
| 🧪 | Existe só na sandbox/protótipo — não chegou ao app |
| 📄 | Está escrito em documento, nunca foi codificado |
| 🔜 | Decidido, aguardando execução |
| ❌ | Foi avaliado e descartado, com motivo |
| ⚠️ | Existe, mas está quebrado ou inconsistente |

---

## 1. Ferramentas e funções

### 1.1 Ferramentas de corte cobertas

| # | Item | Status | Onde |
|---|---|---|---|
| 1.1.1 | Fresa **topo** (reta) | ✅ | `src/data/tools.ts` |
| 1.1.2 | Fresa **toroidal** (com raio de quina) | ✅ | `src/data/tools.ts` |
| 1.1.3 | Fresa **esférica** (ponta redonda) | ✅ | `src/data/tools.ts` |
| 1.1.4 | Nº de cortes (Z): apenas 2, 3, 4 ou 6 | ✅ | `src/components/config-panel.tsx` |
| 1.1.5 | 18 tipos em 4 famílias: Fresar · Furar · Roscar · Mandrilar | 🧪 | `gauntlet-calculadora-cnc-v2/research/BUILD_CONTRACT.md` |
| 1.1.6 | Material da ferramenta (HSS 0,29 · HSS-Co 0,37 · MD 1,00 · pastilha 1,25) como multiplicador de velocidade | 🧪 | `gauntlet-calculadora-cnc/research/DISCOVERY.md` |
| 1.1.7 | Campo "material da ferramenta" **removido** — vai embutido no nome da ferramenta | 🔜 | `docs/specs/SPEC_PAINEL_CALCULADORA_PARAMETROS.md` §14 (15/08) |

**Diferencial entre os tipos de fresa:** hoje o tipo muda apenas as faixas sugeridas de parâmetro. O **diâmetro efetivo** da esférica/toroidal — que corrigiria a velocidade real de corte — só existe na maquete. O app usa o diâmetro nominal e, por isso, **superestima a velocidade** nesses dois tipos.

### 1.2 Materiais da peça

| # | Item | Status |
|---|---|---|
| 1.2.1 | **9 materiais**: Aço 1020 · 1045 (padrão) · Inox 304 · Alumínio 6061-T6 · P20 · 2711 · 8620 núcleo · 8620 cementado · H13 | ✅ `src/data/materials.ts` |
| 1.2.2 | Apenas **3 são validados**; 6 são estimados | ✅ mesma fonte |
| 1.2.3 | Criar materiais próprios (criar/editar/apagar) | ✅ `src/pages/settings-page.tsx` |
| 1.2.4 | Sobrescrever os 9 materiais de fábrica | ✅ mesma fonte |
| 1.2.5 | Expansão para **30+ materiais** com procedência linha a linha | 🔜 `docs/plans/PLAN_MOTOR_CALCULADORA_V2.md` §4 |

**Campos de cada material:** `id`, nome, classe ISO (P/M/N/H), dureza, `kc1_1`, `mc`, faixas de Vc por operação, status (validado/estimado).

### 1.3 Operações

| # | Item | Status |
|---|---|---|
| 1.3.1 | Desbaste · Semi-acabamento · Acabamento | ✅ `src/data/operations.ts` |
| 1.3.2 | Cada operação muda as faixas sugeridas de profundidade e avanço | ✅ `src/engine/recommendations.ts` |
| 1.3.3 | Os multiplicadores gravados em `operations.ts` **não entram no cálculo** — só o nome é usado | ⚠️ mesma fonte |

---

## 2. Tipos de cálculo

### 2.1 Cálculos ativos no app

| # | Cálculo | O que entrega | Arquivo |
|---|---|---|---|
| 2.1.1 | **RPM** = (Vc × 1000) / (π × D) | Rotação do eixo | `src/engine/rpm.ts` |
| 2.1.2 | **Avanço** = fz efetivo × Z × RPM | mm/min da mesa | `src/engine/feed.ts` |
| 2.1.3 | **CTF / chip thinning** = fz ÷ √(ae/D), só quando ae < 50% de D | Corrige o avanço em corte raso | `src/engine/chip-thinning.ts` |
| 2.1.4 | **MRR** = (ap × ae × avanço) / 1000 | Volume removido, cm³/min | `src/engine/power.ts` |
| 2.1.5 | **Potência** = (MRR × Kc) / (60000 × η) | kW exigidos do motor | `src/engine/power.ts` |
| 2.1.6 | **Torque** = (Potência × 9549) / RPM | Nm exigidos | `src/engine/power.ts` |
| 2.1.7 | **L/D** = balanço ÷ diâmetro | Rigidez da ferramenta | `src/engine/validators.ts` |
| 2.1.8 | **Vc real** = π × D × RPM / 1000 | Velocidade efetiva após arredondar o RPM | `src/components/results-panel.tsx` |
| 2.1.9 | **Índice de Saúde 0–100** | Nota do conjunto de parâmetros | `src/utils/health-score.ts` |
| 2.1.10 | **Parâmetros recomendados** por material/operação/diâmetro | Ponto de partida automático | `src/engine/recommendations.ts` |
| 2.1.11 | **Faixas dos sliders** (mín/máx/passo/recomendado) | Limites do ajuste fino | `src/engine/slider-bounds.ts` |
| 2.1.12 | **Folga de potência** | Quanto sobra do motor, em % | `src/store/machining-store.ts` |
| 2.1.13 | Validação de limites da máquina (RPM, potência, avanço) | Lista de avisos em texto | `src/engine/validators.ts` |

**Ordem obrigatória da cadeia:** RPM → CTF → fz efetivo → Avanço → MRR → Potência → Torque → L/D. Cada passo depende do anterior, por isso a execução é sequencial (`blueprint_calculadora_cnc.md` E8).

### 2.2 Cálculos especificados mas ausentes do código

| # | Cálculo | Situação |
|---|---|---|
| 2.2.1 | **Kienzle completo** — `kc = kc1.1 × h^(−mc)` | ⚠️ O campo `mc` existe nos 9 materiais e **nunca é usado**. A potência usa `kc1.1` fixo. Fonte: `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md` |
| 2.2.2 | **Deflexão** `δ = F·L³/(3·E·I)` | 📄 `docs/specs/DECISOES_VALIDACAO_PRD.md` §3.2 |
| 2.2.3 | **Força de corte** `Fc = Kc × ap × fz × Z` | 📄 `docs/technical/ESPECIFICACAO_TECNICA_CONSOLIDADA.md` §1.7 |
| 2.2.4 | **Tempo de usinagem** `t = L / Vf` | 📄 `PLAN_MOTOR_CALCULADORA_V2.md` §3 |
| 2.2.5 | **Vida da ferramenta** (Taylor) | 📄 §2 — travado por falta do expoente `n` por material |
| 2.2.6 | **Diâmetro efetivo** de fresa esférica/toroidal | 🧪 só na sandbox v1 — o app usa o nominal e superestima |
| 2.2.7 | **Avanço por rotação** (`fn`) — necessário para furar e roscar | 🧪 só na sandbox |
| 2.2.8 | Rugosidade (Ra), altura de crista | 🧪 só na sandbox |

### 2.3 Casos de teste de referência

`docs/technical/CASOS_TESTE_REFERENCIA.md` — 3 casos com valor esperado e tolerância (RPM ±1, avanço ±1 mm/min, potência ±0,01 kW, torque ±0,01 Nm):

| Caso | Cenário | Esperado |
|---|---|---|
| **A** | 1045, desbaste, Ø12 | 2652,58 RPM · 848,83 mm/min · 0,64 kW · 2,29 Nm · sem CTF |
| **B** | Alumínio 6061, acabamento, Ø10, ae 20% | 15915,49 RPM · 14234,03 mm/min · 0,42 kW · CTF 2,24× |
| **C** | Inox 304, semi, Ø8, ae 25% | 3780,23 RPM · 1512,09 mm/min · 0,30 kW · CTF 2,0× |

---

## 3. Inputs

### 3.1 Entradas principais

| # | Campo | Tipo de controle | Faixa | Status |
|---|---|---|---|---|
| 3.1.1 | Material | Lista suspensa (9 itens) | — | ✅ |
| 3.1.2 | Operação | 3 botões | Desbaste / Semi / Acabamento | ✅ |
| 3.1.3 | Tipo de fresa | 3 botões | Toroidal / Esférica / Topo | ✅ |
| 3.1.4 | Diâmetro (D) | Campo numérico | 0,1–200 mm, passo 0,1 | ✅ |
| 3.1.5 | Nº de cortes (Z) | Botões ± travados | 2, 3, 4, 6 | ✅ |
| 3.1.6 | Altura de fixação (balanço) | Campo numérico | 5–300 mm | ✅ |
| 3.1.7 | Raio da ponta | Campo numérico (só toroidal) | 0,05–50 mm | ⚠️ armazenado e **nunca usado em fórmula** |

### 3.2 Ajuste fino — os 4 parâmetros de corte

Cada um tem: campo numérico livre + slider + botões ± + barra de estado + explicação "O QUE É…?".

| # | Parâmetro | O que é, em palavras simples | Status |
|---|---|---|---|
| 3.2.1 | **Vc** — velocidade de corte (m/min) | Quão rápido a aresta passa pelo material | ✅ |
| 3.2.2 | **fz** — avanço por dente (mm) | Espessura da lasca que cada corte tira | ✅ |
| 3.2.3 | **ae** — largura de corte (mm) | Quanto a fresa "morde" de lado | ✅ |
| 3.2.4 | **ap** — profundidade (mm) | Quanto a fresa desce | ✅ |

### 3.3 Configuração de máquina e segurança

| # | Campo | Faixa | Status |
|---|---|---|---|
| 3.3.1 | RPM máximo | 100–40000 (padrão 12000) | ✅ `src/pages/settings-page.tsx` |
| 3.3.2 | Avanço máximo | 100–20000 (padrão 5000) | ✅ |
| 3.3.3 | Potência máx. 15 kW · Torque máx. 80 Nm · Rendimento 0,85 | fixos | ⚠️ não editáveis |
| 3.3.4 | **Fator de correção/segurança** | Slider 0,50–1,00 (padrão 0,80) | ✅ `config-panel.tsx` |
| 3.3.5 | Limiares de L/D (seguro/alerta/crítico) | editáveis | ✅ |
| 3.3.6 | Multiplicadores de ap por operação | editáveis | ⚠️ **nenhum cálculo os consome** |
| 3.3.7 | Faixas mín/máx/desejado de Vc, fz, ae, ap por ferramenta | editáveis | ✅ |
| 3.3.8 | Casas decimais (0–4) | 0 a 4 | ⚠️ salvo, **sem efeito na tela** |
| 3.3.9 | Perfil de máquina completo e editável (4 campos) no painel | — | 🔜 `SPEC_PAINEL` §3.3 |

### 3.4 Regras de entrada especificadas

| # | Regra | Fonte |
|---|---|---|
| 3.4.1 | Ordem obrigatória dos blocos: Contexto → Categórico → Geométrico → Ajuste fino → Ação. Motivo: "cada camada restringe a seguinte; inverter faz o operador preencher campo cujo domínio ainda não existe" | `SPEC_PAINEL` §1 P2 |
| 3.4.2 | Teto de **6 campos** por tipo de ferramenta | `SPEC_PAINEL` §1 P3 |
| 3.4.3 | Campo com uma só opção válida vira texto fixo com a razão ao lado, não seletor | `SPEC_PAINEL` §3.4 |
| 3.4.4 | Bloco com campo inválido não fecha e abre sozinho — "erro escondido em gaveta é erro que não existe para o operador" | `SPEC_PAINEL` §7.1 |
| 3.4.5 | `ae ≤ D` é limite físico absoluto; valores ≤ 0 são rejeitados | `src/engine/validators.ts` |
| 3.4.6 | A faixa de diâmetro tem **4 valores diferentes** entre os documentos (0,5–30 · 3–32 · 0,1–200 · 0,2–16) | ⚠️ ver §10.9 |

---

## 4. Resultados

### 4.1 Visíveis na tela

| # | Resultado | Unidade | Onde aparece |
|---|---|---|---|
| 4.1.1 | **RPM** | rot/min | Número gigante + barra de % do máximo |
| 4.1.2 | **Avanço** | mm/min | Número gigante + barra de % do máximo |
| 4.1.3 | Potência estimada | kW | Cartão (já com fator de segurança) |
| 4.1.4 | Vc real | m/min | Cartão |
| 4.1.5 | MRR | cm³/min | Cartão |
| 4.1.6 | L/D | número | Chip colorido |
| 4.1.7 | CTF | fator (×) | Chip |
| 4.1.8 | fz efetivo | mm | Dentro do cartão de fórmula do avanço |
| 4.1.9 | Torque | Nm | **Só** no detalhe de histórico e favoritos |
| 4.1.10 | Eco dos parâmetros de entrada (Vc, fz, ap, ae) | — | Linha de contexto |
| 4.1.11 | Ferramenta resumida (`Toroidal Ø6 R1.0 H25 F4`) | — | Linha de ferramenta |
| 4.1.12 | Data/hora + material + operação + fator de segurança | — | Cabeçalho do resultado |

### 4.2 Calculados mas nunca exibidos

| # | Item | Situação |
|---|---|---|
| 4.2.1 | `potenciaCorte` — potência na aresta, sem o rendimento | ⚠️ calculado, nunca mostrado |
| 4.2.2 | Folga de potência (%) | ⚠️ só na linha de texto da versão mobile |

### 4.3 Regras de apresentação

| # | Regra | Fonte |
|---|---|---|
| 4.3.1 | Cálculo em número puro; arredondar só na exibição | `blueprint_calculadora_cnc.md` E11 |
| 4.3.2 | Números em fonte mono com largura fixa — "dígito que não dança quando o valor muda" | `docs/design/DS_TEMA_CLARO.md` §3.6 |
| 4.3.3 | **Estado vazio honesto**: antes de simular mostra `—`, nunca zero | ✅ `SPEC_CALCULADORA_MULTI_FERRAMENTA.md` §3.1 |
| 4.3.4 | O fator de segurança multiplica **só potência e torque** — não mexe em RPM, avanço nem MRR | ✅ |

---

## 5. Indicadores

> Cada indicador é registrado em três camadas: **o que mostra** · **quando dispara** · **por que existe** (com a fonte do projeto).

### 5.1 Semáforo de segurança ✅

- **Mostra:** nível consolidado — Verde SEGURO · Amarelo ALERTA · Vermelho CRÍTICO · BLOQUEADO.
- **Dispara:** bloqueado se L/D > 6; vermelho se L/D 4–6 **ou** algum aviso contém "excede"; amarelo se L/D 3–4.
- **Por que existe:** a persona principal "não é programador, precisa de interface visual clara (cores, status)" e "não quer caixa preta" — `PRD_TOOLOPTIMIZER_CNC_MVP.md` §2.1. É "linguagem visual de segurança que se mantém consistente entre tipos, mesmo que a regra que dispara cada cor mude" — `SPEC_CALCULADORA_MULTI_FERRAMENTA.md` §5.3.
- **Regra extra:** o badge nunca é apagado ou esmaecido — "apagar alarme ativo contraria a ISA-101" (`SPEC_PAINEL` §11.2).

### 5.2 L/D — rigidez ✅

- **Mostra:** balanço ÷ diâmetro, em chip colorido.
- **Dispara:** ≤3 verde · 3–4 amarelo · 4–6 vermelho · >6 **bloqueio duro**, não contornável por edição.
- **Por que existe:** "controla rigidez da ferramenta e previne deflexão excessiva, chatter e quebra prematura"; "L/D = 5 já é crítico em usinagem convencional; L/D > 6 só faz sentido em HSM, toroidal ou condições muito controladas" — `DECISOES_VALIDACAO_PRD.md` §2.5.
- **Como diferencial de produto:** validação física de L/D é "rara no mercado" e é "um diferencial central de valor prático" — `blueprint_calculadora_cnc.md` E6.
- **Futuro:** a comunicação passa a ser em micrômetros de deflexão ("a ferramenta vai fletir 38 µm e sua tolerância é 20 µm"), mas o bloqueio por L/D continua — "L/D é proxy; deflexão é o efeito"; "deflexão substitui o L/D na *comunicação*, não na *proteção*" (`PLAN_MOTOR_CALCULADORA_V2.md` §1).

### 5.3 Alerta de vibração ✅

- **Mostra:** aviso em texto na faixa 3 < L/D ≤ 4.
- **Por que existe:** o risco catalogado "chatter/vibração — rigidez insuficiente → acabamento ruim, desgaste acelerado" tem mitigação declarada "alertas de L/D > 4, deflexão > limite" — `PRD_MASTER.md` §2.2 + `PRD_MVP` §10.2.
- **Variante por fz:** fz abaixo da faixa → "risco de atrito/rubbing"; fz acima → "risco de sobrecarga/vibração". Existe para "garantir que fz fique dentro de faixa útil de corte" — `DECISOES_VALIDACAO_PRD.md` §2.4.

### 5.4 CTF / chip thinning ✅

- **Mostra:** chip `CTF ×N.NN` quando o fator é maior que 1.
- **Dispara:** só quando ae < 50% do diâmetro.
- **Por que existe:** "compensa o afinamento do cavaco em cortes com baixo engajamento radial" (`DECISOES_VALIDACAO_PRD.md` §3.1); "é crítico para preservar o tempo e a ferramenta" e "é o diferencial técnico de calculadoras especializadas contra fórmulas teóricas engessadas" (`blueprint` E4/E5).
- **Por que fica visível e não silencioso:** o padrão de mercado recorrente é expor o CTF "como calculadora/modo explícito, não só embutido silenciosamente" — `SPEC_CALCULADORA_MULTI_FERRAMENTA.md` §4.3.

### 5.5 Utilização de potência ✅

- **Mostra:** potência calculada contra a máxima da máquina (barra + aviso em texto).
- **Dispara:** aviso quando ultrapassa; a regra alvo é `P ≤ P_máquina × 0,8`.
- **Por que existe:** o risco "sobrecarga de eixo → parada de máquina, dano ao eixo" tem mitigação "verificação de potência com margem 20%" — `PRD_MVP` §10.2. E: "garante que a máquina suporte o passe sem travar ou alarmar o drive" — `blueprint` E4.
- **Dependência:** sem perfil de máquina editável, o alerta "é calculado contra uma máquina fictícia, errando **para o lado perigoso** numa oficina com centro de 8000 rpm" — `SPEC_PAINEL` §3.3.

### 5.6 Torque — indicador **removido** ❌

- **Situação:** o valor continua sendo calculado, mas o cartão visual foi retirado da tela.
- **Por que foi removido:** "o card de Torque era puramente decorativo (escala visual sem função de segurança real)" — nunca houve comparação com o limite da máquina — `SPEC_CALCULADORA_MULTI_FERRAMENTA.md` §3.2. Virou o princípio **P6: nenhum output visual sem função**.
- **Por que o cálculo continua:** "em desbastes lentos, a máquina pode ter potência mas estolar por falta de torque" — `blueprint` E4.

### 5.7 Badge "Estimado" ✅

- **Mostra:** ⚠ ao lado do material que não tem dado verificado por fabricante.
- **Por que existe:** a estratégia de dados manda "exibir ⚠️ Valores estimados — recomenda-se validação com fabricante" (`DADOS_TECNICOS_KIENZLE_E_VC.md` §2.5) e a regra No Invention determina que "linha sem fonte não entra — a alternativa é inventar `kc1.1`, que é exatamente o que a regra proíbe" (`PLAN_MOTOR_CALCULADORA_V2.md` §4).
- ⚠️ **Conflito aberto:** `docs/ai/memory/PRODUCT_CONTEXT.md` (18/03/2026) afirma o contrário — "NÃO existe conceito de validado vs estimado". Ver §10.12.

### 5.8 Badge "manual" ✅

- **Mostra:** marca âmbar quando o parâmetro foi afastado do valor recomendado.
- **Por que existe:** "sem ele a edição vira armadilha: o operador perde a referência e não consegue voltar sem recarregar a tela" — `SPEC_PAINEL` §6.5.
- **Exceção:** escolher a ferramenta **não** recebe essa marca, porque "escolher ferramenta é configuração, não desvio da recomendação" (§4.3).

### 5.9 Os 3 gauges de meia-lua ✅

> 41 barrinhas em arco com agulha animada — `src/components/half-moon-gauge.tsx`.

| # | Gauge | Mostra | Escala | Por que existe |
|---|---|---|---|---|
| 5.9.1 | **Eficiência de Avanço** | avanço ÷ recomendado | centrada, até 150% | "verde no meio = 100% do limite; a escala vai a 150%, então sub e sobre-utilização ficam simétricas" — `SPEC_MULTI_FERRAMENTA` §1.4 |
| 5.9.2 | **Produtividade MRR** | volume vs referência de mercado (Desbaste 50 · Semi 20 · Acabamento 5 cm³/min) | crescente | MRR "é a base direta da energia que será gasta na máquina" — `blueprint` E4 |
| 5.9.3 | **Saúde da Ferramenta** | nota 0–100 | crescente, cortes em 40% e 76% | Pesos ap 0,4 · fz 0,3 · ae 0,2 · vc 0,1. A nota vem do **pior parâmetro, não da média**, porque "uma média 76 esconde um ap prestes a quebrar a ferramenta" — `SPEC_MULTI_FERRAMENTA` §1.3 |

- **Regra dos três:** são **somente leitura** e todos abrem a procedência (fórmula + valores substituídos + fonte).
  - Por que abrem procedência: "gauge calculado e nunca explicado foi reprovação registrada no ensaio de 14/08/2026" — `SPEC_PAINEL` §5.1.
  - Por que não se arrasta um gauge: "existem infinitas combinações que produzem o mesmo score — sem uma regra, o sistema teria de escolher qual parâmetro mexer, e essa escolha é justamente a decisão de engenharia que pertence ao operador" — §6.3.
- ⚠️ **Conflito aberto:** `blueprint_calculadora_cnc.md` E3/E5 manda **remover** o Índice de Saúde — "trata-se de uma aproximação visual e não reflete física real isolada". As specs de painel o mantêm como 3º gauge. Ver §10.10.

### 5.10 Barras segmentadas por parâmetro ✅

- **Mostra:** para Vc, fz, ae e ap — 50 segmentos (30 no mobile) com marcação da zona ideal e rótulo da zona.
- **Rótulos:**
  - **Vc** → Baixo · Sub-ótimo · Recomendado · Alerta · Desgaste
  - **fz** → Atrito · Leve · Ideal · Agressivo · Vibração
  - **ae** → CTF Alto · Ideal · Pesado · Excessivo (+ leitura em "% D")
  - **ap** → Leve · Padrão · Agressivo · Deflexão (+ leitura de "L/D"); mostra BLOQUEADO se L/D > 6
- **Por que existe assim:** "identidade de parâmetro não usa matiz — Vc, fz, ae e ap se distinguem por rótulo, posição e ordem, nunca por cor própria. A cor que aparece na barra de cada um é o **estado** daquele parâmetro" — `DS_TEMA_CLARO.md` §2 e §4.4, corrigindo o defeito registrado "uma cor com três significados ao mesmo tempo".

### 5.11 Zona ideal personalizada ✅

- **Mostra:** a faixa verde vira ±10% em torno do favorito salvo, em vez da faixa genérica.
- **Dispara:** só quando existe favorito para aquela combinação material + operação + tipo de ferramenta.
- **Por que existe:** "personalização por histórico de uso real" — `SPEC_MULTI_FERRAMENTA` §1.5.

### 5.12 Linha "AÇÃO:" no visor ✅

- **Mostra:** o que fazer, em uma frase:
  - Bloqueado → reduzir balanço ou aumentar diâmetro
  - L/D > 4 → reduzir balanço
  - CTF > 1,3 → aumentar ae ou reduzir fz
  - Vermelho → reduzir ap e ae
  - Amarelo → reduzir fz e monitorar vibração
- **Por que existe:** o alerta precisa de alvo numérico, "não só 'bloqueado'" — `SPEC_PAINEL` §5 Z2, §11.3.

### 5.13 Disclaimer ✅

- **Mostra:** "O sistema RECOMENDA, o operador DECIDE", texto fixo permanente.
- **Por que existe:** "operador é único responsável por aceitar/rejeitar/ajustar parâmetros; sistema é ferramenta de apoio, não autoridade técnica" — `PRD_MVP` §10.3. Separar recomendação de limite físico "é a diferença entre uma ferramenta que avisa e uma que se responsabiliza" — `PLAN_MOTOR_CALCULADORA_V2.md` §6.
- **Base numérica:** a margem de erro declarada do modelo é **±15–25%** (modelo 2D, corte ortogonal, sem temperatura).

### 5.14 Pulso de mudança de estado ✅

- **Mostra:** animação quando o nível de segurança muda — verde pulsa 1× em 900 ms; vermelho/bloqueado 2× em 450 ms.
- **Por que assim:** vermelho é "mais urgente"; `prefers-reduced-motion` zera toda a animação — `SPEC_MULTI_FERRAMENTA` §1.9.

### 5.15 Indicadores decididos e ainda não construídos

| # | Indicador | Status | Por quê |
|---|---|---|---|
| 5.15.1 | Camada separada de recomendação × **limite físico**, com override registrado | 🔜 | "limite físico nunca é ultrapassado em silêncio" — `SPEC_PAINEL` §1 P11 |
| 5.15.2 | Marca de "Modo Rápido" no resultado e no histórico | 📄 | "comparar depois um número 'rápido' com um número completo sem saber a origem gera desconfiança no produto inteiro" — §9.3 |
| 5.15.3 | Deflexão em µm contra a tolerância da peça | 🔜 | `PLAN_MOTOR_CALCULADORA_V2.md` §1 |
| 5.15.4 | Análise de chatter (lóbulos de estabilidade) | ❌ | "exige dados modais (FRF) da combinação máquina + fixação + ferramenta, que não temos e não dá para estimar — seria chute com aparência de ciência, o oposto do posicionamento de auditabilidade" — `SPEC_PAINEL` §15 |

### 5.16 Indicadores sem justificativa documentada

Existem nas specs, mas o projeto não registrou o motivo da escolha do número:

- Limiar de deflexão `δ ≤ 0,05 mm`
- Os cortes de 40% e 76% nos gauges crescentes
- Aviso de `ae/D < 10%` como crítico
- Aviso de `Vc < 50` ou `> 1000` m/min

---

## 6. Painel e interação

### 6.1 Layout desktop ✅

| # | Elemento | Detalhe |
|---|---|---|
| 6.1.1 | 2 colunas — configuração (400px) + resultados | mínimo 1360px de largura |
| 6.1.2 | Trilha guiada: Material → Ferramenta → Simular | `src/App.tsx` |
| 6.1.3 | Painel de resultados em **6 zonas** | cabeçalho · visor LCD · ferramenta · heróis RPM/Avanço · indicadores · detalhes e fórmulas |
| 6.1.4 | Abas do topo: Calcular · Favoritos · Histórico · Config | com contadores |

### 6.2 Controles

| # | Controle | O que faz |
|---|---|---|
| 6.2.1 | Botão **Simular** (rodapé fixo) | Executa o cálculo; vira "Atualizado" por 300 ms |
| 6.2.2 | Botão **reset** | Zera os ajustes manuais |
| 6.2.3 | **Slider bidirecional** −150%…+150% | Ajusta RPM e avanço direto no resultado, ±10% por clique |
| 6.2.4 | **Slider com ticks** (ajuste fino) | Marca o valor recomendado; botões ± |
| 6.2.5 | Botões ± em todos os campos | Alvo de toque grande |
| 6.2.6 | Acordeões ("⚙ Ajuste avançado", "Detalhes e Fórmulas") | Estado lembrado entre sessões |
| 6.2.7 | **Cartões de fórmula** (4: RPM, Avanço, MRR, Potência) | Fórmula + números substituídos + legenda das variáveis + dica |
| 6.2.8 | Botão "O QUE É …?" por parâmetro | Popover explicativo |
| 6.2.9 | **Visor LCD** de 3 linhas | ALERTA / AÇÃO / INFO |

### 6.3 Modais ✅

| # | Modal | O que faz |
|---|---|---|
| 6.3.1 | Editar Ferramenta | Tipo, diâmetro, raio de quina, Z, fixação, hélice (30/45/60°); valida raio ≤ D/2 |
| 6.3.2 | Editar Favorito | Muda Vc/fz/ae/ap + nota e **recalcula** o resultado |
| 6.3.3 | Reportar Bug | Descrição até 500 caracteres, opção de anexar o estado, gera e-mail |

### 6.4 Versão mobile ✅

| # | Elemento | Detalhe |
|---|---|---|
| 6.4.1 | 3 abas: Configurar · Resultados · Ajustar | com aviso de resultado novo |
| 6.4.2 | Alternador **HMI ↔ EDUC.** | Visor industrial ou modo educativo |
| 6.4.3 | Visor HMI | RPM e avanço gigantes com sliders compactos |
| 6.4.4 | Barras mini de indicador | Avanço · MRR · Saúde da Ferramenta |
| 6.4.5 | Alvos ≥48px + resposta tátil (vibração) | `src/utils/haptics.ts` |
| 6.4.6 | Aviso de modo offline | Banner |

### 6.5 Regras de painel especificadas

| # | Regra | Por quê |
|---|---|---|
| 6.5.1 | Botão principal no **rodapé**, fixo, 56px | "o fluxo é de cima para baixo; a ação principal encerra o fluxo. Botão no topo obriga o olho a voltar" — `SPEC_PAINEL` §2.3 |
| 6.5.2 | Herói visual reservado a **1–2 números** acionáveis | Princípio P7 |
| 6.5.3 | Máximo 4 gavetas, sem gaveta dentro de gaveta; cabeçalho fechado mostra resumo (`Geométrico — Ø10 · Z4 · L30`) | "gaveta que esconde valor sem resumo troca poluição visual por cegueira; é o erro clássico do accordion em HMI" — §7 |
| 6.5.4 | Ajuda `ⓘ` abre por clique e empurra o layout (não flutua) | "conteúdo que flutua se fecha ao interagir com o slider, que é exatamente o momento em que o operador quer ler" — §8 |
| 6.5.5 | Alvo ≥44px, contraste 4,5:1, hover nunca é caminho único, **zero requisição de rede** | operação com luva; oficina sem internet — §12 |
| 6.5.6 | **Recálculo híbrido**: formulário até o 1º Calcular, painel vivo depois | decidido 14/08 — §14.1. ⚠️ conflita com a Regra Crítica 7 do `CLAUDE.md`. Ver §10.11 |

### 6.6 Design system

| # | Item | Status |
|---|---|---|
| 6.6.1 | Tema **escuro** atual: cyan `#00D9FF`, verde neon `#39FF14`, glassmorphism | ✅ no app |
| 6.6.2 | Tema **claro** canônico: fundo `#F3F4F6`, cartão branco, marca laranja `#E85D04`, seleção índigo `#3730A3` | 🔜 `docs/design/DS_TEMA_CLARO.md` |
| 6.6.3 | Regra-mãe: **"Neon é marca. Área de trabalho é cinza. Cor é estado."** | 🔜 |
| 6.6.4 | Rampa única de estado: ok `#116631` · atenção `#7A4F00` · crítico `#A81E16` · info `#005E77` | 🔜 |
| 6.6.5 | Fontes locais, zero CDN — "numa oficina sem internet a tela abriria com fonte errada" | 🔜 |
| 6.6.6 | `DASHBOARD.md`, `UI_BRANDING.md`, `UI_DESIGN_SPEC_FINAL.md` estão **superados** pelo DS claro | — |

---

## 7. Ferramentas e configurações extras

### 7.1 Histórico ✅

`src/pages/history-page.tsx`

- Guarda as últimas **50** simulações.
- Filtros: material · operação · feedback · só favoritos.
- **Feedback do operador** por entrada: sucesso / quebra / acabamento ruim + notas livres.
- **Restaurar parâmetros** de uma entrada antiga.
- Exportar e importar em arquivo JSON.

### 7.2 Favoritos ✅

`src/pages/favorites-page.tsx`

- Até **50** favoritos, cada um com a foto completa do cálculo.
- Busca por texto, filtro por material/operação, ordenação por data ou material.
- **Usar** (aplica no painel) · **Editar** (recalcula) · remover com confirmação.
- Alimenta a zona verde personalizada (item 5.11).

### 7.3 Ferramentas salvas ✅

- Biblioteca própria, com nome gerado automaticamente (`Toroidal Ø10 - R1 - H20 - A4`).
- Agrupadas por faixa de diâmetro (≤6 · 6–12 · 12–20 · >20 mm).
- Carregar, editar, remover.

### 7.4 Configurações ✅ — 6 seções

| # | Seção | Conteúdo |
|---|---|---|
| 7.4.1 | Máquina | RPM e avanço máximos |
| 7.4.2 | Segurança | Limiares de L/D, multiplicadores de ap |
| 7.4.3 | Materiais | Criar/editar/apagar materiais + sobrescrever os de fábrica |
| 7.4.4 | Ferramentas | Biblioteca + faixas mín/máx/desejado por parâmetro |
| 7.4.5 | Exibição | Casas decimais (⚠️ sem efeito hoje) |
| 7.4.6 | Dados | Exportar/importar tudo em JSON · restaurar padrões (dupla confirmação) |

### 7.5 Outras telas ✅

| # | Tela | O que é |
|---|---|---|
| 7.5.1 | Mapa de arquitetura (`/architecture`) | Visualização de 8 grupos / 57 arquivos do sistema |
| 7.5.2 | Painel admin (`/admin`) | 9 páginas: dashboard, tarefas, caixa de entrada, erros, uso, analytics, flags, changelog, saúde |
| 7.5.3 | Política de privacidade | Página estática |
| 7.5.4 | Landing page (`landing/`) | Página de marketing — **não contém calculadora** |

### 7.6 O que **não** existe

| # | Item | Situação |
|---|---|---|
| 7.6.1 | Exportar PDF | ❌ "definitivamente fora do MVP v1.0.0" |
| 7.6.2 | Exportar o cálculo em CSV | ❌ CSV só existe no admin (tráfego diário) |
| 7.6.3 | Comparação lado a lado | 🟡 candidato não decidido |
| 7.6.4 | Perfis de máquina nomeados e salvos | 🔜 adiado para o motor v2 |
| 7.6.5 | Onboarding / tour / página de ajuda | ❌ não existe |
| 7.6.6 | Unidades imperiais (polegada) | ❌ "nenhuma fonte do projeto pede" — `SPEC_PAINEL` §15 |
| 7.6.7 | Login / sincronização entre aparelhos | ⏸️ pausado até usuários pedirem |
| 7.6.8 | `objetivoUsinagem` e `validatedSimulations` | ⚠️ existem no armazenamento, **sem nenhum controle na tela** |

---

## 8. Funções futuras

> Somente o que já foi decidido ou planejado por escrito. Nada aqui é sugestão nova.

### 8.1 Motor de cálculo v2 — especificado, não codificado

`docs/plans/PLAN_MOTOR_CALCULADORA_V2.md` — item 18 do backlog, ⬜ pendente.

| # | Função | Prioridade | Trava |
|---|---|---|---|
| 8.1.1 | Corrigir 5 defeitos de motor: campos lidos e nunca usados; tempo = NaN na broca de centro | 1 | — |
| 8.1.2 | Camada de **limite físico** separada da recomendação | 2 | — |
| 8.1.3 | Base de materiais **12 → 30+**, com procedência linha a linha. Ordem: P → M → K → N → S → H | 3 | — |
| 8.1.4 | **Vida da ferramenta** (Taylor, forma relativa): "+20% de Vc ≈ metade da vida", ligado ao slider de Vc | 4 | falta o expoente `n` por material |
| 8.1.5 | **Custo e tempo por peça**: `t = L/Vf` + custo-hora de máquina/operador + custo por aresta | 5 | — |
| 8.1.6 | **Deflexão em µm** contra a tolerância da peça | 6 | faltam `E`, regra de diâmetro efetivo e razão de forças |
| 8.1.7 | Refrigeração interna como fator real (muda limiar de pica-pau e avanço padrão) | — | falta fonte de catálogo |
| 8.1.8 | Fontes empacotadas no app (hoje vêm de CDN) | — | — |

**Fora do motor, com motivo declarado:** análise de chatter/lóbulos (exige FRF) · catálogo por machine learning (sem base) · micro-otimização de cálculo.

### 8.2 Painel v2 — decidido, aguardando execução

`SPEC_PAINEL_CALCULADORA_PARAMETROS.md` §14 + `gauntlet-calculadora-cnc-v2/research/BUILD_CONTRACT_REFACTOR.md`.

| # | Função | Decidido em |
|---|---|---|
| 8.2.1 | **Slider de agressividade** — um controle 0–100% conservador↔produtivo move Vc, fz, ae e ap juntos, respeitando o limite de cada um. Só na família Fresar | 14/08 |
| 8.2.2 | **Edição reversa** — editar o RPM recalcula o Vc; editar o avanço recalcula o fz | paridade com produção |
| 8.2.3 | **Recálculo híbrido** — formulário até o 1º Calcular, painel vivo depois | 14/08 |
| 8.2.4 | Perfil de máquina editável (4 campos) — classificado como **defeito**, não preferência | em fila |
| 8.2.5 | Ajuda contextual em gaveta inline, várias abertas ao mesmo tempo | 15/08 |
| 8.2.6 | Formulário enxuto — 6 campos mortos removidos | em fila |
| 8.2.7 | Campo "material da ferramenta" removido; "Família de Operação" → "Tipo de Usinagem" | 15/08 |
| 8.2.8 | Revestimento separado só na fresa inteiriça (vale 25% de Vc) | 15/08 |
| 8.2.9 | Laranja `#E85D04` = marca · índigo `#3730A3` = seleção e foco | 15/08 |
| 8.2.10 | **Modo Rápido** com 4 campos — corrige o Z fixo em 4, que hoje erra o avanço pelo dobro | planejado |
| 8.2.11 | Procedência de **todo** número, inclusive os 3 gauges | em fila |
| 8.2.12 | Zero dependência de rede | em fila |
| 8.2.13 | Gaveta de Vc mostrando o preço da vida da aresta | extensão futura, depende de 8.1.4 |

**Etapas restantes:** E2 ciclo 1 (**próximo passo, não iniciado**) → E3 ciclos 2+ → E4 relatório → E5 aplicar em produção (o plano da E5 ainda não foi escrito).

### 8.3 Candidatos levantados, **não decididos**

`docs/stories/story-007-candidates.md` (01/03/2026, "🟡 A definir com usuário"):

| # | Candidato |
|---|---|
| 8.3.1 | Comparação lado a lado de simulações |
| 8.3.2 | Painel de métricas do histórico (material mais usado, distribuição de segurança) |
| 8.3.3 | Multiplicadores de revestimento (TiAlN 1,40 · AlCrN 1,30 · TiN 1,10 · DLC 1,50 · PCD 2,00) — ⚠️ conflita parcialmente com 8.2.8 |
| 8.3.4 | Classes de rigidez de máquina (rígida 1,00 · média 0,85 · flexível 0,70) |
| 8.3.5 | Presets de operação (partida rápida) |

### 8.4 Visão de produto do Rafael — sem plano formal

`Rafael/Futuro do sistema.txt` — texto livre; nenhum item tem plano de execução:

- Lançar só com fresas de metal duro; depois expandir para **12 famílias** já mapeadas: broca de aço rápido · broca de alto avanço MD · cabeçotes com pastilha · broca canhão · broca espada · macho máquina HSS · macho máquina MD · brocas insertadas · pente de rosca · turbina · chanfrador · mandrilhador
- Ambiente de **compartilhamento de simulações validadas**
- **Rede social de fresadores** (perfil com habilidades, nível de programação, visível a empresários)
- Painel de trigonometria para ângulos · atalho para dividir valor por 2
- Localizador/editor de códigos G · conversor + lista de códigos conhecidos
- Checklist anti-erro · checklist de revisão da máquina · resolução de problemas
- Gestão de máquinas · gestão de processos de usinagem · área de cursos para iniciantes
- Conferência de imagem/dimensões da ferramenta (erros de catálogo)
- Sistema para o comprador de ferramenta ("ainda preciso estudar a possibilidade")

### 8.5 Já decidido **não fazer**

| # | Item | Motivo |
|---|---|---|
| 8.5.1 | Sliders no BigNumber · reposicionar badges · 3 gauges no visor · seção de warnings · botão "salvar como padrão" · explicações educacionais | reprovados na triagem — `ATUALIZACAO_DASH_APROVADO/CONTEXTO-PROXIMA-SESSAO.md` |
| 8.5.2 | Análise de chatter/FRF · catálogo por machine learning | sem base de dados |
| 8.5.3 | Torneamento · multi-usuário · integração CAM · G-code · IA/ML · gamificação | fora do MVP |

---

## 9. Versões cruzadas

| # | Versão | O que é | Estado |
|---|---|---|---|
| 9.1 | **App `src/`** | v0.12.1 no ar — fresa inteiriça, 9 materiais, 3 operações | ✅ ativo |
| 9.2 | **Sandbox v1** `gauntlet-calculadora-cnc/` | Maquete: 5 famílias × 9 tipos × 4 materiais de ferramenta | ✅ concluída 92/100 (12-13/08) |
| 9.3 | **Sandbox v2** `gauntlet-calculadora-cnc-v2/` | Maquete: 18 tipos → 4 famílias, 28 fórmulas, 12 materiais, tabela de roscas M3–M16, tema claro | ✅ construção 91/100 · 🔜 refactor parado na E2 |
| 9.4 | `PROTOTIPO_PAINEL_CNC_v2.html` | Painel de resultados completo: visor LCD, sliders ±150%, 3 gauges, cartões de fórmula | já implementado |
| 9.5 | `PROTOTIPO_VISUAL_VISOR.html` | Esqueleto de posicionamento do visor em 5 linhas | protótipo |
| 9.6 | `gauge.html` | Gauge meia-lua isolado (41 barras) | ✅ virou `half-moon-gauge.tsx` |
| 9.7 | `slider.html` | Barra segmentada isolada (50 segmentos) | ✅ virou `segmented-gradient-bar.tsx` |
| 9.8 | Planos `redesign-v0.8.0/` | 3→2 colunas, acordeão, biblioteca de ferramentas, favoritar | ✅ fases 1–6; 7/8 substituídas |
| 9.9 | Planos `v0.9/` | Input livre, Z em botões, favoritar, slider de segurança, visor HMI | ✅ concluídos |
| 9.10 | Planos `ATUALIZACAO_DASH_APROVADO/` | Triagem: 10 aprovados / 6 reprovados | ✅ 10 implementados |
| 9.11 | `stitch_visor_de_resultados_cnc/` | Proposta de design externa (glassmorphism escuro) | não adotada |

---

## 10. Conflitos abertos

> Divergências reais entre documentos, encontradas no cruzamento. **Nada aqui foi resolvido** — são pontos que precisam de decisão.

| # | Assunto | Lado A | Lado B |
|---|---|---|---|
| 10.1 | **Fórmula do CTF** | `1/√[1−(1−2ae/D)²]` (DECISOES, PRD_MASTER) | `fz/√(ae/D)` (CASOS_TESTE, ESPEC_CONSOLIDADA, blueprint) ← **é o do código** |
| 10.2 | **Valor do CTF** para ae/D = 0,20 | 1,41 | 2,24× |
| 10.3 | **Bloqueio de L/D** | > 6 (maioria) | > 5 · > 4 (ESPEC_CONSOLIDADA, PRD_MVP) |
| 10.4 | **Modelo de potência** | Kienzle `Fc·Vc/60000` | `MRR·Kc/(60000·η)` ← é o do código |
| 10.5 | **Kc do 1045** | 2165 | 2000 |
| 10.6 | **Rendimento (η)** | 0,80 | 0,85 ← é o do código |
| 10.7 | **RPM máximo padrão** | 24000 | 12000 ← é o do código |
| 10.8 | **Avanço máximo** | 2000 mm/min | 5000 ← é o do código |
| 10.9 | **Faixa de diâmetro** | 0,5–30 · 3–32 · 0,2–16 | 0,1–200 ← é o do código |
| 10.10 | **Índice de Saúde** | remover (blueprint E3/E5) | manter como 3º gauge (specs de painel) |
| 10.11 | **Momento do recálculo** | só ao clicar (CLAUDE.md regra 7) | híbrido/vivo (SPEC_PAINEL §14.1) |
| 10.12 | **Badge Estimado** | obrigatório (specs) | "não existe esse conceito" (PRODUCT_CONTEXT, 18/03) |
| 10.13 | **ap em acabamento** | 0,3×D | 0,2×D · 0,5 mm fixo ← código |
| 10.14 | **Ajuda contextual** | uma aberta por vez (DS) | várias abertas (SPEC_PAINEL §8.1) |
| 10.15 | **Vc do 1045 em desbaste** | 150–200 m/min | 80–120 m/min · 150–220 m/min |
| 10.16 | **Nº de colunas do layout** | 3 colunas (PRDs, UI_DESIGN_SPEC) | 2 colunas (SPEC_PAINEL) |

### 10.17 Defeitos conhecidos no código

| # | Defeito |
|---|---|
| a | `mc` existe em todos os materiais e **nunca entra em fórmula** — o Kienzle está pela metade |
| b | `raioQuina` é pedido na tela e **não alcança nenhum número** |
| c | `preferences.decimals` é salvo e **não muda a exibição** |
| d | `safetyRules.apMaxMult` é editável e **nenhum cálculo o consome** |
| e | O texto do fator de segurança ainda cita "Torque", que saiu da tela |
| f | Componentes mortos: `tool-summary-viewer.tsx`, `MetricCell`, `ProgressCard`, `SafetyBadge` |
| g | `FavoriteEditModal` duplica a linha de cálculo em vez de reusar |

---

## 11. Como verificar este documento

| O quê | Como |
|---|---|
| Cálculos | `npx vitest run tests/` — 1017 testes, 0 falhas no último fechamento |
| Tipos | `npx tsc --noEmit` — zero erros |
| Tela | `npm run dev` e comparar com os itens de §4 e §6 |
| Maquete v2 | abrir `gauntlet-calculadora-cnc-v2/mockup/index.html` no navegador |

Cada item é referenciável pela numeração — `5.9.2`, `10.4`, `8.2.1` — para conferência item a item.
