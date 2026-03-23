import { describe, it, expect, beforeEach } from 'vitest';
import { useMachiningStore } from '@/store/machining-store';
import { TipoUsinagem, LIMITES_PADRAO_MAQUINA } from '@/types/index';
import type { ResultadoUsinagem, ValidatedSimulation } from '@/types/index';

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
      expect(f.tipo).toBe('toroidal');
      expect(f.diametro).toBe(6);
      expect(f.numeroArestas).toBe(4);
      expect(f.balanco).toBe(25);
      expect(f.raioQuina).toBe(1.0);
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

    it('has empty manualOverrides initially', () => {
      expect(getState().manualOverrides).toEqual({});
    });
  });

  describe('setMaterial', () => {
    it('updates materialId', () => {
      getState().setMaterial(3);
      expect(getState().materialId).toBe(3);
    });

    it('clears resultado on material change', () => {
      getState().calcular();
      expect(getState().resultado).not.toBeNull();
      getState().setMaterial(4);
      // After changing material, resultado should be null until user clicks Simular
      expect(getState().resultado).toBeNull();
    });
  });

  describe('setFerramenta', () => {
    it('merges partial ferramenta — changes D, keeps Z', () => {
      getState().setFerramenta({ diametro: 12 });
      const f = getState().ferramenta;
      expect(f.diametro).toBe(12);
      expect(f.numeroArestas).toBe(4);
      expect(f.tipo).toBe('toroidal');
      expect(f.balanco).toBe(25);
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
      expect(p.ap).toBe(2);
      expect(p.ae).toBe(5);
      expect(p.fz).toBe(0.1);
    });
  });

  describe('setLimitesMaquina', () => {
    it('merges partial limites', () => {
      getState().setLimitesMaquina({ maxRPM: 8000 });
      const l = getState().limitesMaquina;
      expect(l.maxRPM).toBe(8000);
      expect(l.maxPotencia).toBe(15);
    });
  });

  describe('setSafetyFactor', () => {
    it('updates safetyFactor', () => {
      getState().setSafetyFactor(0.7);
      expect(getState().safetyFactor).toBe(0.7);
    });
  });

  describe('calcular() — Scenario A (Aço 1045, D=10, Vc=100)', () => {
    beforeEach(() => {
      getState().setFerramenta({ tipo: 'topo', diametro: 10, balanco: 30 });
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    });

    it('calculates RPM ≈ 3183', () => {
      getState().calcular();
      const r = getState().resultado!;
      expect(Math.abs(r.rpm - 3183)).toBeLessThanOrEqual(1);
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
      expect(r.mrr).toBeCloseTo(12.73, 1);
    });

    it('calculates power with safety factor applied', () => {
      getState().calcular();
      const r = getState().resultado!;
      expect(r.potenciaMotor).toBeCloseTo(0.5406 * 0.8, 2);
      expect(r.potenciaCorte).toBeCloseTo(0.4595 * 0.8, 2);
    });

    it('calculates torque with safety factor applied', () => {
      getState().calcular();
      const r = getState().resultado!;
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
      expect(r.vcReal).toBeCloseTo(100, 0);
    });
  });

  describe('calcular() — invalid material', () => {
    it('sets resultado to null for non-existent material', () => {
      getState().calcular();
      expect(getState().resultado).not.toBeNull();
      getState().setMaterial(999);
      expect(getState().resultado).toBeNull();
    });
  });

  describe('calcular() — L/D warnings', () => {
    beforeEach(() => {
      getState().setFerramenta({ diametro: 10 });
      // Set explicit safe params to isolate L/D testing from auto-populate
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    });

    it('generates amarelo warning when L/D > 3 and < 4', () => {
      getState().setFerramenta({ balanco: 35, diametro: 10 }); // L/D = 3.5
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      getState().calcular(); // Need to calculate after setting parameters
      const r = getState().resultado!;
      expect(r.seguranca.nivel).toBe('amarelo');
      expect(r.seguranca.avisos.some((a) => a.includes('alerta'))).toBe(true);
    });

    it('generates vermelho warning when L/D = 4', () => {
      getState().setFerramenta({ balanco: 40, diametro: 10 }); // L/D = 4.0
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      getState().calcular(); // Need to calculate after setting parameters
      const r = getState().resultado!;
      expect(r.seguranca.nivel).toBe('vermelho');
      expect(r.seguranca.avisos.some((a) => a.includes('crítica'))).toBe(true);
    });

    it('generates bloqueado when L/D > 6', () => {
      getState().setFerramenta({ balanco: 70, diametro: 10 }); // L/D = 7.0
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      getState().calcular(); // Need to calculate after setting parameters
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
      getState().calcular(); // Need to recalculate after changing safety factor
      const r2 = getState().resultado!;
      const power2 = r2.potenciaMotor;

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

  describe('manual overrides', () => {
    it('setManualRPM overrides calculated RPM', () => {
      getState().calcular();
      getState().setManualRPM(5000);
      const r = getState().resultado!;
      expect(r.rpm).toBe(5000);
    });

    it('setManualFeed overrides calculated feed', () => {
      getState().calcular();
      getState().setManualFeed(2000);
      const r = getState().resultado!;
      expect(r.avanco).toBe(2000);
    });

    it('clearManualOverrides restores calculated values', () => {
      getState().calcular();
      const originalRpm = getState().resultado!.rpm;
      getState().setManualRPM(5000);
      expect(getState().resultado!.rpm).toBe(5000);
      getState().clearManualOverrides();
      expect(getState().resultado!.rpm).toBeCloseTo(originalRpm, 0);
    });

    it('setParametros clears manual overrides', () => {
      getState().calcular();
      getState().setManualRPM(5000);
      expect(getState().manualOverrides.rpm).toBe(5000);
      getState().setParametros({ vc: 150 });
      expect(getState().manualOverrides).toEqual({});
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
      expect(getState().ferramenta.diametro).toBe(6);
      expect(getState().parametros.vc).toBe(100);
      expect(getState().safetyFactor).toBe(0.8);
      expect(getState().resultado).toBeNull();
      expect(getState().manualOverrides).toEqual({});
    });
  });

  describe('RPM override recalculates feed (bug fix)', () => {
    it('feed changes when RPM is manually overridden', () => {
      getState().calcular();
      const originalFeed = getState().resultado!.avanco;

      getState().setManualRPM(8000);
      const newFeed = getState().resultado!.avanco;

      expect(newFeed).not.toBeCloseTo(originalFeed, 0);
      expect(getState().resultado!.rpm).toBe(8000);
    });

    it('uses manual RPM in feed calculation formula', () => {
      getState().calcular();
      getState().setManualRPM(6000);
      const r = getState().resultado!;
      const expectedFeed = r.fzEfetivo * getState().ferramenta.numeroArestas * 6000;
      expect(Math.abs(r.avanco - expectedFeed)).toBeLessThanOrEqual(1);
    });
  });

  describe('preferences', () => {
    it('has default preferences', () => {
      expect(getState().preferences.decimals).toBe(2);
      expect(getState().preferences.machineName).toBe('');
    });

    it('setPreferences merges partial update', () => {
      getState().setPreferences({ machineName: 'Romi D800' });
      expect(getState().preferences.machineName).toBe('Romi D800');
      expect(getState().preferences.decimals).toBe(2);
    });

    it('setPreferences updates decimals', () => {
      getState().setPreferences({ decimals: 4 });
      expect(getState().preferences.decimals).toBe(4);
    });
  });

  describe('safetyRules', () => {
    it('has default safety rules', () => {
      expect(getState().safetyRules.ld.seguro).toBe(3);
      expect(getState().safetyRules.ld.alerta).toBe(4);
      expect(getState().safetyRules.ld.critico).toBe(6);
    });

    it('setSafetyRules updates L/D thresholds', () => {
      getState().setSafetyRules({ ld: { seguro: 2, alerta: 3, critico: 5 } });
      expect(getState().safetyRules.ld.seguro).toBe(2);
      expect(getState().safetyRules.ld.alerta).toBe(3);
      expect(getState().safetyRules.ld.critico).toBe(5);
    });

    it('custom L/D thresholds affect calcular()', () => {
      getState().setFerramenta({ balanco: 25, diametro: 10 }); // L/D = 2.5
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 }); // safe params
      getState().calcular(); // Need to calculate after setting parameters
      expect(getState().resultado!.seguranca.nivel).toBe('verde');

      getState().setSafetyRules({ ld: { seguro: 2, alerta: 3, critico: 5 } });
      getState().calcular(); // Need to recalculate after changing safety rules
      expect(getState().resultado!.seguranca.nivel).toBe('amarelo'); // 2.5 > 2
    });
  });

  describe('customMaterials', () => {
    it('starts with empty custom materials', () => {
      expect(getState().customMaterials).toEqual([]);
    });

    it('addCustomMaterial adds to list', () => {
      getState().addCustomMaterial({
        id: 100, nome: 'Aço 4140', iso: 'P', dureza: '200 HB',
        kc1_1: 2100, mc: 0.25, vcRanges: {
          [TipoUsinagem.DESBASTE]: [80, 150],
          [TipoUsinagem.SEMI_ACABAMENTO]: [100, 180],
          [TipoUsinagem.ACABAMENTO]: [120, 200],
        },
        status: 'estimado', isCustom: true,
      });
      expect(getState().customMaterials).toHaveLength(1);
      expect(getState().customMaterials[0].nome).toBe('Aço 4140');
    });

    it('removeCustomMaterial removes from list', () => {
      getState().addCustomMaterial({
        id: 100, nome: 'Test', iso: 'P', dureza: 'N/A',
        kc1_1: 2000, mc: 0.2, vcRanges: {
          [TipoUsinagem.DESBASTE]: [100, 200],
          [TipoUsinagem.SEMI_ACABAMENTO]: [100, 200],
          [TipoUsinagem.ACABAMENTO]: [100, 200],
        },
        status: 'estimado', isCustom: true,
      });
      expect(getState().customMaterials).toHaveLength(1);
      getState().removeCustomMaterial(100);
      expect(getState().customMaterials).toHaveLength(0);
    });

    it('removeCustomMaterial resets materialId if selected material was removed', () => {
      getState().addCustomMaterial({
        id: 100, nome: 'Test', iso: 'P', dureza: 'N/A',
        kc1_1: 2000, mc: 0.2, vcRanges: {
          [TipoUsinagem.DESBASTE]: [100, 200],
          [TipoUsinagem.SEMI_ACABAMENTO]: [100, 200],
          [TipoUsinagem.ACABAMENTO]: [100, 200],
        },
        status: 'estimado', isCustom: true,
      });
      getState().setMaterial(100);
      expect(getState().materialId).toBe(100);
      getState().removeCustomMaterial(100);
      expect(getState().materialId).toBe(2); // falls back to default
    });
  });

  describe('customToolConfig', () => {
    it('starts with empty custom tool config', () => {
      expect(getState().customToolConfig.extraDiameters).toEqual([]);
      expect(getState().customToolConfig.extraRadii).toEqual([]);
    });

    it('setCustomToolConfig adds extra diameters', () => {
      getState().setCustomToolConfig({ extraDiameters: [5, 7, 9] });
      expect(getState().customToolConfig.extraDiameters).toEqual([5, 7, 9]);
    });

    it('setCustomToolConfig adds extra radii', () => {
      getState().setCustomToolConfig({ extraRadii: [0.3, 0.8] });
      expect(getState().customToolConfig.extraRadii).toEqual([0.3, 0.8]);
    });
  });

  describe('exportSettings / importSettings', () => {
    it('exports current settings as JSON string', () => {
      getState().setLimitesMaquina({ maxRPM: 9000 });
      const json = getState().exportSettings();
      const data = JSON.parse(json);
      expect(data.version).toBe(1);
      expect(data.limitesMaquina.maxRPM).toBe(9000);
      expect(data.safetyFactor).toBe(0.8);
    });

    it('importSettings applies settings to store', () => {
      const json = JSON.stringify({
        version: 1,
        limitesMaquina: { maxRPM: 7000, maxPotencia: 10 },
        safetyFactor: 0.65,
        preferences: { decimals: 3, machineName: 'Imported' },
      });
      const ok = getState().importSettings(json);
      expect(ok).toBe(true);
      expect(getState().limitesMaquina.maxRPM).toBe(7000);
      expect(getState().safetyFactor).toBe(0.65);
      expect(getState().preferences.decimals).toBe(3);
      expect(getState().preferences.machineName).toBe('Imported');
    });

    it('importSettings returns false for invalid JSON', () => {
      expect(getState().importSettings('not json')).toBe(false);
    });

    it('importSettings returns false for non-object', () => {
      expect(getState().importSettings('"hello"')).toBe(false);
    });
  });

  describe('auto-populate params', () => {
    it('setMaterial auto-populates Vc from diameter table (clamped to vcRange)', () => {
      getState().setMaterial(4); // Alumínio 6061, desbaste, D=6 → table Vc=900, clamped to [400,600] = 600
      expect(getState().parametros.vc).toBe(600);
    });

    it('setTipoOperacao auto-populates params for new operation', () => {
      getState().setTipoOperacao(TipoUsinagem.ACABAMENTO);
      const p = getState().parametros;
      // Aço 1045 (grupo3), D=6, acabamento: fz=0.066, Vc clamped to [200,280]=280
      expect(p.fz).toBe(0.066);
      expect(p.vc).toBe(280);
    });

    it('setFerramenta with diameter change auto-populates ap/ae', () => {
      getState().setFerramenta({ diametro: 12 });
      const p = getState().parametros;
      // Aço 1045, desbaste, D=12: ap=0.8×12=9.6, ae=0.45×12=5.4
      expect(p.ap).toBe(9.6);
      expect(p.ae).toBe(5.4);
    });

    it('setFerramenta without diameter change does not alter params', () => {
      getState().setParametros({ vc: 999 });
      getState().setFerramenta({ balanco: 40 }); // no diametro change
      expect(getState().parametros.vc).toBe(999);
    });

    it('setParametros does not trigger auto-populate', () => {
      getState().setParametros({ vc: 42 });
      expect(getState().parametros.vc).toBe(42);
    });
  });

  describe('calcular() — L/D boundary integration', () => {
    beforeEach(() => {
      getState().setFerramenta({ tipo: 'topo', diametro: 10 });
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    });

    it('L/D exactly 6.0 → vermelho (still within critical range)', () => {
      getState().setFerramenta({ balanco: 60, diametro: 10 }); // 60/10 = 6.0
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      getState().calcular();
      const r = getState().resultado!;
      expect(r.seguranca.razaoLD).toBe(6.0);
      expect(r.seguranca.nivel).toBe('vermelho');
    });

    it('L/D just above 6 → bloqueado (strict boundary)', () => {
      getState().setFerramenta({ balanco: 61, diametro: 10 }); // 61/10 = 6.1 > 6
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      getState().calcular();
      const r = getState().resultado!;
      expect(r.seguranca.razaoLD).toBeCloseTo(6.1, 1);
      expect(r.seguranca.nivel).toBe('bloqueado');
    });

    it('L/D > 6 → bloqueado result includes BLOQUEADO warning', () => {
      getState().setFerramenta({ balanco: 70, diametro: 10 }); // 70/10 = 7.0
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      getState().calcular();
      const r = getState().resultado!;
      expect(r.seguranca.nivel).toBe('bloqueado');
      expect(r.seguranca.avisos.some((a) => a.includes('BLOQUEADO'))).toBe(true);
    });
  });

  describe('ajustarParametros', () => {
    beforeEach(() => {
      getState().setFerramenta({ tipo: 'toroidal', diametro: 10 });
      getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      getState().calcular();
    });

    it('updates params and recalculates in real-time without zeroing resultado', () => {
      expect(getState().resultado).not.toBeNull();
      const vcAntes = getState().parametros.vc;
      getState().ajustarParametros({ vc: vcAntes + 10 });
      expect(getState().parametros.vc).toBe(vcAntes + 10);
      expect(getState().resultado).not.toBeNull();
    });

    it('does not clear manualOverrides when adjusting fine-tune', () => {
      getState().simular();
      getState().setManualRPMPercent(10);
      const overridesBefore = getState().manualOverrides;
      expect(overridesBefore.rpmPercent).toBe(10);
      getState().ajustarParametros({ vc: 150 });
      expect(getState().manualOverrides.rpmPercent).toBe(10);
    });

    it('recalculates even when resultado was null before calling', () => {
      getState().setMaterial(2); // zeros resultado
      expect(getState().resultado).toBeNull();
      getState().ajustarParametros({ vc: 120 });
      expect(getState().resultado).not.toBeNull();
      expect(getState().parametros.vc).toBe(120);
    });
  });

  describe('resetToDefaults', () => {
    it('resets all state to defaults', () => {
      getState().setLimitesMaquina({ maxRPM: 5000 });
      getState().setSafetyFactor(0.6);
      getState().setPreferences({ machineName: 'Test', decimals: 4 });
      getState().addCustomMaterial({
        id: 100, nome: 'Test', iso: 'P', dureza: 'N/A',
        kc1_1: 2000, mc: 0.2, vcRanges: {
          [TipoUsinagem.DESBASTE]: [100, 200],
          [TipoUsinagem.SEMI_ACABAMENTO]: [100, 200],
          [TipoUsinagem.ACABAMENTO]: [100, 200],
        },
        status: 'estimado', isCustom: true,
      });

      getState().resetToDefaults();

      expect(getState().limitesMaquina.maxRPM).toBe(12000);
      expect(getState().safetyFactor).toBe(0.8);
      expect(getState().preferences.machineName).toBe('');
      expect(getState().preferences.decimals).toBe(2);
      expect(getState().customMaterials).toEqual([]);
    });
  });
});

// ─── ObjetivoUsinagem ────────────────────────────────────────────────────────

describe('ObjetivoUsinagem', () => {
  beforeEach(() => { getState().reset(); });

  it('setObjetivoUsinagem updates state', () => {
    useMachiningStore.getState().setObjetivoUsinagem('velocidade');
    expect(useMachiningStore.getState().objetivoUsinagem).toBe('velocidade');
  });

  it('setObjetivoUsinagem does NOT clear resultado', () => {
    useMachiningStore.setState({ resultado: { rpm: 3000 } as ResultadoUsinagem });
    useMachiningStore.getState().setObjetivoUsinagem('vida_util');
    expect(useMachiningStore.getState().resultado).not.toBeNull();
  });
});

// ─── SavedTools CRUD ─────────────────────────────────────────────────────────

describe('SavedTools CRUD', () => {
  beforeEach(() => { getState().reset(); });

  it('addSavedTool creates entry with id and createdAt', () => {
    useMachiningStore.getState().addSavedTool({
      tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20,
    });
    const { savedTools } = useMachiningStore.getState();
    expect(savedTools).toHaveLength(1);
    expect(savedTools[0].id).toBeTruthy();
    expect(savedTools[0].createdAt).toBeTruthy();
  });

  it('addSavedTool generates correct nome for tipo topo', () => {
    useMachiningStore.getState().addSavedTool({
      tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20,
    });
    expect(useMachiningStore.getState().savedTools[0].nome).toBe('Topo Ø10 - H20 - A4');
  });

  it('addSavedTool generates correct nome for tipo toroidal', () => {
    useMachiningStore.getState().addSavedTool({
      tipo: 'toroidal', diametro: 10, raioQuina: 1, numeroArestas: 4, balanco: 20,
    });
    expect(useMachiningStore.getState().savedTools[0].nome).toBe('Toroidal Ø10 - R1 - H20 - A4');
  });

  it('addSavedTool generates correct nome for tipo esferica', () => {
    useMachiningStore.getState().addSavedTool({
      tipo: 'esferica', diametro: 8, numeroArestas: 2, balanco: 30,
    });
    expect(useMachiningStore.getState().savedTools[0].nome).toBe('Esférica Ø8 - H30 - A2');
  });

  it('removeSavedTool removes by id', () => {
    useMachiningStore.getState().addSavedTool({
      tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20,
    });
    const { savedTools } = useMachiningStore.getState();
    useMachiningStore.getState().removeSavedTool(savedTools[0].id);
    expect(useMachiningStore.getState().savedTools).toHaveLength(0);
  });

  it('removeSavedTool ignores unknown id', () => {
    useMachiningStore.getState().addSavedTool({
      tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20,
    });
    useMachiningStore.getState().removeSavedTool('id-inexistente');
    expect(useMachiningStore.getState().savedTools).toHaveLength(1);
  });

  it('loadSavedTool populates ferramenta and clears resultado', () => {
    useMachiningStore.setState({ resultado: { rpm: 3000 } as ResultadoUsinagem });
    useMachiningStore.getState().addSavedTool({
      tipo: 'esferica', diametro: 8, numeroArestas: 2, balanco: 30,
    });
    const id = useMachiningStore.getState().savedTools[0].id;
    useMachiningStore.getState().loadSavedTool(id);
    const state = useMachiningStore.getState();
    expect(state.ferramenta.tipo).toBe('esferica');
    expect(state.ferramenta.diametro).toBe(8);
    expect(state.ferramenta.numeroArestas).toBe(2);
    expect(state.ferramenta.balanco).toBe(30);
    expect(state.resultado).toBeNull();
  });

  it('loadSavedTool ignores unknown id', () => {
    useMachiningStore.setState({ resultado: { rpm: 3000 } as ResultadoUsinagem });
    useMachiningStore.getState().loadSavedTool('id-inexistente');
    expect(useMachiningStore.getState().resultado).not.toBeNull();
  });
});

// ─── ValidatedSimulations CRUD ───────────────────────────────────────────────

describe('ValidatedSimulations CRUD', () => {
  const mockSim = (): Omit<ValidatedSimulation, 'id' | 'createdAt'> => ({
    nome: 'Topo Ø10 - Aço 1045 - Desbaste',
    ferramentaNome: 'Topo Ø10 - H20 - A4',
    materialNome: 'Aço 1045',
    materialId: 2,
    tipoOperacao: TipoUsinagem.DESBASTE,
    objetivoUsinagem: 'balanceado',
    parametros: { ap: 2, ae: 5, fz: 0.1, vc: 100 },
    resultado: { rpm: 5305 } as ResultadoUsinagem,
    ferramenta: { tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20 },
  });

  beforeEach(() => { getState().reset(); });

  it('addValidatedSimulation creates entry with id and createdAt', () => {
    useMachiningStore.getState().addValidatedSimulation(mockSim());
    const { validatedSimulations } = useMachiningStore.getState();
    expect(validatedSimulations).toHaveLength(1);
    expect(validatedSimulations[0].id).toBeTruthy();
    expect(validatedSimulations[0].createdAt).toBeTruthy();
  });

  it('addValidatedSimulation stores correct data', () => {
    useMachiningStore.getState().addValidatedSimulation(mockSim());
    const sim = useMachiningStore.getState().validatedSimulations[0];
    expect(sim.nome).toBe('Topo Ø10 - Aço 1045 - Desbaste');
    expect(sim.materialId).toBe(2);
    expect(sim.objetivoUsinagem).toBe('balanceado');
  });

  it('removeValidatedSimulation removes by id', () => {
    useMachiningStore.getState().addValidatedSimulation(mockSim());
    const id = useMachiningStore.getState().validatedSimulations[0].id;
    useMachiningStore.getState().removeValidatedSimulation(id);
    expect(useMachiningStore.getState().validatedSimulations).toHaveLength(0);
  });

  it('loadValidatedSimulation restores full state without recalculating', () => {
    useMachiningStore.getState().addValidatedSimulation(mockSim());
    const id = useMachiningStore.getState().validatedSimulations[0].id;
    useMachiningStore.getState().loadValidatedSimulation(id);
    const state = useMachiningStore.getState();
    expect(state.materialId).toBe(2);
    expect(state.tipoOperacao).toBe(TipoUsinagem.DESBASTE);
    expect(state.objetivoUsinagem).toBe('balanceado');
    expect(state.parametros.vc).toBe(100);
    // resultado comes from snapshot — not recalculated
    expect(state.resultado?.rpm).toBe(5305);
  });

  it('loadValidatedSimulation ignores unknown id', () => {
    useMachiningStore.setState({ resultado: null });
    useMachiningStore.getState().loadValidatedSimulation('id-inexistente');
    expect(useMachiningStore.getState().resultado).toBeNull();
  });
});

// ─── simular() auto-save removed (Fase 5) ────────────────────────────────────
// Auto-save silencioso removido em v0.8.0-alpha.5. Testes de regressão agora
// vivem em tests/components/config-panel.test.tsx ("simular() does NOT auto-save").
