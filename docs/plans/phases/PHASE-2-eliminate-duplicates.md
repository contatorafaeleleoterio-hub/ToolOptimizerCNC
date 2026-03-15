# FASE 2 — Eliminate Duplicates & Superseded

> **Goal:** Remover duplicatas, stubs, nomes malformados e docs absorvidos por outros.
> **Risco:** BAIXO — 2 refs no codigo-fonte precisam update (comments apenas).
> **Reducao:** ~15 arquivos, ~2.400 linhas arquivadas.
> **Pre-requisito:** Fase 1 concluida (✅).

---

## PASSO 1: Criar diretorio superseded

```bash
mkdir -p docs/_archive/superseded
```

## PASSO 2: Arquivar duplicatas e superseded (13 arquivos)

```bash
# Duplicata branding
git mv docs/design/BRANDING_FINAL.md docs/_archive/superseded/

# Superseded por outros docs
git mv docs/REGRAS_TRABALHO_OBRIGATORIAS.md docs/_archive/superseded/
git mv docs/MELHORIAS_CONTINUAS.md docs/_archive/superseded/
git mv "docs/AI ENGINEERING SYSTEM (FÊNIX) - Prompt Completo para o ChatGPT.md" docs/_archive/superseded/
git mv docs/IMPLEMENTATION_PLAN.md.md docs/_archive/superseded/
git mv docs/PROMPT_PROXIMA_SESSAO.md docs/_archive/superseded/
git mv "docs/PROTOCOLO_DE_IMPLEMENTAÇÃO_LCULOS_CNC_VALIDADOS.md" docs/_archive/superseded/
git mv "docs/MODELO MATEMÁTICO FORMAL.md" docs/_archive/superseded/
git mv docs/ESTRATEGIA_DUAL_DOMAIN_SEO_TOOLOPTIMIZER.md docs/_archive/superseded/

# Fora de escopo MVP
git mv docs/IMPLEMENTACAO_LOGIN.md docs/_archive/superseded/
git mv docs/PLANO_LOGIN_GOOGLE.md docs/_archive/superseded/
git mv docs/IMPLEMENTACAO_SESSOES.md docs/_archive/superseded/

# Research docs absorvidos
git mv docs/technical/GITHUB_REFERENCIAS.md docs/_archive/superseded/
git mv docs/technical/PESQUISA_VC_VALIDADA.md docs/_archive/superseded/
```

## PASSO 3: Deletar stub vazio

```bash
git rm docs/specs/ESPECIFICACAO_TECNICA_CONSOLIDADA.md
```

## PASSO 4: Renomear arquivo com acentos

```bash
git mv "docs/PADRONIZAÇÃO ADOTADA.md" docs/technical/padronizacao-adotada.md
```

## PASSO 5: Atualizar referencias no codigo-fonte

**Arquivo:** `src/engine/recommendations.ts`
- Linha 4: `docs/PADRONIZAÇÃO ADOTADA.md` → `docs/technical/padronizacao-adotada.md`
- Linha 11: `PADRONIZAÇÃO ADOTADA` → `padronizacao-adotada.md`

**Arquivo:** `src/engine/slider-bounds.ts`
- Linha 8: `docs/PLANO_IMPLEMENTACAO_SLIDER_BOUNDS.md` → `docs/_archive/plans-completed/PLANO_IMPLEMENTACAO_SLIDER_BOUNDS.md`

## VERIFICACAO

```bash
npx vitest run 2>&1 | tail -5
npx tsc --noEmit
# Grep por nomes antigos (deve retornar vazio)
grep -r "BRANDING_FINAL\|MELHORIAS_CONTINUAS\|REGRAS_TRABALHO\|IMPLEMENTATION_PLAN.md.md" src/ CLAUDE.md --include="*.ts" --include="*.tsx" --include="*.md"
```

## COMMIT

```bash
git add docs/ src/engine/recommendations.ts src/engine/slider-bounds.ts
git commit -m "docs: eliminate duplicates and archive superseded files (Phase 2/4)"
git push origin main
```

## POS-EXECUCAO

1. Atualizar `docs/plans/phases/EXECUTION_DIRECTIVES.md` — Fase 2: ⬜ → ✅
2. Encerrar sessao

---

*Phase brief auto-contido — nao requer leitura de outros documentos.*
