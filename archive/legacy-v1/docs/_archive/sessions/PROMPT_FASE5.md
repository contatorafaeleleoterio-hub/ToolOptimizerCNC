# Prompt para Nova Sessão — Fase 5: Zustand Store

Copie e cole isso na próxima sessão do Claude Code:

---

```
# MISSÃO: Fase 5 - Zustand Store (ToolOptimizer CNC)

## CONTEXTO
O projeto ToolOptimizer CNC tem Fases 1-4 concluídas:
- Fase 1: Git, estrutura de pastas, 12 docs, Context Engineering
- Fase 2: Toolchain configurado (Vite 6, React 18, TS strict, Zustand, Tailwind v4, Vitest)
- Fase 3: Calculation Engine com TDD (56 testes passando)
  - src/engine/ (rpm, chip-thinning, feed, power, validators + barrel export)
- Fase 4: Dados Estáticos (89 testes passando)
  - src/data/materials.ts (9 materiais com Kienzle + Vc ranges)
  - src/data/tools.ts (3 tipos ferramenta, 6 diâmetros padrão)
  - src/data/operations.ts (3 tipos operação com metadados)
  - src/data/index.ts (barrel export)
- Branch: main, npm run typecheck OK, npm run test OK (89 tests)

Diretório: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC

## LEITURA OBRIGATÓRIA ANTES DE EXECUTAR
1. Ler CLAUDE.md (convenções, regras críticas)
2. Ler .claude/agent.md (regras do agente, quality gates, fim de sessão)
3. Ler src/types/index.ts (interfaces completas)
4. Ler src/engine/index.ts (funções do engine disponíveis)
5. Ler src/data/index.ts (dados estáticos disponíveis)

## O QUE FAZER

### Passo 1: src/store/machining-store.ts
Criar o Zustand store central que gerencia todo o estado da aplicação.

O store deve conter:

**State:**
- materialId: number (default: 2 = Aço 1045)
- ferramenta: Ferramenta (default: topo, D=10, Z=4, balanco=30)
- tipoOperacao: TipoUsinagem (default: DESBASTE)
- parametros: ParametrosUsinagem (ap, ae, fz, vc - com defaults razoáveis)
- limitesMaquina: LimitesMaquina (usar LIMITES_PADRAO_MAQUINA)
- resultado: ResultadoUsinagem | null
- safetyFactor: number (default: 0.8)

**Actions:**
- setMaterial(id: number): void — atualiza materialId
- setFerramenta(f: Partial<Ferramenta>): void — merge parcial
- setTipoOperacao(tipo: TipoUsinagem): void
- setParametros(p: Partial<ParametrosUsinagem>): void — merge parcial
- setLimitesMaquina(l: Partial<LimitesMaquina>): void — merge parcial
- setSafetyFactor(f: number): void
- calcular(): void — executa todo o pipeline de cálculo:
  1. getMaterialById(materialId)
  2. calculateRPM(vc, D)
  3. calculateEffectiveFz(fz, ae, D) — chip thinning
  4. calculateFeedRate(fzEfetivo, Z, rpm)
  5. calculateMRR(ap, ae, vf)
  6. calculatePower(mrr, kc, efficiency)
  7. calculateTorque(power, rpm)
  8. validateLDRatio(balanco, D)
  9. validateMachineLimits({rpm, power, feed}, limites)
  10. Aplicar safetyFactor nos resultados
  11. Gerar StatusSeguranca com avisos
  12. Setar resultado no state
- reset(): void — volta ao estado inicial

**Regras:**
- Usar `as const satisfies` para defaults quando possível
- calcular() deve ser chamado automaticamente quando inputs mudam (subscribeWithSelector ou middleware)
- Se input inválido, resultado = null e avisos populados
- Safety factor multiplica potência e torque recomendados

### Passo 2: src/store/index.ts (barrel export)
Re-exportar o store.

### Passo 3: tests/store/machining-store.test.ts
Testes de integração do store:
- Estado inicial correto (defaults)
- setMaterial atualiza materialId
- setFerramenta faz merge parcial (muda D, mantém Z)
- setParametros faz merge parcial
- calcular() com Cenário A (Aço 1045, D=10, Vc=100): resultado.rpm ≈ 3183
- calcular() com material inválido: resultado = null
- calcular() gera avisos quando L/D > 3
- calcular() aplica safety factor
- reset() volta ao estado inicial
- validateMachineLimits integrado (potência > max → aviso)

### Passo 4: Validar tudo
- npm run typecheck (deve passar, zero any)
- npm run test (TODOS os testes passando - 89 anteriores + novos ≈ 100+ testes)
- Verificar que nenhum arquivo excede 200 linhas

### Passo 5: Atualizar Context Engineering (FIM DE SESSÃO)
- .claude/agent.md: estado → "Fase 5 concluída"
- .claude/fixplan.md: marcar itens da Fase 5 como [x]
- Criar docs/sessions/PROMPT_FASE6.md com prompt para próxima fase (UI Components)

### Passo 6: Commit
git add [arquivos específicos - nunca git add .]
git commit -m "feat: add Zustand machining store with integration tests"

## DADOS DE REFERÊNCIA RÁPIDA

### Cenário A - Aço 1045 (para testes)
- Material: id=2, kc1_1=2165, mc=0.155
- Ferramenta: D=10, Z=4, fz=0.1, balanco=30
- Vc=100 m/min → RPM ≈ 3183
- ae=5 (50% de D) → sem chip thinning → fz_eff = 0.1
- Feed = 0.1 × 4 × 3183 = 1273 mm/min
- ap=2, ae=5, vf=1273 → MRR = 12730 mm³/min
- Power, Torque calculados via engine

### Engine Functions (src/engine/)
- calculateRPM(vc, d) → number
- calculateEffectiveFz(fz, ae, d) → number
- calculateFeedRate(fzEfetivo, z, rpm) → number
- calculateMRR(ap, ae, vf) → number
- calculatePower(mrr, kc, efficiency) → { potenciaCorte, potenciaMotor }
- calculateTorque(power, rpm) → number
- validateLDRatio(l, d) → { nivel, mensagem }
- validateInputs({d, ap, ae, fz, vc, z}) → { valido, erros }
- validateMachineLimits({rpm, power, feed}, limits) → { dentro, avisos }

### Data (src/data/)
- MATERIAIS: readonly Material[] (9 materiais)
- getMaterialById(id): Material | undefined
- FERRAMENTAS_PADRAO: tool templates (3 tipos, 6 diâmetros)
- OPERACOES: operation metadata (3 tipos)

## RESULTADO ESPERADO
- 1 Zustand store (machining-store.ts)
- 1 barrel export (store/index.ts)
- 1 arquivo de teste de integração
- npm run typecheck: passa
- npm run test: todos passando (89 + novos ≈ 100+ testes)
- Zero `any`, zero warnings
- Context Engineering atualizado
- Prompt da Fase 6 criado
- Projeto pronto para Fase 6 (UI Components)
```
