export type ZoneId = 'verde' | 'amarelo' | 'vermelho' | 'bloqueado';

/**
 * Map zone to score for health aggregation
 * - verde (green): 100 points
 * - amarelo (yellow): 60 points
 * - vermelho (red): 20 points
 * - bloqueado (blocked): 0 points
 */
export function zoneToScore(zone: ZoneId): number {
  switch (zone) {
    case 'verde':
      return 100;
    case 'amarelo':
      return 60;
    case 'vermelho':
      return 20;
    case 'bloqueado':
      return 0;
    default:
      return 0;
  }
}

/**
 * Calculate health score as weighted average of 4 parameters
 * Weights:
 * - ap (deflection): 40% — largest risk of breakage
 * - fz (chip load): 30% — vibration/chatter
 * - ae (radial engagement): 20% — engagement load
 * - Vc (cutting speed): 10% — wear (slowest effect)
 *
 * @param vcZone - Velocity zone
 * @param fzZone - Chip load zone
 * @param aeZone - Radial engagement zone
 * @param apZone - Axial depth zone
 * @returns Health score as percentage [0, 100]
 */
export function calculateHealthScore(
  vcZone: ZoneId,
  fzZone: ZoneId,
  aeZone: ZoneId,
  apZone: ZoneId,
): number {
  // If any parameter is blocked, health is 0
  if (apZone === 'bloqueado' || fzZone === 'bloqueado' || aeZone === 'bloqueado' || vcZone === 'bloqueado') {
    return 0;
  }

  const vcScore = zoneToScore(vcZone);
  const fzScore = zoneToScore(fzZone);
  const aeScore = zoneToScore(aeZone);
  const apScore = zoneToScore(apZone);

  // Weighted average: ap(40%) + fz(30%) + ae(20%) + Vc(10%)
  const healthScore = apScore * 0.4 + fzScore * 0.3 + aeScore * 0.2 + vcScore * 0.1;

  return Math.round(healthScore);
}

// ─── Continuous scoring ──────────────────────────────────────────────────────

/**
 * Anchor curves mapping a value/recomendado ratio to a score.
 * Anchors sit on the same ratio thresholds used by the zone functions below
 * (0.50 / 0.75 / 1.20 / 1.50) and on the cutoffs of getHealthLevel
 * (40 = vermelho/amarelo, 76 = amarelo/verde), so score and zone always agree.
 */
const CURVE_VC_FZ: ReadonlyArray<readonly [number, number]> = [
  [0.25, 0], [0.50, 40], [0.75, 76], [1.00, 100], [1.20, 76], [1.50, 40], [2.00, 0],
];

/** ae/ap have no lower critical zone — cutting less than recommended is conservative, not risky. */
const CURVE_AE_AP: ReadonlyArray<readonly [number, number]> = [
  [0, 40], [0.50, 76], [1.00, 100], [1.20, 76], [1.50, 40], [2.00, 0],
];

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

/**
 * Health score [0, 100] from the actual cutting values.
 * Same weights and thresholds as calculateHealthScore, but interpolated inside each
 * zone so the gauge reacts to every slider move, not only at zone boundaries.
 */
export function calculateHealthScoreFromValues(input: HealthScoreInput): number {
  if (input.ldRatio > 6) return 0;

  const ratio = (value: number, recomendado: number) => (recomendado > 0 ? value / recomendado : 0);

  const vcScore = scoreFromCurve(ratio(input.vc, input.vcRecomendado), CURVE_VC_FZ);
  const fzScore = scoreFromCurve(ratio(input.fz, input.fzRecomendado), CURVE_VC_FZ);
  const aeScore = scoreFromCurve(ratio(input.ae, input.aeRecomendado), CURVE_AE_AP);
  const apScore = scoreFromCurve(ratio(input.ap, input.apRecomendado), CURVE_AE_AP);

  // Weighted average: ap(40%) + fz(30%) + ae(20%) + Vc(10%)
  return Math.round(apScore * 0.4 + fzScore * 0.3 + aeScore * 0.2 + vcScore * 0.1);
}

/**
 * Get health status badge message
 * Shows which parameter is most critical
 *
 * @param vcZone - Velocity zone
 * @param fzZone - Chip load zone
 * @param aeZone - Radial engagement zone
 * @param apZone - Axial depth zone
 * @param ldRatio - L/D ratio for additional context
 * @returns Badge text to display in gauge center
 */
export function getHealthBadge(
  vcZone: ZoneId,
  fzZone: ZoneId,
  aeZone: ZoneId,
  apZone: ZoneId,
  ldRatio?: number,
): string {
  // Blocked states take highest priority
  if (apZone === 'bloqueado') {
    return ldRatio && ldRatio > 6 ? 'BLOQUEADO:\nL/D > 6' : 'BLOQUEADO:\nap crítico';
  }

  if (fzZone === 'bloqueado') {
    return 'BLOQUEADO:\nfz crítico';
  }

  if (aeZone === 'bloqueado' || vcZone === 'bloqueado') {
    return 'BLOQUEADO';
  }

  // Red states (vermelho) show the worst parameter
  const redZones = [
    { zone: apZone, param: 'ap', label: 'Deflexão' },
    { zone: fzZone, param: 'fz', label: 'Vibração' },
    { zone: aeZone, param: 'ae', label: 'Engajamento' },
    { zone: vcZone, param: 'Vc', label: 'Desgaste' },
  ];

  const criticalRed = redZones.find(z => z.zone === 'vermelho');
  if (criticalRed) {
    return `Crítico:\n${criticalRed.label}`;
  }

  // Yellow states show the worst alert
  const yellowZones = redZones.filter(z => z.zone === 'amarelo');
  if (yellowZones.length > 0) {
    const worst = yellowZones[0]; // ap has highest weight
    return `Alerta:\n${worst.label}`;
  }

  // All green — safe to proceed
  return 'Saudável';
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

/**
 * Extract zone from Vc ratio (velocity)
 * Used in store's calcular() to get zone without full ParameterHealthBar component
 */
export function getVcZone(vc: number, vcRecomendado: number): ZoneId {
  if (vcRecomendado <= 0) return 'vermelho';
  const ratio = vc / vcRecomendado;
  if (ratio < 0.50) return 'vermelho';
  if (ratio < 0.75) return 'amarelo';
  if (ratio <= 1.20) return 'verde';
  if (ratio <= 1.50) return 'amarelo';
  return 'vermelho';
}

/**
 * Extract zone from fz ratio (chip load)
 */
export function getFzZone(fzEfetivo: number, fzRecomendado: number): ZoneId {
  if (fzRecomendado <= 0) return 'vermelho';
  const ratio = fzEfetivo / fzRecomendado;
  if (ratio < 0.50) return 'vermelho';
  if (ratio < 0.75) return 'amarelo';
  if (ratio <= 1.20) return 'verde';
  if (ratio <= 1.50) return 'amarelo';
  return 'vermelho';
}

/**
 * Extract zone from ae ratio (radial engagement)
 */
export function getAeZone(ae: number, aeRecomendado: number): ZoneId {
  if (aeRecomendado <= 0) return 'amarelo';
  const ratio = ae / aeRecomendado;
  if (ratio < 0.50) return 'amarelo';
  if (ratio <= 1.20) return 'verde';
  if (ratio <= 1.50) return 'amarelo';
  return 'vermelho';
}

/**
 * Extract zone from ap ratio (axial depth) with L/D safety check
 * L/D > 6 forces bloqueado (blocked)
 */
export function getApZone(ap: number, apRecomendado: number, diametro: number, balanco: number): ZoneId {
  const ldRatio = diametro > 0 ? balanco / diametro : 0;

  // L/D safety check takes priority
  if (ldRatio > 6) return 'bloqueado';

  if (apRecomendado <= 0) return 'amarelo';
  const ratio = ap / apRecomendado;

  if (ratio < 0.50) return 'amarelo';
  if (ratio <= 1.20) return 'verde';
  if (ratio <= 1.50) return 'amarelo';
  return 'vermelho';
}
