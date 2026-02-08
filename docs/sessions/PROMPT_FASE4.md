# Prompt para Nova Sessão — Fase 4: Dados Estáticos

Copie e cole isso na próxima sessão do Claude Code:

---

```
# MISSÃO: Fase 4 - Dados Estáticos (ToolOptimizer CNC)

## CONTEXTO
O projeto ToolOptimizer CNC tem Fases 1-3 concluídas:
- Fase 1: Git, estrutura de pastas, 12 docs, Context Engineering
- Fase 2: Toolchain configurado (Vite 6, React 18, TS strict, Zustand, Tailwind v4, Vitest)
- Fase 3: Calculation Engine com TDD (56 testes passando)
  - src/types/index.ts (enums, interfaces, constantes)
  - src/engine/ (rpm, chip-thinning, feed, power, validators + barrel export)
- Branch: main, npm run typecheck OK, npm run test OK (56 tests)

Diretório: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC

## LEITURA OBRIGATÓRIA ANTES DE EXECUTAR
1. Ler CLAUDE.md (convenções, regras críticas)
2. Ler .claude/agent.md (regras do agente, quality gates, fim de sessão)
3. Ler src/types/index.ts (interfaces Material, Ferramenta, LimitesMaquina, enums)
4. Ler docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md (constantes Kienzle)
5. Ler docs/technical/PRD_Velocidades_Corte_CNC.md (tabelas de Vc)

## O QUE FAZER

### Passo 1: src/data/materials.ts
Criar array tipado com os 9 materiais, usando a interface `Material` de src/types/index.ts.
Cada material deve ter: id, nome, iso, dureza, kc1_1, mc, vcRanges, status.

Dados dos 9 materiais:

| id | nome | iso | dureza | kc1_1 | mc | status |
|----|------|-----|--------|-------|----|--------|
| 1 | Aço 1020 | P | 120-160 HB | 1800 | 0.17 | validado |
| 2 | Aço 1045 | P | 170-220 HB | 2165 | 0.155 | validado |
| 3 | Aço Inox 304 | M | 140-180 HB | 2150 | 0.185 | validado |
| 4 | Alumínio 6061-T6 | N | ~95 HB | 1200 | 0.75 | estimado |
| 5 | P20 | P | 280-320 HB | 2300 | 0.20 | estimado |
| 6 | 2711 | P | 300-340 HB | 2500 | 0.20 | estimado |
| 7 | 8620 (núcleo) | P | 180-220 HB | 2100 | 0.20 | estimado |
| 8 | 8620 (cementado) | H | 58-62 HRC | 2800 | 0.20 | estimado |
| 9 | H13 | H | 45-52 HRC | 2800 | 0.20 | estimado |

Velocidades de corte (Vc) por operação [min, max] em m/min:

| Material | Desbaste | Semi-acabamento | Acabamento |
|----------|----------|-----------------|------------|
| Aço 1020 | [185, 250] | [220, 280] | [250, 350] |
| Aço 1045 | [150, 200] | [180, 240] | [200, 280] |
| Inox 304 | [60, 90] | [80, 120] | [100, 150] |
| Al 6061-T6 | [400, 600] | [500, 800] | [600, 1000] |
| P20 | [100, 120] | [120, 180] | [150, 200] |
| 2711 | [85, 105] | [100, 150] | [125, 170] |
| 8620 (núcleo) | [120, 180] | [150, 220] | [180, 250] |
| 8620 (cementado) | [60, 90] | [80, 120] | [100, 150] |
| H13 | [80, 125] | [100, 150] | [125, 170] |

**Importante:**
- Usar `as const satisfies readonly Material[]` para type-safety
- Exportar como `MATERIAIS` e como função `getMaterialById(id: number)`
- Materiais com status 'estimado' devem ter campo adequado para UI mostrar badge

### Passo 2: src/data/tools.ts
Criar constantes tipadas para os 3 tipos de ferramenta padrão.
Usar interface `Ferramenta` de src/types/index.ts.

| Tipo | Descrição PT | Z padrão | raioQuina |
|------|-------------|----------|-----------|
| toroidal | Toroidal (Bullnose) | 4 | Sim (ex: 1mm) |
| esferica | Esférica (Ball End) | 4 | N/A (raio = D/2) |
| topo | Topo Reto (Flat End) | 4 | N/A |

Exportar: `FERRAMENTAS_PADRAO` com diâmetros padrão [6, 8, 10, 12, 16, 20] mm.

### Passo 3: src/data/operations.ts
Criar constantes tipadas para os 3 tipos de operação.

| Enum | Nome PT | ap máx (mult D) | fz típico (mult) | Descrição |
|------|---------|-----------------|-------------------|-----------|
| desbaste | Desbaste | 1.0 | 1.0 | Remoção de material |
| semi | Semi-acabamento | 0.5 | 0.7 | Preparação superfície |
| acabamento | Acabamento | 0.3 | 0.5 | Acabamento final |

Exportar: `OPERACOES` com metadados de cada tipo.

### Passo 4: src/data/index.ts (barrel export)
Re-exportar tudo de materials, tools, operations.

### Passo 5: tests/data/materials.test.ts
Testes para o módulo de materiais:
- Deve ter exatamente 9 materiais
- Todos os ids devem ser únicos
- Todos os campos obrigatórios preenchidos
- kc1_1 > 0 e mc > 0 para todos
- vcRanges: min < max para todas as operações
- getMaterialById retorna material correto
- getMaterialById com id inválido retorna undefined
- Materiais validados: Aço 1020, Aço 1045, Inox 304
- Materiais estimados: os outros 6
- Cenário A (Aço 1045): Vc=100 dentro do range de desbaste [150,200]? → NÃO, mas 100 é valor usado no teste (dado pelo usuário)
- Verificar que iso classes estão corretas (P, M, N, H)

### Passo 6: tests/data/tools.test.ts
- Deve ter diâmetros padrão para cada tipo
- Todos os Z >= 1
- Tipos válidos: toroidal, esferica, topo

### Passo 7: tests/data/operations.test.ts
- Deve ter os 3 tipos de operação
- ap max multipliers corretos
- Nomes em português

### Passo 8: Validar tudo
- npm run typecheck (deve passar, zero any)
- npm run test (TODOS os testes passando - 56 anteriores + novos)
- Verificar que nenhum arquivo excede 200 linhas

### Passo 9: Atualizar Context Engineering (FIM DE SESSÃO)
- .claude/agent.md: estado → "Fase 4 concluída"
- .claude/fixplan.md: marcar itens da Fase 4 como [x]
- Criar docs/sessions/PROMPT_FASE5.md com prompt para próxima fase

### Passo 10: Commit
git add [arquivos específicos - nunca git add .]
git commit -m "feat: add static data (9 materials, tools, operations)"

## DADOS DE REFERÊNCIA RÁPIDA

### Interface Material (src/types/index.ts)
```typescript
interface Material {
  id: number;
  nome: string;
  iso: ClasseISO;        // 'P' | 'M' | 'N' | 'H'
  dureza: string;
  kc1_1: number;         // N/mm² (Kienzle)
  mc: number;            // Expoente Kienzle
  vcRanges: {
    [key in TipoUsinagem]: [number, number]; // [min, max] m/min
  };
  status: StatusValidacao; // 'validado' | 'estimado'
}
```

### Enum TipoUsinagem
```typescript
enum TipoUsinagem {
  DESBASTE = 'desbaste',
  SEMI_ACABAMENTO = 'semi',
  ACABAMENTO = 'acabamento',
}
```

### Engine já implementado (src/engine/)
- calculateRPM(vc, d)
- calculateEffectiveFz(fz, ae, d)
- calculateFeedRate(fzEfetivo, z, rpm)
- calculateMRR(ap, ae, vf)
- calculatePower(mrr, kc, efficiency)
- calculateTorque(power, rpm)
- validateLDRatio(l, d)
- validateInputs({d, ap, ae, fz, vc, z})
- validateMachineLimits({rpm, power, feed}, limits)

## RESULTADO ESPERADO
- 3 módulos data (materials, tools, operations)
- 3 arquivos de teste correspondentes
- 1 barrel export data/index.ts
- npm run typecheck: passa
- npm run test: todos passando (56 + novos ≈ 70+ testes)
- Zero `any`, zero warnings
- Context Engineering atualizado
- Prompt da Fase 5 criado
- Projeto pronto para Fase 5 (Zustand Store)
```
