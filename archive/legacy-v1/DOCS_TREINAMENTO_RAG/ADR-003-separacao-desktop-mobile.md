# ADR-003: Páginas Separadas Desktop vs Mobile

**Status:** Aceito
**Data:** 15/02/2026
**Autores:** Rafael Eleotério

---

## Contexto

O ToolOptimizer CNC é usado por operadores CNC em dois cenários:
1. **Desktop:** Na estação de trabalho, monitor grande, configuração completa
2. **Mobile:** No chão de fábrica, consulta rápida de parâmetros

A UI desktop usa grid de 3 colunas (min 1360px) que não funciona em telas pequenas.

## Decisão

Páginas **completamente separadas** para desktop e mobile, com auto-detect e rota manual.

| Aspecto | Implementação |
|---------|--------------|
| Desktop | `/` — grid 3 colunas, min-width 1360px |
| Mobile | `/mobile` — scroll vertical, controles touch |
| Auto-detect | `useIsMobile()` hook + `ViewportRedirect` component |
| Rota manual | `/mobile` acessível diretamente |
| Threshold | `< 768px` → redireciona para mobile |

## Alternativas Consideradas

- **Responsive design (media queries):** Descartado. O layout de 3 colunas é fundamentalmente diferente do scroll vertical. Tentar adaptar com breakpoints criaria complexidade excessiva e UX ruim em ambos os formatos.
- **Apenas desktop:** Descartado. Operadores precisam consultar no chão de fábrica.

## Estrutura de Componentes

```
Desktop:                          Mobile:
App.tsx                          mobile-page.tsx
├── ConfigPanel                  ├── MobileHeader
├── ResultsPanel                 ├── MobileResultsSection
└── FineTunePanel                ├── MobileConfigSection
                                 ├── MobileFineTuneSection
                                 └── Disclaimer

Compartilhados: ToolSummaryViewer, Gauge, shared-result-parts, store
```

## Consequências

- Componentes mobile separados (alguma duplicação de lógica de apresentação)
- Store e engine 100% compartilhados (zero duplicação de lógica de negócio)
- Cada plataforma pode evoluir independentemente
- GitHub Pages SPA redirect configurado para ambas as rotas
