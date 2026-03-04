/**
 * Testes para calcularSliderBounds()
 * Casos de referência: docs/PLANO_IMPLEMENTACAO_SLIDER_BOUNDS.md — Seção 4
 *
 * Todos os valores esperados foram calculados a partir dos dados reais do sistema
 * (materials.ts, recommendations.ts) e validados contra catálogos Sandvik, Kennametal,
 * Mitsubishi, Seco e Walter.
 */

import { describe, it, expect } from 'vitest';
import { calcularSliderBounds } from '../../src/engine/slider-bounds';
import { MATERIAIS } from '../../src/data/materials';
import { TipoUsinagem } from '../../src/types';
import type { Ferramenta } from '../../src/types';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const P20 = MATERIAIS.find((m) => m.id === 5)!;   // grupo1, vcDesbaste=[100,120]
const H13 = MATERIAIS.find((m) => m.id === 9)!;   // grupo2, vcAcabamento=[125,170]

const ferr10: Ferramenta = { tipo: 'toroidal', diametro: 10, numeroArestas: 4, balanco: 30 };
const ferr6: Ferramenta  = { tipo: 'toroidal', diametro: 6,  numeroArestas: 4, balanco: 24 };

// ── Grupo 1: P20 Ø10 Desbaste ─────────────────────────────────────────────────

describe('P20 Ø10 Desbaste', () => {
  const bounds = calcularSliderBounds(P20, ferr10, TipoUsinagem.DESBASTE);

  // Seção 4.1 — Vc
  it('Vc min = 0 (slider começa no zero)', () => {
    expect(bounds.vc.min).toBe(0);
  });

  it('Vc max = round(120 × 1.3) = 156', () => {
    expect(bounds.vc.max).toBe(156);
  });

  it('Vc recomendado clampado a vcRange max = 120', () => {
    // tabela GRUPO1 D=10 retorna vc=200, clamped ao vcRange[desbaste]=[100,120]
    expect(bounds.vc.recomendado).toBe(120);
  });

  it('Vc step = 1', () => {
    expect(bounds.vc.step).toBe(1);
  });

  // Seção 4.4 — ae max = D
  it('ae max = D = 10 (limite físico)', () => {
    expect(bounds.ae.max).toBe(10);
  });

  it('ae min = 0.01', () => {
    expect(bounds.ae.min).toBe(0.01);
  });

  it('ae recomendado = 4.5 (45% de D, aço desbaste)', () => {
    expect(bounds.ae.recomendado).toBe(4.5);
  });

  // Seção 4.1 — ap
  it('ap max = 8.0 (0.8 × D para D > 6, desbaste)', () => {
    expect(bounds.ap.max).toBe(8);
  });

  it('ap min = 0.05', () => {
    expect(bounds.ap.min).toBe(0.05);
  });

  it('ap step = 0.05', () => {
    expect(bounds.ap.step).toBe(0.05);
  });

  // Seção 4.1 — fz
  it('fz min ≈ 0.056 (0.140 × 0.4)', () => {
    expect(bounds.fz.min).toBeCloseTo(0.056, 4);
  });

  it('fz max ≈ 0.280 (0.140 × 2.0)', () => {
    expect(bounds.fz.max).toBeCloseTo(0.280, 4);
  });

  it('fz recomendado ≈ 0.140 (tabela GRUPO1 D=10)', () => {
    expect(bounds.fz.recomendado).toBe(0.140);
  });
});

// ── Grupo 2: H13 Ø6 Acabamento ────────────────────────────────────────────────

describe('H13 Ø6 Acabamento', () => {
  const bounds = calcularSliderBounds(H13, ferr6, TipoUsinagem.ACABAMENTO);

  // Seção 4.2 — Vc
  it('Vc min = 0 (slider começa no zero)', () => {
    expect(bounds.vc.min).toBe(0);
  });

  it('Vc max = round(170 × 1.3) = 221', () => {
    expect(bounds.vc.max).toBe(221);
  });

  it('Vc recomendado = 170 (clampado ao vcRange acabamento)', () => {
    expect(bounds.vc.recomendado).toBe(170);
  });

  // Seção 4.2 — ae
  it('ae max = 6 (= D)', () => {
    expect(bounds.ae.max).toBe(6);
  });

  it('ae recomendado ≈ 0.21 (3.5% de D, endurecido acabamento)', () => {
    expect(bounds.ae.recomendado).toBeCloseTo(0.21, 2);
  });

  // Seção 4.2 — ap acabamento = 0.5mm fixo
  it('ap max = 0.5 fixo (NÃO proporcional a D — validação catálogos)', () => {
    expect(bounds.ap.max).toBe(0.5);
  });

  it('ap recomendado = 0.5 (clampado ao max de acabamento)', () => {
    expect(bounds.ap.recomendado).toBe(0.5);
  });

  // Seção 4.2 — fz
  it('fz recomendado ≈ 0.060 (grupo2 acabamento D=6)', () => {
    expect(bounds.fz.recomendado).toBeCloseTo(0.060, 3);
  });

  it('fz min ≈ 0.024 (0.060 × 0.4)', () => {
    expect(bounds.fz.min).toBeCloseTo(0.024, 4);
  });

  it('fz max ≈ 0.120 (0.060 × 2.0)', () => {
    expect(bounds.fz.max).toBeCloseTo(0.120, 4);
  });
});

// ── Grupo 3: Fallback sem material ────────────────────────────────────────────

describe('Sem material — fallback', () => {
  const bounds = calcularSliderBounds(null, ferr10, TipoUsinagem.DESBASTE);

  // Seção 4.3
  it('Vc min = 0 (fallback — slider começa no zero)', () => {
    expect(bounds.vc.min).toBe(0);
  });

  it('Vc max = 350 (cobre aços + inox)', () => {
    expect(bounds.vc.max).toBe(350);
  });

  it('ae max = 10 (= D — mesmo sem material)', () => {
    expect(bounds.ae.max).toBe(10);
  });

  it('ap max = 8.0 (0.8 × D, desbaste, D > 6)', () => {
    expect(bounds.ap.max).toBe(8);
  });
});

// ── Grupo 4: ae max = D para diferentes diâmetros ─────────────────────────────

describe('ae max = D — invariante para qualquer diâmetro', () => {
  // Seção 4.4
  const diameters = [0.5, 3, 6, 10, 16];

  diameters.forEach((d) => {
    it(`ae max = ${d} para Ø${d}`, () => {
      const ferr: Ferramenta = { tipo: 'toroidal', diametro: d, numeroArestas: 4, balanco: d * 3 };
      const bounds = calcularSliderBounds(P20, ferr, TipoUsinagem.DESBASTE);
      expect(bounds.ae.max).toBe(d);
    });
  });
});

// ── Grupo 5: ae step dinâmico por diâmetro ────────────────────────────────────

describe('ae step dinâmico', () => {
  it('step = 0.01 para D ≤ 1 (micro-fresas)', () => {
    const ferr: Ferramenta = { tipo: 'toroidal', diametro: 0.5, numeroArestas: 2, balanco: 5 };
    expect(calcularSliderBounds(null, ferr, TipoUsinagem.DESBASTE).ae.step).toBe(0.01);
  });

  it('step = 0.1 para D ≤ 10', () => {
    expect(calcularSliderBounds(null, ferr10, TipoUsinagem.DESBASTE).ae.step).toBe(0.1);
  });

  it('step = 0.5 para D > 10', () => {
    const ferr: Ferramenta = { tipo: 'toroidal', diametro: 16, numeroArestas: 4, balanco: 40 };
    expect(calcularSliderBounds(null, ferr, TipoUsinagem.DESBASTE).ae.step).toBe(0.5);
  });
});

// ── Grupo 6: Cap L/D > 6 ──────────────────────────────────────────────────────

describe('Cap L/D crítico', () => {
  // Seção 4.6
  it('ap max = 0.1 quando L/D = 7 (balanco=42, D=6)', () => {
    const ferr: Ferramenta = { tipo: 'toroidal', diametro: 6, numeroArestas: 4, balanco: 42 };
    const bounds = calcularSliderBounds(P20, ferr, TipoUsinagem.DESBASTE);
    expect(bounds.ap.max).toBe(0.1);
  });

  it('ap max NÃO é limitado quando L/D = 5 (seguro)', () => {
    const ferr: Ferramenta = { tipo: 'toroidal', diametro: 6, numeroArestas: 4, balanco: 30 };
    const bounds = calcularSliderBounds(P20, ferr, TipoUsinagem.DESBASTE);
    // D=6, desbaste, D≤6 → max = 6.0
    expect(bounds.ap.max).toBe(6);
  });

  it('ldCritico customizado: ap limitado quando L/D > 4 (ldCritico=4)', () => {
    const ferr: Ferramenta = { tipo: 'toroidal', diametro: 6, numeroArestas: 4, balanco: 25 };
    // L/D = 25/6 ≈ 4.17 > 4 → ap.max = 0.1
    const bounds = calcularSliderBounds(P20, ferr, TipoUsinagem.DESBASTE, 4);
    expect(bounds.ap.max).toBe(0.1);
  });
});

// ── Grupo 7: Desbaste D ≤ 6 — ap = 1.0 × D ───────────────────────────────────

describe('ap Desbaste D ≤ 6', () => {
  it('ap max = 6.0 (1.0 × D) para Ø6 desbaste', () => {
    const bounds = calcularSliderBounds(P20, ferr6, TipoUsinagem.DESBASTE);
    expect(bounds.ap.max).toBe(6);
  });

  it('ap max = 3.0 (1.0 × D) para Ø3 desbaste', () => {
    const ferr: Ferramenta = { tipo: 'toroidal', diametro: 3, numeroArestas: 4, balanco: 12 };
    const bounds = calcularSliderBounds(P20, ferr, TipoUsinagem.DESBASTE);
    expect(bounds.ap.max).toBe(3);
  });
});

// ── Grupo 8: Semi-acabamento — ap = 0.5 × D ───────────────────────────────────

describe('ap Semi-acabamento', () => {
  it('ap max = 5.0 (0.5 × D) para Ø10 semi', () => {
    const bounds = calcularSliderBounds(P20, ferr10, TipoUsinagem.SEMI_ACABAMENTO);
    expect(bounds.ap.max).toBe(5);
  });
});

// ── Grupo 9: Override por ferramenta ──────────────────────────────────────────

describe('Override por ferramenta (paramRanges)', () => {
  // Seção 4.5
  it('override vc.min e vc.max sobrescrevem bounds automáticos', () => {
    const ferr: Ferramenta = {
      ...ferr10,
      paramRanges: { vc: { min: 80, max: 180 } },
    };
    const bounds = calcularSliderBounds(P20, ferr, TipoUsinagem.DESBASTE);
    expect(bounds.vc.min).toBe(80);
    expect(bounds.vc.max).toBe(180);
    // fz/ae/ap permanecem automáticos
    expect(bounds.ae.max).toBe(10);
  });

  it('override fz.desejado define recomendado', () => {
    const ferr: Ferramenta = {
      ...ferr10,
      paramRanges: { fz: { desejado: 0.100 } },
    };
    const bounds = calcularSliderBounds(P20, ferr, TipoUsinagem.DESBASTE);
    expect(bounds.fz.recomendado).toBe(0.100);
    // min/max automáticos não são afetados
    expect(bounds.fz.min).toBeCloseTo(0.056, 3);
  });

  it('override undefined (sem paramRanges) não muda nada', () => {
    const ferrSem: Ferramenta = { ...ferr10 };
    const ferrCom: Ferramenta = { ...ferr10, paramRanges: undefined };
    const b1 = calcularSliderBounds(P20, ferrSem, TipoUsinagem.DESBASTE);
    const b2 = calcularSliderBounds(P20, ferrCom, TipoUsinagem.DESBASTE);
    expect(b1.vc.min).toBe(b2.vc.min);
    expect(b1.ap.max).toBe(b2.ap.max);
  });

  it('override parcial: apenas vc.min — vc.max permanece automático', () => {
    const ferr: Ferramenta = {
      ...ferr10,
      paramRanges: { vc: { min: 50 } },
    };
    const bounds = calcularSliderBounds(P20, ferr, TipoUsinagem.DESBASTE);
    expect(bounds.vc.min).toBe(50);
    expect(bounds.vc.max).toBe(156); // automático mantido
  });
});

// ── Grupo 10: Consistência — recomendado sempre dentro dos bounds ──────────────

describe('Consistência dos bounds', () => {
  const casos: [string, Ferramenta, TipoUsinagem][] = [
    ['P20 Ø10 Desbaste', ferr10, TipoUsinagem.DESBASTE],
    ['H13 Ø6 Acabamento', ferr6, TipoUsinagem.ACABAMENTO],
    ['P20 Ø10 Semi', ferr10, TipoUsinagem.SEMI_ACABAMENTO],
    ['Sem material Desbaste', ferr10, TipoUsinagem.DESBASTE],
  ];

  casos.forEach(([label, ferr, op]) => {
    it(`recomendado ∈ [min, max] para todos os params — ${label}`, () => {
      const mat = label.startsWith('Sem material') ? null : P20;
      const b = calcularSliderBounds(mat, ferr, op);
      for (const key of ['vc', 'ae', 'ap', 'fz'] as const) {
        const { min, max, recomendado } = b[key];
        expect(recomendado).toBeGreaterThanOrEqual(min);
        expect(recomendado).toBeLessThanOrEqual(max);
      }
    });
  });
});
