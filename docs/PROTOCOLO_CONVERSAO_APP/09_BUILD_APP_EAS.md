---
Documento: 09 — Build Android Automático (GitHub Actions)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO (Foco em CI/CD Capacitor)
---

# 09 — Build Android via GitHub Actions

Para o ToolOptimizer CNC, não utilizaremos o Expo/EAS. O build será realizado diretamente nos servidores do GitHub, garantindo que o Rafael receba o APK pronto sem precisar instalar o Android Studio.

---

## 1. O Workflow de Build (`.github/workflows/build-android.yml`)

Este arquivo automatiza todo o processo de compilação do aplicativo.

```yaml
name: Build Android APK (Debug)

on:
  push:
    branches: [main]
  workflow_dispatch: # Permite rodar manualmente

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Java JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Install Dependencies
        run: npm ci

      - name: Build Web (Vite)
        run: npm run build

      - name: Sync Capacitor
        run: npx cap sync android

      - name: Build Android APK
        working-directory: android
        run: ./gradlew assembleDebug

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: tooloptimizer-cnc-debug
          path: android/app/build/outputs/apk/debug/app-debug.apk
          retention-days: 7
```

---

## 2. Fluxo de Trabalho (Como obter o App)

1.  **Fazer Push:** O desenvolvedor faz o `git push` para a branch `main`.
2.  **GitHub Actions:** O GitHub inicia o build automaticamente (leva ~6 a 8 minutos).
3.  **Baixar o APK:**
    - Vá na aba **Actions** do repositório no GitHub.
    - Clique no último build realizado.
    - No final da página, em **Artifacts**, baixe o arquivo `tooloptimizer-cnc-debug`.
4.  **Instalar no Celular:**
    - Transfira o arquivo `.apk` para o celular Android.
    - Toque no arquivo e selecione "Instalar" (pode ser necessário autorizar "Fontes Desconhecidas").

---

## 3. Por que usar Debug APK no MVP?

Como **GESTOR**, decidi usar o build de Debug para esta fase:
1.  **Sem Senhas:** Não exige criação de Keystores ou senhas complexas agora.
2.  **Agilidade:** O Rafael pode testar o app imediatamente.
3.  **Segurança:** O build é gerado em ambiente controlado (GitHub).

*Nota: O Build de Produção (.aab) para a Play Store será configurado no Doc 10.*

---

## 4. Diagnóstico de Falhas no Build

Se o build falhar (ícone vermelho no GitHub):
- Verifique os logs do passo **"Build Android APK"**.
- Erros comuns: falta de permissão no `gradlew` (resolvido com `chmod +x android/gradlew`) ou falha no `npx cap sync` (verificar se `dist/` existe).

---

## ✅ Checklist de conclusão desta etapa

- [ ] Arquivo `.github/workflows/build-android.yml` criado.
- [ ] Primeiro build no GitHub finalizado com "sucesso" (verde).
- [ ] Artifact `tooloptimizer-cnc-debug` baixado e extraído.
- [ ] APK instalado com sucesso no celular Android.
- [ ] O app abre e carrega a calculadora (validando o `dist/` sincronizado).
- [ ] Commit: `git commit -m "ci: add automated android build workflow"`
