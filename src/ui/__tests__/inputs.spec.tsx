// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CalculatorProvider } from '../context/CalculatorContext';
import ConfigForm from '../components/ConfigForm';

const renderWithProvider = () => {
  return render(
    <CalculatorProvider>
      <ConfigForm />
    </CalculatorProvider>
  );
};

describe('ConfigForm & Geometry-based Inputs (TASK-011)', () => {
  it('Cenário A: Deve renderizar formulário zerado com botão Calcular desabilitado', () => {
    renderWithProvider();

    const calcBtn = screen.getByRole('button', { name: /calcular/i });
    expect(calcBtn).toBeDefined();
    expect((calcBtn as HTMLButtonElement).disabled).toBe(true);

    const matSelect = screen.getByLabelText(/material/i);
    expect(matSelect).toBeDefined();
    expect((matSelect as HTMLSelectElement).value).toBe('');

    const toolSelect = screen.getByLabelText(/ferramenta/i);
    expect(toolSelect).toBeDefined();
    expect((toolSelect as HTMLSelectElement).value).toBe('');
  });

  it('Campos Condicionais: selecionar Toroidal revela o campo de raio r e Topo Reto o oculta', () => {
    renderWithProvider();

    const toolSelect = screen.getByLabelText(/ferramenta/i);

    // 1. Inicialmente, o campo de raio não existe
    expect(screen.queryByLabelText(/raio de canto/i)).toBeNull();

    // 2. Seleciona Toroidal
    fireEvent.change(toolSelect, { target: { value: 'fresa-toroidal' } });
    const rInput = screen.getByLabelText(/raio de canto/i);
    expect(rInput).toBeDefined();

    // 3. Seleciona Topo Reto
    fireEvent.change(toolSelect, { target: { value: 'fresa-topo-reto' } });
    expect(screen.queryByLabelText(/raio de canto/i)).toBeNull();
  });

  // Defeito C da especificação estrutural do painel, reproduzido na casca.
  // Os condicionais nasceram amarrados ao id da ferramenta —
  // `id.includes('toroidal')` e `id.includes('alto-avanco')` — em vez de ler
  // `extraFields` do `tools.ts`. Consequência verificável: o Cabeçote Faceador
  // declara extraFields ['kappa'] e nunca recebia o campo, e 'Dmin' da fresa de
  // chanfrar não era renderizado em lugar nenhum. Dado que a UI não lê é dado
  // morto — foi assim que o protótipo deixou 17 geometrias sem uso.
  it('Defeito C: o campo condicional vem de extraFields, não do nome da ferramenta', () => {
    renderWithProvider();
    const toolSelect = screen.getByLabelText(/ferramenta/i);

    // Cabeçote Faceador declara extraFields ['kappa'] — o ângulo de posição
    // tem de aparecer, mesmo o id não contendo "alto-avanco"
    fireEvent.change(toolSelect, { target: { value: 'fresa-cabecote' } });
    expect(screen.queryByLabelText(/ângulo de posição/i)).not.toBeNull();

    // Fresa de chanfrar declara extraFields ['Dmin'] — o diâmetro menor
    // tem de aparecer, e não existia campo nenhum para ele
    fireEvent.change(toolSelect, { target: { value: 'fresa-chanfrar' } });
    expect(screen.queryByLabelText(/diâmetro menor/i)).not.toBeNull();
    expect(screen.queryByLabelText(/ângulo de posição/i)).toBeNull();

    // Topo Reto declara extraFields [] — nenhum campo extra
    fireEvent.change(toolSelect, { target: { value: 'fresa-topo-reto' } });
    expect(screen.queryByLabelText(/raio de canto/i)).toBeNull();
    expect(screen.queryByLabelText(/ângulo de posição/i)).toBeNull();
    expect(screen.queryByLabelText(/diâmetro menor/i)).toBeNull();
  });

  it('Habilitação do Botão Calcular após preencher requisitos', () => {
    renderWithProvider();

    const matSelect = screen.getByLabelText(/material/i);
    const toolSelect = screen.getByLabelText(/ferramenta/i);

    fireEvent.change(matSelect, { target: { value: '1045' } });
    fireEvent.change(toolSelect, { target: { value: 'fresa-topo-reto' } });

    const dInput = screen.getByLabelText(/diâmetro nominal/i);
    const zInput = screen.getByLabelText(/arestas \(z\)/i);
    const lInput = screen.getByLabelText(/balanço/i);
    const apInput = screen.getByLabelText(/profundidade de corte \(ap\)/i);
    const aeInput = screen.getByLabelText(/penetração \(ae\)/i);
    const vcInput = screen.getByLabelText(/velocidade de corte \(vc\)/i);
    const fzInput = screen.getByLabelText(/avanço por dente \(fz\)/i);

    fireEvent.change(dInput, { target: { value: '10' } });
    fireEvent.change(zInput, { target: { value: '4' } });
    fireEvent.change(lInput, { target: { value: '35' } });
    fireEvent.change(apInput, { target: { value: '3' } });
    fireEvent.change(aeInput, { target: { value: '5' } });
    fireEvent.change(vcInput, { target: { value: '140' } });
    fireEvent.change(fzInput, { target: { value: '0.06' } });

    const calcBtn = screen.getByRole('button', { name: /calcular/i }) as HTMLButtonElement;
    expect(calcBtn.disabled).toBe(false);
  });
});
