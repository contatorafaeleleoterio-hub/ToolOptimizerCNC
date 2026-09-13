import React, { createContext, useContext, useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type {
  Family,
  Material,
  MillingResult,
  DrillingResult,
  ThreadingResult,
  BoringResult,
  MillingGeometry,
  DrillSubstrate,
  ToolInstance,
} from '../../core/types.js';
import { FACTORY_MATERIALS } from '../../core/materials.js';
import { FACTORY_TOOLS, type ToolGeometry, type Substrate, getStartingParameters } from '../../core/tools.js';
import { calculateMilling, calculateDrilling, calculateThreading, calculateBoring } from '../../core/calculator.js';
import { steppedValue, deduceFz } from '../../core/adjust.js';
import { applySafetyMargin } from '../../core/display.js';
import { getAllMaterials, getConfig, getAllTools } from '../../core/storage.js';

export type InputValue = number | string | undefined;

export interface CalculatorState {
  activeFamily: Family;
  materials: readonly Material[];
  selectedMaterial: Material | null;
  selectedTool: ToolGeometry | null;
  selectedSubstrate: Substrate;
  workshopTools: ToolInstance[];
  selectedWorkshopToolId: string | null;
  isCalculated: boolean;
  canCalculate: boolean;
  currentInputs: Record<string, InputValue>;
  millingResult: MillingResult | null;
  drillingResult: DrillingResult | null;
  threadingResult: ThreadingResult | null;
  boringResult: BoringResult | null;
  activeResult: MillingResult | DrillingResult | ThreadingResult | BoringResult | null;
  sOffsetPercent: number;
  fOffsetPercent: number;
  safetyMargin: number; // Padrão 100%
  manuallyEdited: Record<string, boolean>;

  // Ações
  setActiveFamily: (family: Family) => void;
  selectMaterial: (materialId: string | null) => void;
  selectTool: (toolId: string | null) => void;
  selectWorkshopTool: (toolId: string | null) => void;
  refreshWorkshopTools: () => Promise<void>;
  setSubstrate: (substrate: Substrate) => void;
  updateField: (field: string, value: InputValue) => void;
  calculate: () => void;
  adjustRPM: (deltaPercent: number) => void;
  adjustFeed: (deltaPercent: number) => void;
  resetAdjustments: () => void;
  resetToDefaults: () => void;
  setSafetyMargin: (margin: number) => void;
  refreshMaterials: () => Promise<void>;
}

const CalculatorContext = createContext<CalculatorState | null>(null);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [activeFamily, setActiveFamilyState] = useState<Family>('fresar');
  const [materials, setMaterials] = useState<readonly Material[]>(FACTORY_MATERIALS);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedTool, setSelectedTool] = useState<ToolGeometry | null>(null);
  const [selectedSubstrate, setSelectedSubstrate] = useState<Substrate>('MD');
  const [workshopTools, setWorkshopTools] = useState<ToolInstance[]>([]);
  const [selectedWorkshopToolId, setSelectedWorkshopToolId] = useState<string | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [sSteps, setSSteps] = useState<number>(0);
  const [fSteps, setFSteps] = useState<number>(0);
  const [safetyMargin, setSafetyMargin] = useState<number>(100);

  // Inputs por família
  const [inputsByFamily, setInputsByFamily] = useState<Record<Family, Record<string, InputValue>>>({
    fresar: {},
    furar: {},
    roscar: {},
    mandrilar: {},
  });

  // Rastreio de edições manuais pelo operador (MVP Q1 l. 1797)
  const [manuallyEdited, setManuallyEdited] = useState<Record<string, boolean>>({});
  const manuallyEditedRef = useRef<Record<string, boolean>>({});

  const currentInputs = inputsByFamily[activeFamily];
  const sOffsetPercent = sSteps * 5;
  const fOffsetPercent = fSteps * 5;

  // Carregar materiais persistidos e configurações no boot (UI -> Storage)
  const refreshMaterials = useCallback(async () => {
    try {
      const storedMats = await getAllMaterials();
      if (storedMats && storedMats.length > 0) {
        setMaterials(storedMats);
      }
    } catch {
      // Fallback para FACTORY_MATERIALS mantido
    }
  }, []);

  const refreshWorkshopTools = useCallback(async () => {
    try {
      const storedTools = await getAllTools();
      if (storedTools) {
        setWorkshopTools(storedTools);
      }
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    refreshMaterials();
    refreshWorkshopTools();
    getConfig()
      .then(cfg => {
        if (cfg && typeof cfg.safetyMargin === 'number') {
          setSafetyMargin(cfg.safetyMargin);
        }
      })
      .catch(() => {});
  }, [refreshMaterials, refreshWorkshopTools]);

  // Alternar família
  const setActiveFamily = useCallback((fam: Family) => {
    setActiveFamilyState(fam);
    setIsCalculated(false);
    setSSteps(0);
    setFSteps(0);
  }, []);

  // Obter parâmetros de partida canônicos para a montagem atual
  const startingParams = useMemo(() => {
    const currentD = typeof currentInputs?.D === 'number' ? currentInputs.D : (currentInputs?.D ? parseFloat(String(currentInputs.D)) : undefined);
    return getStartingParameters(activeFamily, selectedTool, selectedMaterial, selectedSubstrate, currentD);
  }, [activeFamily, selectedTool, selectedMaterial, selectedSubstrate, currentInputs?.D]);

  // Selecionar material (respeita valores de partida canônicos por família — Bloqueadores B1 e B2)
  const selectMaterial = useCallback((matId: string | null) => {
    if (!matId) {
      setSelectedMaterial(null);
      setIsCalculated(false);
      return;
    }
    const cleanId = matId.toLowerCase().replace(/^aco-/, '');
    const mat = materials.find((m: Material) => m.id === matId || m.id === cleanId);
    if (mat) {
      setSelectedMaterial(mat);
      const start = getStartingParameters(activeFamily, selectedTool, mat, selectedSubstrate);
      if (!manuallyEditedRef.current['vc'] && start.vc !== undefined) {
        setInputsByFamily(prev => ({
          ...prev,
          [activeFamily]: {
            ...prev[activeFamily],
            vc: start.vc,
          }
        }));
      }
    }
  }, [activeFamily, materials, selectedTool, selectedSubstrate]);

  // Selecionar ferramenta com casamento de ID estrito
  const selectTool = useCallback((toolId: string | null) => {
    if (!toolId) {
      setSelectedTool(null);
      setIsCalculated(false);
      return;
    }
    const normalizedId = toolId.replace(/_/g, '-');
    const tool = FACTORY_TOOLS.find(t => t.id === toolId || t.id === normalizedId);
    if (tool) {
      setSelectedTool(tool);
      const sub = tool.substrates[0] || 'MD';
      setSelectedSubstrate(sub);

      const start = getStartingParameters(activeFamily, tool, selectedMaterial, sub);

      setInputsByFamily(prev => {
        const famInputs = { ...prev[activeFamily] };
        if (tool.defaults.ap && !manuallyEditedRef.current['ap']) famInputs.ap = tool.defaults.ap;
        if (tool.defaults.aeFixed && !manuallyEditedRef.current['ae']) famInputs.ae = tool.defaults.aeFixed;
        if (tool.defaults.L && !manuallyEditedRef.current['L']) famInputs.L = tool.defaults.L;
        if (tool.defaultZ && !manuallyEditedRef.current['Z']) famInputs.Z = tool.defaultZ;

        if (start.fz !== undefined && !manuallyEditedRef.current['fz']) famInputs.fz = start.fz;
        if (start.fn !== undefined && !manuallyEditedRef.current['fn']) famInputs.fn = start.fn;
        if (start.pointAngle !== undefined && !manuallyEditedRef.current['pointAngle']) famInputs.pointAngle = start.pointAngle;
        if (start.pitch !== undefined && !manuallyEditedRef.current['pitch']) famInputs.pitch = start.pitch;
        if (start.r !== undefined && !manuallyEditedRef.current['r']) famInputs.r = start.r;
        if (start.rEpsilon !== undefined && !manuallyEditedRef.current['rEpsilon']) famInputs.rEpsilon = start.rEpsilon;

        if (!manuallyEditedRef.current['vc'] && start.vc !== undefined) {
          famInputs.vc = start.vc;
        }

        return {
          ...prev,
          [activeFamily]: famInputs,
        };
      });
    }
  }, [activeFamily, selectedMaterial]);

  const setSubstrate = useCallback((sub: Substrate) => {
    setSelectedSubstrate(sub);
    const start = getStartingParameters(activeFamily, selectedTool, selectedMaterial, sub);
    if (!manuallyEditedRef.current['vc'] && start.vc !== undefined) {
      setInputsByFamily(prev => ({
        ...prev,
        [activeFamily]: {
          ...prev[activeFamily],
          vc: start.vc,
        }
      }));
    }
  }, [activeFamily, selectedTool, selectedMaterial]);

  const selectWorkshopTool = useCallback((toolId: string | null) => {
    setSelectedWorkshopToolId(toolId);
    if (!toolId) return;
    const toolInst = workshopTools.find(t => t.id === toolId);
    if (!toolInst) return;

    setActiveFamilyState(toolInst.family);
    const geom = FACTORY_TOOLS.find(t => t.id === toolInst.geometryId || t.geometryType === toolInst.geometryType);
    if (geom) {
      setSelectedTool(geom);
    }
    setSelectedSubstrate(toolInst.substrate);

    setInputsByFamily(prev => {
      const famInputs = { ...prev[toolInst.family] };
      famInputs.D = toolInst.D;
      if (toolInst.Z !== undefined) famInputs.Z = toolInst.Z;
      if (toolInst.r !== undefined) famInputs.r = toolInst.r;
      if (toolInst.kappa !== undefined) famInputs.kappa = toolInst.kappa;
      if (toolInst.pointAngle !== undefined) famInputs.pointAngle = toolInst.pointAngle;
      if (toolInst.pitch !== undefined) famInputs.pitch = toolInst.pitch;
      if (toolInst.initialD !== undefined) famInputs.dInitial = toolInst.initialD;
      if (toolInst.finalD !== undefined) famInputs.dFinal = toolInst.finalD;
      if (toolInst.re !== undefined) famInputs.rEpsilon = toolInst.re;
      if (toolInst.fn !== undefined) famInputs.fn = toolInst.fn;
      return {
        ...prev,
        [toolInst.family]: famInputs,
      };
    });
  }, [workshopTools]);

  // Atualizar campo de input
  const updateField = useCallback((field: string, value: InputValue) => {
    manuallyEditedRef.current[field] = true;
    setManuallyEdited(prev => ({ ...prev, [field]: true }));
    setInputsByFamily(prev => ({
      ...prev,
      [activeFamily]: {
        ...prev[activeFamily],
        [field]: value,
      }
    }));
  }, [activeFamily]);

  // Validação dos requisitos mínimos (Cenários B e C)
  const canCalculate = useMemo(() => {
    if (!selectedMaterial || !selectedTool) return false;

    const inp = currentInputs;
    const num = (v: any) => typeof v === 'number' && !isNaN(v) && v > 0;

    if (activeFamily === 'fresar') {
      const baseReqs = num(inp.D) && num(inp.Z) && num(inp.L) && num(inp.ap) && num(inp.ae) && num(inp.vc) && num(inp.fz);
      if (!baseReqs) return false;
      if (selectedTool.geometryType === 'toroidal') {
        return num(inp.r);
      }
      return true;
    }

    if (activeFamily === 'furar') {
      return num(inp.D) && num(inp.L) && num(inp.vc);
    }

    if (activeFamily === 'roscar') {
      return num(inp.D) && num(inp.vc) && (num(inp.pitch) || num(inp.P));
    }

    if (activeFamily === 'mandrilar') {
      // Requer diâmetro inicial e final, ou D e ap (CANONICO_FURACAO §1.11)
      const dOut = Number(inp.dFinal || inp.D);
      const dIn = Number(inp.dInitial || inp.dInicial || (num(dOut) && num(inp.ap) ? dOut - 2 * Number(inp.ap) : undefined));
      return num(dIn) && num(dOut) && dOut > dIn && num(inp.L) && num(inp.vc);
    }

    return false;
  }, [activeFamily, selectedMaterial, selectedTool, currentInputs]);

  // Cálculo nominal síncrono para as 4 famílias via Core (sem invenção, sem duplicação — B3)
  const nominalResults = useMemo(() => {
    if (!canCalculate || !selectedMaterial || !selectedTool) {
      return { milling: null, drilling: null, threading: null, boring: null };
    }

    const inp = currentInputs;
    if (activeFamily === 'fresar') {
      try {
        const geometry: MillingGeometry =
          selectedTool.geometryType === 'toroidal'
            ? 'toroidal'
            : selectedTool.geometryType === 'esferica'
            ? 'esferica'
            : 'topo-reto';

        const millingInput = {
          material: selectedMaterial,
          D: Number(inp.D),
          Z: Number(inp.Z),
          L: Number(inp.L),
          ap: Number(inp.ap),
          ae: Number(inp.ae),
          vc: Number(inp.vc),
          fz: Number(inp.fz),
          geometry,
          ...(geometry === 'toroidal' && inp.r !== undefined ? { r: Number(inp.r) } : {}),
          ...(inp.kappa !== undefined ? { kappa: Number(inp.kappa) } : {}),
        };

        const res = calculateMilling(millingInput);
        return { milling: res, drilling: null, threading: null, boring: null };
      } catch {
        return { milling: null, drilling: null, threading: null, boring: null };
      }
    }

    if (activeFamily === 'furar') {
      try {
        const substrate: DrillSubstrate = selectedSubstrate === 'HSS-Co' ? 'HSS-Co' : 'MD';
        const drillingInput = {
          material: selectedMaterial,
          D: Number(inp.D),
          L: Number(inp.L),
          vc: Number(inp.vc),
          substrate,
          vcStart: startingParams.vc, // Reativa Gatilho 4 de janela segura
          ...(inp.fn !== undefined ? { fn: Number(inp.fn) } : {}),
          ...(inp.pointAngle !== undefined ? { pointAngle: Number(inp.pointAngle) } : {}),
        };
        const res = calculateDrilling(drillingInput);
        return { milling: null, drilling: res, threading: null, boring: null };
      } catch {
        return { milling: null, drilling: null, threading: null, boring: null };
      }
    }

    if (activeFamily === 'roscar') {
      try {
        const toolType: 'macho-corte' | 'macho-conformacao' | 'fresa-rosca' =
          selectedTool.geometryType === 'macho-conformacao'
            ? 'macho-conformacao'
            : selectedTool.geometryType === 'fresa-rosca'
            ? 'fresa-rosca'
            : 'macho-corte';

        const threadingInput = {
          material: selectedMaterial,
          D: Number(inp.D),
          pitch: Number(inp.pitch || inp.P || 1.25),
          vc: Number(inp.vc),
          L: Number(inp.L || 30),
          toolType,
          vcStart: startingParams.vc,
        };

        const res = calculateThreading(threadingInput);
        return { milling: null, drilling: null, threading: res, boring: null };
      } catch {
        return { milling: null, drilling: null, threading: null, boring: null };
      }
    }

    if (activeFamily === 'mandrilar') {
      try {
        const dFinal = Number(inp.dFinal || inp.D || 20);
        const dInitial = Number(inp.dInitial || inp.dInicial || (inp.ap ? dFinal - 2 * Number(inp.ap) : dFinal - 2));
        const boringInput = {
          material: selectedMaterial,
          dInitial,
          dFinal,
          L: Number(inp.L || 60),
          vc: Number(inp.vc),
          fn: Number(inp.fn || 0.08),
          rEpsilon: Number(inp.rEpsilon || 0.4),
          vcStart: startingParams.vc,
        };

        const res = calculateBoring(boringInput);
        return { milling: null, drilling: null, threading: null, boring: res };
      } catch {
        return { milling: null, drilling: null, threading: null, boring: null };
      }
    }

    return { milling: null, drilling: null, threading: null, boring: null };
  }, [canCalculate, activeFamily, selectedMaterial, selectedTool, selectedSubstrate, currentInputs, startingParams]);

  // Cálculo com ajustes finos táteis de S e F (D7) e margem de segurança
  const calculatedResults = useMemo(() => {
    const { milling: nomMilling, drilling: nomDrilling, threading: nomThreading, boring: nomBoring } = nominalResults;

    if (!isCalculated || (!nomMilling && !nomDrilling && !nomThreading && !nomBoring)) {
      return { milling: null, drilling: null, threading: null, boring: null, active: null };
    }

    let milling = nomMilling;
    let drilling = nomDrilling;
    let threading = nomThreading;
    let boring = nomBoring;

    // Ajuste de rotação / avanço em fresamento (conservação estrita de torque nominal)
    if (milling && (sSteps !== 0 || fSteps !== 0) && selectedMaterial && selectedTool) {
      const inp = currentInputs;
      const geometry: MillingGeometry =
        selectedTool.geometryType === 'toroidal'
          ? 'toroidal'
          : selectedTool.geometryType === 'esferica'
          ? 'esferica'
          : 'topo-reto';

      let targetN = milling.n;
      if (sSteps !== 0) {
        targetN = steppedValue(milling.n, sSteps);
      }

      let targetFz = Number(inp.fz);
      if (fSteps !== 0) {
        const targetVf = steppedValue(milling.vf, fSteps);
        targetFz = deduceFz(targetVf, Number(inp.Z), targetN);
      }

      const adjustedInput = {
        material: selectedMaterial,
        D: Number(inp.D),
        Z: Number(inp.Z),
        L: Number(inp.L),
        ap: Number(inp.ap),
        ae: Number(inp.ae),
        vc: Number(inp.vc),
        fz: targetFz,
        geometry,
        ...(geometry === 'toroidal' && inp.r !== undefined ? { r: Number(inp.r) } : {}),
        ...(inp.kappa !== undefined ? { kappa: Number(inp.kappa) } : {}),
        ...(sSteps !== 0 ? { nOverride: targetN } : {}),
      };

      try {
        milling = calculateMilling(adjustedInput);
      } catch {
        // mantém
      }
    }

    // Ajuste em furação
    if (drilling && (sSteps !== 0 || fSteps !== 0)) {
      let targetN = drilling.n;
      if (sSteps !== 0) targetN = steppedValue(drilling.n, sSteps);
      let targetVf = drilling.vf;
      if (fSteps !== 0) targetVf = steppedValue(drilling.vf, fSteps);
      else if (sSteps !== 0) targetVf = targetN * drilling.fn;

      const Pc = (drilling.kc * drilling.fn * Number(currentInputs.D || 10) * ((Math.PI * Number(currentInputs.D || 10) * targetN) / 1000)) / 240000;
      drilling = {
        ...drilling,
        n: targetN,
        vf: targetVf,
        vcReal: (Math.PI * Number(currentInputs.D || 10) * targetN) / 1000,
        Pc,
        Mc: targetN > 0 ? (Pc * 9549) / targetN : 0,
      };
    }

    // Ajuste em roscamento (F rigidamente travado no passo: vf = n * P, sem ajuste em F — D7)
    if (threading && sSteps !== 0) {
      const targetN = steppedValue(threading.n, sSteps);
      const targetVf = targetN * threading.pitch;
      const vcReal = (Math.PI * Number(currentInputs.D || 8) * targetN) / 1000;
      const Pc = (threading.kc * threading.pitch * Number(currentInputs.D || 8) * vcReal) / 240000;
      threading = {
        ...threading,
        n: targetN,
        vf: targetVf,
        vcReal,
        Pc,
        Mc: targetN > 0 ? (Pc * 9549) / targetN : 0,
      };
    }

    // Ajuste em mandrilamento
    if (boring && (sSteps !== 0 || fSteps !== 0)) {
      let targetN = boring.n;
      if (sSteps !== 0) targetN = steppedValue(boring.n, sSteps);
      let targetVf = boring.vf;
      if (fSteps !== 0) targetVf = steppedValue(boring.vf, fSteps);
      else if (sSteps !== 0) targetVf = targetN * boring.fn;

      const vcReal = (Math.PI * boring.Dc * targetN) / 1000;
      const Q = (Math.PI * (Number(currentInputs.dFinal || 20) ** 2 - Number(currentInputs.dInitial || 18) ** 2) * boring.fn * targetN) / 4000;
      const Pc = (Q * boring.kc * (1 - boring.ap / boring.Dc)) / 60000;
      boring = {
        ...boring,
        n: targetN,
        vf: targetVf,
        vcReal,
        Q,
        Pc,
        Mc: targetN > 0 ? (Pc * 9549) / targetN : 0,
      };
    }

    // Aplicação da Lente de Margem de Segurança Global (MVP §4.9)
    if (milling && safetyMargin !== 100) milling = applySafetyMargin(milling, safetyMargin);
    if (drilling && safetyMargin !== 100) drilling = applySafetyMargin(drilling, safetyMargin);
    if (threading && safetyMargin !== 100) threading = applySafetyMargin(threading, safetyMargin);
    if (boring && safetyMargin !== 100) boring = applySafetyMargin(boring, safetyMargin);

    const active =
      activeFamily === 'fresar'
        ? milling
        : activeFamily === 'furar'
        ? drilling
        : activeFamily === 'roscar'
        ? threading
        : boring;

    // Compatibilidade reversa: drillingResult também expõe threading ou boring quando selecionados
    const compatDrilling = drilling || (threading as any) || (boring as any);

    return { milling, drilling: compatDrilling, threading, boring, active };
  }, [isCalculated, nominalResults, activeFamily, sSteps, fSteps, safetyMargin, selectedMaterial, selectedTool, currentInputs]);

  // Disparo explícito de calcular
  const calculate = useCallback(() => {
    setIsCalculated(true);
  }, []);

  const adjustRPM = useCallback((deltaPercent: number) => {
    const steps = Math.round(deltaPercent / 5);
    setSSteps(prev => prev + steps);
  }, []);

  const adjustFeed = useCallback((deltaPercent: number) => {
    const steps = Math.round(deltaPercent / 5);
    setFSteps(prev => prev + steps);
  }, []);

  const resetAdjustments = useCallback(() => {
    setSSteps(0);
    setFSteps(0);
  }, []);

  const resetToDefaults = useCallback(() => {
    setManuallyEdited({});
    manuallyEditedRef.current = {};
    resetAdjustments();
    if (selectedTool) {
      selectTool(selectedTool.id);
    }
  }, [selectedTool, selectTool, resetAdjustments]);

  const value: CalculatorState = {
    activeFamily,
    materials,
    selectedMaterial,
    selectedTool,
    selectedSubstrate,
    workshopTools,
    selectedWorkshopToolId,
    isCalculated,
    canCalculate,
    currentInputs,
    millingResult: calculatedResults.milling,
    drillingResult: calculatedResults.drilling,
    threadingResult: calculatedResults.threading,
    boringResult: calculatedResults.boring,
    activeResult: calculatedResults.active,
    sOffsetPercent,
    fOffsetPercent,
    safetyMargin,
    manuallyEdited,
    setActiveFamily,
    selectMaterial,
    selectTool,
    selectWorkshopTool,
    refreshWorkshopTools,
    setSubstrate,
    updateField,
    calculate,
    adjustRPM,
    adjustFeed,
    resetAdjustments,
    resetToDefaults,
    setSafetyMargin,
    refreshMaterials,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator(): CalculatorState {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator deve ser usado dentro de um CalculatorProvider');
  }
  return context;
}
