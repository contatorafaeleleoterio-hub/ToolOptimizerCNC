export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-white font-sans px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[#00D9FF] mb-2">
          Política de Privacidade — ToolOptimizer CNC
        </h1>
        <p className="text-white/40 text-sm mb-10">Última atualização: abril de 2026</p>

        <Section title="1. Quem somos">
          <p>
            O ToolOptimizer CNC é um aplicativo de cálculo de parâmetros de corte para
            fresamento CNC, disponível em{' '}
            <a href="https://tooloptimizercnc.com.br" className="text-[#00D9FF] underline">
              tooloptimizercnc.com.br
            </a>{' '}
            e na Google Play Store. Desenvolvido por Rafael Eleotério (contato:{' '}
            <a href="mailto:contatorafaeleleoterio@gmail.com" className="text-[#00D9FF] underline">
              contatorafaeleleoterio@gmail.com
            </a>
            ).
          </p>
        </Section>

        <Section title="2. Dados que coletamos">
          <p className="mb-3">
            O ToolOptimizer CNC <strong>não coleta dados pessoais identificáveis</strong>. O
            aplicativo funciona localmente no seu dispositivo.
          </p>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>
              <strong>Dados de uso anônimos:</strong> acessos a páginas e métricas de
              desempenho coletados via Cloudflare Web Analytics (sem cookies, sem
              fingerprinting, sem dados pessoais).
            </li>
            <li>
              <strong>Dados locais:</strong> configurações de máquina, histórico de
              simulações e ferramentas salvas armazenados exclusivamente no seu dispositivo
              (localStorage / armazenamento interno do app). Nunca enviados para servidores
              externos.
            </li>
          </ul>
        </Section>

        <Section title="3. Dados que NÃO coletamos">
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Nome, e-mail ou qualquer informação de cadastro (não há login)</li>
            <li>Localização geográfica</li>
            <li>Contatos ou arquivos do dispositivo</li>
            <li>Dados de câmera ou microfone</li>
            <li>Identificadores de publicidade</li>
          </ul>
        </Section>

        <Section title="4. Permissões do aplicativo Android">
          <p className="mb-3">O aplicativo solicita apenas:</p>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>
              <strong>Acesso à internet:</strong> necessário para carregar o aplicativo web e
              receber atualizações.
            </li>
          </ul>
          <p className="mt-3 text-white/70">
            Nenhuma outra permissão é solicitada ou necessária.
          </p>
        </Section>

        <Section title="5. Compartilhamento de dados">
          <p>
            Não compartilhamos, vendemos ou transferimos nenhum dado para terceiros. O único
            serviço de terceiros utilizado é o{' '}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              className="text-[#00D9FF] underline"
              target="_blank"
              rel="noreferrer"
            >
              Cloudflare Web Analytics
            </a>
            , que opera sem cookies e em conformidade com GDPR/LGPD.
          </p>
        </Section>

        <Section title="6. Armazenamento e segurança">
          <p>
            Todos os dados gerados pelo uso do aplicativo (histórico, configurações,
            favoritos) são armazenados localmente no seu dispositivo e podem ser apagados a
            qualquer momento nas configurações do app ou desinstalando o aplicativo.
          </p>
        </Section>

        <Section title="7. Menores de idade">
          <p>
            O ToolOptimizer CNC é destinado a profissionais e estudantes de usinagem CNC.
            Não coletamos intencionalmente dados de menores de 13 anos.
          </p>
        </Section>

        <Section title="8. Alterações nesta política">
          <p>
            Podemos atualizar esta política periodicamente. Alterações significativas serão
            comunicadas no próprio aplicativo ou no site. O uso continuado do aplicativo após
            a publicação de alterações indica sua aceitação.
          </p>
        </Section>

        <Section title="9. Contato">
          <p>
            Dúvidas sobre privacidade:{' '}
            <a
              href="mailto:contatorafaeleleoterio@gmail.com"
              className="text-[#00D9FF] underline"
            >
              contatorafaeleleoterio@gmail.com
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
      <div className="text-white/70 leading-relaxed space-y-2">{children}</div>
    </section>
  );
}
