---
name: session-planner
description: Divide planos aprovados em fases e sessões otimizadas para context window. Agnóstico de projeto. Invocado após aprovação de plano complexo (>5 ações).
user-invocable: true
allowed-tools: Read, Glob, Grep
---

# Session Planner — Divisão de Planos em Fases/Sessões

> Protocolo pós-aprovação. Recebe plano complexo → gera fases → gera sessões por fase → produz handoff entre sessões.

## Gatilhos

- Usuário aprova plano com >5 ações
- Comandos: "dividir em sessões", "protocolo de sessões", "fase de execução"
- Sugestão automática ao final de planos com peso total >24 pontos

## Detecção de Ambiente

```
SE contexto contém "/compact" OU "subagent" OU "Claude Code" → ENV=claude-code
SE contexto contém "Claude Desktop" OU "chat" OU "artifacts" → ENV=desktop-chat
SE contexto contém "Cursor" OU ".cursorrules" → ENV=cursor-ide
DEFAULT → ENV=desktop-chat
```

Adaptar formato de handoff conforme ENV (ver seção Transição).

---

## Limites de Contexto

| Param | Valor |
|-------|-------|
| Context window (Pro) | 200K tokens |
| Overhead sistema (prompts, tools, MCP, memory) | ~40K |
| Disponível/sessão | ~160K |
| **Target seguro (60%)** | **~96K úteis** |
| Ações significativas/sessão | 8–12 |
| Peso máximo/sessão | ≤24 pontos |

## Peso de Ações

| Ação | Peso |
|------|------|
| Leitura arquivo | 1 |
| Edição simples (1-3 linhas) | 2 |
| Criação arquivo novo | 3 |
| Edição complexa (refactor, multi-seção) | 3 |
| Build/test | 3 |
| Subagent simples (explore) | 4 |
| Subagent complexo (plan/análise) | 6 |

> Sessão com >2 subagents → reduzir para 5-6 ações max.

---

## Hierarquia: Fase > Sessão > Ação

**Fase** = agrupamento lógico de sessões com objetivo comum (ex: "Fase 1: Infraestrutura", "Fase 2: Features").
**Sessão** = unidade executável em 1 context window (~96K tokens úteis).
**Ação** = operação atômica com peso definido.

---

## Regras de Divisão

### Sessão (obrigatório)
1. Auto-contida — executável após context limpo, sem depender de contexto da sessão anterior
2. Max 8-12 ações, peso ≤24
3. Pesquisa separada de implementação — sessão de exploração NÃO edita código
4. Nunca misturar criação de arquivos novos com refatoração de existentes
5. Verificação obrigatória ao final

### Fase (obrigatório)
1. Cada fase tem objetivo claro e critério de conclusão mensurável
2. Checkpoint (commit/backup) obrigatório entre fases
3. Fase seguinte só inicia após verificação da anterior
4. Max 3-5 sessões por fase

### Agrupamento (heurísticas)
- Arquivos relacionados → mesma sessão
- Dependências primeiro → tipos/interfaces antes de componentes
- Testes junto com código → criar + testar na mesma sessão
- Docs sempre na última sessão da fase
- Uma feature por sessão — não misturar features independentes

---

## Formato de Saída

Ao processar plano aprovado, gerar:

```markdown
# Plano de Execução — [Nome]

**Resumo:** [1 frase do objetivo]
**Total:** F fases | S sessões | A ações | ~P pontos
**Ambiente:** [ENV detectado]

---

## Fase 1 de F: [Título]
**Objetivo:** [1 frase]
**Critério de conclusão:** [verificável]
**Sessões:** X

### Sessão 1.1: [Título descritivo]
**Foco:** [1 frase]
**Peso:** ~P pontos | ~N ações
**Pré-requisitos:** Nenhum | Sessão X.Y concluída

**Ações:**
- [ ] [peso:N] Descrição clara da ação
- [ ] [peso:N] Descrição clara da ação

**Verificação:**
- [ ] Critério 1
- [ ] Critério 2

**Handoff → Sessão 1.2:**
> [Contexto mínimo necessário para iniciar próxima sessão]

---

### Sessão 1.2: [Título]
...

---

## Fase 2 de F: [Título]
**Pré-requisito:** Fase 1 concluída (verificar: [critério])
...

---

## Resumo de Transição Rápida
| Sessão | Foco | Peso | Status |
|--------|------|------|--------|
| 1.1 | ... | P | ⬜ |
| 1.2 | ... | P | ⬜ |
| 2.1 | ... | P | ⬜ |
```

---

## Protocolo de Transição (por ambiente)

### ENV=desktop-chat
Ao final de cada sessão:
1. Verificar entregáveis — todos itens concluídos?
2. Reportar: `Sessão X.Y concluída. Entregáveis: [lista]. Próxima: [título]`
3. Gerar bloco de handoff (colar no início da próxima conversa):
```
Continuar execução — Sessão [X.Y+1]: [título].
Contexto: [resumo do que foi feito]. Verificar: [arquivos criados/alterados].
Próximas ações: [lista resumida].
```

### ENV=claude-code
Ao final de cada sessão:
1. Verificar entregáveis
2. Salvar estado: commit parcial se aplicável
3. Gerar comando: `/compact Sessão [X.Y+1]: [título]. Contexto: [resumo]`
4. Reportar ao usuário

### ENV=cursor-ide
Ao final de cada sessão:
1. Verificar entregáveis
2. Gerar nota para `.cursor/context`: resumo da sessão + próximos passos
3. Reportar ao usuário

---

## Checkpoint entre Fases

A cada transição de fase:
1. Verificar TODOS os critérios de conclusão da fase
2. Commit/backup obrigatório (ou snapshot manual se não usa git)
3. Atualizar tabela de Resumo de Transição (status ⬜→✅)
4. Gerar handoff de fase com contexto expandido (mais detalhado que handoff de sessão)

---

## Validação do Plano (self-check)

Antes de entregar o plano dividido, verificar:
- [ ] Toda sessão tem peso ≤24
- [ ] Toda sessão é auto-contida (executável após context limpo)
- [ ] Toda fase tem critério de conclusão mensurável
- [ ] Dependências respeitadas (nenhuma sessão depende de ação não executada)
- [ ] Nenhuma sessão mistura exploração com implementação
- [ ] Nenhuma sessão mistura criação com refatoração
- [ ] Handoff de cada sessão contém contexto suficiente para retomada
- [ ] Tabela de resumo gerada

---

*Agnóstico de projeto | Calibrado: Pro 200K tokens | Target: 60% (~96K úteis)*
*Atualizado: 2026-03-28*