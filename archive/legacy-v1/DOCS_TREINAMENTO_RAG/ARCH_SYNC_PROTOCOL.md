# Protocolo ARCH-SYNC — Atualizacao Automatica do Grafo de Arquitetura

> Protocolo otimizado para tokens (~800-2000 tokens vs ~10000+ varredura completa).
> Economia de ~85% em tokens e ~80% em tempo.

---

## Gatilho

Executar este protocolo quando **qualquer** condicao abaixo for detectada na sessao:

1. Arquivo `.ts`/`.tsx` **criado** em `src/`
2. Arquivo `.ts`/`.tsx` **deletado** ou **renomeado** em `src/`
3. Mudanca significativa na contagem de linhas (> 20 linhas)
4. Bump de versao no `package.json`

O assistente deve verificar estas condicoes ao fim da sessao, antes do handoff.

---

## Passos

### Passo 1 — Gerar Diff Minimo

Executar o script:

```bash
bash scripts/arch-sync-diff.sh
```

O output e compacto (~5-20 linhas):

```
ADD src/components/new-component.tsx 85
DEL src/utils/old-util.ts
DRIFT src/store/machining-store.ts 417->485
VERSION 0.5.0->0.5.1
---
GRAPH_FILES=57 SRC_FILES=59
```

### Passo 2 — Aplicar Patches

Com base no output do script, aplicar alteracoes **cirurgicas** no arquivo `src/data/architecture-graph.ts` usando a ferramenta `Edit` (old_string/new_string). **NUNCA reescrever o arquivo inteiro.**

#### Para ADD (novo arquivo):

1. Adicionar entrada em `FILE_LINES`:
   ```
   'src/components/new-component.tsx': 85,
   ```

2. Adicionar entrada em `NODE_SEEDS`:
   ```
   { id: 'new-component', labelPt: '[descricao em PT]', category: '[tipo]', filePath: 'src/components/new-component.tsx', group: '[grupo]' },
   ```

3. Adicionar edges em `LEVEL2_EDGES` (ler imports do novo arquivo para determinar conexoes):
   ```
   { from: '[parent]', to: 'new-component', type: 'renders', level: 2 },
   ```

4. Atualizar `metadata.lastUpdated` para a data atual.

#### Para DEL (arquivo removido):

1. Remover entrada de `FILE_LINES`
2. Remover entrada de `NODE_SEEDS`
3. Remover todas as edges que referenciam o node ID em `LEVEL2_EDGES`
4. Atualizar `metadata.lastUpdated`

#### Para DRIFT (linhas alteradas):

1. Atualizar o valor em `FILE_LINES`:
   ```
   'src/store/machining-store.ts': 485,  // era 417
   ```

#### Para VERSION:

1. Atualizar `metadata.version`:
   ```
   version: '0.5.1',
   ```

### Passo 3 — Validar

```bash
npx vitest run tests/architecture-graph.test.ts
npm run typecheck
```

Ambos devem passar. Se falharem, corrigir antes de prosseguir.

### Passo 4 — Commit

```bash
git add src/data/architecture-graph.ts
git commit -m "docs(arch-sync): update architecture graph [auto-sync]

- [lista de mudancas: Added/Removed/Updated]

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Economia de Tokens

| Abordagem | Tokens | Tempo |
|-----------|--------|-------|
| Varredura completa (ler tudo) | ~8.000-12.000 | 3-5 min |
| **Protocolo ARCH-SYNC** | **~800-2.000** | **30-60s** |

A economia vem de:
1. Script bash faz o trabalho pesado (scan + diff) fora do LLM
2. Assistente recebe apenas as diferencas (~5-20 linhas)
3. Patches sao cirurgicos (Edit tool), nao reescrita completa

---

## Notas

- O script `arch-sync-diff.sh` nao modifica nenhum arquivo — apenas detecta diferencas
- Arquivos em `tests/`, `.d.ts`, e `assets/` sao ignorados automaticamente
- Se o diff retornar vazio (sem ADD/DEL/DRIFT/VERSION), nao ha nada para atualizar
- Para novo grupo arquitetural (raro), intervencao manual e necessaria

---

*FENIX AI System — ToolOptimizer CNC | Criado: 12/03/2026*
