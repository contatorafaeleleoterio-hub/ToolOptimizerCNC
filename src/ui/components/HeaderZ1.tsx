import React, { useState, useEffect } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import BrandLogo from './BrandLogo';

interface HeaderZ1Props {
  onOpenSettings: () => void;
}

export default function HeaderZ1({ onOpenSettings }: HeaderZ1Props) {
  const { activeFamily, selectedMaterial, selectedTool, selectedSubstrate, currentInputs, safetyMargin } = useCalculator();

  const [theme, setTheme] = useState<'claro' | 'escuro'>('claro');

  useEffect(() => {
    const saved = (localStorage.getItem('to_theme') as 'claro' | 'escuro') || 'claro';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
    document.body.setAttribute('data-theme', saved);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', saved === 'escuro' ? '#080C12' : '#F4F6F9');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'claro' ? 'escuro' : 'claro';
    setTheme(next);
    localStorage.setItem('to_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    document.body.setAttribute('data-theme', next);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'escuro' ? '#080C12' : '#F4F6F9');
  };

  const inp = currentInputs;

  return (
    <section className="card z1-card" aria-label="Cabeçalho do Sistema">
      <div className="z1-brand-group">
        <BrandLogo />
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <a
          href="/site-model.html"
          className="hbtn"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700 }}
          title="Abrir o Flagship Website de Referência"
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--brand-fill)' }}></span>
          Site Modelo ↗
        </a>

        <a
          href="/showcase.html"
          className="hbtn"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700 }}
          title="Abrir Catálogo do Design System"
        >
          Design System ↗
        </a>

        <button
          type="button"
          className="hbtn theme-switch-btn"
          onClick={toggleTheme}
          aria-label="Alternar Tema Claro / Escuro"
          title={theme === 'claro' ? 'Mudar para Tema Escuro (Titanium)' : 'Mudar para Tema Claro'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {theme === 'claro' ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <span>Claro</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span>Escuro</span>
            </>
          )}
        </button>

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
      </div>
    </section>
  );
}
