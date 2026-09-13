---
Documento: 03 — Stack e Dependências (Capacitor Edition)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO
---

# 03 — Stack e Dependências

Este documento define os pacotes essenciais para o funcionamento do **ToolOptimizer CNC** no Android via Capacitor.

---

## 1. Pacotes Core do Capacitor

Estes pacotes realizam a ponte entre o código Web (React) e o hardware Android.

```bash
# Instalar Core e CLI
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli
```

---

## 2. Plugins Essenciais (UX Mobile)

Para que o app tenha "cara" de nativo e não apenas um site aberto no celular.

```bash
# Splash Screen e Status Bar (Controle visual)
npm install @capacitor/splash-screen @capacitor/status-bar

# Haptics (Feedback tátil nos cálculos)
npm install @capacitor/haptics

# Device (Para detectar se é mobile e ajustar rotas)
npm install @capacitor/device

# Storage (Caso localStorage não seja suficiente no futuro)
npm install @capacitor/preferences
```

---

## 3. Configuração capacitor.config.ts

O arquivo de configuração substitui o antigo `app.json`.

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.tooloptimizercnc',
  appName: 'ToolOptimizer CNC',
  webDir: 'dist', // Pasta gerada pelo Vite
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1a73e8",
      showSpinner: true,
      androidScaleType: "CENTER_CROP"
    }
  }
};

export default config;
```

---

## 4. Scripts Obrigatórios (package.json)

Substitua os scripts antigos do Expo por estes comandos focados em Vite/Capacitor:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "cap:sync": "npx cap sync android",
    "cap:open": "npx cap open android",
    "android:debug": "npm run build && npx cap sync android && npx cap open android"
  }
}
```

---

## 5. Verificação de Versão (React)

O ToolOptimizer utiliza React 18/19. Verifique se o `react-dom` está alinhado:
```bash
npm list react react-dom
# Devem ter a mesma versão major.
```

---

## ✅ Checklist de conclusão desta etapa

- [ ] `@capacitor/core` e `@capacitor/android` instalados.
- [ ] Plugins de UX (`splash-screen`, `status-bar`) instalados.
- [ ] `capacitor.config.ts` aponta para `webDir: 'dist'`.
- [ ] Scripts `build` e `cap:sync` testados e funcionais.
- [ ] Commit: `git commit -m "feat: setup capacitor stack and scripts"`
