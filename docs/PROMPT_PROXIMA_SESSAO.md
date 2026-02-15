# Prompt para Próxima Sessão — Copie e Cole

```
Continuar projeto ToolOptimizer CNC.
Localização: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
GitHub: https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC

ESTADO ATUAL:
- Último commit: 577a8e5 feat: support dual deploy with conditional base URL
- Testes: 325 passing (23 arquivos)
- Build: ~96KB gzip (limpo, zero erros)
- Story-002 (Deploy Cloudflare): Fase 1 concluída (código), fases manuais pendentes

O QUE JÁ FOI FEITO NA STORY-002:
- vite.config.ts: base condicional via VITE_BASE_URL env var
- src/main.tsx: BrowserRouter basename dinâmico
- public/_redirects: SPA catch-all para Cloudflare Pages
- Decisões: domínio tooloptimizercnc.com.br, Cloudflare free, GitHub Pages mantido

SETUP MANUAL FEITO (confirmar):
- [ ] Conta Cloudflare criada
- [ ] Cloudflare Pages conectado ao repo GitHub (env: VITE_BASE_URL=/, NODE_VERSION=20)
- [ ] Deploy funcionando em *.pages.dev
- [ ] Domínio tooloptimizercnc.com.br registrado no Registro.br
- [ ] DNS apontado para Cloudflare nameservers

CONTEXTO — leia estes arquivos:
1. CLAUDE.md (convenções do projeto)
2. docs/PROXIMA_SESSAO.md (estado completo)
3. docs/stories/story-002-deploy-cloudflare.md (fases da story)

TAREFA: Validar e completar Story-002 (Fases 2-6)

Fases:
1. Verificar deploy no *.pages.dev — todas as 4 rotas funcionam
2. Verificar SPA redirect (refresh em /mobile, /settings, /history)
3. Verificar GitHub Pages continua como fallback
4. Verificar HTTPS no domínio tooloptimizercnc.com.br
5. Fechar Story-002: atualizar docs, commit final
6. Se Story-002 OK: iniciar planejamento Story-003 (CI/CD GitHub Actions)

REGRAS:
- Commit após cada fase
- npm test após mudanças em src/
- Conventional commits
- AO FINAL: gerar prompt de continuação (ver docs/stories/GUIA-USO-CLAUDE-CODE.md)
```

---

**Gerado:** 15/02/2026
**Story alvo:** Story-002 Deploy Cloudflare (validação + fechamento)
**Story anterior:** Story-001 Limpeza Técnica (concluída)
