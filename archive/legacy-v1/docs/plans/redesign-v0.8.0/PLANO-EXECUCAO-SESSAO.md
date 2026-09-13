# Plano de Execucao — Redesign v0.8.0+

> **Criado:** 23/03/2026 | **Atualizado:** 23/03/2026
> **Versao atual:** `0.8.0-alpha.3`
> **Versao alvo final:** `0.8.3`

---

## Mapa de Fases

| Fase | Nome | Arquivo | Status | Versao |
|------|------|---------|--------|--------|
| 1 | Fundacao: Tipos, Store, Dados | `FASE-1-fundacao-tipos-store-dados.md` | ✅ Concluido | alpha.1 |
| 2 | Layout 2 Colunas + Accordion | `FASE-2-layout-2-colunas-accordion.md` | ✅ Concluido | alpha.2 |
| 3 | Ferramenta Dropdowns | `FASE-3-ferramenta-dropdowns.md` | ✅ Concluido | alpha.3 |
| **4** | **Fix Atomico Store** | **`FASE-4-fix-atomico-store.md`** | ⬜ Pendente | alpha.4 |
| **5** | **Biblioteca de Ferramentas** | **`FASE-5-biblioteca-ferramentas.md`** | ⬜ Pendente | alpha.5 |
| **6** | **Fontes + Polish + Release** | **`FASE-6-fontes-polish-release.md`** | ⬜ Pendente | **0.8.0** |
| **7** | **Objetivo de Usinagem** | **`FASE-7-v2-objetivo-usinagem.md`** | ⬜ Pendente | 0.8.1 |
| **8A** | **Favoritar Simulacao** | **`FASE-8A-favoritar-simulacao.md`** | ⬜ Pendente | 0.8.2 |
| **8B** | **Tornar Input Padrao** | **`FASE-8B-tornar-input-padrao.md`** | ⬜ Pendente | 0.8.3 |

> **Arquivos obsoletos (NAO usar):** `FASE-7-objetivo-usinagem-BLOQUEADO.md`, `FASE-8-validados-defaults-BLOQUEADO.md`, e todos os `_legado/`.
>
> **Regra F8:** Favoritar simulacao (8A) e Tornar input padrao (8B) sao features SEPARADAS. 8A = ⭐ em RESULTADOS no historico. 8B = 📌 em INPUTS como default ao abrir o app.

---

## Viabilidade

### Sessao 1: F4 → F5 → F6

| Fase | Arquivos | Linhas | Testes | Contexto |
|------|----------|--------|--------|----------|
| 4 | 2 | ~22 | +2 | ~15% |
| 5 | 3 | ~90 | +9 | ~30% |
| 6 | 4 | ~17 | 0 | ~20% |
| **Total** | **—** | **~129** | **+11** | **~65%** |

### Sessao 2: F7 → F8A → F8B

| Fase | Arquivos | Linhas | Testes | Contexto |
|------|----------|--------|--------|----------|
| 7 | 8 | ~60 | +7 | ~25% |
| 8A | 5 | ~50 | +8 | ~20% |
| 8B | 8 | ~120 | +11 | ~35% |
| **Total** | **—** | **~230** | **+26** | **~80%** |

---

## Ordem de Execucao: 4 → 5 → 6

### PASSO 1: Fase 4 — Fix Atomico (~15 min)

**Por que primeiro:** Corrige bug critico no store. Base deve estar estavel antes de mexer em `simular()` (Fase 5).

1. Ler `src/store/machining-store.ts` linhas ~400-460
2. Remover `set({ baseRPM, baseFeed })` da linha ~404
3. Adicionar `baseRPM, baseFeed` no `set()` da linha ~443
4. Adicionar 2 testes em `results-panel.test.tsx`
5. Rodar `npx tsc --noEmit && npx vitest run`
6. Commit: `fix: atomic set() in calcular() v0.8.0-alpha.4`

---

### PASSO 2: Fase 5 — Biblioteca de Ferramentas (~45 min)

**Por que segundo:** Modifica `simular()` no mesmo arquivo que Fase 4 corrigiu. Store ja esta estavel.

1. Ler `src/store/machining-store.ts` — localizar auto-save em `simular()`
2. Deletar bloco auto-save (~linhas 480-498)
3. Ler `src/components/config-panel.tsx`
4. Adicionar destructuring: `savedTools, loadSavedTool, addSavedTool, removeSavedTool`
5. Adicionar handler `handleSaveTool` + estado badge
6. Substituir placeholder pelo JSX (dropdown + botao salvar)
7. Adicionar 9 testes em `config-panel.test.tsx`
8. Rodar `npx tsc --noEmit && npx vitest run`
9. Commit: `feat: redesign fase 5 — biblioteca ferramentas manual v0.8.0-alpha.5`

---

### PASSO 3: Fase 6 — Fontes + Release (~30 min)

**Por que ultimo:** Quality gates validam TUDO. Version bump fecha o ciclo.

1. Ler e editar `collapsible-section.tsx` (2 trocas de classe)
2. Ler e editar `config-panel.tsx` (4 trocas de classe + gap)
3. Ler e editar `fine-tune-panel.tsx` (2 trocas de classe)
4. Editar `package.json` → version `"0.8.0"`
5. Quality gates: `npx tsc --noEmit && npx vitest run && npx vite build`
6. Atualizar docs (roadmap, backlog, memory)
7. Commit codigo: `feat: redesign fase 6 — fontes polish v0.8.0`
8. Commit docs: `docs: update roadmap + backlog v0.8.0`
9. Push → deploy automatico

---

## Ordem de Execucao: 7 → 8A → 8B (Sessao 2)

### PASSO 4: Fase 7 — Objetivo de Usinagem (~45 min)

**Plano:** `FASE-7-v2-objetivo-usinagem.md`

1. Adicionar `OBJETIVO_MULTIPLIERS` em `src/types/index.ts`
2. Modificar `calcularSliderBounds()` em `slider-bounds.ts` — novo param, multiplicadores
3. Atualizar 3 consumidores: `machining-store.ts` L436, `parameter-health-bar.tsx` L255, `fine-tune-panel.tsx` L48
4. `setObjetivoUsinagem` → chamar `calcular()` se resultado existe
5. UI: 3 botoes segmentados + disclaimer no `config-panel.tsx`
6. +7 testes
7. `npx tsc --noEmit && npx vitest run`
8. Commit: `feat: redesign fase 7 — objetivo usinagem v0.8.1`

---

### PASSO 5: Fase 8A — Favoritar Simulacao (~30 min)

**Plano:** `FASE-8A-favoritar-simulacao.md`

1. Adicionar `isFavorited: boolean` ao `HistoricoCalculo` em types
2. `history-store.ts`: `addEntry` default false, `toggleFavorite(id)`, filtro `onlyFavorites`, persist v1→v2
3. `history-page.tsx`: botao ⭐ com `stopPropagation`, filtro toggle, counter
4. +8 testes
5. `npx tsc --noEmit && npx vitest run`
6. Commit: `feat: favoritar simulacao no historico v0.8.2`

---

### PASSO 6: Fase 8B — Tornar Input Padrao (~60 min)

**Plano:** `FASE-8B-tornar-input-padrao.md`

1. Adicionar `UserDefaults` interface em types
2. `machining-store.ts`: state `userDefaults`, 3 actions, partialize, persist v2→v3, `onRehydrateStorage`
3. Criar `pin-default-button.tsx` — componente compartilhado
4. `config-panel.tsx`: pins nos 7 inputs
5. `fine-tune-panel.tsx`: pins nos 4 sliders
6. +11 testes
7. Quality gates finais: `npx tsc --noEmit && npx vitest run && npx vite build`
8. Commit: `feat: tornar input padrao — pin defaults per-input v0.8.3`
9. Atualizar docs + push

---

## Checklist Final

### Sessao 1: F4 → F5 → F6 (~65% contexto, ~90 min)
- [ ] **Fase 4:** `set()` atomico — `baseRPM + baseFeed + resultado` juntos
- [ ] **Fase 5:** Auto-save removido de `simular()`
- [ ] **Fase 5:** Dropdown + botao "Salvar" manual funcionando
- [ ] **Fase 5:** 9 testes novos passando
- [ ] **Fase 6:** Fontes aumentadas (3 componentes)
- [ ] **Fase 6:** `npx tsc --noEmit` + `npx vitest run` + `npx vite build`
- [ ] **Fase 6:** `package.json` version === `"0.8.0"`
- [ ] Push + deploy v0.8.0

### Sessao 2: F7 → F8A → F8B (~80% contexto, ~135 min)
- [ ] **Fase 7:** 3 botoes objetivo (Velocidade/Balanceado/Vida Ferram.)
- [ ] **Fase 7:** Multiplicadores aplicados ao `recomendado` em `calcularSliderBounds()`
- [ ] **Fase 7:** `setObjetivoUsinagem` recalcula se resultado existe
- [ ] **Fase 7:** 7 testes passando
- [ ] **Fase 8A:** `isFavorited` no `HistoricoCalculo`, ⭐ toggle na UI
- [ ] **Fase 8A:** Filtro "Apenas Favoritos", persist migration v1→v2
- [ ] **Fase 8A:** 8 testes passando
- [ ] **Fase 8B:** `UserDefaults` tipo + `userDefaults` no store + 3 actions
- [ ] **Fase 8B:** `PinDefaultButton` componente, pins em 11 inputs
- [ ] **Fase 8B:** Persist v2→v3 + `onRehydrateStorage` aplica defaults
- [ ] **Fase 8B:** 11 testes passando
- [ ] Quality gates finais + push v0.8.3
