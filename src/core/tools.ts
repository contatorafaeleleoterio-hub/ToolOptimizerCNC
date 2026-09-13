import type { Family, Material, ToolGeometryType } from './types.js';

export type Substrate = 'MD' | 'HSS-Co';

export interface ToolGeometry {
  id: string;
  family: Family;
  geometryType: ToolGeometryType;
  name: string;
  substrates: Substrate[];
  
  /** Diâmetro mínimo sugerido (MVP §3.2) por substrato, se aplicável */
  minDiameter: Record<Substrate, number> | number | null;
  /** Diâmetro máximo sugerido (MVP §3.2) por substrato, se aplicável */
  maxDiameter: Record<Substrate, number> | number | null;
  
  /** Quantidade padrão de arestas/facas (Z), nulo se não aplicável */
  defaultZ: number | null;
  
  /** Valores de partida geométricos sugeridos, caso aplicável */
  defaults: {
    ap?: number;
    aeMultiplier?: number | null; // Multiplicador sobre D, ou valor fixo
    aeFixed?: number;
    L?: number;
  };
  
  /** Lista de chaves dos campos extras que essa geometria pede na UI */
  extraFields: string[];
}

export const FACTORY_TOOLS: ToolGeometry[] = [
  // FRESAR
  { id: 'fresa-topo-reto', family: 'fresar', geometryType: 'topo-reto', name: 'Topo Reto', substrates: ['MD', 'HSS-Co'], minDiameter: null, maxDiameter: null, defaultZ: 4, defaults: { ap: 3, aeFixed: 5, L: 30 }, extraFields: [] },
  { id: 'fresa-toroidal', family: 'fresar', geometryType: 'toroidal', name: 'Toroidal', substrates: ['MD'], minDiameter: null, maxDiameter: null, defaultZ: 4, defaults: { ap: 1, aeFixed: 3, L: 30 }, extraFields: ['r'] },
  { id: 'fresa-esferica', family: 'fresar', geometryType: 'esferica', name: 'Esférica', substrates: ['MD', 'HSS-Co'], minDiameter: null, maxDiameter: null, defaultZ: 2, defaults: { ap: 2, aeFixed: 3, L: 25 }, extraFields: [] }, // r é derivado D/2
  { id: 'fresa-chanfrar', family: 'fresar', geometryType: 'chanfrar', name: 'Chanfrar', substrates: ['MD', 'HSS-Co'], minDiameter: null, maxDiameter: null, defaultZ: 4, defaults: { ap: 1, aeFixed: 1, L: 30 }, extraFields: ['Dmin'] },
  { id: 'fresa-alto-avanco', family: 'fresar', geometryType: 'alto-avanco', name: 'Alto Avanço', substrates: ['MD'], minDiameter: null, maxDiameter: null, defaultZ: 3, defaults: { ap: 1, aeFixed: 8, L: 30 }, extraFields: ['kappa'] },
  { id: 'fresa-cabecote', family: 'fresar', geometryType: 'faceador', name: 'Cabeçote Faceador', substrates: ['MD'], minDiameter: null, maxDiameter: null, defaultZ: 5, defaults: { ap: 1, aeMultiplier: 0.7, L: 40 }, extraFields: ['kappa'] },
  { id: 'fresa-topo-pastilha', family: 'fresar', geometryType: 'topo-pastilha', name: 'Topo c/ Pastilhas', substrates: ['MD'], minDiameter: null, maxDiameter: null, defaultZ: 2, defaults: { ap: 3, aeFixed: 5, L: 30 }, extraFields: [] },
  { id: 'fresa-disco', family: 'fresar', geometryType: 'disco', name: 'Disco/Serra', substrates: ['MD', 'HSS-Co'], minDiameter: null, maxDiameter: null, defaultZ: 8, defaults: { ap: 5, aeFixed: 3 }, extraFields: [] },
  
  // FURAR
  { id: 'broca-helicoidal', family: 'furar', geometryType: 'helicoidal', name: 'Helicoidal', substrates: ['MD', 'HSS-Co'], minDiameter: { 'HSS-Co': 0.5, 'MD': 2.0 }, maxDiameter: { 'HSS-Co': 25.0, 'MD': 20.0 }, defaultZ: null, defaults: { L: 50 }, extraFields: ['pointAngle'] },
  { id: 'broca-udrill', family: 'furar', geometryType: 'udrill', name: 'U-Drill', substrates: ['MD'], minDiameter: 12.0, maxDiameter: 60.0, defaultZ: null, defaults: { L: 50 }, extraFields: ['fn'] },
  { id: 'broca-centro', family: 'furar', geometryType: 'centro', name: 'Centro/Spot', substrates: ['MD', 'HSS-Co'], minDiameter: { 'HSS-Co': 1.0, 'MD': 2.0 }, maxDiameter: 16.0, defaultZ: null, defaults: {}, extraFields: ['pointAngle'] },
  { id: 'escareador', family: 'furar', geometryType: 'escareador', name: 'Escareador', substrates: ['MD', 'HSS-Co'], minDiameter: 4.0, maxDiameter: 40.0, defaultZ: null, defaults: {}, extraFields: [] }, // D = maior
  { id: 'alargador', family: 'furar', geometryType: 'alargador', name: 'Alargador', substrates: ['MD', 'HSS-Co'], minDiameter: 2.0, maxDiameter: 40.0, defaultZ: null, defaults: { L: 40 }, extraFields: [] },
  
  // ROSCAR
  { id: 'macho-corte', family: 'roscar', geometryType: 'macho-corte', name: 'Macho de Corte', substrates: ['MD', 'HSS-Co'], minDiameter: null, maxDiameter: null, defaultZ: null, defaults: {}, extraFields: ['designation', 'pitch', 'threadLength', 'holeSize'] },
  { id: 'macho-conformacao', family: 'roscar', geometryType: 'macho-conformacao', name: 'Macho de Conformação', substrates: ['MD', 'HSS-Co'], minDiameter: null, maxDiameter: null, defaultZ: null, defaults: {}, extraFields: ['designation', 'pitch', 'threadLength', 'holeSize'] },
  { id: 'fresa-rosca', family: 'roscar', geometryType: 'fresa-rosca', name: 'Fresa de Rosca', substrates: ['MD'], minDiameter: null, maxDiameter: null, defaultZ: 3, defaults: {}, extraFields: ['designation', 'pitch', 'toolDiameter'] },
  
  // MANDRILAR
  { id: 'barra-mandrilar', family: 'mandrilar', geometryType: 'barra-mandrilar', name: 'Barra/Cabeçote', substrates: ['MD'], minDiameter: null, maxDiameter: null, defaultZ: null, defaults: {}, extraFields: ['initialD', 'finalD', 're', 'fn'] }
];

export function getToolGeometry(id: string): ToolGeometry | undefined {
  return FACTORY_TOOLS.find(t => t.id === id);
}

export function getDiameterLimits(tool: ToolGeometry, substrate: Substrate): { min: number | null, max: number | null } {
  let min = null;
  let max = null;
  
  if (tool.minDiameter !== null) {
    min = typeof tool.minDiameter === 'number' ? tool.minDiameter : tool.minDiameter[substrate] ?? null;
  }
  
  if (tool.maxDiameter !== null) {
    max = typeof tool.maxDiameter === 'number' ? tool.maxDiameter : tool.maxDiameter[substrate] ?? null;
  }
  
  return { min, max };
}

export interface StartingParameters {
  vc?: number;
  fn?: number;
  fz?: number;
  ap?: number;
  ae?: number;
  pointAngle?: number;
  r?: number;
  pitch?: number;
  rEpsilon?: number;
  dInitial?: number;
  dFinal?: number;
}

export function interpolateFzByDiameter(d: number): number {
  if (!d || d <= 0) return 0.060;
  const points = [
    { d: 2, fz: 0.015 },
    { d: 4, fz: 0.030 },
    { d: 6, fz: 0.045 },
    { d: 8, fz: 0.055 },
    { d: 10, fz: 0.060 },
    { d: 12, fz: 0.075 },
    { d: 16, fz: 0.090 },
    { d: 20, fz: 0.110 },
    { d: 25, fz: 0.130 },
    { d: 32, fz: 0.150 },
  ];
  const first = points[0]!;
  const last = points[points.length - 1]!;
  if (d <= first.d) return first.fz;
  if (d >= last.d) return last.fz;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]!;
    const p1 = points[i + 1]!;
    if (d >= p0.d && d <= p1.d) {
      const t = (d - p0.d) / (p1.d - p0.d);
      return Number((p0.fz + t * (p1.fz - p0.fz)).toFixed(3));
    }
  }
  return 0.060;
}

export function getStartingParameters(
  family: Family,
  tool: ToolGeometry | null,
  material: Material | null,
  substrate: Substrate = 'MD',
  currentD?: number
): StartingParameters {
  const isHSS = substrate === 'HSS-Co';
  const res: StartingParameters = {};

  if (!material && !tool) return res;

  if (family === 'fresar') {
    if (material) {
      res.vc = isHSS ? Math.round(material.vcReference * 0.22) : material.vcReference;
    }
    if (tool) {
      if (tool.defaults.ap !== undefined) res.ap = tool.defaults.ap;
      if (tool.defaults.aeMultiplier && currentD) {
        res.ae = Number((tool.defaults.aeMultiplier * currentD).toFixed(2));
      } else if (tool.defaults.aeFixed !== undefined) {
        res.ae = tool.defaults.aeFixed;
      }
      if (tool.geometryType === 'toroidal') {
        res.r = 1.0;
      }
      res.fz = interpolateFzByDiameter(currentD || 10);
    }
  } else if (family === 'furar') {
    if (material) {
      if (isHSS) {
        res.vc = (material.id === '1045' || material.name.includes('1045')) ? 16 : Math.round(material.vcReference * 0.22);
      } else {
        res.vc = Math.round(material.vcReference * 0.55);
      }
    }
    if (tool) {
      res.fn = 0.10;
      res.pointAngle = isHSS ? 118 : 140;
    }
  } else if (family === 'roscar') {
    if (material) {
      if (tool && tool.geometryType === 'macho-conformacao') {
        res.vc = (material.id === '1045' || material.name.includes('1045')) ? 45 : Math.round(material.vcReference * 0.32);
      } else if (tool && tool.geometryType === 'fresa-rosca') {
        res.vc = material.vcReference;
      } else {
        res.vc = (material.id === '1045' || material.name.includes('1045')) ? 14 : Math.round(material.vcReference * 0.10);
      }
    }
    res.pitch = 1.25;
  } else if (family === 'mandrilar') {
    if (material) {
      res.vc = material.vcReference;
    }
    res.fn = 0.08;
    res.rEpsilon = 0.4;
  }

  return res;
}
