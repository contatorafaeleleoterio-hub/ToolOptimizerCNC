---
Sessão: APP-1 — Setup Capacitor
Data: 2026-04-19
Status: ✅ CONCLUÍDA (parcialmente — build Android pendente de pré-requisitos)
---

# SESSION APP-1 — Setup Capacitor

## O que foi feito

| Passo | Status | Detalhe |
|-------|--------|---------|
| Instalar @capacitor/core, @capacitor/cli, @capacitor/android | ✅ | 73 pacotes adicionados |
| Criar capacitor.config.ts | ✅ | appId: br.com.tooloptimizercnc |
| npm run build → dist/ | ✅ | 26.54s, zero erros TypeScript |
| npx cap add android | ✅ | pasta android/ criada |
| npx cap sync | ✅ | assets sincronizados em 1.8s |

## Pré-requisitos AINDA NECESSÁRIOS para APP-2

### 1. JDK 17+ (Java Development Kit)
O projeto tem apenas JRE 1.8.0 — não é suficiente para builds Android.

**Download:** https://adoptium.net/temurin/releases/?version=17
- Escolher: Windows x64 | Package: JDK | Version: 17

**Após instalar:** configurar variável de ambiente:
```
JAVA_HOME = C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
```

### 2. Android Studio
Necessário para: Android SDK, emulador, e build do APK.

**Download:** https://developer.android.com/studio
- Tamanho: ~1.1 GB

**Após instalar:**
1. Abrir Android Studio
2. Seguir o setup wizard (instala Android SDK automaticamente)
3. Aceitar todas as licenças SDK

**SDK mínimo necessário:**
- Android SDK Platform 34 (Android 14)
- Android SDK Build-Tools 34
- Android Emulator (opcional, para testes sem celular físico)

### 3. Variáveis de ambiente (após instalar ambos)
Adicionar ao PATH do Windows:
```
ANDROID_HOME = C:\Users\USUARIO\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
PATH += %ANDROID_HOME%\platform-tools
PATH += %ANDROID_HOME%\cmdline-tools\latest\bin
PATH += %JAVA_HOME%\bin
```

## Próximo passo: SESSION APP-2

Após instalar JDK 17 e Android Studio:
1. Abrir `/c/Users/USUARIO/Desktop/INICIO_TOOLOPTIMIZERCNC/android` no Android Studio
2. Aguardar Gradle sync automático
3. Build → Generate Signed Bundle / APK → APK
4. Testar no celular

## Fluxo de atualização (após mudanças no código web)

```bash
# 1. Editar código web normalmente
# 2. Rebuild
npm run build

# 3. Sincronizar para Android
npx cap sync

# 4. Rebuild no Android Studio (ou via Gradle)
cd android && ./gradlew assembleDebug
```
