# Tokens de Design — FlowNC DS (Tema Claro) & Fallback ToolOptimizer

> **Origem:** `Sistema_verificador_codigos_cnc/docs/_canonico/03-DESIGN-SYSTEM.html` (`[data-theme="claro"]`)  
> **Status:** CONGELADO em E1. Este contrato rege estritamente as cores, tipografia, espaçamentos, elevação e componentes visuais do mockup `index.html`.

---

## 1. Marca & Identidade

| Token | Valor Hex / CSS | Uso |
|---|---|---|
| `--brand-blue` | `#2E6BE6` | Azul primário da marca FlowNC |
| `--brand-blue-lt` | `#5AA0FF` | Azul claro de destaque |
| `--brand-orange` | `#E85D04` | Laranja vibrante (par complementar) |
| `--brand-orange-lt` | `#FF7A1E` | Laranja claro de destaque |
| `--on-accent` | `#21130A` | Texto escuro sobre botão/superfície accent (contrastes AA) |
| `--on-sec` | `#FFFFFF` | Texto claro sobre botão secundário |

---

## 2. Paleta Base — Tema Claro (`[data-theme="claro"]`)

| Token | Valor | Descrição / Aplicação |
|---|---|---|
| `--bg` | `#E8ECF4` | Fundo principal da página / viewport |
| `--surface` | `#FFFFFF` | Cartões, painéis principais, modais |
| `--surface-2` | `#EDF1F8` | Cartões secundários, áreas destacadas |
| `--rail` | `#DCE3EF` | Fundo de barra lateral / trilho de navegação |
| `--zone` | `#E6EBF3` | Fundo de zonas de resultado |
| `--border` | `#C5CFDD` | Bordas padrão de cartões e divisores |
| `--border-strong` | `#94A2B8` | Bordas de inputs, botões ghost e foco |
| `--tx-1` | `#18212E` | Texto primário, títulos, valores numéricos |
| `--tx-2` | `#4A5A70` | Texto secundário, rótulos de campos |
| `--tx-3` | `#536179` | Texto terciário, unidades, descrições secundárias |
| `--accent` | `#E85D04` | Ação principal (CTA), destaque ativo |
| `--accent-hv` | `#CF5204` | Hover de botão accent |
| `--accent-ac` | `#A8430A` | Active de botão accent |
| `--accent-bg` | `#FFF1E8` | Fundo sutil de seleção accent |
| `--accent-bd` | `#F4B48C` | Borda sutil de elemento accent |
| `--sec` | `#2B3A4A` | Cor de botões e painéis secundários |
| `--sec-hv` | `#1F2C39` | Hover de botão secundário |
| `--sec-tint` | `#E7ECF3` | Fundo sutil de hover em itens de lista/tabela |

---

## 3. Paleta de Estados — Semáforo Operacional

> **Regra HMI:** Uma única paleta de estado para todo o sistema. Sem duplicação de significados.

| Estado | Base | Fundo (`-bg`) | Borda (`-bd`) | Uso Operacional |
|---|---|---|---|---|
| **OK / Seguro** | `#1A7A3C` | `#E7F5EC` | `#9AD3AD` | Parâmetros seguros, L/D ≤ 3, cálculo válido |
| **WARN / Atenção** | `#97670A` | `#FBF1DC` | `#E4C273` | Risco de vibração, L/D 3.1-4, `ae > 0.8D`, material estimado |
| **ERR / Perigo** | `#C0271E` | `#FCEBE9` | `#F0A49C` | Risco de quebra, torque excedido, L/D > 4-6 |
| **INFO / Informativo** | `#1D5BD6` | `#E9F0FE` | `#A9C6F7` | Seleção ativa, dicas práticas, notas de procedência |

---

## 4. Tipografia & Google Fonts

Link para cabeçalho do `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

### Font Stacks:
- **Textos e Interface (`--sans`):** `"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- **Números e Códigos (`--mono`):** `"IBM Plex Mono", ui-monospace, Consolas, monospace`

### Pesos Válidos:
- **IBM Plex Sans:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **IBM Plex Mono:** 500 (Medium), 600 (SemiBold), 700 (Bold)

---

## 5. Escala de Espaçamento

Autoritativa (Base 4px):
- `--sp-4`: `4px`
- `--sp-8`: `8px`
- `--sp-12`: `12px`
- `--sp-16`: `16px`
- `--sp-24`: `24px`
- `--sp-32`: `32px`
- `--sp-40`: `40px`
- `--sp-48`: `48px`
- `--sp-64`: `64px`

---

## 6. Raios de Borda (`border-radius`)

- `--radius-xs`: `2px` (detalhes mínimos, micro badges)
- `--radius-sm`: `4px` (inputs, botões pequenos, chips)
- `--radius-md`: `8px` (cartões, modais, painéis)
- `--radius-lg`: `14px` (containers de destaque)
- `--radius-pill`: `999px` (badges circulares, pílulas de estado)

---

## 7. Dimensões de Componentes & Alvos de Toque

- `--h-cta`: `56px` (Botão de ação principal / Executar cálculo)
- `--h-btn`: `44px` (Botões de formulário / Ações secundárias — respeita alvo de toque ≥ 40px da ISA-101)
- `--h-ghost`: `34px` (Botões fantasma / Ações compactas em tabelas)

---

## 8. Sombras & Anéis de Foco

- `--shadow`: `0 5px 16px rgba(20,28,38,.13)` (Cartões e elevações nível 1)
- `--shadow-2`: `0 16px 40px rgba(20,28,40,.18)` (Modais, dropdowns e elevações nível 2)
- `--ring`: `0 0 0 3px rgba(46,107,230,.45)` (Anel de foco acessível para navegação via teclado/Tab)

---

## 9. Tempo de Transição (`transition`)

- `--t-fast`: `.12s` (Hover de botões e trocas de cor rápidas)
- `--t`: `.18s` (Transição de foco, abertura de menus)
- `--t-slow`: `.3s` (Expansão de sanfonas, transições de área)

---

## 10. Fallback ToolOptimizer (Canais Alpha)

Para overlays, scrims e transparências não especificadas no FlowNC DS:
- `rgba(20, 28, 38, 0.05)` (Fundo hiper leve)
- `rgba(20, 28, 38, 0.10)` (Sombra de hover sutil)
- `rgba(20, 28, 38, 0.20)` (Borda translúcida)
- `rgba(20, 28, 38, 0.30)` (Scrim médio)
- `rgba(20, 28, 38, 0.50)` (Scrim de modal / escurecimento de fundo)
- `rgba(20, 28, 38, 0.70)` (Fundo de destaque denso)

---

> **Congelado em E1. Não alterar após o ciclo 1.**
