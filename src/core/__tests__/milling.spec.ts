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
