# Etapa 06 — Pipeline de Build Release, Keystore & GitHub Actions

## 1. Nome da Etapa
**Pipeline de Build Release, Keystore & GitHub Actions**

---

## 2. Objetivo da Etapa
Estruturar um processo de compilação automatizado, seguro e reproduzível para geração do pacote de produção **Android App Bundle (.aab)** assinado digitalmente, contornando a ausência de Android SDK e JDK 17 na máquina local Windows por meio de um workflow de CI/CD no **GitHub Actions**, garantindo a guarda criptografada e segura da chave de release.

---

## 3. Escopo Detalhado
1. **Geração Segura da Chave de Assinatura (Keystore):**
   - Criação da chave criptográfica com algoritmo RSA de 2048 bits ou superior via comando `keytool`:
     - Arquivo: `tooloptimizer-release-key.jks`
     - Validade: 25+ anos (requisito Google Play)
     - Alias oficial do projeto;
   - Armazenamento seguro de backup da chave e das senhas fora do repositório Git.
2. **Configuração de Segredos Criptografados no GitHub:**
   - Inserção dos segredos no repositório GitHub (`Settings > Secrets and variables > Actions`):
     - `ANDROID_KEYSTORE_BASE64` (arquivo `.jks` codificado em base64);
     - `KEYSTORE_PASSWORD` (senha do arquivo de chaves);
     - `KEY_ALIAS` (nome do alias da chave);
     - `KEY_PASSWORD` (senha individual da chave).
3. **Configuração de Assinatura no Gradle (`android/app/build.gradle`):**
   - Criação da seção `signingConfigs.release` consumindo variáveis de ambiente seguras fornecidas pelo runner de CI;
   - Vinculação do `buildTypes.release` à assinatura configurada.
4. **Workflow de Automação `.github/workflows/build-android.yml`:**
   - Disparo por push em branch principal ou manual via `workflow_dispatch`;
   - Etapas do workflow:
     1. Checkout do código-fonte;
     2. Setup de Node.js e instalação das dependências (`npm ci`);
     3. Validação do Quality Gate: execução de testes automatizados e linter (`npm run check`);
     4. Build estático web Vite (`npm run build`);
     5. Sincronização nativa do Capacitor (`npx cap sync android`);
     6. Setup do JDK 17 (Temurin) e Android SDK;
     7. Decodificação da chave de assinatura a partir dos segredos;
     8. Compilação do bundle via `./gradlew bundleRelease`;
     9. Assinatura e alinhamento do arquivo `.aab`;
     10. Disponibilização do artefato `app-release.aab` para download como artefato do GitHub Actions.
5. **Esquema de Versionamento Contínuo:**
   - `versionCode` numérico incremental (ex: 200 para v2.0.0);
   - `versionName` semântico (ex: "2.0.0").

---

## 4. Estado Atual Conhecido
- O repositório possui workflows de CI para web (`ci.yml` e `deploy-cloudflare.yml`);
- A máquina local do desenvolvedor opera com Java 1.8 e sem Android SDK/Studio instalado, o que impede a compilação local direta do Gradle 8+ sem instalação de ferramentas volumosas;
- Ainda não existe keystore de release gerada para a versão 2.0.0.

---

## 5. Principais Entregáveis
1. Par de chaves criptográficas de release gerado e salvo com backup offline seguro;
2. Segredos de assinatura cadastrados no GitHub Actions;
3. Arquivo de automação `.github/workflows/build-android.yml` operacional;
4. Primeiro arquivo `app-release.aab` assinado gerado com sucesso via pipeline na nuvem.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 02 (Capacitor), Etapa 03 (AdMob), Etapa 04 (Play Billing) e Etapa 05 (UX Mobile).
- **Etapas dependentes:** Etapa 07 (Consoles) e Etapa 08 (Ciclo de Testes Fechados).

---

## 7. Critérios de Conclusão e Aceite
- [ ] O workflow `.github/workflows/build-android.yml` roda e conclui com status verde (sucesso).
- [ ] O artefato gerado é um arquivo `.aab` válido, assinado e otimizado (tamanho esperado: < 10 MB).
- [ ] O manifesto embutido no `.aab` confirma `applicationId "br.com.tooloptimizercnc.app"` e `targetSdkVersion 35`.
- [ ] A keystore e suas senhas nunca foram expostas ou commitadas no repositório git.

---

## 8. Decisões da Etapa
- **D06-1 (Build 100% na Nuvem):** Utilizar o GitHub Actions (runner Ubuntu padrão) para compilação do Android, dispensando o download de ferramentas pesadas de desenvolvimento na máquina Windows local.
- **D06-2 (Formato Android App Bundle):** Adotar exclusivamente o formato `.aab`, conforme exigência mandatória do Google Play.
- **D06-3 (Google Play App Signing Ativado):** Ativar a custódia de chave do Google Play no console para proteção contra perda da chave de upload local.

---

## 9. Pendências da Etapa
- [ ] Executar script para geração da chave `tooloptimizer-release-key.jks`;
- [ ] Cadastrar os 4 segredos no repositório GitHub do projeto.
