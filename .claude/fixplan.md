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

## Fase 3: Calculation Engine
- [ ] src/types/ - interfaces TypeScript
- [ ] src/engine/rpm.ts - cálculo de RPM
- [ ] src/engine/feed.ts - cálculo de avanço
- [ ] src/engine/kienzle.ts - força de corte Kienzle
- [ ] src/engine/validators.ts - validação L/D, ranges
- [ ] tests/ - testes com valores de referência

## Fase 4: Dados Estáticos
- [ ] src/data/materials.json - 9 materiais
- [ ] src/data/tools.json - 3 tipos de ferramenta
- [ ] src/data/operations.json - tipos de operação

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
