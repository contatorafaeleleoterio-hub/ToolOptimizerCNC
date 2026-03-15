# Story-005 — ParameterHealthBar: Feedback Visual Fine Tune

**Status:** ✅ CONCLUÍDA
**Versão:** 0.3.0
**Commit:** `12b8a6c`
**Data:** 21/02/2026 — Sessão 7

---

## Objetivo

Adicionar feedback visual bidirecional aos 4 parâmetros do Ajuste Fino (Vc, fz, ae, ap), permitindo ao operador enxergar instantaneamente se cada parâmetro está conservador, ótimo ou agressivo — sem precisar interpretar números brutos.

**Padrão de mercado:** "deviation-from-optimum bar" — validado por Sandvik CoroPlus, Kennametal NOVO, Walter GPS, CNC Cookbook e Machining Doctor.

---

## O que foi entregue

### Componente principal
**`src/components/parameter-health-bar.tsx`**

4 funções puras exportadas (testáveis individualmente):

| Função | Métrica | Normalização |
|--------|---------|--------------|
| `computeVcPosition` | `rpm / maxRPM` | Assimétrica: left ÷0.55, right ÷0.45 |
| `computeFzPosition` | `fzEfetivo / (D × 0.017)` | Simétrica: `chipRatio - 1.0` |
| `computeAePosition` | `ae / D` | Simétrica: `(ratio - 0.5) / 0.5` |
| `computeApPosition` | `ap / D` com limiar dinâmico | `(apDRatio / limiar) - 1.0` |

### Zonas por parâmetro

**Vc (Velocidade de Corte)**
| rpmRatio | Zona | Label |
|----------|------|-------|
| < 30% | amarelo | Sub-ótimo |
| 30–75% | verde | Ideal |
| 75–90% | amarelo | Alerta |
| > 90% | vermelho | Desgaste |

**fz (Avanço por Dente)** — chipRatio = fzEfetivo / (D × 0.017)
| chipRatio | Zona | Label |
|-----------|------|-------|
| < 0.4 | vermelho | Atrito |
| 0.4–0.7 | amarelo | Leve |
| 0.7–1.4 | verde | Ideal |
| 1.4–2.0 | amarelo | Agressivo |
| > 2.0 | vermelho | Vibração |

**ae (Engajamento Radial)** — ratio = ae/D
| ratio | Zona | Label |
|-------|------|-------|
| < 20% | amarelo | CTF Alto |
| 20–50% | verde | CTF Ativo |
| 50–75% | verde | Engaj. Pleno |
| > 75% | amarelo | Pesado |

**ap (Profundidade Axial)** — limiar dinâmico por L/D
| L/D | limiarAgressivo | apDRatio "ótimo" |
|-----|-----------------|-----------------|
| ≤ 3 | 1.5 | ap até 1.5 × D |
| ≤ 4 | 1.0 | ap até 1.0 × D |
| > 4 | 0.6 | ap até 0.6 × D |

### Comportamento

| Parâmetro | Antes de Simular | Após Simular |
|-----------|-----------------|--------------|
| **Vc** | Gray + "Simular para ativar" | Barra colorida com zona real |
| **fz** | Gray + "Simular para ativar" + sem badge | Barra colorida + badge CTF se ativo |
| **ae** | Barra colorida (sempre ativo) | Barra colorida (mesmo comportamento) |
| **ap** | Barra colorida (sempre ativo) | Barra colorida (mesmo comportamento) |

### Integração nos painéis

Inserido em ambos os painéis (paridade desktop/mobile):
- `src/components/fine-tune-panel.tsx` — após slider row, antes da gaveta educativa
- `src/components/mobile/mobile-fine-tune-section.tsx` — mesmo padrão

### Testes

**56 testes unitários** em `tests/components/parameter-health-bar.test.tsx`:
- `computeVcPosition`: 9 testes (posição + zonas + clamp)
- `computeFzPosition`: 10 testes (chipRatio + CTF badge + zonas)
- `computeAePosition`: 11 testes (posição + display + zonas)
- `computeApPosition`: 12 testes (L/D + limiar + ldColorClass + clamp)
- `ParameterHealthBar`: 14 testes de render (inactive/active, CTF badge, readouts)

**+7 testes de integração** em arquivos existentes:
- `fine-tune-panel.test.tsx` — 5 testes
- `mobile-page.test.tsx` — 2 testes

---

## Padrões técnicos estabelecidos

### Regra: sem Tailwind dinâmico
```tsx
// ❌ Errado — classe é purgada em build
<div className={`text-${zone}`} />

// ✅ Correto — lookup estático + style inline
const ZONE_RGB = { verde: '46,204,113', amarelo: '243,156,18', vermelho: '231,76,60' };
<div style={{ backgroundColor: `rgba(${ZONE_RGB[zone]},0.9)` }} />
```

### Regra: funções puras separadas da UI
As 4 funções `compute*` são puras (input → output, sem side effects), exportadas e testadas independentemente da UI. O componente JSX apenas chama as funções e renderiza.

### Regra: ae/ap sempre computáveis
`ae` e `ap` dependem apenas de `parametros` e `ferramenta.diametro/balanco` — sempre disponíveis. `vc` e `fz` precisam de `resultado.rpm` e `resultado.fzEfetivo` — mostram InactiveBar até Simular.

---

## data-testid reference

```
health-bar-{key}          → wrapper externo (sempre presente)
health-bar-{key}-fill     → barra colorida (estado ativo)
health-bar-{key}-inactive → placeholder cinza (vc/fz antes de Simular)
ctf-badge                 → badge "CTF ×1.73" (fz, quando ctf > 1.0)
ae-ratio-display          → "50.0%" (ae/D percentage)
ap-ld-display             → "L/D: 4.2" (colorido por zona)
```

---

## Arquivos modificados

| Arquivo | Tipo | Mudança |
|---------|------|---------|
| `src/components/parameter-health-bar.tsx` | **CRIADO** | Componente completo |
| `tests/components/parameter-health-bar.test.tsx` | **CRIADO** | 56 testes unitários |
| `src/components/fine-tune-panel.tsx` | Modificado | +import +`<ParameterHealthBar>` |
| `src/components/mobile/mobile-fine-tune-section.tsx` | Modificado | +import +`<ParameterHealthBar>` |
| `tests/components/fine-tune-panel.test.tsx` | Modificado | +5 testes integração |
| `tests/pages/mobile-page.test.tsx` | Modificado | +2 testes integração |
| `package.json` | Modificado | `0.2.1` → `0.3.0` |
