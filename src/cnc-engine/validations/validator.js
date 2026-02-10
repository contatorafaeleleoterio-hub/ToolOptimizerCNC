/**
 * VALIDAÇÃO 4 CAMADAS - ToolOptimizer CNC
 * Sistema de validação conforme ARCH.md
 */

import { MACHINE_LIMITS, VALIDATION_RANGES, LD_FACTORS } from '../../shared/types.js';

/**
 * Resultado de validação
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid
 * @property {'ok' | 'warning' | 'danger'} status
 * @property {Array<{layer: number, message: string, type: 'error'|'warning'|'info'}>} issues
 */

/**
 * Camada 1 - Validação Básica (invisível, sempre ativa)
 * - Campo vazio, tipo inválido, divisão zero, negativo inválido
 * - NÃO bloqueia, apenas sinaliza
 */
function validateLayer1Basic(params) {
  const issues = [];

  // Diâmetro
  if (!params.diameter || params.diameter <= 0) {
    issues.push({
      layer: 1,
      field: 'diameter',
      message: 'Diâmetro deve ser maior que 0',
      type: 'error'
    });
  }

  // Vc
  if (params.vc !== undefined && params.vc <= 0) {
    issues.push({
      layer: 1,
      field: 'vc',
      message: 'Velocidade de corte deve ser maior que 0',
      type: 'error'
    });
  }

  // fz
  if (params.fz !== undefined && params.fz <= 0) {
    issues.push({
      layer: 1,
      field: 'fz',
      message: 'Avanço por dente deve ser maior que 0',
      type: 'error'
    });
  }

  // Número de arestas
  if (!params.fluteCount || params.fluteCount <= 0) {
    issues.push({
      layer: 1,
      field: 'fluteCount',
      message: 'Número de arestas deve ser maior que 0',
      type: 'error'
    });
  }

  // ap e ae
  if (params.ap !== undefined && params.ap <= 0) {
    issues.push({
      layer: 1,
      field: 'ap',
      message: 'Profundidade axial deve ser maior que 0',
      type: 'error'
    });
  }

  if (params.ae !== undefined && params.ae <= 0) {
    issues.push({
      layer: 1,
      field: 'ae',
      message: 'Largura de corte deve ser maior que 0',
      type: 'error'
    });
  }

  return issues;
}

/**
 * Camada 2 - Limites (corrige automaticamente)
 * - ae > D → corrige para D
 * - ap > LOC → limita a LOC
 * - NÃO bloqueia, corrige e avisa
 */
function validateLayer2Limits(params) {
  const issues = [];
  const corrections = {};

  // ae não pode exceder diâmetro
  if (params.ae > params.diameter) {
    corrections.ae = params.diameter;
    issues.push({
      layer: 2,
      field: 'ae',
      message: `Largura de corte ajustada para ${params.diameter}mm (máximo = diâmetro)`,
      type: 'info',
      correction: corrections.ae
    });
  }

  // ap não pode exceder 100% do diâmetro (limite prático)
  const maxAp = params.diameter;
  if (params.ap > maxAp) {
    corrections.ap = maxAp;
    issues.push({
      layer: 2,
      field: 'ap',
      message: `Profundidade axial ajustada para ${maxAp}mm`,
      type: 'info',
      correction: corrections.ap
    });
  }

  // fz mínimo
  if (params.fz < VALIDATION_RANGES.fz.min) {
    issues.push({
      layer: 2,
      field: 'fz',
      message: `Avanço por dente muito baixo (mín: ${VALIDATION_RANGES.fz.min} mm/dente)`,
      type: 'warning'
    });
  }

  // Altura de fixação
  if (params.fixingHeight > VALIDATION_RANGES.fixingHeight.max) {
    corrections.fixingHeight = VALIDATION_RANGES.fixingHeight.max;
    issues.push({
      layer: 2,
      field: 'fixingHeight',
      message: `Altura de fixação ajustada para ${VALIDATION_RANGES.fixingHeight.max}mm`,
      type: 'info',
      correction: corrections.fixingHeight
    });
  }

  return { issues, corrections };
}

/**
 * Camada 3 - Normas (info, referência industrial)
 * - Vc fora da faixa recomendada
 * - Baseado em Sandvik, Seco, Dormer
 * - NÃO bloqueia
 */
function validateLayer3Standards(params, material) {
  const issues = [];

  // Vc fora da faixa
  if (material) {
    if (params.vc < material.vcMin) {
      issues.push({
        layer: 3,
        field: 'vc',
        message: `Vc abaixo do mínimo recomendado (${material.vcMin} m/min)`,
        type: 'warning'
      });
    } else if (params.vc > material.vcMax) {
      issues.push({
        layer: 3,
        field: 'vc',
        message: `Vc acima do máximo recomendado (${material.vcMax} m/min)`,
        type: 'warning'
      });
    }
  }

  // fz fora da zona ideal
  if (params.fz < VALIDATION_RANGES.fz.idealMin || params.fz > VALIDATION_RANGES.fz.idealMax) {
    issues.push({
      layer: 3,
      field: 'fz',
      message: `fz fora da zona ideal (${VALIDATION_RANGES.fz.idealMin}-${VALIDATION_RANGES.fz.idealMax} mm/dente)`,
      type: 'info'
    });
  }

  // ae fora da zona ideal
  const aePercent = (params.ae / params.diameter) * 100;
  if (aePercent < VALIDATION_RANGES.ae.idealMinPercent || aePercent > VALIDATION_RANGES.ae.idealMaxPercent) {
    issues.push({
      layer: 3,
      field: 'ae',
      message: `ae fora da zona ideal (${VALIDATION_RANGES.ae.idealMinPercent}-${VALIDATION_RANGES.ae.idealMaxPercent}% do diâmetro)`,
      type: 'info'
    });
  }

  return issues;
}

/**
 * Camada 4 - Segurança (risco real)
 * - L/D > 6
 * - fz <= 0
 * - RPM > limite máquina
 * - Potência > 85%
 * - BLOQUEIA operação
 */
function validateLayer4Safety(params, calculatedResults) {
  const issues = [];

  // L/D crítico
  if (calculatedResults.ldRatio > MACHINE_LIMITS.criticalLDRatio) {
    issues.push({
      layer: 4,
      field: 'ldRatio',
      message: `L/D = ${calculatedResults.ldRatio} excede limite crítico (${MACHINE_LIMITS.criticalLDRatio}). Risco alto de vibração.`,
      type: 'error',
      blocking: true
    });
  }

  // RPM excede limite da máquina
  if (calculatedResults.rpm > MACHINE_LIMITS.maxRPM) {
    issues.push({
      layer: 4,
      field: 'rpm',
      message: `RPM = ${calculatedResults.rpm} excede limite da máquina (${MACHINE_LIMITS.maxRPM})`,
      type: 'error',
      blocking: true
    });
  }

  // Potência crítica
  const powerPercent = (calculatedResults.power / MACHINE_LIMITS.maxPower);
  if (powerPercent > MACHINE_LIMITS.powerWarningThreshold) {
    issues.push({
      layer: 4,
      field: 'power',
      message: `Potência a ${Math.round(powerPercent * 100)}% da capacidade. Risco de sobrecarga.`,
      type: powerPercent > 1 ? 'error' : 'warning',
      blocking: powerPercent > 1
    });
  }

  // Feed excede limite
  if (calculatedResults.feedRate > MACHINE_LIMITS.maxFeed) {
    issues.push({
      layer: 4,
      field: 'feedRate',
      message: `Avanço = ${calculatedResults.feedRate} mm/min excede limite (${MACHINE_LIMITS.maxFeed})`,
      type: 'error',
      blocking: true
    });
  }

  // Deflexão crítica
  if (calculatedResults.deflection > MACHINE_LIMITS.criticalDeflection) {
    issues.push({
      layer: 4,
      field: 'deflection',
      message: `Deflexão = ${calculatedResults.deflection}mm excede limite (${MACHINE_LIMITS.criticalDeflection}mm)`,
      type: 'warning',
      blocking: false
    });
  }

  return issues;
}

/**
 * Executa validação completa em 4 camadas
 *
 * @param {Object} params - Parâmetros de entrada
 * @param {Object} calculatedResults - Resultados calculados
 * @param {Object} material - Material selecionado
 * @returns {ValidationResult}
 */
export function validateAll(params, calculatedResults, material) {
  const allIssues = [];
  let corrections = {};

  // Camada 1 - Básica
  const layer1Issues = validateLayer1Basic(params);
  allIssues.push(...layer1Issues);

  // Se houver erros na camada 1, retorna imediatamente
  if (layer1Issues.some(i => i.type === 'error')) {
    return {
      isValid: false,
      status: 'danger',
      issues: allIssues,
      corrections: {}
    };
  }

  // Camada 2 - Limites
  const layer2Result = validateLayer2Limits(params);
  allIssues.push(...layer2Result.issues);
  corrections = { ...corrections, ...layer2Result.corrections };

  // Camada 3 - Normas
  const layer3Issues = validateLayer3Standards(params, material);
  allIssues.push(...layer3Issues);

  // Camada 4 - Segurança (apenas se temos resultados calculados)
  if (calculatedResults) {
    const layer4Issues = validateLayer4Safety(params, calculatedResults);
    allIssues.push(...layer4Issues);
  }

  // Determinar status final
  const hasBlockingError = allIssues.some(i => i.blocking);
  const hasError = allIssues.some(i => i.type === 'error');
  const hasWarning = allIssues.some(i => i.type === 'warning');

  let status = 'ok';
  if (hasBlockingError || hasError) {
    status = 'danger';
  } else if (hasWarning) {
    status = 'warning';
  }

  return {
    isValid: !hasBlockingError,
    status,
    issues: allIssues,
    corrections
  };
}

/**
 * Valida apenas parâmetros de entrada (antes do cálculo)
 */
export function validateInput(params, material) {
  const layer1Issues = validateLayer1Basic(params);

  if (layer1Issues.length > 0) {
    return {
      isValid: false,
      status: 'danger',
      issues: layer1Issues
    };
  }

  const layer2Result = validateLayer2Limits(params);
  const layer3Issues = validateLayer3Standards(params, material);

  const allIssues = [...layer2Result.issues, ...layer3Issues];
  const hasWarning = allIssues.some(i => i.type === 'warning');

  return {
    isValid: true,
    status: hasWarning ? 'warning' : 'ok',
    issues: allIssues,
    corrections: layer2Result.corrections
  };
}

/**
 * Obtém status de um campo específico
 */
export function getFieldStatus(fieldName, validation) {
  const fieldIssues = validation.issues.filter(i => i.field === fieldName);

  if (fieldIssues.some(i => i.type === 'error')) return 'danger';
  if (fieldIssues.some(i => i.type === 'warning')) return 'warning';
  if (fieldIssues.length > 0) return 'info';
  return 'ok';
}

export default {
  validateAll,
  validateInput,
  getFieldStatus
};
