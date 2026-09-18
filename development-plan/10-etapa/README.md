# Etapa 10 — Operação, Monitoramento & Suporte Contínuo

## 1. Nome da Etapa
**Operação, Monitoramento & Suporte Contínuo**

---

## 2. Objetivo da Etapa
Estabelecer a rotina operacional pós-lançamento, garantindo alta estabilidade técnica através da vigilância ativa do **Android Vitals**, monitoramento do desempenho comercial nos consoles oficiais do **Google Play** e **Google AdMob**, atendimento cordial e técnico aos usuários via e-mail e execução de atualizações de versão sem risco de corrupção ou perda de dados locais no **IndexedDB**.

---

## 3. Escopo Detalhado
1. **Monitoramento Técnico e Android Vitals:**
   - Inspeção periódica (semanal no 1º mês, quinzenal em seguida) dos indicadores de qualidade do Google:
     - **Crash Rate:** Meta $\le 0.5\%$ (limiar ruim do Google: 1.09%);
     - **ANR Rate (App Não Responde):** Meta $\le 0.2\%$ (limiar ruim do Google: 0.47%);
     - **Slow Render Rate:** Monitoramento de taxa de quadros lentos durante animações de cálculo.
2. **Monitoramento Comercial & Gestão Financeira:**
   - **Google Play Console:** Acompanhamento de aquisições do produto `remove_ads` (R$ 6,90), taxa de conversão, solicitações de reembolso e extratos mensais de repasse para a conta bancária do titular;
   - **Google AdMob Console:** Acompanhamento de impressões, eCPM médio por região, receita diária acumulada e garantia de ausência de alertas sobre `app-ads.txt` ou tráfego inválido.
3. **Gestão de Suporte & Avaliações da Loja:**
   - Monitoramento diário da caixa postal `tooloptimizercnc@gmail.com`;
   - Resposta a dúvidas técnicas de chão de fábrica (compatibilidade de materiais, dúvidas de cálculo de Kienzle e sugestões de ferramentas);
   - Acompanhamento dos comentários e reviews na Google Play Store, respondendo com profissionalismo e registrando ideias para versões futuras.
4. **Governança de Atualizações e Não-Regressão de Dados Locais:**
   - Procedimento obrigatório para futuros lançamentos (v2.0.1, v2.1.0, etc.):
     - **Invariância do IndexedDB:** Toda e qualquer alteração no esquema do banco de dados local `tooloptimizer_db` deve ser estritamente aditiva (novos campos opcionais);
     - **Proibição Expressa:** Nunca executar chamadas destrutivas (`deleteDatabase` ou remoção de stores existentes), garantindo que ferramentas, máquinas e materiais customizados cadastrados pelo operador permaneçam intactos após a atualização do app pela Play Store;
     - Execução da suíte completa de testes no Vitest (`npm run check`) antes de qualquer publicação de atualização.

---

## 4. Estado Atual Conhecido
- O motor físico e o IndexedDB possuem cobertura de testes automatizados com validação estrita;
- A operação não demanda manutenção de servidores próprios nem bancos de dados em nuvem, garantindo custo fixo zero e manutenção extremamente simplificada.

---

## 5. Principais Entregáveis
1. Painel de saúde operacional estável no Android Vitals com métricas abaixo dos limiares de penalização;
2. Extratos de receita de publicidade e compras in-app fluindo normalmente para o titular;
3. Caixa de suporte `tooloptimizercnc@gmail.com` operando com tempo de resposta ágil;
4. Protocolo documentado de atualização segura de versão sem perda de dados locais.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 09 (Aplicativo publicado e ativo na Google Play Store).
- **Etapas dependentes:** Nenhuma (fase contínua de ciclo de vida do produto).

---

## 7. Critérios de Conclusão e Aceite
- [ ] O aplicativo opera há pelo menos 30 dias na Play Store sem registros de problemas no Android Vitals que ameacem a visibilidade do app.
- [ ] A receita do AdMob e as compras de R$ 6,90 do Play Billing são liquidadas sem retenções ou advertências.
- [ ] Pelo menos uma atualização menor (patch) foi distribuída com sucesso comprovando que o banco IndexedDB dos usuários continuou intacto.

---

## 8. Decisões da Etapa
- **D10-1 (Tolerância Zero a Regressão de Dados):** Atualizações de software nunca podem resetar preferências ou tabelas customizadas do usuário.
- **D10-2 (Prioridade de Correção de Bugs):** Relatos de crashes recebidos pelo Android Vitals têm prioridade absoluta sobre o desenvolvimento de novos recursos ou famílias de usinagem.

---

## 9. Pendências da Etapa
- [ ] Configuração de alertas automáticos por e-mail no Play Console para notificações imediatas de anomalias no Android Vitals.
