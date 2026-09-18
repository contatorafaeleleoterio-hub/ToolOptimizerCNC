# Etapa 01 — Governança, Landing Page, Privacidade & app-ads.txt

## 1. Nome da Etapa
**Governança, Landing Page, Privacidade & app-ads.txt**

---

## 2. Objetivo da Etapa
Estabelecer a conformidade jurídica (LGPD/GDPR), regulatória e institucional exigida para a publicação comercial do ToolOptimizer CNC, publicando a Política de Privacidade e o arquivo `app-ads.txt` no domínio oficial (`www.tooloptimizercnc.com.br`), alinhando os textos institucionais da landing page com o modelo comercial real e inserindo o Disclaimer Técnico de Isenção de Responsabilidade para cálculos de usinagem CNC.

---

## 3. Escopo Detalhado
1. **Redação e Publicação da Política de Privacidade:**
   - Criação da página estática `landing/politica-de-privacidade.html`;
   - Declaração explícita de arquitetura *Zero Data Collection* pelo núcleo da calculadora;
   - Descrição do uso do Google AdMob (identificadores anônimos de publicidade GAID) e Google Play Billing (processamento de compras in-app pelo Google);
   - Declaração de armazenamento local no dispositivo via IndexedDB (`tooloptimizer_db`);
   - Inclusão do canal oficial de governança e privacidade: `tooloptimizercnc@gmail.com`.
2. **Disclaimer Jurídico de Responsabilidade Técnica de Usinagem:**
   - Inserção de cláusula expressa de isenção de responsabilidade na Política/Termos e em link acessível no aplicativo (`SettingsView.tsx`);
   - Declaração de que os cálculos de força de corte ($F_c$), potência ($P_c$), rotação ($n$) e avanço ($f$) são estimativas baseadas no modelo matemático de Kienzle e em condições ideais tabeladas;
   - O operador, preparador ou programador CNC é o responsável exclusivo pela verificação de fixação, ferramental e parâmetros antes do acionamento do ciclo da máquina.
3. **Publicação do Arquivo `app-ads.txt`:**
   - Criação de `landing/app-ads.txt` e `public/app-ads.txt`;
   - Formatação segundo o padrão do IAB Tech Lab: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`;
   - Disponibilização pública na raiz: `https://www.tooloptimizercnc.com.br/app-ads.txt`.
4. **Calibração dos Textos da Landing Page (`landing/index.html`):**
   - Substituição de menções legadas de "100% sem anúncios" para "Gratuito com anúncios discretos no app móvel ou versão livre de anúncios por R$ 6,90 vitalício";
   - Atualização do e-mail de contato para `tooloptimizercnc@gmail.com`;
   - Inserção de links de rodapé para a Política de Privacidade e Termos.

---

## 4. Estado Atual Conhecido
- A landing page está online no Cloudflare Pages sob o domínio `www.tooloptimizercnc.com.br`;
- Não existe página de Política de Privacidade nem arquivo `app-ads.txt` servidos no domínio;
- Os textos em `landing/index.html` e `index.html` prometem que o software é "sem anúncios", gerando inconsistência com a estratégia aprovada;
- E-mail oficial já definido: `tooloptimizercnc@gmail.com`.

---

## 5. Principais Entregáveis
1. Página `politica-de-privacidade.html` responsiva e estilizada no padrão visual do produto, publicada no Cloudflare;
2. Arquivo `app-ads.txt` acessível publicamente via HTTP 200 na raiz do domínio;
3. Links de acesso à privacidade adicionados no rodapé da landing page e no componente `SettingsView.tsx`;
4. Textos institucionais e canais de contato sincronizados com a versão 2.0.0 comercial;
5. Cláusula de Isenção de Responsabilidade de Usinagem documentada e visível.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Nenhum (primeira etapa do projeto).
- **Etapas dependentes:** Etapa 02 (Wrapper Android), Etapa 03 (AdMob) e Etapa 07 (Configuração do Play Console).

---

## 7. Critérios de Conclusão e Aceite
- [ ] A URL `https://www.tooloptimizercnc.com.br/politica-de-privacidade` retorna HTTP 200 e renderiza corretamente em mobile e desktop.
- [ ] O arquivo `https://www.tooloptimizercnc.com.br/app-ads.txt` é servido como `text/plain` com código HTTP 200.
- [ ] O link para a Política de Privacidade está presente e navegável dentro do app em `SettingsView.tsx`.
- [ ] O e-mail `tooloptimizercnc@gmail.com` está visível como canal de contato na landing page.
- [ ] O disclaimer de responsabilidade técnica está presente no documento e referenciado no app.
- [ ] A suíte de testes de código (`npm run check`) permanece 100% verde (120/120 testes).

---

## 8. Decisões da Etapa
- **D01-1 (Hospedagem Estática no Cloudflare):** Hospedar toda a camada legal e institucional diretamente no Cloudflare Pages sob o domínio oficial, garantindo CDN global, SSL automático e custo zero de infraestrutura.
- **D01-2 (Isenção Técnica Explícita):** Adotar cláusula de responsabilidade padrão de software de engenharia para evitar riscos de litígio decorrentes de colisões de ferramentas no chão de fábrica.
- **D01-3 (E-mail Único de Contato):** Utilizar `tooloptimizercnc@gmail.com` como endereço único em todos os canais.

---

## 9. Pendências da Etapa
- [ ] Obter o Publisher ID definitivo do Google AdMob (`pub-XXXXXXXXXXXXXXXX`) para inclusão final no `app-ads.txt`;
- [ ] Executar deploy no Cloudflare Pages e validar URLs em produção.
