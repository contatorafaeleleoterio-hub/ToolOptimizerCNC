# Etapa 09 — Troca para IDs de Produção & Publicação Final

## 1. Nome da Etapa
**Troca para IDs de Produção & Publicação Final**

---

## 2. Objetivo da Etapa
Substituir os identificadores de blocos de anúncios de teste pelos IDs definitivos de produção do Google AdMob, compilar e assinar o pacote Android App Bundle (.aab) definitivo, submeter a versão para a faixa de **Produção** no Google Play Console, acompanhar o processo de revisão da equipe do Google e homologar a disponibilidade pública do aplicativo na loja, ativando o selo de download na landing page oficial.

---

## 3. Escopo Detalhado
1. **Configuração de IDs de Produção no AdMob:**
   - Inserção dos identificadores reais de blocos de anúncio (Ad Unit IDs) nos segredos de compilação ou variáveis de ambiente de produção;
   - Verificação de segurança: garantir que nenhum ID de teste do Google permaneça ativo na versão de produção.
2. **Compilação da Versão de Lançamento (Release Candidate):**
   - Incremento formal de versão: `versionCode` (ex: 201) e `versionName` ("2.0.0");
   - Disparo do workflow de produção no GitHub Actions para compilação e assinatura com a Keystore oficial;
   - Download e validação de integridade do artefato `app-release.aab`.
3. **Submissão para a Faixa de Produção:**
   - No Google Play Console, criação de nova versão na faixa de **Produção**;
   - Upload do arquivo `.aab` de produção assinado;
   - Inserção das Notas de Versão (Release Notes) em português brasileiro:
     ```
     Lançamento oficial do ToolOptimizer CNC 2.0.0!
     - Cálculos precisos de corte baseados no modelo físico de Kienzle;
     - Suporte completo a Fresamento, Furação, Roscamento e Mandrilamento;
     - Operação 100% offline no chão de fábrica;
     - Interface rápida e ergonômica para operadores e programadores CNC.
     ```
   - Revisão final de todos os itens e clique em "Enviar para análise".
4. **Acompanhamento da Revisão do Google:**
   - Monitoramento diário do status no Play Console (geralmente entre 1 a 5 dias úteis);
   - Prontidão técnica para responder a qualquer questionamento de conformidade da equipe de revisão do Google.
5. **Ativação dos Canais Públicos:**
   - Assim que o status mudar para "Publicado", verificar a indexação na Google Play Store;
   - Adicionar o botão oficial "Disponível no Google Play" na landing page (`www.tooloptimizercnc.com.br`) com o link canônico do aplicativo.

---

## 4. Estado Atual Conhecido
- O aplicativo utiliza IDs de teste durante o desenvolvimento;
- A faixa de produção estará liberada pelo Google após a conclusão com êxito do Closed Testing da Etapa 08.

---

## 5. Principais Entregáveis
1. Pacote definitivo de produção `.aab` compilado com IDs oficiais do AdMob;
2. Versão submetida e aprovada pela equipe de engenharia e conformidade do Google Play;
3. Aplicativo ativo, público e instalável a partir da Google Play Store;
4. Landing page atualizada com link direto para a página do app na Play Store.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 08 (Closed Testing aprovado e liberação de produção concedida).
- **Etapas dependentes:** Etapa 10 (Operação, Monitoramento & Suporte Contínuo).

---

## 7. Critérios de Conclusão e Aceite
- [ ] O arquivo `.aab` submetido em Produção não gera nenhum alerta impeditivo no console.
- [ ] A Google Play Store aprova a versão e exibe o status "Publicado".
- [ ] Ao pesquisar "ToolOptimizer CNC" na Play Store em um dispositivo qualquer, o app é localizado e instalado com sucesso.
- [ ] No app instalado da loja, os anúncios reais do AdMob são requisitados e o fluxo de compra de R$ 6,90 processa via Google Play Billing.
- [ ] O link na landing page direciona perfeitamente para a ficha oficial do app na loja.

---

## 8. Decisões da Etapa
- **D09-1 (Lançamento Direto a 100%):** Como o aplicativo já terá passado por 14 dias de validação intensiva com testadores reais em aparelhos diversos, a versão será distribuída diretamente a 100% dos usuários.

---

## 9. Pendências da Etapa
- [ ] Extração dos IDs de produção do painel AdMob;
- [ ] Inclusão do link da Play Store no HTML da landing page.
