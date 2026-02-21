# PROXIMA SESSAO — ToolOptimizer CNC

> ## 👋 PARA O PRÓXIMO ASSISTENTE — LEIA ISTO PRIMEIRO
>
> Este documento é o **único ponto de entrada** para continuar o projeto.
> Contém TUDO que você precisa saber para trabalhar com eficiência máxima.
> **NÃO comece a codar sem ler do início ao fim.**

---

## 📍 ESTADO DO PROJETO (início da próxima sessão)

| Item | Valor |
|------|-------|
| **Branch** | `main` |
| **Versão** | `0.3.0` |
| **Último commit** | `a994c54` docs: session summary 21/02 s7 |
| **Testes** | **401/401 passando** (25 arquivos) |
| **TypeScript** | **zero erros** |
| **Build** | **limpo** — JS 93.64KB gzip, CSS 12.83KB |
| **Remote** | `origin/main` sincronizado (GitHub) |
| **Deploy** | GitHub Pages ativo via CI/CD |
| **Desktop** | `.exe` 85MB em `Sistema_Desktop_Pen_driver/` |

---

## 🔍 COMO VERIFICAR O ESTADO RAPIDAMENTE

```bash
# 1. Últimos commits
git log --oneline -5

# 2. Testes todos passando?
npx vitest run --reporter=verbose 2>&1 | tail -5

# 3. TypeScript limpo?
npx tsc --noEmit

# 4. Build funciona?
npx vite build 2>&1 | tail -5
```

---

## ✅ O QUE FOI FEITO (histórico recente)

### Sessão 21/02 s7 — Story-005 ParameterHealthBar
- **Novo:** `src/components/parameter-health-bar.tsx` — barras bidirecionais de saúde
- **Novo:** `tests/components/parameter-health-bar.test.tsx` — 56 testes TDD
- **Integrado:** `fine-tune-panel.tsx` + `mobile-fine-tune-section.tsx` — mesmo componente
- **Testado:** +7 testes de integração em arquivos existentes
- **Versão:** 0.2.1 → 0.3.0

### Sessão 20/02 s6 — Story-004 SEO
- `index.html` com meta tags OG, Twitter, Schema.org JSON-LD
- `src/hooks/use-page-title.ts`, `src/components/seo-head.tsx`
- `public/sitemap.xml`, `public/robots.txt`
- Fix: gaveta educativa mobile (paridade com desktop)

### Sessão 20/02 s5 — Typography + Accordion
- Escala tipográfica global desktop (text-base → text-lg)
- Gaveta educativa accordion em todos os sliders (Vc/fz/ae/ap)

### Sessão 19/02 s3 — Settings + Correções
- Fator de Segurança movido para Settings com StyledSlider
- ToolCorrectionFactor (multiplicador Vc/fz por tipo + diâmetro)
- CorrectionModal (drawer mobile, modal desktop)
- Edit de materiais base + custom override pattern

---

## 🎯 PRÓXIMAS TAREFAS SUGERIDAS

O usuário precisa escolher a Story-006. Apresente as opções:

### Opção A — HistoryPage responsiva (RECOMENDADO)
**Por quê:** A HistoryPage atual é só-desktop. Em mobile aparece quebrada.
**O que fazer:**
- Layout em cards empilhados no mobile (em vez de tabela)
- Filtros colapsáveis
- Export funcionando no mobile

### Opção B — Melhorias no Desktop .exe
**Por quê:** O .exe portátil existe mas tem limitações UX.
**O que fazer:**
- Ícone customizado `.ico` (agora usa ícone genérico Electron)
- Fontes offline (Material Symbols falha sem internet → ícones aparecem como texto)
- Auto-updater (notifica quando nova versão disponível)

### Opção C — Exportação PDF profissional
**Por quê:** Usuários precisam imprimir/enviar relatórios para aprovação.
**O que fazer:**
- PDF com logo, parâmetros, resultado, MRR, gráfico de saúde
- Usar `jsPDF` ou template HTML → print

### Opção D — Comparação de simulações
**Por quê:** Feature avançada para comparar 2+ cenários side-by-side.
**O que fazer:**
- Selecionar 2 itens do histórico
- Diff visual de parâmetros e resultados

### Opção E — Dashboard de métricas rápidas
**Por quê:** Power users querem ver tendências (material mais usado, faixa de RPM típica, etc.)
**O que fazer:**
- Charts no HistoryPage (Recharts ou Chart.js)
- Resumo estatístico das últimas N simulações

---

## 🏗️ ARQUITETURA E PADRÕES (OBRIGATÓRIO LER)

### Stack confirmada (fev/2026)
```
React 18.3 + TypeScript 5.7 (strict mode, zero any)
Vite 6.1 + @tailwindcss/vite 4.0 (NÃO tailwind.config!)
Zustand 5.0 + react-router-dom 7.13
Vitest 3.0 + Testing Library
SEM backend, SEM CSS Modules, SEM Prettier (não configurado)
```

### Rotas
```
"/"          → App.tsx (desktop 3-col)
"/mobile"    → MobilePage (auto-redirect via useIsMobile)
"/settings"  → SettingsPage
"/history"   → HistoryPage
```

### Store (Zustand) — regras críticas
```typescript
// Estes NÃO recalculam automaticamente:
setMaterial() → resultado = null
setFerramenta() → resultado = null
setTipoOperacao() → resultado = null
setParametros() → resultado = null
setSafetyFactor() → resultado = null

// Este SIM recalcula automaticamente (exceção):
setLimitesMaquina() → chama calcular()

// Nos testes: sempre chamar explicitamente
useMachiningStore.getState().calcular();
```

### Tailwind v4 — regra crítica
```tsx
// ❌ NUNCA — classe interpolada é purgada no build
className={`text-${color}-500`}

// ✅ SEMPRE — classe completa estática
className="text-primary"
// OU inline style para valores dinâmicos:
style={{ color: `rgba(${rgb},1)` }}
```

### Slider padrão (ÚNICO no app)
`StyledSlider` — div customizado (NÃO input[type=range]). Thumb: ring + inner dot + glow. Usado em: Fine Tune, Settings (Safety Factor), CorrectionModal.

### Modal/Drawer padrão
```tsx
<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
  <div className="relative w-full sm:max-w-md bg-surface-dark border border-white/10
                  rounded-t-2xl sm:rounded-2xl shadow-glass p-5 pb-8 sm:pb-5">
    {/* Handle bar mobile */}
    <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />
    {/* conteúdo */}
  </div>
</div>
```

### ParameterHealthBar — regras
```tsx
// Inserção em fine-tune-panel.tsx (após slider row, antes gaveta):
</div>  {/* ← fecha flex items-center gap-1.5 */}
<ParameterHealthBar paramKey={key} />
{isOpen && (  {/* ← gaveta educativa */}

// Vc/fz inactive quando resultado=null. ae/ap sempre ativos.
// ZONE_RGB é lookup estático — nunca interpolar em className
// CTF badge aparece quando resultado.seguranca.ctf > 1.0
```

### Tolerâncias nos testes
```typescript
// ±1 RPM, ±1 mm/min
expect(Math.abs(val - expected)).toBeLessThanOrEqual(1);

// toBeCloseTo(x, 0) = margem ±0.5 (não ±1!)
// Para ±1 use Math.abs, não toBeCloseTo com decimais=0
```

---

## 📁 MAPA DE ARQUIVOS

```
src/
  types/index.ts                        ← tipos TS + constantes (REGRAS_SEGURANCA, LIMITES_PADRAO)
  store/machining-store.ts              ← estado central Zustand
  store/history-store.ts                ← histórico de simulações (localStorage)
  engine/
    rpm.ts                              ← calculateRPM
    chip-thinning.ts                    ← calculateEffectiveFz + CTF
    feed.ts                             ← calculateFeedRate
    power.ts                            ← calculatePower + calculateTorque + calculateMRR
    validators.ts                       ← validateLDRatio + validateInputs + validateMachineLimits
    recommendations.ts                  ← getRecommendedParams
    index.ts                            ← re-exports
  data/
    materials.ts                        ← MATERIAIS[] + custom materials
    tools.ts                            ← FERRAMENTAS_PADRAO, DIAMETROS_PADRAO, etc.
    operations.ts                       ← OPERACOES[]
    index.ts                            ← re-exports
  components/
    config-panel.tsx                    ← painel esquerdo (Material, Ferramenta, Tipo, Parâmetros)
    results-panel.tsx                   ← painel central (RPM, Feed, Potência, Gauge, BidirSliders)
    fine-tune-panel.tsx                 ← painel direito (Vc/fz/ae/ap sliders + health bars + gaveta)
    parameter-health-bar.tsx            ← ParameterHealthBar + 4 funções puras compute*
    bidirectional-slider.tsx            ← slider bidirecional RPM/Feed (-150% a +150%)
    gauge.tsx                           ← gauge semicircular 270° animado (40 segmentos)
    formula-card.tsx                    ← cards de fórmula colapsáveis
    export-buttons.tsx                  ← botões JSON/CSV export
    tool-summary-viewer.tsx             ← resumo da ferramenta com toFixed(2)
    disclaimer.tsx                      ← aviso legal obrigatório
    seo-head.tsx                        ← injeta meta tags OG/Twitter
    ui-helpers.tsx                      ← SectionTitle, etc.
    correction-modal.tsx                ← modal/drawer Tool Correction Factor
    mobile/
      mobile-fine-tune-section.tsx      ← fine tune mobile (TouchSlider + health bars + gaveta)
      mobile-results-section.tsx        ← resultados mobile
      mobile-sticky-actions.tsx         ← Simular/Reset fixos no topo mobile
  pages/
    settings-page.tsx                   ← Settings (6 seções: limites, SF, materiais, etc.)
    history-page.tsx                    ← Histórico de simulações (tabela + filtros)
    mobile-page.tsx                     ← página mobile completa
  hooks/
    use-page-title.ts                   ← document.title por rota
    use-is-mobile.ts                    ← detecta viewport mobile
    use-simulation-animation.ts         ← estados de animação (loading/gauge/pulse)
    use-reset-feedback.ts               ← detecta mudança de params, aciona aviso visual
  App.tsx                               ← layout 3-col + header + SeoHead
  main.tsx                              ← BrowserRouter + Routes (web) / HashRouter (desktop)
  index.css                             ← Tailwind v4 @theme + keyframes + range fix

public/
  sitemap.xml                           ← 3 rotas indexáveis
  robots.txt                            ← Allow all + Sitemap

tests/                                  ← espelho de src/
  engine/                               ← rpm, feed, power, chip-thinning, validators
  data/                                 ← materials, tools, operations
  store/                                ← machining-store, history-store
  components/                           ← config-panel, results-panel, fine-tune-panel,
                                           parameter-health-bar, bidirectional-slider,
                                           formula-card, gauge, export-buttons,
                                           tool-summary-viewer, seo-head, disclaimer,
                                           correction-modal, mobile-fine-tune-section
  pages/                                ← settings-page, history-page, mobile-page
  hooks/                                ← use-is-mobile, use-simulation-animation,
                                           use-reset-feedback

docs/
  specs/
    PRD_TOOLOPTIMIZER_CNC_MVP.md        ← PRD completo
    PRD_MASTER.md                       ← PRD condensado
    DECISOES_VALIDACAO_PRD.md           ← validações críticas de domínio
  technical/
    DADOS_TECNICOS_KIENZLE_E_VC.md      ← dados Kienzle + Vc por material
    PRD_Velocidades_Corte_CNC.md        ← faixas de Vc por material/ferramenta
    CASOS_TESTE_REFERENCIA.md           ← ← USE ESTE para valores nos testes!
  design/
    DASHBOARD.md                        ← protótipo do dashboard
    UI_DESIGN_SPEC_FINAL.md             ← spec completa de UI
    UI_BRANDING.md                      ← tokens de design
  architecture/
    ADR-001 a ADR-006                   ← decisões arquiteturais documentadas
    ADR-005-electron-desktop-build.md   ← guia completo para build do .exe
    ADR-006-estrategia-versionamento.md ← regras SemVer
  stories/
    story-001 a story-005               ← documentação de cada feature entregue
  PROXIMA_SESSAO.md                     ← ESTE ARQUIVO (ponto de entrada da sessão)
  AIOS_INTEGRATION.md                  ← integração com Synkra AIOS Framework
```

---

## ⚠️ ARMADILHAS CONHECIDAS

| Problema | Causa | Solução |
|----------|-------|---------|
| `exit code 1` em `vitest run` | Warnings ANSI no stderr | Verificar output — se `X passed` = OK |
| `exit code 1` em `vite build` | Warnings do vite no stderr | Verificar output — se `✓ built in` = OK |
| `toBeCloseTo(x, 0)` | Margem ±0.5, não ±1 | Usar `Math.abs(val - expected) <= 1` |
| Slider "não funciona" no teste | `StyledSlider` é div, não `input` | Testar via botões `+`/`−` com `fireEvent.click` |
| Teste do store não recalcula | Store não auto-recalcula | Chamar `getState().calcular()` explicitamente |
| Tailwind classe purgada | Interpolação em runtime | Usar classes completas estáticas OU `style={}` |
| Clone desktop em testes | Vitest acha arquivos do clone | `exclude: ['Sistema_Desktop_Pen_driver/**']` já configurado |
| `usePageTitle` em teste | Muda `document.title` | Limpar no `afterEach` se necessário |
| `BrowserRouter` em testes mobile | MobilePage usa hooks de routing | Sempre envolver em `<BrowserRouter>` |

---

## 🚀 CHECKLIST FIM DE SESSÃO (para o assistente não esquecer)

Antes de encerrar qualquer sessão:

```bash
# 1. Todos os testes passando?
npx vitest run

# 2. TypeScript limpo?
npx tsc --noEmit

# 3. Build de produção OK?
npx vite build

# 4. Commit com conventional commits
git add <arquivos específicos>
git commit -m "feat/fix/style/docs: descrição"

# 5. Push
git push origin main

# 6. Se story concluída: version bump em package.json
#    MINOR: nova feature (0.3.0 → 0.4.0)
#    PATCH: bugfix (0.3.0 → 0.3.1)

# 7. Atualizar PROXIMA_SESSAO.md (este arquivo)

# 8. Atualizar memory/MEMORY.md

# 9. Commit docs
git add docs/ && git commit -m "docs: session summary ..."
git push origin main
```

---

## 🔧 COMANDOS DO DIA-A-DIA

```bash
# Dev server
npm run dev                    # → http://localhost:5173/ToolOptimizerCNC/

# Testes
npx vitest run                 # todos os testes
npx vitest run tests/components/parameter-health-bar.test.tsx  # arquivo específico
npx vitest watch               # modo watch (dev)

# Qualidade
npx tsc --noEmit               # type check
npx vite build                 # build prod

# Git
git log --oneline -10
git diff HEAD~1                # o que mudou no último commit
git status
```

---

## 📊 HISTÓRICO DE VERSÕES

| Versão | Commits | Feature |
|--------|---------|---------|
| 0.1.0 | inicial | MVP base (cálculos + UI) |
| 0.2.0 | múltiplos | Animações + Sliders bidirecionais + Mobile + CI |
| 0.2.1 | d32b26e | SEO + Schema.org + fix gaveta mobile |
| **0.3.0** | **12b8a6c** | **ParameterHealthBar (Story-005)** |

---

## 📌 ROADMAP VISUAL

```
✅ Story-001: Limpeza técnica + ADRs
✅ Story-002: Deploy Cloudflare (código OK, setup manual pendente)
✅ Story-003: CI/CD GitHub Actions
✅ Story-004: SEO Schema.org + meta tags
✅ Story-005: ParameterHealthBar (feedback visual Fine Tune)
⬜ Story-006: [A DEFINIR com usuário] ← PRÓXIMA
⬜ MVP v1.0.0 (feature-complete)
⬜ Cloudflare Pages (setup manual pelo usuário)
⬜ Desktop: ícone + fontes offline + code signing
```

---

*Última atualização: 21/02/2026 — Sessão 7*
*Próximo assistente: leia este arquivo + MEMORY.md antes de qualquer ação*
