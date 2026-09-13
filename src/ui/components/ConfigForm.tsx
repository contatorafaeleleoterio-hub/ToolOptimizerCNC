import React, { useState } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import { FACTORY_TOOLS, type Substrate } from '../../core/tools.js';

interface StepperInputProps {
  id: string;
  label: string;
  sym?: string;
  unit?: string;
  value: number | string | undefined;
  step?: number;
  min?: number;
  decimals?: number;
  placeholder?: string;
  onChange: (val: number | undefined) => void;
}

function StepperInput({
  id,
  label,
  sym,
  unit,
  value,
  step = 1,
  min = 0,
  decimals = 0,
  placeholder,
  onChange,
}: StepperInputProps) {
  const numVal = typeof value === 'number' ? value : value ? parseFloat(String(value)) : undefined;

  const handleStep = (direction: number) => {
    const current = numVal ?? 0;
    let next = current + direction * step;
    if (min !== undefined && next < min) next = min;
    if (decimals > 0) {
      next = parseFloat(next.toFixed(decimals));
    }
    onChange(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === '') {
      onChange(undefined);
    } else {
      const parsed = parseFloat(v.replace(',', '.'));
      onChange(isNaN(parsed) ? undefined : parsed);
    }
  };

  const displayVal = numVal !== undefined
    ? (decimals > 0 ? numVal.toFixed(decimals) : String(numVal))
    : (value ?? '');

  return (
    <div className="field">
      <label className="lbl" htmlFor={id}>
        {label} {sym && <span className="sym">({sym})</span>}
      </label>
      <div className="sctl">
        <button
          type="button"
          className="step"
          onClick={() => handleStep(-1)}
          aria-label={`Diminuir passo (${sym || id})`}
        >
          −
        </button>
        <div className="fbox">
          <input
            className="fin num"
            id={id}
            type="text"
            inputMode="decimal"
            placeholder={placeholder}
            value={displayVal}
            onChange={handleChange}
          />
          {unit && <span className="funit">{unit}</span>}
        </div>
        <button
          type="button"
          className="step"
          onClick={() => handleStep(1)}
          aria-label={`Aumentar passo (${sym || id})`}
        >
          +
        </button>
      </div>
    </div>
  );
}

interface D11DrawerProps {
  id: string;
  title: string;
  oQueE: string;
  aumentar: string;
  diminuir: string;
  equilibrio?: string;
}

function D11Drawer({ id, title, oQueE, aumentar, diminuir, equilibrio }: D11DrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="drawer" style={{ marginTop: '4px' }}>
      <button
        type="button"
        className="dtrigger"
        id={`trig-${id}`}
        aria-expanded={open}
        aria-controls={`panel-${id}`}
        onClick={() => setOpen(!open)}
      >
        <svg
          className="chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s ease' }}
        >
          <path d="M6 3.5 L11 8 L6 12.5" />
        </svg>
        <span className="dhint">o que {title} faz</span>
      </button>
      {open && (
        <div id={`panel-${id}`} className="dbody" style={{ gap: '8px' }}>
          <span className="lbl">O que é</span>
          <span className="prose">{oQueE}</span>
          <span className="lbl">▲ aumentar</span>
          <span className="prose">{aumentar}</span>
          <span className="lbl">▼ diminuir</span>
          <span className="prose">{diminuir}</span>
          {equilibrio && (
            <>
              <span className="lbl">Equilíbrio</span>
              <span className="prose">{equilibrio}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function ConfigForm() {
  const {
    activeFamily,
    materials,
    selectedMaterial,
    selectedTool,
    selectedSubstrate,
    workshopTools,
    selectedWorkshopToolId,
    selectWorkshopTool,
    canCalculate,
    isCalculated,
    currentInputs,
    selectMaterial,
    selectTool,
    setSubstrate,
    updateField,
    calculate,
    resetToDefaults,
  } = useCalculator();

  const [matOpen, setMatOpen] = useState(true);
  const [toolOpen, setToolOpen] = useState(true);
  const [tuneOpen, setTuneOpen] = useState(true);

  const inp = currentInputs;
  const availableTools = FACTORY_TOOLS.filter(t => t.family === activeFamily);
  const familyWorkshopTools = (workshopTools || []).filter(t => t.family === activeFamily);

  const pede = (campo: string) => selectedTool?.extraFields?.includes(campo) ?? false;

  // Cálculos derivados visuais
  const dInitial = typeof inp.dInitial === 'number' ? inp.dInitial : parseFloat(String(inp.dInitial || 0));
  const dFinal = typeof inp.dFinal === 'number' ? inp.dFinal : parseFloat(String(inp.dFinal || 0));
  const apDerivadoMandrilar = dFinal > dInitial && dInitial > 0 ? ((dFinal - dInitial) / 2).toFixed(1) : '—';

  return (
    <div className="col-config-inner" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* BLOCO 1: MATERIAL A SER USINADO */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          type="button"
          className="bhead"
          id="bhead-material"
          aria-expanded={matOpen}
          aria-controls="b-material-panel"
          onClick={() => setMatOpen(!matOpen)}
        >
          <svg
            className="chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            style={{ color: 'var(--tx-3)', transform: matOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s ease' }}
          >
            <path d="M6 3.5 L11 8 L6 12.5" />
          </svg>
          <span className="lbl" style={{ flexGrow: 1 }}>MATERIAL A SER USINADO</span>
          <span className="bsum">
            {selectedMaterial
              ? `${selectedMaterial.name} · classe ${selectedMaterial.isoClass}`
              : 'Nenhum material selecionado'}
          </span>
        </button>

        {matOpen && (
          <div id="b-material-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <hr className="sep" />
            <div className="selbox">
              <select
                className="fsel"
                id="select-material"
                aria-label="Material a usinar / Material a ser usinado"
                value={selectedMaterial?.id || ''}
                onChange={(e) => selectMaterial(e.target.value || null)}
              >
                <option value="">Selecione um material...</option>
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} (Classe {m.isoClass}) {m.isCustom ? '· Custom' : ''}
                  </option>
                ))}
              </select>
              <svg className="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3.5 6 L8 11 L12.5 6" />
              </svg>
            </div>

            <div className="lbl">DADOS DO MATERIAL</div>
            <div className="mgrid">
              <div className="field">
                <span className="lbl">Classe ISO</span>
                <span className="mval">{selectedMaterial ? selectedMaterial.isoClass : '—'}</span>
              </div>
              <div className="field">
                <span className="lbl">Dureza</span>
                <span className="mval">
                  {selectedMaterial
                    ? (selectedMaterial.id.includes('hrc') || selectedMaterial.id.includes('cementado') || selectedMaterial.isoClass === 'H' ? '58–62 HRC' : '170–220 HB')
                    : '—'}
                </span>
              </div>
              <div className="field">
                <span className="lbl">Força específica (<span className="sym">kc1.1</span>)</span>
                <span className="mval">
                  {selectedMaterial ? `${selectedMaterial.kc1_1} N/mm²` : '—'}
                </span>
              </div>
              <div className="field">
                <span className="lbl">Expoente (<span className="sym">mc</span>)</span>
                <span className="mval">{selectedMaterial ? selectedMaterial.mc : '—'}</span>
              </div>
              <div className="field" style={{ gridColumn: 'span 2' }}>
                <span className="lbl">Velocidade de corte de partida (<span className="sym">vc</span>)</span>
                <span className="mval">
                  {selectedMaterial
                    ? activeFamily === 'furar'
                      ? '16 m/min (broca HSS)'
                      : activeFamily === 'roscar'
                      ? '14 m/min (macho corte)'
                      : `${selectedMaterial.vcReference} m/min`
                    : '—'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BLOCO 2: FERRAMENTA A SER USADA */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          type="button"
          className="bhead"
          id="bhead-ferramenta"
          aria-expanded={toolOpen}
          aria-controls="b-tool-panel"
          onClick={() => setToolOpen(!toolOpen)}
        >
          <svg
            className="chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            style={{ color: 'var(--tx-3)', transform: toolOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s ease' }}
          >
            <path d="M6 3.5 L11 8 L6 12.5" />
          </svg>
          <span className="lbl" style={{ flexGrow: 1 }}>FERRAMENTA A SER USADA</span>
          <span className="bsum">
            {selectedTool ? `${selectedTool.name} · ${selectedSubstrate}` : 'Nenhuma ferramenta selecionada'}
          </span>
        </button>

        {toolOpen && (
          <div id="b-tool-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <hr className="sep" />
            <div className="selbox">
              <select
                className="fsel"
                id="select-tool"
                aria-label="Ferramenta a ser usada"
                value={selectedWorkshopToolId ? `ws-${selectedWorkshopToolId}` : (selectedTool?.id || '')}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.startsWith('ws-')) {
                    selectWorkshopTool(val.replace('ws-', ''));
                  } else {
                    selectWorkshopTool(null);
                    selectTool(val || null);
                  }
                }}
              >
                <option value="">Selecione uma ferramenta...</option>
                {familyWorkshopTools.length > 0 && (
                  <optgroup label="Minhas Ferramentas (Oficina)">
                    {familyWorkshopTools.map((wt) => (
                      <option key={wt.id} value={`ws-${wt.id}`}>
                        {wt.name} (Ø{wt.D} mm · {wt.substrate})
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="Geometrias do Sistema">
                  {availableTools.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.substrates.join(', ')})
                    </option>
                  ))}
                </optgroup>
              </select>
              <svg className="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3.5 6 L8 11 L12.5 6" />
              </svg>
            </div>

            {selectedTool && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--surface-card-subtle)', borderRadius: '4px' }}>
                <span className="lbl">Substrato ativo:</span>
                {selectedTool.substrates.length > 1 ? (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {selectedTool.substrates.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`chip ${selectedSubstrate === s ? 'chip-active' : ''}`}
                        onClick={() => setSubstrate(s as Substrate)}
                        style={{ cursor: 'pointer', padding: '2px 8px', fontSize: '11px' }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <strong>{selectedSubstrate}</strong>
                )}
              </div>
            )}

            <div className="lbl">VARIÁVEIS DA GEOMETRIA DESTA MONTAGEM</div>
            <div className="vgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {activeFamily === 'fresar' && (
                <>
                  <StepperInput
                    id="input-d"
                    label="Diâmetro nominal"
                    sym="D"
                    unit="mm"
                    value={inp.D}
                    step={1}
                    placeholder="Ex: 10"
                    onChange={(v) => updateField('D', v)}
                  />
                  {pede('r') && (
                    <StepperInput
                      id="input-r"
                      label="Raio de canto (r)"
                      sym="r"
                      unit="mm"
                      value={inp.r}
                      step={0.5}
                      decimals={1}
                      placeholder="Ex: 1.0"
                      onChange={(v) => updateField('r', v)}
                    />
                  )}
                  {pede('kappa') && (
                    <StepperInput
                      id="input-kappa"
                      label="Ângulo de posição (κ)"
                      sym="kappa"
                      unit="graus"
                      value={inp.kappa}
                      step={5}
                      placeholder="Ex: 15"
                      onChange={(v) => updateField('kappa', v)}
                    />
                  )}
                  {pede('Dmin') && (
                    <StepperInput
                      id="input-dmin"
                      label="Diâmetro menor (Dmin)"
                      sym="Dmin"
                      unit="mm"
                      value={inp.Dmin}
                      step={1}
                      placeholder="Ex: 2"
                      onChange={(v) => updateField('Dmin', v)}
                    />
                  )}
                  <StepperInput
                    id="input-z"
                    label="Número de arestas (Z)"
                    sym="Z"
                    unit="dentes"
                    value={inp.Z}
                    step={1}
                    min={1}
                    placeholder="Ex: 4"
                    onChange={(v) => updateField('Z', v)}
                  />
                  <StepperInput
                    id="input-l"
                    label="Balanço (L)"
                    sym="L"
                    unit="mm"
                    value={inp.L}
                    step={5}
                    placeholder="Ex: 35"
                    onChange={(v) => updateField('L', v)}
                  />
                </>
              )}

              {activeFamily === 'furar' && (
                <>
                  <StepperInput
                    id="input-d"
                    label="Diâmetro da broca (D)"
                    sym="D"
                    unit="mm"
                    value={inp.D}
                    step={1}
                    placeholder="Ex: 10"
                    onChange={(v) => updateField('D', v)}
                  />
                  <StepperInput
                    id="input-pointAngle"
                    label="Ângulo de ponta (σ)"
                    sym="sigma"
                    unit="°"
                    value={inp.pointAngle}
                    step={5}
                    placeholder="Ex: 118"
                    onChange={(v) => updateField('pointAngle', v)}
                  />
                  <StepperInput
                    id="input-l"
                    label="Balanço (L)"
                    sym="L"
                    unit="mm"
                    value={inp.L}
                    step={5}
                    placeholder="Ex: 50"
                    onChange={(v) => updateField('L', v)}
                  />
                </>
              )}

              {activeFamily === 'roscar' && (
                <>
                  <StepperInput
                    id="input-d"
                    label="Diâmetro nominal (D)"
                    sym="D"
                    unit="mm"
                    value={inp.D}
                    step={1}
                    placeholder="Ex: 8"
                    onChange={(v) => updateField('D', v)}
                  />
                  <StepperInput
                    id="input-pitch"
                    label="Passo da rosca (P)"
                    sym="P"
                    unit="mm"
                    value={inp.pitch}
                    step={0.25}
                    decimals={2}
                    placeholder="Ex: 1.25"
                    onChange={(v) => updateField('pitch', v)}
                  />
                  <StepperInput
                    id="input-l"
                    label="Balanço (L)"
                    sym="L"
                    unit="mm"
                    value={inp.L}
                    step={5}
                    placeholder="Ex: 30"
                    onChange={(v) => updateField('L', v)}
                  />
                </>
              )}

              {activeFamily === 'mandrilar' && (
                <>
                  <StepperInput
                    id="input-dInitial"
                    label="Diâmetro inicial (Di)"
                    sym="Di"
                    unit="mm"
                    value={inp.dInitial}
                    step={1}
                    placeholder="Ex: 18"
                    onChange={(v) => updateField('dInitial', v)}
                  />
                  <StepperInput
                    id="input-dFinal"
                    label="Diâmetro final (Df)"
                    sym="Df"
                    unit="mm"
                    value={inp.dFinal}
                    step={1}
                    placeholder="Ex: 20"
                    onChange={(v) => updateField('dFinal', v)}
                  />
                  <div className="field">
                    <span className="lbl">Profundidade calculada (ap)</span>
                    <div style={{ height: '44px', display: 'flex', alignItems: 'center', padding: '0 12px', background: 'var(--surface-input-muted)', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
                      <span className="num" style={{ fontWeight: 600 }}>{apDerivadoMandrilar}</span>
                      <span className="funit" style={{ marginLeft: '4px' }}>mm</span>
                    </div>
                  </div>
                  <StepperInput
                    id="input-re"
                    label="Raio de ponta (rε)"
                    sym="re"
                    unit="mm"
                    value={inp.rEpsilon}
                    step={0.2}
                    decimals={1}
                    placeholder="Ex: 0.4"
                    onChange={(v) => updateField('rEpsilon', v)}
                  />
                  <StepperInput
                    id="input-l"
                    label="Balanço da barra (L)"
                    sym="L"
                    unit="mm"
                    value={inp.L}
                    step={5}
                    placeholder="Ex: 60"
                    onChange={(v) => updateField('L', v)}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* BLOCO 3: PARÂMETROS DE CORTE E AVANÇO */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button
          type="button"
          className="bhead"
          id="bhead-ajuste"
          aria-expanded={tuneOpen}
          aria-controls="b-tune-panel"
          onClick={() => setTuneOpen(!tuneOpen)}
        >
          <svg
            className="chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            style={{ color: 'var(--tx-3)', transform: tuneOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s ease' }}
          >
            <path d="M6 3.5 L11 8 L6 12.5" />
          </svg>
          <span className="lbl" style={{ flexGrow: 1 }}>PARÂMETROS DE CORTE E AVANÇO</span>
          <span className="bsum">
            vc {inp.vc ?? '—'}
            {inp.fz !== undefined && ` · fz ${inp.fz}`}
            {inp.fn !== undefined && ` · fn ${inp.fn}`}
            {inp.ap !== undefined && ` · ap ${inp.ap}`}
          </span>
        </button>

        {tuneOpen && (
          <div id="b-tune-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <hr className="sep" />

            {/* FRESAR: ap, ae, vc, fz */}
            {activeFamily === 'fresar' && (
              <>
                <div>
                  <StepperInput
                    id="input-ap"
                    label="Profundidade de corte (ap)"
                    sym="ap"
                    unit="mm"
                    value={inp.ap}
                    step={0.5}
                    decimals={1}
                    placeholder="Ex: 2.0"
                    onChange={(v) => updateField('ap', v)}
                  />
                  <D11Drawer
                    id="d-ap"
                    title="a profundidade de corte"
                    oQueE="Fatia axial de altura que cada passe remove do bloco bruto."
                    aumentar="Mais material por passe · esforço axial elevado · deflexão multiplicada no balanço longo."
                    diminuir="Menos força na haste · corte suave e silencioso · exige mais passes em Z para atingir a cota."
                    equilibrio="Deve respeitar o comprimento de corte útil (Lc) para não esfregar haste sem corte na peça."
                  />
                </div>

                <div>
                  <StepperInput
                    id="input-ae"
                    label="Penetração"
                    sym="ae"
                    unit="mm"
                    value={inp.ae}
                    step={0.5}
                    decimals={1}
                    placeholder="Ex: 2.5"
                    onChange={(v) => updateField('ae', v)}
                  />
                  <D11Drawer
                    id="d-ae"
                    title="a penetração de trabalho"
                    oQueE="Largura do corte na lateral da ferramenta · define quanto da periferia corta por passe."
                    aumentar="Mais volume de cavaco · maior carga de deflexão · calor concentrado se ultrapassar 50% de D."
                    diminuir="Carga lateral menor · afinamento de cavaco · necessita de maior avanço (fz) para manter espessura de corte."
                    equilibrio="Pouca penetração é estratégia de alta velocidade (HSM), não defeito · o painel calcula o afinamento (CTF)."
                  />
                </div>

                <div>
                  <StepperInput
                    id="input-vc"
                    label="Velocidade de corte (vc)"
                    sym="vc"
                    unit="m/min"
                    value={inp.vc}
                    step={5}
                    placeholder="Ex: 140"
                    onChange={(v) => updateField('vc', v)}
                  />
                  <D11Drawer
                    id="d-vc"
                    title="a velocidade de corte"
                    oQueE="Velocidade do gume passando pelo material · manda no calor do corte."
                    aumentar="Esquenta mais · gume gasta mais rápido · menos vida útil da ferramenta."
                    diminuir="Gume dura mais · risco de aresta postiça (material gruda no gume) · acabamento superficial pior."
                    equilibrio="Cada material tem seu valor de partida canônico — o painel avisa se você se afastar da faixa."
                  />
                </div>

                <div>
                  <StepperInput
                    id="input-fz"
                    label="Avanço por dente (fz)"
                    sym="fz"
                    unit="mm/dente"
                    value={inp.fz}
                    step={0.005}
                    decimals={3}
                    placeholder="Ex: 0.060"
                    onChange={(v) => updateField('fz', v)}
                  />
                  <D11Drawer
                    id="d-fz"
                    title="o avanço por dente"
                    oQueE="Espessura do cavaco que cada aresta retira a cada rotação."
                    aumentar="Remove material mais rápido · eleva o esforço e potência de corte · tende a vibrar e pode quebrar a pastilha."
                    diminuir="Acabamento mais fino · menor esforço na haste · ciclo demora mais."
                    equilibrio="Avanço fino demais faz a aresta esfregar em vez de cortar (queima prematura do gume)."
                  />
                </div>
              </>
            )}

            {/* FURAR: vc, fn */}
            {activeFamily === 'furar' && (
              <>
                <div>
                  <StepperInput
                    id="input-vc"
                    label="Velocidade de corte (vc)"
                    sym="vc"
                    unit="m/min"
                    value={inp.vc}
                    step={2}
                    placeholder="Ex: 16"
                    onChange={(v) => updateField('vc', v)}
                  />
                  <D11Drawer
                    id="d-vc"
                    title="a velocidade de corte em furação"
                    oQueE="Velocidade na periferia da broca · broca de aço rápido trabalha tipicamente a 16–30 m/min em aço 1045."
                    aumentar="Fura mais rápido · maior aquecimento nas quinas da broca · perda prematura de corte."
                    diminuir="Aumenta vida útil · em rotação excessivamente baixa o cavaco empata e perde evacuação."
                  />
                </div>

                <div>
                  <StepperInput
                    id="input-fn"
                    label="Avanço por rotação (fn)"
                    sym="fn"
                    unit="mm/rot"
                    value={inp.fn}
                    step={0.02}
                    decimals={2}
                    placeholder="Ex: 0.10"
                    onChange={(v) => updateField('fn', v)}
                  />
                  <D11Drawer
                    id="d-fn"
                    title="o avanço por rotação"
                    oQueE="Distância axial que a broca penetra a cada volta completa da árvore."
                    aumentar="Fura mais rápido e quebra melhor o cavaco · eleva expressivamente a força de avanço axial."
                    diminuir="Menor carga axial na máquina · cavaco sai contínuo e tende a embolar na calha da broca."
                  />
                </div>
              </>
            )}

            {/* ROSCAR: vc */}
            {activeFamily === 'roscar' && (
              <div>
                <StepperInput
                  id="input-vc"
                  label="Velocidade de corte (vc)"
                  sym="vc"
                  unit="m/min"
                  value={inp.vc}
                  step={2}
                  placeholder="Ex: 14"
                  onChange={(v) => updateField('vc', v)}
                />
                <D11Drawer
                  id="d-vc"
                  title="a velocidade de corte no rosqueamento"
                  oQueE="Velocidade periférica do macho · teto seguro de 40 m/min para machos de corte e 60 m/min para conformação."
                  aumentar="Risco altíssimo de quebra de macho dentro do furo e perda da peça usinada."
                  diminuir="Trabalho estável, seguro e preciso com melhor sincronismo do cabeçote."
                />
              </div>
            )}

            {/* MANDRILAR: vc, fn */}
            {activeFamily === 'mandrilar' && (
              <>
                <div>
                  <StepperInput
                    id="input-vc"
                    label="Velocidade de corte (vc)"
                    sym="vc"
                    unit="m/min"
                    value={inp.vc}
                    step={5}
                    placeholder="Ex: 140"
                    onChange={(v) => updateField('vc', v)}
                  />
                  <D11Drawer
                    id="d-vc"
                    title="a velocidade de corte no mandrilamento"
                    oQueE="Velocidade na periferia do furo final (Dc = Df) · opera como torneamento interno de alta precisão."
                    aumentar="Mais calor na pastilha · risco de desgaste de flanco alterando a cota dimensional H7."
                    diminuir="Menor deflexão e melhor controle da rugosidade superficial."
                  />
                </div>

                <div>
                  <StepperInput
                    id="input-fn"
                    label="Avanço por rotação (fn)"
                    sym="fn"
                    unit="mm/rot"
                    value={inp.fn}
                    step={0.01}
                    decimals={2}
                    placeholder="Ex: 0.08"
                    onChange={(v) => updateField('fn', v)}
                  />
                  <D11Drawer
                    id="d-fn"
                    title="o avanço por rotação em mandrilamento"
                    oQueE="Avanço da barra de mandrilar por rotação da árvore · faixa canônica estreita (0,04–0,12 mm/rot, partida 0,08)."
                    aumentar="Reduz tempo de ciclo · piora a rugosidade superficial e gera cristas na parede do furo."
                    diminuir="Acabamento espelhado e circularidade rigorosa."
                  />
                </div>
              </>
            )}

            <button type="button" className="linkrow" onClick={resetToDefaults}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12a8 8 0 1 0 2.4-5.7" />
                <path d="M4 4.5V10h5.5" />
              </svg>
              <span>Restaurar valores de partida</span>
            </button>
          </div>
        )}
      </div>

      {/* GRUPO DE AÇÕES DO FORMULÁRIO */}
      <div className="form-actions-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          type="button"
          className={`btn-cta ${canCalculate ? (isCalculated ? 'is-calculated' : '') : 'btn-cta-disabled'}`}
          id="btn-calcular"
          disabled={!canCalculate}
          onClick={calculate}
          title={canCalculate ? 'Calcular parâmetros de corte' : 'Preencha os requisitos para habilitar o cálculo'}
        >
          {isCalculated && canCalculate ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Parâmetros Atualizados
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Calcular Parâmetros
            </>
          )}
        </button>

        <button
          type="button"
          className="btn-reset-main"
          id="btn-reset-params-main"
          onClick={resetToDefaults}
          title="Restaurar valores de partida da ferramenta e montagem"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Restaurar Valores Padrão
        </button>

        <div className="calc-feedback" id="calc-feedback" style={{ opacity: canCalculate ? 1 : 0.8 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8.5 L6.5 12 L13 4.5" />
          </svg>
          {isCalculated && canCalculate
            ? 'Parâmetros sincronizados com a montagem'
            : canCalculate
            ? 'Requisitos preenchidos — pronto para calcular'
            : 'Preencha os requisitos para habilitar o cálculo'}
        </div>
      </div>
    </div>
  );
}
