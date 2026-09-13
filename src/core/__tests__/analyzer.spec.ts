import { describe, expect, it } from 'vitest';
import { calculateMilling } from '../calculator.js';
import { findMaterial } from '../materials.js';
import type { MillingInput } from '../types.js';

const aco1045 = findMaterial('1045')!;

const base: MillingInput = {
  material: aco1045,
  geometry: 'topo-reto',
  D: 10,
  Z: 4,
  L: 30,
  ap: 2.0,
  ae: 2.5,
  vc: 140,
  fz: 0.06,
};

describe('AC-003: validação de segurança passiva, sem bloqueio', () => {
  const r = calculateMilling({ ...base, ae: 12 });

  it('não lança exceção e entrega as grandezas teóricas', () => {
    expect(Number.isFinite(r.n)).toBe(true);
    expect(Number.isFinite(r.Pc)).toBe(true);
    expect(Number.isFinite(r.Mc)).toBe(true);
    expect(r.Q).toBeGreaterThan(0);
  });

  it('classifica como CRÍTICO pelo gatilho 3', () => {
    expect(r.safetyLevel).toBe('CRÍTICO');
    const alerta = r.alerts.find((a) => a.trigger === '3')!;
    expect(alerta.level).toBe('CRÍTICO');
    expect(alerta.message).toContain('fora da aresta física');
  });

  it('não emite também o gatilho 2 — acima de D a condição já é outra', () => {
    expect(r.alerts.map((a) => a.trigger)).not.toContain('2');
  });

  it('satura o arco engajado em vez de produzir NaN', () => {
    expect(r.eps).toBe(1);
    expect(r.phiMax).toBeCloseTo(Math.PI, 6);
  });
});

describe('Precedência de nível — spec.md R4', () => {
  it('CRÍTICO vence ATENÇÃO quando as duas condições estão ativas', () => {
    const r = calculateMilling({ ...base, ae: 12, L: 60 });
    expect(r.safetyLevel).toBe('CRÍTICO');
    expect(r.alerts.map((a) => a.trigger)).toEqual(expect.arrayContaining(['3', '5']));
  });
});

describe('Gatilho 2 — rasgo cheio', () => {
  it('avisa a partir de 0,95 × D e não avisa abaixo', () => {
    expect(calculateMilling({ ...base, ae: 9.5 }).alerts.map((a) => a.trigger)).toContain('2');
    expect(calculateMilling({ ...base, ae: 9.4 }).alerts.map((a) => a.trigger)).not.toContain('2');
  });
});

describe('Gatilho 5 — balanço por tipo de haste (MVP §9.3)', () => {
  it('haste comum avisa acima de 4 × D', () => {
    expect(calculateMilling({ ...base, L: 45 }).alerts.map((a) => a.trigger)).toContain('5');
  });

  it('adaptador amortecido move o limiar para 8 × D', () => {
    expect(calculateMilling({ ...base, L: 45, shank: 'amortecido' }).alerts).toEqual([]);
    expect(calculateMilling({ ...base, L: 85, shank: 'amortecido' }).alerts.map((a) => a.trigger)).toContain('5');
  });
});

describe('Gatilho 4 — janela de velocidade de corte', () => {
  it('avisa abaixo de 0,6 × e acima de 1,4 × a partida do material', () => {
    expect(calculateMilling({ ...base, vc: 80 }).alerts.map((a) => a.trigger)).toContain('4');
    expect(calculateMilling({ ...base, vc: 200 }).alerts.map((a) => a.trigger)).toContain('4');
    expect(calculateMilling({ ...base, vc: 140 }).alerts).toEqual([]);
  });
});

describe('Gatilho 10 — toroidal com ap abaixo do raio de ponta', () => {
  it('avisa da lacuna L1 em vez de calcular um diâmetro efetivo não confirmado', () => {
    const r = calculateMilling({ ...base, geometry: 'toroidal', r: 1.0, ap: 0.5 });
    expect(r.alerts.map((a) => a.trigger)).toContain('10');
    expect(r.De).toBe(10);
  });
});

describe('Entrada sem significado numérico', () => {
  it('recusa diâmetro zero — não é condição física, é divisão por zero', () => {
    expect(() => calculateMilling({ ...base, D: 0 })).toThrow(RangeError);
  });
});
