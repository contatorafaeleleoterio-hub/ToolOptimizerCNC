import { describe, it, expect } from 'vitest';
import { FACTORY_TOOLS, getToolGeometry, getDiameterLimits } from '../tools.js';

describe('Tools (Geometrias)', () => {
  it('deve possuir exatamente 17 geometrias canônicas', () => {
    expect(FACTORY_TOOLS.length).toBe(17);
  });

  it('deve buscar uma geometria por id', () => {
    const tool = getToolGeometry('fresa-toroidal');
    expect(tool).toBeDefined();
    expect(tool?.name).toBe('Toroidal');
    expect(tool?.extraFields).toContain('r');
  });

  describe('Limites de Diâmetro', () => {
    it('deve retornar os limites corretos para Broca Helicoidal (substância MD)', () => {
      const tool = getToolGeometry('broca-helicoidal')!;
      const limits = getDiameterLimits(tool, 'MD');
      expect(limits.min).toBe(2.0);
      expect(limits.max).toBe(20.0);
    });

    it('deve retornar os limites corretos para Broca Helicoidal (substância HSS-Co)', () => {
      const tool = getToolGeometry('broca-helicoidal')!;
      const limits = getDiameterLimits(tool, 'HSS-Co');
      expect(limits.min).toBe(0.5);
      expect(limits.max).toBe(25.0);
    });

    it('deve lidar com limites fixos (U-Drill)', () => {
      const tool = getToolGeometry('broca-udrill')!;
      const limits = getDiameterLimits(tool, 'MD');
      expect(limits.min).toBe(12.0);
      expect(limits.max).toBe(60.0);
    });
    
    it('deve retornar null se não houver limite', () => {
      const tool = getToolGeometry('fresa-topo-reto')!;
      const limits = getDiameterLimits(tool, 'MD');
      expect(limits.min).toBeNull();
      expect(limits.max).toBeNull();
    });
  });
});
