// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import 'fake-indexeddb/auto';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { CalculatorProvider, useCalculator } from '../context/CalculatorContext';
import ConfigForm from '../components/ConfigForm';
import ResultsPanel from '../components/ResultsPanel';
import SettingsView from '../components/SettingsView';
import { initDB, closeDB, saveConfig, saveMaterial } from '../../core/storage';

describe('Integração de Contrato UI ↔ Storage ↔ Core (Revisão Morfeu)', () => {
  beforeEach(async () => {
    const db = await initDB();
    await db.clear('materials');
    await db.clear('config');
  });

  afterEach(async () => {
    await closeDB();
  });

  it('AC-005 2ª cláusula: Material cadastrado em SettingsView fica disponível imediatamente no ConfigForm', async () => {
    render(
      <CalculatorProvider>
        <ConfigForm />
        <SettingsView onClose={() => {}} />
      </CalculatorProvider>
    );

    // 1. Cadastra material no SettingsView
    const nameInput = await screen.findByLabelText(/nome do material/i);
    const kcInput = screen.getByLabelText(/força específica \(kc1\.1\)/i);
    const mcInput = screen.getByLabelText(/expoente kienzle \(mc\)/i);
    const vcInput = screen.getByLabelText(/velocidade de partida \(vc\)/i);

    fireEvent.change(nameInput, { target: { value: 'Aço Ferramenta Especial D2' } });
    fireEvent.change(kcInput, { target: { value: '2800' } });
    fireEvent.change(mcInput, { target: { value: '0.24' } });
    fireEvent.change(vcInput, { target: { value: '70' } });

    const addBtn = screen.getByRole('button', { name: /cadastrar material/i });
    fireEvent.click(addBtn);

    // 2. Verifica se o material aparece imediatamente no select do ConfigForm
    await waitFor(() => {
      const matSelect = screen.getByLabelText(/material a usinar/i);
      const option = Array.from(matSelect.querySelectorAll('option')).find(o =>
        o.textContent?.includes('Aço Ferramenta Especial D2')
      );
      expect(option).toBeDefined();
    }, { timeout: 8000 });
  }, 15000);

  it('AC-006: Margem de Segurança Global é carregada no boot, escala grandezas de execução e preserva físicas', async () => {
    // 1. Persiste margem de 85% no IndexedDB
    await saveConfig({ safetyMargin: 85 });

    function TestMilling() {
      const { selectMaterial, selectTool, updateField, calculate } = useCalculator();
      React.useEffect(() => {
        selectMaterial('1045');
        selectTool('fresa-toroidal');
        updateField('D', 10);
        updateField('Z', 4);
        updateField('L', 45);
        updateField('ap', 2.0);
        updateField('ae', 2.5);
        updateField('fz', 0.06);
        updateField('r', 1.0);
        calculate();
      }, [selectMaterial, selectTool, updateField, calculate]);

      return <ResultsPanel />;
    }

    render(
      <CalculatorProvider>
        <TestMilling />
      </CalculatorProvider>
    );

    // Aguarda o boot carregar a margem de 85%
    await waitFor(() => {
      const marginBanner = screen.getByRole('status', { name: /aviso de margem ativa/i });
      expect(marginBanner).toBeDefined();
      expect(marginBanner.textContent).toContain('85%');
    });

    // Rotação escalada por 0.85: 4456 * 0.85 = 3788 rpm
    expect(screen.getByText(/3\.788/)).toBeDefined();
    // Avanço escalado por 0.85: 1070 * 0.85 = 909 mm/min
    expect(screen.getByText(/909/)).toBeDefined();

    // Invariantes físicas NÃO escaladas (MVP §4.9 Regra 2)
    expect(screen.getByText(/0,029/)).toBeDefined(); // hm continua 0.029 mm
    expect(screen.getByText(/0,052/)).toBeDefined(); // hex continua 0.052 mm
    expect(screen.getByText(/1,155/)).toBeDefined(); // CTF continua 1.155
    expect(screen.getAllByText(/4,5/).length).toBeGreaterThan(0);   // L/D continua 4.5
    expect(screen.getByText(/3\.163/)).toBeDefined(); // kc continua 3163 N/mm²
  });

  it('AC-004 Completo: Ajuste tátil de S em −5% derruba F, MRR e Pc, fixa fz e mantém Mc invariante', async () => {
    function TestAdjust() {
      const { selectMaterial, selectTool, updateField, calculate, millingResult, adjustRPM } = useCalculator();
      React.useEffect(() => {
        selectMaterial('1045');
        selectTool('fresa-toroidal');
        updateField('D', 10);
        updateField('Z', 4);
        updateField('L', 45);
        updateField('ap', 2.0);
        updateField('ae', 2.5);
        updateField('fz', 0.06);
        updateField('r', 1.0);
        calculate();
      }, [selectMaterial, selectTool, updateField, calculate]);

      return (
        <div>
          <button onClick={() => adjustRPM(-5)}>Ajustar</button>
          <div data-testid="mMc">{millingResult?.Mc.toFixed(2)}</div>
          <div data-testid="mPc">{millingResult?.Pc.toFixed(2)}</div>
          <div data-testid="mF">{Math.round(millingResult?.vf || 0)}</div>
          <div data-testid="mQ">{millingResult?.Q.toFixed(2)}</div>
        </div>
      );
    }

    const { getByTestId, getByText } = render(
      <CalculatorProvider>
        <TestAdjust />
      </CalculatorProvider>
    );

    // Valores iniciais nominais
    await waitFor(() => {
      expect(getByTestId('mMc').textContent).toBe('0.60');
      expect(getByTestId('mPc').textContent).toBe('0.28');
      expect(getByTestId('mF').textContent).toBe('1070');
      expect(getByTestId('mQ').textContent).toBe('5.35');
    });

    // Dispara ajuste de -5% na rotação
    act(() => {
      fireEvent.click(getByText('Ajustar'));
    });

    // F, Q e Pc caem ~5%, mas Mc permanece RIGOROSAMENTE 0.60 N.m!
    await waitFor(() => {
      expect(getByTestId('mMc').textContent).toBe('0.60'); // INVARIANTE
      expect(getByTestId('mPc').textContent).toBe('0.27'); // 0.28 * 0.95 = 0.266 -> 0.27
      expect(getByTestId('mF').textContent).toBe('1016');  // 1070 * 0.95 = 1016.5
      expect(getByTestId('mQ').textContent).toBe('5.08');  // 5.35 * 0.95 = 5.08
    });
  });

  it('R1 e Multiprocesso: Família Roscar executa cálculo com avanço travado no passo e sem silêncio', async () => {
    function TestRoscar() {
      const { setActiveFamily, selectMaterial, selectTool, updateField, calculate } = useCalculator();
      React.useEffect(() => {
        setActiveFamily('roscar');
        selectMaterial('1045');
        selectTool('macho-corte');
        updateField('D', 8);
        updateField('pitch', 1.25);
        updateField('vc', 20);
        calculate();
      }, [setActiveFamily, selectMaterial, selectTool, updateField, calculate]);

      return <ResultsPanel />;
    }

    render(
      <CalculatorProvider>
        <TestRoscar />
      </CalculatorProvider>
    );

    // Rotação calculada para D8 vc20: n ~ 796 rpm
    // Avanço rigorosamente travado no passo: vf = n * 1.25 = 796 * 1.25 ~ 995 mm/min
    await waitFor(() => {
      expect(screen.getByText(/796/)).toBeDefined();
      expect(screen.getAllByText(/995/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Rosqueamento Sincronizado/i)).toBeDefined();
    });
  });

  it('R1 e Multiprocesso: Família Mandrilar executa cálculo e aciona ATENÇÃO com L/D > 4.0', async () => {
    function TestMandrilar() {
      const { setActiveFamily, selectMaterial, selectTool, updateField, calculate } = useCalculator();
      React.useEffect(() => {
        setActiveFamily('mandrilar');
        selectMaterial('1045');
        selectTool('barra-mandrilar');
        updateField('D', 20);
        updateField('L', 100); // L/D = 100/20 = 5.0 > 4.0
        updateField('vc', 140);
        updateField('ap', 1.0);
        updateField('fn', 0.08);
        calculate();
      }, [setActiveFamily, selectMaterial, selectTool, updateField, calculate]);

      return <ResultsPanel />;
    }

    render(
      <CalculatorProvider>
        <TestMandrilar />
      </CalculatorProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/2\.228/)).toBeDefined(); // n para D20 vc140
      expect(screen.getByText(/178/)).toBeDefined();   // vf = 2228 * 0.08 = 178 mm/min
      const alert = screen.getByRole('alert');
      expect(alert.textContent).toContain('ATENÇÃO');
      expect(alert.textContent).toContain('5,0'); // L/D = 5.0
    });
  });
});
