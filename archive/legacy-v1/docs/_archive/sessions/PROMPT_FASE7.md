# Prompt para Nova Sessão — Fase 7: Polishing & Export

Copie e cole isso na próxima sessão do Claude Code:

---

```
# MISSÃO: Fase 7 - Polishing & Export (ToolOptimizer CNC)

## CONTEXTO
O projeto ToolOptimizer CNC tem Fases 1-6 concluídas:
- Fase 1: Git, estrutura de pastas, 12 docs, Context Engineering
- Fase 2: Toolchain configurado (Vite 6, React 18, TS strict, Zustand, Tailwind v4, Vitest)
- Fase 3: Calculation Engine com TDD (56 testes passando)
  - src/engine/ (rpm, chip-thinning, feed, power, validators + barrel export)
- Fase 4: Dados Estáticos (89 testes passando)
  - src/data/ (materials, tools, operations + barrel exports)
- Fase 5: Zustand Store (120 testes passando)
  - src/store/machining-store.ts — store central com 7 actions + auto-recalculation
- Fase 6: UI Components (142 testes passando)
  - src/App.tsx — App shell with 3-column grid layout
  - src/components/config-panel.tsx — Material, operation, tool, params, machine limits, safety factor
  - src/components/results-panel.tsx — Overview cards, big numbers, progress bars, safety badge, warnings
  - src/components/fine-tune-panel.tsx — 4 sliders (Vc, fz, ae, ap) with real-time store update
  - src/components/disclaimer.tsx — Footer disclaimer
  - src/components/ui-helpers.tsx — SectionTitle, FieldGroup, NumInput shared components
  - index.html — Entry point with Google Fonts (Inter, JetBrains Mono, Material Symbols)
  - src/index.css — Tailwind v4 @theme with design tokens
  - tests/components/ — 22 component tests (config-panel: 14, results-panel: 8)
- Branch: main, npm run typecheck OK, npm run test OK (142 tests)

Diretório: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC

## LEITURA OBRIGATÓRIA ANTES DE EXECUTAR
1. Ler CLAUDE.md (convenções, design tokens, regras críticas)
2. Ler .claude/agent.md (regras do agente, quality gates, fim de sessão)
3. Ler docs/design/DASHBOARD.md (protótipo HTML — abrir no navegador para referência visual)
4. Ler src/App.tsx e todos os componentes em src/components/

## O QUE FAZER

### Passo 1: Visual Fidelity Review
Abrir o app com `npm run dev` e comparar com o protótipo (docs/design/DASHBOARD.md).
Ajustar espaçamentos, cores, tipografia e efeitos para ficarem fiéis ao protótipo:
- Glassmorphism correto (backdrop-blur-xl, border-white/5)
- Neon glow nos botões e big numbers
- Background gradient orbs (blur-[150px])
- Scrollbar customizada (6px, thumb cinza)
- Transições smooth (transition-all duration-500)

### Passo 2: Interatividade Polish
- Hover effects em cards e botões (scale, brightness, glow)
- Active state feedback (scale-[0.98])
- Smooth transitions nos resultados (quando muda valor)
- Loading state (se cálculo demora)

### Passo 3: Gauge SVG (Avanço)
- Implementar gauge SVG no results-panel (arco semi-circular)
- Gradiente cyan→green
- Valor dinâmico baseado em eficiência do avanço
- Animação do arco ao calcular

### Passo 4: Responsividade (1360px+)
- Garantir min-width: 1360px funciona bem
- max-w-[1500px] centralizado
- Overflow hidden no body (aspecto app nativo)
- Scrollbar apenas nos painéis internos

### Passo 5: Export Feature
- Botão para copiar resultados como texto formatado
- Botão para exportar como imagem (opcional: html2canvas)
- Formato de export com timestamp e parâmetros utilizados

### Passo 6: Testes Adicionais
- Testes para gauge SVG
- Testes de interação fine-tune panel
- Snapshot tests para visual regression (opcional)

### Passo 7: Validar tudo
- npm run typecheck (deve passar, zero any)
- npm run test (TODOS os testes passando - 142 anteriores + novos)
- npm run dev (dashboard renderiza corretamente)
- Nenhum arquivo excede 200 linhas

### Passo 8: Atualizar Context Engineering (FIM DE SESSÃO)
- .claude/agent.md: estado → "Fase 7 concluída"
- .claude/fixplan.md: marcar itens da Fase 7 como [x]
- Criar docs/sessions/PROMPT_FASE8.md

### Passo 9: Commit
git add [arquivos específicos - nunca git add .]
git commit -m "feat: polish UI, add gauge SVG and export functionality"

## RESULTADO ESPERADO
- Dashboard visualmente fiel ao protótipo
- Gauge SVG funcional
- Export feature (copy/image)
- Responsividade sólida em 1360px+
- npm run typecheck: passa
- npm run test: todos passando (142 + novos)
- Zero `any`, zero warnings
- Context Engineering atualizado
```
