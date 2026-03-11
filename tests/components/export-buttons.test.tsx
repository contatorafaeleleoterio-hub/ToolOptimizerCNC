import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ExportButtons, formatReport } from '@/components/export-buttons';
import { useMachiningStore } from '@/store';

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('ExportButtons', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders bug report button', () => {
    renderWithRouter(<ExportButtons />);
    expect(screen.getByText('Reportar Bug')).toBeInTheDocument();
  });

  it('renders history button', () => {
    renderWithRouter(<ExportButtons />);
    expect(screen.getByText('Histórico')).toBeInTheDocument();
  });

  it('renders settings button', () => {
    renderWithRouter(<ExportButtons />);
    expect(screen.getByText('Configurações')).toBeInTheDocument();
  });
});

describe('formatReport', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('returns empty string when no result', () => {
    const state = useMachiningStore.getState();
    expect(formatReport(state)).toBe('');
  });

  it('includes header', () => {
    useMachiningStore.getState().calcular();
    const text = formatReport(useMachiningStore.getState());
    expect(text).toContain('ToolOptimizer CNC');
  });

  it('includes material name', () => {
    useMachiningStore.getState().calcular();
    const text = formatReport(useMachiningStore.getState());
    expect(text).toContain('Material:');
  });

  it('includes RPM and feed values', () => {
    useMachiningStore.getState().calcular();
    const text = formatReport(useMachiningStore.getState());
    expect(text).toContain('RPM:');
    expect(text).toContain('mm/min');
  });

  it('includes safety level', () => {
    useMachiningStore.getState().calcular();
    const text = formatReport(useMachiningStore.getState());
    expect(text).toContain('SEGURANÇA:');
  });

  it('includes warnings when present', () => {
    const store = useMachiningStore.getState();
    store.setFerramenta({ balanco: 50, diametro: 10 });
    store.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 }); // explicit params
    store.calcular();
    const text = formatReport(useMachiningStore.getState());
    expect(text).toContain('L/D');
  });
});
