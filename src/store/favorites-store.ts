/**
 * Favorites Store — Complete snapshot library of validated CNC setups.
 * Separate from history-store which tracks calculation history with a simple flag.
 * Persisted to localStorage via Zustand persist middleware.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoritoCompleto, ParametrosUsinagem, ResultadoUsinagem, Ferramenta } from '@/types/index';
import { TipoUsinagem } from '@/types/index';

const FAVORITES_MAX = 50;

interface FavoritesState {
  favorites: FavoritoCompleto[];
}

interface FavoritesActions {
  /** Save complete snapshot. FIFO: removes oldest when limit reached. */
  addFavorite: (data: Omit<FavoritoCompleto, 'id' | 'timestamp' | 'editedAt' | 'userNote'>) => void;
  /** Remove favorite by id. */
  removeFavorite: (id: string) => void;
  /** Update editable fields and set editedAt. */
  updateFavorite: (id: string, updates: Partial<Pick<FavoritoCompleto, 'parametros' | 'resultado' | 'userNote'>>) => void;
  /**
   * Check if there is a favorite for the given combination.
   * Uses combo (materialId + tipoOperacao + ferramenta.tipo) — avoids float comparison.
   */
  isFavorited: (materialId: number, tipoOperacao: TipoUsinagem, ferramentaTipo: Ferramenta['tipo']) => boolean;
  /**
   * Get the most recent favorite for the given combination.
   * Returns undefined if no match.
   */
  getByCombo: (materialId: number, tipoOperacao: TipoUsinagem, ferramentaTipo: Ferramenta['tipo']) => FavoritoCompleto | undefined;
}

/** Generate a unique ID using crypto.randomUUID() when available, with timestamp fallback */
function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useFavoritesStore = create<FavoritesState & FavoritesActions>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (data) => {
        const { favorites } = get();
        const newFav: FavoritoCompleto = {
          ...data,
          id: generateId(),
          timestamp: new Date().toISOString(),
          editedAt: null,
          userNote: '',
        };
        // FIFO: remove oldest if limit reached
        const trimmed = favorites.length >= FAVORITES_MAX
          ? favorites.slice(1)
          : favorites;
        set({ favorites: [...trimmed, newFav] });
      },

      removeFavorite: (id) => {
        set((state) => ({ favorites: state.favorites.filter((f) => f.id !== id) }));
      },

      updateFavorite: (id, updates) => {
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.id === id
              ? { ...f, ...updates, editedAt: new Date().toISOString() }
              : f
          ),
        }));
      },

      isFavorited: (materialId, tipoOperacao, ferramentaTipo) =>
        get().favorites.some(
          (f) =>
            f.materialId === materialId &&
            f.tipoOperacao === tipoOperacao &&
            f.ferramenta.tipo === ferramentaTipo,
        ),

      getByCombo: (materialId, tipoOperacao, ferramentaTipo) => {
        const matches = get().favorites.filter(
          (f) =>
            f.materialId === materialId &&
            f.tipoOperacao === tipoOperacao &&
            f.ferramenta.tipo === ferramentaTipo,
        );
        // Return most recent (last added)
        return matches.length > 0 ? matches[matches.length - 1] : undefined;
      },
    }),
    {
      name: 'fenix_favorites_v1',
      version: 1,
    },
  ),
);

// Re-export types for convenience
export type { FavoritoCompleto, ParametrosUsinagem, ResultadoUsinagem };
