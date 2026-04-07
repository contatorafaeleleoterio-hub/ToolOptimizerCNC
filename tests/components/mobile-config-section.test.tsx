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

  it('renders tool type buttons (inside Ferramenta accordion)', () => {
    renderSection();
    // Open Ferramenta accordion
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getAllByText('Toroidal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Topo/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders diameter free input (not dropdown)', () => {
    renderSection();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByLabelText('Diâmetro (mm)')).toBeInTheDocument();
  });

  it('renders flute count buttons (2Z, 4Z)', () => {
    renderSection();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByText('2Z')).toBeInTheDocument();
    expect(screen.getByText('4Z')).toBeInTheDocument();
  });

  it('renders altura de fixação free input', () => {
    renderSection();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByLabelText('Altura de Fixação (mm)')).toBeInTheDocument();
  });

  it('renders cutting parameter inputs (ap, ae, fz, Vc)', () => {
    renderSection();
    // Open Parâmetros de Corte accordion
    fireEvent.click(screen.getByText('Parâmetros de Corte'));
    expect(screen.getByText('ap (mm)')).toBeInTheDocument();
    expect(screen.getByText('ae (mm)')).toBeInTheDocument();
    expect(screen.getByText('fz (mm)')).toBeInTheDocument();
    expect(screen.getByText('Vc (m/min)')).toBeInTheDocument();
  });

  it('shows Raio da Ponta section for toroidal (default)', () => {
    renderSection();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByLabelText('Raio da Ponta (mm)')).toBeInTheDocument();
  });

  it('hides Raio da Ponta when switching to topo', () => {
    renderSection();
    fireEvent.click(screen.getByText('Ferramenta'));
    const topoBtn = screen.getAllByText(/^Topo/)[0];
    fireEvent.click(topoBtn);
    expect(screen.queryByLabelText('Raio da Ponta (mm)')).not.toBeInTheDocument();
  });

  it('changes material when select value changes', () => {
    renderSection();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '3' } });
    expect(useMachiningStore.getState().materialId).toBe(3);
  });

  it('changes flute count when clicking 2Z button', () => {
    renderSection();
    fireEvent.click(screen.getByText('Ferramenta'));
    fireEvent.click(screen.getByText('2Z'));
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(2);
  });

  it('shows estimated badge for estimated material', () => {
    renderSection();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '4' } });
    expect(screen.getByText('Dados estimados')).toBeInTheDocument();
  });

  it('renders safety factor section', () => {
    renderSection();
    expect(screen.getByText('Fator de Correção')).toBeInTheDocument();
  });

  it('renders saved tools empty state', () => {
    renderSection();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByText('Nenhuma ferramenta salva')).toBeInTheDocument();
  });

  it('renders save tool button', () => {
    renderSection();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByRole('button', { name: 'Salvar ferramenta' })).toBeInTheDocument();
  });

  it('arestas has 4 options [2, 3, 4, 6] — no 5Z', () => {
    renderSection();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByText('2Z')).toBeInTheDocument();
    expect(screen.getByText('3Z')).toBeInTheDocument();
    expect(screen.getByText('4Z')).toBeInTheDocument();
    expect(screen.getByText('6Z')).toBeInTheDocument();
    expect(screen.queryByText('5Z')).not.toBeInTheDocument();
  });
});
