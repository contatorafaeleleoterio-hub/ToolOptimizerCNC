# 📚 Índice RAG - ToolOptimizer CNC

## 🎯 Ordem de Leitura Recomendada

### 1️⃣ CRÍTICOS (Ler Primeiro)
```
CLAUDE.md                          - Contexto completo do projeto
docs/ROADMAP_SESSAO_ATUAL.md       - Roadmap e prioridades atuais
.interface-design/system.md        - Design system tokens e padrões
package.json                       - Versão e dependências
```

### 2️⃣ ESPECIFICAÇÕES & REQUISITOS
```
docs/specs/PRD_MASTER.md
docs/specs/PRD_TOOLOPTIMIZER_CNC_MVP.md
docs/specs/DECISOES_VALIDACAO_PRD.md
```

### 3️⃣ TIPOS & DEFINIÇÕES
```
docs/technical/srctypes.md
src/types/index.ts
src/admin/types/admin-types.ts
```

### 4️⃣ ESPECIFICAÇÃO TÉCNICA CNC
```
docs/technical/ESPECIFICACAO_TECNICA_CONSOLIDADA.md
docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md
docs/technical/PRD_Velocidades_Corte_CNC.md
docs/technical/CASOS_TESTE_REFERENCIA.md
docs/technical/padronizacao-adotada.md
```

### 5️⃣ ARQUITETURA & DECISÕES
```
docs/architecture/ADR-001-stack-tecnologica.md
docs/architecture/ADR-002-estrategia-css.md
docs/architecture/ADR-003-separacao-desktop-mobile.md
docs/architecture/ADR-004-adocao-synkra-aios.md
docs/architecture/ADR-005-electron-desktop-build.md
docs/architecture/ADR-006-estrategia-versionamento.md
docs/architecture/ADR-007-fenix-ai-engineering-system.md
```

### 6️⃣ SISTEMA AI & PROTOCOLOS
```
docs/ai/AI_SYSTEM.md
docs/ai/protocols/ARCHITECTURE_PROTOCOL.md
docs/ai/protocols/ARCH_SYNC_PROTOCOL.md
docs/ai/protocols/DEBUG_PROTOCOL.md
docs/ai/protocols/DECISION_PROTOCOL.md
docs/ai/protocols/FEATURE_PROTOCOL.md
docs/ai/protocols/HANDOFF_PROTOCOL.md
docs/ai/protocols/REVIEW_PROTOCOL.md
docs/ai/protocols/SESSION_PROTOCOL.md
```

### 7️⃣ MEMÓRIA DE ENGENHARIA
```
docs/ai/memory/ARCHITECTURE_LEARNINGS.md
docs/ai/memory/COMMON_MISTAKES.md
docs/ai/memory/ENGINEERING_MEMORY.md
docs/ai/memory/PRODUCT_CONTEXT.md
```

### 8️⃣ DESIGN & UI
```
docs/design/UI_DESIGN_SPEC_FINAL.md
docs/design/DASHBOARD.md
docs/design/UI_BRANDING.md
docs/architecture-map/LAYOUT_SPECS.md
```

### 9️⃣ CONTEXTO HISTÓRICO & ROADMAP
```
docs/PROXIMA_SESSAO.md
docs/AIOS_INTEGRATION.md
docs/architecture-map/README.md
docs/architecture-map/WORKFLOWS.md
```

### 🔟 PLANOS IMPLEMENTAÇÃO ATUAIS
```
docs/plans/BACKLOG_IMPLEMENTACAO.md
docs/plans/Implementações ajustes Dashboard 30-03/AUDITORIA-E-PLANO-CORRECOES.md
docs/plans/Implementações ajustes Dashboard 30-03/SPEC-VISOR-RESULTS-PANEL-v1.md
docs/plans/Implementações ajustes Dashboard 30-03/CONTEXTO-PROXIMA-SESSAO.md
docs/plans/PLAN_Redesign_Visual_Dashboard.md
docs/plans/PLAN_Admin_Dashboard.md
docs/plans/PLAN_Seguranca_Cibernetica.md
docs/plans/TIMELINE_PENDENCIAS.md
```

### 1️⃣1️⃣ STORES (STATE MANAGEMENT)
```
src/store/machining-store.ts
src/store/history-store.ts
src/store/index.ts
src/admin/store/admin-store.ts
src/admin/store/analytics-store.ts
src/admin/store/usage-store.ts
```

### 1️⃣2️⃣ ENGINE & CÁLCULOS
```
src/engine/index.ts
src/engine/rpm.ts
src/engine/feed.ts
src/engine/power.ts
src/engine/chip-thinning.ts
src/engine/slider-bounds.ts
src/engine/validators.ts
src/engine/recommendations.ts
```

### 1️⃣3️⃣ CONFIG & BUILD
```
vite.config.ts
tsconfig.json
wrangler.jsonc
vitest.config.ts
```

### 1️⃣4️⃣ GUIAS & REFERÊNCIA
```
docs/ai/guides/GUIA-USO-CLAUDE-CODE.md
docs/ai/guides/GUIA-USO-CLAUDE-DESKTOP.md
docs/ai/commands/SESSION_COMMANDS.md
.claude/agent.md
.claude/fixplan.md
```

---

## 📊 Resumo

| Categoria | Qtd | Localização |
|-----------|-----|-------------|
| Documentação Crítica | 4 | Raiz + docs/ |
| Especificações | 8 | docs/specs + docs/technical |
| Arquitetura | 7 | docs/architecture/ + docs/architecture-map/ |
| AI & Protocolos | 13 | docs/ai/ |
| Design | 3 | docs/design/ |
| Planos | 40+ | docs/plans/ |
| Código-fonte | 24 | src/ |
| Configuração | 4 | Raiz |
| **TOTAL** | **115** | - |

---

## 🚀 Como Usar no Claude Desktop

1. Copie a pasta `DOCS_TREINAMENTO_RAG` para seu projeto no Claude Desktop
2. Configure o RAG para indexar todos os `.md` e `.ts` arquivos
3. Referencie `INDEX_RAG.md` como entrada principal
4. Sempre iniciar consultas com "Baseado na documentação RAG..." para ativar contexto completo

---

## ⚡ Dicas para o Assistante Especialista

- **Sempre** consultar `CLAUDE.md` para contexto geral
- **Stack**: React 18 + TypeScript + Vite + Zustand + Tailwind CSS v4
- **Domínio**: Sistema CNC desktop para cálculo de parâmetros de usinagem
- **Convenção**: kebab-case para arquivos, PascalCase para componentes
- **Validação**: Semáforo RGB + L/D ratio (≤3=verde, 3-4=amarelo, 4-6=vermelho, >6=bloqueado)
- **Store**: NÃO auto-recalcula — usuário clica "Simular"

---

*Gerado em: 2026-04-01*
*Total de arquivos: 115 | Estrutura preservada | Sem alterações*
