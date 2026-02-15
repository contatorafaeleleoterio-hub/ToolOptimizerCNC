# PRÓXIMA SESSÃO: Limpeza Técnica + Deploy

**Data atualização:** 15/02/2026
**Status:** Corrigido — pronto para implementação

---

## RESUMO DO PROJETO

### Stack Real (verificada):
- **Framework:** React 18.3 + TypeScript 5.7 (strict, zero `any`)
- **Build:** Vite 6.1
- **State:** Zustand 5.0
- **Styling:** Tailwind CSS v4.0 (dark theme, glassmorphism)
- **Routing:** react-router-dom 7.13
- **Testing:** Vitest 3.0 + Testing Library
- **Storage:** localStorage (sem backend)
- **Deploy:** GitHub Pages (SPA redirect configurado)
- **NÃO usa:** Electron, CSS Modules, CSS global customizado

### Estado Atual:
- **Localização:** C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
- **Branch:** main
- **Testes:** 272 passing (31 arquivos de teste)
- **Bundle:** ~87KB gzip (77KB JS + 10KB CSS)
- **GitHub:** contatorafaeleleoterio-hub/ToolOptimizerCNC
- **Mobile:** Página separada /mobile com auto-detect
- **Histórico:** Página /history com feedback de operador
- **Tempo disponível:** 10h/semana
- **Ferramenta:** Claude Code (CLI)

### Metodologia:
- Synkra AIOS como referência metodológica (stories, validação, fases)
- Localização AIOS: C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core\
- Implementação via Claude Code Desktop
- Custo: R$0 (sem API, só Claude Pro)

---

## ERROS CORRIGIDOS NESTA REVISÃO

| Erro no doc anterior | Realidade |
|---------------------|-----------|
| "Electron 28+" | NÃO usa Electron — é web app puro |
| "Vite 5" | Vite 6.1.0 |
| "CSS global" | Tailwind v4 com @theme tokens |
| "Build ~2.5MB" | ~87KB gzip |
| "Story-001: CSS Modules" | Desnecessário — Tailwind já resolve isolamento |
| "TailwindCSS (verificar se já usa)" | Sim, é a base de toda UI |

---

## PRÓXIMA STORY: Story-001 — Limpeza Técnica

### Objetivo:
Remover código morto, criar ADRs com decisões arquiteturais, e preparar codebase para deploy profissional.

### Entregáveis:
1. Remoção de src/ui/styles/index.css (2324 linhas mortas)
2. Remoção de src/cnc-engine/ (engine legado substituído por src/engine/)
3. ADR-001: Stack e arquitetura escolhida
4. ADR-002: Tailwind v4 como estratégia CSS
5. Testes passando, build limpo

### Tempo estimado: 2-3h

---

## ROADMAP ATUALIZADO

### Semana 1 (10h):
- [ ] Story-001: Limpeza técnica + ADRs (2-3h)
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
1. Ler CLAUDE.md para convenções do projeto
2. Rodar testes após cada mudança (`npm test`)
3. Usar conventional commits (feat:, fix:, refactor:, docs:)
4. Implementar incrementalmente (commit por fase)
5. Validar build antes de finalizar (`npm run build`)

### Rafael deve:
1. Commitar antes de sessões Claude Code
2. Validar cada fase (não deixar fazer tudo de vez)
3. Ler story completa antes de implementar

---

## NOTAS TÉCNICAS

### Arquitetura CSS (decisão final):
- Tailwind v4 utility classes = abordagem correta para este projeto
- CSS Modules NÃO necessários (sem conflitos de classe)
- Design tokens via @theme em src/index.css
- Inline styles APENAS para valores dinâmicos (cores, larguras calculadas)

### Código morto identificado:
- `src/ui/styles/index.css` — 2324 linhas, nunca importado (Tailwind v3 legado)
- `src/cnc-engine/` — engine antigo, substituído por `src/engine/`
- `docs/~$OXIMA_SESSAO.md` — arquivo temp do Word
- `nul` — artefato Windows

---

## COMO INICIAR PRÓXIMA SESSÃO

**Use este prompt:**

```
Continuar projeto ToolOptimizer CNC.
Contexto: Leia docs/PROXIMA_SESSAO.md e docs/stories/story-001-limpeza-tecnica.md
Tarefa: Implementar Story-001 (limpeza técnica + ADRs)
```

---

**Atualizado:** 15/02/2026
**Próxima atividade:** Story-001 Limpeza Técnica
**Status:** Pronto para implementar
