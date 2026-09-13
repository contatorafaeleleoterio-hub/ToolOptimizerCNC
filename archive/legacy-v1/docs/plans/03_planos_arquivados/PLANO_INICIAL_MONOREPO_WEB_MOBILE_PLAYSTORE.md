---
Documento: PLANO MESTRE - WEB + MOBILE + PLAY STORE (CAPACITOR EDITION)
Origem: Refinado por GESTOR (CEO Agent)
Status: ✅ ESTRATÉGIA CONSOLIDADA
Versão: v2.0 (Substitui v1.2 Codex)
---

# Plano Estratégico - ToolOptimizer CNC

Este plano define a jornada para transformar o sistema atual em uma solução multiplataforma (Web, Android e Desktop) utilizando a stack **Vite + Capacitor**, priorizando a velocidade de lançamento e o reúso total de código.

---

## 1. Decisão de Arquitetura: Repositório Híbrido Unificado

Diferente do plano anterior (Expo Monorepo), manteremos a estrutura atual, mas organizando-a para servir múltiplas saídas:

- **Core UI/Logic:** Localizado em `src/` (React + Vite). Única fonte de verdade.
- **Mobile Bridge:** Localizado em `android/` (Capacitor). Ponte para a Play Store.
- **Desktop Bridge:** Localizado em `Sistema_Desktop_Pen_driver/` (Electron). Versão offline.
- **Web Host:** Cloudflare Pages (Build da pasta `dist/`).

---

## 2. Princípios de Implementação "GESTOR"

1.  **Zero Duplicação:** O cálculo CNC deve ser escrito uma vez e rodar em todo lugar.
2.  **Web-First, Mobile-Optimized:** O desenvolvimento ocorre no browser, mas a rota `/mobile` garante a experiência nativa.
3.  **Build na Nuvem:** GitHub Actions é o motor de build Android (Zero instalação local).
4.  **Estabilidade Web:** O site nunca para; o app mobile é um reflexo do build web estável.

---

## 3. Roadmap de Execução (Fases)

### Fase 1 - Baseline e Sincronização Capacitor (ATUAL)
- **Objetivo:** Garantir que o código atual compile para Android sem erros.
- **Ações:** `npm run build` -> `npx cap sync android`.
- **Gate de Saída:** APK de debug gerado no GitHub Actions.

### Fase 2 - UX Mobile e Rota `/mobile`
- **Objetivo:** Criar a interface de "Visor HMI" para celulares.
- **Ações:** Implementar `ViewportGuard` e telas otimizadas para touch (48dp).
- **Gate de Saída:** App abre no celular e redireciona automaticamente para a interface mobile.

### Fase 3 - Persistência e Haptics
- **Objetivo:** Garantir que favoritos e histórico funcionem no app e adicionar feedback tátil.
- **Ações:** Implementar `StorageService` e `Haptics` plugin.
- **Gate de Saída:** Favoritos salvos no APK persistem após reiniciar o app.

### Fase 4 - Identidade Visual e Splash
- **Objetivo:** Profissionalizar a abertura do app.
- **Ações:** Gerar ícones e Splash Screen via `@capacitor/assets`.
- **Gate de Saída:** App exibe logo do ToolOptimizer ao iniciar.

### Fase 5 - Lançamento Play Store (Alpha)
- **Objetivo:** Colocar o app nas mãos dos testadores.
- **Ações:** Gerar `.aab` assinado e configurar Google Play Console.
- **Gate de Saída:** App disponível na trilha de Teste Interno da Google Play.

---

## 4. Protocolo de Sessão (Gestão de Tokens)

Para manter a eficiência do agente e evitar perda de contexto:
- **Limite por Sessão:** 200k tokens (Meta: 120k).
- **Handoff Obrigatório:** Toda sessão termina com o registro em `11_SESSION_HANDOFF_TEMPLATE.md`.
- **Validação:** Cada mudança técnica deve ser validada com `npm run typecheck`.

---

## 5. Riscos e Mitigações

| Risco | Mitigação |
|---|---|
| Incompatibilidade de Plugins | Usar Platform Guards (`isNativePlatform()`). |
| Perda de Performance | Minimizar o uso de bibliotecas pesadas no WebView. |
| Rejeição na Play Store | Seguir rigorosamente o Store Listing e Política de Privacidade (Doc 10). |

---

## 🛡️ Veredicto do GESTOR

Este plano substitui qualquer menção ao Expo ou Monorepos complexos. O foco é **Vite + Capacitor**. O repositório atual já possui a base necessária; agora iniciaremos o polimento da Fase 2 para entrega imediata de valor.

**Próxima Ação:** Iniciar a implementação da rota `/mobile` e do `ViewportGuard`.
