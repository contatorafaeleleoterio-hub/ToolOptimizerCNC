import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ResultsPanel } from '@/components/results-panel';
import { useMachiningStore } from '@/store';

function renderPanel() {
  return render(<BrowserRouter><ResultsPanel /></BrowserRouter>);
}

/** Setup store with safe explicit params so auto-populate doesn't interfere */
function setupSafeCalc(balanco = 20) {
  const s = useMachiningStore.getState();
  s.setFerramenta({ diametro: 10, balanco });
  s.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
  s.calcular();
}

describe('ResultsPanel', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('shows zeroed results when no simulation yet', () => {
    renderPanel();
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  it('renders tool summary viewer', () => {
    renderPanel();
    expect(screen.getByTestId('tool-summary')).toBeInTheDocument();
  });

  it('shows calculated results after calcular()', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getAllByText('Rotação (RPM)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Avanço (mm/min)').length).toBeGreaterThan(0);
    // Zona 6 — Detalhes e Fórmulas (colapsável, mas os testids ficam no DOM)
    expect(screen.getByText('Potência Estimada')).toBeInTheDocument();
  });

  it('shows safety badge', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  it('shows big numbers section', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getAllByText('Rotação (RPM)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Avanço (mm/min)').length).toBeGreaterThanOrEqual(1);
  });

  it('shows progress cards', () => {
    setupSafeCalc();
    renderPanel();
    // Zona 6 — Detalhes e Fórmulas: linhas de resultado calculado
    expect(screen.getByText('Potência Estimada')).toBeInTheDocument();
    expect(screen.getByText('Vc Real')).toBeInTheDocument();
    expect(screen.getByText('MRR')).toBeInTheDocument();
    // Torque foi removido da UI (Sessão 4 — DS 80-20)
    expect(screen.queryByText('Torque')).not.toBeInTheDocument();
    // Zona 5 — Gauges ainda presentes
    expect(screen.getByText('Produtividade MRR')).toBeInTheDocument();
  });

  it('shows warnings when L/D is critical', () => {
    setupSafeCalc(50); // L/D = 5.0 → vermelho
    renderPanel();
    const resultado = useMachiningStore.getState().resultado;
    expect(resultado?.seguranca.nivel).toBe('vermelho');
    // LCD display shows action line when level is vermelho
    expect(screen.getAllByText(/REDUZIR|VERIFICAR|CRÍTICO/i).length).toBeGreaterThan(0);
  });

  it('shows RPM values as formatted numbers', () => {
    setupSafeCalc();
    renderPanel();
    const resultado = useMachiningStore.getState().resultado!;
    const rpmFormatted = Math.round(resultado.rpm).toLocaleString('pt-BR');
    expect(screen.getAllByText(rpmFormatted).length).toBeGreaterThan(0);
  });

  it('shows BLOQUEADO when L/D > 6', () => {
    setupSafeCalc(70); // L/D = 7.0 → bloqueado
    renderPanel();
    expect(screen.getAllByText('BLOQUEADO')[0]).toBeInTheDocument();
  });

  it('renders bidirectional slider for RPM', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByLabelText('Rotação (RPM) slider')).toBeInTheDocument();
  });

  it('renders bidirectional slider for Feed', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByLabelText('Avanço (mm/min) slider')).toBeInTheDocument();
  });

  it('renders +/- buttons for RPM', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByLabelText('Decrease Rotação (RPM)')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase Rotação (RPM)')).toBeInTheDocument();
  });

  it('manual RPM override recalculates', () => {
    setupSafeCalc();
    renderPanel();
    const increaseBtn = screen.getByLabelText('Increase Rotação (RPM)');
    const initialRpm = useMachiningStore.getState().resultado!.rpm;
    fireEvent.click(increaseBtn);
    const newRpm = useMachiningStore.getState().resultado!.rpm;
    expect(newRpm).toBeGreaterThan(initialRpm);
  });

  // ─── Fase 4: Fix calcular() atomico ──────────────────────────────────────

  it('baseRPM and resultado.rpm are in sync after calcular()', () => {
    setupSafeCalc();
    const state = useMachiningStore.getState();
    expect(state.baseRPM).toBe(state.resultado!.rpm);
  });

  it('setManualRPMPercent updates feed when feed is not manually set', () => {
    setupSafeCalc();
    const store = useMachiningStore.getState();
    const initialAvanco = store.resultado!.avanco;
    store.setManualRPMPercent(20);
    const newAvanco = useMachiningStore.getState().resultado!.avanco;
    expect(newAvanco).not.toBe(initialAvanco);
  });

  // ─── Sessão 4 (DS 80-20): herói + estado vazio honesto + chip SF + badge manual ──

  it('shows dash placeholders in hero before first simulation (no fake zeros)', () => {
    renderPanel();
    // Duas ocorrências: RPM e Avanço
    expect(screen.getAllByText('—', { selector: 'span.text-6xl' }).length).toBe(2);
  });

  it('does not show a fake timestamp before any simulation', () => {
    renderPanel();
    // Sem histórico ainda: nenhum timestamp DD/MM/YYYY deveria aparecer
    expect(screen.queryByText(/^\d{2}\/\d{2}\/\d{4}/)).not.toBeInTheDocument();
  });

  it('shows SF chip only when safety factor differs from the 0.80 default', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.queryByText(/^SF \d+%$/)).not.toBeInTheDocument();
  });

  it('shows SF chip when safety factor is changed from default', () => {
    const s = useMachiningStore.getState();
    s.setFerramenta({ diametro: 10, balanco: 20 });
    s.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    s.setSafetyFactor(0.7);
    s.calcular();
    renderPanel();
    expect(screen.getByText('SF 70%')).toBeInTheDocument();
  });

  it('shows manual badge when parameters diverge from the recommendation engine', () => {
    // setupSafeCalc já usa valores fixos de teste que não batem com a tabela de recomendação
    setupSafeCalc();
    renderPanel();
    expect(screen.getAllByText('manual').length).toBeGreaterThanOrEqual(1);
  });
});
