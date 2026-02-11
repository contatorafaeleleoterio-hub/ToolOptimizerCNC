import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ExportButtons, formatReport } from '@/components/export-buttons';
import { useMachiningStore } from '@/store';

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('ExportButtons', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders copy button', () => {
    renderWithRouter(<ExportButtons />);
    expect(screen.getByText('Copiar')).toBeInTheDocument();
  });

  it('renders settings button', () => {
    renderWithRouter(<ExportButtons />);
    expect(screen.getByText('Configurações')).toBeInTheDocument();
  });

  it('disables copy button when no result', () => {
    renderWithRouter(<ExportButtons />);
    const btn = screen.getByRole('button', { name: /copiar/i });
    expect(btn).toBeDisabled();
  });

  it('enables copy button when result exists', () => {
    useMachiningStore.getState().calcular();
    renderWithRouter(<ExportButtons />);
    const btn = screen.getByRole('button', { name: /copiar/i });
    expect(btn).not.toBeDisabled();
  });

  it('calls clipboard API on click', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });
    useMachiningStore.getState().calcular();
    renderWithRouter(<ExportButtons />);
    fireEvent.click(screen.getByRole('button', { name: /copiar/i }));
    await waitFor(() => { expect(writeTextMock).toHaveBeenCalled(); });
  });

  it('shows success feedback after copy', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    useMachiningStore.getState().calcular();
    renderWithRouter(<ExportButtons />);
    fireEvent.click(screen.getByRole('button', { name: /copiar/i }));
    await waitFor(() => { expect(screen.getByText('Copiado!')).toBeInTheDocument(); });
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
