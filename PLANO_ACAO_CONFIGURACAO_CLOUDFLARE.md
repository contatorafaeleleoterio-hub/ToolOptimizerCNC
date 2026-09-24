# Plano de Ação: Configuração de Domínios e Infraestrutura no Cloudflare

> **Projeto:** ToolOptimizer CNC  
> **Objetivo:** Realizar as duas configurações obrigatórias no painel da Cloudflare para ativação da landing page e redirecionamento de tráfego, orientando o agente no uso do navegador ou execução assistida.  
> **Status do Código:** ✅ 120/120 testes passando · Build limpo · Zero regressões.

---

## 1. Arquitetura Alvo

```
tooloptimizercnc.com.br  ──── 301 (Cloudflare Rule) ────► www.tooloptimizercnc.com.br
                                                                    │
                                                        landing/ (Cloudflare Pages)
                                                        Site de vendas + SEO principal
                                                        robots: Allow ✅ | sitemap: ✅

app.tooloptimizercnc.com.br ────────────────────────► dist/ (Cloudflare Worker)
                                                        Calculadora SPA
                                                        robots: Disallow ✅ | noindex ✅
```

---

## 2. Orientações para o Agente: Como Operar o Navegador

1. **Inicialização do Navegador:**
   - Inicie a sessão de navegação via comando `/browser`.
   - O navegador se conectará ao Google Chrome local via protocolo CDP (Chrome DevTools Protocol).

2. **Gestão de Autenticação e Desafios (2FA / Turnstile):**
   - Acesse `https://dash.cloudflare.com/`.
   - **Ponto de Atenção:** A Cloudflare possui proteção rigorosa antibot (Turnstile/Cloudflare Challenge) e autenticação em dois fatores (2FA).
   - Se a tela solicitar e-mail/senha, código 2FA ou desafio humano, **o agente NÃO deve tentar forçar ou adivinhar**. Ele deve solicitar ao operador (Rafael) que faça o login/confirmação manualmente na janela aberta do Chrome antes de prosseguir.

3. **Navegação e Execução Precisa:**
   - Sempre aguarde o carregamento completo do DOM antes de interagir com elementos.
   - Utilize seletores claros e confirme visualmente os botões antes de clicar ("Create Rule", "Save and Deploy", "Save").
   - Tire capturas de tela (screenshots) a cada etapa concluída para gerar evidência nos artefatos.

---

## 3. Roteiro Passo a Passo no Painel Cloudflare

### Tarefa 1: Redirect Rule do Naked Domain (tooloptimizercnc.com.br → www)

* **Objetivo:** Garantir que acessos sem `www` sejam redirecionados com status 301 (permanente) para `https://www.tooloptimizercnc.com.br`.

1. **Acessar a Zona:**
   - No menu lateral ou na lista de contas, clique na conta e selecione o domínio `tooloptimizercnc.com.br`.
2. **Navegar até Regras de Redirecionamento:**
   - No menu lateral esquerdo da zona, clique em **Rules** (Regras) → **Redirect Rules** (Regras de Redirecionamento).
3. **Criar a Regra:**
   - Clique no botão azul **Create Rule** (Criar Regra).
   - **Rule name (Nome da regra):** `Redirect naked domain to www`
   - **When incoming requests match... (Condição de disparo):**
     - Selecione: *Custom filter expression*
     - Field: `Hostname`
     - Operator: `equals`
     - Value: `tooloptimizercnc.com.br`
   - **Then... (Ação):**
     - Type: `Static` (Redirecionamento estático)
     - URL: `https://www.tooloptimizercnc.com.br`
     - Status code: `301` (Permanent Redirect)
     - Preservar caminho da consulta (opcional/recomendado se houver sub-rotas): marcar *Preserve query string*.
4. **Salvar:**
   - Clique em **Deploy** (Implantar) ou **Save**.
   - Capturar screenshot de confirmação da regra ativa na lista.

---

### Tarefa 2: Criar Projeto Cloudflare Pages (`tooloptimizer-landing`)

* **Objetivo:** Criar o projeto de destino para o qual o workflow `deploy-cloudflare.yml` enviará os arquivos da pasta `landing/`, e associá-lo ao subdomínio `www`.

1. **Navegar até Workers & Pages:**
   - No menu principal da conta (nível de conta, fora da zona individual), clique em **Workers & Pages**.
2. **Criar Aplicação Pages:**
   - Clique no botão **Create** (Criar) ou **Create Application**.
   - Selecione a aba **Pages**.
   - Escolha a opção **Upload assets** (Direct Upload) — *o deploy real é automatizado via GitHub Actions/Wrangler*.
   - **Project name (Nome do projeto):** `tooloptimizer-landing` *(deve ser exatamente este nome para coincidir com o `deploy-cloudflare.yml`)*.
   - Faça upload de um arquivo temporário simples (ou pasta vazia/landing) apenas para inicializar o projeto, e clique em **Create project**.
3. **Vincular o Domínio Personalizado (`www`):**
   - Acesse o projeto criado: **Workers & Pages** → `tooloptimizer-landing`.
   - Clique na aba **Custom domains** (Domínios personalizados).
   - Clique em **Set up a custom domain** (Configurar domínio personalizado).
   - Digite: `www.tooloptimizercnc.com.br`.
   - Clique em **Continue** e confirme a ativação. A Cloudflare configurará o apontamento DNS automaticamente na mesma zona.
4. **Salvar e Confirmar:**
   - Aguarde o status do domínio mudar para *Active* (pode levar alguns segundos/minutos para provisionar o certificado SSL).
   - Capturar screenshot da tela de status do domínio vinculado.

---

## 4. Checklist de Verificação e Testes Pós-Execução

Após concluir as duas etapas acima, execute os seguintes testes via terminal:

1. **Teste do Redirecionamento 301:**
   ```bash
   curl -I https://tooloptimizercnc.com.br
   ```
   *Resultado esperado:* Cabeçalho `HTTP/2 301` ou `HTTP/1.1 301 Moved Permanently` apontando para `Location: https://www.tooloptimizercnc.com.br/`.

2. **Teste da Resolução do Domínio da Landing:**
   ```bash
   curl -I https://www.tooloptimizercnc.com.br
   ```
   *Resultado esperado:* Conexão SSL válida sem erro de certificado (`HTTP 200` ou página servida pelo Pages).

3. **Disparo do Deploy Automático:**
   - No GitHub Actions, acione manualmente ou faça um push na branch `main` para rodar o workflow `.github/workflows/deploy-cloudflare.yml`.
   - O Job 2 (`deploy-landing`) executará:
     ```bash
     wrangler pages deploy landing --project-name=tooloptimizer-landing --commit-dirty=true
     ```
     e publicará os arquivos da landing page diretamente em produção.

---

## 5. Contingência: Execução Alternativa via Wrangler / API

Caso o agente ou usuário encontre dificuldades de navegação ou bloqueio por captcha/2FA no dashboard web:

- Se o token da Cloudflare estiver configurado no terminal (`CLOUDFLARE_API_TOKEN`), o projeto Pages pode ser criado via comando direto:
  ```bash
  npx wrangler pages project create tooloptimizer-landing --production-branch=main
  ```
- O domínio personalizado pode ser adicionado via API da Cloudflare ou pelo painel assim que a sessão estiver autenticada.
