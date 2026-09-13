# Especificação Técnica — Nova Calculadora CNC Multi-Ferramenta

> **Propósito deste documento:** mapear tecnicamente o sistema atual de cálculo de parâmetros de corte do ToolOptimizerCNC (produção + versão anterior mais completa), documentar seu workflow lógico, investigar referências externas (FlowNC, GitHub, mercado) e consolidar uma especificação funcional para uma nova calculadora capaz de suportar múltiplos tipos de ferramenta e múltiplos tipos de cálculo.
>
> **Não é um plano de implementação.** Não define código, nomes de arquivo definitivos, nem cronograma. É o insumo que um agente de implementação deve ler antes de desenhar a arquitetura concreta.
>
> **Fontes:** leitura direta de código-fonte (`src/**`), histórico git (`0fca280`, pré-redesign 80/20), documentos do projeto (`docs/plans/REDESIGN_DASHBOARD_80-20.md`, sessões arquivadas), dois projetos locais de referência (FlowNC, MestreCNC) e pesquisa externa (G-Wizard, HSMAdvisor, FSWizard, fabricantes de ferramenta, repositórios open-source). Nada aqui foi inventado — onde uma fonte diverge de outra, isso é sinalizado explicitamente.

---

## Índice

1. [Sistema atual em produção (HEAD)](#1-sistema-atual-em-produção-head)
2. [Workflow lógico de configuração](#2-workflow-lógico-de-configuração)
3. [Sistema anterior — pré-redesign 80/20](#3-sistema-anterior--pré-redesign-8020)
4. [Referências externas](#4-referências-externas)
5. [Arquitetura funcional para múltiplos tipos de ferramenta](#5-arquitetura-funcional-para-múltiplos-tipos-de-ferramenta)
6. [Especificação consolidada](#6-especificação-consolidada)
7. [Inconsistências conhecidas a resolver](#7-inconsistências-conhecidas-a-resolver)

---

## 1. Sistema atual em produção (HEAD)

### 1.1 Visão geral de arquitetura

```
App.tsx (rota "/") ──┬── HeaderNav (Calcular · Favoritos · Histórico · Config)
                      ├── FlowStep (indicador textual "Material → Ferramenta → Simular")
                      ├── ConfigPanel (coluna esquerda, 400px)
                      │     └── FineTunePanel (embedded)
                      └── ResultsPanel (coluna direita, resto da largura)

src/store/           machining-store.ts (estado + cálculo) · favorites-store.ts · history-store.ts
src/engine/          rpm.ts · feed.ts · power.ts · chip-thinning.ts · validators.ts
                      recommendations.ts · slider-bounds.ts   (todas funções puras)
src/utils/           health-score.ts (motor do gauge "Saúde da Ferramenta")
src/hooks/           use-simulation-animation.ts · use-reset-feedback.ts (órfão) · use-is-mobile.ts
```

O sistema é **desktop-only** (`min-width: 1360px`), com uma árvore paralela de componentes mobile (`src/components/mobile/*`) fora do escopo deste mapeamento.

### 1.2 Store e a regra real de auto-recálculo

O `CLAUDE.md` do projeto documenta a regra como: *"setMaterial/setFerramenta/setTipoOperacao/setParametros/setSafetyFactor zeram resultado=null mas NÃO chamam calcular(). Exceção: setLimitesMaquina."* O código real (`src/store/machining-store.ts`) é mais sutil que isso — existe uma flag `liveCalculationEnabled: boolean` (default `false`) que só vira `true` dentro de `simular()`, ou seja, **depois do primeiro clique em "Simular"**.

| Fase | Comportamento de `setMaterial/setFerramenta/setTipoOperacao/setParametros/setSafetyFactor` |
|---|---|
| Antes do 1º clique em Simular (`liveCalculationEnabled=false`) | zeram `resultado=null`, **não** chamam `calcular()` — bate com a regra documentada |
| Depois do 1º clique em Simular (`liveCalculationEnabled=true`) | chamam `calcular()` automaticamente a cada mudança — modo "live" |

Actions que **sempre** chamam `calcular()` incondicionalmente, independente da flag: `ajustarParametros` (sliders Fine-Tune), `setLimitesMaquina`, `setManualRPM(Percent)`/`setManualFeed(Percent)`/`setParamPercent`/`clearManualOverrides` (sliders bidirecionais de RPM/Avanço), `setSafetyRules`, `importSettings`.

O botão "Simular" nunca desaparece nem é desabilitado — ele é o gatilho que liga o modo live, sempre gera uma entrada de histórico e registra uso (admin). Isso é relevante para a nova arquitetura: **o modelo mental é "primeiro compromisso consciente, depois live update"**, não "sempre manual" nem "sempre live".

### 1.3 Engine de cálculo puro (`src/engine/*`)

Todas as funções são puras, sem acesso a store, com fórmula e fonte técnica citadas no próprio código:

| Função | Fórmula | Fonte citada |
|---|---|---|
| `calculateRPM(vc, d)` | `n = (Vc×1000) / (π×D)` | ISO 3685:2017, Sandvik Coromant p.142 |
| `calculateFeedRate(fzEfetivo, z, rpm)` | `Vf = fz_ef × Z × n` | Sandvik Coromant 2023 p.142 |
| `calculateEffectiveFz(fz, ae, d)` | CTF: se `ae/D ≥ 0.5` sem correção; senão `fz_corr = fz/√(ae/D)` | Sandvik Coromant — Modern Metal Cutting 2023 |
| `calculateMRR(ap, ae, vf)` | `Q = (ap×ae×Vf)/1000` [cm³/min] | ASM Handbook Vol.16, DIN 6584 |
| `calculatePower(mrr, kc, η)` | `Pc = (Q×Kc)/(60000×η)` [kW] | — |
| `calculateTorque(power, rpm)` | `M = (Pc×9549)/n` [Nm] | — |
| `validateLDRatio(l, d, thresholds)` | zonas por `L/D`: ≤3 verde, (3,4) amarelo, [4,6] vermelho, >6 bloqueado | regra de projeto (MVP) |
| `validateInputs(params)` | valida `d,ap,ae,fz,vc>0`, `ae≤d`, `z≥1` | — |
| `validateMachineLimits(values, limits)` | avisos textuais (não bloqueia) quando RPM/potência/avanço excedem limites da máquina | — |

**Motor de recomendação** (`recommendations.ts`, `getRecommendedParams`): tabelas Vc/fz hard-coded por grupo de material (Grupo 1: aços 28-34 HRC, Grupo 2: 38-43 HRC, Grupo 3: baixo carbono, Alumínio, com Cobre e Nylon derivados de Alumínio) × operação (Desbaste/Semi/Acabamento), com interpolação linear por diâmetro. Multiplicadores de `ae` e `ap` variam por operação e ISO do material (ver tabela completa na seção 5).

**Bounds dinâmicos dos sliders** (`slider-bounds.ts`, `calcularSliderBounds`): recalcula `{min, max, step, recomendado}` para Vc/fz/ae/ap a cada mudança de material/ferramenta/operação. `ae.max = D` (limite físico — não pode exceder o diâmetro da ferramenta). `ap.max` tem cap de segurança: se `balanço/D > 6`, força `max=0.1` independente de tudo mais. Existe um mecanismo de override por ferramenta individual (`ferramenta.paramRanges`) já presente no tipo mas não exposto na UI hoje.

**Health score** (`src/utils/health-score.ts`, motor do 3º gauge): calcula `ratio = valor/recomendado` para cada um dos 4 parâmetros e interpola numa curva de penalidade — `ap`/`ae` só penalizam por excesso (cortar de menos é conservador), `vc`/`fz` penalizam nos dois sentidos. Pesos: `ap:0.4` (deflexão quebra ferramenta — domina), `fz:0.3`, `ae:0.2`, `vc:0.1` (desgaste é lento). **A severidade final vem do pior parâmetro individual, não da média** — decisão de projeto explícita no código ("a 76 average hides an ap about to snap the tool"). `L/D > 6` é hard-block: score 0, ignora tudo mais.

### 1.4 Os 3 gauges — um único componente, três configurações

Existe **um único componente** `HalfMoonGauge` (arco de meia-lua -90°/+90°, 41 barras, agulha animada), reutilizado 3 vezes com props diferentes — não são 3 componentes distintos:

| Gauge | O que mostra | `value`/`maxValue` | `colorMode` | Interação |
|---|---|---|---|---|
| **Eficiência de Avanço** | Avanço calculado vs. limite da máquina | `avanco` / `limites.maxAvanco` | `centered` (verde no meio = 100% do limite; escala vai a 150%, então sub e sobre-utilização ficam simétricas) | nenhuma (read-only) |
| **Produtividade MRR** | MRR real vs. benchmark de mercado por operação (Desbaste 50 cm³/min, Semi 20, Acabamento 5 — Sandvik/Kennametal) | `mrrPct` (normalizado) / 100 | `centered` | nenhuma |
| **Saúde da Ferramenta** | `healthScore` (0-100) do motor de health-score | `healthScore` / 100, `scaleMax=100` (sem zona de overload) | `ascending` (vermelho→laranja→verde crescente, cortes em 40%/76% — mesmos cutoffs do cálculo) | nenhuma |

Nenhum dos 3 tem clique/hover — são readouts visuais puros, sincronizados por cor com o motor de cálculo (não são decorativos: as cores do gauge de Saúde usam os mesmos thresholds do `health-score.ts`).

### 1.5 Sliders

Dois componentes distintos, reutilizados em contextos diferentes:

- **`BidirectionalSlider`** — range fixo **-150% a +150%** em torno de um valor base (`baseRPM`/`baseFeed` calculados pela simulação). Usado no Herói do results-panel (RPM/Avanço, pós-simulação) para ajuste manual rápido. Preenchimento bidirecional (do centro para o lado escolhido), teclado (`←`/`→` = ±10%), botões ± (±10%), modo `compact` (thumb 20px) e `full` (thumb 28px, ticks a cada 10%).
- **`StyledSlider`** — unidirecional 0%→100% de um range arbitrário (min/max/step por prop). Usado no Fine-Tune (Vc/fz/ae/ap) e no Safety Factor. Tick extra opcional marcando o valor "recomendado" pelo engine. Teclado (Arrow = ±1 step), botões ± (±1 step).

Ambos compartilham resolução de cor via `slider-tokens.ts` (primary/secondary/accent-purple/accent-orange).

**Fine-Tune (`fine-tune-panel.tsx`)** tem uma camada extra de inteligência: se existir um favorito salvo para a combinação atual (material+operação+tipo de ferramenta), a "zona ideal" mostrada na barra de saúde do slider passa a ser ±10% do valor daquele favorito, em vez da faixa central genérica — personalização por histórico de uso real. Um `useEffect` faz clamp automático dos valores quando os bounds mudam (ex.: trocou diâmetro), sem interferir na inicialização.

### 1.6 Painel de Configuração — campos e comportamento

Ordem visual (ver seção 2 para o workflow lógico completo):

1. **Material** (select, 9 materiais fixos) — badge "⚠ Dados estimados" quando `status='estimado'`.
2. **Operação** (3 botões: Desbaste/Semi-Acabamento/Acabamento).
3. **Lista de ferramentas salvas** (agrupada por faixa de diâmetro, ações editar/remover sempre visíveis) + botão salvar ferramenta atual (bloqueia duplicata exata, feedback visual 2s).
4. **Tipo de fresa** (3 botões: Toroidal/Esférica/Topo) — reseta Z para o padrão do tipo ao trocar.
5. **Diâmetro** (input livre 0.1-200mm) + **Z/arestas** (stepper restrito ao catálogo `[2,3,4,6]`, lado a lado).
6. **Altura de Fixação/Balanço** (input livre 5-300mm) — alimenta a razão L/D.
7. **Parâmetros de Corte** — `FineTunePanel embedded` (os 4 sliders, sempre visíveis, não atrás de toggle).
8. **"⚙ Ajuste avançado"** (accordion colapsável, estado persistido em localStorage): Raio da Ponta (só se toroidal), Fator de Correção/Safety Factor (50%-100%, botões ± de 5%).
9. **Rodapé sticky**: botão Simular (label troca para "Atualizado" por 300ms) + botão reset (`restart_alt`, restaura `INITIAL_STATE` por completo).

### 1.7 Painel de Resultados — zonas

| Zona | Conteúdo | Estado vazio |
|---|---|---|
| 1. Console Header | timestamp · material · badge operação · chip SF (só se ≠80%) · badge de segurança (semáforo) · favoritar/editar favorito | — |
| 2. LCD digital | linha de alerta (prioridade bloqueado>vermelho>amarelo>verde) + linha "AÇÃO: {instrução textual específica}" | "AGUARDANDO SIMULAÇÃO — CONFIGURE PARÂMETROS E CLIQUE EM SIMULAR" |
| 3. Tool Row | spec compacta da ferramenta (`data-testid="tool-summary"`) | — |
| 4. Herói | RPM + Avanço em `text-6xl`, com `BidirectionalSlider` embutido, animação de contagem 0→valor (800ms, easing com overshoot) | `'—'` + CTA "Configure e clique em Simular" |
| 5. Indicadores | os 3 `HalfMoonGauge` + chips L/D e CTF (cor dinâmica) | ausente até 1ª simulação |
| 6. Detalhes e Fórmulas (colapsado por default) | grid Vc/fz/ap/ae com badge "manual" quando difere do recomendado · resumo Potência/VcReal/MRR · 4 `FormulaCard` (RPM, Avanço, MRR, Potência) | ausente até 1ª simulação |

O "estado vazio honesto" (não mostrar zeros como se fossem resultado real) é uma correção deliberada em relação à versão anterior (ver seção 3).

### 1.8 Área de explicação / estudo

Dois mecanismos distintos, ambos com a mesma fonte de verdade (o engine):

- **`FormulaCard`** (dentro de "Detalhes e Fórmulas"): fórmula simbólica + substituição numérica real + legenda de variáveis + barra de contexto (posição do valor entre 0 e o limite da máquina) + dica prática. Um card por resultado calculado (RPM, Avanço, MRR, Potência).
- **`ParamExplanation`** (dentro de cada slider do Fine-Tune): popover "O QUE É {PARÂMETRO}?" com texto educacional curto sobre o que o parâmetro representa fisicamente. Hover no desktop, clique no mobile.

Ambos são alimentados por texto estático associado a cada parâmetro/resultado — não há um "modo estudo" separado do fluxo operacional; a educação está embutida no mesmo painel usado para operar.

### 1.9 Animações e comportamento tempo-real

Nota de correção: a premissa inicial (spinner de loading, animações de 450ms/1350ms) **não corresponde ao código atual** — isso existiu numa fase anterior do projeto (ver `docs/_archive/sessions/2026-02-17-reset-feedback.md`) mas o comportamento hoje é mais simples:

- `useSimulationAnimation`: `isUpdated` (300ms, troca label do botão Simular→Atualizado) + `triggerPulse` (1500ms, dispara `subtlePulse` na Zona 5 sempre que o **nível de segurança muda** — verde pulsa 1x em 900ms, vermelho/bloqueado pulsa 2x em 450ms cada, mais "urgente").
- `HalfMoonGauge`: animação própria via `requestAnimationFrame`, 280ms, easing `easeOutCubic`, de 0 (ou valor anterior) até o alvo.
- `BigNumber` (Herói): contagem numérica 0→valor, 800ms, easing com leve overshoot (`easeOutBack`).
- `use-reset-feedback.ts` está **definido mas órfão** — não é importado em nenhum componente de produção atual, apesar de citado no CLAUDE.md do projeto como parte do sistema ativo. Cálculo síncrono, sem spinner de loading real.
- `@media (prefers-reduced-motion: reduce)` zera todas as durações globalmente.

### 1.10 Favoritos, Histórico, Ferramentas Salvas, Modais

- **Favoritos** (`favorites-store.ts`): máximo 50 (FIFO), cada item é um snapshot completo (material+ferramenta+parâmetros+resultado+SF+timestamp+nota do usuário). Identificação por "combo" (material+operação+tipo de ferramenta), não por igualdade exata de floats.
- **Histórico** (`history-store.ts`): máximo 50 (buffer circular), cada entrada tem feedback opcional (`sucesso`/`quebra`/`acabamento_ruim`), notas, filtros por material/operação/feedback. Só é escrito dentro de `simular()`.
- **Ferramentas salvas**: parte do estado principal (`machining-store`), agrupadas por faixa de diâmetro na UI, com modal de edição dedicado (`ToolEditModal`) que valida geometria (ex.: raio de quina ≤ diâmetro/2 se toroidal).
- **`FavoriteEditModal`**: permite editar Vc/fz/ae/ap e nota de um favorito já salvo, recalculando o resultado **fora** do store principal (replica o pipeline manualmente) — ponto de atenção arquitetural (duplicação de lógica de cálculo).

---

## 2. Workflow lógico de configuração

Ordem real de preenchimento e o grafo de dependências entre escolhas (não a posição física na tela — a lógica):

```
Material ─┬─→ vcRange (teto/piso de Vc) ──────────────→ bounds do slider Vc
          └─→ Kc, mc (força específica de corte) ─────→ Potência/Torque

Operação ─┬─→ tabela Vc/fz recomendada (Desbaste/Semi/Acabamento têm tabelas próprias)
          ├─→ multiplicador de ap (bounds + recomendado) — MAIOR diferença entre operações
          └─→ multiplicador de ae (bounds + recomendado)

Tipo de ferramenta ─→ habilita/desabilita campos específicos do tipo
                       (ex.: "Raio de Ponta" só existe se Toroidal)
                    ─→ reseta nº de arestas (Z) para o padrão do tipo

Diâmetro ─┬─→ repopula Vc/fz/ap/ae recomendados (interpolação em tabela por diâmetro)
          ├─→ ae.max = Diâmetro (limite físico absoluto)
          └─→ razaoLD = Balanço / Diâmetro

Balanço ──┬─→ razaoLD = Balanço / Diâmetro
          └─→ razaoLD > limite crítico → BLOQUEIA operação inteira,
              força ap ao mínimo, health score = 0

[Material + Operação + Diâmetro + Balanço] ──→ bounds dos 4 sliders de ajuste fino

Ajuste fino (Vc/fz/ae/ap) ──→ recalcula IMEDIATAMENTE (não espera "Simular")

Fator de Correção/Segurança ──→ multiplica só Potência e Torque no resultado final
                                 (não afeta RPM/Avanço/MRR/avisos de limite)

SIMULAR ──→ liga modo "live" (mudanças seguintes recalculam sozinhas)
         ──→ grava entrada no histórico
         ──→ popula results-panel por completo

[pós-Simular] Override manual de RPM/Avanço (slider -150%/+150%)
   ──→ independente do ajuste fino de Vc/fz
   ──→ realimenta o health score com os valores efetivos
```

**Princípio geral observado:** o sistema segue a ordem **"definir o quê antes de definir quanto"** — primeiro entidades categóricas (material, operação, tipo de ferramenta), depois dimensões geométricas (diâmetro, Z, balanço), só então parâmetros de corte contínuos (Vc/fz/ae/ap), e por último ajustes finos pós-cálculo (overrides manuais). Cada camada restringe/recalcula a seguinte — nada é livre até que as camadas anteriores estejam definidas (todas têm default, então tecnicamente nunca há campo vazio, mas a *recomendação* de cada camada depende inteiramente das anteriores).

---

## 3. Sistema anterior — pré-redesign 80/20

Contexto: em julho/agosto de 2026 o dashboard passou por um redesign documentado em `docs/plans/REDESIGN_DASHBOARD_80-20.md`, que partiu do código no commit `0fca280` (~45-50 elementos visuais simultâneos) para o estado atual (~15-18 elementos). Isso é relevante porque mostra uma iteração real de "o que foi tentado e depois removido por causar ruído" — sinal direto do que **não** replicar na nova calculadora sem motivo forte.

### 3.1 O que existia e foi removido ou simplificado

| Elemento | Antes (`0fca280`) | Depois (atual) |
|---|---|---|
| Seções de config | 4 `CollapsibleSection` paralelas, incluindo "Ajuste Fino" sempre aberta como seção própria | Campos essenciais soltos no fluxo + 1 toggle "Ajuste avançado" |
| Botão Simular | sticky no **topo** do painel | sticky no **rodapé** (fluxo termina na ação) |
| Ações editar/remover ferramenta salva | `opacity-0 group-hover:opacity-100` — invisíveis sem mouse, inutilizáveis em touch/luvas | sempre visíveis |
| Botões ± do Safety Factor | 28px (abaixo do alvo touch de 40px) | unificados em token `BUTTON_PM_TOUCH` (≥40px) |
| Results Panel | **8 zonas**: Console Header, LCD, Tool Row, RPM+Avanço (cards `fontSize:2rem`, "mais um card entre iguais"), 4 células read-only Vc/fz/ap/ae, Data Row (Potência·**Torque**·VcReal·MRR·L/D·CTF), 3 gauges, **5** FormulaCards (incluindo Torque) | 6 zonas nomeadas, RPM/Avanço como "Herói" `text-6xl` dominante, Torque removido |
| Torque na UI | aparecia em 2 lugares (Data Row + FormulaCard) | removido dos dois — mas o campo `torque` continua calculado no engine (`calculateTorque` existe, tipo ainda tem o campo) |
| Estado vazio | **"mentiroso"**: `EMPTY_RESULTADO` renderizava RPM 0/Avanço 0 como se fosse resultado real nas Zonas 4/5/6/7; timestamp caía em `Date.now()` mesmo sem simulação real | honesto: `'—'` no lugar de zeros, timestamp `null` sem fallback |
| Navegação Favoritos/Histórico | escondida no `SidebarFooter`, abaixo do ConfigPanel | `HeaderNav` visível no topo |

### 3.2 Achado relevante: Torque nunca foi validado

Confirmado tanto na versão antiga quanto na atual: `validateMachineLimits` (engine) **nunca** compara `resultado.torque` contra `limites.maxTorque` — só RPM, potência e avanço são checados. O card/linha de Torque na versão antiga era puramente decorativo (escala visual sem função de segurança real), o que justificou sua remoção. `maxTorque` permanece como constante no tipo de limites de máquina, sem uso funcional hoje.

### 3.3 O que isso ensina para a nova calculadora

1. **Zonas/campos que não alimentam nenhuma validação real tendem a virar ruído** — antes de adicionar um output visual num tipo de ferramenta novo, confirmar que ele conecta a alguma regra de segurança ou decisão, não só "mostra o número".
2. **Estado vazio deve ser honesto por padrão em qualquer novo tipo de cálculo** — nunca renderizar zero calculado como se fosse resultado real.
3. **Ordem sticky do CTA importa** — ação principal no fim do fluxo (rodapé), não no topo.
4. **Alvos de toque ≥40px e ações sempre visíveis (não hover-only)** são requisito não negociável, valem para qualquer tipo de ferramenta futura, especialmente pensando em uso no chão de fábrica (luvas).
5. **"Herói" visual (números grandes, glow) deve ser reservado para o output mais acionável** — na calculadora atual é RPM+Avanço; para outros tipos de ferramenta (furação, roscamento) o "herói" pode ser outro par de valores, mas o padrão de destacar só 1-2 números por tela deve se manter.

---

## 4. Referências externas

### 4.1 FlowNC — painel industrial CNC (projeto local, `Refatoracao_flowNC/`)

FlowNC não é uma calculadora de parâmetros de corte (é um editor/painel de G-code entre CAM e máquina), mas contribui padrões de arquitetura de HMI industrial diretamente aplicáveis:

- **Painel persistente com zonas fixas > Wizard sequencial**, para uso de alta frequência (dezenas de vezes/dia). Conclusão central do projeto: "nenhuma ferramenta única atende — o sistema precisa de múltiplas capacidades coexistindo, acionadas conforme o caminho que o contexto impôs", não um fluxo linear forçado. Para uma calculadora multi-ferramenta: **cada tipo de ferramenta/operação deve ser acessível diretamente**, sem forçar o operador a passar por um wizard genérico toda vez.
- **Ordem "definir regra antes de aplicar a um item"** reduz erro — reforça o padrão já observado na seção 2 (categórico → geométrico → contínuo → ação).
- Metodologia ISA-101.01 (documento `REGRAS-PAINEL-INDUSTRIAL - completo.md`, peça mais valiosa do projeto): fundo neutro com cor reservada só para anomalia; hierarquia overview→detalhe; design por tarefa (frequência × criticidade); Lei de Fitts (alvos grandes/próximos para ações críticas) e Lei de Hick (menos opções simultâneas = decisão mais rápida — ações que nunca coexistem na vida real não devem competir visualmente); confirmação proporcional ao risco (só em ação irreversível); preview antes de executar; estado do sistema sempre visível.
- Regra de não travar em um único "dialeto"/formato — se a nova calculadora algum dia exportar dados para múltiplos formatos de controlador/CAM, nunca fixar um único padrão.

### 4.2 MestreCNC — pesquisa de mercado (projeto local, `MestreCNC/`)

Portal de conteúdo institucional (não é ferramenta de cálculo), mas seus arquivos de pesquisa de concorrência (`pesquisa site usingem gpt.md`/`gemini.md`) trazem achados de mercado:

- **CNCCookbook/G-Wizard**: usa o medo do erro de cálculo manual (Kienzle, deflexão, MRR) como argumento comercial central — validação de que a dor "não confio no meu cálculo manual" é real no mercado.
- **Sandvik Coromant**: combina calculadora avançada com cartilha técnica de parâmetros/materiais como estratégia de marca.
- O mercado já trata RPM/Avanço/Kienzle como o "eixo nativo" esperado de qualquer ferramenta do domínio — alinhado ao que o ToolOptimizer já implementa.

### 4.3 Pesquisa externa (GitHub, mercado) — funções e padrões recorrentes

Investigação cobriu G-Wizard, HSMAdvisor, FSWizard, calculadoras de Sandvik/Kennametal/ISCAR, e repositórios open-source (`CNC-ToolHub`, `FreeCAD Path/CAM`, `pymachining`, entre outros menores).

**Funções recorrentes em praticamente todas as soluções:**
- Cálculo de RPM/avanço a partir de Vc, diâmetro, nº de flautas, avanço/dente (núcleo universal).
- Banco de materiais com fatores pré-carregados (evita usuário digitar Kc/dureza manualmente).
- Chip thinning radial (CTF) como calculadora/modo explícito, não só embutido silenciosamente.
- Estimativa de potência/torque do spindle comparada ao limite da máquina.
- Deflexão de ferramenta (viga em balanço) — próximo em espírito à regra L/D já existente.
- Avisos coloridos verde/amarelo/vermelho em tempo real.
- Biblioteca de ferramentas salvas com busca/import-export CSV/JSON.

**Parâmetros por família de ferramenta (o que diverge do núcleo comum):**

| Família | Parâmetros extras além do núcleo (Vc/RPM/fz/avanço) |
|---|---|
| Fresa topo reto/esquadro | diâmetro, nº flautas, ap, ae, WOC%, comprimento útil |
| Fresa toroidal | + raio de canto (afeta ap efetivo) |
| Fresa esférica | + diâmetro efetivo em função de ap, scallop height, ângulo de inclinação |
| Fresa de facear | + nº de insertos, ângulo de posição, ae relativo ao diâmetro |
| Broca | ângulo de ponta, profundidade de furo, peck depth, diâmetro efetivo na entrada |
| Macho de roscar | passo/TPI, diâmetro de broca-piloto, % engajamento de rosca |
| Fresa de rosca | passo, nº de filetes/passadas, diâmetro do furo |
| Torneamento | raio de ponta do inserto, ângulo de saída, DOC axial (não WOC), avanço **por rotação** (não por dente) |
| Alargador | sobremetal de alargamento, tolerância de furo |

Achado importante: **famílias diferentes usam modelos de cálculo estruturalmente distintos** — fresamento é `flautas × fz × RPM`, torneamento é avanço por rotação sem "flautas", furação tem lógica de profundidade incremental própria. Não é apenas "mais campos", é **fórmula diferente**.

**Padrão de workflow recorrente (praticamente universal):**
1. Selecionar/criar ferramenta (tipo + geometria).
2. Selecionar material (auto-popula Vc/Kc/fz recomendados).
3. Definir parâmetros de corte (ap/ae ou DOC, conforme o tipo).
4. Definir/selecionar máquina (rigidez, limites).
5. Opções avançadas (mostradas só se aplicável ao tipo).
6. Calcular → resultado + avisos.

Achado específico do HSMAdvisor: **o painel de parâmetros de corte muda de campo conforme o tipo de ferramenta selecionado** — Turning mostra só DOC, Milling mostra DOC+WOC. Ou seja, a troca de tipo de ferramenta não afeta só os campos de *definição* da ferramenta, mas também os campos de *parâmetros de corte* disponíveis na etapa seguinte.

**Padrões de UI recorrentes:** cores semáforo (já usado no ToolOptimizer), barras de gradiente horizontais mostrando posição do valor entre mín/máx, gauge semicircular tipo velocímetro para RPM (mesma família visual do `HalfMoonGauge` atual), slider de trade-off segurança↔produtividade que ajusta *múltiplos* parâmetros de uma vez (diferente do fine-tune atual, que ajusta parâmetro a parâmetro), botão "usar valor recomendado" por campo.

### 4.4 Padrões arquiteturais para suportar múltiplos tipos de ferramenta (achado central da pesquisa)

Três abordagens reais encontradas em código-fonte, comparadas:

| Abordagem | Exemplo | Extensibilidade a novo tipo | Custo | Risco |
|---|---|---|---|---|
| If/else monolítico | apps simples de single-file | baixa — cada tipo novo cresce o mesmo arquivo | baixo inicial | dívida técnica rápida |
| **Strategy Pattern por classe de cálculo** | `CNC-ToolHub` (Python) — `formulas/*.py` puras + `calculators/*.py` que despacham por tipo/tamanho | média — schema de dados ainda "flat"/único, extensão é no algoritmo | médio | campos opcionais nulos crescem por tipo |
| **Schema declarativo por tipo (template)** | `FreeCAD Path/CAM` — cada ferramenta é um JSON referenciando uma "Shape" que define seu próprio conjunto de propriedades; tipo novo = novo template, zero mudança de core | alta | alto (motor de template + validação) | over-engineering se o catálogo de tipos for pequeno no MVP |
| **Módulos ortogonais** (ferramenta × operação × material × máquina como eixos independentes) | `pymachining` (Python) — "operação" é entidade de primeira classe separada de "ferramenta" | alta para combinar eixos | médio | precisa de um ponto de dispatch para o cálculo final |

**Padrão que os projetos mais maduros convergem** (achado consolidado, não uma fórmula pronta): combinar um **schema declarativo por tipo de ferramenta** (cada tipo define sua lista de campos e qual fórmula usar — mais perto do padrão FreeCAD, mas sem geometria 3D) com um **dispatch de cálculo separado da definição de dados** (como no CNC-ToolHub: fórmulas puras + camada que escolhe qual usar). Isso evita tanto o if/else que cresce sem controle quanto a complexidade de um motor de templates geométricos que o MVP não precisa.

---

## 5. Arquitetura funcional para múltiplos tipos de ferramenta

### 5.1 Princípio central

```
Tipo de ferramenta  →  Schema de campos disponíveis  →  Fórmula/engine de cálculo  →  Apresentação de resultado
```

Cada elo dessa cadeia deve ser **dirigido pelo tipo**, não hardcoded para um caso único. O sistema atual do ToolOptimizerCNC já pratica uma versão inicial disso (3 tipos de fresa, campo "Raio de Ponta" condicional ao tipo Toroidal) — a extensão conceitual é generalizar esse condicionamento para qualquer família de ferramenta (fresamento, furação, roscamento, torneamento), não só variações dentro de fresamento.

### 5.2 O que muda por tipo de ferramenta (evidenciado pelo sistema atual + pesquisa externa)

| Camada | Exemplos do que varia por tipo |
|---|---|
| **Campos de definição da ferramenta** | fresa: diâmetro+Z+raio de canto; broca: diâmetro+ângulo de ponta; macho: passo+diâmetro nominal; ferramenta de torno: raio de ponta do inserto+ângulo de saída |
| **Campos de parâmetros de corte** | fresamento: ap+ae (dois eixos radial/axial); torneamento: DOC (um eixo) + avanço por rotação; furação: profundidade de furo + peck depth |
| **Fórmula de RPM/avanço** | fresamento: `F = fz×Z×RPM`; torneamento: `F = f×RPM` (sem Z); furação pode reaproveitar a fórmula de fresamento com Z=nº de gumes |
| **Validações de segurança específicas** | L/D (balanço) é crítico em fresamento; profundidade de furo/relação L/D de broca tem sua própria regra; torneamento tem sua própria lógica de deflexão de inserto |
| **Gauges/indicadores relevantes** | "Saúde da Ferramenta" hoje pondera ap/fz/ae/vc — para torneamento os pesos e os próprios parâmetros de entrada mudam |
| **Textos educacionais (`ParamExplanation`, `FormulaCard`)** | cada fórmula precisa de sua própria explicação simbólica e dica prática |

### 5.3 O que permanece universal (núcleo comum, não duplicar por tipo)

- Seleção de **Material** e sua tabela de Vc/Kc/dureza — o material da peça não muda por tipo de ferramenta, só a *faixa* usada dele.
- Seleção de **Operação** (Desbaste/Semi-Acabamento/Acabamento) como eixo ortogonal ao tipo de ferramenta — confirmado pela arquitetura `pymachining` (operação como entidade de primeira classe, independente da ferramenta).
- **Limites de máquina** (RPM/potência/torque/avanço máximos) — configuração de contexto, não de ferramenta.
- **Fator de Segurança** — multiplicador aplicado ao resultado final, independente do tipo.
- **Padrão de semáforo** (verde/amarelo/vermelho/bloqueado) como linguagem visual de segurança — deve se manter consistente entre tipos, mesmo que a regra que dispara cada cor mude.
- **Favoritos / Histórico / Ferramentas salvas** como mecanismos de persistência — devem funcionar por igual para qualquer tipo, desde que o snapshot inclua o tipo e seus campos específicos.
- **Padrão de "estado vazio honesto"** e **"ordem categórico → geométrico → contínuo → ação"** (seção 2 e 3.3) — regras de UX que não dependem do tipo de ferramenta.

### 5.4 Como o workflow varia por tipo (generalização do que já existe)

O sistema atual já demonstra o mecanismo, só que restrito a fresamento:

```
Passo 1: Família de ferramenta (fresamento / furação / roscamento / torneamento / ...)
   └─→ define QUAIS campos de geometria de ferramenta aparecem no Passo 2
   └─→ define QUAL fórmula de RPM/avanço/validação será usada
   └─→ define QUAIS parâmetros de corte aparecem no Passo 4 (ap+ae vs DOC vs profundidade+peck)

Passo 2: Tipo específico dentro da família (ex.: toroidal/esférica/topo dentro de fresamento;
          jobber/parabólica dentro de furação)
   └─→ pode habilitar/desabilitar sub-campos (ex.: Raio de Ponta só em toroidal)

Passo 3: Material (igual para todas as famílias — eixo ortogonal)

Passo 4: Parâmetros de corte (campos e fórmula definidos no Passo 1)

Passo 5: Ajuste fino (sliders — quantidade e identidade dos parâmetros variam por família)

Passo 6: Simular → resultado + gauges + fórmulas educacionais (específicos da família)
```

Isso é uma extensão direta do grafo de dependências da seção 2 — só adiciona uma "camada 0" (família de ferramenta) acima de "Tipo de ferramenta", que hoje é implícita (o sistema assume fresamento sempre).

### 5.5 Modelo de dados conceitual (não é código, é a forma da informação)

Para sustentar o princípio da seção 5.1 sem cair no if/else monolítico nem no over-engineering do schema-JSON-com-motor-de-template (ver comparação 4.4), a forma de dados sugerida pelas referências é:

1. **Definição de tipo de ferramenta** (declarativa): para cada tipo, uma lista de campos de geometria (nome, unidade, faixa válida, condição de exibição), uma referência a qual "família de cálculo" ele usa, e os textos educacionais associados.
2. **Família de cálculo** (função pura, testável isoladamente): recebe os campos daquele tipo + material + operação + limites de máquina, devolve o resultado (RPM/avanço/ou equivalente da família + validações + health score). Análoga ao `src/engine/*` atual, mas parametrizada por família em vez de assumir fresamento.
3. **Camada de apresentação genérica**: painel de config, painel de resultado, gauges e fórmulas educacionais **leem a definição declarativa do tipo** para saber o que renderizar, em vez de terem os campos hardcoded (como hoje `config-panel.tsx` tem "Diâmetro + Z" fixos no JSX).

Esse modelo é a extensão natural do que já existe: `SLIDER_VISUAL` (fine-tune-panel.tsx) já é uma mini-versão desse padrão para os 4 parâmetros de fresamento — a generalização é permitir que a *lista* de parâmetros varie por família, não só seus 4 já fixos.

---

## 6. Especificação consolidada

Checklist do que a nova calculadora precisa cobrir, para o agente que for desenhar a arquitetura concreta:

**Deve preservar do sistema atual (validado em produção, não regredir):**
- [ ] Regra "primeiro Simular = compromisso consciente, depois modo live" (seção 1.2).
- [ ] Estado vazio honesto (nunca zero como se fosse resultado real) — para qualquer tipo/família nova.
- [ ] Semáforo verde/amarelo/vermelho/bloqueado com bloqueio duro quando a regra de segurança do tipo é violada (hoje é L/D>6; cada família terá a sua).
- [ ] "Herói" visual reservado para os 1-2 outputs mais acionáveis daquela família de cálculo.
- [ ] Fórmula simbólica + substituição numérica + variável explicada (`FormulaCard`) para cada resultado calculado, qualquer que seja a família.
- [ ] Ajuste fino com bounds dinâmicos calculados a partir do contexto (material+ferramenta+operação), não fixos.
- [ ] Botões/áreas de toque ≥40px, ações sempre visíveis (nunca hover-only).
- [ ] Favoritos/Histórico/Ferramentas salvas como snapshot completo, funcionando por igual para qualquer tipo.

**Deve generalizar (hoje hardcoded para fresamento, precisa virar dirigido por tipo):**
- [ ] Campos de definição de ferramenta (hoje fixos: tipo/diâmetro/Z/raio/balanço).
- [ ] Campos de parâmetros de corte (hoje fixos: Vc/fz/ae/ap).
- [ ] Fórmula de cálculo principal (hoje fixa: `RPM→CTF→Avanço→MRR→Potência→Torque→L/D`).
- [ ] Regra de segurança crítica (hoje fixa: L/D balanço/diâmetro).
- [ ] Pesos e curvas do health score (hoje fixos para ap/fz/ae/vc de fresamento).
- [ ] Textos educacionais por parâmetro/resultado.

**Deve adicionar (não existe hoje, veio da pesquisa externa como padrão maduro/recorrente):**
- [ ] "Família de ferramenta" como camada acima de "tipo" (fresamento/furação/roscamento/torneamento).
- [ ] Operação como eixo explicitamente ortogonal a família+tipo (já é assim internamente, mas vale reforçar no modelo de dados).
- [ ] Considerar slider de trade-off agressividade↔segurança que ajusta múltiplos parâmetros de uma vez, como complemento (não substituto) do fine-tune parâmetro-a-parâmetro atual.

**Decisões de UX que já foram tomadas e testadas no redesign 80/20 (seção 3) — não reabrir sem motivo:**
- [ ] Painel persistente com zonas fixas, não wizard sequencial forçado (reforçado por FlowNC/ISA-101.01).
- [ ] Botão de ação principal no rodapé, sticky, fim do fluxo top-down.
- [ ] Accordion avançado fechado por default, com persistência da preferência do usuário.
- [ ] Nunca expor um output visual (card, chip, gauge) que não alimente nenhuma validação real — lição direta do caso Torque (seção 3.2).

---

## 7. Inconsistências conhecidas a resolver

Encontradas durante o mapeamento — não são bugs a corrigir agora, mas pontos que o agente de implementação deve resolver conscientemente (escolher uma fonte de verdade), não herdar por acidente:

1. **Multiplicador de `ap` em Acabamento diverge entre `recommendations.ts` (0.2×D) e `slider-bounds.ts` (0.5mm fixo, com comentário "validação Grok contra Kennametal/Sandvik")** — duas regras diferentes coexistem hoje para o mesmo cenário.
2. **Copy do Safety Factor ainda diz "Aplicado à Potência e Torque"** mesmo com o card de Torque removido da UI — texto residual do redesign 80/20, não atualizado.
3. **`tool-summary-viewer.tsx` duplica `data-testid="tool-summary"`** com a "Zona 3 — Tool Row" do results-panel — não está claro se um substitui o outro em telas diferentes (histórico/favoritos) ou se é código morto.
4. **`use-reset-feedback.ts` está documentado no CLAUDE.md do projeto como parte ativa do sistema, mas não é importado em nenhum componente de produção** — divergência entre documentação e código real.
5. **`FavoriteEditModal` replica manualmente o pipeline de `calcular()`** em vez de reusar a função do store — risco de os dois cálculos divergirem se um for alterado sem o outro.
6. **Campo `raioQuina` (Raio de Ponta) é armazenado mas não consumido por nenhuma fórmula do engine** — hoje é só exibição/nomenclatura, não afeta RPM/Avanço/MRR/Potência, o que pode surpreender quem espera que ele influencie o cálculo geometricamente (ex.: profundidade de corte efetiva em fresa toroidal).
