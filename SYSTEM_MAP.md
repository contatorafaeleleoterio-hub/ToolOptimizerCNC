# SYSTEM_MAP.md — Mapa Técnico e Arquitetural do Sistema

> **Protocolo:** Auditoria, Reconciliação e Migração do Design System  
> **Fase:** FASE 1 — DESCOBERTA DO PROJETO  
> **Data:** 16 de Setembro de 2026  
> **Projeto:** `ToolOptimizerCNC` (v2.0.0)  

---

## 1. Visão Geral da Stack e Infraestrutura

- **Linguagem / Runtime:** TypeScript 7.0.2 / Node.js
- **Framework de UI:** React 19.2.8 (`react`, `react-dom`)
- **Build Tool / Bundler:** Vite 8.2.2 com `@vitejs/plugin-react` e `vite-plugin-pwa`
- **Armazenamento Offline:** IndexedDB nativo via `idb` (v8.0.3) — Banco `tooloptimizer_db`
- **Hospedagem & CDN:** Cloudflare Workers (SPA via `wrangler` 4.68.0)
- **Testes Automatizados:** Vitest 5.0.0 com `@testing-library/react` (16.3.3), `@testing-library/jest-dom` e `fake-indexeddb`
- **Manipulação de Imagens / Assets:** `sharp` (0.34.5) e `png-to-ico` (3.0.1) em `scripts/generate-icons.mjs`

---

## 2. Scripts Disponíveis no `package.json`

| Comando | Execução | Finalidade |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Servidor de desenvolvimento local HMR |
| `npm run build` | `vite build` | Compilação e empacotamento de produção em `/dist` |
| `npm run preview` | `npm run build && wrangler dev` | Simulação de produção local com runtime Cloudflare |
| `npm run deploy` | `npm run build && wrangler deploy` | Publicação direta no Cloudflare Workers |
| `npm run typecheck` | `tsc --noEmit` | Validação estrita do compilador TypeScript |
| `npm run test` | `vitest run` | Execução completa dos 114 testes automatizados |
| `npm run check` | `npm run typecheck && npm run test` | Pipeline de certificação estrita local |
| `npm run validate` | `npm run check` | Alias de conformidade contínua |
| `npm run icons` | `node scripts/generate-icons.mjs` | Geração de favicons e ícones PWA a partir de `Logo_ToolOptimizer.png` |

---

## 3. Topologia de Diretórios do Projeto

```
ToolOptimizerCNC/
├── .github/workflows/          # CI/CD automatizado (deploy Cloudflare)
├── public/                     # Assets estáticos servidos na raiz
│   ├── favicon.ico             # Ícone multi-resolução do navegador
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── icon-192.png, icon-512.png # Ícones PWA
│   ├── og-image.png            # Banner para redes sociais
│   └── feature-graphic.svg     # Banner vetorial de apresentação
├── brand/                      # Ativos vetoriais e raster canônicos da marca
│   ├── Logo_Icon.svg           # Ícone vetorial isolado (fresa/gauge)
│   ├── Logo_ToolOptimizer.svg  # Logotipo horizontal completo
│   └── logo_p_favcon.png       # Renderização raster de alta resolução
├── scripts/
│   └── generate-icons.mjs      # Script de geração automática de ícones
├── src/
│   ├── core/                   # MOTOR FÍSICO-ANALÍTICO PURAMENTE ISOLADO
│   │   ├── calculator.ts       # Cálculos centrais e modelos de corte
│   │   ├── milling.ts          # Equações de fresamento de Kienzle
│   │   ├── drilling.ts         # Furação HSS/MD com passo pica-pau adaptativo
│   │   ├── threading.ts        # Roscamento rígido sincronizado
│   │   ├── boring.ts           # Mandrilamento com ap derivado
│   │   ├── materials.ts        # Base de materiais canônicos (Aço 1045, 4140, etc.)
│   │   ├── tools.ts            # Geometrias de ferramentas canônicas
│   │   ├── analyzer.ts         # Semáforo de segurança (NORMAL/ATENÇÃO/CRÍTICO)
│   │   ├── adjust.ts           # Motor de microajuste tátil ±5% em S e F
│   │   ├── storage.ts          # Camada de persistência IndexedDB (tooloptimizer_db)
│   │   ├── display.ts          # Formatadores numéricos brasileiros (D8)
│   │   └── __tests__/          # Suíte de testes unitários do motor (82 testes)
│   ├── harness/                # Harness de validação contra benchmarks de engenharia
│   └── ui/                     # CAMADA DE INTERFACE REACT 19
│       ├── main.tsx            # Entry point ReactDOM
│       ├── App.tsx             # Orquestrador com comutação Desktop/Mobile
│       ├── index.css           # CENTRALIZADOR ÚNICO DE ESTILOS DO PRODUTO (1774 linhas)
│       ├── context/
│       │   └── CalculatorContext.tsx # Central de estado reativo unificada
│       ├── hooks/
│       │   └── useIsMobile.ts  # Hook reativo com breakpoint em 768px
│       ├── components/         # COMPONENTES DESKTOP / COMPARTILHADOS
│       │   ├── HeaderZ1.tsx    # Cabeçalho da marca, chips de identidade e tema
│       │   ├── FamilyNav.tsx   # Abas WAI-ARIA (Fresar, Furar, Roscar, Mandrilar)
│       │   ├── ConfigForm.tsx  # Formulário com StepperInput, selects e botão CTA
│       │   ├── ResultsPanel.tsx# Tarja semáforo, Hero cards e grid físico Z7
│       │   ├── SettingsView.tsx# Visão modal/painel de configurações gerais
│       │   └── mobile/         # SUÍTE MOBILE DEDICADA (< 768px)
│       │       ├── MobileCalculator.tsx   # Casca orquestradora mobile
│       │       ├── MobileHeader.tsx       # Top bar compacta com marca e margem
│       │       ├── MobileFamilyTabs.tsx   # Slider horizontal de abas
│       │       ├── MobileStickyBar.tsx    # Barra fixa inferior (CTA ou resumo)
│       │       └── MobileResultsSheet.tsx # Folha modal deslizante de resultados
│       └── __tests__/          # Testes de componentes e integração (32 testes)
├── showcase.html               # Catálogo interativo do Design System
├── site-model.html             # Flagship landing page e referência de apresentação
└── wrangler.jsonc              # Configuração Cloudflare Workers
```

---

## 4. Mapeamento dos Componentes do Sistema

| Componente | Arquivo de Origem | Papel / Responsabilidade | Pertence ao DS? | Utilizado no Produto? |
| :--- | :--- | :--- | :--- | :--- |
| **BrandPlate** | `HeaderZ1.tsx` / `MobileHeader.tsx` | Identidade visual da marca (Logo SVG + tipografia Urbanist) | Sim (na pasta `brand/`) | Sim (Desktop e Mobile) |
| **IdentityChips** | `HeaderZ1.tsx` (`.z1-chip`) | Resumo dinâmico de Material, Ferramenta e Montagem | Não (específico do produto) | Sim (Desktop e Mobile) |
| **ThemeSwitcher** | `HeaderZ1.tsx` (`.theme-switch-btn`) | Alternador reativo Claro (Default) / Escuro (Titanium) | Sim (especificado no DS) | Sim |
| **FamilyNav** | `FamilyNav.tsx` | Navegação por abas das 4 famílias de usinagem (WAI-ARIA) | Não (específico do domínio) | Sim (Desktop) |
| **StepperInput** | `ConfigForm.tsx` (`.sctl`) | Entrada numérica com ajuste fino $\pm$, vírgula e decimais | Equivalente ao `InputStepper` | Sim (Componente crítico) |
| **EducationalDrawer** | `ConfigForm.tsx` / `ResultsPanel.tsx` | Gavetas expansíveis com chevron e orientações físicas | Equivalente conceitual ao Drawer | Sim (D11, Z5, Z6) |
| **BtnCalcular (CTA)** | `ConfigForm.tsx` / `MobileStickyBar.tsx` | Botão principal de cálculo com loading e feedback | Equivalente ao `Button` (action/lg) | Sim |
| **SafetyBand** | `ResultsPanel.tsx` (`.alert-band`) | Semáforo de segurança técnica (Normal, Atenção, Crítico) | Equivalente ao `StatusBadge` | Sim (Z2) |
| **HeroCard (S/F)** | `ResultsPanel.tsx` (`[data-hero]`) | Rotação e Avanço em 38px mono com botões táteis ±5% | Equivalente ao `TelemetryCard` | Sim (Z4) |
| **PhysicalCard (Z7)** | `ResultsPanel.tsx` (`.u20`) | Cartões compactos de telemetria analítica ($h_m, CTF, P_c$) | Equivalente ao `TelemetryCard` | Sim (Z7) |
| **MobileStickyBar** | `MobileStickyBar.tsx` | Barra fixa de rodapé para acionamento e status em trânsito | Não (específico mobile) | Sim (Mobile) |
| **MobileResultsSheet**| `MobileResultsSheet.tsx` | Folha modal deslizante de resultados em tela cheia | Não (específico mobile) | Sim (Mobile) |
| **SettingsView** | `SettingsView.tsx` | Gestão de materiais, ferramentas e margem no IndexedDB | Parcialmente (`DataTable` na lista)| Sim |
| **ProductivityGauge**| `showcase.html` / `site-model.html` | Indicador em arco de rendimento da usinagem | Sim (`components/productivity-gauge`)| No showcase e landing |
| **PrecisionSlider** | `showcase.html` | Slider com régua graduada de hachuras/ticks | Sim (`components/precision-slider`) | No showcase e landing |
| **DataTable** | `showcase.html` / `SettingsView.tsx` | Tabela zebrada com valores numéricos tabulares | Sim (`components/data-table`) | No showcase e settings |

---

## 5. Relações e Possíveis Duplicações Detectadas

1. **Tokens CSS:**
   - Existem tokens em `output_tooloptimizer_ds/tokens/*.css` e tokens em `ToolOptimizerCNC/src/ui/index.css`.
   - O produto real é autônomo e não depende do diretório externo para rodar.
   - Pequenas divergências de valor: `--action-fill` no tema claro é `#4D7C0F` no DS e `#3F700B` no produto; superfícies Dark são `#0C1017` no DS e `#080C12` no produto.
2. **Componentes do DS vs Código do Produto:**
   - O DS extraído contém apenas tipagens TypeScript `.d.ts` e prompts; a implementação concreta está toda em `src/ui/components/*.tsx` e `src/ui/index.css`.
   - Os componentes do produto são mais completos funcionalmente (suporte a vírgula brasileira, estado de formulário vazio, sincronização com máquina de estados).
3. **Showcase e Landing Page:**
   - `site-model.html` na raiz do projeto é idêntico ao de `output_tooloptimizer_ds`.
   - `showcase.html` no projeto (102 KB) e no DS (134 KB) possuem versões que devem ser harmonizadas para garantir que todas as 12 seções normativas estejam refletidas no repositório oficial.
