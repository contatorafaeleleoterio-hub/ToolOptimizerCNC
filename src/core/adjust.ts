/**
 * Edição de resultado — `MVP_CALCULADORA_PARAMETROS` §8.
 *
 * Só rotação e avanço são editáveis; o resto é leitura (§8.3). Este módulo não recalcula
 * nada por conta própria: ele deduz o parâmetro de entrada equivalente e devolve para a
 * cadeia normal (`calculateMilling` / `calculateDrilling` com `nOverride`, ou `fz`/`fn`
 * substituído). Uma segunda cadeia paralela é exatamente o que o §8.1 proíbe.
 */

/** Passo dos botões `−`/`+`. `GABARITO_PROTOTIPO` D7, emenda do Mestre de 07/09/2026. */
export const ADJUST_STEP_PERCENT = 5;

/** Aplica `steps` toques do `±` sobre um valor. `steps` negativo é o `−`. */
export function steppedValue(value: number, steps: number): number {
  return value * (1 + (steps * ADJUST_STEP_PERCENT) / 100);
}

/**
 * Avanço editado em fresamento → avanço por dente equivalente (§8.1).
 * A rotação fica onde está; quem se move é o `fz`.
 */
export function deduceFz(vf: number, Z: number, n: number): number {
  if (Z <= 0 || n <= 0) {
    throw new RangeError('Avanço por dente exige número de arestas e rotação maiores que zero.');
  }
  return vf / (Z * n);
}

/** Avanço editado em furação ou mandrilamento → avanço por rotação equivalente (§8.1). */
export function deduceFn(vf: number, n: number): number {
  if (n <= 0) {
    throw new RangeError('Avanço por rotação exige rotação maior que zero.');
  }
  return vf / n;
}
