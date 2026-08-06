import { SectionTitle } from '../ui-helpers';
import { MobileCuttingParamsSliders } from './mobile-cutting-params';

export function MobileFineTuneSection() {
  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="bg-[rgba(30,38,50,0.95)] rounded-xl p-4 border border-white/10">
        <SectionTitle color="bg-primary" label="Fine Tune" />
        <p className="text-[9px] text-gray-500 mb-3">Arraste os controles para ajustar os parâmetros</p>
        <MobileCuttingParamsSliders />
      </div>
    </section>
  );
}
