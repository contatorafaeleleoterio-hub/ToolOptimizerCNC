import { existsSync, readdirSync, statSync, readFileSync } from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { ARCHITECTURE_GRAPH } from '@/data/architecture-graph';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');

function walkSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkSourceFiles(fullPath));
      continue;
    }

    if (!/\.(ts|tsx)$/.test(entry.name)) {
      continue;
    }

    if (/\.test\.(ts|tsx)$/.test(entry.name)) {
      continue;
    }

    if (!statSync(fullPath).isFile()) {
      continue;
    }

    files.push(path.relative(ROOT, fullPath).replace(/\\/g, '/'));
  }

  return files.sort();
}

describe('Architecture Graph Integrity', () => {
  const graph = ARCHITECTURE_GRAPH;
  const nodeIds = new Set(graph.nodes.map((node) => node.id));
  const groupIds = new Set(graph.groups.map((group) => group.id));
  const validIds = new Set([...nodeIds, ...groupIds]);

  it('all mapped file paths exist on disk', () => {
    for (const node of graph.nodes) {
      expect(existsSync(path.join(ROOT, node.filePath)), `File not found for node ${node.id}: ${node.filePath}`).toBe(true);
    }
  });

  it('all edge endpoints reference known node or group ids', () => {
    for (const edge of graph.edges) {
      expect(validIds.has(edge.from), `Unknown edge source: ${edge.from}`).toBe(true);
      expect(validIds.has(edge.to), `Unknown edge target: ${edge.to}`).toBe(true);
    }
  });

  it('all group node ids reference known nodes', () => {
    for (const group of graph.groups) {
      for (const nodeId of group.nodeIds) {
        expect(nodeIds.has(nodeId), `Group ${group.id} references unknown node ${nodeId}`).toBe(true);
      }
    }
  });

  it('every node belongs to exactly one group', () => {
    const groupMembership = new Map<string, string[]>();

    for (const group of graph.groups) {
      for (const nodeId of group.nodeIds) {
        const current = groupMembership.get(nodeId) ?? [];
        current.push(group.id);
        groupMembership.set(nodeId, current);
      }
    }

    for (const node of graph.nodes) {
      const groups = groupMembership.get(node.id) ?? [];
      expect(groups.length, `Node ${node.id} should belong to exactly one group`).toBe(1);
      expect(groups[0], `Node ${node.id} should belong to group ${node.group}`).toBe(node.group);
    }
  });

  it('uses unique file paths for all nodes', () => {
    const filePaths = graph.nodes.map((node) => node.filePath);
    expect(new Set(filePaths).size).toBe(filePaths.length);
  });

  it('metadata version matches package.json', () => {
    const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8')) as { version: string };
    expect(graph.metadata.version).toBe(pkg.version);
  });

  it('warns when productive src files are missing from the graph', () => {
    const sourceFiles = walkSourceFiles(SRC_DIR);
    const mappedFiles = new Set(graph.nodes.map((node) => node.filePath));
    const missing = sourceFiles.filter((file) => !mappedFiles.has(file));

    if (missing.length > 0) {
      console.warn('Files missing from architecture graph:', missing);
    }

    expect(Array.isArray(missing)).toBe(true);
  });
});
