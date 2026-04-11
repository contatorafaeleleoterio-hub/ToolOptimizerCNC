import React, { useState } from 'react';
import type { FavoritoCompleto, ResultadoUsinagem } from '@/types/index';
import { LIMITES_PADRAO_MAQUINA, SAFETY_RULES_PADRAO } from '@/types/index';
import { useFavoritesStore } from '@/store';
import { getMaterialById } from '@/data';
import {
  calculateRPM, calculateEffectiveFz, calculateFeedRate, calculateMRR,
  calculatePower, calculateTorque, validateLDRatio, validateInputs,
  validateMachineLimits, calcularSliderBounds,
} from '@/engine/index';
import { calculateHealthScore, getVcZone, getFzZone, getAeZone, getApZone } from '@/utils/health-score';

interface FavoriteEditModalProps {
  favorite: FavoritoCompleto;
  onClose: () => void;
}

/** Recalculate resultado from edited parametros using pure engine functions */
function recalcular(
  fav: FavoritoCompleto,
  params: { vc: number; fz: number; ae: number; ap: number },
): ResultadoUsinagem | null {
  const material = getMaterialById(fav.materialId);
  if (!material) return null;

  const { diametro: D, numeroArestas: Z, balanco } = fav.ferramenta;
  const { vc, fz, ae, ap } = params;

  try { validateInputs({ d: D, ap, ae, fz, vc, z: Z }); }
  catch { return null; }

  const baseRPM = calculateRPM(vc, D);
  const chipResult = calculateEffectiveFz(fz, ae, D);
  const baseFeed = calculateFeedRate(chipResult.fzEfetivo, Z, baseRPM);

  const mrr = calculateMRR(ap, ae, baseFeed);
  const kc = material.kc1_1;
  const lim = LIMITES_PADRAO_MAQUINA;
  const potenciaMotor = calculatePower(mrr, kc, lim.eficiencia) * fav.safetyFactor;
  const potenciaCorte = ((mrr * kc) / 60000) * fav.safetyFactor;
  const torque = calculateTorque(potenciaMotor, baseRPM) * fav.safetyFactor;
  const ldNivel = validateLDRatio(balanco, D, SAFETY_RULES_PADRAO.ld);
  const razaoLD = balanco / D;
  const avisos = validateMachineLimits({ rpm: baseRPM, power: potenciaMotor, feed: baseFeed }, lim);

  if (ldNivel === 'amarelo') avisos.push(`L/D ratio (${razaoLD.toFixed(1)}) em zona de alerta`);
  else if (ldNivel === 'vermelho') avisos.push(`L/D ratio (${razaoLD.toFixed(1)}) em zona crítica — risco de vibração`);
  else if (ldNivel === 'bloqueado') avisos.push(`L/D ratio (${razaoLD.toFixed(1)}) > 6 — BLOQUEADO no MVP`);

  let nivel: 'verde' | 'amarelo' | 'vermelho' | 'bloqueado' = 'verde';
  if (ldNivel === 'bloqueado') nivel = 'bloqueado';
  else if (ldNivel === 'vermelho' || avisos.some((a) => a.includes('excede'))) nivel = 'vermelho';
  else if (ldNivel === 'amarelo') nivel = 'amarelo';

  const powerHeadroom = Math.max(0, ((lim.maxPotencia - potenciaMotor) / lim.maxPotencia) * 100);

  const bounds = calcularSliderBounds(material, fav.ferramenta, fav.tipoOperacao);
  const healthScore = calculateHealthScore(
    getVcZone(vc, bounds.vc.recomendado),
    getFzZone(chipResult.fzEfetivo, bounds.fz.recomendado),
    getAeZone(ae, bounds.ae.recomendado),
    getApZone(ap, bounds.ap.recomendado, D, balanco),
  );

  return {
    rpm: baseRPM,
    avanco: baseFeed,
    potenciaCorte,
    potenciaMotor,
    torque,
    mrr,
    vcReal: (Math.PI * D * baseRPM) / 1000,
    fzEfetivo: chipResult.fzEfetivo,
    seguranca: { nivel, avisos, razaoLD, ctf: chipResult.ctfFactor },
    powerHeadroom,
    healthScore,
  };
}

export function FavoriteEditModal({ favorite, onClose }: FavoriteEditModalProps) {
  const updateFavorite = useFavoritesStore((s) => s.updateFavorite);

  const [vc, setVc]     = useState(favorite.parametros.vc);
  const [fz, setFz]     = useState(favorite.parametros.fz);
  const [ae, setAe]     = useState(favorite.parametros.ae);
  const [ap, setAp]     = useState(favorite.parametros.ap);
  const [note, setNote] = useState(favorite.userNote);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const novoResultado = recalcular(favorite, { vc, fz, ae, ap });
    if (!novoResultado) {
      setError('Parâmetros inválidos — verifique os valores inseridos.');
      return;
    }
    updateFavorite(favorite.id, {
      parametros: { vc, fz, ae, ap },
      resultado: novoResultado,
      userNote: note,
    });
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors';
  const labelCls = 'text-xs text-gray-400 uppercase tracking-wide mb-1 block';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#0f1419] border border-white/10 rounded-xl p-5 w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Editar Favorito</h2>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {favorite.materialNome} · {favorite.tipoOperacao}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Parametros */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={labelCls}>Vc (m/min)</label>
            <input
              type="number" min={1} step={1}
              value={vc} onChange={(e) => setVc(Number(e.target.value))}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>fz (mm/dente)</label>
            <input
              type="number" min={0.001} step={0.001}
              value={fz} onChange={(e) => setFz(Number(e.target.value))}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>ae (mm)</label>
            <input
              type="number" min={0.01} step={0.01}
              value={ae} onChange={(e) => setAe(Number(e.target.value))}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>ap (mm)</label>
            <input
              type="number" min={0.01} step={0.01}
              value={ap} onChange={(e) => setAp(Number(e.target.value))}
              className={inputCls}
            />
          </div>
        </div>

        {/* Note */}
        <div className="mb-4">
          <label className={labelCls}>Nota (opcional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={200}
            rows={2}
            placeholder="Observações sobre este setup..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 mb-3">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-lg bg-primary/20 border border-primary/40 text-sm text-primary hover:bg-primary/30 transition-colors font-medium"
          >
            Salvar e Recalcular
          </button>
        </div>
      </div>
    </div>
  );
}
