# RECONCILIATION_SCOPE.md — Escopo da Reconciliação do Design System

> **Protocolo:** Auditoria, Reconciliação e Migração do Design System  
> **Fase:** FASE 0 — DEFINIR O ESCOPO DA RECONCILIAÇÃO  
> **Data:** 16 de Setembro de 2026  
> **Projeto Analisado:** `ToolOptimizerCNC` (v2.0.0)  
> **Responsável:** Antigravity / Pair Programming  

---

## 1. Objetivo

Executar uma reconciliação técnica, visual e normativa entre:
1. **O Modelo Visual de Referência:** *VITASILIX – Capsule Endoscopy Robot Medical Software UI/UX Design* (`EXTRACAO_ORIGINAL_IMAGENS_VITASILIX.md`);
2. **O Design System Atual Extraído:** `output_tooloptimizer_ds` (especificação canônica, tokens CSS e showcase);
3. **A Realidade do Produto:** Código-fonte e comportamento em produção do `ToolOptimizerCNC` (`INVENTARIO_TECNICO_VISUAL_PRODUTO.md` e implementação em `/src`).

O objetivo não é substituir o produto pela referência nem adotar cegamente as abstrações do Design System atual. O objetivo é determinar com base em evidências quais decisões devem ser **preservadas, corrigidas, adaptadas, consolidadas, substituídas, criadas, descontinuadas ou removidas**, garantindo fidelidade visual e integridade operacional total.

---

## 2. Artefatos de Entrada Utilizados

| Artefato | Localização | Papel / Natureza |
| :--- | :--- | :--- |
| **Referência Visual** | `C:\Users\USUARIO\Desktop\Projetos\extracao_design_system\EXTRACAO_ORIGINAL_IMAGENS_VITASILIX.md` | Estudo pericial de 19 pranchas 4K de interface robótico-médica cirúrgica em Dark Mode de alta precisão. |
| **Design System Atual** | `C:\Users\USUARIO\Desktop\Projetos\extracao_design_system\output_tooloptimizer_ds` | Manifest, tokens CSS, brand SVG/PNG e 7 componentes canônicos prototipados em showcase HTML. |
| **Inventário do Produto** | `c:\Users\USUARIO\Desktop\Projetos\ToolOptimizerCNC\INVENTARIO_TECNICO_VISUAL_PRODUTO.md` | Mapeamento exaustivo da arquitetura, tokens, componentes, regras físicas e comportamentos de produção. |
| **Código do Produto** | `c:\Users\USUARIO\Desktop\Projetos\ToolOptimizerCNC\src` | Implementação real em React 19 + TypeScript + CSS autônomo com 114 testes automatizados validados. |

---

## 3. Áreas Afetadas

1. **Foundations & Tokens:**
   - Paleta cromática dual-theme (Light Industrial Precision vs Dark Titanium Obsidian);
   - Tipografia canônica (`Urbanist` e `JetBrains Mono`);
   - Escalas de espaçamento (`--sp-*`), raios de curvatura (`--r-*`), sombras e retroiluminação (`--glow-*`);
   - Touch targets ergonômicos de chão de fábrica (`--h-target`, `--h-cta`).
2. **Componentes da Interface:**
   - Cabeçalho e Brand Plate (`HeaderZ1`, `MobileHeader`);
   - Navegação por abas WAI-ARIA (`FamilyNav`, `MobileFamilyTabs`);
   - Entradas numéricas e steppers táteis com precisão e suporte a vírgula (`StepperInput`);
   - Painel de telemetria e diagnósticos de corte (`ResultsPanel`, `MobileResultsSheet`);
   - Semáforo de segurança normativa (banda com chips de status NORMAL, ATENÇÃO, CRÍTICO);
   - Hero Cards de comandos principais ($S$ e $F$) com microajuste bidirecional ±5%;
   - Grid de grandezas físicas canônicas ($h_m, CTF, L/D, k_c, P_c, M_c$);
   - Gavetas expansíveis de instrução técnica (D11, Z5, Z6);
   - Gestão de configurações e persistência local (`SettingsView`).
3. **Catálogos e Assets:**
   - Catálogo do Design System (`showcase.html`);
   - Flagship landing page (`site-model.html`);
   - Ativos vetoriais e raster da logomarca oficial (`brand/`).

---

## 4. Limitações e Fatos Descobertos Durante a Auditoria

1. **Ausência de Componentes React no DS Atual:**
   - As pastas em `output_tooloptimizer_ds/components/` contêm apenas arquivos `.d.ts` e prompts `.prompt.md`. A implementação concreta dos componentes do DS reside exclusivamente nas classes CSS e marcação HTML do `showcase.html`.
2. **Autonomia do CSS do Produto:**
   - O produto `ToolOptimizerCNC` possui seu próprio arquivo centralizador de estilos (`src/ui/index.css`), que não consome os arquivos do DS via `@import`, tendo duplicado e refinado tokens para uso direto no React.
3. **Divergências Cromáticas Sutis:**
   - O DS usa `--action-fill: #4D7C0F` no tema claro; o produto usa `--action-fill: #3F700B` (ajuste técnico validado para WCAG AA > 5.9:1).
   - O DS usa superfícies Dark em `#0C1017` e `#121722`; o produto usa `#080C12` e `#131B29`, mais próximo do preto profundo da referência de endoscopia (`#000000` a `#0A0D12`).
4. **Divergência Crítica na Escala de Espaçamento:**
   - No DS: `--sp-5 = 20px`, `--sp-6 = 24px`, `--sp-8 = 32px`, `--sp-12 = 48px`.
   - No Produto: `--sp-5 = 24px`, `--sp-6 = 32px`, `--sp-7 = 48px`. Qualquer unificação precisa preservar as medidas físicas reais para não distorcer o layout de produção.
5. **Comportamentos Ricos Exclusivos do Produto:**
   - `StepperInput` aceita vírgula brasileira, ponto decimal, digitação livre sem perda de foco e estado nulo inicial. O contrato do DS (`value: number`) é ingênuo perante a realidade de entrada de dados industriais.

---

## 5. Funcionalidades que NÃO Podem Ser Perdidas (Áreas Protegidas)

1. **Motor Físico e Cadeia Analítica:**
   - Cálculos analíticos de Fresamento (Kienzle), Furação (HSS/MD com ciclo pica-pau), Roscamento rígido e Mandrilamento fino.
2. **Contrato de Interação e Estados:**
   - Máquina de estados: FormZerado $\rightarrow$ FormIncompleto $\rightarrow$ FormValido $\rightarrow$ Calculando $\rightarrow$ Sincronizado $\rightarrow$ AjusteManual.
   - Ajuste fino tátil bidirecional ±5% em $S$ e $F$ com recálculo de grandezas derivadas e botão `⟲ Padrão`.
   - Trava mecânica de avanço em roscamento sincronizado ($F = S \times P$).
3. **Experiência de Entrada de Dados:**
   - Digitação livre de números decimais com vírgula ou ponto em teclados móveis de chão de fábrica.
   - Campos geométricos adaptativos/condicionais baseados na ferramenta ativa (`r`, `kappa`, `Dmin`).
4. **Acessibilidade WAI-ARIA:**
   - Navegação por teclado nas abas de família via *Roving Tabindex* (Setas, Home, End).
   - Título formal de documento `h1.sr-only`.
   - Alvos de toque industriais de no mínimo 44px de altura.
5. **Persistência Offline:**
   - Banco IndexedDB (`tooloptimizer_db`) armazenando materiais customizados, ferramentas da oficina e margem de segurança global.
6. **Bifurcação Responsiva Dedicada:**
   - Mobile shell com cabeçalho compacto, chip tabs deslizantes, acordeões e Bottom Sheet modal deslizante acionada pela barra fixa inferior.

---

## 6. Nível Máximo de Intervenção Justificável

- **Classificação:** **N1 (Pequeno ajuste estrutural e alinhamento de tokens)** com pontuais intervenções **N0 (Correção pontual de tokens e classes)**.
- **Justificativa:** A arquitetura do produto já é extremamente sólida, moderna (React 19, TS, Vite 8) e possui 114 testes automatizados cobrindo 100% dos fluxos. Não há nenhuma justificativa técnica para reestruturações N2 ou N3. O trabalho consiste em harmonizar a taxonomia de tokens, alinhar as variáveis com a referência pericial e com o DS canônico, e consolidar os catálogos documentais.

---

## 7. Itens Explicitamente Fora do Escopo

- Reconstruir a casca ou os componentes em outro framework ou biblioteca (sem Tailwind, sem styled-components, sem bibliotecas de componentes externas).
- Adicionar novos gráficos 3D, joysticks virtuais ou elementos médicos da referência que não possuem equivalência na usinagem CNC (como controle de eixos Pitch/Roll/Yaw ou scrub de vídeo endoscópico).
- Alterar as equações matemáticas do motor físico de Kienzle em `/src/core`.
- Alterar o esquema de dados do IndexedDB ou do Service Worker PWA.
- Criar páginas ou funcionalidades não solicitadas (ex: monetização SaaS, login, backend).
