import type { BoringResult, DrillingResult, MillingResult, ThreadingResult } from './types.js';

/**
 * Camada de exibição do core: formatação numérica e a lente de margem de segurança.
 *
 * É core porque não toca no DOM — é transformação pura de número. A UI consome daqui em
 * vez de reimplementar a regra, que é como duas telas passam a mostrar números diferentes
 * para a mesma condição.
 */

/** `spec.md` R3: milhar com ponto, decimal com vírgula. */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Aplica a margem de segurança sobre um resultado já calculado.
 *
 * `MVP` §4.9: a lente é o **último passo** e não realimenta a cadeia. Escala o que o
 * operador executa e o esforço que ele dimensiona (`n`, `vf`, `vc` real, `Q`, `Pc`, `Mc`);
 * não escala as grandezas de verificação (`hm`, `hex`, `CTF`, `L/D`, `kc`), e não move
 * alerta nem nível de segurança — eles descrevem o físico real (regras 2 e 5).
 *
 * @param margin percentual do calculado. 100 é o padrão neutro; acima de 100 é permitido
 *   (regra 6 — a lente não é limitador).
 */
export function applySafetyMargin<T extends MillingResult | DrillingResult | ThreadingResult | BoringResult>(result: T, margin: number): T {
  if (!Number.isFinite(margin) || margin < 0) {
    throw new RangeError(`Margem de segurança deve ser um percentual não negativo (recebido: ${margin}).`);
  }
  const factor = margin / 100;
  return {
    ...result,
    n: result.n * factor,
    vf: result.vf * factor,
    vcReal: result.vcReal * factor,
    Q: result.Q * factor,
    Pc: result.Pc * factor,
    Mc: result.Mc * factor,
  };
}

/** A lente só aparece no resultado quando difere do padrão neutro (`MVP` §4.9 regra 8). */
export function isSafetyMarginVisible(margin: number): boolean {
  return margin !== 100;
}
