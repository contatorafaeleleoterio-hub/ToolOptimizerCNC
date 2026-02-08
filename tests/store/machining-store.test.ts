import { describe, it, expect, beforeEach } from 'vitest';
import { useMachiningStore } from '@/store/machining-store';
import { TipoUsinagem, LIMITES_PADRAO_MAQUINA } from '@/types/index';

function getState() {
  return useMachiningStore.getState();
}

describe('machining-store', () => {
  beforeEach(() => {
    getState().reset();
  });

  describe('initial state', () => {
    it('has correct default materialId', () => {
      expect(getState().materialId).toBe(2);
    });

    it('has correct default ferramenta', () => {
      const f = getState().ferramenta;
      expect(f.tipo).toBe('topo');
      expect(f.diametro).toBe(10);
      expect(f.numeroArestas).toBe(4);
      expect(f.balanco).toBe(30);
    });

    it('has correct default tipoOperacao', () => {
      expect(getState().tipoOperacao).toBe(TipoUsinagem.DESBASTE);
    });

    it('has correct default parametros', () => {
      const p = getState().parametros;
      expect(p.ap).toBe(2);
      expect(p.ae).toBe(5);
      expect(p.fz).toBe(0.1);
      expect(p.vc).toBe(100);
    });

    it('has correct default limitesMaquina', () => {
      expect(getState().limitesMaquina).toEqual(LIMITES_PADRAO_MAQUINA);
    });

    it('has null resultado initially', () => {
      expect(getState().resultado).toBeNull();
    });

    it('has correct default safetyFactor', () => {
      expect(getState().safetyFactor).toBe(0.8);
    });
  });

  describe('setMaterial', () => {
    it('updates materialId', () => {
      getState().setMaterial(3);
      expect(getState().materialId).toBe(3);
    });

    it('triggers recalculation', () => {
      getState().calcular(); // initial calc
      expect(getState().resultado).not.toBeNull();
      getState().setMaterial(4);
      expect(getState().resultado).not.toBeNull();
    });
  });

  describe('setFerramenta', () => {
    it('merges partial ferramenta — changes D, keeps Z', () => {
      getState().setFerramenta({ diametro: 12 });
      const f = getState().ferramenta;
      expect(f.diametro).toBe(12);
      expect(f.numeroArestas).toBe(4); // unchanged
      expect(f.tipo).toBe('topo'); // unchanged
      expect(f.balanco).toBe(30); // unchanged
    });

    it('merges multiple fields', () => {
      getState().setFerramenta({ diametro: 8, balanco: 40 });
      const f = getState().ferramenta;
      expect(f.diametro).toBe(8);
      expect(f.balanco).toBe(40);
      expect(f.numeroArestas).toBe(4);
    });
  });

  describe('setParametros', () => {
    it('merges partial parametros', () => {
      getState().setParametros({ vc: 150 });
      const p = getState().parametros;
      expect(p.vc).toBe(150);
      expect(p.ap).toBe(2); // unchanged
      expect(p.ae).toBe(5); // unchanged
      expect(p.fz).toBe(0.1); // unchanged
    });
  });

  describe('setLimitesMaquina', () => {
    it('merges partial limites', () => {
      getState().setLimitesMaquina({ maxRPM: 8000 });
      const l = getState().limitesMaquina;
      expect(l.maxRPM).toBe(8000);
      expect(l.maxPotencia).toBe(15); // unchanged
    });
  });

  describe('setSafetyFactor', () => {
    it('updates safetyFactor', () => {
      getState().setSafetyFactor(0.7);
      expect(getState().safetyFactor).toBe(0.7);
    });
  });

  describe('calcular() — Scenario A (Aço 1045, D=10, Vc=100)', () => {
    // Defaults: materialId=2, D=10, Z=4, fz=0.1, vc=100, ap=2, ae=5
    // ae/D = 5/10 = 0.5 → no chip thinning
    // RPM = (100*1000)/(pi*10) = 3183.10
    // Feed = 0.1 * 4 * 3183.10 = 1273.24
    // MRR = (2*5*1273.24)/1000 = 12.7324
    // kc = 2165 (Aço 1045 kc1_1)
    // potenciaMotor = (12.7324 * 2165) / (60000 * 0.85) = 0.5406
    // potenciaCorte = (12.7324 * 2165) / 60000 = 0.4595
    // torque = (0.5406 * 9549) / 3183.10 = 1.621

    it('calculates RPM ≈ 3183', () => {
      getState().calcular();
      const r = getState().resultado;
      expect(r).not.toBeNull();
      expect(Math.abs(r!.rpm - 3183)).toBeLessThanOrEqual(1);
    });

    it('calculates feed ≈ 1273 mm/min', () => {
      getState().calcular();
      const r = getState().resultado!;
      expect(Math.abs(r.avanco - 1273)).toBeLessThanOrEqual(1);
    });

    it('does not apply chip thinning (ae=50%D)', () => {
      getState().calcular();
      const r = getState().resultado!;
      expect(r.fzEfetivo).toBe(0.1);
      expect(r.seguranca.ctf).toBe(1.0);
    });

    it('calculates MRR', () => {
      getState().calcular();
      const r = getState().resultado!;
      // MRR = (2 * 5 * ~1273.24) / 1000 ≈ 12.73
      expect(r.mrr).toBeCloseTo(12.73, 1);
    });

    it('calculates power with safety factor applied', () => {
      getState().calcular();
      const r = getState().resultado!;
      // potenciaMotor raw ≈ 0.5406, * 0.8 safety = 0.4325
      expect(r.potenciaMotor).toBeCloseTo(0.5406 * 0.8, 2);
      expect(r.potenciaCorte).toBeCloseTo(0.4595 * 0.8, 2);
    });

    it('calculates torque with safety factor applied', () => {
      getState().calcular();
      const r = getState().resultado!;
      // torque raw ≈ 1.621, * 0.8 safety ≈ 1.297
      expect(r.torque).toBeCloseTo(1.621 * 0.8, 1);
    });

    it('has verde safety level (L/D=3.0)', () => {
      getState().calcular();
      const r = getState().resultado!;
      expect(r.seguranca.nivel).toBe('verde');
      expect(r.seguranca.razaoLD).toBe(3.0);
    });

    it('computes vcReal ≈ vc input', () => {
      getState().calcular();
      const r = getState().resultado!;
      // vcReal = (pi * 10 * rpm) / 1000 should ≈ 100
      expect(r.vcReal).toBeCloseTo(100, 0);
    });
  });

  describe('calcular() — invalid material', () => {
    it('sets resultado to null for non-existent material', () => {
      getState().calcular(); // valid first
      expect(getState().resultado).not.toBeNull();
      getState().setMaterial(999);
      expect(getState().resultado).toBeNull();
    });
  });

  describe('calcular() — L/D warnings', () => {
    it('generates amarelo warning when L/D > 3 and < 4', () => {
      getState().setFerramenta({ balanco: 35 }); // L/D = 35/10 = 3.5
      const r = getState().resultado!;
      expect(r.seguranca.nivel).toBe('amarelo');
      expect(r.seguranca.avisos.some((a) => a.includes('alerta'))).toBe(true);
    });

    it('generates vermelho warning when L/D = 4', () => {
      getState().setFerramenta({ balanco: 40 }); // L/D = 40/10 = 4.0
      const r = getState().resultado!;
      expect(r.seguranca.nivel).toBe('vermelho');
      expect(r.seguranca.avisos.some((a) => a.includes('crítica'))).toBe(true);
    });

    it('generates bloqueado when L/D > 6', () => {
      getState().setFerramenta({ balanco: 70 }); // L/D = 70/10 = 7.0
      const r = getState().resultado!;
      expect(r.seguranca.nivel).toBe('bloqueado');
      expect(r.seguranca.avisos.some((a) => a.includes('BLOQUEADO'))).toBe(true);
    });
  });

  describe('calcular() — safety factor', () => {
    it('applies different safety factors', () => {
      getState().calcular();
      const r1 = getState().resultado!;
      const power1 = r1.potenciaMotor;

      getState().setSafetyFactor(0.7);
      const r2 = getState().resultado!;
      const power2 = r2.potenciaMotor;

      // power2/power1 should be 0.7/0.8
      expect(power2 / power1).toBeCloseTo(0.7 / 0.8, 2);
    });
  });

  describe('calcular() — machine limits', () => {
    it('generates warning when RPM exceeds limit', () => {
      getState().setLimitesMaquina({ maxRPM: 2000 });
      const r = getState().resultado!;
      expect(r.seguranca.avisos.some((a) => a.includes('RPM'))).toBe(true);
      expect(r.seguranca.nivel).toBe('vermelho');
    });

    it('generates warning when power exceeds limit', () => {
      getState().setLimitesMaquina({ maxPotencia: 0.01 });
      const r = getState().resultado!;
      expect(r.seguranca.avisos.some((a) => a.includes('Potência'))).toBe(true);
    });

    it('generates warning when feed exceeds limit', () => {
      getState().setLimitesMaquina({ maxAvanco: 500 });
      const r = getState().resultado!;
      expect(r.seguranca.avisos.some((a) => a.includes('Avanço'))).toBe(true);
    });
  });

  describe('reset()', () => {
    it('restores initial state', () => {
      getState().setMaterial(5);
      getState().setFerramenta({ diametro: 20 });
      getState().setParametros({ vc: 200 });
      getState().setSafetyFactor(0.7);
      getState().calcular();

      getState().reset();

      expect(getState().materialId).toBe(2);
      expect(getState().ferramenta.diametro).toBe(10);
      expect(getState().parametros.vc).toBe(100);
      expect(getState().safetyFactor).toBe(0.8);
      expect(getState().resultado).toBeNull();
    });
  });
});
