# ITEM #10 — Atualização 4.1: Replicar Visor Desktop no Mobile

**Status:** ✅ APROVADO (30/03/2026)
**Sessão:** Revisão iterativa 30/03 — segunda parte

---

## Decisão

Replicar a estrutura de seções do visor desktop no mobile, com adaptações de tamanho.

## Onde

- `src/components/mobile/mobile-results-section.tsx`

## Detalhe

**Estrutura a replicar (mesma ordem do desktop):**

1. **SEÇÃO 1 — Ferramenta:** 4 cards pequenos (tipo, diâmetro, raio, fixação) + botão Editar
2. **SEÇÃO 2 — Material + Operação:** 2 cards médios
3. **SEÇÃO 3 — RPM + Avanço:** 2 cards grandes (valores principais)
4. **SEÇÃO 4 — Dados calculados:** 4 cards pequenos (potência, MRR, torque, Vc real)
5. Sliders BigNumber RPM/Avanço
6. 3 Half-Moon Gauges (tamanho `sm`)
7. Warnings section

**Adaptações mobile:**
- Padding reduzido nos cards
- Fonts ligeiramente menores
- Gauges com `size="sm"` (160×80)
- Respeitar limites de tela mobile (min-width contexto: layout empilhado)

**Dependência:** Implementar após visor desktop (1.1) estar finalizado.

---

## Mapeamento Técnico do Codebase

### Componentes Envolvidos

| Componente | Arquivo | Linhas | Relevância |
|------------|---------|--------|------------|
| `MobileResultsSection` | `src/components/mobile/mobile-results-section.tsx` | 1-278 | Componente a refatorar |
| `MobilePage` | `src/pages/mobile-page.tsx` | 1-~50 | Página que renderiza o MobileResultsSection |
| `MobileStickyActions` | `src/pages/mobile-page.tsx` | 12-~35 | Botão Simular mobile (sticky) |
| Componentes shared | `src/components/shared-result-parts.tsx` | 1-140 | BigNumber, ProgressCard, SafetyBadge, MetricCell, WarningsSection, fmt |
| `HalfMoonGauge` | `src/components/half-moon-gauge.tsx` | 56-185 | Gauge com `size="sm"` (160×80) |

### Estado Atual (mobile-results-section.tsx)

**Imports (L1-8):** Mesmos do desktop — useMachiningStore, useHistoryStore, shared-result-parts, HalfMoonGauge, FormulaCard, ToolSummaryViewer

**Store selectors (L18-31):** Idênticos ao desktop:
```ts
storeResultado, limites, parametros, ferramenta, safetyFactor,
baseRPM, baseFeed, manualOverrides, tipoOperacao,
setManualRPMPercent, setManualFeedPercent,
historyEntries, toggleFavorite
```

**Estrutura atual (L38-278):**
```
L40:      ToolSummaryViewer
L42-88:   Estado vazio (sem resultado + sem histórico)
L90-108:  SafetyBadge + Botão ★ favoritar
L110-130: 2× BigNumber (RPM + Avanço) com BidirectionalSlider
L132-150: 4× ProgressCard (Potência, Vc Real, Torque, MRR) — grid 2×2
L152-170: 3× HalfMoonGauge (horizontal scroll, snap-x, size="sm")
L172-195: Dados secundários (MetricCell) — grid 2×2
L197-278: FormulaCards educacionais
```

### Rota e Navegação

```tsx
// src/main.tsx:42
<Route path="/mobile" element={<MobilePage />} />
```
- `MobilePage` renderiza: MobileHeader + MobileStickyActions + MobileConfigSection + MobileResultsSection + MobileFineTuneSection
- Rota separada `/mobile` — não é o App.tsx

---

## Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/components/mobile/mobile-results-section.tsx` | Refatorar — replicar estrutura grid do desktop (SPEC-VISOR) | L38-278 (todo o JSX) |

### Sequência de Execução

1. **Esperar ITEM-1 (visor desktop) estar finalizado** — a estrutura desktop define o modelo a replicar
2. **Mapear estrutura final do desktop** — 5 linhas + cabeçalho (conforme SPEC-VISOR-RESULTS-PANEL-v1.md):
   ```
   CABEÇALHO: data/hora + material + operação + SafetyBadge + botão ★
   LINHA 1: Ferramenta (full-width)
   LINHA 2: RPM + Avanço (2 caixas grandes)
   LINHA 3: Vc, fz, ap, ae (4 caixas iguais)
   LINHA 4: Fator Correção + 3 Gauges
   LINHA 5: Potência + Torque + Vc Real + L/D + CTF
   ```
3. **Replicar no mobile** com adaptações:
   - Tipografia: `text-2xl`/`text-3xl` (vs `text-3xl`/`text-4xl` desktop)
   - Padding: `p-2`/`p-3` (vs `p-4` desktop)
   - Grid: colunas adaptadas (ex: LINHA 3 pode ser grid 2×2 em vez de 4 colunas)
   - LINHA 5: grid 2×2 ou stack vertical em vez de 5 colunas
4. **Manter** HalfMoonGauge `size="sm"` (160×80) — já configurado
5. **Manter** SegmentedGradientBar `segments={30}` no fine-tune mobile — já configurado
6. **Integrar botão Editar Ferramenta** (de ITEM-2) na seção ferramenta
7. **Manter** horizontal scroll para gauges (`snap-x snap-mandatory`) — funciona bem em touch
8. **Verificar scroll vertical** — conteúdo completo deve ser acessível sem cortes

### Dependências

- **Depende de:** ITEM-1 (visor desktop — define a estrutura a replicar), ITEM-2 (botão editar ferramenta)
- **Bloqueia:** ITEM-9 (cassino — precisa da estrutura mobile estável)

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| Desktop usa 5 colunas na LINHA 5 — não cabe em tela mobile (375px) | Usar grid 2×2 ou stack vertical no mobile |
| LINHA 3 com 4 colunas pode ficar apertada em telas < 375px | Grid 2×2 em mobile para Vc/fz/ap/ae |
| FormulaCards ocupam muito espaço vertical no mobile | Manter colapsáveis (padrão atual) |
| Botão Editar Ferramenta vem de ITEM-2 — modal pode não funcionar bem em mobile | Verificar se `ToolEditModal` tem overlay mobile-friendly |

### Critérios de Aceitação

- Estrutura espelha desktop (mesma ordem de dados, mesmas zonas)
- Adaptações mobile: tipografia reduzida, padding menor, grids adaptados
- Gauges `size="sm"` (160×80) funcionais
- Scroll suave sem conteúdo cortado
- Botão Editar Ferramenta integrado (de ITEM-2)
- Estado vazio com placeholder (mesma lógica do desktop)
- Dados numéricos corretos e formatados (mesmo `fmt()` helper)

### Testes

| Teste | Descrição |
|-------|-----------|
| `renders all zones with complete resultado` | Cabeçalho + 5 linhas presentes |
| `renders empty state when resultado is null` | Placeholder "Clique em Simular" |
| `gauges use size sm` | `size="sm"` verificado no DOM |
| `data values match desktop` | Mesmos cálculos, mesmas fontes de dados |
| `responsive at 375px viewport` | Nenhum overflow horizontal |
| `responsive at 414px viewport` | Layout sem quebras |
| `favorite button works` | Toggle star funcional |
| `edit tool button visible` | Botão ✏️ presente na seção ferramenta |

---

## Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Mapear estrutura desktop final | 1 |
| Refatorar JSX mobile (5 linhas + cabeçalho) | 4 |
| Adaptar grids e tipografia | 2 |
| Integrar botão Editar (de ITEM-2) | 1 |
| Testes (8 casos) | 2 |
| **Total** | **10 pontos (~1 sessão)** |

---

## Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando
npm run build       # Build sem erros
# Verificar manualmente em viewport 375px e 414px
```

---

## REFINAMENTO FINAL (31/03/2026)

### Sem Decisões Pendentes
Depende de ITEM-1 (desktop) estar concluído. Ao implementar, ler a versão final de `results-panel.tsx` e replicar com as adaptações abaixo.

### Adaptações Mobile vs Desktop

| Elemento | Desktop | Mobile |
|----------|---------|--------|
| Tipografia zona primária | `text-3xl`/`text-4xl` | `text-2xl`/`text-3xl` |
| Tipografia zona secundária | `text-lg`/`text-xl` | `text-base`/`text-lg` |
| Padding caixas | `p-3`/`p-4` | `p-2` |
| LINHA 3 (vc/fz/ap/ae) | `grid-cols-4` | `grid-cols-2` (2×2) |
| LINHA 5 (dados secundários) | `grid 5 colunas` | `grid-cols-2` + L/D e CTF juntos |
| Gauges | `size="md"` (240×120) | `size="sm"` (160×80) |
| Scroll gauges | nenhum | `overflow-x-auto snap-x snap-mandatory` |

### Código Proposto — Estrutura Geral (Depois)

```tsx
// src/components/mobile/mobile-results-section.tsx
// Importar MATERIAIS, TipoUsinagem — mesmo padrão do ResultsPanel
// Adicionar selector materialId ao store

export function MobileResultsSection() {
  // ... selectors idênticos ao ResultsPanel ...
  const materialId = useMachiningStore((s) => s.materialId);

  const [calcTimestamp, setCalcTimestamp] = useState('');
  useEffect(() => {
    if (storeResultado !== null) {
      setCalcTimestamp(new Date().toLocaleString('pt-BR', { ... }));
    }
  }, [storeResultado]);

  if (storeResultado === null) {
    return <div className="...placeholder..." />;  // mesmo do desktop
  }

  return (
    <div className="flex flex-col gap-2 p-2">

      {/* CABEÇALHO — idêntico ao desktop, fonte menor */}
      <div className="flex items-center justify-between px-2 py-1 bg-white/[0.03]
                      rounded-xl border border-white/8 text-[11px]">
        <span className="font-mono text-gray-400 truncate">
          {calcTimestamp} · {material?.nome} · {TIPO_LABEL[tipoOperacao]}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <SafetyBadge nivel={seguranca.nivel} avisosCount={seguranca.avisos.length} />
          {latestEntry && <button onClick={...}>★</button>}
        </div>
      </div>

      {/* LINHA 1 — Ferramenta */}
      <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-2">
        <div className="text-[10px] text-white/70 uppercase tracking-wider mb-0.5">Ferramenta</div>
        <div className="font-mono text-lg text-white">{ferramentaLabel}</div>
      </div>

      {/* LINHA 2 — RPM + Avanço */}
      <div className="grid grid-cols-2 gap-2">
        <BigNumber ... />  {/* tamanhos já menores em mobile */}
        <BigNumber ... />
      </div>

      {/* LINHA 3 — vc/fz/ap/ae em 2×2 */}
      <div className="grid grid-cols-2 gap-1.5">
        {[...].map(({ key, label, unit, val }) => (
          <div key={key} className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-1.5">
            <div className="text-[10px] text-white/70 mb-0.5">{label}</div>
            <div className="font-mono text-base text-white/85">
              {val} <span className="text-[10px] text-white/50">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* LINHA 4 — Fat.Correção + 3 Gauges (scroll horizontal) */}
      <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-1">
        <div className="snap-start shrink-0 w-20 bg-[rgba(45,55,70,0.90)]
                        border border-white/15 rounded-md p-2 flex flex-col justify-center">
          <div className="text-[10px] text-white/70 mb-0.5">Correção</div>
          <div className="font-mono text-base text-white/85">{Math.round(safetyFactor * 100)}%</div>
        </div>
        <div className="snap-start shrink-0"><HalfMoonGauge size="sm" ... /></div>
        <div className="snap-start shrink-0"><HalfMoonGauge size="sm" ... /></div>
        <div className="snap-start shrink-0"><HalfMoonGauge size="sm" ... /></div>
      </div>

      {/* LINHA 5 — dados secundários em 2×2 + L/D + CTF inline */}
      <div className="grid grid-cols-2 gap-1.5">
        <ProgressCard label="Potência" value={...} unit="kW" ... compact />
        <ProgressCard label="Torque"   value={...} unit="Nm" ... compact />
        <ProgressCard label="Vc Real"  value={...} unit="m/min" ... compact />
        <div className="flex gap-1.5">
          <LdCell razao={seguranca.razaoLD} />   {/* componente criado no ITEM-1 */}
          <div className="flex-1 bg-[rgba(45,55,70,0.90)] ...">
            <div className="text-[10px] text-white/70">CTF</div>
            <div className="font-mono text-sm">{seguranca.ctf.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <WarningsSection avisos={seguranca.avisos} />
    </div>
  );
}
```

### Testes — Nomes Exatos (describe/it)

```ts
describe('MobileResultsSection', () => {
  it('renders placeholder when resultado is null', ...)
  it('renders cabeçalho with material, operação and timestamp', ...)
  it('renders linha 1 with ferramenta label', ...)
  it('renders linha 3 as 2x2 grid (4 parametros)', ...)
  it('renders gauges with size sm', ...)
  it('renders all data values matching desktop equivalents', ...)
  it('favorite button calls toggleFavorite', ...)
  it('edit tool button visible in ferramenta section', ...)
})
```
