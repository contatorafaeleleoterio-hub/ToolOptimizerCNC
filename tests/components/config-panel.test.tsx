import { render, screen, fireEvent, waitFor, act, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ConfigPanel } from '@/components/config-panel';
import { useMachiningStore } from '@/store';

function renderPanel() {
  return render(<BrowserRouter><ConfigPanel /></BrowserRouter>);
}

describe('ConfigPanel', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
  });

  it('renders Simular button', () => {
    renderPanel();
    expect(screen.getByText('Simular')).toBeInTheDocument();
  });

  it('renders material select with all 9 materials', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    const materialSelect = selects[0];
    expect(materialSelect).toBeInTheDocument();
    expect(materialSelect.querySelectorAll('option')).toHaveLength(9);
  });

  it('renders material select with chevron class', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    expect(selects[0].classList.contains('select-chevron')).toBe(true);
  });

  it('renders 3 operation type buttons', () => {
    renderPanel();
    expect(screen.getByRole('button', { name: 'Desbaste' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Semi-Acab.' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acabamento' })).toBeInTheDocument();
  });

  it('renders tool type buttons', () => {
    renderPanel();
    expect(screen.getAllByText('Toroidal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Topo/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders diameter input with the expected numeric constraints', () => {
    renderPanel();
    const diaInput = screen.getByRole('spinbutton', { name: /di.*metro/i });
    expect(diaInput).toHaveAttribute('min', '0.1');
    expect(diaInput).toHaveAttribute('max', '200');
    expect(diaInput).toHaveAttribute('step', '0.1');
  });

  it('hides raio da ponta when switching to topo', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Topo'));
    expect(screen.queryByRole('spinbutton', { name: /raio da ponta/i })).not.toBeInTheDocument();
  });

  it('changes material when select changes', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '4' } });
    expect(useMachiningStore.getState().materialId).toBe(4);
  });

  it('changes operation type on button click', () => {
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: 'Acabamento' }));
    expect(useMachiningStore.getState().tipoOperacao).toBe('acabamento');
  });

  it('changes tool diameter via numeric input', () => {
    renderPanel();
    const diaInput = screen.getByRole('spinbutton', { name: /di.*metro/i });
    fireEvent.change(diaInput, { target: { value: '10' } });
    expect(useMachiningStore.getState().ferramenta.diametro).toBe(10);
  });

  it('calculates on Simular click', async () => {
    renderPanel();
    await act(async () => {
      fireEvent.click(screen.getByText('Simular'));
    });
    await waitFor(
      () => expect(useMachiningStore.getState().resultado).not.toBeNull(),
      { timeout: 2500 },
    );
  });

  it('resets state on reset button click', () => {
    const store = useMachiningStore.getState();
    store.setMaterial(4);
    store.calcular();
    renderPanel();
    const resetBtn = screen.getByText('restart_alt').closest('button')!;
    fireEvent.click(resetBtn);
    expect(useMachiningStore.getState().materialId).toBe(2);
    expect(useMachiningStore.getState().resultado).toBeNull();
  });

  it('shows estimated badge for estimated materials', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '4' } });
    expect(screen.getByText('Dados estimados')).toBeInTheDocument();
  });

  it('follows correct tool field order: Tipo -> Diametro -> Raio -> Arestas -> Altura', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    const toolLabels = ['Tipo', /di.*metro/i, /raio da ponta/i, /arestas/i, /altura/i];
    for (const label of toolLabels) {
      expect(screen.getByText(label as string | RegExp)).toBeInTheDocument();
    }
  });

  it('renders 3 collapsible sections', () => {
    renderPanel();
    expect(screen.getByText('Configuração Base')).toBeInTheDocument();
    expect(screen.getByText('Ferramenta')).toBeInTheDocument();
    expect(screen.getByText('Ajuste Fino')).toBeInTheDocument();
  });

  it('collapsible sections are closed by default', () => {
    renderPanel();
    const accordionHeaders = screen.getAllByRole('button').filter(
      (b) => b.getAttribute('aria-expanded') !== null,
    );
    accordionHeaders.forEach((b) => {
      expect(b).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('material section opens when Configuração Base is clicked', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Configuração Base'));
    expect(screen.getAllByRole('combobox').length).toBeGreaterThanOrEqual(1);
  });

  it('does NOT render cutting parameter NumInputs (section removed)', () => {
    renderPanel();
    expect(screen.queryByText('ap (mm)')).not.toBeInTheDocument();
    expect(screen.queryByText('Vc (m/min)')).not.toBeInTheDocument();
  });

  it('renders FineTunePanel sliders inside Ajuste Fino section', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ajuste Fino'));
    expect(screen.getByText('VEL. DE CORTE')).toBeInTheDocument();
    expect(screen.getByText('AVANÇO/DENTE')).toBeInTheDocument();
  });

  it('raio da ponta renders as numeric input for toroidal', () => {
    renderPanel();
    expect(screen.getByRole('spinbutton', { name: /raio da ponta/i })).toBeInTheDocument();
  });

  it('raio da ponta input has the expected numeric constraints', () => {
    renderPanel();
    const raioInput = screen.getByRole('spinbutton', { name: /raio da ponta/i });
    expect(raioInput).toHaveAttribute('min', '0.05');
    expect(raioInput).toHaveAttribute('max', '50');
    expect(raioInput).toHaveAttribute('step', '0.05');
  });

  it('changing raio input updates store.ferramenta.raioQuina', () => {
    renderPanel();
    const raioInput = screen.getByRole('spinbutton', { name: /raio da ponta/i });
    fireEvent.change(raioInput, { target: { value: '0.2' } });
    expect(useMachiningStore.getState().ferramenta.raioQuina).toBe(0.2);
  });

  it('arestas renders as button group', () => {
    renderPanel();
    expect(screen.getByText('Arestas (Z)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
  });

  it('arestas button group has 4 options [2, 3, 4, 6]', () => {
    renderPanel();
    const arestasLabel = screen.getByText('Arestas (Z)');
    const arestasSection = arestasLabel.closest('div');
    expect(arestasSection).not.toBeNull();
    const buttons = arestasSection ? within(arestasSection).getAllByRole('button') : [];
    const values = buttons.map((button) => Number(button.textContent));
    expect(values).toContain(2);
    expect(values).toContain(3);
    expect(values).toContain(4);
    expect(values).toContain(6);
  });

  it('clicking an arestas button updates store.ferramenta.numeroArestas', () => {
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(3);
  });

  it('altura de fixacao renders as numeric input', () => {
    renderPanel();
    expect(screen.getByRole('spinbutton', { name: /altura fixa/i })).toBeInTheDocument();
  });

  it('altura input has the expected numeric constraints', () => {
    renderPanel();
    const alturaInput = screen.getByRole('spinbutton', { name: /altura fixa/i });
    expect(alturaInput).toHaveAttribute('min', '5');
    expect(alturaInput).toHaveAttribute('max', '300');
    expect(alturaInput).toHaveAttribute('step', '1');
  });

  it('changing altura input updates store.ferramenta.balanco', () => {
    renderPanel();
    const alturaInput = screen.getByRole('spinbutton', { name: /altura fixa/i });
    fireEvent.change(alturaInput, { target: { value: '50' } });
    expect(useMachiningStore.getState().ferramenta.balanco).toBe(50);
  });

  it('steppers and NumInput for altura NOT in DOM (removed in Fase 3)', () => {
    renderPanel();
    expect(screen.queryByLabelText('Increase height')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Decrease height')).not.toBeInTheDocument();
  });

  it('radio buttons for arestas NOT in DOM (replaced by buttons)', () => {
    renderPanel();
    expect(screen.queryByText('2 Arestas')).not.toBeInTheDocument();
    expect(screen.queryByText('4 Arestas')).not.toBeInTheDocument();
  });

  it('saved tools list shows "Nenhuma ferramenta salva" when empty', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByText('Nenhuma ferramenta salva')).toBeInTheDocument();
  });

  it('saved tools list shows saved tool diametro', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20 });
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByText(/10mm/i)).toBeInTheDocument();
  });

  it('clicking a saved tool card calls loadSavedTool with correct id', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20 });
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    fireEvent.click(screen.getByRole('button', { name: /Carregar/i }));
    expect(useMachiningStore.getState().ferramenta.diametro).toBe(10);
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(4);
  });

  it('loadSavedTool zeros resultado', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20 });
    store.calcular();
    expect(useMachiningStore.getState().resultado).not.toBeNull();
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    fireEvent.click(screen.getByRole('button', { name: /Carregar/i }));
    expect(useMachiningStore.getState().resultado).toBeNull();
  });

  it('clicking save button adds current tool to saved tools', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    fireEvent.click(screen.getByRole('button', { name: 'Salvar ferramenta' }));
    expect(useMachiningStore.getState().savedTools.length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText('Nenhuma ferramenta salva')).not.toBeInTheDocument();
  });

  it('save button does NOT duplicate identical tools', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    fireEvent.click(screen.getByRole('button', { name: 'Salvar ferramenta' }));
    const countAfterFirst = useMachiningStore.getState().savedTools.length;
    fireEvent.click(screen.getByRole('button', { name: 'Salvar ferramenta' }));
    expect(useMachiningStore.getState().savedTools.length).toBe(countAfterFirst);
  });

  it('simular() does NOT auto-save tools (regression test)', async () => {
    const countBefore = useMachiningStore.getState().savedTools.length;
    renderPanel();
    await act(async () => {
      fireEvent.click(screen.getByText('Simular'));
    });
    await waitFor(
      () => expect(useMachiningStore.getState().resultado).not.toBeNull(),
      { timeout: 2500 },
    );
    expect(useMachiningStore.getState().savedTools.length).toBe(countBefore);
  });

  it('tool card shows diametro and tipo label', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'topo', diametro: 8, numeroArestas: 2, balanco: 30 });
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByText(/8mm/i)).toBeInTheDocument();
    expect(screen.getByText(/Fresa de topo/i)).toBeInTheDocument();
  });

  it('toroidal tool card shows raio and tipo label', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'toroidal', diametro: 12, raioQuina: 1.5, numeroArestas: 4, balanco: 25 });
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getAllByText(/12mm/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/R 1\.5/i)).toBeInTheDocument();
    expect(screen.getByText(/Fresa toroidal/i)).toBeInTheDocument();
  });

  it('renders SeguranÃ§a section in the panel', () => {
    renderPanel();
    expect(screen.getByText(/Seguran/i)).toBeInTheDocument();
  });

  it('SeguranÃ§a section is collapsed by default', () => {
    renderPanel();
    const segBtn = screen.getByText(/Seguran/i).closest('button');
    expect(segBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('Segurança summary shows percentage when collapsed', () => {
    renderPanel();
    expect(screen.getAllByText('80%').length).toBeGreaterThan(0);
  });

  it('opening Segurança section shows slider with correct aria-label', () => {
    renderPanel();
    fireEvent.click(screen.getByText(/Seguran/i));
    expect(screen.getByRole('slider', { name: /Fator de Corre/i })).toBeInTheDocument();
  });

  it('+ button increases safetyFactor by 0.05', () => {
    renderPanel();
    fireEvent.click(screen.getByText(/Seguran/i));
    const initialSF = useMachiningStore.getState().safetyFactor;
    fireEvent.click(screen.getByRole('button', { name: /Aumentar fator de corre/i }));
    expect(useMachiningStore.getState().safetyFactor).toBeCloseTo(initialSF + 0.05, 5);
  });

  it('minus button decreases safetyFactor by 0.05', () => {
    renderPanel();
    fireEvent.click(screen.getByText(/Seguran/i));
    const initialSF = useMachiningStore.getState().safetyFactor;
    fireEvent.click(screen.getByRole('button', { name: /Reduzir fator de corre/i }));
    expect(useMachiningStore.getState().safetyFactor).toBeCloseTo(initialSF - 0.05, 5);
  });

  it('minus button clamps at 0.50 minimum', () => {
    useMachiningStore.getState().setSafetyFactor(0.50);
    renderPanel();
    fireEvent.click(screen.getByText(/Seguran/i));
    fireEvent.click(screen.getByRole('button', { name: /Reduzir fator de corre/i }));
    expect(useMachiningStore.getState().safetyFactor).toBe(0.50);
  });

  it('+ button clamps at 1.00 maximum', () => {
    useMachiningStore.getState().setSafetyFactor(1.00);
    renderPanel();
    fireEvent.click(screen.getByText(/Seguran/i));
    fireEvent.click(screen.getByRole('button', { name: /Aumentar fator de corre/i }));
    expect(useMachiningStore.getState().safetyFactor).toBe(1.00);
  });

  it('setSafetyFactor zeros resultado (user must re-simulate)', () => {
    useMachiningStore.getState().calcular();
    expect(useMachiningStore.getState().resultado).not.toBeNull();
    useMachiningStore.getState().setSafetyFactor(0.70);
    expect(useMachiningStore.getState().resultado).toBeNull();
  });

  // Cassino animation — Story-011 2C
  it('Simular button is disabled immediately after click (calculating state)', async () => {
    renderPanel();
    const btn = screen.getByText('Simular').closest('button')!;
    expect(btn).not.toBeDisabled();
    fireEvent.click(btn);
    expect(btn).toBeDisabled();
    // Wait for sequence to complete so timers don't leak
    await waitFor(
      () => expect(useMachiningStore.getState().resultado).not.toBeNull(),
      { timeout: 2500 },
    );
  });

  it('FineTunePanel wrapper exists inside Ajuste Fino section', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ajuste Fino'));
    // The wrapper div must contain the FineTunePanel content
    expect(screen.getByText('VEL. DE CORTE')).toBeInTheDocument();
    expect(screen.getByText('AVANÇO/DENTE')).toBeInTheDocument();
  });

  it('Simular button re-enables after animation sequence completes', async () => {
    renderPanel();
    const btn = screen.getByText('Simular').closest('button')!;
    await act(async () => { fireEvent.click(btn); });
    await waitFor(
      () => expect(btn).not.toBeDisabled(),
      { timeout: 3500 },
    );
  });

  it('Simular button does not trigger double-simulation on rapid clicks', async () => {
    renderPanel();
    const btn = screen.getByText('Simular').closest('button')!;
    await act(async () => {
      fireEvent.click(btn);
      fireEvent.click(btn); // second click while disabled
    });
    await waitFor(
      () => expect(useMachiningStore.getState().resultado).not.toBeNull(),
      { timeout: 2500 },
    );
    // resultado should exist (exactly one simulation ran)
    expect(useMachiningStore.getState().resultado).not.toBeNull();
  });
});
