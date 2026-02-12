/**
 * ToolOptimizer CNC - Type Definitions
 * Based on: docs/technical/srctypes.md
 * Zero `any`, strict mode compliant
 */

/** Machining operation types */
export enum TipoUsinagem {
  DESBASTE = 'desbaste',
  SEMI_ACABAMENTO = 'semi',
  ACABAMENTO = 'acabamento',
}

/** ISO material classification */
export type ClasseISO = 'P' | 'M' | 'N' | 'H';

/** Data validation status */
export type StatusValidacao = 'validado' | 'estimado';

/**
 * Machining material with physical properties
 */
export interface Material {
  id: number;
  nome: string;
  iso: ClasseISO;
  dureza: string;
  kc1_1: number;
  mc: number;
  vcRanges: {
    [key in TipoUsinagem]: [number, number];
  };
  status: StatusValidacao;
}

/**
 * Cutting tool (end mill)
 */
export interface Ferramenta {
  tipo: 'toroidal' | 'esferica' | 'topo';
  diametro: number;
  numeroArestas: number;
  balanco: number;
  raioQuina?: number;
}

/**
 * Machining input parameters (user inputs)
 */
export interface ParametrosUsinagem {
  ap: number;
  ae: number;
  fz: number;
  vc: number;
}

/**
 * Machine physical limits
 */
export interface LimitesMaquina {
  maxRPM: number;
  maxPotencia: number;
  maxTorque: number;
  maxAvanco: number;
  eficiencia: number;
}

/**
 * Safety status and engineering alerts
 */
export interface StatusSeguranca {
  nivel: 'verde' | 'amarelo' | 'vermelho' | 'bloqueado';
  avisos: string[];
  razaoLD: number;
  ctf: number;
}

/**
 * Complete calculation engine result
 */
export interface ResultadoUsinagem {
  rpm: number;
  avanco: number;
  potenciaCorte: number;
  potenciaMotor: number;
  torque: number;
  mrr: number;
  vcReal: number;
  fzEfetivo: number;
  forcaCorte: number;
  seguranca: StatusSeguranca;
}

/** Default machine limits */
export const LIMITES_PADRAO_MAQUINA: LimitesMaquina = {
  maxRPM: 12000,
  maxPotencia: 15,
  maxTorque: 80,
  maxAvanco: 5000,
  eficiencia: 0.85,
};

/** Safety rules for L/D ratio and ap limits */
export const REGRAS_SEGURANCA = {
  LD: {
    SEGURO: 3,
    ALERTA: 4,
    CRITICO: 6,
  },
  AP_MAX_MULT: {
    [TipoUsinagem.DESBASTE]: 1.0,
    [TipoUsinagem.SEMI_ACABAMENTO]: 0.5,
    [TipoUsinagem.ACABAMENTO]: 0.3,
  },
} as const;

/** Configurable L/D thresholds */
export interface LDThresholds {
  seguro: number;
  alerta: number;
  critico: number;
}

/** Configurable safety rules (stored in Zustand) */
export interface SafetyRules {
  ld: LDThresholds;
  apMaxMult: Record<TipoUsinagem, number>;
}

/** User display preferences */
export interface Preferences {
  decimals: number;
  machineName: string;
}

/** Custom material added by user */
export interface CustomMaterial extends Material {
  isCustom: true;
}

/** Custom tool config */
export interface CustomToolConfig {
  extraDiameters: number[];
  extraRadii: number[];
}

/** Default preferences */
export const PREFERENCES_PADRAO: Preferences = {
  decimals: 2,
  machineName: '',
};

/** Default safety rules */
export const SAFETY_RULES_PADRAO: SafetyRules = {
  ld: { seguro: 3, alerta: 4, critico: 6 },
  apMaxMult: {
    [TipoUsinagem.DESBASTE]: 1.0,
    [TipoUsinagem.SEMI_ACABAMENTO]: 0.5,
    [TipoUsinagem.ACABAMENTO]: 0.3,
  },
};

/** Default custom tool config */
export const CUSTOM_TOOL_CONFIG_PADRAO: CustomToolConfig = {
  extraDiameters: [],
  extraRadii: [],
};

/** Operator feedback on a calculation result */
export type FeedbackOperador = 'sucesso' | 'quebra' | 'acabamento_ruim' | null;

/** A single history entry saved after each simulation */
export interface HistoricoCalculo {
  id: string;
  timestamp: number;
  materialNome: string;
  materialId: number;
  ferramenta: Ferramenta;
  tipoOperacao: TipoUsinagem;
  parametros: ParametrosUsinagem;
  resultado: ResultadoUsinagem;
  feedback: FeedbackOperador;
  notas: string;
}

/** Maximum history entries stored */
export const HISTORICO_MAX_ENTRIES = 50;
