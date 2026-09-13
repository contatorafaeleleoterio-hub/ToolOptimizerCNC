---
Documento: Protocolo DevOps (Capacitor Edition)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO
---

# 14 — Protocolo DevOps (Gage)

Este protocolo define as regras para gerenciar o repositório **ToolOptimizer CNC** e garantir a saúde do build Android.

---

## 1. Quality Gates Obrigatórios (Antes do Push)

Para evitar que o app mobile quebre ou fique dessincronizado, o desenvolvedor deve passar por estes gates:

| Check | Comando | Esperado |
|---|---|---|
| **TypeScript** | `npm run typecheck` | 0 erros |
| **Lint** | `npm run lint` | 0 erros |
| **Build Web** | `npm run build` | Pasta `dist/` gerada |
| **Sync Mobile** | `npx cap sync android` | Projeto Android atualizado |
| **Working Tree** | `git status` | Clean (nada pendente) |

---

## 2. Fluxo de Entrega (Push para Main)

1.  **Desenvolvimento:** Alterar o código em `src/`.
2.  **Validação:** Executar os Quality Gates acima.
3.  **Sync:** Rodar `npx cap sync android` para garantir que o projeto nativo recebeu as mudanças.
4.  **Push:** Enviar para o GitHub (`git push origin main`).
5.  **Actions:** O GitHub Actions iniciará automaticamente o build do APK.

---

## 3. Versionamento do App (Android)

Toda vez que uma nova versão for enviada para a Play Store, é necessário incrementar o `versionCode` no arquivo `android/app/build.gradle`.

- **versionCode:** Inteiro (ex: 1 -> 2 -> 3)
- **versionName:** String (ex: "1.0.0" -> "1.1.0")

---

## 4. Regras de Segurança (Secrets)

- **NUNCA** commitar arquivos `.jks` ou `.keystore` no repositório público.
- **NUNCA** commitar chaves de API no código. Use variáveis de ambiente (`.env`).
- Utilize o GitHub Secrets para armazenar as chaves de assinatura do app.

---

## ✅ Checklist de conclusão desta etapa

- [ ] `npm run typecheck` passou 0 erros.
- [ ] `npx cap sync android` sincronizado com o último build web.
- [ ] Working tree limpa e pronta para o commit final.
- [ ] GitHub Actions configurado e pronto para disparar.
- [ ] Commit: `git commit -m "ops: update devops protocol for capacitor sync"`
