import React, { useState } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { isSafetyMarginVisible } from '../../../core/display.js';

interface MobileResultsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatInt(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatDec(val: number | null | undefined, decimals = 1): string {
  if (val === null || val === undefined || isNaN(val)) return '—';
  const num = Number(val);
  const fixed = num.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, '.') || '0';
  return parts.join(',');
}

function formatOffset(off: number): string {
  return (off > 0 ? '+' : '−') + Math.abs(off) + ' %';
}

export default function MobileResultsSheet({ isOpen, onClose }: MobileResultsSheetProps) {
  const {
    activeFamily,
    isCalculated,
    millingResult,
    drillingResult,
    threadingResult,
    boringResult,
    sOffsetPercent,
    fOffsetPercent,
    safetyMargin,
    adjustRPM,
    adjustFeed,
    resetAdjustments,
    currentInputs,
  } = useCalculator();

  const [z5Open, setZ5Open] = useState(false);
  const [z6Open, setZ6Open] = useState(false);

  if (!isOpen) return null;

  const inp = currentInputs;
  const isRoscar = activeFamily === 'roscar';
  const isFurar = activeFamily === 'furar';
  const hasSafetyMargin = isSafetyMarginVisible(safetyMargin);

  const result =
    activeFamily === 'fresar'
      ? millingResult
      : activeFamily === 'furar'
      ? drillingResult
      : activeFamily === 'roscar'
      ? threadingResult
      : boringResult;

  const calculado = isCalculated && result !== null;

  const sOffsetFactor = 1 + (sOffsetPercent / 100);
  const fOffsetFactor = 1 + (fOffsetPercent / 100);
  const sVal = calculado ? result.n : 0;
  const fVal = calculado ? result.vf : 0;
  const sBase = calculado ? Math.round(sVal / sOffsetFactor) : 0;
  const fBase = calculado ? Math.round(fVal / fOffsetFactor) : 0;

  const safetyLevel = calculado ? result.safetyLevel : 'NORMAL';
  const alerts = calculado ? result.alerts : [];

  let alertClass = 'normal';
  if (safetyLevel === 'ATENÇÃO') alertClass = 'warning';
  if (safetyLevel === 'CRÍTICO') alertClass = 'critical';

  const alertTitle = calculado
    ? alerts[0]?.message
      ? `NÍVEL DE SEGURANÇA: ${safetyLevel}`
      : 'NÍVEL DE SEGURANÇA: NORMAL'
    : 'Aguardando definição dos parâmetros';

  const alertBody = calculado
    ? alerts.length > 0
      ? alerts.map(a => a.message).join(' ')
      : 'Parâmetros dentro da zona recomendada e estável de usinagem.'
    : 'Preencha os campos obrigatórios para habilitar o cálculo.';

  const peckVal = isFurar && drillingResult && drillingResult.peckStep !== null
    ? formatDec(drillingResult.peckStep, 2)
    : isFurar ? '0,00' : null;

  // Resumo Z7
  const z7Cards = (() => {
    if (!calculado) return [];
    if (activeFamily === 'fresar' && millingResult) {
      return [
        { lbl: 'Espessura média (hm)', val: `${formatDec(millingResult.hm, 3)} mm` },
        { lbl: 'Espessura máx (hex)', val: `${formatDec(millingResult.hex, 3)} mm` },
        { lbl: 'Fator afinamento (CTF)', val: `${formatDec(millingResult.ctf, 3)} ×` },
        { lbl: 'Balanço / Diâmetro (L/D)', val: formatDec(millingResult.LD, 1), isAlert: millingResult.LD > 4 },
        { lbl: 'Força de corte (kc)', val: `${formatInt(millingResult.kc)} N/mm²` },
        { lbl: 'Taxa remoção (MRR)', val: `${formatDec(millingResult.Q, 2)} cm³/min` },
        { lbl: 'Velocidade real (vc)', val: `${formatDec(millingResult.vcReal, 1)} m/min` },
        { lbl: 'Potência na aresta (Pc)', val: `${formatDec(millingResult.Pc, 2)} kW` },
        { lbl: 'Torque (Mc)', val: `${formatDec(millingResult.Mc, 2)} N·m` },
      ];
    }
    if (activeFamily === 'furar' && drillingResult) {
      return [
        { lbl: 'Avanço / rot (fn)', val: `${formatDec(drillingResult.fn, 2)} mm/rot` },
        ...(drillingResult.peckStep !== null ? [{ lbl: 'Passo pica-pau (Q)', val: `${formatDec(drillingResult.peckStep, 2)} mm` }] : []),
        { lbl: 'Balanço / Diâmetro (L/D)', val: formatDec(drillingResult.LD, 1), isAlert: drillingResult.LD > 4 },
        { lbl: 'Taxa remoção (MRR)', val: `${formatDec(drillingResult.Q, 2)} cm³/min` },
        { lbl: 'Velocidade real (vc)', val: `${formatDec(drillingResult.vcReal, 1)} m/min` },
        { lbl: 'Potência na aresta (Pc)', val: `${formatDec(drillingResult.Pc, 2)} kW` },
        { lbl: 'Torque (Mc)', val: `${formatDec(drillingResult.Mc, 1)} N·m` },
      ];
    }
    if (activeFamily === 'roscar' && threadingResult) {
      return [
        { lbl: 'Diâmetro nominal (D)', val: `${formatDec(Number(inp.D), 1)} mm` },
        { lbl: 'Passo da rosca (P)', val: `${formatDec(threadingResult.pitch, 2)} mm` },
        { lbl: 'Balanço / Diâmetro (L/D)', val: formatDec(threadingResult.LD, 1), isAlert: threadingResult.LD > 4 },
        { lbl: 'Taxa remoção (MRR)', val: `${formatDec(threadingResult.Q, 2)} cm³/min` },
        { lbl: 'Velocidade real (vc)', val: `${formatDec(threadingResult.vcReal, 1)} m/min` },
        { lbl: 'Potência na aresta (Pc)', val: `${formatDec(threadingResult.Pc, 2)} kW` },
        { lbl: 'Torque (Mc)', val: `${formatDec(threadingResult.Mc, 1)} N·m` },
      ];
    }
    if (activeFamily === 'mandrilar' && boringResult) {
      return [
        { lbl: 'Profundidade (ap)', val: `${formatDec(boringResult.ap, 2)} mm` },
        { lbl: 'Diâmetro de corte (Dc)', val: `${formatDec(boringResult.Dc, 1)} mm` },
        { lbl: 'Avanço / rot (fn)', val: `${formatDec(boringResult.fn, 2)} mm/rot` },
        { lbl: 'Balanço / Diâmetro (L/D)', val: formatDec(boringResult.LD, 1), isAlert: boringResult.LD > 4 },
        { lbl: 'Taxa remoção (MRR)', val: `${formatDec(boringResult.Q, 2)} cm³/min` },
        { lbl: 'Velocidade real (vc)', val: `${formatDec(boringResult.vcReal, 1)} m/min` },
        { lbl: 'Potência na aresta (Pc)', val: `${formatDec(boringResult.Pc, 2)} kW` },
        { lbl: 'Torque (Mc)', val: `${formatDec(boringResult.Mc, 1)} N·m` },
      ];
    }
    return [];
  })();

  return (
    <div className="mobile-sheet-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Resultados Calculados e Diagnóstico de Usinagem">
      <div className="mobile-sheet-content" onClick={(e) => e.stopPropagation()}>
        {/* Barra superior de arrasto e fechar */}
        <div className="mobile-sheet-header">
          <div className="mobile-sheet-drag-handle" aria-hidden="true" />
          <div className="mobile-sheet-title-row">
            <h2 className="mobile-sheet-title">Diagnóstico e Resultados</h2>
            <button
              type="button"
              className="mobile-sheet-close-btn"
              onClick={onClose}
              aria-label="Fechar Resultados"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="mobile-sheet-scrollable">
          {/* AVISO DE MARGEM SE ATIVA */}
          {hasSafetyMargin && (
            <div
              className="card"
              role="status"
              style={{
                padding: '10px 14px',
                backgroundColor: 'var(--st-info-bg)',
                color: 'var(--st-info-ink)',
                borderLeft: '4px solid var(--accent-blue)',
                fontSize: '12px',
                lineHeight: 1.4,
              }}
            >
              <strong>Margem Ativa: {safetyMargin}%.</strong> Rotação e avanço escalados.
            </div>
          )}

          {/* TARJA Z2 DE SEGURANÇA */}
          <div className={`alert-band ${alertClass}`} role="alert">
            <div className={`chip ${alertClass}`}>{safetyLevel}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tx-1)' }}>{alertTitle}</div>
              <div className="prose" style={{ fontSize: '12px' }}>{alertBody}</div>
            </div>
          </div>

          {/* Z4 — NÚMEROS DE COMANDO (S E F) COM CONTROLE TÁTIL +/- 5% */}
          <div className="mobile-hero-cards">
            {/* HERÓI S */}
            <div className={`rcard rcard-hero ${sOffsetPercent !== 0 ? 'manual-edit' : ''}`} data-hero="s">
              <div className="rcard-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="hero-addr-badge">S</span>
                  <div className="lbl">Rotação (<span className="sym">n</span>)</div>
                </div>
                {sOffsetPercent !== 0 && (
                  <span className="tag tag-info">ajuste {formatOffset(sOffsetPercent)}</span>
                )}
              </div>

              <div className="rtall-row">
                <button
                  type="button"
                  className="hero-step-btn btn-step-hero"
                  disabled={!calculado || sOffsetPercent <= -95}
                  onClick={() => adjustRPM(-5)}
                  aria-label="Reduzir rotação em 5 por cento"
                >
                  −
                </button>
                <div className="rval">
                  <span className="rbig">{calculado ? formatInt(sVal) : '0'}</span>
                  <span className="funit" style={{ fontSize: '13px', fontWeight: 700 }}>rpm</span>
                </div>
                <button
                  type="button"
                  className="hero-step-btn btn-step-hero"
                  disabled={!calculado}
                  onClick={() => adjustRPM(5)}
                  aria-label="Aumentar rotação em 5 por cento"
                >
                  +
                </button>
              </div>

              {sOffsetPercent !== 0 && (
                <div className="hero-base">
                  <span>calculado {formatInt(sBase)} rpm</span>
                  <button
                    type="button"
                    className="btn-revert btn-revert-hero"
                    onClick={resetAdjustments}
                    title="Restaurar rotação original calculada"
                  >
                    ⟲ Padrão
                  </button>
                </div>
              )}
            </div>

            {/* HERÓI F */}
            <div className={`rcard rcard-hero ${fOffsetPercent !== 0 ? 'manual-edit' : ''}`} data-hero="f">
              <div className="rcard-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="hero-addr-badge">F</span>
                  <div className="lbl">
                    {isRoscar ? 'Avanço da mesa (' : 'Velocidade avanço ('}
                    <span className="sym">vf</span>)
                  </div>
                </div>
                {isRoscar && <span className="tag tag-info">Sincronizado</span>}
                {fOffsetPercent !== 0 && !isRoscar && (
                  <span className="tag tag-info">ajuste {formatOffset(fOffsetPercent)}</span>
                )}
              </div>

              <div className="rtall-row">
                {!isRoscar && (
                  <button
                    type="button"
                    className="hero-step-btn btn-step-hero"
                    disabled={!calculado || fOffsetPercent <= -95}
                    onClick={() => adjustFeed(-5)}
                    aria-label="Reduzir avanço em 5 por cento"
                  >
                    −
                  </button>
                )}
                <div className="rval">
                  <span className="rbig">{calculado ? formatInt(fVal) : '0'}</span>
                  <span className="funit" style={{ fontSize: '13px', fontWeight: 700 }}>mm/min</span>
                </div>
                {!isRoscar && (
                  <button
                    type="button"
                    className="hero-step-btn btn-step-hero"
                    disabled={!calculado}
                    onClick={() => adjustFeed(5)}
                    aria-label="Aumentar avanço em 5 por cento"
                  >
                    +
                  </button>
                )}
              </div>

              {isRoscar ? (
                <div className="lbl" style={{ textTransform: 'none', color: 'var(--tx-3)', marginTop: '4px' }}>
                  passo (P) {formatDec(Number(inp.pitch || 1.25), 2)} mm × rotação
                </div>
              ) : fOffsetPercent !== 0 ? (
                <div className="hero-base">
                  <span>calculado {formatInt(fBase)} mm/min</span>
                  <button
                    type="button"
                    className="btn-revert btn-revert-hero"
                    onClick={resetAdjustments}
                    title="Restaurar avanço original calculado"
                  >
                    ⟲ Padrão
                  </button>
                </div>
              ) : null}
            </div>

            {/* PASSO PICA-PAU SE FURAÇÃO */}
            {isFurar && (
              <div className="rcard rcard-hero">
                <div className="rcard-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="hero-addr-badge">Q</span>
                    <div className="lbl">Passo pica-pau</div>
                  </div>
                </div>
                <div className="rval" style={{ justifyContent: 'center', height: '44px' }}>
                  <span className="rbig" style={{ fontSize: '26px' }}>{peckVal}</span>
                  <span className="funit" style={{ fontSize: '13px', fontWeight: 700 }}>mm</span>
                </div>
              </div>
            )}
          </div>

          {/* GAVETAS Z5 E Z6 */}
          <div className="drawer">
            <button
              type="button"
              className="dtrigger"
              onClick={() => setZ5Open(!z5Open)}
              aria-expanded={z5Open}
            >
              <svg
                className="chevron"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                style={{ transform: z5Open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s ease' }}
              >
                <path d="M6 3.5 L11 8 L6 12.5" />
              </svg>
              <span className="lbl">O que vai acontecer</span>
            </button>
            {z5Open && (
              <div className="dbody dbody--col" style={{ gap: '8px', padding: '10px' }}>
                <div className="prose" style={{ fontSize: '12px' }}>
                  {calculado
                    ? `Operação em ${activeFamily.toUpperCase()}: Esforço de corte previsto com potência de ${formatDec(result?.Pc, 2)} kW e torque de ${formatDec(result?.Mc, 1)} N·m. ` +
                      (result?.LD && result.LD > 4 ? `Atenção à deflexão da haste (L/D = ${formatDec(result.LD, 1)}).` : 'Parâmetros dentro da zona estável.')
                    : 'Aguardando execução do cálculo.'}
                </div>
              </div>
            )}
          </div>

          <div className="drawer">
            <button
              type="button"
              className="dtrigger"
              onClick={() => setZ6Open(!z6Open)}
              aria-expanded={z6Open}
            >
              <svg
                className="chevron"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                style={{ transform: z6Open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s ease' }}
              >
                <path d="M6 3.5 L11 8 L6 12.5" />
              </svg>
              <span className="lbl">O que mexer (Vibração / Ajuste)</span>
            </button>
            {z6Open && (
              <div className="dbody dbody--col" style={{ gap: '10px', padding: '10px' }}>
                <div className="qline" style={{ fontSize: '12px' }}>Reduzir penetração de trabalho (ae) mantendo avanço</div>
                <div className="prose" style={{ fontSize: '12px' }}>
                  Diminuir ae reduz o arco de contato e o esforço radial que excita harmônicos na ferramenta com balanço longo.
                </div>
              </div>
            )}
          </div>

          {/* RESUMO GERAL Z7 */}
          {z7Cards.length > 0 && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="lbl">VERIFICAÇÃO FÍSICA E ESFORÇOS</div>
              <div className="mobile-z7-grid">
                {z7Cards.map((c, idx) => (
                  <div key={idx} className="mobile-z7-card">
                    <span className="lbl" style={{ fontSize: '10px' }}>{c.lbl}</span>
                    <span className="u20" style={{ fontSize: '16px', color: c.isAlert ? 'var(--st-warn-ink)' : 'inherit' }}>
                      {c.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOTÃO FINAL DE FECHAMENTO */}
          <button
            type="button"
            className="btn-cta"
            onClick={onClose}
            style={{ marginTop: '10px', minHeight: '44px' }}
          >
            Voltar aos Parâmetros
          </button>
        </div>
      </div>
    </div>
  );
}
