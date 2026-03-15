# FASE 1 — Archive Dead Weight

> **Goal:** Mover session logs, stories concluidas e planos concluidos para `docs/_archive/`.
> **Risco:** ZERO — nenhum destes arquivos e referenciado por CLAUDE.md ou codigo.
> **Reducao:** 29 arquivos, ~6.600 linhas movidas para archive.

---

## PASSO 1: Criar diretorios de archive

```bash
mkdir -p docs/_archive/sessions
mkdir -p docs/_archive/stories-completed
mkdir -p docs/_archive/plans-completed
```

## PASSO 2: Arquivar session logs (19 arquivos)

```bash
git mv docs/sessions/*.md docs/_archive/sessions/
git mv "docs/SESSAO_2026-02-17_TARDE.md" docs/_archive/sessions/
```

## PASSO 3: Arquivar stories concluidas (6 arquivos)

```bash
git mv docs/stories/story-001-limpeza-tecnica.md docs/_archive/stories-completed/
git mv docs/stories/story-002-deploy-cloudflare.md docs/_archive/stories-completed/
git mv docs/stories/story-003-ci-cd-github-actions.md docs/_archive/stories-completed/
git mv docs/stories/story-004-seo-schema.md docs/_archive/stories-completed/
git mv docs/stories/story-005-parameter-health-bar.md docs/_archive/stories-completed/
git mv docs/stories/story-006-responsive-history-analytics.md docs/_archive/stories-completed/
```

## PASSO 4: Arquivar planos concluidos (7 arquivos)

```bash
git mv docs/plans/PLAN_Divida_Tecnica_v051_v052.md docs/_archive/plans-completed/
git mv docs/plans/PLAN_Favicon_Icons.md docs/_archive/plans-completed/
git mv docs/plans/PLAN_Fix_BugReportModal.md docs/_archive/plans-completed/
git mv docs/plans/PLAN_Fix_TouchSlider_Mobile.md docs/_archive/plans-completed/
git mv docs/plans/PLAN_Unificar_Indicadores_Ajuste_Fino.md docs/_archive/plans-completed/
git mv docs/PLANO_AUDITORIA.md docs/_archive/plans-completed/
git mv docs/PLANO_IMPLEMENTACAO_SLIDER_BOUNDS.md docs/_archive/plans-completed/
```

## PASSO 5: Limpar diretorio sessions vazio

```bash
rmdir docs/sessions 2>/dev/null || true
```

## VERIFICACAO

```bash
npx vitest run 2>&1 | tail -5
npx tsc --noEmit
npx vite build 2>&1 | tail -3
```

Esperado: todos passam (nenhum destes arquivos e referenciado por codigo ou testes).

## COMMIT

```bash
git add docs/_archive/ docs/sessions/ docs/stories/ docs/plans/ docs/SESSAO_2026-02-17_TARDE.md docs/PLANO_AUDITORIA.md docs/PLANO_IMPLEMENTACAO_SLIDER_BOUNDS.md
git commit -m "docs: archive 29 completed session logs, stories, and plans (Phase 1/4)"
git push origin main
```

## POS-EXECUCAO

1. Atualizar `docs/plans/phases/EXECUTION_DIRECTIVES.md` — Fase 1: ⬜ → ✅
2. Encerrar sessao

---

*Phase brief auto-contido — nao requer leitura de outros documentos.*
