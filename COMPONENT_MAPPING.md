# COMPONENT_MAPPING.md — Mapeamento Exaustivo de Componentes

> **Protocolo:** Auditoria, Reconciliação e Migração do Design System  
> **Fases:** FASE 8 (Component Mapping), FASE 9 (Project-Only) e FASE 10 (Reference-Only)  
> **Data:** 16 de Setembro de 2026  
> **Projeto:** `ToolOptimizerCNC` (v2.0.0)  

---

## 1. Visão Geral do Mapeamento

Este mapeamento confronta cada componente existente no código real com a referência gráfica Vitasilix e com as especificações do Design System extraído (`output_tooloptimizer_ds`), detalhando sua estrutura, comportamento de chão de fábrica, acessibilidade e decisão normativa.

---

## 2. Fichas Técnicas de Componentes Canônicos

### 2.1 StepperInput (`ConfigForm.tsx` / `SettingsView.tsx`)
- **Conceito na Referência:** Input Stepper com microajuste $\pm$ para parâmetros de calibração médica (Prancha 11).
- **Correspondente no DS:** `InputStepper` (`components/input-stepper/InputStepper.d.ts`).
- **Implementação Real:** `StepperInput` em `src/ui/components/ConfigForm.tsx`.
- **Comparação Estrutural & API:**
  - *No DS:* `value: number`, `onChange: (val: number) => void`. Interface ingênua que pressupõe número puro contínuo.
  - *No Produto Real:* `value: number | string | undefined`, `onChange: (val: number | undefined) => void`, `decimals?: number`, `sym?: string`, `placeholder?: string`.
- **Comportamento Exclusivo do Produto (Área Protegida):**
  - Permite digitação livre de números decimais com vírgula ou ponto (`0,25` ou `0.25`) sem perda de foco do cursor.
  - Suporta estado inicial zerado (`undefined`), exibindo placeholder de engenharia (`Ex: 10`, `Ex: 2.00`).
  - Tratamento de precisão por ponto flutuante via `toFixed(decimals)` evitando dízimas periódicas de JavaScript.
  - Alvos de toque industriais de 44x44px nos botões laterais de incremento e decremento.
- **Acessibilidade:** `aria-label` completo, controle de foco com anel ciano neon e suporte a teclado nativo.
- **Decisão:** **`PRESERVE & ADAPT`**. A implementação do produto é muito superior e atende à realidade de chão de fábrica. O Design System normativo deve adotar a especificação estendida do produto.

---

### 2.2 Botão Calcular CTA (`#btn-calcular`)
- **Conceito na Referência:** Botões de ação imediata e disparo de comando em Lime elétrico `#BDFF4B` (Pranchas 04 e 13).
- **Correspondente no DS:** `Button` variante `action`, tamanho `lg` com `fullWidth` (`components/button/Button.d.ts`).
- **Implementação Real:** `#btn-calcular` com classe `.btn-cta` em `ConfigForm.tsx` e `MobileStickyBar.tsx`.
- **Comparação de Estados:**
  - *Desabilitado:* Opacidade reduzida (`0.45`), cursor bloqueado, mensagem explicativa de requisitos ausentes.
  - *Habilitado / Pronto:* Lime vibrante (`#3F700B` no light / `#BDFF4B` no dark) com pulso neon no hover.
  - *Calculado / Sincronizado:* Fundo ciano translúcido com checkmark e texto "Parâmetros Atualizados".
  - *Loading:* Spinner animado integrado via classe `.loading`.
- **Comportamento Responsivo:**
  - *Desktop:* 52px de altura no rodapé do `ConfigForm`.
  - *Mobile:* 48px de altura ancorado na barra fixa inferior (`MobileStickyBar`) para toque direto com o polegar.
- **Decisão:** **`PRESERVE & CONSOLIDATE`**. Manter todos os estados reativos da máquina de estados do produto e harmonizar a nomenclatura com as classes `.btn-action` do DS.

---

### 2.3 Hero Cards de Telemetria — Rotação S e Avanço F (`ResultsPanel.tsx`)
- **Conceito na Referência:** Mostradores de telemetria principal em tempo real com tipografia monoespaçada destacada (Prancha 04).
- **Correspondente no DS:** `TelemetryCard` (`components/telemetry-card/TelemetryCard.d.ts`).
- **Implementação Real:** `[data-hero="s"]` e `[data-hero="f"]` em `ResultsPanel.tsx` e `MobileResultsSheet.tsx`.
- **Comportamento Exclusivo do Produto (Área Protegida):**
  - Exibição em caracteres tabulares gigantes de 38px mono (`.rbig`) com formato brasileiro de milhar (ex: `4.456 rpm`, `891 mm/min`).
  - Botões táteis integrados de incremento e decremento passo a passo de $\pm 5\%$.
  - Tag de compensação dinâmica (ex: `ajuste +10 %`).
  - Linha inferior de auditoria com valor nominal calculado de fábrica e botão de retorno `⟲ Padrão`.
  - Em roscamento sincronizado: botões de ajuste de avanço são ocultados e substituídos pela trava mecânica "Rosqueamento Sincronizado".
- **Decisão:** **`PRESERVE`**. Funcionalidade central do produto que nenhuma biblioteca genérica substitui.

---

### 2.4 Safety Band — Semáforo de Segurança Z2 (`ResultsPanel.tsx`)
- **Conceito na Referência:** Banners e pílulas semânticas de alerta de monitoramento (Prancha 12).
- **Correspondente no DS:** `StatusBadge` (`components/status-badge/StatusBadge.d.ts`).
- **Implementação Real:** `.alert-band` em `ResultsPanel.tsx` e `MobileResultsSheet.tsx`.
- **Comportamento:**
  - 3 níveis de precedência analítica: NORMAL (verde esmeralda), ATENÇÃO (âmbar), CRÍTICO (vermelho carmim).
  - Chip de status em caixa alta com dot e borda translúcida.
  - Texto explicativo em prosa técnica informando a razão física (ex: relação de balanço $L/D > 4$ ou potência excedente).
- **Decisão:** **`PRESERVE`**. Cumpre perfeitamente a função de segurança de máquina e integridade de ferramenta.

---

### 2.5 Resumo Físico Z7 — Grandezas Analíticas (`ResultsPanel.tsx`)
- **Conceito na Referência:** Grade de cartões de telemetria secundária de eixos e atuadores (Pranchas 04 e 05).
- **Correspondente no DS:** `TelemetryCard` compacto e tabelas técnicas.
- **Implementação Real:** Grid de cartões compactos em `ResultsPanel.tsx`.
- **Grandezas Exibidas:**
  - $h_m$ (espessura média do cavaco em mm)
  - $h_{ex}$ (espessura máxima do cavaco em mm)
  - $CTF$ (fator de afinamento de cavaco)
  - $L/D$ (relação balanço / diâmetro)
  - $k_c$ (força específica de corte Kienzle em $\text{N/mm}^2$)
  - $MRR / Q$ (taxa de remoção em $\text{cm}^3/\text{min}$)
  - $v_c$ real (velocidade de corte real na aresta)
  - $P_c$ (potência líquida em kW)
  - $M_c$ (torque na árvore em $\text{N}\cdot\text{m}$)
- **Decisão:** **`PRESERVE`**. Alta densidade informacional perfeitamente aderente à referência estética de Vitasilix.

---

### 2.6 Educational Drawers D11, Z5 e Z6 (`ConfigForm.tsx` / `ResultsPanel.tsx`)
- **Conceito na Referência:** Gavetas laterais e painéis colapsáveis com dados aprofundados (Prancha 14).
- **Correspondente no DS:** Gavetas documentadas na Seção 08 do `showcase.html`.
- **Implementação Real:** `.drawer` com gatilho em chevron rotativo a 90°.
- **Comportamento:** Permite ao operador expandir explicações de engenharia em quatro quadrantes: "O que é", "▲ aumentar", "▼ diminuir" e "Equilíbrio", sem poluir o fluxo de entrada.
- **Decisão:** **`PRESERVE`**. Excelente padrão cognitivo de usabilidade.

---

## 3. Tratamento de Componentes PROJECT-ONLY (Fase 9)

Componentes que existem legitimamente no produto e não constam na referência médica:

| Componente | Função no Produto | Justificativa de Existência | Decisão | Ação Reconciliada |
| :--- | :--- | :--- | :--- | :--- |
| **FamilyNav** | Navegação por abas entre Fresar, Furar, Roscar e Mandrilar com *Roving Tabindex* WAI-ARIA | O produto atende 4 famílias de processos de usinagem com regras físicas distintas. | `PRESERVE` | Preservar 100% do comportamento ARIA e teclado. |
| **MobileCalculator & MobileShell** | Casca mobile com Bottom Sheet modal deslizante e barra fixa de rodapé | Operadores utilizam smartphones no chão de fábrica ao lado das máquinas CNC. | `PRESERVE` | Preservar a experiência monomanual e áreas de toque de 44px. |
| **SettingsView** | Painel completo de persistência de ferramentas da oficina, materiais e margem global | Sistema offline-first que salva preferências no IndexedDB do navegador. | `PRESERVE` | Preservar toda a persistência local e confirmações de deleção. |
| **IdentityChips (`.z1-chip`)** | Chips dinâmicos no cabeçalho exibindo material ativo, ferramenta e diâmetro | Feedback contextual imediato para o operador não perder o foco do setup ativo. | `PRESERVE` | Preservar no cabeçalho desktop e na context bar mobile. |

---

## 4. Tratamento de Componentes REFERENCE-ONLY (Fase 10)

Componentes observados na referência médica que NÃO constam no produto atual:

| Componente da Referência | Função Original na Endoscopia | Necessidade no ToolOptimizer CNC | Decisão | Justificativa |
| :--- | :--- | :--- | :--- | :--- |
| **Video Scrub Bar & Timeline** | Linha do tempo de reprodução de exame endoscópico | Nenhuma | `EXCLUDE` | A calculadora não processa vídeo nem sequências temporais gravadas. |
| **Floating Pill Toolbar (999px)**| Barra flutuante de ferramentas de exame | Baixa | `DOCUMENT/DEFER`| O layout do produto já possui cabeçalho superior e navegação de famílias em abas fixas. |
| **Precision Slider com Régua (Ticks)**| Ajuste fino milimétrico de câmera e avanço | Média (potencial futuro) | `ADAPT IN SHOWCASE`| Mantido no catálogo do Design System (`showcase.html`) para futura adoção em ajustes de parâmetros. |
| **Controle de Eixos 3D (Roll/Pitch/Yaw)**| Orientação espacial de robô no corpo | Nenhuma | `EXCLUDE` | A máquina CNC opera nos eixos lineares $X, Y, Z$ e rotação do fuso $S$, sem orientação esférica de robô. |
