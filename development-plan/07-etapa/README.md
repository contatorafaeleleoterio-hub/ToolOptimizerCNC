# Etapa 07 — Configuração Completa de Consoles (Play & AdMob)

## 1. Nome da Etapa
**Configuração Completa de Consoles (Play & AdMob)**

---

## 2. Objetivo da Etapa
Configurar e homologar todos os cadastros, fichas de loja, questionários regulatórios, ativos visuais e configurações financeiras no **Google Play Console** e no **Google AdMob Console**, deixando o aplicativo administrativamente pronto para a submissão do primeiro build e início dos testes.

---

## 3. Escopo Detalhado
1. **Google Play Console (Configuração da Loja):**
   - **Título Oficial:** *"ToolOptimizer CNC — Calculadora de Parâmetros de Usinagem"*;
   - **Descrição Curta (até 80 caracteres):** *"Cálculos precisos de corte para torneamento, fresamento e furação com Kienzle."*;
   - **Descrição Completa (ASO industrial em pt-BR):** Enfatizando 4 famílias de usinagem, modelo matemático de Kienzle, potência de corte, força de avanço, rotação (RPM), segurança de máquina e funcionamento 100% offline;
   - **Ativos Visuais Obrigatórios:**
     - Ícone de alta resolução: 512x512 PNG 32-bit;
     - Gráfico de destaque (Feature Graphic): 1024x500 PNG/JPG sem canal alfa;
     - Screenshots reais de celular: mínimo de 4 a 6 telas ilustrando Fresamento, Furação, Roscamento e Configurações;
   - **Categorização e Contato:** Categoria "Ferramentas", e-mail oficial `tooloptimizercnc@gmail.com`, site `https://www.tooloptimizercnc.com.br`.
2. **Conformidade de Conteúdo e Questionários:**
   - **Política de Privacidade:** Inserção da URL pública `https://www.tooloptimizercnc.com.br/politica-de-privacidade`;
   - **Declaração de Anúncios:** Marcar *"Sim, meu app contém anúncios"*;
   - **Segurança de Dados (Data Safety):** Declarar coleta de dados técnicos anônimos (ID do dispositivo para fins de publicidade e diagnóstico de falhas via Google AdMob); declarar que o núcleo do app não coleta dados pessoais;
   - **Classificação Indicativa (IARC):** Questionário preenchido (classificação Livre / Recomendado 18+ para evitar restrições da Política de Famílias do Google).
3. **Configuração Financeira e Produto In-App:**
   - Ativação do Perfil de Pagamentos (Merchant Account) no Google Play Console para recebimento de vendas;
   - Cadastro do produto in-app gerenciado não-consumível:
     - **ID do Produto (SKU):** `br.com.tooloptimizercnc.remove_ads`
     - **Nome:** Remover Anúncios
     - **Descrição:** Remoção definitiva de todos os banners de anúncios do aplicativo
     - **Preço:** **R$ 6,90** (fixo, moeda BRL).
4. **Google AdMob Console:**
   - Cadastro do app no painel do AdMob vinculado ao identificador `br.com.tooloptimizercnc.app`;
   - Criação dos blocos de anúncios (Ad Units) oficiais para Banner Adaptativo;
   - Verificação e aprovação do arquivo `app-ads.txt` publicado no Cloudflare Pages.

---

## 4. Estado Atual Conhecido
- Conta de Desenvolvedor Pessoa Física ativa, paga e aprovada no Google Play Console;
- E-mail oficial `tooloptimizercnc@gmail.com` estabelecido;
- Identidade visual e logotipo disponíveis em `brand/` e `public/`.

---

## 5. Principais Entregáveis
1. Ficha principal da Google Play Store preenchida e salva com ativos gráficos em conformidade;
2. Questionários de Data Safety, IARC, Anúncios e Privacidade 100% aprovados na seção "Conteúdo do app";
3. Perfil de pagamentos (Merchant Account) ativo com o produto `remove_ads` (R$ 6,90) configurado;
4. Ad Units criadas no AdMob e associadas à validação do `app-ads.txt`.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 01 (Privacidade e `app-ads.txt`), Etapa 04 (Definição do SKU de Billing) e Etapa 06 (Geração do primeiro `.aab`).
- **Etapas dependentes:** Etapa 08 (Ciclo de Testes Fechados).

---

## 7. Critérios de Conclusão e Aceite
- [ ] O Google Play Console exibe status verde em todas as seções obrigatórias de conteúdo do app.
- [ ] O produto in-app `remove_ads` (R$ 6,90) está com status "Ativo" no Play Console.
- [ ] O AdMob confirma a localização e indexação do arquivo `app-ads.txt` com status "Pronto".
- [ ] A faixa de Teste Fechado (Closed Testing) está habilitada para receber uploads.

---

## 8. Decisões da Etapa
- **D07-1 (Público 18+):** Enquadrar o aplicativo com público técnico/profissional (18+) para evitar burocracias da Families Policy sem perder alcance no chão de fábrica.
- **D07-2 (Preço R$ 6,90 Homologado):** Cadastro do valor único de R$ 6,90 sem promoções temporárias.

---

## 9. Pendências da Etapa
- [ ] Produzir os mockups de screenshots reais nas dimensões de tela aceitas pelo Play Console;
- [ ] Vincular a conta bancária do titular à Merchant Account do Google Play.
