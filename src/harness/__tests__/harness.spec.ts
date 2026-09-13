/**
 * src/harness/__tests__/harness.spec.ts
 * Suíte de testes do Harness, Grafo de Execução, ReAct e Verificação Isolada do ToolOptimizer CNC.
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { validateGraphStructure, validateHarnessToolPrivileges, parseHarnessYaml } from '../validator.js';
import { evaluateVerification, simulateReactLoop, evaluateConvergence } from '../engine.js';
import type { ExecutionGraph, HarnessConfig, VerificationReport, HarnessVerificationPolicy } from '../types.js';

describe('Harness & Graph Engineering — Fase 3', () => {
  const rootDir = process.cwd();
  const graphPath = path.join(rootDir, 'grafo_fluxo.json');
  const harnessPath = path.join(rootDir, 'harness_config.yml');

  it('deve possuir o arquivo grafo_fluxo.json válido e estruturalmente íntegro', () => {
    expect(fs.existsSync(graphPath)).toBe(true);
    const rawData = fs.readFileSync(graphPath, 'utf-8');
    const graph = JSON.parse(rawData) as ExecutionGraph;

    const result = validateGraphStructure(graph);
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
    expect(graph.nodes.length).toBeGreaterThanOrEqual(10);
  });

  it('deve garantir que todo ramo de tarefa possui verificação isolada correspondente', () => {
    const rawData = fs.readFileSync(graphPath, 'utf-8');
    const graph = JSON.parse(rawData) as ExecutionGraph;

    const taskNodes = graph.nodes.filter(n => n.type === 'task_branch');
    const verifierNodes = graph.nodes.filter(n => n.type === 'verifier');

    for (const task of taskNodes) {
      const verifier = verifierNodes.find(v => v.dependencies.includes(task.id));
      expect(verifier).toBeDefined();
      expect(verifier?.isolated_context).toBe(true);
    }
  });

  it('deve respeitar o princípio do menor privilégio entre o grafo e o harness (parse real do YAML)', () => {
    expect(fs.existsSync(harnessPath)).toBe(true);
    const rawGraph = fs.readFileSync(graphPath, 'utf-8');
    const graph = JSON.parse(rawGraph) as ExecutionGraph;

    // Parse dinâmico direto do arquivo harness_config.yml físico (elimina mock e drift)
    const rawHarness = fs.readFileSync(harnessPath, 'utf-8');
    const liveHarness = parseHarnessYaml(rawHarness);

    const result = validateHarnessToolPrivileges(graph, liveHarness);
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
  });

  describe('Verificação Isolada e Threshold', () => {
    const policy: HarnessVerificationPolicy = {
      threshold_minimo: 85,
      zero_critical_tolerated: true,
      clean_context_enforced: true,
      categories: [],
      severity_matrix: {} as any,
    };

    it('deve reprovar entrega se nota for inferior ao threshold (ex: 80/100)', () => {
      const report: VerificationReport = {
        taskId: 'task-001',
        verifier: 'morfeu',
        status: 'REPROVADO',
        score: 80,
        criteriosAvaliados: [{ id: 'AC-1', atendido: false, evidencia: 'Faltou teste' }],
        falhas: [{ descricao: 'Cobertura insuficiente', severidade: 'MEDIA', correcao_sugerida: 'Adicionar teste' }],
      };

      const outcome = evaluateVerification(report, policy);
      expect(outcome.approved).toBe(false);
      expect(outcome.reason).toContain('nota insuficiente (80 < 85)');
    });

    it('deve aprovar entrega com nota >= threshold e zero erros críticos', () => {
      const report: VerificationReport = {
        taskId: 'task-002',
        verifier: 'morfeu',
        status: 'APROVADO',
        score: 90,
        criteriosAvaliados: [{ id: 'AC-1', atendido: true, evidencia: '100% testes passaram' }],
        falhas: [{ descricao: 'Ajuste de comentário', severidade: 'BAIXA', correcao_sugerida: 'Melhorar texto' }],
      };

      const outcome = evaluateVerification(report, policy);
      expect(outcome.approved).toBe(true);
      expect(outcome.blockerCount).toBe(0);
    });

    it('deve REPROVAR entrega com nota alta (ex: 95/100) se houver falha CRÍTICA bloqueadora', () => {
      const report: VerificationReport = {
        taskId: 'task-003',
        verifier: 'morfeu',
        status: 'REPROVADO',
        score: 95,
        criteriosAvaliados: [{ id: 'AC-1', atendido: true, evidencia: 'OK' }],
        falhas: [
          {
            descricao: 'Quebrou regra canônica: kc1.1 alterado sem autorização',
            severidade: 'CRITICA',
            correcao_sugerida: 'Reverter alteração em materials.ts',
          },
        ],
      };

      const outcome = evaluateVerification(report, policy);
      expect(outcome.approved).toBe(false);
      expect(outcome.blockerCount).toBe(1);
      expect(outcome.reason).toContain('severidade CRÍTICA');
    });
  });

  describe('Ciclo ReAct e Guardrails', () => {
    it('deve concluir com sucesso quando critério é atingido em poucas iterações', () => {
      const steps = [
        (n: number) => ({ thought: 'Examinando erro', action: 'npm test', observation: '1 teste falhou' }),
        (n: number) => ({ thought: 'Corrigindo fórmula', action: 'edit file', observation: 'arquivo salvo' }),
        (n: number) => ({ thought: 'Validando correção', action: 'npm test', observation: 'todos passaram', done: true }),
      ];

      const result = simulateReactLoop(steps, { maxIterations: 10, maxConsecutiveIdentical: 2 });
      expect(result.completed).toBe(true);
      expect(result.stoppedReason).toBe('COMPLETED_SUCCESS');
      expect(result.totalIterations).toBe(3);
    });

    it('deve interromper execução ao atingir o limite máximo de iterações (teto do harness)', () => {
      const infiniteLoop = Array.from({ length: 15 }, (_, idx) => () => ({
        thought: `Tentativa ${idx}`,
        action: `comando_${idx}`,
        observation: 'ainda com erro',
      }));

      const result = simulateReactLoop(infiniteLoop, { maxIterations: 5, maxConsecutiveIdentical: 2 });
      expect(result.completed).toBe(false);
      expect(result.stoppedReason).toBe('MAX_ITERATIONS_REACHED');
      expect(result.totalIterations).toBe(5);
    });

    it('deve interromper loop se a mesma ação for repetida consecutivamente sem progresso', () => {
      const repetitiveSteps = [
        () => ({ thought: 'Testando', action: 'npm run check', observation: 'Erro XYZ' }),
        () => ({ thought: 'Tentando novamente idêntico', action: 'npm run check', observation: 'Erro XYZ' }),
      ];

      const result = simulateReactLoop(repetitiveSteps, { maxIterations: 10, maxConsecutiveIdentical: 2 });
      expect(result.completed).toBe(false);
      expect(result.stoppedReason).toBe('REPETITIVE_ACTION_DETECTED');
    });
  });

  describe('Convergência de Ramos Paralelos', () => {
    it('deve bloquear convergência se algum ramo obrigatório estiver pendente', () => {
      const required = ['ramo_engenharia', 'ramo_design', 'ramo_docs'];
      const statusMap = {
        ramo_engenharia: true,
        ramo_design: false, // pendente
        ramo_docs: true,
      };

      const result = evaluateConvergence(required, statusMap);
      expect(result.canConverge).toBe(false);
      expect(result.pendingBranches).toEqual(['ramo_design']);
    });

    it('deve liberar convergência quando todos os ramos requeridos estiverem aprovados', () => {
      const required = ['ramo_engenharia', 'ramo_design', 'ramo_docs'];
      const statusMap = {
        ramo_engenharia: true,
        ramo_design: true,
        ramo_docs: true,
      };

      const result = evaluateConvergence(required, statusMap);
      expect(result.canConverge).toBe(true);
      expect(result.pendingBranches).toEqual([]);
    });
  });
});
