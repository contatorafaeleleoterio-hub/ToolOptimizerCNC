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
  paramRanges?: ToolParamRanges; // override manual de ranges do Ajuste Fino
}

/** Override opcional de range para um parâmetro (undefined = automático) */
export interface ParamRangeOverride {
  min?: number;
  max?: number;
  desejado?: number;
}

/** Overrides dos 4 parâmetros do Ajuste Fino para uma ferramenta específica */
export interface ToolParamRanges {
  vc?: ParamRangeOverride;
  fz?: ParamRangeOverride;
  ae?: ParamRangeOverride;
  ap?: ParamRangeOverride;
}

/** Limites calculados para um parâmetro do slider do Ajuste Fino */
export interface ParamBounds {
  min: number;
  max: number;
  step: number;
  recomendado: number;
}

/** Limites dinâmicos dos 4 sliders do Ajuste Fino (Vc, fz, ae, ap) */
export interface SliderBounds {
  vc: ParamBounds;
  fz: ParamBounds;
  ae: ParamBounds;
  ap: ParamBounds;
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
  seguranca: StatusSeguranca;
  powerHeadroom: number; // Percentage of available power remaining
  healthScore: number; // Weighted aggregate of Vc/fz/ae/ap zones [0, 100]
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

/** Tool correction factor: global multiplier applied to Vc and fz for a specific tool (type + diameter) */
export interface ToolCorrectionFactor {
  /** Tool type matching Ferramenta.tipo */
  tipo: 'toroidal' | 'esferica' | 'topo';
  /** Tool diameter in mm */
  diametro: number;
  /** Global multiplier applied to Vc and fz (e.g. 1.2 = +20%, default 1.0) */
  fator: number;
  /** Optional label/description (e.g. "TiAlN", "DLC", "não revestida") */
  descricao?: string;
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
  favorited?: boolean; // optional — backward-compat with existing localStorage entries
}

/** Maximum history entries stored */
export const HISTORICO_MAX_ENTRIES = 50;

/** Machining objective — affects visual threshold zones of indicators (does NOT alter calculations) */
export type ObjetivoUsinagem = 'velocidade' | 'balanceado' | 'vida_util';

/**
 * Saved tool — physical configuration only, no result.
 * Auto-saved after each simulation with a new tool config.
 */
export interface SavedTool {
  id: string;           // crypto.randomUUID()
  nome: string;         // "Topo Ø10 - H20 - A4" | "Toroidal Ø10 - R1 - H20 - A4"
  tipo: Ferramenta['tipo'];
  diametro: number;
  raioQuina?: number;   // toroidal only
  numeroArestas: number;
  balanco: number;
  createdAt: string;    // ISO 8601
}

/**
 * Validated simulation — full snapshot approved by operator.
 * Loaded without recalculating (resultado comes from snapshot).
 */
export interface ValidatedSimulation {
  id: string;                 // crypto.randomUUID()
  nome: string;               // "Topo Ø10 - Aço 1045 - Desbaste"
  ferramentaNome: string;     // denormalized for quick display
  materialNome: string;       // denormalized for quick display
  materialId: number;
  tipoOperacao: TipoUsinagem;
  objetivoUsinagem: ObjetivoUsinagem;
  parametros: ParametrosUsinagem;
  resultado: ResultadoUsinagem;
  ferramenta: Pick<SavedTool, 'tipo' | 'diametro' | 'raioQuina' | 'numeroArestas' | 'balanco'>;
  createdAt: string;          // ISO 8601
}
