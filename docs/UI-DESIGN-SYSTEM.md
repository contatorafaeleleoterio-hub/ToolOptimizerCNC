# UI Design System - ToolOptimizer CNC v2.1

## 1. Filosofia de Design

### Mobile-First Obrigatório
Todo componente deve ser desenhado primeiro para telas de 320px e depois expandido para telas maiores.

### Princípios
- **Clareza**: Informações críticas (RPM, Feed) sempre visíveis
- **Hierarquia**: Resultados > Inputs > Detalhes
- **Touch-friendly**: Mínimo 44px para áreas tocáveis
- **Consistência**: Sistema de espaçamento e cores rigoroso

---

## 2. Sistema de Espaçamento (8pt Grid)

```
--space-1: 4px   (micro ajustes)
--space-2: 8px   (entre elementos inline)
--space-3: 12px  (padding interno compacto)
--space-4: 16px  (padding padrão)
--space-5: 20px  (gap entre seções)
--space-6: 24px  (padding de cards grandes)
--space-8: 32px  (separação de blocos)
```

### Regras de Uso
- Padding de cards: `--space-4` (mobile) / `--space-6` (desktop)
- Gap entre inputs: `--space-4`
- Gap entre cards: `--space-4` (mobile) / `--space-5` (desktop)
- Margin entre seções: `--space-5`

---

## 3. Breakpoints

```css
/* Mobile First - Default styles são para mobile */

/* Tablet Portrait */
@media (min-width: 600px) { }

/* Tablet Landscape / Small Desktop */
@media (min-width: 900px) { }

/* Desktop */
@media (min-width: 1200px) { }

/* Large Desktop */
@media (min-width: 1600px) { }
```

### Layout por Breakpoint

| Breakpoint | Layout | Sidebar | Center | Panel |
|------------|--------|---------|--------|-------|
| < 600px    | Stack  | 100%    | 100%   | Hidden/Accordion |
| 600-899px  | Stack  | 100%    | 100%   | Accordion |
| 900-1199px | 2 cols | 320px   | 1fr    | Hidden |
| 1200-1599px| 2 cols | 360px   | 1fr    | Drawer |
| >= 1600px  | 3 cols | 360px   | 1fr    | 300px |

---

## 4. Tipografia

### Font Stack
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'SF Mono', 'Fira Code', Consolas, monospace;
```

### Escala Tipográfica

| Token | Size | Weight | Line Height | Uso |
|-------|------|--------|-------------|-----|
| `--text-xs` | 11px | 400 | 1.4 | Labels mínimos |
| `--text-sm` | 13px | 400 | 1.4 | Hints, captions |
| `--text-base` | 15px | 400 | 1.5 | Body text |
| `--text-md` | 16px | 500 | 1.4 | Input values |
| `--text-lg` | 18px | 600 | 1.3 | Section headers |
| `--text-xl` | 24px | 700 | 1.2 | Card titles |
| `--text-2xl` | 32px | 700 | 1.1 | Main results (mobile) |
| `--text-3xl` | 40px | 700 | 1.1 | Main results (desktop) |

---

## 5. Cores

### Backgrounds
```css
--bg-primary: #0f1419;     /* App background */
--bg-secondary: #1a2332;   /* Card backgrounds */
--bg-tertiary: #1e2936;    /* Elevated cards */
--bg-input: rgba(255, 255, 255, 0.06);
--bg-hover: rgba(255, 255, 255, 0.08);
```

### Status Colors
```css
--color-ok: #22c55e;       /* Green 500 */
--color-warning: #f59e0b;  /* Amber 500 */
--color-danger: #ef4444;   /* Red 500 */
--color-info: #3b82f6;     /* Blue 500 */
```

### Text Colors
```css
--text-primary: #f1f5f9;   /* Slate 100 */
--text-secondary: #94a3b8; /* Slate 400 */
--text-muted: #64748b;     /* Slate 500 */
```

### Contraste Mínimo (WCAG AA)
- Texto normal: 4.5:1
- Texto grande (18px+): 3:1
- Componentes UI: 3:1

---

## 6. Componentes

### Touch Targets
```css
--touch-target-min: 44px;  /* Mínimo absoluto */
--touch-target-comfortable: 48px;
```

### Buttons

#### Primary Button
```css
.btn-primary {
  min-height: 48px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
}
```

#### Button Group Item
```css
.btn-group-item {
  min-height: 44px;
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
}
```

### Inputs

#### Text Input
```css
.input {
  min-height: 48px;
  padding: 12px 16px;
  font-size: 16px; /* Previne zoom no iOS */
  border-radius: 10px;
}
```

#### Slider
```css
.slider-thumb {
  width: 24px;  /* Mobile */
  height: 24px;
}

@media (min-width: 900px) {
  .slider-thumb {
    width: 18px;
    height: 18px;
  }
}
```

### Cards
```css
.card {
  padding: var(--space-4);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (min-width: 600px) {
  .card {
    padding: var(--space-5);
  }
}
```

---

## 7. Layout Mobile

### Ordem de Exibição (Mobile)
1. Header (sticky)
2. Quick Actions (Simular + Reset)
3. **Resultados Principais** (RPM + Feed) - PRIMEIRO!
4. Gauges de Performance
5. Configurações (colapsáveis)
6. Parâmetros de Corte
7. Painel de Impactos (accordion)

### Scroll Behavior
- Header: Sticky top
- Quick Actions: Sticky abaixo do header
- Conteúdo: Scroll natural (não nested)

---

## 8. Estados Interativos

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--color-info);
  outline-offset: 2px;
}
```

### Hover States (Desktop only)
```css
@media (hover: hover) {
  .interactive:hover {
    background: var(--bg-hover);
  }
}
```

### Active/Pressed States
```css
.interactive:active {
  transform: scale(0.98);
  opacity: 0.9;
}
```

---

## 9. Animações

### Durations
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
```

### Easing
```css
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Acessibilidade (WCAG 2.1 AA)

### Requisitos
- [ ] Todos os inputs têm labels associados
- [ ] Contraste mínimo 4.5:1 para texto
- [ ] Focus visible em todos os interativos
- [ ] Skip links para navegação
- [ ] ARIA labels onde necessário
- [ ] Suporte a prefers-reduced-motion
- [ ] Suporte a prefers-color-scheme
- [ ] Touch targets mínimo 44px

---

## 11. Checklist de Validação

Antes de considerar um componente pronto:

- [ ] Funciona em 320px de largura
- [ ] Touch targets >= 44px
- [ ] Contraste WCAG AA
- [ ] Estados de focus visíveis
- [ ] Espaçamentos do grid 8pt
- [ ] Sem scroll horizontal
- [ ] Carrega < 3s em 3G
- [ ] Testado em iOS Safari
- [ ] Testado em Android Chrome
