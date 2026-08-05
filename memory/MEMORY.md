# MEMORY — ToolOptimizer CNC

> Memória persistente entre sessões. Atualizar ao fim de cada sessão.
> **Ponto de entrada da sessão:** `docs/ROADMAP_SESSAO_ATUAL.md` — ler este primeiro!

---

## Estado Atual

| Item | Valor |
|------|-------|
| **Versão** | `0.12.0` |
| **Branch** | `claude/design-system-standardization-6fsmf5` (não mergeada em `main`) |
| **Último commit** | `0701e36` docs(design): reconcile system.md with the code and close design pendencies |
| **Testes (projeto)** | 981 passando / 8 falhando — `npx vitest run tests/` |
| **Testes (.aiox-core)** | 199 passando / 6 falhando — framework, fora do escopo do produto |
| **TypeScript** | zero erros |
| **Lint** | limpo |
| **Build** | limpo |
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
| `src/index.css` (`@theme`) | **Fonte de verdade de TODA cor do sistema** — nenhum hex vive fora daqui |
| `src/components/accent-tokens.ts` | Mapas de classe por cor de accent + `ACCENT_HEX`/`ACCENT_RGB`. Use quando a classe varia por cor |
| `src/components/design-tokens.ts` | Combinações de classe repetidas (cards, modais, inputs) + `SEMAPHORE_HEX` — única definição do semáforo |
| `src/components/slider-tokens.ts` | Helpers de glow para `style={}` (`trackGlow`, `thumbGlow`, `dropGlow`) |
| `src/utils/result-display.ts` | Formatação compartilhada entre `results-panel` e `mobile-results-section` |
| `.interface-design/system.md` | Design system — 12 regras não-negociáveis + Token Reference |
| `docs/ROADMAP_SESSAO_ATUAL.md` | Ponto de entrada obrigatório de toda sessão |

---

## Armadilhas Conhecidas

| Problema | Solução |
|----------|---------|
| Stale ref no store | Chamar `useMachiningStore.getState()` (não capturar ref antes do `set()`) |
| Testes store: `calcular()` não auto-calcula | Chamar `getState().calcular()` explicitamente após `setParametros/setFerramenta` |
| **Tailwind v4: font-size usa `--text-*`, NÃO `--font-size-*`** | Token no namespace errado **não gera utility nenhuma e falha em silêncio**. Foi o que manteve `--font-size-2xs`/`--font-size-fine` mortos por meses |
| Tailwind v4: classe interpolada é purgada | **Nunca** `text-${color}`. Usar mapa estático de `src/components/accent-tokens.ts` OU `style={}` alimentado por `slider-tokens.ts` |
| Cor nova em componente | Não escrever hex/rgba direto. Declarar no `@theme` de `src/index.css` e consumir via classe ou constante de `design-tokens.ts` |
| `vitest run` exit code 1 | Verificar se aparece `X passed` — se sim, warnings ANSI no stderr, OK |
| CollapsibleSection defaultOpen | `false` por padrão em novas seções (exceto Configuração Base) |

## Sessão 05/08/2026 — Padronização Design System (v0.12.0)

**Entregue:** tokenização completa em ~60 arquivos, 6 fases, 4 commits
(`319cdb1`, `bf610d0`, `043868d`, `0701e36`).

**Decisões que não devem ser revertidas sem conversa:**
1. Paleta de semáforo **unificada** — a tríade vívida `#00E676`/`#FFA500`/`#FF4D4D`
   foi descontinuada. `SEMAPHORE_HEX` em `design-tokens.ts` é a única definição.
   Gauges ficaram levemente menos saturados: é intencional, aprovado por Rafael.
2. Regra #4 do `system.md` agora admite a micro-escala `[2,6,10,18px]` para
   trilhos, hairlines e densidade de controles. Grid 4px continua obrigatório
   em layout.
3. Ramps default do Tailwind (red/green/yellow/amber/emerald/cyan) foram
   dobrados nos tokens. A única exceção viva é `from-cyan-600 to-cyan-500`,
   que é o gradiente sancionado do CTA primário.

**Pendências deixadas em aberto de propósito:**
- 8 testes falhando em `mobile-results-section.test.tsx` (7) e `mobile-page.test.tsx` (1),
  todos por `Found multiple elements`: o texto de segurança é renderizado ao mesmo
  tempo pelo `HmiVisor` e pelo `SafetyBadge`. Problema de query de teste ou de
  duplicação estrutural no mobile — **não é design system**, e é anterior a esta sessão.
- Nenhum componente `<Icon>` foi extraído para os ~60 spans `material-symbols-outlined`:
  eles renderizam o nome do ícone como conteúdo de texto, então envolvê-los quebraria
  queries por texto sem ganho estrutural.
- **Branch não mergeada em `main`** — o deploy automático só dispara no push para `main`.

---

## Sessao 28/03/2026 - Encerramento (Admin)

Resumo rapido:
- Concluido: melhorias de produtividade no `/admin/tasks`, `/admin/inbox`, `/admin/errors`.
- Concluido: fix global de scroll no layout do admin (todas rotas laterais).
- Parcial: analytics admin (periodo, auto-refresh, CSV) iniciado e pendente de estabilizacao final.

Checks executados nesta sessao:
- Passaram: suites admin de tasks/inbox/errors/layout.
- Passaram: `tsc --noEmit` e `vite build` apos blocos concluidos.
- Pendente: fechar `tests/admin/admin-analytics.test.tsx` sem timeout em sessao nova.
