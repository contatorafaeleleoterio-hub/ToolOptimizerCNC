import { useState } from 'react';
import { ARCHITECTURE_GRAPH } from '@/data/architecture-graph';
import type { ArchGroupId } from '@/data/architecture-graph';
import { MobileArchGroupCard } from './mobile-arch-group-card';
import { MobileArchNodeList } from './mobile-arch-node-list';
import { MobileArchDataFlow } from './mobile-arch-data-flow';

type MobileArchTab = 'overview' | 'modules' | 'flow';

const TAB_CONFIG: { id: MobileArchTab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Visao Geral', icon: 'grid_view' },
  { id: 'modules', label: 'Modulos', icon: 'view_module' },
  { id: 'flow', label: 'Fluxo', icon: 'account_tree' },
];

function getGroupStats(groupId: string) {
  const nodes = ARCHITECTURE_GRAPH.nodes.filter((n) => n.group === groupId);
  return {
    nodeCount: nodes.length,
    totalLines: nodes.reduce((sum, n) => sum + n.lines, 0),
  };
}

interface MobileArchitectureViewProps {
  onBack: () => void;
}

export function MobileArchitectureView({ onBack }: MobileArchitectureViewProps) {
  const [tab, setTab] = useState<MobileArchTab>('overview');
  const [selectedGroup, setSelectedGroup] = useState<ArchGroupId | null>(null);
  const { metadata, groups } = ARCHITECTURE_GRAPH;

  const handleGroupTap = (groupId: ArchGroupId) => {
    setSelectedGroup(groupId);
    setTab('modules');
  };

  const handleBackToOverview = () => {
    setSelectedGroup(null);
    setTab('overview');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/95 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all active:bg-white/10"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <div>
              <h1 className="flex items-center gap-1.5 text-sm font-bold text-white">
                <span className="material-symbols-outlined text-primary text-base">account_tree</span>
                Arquitetura
              </h1>
              <p className="text-[10px] text-gray-500">Mapa do codigo fonte</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-gray-400">
            v{metadata.version}
          </span>
        </div>
      </header>

      {/* Tab Bar */}
      <nav className="sticky top-[52px] z-40 flex border-b border-white/5 bg-background-dark/95 px-2 backdrop-blur-lg">
        {TAB_CONFIG.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              if (t.id === 'overview') setSelectedGroup(null);
            }}
            className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all ${
              tab === t.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 px-4 py-4">
        {tab === 'overview' && (
          <div className="grid grid-cols-2 gap-3">
            {groups.map((group, index) => {
              const stats = getGroupStats(group.id);
              return (
                <MobileArchGroupCard
                  key={group.id}
                  group={group}
                  nodeCount={stats.nodeCount}
                  totalLines={stats.totalLines}
                  onClick={() => handleGroupTap(group.id)}
                  index={index}
                />
              );
            })}
          </div>
        )}

        {tab === 'modules' && selectedGroup && (
          <MobileArchNodeList
            group={groups.find((g) => g.id === selectedGroup)!}
            onBack={handleBackToOverview}
          />
        )}

        {tab === 'modules' && !selectedGroup && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-500">
              Selecione um grupo para explorar seus modulos:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {groups.map((group, index) => {
                const stats = getGroupStats(group.id);
                return (
                  <MobileArchGroupCard
                    key={group.id}
                    group={group}
                    nodeCount={stats.nodeCount}
                    totalLines={stats.totalLines}
                    onClick={() => setSelectedGroup(group.id)}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        )}

        {tab === 'flow' && <MobileArchDataFlow />}
      </main>

      {/* Stats Footer */}
      <footer className="border-t border-white/5 bg-background-dark/95 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center justify-center gap-3 text-[10px] text-gray-600">
          <span>{metadata.totalFiles} arquivos</span>
          <span>&middot;</span>
          <span>{metadata.totalLines.toLocaleString('pt-BR')} linhas</span>
          <span>&middot;</span>
          <span>v{metadata.version}</span>
        </div>
      </footer>
    </div>
  );
}
