---
Documento: 04 — Plano Mobile em 3 Etapas (Vite → Android)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO (Foco em Capacitor)
---

# 04 — Plano Mobile em 3 Etapas (Vite → Android)

Este plano define as etapas para transformar o build Web (Vite) em um aplicativo Android (.apk/.aab) profissional.

---

## Etapa 1 — Preparação do Build de Produção

O Capacitor não roda o servidor de desenvolvimento (`npm run dev`) dentro do app em produção. Ele utiliza arquivos estáticos.

### O que fazer:
1.  **Executar o Build Vite:**
    ```bash
    npm run build
    ```
    *Isso gera a pasta `dist/` com todos os assets otimizados.*

2.  **Sincronizar com o Android:**
    ```bash
    npx cap sync android
    ```
    *Isso copia a pasta `dist/` para dentro do projeto nativo e atualiza os plugins.*

### Verificações:
- [ ] A pasta `dist/` contém o arquivo `index.html`.
- [ ] O comando `npx cap sync` terminou com sucesso.
- [ ] O arquivo `capacitor.config.ts` aponta corretamente para `webDir: 'dist'`.

---

## Etapa 2 — Identidade Visual Nativa (Splash & Icons)

Um app profissional não pode exibir o ícone padrão do Android ou uma tela branca ao abrir.

### O que fazer:
1.  **Gerar Assets:**
    Utilizar a ferramenta `@capacitor/assets` para gerar automaticamente todos os tamanhos de ícones e splash screens a partir de um arquivo base.
    ```bash
    npx @capacitor/assets generate --android
    ```

2.  **Configurar Splash Screen:**
    No `capacitor.config.ts`, definir o tempo de exibição:
    ```json
    "SplashScreen": {
      "launchShowDuration": 3000,
      "backgroundColor": "#1a73e8"
    }
    ```

### Verificações:
- [ ] Ícone do ToolOptimizer aparece na grade de aplicativos do celular.
- [ ] Splash Screen (Logo) aparece por 3 segundos ao abrir o app.
- [ ] Barra de status (`StatusBar`) está com a cor coordenada com o app.

---

## Etapa 3 — Build Automatizado (GitHub Actions)

Para evitar dependência de máquinas locais com Android Studio, usaremos a nuvem.

### O que fazer:
1.  **Configurar Workflow:**
    Criar o arquivo `.github/workflows/build-android.yml` (conforme Doc 09).

2.  **Executar Build:**
    Ao fazer `git push`, o GitHub gera o APK automaticamente.

3.  **Validar no Dispositivo:**
    Baixar o APK gerado nos Artifacts do GitHub e instalar no celular Android.

### Verificações:
- [ ] GitHub Action termina com "sucesso" (verde).
- [ ] APK é gerado e baixável.
- [ ] App abre no celular e a calculadora CNC funciona perfeitamente.

---

## ✅ Checklist de conclusão desta etapa

- [ ] Build Web (`dist/`) gerado sem erros.
- [ ] Capacitor sincronizado com o projeto nativo.
- [ ] Assets (ícones/splash) gerados e visíveis.
- [ ] Push realizado para disparar o primeiro build na nuvem.
- [ ] Commit: `git commit -m "chore: prepare production build for mobile"`
