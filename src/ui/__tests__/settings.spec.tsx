// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import 'fake-indexeddb/auto';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { CalculatorProvider } from '../context/CalculatorContext';
import SettingsView from '../components/SettingsView';
import { initDB, closeDB, getConfig, getAllMaterials } from '../../core/storage';

describe('SettingsView & Persistent IndexedDB Storage (TASK-013)', () => {
  beforeEach(async () => {
    const db = await initDB();
    await db.clear('materials');
    await db.clear('config');
  });

  afterEach(async () => {
    await closeDB();
  });

  it('deve carregar e renderizar as configurações padrão', async () => {
    render(
      <CalculatorProvider>
        <SettingsView onClose={() => {}} />
      </CalculatorProvider>
    );

    // Verifica se os campos de margem e HSS foram renderizados
    expect(await screen.findByLabelText(/margem de segurança/i)).toBeDefined();
    expect(screen.getByLabelText(/percentual do avanço \(hss\)/i)).toBeDefined();
    expect(screen.getByLabelText(/divisor do pica-pau/i)).toBeDefined();
    expect(screen.getByLabelText(/teto do incremento/i)).toBeDefined();
  });

  it('deve permitir editar e salvar a Margem de Segurança no IndexedDB', async () => {
    render(
      <CalculatorProvider>
        <SettingsView onClose={() => {}} />
      </CalculatorProvider>
    );

    const marginInput = await screen.findByLabelText(/margem de segurança/i);
    fireEvent.change(marginInput, { target: { value: '85' } });

    const saveBtn = screen.getByRole('button', { name: /salvar configurações/i });
    fireEvent.click(saveBtn);

    // Aguarda persistência no idb
    await waitFor(async () => {
      const savedConfig = await getConfig();
      expect(savedConfig.safetyMargin).toBe(85);
    });
  });

  it('deve permitir cadastrar um novo material persistido localmente no IndexedDB', async () => {
    render(
      <CalculatorProvider>
        <SettingsView onClose={() => {}} />
      </CalculatorProvider>
    );

    const nameInput = await screen.findByLabelText(/nome do material/i);
    const isoSelect = screen.getByLabelText(/classe iso/i);
    const kcInput = screen.getByLabelText(/força específica \(kc1\.1\)/i);
    const mcInput = screen.getByLabelText(/expoente kienzle \(mc\)/i);
    const vcInput = screen.getByLabelText(/velocidade de partida \(vc\)/i);

    fireEvent.change(nameInput, { target: { value: 'Aço Ferramenta Especial D2' } });
    fireEvent.change(isoSelect, { target: { value: 'H' } });
    fireEvent.change(kcInput, { target: { value: '2800' } });
    fireEvent.change(mcInput, { target: { value: '0.24' } });
    fireEvent.change(vcInput, { target: { value: '70' } });

    const addBtn = screen.getByRole('button', { name: /cadastrar material/i });
    fireEvent.click(addBtn);

    await waitFor(async () => {
      const mats = await getAllMaterials();
      const customMat = mats.find(m => m.name === 'Aço Ferramenta Especial D2');
      expect(customMat).toBeDefined();
      expect(customMat?.isoClass).toBe('H');
      expect(customMat?.kc1_1).toBe(2800);
      expect(customMat?.isCustom).toBe(true);
    });
  });

  it('deve suportar digitação livre na Margem de Segurança sem restauração involuntária', async () => {
    render(
      <CalculatorProvider>
        <SettingsView onClose={() => {}} />
      </CalculatorProvider>
    );

    const marginInput = (await screen.findByLabelText(/margem de segurança/i)) as HTMLInputElement;

    // Foca no input
    fireEvent.focus(marginInput);

    // Apaga todo o valor com Backspace
    fireEvent.change(marginInput, { target: { value: '' } });
    expect(marginInput.value).toBe('');

    // Digita '7'
    fireEvent.change(marginInput, { target: { value: '7' } });
    expect(marginInput.value).toBe('7');

    // Digita '5' -> '75'
    fireEvent.change(marginInput, { target: { value: '75' } });
    expect(marginInput.value).toBe('75');

    // Desfoca
    fireEvent.blur(marginInput);
    expect(marginInput.value).toBe('75');
  });

  it('deve aceitar vírgula decimal brasileira no cadastro de novo material ("0,22")', async () => {
    render(
      <CalculatorProvider>
        <SettingsView onClose={() => {}} />
      </CalculatorProvider>
    );

    const nameInput = await screen.findByLabelText(/nome do material/i);
    const kcInput = screen.getByLabelText(/força específica \(kc1\.1\)/i);
    const mcInput = screen.getByLabelText(/expoente kienzle \(mc\)/i);
    const vcInput = screen.getByLabelText(/velocidade de partida \(vc\)/i);

    fireEvent.change(nameInput, { target: { value: 'Material Inox Custom' } });
    fireEvent.change(kcInput, { target: { value: '1850,5' } });
    fireEvent.change(mcInput, { target: { value: '0,23' } });
    fireEvent.change(vcInput, { target: { value: '95,5' } });

    const addBtn = screen.getByRole('button', { name: /cadastrar material/i });
    fireEvent.click(addBtn);

    await waitFor(async () => {
      const mats = await getAllMaterials();
      const customMat = mats.find(m => m.name === 'Material Inox Custom');
      expect(customMat).toBeDefined();
      expect(customMat?.kc1_1).toBe(1850.5);
      expect(customMat?.mc).toBe(0.23);
      expect(customMat?.vcReference).toBe(95.5);
    });
  });
});
