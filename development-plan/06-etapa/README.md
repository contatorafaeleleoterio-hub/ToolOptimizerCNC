# Etapa 06 — Configuração de Consoles (Google Play & AdMob)

## 1. Nome da Etapa
**Configuração de Consoles (Google Play & AdMob)**

---

## 2. Objetivo da Etapa
Preparar e aprovar todos os cadastros, questionários regulatórios e materiais visuais necessários no **Google Play Console** e no **Google AdMob Console**, deixando o aplicativo administrativamente pronto para iniciar a fase de testes e homologação oficial da loja.

---

## 3. Escopo Preliminar
- **Google Play Console:**
  - Criação do aplicativo no console com o título oficial: *"ToolOptimizer CNC — Calculadora de Parâmetros de Corte"*;
  - Definição do idioma principal (`pt-BR`) e categoria de aplicativo (`Ferramentas` / `Produtividade`);
  - Elaboração e inserção da descrição curta (até 80 caracteres) e descrição completa (detalhando modelo de Kienzle, 4 famílias, dinâmica de $\pm 5\%$, física e segurança);
  - Upload dos ativos gráficos obrigatórios de loja:
    - Ícone de alta resolução: 512x512 PNG (32-bit com canal alfa);
    - Gráfico de recursos / Feature Graphic: 1024x500 PNG/JPEG (sem canal alfa);
    - Screenshots de telas em proporção smartphone (mínimo 4 capturas cobrindo Fresamento, Furação, Roscamento e Diagnóstico);
  - Inserção da URL da Política de Privacidade gerada na Etapa 01;
  - Preenchimento do formulário de Declaração de Anúncios (marcando: *"Sim, meu app contém anúncios"*);
  - Preenchimento da seção de **Segurança de Dados (Data Safety)** declarando a coleta de identificadores técnicos e dados de diagnóstico pelo SDK do Google AdMob;
  - Preenchimento do questionário de Classificação de Conteúdo do IARC (classificação Livre / Everyone, recomendando público-alvo principal 18+ para evitar aplicação das restrições da Política de Famílias);
  - **Monetização e Google Play Billing:**
    - Ativação da Conta de Comerciante (Google Payments Merchant Account) vinculada ao Play Console;
    - Cadastro e ativação do produto in-app gerenciado não-consumível: `br.com.tooloptimizercnc.remove_ads` com o preço de **R$ 6,90**;
- **Google AdMob Console:**
  - Cadastro do aplicativo no painel do AdMob vinculado ao identificador `br.com.tooloptimizercnc`;
  - Criação dos blocos de anúncios (Ad Units) de produção para Banner Adaptativo;
  - Verificação e aprovação do arquivo `app-ads.txt` vinculado ao domínio `tooloptimizercnc.com.br`.

---

## 4. Estado Atual Conhecido
- O projeto possui a marca, logomarca oficial e favicons em `brand/` e `public/`;
- A ficha no Google Play Console e a conta no AdMob ainda não foram vinculadas ao aplicativo v2;
- O Feature Graphic canônico (1024x500) e as capturas de tela finais com os dados do motor v2 precisam ser gerados.

---

## 5. Principais Entregáveis já Identificados
1. Ficha principal da Google Play Store preenchida e salva;
2. Pacote de artes promocionais (ícone 512x512, feature graphic 1024x500 e 4 a 6 screenshots mobile);
3. Questionários de Data Safety, IARC e Anúncios aprovados no Play Console;
4. Produto in-app gerenciado `remove_ads` (R$ 6,90) configurado e ativo na Merchant Account;
5. Ad Units criadas no AdMob e associadas ao status de verificação do `app-ads.txt`.



---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 01 (URL da Política de Privacidade e `app-ads.txt`) e Etapa 05 (Geração do `.aab` para upload inicial de metadados).
- **Etapas dependentes:** Etapa 07 (Closed Testing) e Etapa 08 (Lançamento).

---

## 7. Critérios de Conclusão Preliminares
- [ ] Todos os itens obrigatórios da seção "Conteúdo do app" no Play Console exibem status verde de aprovação.
- [ ] A ficha da loja passa na validação de resolução e formato dos ativos visuais.
- [ ] O AdMob confirma a localização e leitura bem-sucedida do arquivo `app-ads.txt`.
- [ ] O console do Google Play permite selecionar a faixa de Closed Testing para envio do primeiro pacote.

---

- **Decisão D06-1 (Público-Alvo Declarado):** Selecionar faixa etária principal a partir de 18 anos (operadores de máquina, programadores de CNC e técnicos de usinagem), evitando deliberadamente enquadramento na rigorosa *Families Policy* do Google Play, que restringe o uso de anúncios personalizados.
- **Decisão D06-2 (Identificação do Produto):** Utilizar o nome canônico *"ToolOptimizer CNC — Calculadora de Parâmetros de Corte"* para maximizar a descoberta orgânica (ASO - App Store Optimization).
- **Decisão D06-3 (Tipo e Status da Conta de Desenvolvedor):** Confirmado pelo proprietário o uso de **Conta de Pessoa Física (Individual)** já existente, **ativa, paga e aprovada** no Google Play Console. A criação e aprovação da conta estão concluídas, restando apenas o preenchimento da ficha, questionários e upload do app.
- *Demais decisões:* Pendente de refinamento na abertura da etapa.

---

## 9. Pendências da Etapa
- [x] ~~Decisão formal do proprietário sobre Conta Pessoal vs Conta de Organização (PJ)~~ — **CONCLUÍDO (Conta de Pessoa Física ativa, paga e aprovada)**;
- [ ] Captura de screenshots em resolução real utilizando aparelho físico ou simulador Android limpo;
- [ ] *Demais pendências:* Pendente de refinamento ao iniciar a execução da Etapa 06.

