/**
 * src/harness/engine.ts
 * Motor de execução simulada para verificação isolada, ciclos ReAct e convergência do Harness.
 */

import type {
  VerificationReport,
  HarnessVerificationPolicy,
  ReactStep,
} from './types.js';

export interface EvaluationOutcome {
  approved: boolean;
  score: number;
  reason: string;
  blockerCount: number;
}

/**
 * Avalia o relatório emitido pelo Verificador Independente contra a política do Harness.
 * Regra: Score >= threshold_minimo E zero falhas críticas.
 */
export function evaluateVerification(
  report: VerificationReport,
  policy: HarnessVerificationPolicy
): EvaluationOutcome {
  const criticalFaults = report.falhas.filter(f => f.severidade === 'CRITICA');
  const blockerCount = criticalFaults.length;

  if (policy.zero_critical_tolerated && blockerCount > 0) {
    return {
      approved: false,
      score: report.score,
      reason: `Reprovado por conter ${blockerCount} falha(s) de severidade CRÍTICA, mesmo com nota ${report.score}/${policy.threshold_minimo}.`,
      blockerCount,
    };
  }

  if (report.score < policy.threshold_minimo) {
    return {
      approved: false,
      score: report.score,
      reason: `Reprovado por nota insuficiente (${report.score} < ${policy.threshold_minimo}).`,
      blockerCount,
    };
  }

  return {
    approved: true,
    score: report.score,
    reason: `Aprovado com nota ${report.score}/${policy.threshold_minimo} e zero bloqueadores críticos.`,
    blockerCount: 0,
  };
}

export interface ReactLoopOptions {
  maxIterations: number;
  maxConsecutiveIdentical: number;
}

export interface ReactLoopResult {
  completed: boolean;
  totalIterations: number;
  history: ReactStep[];
  stoppedReason: 'COMPLETED_SUCCESS' | 'MAX_ITERATIONS_REACHED' | 'REPETITIVE_ACTION_DETECTED';
}

/**
 * Executa um ciclo ReAct com monitoramento rígido contra loops improdutivos e repetições.
 */
export function simulateReactLoop(
  stepGenerators: Array<(stepNum: number) => { thought: string; action: string; observation: string; done?: boolean }>,
  options: ReactLoopOptions
): ReactLoopResult {
  const history: ReactStep[] = [];
  let consecutiveCount = 0;
  let lastAction = '';

  for (let i = 0; i < stepGenerators.length; i++) {
    const stepNum = i + 1;

    if (stepNum > options.maxIterations) {
      return {
        completed: false,
        totalIterations: stepNum - 1,
        history,
        stoppedReason: 'MAX_ITERATIONS_REACHED',
      };
    }

    const generator = stepGenerators[i];
    if (!generator) break;
    const current = generator(stepNum);

    history.push({
      step: stepNum,
      thought: current.thought,
      action: current.action,
      observation: current.observation,
    });

    // Detecção de repetições improdutivas
    if (current.action === lastAction) {
      consecutiveCount++;
      if (consecutiveCount >= options.maxConsecutiveIdentical) {
        return {
          completed: false,
          totalIterations: stepNum,
          history,
          stoppedReason: 'REPETITIVE_ACTION_DETECTED',
        };
      }
    } else {
      consecutiveCount = 1;
      lastAction = current.action;
    }

    if (current.done) {
      return {
        completed: true,
        totalIterations: stepNum,
        history,
        stoppedReason: 'COMPLETED_SUCCESS',
      };
    }
  }

  return {
    completed: false,
    totalIterations: history.length,
    history,
    stoppedReason: 'MAX_ITERATIONS_REACHED',
  };
}

/**
 * Avalia se todos os ramos pré-requisitos convergiram com sucesso antes de autorizar o merge/commit.
 */
export function evaluateConvergence(
  requiredBranches: string[],
  branchStatusMap: Record<string, boolean>
): { canConverge: boolean; pendingBranches: string[] } {
  const pendingBranches = requiredBranches.filter(
    branchId => branchStatusMap[branchId] !== true
  );

  return {
    canConverge: pendingBranches.length === 0,
    pendingBranches,
  };
}
