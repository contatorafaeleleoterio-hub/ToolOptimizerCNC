import { describe, it, expect } from 'vitest';
import { MATERIAIS, getMaterialById } from '../../src/data/materials';
import { TipoUsinagem } from '../../src/types';

describe('MATERIAIS', () => {
  it('should have exactly 9 materials', () => {
    expect(MATERIAIS).toHaveLength(9);
  });

  it('should have unique ids', () => {
    const ids = MATERIAIS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have all required fields populated', () => {
    for (const m of MATERIAIS) {
      expect(m.id).toBeGreaterThan(0);
      expect(m.nome.length).toBeGreaterThan(0);
      expect(['P', 'M', 'N', 'H']).toContain(m.iso);
      expect(m.dureza.length).toBeGreaterThan(0);
      expect(m.kc1_1).toBeGreaterThan(0);
      expect(m.mc).toBeGreaterThan(0);
      expect(['validado', 'estimado']).toContain(m.status);
    }
  });

  it('should have valid vcRanges (min < max) for all operations', () => {
    const ops = [
      TipoUsinagem.DESBASTE,
      TipoUsinagem.SEMI_ACABAMENTO,
      TipoUsinagem.ACABAMENTO,
    ];
    for (const m of MATERIAIS) {
      for (const op of ops) {
        const [min, max] = m.vcRanges[op];
        expect(min).toBeLessThan(max);
        expect(min).toBeGreaterThan(0);
      }
    }
  });

  it('should have correct ISO classes', () => {
    expect(getMaterialById(1)?.iso).toBe('P'); // Aço 1020
    expect(getMaterialById(2)?.iso).toBe('P'); // Aço 1045
    expect(getMaterialById(3)?.iso).toBe('M'); // Inox 304
    expect(getMaterialById(4)?.iso).toBe('N'); // Al 6061-T6
    expect(getMaterialById(5)?.iso).toBe('P'); // P20
    expect(getMaterialById(6)?.iso).toBe('P'); // 2711
    expect(getMaterialById(7)?.iso).toBe('P'); // 8620 núcleo
    expect(getMaterialById(8)?.iso).toBe('H'); // 8620 cementado
    expect(getMaterialById(9)?.iso).toBe('H'); // H13
  });

  describe('validation status', () => {
    it('should have 3 validated materials', () => {
      const validated = MATERIAIS.filter((m) => m.status === 'validado');
      expect(validated).toHaveLength(3);
    });

    it('should have Aço 1020, Aço 1045, Inox 304 as validated', () => {
      expect(getMaterialById(1)?.status).toBe('validado');
      expect(getMaterialById(2)?.status).toBe('validado');
      expect(getMaterialById(3)?.status).toBe('validado');
    });

    it('should have 6 estimated materials', () => {
      const estimated = MATERIAIS.filter((m) => m.status === 'estimado');
      expect(estimated).toHaveLength(6);
    });

    it('should have remaining 6 materials as estimated', () => {
      for (const id of [4, 5, 6, 7, 8, 9]) {
        expect(getMaterialById(id)?.status).toBe('estimado');
      }
    });
  });

  describe('Kienzle data', () => {
    it('Aço 1020: kc1_1=1800, mc=0.17', () => {
      const m = getMaterialById(1);
      expect(m?.kc1_1).toBe(1800);
      expect(m?.mc).toBe(0.17);
    });

    it('Aço 1045: kc1_1=2165, mc=0.155', () => {
      const m = getMaterialById(2);
      expect(m?.kc1_1).toBe(2165);
      expect(m?.mc).toBe(0.155);
    });

    it('Inox 304: kc1_1=2150, mc=0.185', () => {
      const m = getMaterialById(3);
      expect(m?.kc1_1).toBe(2150);
      expect(m?.mc).toBe(0.185);
    });

    it('Al 6061-T6: kc1_1=1200, mc=0.75', () => {
      const m = getMaterialById(4);
      expect(m?.kc1_1).toBe(1200);
      expect(m?.mc).toBe(0.75);
    });
  });

  describe('Vc ranges spot-checks', () => {
    it('Aço 1045 desbaste: [150, 200]', () => {
      const m = getMaterialById(2);
      expect(m?.vcRanges[TipoUsinagem.DESBASTE]).toEqual([150, 200]);
    });

    it('Al 6061-T6 acabamento: [600, 1000]', () => {
      const m = getMaterialById(4);
      expect(m?.vcRanges[TipoUsinagem.ACABAMENTO]).toEqual([600, 1000]);
    });

    it('Inox 304 semi-acabamento: [80, 120]', () => {
      const m = getMaterialById(3);
      expect(m?.vcRanges[TipoUsinagem.SEMI_ACABAMENTO]).toEqual([80, 120]);
    });
  });
});

describe('getMaterialById', () => {
  it('should return correct material for valid id', () => {
    const m = getMaterialById(1);
    expect(m).toBeDefined();
    expect(m?.nome).toBe('Aço 1020');
  });

  it('should return undefined for invalid id', () => {
    expect(getMaterialById(0)).toBeUndefined();
    expect(getMaterialById(99)).toBeUndefined();
    expect(getMaterialById(-1)).toBeUndefined();
  });
});
