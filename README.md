# ToolOptimizer CNC v2.1

Sistema avançado de otimização e cálculos de parâmetros para usinagem de metais com máquinas fresadoras CNC.

## Funcionalidades

- Cálculo automático de RPM e Feed Rate
- Validação de parâmetros em tempo real
- Chip Thinning automático
- Ajustes percentuais interativos (±50%)
- Gauges de performance (Tool Life, Efficiency, Spindle Load)
- Interface responsiva (mobile-first)

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS + CSS Custom Properties
- **State:** Zustand
- **Desktop:** Electron (opcional)

## Instalação

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Design System

O projeto segue um design system documentado com:

- **Grid:** 8pt spacing system
- **Touch Targets:** Mínimo 44px
- **Cores:** Paleta de status (ok/warning/danger)
- **Responsividade:** 5 breakpoints (320px → 1600px+)

Documentação completa em `/docs/UI-DESIGN-SYSTEM.md`

## Acessibilidade

- WCAG 2.1 AA Compliant
- ARIA labels em todos os controles
- Suporte a navegação por teclado
- `prefers-reduced-motion` respeitado

## Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Shift + ↑/↓` | Ajustar RPM ±5% |
| `Ctrl + ↑/↓` | Ajustar Feed ±5% |
| `Shift + R` | Reset RPM |
| `Shift + F` | Reset Feed |
| `Enter` | Recalcular |

## Estrutura de Arquivos

```
src/ui/
├── components/
│   ├── Header.jsx
│   ├── QuickActions.jsx
│   ├── ResultsSection.jsx
│   ├── ConfigSection.jsx
│   ├── ToolConfigCard.jsx
│   ├── ImpactsSection.jsx
│   └── Gauge.jsx
├── store/
│   └── useCalculatorStore.js
├── styles/
│   └── index.css
└── App.jsx
```

## Documentação

- [Design System](./docs/UI-DESIGN-SYSTEM.md)
- [Checklist de Validação](./docs/VALIDATION-CHECKLIST.md)
- [Relatório de Refatoração](./docs/REFACTORING-REPORT.md)

## Licença

Proprietário - Todos os direitos reservados
