/**
 * Admin Dashboard — shared TypeScript types
 * All admin domain types used across stores, pages, and components
 */

// ── Task (Requisição) ─────────────────────────────────────────────────────────

export type TaskStatus = 'aberta' | 'em_progresso' | 'concluida' | 'cancelada';
export type TaskPriority = 'baixa' | 'media' | 'alta' | 'critica';

export interface AdminTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  completedAt?: string; // ISO date
  tags: string[];
}

// ── Bug Report ────────────────────────────────────────────────────────────────

export type BugSeverity = 'baixa' | 'media' | 'alta' | 'critica';
export type BugStatus = 'novo' | 'lido' | 'resolvido' | 'ignorado';

export interface BugReport {
  id: string;
  description: string;
  severity: BugSeverity;
  status: BugStatus;
  appState?: string; // JSON snapshot of relevant app state
  version: string;
  createdAt: string; // ISO date
  resolvedAt?: string; // ISO date
}

// ── Error Entry ───────────────────────────────────────────────────────────────

export type ErrorSeverity = 'warning' | 'error' | 'fatal';

export interface ErrorEntry {
  id: string;
  message: string;
  stack?: string;
  source?: string;
  severity: ErrorSeverity;
  count: number; // deduplicated — increments on repeat
  firstSeenAt: string; // ISO date
  lastSeenAt: string; // ISO date
}

// ── Feature Flag ─────────────────────────────────────────────────────────────

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  updatedAt: string; // ISO date
}

// ── Admin Store State (aggregate) ────────────────────────────────────────────

export interface AdminState {
  tasks: AdminTask[];
  bugs: BugReport[];
  errors: ErrorEntry[];
  flags: FeatureFlag[];
}

export interface AdminActions {
  // Tasks
  addTask: (task: Omit<AdminTask, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<AdminTask, 'id' | 'createdAt'>>) => void;
  removeTask: (id: string) => void;

  // Bugs
  addBugReport: (bug: Omit<BugReport, 'id' | 'createdAt' | 'status'>) => void;
  updateBugStatus: (id: string, status: BugStatus) => void;
  removeBugReport: (id: string) => void;

  // Errors
  addError: (error: Omit<ErrorEntry, 'id' | 'count' | 'firstSeenAt' | 'lastSeenAt'>) => void;
  clearErrors: () => void;

  // Flags
  setFlag: (id: string, enabled: boolean) => void;

  // Derived counts (getters)
  getOpenTaskCount: () => number;
  getNewBugCount: () => number;
  getRecentErrorCount: () => number;
}
