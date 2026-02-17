# Synkra AIOS — Integração com ToolOptimizer CNC

**Versão:** 1.0
**Data:** 16/02/2026
**Status:** Ativo

---

## O que é

O Synkra AIOS é um framework de desenvolvimento assistido por IA que fornece:
- Sistema de agentes especializados (architect, dev, QA, PM, etc.)
- Story-driven development (toda feature começa com story documentada)
- Quality gates (build/test/typecheck antes de qualquer merge)
- Templates padronizados (stories, arquitetura, PRD)
- Architect-First philosophy (documentar antes de codar)

**Repositório de referência:** `C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core\`

---

## Como Aplicamos no ToolOptimizer

### Regras Ativas (todo assistente deve seguir)

1. **Story-Driven:** Não implementar nada sem story em `docs/stories/`
2. **Architect-First:** Documentar design antes de escrever código
3. **Quality Gates:** `npm run build` + `npm test` + `npx tsc --noEmit` devem passar
4. **No Invention:** Não inventar soluções. Pesquisar ou perguntar
5. **Map Before Modify:** Documentar estado atual antes de alterar
6. **Config > Hardcoding:** Dados de materiais/ferramentas/limites são externalizados
7. **Zero Coupling:** Engine CNC (`src/engine/`) independente da UI (`src/components/`)

### O Que NÃO Usamos

- CLI First (somos Web App First)
- Docker MCP (projeto frontend estático)
- Multi-agent squads (projeto solo)
- YAML configs (usamos TypeScript const)

---

## Workflow Padrão

```
Necessidade → Story → Design → Implementação (TDD) → Quality Gate → Commit → Done
```

### Criar Nova Feature

1. Criar story em `docs/stories/story-NNN-nome.md`
2. Definir acceptance criteria mensuráveis
3. Se for mudança arquitetural → criar ADR em `docs/architecture/`
4. Implementar com testes
5. Validar quality gates
6. Commit com conventional commits

### Corrigir Bug

1. Reproduzir com teste que falha
2. Corrigir com menor mudança possível
3. Verificar que suite inteira passa
4. Commit: `fix: descrição [Story-NNN]`

---

## Templates de Referência

### Story (simplificado do AIOS story-tmpl.yaml)

```markdown
# Story-NNN: [Título]

## Status: Draft
## Prioridade: P1
## Estimativa: Xh

## Story
**Como** operador CNC,
**Quero** [ação],
**Para que** [benefício]

## Acceptance Criteria
1. [ ] ...

## Tasks
- [ ] ...

## Dev Notes
[Contexto técnico completo — dev agent não deve precisar ler outros docs]

## Testing
[Requisitos de teste]
```

### ADR (Architecture Decision Record)

```markdown
# ADR-NNN: [Título]

**Status:** [Draft | Aceito | Depreciado]
**Data:** YYYY-MM-DD

## Contexto
[Por que essa decisão é necessária]

## Decisão
[O que foi decidido]

## Alternativas Consideradas
| Opção | Prós | Contras |
|-------|------|---------|

## Consequências
[Impacto positivo e negativo]
```

---

## Documentos do AIOS para Consulta

Quando precisar de referência mais profunda:

| Necessidade | Arquivo no AIOS |
|-------------|-----------------|
| Entender a filosofia | `docs/GUIDING-PRINCIPLES.md` |
| Template de arquitetura | `.claude/skills/architect-first/assets/architecture-template.md` |
| Template de story | `.claude/templates/story-tmpl.yaml` |
| Checklist pré-implementação | `.claude/skills/architect-first/references/pre-implementation-checklist.md` |
| Stop rules (quando parar) | `.claude/skills/architect-first/references/stop-rules-guide.md` |
| Regras de teste | `.claude/skills/architect-first/references/testing-strategy-guide.md` |
| Config do Claude Code | `.claude/CLAUDE.md` |

---

## Checklist para Assistentes IA

Antes de iniciar qualquer trabalho neste projeto:

- [ ] Ler `CLAUDE.md` (raiz do projeto)
- [ ] Verificar `docs/stories/` para stories ativas
- [ ] Verificar `.claude/fixplan.md` para roadmap atual
- [ ] Seguir quality gates (build + test + typecheck)
- [ ] Não criar arquivos/pastas fora de `INICIO_TOOLOPTIMIZERCNC/`
- [ ] Documentar decisões em ADRs quando relevante
- [ ] Referenciar story ID nos commits

---

## ADRs Existentes

| ADR | Decisão | Status |
|-----|---------|--------|
| ADR-001 | Stack: React 18 + TS + Vite 6 + Zustand + Tailwind v4 | Aceito |
| ADR-002 | CSS: Tailwind v4 utility (não CSS Modules) | Aceito |
| ADR-003 | Desktop/Mobile: páginas separadas | Aceito |
| ADR-004 | Adoção seletiva do Synkra AIOS | Aceito |

---

*Baseado no Synkra AIOS Framework v4.0 — adaptado para contexto solo dev + IA assistente*
