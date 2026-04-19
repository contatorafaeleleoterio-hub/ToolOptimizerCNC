# PLANO CONSOLIDADO GESTOR - TOOLOPTIMIZER CNC (v2.0)

Este documento resume a estratégia final para o lançamento do App Mobile e Web.

## 1. Stack Tecnológica
- **Base:** React + Vite (Single Source of Truth)
- **Bridge Mobile:** Capacitor 7.x (Android Nativo)
- **Build Server:** GitHub Actions (Geração de APK automática)
- **Hospedagem Web:** Cloudflare Pages (com SPA Redirects)

## 2. Diferenciais Estratégicos
- **Rota `/mobile`:** Interface exclusiva para chão de fábrica (HMI Visor).
- **GitHub Releases:** Seu link de download será `github.com/eusourafael/INICIO_TOOLOPTIMIZERCNC/releases`.
- **Offline First:** Uso de `StorageService` para garantir que o app funcione sem internet na oficina.
- **Acessibilidade Industrial:** Botões de 48dp e feedback tátil (Haptics).

## 3. Próximas Ações (Fase de Implementação)
1. Instalar plugins Capacitor (`@capacitor/device`, `@capacitor/haptics`, etc).
2. Criar a lógica de `ViewportGuard` para redirecionamento.
3. Desenvolver a UI mobile na rota `/mobile`.
4. Configurar o arquivo `.github/workflows/build-android.yml`.

---
**Status:** PRONTO PARA EXECUÇÃO (Nova Sessão Recomendada)
**GESTOR (CEO Agent)**
