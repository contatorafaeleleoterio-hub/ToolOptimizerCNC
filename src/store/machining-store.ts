/**
 * Zustand Store - Central state management for ToolOptimizer CNC
 */

import { create } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';
import type {
  Ferramenta, LimitesMaquina, ParametrosUsinagem, ResultadoUsinagem,
  StatusSeguranca, SafetyRules, Preferences, CustomMaterial, CustomToolConfig,
} from '@/types/index';
import {
  TipoUsinagem, LIMITES_PADRAO_MAQUINA, PREFERENCES_PADRAO,
  SAFETY_RULES_PADRAO, CUSTOM_TOOL_CONFIG_PADRAO,
} from '@/types/index';
import {
  calculateRPM, calculateEffectiveFz, calculateFeedRate, calculateMRR,
  calculatePower, calculateTorque, validateLDRatio, validateInputs, validateMachineLimits,
} from '@/engine/index';
import { getMaterialById } from '@/data/index';

const DEFAULT_FERRAMENTA: Ferramenta = {
  tipo: 'toroidal',
  diametro: 6,
  numeroArestas: 4,
  balanco: 25,
  raioQuina: 1.0,
};

const DEFAULT_PARAMETROS: ParametrosUsinagem = { ap: 2, ae: 5, fz: 0.1, vc: 100 };

interface ManualOverrides {
  rpm?: number;
  feed?: number;
}

interface MachiningState {
  materialId: number;
  ferramenta: Ferramenta;
  tipoOperacao: TipoUsinagem;
  parametros: ParametrosUsinagem;
  limitesMaquina: LimitesMaquina;
  resultado: ResultadoUsinagem | null;
  safetyFactor: number;
  manualOverrides: ManualOverrides;
  preferences: Preferences;
  safetyRules: SafetyRules;
  customMaterials: CustomMaterial[];
  customToolConfig: CustomToolConfig;
}

interface MachiningActions {
  setMaterial: (id: number) => void;
  setFerramenta: (f: Partial<Ferramenta>) => void;
  setTipoOperacao: (tipo: TipoUsinagem) => void;
  setParametros: (p: Partial<ParametrosUsinagem>) => void;
  setLimitesMaquina: (l: Partial<LimitesMaquina>) => void;
  setSafetyFactor: (f: number) => void;
  setManualRPM: (rpm: number) => void;
  setManualFeed: (feed: number) => void;
  clearManualOverrides: () => void;
  setPreferences: (p: Partial<Preferences>) => void;
  setSafetyRules: (r: Partial<SafetyRules>) => void;
  addCustomMaterial: (m: CustomMaterial) => void;
  updateCustomMaterial: (id: number, m: Partial<CustomMaterial>) => void;
  removeCustomMaterial: (id: number) => void;
  setCustomToolConfig: (c: Partial<CustomToolConfig>) => void;
  exportSettings: () => string;
  importSettings: (json: string) => boolean;
  resetToDefaults: () => void;
  calcular: () => void;
  reset: () => void;
}

const INITIAL_STATE: MachiningState = {
  materialId: 2,
  ferramenta: DEFAULT_FERRAMENTA,
  tipoOperacao: TipoUsinagem.DESBASTE,
  parametros: DEFAULT_PARAMETROS,
  limitesMaquina: LIMITES_PADRAO_MAQUINA,
  resultado: null,
  safetyFactor: 0.8,
  manualOverrides: {},
  preferences: PREFERENCES_PADRAO,
  safetyRules: SAFETY_RULES_PADRAO,
  customMaterials: [],
  customToolConfig: CUSTOM_TOOL_CONFIG_PADRAO,
};

/** Lookup material from built-in list or custom materials */
function findMaterial(id: number, customMaterials: CustomMaterial[]) {
  const custom = customMaterials.find((m) => m.id === id);
  if (custom) return custom;
  return getMaterialById(id);
}

export const useMachiningStore = create<MachiningState & MachiningActions>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...INITIAL_STATE,

        setMaterial: (id) => {
          set({ materialId: id, manualOverrides: {} });
          get().calcular();
        },

        setFerramenta: (f) => {
          set((state) => ({ ferramenta: { ...state.ferramenta, ...f }, manualOverrides: {} }));
          get().calcular();
        },

        setTipoOperacao: (tipo) => {
          set({ tipoOperacao: tipo, manualOverrides: {} });
          get().calcular();
        },

        setParametros: (p) => {
          set((state) => ({ parametros: { ...state.parametros, ...p }, manualOverrides: {} }));
          get().calcular();
        },

        setLimitesMaquina: (l) => {
          set((state) => ({ limitesMaquina: { ...state.limitesMaquina, ...l } }));
          get().calcular();
        },

        setSafetyFactor: (f) => {
          set({ safetyFactor: f });
          get().calcular();
        },

        setManualRPM: (rpm) => {
          set({ manualOverrides: { ...get().manualOverrides, rpm } });
          get().calcular();
        },

        setManualFeed: (feed) => {
          set({ manualOverrides: { ...get().manualOverrides, feed } });
          get().calcular();
        },

        clearManualOverrides: () => {
          set({ manualOverrides: {} });
          get().calcular();
        },

        setPreferences: (p) => {
          set((state) => ({ preferences: { ...state.preferences, ...p } }));
        },

        setSafetyRules: (r) => {
          set((state) => ({
            safetyRules: {
              ld: { ...state.safetyRules.ld, ...r.ld },
              apMaxMult: { ...state.safetyRules.apMaxMult, ...r.apMaxMult },
            },
          }));
          get().calcular();
        },

        addCustomMaterial: (m) => {
          set((state) => ({ customMaterials: [...state.customMaterials, m] }));
        },

        updateCustomMaterial: (id, updates) => {
          set((state) => ({
            customMaterials: state.customMaterials.map((m) =>
              m.id === id ? { ...m, ...updates } : m,
            ),
          }));
        },

        removeCustomMaterial: (id) => {
          set((state) => ({
            customMaterials: state.customMaterials.filter((m) => m.id !== id),
            materialId: state.materialId === id ? 2 : state.materialId,
          }));
        },

        setCustomToolConfig: (c) => {
          set((state) => ({ customToolConfig: { ...state.customToolConfig, ...c } }));
        },

        exportSettings: () => {
          const { limitesMaquina, safetyFactor, preferences, safetyRules, customMaterials, customToolConfig } = get();
          return JSON.stringify({
            version: 1,
            limitesMaquina,
            safetyFactor,
            preferences,
            safetyRules,
            customMaterials,
            customToolConfig,
          }, null, 2);
        },

        importSettings: (json) => {
          try {
            const data = JSON.parse(json);
            if (!data || typeof data !== 'object') return false;
            if (data.limitesMaquina) set({ limitesMaquina: { ...LIMITES_PADRAO_MAQUINA, ...data.limitesMaquina } });
            if (typeof data.safetyFactor === 'number') set({ safetyFactor: data.safetyFactor });
            if (data.preferences) set((s) => ({ preferences: { ...s.preferences, ...data.preferences } }));
            if (data.safetyRules) {
              set((s) => ({
                safetyRules: {
                  ld: { ...s.safetyRules.ld, ...data.safetyRules.ld },
                  apMaxMult: { ...s.safetyRules.apMaxMult, ...data.safetyRules.apMaxMult },
                },
              }));
            }
            if (Array.isArray(data.customMaterials)) set({ customMaterials: data.customMaterials });
            if (data.customToolConfig) set((s) => ({ customToolConfig: { ...s.customToolConfig, ...data.customToolConfig } }));
            get().calcular();
            return true;
          } catch {
            return false;
          }
        },

        resetToDefaults: () => {
          set({ ...INITIAL_STATE });
          localStorage.removeItem('tooloptimizer-cnc-settings');
        },

        calcular: () => {
          const { materialId, ferramenta, parametros, limitesMaquina, safetyFactor, manualOverrides, safetyRules, customMaterials } = get();
          const { ap, ae, fz, vc } = parametros;
          const { diametro: D, numeroArestas: Z, balanco } = ferramenta;

          const material = findMaterial(materialId, customMaterials);
          if (!material) { set({ resultado: null }); return; }

          try { validateInputs({ d: D, ap, ae, fz, vc, z: Z }); }
          catch { set({ resultado: null }); return; }

          let rpm = calculateRPM(vc, D);
          if (manualOverrides.rpm !== undefined) rpm = manualOverrides.rpm;

          const chipResult = calculateEffectiveFz(fz, ae, D);
          let avanco = calculateFeedRate(chipResult.fzEfetivo, Z, rpm);
          if (manualOverrides.feed !== undefined) avanco = manualOverrides.feed;

          const mrr = calculateMRR(ap, ae, avanco);
          const kc = material.kc1_1;
          const potenciaMotor = calculatePower(mrr, kc, limitesMaquina.eficiencia);
          const potenciaCorte = (mrr * kc) / 60000;
          const torque = calculateTorque(potenciaMotor, rpm);
          const ldNivel = validateLDRatio(balanco, D, safetyRules.ld);
          const razaoLD = balanco / D;

          const avisos = validateMachineLimits(
            { rpm, power: potenciaMotor, feed: avanco },
            limitesMaquina,
          );

          if (ldNivel === 'amarelo') {
            avisos.push(`L/D ratio (${razaoLD.toFixed(1)}) em zona de alerta`);
          } else if (ldNivel === 'vermelho') {
            avisos.push(`L/D ratio (${razaoLD.toFixed(1)}) em zona crítica — risco de vibração`);
          } else if (ldNivel === 'bloqueado') {
            avisos.push(`L/D ratio (${razaoLD.toFixed(1)}) > 6 — BLOQUEADO no MVP`);
          }

          let nivel: StatusSeguranca['nivel'] = 'verde';
          if (ldNivel === 'bloqueado') nivel = 'bloqueado';
          else if (ldNivel === 'vermelho' || avisos.some((a) => a.includes('excede'))) nivel = 'vermelho';
          else if (ldNivel === 'amarelo') nivel = 'amarelo';

          set({
            resultado: {
              rpm,
              avanco,
              potenciaCorte: potenciaCorte * safetyFactor,
              potenciaMotor: potenciaMotor * safetyFactor,
              torque: torque * safetyFactor,
              mrr,
              vcReal: (Math.PI * D * rpm) / 1000,
              fzEfetivo: chipResult.fzEfetivo,
              forcaCorte: kc * ap * fz,
              seguranca: { nivel, avisos, razaoLD, ctf: chipResult.ctfFactor },
            },
          });
        },

        reset: () => set({ ...INITIAL_STATE }),
      }),
      {
        name: 'tooloptimizer-cnc-settings',
        version: 1,
        partialize: (state) => ({
          limitesMaquina: state.limitesMaquina,
          safetyFactor: state.safetyFactor,
          preferences: state.preferences,
          safetyRules: state.safetyRules,
          customMaterials: state.customMaterials,
          customToolConfig: state.customToolConfig,
        }),
      },
    ),
  ),
);
