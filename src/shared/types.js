/**
 * DATA SCHEMAS - ToolOptimizer CNC v2.0
 * Tipos e interfaces para todo o sistema
 */

/**
 * @typedef {'aco-1020' | 'aco-1045' | 'aco-4140' | 'inox-304' | 'aluminio-6061'} MaterialId
 */

/**
 * @typedef {Object} Material
 * @property {MaterialId} id
 * @property {string} name
 * @property {number} hardness - Dureza HB
 * @property {number} vcMin - Vc mínima m/min
 * @property {number} vcRecommended - Vc recomendada m/min
 * @property {number} vcMax - Vc máxima m/min
 * @property {number} kc - Pressão de corte específica
 */

/**
 * @typedef {'desbaste' | 'redesbaste' | 'semi-acabamento' | 'acabamento'} OperationType
 */

/**
 * @typedef {Object} Operation
 * @property {OperationType} id
 * @property {string} name
 * @property {number} apFactor - Fator de profundidade
 * @property {number} aeFactor - Fator de largura
 * @property {number} fzFactor - Fator de avanço
 */

/**
 * @typedef {'topo-reto' | 'esferica' | 'toroidal'} ToolType
 */

/**
 * @typedef {'inteirica' | 'com-rebaixo'} PhysicalConfig
 */

/**
 * @typedef {Object} ToolData
 * @property {ToolType} type
 * @property {number} diameter - Diâmetro em mm (2-16)
 * @property {number} [cornerRadius] - Raio de canto (apenas toroidal)
 * @property {number} fluteCount - Número de arestas (2, 3 ou 4)
 * @property {PhysicalConfig} physicalConfig
 * @property {number} [neckHeight] - Altura do rebaixo (se com-rebaixo)
 * @property {number} fixingHeight - Altura de fixação (10-100mm)
 */

/**
 * @typedef {Object} CuttingParams
 * @property {number} vc - Velocidade de corte m/min (50-200)
 * @property {number} fz - Avanço por dente mm/dente (0.01-0.20)
 * @property {number} ae - Largura de corte mm (% do diâmetro)
 * @property {number} ap - Profundidade axial mm (% do diâmetro)
 */

/**
 * @typedef {Object} CalculationInput
 * @property {MaterialId} materialId
 * @property {OperationType} operationType
 * @property {ToolData} tool
 * @property {CuttingParams} params
 */

/**
 * @typedef {Object} CalculationResult
 * @property {number} rpm - Rotação calculada
 * @property {number} feedRate - Avanço mm/min
 * @property {number} effectiveVc - Vc efetiva
 * @property {number} effectiveFz - fz efetivo
 * @property {number} mrr - Taxa de remoção cm³/min
 * @property {number} power - Potência estimada kW
 * @property {number} torque - Torque estimado Nm
 * @property {ValidationResult} validation
 * @property {PerformanceMetrics} metrics
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid
 * @property {'ok' | 'warning' | 'danger'} status
 * @property {string[]} warnings
 * @property {string[]} errors
 */

/**
 * @typedef {Object} PerformanceMetrics
 * @property {number} toolLifeRemaining - Vida útil restante (0-1000 hours)
 * @property {number} efficiencyRate - Taxa de eficiência (0-100%)
 * @property {number} spindleLoad - Carga do spindle (0-100%)
 */

/**
 * Ranges e limites de validação
 * Nota: Vc varia muito por material - validação feita por material específico
 */
export const VALIDATION_RANGES = {
  diameter: { min: 2, max: 16 },
  cornerRadius: { options: [0.5, 1.0] },
  fixingHeight: { min: 10, max: 100 },
  neckHeight: { min: 5, max: 30 },
  // Vc: range global (material específico tem seus próprios limites)
  vc: { min: 35, max: 600 },
  // fz varia por material - valores base para aço
  fz: { min: 0.01, max: 0.20, idealMin: 0.04, idealMax: 0.10 },
  ae: { minPercent: 5, maxPercent: 100, idealMinPercent: 15, idealMaxPercent: 40 },
  ap: { minPercent: 5, maxPercent: 100, idealMinPercent: 10, idealMaxPercent: 50 },
};

/**
 * Limites da máquina (hardcoded conforme P10)
 */
export const MACHINE_LIMITS = {
  maxRPM: 24000,
  maxPower: 15, // kW
  maxFeed: 2000, // mm/min
  maxToolLength: 200, // mm
  maxDiameter: 32, // mm
  criticalLDRatio: 6,
  criticalDeflection: 0.10, // mm
  powerWarningThreshold: 0.85, // 85%
};

/**
 * Materiais disponíveis
 * Fonte: Sandvik Coromant, Kennametal, Seco Tools (2023-2024)
 * Conforme PARAMETROS_MATERIAL.md
 */
export const MATERIALS = {
  // === AÇOS CARBONO ===
  'aco-1020': {
    id: 'aco-1020',
    name: 'Aço ABNT 1020',
    hardness: '120-160 HB',
    hardnessValue: 140,
    resistencia: 380,
    usinabilidade: 'Muito boa',
    kc: 1800,
    // Parâmetros por operação (Toroidal 4 flautas)
    operacoes: {
      desbaste: { vcMin: 100, vcMax: 150, fz: 0.10, apMin: 0.8, apMax: 1.5, aeMin: 30, aeMax: 60 },
      'semi-acabamento': { vcMin: 120, vcMax: 170, fz: 0.08, apMin: 0.5, apMax: 1.0, aeMin: 20, aeMax: 40 },
      acabamento: { vcMin: 140, vcMax: 190, fz: 0.06, apMin: 0.3, apMax: 0.6, aeMin: 12, aeMax: 25 }
    },
    vcMin: 100,
    vcRecommended: 165,
    vcMax: 190,
    fonte: 'Sandvik C-2920:040'
  },
  'aco-1045': {
    id: 'aco-1045',
    name: 'Aço ABNT 1045',
    hardness: '170-220 HB',
    hardnessValue: 195,
    resistencia: 600,
    usinabilidade: 'Média',
    kc: 2000,
    operacoes: {
      desbaste: { vcMin: 80, vcMax: 120, fz: 0.08, apMin: 0.5, apMax: 1.0, aeMin: 25, aeMax: 50 },
      'semi-acabamento': { vcMin: 100, vcMax: 140, fz: 0.06, apMin: 0.3, apMax: 0.6, aeMin: 15, aeMax: 30 },
      acabamento: { vcMin: 120, vcMax: 160, fz: 0.05, apMin: 0.2, apMax: 0.4, aeMin: 10, aeMax: 20 }
    },
    vcMin: 80,
    vcRecommended: 120,
    vcMax: 160,
    fonte: 'Sandvik C-2920:051'
  },
  // === ALUMÍNIO ===
  'aluminio-6061': {
    id: 'aluminio-6061',
    name: 'Alumínio 6061-T6',
    hardness: '95 HB',
    hardnessValue: 95,
    resistencia: 310,
    usinabilidade: 'Excelente',
    kc: 700,
    operacoes: {
      desbaste: { vcMin: 300, vcMax: 500, fz: 0.15, apMin: 1.5, apMax: 3.0, aeMin: 40, aeMax: 70 },
      'semi-acabamento': { vcMin: 350, vcMax: 550, fz: 0.12, apMin: 0.8, apMax: 1.5, aeMin: 25, aeMax: 40 },
      acabamento: { vcMin: 400, vcMax: 600, fz: 0.10, apMin: 0.4, apMax: 0.8, aeMin: 15, aeMax: 30 }
    },
    vcMin: 300,
    vcRecommended: 500,
    vcMax: 600,
    fonte: 'Kennametal B211-AL'
  },
  // === AÇO INOXIDÁVEL ===
  'inox-304': {
    id: 'inox-304',
    name: 'Aço Inox AISI 304',
    hardness: '140-180 HB',
    hardnessValue: 160,
    resistencia: 520,
    usinabilidade: 'Difícil (encruamento)',
    kc: 2400,
    operacoes: {
      desbaste: { vcMin: 60, vcMax: 90, fz: 0.07, apMin: 0.4, apMax: 0.8, aeMin: 20, aeMax: 40 },
      'semi-acabamento': { vcMin: 80, vcMax: 110, fz: 0.05, apMin: 0.2, apMax: 0.5, aeMin: 12, aeMax: 25 },
      acabamento: { vcMin: 90, vcMax: 130, fz: 0.04, apMin: 0.15, apMax: 0.3, aeMin: 8, aeMax: 15 }
    },
    vcMin: 60,
    vcRecommended: 110,
    vcMax: 130,
    fonte: 'Sandvik C-1110:1'
  },
  // === AÇOS FERRAMENTA ===
  'aco-p20': {
    id: 'aco-p20',
    name: 'Aço P20 (tratado)',
    hardness: '280-320 HB',
    hardnessValue: 300,
    resistencia: 1000,
    usinabilidade: 'Média (moldes)',
    kc: 2400,
    operacoes: {
      desbaste: { vcMin: 60, vcMax: 90, fz: 0.06, apMin: 0.4, apMax: 0.8, aeMin: 20, aeMax: 40 },
      'semi-acabamento': { vcMin: 80, vcMax: 110, fz: 0.05, apMin: 0.2, apMax: 0.5, aeMin: 12, aeMax: 25 },
      acabamento: { vcMin: 90, vcMax: 130, fz: 0.04, apMin: 0.15, apMax: 0.3, aeMin: 8, aeMax: 15 }
    },
    vcMin: 60,
    vcRecommended: 110,
    vcMax: 130,
    fonte: 'Sandvik C-2920:061'
  },
  'aco-2711': {
    id: 'aco-2711',
    name: 'Aço 2711 (tratado)',
    hardness: '300-340 HB',
    hardnessValue: 320,
    resistencia: 1100,
    usinabilidade: 'Difícil (alta dureza)',
    kc: 2600,
    operacoes: {
      desbaste: { vcMin: 50, vcMax: 75, fz: 0.05, apMin: 0.3, apMax: 0.6, aeMin: 15, aeMax: 30 },
      'semi-acabamento': { vcMin: 65, vcMax: 95, fz: 0.04, apMin: 0.2, apMax: 0.4, aeMin: 10, aeMax: 20 },
      acabamento: { vcMin: 75, vcMax: 110, fz: 0.03, apMin: 0.1, apMax: 0.25, aeMin: 6, aeMax: 12 }
    },
    vcMin: 50,
    vcRecommended: 92,
    vcMax: 110,
    fonte: 'Kennametal B212-HM'
  },
  // === AÇOS CEMENTADOS ===
  'aco-8620-nucleo': {
    id: 'aco-8620-nucleo',
    name: 'Aço 8620 (núcleo)',
    hardness: '180-220 HB',
    hardnessValue: 200,
    resistencia: 650,
    usinabilidade: 'Média',
    kc: 2100,
    operacoes: {
      desbaste: { vcMin: 90, vcMax: 130, fz: 0.09, apMin: 0.6, apMax: 1.2, aeMin: 25, aeMax: 50 },
      'semi-acabamento': { vcMin: 110, vcMax: 150, fz: 0.07, apMin: 0.4, apMax: 0.8, aeMin: 18, aeMax: 35 },
      acabamento: { vcMin: 130, vcMax: 170, fz: 0.06, apMin: 0.25, apMax: 0.5, aeMin: 12, aeMax: 25 }
    },
    vcMin: 90,
    vcRecommended: 150,
    vcMax: 170,
    fonte: 'Sandvik C-2920:055'
  },
  'aco-8620-cementado': {
    id: 'aco-8620-cementado',
    name: 'Aço 8620 (cementado)',
    hardness: '58-62 HRC',
    hardnessValue: 600, // HRC equivalente
    resistencia: 1500,
    usinabilidade: 'Muito difícil',
    kc: 2800,
    operacoes: {
      desbaste: { vcMin: 40, vcMax: 60, fz: 0.04, apMin: 0.2, apMax: 0.4, aeMin: 12, aeMax: 25 },
      'semi-acabamento': { vcMin: 55, vcMax: 80, fz: 0.03, apMin: 0.15, apMax: 0.3, aeMin: 8, aeMax: 18 },
      acabamento: { vcMin: 65, vcMax: 95, fz: 0.025, apMin: 0.1, apMax: 0.2, aeMin: 5, aeMax: 12 }
    },
    vcMin: 40,
    vcRecommended: 80,
    vcMax: 95,
    fonte: 'Sandvik C-2920:055',
    observacao: 'Considerar retífica como alternativa'
  },
  'aco-h13': {
    id: 'aco-h13',
    name: 'Aço H13 (tratado)',
    hardness: '45-52 HRC',
    hardnessValue: 500, // HRC equivalente
    resistencia: 1800,
    usinabilidade: 'Extrema (requer AlTiN/CBN)',
    kc: 3000,
    operacoes: {
      desbaste: { vcMin: 35, vcMax: 55, fz: 0.03, apMin: 0.15, apMax: 0.3, aeMin: 10, aeMax: 20 },
      'semi-acabamento': { vcMin: 50, vcMax: 75, fz: 0.025, apMin: 0.1, apMax: 0.25, aeMin: 6, aeMax: 15 },
      acabamento: { vcMin: 60, vcMax: 90, fz: 0.02, apMin: 0.08, apMax: 0.15, aeMin: 4, aeMax: 10 }
    },
    vcMin: 35,
    vcRecommended: 75,
    vcMax: 90,
    fonte: 'Sandvik C-2920:070',
    observacao: 'Para H13 > 50 HRC, considerar EDM'
  }
};

/**
 * Operações disponíveis
 */
export const OPERATIONS = {
  'desbaste': {
    id: 'desbaste',
    name: 'Desbaste',
    apFactor: 1.0,
    aeFactor: 0.6,
    fzFactor: 1.0,
  },
  'redesbaste': {
    id: 'redesbaste',
    name: 'Redesbaste',
    apFactor: 0.7,
    aeFactor: 0.4,
    fzFactor: 0.9,
  },
  'semi-acabamento': {
    id: 'semi-acabamento',
    name: 'Semi-acabamento',
    apFactor: 0.5,
    aeFactor: 0.3,
    fzFactor: 0.8,
  },
  'acabamento': {
    id: 'acabamento',
    name: 'Acabamento',
    apFactor: 0.2,
    aeFactor: 0.15,
    fzFactor: 0.6,
  },
};

/**
 * Fatores L/D (relação balanço/diâmetro)
 */
export const LD_FACTORS = [
  { ldMin: 0.0, ldMax: 2.0, speedFactor: 1.00, feedFactor: 1.00, apFactor: 1.00, riskLevel: 'low' },
  { ldMin: 2.0, ldMax: 4.0, speedFactor: 0.95, feedFactor: 0.90, apFactor: 0.85, riskLevel: 'medium' },
  { ldMin: 4.0, ldMax: 6.0, speedFactor: 0.75, feedFactor: 0.60, apFactor: 0.50, riskLevel: 'high' },
  { ldMin: 6.0, ldMax: 999.0, speedFactor: 0.50, feedFactor: 0.40, apFactor: 0.30, riskLevel: 'critical' },
];

export default {
  VALIDATION_RANGES,
  MACHINE_LIMITS,
  MATERIALS,
  OPERATIONS,
  LD_FACTORS,
};
