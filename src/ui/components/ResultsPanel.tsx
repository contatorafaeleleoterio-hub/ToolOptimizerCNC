import React, { useState } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import { formatNumber, isSafetyMarginVisible } from '../../core/display.js';

// Formatação Numérica Canônica (D8): ponto para milhar, vírgula para decimal
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

export default function ResultsPanel() {
  const {
    activeFamily,
    isCalculated,
    millingResult,
    drillingResult,
    threadingResult,
    boringResult,
    activeResult,
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

  const inp = currentInputs;
  const isRoscar = activeFamily === 'roscar';
  const isFurar = activeFamily === 'furar';
  const hasSafetyMargin = isSafetyMarginVisible(safetyMargin);

  // Determinar resultado ativo
  const result =
    activeFamily === 'fresar'
      ? millingResult
      : activeFamily === 'furar'
      ? drillingResult
      : activeFamily === 'roscar'
      ? threadingResult
      : boringResult;

  const calculado = isCalculated && result !== null;

  // Rotação e Avanço base sem ajuste
  const sOffsetFactor = 1 + (sOffsetPercent / 100);
  const fOffsetFactor = 1 + (fOffsetPercent / 100);
  const sVal = calculado ? result.n : 0;
  const fVal = calculado ? result.vf : 0;
  const sBase = calculado ? Math.round(sVal / sOffsetFactor) : 0;
  const fBase = calculado ? Math.round(fVal / fOffsetFactor) : 0;

  // Nível de segurança e alertas
  const safetyLevel = calculado ? result.safetyLevel : 'NORMAL';
  const alerts = calculado ? result.alerts : [];

  let alertClass = 'normal';
  if (safetyLevel === 'ATENÇÃO') alertClass = 'warning';
  if (safetyLevel === 'CRÍTICO') alertClass = 'critical';

  const alertTitle = calculado
    ? alerts[0]?.message
      ? `NÍVEL DE SEGURANÇA: ${safetyLevel}`
      : 'NÍVEL DE SEGURANÇA: NORMAL'
    : 'Aguardando definição dos parâmetros de corte e montagem';

  const alertBody = calculado
    ? alerts.length > 0
      ? alerts.map(a => a.message).join(' ')
      : 'Parâmetros dentro da zona recomendada e estável de usinagem.'
    : 'Preencha os campos obrigatórios da ferramenta e montagem à esquerda para habilitar o cálculo.';

  // Passo pica-pau (Q) para furação
  const peckVal = isFurar && drillingResult && drillingResult.peckStep !== null
    ? formatDec(drillingResult.peckStep, 2)
    : isFurar ? '0,00' : null;

  // Z3 Pares de Parâmetros
  const z3Pairs = (() => {
    if (!calculado) {
      if (activeFamily === 'fresar') {
        return [
          { label: 'AP', val: '0,0' },
          { label: 'VC', val: '0' },
          { label: 'FZ', val: '0,000' },
          { label: 'AE', val: '0,0' },
        ];
      }
      if (activeFamily === 'furar') {
        return [
          { label: 'VC', val: '0' },
          { label: 'FN', val: '0,00' },
        ];
      }
      if (activeFamily === 'roscar') {
        return [
          { label: 'ROSCA', val: '—' },
          { label: 'VC', val: '0' },
          { label: 'PASSO', val: '0,00' },
        ];
      }
      return [
        { label: 'Ø INICIAL', val: '0' },
        { label: 'Ø FINAL', val: '0' },
        { label: 'AP', val: '0,0' },
        { label: 'FN', val: '0,00' },
      ];
    }

    if (activeFamily === 'fresar') {
      return [
        { label: 'AP', val: formatDec(Number(inp.ap || 0), 1) },
        { label: 'VC', val: formatInt(Number(inp.vc || 0)) },
        { label: 'FZ', val: formatDec(Number(inp.fz || 0), 3) },
        { label: 'AE', val: formatDec(Number(inp.ae || 0), 1) },
      ];
    }
    if (activeFamily === 'furar') {
      return [
        { label: 'VC', val: formatInt(Number(inp.vc || 0)) },
        { label: 'FN', val: formatDec(Number(('fn' in result ? result.fn : null) || inp.fn || 0.1), 2) },
      ];
    }
    if (activeFamily === 'roscar') {
      return [
        { label: 'ROSCA', val: inp.D ? `M${inp.D}` : '—' },
        { label: 'VC', val: formatInt(Number(inp.vc || 0)) },
        { label: 'PASSO', val: formatDec(Number(inp.pitch || 1.25), 2) },
      ];
    }
    // Mandrilar
    return [
      { label: 'Ø INICIAL', val: formatInt(Number(inp.dInitial || 18)) },
      { label: 'Ø FINAL', val: formatInt(Number(inp.dFinal || 20)) },
      { label: 'AP', val: formatDec(boringResult ? boringResult.ap : 1.0, 1) },
      { label: 'FN', val: formatDec(Number(inp.fn || 0.08), 2) },
    ];
  })();

  // Z7 Resumo Geral
  const z7Cards = (() => {
    if (!calculado) {
      if (activeFamily === 'fresar') {
        return [
          { lbl: 'Espessura de cavaco máxima (hex)', val: '0,000 mm' },
          { lbl: 'Fator de afinamento (CTF)', val: '1,00 ×' },
          { lbl: 'Taxa de remoção de material (MRR)', val: '0,00 cm³/min' },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: '0,0', isAlert: false },
          { lbl: 'Velocidade de corte real (vc)', val: '0,0 m/min' },
          { lbl: 'Potência de corte na aresta (Pc)', val: '0,00 kW' },
          { lbl: 'Torque (Mc)', val: '0,0 N·m' },
        ];
      }
      if (activeFamily === 'furar') {
        return [
          { lbl: 'Avanço por rotação (fn)', val: '0,00 mm/rot' },
          { lbl: 'Passo do pica-pau (Q)', val: '0,00 mm' },
          { lbl: 'Taxa de remoção (MRR)', val: '0,00 cm³/min' },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: '0,0', isAlert: false },
          { lbl: 'Velocidade de corte real (vc)', val: '0,0 m/min' },
          { lbl: 'Potência de corte na aresta (Pc)', val: '0,00 kW' },
          { lbl: 'Torque (Mc)', val: '0,0 N·m' },
        ];
      }
      if (activeFamily === 'roscar') {
        return [
          { lbl: 'Diâmetro nominal (D)', val: '0,0 mm' },
          { lbl: 'Passo da rosca (P)', val: '0,00 mm' },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: '0,0', isAlert: false },
          { lbl: 'Velocidade de corte real (vc)', val: '0,0 m/min' },
          { lbl: 'Potência de corte na aresta (Pc)', val: '0,00 kW' },
          { lbl: 'Torque (Mc)', val: '0,0 N·m' },
        ];
      }
      return [
        { lbl: 'Profundidade derivada (ap)', val: '0,0 mm' },
        { lbl: 'Raio de ponta (rε)', val: '0,0 mm' },
        { lbl: 'Relação balanço/diâmetro (L/D)', val: '0,0', isAlert: false },
        { lbl: 'Velocidade de corte real (vc)', val: '0,0 m/min' },
        { lbl: 'Potência de corte na aresta (Pc)', val: '0,00 kW' },
        { lbl: 'Torque (Mc)', val: '0,0 N·m' },
      ];
    }

    if (activeFamily === 'fresar' && millingResult) {
      return [
        { lbl: 'Espessura de cavaco média (hm)', val: `${formatDec(millingResult.hm, 3)} mm` },
        { lbl: 'Espessura de cavaco máxima (hex)', val: `${formatDec(millingResult.hex, 3)} mm` },
        { lbl: 'Fator de afinamento (CTF)', val: `${formatDec(millingResult.ctf, 3)} ×` },
        { lbl: 'Relação balanço/diâmetro (L/D)', val: formatDec(millingResult.LD, 1), isAlert: millingResult.LD > 4 },
        { lbl: 'Força específica no corte (kc)', val: `${formatInt(millingResult.kc)} N/mm²` },
        { lbl: 'Taxa de remoção (MRR)', val: `${formatDec(millingResult.Q, 2)} cm³/min` },
        { lbl: 'Velocidade de corte real (vc)', val: `${formatDec(millingResult.vcReal, 1)} m/min` },
        { lbl: 'Potência de corte na aresta (Pc)', val: `${formatDec(millingResult.Pc, 2)} kW` },
        { lbl: 'Torque (Mc)', val: `${formatDec(millingResult.Mc, 2)} N·m` },
      ];
    }

    if (activeFamily === 'furar' && drillingResult) {
      return [
        { lbl: 'Avanço por rotação (fn)', val: `${formatDec(drillingResult.fn, 2)} mm/rot` },
        ...(drillingResult.peckStep !== null ? [{ lbl: 'Passo do pica-pau (Q)', val: `${formatDec(drillingResult.peckStep, 2)} mm` }] : []),
        { lbl: 'Relação balanço/diâmetro (L/D)', val: formatDec(drillingResult.LD, 1), isAlert: drillingResult.LD > 4 },
        { lbl: 'Taxa de remoção (MRR)', val: `${formatDec(drillingResult.Q, 2)} cm³/min` },
        { lbl: 'Velocidade de corte real (vc)', val: `${formatDec(drillingResult.vcReal, 1)} m/min` },
        { lbl: 'Potência de corte na aresta (Pc)', val: `${formatDec(drillingResult.Pc, 2)} kW` },
        { lbl: 'Torque (Mc)', val: `${formatDec(drillingResult.Mc, 1)} N·m` },
      ];
    }

    if (activeFamily === 'roscar' && threadingResult) {
      return [
        { lbl: 'Diâmetro nominal (D)', val: `${formatDec(Number(inp.D), 1)} mm` },
        { lbl: 'Passo da rosca (P)', val: `${formatDec(threadingResult.pitch, 2)} mm` },
        { lbl: 'Relação balanço/diâmetro (L/D)', val: formatDec(threadingResult.LD, 1), isAlert: threadingResult.LD > 4 },
        { lbl: 'Taxa de remoção (MRR)', val: `${formatDec(threadingResult.Q, 2)} cm³/min` },
        { lbl: 'Velocidade de corte real (vc)', val: `${formatDec(threadingResult.vcReal, 1)} m/min` },
        { lbl: 'Potência de corte na aresta (Pc)', val: `${formatDec(threadingResult.Pc, 2)} kW` },
        { lbl: 'Torque (Mc)', val: `${formatDec(threadingResult.Mc, 1)} N·m` },
      ];
    }

    if (activeFamily === 'mandrilar' && boringResult) {
      return [
        { lbl: 'Profundidade derivada (ap)', val: `${formatDec(boringResult.ap, 1)} mm` },
        { lbl: 'Diâmetro de corte (Dc)', val: `${formatDec(boringResult.Dc, 1)} mm` },
        { lbl: 'Avanço por rotação (fn)', val: `${formatDec(boringResult.fn, 2)} mm/rot` },
        { lbl: 'Relação balanço/diâmetro (L/D)', val: formatDec(boringResult.LD, 1), isAlert: boringResult.LD > 4 },
        { lbl: 'Taxa de remoção (MRR)', val: `${formatDec(boringResult.Q, 2)} cm³/min` },
        { lbl: 'Velocidade de corte real (vc)', val: `${formatDec(boringResult.vcReal, 1)} m/min` },
        { lbl: 'Potência de corte na aresta (Pc)', val: `${formatDec(boringResult.Pc, 2)} kW` },
        { lbl: 'Torque (Mc)', val: `${formatDec(boringResult.Mc, 1)} N·m` },
      ];
    }

    return [];
  })();

  return (
    <div className="col-results-inner" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div id="hero-live" className="sr-only" role="status" aria-live="polite"></div>

      {/* STRIP DE STATUS DE CÁLCULO */}
      {!calculado ? (
        <div className="calc-status-strip">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="8" cy="8" r="7" />
              <line x1="8" y1="8" x2="8" y2="12" />
              <line x1="8" y1="4" x2="8.01" y2="4" />
            </svg>
            <span>Aguardando definição dos parâmetros para cálculo</span>
          </div>
          <span className="num" style={{ fontSize: '11px', opacity: 0.85 }}>Painel Zerado</span>
        </div>
      ) : (
        <div className="calc-status-strip in-sync">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8.5 L6.5 12 L13 4.5" />
            </svg>
            <span>Parâmetros de corte calculados e em dia com a montagem</span>
          </div>
          <span className="num" style={{ fontSize: '11px', opacity: 0.85 }}>Sincronizado</span>
        </div>
      )}

      {/* AVISO DE MARGEM DE SEGURANÇA ATIVA */}
      {hasSafetyMargin && (
        <div
          className="card"
          role="status"
          aria-label="Aviso de margem ativa"
          style={{
            padding: '12px 16px',
            backgroundColor: 'var(--st-info-bg)',
            color: 'var(--st-info-ink)',
            borderLeft: '4px solid var(--accent-blue)',
            fontSize: '12px',
            lineHeight: 1.4,
          }}
        >
          <strong>Margem de Segurança Ativa: {safetyMargin}% do nominal.</strong>{' '}
          Rotação, avanço e potências estão escalados pela lente; grandezas físicas de verificação (hm, hex, CTF, L/D, kc) e alertas descrevem o esforço real não atenuado.
        </div>
      )}

      {/* Z2 — TARJA DE SEGURANÇA E DIAGNÓSTICO */}
      <div className={`alert-band ${alertClass}`} role="alert">
        <div className={`chip ${alertClass}`}>{safetyLevel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tx-1)' }}>{alertTitle}</div>
          <div className="prose">{alertBody}</div>
        </div>
      </div>

      {/* Z3 — RESUMO DE PARÂMETROS */}
      <div className="z3">
        {z3Pairs.map((p, idx) => (
          <React.Fragment key={p.label}>
            {idx > 0 && <span className="funit" aria-hidden="true">·</span>}
            <span className="z3pair">
              <span className="lbl" style={{ flex: 'none' }}>{p.label}</span>
              <span className="z3name">{p.val}</span>
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Z4 — NÚMEROS DE COMANDO (S E F) */}
      <div className="hero-grid" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {/* CARTÃO HERÓI: S (ROTAÇÃO) */}
        <div
          className={`rcard rcard-hero ${sOffsetPercent !== 0 ? 'manual-edit' : ''}`}
          data-hero="s"
          style={{ flex: '1 1 240px' }}
        >
          <div className="rcard-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="hero-addr-badge">S</span>
              <div className="lbl">Rotação do fuso (<span className="sym">n</span>)</div>
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
              aria-disabled={!calculado || sOffsetPercent <= -95}
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
              aria-disabled={!calculado}
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
                title="Voltar ao valor calculado, sem ajuste"
              >
                ⟲ Padrão
              </button>
            </div>
          )}
        </div>

        {/* CARTÃO HERÓI: F (AVANÇO) */}
        <div
          className={`rcard rcard-hero ${fOffsetPercent !== 0 ? 'manual-edit' : ''}`}
          data-hero="f"
          style={{ flex: isRoscar ? '1 1 260px' : '1 1 240px' }}
        >
          <div className="rcard-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="hero-addr-badge">F</span>
              <div className="lbl">
                {isRoscar ? 'Avanço da mesa (' : 'Velocidade de avanço ('}
                <span className="sym">vf</span>)
              </div>
            </div>
            {isRoscar && (
              <span className="tag tag-info">Rosqueamento Sincronizado</span>
            )}
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
                aria-disabled={!calculado || fOffsetPercent <= -95}
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
                aria-disabled={!calculado}
                onClick={() => adjustFeed(5)}
                aria-label="Aumentar avanço em 5 por cento"
              >
                +
              </button>
            )}
          </div>

          {isRoscar ? (
            <div className="lbl" style={{ textTransform: 'none', color: 'var(--tx-3)', marginTop: '4px' }}>
              passo (P) {formatDec(Number(inp.pitch || 1.25), 2)} mm × rotação (n) · avanço travado
            </div>
          ) : fOffsetPercent !== 0 ? (
            <div className="hero-base">
              <span>calculado {formatInt(fBase)} mm/min</span>
              <button
                type="button"
                className="btn-revert btn-revert-hero"
                onClick={resetAdjustments}
                title="Voltar ao valor calculado, sem ajuste"
              >
                ⟲ Padrão
              </button>
            </div>
          ) : null}
        </div>

        {/* CARTÃO ADICIONAL Q (PASSO PICA-PAU EM FURAÇÃO) */}
        {isFurar && (
          <div className="rcard rcard-hero" style={{ flex: '0 1 180px' }}>
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

      {/* Z5 — GAVETA "O QUE VAI ACONTECER" (D9 RECOLHIDO POR PADRÃO) */}
      <div className="drawer">
        <button
          type="button"
          className="dtrigger"
          id="trig-z5"
          aria-expanded={z5Open}
          aria-controls="panel-z5"
          onClick={() => setZ5Open(!z5Open)}
        >
          <svg
            className="chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: z5Open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s ease' }}
          >
            <path d="M6 3.5 L11 8 L6 12.5" />
          </svg>
          <span className="lbl" style={{ flex: 'none' }}>O que vai acontecer</span>
          <span className="dhint">
            {safetyLevel === 'CRÍTICO'
              ? 'alerta crítico ativo'
              : safetyLevel === 'ATENÇÃO'
              ? 'vibração pela relação balanço/diâmetro'
              : calculado
              ? 'previsão estável'
              : 'aguardando cálculo'}
          </span>
        </button>
        {z5Open && (
          <div id="panel-z5" className="dbody dbody--col" style={{ gap: '8px' }}>
            <div className="prose">
              {calculado
                ? `Operação em ${activeFamily.toUpperCase()}: Esforço de corte previsto com potência de ${formatDec(result?.Pc, 2)} kW e torque de ${formatDec(result?.Mc, 1)} N·m. ` +
                  (result?.LD && result.LD > 4 ? `Atenção à deflexão da haste (L/D = ${formatDec(result.LD, 1)}).` : 'Parâmetros dentro da zona estável.')
                : 'Aguardando execução do cálculo para análise de esforços e estabilidade do corte.'}
            </div>
          </div>
        )}
      </div>

      {/* Z6 — GAVETA "O QUE MEXER" (D9 RECOLHIDO POR PADRÃO) */}
      <div className="drawer">
        <button
          type="button"
          className="dtrigger"
          id="trig-z6"
          aria-expanded={z6Open}
          aria-controls="panel-z6"
          onClick={() => setZ6Open(!z6Open)}
        >
          <svg
            className="chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: z6Open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s ease' }}
          >
            <path d="M6 3.5 L11 8 L6 12.5" />
          </svg>
          <span className="lbl" style={{ flex: 'none' }}>O que mexer</span>
          <span className="dhint">
            {calculado ? 'direções de ajuste e redução de vibração' : 'direções de ajuste'}
          </span>
        </button>
        {z6Open && (
          <div id="panel-z6" className="dbody dbody--col" style={{ gap: '16px' }}>
            {calculado ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tx-1)' }}>
                    Redução de Vibração Anti-Vibração
                  </div>
                  <div className="lbl" style={{ color: 'var(--st-warn-ink)' }}>DIREÇÃO RECOMENDADA</div>
                </div>
                <div className="qline">Reduzir penetração de trabalho (ae) mantendo avanço (fz/fn)</div>
                <div className="prose">
                  Diminuir ae reduz o arco de contato e o esforço radial que excita harmônicos na ferramenta com balanço longo.
                </div>
                <div className="prose" style={{ color: 'var(--tx-3)' }}>
                  Contrapartida: ligeiro aumento no tempo de usinagem por passe.
                </div>
              </div>
            ) : (
              <div className="prose">
                Selecione o material e a ferramenta para visualizar as direções canônicas de ajuste.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Z7 — RESUMO GERAL EM CARTÕES BAIXOS */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="lbl">RESUMO GERAL</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {z7Cards.map((c, idx) => (
            <div key={idx} className="rcard">
              <div className="lbl">{c.lbl}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span className="u20" style={c.isAlert ? { color: 'var(--st-warn-ink)' } : {}}>
                  {c.val}
                </span>
                {c.isAlert && <span className="lbl" style={{ color: 'var(--st-warn-ink)' }}>ATENÇÃO</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
