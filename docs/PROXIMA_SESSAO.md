# PROXIMA SESSAO — ToolOptimizer CNC

> **📌 PARA O PRÓXIMO ASSISTENTE:**
> Este é o documento principal de continuidade. Leia do início ao fim antes de qualquer ação.
> Contém: estado do projeto, commits, o que foi feito, o que vem a seguir, padrões obrigatórios.

---

**Data:** 20/02/2026 — Sessão 5
**Versão:** 0.2.0

---

## ⚡ ESTADO ATUAL (início da próxima sessão)

| Item | Estado |
|------|--------|
| Branch | `main` |
| Último commit | `245131f` style: scale up typography system for desktop readability |
| Testes | **338/338 passando** (24 arquivos, zero falhas) |
| TypeScript | **zero erros** (`npx tsc --noEmit`) |
| Build | **limpo** (`npx vite build`) |
| GitHub | pushado — `contatorafaeleleoterio-hub/ToolOptimizerCNC` |
| Deploy | GitHub Pages ativo + CI pipeline ativo |
| Desktop | `Sistema_Desktop_Pen_driver/` — .exe 85MB (Electron v40.4.1) |
| Versão | `0.2.0` |

---

## 📋 COMMITS DESTA SESSÃO (20/02 sessão 5)

```
245131f  style: scale up typography system for desktop readability
b47a835  feat: add educational accordion drawer to Fine Tune sliders
958b82a  docs: session summary 20/02 - translate UI to pt-BR
```

### Commits anteriores:
```
d3c5395  style: translate all UI text to Portuguese (pt-BR)
c0dc244  docs: final session summary 19/02 s3
4b194d9  style: redesign tool correction factor UI with modal drawer + compact table
3c9dbf1  feat: add tool correction factor (coating/geometry multiplier) per tool type + diameter
```

---

## ✅ O QUE FOI FEITO NESTA SESSÃO (20/02 sessão 5)

### 1. Gaveta Educativa no Ajuste Fino (accordion)
- Clicar no label de cada slider (Vc, fz, ae, ap) abre gaveta inline animada
- Conteúdo: `desc` (o que é) + `▲ MAIS` (verde) + `▼ MENOS` (vermelho) + dica `balance` (amarelo)
- Apenas 1 gaveta aberta por vez — accordion pattern com `openKey` state
- Animação `fadeInUp` 0.25s reutilizando keyframe existente
- SLIDER_CONFIG enriquecido com campos: `aumentar`, `diminuir`, `equilibrio`
- 5 novos testes: 333 → **338 testes** passando

### 2. Escala tipográfica global para desktop (1360px+)
- Todos os textos do sistema foram aumentados 1 nível na hierarquia
- `text-[8px]`→`[11px]`, `text-[9px]`→`xs`, `text-[10px]`→`xs/sm`, `text-xs`→`sm`, `text-sm`→`base`, `text-lg`→`xl`
- Valores métricos: `text-2xl→3xl`, `text-3xl→4xl`, `text-4xl→5xl`, `text-5xl→6xl`
- Gauge SVG markers: `fontSize 8→11`, `fontSize 11→14`
- App header: `text-2xl→3xl`, ícone `text-4xl→5xl`
- **10 arquivos modificados**: fine-tune-panel, shared-result-parts, results-panel, config-panel, ui-helpers, bidirectional-slider, gauge, tool-summary-viewer, formula-card, App.tsx
- 338/338 testes passando, zero erros TS

---

## ✅ O QUE FOI FEITO NAS SESSÕES ANTERIORES (20/02 sessão 4)

### 1. Tradução completa UI para Português (pt-BR)

**Arquivos alterados:**
- `src/components/fine-tune-panel.tsx` — Labels e aria-labels: `'CUTTING SPEED'`→`'VEL. DE CORTE'`, `'FEED PER TOOTH'`→`'AVANÇO/DENTE'`, `'RADIAL ENGAGEMENT'`→`'ENGAJ. RADIAL'`, `'AXIAL DEPTH'`→`'PROF. AXIAL'`; `'Fine Tune'`→`'Ajuste Fino'`; `'MM/TOOTH'`→`'MM/DENTE'`
- `src/components/results-panel.tsx` — `'Spindle'`→`'Rotação'`, `'Feed Rate'`→`'Avanço'`, `'Power'`→`'Potência'`, `'Feed Efficiency'`→`'Eficiência de Avanço'`, `'Power Est.'`→`'Potência Est.'`, `'Surface Speed'`→`'Vel. Superficial'`; locales `'en-US'`→`'pt-BR'`
- `src/components/gauge.tsx` — Default label `'Efficiency'`→`'Eficiência'`
- `src/components/mobile/mobile-results-section.tsx` — Mesmas traduções do results-panel
- `src/components/shared-result-parts.tsx` — `fmt()`: locale `'en-US'`→`'pt-BR'` (afeta todo o app)
- `src/pages/history-page.tsx` — Colunas `'Feed'`→`'Avanço'`, `'Power'`→`'Potência'`; locale `pt-BR`

**Testes atualizados:**
- `tests/components/fine-tune-panel.test.tsx` — Todos os matchers para português; aria-labels: `'Decrease Vc'`→`'Diminuir Vc'`, `'Increase Vc'`→`'Aumentar Vc'`
- `tests/components/results-panel.test.tsx` — Labels e aria-labels atualizados; locale em formatação RPM
- `tests/components/gauge.test.tsx` — `'Feed Efficiency'`→`'Eficiência de Avanço'`
- `tests/pages/history-page.test.tsx` — Formato pt-BR: `'3,183'`→`'3.183'` (ponto como separador de milhares)

**Resultado:** 333/333 testes passando; zero erros TS; build limpo.

---

## ✅ O QUE FOI FEITO NAS SESSÕES ANTERIORES (19/02 sessão 3)

### 1. Lista de Materiais Unificada (Configurações → Materiais)
- Removida separação "Base (somente leitura)" / "Personalizados"
- **Todos os materiais** em uma lista única com botão **Editar**
- Materiais base editados criam um **override** (CustomMaterial com mesmo ID)
- Override tem badge laranja "Custom" + botão `restart_alt` para restaurar original
- Materiais extras (IDs > 9): edit + delete
- Padrão de upsert: `updateCustomMaterial` se ID existe, `addCustomMaterial` se novo

### 2. Fator de Segurança movido para Configurações
- **Removido** slider SF do `config-panel.tsx` (dashboard)
- **Adicionado** badge de leitura `SF: 0.80` no dashboard (hint visual)
- SF agora só é editável em Configurações → Segurança
- Motivo: `setSafetyFactor` zera `resultado=null` → UX confusa no dashboard

### 3. Slider Fator de Segurança redesenhado
- Era: `<input type="range">` nativo (sem estilo)
- Agora: `StyledSlider` idêntico ao Fine Tune
  - Ring + inner dot + glow + scale(1.15) ao pressionar
  - Botões − e + nas extremidades (`BTN_CLS`)
  - Range: 0.50 a 1.00, step 0.05

### 4. Fator de Correção por Ferramenta (feature novo completo)
**Propósito:** Compensar revestimentos de ferramentas (TiAlN, DLC, etc)

**Tipo novo** (`src/types/index.ts`):
```ts
interface ToolCorrectionFactor {
  tipo: 'toroidal' | 'esferica' | 'topo';
  diametro: number;
  fator: number;        // 0.5–1.5, default 1.0
  descricao?: string;   // ex: "TiAlN", "DLC"
}
```

**Store** (`src/store/machining-store.ts`):
- `toolCorrectionFactors: ToolCorrectionFactor[]` no state
- `setToolCorrectionFactor(tcf)` — upsert por (tipo, diametro)
- `removeToolCorrectionFactor(tipo, diametro)`
- Aplicado em `calcular()`:
  ```ts
  const corrFactor = tcf?.fator ?? 1.0;
  const vc = parametros.vc * corrFactor;
  const fz = parametros.fz * corrFactor;
  ```
- Persiste em localStorage via `partialize`

**UI** (`src/pages/settings-page.tsx`):
- Tabela compacta por tipo de ferramenta
- Badge "N ativos" quando há correções configuradas
- Botão **Editar** → abre `CorrectionModal`
- `CorrectionModal`: drawer/modal com padrão do projeto
  - Mobile: slide-from-bottom com handle bar
  - Desktop: modal centralizado
  - Slider 0.50–1.50 com botões −/+
  - Campo descrição opcional
  - Botões: Salvar / Resetar (→ 1.00) / Cancelar

---

## 🎯 PRÓXIMA TAREFA: Story-004 — SEO + Schema.org

### O que implementar:
```
1. <meta> tags dinâmicas:
   - description, keywords
   - og:title, og:description, og:image, og:url
   - twitter:card, twitter:title, twitter:description

2. Schema.org JSON-LD (SoftwareApplication):
   {
     "@type": "SoftwareApplication",
     "name": "ToolOptimizer CNC",
     "applicationCategory": "DesignApplication",
     "operatingSystem": "Web",
     "description": "...",
     "url": "https://...",
     "offers": { "@type": "Offer", "price": "0" }
   }

3. <title> dinâmico por rota (sem biblioteca externa, document.title):
   "/" → "ToolOptimizer CNC — Calculadora de Parâmetros de Corte"
   "/settings" → "Configurações — ToolOptimizer CNC"
   "/history" → "Histórico — ToolOptimizer CNC"
   "/mobile" → "ToolOptimizer CNC Mobile"

4. sitemap.xml em /public/
5. robots.txt em /public/
```

### Como implementar (sem biblioteca extra):
```tsx
// src/hooks/use-page-title.ts — hook simples
import { useEffect } from 'react';
export function usePageTitle(title: string) {
  useEffect(() => { document.title = title; }, [title]);
}

// src/components/seo-head.tsx — injeta meta tags via JS
// src/App.tsx — adiciona Schema.org via <script type="application/ld+json">
```

### Arquivo story (criar antes de codar):
`docs/stories/story-004-seo-schema.md`

### Critério de conclusão:
- Lighthouse SEO ≥ 90
- Schema validado em: https://validator.schema.org
- `npx vite build` limpo
- Todos 333 testes ainda passando

---

## 📐 PADRÕES OBRIGATÓRIOS (não mudar sem ADR)

### Stack
```
React 18.3 + TypeScript 5.7 (strict, zero any)
Vite 6.1 + @tailwindcss/vite 4.0
Zustand 5.0 + react-router-dom 7.13
Vitest 3.0 + Testing Library
SEM backend, SEM CSS Modules
```

### Slider padrão (ÚNICO em todo app)
`StyledSlider` — div customizado com:
- Track `h-1.5 bg-black/40 rounded-full` + filled com glow
- Thumb: outer ring `border-2 border-${color}` + inner dot + scale(1.15) on press
- Botões −/+ nas extremidades: `BTN_CLS = 'w-6 h-6 rounded bg-black/40 ...'`
- **Usado em:** Fine Tune (Vc/fz/ae/ap), SF (Settings), CorrectionModal

### Modal/Drawer padrão (CorrectionModal como referência)
```tsx
<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
  <div className="relative w-full sm:max-w-md bg-surface-dark border border-white/10
                  rounded-t-2xl sm:rounded-2xl shadow-glass p-5 pb-8 sm:pb-5">
    <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />
    {/* conteúdo */}
  </div>
</div>
```

### Botões seleção (toggle-like)
```tsx
className={`... ${selected
  ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
  : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}
```

### Store — regras críticas
- `setMaterial / setFerramenta / setTipoOperacao / setParametros / setSafetyFactor` → zeram `resultado=null`, NÃO chamam `calcular()`
- `setLimitesMaquina` → chama `calcular()` automaticamente (exceção)
- Testes do store: chamar `getState().calcular()` explicitamente
- Safety factor aplicado em: `potenciaCorte`, `potenciaMotor`, `torque` (NÃO em RPM, feed, MRR)
- Tool Correction Factor aplicado em: `vc` e `fz` (ANTES do cálculo, em `calcular()`)

### Design tokens
```
Primary:    #00D9FF (cyan neon)   → rgb: 0,217,255
Secondary:  #39FF14 (green neon)  → rgb: 57,255,20
Background: #0F1419 (dark)
Verde:      #2ecc71   Amarelo: #f39c12   Vermelho: #e74c3c
```

### Commits (conventional)
```
feat:     nova funcionalidade
fix:      correção de bug
style:    mudança visual sem lógica
refactor: refatoração sem mudança de comportamento
test:     testes
docs:     documentação
```

---

## 📁 ESTRUTURA DE ARQUIVOS RELEVANTE

```
src/
  types/index.ts              ← ToolCorrectionFactor, CustomMaterial, etc
  store/machining-store.ts    ← estado central (Zustand)
  engine/                     ← rpm, feed, power, chip-thinning, validators, recommendations
  data/                       ← materials, tools, operations
  components/
    config-panel.tsx          ← painel esquerdo dashboard (Simular, parâmetros)
    results-panel.tsx         ← painel direito (RPM, Feed, Potência, gauge)
    fine-tune-panel.tsx       ← sliders Vc/fz/ae/ap + StyledSlider
    bidirectional-slider.tsx  ← slider bidirecional RPM/Feed (-150% a +150%)
    gauge.tsx                 ← gauge semicircular animado
    export-buttons.tsx        ← exportar PDF/Excel
    tool-summary-viewer.tsx   ← visualizador da ferramenta selecionada
    disclaimer.tsx            ← aviso legal obrigatório
    formula-card.tsx          ← cards educativos de fórmulas
    viewport-redirect.tsx     ← redireciona mobile para /mobile
    mobile/                   ← componentes exclusivos mobile
  pages/
    settings-page.tsx         ← Configurações (6 seções)
    history-page.tsx          ← Histórico de simulações
    mobile-page.tsx           ← versão mobile completa
  hooks/
    use-is-mobile.ts
    use-simulation-animation.ts
    use-reset-feedback.ts
  App.tsx                     ← layout 3 colunas + header
  main.tsx                    ← BrowserRouter + Routes
  index.css                   ← Tailwind v4 @theme + keyframes

tests/                        ← 24 arquivos de teste (Vitest)
  engine/                     ← rpm, feed, power, chip-thinning, validators, recommendations
  store/                      ← machining-store, history-store, history-integration
  data/                       ← materials, tools, operations
  components/                 ← config-panel, results-panel, fine-tune-panel, gauge, etc
  pages/                      ← settings-page, history-page, mobile-page
  hooks/                      ← use-is-mobile

docs/
  specs/                      ← PRDs
  technical/                  ← dados Kienzle, velocidades, casos teste
  design/                     ← UI specs, branding
  architecture/               ← ADR-001 a ADR-006
  stories/                    ← features documentadas
  PROXIMA_SESSAO.md           ← ESTE ARQUIVO
  AIOS_INTEGRATION.md         ← framework de desenvolvimento

Sistema_Desktop_Pen_driver/   ← clone Electron (NUNCA editar aqui)
```

---

## 🔧 COMANDOS ÚTEIS

```bash
# Desenvolvimento
npm run dev                   # servidor local (localhost:5173/ToolOptimizerCNC/)

# Qualidade (rodar ANTES de qualquer commit)
npx vitest run                # todos os testes
npx tsc --noEmit              # TypeScript check
npx vite build                # build de produção

# Testes rápidos por arquivo
npx vitest run tests/store/machining-store.test.ts
npx vitest run tests/pages/settings-page.test.tsx

# Git
git log --oneline -10         # histórico
git status                    # estado atual
git push origin main          # push

# Contar testes (ignora warnings ANSI)
npx vitest run --reporter=json 2>/dev/null | python3 -c "
import sys,json; d=json.load(sys.stdin)
passed=sum(1 for s in d['testResults'] for t in s['assertionResults'] if t['status']=='passed')
failed=sum(1 for s in d['testResults'] for t in s['assertionResults'] if t['status']=='failed')
print(f'passed={passed} failed={failed}')"
```

---

## ⚠️ ARMADILHAS CONHECIDAS

| Problema | Causa | Solução |
|----------|-------|---------|
| `exit code 1` em vitest | Warnings ANSI no stderr | Usar `--reporter=json` para confirmar real contagem |
| `toBeCloseTo(x, 0)` | Margem ±0.5, não ±1 | Usar `Math.abs(val - expected) <= 1` para tolerância ±1 |
| SF slider "não funciona" | Zera resultado sem recalcular | É design intencional — usuário clica Simular |
| Teste `fireEvent.change` em StyledSlider | Não tem `value setter` (div, não input) | Testar via `fireEvent.click` nos botões +/− |
| Clone desktop em testes | Vitest encontra arquivos do clone | `exclude: ['Sistema_Desktop_Pen_driver/**']` no vitest.config.ts |
| Tailwind class dinâmica | Classes com interpolação não geram CSS | Usar classes completas ou `style={}` inline |

---

## 📊 ROADMAP COMPLETO

```
[x] Story-001: Limpeza técnica + ADRs
[~] Story-002: Deploy Cloudflare (fase 1 OK, setup manual pendente)
[x] Animações profissionais (spinner, gauge, pulse)
[x] Sliders bidirecionais RPM/Feed
[x] Reset feedback ao alterar parâmetros
[x] Sticky Simular/Reset (desktop + mobile)
[x] StyledSlider unificado (Fine Tune, SF, CorrectionModal)
[x] Story-003: CI/CD GitHub Actions
[x] Mobile fixes: Settings responsiva + touch targets
[x] Desktop .exe portátil (Electron v40.4.1)
[x] ADR-005: Guia build Electron
[x] ADR-006: Estratégia versionamento SemVer
[x] Design unificado: sliders RPM/Feed = Fine Tune
[x] Design unificado: botões Tipo Usinagem = Tipo Ferramenta
[x] Edit materiais (base + custom) com override pattern
[x] SF movido para Settings + StyledSlider
[x] Tool Correction Factor (Vc/fz multiplier por tipo+diâmetro)
[x] CorrectionModal (drawer mobile + modal desktop)

[ ] Story-004: SEO Schema.org + meta tags ← PRÓXIMA
[ ] Branch protection GitHub (manual pelo usuário)
[ ] Cloudflare Pages (manual pelo usuário)
[ ] HistoryPage responsiva
[ ] Desktop: ícone customizado, fontes offline, code signing
[ ] Story-005: ... (a definir)
[ ] MVP v1.0.0: feature-complete
```

---

## 🚀 PARA INICIAR A PRÓXIMA SESSÃO

O próximo assistente deve:

1. **Ler este arquivo** (já está fazendo isso)
2. Confirmar estado:
   ```bash
   git log --oneline -5
   npx vitest run --reporter=json 2>/dev/null | python3 -c "..."
   ```
3. Iniciar **Story-004** criando primeiro o arquivo de story:
   `docs/stories/story-004-seo-schema.md`
4. Seguir o fluxo: **document → test → implement → commit**

---

*Documento atualizado em 20/02/2026 — Sessão 5*
