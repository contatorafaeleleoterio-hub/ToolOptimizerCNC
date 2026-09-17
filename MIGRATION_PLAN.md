# MIGRATION_PLAN.md — Plano de Execução e Migração Incremental do Design System

> **Protocolo:** Auditoria, Reconciliação e Migração do Design System  
> **Fase:** FASE 13 — PLANO DE MIGRAÇÃO  
> **Data:** 16 de Setembro de 2026  
> **Projeto:** `ToolOptimizerCNC` (v2.0.0)  

---

## 1. Estratégia de Execução

A migração é executada de forma estritamente incremental, orientada a dependências (de baixo para cima), garantindo que em nenhuma etapa o código entre em estado quebrado:

$$\text{Baseline} \longrightarrow \text{Tokens \& Foundations} \longrightarrow \text{Componentes} \longrightarrow \text{Catálogos \& Showcases} \longrightarrow \text{Certificação Final}$$

Para cada unidade:
1. Aplicação das alterações calibradas;
2. Validação automática via `npm run check` (`tsc --noEmit` + 114 testes Vitest);
3. Validação do build de produção via `npm run build`;
4. Confirmação visual e funcional antes de avançar.

---

## 2. Roteiro de Etapas da Migração

### Etapa 0: Baseline & Congelamento de Estado (CONCLUÍDA)
- **Ação:** Verificação estrita de que todos os 114 testes unitários e o compilador TypeScript estão passando com 100% de sucesso.
- **Evidência:** `npm run check` executado com código de saída 0.
- **Status:** **HOMOLOGADO**.

---

### Etapa 1: Governança e Matrizes Formais (CONCLUÍDA)
- **Ação:** Produção e homologação dos 7 documentos de auditoria e reconciliação na raiz do projeto:
  1. `RECONCILIATION_SCOPE.md` (Fase 0)
  2. `SYSTEM_MAP.md` (Fase 1)
  3. `DESIGN_SYSTEM_RECONCILIATION_MATRIX.md` (Fases 4, 5 e 6)
  4. `TOKEN_RECONCILIATION.md` (Fase 7)
  5. `COMPONENT_MAPPING.md` (Fases 8, 9 e 10)
  6. `DECISION_RECORDS.md` (Fase 11)
  7. `RECONCILED_DESIGN_SYSTEM.md` (Fase 12)
- **Status:** **CONCLUÍDO**.

---

### Etapa 2: Tokens & Foundations em `src/ui/index.css`
- **Ação:** Enriquecer e unificar a camada de tokens do arquivo `src/ui/index.css` sem alterar valores que quebrem classes existentes:
  - Adicionar as variáveis luminescentes cirúrgicas (`--glow-cyan`, `--glow-lime`, `--glow-crit`, `--glow-active`);
  - Adicionar os aliases de espaçamento modular compatíveis (`--sp-md: 20px`, `--sp-lg: 24px`, `--sp-xl: 32px`, `--sp-2xl: 48px`);
  - Garantir a presença de `--bg-surface`, `--surface-hover-field`, `--surface-hover-card`, `--surface-pressed` e `--border-strong`.
- **Validação:** `npm run check` para garantir invariância funcional.

---

### Etapa 3: Harmonização dos Catálogos Estáticos (`showcase.html` e `site-model.html`)
- **Ação:** Assegurar que o `showcase.html` e `site-model.html` na raiz do projeto reflitam rigorosamente a especificação canônica reconciliada:
  - Tokens e cores canônicas harmonizadas com o produto;
  - Seções normativas (00 a 12) acessíveis e operacionais;
  - Logomarca canônica vetorial com os caminhos corretos de `brand/`.
- **Validação:** `npm run build` para certificar que os arquivos estáticos compilam perfeitamente para `dist/`.

---

### Etapa 4: Validação Funcional e de Regressão
- **Ação:** Executar a suíte completa de testes de regressão:
  - Suíte do motor canônico: Fresamento, Furação, Roscamento, Mandrilamento;
  - Suíte de integração: `store.spec.tsx`, `settings.spec.tsx`, `integration.spec.tsx`;
  - Suíte de UI: `inputs.spec.tsx`, `results.spec.tsx`, `App.spec.tsx`, `mobile.spec.tsx`.
- **Critério de Sucesso:** 114 de 114 testes passando (100%).

---

### Etapa 5: Walkthrough e Documentação Final
- **Ação:** Elaboração do relatório de walkthrough final registrando todos os passos executados, evidências de teste e status definitivo de reconciliação.
