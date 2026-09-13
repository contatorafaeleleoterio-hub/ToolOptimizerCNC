import { describe, it, expect } from 'vitest';
import { calculateRPM } from '@/engine/rpm';

describe('calculateRPM', () => {
  // Formula: n = (Vc * 1000) / (pi * D)

  it('Scenario A: Vc=100, D=12 -> RPM=2652.58 (+-1)', () => {
    const rpm = calculateRPM(100, 12);
    expect(rpm).toBeCloseTo(2652.58, 0);
  });

  it('Scenario B: Vc=500, D=10 -> RPM=15915.49 (+-1)', () => {
    const rpm = calculateRPM(500, 10);
    expect(rpm).toBeCloseTo(15915.49, 0);
  });

  it('Scenario C: Vc=95, D=8 -> RPM=3780.23 (+-1)', () => {
    const rpm = calculateRPM(95, 8);
    expect(rpm).toBeCloseTo(3780.23, 0);
  });

  it('should throw error when D=0', () => {
    expect(() => calculateRPM(100, 0)).toThrow();
  });

  it('should throw error when D is negative', () => {
    expect(() => calculateRPM(100, -5)).toThrow();
  });

  it('should throw error when Vc is negative', () => {
    expect(() => calculateRPM(-100, 12)).toThrow();
  });

  it('should throw error when Vc is zero', () => {
    expect(() => calculateRPM(0, 12)).toThrow();
  });
});
