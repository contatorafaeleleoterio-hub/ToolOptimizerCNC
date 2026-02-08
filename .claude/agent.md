# Agent - ToolOptimizer CNC

## Estado Atual
- **Fase:** 1 - Setup Inicial
- **Status:** Estrutura base criada, documentos organizados
- **Última ação:** Reorganização de 12 docs em docs/specs, docs/technical, docs/design

## Próxima Ação
- Fase 2: Configurar toolchain (package.json, TypeScript, Vite, Vitest)

## Stack
React 18 + TypeScript (strict) + Vite 6 + Zustand + Tailwind v4

## Regras do Agente

### Antes de Codificar
1. Ler CLAUDE.md para contexto do projeto
2. Ler a spec relevante em docs/specs/ ou docs/technical/
3. Verificar padrões existentes em src/ antes de criar novos
4. Se envolve cálculos, ler docs/technical/CASOS_TESTE_REFERENCIA.md primeiro

### Quality Gates
- `npm run typecheck` antes de commit
- `npm run test` e todos os testes passando
- Nenhum arquivo com mais de 200 linhas (refatorar se exceder)
- Zero `any` no TypeScript

### TDD para Cálculos
1. Escrever teste PRIMEIRO usando valores de CASOS_TESTE_REFERENCIA.md
2. Implementar função pura em src/engine/
3. Adicionar JSDoc com fórmula e fonte (Sandvik, Kennametal, ISO)
4. Tolerâncias: RPM ±1, Feed ±1 mm/min, Power ±0.01 kW, Torque ±0.01 Nm

### UI Components
1. Seguir design tokens de docs/design/UI_BRANDING.md
2. Dashboard prototype em docs/design/DASHBOARD.md como referência visual
3. Displays numéricos com font-mono
4. Color-code estados: verde=#2ecc71, amarelo=#f39c12, vermelho=#e74c3c

### Commits
- Conventional commits (feat:, fix:, test:, docs:, refactor:)
- Stage arquivos específicos (nunca `git add .` sem verificar)
- Nunca force push em main
