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
    const aeInput = screen.getByLabelText(/engajamento radial|penetração/i);
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

  it('Experiência de Digitação: Permite digitar "0.2" e "0.25" naturalmente sem bloqueio', () => {
    renderWithProvider();

    const matSelect = screen.getByLabelText(/material/i);
    const toolSelect = screen.getByLabelText(/ferramenta/i);
    fireEvent.change(matSelect, { target: { value: '1045' } });
    fireEvent.change(toolSelect, { target: { value: 'fresa-topo-reto' } });

    const apInput = screen.getByLabelText(/profundidade de corte \(ap\)/i) as HTMLInputElement;

    // Foca no campo
    fireEvent.focus(apInput);

    // Digita '0'
    fireEvent.change(apInput, { target: { value: '0' } });
    expect(apInput.value).toBe('0');

    // Digita '.' (estado intermediário '0.')
    fireEvent.change(apInput, { target: { value: '0.' } });
    expect(apInput.value).toBe('0.');

    // Digita '2' -> '0.2'
    fireEvent.change(apInput, { target: { value: '0.2' } });
    expect(apInput.value).toBe('0.2');

    // Digita '5' -> '0.25'
    fireEvent.change(apInput, { target: { value: '0.25' } });
    expect(apInput.value).toBe('0.25');

    // Desfoca (blur)
    fireEvent.blur(apInput);
    expect(apInput.value).toBe('0.25');
  });

  it('Suporte a Teclado Mobile com Vírgula Brasileira: "0,2" e "0,15"', () => {
    renderWithProvider();

    const matSelect = screen.getByLabelText(/material/i);
    const toolSelect = screen.getByLabelText(/ferramenta/i);
    fireEvent.change(matSelect, { target: { value: '1045' } });
    fireEvent.change(toolSelect, { target: { value: 'fresa-topo-reto' } });

    const apInput = screen.getByLabelText(/profundidade de corte \(ap\)/i) as HTMLInputElement;

    fireEvent.focus(apInput);
    // Simula teclado virtual que insere vírgula
    fireEvent.change(apInput, { target: { value: '0,2' } });
    expect(apInput.value).toBe('0,2');

    fireEvent.blur(apInput);
    // No blur normaliza para valor numérico formatado com 2 casas decimais
    expect(apInput.value).toBe('0.20');
  });

  it('Edição e Limpeza: apagar com Backspace não força restauração involuntária', () => {
    renderWithProvider();

    const matSelect = screen.getByLabelText(/material/i);
    const toolSelect = screen.getByLabelText(/ferramenta/i);
    fireEvent.change(matSelect, { target: { value: '1045' } });
    fireEvent.change(toolSelect, { target: { value: 'fresa-topo-reto' } });

    const dInput = screen.getByLabelText(/diâmetro nominal/i) as HTMLInputElement;

    fireEvent.focus(dInput);
    fireEvent.change(dInput, { target: { value: '12' } });
    expect(dInput.value).toBe('12');

    // Apaga completamente para digitar outro número
    fireEvent.change(dInput, { target: { value: '' } });
    expect(dInput.value).toBe('');

    // Digita novo valor decimal (ex: 6.35 mm - fresa 1/4")
    fireEvent.change(dInput, { target: { value: '6.35' } });
    expect(dInput.value).toBe('6.35');
  });

  it('Botões Stepper (+ / -) respeitam precisão sem dízimas de ponto flutuante', () => {
    renderWithProvider();

    const matSelect = screen.getByLabelText(/material/i);
    const toolSelect = screen.getByLabelText(/ferramenta/i);
    fireEvent.change(matSelect, { target: { value: '1045' } });
    fireEvent.change(toolSelect, { target: { value: 'fresa-topo-reto' } });

    const apInput = screen.getByLabelText(/profundidade de corte \(ap\)/i) as HTMLInputElement;
    fireEvent.change(apInput, { target: { value: '0.20' } });

    // Clica no botão + (passo de 0.1 em ap com 2 casas)
    const plusBtn = screen.getByRole('button', { name: /aumentar passo \(ap\)/i });
    fireEvent.click(plusBtn);

    // 0.20 + 0.1 = 0.30
    expect(apInput.value).toBe('0.30');

    // Clica no botão -
    const minusBtn = screen.getByRole('button', { name: /diminuir passo \(ap\)/i });
    fireEvent.click(minusBtn);
    expect(apInput.value).toBe('0.20');
  });

  it('AP e Engajamento Radial aceitam livremente "0,15", "0,20", "0,35", "1,25" com 2 casas decimais', () => {
    renderWithProvider();

    const matSelect = screen.getByLabelText(/material/i);
    const toolSelect = screen.getByLabelText(/ferramenta/i);
    fireEvent.change(matSelect, { target: { value: '1045' } });
    fireEvent.change(toolSelect, { target: { value: 'fresa-topo-reto' } });

    const apInput = screen.getByLabelText(/profundidade de corte \(ap\)/i) as HTMLInputElement;
    const aeInput = screen.getByLabelText(/engajamento radial/i) as HTMLInputElement;

    // Teste com 0.15 no AP
    fireEvent.focus(apInput);
    fireEvent.change(apInput, { target: { value: '0,15' } });
    expect(apInput.value).toBe('0,15');
    fireEvent.blur(apInput);
    expect(apInput.value).toBe('0.15');

    // Teste com 0.35 no AP
    fireEvent.focus(apInput);
    fireEvent.change(apInput, { target: { value: '0.35' } });
    fireEvent.blur(apInput);
    expect(apInput.value).toBe('0.35');

    // Teste com 0.15 no AE
    fireEvent.focus(aeInput);
    fireEvent.change(aeInput, { target: { value: '0,15' } });
    expect(aeInput.value).toBe('0,15');
    fireEvent.blur(aeInput);
    expect(aeInput.value).toBe('0.15');

    // Teste com 1.25 no AE
    fireEvent.focus(aeInput);
    fireEvent.change(aeInput, { target: { value: '1.25' } });
    fireEvent.blur(aeInput);
    expect(aeInput.value).toBe('1.25');

    // Teste com 0.20 no AE (não deve truncar para 0.2)
    fireEvent.focus(aeInput);
    fireEvent.change(aeInput, { target: { value: '0.20' } });
    fireEvent.blur(aeInput);
    expect(aeInput.value).toBe('0.20');
  });
});
