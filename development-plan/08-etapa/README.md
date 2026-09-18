# Etapa 08 — Troca para IDs de Produção e Lançamento

## 1. Nome da Etapa
**Troca para IDs de Produção e Lançamento**

---

## 2. Objetivo da Etapa
Migrar a configuração de publicidade dos blocos de teste para os identificadores definitivos de produção do Google AdMob, compilar e assinar a versão candidata a release definitiva (`.aab`), submeter a aplicação para a faixa de Produção no Google Play Console e acompanhar a auditoria humana e automatizada da equipe do Google até a aprovação pública final na loja.

---

## 3. Escopo Preliminar
- Obtenção dos Ad Unit IDs reais gerados no painel do Google AdMob;
- Configuração dos IDs de produção via variáveis de ambiente seguras no pipeline de build do GitHub Actions (sem expô-los estaticamente de forma desprotegida);
- Geração da compilação definitiva de release com otimização completa e assinatura digital oficial;
- Teste de sanidade do pacote final em dispositivo físico (conferindo que anúncios reais ou em modo de serviço são solicitados sem crashes);
- Submissão formal do pacote `.aab` para a faixa de **Produção** no Google Play Console;
- Acompanhamento diário do status de revisão da equipe do Google;
- Resposta técnica rápida caso a equipe de conformidade do Google solicite esclarecimentos durante a revisão.

---

## 4. Estado Atual Conhecido
- O aplicativo utiliza IDs de teste em fases anteriores para evitar suspensão por tráfego inválido;
- A faixa de Produção permanece bloqueada no Play Console até a conclusão com sucesso do ciclo de testes da Etapa 07.

---

## 5. Principais Entregáveis já Identificados
1. Pacote definitivo de produção `.aab` assinado e indexado;
2. Versão submetida na faixa de Produção do Google Play Console;
3. Status "Em análise" e posterior status "Publicado" no console;
4. Link público oficial na Google Play Store ativo e acessível para qualquer usuário.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 07 (Closed Testing concluído e aprovado pelo Google Play).
- **Etapas dependentes:** Etapa 09 (Operação e Monitoramento Pós-Lançamento).

---

## 7. Critérios de Conclusão Preliminares
- [ ] O pacote `.aab` com IDs de produção foi submetido sem erros de validação no console.
- [ ] A equipe de revisão do Google Play aprovou a versão sem exigência de alterações ou advertências.
- [ ] O aplicativo aparece na busca pública da Google Play Store com botão "Instalar".
- [ ] O download do app a partir da Play Store em um dispositivo novo instala e executa perfeitamente.

---

## 8. Decisões da Etapa
- **Decisão D08-1 (Lançamento Escalonado vs Imediato):** Avaliar início de distribuição com lançamento escalonado (ex: 20% no dia 1, progredindo para 100% em 5 dias) para monitorar estabilidade inicial em escala, ou lançamento direto a 100%.
- *Demais decisões:* Pendente de refinamento na abertura da etapa.

---

## 9. Pendências da Etapa
- [ ] Coleta dos identificadores definitivos dos blocos de anúncio do AdMob;
- [ ] *Demais pendências:* Pendente de refinamento ao iniciar a execução da Etapa 08.
