# TOKEN_RECONCILIATION.md — Reconciliação e Arquitetura Canônica de Tokens

> **Protocolo:** Auditoria, Reconciliação e Migração do Design System  
> **Fase:** FASE 7 — RECONCILIAÇÃO DE TOKENS  
> **Data:** 16 de Setembro de 2026  
> **Projeto:** `ToolOptimizerCNC` (v2.0.0)  

---

## 1. Arquitetura em Três Camadas (Primitive $\rightarrow$ Semantic $\rightarrow$ Component)

Para garantir estabilidade estrutural e impedir que alterações visuais quebrem a integridade lógica, os tokens são estruturados rigorosamente em três níveis de abstração:

```
[ Camada 1: Primitivos Globais ]
  ├── Escala Titânio / Obsidiana (--color-titanium-*)
  ├── Escala Ciano Cirúrgico (--color-cyan-*)
  ├── Escala Lime / Oliva de Ação (--color-lime-*)
  └── Escala Status Normativo Industrial (--color-status-*)
            │
            ▼
[ Camada 2: Tokens Semânticos Dual-Theme ]
  ├── Superfícies (--bg-page, --surface-card, --surface-card-subtle, --surface-input)
  ├── Bordas (--border-subtle, --border-control, --border-strong, --border-control-focus)
  ├── Tipografia (--tx-1, --tx-2, --tx-3, --tx-muted)
  ├── Acentos (--brand-fill, --action-fill, --tx-on-brand, --tx-on-action)
  └── Status (--st-normal-*, --st-warn-*, --st-crit-*, --st-info-*)
            │
            ▼
[ Camada 3: Component Tokens & Ergonomia ]
  ├── Dimensões de Toque (--h-target: 44px, --h-cta: 52px / 48px)
  ├── Raios de Curvatura (--r-chip: 6px, --r-field: 8px, --r-card: 14px, --r-pill: 999px)
  └── Sombras e Iluminação Cirúrgica (--shadow-card, --glow-active, --glow-cyan)
```

---

## 2. Inventário Factual de Origem

### 2.1 Tokens Extraídos da Referência Vitasilix
- **Cores de Acento:** Ciano cirúrgico `#19E4BB`, Lime elétrico `#BDFF4B`, Âmbar `#FFB020`, Carmim crítico `#FF4D4D`.
- **Superfícies Dark:** Fundo `#000000` a `#0A0D12`, Painéis `#12161E` a `#161B24`, Inputs `#1C222D` a `#212936`.
- **Textos:** Primário `#FFFFFF`, Secundário `#D8D8D8`, Metadados `#AEAEAE`.
- **Bordas:** 1px `rgba(255, 255, 255, 0.08)` a `rgba(255, 255, 255, 0.16)`.
- **Tipografia:** `Urbanist` (pesos 400, 500, 600) e numerais monoespaçados tabulares.

### 2.2 Tokens do Design System Atual Extraído (`output_tooloptimizer_ds`)
- **Light:** `--bg-page: #F4F6F9`, `--surface-card: #FFFFFF`, `--brand-fill: #0F766E`, `--action-fill: #4D7C0F`, `--tx-1: #0F172A`, `--tx-2: #334155`.
- **Dark:** `--bg-page: #0C1017`, `--surface-card: #121722`, `--brand-fill: #19E4BB`, `--action-fill: #BDFF4B`, `--tx-1: #FFFFFF`, `--tx-2: #C2CCDA`.
- **Espaçamento:** `--sp-05: 2px` até `--sp-20: 80px`.
- **Raios:** `--r-xs: 3px`, `--r-chip: 6px`, `--r-field: 8px`, `--r-card: 14px`, `--r-panel: 18px`, `--r-pill: 999px`.

### 2.3 Tokens Efetivamente em Produção (`ToolOptimizerCNC/src/ui/index.css`)
- **Light:** `--bg-page: #F4F6F9`, `--surface-card: #FFFFFF`, `--brand-fill: #0F766E`, `--action-fill: #3F700B` (calibrado para contraste estrito WCAG AA > 5.9:1), `--tx-1: #0F172A`, `--tx-2: #334155`, `--tx-3: #64748B`.
- **Dark:** `--bg-page: #080C12`, `--surface-card: #131B29`, `--brand-fill: #19E4BB`, `--action-fill: #BDFF4B`, `--tx-1: #FFFFFF`, `--tx-2: #C7D3E3`, `--tx-3: #8E9FB8`.
- **Espaçamento:** `--sp-1: 4px`, `--sp-2: 8px`, `--sp-3: 12px`, `--sp-4: 16px`, `--sp-5: 24px`, `--sp-6: 32px`, `--sp-7: 48px`.
- **Alvos de Toque:** `--h-target: 44px`, `--h-cta: 52px`.

---

## 3. Tabela Canônica de Reconciliação e Mapeamento

| Categoria | Token Original (Projeto) | Valor no Projeto | Token no DS Atual | Valor Canônico Reconciliado | Decisão | Observação / Racional Técnico |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Fundo Light** | `--bg-page` | `#F4F6F9` | `--bg-page` | `#F4F6F9` | `PRESERVE` | Consenso absoluto entre Produto e DS. |
| **Fundo Dark** | `--bg-page` | `#080C12` | `--bg-page: #0C1017` | `#080C12` | `PRESERVE` | O `#080C12` é mais escuro e fiel ao preto absoluto da referência Vitasilix (`#000000` a `#0A0D12`). |
| **Card Light** | `--surface-card` | `#FFFFFF` | `--surface-card` | `#FFFFFF` | `PRESERVE` | Branco puro com sombra de elevação sutil. |
| **Card Dark** | `--surface-card` | `#131B29` | `--surface-card: #121722` | `#131B29` | `PRESERVE` | Titânio profundo fosco. Protegido pela suíte de 114 testes. |
| **Input Dark** | `--surface-input` | `#0E141F` | `--surface-input: #121722` | `#0E141F` | `PRESERVE` | Recuo visual escuro perfeito para caixas de entrada de steppers. |
| **Brand Light** | `--brand-fill` | `#0F766E` | `--brand-fill` | `#0F766E` | `PRESERVE` | Ciano petróleo cirúrgico com contraste >5.4:1 (WCAG AA). |
| **Brand Dark** | `--brand-fill` | `#19E4BB` | `--brand-fill` | `#19E4BB` | `PRESERVE` | Ciano neon idêntico à referência original Vitasilix. |
| **Action Light** | `--action-fill` | `#3F700B` | `--action-fill: #4D7C0F` | `#3F700B` | `PRESERVE` | `#3F700B` garante contraste >5.9:1 sobre texto branco no botão Calcular. |
| **Action Dark** | `--action-fill` | `#BDFF4B` | `--action-fill` | `#BDFF4B` | `PRESERVE` | Lime elétrico idêntico à referência original Vitasilix. |
| **Texto 1 Light**| `--tx-1` | `#0F172A` | `--tx-1` | `#0F172A` | `PRESERVE` | Slate escuro para títulos e números. |
| **Texto 1 Dark** | `--tx-1` | `#FFFFFF` | `--tx-1` | `#FFFFFF` | `PRESERVE` | Branco puro de altíssimo contraste sobre o fundo escuro. |
| **Texto 2 Light**| `--tx-2` | `#334155` | `--tx-2` | `#334155` | `PRESERVE` | Leitura confortável para texto regular. |
| **Texto 2 Dark** | `--tx-2` | `#C7D3E3` | `--tx-2: #C2CCDA` | `#C7D3E3` | `PRESERVE` | Cinza claro levemente azulado de excelente legibilidade. |
| **Texto 3 Light**| `--tx-3` | `#64748B` | `--tx-3` | `#64748B` | `PRESERVE` | Rótulos, unidades e texto secundário. |
| **Texto 3 Dark** | `--tx-3` | `#8E9FB8` | `--tx-3: #627494` | `#8E9FB8` | `PRESERVE` | Rótulos de telemetria legíveis em telas industriais. |
| **Bordas Dark** | `--border-subtle` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.08)`| `rgba(255,255,255,0.08)` | `PRESERVE` | Hairline de 1px idêntica à referência pericial. |
| **Bordas Focus** | `--border-control-focus` | Ciano do tema | Ciano do tema | `var(--brand-fill)` | `PRESERVE` | Feedback tátil de foco ativo. |
| **Espaçamento 1**| `--sp-1` | `4px` | `--sp-1` | `4px` | `PRESERVE` | Módulo base de 4px. |
| **Espaçamento 2**| `--sp-2` | `8px` | `--sp-2` | `8px` | `PRESERVE` | $2 \times$ módulo base. |
| **Espaçamento 3**| `--sp-3` | `12px` | `--sp-3` | `12px` | `PRESERVE` | $3 \times$ módulo base. |
| **Espaçamento 4**| `--sp-4` | `16px` | `--sp-4` | `16px` | `PRESERVE` | $4 \times$ módulo base. |
| **Espaçamento 5**| `--sp-5` | `24px` | `--sp-5: 20px` / `--sp-6: 24px` | `24px` | `CONSOLIDATE` | Manter `--sp-5: 24px` no produto para não quebrar paddings de cards existentes; adicionar `--sp-md: 20px` e `--sp-lg: 24px`. |
| **Espaçamento 6**| `--sp-6` | `32px` | `--sp-8: 32px` | `32px` | `CONSOLIDATE` | Manter `--sp-6: 32px` no produto; adicionar `--sp-xl: 32px`. |
| **Espaçamento 7**| `--sp-7` | `48px` | `--sp-12: 48px` | `48px` | `CONSOLIDATE` | Manter `--sp-7: 48px` no produto; adicionar `--sp-2xl: 48px`. |
| **Touch Target** | `--h-target` | `44px` | `--h-target` | `44px` | `PRESERVE` | Altura mínima ergonômica para luvas e conformidade WCAG. |
| **Touch CTA** | `--h-cta` | `52px` | `--h-cta: 48px` | `52px` | `PRESERVE` | Botão Calcular proeminente com alvo expandido de 52px. |

---

## 4. Normalização das Variáveis de Glow e Elevação

Para alinhar com a sofisticação visual das pranchas Vitasilix, as variáveis de retroiluminação cirúrgica (*glow*) são incorporadas ao centralizador de estilos do produto:

```css
/* Efeitos Luminescentes Canônicos (Cirúrgicos) */
--glow-cyan:    0 0 16px rgba(25, 228, 187, 0.35);
--glow-cyan-lg: 0 0 28px rgba(25, 228, 187, 0.50);
--glow-lime:    0 0 16px rgba(189, 255, 75, 0.40);
--glow-crit:    0 0 16px rgba(255, 77, 77, 0.40);
```

Essas variáveis enriquecem a experiência noturna do `[data-theme="escuro"]` sem gerar impacto no tema claro e sem quebrar nenhuma dependência.
