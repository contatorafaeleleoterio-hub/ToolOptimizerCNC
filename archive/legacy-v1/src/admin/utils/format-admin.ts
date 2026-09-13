/**
 * format-admin.ts — Formatting utilities for the admin dashboard
 */

/**
 * Format an ISO date as a relative string (e.g. "3h atrás", "2d atrás")
 */
export function formatRelativeDate(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `${minutes}m atrás`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d atrás`;
  return formatDate(isoDate);
}

/**
 * Format an ISO date as dd/mm/yyyy
 */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Parse a comma-separated tag string into a clean array
 */
export function parseTags(input: string): string[] {
  return input
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0);
}

/**
 * Format a tags array as a comma-separated string for inputs
 */
export function formatTagsInput(tags: string[]): string {
  return tags.join(', ');
}
