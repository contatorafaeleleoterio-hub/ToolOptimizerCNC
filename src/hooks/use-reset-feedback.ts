import { useEffect, useState, useRef } from 'react';
import { useMachiningStore } from '@/store';

/**
 * Hook to provide visual feedback when parameters are reset
 * Triggers animation when material, tool, operation, or manual params change
 */
export function useResetFeedback() {
  const [isResetting, setIsResetting] = useState(false);

  const materialId = useMachiningStore((s) => s.materialId);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);
  const parametros = useMachiningStore((s) => s.parametros);
  const safetyFactor = useMachiningStore((s) => s.safetyFactor);

  const prevMaterialId = useRef(materialId);
  const prevDiametro = useRef(ferramenta.diametro);
  const prevNumeroArestas = useRef(ferramenta.numeroArestas);
  const prevBalanco = useRef(ferramenta.balanco);
  const prevTipoOperacao = useRef(tipoOperacao);
  const prevAp = useRef(parametros.ap);
  const prevAe = useRef(parametros.ae);
  const prevFz = useRef(parametros.fz);
  const prevVc = useRef(parametros.vc);
  const prevSafetyFactor = useRef(safetyFactor);

  useEffect(() => {
    // Check if any input parameter has changed
    const hasChanged =
      materialId !== prevMaterialId.current ||
      ferramenta.diametro !== prevDiametro.current ||
      ferramenta.numeroArestas !== prevNumeroArestas.current ||
      ferramenta.balanco !== prevBalanco.current ||
      tipoOperacao !== prevTipoOperacao.current ||
      parametros.ap !== prevAp.current ||
      parametros.ae !== prevAe.current ||
      parametros.fz !== prevFz.current ||
      parametros.vc !== prevVc.current ||
      safetyFactor !== prevSafetyFactor.current;

    if (hasChanged) {
      // Trigger reset animation
      setIsResetting(true);
      const timer = setTimeout(() => setIsResetting(false), 800); // 800ms animation

      // Update refs
      prevMaterialId.current = materialId;
      prevDiametro.current = ferramenta.diametro;
      prevNumeroArestas.current = ferramenta.numeroArestas;
      prevBalanco.current = ferramenta.balanco;
      prevTipoOperacao.current = tipoOperacao;
      prevAp.current = parametros.ap;
      prevAe.current = parametros.ae;
      prevFz.current = parametros.fz;
      prevVc.current = parametros.vc;
      prevSafetyFactor.current = safetyFactor;

      return () => clearTimeout(timer);
    }
  }, [materialId, ferramenta.diametro, ferramenta.numeroArestas, ferramenta.balanco,
      tipoOperacao, parametros.ap, parametros.ae, parametros.fz, parametros.vc, safetyFactor]);

  return { isResetting };
}
