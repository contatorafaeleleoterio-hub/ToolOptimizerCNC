# Plano: Dívida Técnica + Melhorias — v0.5.1 / v0.5.2

> **Criado em:** 12/03/2026 — fim da sessão Architecture Map + Mobile View
> **Executar na próxima sessão** que tratar de v0.5.1

## Contexto

Sessão 12/03/2026 entregou: Architecture Map interativo (desktop) + Mobile View + ARCH-SYNC protocol.
Este plano cobre todos os itens pendentes identificados na retrospectiva.

Estado atual: v0.5.0 | 637 testes | build clean | `origin/main` sincronizado

---

## Prioridades e Ordem de Execução

### 🔴 FASE 0 — ARCH-SYNC (~30 min) — **SEM BUMP DE VERSÃO**

**Problema:** `arch-sync-diff.sh` usa `grep -P` que não funciona no Git Bash/Windows.
Script retorna falsos positivos (mostra TUDO como ADD).

**O que está fora de sincronia:**

| Tipo | Arquivo | Linhas registradas → reais |
|------|---------|---------------------------|
| ADD | `src/components/architecture/mobile-arch-group-card.tsx` | — → 76 |
| ADD | `src/components/architecture/mobile-arch-node-list.tsx` | — → 140 |
| ADD | `src/components/architecture/mobile-arch-data-flow.tsx` | — → 127 |
| ADD | `src/components/architecture/mobile-architecture-view.tsx` | — → 157 |
| DRIFT | `src/pages/architecture-page.tsx` | 57 → 84 |
| DRIFT | `src/data/architecture-graph.ts` | 379 → 420 |
| DRIFT | `src/store/machining-store.ts` | 417 → 469 |
| DRIFT | `src/engine/recommendations.ts` | 268 → 305 |
| DRIFT | `src/components/architecture/architecture-map.tsx` | 331 → 377 |
| DRIFT | `src/pages/settings-page.tsx` | 1015 → 1093 |
| + ~20 DRIFTs menores | (todos os arquivos cresceram) | — |

**Passos:**
1. Fix `scripts/arch-sync-diff.sh`: substituir `grep -oP` por equivalente POSIX (`grep -o` + `sed`)
2. Adicionar 4 nós em `NODE_SEEDS` de `architecture-graph.ts`:
   - group: `components` para todos os 4
   - categoria: `component`
   - edges: todos conectados a `architecture-page` via `renders`
3. Adicionar 4 entradas em `FILE_LINES`
4. Atualizar todos os DRIFTs > 20 linhas em `FILE_LINES`
5. Atualizar `metadata.lastUpdated: '2026-03-12'`
6. `npx vitest run tests/architecture-graph.test.ts` + `npm run typecheck`
7. Commit: `docs(arch-sync): sync architecture graph — 4 new mobile nodes + line drifts`

---

### 🟠 FASE 1 — BugReportModal (~45 min) — v0.5.0 → **v0.5.1**

**Arquivo:** `src/components/bug-report-button.tsx`

**Bug #1 — CRÍTICO: Card semi-transparente**
- `bg-surface-dark` = `rgba(22,27,34,0.7)` — conteúdo atrás vaza
- Fix: `style={{ backgroundColor: '#161B22' }}` no div do overlay/card do modal

**Bug #2 — MODERADO: Textarea sem maxLength**
- URL mailto tem limite ~2000 chars → falha silenciosa com texto longo
- Fix: `maxLength={500}` + contador `{description.length}/500`

**Bug #3 — MENOR: Ordem mailto/close**
- Modal pode fechar antes do email client abrir em alguns sistemas
- Fix: `setTimeout(() => { window.location.href = mailto }, 50)` + `onClose()` depois

**Testes:** adicionar em `tests/components/bug-report-button.test.tsx`:
- Verifica backgroundColor do card
- Verifica maxLength na textarea
- Verifica contador de caracteres

**Commit:** `fix(bug-report): fix modal transparency, textarea maxLength, mailto order`

---

### 🟡 FASE 2 — Remover Plausible (~15 min) — parte do v0.5.1

**Arquivo:** `index.html` (linhas ~109-111)

Remover:
```html
<!-- Plausible Analytics ... -->
<script defer data-domain="tooloptimizercnc.com.br" src="https://plausible.io/js/script.js"></script>
```

Motivo: script inativo (sem conta), Cloudflare Web Analytics já cobre tudo.

**Commit:** `chore: remove inactive Plausible script from index.html`
**Após:** bump `package.json` version: `0.5.0` → `0.5.1` + commit + `wrangler deploy`

---

### 🟢 FASE 3 — Favicon & Ícones (~90 min) — v0.5.1 → **v0.5.2**

**Fonte disponível:** `logo_p_favcon.png` (raiz do projeto ✓)

**Criar:**
1. `scripts/generate-icons.mjs` (Node ESM, usa `sharp` + `png-to-ico`)
   - Gera PNGs 16, 32, 48, 180, 192, 256, 512px
   - Gera `public/favicon.ico` (multi-size)
   - Copia para `Sistema_Desktop_Pen_driver/public/` e `build/`

2. `package.json` devDependencies: `sharp ^0.33`, `png-to-ico ^2.1`
3. `package.json` scripts: `"icons": "node scripts/generate-icons.mjs"`

4. `index.html` — adicionar após `<meta name="author">`:
   ```html
   <link rel="icon" href="/favicon.ico" sizes="any" />
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   <meta name="theme-color" content="#0F1419" />
   ```

5. `Sistema_Desktop_Pen_driver/index.html` — mesmas tags
6. `Sistema_Desktop_Pen_driver/electron-builder.json` — confirmar `"win": { "icon": "build/icon.ico" }`

**Commit:** `feat(icons): add favicon and app icons from logo_p_favcon.png`
**Após:** bump versão `0.5.1` → `0.5.2`

---

### 🔵 FASE 4 — TouchSlider Mobile Fix (próxima sessão disponível) — v0.5.2 → **v0.5.3**

> Plano detalhado: `docs/plans/PLAN_Fix_TouchSlider_Mobile.md`

**Arquivo:** `src/components/mobile/mobile-fine-tune-section.tsx`

Problema: qualquer toque no track altera valor + impede scroll da página.
Fix: zona de hit 60×60px no thumb com `touch-none`, remover do track, mover onChange para touchMove.

---

## Bump de Versão

| Fase | Conteúdo | Versão |
|------|---------|--------|
| FASE 0 | ARCH-SYNC (docs only) | sem bump |
| FASE 1+2 | Bug fixes + cleanup | 0.5.0 → **0.5.1** |
| FASE 3 | Favicon/icons | 0.5.1 → **0.5.2** |
| FASE 4 | TouchSlider fix | 0.5.2 → **0.5.3** |

---

## Verificação Final de Sessão

```bash
npx vitest run        # todos os testes verdes
npm run typecheck     # zero erros
npm run build         # build limpo
git push origin main  # sincronizado
wrangler deploy       # (apenas após v0.5.1 estar pronto)
```
