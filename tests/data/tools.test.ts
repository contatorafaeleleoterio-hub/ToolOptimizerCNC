import { describe, it, expect } from 'vitest';
import { FERRAMENTAS_PADRAO, DIAMETROS_PADRAO, RAIOS_PADRAO, RAIOS_PONTA } from '../../src/data/tools';

describe('FERRAMENTAS_PADRAO', () => {
  it('should have 3 tool types', () => {
    expect(FERRAMENTAS_PADRAO).toHaveLength(3);
  });

  it('should include toroidal, esferica, topo types', () => {
    const tipos = FERRAMENTAS_PADRAO.map((f) => f.tipo);
    expect(tipos).toContain('toroidal');
    expect(tipos).toContain('esferica');
    expect(tipos).toContain('topo');
  });

  it('should have standard diameters for each type', () => {
    for (const f of FERRAMENTAS_PADRAO) {
      expect(f.diametros).toEqual([6, 8, 10, 12, 16, 20]);
    }
  });

  it('should have Z >= 1 for all types', () => {
    for (const f of FERRAMENTAS_PADRAO) {
      expect(f.zPadrao).toBeGreaterThanOrEqual(1);
    }
  });

  it('toroidal should have raioQuina defined', () => {
    const toroidal = FERRAMENTAS_PADRAO.find((f) => f.tipo === 'toroidal');
    expect(toroidal?.raioQuina).toBe(1);
  });

  it('esferica and topo should have raioQuina as null', () => {
    const esferica = FERRAMENTAS_PADRAO.find((f) => f.tipo === 'esferica');
    const topo = FERRAMENTAS_PADRAO.find((f) => f.tipo === 'topo');
    expect(esferica?.raioQuina).toBeNull();
    expect(topo?.raioQuina).toBeNull();
  });

  it('should have Portuguese descriptions', () => {
    for (const f of FERRAMENTAS_PADRAO) {
      expect(f.descricao.length).toBeGreaterThan(0);
    }
  });
});

describe('RAIOS_PADRAO', () => {
  it('should have 2 standard radii for UI buttons', () => {
    expect(RAIOS_PADRAO).toHaveLength(2);
  });

  it('should match [0.5, 1.0]', () => {
    expect([...RAIOS_PADRAO]).toEqual([0.5, 1.0]);
  });

  it('should be a subset of RAIOS_PONTA', () => {
    for (const r of RAIOS_PADRAO) {
      expect([...RAIOS_PONTA]).toContain(r);
    }
  });
});

describe('DIAMETROS_PADRAO', () => {
  it('should have 6 standard diameters', () => {
    expect(DIAMETROS_PADRAO).toHaveLength(6);
  });

  it('should match [6, 8, 10, 12, 16, 20]', () => {
    expect([...DIAMETROS_PADRAO]).toEqual([6, 8, 10, 12, 16, 20]);
  });
});
