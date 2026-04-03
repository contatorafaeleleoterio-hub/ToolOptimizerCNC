import { useMemo } from 'react';

interface TickerDisplayProps {
  messages: string[];
  speed?: number; // px/s
  highlight?: boolean;
}

export function TickerDisplay({ messages, speed = 60, highlight = false }: TickerDisplayProps) {
  const content = useMemo(() => messages.join(' ◆ '), [messages]);
  
  // Estimate duration based on content length
  const duration = useMemo(() => {
    const estimatedWidth = content.length * 10; // slightly more for spacing
    return Math.max(10, estimatedWidth / speed);
  }, [content, speed]);

  return (
    <div 
      className={`h-[36px] w-full bg-black/60 overflow-hidden flex items-center border-b transition-all duration-500 z-10 ${
        highlight 
          ? 'border-cyan-400/60 shadow-[0_0_15px_rgba(0,217,255,0.2)]' 
          : 'border-cyan-400/30'
      }`}
      data-testid="ticker-display"
    >
      <div 
        className="whitespace-nowrap flex items-center gap-12 animate-ticker"
        style={{ 
          animationDuration: `${duration}s`
        }}
      >
        <span className="font-mono text-[13px] text-[#00D9FF] uppercase tracking-[0.12em]">
          {content}
        </span>
        <span className="font-mono text-[13px] text-[#00D9FF] uppercase tracking-[0.12em]">
          {content}
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker linear infinite;
        }
      `}} />
    </div>
  );
}
