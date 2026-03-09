# Protocolo de Sessao

> Define como uma sessao de desenvolvimento deve iniciar, executar e manter qualidade.

---

## Pre-requisitos

Antes de comecar qualquer trabalho:
1. `docs/PROXIMA_SESSAO.md` lido completamente
2. Quality gates passando (vitest + tsc + vite build)
3. Branch correta (`main` por padrao)
4. Working directory limpo ou com mudancas conhecidas

---

## Sequencia de Inicio

1. **Ler contexto** — `docs/PROXIMA_SESSAO.md` (obrigatorio, mandatado por CLAUDE.md)
2. **Verificar estado** — executar quality gates e comparar com estado reportado
3. **Identificar divergencias** — se testes falhando ou build quebrado, tratar antes de avancar
4. **Propor plano** — baseado no pedido do usuario + backlog de `docs/MELHORIAS_CONTINUAS.md`
5. **Alinhar com usuario** — confirmar scope antes de implementar

---

## Regras Durante Sessao

- **Uma tarefa por vez** — completar, testar e commitar antes de iniciar a proxima
- **Quality gates entre mudancas** — rodar `npx vitest run` e `npx tsc --noEmit` apos cada mudanca significativa
- **Conventional commits** — `feat:`, `fix:`, `test:`, `docs:`, `refactor:`
- **Nao inventar** — pesquisar ou perguntar antes de propor solucao nova
- **Map Before Modify** — documentar estado atual antes de alterar (principio AIOS)

---

## Situacoes Especiais

### Testes falhando no inicio
- Verificar se e falha pre-existente (documentada em PROXIMA_SESSAO.md)
- Se pre-existente: informar usuario, decidir se tratar agora ou continuar
- Se nova: investigar antes de fazer qualquer outra coisa

### Branch worktree
- Commits em worktree NAO sao visveis em main
- Ao finalizar: merge explicito para main + push
- Referencia: `memory/lessons-learned.md` secao "Git & Workflow"

### Docs desatualizados
- Se PROXIMA_SESSAO.md diverge do estado real, corrigir como primeira tarefa
- Propor atualizacao ao usuario antes de escrever

---

## Referencia

- Checklist fim de sessao: `docs/PROXIMA_SESSAO.md` linhas 756-788
- Regras obrigatorias: `docs/REGRAS_TRABALHO_OBRIGATORIAS.md`
- Convencoes de codigo: `CLAUDE.md`

---

*FENIX AI System | Protocolo de Sessao*
