---
Sessão: APP-2 — Build Android Cloud (revisado)
Data: 2026-04-19
Status: 📋 PLANEJADO — aguardando execução
Aprovado por: Rafael (decisão: zero senhas, zero instalação local)
---

# SESSION APP-2 — APK Debug na Nuvem (sem senhas, sem instalação local)

## Contexto

Rafael publicou **DoceGestar** (React Native + Expo) usando `eas build` (cloud Expo) → baixou APK → instalou no celular. Quer o **mesmo princípio** para o ToolOptimizer CNC.

### Descoberta crítica

**EAS Build NÃO suporta projetos Capacitor.** EAS é exclusivo para React Native. ToolOptimizer é React + Vite + Capacitor — outra arquitetura. A conta `eusourafael` no expo.dev é irrelevante aqui.

### Estado do PC do Rafael (verificado)

| Ferramenta | Status |
|------------|--------|
| Node v24.11.0 | ✅ |
| npm 11.6.1 | ✅ |
| eas-cli v18.7.0 | ✅ (instalado mas inútil aqui) |
| JDK 17+ | ❌ não instalado |
| Android Studio | ❌ não instalado |
| Capacitor 7.x | ✅ APP-1 commit `0ae47a2` |
| pasta `android/` | ✅ projeto Gradle pronto |
| `.github/workflows/` | ✅ ci.yml + deploy-cloudflare.yml |

### Solução

**GitHub Actions + assinatura debug (sem senha)** para fase MVP/testes.
- Push do código → build automático na nuvem
- APK assinado com chave debug (senha pública padrão `android`/`android`) → artifact baixável
- Rafael baixa e instala sem digitar senha alguma
- Quando for hora de Play Store (APP-4) gera-se chave release definitiva

---

## Etapas

### Etapa 1 — Validar signing debug no Gradle

Capacitor já cria `android/app/build.gradle` com `signingConfigs.debug`. CI gera o `debug.keystore` automaticamente na primeira build. Senha pública = `android`. Não é segredo.

**Ação:** apenas validar `assembleDebug` funcional (provavelmente nenhuma mudança).

### Etapa 2 — Criar workflow GitHub Actions

Arquivo: `.github/workflows/build-android.yml`

```yaml
name: Build Android APK (debug)

on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'android/**'
      - 'capacitor.config.ts'
      - 'package.json'
      - '.github/workflows/build-android.yml'
  workflow_dispatch: {}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: 17 }
      - name: Install deps
        run: npm ci
      - name: Build web (Vite)
        run: npm run build
      - name: Sync Capacitor
        run: npx cap sync android
      - name: Build debug APK
        working-directory: android
        run: ./gradlew assembleDebug
      - name: Upload APK artifact
        uses: actions/upload-artifact@v4
        with:
          name: tooloptimizercnc-debug-${{ github.sha }}
          path: android/app/build/outputs/apk/debug/app-debug.apk
          retention-days: 30
```

Tempo: ~5-8 min por build.

### Etapa 3 — Fluxo de uso

1. Equipe faz mudanças → push para `main` → Actions roda automaticamente
2. Rafael acessa `Actions` → última run → seção **Artifacts** no rodapé
3. Baixa `tooloptimizercnc-debug-<sha>.apk`
4. Manda pro celular (Telegram, e-mail, USB, Drive)
5. Toca no APK → "Instalar" → app abre

Habilitar 1x no celular: Configurações → Apps → Acesso especial → Instalar apps desconhecidos → permitir o navegador (Chrome).

Sem senha. Sem PIN. Sem trava.

### Etapa 4 — Validação (critério de sucesso)

- [ ] Workflow termina verde em <10 min
- [ ] Artifact APK baixável
- [ ] APK instala sem erro nem prompt
- [ ] Splash Capacitor (~1s) e calculadora carrega
- [ ] Cálculo executa (Material → Ferramenta → Simular → Resultado)
- [ ] Histórico e Favoritos persistem (localStorage no WebView)

---

## Arquivos

| Arquivo | Ação |
|---------|------|
| `.github/workflows/build-android.yml` | **CRIAR** (workflow acima) |
| `android/app/build.gradle` | **VERIFICAR** apenas |
| `docs/PROTOCOLO_CONVERSAO_APP/APP2_STATUS.md` | **CRIAR** ao final |

**Nada de keystore, secrets, ou senhas nesta fase.** Tudo isso fica para APP-4.

## Referências reutilizáveis

- `.github/workflows/ci.yml` — padrão Node 20 + npm ci + cache
- `.github/workflows/deploy-cloudflare.yml` — padrão de jobs
- `capacitor.config.ts` (commit `0ae47a2`) — appId `br.com.tooloptimizercnc`
- `android/app/build.gradle` (commit `0ae47a2`) — Gradle pronto

---

## Verificação end-to-end

1. **Push:** após criar workflow, commitar e push para main
2. **GitHub Actions:** aguardar ~6 min até job verde, conferir artifact
3. **Celular:** transferir APK, instalar, validar todas as telas
4. **Iteração:** mudar código → push → APK novo automático em ~6 min

---

## Sessões seguintes

- **APP-3** — Store Listing: screenshots 1080×1920 capturadas do APK debug, descrição PT-BR, privacy policy em `tooloptimizercnc.com.br/privacidade`, ícone 512×512
- **APP-4** — Aqui sim: keystore release + GitHub Secrets + workflow `build-android-release.yml` produzindo `.aab` assinado, upload manual ao Play Console (revisão 24-72h)

## O que Rafael precisa fazer pessoalmente nesta sessão

**Nada.** Equipe entrega APK pronto para download.
