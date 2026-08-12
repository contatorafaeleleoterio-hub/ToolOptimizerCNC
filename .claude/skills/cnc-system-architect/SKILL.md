---
name: cnc-system-architect
description: Arquitetura e organização de código do ToolOptimizer — criar componentes, estruturar features, decidir onde cada coisa vive.
---

# CNC System Architect

Guia de arquitetura do ToolOptimizer. Regras de código (tipos, validação, nomenclatura, fontes): skill `cnc-standards` — obrigatória junto com esta.

## Princípios
- Rafael não é dev full-time: código auto-explicativo, comentários em português, production-ready desde o início.
- Separação UI ≠ lógica ≠ estado: `components/` (JSX) · `lib/` (cálculo puro) · `store/` (Zustand).
- Antes de criar estrutura, decidir localização ou escolher lib: ler `references/architecture.md`; para padrões específicos, `references/best-practices.md`.

## Workflow
1. **Confirmar requisito:** o que fazer, onde colocar, quais tipos criar, como validar (cnc-parameters-validator).
2. **Consultar referências** (`architecture.md`, `best-practices.md` — ambos se for feature nova).
3. **Implementar.** Componentes novos com estrutura padrão podem usar o gerador:
   `python3 scripts/generate_component.py Nome --type form|display|layout|ui` (cria pasta + tsx + index + test). Não usar para modificar existentes.
4. **Documentar:** fórmulas com fonte, lógica não-óbvia, decisões de arquitetura.

## Padrões
**Componente:** imports (React → externas → internas → types) → interface `NomeProps` → função com state/handlers (`useCallback`)/render Tailwind.

**Estado:** `useState` para UI temporária e inputs; Zustand para dados compartilhados, histórico e preferências (store tipada com interface). Performance com `useMemo`/`useCallback` quando necessário — detalhes em `best-practices.md`.

**Types (`types/`):** um arquivo por domínio (`material.types.ts`, `calculation.types.ts`). Interfaces de domínio (`Material`, `Ferramenta`), props (`XxxProps`), dados de função (`ParametrosOperacao`, `ResultadoCalculo`), unions nomeadas (`TipoMaquina`, `NivelAlerta`).

**Tailwind:** classes agrupadas por categoria (layout → tamanho → espaçamento → aparência → responsivo); tema customizado e componentes base em `architecture.md`.

**Erros na UI:** `ValidationError` customizada + try-catch no handler do componente, exibindo `<Alert tipo="erro">`; cálculos em `lib/` seguem o padrão sem-throw da `cnc-standards`.

## Checklist antes de entregar
TypeScript zero erros/`any` · inputs validados · fórmulas com fonte e comentários PT · props tipadas · JSDoc completo · funções puras testáveis · imports organizados · nomenclatura PT consistente · useMemo/useCallback onde preciso · acessibilidade (labels, ARIA, semântica).

## Recursos
- `references/architecture.md` — estrutura completa, stack, decisões, deploy
- `references/best-practices.md` — Zustand, estado, performance
- `scripts/generate_component.py` — gerador de componentes
