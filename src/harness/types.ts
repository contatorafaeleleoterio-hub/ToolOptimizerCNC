/**
 * src/harness/types.ts
 * Contratos de tipos para o sistema de Harness, Grafo de Execução e Verificação do ToolOptimizer CNC.
 */

export type AgentRole = 'orchestrator' | 'executor' | 'verifier' | 'human_decider';

export type AgentId = 'skinner' | 'gemini' | 'dexter' | 'icaro' | 'morfeu' | 'mestre';

export type SeverityLevel = 'BAIXA' | 'MEDIA' | 'CRITICA';

export interface HarnessAgentConfig {
  role: AgentRole;
  model?: string;
  description: string;
  tools: string[];
  file_permissions?: {
    read?: string[];
    write?: string[];
    deny?: string[];
  };
  limits?: {
    max_iterations?: number;
    timeout_seconds?: number;
    max_retries_correction?: number;
    max_tokens_budget?: number;
  };
}

export interface VerificationCategory {
  name: string;
  weight: number;
  validator_command?: string;
  description: string;
}

export interface HarnessVerificationPolicy {
  threshold_minimo: number;
  zero_critical_tolerated: boolean;
  clean_context_enforced: boolean;
  categories: VerificationCategory[];
  severity_matrix: Record<SeverityLevel, {
    blocks_merge: boolean;
    penalty_score: number;
    examples: string[];
  }>;
}

export interface HarnessConfig {
  version: string;
  project: string;
  description: string;
  agents: Record<string, HarnessAgentConfig>;
  react_policy: {
    enforce_loop: boolean;
    max_consecutive_identical_actions: number;
    break_on_no_progress_iterations: number;
    record_observations: boolean;
  };
  verification_policy: HarnessVerificationPolicy;
  checkpoints: {
    pre_execution: { action: string; required_fields: string[] };
    post_execution: { action: string; verifier_agent: string };
    pre_commit: { action: string; command: string; require_clean_git_tree: boolean };
    human_escalation: { triggers: string[] };
  };
}

export type NodeType =
  | 'intent'
  | 'orchestrator'
  | 'task_branch'
  | 'verifier'
  | 'correction_loop'
  | 'checkpoint'
  | 'convergence';

export interface GraphNode {
  id: string;
  name: string;
  type: NodeType;
  assigned_agent: AgentId;
  allowed_tools: string[];
  dependencies: string[];
  is_parallel: boolean;
  inputs: string[];
  outputs: string[];
  react_loop?: {
    enabled: boolean;
    max_iterations: number;
    timeout_seconds: number;
  };
  isolated_context?: boolean;
  acceptance_policy?: {
    threshold_score: number;
    zero_critical_errors: boolean;
    required_commands?: string[];
  };
  max_retries?: number;
  on_success: string | string[] | null;
  on_failure: string | null;
  on_exhausted_retries?: string;
}

export interface ExecutionGraph {
  version: string;
  project: string;
  name: string;
  description: string;
  nodes: GraphNode[];
}

export interface VerificationEvaluationItem {
  id: string;
  atendido: boolean;
  evidencia: string;
}

export interface VerificationFault {
  descricao: string;
  severidade: SeverityLevel;
  correcao_sugerida: string;
}

export interface VerificationReport {
  taskId: string;
  verifier: AgentId;
  status: 'APROVADO' | 'REPROVADO';
  score: number;
  criteriosAvaliados: VerificationEvaluationItem[];
  falhas: VerificationFault[];
}

export interface ReactStep {
  step: number;
  thought: string;
  action: string;
  observation: string;
}
