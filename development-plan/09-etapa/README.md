# Etapa 09 — Operação e Monitoramento Pós-Lançamento

## 1. Nome da Etapa
**Operação e Monitoramento Pós-Lançamento**

---

## 2. Objetivo da Etapa
Estabelecer a rotina operacional contínua após a publicação pública na Google Play Store, assegurando acompanhamento diário da saúde técnica do aplicativo via **Android Vitals**, monitoramento do desempenho de monetização no **Google AdMob** e governança do ciclo de vida de atualizações para evitar qualquer degradação na experiência dos operadores e usuários industriais.

---

## 3. Escopo Preliminar
- **Monitoramento Técnico (Android Vitals):**
  - Acompanhamento do Crash Rate (meta: < 1.09% geral e < 8% por modelo específico de aparelho);
  - Acompanhamento do ANR Rate - Application Not Responding (meta: < 0.47%);
  - Monitoramento de lentidão de renderização (*slow rendering frames*);
- **Monitoramento de Monetização (Google AdMob):**
  - Acompanhamento da taxa de preenchimento (fill rate) das requisições de anúncio;
  - Monitoramento de impressões reais, eCPM e receita acumulada;
  - Verificação de ausência de restrições por tráfego inválido ou problemas no `app-ads.txt`;
- **Suporte e Feedback da Comunidade:**
  - Triagem diária de avaliações e comentários recebidos na Play Store;
  - Canal direto de resposta aos usuários para dúvidas operacionais de chão de fábrica;
- **Ciclo de Atualizações Futuras:**
  - Padronização de branches e tags para patches rápidos (hotfixes);
  - Garantia de que atualizações de versão preservem 100% dos dados gravados no IndexedDB do usuário sem corrupção ou perda de materiais customizados.

---

## 4. Estado Atual Conhecido
- O sistema já possui monitoramento web via Cloudflare Web Analytics ativo em produção;
- As métricas de telemetria Android nativas só começarão a ser geradas a partir do momento em que houver downloads ativos na Play Store.

---

## 5. Principais Entregáveis já Identificados
1. Rotina periódica de inspeção do painel Android Vitals estabelecida;
2. Painel de relatórios do Google AdMob operacional com recebimento de pagamentos configurado;
3. Procedimento documentado para lançamento de atualizações de versão sem regressões;
4. Canal de suporte pós-lançamento ativo.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 08 (Aplicativo aprovado e publicado na Google Play Store).
- **Etapas dependentes:** Nenhuma (esta é a fase de sustentação contínua do produto).

---

## 7. Critérios de Conclusão Preliminares
- [ ] O aplicativo opera há pelo menos 30 dias na Play Store sem registros de problemas no Android Vitals acima dos limiares de penalização.
- [ ] A receita e as impressões do Google AdMob são registradas regularmente sem advertências de política.
- [ ] Pelo menos uma atualização de manutenção menor foi distribuída com sucesso, preservando os dados locais do usuário.

---

## 8. Decisões da Etapa
- **Decisão D09-1 (Prioridade Zero para Crashes):** Qualquer erro reportado no Android Vitals que eleve a taxa de crash acima de 1% tem prioridade máxima imediata sobre novas funcionalidades.
- **Decisão D09-2 (Invariância do IndexedDB):** Migrações de esquema do banco local `tooloptimizer_db` devem sempre conter lógica de upgrade não destrutiva.
- *Demais decisões:* Pendente de refinamento na abertura da etapa.

---

## 9. Pendências da Etapa
- [ ] Configuração de dados bancários/fiscais no AdMob para recebimento dos repasses de publicidade;
- [ ] Definição da cadência de revisões operacionais (ex: semanal durante o primeiro mês, mensal em seguida);
- [ ] *Demais pendências:* Pendente de refinamento ao iniciar a execução da Etapa 09.
