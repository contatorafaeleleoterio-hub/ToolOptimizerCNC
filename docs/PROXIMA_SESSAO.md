# PROXIMA SESSAO — ToolOptimizer CNC

> **Ponto de entrada da sessão:** `docs/ROADMAP_SESSAO_ATUAL.md` — ler este primeiro!

---

## ESCOPO POR AMBIENTE (REGRA OBRIGATORIA)

- Codex (OpenAI): trabalha somente no Admin Dashboard (`/admin`).
- Gemini/Cloud Code: ambiente autorizado para evoluções do dashboard de cálculos e produto final.

---

## 📄 Sessão paralela — Design System Canônico (02/08/2026)

Sessão de documentação/design audit, independente da linha mobile/Android abaixo. **Zero alterações em `src/`.**

- Plano `docs/plans/PLAN_DESIGN_SYSTEM_CANONICO.md` executado do zero ao fim — 4 sessões (replanejado de 6), commits `5aadb9b`→`d471895`.
- Entregável: `docs/_canonicos/DESIGN-SYSTEM.html` — 1575 linhas, 20 seções (Marca, Fundamentos, Componentes, Regras), fonte única de verdade visual do app (desktop + mobile + admin).
- Seção 18 do documento cataloga 21 itens de dívida visual; recomendação passada ao Rafael: resolver em 3 blocos por risco (limpeza de código órfão zero-risco → snap de escala mecânico → refactor de componente com plano próprio). Nenhuma correção de código feita ainda — fica para plano futuro.
- Pendente: validação visual em navegador real (sem ferramenta de browser disponível nas sessões de execução).
- Detalhes completos: `docs/plans/BACKLOG_IMPLEMENTACAO.md` item 14.

---

## ⚡ RESUMO DA ÚLTIMA SESSÃO (19/04/2026)

**Fases 2 e 3 do Master Plan v2.0 CONCLUÍDAS ✅**

**O que foi feito:**
- ✅ **Bridge Mobile:** Instalados plugins `@capacitor/device`, `haptics`, `preferences` e `status-bar`.
- ✅ **ViewportGuard:** Refatoração do redirecionador automático para garantir rota `/mobile` em dispositivos móveis.
- ✅ **UI Industrial (HMI):** Criado o `HmiVisor.tsx` com interface de alto contraste e números grandes para chão de fábrica.
- ✅ **Haptics:** Implementado utilitário de feedback tátil e integrado a sliders, abas e botões.
- ✅ **Persistência Híbrida:** Criado `StorageService` que utiliza `@capacitor/preferences` em ambientes nativos e `localStorage` na Web.
- ✅ **Offline First:** Configurado `vite-plugin-pwa` para suporte completo offline + banner de notificação de conexão na `MobilePage`.
- ✅ **Build CI/CD:** Criado workflow `.github/workflows/build-android.yml` para geração automática de APKs.

**Estado ao encerrar:**
- TypeScript zero erros ✅
- Build limpo (com suporte PWA) ✅
- Persistência migrada para modelo híbrido assíncrono ✅

---

## 🚀 CONTINUAR AQUI — Próxima Sessão (Fase 4)

A próxima etapa é a **Fase 4: Validação de Campo e Refinamento Nativo**.

**Ações recomendadas:**
1. **Validar APK:** Baixar o APK gerado pelo GitHub Actions e testar em dispositivo físico.
2. **Teste de Persistência:** Confirmar se o histórico e favoritos sobrevivem ao fechamento total do app (kill process).
3. **Refinamento HMI:** Ajustar sensibilidade dos sliders e haptics baseado no uso real na oficina.
4. **Splash Screen & Icons:** Personalizar a inicialização nativa (atualmente usando assets padrão do Capacitor).

---

## Estado do Projeto

| Item | Valor |
|------|-------|
| **Branch** | `main` |
| **Versão** | `0.11.0` (Capacitor + PWA) |
| **Persistência** | Híbrida (Capacitor Preferences / LocalStorage) |
| **Mobile** | Rota `/mobile` (HMI Visor + Haptics) |
| **Offline** | ✅ Ativo via PWA |
| **CI/CD** | ✅ GitHub Actions (Android Build) |

```bash
# Comandos úteis para a próxima sessão
npm run build && npx cap sync android
npm run typecheck
```
