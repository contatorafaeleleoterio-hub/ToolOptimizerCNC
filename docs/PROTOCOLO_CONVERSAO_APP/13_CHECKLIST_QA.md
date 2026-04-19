---
Documento: Checklist do @qa Quinn — QA Gate (7 checks)
Fonte original: ARQUIVOS_PROJETO_CLAUDE/26_checklist_qa.md
Status: COPIADO — já genérico
---

# Checklist do @qa Quinn — QA Gate

**Agente:** Quinn (Guardian) — Test Architect & Quality Advisor
**Comando:** `*gate {story-id}` ou `*review {story-id}`

---

## Os 7 Quality Checks

| # | Check | Descrição |
|---|-------|-----------|
| 1 | **Code review** | Padrões, legibilidade, manutenibilidade do código |
| 2 | **Unit tests** | Cobertura adequada, todos os testes passando |
| 3 | **Acceptance criteria** | Todos os ACs da story atendidos e verificados |
| 4 | **No regressions** | Funcionalidade existente preservada |
| 5 | **Performance** | Dentro de limites aceitáveis para o contexto |
| 6 | **Security** | OWASP basics verificados (SQL injection, XSS, etc.) |
| 7 | **Documentation** | Atualizada se necessário para as mudanças feitas |

---

## Decisões do Gate

| Decisão | Condição | Ação Seguinte |
|---------|---------|---------------|
| **PASS** | Todos os checks OK | Aprovar; seguir para @devops push |
| **CONCERNS** | Issues menores; não bloqueiam | Aprovar com observações documentadas |
| **FAIL** | Issues HIGH/CRITICAL | Retornar para @dev com feedback específico |
| **WAIVED** | Issues aceitos formalmente | Aprovar com waiver documentado (uso raro) |

---

## Estrutura do Arquivo de Gate

```yaml
storyId: "X.Y"
verdict: PASS | CONCERNS | FAIL | WAIVED
issues:
  - severity: low | medium | high | critical
    category: code | tests | requirements | performance | security | docs
    description: "Descrição do problema"
    recommendation: "O que deve ser feito"
```

---

## Integração com CodeRabbit (se disponível)

```bash
# Pre-review uncommitted
wsl bash -c 'cd /mnt/c/.../projeto && ~/.local/bin/coderabbit --prompt-only -t uncommitted'

# Story review committed
wsl bash -c 'cd /mnt/c/.../projeto && ~/.local/bin/coderabbit --prompt-only -t committed --base main'
```

**Self-Healing automático (max 3 iterações):**
- CRITICAL/HIGH → auto-fix (máx 3 tentativas)
- MEDIUM → documenta como tech debt
- LOW → ignora (nota no review)

---

## Regras Críticas do @qa

1. **Somente @qa** pode preencher a seção "QA Results" da story
2. @qa **NÃO pode** modificar: Status, Story, ACs, Tasks, Dev Notes, Change Log
3. @qa **NÃO faz** git push — delega para @devops
4. @qa **NÃO faz** commits — somente revisa código já commitado

---

## QA Loop (Iterativo)

```
@qa review → FAIL → @dev corrige → @qa re-review (máx 5 iterações)
```

**Comandos:**
- `*qa-loop {storyId}` — Iniciar loop
- `*stop-qa-loop` — Pausar e salvar estado
- `*resume-qa-loop` — Retomar
- `*escalate-qa-loop` — Forçar escalação manual

---

## Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `*review {story}` | Revisão completa com decisão de gate |
| `*gate {story}` | Apenas a decisão de gate |
| `*code-review {scope}` | Review automatizado (uncommitted/committed) |
| `*security-check {story}` | Scan de segurança 8 pontos |
| `*nfr-assess {story}` | Validar requisitos não-funcionais |
| `*test-design {story}` | Criar cenários de teste |
