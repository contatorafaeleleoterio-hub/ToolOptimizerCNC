import React from 'react';

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
}

/**
 * BrandLogo — Logotipo Canônico Oficial do ToolOptimizer CNC
 *
 * Especificação: RECONCILED_DESIGN_SYSTEM.md (Fase 12 - Precision Surgical Machining)
 * Referência Vetorial: brand/Logo_ToolOptimizer.svg
 *
 * Renderiza a marca completa oficial:
 * 1. Símbolo Gauge vetorial com 3 setores e vetor ascendente (seta/raio);
 * 2. Moldura técnica contínua com gradiente de alta precisão;
 * 3. Wordmark em Urbanist com diferenciação semântica (Tool Bold + Optimizer Medium);
 * 4. Tagline técnica CNC PRECISION SUITE.
 *
 * As cores dos textos e gradientes adaptam-se dinamicamente às variáveis CSS
 * do tema ativo (:root [data-theme=claro] e [data-theme=escuro]).
 */
export default function BrandLogo({ compact = false, className = '' }: BrandLogoProps) {
  const width = compact ? 165 : 220;
  const height = compact ? 32 : 42;
  const combinedClass = ('brand-plate ' + (className || '')).trim();
  const svgClass = ('brand-logo-svg ' + (compact ? 'compact' : '')).trim();

  return (
    <div
      className={combinedClass}
      role="img"
      aria-label="Marca ToolOptimizer CNC"
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <svg
        className={svgClass}
        viewBox="0 0 1000 300"
        width={width}
        height={height}
        style={{ display: 'block', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="to-grad-sector1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16202C" />
            <stop offset="100%" stopColor="#1E2C3D" />
          </linearGradient>

          <linearGradient id="to-grad-sector2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0E7C69" />
            <stop offset="60%" stopColor="#13A88D" />
            <stop offset="100%" stopColor="#19E4BB" />
          </linearGradient>

          <linearGradient id="to-grad-sector3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#19E4BB" />
            <stop offset="100%" stopColor="#13B896" />
          </linearGradient>

          <linearGradient id="to-grad-arrow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7BC71E" />
            <stop offset="40%" stopColor="#A3F527" />
            <stop offset="100%" stopColor="#BDFF4B" />
          </linearGradient>

          <linearGradient id="to-grad-frame" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--brand-fill, #19E4BB)" stopOpacity="0.85" />
            <stop offset="50%" stopColor="var(--brand-accent, #14B8A6)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--action-fill, #BDFF4B)" stopOpacity="0.85" />
          </linearGradient>

          <filter id="to-glow-arrow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#BDFF4B" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Moldura técnica externa com cantos arredondados contornando o texto */}
        <path
          d="M 230 115 L 910 115 A 45 45 0 0 1 955 160 L 955 165 A 45 45 0 0 1 910 210 L 195 210"
          fill="none"
          stroke="url(#to-grad-frame)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Símbolo do Gauge posicionado à esquerda (escala 0.52, translação x=15, y=10) */}
        <g transform="translate(15, 10) scale(0.52)">
          {/* Setor 1: Operação nominal / estabilidade */}
          <path
            d="M 70.00 340.00 A 180 180 0 0 1 116.23 219.56 L 179.40 276.43 A 95 95 0 0 0 155.00 340.00 Z"
            fill="url(#to-grad-sector1)"
            stroke="rgba(25, 228, 187, 0.25)"
            strokeWidth="2"
          />

          {/* Setor 2: Carga contínua / rendimento acelerado */}
          <path
            d="M 124.96 210.52 A 180 180 0 0 1 370.44 206.23 L 313.57 269.40 A 95 95 0 0 0 184.01 271.66 Z"
            fill="url(#to-grad-sector2)"
            stroke="rgba(25, 228, 187, 0.45)"
            strokeWidth="2"
          />

          {/* Setor 3: Produtividade máxima */}
          <path
            d="M 379.48 214.96 A 180 180 0 0 1 430.00 340.00 L 345.00 340.00 A 95 95 0 0 0 318.34 274.01 Z"
            fill="url(#to-grad-sector3)"
            stroke="#19E4BB"
            strokeWidth="2"
          />

          {/* Seta / Vetor de aceleração luminescente */}
          <path
            d="M 115 450 L 210 270 L 248 305 L 345 170 L 330 155 L 410 95 L 385 195 L 368 188 L 262 335 L 222 298 L 115 450 Z"
            fill="url(#to-grad-arrow)"
            filter="url(#to-glow-arrow)"
            stroke="#E4FF94"
            strokeWidth="1.5"
          />
        </g>

        {/* Tipografia Refatorada em Urbanist com diferenciação semântica */}
        <text
          x="270"
          y="180"
          fontFamily="'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="88"
          letterSpacing="-0.02em"
        >
          <tspan fontWeight="700" fill="var(--tx-1, #FFFFFF)">
            Tool
          </tspan>
          <tspan fontWeight="500" fill="var(--brand-fill, #19E4BB)">
            Optimizer
          </tspan>
        </text>

        {/* Tagline técnica industrial de precisão */}
        <text
          x="275"
          y="245"
          fontFamily="'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="600"
          fontSize="19"
          fill="var(--tx-3, #8E9FB8)"
          letterSpacing="0.28em"
        >
          CNC PRECISION SUITE
        </text>
      </svg>
      {/* Texto acessível padronizado para leitores de tela e testes */}
      <span className="sr-only">TOOLOPTIMIZER</span>
    </div>
  );
}
