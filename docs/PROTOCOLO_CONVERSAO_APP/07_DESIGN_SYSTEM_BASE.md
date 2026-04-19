---
Documento: 07 — Design System Base (Industrial UX)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO (Foco em Acessibilidade CNC)
---

# 07 — Design System Base

O ToolOptimizer CNC não é apenas um app, é uma ferramenta de precisão. O design deve priorizar a **legibilidade sob luz intensa** e a **facilidade de toque** em ambientes industriais.

---

## 1. Tokens de Design (CSS Variables)

Utilizaremos variáveis CSS no `:root` para garantir consistência entre Web, Desktop e Mobile.

```css
/* src/styles/tokens.css */
:root {
  /* Cores de Alto Contraste */
  --color-primary: #1a73e8;       /* Blue Material */
  --color-success: #00c853;       /* Green CNC OK */
  --color-warning: #ffd600;       /* Yellow Alert */
  --color-error: #ff1744;         /* Red Stop */
  --color-bg: #f8f9fa;            /* Light Gray */
  --color-surface: #ffffff;
  --color-text: #202124;
  --color-text-secondary: #5f6368;
  
  /* Escala de Espaçamento (8px base) */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Touch Targets (Acessibilidade) */
  --touch-target-min: 48px;       /* Mínimo para operação segura */
  --border-radius-md: 12px;
}
```

---

## 2. Tipografia (Foco em Leitura de Números)

Em cálculos CNC, números são os dados mais importantes. Usaremos fontes sans-serif de alta legibilidade (Inter ou Roboto).

- **Big Numbers (Visor):** `font-weight: 700; font-size: 2.5rem;`
- **Labels de Input:** `font-weight: 500; font-size: 0.9rem; text-transform: uppercase;`
- **Mensagens de Erro:** `font-weight: 600; font-size: 0.85rem;`

---

## 3. UX Mobile: O "Visor HMI"

Seguindo o **PLAN-v0.9-05**, a interface mobile deve replicar a experiência de um comando numérico (Fanuc/Siemens).

- **Sticky Header:** O resultado do cálculo (Velocidade/Avanço) deve estar sempre visível no topo.
- **Sliders de Precisão:** Substituir inputs de texto pequenos por Sliders com botões de ajuste fino (+/-).
- **Haptic Feedback:** Ativar pequena vibração ao atingir os limites de segurança (Zona Verde/Vermelha).

---

## 4. Componentes Core (Industrial UI)

| Componente | Regra de Design |
|---|---|
| **Botões** | Mínimo de 48px de altura. Cantos arredondados (12px). |
| **Cards** | Bordas suaves e sombra leve para profundidade. |
| **Inputs** | Fundo levemente cinza para destacar a área de toque. |
| **Gauges** | Cores dinâmicas (Verde = Seguro, Vermelho = Crítico). |

---

## ✅ Checklist de conclusão desta etapa

- [ ] Arquivo `src/styles/tokens.css` criado e importado no `main.tsx`.
- [ ] Todos os botões mobile possuem altura mínima de `48px`.
- [ ] O componente "Visor HMI" está fixado no topo na versão mobile.
- [ ] Contraste de cores validado (WCAG AA).
- [ ] Verificação: Interface é operável em um celular com apenas uma mão.
- [ ] Commit: `git commit -m "style: implement industrial design system tokens"`
