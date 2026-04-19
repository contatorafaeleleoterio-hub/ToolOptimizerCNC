---
Documento: Template Padrão de Story
Fonte original: ARQUIVOS_PROJETO_CLAUDE/24_template_story.md
Status: COPIADO — já genérico
---

# Template Padrão de Story — AIOX

> Use este template ao criar novas stories.
> Arquivo: `docs/stories/{epicNum}.{storyNum}.story.md`

---

```markdown
# Story {epicNum}.{storyNum} — {Título}

## Metadata

| Campo | Valor |
|-------|-------|
| **Epic** | {N} — {Nome do Epic} |
| **Story** | {epicNum}.{storyNum} |
| **Status** | Draft |
| **Estimativa** | {XS / S / M / L / XL} / {N} pts |
| **Prioridade** | {Alta / Média / Baixa} |
| **Dependências** | {Story X.X ou "Nenhuma"} |

---

## Story

**Como** {tipo de usuário},
**Quero** {funcionalidade desejada},
**Para** {benefício / valor entregue}.

---

## Contexto

{Descrição do contexto, motivação e decisões relevantes. Por que esta story existe?}

---

## Critérios de Aceite

| AC | Descrição |
|----|-----------|
| AC-1 | {Critério testável} |
| AC-2 | {Critério testável} |
| AC-3 | {Critério testável} |

---

## Escopo

### IN (incluso)
- {Item incluso 1}
- {Item incluso 2}

### OUT (excluído)
- {Item excluído 1}
- {Item excluído 2}

---

## Tarefas

- [ ] T1: {Descrição da tarefa}
- [ ] T2: {Descrição da tarefa}
- [ ] T3: {Descrição da tarefa}

---

## Dev Notes

{Notas técnicas deixadas pelo @dev durante implementação.
Decisões tomadas, alternativas consideradas, dívidas criadas.}

---

## Lista de Arquivos

### Criados
- `{caminho/arquivo.tsx}` — {descrição}

### Modificados
- `{caminho/arquivo.ts}` — {descrição}

---

## QA Results

### Gate Decision: {PASS | CONCERNS | FAIL | WAIVED}

**Checks:**

| Check | Status | Nota |
|-------|--------|------|
| 1. Code review | ✅ PASS | |
| 2. Unit tests | ✅ PASS | |
| 3. Acceptance criteria | ✅ PASS | |
| 4. No regressions | ✅ PASS | |
| 5. Performance | ✅ PASS | |
| 6. Security | ✅ PASS | |
| 7. Documentation | ✅ PASS | |

**Concerns:** {Se CONCERNS, listar aqui}

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| YYYY-MM-DD | @sm (River) | Story criada (Draft) |
| YYYY-MM-DD | @po (Pax) | Validação {GO/NO-GO} — Score {N}/10. Status: Draft → Ready |
| YYYY-MM-DD | @dev (Dex) | Implementação completa T1–TN. Status: Ready → InReview |
| YYYY-MM-DD | @qa (Quinn) | QA Gate executado. Veredicto: {PASS/CONCERNS}. Status: InReview → Done |
```

---

## Regras de Preenchimento

| Campo | Regra |
|-------|-------|
| **Status** | Inicia sempre em `Draft` |
| **Estimativa** | T-shirt: XS=1, S=2, M=5, L=8, XL=13 pts |
| **ACs** | Devem ser testáveis e verificáveis |
| **Tarefas** | Granulares o suficiente para completar em horas |
| **Change Log** | Append-only — nunca editar entradas anteriores |
| **QA Results** | Somente @qa pode preencher |
| **Dev Notes** | @dev preenche durante implementação |

---

## Lifecycle de Status

```
Draft     → @po valida (GO ≥7/10)
Ready     → @dev inicia implementação
InProgress → @dev completa, solicita review
InReview   → @qa executa QA gate
Done       → @devops push para remote
```
