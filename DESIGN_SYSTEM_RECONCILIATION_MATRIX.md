# DESIGN_SYSTEM_RECONCILIATION_MATRIX.md — Matriz de Reconciliação do Design System

> **Protocolo:** Auditoria, Reconciliação e Migração do Design System  
> **Fases:** FASE 4 (Comparação em Camadas), FASE 5 (Matriz) e FASE 6 (Classificação das Relações)  
> **Data:** 16 de Setembro de 2026  
> **Projeto:** `ToolOptimizerCNC` (v2.0.0)  

---

## 1. Princípios de Avaliação da Matriz

Esta matriz avalia simultaneamente:
$$\text{Referência Vitasilix} \times \text{Projeto Real (ToolOptimizerCNC)} \times \text{Design System Atual Extraído}$$

A classificação segue o princípio fundamental do protocolo: **diferença legítima de domínio não é defeito**. A referência é um console médico de endoscopia robótica, enquanto o projeto é uma calculadora de parâmetros de corte CNC de alta precisão para chão de fábrica.

---

## 2. Matriz Completa de Reconciliação

### 2.1 Foundations & Tokens Cromáticos

| Identidade | Referência Vitasilix | Projeto Real | DS Atual Extraído | Relação | Status | Impacto | Dif. Visual | Dif. Funcional | Dif. Estrutural | Dependências | Decisão | Justificativa | Intervenção |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Dark Master Surface** | Fundo `#000000` a `#0A0D12` | Fundo `--bg-page: #080C12` | Fundo `--bg-page: #0C1017` | Direta | `DIRECT_MATCH` | Baixo | Quase imperceptível (obsidiana profundo) | Nenhuma | Nenhuma | Todos os cartões dark | `PRESERVE` | O valor `#080C12` do projeto está mais próximo do `#000000` da referência do que o `#0C1017` do DS. | N0 |
| **Dark Card Surface** | Superfícies `#12161E` a `#161B24` | `--surface-card: #131B29` | `--surface-card: #121722` | Direta | `DIRECT_MATCH` | Baixo | Cartão titânio azulado com contorno hairline | Nenhuma | Nenhuma | Cards e painéis | `PRESERVE` | Consistência comprovada e certificada em 114 testes. Manter valor do produto e harmonizar no DS. | N0 |
| **Light Master Surface** | Não existe na referência (apenas dark) | `--bg-page: #F4F6F9`, `--surface-card: #FFFFFF` | `--bg-page: #F4F6F9`, `--surface-card: #FFFFFF` | Direta entre Projeto e DS | `INTENTIONAL_VARIANCE` | Médio | Interface clara de alto contraste para chão de fábrica sob sol | Nenhuma | Chaveamento por `[data-theme]` | Toda a UI no tema claro | `PRESERVE` | Requisito indispensável para usinagem em ambientes industriais com alta iluminação natural. | N0 |
| **Brand Primary (Ciano)** | Ciano Cirúrgico `#19E4BB` (60% dos realces) | Dark: `#19E4BB` / Light: `#0F766E` | Dark: `#19E4BB` / Light: `#0F766E` | Direta | `DIRECT_MATCH` | Médio | Destaque neon no dark e petróleo profundo no light | Feedback visual | Variável CSS `--brand-fill` | Ícones, foco, anéis | `PRESERVE` | Alinhamento 100% canônico. O ciano escuro `#0F766E` no light passa WCAG AA com folga (>5.4:1). | N0 |
| **Action Accent (Lime)** | Chartreuse `#BDFF4B` (20% dos realces) | Dark: `#BDFF4B` / Light: `#3F700B` | Dark: `#BDFF4B` / Light: `#4D7C0F` | Semântica | `INTENTIONAL_VARIANCE` | Médio | No light: `#3F700B` é ligeiramente mais denso que `#4D7C0F` | Nenhuma | Variável CSS `--action-fill` | Botão Calcular CTA | `PRESERVE` | `#3F700B` foi calibrado especificamente para garantir taxa de contraste >5.9:1 sobre texto branco no tema claro. | N0 |
| **Status Normal** | Verde telemetria nominal | Dark: `#00E5A3` / Light: `#166534` | Dark: `#00E5A3` / Light: `#166534` | Direta | `DIRECT_MATCH` | Baixo | Pílula verde esmeralda com fundo suave | Sinaliza estabilidade | `--st-normal-*` | Semáforo de segurança | `PRESERVE` | Identidade perfeitamente convergente entre as três fontes. | N0 |
| **Status Atenção** | Âmbar `#FFB020` | Dark: `#FFB020` / Light: `#854D0E` | Dark: `#FFB020` / Light: `#854D0E` | Direta | `DIRECT_MATCH` | Baixo | Pílula âmbar/dourada | Alerta balanço $L/D > 4$ | `--st-warn-*` | Semáforo de segurança | `PRESERVE` | Convergente. Norma de sinalização industrial internacional. | N0 |
| **Status Crítico** | Carmim `#FF4D4D` | Dark: `#FF4D4D` / Light: `#991B1B` | Dark: `#FF4D4D` / Light: `#991B1B` | Direta | `DIRECT_MATCH` | Baixo | Pílula vermelha vibrante | Alerta balanço extremo | `--st-crit-*` | Semáforo de segurança | `PRESERVE` | Convergente. Sinaliza risco de quebra ou colisão. | N0 |

---

### 2.2 Tipografia e Espaçamento

| Identidade | Referência Vitasilix | Projeto Real | DS Atual Extraído | Relação | Status | Impacto | Dif. Visual | Dif. Funcional | Dif. Estrutural | Dependências | Decisão | Justificativa | Intervenção |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Família Sans** | `Urbanist` (pesos regular, medium, semibold) | `Urbanist` (pesos 400 a 800) | `Urbanist` (pesos 400 a 800) | Direta | `DIRECT_MATCH` | Alto | Tipografia geométrica cirúrgica de alta legibilidade | Nenhuma | Importada via Google Fonts | Todos os textos da UI | `PRESERVE` | Decisão de design consagrada em todas as fontes. | N0 |
| **Família Mono / Tabular** | Tabular numbers monoespaçada para telemetria | `JetBrains Mono` com `tabular-nums` | `JetBrains Mono` com `tabular-nums` | Direta | `DIRECT_MATCH` | Alto | Caracteres de largura fixa sem oscilação no recálculo | Elimina layout shift | `--font-mono` | Hero cards, Z7 e steppers | `PRESERVE` | 100% convergente. Essencial para chão de fábrica. | N0 |
| **Escala de Espaçamento** | Módulo de precisão regular | `--sp-1: 4px` a `--sp-7: 48px` | `--sp-05: 2px` a `--sp-20: 80px` | Parcial | `PARTIAL_MATCH` | Médio | Espaçamento em múltiplos de 4px | Nenhuma | Nomenclatura das variáveis | Todo o CSS do produto | `CONSOLIDATE` | Manter a escala estrita base 4px e adicionar aliases/tokens estendidos no CSS sem quebrar seletores. | N1 |
| **Touch Targets Industriais** | Controles táteis amplos | `--h-target: 44px`, `--h-cta: 52px` | `--h-target: 44px`, `--h-cta: 48px` | Direta | `DIRECT_MATCH` | Médio | Botões com no mínimo 44px para toque com luvas | Previne erros de clique | Botões, steppers, abas | `PRESERVE` | 44px atende formalmente a norma WCAG AA para touch target; 52px no CTA garante destaque imediato. | N0 |

---

### 2.3 Componentes e Padrões Interativos

| Identidade | Referência Vitasilix | Projeto Real | DS Atual Extraído | Relação | Status | Impacto | Dif. Visual | Dif. Funcional | Dif. Estrutural | Dependências | Decisão | Justificativa | Intervenção |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Brand Plate** | Logotipo modular com símbolo e nome | Logo SVG inline com fresa em arco neon e texto `TOOLOPTIMIZER` | `Logo_Icon.svg` e `Logo_ToolOptimizer.svg` em `brand/` | Conceitual | `DIRECT_MATCH` | Médio | Mesma geometria canônica em arco com rastro de avanço | Nenhuma | No produto é SVG inline; no DS é arquivo SVG | HeaderZ1, MobileHeader | `PRESERVE & CONSOLIDATE`| A geometria do produto e do DS já está sincronizada. Manter ativos em `brand/` e SVG inline no React. | N0 |
| **Stepper Input** | Stepper com botões laterais $\pm$ | `StepperInput` em `ConfigForm.tsx` (suporta vírgula, ponto, nulo, formatador) | `InputStepper` (`.d.ts` simples com `value: number`) | Conceitual | `CONCEPTUAL_MATCH` | Alto | Ambos têm botões laterais $\pm$ e campo central | O produto suporta digitação flexível brasileira | O produto trata string intermediária no state | Formulários de cálculo | `PRESERVE & ADAPT` | **Área protegida.** O componente do produto possui inteligência necessária de chão de fábrica. O DS deve adotar sua especificação. | N1 |
| **Hero Numbers (S/F)** | Mostradores de telemetria em tempo real | Cards Z4 com rotação $S$ e avanço $F$ em 38px mono e botões ±5% | Declarado em `TelemetryCard` (`.d.ts`) | Conceitual | `CONCEPTUAL_MATCH` | Alto | Cards escuros com destaque tipográfico e badge | Botões de compensação de rotação/avanço ±5% | React state no `CalculatorContext` | ResultsPanel, MobileResultsSheet | `PRESERVE` | Comportamento exclusivo do domínio de usinagem. Impossível substituir por cartão estático genérico. | N0 |
| **Physical Summary (Z7)** | Cartões de dados de múltiplos eixos | Grid de cartões compactos com $h_m, CTF, L/D, k_c, P_c, M_c$ | Estilizado em `showcase.html` e `site-model.html` | Direta | `DIRECT_MATCH` | Médio | Cartões compactos com rótulo em 10px e valor em 20px mono | Valores derivados das equações de Kienzle | ResultsPanel | `PRESERVE` | Reflete perfeitamente a telemetria industrial de alta densidade da referência. | N0 |
| **Safety Band (Z2)** | Banners semânticos de segurança | Tarja horizontal com chip semáforo (Normal, Atenção, Crítico) | Equivalente ao `StatusBadge` | Conceitual | `CONCEPTUAL_MATCH` | Médio | Banner colorido com chip de alta visibilidade e texto técnico | Dispara alertas baseados em regras físicas de corte | ResultsPanel | `PRESERVE` | Função crítica de segurança operacional do CNC. Preservar integralmente. | N0 |
| **Family Nav** | Navegação clínica entre módulos | Abas WAI-ARIA com *Roving Tabindex* para Fresar, Furar, Roscar, Mandrilar | Não especificado como componente isolado | Domínio | `PROJECT_ONLY` | Alto | 4 abas estilizadas no topo | Roving tabindex (Setas, Home, End) | `FamilyNav.tsx`, `activeFamily` | `PRESERVE` | Pilar de navegação central do produto. Inexistente na referência médica porque é específico de CNC. | N0 |
| **Productivity Gauge** | Dials e medidores de arco semicirculares | Presente na identidade de marca e no protótipo `site-model.html` | Componente canônico SVG em `output_tooloptimizer_ds` | Conceitual | `CONCEPTUAL_MATCH` | Médio | Instrumento semicircular em setores com agulha | Mede eficiência percentual de usinagem | Showcase, landing page | `ADAPT` | Manter no catálogo e na landing page. Disponível como recurso visual de alto impacto. | N0 |
| **Mobile Experience** | Console físico médico fixo | `mobile-shell` com Bottom Sheet modal animada e barra fixa | Diretrizes responsivas documentadas em `DESIGN.md` | Específica | `PROJECT_ONLY` | Alto | Interface ergonômica monomanual para smartphone | Barra fixa inferior aciona folha de resultados | Componentes em `src/ui/components/mobile/` | `PRESERVE` | Essencial para operadores de máquinas que consultam parâmetros diretamente no celular na oficina. | N0 |
| **Educational Drawer** | Gavetas laterais expansíveis (*Drawers*) | Gavetas D11, Z5 e Z6 com chevron rotativo 90° e texto de equilíbrio físico | Não componentizado isoladamente | Conceitual | `DIRECT_MATCH` | Médio | Bloco expansível com chevron e transição CSS | Revela explicações físicas sem poluir o formulário | ConfigForm, ResultsPanel | `PRESERVE` | Excelente prática de ergonomia cognitiva que respeita a filosofia de densidade da referência. | N0 |
| **Floating Toolbar** | Barra flutuante em pílula de 999px | Não existe na calculadora (menu fixo no topo) | Prototipado em `showcase.html` | Referência | `REFERENCE_ONLY` | Baixo | Barra flutuante no rodapé | Seleção de ferramentas clínicas | Nenhuma no produto | `DOCUMENT/DEFER` | Não há necessidade funcional na calculadora SPA de coluna única/dupla. Mantido no catálogo como padrão. | N0 |
| **Video Scrub Bar** | Linha do tempo de exame endoscópico | Não aplicável | Não aplicável | Específica | `REFERENCE_ONLY` | Baixo | Linha com agulha de tempo | Reprodução de vídeo médico | Nenhuma | `EXCLUDE` | Totalmente estranho ao domínio de usinagem e física de corte CNC. | N0 |
