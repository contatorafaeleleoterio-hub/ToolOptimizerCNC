import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { MobileConfigSection } from '@/components/mobile/mobile-config-section';
import { useMachiningStore } from '@/store';

function renderSection() {
  return render(
    <BrowserRouter>
      <MobileConfigSection />
    </BrowserRouter>,
  );
}

describe('MobileConfigSection', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
  });

  it('renders material select with 9 options', () => {
    renderSection();
    const selects = screen.getAllByRole('combobox');
    const materialSelect = selects[0];
    expect(materialSelect.querySelectorAll('option').length).toBe(9);
  });

  it('renders 3 operation type radios (Desbaste, Semi-Acab., Acabamento)', () => {
    renderSection();
    expect(screen.getByText('Desbaste')).toBeInTheDocument();
    expect(screen.getByText('Semi-Acab.')).toBeInTheDocument();
    expect(screen.getByText('Acabamento')).toBeInTheDocument();
  });

  it('renders tool type buttons', () => {
    renderSection();
    expect(screen.getAllByText('Toroidal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Topo/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders diameter select', () => {
    renderSection();
    const selects = screen.getAllByRole('combobox');
    // Diameter is the second select (after material)
    expect(selects.length).toBeGreaterThanOrEqual(2);
    expect(selects[1].querySelectorAll('option').length).toBeGreaterThan(0);
  });

  it('renders flute count buttons (2 Arestas, 4 Arestas)', () => {
    renderSection();
    expect(screen.getByText('2 Arestas')).toBeInTheDocument();
    expect(screen.getByText('4 Arestas')).toBeInTheDocument();
  });

  it('renders height increase/decrease buttons', () => {
    renderSection();
    expect(screen.getByLabelText('Increase height')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrease height')).toBeInTheDocument();
  });

  it('renders cutting parameter inputs (ap, ae, fz, Vc)', () => {
    renderSection();
    expect(screen.getByText('ap (mm)')).toBeInTheDocument();
    expect(screen.getByText('ae (mm)')).toBeInTheDocument();
    expect(screen.getByText('fz (mm)')).toBeInTheDocument();
    expect(screen.getByText('Vc (m/min)')).toBeInTheDocument();
  });

  it('shows Raio da Ponta section for toroidal (default)', () => {
    renderSection();
    expect(screen.getByText('Raio da Ponta')).toBeInTheDocument();
  });

  it('hides Raio da Ponta when switching to topo', () => {
    renderSection();
    // Click on Topo button (text might be partial — use regex or exact)
    const topoBtn = screen.getAllByText(/^Topo/)[0];
    fireEvent.click(topoBtn);
    expect(screen.queryByText('Raio da Ponta')).not.toBeInTheDocument();
  });

  it('changes material when select value changes', () => {
    renderSection();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '3' } });
    expect(useMachiningStore.getState().materialId).toBe(3);
  });

  it('changes flute count when clicking 2 Arestas', () => {
    renderSection();
    fireEvent.click(screen.getByText('2 Arestas'));
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(2);
  });

  it('shows estimated badge for estimated material', () => {
    renderSection();
    const selects = screen.getAllByRole('combobox');
    // Material id 4 is typically 'estimado' — find one that is estimated
    // Default store has MATERIAIS — select material 4 (Aço 8620)
    fireEvent.change(selects[0], { target: { value: '4' } });
    expect(screen.getByText('Dados estimados')).toBeInTheDocument();
  });

  it('renders safety factor section', () => {
    renderSection();
    expect(screen.getByText('Fator de Segurança')).toBeInTheDocument();
  });
});
