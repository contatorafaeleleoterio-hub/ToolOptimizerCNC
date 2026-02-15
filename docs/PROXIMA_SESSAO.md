# PRÓXIMA SESSÃO: Validar Deploy Cloudflare + Domínio

**Data atualização:** 15/02/2026
**Status:** Story-002 Fase 1 concluída (código) — aguardando setup manual Cloudflare + Registro.br

---

## O QUE FOI FEITO (sessão 15/02/2026 — segunda)

### Story-002: Deploy Cloudflare + Domínio — EM PROGRESSO

**Fase 1: Build condicional dual deploy — CONCLUÍDA**
1. `vite.config.ts`: base lê de `VITE_BASE_URL` env var (default: `/ToolOptimizerCNC/`)
2. `src/main.tsx`: BrowserRouter basename derivado de `import.meta.env.BASE_URL`
3. `public/_redirects`: SPA catch-all para Cloudflare Pages
4. Story doc: `docs/stories/story-002-deploy-cloudflare.md`
5. Testes: 325 passing, build OK

**Decisões tomadas:**
- Domínio: `tooloptimizercnc.com.br`
- Cloudflare free tier (R$0/mês)
- Manter GitHub Pages como fallback
- Custo total: ~R$40/ano (só domínio)

**Fases pendentes (manuais — usuário):**
- Fase 2: Criar conta Cloudflare
- Fase 3: Setup Cloudflare Pages (connect GitHub, env var `VITE_BASE_URL=/`)
- Fase 4: Registrar domínio `tooloptimizercnc.com.br` no Registro.br
- Fase 5: Apontar DNS → Cloudflare nameservers
- Fase 6: Validar todas as rotas no domínio

### Sessão anterior (Story-001): CONCLUÍDA
- Commits: `37fb817`, `a5e1ce6`, `75a4984`, `ed6529f`

### Commits desta sessão:
- `577a8e5` feat: support dual deploy with conditional base URL

---

## RESUMO DO PROJETO

### Stack:
- React 18.3 + TypeScript 5.7 (strict) + Vite 6.1
- Zustand 5.0 + react-router-dom 7.13
- Tailwind CSS v4.0 (@theme tokens, dark glassmorphism)
- Vitest 3.0 + Testing Library
- localStorage, sem backend
- **Deploy:** GitHub Pages (fallback) + Cloudflare Pages (principal, pendente setup)

### Estado Atual:
- **Branch:** main (up to date com origin)
- **Último commit:** `577a8e5` feat: support dual deploy with conditional base URL
- **Testes:** 325 passing (23 arquivos)
- **Bundle:** ~96KB gzip (JS 85KB + CSS 11KB)
- **GitHub:** https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC
- **Rotas:** `/` (desktop), `/mobile` (auto-detect), `/settings`, `/history`

---

## PRÓXIMA TAREFA: Completar Story-002 (Fases 2-6)

### Pré-requisito (manual pelo usuário):
1. Conta Cloudflare + projeto Pages conectado ao GitHub
2. Env var no Cloudflare: `VITE_BASE_URL=/` e `NODE_VERSION=20`
3. Domínio `tooloptimizercnc.com.br` registrado no Registro.br
4. DNS apontado para Cloudflare nameservers

### O que Claude valida na próxima sessão:
1. Verificar deploy no `*.pages.dev`
2. Verificar 4 rotas + refresh (SPA redirect)
3. Verificar GitHub Pages continua como fallback
4. Verificar HTTPS no domínio .com.br
5. Fechar Story-002, atualizar docs

---

## ROADMAP

### Semana 1 (10h):
- [x] Story-001: Limpeza técnica + ADRs — CONCLUÍDA
- [~] Story-002: Deploy Cloudflare + domínio — Fase 1 OK, setup manual pendente
- [ ] Story-003: CI/CD GitHub Actions (2h)
- [ ] Buffer/ajustes (2h)

### Semana 2-3:
- [ ] Story-004: SEO Schema.org + meta tags
- [ ] Story-005: Conteúdo MestreCNC (templates artigos)
- [ ] Validações técnicas fórmulas CNC
- [ ] Polimento UI/UX

---

## REGRAS PARA SESSÕES CLAUDE

### Claude Code deve:
1. Ler CLAUDE.md + docs/PROXIMA_SESSAO.md para contexto
2. Rodar testes após cada mudança em src/
3. Conventional commits (feat:, fix:, refactor:, docs:)
4. Commit após cada fase
5. Validar build antes de finalizar
6. **AO FINAL: gerar prompt de continuação** (ver docs/stories/GUIA-USO-CLAUDE-CODE.md)
