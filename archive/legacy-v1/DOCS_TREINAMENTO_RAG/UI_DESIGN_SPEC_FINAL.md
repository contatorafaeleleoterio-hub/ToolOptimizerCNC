# UI DESIGN SPECIFICATION - ToolOptimizer CNC
**Base do Design:** Protótipo High-Fidelity (Tailwind/Cyber-Industrial)

## 1. PALETA DE CORES (Tokens Oficiais)
O sistema utiliza um tema "Deep Blue-Black" com acentos Neon de alta visibilidade.

* **Background:** `#0F1419` (Fundo principal)
* **Surface:** `rgba(22, 27, 34, 0.7)` (Efeito vidro/glassmorphism)
* **Card Background:** `rgba(30, 35, 45, 0.6)`
* **Primary (Cyan):** `#00D9FF` (Usado para Spindle/RPM e botões principais)
* **Secondary (Neon Green):** `#39FF14` (Usado para Feed Rate/Avanço)
* **Accent Orange:** `#F97316` (Usado para profundidade axial - ap)
* **Accent Purple:** `#A855F7` (Usado para engajamento radial - ae)

## 2. IDENTIDADE VISUAL E COMPONENTES

### 2.1 Efeitos e Sombras
* **Glassmorphism:** `backdrop-blur-xl` com bordas sutis `border-white/5`.
* **Neon Glow:** * `shadow-neon-cyan`: `0 0 15px rgba(0, 217, 255, 0.4)`
    * `shadow-neon-green`: `0 0 15px rgba(57, 255, 20, 0.4)`

### 2.2 Tipografia
* **Textos Gerais:** `Inter`, sans-serif.
* **Dados e Números:** `JetBrains Mono`, monospace (Obrigatório para valores técnicos).
* **Estilo de Label:** Fontes pequenas (`text-[11px]`), em negrito, caixa alta e com espaçamento entre letras (`tracking-widest`).

### 2.3 Ícones
* Utilizar **Material Symbols Outlined** (Google).
* Ícone principal: `precision_manufacturing`.

## 3. ESTRUTURA DO DASHBOARD (Layout 3 Colunas)

### COLUNA 1: CONFIGURAÇÃO (Lateral Esquerda - 3/12)
* **Botão Simular:** Gradiente de `cyan-600` a `cyan-500`, shadow neon cyan.
* **Inputs de Seleção:** Background `black/40`, bordas `white/10`.
* **Radio Groups:** Seleção de tipo de usinagem com estados de "peer-checked" mudando para a cor primária ou destaque neon.

### COLUNA 2: PAINEL DE RESULTADOS (Central - 6/12)
* **Overview Cards:** Grid com 4 métricas principais (RPM, Feed Rate, ap, ae).
* **Gauge Visual:** Gráfico de arco (SVG) para mostrar a eficiência do Avanço (F).
* **Big Numbers:** Display de destaque para **RPM (Cyan)** e **Feed Rate (Green)** com fontes gigantes (`text-7xl`).
* **Progress Bars:** Barras de 1.5 de altura com glows coloridos para Power Est, MRR e Surface Speed.

### COLUNA 3: FINE TUNE (Lateral Direita - 3/12)
* **Sliders (Ajuste Fino):** Sliders personalizados com "thumb" redondo e trilha colorida (Cyan, Green, Purple, Orange).
* **Descrição Técnica:** Texto pequeno abaixo de cada slider explicando o impacto físico da variável.

---

## 4. REGRAS DE IMPLEMENTAÇÃO (DICAS PARA A IA)
1.  **Scrollbars:** Devem ser customizadas (largura 6px, thumb cinza escuro).
2.  **Transições:** Aplicar `transition-all` e `duration-500` em todos os hover de cards e botões.
3.  **Responsividade:** No desktop, manter `max-w-[1500px]` centralizado. O overflow do corpo deve ser `hidden` para dar aspecto de aplicativo nativo.
