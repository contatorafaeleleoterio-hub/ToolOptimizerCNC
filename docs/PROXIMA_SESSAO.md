# PRÓXIMA SESSÃO: Story-002 Deploy Cloudflare

**Data atualização:** 15/02/2026
**Status:** Story-001 concluída — pronto para Story-002

---

## O QUE FOI FEITO (sessão 15/02/2026)

### Story-001: Limpeza Técnica + ADRs — CONCLUÍDA
1. **Fase 1:** Remoção de código morto (-5666 linhas)
   - Deletado `src/ui/` (18 arquivos JSX legados, protótipo pré-TypeScript)
   - Deletado `src/cnc-engine/` (2 arquivos JS, engine antigo)
   - Deletado `src/ui/styles/index.css` (2324 linhas CSS Tailwind v3, nunca importado)
   - Limpeza de artefatos: `nul`, `plan.md`, `~$OXIMA_SESSAO.md`
2. **Fase 2:** 3 ADRs criados em `docs/architecture/`
   - ADR-001: Stack tecnológica
   - ADR-002: Estratégia CSS (Tailwind v4, CSS Modules descartado)
   - ADR-003: Separação desktop/mobile
3. **Fase 3:** Removida story-001-css-isolado.md (obsoleta)
4. **Fase 4:** Build + testes + typecheck validados, push feito

### Correções de documentação:
- PROXIMA_SESSAO.md reescrito (removia info errada: Electron, Vite 5, CSS global)
- GUIA-USO-CLAUDE-CODE.md simplificado e adicionada diretriz de prompt de continuação
- Story-001 original (CSS Modules) cancelada e substituída por Limpeza Técnica

### Commits desta sessão:
- `37fb817` refactor: remove legacy JSX app and old engine code, update project docs
- `a5e1ce6` docs: add ADR-001 stack, ADR-002 CSS strategy, ADR-003 mobile separation
- `75a4984` docs: remove obsolete CSS Modules story (replaced by limpeza-tecnica)

---

## RESUMO DO PROJETO

### Stack:
- React 18.3 + TypeScript 5.7 (strict) + Vite 6.1
- Zustand 5.0 + react-router-dom 7.13
- Tailwind CSS v4.0 (@theme tokens, dark glassmorphism)
- Vitest 3.0 + Testing Library
- localStorage, GitHub Pages, sem backend

### Estado Atual:
- **Branch:** main (up to date com origin)
- **Último commit:** `75a4984` docs: remove obsolete CSS Modules story
- **Testes:** 325 passing (23 arquivos)
- **Bundle:** ~96KB gzip (JS 85KB + CSS 11KB)
- **GitHub:** https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC
- **Rotas:** `/` (desktop), `/mobile` (auto-detect), `/settings`, `/history`

---

## PRÓXIMA STORY: Story-002 — Deploy Cloudflare + Domínio

### Objetivo:
Migrar deploy de GitHub Pages para Cloudflare Pages. Comprar e configurar domínio .com.br.

### A definir (decisões para início da story):
- Domínio escolhido? (ex: tooloptimizer.com.br, mestrecnc.com.br)
- Manter GitHub Pages como fallback ou desativar?
- Cloudflare free tier é suficiente?

### Fases previstas:
1. Setup Cloudflare Pages (connect GitHub repo)
2. Configurar build (Vite, SPA redirect)
3. Comprar domínio (Registro.br)
4. Apontar DNS para Cloudflare
5. SSL + cache headers
6. Validar: desktop + mobile + todas as rotas

---

## ROADMAP

### Semana 1 (10h):
- [x] Story-001: Limpeza técnica + ADRs — CONCLUÍDA
- [ ] Story-002: Deploy Cloudflare + domínio (3-4h)
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
