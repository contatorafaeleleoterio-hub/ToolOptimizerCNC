/**
 * Zustand Store - Central state management for ToolOptimizer CNC
 */

import { create } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';
import type {
  Ferramenta, LimitesMaquina, ParametrosUsinagem, ResultadoUsinagem,
  StatusSeguranca, SafetyRules, Preferences, CustomMaterial,
  ObjetivoUsinagem, SavedTool, ValidatedSimulation,
} from '@/types/index';
import {
  TipoUsinagem, LIMITES_PADRAO_MAQUINA, PREFERENCES_PADRAO,
  SAFETY_RULES_PADRAO,
} from '@/types/index';
import {
  calculateRPM, calculateEffectiveFz, calculateFeedRate, calculateMRR,
  calculatePower, calculateTorque, validateLDRatio, validateInputs, validateMachineLimits,
  calcularSliderBounds,
} from '@/engine/index';
import { getMaterialById } from '@/data/index';
import { getRecommendedParams } from '@/engine/recommendations';
import { useHistoryStore } from './history-store';
import { useUsageStore } from '@/admin/store/usage-store';
import {
  calculateHealthScore, getVcZone, getFzZone, getAeZone, getApZone,
} from '@/utils/health-score';

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
  rpmPercent?: number; // -150 to +150
  feedPercent?: number; // -150 to +150
  vcPercent?: number; // -150 to +150
  fzPercent?: number; // -150 to +150
  aePercent?: number; // -150 to +150
  apPercent?: number; // -150 to +150
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
  baseRPM: number; // Calculated RPM before adjustments
  baseFeed: number; // Calculated feed before adjustments
  baseParams: ParametrosUsinagem; // Recommended params before adjustments
  preferences: Preferences;
  safetyRules: SafetyRules;
  customMaterials: CustomMaterial[];
  objetivoUsinagem: ObjetivoUsinagem;
  savedTools: SavedTool[];
  validatedSimulations: ValidatedSimulation[];
}

interface MachiningActions {
  setMaterial: (id: number) => void;
  setFerramenta: (f: Partial<Ferramenta>) => void;
  setTipoOperacao: (tipo: TipoUsinagem) => void;
  setParametros: (p: Partial<ParametrosUsinagem>) => void;
  ajustarParametros: (p: Partial<ParametrosUsinagem>) => void;
  setLimitesMaquina: (l: Partial<LimitesMaquina>) => void;
  setSafetyFactor: (f: number) => void;
  setManualRPM: (rpm: number) => void;
  setManualFeed: (feed: number) => void;
  setManualRPMPercent: (percent: number) => void;
  setManualFeedPercent: (percent: number) => void;
  setParamPercent: (key: keyof ParametrosUsinagem, percent: number) => void;
  clearManualOverrides: () => void;
  setPreferences: (p: Partial<Preferences>) => void;
  setSafetyRules: (r: Partial<SafetyRules>) => void;
  addCustomMaterial: (m: CustomMaterial) => void;
  updateCustomMaterial: (id: number, m: Partial<CustomMaterial>) => void;
  removeCustomMaterial: (id: number) => void;
  exportSettings: () => string;
  importSettings: (json: string) => boolean;
  resetToDefaults: () => void;
  calcular: () => void;
  simular: () => void;
  reset: () => void;
  setObjetivoUsinagem: (objetivo: ObjetivoUsinagem) => void;
  addSavedTool: (tool: Pick<Ferramenta, 'tipo' | 'diametro' | 'raioQuina' | 'numeroArestas' | 'balanco'>) => void;
  removeSavedTool: (id: string) => void;
  updateSavedTool: (id: string, updates: Partial<Omit<SavedTool, 'id' | 'createdAt'>>) => void;
  loadSavedTool: (id: string) => void;
  addValidatedSimulation: (sim: Omit<ValidatedSimulation, 'id' | 'createdAt'>) => void;
  removeValidatedSimulation: (id: string) => void;
  loadValidatedSimulation: (id: string) => void;
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
  baseRPM: 0,
  baseFeed: 0,
  baseParams: DEFAULT_PARAMETROS,
  preferences: PREFERENCES_PADRAO,
  safetyRules: SAFETY_RULES_PADRAO,
  customMaterials: [],
  objetivoUsinagem: 'balanceado' as ObjetivoUsinagem,
  savedTools: [],
  validatedSimulations: [],
};

/** Lookup material from built-in list or custom materials */
function findMaterial(id: number, customMaterials: CustomMaterial[]) {
  const custom = customMaterials.find((m) => m.id === id);
  if (custom) return custom;
  return getMaterialById(id);
}

/** Generate industry-standard tool name for savedTools */
function gerarNomeFerramenta(
  f: Pick<Ferramenta, 'tipo' | 'diametro' | 'raioQuina' | 'numeroArestas' | 'balanco'>
): string {
  const tipoLabel = f.tipo === 'toroidal' ? 'Toroidal' : f.tipo === 'esferica' ? 'Esférica' : 'Topo';
  const raio = f.tipo === 'toroidal' && f.raioQuina != null ? ` - R${f.raioQuina}` : '';
  return `${tipoLabel} Ø${f.diametro}${raio} - H${f.balanco} - A${f.numeroArestas}`;
}

/** Auto-populate cutting parameters from recommendation engine */
function autoPopulateParams(materialId: number, tipoOperacao: TipoUsinagem, diametro: number, customMaterials: CustomMaterial[]) {
  const material = findMaterial(materialId, customMaterials);
  if (!material) return undefined;
  return getRecommendedParams(material, tipoOperacao, diametro);
}

export const useMachiningStore = create<MachiningState & MachiningActions>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...INITIAL_STATE,

        setMaterial: (id) => {
          const { tipoOperacao, ferramenta, customMaterials } = get();
          const recommended = autoPopulateParams(id, tipoOperacao, ferramenta.diametro, customMaterials);
          set({ materialId: id, resultado: null, manualOverrides: {}, ...(recommended && { parametros: recommended, baseParams: recommended }) });
          // Don't auto-calculate on material change - user must click Simular
        },

        setFerramenta: (f) => {
          set((state) => {
            const newFerramenta = { ...state.ferramenta, ...f };
            const updates: Partial<MachiningState> = { ferramenta: newFerramenta, resultado: null, manualOverrides: {} };
            if (f.diametro !== undefined && f.diametro !== state.ferramenta.diametro) {
              const recommended = autoPopulateParams(state.materialId, state.tipoOperacao, f.diametro, state.customMaterials);
              if (recommended) {
                updates.parametros = recommended;
                updates.baseParams = recommended;
              }
            }
            return updates;
          });
          // Don't auto-calculate on tool change - user must click Simular
        },

        setTipoOperacao: (tipo) => {
          const { materialId, ferramenta, customMaterials } = get();
          const recommended = autoPopulateParams(materialId, tipo, ferramenta.diametro, customMaterials);
          set({ tipoOperacao: tipo, resultado: null, manualOverrides: {}, ...(recommended && { parametros: recommended, baseParams: recommended }) });
          // Don't auto-calculate on operation change - user must click Simular
        },

        setParametros: (p) => {
          set((state) => ({ parametros: { ...state.parametros, ...p }, resultado: null, manualOverrides: {} }));
          // Don't auto-calculate on parameter change - user must click Simular
        },

        ajustarParametros: (p) => {
          // Fine-tune: update params and recalculate immediately, WITHOUT zeroing resultado or clearing manualOverrides
          set((state) => ({ parametros: { ...state.parametros, ...p } }));
          get().calcular();
        },

        setLimitesMaquina: (l) => {
          set((state) => ({ limitesMaquina: { ...state.limitesMaquina, ...l } }));
          get().calcular();
        },

        setSafetyFactor: (f) => {
          set({ safetyFactor: f, resultado: null });
          // Don't auto-calculate on safety factor change - user must click Simular
        },

        setManualRPM: (rpm) => {
          set({ manualOverrides: { ...get().manualOverrides, rpm } });
          get().calcular();
        },

        setManualFeed: (feed) => {
          set({ manualOverrides: { ...get().manualOverrides, feed } });
          get().calcular();
        },

        setManualRPMPercent: (percent) => {
          const { baseRPM } = get();
          if (baseRPM === 0) {
            if (import.meta.env.DEV) console.warn('[MachiningStore] setManualRPMPercent called before simulation');
            return;
          }
          const newRPM = Math.round(baseRPM * (1 + percent / 100));
          set({ manualOverrides: { ...get().manualOverrides, rpm: newRPM, rpmPercent: percent } });
          get().calcular();
        },

        setManualFeedPercent: (percent) => {
          const { baseFeed } = get();
          if (baseFeed === 0) {
            if (import.meta.env.DEV) console.warn('[MachiningStore] setManualFeedPercent called before simulation');
            return;
          }
          const newFeed = Math.round(baseFeed * (1 + percent / 100));
          set({ manualOverrides: { ...get().manualOverrides, feed: newFeed, feedPercent: percent } });
          get().calcular();
        },

        setParamPercent: (key, percent) => {
          const { baseParams } = get();
          const baseValue = baseParams[key];
          const newValue = baseValue * (1 + percent / 100);
          const percentKey = `${key}Percent` as keyof ManualOverrides;
          set((state) => ({
            parametros: { ...state.parametros, [key]: newValue },
            manualOverrides: { ...state.manualOverrides, [percentKey]: percent },
          }));
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

        exportSettings: () => {
          const { limitesMaquina, safetyFactor, preferences, safetyRules, customMaterials } = get();
          return JSON.stringify({
            version: 1,
            limitesMaquina,
            safetyFactor,
            preferences,
            safetyRules,
            customMaterials,
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
          const { materialId, ferramenta, parametros, limitesMaquina, safetyFactor, manualOverrides, safetyRules, customMaterials, tipoOperacao } = get();
          const { ap, ae } = parametros;
          const { diametro: D, numeroArestas: Z, balanco } = ferramenta;

          const vc = parametros.vc;
          const fz = parametros.fz;

          const material = findMaterial(materialId, customMaterials);
          if (!material) { set({ resultado: null }); return; }

          try { validateInputs({ d: D, ap, ae, fz, vc, z: Z }); }
          catch { set({ resultado: null }); return; }

          // Calculate base values
          const baseRPM = calculateRPM(vc, D);
          const chipResult = calculateEffectiveFz(fz, ae, D);
          const baseFeed = calculateFeedRate(chipResult.fzEfetivo, Z, baseRPM);

          // Apply manual overrides or use base values
          let rpm = baseRPM;
          let avanco = baseFeed;

          // Apply RPM override
          if (manualOverrides.rpm !== undefined) {
            rpm = manualOverrides.rpm;
            // If RPM is overridden but feed is NOT, recalculate feed with manual RPM
            if (manualOverrides.feed === undefined) {
              avanco = calculateFeedRate(chipResult.fzEfetivo, Z, rpm);
            }
          }

          // Apply feed override (takes priority over recalculated feed)
          if (manualOverrides.feed !== undefined) {
            avanco = manualOverrides.feed;
          }

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

          // Calculate power headroom (%)
          const powerHeadroom = Math.max(0, ((limitesMaquina.maxPotencia - potenciaMotor) / limitesMaquina.maxPotencia) * 100);

          // Calculate health score from parameter zones
          const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao);
          const vcZone = getVcZone(vc, bounds.vc.recomendado);
          const fzZone = getFzZone(chipResult.fzEfetivo, bounds.fz.recomendado);
          const aeZone = getAeZone(ae, bounds.ae.recomendado);
          const apZone = getApZone(ap, bounds.ap.recomendado, D, balanco);
          const healthScore = calculateHealthScore(vcZone, fzZone, aeZone, apZone);

          set({
            baseRPM,
            baseFeed,
            resultado: {
              rpm,
              avanco,
              potenciaCorte: potenciaCorte * safetyFactor,
              potenciaMotor: potenciaMotor * safetyFactor,
              torque: torque * safetyFactor,
              mrr,
              vcReal: (Math.PI * D * rpm) / 1000,
              fzEfetivo: chipResult.fzEfetivo,
              seguranca: { nivel, avisos, razaoLD, ctf: chipResult.ctfFactor },
              powerHeadroom,
              healthScore,
            },
          });
        },

        simular: () => {
          get().calcular();
          const { resultado, materialId, ferramenta, tipoOperacao, parametros, customMaterials } = get();
          if (!resultado) return;
          const material = findMaterial(materialId, customMaterials);
          useHistoryStore.getState().addEntry({
            materialNome: material?.nome ?? 'Desconhecido',
            materialId,
            ferramenta: { ...ferramenta },
            tipoOperacao,
            parametros: { ...parametros },
            resultado: { ...resultado },
          });
          // Track usage for admin stats
          useUsageStore.getState().trackUsage({
            materialNome: material?.nome ?? 'Desconhecido',
            tipoOperacao: String(tipoOperacao),
            ferramentaTipo: ferramenta.tipo,
            ferramentaDiametro: ferramenta.diametro,
          });
        },

        setObjetivoUsinagem: (objetivo) => {
          // Does NOT clear resultado — only affects visual indicator zones
          set({ objetivoUsinagem: objetivo });
        },

        addSavedTool: (toolData) => {
          const nome = gerarNomeFerramenta(toolData);
          const newTool: SavedTool = {
            id: crypto.randomUUID(),
            nome,
            createdAt: new Date().toISOString(),
            ...toolData,
          };
          set((state) => ({ savedTools: [...state.savedTools, newTool] }));
        },

        removeSavedTool: (id) => {
          set((state) => ({ savedTools: state.savedTools.filter((t) => t.id !== id) }));
        },

        updateSavedTool: (id, updates) => {
          set((state) => ({
            savedTools: state.savedTools.map((t) =>
              t.id === id
                ? { ...t, ...updates, nome: gerarNomeFerramenta({ ...t, ...updates }) }
                : t
            ),
          }));
        },

        loadSavedTool: (id) => {
          const { savedTools } = get();
          const tool = savedTools.find((t) => t.id === id);
          if (!tool) return;
          const { id: _id, nome: _nome, createdAt: _createdAt, ...ferramentaFields } = tool;
          set({
            ferramenta: { ...get().ferramenta, ...ferramentaFields },
            resultado: null,
            manualOverrides: {},
          });
        },

        addValidatedSimulation: (sim) => {
          const newSim: ValidatedSimulation = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ...sim,
          };
          set((state) => ({ validatedSimulations: [...state.validatedSimulations, newSim] }));
        },

        removeValidatedSimulation: (id) => {
          set((state) => ({
            validatedSimulations: state.validatedSimulations.filter((s) => s.id !== id),
          }));
        },

        loadValidatedSimulation: (id) => {
          const { validatedSimulations } = get();
          const sim = validatedSimulations.find((s) => s.id === id);
          if (!sim) return;
          set({
            materialId: sim.materialId,
            tipoOperacao: sim.tipoOperacao,
            objetivoUsinagem: sim.objetivoUsinagem,
            parametros: { ...sim.parametros },
            ferramenta: { ...get().ferramenta, ...sim.ferramenta },
            resultado: { ...sim.resultado },
            manualOverrides: {},
          });
          // No calcular() call — resultado comes from snapshot
        },

        reset: () => set({ ...INITIAL_STATE }),
      }),
      {
        name: 'tooloptimizer-cnc-settings',
        version: 3,
        migrate: (persistedState, fromVersion) => {
          const state = persistedState as Record<string, unknown>;
          if (fromVersion < 2) {
            return {
              ...state,
              objetivoUsinagem: 'balanceado' as ObjetivoUsinagem,
              savedTools: [] as SavedTool[],
              validatedSimulations: [] as ValidatedSimulation[],
            };
          }
          if (fromVersion < 3) {
            // v3: Remove deprecated Kc fields — they are ignored by partialize
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { customToolConfig, toolCorrectionFactors, ...rest } = state;
            return rest;
          }
          return persistedState;
        },
        partialize: (state) => ({
          limitesMaquina: state.limitesMaquina,
          safetyFactor: state.safetyFactor,
          preferences: state.preferences,
          safetyRules: state.safetyRules,
          customMaterials: state.customMaterials,
          objetivoUsinagem: state.objetivoUsinagem,
          savedTools: state.savedTools,
          validatedSimulations: state.validatedSimulations,
        }),
      },
    ),
  ),
);
