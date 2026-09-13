# Prompt para Nova Sessão — Fase 3: Calculation Engine

Copie e cole isso na próxima sessão do Claude Code:

---

```
# MISSÃO: Fase 3 - Calculation Engine (ToolOptimizer CNC)

## CONTEXTO
O projeto ToolOptimizer CNC tem Fases 1 e 2 concluídas:
- Fase 1: Git, estrutura de pastas, 12 docs, Context Engineering
- Fase 2: Toolchain configurado e validado (Vite 6, React 18, TS strict, Zustand, Tailwind v4, Vitest)
- Commit atual: `9b0d2dd` (branch main, 3 commits)
- npm install OK, typecheck OK, test OK (0 tests)

Diretório: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC

## LEITURA OBRIGATÓRIA ANTES DE EXECUTAR
1. Ler CLAUDE.md (convenções, regras críticas, design tokens)
2. Ler .claude/agent.md (regras TDD, quality gates, tolerâncias)
3. Ler docs/technical/srctypes.md (tipos TypeScript completos)
4. Ler docs/technical/CASOS_TESTE_REFERENCIA.md (3 cenários de validação)
5. Ler docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md (constantes Kienzle, fórmulas, fluxo de cálculo)

## ABORDAGEM: TDD (Test-Driven Development)
Para CADA módulo: escrever testes PRIMEIRO, depois implementar.
Tolerâncias: RPM ±1, Feed ±1 mm/min, Power ±0.01 kW, Torque ±0.01 Nm

## O QUE FAZER

### Passo 1: src/types/index.ts
Criar tipos TypeScript baseados em docs/technical/srctypes.md:
- Enums: TipoUsinagem, ClasseISO, StatusValidacao
- Interfaces: Material, Ferramenta, ParametrosUsinagem, LimitesMaquina, StatusSeguranca, ResultadoUsinagem
- Constantes: LIMITES_PADRAO_MAQUINA, REGRAS_SEGURANCA
- Zero `any`, strict mode compliant

### Passo 2: src/engine/rpm.ts + tests/engine/rpm.test.ts
TDD - Testes primeiro:
- Fórmula: `n = (Vc × 1000) / (π × D)`
- Cenário A: Vc=100, D=12 → RPM=2652.58 (±1)
- Cenário B: Vc=500, D=10 → RPM=15915.49 (±1)
- Cenário C: Vc=95, D=8 → RPM=3780.23 (±1)
- Edge cases: D=0 (erro), Vc negativo (erro)
- Função pura com JSDoc incluindo fórmula e fonte

### Passo 3: src/engine/chip-thinning.ts + tests/engine/chip-thinning.test.ts
TDD - Testes primeiro:
- Fórmula CTF: quando ae < 50%D → fz_corr = fz / √(ae/D)
- Cenário A: ae=6, D=12 → ae/D=0.50 → CTF não aplica, fz_efetivo=0.08
- Cenário B: ae=2, D=10 → ae/D=0.20 → fz_corr = 0.10/√0.20 = 0.2236
- Cenário C: ae=2, D=8 → ae/D=0.25 → fz_corr = 0.05/√0.25 = 0.10
- Edge case: ae=D (100%), ae>D (erro)

### Passo 4: src/engine/feed.ts + tests/engine/feed.test.ts
TDD - Testes primeiro:
- Fórmula: `Vf = fz_efetivo × Z × n`
- Cenário A: fz=0.08, Z=4, n=2652.58 → Vf=848.83 (±1)
- Cenário B: fz_corr=0.2236, Z=4, n=15915.49 → Vf=14234.03 (±1)
- Cenário C: fz_corr=0.10, Z=4, n=3780.23 → Vf=1512.09 (±1)

### Passo 5: src/engine/power.ts + tests/engine/power.test.ts
TDD - Testes primeiro:
Implementar MRR, Potência e Torque:
- MRR: `Q = (ap × ae × Vf) / 1000` (cm³/min)
- Potência: `Pc = (Q × Kc) / (60000 × η)` onde η=0.80
- Torque: `M = (Pc × 9549) / n`
- Cenário A: Q=15.28, Kc=2000, Pc=0.64kW (±0.01), M=2.29Nm (±0.01)
- Cenário B: Q=28.47, Kc=700, Pc=0.42kW (±0.01), M=0.25Nm (±0.01)
- Cenário C: Q=6.05, Kc=2400, Pc=0.30kW (±0.01), M=0.77Nm (±0.01)

### Passo 6: src/engine/validators.ts + tests/engine/validators.test.ts
TDD - Testes primeiro:
- Validação L/D ratio:
  - L/D ≤ 3 → 'verde'
  - L/D 3-4 → 'amarelo'
  - L/D 4-6 → 'vermelho'
  - L/D > 6 → 'bloqueado' (throw ou flag)
- Validação de inputs: D>0, ap>0, ae>0, ae≤D, fz>0, Vc>0, Z≥1
- Validação vs limites de máquina: RPM ≤ maxRPM, Potência ≤ maxPotência, Feed ≤ maxFeed

### Passo 7: src/engine/index.ts (barrel export)
Re-exportar todas as funções do engine para facilitar imports.

### Passo 8: Validar tudo
- npm run typecheck (deve passar, zero any)
- npm run test (TODOS os testes passando)
- Verificar que nenhum arquivo excede 200 linhas

### Passo 9: Atualizar Context Engineering
- .claude/agent.md: estado → "Fase 3 concluída"
- .claude/fixplan.md: marcar itens da Fase 3 como [x]

### Passo 10: Commit
git add [arquivos específicos - nunca git add .]
git commit -m "feat: implement calculation engine with TDD (RPM, feed, power, validators)"

## DADOS DE REFERÊNCIA RÁPIDA

### Cenários de Teste (docs/technical/CASOS_TESTE_REFERENCIA.md)
| Cenário | Material | Op. | D | ap | ae | Vc | fz | Z | Kc | RPM | Vf | Pc | M | CTF |
|---------|----------|-----|---|----|----|----|----|---|----|----|----|----|---|-----|
| A | Aço 1045 | Desb | 12 | 3 | 6 | 100 | 0.08 | 4 | 2000 | 2652.58 | 848.83 | 0.64 | 2.29 | Não |
| B | Al 6061 | Acab | 10 | 1 | 2 | 500 | 0.10 | 4 | 700 | 15915.49 | 14234.03 | 0.42 | 0.25 | 2.24× |
| C | Inox 304 | Semi | 8 | 2 | 2 | 95 | 0.05 | 4 | 2400 | 3780.23 | 1512.09 | 0.30 | 0.77 | 2.0× |

### Fórmulas
- RPM: n = (Vc × 1000) / (π × D)
- CTF: quando ae < 50%D → fz_corr = fz / √(ae/D)
- Feed: Vf = fz_efetivo × Z × n
- MRR: Q = (ap × ae × Vf) / 1000
- Power: Pc = (Q × Kc) / (60000 × η), η=0.80
- Torque: M = (Pc × 9549) / n

### Constantes
- π = 3.14159265359
- η = 0.80 (eficiência CNC padrão)
- Safety factor: 0.7-0.8
- Máquina default: 12000 RPM, 15 kW, 80 Nm, 5000 mm/min

## RESULTADO ESPERADO
- 5 módulos engine (rpm, chip-thinning, feed, power, validators)
- 5 arquivos de teste correspondentes
- 1 arquivo types/index.ts
- 1 barrel export engine/index.ts
- npm run typecheck: passa
- npm run test: todos os testes passando (≥20 testes)
- Zero `any`, zero warnings
- Projeto pronto para Fase 4 (Dados Estáticos)
```
