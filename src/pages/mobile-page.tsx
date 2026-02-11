import { useEffect } from 'react';
import { MobileHeader } from '@/components/mobile/mobile-header';
import { MobileConfigSection } from '@/components/mobile/mobile-config-section';
import { MobileResultsSection } from '@/components/mobile/mobile-results-section';
import { MobileFineTuneSection } from '@/components/mobile/mobile-fine-tune-section';
import { Disclaimer } from '@/components/disclaimer';

export function MobilePage() {
  useEffect(() => {
    document.body.classList.add('mobile-active');
    return () => { document.body.classList.remove('mobile-active'); };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <MobileHeader />
      <main className="flex-1 flex flex-col gap-6 py-4 pb-8">
        <MobileResultsSection />
        <MobileConfigSection />
        <MobileFineTuneSection />
      </main>
      <Disclaimer />
    </div>
  );
}
