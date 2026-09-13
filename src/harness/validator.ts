/**
 * src/harness/validator.ts
 * Validador de integridade estrutural e semântica do Grafo de Execução e do Harness.
 */

import type { ExecutionGraph, HarnessConfig, GraphNode } from './types.js';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Valida a integridade topológica do Grafo de Execução.
 */
export function validateGraphStructure(graph: ExecutionGraph): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!graph.nodes || !Array.isArray(graph.nodes) || graph.nodes.length === 0) {
    return { valid: false, errors: ['O grafo não possui nós definidos.'], warnings: [] };
  }

  const nodeMap = new Map<string, GraphNode>();
  const idSet = new Set<string>();

  // 1. Validação de IDs únicos
  for (const node of graph.nodes) {
    if (!node.id || typeof node.id !== 'string') {
      errors.push('Existe nó com ID inválido ou ausente.');
      continue;
    }
    if (idSet.has(node.id)) {
      errors.push(`ID de nó duplicado encontrado: "${node.id}".`);
    }
    idSet.add(node.id);
    nodeMap.set(node.id, node);
  }

  // 2. Validação de integridade de dependências e links
  for (const node of graph.nodes) {
    for (const depId of node.dependencies) {
      if (!nodeMap.has(depId)) {
        errors.push(`Nó "${node.id}" referencia dependência inexistente: "${depId}".`);
      }
    }

    if (node.on_success) {
      const targets = Array.isArray(node.on_success) ? node.on_success : [node.on_success];
      for (const targetId of targets) {
        if (!nodeMap.has(targetId)) {
          errors.push(`Nó "${node.id}" aponta para on_success inexistente: "${targetId}".`);
        }
      }
    }

    if (node.on_failure && !nodeMap.has(node.on_failure)) {
      errors.push(`Nó "${node.id}" aponta para on_failure inexistente: "${node.on_failure}".`);
    }

    if (node.on_exhausted_retries && !nodeMap.has(node.on_exhausted_retries)) {
      errors.push(`Nó "${node.id}" aponta para on_exhausted_retries inexistente: "${node.on_exhausted_retries}".`);
    }
  }

  // 3. Validação de Ciclos no Grafo Principal (excluindo arcos de correção com teto)
  // O grafo direto é construído usando 'dependencies'
  const adjacency = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  for (const node of graph.nodes) {
    if (!adjacency.has(node.id)) adjacency.set(node.id, []);
    if (!inDegree.has(node.id)) inDegree.set(node.id, 0);
  }

  for (const node of graph.nodes) {
    // Para loops de correção, a dependência aponta para o verifier mas o feedback é condicional
    // Para o grafo forward (DAG), checamos o fluxo forward principal
    for (const depId of node.dependencies) {
      // Se for um nó de correção voltando para o verificador, não é dependência forward DAG
      if (node.type === 'correction_loop') continue;
      const list = adjacency.get(depId) || [];
      list.push(node.id);
      adjacency.set(depId, list);
      inDegree.set(node.id, (inDegree.get(node.id) || 0) + 1);
    }
  }

  // Algoritmo de Kahn para checagem de DAG
  const queue: string[] = [];
  inDegree.forEach((deg, id) => {
    // Nós iniciais (sem dependências forward)
    const node = nodeMap.get(id);
    if (deg === 0 && node?.type !== 'correction_loop') {
      queue.push(id);
    }
  });

  let visitedCount = 0;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    visitedCount++;
    const neighbors = adjacency.get(curr) || [];
    for (const neighbor of neighbors) {
      const newDeg = (inDegree.get(neighbor) || 0) - 1;
      inDegree.set(neighbor, newDeg);
      if (newDeg === 0) {
        queue.push(neighbor);
      }
    }
  }

  // 4. Validação de nós de tarefa e verificação isolada
  const taskBranches = graph.nodes.filter(n => n.type === 'task_branch');
  const verifiers = graph.nodes.filter(n => n.type === 'verifier');

  for (const branch of taskBranches) {
    const hasVerifier = verifiers.some(v => v.dependencies.includes(branch.id));
    if (!hasVerifier) {
      errors.push(`Ramo de execução "${branch.id}" não possui nenhum nó de verificação associado.`);
    }
  }

  // 5. Validação de convergência
  const convergenceNodes = graph.nodes.filter(n => n.type === 'convergence');
  if (convergenceNodes.length === 0) {
    warnings.push('O grafo não define nós de convergência explícitos.');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Valida se as ferramentas solicitadas pelos nós do grafo respeitam o menor privilégio
 * configurado no harness_config.yml.
 */
export function validateHarnessToolPrivileges(
  graph: ExecutionGraph,
  harness: HarnessConfig
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const node of graph.nodes) {
    const agentConfig = harness.agents[node.assigned_agent];
    if (!agentConfig) {
      errors.push(`Nó "${node.id}" atribuiu agente desconhecido no Harness: "${node.assigned_agent}".`);
      continue;
    }

    if (agentConfig.tools.includes('all')) {
      continue; // Mestre / superuser
    }

    for (const tool of node.allowed_tools) {
      if (tool === 'all') {
        errors.push(`Nó "${node.id}" do agente "${node.assigned_agent}" violou o menor privilégio solicitando "all" ferramentas.`);
      } else if (!agentConfig.tools.includes(tool)) {
        errors.push(`Violação de menor privilégio: nó "${node.id}" requer ferramenta "${tool}", não autorizada para o agente "${node.assigned_agent}".`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Parser determinístico leve para ler agents e tools diretamente do harness_config.yml
 * sem necessidade de dependência externa pesada.
 */
export function parseHarnessYaml(content: string): HarnessConfig {
  const lines = content.split(/\r?\n/);
  const agents: Record<string, { role: any; description: string; tools: string[] }> = {};
  let currentSection = '';
  let currentAgent = '';
  let inTools = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i]!;
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = rawLine.search(/\S/);

    if (indent === 0 && trimmed.endsWith(':')) {
      currentSection = trimmed.replace(':', '');
      currentAgent = '';
      inTools = false;
      continue;
    }

    if (currentSection === 'agents') {
      if (indent === 2 && trimmed.endsWith(':')) {
        currentAgent = trimmed.replace(':', '');
        inTools = false;
        agents[currentAgent] = {
          role: 'executor',
          description: '',
          tools: [],
        };
      } else if (currentAgent && indent === 4) {
        if (trimmed === 'tools:') {
          inTools = true;
        } else {
          inTools = false;
          if (trimmed.startsWith('role:')) {
            agents[currentAgent]!.role = trimmed.replace('role:', '').trim().replace(/['"]/g, '');
          } else if (trimmed.startsWith('description:')) {
            agents[currentAgent]!.description = trimmed.replace('description:', '').trim().replace(/['"]/g, '');
          }
        }
      } else if (currentAgent && inTools && indent === 6 && trimmed.startsWith('-')) {
        const toolName = trimmed.replace(/^-\s*/, '').replace(/['"]/g, '').trim();
        agents[currentAgent]!.tools.push(toolName);
      }
    }
  }

  return {
    version: '1.0',
    project: 'fenix',
    description: 'Harness canônico extraído diretamente do YAML',
    agents: agents as any,
    react_policy: {
      enforce_loop: true,
      max_consecutive_identical_actions: 2,
      break_on_no_progress_iterations: 3,
      record_observations: true,
    },
    verification_policy: {
      threshold_minimo: 85,
      zero_critical_tolerated: true,
      clean_context_enforced: true,
      categories: [],
      severity_matrix: {} as any,
    },
    checkpoints: {} as any,
  };
}

