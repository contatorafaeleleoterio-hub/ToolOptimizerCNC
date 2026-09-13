# Protocolo de Feature

> Guia story-driven para implementacao de features no ToolOptimizer CNC.
> Alinhado com Synkra AIOS: Architect-First, Map Before Modify, Quality Gates.

---

## Pre-requisito

Story deve existir em `docs/stories/` antes de comecar. Se nao existe:
1. Criar story com: objetivo, criterios de aceite, escopo, fora do escopo
2. Nomear: `story-NNN-descricao.md`

---

## Passo 1: Mapear Codigo Existente

**Map Before Modify (principio AIOS)**

Antes de propor qualquer mudanca:
1. Usar Glob/Grep para encontrar codigo relacionado
2. Ler arquivos completamente — entender padroes existentes
3. Identificar funcoes/componentes reutilizaveis
4. Documentar o que ja existe

**Licao do projeto:** Na unificacao dos indicadores (v0.4.2), o plano original propunha 5 arquivos e ranges estaticos no store. Mapeando o codigo, descobriu-se que `calcularSliderBounds()` ja resolvia o problema — resultado: 2 arquivos, zero mudancas no store.

---

## Passo 2: Validar Plano Contra Codebase

Se houver um plano de implementacao:
1. Auditar cada proposta contra o codebase real
2. Verificar se abstraccoes propostas ja existem
3. Contar arquivos e testes reais (nao estimados)
4. Corrigir o plano antes de executar

---

## Passo 3: Implementar com TDD

- **Calculos (engine/):** TDD — escrever teste primeiro, depois implementar
- **Componentes (components/):** Testes de integracao — implementar, depois testar render + interacao
- **Store:** Testar explicitamente chamando `getState().calcular()` (no auto-recalc)

Tolerancias padrao para testes:
- RPM: ±1 | Feed: ±1 | Power: ±0.01 | Torque: ±0.01

---

## Passo 4: Quality Gates

Apos cada mudanca significativa:
```bash
npx vitest run          # Testes
npx tsc --noEmit        # TypeScript
npx vite build          # Build producao
```

---

## Passo 5: Commit Convencional

```bash
git add <arquivos especificos>
git commit -m "feat(scope): descricao curta"
```

Convencoes: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `style:`

---

## Passo 6: Version Bump (se story completa)

- Story completa = MINOR bump (ex: 0.4.0 → 0.5.0)
- Bugfix = PATCH bump (ex: 0.4.0 → 0.4.1)
- Editar `package.json` → `"version"`
- Referencia: `docs/architecture/ADR-006-estrategia-versionamento.md`

---

## Passo 7: Atualizar Documentacao

Sugerir atualizacoes em:
- `docs/PROXIMA_SESSAO.md` — estado, sessao summary
- `docs/stories/` — story status
- `docs/plans/BACKLOG_IMPLEMENTACAO.md` — remover itens feitos, adicionar novos
- `docs/ai/memory/` — aprendizados

---

## Anti-padroes

- Criar abstracao nova sem verificar se ja existe
- Propor mudancas no store sem necessidade
- Hardcodar valores que devem ser dinamicos (ex: slider bounds)
- Implementar sem story definida
- Pular quality gates "so dessa vez"

---

## Referencia

- Stories: `docs/stories/`
- ADR versionamento: `docs/architecture/ADR-006-estrategia-versionamento.md`
- Framework AIOS: `docs/AIOS_INTEGRATION.md`
- Padroes: `docs/ai/memory/ARCHITECTURE_LEARNINGS.md`

---

*FENIX AI System | Protocolo de Feature*
