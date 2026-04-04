# AUDITORIA E PLANO DE CORREÇÕES — Implementações Dashboard 30/03
> **Documento gerado em:** 01/04/2026 — Sessão de curadoria técnica
> **Lido por:** Claude Code (IA) — otimizado para leitura de máquina
> **Propósito:** Guia autoritativo de TODAS as correções, inconsistências e lacunas identificadas nos 10 documentos de implementação antes de qualquer codificação

---

## INSTRUÇÕES CRÍTICAS PARA O PRÓXIMO ASSISTENTE

### O que fazer nesta sessão
1. **Ler ESTE documento do início ao fim antes de qualquer outra ação**
2. **NÃO ler os outros documentos ainda** — este documento já contém todos os problemas e soluções mapeadas
3. **Corrigir os documentos UM POR UM** na ordem da tabela de prioridades abaixo
4. **Para cada documento:** ler o original → aplicar as correções descritas aqui → mostrar ao Rafael → aguardar aprovação → próximo
5. **Só ler o documento original quando for corrigi-lo** — evita desperdício de contexto
6. **NÃO implementar código** — esta sessão é exclusivamente de correção documental

### Regras desta sessão (definidas com Rafael em 01/04/2026)
- Correções aplicadas **uma por vez**, mostrando o que foi feito, aguardando aprovação
- Antes de corrigir cada doc: anunciar qual será o próximo
- Apenas um doc em progresso por vez
- Após todos os docs corrigidos: commit único `docs: audit corrections — all 10 implementation plans finalized`

---

## ORDEM DE CORREÇÃO (prioridade por criticidade + dependências)

| Ordem | Documento | Críticos 🔴 | Inconsistências 🟡 | Lacunas 🔵 | Pts |
|-------|-----------|------------|-------------------|------------|-----|
| **1ª** | `SPEC-VISOR-RESULTS-PANEL-v1.md` | 6 | 1 | 3 | 16 |
| **2ª** | `ITEM-8-VISOR-MOBILE-REPLICA.md` | 4 | 1 | 1 | 10 |
| **3ª** | `ITEM-9-SIMULACAO-ESTILO-CASSINO.md` | 3 | 3 | 1 | 24 |
| **4ª** | `ITEM-6-SGB-ACIMA-SLIDER.md` | 1 | 0 | 1 | 4 |
| **5ª** | `ITEM-7-BOTAO-EXPLICACAO-POPOVER.md` | 1 | 2 | 1 | 8 |
| **6ª** | `ITEM-10-FAVORITOS-STORE.md` | 1 | 1 | 1 | 14 |
| **7ª** | `ITEM-11-ZONA-VERDE-DINAMICA-SGB.md` | 2 | 0 | 1 | 10 |
| **8ª** | `ITEM-2-BOTAO-EDITAR-FERRAMENTA.md` | 0 | 1 | 1 | 10 |
| **9ª** | `ITEM-12-PAGINA-FAVORITOS.md` | 0 | 2 | 2 | 15 |
| **10ª** | `ITEM-5-FATOR-CORRECAO-SLIDER.md` | 0 | 1 | 1 | 8 |

> **TOTAL:** 119 pontos — ~10 a 12 sessões de implementação após correção dos docs

---

## DETALHAMENTO COMPLETO POR DOCUMENTO

---

### 1ª — SPEC-VISOR-RESULTS-PANEL-v1.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/SPEC-VISOR-RESULTS-PANEL-v1.md`
**Seção a modificar:** `16. REFINAMENTO FINAL` — adicionar bloco `CORREÇÕES DE AUDITORIA`

#### 🔴 CRÍTICO 1 — Path errado do store
**Onde:** Seção 3 "Onde o Visor Fica no Sistema"
**Errado:** `src/stores/machining-store.ts` (plural)
**Correto:** `src/store/machining-store.ts` (singular — convenção do projeto)
**Ação:** Substituir a string.

#### 🔴 CRÍTICO 2 — Campo `maxAvanco` inexistente
**Onde:** Seção "LINHA 4" no código proposto — `<HalfMoonGauge value={avanco} maxValue={limites.maxAvanco}>`
**Problema:** `LimitesMaquina` não tem campo `maxAvanco`. O campo correto é `maxFeed`.
**Correto:**
```tsx
<HalfMoonGauge value={avanco} maxValue={limites.maxFeed}
  label="Eficiência de Avanço" palette="avanco" />
```
**Ação:** Substituir `limites.maxAvanco` por `limites.maxFeed` no snippet proposto.

#### 🔴 CRÍTICO 3 — `mrrPct` nunca definida
**Onde:** Código proposto LINHA 4 — `<HalfMoonGauge value={mrrPct} maxValue={100} label="Produtividade MRR">`
**Problema:** `mrrPct` é usada mas nunca calculada no snippet. O implementador ficará com erro de TypeScript.
**Correto:** Adicionar antes do `return` no snippet:
```tsx
// MRR_BENCHMARKS já existe no arquivo (L307 atual)
const mrrPct = Math.min((mrr / MRR_BENCHMARKS[tipoOperacao]) * 100, 100);
```
**Ação:** Adicionar essa linha ao snippet proposto, logo após o destructuring de `resultado`.

#### 🔴 CRÍTICO 4 — `resultado` undefined no snippet (só existe `storeResultado`)
**Onde:** Código proposto — `const { rpm, avanco, potenciaMotor, torque, mrr, vcReal, seguranca } = resultado;`
**Problema:** No store selector, o dado é nomeado `storeResultado`. O snippet usa `resultado` sem defini-lo.
**Correto:** Adicionar após o guard de null:
```tsx
if (storeResultado === null) { return <placeholder /> }
const resultado = storeResultado; // alias local para o destructuring abaixo
const { rpm, avanco, potenciaMotor, torque, mrr, vcReal, seguranca } = resultado;
```
**Ação:** Adicionar a linha `const resultado = storeResultado;` no snippet.

#### 🔴 CRÍTICO 5 — Variáveis usadas mas não definidas no snippet
**Onde:** Código proposto — uso de `pulseClass`, `rpmPct`, `feedPct`, `powerPct`, `torquePct`, `isFavorited`, `latestEntry`
**Problema:** Implementador não consegue compilar sem essas definições.
**Correto:** Adicionar bloco de definições ao snippet, logo após selectors:
```tsx
// — Variáveis derivadas —
const latestEntry = historyEntries[0] ?? null;
const isFavorited = latestEntry?.favorited ?? false;
const pulseClass = triggerPulse ? 'animate-[subtlePulse_0.5s_ease-in-out]' : '';

// Percentuais para progress bars
const rpmPct   = Math.min((rpm   / limites.maxRPM)    * 100, 100);
const feedPct  = Math.min((avanco / limites.maxFeed)   * 100, 100);
const powerPct = Math.min((potenciaMotor / limites.maxPower) * 100, 100);
const torquePct = Math.min((torque / limites.maxTorque) * 100, 100);
```
**Nota:** `triggerPulse` vem de `useSimulationAnimation()` — verificar se o hook já é importado em `results-panel.tsx`. Se não, não incluir `pulseClass` por ora e usar string vazia.
**Ação:** Adicionar bloco acima ao snippet.

#### 🔴 CRÍTICO 6 — `setManualRPMPercent` e `setManualFeedPercent` ausentes dos selectors
**Onde:** Código proposto — `BigNumber` recebe `onPercentChange={setManualRPMPercent}`
**Problema:** Essas funções não aparecem na lista de selectors do snippet, causando erro TS.
**Correto:** Adicionar aos selectors:
```tsx
const setManualRPMPercent  = useMachiningStore((s) => s.setManualRPMPercent);
const setManualFeedPercent = useMachiningStore((s) => s.setManualFeedPercent);
const materialId           = useMachiningStore((s) => s.materialId);  // já listado, confirmar
```
**Ação:** Adicionar essas linhas à seção de selectors do snippet.

#### 🟡 INCONSISTÊNCIA 1 — Numeração dos 20 dados (item 16 duplicado)
**Onde:** Seção 8 "Estrutura e Ordem dos Dados"
**Problema:** Item 16 (Badge de segurança) aparece no CABEÇALHO. A LINHA 5 lista itens 15, 17, 18, 19, 20 — item 16 sumiu da sequência.
**Correto:** O badge de segurança é item 16 no cabeçalho. A LINHA 5 deve ser renumerada como 15, 17, 18, 19, 20 — OK como está, mas adicionar nota explicando que o 16 está no cabeçalho propositalmente.
**Ação:** Adicionar nota ao cabeçalho da seção 8: _"Nota: item #16 está no CABEÇALHO (badge de segurança), não na LINHA 5."_

#### 🔵 LACUNA 1 — Palettes válidas do `HalfMoonGauge` não documentadas
**Onde:** Mapeamento técnico e código proposto — `palette="avanco"`, `palette="mrr"`, `palette="health"`
**Problema:** Implementador não sabe quais valores são aceitos.
**Correto:** Verificar `src/components/half-moon-gauge.tsx` e documentar. Com base no mapeamento: as palettes correspondem às 41 barras com gradiente de cor configurado no componente. Os valores usados no código existente devem ser mantidos.
**Ação:** Adicionar ao mapeamento técnico: _"Palettes aceitas: verificar type `palette` em `half-moon-gauge.tsx` — usar os valores já presentes no ResultsPanel atual."_

#### 🔵 LACUNA 2 — `ToolSummaryViewer` sendo removido: verificar outros consumidores
**Onde:** Seção 13 "Plano de Implementação" — decisão de remover `ToolSummaryViewer`
**Problema:** Diz "verificar se só é usado em results-panel.tsx" mas não documenta o resultado.
**Correto:** Adicionar comando de verificação com resultado esperado:
```bash
grep -r "ToolSummaryViewer" src/ --include="*.tsx"
# Se só aparecer em results-panel.tsx → remover com segurança
# Se aparecer em outros → manter importado mas não renderizar no grid
```
**Ação:** Adicionar esse bloco ao plano de implementação.

#### 🔵 LACUNA 3 — Contradição nos imports de `FormulaCard`/`Fraction`
**Onde:** Seção `REFINAMENTO FINAL` — imports:
_"REMOVER: FormulaCard, Fraction (movidos para seção abaixo do grid — imports mantidos)"_
**Problema:** Diz REMOVER e MANTER na mesma linha — confuso.
**Correto:** Clarificar:
```
// FormulaCard e Fraction: NÃO remover do import — componentes permanecem
// abaixo do grid (seção colapsável existente), apenas saem da ZONA PRIMÁRIA do grid.
// O import continua necessário.
```
**Ação:** Substituir a linha confusa pela clarificação acima.

---

### 2ª — ITEM-8-VISOR-MOBILE-REPLICA.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/ITEM-8-VISOR-MOBILE-REPLICA.md`
**Seção a modificar:** Criar bloco `CORREÇÕES DE AUDITORIA` no final do `REFINAMENTO FINAL`

#### 🔴 CRÍTICO 1 — `limites.maxAvanco` inexistente (mesmo erro SPEC-VISOR)
**Onde:** Código proposto LINHA 4 — gauge de Eficiência de Avanço
**Correto:** `limites.maxFeed` (igual à correção do SPEC-VISOR)
**Ação:** Substituir no snippet mobile.

#### 🔴 CRÍTICO 2 — `LdCell` usada mas sem origem definida
**Onde:** Código proposto LINHA 5 — `<LdCell razao={seguranca.razaoLD} />`
**Problema:** `LdCell` é um componente inline definido DENTRO de `results-panel.tsx`. No mobile, não existe essa função.
**Decisão tomada:** Duplicar a função `LdCell` no arquivo mobile (mesmo padrão — componente local, não exportado):
```tsx
// No final de mobile-results-section.tsx (antes do export):
function LdCell({ razao }: { razao: number }) {
  const color =
    razao <= 3 ? '#2ecc71' :
    razao <= 4 ? '#f39c12' :
    razao <= 6 ? '#e74c3c' : '#e74c3c';
  const label = razao > 6 ? 'BLOQ.' : razao.toFixed(1);
  return (
    <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-1.5">
      <div className="text-[10px] text-white/70 mb-0.5">L/D</div>
      <div className="font-mono text-sm font-bold" style={{ color }}>{label}</div>
    </div>
  );
}
```
**Ação:** Adicionar essa função ao snippets e à lista de arquivos modificados.

#### 🔴 CRÍTICO 3 — `ferramentaLabel` usado mas nunca definido no mobile
**Onde:** Código proposto LINHA 1 — `<div className="font-mono text-lg text-white">{ferramentaLabel}</div>`
**Problema:** `ferramentaLabel` está definido no SPEC-VISOR mas não no snippet mobile.
**Correto:** Adicionar ao início do componente mobile (após os selectors):
```tsx
const ferramentaLabel = [
  ferramenta.tipo.charAt(0).toUpperCase() + ferramenta.tipo.slice(1),
  `Ø${ferramenta.diametro}`,
  ferramenta.raioQuina != null ? `R${ferramenta.raioQuina}` : null,
  `H${ferramenta.balanco}`,
  `F${ferramenta.numeroArestas}`,
].filter(Boolean).join(' ');
```
**Ação:** Adicionar ao snippet.

#### 🔴 CRÍTICO 4 — `latestEntry` e `isFavorited` não definidos
**Onde:** Código proposto CABEÇALHO — `{latestEntry && <button onClick={...}>★</button>}`
**Correto:** Adicionar ao início do componente (após selectors):
```tsx
const latestEntry  = historyEntries[0] ?? null;
const isFavorited  = latestEntry?.favorited ?? false;
```
**Ação:** Adicionar ao snippet.

#### 🟡 INCONSISTÊNCIA 1 — Imports necessários não listados
**Onde:** Seção `REFINAMENTO FINAL` — ausência de imports adicionais
**Missing:**
```tsx
import { MATERIAIS } from '@/data';           // para material.nome no cabeçalho
// TIPO_LABEL definido inline (mesmo padrão do ResultsPanel)
// useState, useEffect — para calcTimestamp (igual ao desktop)
```
**Ação:** Adicionar bloco de imports ao documento.

#### 🔵 LACUNA 1 — `storeResultado` vs `resultado`: mesmo padrão do SPEC-VISOR
**Onde:** Código proposto — destructuring
**Correto:** Aplicar mesmo padrão: `const resultado = storeResultado!` após guard de null.
**Ação:** Adicionar ao snippet mobile.

---

### 3ª — ITEM-9-SIMULACAO-ESTILO-CASSINO.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/ITEM-9-SIMULACAO-ESTILO-CASSINO.md`
**Seção a modificar:** Adicionar seção `CORREÇÕES DE AUDITORIA` no final do `REFINAMENTO FINAL`

#### 🔴 CRÍTICO 1 — `gaugeTarget` não é prop do `HalfMoonGauge`
**Onde:** Hook retorna `gaugeTarget` mas `HalfMoonGauge` tem props `{ value, maxValue, label?, palette?, badge?, size? }` — sem `gaugeTarget`
**Problema:** O hook expõe `gaugeTarget` mas os gauges não o consomem. Como a animação progressiva chega ao componente?
**Decisão:** `gaugeTarget` controla quando os gauges devem animar internamente. A abordagem correta:
- Gauge usa `gaugeAnimating` (já existe no hook) para saber se deve animar
- O `value` real já está no store após `originalSimular()` (t=1500ms)
- Antes de t=1500ms, gauge anima de 0 → valor destino usando `requestAnimationFrame` interno
- Nova prop necessária: `animateOnMount?: boolean` no `HalfMoonGauge`
- Quando `gaugeAnimating === true`, gauge ignora `value` prop e usa rAF interno para subir de 0 ao `value`
- Quando `gaugeAnimating === false`, gauge exibe `value` estático

**Ação:** Documentar a prop `animateOnMount` no mapeamento do `HalfMoonGauge` e remover `gaugeTarget` do retorno do hook (ou manter como `boolean` em vez de `number`).

#### 🔴 CRÍTICO 2 — `BigNumber` e `ProgressCard` precisam de estado idle não especificado
**Onde:** Fase 1 "Mesa Vazia" — `Result cards: "—" com opacity: 0.3`
**Problema:** `BigNumber` e `ProgressCard` não têm props para estado idle. O `value` prop é `string` — pode-se passar `"—"` mas `opacity: 0.3` requer prop adicional.
**Decisão:** Abordagem mais simples — NÃO modificar BigNumber/ProgressCard. Em vez disso:
- Na Fase 1 (antes de qualquer simulação, `storeResultado === null`): o `ResultsPanel` já mostra o placeholder (não mostra os cards)
- Fase 1 ocorre naturalmente — não requer estado novo nos cards
- A animação cassino entra apenas quando `storeResultado !== null` (após primeira simulação)
- O estado "mesa vazia" é o próprio placeholder de `storeResultado === null`

**Ação:** Clarificar no documento que "Mesa Vazia" = estado de `resultado === null` do ResultsPanel existente. Remover referências a `opacity: 0.3` nos cards (não implementar).

#### 🔴 CRÍTICO 3 — Easing `easeOutBack` muta parâmetro com `--t`
**Onde:** Refinamento final — fórmula: `(t: number) => 1 + (--t) * t * (2.70158 * t + 1.70158)`
**Problema:** `--t` modifica `t` in-place. Em JavaScript, isso funciona mas é side-effect e viola immutability esperada em funções puras.
**Correto:**
```ts
const easeOutBack = (t: number): number => {
  const s = t - 1;
  return 1 + s * s * (2.70158 * s + 1.70158);
};
```
**Ação:** Substituir a fórmula no documento.

#### 🟡 INCONSISTÊNCIA 1 — Partículas CSS-only decididas mas sem CSS proposto
**Onde:** Refinamento final — "CSS-only — partículas via `::before`/pseudo-elements"
**Problema:** Nenhum keyframe ou CSS foi fornecido. Implementador precisará inventar.
**Correto:** Adicionar CSS concreto para as partículas:
```css
/* Partículas neon — 3 pseudo-elements em posições diferentes */
.particle-field::before,
.particle-field::after {
  content: '';
  position: absolute;
  width: 2px; height: 2px;
  border-radius: 50%;
  background: #00D9FF;
  animation: particleRise 2s ease-in infinite;
}
.particle-field::before { left: 20%; animation-delay: 0.3s; background: #39FF14; }
.particle-field::after  { left: 70%; animation-delay: 0.8s; }

@keyframes particleRise {
  0%   { opacity: 0; transform: translateY(0) scale(0.5); }
  20%  { opacity: 0.8; }
  100% { opacity: 0; transform: translateY(-80px) scale(1.5); }
}
```
**Nota:** Efeito sutil — se parecer fraco, remover. Não é essencial para a UX.
**Ação:** Adicionar CSS proposto ao documento e ao bloco de keyframes em `index.css`.

#### 🟡 INCONSISTÊNCIA 2 — `ambientOverlay`: posição no DOM não especificada
**Onde:** Fase 3 "Cálculo" — `ambientOverlay: glow radial no fundo pulsa via animation: ambientPulse`
**Problema:** Onde esse elemento fica? No `ConfigPanel`? No `App`? Antes do grid?
**Decisão:** Colocar dentro do `ConfigPanel`, como `div` absolute com `pointer-events: none`:
```tsx
{/* Dentro do ConfigPanel, no root do return, antes do restante do JSX */}
{isCalculating && (
  <div
    className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
    style={{
      background: 'radial-gradient(ellipse at center, rgba(0,217,255,0.04) 0%, transparent 70%)',
      animation: 'ambientPulse 1.5s ease-in-out infinite',
    }}
  />
)}
```
**Ação:** Adicionar localização e snippet ao documento.

#### 🟡 INCONSISTÊNCIA 3 — Timing discrepante: interval começa em t≈80ms, comentário diz t=200ms
**Onde:** Código proposto do hook — o `setInterval` começa logo após `setTimeout(80)`, mas a tabela de timeline diz "200ms: Contadores dos result cards começam"
**Explicação:** O interval (que atualiza `calcProgress`) começa em t≈80ms, não t=200ms. A tabela de timeline na seção "Fluxo runSimulation" está desatualizada.
**Correto:** Atualizar a tabela:
```
t=0:    setIsCalculating(true), setCalcProgress(0), setGaugeAnimating(true)
t=80ms: setGaugeTarget(1) — gauges iniciam animação
t=80ms: setInterval inicia — calcProgress sobe 0→98 até t=1500ms
t=1500ms: clearInterval, originalSimular(), setCalcProgress(100)
t=1750ms: setIsCalculating(false), setIsRevealing(true), setTriggerPulse(true)
t=2300ms: setIsRevealing(false), setTriggerPulse(false), setCalcProgress(0)
t=2650ms: setGaugeAnimating(false), setGaugeTarget(0)
```
**Ação:** Substituir a tabela de timeline pela versão corrigida.

#### 🔵 LACUNA 1 — Documento de 24pts: sub-sessões não detalhadas
**Onde:** Estimativa de complexidade
**Correto:** Adicionar ao final:
```
## Sub-sessões recomendadas (3 sessões)
Sessão A (~8 pts): Keyframes CSS + hook reescrito + botão desktop
Sessão B (~8 pts): Botão mobile + HalfMoonGauge animação rAF
Sessão C (~8 pts): Fase 4 reveal + contadores BigNumber + cleanup + testes
```
**Ação:** Adicionar bloco ao final do documento.

---

### 4ª — ITEM-6-SGB-ACIMA-SLIDER.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/ITEM-6-SGB-ACIMA-SLIDER.md`
**Seção a modificar:** `REFINAMENTO FINAL` — adicionar bloco `CORREÇÕES DE AUDITORIA`

#### 🔴 CRÍTICO 1 — Referencia `StyledSlider` no desktop, mas pós-v0.10.0 é `BidirectionalSlider`
**Contexto:** Sessão S4 (commit `d18d92b`, 29/03/2026) migrou `StyledSlider` → `BidirectionalSlider` no fine-tune panel desktop.
**Onde:** Mapeamento técnico — `StyledSlider` | `src/components/styled-slider.tsx` | `—` | Slider usado no fine-tune
**Também:** Snippet "Depois" usa `<StyledSlider ...>` — incorreto.
**Correto:** Substituir todas as referências a `StyledSlider` no fine-tune desktop por `BidirectionalSlider`.
**Novo snippet "DEPOIS" do desktop:**
```tsx
// DEPOIS — mover SegmentedGradientBar para ANTES do BidirectionalSlider:
<div key={key} className="flex flex-col gap-1 group relative">
  {/* Header (label clicável + valor editável) — inalterado */}
  <div className="flex justify-between items-end"> ... </div>

  {/* SGB acima do slider ← NOVO LOCAL */}
  <SegmentedGradientBar paramKey={key} />

  {/* BidirectionalSlider — agora abaixo do SGB */}
  <BidirectionalSlider
    value={val} min={min} max={max} step={step}
    color={color} label={label}
    recomendado={recomendado}
    onChange={(v) => ajustarParametros({ [key]: v })}
  />

  {/* Educational drawer — inalterado (será removido pelo ITEM-7) */}
  {isOpen && ( ... )}
</div>
```
**Ação:** Atualizar mapeamento e snippet.

#### 🔵 LACUNA 1 — Alinhamento SGB vs slider: solução não concreta
**Onde:** Edge Cases — "Verificar se SGB precisa de `mx-[18px]` matching"
**Correto:** Adicionar como ação explícita na sequência:
```
4. Verificar alinhamento: se o SGB não alinhar com o slider, adicionar
   className="mx-[18px]" no <SegmentedGradientBar> (mesmo margin do slider).
   O slider usa mx-[18px] internamente (MEMORY.md: "Track margin: mx-[18px]").
```
**Ação:** Adicionar à sequência de execução.

---

### 5ª — ITEM-7-BOTAO-EXPLICACAO-POPOVER.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/ITEM-7-BOTAO-EXPLICACAO-POPOVER.md`
**Seção a modificar:** `REFINAMENTO FINAL` — adicionar bloco `CORREÇÕES DE AUDITORIA`

#### 🔴 CRÍTICO 1 — Fine-tune usa `BidirectionalSlider` não `StyledSlider` pós-S4
**Onde:** Seção "Estado Atual" — `StyledSlider (L126)` como ponto de inserção
**Correto:** O slider é `BidirectionalSlider`. A linha de referência pode ter mudado com S4/S5/S6.
**Ação:** Atualizar referência e adicionar nota: _"Verificar linha atual com `grep -n 'BidirectionalSlider' src/components/fine-tune-panel.tsx`"_

#### 🟡 INCONSISTÊNCIA 1 — Nome do arquivo em PascalCase na tabela
**Onde:** Tabela "Arquivos a Criar/Modificar" — `src/components/ParamExplanation.tsx`
**Correto:** Convenção do projeto é kebab-case: `src/components/param-explanation.tsx`
**Ação:** Corrigir na tabela e em todas as referências ao arquivo.

#### 🟡 INCONSISTÊNCIA 2 — `<button role="button">` redundante
**Onde:** Código proposto `param-explanation.tsx` — `<button role="button" aria-label=...>`
**Correto:** `role="button"` é semântica redundante em elemento `<button>` nativo. Remover o atributo `role`.
**Correto:**
```tsx
<button
  aria-label={`O que é ${fullLabel}?`}
  onMouseEnter={handleMouseEnter}
  ...
```
**Ação:** Remover `role="button"` do snippet.

#### 🔵 LACUNA 1 — `openKey` state e `toggleDrawer`: localização exata não especificada
**Onde:** Sequência item 3 — "REMOVER: toggleDrawer function e openKey state"
**Problema:** Implementador não sabe se são state local ou store.
**Correto:** Adicionar nota:
```
// openKey e toggleDrawer são state/function LOCAL no FineTunePanel:
// const [openKey, setOpenKey] = useState<string | null>(null);
// const toggleDrawer = (key: string) => setOpenKey(prev => prev === key ? null : key);
// Remover AMBAS as declarações e todas as referências (isOpen, toggleDrawer calls).
// Verificar com: grep -n "openKey\|toggleDrawer\|isOpen" src/components/fine-tune-panel.tsx
```
**Ação:** Adicionar nota ao passo 3 da sequência.

---

### 6ª — ITEM-10-FAVORITOS-STORE.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/ITEM-10-FAVORITOS-STORE.md`
**Seção a modificar:** Criar seção `REFINAMENTO FINAL` (documento não tinha — estava como Pendente)

#### 🔴 CRÍTICO 1 — Edição de favorito: funções do engine não especificadas
**Onde:** Sequência item 6 — "recalcular resultado via `calcular()` do engine"
**Problema:** `calcular()` é action do store Zustand que usa o estado atual — não aceita parâmetros externos. Para recalcular com dados do favorito, precisa das funções puras do engine.
**Correto:** Adicionar ao documento:
```ts
// Para recalcular resultado de um favorito editado, importar funções puras:
import { calcularResultado } from '@/engine/index';
// Uso no updateFavorite com recálculo:
const novoResultado = calcularResultado({
  parametros:    novosFavorito.parametros,
  ferramenta:    novosFavorito.ferramenta,
  material:      MATERIAIS.find(m => m.id === fav.materialId)!,
  tipoOperacao:  fav.tipoOperacao,
  safetyFactor:  fav.safetyFactor,
  limitesMaquina: DEFAULT_LIMITES, // usar limites padrão
});
```
**Nota:** Verificar nome exato da função exportada: `grep -r "^export function\|^export const" src/engine/index.ts`
**Ação:** Adicionar bloco ao documento.

#### 🟡 INCONSISTÊNCIA 1 — `isFavorited` sem implementação clara
**Onde:** Interface `FavoritesActions` lista `isFavorited` mas implementação ausente
**Problema:** Como comparar parametros com float? Tolerância necessária?
**Decisão:** Simplificar — `isFavorited` compara apenas `(materialId, tipoOperacao, ferramenta.tipo)` sem comparar parametros. Se existe qualquer favorito para essa combinação, retorna `true`:
```ts
isFavorited: (materialId, tipoOperacao, ferramentaTipo) =>
  get().favorites.some(
    (f) => f.materialId === materialId &&
           f.tipoOperacao === tipoOperacao &&
           f.ferramenta.tipo === ferramentaTipo
  ),
```
**Ação:** Adicionar implementação ao documento.

#### 🔵 LACUNA 1 — Snippet do `addFavorite` com guard FIFO ausente
**Onde:** Sequência item 2 — "Limite FIFO: se `favorites.length >= 50`, remove o mais antigo"
**Correto:** Adicionar snippet concreto:
```ts
addFavorite: (data) => {
  const { favorites } = get();
  const newFav: FavoritoCompleto = {
    ...data,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    editedAt: null,
    userNote: '',
  };
  // FIFO: remover mais antigo se limite atingido
  const trimmed = favorites.length >= 50
    ? favorites.slice(1)  // remove o [0] (mais antigo, inserido primeiro)
    : favorites;
  set({ favorites: [...trimmed, newFav] });
},
```
**Ação:** Adicionar snippet ao documento.

---

### 7ª — ITEM-11-ZONA-VERDE-DINAMICA-SGB.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/ITEM-11-ZONA-VERDE-DINAMICA-SGB.md`
**Seção a modificar:** Criar seção `REFINAMENTO FINAL` (documento não tinha)

#### 🔴 CRÍTICO 1 — Zustand selector inconsistente com regra crítica do projeto
**Onde:** Seção "Cálculo da Zona Verde Dinâmica" — exemplo usa `useFavoritesStore.getByCombo(...)` inline
**Problema:** `getByCombo` retorna novo objeto a cada call → re-render infinito (MEMORY.md regra crítica).
**Correto — padrão obrigatório:**
```tsx
// ✅ CORRETO — selecionar array estável + computar com useMemo
const favorites = useFavoritesStore((s) => s.favorites);
const materialId   = useMachiningStore((s) => s.materialId);
const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);
const ferramenta   = useMachiningStore((s) => s.ferramenta);

const favorito = useMemo(
  () => favorites
    .filter(
      (f) => f.materialId === materialId &&
             f.tipoOperacao === tipoOperacao &&
             f.ferramenta.tipo === ferramenta.tipo
    )
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0],
  [favorites, materialId, tipoOperacao, ferramenta.tipo]
);

// ❌ ERRADO — causa infinite loop:
// const favorito = useFavoritesStore((s) => s.getByCombo(materialId, tipoOperacao, ferramenta.tipo));
```
**Ação:** Substituir o exemplo inline pelo padrão correto. Remover chamada direta a `getByCombo` do snippet do fine-tune-panel.

#### 🔴 CRÍTICO 2 — Visual da zona verde: sem snippet concreto do loop de segmentos
**Onde:** Sequência item 2 — "Para cada segmento verificar se está dentro do `idealRange`"
**Problema:** "borda superior verde OU overlay" — implementador não sabe qual escolher.
**Decisão:** Usar `opacity` aumentada no segmento + borda top verde sutil:
```tsx
// Dentro do loop de renderização de segmentos no SegBar:
const isInIdealZone = idealRange &&
  segPct >= idealRange.start &&
  segPct <= idealRange.end;

<div
  key={idx}
  style={{
    backgroundColor: segmentColor(idx, total),
    opacity: isInIdealZone ? 1.0 : 0.65,
    borderTop: isInIdealZone ? '2px solid rgba(0,230,118,0.7)' : '2px solid transparent',
    // height, width: inalterados
  }}
/>
```
**Onde `segPct = idx / total`** (mesmo cálculo usado em `segmentColor`).
**Ação:** Adicionar snippet concreto ao documento.

---

### 8ª — ITEM-2-BOTAO-EDITAR-FERRAMENTA.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/ITEM-2-BOTAO-EDITAR-FERRAMENTA.md`
**Status:** Bem refinado — apenas 2 ajustes menores

#### 🟡 INCONSISTÊNCIA 1 — Snippet mobile ausente
**Onde:** Sequência item 5 — "Replicar no mobile (mobile-config-section.tsx) — mesma lógica adaptada"
**Problema:** Sem código proposto para o mobile. Implementador precisará adaptar sem referência.
**Correto:** Adicionar ao refinamento final:
```tsx
// src/components/mobile/mobile-config-section.tsx
// Mesma estrutura do desktop, adaptada para mobile:
// 1. Adicionar state: const [editingTool, setEditingTool] = useState<SavedTool | null>(null);
// 2. Substituir a seção de ferramentas salvas por lista de cards (igual ao desktop)
// 3. Renderizar <ToolEditModal> quando editingTool !== null
// 4. Import: import { ToolEditModal } from '@/components/modals/tool-edit-modal';
// O modal já tem overlay fullscreen (fixed inset-0) — funciona bem em mobile.
```
**Ação:** Adicionar bloco ao refinamento final.

#### 🔵 LACUNA 1 — Validação de `raioQuina <= diametro/2` no save
**Onde:** `handleSave` no `tool-edit-modal.tsx` — só valida `diametro > 0` e `balanco > 0`
**Correto:** Adicionar validação de raio:
```tsx
const handleSave = () => {
  if (diametro <= 0 || balanco <= 0) return;
  if (tipo === 'toroidal' && raio > diametro / 2) return; // raio não pode exceder D/2
  onSave({ tipo, diametro, raioQuina: tipo === 'toroidal' ? raio : undefined,
           numeroArestas: arestas, balanco });
};
```
**Ação:** Atualizar `handleSave` no snippet do `tool-edit-modal.tsx`.

---

### 9ª — ITEM-12-PAGINA-FAVORITOS.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/ITEM-12-PAGINA-FAVORITOS.md`
**Seção a modificar:** Criar seção `REFINAMENTO FINAL` (documento não tinha)

#### 🟡 INCONSISTÊNCIA 1 — `window.confirm` difícil de testar
**Onde:** Ação "Remover" — "Confirmação simples (window.confirm ou mini-dialog)"
**Decisão:** Usar estado local para confirmação (testável):
```tsx
const [confirmingId, setConfirmingId] = useState<string | null>(null);

// No card, botão Remover:
{confirmingId === fav.id ? (
  <div className="flex gap-1">
    <button onClick={() => { removeFavorite(fav.id); setConfirmingId(null); }}
      className="text-xs text-red-400 border border-red-400/30 px-2 py-0.5 rounded">
      Confirmar
    </button>
    <button onClick={() => setConfirmingId(null)}
      className="text-xs text-gray-500 px-2 py-0.5">
      Cancelar
    </button>
  </div>
) : (
  <button onClick={() => setConfirmingId(fav.id)}>🗑️ Remover</button>
)}
```
**Ação:** Substituir `window.confirm` por estado local no documento.

#### 🟡 INCONSISTÊNCIA 2 — Dropdown de material sem deduplicação
**Onde:** Implementação filtros — `favorites.map(f => f.materialNome)` para popular o dropdown
**Problema:** Pode ter materiais duplicados no array.
**Correto:**
```tsx
const uniqueMaterials = [...new Set(favorites.map(f => f.materialNome))].sort();
```
**Ação:** Adicionar ao snippet de filtros.

#### 🔵 LACUNA 1 — `setFerramenta` assinatura não verificada
**Onde:** Ação "Usar" — `setFerramenta(favorito.ferramenta)`
**Nota de verificação:** Adicionar ao pré-implementação:
```bash
grep -A 2 "setFerramenta:" src/store/machining-store.ts
# Confirmar se aceita Ferramenta completo ou Partial<Ferramenta>
# O snapshot FavoritoCompleto.ferramenta é Ferramenta completo — deve funcionar
```
**Ação:** Adicionar checklist pré-implementação.

#### 🔵 LACUNA 2 — Funções do engine para recálculo na edição
**Onde:** Ação "Editar" — "importar funções de `@/engine/index`"
**Correto:** Adicionar verificação:
```bash
grep -n "^export" src/engine/index.ts
# Identificar a função principal de cálculo — provavelmente calcularResultado ou similar
```
**Ação:** Adicionar nota de verificação.

---

### 10ª — ITEM-5-FATOR-CORRECAO-SLIDER.md
**Path:** `docs/plans/Implementações ajustes Dashboard 30-03/ITEM-5-FATOR-CORRECAO-SLIDER.md`
**Status:** Mais completo — apenas 2 ajustes

#### 🟡 INCONSISTÊNCIA 1 — Floating-point na clampagem dos botões [-][+]
**Onde:** Código proposto — botões de incremento/decremento:
```tsx
onClick={() => setSafetyFactor(Math.max(0.50, safetyFactor - 0.05))
```
**Problema:** `0.55 - 0.05` em JavaScript = `0.4999999...` → display mostra "49%" em vez de "50%".
**Correto:**
```tsx
// Usar arredondamento para evitar drift de floating-point:
onClick={() => setSafetyFactor(Math.round(Math.max(0.50, safetyFactor - 0.05) * 100) / 100)
onClick={() => setSafetyFactor(Math.round(Math.min(1.00, safetyFactor + 0.05) * 100) / 100)
```
**Ação:** Atualizar AMBOS os botões (desktop e mobile) nos snippets.

#### 🔵 LACUNA 1 — Snippet de `settings-page.tsx` ausente
**Onde:** Plano menciona "atualizar label e display" em settings-page.tsx L112-156 mas sem código proposto
**Correto:** Adicionar instrução concreta:
```tsx
// settings-page.tsx — localizar label "Fator de Segurança" e substituir:
// 1. label: "Fator de Segurança" → "Fator de Correção"
// 2. display: {safetyFactor.toFixed(2)} → {Math.round(safetyFactor * 100)}%
// 3. Texto explicativo: "0.80 recomendado" → "80% recomendado"
// Usar grep para localizar: grep -n "Fator de Segurança\|safetyFactor" src/pages/settings-page.tsx
```
**Ação:** Adicionar ao refinamento final.

---

## REGRAS ESTABELECIDAS NESTA SESSÃO (01/04/2026)

> Válidas para todas as sessões de implementação subsequentes

1. **Correções uma por vez:** Corrigir um documento, mostrar resultado, aguardar aprovação, avançar
2. **Não ler documentos desnecessários:** Ler o doc original apenas quando for corrigi-lo
3. **Anunciar antes de começar:** Informar qual documento será corrigido antes de qualquer edição
4. **Este documento tem prioridade:** Se há conflito entre este doc e um doc de implementação, este doc (auditoria) prevalece
5. **Após correções, implementar:** Só iniciar código após todos os docs estarem corrigidos e aprovados por Rafael

---

## ESTADO DOS DOCUMENTOS (atualizado 01/04/2026)

| Documento | Status correção |
|-----------|----------------|
| SPEC-VISOR-RESULTS-PANEL-v1.md | ✅ Corrigido (02/04/2026) — 6C + 1I + 3L |
| ITEM-8-VISOR-MOBILE-REPLICA.md | ✅ Corrigido (02/04/2026) — 4C + 1I + 1L |
| ITEM-9-SIMULACAO-ESTILO-CASSINO.md | ✅ Corrigido (02/04/2026) — 3C + 3I + 1L |
| ITEM-6-SGB-ACIMA-SLIDER.md | ✅ Corrigido (02/04/2026) — 1C + 1L |
| ITEM-7-BOTAO-EXPLICACAO-POPOVER.md | ✅ Corrigido (02/04/2026) — 1C + 2I + 1L |
| ITEM-10-FAVORITOS-STORE.md | ✅ Corrigido (02/04/2026) — 1C + 1I + 1L |
| ITEM-11-ZONA-VERDE-DINAMICA-SGB.md | ✅ Corrigido (02/04/2026) — 2C + 1L |
| ITEM-2-BOTAO-EDITAR-FERRAMENTA.md | ✅ Corrigido (02/04/2026) — 1I + 1L |
| ITEM-12-PAGINA-FAVORITOS.md | ✅ Corrigido (02/04/2026) — 2I + 2L |
| ITEM-5-FATOR-CORRECAO-SLIDER.md | ✅ Corrigido (02/04/2026) — 1I + 1L |

> **Todas as correções aplicadas e aprovadas por Rafael em 02/04/2026.**
> **Total: 18 críticos + 13 inconsistências + 12 lacunas = 43 correções.**
