import { describe, expect, it } from 'vitest';
import { ADJUST_STEP_PERCENT, deduceFn, deduceFz, steppedValue } from '../adjust.js';
import { calculateDrilling, calculateMilling } from '../calculator.js';
import { applySafetyMargin, formatNumber, isSafetyMarginVisible } from '../display.js';
import { findMaterial } from '../materials.js';
import type { MillingInput } from '../types.js';

const aco1045 = findMaterial('1045')!;

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

describe('AC-004: ajuste fino da rotação em um passo', () => {
  const nominal = calculateMilling(referencia);
  const ajustado = calculateMilling({ ...referencia, nOverride: steppedValue(nominal.n, -1) });

  it('o passo é de 5% (GABARITO D7, emenda de 07/09/2026)', () => {
    expect(ADJUST_STEP_PERCENT).toBe(5);
    expect(ajustado.n).toBeCloseTo(nominal.n * 0.95, 6);
  });

  it('a velocidade de corte real passa a ser consequência da rotação (§8.1)', () => {
    expect(ajustado.vcReal).toBeCloseTo(referencia.vc * 0.95, 6);
  });

  it('avanço, remoção e potência acompanham a rotação', () => {
    expect(ajustado.vf).toBeCloseTo(nominal.vf * 0.95, 6);
    expect(ajustado.Q).toBeCloseTo(nominal.Q * 0.95, 6);
    expect(ajustado.Pc).toBeCloseTo(nominal.Pc * 0.95, 6);
  });

  it('o avanço por dente não se move — quem o move é a edição do avanço (§8.1)', () => {
    expect(ajustado.hm).toBeCloseTo(nominal.hm, 9);
    expect(ajustado.kc).toBeCloseTo(nominal.kc, 6);
  });

  it('o torque é invariante: não depende da rotação com fz fixo', () => {
    expect(ajustado.Mc).toBeCloseTo(nominal.Mc, 6);
  });

  it('a cadeia é reversível — um toque para cada lado volta ao nominal', () => {
    const volta = calculateMilling({ ...referencia, nOverride: steppedValue(ajustado.n, 1) * (1 / 0.95) * 0.95 });
    expect(volta.n).toBeCloseTo(ajustado.n * 1.05, 6);
  });
});

describe('Inversão do avanço — MVP §8.1', () => {
  it('avanço editado em fresamento deduz o avanço por dente', () => {
    const r = calculateMilling(referencia);
    expect(deduceFz(r.vf, referencia.Z, r.n)).toBeCloseTo(referencia.fz, 9);
  });

  it('avanço editado em furação deduz o avanço por rotação', () => {
    expect(deduceFn(500, 5000)).toBeCloseTo(0.1, 9);
  });

  it('a inversão recalcula percorrendo a mesma cadeia do sentido direto', () => {
    const nominal = calculateMilling(referencia);
    const fzNovo = deduceFz(nominal.vf * 1.2, referencia.Z, nominal.n);
    const r = calculateMilling({ ...referencia, fz: fzNovo });
    expect(r.vf).toBeCloseTo(nominal.vf * 1.2, 6);
  });

  it('recusa inversão sem rotação — não é condição física', () => {
    expect(() => deduceFn(500, 0)).toThrow(RangeError);
  });
});

describe('AC-006: margem de segurança como lente de exibição', () => {
  const fisico = calculateMilling(referencia);
  const exibido = applySafetyMargin(fisico, 85);

  it('escala o que vai para a máquina e o esforço dimensionado (regra 1)', () => {
    expect(exibido.n).toBeCloseTo(fisico.n * 0.85, 6);
    expect(exibido.vf).toBeCloseTo(fisico.vf * 0.85, 6);
    expect(exibido.vcReal).toBeCloseTo(fisico.vcReal * 0.85, 6);
    expect(exibido.Q).toBeCloseTo(fisico.Q * 0.85, 6);
    expect(exibido.Pc).toBeCloseTo(fisico.Pc * 0.85, 6);
    expect(exibido.Mc).toBeCloseTo(fisico.Mc * 0.85, 6);
  });

  it('não escala as grandezas de verificação (regra 2)', () => {
    expect(exibido.hm).toBe(fisico.hm);
    expect(exibido.hex).toBe(fisico.hex);
    expect(exibido.ctf).toBe(fisico.ctf);
    expect(exibido.LD).toBe(fisico.LD);
    expect(exibido.kc).toBe(fisico.kc);
  });

  it('alerta e nível descrevem o esforço não atenuado (regra 5)', () => {
    expect(exibido.safetyLevel).toBe(fisico.safetyLevel);
    expect(exibido.alerts).toEqual(fisico.alerts);
  });

  it('a lente não realimenta a cadeia (regra 9)', () => {
    expect(applySafetyMargin(applySafetyMargin(fisico, 100), 85).n).toBeCloseTo(exibido.n, 9);
  });

  it('acima de 100% é permitido — a lente não é limitador (regra 6)', () => {
    expect(applySafetyMargin(fisico, 120).n).toBeCloseTo(fisico.n * 1.2, 6);
  });

  it('só aparece quando difere de 100% (regra 8)', () => {
    expect(isSafetyMarginVisible(100)).toBe(false);
    expect(isSafetyMarginVisible(85)).toBe(true);
  });

  it('vale igual em furação', () => {
    const furo = calculateDrilling({ material: aco1045, D: 10, L: 50, vc: 16, substrate: 'HSS-Co' });
    expect(applySafetyMargin(furo, 85).n).toBeCloseTo(508 * 0.85, 6);
    expect(applySafetyMargin(furo, 85).peckStep).toBe(furo.peckStep);
  });
});

describe('Formatação — spec.md R3', () => {
  it('milhar com ponto, decimal com vírgula', () => {
    expect(formatNumber(4456)).toBe('4.456');
    expect(formatNumber(0.0286, 3)).toBe('0,029');
    expect(formatNumber(1070)).toBe('1.070');
  });
});
