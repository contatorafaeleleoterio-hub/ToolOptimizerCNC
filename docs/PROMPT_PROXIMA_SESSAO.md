# Prompt para Próxima Sessão Claude Code

**Copie e cole para iniciar:**

```
Continuar projeto ToolOptimizer CNC.

Contexto:
- Leia CLAUDE.md para convenções do projeto
- Leia docs/PROXIMA_SESSAO.md para estado atual
- Leia docs/stories/story-001-limpeza-tecnica.md para a tarefa

Tarefa: Implementar Story-001 (Limpeza Técnica + ADRs)

Fases:
1. Remover código morto (src/ui/styles/, src/cnc-engine/ se não usado)
2. Criar 3 ADRs em docs/architecture/
3. Organizar docs/ (remover story antiga CSS Modules)
4. Validar: build + testes + typecheck

Regras:
- Commit após cada fase
- npm test após mudanças em src/
- Não fazer mudanças fora do escopo
```

---

**Gerado:** 15/02/2026
**Story alvo:** Story-001 Limpeza Técnica
