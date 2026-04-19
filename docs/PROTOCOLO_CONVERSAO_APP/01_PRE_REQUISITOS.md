---
Documento: 01 — Pré-Requisitos (Capacitor Edition)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO
---

# 01 — Pré-Requisitos

## 1. Ferramentas Locais Obrigatórias

Verifique antes de iniciar o fluxo mobile:

| Ferramenta | Versão mínima | Verificar com | Finalidade |
|---|---|---|---|
| Node.js | 20+ | `node --version` | Runtime do projeto |
| npm | 10+ | `npm --version` | Gerenciador de pacotes |
| Git | 2.x | `git --version` | Controle de versão |
| GitHub CLI | 2.x | `gh --version` | Automação via Actions |
| Capacitor CLI | 7.x | `npx cap --version` | Ponte nativa |

---

## 2. Contas e Acessos

| Conta | URL | Necessário para |
|---|---|---|
| GitHub | github.com | Repositório e CI/CD (Actions) |
| Google Play Console | play.google.com/console | Publicação na Play Store |
| Cloudflare | cloudflare.com | Hospedagem da Web App (PWA) |

---

## 3. Ambiente de Build (Nuvem)

Não é obrigatório instalar Android Studio localmente, pois utilizaremos **GitHub Actions**. No entanto, para o workflow na nuvem, o projeto deve estar configurado para:
- **Java JDK 17+** (Configurado no `.github/workflows/build-android.yml`)
- **Android SDK 34+** (Configurado no `android/build.gradle`)

---

## 4. Verificação de Integridade Web

Antes de converter para Mobile, o build Web deve estar impecável:

```bash
# 1. Instalar dependências
npm install

# 2. Verificar erros de tipos (TypeScript)
npm run typecheck

# 3. Gerar build de produção
npm run build
# → Deve gerar a pasta /dist com index.html
```

---

## 5. Inicialização do Capacitor (Caso ainda não feito)

Se a pasta `android/` não existir, execute:
```bash
npx cap add android
```

Para sincronizar mudanças da Web para o Mobile:
```bash
npm run build
npx cap sync android
```

---

## ✅ Checklist de conclusão desta etapa

- [ ] Node.js ≥ 20 instalado localmente.
- [ ] `npm run typecheck` retorna 0 erros.
- [ ] `npm run build` gera a pasta `dist/` com sucesso.
- [ ] Possui acesso ao repositório no GitHub para configurar Actions.
- [ ] Conta Google Play Developer ativa (ou em processo de criação).
