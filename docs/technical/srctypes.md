/**
 * TYPES.TS - Fundação de Tipagem do ToolOptimizer
 * Baseado em: PRD_MASTER.md + ESPECIFICACAO_TECNICA_CONSOLIDADA.md
 * Versão: 2.1 (Revisada)
 */

/** Enum para tipos de operação de usinagem */
export enum TipoUsinagem {
  DESBASTE = 'desbaste',
  SEMI_ACABAMENTO = 'semi',
  ACABAMENTO = 'acabamento'
}

/** Classificação ISO de materiais */
export type ClasseISO = 'P' | 'M' | 'N' | 'H';

/** Status de validação dos dados de corte */
export type StatusValidacao = 'validado' | 'estimado';

/**
 * Material de usinagem com propriedades físicas
 */
export interface Material {
  id: number;
  nome: string;
  iso: ClasseISO;
  dureza: string;
  kc1_1: number; // Força específica em N/mm²
  mc: number;    // Expoente de Kienzle (adimensional)
  vcRanges: {
    [key in TipoUsinagem]: [number, number]; // [min, max] em m/min
  };
  status: StatusValidacao;
}

/**
 * Ferramenta de corte (fresa)
 */
export interface Ferramenta {
  tipo: 'toroidal' | 'esferica' | 'topo';
  diametro: number;      // mm (D)
  numeroArestas: number; // Z (adimensional)
  balanco: number;       // mm (L - Comprimento fora do suporte)
  raioQuina?: number;    // mm (r)
}

/**
 * Parâmetros de entrada da usinagem (Inputs do Usuário)
 */
export interface ParametrosUsinagem {
  ap: number; // Profundidade axial (mm)
  ae: number; // Engajamento radial (mm)
  fz: number; // Avanço por dente (mm/dente)
  vc: number; // Velocidade de corte escolhida (m/min)
}

/**
 * Limites físicos da máquina-ferramenta
 */
export interface LimitesMaquina {
  maxRPM: number;
  maxPotencia: number; // kW
  maxTorque: number;   // Nm
  maxAvanco: number;   // mm/min
  eficiencia: number;  // η (padrão 0.85)
}

/**
 * Status de segurança e alertas de engenharia
 */
export interface StatusSeguranca {
  nivel: 'verde' | 'amarelo' | 'vermelho' | 'bloqueado';
  avisos: string[];
  razaoLD: number; // Razão L/D
  ctf: number;     // Fator de Chip Thinning aplicado
}

/**
 * Resultado completo do motor de cálculo
 */
export interface ResultadoUsinagem {
  rpm: number;           // n
  avanco: number;        // Vf (mm/min)
  potenciaCorte: number; // Pc (kW)
  potenciaMotor: number; // Pm (kW) - potenciaCorte / eficiencia
  torque: number;        // Mc (Nm)
  mrr: number;           // Q (cm³/min)
  vcReal: number;        // Vc efetiva
  fzEfetivo: number;     // fz corrigido pelo CTF
  forcaCorte: number;    // Fc (N)
  seguranca: StatusSeguranca;
}

/**
 * Interface para o Zustand Store
 */
export interface AppStore {
  // Estado
  materialSelecionado: Material | null;
  ferramentaSelecionada: Ferramenta | null;
  tipoUsinagem: TipoUsinagem;
  parametros: ParametrosUsinagem;
  limitesMaquina: LimitesMaquina;
  resultado: ResultadoUsinagem | null;
  
  // Ações
  setMaterial: (id: number) => void;
  setFerramenta: (ferramenta: Partial<Ferramenta>) => void;
  setTipoUsinagem: (tipo: TipoUsinagem) => void;
  setParametros: (params: Partial<ParametrosUsinagem>) => void;
  setLimitesMaquina: (limites: Partial<LimitesMaquina>) => void;
  
  // Lógica Core
  calcular: () => void;
  resetar: () => void;
}

/**
 * CONSTANTES GLOBAIS DE REFERÊNCIA
 */

export const LIMITES_PADRAO_MAQUINA: LimitesMaquina = {
  maxRPM: 12000,
  maxPotencia: 15,
  maxTorque: 80,
  maxAvanco: 5000,
  eficiencia: 0.85
};

export const REGRAS_SEGURANCA = {
  LD: {
    SEGURO: 3,
    ALERTA: 4,
    CRITICO: 6
  },
  AP_MAX_MULT: {
    [TipoUsinagem.DESBASTE]: 1.0,
    [TipoUsinagem.SEMI_ACABAMENTO]: 0.5,
    [TipoUsinagem.ACABAMENTO]: 0.3
  }
} as const;
