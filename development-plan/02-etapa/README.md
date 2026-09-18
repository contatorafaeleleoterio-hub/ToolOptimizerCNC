# Etapa 02 — Reintegração do Wrapper Android (Capacitor)

## 1. Nome da Etapa
**Reintegração do Wrapper Android (Capacitor)**

---

## 2. Objetivo da Etapa
Adicionar ao projeto a infraestrutura nativa moderna do Capacitor 6/7, permitindo empacotar o bundle Vite compilado (`dist/`) em um projeto Android nativo configurado para gerar artefatos compatíveis com a Google Play Store, sem alterar nenhuma lógica de cálculo físico ou persistência IndexedDB existente.

---

## 3. Escopo Preliminar
- Instalação das dependências oficiais: `@capacitor/core`, `@capacitor/cli` e `@capacitor/android` no `package.json`;
- Criação e calibração de `capacitor.config.ts`:
  - `appId`: `br.com.tooloptimizercnc`
  - `appName`: `ToolOptimizer CNC`
  - `webDir`: `dist`
  - `server.androidScheme`: `https`
- Execução de `npx cap add android` para geração limpa da pasta `android/`;
- Ajuste das variáveis do Gradle (`android/variables.gradle` ou `android/app/build.gradle`):
  - `compileSdkVersion = 36`
  - `targetSdkVersion = 36` (ou 35, cumprindo os requisitos vigentes do Google Play)
  - `minSdkVersion = 24` (Android 7.0+)
- Configuração de ícones de aplicativo e splash screen nativa usando as artes canônicas em `public/` e `brand/`;
- Criação de scripts npm dedicados no `package.json` (ex: `cap:sync`, `cap:open`).

---

## 4. Estado Atual Conhecido
- O projeto atual não possui Capacitor instalado na raiz nem diretório `android/` ativo;
- O legado v1 continha uma configuração de Capacitor arquivada em `archive/legacy-v1/android/` e `archive/legacy-v1/capacitor.config.ts`;
- A compilação estática web (`npm run build`) gera a pasta `dist/` com sucesso e sem erros;
- A máquina de desenvolvimento local atual não possui o Android SDK nem o JDK 17 configurados (possui Java 1.8), o que orienta a compilação final para CI/CD na nuvem.

---

## 5. Principais Entregáveis já Identificados
1. Dependências do Capacitor integradas ao `package.json`;
2. Arquivo `capacitor.config.ts` configurado e versionado;
3. Diretório nativo `android/` gerado, sincronizável com `dist/` via `npx cap sync`;
4. Configuração do Gradle ajustada para `targetSdkVersion` 35/36 e `minSdkVersion` 24;
5. Scripts npm integrados no fluxo de desenvolvimento.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 01 (Governança e Textos).
- **Etapas dependentes:** Etapa 03 (AdMob), Etapa 04 (UX / Back Button) e Etapa 05 (Pipeline de Build).

---

## 7. Critérios de Conclusão Preliminares
- [ ] `npm run build && npx cap sync android` executa com sucesso (exit code 0).
- [ ] O arquivo `android/app/build.gradle` reflete `applicationId "br.com.tooloptimizercnc"` e `targetSdkVersion` $\ge 35$.
- [ ] O núcleo da aplicação (`src/core/`) e a suíte de testes (`npm run check`) continuam passando 100% verde sem regressões.

---

## 8. Decisões da Etapa
- **Decisão D02-1 (Versão do Capacitor):** Adotar versão moderna estável do Capacitor (v6/v7) para garantir suporte completo a Node 22/24 e Android Target SDK 35/36.
- **Decisão D02-2 (Esquema de Servidor Local):** Utilizar `androidScheme: 'https'`, garantindo conformidade com os padrões de segurança de WebView do Android e suporte íntegro a IndexedDB e Service Workers.
- *Demais decisões:* Pendente de refinamento na abertura da etapa.

---

## 9. Pendências da Etapa
- [ ] Validar compatibilidade entre a versão do `@capacitor/cli` e o ecossistema React 19 / Vite 8;
- [ ] Gerar os assets de ícone adaptativo Android (mipmap) a partir de `public/icon-512.png`;
- [ ] *Demais pendências:* Pendente de refinamento ao iniciar a execução da Etapa 02.
