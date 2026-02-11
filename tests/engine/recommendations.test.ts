import { describe, it, expect } from 'vitest';
import { getRecommendedParams } from '../../src/engine/recommendations';
import { MATERIAIS } from '../../src/data/materials';
import { TipoUsinagem } from '../../src/types';

const aco1045 = MATERIAIS.find((m) => m.id === 2)!;
const aluminio = MATERIAIS.find((m) => m.id === 4)!;
const inox304 = MATERIAIS.find((m) => m.id === 3)!;

describe('getRecommendedParams', () => {
  it('returns Vc as midpoint of material vcRange for desbaste', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.DESBASTE, 10);
    // Aço 1045 desbaste: [150, 200] → midpoint 175
    expect(result.vc).toBe(175);
  });

  it('returns Vc as midpoint for acabamento', () => {
    const result = getRecommendedParams(aluminio, TipoUsinagem.ACABAMENTO, 10);
    // Alumínio acabamento: [600, 1000] → midpoint 800
    expect(result.vc).toBe(800);
  });

  it('returns ap = 1.0×D for desbaste', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.DESBASTE, 10);
    expect(result.ap).toBe(10);
  });

  it('returns ap = 0.5×D for semi-acabamento', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.SEMI_ACABAMENTO, 10);
    expect(result.ap).toBe(5);
  });

  it('returns ap = 0.15×D for acabamento', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 10);
    expect(result.ap).toBe(1.5);
  });

  it('returns ae = 50%D for desbaste', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.DESBASTE, 12);
    expect(result.ae).toBe(6);
  });

  it('returns ae = 30%D for semi-acabamento', () => {
    const result = getRecommendedParams(inox304, TipoUsinagem.SEMI_ACABAMENTO, 10);
    expect(result.ae).toBe(3);
  });

  it('returns ae = 10%D for acabamento', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 10);
    expect(result.ae).toBe(1);
  });

  it('returns fz = 0.10 for desbaste', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.DESBASTE, 10);
    expect(result.fz).toBe(0.10);
  });

  it('returns fz = 0.07 for semi-acabamento', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.SEMI_ACABAMENTO, 10);
    expect(result.fz).toBe(0.07);
  });

  it('returns fz = 0.04 for acabamento', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 10);
    expect(result.fz).toBe(0.04);
  });

  it('clamps ap to minimum 0.1 for very small diameters', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 0.2);
    expect(result.ap).toBeGreaterThanOrEqual(0.1);
  });

  it('clamps ae to minimum 0.1 for very small diameters', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 0.2);
    expect(result.ae).toBeGreaterThanOrEqual(0.1);
  });

  it('works for all 9 materials × 3 operations', () => {
    for (const mat of MATERIAIS) {
      for (const op of Object.values(TipoUsinagem)) {
        const result = getRecommendedParams(mat, op, 10);
        expect(result.vc).toBeGreaterThan(0);
        expect(result.ap).toBeGreaterThan(0);
        expect(result.ae).toBeGreaterThan(0);
        expect(result.fz).toBeGreaterThan(0);
      }
    }
  });
});
