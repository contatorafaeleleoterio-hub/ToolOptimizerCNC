---
Documento: PROTOCOLO MASTER DE CONVERSÃO MOBILE (CAPACITOR)
Origem: Refinado por GESTOR (CEO Agent)
Status: ✅ ESTRATÉGIA ATUALIZADA
---

# PROTOCOLO_CONVERSAO_APP (MOBILE & PLAY STORE)

Este protocolo define a jornada técnica para converter o sistema **ToolOptimizer CNC (React + Vite)** em um aplicativo mobile nativo para **Android (Play Store)**, utilizando a ponte **Capacitor**.

---

## 🚀 Estratégia Técnica Core

- **Engine:** React + Vite (Web Standard)
- **Bridge:** Capacitor 7.x (Acesso a APIs nativas)
- **Runtime:** WebView Android (Componente de alto desempenho)
- **Build:** GitHub Actions (Build na nuvem sem necessidade de Android Studio local)
- **Store:** Google Play Store (Via App Bundle .aab)

---

## Tabela de Variáveis do Projeto (ToolOptimizer CNC)

| Placeholder | Significado | Valor Atual |
|---|---|---|
| `{{PROJECT_NAME}}` | Slug técnico | `tooloptimizercnc` |
| `{{PROJECT_DISPLAY}}` | Nome na Play Store | `ToolOptimizer CNC` |
| `{{ANDROID_PACKAGE}}` | ID Único (Package ID) | `br.com.tooloptimizercnc` |
| `{{PRIMARY_COLOR}}` | Cor principal UI | `#1a73e8` (Material Blue) |
| `{{GITHUB_REPO}}` | Repositório | `eusourafael/INICIO_TOOLOPTIMIZERCNC` |
| `{{VITE_PORT}}` | Porta de Dev | `5173` |

---

## 🛤️ Sequência de Execução (Roadmap de Lançamento)

| # | Documento | Ação Técnica | Status |
|---|-----------|--------------|--------|
| **01** | [PRE_REQUISITOS](./01_PRE_REQUISITOS.md) | Setup de ambiente Node 24 + JDK 17 | ✅ |
| **02** | [INVENTARIO_SISTEMA](./02_INVENTARIO_DO_SISTEMA.md) | Mapear rotas `/` vs `/mobile` | 🔄 |
| **03** | [STACK_CAPACITOR](./03_STACK_E_DEPENDENCIAS.md) | Instalação de Plugins Capacitor Core | 🔄 |
| **04** | [PLANO_BUILD_VITE](./04_PLANO_WEB_3_ETAPAS.md) | Otimização do build `dist/` para Mobile | 🔄 |
| **05** | [ABSTRACAO_STORAGE](./05_ABSTRACAO_BANCO_DE_DADOS.md) | Persistência Local (IndexedDB/Storage) | 🔄 |
| **06** | [PLATFORM_GUARDS](./06_PLATFORM_GUARDS.md) | Lógica `isMobile()` para redirecionamento | 🔄 |
| **07** | [DESIGN_SYSTEM](./07_DESIGN_SYSTEM_BASE.md) | Ajustes de toque (touch target 48dp) | 🔄 |
| **08** | [DEPLOY_CLOUDFLARE](./08_DEPLOY_WEB_CLOUDFLARE.md) | Web App online para suporte | ✅ |
| **09** | [BUILD_ANDROID_CI](./09_BUILD_APP_EAS.md) | **(NOVO)** Build APK via GitHub Actions | 🔄 |
| **10** | [PLAY_STORE_PUB](./10_PUBLICACAO_PLAY_STORE.md) | Submissão de .aab assinado | 🔄 |
| **11-15** | [CHECKLISTS](./12_CHECKLIST_PO.md) | Quality Gates e Handoff | 🔄 |

---

## 🛡️ Critérios de Sucesso (DoR - Definition of Ready)

- [ ] `npm run build` gera pasta `dist/` sem erros.
- [ ] `npx cap sync android` sincroniza assets web com projeto nativo.
- [ ] GitHub Actions gera APK de Debug baixável em < 10 minutos.
- [ ] O App abre no Android, exibe Splash Screen e carrega a calculadora CNC.
- [ ] O usuário consegue usar o app OFFLINE após o primeiro carregamento.

---

## 📝 Nota do GESTOR
O uso de **Expo/EAS foi descartado** para este projeto por não ser compatível com a estrutura Vite/Capacitor já estabelecida. Todo o esforço deve ser focado em manter o código-fonte único (Single Source of Truth) para Web e Mobile.
