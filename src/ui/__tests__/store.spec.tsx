// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CalculatorProvider, useCalculator } from '../context/CalculatorContext';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CalculatorProvider>{children}</CalculatorProvider>
);

describe('CalculatorContext & Live Calculation Engine (TASK-010)', () => {
  it('Cenário A: deve iniciar com estado zerado e cálculo desabilitado', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    expect(result.current.selectedMaterial).toBeNull();
    expect(result.current.selectedTool).toBeNull();
    expect(result.current.isCalculated).toBe(false);
    expect(result.current.canCalculate).toBe(false);
    expect(result.current.millingResult).toBeNull();
  });

  it('Cenários B e C: deve habilitar cálculo apenas quando todos os requisitos forem preenchidos', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    // 1. Seleciona Material Aço 1045
    act(() => {
      result.current.selectMaterial('1045');
    });
    expect(result.current.selectedMaterial?.id).toBe('1045');
    expect(result.current.canCalculate).toBe(false);

    // 2. Seleciona Ferramenta Toroidal
    act(() => {
      result.current.selectTool('fresa-toroidal');
    });
    expect(result.current.selectedTool?.id).toBe('fresa-toroidal');
    expect(result.current.canCalculate).toBe(false);

    // 3. Preenche os campos obrigatórios de fresamento toroidal: D, Z, L, ap, ae, fz, r
    act(() => {
      result.current.updateField('D', 10);
      result.current.updateField('Z', 4);
      result.current.updateField('L', 45);
      result.current.updateField('ap', 2.0);
      result.current.updateField('ae', 2.5);
      result.current.updateField('fz', 0.06);
      result.current.updateField('r', 1.0);
    });

    expect(result.current.canCalculate).toBe(true);
  });

  it('AC-001: Execução do cálculo de fresamento nominal e integridade dos valores físicos', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.selectMaterial('1045');
      result.current.selectTool('fresa-toroidal');
      result.current.updateField('D', 10);
      result.current.updateField('Z', 4);
      result.current.updateField('L', 45);
      result.current.updateField('ap', 2.0);
      result.current.updateField('ae', 2.5);
      result.current.updateField('fz', 0.06);
      result.current.updateField('r', 1.0);
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.isCalculated).toBe(true);
    const res = result.current.millingResult;
    expect(res).not.toBeNull();
    if (!res) return;

    // S ~ 4456 rpm, F ~ 1070 mm/min
    expect(Math.round(res.n)).toBe(4456);
    expect(Math.round(res.vf)).toBe(1070);
    // hm ~ 0.029 mm
    expect(Number(res.hm.toFixed(3))).toBeCloseTo(0.029, 2);
    // Pc ~ 0.28 kW, Mc ~ 0.60 N.m
    expect(Number(res.Pc.toFixed(2))).toBeCloseTo(0.28, 1);
    expect(Number(res.Mc.toFixed(2))).toBeCloseTo(0.60, 1);
    // Alerta de balanço L/D = 4.5 -> ATENÇÃO
    expect(res.safetyLevel).toBe('ATENÇÃO');
  });

  it('Live Calculation (Cenários D a H): alteração dinâmica em vc recalcula n e vf instantaneamente', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.selectMaterial('1045');
      result.current.selectTool('fresa-toroidal');
      result.current.updateField('D', 10);
      result.current.updateField('Z', 4);
      result.current.updateField('L', 45);
      result.current.updateField('ap', 2.0);
      result.current.updateField('ae', 2.5);
      result.current.updateField('fz', 0.06);
      result.current.updateField('r', 1.0);
    });

    act(() => {
      result.current.calculate();
    });

    expect(Math.round(result.current.millingResult!.n)).toBe(4456);

    // Altera vc de 140 para 180 m/min
    act(() => {
      result.current.updateField('vc', 180);
    });

    // n deve recalcular para ~5730 rpm dinamicamente
    expect(Math.round(result.current.millingResult!.n)).toBe(5730);
    expect(Math.round(result.current.millingResult!.vf)).toBe(1375);
  });

  it('Ajuste tátil de ±5% (AC-004): reduz S em 5% recalculando a cadeia sem mexer em fz', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.selectMaterial('1045');
      result.current.selectTool('fresa-toroidal');
      result.current.updateField('D', 10);
      result.current.updateField('Z', 4);
      result.current.updateField('L', 45);
      result.current.updateField('ap', 2.0);
      result.current.updateField('ae', 2.5);
      result.current.updateField('fz', 0.06);
      result.current.updateField('r', 1.0);
    });

    act(() => {
      result.current.calculate();
    });

    const nInicial = result.current.millingResult!.n;
    act(() => {
      result.current.adjustRPM(-5);
    });

    expect(result.current.sOffsetPercent).toBe(-5);
    expect(Math.round(result.current.millingResult!.n)).toBe(Math.round(nInicial * 0.95));
    // fz continua 0.06
    expect(result.current.currentInputs.fz).toBe(0.06);
  });
});
