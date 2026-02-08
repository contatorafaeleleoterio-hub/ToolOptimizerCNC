import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ConfigPanel } from '@/components/config-panel';
import { useMachiningStore } from '@/store';

describe('ConfigPanel', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders Simular button', () => {
    render(<ConfigPanel />);
    expect(screen.getByText('Simular')).toBeInTheDocument();
  });

  it('renders material select with all 9 materials', () => {
    render(<ConfigPanel />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    const options = select.querySelectorAll('option');
    expect(options.length).toBe(9);
  });

  it('renders 3 operation type radio buttons', () => {
    render(<ConfigPanel />);
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(3);
  });

  it('renders tool type buttons', () => {
    render(<ConfigPanel />);
    expect(screen.getByText('Toroidal')).toBeInTheDocument();
    expect(screen.getByText('Topo')).toBeInTheDocument();
  });

  it('renders diameter quick-select buttons', () => {
    render(<ConfigPanel />);
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('renders cutting parameter inputs', () => {
    render(<ConfigPanel />);
    expect(screen.getByText('ap (mm)')).toBeInTheDocument();
    expect(screen.getByText('ae (mm)')).toBeInTheDocument();
    expect(screen.getByText('fz (mm)')).toBeInTheDocument();
    expect(screen.getByText('Vc (m/min)')).toBeInTheDocument();
  });

  it('renders machine limit inputs', () => {
    render(<ConfigPanel />);
    expect(screen.getByText('Max RPM')).toBeInTheDocument();
    expect(screen.getByText('Max kW')).toBeInTheDocument();
  });

  it('renders safety factor slider', () => {
    render(<ConfigPanel />);
    expect(screen.getByText('Fator de Segurança')).toBeInTheDocument();
    expect(screen.getByText('0.80')).toBeInTheDocument();
  });

  it('changes material when select changes', () => {
    render(<ConfigPanel />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '4' } });
    expect(useMachiningStore.getState().materialId).toBe(4);
  });

  it('changes operation type on radio click', () => {
    render(<ConfigPanel />);
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[2]); // Acabamento
    expect(useMachiningStore.getState().tipoOperacao).toBe('acabamento');
  });

  it('changes tool diameter on quick-select click', () => {
    render(<ConfigPanel />);
    fireEvent.click(screen.getByText('16'));
    expect(useMachiningStore.getState().ferramenta.diametro).toBe(16);
  });

  it('calculates on Simular click', () => {
    render(<ConfigPanel />);
    fireEvent.click(screen.getByText('Simular'));
    expect(useMachiningStore.getState().resultado).not.toBeNull();
  });

  it('resets state on reset button click', () => {
    const store = useMachiningStore.getState();
    store.setMaterial(4);
    store.calcular();
    render(<ConfigPanel />);
    const resetBtn = screen.getByText('restart_alt').closest('button')!;
    fireEvent.click(resetBtn);
    expect(useMachiningStore.getState().materialId).toBe(2);
    expect(useMachiningStore.getState().resultado).toBeNull();
  });

  it('shows estimated badge for estimated materials', () => {
    render(<ConfigPanel />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '4' } });
    expect(screen.getByText('Dados estimados')).toBeInTheDocument();
  });
});
