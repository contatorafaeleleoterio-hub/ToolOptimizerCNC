# Protocolo Metodológico: Refatoração e Harmonização de Logomarcas em Design Systems

> **Classificação:** Módulo de Expansão Condicional do Protocolo Canônico de Extração  
> **Gatilho Operacional:** Quando o usuário solicitar a adaptação do Design System a um produto existente com demanda de modernização ou harmonização da sua identidade visual/logomarca.

---

## 1. Princípio Fundamental de Invariância Estrutural

A refatoração de uma logomarca existente dentro do processo de extração de um Design System **NÃO é um processo de criação artística arbitrária nem de redesign livre**. Trata-se de um procedimento de **engenharia de precisão visual**, cuja premissa básica é:

```text
[LOGOMARCA LEGADA / ATUAL]                    [NOVO DESIGN SYSTEM EXTRAÍDO]
(Geometria funcional, símbolos,               (Paleta atômica, tipografia técnica,
 arquétipos de produtividade/domínio)          superfícies e acabamentos ópticos)
           │                                                │
           └───────────────────────┬────────────────────────┘
                                   ▼
          {PROTOCOLO DE REFATORAÇÃO E HARMONIZAÇÃO DE MARCA}
                                   ▼
                 [LOGOMARCA REFATORADA CANÔNICA]
                 - Geometria e semiótica 100% preservadas
                 - Cores transpostas para os novos tokens
                 - Tipografia calibrada na nova escala
                 - Vetorização pura SVG + Raster 512px
```

### Regra de Ouro da Invariância
> **"Nenhum traço, setor, curva ou proporção original deve ser alterado ou subtraído sem instrução explícita do usuário."**  
> A identidade funcional deve permanecer imediatamente reconhecível por operadores, clientes e usuários históricos do produto. A modernização opera exclusivamente sobre **Cor, Luz, Tipografia e Acabamento de Superfície**.

---

## 2. As 5 Etapas do Pipeline de Refatoração

```text
ETAPA 1: Decomposição Anatômica e Semiótica
   ↓
ETAPA 2: Mapeamento Cromático e Transposição de Energia
   ↓
ETAPA 3: Calibração e Emparelhamento Tipográfico
   ↓
ETAPA 4: Engenharia Vetorial e Exportação Multi-Resolução
   ↓
ETAPA 5: Transposição em Componente Ativo de Interface
```

---

### ETAPA 1: Decomposição Anatômica e Semiótica
Antes de modificar qualquer cor, o agente ou analista deve decompor a marca original em seus elementos atômicos e catalogar seu significado de negócio:

1. **Símbolo Central / Glifo Funcional:**
   - Exemplo (ToolOptimizer CNC): O gauge semicircular dividido em 3 setores radiais + a seta ascendente que simboliza vetor de aceleração e ganho de produtividade.
2. **Moldura ou Contenção Técnica:**
   - Identificar se a marca possui borda técnica, chanfros a 45 graus, cápsula ou se é flutuante.
3. **Wordmark (Nome da Marca):**
   - Identificar estrutura de palavras compostas (ex: `Tool` + `Optimizer`), pesos relativos e hierarquia.
4. **Subtítulo / Descritor de Domínio:**
   - Mapear a tag de posicionamento (ex: `CNC PRECISION SUITE`, `MEDICAL ROBOTICS`).

---

### ETAPA 2: Mapeamento Cromático e Transposição de Energia
Substituir a paleta legada pelas cores e superfícies consagradas nos tokens atômicos do Design System:

| Papel Semiótico Original | Tratamento Legado | Nova Transposição Canônica | Função no Design System |
| :--- | :--- | :--- | :--- |
| **Fundo / Chassi da Marca** | Preto sólido ou cinza opaco | `--bg-surface` (`#121722`) com hairline de `--border-subtle` | Integração perfeita com temas escuros (Dark Titanium) |
| **Setor Inicial / Estabilidade** | Azul ou cinza genérico | `--color-primary` (`#19E4BB` Neon Cirúrgico) | Indica operação nominal, calibração e prontidão |
| **Setor Médio / Carga Elevada** | Amarelo / Laranja desaturado | `--color-primary-light` (`#3CEBBB` Ciano Vibrante) | Indica esforço contínuo e rendimento acelerado |
| **Setor de Pico / Produtividade** | Vermelho ou verde genérico | `--color-accent` / `--color-success` (`#BDFF4B` Lime Elétrico) | Indica otimização máxima e eficiência de corte |
| **Vetor Dinâmico (Seta/Raio)** | Branco chapado ou cinza | Gradiente linear de `--color-primary` para `--color-accent` | Sensação ótica de aceleração contínua e precisão |

#### Critérios de Contraste e Luminescência
- Empregar filtros SVG discretos (`feDropShadow` ou `glow` luminescente suave) para dar sensação de instrumento de precisão iluminado, evitando o aspecto de vetor plano e sem vida.
- Assegurar contraste superior a **3:1** contra o fundo do chassi, mantendo legibilidade em painéis industriais sob incidência direta de luz de oficina.

---

### ETAPA 3: Calibração e Emparelhamento Tipográfico
Eliminar fontes genéricas do sistema operacional (Arial, Calibri, Helvetica legada) e aplicar as fontes canônicas homologadas na Fase 2 da extração:

1. **Wordmark Primário:**
   - Empregar a fonte primária da interface (ex: `Urbanist`), nos pesos `SemiBold (600)` ou `Bold (700)`.
   - Ajustar o kerning ótico para evitar espaçamentos irregulares entre maiúsculas e minúsculas.
   - Diferenciação semântica inteligente: Se o nome for composto (ex: `Tool` + `Optimizer`), aplicar sutil variação de peso (ex: `Regular 500` no prefixo e `Bold 700` no sufixo, ou aplicar a cor primária no ponto de inflexão).
2. **Tagline / Descritor Técnico:**
   - Empregar a fonte monoespaçada de telemetria (ex: `JetBrains Mono`).
   - Aplicar caixa alta integral (`UPPERCASE`) com espaçamento de rastreamento expandido (`letter-spacing: 0.18em` a `0.25em`).
   - Reduzir a opacidade para `--text-secondary` (`#8E9AA8`) ou `--text-muted` para manter a primazia visual no nome principal.

---

### ETAPA 4: Engenharia Vetorial e Exportação Multi-Resolução

A entrega da marca refatorada deve conter obrigatoriamente a tríade de arquivos vetoriais e rasterizados:

```text
brand/
├── Logo_Icon.svg           # Símbolo vetorial puro (apenas o glifo funcional e moldura)
├── Logo_[NomeProjeto].svg  # Logotipo completo horizontal (símbolo + wordmark + subtítulo)
└── logo_p_favcon.png       # Raster de alta definição 512x512px com supersampling
```

#### Requisitos Técnicos do SVG Canônico:
- `viewBox` estritamente calibrado sem margens de corte ou sobras assimétricas.
- Tags semânticas `<path>`, `<circle>`, `<polygon>`, `<linearGradient>`.
- Parâmetros `stroke-linecap="round"` e `stroke-linejoin="round"` para suavidade nas junções mecânicas.
- Sem uso de tags de estilos com escopo global conflitante (`<style>` genérico); usar atributos diretos ou variáveis CSS `var(--...)`.

#### Requisitos do Raster PNG 512x512:
- Deve ser gerado através de rotina programática (ex: Python Pillow com supersampling 4x ou renderização vetorial Cairo/Resvg).
- Cantos arredondados externos simulando ícone de aplicativo industrial/touch-screen.
- Fundo no tom exato de `--bg-surface` (`#121722`) para não estourar em telas OLED ou displays escuros.

---

### ETAPA 5: Transposição em Componente Ativo de Interface (Opcional & Recomendado)

Uma marca bem integrada ao Design System não é apenas um cabeçalho estático: seus elementos simbólicos devem poder ser reaproveitados como **componentes funcionais ativos**.

- **Exemplo Prático ToolOptimizer CNC:**
  - O gauge de produtividade presente na logomarca foi simultaneamente modelado como o componente de telemetria `ProductivityGauge`.
  - Quando a máquina CNC está ociosa, o ponteiro do componente exibe status de espera; quando a usinagem atinge a taxa ótima, o componente acende os três setores radiais nas cores exatas da logomarca.
  - Isso gera uma coesão semiótica sem precedentes entre a marca do software e o cockpit operacional.

---

## 3. Checklist de Validação da Marca Refatorada

Antes de homologar a entrega da marca refatorada, verificar:

- [ ] **A geometria original foi 100% mantida?** Nenhum arco, setor ou raio foi distorcido ou eliminado.
- [ ] **As cores pertencem à paleta homologada de tokens?** Nenhuma cor estranha ao `tokens/colors.css` foi introduzida.
- [ ] **A tipografia coincide com a declaração oficial do `tokens/typography.css`?**
- [ ] **Os arquivos SVG abrem em qualquer navegador sem quebras de layout ou fontes faltantes?** (Tipografia com fallback limpo).
- [ ] **O PNG 512x512 possui nitidez impecável e ausência de serrilhado nas curvas diagonais?**
- [ ] **Os ativos estão devidamente catalogados no manifesto `_ds_manifest.json`?**
- [ ] **A marca foi incorporada e testada no `showcase.html` interativo?**
