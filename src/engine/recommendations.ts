/**
 * Recommended cutting parameter engine for ToolOptimizer CNC
 * Provides sensible defaults based on material, operation type, and tool diameter.
 * Source: docs/PADRONIZAÇÃO ADOTADA.md
 */

import type { Material, ParametrosUsinagem, ClasseISO } from '@/types';
import { TipoUsinagem } from '@/types';

// ── Vc/fz lookup tables per material group and diameter ──
// Source: PADRONIZAÇÃO ADOTADA - Tabela por diâmetro

interface VcFzEntry {
  d: number;
  vc: number;
  fz: number;
}

/** Grupo 1: Aços 28-34 HRC (2738, 8620, P20, 4140) — Desbaste */
const GRUPO1_DESBASTE: VcFzEntry[] = [
  { d: 0.2, vc: 120, fz: 0.003 },
  { d: 0.5, vc: 140, fz: 0.006 },
  { d: 0.75, vc: 150, fz: 0.008 },
  { d: 0.8, vc: 150, fz: 0.010 },
  { d: 1, vc: 160, fz: 0.012 },
  { d: 1.5, vc: 170, fz: 0.020 },
  { d: 2, vc: 180, fz: 0.030 },
  { d: 3, vc: 190, fz: 0.050 },
  { d: 4, vc: 200, fz: 0.070 },
  { d: 6, vc: 210, fz: 0.100 },
  { d: 8, vc: 210, fz: 0.120 },
  { d: 10, vc: 200, fz: 0.140 },
  { d: 12, vc: 190, fz: 0.160 },
  { d: 14, vc: 180, fz: 0.180 },
  { d: 16, vc: 170, fz: 0.200 },
];

/** Grupo 2: Aços 38-43 HRC (2711, H13, VP Atlas, MD-XTRA) — Desbaste */
const GRUPO2_DESBASTE: VcFzEntry[] = [
  { d: 0.2, vc: 90, fz: 0.002 },
  { d: 0.5, vc: 110, fz: 0.004 },
  { d: 0.75, vc: 120, fz: 0.006 },
  { d: 0.8, vc: 125, fz: 0.007 },
  { d: 1, vc: 140, fz: 0.010 },
  { d: 1.5, vc: 160, fz: 0.018 },
  { d: 2, vc: 180, fz: 0.025 },
  { d: 3, vc: 200, fz: 0.040 },
  { d: 4, vc: 220, fz: 0.060 },
  { d: 6, vc: 240, fz: 0.080 },
  { d: 8, vc: 260, fz: 0.110 },
  { d: 10, vc: 280, fz: 0.150 },
  { d: 12, vc: 300, fz: 0.180 },
  { d: 14, vc: 290, fz: 0.200 },
  { d: 16, vc: 280, fz: 0.220 },
];

/** Grupo 3: Aços baixo carbono (1020, 1045) — Desbaste
 *  Vc: 180-260 escalonado; fz: +10% sobre grupo 28-34 HRC */
const GRUPO3_DESBASTE: VcFzEntry[] = GRUPO1_DESBASTE.map((e) => ({
  d: e.d,
  vc: Math.round(e.vc * 1.3), // scaled to 180-260 range
  fz: Math.round(e.fz * 1.10 * 10000) / 10000, // +10% fz
}));

/** Alumínio — Desbaste */
const ALUMINIO_DESBASTE: VcFzEntry[] = [
  { d: 0.2, vc: 300, fz: 0.004 },
  { d: 0.5, vc: 400, fz: 0.010 },
  { d: 1, vc: 600, fz: 0.020 },
  { d: 2, vc: 700, fz: 0.040 },
  { d: 4, vc: 800, fz: 0.080 },
  { d: 6, vc: 900, fz: 0.120 },
  { d: 8, vc: 950, fz: 0.160 },
  { d: 10, vc: 1000, fz: 0.200 },
  { d: 12, vc: 1000, fz: 0.250 },
  { d: 16, vc: 900, fz: 0.300 },
];

// ── Acabamento rules from Padronização ──

/** Grupo 1 acabamento: Vc = +10% desbaste, fz = 60% desbaste */
function grupo1Acabamento(entry: VcFzEntry): VcFzEntry {
  return {
    d: entry.d,
    vc: Math.round(entry.vc * 1.10),
    fz: Math.round(entry.fz * 0.60 * 10000) / 10000,
  };
}

/** Grupo 2 acabamento: Vc = 0.85 * desbaste, fz = 0.75 * desbaste */
function grupo2Acabamento(entry: VcFzEntry): VcFzEntry {
  return {
    d: entry.d,
    vc: Math.round(entry.vc * 0.85),
    fz: Math.round(entry.fz * 0.75 * 10000) / 10000,
  };
}

/** Grupo 3 acabamento: same rule as Grupo 1 (+10% Vc, 60% fz) */
function grupo3Acabamento(entry: VcFzEntry): VcFzEntry {
  return {
    d: entry.d,
    vc: Math.round(entry.vc * 1.10),
    fz: Math.round(entry.fz * 0.60 * 10000) / 10000,
  };
}

/** Aluminio acabamento: +10% Vc, 60% fz (same convention) */
function aluminioAcabamento(entry: VcFzEntry): VcFzEntry {
  return {
    d: entry.d,
    vc: Math.round(entry.vc * 1.10),
    fz: Math.round(entry.fz * 0.60 * 10000) / 10000,
  };
}

// ── Material group mapping ──

type MaterialGroup = 'grupo1' | 'grupo2' | 'grupo3' | 'aluminio' | 'cobre' | 'nylon';

/** Map material ID to its group for table lookup */
function getMaterialGroup(material: Material): MaterialGroup {
  // Alumínio
  if (material.iso === 'N') return 'aluminio';

  // By name/id recognition
  const nome = material.nome.toLowerCase();
  if (nome.includes('1020') || nome.includes('1045')) return 'grupo3';
  if (nome.includes('2711') || nome.includes('h13') || nome.includes('vp') || nome.includes('atlas') || nome.includes('md-xtra')) return 'grupo2';

  // Default for P/H steels: grupo1 (28-34 HRC range)
  // Hardened steels 38+ HRC → grupo2
  const durezaStr = material.dureza;
  if (durezaStr.includes('HRC')) {
    const match = durezaStr.match(/(\d+)/);
    if (match && parseInt(match[1]) >= 38) return 'grupo2';
  }

  return 'grupo1';
}

/** Get the desbaste table for a material group */
function getDesbasteTable(group: MaterialGroup): VcFzEntry[] {
  switch (group) {
    case 'grupo1': return GRUPO1_DESBASTE;
    case 'grupo2': return GRUPO2_DESBASTE;
    case 'grupo3': return GRUPO3_DESBASTE;
    case 'aluminio': return ALUMINIO_DESBASTE;
    case 'cobre': return ALUMINIO_DESBASTE.map((e) => ({
      d: e.d,
      vc: Math.round((300 + 450) / 2), // Vc 300-450
      fz: Math.round(e.fz * 0.70 * 10000) / 10000, // 70% do alumínio
    }));
    case 'nylon': return ALUMINIO_DESBASTE.map((e) => ({
      d: e.d,
      vc: Math.round((250 + 400) / 2), // Vc 250-400
      fz: Math.round(e.fz * 1.20 * 10000) / 10000, // 120% do alumínio
    }));
  }
}

/** Get acabamento entry from desbaste entry per group rules */
function getAcabamentoEntry(group: MaterialGroup, desbasteEntry: VcFzEntry): VcFzEntry {
  switch (group) {
    case 'grupo1': return grupo1Acabamento(desbasteEntry);
    case 'grupo2': return grupo2Acabamento(desbasteEntry);
    case 'grupo3': return grupo3Acabamento(desbasteEntry);
    case 'aluminio':
    case 'cobre':
    case 'nylon':
      return aluminioAcabamento(desbasteEntry);
  }
}

/** Semi-acabamento: midpoint between desbaste and acabamento */
function getSemiEntry(desbasteEntry: VcFzEntry, acabamentoEntry: VcFzEntry): VcFzEntry {
  return {
    d: desbasteEntry.d,
    vc: Math.round((desbasteEntry.vc + acabamentoEntry.vc) / 2),
    fz: Math.round(((desbasteEntry.fz + acabamentoEntry.fz) / 2) * 10000) / 10000,
  };
}

/**
 * Interpolate Vc and fz for a given diameter from a lookup table.
 * Uses linear interpolation between nearest entries.
 * Clamps to first/last entry if diameter is outside table range.
 */
function interpolateFromTable(table: VcFzEntry[], diameter: number): { vc: number; fz: number } {
  if (diameter <= table[0].d) {
    return { vc: table[0].vc, fz: table[0].fz };
  }
  const last = table[table.length - 1];
  if (diameter >= last.d) {
    return { vc: last.vc, fz: last.fz };
  }

  // Find bracketing entries
  let lower = table[0];
  let upper = table[1];
  for (let i = 0; i < table.length - 1; i++) {
    if (diameter >= table[i].d && diameter <= table[i + 1].d) {
      lower = table[i];
      upper = table[i + 1];
      break;
    }
  }

  // Linear interpolation
  const t = (diameter - lower.d) / (upper.d - lower.d);
  return {
    vc: Math.round(lower.vc + t * (upper.vc - lower.vc)),
    fz: Math.round((lower.fz + t * (upper.fz - lower.fz)) * 10000) / 10000,
  };
}

// ── AE/AP rules from Padronização ──

/** AE multiplier by operation and material ISO class */
function getAEMultiplier(tipoOperacao: TipoUsinagem, iso: ClasseISO): number {
  switch (tipoOperacao) {
    case TipoUsinagem.DESBASTE:
      return iso === 'N' ? 0.50 : 0.45; // Alumínio 50%, aços 45%
    case TipoUsinagem.SEMI_ACABAMENTO:
      return 0.30;
    case TipoUsinagem.ACABAMENTO:
      switch (iso) {
        case 'N': return 0.08;  // Alumínio 8%
        case 'P': return 0.05;  // Aços 5%
        case 'M': return 0.05;  // Inox 5%
        case 'H': return 0.035; // Endurecidos 3.5% (Grupo 2 acabamento)
        default: return 0.05;
      }
  }
}

/** AP multiplier by operation and diameter */
function getAPMultiplier(tipoOperacao: TipoUsinagem, diametro: number): number {
  switch (tipoOperacao) {
    case TipoUsinagem.DESBASTE:
      return diametro <= 6 ? 1.0 : 0.8; // 1.0D até Ø6, 0.8D acima
    case TipoUsinagem.SEMI_ACABAMENTO:
      return 0.5;
    case TipoUsinagem.ACABAMENTO:
      return 0.2; // Padronização: 0.2D
  }
}

/**
 * Get recommended cutting parameters for given material + operation + tool diameter.
 * Uses diameter-specific Vc/fz tables from Padronização Adotada,
 * with proper AE/AP rules per material ISO class.
 */
export function getRecommendedParams(
  material: Material,
  tipoOperacao: TipoUsinagem,
  diametro: number,
): ParametrosUsinagem {
  const group = getMaterialGroup(material);
  const desbasteTable = getDesbasteTable(group);

  // Get Vc/fz from diameter-specific table
  let vcFz: { vc: number; fz: number };

  if (tipoOperacao === TipoUsinagem.DESBASTE) {
    vcFz = interpolateFromTable(desbasteTable, diametro);
  } else {
    const desbasteEntry = interpolateFromTable(desbasteTable, diametro);
    const desbasteVcFz: VcFzEntry = { d: diametro, ...desbasteEntry };
    const acabamentoEntry = getAcabamentoEntry(group, desbasteVcFz);

    if (tipoOperacao === TipoUsinagem.ACABAMENTO) {
      vcFz = { vc: acabamentoEntry.vc, fz: acabamentoEntry.fz };
    } else {
      // Semi-acabamento: midpoint
      const semiEntry = getSemiEntry(desbasteVcFz, acabamentoEntry);
      vcFz = { vc: semiEntry.vc, fz: semiEntry.fz };
    }
  }

  // Fallback: if table gives values outside material vcRanges, clamp to range
  const vcRange = material.vcRanges[tipoOperacao];
  const vc = Math.max(vcRange[0], Math.min(vcRange[1], vcFz.vc));

  const fz = vcFz.fz;

  // AE/AP from Padronização rules
  const aeRaw = diametro * getAEMultiplier(tipoOperacao, material.iso);
  const ae = Math.round(aeRaw * 100) / 100; // round to 0.01

  const apRaw = diametro * getAPMultiplier(tipoOperacao, diametro);
  const ap = Math.round(apRaw * 10) / 10; // round to 0.1

  return {
    ap: Math.max(0.1, ap),
    ae: Math.max(0.01, ae),
    fz: Math.max(0.001, fz),
    vc,
  };
}
