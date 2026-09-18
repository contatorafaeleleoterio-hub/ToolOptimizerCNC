# Etapa 08 — Ciclo de Testes Fechados (14 Dias / 12 Testadores)

## 1. Nome da Etapa
**Ciclo de Testes Fechados (14 Dias / 12 Testadores)**

---

## 2. Objetivo da Etapa
Cumprir a exigência regulatória obrigatória do Google Play para contas de desenvolvedor Pessoa Física (individuais): executar um **Teste Fechado (Closed Testing)** com no mínimo **12 testadores distintos inscritos voluntariamente e mantendo o aplicativo por 14 dias ininterruptos**, validando estabilidade em aparelhos reais, telemetria do Android Vitals e garantindo a liberação do acesso à faixa de Produção.

---

## 3. Escopo Detalhado
1. **Configuração da Faixa de Teste Fechado no Play Console:**
   - Criação da versão de teste fechado e upload do pacote de release `.aab` assinado (gerado na Etapa 06);
   - Criação da lista de testadores via Google Groups ou e-mails individuais;
   - Obtenção dos links oficiais de participação no teste (link web de opt-in e link direto da Play Store).
2. **Recrutamento e Gestão dos Testadores:**
   - Alistamento de 15 a 20 participantes voluntários (operadores de máquina, programadores CNC, engenheiros mecânicos e contatos de confiança) para garantir margem de segurança contra eventuais desinstalações prematuras;
   - Envio de instruções claras aos testadores para que façam o download via Google Play e mantenham o app instalado no celular durante os 14 dias;
   - Envio de roteiro simples de teste cobrindo:
     - Cálculo de Fresamento, Furação, Roscamento e Mandrilamento;
     - Teste de uso em Modo Avião (desconectado);
     - Interação com telas de configurações e salvamento de ferramentas locais;
     - Simulação de compra do produto `remove_ads` (em ambiente sandbox de teste sem cobrança real).
3. **Acompanhamento Diário e Android Vitals:**
   - Verificação diária do contador de dias no painel do Google Play Console;
   - Inspeção do relatório de pré-lançamento do Google (Pre-launch Report, executado em múltiplos dispositivos na nuvem);
   - Monitoramento de falhas críticas no painel **Android Vitals**:
     - Meta de Crash Rate: **0%** (limite ruim do Google: 1.09%);
     - Meta de ANR Rate: **0%** (limite ruim do Google: 0.47%).
4. **Solicitação Formal de Acesso à Produção:**
   - Ao completar 14 dias contínuos com mais de 12 testadores ativos, o Google Play Console habilita o questionário de solicitação de acesso à Produção;
   - Preenchimento do formulário descrevendo o processo de teste executado, o feedback recebido dos operadores e as correções realizadas (se houver).

---

## 4. Estado Atual Conhecido
- A conta do desenvolvedor é Pessoa Física (Individual) aprovada, enquadrando-se obrigatoriamente nesta exigência temporal;
- Os 120 testes automatizados locais garantem alta confiabilidade do código base, reduzindo quase a zero o risco de bugs lógicos nos cálculos durante o teste real.

---

## 5. Principais Entregáveis
1. Faixa de Closed Testing ativa no Play Console com o `.aab` instalado pelos testadores;
2. Grupo de 15 a 20 testadores recrutados e engajados com opt-in ativo;
3. Relatório de pré-lançamento do Google aprovado sem impeditivos;
4. 14 dias consecutivos concluídos com sucesso no console;
5. Formulário de acesso à Produção enviado e aprovado pelo Google.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 06 (Build Release `.aab` gerado) e Etapa 07 (Ficha e consoles configurados).
- **Etapas dependentes:** Etapa 09 (Troca para IDs de Produção e Publicação Final).

---

## 7. Critérios de Conclusão e Aceite
- [ ] O contador oficial do Google Play Console marca 14 dias consecutivos de teste fechado concluídos.
- [ ] No mínimo 12 testadores permaneceram com o opt-in ativo ininterruptamente.
- [ ] O Android Vitals registra índices de estabilidade impecáveis (abaixo dos limites de penalização).
- [ ] O Google aprova a solicitação de acesso à faixa de Produção, liberando o botão de lançamento público.

---

## 8. Decisões da Etapa
- **D08-1 (Margem de Segurança de Testadores):** Cadastrar pelo menos 16 testadores para garantir que, caso 1 a 3 pessoas troquem de aparelho ou desinstalem, o piso de 12 nunca seja violado (o que reiniciaria a contagem de 14 dias).
- **D08-2 (Canal Direto de Feedback):** Manter grupo de mensagens ou canal por e-mail para que os testadores reportem qualquer travamento ou sugestão de usabilidade.

---

## 9. Pendências da Etapa
- [ ] Mapear e confirmar a lista dos primeiros 15 voluntários com e-mails Google (@gmail.com);
- [ ] Redigir o roteiro de testes passo a passo para envio aos participantes.
