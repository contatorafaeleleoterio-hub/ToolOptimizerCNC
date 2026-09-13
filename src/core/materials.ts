import type { Material } from './types.js';

/**
 * Repositório dos materiais de fábrica.
 *
 * Cada linha é transcrição, nunca arbitragem: o par `(kc1.1, mc)` vem de
 * `CANONICO_MOTOR_DE_CALCULO` §2.1 e a velocidade de corte de partida vem de
 * `MVP_CALCULADORA_PARAMETROS` §11.2. Material que os dois documentos não cobrem
 * com valor único não entra aqui — ver `EXCLUDED_MATERIALS` no fim do arquivo.
 *
 * `vcReference` vale para **fresa de metal duro**. Furação, roscamento e mandrilamento
 * partem de outra velocidade (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO` §2), e é por
 * isso que `DrillingInput.vcStart` existe.
 */
export const FACTORY_MATERIALS: readonly Material[] = [
  { id: '1020', name: 'Aço 1020 (120–160 HB)', isoClass: 'P', kc1_1: 1500, mc: 0.21, vcReference: 180, isCustom: false },
  { id: '1045', name: 'Aço 1045 (170–220 HB)', isoClass: 'P', kc1_1: 1500, mc: 0.21, vcReference: 140, isCustom: false },
  { id: '8620-nucleo', name: 'Aço 8620, núcleo (180–220 HB)', isoClass: 'P', kc1_1: 1570, mc: 0.24, vcReference: 130, isCustom: false },
  { id: '8620-cementado', name: 'Aço 8620, cementado (58–62 HRC)', isoClass: 'H', kc1_1: 4300, mc: 0.25, vcReference: 50, isCustom: false },
  { id: '304', name: 'Inox 304 (140–180 HB)', isoClass: 'M', kc1_1: 1800, mc: 0.21, vcReference: 90, isCustom: false },
  { id: '6061-t6', name: 'Alumínio 6061-T6', isoClass: 'N', kc1_1: 600, mc: 0.25, vcReference: 400, isCustom: false },
  { id: 'p20', name: 'P20 / 1.2311 (280–320 HB)', isoClass: 'P', kc1_1: 2000, mc: 0.25, vcReference: 110, isCustom: false },
  // §11.2 publica uma linha única "Aço H13 | 60" — o valor de partida não separa o
  // tratado do recozido, embora o `kc1.1` separe. Os dois herdam 60 m/min.
  { id: 'h13-tratado', name: 'H13 tratado / 1.2344 (45–52 HRC)', isoClass: 'H', kc1_1: 3000, mc: 0.25, vcReference: 60, isCustom: false },
  { id: 'h13-recozido', name: 'H13 recozido', isoClass: 'P', kc1_1: 2000, mc: 0.25, vcReference: 60, isCustom: false },
  { id: 'gg25', name: 'Ferro fundido cinzento GG25 / EN-GJL-250', isoClass: 'K', kc1_1: 800, mc: 0.28, vcReference: 120, isCustom: false },
  { id: 'ti6al4v', name: 'Ti-6Al-4V', isoClass: 'S', kc1_1: 1500, mc: 0.25, vcReference: 40, isCustom: false },
];

/**
 * Materiais que o canônico nomeia mas não fecha em valor único. Ficam fora da lista de
 * fábrica para não arbitrar um número que a fonte não publica; entram pelo cadastro do
 * operador, que informa o valor do fornecedor dele (`ESCOPO_CONFIGURACOES` §2.2).
 */
export const EXCLUDED_MATERIALS: readonly { name: string; reason: string }[] = [
  { name: 'Aço 2711 (300–340 HB)', reason: '`kc1.1` publicado como faixa 2000–2500 (CANONICO_MOTOR_DE_CALCULO §2.1, Lacuna 4.5)' },
  { name: 'Ferro fundido nodular GGG50', reason: '`kc1.1` SEM CONSENSO — 950 ou 800 dentro da própria fonte (Lacuna 4.6)' },
];

export function findMaterial(id: string): Material | undefined {
  return FACTORY_MATERIALS.find((m) => m.id === id);
}
