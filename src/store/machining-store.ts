/**
 * Zustand Store - Central state management for ToolOptimizer CNC
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Ferramenta, LimitesMaquina, ParametrosUsinagem, ResultadoUsinagem, StatusSeguranca } from '@/types/index';
import { TipoUsinagem, LIMITES_PADRAO_MAQUINA } from '@/types/index';
import { calculateRPM, calculateEffectiveFz, calculateFeedRate, calculateMRR, calculatePower, calculateTorque, validateLDRatio, validateInputs, validateMachineLimits } from '@/engine/index';
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
};

export const useMachiningStore = create<MachiningState & MachiningActions>()(
  subscribeWithSelector((set, get) => ({
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

    calcular: () => {
      const { materialId, ferramenta, parametros, limitesMaquina, safetyFactor, manualOverrides } = get();
      const { ap, ae, fz, vc } = parametros;
      const { diametro: D, numeroArestas: Z, balanco } = ferramenta;

      const material = getMaterialById(materialId);
      if (!material) { set({ resultado: null }); return; }

      try { validateInputs({ d: D, ap, ae, fz, vc, z: Z }); }
      catch { set({ resultado: null }); return; }

      let rpm = calculateRPM(vc, D);
      const chipResult = calculateEffectiveFz(fz, ae, D);
      let avanco = calculateFeedRate(chipResult.fzEfetivo, Z, rpm);

      if (manualOverrides.rpm !== undefined) rpm = manualOverrides.rpm;
      if (manualOverrides.feed !== undefined) avanco = manualOverrides.feed;

      const mrr = calculateMRR(ap, ae, avanco);
      const kc = material.kc1_1;
      const potenciaMotor = calculatePower(mrr, kc, limitesMaquina.eficiencia);
      const potenciaCorte = (mrr * kc) / 60000;
      const torque = calculateTorque(potenciaMotor, rpm);
      const ldNivel = validateLDRatio(balanco, D);
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
  })),
);
