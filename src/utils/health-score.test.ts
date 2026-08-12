import { describe, it, expect } from 'vitest';
import { evaluateHealth } from './health-score';

describe('health-score utils', () => {
  describe('evaluateHealth — score', () => {
    // Every parameter exactly at its recommended value
    const ideal = {
      vc: 200, vcRecomendado: 200,
      fz: 0.1, fzRecomendado: 0.1,
      ae: 2.7, aeRecomendado: 2.7,
      ap: 6, apRecomendado: 6,
      ldRatio: 4,
    };

    it('returns 100 when every parameter is at the recommendation', () => {
      expect(evaluateHealth(ideal).score).toBe(100);
    });

    it('returns 0 when L/D > 6', () => {
      expect(evaluateHealth({ ...ideal, ldRatio: 6.5 }).score).toBe(0);
    });

    it('reacts to a small change inside the green zone', () => {
      // Vc 5% above the recommendation is still "verde", but the score must move
      const slightlyOff = evaluateHealth({ ...ideal, vc: 210 }).score;
      expect(slightlyOff).toBeLessThan(100);
      expect(slightlyOff).toBeGreaterThan(95);
    });

    it('degrades monotonically as fz moves away from the recommendation', () => {
      const scores = [0.10, 0.12, 0.14, 0.16, 0.18].map(
        (fz) => evaluateHealth({ ...ideal, fz }).score,
      );
      for (let i = 1; i < scores.length; i++) {
        expect(scores[i]).toBeLessThan(scores[i - 1]);
      }
    });

    it('scores the zone boundaries at the getHealthLevel cutoffs', () => {
      // Vc weighs 10%: at ratio 1.50 its score is 40, so total = 90 + 4 = 94
      expect(evaluateHealth({ ...ideal, vc: 300 }).score).toBe(94);
      // ap weighs 40%: at ratio 1.50 its score is 40, so total = 60 + 16 = 76
      expect(evaluateHealth({ ...ideal, ap: 9 }).score).toBe(76);
    });

    it('floors each parameter score at 0 beyond twice the recommendation', () => {
      expect(evaluateHealth({ ...ideal, ap: 20 }).score).toBe(60);
    });

    it('weights ap above fz above ae above vc', () => {
      // Same 1.50 ratio on each parameter — heavier ones must hurt more
      const byParam = {
        ap: evaluateHealth({ ...ideal, ap: 9 }).score,
        fz: evaluateHealth({ ...ideal, fz: 0.15 }).score,
        ae: evaluateHealth({ ...ideal, ae: 4.05 }).score,
        vc: evaluateHealth({ ...ideal, vc: 300 }).score,
      };
      expect(byParam.ap).toBeLessThan(byParam.fz);
      expect(byParam.fz).toBeLessThan(byParam.ae);
      expect(byParam.ae).toBeLessThan(byParam.vc);
    });
  });

  describe('evaluateHealth — badge', () => {
    const ideal = {
      vc: 200, vcRecomendado: 200,
      fz: 0.1, fzRecomendado: 0.1,
      ae: 2.7, aeRecomendado: 2.7,
      ap: 6, apRecomendado: 6,
      ldRatio: 4,
    };

    it('returns "Saudável" when every parameter is in the green zone', () => {
      expect(evaluateHealth(ideal).badge).toBe('Saudável');
    });

    it('returns "BLOQUEADO: L/D > 6" when the overhang is blocked', () => {
      const badge = evaluateHealth({ ...ideal, ldRatio: 7.5 }).badge;
      expect(badge).toContain('BLOQUEADO');
      expect(badge).toContain('L/D > 6');
    });

    it('names fz as "Vibração" when it is the parameter out of range', () => {
      const badge = evaluateHealth({ ...ideal, fz: 0.14 }).badge;
      expect(badge).toContain('Alerta');
      expect(badge).toContain('Vibração');
    });

    it('names ap as "Deflexão" and escalates to "Crítico" when it is far out', () => {
      const badge = evaluateHealth({ ...ideal, ap: 12 }).badge;
      expect(badge).toContain('Crítico');
      expect(badge).toContain('Deflexão');
    });

    it('reports the worst parameter, not the first one out of range', () => {
      // vc slightly off (still yellow), ae badly off (red) — ae must win
      const badge = evaluateHealth({ ...ideal, vc: 260, ae: 5.4 }).badge;
      expect(badge).toContain('Crítico');
      expect(badge).toContain('Engajamento');
    });

    it('levels the badge by the worst parameter, not by the score', () => {
      // ae at twice the recommendation scores 0, but weighs only 20%:
      // the average stays green while the badge must scream red
      const result = evaluateHealth({ ...ideal, ae: 5.4 });
      expect(result.score).toBeGreaterThan(75);
      expect(result.level).toBe('vermelho');
      expect(result.badge).toContain('Crítico');
    });

    it('never reports a parameter as bloqueado — only L/D blocks', () => {
      expect(evaluateHealth({ ...ideal, ap: 20 }).level).toBe('vermelho');
      expect(evaluateHealth({ ...ideal, ldRatio: 7 }).level).toBe('bloqueado');
    });

    it('breaks ties toward the heaviest parameter (ap)', () => {
      const badge = evaluateHealth({ ...ideal, ap: 9, fz: 0.15 }).badge;
      expect(badge).toContain('Deflexão');
    });
  });

});
