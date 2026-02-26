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
| **Último commit** | ver `git log --oneline -3` |
| **Testes** | **401/401 passando** (25 arquivos) |
| **TypeScript** | **zero erros** |
| **Build** | **limpo** — JS 93.65KB gzip, CSS 12.83KB |
| **Remote** | `origin/main` sincronizado (GitHub) |
| **Worker** | ✅ LIVE — `https://tooloptimizercnc.contatorafaeleleoterio.workers.dev` |
| **GitHub Pages** | ✅ LIVE — deploy automático funciona |
| **CI (testes)** | ✅ passando no GitHub Actions |
| **Cloudflare Pages app** | ❌ projeto não existe — workflow usa `wrangler deploy` agora |
| **DNS Registro.br** | ✅ Propagado — nameservers `fatima` + `odin` ativos |
| **Custom Domains** | ✅ `tooloptimizercnc.com.br` + `app.tooloptimizercnc.com.br` configurados no Worker |
| **GitHub Secrets** | ✅ `CF_API_TOKEN` + `CF_ACCOUNT_ID` configurados |
| **CF_ACCOUNT_ID** | `6b8c90369455a504e560d9fac74eea0c` |
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

### Sessão 26/02 s15 — Custom Domains + Auditoria + Plano Login Google

**Contexto:** Verificação DNS, configuração de custom domains, auditoria completa do sistema e planejamento de login Google.

**O que foi feito:**
- ✅ **DNS propagado:** `nslookup` confirmou nameservers `fatima` + `odin` ativos
- ✅ **Custom domains configurados no Worker** (via Cloudflare Dashboard):
  - `tooloptimizercnc.com.br` → Worker `tooloptimizercnc`
  - `app.tooloptimizercnc.com.br` → Worker `tooloptimizercnc`
  - Verificado: `curl --resolve` retornou HTTP 200
- ✅ **Auditoria completa do sistema** — 3 agentes paralelos escanearam:
  - Testes/build, UI/design, engine/lógica
  - 15 issues encontrados em 3 categorias
  - **Decisão do usuário:** remover `forcaCorte` completamente (não corrigir)
- ✅ **Documentos de auditoria criados:**
  - `docs/PLANO_AUDITORIA.md` — plano completo 5 fases
  - `docs/IMPLEMENTACAO_SESSOES.md` — roadmap S1-S5 com checklists
  - Commit: `53ae29d`
- ✅ **Plano Login Google + Multi-Usuário aprovado:**
  - Firebase Auth (Google sign-in) + Cloud Firestore
  - Login opcional (guest mode = comportamento atual)
  - Sync entre dispositivos via Firestore
  - 5 fases (L1 a L5), ~8h total
- ✅ **Documentos de login criados:**
  - `docs/PLANO_LOGIN_GOOGLE.md` — plano completo Firebase Auth + Firestore
  - `docs/IMPLEMENTACAO_LOGIN.md` — roadmap L1-L5 com checklists
  - Commit: `f2ab4de`

**Commits desta sessão:**
- `53ae29d` docs: add audit plan and session-by-session implementation roadmap
- `f2ab4de` docs: add Google Login implementation plan and session roadmap

---

### ⚠️ PARA O PRÓXIMO ASSISTENTE — VERIFICAR E CONFERIR

#### Documentos criados nesta sessão (conferir existência e conteúdo):
| Documento | Caminho | Conteúdo |
|-----------|---------|----------|
| **Plano Auditoria** | `docs/PLANO_AUDITORIA.md` | 5 fases: correções críticas, design system, consistência visual, qualidade código, testes |
| **Roadmap Auditoria** | `docs/IMPLEMENTACAO_SESSOES.md` | Sessões S1-S5 com checklists detalhados |
| **Plano Login Google** | `docs/PLANO_LOGIN_GOOGLE.md` | Firebase Auth + Firestore, arquitetura, 5 fases, setup manual |
| **Roadmap Login** | `docs/IMPLEMENTACAO_LOGIN.md` | Sessões L1-L5 com checklists detalhados |

#### O que conferir ao iniciar:
1. **Custom domains respondendo?** `curl -s https://tooloptimizercnc.com.br -o /dev/null -w "%{http_code}"`
2. **Testes passando?** `npx vitest run` → 401 passando
3. **Build limpo?** `npx vite build`
4. **Documentos existem?** `ls docs/PLANO_AUDITORIA.md docs/IMPLEMENTACAO_SESSOES.md docs/PLANO_LOGIN_GOOGLE.md docs/IMPLEMENTACAO_LOGIN.md`

#### Duas iniciativas independentes — qual executar depende do usuário:
- **Auditoria:** Ler `docs/IMPLEMENTACAO_SESSOES.md` → executar próxima fase pendente (S1)
- **Login Google:** Ler `docs/IMPLEMENTACAO_LOGIN.md` → pré-requisito: Setup Manual Firebase → executar L1

---

### Sessão 25/02 s14 — Fix deploy-cloudflare.yml + documentação

**Contexto:** Verificação do estado pós-s13 + correção do workflow de deploy.

**O que foi feito:**
- ✅ **Diagnóstico GitHub Actions:** CI ✅ | GitHub Pages ✅ | **Cloudflare Pages deploy ❌** (2 execuções)
- ✅ **Root cause identificado:** workflow usava `wrangler pages deploy` mas o app é um Worker (não Pages). Além disso, token "Edit Cloudflare Workers" não tem permissão `Cloudflare Pages: Edit`
- ✅ **Fix deploy-app:** mudado de `wrangler pages deploy dist --project-name=tooloptimizercnc` para `wrangler deploy` (usa Worker via wrangler.jsonc)
- ✅ **Fix deploy-landing:** adicionado `continue-on-error: true` — não bloqueia o pipeline enquanto Pages project pendente
- ✅ **PROXIMA_SESSAO.md + MEMORY.md atualizados** com estado real da s13

**Próxima execução do workflow deve:**
- App deploy → `wrangler deploy` → ✅ deve passar (token tem Workers perms)
- Landing deploy → `wrangler pages deploy` → ainda falha (Pages project não existe ainda)

---

### Sessão 25/02 s13 — Cloudflare DNS + API Token + GitHub Secrets ✅

**Contexto:** Continuação da s12 — setup infra Cloudflare via browser automation.

**O que foi feito:**
- ✅ **Registro.br DNS:** nameservers alterados para `fatima.ns.cloudflare.com` + `odin.ns.cloudflare.com`
- ✅ **Cloudflare API Token criado:** template "Edit Cloudflare Workers" → token gerado (salvo nos Secrets do GitHub)
- ✅ **GitHub Secrets configurados:**
  - `CF_API_TOKEN` = token criado (não expor aqui — está seguro no GitHub)
  - `CF_ACCOUNT_ID` = `6b8c90369455a504e560d9fac74eea0c`
- ✅ **Push para main** → GitHub Actions disparado
- ⚠️ **Deploy Cloudflare Pages falhou** (workflow incorreto — corrigido na s14)

---

### Sessão 25/02 s12 — Setup Cloudflare DNS (parcial)

- ✅ Worker live confirmado em `tooloptimizercnc.contatorafaeleleoterio.workers.dev`
- ✅ Domínio `tooloptimizercnc.com.br` no Cloudflare Free — nameservers obtidos
- ✅ CF_ACCOUNT_ID: `6b8c90369455a504e560d9fac74eea0c`

---

### Sessão 24/02 s11 — Cloudflare Worker ativo + wrangler.jsonc

**Contexto:** Continuação do setup Cloudflare via browser automation (Claude in Chrome MCP).

**O que foi feito:**
- ✅ **Variável de build adicionada:** `VITE_BASE_URL=/` em Settings → Build → Variables and secrets
- ✅ **Merge do PR automático do Cloudflare** (`cloudflare/workers-autoconfig` branch):
  - `wrangler.jsonc` com `"not_found_handling": "single-page-application"` → SPA routing nativo (substitui workaround do 404.html)
  - `@cloudflare/vite-plugin` adicionado ao Vite
  - `wrangler` como devDependency
  - Script `deploy: npm run build && wrangler deploy`
- ✅ **Push → build disparado** → Worker rebuilding com `VITE_BASE_URL=/`
- ✅ **401 testes passando** após merge
- ✅ **Build OK** com `VITE_BASE_URL=/`

**Worker URL atual:** `https://tooloptimizercnc.contatorafaeleleoterio.workers.dev`

**Próximos passos manuais do usuário:**
1. **Verificar deploy** — aguardar build completar (1–2 min), testar `https://tooloptimizercnc.contatorafaeleleoterio.workers.dev`
2. **Adicionar domínio customizado** no Cloudflare: Settings → Domains & Routes → Custom domain → `app.tooloptimizercnc.com.br`
3. **DNS Cloudflare** → alterar nameservers do domínio `tooloptimizercnc.com.br` no Registro.br para os NS do Cloudflare
4. **Criar projeto landing** `tooloptimizer-landing` (pasta `landing/`) → domínio `www.tooloptimizercnc.com.br`
5. **GitHub secrets** `CF_API_TOKEN` + `CF_ACCOUNT_ID` (para o workflow `deploy-cloudflare.yml` funcionar)
6. **Google Search Console** + Bing Webmaster Tools (após DNS propagar 2–48h)

---

### Sessão 24/02 s10 — Estratégia Dual-Domain SEO (Fase 1 + 2 código)

**Commit Fase 1 (`3e1b73b`):**
- `index.html` → canonical + OG + Twitter → `app.tooloptimizercnc.com.br`; Schema.org com autor Mestre CNC + `ProductivityApplication`; FAQPage para rich snippets Google
- `landing/index.html` criado → landing page HTML/CSS puro para `www.tooloptimizercnc.com.br` (dark theme, <50KB, hero+features+FAQ+CTA)
- `public/sitemap.xml` + `robots.txt` → URLs atualizadas para novo domínio
- `public/_headers` criado → security headers Cloudflare (HSTS, X-Frame, nosniff)

**Commit Fase 2 (esta sessão):**
- `public/og-image.png` → logo oficial copiada (preview social WhatsApp/LinkedIn/Slack)
- `.github/workflows/deploy-cloudflare.yml` → CI/CD automático Cloudflare Pages (app + landing)
- `landing/_redirects` → suporte ao projeto landing no Cloudflare

**Domínio registrado pelo usuário:** `tooloptimizercnc.com.br`

**Próximos passos manuais do usuário:**
1. GitHub → Settings → Secrets: `CF_API_TOKEN` + `CF_ACCOUNT_ID`
2. Cloudflare Pages → criar projeto `tooloptimizer-app` (repo + build command + `VITE_BASE_URL=/`)
3. Cloudflare Pages → criar projeto `tooloptimizer-landing` (root `landing/`, sem build command)
4. Cloudflare → adicionar domínio e alterar nameservers no Registro.br
5. Google Search Console + Bing Webmaster Tools (após DNS propagar 2–48h)

---

### Sessão 24/02 s9 — Pesquisa Vc Etapa 1 (parcial, suspensa)
- **H13 validado:** Machining Doctor + aobosteel confirmam 80–125 / 100–150 / 125–170 m/min → valores do código **alinhados** ✅
- **Insight alumínio:** Al 6061-T6 NÃO usa TiAlN — fabricantes recomendam não revestido / DLC / PCD
- **Criado:** `docs/technical/PESQUISA_VC_VALIDADA.md` (WIP — H13 concluído, outros pendentes)
- **Pendente:** Al 6061-T6, P20, 2711, 8620 núcleo, 8620 cementado
- **Pendente:** `GITHUB_REFERENCIAS.md`
- **Zero commits** — sessão 100% pesquisa/documentação

### Sessão 22/02 s8 — Pesquisa Vc (somente pesquisa, zero código)
- **Pesquisa GitHub:** 15+ repositórios CNC analisados (CNC-ToolHub, brturn, pymachining, cnc-calc-react, etc.)
  - Nenhum usa Kienzle — ToolOptimizer é único
  - Padrões aproveitáveis: coating multipliers, machine rigidity classes, machinability index
- **Mapeamento completo do código Vc:** slider config (min=1, max=1200, step=1), vcRanges por material, engine 4 grupos, ParameterHealthBar normalização
- **Problema identificado:** Slider Vc com range fixo 1–1200 é genérico demais — precisa de range dinâmico por material
- **Zero commits** — sessão 100% pesquisa

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

## 🎯 PRÓXIMAS TAREFAS

### ✅ Infra Cloudflare (CONCLUÍDO s15)

- ✅ Fix deploy-app — `wrangler deploy` passa (commit `55f2580`)
- ✅ DNS propagado — nameservers Cloudflare ativos
- ✅ Custom domains — `tooloptimizercnc.com.br` + `app.tooloptimizercnc.com.br` no Worker

### 🟡 Duas Iniciativas Independentes (escolher com usuário)

#### Opção A — Auditoria do Sistema (5 sessões S1-S5)
- **Documento:** `docs/IMPLEMENTACAO_SESSOES.md`
- **Plano detalhado:** `docs/PLANO_AUDITORIA.md`
- **Próxima fase:** S1 — Correções Críticas (remover forcaCorte, fix landing links, vite base URL, CTF guard)

#### Opção B — Login Google + Multi-Usuário (5 sessões L1-L5)
- **Documento:** `docs/IMPLEMENTACAO_LOGIN.md`
- **Plano detalhado:** `docs/PLANO_LOGIN_GOOGLE.md`
- **Pré-requisito manual:** Setup Firebase Console (ver plano)
- **Próxima fase:** L1 — Firebase Setup + Auth Store + Login UI

### 🟡 Landing Page (pendente — 2 pré-requisitos)

**Pré-requisito A:** Criar projeto `tooloptimizer-landing` no Cloudflare Pages:
- `https://dash.cloudflare.com` → Pages → Create project → Connect to Git
- Nome: `tooloptimizer-landing` | Root dir: `landing/` | Build: nenhum

**Pré-requisito B:** Atualizar token `CF_API_TOKEN` com permissão `Cloudflare Pages: Edit`:
- `https://dash.cloudflare.com/profile/api-tokens`
- Editar token existente → Add permission → Cloudflare Pages: Edit
- OU criar novo token com ambas as permissões (Workers + Pages)
- Atualizar secret no GitHub

Depois de ambos: workflow `deploy-landing` deve passar automaticamente.

#### 5. Google Search Console + Bing (após DNS propagar)

- Google: `https://search.google.com/search-console` → Add property → `tooloptimizercnc.com.br`
- Bing: `https://www.bing.com/webmasters` → Add site → `tooloptimizercnc.com.br`

---

### ⏸️ Pesquisa Vc + Slider Dinâmico (PAUSADO)

> ⏸️ **EM PAUSA** — Pesquisa Vc está suspensa indefinidamente. Não retomar sem instrução explícita do usuário.
> Quando retomar: abrir `docs/technical/PESQUISA_VC_VALIDADA.md` — estado salvo lá.

### Pesquisa Vc + slider dinâmico (PAUSADO)

**Contexto:** Slider Vc (Fine Tune) tem range fixo 1–1200 m/min, genérico demais. Usuário quer range dinâmico por material — mas a pesquisa de validação está em pausa.

#### Passo 1 — Continuar pesquisa de fabricantes (PAUSADO — retomar da sessão 24/02)

> **Arquivo de referência:** `docs/technical/PESQUISA_VC_VALIDADA.md` (WIP — H13 ✅, restantes pendentes)

**H13 já validado** — valores do código confirmados. Retomar por:

1. **Al 6061-T6** — buscar "aluminum 6061 milling cutting speed uncoated carbide m/min"
   - Atenção: Al NÃO usa TiAlN — usar não revestido / DLC / PCD
   - Sites: Sandvik CoroPlus, Kennametal Machining Advisor, FSWizard

2. **P20 (AISI P20 = DIN 1.2311)** — buscar "P20 mold steel milling Vc carbide TiAlN"
   - Sites: Kennametal, Mitsubishi, Seco Tools

3. **2711 (bloqueador N/D)** — buscar "AISI P20H" ou "DIN 1.2738"
   - Fallback: usar P20 –15% se não encontrar dado primário

4. **8620 núcleo/cementado** — buscar por "DIN 1.6523" (equivalente ISO)

- Gerar `docs/technical/GITHUB_REFERENCIAS.md` com análise dos 15 repos (já feita em 22/02)

#### Passo 2 — Implementar range dinâmico no slider Vc
- Slider Vc deve adaptar min/max ao `material.vcRanges[operacao]`
- Exemplo: Inox 304 desbaste → slider 40–180 m/min (margem ±30% dos vcRanges)
- Exemplo: Alumínio acabamento → slider 400–1200 m/min
- Manter step=1 m/min

#### Passo 3 — Validar dados estimados
- 6 de 9 materiais são "Estimado" — precisam validação multi-fonte
- Material 2711 tem status "N/D" — pesquisar fontes primárias
- Aços de molde brasileiros (VP50, VP Atlas) podem não ter dados internacionais

### Pesquisa GitHub já concluída — achados principais:
- **CNC-ToolHub** (Python): coating multipliers (TiAlN=1.4x), machine rigidity classes
- **brturn/feeds-and-speeds** (JS): unitPower, chip thinning, 27 stars
- **pymachining** (Python): machinability index, cálculos com unidades
- **cnc-calc-react** (React+TS+Vite): mesmo stack, mas SEM base de materiais
- **Nenhum** projeto open-source usa Kienzle — ToolOptimizer é único
- **Nenhum** tem 401 testes — nosso coverage é o maior

---

### STORY-006 (após slider Vc) — opções futuras

| Opção | Descrição |
|-------|-----------|
| A | HistoryPage responsiva (mobile cards + filtros) |
| B | Desktop .exe melhorias (ícone, fontes offline, auto-updater) |
| C | Exportação PDF profissional |
| D | Comparação side-by-side de simulações |
| E | Dashboard de métricas rápidas |

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
  PLANO_AUDITORIA.md                   ← plano completo auditoria (5 fases)
  IMPLEMENTACAO_SESSOES.md             ← roadmap auditoria S1-S5 com checklists
  PLANO_LOGIN_GOOGLE.md                ← plano completo Firebase Auth + Firestore (5 fases)
  IMPLEMENTACAO_LOGIN.md               ← roadmap login L1-L5 com checklists
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
✅ Story-002: Deploy Cloudflare (Worker + Custom Domains LIVE)
✅ Story-003: CI/CD GitHub Actions
✅ Story-004: SEO Schema.org + meta tags
✅ Story-005: ParameterHealthBar (feedback visual Fine Tune)
⬜ Auditoria: 5 fases (S1-S5) → docs/IMPLEMENTACAO_SESSOES.md
⬜ Login Google: 5 fases (L1-L5) → docs/IMPLEMENTACAO_LOGIN.md
⬜ Story-006: [A DEFINIR com usuário]
⬜ MVP v1.0.0 (feature-complete)
⬜ Landing Page (Cloudflare Pages — setup manual pendente)
⬜ Desktop: ícone + fontes offline + code signing
```

---

*Última atualização: 26/02/2026 — Sessão 15 (Custom Domains + Auditoria completa + Plano Login Google)*
*Próximo assistente: leia este arquivo + verificar documentos listados na seção "PARA O PRÓXIMO ASSISTENTE"*
