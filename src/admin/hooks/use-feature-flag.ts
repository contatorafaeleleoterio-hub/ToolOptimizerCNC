/**
 * useFeatureFlag — reads a feature flag value from the admin store
 * Returns true if the flag is enabled, false if disabled or not found.
 *
 * Usage:
 *   const isEnabled = useFeatureFlag('bug_report_button');
 */

import { useAdminStore } from '../store/admin-store';

export function useFeatureFlag(id: string): boolean {
  return useAdminStore((s) => {
    const flag = s.flags.find((f) => f.id === id);
    return flag?.enabled ?? false;
  });
}
