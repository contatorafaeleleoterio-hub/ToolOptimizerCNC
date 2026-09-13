import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

/**
 * Utility for haptic feedback with platform safety guards.
 */
export const haptics = {
  /**
   * Trigger a light impact (success/tap)
   */
  impactLight: async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {
        console.warn('Haptics failed', e);
      }
    }
  },

  /**
   * Trigger a medium impact (selection change)
   */
  impactMedium: async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (e) {
        console.warn('Haptics failed', e);
      }
    }
  },

  /**
   * Trigger a heavy impact (critical action)
   */
  impactHeavy: async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Heavy });
      } catch (e) {
        console.warn('Haptics failed', e);
      }
    }
  },

  /**
   * Trigger a notification vibration
   */
  notification: async (type: NotificationType = NotificationType.Success) => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.notification({ type });
      } catch (e) {
        console.warn('Haptics failed', e);
      }
    }
  },

  /**
   * Vibrate for a specific duration (Android only)
   */
  vibrate: async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.vibrate();
      } catch (e) {
        console.warn('Haptics failed', e);
      }
    }
  }
};
