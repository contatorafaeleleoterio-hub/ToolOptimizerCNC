# MEMORY — ToolOptimizer CNC

> Memória persistente entre sessões. Atualizar ao fim de cada sessão.
> **Ponto de entrada da sessão:** `docs/ROADMAP_SESSAO_ATUAL.md` — ler este primeiro!

---

## Estado Atual

| Item | Valor |
|------|-------|
| **Versão** | `0.8.0` |
| **Último commit** | `05f2ecf` feat: #03 favoritar + #07 slider SF (Fase B v0.9) |
| **Testes** | 864 passando (15 falhas pré-existentes — não relacionadas) |
| **TypeScript** | zero erros |
| **Build** | limpo — 101KB gzip |
| **Deploy** | ✅ LIVE — `tooloptimizercnc.com.br` / `app.tooloptimizercnc.com.br` |

---

## Progresso v0.9

| Fase | Itens | Status |
|------|-------|--------|
| A | #01 Input Livre + #02 Arestas Botões | ✅ `625b4f0` |
| B | #03 Favoritar Simulação + #07 Slider SF | ✅ `05f2ecf` |
| C | #05 Redesign Visor HMI + #08 Rodapé Esquerdo | ⬜ Próxima |
| D | #09 Simplificar Config (remover Kc) | ⬜ Pendente |

---

## Decisões Arquiteturais Importantes

| Decisão | Detalhe |
|---------|---------|
| Store NÃO auto-recalcula | `setMaterial/setFerramenta/setTipoOperacao/setParametros/setSafetyFactor` zerão `resultado=null`, usuário clica "Simular" |
| Favoritos em `HistoricoCalculo` | Campo `favorited?: boolean` no history-store, não em `validatedSimulations` |
| `entries[0]` = simulação atual | Star button no results-panel referencia `entries[0]` (entry mais recente criada por `simular()`) |
| `history-store` version 2 | Bump necessário pela adição do campo `favorited` |
| Segurança seção colapsada | `defaultOpen={false}` no config-panel — não polui dashboard por padrão |
| L/D > 6 = BLOQUEADO | Safety rule no MVP — não remover |
| Safety factor 0.7–0.8 | Padrão em todos os cálculos de potência e torque |

---

## Arquivos Críticos

| Arquivo | Papel |
|---------|-------|
| `src/store/machining-store.ts` | Store principal — calcular(), simular(), safetyFactor |
| `src/store/history-store.ts` | Histórico — toggleFavorite, getFavoriteCount, filtro favorited |
| `src/types/index.ts` | Tipos TypeScript do domínio CNC |
| `src/components/config-panel.tsx` | Coluna esquerda — seções Configuração Base, Ferramenta, Ajuste Fino, Segurança |
| `src/components/results-panel.tsx` | Coluna direita — gauges, RPM, Feed, botão ⭐ |
| `src/pages/history-page.tsx` | Histórico — cards com ⭐ + filtro Favoritos |
| `docs/ROADMAP_SESSAO_ATUAL.md` | Ponto de entrada obrigatório de toda sessão |

---

## Armadilhas Conhecidas

| Problema | Solução |
|----------|---------|
| Stale ref no store | Chamar `useMachiningStore.getState()` (não capturar ref antes do `set()`) |
| Testes store: `calcular()` não auto-calcula | Chamar `getState().calcular()` explicitamente após `setParametros/setFerramenta` |
| Tailwind v4: classe purgada | Usar classes completas estáticas OU `style={}` |
| `vitest run` exit code 1 | Verificar se aparece `X passed` — se sim, warnings ANSI no stderr, OK |
| CollapsibleSection defaultOpen | `false` por padrão em novas seções (exceto Configuração Base) |

## Sessao 28/03/2026 - Encerramento (Admin)

Resumo rapido:
- Concluido: melhorias de produtividade no `/admin/tasks`, `/admin/inbox`, `/admin/errors`.
- Concluido: fix global de scroll no layout do admin (todas rotas laterais).
- Parcial: analytics admin (periodo, auto-refresh, CSV) iniciado e pendente de estabilizacao final.

Checks executados nesta sessao:
- Passaram: suites admin de tasks/inbox/errors/layout.
- Passaram: `tsc --noEmit` e `vite build` apos blocos concluidos.
- Pendente: fechar `tests/admin/admin-analytics.test.tsx` sem timeout em sessao nova.
