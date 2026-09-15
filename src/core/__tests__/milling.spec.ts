import { describe, expect, it } from 'vitest';
import { calculateMilling } from '../calculator.js';
import { findMaterial } from '../materials.js';
import type { MillingInput } from '../types.js';

const aco1045 = findMaterial('1045')!;

/** Cenário do AC-001 — a combinação de referência do `spec.md`. */
const referencia: MillingInput = {
  material: aco1045,
  geometry: 'toroidal',
  D: 10,
  Z: 4,
  r: 1.0,
  L: 45,
  ap: 2.0,
  ae: 2.5,
  vc: 140,
  fz: 0.06,
};

describe('AC-001: cálculo nominal de fresa toroidal em aço 1045', () => {
  const r = calculateMilling(referencia);

  it('entrega rotação e avanço da cadeia canônica §1.4', () => {
    expect(r.n).toBeCloseTo(4456, 0);
    expect(r.vf).toBeCloseTo(1070, 0);
  });

  it('entrega as grandezas de verificação', () => {
    expect(r.LD).toBeCloseTo(4.5, 1);
    expect(r.hm).toBeCloseTo(0.029, 3);
    expect(r.hex).toBeCloseTo(0.052, 3);
    expect(r.ctf).toBeCloseTo(1.155, 3);
    expect(r.Q).toBeCloseTo(5.35, 2);
  });

  it('entrega esforço a partir de Kienzle, não de constante', () => {
    expect(r.kc).toBeCloseTo(3163, 0);
    expect(r.Pc).toBeCloseTo(0.28, 2);
    expect(r.Mc).toBeCloseTo(0.6, 2);
  });

  it('aciona ATENÇÃO pelo balanço (gatilho 5)', () => {
    expect(r.safetyLevel).toBe('ATENÇÃO');
    expect(r.alerts.map((a) => a.trigger)).toContain('5');
    expect(r.alerts.find((a) => a.trigger === '5')!.message).toContain('L/D');
  });
});

describe('Invariantes do motor — CANONICO_MOTOR_DE_CALCULO §1.6', () => {
  it('hm nunca ultrapassa fz, inclusive em rasgo cheio', () => {
    for (const ae of [0.1, 1, 2.5, 5, 7.85, 9.5, 10]) {
      const r = calculateMilling({ ...referencia, ae, L: 20 });
      expect(r.hm).toBeLessThanOrEqual(referencia.fz);
    }
  });

  it('não trava o arco engajado em π/2 — rasgo cheio chega a π', () => {
    const r = calculateMilling({ ...referencia, ae: 10, L: 20 });
    expect(r.phiMax).toBeCloseTo(Math.PI, 5);
    expect(r.hm).toBeCloseTo(referencia.fz * 2 / Math.PI, 5);
  });

  it('CTF vale 1 acima de ae/D = 0,50 — exato, não convenção', () => {
    expect(calculateMilling({ ...referencia, ae: 6, L: 20 }).ctf).toBe(1);
  });

  it('o CTF exibido não é aplicado sobre o fz programado', () => {
    const r = calculateMilling({ ...referencia, ae: 2 });
    expect(r.vf).toBeCloseTo(referencia.fz * referencia.Z * r.n, 6);
  });
});

describe('Diâmetro efetivo — CANONICO_MOTOR_DE_CALCULO §1.2', () => {
  it('a esférica corrige a rotação pelo diâmetro efetivo', () => {
    const r = calculateMilling({ ...referencia, geometry: 'esferica', ap: 1, D: 20, L: 40 });
    expect(r.De).toBeCloseTo(2 * Math.sqrt(1 * 19), 6);
    expect(r.n).toBeCloseTo((140 * 1000) / (Math.PI * r.De), 3);
  });

  it('a toroidal não extrapola a fórmula da esférica — lacuna L1 declarada', () => {
    expect(calculateMilling({ ...referencia, ap: 0.5 }).De).toBe(10);
  });
});

describe('Precisão de acabamento com AP e AE decimais finos (0,15 mm)', () => {
  it('processa ap = 0.15 mm e ae = 0.15 mm em topo reto sem perda de precisão ou divisão por zero', () => {
    const r = calculateMilling({
      ...referencia,
      geometry: 'topo-reto',
      ap: 0.15,
      ae: 0.15,
      L: 25,
    });

    // eps = 0.15 / 10 = 0.015 (1.5% de engajamento)
    expect(r.eps).toBeCloseTo(0.015, 6);
    expect(r.phiMax).toBeCloseTo(Math.acos(1 - 2 * 0.015), 6); // ~0.2456 rad

    // Efeito de afinamento de cavaco expressivo
    expect(r.ctf).toBeGreaterThan(4.0); // ~4.11x
    expect(r.hex).toBeCloseTo(referencia.fz / r.ctf, 4);

    // Q = (0.15 * 0.15 * vf) / 1000
    const expectedQ = (0.15 * 0.15 * r.vf) / 1000;
    expect(r.Q).toBeCloseTo(expectedQ, 5);

    // Potência e Torque finitos e coerentes
    expect(r.Pc).toBeGreaterThan(0);
    expect(r.Mc).toBeGreaterThan(0);
    expect(Number.isFinite(r.kc)).toBe(true);
  });

  it('calcula diâmetro efetivo de fresa esférica com ap = 0.15 mm', () => {
    const r = calculateMilling({
      ...referencia,
      geometry: 'esferica',
      D: 10,
      ap: 0.15,
      ae: 0.15,
      L: 25,
    });

    // De = 2 * sqrt(0.15 * (10 - 0.15)) = 2 * sqrt(1.4775) ~= 2.43105 mm
    const expectedDe = 2 * Math.sqrt(0.15 * 9.85);
    expect(r.De).toBeCloseTo(expectedDe, 4);

    // Rotação ajustada para De reduzido
    const expectedN = (140 * 1000) / (Math.PI * expectedDe);
    expect(r.n).toBeCloseTo(expectedN, 1);
  });
});

