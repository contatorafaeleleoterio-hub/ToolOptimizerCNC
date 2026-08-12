/**
 * Tool health score: how far the current cutting condition sits from the
 * recommended one, as a single 0-100 number plus the reason behind it.
 */

/**
 * Anchor curves mapping a value/recomendado ratio to a score.
 * Anchors sit on the cutting zone thresholds used across the app
 * (0.50 / 0.75 / 1.20 / 1.50 — see parameter-health-bar) and on the cutoffs of
 * getHealthLevel (40 = vermelho/amarelo, 76 = amarelo/verde), so score, colors
 * and zone labels always agree.
 */
const CURVE_VC_FZ: ReadonlyArray<readonly [number, number]> = [
  [0.25, 0], [0.50, 40], [0.75, 76], [1.00, 100], [1.20, 76], [1.50, 40], [2.00, 0],
];

/** ae/ap have no lower critical zone — cutting less than recommended is conservative, not risky. */
const CURVE_AE_AP: ReadonlyArray<readonly [number, number]> = [
  [0, 40], [0.50, 76], [1.00, 100], [1.20, 76], [1.50, 40], [2.00, 0],
];

/** Weights: ap dominates (deflection breaks tools), Vc matters least (wear is slow). */
const WEIGHTS = { ap: 0.4, fz: 0.3, ae: 0.2, vc: 0.1 } as const;

/** What each parameter tells the operator when it is the one dragging health down. */
const FAILURE_LABELS = { ap: 'Deflexão', fz: 'Vibração', ae: 'Engajamento', vc: 'Desgaste' } as const;

/** Checked worst-first so ties fall on the heaviest parameter. */
const PARAMS = ['ap', 'fz', 'ae', 'vc'] as const;

type ParamId = (typeof PARAMS)[number];

/** Linear interpolation over an ascending (ratio, score) curve. Clamps at both ends. */
function scoreFromCurve(ratio: number, curve: ReadonlyArray<readonly [number, number]>): number {
  if (ratio <= curve[0][0]) return curve[0][1];
  for (let i = 0; i < curve.length - 1; i++) {
    const [r0, s0] = curve[i];
    const [r1, s1] = curve[i + 1];
    if (ratio <= r1) return s0 + ((ratio - r0) / (r1 - r0)) * (s1 - s0);
  }
  return curve[curve.length - 1][1];
}

export interface HealthScoreInput {
  /** Real cutting speed at the current RPM (m/min) */
  vc: number;
  vcRecomendado: number;
  /** Real chip thickness per tooth at the current feed (mm) — nominal fz, chip thinning undone */
  fz: number;
  fzRecomendado: number;
  ae: number;
  aeRecomendado: number;
  ap: number;
  apRecomendado: number;
  /** balanco / diametro — L/D > 6 is blocked in the MVP */
  ldRatio: number;
}

export interface HealthResult {
  /** Weighted health [0, 100] */
  score: number;
  /** Why the score is what it is, e.g. "Alerta:\nVibração". Two lines. */
  badge: string;
}

/**
 * Score the current cutting condition and name the parameter responsible for it.
 * Interpolates inside each zone, so the result moves with every slider change
 * instead of jumping only at zone boundaries.
 */
export function evaluateHealth(input: HealthScoreInput): HealthResult {
  if (input.ldRatio > 6) return { score: 0, badge: 'BLOQUEADO:\nL/D > 6' };

  const ratio = (value: number, recomendado: number) => (recomendado > 0 ? value / recomendado : 0);

  const scores: Record<ParamId, number> = {
    ap: scoreFromCurve(ratio(input.ap, input.apRecomendado), CURVE_AE_AP),
    fz: scoreFromCurve(ratio(input.fz, input.fzRecomendado), CURVE_VC_FZ),
    ae: scoreFromCurve(ratio(input.ae, input.aeRecomendado), CURVE_AE_AP),
    vc: scoreFromCurve(ratio(input.vc, input.vcRecomendado), CURVE_VC_FZ),
  };

  const score = Math.round(PARAMS.reduce((sum, p) => sum + scores[p] * WEIGHTS[p], 0));

  const worst = PARAMS.reduce((a, b) => (scores[b] < scores[a] ? b : a));
  const level = getHealthLevel(scores[worst]);

  if (level === 'verde') return { score, badge: 'Saudável' };
  const prefix = level === 'amarelo' ? 'Alerta' : 'Crítico';
  return { score, badge: `${prefix}:\n${FAILURE_LABELS[worst]}` };
}

/**
 * Determine health status level from score
 */
export function getHealthLevel(score: number): 'verde' | 'amarelo' | 'vermelho' | 'bloqueado' {
  if (score === 0) return 'bloqueado';
  if (score < 40) return 'vermelho';
  if (score <= 75) return 'amarelo';
  return 'verde';
}
