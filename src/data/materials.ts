/**
 * Static material data for ToolOptimizer CNC
 * Source: docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md
 *         docs/technical/PRD_Velocidades_Corte_CNC.md
 */

import { TipoUsinagem } from '../types';
import type { Material } from '../types';

export const MATERIAIS = [
  {
    id: 1,
    nome: 'Aço 1020',
    iso: 'P',
    dureza: '120-160 HB',
    kc1_1: 1800,
    mc: 0.17,
    vcRanges: {
      [TipoUsinagem.DESBASTE]: [185, 250],
      [TipoUsinagem.SEMI_ACABAMENTO]: [220, 280],
      [TipoUsinagem.ACABAMENTO]: [250, 350],
    },
    status: 'validado',
  },
  {
    id: 2,
    nome: 'Aço 1045',
    iso: 'P',
    dureza: '170-220 HB',
    kc1_1: 2165,
    mc: 0.155,
    vcRanges: {
      [TipoUsinagem.DESBASTE]: [150, 200],
      [TipoUsinagem.SEMI_ACABAMENTO]: [180, 240],
      [TipoUsinagem.ACABAMENTO]: [200, 280],
    },
    status: 'validado',
  },
  {
    id: 3,
    nome: 'Aço Inox 304',
    iso: 'M',
    dureza: '140-180 HB',
    kc1_1: 2150,
    mc: 0.185,
    vcRanges: {
      [TipoUsinagem.DESBASTE]: [60, 90],
      [TipoUsinagem.SEMI_ACABAMENTO]: [80, 120],
      [TipoUsinagem.ACABAMENTO]: [100, 150],
    },
    status: 'validado',
  },
  {
    id: 4,
    nome: 'Alumínio 6061-T6',
    iso: 'N',
    dureza: '~95 HB',
    kc1_1: 1200,
    mc: 0.75,
    vcRanges: {
      [TipoUsinagem.DESBASTE]: [400, 600],
      [TipoUsinagem.SEMI_ACABAMENTO]: [500, 800],
      [TipoUsinagem.ACABAMENTO]: [600, 1000],
    },
    status: 'estimado',
  },
  {
    id: 5,
    nome: 'P20',
    iso: 'P',
    dureza: '280-320 HB',
    kc1_1: 2300,
    mc: 0.20,
    vcRanges: {
      [TipoUsinagem.DESBASTE]: [100, 120],
      [TipoUsinagem.SEMI_ACABAMENTO]: [120, 180],
      [TipoUsinagem.ACABAMENTO]: [150, 200],
    },
    status: 'estimado',
  },
  {
    id: 6,
    nome: '2711',
    iso: 'P',
    dureza: '300-340 HB',
    kc1_1: 2500,
    mc: 0.20,
    vcRanges: {
      [TipoUsinagem.DESBASTE]: [85, 105],
      [TipoUsinagem.SEMI_ACABAMENTO]: [100, 150],
      [TipoUsinagem.ACABAMENTO]: [125, 170],
    },
    status: 'estimado',
  },
  {
    id: 7,
    nome: '8620 (núcleo)',
    iso: 'P',
    dureza: '180-220 HB',
    kc1_1: 2100,
    mc: 0.20,
    vcRanges: {
      [TipoUsinagem.DESBASTE]: [120, 180],
      [TipoUsinagem.SEMI_ACABAMENTO]: [150, 220],
      [TipoUsinagem.ACABAMENTO]: [180, 250],
    },
    status: 'estimado',
  },
  {
    id: 8,
    nome: '8620 (cementado)',
    iso: 'H',
    dureza: '58-62 HRC',
    kc1_1: 2800,
    mc: 0.20,
    vcRanges: {
      [TipoUsinagem.DESBASTE]: [60, 90],
      [TipoUsinagem.SEMI_ACABAMENTO]: [80, 120],
      [TipoUsinagem.ACABAMENTO]: [100, 150],
    },
    status: 'estimado',
  },
  {
    id: 9,
    nome: 'H13',
    iso: 'H',
    dureza: '45-52 HRC',
    kc1_1: 2800,
    mc: 0.20,
    vcRanges: {
      [TipoUsinagem.DESBASTE]: [80, 125],
      [TipoUsinagem.SEMI_ACABAMENTO]: [100, 150],
      [TipoUsinagem.ACABAMENTO]: [125, 170],
    },
    status: 'estimado',
  },
] as const satisfies readonly Material[];

export function getMaterialById(id: number): Material | undefined {
  return MATERIAIS.find((m) => m.id === id);
}
