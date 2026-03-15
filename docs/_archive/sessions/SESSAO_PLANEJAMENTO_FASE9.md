# Sessão de Planejamento - Fase 9: Grande Melhoria de UX

**Data:** 10/02/2026
**Tipo:** Planejamento completo (6 features principais)
**Status:** Pronto para implementação
**Tempo estimado:** ~240 minutos (~4 horas)

---

## 📋 Resumo Executivo

Esta sessão planejou **6 grandes melhorias de UX** para o ToolOptimizer CNC:

1. **Visor de Resumo da Ferramenta** - Painel read-only mostrando 8 valores-chave
2. **Reorganização da Interface de Ferramenta** - Dropdown para 15 diâmetros, seletor de raio condicional, spinner para altura
3. **Fine Tune com Edição Avançada** - Sliders com botões +/- e input editável
4. **RPM e Feed Editáveis** - Ajuste manual com recalculo automático
5. **Gauge Segmentado Neon** - Arco 270° com 40 segmentos e zonas de cor
6. **Página de Configurações** - Botão settings no header, página dedicada para limites de máquina

---

## 🎯 Feature 1: Visor de Resumo da Ferramenta

### Descrição
Painel read-only no topo da seção "Configuração da Ferramenta" mostrando 8 valores em tempo real:
- **Linha 1 (Primária):** Diâmetro, Raio de Ponta, Tipo, Altura de Fixação
- **Linha 2 (Secundária):** Vc, fz, ae, ap

### Arquivos a Criar
- `src/components/tool-summary-viewer.tsx` (~70 linhas)
- `tests/components/tool-summary-viewer.test.tsx` (8 testes)

### Implementação Chave
```tsx
// Corner radius logic
function getCornerRadius(ferramenta: Ferramenta): string {
  if (tipo === 'toroidal') return `R${raioQuina ?? 1.0}`;
  if (tipo === 'esferica') return `R${diametro / 2}`;
  return 'N/A';
}
```

### Integração
- Inserir em `config-panel.tsx` na linha 94 (antes da seção Ferramenta)
- Import: `import { ToolSummaryViewer } from './tool-summary-viewer'`
- Componente: `<ToolSummaryViewer />`

### Styling
- Background: `bg-gradient-to-r from-primary/5 to-transparent`
- Border: `border-l-2 border-primary`
- Fonte mono em todos os números
- Color coding: primary (cyan) para Vc/D, secondary (green) para fz, orange para ae/ap

---

## 🎯 Feature 2: Reorganização da Interface de Ferramenta

### Mudanças no ConfigPanel

#### 2.1 Raio da Ponta (NOVO - Condicional)
- Aparece APENAS quando tipo = 'toroidal'
- 3 botões toggle: R0.2, R0.5, R1.0
- Mesmo estilo visual dos botões de tipo

```tsx
{ferramenta.tipo === 'toroidal' && (
  <FieldGroup label="Raio da Ponta">
    <div className="grid grid-cols-3 gap-2">
      {RAIOS_PONTA.map((raio) => (
        <button
          onClick={() => setFerramenta({ raioQuina: raio })}
          className={/* toggle style */}
        >
          R{raio}
        </button>
      ))}
    </div>
  </FieldGroup>
)}
```

#### 2.2 Diâmetro (MUDANÇA: Grid → Dropdown)
- Mudar de 6 botões grid para dropdown com 15 valores
- Valores: 0.2, 0.5, 0.75, 0.8, 1, 1.5, 2, 3, 4, 6, 8, 10, 12, 14, 16mm

```tsx
<FieldGroup label="Diâmetro (mm)">
  <select
    value={ferramenta.diametro}
    onChange={(e) => setFerramenta({ diametro: Number(e.target.value) })}
    className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3..."
  >
    {DIAMETROS_COMPLETOS.map((d) => (
      <option key={d} value={d}>{d}mm</option>
    ))}
  </select>
</FieldGroup>
```

#### 2.3 Altura de Fixação (MUDANÇA: Input → Spinner)
- Substituir input simples por: input + botões [▲] [▼]
- Step: 0.5mm
- Limites: min=5mm, max=150mm

```tsx
<FieldGroup label="Altura de Fixação (mm)">
  <div className="flex gap-2">
    <input type="number" value={ferramenta.balanco} ... />
    <button onClick={() => setFerramenta({ balanco: Math.min(150, balanco + 0.5) })}>
      ▲
    </button>
    <button onClick={() => setFerramenta({ balanco: Math.max(5, balanco - 0.5) })}>
      ▼
    </button>
  </div>
</FieldGroup>
```

### Arquivos de Dados
Adicionar em `src/data/tools.ts`:
```typescript
export const RAIOS_PONTA = [0.2, 0.5, 1.0] as const;
export const DIAMETROS_COMPLETOS = [0.2, 0.5, 0.75, 0.8, 1, 1.5, 2, 3, 4, 6, 8, 10, 12, 14, 16] as const;
```

### Atualizar Store
Em `src/store/machining-store.ts`:
```typescript
const DEFAULT_FERRAMENTA: Ferramenta = {
  tipo: 'toroidal', // Changed from 'topo'
  diametro: 6,
  numeroArestas: 4,
  balanco: 25, // Changed from 30
  raioQuina: 1.0, // NEW
};
```

---

## 🎯 Feature 3: Fine Tune com Edição Avançada

### Mudanças no FineTunePanel

Cada slider (Vc, fz, ae, ap) deve ter:
- Botão **[-]** à esquerda
- **Slider** no centro (já existe)
- Botão **[+]** à direita
- **Input editável** no topo (substituir valor read-only)

### Layout Final
```
┌────────────────────────────────────────┐
│ fz  FEED PER TOOTH          [0.10]     │
│                           MM/TOOTH     │
│  [-]  ████████░░░░░░░░░░░  [+]        │
│  Description text here...              │
└────────────────────────────────────────┘
```

### Implementação
Em `src/components/fine-tune-panel.tsx` (substituir todo o bloco de slider):

```tsx
<div key={key} className="flex flex-col gap-2">
  {/* Header: label + editable value */}
  <div className="flex justify-between items-end mb-1">
    <div className="flex items-baseline gap-2">
      <span className={`text-sm font-bold font-mono text-${color}`}>{label}</span>
      <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">{fullLabel}</span>
    </div>
    <div className="text-right">
      <input
        type="number"
        value={display}
        onChange={(e) => {
          const newVal = Number(e.target.value);
          if (!isNaN(newVal) && newVal >= min && newVal <= max) {
            setParametros({ [key]: newVal });
          }
        }}
        className="w-20 bg-transparent border-none text-right font-mono..."
      />
      <div className="text-[9px] text-gray-500 font-mono">{unit}</div>
    </div>
  </div>

  {/* Slider row: [-] slider [+] */}
  <div className="flex items-center gap-2">
    <button onClick={() => setParametros({ [key]: Math.max(min, val - step) })}>
      −
    </button>

    {/* Existing slider */}
    <div className="relative h-1.5 flex-1 bg-black/40 rounded-full">
      {/* ... existing slider code ... */}
    </div>

    <button onClick={() => setParametros({ [key]: Math.min(max, val + step) })}>
      +
    </button>
  </div>

  <p className="text-[10px] text-gray-500">{desc}</p>
</div>
```

---

## 🎯 Feature 4: RPM e Feed Editáveis

### Objetivo
Permitir ajuste manual de RPM e Feed após cálculo, com recalculo automático de valores dependentes.

### Mudanças no BigNumber Component

Em `src/components/results-panel.tsx`:

```tsx
function BigNumber({ label, value, unit, pct, color, glow, barGlow, icon,
                     isEditable, currentValue, onValueChange, min, max, step }) {

  return (
    <div className="...">
      {/* ... existing header ... */}

      <div className="flex items-center gap-2 z-10 relative mb-2">
        {isEditable && (
          <button onClick={() => onValueChange(Math.max(min, currentValue - step))}>
            −
          </button>
        )}

        {isEditable ? (
          <input
            type="number"
            value={currentValue}
            onChange={(e) => onValueChange(Number(e.target.value))}
            className="w-32 bg-transparent text-center text-5xl font-mono..."
          />
        ) : (
          <span className="text-5xl font-mono...">{value}</span>
        )}

        {isEditable && (
          <button onClick={() => onValueChange(Math.min(max, currentValue + step))}>
            +
          </button>
        )}
      </div>

      {/* ... existing progress bar ... */}
    </div>
  );
}
```

### Store Actions

Em `src/store/machining-store.ts`:

```typescript
interface MachiningState {
  // ... existing
  manualOverrides: {
    rpm?: number;
    feed?: number;
  };
}

interface MachiningActions {
  // ... existing
  setManualRPM: (rpm: number) => void;
  setManualFeed: (feed: number) => void;
  clearManualOverrides: () => void;
}

// Implementation
setManualRPM: (rpm) => {
  set({ manualOverrides: { ...get().manualOverrides, rpm } });
  get().calcular(); // Recalculate
},

setManualFeed: (feed) => {
  set({ manualOverrides: { ...get().manualOverrides, feed } });
  get().calcular(); // Recalculate
},
```

### Engine Update

Modificar lógica de cálculo para usar overrides:
- Se `manualOverrides.rpm` existe → usar ao invés de RPM calculado
- Se `manualOverrides.feed` existe → usar ao invés de Feed calculado
- Recalcular valores dependentes:
  - RPM override → Vc_real = (π × D × RPM) / 1000
  - Feed override → fz_effective = F / (Z × RPM)

### Usage no ResultsPanel

```tsx
<BigNumber
  label="Spindle Speed"
  value={fmt(rpm)}
  unit="RPM"
  pct={rpmPct}
  color="primary"
  glow="rgba(0,217,255,0.4)"
  barGlow="rgba(0,217,255,1)"
  icon="speed"
  isEditable={true}
  currentValue={rpm}
  onValueChange={(val) => useMachiningStore.getState().setManualRPM(val)}
  min={100}
  max={limites.maxRPM}
  step={10}
/>
```

---

## 🎯 Feature 5: Gauge Segmentado Neon

### Especificações

**Geometria:**
- Arco de 270° (de -135° a +135°)
- 40 segmentos individuais
- Gap de 3px entre segmentos

**Zonas de Cor (baseadas em %):**
- 0-50%: `#39FF14` (Verde Neon)
- 51-100%: `#00FF88` (Verde-Cyan)
- 101-120%: `#00D9FF` (Cyan vibrante)
- 121-150%: `#FFD700` (Dourado/Alerta)

**Efeitos:**
- Glow: feGaussianBlur nos segmentos ativos
- Pulso: Se value > 120% → animação de brightness

**Display Central:**
- Valor numérico animado
- Unidade: %
- Pulso quando crítico (>120%)

**Scale Markers:**
- Labels: 0, 20, 40, 60, 80, 100, 120, 140, 150
- 100% destacado: cor cyan, fonte maior

### Implementação

Substituir completamente `src/components/gauge.tsx`:

```tsx
export function Gauge({ value, maxValue, label }: GaugeProps) {
  const pct = Math.min((value / maxValue) * 100, 150);
  const activeSegments = Math.round((pct / 150) * 40);
  const isCritical = pct > 120;

  const segments = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => {
      const startAngle = -135 + (i * 270 / 40);
      const endAngle = startAngle + (270 / 40) - 3; // 3° gap
      return { startAngle, endAngle, isActive: i < activeSegments };
    })
  , [activeSegments]);

  const getSegmentColor = (segmentIndex: number) => {
    const segmentPct = (segmentIndex / 40) * 150;
    if (segmentPct <= 50) return '#39FF14';
    if (segmentPct <= 100) return '#00FF88';
    if (segmentPct <= 120) return '#00D9FF';
    return '#FFD700';
  };

  return (
    <div className="relative w-40 h-40">
      <svg viewBox="0 0 200 200">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Inactive track (all 40 segments, opacity 10%) */}
        <g className="opacity-10">
          {segments.map((seg, i) => (
            <path key={`track-${i}`} d={arcPath(seg)} stroke="white" fill="none" strokeWidth="8" />
          ))}
        </g>

        {/* Active segments with glow */}
        <g filter="url(#glow)">
          {segments.map((seg, i) =>
            seg.isActive && (
              <path
                key={`active-${i}`}
                d={arcPath(seg)}
                stroke={getSegmentColor(i)}
                fill="none"
                strokeWidth="8"
                className={isCritical ? 'animate-pulse' : ''}
                style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            )
          )}
        </g>

        {/* Scale markers */}
        {[0, 20, 40, 60, 80, 100, 120, 140, 150].map(val => (
          <text
            key={val}
            x={getMarkerX(val)}
            y={getMarkerY(val)}
            textAnchor="middle"
            className={val === 100 ? 'text-primary text-sm font-bold' : 'text-gray-500 text-xs'}
          >
            {val}
          </text>
        ))}
      </svg>

      {/* Center display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={isCritical ? 'animate-pulse' : ''}>
          <span className="text-4xl font-bold text-white font-mono">
            {Math.round(pct)}
          </span>
          <span className="text-lg text-gray-500">%</span>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function arcPath({ startAngle, endAngle }) {
  const R = 80;
  const CX = 100;
  const CY = 100;
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  const x1 = CX + R * Math.cos(startRad);
  const y1 = CY + R * Math.sin(startRad);
  const x2 = CX + R * Math.cos(endRad);
  const y2 = CY + R * Math.sin(endRad);
  return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
}

function getMarkerX(value: number): number {
  const angle = -135 + (value / 150) * 270;
  return 100 + 95 * Math.cos((angle * Math.PI) / 180);
}

function getMarkerY(value: number): number {
  const angle = -135 + (value / 150) * 270;
  return 100 + 95 * Math.sin((angle * Math.PI) / 180);
}
```

---

## 🎯 Feature 6: Página de Configurações

### Instalação de Dependência
```bash
npm install react-router-dom
```

### Criar Settings Page

Arquivo: `src/pages/settings-page.tsx`

```tsx
import { useMachiningStore } from '@/store';
import { useNavigate } from 'react-router-dom';

export function SettingsPage() {
  const navigate = useNavigate();
  const limites = useMachiningStore(s => s.limitesMaquina);
  const setLimites = useMachiningStore(s => s.setLimitesMaquina);
  const safetyFactor = useMachiningStore(s => s.safetyFactor);
  const setSafetyFactor = useMachiningStore(s => s.setSafetyFactor);

  return (
    <div className="min-h-screen p-6 bg-background-dark">
      {/* Header */}
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
        >
          ← Voltar
        </button>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
      </header>

      {/* Machine Limits */}
      <section className="mb-8 bg-surface-dark p-6 rounded-xl border border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Limites de Máquina</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400">RPM Máximo</label>
            <input
              type="number"
              value={limites.maxRPM}
              onChange={(e) => setLimites({ maxRPM: Number(e.target.value) })}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Potência Máxima (kW)</label>
            <input
              type="number"
              value={limites.maxPotencia}
              onChange={(e) => setLimites({ maxPotencia: Number(e.target.value) })}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Torque Máximo (Nm)</label>
            <input
              type="number"
              value={limites.maxTorque}
              onChange={(e) => setLimites({ maxTorque: Number(e.target.value) })}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Avanço Máximo (mm/min)</label>
            <input
              type="number"
              value={limites.maxAvanco}
              onChange={(e) => setLimites({ maxAvanco: Number(e.target.value) })}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white font-mono"
            />
          </div>
        </div>
      </section>

      {/* Safety Factor */}
      <section className="bg-surface-dark p-6 rounded-xl border border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Fator de Segurança Padrão</h2>
        <input
          type="number"
          value={safetyFactor}
          onChange={(e) => setSafetyFactor(Number(e.target.value))}
          min={0.5} max={1.0} step={0.05}
          className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white font-mono"
        />
      </section>
    </div>
  );
}
```

### Adicionar Routing

Arquivo: `src/main.tsx`

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { SettingsPage } from './pages/settings-page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
```

### Substituir ExportButtons

Arquivo: `src/components/export-buttons.tsx` (substituir conteúdo completo):

```tsx
import { useNavigate } from 'react-router-dom';

export function ExportButtons() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/settings')}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
    >
      <span className="material-symbols-outlined text-lg">settings</span>
      <span className="text-xs font-medium">Configurações</span>
    </button>
  );
}
```

---

## 📊 Resumo de Testes

Total de testes novos: **27** (suite cresce de 164 → 191)

### Distribuição por Feature:
1. **Tool Summary Viewer:** 8 testes
   - Rendering estático
   - Corner radius logic (toroidal/esférica/topo)
   - Real-time updates

2. **Config Panel Integration:** 5 testes
   - Visor renders
   - Raio da Ponta condicional
   - Dropdown 15 diâmetros
   - Altura spinner

3. **Fine Tune Panel:** 4 testes
   - Botões +/- funcionam
   - Input direto funciona
   - Limites respeitados

4. **Gauge Redesign:** 6 testes
   - 40 segmentos
   - Zonas de cor corretas
   - Pulso crítico (>120%)
   - Scale markers

5. **Editable Results:** 4 testes
   - RPM +/- funciona
   - Feed +/- funciona
   - Recalculo automático

6. **Settings Page:** 3 testes
   - Renders inputs
   - Updates store
   - Navegação

---

## 🔧 Sequência de Implementação Recomendada

### Step 1: Data Layer (10 min)
- Editar `src/data/tools.ts`
- Adicionar RAIOS_PONTA e DIAMETROS_COMPLETOS

### Step 2: Store Updates (5 min)
- Editar `src/store/machining-store.ts`
- Atualizar DEFAULT_FERRAMENTA
- Adicionar manualOverrides state
- Adicionar setManualRPM, setManualFeed actions

### Step 3: Tool Summary Viewer (30 min)
- Criar `src/components/tool-summary-viewer.tsx`
- Implementar getCornerRadius logic
- Implementar ValueCell helper
- Integrar em ConfigPanel

### Step 4: Reorganizar ConfigPanel (40 min)
- Adicionar Raio da Ponta condicional
- Substituir grid de diâmetro por dropdown
- Substituir input de altura por spinner

### Step 5: Redesenhar Gauge (40 min)
- Substituir `src/components/gauge.tsx` completamente
- Implementar 40 segmentos
- Implementar zonas de cor
- Implementar scale markers

### Step 6: Fine Tune Enhancement (20 min)
- Editar `src/components/fine-tune-panel.tsx`
- Adicionar botões [-] e [+]
- Converter valor para input editável

### Step 7: Editable Results (30 min)
- Modificar BigNumber em `results-panel.tsx`
- Adicionar props isEditable, onValueChange
- Wire to store actions

### Step 8: Settings Page + Routing (25 min)
- Instalar react-router-dom
- Criar `src/pages/settings-page.tsx`
- Atualizar `src/main.tsx` com routing
- Substituir export-buttons.tsx

### Step 9: Testes (35 min)
- Criar `tests/components/tool-summary-viewer.test.tsx` (8 testes)
- Atualizar `tests/components/config-panel.test.tsx` (5 testes)
- Atualizar `tests/components/fine-tune-panel.test.tsx` (4 testes)
- Atualizar `tests/components/gauge.test.tsx` (6 testes)
- Atualizar `tests/components/results-panel.test.tsx` (4 testes)
- Criar `tests/pages/settings-page.test.tsx` (3 testes)

### Step 10: Visual QA (25 min)
- Verificar visor de resumo
- Testar raio condicional
- Testar dropdown 15 diâmetros
- Testar sliders com +/-
- Testar gauge segmentado
- Testar RPM/Feed editáveis
- Testar navegação settings

---

## 📦 Arquivos Novos

1. `src/components/tool-summary-viewer.tsx`
2. `src/pages/settings-page.tsx`
3. `tests/components/tool-summary-viewer.test.tsx`
4. `tests/pages/settings-page.test.tsx`

---

## ✏️ Arquivos Modificados

1. `src/data/tools.ts` (+5 linhas)
2. `src/store/machining-store.ts` (+15 linhas)
3. `src/components/config-panel.tsx` (+60 linhas → ~254 total)
4. `src/components/gauge.tsx` (redesign completo, 150 linhas)
5. `src/components/fine-tune-panel.tsx` (+25 linhas → ~120 total)
6. `src/components/results-panel.tsx` (+40 linhas → ~225 total)
7. `src/components/export-buttons.tsx` (simplificado, ~15 linhas)
8. `src/main.tsx` (+10 linhas)
9. `package.json` (react-router-dom)
10. Arquivos de teste (conforme listado acima)

---

## ✅ Checklist Final de Validação

### Visual QA
- [ ] Visor de resumo aparece no topo
- [ ] 8 valores exibidos corretamente
- [ ] Raio da ponta aparece APENAS com toroidal
- [ ] Dropdown tem todos 15 diâmetros
- [ ] Altura spinner funciona (±0.5mm)
- [ ] Fine tune tem [-] slider [+] input
- [ ] Gauge tem 40 segmentos
- [ ] Cores mudam conforme % (verde→cyan→dourado)
- [ ] 100% marcador destacado em cyan
- [ ] RPM/Feed têm botões [-] input [+]
- [ ] Edição de RPM recalcula Vc_real
- [ ] Edição de Feed recalcula fz_effective
- [ ] Botão "Configurações" no header
- [ ] Página /settings renderiza
- [ ] "Voltar" retorna à home

### Testes
- [ ] 191 testes passando
- [ ] `npm run typecheck` clean
- [ ] `npm run build` sem erros

### Limites de Arquivo
- [ ] ConfigPanel < 260 linhas
- [ ] FineTunePanel < 125 linhas
- [ ] ResultsPanel < 230 linhas
- [ ] Gauge < 160 linhas

---

## 🚀 Comando de Início para Próxima Sessão

Copie e cole isso no próximo chat:

```
# MISSÃO: Implementar Fase 9 - Grande Melhoria de UX (ToolOptimizer CNC)

## CONTEXTO
Fase 9 já foi planejada completamente. Veja o documento:
docs/sessions/SESSAO_PLANEJAMENTO_FASE9.md

## O QUE FAZER
Implemente as 6 features na ordem especificada no documento:
1. Visor de Resumo da Ferramenta
2. Reorganização da Interface de Ferramenta
3. Fine Tune com Edição Avançada
4. RPM e Feed Editáveis
5. Gauge Segmentado Neon
6. Página de Configurações

## IMPORTANTE
- Siga a sequência de implementação do documento (Steps 1-10)
- Não pule testes
- Valide visualmente cada feature após implementar
- Target final: 191 testes passando

## REFERÊNCIA COMPLETA
Leia: docs/sessions/SESSAO_PLANEJAMENTO_FASE9.md
Plano detalhado: C:\Users\USUARIO\.claude\plans\abstract-sauteeing-thunder.md
```

---

## 📝 Notas Adicionais

### Performance
- Usar selective subscriptions Zustand: `useMachiningStore(s => s.ferramenta)`
- Gauge: useMemo para segments array
- Real-time updates esperados: < 16ms (60 FPS)

### Acessibilidade
- Todos inputs numéricos têm min/max
- Botões têm área clicável ≥30x30px
- Labels claras em português
- Fonte mono em valores numéricos

### Edge Cases Cobertos
1. Missing raioQuina → fallback to 1.0
2. Invalid tool type → fallback to "Toroidal"
3. Extreme values → toFixed() previne overflow
4. Spinner boundaries → Math.min/max
5. Manual override conflicts → store overrides têm prioridade

---

**Documento gerado em:** 10/02/2026
**Próxima ação:** Executar implementação completa na próxima sessão
