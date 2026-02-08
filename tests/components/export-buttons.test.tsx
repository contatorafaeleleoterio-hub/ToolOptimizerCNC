import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ExportButtons, formatReport } from '@/components/export-buttons';
import { useMachiningStore } from '@/store';

describe('ExportButtons', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders copy button', () => {
    render(<ExportButtons />);
    expect(screen.getByText('Copiar')).toBeInTheDocument();
  });

  it('disables button when no result', () => {
    render(<ExportButtons />);
    const btn = screen.getByRole('button', { name: /copiar/i });
    expect(btn).toBeDisabled();
  });

  it('enables button when result exists', () => {
    useMachiningStore.getState().calcular();
    render(<ExportButtons />);
    const btn = screen.getByRole('button', { name: /copiar/i });
    expect(btn).not.toBeDisabled();
  });

  it('calls clipboard API on click', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });
    useMachiningStore.getState().calcular();
    render(<ExportButtons />);
    fireEvent.click(screen.getByRole('button', { name: /copiar/i }));
    await waitFor(() => { expect(writeTextMock).toHaveBeenCalled(); });
  });

  it('shows success feedback after copy', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    useMachiningStore.getState().calcular();
    render(<ExportButtons />);
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
    const state = useMachiningStore.getState();
    const text = formatReport(state);
    expect(text).toContain('ToolOptimizer CNC');
  });

  it('includes material name', () => {
    useMachiningStore.getState().calcular();
    const state = useMachiningStore.getState();
    const text = formatReport(state);
    expect(text).toContain('Material:');
  });

  it('includes RPM and feed values', () => {
    useMachiningStore.getState().calcular();
    const state = useMachiningStore.getState();
    const text = formatReport(state);
    expect(text).toContain('RPM:');
    expect(text).toContain('mm/min');
  });

  it('includes safety level', () => {
    useMachiningStore.getState().calcular();
    const state = useMachiningStore.getState();
    const text = formatReport(state);
    expect(text).toContain('SEGURO');
  });

  it('includes warnings when present', () => {
    const store = useMachiningStore.getState();
    store.setFerramenta({ balanco: 50, diametro: 10 });
    store.calcular();
    const state = useMachiningStore.getState();
    const text = formatReport(state);
    expect(text).toContain('L/D');
  });
});
