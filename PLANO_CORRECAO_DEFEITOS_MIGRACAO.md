# Plano — correção dos 3 defeitos fora do escopo do PLANO_MIGRACAO.md

## Onde fica salvo
`C:\Users\USUARIO\Desktop\Projetos\ToolOptimizerCNC\PLANO_CORRECAO_DEFEITOS_MIGRACAO.md` (na raiz, ao lado de `PLANO_MIGRACAO.md` e `RELATORIO_REVISAO_PLANO.md`).
Por que a raiz: é o único lugar que a Fase 1 da migração não arquiva (`docs/plans/` vai inteiro para `archive/legacy-v1/`), e este plano precisa rodar antes da Fase 1.
Ao sair do modo plano: **só salvar este arquivo nesse caminho e informar o local**. Os passos 1–4 esperam "pode seguir".

## Contexto
Ao aplicar a revisão (A-01..A-08, S-01, S-02) em `ToolOptimizerCNC/PLANO_MIGRACAO.md`, apareceram 3 defeitos que não eram de nenhuma correção aprovada. Os 3 quebram a execução da Fase 1 ou da Fase 3 se ficarem como estão. Resultado esperado: o plano sem os 3 defeitos, com a mudança só nos trechos citados abaixo.

Regras da execução (iguais às da sessão anterior): só `PLANO_MIGRACAO.md` muda; nada de git add/commit/mv/checkout/tag/push, npm install, build ou deploy; nenhuma outra redação do plano é tocada.

## Evidência já conferida (somente leitura, 13/09/2026)
- D-01: no Fenix, o único arquivo rastreado na raiz de `src/` é `src/vite-env.d.ts` (`/// <reference types="vite/client" />`). A cópia da Fase 2 leva `src/core/`, `src/ui/` e `src/harness/`, mas não esse arquivo. Sem ele, o TypeScript não reconhece imports de imagem: o `import` do PNG da logo (A-05, Fase 3) quebra o `npm run check`. O `vite-env.d.ts` antigo vai para o arquivo na Fase 1, então não sobra nenhum.
- D-02: o `vitest.config.ts` do Fenix usa `include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx']` e o `tsconfig.json` usa `include: ["src/**/*", "vitest.config.ts", "vite.config.ts"]`. Os dois substituem os antigos na Fase 2 e nenhum alcança `archive/`. O `eslint.config.mjs` vai para o arquivo (A-03), e o `validate` roda sem eslint (A-08). A instrução de excluir `archive/` das três ferramentas não serve para nada.
- D-03: `git ls-files dist` = 0, e `dist` está no `.gitignore` (linhas 2 e 25). Todos os outros itens da lista da Fase 1 estão rastreados (conferido um a um: `src` 119, `docs` 221, `tests` 65, `coverage` 33, `android` 53, `gauntlet-*` 16/40, `memory` 1, `Rafael` 1, arquivos soltos e HTMLs da raiz). Só `dist/` falha no `git mv`.

## Passos
1. D-01 · Fase 2, passo 1 (~linha 68) — incluir `src/vite-env.d.ts` na lista de cópia, logo após `src/harness/`. Assim a nota "(substituído na Fase 2)" da Fase 1 passa a ser verdade. — **Haiku**
2. D-02 · Fase 1, parágrafo do `LEIA-ME.md` (~linha 62) — trocar a frase `Adicionar archive/ às exclusões do ESLint, do Vitest e do tsconfig, para o legado não entrar no build nem quebrar o typecheck.` por: `O legado fica fora do build e do typecheck sem exclusão manual: o ESLint vai para o arquivo, e o tsconfig.json e o vitest.config.ts que chegam do Fenix na Fase 2 só olham src/ — o portão da Fase 2 confirma.` O resto do parágrafo não muda. — **Haiku**
3. D-03 · Fase 1, lista de arquivamento (~linha 56) — `tests/ antigo, coverage/, dist/` vira `tests/ antigo, coverage/`. Na linha dos órfãos (~58), o fecho `Não entra: tsconfig.tsbuildinfo (fora do git).` vira `Não entra: tsconfig.tsbuildinfo e dist/ (fora do git; dist/ é saída de build que o npm run build da Fase 2 recria).` Com isso, a Fase 1 fica coerente com o "Risco principal", que manda deixar `dist/` fora de toda operação. — **Haiku**
4. Rastro · abaixo da linha 3 do plano — acrescentar: `Defeitos D-01 a D-03 (achados ao aplicar a revisão) corrigidos em <data da execução>.` — **Haiku**

## Verificação (colar comando + saída)
- `git status --short` nos dois repositórios, antes e depois: idêntico.
- `grep -n "src/vite-env.d.ts" PLANO_MIGRACAO.md` → 1 acerto, na Fase 2.
- `grep -n "exclusões do ESLint" PLANO_MIGRACAO.md` → 0.
- `grep -n "dist/" PLANO_MIGRACAO.md` → só na nota "Não entra" da Fase 1 e no "Risco principal"; nunca na lista de mover.
- `grep -n "D-01 a D-03" PLANO_MIGRACAO.md` → linha 4 ou 5 (abaixo do título).

## Achado novo (não entra neste plano, só registro)
`git ls-files --others` deu `Permission denied` em `gauntlet-calculadora-cnc-v2/state/reprovados/ciclo-1-nao-autorizado-2026-08-16/`. O `git mv` dessa pasta na Fase 1 pode falhar por falta de permissão. Vale conferir antes da Fase 1.
