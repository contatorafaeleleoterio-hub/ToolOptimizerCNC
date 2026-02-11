import { describe, it, expect } from 'vitest';
import { getRecommendedParams } from '../../src/engine/recommendations';
import { MATERIAIS } from '../../src/data/materials';
import { TipoUsinagem } from '../../src/types';

const aco1045 = MATERIAIS.find((m) => m.id === 2)!;
const aluminio = MATERIAIS.find((m) => m.id === 4)!;
const inox304 = MATERIAIS.find((m) => m.id === 3)!;

describe('getRecommendedParams', () => {
  // --- Vc from diameter-specific tables (clamped to vcRanges) ---

  it('returns Vc from diameter table, clamped to vcRange for desbaste', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.DESBASTE, 10);
    // Grupo3 D=10: Vc=260 → clamped to [150,200] = 200
    expect(result.vc).toBe(200);
  });

  it('returns Vc from diameter table for acabamento', () => {
    const result = getRecommendedParams(aluminio, TipoUsinagem.ACABAMENTO, 10);
    // Alumínio D=10 acabamento: Vc=1100 → clamped to [600,1000] = 1000
    expect(result.vc).toBe(1000);
  });

  // --- AP rules from Padronização ---

  it('returns ap = 0.8×D for desbaste when D > 6', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.DESBASTE, 10);
    expect(result.ap).toBe(8); // 0.8 × 10
  });

  it('returns ap = 1.0×D for desbaste when D ≤ 6', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.DESBASTE, 6);
    expect(result.ap).toBe(6); // 1.0 × 6
  });

  it('returns ap = 0.5×D for semi-acabamento', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.SEMI_ACABAMENTO, 10);
    expect(result.ap).toBe(5);
  });

  it('returns ap = 0.2×D for acabamento', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 10);
    expect(result.ap).toBe(2); // 0.2 × 10
  });

  // --- AE rules from Padronização ---

  it('returns ae = 45%D for desbaste (aço)', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.DESBASTE, 12);
    expect(result.ae).toBe(5.4); // 0.45 × 12
  });

  it('returns ae = 50%D for desbaste (alumínio)', () => {
    const result = getRecommendedParams(aluminio, TipoUsinagem.DESBASTE, 10);
    expect(result.ae).toBe(5); // 0.50 × 10
  });

  it('returns ae = 30%D for semi-acabamento', () => {
    const result = getRecommendedParams(inox304, TipoUsinagem.SEMI_ACABAMENTO, 10);
    expect(result.ae).toBe(3);
  });

  it('returns ae = 5%D for acabamento (aço P)', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 10);
    expect(result.ae).toBe(0.5); // 0.05 × 10
  });

  // --- fz from diameter-specific tables ---

  it('returns fz from grupo3 table for desbaste D=10', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.DESBASTE, 10);
    // Grupo3 (1045) D=10: fz = 0.140 × 1.10 = 0.154
    expect(result.fz).toBe(0.154);
  });

  it('returns fz from semi-acabamento interpolation', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.SEMI_ACABAMENTO, 10);
    // midpoint of desbaste(0.154) and acabamento(0.0924) = 0.1232
    expect(result.fz).toBe(0.1232);
  });

  it('returns fz from acabamento rule (60% of desbaste)', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 10);
    // Grupo3 acabamento fz = 0.154 × 0.60 = 0.0924
    expect(result.fz).toBe(0.0924);
  });

  // --- Clamp safety for very small diameters ---

  it('clamps ap to minimum 0.1 for very small diameters', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 0.2);
    expect(result.ap).toBeGreaterThanOrEqual(0.1);
  });

  it('clamps ae to minimum 0.01 for very small diameters', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 0.2);
    // ae = 0.05 × 0.2 = 0.01 — minimum for acabamento precision
    expect(result.ae).toBeGreaterThanOrEqual(0.01);
    expect(result.ae).toBeGreaterThan(0);
  });

  it('returns fz from table even for small diameters', () => {
    const result = getRecommendedParams(aco1045, TipoUsinagem.ACABAMENTO, 0.2);
    // Grupo3 D=0.2: fz_desb = 0.003×1.10 = 0.0033, acab = 0.0033×0.60 ≈ 0.002
    expect(result.fz).toBeGreaterThanOrEqual(0.001);
    expect(result.fz).toBeLessThan(0.01);
  });

  // --- Exhaustive coverage ---

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
