import React, { useState } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { FACTORY_TOOLS, type Substrate } from '../../../core/tools.js';
import MobileHeader from './MobileHeader';
import MobileFamilyTabs from './MobileFamilyTabs';
import MobileStickyBar from './MobileStickyBar';
import MobileResultsSheet from './MobileResultsSheet';
import { StepperInput, D11Drawer } from '../ConfigForm';
import { ID_PAINEL_CALCULO, idDaAba } from '../FamilyNav';

interface MobileCalculatorProps {
  onOpenSettings: () => void;
}

export default function MobileCalculator({ onOpenSettings }: MobileCalculatorProps) {
  const {
    activeFamily,
    materials,
    selectedMaterial,
    selectedTool,
    selectedSubstrate,
    workshopTools,
    selectedWorkshopToolId,
    selectWorkshopTool,
    currentInputs,
    selectMaterial,
    selectTool,
    setSubstrate,
    updateField,
    resetToDefaults,
  } = useCalculator();

  const [showResultsSheet, setShowResultsSheet] = useState(false);
  const [matOpen, setMatOpen] = useState(true);
  const [toolOpen, setToolOpen] = useState(true);
  const [tuneOpen, setTuneOpen] = useState(true);

  const inp = currentInputs;
  const availableTools = FACTORY_TOOLS.filter(t => t.family === activeFamily);
  const familyWorkshopTools = (workshopTools || []).filter(t => t.family === activeFamily);

  const pede = (campo: string) => selectedTool?.extraFields?.includes(campo) ?? false;

  const dInitial = typeof inp.dInitial === 'number' ? inp.dInitial : parseFloat(String(inp.dInitial || 0));
  const dFinal = typeof inp.dFinal === 'number' ? inp.dFinal : parseFloat(String(inp.dFinal || 0));
  const apDerivadoMandrilar = dFinal > dInitial && dInitial > 0 ? ((dFinal - dInitial) / 2).toFixed(1) : '—';

  return (
    <div className="mobile-shell">
      {/* CABEÇALHO COMPACTO MOBILE */}
      <MobileHeader onOpenSettings={onOpenSettings} />

      {/* SELETOR DE FAMÍLIAS */}
      <MobileFamilyTabs />

      {/* PAINEL DE CONTEÚDO PRINCIPAL COM ACORDEÕES */}
      <div
        id={ID_PAINEL_CALCULO}
        className="mobile-content"
        role="tabpanel"
        aria-labelledby={idDaAba(activeFamily)}
      >
        {/* BLOCO 1: MATERIAL */}
        <section className="card mobile-card" aria-label="Seleção de Material">
          <button
            type="button"
            className="bhead"
            id="mobile-bhead-material"
            aria-expanded={matOpen}
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
            <span className="lbl" style={{ flexGrow: 1 }}>1. MATERIAL A USINAR</span>
            <span className="bsum">
              {selectedMaterial ? selectedMaterial.name : 'Selecionar'}
            </span>
          </button>

          {matOpen && (
            <div className="mobile-section-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <hr className="sep" />
              <div className="selbox">
                <select
                  className="fsel"
                  id="mobile-select-material"
                  aria-label="Material a usinar"
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

              {selectedMaterial && (
                <div className="mobile-mat-props">
                  <div className="mobile-prop-pill">
                    <span className="lbl">ISO:</span>
                    <strong>{selectedMaterial.isoClass}</strong>
                  </div>
                  <div className="mobile-prop-pill">
                    <span className="lbl">kc1.1:</span>
                    <strong>{selectedMaterial.kc1_1} N/mm²</strong>
                  </div>
                  <div className="mobile-prop-pill">
                    <span className="lbl">mc:</span>
                    <strong>{selectedMaterial.mc}</strong>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* BLOCO 2: FERRAMENTA E GEOMETRIA */}
        <section className="card mobile-card" aria-label="Seleção de Ferramenta e Geometria">
          <button
            type="button"
            className="bhead"
            id="mobile-bhead-ferramenta"
            aria-expanded={toolOpen}
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
            <span className="lbl" style={{ flexGrow: 1 }}>2. FERRAMENTA & MONTAGEM</span>
            <span className="bsum">
              {selectedTool ? selectedTool.name : 'Selecionar'}
            </span>
          </button>

          {toolOpen && (
            <div className="mobile-section-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <hr className="sep" />
              <div className="selbox">
                <select
                  className="fsel"
                  id="mobile-select-tool"
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
                  <span className="lbl">Substrato:</span>
                  {selectedTool.substrates.length > 1 ? (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {selectedTool.substrates.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`chip ${selectedSubstrate === s ? 'chip-active' : ''}`}
                          onClick={() => setSubstrate(s as Substrate)}
                          style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '12px' }}
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

              {/* VARIÁVEIS DE GEOMETRIA (1 COLUNA TOTAL NO MOBILE PARA NUNCA CORTAR O STEPPER) */}
              <div className="mobile-fields-column" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                        label="Raio de canto"
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
                        label="Ângulo de posição"
                        sym="kappa"
                        unit="graus"
                        value={inp.kappa}
                        step={5}
                        placeholder="Ex: 15"
                        onChange={(v) => updateField('kappa', v)}
                      />
                    )}
                    <StepperInput
                      id="input-z"
                      label="Número de arestas"
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
                      label="Balanço útil"
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
                      label="Diâmetro da broca"
                      sym="D"
                      unit="mm"
                      value={inp.D}
                      step={1}
                      placeholder="Ex: 10"
                      onChange={(v) => updateField('D', v)}
                    />
                    <StepperInput
                      id="input-pointAngle"
                      label="Ângulo de ponta"
                      sym="sigma"
                      unit="°"
                      value={inp.pointAngle}
                      step={5}
                      placeholder="Ex: 118"
                      onChange={(v) => updateField('pointAngle', v)}
                    />
                    <StepperInput
                      id="input-l"
                      label="Balanço da broca"
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
                      label="Diâmetro nominal"
                      sym="D"
                      unit="mm"
                      value={inp.D}
                      step={1}
                      placeholder="Ex: 8"
                      onChange={(v) => updateField('D', v)}
                    />
                    <StepperInput
                      id="input-pitch"
                      label="Passo da rosca"
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
                      label="Balanço da haste"
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
                      label="Diâmetro inicial"
                      sym="Di"
                      unit="mm"
                      value={inp.dInitial}
                      step={1}
                      placeholder="Ex: 18"
                      onChange={(v) => updateField('dInitial', v)}
                    />
                    <StepperInput
                      id="input-dFinal"
                      label="Diâmetro final"
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
                      label="Raio de ponta"
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
                      label="Balanço da barra"
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
        </section>

        {/* BLOCO 3: CONDIÇÕES DE CORTE */}
        <section className="card mobile-card" aria-label="Condições e Parâmetros de Corte">
          <button
            type="button"
            className="bhead"
            id="mobile-bhead-ajuste"
            aria-expanded={tuneOpen}
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
            <span className="lbl" style={{ flexGrow: 1 }}>3. CONDIÇÕES DE CORTE</span>
            <span className="bsum">
              vc {inp.vc ?? '—'}
            </span>
          </button>

          {tuneOpen && (
            <div className="mobile-section-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
              <hr className="sep" />

              {activeFamily === 'fresar' && (
                <>
                  <div>
                    <StepperInput
                      id="input-ap"
                      label="Profundidade de corte"
                      sym="ap"
                      unit="mm"
                      value={inp.ap}
                      step={0.5}
                      decimals={1}
                      placeholder="Ex: 2.0"
                      onChange={(v) => updateField('ap', v)}
                    />
                    <D11Drawer
                      id="m-ap"
                      title="a profundidade de corte"
                      oQueE="Fatia axial de altura que cada passe remove do bloco bruto."
                      aumentar="Mais material por passe · esforço axial elevado."
                      diminuir="Menos força na haste · corte suave e silencioso."
                    />
                  </div>

                  <div>
                    <StepperInput
                      id="input-ae"
                      label="Penetração lateral"
                      sym="ae"
                      unit="mm"
                      value={inp.ae}
                      step={0.5}
                      decimals={1}
                      placeholder="Ex: 2.5"
                      onChange={(v) => updateField('ae', v)}
                    />
                    <D11Drawer
                      id="m-ae"
                      title="a penetração de trabalho"
                      oQueE="Largura do corte na lateral da ferramenta."
                      aumentar="Mais volume de cavaco · maior deflexão."
                      diminuir="Carga lateral menor · afinamento de cavaco."
                    />
                  </div>

                  <div>
                    <StepperInput
                      id="input-vc"
                      label="Velocidade de corte"
                      sym="vc"
                      unit="m/min"
                      value={inp.vc}
                      step={5}
                      placeholder="Ex: 140"
                      onChange={(v) => updateField('vc', v)}
                    />
                  </div>

                  <div>
                    <StepperInput
                      id="input-fz"
                      label="Avanço por dente"
                      sym="fz"
                      unit="mm/dente"
                      value={inp.fz}
                      step={0.005}
                      decimals={3}
                      placeholder="Ex: 0.060"
                      onChange={(v) => updateField('fz', v)}
                    />
                  </div>
                </>
              )}

              {activeFamily === 'furar' && (
                <>
                  <StepperInput
                    id="input-vc"
                    label="Velocidade de corte"
                    sym="vc"
                    unit="m/min"
                    value={inp.vc}
                    step={2}
                    placeholder="Ex: 16"
                    onChange={(v) => updateField('vc', v)}
                  />
                  <StepperInput
                    id="input-fn"
                    label="Avanço por rotação"
                    sym="fn"
                    unit="mm/rot"
                    value={inp.fn}
                    step={0.02}
                    decimals={2}
                    placeholder="Ex: 0.10"
                    onChange={(v) => updateField('fn', v)}
                  />
                </>
              )}

              {activeFamily === 'roscar' && (
                <StepperInput
                  id="input-vc"
                  label="Velocidade de corte"
                  sym="vc"
                  unit="m/min"
                  value={inp.vc}
                  step={2}
                  placeholder="Ex: 14"
                  onChange={(v) => updateField('vc', v)}
                />
              )}

              {activeFamily === 'mandrilar' && (
                <>
                  <StepperInput
                    id="input-vc"
                    label="Velocidade de corte"
                    sym="vc"
                    unit="m/min"
                    value={inp.vc}
                    step={5}
                    placeholder="Ex: 140"
                    onChange={(v) => updateField('vc', v)}
                  />
                  <StepperInput
                    id="input-fn"
                    label="Avanço por rotação"
                    sym="fn"
                    unit="mm/rot"
                    value={inp.fn}
                    step={0.01}
                    decimals={2}
                    placeholder="Ex: 0.08"
                    onChange={(v) => updateField('fn', v)}
                  />
                </>
              )}

              <button type="button" className="linkrow" onClick={resetToDefaults} style={{ justifyContent: 'center', padding: '8px 0' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12a8 8 0 1 0 2.4-5.7" />
                  <path d="M4 4.5V10h5.5" />
                </svg>
                <span>Restaurar valores de partida</span>
              </button>
            </div>
          )}
        </section>

        {/* ESPAÇADOR INFERIOR PARA NÃO ENCOBRIR O ÚLTIMO ITEM COM A BARRA FIXA */}
        <div className="mobile-bottom-spacer" aria-hidden="true" style={{ height: '80px' }} />
      </div>

      {/* BARRA FIXA INFERIOR NA THUMB ZONE */}
      <MobileStickyBar onOpenResults={() => setShowResultsSheet(true)} />

      {/* MODAL / BOTTOM SHEET DE RESULTADOS DETALHADOS */}
      <MobileResultsSheet
        isOpen={showResultsSheet}
        onClose={() => setShowResultsSheet(false)}
      />
    </div>
  );
}
