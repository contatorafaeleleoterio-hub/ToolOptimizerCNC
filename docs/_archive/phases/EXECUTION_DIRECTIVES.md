# Diretrizes de Execucao — Reestruturacao Documental v0.6.0

> **LEIA ANTES DE QUALQUER ACAO.** Este documento governa a execucao das 4 fases.

---

## REGRAS OBRIGATORIAS

1. **UMA fase por sessao** — nunca executar mais de uma fase na mesma sessao
2. **Ordem fixa:** Fase 1 → Fase 2 → Fase 3 → Fase 4 (sem pular, sem inverter)
3. **Sem perguntar** — ao iniciar sessao, identificar a fase pendente e executar diretamente
4. **Fim de sessao automatico** — apos completar fase + commit + push → encerrar sessao
5. **Leitura minima** — ler APENAS o phase brief da fase atual (nao ler o brief original de 281 linhas)
6. **Verificacao obrigatoria** — apos cada fase: `vitest run` + `tsc --noEmit` + `vite build`
7. **Commit atomico** — cada fase = 1 commit com mensagem padronizada

---

## MAPA DE FASES

| Fase | Brief | Status | Objetivo |
|------|-------|--------|----------|
| 1 | `PHASE-1-archive-dead-weight.md` | ✅ Concluído | Archive sessions, stories S1-S6, planos concluidos |
| 2 | `PHASE-2-eliminate-duplicates.md` | ✅ Concluído | Eliminar duplicatas + superseded + update refs codigo |
| 3 | `PHASE-3-trim-consolidate.md` | ✅ Concluído | Trim PROXIMA_SESSAO (1137→101 linhas) + clean workflows |
| 4 | `PHASE-4-update-references.md` | ✅ Concluído | Update CLAUDE.md + ROADMAP + sweep final + bump v0.6.0 |

---

## PROTOCOLO POR SESSAO

```
1. Ler ROADMAP_SESSAO_ATUAL.md (entry point)
2. Identificar fase pendente neste documento
3. Ler APENAS o phase brief correspondente
4. Executar todas as acoes do phase brief
5. Rodar verificacao (vitest + tsc + build)
6. Commit com mensagem do phase brief
7. Push para origin/main
8. Atualizar status da fase neste documento (⬜ → ✅)
9. Encerrar sessao
```

---

## APOS TODAS AS 4 FASES

- Verificar total de arquivos ativos em docs/ (esperado: ~35)
- Verificar que grep por nomes antigos retorna zero hits
- Arquivar este documento e os phase briefs em `docs/_archive/`
- Versao final: v0.6.0

---

*Criado: 14/03/2026 — Plano aprovado por Rafael*
