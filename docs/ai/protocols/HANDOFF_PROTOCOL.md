# Protocolo de Handoff

> Define como encerrar uma sessao com qualidade e preparar a transicao.
> Inclui retrospectiva integrada para capturar aprendizados.

---

## Regra Principal

**NUNCA escrever automaticamente em docs sem aprovacao do usuario.**
Sempre sugerir atualizacoes e aguardar confirmacao.

---

## Checklist Obrigatorio

### 1. Quality Gates
```bash
npx vitest run          # Testes passando?
npx tsc --noEmit        # TypeScript limpo?
npx vite build          # Build producao OK?
```

### 2. Commits
- Todas as mudancas commitadas com conventional commits?
- `git status` limpo?

### 3. Push
- `git push origin main` executado?
- CI/CD verde no GitHub Actions?

---

## Retrospectiva da Sessao

Produzir analise estruturada:

```
## Retrospectiva — [data]

### O que foi feito
- [commit hash] [descricao]
- [commit hash] [descricao]

### O que funcionou bem
- [item]

### O que deu problema
- [item]

### Divida tecnica identificada
- [item] (se houver)

### Aprendizados
- [item] → sugerir adicao a docs/ai/memory/
```

---

## Atualizacoes de Documentacao

Sugerir (nao executar) atualizacoes em:

### 1. `docs/PROXIMA_SESSAO.md`
- Tabela de estado do projeto (versao, testes, build, deploy)
- Resumo da sessao na secao historico
- Proximos passos recomendados
- Roadmap visual atualizado

### 2. `docs/plans/BACKLOG_IMPLEMENTACAO.md`
- Remover itens concluidos
- Adicionar novos itens descobertos
- Reordenar prioridades se necessario

### 3. `docs/sessions/`
- Criar nota de sessao: `SESSAO_YYYY-MM-DD_descricao.md`
- Incluir: contexto, commits, decisoes, proximos passos

### 4. `docs/ai/memory/`
- Aprendizados tecnicos → `ENGINEERING_MEMORY.md`
- Padroes arquiteturais → `ARCHITECTURE_LEARNINGS.md`
- Erros encontrados → `COMMON_MISTAKES.md`

### 5. `.claude/.../memory/`
- Atualizar `MEMORY.md` (version, last commit, test count)
- Atualizar `lessons-learned.md` se aplicavel

---

## Formato de Session Note

```markdown
# Sessao [data] — [titulo]

## Contexto
[Por que esta sessao aconteceu]

## O que foi feito
- [lista de commits com hash]

## Decisoes
- [decisoes tomadas, se houver]

## Arquivos Modificados
- [lista de arquivos]

## Proximos Passos
- [lista]

## Aprendizados
- [lista]
```

---

## Fluxo Completo (fim de sessao)

1. Rodar quality gates
2. Verificar commits e push
3. Produzir retrospectiva
4. Preparar lista de atualizacoes de docs
5. Apresentar ao usuario para aprovacao
6. Aplicar somente as atualizacoes aprovadas
7. Commit de docs: `docs: session summary [data]`
8. Push final

---

## Referencia

- Checklist existente: `docs/ROADMAP_SESSAO_ATUAL.md` secao "PROTOCOLO FIM DE SESSAO"
- Exemplos de session notes: `docs/sessions/`

---

*FENIX AI System | Protocolo de Handoff*
