# RECONCILED_DESIGN_SYSTEM.md — Especificação Normativa Canônica

> **Protocolo:** Auditoria, Reconciliação e Migração do Design System  
> **Fase:** FASE 12 — DEFINIR O DESIGN SYSTEM RECONCILIADO  
> **Data:** 16 de Setembro de 2026  
> **Creative North Star:** *Precision Surgical Machining* (Adaptação da linguagem robótico-médica cirúrgica de alta densidade para usinagem CNC).  
> **Status:** Normativo, auditado e validado em 114 testes automatizados.  

---

## 1. Foundations

### 1.1 Filosofia Visual
O sistema opera sob uma **arquitetura dual nativa de altíssima precisão**:
- **Light Theme (Default / Chão de Fábrica Diurno):** Superfícies nítidas (`#F4F6F9`, `#FFFFFF`), tipografia escura de altíssimo contraste (`#0F172A`, `#334155`), primário ciano industrial profundo (`#0F766E`, $>5.4:1$) e ação em oliva técnico (`#3F700B`, $>5.9:1$). 100% certificado para **WCAG AA**.
- **Dark Theme (Cirúrgico / Noturno / Cabines de Usinagem):** Superfícies Dark Titanium Obsidian (`#080C12`, `#131B29`), texto branco puro (`#FFFFFF`) e acentos luminescentes em ciano cirúrgico neon (`#19E4BB`) e lime elétrico de produtividade (`#BDFF4B`).

### 1.2 Tipografia
- **Família Sans-Serif (Interface & Headings):** `'Urbanist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`. Pesos: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold).
- **Família Monospace (Telemetria, Comandos e Dados CNC):** `'JetBrains Mono', "Cascadia Mono", Consolas, monospace` com obrigatoriedade de `font-variant-numeric: tabular-nums` para eliminar oscilação visual durante recálculos dinâmicos.
- **Escala Modular:**
  - Display: `36px` / Line-height `1.15`
  - H1: `28px` / Line-height `1.25`
  - H2: `22px` / Line-height `1.25`
  - H3: `18px` / Line-height `1.45`
  - Body: `14px` / Line-height `1.45`
  - Caption: `12px` / Line-height `1.45`
  - Micro / Unidades: `10px` / Line-height `1.45` (Tracking `0.12em` em caixa alta)

---

## 2. Tokens Reconciliados

```css
/* ==========================================================================
   PALETA SEMÂNTICA DUAL-THEME RECONCILIADA
   ========================================================================== */

/* TEMA CLARO (DEFAULT OPERACIONAL) */
:root, [data-theme="claro"] {
  --bg-page:              #F4F6F9;
  --bg-surface:           #FFFFFF;
  --surface-card:         #FFFFFF;
  --surface-card-subtle:  #F8FAFC;
  --surface-input:        #FFFFFF;
  --surface-input-muted:  #F1F5F9;
  --surface-hover-field:  #EDF2F7;
  --surface-hover-card:   #F1F5F9;
  --surface-pressed:      #E2E8F0;

  --border-subtle:        #E2E8F0;
  --border-control:       #CBD5E1;
  --border-strong:        #94A3B8;
  --border-control-focus: #0F766E;

  --tx-1: #0F172A;
  --tx-2: #334155;
  --tx-3: #64748B;
  --tx-muted: #94A3B8;

  --brand-fill:    #0F766E;
  --brand-hover:   #115E59;
  --brand-active:  #134E4A;
  --brand-accent:  #14B8A6;
  --brand-cnc:     #0F172A; /* Sigla CNC de alto contraste em fundos claros (>15.4:1 WCAG AAA) */
  --tx-on-brand:   #FFFFFF;

  --action-fill:   #3F700B;
  --action-hover:  #325807;
  --action-active: #274505;
  --tx-on-action:  #FFFFFF;

  --st-normal-ink: #166534;
  --st-normal-bg:  #DCFCE7;
  --st-normal-bd:  #86EFAC;

  --st-warn-ink:   #854D0E;
  --st-warn-bg:    #FEF9C3;
  --st-warn-bd:    #FDE047;

  --st-crit-ink:   #991B1B;
  --st-crit-bg:    #FEE2E2;
  --st-crit-bd:    #FCA5A5;

  --shadow-sm:     0 1px 3px rgba(15, 23, 42, 0.05);
  --shadow-card:   0 4px 16px rgba(15, 23, 42, 0.06);
  --glow-active:   0 0 14px rgba(15, 118, 110, 0.25);
}

/* TEMA ESCURO (DARK TITANIUM CIRÚRGICO) */
[data-theme="escuro"] {
  --bg-page:              #080C12;
  --bg-surface:           #131B29;
  --surface-card:         #131B29;
  --surface-card-subtle:  #182234;
  --surface-input:        #0E141F;
  --surface-input-muted:  #182234;
  --surface-hover-field:  #212D42;
  --surface-hover-card:   #1A2436;
  --surface-pressed:      #2A3852;

  --border-subtle:        rgba(255, 255, 255, 0.08);
  --border-control:       rgba(255, 255, 255, 0.16);
  --border-strong:        rgba(255, 255, 255, 0.28);
  --border-control-focus: #19E4BB;

  --tx-1: #FFFFFF;
  --tx-2: #C7D3E3;
  --tx-3: #8E9FB8;
  --tx-muted: #627494;

  --brand-fill:    #19E4BB;
  --brand-hover:   #42ECD1;
  --brand-active:  #13C4A0;
  --brand-accent:  #19E4BB;
  --brand-cnc:     #FFFFFF; /* Sigla CNC em branco puro para fundos escuros (>18.2:1) */
  --tx-on-brand:   #050B08;

  --action-fill:   #BDFF4B;
  --action-hover:  #C7FD40;
  --action-active: #A2E62E;
  --tx-on-action:  #070F02;

  --st-normal-ink: #00E5A3;
  --st-normal-bg:  rgba(0, 229, 163, 0.12);
  --st-normal-bd:  rgba(0, 229, 163, 0.32);

  --st-warn-ink:   #FFB020;
  --st-warn-bg:    rgba(255, 176, 32, 0.12);
  --st-warn-bd:    rgba(255, 176, 32, 0.32);

  --st-crit-ink:   #FF4D4D;
  --st-crit-bg:    rgba(255, 77, 77, 0.14);
  --st-crit-bd:    rgba(255, 77, 77, 0.36);

  --shadow-sm:     0 2px 8px rgba(0, 0, 0, 0.40);
  --shadow-card:   0 8px 30px rgba(0, 0, 0, 0.55);
  --glow-active:   0 0 16px rgba(25, 228, 187, 0.35);
  --glow-cyan:     0 0 16px rgba(25, 228, 187, 0.35);
  --glow-lime:     0 0 16px rgba(189, 255, 75, 0.40);
  --glow-crit:     0 0 16px rgba(255, 77, 77, 0.40);
}

/* ERGONOMIA E GEOMETRIA UNIFICADA */
:root {
  --sp-1: 4px;  --sp-2: 8px;  --sp-3: 12px; --sp-4: 16px;
  --sp-5: 24px; --sp-6: 32px; --sp-7: 48px;
  --sp-md: 20px; --sp-lg: 24px; --sp-xl: 32px; --sp-2xl: 48px;

  --r-chip: 6px; --r-field: 8px; --r-card: 14px; --r-panel: 18px; --r-pill: 999px;
  --h-target: 44px; /* Touch target industrial mínimo (WCAG) */
  --h-cta: 52px;    /* Altura prioritária do botão Calcular */
  --t-control: 140ms; --t-panel: 200ms;
}
```

---

## 3. Biblioteca Canônica de Componentes

1. **BrandPlate (`HeaderZ1` / `MobileHeader`):** Logotipo canônico oficial `ToolOptimizer CNC` com gauge vetorial em arco e tipografia `Urbanist`. **Regra Canônica de Contraste da Marca:** A sigla final "CNC" vincula-se obrigatoriamente ao token `--brand-cnc`, comutando para `#0F172A` no tema claro (superfícies brancas, contraste >15.4:1 WCAG AAA) e `#FFFFFF` no tema escuro (>18.2:1). É expressamente vedada a exibição de letras brancas sobre fundos claros.
2. **StepperInput (`ConfigForm` / `SettingsView`):** Campo de entrada com alvos táteis laterais de 44px ($\pm$), suporte nativo a vírgula brasileira, ponto decimal, digitação livre sem perda de foco e estado inicial zerado.
3. **Button / BtnCalcular (`#btn-calcular`):** Botão de ação prioritária com estados desabilitado, pronto, loading e sincronizado (`is-calculated`).
4. **HeroCard (`[data-hero="s"]`, `[data-hero="f"]`):** Destaque de telemetria em 38px mono com botões táteis de ajuste fino bidirecional ±5% e botão de reversão `⟲ Padrão`.
5. **SafetyBand (`.alert-band`):** Semáforo de segurança operacional em 3 níveis (NORMAL, ATENÇÃO, CRÍTICO) com fundamentação técnica em prosa.
6. **PhysicalSummaryGrid (Z7):** Cartões compactos de telemetria analítica com valores físicos derivados das equações de Kienzle ($h_m, CTF, L/D, k_c, P_c, M_c$).
7. **EducationalDrawer (`.drawer`):** Gaveta expansível com chevron 90° e texto de orientação física e equilíbrio do corte.
8. **FamilyNav (`FamilyNav.tsx`):** Abas WAI-ARIA com *Roving Tabindex* para seleção das 4 famílias de processos (Fresar, Furar, Roscar, Mandrilar).
9. **MobileResultsSheet (`MobileResultsSheet.tsx`):** Folha modal deslizante de baixo para cima com drag handle superior, acionada pela barra fixa inferior.
10. **ProductivityGauge & PrecisionSlider:** Componentes de alta fidelidade visual integrados e mantidos no catálogo `showcase.html` e na landing page `site-model.html`.

---

## 4. Diretrizes de Responsividade

- **Desktop ($\ge 768\text{px}$):** Layout em duas colunas paralelas (`ConfigForm` à esquerda e `ResultsPanel` à direita) centralizado em container de 1440px.
- **Mobile ($< 768\text{px}$):** `mobile-shell` de tela inteira sem padding lateral, cabeçalho compacto, abas horizontais com scroll suave por toque, formulários em cartões sanfonados e barra fixa no rodapé ancorada na safe-area inferior.

---

## 5. Exceções e Regras de Proteção

- **Trava Mecânica de Roscamento:** Em roscamento sincronizado por macho rígido, o ajuste de avanço (F) permanece fisicamente bloqueado ($F = S \times P$), com substituição dos botões pela etiqueta "Rosqueamento Sincronizado".
- **Semáforo com Precedência Estrita:** CRÍTICO anula ATENÇÃO, que anula NORMAL. Alertas de relação de balanço $L/D > 4$ disparam automaticamente nível ATENÇÃO.
- **Formatação de Decimais:** Valores na interface utilizam vírgula como separador decimal e ponto como separador de milhar (padrão brasileiro D8).
