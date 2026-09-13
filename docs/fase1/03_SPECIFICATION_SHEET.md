# Specification Sheet — Single Source of Truth (SoT) — Fenix

> **Artefato Canônico da Fase 1 — Concepção e Planejamento AI-First**  
> **Status:** Aprovado e Vigente  
> **Data de Consolidação:** 07/09/2026  
> **Autoridade:** Este documento é a **Fonte Única de Verdade (Single Source of Truth)** para todos os contratos comportamentais, critérios de aceitação e testes automatizados do MVP do Fenix. Qualquer implementação de código deve obedecer estritamente aos cenários descritos aqui.

---

## 1. Regras Fundamentais do Sistema

1. **Calculadora Livre e Agnóstica (R1 / E0 §3.3):** Nada neste sistema trava, bloqueia, recusa ou força clamps arbitrários em valores digitados. Nenhuma entrada impede a entrega do resultado calculado. O erro é explicitado através do alerta visual e do nível de gravidade, nunca pelo silêncio ou pela recusa de cálculo.
2. **Human-in-the-Loop:** O sistema recomenda com base em leis físicas comprovadas; o operador decide o que programar na máquina CNC.
3. **Nomenclatura Obrigatória (Brief §11 / Gabarito §2.2):**
   - Famílias de Usinagem: **Fresar**, **Furar**, **Roscar**, **Mandrilar**.
   - Níveis de Segurança: **CRÍTICO**, **ATENÇÃO**, **NORMAL**.
   - Toda grandeza técnica na interface principal aparece com o termo por extenso seguido do símbolo entre parênteses. Exceções autorizadas:
     - Resumo compacto de montagem da ferramenta: formato de siglas maiúsculas (ex: `Ø10 · Z4 · L45`).
     - Gatilhos de blocos recolhidos: formato abreviado autorizado (ex: `Ø10 · Z4 · L45`).
   - Termos expressamente proibidos na interface: `modo rápido`, `modo detalhado`, `camada 1`, `camada 2`, `estimado`, `forçado`, `Sem fonte publicada`, `extrapolado`.
4. **Formatação Numérica (D8 / Gabarito §2.8):**
   - Separador de milhar é ponto (`.`): ex: `4.456 rpm`, `1.070 mm/min`.
   - Separador decimal é vírgula (`,`): ex: `0,018 mm`, `2,5 kW`.
   - Dígitos monoespaçados com alinhamento tabular (`tabular-nums`).
5. **Comportamento das Gavetas e Textos (D9 / Gabarito §2.8):**
   - Toda prosa descritiva, explicações e instruções nascem recolhidas por padrão, mesmo após o cálculo. Apenas o **alerta de integridade física** nasce aberto se houver condição ativa de atenção ou crítica.
6. **Precedência de Gravidade (E4 §2 / MVP §9.6):**
   $$\text{CRÍTICO} > \text{ATENÇÃO} > \text{NORMAL}$$
   Apresenta-se uma única orientação por vez, regida pela condição mais grave ativa. Se houver condições adicionais ativas, a interface indica textualmente a existência das demais sem poluição visual.

---

## 2. Contratos Comportamentais (Given / When / Then)

### Cenário 1: Cálculo Padrão de Fresamento com Fresa Toroidal (Caso Nominal Canônico)
*Rastreabilidade: US-04, US-05, US-09, US-11, MVP §7.6*

```gherkin
Cenário: Operador calcula parâmetros de fresamento para desbaste em Aço 1045
  Dado que o operador está no painel da família "Fresar"
  E selecionou o material "Aço 1045" (kc1.1 = 1500 N/mm², mc = 0,21, Vc de partida = 140 m/min)
  E selecionou a ferramenta "Fresa toroidal" de metal duro
  E informou os seguintes parâmetros geométricos e de montagem:
    | Campo                    | Símbolo | Valor informado |
    | Diâmetro                 | D       | 10 mm           |
    | Número de dentes/arestas | Z       | 4               |
    | Raio de canto            | r       | 1,0 mm          |
    | Balanço livre de fixação | L       | 45 mm           |
    | Profundidade de corte    | ap      | 2,0 mm          |
    | Penetração de trabalho   | ae      | 2,5 mm          |
    | Avanço por dente         | fz      | 0,06 mm/dente   |
  Quando o operador aciona o comando "Calcular"
  Então o sistema deve exibir uma confirmação visual imediata de recálculo (ícone check)
  E deve exibir os heróis de comando acionáveis:
    | Grandeza | Símbolo | Valor Exibido | Unidade |
    | Rotação  | S       | 4.456         | rpm     |
    | Avanço   | F       | 1.070         | mm/min  |
  E deve calcular os resultados de integridade física:
    | Indicador                  | Símbolo | Valor Calculado | Unidade  |
    | Relação balanço/diâmetro   | L/D     | 4,5             | adimensional |
    | Espessura média de cavaco  | hm      | 0,018           | mm       |
    | Potência de corte na aresta| Pc      | 0,42            | kW       |
    | Torque de corte            | Mc      | 0,9             | N·m      |
    | Taxa de remoção            | MRR     | 5,35            | cm³/min  |
  E deve acionar o nível de alerta "ATENÇÃO" devido ao balanço L/D de 4,5 (gatilho L/D > 4,0)
  E a mensagem de alerta deve situar o valor: "Balanço L/D em 4,5 excede a referência rígida de 4,0"
  E deve manter os cartões de S e F com controles de passo "−" e "+" de 5% habilitados.
```

---

### Cenário 2: Cálculo de Furação com Broca HSS no Modo do Mestre (Aço Rápido)
*Rastreabilidade: US-06, US-11, ESCOPO_BROCA_ACO_RAPIDO.md §2*

```gherkin
Cenário: Operador calcula parâmetros de furação com broca helicoidal de aço rápido ao cobalto
  Dado que o operador está no painel da família "Furar"
  E selecionou o material "Aço 1045"
  E selecionou a ferramenta "Broca helicoidal HSS-Co"
  E o modo ativo é a prática de oficina do Mestre:
    | Regra de Cálculo       | Expressão                                    |
    | Rotação (n)            | 318 * Vc / D                                 |
    | Avanço por minuto (vf) | 10% de n                                     |
    | Incremento pica-pau (Q)| D / 25, com saturação máxima em 0,8 mm       |
  E informou:
    | Campo            | Símbolo | Valor informado |
    | Diâmetro         | D       | 10 mm           |
    | Balanço de haste | L       | 50 mm           |
    | Velocidade corte | Vc      | 16 m/min        |
  Quando o operador aciona o comando "Calcular"
  Então o sistema deve exibir exatamente:
    | Grandeza           | Símbolo | Valor Exibido | Unidade |
    | Rotação            | S       | 508           | rpm     |
    | Avanço             | F       | 50            | mm/min  |
    | Passo de pica-pau  | Q       | 0,40          | mm      |
  E o avanço por rotação implícito deve ser exatamente fn = 0,10 mm/rot
  E o nível de integridade deve permanecer em "NORMAL".
```

---

### Cenário 3: Validação de Entrada Sem Bloqueio (Regra R1 — Sanidade Física)
*Rastreabilidade: US-13, E0 §3.3, GABARITO_PROTOTIPO.md §2.1*

```gherkin
Cenário: Operador informa penetração de trabalho maior que o diâmetro da fresa
  Dado que o operador está no painel da família "Fresar"
  E a ferramenta selecionada possui Diâmetro D = 10 mm
  E o operador digita a penetração de trabalho radial ae = 12 mm
  Quando o cálculo é disparado
  Então o sistema NÃO deve bloquear o campo, nem limpar o valor, nem exibir modal de erro
  E deve calcular as grandezas teóricas com o valor informado
  E o indicador de nível de segurança deve transicionar para "CRÍTICO"
  E o bloco de alerta deve abrir automaticamente informando:
    "CRÍTICO — penetração de trabalho (ae) 12 mm em fresa Ø10. A fresa corta no máximo 10 mm: o cálculo descreve remoção fora da aresta física."
```

---

### Cenário 4: Ajuste Fino Bidirecional de Rotação e Avanço (Passo ±5%)
*Rastreabilidade: US-16, Decisão D7, GABARITO_PROTOTIPO.md §2.8*

> **Corrigido em 09/09/2026.** Este cenário dizia ~~±10%~~ e o passo é **5%** desde a
> emenda do Mestre de 07/09/2026, registrada no `GABARITO_PROTOTIPO.md` **D7**. O número
> aqui ficou para trás; o protótipo (`STEP_PERCENT = 5`) é o contrato. Divergência **G** da
> especificação estrutural do painel.

```gherkin
Cenário: Operador ajusta a rotação calculada para reduzir ruído na máquina
  Dado que um cálculo foi executado entregando S = 4.456 rpm e F = 1.070 mm/min
  E a potência calculada na aresta é Pc = 0,42 kW
  Quando o operador toca no botão "−" (menos) do cartão de Rotação S
  Então a rotação deve ser reduzida em 5% do valor recomendado original:
    S_novo = 4.233 rpm
  E o avanço por dente (fz) deve ser recalculado para manter a integridade da cinemática
  E a potência de corte Pc e o torque Mc devem atualizar instantaneamente para os novos valores
  E o cartão de Rotação deve indicar visualmente que o valor está em regime de ajuste manual
  E deve ser exibido o atalho "⟲" para reverter ao valor recomendado de partida com um toque.
```

---

### Cenário 5: Criação de Material Customizado na Área Configurações
*Rastreabilidade: US-02, Decisão D2 e D12, ESCOPO_CONFIGURACOES.md §1*

```gherkin
Cenário: Operador cadastra novo material enviado pelo fornecedor com constantes próprias
  Dado que o operador navega para a área "Configurações"
  E seleciona o gerenciador de "Materiais"
  Quando o operador clica em "Adicionar Material" e preenche:
    | Campo                         | Símbolo | Valor informado |
    | Nome do material              | Nome    | Aço Ferramenta X|
    | Classe ISO                    | ISO     | P               |
    | Dureza estimada               | HB      | 260             |
    | Força específica de corte     | kc1.1   | 1850 N/mm²      |
    | Expoente de Kienzle           | mc      | 0,24            |
    | Velocidade de corte de partida| Vc      | 110 m/min       |
  E confirma a gravação
  Então o novo material deve ser persistido no armazenamento local do dispositivo
  E deve aparecer imediatamente disponível na lista de seleção do painel principal de cálculo
  E nenhuma requisição de rede deve ser disparada (R11).
```

---

### Cenário 6: Margem de Segurança como Lente de Exibição
*Rastreabilidade: US-21, Decisão de 01/09/2026, GABARITO_PROTOTIPO.md §2.3*

```gherkin
Cenário: Operador define margem de segurança conservadora em 85%
  Dado que o operador configurou a Margem de Segurança em "85%" na área Configurações
  E a Rotação calculada pelo motor físico é S_calc = 4.000 rpm
  E o Avanço calculado pelo motor físico é F_calc = 1.000 mm/min
  Quando o cálculo é exibido na tela principal
  Então a interface deve exibir os números reescalados pela lente de 85%:
    | Campo   | Valor Exibido |
    | Rotação | 3.400 rpm     |
    | Avanço  | 850 mm/min    |
  E os campos de entrada digitados pelo operador (D, L, ap, ae) NÃO devem ser alterados
  E os alertas de integridade física e o nível de segurança NÃO devem ser atenuados pela lente (R7/R15)
  E o cabeçalho do resultado Z1 deve exibir o distintivo "Margem: 85%".
```

---

## 3. Catálogo de Open Questions & Lacunas Físicas (No Loose Ends)

Em cumprimento estrito à regra **No Loose Ends**, o Fenix proíbe preenchimentos arbitrários de requisitos. Todas as lacunas de conhecimento e decisões em aberto estão registradas abaixo:

### 3.1 Lacunas Físicas Declaradas e Resoluções Canônicas

| # | Lacuna / Assunto | Contexto Técnico | Impacto no MVP & Pós-MVP | Status & Fontes Primárias Verificadas |
|---|---|---|---|---|
| **L1** | **Diâmetro Efetivo em Fresa Toroidal (\(a_p < r\))** | Modelagem geométrica de contato para corte raso com pastilha/aresta toroidal. | Gatilho 10 de alerta ativo quando \(a_p < r\); diâmetro nominal é usado com aviso. | **Declarada (MVP).** Obter folha primária de fabricante com cálculo de contato de raio raso. |
| **L13** | **Vida Útil de Ferramenta — Equação de Taylor (\(n\) e \(C\))** | Relação clássica \(V \cdot T^n = C\) para previsão de vida em função da velocidade de corte \(v_c\). | Previsão quantitativa de vida (minutos) é baseline de release Pós-MVP. No MVP, a previsão permanece qualitativa ("o que vai acontecer"). | ✅ **RESOLVIDA em 07/09/2026.**<br>• *HSS (M2)*: \(n = 0,10 - 0,15\), \(C = 60 - 80\text{ m/min}\) (1045) e \(n = 0,08 - 0,12\), \(C = 40 - 60\text{ m/min}\) (Inox).<br>• *Metal Duro*: \(n = 0,20 - 0,35\), \(C = 300 - 500\text{ m/min}\) (1045) e \(n = 0,18 - 0,30\), \(C = 180 - 350\text{ m/min}\) (Inox).<br>• *Cerâmica*: \(n = 0,50 - 0,70\), \(C = 2000 - 3000\text{ m/min}\).<br>**Fontes:** *Machinery's Handbook* (27ª ed., Internet Archive) e *ASM Handbook Vol. 16* (Tool Wear and Tool Life, DOI: 10.31399/asm.hb.v16.a0002130). |
| **L14** | **Rigidez Dinâmica e Coeficientes de Deflexão (Altıntaş)** | Modelo de rigidez em série (\(k_{tool}, k_{holder}, k_{spindle}, k_{structure}\)) e deflexão de viga em balanço: \(\delta = \frac{F \cdot L^3}{3 E I} = \frac{F}{k_{eff}}\). | Flecha de deflexão e rigidez acoplada a Taylor entram no módulo quantitativo Pós-MVP. No MVP, o alerta geométrico \(L/D > 4,0\) rege a segurança. | ✅ **RESOLVIDA em 07/09/2026.**<br>• *Rigidez Haste*: \(k_{tool} = 5.000 - 30.000\text{ N/mm}\).<br>• *Fixação/Holder*: \(k_{holder} = 20.000 - 80.000\text{ N/mm}\).<br>• *Spindle*: \(k_{spindle} = 50.000 - 200.000\text{ N/mm}\).<br>• *Estrutura Máquina*: \(k_{structure} = 100.000 - 500.000\text{ N/mm}\).<br>• *Coeficientes de Corte (1045)*: Tangencial \(K_{tc} = 1800 - 2500\text{ N/mm}^2\), Radial \(K_{rc} = 800 - 1400\text{ N/mm}^2\), Axial \(K_{ac} = 50 - 150\text{ N/mm}^2\).<br>**Fonte:** Yusuf Altıntaş, *Manufacturing Automation: Metal Cutting, CNC, and Vibration*, Cambridge University Press. |
| **L15** | **Multiplicador Contínuo de Parâmetros por Balanço (\(L\))** | Na fábrica, rotação e avanço caem a cada degrau de balanço longo; na bibliografia, o limiar dispara apenas alerta. | O MVP emite alerta de balanço (\(L/D > 4\)), mas não altera \(S\) e \(F\) em silêncio; o operador ajusta via botões \(\pm 10\%\). | **Declarada (MVP).** O sistema orienta via alerta e o operador ajusta no passo tátil. |

---

### 3.2 Open Questions (Decisões de Negócio e Implementação)

#### OQ-01: Formato de Exportação de Histórico Local
* **Pergunta:** O histórico de cálculos da máquina deve oferecer opção de exportação em arquivo texto local (`.csv` ou `.json`) para backup do operador em pendrive?
* **Contexto:** No MVP, o histórico reside exclusivamente em `localStorage` do navegador/webview.
* **Impacto:** Afeta a persistência em caso de limpeza de cache ou troca do terminal de fábrica.
* **Artefato Afetado:** `docs/fase1/02_STORY_MAP.md` (US-22) e `ESCOPO_CONFIGURACOES.md`.
* **Status:** Aberta leve (não bloqueante para Fase 2).

#### OQ-02: Limite Máximo de Ferramentas na Biblioteca Local
* **Pergunta:** A biblioteca de ferramentas customizadas do operador deve ter um teto máximo de registros (ex: 50 ou 100 ferramentas) para não degradar a performance de listagem em hardware de terminal industrial antigo?
* **Contexto:** Terminais CNC frequentemente utilizam microcomputadores x86 embarcados com baixa capacidade de processamento gráfico.
* **Impacto:** Afeta o componente de busca e paginação na tela `Configuracoes.dc.html`.
* **Artefato Afetado:** `Docs_inicial/mvp/ESCOPO_CONFIGURACOES.md` §4.
* **Status:** Aberta leve (não bloqueante para Fase 2).

#### OQ-03: Homologação Física de Bancada com Operadores Externos
* **Pergunta:** Necessidade de sessão de homologação externa em oficina terceira antes do início do código?
* **Contexto:** A concepção já foi verificada em entrevista de campo com fresador CNC em 26/08, os arquivos reais de fábrica foram absorvidos e o protótipo foi auditado e aprovado pelo Mestre (PO de domínio) no Gabarito v1.6.
* **Decisão do Dono do Produto (07/09/2026):** **DISPENSADA / DESCARTADA.**
* **Impacto:** Elimina qualquer impedimento externo. A Fase 1 está formalmente liberada e encerrada para início imediato do desenvolvimento na Fase 2.
* **Status:** ✅ **FECHADA / DESCARTADA.**
