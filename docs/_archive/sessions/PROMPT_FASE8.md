# Prompt para Nova Sessão — Fase 8: Deployment & Final Polish

Copie e cole isso na próxima sessão do Claude Code:

---

```
# MISSÃO: Fase 8 - Deployment & Final Polish (ToolOptimizer CNC)

## CONTEXTO
O projeto ToolOptimizer CNC tem Fases 1-7 concluídas:
- Fase 1: Git, estrutura de pastas, 12 docs, Context Engineering
- Fase 2: Toolchain configurado (Vite 6, React 18, TS strict, Zustand, Tailwind v4, Vitest)
- Fase 3: Calculation Engine com TDD (56 testes passando)
  - src/engine/ (rpm, chip-thinning, feed, power, validators + barrel export)
- Fase 4: Dados Estáticos (89 testes passando)
  - src/data/ (materials, tools, operations + barrel exports)
- Fase 5: Zustand Store (120 testes passando)
  - src/store/machining-store.ts — store central com 7 actions + auto-recalculation
- Fase 6: UI Components (142 testes passando)
  - src/App.tsx, src/components/ (config-panel, results-panel, fine-tune-panel, disclaimer, ui-helpers)
- Fase 7: Polishing & Export (164 testes passando)
  - src/components/gauge.tsx — SVG gauge (feed efficiency, cyan→green gradient)
  - src/components/export-buttons.tsx — Copy-to-clipboard com relatório formatado
  - Animated bottom borders em ProgressCards e sliders
  - min-width 1360px, smooth transitions
  - tests/components/ — 22 novos testes (gauge: 11, export-buttons: 11)
- Branch: main, npm run typecheck OK, npm run test OK (164 tests)

Diretório: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC

## LEITURA OBRIGATÓRIA ANTES DE EXECUTAR
1. Ler CLAUDE.md (convenções, design tokens, regras críticas)
2. Ler .claude/agent.md (regras do agente, quality gates, fim de sessão)
3. Ler docs/design/DASHBOARD.md (protótipo HTML — abrir no navegador para referência visual)

## O QUE FAZER

### Passo 1: Build de Produção
- npm run build — verificar que build completa sem erros
- Verificar tamanho do bundle (deve ser < 500KB gzip)
- Resolver quaisquer warnings do Vite

### Passo 2: Visual QA Final
- Abrir npm run preview
- Comparar lado-a-lado com protótipo (docs/design/DASHBOARD.md)
- Testar fluxo completo: selecionar material → tipo → ferramenta → simular → copiar
- Verificar gauge, hover effects, animated borders

### Passo 3: Performance Audit
- Lighthouse score (target: >90 em Performance)
- Verificar bundle splitting
- Lazy loading se necessário

### Passo 4: Deploy
- Configurar deploy (Vercel ou Netlify)
- Verificar que funciona em produção
- Testar em diferentes resoluções (1360px, 1920px, 2560px)

### Passo 5: Documentação Final
- Atualizar README.md com instruções de uso
- Screenshots do dashboard

### Passo 6: Validar tudo
- npm run typecheck (deve passar, zero any)
- npm run test (TODOS os 164 testes passando)
- npm run build (sem erros)
- Nenhum arquivo excede 200 linhas

### Passo 7: Atualizar Context Engineering (FIM DE SESSÃO)
- .claude/agent.md: estado → "Fase 8 concluída"
- .claude/fixplan.md: marcar itens da Fase 8 como [x]

### Passo 8: Commit
git add [arquivos específicos - nunca git add .]
git commit -m "feat: production build, deploy, and final polish"

## RESULTADO ESPERADO
- Build de produção funcional
- Deploy acessível online
- Performance score >90
- 164 testes passando
- Zero warnings, zero any
- README atualizado
```
