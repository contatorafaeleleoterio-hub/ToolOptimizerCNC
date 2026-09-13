import { describe, it, expect } from 'vitest';
import { calculateBoring } from '../calculator.js';
import { FACTORY_MATERIALS } from '../materials.js';
import type { BoringInput } from '../types.js';

describe('Cadeia de Mandrilamento Canônica (calculateBoring)', () => {
  const mat1045 = FACTORY_MATERIALS.find(m => m.id === '1045')!;

  it('deve derivar ap a partir dos dois diâmetros e calcular remoção exata do anel cilíndrico (CANONICO_FURACAO §1.11, §1.12)', () => {
    const input: BoringInput = {
      material: mat1045,
      dInitial: 18,
      dFinal: 20,
      L: 60,
      vc: 140,
      fn: 0.08, // CANONICO_FURACAO §2.3
    };

    const res = calculateBoring(input);

    // ap no raio = (20 - 18) / 2 = 1.0 mm
    expect(res.ap).toBe(1.0);
    expect(res.Dc).toBe(20);

    // n = (140 * 1000) / (pi * 20) ≈ 2228.17 rpm
    expect(res.n).toBeCloseTo(2228.17, 1);
    // vf = n * fn = 2228.17 * 0.08 ≈ 178.25 mm/min
    expect(res.vf).toBeCloseTo(178.25, 1);

    // Q na fórmula do anel: pi * (20² - 18²) * 0.08 * 2228.17 / 4000 ≈ 10.638 cm³/min
    const expectedQ = (Math.PI * (20 ** 2 - 18 ** 2) * 0.08 * res.n) / 4000;
    expect(res.Q).toBeCloseTo(expectedQ, 3);

    // L/D = 60 / 20 = 3.0 (limiar é 4.0) -> NORMAL
    expect(res.LD).toBe(3.0);
    expect(res.safetyLevel).toBe('NORMAL');
  });

  it('deve recusar entrada se dFinal <= dInitial com erro semântico', () => {
    const input: BoringInput = {
      material: mat1045,
      dInitial: 20,
      dFinal: 18, // Impossível mandrilar fechando o furo
      L: 60,
      vc: 140,
    };

    expect(() => calculateBoring(input)).toThrow(RangeError);
  });

  it('deve disparar alerta de ATENÇÃO quando relação L/D da barra exceder 4.0 (Gatilho 5)', () => {
    const input: BoringInput = {
      material: mat1045,
      dInitial: 18,
      dFinal: 20,
      L: 90, // L/D = 90 / 20 = 4.5
      vc: 140,
    };

    const res = calculateBoring(input);
    expect(res.LD).toBe(4.5);
    expect(res.safetyLevel).toBe('ATENÇÃO');
    expect(res.alerts.some(a => a.trigger === '5')).toBe(true);
  });
});
