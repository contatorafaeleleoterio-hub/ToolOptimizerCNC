# UI/UX BRANDING SPECIFICATION - ToolOptimizer CNC
**Fonte da Verdade Visual:** Protótipo HTML/Tailwind v1.0 (Fornecido pelo Rafael)

## 1. ESPECIFICAÇÃO DE CORES (HEX OFICIAL)
O sistema deve seguir rigorosamente estes códigos de cor para manter a consistência do dashboard:

* **PRIMARY (Cyan):** `#00D9FF` -> Usado para Spindle, Títulos e Botões de Ação.
* **SECONDARY (Neon Green):** `#39FF14` -> Usado para Feed Rate e indicadores de "Sucesso/Bom".
* **DARK BACKGROUND:** `#0F1419` -> Fundo principal (Deep Blue-Black).
* **SURFACE (Glass):** `rgba(22, 27, 34, 0.7)` -> Cards com efeito Backdrop Blur.
* **ACCENT PURPLE:** `#A855F7` -> Engajamento Radial (ae).
* **ACCENT ORANGE:** `#F97316` -> Profundidade Axial (ap).

## 2. ELEMENTOS DE DESIGN REPLICÁVEIS
Para garantir a mesma aparência do modelo original:

* **Sombras (Glow):** Todos os elementos neon devem ter `box-shadow` simulando brilho (ex: `shadow-neon-cyan`).
* **Tipografia:** * Interface: `Inter` (Sans-serif).
    * Valores Técnicos: `JetBrains Mono` (Obrigatório para números).
* **Efeito Visual:** Uso de círculos de gradiente (`blur-[150px]`) no fundo para criar profundidade.

## 3. COMPORTAMENTO DOS COMPONENTES
* **Sliders de Fine Tune:** Devem ser funcionais e atualizar os "Big Numbers" (RPM/Feed) em tempo real via Zustand.
* **Gauges (Arco):** O arco SVG de "Avanço" deve ser dinâmico, movendo o indicador conforme o cálculo de $F$ altera.
* **Inputs de Ferramenta:** Manter o estilo de botões de seleção rápida (ex: botões para Diâmetros comuns: 2, 4, 6, 8, 10mm).
