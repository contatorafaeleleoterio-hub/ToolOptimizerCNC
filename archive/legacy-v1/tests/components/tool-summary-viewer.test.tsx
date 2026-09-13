import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ToolSummaryViewer } from '@/components/tool-summary-viewer';
import { useMachiningStore } from '@/store';

function renderViewer() {
  return render(<BrowserRouter><ToolSummaryViewer /></BrowserRouter>);
}

describe('ToolSummaryViewer', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders the summary container', () => {
    renderViewer();
    expect(screen.getByTestId('tool-summary')).toBeInTheDocument();
  });

  // GROUP 1 — Identity
  it('shows material name', () => {
    renderViewer();
    expect(screen.getByText('Aço 1045')).toBeInTheDocument();
  });

  it('shows operation type', () => {
    renderViewer();
    expect(screen.getByText('Desbaste')).toBeInTheDocument();
  });

  it('shows diameter value', () => {
    renderViewer();
    expect(screen.getByText('Ø6mm')).toBeInTheDocument();
  });

  it('shows tool type', () => {
    renderViewer();
    expect(screen.getByText('Toroidal')).toBeInTheDocument();
  });

  it('shows corner radius for toroidal', () => {
    renderViewer();
    expect(screen.getByText('R1')).toBeInTheDocument();
  });

  it('shows corner radius = R(D/2) for esferica', () => {
    useMachiningStore.getState().setFerramenta({ tipo: 'esferica' });
    renderViewer();
    expect(screen.getByText('R3')).toBeInTheDocument();
  });

  it('shows N/A for topo corner radius', () => {
    useMachiningStore.getState().setFerramenta({ tipo: 'topo' });
    renderViewer();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('shows altura de fixacao', () => {
    renderViewer();
    expect(screen.getByText('25mm')).toBeInTheDocument();
  });

  // GROUP 2 — Parameters
  it('shows Vc with full label and value', () => {
    renderViewer();
    expect(screen.getByText('Veloc. Corte')).toBeInTheDocument();
    expect(screen.getByText('100.00')).toBeInTheDocument();
    expect(screen.getByText('Vc')).toBeInTheDocument();
  });

  it('shows fz with full label and value (3 decimal places)', () => {
    renderViewer();
    expect(screen.getByText('Avanço/Dente')).toBeInTheDocument();
    expect(screen.getByText('0.100')).toBeInTheDocument();
    expect(screen.getByText('fz')).toBeInTheDocument();
  });

  it('shows ae with full label and value', () => {
    renderViewer();
    expect(screen.getByText('Eng. Radial')).toBeInTheDocument();
    expect(screen.getByText('5.00')).toBeInTheDocument();
    expect(screen.getByText('ae')).toBeInTheDocument();
  });

  it('shows ap with full label and value', () => {
    renderViewer();
    expect(screen.getByText('Prof. Axial')).toBeInTheDocument();
    expect(screen.getByText('2.00')).toBeInTheDocument();
    expect(screen.getByText('ap')).toBeInTheDocument();
  });
});
