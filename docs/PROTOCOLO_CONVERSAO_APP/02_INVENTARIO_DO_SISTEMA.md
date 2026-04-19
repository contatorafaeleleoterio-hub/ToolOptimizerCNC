---
Documento: 02 — Inventário do Sistema (Vite + Capacitor)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO
---

# 02 — Inventário do Sistema

Este documento mapeia a estrutura real do **ToolOptimizer CNC** para garantir uma transição suave entre Web e Mobile.

---

## 1. Árvore de Diretórios (Arquitetura Real)

```
INICIO_TOOLOPTIMIZERCNC/
│
├── src/                    # Código Fonte (React + Vite)
│   ├── components/         # UI Components (Gauge, Sliders, etc.)
│   ├── hooks/              # Lógica de negócio (useCalculoCNC, etc.)
│   ├── pages/              # Rotas da aplicação
│   │   ├── Dashboard.tsx   # Visão Principal
│   │   └── mobile/         # (A criar) Telas otimizadas para Mobile
│   ├── store/              # Estado Global (Zustand/Context)
│   ├── styles/             # CSS / Design System
│   └── main.tsx            # Entry point
│
├── android/                # Projeto Nativo Android (Gerado pelo Capacitor)
│   ├── app/                # Código Java/Kotlin e Manifest
│   └── build.gradle        # Configurações de build Gradle
│
├── public/                 # Assets estáticos (Icons, Logos)
├── docs/                   # Documentação do projeto
├── capacitor.config.ts     # Configuração principal do Capacitor
├── package.json            # Scripts: build, cap sync, etc.
└── vite.config.ts          # Configuração do Bundler Vite
```

---

## 2. Persistência de Dados (Estratégia)

O ToolOptimizer utiliza persistência local para garantir o funcionamento offline em ambientes industriais (CNC).

| Recurso | Tecnologia | Propósito |
|---|---|---|
| Favoritos | `localStorage` | Salvar simulações aprovadas |
| Histórico | `localStorage` | Últimos cálculos realizados |
| Configurações | `localStorage` | Preferências de interface |

**Nota técnica:** Para o Mobile, o Capacitor mantém o `localStorage` persistente, mas para grandes volumes de dados, recomenda-se migrar futuramente para `@capacitor-community/sqlite`.

---

## 3. APIs e Plugins (Substituindo Expo por Capacitor)

Liste os plugins necessários para funcionalidades nativas.

| Funcionalidade | Plugin Capacitor | Status |
|---|---|---|
| Splash Screen | `@capacitor/splash-screen` | ✅ Configurado |
| Status Bar | `@capacitor/status-bar` | ✅ Configurado |
| Haptic Feedback | `@capacitor/haptics` | 🔄 Planejado (Feedback de toque) |
| Device Info | `@capacitor/device` | 🔄 Planejado (Identificar Mobile) |
| Share | `@capacitor/share` | 🔄 Planejado (Exportar cálculos) |

---

## 4. Diferenças de Roteamento (Web vs Mobile)

Conforme definido na **ADR-003**, o sistema deve diferenciar a experiência:

- **Desktop:** Dashboard completo com múltiplas colunas.
- **Mobile:** Interface simplificada, focada no visor HMI e sliders de fácil acesso.

| Rota | View | Objetivo |
|---|---|---|
| `/` | Desktop | Gestão completa |
| `/mobile` | App Mobile | Uso rápido no pé da máquina CNC |

---

## ✅ Checklist de conclusão desta etapa

- [ ] Estrutura de pastas `src/` e `android/` verificada.
- [ ] `capacitor.config.ts` possui o `appId: "br.com.tooloptimizercnc"`.
- [ ] Diferença entre rotas Desktop e Mobile mapeada.
- [ ] `npm run build` executado para validar a geração da pasta `dist/`.
- [ ] Estado atual commitado: `git commit -m "docs: inventário atualizado (Capacitor)"`
