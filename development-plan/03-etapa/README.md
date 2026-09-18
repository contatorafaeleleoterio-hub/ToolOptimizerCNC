# Etapa 03 — Integração do Google AdMob e Consentimento UMP

## 1. Nome da Etapa
**Integração do Google AdMob e Consentimento UMP**

---

## 2. Objetivo da Etapa
Integrar o SDK oficial do Google Mobile Ads via plugin Capacitor, implementando a camada obrigatória de consentimento do usuário (Google User Messaging Platform - UMP para GDPR/LGPD) e inserindo anúncios em formato e posição que preservem totalmente a ergonomia de trabalho na máquina CNC, evitando cliques acidentais e tráfego inválido.

> [!NOTE]
> Para embasamento técnico aprofundado, comparativo entre AdMob vs AdSense, Google Play Billing (remoção de anúncios sem login) e projeções financeiras, consulte o documento: [`MONETIZATION_RESEARCH.md`](../MONETIZATION_RESEARCH.md).


---

## 3. Escopo Preliminar
- Instalação e configuração do plugin `@capacitor-community/admob`;
- Inserção da meta-tag de `APPLICATION_ID` do AdMob em `android/app/src/main/AndroidManifest.xml`;
- Criação de um módulo desacoplado `src/ui/services/admobService.ts` que:
  - Detecta se a aplicação está rodando em plataforma nativa (`Capacitor.isNativePlatform()`);
  - No ambiente web/desktop, desativa completamente qualquer chamada a anúncios sem gerar erros no console;
  - No ambiente Android nativo, inicializa o SDK do AdMob e gerencia o fluxo de consentimento UMP;
- Implementação do fluxo de verificação de consentimento UMP (`requestConsentInfo` e `showConsentForm`) no boot do aplicativo;
- Posicionamento de container de anúncio tipo **Banner Adaptativo no topo** da tela mobile (abaixo do cabeçalho), a uma distância segura da barra inferior fixa (`MobileStickyBar`);
- Utilização estrita de **Ad Unit IDs de teste oficiais do Google** durante desenvolvimento e testes;
- Configuração de fallback gracioso: se o dispositivo estiver offline (sem conexão), o componente oculta o espaço de anúncio sem travar a interface e sem prejudicar os cálculos físicos.

---

## 4. Estado Atual Conhecido
- Nenhuma dependência de publicidade existe atualmente no repositório;
- A aplicação é puramente web/PWA e opera offline;
- O layout mobile possui a barra inferior de ações (`MobileStickyBar`) na *thumb zone*, tornando a área inferior inadequada para anúncios devido a riscos severos de cliques acidentais.

---

## 5. Principais Entregáveis já Identificados
1. Plugin `@capacitor-community/admob` instalado e sincronizado com o projeto Android;
2. Serviço `admobService.ts` com inicialização condicional e tratamento de erros;
3. Fluxo de consentimento UMP ativo no primeiro carregamento em regiões reguladas;
4. Componente de UI para exibição de Banner no topo com suporte a modo offline;
5. Configuração validada com IDs de teste do AdMob (sem uso de IDs reais nesta etapa).

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 02 (Wrapper Android configurado).
- **Etapas dependentes:** Etapa 05 (Pipeline de Build), Etapa 06 (Consoles) e Etapa 08 (IDs de Produção).

---

## 7. Critérios de Conclusão Preliminares
- [ ] No navegador web (`npm run dev`), a aplicação abre normalmente sem erros de AdMob no console.
- [ ] No emulador ou dispositivo Android, o SDK do AdMob inicializa e exibe o banner de teste do Google.
- [ ] O banner não sobrepõe campos de entrada de dados nem compete com os botões da `MobileStickyBar`.
- [ ] Em modo avião/offline, a interface não quebra e os cálculos continuam operando normalmente.
- [ ] A suíte de testes automatizados (`npm run check`) permanece 100% verde.

---

- **Decisão D03-1 (Formato e Posição Principal):** Banner Adaptativo fixado no topo ou logo abaixo da navegação de famílias, garantindo visibilidade para os anunciantes e afastamento físico dos controles operacionais inferiores.
- **Decisão D03-3 (Modelo Híbrido e Compra Única de R$ 6,90):** **HOMOLOGADO.** O aplicativo oferecerá compra única in-app (não-consumível) gerenciada via Google Play Billing pelo valor definitivo de **R$ 6,90**, que desativa permanentemente a exibição de banners no dispositivo. O item será publicado de forma limpa e direta, sem qualquer menção promocional de lançamento. A validação opera sem login, associada à conta Google Play do aparelho com cache offline no cliente e restauração automática.
- *Demais decisões:* Pendente de refinamento na abertura da etapa.



---

## 9. Pendências da Etapa
- [ ] Definir se haverá ponto secundário para exibição de banner (ex: rodapé da tela de Configurações Gerais `SettingsView.tsx`);
- [ ] Avaliar viabilidade de anúncio intersticial com frequência máxima controlada (frequency capping de 1 a cada 10 min) apenas ao alternar entre famílias de usinagem;
- [ ] *Demais pendências:* Pendente de refinamento ao iniciar a execução da Etapa 03.
