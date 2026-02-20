# PROXIMA SESSAO: Tool Correction Factor + Slider Fixes — Pronto para Story-004

**Data atualizacao:** 19/02/2026 (sessão 3)
**Status:** 333 testes passando — features de configurações expandidas

---

## ESTADO ATUAL DO PROJETO

### Branch e Commits
- **Branch:** main
- **Ultimo commit:** `4b194d9` style: redesign tool correction factor UI with modal drawer + compact table
- **Testes:** 333 passing (24 arquivos) — LIMPOS
- **Bundle:** ~99KB total (JS 87KB gzip + CSS 12KB gzip)
- **GitHub:** https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC
- **Deploy:** GitHub Pages ativo + CI pipeline ativo
- **Desktop:** `Sistema_Desktop_Pen_driver/` — .exe portátil 85MB (Electron v40.4.1)
- **Versão:** `0.2.0` (SemVer — ver ADR-006)

### Commits Recentes (sessão 19/02 s3)
```
4b194d9  style: redesign tool correction factor UI with modal drawer + compact table
3c9dbf1  feat: add tool correction factor (coating/geometry multiplier) per tool type + diameter
a6f66b4  style: replace native SF slider with StyledSlider + ±buttons in Settings
16d2212  refactor: move safety factor from dashboard to Settings page
f6162bf  docs: session summary 19/02 session 2 - unified slider/button design
8fa2545  fix: exclude desktop clone from vitest and update operation type tests
```

---

## O QUE FOI IMPLEMENTADO (sessão 19/02/2026 — sessão 3)

### ✅ Slider Fator de Segurança (Configurações → Segurança)
**Arquivo:** `src/pages/settings-page.tsx`
- Substituído `<input type="range">` nativo por `StyledSlider` customizado
- Adicionados botões − e + nas extremidades (mesmo `BTN_CLS`)
- Ring + dot + glow + scale(1.15) — idêntico ao Fine Tune e BidirectionalSlider
- Teste atualizado: usa botão click em vez de `fireEvent.change`

### ✅ Fator de Correção por Ferramenta (novo feature completo)
**Arquivos:** `src/types/index.ts`, `src/store/machining-store.ts`, `src/pages/settings-page.tsx`

**Tipo:**
```ts
interface ToolCorrectionFactor {
  tipo: 'toroidal' | 'esferica' | 'topo';
  diametro: number;
  fator: number;        // 0.5 a 1.5, default 1.0
  descricao?: string;   // ex: "TiAlN", "DLC"
}
```

**Store:**
- `toolCorrectionFactors: ToolCorrectionFactor[]` no state
- `setToolCorrectionFactor(tcf)` — upsert por (tipo, diametro)
- `removeToolCorrectionFactor(tipo, diametro)` — remove
- Persiste em localStorage via `partialize`
- Aplicado em `calcular()`: `vc = parametros.vc * corrFactor` e `fz = parametros.fz * corrFactor`

**UI (Configurações → Ferramentas):**
- Tabela compacta por tipo de ferramenta — todos os diâmetros padrão + customizados
- Linhas com fator ativo destacadas em cyan + badge "N ativos"
- Botão **Editar** → abre `CorrectionModal` (drawer/modal)
- `CorrectionModal`: fixed overlay + backdrop-blur, slide-from-bottom mobile, centralizado desktop
  - Slider com botões −/+ (0.50 a 1.50, step 0.05)
  - Campo de descrição opcional
  - Botões: Salvar / Resetar (volta a 1.00) / Cancelar

---

## ESTRUTURA DE ARQUIVOS (atualizada)

```
src/
  types/index.ts              — ATUALIZADO: +ToolCorrectionFactor
  store/machining-store.ts    — ATUALIZADO: +toolCorrectionFactors, setToolCorrectionFactor, removeToolCorrectionFactor, aplica fator no calcular()
  pages/settings-page.tsx     — ATUALIZADO: StyledSlider SF + CorrectionModal + tabela ferramentas
tests/
  pages/settings-page.test.tsx — ATUALIZADO: SF test usa button click
```

---

## PROXIMAS TAREFAS

### 1. ⭐ Story-004: SEO Schema.org + meta tags — PRÓXIMA
**Status:** NÃO INICIADA
**Escopo:**
- `<meta>` tags: description, keywords, og:*, twitter:*
- Schema.org JSON-LD para SoftwareApplication
- `<title>` dinâmico por rota (`react-helmet-async` ou `document.title`)
- sitemap.xml + robots.txt (gerado no build)

**Arquivo:** `docs/stories/story-004-seo-schema.md` (criar)

### 2. Story-002 Fases 2-6: Deploy Cloudflare (MANUAL pelo usuário)
- Conta Cloudflare + projeto Pages conectado ao GitHub
- Env var: `VITE_BASE_URL=/` e `NODE_VERSION=20`
- Domínio `tooloptimizercnc.com.br` no Registro.br

### 3. Branch Protection no GitHub (MANUAL)
- Settings → Branches → Add rule para `main`
- ☑ Require status checks: `TypeCheck + Tests + Build`

### 4. HistoryPage responsiva (backlog)

### 5. Desktop .exe melhorias (backlog)
- Ícone customizado (`build/icon.ico`)
- Material Symbols font offline (~300KB woff2)
- Code signing (SmartScreen)

---

## REGRAS PARA SESSÕES CLAUDE

1. **PRIMEIRA AÇÃO:** Ler este arquivo completo
2. Rodar testes após cada mudança em `src/`
3. Conventional commits + push após cada fase
4. Validar: `typecheck` + `test` + `build` antes de finalizar
5. Usar apenas terminal interno (Bash)
6. **AO FINAL:** Atualizar `docs/PROXIMA_SESSAO.md` + `memory/MEMORY.md`
7. **TESTES store:** chamar `calcular()` explicitamente
8. **VERSIONAMENTO:** Bumpar `package.json` version após story completa (ver ADR-006)
9. **BUILD DESKTOP:** Se pedido, seguir `docs/architecture/ADR-005-electron-desktop-build.md`

---

## PADRÕES DE DESIGN CONSOLIDADOS

### Slider padrão (ÚNICO em todo o app — exceto BidirectionalSlider que é bidirecional)
`StyledSlider` — div customizado com:
- Track: `h-1.5 bg-black/40 rounded-full` + filled com glow
- Thumb: outer ring `border-2 border-${color}` + inner dot + glow on press + `scale(1.15)`
- Botões −/+ nas extremidades: `BTN_CLS = 'w-6 h-6 rounded bg-black/40 border border-white/10 ...'`
- Usado em: Fine Tune (Vc/fz/ae/ap), Fator de Segurança (Settings), CorrectionModal

### Botões de seleção (toggle/radio-like)
**PADRÃO ÚNICO:** `<button>` com className condicional:
```tsx
className={`... ${selected
  ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
  : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}
```
Usado em: Tipo Usinagem, Tipo Ferramenta, Raio Ponta, Arestas

### Modal/Drawer padrão (CorrectionModal é o exemplo)
```tsx
<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" /> {/* backdrop */}
  <div className="relative w-full sm:max-w-md bg-surface-dark border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-glass p-5 pb-8 sm:pb-5">
    <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" /> {/* handle */}
    ...
  </div>
</div>
```

---

## Fator de Correção — Detalhe Técnico

- **Onde é aplicado:** `calcular()` no store, ANTES de computar RPM/Feed/Power
- `vc = parametros.vc * corrFactor` — afeta RPM e toda a cadeia de cálculo
- `fz = parametros.fz * corrFactor` — afeta Feed, MRR, Power
- **Não afeta:** ap, ae (só multiplica velocidade de corte e avanço por dente)
- **Fator 1.0 = sem correção** (padrão para todas as ferramentas)
- **Persistência:** localStorage via Zustand partialize

---

## ROADMAP

### Semana 1: ✅ CONCLUÍDO
- [x] Story-001: Limpeza técnica + ADRs
- [~] Story-002: Deploy Cloudflare — Fase 1 OK, setup manual pendente
- [x] Animações profissionais
- [x] Sliders bidirecionais (RPM/Feed)
- [x] Reset feedback ao alterar parâmetros
- [x] Sticky Simular/Reset (desktop + mobile)
- [x] StyledSlider thumb estilizado (desktop Fine Tune)
- [x] Formatação numérica (toFixed(2))
- [x] Story-003: CI/CD GitHub Actions
- [x] Mobile fixes: Settings responsiva + touch targets
- [x] Desktop portable (.exe Electron) para pen drive
- [x] ADR-005 + ADR-006: Documentação desktop build + versionamento
- [x] Design unificado: sliders RPM/Feed = Fine Tune (ring+dot+glow)
- [x] Design unificado: botões Tipo Usinagem = Tipo Ferramenta
- [x] Fix vitest: excluir clone desktop do scan
- [x] Edit materiais (base + custom) com override pattern
- [x] Fator de Segurança movido para Settings + StyledSlider
- [x] Fator de Correção por Ferramenta (coating/revestimento)

### Semana 2-3:
- [ ] **Story-004: SEO Schema.org + meta tags ← PRÓXIMA**
- [ ] HistoryPage responsiva
- [ ] Branch protection GitHub (manual)
- [ ] Desktop melhorias: ícone, fontes offline, code signing

---

## PROMPT PARA PRÓXIMA SESSÃO

```
Leia o arquivo abaixo e continue de onde paramos:

C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\docs\PROXIMA_SESSAO.md
```
