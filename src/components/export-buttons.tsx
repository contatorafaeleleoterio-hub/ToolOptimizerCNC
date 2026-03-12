import { useNavigate } from 'react-router-dom';
import { getMaterialById, OPERACOES } from '@/data';
import type { ResultadoUsinagem, Ferramenta, ParametrosUsinagem, LimitesMaquina } from '@/types';
import { TipoUsinagem } from '@/types';
import { BugReportButton } from './bug-report-button';

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
  verde: 'SEGURO',
  amarelo: 'ALERTA',
  vermelho: 'CRITICO',
  bloqueado: 'BLOQUEADO',
};

const TOOL_NAMES: Record<string, string> = {
  topo: 'Topo',
  toroidal: 'Toroidal',
  esferica: 'Esferica',
};

export function formatReport(state: ReportState): string {
  const { resultado, materialId, ferramenta, tipoOperacao, parametros, safetyFactor } = state;
  if (!resultado) return '';

  const material = getMaterialById(materialId);
  const operacao = OPERACOES.find((item) => item.tipo === tipoOperacao);
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const { rpm, avanco, potenciaMotor, mrr, vcReal, seguranca } = resultado;
  const ld = seguranca.razaoLD.toFixed(1);

  const lines = [
    'ToolOptimizer CNC - Relatorio', `Data: ${date}`,
    '=======================================', '',
    'CONFIGURACAO',
    `Material: ${material?.nome ?? 'N/A'} | Operacao: ${operacao?.nome ?? tipoOperacao}`,
    `Ferramenta: ${TOOL_NAMES[ferramenta.tipo] ?? ferramenta.tipo} D${ferramenta.diametro}mm x ${ferramenta.numeroArestas} arestas`,
    `Balanco: ${ferramenta.balanco}mm (L/D: ${ld}) | Fator Seguranca: ${safetyFactor}`, '',
    'PARAMETROS DE ENTRADA',
    `Vc: ${parametros.vc} m/min | fz: ${parametros.fz} mm/dente`,
    `ap: ${parametros.ap} mm | ae: ${parametros.ae} mm`, '',
    'RESULTADOS CALCULADOS',
    `RPM: ${Math.round(rpm).toLocaleString('en-US')} | Avanco: ${Math.round(avanco).toLocaleString('en-US')} mm/min`,
    `Potencia Motor: ${potenciaMotor.toFixed(2)} kW | MRR: ${mrr.toFixed(1)} cm3/min`,
    `Vc Real: ${vcReal.toFixed(0)} m/min`, '',
    `SEGURANCA: ${SEG_LABELS[seguranca.nivel] ?? seguranca.nivel}`,
  ];

  if (seguranca.avisos.length > 0) {
    seguranca.avisos.forEach((warning) => lines.push(`  - ${warning}`));
  }

  lines.push('', '=======================================', 'Gerado por ToolOptimizer CNC');
  return lines.join('\n');
}

export function ExportButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <BugReportButton />
      <button
        onClick={() => navigate('/history')}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-gray-400 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-lg">history</span>
        <span className="text-xs font-medium">Historico</span>
      </button>
      <button
        onClick={() => navigate('/architecture')}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-gray-400 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-lg">account_tree</span>
        <span className="text-xs font-medium">Mapa</span>
      </button>
      <button
        onClick={() => navigate('/settings')}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-gray-400 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-lg">settings</span>
        <span className="text-xs font-medium">Configuracoes</span>
      </button>
    </div>
  );
}
