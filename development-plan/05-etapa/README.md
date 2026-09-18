# Etapa 05 — Pipeline de Build Release e Assinatura Digital

## 1. Nome da Etapa
**Pipeline de Build Release e Assinatura Digital**

---

## 2. Objetivo da Etapa
Estruturar um processo de compilação automatizado, seguro e reproduzível para geração do pacote de produção **Android App Bundle (.aab)** assinado digitalmente, contornando limitações do ambiente local (ausência de Android SDK e JDK 17) por meio de um workflow de CI/CD no GitHub Actions.

---

## 3. Escopo Preliminar
- Geração da chave criptográfica de assinatura de release (`.keystore` ou `.jks`) via ferramenta padrão `keytool`, com definição segura de alias e senhas;
- Armazenamento dos dados da chave nos segredos do repositório GitHub (`ANDROID_KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`);
- Configuração de assinatura no `android/app/build.gradle` (signingConfigs para release);
- Criação do workflow de automação `.github/workflows/build-android.yml` configurado para:
  1. Executar em runner Ubuntu com JDK 17 e Android SDK pré-instalados;
  2. Instalar dependências (`npm ci`);
  3. Executar o quality gate (`npm run check`);
  4. Gerar o build estático de produção do Vite (`npm run build`);
  5. Sincronizar o projeto nativo (`npx cap sync android`);
  6. Compilar o bundle de produção via Gradle (`./gradlew bundleRelease`);
  7. Assinar o arquivo `.aab` resultante;
  8. Disponibilizar o arquivo final assinado como artefato para download no GitHub Actions ou release tag;
- Estabelecer rotina de versionamento (`versionCode` incremental e `versionName` semântico).

---

## 4. Estado Atual Conhecido
- O repositório possui workflows de CI para web (`ci.yml` e `deploy-cloudflare.yml`);
- A máquina local do desenvolvedor opera com Java 1.8 e sem Android SDK/Studio instalado, o que impede a compilação local direta do Gradle 8+ sem instalação de ferramentas volumosas;
- Ainda não existe keystore de release nem configuração de assinatura ativa para a v2.

---

## 5. Principais Entregáveis já Identificados
1. Par de chaves criptográficas de release gerado e salvo em local seguro com backup offline;
2. Segredos configurados no GitHub Actions;
3. Arquivo de automação `.github/workflows/build-android.yml` operacional;
4. Primeiro arquivo `.aab` assinado gerado com sucesso via pipeline.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 02 (Capacitor), Etapa 03 (AdMob) e Etapa 04 (UX Android).
- **Etapas dependentes:** Etapa 06 (Consoles) e Etapa 07 (Closed Testing).

---

## 7. Critérios de Conclusão Preliminares
- [ ] O workflow `.github/workflows/build-android.yml` roda e conclui com sucesso (status verde).
- [ ] O artefato gerado é um arquivo `.aab` válido, assinado e com tamanho otimizado (alvo: < 10 MB).
- [ ] O manifesto embutido no `.aab` confirma `applicationId "br.com.tooloptimizercnc"` e `targetSdkVersion` compatível com a Play Store.
- [ ] As senhas e o arquivo bruto da keystore permanecem 100% protegidos e nunca são commitados no repositório git público.

---

## 8. Decisões da Etapa
- **Decisão D05-1 (Ambiente de Build na Nuvem):** Utilizar o GitHub Actions (runner Ubuntu padrão) para compilação do Android, dispensando a necessidade de instalar 3 a 5 GB de ferramentas de SDK/Android Studio na máquina local Windows.
- **Decisão D05-2 (Formato de Pacote Obrigatório):** Adotar exclusivamente o formato **Android App Bundle (.aab)**, conforme exigência mandatória do Google Play para novos lançamentos.
- *Demais decisões:* Pendente de refinamento na abertura da etapa.

---

## 9. Pendências da Etapa
- [ ] Definir o procedimento de backup frio da keystore (disco externo criptografado / cofre de senhas);
- [ ] Testar a extração e instalação de APK a partir do `.aab` via `bundletool` em um aparelho de teste;
- [ ] *Demais pendências:* Pendente de refinamento ao iniciar a execução da Etapa 05.
