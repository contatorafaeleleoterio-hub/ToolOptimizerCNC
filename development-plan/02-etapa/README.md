# Etapa 02 — Reintegração do Wrapper Android (Capacitor 7)

## 1. Nome da Etapa
**Reintegração do Wrapper Android (Capacitor 7)**

---

## 2. Objetivo da Etapa
Adicionar ao repositório a infraestrutura nativa moderna do **Capacitor 7**, permitindo empacotar o bundle de produção compilado pelo Vite (`dist/`) em um projeto Android nativo configurado para atender a todos os requisitos técnicos da Google Play Store (Target SDK 35, Gradle 8+, JDK 17), preservando integralmente o funcionamento offline-first e o banco de dados IndexedDB (`tooloptimizer_db`).

---

## 3. Escopo Detalhado
1. **Instalação das Dependências Oficiais:**
   - Adicionar `@capacitor/core`, `@capacitor/cli` e `@capacitor/android` (versão 7 moderna estável) ao `package.json`.
2. **Configuração Canônica de `capacitor.config.ts`:**
   - `appId`: `br.com.tooloptimizercnc.app`
   - `appName`: `ToolOptimizer CNC`
   - `webDir`: `dist`
   - `server.androidScheme`: `https` (obrigatório para persistência segura de IndexedDB e compatibilidade com APIs modernas do WebView).
3. **Geração e Calibração do Diretório `android/`:**
   - Execução limpa de `npx cap add android`;
   - Ajuste das variáveis do Gradle (`android/variables.gradle`):
     - `compileSdkVersion = 35`
     - `targetSdkVersion = 35` (padrão exigido pelo Google Play em 2026)
     - `minSdkVersion = 24` (Android 7.0+, cobrindo mais de 98% dos aparelhos em operação no Brasil).
4. **Configuração de Ativos Visuais Nativos:**
   - Geração de ícones adaptativos do Android (pastas `mipmap-xxxhdpi`, `mipmap-xxhdpi`, etc.) a partir de `public/icon-512.png`;
   - Configuração da splash screen com o fundo escuro industrial do Design System (`#080C12`) para evitar telas brancas durante o carregamento inicial.
5. **Automação de Scripts no `package.json`:**
   - `cap:sync`: `npm run build && npx cap sync android`
   - `cap:open`: `npx cap open android`

---

## 4. Estado Atual Conhecido
- O código da aplicação é 100% web moderno (Vite 8 + React 19 + TypeScript);
- O diretório `android/` não existe na raiz do projeto (estava presente apenas no histórico legado arquivado);
- A compilação estática (`npm run build`) gera o diretório `dist/` com sucesso;
- A máquina local opera no Windows e usará compilação na nuvem (GitHub Actions) para geração final dos binários `.aab`.

---

## 5. Principais Entregáveis
1. Dependências do Capacitor integradas ao `package.json`;
2. Arquivo `capacitor.config.ts` configurado e versionado;
3. Diretório nativo `android/` limpo e sincronizável via `npm run cap:sync`;
4. Configuração do Gradle com `targetSdkVersion 35` e `minSdkVersion 24`;
5. Ícones e splash screen gerados e posicionados nas pastas de recursos nativos.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 01 (Governança e Landing Page).
- **Etapas dependentes:** Etapa 03 (AdMob), Etapa 04 (Play Billing), Etapa 05 (UX Mobile) e Etapa 06 (Pipeline de Build).

---

## 7. Critérios de Conclusão e Aceite
- [ ] O comando `npm run cap:sync` executa com sucesso (código de saída 0).
- [ ] O arquivo `android/app/build.gradle` reflete `applicationId "br.com.tooloptimizercnc.app"` e `targetSdkVersion 35`.
- [ ] O banco local IndexedDB funciona com persistência intacta no WebView nativo.
- [ ] Os 120 testes de física e UI continuam passando com 100% de sucesso (`npm run check` verde).

---

## 8. Decisões da Etapa
- **D02-1 (Versão Capacitor 7):** Utilização da versão 7 para garantir total compatibilidade com os runners modernos do GitHub Actions (Node 22 / Ubuntu 24.04).
- **D02-2 (Identificador de Pacote):** Padronização definitiva de `br.com.tooloptimizercnc.app` como identificador exclusivo em toda a esteira do Google Play.
- **D02-3 (Esquema HTTPS):** Manter `androidScheme: 'https'` para assegurar que cookies e IndexedDB sejam tratados como origens seguras e imutáveis.

---

## 9. Pendências da Etapa
- [ ] Gerar os pacotes de ícones de densidade variada para o Android Studio a partir do ícone vetorial;
- [ ] Executar sincronização inicial após adição do wrapper.
