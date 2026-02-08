# Prompt para Continuar Fase 8 — Deployment & Final Polish

Copie e cole isso na próxima sessão do Claude Code:

---

```
# MISSÃO: Continuar Fase 8 - Deployment & Final Polish (ToolOptimizer CNC)

## CONTEXTO
Fase 8 foi iniciada e os seguintes passos foram concluídos:
- ✅ Build de produção: npm run build OK (JS 55KB gzip + CSS 8KB gzip = ~63KB)
- ✅ Typecheck: clean (zero errors, zero any)
- ✅ Tests: 164/164 passando
- ✅ Visual QA: layout 3 colunas, gauge, cards, sliders verificados no browser

## O QUE FALTA FAZER

### Passo 1: Deploy no Vercel
- Instalar Vercel CLI: npm i -g vercel
- Configurar vercel.json se necessário
- Deploy: vercel --prod
- Verificar URL de produção

### Passo 2: Performance Audit
- Rodar Lighthouse no URL de produção
- Target: >90 Performance score
- Bundle splitting se necessário

### Passo 3: README.md
- Atualizar com instruções de uso, stack, screenshots

### Passo 4: Final Validation
- npm run typecheck
- npm run test (164 testes)
- npm run build
- Verificar nenhum arquivo > 200 linhas

### Passo 5: Context Engineering (FIM DE SESSÃO)
- agent.md: estado → "Fase 8 concluída"
- fixplan.md: marcar todos itens [x]

### Passo 6: Commit
git add [arquivos específicos]
git commit -m "feat: production build, deploy, and final polish"
```
