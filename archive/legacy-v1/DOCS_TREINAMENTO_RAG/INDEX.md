# 📋 IMPLEMENTAÇÃO COMPLETA — Refatoração Visor + Educacional

**Pasta única com todas as implementações pendentes.**

---

## 📁 ESTRUTURA

```
implementacao-refatoracao-visor-educacional-2026/
├── INDEX.md ................................ este arquivo
├── PLANO-COMPLETO.md ....................... plano detalhado (5 fases + 12 atualizações)
├── CHECKLIST-IMPLEMENTACAO.md .............. checklist de execução
├── ARQUIVOS-REFERENCIA/
│   ├── resultados-panel.tsx ............... componente a refatorar (GRUPO A)
│   ├── fine-tune-panel.tsx ................ componente a refatorar (GRUPO B)
│   ├── mobile-fine-tune-section.tsx ....... componente a refatorar (GRUPO B)
│   ├── mobile-config-section.tsx .......... componente a refatorar (GRUPO B)
│   ├── config-panel.tsx ................... componente apoio (GRUPO B)
│   ├── mobile-results-section.tsx ......... componente a refatorar (GRUPO C)
│   ├── segmented-gradient-bar.tsx ......... referência (usado em GRUPO A/B)
│   ├── bidirectional-slider.tsx ........... referência (usado em GRUPO B)
│   ├── half-moon-gauge.tsx ................ referência (usado em GRUPO A)
│   ├── shared-result-parts.tsx ............ referência (usado em GRUPO A)
│   └── machining-store.ts ................. store a atualizar (GRUPO B)
├── NOVOS-ARQUIVOS/
│   ├── ParamExplanation.tsx.template ...... componente novo (GRUPO D)
│   └── ToolEditModal.tsx.template ......... modal novo (GRUPO A)
└── IMPLEMENTACOES-ANTERIORES/
    ├── SESSAO7-FIXES-v0.10.1.md ........... fixes (SGB, Safety, Visor, History)
    ├── SESSAO8-ADVANCED-FEATURES.md ....... features avançadas (sincronização, ranges)
    └── SEGURANCA-CIBERNETICA-v0.5.5.md ... segurança (CSP, audit, validação)
```

---

## 🎯 IMPLEMENTAÇÕES AGRUPADAS

### **GRUPO A: Visor Desktop (Results Panel)**
**Arquivo:** `src/components/results-panel.tsx`

| # | Atualização | Descrição | Complexidade |
|---|-------------|-----------|-------------|
| 1.1 | Layout base em Grid | Reorganizar flexbox → grid estruturado com 4 seções | 🔴 Alta |
| 1.2 | Botão editar ferramenta | Adicionar botão + modal ToolEditModal (novo arquivo) | 🟡 Média |
| 1.3 | BigNumber sliders | Reorganizar RPM/Avanço sliders (já existem) | 🟢 Baixa |
| 1.4 | Reposicionar badges | SafetyBadge + Favorite no topo | 🟢 Baixa |
| 1.5 | Integrar gauges | 3 half-moon gauges (já existem) | 🟢 Baixa |
| 1.6 | Warnings section | Adicionar seção de avisos | 🟢 Baixa |

**Referências usadas:**
- `shared-result-parts.tsx` (SafetyBadge, BigNumber, WarningsSection)
- `half-moon-gauge.tsx` (gauges)
- `segmented-gradient-bar.tsx` (se houver indicadores)

---

### **GRUPO B: Configurações + Ajuste Fino**
**Arquivos:**
- `src/components/fine-tune-panel.tsx` (desktop)
- `src/components/mobile/mobile-fine-tune-section.tsx` (mobile)
- `src/components/mobile/mobile-config-section.tsx` (mobile config)
- `src/components/config-panel.tsx` (desktop config — se houver)
- `src/stores/machining-store.ts` (store update)

| # | Atualização | Arquivo | Descrição | Complexidade |
|---|-------------|---------|-----------|-------------|
| 2.1 | Safety Factor slider padronizado | mobile-config-section.tsx + config-panel.tsx | Substituir input nativo por TouchSlider, display em % | 🟡 Média |
| 2.2 | Botão salvar como padrão | mobile-config-section.tsx + machining-store.ts | Novo botão + setter no store | 🟡 Média |
| 3.1 | SGB acima do slider | fine-tune-panel.tsx + mobile-fine-tune-section.tsx | Reposicionar SegmentedGradientBar acima (2 arquivos) | 🟡 Média |
| 3.2 | Botão explicação popover | fine-tune-panel.tsx + mobile-fine-tune-section.tsx | Botão maior + tooltip (novo ParamExplanation.tsx) | 🟡 Média |

**Referências usadas:**
- `segmented-gradient-bar.tsx` (reposicionar)
- `bidirectional-slider.tsx` (padrão slider)

---

### **GRUPO C: Mobile (Replica)**
**Arquivo:** `src/components/mobile/mobile-results-section.tsx`

| # | Atualização | Descrição | Complexidade |
|---|-------------|-----------|-------------|
| 4.1 | Replicar visor desktop em mobile | Aplicar mesmo layout Grupo A em mobile | 🟡 Média |

**Referências usadas:**
- `results-panel.tsx` (copiar estrutura após v1 pronta)
- `half-moon-gauge.tsx` (gauges mobile)

---

### **GRUPO D: Lógica Educacional (Transversal)**

| # | Atualização | Descrição | Complexidade |
|---|-------------|-----------|-------------|
| 5.1 | Explicações educacionais | Adicionar tooltips/popovers em pontos-chave (todos os grupos) | 🟢 Baixa |

**Novo arquivo:**
- `src/components/ParamExplanation.tsx` (reutilizável)

---

## 📍 LOCALIZAÇÃO COMPLETA DOS ARQUIVOS

### **Arquivos a Modificar (Existentes)**

```
src/components/
├── results-panel.tsx .............................. [GRUPO A — Alta complexidade]
│   └─ Linhas críticas: 71-150 (layout), 175-220 (estrutura geral)
│
├── fine-tune-panel.tsx ............................ [GRUPO B — Média complexidade]
│   └─ Linhas críticas: 121-129 (SGB position), ~60-80 (estrutura)
│
├── config-panel.tsx ............................... [GRUPO B — Apoio]
│   └─ Linhas críticas: ~277 (safety factor input nativo)
│
├── segmented-gradient-bar.tsx ..................... [GRUPO B — Referência]
│   └─ Usar como-está, apenas reposicionar no parent
│
├── bidirectional-slider.tsx ....................... [GRUPO B — Referência]
│   └─ Padrão para Safety Factor (replicar)
│
├── half-moon-gauge.tsx ............................ [GRUPO A — Referência]
│   └─ Usar como-está
│
├── shared-result-parts.tsx ........................ [GRUPO A — Referência]
│   └─ SafetyBadge, BigNumber, WarningsSection
│
└── mobile/
    ├── mobile-fine-tune-section.tsx .............. [GRUPO B — Média]
    │   └─ Linhas críticas: 308-325 (SGB position)
    │
    ├── mobile-config-section.tsx ................. [GRUPO B — Média]
    │   └─ Linhas críticas: ~277 (safety factor slider)
    │
    └── mobile-results-section.tsx ................ [GRUPO C — Média]
        └─ Refazer layout inteiro conforme desktop

stores/
└── machining-store.ts ............................. [GRUPO B — Update]
    └─ Adicionar: safetyFactorDefault, setSafetyFactorDefault
```

---

### **Novos Arquivos a Criar**

```
src/components/
├── ParamExplanation.tsx ........................... [GRUPO D]
│   └─ Componente reutilizável para tooltips educacionais
│
└── modals/
    └── ToolEditModal.tsx .......................... [GRUPO A]
        └─ Modal para editar ferramenta selecionada
```

---

## 📋 ORDEM DE IMPLEMENTAÇÃO (Recomendada)

**Sequência que evita bloqueios:**

1. ✅ **ATUALIZAÇÃO 1.1** — Layout base Grid (results-panel.tsx) — BASE para tudo mais
2. ✅ **ATUALIZAÇÃO 1.4** — Reposicionar badges (cosmético, não bloqueia)
3. ✅ **ATUALIZAÇÃO 1.2** — Botão editar + ToolEditModal (novo)
4. ✅ **ATUALIZAÇÃO 1.3** — BigNumber sliders (reorganizar)
5. ✅ **ATUALIZAÇÃO 1.5** — Gauges (reorganizar)
6. ✅ **ATUALIZAÇÃO 1.6** — Warnings (novo)
7. ✅ **ATUALIZAÇÃO 2.1** — Safety Factor slider (padrão)
8. ✅ **ATUALIZAÇÃO 2.2** — Botão salvar padrão
9. ✅ **ATUALIZAÇÃO 3.1** — SGB acima (mobile + desktop)
10. ✅ **ATUALIZAÇÃO 3.2** — Botão explicação popover
11. ✅ **ATUALIZAÇÃO 4.1** — Replicar visor mobile
12. ✅ **ATUALIZAÇÃO 5.1** — Educação transversal

---

## 🔗 Links para Documentos Detalhados

| Documento | Conteúdo |
|-----------|----------|
| `PLANO-COMPLETO.md` | Especificação detalhada de cada atualização (1.1 a 5.1) |
| `CHECKLIST-IMPLEMENTACAO.md` | Checklist executável com tasks |
| `../SESSAO7-FIXES-v0.10.1.md` | Fixes anteriores (SGB, Safety, Visor, History) |
| `../SESSAO8-ADVANCED-FEATURES.md` | Features avançadas (sincronização, ranges) |
| `../PLAN_Seguranca_Cibernetica.md` | Segurança (CSP, audit, validação) |

---

## ✅ Status Atual

- **Plano:** ✅ Completo e aprovado
- **Documentação:** ✅ Estruturada
- **Implementação:** ⬜ Pronta para começar
- **Divisão em sessões:** ⬜ Próximo passo

---

## 📌 Notas Importantes

1. **Não modificar:** Componentes de referência (segmented-gradient-bar, bidirectional-slider, half-moon-gauge, shared-result-parts) — apenas usar como estão
2. **Ordem:** Seguir ordem recomendada para evitar conflitos
3. **Testes:** Após cada grupo, rodar `npm run test` + `npm run typecheck`
4. **Mobile:** Replicar apenas APÓS desktop estar pronto (4.1 é última)
5. **Educação:** Transversal, adicionar em final (5.1)

---

**Próximo passo:** Ler `PLANO-COMPLETO.md` para detalhes de cada atualização.
