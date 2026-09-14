import React, { useRef } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import type { Family } from '../../../core/types';
import { ID_PAINEL_CALCULO, idDaAba } from '../FamilyNav';

interface MobileFamilyTabsProps {
  onCloseSettings?: () => void;
}

const FAMILIAS: { id: Family; rotulo: string; icone: React.ReactNode }[] = [
  {
    id: 'fresar',
    rotulo: 'Fresar',
    icone: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </>
    ),
  },
  {
    id: 'furar',
    rotulo: 'Furar',
    icone: (
      <>
        <path d="M12 2v14" />
        <path d="m8 12 4 4 4-4" />
        <path d="m10 22 2-2 2 2" />
      </>
    ),
  },
  {
    id: 'roscar',
    rotulo: 'Roscar',
    icone: (
      <>
        <path d="M4 6h16" />
        <path d="M6 10h12" />
        <path d="M8 14h8" />
        <path d="M10 18h4" />
        <path d="M12 2v20" />
      </>
    ),
  },
  {
    id: 'mandrilar',
    rotulo: 'Mandrilar',
    icone: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="4" r="4" />
        <path d="M12 3v5" />
        <path d="M12 16v5" />
      </>
    ),
  },
];

export default function MobileFamilyTabs({ onCloseSettings }: MobileFamilyTabsProps) {
  const { activeFamily, setActiveFamily } = useCalculator();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleSelect = (fam: Family) => {
    setActiveFamily(fam);
    if (onCloseSettings) onCloseSettings();
  };

  const handleKeyDown = (e: React.KeyboardEvent, indice: number) => {
    const passo =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1
      : 0;

    let destino = -1;
    if (passo !== 0) destino = (indice + passo + FAMILIAS.length) % FAMILIAS.length;
    else if (e.key === 'Home') destino = 0;
    else if (e.key === 'End') destino = FAMILIAS.length - 1;
    else return;

    const alvo = FAMILIAS[destino];
    if (!alvo) return;

    e.preventDefault();
    const fam = alvo.id;
    handleSelect(fam);
    refs.current[fam]?.focus();
  };

  return (
    <nav className="mobile-family-nav" id="mobile-family-nav-bar" aria-label="Processos de Usinagem CNC">
      <div className="mobile-family-list" role="tablist" aria-label="Seletor de processo de usinagem">
        {FAMILIAS.map((fam, i) => {
          const ativa = activeFamily === fam.id;
          return (
            <button
              key={fam.id}
              ref={(el) => { refs.current[fam.id] = el; }}
              type="button"
              className={`mobile-tab-item ${ativa ? 'active' : ''}`}
              role="tab"
              id={idDaAba(fam.id)}
              aria-selected={ativa}
              aria-controls={ID_PAINEL_CALCULO}
              tabIndex={ativa ? 0 : -1}
              onClick={() => handleSelect(fam.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              <svg
                className="mobile-tab-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {fam.icone}
              </svg>
              <span>{fam.rotulo}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
