/**
 * FÓRMULAS CNC - Sandvik Coromant Baseline
 * Motor de cálculo frame-agnostic
 */

/**
 * Calcula RPM a partir de Vc e Diâmetro
 * n = (Vc × 1000) / (π × D)
 * Fonte: ISO 3685:2017, Sandvik 2023 p.142
 *
 * @param {number} vc - Velocidade de corte em m/min
 * @param {number} diameter - Diâmetro em mm
 * @returns {number} RPM calculado
 */
export function calculateRPM(vc, diameter) {
  if (diameter <= 0) {
    throw new Error('Diâmetro deve ser maior que 0');
  }
  return Math.round((vc * 1000) / (Math.PI * diameter));
}

/**
 * Calcula Vc a partir de RPM e Diâmetro
 * Vc = (π × D × n) / 1000
 *
 * @param {number} rpm - Rotação em RPM
 * @param {number} diameter - Diâmetro em mm
 * @returns {number} Vc em m/min
 */
export function calculateVc(rpm, diameter) {
  if (diameter <= 0) {
    throw new Error('Diâmetro deve ser maior que 0');
  }
  return (Math.PI * diameter * rpm) / 1000;
}

/**
 * Calcula Avanço (Feed Rate)
 * Vf = n × Z × fz
 * Fonte: Sandvik 2023 p.142
 *
 * @param {number} rpm - Rotação em RPM
 * @param {number} fluteCount - Número de arestas (Z)
 * @param {number} fz - Avanço por dente em mm/dente
 * @returns {number} Avanço em mm/min
 */
export function calculateFeedRate(rpm, fluteCount, fz) {
  return Math.round(rpm * fluteCount * fz);
}

/**
 * Calcula fz a partir do Feed Rate
 * fz = Vf / (n × Z)
 *
 * @param {number} feedRate - Avanço em mm/min
 * @param {number} rpm - Rotação em RPM
 * @param {number} fluteCount - Número de arestas
 * @returns {number} fz em mm/dente
 */
export function calculateFz(feedRate, rpm, fluteCount) {
  if (rpm <= 0 || fluteCount <= 0) {
    throw new Error('RPM e número de arestas devem ser maiores que 0');
  }
  return feedRate / (rpm * fluteCount);
}

/**
 * Calcula Taxa de Remoção de Material (MRR)
 * Q = (ap × ae × Vf) / 1000
 * Fonte: ASM Handbook Vol.16 p.234
 *
 * @param {number} ap - Profundidade axial em mm
 * @param {number} ae - Largura de corte em mm
 * @param {number} feedRate - Avanço em mm/min
 * @returns {number} MRR em cm³/min
 */
export function calculateMRR(ap, ae, feedRate) {
  return (ap * ae * feedRate) / 1000;
}

/**
 * Calcula Potência de Corte
 * P = (Vc × ap × ae × kc) / 60000
 *
 * @param {number} vc - Velocidade de corte m/min
 * @param {number} ap - Profundidade axial mm
 * @param {number} ae - Largura de corte mm
 * @param {number} kc - Pressão de corte específica (por material)
 * @returns {number} Potência em kW
 */
export function calculatePower(vc, ap, ae, kc) {
  return (vc * ap * ae * kc) / 60000;
}

/**
 * Calcula Torque
 * T = (P × 30000) / (π × n)
 *
 * @param {number} power - Potência em kW
 * @param {number} rpm - Rotação em RPM
 * @returns {number} Torque em Nm
 */
export function calculateTorque(power, rpm) {
  if (rpm <= 0) {
    throw new Error('RPM deve ser maior que 0');
  }
  return (power * 30000) / (Math.PI * rpm);
}

/**
 * Calcula relação L/D (balanço/diâmetro)
 *
 * @param {number} length - Comprimento de balanço em mm
 * @param {number} diameter - Diâmetro em mm
 * @returns {number} Relação L/D
 */
export function calculateLDRatio(length, diameter) {
  if (diameter <= 0) {
    throw new Error('Diâmetro deve ser maior que 0');
  }
  return length / diameter;
}

/**
 * Calcula deflexão estimada da ferramenta
 * δ = (F × L³) / (3 × E × I)
 * Simplificado: δ ≈ (ap × ae × L³) / (D⁴ × k)
 *
 * @param {number} ap - Profundidade axial mm
 * @param {number} ae - Largura de corte mm
 * @param {number} length - Comprimento de balanço mm
 * @param {number} diameter - Diâmetro mm
 * @returns {number} Deflexão estimada em mm
 */
export function calculateDeflection(ap, ae, length, diameter) {
  const k = 800000; // Constante de rigidez para carbeto
  const deflection = (ap * ae * Math.pow(length, 3)) / (Math.pow(diameter, 4) * k);
  return Math.round(deflection * 1000) / 1000;
}

/**
 * Aplica chip thinning quando ae < 25% do diâmetro
 * Corrige fz para manter espessura de cavaco adequada
 * Fonte: Sandvik Coromant 2023, p.160-162
 *
 * @param {number} fz - Avanço por dente original (mm/dente)
 * @param {number} ae - Largura de corte (mm)
 * @param {number} diameter - Diâmetro (mm)
 * @returns {Object} { correctedFz, chipThinningApplied, correctionFactor, warning, severity }
 */
export function applyChipThinning(fz, ae, diameter) {
  const ratio = ae / diameter;

  // Sem correção se ratio >= 0.25 (25%)
  if (ratio >= 0.25) {
    return {
      correctedFz: fz,
      chipThinningApplied: false,
      correctionFactor: 1.0,
      warning: null,
      severity: 'none'
    };
  }

  // Fatores de correção por faixa (Sandvik 2023 p.160-162)
  let correctionFactor;
  let severity;
  let warning;

  if (ratio >= 0.20) {
    // 20-25%: correção leve
    correctionFactor = 1.15;
    severity = 'leve';
    warning = 'Chip thinning leve aplicado';
  } else if (ratio >= 0.15) {
    // 15-20%: correção moderada
    correctionFactor = 1.30;
    severity = 'moderada';
    warning = 'Chip thinning moderado aplicado';
  } else if (ratio >= 0.10) {
    // 10-15%: correção severa
    correctionFactor = 1.50;
    severity = 'severa';
    warning = 'Chip thinning severo aplicado';
  } else {
    // < 10%: crítico (usa fator máximo)
    correctionFactor = 1.50;
    severity = 'critica';
    warning = 'CRÍTICO: ae muito baixo. Considere aumentar ae ou trocar estratégia';
  }

  const correctedFz = fz * correctionFactor;

  return {
    correctedFz: Math.round(correctedFz * 10000) / 10000,
    chipThinningApplied: true,
    correctionFactor,
    warning,
    severity,
    ratio: Math.round(ratio * 100) / 100
  };
}

/**
 * Valida e obtém status da relação L/D
 * Fonte: ISO 8688-2:1989, Sandvik 2023 p.156
 *
 * @param {number} ldRatio - Relação L/D (altura_fixacao / diametro)
 * @returns {Object} { status, acao, isBlocking }
 */
export function validateLD(ldRatio) {
  if (ldRatio > 6) {
    return {
      status: 'CRITICO',
      acao: 'BLOQUEIO - Risco alto de quebra. Reduza altura ou aumente diâmetro',
      isBlocking: true,
      riskLevel: 'critical'
    };
  }
  if (ldRatio > 4) {
    return {
      status: 'ALERTA',
      acao: 'Reduzir parâmetros 20-30%',
      isBlocking: false,
      riskLevel: 'high'
    };
  }
  if (ldRatio > 3) {
    return {
      status: 'ACEITAVEL',
      acao: 'Monitorar vibração',
      isBlocking: false,
      riskLevel: 'medium'
    };
  }
  return {
    status: 'IDEAL',
    acao: 'Sem restrições',
    isBlocking: false,
    riskLevel: 'low'
  };
}

/**
 * Aplica compensação automática de parâmetros quando L/D está entre 4-6
 * Fonte: Sandvik 2023 p.156, Kennametal 2024 p.102
 *
 * @param {number} ldRatio - Relação L/D
 * @param {Object} params - Parâmetros originais { vc, ae }
 * @returns {Object} Parâmetros compensados { vc, ae, wasCompensated, compensationFactor }
 */
export function compensateForLD(ldRatio, params) {
  if (ldRatio <= 4) {
    return {
      vc: params.vc,
      ae: params.ae,
      wasCompensated: false,
      compensationFactor: 1.0
    };
  }

  if (ldRatio > 6) {
    // L/D crítico - bloqueio, não compensar
    throw new Error(`L/D crítico (${ldRatio.toFixed(1)}). Máximo seguro: 6`);
  }

  // L/D entre 4 e 6: aplicar redução proporcional
  // 15% de redução por unidade acima de 4
  const fatorReducao = 1 - ((ldRatio - 4) * 0.15);

  return {
    vc: Math.round(params.vc * fatorReducao * 10) / 10,
    ae: Math.round(params.ae * fatorReducao * 100) / 100,
    wasCompensated: true,
    compensationFactor: Math.round(fatorReducao * 100) / 100
  };
}

/**
 * Obtém fator L/D baseado na relação balanço/diâmetro (legado)
 *
 * @param {number} ldRatio - Relação L/D
 * @param {Array} ldFactors - Tabela de fatores L/D
 * @returns {Object} Fatores aplicáveis
 */
export function getLDFactor(ldRatio, ldFactors) {
  for (const factor of ldFactors) {
    if (ldRatio >= factor.ldMin && ldRatio < factor.ldMax) {
      return factor;
    }
  }
  // Retorna o mais restritivo se não encontrar
  return ldFactors[ldFactors.length - 1];
}

/**
 * Calcula todos os parâmetros de uma vez
 * Fluxo conforme FLUXO_CALCULO.md:
 * 1. Validar L/D → Se > 6: BLOQUEIA
 * 2. Compensar L/D (se 4-6: reduz Vc e ae)
 * 3. Calcular RPM → Validar limites
 * 4. Detectar Chip Thinning → Corrigir fz se necessário
 * 5. Calcular Avanço (Vf)
 * 6. Calcular MRR e Potência
 *
 * @param {Object} input - Parâmetros de entrada
 * @returns {Object} Resultados completos
 */
export function calculateAll(input) {
  const {
    vc,
    fz,
    diameter,
    fluteCount,
    ap,
    ae,
    length,
    kc,
    ldFactors
  } = input;

  // 1. Calcular e validar L/D
  const ldRatio = calculateLDRatio(length, diameter);
  const ldValidation = validateLD(ldRatio);

  // Se L/D crítico, retornar com bloqueio
  if (ldValidation.isBlocking) {
    return {
      rpm: 0,
      feedRate: 0,
      effectiveVc: 0,
      effectiveFz: 0,
      originalFz: fz,
      mrr: 0,
      power: 0,
      torque: 0,
      ldRatio: Math.round(ldRatio * 100) / 100,
      ldValidation,
      ldFactor: getLDFactor(ldRatio, ldFactors),
      chipThinning: { chipThinningApplied: false, correctionFactor: 1.0 },
      blocked: true,
      blockReason: ldValidation.acao
    };
  }

  // 2. Compensar parâmetros se L/D entre 4-6
  let effectiveVc = vc;
  let effectiveAe = ae;
  let ldCompensation = { wasCompensated: false, compensationFactor: 1.0 };

  if (ldRatio > 4 && ldRatio <= 6) {
    ldCompensation = compensateForLD(ldRatio, { vc, ae });
    effectiveVc = ldCompensation.vc;
    effectiveAe = ldCompensation.ae;
  }

  // 3. Calcular RPM
  const rpm = calculateRPM(effectiveVc, diameter);

  // 4. Aplicar chip thinning se necessário
  const chipThinning = applyChipThinning(fz, effectiveAe, diameter);
  const effectiveFz = chipThinning.correctedFz;

  // 5. Calcular Avanço
  const feedRate = calculateFeedRate(rpm, fluteCount, effectiveFz);

  // 6. Calcular MRR e Potência
  const mrr = calculateMRR(ap, effectiveAe, feedRate);
  const power = calculatePower(effectiveVc, ap, effectiveAe, kc);
  const torque = calculateTorque(power, rpm);

  // Vc efetiva recalculada (para conferência)
  const recalculatedVc = calculateVc(rpm, diameter);

  return {
    rpm,
    feedRate,
    effectiveVc: Math.round(recalculatedVc * 10) / 10,
    effectiveFz,
    originalFz: fz,
    originalVc: vc,
    originalAe: ae,
    compensatedVc: effectiveVc,
    compensatedAe: effectiveAe,
    mrr: Math.round(mrr * 100) / 100,
    power: Math.round(power * 100) / 100,
    torque: Math.round(torque * 100) / 100,
    ldRatio: Math.round(ldRatio * 100) / 100,
    ldValidation,
    ldCompensation,
    ldFactor: getLDFactor(ldRatio, ldFactors),
    chipThinning,
    blocked: false
  };
}

export default {
  calculateRPM,
  calculateVc,
  calculateFeedRate,
  calculateFz,
  calculateMRR,
  calculatePower,
  calculateTorque,
  calculateLDRatio,
  validateLD,
  compensateForLD,
  applyChipThinning,
  getLDFactor,
  calculateAll
};
