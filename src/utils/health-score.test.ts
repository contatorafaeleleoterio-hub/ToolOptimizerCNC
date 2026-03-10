import { describe, it, expect } from 'vitest';
import {
  zoneToScore,
  calculateHealthScore,
  getHealthBadge,
  getHealthLevel,
  getVcZone,
  getFzZone,
  getAeZone,
  getApZone,
} from './health-score';

describe('health-score utils', () => {
  describe('zoneToScore', () => {
    it('maps verde to 100', () => {
      expect(zoneToScore('verde')).toBe(100);
    });

    it('maps amarelo to 60', () => {
      expect(zoneToScore('amarelo')).toBe(60);
    });

    it('maps vermelho to 20', () => {
      expect(zoneToScore('vermelho')).toBe(20);
    });

    it('maps bloqueado to 0', () => {
      expect(zoneToScore('bloqueado')).toBe(0);
    });
  });

  describe('calculateHealthScore', () => {
    it('calculates weighted average with all green', () => {
      const score = calculateHealthScore('verde', 'verde', 'verde', 'verde');
      expect(score).toBe(100);
    });

    it('calculates weighted average with mixed zones', () => {
      // ap(40% × 100) + fz(30% × 60) + ae(20% × 100) + Vc(10% × 100)
      // = 40 + 18 + 20 + 10 = 88
      const score = calculateHealthScore('verde', 'amarelo', 'verde', 'verde');
      expect(score).toBe(88);
    });

    it('returns 0 if any parameter is bloqueado', () => {
      const score1 = calculateHealthScore('bloqueado', 'verde', 'verde', 'verde');
      expect(score1).toBe(0);

      const score2 = calculateHealthScore('verde', 'verde', 'verde', 'bloqueado');
      expect(score2).toBe(0);

      const score3 = calculateHealthScore('verde', 'bloqueado', 'verde', 'verde');
      expect(score3).toBe(0);

      const score4 = calculateHealthScore('verde', 'verde', 'bloqueado', 'verde');
      expect(score4).toBe(0);
    });

    it('calculates example: ap(amarelo) + fz(amarelo) + ae(verde) + Vc(verde)', () => {
      // ap(40% × 60) + fz(30% × 60) + ae(20% × 100) + Vc(10% × 100)
      // = 24 + 18 + 20 + 10 = 72
      const score = calculateHealthScore('verde', 'amarelo', 'verde', 'amarelo');
      expect(score).toBe(72);
    });
  });

  describe('getHealthBadge', () => {
    it('returns "BLOQUEADO: L/D > 6" when ap is bloqueado and ldRatio > 6', () => {
      const badge = getHealthBadge('verde', 'verde', 'verde', 'bloqueado', 7.5);
      expect(badge).toContain('BLOQUEADO');
      expect(badge).toContain('L/D > 6');
    });

    it('returns "BLOQUEADO: ap crítico" when ap is bloqueado without ldRatio', () => {
      const badge = getHealthBadge('verde', 'verde', 'verde', 'bloqueado');
      expect(badge).toContain('BLOQUEADO');
      expect(badge).toContain('ap');
    });

    it('returns "BLOQUEADO: fz crítico" when fz is bloqueado', () => {
      const badge = getHealthBadge('verde', 'bloqueado', 'verde', 'verde');
      expect(badge).toContain('BLOQUEADO');
      expect(badge).toContain('fz');
    });

    it('returns "Crítico: Deflexão" when ap is vermelho', () => {
      const badge = getHealthBadge('verde', 'verde', 'verde', 'vermelho');
      expect(badge).toContain('Crítico');
      expect(badge).toContain('Deflexão');
    });

    it('returns "Alerta: Vibração" when fz is amarelo', () => {
      const badge = getHealthBadge('verde', 'amarelo', 'verde', 'verde');
      expect(badge).toContain('Alerta');
      expect(badge).toContain('Vibração');
    });

    it('returns "Saudável" when all zones are verde', () => {
      const badge = getHealthBadge('verde', 'verde', 'verde', 'verde');
      expect(badge).toBe('Saudável');
    });
  });

  describe('getHealthLevel', () => {
    it('returns bloqueado for score 0', () => {
      expect(getHealthLevel(0)).toBe('bloqueado');
    });

    it('returns vermelho for score < 40', () => {
      expect(getHealthLevel(30)).toBe('vermelho');
    });

    it('returns amarelo for score 40-75', () => {
      expect(getHealthLevel(40)).toBe('amarelo');
      expect(getHealthLevel(60)).toBe('amarelo');
      expect(getHealthLevel(75)).toBe('amarelo');
    });

    it('returns verde for score > 75', () => {
      expect(getHealthLevel(76)).toBe('verde');
      expect(getHealthLevel(100)).toBe('verde');
    });
  });

  describe('getVcZone', () => {
    it('returns vermelho when ratio < 0.50', () => {
      expect(getVcZone(40, 100)).toBe('vermelho');
    });

    it('returns amarelo when ratio 0.50-0.75', () => {
      expect(getVcZone(60, 100)).toBe('amarelo');
    });

    it('returns verde when ratio 0.75-1.20', () => {
      expect(getVcZone(80, 100)).toBe('verde');
      expect(getVcZone(120, 100)).toBe('verde');
    });

    it('returns amarelo when ratio 1.20-1.50', () => {
      expect(getVcZone(130, 100)).toBe('amarelo');
    });

    it('returns vermelho when ratio > 1.50', () => {
      expect(getVcZone(160, 100)).toBe('vermelho');
    });
  });

  describe('getFzZone', () => {
    it('returns vermelho when ratio < 0.50', () => {
      expect(getFzZone(0.04, 0.1)).toBe('vermelho');
    });

    it('returns verde when ratio 0.75-1.20', () => {
      expect(getFzZone(0.08, 0.1)).toBe('verde');
    });

    it('returns vermelho when ratio > 1.50', () => {
      expect(getFzZone(0.16, 0.1)).toBe('vermelho');
    });
  });

  describe('getAeZone', () => {
    it('returns amarelo when ratio < 0.50', () => {
      expect(getAeZone(2.0, 5.0)).toBe('amarelo');
    });

    it('returns verde when ratio 0.50-1.20', () => {
      expect(getAeZone(3.0, 5.0)).toBe('verde');
      expect(getAeZone(6.0, 5.0)).toBe('verde');
    });

    it('returns vermelho when ratio > 1.50', () => {
      expect(getAeZone(7.6, 5.0)).toBe('vermelho');
    });
  });

  describe('getApZone', () => {
    it('returns bloqueado when L/D > 6', () => {
      expect(getApZone(5, 3, 8, 50)).toBe('bloqueado'); // L/D = 50/8 = 6.25
    });

    it('returns verde when ratio 0.75-1.20 and L/D <= 6', () => {
      expect(getApZone(3.0, 4.0, 8, 20)).toBe('verde'); // L/D = 20/8 = 2.5
    });

    it('returns vermelho when ratio > 1.50 and L/D <= 6', () => {
      expect(getApZone(7.6, 5.0, 8, 20)).toBe('vermelho'); // L/D = 2.5
    });
  });
});
