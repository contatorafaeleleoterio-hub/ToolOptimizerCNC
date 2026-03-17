import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMachiningStore } from '@/store';
import { usePlausible } from '@/hooks/use-plausible';
import { formatReport } from './export-buttons';
import { useAdminStore } from '@/admin/store/admin-store';

const BUG_EMAIL = 'contatorafaeleleoterio@gmail.com';
const APP_VERSION = '0.6.0';

interface Props {
  variant?: 'desktop' | 'mobile';
}

export function BugReportButton({ variant = 'desktop' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {variant === 'desktop' ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
          aria-label="Reportar bug"
        >
          <span className="material-symbols-outlined text-lg">bug_report</span>
          <span className="text-xs font-medium">Reportar Bug</span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all flex items-center justify-center"
          aria-label="Reportar bug"
        >
          <span className="material-symbols-outlined text-lg">bug_report</span>
        </button>
      )}
      {isOpen && <BugReportModal onClose={() => setIsOpen(false)} />}
    </>
  );
}

function BugReportModal({ onClose }: { onClose: () => void }) {
  const [description, setDescription] = useState('');
  const [includeState, setIncludeState] = useState(true);
  const { track } = usePlausible();
  const addBugReport = useAdminStore((s) => s.addBugReport);

  const resultado = useMachiningStore((s) => s.resultado);
  const materialId = useMachiningStore((s) => s.materialId);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);
  const parametros = useMachiningStore((s) => s.parametros);
  const limitesMaquina = useMachiningStore((s) => s.limitesMaquina);
  const safetyFactor = useMachiningStore((s) => s.safetyFactor);

  const handleSend = () => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const stateReport =
      includeState && resultado
        ? formatReport({ resultado, materialId, ferramenta, tipoOperacao, parametros, limitesMaquina, safetyFactor })
        : '';

    const bodyLines = [
      'Descrição do Problema:',
      description || '(sem descrição)',
      '',
      '---',
      'Informações do Sistema:',
      `Versão: ${APP_VERSION}`,
      `Data/Hora: ${timestamp}`,
      `Navegador: ${navigator.userAgent}`,
      `Tela: ${screen.width}x${screen.height}`,
    ];
    if (stateReport) {
      bodyLines.push('', '---', 'Estado da Aplicação:', stateReport);
    }

    const subject = encodeURIComponent(`[Bug Report] ToolOptimizer CNC v${APP_VERSION}`);
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailtoUrl = `mailto:${BUG_EMAIL}?subject=${subject}&body=${body}`;

    // Save to admin store (persisted locally — visible in /admin/inbox)
    addBugReport({
      description: description || '(sem descrição)',
      severity: 'media',
      appState: includeState && stateReport ? stateReport : undefined,
      version: APP_VERSION,
    });

    track('Bug_Reportado');
    onClose();
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 50);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 shadow-glass p-6 mx-4 flex flex-col gap-4" style={{ backgroundColor: '#161B22' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-xl" style={{ color: '#f39c12' }}>
              bug_report
            </span>
            <span className="text-sm font-semibold">Reportar Bug</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors" aria-label="Fechar">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-400">Descreva o problema encontrado</label>
            <span className="text-xs text-gray-600 font-mono">{description.length}/500</span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: O cálculo de RPM retornou um valor inesperado ao selecionar..."
            rows={4}
            maxLength={500}
            className="w-full rounded-lg bg-white/5 border border-white/10 text-white text-sm px-3 py-2 resize-none focus:outline-none focus:border-white/30 placeholder:text-gray-600"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeState}
            onChange={(e) => setIncludeState(e.target.checked)}
            className="w-4 h-4 accent-cyan-400"
          />
          <span className="text-xs text-gray-400">
            Incluir estado atual da aplicação no e-mail
            {!resultado && ' (sem simulação ativa)'}
          </span>
        </label>

        <p className="text-xs text-gray-600">
          Ao clicar em &quot;Enviar&quot;, seu cliente de e-mail será aberto com as informações preenchidas.
        </p>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs text-gray-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-black transition-all active:scale-[0.98]"
            style={{ backgroundColor: '#00D9FF' }}
          >
            <span className="material-symbols-outlined text-sm">send</span>
            Enviar por E-mail
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
