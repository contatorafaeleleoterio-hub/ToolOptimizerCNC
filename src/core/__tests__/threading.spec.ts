import { describe, it, expect } from 'vitest';
import { calculateThreading } from '../calculator.js';
import { FACTORY_MATERIALS } from '../materials.js';
import type { ThreadingInput } from '../types.js';

describe('Cadeia de Roscamento Canônica (calculateThreading)', () => {
  const mat1045 = FACTORY_MATERIALS.find(m => m.id === '1045')!;

  it('deve calcular cinemática rigorosamente travada no passo (vf = n * P) para M8 x 1.25', () => {
    const input: ThreadingInput = {
      material: mat1045,
      D: 8,
      pitch: 1.25,
      vc: 14, // Partida canônica para 1045 (10-18 m/min, §2.2)
      L: 30,
      toolType: 'macho-corte',
    };

    const res = calculateThreading(input);

    // n = (14 * 1000) / (pi * 8) ≈ 557.04 rpm
    expect(res.n).toBeCloseTo(557.04, 1);
    // vf = n * P = 557.04 * 1.25 ≈ 696.3 mm/min
    expect(res.vf).toBeCloseTo(696.3, 1);
    expect(res.vf).toBeCloseTo(res.n * input.pitch, 5);
    expect(res.safetyLevel).toBe('NORMAL');
  });

  it('deve disparar alerta CRÍTICO se vc exceder 40 m/min para macho de corte (Gatilho 8)', () => {
    const input: ThreadingInput = {
      material: mat1045,
      D: 8,
      pitch: 1.25,
      vc: 45, // Excede o teto de 40 m/min
      L: 30,
      toolType: 'macho-corte',
    };

    const res = calculateThreading(input);
    expect(res.safetyLevel).toBe('CRÍTICO');
    expect(res.alerts.some(a => a.trigger === '8' && a.level === 'CRÍTICO')).toBe(true);
  });

  it('deve aceitar vc = 45 m/min em macho de conformação em aço 1045 como NORMAL (teto é 60)', () => {
    const input: ThreadingInput = {
      material: mat1045,
      D: 8,
      pitch: 1.25,
      vc: 45, // CANONICO_FURACAO §2.2: conformação opera em ~45 m/min em 1045
      L: 30,
      toolType: 'macho-conformacao',
    };

    const res = calculateThreading(input);
    expect(res.safetyLevel).toBe('NORMAL');
    expect(res.alerts.some(a => a.trigger === '8')).toBe(false);
  });

  it('deve disparar alerta CRÍTICO para macho de conformação em material incompatível (ex: ferro fundido GG25)', () => {
    const matGG25 = FACTORY_MATERIALS.find(m => m.id === 'gg25')!;
    const input: ThreadingInput = {
      material: matGG25,
      D: 8,
      pitch: 1.25,
      vc: 20,
      L: 30,
      toolType: 'macho-conformacao',
    };

    const res = calculateThreading(input);
    expect(res.safetyLevel).toBe('CRÍTICO');
    expect(res.alerts.some(a => a.trigger === '9')).toBe(true);
  });
});
