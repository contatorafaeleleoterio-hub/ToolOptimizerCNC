# FASE 3 — Trim PROXIMA_SESSAO + Clean Workflows

> **Goal:** Reduzir PROXIMA_SESSAO de 1.137→~200 linhas. Remover workflow obsoleto. Mover guias.
> **Risco:** MEDIO — preservar contexto recente ao trimmar.
> **Reducao:** ~1.000 linhas trimmed, 1 workflow removido.
> **Pre-requisito:** Fase 2 concluida (✅).

---

## PASSO 1: Backup full PROXIMA_SESSAO

```bash
git mv docs/PROXIMA_SESSAO.md docs/_archive/PROXIMA_SESSAO_FULL.md
```

## PASSO 2: Criar PROXIMA_SESSAO trimmed (~200 linhas)

Criar novo `docs/PROXIMA_SESSAO.md` com esta estrutura:

```markdown
# PROXIMA SESSAO — ToolOptimizer CNC

> Versao trimmed. Historico completo: `docs/_archive/PROXIMA_SESSAO_FULL.md`

## Estado do Projeto
[Copiar tabela de estado atual — ~30 linhas]

## Ultimas 3 Sessoes
[Copiar APENAS as 3 sessoes mais recentes do arquivo full — ~120 linhas]

## Historico de Versoes
[Copiar tabela de versoes — ~20 linhas]

## Roadmap Visual
[Copiar roadmap visual resumido — ~20 linhas]
```

**Total alvo: ~200 linhas.**

## PASSO 3: Verificar deploy.yml

Ler `.github/workflows/deploy.yml`. Se for deploy para GitHub Pages (obsoleto — projeto usa Cloudflare):

```bash
git rm .github/workflows/deploy.yml
```

Se NAO for obsoleto, manter.

## PASSO 4: Mover guias de stories/ para docs/ai/

```bash
mkdir -p docs/ai/guides
git mv docs/stories/GUIA-USO-CLAUDE-CODE.md docs/ai/guides/
git mv docs/stories/GUIA-USO-CLAUDE-DESKTOP.md docs/ai/guides/
```

## VERIFICACAO

```bash
npx vitest run 2>&1 | tail -5
npx tsc --noEmit
wc -l docs/PROXIMA_SESSAO.md  # Esperado: ~200
ls .github/workflows/          # Esperado: ci.yml + deploy-cloudflare.yml
```

## COMMIT

```bash
git add docs/ .github/
git commit -m "docs: trim PROXIMA_SESSAO to ~200 lines, clean workflows (Phase 3/4)"
git push origin main
```

## POS-EXECUCAO

1. Atualizar `docs/plans/phases/EXECUTION_DIRECTIVES.md` — Fase 3: ⬜ → ✅
2. Encerrar sessao

---

*Phase brief auto-contido — nao requer leitura de outros documentos.*
