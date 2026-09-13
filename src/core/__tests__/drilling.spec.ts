import { describe, expect, it } from 'vitest';
import { HSS_MODE, calculateDrilling } from '../calculator.js';
import { findMaterial } from '../materials.js';
import type { DrillingInput } from '../types.js';

const aco1045 = findMaterial('1045')!;

/**
 * Cenário do AC-002 — o caso verificador do `ESCOPO_BROCA_ACO_RAPIDO` §2.
 * `vcStart` = 16 m/min é o piso da faixa publicada para broca de aço rápido em 1045
 * (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO` §2.1), não a partida de fresa do material.
 */
const referencia: DrillingInput = {
  material: aco1045,
  D: 10,
  L: 50,
  vc: 16,
  substrate: 'HSS-Co',
  vcStart: 16,
};

describe('AC-002: furação HSS no modo do Mestre', () => {
  const r = calculateDrilling(referencia);

  it('reproduz o caso verificador Ø10 / vc 16', () => {
    expect(r.n).toBe(508);
    expect(r.vf).toBe(50);
    expect(r.peckStep).toBeCloseTo(0.4, 2);
  });

  it('o avanço do modo é fn = 0,10 mm/rot, e isso é identidade', () => {
    expect(r.fn).toBeCloseTo(0.1, 6);
    for (const D of [4, 10, 20, 25]) {
      expect(calculateDrilling({ ...referencia, D }).fn).toBeCloseTo(0.1, 6);
    }
  });

  it('não dispara alerta: a velocidade está na janela da própria combinação', () => {
    expect(r.safetyLevel).toBe('NORMAL');
    expect(r.alerts).toEqual([]);
  });

  it('o passo do pica-pau satura no teto de 0,8 mm', () => {
    expect(calculateDrilling({ ...referencia, D: 20 }).peckStep).toBeCloseTo(0.8, 6);
    expect(calculateDrilling({ ...referencia, D: 30 }).peckStep).toBeCloseTo(HSS_MODE.peckCapMm, 6);
  });
});

describe('Gatilho 4 em furação — a referência é a partida da combinação', () => {
  it('não compara o vc de broca contra o vc de fresa do material', () => {
    const { vcStart: _omitido, ...semReferencia } = referencia;
    expect(calculateDrilling(semReferencia).alerts).toEqual([]);
  });

  it('avisa quando o vc sai da janela da própria partida', () => {
    const r = calculateDrilling({ ...referencia, vc: 30 });
    expect(r.safetyLevel).toBe('ATENÇÃO');
    expect(r.alerts[0]!.trigger).toBe('4');
  });
});

describe('Gatilhos 6 e 7 — profundidade do furo', () => {
  it('avisa acima de 3 × D sem canal interno', () => {
    const r = calculateDrilling({ ...referencia, holeDepth: 40 });
    expect(r.alerts.map((a) => a.trigger)).toContain('6');
  });

  it('com canal interno o limiar é 30 × D', () => {
    expect(calculateDrilling({ ...referencia, holeDepth: 40, internalCoolant: true }).alerts).toEqual([]);
    expect(calculateDrilling({ ...referencia, holeDepth: 320, internalCoolant: true }).alerts.map((a) => a.trigger)).toContain('7');
  });
});

describe('Broca de metal duro — cadeia sem a aritmética de oficina', () => {
  it('a rotação vem de 1000/π e não é truncada', () => {
    const r = calculateDrilling({ material: aco1045, D: 10, L: 50, vc: 100, substrate: 'MD', fn: 0.2 });
    expect(r.n).toBeCloseTo((100 * 1000) / (Math.PI * 10), 3);
    expect(r.vf).toBeCloseTo(r.n * 0.2, 3);
    expect(r.peckStep).toBeNull();
  });
});
