import { describe, it, expect } from 'vitest';
import { calculateFeedRate } from '@/engine/feed';

describe('calculateFeedRate', () => {
  // Formula: Vf = fz_efetivo * Z * n

  it('Scenario A: fz=0.08, Z=4, n=2652.58 -> Vf=848.83 (+-1)', () => {
    const vf = calculateFeedRate(0.08, 4, 2652.58);
    expect(vf).toBeCloseTo(848.83, 0);
  });

  it('Scenario B: fz_corr=0.2236, Z=4, n=15915.49 -> Vf~14235 (+-1)', () => {
    // Using rounded fz from reference: 0.2236 * 4 * 15915.49 = 14234.81
    const vf = calculateFeedRate(0.2236, 4, 15915.49);
    expect(Math.abs(vf - 14234.03)).toBeLessThanOrEqual(1);
  });

  it('Scenario C: fz_corr=0.10, Z=4, n=3780.23 -> Vf=1512.09 (+-1)', () => {
    const vf = calculateFeedRate(0.10, 4, 3780.23);
    expect(vf).toBeCloseTo(1512.09, 0);
  });

  it('should throw error when fz <= 0', () => {
    expect(() => calculateFeedRate(0, 4, 1000)).toThrow();
  });

  it('should throw error when Z < 1', () => {
    expect(() => calculateFeedRate(0.08, 0, 1000)).toThrow();
  });

  it('should throw error when rpm <= 0', () => {
    expect(() => calculateFeedRate(0.08, 4, 0)).toThrow();
  });
});
