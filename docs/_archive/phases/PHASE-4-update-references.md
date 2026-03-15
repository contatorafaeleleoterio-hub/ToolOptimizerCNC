# FASE 4 — Update CLAUDE.md + Final Sweep + v0.6.0

> **Goal:** Atualizar TODAS as referencias cruzadas. Verificar zero broken refs. Bump versao.
> **Risco:** BAIXO — apenas atualizando paths em arquivos de configuracao.
> **Pre-requisito:** Fase 3 concluida (✅).

---

## PASSO 1: Atualizar CLAUDE.md

### Secao "Documentos de Referencia"
Remover ou atualizar refs a arquivos que foram arquivados/movidos:

| Ref antiga | Acao |
|-----------|------|
| `docs/design/BRANDING_FINAL.md` | REMOVER (se existir) |
| `docs/MELHORIAS_CONTINUAS.md` | REMOVER (se existir) |
| `docs/REGRAS_TRABALHO_OBRIGATORIAS.md` | REMOVER (se existir) |
| `docs/PADRONIZAÇÃO ADOTADA.md` | Atualizar → `docs/technical/padronizacao-adotada.md` |
| Guias em `docs/stories/` | Atualizar → `docs/ai/guides/` |

### Secao "Estrutura de Pastas"
Adicionar `docs/_archive/` na arvore de pastas.

### Verificar TODAS as refs
Grep CLAUDE.md por cada arquivo movido — corrigir qualquer hit.

## PASSO 2: Atualizar ROADMAP_SESSAO_ATUAL.md

- Marcar "Reestruturacao Documental" como `✅ Concluido`
- Atualizar versao para `0.6.0`
- Atualizar contagem de testes se mudou

## PASSO 3: Atualizar BACKLOG_IMPLEMENTACAO.md

- Marcar Plan #6 (Reestruturacao) como `✅ Concluido`

## PASSO 4: Atualizar MEMORY.md

- Atualizar versao para `0.6.0`
- Atualizar "Proximos Passos" com status da reestruturacao
- Remover refs a paths antigos

## PASSO 5: Version bump

```bash
# Editar package.json: "version": "0.6.0"
```

## PASSO 6: Full grep sweep

```bash
# Buscar TODOS os nomes de arquivos movidos/renomeados
grep -r "BRANDING_FINAL\|MELHORIAS_CONTINUAS\|REGRAS_TRABALHO\|IMPLEMENTATION_PLAN.md.md\|MODELO MATEMÁTICO\|PADRONIZAÇÃO ADOTADA\|PLANO_LOGIN_GOOGLE\|IMPLEMENTACAO_LOGIN\|IMPLEMENTACAO_SESSOES\|PROMPT_PROXIMA_SESSAO\|PLANO_AUDITORIA\|ESTRATEGIA_DUAL_DOMAIN" src/ CLAUDE.md docs/ --include="*.md" --include="*.ts" --include="*.tsx" | grep -v "_archive/"
# Esperado: ZERO hits (excluindo _archive/)
```

## PASSO 7: Contagem final

```bash
find docs/ -name "*.md" -not -path "docs/_archive/*" | wc -l
# Esperado: ~35 arquivos ativos
```

## VERIFICACAO

```bash
npx vitest run 2>&1 | tail -5
npx tsc --noEmit
npx vite build 2>&1 | tail -3
```

## COMMIT

```bash
git add CLAUDE.md docs/ package.json
git commit -m "docs: update all references after restructuring — bump v0.6.0 (Phase 4/4)"
git push origin main
```

## POS-EXECUCAO

1. Atualizar `docs/plans/phases/EXECUTION_DIRECTIVES.md` — Fase 4: ⬜ → ✅
2. Mover phase briefs para archive: `git mv docs/plans/phases/ docs/_archive/phases/`
3. Mover brief original: `git mv docs/plans/BRIEF_REESTRUTURACAO_DOCUMENTAL.md docs/_archive/`
4. Commit final: `docs: archive phase briefs after restructuring complete`
5. Encerrar sessao — REESTRUTURACAO COMPLETA

---

*Phase brief auto-contido — nao requer leitura de outros documentos.*
