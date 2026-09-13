/**
 * Tipos do núcleo de cálculo do Fenix.
 *
 * Nomenclatura: o core usa os símbolos dos canônicos (`n`, `vf`, `hm`, `Pc`, `Mc`),
 * não os rótulos de tela. O painel chama `n` de "S (rotação)" e `vf` de "F (avanço)"
 * — `MVP_CALCULADORA_PARAMETROS.md` §7 é dono dessa tradução, não este módulo.
 */

export type Family = 'fresar' | 'furar' | 'roscar' | 'mandrilar';

/** `spec.md` R2 e R4: CRÍTICO > ATENÇÃO > NORMAL. */
export type SafetyLevel = 'CRÍTICO' | 'ATENÇÃO' | 'NORMAL';

export type IsoClass = 'P' | 'M' | 'K' | 'N' | 'S' | 'H';

export interface Material {
  id: string;
  name: string;
  isoClass: IsoClass;
  /** Força específica de corte em h = 1 mm, N/mm². `CANONICO_MOTOR_DE_CALCULO` §2.1. */
  kc1_1: number;
  /** Expoente de Kienzle. `CANONICO_MOTOR_DE_CALCULO` §2.1. */
  mc: number;
  /** Velocidade de corte de partida, m/min. `MVP` §11.2 — vale para fresa de metal duro. */
  vcReference: number;
  isCustom: boolean;
}

/**
 * Um alerta descreve o risco e situa o valor; não instrui (`MVP` §9.1).
 * `trigger` é o número do gatilho no `MVP` §9.2 — é o que dá rastreabilidade à mensagem.
 */
export interface Alert {
  trigger: string;
  level: Exclude<SafetyLevel, 'NORMAL'>;
  message: string;
}

/** Geometrias de fresa que mudam a cadeia de cálculo. As demais caem em 'topo-reto'. */
export type MillingGeometry = 'topo-reto' | 'toroidal' | 'esferica';

export type ShankType = 'comum' | 'amortecido';

export interface MillingInput {
  material: Material;
  /** Diâmetro nominal da fresa, mm. */
  D: number;
  /** Número de arestas. */
  Z: number;
  /** Balanço da ferramenta, mm. */
  L: number;
  /** Profundidade de corte, mm. */
  ap: number;
  /** Penetração de trabalho, mm. */
  ae: number;
  /** Velocidade de corte, m/min. */
  vc: number;
  /** Avanço por dente programado, mm/dente. */
  fz: number;
  geometry?: MillingGeometry;
  /** Raio de ponta da toroidal, mm. Só lido quando `geometry` é 'toroidal'. */
  r?: number;
  /** Ângulo de posição, graus. Fresa reta = 90°, e é o padrão. */
  kappa?: number;
  shank?: ShankType;
  /**
   * Rotação fixada pelo operador (`MVP` §8.1). Quando presente, substitui a rotação
   * derivada de `vc` e a cadeia inteira roda em cima dela — a mesma cadeia do sentido
   * direto, nunca uma segunda implementação.
   */
  nOverride?: number;
}

export interface MillingResult {
  /** Rotação, rpm. */
  n: number;
  /** Avanço da mesa, mm/min. */
  vf: number;
  /** Velocidade de corte real, m/min — difere de `vc` quando há `nOverride` ou `De`. */
  vcReal: number;
  /** Diâmetro efetivo de corte, mm. Igual a `D` fora da esférica. */
  De: number;
  /** Relação balanço/diâmetro. */
  LD: number;
  /** Razão de penetração `ae/D`, saturada em 1. */
  eps: number;
  /** Arco engajado, rad. */
  phiMax: number;
  /** Espessura de cavaco média, mm. */
  hm: number;
  /** Espessura de cavaco máxima, mm. */
  hex: number;
  /** Fator de afinamento de cavaco — exibido, nunca aplicado sobre `fz`. */
  ctf: number;
  /** Força específica de corte no ponto de trabalho, N/mm². */
  kc: number;
  /** Taxa de remoção de material, cm³/min. */
  Q: number;
  /** Potência de corte na aresta, kW. */
  Pc: number;
  /** Torque, N·m. */
  Mc: number;
  safetyLevel: SafetyLevel;
  alerts: Alert[];
}

/** Substrato da broca — decide o modo de cálculo (`ESCOPO_BROCA_ACO_RAPIDO` §1). */
export type DrillSubstrate = 'MD' | 'HSS-Co';

export interface DrillingInput {
  material: Material;
  /** Diâmetro da broca, mm. */
  D: number;
  /** Balanço da ferramenta, mm. */
  L: number;
  /** Velocidade de corte, m/min. */
  vc: number;
  substrate: DrillSubstrate;
  /**
   * Avanço por rotação, mm/rot. Em HSS-Co é derivado do percentual do modo e o valor
   * informado aqui é ignorado (`ESCOPO_BROCA_ACO_RAPIDO` §2.1).
   */
  fn?: number | undefined;
  /** Ângulo de ponta, graus. Padrão 118° em aço rápido, 140° em metal duro. */
  pointAngle?: number | undefined;
  /** Profundidade do furo, mm. Sem ela os gatilhos 6 e 7 não têm o que medir. */
  holeDepth?: number | undefined;
  /** Broca com canal interno de refrigeração — muda o limiar de profundidade. */
  internalCoolant?: boolean | undefined;
  /**
   * Velocidade de corte de partida desta combinação material × ferramenta, m/min.
   * Não é `material.vcReference`: aquele vale para fresa de metal duro. Ver
   * `analyzer.ts` e `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO` §2.1.
   */
  vcStart?: number | undefined;
  /** Rotação fixada pelo operador (`MVP` §8.1). */
  nOverride?: number | undefined;
}

export interface DrillingResult {
  n: number;
  vf: number;
  vcReal: number;
  /** Avanço por rotação efetivo, mm/rot. */
  fn: number;
  /** Passo do pica-pau, mm. Só existe no modo aço rápido. */
  peckStep: number | null;
  LD: number;
  /** Espessura de cavaco por aresta, mm. */
  h: number;
  kc: number;
  Q: number;
  Pc: number;
  Mc: number;
  safetyLevel: SafetyLevel;
  alerts: Alert[];
}

export interface AppConfig {
  safetyMargin: number;
  hssFeedPercent: number;
  hssPeckDivisor: number;
  hssPeckCapMm: number;
}

export type ToolGeometryType =
  | 'topo-reto'
  | 'toroidal'
  | 'esferica'
  | 'chanfrar'
  | 'alto-avanco'
  | 'faceador'
  | 'topo-pastilha'
  | 'disco'
  | 'helicoidal'
  | 'udrill'
  | 'centro'
  | 'escareador'
  | 'alargador'
  | 'macho-corte'
  | 'macho-conformacao'
  | 'fresa-rosca'
  | 'barra-mandrilar';

export interface ToolInstance {
  id: string;
  name: string;
  family: Family;
  geometryType: ToolGeometryType;
  geometryId: string;
  substrate: 'MD' | 'HSS-Co';
  D: number;
  Z?: number;
  Lc?: number;
  r?: number;
  kappa?: number;
  pointAngle?: number;
  Dmin?: number;
  pitch?: number;
  designation?: string;
  holeSize?: number;
  threadLength?: number;
  initialD?: number;
  finalD?: number;
  re?: number;
  fn?: number;
  minDiameter?: number | null;
  maxDiameter?: number | null;
  isIncomplete?: boolean;
}

export interface ThreadingInput {
  material: Material;
  /** Diâmetro nominal da rosca, mm. */
  D: number;
  /** Passo da rosca (P), mm. */
  pitch: number;
  /** Velocidade de corte, m/min. */
  vc: number;
  /** Balanço da ferramenta, mm. */
  L: number;
  /** Tipo de ferramenta de roscar */
  toolType?: 'macho-corte' | 'macho-conformacao' | 'fresa-rosca' | undefined;
  vcStart?: number | undefined;
  nOverride?: number | undefined;
}

export interface ThreadingResult {
  n: number;
  vf: number;
  vcReal: number;
  pitch: number;
  LD: number;
  h: number;
  kc: number;
  Q: number;
  Pc: number;
  Mc: number;
  safetyLevel: SafetyLevel;
  alerts: Alert[];
}

export interface BoringInput {
  material: Material;
  /** Diâmetro inicial do furo prévio, mm. */
  dInitial: number;
  /** Diâmetro final calibrado, mm. */
  dFinal: number;
  /** Balanço da barra de mandrilar, mm. */
  L: number;
  /** Velocidade de corte, m/min. */
  vc: number;
  /** Avanço por rotação, mm/rot (default canônico 0.08). */
  fn?: number | undefined;
  /** Raio de ponta do inserto, mm (default 0.4). */
  rEpsilon?: number | undefined;
  vcStart?: number | undefined;
  nOverride?: number | undefined;
}

export interface BoringResult {
  n: number;
  vf: number;
  vcReal: number;
  /** Profundidade de corte radial: (dFinal - dInitial) / 2, mm. */
  ap: number;
  /** Diâmetro de corte efetivo (dFinal), mm. */
  Dc: number;
  fn: number;
  LD: number;
  h: number;
  kc: number;
  /** Taxa de remoção de material na forma do anel exato, cm³/min. */
  Q: number;
  /** Potência de corte corrigida por (1 - ap/Dc), kW. */
  Pc: number;
  /** Torque, N·m. */
  Mc: number;
  safetyLevel: SafetyLevel;
  alerts: Alert[];
}

