import { analyzeDrilling, analyzeMilling, analyzeThreading, analyzeBoring, worstLevel } from './analyzer.js';
import type { DrillingInput, DrillingResult, MillingInput, MillingResult, ThreadingInput, ThreadingResult, BoringInput, BoringResult } from './types.js';

/**
 * Motor de cálculo — funções puras, síncronas, sem DOM e sem rede.
 *
 * Nada aqui lança exceção por entrada fisicamente impossível: o resultado sai e a
 * condição vira alerta (`E0` §3.3, `spec.md` R1). O que o motor recusa é entrada sem
 * significado numérico — diâmetro zero ou negativo, por exemplo, que produziria divisão
 * por zero e um resultado que não descreve nada.
 */

/** Piso numérico da espessura de cavaco levada a Kienzle, para `kc` não divergir em h → 0. */
const H_FLOOR_MM = 0.001;

/** `ESCOPO_BROCA_ACO_RAPIDO` §2 — a aritmética de oficina do modo aço rápido. */
export const HSS_MODE = {
  /** `318 = 1000/π` escrito na forma de oficina; o caso verificador do §2 depende do literal. */
  rpmConstant: 318,
  /** Percentual do avanço sobre a rotação. Editável em Configurações (§5). */
  feedPercent: 10,
  /** Passo do pica-pau: `D / divisor`, saturado em `capMm`. */
  peckDivisor: 25,
  peckCapMm: 0.8,
} as const;

function requirePositive(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} deve ser um número maior que zero (recebido: ${value}).`);
  }
}

/**
 * Diâmetro efetivo de corte.
 *
 * Só a fresa esférica corrige (`CANONICO_MOTOR_DE_CALCULO` §1.2). A toroidal **não**
 * extrapola a fórmula da esférica: a lacuna L1 está declarada e, em `ap < r`, o gatilho 10
 * avisa que o número pode estar errado — corrigir por conta própria seria inventar fonte.
 */
export function effectiveDiameter(input: Pick<MillingInput, 'D' | 'ap' | 'geometry'>): number {
  const { D, ap, geometry } = input;
  if (geometry === 'esferica' && ap > 0 && ap < D) {
    return 2 * Math.sqrt(ap * (D - ap));
  }
  return D;
}

/**
 * Cadeia de fresamento — `CANONICO_MOTOR_DE_CALCULO` §1.4, passo a passo e na mesma ordem.
 *
 * O `fz` de entrada é o avanço **programado** (de catálogo): o `ctf` é calculado para
 * exibição e nunca aplicado sobre ele (§1.2, trava obrigatória).
 */
export function calculateMilling(input: MillingInput): MillingResult {
  const { material, D, Z, L, ap, ae, vc, fz } = input;
  requirePositive(D, 'Diâmetro da fresa (D)');
  requirePositive(Z, 'Número de arestas (Z)');

  const De = effectiveDiameter(input);
  const kappaRad = ((input.kappa ?? 90) * Math.PI) / 180;

  // 1. rotação — ou a que o operador fixou, com `vc` passando a ser consequência (§8.1).
  const n = input.nOverride ?? (vc * 1000) / (Math.PI * De);
  const vcReal = (Math.PI * De * n) / 1000;

  // 2. arco engajado. `eps` satura em 1 (rasgo cheio): acima disso o arco não cresce,
  //    e o excesso de `ae` vira alerta, não geometria nova.
  const eps = Math.min(1, ae / D);
  const phiMax = Math.acos(1 - 2 * eps);

  // 3. espessura média — a que entra em Kienzle. Não travar `phiMax` em π/2 (§1.4).
  const hm = fz * Math.sin(kappaRad) * (2 * eps) / phiMax;
  const hex = eps <= 0.5 ? fz * Math.sqrt(1 - (1 - 2 * eps) ** 2) : fz;
  const ctf = eps <= 0.5 ? 1 / Math.sqrt(1 - (1 - 2 * eps) ** 2) : 1;

  // 4. Kienzle.
  const kc = material.kc1_1 * Math.max(hm, H_FLOOR_MM) ** -material.mc;

  // 5 a 9.
  const vf = fz * Z * n;
  const Q = (ap * ae * vf) / 1000;
  const Pc = (Q * kc) / 60000;
  const Mc = (Pc * 9549) / n;

  const LD = L / D;
  const alerts = analyzeMilling(input, { LD, vcReal });

  return { n, vf, vcReal, De, LD, eps, phiMax, hm, hex, ctf, kc, Q, Pc, Mc, alerts, safetyLevel: worstLevel(alerts) };
}

/**
 * Cadeia de furação — `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO` §1.
 *
 * Em `HSS-Co` os três números que vão para a máquina saem da aritmética de oficina do
 * Mestre (`ESCOPO_BROCA_ACO_RAPIDO` §2), que trunca em vez de arredondar — o caso
 * verificador Ø10 / `vc` 16 → S 508 · F 50 · Q 0,4 é normativo. Potência, torque e
 * remoção continuam vindo da cadeia física; são cartão de conferência, não número de
 * máquina, e `kc` não os alcança (`ESTADO.md`, achado que manda na construção).
 */
export function calculateDrilling(input: DrillingInput): DrillingResult {
  const { material, D, L, vc, substrate } = input;
  requirePositive(D, 'Diâmetro da broca (D)');

  const isHss = substrate === 'HSS-Co';
  const pointAngle = input.pointAngle ?? (isHss ? 118 : 140);

  let n: number;
  let fn: number;
  let vf: number;
  let peckStep: number | null;

  if (isHss) {
    // `vf` sai do `n` já truncado, e trunca de novo: é assim que 508,8 vira 508 e 50,8 vira 50.
    n = input.nOverride ?? Math.trunc((HSS_MODE.rpmConstant * vc) / D);
    fn = HSS_MODE.feedPercent / 100;
    vf = Math.trunc(n * fn);
    peckStep = Math.min(D / HSS_MODE.peckDivisor, HSS_MODE.peckCapMm);
  } else {
    n = input.nOverride ?? (vc * 1000) / (Math.PI * D);
    fn = input.fn ?? 0;
    vf = n * fn;
    peckStep = null;
  }

  const vcReal = (Math.PI * D * n) / 1000;

  // Espessura por aresta: a broca tem duas, e o ângulo de posição é metade do de ponta.
  const h = (fn / 2) * Math.sin(((pointAngle / 2) * Math.PI) / 180);
  const kc = material.kc1_1 * Math.max(h, H_FLOOR_MM) ** -material.mc;

  const Q = (Math.PI * D ** 2 * vf) / 4000;
  const Pc = (kc * fn * D * vcReal) / 240000;
  const Mc = (kc * fn * D ** 2) / 8000;

  const LD = L / D;
  const alerts = analyzeDrilling(input, { vcReal });

  return { n, vf, vcReal, fn, peckStep, LD, h, kc, Q, Pc, Mc, alerts, safetyLevel: worstLevel(alerts) };
}

/**
 * Cadeia de roscamento — `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO` §1.8 a §1.10.
 *
 * Cinemática estritamente sincronizada: o avanço da mesa é consequência matemática
 * do passo da rosca (`vf = n · P`), nunca editável de forma independente.
 */
export function calculateThreading(input: ThreadingInput): ThreadingResult {
  const { material, D, pitch, vc, L } = input;
  requirePositive(D, 'Diâmetro nominal da rosca (D)');
  requirePositive(pitch, 'Passo da rosca (pitch)');

  const n = input.nOverride ?? (vc * 1000) / (Math.PI * D);
  const vf = n * pitch;
  const vcReal = (Math.PI * D * n) / 1000;
  const LD = L / D;

  const h = Math.max(0.001, pitch);
  const kc = material.kc1_1 * Math.max(h, H_FLOOR_MM) ** -material.mc;

  const Q = (Math.PI * D ** 2 * vf) / 4000;
  const Pc = (kc * pitch * D * vcReal) / 240000;
  const Mc = n > 0 ? (Pc * 9549) / n : 0;

  const alerts = analyzeThreading(input, { n, LD, vcReal });

  return {
    n,
    vf,
    vcReal,
    pitch,
    LD,
    h,
    kc,
    Q,
    Pc,
    Mc,
    alerts,
    safetyLevel: worstLevel(alerts),
  };
}

/**
 * Cadeia de mandrilamento — `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO` §1.11 a §1.13.
 *
 * Mandrilamento é torneamento interno:
 * - A profundidade de corte é derivada no raio: `ap = (dFinal - dInitial) / 2`
 * - Diâmetro de corte `Dc = dFinal` alimenta a velocidade
 * - Taxa de remoção exata do anel: `Q = π · (dFinal² - dInitial²) · fn · n / 4000`
 * - Potência na aresta com a correção do mandrilamento: `(1 - ap / Dc)`
 */
export function calculateBoring(input: BoringInput): BoringResult {
  const { material, dInitial, dFinal, L, vc } = input;
  requirePositive(dFinal, 'Diâmetro final da mandrilagem (dFinal)');
  if (dFinal <= dInitial) {
    throw new RangeError(`Diâmetro final (${dFinal} mm) deve ser maior que o diâmetro inicial (${dInitial} mm).`);
  }

  const ap = (dFinal - dInitial) / 2;
  const Dc = dFinal;
  const fn = input.fn ?? 0.08; // Padrão canônico 0,08 mm/rot (§2.3)

  const n = input.nOverride ?? (vc * 1000) / (Math.PI * Dc);
  const vf = n * fn;
  const vcReal = (Math.PI * Dc * n) / 1000;
  const LD = L / Dc;

  const h = Math.max(0.001, fn);
  const kc = material.kc1_1 * Math.max(h, H_FLOOR_MM) ** -material.mc;

  // Anel exato (§1.12)
  const Q = (Math.PI * (dFinal ** 2 - dInitial ** 2) * fn * n) / 4000;
  // Potência corrigida por (1 - ap/Dc) (§1.11, §1.13)
  const Pc = (Q * kc * (1 - ap / Dc)) / 60000;
  const Mc = n > 0 ? (Pc * 9549) / n : 0;

  const alerts = analyzeBoring(input, { LD, vcReal });

  return {
    n,
    vf,
    vcReal,
    ap,
    Dc,
    fn,
    LD,
    h,
    kc,
    Q,
    Pc,
    Mc,
    alerts,
    safetyLevel: worstLevel(alerts),
  };
}
