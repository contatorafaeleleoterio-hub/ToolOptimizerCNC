import React, { useRef } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import type { Family } from '../../core/types';

interface FamilyNavProps {
  onCloseSettings?: () => void;
}

/**
 * As quatro famílias, na ordem obrigatória do brief §11. Os nomes não podem ser
 * encurtados nem traduzidos, e a ordem não muda.
 *
 * A lista é dado, não quatro blocos repetidos: o `id` da aba, o `aria-controls`,
 * o roving tabindex e a navegação por seta precisam andar juntos, e mantê-los
 * sincronizados à mão em quatro cópias é como o padrão ARIA ficou pela metade.
 */
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
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v5" />
        <path d="M12 16v5" />
      </>
    ),
  },
];

/** O painel que estas abas controlam — o `aria-controls` e o `id` têm de casar. */
export const ID_PAINEL_CALCULO = 'view-calculo';

/** O id da aba de uma família, usado também pelo `aria-labelledby` do painel. */
export const idDaAba = (fam: Family) => `tab-${fam}`;

export default function FamilyNav({ onCloseSettings }: FamilyNavProps) {
  const { activeFamily, setActiveFamily } = useCalculator();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleSelect = (fam: Family) => {
    setActiveFamily(fam);
    if (onCloseSettings) onCloseSettings();
  };

  // R10: tudo que se faz com o ponteiro se faz pelo teclado. Seta anda entre as
  // abas e circula nas pontas; Home e End vão para a primeira e a última.
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
    // o foco acompanha a seleção, senão o teclado perde o lugar
    refs.current[fam]?.focus();
  };

  return (
    <nav className="nav-bar" id="main-nav-bar" aria-label="Famílias de Usinagem">
      <div className="nav-families" role="tablist" aria-label="Seletor de processo de usinagem">
        {FAMILIAS.map((fam, i) => {
          const ativa = activeFamily === fam.id;
          return (
            <button
              key={fam.id}
              ref={(el) => { refs.current[fam.id] = el; }}
              type="button"
              className={`nav-tab ${ativa ? 'active' : ''}`}
              role="tab"
              id={idDaAba(fam.id)}
              aria-selected={ativa}
              aria-controls={ID_PAINEL_CALCULO}
              // roving tabindex: só a aba selecionada entra na ordem de foco, e
              // as setas fazem o resto — é o que o padrão de abas do WAI-ARIA pede
              tabIndex={ativa ? 0 : -1}
              onClick={() => handleSelect(fam.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              <svg
                className="tab-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
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
