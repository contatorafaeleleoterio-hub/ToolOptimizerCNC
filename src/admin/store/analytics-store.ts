/**
 * Analytics Store — Cloudflare Analytics integration
 * Stores API credentials and cached analytics data.
 * Persisted to localStorage under key 'tooloptimizer-analytics'.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchDailyTraffic, fetchWebVitals } from '../utils/cf-analytics-client';
import type { AnalyticsState, DailyTraffic, WebVitalsResult } from '../types/admin-types';

interface AnalyticsActions {
  setCredentials: (token: string, zoneId: string) => void;
  clearCredentials: () => void;
  fetchData: (days?: number) => Promise<void>;
  clearData: () => void;
  hasCredentials: () => boolean;
}

const INITIAL_STATE: AnalyticsState = {
  token: '',
  zoneId: '',
  daysWindow: 7,
  dailyTraffic: [],
  webVitals: null,
  vitalsUnavailable: false,
  status: 'idle',
  error: null,
  fetchedAt: null,
};

export const useAnalyticsStore = create<AnalyticsState & AnalyticsActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setCredentials: (token, zoneId) => {
        set({ token, zoneId, status: 'idle', error: null });
      },

      clearCredentials: () => {
        set({ ...INITIAL_STATE });
      },

      clearData: () => {
        set({
          daysWindow: 7,
          dailyTraffic: [],
          webVitals: null,
          vitalsUnavailable: false,
          status: 'idle',
          error: null,
          fetchedAt: null,
        });
      },

      hasCredentials: () => {
        const { token, zoneId } = get();
        return token.trim().length > 0 && zoneId.trim().length > 0;
      },

      fetchData: async (days = 7) => {
        const { token, zoneId } = get();
        if (!token || !zoneId) {
          set({ error: 'Token e Zone ID são obrigatórios.', status: 'error' });
          return;
        }

        set({ status: 'loading', error: null });

        try {
          const [traffic, vitals] = await Promise.allSettled([
            fetchDailyTraffic(token, zoneId, days),
            fetchWebVitals(token, zoneId, days),
          ]);

          if (traffic.status === 'rejected') {
            set({ status: 'error', error: traffic.reason instanceof Error ? traffic.reason.message : String(traffic.reason) });
            return;
          }

          const dailyTraffic: DailyTraffic[] = traffic.value;
          const webVitals: WebVitalsResult | null =
            vitals.status === 'fulfilled' ? vitals.value : null;

          set({
            daysWindow: days,
            dailyTraffic,
            webVitals,
            vitalsUnavailable: webVitals === null,
            status: 'success',
            error: null,
            fetchedAt: new Date().toISOString(),
          });
        } catch (err) {
          set({
            status: 'error',
            error: err instanceof Error ? err.message : 'Erro desconhecido',
          });
        }
      },
    }),
    {
      name: 'tooloptimizer-analytics',
      version: 1,
      // Only persist credentials — not transient fetch state
      partialize: (s) => ({ token: s.token, zoneId: s.zoneId }),
    },
  ),
);
