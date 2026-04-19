import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

/**
 * Hybrid Storage Service
 * Uses Capacitor Preferences on Native and localStorage on Web.
 * Provides a synchronous-like interface for Zustand where possible, 
 * or handles async/await for better reliability.
 */
export const storageService = {
  /**
   * Set a value in storage
   */
  setItem: async (key: string, value: string): Promise<void> => {
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({ key, value });
    } else {
      localStorage.setItem(key, value);
    }
  },

  /**
   * Get a value from storage
   */
  getItem: async (key: string): Promise<string | null> => {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Preferences.get({ key });
      return value;
    } else {
      return localStorage.getItem(key);
    }
  },

  /**
   * Remove a value from storage
   */
  removeItem: async (key: string): Promise<void> => {
    if (Capacitor.isNativePlatform()) {
      await Preferences.remove({ key });
    } else {
      localStorage.removeItem(key);
    }
  },

  /**
   * Clear all storage
   */
  clear: async (): Promise<void> => {
    if (Capacitor.isNativePlatform()) {
      await Preferences.clear();
    } else {
      localStorage.clear();
    }
  }
};

/**
 * Zustand-compatible Storage Adapter
 * Adapts storageService to StateStorage interface
 */
export const zustandStorageAdapter = {
  getItem: (name: string): string | null | Promise<string | null> => {
    return storageService.getItem(name);
  },
  setItem: (name: string, value: string): void | Promise<void> => {
    return storageService.setItem(name, value);
  },
  removeItem: (name: string): void | Promise<void> => {
    return storageService.removeItem(name);
  },
};
