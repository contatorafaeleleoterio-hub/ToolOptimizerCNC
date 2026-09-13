# Workflows e Manutencao - Architecture Map

Estado atual do mapa:

- 8 grupos no Level 1
- 57 arquivos produtivos mapeados
- manutencao manual em `src/data/architecture-graph.ts`
- validacao automatica em `tests/architecture-graph.test.ts`

## Workflow 1 - Adicionar um novo arquivo ao mapa

Use este fluxo sempre que um novo arquivo `.ts` ou `.tsx` produtivo for criado em `src/`.

1. Adicione uma entrada em `FILE_LINES` com o caminho relativo e a contagem real de linhas.
2. Adicione um item em `NODE_SEEDS` com:
   - `id`
   - `labelPt`
   - `category`
   - `filePath`
   - `group`
3. Adicione edges relevantes em `LEVEL2_EDGES`.
4. Se o novo arquivo criar uma conexao importante entre grupos, ajuste `LEVEL1_EDGES`.
5. Atualize `metadata.lastUpdated`.
6. Rode `npx vitest run tests/architecture-graph.test.ts`.

## Workflow 2 - Ajustar contagem de linhas

Quando arquivos existentes mudarem bastante, atualize `FILE_LINES`.

Comando util em PowerShell:

```powershell
$files = Get-ChildItem -Path src -Recurse -File |
  Where-Object { $_.Extension -in '.ts','.tsx' -and $_.Name -notmatch '\.test\.(ts|tsx)$' }
$files | ForEach-Object {
  $relative = $_.FullName.Replace((Get-Location).Path + '\\','').Replace('\\','/')
  "{0}`t{1}" -f $relative, (Get-Content $_.FullName | Measure-Object -Line).Lines
}
```

## Workflow 3 - Adicionar um novo grupo

Use apenas se surgir uma nova camada real no sistema.

1. Adicione o grupo em `GROUP_LAYOUT`.
2. Atribua os nodes ao novo `group`.
3. Ajuste as posicoes do Level 1 se necessario.
4. Atualize a legenda e os edges de alto nivel.
5. Rode os testes do mapa e a build.

## Workflow 4 - Validacao rapida

```bash
npm run typecheck
npx vitest run tests/architecture-graph.test.ts tests/pages/architecture-page.test.tsx
npm run build
```

## Workflow 5 - O que o teste de integridade cobre

- existencia de `filePath` no disco
- referencias validas em edges
- pertencimento unico de cada node a um grupo
- `metadata.version` sincronizada com `package.json`
- aviso para arquivos produtivos em `src/` que nao foram mapeados
