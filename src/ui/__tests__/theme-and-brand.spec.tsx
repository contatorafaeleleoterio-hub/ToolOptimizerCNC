// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import BrandLogo from '../components/BrandLogo';

describe('Design System Audit — Tema Padrão e Calibração de Logomarca', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.body.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('1. Tema Padrão e Alternância', () => {
    it('deve inicializar no tema claro por padrão quando não houver preferência gravada', () => {
      render(<App />);

      // Atributo data-theme no HTML deve ser claro
      expect(document.documentElement.getAttribute('data-theme')).toBe('claro');

      // Botão de alternar tema deve refletir o estado Claro
      const themeBtn = screen.getByRole('button', { name: /alternar tema claro \/ escuro/i });
      expect(themeBtn).toBeDefined();
      expect(themeBtn.textContent).toContain('Claro');
    });

    it('deve respeitar a preferência existente caso o usuário já tenha salvo "escuro"', () => {
      localStorage.setItem('to_theme', 'escuro');
      render(<App />);

      expect(document.documentElement.getAttribute('data-theme')).toBe('escuro');

      const themeBtn = screen.getByRole('button', { name: /alternar tema claro \/ escuro/i });
      expect(themeBtn.textContent).toContain('Escuro');
    });

    it('deve alternar corretamente entre claro e escuro e persistir no localStorage', () => {
      render(<App />);

      const themeBtn = screen.getByRole('button', { name: /alternar tema claro \/ escuro/i });
      expect(document.documentElement.getAttribute('data-theme')).toBe('claro');

      // Alterna para escuro
      fireEvent.click(themeBtn);
      expect(document.documentElement.getAttribute('data-theme')).toBe('escuro');
      expect(localStorage.getItem('to_theme')).toBe('escuro');
      expect(themeBtn.textContent).toContain('Escuro');

      // Alterna de volta para claro
      fireEvent.click(themeBtn);
      expect(document.documentElement.getAttribute('data-theme')).toBe('claro');
      expect(localStorage.getItem('to_theme')).toBe('claro');
      expect(themeBtn.textContent).toContain('Claro');
    });
  });

  describe('2. Logomarca e Calibração Visual', () => {
    it('deve renderizar a marca no Desktop com viewBox e dimensões calibradas', () => {
      const { container } = render(<BrandLogo />);

      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg?.getAttribute('viewBox')).toBe('38 48 930 212');
      expect(svg?.getAttribute('width')).toBe('176');
      expect(svg?.getAttribute('height')).toBe('40');

      const brandPlate = container.querySelector('.brand-plate');
      expect(brandPlate).not.toBeNull();
      expect(brandPlate?.getAttribute('role')).toBe('img');
      expect(brandPlate?.getAttribute('aria-label')).toBe('Marca ToolOptimizer CNC');
    });

    it('deve renderizar a marca no Mobile (compact) com viewBox calibrado e dimensões compactas', () => {
      const { container } = render(<BrandLogo compact />);

      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg?.getAttribute('viewBox')).toBe('38 48 930 212');
      expect(svg?.getAttribute('width')).toBe('124');
      expect(svg?.getAttribute('height')).toBe('28');

      const brandPlate = container.querySelector('.brand-plate');
      expect(brandPlate).not.toBeNull();
    });

    it('deve preservar o texto semântico, a sigla CNC e a tagline oficial no SVG', () => {
      const { container } = render(<BrandLogo />);

      const brand = screen.getByRole('img', { name: /marca tooloptimizer/i });
      expect(brand.textContent).toContain('Tool');
      expect(brand.textContent).toContain('Optimizer');
      expect(brand.textContent).toContain('CNC');
      expect(brand.textContent).toContain('CNC PRECISION SUITE');
      expect(brand.textContent).toContain('TOOLOPTIMIZER CNC');

      // Verifica que a sigla CNC utiliza a variável semântica --brand-cnc
      const cncSpan = container.querySelector('tspan[dx="10"]');
      expect(cncSpan).not.toBeNull();
      expect(cncSpan?.textContent).toBe('CNC');
      expect(cncSpan?.getAttribute('fill')).toContain('--brand-cnc');
    });
  });
});
