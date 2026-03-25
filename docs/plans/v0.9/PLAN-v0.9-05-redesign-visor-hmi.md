# PLAN v0.9-05 — Redesign Visor Central (Padrão Industrial HMI)

> **Status:** 📋 Pronto para implementar
> **Complexidade:** Alta
> **Versão alvo:** v0.9.3

---

## Objetivo

Reorganizar o painel de resultados (coluna direita) seguindo hierarquia HMI industrial (Siemens Sinumerik, Heidenhain, Sandvik CoroGuide). O operador lê RPM e Avanço em < 1 segundo. Alertas ficam em zona dedicada, nunca misturados com métricas. Inclui item #6 (alertas/banners em zona dedicada).

---

## Mapeamento: Layout Atual vs Novo

### Layout Atual (results-panel.tsx, linhas 62-239)

```
┌─────────────────────────────────────┐
│ ToolSummaryViewer                   │  ← linha 64
├─────────────────────────────────────┤
│ [Gauge] [Gauge] [Gauge]            │  ← linhas 67-93 (3 cols)
├─────────────────────────────────────┤
│ ⚠ Parâmetros Alterados (condicional)│  ← linhas 96-106
├─────────────────────────────────────┤
│ SafetyBadge (SEGURO/ALERTA/...)    │  ← linhas 108-110
├─────────────────────────────────────┤
│ [RPM BigNumber]  [Feed BigNumber]  │  ← linhas 113-128 (2 cols)
├─────────────────────────────────────┤
│ [Potência]  [Vc Real]              │  ← linhas 131-136 (2 cols)
├─────────────────────────────────────┤
│ 📚 Entenda os Cálculos             │  ← linhas 139-234
│   RPM, Feed, MRR, Power, Torque    │
├─────────────────────────────────────┤
│ ⚠ Avisos (WarningsSection)          │  ← linha 236
└─────────────────────────────────────┘
```

### Novo Layout (HMI Industrial — 5 Zonas)

```
┌─────────────────────────────────────┐
│ ToolSummaryViewer                   │  ← mantém
├─ ZONA 1 ── Valores Principais ──────┤
│ SafetyBadge                  [⭐]  │  ← sobe de 108→aqui (⭐ do #03)
│ [RPM BigNumber]  [Feed BigNumber]  │  ← mantém (com sliders bidi)
├─ ZONA 2 ── Métricas Secundárias ────┤
│ [Potência] [Vc Real] [Torque] [MRR]│  ← expande 2→4 colunas
├─ ZONA 3 ── Indicadores de Saúde ────┤
│ [Gauge] [Gauge] [Gauge]            │  ← desce de 67→aqui
├─ ZONA 4 ── Alertas e Avisos ────────┤
│ ⚠ Parâmetros Alterados (condicional)│  ← desce para zona dedicada
│ ⚠ Avisos (WarningsSection)          │  ← sobe de 236→aqui
├─ ZONA 5 ── Fórmulas (recolhidas) ──┤
│ 📚 Entenda os Cálculos             │  ← mantém, recolhidas por padrão
└─────────────────────────────────────┘
```

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/results-panel.tsx` | Reestruturação da ordem dos blocos JSX + adição de Torque/MRR |
| `src/components/shared-result-parts.tsx` | Nenhuma alteração funcional — componentes reutilizados como estão |

---

## Detalhamento Técnico

### 1. results-panel.tsx — Reestruturação JSX

A mudança é **apenas reordenação de blocos existentes** + adição de 2 métricas. Nenhum componente novo, nenhuma lógica nova.

#### 1a. Variáveis de cálculo adicionais (após linha 52, junto aos outros cálculos):

```typescript
const torquePct = Math.min((resultado.torque / limites.maxTorque) * 100, 100);
```

> `torquePct` necessário para o novo ProgressCard de Torque.

#### 1b. Novo JSX (substituir todo o return, linhas 62-239):

```tsx
return (
  <div className="flex flex-col gap-3">
    <ToolSummaryViewer />

    {/* ═══ ZONA 1 — Valores Principais (RPM + Avanço) ═══ */}
    <div className={pulseClass}>
      <SafetyBadge nivel={seguranca.nivel} avisosCount={seguranca.avisos.length} />
    </div>

    <div className="grid grid-cols-2 gap-3">
      <BigNumber label="Rotação (RPM)" value={fmt(rpm)} unit="RPM" pct={rpmPct}
        color="primary" glow="rgba(0,217,255,0.4)" barGlow="rgba(0,217,255,1)" icon="speed"
        useBidirectionalSlider
        baseValue={baseRPM}
        currentPercent={manualOverrides.rpmPercent ?? 0}
        onPercentChange={setManualRPMPercent}
        rgb="0,217,255" />
      <BigNumber label="Avanço (mm/min)" value={fmt(avanco)} unit="mm/min" pct={feedPct}
        color="secondary" glow="rgba(57,255,20,0.4)" barGlow="rgba(57,255,20,1)" icon="moving"
        useBidirectionalSlider
        baseValue={baseFeed}
        currentPercent={manualOverrides.feedPercent ?? 0}
        onPercentChange={setManualFeedPercent}
        rgb="57,255,20" />
    </div>

    {/* ═══ ZONA 2 — Métricas Secundárias (4 colunas) ═══ */}
    <div className="grid grid-cols-4 gap-2">
      <ProgressCard label="Potência Est." value={potenciaMotor.toFixed(2)} unit="kW" pct={powerPct}
        barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" />
      <ProgressCard label="Vc Real" value={vcReal.toFixed(0)} unit="m/min" pct={Math.min(vcReal / 500 * 100, 100)}
        barColor="bg-blue-500" barShadow="rgba(59,130,246,0.5)" />
      <ProgressCard label="Torque" value={resultado.torque.toFixed(2)} unit="Nm" pct={torquePct}
        barColor="bg-purple-500" barShadow="rgba(168,85,247,0.5)" />
      <ProgressCard label="MRR" value={mrr.toFixed(1)} unit="cm³/min" pct={Math.min(mrrPct, 100)}
        barColor="bg-emerald-500" barShadow="rgba(16,185,129,0.5)" />
    </div>

    {/* ═══ ZONA 3 — Indicadores de Saúde (Gauges) ═══ */}
    <div className="grid grid-cols-3 gap-3">
      <Gauge
        value={avanco}
        maxValue={limites.maxAvanco}
        label="Eficiência de Avanço"
        palette="avanco"
      />
      <Gauge
        value={mrrPct}
        maxValue={100}
        label="Produtividade MRR"
        palette="mrr"
        badge={storeResultado ? `${mrr.toFixed(1)} cm³/min` : undefined}
      />
      <Gauge
        value={resultado.healthScore}
        maxValue={100}
        label="Saúde da Ferramenta"
        palette="health"
        badge={storeResultado ? (resultado.healthScore === 0 ? 'BLOQUEADO' : undefined) : undefined}
      />
    </div>

    {/* ═══ ZONA 4 — Alertas e Avisos (zona dedicada) ═══ */}
    {showResetMessage && (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 animate-[fadeInUp_0.4s_ease-out]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-yellow-400 animate-pulse">refresh</span>
          <div>
            <p className="text-base font-semibold text-yellow-300">Parâmetros Alterados</p>
            <p className="text-sm text-yellow-400/80 mt-0.5">Clique em "SIMULAR" para recalcular os resultados</p>
          </div>
        </div>
      </div>
    )}

    <WarningsSection avisos={seguranca.avisos} />

    {/* ═══ ZONA 5 — Fórmulas Educacionais (recolhidas) ═══ */}
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-glass">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
          <span className="material-symbols-outlined text-primary">school</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-widest">Entenda os Cálculos</h3>
          <p className="text-xs text-gray-500 mt-0.5">Clique para expandir e ver como cada valor é calculado</p>
        </div>
      </div>
      <div className="space-y-2">
        {/* RPM FormulaCard — mantém exatamente como está (linhas 151-164) */}
        {/* Feed FormulaCard — mantém exatamente como está (linhas 167-183) */}
        {/* MRR FormulaCard — mantém exatamente como está (linhas 186-199) */}
        {/* Power FormulaCard — mantém exatamente como está (linhas 202-216) */}
        {/* Torque FormulaCard — mantém exatamente como está (linhas 219-232) */}
      </div>
    </div>
  </div>
);
```

> **Nota:** O bloco de FormulaCards (5 cards) é copiado identicamente do código atual (linhas 150-233). Omitido no diff acima por brevidade — **nenhuma mudança** neles.

### 2. Resumo das Mudanças (diff visual)

| Bloco | Posição Atual | Nova Posição | Mudança |
|-------|--------------|-------------|---------|
| ToolSummaryViewer | 1º | 1º | Nenhuma |
| Gauges (3 cols) | 2º (linhas 67-93) | 5º (Zona 3) | **Desce** |
| Reset feedback | 3º (linhas 96-106) | 7º (Zona 4) | **Desce** |
| SafetyBadge | 4º (linhas 108-110) | 2º (Zona 1) | **Sobe** |
| BigNumbers RPM/Feed | 5º (linhas 113-128) | 3º (Zona 1) | **Sobe** |
| ProgressCards | 6º (linhas 131-136) | 4º (Zona 2) | **Sobe + expande 2→4 cols** |
| FormulaCards | 7º (linhas 139-234) | 8º (Zona 5) | **Desce 1 posição** |
| WarningsSection | 8º (linha 236) | 7º (Zona 4) | **Sobe, agrupa com Reset** |

### 3. Métricas novas na Zona 2

Duas métricas que antes só apareciam nas FormulaCards ou Gauges agora ficam visíveis:

| Métrica | Cor | Cálculo do % |
|---------|-----|-------------|
| **Torque** | `bg-purple-500` / `rgba(168,85,247,0.5)` | `resultado.torque / limites.maxTorque × 100` |
| **MRR** | `bg-emerald-500` / `rgba(16,185,129,0.5)` | `mrr / mrrBenchmark × 100` (já calculado como `mrrPct`) |

### 4. Ajuste no ProgressCard para 4 colunas

Com 4 colunas (`grid-cols-4`), os ProgressCards ficam mais estreitos. Verificar:
- O texto `text-4xl font-mono` do valor pode precisar reduzir para `text-3xl` se não couber
- Se necessário, criar variante `compact` no ProgressCard ou simplesmente usar `text-2xl` inline

**Decisão:** Testar primeiro com `text-4xl` existente. Se não couber em 1360px mínimo, ajustar para `text-2xl` nos 4 cards da Zona 2:

```tsx
// Se necessário — ajuste condicional:
<ProgressCard label="Potência Est." value={potenciaMotor.toFixed(2)} unit="kW" pct={powerPct}
  barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" compact />
```

Se precisar da prop `compact`, adicionar em `shared-result-parts.tsx`:

```diff
-export function ProgressCard({ label, value, unit, pct, barColor, barShadow }: {
-  label: string; value: string; unit: string; pct: number; barColor: string; barShadow: string;
+export function ProgressCard({ label, value, unit, pct, barColor, barShadow, compact }: {
+  label: string; value: string; unit: string; pct: number; barColor: string; barShadow: string; compact?: boolean;
 }) {
   return (
     <div className="bg-surface-dark backdrop-blur-md border border-white/5 rounded-xl p-5 ...">
       <div className="text-xs font-bold tracking-wider text-gray-400 uppercase">{label}</div>
-      <div className="text-4xl font-mono text-white tracking-tight">
+      <div className={`${compact ? 'text-2xl' : 'text-4xl'} font-mono text-white tracking-tight`}>
         {value} <span className="text-base text-gray-500 font-sans font-normal">{unit}</span>
       </div>
```

> **Implementar apenas se necessário** após teste visual na resolução mínima (1360px).

---

## O que NÃO muda

- **Nenhuma lógica de cálculo** — apenas reorganização visual
- **FormulaCards** — mantidos idênticos (5 cards, mesma ordem)
- **Animações** — `pulseClass`, `fadeInUp`, `gaugeRoll` continuam funcionando (são CSS classes, independem de posição no DOM)
- **Hook `useSimulationAnimation`** — nenhuma alteração
- **Estado do store** — nenhuma alteração
- **shared-result-parts.tsx** — nenhuma alteração (exceto `compact` se necessário)

---

## Coordenação com Item #03 (Favoritar)

O botão ⭐ do plano #03 fica posicionado no container principal (absolute top-right). Com o novo layout:
- O `<div className="flex flex-col gap-3 relative">` continua sendo o container
- O ⭐ fica no canto superior direito, acima/ao lado do SafetyBadge na Zona 1
- **Nenhum conflito** — ambos os planos podem ser implementados independentemente

---

## Testes

### Testes existentes que podem ser afetados:

Verificar se há testes de snapshot ou testes que dependam da ordem dos elementos no DOM:

```
- Se houver testes que buscam elementos por ordem (nth-child, etc.) → atualizar
- Testes que buscam por text/role/aria-label → não afetados
```

### Novos testes (ou atualizações):

```
- 'Zona 1: SafetyBadge renders before BigNumbers'
- 'Zona 2: renders 4 ProgressCards (Potência, Vc, Torque, MRR)'
- 'Zona 2: Torque displays correct value and percentage'
- 'Zona 2: MRR displays correct value and percentage'
- 'Zona 3: Gauges render after ProgressCards'
- 'Zona 4: Reset message and WarningsSection are adjacent'
- 'Zona 4: Reset message only shows when resultado is null'
- 'all safety states render correctly: verde, amarelo, vermelho, bloqueado'
- 'animations (pulseClass) work on SafetyBadge in new position'
```

### Teste visual manual (checklist):

```
- [ ] RPM e Avanço são os primeiros números grandes visíveis
- [ ] SafetyBadge (SEGURO/ALERTA/etc) fica no topo dos resultados
- [ ] 4 métricas secundárias cabem em 1 linha (min-width 1360px)
- [ ] Gauges ficam abaixo das métricas
- [ ] Alertas (amarelo) ficam agrupados, nunca entre métricas
- [ ] Fórmulas ficam no final, recolhidas
- [ ] Animação pulse funciona no SafetyBadge
- [ ] Animação fadeInUp funciona no Reset message
- [ ] Estado "sem resultado" (zerado) exibe corretamente
```

---

## Dependências

- **Nenhuma de entrada** — pode ser implementado independentemente
- **Item #3** (Favoritar) coloca ⭐ na Zona 1 — coordenar posição mas sem conflito
- **Item #6** (Alertas zona dedicada) — **absorvido neste plano** (Zona 4)

---

## Riscos / Cuidados

- **Maior item da lista** — maior risco de regressão visual
- **4 colunas em 1360px:** Cada ProgressCard terá ~310px. Com padding/gap, pode ficar apertado. Testar e aplicar `compact` se necessário.
- **Sem testes de snapshot** — risco baixo de quebra automatizada, mas precisa de teste visual manual
- **Animações:** São CSS classes puras (não dependem de posição no DOM) — devem funcionar sem alteração
- **Ordem de implementação:** Pode ser feito antes ou depois do #03 sem conflito

---

## Critérios de Conclusão

- [ ] Zona 1: SafetyBadge + BigNumbers (RPM, Feed) no topo
- [ ] Zona 2: 4 ProgressCards em grid 4 colunas (Potência, Vc, Torque, MRR)
- [ ] Zona 3: 3 Gauges abaixo das métricas
- [ ] Zona 4: Reset message + WarningsSection agrupados
- [ ] Zona 5: FormulaCards no final (inalterados)
- [ ] Torque e MRR visíveis como métricas (não só em fórmulas/gauges)
- [ ] Hierarquia visual: operador lê RPM/Feed em < 1 segundo
- [ ] Alertas nunca misturados entre métricas
- [ ] Funciona em min-width 1360px sem overflow
- [ ] Animações (pulse, fadeInUp, gaugeRoll) funcionando
- [ ] Todos os estados testados: sem resultado, verde, amarelo, vermelho, bloqueado
- [ ] Build sem erros TypeScript
- [ ] Testes passando
