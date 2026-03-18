/**
 * Admin Store — central state for admin dashboard
 * Persisted to localStorage under key 'tooloptimizer-admin'
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AdminState,
  AdminActions,
  AdminTask,
  BugReport,
  BugStatus,
  ErrorEntry,
} from '../types/admin-types';

// Default feature flags — extended in Phase 7
const DEFAULT_FLAGS = [
  { id: 'admin_dashboard', name: 'Admin Dashboard', description: 'Ativa área administrativa', enabled: true, updatedAt: new Date().toISOString() },
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function now(): string {
  return new Date().toISOString();
}

const DEFAULT_STATE: AdminState = {
  tasks: [],
  bugs: [],
  errors: [],
  flags: DEFAULT_FLAGS,
};

export const useAdminStore = create<AdminState & AdminActions>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      // ── Tasks ────────────────────────────────────────────────────────────

      addTask: (task) => {
        const entry: AdminTask = {
          ...task,
          id: generateId(),
          createdAt: now(),
          updatedAt: now(),
        };
        set((s) => ({ tasks: [...s.tasks, entry] }));
      },

      updateTask: (id, updates) => {
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: now() } : t
          ),
        }));
      },

      removeTask: (id) => {
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) }));
      },

      // ── Bugs ─────────────────────────────────────────────────────────────

      addBugReport: (bug) => {
        const entry: BugReport = {
          ...bug,
          id: generateId(),
          status: 'novo',
          createdAt: now(),
        };
        set((s) => ({ bugs: [entry, ...s.bugs] }));
      },

      updateBugStatus: (id, status: BugStatus) => {
        set((s) => ({
          bugs: s.bugs.map((b) =>
            b.id === id
              ? { ...b, status, resolvedAt: status === 'resolvido' ? now() : b.resolvedAt }
              : b
          ),
        }));
      },

      removeBugReport: (id) => {
        set((s) => ({ bugs: s.bugs.filter((b) => b.id !== id) }));
      },

      // ── Errors ───────────────────────────────────────────────────────────

      addError: (error) => {
        const existing = get().errors.find(
          (e) => e.message === error.message && e.source === error.source
        );
        if (existing) {
          // Deduplicate — increment count
          set((s) => ({
            errors: s.errors.map((e) =>
              e.id === existing.id ? { ...e, count: e.count + 1, lastSeenAt: now() } : e
            ),
          }));
        } else {
          const entry: ErrorEntry = {
            ...error,
            id: generateId(),
            count: 1,
            firstSeenAt: now(),
            lastSeenAt: now(),
          };
          set((s) => ({ errors: [entry, ...s.errors] }));
        }
      },

      removeError: (id) => {
        set((s) => ({ errors: s.errors.filter((e) => e.id !== id) }));
      },

      clearErrors: () => {
        set({ errors: [] });
      },

      // ── Flags ────────────────────────────────────────────────────────────

      setFlag: (id, enabled) => {
        set((s) => ({
          flags: s.flags.map((f) => (f.id === id ? { ...f, enabled, updatedAt: now() } : f)),
        }));
      },

      // ── Derived counts ───────────────────────────────────────────────────

      getOpenTaskCount: () => {
        return get().tasks.filter((t) => t.status === 'aberta' || t.status === 'em_progresso').length;
      },

      getNewBugCount: () => {
        return get().bugs.filter((b) => b.status === 'novo').length;
      },

      getRecentErrorCount: () => {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        return get().errors.filter((e) => e.lastSeenAt >= oneDayAgo).length;
      },
    }),
    {
      name: 'tooloptimizer-admin',
      version: 1,
    }
  )
);
