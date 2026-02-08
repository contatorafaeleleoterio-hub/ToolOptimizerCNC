import { describe, it, expect } from 'vitest';
import { calculateMRR, calculatePower, calculateTorque } from '@/engine/power';

describe('calculateMRR', () => {
  // Formula: Q = (ap * ae * Vf) / 1000 (cm3/min)

  it('Scenario A: ap=3, ae=6, Vf=848.83 -> Q=15.28', () => {
    const mrr = calculateMRR(3, 6, 848.83);
    expect(mrr).toBeCloseTo(15.28, 1);
  });

  it('Scenario B: ap=1, ae=2, Vf=14234.03 -> Q=28.47', () => {
    const mrr = calculateMRR(1, 2, 14234.03);
    expect(mrr).toBeCloseTo(28.47, 1);
  });

  it('Scenario C: ap=2, ae=2, Vf=1512.09 -> Q=6.05', () => {
    const mrr = calculateMRR(2, 2, 1512.09);
    expect(mrr).toBeCloseTo(6.05, 1);
  });

  it('should throw error when ap <= 0', () => {
    expect(() => calculateMRR(0, 6, 848)).toThrow();
  });

  it('should throw error when ae <= 0', () => {
    expect(() => calculateMRR(3, 0, 848)).toThrow();
  });

  it('should throw error when vf <= 0', () => {
    expect(() => calculateMRR(3, 6, 0)).toThrow();
  });
});

describe('calculatePower', () => {
  // Formula: Pc = (Q * Kc) / (60000 * eta), eta=0.80

  it('Scenario A: Q=15.28, Kc=2000 -> Pc=0.64 kW (+-0.01)', () => {
    const pc = calculatePower(15.28, 2000, 0.80);
    expect(pc).toBeCloseTo(0.64, 1);
  });

  it('Scenario B: Q=28.47, Kc=700 -> Pc=0.42 kW (+-0.01)', () => {
    const pc = calculatePower(28.47, 700, 0.80);
    expect(pc).toBeCloseTo(0.42, 1);
  });

  it('Scenario C: Q=6.05, Kc=2400 -> Pc=0.30 kW (+-0.01)', () => {
    const pc = calculatePower(6.05, 2400, 0.80);
    expect(pc).toBeCloseTo(0.30, 1);
  });

  it('should throw error when mrr <= 0', () => {
    expect(() => calculatePower(0, 2000, 0.80)).toThrow();
  });

  it('should throw error when kc <= 0', () => {
    expect(() => calculatePower(15, 0, 0.80)).toThrow();
  });

  it('should throw error when efficiency <= 0 or > 1', () => {
    expect(() => calculatePower(15, 2000, 0)).toThrow();
    expect(() => calculatePower(15, 2000, 1.5)).toThrow();
  });
});

describe('calculateTorque', () => {
  // Formula: M = (Pc * 9549) / n

  it('Scenario A: Pc=0.637, n=2652.58 -> M=2.29 Nm (+-0.01)', () => {
    // Using the non-rounded Pc for better precision
    const pc = (15.28 * 2000) / (60000 * 0.80);
    const torque = calculateTorque(pc, 2652.58);
    expect(torque).toBeCloseTo(2.29, 1);
  });

  it('Scenario B: Pc=0.415, n=15915.49 -> M=0.25 Nm (+-0.01)', () => {
    const pc = (28.47 * 700) / (60000 * 0.80);
    const torque = calculateTorque(pc, 15915.49);
    expect(torque).toBeCloseTo(0.25, 1);
  });

  it('Scenario C: Pc=0.303, n=3780.23 -> M=0.77 Nm (+-0.01)', () => {
    const pc = (6.05 * 2400) / (60000 * 0.80);
    const torque = calculateTorque(pc, 3780.23);
    expect(torque).toBeCloseTo(0.77, 1);
  });

  it('should throw error when power <= 0', () => {
    expect(() => calculateTorque(0, 2652)).toThrow();
  });

  it('should throw error when rpm <= 0', () => {
    expect(() => calculateTorque(0.64, 0)).toThrow();
  });
});
