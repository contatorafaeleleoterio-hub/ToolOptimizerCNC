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

  it('shows cutting parameters', () => {
    renderViewer();
    expect(screen.getByText('100.00')).toBeInTheDocument(); // Vc (toFixed(2))
    expect(screen.getByText('0.10')).toBeInTheDocument(); // fz (toFixed(2))
  });
});
