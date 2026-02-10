/**
 * STATE MANAGEMENT - ToolOptimizer CNC v2.0
 * Gerenciamento de estado com Zustand
 */

import { create } from 'zustand';
import { MATERIALS, OPERATIONS, VALIDATION_RANGES, LD_FACTORS } from '../../shared/types';
import { calculateAll } from '../../cnc-engine/core/formulas';
import { validateAll, validateInput } from '../../cnc-engine/validations/validator';

/**
 * Estado inicial
 */
const initialState = {
  // Seleções do usuário
  materialId: 'aco-1045',
  operationType: 'semi-acabamento',
  toolType: 'toroidal',

  // Parâmetros da ferramenta
  cornerRadius: 1.0,
  diameter: 10,
  fluteCount: 4,
  physicalConfig: 'inteirica',
  neckHeight: 10,
  fixingHeight: 30,

  // Parâmetros de corte (com valores default)
  vc: 120,
  fz: 0.05,
  ae: 2.5, // 25% de 10mm
  ap: 3.0, // 30% de 10mm

  // Ajustes percentuais (sliders -50% a +50%)
  rpmAdjustment: 0,
  feedAdjustment: 0,

  // Resultados
  results: null,
  validation: null,

  // UI State
  isPanelCollapsed: false,
  isCalculating: false,
  lastError: null,
};

/**
 * Store principal
 */
const useCalculatorStore = create((set, get) => ({
  ...initialState,

  // ========== GETTERS COMPUTADOS ==========

  /**
   * Retorna material selecionado
   */
  getMaterial: () => {
    const { materialId } = get();
    return MATERIALS[materialId];
  },

  /**
   * Retorna operação selecionada
   */
  getOperation: () => {
    const { operationType } = get();
    return OPERATIONS[operationType];
  },

  /**
   * Verifica se deve mostrar campo de raio de ponta
   */
  shouldShowCornerRadius: () => {
    return get().toolType === 'toroidal';
  },

  /**
   * Verifica se deve mostrar configuração física
   */
  shouldShowPhysicalConfig: () => {
    return get().diameter <= 6;
  },

  /**
   * Verifica se deve mostrar altura do rebaixo
   */
  shouldShowNeckHeight: () => {
    const state = get();
    return state.physicalConfig === 'com-rebaixo' && state.diameter <= 6;
  },

  // ========== SETTERS ==========

  setMaterial: (materialId) => {
    const material = MATERIALS[materialId];
    if (material) {
      set({
        materialId,
        vc: material.vcRecommended // Auto-populate Vc
      });
      get().recalculate();
    }
  },

  setOperationType: (operationType) => {
    set({ operationType });
    get().recalculate();
  },

  setToolType: (toolType) => {
    set({
      toolType,
      // Reset raio se não for toroidal
      cornerRadius: toolType === 'toroidal' ? 1.0 : null
    });
    get().recalculate();
  },

  setCornerRadius: (cornerRadius) => {
    set({ cornerRadius });
    get().recalculate();
  },

  setDiameter: (diameter) => {
    const newDiameter = Math.max(2, Math.min(16, diameter));
    set({
      diameter: newDiameter,
      // Recalcular ae e ap baseados no novo diâmetro
      ae: newDiameter * 0.25,
      ap: newDiameter * 0.30,
      // Reset configuração física se > 6mm
      physicalConfig: newDiameter > 6 ? 'inteirica' : get().physicalConfig
    });
    get().recalculate();
  },

  setFluteCount: (fluteCount) => {
    set({ fluteCount: Math.max(2, Math.min(4, fluteCount)) });
    get().recalculate();
  },

  setPhysicalConfig: (physicalConfig) => {
    set({ physicalConfig });
    get().recalculate();
  },

  setNeckHeight: (neckHeight) => {
    set({ neckHeight: Math.max(5, Math.min(30, neckHeight)) });
    get().recalculate();
  },

  setFixingHeight: (fixingHeight) => {
    set({ fixingHeight: Math.max(10, Math.min(100, fixingHeight)) });
    get().recalculate();
  },

  // Parâmetros de corte
  setVc: (vc) => {
    set({ vc: Math.max(50, Math.min(200, vc)) });
    get().recalculate();
  },

  setFz: (fz) => {
    set({ fz: Math.max(0.01, Math.min(0.20, fz)) });
    get().recalculate();
  },

  setAe: (ae) => {
    const { diameter } = get();
    set({ ae: Math.max(0.5, Math.min(diameter, ae)) });
    get().recalculate();
  },

  setAp: (ap) => {
    const { diameter } = get();
    set({ ap: Math.max(0.5, Math.min(diameter, ap)) });
    get().recalculate();
  },

  // Ajustes percentuais (sliders)
  setRpmAdjustment: (adjustment) => {
    set({ rpmAdjustment: Math.max(-50, Math.min(50, adjustment)) });
    get().recalculate();
  },

  setFeedAdjustment: (adjustment) => {
    set({ feedAdjustment: Math.max(-50, Math.min(50, adjustment)) });
    get().recalculate();
  },

  // UI
  togglePanel: () => {
    set(state => ({ isPanelCollapsed: !state.isPanelCollapsed }));
  },

  // ========== CÁLCULO ==========

  recalculate: () => {
    const state = get();

    set({ isCalculating: true, lastError: null });

    try {
      const material = MATERIALS[state.materialId];
      const operation = OPERATIONS[state.operationType];

      // Calcular comprimento total (fixação + neck se aplicável)
      const length = state.fixingHeight +
        (state.physicalConfig === 'com-rebaixo' ? state.neckHeight : 0);

      // Parâmetros para cálculo
      const params = {
        vc: state.vc,
        fz: state.fz,
        diameter: state.diameter,
        fluteCount: state.fluteCount,
        ap: state.ap,
        ae: state.ae,
        length,
        kc: material.kc,
        ldFactors: LD_FACTORS
      };

      // Validar entrada
      const inputValidation = validateInput(params, material);

      // Calcular
      const results = calculateAll(params);

      // Aplicar ajustes percentuais
      const rpmMultiplier = 1 + (state.rpmAdjustment / 100);
      const feedMultiplier = 1 + (state.feedAdjustment / 100);

      const adjustedResults = {
        ...results,
        rpm: Math.round(results.rpm * rpmMultiplier),
        feedRate: Math.round(results.feedRate * feedMultiplier),
        baseRpm: results.rpm,
        baseFeedRate: results.feedRate,
        rpmAdjustmentPercent: state.rpmAdjustment,
        feedAdjustmentPercent: state.feedAdjustment
      };

      // Validação completa
      const fullValidation = validateAll(params, adjustedResults, material);

      // Calcular métricas de performance (gauges)
      const metrics = calculatePerformanceMetrics(adjustedResults, params, material);

      set({
        results: { ...adjustedResults, metrics },
        validation: fullValidation,
        isCalculating: false
      });

    } catch (error) {
      console.error('[Store] Calculation error:', error);
      set({
        lastError: error.message,
        isCalculating: false
      });
    }
  },

  // ========== RESET ==========

  reset: () => {
    set(initialState);
  },

  // ========== AJUSTES RÁPIDOS ==========

  adjustRpmByPercent: (percent) => {
    const currentAdjustment = get().rpmAdjustment;
    const newAdjustment = Math.max(-50, Math.min(50, currentAdjustment + percent));
    set({ rpmAdjustment: newAdjustment });
    get().recalculate();
  },

  adjustFeedByPercent: (percent) => {
    const currentAdjustment = get().feedAdjustment;
    const newAdjustment = Math.max(-50, Math.min(50, currentAdjustment + percent));
    set({ feedAdjustment: newAdjustment });
    get().recalculate();
  },

  resetRpmAdjustment: () => {
    set({ rpmAdjustment: 0 });
    get().recalculate();
  },

  resetFeedAdjustment: () => {
    set({ feedAdjustment: 0 });
    get().recalculate();
  },
}));

/**
 * Calcula métricas de performance para os gauges
 */
function calculatePerformanceMetrics(results, params, material) {
  // Tool Life Remaining (baseado em Vc e condições)
  // Simplificado: vida estimada diminui com Vc alta e L/D alto
  const vcRatio = params.vc / material.vcRecommended;
  const ldPenalty = Math.max(0, (results.ldRatio - 2) * 0.1);
  const toolLifeBase = 1000;
  const toolLifeRemaining = Math.max(0, Math.round(
    toolLifeBase * (1 / vcRatio) * (1 - ldPenalty)
  ));

  // Efficiency Rate (baseado em quão próximo do ideal)
  const vcEfficiency = 1 - Math.abs(params.vc - material.vcRecommended) / material.vcRecommended;
  const fzIdeal = (VALIDATION_RANGES.fz.idealMin + VALIDATION_RANGES.fz.idealMax) / 2;
  const fzEfficiency = 1 - Math.abs(params.fz - fzIdeal) / fzIdeal;
  const efficiencyRate = Math.min(100, Math.round(
    ((vcEfficiency + fzEfficiency) / 2) * 100
  ));

  // Spindle Load (baseado em potência)
  const spindleLoad = Math.min(100, Math.round(
    (results.power / 15) * 100 // 15kW máximo
  ));

  return {
    toolLifeRemaining: Math.max(0, Math.min(1000, toolLifeRemaining)),
    efficiencyRate: Math.max(0, Math.min(100, efficiencyRate)),
    spindleLoad: Math.max(0, Math.min(100, spindleLoad))
  };
}

export default useCalculatorStore;
