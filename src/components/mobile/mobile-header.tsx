import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMachiningStore } from '@/store';
import { formatReport } from '../export-buttons';

export function MobileHeader() {
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
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-dark/95 backdrop-blur-lg border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-2xl drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]">
          precision_manufacturing
        </span>
        <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          ToolOptimizer<span className="font-light text-primary">CNC</span>
        </h1>
      </div>
      <div className="flex items-center gap-1">
        <button disabled={!resultado} onClick={handleCopy}
          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all flex items-center justify-center disabled:opacity-30">
          <span className="material-symbols-outlined text-lg">{copied ? 'check_circle' : 'content_copy'}</span>
        </button>
        <button onClick={() => navigate('/settings')}
          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all flex items-center justify-center">
          <span className="material-symbols-outlined text-lg">settings</span>
        </button>
      </div>
    </header>
  );
}
