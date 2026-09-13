# ADR-004: Adoção do Synkra AIOS como Framework de Desenvolvimento

**Status:** Aceito
**Data:** 16/02/2026
**Autor:** Rafael Eleotério

---

## Contexto

O projeto ToolOptimizer CNC chegou ao fim da Fase 7 (UI completa, 272+ testes, build funcional) e precisa escalar para Fase 2 (web, multi-user, SEO, deploy profissional). O desenvolvimento com múltiplos assistentes de IA causou inconsistências: pastas criadas fora do projeto, documentos duplicados, decisões não rastreadas.

Foi identificado o framework **Synkra AIOS** — uma arquitetura profissional para desenvolvimento assistido por IA que resolve exatamente esses problemas com: sistema de agentes especializados, story-driven development, quality gates, e templates padronizados.

## Decisão

Adotar princípios seletivos do Synkra AIOS adaptados ao contexto do ToolOptimizer:

### Princípios Adotados (OBRIGATÓRIOS)

| Princípio AIOS | Adaptação ToolOptimizer |
|----------------|------------------------|
| **Architect-First** | Documentar arquitetura ANTES de implementar. Toda feature nova precisa de design doc |
| **Story-Driven Development** | Todo desenvolvimento começa com story em `docs/stories/`. Sem story = sem código |
| **Quality Gates** | Build + testes + typecheck DEVEM passar antes de qualquer merge/deploy |
| **Zero Coupling** | Engine de cálculo CNC independente da UI. Portável para qualquer frontend |
| **Config > Hardcoding** | Materiais, ferramentas, limites de máquina = dados externalizados, nunca hardcoded |
| **No Invention** | IA não inventa soluções. Se não tem certeza, pesquisa ou pergunta |
| **Map Before Modify** | Antes de alterar, documentar estado atual e impacto |

### Princípios Adaptados (CONTEXTO TOOLOPTIMIZER)

| AIOS Original | Adaptação | Motivo |
|---------------|-----------|--------|
| CLI First | **Web App First** | ToolOptimizer é produto web para operadores CNC, não ferramenta CLI |
| Multi-Agent System | **Single Dev + IA assistente** | Projeto solo, Rafael + Claude. Sem squad |
| YAML configs | **TypeScript const + localStorage** | Stack já definida, sem overhead de YAML parser |
| Git push só via @devops | **Rafael faz push direto** | Projeto solo, sem necessidade de gate de deploy |

### Princípios NÃO Adotados

| Princípio | Motivo |
|-----------|--------|
| Docker MCP | Overhead desnecessário para projeto frontend estático |
| Squads/Expansion Packs | Projeto solo |
| Conventional Commits enforcement | Já segue por convenção, sem CI gate |

## Estrutura de Stories (Padrão Adotado)

Baseado no template AIOS `story-tmpl.yaml`, simplificado:

```markdown
# Story-NNN: [Título]

## Status: [Draft | InProgress | Review | Done]
## Prioridade: [P0 | P1 | P2]
## Estimativa: [Xh]

## Story
**Como** [persona],
**Quero** [ação],
**Para que** [benefício]

## Acceptance Criteria
1. [ ] Critério 1
2. [ ] Critério 2

## Tasks
- [ ] Task 1
  - [ ] Subtask 1.1
- [ ] Task 2

## Dev Notes
[Contexto técnico para o dev agent não precisar ler docs]

## Testing
[Requisitos de teste específicos]

## Change Log
| Data | Versão | Descrição |
|------|--------|-----------|
```

## Workflow de Desenvolvimento

```
1. Identificar necessidade
2. Criar story (docs/stories/)
3. Validar acceptance criteria
4. Implementar com TDD
5. Build + Test + Typecheck
6. Commit (conventional commits)
7. Marcar story como Done
```

## Referência

- Framework completo: `C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core\`
- CLAUDE.md do AIOS: `.claude\CLAUDE.md` (no repo AIOS)
- Architect-First skill: `.claude\skills\architect-first\SKILL.md`
- Templates: `.claude\templates\` (story, architecture, PRD)
- Guiding Principles: `docs\GUIDING-PRINCIPLES.md`

## Consequências

### Positivas
- Consistência entre sessões de desenvolvimento
- Rastreabilidade de decisões (ADRs)
- Quality gates previnem regressões
- Stories dão contexto completo para IA assistente
- Elimina problema de pastas/arquivos criados fora do projeto

### Trade-offs
- Overhead de documentação (mitigado por templates)
- Rigidez inicial (vale pela consistência a longo prazo)

## Validação
- [x] Rafael aprovou adoção seletiva
- [x] Princípios compatíveis com stack existente
- [x] Não quebra workflow atual, apenas adiciona estrutura
