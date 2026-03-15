/**
 * Slider Bounds Dinâmicos para o painel Ajuste Fino.
 *
 * Calcula min/max/step/recomendado para cada parâmetro (Vc, fz, ae, ap)
 * com base no material selecionado, ferramenta e tipo de operação.
 *
 * Fonte técnica: docs/AUDITORIA_AJUSTE_FINO_FENIX.md
 *                docs/_archive/plans-completed/PLANO_IMPLEMENTACAO_SLIDER_BOUNDS.md
 *
 * Validação externa: Sandvik Coromant, Kennametal, Mitsubishi, Seco, Walter
 */

import type { Material, Ferramenta, SliderBounds, ParamBounds, ParamRangeOverride } from '@/types';
import { TipoUsinagem } from '@/types';
import { getRecommendedParams } from './recommendations';

/**
 * Calcula os limites dinâmicos dos 4 sliders do Ajuste Fino.
 *
 * @param material - Material selecionado (null = fallback genérico)
 * @param ferramenta - Ferramenta selecionada (diâmetro, balanço)
 * @param tipoOp - Tipo de operação (desbaste, semi, acabamento)
 * @returns SliderBounds com min/max/step/recomendado para cada parâmetro
 */
export function calcularSliderBounds(
  material: Material | null,
  ferramenta: Ferramenta,
  tipoOp: TipoUsinagem,
  ldCritico?: number,
): SliderBounds {
  const D = ferramenta.diametro;
  const balanco = ferramenta.balanco;

  // Obter valores recomendados do engine existente
  const recommended = material
    ? getRecommendedParams(material, tipoOp, D, balanco)
    : null;

  return {
    vc: applyOverride(calcularVcBounds(material, tipoOp, recommended?.vc ?? 150), ferramenta.paramRanges?.vc),
    ae: applyOverride(calcularAeBounds(D, recommended?.ae ?? D * 0.3), ferramenta.paramRanges?.ae),
    ap: applyOverride(calcularApBounds(D, tipoOp, balanco, ldCritico ?? 6, recommended?.ap ?? 1), ferramenta.paramRanges?.ap),
    fz: applyOverride(calcularFzBounds(recommended?.fz ?? 0.05), ferramenta.paramRanges?.fz),
  };
}

// ── Funções internas por parâmetro ──

/**
 * Vc: usa material.vcRanges[tipoOp] com janela ±30%.
 * Fallback sem material: 30–350 m/min (cobre aços + inox).
 */
function calcularVcBounds(
  material: Material | null,
  tipoOp: TipoUsinagem,
  vcRecomendado: number,
): ParamBounds {
  if (material) {
    const [, vcMax] = material.vcRanges[tipoOp];
    return {
      min: 0,
      max: Math.round(vcMax * 1.3),
      step: 1,
      recomendado: vcRecomendado,
    };
  }
  // Fallback genérico
  return { min: 0, max: 350, step: 1, recomendado: vcRecomendado };
}

/**
 * ae: max = diâmetro da ferramenta (limite físico — ae > D impossível).
 * Step dinâmico por faixa de diâmetro para usabilidade.
 */
function calcularAeBounds(D: number, aeRecomendado: number): ParamBounds {
  const step = D <= 1 ? 0.01 : D <= 10 ? 0.1 : 0.5;
  return {
    min: 0.01,
    max: D, // LIMITE FÍSICO: ae nunca excede diâmetro
    step,
    recomendado: Math.min(aeRecomendado, D),
  };
}

/**
 * ap: regras por tipo de operação.
 * - Desbaste: D≤6 → 1.0×D; D>6 → 0.8×D
 * - Semi-acabamento: 0.5×D
 * - Acabamento: 0.5mm fixo (validação externa — prática brasileira de moldes)
 * - Cap L/D: se balanço/diâmetro > 6, limita a 0.1mm (zona bloqueada)
 */
function calcularApBounds(
  D: number,
  tipoOp: TipoUsinagem,
  balanco: number,
  ldCritico: number,
  apRecomendado: number,
): ParamBounds {
  let max: number;

  if (tipoOp === TipoUsinagem.ACABAMENTO) {
    // CORREÇÃO VALIDADA: acabamento = 0.5mm fixo (não proporcional a D)
    // Fonte: Validação Grok contra Kennametal/Sandvik + prática brasileira
    max = 0.5;
  } else if (tipoOp === TipoUsinagem.SEMI_ACABAMENTO) {
    max = D * 0.5;
  } else {
    // Desbaste
    max = D <= 6 ? D * 1.0 : D * 0.8;
  }

  // Cap de segurança L/D
  const ldRatio = balanco / D;
  if (ldRatio > ldCritico) {
    max = 0.1;
  }

  max = Math.max(0.1, Math.round(max * 100) / 100);

  return {
    min: 0.05,
    max,
    step: 0.05,
    recomendado: Math.min(apRecomendado, max),
  };
}

/**
 * fz: ±60% ao redor do fz recomendado.
 * Floor absoluto: 0.002 mm/dente (micro-ferramentas Ø0.2mm usam fz 0.002).
 * Step dinâmico para precisão adequada.
 */
function calcularFzBounds(fzRecomendado: number): ParamBounds {
  const fzMin = Math.max(0.002, fzRecomendado * 0.4);
  const fzMax = fzRecomendado * 2.0;
  const step = fzRecomendado <= 0.05 ? 0.001 : fzRecomendado <= 0.2 ? 0.005 : 0.01;

  return {
    min: Math.round(fzMin * 10000) / 10000,
    max: Math.round(fzMax * 10000) / 10000,
    step,
    recomendado: fzRecomendado,
  };
}

/**
 * Aplica override manual de range (de ferramenta.paramRanges).
 * Campos undefined mantêm o valor calculado automaticamente.
 */
function applyOverride(bounds: ParamBounds, override?: ParamRangeOverride): ParamBounds {
  if (!override) return bounds;
  return {
    ...bounds,
    min: override.min ?? bounds.min,
    max: override.max ?? bounds.max,
    recomendado: override.desejado ?? bounds.recomendado,
  };
}
