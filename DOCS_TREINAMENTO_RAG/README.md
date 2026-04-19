# Architecture Map Interativo - ToolOptimizer CNC

Mapa visual implementado em React para explicar a arquitetura do sistema em `/architecture`.

## Status atual

- Rota publica: `/architecture`
- Implementacao: `src/pages/architecture-page.tsx`
- Orquestrador visual: `src/components/architecture/architecture-map.tsx`
- Grafo manual tipado: `src/data/architecture-graph.ts`
- Cobertura atual: 8 grupos, 57 arquivos produtivos, 7265 linhas
- Escopo do grafo: arquivos `.ts` e `.tsx` produtivos dentro de `src/`
- Fora do escopo: testes dentro de `src/`, CSS, assets e diretorios vazios

## Niveis

### Level 1 - Visao Geral

Mostra 8 grupos:

- `entry`
- `pages`
- `components`
- `stores`
- `engine`
- `hooks`
- `data`
- `types`

Cada grupo mostra contagem de arquivos e total de linhas derivado do grafo manual.

### Level 2 - Modulos Expandidos

Expande um grupo e mostra os arquivos reais daquele grupo com conexoes relevantes baseadas em imports curados.

### Level 3 - Fluxo de Dados

Mostra um overlay com 16 etapas do pipeline de `calcular()` e `simular()`. Esse fluxo fica em um dataset proprio do componente `arch-data-flow.tsx`, separado do grafo de arquivos.

## Decisoes tecnicas

- SVG inline em React, sem dependencias novas
- Rota lazy-loaded em `src/main.tsx`
- Manutencao manual do grafo para entregar mais rapido
- Validacao automatica em `tests/architecture-graph.test.ts`
- Desktop-first, sem versao mobile dedicada no V1

## Documentos nesta pasta

- `README.md`: estado atual da feature
- `WORKFLOWS.md`: como manter o grafo atualizado
- `LAYOUT_SPECS.md`: resumo do layout implementado
- `CODEX_EXECUTION_PLAN.md`: registro resumido da implementacao entregue
