# PROXIMA SESSAO — ToolOptimizer CNC

> **📌 PARA O PRÓXIMO ASSISTENTE:**
> Este é o documento principal de continuidade. Leia do início ao fim antes de qualquer ação.
> Contém: estado do projeto, commits, o que foi feito, o que vem a seguir, padrões obrigatórios.

---

**Data:** 20/02/2026 — Sessão 6
**Versão:** 0.2.1

---

## ⚡ ESTADO ATUAL (início da próxima sessão)

| Item | Estado |
|------|--------|
| Branch | `main` |
| Último commit | `d32b26e` feat: SEO + Schema.org + fix mobile educational drawer |
| Testes | **338/338 passando** (24 arquivos, zero falhas) |
| TypeScript | **zero erros** (`npx tsc --noEmit`) |
| Build | **limpo** (`npx vite build`) — JS 92KB gzip, CSS 12.8KB |
| GitHub | pushado — `contatorafaeleleoterio-hub/ToolOptimizerCNC` |
| Deploy | GitHub Pages ativo + CI pipeline ativo |
| Desktop | `Sistema_Desktop_Pen_driver/` — .exe 85MB (Electron v40.4.1) |
| Versão | `0.2.1` |

---

## 📋 COMMITS DESTA SESSÃO (20/02 sessão 6)

```
d32b26e  feat: add SEO meta tags, Schema.org JSON-LD, and fix mobile educational drawer
```

### Commits anteriores:
```
4064549  docs: session summary 20/02 s5 - accordion drawer + typography scale
245131f  style: scale up typography system for desktop readability
b47a835  feat: add educational accordion drawer to Fine Tune sliders
d3c5395  style: translate all UI text to Portuguese (pt-BR)
```

---

## ✅ O QUE FOI FEITO NESTA SESSÃO (20/02 sessão 6)

### 1. Story-004 — SEO + Schema.org (COMPLETA)

**Novos arquivos:**
- `src/hooks/use-page-title.ts` — hook simples, seta `document.title` por rota
- `src/components/seo-head.tsx` — injeta meta tags OG/Twitter via JS DOM
- `public/sitemap.xml` — todas as rotas públicas
- `public/robots.txt` — Allow all + Sitemap URL
- `docs/stories/story-004-seo-schema.md` — documentação da story

**Modificados:**
- `index.html` — meta tags base + OG + Twitter + Schema.org JSON-LD (SoftwareApplication)
- `src/App.tsx` — `usePageTitle` + `SeoHead` na rota principal
- `src/pages/settings-page.tsx` — `usePageTitle('Configurações — ToolOptimizer CNC')`
- `src/pages/history-page.tsx` — `usePageTitle('Histórico — ToolOptimizer CNC')`
- `src/pages/mobile-page.tsx` — `usePageTitle('ToolOptimizer CNC Mobile')`

**Títulos por rota:**
| Rota | Título |
|------|--------|
| `/` | ToolOptimizer CNC — Calculadora de Parâmetros de Corte |
| `/settings` | Configurações — ToolOptimizer CNC |
| `/history` | Histórico — ToolOptimizer CNC |
| `/mobile` | ToolOptimizer CNC Mobile |

### 2. Fix — Gaveta Educativa no Mobile

**Problema:** `mobile-fine-tune-section.tsx` tinha seu próprio `SLIDER_CONFIG` sem os campos educativos (`desc`, `aumentar`, `diminuir`, `equilibrio`) e sem a lógica do accordion.

**Solução:**
- `SLIDER_CONFIG` do mobile agora idêntico ao desktop (com todos os campos)
- Adicionado `openKey`/`toggleDrawer` state (accordion pattern)
- Label de cada slider virou `<button>` com seta animada (igual ao desktop)
- Gaveta educativa renderizada quando `isOpen === true`
- Touch target mínimo: `min-h-[44px]` no botão do label

---

## ✅ O QUE FOI FEITO NAS SESSÕES ANTERIORES (20/02 sessão 5)

### 1. Gaveta Educativa no Ajuste Fino (accordion — desktop)
- Clicar no label de cada slider (Vc, fz, ae, ap) abre gaveta inline animada
- Conteúdo: `desc` + `▲ MAIS` (verde) + `▼ MENOS` (vermelho) + dica `balance` (amarelo)
- Apenas 1 gaveta aberta por vez — accordion pattern com `openKey` state
- Animação `fadeInUp` 0.25s reutilizando keyframe existente
- SLIDER_CONFIG enriquecido com campos: `aumentar`, `diminuir`, `equilibrio`
- 5 novos testes: 333 → **338 testes** passando

### 2. Escala tipográfica global para desktop (1360px+)
- Todos os textos do sistema foram aumentados 1 nível na hierarquia
- **10 arquivos modificados**: fine-tune-panel, shared-result-parts, results-panel, config-panel, ui-helpers, bidirectional-slider, gauge, tool-summary-viewer, formula-card, App.tsx

---

## 🎯 PRÓXIMA TAREFA

Story-004 está **COMPLETA**. Próximas opções:

### Opção A: HistoryPage responsiva (mobile-friendly)
- A HistoryPage atual não é responsiva — só funciona em desktop
- Adaptar layout para mobile: scroll vertical, cards em vez de tabela

### Opção B: Desktop — recursos pendentes
- Ícone customizado (.ico)
- Fontes offline no .exe
- Code signing (avançado)

### Opção C: Story-005 (a definir com usuário)
- Exportação melhorada (PDF com logo, Excel com fórmulas)
- Comparação de simulações
- Modo de aprendizado

### Verificação SEO (sugestão)
- Abrir https://validator.schema.org e colar a URL do GitHub Pages
- Verificar Lighthouse SEO ≥ 90 no Chrome DevTools

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
    fine-tune-panel.tsx       ← sliders Vc/fz/ae/ap + StyledSlider + gaveta educativa
    bidirectional-slider.tsx  ← slider bidirecional RPM/Feed (-150% a +150%)
    gauge.tsx                 ← gauge semicircular animado
    seo-head.tsx              ← injeta meta tags OG/Twitter dinamicamente
    mobile/
      mobile-fine-tune-section.tsx ← TouchSlider + gaveta educativa (igual desktop)
  pages/
    settings-page.tsx         ← Configurações (6 seções)
    history-page.tsx          ← Histórico de simulações
    mobile-page.tsx           ← versão mobile completa
  hooks/
    use-page-title.ts         ← seta document.title por rota
    use-is-mobile.ts
    use-simulation-animation.ts
    use-reset-feedback.ts
  App.tsx                     ← layout 3 colunas + header + SeoHead
  main.tsx                    ← BrowserRouter + Routes (web) / HashRouter (desktop)
  index.css                   ← Tailwind v4 @theme + keyframes

public/
  sitemap.xml                 ← todas as rotas públicas
  robots.txt                  ← Allow all + Sitemap

tests/                        ← 24 arquivos de teste (Vitest)
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
| `exit code 1` em vite build | Warnings do vite no stderr | Verificar output — se ✓ built, está OK |
| `toBeCloseTo(x, 0)` | Margem ±0.5, não ±1 | Usar `Math.abs(val - expected) <= 1` para tolerância ±1 |
| SF slider "não funciona" | Zera resultado sem recalcular | É design intencional — usuário clica Simular |
| Teste `fireEvent.change` em StyledSlider | Não tem `value setter` (div, não input) | Testar via `fireEvent.click` nos botões +/− |
| Clone desktop em testes | Vitest encontra arquivos do clone | `exclude: ['Sistema_Desktop_Pen_driver/**']` no vitest.config.ts |
| Tailwind class dinâmica | Classes com interpolação não geram CSS | Usar classes completas ou `style={}` inline |
| Mobile gaveta educativa | SLIDER_CONFIG separado do desktop | Agora sincronizado (sessão 6) |

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
[x] Tradução completa UI pt-BR
[x] Gaveta educativa accordion (desktop)
[x] Escala tipográfica global desktop
[x] Story-004: SEO Schema.org + meta tags
[x] Fix: gaveta educativa mobile (parity com desktop)

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
3. Perguntar ao usuário qual próxima tarefa:
   - HistoryPage responsiva?
   - Story-005?
   - Desktop features?

---

*Documento atualizado em 20/02/2026 — Sessão 6*
