import { formatNumber } from './display.js';
import type { Alert, DrillingInput, MillingInput, SafetyLevel, ThreadingInput, BoringInput } from './types.js';

/**
 * Analisador de segurança física — os gatilhos do `MVP_CALCULADORA_PARAMETROS` §9.2.
 *
 * Nenhum gatilho bloqueia: todos entregam o resultado e avisam (`MVP` §9.1). A mensagem
 * traz a grandeza medida, a referência e a distância entre as duas, e **não instrui** —
 * verbo de comando saiu do produto em 27/08/2026.
 *
 * Camada `IMPOSSÍVEL` do §9.1 mapeia para o nível CRÍTICO do `spec.md` R2; camada
 * `ALERTA` mapeia para ATENÇÃO.
 */

/** `MVP` §9.3 — limiar de balanço por tipo de haste, em múltiplos de D. */
const SHANK_LD_THRESHOLD = { comum: 4, amortecido: 8 } as const;

/** `MVP` §9.2 gatilho 4 — janela em torno da velocidade de partida. */
const VC_WINDOW = { low: 0.6, high: 1.4 } as const;

/** `MVP` §9.2 gatilho 2 — fração de D a partir da qual o corte é rasgo cheio. */
const FULL_SLOT_RATIO = 0.95;

/** `MVP` §9.2 gatilhos 6 e 7 — profundidade do furo em múltiplos de D. */
const DRILL_DEPTH_THRESHOLD = { semCanal: 3, comCanal: 30 } as const;

/** `spec.md` R4: CRÍTICO > ATENÇÃO > NORMAL. */
export function worstLevel(alerts: readonly Alert[]): SafetyLevel {
  if (alerts.some((a) => a.level === 'CRÍTICO')) return 'CRÍTICO';
  if (alerts.length > 0) return 'ATENÇÃO';
  return 'NORMAL';
}

function vcOutOfWindow(vc: number, vcStart: number, trigger: string): Alert | null {
  if (vcStart <= 0) return null;
  if (vc < VC_WINDOW.low * vcStart) {
    return {
      trigger,
      level: 'ATENÇÃO',
      message:
        `Velocidade de corte (vc) ${formatNumber(vc, 0)} m/min, abaixo de ${formatNumber(VC_WINDOW.low * vcStart, 0)} m/min ` +
        `(${formatNumber(VC_WINDOW.low, 1)} × os ${formatNumber(vcStart, 0)} m/min de partida): nessa faixa o cavaco adere ao gume e o acabamento piora.`,
    };
  }
  if (vc > VC_WINDOW.high * vcStart) {
    return {
      trigger,
      level: 'ATENÇÃO',
      message:
        `Velocidade de corte (vc) ${formatNumber(vc, 0)} m/min, acima de ${formatNumber(VC_WINDOW.high * vcStart, 0)} m/min ` +
        `(${formatNumber(VC_WINDOW.high, 1)} × os ${formatNumber(vcStart, 0)} m/min de partida): o desgaste passa a ser térmico e a vida da ferramenta cai rápido.`,
    };
  }
  return null;
}

export function analyzeMilling(input: MillingInput, derived: { LD: number; vcReal: number }): Alert[] {
  const { D, ae, ap, material } = input;
  const alerts: Alert[] = [];

  // Gatilho 3 — IMPOSSÍVEL. A fresa corta no máximo a própria largura.
  if (ae > D) {
    alerts.push({
      trigger: '3',
      level: 'CRÍTICO',
      message:
        `Penetração de trabalho (ae) ${formatNumber(ae, 1)} mm contra o máximo que o diâmetro entrega, ` +
        `${formatNumber(D, 1)} mm (+${formatNumber(ae - D, 1)} mm): o resultado descreve remoção fora da aresta física.`,
    });
  } else if (ae >= FULL_SLOT_RATIO * D) {
    // Gatilho 2 — rasgo cheio. Exclusivo do 3: acima de D a condição já é outra.
    alerts.push({
      trigger: '2',
      level: 'ATENÇÃO',
      message:
        `Penetração de trabalho (ae) ${formatNumber(ae, 1)} mm contra o diâmetro ${formatNumber(D, 1)} mm ` +
        `(${formatNumber((ae / D) * 100, 0)}% de D): é rasgo cheio — corte concordante e discordante ao mesmo tempo, sem saída para o calor.`,
    });
  }

  // Gatilho 5 — balanço. Só fresar e mandrilar.
  const ldThreshold = SHANK_LD_THRESHOLD[input.shank ?? 'comum'];
  if (derived.LD > ldThreshold) {
    alerts.push({
      trigger: '5',
      level: 'ATENÇÃO',
      message:
        `Relação balanço/diâmetro (L/D) ${formatNumber(derived.LD, 1)} contra o limiar ${formatNumber(ldThreshold, 1)} da haste ` +
        `(+${formatNumber((derived.LD / ldThreshold - 1) * 100, 0)}%): a deflexão cresce com o cubo dessa relação.`,
    });
  }

  // Gatilho 4 — janela de velocidade de corte.
  const vcAlert = vcOutOfWindow(input.vc, material.vcReference, '4');
  if (vcAlert) alerts.push(vcAlert);

  // Gatilho 10 — toroidal com ap < r. Nasce da lacuna L1, não de limiar publicado.
  if (input.geometry === 'toroidal' && input.r !== undefined && ap < input.r) {
    alerts.push({
      trigger: '10',
      level: 'ATENÇÃO',
      message:
        `Profundidade de corte (ap) ${formatNumber(ap, 2)} mm contra o raio de ponta ${formatNumber(input.r, 2)} mm: ` +
        `a fórmula do diâmetro efetivo não foi confirmada para fresa toroidal nesta condição, e o resultado pode estar errado.`,
    });
  }

  return alerts;
}

export function analyzeDrilling(input: DrillingInput, derived: { vcReal: number }): Alert[] {
  const alerts: Alert[] = [];

  // Gatilho 4 — a referência é a partida **desta combinação** material × ferramenta, não a
  // do material, que vale para fresa de metal duro. Sem ela informada, o gatilho não roda:
  // comparar 16 m/min de broca de aço rápido contra 140 m/min de fresa é falso positivo.
  const vcAlert = input.vcStart === undefined ? null : vcOutOfWindow(input.vc, input.vcStart, '4');
  if (vcAlert) alerts.push(vcAlert);

  // Gatilhos 6 e 7 — profundidade do furo. Sem `holeDepth` não há o que medir.
  if (input.holeDepth !== undefined && input.D > 0) {
    const ratio = input.holeDepth / input.D;
    const withCoolant = input.internalCoolant === true;
    const threshold = withCoolant ? DRILL_DEPTH_THRESHOLD.comCanal : DRILL_DEPTH_THRESHOLD.semCanal;
    if (ratio > threshold) {
      alerts.push({
        trigger: withCoolant ? '7' : '6',
        level: 'ATENÇÃO',
        message: withCoolant
          ? `Profundidade do furo ${formatNumber(ratio, 1)} × D contra o limiar de ${threshold} × D: acima disso é furação profunda dedicada, com furo-guia e pressão de refrigerante próprios.`
          : `Profundidade do furo ${formatNumber(ratio, 1)} × D contra o limiar de ${threshold} × D para broca sem canal interno: acima dele o cavaco entope o canal.`,
      });
    }
  }

  return alerts;
}

export function analyzeThreading(
  input: ThreadingInput,
  derived: { n: number; LD: number; vcReal: number }
): Alert[] {
  const alerts: Alert[] = [];
  const { vc, toolType = 'macho-corte', material } = input;

  // Gatilho 8: Teto seguro para machos (CANONICO_FURACAO §1.8, §3.4)
  if (toolType === 'macho-corte') {
    if (vc > 40) {
      alerts.push({
        trigger: '8',
        level: 'CRÍTICO',
        message: `Velocidade de corte (${formatNumber(vc, 0)} m/min) excede o teto seguro para machos de corte (40 m/min).`,
      });
    }
  } else if (toolType === 'macho-conformacao') {
    if (vc > 60) {
      alerts.push({
        trigger: '8',
        level: 'CRÍTICO',
        message: `Velocidade de corte (${formatNumber(vc, 0)} m/min) excede o teto seguro para machos de conformação (60 m/min).`,
      });
    }

    // Material incompatível com conformação (§2.2, §3.4): ferro fundido, aço temperado, Ti-6Al-4V
    if (
      material.isoClass === 'K' ||
      material.isoClass === 'H' ||
      material.id === 'ti6al4v'
    ) {
      alerts.push({
        trigger: '9',
        level: 'CRÍTICO',
        message: `Macho de conformação não se aplica a este material (falta ductilidade para escoamento plástico); risco crítico de ruptura do macho dentro da peça.`,
      });
    }
  }

  // Teto de hardware de rotação em rosqueamento síncrono (CANONICO_FURACAO §1.10)
  if (derived.n > 2700) {
    alerts.push({
      trigger: 'hw-sync',
      level: 'ATENÇÃO',
      message: `Rotação calculada (${formatNumber(derived.n, 0)} rpm) excede o teto comum de hardware para sincronismo rígido (~2.500–2.700 rpm).`,
    });
  }

  // Balanço L/D
  if (derived.LD > 4.0) {
    alerts.push({
      trigger: '5',
      level: 'ATENÇÃO',
      message: `Relação balanço/diâmetro (L/D) ${formatNumber(derived.LD, 1)} acima do limiar de 4,0 da haste comum: risco de deflexão e quebra do macho.`,
    });
  }

  return alerts;
}

export function analyzeBoring(
  input: BoringInput,
  derived: { LD: number; vcReal: number }
): Alert[] {
  const alerts: Alert[] = [];

  // Gatilho 5 — Balanço L/D da barra de mandrilar comum (CANONICO_FURACAO §1.11, MVP §9.3)
  if (derived.LD > 4.0) {
    alerts.push({
      trigger: '5',
      level: 'ATENÇÃO',
      message: `Relação balanço/diâmetro (L/D) ${formatNumber(derived.LD, 1)} acima do limiar de 4,0 da barra de mandrilar comum: vibração e deflexão com perda de tolerância geométrica.`,
    });
  }

  // Gatilho 4 — Janela em torno da velocidade de partida se vcStart informado
  if (input.vcStart !== undefined) {
    const vcAlert = vcOutOfWindow(input.vc, input.vcStart, '4');
    if (vcAlert) alerts.push(vcAlert);
  }

  return alerts;
}
