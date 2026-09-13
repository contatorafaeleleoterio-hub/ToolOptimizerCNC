# Plano Mestrado — Refatoração Visor + Educacional

## 📌 OBJETIVO CENTRAL
Refatorar o sistema para ser **educacional**: ensinar enquanto fornece parâmetros. Reorganizar interface desktop/mobile com hierarquia visual clara.

---

## FASE 1: REFATORAÇÃO DO VISOR DESKTOP (Results Panel)

**Status:** ⬜ Pendente | **Arquivo principal:** `src/components/results-panel.tsx`

### Situação Atual
- Visor desalinhado, não segue padrões de design
- Parece bugado/quebrado
- Dados não têm hierarquia visual clara
- Falta botões de ação (editar ferramenta, salvar padrão)

### Situação Desejada (baseada em imagem referência)
Visor **centralizado** com **cards em retângulos** (estilo input) com:
- Descrição/label em cima
- Valor grande e legível dentro
- **Tamanhos proporcionais à importância**
- Botões de ação integrados

---

## ATUALIZAÇÃO 1.1: Refatorar Estrutura do Visor — Layout Base

**Arquivo:** `src/components/results-panel.tsx`

**O que mudar:** Reorganizar layout de flexbox desalinhado para grid estruturado

**Novo layout (ordem lógica):**

```
┌─────────────────────────────────────────────────────────────┐
│  SEÇÃO 1: FERRAMENTA (CARD GRANDE — 100% width)             │
│  ┌───────────┬───────────┬───────────┬───────────┐          │
│  │   TIPO    │  DIAM.    │   RAIO    │  FIXAÇÃO  │          │
│  │ Toroidal  │   86mm    │   R1      │  25mm     │          │
│  └───────────┴───────────┴───────────┴───────────┘          │
│  [EDITAR FERRAMENTA] ← NOVO BOTÃO                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SEÇÃO 2: MATERIAL + OPERAÇÃO (CARDS MÉDIOS — 2 colunas)    │
│  ┌──────────────────────────┬──────────────────────────┐   │
│  │ MATERIAL                 │ TIPO OPERAÇÃO            │   │
│  │ Aço 1045                 │ Desbaste                 │   │
│  └──────────────────────────┴──────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SEÇÃO 3: RESULTADOS PRINCIPAIS (CARDS GRANDES — 2 cols)    │
│  ┌──────────────────────────┬──────────────────────────┐   │
│  │ ROTAÇÃO (RPM)            │ AVANÇO (MM/MIN)          │   │
│  │ 9.337                    │ 8.635                    │   │
│  │ RPM                      │ MM/MIN                   │   │
│  └──────────────────────────┴──────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SEÇÃO 4: DADOS CALCULADOS (CARDS PEQUENOS — 4 colunas)     │
│  ┌──────────┬──────────┬──────────┬──────────┐             │
│  │ POTÊNCIA │   MRR    │  TORQUE  │ VC REAL  │             │
│  │  5.2 KW  │ 1240 cm³ │  45.8 Nm │ 245 m/min│             │
│  └──────────┴──────────┴──────────┴──────────┘             │
└─────────────────────────────────────────────────────────────┘
```

**Detalhes de implementação:**
- Remover flexbox caótico, usar CSS Grid com `grid-template-columns` explícito
- Cada seção é um container com padding/border consistentes
- Cards com `border: 1px solid rgba(255,255,255,0.12)` + `background: rgba(30,38,50,0.95)`
- Labels acima (text-xs, uppercase, gray-500) + valores embaixo (text-2xl/text-xl, font-mono, cor temática)

---

## ATUALIZAÇÃO 1.2: Adicionar Botão "Editar Ferramenta"

**Arquivo:** `src/components/results-panel.tsx` (seção Ferramenta)

**O que adicionar:**

Após os 4 cards de ferramenta (tipo, diâmetro, raio, fixação), adicionar botão:

```tsx
<button
  className="mt-2 px-3 py-1.5 text-xs font-semibold text-primary hover:text-primary/80
             border border-primary/30 rounded hover:border-primary/60 transition"
  onClick={() => /* abrir modal editar ferramenta */}
>
  ✏️ EDITAR FERRAMENTA
</button>
```

**Funcionalidade:** Ao clicar, abre modal/drawer para editar a ferramenta selecionada (tipo, diâmetro, raio, fixação).

**Arquivo modal:** `src/components/modals/ToolEditModal.tsx` (novo)

---

## ATUALIZAÇÃO 1.3: Adicionar BigNumber Sliders (RPM + Avanço ajustáveis)

**Arquivo:** `src/components/results-panel.tsx` (após SEÇÃO 3)

**O que adicionar:**

Após os cards de RPM/Avanço, adicionar **sliders interativos** (já existem em `shared-result-parts.tsx`):

```tsx
<div className="mt-6 space-y-6">
  {/* RPM BigNumber + BidirectionalSlider */}
  <BigNumberSlider
    label="Rotação (RPM)"
    value={resultado.rpm}
    onChange={(newRpm) => ajustarParametros('rpm', newRpm)}
  />

  {/* Avanço BigNumber + BidirectionalSlider */}
  <BigNumberSlider
    label="Avanço (mm/min)"
    value={resultado.avanco}
    onChange={(newAvanco) => ajustarParametros('avanco', newAvanco)}
  />
</div>
```

**Nota:** Estes sliders já existem, apenas reorganizar posição no layout.

---

## ATUALIZAÇÃO 1.4: Reposicionar Safety Badges e Favorite Button

**Arquivo:** `src/components/results-panel.tsx` (topo)

**O que mudar:**

Mover badges de segurança (crítico, alerta, etc.) e botão favoritar para o **topo do visor**:

```tsx
<div className="flex justify-between items-center mb-4">
  {/* Safety Badges (esquerda) */}
  <div className="flex gap-2">
    {/* CRÍTICO, ALERTA badges aqui */}
  </div>

  {/* Favorite Button (direita) */}
  <button className="star-icon">★ Favoritar</button>
</div>

{/* SEÇÃO 1: Ferramenta */}
{/* ... rest */}
```

---

## ATUALIZAÇÃO 1.5: Integrar 3 Gauges (Feed Headroom, MRR, Tool Health)

**Arquivo:** `src/components/results-panel.tsx` (após SEÇÃO 4)

**O que adicionar:**

Após cards de dados calculados, adicionar seção com 3 **half-moon gauges**:

```tsx
<div className="mt-8 grid grid-cols-3 gap-4">
  <HalfMoonGauge
    title="Feed Headroom"
    value={calculateFeedHeadroom(...)}
    max={100}
    size="md"
  />
  <HalfMoonGauge
    title="Material Removal Rate"
    value={resultado.mrr}
    max={maxMrrExpected}
    size="md"
  />
  <HalfMoonGauge
    title="Tool Health"
    value={calculateToolHealth(...)}
    max={100}
    size="md"
  />
</div>
```

**Nota:** Estes já existem (`src/components/gauges/`), apenas organizar no novo layout.

---

## ATUALIZAÇÃO 1.6: Adicionar Warnings Section

**Arquivo:** `src/components/results-panel.tsx` (antes dos Gauges)

**O que adicionar:**

Seção com **avisos/alertas** se houver problemas (L/D alto, vibração, etc.):

```tsx
{resultado && resultado.warnings && resultado.warnings.length > 0 && (
  <div className="mt-6 p-4 border border-red-500/30 rounded-lg bg-red-500/5">
    <h3 className="text-red-400 font-semibold mb-2">⚠️ Avisos</h3>
    <ul className="space-y-1 text-sm text-red-300">
      {resultado.warnings.map(w => <li key={w}>• {w}</li>)}
    </ul>
  </div>
)}
```

---

## FASE 2: REFATORAÇÃO DO PAINEL DE CONFIGURAÇÃO (Config Section)

**Status:** ⬜ Pendente | **Arquivo principal:** `src/components/mobile/mobile-config-section.tsx` + `src/components/config-panel.tsx`

---

## ATUALIZAÇÃO 2.1: Padronizar Safety Factor Slider

**Arquivo:** `src/components/mobile/mobile-config-section.tsx` (linha ~277)

**Situação atual:** `<input type="range">` nativo, não segue padrão do sistema

**O que mudar:**
- Substituir por **TouchSlider** (padrão mobile) ou **BidirectionalSlider** (padrão desktop)
- Range: 0.5 → 1.0, step 0.05 (11 valores)
- Display: **decimal → percentual** (0.70 → 70%)
- Color: verde (seg-verde, rgb 46,204,113)

**Novo código (mobile):**

```tsx
<div className="space-y-2">
  <label className="text-xs font-semibold uppercase text-gray-400">
    Fator de Segurança: {Math.round(safetyFactor * 100)}%
  </label>
  <TouchSlider
    min={0.5}
    max={1.0}
    step={0.05}
    value={safetyFactor}
    onChange={(v) => setSafetyFactor(v)}
    color="seg-verde"
    label="Fator de Segurança"
  />
  <div className="text-[10px] text-gray-500 flex justify-between">
    <span>50% (conservador)</span>
    <span>100% (agressivo)</span>
  </div>
</div>
```

---

## ATUALIZAÇÃO 2.2: Adicionar Botão "Salvar Como Padrão" (Safety Factor)

**Arquivo:** `src/components/mobile/mobile-config-section.tsx`

**O que adicionar:**

Após o slider de Safety Factor, adicionar botão:

```tsx
<button
  className="mt-2 w-full px-3 py-2 text-xs font-semibold text-secondary
             border border-secondary/30 rounded hover:border-secondary/60 transition"
  onClick={() => setSafetyFactorDefault(safetyFactor)}
>
  💾 SALVAR COMO PADRÃO
</button>
```

**Funcionalidade:** Salva o valor atual como padrão no localStorage, aplicar ao carregar a página.

**Store update:** `machiningStore` adiciona `safetyFactorDefault` + getter/setter.

---

## FASE 3: REFATORAÇÃO DO PAINEL DE AJUSTE FINO (Fine-Tune Panel)

**Status:** ⬜ Pendente | **Arquivos:** `src/components/fine-tune-panel.tsx` + `src/components/mobile/mobile-fine-tune-section.tsx`

---

## ATUALIZAÇÃO 3.1: Reposicionar SGB (SegmentedGradientBar) — Acima do Slider

**Arquivo:** `src/components/fine-tune-panel.tsx` (desktop) + `src/components/mobile/mobile-fine-tune-section.tsx` (mobile)

**Problema atual:** SGB fica ABAIXO do slider, pode ser coberto pelo dedo ao arrastar

**O que mudar:**

**Desktop (`fine-tune-panel.tsx` linha ~121-129):**

```tsx
{/* Header: label + valor */}
<div className="flex justify-between items-center">
  <label className="text-xs font-semibold uppercase text-gray-400">{paramLabel}</label>
  <span className="text-lg font-mono text-primary">{formatValue(value)}</span>
</div>

{/* SegmentedGradientBar — ACIMA do slider */}
<SegmentedGradientBar
  paramKey={key}
  segments={50}
  active={resultado !== null}
/>

{/* BidirectionalSlider */}
<BidirectionalSlider
  value={value}
  bounds={bounds}
  onChange={(v) => ajustarParametros(key, v)}
/>
```

**Mobile (`mobile-fine-tune-section.tsx` linha ~308-325):**

```tsx
{/* Header: label + valor */}
<div className="flex justify-between items-center">
  <label className="text-xs font-semibold text-gray-400">{paramLabel}</label>
  <span className="font-mono text-primary">{formatValue(value)}</span>
</div>

{/* SegmentedGradientBar — ACIMA */}
<SegmentedGradientBar
  paramKey={key}
  segments={30}  {/* mobile: 30 segs em vez de 50 */}
  active={resultado !== null}
/>

{/* +/Slider/- row */}
<div className="flex items-center gap-2">
  <button>−</button>
  <TouchSlider value={value} onChange={...} />
  <button>+</button>
</div>
```

---

## ATUALIZAÇÃO 3.2: Melhorar Botão de Explicação (Popover/Tooltip)

**Arquivo:** `src/components/fine-tune-panel.tsx` + mobile

**Problema atual:** Botão com seta para baixo (↓) pequeno, escondido, não é óbvio que é clicável

**O que mudar:**

Criar **botão maior e mais visível** com estilo **popover/tooltip**:

```tsx
<div className="relative group mt-2">
  <button
    className="w-full px-3 py-2 text-xs font-semibold text-cyan-400
               bg-cyan-500/10 border border-cyan-400/40 rounded
               hover:bg-cyan-500/20 hover:border-cyan-400/60 transition
               flex items-center justify-center gap-2"
    title="Clique para ver explicação"
  >
    ℹ️ O QUE É {paramLabel.toUpperCase()}?
  </button>

  {/* Popover/Tooltip — aparece ao hover ou click */}
  <div className="hidden group-hover:block absolute bottom-full mb-2 left-0 right-0
                  bg-gray-900 border border-cyan-400/40 rounded-lg p-3 text-xs
                  text-gray-300 z-10 backdrop-blur">
    <p>{explanationText}</p>
  </div>
</div>
```

**Novo arquivo:** `src/components/ParamExplanation.tsx` (reutilizável para cada parâmetro)

---

## FASE 4: AJUSTES NO PAINEL MÓVEL (Mobile Results Section)

**Status:** ⬜ Pendente | **Arquivo:** `src/components/mobile/mobile-results-section.tsx`

---

## ATUALIZAÇÃO 4.1: Aplicar Novo Layout do Visor (Mobile)

**O que fazer:**

Após visor desktop estar pronto, **replicar a mesma estrutura** em mobile:

1. SEÇÃO 1: Ferramenta (4 cards pequenos) + botão editar
2. SEÇÃO 2: Material + Operação (2 cards)
3. SEÇÃO 3: RPM + Avanço (2 cards grandes)
4. SEÇÃO 4: Potência/MRR/Torque/Vc (4 cards pequenos)
5. Sliders BigNumber RPM/Avanço
6. 3 Half-Moon Gauges (tamanho pequeno)
7. Warnings
8. Formula Cards

**Adaptações mobile:**
- Cards ligeiramente menores (padding reduzido)
- Fonts um pouco menores
- Respeitando limites de tela mobile

---

## FASE 5: INTEGRAÇÃO DE LÓGICA EDUCACIONAL (Teaching-First)

**Status:** ⬜ Pendente | **Transversal a todas as fases**

---

## ATUALIZAÇÃO 5.1: Adicionar Explicações em Pontos-Chave

**Onde adicionar:**

1. **Ferramenta:** Cada tipo de ferramenta exibe ícone + explicação (ao hover)
2. **Material:** Exibe faixa de Vc recomendada para o material selecionado
3. **Safety Factor:** Mostra impacto visual (barra de conservadorismo)
4. **RPM/Avanço:** Explicação "Por que esse valor?" ao lado
5. **Warnings:** Explicação do alerta + sugestão de ação

---

## RESUMO DE ORDEM DE IMPLEMENTAÇÃO

**Ordem lógica (facilita implementação dos demais):**

1. ✅ **ATUALIZAÇÃO 1.1:** Layout base do visor (grid structure) — BASE para tudo mais
2. ✅ **ATUALIZAÇÃO 1.4:** Reposicionar badges/favorite (cosmético, não bloqueia)
3. ✅ **ATUALIZAÇÃO 1.2:** Botão editar ferramenta + modal
4. ✅ **ATUALIZAÇÃO 1.3:** BigNumber sliders (já existem, só reorganizar)
5. ✅ **ATUALIZAÇÃO 1.5:** Gauges (já existem, só reorganizar)
6. ✅ **ATUALIZAÇÃO 1.6:** Warnings section
7. ✅ **ATUALIZAÇÃO 2.1:** Safety Factor slider (padrão) — simples
8. ✅ **ATUALIZAÇÃO 2.2:** Botão salvar como padrão
9. ✅ **ATUALIZAÇÃO 3.1:** Reposicionar SGB (móvel + desktop) — afeta ajuste fino
10. ✅ **ATUALIZAÇÃO 3.2:** Botão explicação melhorado (popover)
11. ✅ **ATUALIZAÇÃO 4.1:** Replicar visor em mobile (após desktop pronto)
12. ✅ **ATUALIZAÇÃO 5.1:** Explicações educacionais (refinamento final)

---

## AGRUPAMENTO POR REGIÃO (Para execução paralela/organizada)

### **Grupo A: Visor Desktop (Results Panel)**
- Atualizações 1.1, 1.2, 1.3, 1.4, 1.5, 1.6

### **Grupo B: Configurações + Ajuste Fino**
- Atualizações 2.1, 2.2, 3.1, 3.2

### **Grupo C: Mobile (replica)**
- Atualização 4.1

### **Grupo D: Educação (transversal)**
- Atualização 5.1 (aplicar após Grupos A-C prontos)

---

## ARQUIVOS PRINCIPAIS A MODIFICAR

| Arquivo | Atualizações | Complexidade |
|---------|-------------|-------------|
| `src/components/results-panel.tsx` | 1.1, 1.2, 1.3, 1.4, 1.5, 1.6 | 🔴 Alta |
| `src/components/fine-tune-panel.tsx` | 3.1, 3.2 | 🟡 Média |
| `src/components/mobile/mobile-fine-tune-section.tsx` | 3.1 | 🟡 Média |
| `src/components/mobile/mobile-config-section.tsx` | 2.1, 2.2 | 🟡 Média |
| `src/components/mobile/mobile-results-section.tsx` | 4.1 | 🟡 Média |
| `src/stores/machining-store.ts` | safety default, novo hook | 🟢 Baixa |
| `src/components/ParamExplanation.tsx` | NOVO — Componente | 🟢 Baixa |
| `src/components/modals/ToolEditModal.tsx` | NOVO — Modal | 🟡 Média |
