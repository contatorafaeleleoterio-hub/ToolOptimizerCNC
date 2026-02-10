import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMachiningStore } from '@/store';
import { getMaterialById, OPERACOES } from '@/data';
import type { ResultadoUsinagem, Ferramenta, ParametrosUsinagem, LimitesMaquina } from '@/types';
import { TipoUsinagem } from '@/types';

interface ReportState {
  resultado: ResultadoUsinagem | null;
  materialId: number;
  ferramenta: Ferramenta;
  tipoOperacao: TipoUsinagem;
  parametros: ParametrosUsinagem;
  limitesMaquina: LimitesMaquina;
  safetyFactor: number;
}

const SEG_LABELS: Record<string, string> = {
  verde: 'SEGURO', amarelo: 'ALERTA', vermelho: 'CRÍTICO', bloqueado: 'BLOQUEADO',
};
const TOOL_NAMES: Record<string, string> = { topo: 'Topo', toroidal: 'Toroidal', esferica: 'Esférica' };

export function formatReport(state: ReportState): string {
  const { resultado, materialId, ferramenta, tipoOperacao, parametros, safetyFactor } = state;
  if (!resultado) return '';

  const material = getMaterialById(materialId);
  const operacao = OPERACOES.find((o) => o.tipo === tipoOperacao);
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const { rpm, avanco, potenciaMotor, mrr, vcReal, seguranca } = resultado;
  const ld = seguranca.razaoLD.toFixed(1);

  const lines = [
    'ToolOptimizer CNC — Relatório', `Data: ${date}`,
    '═══════════════════════════════════════', '',
    'CONFIGURAÇÃO',
    `Material: ${material?.nome ?? 'N/A'} | Operação: ${operacao?.nome ?? tipoOperacao}`,
    `Ferramenta: ${TOOL_NAMES[ferramenta.tipo] ?? ferramenta.tipo} Ø${ferramenta.diametro}mm x ${ferramenta.numeroArestas} arestas`,
    `Balanço: ${ferramenta.balanco}mm (L/D: ${ld}) | Fator Segurança: ${safetyFactor}`, '',
    'PARÂMETROS DE ENTRADA',
    `Vc: ${parametros.vc} m/min | fz: ${parametros.fz} mm/dente`,
    `ap: ${parametros.ap} mm | ae: ${parametros.ae} mm`, '',
    'RESULTADOS CALCULADOS',
    `RPM: ${Math.round(rpm).toLocaleString('en-US')} | Avanço: ${Math.round(avanco).toLocaleString('en-US')} mm/min`,
    `Potência Motor: ${potenciaMotor.toFixed(2)} kW | MRR: ${mrr.toFixed(1)} cm³/min`,
    `Vc Real: ${vcReal.toFixed(0)} m/min`, '',
    `SEGURANÇA: ${SEG_LABELS[seguranca.nivel] ?? seguranca.nivel}`,
  ];

  if (seguranca.avisos.length > 0) {
    seguranca.avisos.forEach((a) => lines.push(`  ⚠ ${a}`));
  }
  lines.push('', '═══════════════════════════════════════', 'Gerado por ToolOptimizer CNC');
  return lines.join('\n');
}

export function ExportButtons() {
  const navigate = useNavigate();
  const resultado = useMachiningStore((s) => s.resultado);
  const materialId = useMachiningStore((s) => s.materialId);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);
  const parametros = useMachiningStore((s) => s.parametros);
  const limitesMaquina = useMachiningStore((s) => s.limitesMaquina);
  const safetyFactor = useMachiningStore((s) => s.safetyFactor);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatReport({ resultado, materialId, ferramenta, tipoOperacao, parametros, limitesMaquina, safetyFactor });
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  };

  return (
    <div className="flex items-center gap-2">
      <button disabled={!resultado} onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed">
        <span className="material-symbols-outlined text-lg">{copied ? 'check_circle' : 'content_copy'}</span>
        <span className="text-xs font-medium">{copied ? 'Copiado!' : 'Copiar'}</span>
      </button>
      <button onClick={() => navigate('/settings')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]">
        <span className="material-symbols-outlined text-lg">settings</span>
        <span className="text-xs font-medium">Configurações</span>
      </button>
    </div>
  );
}
