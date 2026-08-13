# Matriz de Critérios e Gates do Juiz Cego (Gauntlet v2)

> **CONGELADO EM E1.** Ninguém altera depois — nem Builder nem Juiz.
> Inspeciona o mockup `gauntlet-calculadora-cnc-v2/mockup/index.html` em relação à especificação multi-ferramenta, regras de HMI industrial (ISA-101) e tokens FlowNC DS (tema claro).

---

## Matriz de Pontuação (100 pontos)

### 1. Correção de cálculo e cobertura multi-ferramenta — 20 pts
Cálculos fiéis à SPEC §6 para as 4 famílias (Fresar, Furar, Roscar, Mandrilar) e 18 tipos de ferramenta.
Tratamento correto de casos de borda: `Def` de toroidal (`ap < r`) e esférica (`ap < D/2`), afinamento de cavaco `hm` (Woxén e por ângulo de posição `κ`), compensação de avanço em fresa de rosca (`Vf_centro < Vf_periferia`), avanço travado no passo para macho, profundidade por lado `ap = (Øf - Øi)/2` no mandrilamento, e fatores de material da ferramenta (HSS 0,29, HSS-Co 0,37, MD 1,00, MD revestido 1,25).
- **16-20 pts:** 100% dos cálculos precisos, casos de borda tratados e 18 tipos suportados corretamente.
- **10-15 pts:** Cálculos base corretos, mas com pequenos desvios em casos de borda ou em 1-2 tipos raros.
- **0-9 pts:** Erros de cálculo em fórmulas principais ou mais de 3 tipos de ferramenta incorretos.

### 2. Usabilidade operacional (tarefa frequente, modo rápido) — 15 pts
Consegue usar sem manual. Campos organizados na ordem natural de decisão do operador (Contexto → Dimensões → Parâmetros → Resultado). Modo de cálculo rápido funcional com exatamente 3 campos (Material da peça, Diâmetro e Operação) entregando rotação e avanço imediatos.
- **12-15 pts:** Fluxo intuitivo, modo rápido em 3 campos perfeito, zero hesitação no uso.
- **7-11 pts:** Usável com pequena hesitação; modo rápido exige interação extra desnecessária.
- **0-6 pts:** Confuso, requer adivinhação ou leitura de código para preencher.

### 3. Prevenção e recuperação de erro (semáforo com correção escrita) — 15 pts
Tratamento gracioso de entradas extremas ou inválidas (zero, negativo, vazio). Aplicação do semáforo de 4 níveis (Verde, Amarelo, Vermelho, Bloqueado) com aviso claro e **ação corretiva escrita em português** (ex.: "reduza ap para 2 mm ou a rotação para 4000 rpm"). Alertas de L/D por família, avanço mínimo em U-drill (`fn ≥ 0.05√D`), torque de máquina e furo prévio de rosca.
- **12-15 pts:** Todo erro/limite exibe semáforo e correção orientada por escrito; tela nunca trava.
- **7-11 pts:** Avisos presentes, mas algumas mensagens são genéricas sem ação numérica explícita.
- **0-6 pts:** Campos aceitam valores absurdos sem alerta, resultando em crash ou `NaN`.

### 4. Fluxo e estabilidade de layout — 12 pts
Trocar de tipo de ferramenta ou de família de operação **não reconstrói nem desposiciona a tela**. Rotação e Avanço permanecem fixos no mesmo pixel. Campos comuns (Material, Diâmetro) persistem seus valores. Campos específicos do tipo aparecem/somem suavemente sem provocar saltos de layout.
- **10-12 pts:** Transições suaves, zero reflow de elementos fixos, estado comum preservado.
- **5-9 pts:** Troca funciona mas com reflow perceptível ou perda ocasional de valores ajustados.
- **0-4 pts:** Trocar de ferramenta remonta o formulário do zero ou limpa todos os campos.

### 5. Conformidade HMI industrial — ISA-101 — 12 pts
Aplicação rigorosa dos princípios de HMI industrial: hierarquia visual clara, fundo neutro claro, cor reservada estritamente para estado/anomalia (semáforo), alvos de toque amplos (botões ≥ 44px, CTA 56px), tipografia em no máximo 4 tamanhos, e ausência de elementos puramente decorativos.
- **10-12 pts:** Total conformidade com ISA-101, alvos de toque adequados para operação com luva.
- **5-9 pts:** Pequenos desvios (ex.: cor usada decorativamente ou alvo de toque < 40px).
- **0-4 pts:** Interface poluída, visual festivo/decorativo, incompatível com painel industrial.

### 6. Clareza dos parâmetros e procedência do valor — 10 pts
Todo campo de entrada e saída possui rótulo em português, unidade de medida visível e indicação de procedência do valor (ex.: "Recomendado Sandvik P - Metal Duro", "Badge: Estimado").
- **8-10 pts:** Autoexplicativo, unidades 100% visíveis, origem do valor sempre clara.
- **4-7 pts:** Maioria dos campos clara, 1-2 unidades ou origens ausentes.
- **0-3 pts:** Jargões obscuros sem explicação, unidades ausentes.

### 7. Arquitetura declarativa percebida / extensibilidade — 6 pts
A UI demonstra de forma transparente a arquitetura declarativa da SPEC §10: o painel lê o schema do tipo selecionado e renderiza os campos específicos dinamicamente, mantendo o trilho de contexto e as zonas de resultado padronizados para os 18 tipos.
- **5-6 pts:** Extensibilidade e padrão declarativo claramente percebidos na navegação.
- **3-4 pts:** Leve inconsistência de apresentação entre diferentes tipos de ferramenta.
- **0-2 pts:** Cada tipo de ferramenta parece ter sido programado com um layout ad-hoc diferente.

### 8. Fidelidade aos tokens do FlowNC DS (tema claro) + fallback ToolOptimizer — 5 pts
Aderência total às especificações de `DESIGN_TOKENS.md`: uso dos valores Hex do FlowNC DS (`[data-theme="claro"]`), fontes IBM Plex Sans e IBM Plex Mono, escala de espaçamento de 4 a 64px, raios e sombras padronizados. Fallback ToolOptimizer restrito às opacidades alpha.
- **5 pts:** 100% dos tokens respeitados, palette limpa e fiel.
- **2-4 pts:** 1 a 2 desvios de cores Hex ou raios de borda fora do padrão.
- **0-1 pt:** Utilização de cores arbitrárias ou não conformes com o FlowNC DS.

### 9. Testes objetivos (Playwright) — 5 pts
Pontuação baseada no resultado determinístico dos 24 cenários executados via `npx playwright test`:
- **5 pts:** 24/24 cenários PASS.
- **3-4 pts:** 22-23 cenários PASS, sem falhas críticas.
- **0-2 pts:** < 22 cenários PASS ou qualquer falha em cenário crítico.

---

## Os 8 Gates de Qualidade (Binários — PASS / FAIL)

> **Regra dura:** Um único FAIL em qualquer gate reprova o ciclo inteiro, mesmo que o score seja ≥ 90.

1. **Gate 1 — Score mínimo:** Score total ≥ 90 / 100.
2. **Gate 2 — Cobertura dos 18 tipos (Novo):** Os 18 tipos de ferramenta são selecionáveis e cada um renderiza corretamente seus campos específicos sem erros de Javascript.
3. **Gate 3 — Sem falhas funcionais críticas:** Nenhuma ocorrência de `NaN`, `undefined`, `null` ou `Infinity` visível na UI, nem botões sem resposta ou cálculos manifestamente errados.
4. **Gate 4 — Console limpo:** Zero exceções não tratadas (`uncaught exception`) registradas no console do navegador durante a execução da suíte Playwright.
5. **Gate 5 — Prevenção contra entradas inválidas:** Entradas vazias, nulas ou negativas são tratadas graciosamente com mensagens corretivas por escrito, sem crash da tela.
6. **Gate 6 — Regras de bloqueio por família:** Bloqueios físicos implementados e operantes (Fresar L/D > 6, Mandrilar L/D > 5, Furo prévio insuficiente em roscamento, Torque de máquina excedido).
7. **Gate 7 — Fluxo de operação compreensível:** O Juiz cego consegue narrar o fluxo de uso e os passos requeridos pela tela sem consultar o código de testes.
8. **Gate 8 — Adequação ao chão de fábrica:** Juiz considera a calculadora pronta e adequada para uso diário por um operador no chão de fábrica (justificativa de 1 a 2 frases).

---

## Diretrizes de Avaliação do Juiz Cego

- O Juiz avalia o mockup em `gauntlet-calculadora-cnc-v2/mockup/index.html`.
- O Juiz recebe **apenas**: o arquivo do mockup, este arquivo de critérios, o `DESIGN_TOKENS.md` e o relatório numérico do Playwright.
- O Juiz **nunca recebe**: prompts do Builder, histórico de conversas ou justificativas de código.
- Para cada ciclo, o Juiz emitirá o veredito em `gauntlet-calculadora-cnc-v2/state/GAUNTLET_STATE.md` com:
  1. Tabela de notas por categoria (1 a 9).
  2. Tabela de status dos 8 gates (PASS / FAIL).
  3. Score final (0 a 100).
  4. Lista das **3 prioridades de correção** ordenadas pela gravidade (funcional → usabilidade → fluxo → clareza → organização → visual → cosmético).
