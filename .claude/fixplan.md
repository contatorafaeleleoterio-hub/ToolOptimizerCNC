# Roadmap ToolOptimizer CNC

## Fase 1: Setup ✅
- [x] Git + .gitignore
- [x] Estrutura de pastas
- [x] Mover e organizar documentos
- [x] Context Engineering (CLAUDE.md, agent.md, fixplan.md)

## Fase 2: Toolchain ✅
- [x] package.json (React, Zustand, Vite, Tailwind, Vitest)
- [x] tsconfig.json (strict mode)
- [x] vite.config.ts
- [x] vitest.config.ts
- [x] npm install

## Fase 3: Calculation Engine ✅
- [x] src/types/index.ts - interfaces TypeScript (baseado em docs/technical/srctypes.md)
- [x] src/engine/rpm.ts + tests/engine/rpm.test.ts - cálculo de RPM (TDD)
- [x] src/engine/chip-thinning.ts + tests/engine/chip-thinning.test.ts - CTF (TDD)
- [x] src/engine/feed.ts + tests/engine/feed.test.ts - cálculo de avanço (TDD)
- [x] src/engine/power.ts + tests/engine/power.test.ts - MRR, potência, torque (TDD)
- [x] src/engine/validators.ts + tests/engine/validators.test.ts - L/D, ranges, limites (TDD)
- [x] src/engine/index.ts - barrel export
- Prompt: docs/sessions/PROMPT_FASE3.md

## Fase 4: Dados Estáticos ✅
- [x] src/data/materials.ts - 9 materiais (com Kienzle + Vc ranges)
- [x] src/data/tools.ts - 3 tipos de ferramenta (6 diâmetros padrão)
- [x] src/data/operations.ts - 3 tipos de operação
- [x] src/data/index.ts - barrel export
- [x] tests/data/ - 33 testes (materials, tools, operations)
- Prompt: docs/sessions/PROMPT_FASE4.md

## Fase 5: Zustand Store
- [ ] src/store/machining-store.ts
- [ ] Testes de integração do store

## Fase 6: UI Components
- [ ] Layout 3 colunas
- [ ] Painel de configuração (inputs)
- [ ] Painel de resultados (RPM, Avanço, Potência)
- [ ] Painel de impactos (accordions)
- [ ] Sistema de semáforo visual

---

## Protocolo de Bug Fix

### Quando algo quebra:
1. **Diagnóstico** - Ler mensagem de erro completa
2. **Isolar** - engine/, store/, components/, ou data/?
3. **Reproduzir** - Escrever teste que falha
4. **Corrigir** - Menor mudança possível
5. **Verificar** - Teste passa + suite completa sem regressão
6. **Documentar** - Comentário explicando o POR QUÊ

### Problemas Comuns
- **NaN no cálculo:** Checar inputs undefined/null, divisão por zero (D=0, Z=0)
- **TypeScript strict errors:** Definir tipos corretos, nunca usar `as any`
- **Zustand não atualiza UI:** Verificar se está retornando novo objeto (imutabilidade)
- **Teste passa local mas valores diferentes:** Usar toBeCloseTo, não toBe
