import logoImg from '../../assets/logo-tooloptimizer.png';
import { useNavigate } from 'react-router-dom';
import { BugReportButton } from '../bug-report-button';

export function MobileHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-dark/95 backdrop-blur-lg border-b border-white/5">
      <div className="flex items-center">
        <img src={logoImg} alt="ToolOptimizer CNC" style={{ height: '32px', objectFit: 'contain' }} />
      </div>
      <div className="flex items-center gap-1">
        <BugReportButton variant="mobile" />
        <button onClick={() => navigate('/settings')}
          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all flex items-center justify-center">
          <span className="material-symbols-outlined text-lg">settings</span>
        </button>
      </div>
    </header>
  );
}
