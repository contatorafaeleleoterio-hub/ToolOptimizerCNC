# Prompt para Próxima Sessão — Copie e Cole

```
Continuar projeto ToolOptimizer CNC.
Localização: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
GitHub: https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC

ESTADO ATUAL (2026-03-03):
- Último commit: 9119fd4 feat(ajuste-fino): redesign indicador Vc — unidirecional + slider min=0
- Testes: 552 passando / 556 total
- TypeScript: zero erros
- Build: limpo
- Versão: v0.4.2 (Story S7 + redesign indicador Vc entregues)

O QUE JÁ FOI FEITO (commits recentes):
- 9119fd4 feat(ajuste-fino): redesign indicador Vc — slider min=0, VcHealthBar unidirecional
- baec109 docs: session S23 — Story 007 Slider Bounds concluída (v0.4.1)
- 139f13f feat(S7): Slider Bounds Dinâmicos — completo (v0.4.0 → v0.4.1)

CONTEXTO — leia estes arquivos:
1. CLAUDE.md (convenções do projeto)
2. docs/PROMPT_PROXIMA_SESSAO.md (este arquivo — estado atual)
3. docs/sessions/SESSAO_2026-03-03_VcIndicador.md (resumo da sessão atual)

TAREFA PRIORITÁRIA: Corrigir 4 testes com falha pré-existente

Ver detalhes completos em: docs/sessions/SESSAO_2026-03-03_VcIndicador.md — Seção "Falhas Pendentes"

RESUMO DAS FALHAS:

1. FALHA DE PRECISÃO (floating-point):
   Arquivo: tests/components/mobile-fine-tune-section.test.tsx
   Teste: "MobileFineTuneSection > increase button increases fz by step"
   Motivo: toFixed/arredondamento produz 0.105 mas teste espera ~0.11
   Tipo: BUG REAL no código de incremento do slider mobile

2. TIMEOUT × 3 (ambiente de teste lento / configuração):
   a) tests/pages/mobile-page.test.tsx
      Teste: "MobilePage > shows results after simulation"
   b) tests/components/results-panel.test.tsx
      Teste: "ResultsPanel > shows zeroed results when no simulation yet"
   c) tests/pages/settings-page.test.tsx
      Teste: "SettingsPage > navigates to Segurança section when sidebar is clicked"
   Motivo: testes excedem 5000ms de timeout padrão do Vitest
   Solução provável: aumentar timeout individualmente ou otimizar renders

REGRAS:
- Commit após cada correção
- npx tsc --noEmit antes de commitar
- npx vitest run após mudanças
- Conventional commits (fix: ...)
- AO FINAL: atualizar este arquivo com novo estado
```

---

**Gerado:** 2026-03-03
**Commits desta sessão:**
- `9119fd4` — redesign indicador Vc (slider min=0, VcHealthBar, computeVcByValue)
- `baec109` — docs session S23 (Story S7 concluída)

**Story ativa:** correção das 4 falhas de teste pré-existentes
**Story anterior:** S7 Slider Bounds Dinâmicos (concluída v0.4.1)
