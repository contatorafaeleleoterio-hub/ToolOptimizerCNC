# Etapa 03 — Google AdMob & UMP (SDK Nativo & Consentimento)

## 1. Nome da Etapa
**Google AdMob & UMP (SDK Nativo & Consentimento)**

---

## 2. Objetivo da Etapa
Integrar o SDK oficial do Google Mobile Ads (GMA) via plugin nativo do Capacitor, implementando a camada mandatória de consentimento de privacidade do usuário (Google User Messaging Platform - UMP SDK para conformidade com LGPD e GDPR) e configurando a exibição de banners adaptativos discretos no topo do aplicativo, com isolamento absoluto contra cliques acidentais e tratamento de falha silenciosa para quando o operador estiver sem conexão à internet.

> [!NOTE]
> A implementação da compra in-app para remoção de anúncios (Google Play Billing) é tratada separadamente na [Etapa 04](../04-etapa/README.md).
> O embasamento de mercado e diretrizes de monetização estão documentados em [`MONETIZATION_RESEARCH.md`](../MONETIZATION_RESEARCH.md).

---

## 3. Escopo Detalhado
1. **Instalação do Plugin Nativo:**
   - Adicionar `@capacitor-community/admob` ao `package.json`;
   - Inserir a meta-tag `com.google.android.gms.ads.APPLICATION_ID` no `android/app/src/main/AndroidManifest.xml`.
2. **Camada de Consentimento UMP (LGPD / GDPR):**
   - Configuração do formulário de consentimento via `AdMob.requestConsentInfo()` e `AdMob.showConsentForm()`;
   - O consentimento é solicitado no primeiro acesso em regiões reguladas antes de inicializar o carregamento de anúncios personalizados.
3. **Módulo Desacoplado `src/ui/services/admobService.ts`:**
   - Verificação de plataforma: se executado no navegador web (desktop ou PWA), o módulo permanece inerte e não faz chamadas ao AdMob;
   - No Android nativo, inicializa o SDK após resolução de consentimento;
   - Tratamento de status: escuta o estado de compra do [billingService.ts](../04-etapa/README.md). Se o usuário possuir o status `isAdsRemoved = true`, o AdMob nunca é inicializado ou exibe banners.
4. **Posicionamento e Ergonomia Industrial do Banner:**
   - Formato: **Adaptive Banner** fixado no topo da visualização mobile (abaixo do `MobileHeader`);
   - Distanciamento total da barra inferior de ação rápida (`MobileStickyBar`), eliminando qualquer possibilidade de cliques acidentais na *thumb zone* do operador;
   - Suporte a modo offline: se não houver internet no chão de fábrica, a requisição de anúncio expira silenciosamente sem exibir caixas cinzas ou quebrar o fluxo de cálculo.
5. **IDs de Teste Seguros:**
   - Uso exclusivo dos IDs de teste universais fornecidos pelo Google durante toda a fase de desenvolvimento e testes fechados, prevenindo suspensão de conta por tráfego inválido.

---

## 4. Estado Atual Conhecido
- Nenhuma dependência de publicidade existe no repositório;
- A aplicação é puramente web/PWA e opera offline;
- O layout mobile foi otimizado com touch targets de 44px, mas precisa reservar o espaço visual do banner sem empurrar componentes de forma brusca (evitando Cumulative Layout Shift - CLS).

---

## 5. Principais Entregáveis
1. Plugin `@capacitor-community/admob` instalado e sincronizado com `android/`;
2. Meta-tags de aplicação AdMob presentes no manifesto Android;
3. Serviço `src/ui/services/admobService.ts` encapsulado, resiliente e reativo ao status de compra in-app;
4. Componente de banner adaptativo no topo do layout mobile;
5. Fluxo UMP funcional para coleta de consentimento LGPD.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 02 (Capacitor configurado).
- **Etapas dependentes:** Etapa 04 (Play Billing), Etapa 06 (Pipeline de Build) e Etapa 07 (Configuração de Consoles).

---

## 7. Critérios de Conclusão e Aceite
- [ ] No navegador web (`npm run dev`), a aplicação abre normalmente sem erros de AdMob no console.
- [ ] No dispositivo Android com internet, o banner de teste oficial do Google é exibido no topo.
- [ ] O banner não sobrepõe campos de entrada de dados nem compete com a `MobileStickyBar`.
- [ ] Em modo avião (sem internet), o app abre instantaneamente, os cálculos funcionam e nenhum erro visível é emitido.
- [ ] A suíte de testes (`npm run check`) permanece 100% aprovada (120/120 testes).

---

## 8. Decisões da Etapa
- **D03-1 (Banner no Topo):** Posicionamento fixado no topo para proteção contra cliques acidentais e conformidade com as diretrizes do Google AdMob.
- **D03-2 (Isolamento Web):** Nenhum script de AdMob/AdSense é carregado na versão web ou PWA.
- **D03-3 (IDs de Teste Obrigatórios):** Proibição de uso de IDs de produção nesta fase para proteger a conta AdMob recém-criada.

---

## 9. Pendências da Etapa
- [ ] Validar compatibilidade do `@capacitor-community/admob` com Capacitor 7;
- [ ] Testar renderização do banner adaptativo em telas de diferentes larguras (360px a 440px).
