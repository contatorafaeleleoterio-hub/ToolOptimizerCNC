# Prompt para Próxima Sessão — Copie e Cole

```
Continuar projeto ToolOptimizer CNC.
Localização: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
GitHub: https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC

ESTADO ATUAL:
- Último commit: 75a4984 docs: remove obsolete CSS Modules story
- Testes: 325 passing (23 arquivos)
- Build: ~96KB gzip (limpo, zero erros)
- Story-001 (Limpeza Técnica + ADRs): CONCLUÍDA
- Protótipo funcional no GitHub Pages: desktop + mobile + settings + history

CONTEXTO — leia estes arquivos:
1. CLAUDE.md (convenções do projeto)
2. docs/PROXIMA_SESSAO.md (estado completo + o que foi feito)
3. docs/stories/GUIA-USO-CLAUDE-CODE.md (workflow + diretriz de prompt)

TAREFA: Planejar e implementar Story-002 (Deploy Cloudflare + Domínio)

Fases previstas:
1. Criar docs/stories/story-002-deploy-cloudflare.md com fases detalhadas
2. Setup Cloudflare Pages (connect GitHub, configurar build Vite)
3. Configurar SPA redirect para rotas (/mobile, /settings, /history)
4. Domínio .com.br (Registro.br) — apontar DNS, SSL
5. Validar todas as rotas: desktop + mobile + history + settings
6. Atualizar docs/PROXIMA_SESSAO.md

DECISÕES A TOMAR COMIGO:
- Qual domínio comprar?
- Manter GitHub Pages como fallback?
- Cloudflare free tier é suficiente?

REGRAS:
- Perguntar antes de decisões que envolvem custo ou serviço externo
- Commit após cada fase
- npm test após mudanças em src/
- Conventional commits
- AO FINAL: gerar prompt de continuação (ver docs/stories/GUIA-USO-CLAUDE-CODE.md)
```

---

**Gerado:** 15/02/2026
**Story alvo:** Story-002 Deploy Cloudflare
**Story anterior:** Story-001 Limpeza Técnica (concluída)
