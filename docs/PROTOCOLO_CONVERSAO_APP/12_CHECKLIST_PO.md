---
Documento: Checklist do @po Pax — Validação de Story (10 pontos)
Fonte original: ARQUIVOS_PROJETO_CLAUDE/25_checklist_po.md
Status: COPIADO — já genérico
---

# Checklist do @po Pax — Validação de Story

**Agente:** Pax (Balancer) — Product Owner
**Comando:** `*validate-story-draft {story-id}`
**Decisão mínima para GO:** ≥ 7/10 pontos

---

## Os 10 Pontos de Validação

| # | Ponto | Descrição | Peso |
|---|-------|-----------|------|
| 1 | **Título claro e objetivo** | O título comunica o que será entregue sem ambiguidade | Obrigatório |
| 2 | **Descrição completa** | O problema ou necessidade está explicado com contexto suficiente | Obrigatório |
| 3 | **Critérios de aceite testáveis** | ACs seguem padrão Given/When/Then ou são verificáveis objetivamente | Obrigatório |
| 4 | **Escopo bem definido** | Listas IN e OUT estão presentes e são claras | Obrigatório |
| 5 | **Dependências mapeadas** | Stories/recursos pré-requisito estão identificados | Importante |
| 6 | **Estimativa de complexidade** | Pontos ou T-shirt sizing presentes e justificados | Importante |
| 7 | **Valor de negócio** | O benefício para o usuário ou negócio está declarado | Importante |
| 8 | **Riscos documentados** | Problemas potenciais ou incertezas foram identificados | Recomendado |
| 9 | **Definition of Done clara** | É possível saber objetivamente quando a story está completa | Importante |
| 10 | **Alinhamento com PRD/Epic** | A story é consistente com os documentos de origem | Obrigatório |

---

## Critérios de Decisão

| Score | Decisão | Ação |
|-------|---------|------|
| ≥ 7/10 | **GO** | Atualizar Status: Draft → Ready; logar no Change Log |
| < 7/10 | **NO-GO** | Listar fixes necessários; retornar ao @sm para correção |
| GO condicional | **GO*** | Aprovar com ressalvas documentadas; fixes não bloqueiam |

---

## Regras Críticas

1. **@po é o ÚNICO agente autorizado** a executar `*validate-story-draft`
2. **Após GO, @po DEVE** atualizar o campo `Status` na story de `Draft` → `Ready`
3. **Após GO, @po DEVE** logar a transição no Change Log da story
4. Story em `Draft` após veredicto GO é violação de processo
5. Pontos 1, 2, 3, 4 e 10 são essencialmente obrigatórios (falha ≥ 2 desses = NO-GO automático)

---

## Responsabilidades do @po além da Validação

| Tarefa | Comando |
|--------|---------|
| Gestão de backlog | `*backlog-review`, `*backlog-prioritize` |
| Encerrar story concluída | `*close-story {story-id}` |
| Índice de stories | `*stories-index` |

---

## Colaboração

| Recebe de | Para |
|-----------|------|
| @sm | Stories em Draft para validar |
| @pm | PRDs e direção estratégica |

| Delega para | Quando |
|-------------|--------|
| @sm | Criação de stories (`*draft`) |
| @pm | Criação de epics (`*create-epic`) |
