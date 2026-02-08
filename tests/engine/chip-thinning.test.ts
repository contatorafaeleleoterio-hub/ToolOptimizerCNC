import { describe, it, expect } from 'vitest';
import { calculateEffectiveFz } from '@/engine/chip-thinning';

describe('calculateEffectiveFz', () => {
  // Formula: when ae < 50%D -> fz_corr = fz / sqrt(ae/D)

  it('Scenario A: ae=6, D=12 -> ae/D=0.50 -> no CTF, fz_effective=0.08', () => {
    const result = calculateEffectiveFz(0.08, 6, 12);
    expect(result.fzEfetivo).toBeCloseTo(0.08, 4);
    expect(result.ctfApplied).toBe(false);
  });

  it('Scenario B: ae=2, D=10 -> ae/D=0.20 -> fz_corr=0.10/sqrt(0.20)=0.2236', () => {
    const result = calculateEffectiveFz(0.10, 2, 10);
    expect(result.fzEfetivo).toBeCloseTo(0.2236, 3);
    expect(result.ctfApplied).toBe(true);
  });

  it('Scenario C: ae=2, D=8 -> ae/D=0.25 -> fz_corr=0.05/sqrt(0.25)=0.10', () => {
    const result = calculateEffectiveFz(0.05, 2, 8);
    expect(result.fzEfetivo).toBeCloseTo(0.10, 4);
    expect(result.ctfApplied).toBe(true);
  });

  it('ae=D (100%) -> no CTF applied', () => {
    const result = calculateEffectiveFz(0.10, 10, 10);
    expect(result.fzEfetivo).toBeCloseTo(0.10, 4);
    expect(result.ctfApplied).toBe(false);
  });

  it('should throw error when ae > D', () => {
    expect(() => calculateEffectiveFz(0.10, 15, 10)).toThrow();
  });

  it('should throw error when ae <= 0', () => {
    expect(() => calculateEffectiveFz(0.10, 0, 10)).toThrow();
  });

  it('should throw error when D <= 0', () => {
    expect(() => calculateEffectiveFz(0.10, 5, 0)).toThrow();
  });

  it('should throw error when fz <= 0', () => {
    expect(() => calculateEffectiveFz(0, 5, 10)).toThrow();
  });
});
