import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ConfigPanel } from '@/components/config-panel';
import { useMachiningStore } from '@/store';

function renderPanel() {
  return render(<BrowserRouter><ConfigPanel /></BrowserRouter>);
}

describe('ConfigPanel', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders Simular button', () => {
    renderPanel();
    expect(screen.getByText('Simular')).toBeInTheDocument();
  });

  it('renders material select with all 9 materials', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    const materialSelect = selects[0];
    expect(materialSelect).toBeInTheDocument();
    const options = materialSelect.querySelectorAll('option');
    expect(options.length).toBe(9);
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

  it('renders diameter dropdown with chevron class and 15 options', () => {
    renderPanel();
    const diaSelect = screen.getByRole('combobox', { name: 'Diâmetro (mm)' });
    const options = diaSelect.querySelectorAll('option');
    expect(options.length).toBe(15);
    expect(diaSelect.classList.contains('select-chevron')).toBe(true);
  });

  it('hides raio da ponta when switching to topo', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Topo'));
    // DropdownRow com label="Raio da Ponta" some do DOM quando tipo !== 'toroidal'
    expect(screen.queryByText('Raio da Ponta')).not.toBeInTheDocument();
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

  it('changes tool diameter via dropdown', () => {
    renderPanel();
    const diaSelect = screen.getByRole('combobox', { name: 'Diâmetro (mm)' });
    fireEvent.change(diaSelect, { target: { value: '10' } });
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

  it('follows correct tool field order: Tipo → Diâmetro → Raio → Arestas → Altura', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    const toolLabels = ['Tipo', 'Diâmetro (mm)', 'Raio da Ponta', 'Arestas (Z)', 'Altura Fixação (mm)'];
    for (const label of toolLabels) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  // ─── Fase 2: CollapsibleSection ───────────────────────────────────────────

  it('renders 3 collapsible sections', () => {
    renderPanel();
    expect(screen.getByText('Configuração Base')).toBeInTheDocument();
    expect(screen.getByText('Ferramenta')).toBeInTheDocument();
    expect(screen.getByText('Ajuste Fino')).toBeInTheDocument();
  });

  it('collapsible sections are closed by default', () => {
    renderPanel();
    const accordionHeaders = screen.getAllByRole('button').filter(
      (b) => b.getAttribute('aria-expanded') !== null
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

  // ─── Fase 3: Ferramenta → Dropdowns ──────────────────────────────────────

  it('raio da ponta renders as dropdown (select) for toroidal', () => {
    renderPanel();
    // Default tipo is 'toroidal' — DropdownRow renders aria-label="Raio da Ponta"
    expect(screen.getByRole('combobox', { name: 'Raio da Ponta' })).toBeInTheDocument();
  });

  it('raio da ponta dropdown has 3 options from RAIOS_PONTA', () => {
    renderPanel();
    const raioSelect = screen.getByRole('combobox', { name: 'Raio da Ponta' });
    expect(raioSelect.querySelectorAll('option').length).toBe(3); // [0.2, 0.5, 1.0]
  });

  it('selecting raio dropdown updates store.ferramenta.raioQuina', () => {
    renderPanel();
    const raioSelect = screen.getByRole('combobox', { name: 'Raio da Ponta' });
    fireEvent.change(raioSelect, { target: { value: '0.2' } });
    expect(useMachiningStore.getState().ferramenta.raioQuina).toBe(0.2);
  });

  it('arestas renders as dropdown (select)', () => {
    renderPanel();
    expect(screen.getByRole('combobox', { name: 'Arestas (Z)' })).toBeInTheDocument();
  });

  it('arestas dropdown has 4 options from ARESTAS_OPTIONS [2,3,4,6]', () => {
    renderPanel();
    const arestasSelect = screen.getByRole('combobox', { name: 'Arestas (Z)' });
    const options = arestasSelect.querySelectorAll('option');
    expect(options.length).toBe(4);
    expect(Array.from(options).map((o) => Number((o as HTMLOptionElement).value))).toEqual([2, 3, 4, 6]);
  });

  it('selecting arestas dropdown updates store.ferramenta.numeroArestas', () => {
    renderPanel();
    const arestasSelect = screen.getByRole('combobox', { name: 'Arestas (Z)' });
    fireEvent.change(arestasSelect, { target: { value: '3' } });
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(3);
  });

  it('altura de fixacao renders as dropdown (select)', () => {
    renderPanel();
    expect(screen.getByRole('combobox', { name: 'Altura Fixação (mm)' })).toBeInTheDocument();
  });

  it('altura dropdown has 12 options from ALTURAS_FIXACAO', () => {
    renderPanel();
    const alturaSelect = screen.getByRole('combobox', { name: 'Altura Fixação (mm)' });
    expect(alturaSelect.querySelectorAll('option').length).toBe(12);
  });

  it('selecting altura dropdown updates store.ferramenta.balanco', () => {
    renderPanel();
    const alturaSelect = screen.getByRole('combobox', { name: 'Altura Fixação (mm)' });
    fireEvent.change(alturaSelect, { target: { value: '50' } });
    expect(useMachiningStore.getState().ferramenta.balanco).toBe(50);
  });

  it('steppers and NumInput for altura NOT in DOM (removed in Fase 3)', () => {
    renderPanel();
    expect(screen.queryByLabelText('Increase height')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Decrease height')).not.toBeInTheDocument();
  });

  it('radio buttons for arestas NOT in DOM (replaced by dropdown)', () => {
    renderPanel();
    expect(screen.queryByText('2 Arestas')).not.toBeInTheDocument();
    expect(screen.queryByText('4 Arestas')).not.toBeInTheDocument();
  });

  // ─── Fase 5: Biblioteca de Ferramentas ──────────────────────────────────

  it('saved tools dropdown shows "Nenhuma ferramenta salva" when empty', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    const select = screen.getByRole('combobox', { name: 'Ferramenta Salva' });
    expect(select).toBeInTheDocument();
    expect(select).toBeDisabled();
    expect(screen.getByText('Nenhuma ferramenta salva')).toBeInTheDocument();
  });

  it('saved tools dropdown shows saved tool names', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20 });
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    const select = screen.getByRole('combobox', { name: 'Ferramenta Salva' });
    expect(select).not.toBeDisabled();
    expect(screen.getByText('Topo Ø10 - H20 - A4')).toBeInTheDocument();
  });

  it('selecting saved tool calls loadSavedTool with correct id', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20 });
    const { savedTools } = useMachiningStore.getState();
    const toolId = savedTools[0].id;
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    const select = screen.getByRole('combobox', { name: 'Ferramenta Salva' });
    fireEvent.change(select, { target: { value: toolId } });
    expect(useMachiningStore.getState().ferramenta.diametro).toBe(10);
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(4);
  });

  it('loadSavedTool zeros resultado', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'topo', diametro: 10, numeroArestas: 4, balanco: 20 });
    store.calcular();
    expect(useMachiningStore.getState().resultado).not.toBeNull();
    const toolId = useMachiningStore.getState().savedTools[0].id;
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    const select = screen.getByRole('combobox', { name: 'Ferramenta Salva' });
    fireEvent.change(select, { target: { value: toolId } });
    expect(useMachiningStore.getState().resultado).toBeNull();
  });

  it('clicking save button adds current tool to saved tools', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    fireEvent.click(screen.getByRole('button', { name: 'Salvar ferramenta' }));
    expect(useMachiningStore.getState().savedTools.length).toBeGreaterThanOrEqual(1);
    const select = screen.getByRole('combobox', { name: 'Ferramenta Salva' });
    expect(select).not.toBeDisabled();
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
    await act(async () => { fireEvent.click(screen.getByText('Simular')); });
    await waitFor(() => expect(useMachiningStore.getState().resultado).not.toBeNull(), { timeout: 2500 });
    expect(useMachiningStore.getState().savedTools.length).toBe(countBefore);
  });

  it('tool names follow industry format: Topo Ø{d} - H{h} - A{z}', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'topo', diametro: 8, numeroArestas: 2, balanco: 30 });
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByText('Topo Ø8 - H30 - A2')).toBeInTheDocument();
  });

  it('toroidal tool name includes raio: Toroidal Ø{d} - R{r} - H{h} - A{z}', () => {
    const store = useMachiningStore.getState();
    store.addSavedTool({ tipo: 'toroidal', diametro: 12, raioQuina: 1.5, numeroArestas: 4, balanco: 25 });
    renderPanel();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getByText('Toroidal Ø12 - R1.5 - H25 - A4')).toBeInTheDocument();
  });

  // ─── Item #07: Slider Safety Factor ────────────────────────────────────────

  it('renders Segurança section in the panel', () => {
    renderPanel();
    expect(screen.getByText('Segurança')).toBeInTheDocument();
  });

  it('Segurança section is collapsed by default', () => {
    renderPanel();
    const segBtn = screen.getByText('Segurança').closest('button');
    expect(segBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('Segurança summary shows SF value when collapsed', () => {
    renderPanel();
    // Default safetyFactor is 0.8
    expect(screen.getByText('SF 0.80')).toBeInTheDocument();
  });

  it('opening Segurança section shows slider with correct aria-label', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Segurança'));
    expect(screen.getByRole('slider', { name: 'Fator de Segurança slider' })).toBeInTheDocument();
  });

  it('+ button increases safetyFactor by 0.05', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Segurança'));
    const initialSF = useMachiningStore.getState().safetyFactor;
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar fator de segurança' }));
    expect(useMachiningStore.getState().safetyFactor).toBeCloseTo(initialSF + 0.05, 5);
  });

  it('− button decreases safetyFactor by 0.05', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Segurança'));
    const initialSF = useMachiningStore.getState().safetyFactor;
    fireEvent.click(screen.getByRole('button', { name: 'Reduzir fator de segurança' }));
    expect(useMachiningStore.getState().safetyFactor).toBeCloseTo(initialSF - 0.05, 5);
  });

  it('− button clamps at 0.50 minimum', () => {
    useMachiningStore.getState().setSafetyFactor(0.50);
    renderPanel();
    fireEvent.click(screen.getByText('Segurança'));
    fireEvent.click(screen.getByRole('button', { name: 'Reduzir fator de segurança' }));
    expect(useMachiningStore.getState().safetyFactor).toBe(0.50);
  });

  it('+ button clamps at 1.00 maximum', () => {
    useMachiningStore.getState().setSafetyFactor(1.00);
    renderPanel();
    fireEvent.click(screen.getByText('Segurança'));
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar fator de segurança' }));
    expect(useMachiningStore.getState().safetyFactor).toBe(1.00);
  });

  it('setSafetyFactor zeros resultado (user must re-simulate)', () => {
    useMachiningStore.getState().calcular();
    expect(useMachiningStore.getState().resultado).not.toBeNull();
    useMachiningStore.getState().setSafetyFactor(0.70);
    expect(useMachiningStore.getState().resultado).toBeNull();
  });
});
