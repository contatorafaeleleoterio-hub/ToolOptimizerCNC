# Guia: Implementar Stories com Claude Code

**Versão:** 2.1 (15/02/2026)

---

## Workflow

### Antes de começar:
1. `git status` — confirmar branch limpa
2. `git commit -m "checkpoint antes story-XXX"` — backup
3. `npm test` — confirmar testes passando
4. Ler story completa

### Durante implementação:
1. Seguir fases da story em ordem
2. Commit após cada fase completada
3. Rodar `npm test` após cada modificação em src/
4. Rodar `npm run build` ao final
5. Se algo quebrar: `git diff` para entender, corrigir antes de continuar

### Após completar:
1. Executar validações da story (cada story tem seção de validação)
2. Colar output dos comandos de validação
3. Commit final com mensagem conventional
4. Atualizar docs/PROXIMA_SESSAO.md com próxima tarefa
5. **OBRIGATÓRIO: Gerar prompt de continuação** (ver seção abaixo)

---

## Regras para Claude Code

1. **Leia antes de editar** — sempre Read o arquivo antes de Edit
2. **Testes primeiro** — se a story envolve cálculos, escreva teste antes
3. **Incremental** — commit por fase, não tudo junto
4. **Conventional commits** — feat:, fix:, refactor:, docs:, test:
5. **Não invente features** — faça apenas o que a story pede
6. **Validação obrigatória** — execute os comandos de validação da story antes de dizer que terminou

---

## DIRETRIZ OBRIGATÓRIA: Prompt de Continuação

**Ao final de TODA sessão, ANTES de encerrar, Claude Code DEVE:**

1. **Atualizar `docs/PROXIMA_SESSAO.md`** com:
   - O que foi feito nesta sessão (stories/fases concluídas)
   - Estado atual (testes, build, bundle size)
   - Último commit (hash + mensagem)
   - Próxima story/fase pendente
   - Qualquer decisão pendente ou bloqueio

2. **Atualizar `docs/PROMPT_PROXIMA_SESSAO.md`** com prompt pronto copiar/colar contendo:
   - Localização do projeto
   - GitHub remote
   - Estado resumido (último commit, testes, o que falta)
   - Arquivos de contexto para ler
   - Tarefa específica com fases
   - Regras

3. **Commitar e pushar** as atualizações dos docs

4. **Exibir o prompt final na tela** para o usuário copiar

**Formato do prompt gerado:**

```
Continuar projeto ToolOptimizer CNC.
Localização: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
GitHub: https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC

ESTADO ATUAL:
- Último commit: [hash] [mensagem]
- Testes: [X] passing
- Build: [X]KB gzip
- Story anterior: [concluída/parcial]

CONTEXTO — leia estes arquivos:
1. CLAUDE.md (convenções)
2. docs/PROXIMA_SESSAO.md (estado do projeto)
3. docs/stories/story-XXX-nome.md (tarefa atual)

TAREFA: [descrição clara]

Fases:
1. [fase 1]
2. [fase 2]
...

REGRAS:
- Commit após cada fase
- npm test após mudanças em src/
- Conventional commits
- Não fazer mudanças fora do escopo
- AO FINAL: gerar prompt de continuação (ver docs/stories/GUIA-USO-CLAUDE-CODE.md)
```

**Esta diretriz garante continuidade entre sessões sem perda de contexto.**

---

## Template de Prompt para Story

```
Continuar projeto ToolOptimizer CNC.

Contexto:
- Leia CLAUDE.md para convenções
- Leia docs/PROXIMA_SESSAO.md para estado atual
- Leia docs/stories/story-XXX-nome.md para a tarefa

Tarefa: Implementar Story-XXX conforme as fases descritas.

Regras:
1. Seguir fases em ordem
2. Commit após cada fase
3. Rodar npm test após mudanças em src/
4. Executar validações no final
5. NÃO fazer mudanças além do escopo da story
6. AO FINAL: gerar prompt de continuação
```

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| Build quebrou | `git diff` para ver o que mudou, corrigir |
| Teste falhou | Ler output do teste, verificar se mudança é esperada |
| Arquivo não encontrado | Usar `Glob` ou `Grep` para localizar |
| Claude perdeu contexto | Reler story + CLAUDE.md |
| Mudança afetou outro componente | Rodar `npm test` completo, investigar falhas |
