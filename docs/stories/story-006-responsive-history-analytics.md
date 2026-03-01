# Story-006 — HistoryPage Responsiva + Plausible Analytics

**Status:** ✅ Concluída
**Versão:** 0.4.0
**Commits:** `2fe4f55` (S6A) + commit S6B (v0.4.0)
**Data:** 01/03/2026

---

## Objetivo

Duas melhorias independentes que aumentam a qualidade do produto sem adicionar complexidade arquitetural:

1. **S6A — HistoryPage Responsiva:** Corrigir layout desktop-only que quebrava em telas menores (mobile/tablet). O Histórico de Cálculos agora funciona corretamente em qualquer viewport.

2. **S6B — Plausible Analytics:** Adicionar analytics privacy-first (sem cookies, sem dados pessoais, LGPD-safe) para entender como operadores usam o app e embasar decisões de produto futuras.

---

## Decisões Estratégicas Tomadas

- **Login Google: PAUSADO** — sem evidência de demanda real de sync entre dispositivos. Perfil de operadores CNC é conservador. LGPD gera obrigações imediatas ao coletar dados. Retomar apenas quando usuários pedirem explicitamente.
- **Export PDF: DESCARTADO para MVP** — operadores de chão de fábrica não exportam PDF. Sem valor real. Pode ser reconsiderado no futuro.
- **Plausible escolhido vs Google Analytics** — Privacy-first, sem cookies, LGPD ok de imediato, script 1KB vs 45KB do GA, dashboard simples e direto ao ponto.

---

## S6A — HistoryPage Responsiva

### Problema
O `HistoryPage` tinha layout 100% desktop-only com classes Tailwind fixas:
- `grid-cols-3` nos filtros → colapsava em mobile
- `w-36 shrink-0` no timestamp do card → overflow horizontal
- `flex items-center gap-6` nos resultados do card → não quebrava linha
- `grid-cols-4` no detalhe expandido → muito estreito
- `flex gap-2` nas ações e feedbacks → não quebrava linha

### Solução (5 ajustes, sem mudança de lógica)

| Elemento | Antes | Depois |
|----------|-------|--------|
| Grid filtros | `grid-cols-3` | `grid-cols-1 sm:grid-cols-3` |
| Timestamp card | `w-36 shrink-0` | `shrink-0 min-w-0` + `whitespace-nowrap` |
| Resultados card | `flex items-center gap-6` | `hidden sm:flex items-center gap-6` |
| Grid detalhes | `grid-cols-4` | `grid-cols-2 md:grid-cols-4` |
| Ações + feedback | `flex gap-2` | `flex flex-wrap gap-2` |
| Barra topo | `flex gap-3` | `flex flex-wrap gap-2` |

### Testes adicionados (+3)
- `filter grid has responsive class for mobile stacking` — verifica `grid-cols-1`
- `expanded detail grid is responsive with 2-column mobile layout` — verifica `grid-cols-2`
- `entry action buttons support flex-wrap for small screens` — verifica `flex-wrap`

---

## S6B — Plausible Analytics

### Arquivos criados
- `src/hooks/use-plausible.ts` — Hook tipado `usePlausible()` com `track(event, props?)`
- `tests/hooks/use-plausible.test.ts` — 4 testes

### Arquivos modificados
- `index.html` — script Plausible (`data-domain="tooloptimizercnc.com.br"`)
- `src/components/config-panel.tsx` — `track('Simulacao_Executada', { material, operacao })`
- `src/components/config-panel.tsx` — `track('Material_Selecionado', { material })`
- `src/components/export-buttons.tsx` — `track('Resultado_Copiado')`
- `src/pages/history-page.tsx` — `track('Historico_Acessado')` no mount
- `src/pages/settings-page.tsx` — `track('Settings_Acessado')` no mount

### Eventos rastreados

| Evento | Trigger | Props |
|--------|---------|-------|
| `Simulacao_Executada` | Clique em Simular | `material`, `operacao` |
| `Material_Selecionado` | Mudança de material | `material` (nome) |
| `Resultado_Copiado` | Copy to clipboard | — |
| `Historico_Acessado` | Mount de HistoryPage | — |
| `Settings_Acessado` | Mount de SettingsPage | — |

### Comportamento
- **No-op automático** quando `window.plausible` não está disponível (dev, test, offline, desktop .exe)
- **Bundle:** zero impacto — Plausible é script externo
- **LGPD:** ok imediato — sem dados pessoais, sem cookies

### Pré-requisito manual para ativar
1. Criar conta em https://plausible.io
2. "Add a website" → Domain: `tooloptimizercnc.com.br`
3. Após deploy (já feito), aguardar ~24h para primeiros dados

---

## Métricas

| Métrica | Antes | Depois |
|---------|-------|--------|
| Testes | 496 | 503 |
| Bundle JS | 92.96KB gzip | 92.96KB gzip (sem mudança) |
| Versão | 0.3.4 | 0.4.0 |
| HistoryPage mobile | ❌ quebrado | ✅ responsivo |
| Analytics | ❌ zero dados | ✅ Plausible |

---

*Criada em: 01/03/2026*
