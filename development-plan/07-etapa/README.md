# Etapa 07 — Ciclo de Testes Fechados (Closed Testing)

## 1. Nome da Etapa
**Ciclo de Testes Fechados (Closed Testing)**

---

## 2. Objetivo da Etapa
Executar a homologação técnica em ambiente de testes da Google Play Store, cumprindo o requisito regulatório obrigatório do Google (mínimo de **12 testadores inscritos continuamente por 14 dias**, para contas de desenvolvedor individuais criadas após novembro de 2023), coletando telemetria de uso real, validando o comportamento dos anúncios de teste e assegurando estabilidade máxima sem falhas críticas no Android Vitals antes de solicitar acesso à faixa de Produção.

---

## 3. Escopo Preliminar
- Criação e configuração de uma faixa de **Teste Fechado (Closed Testing Track)** no Google Play Console;
- Upload do pacote de release `.aab` assinado (gerado na Etapa 05);
- Recrutamento e cadastro de uma lista de testadores reais (recomendado: 15 a 20 pessoas via lista de e-mails Google para garantir margem de segurança contra desistências);
- Envio do link de convite oficial da Play Store aos testadores selecionados;
- Monitoramento diário da retenção dos testadores (o painel do Google exige 14 dias consecutivos com pelo menos 12 usuários mantendo o opt-in ativo);
- Homologação dos seguintes fluxos em dispositivos físicos:
  - Inicialização a frio e a quente do app;
  - Exibição e resposta do formulário de consentimento UMP;
  - Carregamento de banners de teste sem travamento de interface;
  - Cálculos com as 4 famílias de usinagem e persistência em IndexedDB;
  - Operação desconectada (modo avião / sem internet);
  - Interceptação correta do botão físico voltar do Android;
- Acompanhamento dos relatórios de pré-lançamento do Google (Pre-launch Report) e do painel **Android Vitals** (Crash rate e ANR rate).

---

## 4. Estado Atual Conhecido
- O motor de cálculo e a casca React possuem 120 testes automatizados locais com 100% de aprovação;
- Sendo a conta de **Pessoa Física (Individual)** ativa, aplica-se o requisito regulatório obrigatório do Google de no mínimo 12 testadores com opt-in contínuo por 14 dias antes de solicitar acesso à faixa de Produção (se criada pós nov/2023).


---

## 5. Principais Entregáveis já Identificados
1. Faixa de Closed Testing ativa no Google Play Console;
2. Grupo de teste formado e engajado com mais de 12 usuários validados;
3. Relatório de Pré-Lançamento (Pre-launch Report) do Google analisado e sem alertas impeditivos;
4. Telemetria do Android Vitals com zero falhas críticas acumuladas ao longo dos 14 dias;
5. Habilitação do botão de solicitação de acesso à Produção no console.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 05 (Build Release `.aab` gerado) e Etapa 06 (Consoles configurados e aprovados).
- **Etapas dependentes:** Etapa 08 (Troca para IDs de Produção e Lançamento).

---

## 7. Critérios de Conclusão Preliminares
- [ ] O período obrigatório de 14 dias de teste fechado foi concluído no Google Play Console.
- [ ] No mínimo 12 testadores permaneceram com status de opt-in ativo durante todo o período.
- [ ] O Android Vitals registra Crash Rate < 1.09% e ANR Rate < 0.47% (dentro dos limites do Google).
- [ ] O Google Play Console autoriza o envio do pedido formal de publicação na faixa de Produção.

---

## 8. Decisões da Etapa
- **Decisão D07-1 (Tamanho do Grupo de Teste):** Alistar entre 15 e 20 participantes para criar redundância de segurança acima do piso mínimo de 12 testadores exigido pelo Google.
- **Decisão D07-2 (Uso de Feedback):** Centralizar o relato de impressões e eventuais anomalias visuais via canal direto (e-mail ou formulário simples) antes de qualquer ajuste no código.
- *Demais decisões:* Pendente de refinamento na abertura da etapa.

---

## 9. Pendências da Etapa
- [ ] Elaborar lista de contatos/operadores que atuarão como testadores voluntários;
- [ ] Redigir o roteiro básico de testes para guiar os participantes durante as simulações;
- [ ] *Demais pendências:* Pendente de refinamento ao iniciar a execução da Etapa 07.
