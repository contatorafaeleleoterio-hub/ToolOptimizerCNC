# Etapa 04 — Google Play Billing (Compra Única R$ 6,90 Offline)

## 1. Nome da Etapa
**Google Play Billing (Compra Única R$ 6,90 Offline)**

---

## 2. Objetivo da Etapa
Implementar o fluxo nativo de microtransação via **Google Play Billing Library**, permitindo que o usuário adquira o produto não-consumível definitivo de remoção de anúncios (`br.com.tooloptimizercnc.remove_ads`) pelo valor fixo de **R$ 6,90**, sem necessidade de criar conta ou realizar login no aplicativo, mantendo o status ativado em cache local seguro mesmo quando o aparelho estiver completamente sem acesso à internet no chão de fábrica.

---

## 3. Escopo Detalhado
1. **Integração do Plugin Nativo de Faturamento:**
   - Instalação e calibração de plugin nativo para Play Billing no Capacitor (ex: `@capacitor-community/in-app-purchase` ou wrapper oficial da Google Play Billing Library);
   - Declaração da permissão `com.android.vending.BILLING` em `android/app/src/main/AndroidManifest.xml`.
2. **Definição do Produto Comercial:**
   - **SKU:** `br.com.tooloptimizercnc.remove_ads`
   - **Tipo:** In-App Product (Não-consumível / Compra Única Vitalícia)
   - **Preço Final:** R$ 6,90 (sem menções promocionais de lançamento ou crachás de desconto).
3. **Serviço de Faturamento `src/ui/services/billingService.ts`:**
   - **Inicialização Transparente:** Ao abrir o app, se houver conexão, consulta as compras ativas associadas à Conta Google do dispositivo (`queryPurchasesAsync`);
   - **Zero Login:** A compra é de posse da conta Google do aparelho. Se o operador trocar de smartphone, a posse é reconhecida automaticamente pelo Google Play;
   - **Cache Offline Resiliente:** Ao confirmar a compra com sucesso, o status `isAdsRemoved: true` é gravado no storage local persistente do dispositivo (IndexedDB / Preferences). Se o operador abrir o app no modo avião, o status é lido localmente e os anúncios permanecem permanentemente desativados;
   - **Ação de Desativação no AdMob:** Integração com o `admobService.ts` para destruir imediatamente qualquer banner ativo assim que a compra for confirmada.
4. **Interface de Usuário em `SettingsView.tsx`:**
   - Adição de card discreto e elegante:
     - Título: *"Remover Anúncios"*
     - Descrição: *"Remova permanentemente todos os banners de publicidade por um pagamento único."*
     - Preço em destaque: **R$ 6,90**
     - Botão de Ação: *"Adquirir (R$ 6,90)"*
   - Botão secundário: *"Restaurar Compra"* (para forçar sincronização com o Google Play caso o operador tenha acabado de trocar de aparelho).

---

## 4. Estado Atual Conhecido
- O aplicativo opera atualmente sem módulo de monetização ou faturamento;
- A pesquisa de viabilidade e precificação (`MONETIZATION_RESEARCH.md`) definiu o valor de R$ 6,90 como a faixa de menor atrito psicológico e maior taxa de conversão para o público técnico brasileiro;
- O layout mobile em `SettingsView.tsx` possui área livre e adequada para inserção do card de compra.

---

## 5. Principais Entregáveis
1. Dependência de Google Play Billing integrada e sincronizada com o projeto Android;
2. Serviço `src/ui/services/billingService.ts` com suporte completo a compra, restauração e cache offline;
3. Interface de compra e restauração implementada em `SettingsView.tsx`;
4. Comunicação reativa entre `billingService` e `admobService`;
5. Teste de fluxo de compra validado com contas de teste no emulador/dispositivo Android.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 02 (Capacitor) e Etapa 03 (AdMob).
- **Etapas dependentes:** Etapa 05 (UX Mobile), Etapa 06 (Pipeline de Build) e Etapa 07 (Cadastro de SKU no Play Console).

---

## 7. Critérios de Conclusão e Aceite
- [ ] No navegador web (`npm run dev`), o card de compra não exibe erros e se comporta graciosamente.
- [ ] No Android, clicar em "Adquirir (R$ 6,90)" abre a folha oficial de pagamento do Google Play (Google Pay, Pix, Cartão ou Saldo).
- [ ] Após a confirmação da compra, o status é ativado instantaneamente e os anúncios desaparecem da tela.
- [ ] Ao fechar o app, desligar o Wi-Fi e os dados móveis e reabrir o app em Modo Avião, o status "Sem Anúncios" permanece ativo.
- [ ] Clicar em "Restaurar Compra" consulta o Google Play e revalida a licença sem cobrar novamente.
- [ ] A suíte de testes (`npm run check`) permanece 100% verde (120/120 testes).

---

## 8. Decisões da Etapa
- **D04-1 (Preço R$ 6,90 Fixo):** Preço definitivo sem rótulos de "promoção", transmitindo sobriedade profissional para o ambiente industrial.
- **D04-2 (Validação Client-Side sem Servidor Próprio):** Como não há backend próprio, a validação de recibo baseia-se na assinatura criptográfica fornecida pela Google Play Billing Library no dispositivo, armazenando o status localmente.
- **D04-3 (Não-Consumível Vitalício):** O produto é configurado como *Non-Consumable*, garantindo que o usuário só precise comprar uma única vez na vida.

---

## 9. Pendências da Etapa
- [ ] Validar o plugin Capacitor específico para faturamento compatível com a versão 7 do Capacitor;
- [ ] Configurar conta de e-mail de teste no Play Console para testes sem cobrança real de cartão de crédito.
