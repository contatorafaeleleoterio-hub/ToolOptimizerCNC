import React from 'react';
import { useCalculator } from '../context/CalculatorContext';

interface HeaderZ1Props {
  onOpenSettings: () => void;
}

export default function HeaderZ1({ onOpenSettings }: HeaderZ1Props) {
  const { activeFamily, selectedMaterial, selectedTool, selectedSubstrate, currentInputs, safetyMargin } = useCalculator();

  const inp = currentInputs;

  return (
    <section className="card z1-card" aria-label="Cabeçalho do Sistema">
      <div className="brand-plate" role="img" aria-label="Marca Fenix">
        FENIX
      </div>
      <div className="zid" id="z1-identidade">
        {/* CHIP DE MATERIAL */}
        <span className="z1-chip">
          <span className="zidlbl">Material</span>
          {selectedMaterial ? (
            <>
              <span className="zidval">{selectedMaterial.name}</span>
              <span
                className="tag"
                style={{
                  background: 'var(--surface-hover-field)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--tx-1)',
                  padding: '1px 6px',
                  fontSize: '10px',
                }}
              >
                ISO {selectedMaterial.isoClass}
              </span>
            </>
          ) : (
            <span className="zidval" style={{ color: 'var(--tx-3)' }}>
              Nenhum material selecionado
            </span>
          )}
        </span>

        {/* CHIP DE FERRAMENTA */}
        <span className="z1-chip">
          <span className="zidlbl">Ferramenta</span>
          {selectedTool ? (
            <span className="zidval">
              {selectedTool.name} ({selectedSubstrate})
            </span>
          ) : (
            <span className="zidval" style={{ color: 'var(--tx-3)' }}>
              Nenhuma ferramenta selecionada
            </span>
          )}
        </span>

        {/* CHIP DE DIMENSÕES / MONTAGEM */}
        <span className="z1-chip">
          <span className="zidlbl">{activeFamily === 'roscar' ? 'Rosca' : 'Dimensões'}</span>
          <span className="zidval">
            {activeFamily === 'fresar' ? (
              inp.D ? (
                <>
                  <span className="num">Ø{inp.D}</span> mm
                  {inp.r !== undefined && <> · <span className="num">r {inp.r}</span></>}
                  {inp.Z !== undefined && <> · <span className="num">Z{inp.Z}</span></>}
                  {inp.L !== undefined && <> · <span className="num">L{inp.L}</span> mm</>}
                </>
              ) : (
                <span style={{ color: 'var(--tx-3)' }}>—</span>
              )
            ) : activeFamily === 'furar' ? (
              inp.D ? (
                <>
                  <span className="num">Ø{inp.D}</span> mm
                  {inp.L !== undefined && <> · <span className="num">L{inp.L}</span> mm</>}
                </>
              ) : (
                <span style={{ color: 'var(--tx-3)' }}>—</span>
              )
            ) : activeFamily === 'roscar' ? (
              inp.D ? (
                <>
                  <span className="num">M{inp.D} × {inp.pitch || 1.25}</span>
                  {inp.L !== undefined && <> · <span className="num">L{inp.L}</span> mm</>}
                </>
              ) : (
                <span style={{ color: 'var(--tx-3)' }}>—</span>
              )
            ) : (
              // Mandrilar
              inp.dInitial && inp.dFinal ? (
                <>
                  <span className="num">Ø{inp.dInitial} → Ø{inp.dFinal}</span> mm
                  {inp.L !== undefined && <> · <span className="num">L{inp.L}</span> mm</>}
                </>
              ) : inp.dFinal ? (
                <>
                  <span className="num">Ø{inp.dFinal}</span> mm
                  {inp.L !== undefined && <> · <span className="num">L{inp.L}</span> mm</>}
                </>
              ) : (
                <span style={{ color: 'var(--tx-3)' }}>—</span>
              )
            )}
          </span>
        </span>

        {/* BADGE DE MARGEM DE SEGURANÇA */}
        {safetyMargin !== 100 && (
          <span className="z1-badge-margin">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8" cy="8" r="7" />
              <path d="M8 5v4" />
            </svg>
            Margem: {safetyMargin}%
          </span>
        )}
      </div>

      <button
        type="button"
        className="hbtn"
        id="btn-nav-configuracoes"
        onClick={onOpenSettings}
        aria-label="Abrir Configurações"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 2.4a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L3 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1L9.5 21h5l.3-2.4a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a7 7 0 0 0 .1-1Z" />
        </svg>
        Configurações
      </button>
    </section>
  );
}
