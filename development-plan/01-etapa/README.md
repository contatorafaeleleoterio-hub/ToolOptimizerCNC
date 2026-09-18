# Etapa 01 — Governança, Textos e Política de Privacidade

## 1. Nome da Etapa
**Governança, Textos e Política de Privacidade**

---

## 2. Objetivo da Etapa
Garantir total conformidade legal (LGPD) e regulatória com as políticas de privacidade da Google Play Store e Google AdMob, criando uma Política de Privacidade pública acessível via HTTPS, publicando o arquivo de validação `app-ads.txt` e alinhando os textos institucionais que atualmente afirmam que a aplicação "não possui anúncios".

---

## 3. Escopo Preliminar
- Redação e publicação da página de Política de Privacidade em `landing/politica-de-privacidade.html` (com deploy em `https://www.tooloptimizercnc.com.br/politica-de-privacidade`);
- Inclusão do link para a Política de Privacidade no rodapé da landing page (`landing/index.html`) e no painel de configurações da aplicação (`src/ui/components/SettingsView.tsx`);
- Declaração explícita de que a aplicação não coleta dados pessoais e que os dados de identificadores de anúncio (Advertising ID) e diagnósticos são processados pelo SDK do Google AdMob;
- Criação e disponibilização do arquivo `public/app-ads.txt` na raiz do domínio para futura verificação pelo AdMob;
- Revisão textual nas menções de marketing do `index.html` e `landing/index.html`, ajustando "sem anúncios" para "gratuito, financiado por publicidade não intrusiva no aplicativo móvel".

---

## 4. Estado Atual Conhecido
- O projeto atual não possui página de Política de Privacidade ativa no domínio `tooloptimizercnc.com.br`;
- Existe um rascunho de política legado arquivado em `archive/legacy-v1/src/pages/privacy-policy-page.tsx`;
- O arquivo `app-ads.txt` não existe em `public/`;
- Os documentos institucionais (`index.html` e `landing/index.html`) declaram expressamente que o produto é "sem anúncios", o que conflita diretamente com o objetivo de monetização do app.

---

## 5. Principais Entregáveis já Identificados
1. Página web funcional e hospedada: `https://www.tooloptimizercnc.com.br/politica-de-privacidade`;
2. Arquivo `public/app-ads.txt` publicado na raiz do domínio;
3. Links de acesso à privacidade adicionados no rodapé da landing e dentro de `SettingsView.tsx`;
4. Textos do site e meta tags alinhados com o modelo de aplicativo gratuito suportado por anúncios.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Nenhum (esta é a primeira etapa lógica do projeto).
- **Etapas dependentes:** Etapa 02 (Capacitor), Etapa 03 (AdMob) e Etapa 06 (Configuração do Play Console).

---

## 7. Critérios de Conclusão Preliminares
- [ ] A página de Política de Privacidade responde com status HTTP 200 em `https://www.tooloptimizercnc.com.br/politica-de-privacidade`.
- [ ] O link para a política está visível e clicável no rodapé e dentro do app.
- [ ] O arquivo `app-ads.txt` é servido corretamente na URL `https://www.tooloptimizercnc.com.br/app-ads.txt`.
- [ ] Todos os textos institucionais que prometiam "sem anúncios" foram calibrados sem comprometer os testes automatizados (`npm run check` verde).

---

- **Decisão D01-1 (Hospedagem da Política):** Hospedar a política como página estática no Cloudflare Pages sob o domínio institucional (`www.tooloptimizercnc.com.br/politica-de-privacidade`), garantindo alta disponibilidade e zero custo.
- **Decisão D01-2 (Tratamento de Dados):** Declarar formalmente modelo *Zero Data Collection* pelo núcleo do app, delegando coleta técnica exclusivamente às bibliotecas necessárias do Google (AdMob).
- **Decisão D01-3 (E-mail Oficial de Contato):** Definido o e-mail oficial do projeto: **`tooloptimizercnc@gmail.com`**, que será utilizado na Política de Privacidade, nos dados de contato da Google Play Store e nas comunicações institucionais.
- *Demais decisões:* Pendente de refinamento na abertura da etapa.

---

## 9. Pendências da Etapa
- [ ] Obter o ID de Publisher do AdMob (`pub-XXXXXXXXXXXXXXXX`) via AdMob Console conforme o plano de execução para gerar o `app-ads.txt`;
- [x] ~~Definir e-mail oficial de contato para dúvidas sobre privacidade~~ — **CONCLUÍDO (`tooloptimizercnc@gmail.com`)**;
- [ ] *Demais pendências:* Pendente de refinamento ao iniciar a execução da Etapa 01.

