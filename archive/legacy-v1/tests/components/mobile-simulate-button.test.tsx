import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MobileSimulateButton } from '@/components/mobile/mobile-simulate-button';
import { useMachiningStore } from '@/store';

describe('MobileSimulateButton', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
  });

  it('renders the Simular button idle', () => {
    render(<MobileSimulateButton />);
    expect(screen.getByText('Simular')).toBeInTheDocument();
  });

  it('keeps the button interactive and shows immediate confirmation', () => {
    render(<MobileSimulateButton />);
    const btn = screen.getByText('Simular').closest('button')!;
    expect(btn).not.toBeDisabled();
    fireEvent.click(btn);
    expect(btn).not.toBeDisabled();
    expect(screen.getByText('Atualizado')).toBeInTheDocument();
  });

  it('calls onSimulationStart synchronously on click', () => {
    const onSimulationStart = vi.fn();
    render(<MobileSimulateButton onSimulationStart={onSimulationStart} />);
    fireEvent.click(screen.getByText('Simular').closest('button')!);
    expect(onSimulationStart).toHaveBeenCalledTimes(1);
  });

  it('runs the simulation and populates resultado in the store', async () => {
    render(<MobileSimulateButton />);
    await act(async () => {
      fireEvent.click(screen.getByText('Simular').closest('button')!);
    });
    await waitFor(
      () => expect(useMachiningStore.getState().resultado).not.toBeNull(),
      { timeout: 500 },
    );
  });

  it('resets the store when the reset button is clicked', () => {
    useMachiningStore.getState().setMaterial(4);
    render(<MobileSimulateButton />);
    fireEvent.click(screen.getByLabelText('Resetar parâmetros'));
    expect(useMachiningStore.getState().materialId).toBe(2);
  });
});
