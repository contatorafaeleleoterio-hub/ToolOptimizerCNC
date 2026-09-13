# Sessão 7 — Pós-S6 Fixes: SGB Position + Safety Factor % + Mobile Visor + History Card

## Context

S6 (v0.10.0) está commitada. Após revisão, o usuário identificou 4 problemas não cobertos pelo plano S6:

1. **SGB abaixo do slider** (errado — deve ficar ACIMA para não ser tapado pelo dedo)
2. **Fator de Segurança** — slider nativo + valor decimal (0.80) em vez de TouchSlider + %
3. **Visor mobile (results)** — layout confuso; deve ter RPM/Avanço com destaque maior, no padrão de cards com label+valor (igual ao histórico)
4. **History card** — RPM e Avanço estão pequenos/sem destaque; replicar o novo padrão do visor

---

## Referência: Este plano é incorporado na ATUALIZAÇÃO 3.1 do Plano Completo

Ver `PLANO-COMPLETO.md` seção **FASE 3: REFATORAÇÃO DO PAINEL DE AJUSTE FINO** para detalhes de implementação da ATUALIZAÇÃO 3.1 (SGB acima do slider).

---

## Resumo Rápido

**Arquivos tocados:**
- `src/components/mobile/mobile-fine-tune-section.tsx` — mover SGB acima
- `src/components/fine-tune-panel.tsx` — mover SGB acima
- `src/components/mobile/mobile-config-section.tsx` — Safety slider + %
- `src/components/mobile/mobile-results-section.tsx` — novo layout visor
- `src/pages/history-page.tsx` — RPM/Avanço destaque

**Status no Plano Completo:**
- ✅ Incorporado em ATUALIZAÇÃO 3.1 (SGB)
- ✅ Incorporado em ATUALIZAÇÃO 2.1 (Safety)
- ✅ Incorporado em ATUALIZAÇÃO 4.1 (Mobile results)
